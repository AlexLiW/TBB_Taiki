var HeadForm = 
{
	doLoad: function()
	{
		var conditionalFields = [
   			"FConstant", "FExpression", "FJava", "FParameter", "FSql",
   			"FUnit",
   			"FTextLength", "FFill", "FDirection",
   			"FPositive", "FIntegerLength", "FPoint", "FDecimalLength"
   		];
   		for (var i = 0; i < conditionalFields.length; ++i) {
   			var box = form.getControl(conditionalFields[i]);
   			box.setClearOnDisable(true);
   			box.setRestoreOnEnable(true);
   		}
   		if(form.hasControl("FSourceType")){
   			Jui.event.attach(form.getControl("FSourceType"), "onchange", HeadForm.doSourceTypeBoxChange);
   			form.getControl("FSourceType").fireEvent("onchange");
   		}
   		if(form.hasControl("FType")){
   			Jui.event.attach(form.getControl("FType"), "onchange", HeadForm.doTypeBoxChange);
   			form.getControl("FType").fireEvent("onchange");
   		}
   		if(form.hasControl("FHandle")){
   			Jui.event.attach(form.getControl("FHandle"), "onchange", HeadForm.doSpecialChange);
   			form.getControl("FHandle").fireEvent("onchange");
   		}
	},
	
	doSourceTypeBoxChange : function()
	{
		var me = this;
		var sourceType = me.getValue();
		form.setFieldEnabled("FConstant", sourceType == 'Constant', true);
		form.setFieldEnabled("FExpression", sourceType == 'Expression', true);
		form.setFieldEnabled("FDownFieldId", sourceType == 'DownField', true);
		form.setFieldEnabled("FJava", sourceType == 'Java', true);
		form.setFieldEnabled("FParameter", sourceType == 'Java');
		form.setFieldEnabled("FSql", sourceType == 'Sql', true);
	},
	
	doTypeBoxChange : function()
	{
		var me = this;
		form.setFieldEnabled("FHandle", me.getValue() != null);
		if(me.getValue() != null){
			form.getControl("FHandle").fireEvent("onchange");
		}
	},
	
	doSpecialChange : function()
	{
		var me = this;
		var handle = me.getValue();
		var isEnabled = !me.isDisabled();
		var type = form.getFieldValue("FType");
		var isText = type == 'Text';
		var isNumber = type == 'Number';
		
		form.setFieldEnabled("FUnit", isEnabled && handle, true);
		
		form.setFieldEnabled("FTextLength", isEnabled && handle && isText);
		form.setFieldEnabled("FFill", isEnabled && handle && isText);
		form.setFieldEnabled("FDirection", isEnabled && handle && isText);
		form.setFieldRequired("FTextLength", isEnabled && handle && isText);
		form.setFieldRequired("FDirection",  isEnabled && handle && isText);
		
		form.setFieldEnabled("FPositive", isEnabled && handle && isNumber);
		form.setFieldEnabled("FIntegerLength", isEnabled && handle && isNumber);
		form.setFieldEnabled("FPoint", isEnabled && handle && isNumber);
		form.setFieldEnabled("FDecimalLength", isEnabled && handle && isNumber);
		form.setFieldRequired("FIntegerLength", isNumber && handle);
		form.setFieldRequired("FDecimalLength",  isNumber && handle);
	}

};
Jui.event.attach(window, 'load', HeadForm.doLoad);