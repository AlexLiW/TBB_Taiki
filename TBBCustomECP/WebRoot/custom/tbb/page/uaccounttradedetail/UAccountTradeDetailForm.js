/*******************************************************************************
 * Author: chainsea\hsin.lin; 
 * CreateDate: 2021/05/21 Description:
 * 疑似不法-查詢交易-帳戶交易明細查詢作業 TBB.UAccountTradeDetail
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor.Emma; 
 * LastUpdateDate: 2022/04/01
 * Note: gemfor\Tiffany 2021/09/27 新增查詢無資料邏輯、帳號字數檢核
				AI.Wolf 2021/11/11 針對空白資料不處理時間格式轉換、代收付行錯誤顯示調整
				AI.Wolf 2021/02/08 調整排序依據交易日期由遠到近排序，針對結存做金額格式化、調整存入支出金額格式化
				Gemfor.Tiffany 2022/02/21 查詢結果網格新增一欄位/行庫別/
				Gemfor.Emma 2022/03/03 查詢結果網格/支出/、/存入/、/結存/改為取值11位及小數點兩位 & 查詢結果網格/行庫別/改為顯示電文值即可 & 調整交易日期時間
				Gemfor.Emma 2022/03/16 行庫別取值方式
				Gemfor.Emma 2022/04/01 查詢結果網格/支出/、/存入/、/結存/靠右顯示
				Gemfor.Emma 2022/04/03 查詢結果網格/支出/、/存入/、/結存/顯示正負號
 ******************************************************************************/
var UAccountTradeDetailForm = {
	sessionId : null,
	agentId : null,
	entityId:clientData.entityId,
	doLoad : function() {
		if ("U_ACN" in clientData.urlArgs) { // "存款帳戶總覽查詢"開啟帶入帳號
			form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
		}
		
		UAccountTradeDetailForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UAccountTradeDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User",userId, "FLoginName");
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Button").onclick = UAccountTradeDetailForm.doCheck;
		
		form.getControl("U_Grid").setPageSize(20); // 20210919 add by gemfor\Tiffany
		UAccountTradeDetailForm.doOnchange(); // 20210927 add by gemfor\Tiffany
	},


	// 顯示彈跳訊息確認 hsin
	doCheck : function() {
	    
	    form.setFieldValue("U_Grid","");
	    
		if (!form.validate()) {
			return;
		}
		
		if(Jui.object.isEmpty(form.getFieldValue("U_ACNO"))){
				Jui.message.alert("請填寫\"帳號\"");
				return;
		}
		if(Jui.object.isEmpty(form.getFieldValue("U_StartDT"))){
				Jui.message.alert("請填寫\"查詢起日\"");
				return;
		}
		if(Jui.object.isEmpty(form.getFieldValue("U_EndDT"))){
				Jui.message.alert("請填寫\"查詢迄日\"");
				return;
		}
		
		// To go 2 years back
		var today = new Date();
		var yearsBack= new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
		var ruleDate = yearsBack, checkDate = form.getFieldValue("U_StartDT"), endDate = form.getFieldValue("U_EndDT");
		if ( (Date.parse(checkDate)).valueOf() < (Date.parse(ruleDate)).valueOf())
		{
			Jui.message.alert("查詢時間小於近兩年"); // 改成文本
			return;
		}
		if ( (Date.parse(endDate)).valueOf() < (Date.parse(checkDate)).valueOf())
		{
			Jui.message.alert("查詢迄日時間不能小於查詢起日時間"); // 改成文本
			return;
		}
		
		var checkMessage = "";
		checkMessage = "此查詢為通報警示帳戶/165/聯行使用，請確認是否要查詢"; // 改成文本
		Jui.message.confirm(checkMessage, function(result) {
			if (result == 'ok') {
				UAccountTradeDetailForm.doFlag();
			} else {
				return;
			}
		});
	},

	// 執行交易明細查詢 hsin
	doFlag : function() {
	    
	    form.setFieldValue("U_Grid","");
	    
		// 日期轉格式yyymmdd
		var startDT = form.getFieldValue("U_StartDT");
		var endDT = form.getFieldValue("U_EndDT");
		
		
		if (startDT) {
			var startDTY = startDT.substring(0, 4);
			var startCDTY = parseInt(startDTY) - 1911;
			startDT = startCDTY + startDT.substring(5, 7) + startDT.substring(8, 10);
		}
		if (endDT) {
			var endDTY = endDT.substring(0, 4);
			var endCDTY = parseInt(endDTY) - 1911;
			endDT = endCDTY + endDT.substring(5, 7) + endDT.substring(8, 10);
		}
		var nowDT = new Date();
		var nowDTYCDTY = nowDT.getFullYear() - 1911;
		nowDT = nowDTYCDTY.toString() + (nowDT.getMonth()+1).toString() + nowDT.getDate().toString();
		
		var data = {};
		data = {
			"ACN" : form.getFieldValue("U_ACNO"),// 帳號
			"STADATE" : startDT,// 查詢起日
			"ENDDATE" : endDT,// 查詢迄日
			"LSTIME" : nowDT,// 最後異動時間
			"SIL" : "Y",// 疑似不法
			"CTDNUM" : UAccountTradeDetailForm.agentId,// 行員編號
			"TYPE" : "01",// 類別
		};

		var args = JSON.stringify({
			"name" : "S134tbbapi",
			"from" : "csr",
			"sessionId" : UAccountTradeDetailForm.sessionId,
			"agentId" : UAccountTradeDetailForm.agentId,
			"formData" : data
		});
		
		var bar = Jui.message.progress(function() {
			Jui.message.hint("查詢資料中，請稍後...");
		});
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				// console.log('0521'+ret);
				console.log(ret);
				// var source = ret.result.source;
				// form.setFieldValue("U_Result", source.ABEND)
				if (ret == undefined) {
	                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
					bar.close();
	                return;
				}
				if(ret.isSuccess){
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
						var ABENDtxt = ret.form.ABEND;
						for (var k = 0; k < codeDic.length; k++) {
							if (codeDic[k].value == ret.form.ABEND) {
								ABENDtxt = codeDic[k].text;
								break;
							}
						}
						Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
						bar.close();
						return;
					}
					var DataGrid = [];
					var formData = ret.form;
					for(var i=0; i<=formData.REC.length-1; i++)
					{
						var ret_LSTLTD = formData.REC[i].LSTLTD;
						var ret_TIME = formData.REC[i].TIME;
						if((ret_LSTLTD.trim() != "" || ret_TIME.trim() != "") && formData.REC[i].TRNBRH != "") { //僅顯示交易日期或時間不為空，且代收付行不為空的資料
							var U_Pay = "";
							var U_Income = "";
							var AMTTRN = formData.REC[i].AMTTRN;
							//2022.02.09-lillian-金額千分位處理
							if (AMTTRN != null) {
								// 20220719 update minus show problem start 
								if(AMTTRN.indexOf('-') != -1){									
									AMTTRN = AMTTRN.substr(0, (AMTTRN.length-1));									
									AMTTRN = AMTTRN.substr((AMTTRN.length-1),1) + Common.doCheckNumber(AMTTRN.substr(0, (AMTTRN.length-2))) + "." + AMTTRN.substr((AMTTRN.length-2), 2); //Emma-取電文11位金額,及兩位小數點及正負號-20220403
									AMTTRN = "-" + AMTTRN;									
								} else {
									AMTTRN = AMTTRN.substr((AMTTRN.length-1),1) + Common.doCheckNumber(AMTTRN.substr(0, (AMTTRN.length-3))) + "." + AMTTRN.substr((AMTTRN.length-3), 2); //Emma-取電文11位金額,及兩位小數點及正負號-20220403
								}
								// 20220719 update minus show problem end
								
								
								//AMTTRN = Common.doCheckNumber(AMTTRN.substr(0, (AMTTRN.length-2))) + "." + AMTTRN.substr((AMTTRN.length-3), 2);
								//AMTTRN = AMTTRN.substr((AMTTRN.length-1),1) + Common.doCheckNumber(AMTTRN.substr(0, (AMTTRN.length-3))) + "." + AMTTRN.substr((AMTTRN.length-3), 2); //Emma-取電文11位金額,及兩位小數點及正負號-20220403
							} else AMTTRN = "0.00";
							// 當借貸別(CODDBCR)為D 交易金額(AMTTRN)就為支出(U_Pay)的值，為C
							// 交易金額(AMTTRN)就為存入(U_Income)的值
							if(formData.REC[i].CODDBCR == "D"){
								//U_Pay = UAccountTradeDetailForm.doAmount(formData.REC[i].AMTTRN.replace(/\b(0+)/gi,""));
								U_Pay = AMTTRN;
								U_Income = "";
							}else if(formData.REC[i].CODDBCR == "C"){
								U_Pay = "";
								//U_Income = UAccountTradeDetailForm.doAmount(formData.REC[i].AMTTRN.replace(/\b(0+)/gi,""));
								U_Income = AMTTRN;
							}
							// 代收
							var bankNo = formData.REC[i].TRNBRH	;				
							//var arguments = {dictionaryId:"177dcfbb-a590-0d75-1395-d8f2cab1cb50"};
							//var json = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", arguments);
							/*var bankRet = json.data.filter(function(text, value){
								  return value==bankNo;     
								});
							if(bankRet.length){
								bankNo = bankRet[0].text
							}*/
							/*var json = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", arguments).data;
							for (var j = 0; j < json.length; j++) {
								if (json[j].value == bankNo) {
									bankNo = json[j].text;
									break;
								}
							}*/
							// 行庫別 --20220221 add by gemfor\Tiffany
							var iBankNo = formData.REC[i].PBDATA.substr(8,3);
							//var iBankNo = formData.REC[i].PBDATA; // Emma-客戶要求取電文即可-20220302
							/*for (var j = 0; j < json.length; j++) { 
								if (json[j].value == iBankNo) {
									iBankNo = json[j].text;
									break;
								}
							}*/
							
							//調整轉換時間邏輯，若為空字串則不處理轉換
							var DateAndTime = "";
							var res_LSTLTD = formData.REC[i].LSTLTD;
							var res_TIME = formData.REC[i].TIME;
							if (res_LSTLTD.trim() != "") {
								if (res_LSTLTD.trim().length == 7) {
									DateAndTime = (formData.REC[i].LSTLTD).substr(0,3)+"/"+(formData.REC[i].LSTLTD).substr(3,2)+"/"+(formData.REC[i].LSTLTD).substr(5,2);
								} else {
									DateAndTime = formData.REC[i].LSTLTD;
								}
							}
							if (res_TIME.trim() != "" && res_LSTLTD .trim() != "") {
								if (res_TIME.trim().length == 9) {
									//DateAndTime += " " + (formData.REC[i].TIME).substr(0,2)+":"+(formData.REC[i].TIME).substr(2,2)+":"+(formData.REC[i].TIME).substr(4,2);
									DateAndTime += " " + (formData.REC[i].TIME).substr(0,2)+":"+(formData.REC[i].TIME).substr(2,2)+":"+(formData.REC[i].TIME).substr(4,2)+":"+(formData.REC[i].TIME).substr(6,3); //Emma-調整取更細的秒數-20220303
								} else {
									DateAndTime += " " + formData.REC[i].TIME;
								}
							} else if (res_TIME.trim() != "") {
								if (res_TIME.trim().length == 9) {
									//DateAndTime += (formData.REC[i].TIME).substr(0,2)+":"+(formData.REC[i].TIME).substr(2,2)+":"+(formData.REC[i].TIME).substr(4,2);
									DateAndTime += (formData.REC[i].TIME).substr(0,2)+":"+(formData.REC[i].TIME).substr(2,2)+":"+(formData.REC[i].TIME).substr(4,2)+":"+(formData.REC[i].TIME).substr(6,3); //Emma-調整取更細的秒數-20220303
								} else {
									DateAndTime += formData.REC[i].TIME;
								}
							}
							var BAL = formData.REC[i].BAL;
							//2022.02.09-lillian-金額千分位處理
							if (BAL != null) {
								//BAL = Common.doCheckNumber(BAL.substr(0, (BAL.length-2))) + "." + BAL.substr((BAL.length-3), 2);
								BAL =BAL.substr((BAL.length-1),1) +  Common.doCheckNumber(BAL.substr(0, (BAL.length-3))) + "." + BAL.substr((BAL.length-3), 2); //Emma-取電文11位金額,及兩位小數點及正負號-20220403
							} else BAL = "0.00";
							var record={
								//U_DateAndTime : (formData.REC[i].LSTLTD).substr(0,3)+"/"+(formData.REC[i].LSTLTD).substr(3,2)+"/"+(formData.REC[i].LSTLTD).substr(5,2) + " " + (formData.REC[i].TIME).substr(0,2)+":"+(formData.REC[i].TIME).substr(2,2)+":"+(formData.REC[i].TIME).substr(4,2),
								U_DateAndTime : DateAndTime,
								U_Memo : formData.REC[i].MEMO,
								U_Pay : U_Pay,
								U_Income : U_Income,
								//U_Balance : formData.REC[i].BAL,
								U_Balance : BAL,
								U_BankNo : bankNo,
								U_UserData : formData.REC[i].DATA16,
								U_IBankNo :  iBankNo// 行庫別 --20220221 add by gemfor\Tiffany
							};
							DataGrid.push(record);
							
							if (i == formData.REC.length-1 ) {
								//20220208 增加調整依據交易日期由遠到近排序
								DataGrid = DataGrid.sort(function(a,b){
									if(a.U_DateAndTime > b.U_DateAndTime){
										return 1;
									}else if(a.U_DateAndTime < b.U_DateAndTime){
										return -1;
									}else if(a.U_DateAndTime == b.U_DateAndTime){
										return 1;
									}
								});
								form.getControl("U_Grid").setValue(DataGrid);
								UAccountTradeDetailForm.doTextAlign(); // 2022.04.01-gemfor/Emma-網格內文字位置設定 
								bar.close();
								TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
							}
						}
					}
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '140'; // 交易日期/時間 20210919 Tiffany
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[7].width = '400'; // 補充資料 20210919 Tiffany
					
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		for(var i = 1; i < Billamount.length; i++){
						var tds = Billamount[i].getElementsByTagName("td");
						tds[2].style.textAlign = 'right';
						tds[3].style.textAlign = 'right';
						tds[4].style.textAlign = 'right';
            		}
					
				}else{
				    // 電文失敗
	                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
					bar.close();
	                return;
				}
			}, 1 * 1000);
		})

	},
    
    // Excel下載 hsin
    doExcel: function(){
        if(!form.getFieldValue('U_Grid').length){
            Jui.message.alert("請先進行查詢再匯出Excel");
            return;
        }
		var args = {
				data: form.getFieldValue("U_Grid")
			};

		Utility.download("TBB.UAccountTradeDetail.exportList", args);
	},
	
	doAmount:function (str){
	    var regex = /(\d)(?=(\d\d\d) (?!\d))/g;
	    var amount = "";
	    if(str.indexOf(".") == -1){
	        amount= str.replace(regex,',')+'.00';
	    }else{
	        var newStr = str.split('.');
	        var amount = newStr[0].replace(regex,',');
	        if(newStr[1].length <= 1){ 
	            // 小數點後只有一位時
	            amount = amount +'.'+newStr[1]+'0';
	        }
	    }
	    
	    return amount;
	},
	    
	doOnchange : function() { // 20210927 add by gemfor\Tiffany -- onchange
		form.getControl("U_ACNO").onchange = function() {
			UAccountTradeDetailForm.doACNO();
		};
	},
	
	doACNO : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("帳號資料格式須為11位實體帳號");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},
	// 2022.04.01-gemfor/Emma-網格內文字位置設定
	doTextAlign : function(){
		var trs = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
		for(var i = 1; i < trs.length; i++){ //利用網格的資料長度
		    var tds = trs[i].getElementsByTagName("td"); //抓取網格欄位的值
		  //依照欄位的位置進行設定 
		    tds[2].style.textAlign = 'right'; 
		    tds[3].style.textAlign = 'right'; 
		    tds[4].style.textAlign = 'right'; 
		}
	},
	
}
Jui.event.attach(window, 'load', UAccountTradeDetailForm.doLoad);

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210919 add by gemfor\Tiffany -- 網格分頁筆數設定
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
	UAccountTradeDetailForm.doTextAlign(); // 2022.04.01-gemfor/Emma-網格內文字位置設定 
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '140'; // 交易日期/時間
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[7].width = '400'; // 補充資料
};