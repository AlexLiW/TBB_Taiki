var UGetForms = {
		doLoad : function()
		{
			UGetForms.doIsNew();
			UGetForms.setOnChange();
			UGetForms.getContactInfo();
			UGetForms.setRequire();
			if (clientData.entityId != null ) {
				UGetForms.addServiceTrack();
			}
		},
		doIsNew : function() // 若表單為新建
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",false);
				form.setFieldVisible("U_SendWay",false);
				form.setFieldVisible("U_PostalCode",false);
				form.setFieldVisible("U_Other",false);
				form.setFieldRequired("U_CustName", false);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);
				form.setFieldRequired("U_CustID", false);
				if(form.getFieldText("U_ApplyForm")==""){
					form.setFieldRequired("U_ApplyForm", true);
				}
			}else{
				UGetForms.setRequire();
			}
		},
		getContactInfo : function()
		{
			form.setFieldDisabled("U_ApplyForm",false); //申请表单
			var fid=form.getFieldValue("FId");
			if(fid==null){
				var applys=[];
				Utility.syncInvoke("TBB.UGetForms.doGetApplyForm",null,function(ret){
					console.log(ret.data);
					for(var i=0;i<ret.data.length;i++){
						var applyForm = {};
						applyForm.value = ret.data[i].FId;
						applyForm.text = ret.data[i].FName;
						applys.push(applyForm);
					}
					form.getControl("U_ApplyForm").loadItems(applys);
				});
			}
		}, 
		
		setOnChange : function()
		{
			form.getControl("U_ApplyWay").onchange = UGetForms.setRequire;
		},
		setRequire : function()
		{
			//var FaxName = form.getFieldValue("F_DTime").replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "_" + form.getFieldValue("U_Fax");//20220411 更正取值
			//form.setFieldValue("U_RealFaxName", "ECP_" + FaxName);//20220406 add by chainsea\Emily.Tsai
			
			var U_ApplyWay = form.getFieldValue("U_ApplyWay");
			if(U_ApplyWay== 1) // FAX
			{
				form.setFieldVisible("U_Fax",true);
				form.setFieldVisible("U_Remind",true); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Remind1",true); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",false);
				form.setFieldRequired("U_CustName", true);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);
				form.setFieldVisible("U_SendWay",false);
				form.setFieldVisible("U_PostalCode",false);
				form.setFieldVisible("U_Other",false);	
			}
			else if(U_ApplyWay== 2) // PostOffice
			{
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Remind",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Remind1",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Address",true);
				form.setFieldVisible("U_SendWay",true);
				form.setFieldVisible("U_PostalCode",true);
				form.setFieldVisible("U_Other",true);
				form.setFieldVisible("U_Email",false);
				form.setFieldRequired("U_CustName", true);
				form.setFieldRequired("U_CustBirthday", true);
				form.setFieldRequired("U_CustPhone", false); //20170210 adjust by chainsea\alex.liwu
				form.setFieldRequired("U_CustMobile", false); //20170210 adjust by chainsea\alex.liwu
			}
			else if(U_ApplyWay== 3) // EMAIL
			{
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Remind",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Remind1",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",true);
				form.setFieldRequired("U_CustName", true);
				form.setFieldVisible("U_SendWay",false);
				form.setFieldVisible("U_PostalCode",false);
				form.setFieldVisible("U_Other",false);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);				
			}else{
				form.setFieldRequired("U_CustName", false);
				form.setFieldVisible("U_Remind",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Remind1",false); //20170210 add by chainsea\alex.liwu
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",false);
				form.setFieldVisible("U_SendWay",false);
				form.setFieldVisible("U_PostalCode",false);
				form.setFieldVisible("U_Other",false);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);				
			}
		},		
		doSave:function(){
			if (!EntityForm.validate()) {
				return;
			}
			var data = EntityForm.getData();
			data.U_ApplyForm=form.getFieldText("U_ApplyForm");
			console.log(data);
			var args={	data:[data]	};
			Utility.invoke(clientData.unitCode + '.doSave',args,true,function(ret){
			var entityIds = ret.entityIds;
			EntityForm.addDialogResultEntityId(entityIds);
			EntityForm.clearModificationFlag();
			EntityForm.reload(entityIds);
			Jui.message.hint($text('Public.SaveSuccess'));
			}); 	
		},
		addServiceTrack: function()
		{
			var args = {
					typeCode : clientData.unitId,
					typeName : clientData.unitName,
					objectId : clientData.entityId,
					objectName : form.getFieldValue("F_Identify")
			};
			Jui.window.getTop().CtiMainFrame.ctiAddServiceTrack(args);
		},
};