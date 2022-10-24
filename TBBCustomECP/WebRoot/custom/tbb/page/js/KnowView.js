var KnowView = {
	doLoad : function(){	
		var args = {
		  knowledgeId : clientData.entityId
		};
		Utility.openDialog("TBB.FMan.Form.page",args );
	},
	
};
//Jui.event.attach(window, 'load', function(){Jui.util.execute('KnowList.doLoad');});