/********************************************************************************
	 最近一年交易紀錄查詢
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.22
	 * LastUpdateUser: gemfor\Emma
	 * LastUpdateDate: 2022/03/30
	 * Note: 如果是從"信用卡持卡總覽查詢"打開時，如果 卡號 有資料，就帶入。
					2021/10/12 AI\Wolf.wu 調整網格資料呈現，將年月為0000/00/00且交易筆數為0的紀錄過濾掉，並將總和紀錄移至陣列第一位呈現
					 2022/01/10 AI\Wolf.wu 增加電文失敗時塞入欄位判斷、增加電文等待效果
					 2022/03/22  gemfor\Emma -- 網格分頁筆數設定13筆
					 2022/03/22  gemfor\Emma -- 交易結果顯示
					 2022/03/30  gemfor\Emma -- 網格/利息/帶值、網格文字位置設定
*********************************************************************************/
var ULastyeartradeForm = {
		doLoad : function(){
			
			ULastyeartradeForm.doChange();
			ULastyeartradeForm.setOnchange();// 2021.09.17-gemfor/Emily
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); //與上下間個距離增加
			form.getControl("U_CardNum").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); //與上下間個距離增加
			
			form.setFieldTitle("U_Grid", null);			//隱藏網格標題
			form.getControl("U_Grid").setPageSize(13);                  // 20220322 add by gemfor\Emma -- 網格分頁筆數設定13筆
			
			
			//2021.09.28-gemfor/lillian-如果是從"信用卡持卡總覽查詢"打開時，如果 卡號 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_CardNum", clientData.urlArgs.U_CardNum);
			}
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				ULastyeartradeForm.doBSHC();
			};
		},
		
		setOnchange : function() {
			// 2021.09.17-gemfor/Emily-卡號若有資料代入，請確認是否有輸入到16碼，若有少輸或多輸，請跳提醒視窗「信用卡卡號需輸入16碼數字」
			form.getControl("U_CardNum").onchange = function() {
				if (form.getFieldValue("U_CardNum") != null
						&& form.getFieldValue("U_CardNum") != "") {
					if (form.getFieldValue("U_CardNum").length != 16) {
						Jui.message.alert("信用卡卡號需輸入16碼數字！");
						form.setFieldValue("U_CardNum", null);
					}
				}
			};
		},
		
		doBSHC : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			ULastyeartradeForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			ULastyeartradeForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
			        "CARDNUM"	: form.getFieldValue("U_CardNum"),
			        "USERDATA"	: ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BSHCtbbapi",
				"from" 		: "CSR",
				"sessionId" : ULastyeartradeForm.sessionId,
				"agentId" 	: ULastyeartradeForm.agentId,
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
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
					
					form.setFieldValue("U_ErrorCode", formData.ABEND);			//交易代號
					
					//交易訊息/結果
					/*if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo", "資料待續查");
					}*/
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c11210abc0"}).data; // TBB-BSHC回應碼
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
					
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {
							// 2021.09.17-gemfor/Emily-後兩位加上小數點+千分位
							if (parseInt(formData.REC[i].STMTDTE.replace(/\//g,'')) > 0 || (formData.REC[i].STMTDTE == "0000/00/00" && Common.doCheckNumber(parseInt(formData.REC[i].CNTRTL).toString()) > 0 )) { // 2021.10.12 AI/Wolf 判斷過濾掉帳單月份為0000/00/00、零售交易筆數為0的紀錄
								//金額
								var AMTRTL = formData.REC[i].AMTRTLS + ULastyeartradeForm.doAmount(formData.REC[i].AMTRTL);
								var AMTCAATM = formData.REC[i].AMTCAATMS + ULastyeartradeForm.doAmount(formData.REC[i].AMTCAATM);
								var AMTCAMAN = formData.REC[i].AMTCAMANS + ULastyeartradeForm.doAmount(formData.REC[i].AMTCAMAN);
								var AMTANNFEE = formData.REC[i].AMTANNFEES + ULastyeartradeForm.doAmount(formData.REC[i].AMTANNFEE);
								var AMTLATCHG = formData.REC[i].AMTLATCHGS + ULastyeartradeForm.doAmount(formData.REC[i].AMTLATCHG);
								var AMTMISCHG = formData.REC[i].AMTMISCHGS + ULastyeartradeForm.doAmount(formData.REC[i].AMTMISCHG);
								var AMTOVFEE = formData.REC[i].AMTOVFEES + ULastyeartradeForm.doAmount(formData.REC[i].AMTOVFEE);
								var AMTSVCCHG = formData.REC[i].AMTSVCCHGS + ULastyeartradeForm.doAmount(formData.REC[i].AMTSVCCHG);
								var AMTCAFEE = formData.REC[i].AMTCAFEES + ULastyeartradeForm.doAmount(formData.REC[i].AMTCAFEE);
								var INTEREST = ULastyeartradeForm.doAmount(formData.REC[i].INTEREST); //2022.03/30 gemfor/Emma 利息
								
								//筆數
								var Annualfee12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTANNFEE).toString());
								var Breakamo12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTLATCHG).toString());
								var Retail12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTRTL).toString());
								var Cashadvance12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTCAATM).toString());
								var Cashadvperfee12sum = Common.doCheckNumber(parseInt(formData.REC[i].CNTCAFEE).toString());
								var Servicecharge12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTSVCCHG).toString());
								var Otherfee12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTMISCHG).toString());
								var Misccharge12times = Common.doCheckNumber(parseInt(formData.REC[i].CNTOVFEE).toString()); 
								var CNTCAMAN = Common.doCheckNumber(parseInt(formData.REC[i].CNTCAMAN).toString()); 
								
								var data = {
										"U_BillMonth"			: formData.REC[i].STMTDTE,
										"U_Retail12sum"			: AMTRTL,
										//"U_Retail12times" 		: formData.REC[i].CNTRTL,
										"U_Retail12times" 		: Retail12times,
										"U_Cashadvance12sum"	: AMTCAATM,
										//"U_Cashadvance12times"	: formData.REC[i].CNTCAATM,
										"U_Cashadvance12times"	: Cashadvance12times,
										"U_CAMAN"				: AMTCAMAN,
										//"U_CNTCAMAN"			: formData.REC[i].CNTCAMAN,
										"U_CNTCAMAN"			: CNTCAMAN,
										"U_Annualfee12sum"		: AMTANNFEE,
										//"U_Annualfee12times" 	: formData.REC[i].CNTANNFEE,
										"U_Annualfee12times" 	: Annualfee12times,
										"U_Breakamo12sum"		: AMTLATCHG,
										//"U_Breakamo12times"		: formData.REC[i].CNTLATCHG,
										"U_Breakamo12times"		: Breakamo12times,
										"U_Otherfee12sum"		: AMTMISCHG,
										//"U_Otherfee12times"		: formData.REC[i].CNTMISCHG,
										"U_Otherfee12times"		: Otherfee12times,
										"U_Misccharge12sum"		: AMTOVFEE,
										//"U_Misccharge12times"	: formData.REC[i].CNTOVFEE,
										"U_Misccharge12times"	: Misccharge12times,
										"U_Servicecharge12sum"	: AMTSVCCHG,
										//"U_Servicecharge12times": formData.REC[i].CNTSVCCHG,
										"U_Servicecharge12times": Servicecharge12times,
										"U_Cashadvperfee12times": AMTCAFEE,
										//"U_Cashadvperfee12sum"	: formData.REC[i].CNTCAFEE
										"U_Cashadvperfee12sum"	: Cashadvperfee12sum,
										"U_Interest"	: INTEREST, //2022.03/30 gemfor/Emma 利息
								}
								U_O_Data.push(data);
							}
						}
					}
					
					//查詢結果網格需以帳單月份由新到舊排序
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_BillMonth > b.U_BillMonth){
							return -1;
						}else if(a.U_BillMonth < b.U_BillMonth){
							return 1;
						}else if(a.U_BillMonth == b.U_BillMonth){
							return -1;
						}
					});
					
					ULastyeartradeForm.doArraytop(12,U_O_Data); // 2021.10.12 AI/Wolf 將總和紀錄移至陣列第一位呈現，且把總和紀錄之帳單月份欄位改名為總和資料
					form.getControl("U_Grid").setValue(U_O_Data);
					ULastyeartradeForm.doTextAlign(); //Emma
					bar.close();
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				}, 1 * 1000);
			});
		},
		
		//2021.09.17-gemfor/Emily-後兩位加上小數點+千分位 
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
		
		doArraytop:function(index, array) { // 20220322-gemfor/Emma-交易結果顯示
			if (index === 0) return false
			if (array.length>12){ // 全卡種12個皆交易&一般卡片部分交易
				console.log(array)
				array.unshift(array.splice(index, 1)[0])
				array[0].U_BillMonth = "總和資料";
				return array
			} else if(array.length==12){ // 一般卡片及商務卡無交易
				array.unshift({U_Annualfee12sum: " 0.00",U_Annualfee12times: "0",U_BillMonth: "總和資料",U_Breakamo12sum: " 0.00"
					,U_Breakamo12times: "0",U_CAMAN: " 0.00",U_CNTCAMAN: "0",U_Cashadvance12sum: " 0.00",U_Cashadvance12times: "0"
					,U_Cashadvperfee12sum: "0",U_Cashadvperfee12times: " 0.00",U_Misccharge12sum: " 0.00",U_Misccharge12times: "0"
					,U_Otherfee12sum: " 0.00",U_Otherfee12times: "0",U_Retail12sum: " 0.00",U_Retail12times: "0",U_Servicecharge12sum: " 0.00"
					,U_Servicecharge12times: "0"})
				return array
			}else if(array.length<12){ //非一般信用卡卡種的無交易+部分交易
				//if(array.length<12)
				if(array.length==0){ //若資料回傳都無資料
					var newarray={U_BillMonth: "以下無資料"};
					array.push(newarray);
					array.unshift({U_Annualfee12sum: " 0.00",U_Annualfee12times: "0",U_BillMonth: "總和資料",U_Breakamo12sum: " 0.00"
						,U_Breakamo12times: "0",U_CAMAN: " 0.00",U_CNTCAMAN: "0",U_Cashadvance12sum: " 0.00",U_Cashadvance12times: "0"
						,U_Cashadvperfee12sum: "0",U_Cashadvperfee12times: " 0.00",U_Misccharge12sum: " 0.00",U_Misccharge12times: "0"
						,U_Otherfee12sum: " 0.00",U_Otherfee12times: "0",U_Retail12sum: " 0.00",U_Retail12times: "0",U_Servicecharge12sum: " 0.00"
						,U_Servicecharge12times: "0"})
					return array
				}else{ //商務卡及新卡戶部分交易
					array.unshift(array.splice(array.length-1, 1)[0])
					array[0].U_BillMonth = "總和資料";
					var newarray={U_BillMonth: "以下無資料"};
					array.push(newarray);
					return array
				}
			}	
		},
		// 2022.03.30-gemfor/Emma-網格內文字位置設定
		doTextAlign : function(){
			var trs = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
			for(var i = 1; i < trs.length; i++){ //利用網格的資料長度
			    var tds = trs[i].getElementsByTagName("td"); //抓取網格欄位的值
			  //依照欄位的位置進行設定
			    tds[1].style.textAlign = 'center'; 
			    tds[4].style.textAlign = 'center'; 
			    tds[6].style.textAlign = 'center'; 
			    tds[8].style.textAlign = 'center'; 
			    tds[10].style.textAlign = 'center'; 
			    tds[12].style.textAlign = 'center'; 
			    tds[14].style.textAlign = 'center'; 
			    tds[16].style.textAlign = 'center'; 
			    tds[18].style.textAlign = 'center'; 
			    tds[2].style.textAlign = 'right'; 
			    tds[3].style.textAlign = 'right'; 
			    tds[5].style.textAlign = 'right'; 
			    tds[7].style.textAlign = 'right'; 
			    tds[9].style.textAlign = 'right'; 
			    tds[11].style.textAlign = 'right'; 
			    tds[13].style.textAlign = 'right'; 
			    tds[15].style.textAlign = 'right'; 
			    tds[17].style.textAlign = 'right'; 
			    tds[19].style.textAlign = 'right'; 
			}
			// 設定欄位寬度
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '100px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[2].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[3].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[4].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[5].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[6].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[7].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[8].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[9].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[10].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[11].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[12].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[13].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[14].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[15].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[16].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[17].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[18].width = '70px';
			document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[19].width = '70px';
		},
}
Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20220321 add by gemfor\Emma -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};