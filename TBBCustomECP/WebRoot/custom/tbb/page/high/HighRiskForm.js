/********************************************************************************
	 高風險客戶資料檔
	 * Author: 			
	 * CreateDate: 		2022.12.20
	 * LastUpdateUser: 	ai3/Jason.Fang
	 * LastUpdateDate: 	2022.12.20
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var HighRiskForm = {
	
	

	doLoad : function() {

		//如果是從"信用卡卡片狀態"打開時，如果手機號碼，虛擬卡號有資料，就帶入。
		if ("TID" in clientData.urlArgs) {
			var STID =clientData.urlArgs.TID.substr(0,10);
			form.setFieldValue("U_CellPhone", STID);
		}
		if ("CID" in clientData.urlArgs) {
			form.setFieldValue("U_VCNum", clientData.urlArgs.CID);
		}
		form.getControl("U_bot").setElementStyle("width: 30%"); //設定查詢按鈕大小
		form.getControl("U_bot2").setElementStyle("width: 30%"); //設定查詢按鈕大小
		form.getControl("U_bot").onclick = function() {
		form.getControl("U_Grid").setValue();//清空網格
		if(form.getFieldValue("U_CellPhone")!=null){
			HighRiskForm.doR020();
		}else{
			Jui.message.alert("欄位不可為空！");
		}
		};
		
		form.getControl("U_bot2").onclick = function() {
		form.getControl("U_Grid2").setValue();//清空網格
		form.getControl("U_Grid3").setValue();//清空網格
		if((form.getFieldValue("U_CellPhone")!=null)&&(form.getFieldValue("U_CNType")!=null)){
			HighRiskForm.doR027();
		}else{
			Jui.message.alert("欄位不可為空！");
		}
		};
	},



	doR020 : function() { // 上送R020
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			bar.close();
			return;
		}
		var CUSIDN = form.getFieldValue("U_CellPhone");
		HighRiskForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		HighRiskForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R020",
			"CUSIDN" : CUSIDN, 
		};
		var args = JSON.stringify({
			"name" : "R020tbbapi",
			"from" : "CSR",
			"sessionId" : HighRiskForm.sessionId,
			"agentId" : HighRiskForm.agentId,
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
					Jui.message.alert("資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_Name:formData.NAME,
							U_Tel:formData.TEL_AREA,
							U_Black:formData.TEL_AREA,
							U_TelephoneNum:formData.TELNUM  ,
							U_CellNum:formData.TEL_MOB,
							U_Address:formData.ADDRESS,
							U_Else:formData.OTHER,
							
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);
							bar.close();							
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},
	
	
	doR027 : function() { // 上送R027
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			bar.close();
			return;
		}
		var HCEKEY  = form.getFieldValue("U_CellPhone");
		var KEYTYPE  = form.getFieldValue("U_CNType");
		HighRiskForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		HighRiskForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R027",
			"HCEKEY" : HCEKEY, 
			"KEYTYPE" : KEYTYPE,
		};
		var args = JSON.stringify({
			"name" : "R027tbbapi",
			"from" : "CSR",
			"sessionId" : HighRiskForm.sessionId,
			"agentId" : HighRiskForm.agentId,
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
					Jui.message.alert("HCE資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_TPAN:formData.TPANKEY,
							U_PANKEY:formData.PANKEY,
							U_SIRKEY:formData.SIRKEY,
							};
							var record2 = {//網格內容
							U_CCType:formData.CARDTYP,
							U_CPID:formData.CARDIDN,
							U_PC:formData.STAFFCODE,
							U_DOA:HighRiskForm.doDate(formData.APPLDTE),
							U_IDVTIME:formData.OTPCNT,
							U_OPTTIME:formData.IDVCNT,
							
							};
							
							U_O_Data.push(record);	
							U_O_Data2.push(record2);
							form.getControl("U_Grid2").setValue(U_O_Data);
							form.getControl("U_Grid3").setValue(U_O_Data2);
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
        var Date=date;
		var a;
		if(Date.length==8){
			a= (Date.substr(0,4)-1911)+(Date.substr(4,4));
			if(a.length==6){
				a=a.substr(0,2) + "/" + a.substr(2, 2) + "/" + a.substr(4, 2);
			}else{
				 a=a.substr(0,3) + "/" + a.substr(3, 2) + "/" + a.substr(5, 2);
			}
		}else{
			a=Date.substr(0,3) + "/" + Date.substr(3, 2) + "/" + Date.substr(5, 2);
		}
		return a
		
    },
	doTime : function(time) {//日期格式重整
        var Time=
		time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2);
		return Time;
		
    },
	
};
