/********************************************************************************
	 定期存款餘額資料查詢表單
	 * Author			: gemfor\Lillian
	 * CreateDate		: 2021.05.28
	 * LastUpdateUser	: gemfor/Emma
	 * LastUpdateDate	: 2022.04.01
	 * Note: 2021.09.29 gemfor\Tiffany  計息方式 字典化
					2021/12/13 AI\Wolf 調整去除不存在存單號碼的資料，依據存單號碼重新排序，並將項目號碼重新賦予，加入等待電文回傳的Loading效果
					2022/02/15 gemfor\Liz 總金額後兩位為小數
					2022.04.01 gemfor/Emma-網格內文字位置設定
*********************************************************************************/

var UFDepositDetailForm = {
		doLoad : function(){
			if ("U_ACN" in clientData.urlArgs) { // "存款帳戶總覽查詢"開啟帶入帳號
				form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
			}
			
			UFDepositDetailForm.pageLoad();
			UFDepositDetailForm.setOnchange();
			form.setFieldTitle("U_Button", null);						//隱藏按鈕標題
			form.getControl("U_Button").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.setFieldTitle("U_Grid", null);							//隱藏網格標題
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
			
			// 20210923 add by gemfor\Tiffany
			form.getControl("U_Grid").setPageSize(30); // 20220215 改為30筆 by gemfor\Liz
			document.getElementsByName("U_Grid")[0].style.paddingLeft = '8px';
			form.getControl("U_Total").setText("");
		},
		
		
		pageLoad : function(){
			form.setFieldValue("U_Type", "1");
		},
		
		
		setOnchange : function(){
			form.getControl("U_Type").onchange=UFDepositDetailForm.itemControl;
			form.getControl("U_Button").onclick = function() {
				form.getControl("U_Grid").setValue();
				form.getControl("U_Total").setText(""); //20210923 Tiffany 總金額筆數標籤
				UFDepositDetailForm.doS421();
			};
			
			Jui.event.attach(form.getControl("U_UID"), "onchange", function() { // 20210923 Tiffany -- 檢核身份證、統編、統一證號
				ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
				if (ret) {
					form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
				} else {
					form.setFieldValue("U_UID", null);
				}
			});
			
			form.getControl("U_ACNO").onchange = function() { // 20210927 add by gemfor\Tiffany
				UFDepositDetailForm.doACNO();
			};
		},
		
		
		itemControl : function(){
			var U_Type = form.getFieldValue("U_Type");
			if(U_Type == "1"){
				form.setFieldDisabled("U_ACNO", false, true);
				form.setFieldDisabled("U_UID", true);
				form.setFieldValue("U_UID", null);
			}else if(U_Type == "2"){
				form.setFieldDisabled("U_ACNO", true);
				form.setFieldValue("U_ACNO", null);
				form.setFieldDisabled("U_UID", false, true);
			}else{
				form.setFieldValue("U_Type", "1");
				form.setFieldDisabled("U_ACNO", false, true);
				form.setFieldDisabled("U_UID", true);
				form.setFieldValue("U_UID", null);
			}
		},
		
		
		doS421 : function(){
			if (!form.validate()) {
				return;
			}
			if(form.getFieldValue("U_Type")=="1"){
				if(Jui.object.isEmpty(form.getFieldValue("U_ACNO"))){
					Jui.message.alert("請填寫\"帳號\"");
					return;
				}	
			}else if(form.getFieldValue("U_Type")=="2"){
				if(Jui.object.isEmpty(form.getFieldValue("U_UID"))){
					Jui.message.alert("請填寫\"統一編號\"");
					return;
				}
			}
			
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			var U_Type = form.getFieldValue("U_Type");
			var U_ACNO = "";
			var U_UID = "";
			var Type = "";
			
			if(U_Type == "1"){
				U_ACNO = form.getFieldValue("U_ACNO");
				Type = "01";
			}else if(U_Type == "2"){
				U_UID = form.getFieldValue("U_UID");
				Type = "02";
			}
			
			UFDepositDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UFDepositDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ACN" 	 : U_ACNO, 		//帳號
				    "CUSIDN" : U_UID,		//統一編號
				    "TYPE"	 : Type			//類別
			};
			
			var args = JSON.stringify({
				"name" 		: "S421tbbapi",
				"from" 		: "CSR",
				"sessionId" : UFDepositDetailForm.sessionId,
				"agentId" 	: UFDepositDetailForm.agentId,
				"formData" 	: data
			});
				var bar =
				Jui.message.progress(function() {
					Jui.message.hint("查詢資料中，請稍後...");
				});
			// 發送電文
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.isSuccess == true) {
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
						var ABENDtxt = ret.form.ABEND;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.ABEND) {
								ABENDtxt = codeDic[i].text;
								break;
							}
						}
						Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
						bar.close();
						return;
					}
					
					// TBB-定期存款餘額資料查詢-計息方式 -- 20210929 Tiffany
					var rateTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c26833cb50"}).data;
					
					var U_O_Data = [];																	//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;															//取回傳資料
					var REC_LEN = formData.REC.length; 													//看有幾筆資料
					var AmtTtl = 0; // 20210923 Tiffany 總金額
					for (var i = 0; i < REC_LEN; i++) {
						var FDPNUM =  formData.REC[i].FDPNUM;
						if (!Jui.object.isEmpty(formData.REC[i]) && FDPNUM.trim() != "") { //20211213 AI.Wolf  存單號碼不為空的
							var U_NCDAMT = formData.REC[i].AMTFDP;
							U_NCDAMT = U_NCDAMT.replace(/\b(0+)/gi,"");									//去掉前面的0
							if(U_NCDAMT.trim() != "") {
								U_NCDAMT = UFDepositDetailForm.doAmount(U_NCDAMT); //套用含小數兩位的千分位金錢格式
							} else {
								U_NCDAMT = "0.00";
							}
							//U_NCDAMT = U_NCDAMT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');	//轉換為千分位金錢格式
							AmtTtl = AmtTtl + parseInt(formData.REC[i].AMTFDP); 
							var U_StartDT = formData.REC[i].DPISDT;
							if (U_StartDT.trim() != "") { //20211214 AI.Wolf  避免空值轉換出現多餘的斜線格式
								U_StartDT = formData.REC[i].DPISDT.substr(0, 3) + "/" + formData.REC[i].DPISDT.substr(3, 2) + "/" + formData.REC[i].DPISDT.substr(5, 2);//時間格式重整
							}
							var U_EndDT = formData.REC[i].DUEDAT;
							if(U_EndDT.trim() != "") { //20211214 AI.Wolf  避免空值轉換出現多餘的斜線格式
								 U_EndDT = formData.REC[i].DUEDAT.substr(0, 3) + "/" + formData.REC[i].DUEDAT.substr(3, 2) + "/" + formData.REC[i].DUEDAT.substr(5, 2);	//時間格式重整
							}
							var U_Rate = "";
							if(formData.REC[i].ITR.length == 5){
								U_Rate = formData.REC[i].ITR.substr(1,1)+"."+formData.REC[i].ITR.substr(2,3);
							}else{
								U_Rate = formData.REC[i].ITR;
							}
							// 計息方式 -- 20210929 Tiffany
							var U_RateType = "";
							for (var j = 0; j < rateTypeDic.length; j++) {
								if (rateTypeDic[j].value == formData.REC[i].INTMTH) {
									U_RateType = rateTypeDic[j].text;
									break;
								}
							}
							var TERM = formData.REC[i].TERM;
							if (TERM.trim() != "") {
		                            TERM = formData.REC[i].TERM + "月"; // 20210923 Tiffany								
							}
							var NCDType = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-b378-4605-17db77d1f1f0"}).data; // TBB-定期存款餘額資料查詢-存單種類
							var NCDTypeTxt = formData.REC[i].TYPE
							for (var k = 0; k < NCDType.length; k++) {
								if (NCDType[k].value == formData.REC[i].TYPE) {
									NCDTypeTxt = NCDType[k].text;
									break;
								}
							}
							var data = {
									"U_No"			: i+1, // 20210923 Tiffany 項目
									"U_ACNO"		: formData.REC[i].ACN,
		                            "U_ACMgrBch"	: formData.REC[i].BRHACC,
		                            //"U_NCDType"		: formData.REC[i].TYPE,
									"U_NCDType"		: NCDTypeTxt, //將存單種類轉換為中文
		                            "U_NCDNo"		: formData.REC[i].FDPNUM,
		                            "U_NCDAMT"		: U_NCDAMT,
		                            //"U_NCDRg"		: formData.REC[i].TERM + "月", // 20210923 Tiffany
									"U_NCDRg"   : TERM, //20211214 AI.Wolf 另外處理是否要加 "月" 
		                            "U_Rate"		: U_Rate,
		                            // "U_RateType"	: formData.REC[i].INTMTH, // 20210929 Tiffany
		                            "U_RateType"	: U_RateType,
		                            "U_StartDT"		: U_StartDT,
		                            "U_EndDT"		: U_EndDT,
		                            "U_RateDepAC"	: formData.REC[i].TSFACN,
		                            "U_AutoTime"	: formData.REC[i].ILAZLFTM,
		                            "U_AutoNonTime"	: formData.REC[i].AUTXFTM,
		                            "U_ApplyNAuto"	: formData.REC[i].TYPE2,
		                            "U_FLAG1"		: formData.REC[i].FLAG1,
		                            "U_AutoType"	: formData.REC[i].TYPE1, // 20210927 Tiffany 轉期方式
							};
							U_O_Data.push(data);
						}
					}
						//查詢結果網格需以帳單月份由新到舊排序
						U_O_Data = U_O_Data.sort(function(a,b){ //20211213 AI.Wolf 以存單號碼由小到大排序
							if(a.U_NCDNo < b.U_NCDNo){
								return -1;
							}else if(a.U_NCDNo > b.U_NCDNo){
								return 1;
							}else if(a.U_NCDNo == b.U_NCDNo){
								return -1;
							}
						});
						for(var k = 0; k < U_O_Data.length; k++) { //20211213 AI.Wolf 針對重新排序，項目的號碼重新給予
							U_O_Data[k].U_No = k+1; 
						}
						
					form.getControl("U_Grid").setValue(U_O_Data);
					AmtTtl = (AmtTtl/100).toLocaleString(); // 20220215 後兩位為小數 by gemfor\Liz
					//AmtTtl = AmtTtl.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');	// 20210923 Tiffany 轉換為千分位金錢格式
					//form.getControl("U_Total").setText("總共" + REC_LEN + "筆，總共金額：" + AmtTtl + "元。"); // 20210923 Tiffany
					form.getControl("U_Total").setText("總共" + U_O_Data.length + "筆，總共金額：" + AmtTtl + "元。"); // 20211214 AI.Wolf
					UFDepositDetailForm.doTextAlign();//2022.04.01 gemfor/Emma-網格內文字位置設定
					
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		for(var i = 1; i < Billamount.length; i++){
						var tds = Billamount[i].getElementsByTagName("td");
						tds[5].style.textAlign = 'right';
						tds[6].style.textAlign = 'center';
            		}
					
					
					bar.close();
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				},1 * 1000);
			});

		},
		
		doACNO : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
			if (form.getFieldValue("U_ACNO")) {
				if (form.getFieldValue("U_ACNO").length < 11) {
					Jui.message.alert("帳號資料格式須為11位實體帳號");
					form.setFieldValue("U_ACNO", null);
				}
			}
		},
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
		// 2022.04.01-gemfor/Emma-網格內文字位置設定
		doTextAlign : function(){
			var trs = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
			for(var i = 1; i < trs.length; i++){ //利用網格的資料長度
			    var tds = trs[i].getElementsByTagName("td"); //抓取網格欄位的值
			  //依照欄位的位置進行設定 
			    tds[5].style.textAlign = 'right'; 
			    tds[6].style.textAlign = 'center'; 
			}
		},
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210923 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};
Jui.option.Grid.doPageButtonClick=function(){ // 20210919 Tiffany - 改寫網格選頁按鈕
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
	UFDepositDetailForm.doTextAlign();//2022.04.01 gemfor/Emma-網格內文字位置設定 
};