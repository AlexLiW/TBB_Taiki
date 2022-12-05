// 全球金融網
/*******************************************************************************
 * Author: Gemfor\Emily.tsai; CreateDate: 2022/10/25 Description: 全球金融網
 * CUS.GlobalNetwork
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor.Emily; LastUpdateDate: 2022/10/25 
 *				   Gemfor.浩評;  LastUpdateDate: 2022/10/25
 * Note: CQ17、CQ18、CQ19
 ******************************************************************************/
var GlobalNetworkForm = {
	// sessionId : null,
	// agentId : null,
	entityId : clientData.entityId,
	doLoad : function() {

		form.getControl("U_button").onclick = function() {
			GlobalNetworkForm.doCheck();
			form.getControl("U_Grid").setValue();
		};

		GlobalNetworkForm.doOnchange();

		form.getControl("U_button2").onclick = function() {
			GlobalNetworkForm.doCheck2();
			form.getControl("U_Grid2").setValue();
		};
		
		GlobalNetworkForm.doOnchange2();
		
		form.getControl("U_button3").onclick = GlobalNetworkForm.doCQ17;
	},

	// 【查詢】顯示彈跳訊息確認
	doCheck : function() {
		if (!form.getFieldValue("U_HKID")) {
			Jui.message.hint("請填寫\"香港重組ID\"");
			return;
		} else {
			GlobalNetworkForm.doCQ18();
		}
	},

	// 【查詢】顯示彈跳訊息確認
	doCheck2 : function() {
		if (!form.getFieldValue("U_HKID2")) {
			Jui.message.hint("請填寫\"香港重組ID\"");
			return;
		} else {
			GlobalNetworkForm.doCQ19();
		}
	},

	doCQ18 : function() {
		if (!form.validate()) {
			return;
		}

		var hkid = form.getFieldValue("U_HKID");
		GlobalNetworkForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		GlobalNetworkForm.agentId = CommonBusiness.getFieldValue("Qs.User",
				userId, "FLoginName");

		var data = {
			"TXID" : "CQ18",
			"HKID" : hkid,
		};

		var args = JSON.stringify({
			"name" : "CQ18tbbapi",
			"from" : "CSR",
			"sessionId" : GlobalNetworkForm.sessionId,
			"agentId" : GlobalNetworkForm.agentId,
			"formData" : data,
		});

		TBBUtil
				.doPost(
						JSON.parse(args),
						function(ret) {
							if (ret == undefined) {
								Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
								return;
							}
							if (ret.isSuccess == true) {
								//if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
									var codeDic = Utility
											.syncInvoke(
													"Qs.Dictionary.getComboBoxItemsJson",
													{
														dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"
													}).data;
									var ABENDtxt = ret.form.ABEND;
									for (var i = 0; i < codeDic.length; i++) {
										if (codeDic[i].value == ret.form.ABEND) {
											ABENDtxt = codeDic[i].text;
											break;
										}
									}
									if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
									Jui.message.alert("查詢無資料！\n交易代號："
											+ ABENDtxt);
									return;
								}
								var GridData = [];
								var formData = ret.form;
								// var name =

								var record = {
									U_SID : formData.VID,
									U_categories : formData.CUSCODE,
									U_name : (formData.NAME1 == "" ? (formData.NAME2 == "" ? "": formData.NAME2): (formData.NAME2 == "" ? formData.NAME1: formData.NAME1 + ","+ formData.NAME2)),
									U_ADM_ERR : formData.CNTNBW1,
									U_ADM_ERR2 : formData.CNTNBW2,
									U_U_ERR : formData.UIDCNT,
									U_customer_address : (formData.ADDR1 == "" ? (formData.ADDR2 == "" ? "": formData.ADDR2): (formData.ADDR2 == "" ? formData.ADDR1: formData.ADDR1 + ","+ formData.ADDR2)),
									U_application_bank : formData.APLBRH,
									U_HKcustomer_number : formData.HKCUSID,
									U_Status_code : formData.STSCOD,
									U_DATE : TBBUtil.formatDTM(formData.DATAPL),
									U_KDATE :  TBBUtil.formatDTM(formData.DATDLT),
									U_LASTDATE :  TBBUtil.formatDTM(formData.UPDDATE),
									U_ADMUser : formData.USERID,
									U_ADMPass : "",
									U_ADMPassword : "",
									U_debit_account : formData.TRAACN,
									U_Last_check : TBBUtil.formatDTM(formData.CHGPWDT1)+ formData.CHGPWTM1,
									U_password_change : TBBUtil.formatDTM(formData.CHGPWDT2)+ formData.CHGPWTM2,
									U_row_date_time : TBBUtil.formatDTM(formData.PWDDAT)+ formData.PWDTIM,
									U_user_status : formData.UIDSTC,
									U_Safety : formData.SECCOD,
									U_Transfer : formData.TXLM,
								};
								GridData.push(record);

								form.getControl("U_Grid").setValue(GridData);
								form.setFieldValue("U_transaction_result",
										ret.form.ABEND);
								 form.setFieldValue("U_transaction_results",ABENDtxt);
							} else {
								Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
								return;
							}
						});
	},

	doCQ19 : function() {
		if (!form.validate()) {
			return;
		}

		var hkid = form.getFieldValue("U_HKID2");
		GlobalNetworkForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		GlobalNetworkForm.agentId = CommonBusiness.getFieldValue("Qs.User",
				userId, "FLoginName");

		var data = {
			"TXID" : "CQ19",
			"HKID" : hkid,
		};

		var args = JSON.stringify({
			"name" : "CQ19tbbapi",
			"from" : "CSR",
			"sessionId" : GlobalNetworkForm.sessionId,
			"agentId" : GlobalNetworkForm.agentId,
			"formData" : data,
		});

		TBBUtil
				.doPost(
						JSON.parse(args),
						function(ret) {
							if (ret == undefined) {
								Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
								return;
							}
							if (ret.isSuccess == true) {
								if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
									var codeDic = Utility
											.syncInvoke(
													"Qs.Dictionary.getComboBoxItemsJson",
													{
														dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"
													}).data;
									//var ABENDtxt = ret.form.ABEND;
//									for (var i = 0; i < codeDic.length; i++) {
//										if (codeDic[i].value == ret.form.ABEND) {
//											ABENDtxt = codeDic[i].text;
//											break;
//										}
//									}
									Jui.message.alert("查詢無資料！\n交易代號："
											+ ABENDtxt);
									return;
								}
								var GridData = [];
								var formData = ret.form;
								for(var i=0; i<formData.REC.length; i++){
									var record = {
											U_HKBranch_code : formData.REC[i].BANKCOD,
											U_account : formData.REC[i].TSFACN,
											U_Account_type : formData.REC[i].ACNOTYPE,
											U_status_code : formData.REC[i].STSCOD,
											U_application_date :  TBBUtil.formatDTM(formData.REC[i].DATAPL),
											U_cancellation_date :  TBBUtil.formatDTM(formData.REC[i].DATDLT),
											U_reorganization_ID : formData.REC[i].ACNHKID,
											U_transfer_limit : formData.REC[i].AMTCOD,
											U_currency : formData.REC[i].CCY,
											U_Transfer_out : formData.REC[i].TXLMTCY,
											U_Maximum : formData.REC[i].TXLMT,
											U_ACCName : formData.REC[i].NAME,
										};
										GridData.push(record);
								}

								

								form.getControl("U_Grid2").setValue(GridData);
								// form.setFieldValue("U_transaction_result",
								// ret.form.ABEND);
								// form.setFieldValue("U_transaction_results",
								// codeDic[i].text);
							} else {
								Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
								return;
							}
						});
	},

	doOnchange : function() {
		form.getControl("U_HKID").onchange = function() {
			GlobalNetworkForm.doHKID();
		};
	},
	
	doOnchange2 : function() {
		form.getControl("U_HKID2").onchange = function() {
			GlobalNetworkForm.doHKID2();
		};
	},

	doHKID : function() { // 字數檢核
		if (form.getFieldValue("U_HKID")) {
			if (form.getFieldValue("U_HKID").length != 10) {
				Jui.message.alert("帳號資料格式須為10位實體帳號");
				form.setFieldValue("U_HKID", null);
			}
		}
	},
	
	doHKID2 : function() { // 字數檢核
		if (form.getFieldValue("U_HKID2")) {
			if (form.getFieldValue("U_HKID2").length != 10) {
				Jui.message.alert("帳號資料格式須為10位實體帳號");
				form.setFieldValue("U_HKID2", null);
			}
		}
	},
	
	doCQ17 : function() {
		//form.getControl("U_Grid3").setValue();
		form.setFieldValue("U_HKID3", "");
		var ccid = form.getFieldValue("U_CCID");
		
		if(!ccid){
			Jui.message.hint("請輸入\"客戶自選ID\"");
			return;
		}else if (!(ccid.length == 10 || ccid.length == 9) || ccid.substr(0,3)!="TBB"){
			Jui.message.hint("請輸入正確的\"客戶自選ID\"")
			return;
		}
		data = {
				"TXID" : "CQ17",
		        "VID"  : "1234",
		};
		var args = JSON.stringify({
		        "name"      : "CQ17tbbapi",
		        "from"      : "CSR",
		        "sessionId" : "XXX",
		        "formData"  : data,
		});
		var bar = Jui.message.progress(function() {
	    	Jui.message.hint("查詢資料中，請稍後...");
        });
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			console.log(ret);
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			if (ret.isSuccess) {
				form.setFieldValue("U_HKID3", ret.form.HKID);
				bar.close();
			} else {
				// 電文失敗
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
		});
	},
};