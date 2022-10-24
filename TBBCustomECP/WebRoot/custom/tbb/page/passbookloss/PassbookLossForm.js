// 事故交易查詢
var PassbookLossForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/05/20 
	 * Description: 事故交易查詢
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\tiffany.wu; 
	 * LastUpdateDate: 2021/09/29
	 * Note: 網格新增欄位(支票號碼、事故金額、事故內容說明)
	 * 		2022.02.14-lillian-	1.事故欄位取電文"EVTCOD"欄位、事故記號取電文"TRNNUM"欄位，如果是空白的話就維持空白。
	 * 							2.新增電文查詢等待畫面(轉圈圈)
	 * 							3.新增查詢無資料提示視窗
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		if ("U_ACN" in clientData.urlArgs) {
			form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
		}
		PassbookLossForm.doFieldChange();
		form.getControl("U_Button").onclick = function() {
			form.getControl("U_Grid").setValue();
			PassbookLossForm.doS602();
		};
	},

	doFieldChange : function() { // onchange
		Jui.event.attach(form.getControl("U_TYPE"), "onchange", function() { // 類別
			PassbookLossForm.doType();
		});
		
		Jui.event.attach(form.getControl("U_ACNO"), "onchange", function() { // 帳號/虛擬帳號 20210919 add by gemfor\Tiffany
			PassbookLossForm.doACNO();
		});
	},
	
	doType : function() { // 類別
		var type = form.getFieldValue("U_TYPE");
		if (type == "02") { // 歷史
			form.setFieldDisabled("U_ITEM", false);
			form.setFieldRequired("U_ITEM", true);
		} else {
			form.setFieldDisabled("U_ITEM", true);
			form.setFieldValue("U_ITEM", null);
		}
	},
	
	doACNO : function() { // 20210919 add by gemfor\Tiffany -- 帳號/虛擬帳號
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("“帳號/虛擬帳號”須至少11碼");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},

	doS602 : function() { // 上送S602
		if (!form.validate()) {
			return;
		}
		var acno = form.getFieldValue("U_ACNO");
		var type = form.getFieldValue("U_TYPE");
		var item = form.getFieldValue("U_ITEM");
		PassbookLossForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		PassbookLossForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "S602",
			"ACN" : acno, // 帳號
			"TYPE" : type, // 類別
			"ITEM" : item,// 項目
		};
		var args = JSON.stringify({
			"name" : "S602tbbapi",
			"from" : "CSR",
			"sessionId" : PassbookLossForm.sessionId,
			"agentId" : PassbookLossForm.agentId,
			"formData" : data,
		});
		
		var bar = Jui.message.progress(function() {	//2022.02.14-lillian-新增電文等待畫面(轉圈圈)
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
					//2022.02.14-gemfor/lillian-新增查無資料時要跳的提示訊息
					let ABEND = ret.form.ABEND;		//電文回應代號
					var ABEND_text = "";
					//2022.02.14-gemfor/lillian-新增回應代碼抓字典項文字
					let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
					for (let i = 0; i < ABEND_Dic.length; i++) {
						if (ABEND_Dic[i].value == ABEND) {
							ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
						}
					}
					
					if(ABEND == "0000" || ABEND == "OKLR"){
						var U_O_Data = [];
						var formData = ret.form;
						var REC_LEN = formData.REC.length; // 看有幾筆資料
						/*var evtType = !Jui.string.isEmpty(formData.EVTCODA2) ? "拒往戶" : !Jui.string.isEmpty(formData.EVTCODA3) ? "存摺掛失" 
							 		: !Jui.string.isEmpty(formData.EVTCODA4) ? "印鑑掛失" : !Jui.string.isEmpty(formData.EVTCODA5) ? "支票掛失" 
					 				: !Jui.string.isEmpty(formData.EVTCODA6) ? "撤銷付款委託" : !Jui.string.isEmpty(formData.EVTCODA7) ? "退票備付" 
			 						: !Jui.string.isEmpty(formData.EVTCODA8) ? "圈存" : !Jui.string.isEmpty(formData.EVTCODB4) ? "存款人死亡" 
									: !Jui.string.isEmpty(formData.EVTCODA2) ? "終止存提" : !Jui.string.isEmpty(formData.EVTCODD5) ? "終止提出" 
									: !Jui.string.isEmpty(formData.EVTCODD6) ? "暫停存提" : !Jui.string.isEmpty(formData.EVTCODD8) ? "警示衍生戶" : "";*/
						for (var i = 0; i < REC_LEN; i++) {
							if (!Jui.object.isEmpty(formData.REC[i].DATEVT.trim())) {
								var date = formData.REC[i].DATEVT.length == "7" ? formData.REC[i].DATEVT.substr(0, 3) + "/" + formData.REC[i].DATEVT.substr(3, 2) + "/" + formData.REC[i].DATEVT.substr(5, 2) : "";
								var time = formData.REC[i].TRNTIM.length == "6" ? formData.REC[i].TRNTIM.substr(0, 2) + ":" + formData.REC[i].TRNTIM.substr(2, 2) + ":" + formData.REC[i].TRNTIM.substr(4, 2) : "";
								
								//2022.02.14-lillian--修正寫法
								var AMTEVT = ""
								if(formData.REC[i].AMTEVT.replace(/\s+/g, '') != "" ){
									AMTEVT = TBBUtil.thousandComma(formData.REC[i].AMTEVT.substr(0,9)) + "." + formData.REC[i].AMTEVT.substr(9,2); // 事故金額 -- 20210929 Tiffany
								}
								
								//var AMTEVT = TBBUtil.thousandComma(formData.REC[i].AMTEVT.substr(0,9)) + "." + formData.REC[i].AMTEVT.substr(9,2); // 事故金額 -- 20210929 Tiffany
								var record = {
									U_DateAndTime : date + " " + time,
									U_TellerNo : formData.REC[i].EVTTLR,
									U_Department : formData.REC[i].EVTBRH,
									U_TYPE : formData.REC[i].EVTCOD,		// 2022.02.14-lillian-事故
									U_CHKNUM : formData.REC[i].CHKNUM, 		// 20210929 Tiffany
									U_AMTEVT : AMTEVT, 						// 20210929 Tiffany
									U_MEMO : formData.REC[i].MEMO, 			// 20210929 Tiffany
									U_AccidentSign : formData.REC[i].TRNNUM	// 2022.02.14-lillian-事故記號
								};
								U_O_Data.push(record);
							}
						}
						// 20210910 add by gemfor\Tiffany - start
						// 資料依"交易日期時間"由遠到近排序
						var wlen1 = U_O_Data.length;
						var count1 = 0;// 記錄總執行次數
						for (var i = 0; i < U_O_Data.length - 1; i++) {
							for (var j = 0; j < wlen1 - 1; j++) {
								if (U_O_Data[j].U_DateAndTime > U_O_Data[j + 1].U_DateAndTime) {
									var temp;
									temp = U_O_Data[j];
									U_O_Data[j] = U_O_Data[j + 1];
									U_O_Data[j + 1] = temp;
									count1++;
								}
							}
							wlen1 = wlen1 - 1;
						}
						// 20210910 add by gemfor\Tiffany - end
						form.getControl("U_Grid").setValue(U_O_Data);
						
						var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
						for(var i = 1; i < Billamount.length; i++){
							
							var tds = Billamount[i].getElementsByTagName("td");
							tds[4].style.textAlign = 'right';
						}
						
						bar.close();
					} else {
						//2022.02.14-gemfor/lillian-清空查詢結果欄位
						TBBUtil.doClearFields("查詢結果", null, null);
						Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
						bar.close();
						return;
					}
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
			}, 1 * 1000);
		});
	},
};
