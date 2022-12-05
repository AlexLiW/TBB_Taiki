/********************************************************************************
	 電子支付累計金額表單
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.10.26
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.11.24
	 * Note: 新增電文CQ22 CQ23 CQ24
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var PayOnlineForm = {

	doLoad : function() {
		if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單，將身分證值帶入
			form.setFieldValue("U_ID", clientData.urlArgs.custID);
			form.setFieldValue("U_ID2", clientData.urlArgs.custID);
		}
		form.getControl("U_button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_button2").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_button").onclick = function() {
		form.getControl("U_Grid").setValue();//清空累計金額網格
		form.getControl("U_Grid2").setValue();//清空累計金額網格
		if (form.getFieldValue("U_ID")==null) {
			
				Jui.message.alert("請輸入身分證");
				return
			
		}
		PayOnlineForm.doCQ22();
		PayOnlineForm.doCQ23();
		};
		form.getControl("U_button2").onclick = function() {
		form.getControl("U_Grid3").setValue();//清空累計金額網格
		form.getControl("U_Grid4").setValue();//清空累計金額網格
		if (form.getFieldValue("U_ID2")==null) {
			
				Jui.message.alert("請輸入身分證");
				return
			
		}
		PayOnlineForm.doCQ20();
		PayOnlineForm.doCQ24();
		};

		PayOnlineForm.doOnchange();
		PayOnlineForm.doOnchange2(); 		
	},

	doCQ20 : function() { // 上送CQ20
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID2");
		PayOnlineForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		PayOnlineForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ20",
			"CUSIDN" : cusidn, // 身分證
		};
		var args = JSON.stringify({
			"name" : "CQ20tbbapi",
			"from" : "CSR",
			"sessionId" : PayOnlineForm.sessionId,
			"agentId" : PayOnlineForm.agentId,
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
					Jui.message.alert("累計轉帳金額檔資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
				
				var U_O_Data = [];
				var formData = ret.form;
				var LSTLTD_F = formData.TSFDAT.substr(0, 3) + "/" + formData.TSFDAT.substr(3, 2) + "/" + formData.TSFDAT.substr(5, 2);	//日期格式重整
				var U_Time = formData.TSFTIM.substr(0, 2) + ":" + formData.TSFTIM.substr(2, 2) + ":" + formData.TSFTIM.substr(4, 2); // 交易時間格式HH:mm:ss

							var record = {//網格內容
							U_account :formData.TSFACN,
							U_Transfer :LSTLTD_F+"  "+U_Time,
							U_Month :PayOnlineForm.dothousandComma(formData.TRAAMT12),
							U_Day:PayOnlineForm.dothousandComma(formData.TRAAMT13),
							U_Digital:PayOnlineForm.dothousandComma(formData.TRAAMT14),
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid4").setValue(U_O_Data);	
							
							document.getElementsByClassName("JuiGridTable")[3].firstChild.firstChild.children[2].width = '150px';//網格欄位寬度
							document.getElementsByClassName("JuiGridTable")[3].firstChild.firstChild.children[3].width = '140px';
							document.getElementsByClassName("JuiGridTable")[3].firstChild.firstChild.children[4].width = '140px';
							
							var Billamount = document.getElementsByClassName("JuiGridTable")[3].getElementsByTagName("tr");//網格靠右
						   // [3]是單元內第4個網格 
							for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
							var tds = Billamount[i].getElementsByTagName("td");
							tds[2].style.textAlign = 'right';
							tds[3].style.textAlign = 'right';
							tds[4].style.textAlign = 'right';
						
            		}



							
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},
	doCQ22 : function() { // 上送CQ22
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		PayOnlineForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		PayOnlineForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ22",
			"CUSIDN" : cusidn, // 身分證
		};
		var args = JSON.stringify({
			"name" : "CQ22tbbapi",
			"from" : "CSR",
			"sessionId" : PayOnlineForm.sessionId,
			"agentId" : PayOnlineForm.agentId,
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
					form.setFieldValue("U_transaction_result", ret.form.ABEND);
					form.setFieldValue("U_transaction_Results", ABENDTtxt);
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("電子支付主檔資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
				
				var U_O_Data = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_membership_number :formData.JKOACC,
							U_payment_account:formData.USERCODE,
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);	
							
							
							
							var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格靠右
						   
							for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
							var tds = Billamount[i].getElementsByTagName("td");
							tds[2].style.textAlign = 'right';
						
            		}
							
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},
	
	doCQ23 : function() { // 上送CQ23
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		PayOnlineForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		PayOnlineForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ23",
			"CUSIDN" : cusidn, // 身分證
		};
		var args = JSON.stringify({
			"name" : "CQ23tbbapi",
			"from" : "CSR",
			"sessionId" : PayOnlineForm.sessionId,
			"agentId" : PayOnlineForm.agentId,
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
					Jui.message.alert("電子支付綁定查詢資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
				
				var U_O_Data = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
						
					var U_send_date_time = formData.REC[i].SENDTIME.substr(0, 4) + "/" + formData.REC[i].SENDTIME.substr(4, 2) + "/" + formData.REC[i].SENDTIME.substr(6, 2)+"  "+formData.REC[i].SENDTIME.substr(8, 2)+":"+formData.REC[i].SENDTIME.substr(10, 2)+":"+formData.REC[i].SENDTIME.substr(12, 2); // 交易時間格式yyyy/mm/dd HH:mm:ss
					var record = {//網格1內容
								
						U_TransactionType :formData.REC[i].TXCODE,
						U_Account :formData.REC[i].ACN,
						U_state:formData.REC[i].STSCOD,
						U_send_date_time:U_send_date_time,
						U_TransactionNumber:formData.REC[i].MSGNO,
						U_branch_Code:formData.REC[i].BRHCOD,
						U_Chinese_name:formData.REC[i].BRHNUM,
						//U_amount:PayOnlineForm.dothousandComma(formData.REC[i].)
					};
						

						U_O_Data.push(record);						
					}
					//查詢結果需依 日期 由小到大 排序
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_send_date_time > b.U_send_date_time){
							return 1;
						}else if(a.U_send_date_time < b.U_send_date_time){
							return -1;
						}else if(a.U_send_date_time == b.U_send_date_time){
							return 1;
						}
					});
					form.getControl("U_Grid2").setValue(U_O_Data);

							
							
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			
		});
	},
	doCQ24 : function() { // 上送CQ24
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID2");
		PayOnlineForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		PayOnlineForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ24",
			"CUSIDN" : cusidn, // 身分證
		};
		var args = JSON.stringify({
			"name" : "CQ24tbbapi",
			"from" : "CSR",
			"sessionId" : PayOnlineForm.sessionId,
			"agentId" : PayOnlineForm.agentId,
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
					Jui.message.alert("訂單編號檔資料有誤！\n交易代號：" + ABENDtxt);
					return;
				}
				
				var U_O_Data = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
						
					var U_send_date_time = formData.REC[i].SENDTIME.substr(0, 4) + "/" + formData.REC[i].SENDTIME.substr(4, 2) + "/" + formData.REC[i].SENDTIME.substr(6, 2)+"  "+formData.REC[i].SENDTIME.substr(8, 2)+":"+formData.REC[i].SENDTIME.substr(10, 2)+":"+formData.REC[i].SENDTIME.substr(12, 2); // 交易時間格式yyyy/mm/dd HH:mm:ss
					var record = {//網格1內容
								
						U_order_number :formData.REC[i].PURCHNO,
						U_Amount :PayOnlineForm.dothousandComma(formData.REC[i].AMOUNT),
						U_response_code:formData.REC[i].RSPCOD,
						U_send_date_time:U_send_date_time,
						U_TransactionNumber:formData.REC[i].MSGNO,
						U_TransactionType:formData.REC[i].TRNTYPE,
						U_storeCategory:formData.REC[i].MERTYPE,
						U_orderNumber:formData.REC[i].ORGPHNO,
						U_refund_amount:PayOnlineForm.dothousandComma(formData.REC[i].REFUND)
						
					};
						

						U_O_Data.push(record);						
					}
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_send_date_time > b.U_send_date_time){
							return 1;
						}else if(a.U_send_date_time < b.U_send_date_time){
							return -1;
						}else if(a.U_send_date_time == b.U_send_date_time){
							return 1;
						}
					});
							
					form.getControl("U_Grid3").setValue(U_O_Data);	
							
							
							
					var Billamount = document.getElementsByClassName("JuiGridTable")[2].getElementsByTagName("tr");//網格靠右
						  // 
					for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
						var tds = Billamount[i].getElementsByTagName("td");
						tds[2].style.textAlign = 'right';
						tds[9].style.textAlign = 'right';
						
            		}



							
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
	
	doOnchange : function() { //  onchange
			form.getControl("U_ID").onchange = function() {
				PayOnlineForm.doACNO();
			};
	},
	doOnchange2 : function() { //  onchange
			form.getControl("U_ID2").onchange = function() {
				PayOnlineForm.doACNO2();
			};
	},
	doACNO : function() { // 身分證 字數檢核
		
			if (form.getFieldValue("U_ID").length !=10) {
				Jui.message.alert("身分證輸入位數錯誤");
				
				
			}
			
		
	},
	doACNO2 : function() { // 身分證 字數檢核
			if (form.getFieldValue("U_ID2").length !=10) {
				Jui.message.alert("身分證輸入位數錯誤");
				
			}
		
	},
};
