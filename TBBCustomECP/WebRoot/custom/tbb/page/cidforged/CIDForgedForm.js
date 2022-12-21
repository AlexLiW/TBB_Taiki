//客戶身分證偽造遺失檔表單
/***************************************************************************
* Author: ai3/Jason.Fang
* CreateDate: 2022/12/20
* LastUpdateUser: ai3\Jason
* LastUpdateDate: 2022/12/20
* Note: 
	
**************************************************************************/
var CIDForgedForm = {

	doLoad : function() {
		console.log(clientData.urlArgs);
		if (clientData.urlArgs != undefined) {
			CIDForgedForm.input();
		}
		
		
	},
	
	input : function() {
		 var bar = Jui.message.progress(function() {		//2022.12.20-新增電文發送等待畫面
           Jui.message.hint("查詢資料中，請稍後...");
        });
		var U_O_Data=[];
		var record = clientData.urlArgs;
		var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
		console.log("字典"+":"+codeDic);
		var RESULTtxt = record.RESULT;
		for (var i = 0; i < codeDic.length; i++) {
				if (codeDic[i].value == record.RESULT) {
					RESULTtxt = codeDic[i].text;
						break;
					}
				}	
		console.log("交易代碼說明"+":"+RESULTtxt); 
		form.setFieldValue("U_TransactionResult", record.RESULT);
		form.setFieldValue("U_TransactionResults", RESULTtxt);
        form.setFieldValue("U_ID", record.U_ID);
		form.setFieldValue("U_Issued", record.U_Issued);
		U_O_Data.push(record);	
		form.getControl("U_Grid").setValue(U_O_Data);
		form.getControl("U_Grid2").setValue(U_O_Data);
		bar.close();

    },
	
};
	
