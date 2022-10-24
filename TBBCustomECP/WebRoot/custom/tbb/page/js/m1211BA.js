
	var m1211BA ={
		doLoad : function()
		{
			m1211BA.doIsNew();
			m1211BA.setF_Day();
			m1211BA.setF_Day1();
			m1211BA.setF_WTime();
			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m1211BA.getInfo();
			m1211BA.getStatus();
			if (clientData.entityId != null ) {
				m1211BA.addServiceTrack();
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
			var ApplicationStatus		= form.getFieldValue("F_ApplicationStatus");
			if(ApplicationStatus==0){
				Jui.message.alert("處理結果需為”已傳真“并保存");
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
							fTableName:"TBBm1211B",
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
			 statu = CommonBusiness.getFieldValue("TBB.m1211BA",FId,"FStatus");
			 }
			return statu;
		},
		//申請狀態
		setF_ApplyStateEnable : function()
		{
			m1211BA.setFStatus();
			console.log(statu);
			if(statu=="Audit"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_ApplicationStatus",false);
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
			m1211BA.setOnchange();
//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(!Jui.string.isEmpty(clientData.entityId)){
				m1211BA.setF_ReservedParking();
				m1211BA.setF_DataChange();
				m1211BA.setF_ApplyStateEnable();			
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m1211BA.changeFStatus();
			}
			m1211BA.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m1211BA.setFStatus();
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
			m1211BA.setFStatus();
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
					m1211BA.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m1211BA.setFStatus();
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
			var F_WTime   	    = form.getFieldValue("F_ExpectedTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_ExpectedTime",ret.time);
				EntityForm.doSave();	
			});
		},
		setOnchange : function()
		{
			form.getControl("F_ReservedParking").onchange = m1211BA.setF_ReservedParking;	
			form.getControl("F_DataChange").onchange = m1211BA.setF_DataChange;
			form.getControl("F_PStartTime").onchange = m1211BA.setF_Day;
			form.getControl("F_PEndTime").onchange = m1211BA.setF_Day;
			form.getControl("F_PStartTime1").onchange = m1211BA.setF_Day1;
			form.getControl("F_PEndTime1").onchange = m1211BA.setF_Day1;	
		},
		
		//预约停车
		setF_ReservedParking :function(){
			var ReservedParking  = form.getFieldValue("F_ReservedParking");
			form.setFieldDisabled("F_DataChange",false);
			if(ReservedParking==1){
				form.setFieldDisabled("F_ReservedNumber",false);
				form.setFieldDisabled("F_PEndTime",false);
				form.setFieldDisabled("F_PStartTime",false);
				form.setFieldDisabled("F_CarNumber",false);
				form.setFieldDisabled("F_Day",false);
			//	form.setFieldDisabled("F_DataChange",false);
			}else{
				form.setFieldDisabled("F_ReservedNumber",true);
				form.setFieldDisabled("F_PEndTime",true);
				form.setFieldDisabled("F_PStartTime",true);
				form.setFieldDisabled("F_CarNumber",true);
				form.setFieldDisabled("F_Day",true);
			//	form.setFieldDisabled("F_DataChange",true);
				
				form.setFieldValue("F_ReservedNumber",null);
				form.setFieldValue("F_PEndTime",null);
				form.setFieldValue("F_PStartTime",null);
				form.setFieldValue("F_CarNumber",null);
				form.setFieldValue("F_Day",null);
			//	form.setFieldValue("F_DataChange",null);
				m1211BA.setF_DataChange();
				
			}
		},
		//预约停车易动
		setF_DataChange : function(){
			var DataChange  = form.getFieldValue("F_DataChange");
			if(DataChange==1){
				form.setFieldDisabled("F_OriginalNumber",false);
				form.setFieldDisabled("F_ReservedNumber1",false);
				form.setFieldDisabled("F_PEndTime1",false);
				form.setFieldDisabled("F_PStartTime1",false);
				form.setFieldDisabled("F_CarNumber1",false);
				form.setFieldDisabled("F_Day1",false);
				form.setFieldDisabled("F_ChangeReason",false);
			}else{
				form.setFieldDisabled("F_OriginalNumber",true);
				form.setFieldDisabled("F_ReservedNumber1",true);
				form.setFieldDisabled("F_PEndTime1",true);
				form.setFieldDisabled("F_PStartTime1",true);
				form.setFieldDisabled("F_CarNumber1",true);
				form.setFieldDisabled("F_Day1",true);
				form.setFieldDisabled("F_ChangeReason",true);
				
				form.setFieldValue("F_OriginalNumber",null);
				form.setFieldValue("F_ReservedNumber1",null);
				form.setFieldValue("F_PEndTime1",null);
				form.setFieldValue("F_PStartTime1",null);
				form.setFieldValue("F_CarNumber1",null);
				form.setFieldValue("F_Day1",null);
				form.setFieldValue("F_ChangeReason",null);
				
			}
		},
		//停車天數聯動
		setF_Day : function()
		{		
			//form.setFieldValue("F_PStartTime",new Date());

			var startTime = form.getFieldValue("F_PStartTime");
			var endTime = form.getFieldValue("F_PEndTime");
			
			if(endTime!=null  && startTime!=null){
				var start 	= new Date(startTime).getTime();
				var end 	= new Date(endTime).getTime();
				if(end < start){
					Jui.message.alert('結束時間小於起始時間，請調整時間範圍');
					return false;
				}else{
					form.setFieldValue('F_Day', ((end - start)/3600000/24+1));
					return true;
				}
				 }else{
				return true;
			}
		},
		//停車天數聯動1
		setF_Day1 : function()
		{		
			//form.setFieldValue("F_PStartTime",new Date());
			var startTime1 = form.getFieldValue("F_PStartTime1");
			var endTime1 = form.getFieldValue("F_PEndTime1");
			if(endTime1!=null && startTime1!=null){
				var start1	= new Date(startTime1).getTime();
				var end1 	= new Date(endTime1).getTime();
				if(end1 < start1){
					Jui.message.alert('結束時間小於起始時間，請調整時間範圍');
					return false;
				}else{
					form.setFieldValue('F_Day1', ((end1 - start1)/3600000/24+1));
					return true;
				}
			}else{
				return true;
			}	
			
			
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
			if(form.getFieldValue("F_ExpectedTime")==null){
				form.setFieldValue("F_ExpectedTime",ETime);
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
EntityForm.validate = function()
{   
	return EntityForm.$validate() && m1211BA.setF_Day() && m1211BA.setF_Day1();
	
};
EntityForm.doSubmit = function()
{
	var F_AppendName = form.getFieldValue("F_AppendName");
	var F_CreditCardNo=form.getFieldValue("F_CreditCardNo");
	if(F_AppendName == null || F_CreditCardNo == null)
	{
		Jui.message.alert("持卡人姓名，持卡人卡號不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}
	
};