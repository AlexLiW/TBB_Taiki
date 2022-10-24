var GridSign = 
{
	doLoad: function()
	{
		GridSign.doCreateControls();
		GridSign.doLoadData();
	},
	
	doLoadData : function()
	{
		if (toolBar.getItem("Save")) {
			Jui.event.attach(toolBar.getItem("Save"), 'onclick', GridSign.doSave);
		}
		form.loadData(clientData.formData);
		list.loadData(clientData.listData);
	},
	
	doCreateControls : function()
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
		form.loadTitle([{
            id		: "d6ec7344-d228-517e-c50c-158af01bd1c0",
            control	: "CheckBox",
            title	: $text("Csr.Grid.Sign.Enabled"),
            name	: "FGridSignEnabled",
            group1	: $text("Csr.BasicInformation")
        }]);
		window.list = Jui.option.List.create({
			target						: "ListPanel",
			multiSelect					: false,
			editable					: true,
			oneditrowchange				: CommonBusiness.doListEditRowChange,
			boxChangeHandler			: CommonBusiness.doListBoxChange,
			entityBoxSelectHandler		: CommonBusiness.doEntityBoxSelect,
			entityBoxViewHandler		: CommonBusiness.doEntityBoxView,
			entityBoxBeforeDropHandler	: CommonBusiness.doEntityBoxBeforeDrop,
			multiEntityBoxSelectHandler	: CommonBusiness.doMultiEntityBoxSelect
		});
		list.loadTitle({
			keyField	: "FGrid",
	        nameField	: "FGrid",
	        fields: [
		        {
		            control		: "InputBox",
		            title		: $text("Csr.Grid.Name"),
		            width		: 300,
		            name		: "FGrid",
		            type		: "string",
		            disabled 	: true
		        },
		        {
		            control		: "InputBox",
		            title		: $text("Csr.Grid.Sign"),
		            width		: 200,
		            name		: "FSign",
		            type		: "string",
		            required 	: true
		        }
	        ]
	    });
		Jui.option.Resizer.create({elements:["FormZone", "ListZone"], offset:-7});
	},
	
	doSave : function()
	{
		if(GridSign.validate()){
			var data = list.getData();
			var gridSign = {};
			for(var i = 0; i < data.length; i++){
				gridSign[data[i].FGrid] = data[i].FSign;
			}
			var args = {
				entityId : clientData.entityId,
				formData : {
					FGridSignEnabled 	: form.getFieldValue("FGridSignEnabled"),
					FGridSignData 		: JSON.stringify(gridSign)
				}
			};
			Utility.invoke(clientData.unitCode + ".saveGridSign", args, true, function(ret){
				var wnd = window;
				var args = wnd.clientData.urlArgs;
				Utility.navigate(wnd.location.href, args, wnd);
			});
		}
	},
	
	validate : function()
	{
		return list.validate();
	}
};
Jui.event.attach(window, 'load', GridSign.doLoad);