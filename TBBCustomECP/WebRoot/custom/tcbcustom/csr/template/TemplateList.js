var TemplateList = 
{
	doExport : function()
	{
		var entityIds = list.getSelectedKeys();
		if (entityIds.length == 0) {
			Jui.message.alert($text("Public.SelectAlert"));
			return;
		}
		Utility.download(clientData.unitCode + ".export", {templateIds : entityIds});
	}
};