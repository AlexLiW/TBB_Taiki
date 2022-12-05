/********************************************************************************
	 信用卡繳款檔
	 * Author: 			ai3\Jason.Fang
	 * CreateDate: 		2022.11.22
	 * LastUpdateUser:  ai3\Jason.Fang
	 * LastUpdateDate:  2022.11.22
	 * Note: 
	 
*********************************************************************************/
var CDetailsForm ={
	
	doLoad : function(){
	
		form.getControl("U_select").setElementStyle("width: 30%");
		form.getControl("U_select").onclick = function() {
			form.getControl("U_Grid").setValue();//清空網格
			form.getControl("U_Grid2").setValue();//清空網格
			CDetailsForm.doR002();

		};
	
	},
	
	doR002 : function(){
		console.log("進入R002");
		if (!form.validate()) {
			return;
		}
		form.setFieldValue("U_TransactionResult", null);
		form.setFieldValue("U_TransactionResults", null);
		var cardnum = form.getFieldValue("U_CID");
		CDetailsForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CDetailsForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "CARDNUM":cardnum
		};
		var args = JSON.stringify({
			"name" : "R002tbbapi",
			"from" : "CSR",
			"sessionId" : CDetailsForm.sessionId,
			"agentId" : CDetailsForm.agentId,
			"formData" : data,
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
			}
			
				if (ret.isSuccess == true) {
					console.log("電文資料OK");
					
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-197b-330b-1849d5394460"}).data; // TBB-信用卡繳款性檔查詢狀態
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
					
					if (ret.form.ABEND =="OKOK"||ret.form.ABEND =="OKLR") { 
					
					var U_O_Data = [];//明細1
					var U_O_Data2 = [];//明細2
					var formData = ret.form;
					var U_Time = formData.TRNDATE.substr(0, 3) + "/" + formData.TRNDATE.substr(3, 2) + "/" + formData.TRNDATE.substr(5, 2) // 交易時間格式yyy/mm/dd
					var U_DTime = formData.WKDATE.substr(0, 3) + "/" + formData.WKDATE.substr(3, 2) + "/" + formData.WKDATE.substr(5, 2)+"  "+formData.TRNTIME.substr(0, 2)+":"+formData.TRNTIME.substr(2, 2)+":"+formData.TRNTIME.substr(4, 2); // 交易時間格式yyy/mm/dd HH:mm:ss
					var record = {//明細1內容
								
							U_BeneficiaryBank:formData.TRNBRH,
							U_TellerCode:formData.TLRID,
							U_TransactionNumber:formData.TRNSEQ,
							U_INDate:U_Time,
							U_TransactionDate:U_DTime,
							U_Amount:CDetailsForm.dothousandComma(formData.TRNAMT),
							U_SerialNumber:formData.ICCSEQ
							
		
					};
					var record2 = {//明細2內容
									
								U_SupervisorCode:formData.SPVID,
								U_Kabe:formData.CARDTYPE,
								U_TransferBank:formData.ATOBRH,
								U_OAccount:formData.ATOACN,
								U_CardIssuer:formData.ISSUER,
								U_BANumber:formData.BNKATMID,
								U_SerialNumber:formData.ICCSEQ,
								U_ATMPending:formData.PENDMK,
								U_DebitAccount:formData.TSFACN,
								U_Correction:formData.PATCH,
								U_Method:formData.PAYMTH,
								U_Project:formData.RECOVERY,
								U_Amount:CDetailsForm.dothousandComma(formData.REFAMT)
			
					};
				
				
					U_O_Data.push(record);
					U_O_Data2.push(record2);
					form.getControl("U_Grid").setValue(U_O_Data);
					form.getControl("U_Grid2").setValue(U_O_Data2);
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格金額靠右
						for(var i = 1; i < Billamount.length; i++){
									var tds = Billamount[i].getElementsByTagName("td");
									tds[5].style.textAlign = 'right';			
						}	
					var Billamount2 = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");//網格金額靠右
						for(var i = 1; i < Billamount2.length; i++){
									var tds = Billamount2[i].getElementsByTagName("td");
									tds[12].style.textAlign = 'right';			
						}								
		
					
					}else{
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-197b-330b-1849d5394460"}).data; // TBB-信用卡繳款性檔查詢狀態
						var ABENDTtxt = ret.form.ABEND;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.ABEND) {
								ABENDTtxt = codeDic[i].text;
								break;
						}
					}	
						Jui.message.alert("錯誤：" + ABENDTtxt);
						return;

					}						
				    
	
					
				}else {
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

    }
	
}	