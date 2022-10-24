/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/05/19 
 * Description:疑似不法-登錄交易-存提交易註記登錄 TBB.UDepositFlag
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: AI.WolfWu;
 * LastUpdateDate: 2021/10/26
 * Note: 2021/09/29 新增查詢代碼邏輯
				2021/10/25 對應實體帳號，調整選擇後固定選擇類別為登錄
				2021/10/26 針對回傳訊息調整一併顯示在交易結果欄位中
				2022/02/21-lillian--	1.帳號類型選 [實體帳號] 時--執行19
										2.帳號類型選 [虛擬帳號] 
											a.終止存提登錄類別
												-選[登錄] --  	1.金額欄位輸入0元時 執行29
														  		2.金額欄位大於0元時 執行29、07
									   			-選[圈存] --	執行07
												-選[解圈] --	執行57
 ******************************************************************************/
var UDepositFlagForm = {
	sessionId : null,
	agentId : null,
	ACNO : null,
	// UID : "",
	doLoad : function() {
		ACNO= clientData.urlArgs.U_ACN;
		if(!Jui.string.isEmpty(ACNO)){
			form.setFieldValue("U_ACNO", ACNO);
		}
		UDepositFlagForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UDepositFlagForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		/*if(TBBUtil.getContact()){
			form.setFieldValue("U_UID", TBBUtil.getContact().U_CustID);
			UDepositFlagForm.UID = TBBUtil.getContact().U_CustID;
		}else {
			form.setFieldValue("U_UID", "");
		}*/


		// form.getControl("U_Type").onchange = UDepositFlagForm.doChange;
		// form.getControl("U_Type").fireEvent("onchange");
		form.getControl("U_ACType").onchange = UDepositFlagForm.doChange1; //將下拉與點選框觸發分開
		form.getControl("U_RegType").onchange = UDepositFlagForm.doChange2; //將下拉與點選框觸發分開
		form.getControl("U_Button").onclick = UDepositFlagForm.doCheck;
		
		// 20210921 add by gemfor\Tiffany
		form.getControl("U_Note").setElementStyle("margin-top: 40px;");
		Jui.event.attach(form.getControl("U_ACNO"), "onchange", function() { 
			UDepositFlagForm.doACNO();
		});
	},
	// 連動欄位 hsin
	doChange1 : function() {
		form.setFieldValue("U_RegType", "");
		/* var type = form.getFieldValue("U_Type");
		if(type == 1){
			form.setFieldDisabled("U_ACNO",true);// 帳號
			form.setFieldDisabled("U_ACType",true);
			form.setFieldDisabled("U_UID",false);
			form.setFieldValue("U_ACNO", UDepositFlagForm.ACNO);// 帳號
			form.setFieldValue("U_ACType", "");
			form.setFieldRequired("U_RegType", true);
			form.setFieldRequired("U_Amount", true);
			form.setFieldDisabled("U_RegType", false);// 終止存提登錄類別
			form.setFieldDisabled("U_Amount", false);
		}else{*/
			form.setFieldDisabled("U_ACNO",false);
			form.setFieldDisabled("U_ACType",false);
			// form.setFieldDisabled("U_UID",true);
			// form.setFieldValue("U_UID",UDepositFlagForm.UID);
			form.setFieldDisabled("U_RegType", false);
			form.setFieldDisabled("U_Amount", false);
			form.setFieldRequired("U_RegType", true);// 終止存提登錄類別
			form.setFieldRequired("U_Amount", true);
		//}
		var acType = form.getFieldValue("U_ACType");
		// if (type == 2 && acType == '虛擬帳號') {
		if (acType == '虛擬帳號') {
			form.setFieldDisabled("U_RegType", false);
			form.setFieldDisabled("U_Amount", false);
			form.setFieldRequired("U_RegType", true);// 終止存提登錄類別
			form.setFieldRequired("U_Amount", true);
		// } else if (type == 2 && acType != '虛擬帳號'){
		} else if (acType != '虛擬帳號' && acType != null) {
			form.setFieldRequired("U_RegType", false);
			form.setFieldRequired("U_Amount", false);
			form.setFieldDisabled("U_RegType", true);
			form.setFieldDisabled("U_Amount", true);
			form.setFieldValue("U_Amount", "");
			form.setFieldValue("U_RegType", "29");// 終止存提登錄類別 對應實體帳號，調整選擇後固定選擇類別為登錄
			form.setFieldValue("U_RegDT", null);
			form.setFieldValue("U_RegTellerNo", "");
			form.setFieldValue("U_SeqNo", "0");
		}
		},
	doChange2 : function() {
		var regType = form.getFieldValue("U_RegType");
		if (regType == 57) {
			form.setFieldDisabled("U_RegDT", false);
			form.setFieldDisabled("U_RegTellerNo", false);
			form.setFieldDisabled("U_SeqNo", false);
			form.setFieldRequired("U_RegDT", true);
			form.setFieldRequired("U_RegTellerNo", true);
			form.setFieldRequired("U_SeqNo", true);
		} else {
			form.setFieldDisabled("U_RegDT", true);
			form.setFieldDisabled("U_RegTellerNo", true);
			form.setFieldDisabled("U_SeqNo", true);
			form.setFieldRequired("U_RegDT", false);
			form.setFieldRequired("U_RegTellerNo", false);
			form.setFieldRequired("U_SeqNo", false);
			form.setFieldValue("U_RegDT", null);
			form.setFieldValue("U_RegTellerNo", "");
			form.setFieldValue("U_SeqNo", "0");
		}
		
	},

	// 顯示彈跳訊息確認 hsin
	doCheck : function() {
		if (!form.validate()) {
			return;
		}
		var checkMessage = "";
		var acType = form.getFieldValue("U_ACType");
		// var type = form.getFieldValue("U_Type");
		// if (type == 2 && acType == '虛擬帳號') {
		if (acType == '虛擬帳號') {
			checkMessage = '帳號：' + form.getFieldValue("U_ACNO") + '\n登錄類別：'
					+ form.getControl("U_RegType").getTexts()[0] + '\n確認執行登錄交易';
		// } else if((type == 2 && acType != '虛擬帳號') ){
		} else if(acType != '虛擬帳號'){
			checkMessage = '帳號：' + form.getFieldValue("U_ACNO") + '\n確認執行登錄交易';
		} /*else{
			checkMessage = '統一編號：' + form.getFieldValue("U_UID") + '\n登錄類別：'
			+ form.getControl("U_RegType").getTexts()[0] + '\n確認執行登錄交易';
		}*/

		Jui.message.confirm(checkMessage, function(result) {
			if (result == 'ok') {
				//UDepositFlagForm.doFlag();
				//2022.02.21-lillian--	1.帳號類型選 [實體帳號] 時--執行19
				//						2.帳號類型選 [虛擬帳號] 
				//							a.終止存提登錄類別
				//								-選[登錄] --  	1.金額欄位輸入0元時 執行29
				//										  	2.金額欄位大於0元時 執行29、07
				//						   		-選[圈存] --	執行07
				//								-選[解圈] --	執行57
				let U_Amount = form.getFieldValue("U_Amount");
				let U_RegType = form.getFieldValue("U_RegType");
				if(acType == '實體帳號'){
					UDepositFlagForm.doFlag('19');
				}else if(acType == '虛擬帳號'){
					if(U_RegType == '29'){
						if(U_Amount == 0){
							UDepositFlagForm.doFlag('29');
						}else if ( U_Amount > 0){
							UDepositFlagForm.doFlag('29');
							UDepositFlagForm.doFlag('07');
						}else{
							Jui.message.alert("金額不能為負數！");
							return;
						}
					}else if (U_RegType == '07'){
						UDepositFlagForm.doFlag('07');
					}else if (U_RegType == '57'){
						UDepositFlagForm.doFlag('57');
					}else{
						return;
					}
				}
			} else {
				return;
			}
		});
	},

	// 執行存提交易註記登錄 hsin
	doFlag : function(type) {
		form.setFieldValue("U_Result", "");
		// 日期轉格式yyymmdd
		var regDT = form.getFieldValue("U_RegDT");
		if (regDT) {
			var regDTY = regDT.substring(0, 4);
			var regCDTY = parseInt(regDTY) - 1911;
			regDT = regCDTY + regDT.substring(5, 7) + regDT.substring(8, 10);
		}
		var data = {};
		// var type = form.getFieldValue("U_Type");
		// var uID = form.getFieldValue("U_UID");
		var acNo = form.getFieldValue("U_ACNO");
		/*if(type==1){
			acNo = "";
		}else{
			uID = "";
		}*/
		data = {
			"ACN" : acNo,									// 帳號
			// "CUSIDN" : uID,
			"CUSIDN" : "",									// 統一編號
			//"TYPE" : form.getFieldValue("U_RegType"),		//2022.02.21-lillian-修正
			"TYPE" : type,									// 終止存提登錄類別
			"OPID" : UDepositFlagForm.agentId,				// 客服人員代號
			"AMOUNT" : form.getFieldValue("U_Amount"),		// 金額
			"DATACT" : regDT,								// 原登錄日期
			"EVTTLR" : form.getFieldValue("U_RegTellerNo"),	// 原登錄櫃員代號
			"SEQTRN" : form.getFieldValue("U_SeqNo"),		// 原交易序號
			// "MESSAGE":form.getFieldValue("U_MESSAGE"),	//訊息內容說明
			"MESSAGE" : "",
		};

		var args = JSON.stringify({
			"name" : "S604tbbapi",
			"from" : "csr",
			"sessionId" : UDepositFlagForm.sessionId,
			"agentId" : UDepositFlagForm.agentId,
			"formData" : data
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			// console.log('0521'+ret);
			console.log(ret);
			if(ret.isSuccess){
			    
                if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210929 adjust by gemfor\Tiffany
                	var MSGCOD = ret.form.ABEND;
					/* //調整回傳訊息調整一併顯示在交易結果欄位中
                    form.setFieldValue("U_Result", ret.form.ABEND);
                    msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                    for (var i = 0; i < msgcodDicRet.length; i++) {
                        if (msgcodDicRet[i].value == MSGCOD) {
                            form.setFieldValue("U_Result", msgcodDicRet[i].text);
                            break;
                        }
                    }
                    return;
					*/
					var res_Message = ret.form.MESSAGE
					form.setFieldValue("U_Result", ret.form.ABEND + " " + res_Message.trim());
					TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                } else {
                	form.setFieldValue("U_Result", "交易成功");
					TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                }
//				var source = ret.form;
//				var resultText="";
//				if(source.ABEND == "OKLR"){
//					resultText="交易成功";
//				}else if(source.ABEND == "EACC"){
//					resultText="帳號有誤";
//				}else if(source.ABEND == "ERDB"){
//					resultText="中心檔案有誤";
//				}else if(source.ABEND == "ENRD"){
//					resultText="無資料";
//				}
//				form.setFieldValue("U_Result", resultText)
			} else{
			    // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                return;
			}
		})

	},
	
	/*聯絡人左側點選 hsin
	doClick: function() {
		location.href = location.protocol + "//" + location.host+'/ecp/TBB.UDepositFlag.Form.page';
    }*/
	
	doACNO : function() { // 20210921 add by gemfor\Tiffany -- 檢核帳號/虛擬帳號字數
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("“帳號/虛擬帳號”須至少11碼");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},
}
Jui.event.attach(window, 'load', UDepositFlagForm.doLoad);