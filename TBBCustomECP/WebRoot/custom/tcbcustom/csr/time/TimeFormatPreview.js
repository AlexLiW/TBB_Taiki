var TimeFormatPreview = 
{
	title			: clientData.urlArgs.title,
	information		: clientData.urlArgs.information,
	allowEmpty		: clientData.urlArgs.allowEmpty,
	inputBoxType	: clientData.urlArgs.inputBoxType,
	inputBoxArgs	: clientData.urlArgs.inputBoxArgs,
	outputBoxType	: clientData.urlArgs.outputBoxType,
	outputBoxArgs	: clientData.urlArgs.outputBoxArgs,
	
	formatData		: clientData.urlArgs.formatData,
		
	doLoad : function()
	{
		TimeFormatPreview.inputBox = Jui.basic[TimeFormatPreview.inputBoxType].create(Jui.object.merge({
			target	: "BoxPanel",
			style	: "width:100%;margin-top: 10px;"
		}, TimeFormatPreview.inputBoxArgs));
		TimeFormatPreview.outputBox = Jui.basic[TimeFormatPreview.outputBoxType].create(Jui.object.merge({
			target	: "BoxPanel",
			style	: "width:100%;margin-top: 10px;",
			disabled : true
		}, TimeFormatPreview.outputBoxArgs));
	},
	
	doConfirm: function()
	{
		var inputValue = TimeFormatPreview.inputBox.getValue();
		if (Jui.string.isEmpty(inputValue) && !TimeFormatPreview.allowEmpty) {
			Jui.message.alert($text("Qs.Misc.Prompt.InputAlert"), function() {
				TimeFormatPreview.inputBox.focus();
			});
			return;
		}
		Utility.invoke("Csr.TimeFormat.preview", {input : inputValue, format : TimeFormatPreview.formatData}, true, function(ret){
			TimeFormatPreview.outputBox.setValue(ret.output);
			Utility.setDialogResultAttribute("result", true);
		});
	}
};
if (TimeFormatPreview.title != null) {
	document.title = TimeFormatPreview.title;
}