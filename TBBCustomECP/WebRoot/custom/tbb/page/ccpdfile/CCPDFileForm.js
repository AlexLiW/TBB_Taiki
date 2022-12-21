/********************************************************************************
	 信用卡客戶促銷活動
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
var CCPDFileForm = {
	
	

	doLoad : function() {

		
		//如果是從"信用卡持卡總覽查詢"打開時，如果是以持卡人ID查詢就帶入欄位
		
			if ("custID" in clientData.urlArgs) { // 信用卡持卡總覽查詢開啟表單
				var UID = clientData.urlArgs.custID;
				if(UID.length==10){
					form.setFieldValue("U_ID",UID);
				}
			} 

		form.getControl("U_bot").setElementStyle("width: 30%"); //設定查詢按鈕大小

		form.getControl("U_bot").onclick = function() {//電子票證頁簽
		form.getControl("U_Grid").setValue();//清空累計金額網格

		if (form.getFieldValue("U_ID")!=null){
			CCPDFileForm.doR006();
			
		}else{
			Jui.message.alert("身分證欄位不可為空" );
		}
		};
	},



	doR006 : function() { // 上送R006
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CUSIDN = form.getFieldValue("U_ID");
		CCPDFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCPDFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R006",
			"CUSIDN" : CUSIDN, 
		};
		var args = JSON.stringify({
			"name" : "R006tbbapi",
			"from" : "CSR",
			"sessionId" : CCPDFileForm.sessionId,
			"agentId" : CCPDFileForm.agentId,
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
							U_EVNum :formData.PROMID,
							U_RC:formData.ITEM,
							U_responses :formData.TOTNUM,
							U_PMNum:formData.RECNUM,
							U_LOGStaff:formData.REGID,
							U_LOGDate:CCPDFileForm.doDate(formData.REGDTE),
							U_LMBranch:formData.BRHID,
							U_FinalP:formData.TLRID,
							U_LRDate:CCPDFileForm.doDate(formData.CASHDTE),
							U_ACContent:formData.DETAIL,
							
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
