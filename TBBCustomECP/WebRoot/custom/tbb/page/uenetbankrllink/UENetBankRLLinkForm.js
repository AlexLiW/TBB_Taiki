// 企業網路銀行關係戶連結檔
var UENetBankRLLinkForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/24 
	 * Description: 企業網路銀行關係戶連結檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: AI.Wolf.Wu; 
	 * LastUpdateDate: 2021/10/27
	 * Note: 增加查無資料時顯示錯誤代碼提示
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Inquiry").setElementStyle("width: 30%"); // 設定按鈕大小
		form.getControl("U_Inquiry").onclick = function() { // 查詢
			TBBUtil.doClearFields("查詢結果", "基本資訊");
			UENetBankRLLinkForm.doCQ07();
		};
		if ("entityId" in EntityForm.getInfoWindow().clientData) { // 聯絡人從屬頁面
			form.setFieldValue("U_RLUID", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));
		} else { // 電子金融開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_RLUID", custID);
			}
		}
	},
	
	doCQ07 : function() { // 上送CQ07
		if (!form.validate()) {
			return;
		}
		UENetBankRLLinkForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UENetBankRLLinkForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ07",
			"CORIDN" : form.getFieldValue("U_RLUID"), // 關係人統一編號
		};
		var args = JSON.stringify({
			"name" : "CQ07tbbapi",
			"from" : "CSR",
			"sessionId" : UENetBankRLLinkForm.sessionId,
			"agentId" : UENetBankRLLinkForm.agentId,
			"formData" : data,
		});
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
				//2021.10.27-AI.Wolf-新增查無資料時要跳的提示訊息
				let ABEND = ret.form.ABEND;					//電文回應代號
				var ABEND_text = "";
				//2021.10.27-AI.Wolf-新增回應代碼抓字典項文字
				let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
				for (let i = 0; i < ABEND_Dic.length; i++) {
					if (ABEND_Dic[i].value == ABEND) {
						ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
					}
				}
				if(ABEND == "0000" || ABEND == "OKLR"){
					var formData = ret.form;
					var isEmailDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f73d8-8fa0-0f8c-40b2-9201392884ce"}).data; // TBB-是否保留電子郵箱位址
					form.setFieldValue("U_CompanyID", formData.CUSIDN); // 母公司統一編號
					form.setFieldValue("U_ApplyTransDT", formData.DATAPL); // 關係戶申請授權日期	
					form.setFieldValue("U_RLTransDT", formData.DATDLT); // 關係戶註銷授權日期	
					form.setFieldValue("U_NetSev", formData.BRHTMP); // 網路服務鍵機行		
					form.setFieldValue("U_LastApplyDT", formData.CHGDATE); // 上次業務申請日期		
					form.setFieldValue("U_IsEmail", UENetBankRLLinkForm.getDicText(isEmailDic, formData.E_MAIL)); // 是否保留電子郵箱位址	
					form.setFieldValue("U_ChgEmailDT", formData.CHGMAIL); // 變更電子郵箱位址日期	
					form.setFieldValue("U_EStatement", formData.E_BILL); // E-MAIL電子交易對帳單
				}else{
					//2021.10.27-AI.Wolf清空查詢結果欄位
					TBBUtil.doClearFields("查詢結果", null, null);
					Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
					return;
				}
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	getDicText : function(dicData, postVal) { // 獲取電文對應字典文字
		var dicText = postVal;
		for (var j = 0; j < dicData.length; j++) {
			if (dicData[j].value == postVal) {
				dicText = dicData[j].text;
				break;
			}
		}
		return dicText;
	},
};
