var m12112A ={
		doLoad : function ()
		{
			m12112A.doIsNew();
			m12112A.setOnchange();
			m12112A.setF_WTime();	
			m12112A.setF_CustomerIdfiyRequire();

			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12112A.getInfo();
			m12112A.getStatus();
			m12112A.setU_UnitOther();
			if (clientData.entityId != null ) {
				m12112A.addServiceTrack();
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
			var Result=form.getFieldValue("F_Result");
			var Rank=form.getFieldValue("F_Rank");
			var Unit=form.getFieldValue("F_Unit");
			if(Unit==''||Result==''||Rank==''){
				Jui.message.alert("客訴中心處理資訊還未填寫并保存");
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
							fTableName:"TBBm12112",
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
				statu = CommonBusiness.getFieldValue("TBB.m12112A",FId,"FStatus");
			 }
			return statu;
		},
		
		setF_Result	: function(){
			m12112A.setFStatus();
			/* java形式
			var userId = CommonBusiness.getCurrentUser().userId;
			if((statu!="New" && statu!="AgentSign1")){
				var args = {
						userId : userId
						
				};
				Utility.invoke("TBB.m12111ADelay.selectRole",args,true,function(ret){
					if(ret.select==0){
						toolBar.setItemDisabled("Save",true);
					}else if(ret.select==1){
						if(statu=="Audit"){
							console.log("aaaaaaaaa");
							form.setFieldDisabled("F_Result",false);
							form.setFieldDisabled("F_Rank",false);
							form.setFieldDisabled("F_Unit",false);
						}
					}
				});
				
			}*/
			
			//js形式
			if(statu=="Audit"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");

				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_Result",false);
						form.setFieldDisabled("F_Rank",false);
						form.setFieldDisabled("F_Unit",false);
						form.setFieldDisabled("F_FinishTime",false);
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
			toolBar.getItem("Deal").setVisible(false);
//			toolBar.getItem("unClose").setDisabled(true);
			m12112A.setF_CustomerIdfiyRequire();
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);
				form.setFieldVisible("U_UnitOther",false);
			}
			else{
			    m12112A.setF_CustomerIdfiyRequire();
				m12112A.setF_Result();	
				for(var i=0;i<clientData.editJson.title.length;i++){					
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12112A.changeFStatus();
			}
			m12112A.setSatisfyEnable();
		},
		
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12112A.setFStatus();
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
			m12112A.setFStatus();
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
					m12112A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12112A.setFStatus();
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
			form.getControl("F_CustomerIdfiy").onchange=m12112A.setF_CustomerIdfiyRequire1;
			form.getControl("F_Unit").onchange=m12112A.setU_UnitOther;
		},
	
	// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_FinishTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//FId	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_FinishTime",ret.time);
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
			for(var i=0,j=5;i<5,j>0;i++){
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
			if(form.getFieldValue("F_FinishTime")==null){
				form.setFieldValue("F_FinishTime",ETime);
			}
		},

			
		setF_CustomerIdfiyRequire : function()
		{
			//若客戶身分選擇「網銀客戶」，則此欄位不需填寫(唯讀)	
			m12112A.setFStatus();
			var Cypher =form.getFieldValue("F_CustomerIdfiy");
			if(statu=='New'){
				//form.getControl("U_PageStatus").setValue(null);
				
				if(Cypher==0){
					//form.setFieldValue("U_PageCode",'S009');
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",false);
					form.setFieldRequired("F_CardKind",true);
					form.setFieldRequired("F_Identify",true);
				}else if(Cypher==1){
					//form.setFieldValue("U_PageCode",'S105');
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",true);
					form.setFieldRequired("F_Identify",true);
					form.setFieldValue("F_CardKind",null);
				}else if(Cypher==2){
					//form.getControl("U_PageCode").setValue(null);
					form.getControl("F_CardKind").setValue(null);
					form.setFieldVisible("F_CardKind",true);	
					form.setFieldDisabled("F_CardKind",true); //20170217 adjust by chainsea\alex.liwu
					form.setFieldRequired("F_CardKind",false); //20170217 adjust by chainsea\alex.liwu
					form.setFieldValue("F_CardKind",null); // add by chainsea\alex.liwu
					form.setFieldRequired("F_Identify",false);
				}
			}

			//20170224 add by chainsea\alex.liwu_start
			if(statu=='Audit'){				
				if(Cypher==1 || Cypher == 2){
					form.setFieldRequired("F_CardKind",false);
				}
			}
			//20170224 add by chainsea\alex.liwu_end
	
			form.setFieldDisabled("F_HomePhone",Cypher==2?0:1);
			form.setFieldDisabled("F_CompanyPhone",Cypher==2?0:1);
			form.setFieldDisabled("F_MobilePhone",Cypher==2?0:1);
			form.setFieldDisabled("F_UserName",Cypher==2?0:1);
			form.setFieldDisabled("F_CardNumber",Cypher==2?0:1);
			form.setFieldDisabled("F_Branch",Cypher==2?0:1);
			form.setFieldDisabled("F_UserName1",Cypher==2?0:1);
			form.setFieldDisabled("F_CardNumber1",Cypher==2?0:1);
			form.setFieldDisabled("F_Address",Cypher==2?0:1);
		},
		
		setF_CustomerIdfiyRequire1 : function()
		{
			m12112A.setF_CustomerIdfiyRequire();
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
			var F_Name       		= form.getFieldValue("F_Name");//聯絡人姓名
			var F_Identify       	= form.getFieldValue("F_Identify");//身份證字號/統一編號	
			var F_DTime   			= form.getFieldValue("F_DTime");//日期時間
			var F_CustomerIdfiy   	= form.getFieldValue("F_CustomerIdfiy");//客戶身分
			var F_CardKind   		= form.getFieldValue("F_CardKind");
			var F_HomePhone			= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   	= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone   	= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   		= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   		= form.getFieldValue("F_CardNumber");//正卡卡號
			var F_Branch 			= form.getFieldValue("F_Branch");//往來分行
			var F_UserName1   		= form.getFieldValue("F_UserName1");//附卡人姓名
			var F_CardNumber1       = form.getFieldValue("F_CardNumber1");//附卡卡號
			var F_Content   		= form.getFieldValue("F_Content");//內容說明
			var F_Rank  	   		= form.getFieldValue("F_Rank");//案件等級
			var F_Unit    			= form.getFieldValue("F_Unit");//權責單位
			var F_SeiRank    		= form.getFieldValue("F_SeiRank");//重要性
			var F_Result		   	= form.getFieldValue("F_Result");//客訴中心處理結果
			var FUserId   		= form.getFieldText("FUserId");//客服人員
			var F_DepartmentId   	= form.getFieldText("F_DepartmentId");//處理部門
			var U_UnitOther   	= form.getFieldValue("U_UnitOther");//其他
			

			var args = {
				F_Name			: F_Name, 
				F_Identify   		: F_Identify,
				F_DTime 		: F_DTime,
				F_CustomerIdfiy :F_CustomerIdfiy,
				F_CardKind         :F_CardKind,
				F_HomePhone	 	: F_HomePhone,
				F_CompanyPhone	 	: F_CompanyPhone,
				F_MobilePhone 	: F_MobilePhone,
				F_UserName 		: F_UserName,
				F_CardNumber 		: F_CardNumber,
				F_Branch 		: F_Branch,
				F_UserName1		: F_UserName1,
				F_CardNumber1		: F_CardNumber1,
				F_Content 		: F_Content,
				F_Rank 			: F_Rank,
				F_Unit 			: F_Unit,
				F_SeiRank       :F_SeiRank,
				F_Result	 	: F_Result,
				FUserId    : FUserId,
				F_DepartmentId   :F_DepartmentId,
				U_UnitOther        :U_UnitOther
			};
			Utility.openDialog("TBB.m12112A.Report.page",args);
		},
		setU_UnitOther : function()
		{
			var F_Unit= form.getFieldValue("F_Unit");
			if(F_Unit!=null && F_Unit.indexOf("14")>=0){
				form.setFieldVisible("U_UnitOther",true);
				form.setFieldRequired("U_UnitOther",true);
			}else{
				form.setFieldVisible("U_UnitOther",false);
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

/*	if(F_UserName == null || F_CardNumber == null || F_Branch == null){
	    	Jui.message.alert("正卡人姓名、正卡卡號、往來分行不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}  */

	// 20170217 adjust by chainsea\alex.liwu_start
	var Cypher =form.getFieldValue("F_CustomerIdfiy");
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
