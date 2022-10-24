var TBBFMan ={
	doLoad : function ()
	{
		form.setFieldVisible("F_PFuser",false);	
		form.setFieldVisible("F_KnowOrNotice",false);
		form.setFieldVisible("F_KnowOrNoticeId",false);
		TBBFMan.doSelect();
	},
	
	doSelect : function(){
		var FId = clientData.urlArgs.knowledgeId;
		var FValue = CommonBusiness.getEntity("Ecp.Knowledge",FId);
		form.setFieldValue("F_KnowOrNotice",FId);
		form.setFieldValue("F_KnowOrNoticeId",FValue.FEditId);
		console.log(FValue);
		var userId = form.getFieldValue("F_PFuser");
		var F_KnowOrNotice=form.getFieldValue("F_KnowOrNotice");
		var F_KnowOrNoticeId=form.getFieldValue("F_KnowOrNoticeId");
		console.log(userId+"\n"+F_KnowOrNotice+"\n"+F_KnowOrNoticeId);
		var args={
				userId				:	userId,
				F_KnowOrNotice		:	F_KnowOrNotice,
				F_KnowOrNoticeId	:	F_KnowOrNoticeId	
		};
		Utility.invoke("TBB.FMan.queryCount",{selects:args},true,function(ret){	
			var cou=ret.count.num;
			console.log(cou);
			form.setFieldValue("F_PNum",cou);
			//EntityForm.doSave();
			Utility.invoke("TBB.FMan.queryValue",{select:args},true,function(ret){
				var arr = ret.json;
				if(!Jui.string.isEmpty(arr)){
					toolBar.getItem("Save").setDisabled(true);
				}	
			});	
		});	
		
	},	
	doSave : function(){
		var cou = form.getFieldValue("F_PNum");
		if(cou==null){
			cou=0;
		}
		var cou1=parseInt(parseInt(cou)+1);
		form.setFieldValue("F_PNum",cou1);
		EntityForm.doSave();
	}
//	doInsert  : function(){
//		var data=EntityForm.getData();
//		console.log(data);
//		Utility.invoke("TBB.FMan.insert",{args:data},true,function(ret){
//			});	
//	}	
};
//Jui.event.attach(window, 'load', function(){Jui.util.execute('KnowList.doLoad');});