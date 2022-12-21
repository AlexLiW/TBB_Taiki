/********************************************************************************
	 電子支付
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.11.25
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.12.05
	 * Note: 2022.12.05 Ai3\Jason 新增電文R021、R022
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

		form.getControl("U_button").setElementStyle("width: 30%"); //設定電子票證查詢按鈕大小
		form.getControl("U_button2").setElementStyle("width: 30%"); //設定悠遊卡交易按鈕大小
		
		form.getControl("U_button").onclick = function() {//電子票證頁簽
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


		form.getControl("U_button2").onclick = function() {//悠遊卡交易頁簽
		form.getControl("U_Grid").setValue();//清空累計金額網格
		form.getControl("U_Grid2").setValue();//清空累計金額網格
		form.getControl("U_Grid3").setValue();//清空累計金額網格
		if (form.getFieldValue("U_CardNumber")!=null){
			ETicketForm.doR021();
			ETicketForm.doR022();
		}else{
			Jui.message.alert("悠遊卡外顯卡號欄位不可為空" );
		}
		};
	},

	doR024 : function() { // 上送R024
	
	
		 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
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
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
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
					bar.close();
				
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
					bar.close();
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
							bar.close();							
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},

	doR025 : function() { // 上送R025
	 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
            Jui.message.hint("查詢資料中，請稍後...");
        });
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
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
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
					bar.close();
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
					bar.close();
							
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
				bar.close();
				return;
			}
			}, 1 * 1000);
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
		var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
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
		
				var formData = ret.form;
				form.setFieldValue("U_CardNumber",formData.CARDNUM);
				form.setFieldValue("U_ETCID",formData.SVCSCRD);
				bar.close();
		
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},
	
	doR021 : function() { // 上送R021
	
	
		 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var SVCSCRD = form.getFieldValue("U_CardNumber");
		ETicketForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		ETicketForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R021",
			"SVCSCRD" : SVCSCRD, 
		};
		var args = JSON.stringify({
			"name" : "R021tbbapi",
			"from" : "CSR",
			"sessionId" : ETicketForm.sessionId,
			"agentId" : ETicketForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
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
					form.setFieldValue("U_TransactionResult", ret.form.ABEND);
					form.setFieldValue("U_TransactionResults", ABENDTtxt);
					bar.close();
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("信用卡資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				var CARDTYP = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c303039590"}).data; // TBB-信用卡別
				var CARDTYPtxt = ret.form.CARDTYP;
					for (var i = 0; i < CARDTYP.length; i++) {
						if (CARDTYP[i].value == ret.form.CARDTYP) {
							CARDTYPtxt = CARDTYP[i].text;
							break;
						}
					}

							var record = {//網格內容
							U_CCID:formData.CARDNUM,
							U_CCType:CARDTYPtxt,
							U_CPName:formData.CUSNAME,
							U_CPID:formData.CARDIDN,
							U_Credits:formData.CRLIMIT,
							U_EDate:ETicketForm.doDate(formData.EXPDATE),
							U_MCdate:ETicketForm.doDate(formData.CREDATE),
							U_LCNum:formData.LSTCARD,
							U_ISAMNUM:formData.ISAMSEQ,
							U_ISAMMCNum:formData.ISAMBAT,
							U_ISAMBNum:formData.ISAMNBR,
							U_CardCategory:formData.MADETYP,
							U_AutoODate:ETicketForm.doDate(formData.ATLDDTE),
							U_AutoFDate:ETicketForm.doDate(formData.FSTALDT),
							U_CRDate:ETicketForm.doDate(formData.RECVDTE),
							U_CD:ETicketForm.doDate(formData.RETNDTE),
							U_KCDate:ETicketForm.doDate(formData.LUCKDTE),
							U_LDate:ETicketForm.doDate(formData.LOSTDTE),
							U_BTDate:ETicketForm.doDate(formData.REGRNDT),
							U_BTRDate:ETicketForm.doDate(formData.RCVRNDT),
							U_CDate:ETicketForm.doDate(formData.CHGDATE),
							U_SCSDate:ETicketForm.doDate(formData.STPSNDT),
							};
							U_O_Data.push(record);	
							
							form.getControl("U_Grid").setValue(U_O_Data);
							document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '150px';
							bar.close();							
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},
	
	doR022 : function() { // 上送R022
	 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
            Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var SVCSCRD = form.getFieldValue("U_CardNumber");
		ETicketForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		ETicketForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R022",
			"SVCSCRD" : SVCSCRD, 
		};
		var args = JSON.stringify({
			"name" : "R022tbbapi",
			"from" : "CSR",
			"sessionId" : ETicketForm.sessionId,
			"agentId" : ETicketForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
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
					Jui.message.alert("交易明細資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
					
					var record = {//網格1內容
								
						U_TC :formData.REC[i].TXCODE,
						U_TD:ETicketForm.doDate(formData.REC[i].TXDATE),
						U_UTime:ETicketForm.doTime(formData.REC[i].TXTIME),
						U_TA:ETicketForm.dothousandComma(formData.REC[i].TXAMNT),	
					};
					var record2 = {//網格2內容
						U_TA:ETicketForm.dothousandComma(formData.REC[i].TXAMNT),	
						U_TC:formData.REC[i].TXCODE,
						U_BC:formData.REC[i].MTCODE,
						U_BName:formData.REC[i].MTNAME,
						U_LocCode:formData.REC[i].MTAREA,
						U_LOCName:formData.REC[i].AREANM,
						U_CDate:ETicketForm.doDate(formData.REC[i].CHGDTE),
						U_LineAnn:formData.REC[i].TXFLAG,
						U_PRCode:formData.REC[i].RPCODE,
						U_PRDate:ETicketForm.doDate(formData.REC[i].CHRGRP),
						U_PREDate:ETicketForm.doDate(formData.REC[i].CHRTDT)

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
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_TC == b.U_TC){
							if(a.U_TD > b.U_TD){
							return 1;
						}else if(a.U_TD < b.U_TD){
							return -1;
						}else if(a.U_TD == b.U_TD){
							return 1;
						}
	
						}else{
							return 0;
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
							
					form.getControl("U_Grid2").setValue(U_O_Data);	
					form.getControl("U_Grid3").setValue(U_O_Data2);	
					bar.close();
							
					var Billamount = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");//網格靠右
						  // 
					for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
						var tds = Billamount[i].getElementsByTagName("td");
						tds[3].style.textAlign = 'right';
						
            		}		
							
					var Billamount2 = document.getElementsByClassName("JuiGridTable")[2].getElementsByTagName("tr");//網格靠右
						  // 
					for(var i = 1; i < Billamount2.length; i++){//i從1開始取，0是網格標頭
						var tds = Billamount2[i].getElementsByTagName("td");
						tds[0].style.textAlign = 'right';
						
            		}	


							
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
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
	doDate : function(date) {//日期格式重整
        var Date=
		date.substr(0, 4) + "/" + date.substr(4, 2) + "/" + date.substr(6, 2);
		return Date;
		
    },
	doTime : function(time) {//日期格式重整
        var Time=
		time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2);
		return Time;
		
    },
	
};
