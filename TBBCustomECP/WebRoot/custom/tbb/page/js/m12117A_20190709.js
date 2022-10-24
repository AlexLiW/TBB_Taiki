var m12117A ={
		doLoad : function()
		{
			m12117A.doIsNew();
			m12117A.setOnchange();
			m12117A.setF_WTime();
			m12117A.setF_Lixi();
			m12117A.getStatus();			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12117A.getInfo();
			var F_YearDerateNo=form.getFieldValue("F_YearDerateNo");
			if(F_YearDerateNo==2)
			{
				form.setFieldVisible("U_AnnulTimes",true);
			}
			else
			{
				form.setFieldVisible("U_AnnulTimes",false);
			}
			if (clientData.entityId != null ) {
				m12117A.addServiceTrack();
			}
		},
		
		getInfo : function(){
			var args = clientData.urlArgs;
			console.log(args.hasOwnProperty("U_CustID"));
		
			if(args.hasOwnProperty("U_CustID")){
				form.setFieldValue("F_Identify",args.U_CustID); // 客戶身分證號
			}
		},
		setFStatus :function(){
			var FId   = form.getFieldValue("FId");
			if(FId==null){
				statu="New";
			}else{
			 statu = CommonBusiness.getFieldValue("TBB.m12117A",FId,"FStatus");
			 }
			return statu;
		},
		
		//判断表单是否为新建的情况
		doIsNew : function()
		{
			//form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);
			}else{
				m12117A.setChangTypeRequire();
				m12117A.setF_RemarkRequire();				
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12117A.changeFStatus();
			}
			m12117A.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12117A.setFStatus();
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
			m12117A.setFStatus();
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
					m12117A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12117A.setFStatus();
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
			var F_WTime   	    = form.getFieldValue("F_EndTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_EndTime",ret.time);
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
			for(var i=0,j=10;i<10,j>0;i++){
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
			if(form.getFieldValue("F_EndTime")==null){
				form.setFieldValue("F_EndTime",ETime);
			}
		},
		//備註
		setF_RemarkRequire : function(){
			var F_DerateReason = form.getFieldValue("F_DerateReason");
			if(F_DerateReason==1){
				form.setFieldRequired("F_Remark",true);
			}else{
				form.setFieldRequired("F_Remark",false);
			//	form.setFieldValue("F_Remark",null);
			}

		},
		
		setF_Lixi  : function()
		{
		  
		   var F_Lixi=form.getFieldValue("F_Lixi");
		   var F_Wyuej=form.getFieldValue("F_Wyuej");
	         var isValid;
			  if(F_Lixi<0 &&  F_Wyuej<0){
			        Jui.message.alert("利息調減金額和違約金調減金額必须大于0");
			        isValid= false;
		        }
		        else if(F_Lixi<0){
			        Jui.message.alert("利息調減金額必须大于0");
			        isValid= false;
		        }
				 else  if(F_Wyuej<0){
			        Jui.message.alert("違約金調減金額必须大于0");
			        isValid= false;
		        }
				 
				else{
			        isValid= true;
		        }
	    return isValid;
},	
		
		setOnchange : function()
		{
			form.getControl("F_DerateReason").onchange=m12117A.setF_RemarkRequire;
			form.getControl("F_ChangType").onchange=m12117A.setChangTypeRequire;
			form.getControl("F_YearDerateNo").onchange=m12117A.setChangTypeRequire;			
		},
				
		setChangTypeRequire : function()
		{
			var way = form.getFieldValue("F_ChangType");
			if(way==0){
				form.setFieldRequired("F_Wyuej",true);
				form.setFieldRequired("F_Lixi",false);
				form.setFieldValue("F_Lixi",null);
			}else if(way=="1"){
				form.setFieldRequired("F_Lixi",true);
				form.setFieldRequired("F_Wyuej",false);
				form.setFieldValue("F_Wyuej",null);
			}else if(way=="0,1"){
				form.setFieldRequired("F_Wyuej",true);
				form.setFieldRequired("F_Lixi",true);
			}else{
				form.setFieldRequired("F_Wyuej",false);
				form.setFieldRequired("F_Lixi",false);
				form.setFieldValue("F_Wyuej",null);
				form.setFieldValue("F_Lixi",null);
			}
			var F_YearDerateNo=form.getFieldValue("F_YearDerateNo");
			if(F_YearDerateNo==2)
			{
				form.setFieldVisible("U_AnnulTimes",true);
			}
			else
			{
				form.setFieldVisible("U_AnnulTimes",false);
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
							fTableName:"TBBm12117",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
		},
		doOpen : function()
		{
			var F_Identify       		= form.getFieldValue("F_Identify");//身份證字號/統一編號	
			var F_CardKind     			= form.getFieldValue("F_CardKind");//卡種
			var F_Time   				= form.getFieldValue("F_Time");//日期時間
			var F_HomePhone				= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   		= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone   		= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   			= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   		    = form.getFieldValue("F_CardNumber");//正卡人卡號
			var F_Branch 		        = form.getFieldValue("F_Branch");//往來分行
			var F_Year					= form.getFieldText("F_Year");//帳單年
			var F_BillMonth   			= form.getFieldValue("F_BillMonth");//帳單月份
			var F_ChangType  	    	= form.getFieldValue("F_ChangType");//減調類型
			var F_Wyuej	    			= form.getFieldValue("F_Wyuej");//違約金調減金額
			var F_Lixi	   				= form.getFieldValue("F_Lixi");//利息調減金額
			var F_YearDerateNo   		= form.getFieldValue("F_YearDerateNo");//年減免次數
			var F_DerateReason   		= form.getFieldValue("F_DerateReason");//調減原因
			var F_Remark   				= form.getFieldValue("F_Remark");//備註
			var F_CustomerId  			= form.getFieldText("FUserId");//處理人員			
			var F_DepartmentId  	    = form.getFieldText("F_DepartmentId");//處理部門
			var U_AnnulTimes			=form.getFieldValue("U_AnnulTimes");//減免次數
			
			var args = {
				F_Identify				: F_Identify, 
				F_CardKind   			: F_CardKind,
				F_Time 					: F_Time,
				F_HomePhone	 			: F_HomePhone,
				F_CompanyPhone 			: F_CompanyPhone,
				F_MobilePhone 			: F_MobilePhone,
				F_UserName 				: F_UserName,
				F_CardNumber 			: F_CardNumber,
				F_Branch 				: F_Branch,
				F_Year					: F_Year,
				F_BillMonth 			: F_BillMonth,
				F_ChangType 			: F_ChangType,
				F_Wyuej		            : F_Wyuej,
				F_Lixi		            : F_Lixi,
				F_YearDerateNo 			: F_YearDerateNo,
				F_DerateReason 			: F_DerateReason,
				F_Remark 				: F_Remark,
				F_CustomerId 			: F_CustomerId,
				F_DepartmentId 			: F_DepartmentId,
				U_AnnulTimes			:U_AnnulTimes
			};
			console.log(args);
			Utility.openDialog("TBB.m12117A.Report.page",args);
		},
		doSave : function(){
		  var ret = m12117A.setF_Lixi();
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
//	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	if(F_UserName == null)
	{
//		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
		Jui.message.alert("正卡人姓名不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}
};

