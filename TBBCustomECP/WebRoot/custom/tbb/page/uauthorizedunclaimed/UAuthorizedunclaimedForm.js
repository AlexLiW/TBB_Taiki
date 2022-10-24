/********************************************************************************
	 信用卡已授權未請款查詢
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.23
	 * LastUpdateUser: 	gemfor\Emily 
	 * LastUpdateDate: 	2021.09.29
	 * Note: 2021.09.29 gemfor\Emily  新增查詢無資料邏輯
					2022/01/07 針對新增欄位加入電文回傳、增加電文失敗時塞入欄位判斷、增加電文等待效果
*********************************************************************************/
var UAuthorizedunclaimedForm = {
		doLoad : function(){
			
			UAuthorizedunclaimedForm.doChange();
			UAuthorizedunclaimedForm.setOnchange();// 2021.09.17-gemfor/Emily
			
			
			//如果是從"信用卡持卡總覽查詢"打開時，如果 卡號 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_Account", clientData.urlArgs.U_CardNum);
			}
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); //與上下間個距離增加
			form.getControl("U_Account").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); //與上下間個距離增加
			
			form.setFieldTitle("U_Grid", null);			//隱藏網格標題
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				UAuthorizedunclaimedForm.doBSAI();
			};
		},
		
		setOnchange : function() {
			// 2021.09.17-gemfor/Emily-卡號若有資料代入，請確認是否有輸入到16碼，若有少輸或多輸，請跳提醒視窗「信用卡卡號需輸入16碼數字」
			form.getControl("U_Account").onchange = function() {
				if (form.getFieldValue("U_Account") != null
						&& form.getFieldValue("U_Account") != "") {
					if (form.getFieldValue("U_Account").length != 16) {
						Jui.message.alert("信用卡卡號需輸入16碼數字！");
						form.setFieldValue("U_Account", null);
					}
				}
			};
		},
		
		doBSAI : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			UAuthorizedunclaimedForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UAuthorizedunclaimedForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
			        "CARDNUM"	: form.getFieldValue("U_Account"),
			        "USERDATA"	: ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BSAItbbapi",
				"from" 		: "CSR",
				"sessionId" : UAuthorizedunclaimedForm.sessionId,
				"agentId" 	: UAuthorizedunclaimedForm.agentId,
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
					// 20210929 add by gemfor\Emily -- start
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c11287a4e0"}).data; // TBB-BSAI回應碼
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
					// 20210929 add by gemfor\Emily -- end
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
					
					
					/*form.setFieldValue("U_ErrorCode", formData.ABEND);			//交易代號 // 20210929 Emily
					
					//交易訊息/結果
					if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo", "資料待續查");
					}*/
					
					
					// var AMTOUTAUTH =
					// Common.doCheckNumber(formData.AMTOUTAUTH.substr(0, 9)) + "."
					// + formData.AMTOUTAUTH.substr(9, 2);
					var AMTOUTAUTH = UAuthorizedunclaimedForm.doAmount(formData.AMTOUTAUTH); // 2021.09.16-gemfor/Emily-改值的處理方式

					form.setFieldValue("U_CardType", formData.TYPE); // 卡別
					form.setFieldValue("U_OCardNum", formData.CARDNUM); // 卡號
					form.setFieldValue("U_Consumptions", formData.CNTOUTAUTH); // 已授權未請款累積消費筆數
					form.setFieldValue("U_Totalspending", AMTOUTAUTH); // 已授權未請款累積消費總額
					form.setFieldValue("U_NAME", formData.NAME); // 姓名
																		// //
					// 2021.09.16-gemfor/Emily-改值的處理方式

					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {

							// var AMNT =
							// Common.doCheckNumber(formData.REC[i].AMNT.substr(0,
							// 7)) + "." + formData.REC[i].AMNT.substr(7, 2); //
							// 2021.09.16-gemfor/Emily-改值的處理方式
							if (parseInt(formData.REC[i].EFFDATE.replace(/\//g,'')) > 0 && parseInt(formData.REC[i].SOURCE) > 0) { //Emily 20210930 資料若為0,則不在網格上顯示
								var data = {
										"U_CARDNMBR1": formData.REC[i].CARDNMBR1, //卡號
										"U_Autradedate" : formData.REC[i].EFFDATE, //授權交易日期
										"U_Auamount" : UAuthorizedunclaimedForm.doAmount(formData.REC[i].AMNT),
										"U_Aunum" : formData.REC[i].AUTHCODE,
										"U_SECE" : formData.REC[i].SOURCE, // 來源
										"U_AuPaydeadline" : formData.REC[i].FILEDAYS,
										"U_Note" : formData.REC[i].DESC
									}
									U_O_Data.push(data);
							}
							
						}
					}
					
					//查詢結果網格需以授權交易日期由遠到近排序 //2021.09.23-gemfor/Emily
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_Autradedate > b.U_Autradedate){														
							return 1;
						}else if(a.U_Autradedate < b.U_Autradedate){
							return -1;
						}else if(a.U_Autradedate == b.U_Autradedate){
							return 1;
						}
					});
					
					form.getControl("U_Grid").setValue(U_O_Data);
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '100px'; // gemfor/Emily 20210930 授權交易日期
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '100px'; // gemfor/Emily 20210930 授權交易金額
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[4].width = '100px'; // gemfor/Emily 20210930 剩餘天數
					
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		for(var i = 1; i < Billamount.length; i++){
            			
            			var tds = Billamount[i].getElementsByTagName("td");
            			tds[2].style.textAlign = 'right';
						tds[3].style.textAlign = 'center';
						tds[4].style.textAlign = 'center';
						tds[5].style.textAlign = 'center';
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
		
		// 2021.09.16-gemfor/Emily-後兩位加上小數點+千分位
		doAmount : function(num) {
			var str = parseInt(num).toString();
			if (str) {
				if (str.length >= 3) {
					amount = str.substr(0, str.length - 2) + '.'
							+ str.substr(str.length - 2);
				} else if (str.length == 2) {
					amount = '0.' + str.substr(str.length - 2);
				} else if (str.length == 1) {
					amount = '0.0' + str;
				}
				return TBBUtil.thousandComma(amount);
			} else {
				return str;
			}
		},
}

Jui.option.Grid.doPageButtonClick=function(){ // 20210930 Emily - 改寫網格選頁按鈕
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
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '100px'; // gemfor/Emily 20210930 授權交易日期
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '100px'; // gemfor/Emily 20210930 授權交易金額
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[4].width = '100px'; // gemfor/Emily 20210930 剩餘天數
};