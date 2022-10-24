/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/02 
 * Description:憑證暫禁/一般網銀密碼終止 TBB.UCertificateDisable
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: gemfor\Liz.chen;
 * LastUpdateDate: 2022/02/25
 * Note:
 * 		2022/02/15 gemfor\Liz /一般網銀密碼終止完成時間/帶入當前時間
 * 		2022/02/25 gemfor\Liz 交易成功時/一般網銀密碼終止完成時間/帶入當前時間
 ******************************************************************************/
var UCertificateDisableForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    doLoad: function() {
        UCertificateDisableForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UCertificateDisableForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        form.getControl("U_CertificateSuspend1").onchange = UCertificateDisableForm.doChange;
        form.getControl("U_CertificateSuspend1").fireEvent("onchange");
        UCertificateDisable.doLoad();

    },

    // 連動欄位 hsin
    doChange: function() {
        var certifiSuspend = form.getFieldValue("U_CertificateSuspend1");
        if (!certifiSuspend) {
            form.setFieldRequired("U_CertificateDisableDate", false);
            form.setFieldRequired("U_PasswordSuspendDate", false);
        } else if (certifiSuspend.indexOf(0) != -1 && certifiSuspend.indexOf(1) == -1) {
            form.setFieldRequired("U_CertificateDisableDate", true);
            form.setFieldRequired("U_PasswordSuspendDate", false);
        } else if (certifiSuspend.indexOf(1) != -1 && certifiSuspend.indexOf(0) == -1) {
            form.setFieldRequired("U_CertificateDisableDate", false);
            form.setFieldRequired("U_PasswordSuspendDate", true);
        } else {
            form.setFieldRequired("U_CertificateDisableDate", true);
            form.setFieldRequired("U_PasswordSuspendDate", true);
        }
    },



    // 帶入客戶資料 改寫成發S102 hsin
    getFinanceQuery: function() {
        if (UCustID.doCheck()) {
			form.setFieldValue("U_Result", "");
			form.setFieldValue("U_ResultExplain", ""); 
			var data = {};
            data = {
                "CUSIDN": form.getFieldValue("U_CustID"), // 統一編號
				"USERDATA":""
            };

            var args = JSON.stringify({
                "name": "S102tbbapi",
                "from": "csr",
                "sessionId": UCertificateDisableForm.sessionId,
                "agentId": UCertificateDisableForm.agentId,
                "formData": data
            });
            console.log(args);
            TBBUtil.doPost(JSON.parse(args), function(ret) {
                console.log(ret);
                if (ret.isSuccess) {
					var source = ret.form;
					form.setFieldValue("U_CustName", source.NAME);//客戶姓名
					form.setFieldValue("U_CustMobile", source.MOBTEL); //手機
					form.setFieldValue("U_TelNum", source.TELNUM); //住家電話
					form.setFieldValue("U_CustAddress", source.CTTADR); //地址
					
					 var MSGCOD = ret.form.ABEND;
                     form.setFieldValue("U_Result", ret.form.ABEND);
                     msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                     for (var i = 0; i < msgcodDicRet.length; i++) {
                         if (msgcodDicRet[i].value == MSGCOD) {
                             form.setFieldValue("U_ResultExplain", msgcodDicRet[i].text);
                             break;
                         }
                     }
					
					//20180927      防呆設置   susie (原設計邏輯)
					form.setFieldValue("U_Notifiers", '0'); //通報人     預設‘本人’
					form.setFieldValue("U_PhoneInform", '1'); //電話告知    預設‘分行’
					//EntityForm.$doSave();
                }
            })

        }else  {return false;}

    },

    // 顯示彈跳訊息確認 hsin
    doCheck : function() {
        
        var checkMessage = '確認執行一般網銀密碼終止';
        Jui.message.confirm(checkMessage, function(result) {
            if (result == 'ok') {
                UCertificateDisableForm.doPostCQ12();
            } else {
                return;
            }
        });
    },
    
	//執行一般網銀密碼終止 hsin
	doPostCQ12: function(){
		form.setFieldValue("U_Result_2", "");
		form.setFieldValue("U_ResultExplain_2", "");
		
		data = {
			"CUSIDN" : form.getFieldValue("U_CustID"),// 統一編號
		};

		var args = JSON.stringify({
			"name" : "CQ12tbbapi",
			"from" : "csr",
			"sessionId" : UCertificateDisableForm.sessionId,
			"agentId" : UCertificateDisableForm.agentId,
			"formData" : data
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			// console.log('0521'+ret);
			console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
			}
			if(ret.isSuccess){
				//電文回傳狀態
				
				if(ret.isSuccess){
					var source = ret.form;
					var resultText="";
					if(source.ABEND == "OKLR"){
						resultText="交易成功";
						form.setFieldValue("U_PasswordSuspendDate", new Date()); // 20220225 交易成功時/一般網銀密碼終止完成時間/帶入當前時間 by gemfor\Liz 
					}else if(source.ABEND == "0000"){
					    resultText="交易成功";
                        form.setFieldValue("U_PasswordSuspendDate", new Date()); // 20220317 交易成功時/一般網銀密碼終止完成時間/帶入當前時間 by chainsea\hsin 
                    }else if(source.ABEND == "EACC"){
						resultText="帳號有誤";
					}else if(source.ABEND == "ERDB"){
						resultText="中心檔案有誤";
					}else if(source.ABEND == "ENRD"){
						resultText="無資料";
					}
					form.setFieldValue("U_Result_2", source.ABEND);
					form.setFieldValue("U_ResultExplain_2", resultText);
					//form.setFieldValue("U_PasswordSuspendDate", new Date()); // 20220215 /一般網銀密碼終止完成時間/帶入當前時間 by gemfor\Liz //20220225交易成功時才帶入
				}
				
				
			}else{
			    // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
			}
		})

	},
	

}
Jui.event.attach(window, 'load', UCertificateDisableForm.doLoad);