var UCardDetail = {
		doLoad : function()
		{
			UCardDetail.doIsNew();
		//	UCardDetail.setOnChange();
			UCardDetail.getContactInfo();
		},
		doIsNew : function() // 若表單為新建
		{
			
		},
		getContactInfo : function()
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				var args = clientData.urlArgs;
				//console.log(args.hasOwnProperty("U_CustID"));
				var FId = args.FId;
				var arg={
					fContactId:args.FId
				}
				Utility.syncInvoke("TBB.UGetForms.doGetCustID",arg,function(ret){
					form.setFieldValue("U_CustID",ret.fCustID); // 客戶身分證號
				});
				CustomInfo.doCsrQuery("TVO3MBBT");
				/* if(args.hasOwnProperty("U_CustID")){
					form.setFieldValue("U_CustID",args.U_CustID); // 客戶身分證號
				} */
			}
		},
		getCardDetails:function(trNo){
			if(UCustID.doCheck()){
				if(form.getFieldText("U_AccountNumberSystem")=="")
				{
					Jui.message.alert("請输入帳號");
					return ;
				}				
				var args = {form:form.getData()};
				args.form.F_TrNo = trNo;
				//args.form.F_CardKind ='';
			//	console.log(args.form);
				args.form.U_AccountNumberSystem =form.getFieldText("U_AccountNumberSystem");
				console.log(args.form);
				Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
				});	
				Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
				//	console.log(ret.result);
					console.log(json);
					form.updateData(json);
					var U_Result = json.U_ErrorCode;
					var U_ResultExplain =json.U_ErrorMemo;
					console.log("U_ResultExplain"+U_ResultExplain);
					form.setFieldValue("U_Result",U_Result);
					form.setFieldValue("U_ResultExplain",U_ResultExplain);
				});
			}else  {return false;}

				console.log(args.form);
		},
	/*	setOnChange : function()
		{
			form.getControl("U_ApplyWay").onchange = UGetForms.setRequire;
		},
		setRequire : function()
		{
			var U_ApplyWay = form.getFieldValue("U_ApplyWay");
			if(U_ApplyWay== 1) // FAX
			{
				form.setFieldVisible("U_Fax",true);
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",false);
				form.setFieldRequired("U_CustName", false);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);
			}
			else if(U_ApplyWay== 2) // PostOffice
			{
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Address",true);
				form.setFieldVisible("U_Email",false);
				form.setFieldRequired("U_CustName", true);
				form.setFieldRequired("U_CustBirthday", true);
				form.setFieldRequired("U_CustPhone", true);
				form.setFieldRequired("U_CustMobile", true);
			}
			else if(U_ApplyWay== 3) // EMAIL
			{
				form.setFieldVisible("U_Fax",false);
				form.setFieldVisible("U_Address",false);
				form.setFieldVisible("U_Email",true);
				form.setFieldRequired("U_CustName", false);
				form.setFieldRequired("U_CustBirthday", false);
				form.setFieldRequired("U_CustPhone", false);
				form.setFieldRequired("U_CustMobile", false);
			}
		},  */
		
};