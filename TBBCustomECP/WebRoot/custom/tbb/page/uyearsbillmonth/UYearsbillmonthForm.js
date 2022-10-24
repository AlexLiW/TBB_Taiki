/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/22 
 * Description:信用卡各卡別帳單明細查詢 TBB.UYearsbillmonth
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor\Emma.Lu
 * LastUpdateDate: 2022/03/17
 * Note: 爭議款、實際應繳 欄位位置調整
				20211004 卡別對應字典轉換為文本顯示
				2022/01/20 AI\Wolf.wu 針對幣別套用國際碼轉換
				2022/02/10 Gemfor\Emily.tsai 交易筆數原一頁12筆改成一頁30筆
				2022/02/11 Gemfor\Liz.chen 消費明細顯示順序調整、消費明細交易代號對應文字
				2022/02/14 Gemfor\Liz.chen 排除卡號為000的資料
				2022/02/14 Gemfor\Liz.chen 交易金額正負號判斷
				2022/02/25 Gemfor\Liz.chen 網格內容排序: 卡別(從小到大)>卡號(由小到大)>入帳日期(遠到近)>交易日期(遠到近)
				2022/02/25 Gemfor\Liz.chen 網格內容顯示結果為每頁30筆
				2022/03/17 Gemfor\Emma.Lu doClick:交易金額正負號判斷
 ******************************************************************************/
var UYearsbillmonthForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    doLoad: function() {
        cardNum= clientData.urlArgs.U_CardNum;
        if(!Jui.string.isEmpty(cardNum)){
            form.setFieldValue("U_CardNum", cardNum);
        }
        UYearsbillmonthForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UYearsbillmonthForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        if(TBBUtil.getContact()){
            form.setFieldValue("U_UID", TBBUtil.getContact().U_CustID);
            UYearsbillmonthForm.UID = TBBUtil.getContact().U_CustID;
        }else {
            form.setFieldValue("U_UID", "");
        }
        
        //form.getControl("U_Grid").setElementStyle("width: 50%"); //設定網格大小
        form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
        form.getControl("U_Inquiry").onclick = UYearsbillmonthForm.doPostBSD1;
        
        // 20210914 add by gemfor\Tiffany
        form.getControl("U_Grid").setPageSize(30);
        form.getControl("U_CardNum").onchange = UYearsbillmonthForm.doCardNum;
        
        // 20220225 顯示結果為每頁30筆 by gemfor\Liz
        form.getControl("U_Grid2").setPageSize(30);
        
        // 20210928 add by gemfor\Tiffany
        // 爭議款
        /*document.getElementsByName("U_Dispute")[0].children[0].style.width = "450px";
        document.getElementsByName("U_Dispute")[0].children[0].align = "right";
        document.getElementsByName("U_Dispute")[0].children[1].style.width = "686px";
        document.getElementsByName("U_Dispute")[0].children[1].children[0].style.width = "276px";
        document.getElementsByName("U_Dispute")[0].children[1].align = "right";
        // 實際應繳
        document.getElementsByName("U_Actualpay")[0].children[0].style.width = "465px";
        document.getElementsByName("U_Actualpay")[0].children[0].align = "right";
        document.getElementsByName("U_Actualpay")[0].children[1].style.width = "686px";
        document.getElementsByName("U_Actualpay")[0].children[1].children[0].style.width = "276px";
        document.getElementsByName("U_Actualpay")[0].children[1].align = "right";*/
        // 20210929 Tiffany
        document.getElementsByName("U_Dispute")[0].outerHTML = '<div class="JuiFormItem" name="Space" style="width:33.333333333333336%;padding-left:126px" readonly="true"></div>'
        	+ document.getElementsByName("U_Dispute")[0].outerHTML;
    },


    // BSD1信用卡帳單資料 hsin
    doPostBSD1: function() {
        if (!form.validate()) {
            return;
        }
       
        form.setFieldValue("U_ErrorMemo", "");
        form.setFieldValue("U_ErrorCode", "");
        form.setFieldValue("U_ErrorMemo2", "");
        form.setFieldValue("U_ErrorCode2", "");
        
        //輸出區全清空
        //TBBUtil.doClearFields("輸出區", null, null);
        TBBUtil.doClearFields("查詢結果", null, null); //Emma
        
        data = {
            "CARDNUM": form.getFieldValue("U_CardNum")
        };

        var args = JSON.stringify({
            "name": "BSD1tbbapi",
            "from": "csr",
            "sessionId": UYearsbillmonthForm.sessionId,
            "agentId": UYearsbillmonthForm.agentId,
            "formData": data
        });
			var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
                return;
         }
            if (ret.isSuccess) {
                // 電文回傳狀態
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c1116ec1e0"}).data; // TBB-BSD1、BSD2回應碼
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
					
                    var DataGrid = [];
                    var formData = ret.form;
                    for(var i=0; i<=formData.REC.length-1; i++){               
                        var tag="";
                        if(formData.REC[i].SUMIND=='S'){
                            tag="*";
                        }
                        var record={
                            U_Stmtdate : TBBUtil.formatDTM(formData.REC[i].STMTDATE,"")+tag,
                            U_Tradingnote : formData.REC[i].STMNBR
                        };
                        DataGrid.push(record);
                       
                    }
                    
                    // 資料依"日期"由大到小排序
                    var wlen1 = DataGrid.length;
                    var count1 = 0;// 記錄總執行次數
                    for (var i = 0; i < DataGrid.length - 1; i++) {
                        for (var j = 0; j < wlen1 - 1; j++) {
                            if (DataGrid[j].U_Stmtdate < DataGrid[j + 1].U_Stmtdate) {
                                var temp;
                                temp = DataGrid[j];
                                DataGrid[j] = DataGrid[j + 1];
                                DataGrid[j + 1] = temp;
                                count1++;
                            }
                        }
                        wlen1 = wlen1 - 1;
                    }
                    form.getControl("U_Grid").setValue(DataGrid);
                    
                    /*
                    var source = ret.form;
                    var resultText = "";
                    if (source.ABEND == "0000") {
                        resultText = "交易成功";
                    } 
                    form.setFieldValue("U_ErrorCode", source.ABEND);
                    form.setFieldValue("U_ErrorMemo", resultText);
					*/
					bar.close();

            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
                return;
            }
			}, 1 * 1000);
        })

    },
    

    // BSD2信用卡帳單資料明細 hsin
    doClick : function() {
        
        var grid = form.getControl('U_Grid').getEventRow();
        form.setFieldValue("U_ErrorMemo2", "");
        form.setFieldValue("U_ErrorCode2", "");
        
        //輸出區全清空
        //TBBUtil.doClearFields("輸出區", null, "U_Grid");
        TBBUtil.doClearFields("查詢結果", null, "U_Grid"); //Emma

        data = {
            "CARDNUM": form.getFieldValue("U_CardNum"),
            "STMTDATE" : grid.data.U_Stmtdate.replace("*", "").replace("/", "").replace("/", ""),
            "STMNBR" : grid.data.U_Tradingnote,
        };

        var args = JSON.stringify({
            "name": "BSD2tbbapi",
            "from": "csr",
            "sessionId": UYearsbillmonthForm.sessionId,
            "agentId": UYearsbillmonthForm.agentId,
            "formData": data
        });
		var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
                return;
         }
            if (ret.isSuccess) {
                // 電文回傳狀態
                   
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c1116ec1e0"}).data; // TBB-BSD1、BSD2回應碼
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

				   
                    var DataGrid = [];
                    var formData = ret.form;
                    
                    form.setFieldValue("U_Prebalance", formData.PREVBALS + UYearsbillmonthForm.doAmount(formData.PREVBAL));
                    form.setFieldValue("U_Paymentcredit", formData.CRAMTS + UYearsbillmonthForm.doAmount(formData.CRAMT));
                    form.setFieldValue("U_Consumptiondebit", formData.DBAMTS + UYearsbillmonthForm.doAmount(formData.DBAMT));
                    form.setFieldValue("U_Precash", formData.CASHADAMTS + UYearsbillmonthForm.doAmount(formData.CASHADAMT));
                    form.setFieldValue("U_Intexpense", UYearsbillmonthForm.doAmount(formData.FINCHRG));
                    form.setFieldValue("U_Totalpay", formData.CURRBALS + UYearsbillmonthForm.doAmount(formData.CURRBAL));
                    // form.setFieldValue("U_Dispute", UYearsbillmonthForm.doAmount(formData.DISPBAL)); // 20210929 Tiffany
                    document.getElementsByName("U_Dispute")[0].children[1].children[0].innerHTML = '<input value = "' + UYearsbillmonthForm.doAmount(formData.DISPBAL) + '">';
                    form.setFieldValue("U_Actualpay", formData.REALBALS + UYearsbillmonthForm.doAmount(formData.REALBAL));
                    form.setFieldValue("U_Cardcheckday", formData.STMTDATE1);
                    // form.setFieldValue("U_Credits", UYearsbillmonthForm.doAmount(formData.CRLIMIT));
                    // form.setFieldValue("U_Avaliquota", formData.AVAILCRS + UYearsbillmonthForm.doAmount(formData.AVAILCR));
                    form.setFieldValue("U_Days", formData.CYCLEDAYS);
                    form.setFieldValue("U_Paydeadline", formData.PYDUEDATE);
                    form.setFieldValue("U_Periodpay", UYearsbillmonthForm.doAmount(formData.MONPYMT));
                    form.setFieldValue("U_Minimum", UYearsbillmonthForm.doAmount(formData.PASTDUEAMT));
                    form.setFieldValue("U_Lowerpay", UYearsbillmonthForm.doAmount(formData.TOTAMTDUE));
                    
                    // 20210914 TBB-信用卡交易代碼 字典data
                    var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-e607-8e00-17be3ca46140"}).data;
                    
                    for(var i=0; i<=formData.REC.length-1; i++){
						if(formData.REC[i].TYPE1.replace(/\s+/g, '') == "000"){	// 20220214 排除卡號為000的資料 by Liz
							continue;
						}
                    	if (formData.REC[i].CARDNUM1 != "0000000000000000" && formData.REC[i].POSTDATE != "0000/00/00" &&  formData.REC[i].EFFDATE != "0000/00/00" ) { // 排除卡號為0000000000000000的紀錄
							// 20210914 交易代碼
							var codeTxt = "";
							for (var j = 0; j < codeDic.length; j++) {
								if (codeDic[j].value == formData.REC[i].CODE) {
									codeTxt = codeDic[j].text;
									break;
								}
							}
							
							var CardTypeText = formData.REC[i].TYPE1    
								CardTypeRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c303039590"}).data; // TBB-信用卡卡別 -- 20211004 Wolf
								for (var m = 0; m < CardTypeRet.length; m++) {
									if (CardTypeRet[m].value == CardTypeText) {
										CardTypeText = CardTypeRet[m].text;
									}
								}
								
							var CURRCODEText = formData.REC[i].CURRCODE;
								var CURRCODERet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-d448-ec04-17e76a0e8f70"}).data; // TBB-信用卡幣別 -- 20220120 Wolf
								for (var p = 0; p < CURRCODERet.length; p++) {
									if (CURRCODERet[p].value == CURRCODEText) {
										CURRCODEText = CURRCODERet[p].text;
									}
								}
								
							//20220214 交易金額正負號判斷 by Liz
							var AMTS = "";
								var AMTSRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "56692d29-0c00-2e0d-db00-17ef73d59d20"}).data; // TBB-信用卡幣別 -- 20220120 Wolf
								for (var p = 0; p < AMTSRet.length; p++) {
									if (AMTSRet[p].value == formData.REC[i].CODE) {
										AMTS = AMTSRet[p].text == "+" ? "" : "-";
										break;  //20220317 交易金額正負號判斷,修正break位置 by Emma 
									}
//									break;
								}
							
							var record={
								U_OCardNum: formData.REC[i].CARDNUM1,
								//U_CardType: formData.REC[i].TYPE1,
								U_CardType: CardTypeText, //20211004 將卡別轉換為字典顯示 Wolf
								U_Creditdate: TBBUtil.formatDTM(formData.REC[i].POSTDATE,""),
								U_Tradingnote: formData.REC[i].DESC,
								// U_Vernum: formData.REC[i].REFNBR,
								U_Tradingdate: TBBUtil.formatDTM(formData.REC[i].EFFDATE,""),
								U_Tradenum: formData.REC[i].CODE + codeTxt, // 20210914 交易代碼
								U_Billamount: AMTS + UYearsbillmonthForm.doAmount(formData.REC[i].AMT), //20220214 交易金額正負號判斷 by Liz
								//U_Billamount: formData.REC[i].AMTS + UYearsbillmonthForm.doAmount(formData.REC[i].AMT),
								U_Country: formData.REC[i].COUNTRY,
								U_Area: formData.REC[i].CITY,
								//U_Currency: formData.REC[i].CURRCODE,
								U_Currency: CURRCODEText,
								U_Foreignmoney: formData.REC[i].CURRAMTS + UYearsbillmonthForm.doAmount(formData.REC[i].CURRAMT)
							};
							DataGrid.push(record);
						}
					}
                    
					
                    /* // 資料依"日期"由大到小排序
                    var wlen1 = DataGrid.length;
                    var count1 = 0;// 記錄總執行次數
                    for (var i = 0; i < DataGrid.length - 1; i++) {
                        for (var j = 0; j < wlen1 - 1; j++) {
                            if (DataGrid[j].U_Creditdate < DataGrid[j + 1].U_Creditdate) {
                                var temp;
                                temp = DataGrid[j];
                                DataGrid[j] = DataGrid[j + 1];
                                DataGrid[j + 1] = temp;
                                count1++;
                            }
                        }
                        wlen1 = wlen1 - 1;
                    } 
                    
                    */
                    // 資料拆分為正卡、附卡
                    var arr1 = [];
                    var arr2 = [];
                    for (var i = 0; i < DataGrid.length; i++) {
                    	if (DataGrid[i].U_OCardNum.substr(-3,1) == "1") {
                    		arr1.push(DataGrid[i]);
                    	} else {
                    		arr2.push(DataGrid[i]);
                        }
                    }
                    arr1 = UYearsbillmonthForm.doDtIndex(arr1);
                    arr2 = UYearsbillmonthForm.doDtIndex(arr2);
                    
                    // form.getControl("U_Grid2").setValue(DataGrid);
                    form.getControl("U_Grid2").setValue(arr1.concat(arr2));
                    /*
                    var source = ret.form;
                    var resultText = "";
                    if (source.ABEND == "0000") {
                        resultText = "交易成功";
                    } 
                    form.setFieldValue("U_ErrorCode2", source.ABEND);
                    form.setFieldValue("U_ErrorMemo2", resultText);
                    */
                    document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[4].width = '400px'; // 交易摘要
					
					var Billamount = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");
            		for(var i = 1; i < Billamount.length; i++){
            			
						var tds = Billamount[i].getElementsByTagName("td");
						tds[8].style.textAlign = 'right';
						tds[10].style.textAlign = 'right';
            		}
					
					bar.close();
            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
                return;
            }
			}, 1 * 1000);
        });
        
        
        
    },


    //後兩位加上小數點+千分位
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
    
    // Excel下載 hsin
    doExcel: function(){
        if(!form.getFieldValue('U_Grid2').length){
            Jui.message.alert("請先進行查詢再匯出Excel");
            return;
        }
        var args = {
                data: form.getFieldValue("U_Grid2")
            };

        Utility.download("TBB.UYearsbillmonth.exportList", args);
    },
   
    doCardNum : function() { // 20210914 add by gemfor\Tiffany -- 檢核卡號字數
    	if (form.getFieldValue("U_CardNum")) {
    		if (form.getFieldValue("U_CardNum").length < 16) {
    			Jui.message.alert("信用卡卡號需輸入16碼數字");
    			form.setFieldValue("U_CardNum", null);
    		}
    	}
    },
    
    doDtIndex : function(DataGrid) { // 20210915 add by gemfor\Tiffany -- 資料依日期由遠到近排序
        var wlen1 = DataGrid.length;
        var count1 = 0;// 記錄總執行次數
        for (var i = 0; i < DataGrid.length - 1; i++) {
            for (var j = 0; j < wlen1 - 1; j++) {
                if (DataGrid[j].U_OCardNum > DataGrid[j + 1].U_OCardNum // 20220210 Liz - 先依卡號由小到大排序 // 20220225 Liz - 最後用交易日期排序
                    || (DataGrid[j].U_OCardNum == DataGrid[j + 1].U_OCardNum && DataGrid[j].U_Creditdate > DataGrid[j + 1].U_Creditdate) 
                    || (DataGrid[j].U_OCardNum == DataGrid[j + 1].U_OCardNum && DataGrid[j].U_Creditdate == DataGrid[j + 1].U_Creditdate && DataGrid[j].U_Tradingdate > DataGrid[j + 1].U_Tradingdate)) {
                    var temp;
                    temp = DataGrid[j];
                    DataGrid[j] = DataGrid[j + 1];
                    DataGrid[j + 1] = temp;
                    count1++;
                }
            }
            wlen1 = wlen1 - 1;
        }
        return DataGrid;
    },
    
};

Jui.event.attach(window, 'load', UYearsbillmonthForm.doLoad);

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210914 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};

Jui.option.Grid.doPageButtonClick=function(){ // 20210915 Tiffany - 改寫網格選頁按鈕
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
};