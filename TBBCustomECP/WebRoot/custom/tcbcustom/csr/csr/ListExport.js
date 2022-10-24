var ListExport = 
{	
	doSqlExport : function()
	{
		if (list.length() == 0) {
			Jui.message.alert($text("Public.NoExportableData"));
			return;
		}
		var args = EntityList.getArguments();
		args.pageIndex = 1;
		args.pageSize = 1000;
		Utility.invoke(clientData.unitCode + ".getListData", args, true, function(ret) {
			var entityIds = Jui.array.extractProperty(ret.data.records, "FId");
			Utility.download("CSR.Gateway.exportData", {unitId : clientData.unitId, entityIds : entityIds});
		});
	}
};
