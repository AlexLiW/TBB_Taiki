var FieldsForm = 
{
	doAddFields : function()
	{
		if(!EntityForm.validate()){
			return;
		}
		Utility.invoke(clientData.unitCode + ".addFields", EntityForm.getData(), true, function(ret){
			Jui.message.hint("新增: " + ret.result.insertNum + "筆\r\n" + "修改: " + ret.result.updateNum);
			Utility.openDialog(ret.result.unitCode + ".List.page");
		});
	},
	
	doDeleteFields : function()
	{
		var transactionNo 	= form.getFieldValue('F_TrNo');
		var confirmMessage 	= Jui.string.isEmpty(transactionNo) ? "確定要刪除所有CSR欄位對應設定數據嗎" : "確定要刪除交易編號為" + transactionNo + "的所有CSR欄位對應設定數據";
		if(!confirm(confirmMessage)){
			return;
		}
		Utility.invoke(clientData.unitCode + ".deleteFields", EntityForm.getData(), true, function(ret){
			Jui.message.hint("已經刪除CSR欄位對應設定數據：" + ret.result.deleteNum + "條");
			Utility.openDialog(ret.result.unitCode + ".List.page");
		});
	}
};