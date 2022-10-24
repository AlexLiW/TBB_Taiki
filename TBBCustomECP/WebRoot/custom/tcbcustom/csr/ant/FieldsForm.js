var FieldsForm = 
{
	doAddFields : function()
	{
		if(!EntityForm.validate()){
			return;
		}
		var unitCode = 'CSR.DfTrCSRFields';
		var args = Jui.object.merge(EntityForm.getData(), {unitCode : unitCode});
		Utility.invoke(clientData.unitCode + ".addFields", args, true, function(ret){
			Jui.message.hint($text("Csr.CsrField.AddNumber").replace("${0}", ret.result.insertNum));
			Utility.openDialog(unitCode + ".List.page");
		});
	},
	
	doDeleteFields : function()
	{
		var transactionNo 	= form.getFieldValue('F_TrNo');
		var confirmMessage 	= Jui.string.isEmpty(transactionNo) ? $text("Csr.CsrField.DeleteAllConfirm") : ($text("Csr.CsrField.DeleteConfirm").replace("${0}", transactionNo));
		Jui.message.confirm(confirmMessage, function(ret){
			Utility.invoke(clientData.unitCode + ".deleteFields", EntityForm.getData(), true, function(ret){
				Jui.message.hint($text("Csr.CsrField.DeleteNumber").replace("${0}", ret.result.deleteNum));
				Utility.openDialog(ret.result.unitCode + ".List.page");
			});
		});
	}
};