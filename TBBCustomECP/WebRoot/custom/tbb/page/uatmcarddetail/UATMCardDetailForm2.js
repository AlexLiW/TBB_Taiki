
var UATMCardDetailForm2 = {
		doLoad : function(U_OSAMDKEY){
			if(clientData.urlArgs.U_CID != undefined){
				form.setFieldValue("U_CID",clientData.urlArgs.U_CID);
			}
			UATMCardDetailForm2.doChange();
		},
		
		doChange : function(){
			form.getControl("U_Inquire").onclick = function() {
					UATMCardDetailForm2.doInquire();
			};
			
		},
		doInquire : function(){
			var CID = form.getFieldValue("U_CID"); //取得悠遊卡外顯卡號
			if (CID == "" || CID == null) {
				return;
			}
			if (!form.validate()) {
				return;
			}			
			TBBUtil.doClearFields("悠遊卡資訊", null, null);
			TBBUtil.doClearFields("卡片資訊", null, null);
			
			UATMCardDetailForm2.doA016();
		},
		//2022.11.02-gemfor/olivia--新增電文A016
		doA016 : function(){
			if (!form.validate()) {
				return;
			}
			
			UATMCardDetailForm2.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm2.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
			        "TXSAMD"	: form.getFieldValue("U_CID") //悠遊卡號
			};
			
			var args = JSON.stringify({
				"name" 		: "A016tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm2.sessionId,
				"agentId" 	: UATMCardDetailForm2.agentId,
				"formData" 	: data
			});
			var bar = Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				setTimeout(function() {

					console.log(ret);
					if (ret == undefined) {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					if (ret.isSuccess == true) {
						let ABEND = ret.form.ABEND;					//電文回應代號
						var ABEND_text = "";
						let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
						for (let i = 0; i < ABEND_Dic.length; i++) {
							if (ABEND_Dic[i].value == ABEND) {
								ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
								form.setFieldValue("U_Transaction_result", ABEND);			//交易結果
								form.setFieldValue("U_D_Transaction_results", ABEND_text);	//交易結果說明
								break;
							}
						}
												
						if(ABEND == "0000" || ABEND == "OKLR"){
							var U_ECard_Information = [];	
							var U_C_nformation = [];						//用來將電文取回且整理好的值塞入網格
							var formData = ret.form;					//取回傳資料
							for (var i = 0; i <= formData.REC.length - 1; i++) {
 
			                    //掛失/退卡/停卡日期 LSTLTD
			                    var U_date_of_loss = formData.REC[i].LSTLTD;
			                    if (U_date_of_loss != null && U_date_of_loss.trim() != "") {
			                        U_date_of_loss = (U_date_of_loss.substr(0, 4)-1911) + "/" + U_date_of_loss.substr(4, 2) + "/" + U_date_of_loss.substr(6, 2);
			                    }
	
			                    //自動加值開啟日 OPNDATE
			                    var U_Opening_Date = formData.REC[i].OPNDATE;
			                    if (U_Opening_Date != null && U_Opening_Date.trim() != "") {
			                        U_Opening_Date = (U_Opening_Date.substr(0, 4)-1911) + "/" + U_Opening_Date.substr(4, 2) + "/" + U_Opening_Date.substr(6, 2);
			                    }
	
			                    //首次自動加值日 VALDATE
			                    var U_top_up_day = formData.REC[i].VALDATE;
			                    if (U_top_up_day != null && U_top_up_day.trim() != "") {
			                        U_top_up_day = (U_top_up_day.substr(0, 4)-1911) + "/" + U_top_up_day.substr(4, 2) + "/" + U_top_up_day.substr(6, 2);
			                    }
	
			                    //停卡餘額轉置通知檔日 ENDDATE
			                    var U_balance_transfer = formData.REC[i].ENDDATE;
			                    if (U_balance_transfer != null && U_balance_transfer.trim() != "") {
			                        U_balance_transfer = (U_balance_transfer.substr(0, 4)-1911) + "/" + U_balance_transfer.substr(4, 2) + "/" + U_balance_transfer.substr(6, 2);
			                    }
							
							let ECardData = {
									"U_date_of _loss"				: U_date_of_loss,		//掛失/退卡/停卡日期 LSTLTD
									"U_last_ EasyCard_Num"			: formData.REC[i].LSTCDNO,	//上一張悠遊卡外顯號 LSTCDNO
									"U_Debit_NUM"					: formData.REC[i].ACN,			//金融卡帳號 ACN
									"U_Opening_Date"				: U_Opening_Date,		//自動加值開啟日 OPNDATE
									"U_top_up_day"					: U_top_up_day,			//首次自動加值日 VALDATE
									"U_balance_transfer"			: U_balance_transfer,	//停卡餘額轉置通知檔日 ENDDATE
									"U_Card_refund"					: formData.REC[i].SIGN1 + formData.REC[i].AMOUNT,			//退卡金額 AMOUNT
									"U_service_fee"					: formData.REC[i].SIGN2 + formData.REC[i].FEE,			//退卡服務費 FEE
									"U_value"						: formData.REC[i].TXACNT
									
							}
							U_ECard_Information.push(ECardData);
							//查詢結果網格需以 掛失/退卡/停卡日期 由遠到近 排序
							U_ECard_Information = U_ECard_Information.sort(function(a,b){
								if(a.U_date_of_loss > b.U_date_of_loss){
									return 1;
								}else if(a.U_date_of_loss < b.U_date_of_loss){
									return -1;
								}else if(a.U_date_of_loss == b.U_date_of_loss){
									return 1;
								}
							});
							
							form.getControl("U_ECard_Information").setValue(U_ECard_Information);

							let CardData = {
									"U_Card_NUM"				: "",		//卡片號碼
									"U_Easy_card_NUM"			: formData.REC[i].TXSAMD,	//悠遊卡外顯卡號									
							}
							U_C_nformation.push(CardData);
							
							
							form.getControl("U_C_nformation").setValue(U_C_nformation);
	
							bar.close();
							}
						}else{
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					
				}, 1 * 10);
			});
		},
		
		
}