var TransactionForm = 
{
	doLoad : function()
	{
		TransactionForm.doInit();
		form.getControl('F_Type').onchange = TransactionForm.doInit;
	},
	
	doInit : function()
	{
		switch(form.getFieldValue('F_Type')){
		case 'Up' :
			form.setFieldValue('F_DownString', null);
			form.setFieldValue('F_DownResult', null);
			form.setFieldVisible('F_DownString', false);
			form.setFieldVisible('F_DownResult', false);
			form.setFieldVisible('F_UpJson', true);
			form.setFieldVisible('F_UpResult', true);
			form.setFieldRequired('F_UpJson', true);
			break;
		case 'Down' :
			form.setFieldValue('F_UpJson', null);
			form.setFieldValue('F_UpResult', null);
			form.setFieldVisible('F_UpResult', false);
			form.setFieldVisible('F_UpJson', false);
			form.setFieldVisible('F_DownString', true);
			form.setFieldVisible('F_DownResult', true);
			form.setFieldRequired('F_DownString', true);
			break;
		default :
			form.setFieldVisible('F_UpResult', false);
			form.setFieldVisible('F_UpJson', false);
			form.setFieldVisible('F_DownString', false);
			form.setFieldVisible('F_DownResult', false);
		}
	},
	
	doSend : function()
	{
		if(EntityForm.validate()){
			Utility.invoke(clientData.unitCode + ".sendMessage", {form : EntityForm.getData()}, true, function(ret){
				var result = ret.result;
				if(!Jui.object.isEmpty(result.up)){
					form.setFieldValue('F_UpResult', result.up);
				}
				if(!Jui.object.isEmpty(result.transactionNo)){
					form.setFieldValue('F_DownResult', JSON.stringify(result));
				}
			});
		}
	}
	
};
Jui.event.attach(window, "load", TransactionForm.doLoad);