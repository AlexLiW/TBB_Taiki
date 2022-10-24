var m12116A ={
		doLoad : function ()
		{
			m12116A.doIsNew();
			m12116A.setOnchange();
			m12116A.setF_WTime();		
			m12116A.setF_HighDollers();
			m12116A.getStatus();
			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12116A.getInfo();
			if (clientData.entityId != null ) {
				m12116A.addServiceTrack();
			}
		},
		
		getInfo : function(){
			var args = clientData.urlArgs;
			console.log(args.hasOwnProperty("U_CustID"));
		
			if(args.hasOwnProperty("U_CustID")){
				form.setFieldValue("F_Identify",args.U_CustID); // 客戶身分證號
			}
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
					result				: clientData.toolBarJson.left[0].id,
					resultText			: clientData.toolBarJson.left[0].text,
					noComment			: '',
					isSubmit			: true,
					enableAllFields		: true,
					addConfirmButton	: true
				};
				Utility.openDialog(page.code+".page", args, CommonBusiness.defaultDialogOptions.form, function()
				{
					Jui.message.hint($text("Public.OperationSuccess")); 					
					var arg={
							fTableName:"TBBm12116",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
		},
		doOpenAgreeDialog: function(event)
		{
			var DealTime		= form.getFieldValue("F_DealTime");
			var EndDeal			= form.getFieldValue("F_EndDeal");
			if(DealTime==''||EndDeal==''){
				Jui.message.alert("處理結果還未填寫并保存");
			}else{
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
					result				: clientData.toolBarJson.left[0].id,
					resultText			: clientData.toolBarJson.left[0].text,
					noComment			: '',
					isSubmit			: true,
					enableAllFields		: true,
					addConfirmButton	: true
				};
				Utility.openDialog(page.code+".page", args, CommonBusiness.defaultDialogOptions.form, function()
				{
					Jui.message.hint($text("Public.OperationSuccess"));					
					EntityForm._closeOrReload();
				});
			}
				
		},
		
		setFStatus :function(){
			var FId   = form.getFieldValue("FId");
			if(FId==null){
				statu="New";
			}else{
			 statu = CommonBusiness.getFieldValue("TBB.m12116A",FId,"FStatus");
			 }
			return statu;
		},
		
		setStatus	:function(){
			m12116A.setFStatus();
			if(statu=="Audit2"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_DealTime",false);
						form.setFieldDisabled("F_EndDeal",false);
						form.setFieldRequired("F_DealTime",true);
						form.setFieldRequired("F_EndDeal",true);
						break;
					}else{
						toolBar.setItemDisabled("Save",true);
					}
				}
				
			}
		},
		//判断表单是否为新建的情况
		doIsNew : function()
		{
			//form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
			//toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);				
			}else{
				m12116A.setF_IscallbackRequire();
				//m12116A.setF_Prove();
				if(form.getFieldValue("F_Prove")==3)
					{
						form.setFieldRequired("F_Remark",true);
					}
				m12116A.setStatus();
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12116A.changeFStatus();
			}
			m12116A.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12116A.setFStatus();
			console.log(statu);
			if(statu=="End"){
				form.setFieldVisible("F_Satisfy",true);
				toolBar.setItemDisabled("Save",false);
				
			}else if(statu=="Finish"){
				form.setFieldVisible("F_Satisfy",true);
				toolBar.setItemDisabled("Save",true);			
			}
		},
		//判断关闭、反关闭按钮的可用性
		onClick : function()
		{	
			var FStatus=null;
			m12116A.setFStatus();
			if(statu=="Finish"){
				FStatus="unClose";
			}
			else if(statu=="unClose"){
				FStatus="Finish";
			}
			else if(statu=="End" || statu=="END1"){
				FStatus="Finish";
			}
			var table = clientData.unitCode , table_Arr = [];
			table = table.substring("table",10);
			table_Arr = table.split(".");
			table = table_Arr[0]+table_Arr[1];
			
			var args = {
					table   : table,
					FStatus : FStatus,
					FId : clientData.entityId
			};		
			console.log(args);
			Utility.invoke("TBB.m12111ADelay.updateFStatus",args,true,function(ret){
				if(ret.json==1){
					location.reload();
					m12116A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12116A.setFStatus();
			if(statu=="Finish"){
				console.log(clientData.editJson.title.length);
				for(var i=0;i<clientData.editJson.title.length;i++){
					form.setFieldDisabled(clientData.editJson.title[i].name,true);
				}
				toolBar.getItem("unClose").setDisabled(false);
				toolBar.getItem("Finish").setDisabled(true);
				toolBar.getItem("Save").setDisabled(true);
				toolBar.getItem("Submit").setDisabled(true);
				toolBar.getItem("Deal").setDisabled(true);	
			}else if(statu=="unClose"){
				
				for(var i=0;i<clientData.editJson.title.length;i++){
				
					form.setFieldDisabled(clientData.editJson.title[i].name,arrayDisabled[i]);
				}
				toolBar.getItem("unClose").setDisabled(true);
				toolBar.getItem("Finish").setDisabled(false);
				toolBar.getItem("Save").setDisabled(false);
				toolBar.getItem("Submit").setDisabled(false);
				toolBar.getItem("Deal").setDisabled(false);	
			}
		},
			
		setOnchange : function()
		{
			form.getControl("F_Iscallback").onchange=m12116A.setF_IscallbackRequire;
			form.getControl("F_Prove").onchange=m12116A.setF_Prove;
			
		},
		
	// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_Predict");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_Predict",ret.time);
				EntityForm.doSave();	
			});
		},
			//设置预计完成时间
		setF_WTime : function()
		{
			var day=(new Date().getDay())+1;
			if(day==7){
			  day=0;
			}
			var time=new Date().getTime();
			for(var i=0,j=3;i<3,j>0;i++){
				switch(day)
				{
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						day=day+1;
						time=time+(1000*60*60*24);
						j--;
						break;
					case 0:
						day=day+1;
						time=time+(1000*60*60*24);
						break;	
					case 6:
						day=6-day;
						time=time+(1000*60*60*24);
						break;	
				}
			}	
			var ETime = new Date(time);
			//var day = new Date(new Date().getTime() + 5*(1000*60*60*24)); 
			if(form.getFieldValue("F_Predict")==null){
				form.setFieldValue("F_Predict",ETime);
			}
		},
		setF_Prove : function()
		{
			var F_Prove = form.getFieldValue("F_Prove");
			if(F_Prove==3){
				form.setFieldValue("F_Remark",null);
				form.setFieldRequired("F_Remark",true);
			}else{
				form.setFieldValue("F_Remark",null);
				form.setFieldRequired("F_Remark",false);
				
			}
		},
		
		setF_HighDollers  : function()
		{
		   
		   var F_HighDollers=form.getFieldValue("F_HighDollers");
		   var F_LastDollers=form.getFieldValue("F_LastDollers");
	        var isValid;
			  if(F_HighDollers<0 &&  F_LastDollers<0){
			        Jui.message.alert("原始信用額度和臨時調整信用額度必须大于0");
			        isValid =false;
		        }
		        else if(F_HighDollers<0){
			        Jui.message.alert("原始信用額度必须大于0");
			        isValid =false;
		        }
				 else  if(F_LastDollers<0){
			        Jui.message.alert("臨時調整信用額度必须大于0");
			        isValid= false;
		        }
				 
				else{
			        return true;
		        }
	        return isValid;
        	
},	


		//
		setF_IscallbackRequire : function()
		{
			var Cypher = form.getFieldValue("F_Iscallback");
			if(Cypher==0){
				form.setFieldDisabled("F_CallbackTime",false);
				form.setFieldRequired("F_CallbackTime",true);
			}else{	
				form.setFieldDisabled("F_CallbackTime",true);
				form.setFieldValue("F_CallbackTime",null);
			}
		},
		getStatus : function()
		{
			var status=form.getFieldValue("FStatus");
			if(status=="AgentSign1")
			{
				form.setFieldDisabled("F_Identify",true);
			}
			
		},
		doOpen : function()
		{
			var F_Identify       		= form.getFieldValue("F_Identify");//身份證字號
			var F_CardKind     		= form.getFieldValue("F_CardKind");//卡種
			var F_SystemTime   		= form.getFieldValue("F_SystemTime");//日期時間
			var F_HomePhone			= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   	= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone   	= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   		= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   		= form.getFieldValue("F_CardNumber");//正卡人卡號
			var F_Branch  			= form.getFieldValue("F_Branch");//往來分行
			var F_Iscallback   		= form.getFieldValue("F_Iscallback");//是否回電給客戶
			var F_CallbackTime   	= form.getFieldValue("F_CallbackTime");//限期回電時間
			var F_LastDollers   	= form.getFieldValue("F_LastDollers");//最新金額
			var F_HighDollers   	= form.getFieldValue("F_HighDollers");//原始金額
			var F_StartTime   		= form.getFieldValue("F_StartTime");//開始日期
			var F_EdTime   			= form.getFieldValue("F_EdTime");//結束日期
			var F_Reason   			= form.getFieldValue("F_Reason");//臨調原因
			var F_Prove   			= form.getFieldText("F_Prove");//財力證明
			var F_VerifyTime   		= form.getFieldValue("F_VerifyTime");//核身時間
			var F_Remark   			= form.getFieldValue("F_Remark");//備註
			var F_DealTime   			= form.getFieldValue("F_DealTime");//風控人員處理日期
			var F_EndDeal   			= form.getFieldValue("F_EndDeal");//風控人員處理結果
			var FUserId   		= form.getFieldText("FUserId");//處理人員			
		//	var F_CustomerId   		= form.getFieldText("F_CustomerId");//處理人員			
			var F_DepartmentId   		= form.getFieldText("F_DepartmentId");//處理部門
			
			var args = {
				F_Identify 		: F_Identify , 
				F_CardKind   	: F_CardKind,
				F_SystemTime 	: F_SystemTime,
				F_HomePhone	 	: F_HomePhone,
				F_CompanyPhone 	: F_CompanyPhone,
				F_MobilePhone 	: F_MobilePhone,
				F_UserName 	: F_UserName,
				F_CardNumber 		: F_CardNumber,
				F_Branch 		: F_Branch,
				F_Iscallback 	: F_Iscallback,
				F_CallbackTime 	: F_CallbackTime,
				F_LastDollers 	: F_LastDollers,
				F_HighDollers 	: F_HighDollers,
				F_StartTime 	: F_StartTime,
				F_EdTime 		: F_EdTime,
				F_Reason 		: F_Reason,
				F_Prove 		: F_Prove,
				F_VerifyTime 	: F_VerifyTime,
				F_Remark 		: F_Remark,
				F_DealTime      :F_DealTime,
				F_EndDeal       :F_EndDeal,
				FUserId         :FUserId,
			//	F_CustomerId 	: F_CustomerId,
				F_DepartmentId 	: F_DepartmentId
			};
			Utility.openDialog("TBB.m12116A.Report.page",args);
		},
		doSave : function(){
		  var ret = m12116A.setF_HighDollers();
		  if(ret)
            EntityForm.doSave();
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
EntityForm.doSubmit = function()
{
	var F_UserName = form.getFieldValue("F_UserName");
	var F_CardNumber=form.getFieldValue("F_CardNumber");
	var F_Branch=form.getFieldValue("F_Branch");
	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	{
		Jui.message.alert("正卡姓名，正卡卡號，往來分行不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}
	
};


