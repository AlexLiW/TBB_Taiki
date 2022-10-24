
	var m1211CA ={
		doLoad : function()
		{
			m1211CA.doIsNew();
			m1211CA.setOnchange();
			m1211CA.setF_WTime();	
			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m1211CA.getInfo();
			m1211CA.getStatus();
			if (clientData.entityId != null ) {
				m1211CA.addServiceTrack();
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
			var ss=form.getFieldValue("F_Status");
			if(ss=='1'){
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
							fTableName:"TBBm1211C",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});							
					EntityForm._closeOrReload();
				});
			}else
				Jui.message.alert("送件狀態選擇”已送件“後才可繼續下一流程");
		},
		
		setFStatus :function(){
			var FId   = form.getFieldValue("FId");
			if(FId==null){
				statu="New";
			}else{
			 statu = CommonBusiness.getFieldValue("TBB.m1211CA",FId,"FStatus");
			 }
			return statu;
		},
		//判断表单是否为新建的情况
		doIsNew : function()
		{
			//form.setFieldDisabled("F_Status",true);
//			form.setFieldDisabled("F_Address",true);
//			form.setFieldDisabled("F_Mail",true);
//			form.setFieldDisabled("F_Fax",true);
		//	form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
			 form.setFieldDisabled("F_Address",true);
//			toolBar.getItem("unClose").setDisabled(true);
			 arrayDisabled =[];
			if(!(Jui.string.isEmpty(clientData.entityId))){
				//toolBar.getItem("Print").setVisible(false);'
				m1211CA.setF_Status();
				m1211CA.setF_DeliveryRequire();
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
					console.log(clientData.editJson.title[i].name+" == "+arrayDisabled[i]);
				}
				
				m1211CA.changeFStatus();
			}
			m1211CA.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m1211CA.setFStatus();
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
			m1211CA.setFStatus();
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
					m1211CA.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m1211CA.setFStatus();
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
			form.getControl("F_Delivery").onchange=m1211CA.setF_DeliveryRequire;
		},
		
		setF_DeliveryRequire : function(){
		     var Cypher = form.getFieldValue("F_Delivery");
			//寄送方式
			form.setFieldDisabled("F_Address",true);
			form.setFieldDisabled("F_Mail",true);
			form.setFieldDisabled("F_Fax",true);
			form.setFieldDisabled("F_Other",true);
			form.setFieldDisabled("U_AddressUnOfficial",true);
			if(Cypher==0){
			    form.setFieldDisabled("F_Fax",false);
//				form.setFieldRequired("F_Fax",true);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("F_Mail",null);
				form.setFieldValue("U_AddressUnOfficial",null);
				form.setFieldValue("F_Other",null);
			}else if(Cypher==1){
				form.setFieldDisabled("F_Address",false);
				var FId  = form.getFieldValue("FId");
				
				if(FId==null){
				    form.setFieldValue("F_Address",TBBUtil.address); // hsin 20210715 地址不被清除
					var args = clientData.urlArgs;
					if(args.hasOwnProperty("U_CreditAddress")){
						form.setFieldValue("F_Address",args.U_CreditAddress); // 账单地址
					}					
				}				
//				form.setFieldRequired("F_Address",true);
				form.setFieldValue("F_Fax",null);
				form.setFieldValue("F_Mail",null);
				form.setFieldValue("U_AddressUnOfficial",null);
				form.setFieldValue("F_Other",null);
			}else if(Cypher==2){
			    form.setFieldDisabled("F_Mail",false);
//				form.setFieldRequired("F_Mail",true);
				form.setFieldValue("F_Fax",null);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("U_AddressUnOfficial",null);
				form.setFieldValue("F_Other",null);
			}
			else if(Cypher==3){
				form.setFieldDisabled("F_Other",false);
//				form.setFieldRequired("F_Mail",true);
				form.setFieldValue("F_Fax",null);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("F_Mail",null);
				form.setFieldValue("U_AddressUnOfficial",null);
			}else if(Cypher==4){
				form.setFieldDisabled("U_AddressUnOfficial",false);
//				form.setFieldRequired("F_Mail",true);
				form.setFieldValue("F_Fax",null);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("F_Mail",null);
				form.setFieldValue("F_Other",null);
			}
			else{
				form.setFieldValue("F_Fax",null);
				form.setFieldValue("F_Address",null);
				form.setFieldValue("F_Mail",null);
				form.setFieldValue("F_Other",null);
				form.setFieldValue("U_AddressUnOfficial",null);				
			}
			//20210621 新增連動 hsin
			 m1211CAForm.doChange();
		},
		// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_FinishTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
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
			for(var i=0,j=2;i<2,j>0;i++){
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
		//送件狀態
		setF_Status : function()
		{
			m1211CA.setFStatus();
			if(statu=="Audit"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_Status",false);
						break;
					}else{
						toolBar.setItemDisabled("Save",true);
					}
				}
				
			}
		},
		
		doOpen : function()
		{
			Utility.openDialog("TBB.m1211AA.Report.page",args);
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
/*
var ss=form.getFieldValue("F_Status");
if(ss=='1')
EntityForm.doConfirm();
else
Jui.message.alert("送件狀態選擇”已送件“後才可繼續下一流程");
*/