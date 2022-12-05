/**
 * 
 */
var BankTelForm = {
	doLoad : function() {
		form.getControl("U_Button4").onclick = BankTelForm.doCQ16;
	},
	doCQ16 : function() {
		form.setFieldValue("U_transaction_results","");
		form.setFieldValue("U_De_Results","");
		form.getControl("U_Gird3").setValue();
		
		var account = form.getFieldValue("U_account");
		
		if (!account) {
            Jui.message.hint("請輸入\"轉出帳號\"");
            return;
        } else if(account.length!=16 || account.substr(0,5)!="00000") {
        	Jui.message.hint("請輸入正確的\"轉出帳號\"");
            return;
        }
		
		data = {
				"TXID"   : "CQ16",
		        "TSFACN" : "1234",
		};
		var args = JSON.stringify({
		        "name"      : "CQ16tbbapi",
		        "from"      : "CSR",
		        "sessionId" : "XXX",
		        "agentId"   : BankTelForm.agentId,
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
				var ABEND = ret.form.ABEND;
				form.setFieldValue("U_transaction_results", ret.form.ABEND);
				ABENDDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
				for (var i = 0; i < ABENDDicRet.length; i++) {
					if (ABENDDicRet[i].value == ABEND) {
						form.setFieldValue("U_De_Results", ABENDDicRet[i].text);
						break;
					}
				}
				var U_O_Data = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
					var record = {
							U_Appointment_Date        : TBBUtil.formatDTM(formData.REC[i].DATTSF,""),
							U_serial_number           : formData.REC[i].SEQ,
							U_transaction_source      : formData.REC[i].TRNSRC,
							U_trasaction_code         : formData.REC[i].TRNCOD,
							U_Outgoing_currency       : formData.REC[i].OUTCRY,
							U_transfer_bank           : formData.REC[i].OUTBNK,
							U_Incoming                : formData.REC[i].INTSCRY,
							U_line                    : formData.REC[i].INTSBNK,
							U_account                 : formData.REC[i].INTSACN,
							U_Transfer_amount         : TBBUtil.thousandComma(formData.REC[i].AMOUNT),
							U_Transaction_content     : formData.REC[i].TRNDTA, 
							U_Transfer_account_length : formData.REC[i].INLEN, 
							U_date_Time               : TBBUtil.formatDTM(formData.REC[i].PRVDAT , formData.REC[i].PRVTIM) , 
							U_sequential_files        : formData.REC[i].WRSQYN, 
							U_cancelled               : formData.REC[i].DLTYN,  
							U_date_and_time           : TBBUtil.formatDTM(formData.REC[i].DATDLT , formData.REC[i].TIMDLT),
							U_Fee_note                : formData.REC[i].FEEFLG,
							U_phone_NUM               : formData.REC[i].TELNUM,
					};
					U_O_Data.push(record);	
				}
				form.getControl("U_Gird3").setValue(U_O_Data);	
				bar.close();
			} else {
				// 電文失敗
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
		});
	},
}
Jui.event.attach(window, 'load', BankTelForm.doLoad);