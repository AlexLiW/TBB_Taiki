var ConnectionForm = 
{
	doLoad : function()
	{
		var conditionalFields = [
 			"U_HttpUrl",  "U_RequestMethod", "U_PostMessage", "U_Head"
 		];
 		for (var i = 0; i < conditionalFields.length; ++i) {
 			var box = form.getControl(conditionalFields[i]);
 			box.setClearOnDisable(true);
 			box.setRestoreOnEnable(true);
 		}
 		if(form.hasControl("U_Type")){
 			Jui.event.attach(form.getControl("U_Type"), 'onchange', ConnectionForm.doTypeBoxChange);
 			form.getControl("U_Type").fireEvent("onchange");
 		}
 		if(form.hasControl("U_RequestMethod")){
 			Jui.event.attach(form.getControl("U_RequestMethod"), 'onchange', ConnectionForm.doRequestMethodBoxChange);
 			form.getControl("U_RequestMethod").fireEvent("onchange");
 		}
 		
	},
	
	doTypeBoxChange : function()
	{
		var me 				= this;
		var type 			= me.getValue();
		var isHttp 			= type == "Http";
		
		form.setFieldEnabled("U_HttpUrl", isHttp, true);
		form.setFieldEnabled("U_RequestMethod", isHttp, true);
		form.setFieldEnabled("U_PostMessage", isHttp);
		form.setFieldEnabled("U_Head", isHttp);
	},
	
	doRequestMethodBoxChange : function()
	{
		var me = this;
		var requestMethod = me.getValue();
		var isPost = requestMethod == 'Post';
		form.setFieldEnabled("U_PostMessage", isPost);
	}
};
Jui.event.attach(window, 'load', ConnectionForm.doLoad);
