var KnowledgeReport = {
	doLoad : function(){

	},

};
CommonBusiness.selectEntity = function(unitCode, args, callback)
{	
	var pageCode	= unitCode + ".SelectList";
	var options		= Jui.util.clone(CommonBusiness.defaultDialogOptions.select);
	args			= Jui.object.merge({isSelect:true}, args);
	console.log(clientData.urlArgs);
	console.log(args);
	if(unitCode =="Ecp.Knowledge" && clientData.urlArgs.reportId == "1c12c03c-4e3f-4380-95d3-54fe94fd8a03"){
		args			= Jui.object.merge(args,{FEditId:"DD991F5D-7FCF-4153-9415-3E0F2AB990E8"}); 
	}else if(unitCode =="Ecp.Knowledge" && clientData.urlArgs.reportId == "ac319e53-c685-4f60-83a8-c50206e430a8"){
		args			= Jui.object.merge(args,{FEditId:"5A7F0BF1-5FCA-4C4A-9F6E-3827FFBC71EE"}); 
	}
	console.log(args);
	if (Utility.isInTab()) {
		var w = window;
		while (w.parent != window.top) {
			w = w.parent;
		}
		options.window = w;
		options.maximize = true;
	}

	Utility.openDialog(pageCode + ".page", args, options, function(ret) {
		if (Jui.array.isArray(ret)) {
			var entityIds = Jui.array.extractProperty(ret, "id");
			var entityNames = Jui.array.extractProperty(ret, "name");
			CommonBusiness.addToLastUse(unitCode, entityIds, entityNames);
		}
		else {
			console.log(unitCode);
			console.log(ret);
			CommonBusiness.addToLastUse(unitCode, ret.id, ret.name);
		}
		if (callback != null) {
			callback(ret);
		}
	}, null, options);
};
EntityList.getArguments = function()
{
	var args = Jui.object.merge({}, EntityList.basicQueryArguments);
	if (EntityList.isInitialQuery) {
		Jui.object.merge(args, EntityList.initialQueryArguments);
	}
	args.listId = clientData.listId;
	if (EntityList.relationId != null) {
		args.relationId = EntityList.relationId;
	}
	if (clientData.masterUnitId != null) {
		args.masterUnitId = clientData.masterUnitId;
	}
	if (clientData.masterEntityId != null) {
		args.masterEntityId = clientData.masterEntityId;
	}
	if (clientData.hasConstantFilterSql) {
		Jui.object.merge(args, clientData.urlArgs.tempSchemaInfo);
	} 
	if (!EntityList.multiPage) {
		args.pageSize = 1000;
	}
	else if (EntityList.isSelect) {
		args.pageSize = 20;
	}

	var schemaBox = EntityList.getQuerySchemaBox();
	if (schemaBox != null) {
		if (schemaBox.getValue() == null && EntityList.defaultSchema != null) {
			
			//根據FEditId判斷是打開公告還是知識
			var FEditId = clientData.urlArgs.FEditId;
			console.log(FEditId);
			if(FEditId =="DD991F5D-7FCF-4153-9415-3E0F2AB990E8" && args.listId=="460ba35b-9935-4349-a07e-4eee7b2ffe49"){
				EntityList.defaultSchema.id = "60fe706d-7a00-476b-b2df-523b185fa523";
				EntityList.defaultSchema.name = "知識";
			}
			if(FEditId =="5A7F0BF1-5FCA-4C4A-9F6E-3827FFBC71EE" && args.listId=="460ba35b-9935-4349-a07e-4eee7b2ffe49"){
				EntityList.defaultSchema.id="75ae28dd-4fa1-4e50-9938-c3033029849c";
				EntityList.defaultSchema.name = "公告";
			}
			//此處為知識與公告新增的代碼部分
			
			
			schemaBox.setValue(EntityList.defaultSchema.id, EntityList.defaultSchema.name);
			console.log(EntityList.defaultSchema);
		}
		if (schemaBox.getValue() != null) {
			args.schemaId = schemaBox.getValue();
		}
	}
	var keywordBox = EntityList.getKeywordBox();
	if (keywordBox != null && keywordBox.getValue() != null) {
		args.keyword = keywordBox.getValue();
	}
	if ((EntityList.hasTree || EntityList.hasQueryForm) && $elem("LeftZone").style.display != "none") {
		if (EntityList.hasTree && $elem("TreePanel").style.display != "none") {
			var id = EntityList.tree.getCurrentId();
			if (id != null) {
				args.masterEntityId	= id;
				args.includeSelf = true;
				args.includeIndirectSub = Jui.cast.toBool(clientData.urlArgs.includeIndirectSub, true);
			}
		} 
		if (EntityList.hasQueryForm && $elem("QueryFormPanel").style.display != "none") {
			var queryFormArgs = QueryForm.getConditions(true);
			args.queryFormRecent = queryFormArgs.queryFormRecent;
			if (queryFormArgs.conditions != null && queryFormArgs.conditions.length > 0) {
				if (args.conditions == null) {
					args.conditions = queryFormArgs.conditions;
				}
				else {
					args.conditions = args.conditions.concat(queryFormArgs.conditions);
				}
			}
		}
	}
	
	return args;
};
