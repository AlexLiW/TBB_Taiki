/********************************************************************************
	 電子支付
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.11.25
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.11.25
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var ETicketForm = {

	doLoad : function() {
		
		//如果是從"信用卡持卡總覽查詢"打開時，如果是以持卡人ID查詢就帶入欄位，並發查R005
		
			if ("custID" in clientData.urlArgs) { // 信用卡持卡總覽查詢開啟表單
				var UID = clientData.urlArgs.custID;
				if(UID.length==10){//確認傳進來的是否為持卡人ID並發查R005
					form.setFieldValue("U_ID",UID);
					ETicketForm.doR005();
				}
			} 

		form.getControl("U_button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_button").onclick = function() {
		form.getControl("U_Grid4").setValue();//清空累計金額網格
		form.getControl("U_Grid5").setValue();//清空累計金額網格
		form.getControl("U_Grid6").setValue();//清空累計金額網格
		if (form.getFieldValue("U_ETCID")!=null){
			ETicketForm.doR024();
			ETicketForm.doR025();
		}else{
			Jui.message.alert("欄位不可為空" );
		}
		};

	},

	doR024 : function() { // 上送R024
		if (!form.validate()) {
			return;
		}
		var etnmbr = form.getFieldValue("U_ETCID");
		ETicketForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		ETicketForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R024",
			"ETNMBR" : etnmbr, 
		};
		var args = JSON.stringify({
			"name" : "R024tbbapi",
			"from" : "CSR",
			"sessionId" : ETicketForm.sessionId,
			"agentId" : ETicketForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDTtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDTtxt = codeDic[i].text;
							break;
						}
					}	
					console.log("交易代碼說明"+":"+ABENDTtxt); 
					form.setFieldValue("U_TransactionResult2", ret.form.ABEND);
					form.setFieldValue("U_TransactionResults2", ABENDTtxt);
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				var U_VP = formData.EXPDATE.substr(0, 4) + "/" + formData.EXPDATE.substr(4, 2) + "/" + formData.EXPDATE.substr(6, 2);	//日期格式重整
				var U_MCDate = formData.CREDATE.substr(0, 4) + "/" + formData.CREDATE.substr(4, 2) + "/" + formData.CREDATE.substr(6, 2);	//日期格式重整
				var U_ATDate = formData.DATE001.substr(0, 4) + "/" + formData.DATE001.substr(4, 2) + "/" + formData.DATE001.substr(6, 2);	//日期格式重整
				var U_ATRDate = formData.DATE002.substr(0, 4) + "/" + formData.DATE002.substr(4, 2) + "/" + formData.DATE002.substr(6, 2);	//日期格式重整
				var U_NTCDate = formData.DATE003.substr(0, 4) + "/" + formData.DATE003.substr(4, 2) + "/" + formData.DATE003.substr(6, 2);	//日期格式重整
				var U_BDate = formData.DATE004.substr(0, 4) + "/" + formData.DATE004.substr(4, 2) + "/" + formData.DATE004.substr(6, 2);	//日期格式重整
				var U_BDate = formData.DATE004.substr(0, 4) + "/" + formData.DATE004.substr(4, 2) + "/" + formData.DATE004.substr(6, 2);	//日期格式重整
				var U_BRD = formData.DATE005.substr(0, 4) + "/" + formData.DATE005.substr(4, 2) + "/" + formData.DATE005.substr(6, 2);	//日期格式重整
				var U_NBD = formData.DATE006.substr(0, 4) + "/" + formData.DATE006.substr(4, 2) + "/" + formData.DATE006.substr(6, 2);	//日期格式重整
				var U_RCD = formData.DATE007.substr(0, 4) + "/" + formData.DATE007.substr(4, 2) + "/" + formData.DATE007.substr(6, 2);	//日期格式重整
				var U_BTRDate = formData.DATE008.substr(0, 4) + "/" + formData.DATE008.substr(4, 2) + "/" + formData.DATE008.substr(6, 2);	//日期格式重整
				var U_ACRDate = formData.DATE009.substr(0, 4) + "/" + formData.DATE009.substr(4, 2) + "/" + formData.DATE009.substr(6, 2);	//日期格式重整
				var U_RD = formData.DATE010.substr(0, 4) + "/" + formData.DATE010.substr(4, 2) + "/" + formData.DATE010.substr(6, 2);	//日期格式重整
				

							var record = {//網格內容
							U_ETType :formData.ETTYPE,
							U_CCType :formData.CARDTYP,
							U_CCID :formData.CARDNUM,
							U_CPID:formData.CUSNAME,
							U_Credits:formData.CRLIMIT,
							U_VP:U_VP,
							U_MCDate:U_MCDate,
							//U_ISAM:formData.,
							U_ATDate:U_ATDate,
							U_ATRDate:U_ATRDate,
							U_NTCDate:U_NTCDate,
							U_BDate:U_BDate,
							U_BRD:U_BRD,
							U_NBD:U_NBD,
							U_RCD:U_RCD,
							U_BTRDate:U_BTRDate,
							U_ACRDate:U_ACRDate,
							U_RD:U_RD
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid4").setValue(U_O_Data);	
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},

	doR025 : function() { // 上送R025
		if (!form.validate()) {
			return;
		}
		var etnmbr = form.getFieldValue("U_ETCID");
		ETicketForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		ETicketForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R025",
			"ETNMBR" : etnmbr, 
		};
		var args = JSON.stringify({
			"name" : "R025tbbapi",
			"from" : "CSR",
			"sessionId" : ETicketForm.sessionId,
			"agentId" : ETicketForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
		
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("交易資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
					var U_TD = formData.REC[i].TXDATE.substr(0, 4) + "/" + formData.REC[i].TXDATE.substr(4, 2) + "/" + formData.REC[i].TXDATE.substr(6, 2);	//日期格式重整
					var U_CDate = formData.REC[i].CHGDTE.substr(0, 4) + "/" + formData.REC[i].CHGDTE.substr(4, 2) + "/" + formData.REC[i].CHGDTE.substr(6, 2);	//日期格式重整
					var U_PREDate = formData.REC[i].CHRTDT.substr(0, 4) + "/" + formData.REC[i].CHRTDT.substr(4, 2) + "/" + formData.REC[i].CHRTDT.substr(6, 2);	//日期格式重整
					var U_PRDate = formData.REC[i].CHRGRP.substr(0, 4) + "/" + formData.REC[i].CHRGRP.substr(4, 2) + "/" + formData.REC[i].CHRGRP.substr(6, 2);	//日期格式重整
						
					var record = {//網格1內容
								
						U_TC :formData.REC[i].TXCODE,
						U_TA:ETicketForm.dothousandComma(formData.REC[i].TXAMNT),
						U_BC:formData.REC[i].MTCODE,
						U_BName:formData.REC[i].MTNAME,
						U_LocCode:formData.REC[i].MTAREA,
						U_LOCName:formData.REC[i].AREANM,
						U_CDate:U_CDate,
						U_PREDate:U_PREDate,
						U_PRDate:U_PRDate,
						U_PRCode:formData.REC[i].RPCODE
						
					};
					var record2 = {//網格2內容
								
						U_TC :formData.REC[i].TXCODE,
						U_TA :ETicketForm.dothousandComma(formData.REC[i].TXAMNT),
						U_TD:U_TD

					};
						
						
                        U_O_Data.push(record);
						U_O_Data2.push(record2);						
					}
					
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_TC > b.U_TC){
							return 1;
						}else if(a.U_TC < b.U_TC){
							return -1;
						}else if(a.U_TC == b.U_TC){
							return 1;
						}
					});
					U_O_Data2 = U_O_Data2.sort(function(a,b){
						if(a.U_TC > b.U_TC){
							return 1;
						}else if(a.U_TC < b.U_TC){
							return -1;
						}else if(a.U_TC == b.U_TC){
							return 1;
						}
					});
							
					form.getControl("U_Grid5").setValue(U_O_Data);	
					form.getControl("U_Grid6").setValue(U_O_Data2);	
							
					var Billamount = document.getElementsByClassName("JuiGridTable")[4].getElementsByTagName("tr");//網格靠右
						  // 
					for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
						var tds = Billamount[i].getElementsByTagName("td");
						tds[1].style.textAlign = 'right';
						
            		}		
							
					var Billamount2 = document.getElementsByClassName("JuiGridTable")[5].getElementsByTagName("tr");//網格靠右
						  // 
					for(var i = 1; i < Billamount2.length; i++){//i從1開始取，0是網格標頭
						var tds = Billamount2[i].getElementsByTagName("td");
						tds[2].style.textAlign = 'right';
						
            		}



							
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},
	
	doR005 : function() { // 上送R005
		if (!form.validate()) {
			return;
		}
		var CUSIDN = form.getFieldValue("U_ID");
		ETicketForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		ETicketForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R005",
			"CUSIDN" : CUSIDN, 
		};
		var args = JSON.stringify({
			"name" : "R005tbbapi",
			"from" : "CSR",
			"sessionId" : ETicketForm.sessionId,
			"agentId" : ETicketForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
		
				var formData = ret.form;
				form.setFieldValue("U_CardNumber",formData.CARDNUM);
				form.setFieldValue("U_ETCID",formData.SVCSCRD);
		
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},
	
	dothousandComma : function(number) {//千分位
        var num = number.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while (pattern.test(num)) {
            num = num.replace(pattern, "$1,$2");
        }
        return num;

    },
	
};
