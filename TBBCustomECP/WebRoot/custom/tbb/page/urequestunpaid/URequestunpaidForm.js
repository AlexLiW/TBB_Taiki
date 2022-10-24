/********************************************************************************
	 信用卡各卡別未出帳單明細查詢表單
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.18
	 * LastUpdateUser: Gemfor\Emily
	 * LastUpdateDate: 2022/04/01
	 * Note: 2021/10/04 AI\Wolf.wu 排除網格中卡號為0000000000000000的循環資料
					2022/01/07 AI\Wolf.wu 增加電文失敗時塞入欄位判斷、增加電文等待效果
					2022/01/20 AI\Wolf.wu 針對幣別套用國際碼轉換
					2022/02/21 Gemfor\Tiffany 網格分頁筆數設定30筆
					2022/02/25 Gemfor\Liz 金額正負號改用字典判斷
					2022/03/08 Gemfor\Emma 修改查詢結果排序
					2022/04/01 Gemfor\Emily.tsai 網格欄位值靠右
*********************************************************************************/
var URequestunpaidForm = {
		doLoad : function(){
			URequestunpaidForm.doChange();
			URequestunpaidForm.setOnchange();//2021.09.15-gemfor/Emily
			
			//如果是從"信用卡持卡總覽查詢"打開時，如果 卡號、卡別 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_CardNum", clientData.urlArgs.U_CardNum);
			}
			if ("U_CardType" in clientData.urlArgs) {
				form.setFieldValue("U_CardType", clientData.urlArgs.U_CardType);
			}
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			form.setFieldTitle("U_Grid", null);							//隱藏網格標題
	        form.getControl("U_Grid").setPageSize(30);					//網格分頁筆數設定 --20220221 add by gemfor\Tiffany
			
			form.getControl("U_CardNum").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'卡號' 按鈕 與上下間個距離增加
			form.getControl("U_CardType").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'卡別' 按鈕 與上下間個距離增加
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'查詢' 按鈕 與上下間個距離增加
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				URequestunpaidForm.doBSTD();
			};
		},
		
		setOnchange : function() {
			//2021.09.15-gemfor/Emily-卡號若有資料代入，請確認是否有輸入到16碼，若有少輸或多輸，請跳提醒視窗「信用卡卡號需輸入16碼數字」
			form.getControl("U_CardNum").onchange = function(){
				if(form.getFieldValue("U_CardNum") != null && form.getFieldValue("U_CardNum") != ""){
					if(form.getFieldValue("U_CardNum").length != 16){
						Jui.message.alert("信用卡卡號需輸入16碼數字！");
						form.setFieldValue("U_CardNum", null);
					}
				}
			}; 
		},
		
		doBSTD : function(){
			if (!form.validate()) {
				return;
			}

			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			URequestunpaidForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			URequestunpaidForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ORG"		: "150",
			        //"TYPE"		: form.getFieldValue("U_CardType"), //gemfor/Emily 卡別改傳空值
					"TYPE"		: "",
			        "CARDNUM"	: form.getFieldValue("U_CardNum"),
			        "USERDATA"	: ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BSTDtbbapi",
				"from" 		: "CSR",
				"sessionId" : URequestunpaidForm.sessionId,
				"agentId" 	: URequestunpaidForm.agentId,
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
					bar.close();
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.isSuccess == true) {
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
				
					
					form.setFieldValue("U_ErrorCode", formData.ABEND);			//交易代號
					
					//交易訊息/結果
					/*
					if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo", "資料待續查");
					}*/
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10cd39520"}).data; // TBB-BSTD回應碼
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
					
					form.setFieldValue("U_CardNum_Output", formData.CARDNUM);	//卡號
					form.setFieldValue("U_CardType_Output", formData.TYPE);		//卡別
					
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {
							if (formData.REC[i].CARDNUM != "0000000000000000" && formData.REC[i].POSTDTE != "0000/00/00" &&  formData.REC[i].EFFDTAE != "0000/00/00" ) { // 排除卡號為0000000000000000的紀錄
							
							//	var AMNT = formData.REC[i].AMNTSIGN + Common.doCheckNumber(formData.REC[i].AMNT.substr(0, 7)) + "." + formData.REC[i].AMNT.substr(7, 2); //2021.09.15-gemfor/Emily-改欄位處理方法
								
							//	var ORIGCURRAMT = formData.REC[i].ORIGCURRAMTSIGN + Common.doCheckNumber(formData.REC[i].ORIGCURRAMT.substr(0, 10)) + "." + formData.REC[i].ORIGCURRAMT.substr(10, 2); //2021.09.15-gemfor/Emily-改欄位處理方法
								
							// 20210915-gemfor/Emily TBB-信用卡交易代碼 字典data
							var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-e607-8e00-17be3ca46140"}).data;
									
							// 20210915-gemfor/Emily 交易代碼
							var codeTxt = "";
							for (var j = 0; j < codeDic.length; j++) {
								if (codeDic[j].value == formData.REC[i].TRNCODE) {
									codeTxt = codeDic[j].text;
									break;
								}
							}
								
							//20220225 交易金額正負號判斷 by Liz
							var AMNTSIGN = "";
								var AMTSRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "56692d29-0c00-2e0d-db00-17ef73d59d20"}).data; // TBB-信用卡幣別 -- 20220120 Wolf
								for (var p = 0; p < AMTSRet.length; p++) {
									if (AMTSRet[p].value == formData.REC[i].TRNCODE) {
										AMNTSIGN = AMTSRet[p].text == "+" ? "" : "-";
										break;
									}
								}
							
							
							var ORIGCURRCODEText = formData.REC[i].ORIGCURRCODE;
								var ORIGCURRCODERet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-d448-ec04-17e76a0e8f70"}).data; // TBB-信用卡幣別 -- 20220120 Wolf
								for (var p = 0; p < ORIGCURRCODERet.length; p++) {
									if (ORIGCURRCODERet[p].value == ORIGCURRCODEText) {
										ORIGCURRCODEText = ORIGCURRCODERet[p].text;
									}
								}
							
								var data = {
										"U_OCardNum"    : formData.REC[i].CARDACCT,
										"U_Creditdate"	: formData.REC[i].POSTDTE,
										"U_Tradingnote"	: formData.REC[i].DESC,
										//"U_Vernum"		: formData.REC[i].REF, //2021.09.15-gemfor/Emily-刪除此欄位故此不塞值
										"U_Tradingdate"	: formData.REC[i].EFFDTAE,
										"U_Tradenum"	: formData.REC[i].TRNCODE  + codeTxt, // 20210915-gemfor/Emily交易代碼
										//"U_Billamount"	: AMNT,
										"U_Billamount"	: AMNTSIGN + URequestunpaidForm.doAmount(formData.REC[i].AMNT),  // 20220225 正負號判斷 by Liz
										//"U_Billamount"	: formData.REC[i].AMNTSIGN + URequestunpaidForm.doAmount(formData.REC[i].AMNT),  //2021.09.15-gemfor/Emily-交易金額
										"U_Country"		: formData.REC[i].MERCTRY,
										"U_Area"		: formData.REC[i].MERSTAT,
										//"U_Currency"	: formData.REC[i].ORIGCURRCODE,
										"U_Currency"	: ORIGCURRCODEText,
										//"U_Foreignmoney": ORIGCURRAMT //外幣金額
										"U_Foreignmoney": formData.REC[i].ORIGCURRAMTSIGN + URequestunpaidForm.doAmount(formData.REC[i].ORIGCURRAMT)  //2021.09.15-gemfor/Emily-外幣金額
								}
								U_O_Data.push(data);
							}
						}
					}
					
					// 20210923 add by gemfor\Emily - 資料排序(卡號由小到大、入帳日期由遠到近)
					// 20220308 add by gemfor\Emma - 資料排序(卡號(由小到大)>入帳日期(遠到近)>交易日期(遠到近))
					U_O_Data = U_O_Data.sort(function(a,b){
							if (a.U_OCardNum < b.U_OCardNum) {
								return -1;
							}else if(a.U_OCardNum > b.U_OCardNum){
								return 1;
							}else if(a.U_OCardNum == b.U_OCardNum){
								return 0;
							}
					});
					
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_Creditdate < b.U_Creditdate){
							return -1;
						}else if(a.U_Creditdate > b.U_Creditdate){
							return 1;
						}else if(a.U_Creditdate = b.U_Creditdate){
							return 0;
						}
					});
					
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_Tradingdate < b.U_Tradingdate){
							return -1;
						}else if(a.U_Tradingdate > b.U_Tradingdate){
							return 1;
						}else if(a.U_Tradingdate == b.U_Tradingdate){
							return 0;
						}
					});				
					
					
					// 資料拆分為正卡、附卡
                    var arr1 = [];
                    var arr2 = [];
                    for (var i = 0; i < U_O_Data.length; i++) {
                    	if (U_O_Data[i].U_OCardNum.substr(-3,1) == "1") {
                    		arr1.push(U_O_Data[i]);
                    	} else {
                    		arr2.push(U_O_Data[i]);
                        }
                    }
//                    arr1 = URequestunpaidForm.doDtIndex(arr1); // 20220308 add by gemfor\Emma -取消執行
//                    arr2 = URequestunpaidForm.doDtIndex(arr2); // 0220308 add by gemfor\Emma -取消執行
                    
                    form.getControl("U_Grid").setValue(arr1.concat(arr2));
					//form.getControl("U_Grid").setValue(U_O_Data);
                    
					
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '141px'; // 卡號
					//表格欄位的值靠左或靠右
                    //20220330 外幣金額值靠右-Emily
                    var Foreignmoney = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		
            		for(var i = 1; i < Foreignmoney.length; i++){
            			
            			    var tds = Foreignmoney[i].getElementsByTagName("td");
            			        tds[7].style.textAlign = 'right'
            		}
            		//20220401 交易金額值靠右-Emily
                    var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		
            		for(var i = 1; i < Billamount.length; i++){
            			
            			    var tds = Billamount[i].getElementsByTagName("td");
            			        tds[9].style.textAlign = 'right'
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
	    
	 //2021.09.16-gemfor/Emily-Excel下載 
	    doExcel: function(){
	        if(!form.getFieldValue('U_Grid').length){
	            Jui.message.alert("請先進行查詢再匯出Excel");
	            return;
	        }
	        var args = {
	                data: form.getFieldValue("U_Grid")
	            };

	        Utility.download("TBB.URequestunpaid.exportList", args);
	    },
	    
	    doDtIndex : function(DataGrid) { // 20210917 add by gemfor\Emily-- 資料依日期由遠到近排序
	        var wlen1 = DataGrid.length;
	        var count1 = 0;// 記錄總執行次數
	        for (var i = 0; i < DataGrid.length - 1; i++) {
	            for (var j = 0; j < wlen1 - 1; j++) {
	                if (DataGrid[j].U_Creditdate > DataGrid[j + 1].U_Creditdate) {
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
}

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
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '141px'; // 卡號
	//20220330 外幣金額值靠右-Emily
    var Foreignmoney = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
	
	for(var i = 1; i < Foreignmoney.length; i++){
		
		    var tds = Foreignmoney[i].getElementsByTagName("td");
		        tds[7].style.textAlign = 'right'
	}
	//20220401 交易金額值靠右-Emily
    var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
	
	for(var i = 1; i < Billamount.length; i++){
		
		    var tds = Billamount[i].getElementsByTagName("td");
		        tds[9].style.textAlign = 'right'
	}
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20220221 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};