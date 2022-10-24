/********************************************************************************
	 信用卡已出總帳單明細查詢
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.16
	 * LastUpdateUser: Gemfor\Emily.tsai
	 * LastUpdateDate: 2022/03/29
	 * Note: 新增查詢無資料邏輯、日期格式
	 				 2021/10/04 AI\Wolf.wu卡別對應字典轉換為文本顯示
					 2022/01/13 AI\Wolf.wu 針對入帳日期排序不正常的調整、增加電文等待效果
					 2022/01/20 AI\Wolf.wu 對應外幣金額切割的欄位不正確調整、針對幣別套用國際碼轉換
					 2022/02/10 Gemfor\Emily.tsai 交易筆數原一頁12筆改成一頁30筆
					 2022/02/11 Gemfor\Liz.chen 交易代碼對應文字
					 2022/02/14 Gemfor\Liz.chen 排除卡號為000的資料
					 2022/02/25 Gemfor\Liz.chen 帳單明細資訊顯示筆數改為30筆
					 2022/03/29 Gemfor\Emily.tsai 網格欄位值靠右
*********************************************************************************/
var UCUSYearsbillmonthForm = {
		doLoad : function(){
			if ("custID" in clientData.urlArgs) { // 信用卡持卡總覽查詢開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID);
			} else {// 信用卡已出總帳單明細查詢
				var ret = TBBUtil.getContact();
				if (!Jui.array.isEmpty(ret)) {
					var custID = ret.U_CustID;
					form.setFieldValue("U_UID", custID);
				}
			}
			UCUSYearsbillmonthForm.doChange();
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_UID").setElementStyle("margin-top: 30px; margin-bottom: 20px;"); 	//'統一編號' 按鈕 與上下間個距離增加
			form.getControl("U_Inquiry").setElementStyle("margin-top: 30px; margin-bottom: 20px;"); //'查詢' 按鈕 與上下間個距離增加
			
			//隱藏網格標題
			form.setFieldTitle("U_Grid", null);
			form.setFieldTitle("U_Grid2", null);
			
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {								//如果有進線就抓進線，沒有就抓聯絡人
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}else{
				if(EntityForm.getInfoWindow().clientData.entityId != "" && EntityForm.getInfoWindow().clientData.entityId != null){
					var a = CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID");
					form.setFieldValue("U_UID", a);							//帶入主檔身分證字號
				}
			}
			
			// 20210916 add by gemfor\Tiffany
			form.getControl("U_Grid").setPageSize(30);
			UCUSYearsbillmonthForm.setIdOnchange();
			
			// 20220225 帳單明細資訊顯示筆數  gemfor\Liz
			form.getControl("U_Grid2").setPageSize(30);
			
			// 20210930 add by gemfor\Tiffany
			document.getElementsByName("U_Dispute")[0].outerHTML = '<div class="JuiFormItem" name="Space" style="width:33.333333333333336%;padding-left:126px" readonly="true"></div>'
	        	+ document.getElementsByName("U_Dispute")[0].outerHTML;
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				UCUSYearsbillmonthForm.doBSB1();
			};
		},
		
		doBSB1 : function(){
			if (!form.validate()) {
				return;
			}
			
			var fpidInfo = form.getFieldValue("U_UID"); 
			var newfpid = "";
			if(fpidInfo.length == 10){
				var res = /[A-Z]{2}[0-9]{8}/;
				if(res.test(fpidInfo)){
					newfpid = form.getFieldValue("U_UID") + "R";
				} else{
					newfpid = form.getFieldValue("U_UID");
				}
			} else {
				newfpid = form.getFieldValue("U_UID");
			}

			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			form.setFieldValue("U_ErrorCode2", null);
			form.setFieldValue("U_ErrorMemo2", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			UCUSYearsbillmonthForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCUSYearsbillmonthForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					//"IDNUM" : form.getFieldValue("U_UID")
					"IDNUM" : newfpid
			};
					
			var args = JSON.stringify({
				"name" 		: "BSB1tbbapi",
				"from" 		: "CSR",
				"sessionId" : UCUSYearsbillmonthForm.sessionId,
				"agentId" 	: UCUSYearsbillmonthForm.agentId,
				"formData" 	: data
			});
			var bar =
            Jui.message.progress(function() {
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
					// 20210927 add by gemfor\Tiffany -- start
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10b6e45c0"}).data; // TBB-BSB1、BSB2回應碼
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
						bar.close();
						return;
					} else {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
					}
					// 20210927 add by gemfor\Tiffany -- end
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
					
					/* if(formData.ABEND == "0000"){ // 20210927 Tiffany
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}*/
					
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {
							// if (parseInt(formData.REC[i].STMTDATE.replaceAll('/', "")) > 0) { // 20210916 Tiffany - 排除日期為0000/00/00
							if (parseInt(formData.REC[i].STMTDATE.replace(/\//g,'')) > 0) { // 20210928 Tiffany
								var data = {
										"U_Month"	: formData.REC[i].STMTDATE,
										"U_STMNBR"	: formData.REC[i].STMNBR
								}
								U_O_Data.push(data);
							}
						}
					}
					
					// 20210916 Tiffany - 依據帳單日期由近到遠排序
                    var wlen1 = U_O_Data.length;
                    var count1 = 0;// 記錄總執行次數
                    for (var i = 0; i < U_O_Data.length - 1; i++) {
                        for (var j = 0; j < wlen1 - 1; j++) {
                            if (U_O_Data[j].U_Month < U_O_Data[j + 1].U_Month) {
                                var temp;
                                temp = U_O_Data[j];
                                U_O_Data[j] = U_O_Data[j + 1];
                                U_O_Data[j + 1] = temp;
                                count1++;
                            }
                        }
                        wlen1 = wlen1 - 1;
                    }
                    
					form.getControl("U_Grid").setValue(U_O_Data);
					// form.setFieldValue("U_ErrorCode", formData.ABEND); // 20210927 Tiffany
					bar.close();
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				}, 1 * 1000);
			});
		},
		
		doBSB2 : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode2", null);
			form.setFieldValue("U_ErrorMemo2", null);
			TBBUtil.doClearFields("查詢結果", null, "U_Grid");	//清空查詢結果欄位
			
			UCUSYearsbillmonthForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCUSYearsbillmonthForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var U_Month = form.getControl("U_Grid").getEventRow().data.U_Month;
			var U_Month = U_Month.substr(0, 4) + U_Month.substr(5, 2) + U_Month.substr(8, 2);	//時間格式重整
			
			var data = {
					"IDNUM" : form.getFieldValue("U_UID"),
					"STMTDATE" : U_Month,
			        "STMNBR": form.getControl("U_Grid").getEventRow().data.U_STMNBR,
			        "USERDATA": ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BSB2tbbapi",
				"from" 		: "CSR",
				"sessionId" : UCUSYearsbillmonthForm.sessionId,
				"agentId" 	: UCUSYearsbillmonthForm.agentId,
				"formData" 	: data
			});
			var bar =
            Jui.message.progress(function() {
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
					// 20210927 add by gemfor\Tiffany -- start
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10b6e45c0"}).data; // TBB-BSB1、BSB2回應碼
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
						form.setFieldValue("U_ErrorCode2", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo2", ABENDtxt);
						bar.close();
						return;
					} else {
						form.setFieldValue("U_ErrorCode2", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo2", ABENDtxt);
					}
					// 20210927 add by gemfor\Tiffany -- end
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
					
					/* form.setFieldValue("U_ErrorCode2", formData.ABEND); // 20210927 Tiffany
					if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo2", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo2", "資料待續查");
					} */
					
					form.setFieldValue("U_CardType", formData.CARDTYPE);
					form.setFieldValue("U_OCardNum", formData.CARDNUM);
					form.setFieldValue("U_Days", formData.ACRUDATE);
					
					// 20210917 adjust by gemfor\Tiffany -- 金額去0
					//var PREVBAL = formData.PREVBALSIGN + Common.doCheckNumber(formData.PREVBAL.substr(0, 9)) + "." + formData.PREVBAL.substr(9, 2);
					var PREVBAL = formData.PREVBALSIGN + Common.doCheckNumber(parseInt(formData.PREVBAL.substr(0, 9)).toString()) + "." + formData.PREVBAL.substr(9, 2);
					form.setFieldValue("U_Prebalance", PREVBAL);
					
					// var CREDITAMT = formData.CREDITAMTSIGN + Common.doCheckNumber(formData.CREDITAMT.substr(0, 9)) + "." + formData.CREDITAMT.substr(9, 2);
					var CREDITAMT = formData.CREDITAMTSIGN + Common.doCheckNumber(parseInt(formData.CREDITAMT.substr(0, 9)).toString()) + "." + formData.CREDITAMT.substr(9, 2);
					form.setFieldValue("U_Paymentcredit", CREDITAMT);
					
					// var DEBITAMT = formData.DEBITAMTSIGN + Common.doCheckNumber(formData.DEBITAMT.substr(0, 9)) + "." + formData.DEBITAMT.substr(9, 2);
					var DEBITAMT = formData.DEBITAMTSIGN + Common.doCheckNumber(parseInt(formData.DEBITAMT.substr(0, 9)).toString()) + "." + formData.DEBITAMT.substr(9, 2);
					form.setFieldValue("U_Consumptiondebit", DEBITAMT);
					
					// var CASHADV = formData.CASHADVSIGN + Common.doCheckNumber(formData.CASHADV.substr(0, 9)) + "." + formData.CASHADV.substr(9, 2);
					var CASHADV = formData.CASHADVSIGN + Common.doCheckNumber(parseInt(formData.CASHADV.substr(0, 9)).toString()) + "." + formData.CASHADV.substr(9, 2);
					form.setFieldValue("U_Precash", CASHADV);
					
					// var FINCHARGE = formData.FINCHARGESIGN + Common.doCheckNumber(formData.FINCHARGE.substr(0, 9)) + "." + formData.FINCHARGE.substr(9, 2);
					var FINCHARGE = formData.FINCHARGESIGN + Common.doCheckNumber(parseInt(formData.FINCHARGE.substr(0, 9)).toString()) + "." + formData.FINCHARGE.substr(9, 2);
					form.setFieldValue("U_Intexpense", FINCHARGE);
					
					// var CURRBAL = formData.CURRBALSIGN + Common.doCheckNumber(formData.CURRBAL.substr(0, 9)) + "." + formData.CURRBAL.substr(9, 2);
					var CURRBAL = formData.CURRBALSIGN + Common.doCheckNumber(parseInt(formData.CURRBAL.substr(0, 9)).toString()) + "." + formData.CURRBAL.substr(9, 2);
					form.setFieldValue("U_Actualpay", CURRBAL);
					
					// var DISPUTEAMT = formData.DISPUTEAMTSIGN + Common.doCheckNumber(formData.DISPUTEAMT.substr(0, 9)) + "." + formData.DISPUTEAMT.substr(9, 2);
					var DISPUTEAMT = formData.DISPUTEAMTSIGN + Common.doCheckNumber(parseInt(formData.DISPUTEAMT.substr(0, 9)).toString()) + "." + formData.DISPUTEAMT.substr(9, 2);
					// form.setFieldValue("U_Dispute", DISPUTEAMT);  // 20210930 Tiffany
					document.getElementsByName("U_Dispute")[0].children[1].children[0].innerHTML = '<input value = "' + DISPUTEAMT + '">';
					
					// var DOWNPAY = formData.DOWNPAYSIGN + Common.doCheckNumber(formData.DOWNPAY.substr(0, 9)) + "." + formData.DOWNPAY.substr(9, 2);
					var DOWNPAY = formData.DOWNPAYSIGN + Common.doCheckNumber(parseInt(formData.DOWNPAY.substr(0, 9)).toString()) + "." + formData.DOWNPAY.substr(9, 2);
					form.setFieldValue("U_Actualpayment", DOWNPAY);
					
					form.setFieldValue("U_Cardcheckday", formData.STMTDATE1);
					
					form.setFieldValue("U_OCardNum", formData.ACRUDATE);
					
					form.setFieldValue("U_Paydeadline", formData.DUEDATE);
					
					// var CURRDUE = Common.doCheckNumber(formData.CURRDUE.substr(0, 9)) + "." + formData.CURRDUE.substr(9, 2);
					var CURRDUE = Common.doCheckNumber(parseInt(formData.CURRDUE.substr(0, 9)).toString()) + "." + formData.CURRDUE.substr(9, 2);
					form.setFieldValue("U_Periodpay", CURRDUE);
					
					// var PASTDUE = Common.doCheckNumber(formData.PASTDUE.substr(0, 9)) + "." + formData.PASTDUE.substr(9, 2);
					var PASTDUE = Common.doCheckNumber(parseInt(formData.PASTDUE.substr(0, 9)).toString()) + "." + formData.PASTDUE.substr(9, 2);
					form.setFieldValue("U_Minimum", PASTDUE);
					
					// var DUEAMT = Common.doCheckNumber(formData.DUEAMT.substr(0, 9)) + "." + formData.DUEAMT.substr(9, 2);
					var DUEAMT = Common.doCheckNumber(parseInt(formData.DUEAMT.substr(0, 9)).toString()) + "." + formData.DUEAMT.substr(9, 2);
					form.setFieldValue("U_Lowerpay", DUEAMT);
					
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {
							if(formData.REC[i].TYPE.replace(/\s+/g, '') == "000"){	// 20220214 排除卡號為000的資料 by Liz
								continue;
							}
							if(formData.REC[i].CARDNUM != "0000000000000000" && formData.REC[i].POSTDATE != "0000/00/00" &&  formData.REC[i].TXNDATE != "0000/00/00" ) {
								// var TXNAMT = formData.REC[i].TXNAMTS + Common.doCheckNumber(formData.REC[i].TXNAMT.substr(0, 7)) + "." + formData.REC[i].TXNAMT.substr(7, 2);
								// var ORIGCURRAMT = formData.REC[i].ORIGCURRAMTS + Common.doCheckNumber(formData.REC[i].ORIGCURRAMT.substr(0, 7)) + "." + formData.REC[i].ORIGCURRAMT.substr(7, 2);
								var TXNAMT = formData.REC[i].TXNAMTS + Common.doCheckNumber(parseInt(formData.REC[i].TXNAMT.substr(0, 7)).toString()) + "." + formData.REC[i].TXNAMT.substr(7, 2);
								//var ORIGCURRAMT = formData.REC[i].ORIGCURRAMTS + Common.doCheckNumber(parseInt(formData.REC[i].ORIGCURRAMT.substr(0, 7)).toString()) + "." + formData.REC[i].ORIGCURRAMT.substr(7, 2);
								var ORIGCURRAMT = formData.REC[i].ORIGCURRAMTS + Common.doCheckNumber(parseInt(formData.REC[i].ORIGCURRAMT.substr(0, 10)).toString()) + "." + formData.REC[i].ORIGCURRAMT.substr(10, 2);
								
								var CardTypeText = formData.REC[i].TYPE;
								var CardTypeRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c303039590"}).data; // TBB-信用卡卡別 -- 20211004 Wolf
								for (var m = 0; m < CardTypeRet.length; m++) {
									if (CardTypeRet[m].value == CardTypeText) {
										CardTypeText = CardTypeRet[m].text;
									}
								}
								
								var ORIGCURRCODEText = formData.REC[i].ORIGCURRCODE;
								var ORIGCURRCODERet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-d448-ec04-17e76a0e8f70"}).data; // TBB-信用卡幣別 -- 20220120 Wolf
								for (var p = 0; p < ORIGCURRCODERet.length; p++) {
									if (ORIGCURRCODERet[p].value == ORIGCURRCODEText) {
										ORIGCURRCODEText = ORIGCURRCODERet[p].text;
									}
								}
								
								//20220211 交易代碼對應文字 by Liz
								var TXNCODEText = formData.REC[i].TXNCODE;
								var TXNCODERet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-e607-8e00-17be3ca46140"}).data;
								for (var d = 0; d < TXNCODERet.length; d++) {
									if (TXNCODERet[d].value == TXNCODEText) {
										TXNCODEText = TXNCODERet[d].text;
									}
								}
								
								//20220214  帳單金額正付號判斷 by Liz
								var TXNAMTS = "";
								var TXNAMTSRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "56692d29-0c00-2e0d-db00-17ef73d59d20"}).data;
								for (var d = 0; d < TXNAMTSRet.length; d++) {
									if (TXNAMTSRet[d].value == formData.REC[i].TXNCODE) {
										TXNAMTS = TXNAMTSRet[d].text == "+" ? "" : "-";
										break;
									}
								}
								var data = {
										"U_ORG"			: formData.REC[i].ORG,
										"U_TYPE"		: CardTypeText, // TBB-信用卡卡別 -- 20211004 Wolf
										"U_CARDNUM"		: formData.REC[i].CARDNUM,
										"U_Creditdate"	: formData.REC[i].POSTDATE,
										"U_Tradingnote"	: formData.REC[i].TXNDESC,
										"U_Vernum"		: formData.REC[i].REFNUMBER,
										"U_Tradingdate"	: formData.REC[i].TXNDATE,
										"U_Tradenum"	: formData.REC[i].TXNCODE + TXNCODEText, //20220211 交易代碼對應文字 by Liz
										//"U_Tradenum"	: formData.REC[i].TXNCODE,
										"U_Billamount"	: TXNAMTS + TXNAMT,
										"U_Country"		: formData.REC[i].MERCOUNTRY,
										"U_Area"		: formData.REC[i].MERCITY,
										//"U_Currency"	: formData.REC[i].ORIGCURRCODE,
										"U_Currency"	: ORIGCURRCODEText,
										"U_Foreignmoney": ORIGCURRAMT
								}
								U_O_Data.push(data);
							}
						}
					}
					
					// 20210916 add by gemfor\Tiffany - 資料排序(卡別由小到大、卡號由小到大、入帳日期由遠到近)
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_TYPE < b.U_TYPE){
							return -1;
						}else if(a.U_TYPE > b.U_TYPE){
							return 1;
						}else if(a.U_TYPE == b.U_TYPE){
							if (a.U_CARDNUM < b.U_CARDNUM) {
								return -1;
							}else if(a.U_CARDNUM > b.U_CARDNUM){
								return 1;
							}else if(a.U_CARDNUM == b.U_CARDNUM){	// 20220225 卡別(從小到大)>卡號(由小到大)>入帳日期(遠到近)>交易日期(遠到近)  by gemfor\Liz
								if(a.U_Creditdate > b.U_Creditdate){
									return 1;
								}else if(a.U_Creditdate < b.U_Creditdate){
									return -1;
								}else if(a.U_Creditdate == b.U_Creditdate){
									return a.U_Tradingdate > b.U_Tradingdate ? 1: -1;
								}
							}
						}
					});
                    
					form.getControl("U_Grid2").setValue(U_O_Data);
					document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[4].width = '400px'; // 交易摘要
					//表格欄位的值靠左或靠右
                    //20220329 外幣金額值靠右-Emily
                    var Foreignmoney = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");
            		
            		for(var i = 1; i < Foreignmoney.length; i++){
            			
            			    var tds = Foreignmoney[i].getElementsByTagName("td");
            			        tds[8].style.textAlign = 'right'
            		}
            		//20220329 帳單金額值靠右-Emily
                    var Billamount = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");
            		
            		for(var i = 1; i < Billamount.length; i++){
            			
            			    var tds = Billamount[i].getElementsByTagName("td");
            			        tds[10].style.textAlign = 'right'
            		}
					bar.close();
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				}, 1 * 1000);
			});
		},
		
		setIdOnchange : function() { // 20210916 Tiffany -- 檢核身份證、統編、統一證號
			Jui.event.attach(form.getControl("U_UID"), "onchange", function() {
				ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
				if (ret) {
					form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
				} else {
					form.setFieldValue("U_UID", null);
				}
			});
		},
		
		doExcel: function(){ // 20210917 Tiffany - 匯出EXCEL 
	        if(!form.getFieldValue('U_Grid2').length) {
	            Jui.message.alert("請先進行查詢再匯出Excel");
	            return;
	        }
	        var args = {
	                data : form.getFieldValue("U_Grid2")
            };

	        Utility.download("TBB.UCUSYearsbillmonth.doExcel", args);
	    },
		
		//2021.09.15-gemfor/Emily-後兩位加上小數點+千分位 
	    doAmount:function (num){
	        var str = parseInt(num).toString();
	        if(str){
	            if(str.length>=3){
	                amount= str.substr(0,str.length-2)+'.'+str.substr(str.length-2);   
	            }else if(str.length==2){
	                amount= '0.'+str.substr(str.length-2);
	            }else if(str.length==1){
	                amount= '0.0'+str;
	            }
	            return TBBUtil.thousandComma(amount);
	        }else{
	            return str;
	        }
	    },
		
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210916 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};

Jui.option.Grid.doPageButtonClick=function(){ // 20210916 Tiffany - 改寫網格選頁按鈕
	var b=Jui.$owner();
	var a=this;
	if(!a.hasAttribute("Forbidden")){
		if(a==b._firstPageButton){
			b._loadPage(1);
		}else{
			if(a==b._previousPageButton){
				b._loadPage(b._pageIndex-1);
			}else{
				if(a==b._nextPageButton){
					b._loadPage(b._pageIndex+1);
				}else{
					if(a==b._lastPageButton){
						b._loadPage(Math.ceil(b._dataJson.length/b._pageSize));
					}
				}
			}
		}
	}
	document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[4].width = '400px'; // 交易摘要
	//20220329 外幣金額值靠右-Emily
	var Foreignmoney = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr"); 
	
	for(var i = 1; i < Foreignmoney.length; i++){
		
		    var tds = Foreignmoney[i].getElementsByTagName("td");
		        tds[8].style.textAlign = 'right'
	}
	//20220329 帳單金額值靠右-Emily
    var Billamount = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");
	
	for(var i = 1; i < Billamount.length; i++){
		
		    var tds = Billamount[i].getElementsByTagName("td");
		        tds[10].style.textAlign = 'right'
	}
};