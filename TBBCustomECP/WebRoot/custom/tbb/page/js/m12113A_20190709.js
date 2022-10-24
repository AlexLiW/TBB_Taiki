var m12113A ={
		doLoad : function ()
		{
			m12113A.doIsNew();
			m12113A.setOnchange();
			m12113A.setF_WTime();		
			m12113A.setF_StatusDisable();
		    m12113A.getStatus();
				
			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12113A.getInfo();
		   	if (clientData.entityId != null ) {
				m12113A.addServiceTrack();
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
			var ss=form.getFieldValue("F_Result");
			if(ss==''){
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
                var arg={
							fTableName:"TBBm12113",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
			}
				
		},
		
		setFStatus :function(){
			var FId   = form.getFieldValue("FId");
			if(FId==null){
				statu="New";
			}else{
				statu = CommonBusiness.getFieldValue("TBB.m12113A",FId,"FStatus");
			}
			return statu;
		},
		//判断表单是否为新建的情况
		doIsNew : function()
		{
			form.setFieldDisabled("F_TelegramTime",true);
			form.setFieldDisabled("F_Address",true);
			//form.setFieldDisabled("F_DateTime",true);
			toolBar.getItem("Deal").setVisible(false);
			//form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);
			}
			else{
			    m12113A.setIsBackPhoneRequire();
				m12113A.setDefenseProjectRequire();
				m12113A.setF_StatusDisable();
				m12113A.setF_TranCompnyRequire();
				m12113A.setF_Result();
				for(var i=0;i<clientData.editJson.title.length;i++){					
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12113A.changeFStatus();
			}
			m12113A.setSatisfyEnable();
		},
		
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12113A.setFStatus();
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
			m12113A.setFStatus();
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
					m12113A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12113A.setFStatus();
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
			form.getControl("F_IsBackPhone").onchange=m12113A.setIsBackPhoneRequire;
			form.getControl("F_DefenseProject").onchange=m12113A.setDefenseProjectRequire;
			form.getControl("F_Status").onchange=m12113A.setF_StatusDisable1;
			form.getControl("F_TranCompny").onchange=m12113A.setF_TranCompnyRequire;
		},
	
	// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_CompleteTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_CompleteTime",ret.time);
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
			if(form.getFieldValue("F_CompleteTime")==null){
				form.setFieldValue("F_CompleteTime",ETime);
			}
		},
		
		setIsBackPhoneRequire : function()
		{
			form.setFieldDisabled("F_TelegramTime",true);
			var way = form.getFieldValue("F_IsBackPhone");
			if(way==0){
				form.setFieldDisabled("F_TelegramTime",false);
				form.setFieldRequired("F_TelegramTime",true);
			}else{
				form.setFieldValue("F_TelegramTime",null);
			}
		},
		
		setDefenseProjectRequire : function()
		{	
			
			var way =form.getFieldValue("F_DefenseProject");
			if(way==6){
				form.setFieldDisabled("F_Otherta",false);
			}else{
				form.setFieldDisabled("F_Otherta",true);
			}
		},
		
		setF_StatusDisable : function()
		{	
			m12113A.setFStatus();
			var Status =form.getFieldValue("F_Status");
			if(statu=='New'){
				//form.setFieldValue("U_PageStatus",null);
			
				if(Status==0){
					//form.setFieldValue("U_PageCode",'S009');
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",false);
					form.setFieldRequired("F_CardKind",true);
					form.setFieldRequired("F_Identify",true);
				}else if(Status==1){
					//form.setFieldValue("U_PageCode",'S105');
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",true);
					form.setFieldRequired("F_Identify",true);
					form.setFieldValue("F_CardKind",null);
				}else if(Status==2){
					//form.setFieldValue("U_PageCode",null);
					form.setFieldValue("F_CardKind",null);
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",true); //20170217 adjust by chainsea\alex.liwu
					form.setFieldRequired("F_CardKind",false); //20170217 adjust by chainsea\alex.liwu			
					form.setFieldRequired("F_Identify",false);
				}
			}
			form.setFieldDisabled("F_HomePhone",Status==2?0:1);
			form.setFieldDisabled("F_CompanyPhone",Status==2?0:1);
			form.setFieldDisabled("F_MobilePhone",Status==2?0:1);
			form.setFieldDisabled("F_UserName",Status==2?0:1);
			form.setFieldDisabled("F_CardNumber",Status==2?0:1);
			form.setFieldDisabled("F_Branch",Status==2?0:1);
			form.setFieldDisabled("F_UserName1",Status==2?0:1);
			form.setFieldDisabled("F_CardNumber1",Status==2?0:1);
			form.setFieldDisabled("F_Address",Status==2?0:1);
		},
		
		setF_StatusDisable1 : function()
		{
			m12113A.setF_StatusDisable();
			form.getControl("F_HomePhone").setValue(null);
			form.getControl("F_CompanyPhone").setValue(null);
			form.getControl("F_MobilePhone").setValue(null);
			form.getControl("F_UserName").setValue(null);
			form.getControl("F_CardNumber").setValue(null);
			form.getControl("F_Branch").setValue(null);
			form.getControl("F_UserName1").setValue(null);
			form.getControl("F_CardNumber1").setValue(null);
			form.getControl("F_Address").setValue(null);
		},
		//轉介單位為分行時，分行區域和名稱必填
		setF_TranCompnyRequire : function(){
			var F_TranCompny = form.getFieldValue("F_TranCompny");
			if(F_TranCompny==0){
				form.setFieldDisabled("F_BankArea",false);
				form.setFieldDisabled("F_BankName",false);
				form.setFieldRequired("F_BankArea",true);
				form.setFieldRequired("F_BankName",true);
			}else{
				form.setFieldDisabled("F_BankArea",true);
				form.setFieldDisabled("F_BankName",true);
				form.getControl("F_BankArea").setValue(null);
				form.getControl("F_BankName").setValue(null);
			}
		},
		
		setF_Result :function(){
			m12113A.setFStatus();
			if(statu=="Audit"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_Result",false);
						form.setFieldDisabled("F_CompleteTime",false);
						
						break;
					}else{
						toolBar.setItemDisabled("Save",true);
					}
				}
				
			}
		},
		
		doOpen : function()
		{ 
		    
		    var F_Name       		= form.getFieldValue("F_Name");//联络人姓名
			var F_Identify       	= form.getFieldValue("F_Identify");//身份證字號			
			var F_DateTime   		= form.getFieldValue("F_DateTime");//日期時間
			var F_Status   			= form.getFieldValue("F_Status");//客戶身份
			var F_CardKind     		= form.getFieldValue("F_CardKind");//卡種
			var F_HomePhone			= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   	= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone   			= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   	= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   	= form.getFieldValue("F_CardNumber");//正卡卡號
			var F_Branch  		    = form.getFieldValue("F_Branch");//往來分行
			var F_UserName1   	= form.getFieldValue("F_UserName1");//附卡人姓名
			var F_CardNumber1   		= form.getFieldValue("F_CardNumber1");//附卡卡號			
			var F_IsBackPhone   	= form.getFieldValue("F_IsBackPhone");//是否回電給客戶
			var F_TelegramTime   	= form.getFieldValue("F_TelegramTime");//限期回電時間
			var F_DefenseProject   	= form.getFieldValue("F_DefenseProject");//申辦項目F_Otherta
			var F_PeoblemExpression = form.getFieldValue("F_PeoblemExpression");//問題陳述區
			var F_TranCompny   		= form.getFieldText("F_TranCompny");//轉介單位
			var F_BankArea  		= form.getFieldText("F_BankArea");//分行区域
			var F_BankName  		= form.getFieldText("F_BankName");//分行名称
			var F_Result   			= form.getFieldValue("F_Result");//處理結果
			var F_CustomerId = form.getFieldText("FUserId");//客服人員


			
					
			
			
			var args = {
			    F_Name          : F_Name,
				F_Identify 		: F_Identify , 				
				F_DateTime 	    : F_DateTime,
				F_Status		: F_Status,
				F_CardKind   	: F_CardKind,
				F_HomePhone	 	: F_HomePhone,
				F_CompanyPhone 	: F_CompanyPhone,
				F_MobilePhone 	    : F_MobilePhone,
				F_UserName 	: F_UserName,
				F_CardNumber   : F_CardNumber,
				
				F_Branch 	: F_Branch,
				F_UserName1   :F_UserName1,
				F_CardNumber1 	: F_CardNumber1,
				F_IsBackPhone 	: F_IsBackPhone,
				F_TelegramTime : F_TelegramTime,
				F_DefenseProject: F_DefenseProject,
				F_PeoblemExpression 	: F_PeoblemExpression,
				F_TranCompny 	: F_TranCompny,
				F_BankArea     :F_BankArea,
				F_BankName       :F_BankName,
				F_Result        : F_Result,
				F_CustomerId 	: F_CustomerId,

				
				
			};
			Utility.openDialog("TBB.m12113A.Report.page",args);
		},
	getStatus : function()
		{
			var status=form.getFieldValue("FStatus");
			if(status=="AgentSign1")
			{
				form.setFieldDisabled("F_Identify",true);
			}			
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
/*	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	{
		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
	}
	else{
		EntityForm.$doSubmit();
	} */

	// 20170217 adjust by chainsea\alex.liwu_start
	var Cypher =form.getFieldValue("F_Status");
	if(Cypher==0 && F_CardNumber == null){ // 信用卡客戶
	    Jui.message.alert("信用卡客戶的正卡卡號不能为空");
	}else if(Cypher==1 && F_UserName == null){ // 網銀客戶
	    Jui.message.alert("網銀客戶的正卡人姓名不能为空");
	}
	else{
	    EntityForm.$doSubmit();
	}
	// 20170217 adjust by chainsea\alex.liwu_end
	
};

