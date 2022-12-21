/********************************************************************************
	 信用卡客戶約定歷史
	 * Author: 			
	 * CreateDate: 		2022.12.12
	 * LastUpdateUser: 	
	 * LastUpdateDate: 	2022.12.12
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var CCAHistoryForm = {
	
	

	doLoad : function() {


		form.getControl("U_bot").setElementStyle("width: 30%"); //設定查詢按鈕大小
		form.getControl("U_bot2").setElementStyle("width: 30%"); //設定查詢按鈕大小

		form.getControl("U_bot").onclick = function() {
		form.getControl("U_Grid").setValue();
		form.getControl("U_Grid2").setValue();
		form.setFieldValue("U_Category",);
		form.setFieldValue("U_UID",);
		if (form.getFieldValue("U_CID")!=null){
			CCAHistoryForm.doR007A();
			
		}else{
			Jui.message.alert("客戶統編欄位不可為空" );
		}
		};
		
		form.getControl("U_bot2").onclick = function() {
		form.getControl("U_Grid3").setValue();
		form.getControl("U_Grid4").setValue();

		if (form.getFieldValue("U_ACNum")!=null){
			CCAHistoryForm.doR008();
			
		}else{
			Jui.message.alert("約定信用卡卡號欄位不可為空" );
		}
		};
	},



	doR007A : function() { // 上送R007A
	
	
		 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CUSIDN = form.getFieldValue("U_CID");
		CCAHistoryForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCAHistoryForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R007A",
			"CUSIDN" : CUSIDN, 
		};
		var args = JSON.stringify({
			"name" : "R007Atbbapi",
			"from" : "CSR",
			"sessionId" : CCAHistoryForm.sessionId,
			"agentId" : CCAHistoryForm.agentId,
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
					Jui.message.alert("約定明細資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				
							var record = {//網格內容
							U_LOGDate :formData.REGDTTM.substr(0, 4) + "/" + formData.REGDTTM.substr(4, 2) + "/" + formData.REGDTTM.substr(6, 2)+"  "+formData.REGDTTM.substr(8, 2)+":"+formData.REGDTTM.substr(10, 2)+":"+formData.REGDTTM.substr(12, 2),
							U_PCNumber:formData.CARDNUM,
							U_TCode:formData.TLRNUM,
							U_StatusCode:formData.CODE,
							U_ApplyBranch:formData.BRHCOD

							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);
							form.setFieldValue("U_Category",formData.TYPE);
							form.setFieldValue("U_UID",formData.CUSNUM);
							bar.close();	
							CCAHistoryForm.doR007B();
			
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},


	doR007B : function() { // 上送R007B
	
	
		 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CUSIDN = form.getFieldValue("U_CID");
		var TYPE = form.getFieldValue("U_Category");
		var CUSNUM = form.getFieldValue("U_UID");
		CCAHistoryForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCAHistoryForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R007B",
			"CUSIDN" : CUSIDN, 
			"TYPE":TYPE,
			"CUSNUM":CUSNUM
		};
		var args = JSON.stringify({
			"name" : "R007Btbbapi",
			"from" : "CSR",
			"sessionId" : CCAHistoryForm.sessionId,
			"agentId" : CCAHistoryForm.agentId,
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
					Jui.message.alert("約定歷史檔資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				
							var record = {//網格內容
							U_ACNum :formData.CARNUM,
							U_Code:formData.CODE,
							U_RT:formData.LINNUM,
							U_TCode:formData.TLRNUM,
							U_ApplyBranch:formData.BRHCOD

							};
							U_O_Data.push(record);	
							form.getControl("U_Grid2").setValue(U_O_Data);
							bar.close();	
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},	
	
	doR008 : function() { // 上送R008
	
	
		 var bar = Jui.message.progress(function() {		//2022.12.05-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CARDNUM = form.getFieldValue("U_ACNum");
		CCAHistoryForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCAHistoryForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R008",
			"CARDNUM" : CARDNUM, 
		};
		var args = JSON.stringify({
			"name" : "R008tbbapi",
			"from" : "CSR",
			"sessionId" : CCAHistoryForm.sessionId,
			"agentId" : CCAHistoryForm.agentId,
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
					Jui.message.alert("約定明細資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				
							var record = {//網格內容
							U_Category :formData.TYPE,
							U_UID:formData.CUSNUM,
							};
							
							var record2 = {//網格內容
							U_StatusCode :formData.CODE,
							U_CDate:CCAHistoryForm.doDate(formData.CONDATE),
							U_dueDate:CCAHistoryForm.doDate(formData.PAYDATE),
							U_LADate:CCAHistoryForm.doDate(formData.AUTDATE),
							U_ART:CCAHistoryForm.dothousandComma(formData.AMOUNT),
							U_ARC:formData.RESPCOD

							};
							U_O_Data.push(record);	
							U_O_Data2.push(record2);
							form.getControl("U_Grid3").setValue(U_O_Data);
							form.getControl("U_Grid4").setValue(U_O_Data2);
							var Billamount = document.getElementsByClassName("JuiGridTable")[3].getElementsByTagName("tr");//網格靠右
						 
							for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
							var tds = Billamount[i].getElementsByTagName("td");
							tds[4].style.textAlign = 'right';
							
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
		date.substr(0, 3) + "/" + date.substr(3, 2) + "/" + date.substr(5, 2);
		return Date;
		
    },
	doTime : function(time) {//日期格式重整
        var Time=
		time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2);
		return Time;
		
    },
	
};
