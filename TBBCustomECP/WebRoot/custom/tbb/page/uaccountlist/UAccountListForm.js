// 存款帳戶總覽/活期餘額資料查詢
var UAccountListForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/05/20 
	 * Description: 存款帳戶總覽/活期餘額資料查詢
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\Emma; 
	 * LastUpdateDate: 2022/03/15
	 * Note: 快速連結拉掉"銀行客戶帳戶明細"
	 * 			2022.02.15-lillian-	1.順序依帳號由小到大
	 * 								2.查詢結果一頁呈現20筆
	 * 								3.新增電文查詢等待畫面
	 *			2022.02.23-lillian-全行收付顯示中文化
	 *          2022.03.15-Emma -doS110:加入電文結果查詢"OKOV"(筆數超過150筆)回傳的資料
	 **************************************************************************/

	doLoad : function() {
		form.setFieldValue("U_TYPE","02");
		form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
		// form.setFieldValue("U_UID", CommonBusiness.getFieldValue("Ecp.Contact", clientData.masterEntityId, "U_CustID"));
		if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID);
		} else {// 金融端業務開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
		UAccountListForm.doType();
		UAccountListForm.doFieldChange();
		form.getControl("U_Inquiry").onclick = function() {
			form.getControl("U_Grid").setValue();
			form.setFieldValue("U_NAME", "");
			UAccountListForm.doS110();
		};
		
		// 20210917 adjust by gemfor\Tiffany
		form.getControl("U_Grid")._headerJson[10].items[0].items = [ { // 快速連結 items
			onclick : "UAccountListForm.openQuickLink(\"A\")",
			id : "A",
			text : "存款明細查詢"
		}, /*{
			onclick : "UAccountListForm.openQuickLink(\"B\")",
			id : "B",
			text : "銀行客戶帳戶明細"
		},*/ {
			onclick : "UAccountListForm.openQuickLink(\"C\")",
			id : "C",
			text : "事故交易查詢"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"D\")",
			id : "D",
			text : "DEBIT金融卡圈存事故檔"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"E\")",
			id : "E",
			text : "金融卡發卡主檔/明細檔"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"F\")",
			id : "F",
			text : "定期存款餘額資料查詢"
		}, {
			text : "--------------------------------------------------------------"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"G\")",
			id : "G",
			text : "疑似不法-查詢交易-疑似不法帳戶交易明細查詢"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"H\")",
			id : "H",
			text : "疑似不法-登錄交易-存提交易註記登錄"
		},{
			onclick : "UAccountListForm.openQuickLink(\"I\")",
			id : "I",
			text : "疑似不法-登錄交易-圈存登錄作業"
		}, {
			onclick : "UAccountListForm.openQuickLink(\"J\")",
			id : "J",
			text : "疑似不法-登錄交易-解圈登錄作業"
		}
		];
		
		form.getControl("U_Grid").setPageSize(20);	//2022.02.15-gemfor/lillian-一頁20筆
	},

	doFieldChange : function() { // onchange
		Jui.event.attach(form.getControl("U_TYPE"), "onchange", function() { // 類別
			UAccountListForm.doType();
		});
		
		form.getControl("U_ACNO").onchange = function() { // 帳號 - 20210928 Tiffany
			UAccountListForm.doACNO();
		};
	},

	doType : function() { // 類別
		var type = form.getFieldValue("U_TYPE");
		if (type == "02") { // 身分證字號
			form.setFieldRequired("U_UID", true);
			form.setFieldDisabled("U_UID", false);
			form.setFieldRequired("U_ACNO", false);
			form.setFieldDisabled("U_ACNO", true);
			form.setFieldValue("U_ACNO", null); // 20210919 Tiffany
		} else if (type == "01") { // 臺幣活期性存款帳號或虛擬帳號
			form.setFieldRequired("U_UID", false);
			form.setFieldDisabled("U_UID", true);
			form.setFieldRequired("U_ACNO", true);
			form.setFieldDisabled("U_ACNO", false);
			form.setFieldValue("U_UID", null); // 20210919 Tiffany
		}
	},

	doS110 : function() { // 上送S110
		if (!form.validate()) {
			return;
		}
		var type = form.getFieldValue("U_TYPE");
		var uid = form.getFieldValue("U_UID");
		var acno = form.getFieldValue("U_ACNO");
		UAccountListForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UAccountListForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "S110",
			"TYPE" : type, // 類別
			"CUSIDN" : uid, // 身分證字號
			"ACN" : acno, // 臺幣活期性存款帳號或虛擬帳號
		};
		var args = JSON.stringify({
			"name" : "S110tbbapi",
			"from" : "CSR",
			"sessionId" : UAccountListForm.sessionId,
			"agentId" : UAccountListForm.agentId,
			"formData" : data,
		});
		console.log(args);
		
		var bar = Jui.message.progress(function() {		//2022.02.15-lillian-新增電文發送等待畫面
            Jui.message.hint("查詢資料中，請稍後...");
        });
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				if (ret.isSuccess == true) {
					//if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210928 add by gemfor\Tiffany
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000" || ret.form.ABEND == "OKOV")) { // 20220315 add by gemfor\Emma
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
					var U_O_Data = [];
					var formData = ret.form;
					var REC_LEN = formData.REC.length; // 看有幾筆資料
					form.setFieldValue("U_NAME", formData.NAME);
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i].ACN.trim())) {
							
							// 20210928 adjust by gemfor\Tiffany
							// 帳戶餘額
							var bDPIBAL = Jui.string.isEmpty(formData.REC[i].BDPIBAL) ? "" : TBBUtil.thousandComma(parseInt(formData.REC[i].BDPIBAL.substr(0, 11))) + "." + formData.REC[i].BDPIBAL.substr(11, 2);
							if (!Jui.string.isEmpty(formData.REC[i].SCUFLG)) {
								bDPIBAL = "秘密戶";
							}
							// 可用餘額(不含圈存)
							var aDPIBAL = ""; 
							if(!Jui.string.isEmpty(formData.REC[i].ADPIBAL)){
								if(formData.REC[i].ADPIBAL.indexOf('-') != -1){
									aDPIBAL = Jui.string.isEmpty(formData.REC[i].ADPIBAL) ? "" : TBBUtil.thousandComma(parseInt(formData.REC[i].ADPIBAL.substr(0, 11))) + "." + formData.REC[i].ADPIBAL.substr(11, 2);
									aDPIBAL = "-" + aDPIBAL; 
								} else {
									aDPIBAL = Jui.string.isEmpty(formData.REC[i].ADPIBAL) ? "" : TBBUtil.thousandComma(parseInt(formData.REC[i].ADPIBAL.substr(0, 11))) + "." + formData.REC[i].ADPIBAL.substr(11, 2);
								}
							}
							if (!Jui.string.isEmpty(formData.REC[i].SCUFLG)) {
								aDPIBAL = "秘密戶";
							}
							
							// 20210928 adjust by gemfor\Tiffany 帳戶管理分行字典化
							var BRHACC = formData.REC[i].BRHACC;
							BRHACCDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f40d-c207-17c0b9154140"}).data; // TBB-分行別(中文+代號)
							for (var q = 0; q < BRHACCDic.length; q++) {
								if (BRHACCDic[q].value == formData.REC[i].BRHACC) {
									BRHACC = BRHACCDic[q].text;
									break;
								}
							}
							
							var record = {
								U_ACN : formData.REC[i].ACN,
								// U_BRHACC : formData.REC[i].BRHACC, 
								U_BRHACC 	: BRHACC, // 20210924 Tiffany
								U_DPITYP 	: formData.REC[i].DPITYP,
								U_ATRCOD 	: formData.REC[i].ATRCOD,
								//U_IBHPWD : formData.REC[i].IBHPWD,
								U_IBHPSS 	: (formData.REC[i].IBHPSS == "*" ? "是" : "否" ),	//2022.02.23-lillian-全行收付顯示中文化
								U_ADPIBAL 	: aDPIBAL,
								U_CLR 		: Jui.string.isEmpty(formData.REC[i].CLR) ? "" : TBBUtil.thousandComma(parseInt(formData.REC[i].CLR.substr(0, 11))) + "." + formData.REC[i].CLR.substr(11, 2),
								U_ITR 		: Jui.string.isEmpty(formData.REC[i].ITR) ? "" : parseInt(formData.REC[i].ITR.substr(0, 2)) + "." + formData.REC[i].ITR.substr(2, 3),
								U_SABCOD 	: formData.REC[i].SABCOD,
								U_BDPIBAL 	: bDPIBAL, // 20210928 Tiffany
							};
							U_O_Data.push(record);
						}
					}
					
					//查詢結果網格需依 帳號 由小到大 排序
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_ACN > b.U_ACN){
							return 1;
						}else if(a.U_ACN < b.U_ACN){
							return -1;
						}else if(a.U_ACN == b.U_ACN){
							return 1;
						}
					});
					
					form.getControl("U_Grid").setValue(U_O_Data);
					
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		for(var i = 1; i < Billamount.length; i++){
						var tds = Billamount[i].getElementsByTagName("td");
						tds[4].style.textAlign = 'center';
						tds[8].style.textAlign = 'center';
						tds[5].style.textAlign = 'right';
						tds[6].style.textAlign = 'right';
						tds[7].style.textAlign = 'right';
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

	openQuickLink : function(type) { // 20210917 adjust by gemfor\Tiffany
		if (type == "A") {
			pageCode = "TBB.DepositDetail";
		} /*else if (type == "B") {
			pageCode = "";
		}*/ else if (type == "C") {
			pageCode = "TBBPassbookLoss";
		} else if (type == "D") {
			pageCode = "TBB.UDebitCardPI";
		} else if (type == "E") {
			pageCode = "TBB.UATMCardDetail";
		} else if (type == "F") {
			pageCode = "TBB.UFDepositDetail";
		} else if (type == "G") {
			pageCode = "TBB.UAccountTradeDetail";
		} else if (type == "H") {
			pageCode = "TBB.UDepositFlag";
		} else if (type == "I"){
			pageCode = "TBB.07Register";
		} else if (type == "J") {
			pageCode = "TBB.57Register";
		}
		var args = {
			U_ACN : form.getControl("U_Grid").getEventRow().data.U_ACN,
		};
		Utility.openDialog(pageCode + ".Form.page", args);
	},
	
	doACNO : function() { // 20210928 add by gemfor\Tiffany -- 字數檢核
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("帳號資料格式須為11位實體帳號");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},
};


//2022.02.15-lillian--改寫網格一頁的筆數
Jui.option.Grid.prototype.setPageSize = function(pageSize) {
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};
