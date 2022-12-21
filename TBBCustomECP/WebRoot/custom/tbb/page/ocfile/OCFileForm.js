/********************************************************************************
	 額度異動
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
var OCFileForm = {
	
	

	doLoad : function() {
		

		if ("custID" in clientData.urlArgs) { // "存款帳戶總覽查詢"開啟帶入帳號
			form.setFieldValue("U_CID", clientData.urlArgs.custID);
		}
		form.getControl("U_button").setElementStyle("width: 30%"); //設定查詢按鈕大小
		form.getControl("U_button").onclick = function() {
		form.setFieldValue("U_TransactionResult","");//清空交易結果
		form.setFieldValue("U_TransactionResults","");//清空交易結果說明
		form.getControl("U_Grid").setValue();//清空明細網格
		console.log("清空");
		OCFileForm.doR031();
		
		};


	},



	doR031 : function() { // 上送R031
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CUSIDN = form.getFieldValue("U_CID");
		OCFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		OCFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R031",
			"CUSIDN" : CUSIDN, 
		};
		var args = JSON.stringify({
			"name" : "R031tbbapi",
			"from" : "CSR",
			"sessionId" : OCFileForm.sessionId,
			"agentId" : OCFileForm.agentId,
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
								U_ERSDate:OCFileForm.doDate(formData.QTASDT),
								U_EREDate:OCFileForm.doDate(formData.QTADDT),
								U_ERA:OCFileForm.dothousandComma(formData.AMTQTA),
								U_AL:formData.ATHLVL,
								U_AECode:formData.ATHEPNO,
							
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);
							var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格靠右
						  // 
							for(var i = 1; i < Billamount.length; i++){//i從1開始取，0是網格標頭
								var tds = Billamount[i].getElementsByTagName("td");
								tds[2].style.textAlign = 'right';
								
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
