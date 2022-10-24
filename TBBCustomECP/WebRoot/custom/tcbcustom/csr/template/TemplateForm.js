var TemplateForm = 
{
	doLoad: function()
	{
//		var conditionalFields = [
//  			"FUpNextType","FUpNextText", "FUpLength", "FUpFill", "FUpLastType", "FUpLastText",
//  			"FDownNextType", "FDownNextText", "FDownLength", "FDownFill", "FDownLastType", "FDownLastText"
//  		];
//  		for (var i = 0; i < conditionalFields.length; ++i) {
//  			var box = form.getControl(conditionalFields[i]);
//  			box.setClearOnDisable(true);
//  			box.setRestoreOnEnable(true);
//  		}
		if(toolBar.getItem("Export")){
			Jui.event.attach(toolBar.getItem("Export"), "onclick", TemplateForm.doExport);
		}
		if(form.hasControl("U_DataModel")){
			Jui.event.attach(form.getControl("U_DataModel"), "onchange", TemplateForm.refreshFieldsStatus);
			form.getControl("U_DataModel").fireEvent("onchange");
		}
		if(form.hasControl("U_DataModelUp")){
			Jui.event.attach(form.getControl("U_DataModelUp"), "onchange", TemplateForm.refreshFieldsStatusUp);
			form.getControl("U_DataModelUp").fireEvent("onchange");
		}
		form.setFieldRequired("U_DownTemplate1",false);
	},
	
	doExport: function()
	{
		Utility.download(clientData.unitCode + ".export", {templateIds:[clientData.entityId]});
	},
	
	doSimulate: function()
	{
		Utility.invoke(clientData.unitCode + ".simulate", {entityId:clientData.entityId}, true, function(ret){
			Jui.message.hint($text("CUS.Csr.Message.Simulate"));
			EntityForm.reload(clientData.entityId);
		});
	},
	
	refreshFieldsStatus: function()
	{
		var me = this;
		var isString = me.getValue() == 'String';
		
//		form.setFieldEnabled("FDownNextType", isString);
//		form.setFieldEnabled("FDownNextText", isString);
//		form.setFieldEnabled("FDownLength", isString);
//		form.setFieldEnabled("FDownFill", isString);
//		form.setFieldEnabled("FDownLastType", isString);
//		form.setFieldEnabled("FDownLastText", isString);		
	},
	refreshFieldsStatusUp: function()
	{
		var me = this;
		var isString = me.getValue() == 'String';
		
//		form.setFieldEnabled("FUpNextType", isString);
//		form.setFieldEnabled("FUpNextText", isString);
//		form.setFieldEnabled("FUpLength", isString);
//		form.setFieldEnabled("FUpFill", isString);
//		form.setFieldEnabled("FUpLastType", isString);
//		form.setFieldEnabled("FUpLastText", isString);
		
		var isxml = me.getValue() == "Xml" || me.getValue() == "Json";
		form.setFieldRequired("U_UpTemplate",isxml);
	}
};
Jui.event.attach(window, 'load', TemplateForm.doLoad);