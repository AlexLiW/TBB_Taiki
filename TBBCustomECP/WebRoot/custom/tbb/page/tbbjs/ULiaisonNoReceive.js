var ULiaisonNoReceive = {
		doLoad : function()
		{
			ULiaisonNoReceive.doIsNew();
			ULiaisonNoReceive.setOnChange();
			form.getControl("U_SearchMonth").setFormat("yyyy-MM");
			ULiaisonNoReceive.getStatus();
			ULiaisonNoReceive.getContactInfo();
			//form.setFieldValue("U_CardKind",0);
			//form.setFieldVisible("U_CardKind",false);	
			// alert(form.getControl("U_SearchMonth").getValue());
		},
		
		doIsNew : function() // 若表單為新建
		{
			form.setFieldDisabled("U_CustID",false);//身份證字號
			var fid=form.getFieldValue("FId");
			if(fid==null){
				form.setFieldVisible("U_ReactionOther",false);
			}
			else{
				var U_ReactionQ = form.getFieldValue("U_ReactionQ");
				if(U_ReactionQ== 3) // FAX
				{
					form.setFieldVisible("U_ReactionOther",true);
				}else{
					form.setFieldVisible("U_ReactionOther",false);
				}
			
			}
		},
// 客戶身分證號
		getContactInfo : function()
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				var args = clientData.urlArgs;
				var FId = args.FId;
				var arg={
					fContactId:args.FId
				}
				Utility.syncInvoke("TBB.UGetForms.doGetCustID",arg,function(ret){
					form.setFieldValue("U_CustID",ret.fCustID); // 客戶身分證號
				});
			}
		},
		setOnChange : function()
		{	
			form.getControl("U_ReactionQ").onchange = ULiaisonNoReceive.setRequire;
		},
		setRequire : function()
		{
			var U_ReactionQ = form.getFieldValue("U_ReactionQ");
			if(U_ReactionQ== 3) // FAX
			{
				form.setFieldVisible("U_ReactionOther",true);
			}else{
				form.setFieldVisible("U_ReactionOther",false);
			}
		},
		getStatus : function(){
			var FStatus = form.getFieldValue("FStatus");
			if(FStatus=="AgentSign1"){
				form.setFieldDisabled("U_CustID",true);
			}
			if(FStatus!="AgentSign1" && FStatus!="New")
			{
				form.setFieldDisabled("U_CardKind",true);
			}


			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_start
			if(FStatus=="Audit"){
				form.setFieldDisabled("U_CustID",true);  //身分證字號/統編
				form.setFieldDisabled("U_SearchMonth",true); //查詢月份
				form.setFieldDisabled("U_Checkout",true); //結帳日
				form.setFieldDisabled("U_PostalCode",true); //郵遞區號
				form.setFieldDisabled("U_ForecastDate",true); //預計交寄日
				form.setFieldDisabled("U_ReactionQ",true);  // 反應問題
				form.setFieldDisabled("U_ReactionOther",true); //其他原因
				form.setFieldDisabled("U_PositiveCardName",true); //正卡人姓名
				form.setFieldDisabled("U_Address",true); //客戶帳單地址
			}
			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_end

		},
		setSerialNo:function(event){
			var page= {
                    "dialogWidth": 500,
                    "icon": "quicksilver/image/unit/WorkItem.png",
                    "title": "工作項",
                    "dialogHeight": 226,
                    "code": "Wf.WorkItem.Submit",
                    "dialogMaximized": false
                };
				var args = {
					entityEventCode		: clientData.toolBarJson.left[0].entityEventCode,
					entityId			: clientData.entityId,
					workItemId			: clientData.workflow.workItemId,
					result				: clientData.toolBarJson.left[1].id,
					resultText			: clientData.toolBarJson.left[1].text,
					noComment			: '',
					isSubmit			: true,
					enableAllFields		: true,
					addConfirmButton	: true
				};
				Utility.openDialog(page.code+".page", args, CommonBusiness.defaultDialogOptions.form, function()
				{
					Jui.message.hint($text("Public.OperationSuccess"));   
					var arg={
							fTableName:"ULiaisonNoReceive",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"U_SerialNo"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});
					EntityForm._closeOrReload();
				});
			
			
		}

};