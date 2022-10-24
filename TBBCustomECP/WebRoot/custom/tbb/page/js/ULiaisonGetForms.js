﻿var ULiaisonGetForms = {
		doLoad : function()
		{
			ULiaisonGetForms.doIsNew();
			ULiaisonGetForms.setOnChange();
			ULiaisonGetForms.getContactInfo();
			ULiaisonGetForms.setRequire();
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
			}else{
				ULiaisonGetForms.setRequire();
			}
		},
		getContactInfo : function()
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				var args = clientData.urlArgs;
				//console.log(args);
				//console.log(args.hasOwnProperty("U_CustID"));
				var FId = args.FId;
				var arg={
					fContactId:args.FId
				}
				Utility.syncInvoke("TBB.UGetForms.doGetCustID",arg,function(ret){
					form.setFieldValue("U_CustID",ret.fCustID); // 客戶身分證號
				});
				/* if(args.hasOwnProperty("U_CustID")){
					form.setFieldValue("U_CustID",args.U_CustID); // 客戶身分證號
				} */
				//
				form.setFieldValue("U_ApplyForm",args.fApplyForm); //申請表單				
				form.setFieldValue("U_CustName",args.U_CustName); //20170210 add custname by chainsea\alex.liwu
			}
		},
		setOnChange : function()
		{
			form.getControl("U_ApplyWay").onchange = ULiaisonGetForms.setRequire;
		},
		setRequire : function()
		{
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
			console.log(data);
			var args={	data:[data]	};
			console.log(args);
			Utility.invoke(clientData.unitCode + '.doSave',args,true,function(ret){
			var entityIds = ret.entityIds;
			EntityForm.addDialogResultEntityId(entityIds);
			EntityForm.clearModificationFlag();
			EntityForm.reload(entityIds);
			Jui.message.hint($text('Public.SaveSuccess'));
			}); 	
		}
};