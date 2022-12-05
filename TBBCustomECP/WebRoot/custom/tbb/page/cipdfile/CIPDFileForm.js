/********************************************************************************
	 信用卡分期付款基本資料明細檔
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.11.24
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.11.25
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var CIPDFileForm = {

	doLoad : function() {
		form.getControl("U_button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_button2").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_button").onclick = function() {
		form.getControl("U_Grid").setValue();//清空累計金額網格
		form.getControl("U_Grid2").setValue();//清空累計金額網格
		form.getControl("U_Grid3").setValue();//清空累計金額網格
		form.getControl("U_Grid4").setValue();//清空累計金額網格
		form.getControl("U_Grid5").setValue();//清空累計金額網格
		if( form.getFieldValue("U_CCNum")==null){
			Jui.message.alert("請填寫信用卡卡號");
		}else{
		CIPDFileForm.doR009();
		CIPDFileForm.doR011();
		}	
		};
		form.getControl("U_button2").onclick = function() {
		form.getControl("U_Grid6").setValue();//清空累計金額網格
		if( form.getFieldValue("U_ID")==null){
			Jui.message.alert("請填寫身份證統一編號");
		}else{
		CIPDFileForm.doR012();
		}
		};

	},

	doR009 : function() { // 上送R009
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_CCNum");
		CIPDFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CIPDFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R009",
			"CARDNUM" : cusidn, 
		};
		var args = JSON.stringify({
			"name" : "R009tbbapi",
			"from" : "CSR",
			"sessionId" : CIPDFileForm.sessionId,
			"agentId" : CIPDFileForm.agentId,
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
					form.setFieldValue("U_TransactionResult", ret.form.ABEND);
					form.setFieldValue("U_TransactionResults", ABENDTtxt);
				
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
				var U_OrderDate = formData.SIGNDTE.substr(0, 3) + "/" + formData.SIGNDTE.substr(3, 2) + "/" + formData.SIGNDTE.substr(5, 2);	//日期格式重整
				var U_FPDate = formData.FSTPYDT.substr(0, 3) + "/" + formData.FSTPYDT.substr(3, 2) + "/" + formData.FSTPYDT.substr(5, 2);	//日期格式重整
				var U_LPDate = formData.LSTPYDT.substr(0, 3) + "/" + formData.LSTPYDT.substr(3, 2) + "/" + formData.LSTPYDT.substr(5, 2);	//日期格式重整
				var U_DDate = formData.AUTHDT1.substr(0, 3) + "/" + formData.AUTHDT1.substr(3, 2) + "/" + formData.AUTHDT1.substr(5, 2);	//日期格式重整
				var U_AAD = formData.AUTHDT2.substr(0, 3) + "/" + formData.AUTHDT2.substr(3, 2) + "/" + formData.AUTHDT2.substr(5, 2);	//日期格式重整
				

							var record = {//網格內容
							U_OrderDate :U_OrderDate,
							U_OrderNumber :formData.BUYNMBR,
							U_SSAgency :formData.MRTBANK,
							U_InterestRate:formData.INTRATE,
							U_FPDate:U_FPDate,
							U_TInstallments:formData.TOTPYMN,
							U_AInstallment:CIPDFileForm.dothousandComma(formData.TOTLAMT),
							U_LPDate:U_LPDate,
							U_DDate:U_DDate,
							U_NNum:formData.NONPYMN,
							U_UnaccountedNO:CIPDFileForm.dothousandComma(formData.UNDTAMT),
							U_AAD:U_AAD,
							U_Original:formData.AUTHCDT,
							U_Unaccounted:CIPDFileForm.dothousandComma(formData.UNDTINT),
							U_Advance:formData.AUTHCDP,
							U_Principal:CIPDFileForm.dothousandComma(formData.FSTPYMT),
							U_Interest:CIPDFileForm.dothousandComma(formData.FSTPYIT),
							U_Amortized:CIPDFileForm.dothousandComma(formData.PERPYIT),
							U_PSAmortized:CIPDFileForm.dothousandComma(formData.PERPYMT),
							U_StatusCode:formData.STSCODE,
							U_LTCode:formData.TLRNMBR,
							U_RSCode:formData.SPVNMBR,
							U_MicroNum:formData.MCRFMNO
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);	
							
							
							
							var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格靠右
						   // [3]是單元內第4個網格 
							for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
							var tds = Billamount[i].getElementsByTagName("td");
							tds[6].style.textAlign = 'right';
							tds[10].style.textAlign = 'right';
							tds[13].style.textAlign = 'right';
							tds[15].style.textAlign = 'right';
							tds[16].style.textAlign = 'right';
							tds[17].style.textAlign = 'right';
							tds[18].style.textAlign = 'right';
						
            		}
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},

	doR011 : function() { // 上送R011
			if (!form.validate()) {
				return;
			}
			var cusidn = form.getFieldValue("U_CCNum");
			CIPDFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
			var userId = CommonBusiness.getCurrentUser().userId;
			CIPDFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			var data = {
				"TXID": "R011",
				"CARDNUM" : cusidn, 
			};
			var args = JSON.stringify({
				"name" : "R011tbbapi",
				"from" : "CSR",
				"sessionId" : CIPDFileForm.sessionId,
				"agentId" : CIPDFileForm.agentId,
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
						Jui.message.alert("來電分期交易資料有誤！\n交易代號：" + ABENDtxt);
						return;
					}
			
					
					
					var U_O_Data = [];
					var U_O_Data2 = [];
					var formData = ret.form;
					
					

								
								
								
								
								var REC_LEN = formData.REC.length; // 看有幾筆資料
								for (var i = 0; i < REC_LEN; i++) {
									
									var U_TransactionDate = formData.REC[i].PURDAT.substr(0, 3) + "/" + formData.REC[i].PURDAT.substr(3, 2) + "/" + formData.REC[i].PURDAT.substr(5, 2);	//日期格式重整
									var U_LCDate = formData.REC[i].UPDDATE.substr(0, 3) + "/" + formData.REC[i].UPDDATE.substr(3, 2) + "/" + formData.REC[i].UPDDATE.substr(5, 2)+"  "+formData.REC[i].UPDTIME.substr(0, 2)+":"+formData.REC[i].UPDTIME.substr(2, 2)+":"+formData.REC[i].UPDTIME.substr(4, 2);	//日期格式重整
									var U_Instalment = formData.REC[i].AUTHDAT.substr(0, 3) + "/" + formData.REC[i].AUTHDAT.substr(3, 2) + "/" + formData.REC[i].AUTHDAT.substr(5, 2);	//日期格式重整
									var U_SKDate = formData.REC[i].KEYIDAT.substr(0, 3) + "/" + formData.REC[i].KEYIDAT.substr(3, 2) + "/" + formData.REC[i].KEYIDAT.substr(5, 2);	//日期格式重整
									var U_FPDate = formData.REC[i].FSTDAT.substr(0, 3) + "/" + formData.REC[i].FSTDAT.substr(3, 2) + "/" + formData.REC[i].FSTDAT.substr(5, 2);	//日期格式重整
									var U_NADate = formData.REC[i].NXTDAT.substr(0, 3) + "/" + formData.REC[i].NXTDAT.substr(3, 2) + "/" + formData.REC[i].NXTDAT.substr(5, 2);	//日期格式重整
									var U_LCDate2 = formData.REC[i].LSTDAT.substr(0, 3) + "/" + formData.REC[i].LSTDAT.substr(3, 2) + "/" + formData.REC[i].LSTDAT.substr(5, 2);	//日期格式重整
													
									var record = {//網格內容
										U_TransactionDate:U_TransactionDate,
										U_TACode:formData.REC[i].AUTCOD,
										U_Installments:formData.REC[i].PERIOD,
										U_TAInstallment:CIPDFileForm.dothousandComma(formData.REC[i].AMTDES),
										
								};
									
									
									var record2 = {//網格內容
									U_interestRate:formData.REC[i].INTRATE,
									U_LCDate:U_LCDate,
									U_Instalment:U_Instalment,
									U_SKDate:U_SKDate,
									U_StatusCode:formData.REC[i].STSCODE,
									U_Principal:CIPDFileForm.dothousandComma(formData.REC[i].FSTAMT),
									U_PSAmortized:CIPDFileForm.dothousandComma(formData.REC[i].PERAMT),
									U_Interest:CIPDFileForm.dothousandComma(formData.REC[i].CURINT),
									U_IAYear:CIPDFileForm.dothousandComma(formData.REC[i].ANNINT),
									U_IANext:CIPDFileForm.dothousandComma(formData.REC[i].PERINT),
									U_PCode:formData.REC[i].PROJECT,
									U_Unaccounted:formData.REC[i].NONCNT,
									U_UIP:CIPDFileForm.dothousandComma(formData.REC[i].NONAMT),
									U_FPDate:U_FPDate,
									U_NADate:U_NADate,
									U_LCDate2:U_LCDate2
									};
									U_O_Data.push(record);
								    U_O_Data2.push(record2);
								}
								U_O_Data = U_O_Data.sort(function(a,b){
									if(a.U_TransactionDate > b.U_TransactionDate){
										return 1;
									}else if(a.U_TransactionDate < b.U_TransactionDate){
										return -1;
									}else if(a.U_TransactionDate == b.U_TransactionDate){
										return 1;
									}
								});
								U_O_Data2 = U_O_Data2.sort(function(a,b){
									if(a.U_LCDate > b.U_LCDate){
										return 1;
									}else if(a.U_LCDate < b.U_LCDate){
										return -1;
									}else if(a.U_LCDate == b.U_LCDate){
										return 1;
									}
								});
								form.getControl("U_Grid4").setValue(U_O_Data);	
								form.getControl("U_Grid5").setValue(U_O_Data2);
								
								
								var Billamount = document.getElementsByClassName("JuiGridTable")[3].getElementsByTagName("tr");//網格靠右
							   
								for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
									var tds = Billamount[i].getElementsByTagName("td");
									tds[3].style.textAlign = 'right';

								}
								var Billamount2 = document.getElementsByClassName("JuiGridTable")[4].getElementsByTagName("tr");//網格靠右
								for(var i = 1; i < Billamount2.length; i++){//i從1開始取，0是網格標頭
									var tds = Billamount2[i].getElementsByTagName("td");
									tds[5].style.textAlign = 'right';
									tds[6].style.textAlign = 'right';
									tds[7].style.textAlign = 'right';
									tds[8].style.textAlign = 'right';
									tds[9].style.textAlign = 'right';
									tds[11].style.textAlign = 'right';
									tds[12].style.textAlign = 'right';
									

								}
		
					} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				
			});
		},
	doR012 : function() { // 上送R012
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		CIPDFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CIPDFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R012",
			"CUSIDN" : cusidn, // 身分證
		};
		var args = JSON.stringify({
			"name" : "R012tbbapi",
			"from" : "CSR",
			"sessionId" : CIPDFileForm.sessionId,
			"agentId" : CIPDFileForm.agentId,
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
				var U_APPDate = formData.APYDTE .substr(0, 4) + "/" + formData.APYDTE .substr(4, 2) + "/" + formData.APYDTE .substr(6, 2);	//日期格式重整
				var U_LMDate = formData.LSTDTE.substr(0, 4) + "/" + formData.LSTDTE.substr(4, 2) + "/" + formData.LSTDTE.substr(6, 2)+"  "+formData.LSTTME.substr(0, 2)+":"+formData.LSTTME.substr(2, 2)+":"+formData.LSTTME.substr(4, 2);	//日期格式重整
				
							var record = {//網格內容
							U_APPDate :U_APPDate,
							U_APPSU :formData.FLAGA,
							U_LMDate :U_LMDate,
							U_Version:formData.VERSION,
							U_Pathway:formData.SOURCE 
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid6").setValue(U_O_Data);	
            		
		
	
	
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
