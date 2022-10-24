// 企業網路銀行關係戶轉帳約定資料檔
var UENetBankRLTransForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/23 
	 * Description: 企業網路銀行關係戶轉帳約定資料檔
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
		form.getControl("U_Button").setElementStyle("width: 30%"); // 設定按鈕大小
		form.getControl("U_Button").onclick = function() { // 查詢
			form.getControl("U_Grid").setValue();
			UENetBankRLTransForm.doCQ08();
		};
		if ("entityId" in EntityForm.getInfoWindow().clientData) { // 聯絡人從屬頁面
			form.setFieldValue("U_UID", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));
		} else { // 電子金融開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
		UENetBankRLTransForm.setIdOnchange(); // 20210920-Emily
	},
	
	doCQ08 : function() { // 上送CQ08
		if (!form.validate()) {
			return;
		}
		UENetBankRLTransForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UENetBankRLTransForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ08",
			"CUSIDN" : form.getFieldValue("U_UID"), // 統一編號
			"CORIDN" : form.getFieldValue("U_RLUID"), // 關係人統一編號
		};
		var args = JSON.stringify({
			"name" : "CQ08tbbapi",
			"from" : "CSR",
			"sessionId" : UENetBankRLTransForm.sessionId,
			"agentId" : UENetBankRLTransForm.agentId,
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
					var U_O_Data = [];
					var formData = ret.form;
					
					// 獲取字典data
					var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dcfbb-a590-0d75-1395-d8f2cab1cb50"}).data; // TBB_銀行行庫代碼
					var bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f7134-1410-0f8c-40b2-9201392884ce"}).data; // TBB-企業網路銀行關係戶轉帳約定資料檔-業務類別
					var statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f7149-be10-0f8c-40b2-9201392884ce"}).data; // TBB-企業網路銀行關係戶轉帳約定資料檔-狀態碼
					var dsACNOTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f706b-ba20-0f8c-40b2-9201392884ce"}).data; // TBB-約定帳號性質別  
					var isSetTimeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6e8e-7840-0f8c-40b2-9201392884ce"}).data; // TBB-是否設定減免次數
					var isTransLimitDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6df8-b0c0-0f8c-40b2-9201392884ce"}).data; // TBB-是否設定最高轉帳金額
					var isNonPredDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f7128-1f40-0f8c-40b2-9201392884ce"}).data; // TBB-是否設定不得轉非約定

					var REC_LEN = formData.REC.length; // 看有幾筆資料
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i].BANKCOD.trim()) && !Jui.object.isEmpty(formData.REC[i].TSFACN.trim())) {

							// 網格
							var record = {
									U_BankNo		: UENetBankRLTransForm.getDicText(bankNoDic, formData.REC[i].BANKCOD), // 行庫別
									U_TransACNO		: formData.REC[i].TSFACN, // 轉帳帳號	
									U_BUTypeDesc	: UENetBankRLTransForm.getDicText(bUTypeDescDic, UENetBankRLTransForm.doBiteVal(formData.REC[i].TYPE)), // 業務類別	
									U_StatusCode	: UENetBankRLTransForm.getDicText(statusCodeDic, formData.REC[i].STSCOD), // 狀態碼		
									U_ApplyTransDT	: formData.REC[i].DATAPL, // 轉帳申請日期	
									U_ApplyCanDT	: formData.REC[i].DATDLT, // 轉帳註銷日期	
									U_FeeDT			: formData.REC[i].FEEDATE, // 手續費設定日期	
									U_DsACNOType	: UENetBankRLTransForm.getDicText(dsACNOTypeDic, formData.REC[i].ATRCOD), // 約定帳號性質別	
									U_FeeFlg		: formData.REC[i].FEECOD1, // 手續費註記	
									U_IsSetTime		: UENetBankRLTransForm.getDicText(isSetTimeDic, formData.REC[i].FEECOD2), // 是否設定減免次數	
									U_SetFeeAMT		: TBBUtil.thousandComma(parseInt(formData.REC[i].FEEAMT)), // 設定手續費金額	
									U_MonTime		: TBBUtil.thousandComma(parseInt(formData.REC[i].DISCONT)),// 每月優惠減免次數	
									U_FeeEndDT		: formData.REC[i].FEEENDE, // 手續費優惠迄日	
									U_MonUseTime	: TBBUtil.thousandComma(parseInt(formData.REC[i].DISMON)), // 本月已使用優惠次數	
									U_NoticeSetDT	: formData.REC[i].REDATE, // 匯款通知取消日期	
									U_IsTransLimit	: UENetBankRLTransForm.getDicText(isTransLimitDic, formData.REC[i].AMTCOD), // 是否設定最高轉帳金額	
									U_TransLimit	: TBBUtil.thousandComma(parseInt(formData.REC[i].AMTLMT)), // 最高轉帳金額	
									U_FeeTime		: parseInt(formData.REC[i].FCDCNT), // 跨行減免手續費次數	
									U_IsNonPred		: UENetBankRLTransForm.getDicText(isNonPredDic, formData.REC[i].TSFNAPL), // 是否設定不得轉非約定	
							};
							U_O_Data.push(record);
						}
					}
					form.getControl("U_Grid").setValue(U_O_Data);
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
	
	doBiteVal : function(data) { // bite取值方法
		var value = "";
		if (data.split("1").length - 1 < 2) { // 0或1個
			var array = data.split("", 8);
			for (var i = 0; i < array.length; i++) {
				if (array[i] == "1") {
					value = i + 1;
				}
			}
		} else { // 超過1個
			value = data;
		}
		return value;
	},
	
	setIdOnchange : function() { // 20210920 Emily -- 檢核身份證、統編、統一證號
		Jui.event.attach(form.getControl("U_RLUID"), "onchange", function() {
			ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_RLUID"), 6);
			if (ret) {
				form.setFieldValue("U_RLUID", form.getFieldValue("U_RLUID").toLocaleUpperCase());
			} else {
				form.setFieldValue("U_RLUID", null);
			}
		});
	},
};
