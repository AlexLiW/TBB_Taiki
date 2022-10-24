var DownFieldForm = 
{
	isString : false,
	
	doLoad : function()
	{
		DownFieldForm.doInitializeDataModel();
		var conditionalFields = [
   			"FSuccessCodes", "FNextCondition", "FNextConstant",  "FGrid", 
   			"FSql","FJava", "FParameter", "FExpression",
   			"FCastToNumber", "FTextLength", "FPositive", "FIntegerLength", "FPoint", "FDecimalLength",
   			"FTextSource", "FTextSetting"
   		];
   		for (var i = 0; i < conditionalFields.length; ++i) {
   			var box = form.getControl(conditionalFields[i]);
   			box.setClearOnDisable(true);
   			box.setRestoreOnEnable(true);
   		}
		if(form.hasControl("FType")){
			Jui.event.attach(form.getControl("FType"), 'onchange', DownFieldForm.doTypeBoxChange);
			form.getControl("FType").fireEvent('onchange');
		}
		if(form.hasControl("FSource")){
			Jui.event.attach(form.getControl("FSource"), 'onchange', DownFieldForm.doSourceBoxChange);
			form.getControl("FSource").fireEvent('onchange');
		}
		if(form.hasControl("FNextCondition")){
			Jui.event.attach(form.getControl("FNextCondition"), 'onchange', DownFieldForm.doNextConditionBoxChange);
			form.getControl("FNextCondition").fireEvent('onchange');
		}
		if(form.hasControl("FDataType")){
			Jui.event.attach(form.getControl("FDataType"), 'onchange', DownFieldForm.doDataTypeBoxChange);
			form.getControl("FDataType").fireEvent('onchange');
		}
		if (form.hasControl("FShowText")) {
			Jui.event.attach(form.getControl("FShowText"), 'onchange', DownFieldForm.doShowTextBoxChange);
			form.getControl("FShowText").fireEvent('onchange');
		}
	},
	
	doInitializeDataModel : function()
	{
		var templateBox = form.getControl("FTemplateId");
		DownFieldForm.dataModel = CommonBusiness.getFieldValue(templateBox.getEntityType(), templateBox.getValue(), "FDataModel");
		DownFieldForm.isString = DownFieldForm.dataModel == 'String';
		form.setFieldEnabled("FUnit", DownFieldForm.isString, true);
	},
	
	doShowTextBoxChange: function()
	{
		var me = this;
		var showText = me.getValue();
		form.setFieldEnabled("FTextSource", showText, true);
		form.setFieldEnabled("FTextSetting", showText, true);
	},
	
	doTypeBoxChange : function()
	{
		var me = this; 
		var type = me.getValue();
		form.setFieldEnabled("FSuccessCodes", type == 'Code', true);
		form.setFieldEnabled("FNextCondition", type == 'Next', true);
		if(form.hasControl("FNextCondition")){
			form.getControl("FNextCondition").fireEvent('onchange');
		}
		form.setFieldEnabled("FGrid", type == 'GridField', true);
		var sourceContorl = form.getControl("FSource");
		if(type == 'Code' || type == 'Next' || type == 'GridField'){
			sourceContorl.setDisabled(true);
			sourceContorl.setValue("Message");
			sourceContorl.fireEvent("onchange");
		}
		else{
			sourceContorl.setDisabled(false);
		}
	},
	
	doDataTypeBoxChange : function()
	{
		var me = this; 
		var type = me.getValue();
		var isFromMessage = form.getFieldValue("FSource") == "Message";
		form.setFieldEnabled("FUnit", DownFieldForm.isString && isFromMessage, true);
		if (isFromMessage) {
			form.setFieldEnabled("FTextLength", DownFieldForm.isString && type == 'Text', true);
			form.setFieldEnabled("FCastToNumber", type == 'Number');
			form.setFieldEnabled("FCastToNumberFormat", type == 'Number');
			form.setFieldEnabled("FPositive", DownFieldForm.isString && type == 'Number');
			form.setFieldEnabled("FIntegerLength", DownFieldForm.isString && type == 'Number', true);
			form.setFieldEnabled("FPoint", DownFieldForm.isString && type == 'Number');
			form.setFieldEnabled("FDecimalLength", DownFieldForm.isString && type == 'Number', true);
		}
		else {
			form.setFieldEnabled("FTextLength", false);
			form.setFieldEnabled("FCastToNumber", type == 'Number');
			form.setFieldEnabled("FCastToNumberFormat", type == 'Number');
			form.setFieldEnabled("FPositive", false);
			form.setFieldEnabled("FIntegerLength", false);
			form.setFieldEnabled("FPoint", false);
			form.setFieldEnabled("FDecimalLength", false);
		}
	},
	
	doNextConditionBoxChange : function()
	{
		var me = this; 
		var condition = me.getValue();
		form.setFieldEnabled("FNextConstant", condition == 'Constant', true);
	},
	
	doSourceBoxChange : function()
	{
		var me = this; 
		var source = me.getValue();
		form.setFieldEnabled("FSql", source == 'Sql', true);
		form.setFieldEnabled("FJava", source == 'Java', true);
		form.setFieldEnabled("FParameter", source == 'Java');
		form.setFieldEnabled("FExpression", source == 'Expression', true);
		form.getControl("FDataType").fireEvent('onchange');
	}

};
Jui.event.attach(window, 'load', DownFieldForm.doLoad);