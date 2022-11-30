/********************************************************************************
	 暫停轉帳簡訊發送表單
	 * Author: 			gemfor\Liz
	 * CreateDate: 		2022.10.31
	 * LastUpdateUser: 	gemfor\Liz
	 * LastUpdateDate: 	2022.11.30 
	 * Note: 2022.11.30 - gemfor\Liz - 發送電文時增加"請等待"小視窗
*********************************************************************************/
var NotSMSForm = {
		doLoad : function(){
			NotSMSForm.doToolBar();
			Jui.event.attach(form.getControl("U_button"), "onclick", NotSMSForm.doConfirm);
			Jui.event.attach(form.getControl("U_REenter"), "onclick", NotSMSForm.doClear);
		},
		
		// toolBar好像不會用到所以先隱藏
		doToolBar: function(){
			toolBar.setItemVisible("Save", false);
			toolBar.setItemVisible("Other", false);
		},
		
		// [執行]按鈕
		doConfirm: function(){
			var account = form.getFieldValue("U_Account");
			if(Jui.string.isEmpty(account)){
				Jui.message.hint("請輸入金融卡帳號！");
				return;
			}
			
			Jui.message.confirm("帳號：" + account +  "\n異動類型：暫停轉帳簡訊通知\n\n執行事項將紀錄於報表中\n確定執行「暫停轉帳簡訊通知」嗎？", function(result) {
				if(result=="ok"){
					NotSMSForm.doA013(account); 
					return;
				}
			}, true);
		},
		
		// [重新輸入]按鈕
		doClear: function(){
			form.setFieldValue("U_Account", null);
			form.setFieldValue("U_transaction_Result", null);
			form.setFieldValue("U_transaction_Results", null);
		},
		
		
		// 發送電文
		doA013 : function(account){
			var loading = Jui.basic.ProgressBar.open();
			form.setFieldValue("U_transaction_Result", null);
			form.setFieldValue("U_transaction_Results", null);
			var userFId = CommonBusiness.getCurrentUser().userId;
			var userId = CommonBusiness.getFieldValue("Qs.User", userFId, "FLoginName");
			var args = JSON.stringify({
				"name":	"A013tbbapi",
				"from": "CSR",
				"sessionId": Jui.random.nextUuid(),
				"agentId": userId,
				"formData": {
								"TXACN": account, 
								"USERID": userId
							}
			});
			console.log(args);
			// 發送電文
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				if (ret == undefined) {
					loading.close();
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.hasOwnProperty("isSuccess") && ret.isSuccess == true) {
					let abend = ret.form.ABEND != undefined ? ret.form.ABEND : null;
					var abendTxt = "";
					let abendDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
					for (let i = 0; i < abendDic.length; i++) {
						if (abendDic[i].value == abend) {
							abendTxt =  abendDic[i].text ? abendDic[i].text : abend ;
						}
					}
					
					form.setFieldValue("U_transaction_Result", abend);
					form.setFieldValue("U_transaction_Results", abendTxt);
					loading.close();
					Jui.message.hint("電文發送成功");
				} else {
					loading.close();
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			});
		}
};