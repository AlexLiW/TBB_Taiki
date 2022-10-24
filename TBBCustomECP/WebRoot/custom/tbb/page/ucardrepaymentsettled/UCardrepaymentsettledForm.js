/********************************************************************************
	 信用卡指定日期還款結清金額試算
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.29
	 * LastUpdateUser: 	gemfor\Tiffany
	 * LastUpdateDate: 	2021.09.27
	 * Note: 新增查詢無資料邏輯
*********************************************************************************/
var UCardrepaymentsettledForm = {
		doLoad : function(){
			
			UCardrepaymentsettledForm.doChange();
			
			//如果是從"信用卡持卡總覽查詢"打開時，如果 卡號 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_CardNum", clientData.urlArgs.U_CardNum);
			}
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'查詢' 按鈕 與上下間個距離增加
			form.getControl("U_CardNum").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'卡號' 與上下間個距離增加
			form.getControl("U_Nowdate").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'日期' 與上下間個距離增加
			
			// 20210919 add by gemfor\Tiffany
			document.getElementsByName("U_Settlepayment")[0].firstChild.firstChild.style.color = 'black';
			document.getElementsByName("U_Settlepayment")[0].firstChild.firstChild.style.fontWeight = 'bold';
			form.getControl("U_Note1").setElementStyle("margin-top: 40px;");
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				UCardrepaymentsettledForm.doBSPO();
			};
			
			form.getControl("U_CardNum").onchange = function() { // 20210919 add by gemfor\Tiffany
				UCardrepaymentsettledForm.doCardNum();
			};
		},
		
		doBSPO : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			var U_Nowdate = form.getFieldValue("U_Nowdate");
			U_Nowdate_format = U_Nowdate.substr(0, 4) + U_Nowdate.substr(5, 2) + U_Nowdate.substr(8, 2);
			
			UCardrepaymentsettledForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCardrepaymentsettledForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"CARDNUM" 	: form.getFieldValue("U_CardNum"), 	//卡號
					"EFFDATE"	: U_Nowdate_format					//日期
			};
			
			var args = JSON.stringify({
				"name" 		: "BSPOtbbapi",
				"from" 		: "CSR",
				"sessionId" : UCardrepaymentsettledForm.sessionId,
				"agentId" 	: UCardrepaymentsettledForm.agentId,
				"formData" 	: data
			});
			
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.isSuccess == true) {
					var formData = ret.form;							//取回傳資料
					
					form.setFieldValue("U_ErrorCode", formData.ABEND);	//交易代號
					
					// 交易訊息/結果  20210927 adjust by gemfor\Tiffany
					/*if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo", "資料待續查");
					}*/
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10c777500"}).data; // TBB-BSPO回應碼
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
						return;
					} else {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
					}
					// 20210927 adjust by gemfor\Tiffany -- end
					
					var U_Interestaccrualdate = formData.ACCRDATE.substr(0, 4) + "/" + formData.ACCRDATE.substr(4, 2) + "/" + formData.ACCRDATE.substr(6, 2);
					var U_Settlementdate = formData.PAYOFFDATE.substr(0, 4) + "/" + formData.PAYOFFDATE.substr(4, 2) + "/" + formData.PAYOFFDATE.substr(6, 2);
					var U_Lastpatdate = formData.LASTPAYDATE.substr(0, 4) + "/" + formData.LASTPAYDATE.substr(4, 2) + "/" + formData.LASTPAYDATE.substr(6, 2);
					
					// 20210919 adjust by gemfor\Tiffany --數值化
					/*var U_Dailyinterest = formData.PERDIEMSIGN + Common.doCheckNumber(formData.PERDIEM.substr(0, 5)) + "." + formData.PERDIEM.substr(5, 4);
					var U_Balance = formData.CURRBALSIGN + Common.doCheckNumber(formData.CURRBAL.substr(0, 9)) + "." + formData.CURRBAL.substr(9, 2);
					var U_Cashadvanceint = formData.CASHACCRUSIGN + Common.doCheckNumber(formData.CASHACCRU.substr(0, 9)) + "." + formData.CASHACCRU.substr(9, 2);
					var U_Consumeint = formData.RTLACCRUSIGN + Common.doCheckNumber(formData.RTLACCRU.substr(0, 9)) + "." + formData.RTLACCRU.substr(9, 2);
					var U_ACCRUEDINTEREST = formData.PROJECTAMTSIGN + Common.doCheckNumber(formData.PROJECTAMT.substr(0, 7)) + "." + formData.PROJECTAMT.substr(7, 2);
					var U_Settlepayment = formData.PAYOFFAMTSIGN + Common.doCheckNumber(formData.PAYOFFAMT.substr(0, 9)) + "." + formData.PAYOFFAMT.substr(9, 2); */
					
					var U_Dailyinterest = formData.PERDIEMSIGN + Common.doCheckNumber(parseInt(formData.PERDIEM.substr(0, 5)).toString()) + "." + formData.PERDIEM.substr(5, 4);
					var U_Balance = formData.CURRBALSIGN + Common.doCheckNumber(parseInt(formData.CURRBAL.substr(0, 9)).toString()) + "." + formData.CURRBAL.substr(9, 2);
					var U_Cashadvanceint = formData.CASHACCRUSIGN + Common.doCheckNumber(parseInt(formData.CASHACCRU.substr(0, 9)).toString()) + "." + formData.CASHACCRU.substr(9, 2);
					var U_Consumeint = formData.RTLACCRUSIGN + Common.doCheckNumber(parseInt(formData.RTLACCRU.substr(0, 9)).toString()) + "." + formData.RTLACCRU.substr(9, 2);
					var U_ACCRUEDINTEREST = formData.PROJECTAMTSIGN + Common.doCheckNumber(parseInt(formData.PROJECTAMT.substr(0, 7)).toString()) + "." + formData.PROJECTAMT.substr(7, 2);
					var U_Settlepayment = formData.PAYOFFAMTSIGN + Common.doCheckNumber(parseInt(formData.PAYOFFAMT.substr(0, 9)).toString()) + "." + formData.PAYOFFAMT.substr(9, 2);
					
					form.setFieldValue("U_Interestaccrualdate", U_Interestaccrualdate);		//系統已累積計息日期
					form.setFieldValue("U_Settlementdate", U_Settlementdate);				//結清日期
					form.setFieldValue("U_Lastpatdate", U_Lastpatdate);						//最後繳款日
					form.setFieldValue("U_Dailyinterest", U_Dailyinterest);					//每日利息
					form.setFieldValue("U_Balance", U_Balance);								//目前餘額
					form.setFieldValue("U_Cashadvanceint", U_Cashadvanceint);				//預借現金累積已計息
					form.setFieldValue("U_Consumeint", U_Consumeint);						//消費累積已計息
					form.setFieldValue("U_ACCRUEDINTEREST", U_ACCRUEDINTEREST);				//PROJECTED ACCRUED INTEREST
					form.setFieldValue("U_Settlepayment", U_Settlepayment);					//結清繳款金額
					
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			});
		},
		
		doCardNum : function() { // 20210919 add by gemfor\Tiffany -- 檢核卡號字數
			if (form.getFieldValue("U_CardNum")) {
				if (form.getFieldValue("U_CardNum").length < 16) {
					Jui.message.alert("信用卡卡號需輸入16碼數字！");
					form.setFieldValue("U_CardNum", null);
				}
			}
		},
}