var TimeFormatForm = 
{
	doLoad : function()
	{
		if(toolBar.getItem("Preview")){
			Jui.event.attach(toolBar.getItem("Preview"), 'onclick', TimeFormatForm.doView);
		}
	},
	
	doView : function()
	{
		if(EntityForm.validate()){
			var pageArgs= {
					title			: form.getFieldValue("FName"),
					information		: form.getFieldValue("FName"),
					formatData 		: form.getData(),
					allowEmpty		: false,
					inputBoxType 	: 'InputBox',
					inputBoxArgs	: {emptyText : '请输入内容', type : 'string'},
					outputBoxType 	: 'InputBox',
					outputBoxArgs	: {type : 'string'},
			};
			Utility.openDialog(clientData.unitCode + ".Preview.page", pageArgs, {width:400,height:170}, function(ret){
				if(ret.result){
					EntityForm.doSave();
				}
			});
		}
	}
};
Jui.event.attach(window, 'load', TimeFormatForm.doLoad);