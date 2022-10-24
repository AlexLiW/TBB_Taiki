var TransactionForm = 
{
	doLoad: function()
	{
		TransactionForm.doCreateControls();
	},
	
	doCreateControls: function()
	{
		window.form = Jui.option.Form.create({
			target						: "FormZone",
			columnCount					: 3,
			inputBoxEmptyAsNull			: true,
			boxChangeHandler			: CommonBusiness.doEditBoxChange,
			autoCompleteHandler			: CommonBusiness.doAutoComplete,
			entityBoxSelectHandler		: CommonBusiness.doEntityBoxSelect,
			entityBoxViewHandler		: CommonBusiness.doEntityBoxView,
			entityBoxBeforeDropHandler	: CommonBusiness.doEntityBoxBeforeDrop,
			entityBoxPopupClickHandler	: CommonBusiness.doEntityBoxPopupClick,
			multiEntityBoxSelectHandler	: CommonBusiness.doMultiEntityBoxSelect,
			pictureBoxSelectHandler		: CommonBusiness.doPictureBoxSelect,
			pictureBoxViewHandler		: CommonBusiness.doPictureBoxView,
			pictureBoxUrlFunction		: CommonBusiness.getPictureBoxUrl
		});
		form.loadTitle([
			{
			    id			: "d6ec7344-d228-877e-c90c-158a9d325f79",
			    control		: "TextBox",
			    title		: $text("CUS.Csr.TransactionArgs"),
			    maxLength	: 500000,
			    colSpan		: 0,
			    name		: "FArgs",
			    rowSpan		: 5,
			    group1		: $text("CUS.Csr.BasicInformation"),
			    group2		: $text("CUS.Csr.InputZone"),
			    required	: true,
			    value		: '{\n\t"name" : "CRD_GETCUSTPHONE",\n\t"from" : "csr",\n\t"sessionId" : "xxx",\n\t"formData" : {"USERID":"M122801128"}\n}'
			},               
			{
			    id			: "d6ec7344-d228-877e-c90c-158a9d325f78",
			    control		: "TextBox",
			    title		: $text("CUS.Csr.UpMessage"),
			    maxLength	: 500000,
			    colSpan		: 0,
			    name		: "FUpMessage",
			    rowSpan		: 5,
			    group1		: $text("CUS.Csr.BasicInformation"),
			    group2		: $text("CUS.Csr.OutputZone"),
			    disabled	: true
			},
			{
			    id			: "d6ec7344-d228-877e-c90c-158a9d325f60",
			    control		: "TextBox",
			    title		: $text("CUS.Csr.DownMessage"),
			    maxLength	: 5000000,
			    colSpan		: 0,
			    name		: "FDownMessage",
			    rowSpan		: 5,
			    group1		: $text("CUS.Csr.BasicInformation"),
			    group2		: $text("CUS.Csr.OutputZone"),
			    disabled	: true
			},
			{
			    id			: "d6ec7344-d228-877e-c90c-158a9d325f50",
			    control		: "TextBox",
			    title		: $text("CUS.Csr.ParseResult"),
			    maxLength	: 500000,
			    colSpan		: 0,
			    name		: "FResult",
			    rowSpan		: 5,
			    group1		: $text("CUS.Csr.BasicInformation"),
			    group2		: $text("CUS.Csr.OutputZone"),
			    disabled	: true
			}
			
		]);
	},
	
	doSubmit: function()
	{
		form.setFieldValue("FDownMessage","");
		form.setFieldValue("FResult","");
		form.setFieldValue("FUpMessage","");
		if(form.validate()){
			Utility.invoke("CUS.CsrQuery.test", {args : JSON.parse(form.getFieldValue("FArgs"))}, true, function(ret){
				form.setFieldValue("FUpMessage", JSON.stringify(ret.upMessage));
				form.setFieldValue("FDownMessage", JSON.stringify(ret.downMessage));
				form.setFieldValue("FResult", JSON.stringify(ret.result));
			});
		}
	}
};
Jui.event.attach(window, 'load', TransactionForm.doLoad);