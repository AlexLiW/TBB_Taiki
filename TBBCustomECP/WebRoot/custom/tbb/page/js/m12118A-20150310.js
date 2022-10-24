var m12118A ={
		doLoad : function()
		{
			m12118A.doIsNew();
			m12118A.setOnchange();
			m12118A.setF_WTime();
		},
		
		doOpenAgreeDialog: function(event)
		{
			var Applycondition		= form.getFieldValue("F_Applycondition");
			var Remark				= form.getFieldValue("F_Remark");
			if(Applycondition==null||Remark==null){
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
			 statu = CommonBusiness.getFieldValue("TBB.m12118A",FId,"FStatus");
			 }
			return statu;
		},

		//申請狀態
		setF_ApplyconditionEnable : function()
		{
			m12118A.setFStatus();
			if(statu=="Audit"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_Applycondition",false);
						form.setFieldDisabled("F_Remark",false);
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
			form.setFieldDisabled("F_Address",true);
			//toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				//toolBar.getItem("Print").setVisible(false);
				m12118A.setChangTypeRequire();
			}else{
				m12118A.setChangTypeRequire();
				m12118A.setF_AccomplishdateRequire();
				m12118A.setF_ApplyconditionEnable();
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12118A.changeFStatus();
			}
			m12118A.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12118A.setFStatus();
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
			m12118A.setFStatus();
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
					m12118A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12118A.setFStatus();
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
			var F_WTime   	    = form.getFieldValue("F_Dtime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_Dtime",ret.time);
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
			if(form.getFieldValue("F_Dtime")==null){
				form.setFieldValue("F_Dtime",ETime);
			}
		},
		
		setOnchange : function()
		{
			form.getControl("F_Getway").onchange			=	m12118A.setChangTypeRequire;
			form.getControl("F_Applycondition").onchange	=	m12118A.setF_AccomplishdateRequire;
		},
			
		//設置列卡完成日期
		setF_AccomplishdateRequire : function()
		{
			var F_Applycondition = form.getFieldValue("F_Applycondition");
			if(F_Applycondition==2){
				form.setFieldDisabled("F_Accomplishdate",false);
				form.setFieldRequired("F_Accomplishdate",false);
			}else{
				form.setFieldDisabled("F_Accomplishdate",true);
				form.setFieldValue("F_Accomplishdate",null);
			}
		},
				
		setChangTypeRequire : function()
		{
			var way = form.getFieldValue("F_Getway");
			if(way==0){
			    form.setFieldDisabled("F_Address",false);
				form.setFieldDisabled("F_BranchArea",true);
				form.setFieldDisabled("F_Pullbranchname",true);
				form.setFieldValue("F_BranchArea",null);
				form.setFieldValue("F_Pullbranchname",null);
			}else if(way==1){
				form.setFieldDisabled("F_Address",true);
				form.setFieldDisabled("F_BranchArea",false);
				form.setFieldDisabled("F_Pullbranchname",false);
				form.setFieldValue("F_Address",null);
			}else if(way==2){
				form.setFieldDisabled("F_Address",true);
				form.setFieldDisabled("F_BranchArea",true);
				form.setFieldDisabled("F_Pullbranchname",true);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("F_BranchArea",null);
				form.setFieldValue("F_Pullbranchname",null);
			}
		},
		
};

