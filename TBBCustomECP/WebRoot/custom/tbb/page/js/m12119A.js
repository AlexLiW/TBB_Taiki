﻿var m12119A ={
		doLoad : function()
		{
			m12119A.doIsNew();
			m12119A.setOnchange();
			m12119A.setF_WTime();	
			m12119A.getStatus();
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12119A.getInfo();
			if (clientData.entityId != null ) {
				m12119A.addServiceTrack();
			}
		},
		
		getInfo : function(){
			var args = clientData.urlArgs;
			console.log(args.hasOwnProperty("U_CustID"));
		
			if(args.hasOwnProperty("U_CustID")){
				form.setFieldValue("F_Identify",args.U_CustID); // 客戶身分證號
			}
		},
		doOpenAgreeDialog: function(event)
		{
			var Result		= form.getFieldValue("F_Result");
			console.log(Result);
			if(Result==null){
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
			 statu = CommonBusiness.getFieldValue("TBB.m12119A",FId,"FStatus");
			 }
			return statu;
		},
		//處理結果
		setF_ApplyconditionEnable : function()
		{
			m12119A.setFStatus();
			if(statu=="Audit3"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_Result",false);
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
			form.setFieldVisible("F_Application",false);
			form.setFieldVisible("F_StageType",false);
			form.setFieldVisible("F_JYDate",false);//交易日期
			form.setFieldVisible("F_AuthorizationCode",false);
			form.setFieldVisible("F_Periods",false);
			form.setFieldVisible("F_TotalMoney",false);
			form.setFieldVisible("F_Money",false);
			form.setFieldVisible("F_ReckonDate",false);
			form.setFieldVisible("F_Ever",false);
			form.setFieldVisible("F_Unallocated",false);
			form.setFieldVisible("F_StageType2",false);
			form.setFieldVisible("F_StageType3",false);
			form.setFieldVisible("F_CaseStage",false);


//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);
			}else{
				m12119A.setF_ApplyInstallVisible();
			//	m12119A.setF_EverRequire();
				m12119A.setF_StageType2Require();
				m12119A.setF_MoneyRequire();
				m12119A.setF_ApplyconditionEnable();
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12119A.changeFStatus();
			}
			m12119A.setSatisfyEnable();
			
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12119A.setFStatus();
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
			m12119A.setFStatus();
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
					m12119A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12119A.setFStatus();
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
		// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_EstimatedTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_EstimatedTime",ret.time);
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
			if(form.getFieldValue("F_EstimatedTime")==null){
				form.setFieldValue("F_EstimatedTime",ETime);
			}
		},
		setF_Unallocated :function()
		{
		  
			var F_Unallocated=form.getFieldValue("F_Unallocated");
			var F_TotalMoney=form.getFieldValue("F_TotalMoney");
			var  isValid;
			if(F_Unallocated<0){
				Jui.message.alert("尚未攤還之分期本金必须大于0");
			    isValid= false;
		        }else{
					if(F_TotalMoney!=null && F_TotalMoney<1){   //1090410-修改3000->1
						Jui.message.alert("分期總金額大於1才可以保存");  //1090410-修改3000->1
						isValid= false;
					}else{
						isValid= true;
					}
				}	
	        return isValid;
		},	

		
		setOnchange : function()
		{
			form.getControl("F_ApplyInstall").onchange              = m12119A.setF_ApplyInstallVisible;
			form.getControl("F_Ever").onchange						= m12119A.setF_ApplyInstallVisible;
			form.getControl("F_StageType2").onchange				= m12119A.setF_StageType2Require1;
			form.getControl("F_StageType").onchange					= m12119A.setF_ApplyInstallVisible;
			form.getControl("F_Money").onchange						= m12119A.setF_MoneyRequire;
		},
		
		//申請分期,
		setF_ApplyInstallVisible : function(){
			var F_ApplyInstall = form.getFieldValue("F_ApplyInstall");
			if(F_ApplyInstall==1){
				form.setFieldVisible("F_Ever",false);
				form.setFieldVisible("F_Application",false);
				form.setFieldVisible("F_StageType",false);
				form.setFieldVisible("F_StageType2",false);
				form.setFieldVisible("F_Periods",false);
				form.setFieldVisible("F_Money",false);
				form.setFieldVisible("F_CaseStage",false);
				form.setFieldVisible("F_JYDate",false);
				form.setFieldVisible("F_AuthorizationCode",false);
				form.setFieldVisible("F_TotalMoney",false);
				form.setFieldVisible("F_ReckonDate",false);
				form.setFieldVisible("F_Unallocated",true);
				form.setFieldRequired("F_Unallocated",false);
				form.setFieldRequired("F_Reason",true);
				form.setFieldVisible("F_StageType3",true);
				form.getControl("F_Ever").setValue(null);
				form.getControl("F_StageType2").setValue(null);
				form.getControl("F_TotalMoney").setValue(null);
				form.getControl("F_Periods").setValue(null);
				//form.getControl("F_JYDate").setValue(null);
				//form.getControl("F_AuthorizationCode").setValue(null);
				form.getControl("F_Money").setValue(null);
				form.getControl("F_ReckonDate").setValue(null);
				

			}else if(F_ApplyInstall==0){

				form.setFieldVisible("F_StageType2",true);
				form.setFieldVisible("F_Ever",true);
				form.setFieldVisible("F_Periods",true);
				form.setFieldVisible("F_TotalMoney",true);
				form.setFieldRequired("F_Periods",true);
				form.setFieldRequired("F_TotalMoney",true);
				form.setFieldVisible("F_StageType3",false);	
				form.setFieldVisible("F_JYDate",false);
				form.setFieldVisible("F_AuthorizationCode",false);
				form.setFieldVisible("F_ReckonDate",false); 
				form.setFieldVisible("F_CaseStage",false);
				form.setFieldDisabled("F_Periods",false);
				form.setFieldDisabled("F_TotalMoney",false);
				form.setFieldDisabled("F_StageType2",false);
				form.setFieldRequired("F_Reason",false);


				var Cypher = form.getFieldValue("F_Ever");
				if(Cypher==1){
					form.setFieldVisible("F_Application",true);
					form.setFieldVisible("F_StageType",true);
					var StageType = form.getFieldValue("F_StageType");
					if(StageType==0){	
						form.setFieldVisible("F_CaseStage",false);
						form.setFieldDisabled("F_StageType2",true);
						form.setFieldValue("F_StageType2",null);
						form.setFieldVisible("F_Money",false);
						form.setFieldValue("F_Money",null);
						form.setFieldVisible("F_JYDate",false);
						form.setFieldValue("F_JYDate",null);
						form.setFieldVisible("F_AuthorizationCode",false);
						form.setFieldValue("F_AuthorizationCode",null);
						form.setFieldVisible("F_ReckonDate",false); 
						form.setFieldValue("F_ReckonDate",null);
						form.setFieldDisabled("F_Periods",true);
						form.setFieldValue("F_Periods",null);
						form.setFieldDisabled("F_TotalMoney",true);
						form.setFieldValue("F_TotalMoney",null);

					}
					form.setFieldRequired("F_Application",true);	
				}else{
					form.setFieldVisible("F_CaseStage",false);
					form.setFieldDisabled("F_StageType2",false);
					form.setFieldVisible("F_Application",false);
					form.setFieldVisible("F_StageType",false);
					form.setFieldRequired("F_Application",false);
					form.getControl("F_StageType").setValue(null);
					form.getControl("F_Application").setValue(null);
					
				}

				form.setFieldVisible("F_Unallocated",false);
				//form.setFieldRequired("F_Reason",false);
				form.getControl("F_Unallocated").setValue(null);
				//form.getControl("F_Reason").setValue(null);
				
			}else if(F_ApplyInstall==2){
				form.setFieldVisible("F_StageType2",false);
				form.setFieldVisible("F_Ever",true);
				form.setFieldVisible("F_Periods",true);
				form.setFieldVisible("F_TotalMoney",true);
				form.setFieldRequired("F_Periods",true);
				form.setFieldRequired("F_TotalMoney",true);	
				form.setFieldVisible("F_StageType3",false);
				form.setFieldVisible("F_Unallocated",false);
				form.setFieldVisible("F_JYDate",true);
				form.setFieldVisible("F_CaseStage",false);
				form.setFieldVisible("F_AuthorizationCode",true);
				form.setFieldVisible("F_ReckonDate",true);
				form.setFieldVisible("F_Money",false);
				form.setFieldDisabled("F_Periods",false);
				form.setFieldDisabled("F_TotalMoney",false);
				form.setFieldRequired("F_Reason",true);
				var Cypher = form.getFieldValue("F_Ever");
				if(Cypher==1){
					form.setFieldVisible("F_Application",true);
					form.setFieldVisible("F_StageType",true);
					var StageType = form.getFieldValue("F_StageType");
					if(StageType==0){
						form.setFieldDisabled("F_StageType2",true);
						form.setFieldValue("F_StageType2",null);
						form.setFieldVisible("F_Money",false);
						form.setFieldValue("F_Money",null);
						form.setFieldVisible("F_JYDate",false);
						form.setFieldValue("F_JYDate",null);
						form.setFieldVisible("F_AuthorizationCode",false);
						form.setFieldValue("F_AuthorizationCode",null);
						form.setFieldVisible("F_ReckonDate",false); 
						form.setFieldValue("F_ReckonDate",null);
						form.setFieldDisabled("F_Periods",true);
						form.setFieldValue("F_Periods",null);
						form.setFieldDisabled("F_TotalMoney",true);
						form.setFieldValue("F_TotalMoney",null);
						form.setFieldVisible("F_CaseStage",false);
						
					}
					form.setFieldRequired("F_Application",true);					
				}else{
					form.setFieldDisabled("F_StageType2",false);
					form.setFieldVisible("F_Application",false);
					form.setFieldVisible("F_StageType",false);
					form.setFieldRequired("F_Application",false);
					form.setFieldVisible("F_CaseStage",false);
					form.getControl("F_StageType").setValue(null);
					form.getControl("F_Application").setValue(null);
				}
				form.getControl("F_Unallocated").setValue(null);
				//form.getControl("F_Reason").setValue(null);
			}else if(F_ApplyInstall==3){
				form.setFieldVisible("F_StageType2",false);
				form.setFieldVisible("F_Ever",true);
				form.setFieldVisible("F_Periods",true);
				form.setFieldVisible("F_TotalMoney",true);
				form.setFieldRequired("F_Periods",true);
				form.setFieldRequired("F_TotalMoney",true);
				form.setFieldVisible("F_StageType3",false);	
				form.setFieldVisible("F_Unallocated",false);
				form.setFieldVisible("F_JYDate",true);
				form.setFieldVisible("F_AuthorizationCode",true);
				form.setFieldVisible("F_ReckonDate",true);
				form.setFieldVisible("F_CaseStage",false);
				form.setFieldRequired("F_Reason",false);
				form.setFieldVisible("F_CaseStage",false);
				form.setFieldVisible("F_Money",false);
				form.setFieldDisabled("F_Periods",false);
				form.setFieldDisabled("F_TotalMoney",false);
				//form.setFieldValue("F_Ever",1);
				var Cypher = form.getFieldValue("F_Ever");
				if(Cypher==1){
					form.setFieldVisible("F_Application",true);
					form.setFieldVisible("F_StageType",true);
					form.setFieldValue("F_Application",0);
					var StageType = form.getFieldValue("F_StageType");					
					if(StageType==0){
						form.setFieldDisabled("F_StageType2",true);
						form.setFieldValue("F_StageType2",null);
						form.setFieldVisible("F_Money",false);
						form.setFieldValue("F_Money",null);
						form.setFieldVisible("F_JYDate",false);
						form.setFieldValue("F_JYDate",null);
						form.setFieldVisible("F_AuthorizationCode",false);
						form.setFieldValue("F_AuthorizationCode",null);
						form.setFieldVisible("F_ReckonDate",false); 
						form.setFieldValue("F_ReckonDate",null);
						form.setFieldDisabled("F_Periods",true);
						form.setFieldValue("F_Periods",null);
						form.setFieldDisabled("F_TotalMoney",true);
						form.setFieldValue("F_TotalMoney",null);
					}
					form.setFieldRequired("F_Application",true);
				}else{
					form.setFieldDisabled("F_StageType2",false);
					form.setFieldVisible("F_Application",false);
					form.setFieldVisible("F_StageType",false);
					form.setFieldVisible("F_Money",false);
					form.setFieldVisible("F_CaseStage",false);
					form.setFieldRequired("F_Application",false);
					form.getControl("F_StageType").setValue(null);
					form.getControl("F_Application").setValue(null);
				}
				form.getControl("F_Unallocated").setValue(null);
				//form.getControl("F_Reason").setValue(null);
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
							fTableName:"TBBm12119",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
		},
		
		//若選擇//分期分为单笔和账单，則交易日期/授權碼/為必填,
		setF_StageType2Require : function()
		{    
			var Cypher = form.getFieldValue("F_StageType2");
			if(Cypher==0){
				form.setFieldVisible("F_JYDate",true);//交易日期
			    	form.setFieldVisible("F_AuthorizationCode",true);//授權碼
				form.setFieldVisible("F_Money",false);
				form.setFieldVisible("F_ReckonDate",true);
				form.setFieldRequired("F_ReckonDate",true);
				form.setFieldVisible("F_CaseStage",false);
				//form.getControl("F_ReckonDate").setValue(null);
				form.getControl("F_Money").setValue(null);
				form.setFieldRequired("F_JYDate",true);
				form.setFieldRequired("F_AuthorizationCode",true);		
				form.setFieldRequired("F_Reason",true);
				form.setFieldDisabled("F_TotalMoney",false);
				form.setFieldRequired("F_TotalMoney",true);
			}else if(Cypher==1){
				
				form.setFieldVisible("F_Money",true);
				form.setFieldVisible("F_ReckonDate",true);
				form.setFieldRequired("F_ReckonDate",true);
				form.setFieldRequired("F_Reason",true);
				form.setFieldVisible("F_JYDate",false);//交易日期5
				form.setFieldVisible("F_CaseStage",false);
			   	form.setFieldVisible("F_AuthorizationCode",false);
				form.getControl("F_JYDate").setValue(null);
				form.getControl("F_AuthorizationCode").setValue(null);
				form.setFieldRequired("F_Money",true);
				

				form.setFieldDisabled("F_TotalMoney",false);
				form.setFieldRequired("F_TotalMoney",true);

				
			}else if(Cypher==2){//專案分期
				form.setFieldVisible("F_Money",false);5
				form.setFieldVisible("F_ReckonDate",true);
				form.setFieldRequired("F_ReckonDate",true);
				form.setFieldRequired("F_Reason",true);
				form.setFieldVisible("F_CaseStage",true);
				form.setFieldVisible("F_JYDate",true);//交易日期
			    	form.setFieldVisible("F_AuthorizationCode",true);//授權碼
				form.setFieldRequired("F_JYDate",true);
				form.setFieldRequired("F_AuthorizationCode",true);
				form.setFieldRequired("F_Money",true);
				var ApplyInstall = form.getFieldValue("F_ApplyInstall");
				
				form.setFieldDisabled("F_TotalMoney",false);
				form.setFieldRequired("F_TotalMoney",true);
				
				
				
			}else{
				form.setFieldRequired("F_Reason",false);
			}
				//form.setFieldRequired("F_Reason",true);
		},
		
		setF_StageType2Require1 : function()
		{    m12119A.setF_StageType2Require();
			form.setFieldDisabled("F_Periods",false);
			form.getControl("F_Periods").setValue(null);
			form.getControl("F_TotalMoney").setValue(null);
		},
	
		//若選是，則分期期數必填；若選否，則分期期數不可填寫
		setF_MoneyRequire : function()
		{
			var Cypher = form.getFieldValue("F_Money");
			if(Cypher==0){
				form.setFieldRequired("F_Periods",true);
				form.setFieldDisabled("F_Periods",false);
			}else if(Cypher==1){
				form.setFieldDisabled("F_Periods",true);
				form.setFieldRequired("F_Periods",false);
				form.getControl("F_Periods").setValue(null);
			}
		},
		
		doOpen : function()
		{
			var F_Identify              		= form.getFieldValue("F_Identify");//身份證字號
			var F_CardKind              		= form.getFieldValue("F_CardKind");//身份證字號
			var F_Date  		    			= form.getFieldValue("F_Date");//日期-時間：
			var F_HomePhone		    			= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   				= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone       			= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   					= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   		    		= form.getFieldValue("F_CardNumber");//正卡人卡號
			var F_Branch    			        = form.getFieldValue("F_Branch");//往來分行
			var U_CaseType                                  = form.getFieldValue("U_CaseType");//案件類型
			var F_ApplyInstall	              	= form.getFieldValue("F_ApplyInstall");//申請來電分期
			var F_Ever	              			= form.getFieldValue("F_Ever");//是否曾經開立信用卡來電分期專案申請書
			var F_Application  	    			= form.getFieldValue("F_Application");//來電分期申請書送件
			var F_StageType		    			= form.getFieldValue("F_StageType");//分期類型
			var F_StageType2	    			= form.getFieldValue("F_StageType2");//分期類型
			var F_StageType3                                = form.getFieldValue("F_StageType3");//分期類型
			var F_CaseStage                                 = form.getFieldValue("F_CaseStage");//分期代碼
			var F_Periods       				= form.getFieldValue("F_Periods");//分期期數：
			var F_Money   		    			= form.getFieldValue("F_Money");//繳足最低應繳金額
			var F_TotalMoney   					= form.getFieldValue("F_TotalMoney");//分期總金額
			var F_ReckonDate        			= form.getFieldValue("F_ReckonDate");//結帳日：
			var F_JYDate         			    = form.getFieldValue("F_JYDate");//交易日期
			var F_AuthorizationCode	 			= form.getFieldValue("F_AuthorizationCode");//授權碼
			var F_Unallocated        			= form.getFieldValue("F_Unallocated");//尚未攤還之分期本金
			var F_Reason   		     			= form.getFieldValue("F_Reason");//問題陳述區(2000字以內）			
			var F_CustomerId   			        = form.getFieldText("FUserId");//處理人員
			var F_DepartmentId                	= form.getFieldText("F_DepartmentId");//處理部門
	
			
			
			var args = {
				F_Identify 		        : F_Identify,
				F_CardKind          :F_CardKind,
				F_Date	            : F_Date,
				F_HomePhone	        : F_HomePhone,
				F_CompanyPhone 	    : F_CompanyPhone,
				F_MobilePhone 	    : F_MobilePhone,
				F_UserName 	    	: F_UserName,
				F_CardNumber 		: F_CardNumber,
				F_Branch    		: F_Branch,
				F_Ever 		        : F_Ever,
				F_Application	    : F_Application ,
				F_StageType	        : F_StageType,
				F_StageType2 	    : F_StageType2,
				F_StageType3 	    : F_StageType3,
				F_CaseStage         : F_CaseStage,
				F_Periods 	        : F_Periods,
				F_Money             : F_Money,
				F_TotalMoney        : F_TotalMoney,
				F_ReckonDate        : F_ReckonDate,
				F_JYDate         	:F_JYDate,
				F_AuthorizationCode : F_AuthorizationCode,
				F_Unallocated       : F_Unallocated,
				F_Reason 	        : F_Reason,
				F_CustomerId  		: F_CustomerId,
				F_DepartmentId 		: F_DepartmentId,
				U_CaseType              : U_CaseType,
				F_ApplyInstall		: F_ApplyInstall,
			};
			Utility.openDialog("TBB.m12119A.Report.page",args);
		},
		doSave : function(){
		  var ret = m12119A.setF_Unallocated();
		  console.log(ret);
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
	var  F_UserName = form.getFieldValue("F_UserName");
	var  F_CardNumber = form.getFieldValue("F_CardNumber");
	var  F_Branch = form.getFieldValue("F_Branch");	
	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	{
		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}
	
};


