/********************************************************************************
	 信用卡客戶促銷活動
	 * Author: 			
	 * CreateDate: 		2022.12.12
	 * LastUpdateUser: 	
	 * LastUpdateDate: 	2022.12.19
	 * Note: 2022.12.19 ai3/Jason.Fang 新增電文R026
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
		form.getControl("U_Button2").setElementStyle("width: 30%"); //設定查詢按鈕大小

		form.getControl("U_bot").onclick = function() {
		form.getControl("U_Grid").setValue();//清空累計金額網格

		if (form.getFieldValue("U_ID")!=null){
			
			CCPDFileForm.doR006();
			
		}else{
			Jui.message.alert("身分證欄位不可為空" );
		}
		};
		
		form.getControl("U_Button2").onclick = function() {
		form.getControl("U_Grid2").setValue();//清空網格
		form.getControl("U_Grid3").setValue();//清空網格
		CCPDFileForm.dochecknull();
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


	doR026 : function() { // 上送R026
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			return;
		}
		var CRDID = form.getFieldValue("U_CPID");
		var YEAR = form.getFieldValue("U_Year");
		CCPDFileForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCPDFileForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R026",
			"CRDID" : CRDID, 
			"YEAR" : YEAR,
		};
		var args = JSON.stringify({
			"name" : "R026tbbapi",
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
					Jui.message.alert("朝天宮點燈統計資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_Name :formData.NAME,
							U_Address:formData.ADDR,
							U_BDate:formData.CYCLE,
							U_CellPhone:formData.MOBIL,
							};
							
							var record2 = {//網格內容
							U_CCode :formData.BLOCK_CODE,
							U_JA:CCPDFileForm.dothousandComma(formData.TRNAMT1),
							U_FA:CCPDFileForm.dothousandComma(formData.TRNAMT2),
							U_MA:CCPDFileForm.dothousandComma(formData.TRNAMT3),
							U_AA:CCPDFileForm.dothousandComma(formData.TRNAMT4),
							U_MAA:CCPDFileForm.dothousandComma(formData.TRNAMT5),
							U_JuA:CCPDFileForm.dothousandComma(formData.TRNAMT6),
							U_JulyA:CCPDFileForm.dothousandComma(formData.TRNAMT7),
							U_AuA:CCPDFileForm.dothousandComma(formData.TRNAMT8),
							U_SA:CCPDFileForm.dothousandComma(formData.TRNAMT9),
							U_OA:CCPDFileForm.dothousandComma(formData.TRNAMT10),
							U_NA:CCPDFileForm.dothousandComma(formData.TRNAMT11),
							U_DA:CCPDFileForm.dothousandComma(formData.TRNAMT12),
							U_TFLamp:formData.QUALIFY,
							U_TFBe:formData.LIGHT,
							U_CLDate:CCPDFileForm.doDate(formData.LSTDAY_H69),
							U_SLDate:CCPDFileForm.doDate(formData.LSTDAY_H15),
							};
							U_O_Data.push(record);	
							U_O_Data2.push(record2);	
							form.getControl("U_Grid2").setValue(U_O_Data);
							form.getControl("U_Grid3").setValue(U_O_Data2);
							form.setFieldValue("U_CAmount", CCPDFileForm.dothousandComma(formData.TOT_TRNAMT));
							document.getElementsByClassName("JuiInputBox JuiInputBoxDisabled")[4].firstChild.style.textAlign = 'right';//累計金額靠右，firstChild是找第一個子截點
							var Billamount = document.getElementsByClassName("JuiGridTable")[2].getElementsByTagName("tr");//網格金額靠右
							for(var i = 1; i < Billamount.length; i++){
								var tds = Billamount[i].getElementsByTagName("td");
								tds[1].style.textAlign = 'right';
								tds[2].style.textAlign = 'right';
								tds[3].style.textAlign = 'right';
								tds[4].style.textAlign = 'right';
								tds[6].style.textAlign = 'right';
								tds[7].style.textAlign = 'right';
								tds[8].style.textAlign = 'right';
								tds[9].style.textAlign = 'right';
								tds[10].style.textAlign = 'right';
								tds[11].style.textAlign = 'right';
								tds[12].style.textAlign = 'right';
			
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
	
	dochecknull :function(){//確認朝天宮頁面輸入框是否為空
		if ((form.getFieldValue("U_CPID")!=null) && (form.getFieldValue("U_Year")!=null)){
			CCPDFileForm.dochecklength();
		}else{
			if(form.getFieldValue("U_Year")==null && form.getFieldValue("U_CPID")==null){
				Jui.message.alert("欄位不可為空" );
			}else if(form.getFieldValue("U_Year")==null){
				Jui.message.alert("西元年份欄位不可為空" );
			}else if (form.getFieldValue("U_CPID")==null)  {
				Jui.message.alert("持卡人ID欄位不可為空" );
			}
		}
		
	},
	
	dochecklength:function(){//確認西元年輸入格式是否正確
		if(form.getFieldValue("U_Year").length== 4){
			CCPDFileForm.docheckYear();
		}else{
			Jui.message.alert("請輸入4位數西元年份" );
		}
	},
	docheckYear:function(){//確認西元年輸入是否超出範圍，正確無誤則發查R026
		var today = new Date();
		var ThisYear = today.getYear()+1900;//計算當日西元年份
		if(form.getFieldValue("U_Year")<= ThisYear){
				CCPDFileForm.doR026();
		}else{
				Jui.message.alert("查詢西元年份不可大於今年" );
			}
	},
	
};
