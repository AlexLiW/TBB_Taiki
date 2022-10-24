// 自動化銀行系統-電話銀行主檔
var UVoiceBankForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/07 
	 * Description: 自動化銀行系統-電話銀行主檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\tiffany.wu; 
	 * LastUpdateDate: 2021/09/27
	 * Note: 新增查詢無資料邏輯、帳號字數檢核
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Button").onclick = function() {
			form.setFieldValue("U_UID", null);
			form.setFieldValue("U_BUTypeDesc", null);
			form.setFieldValue("U_TodayDepAMT", null);
			form.setFieldValue("U_Today3DepAMT", null);
			form.setFieldValue("U_TodayODepAMT", null);
			form.setFieldValue("U_PwdErrTime", null);
			form.setFieldValue("U_Status", null);
			form.setFieldValue("U_BVoiceSev", null);
			form.setFieldValue("U_ApplyDT", null);
			form.setFieldValue("U_CancelDT", null);
			form.setFieldValue("U_FaxRegion", null);
			form.setFieldValue("U_Fax", null);
			form.setFieldValue("U_PwdErr", null);
			form.setFieldValue("U_LastChgDT", null);
			UVoiceBankForm.doCQ04();
		};
		UVoiceBankForm.doOnchange(); // 20210927 add by gemfor\Tiffany
	},

	doCQ04 : function() { // 上送CQ04
		if (!form.validate()) {
			return;
		}
		if(Jui.object.isEmpty(form.getFieldValue("U_ACNO"))){
			Jui.message.alert("請填寫\"申請帳號\"");
			return;
		}
		var acno = form.getFieldValue("U_ACNO");
		UVoiceBankForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UVoiceBankForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ04",
			"ACN" : acno, // 申請帳號
		};
		var args = JSON.stringify({
			"name" : "CQ04tbbapi",
			"from" : "CSR",
			"sessionId" : UVoiceBankForm.sessionId,
			"agentId" : UVoiceBankForm.agentId,
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
				form.setFieldValue("U_UID", formData.CUSIDN);
				form.setFieldValue("U_BUTypeDesc", formData.TYPE);
				form.setFieldValue("U_TodayDepAMT", TBBUtil.thousandComma(parseInt(formData.TRAAMT1)));
				form.setFieldValue("U_Today3DepAMT", TBBUtil.thousandComma(parseInt(formData.TRAAMT2)));
				form.setFieldValue("U_TodayODepAMT", TBBUtil.thousandComma(parseInt(formData.TRAAMT3)));
				form.setFieldValue("U_PwdErrTime", formData.CNTVOPW);
				// form.setFieldValue("U_Status", (formData.STSCOD != "A" && formData.STSCOD != "W" && formData.STSCOD != "D") ? "空白" : formData.STSCOD);
				form.setFieldValue("U_Status", Jui.string.isEmpty(formData.STSCOD) ? "空白" : formData.STSCOD);
				form.setFieldValue("U_BVoiceSev", formData.APLBRH);
				form.setFieldValue("U_ApplyDT", formData.DATAPL.length == "7" ? formData.DATAPL.substr(0, 3) + "/" + formData.DATAPL.substr(3, 2) + "/" + formData.DATAPL.substr(5, 2) : "");
				form.setFieldValue("U_CancelDT", formData.DATDLT.length == "7" ? formData.DATDLT.substr(0, 3) + "/" + formData.DATDLT.substr(3, 2) + "/" + formData.DATDLT.substr(5, 2) : "");
				form.setFieldValue("U_FaxRegion", formData.FAXARA);
				form.setFieldValue("U_Fax", formData.FAXNUM);
				var date = formData.PWDDAT.length == "7" ? formData.PWDDAT.substr(0, 3) + "/" + formData.PWDDAT.substr(3, 2) + "/" + formData.PWDDAT.substr(5, 2) : "";
				var time = formData.PWDTIM.length == "6" ? formData.PWDTIM.substr(0, 2) + ":" + formData.PWDTIM.substr(2, 2) + ":" + formData.PWDTIM.substr(4, 2) : "";
				form.setFieldValue("U_PwdErr", date + " " + time);
				form.setFieldValue("U_LastChgDT", formData.LSCHPWD.length == "7" ? formData.LSCHPWD.substr(0, 3) + "/" + formData.LSCHPWD.substr(3, 2) + "/" + formData.LSCHPWD.substr(5, 2) : "");
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	doOnchange : function() { // 20210927 add by gemfor\Tiffany -- onchange
		form.getControl("U_ACNO").onchange = function() {
			UVoiceBankForm.doACNO();
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
