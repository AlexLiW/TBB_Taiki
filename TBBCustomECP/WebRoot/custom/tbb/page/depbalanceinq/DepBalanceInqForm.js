// 帳號查詢客戶資料
var DepBalanceInqForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/05/25 
	 * Description: 帳號查詢客戶資料
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\tiffany.wu; 
	 * LastUpdateDate: 2021/09/27
	 * Note: 新增查詢無資料邏輯、卡號字數檢核
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Inquiry").onclick = function() {
			form.setFieldValue("U_UID", null);
			form.setFieldValue("U_NAME", null);
			form.setFieldValue("U_ARACODTELNUM", null);
			form.setFieldValue("U_MOBTEL", null);
			form.setFieldValue("U_PMTADR", null);
			form.setFieldValue("U_CTTADR", null);
			DepBalanceInqForm.doS601();
		};
		
		DepBalanceInqForm.doOnchange(); // 20210927 add by gemfor\Tiffany
	},

	doS601 : function() { // 上送S601
		if (!form.validate()) {
			return;
		}
		var acno = form.getFieldValue("U_ACNO");
		DepBalanceInqForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		DepBalanceInqForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "S601",
			"ACN" : acno, // 帳號
			"CUSIDN" : "", // 統一編號
			"TYPE" : "01", // 類別
		};
		var args = JSON.stringify({
			"name" : "S601tbbapi",
			"from" : "CSR",
			"sessionId" : DepBalanceInqForm.sessionId,
			"agentId" : DepBalanceInqForm.agentId,
			"formData" : data,
		});
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
					return;
				}
				var formData = ret.form;
				form.setFieldValue("U_NAME", formData.NAME);
				form.setFieldValue("U_UID", formData.CUSIDN);
				form.setFieldValue("U_ARACODTELNUM", formData.ARACOD + formData.TELNUM);
				form.setFieldValue("U_MOBTEL", formData.MOBTEL);
				form.setFieldValue("U_PMTADR", formData.PMTADR);
				form.setFieldValue("U_CTTADR", formData.CTTADR);
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	doOnchange : function() { // 20210927 add by gemfor\Tiffany -- onchange
		form.getControl("U_ACNO").onchange = function() {
			DepBalanceInqForm.doACNO();
		};
	},
	
	doACNO : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("帳號資料格式須為11位實體帳號");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},
};
