/********************************************************************************
	 風管科客戶問題單 表單
	 * Author: 
	 * CreateDate: 
	 * LastUpdateUser: chainsea\Yuwen.Wang 
	 * LastUpdateDate: 2021.09.27
	 * Note: 修正第500行、524行處，主要將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除
*********************************************************************************/
var m12114A ={
		doisSave : function(){
			m12114AisSave = 1;
		},
		
		doLoad : function ()
		{

			m12114A.doIsNew();
			m12114A.setOnchange();
			m12114A.setF_WTime();
			m12114A.setRequire();	
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12114A.getInfo();
			m12114A.getStatus();
			m12114A.pageLoad();
			
			if (clientData.entityId != null ) {
				m12114A.addServiceTrack();
			}
		
		},
		
		pageLoad : function(){
			//2021.09.06-gemfor/lillian-問題"風控人員領單後，針對服務資訊不能修改，必填欄位針對處理結果裡的「經辦」必填，另外兩個「風控人員回電時間、風控人員處理結果」先不用必填。"
			let FStatus = form.getFieldValue("FStatus");
			if(FStatus == "Audit2" || FStatus == "AuditRisk2"){
				form.setFieldDisabled("F_Type", true);
				form.setFieldDisabled("F_IsCallback", true);
				form.setFieldDisabled("F_CallbackTime", true);
				form.setFieldDisabled("F_StateProb", true);
				form.setFieldRequired("F_CallbackTruetime", false);
				form.setFieldRequired("F_ResultCode", false);
				
				form.setFieldDisabled("F_Identify", true);
				form.setFieldDisabled("F_CardKind", true);
				form.setFieldDisabled("F_Date", true);
				form.setFieldDisabled("F_UserName", true);
				form.setFieldDisabled("F_CardNumber", true);
				form.setFieldDisabled("F_Branch", true);
				form.setFieldDisabled("U_CaseType", true);
				form.setFieldDisabled("U_ErrorCode", true);
				form.setFieldDisabled("U_ErrorMemo", true);
				form.setFieldDisabled("U_PageCode", true);
				form.setFieldDisabled("U_PageNum", true);
				form.setFieldDisabled("U_PageStatus", true);
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
			//2021-06-21-gemfor/lillian-如果狀態是"Audit2"則點選同意前先檢查是否保存
			var FStatus = form.getFieldValue("FStatus");
			if(FStatus == "Audit2"){
				if (!EntityForm.validate()) {
					return false;
				}
				var data_in_database = CommonBusiness.getEntity("TBB.m12114A", clientData.entityId);
				var data_on_form = EntityForm.getData();
				var ckeck = ["FId", "F_Address", "F_Branch", "F_CardKind", "F_CardNumber", "F_CompanyPhone", 
					"F_DepartmentId", "F_HomePhone", "F_Identify", "F_IsCallback", "F_MobilePhone", "F_ResultCode", 
					"F_StateProb", "F_UserName", "U_Against", "U_CaseType", "U_ErrorCode", "U_ErrorMemo", "U_HandlingNew",
					"U_PageCode", "U_PageStatus"];
				for(i = 0; i < ckeck.length; i++){
					var key = ckeck[i];
					if(data_on_form[key] != data_in_database[key]){
						Jui.message.alert("請先點選保存按鈕！");
						return;
					}
				}
			}
			//原有程式-------------------------------------------------------------
			var CallbackTruetime	= form.getFieldValue("F_CallbackTruetime");
			var ResultCode			= form.getFieldValue("F_ResultCode");
			var F_Phishing          = form.getFieldValue("F_Phishing");
			if(CallbackTruetime==''||ResultCode=='' || F_Phishing==''){
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
					Utility.closeDialog();
					EntityForm.reload(clientData.entityId);
				});
			}
				
		},
		setSerialNo: function(event)
		{
			var U_Against=form.getFieldValue("U_Against");
			var U_Describe=form.getFieldValue("U_Describe");
			if(U_Against==null){
				Jui.message.alert("服務資訊還未填寫并保存");
			}
			else if(U_Against==1 &&U_Describe==null)
			{
				Jui.message.alert("服務資訊還未填寫并保存");
			}
			else{
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
							fTableName:"TBBm12114",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
			}
			
				
		},
		setSerialNo1: function(event)
		{
			var U_Against=form.getFieldValue("U_Against");
			var U_Describe=form.getFieldValue("U_Describe");
			if(U_Against==null){
				Jui.message.alert("服務資訊還未填寫并保存");
			}
			else if(U_Against==1 &&U_Describe==null)
			{
				Jui.message.alert("服務資訊還未填寫并保存");
			}
			else{
				var page= {
	                "dialogWidth": 500,
	                "icon": "quicksilver/image/unit/WorkItem.png",
	                "title": "工作項",
	                "dialogHeight": 226,
	                "code": "Wf.WorkItem.Submit",
	                "dialogMaximized": false
	            };
				var args = {
					entityEventCode		: clientData.toolBarJson.left[2].entityEventCode,
					entityId			: clientData.entityId,
					workItemId			: clientData.workflow.workItemId,
					result				: clientData.toolBarJson.left[2].id,
					resultText			: clientData.toolBarJson.left[2].text,
					noComment			: '',
					isSubmit			: true,
					enableAllFields		: true,
					addConfirmButton	: true
				};
				Utility.openDialog(page.code+".page", args, CommonBusiness.defaultDialogOptions.form, function()
				{
					Jui.message.hint($text("Public.OperationSuccess")); 
					var arg={
							fTableName:"TBBm12114",
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
			 statu = CommonBusiness.getFieldValue("TBB.m12114A",FId,"FStatus");
			 }
			return statu;
			
		},
		
		setStatus	:function(){
			m12114A.setFStatus();
			if(statu=="Audit2"){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				var name_Array = name.split("|");
				console.log(name_Array.length);
				for(var i=0;i<name_Array.length;i++){
					console.log(name_Array[i]);
					if((CommonBusiness.getCurrentUser().userName==name_Array[i]) || (CommonBusiness.getCurrentUser().userId=='00000000-0000-0000-1002-000000000001')){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_CallbackTruetime",false);
						form.setFieldDisabled("F_ResultCode",false);
						form.setFieldRequired("F_CallbackTruetime",true);
						form.setFieldRequired("F_ResultCode",true);
						console.log("kkk"+CommonBusiness.getCurrentUser().userName);
						if(CommonBusiness.getCurrentUser().userName==name_Array[i]){}
						//form.setFieldValue("U_Handling",CommonBusiness.getCurrentUser().userName); //2021.06.02-gemfor/lillian-此為舊欄位，(新)經辦 欄位改為用於指定下一階段處理人
						break;
					}else{
						toolBar.setItemDisabled("Save",true);
					}
				}
				
				//2021.06.21-gemfor/lillian--如案件已領取，且為領取人，則解除"經辦"欄位唯讀
				if(CommonBusiness.getCurrentUser().userName == name){
					form.setFieldDisabled("U_HandlingNew", false, true);
				}
				
			}
			
			//2021.06.21-gemfor/lillian--新增節點 臺企風控人員2 ，保存紐控制。
			//2021.09.16-gemfor/lillian--修正沒有先判斷是已否起工作流
			if(clientData.workflow != undefined && clientData.workflow != null && clientData.workflow != ""){
				var name = clientData.workflow.listJson.data[0].FParticipantName;
				if(statu == "AuditRisk2"){
					if(CommonBusiness.getCurrentUser().userName == name){
						toolBar.setItemDisabled("Save",false);
						form.setFieldDisabled("F_CallbackTruetime",false);
						form.setFieldDisabled("F_ResultCode",false);
						form.setFieldRequired("F_CallbackTruetime",true);
						form.setFieldRequired("F_ResultCode",true);
					}
				}
			}
		},
		//判断表单是否为新建的情况
		doIsNew : function()
		{	
			form.setFieldVisible("U_TypesOther",false);//其他(類型)
			form.setFieldVisible("U_ContentOther",false);//內容(類型)
			form.setFieldDisabled("F_CallbackTime",true);
			//form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);				
			}else{
				m12114A.setF_IsCallbackRequire();
				m12114A.setStatus();
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12114A.changeFStatus();
			}
			m12114A.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12114A.setFStatus();
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
			m12114A.setFStatus();
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
					m12114A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12114A.setFStatus();
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
			form.getControl("F_IsCallback").onchange=m12114A.setF_IsCallbackRequire;
			form.getControl("U_Types").onchange = m12114A.setRequire;  //類型
			form.getControl("U_Content").onchange = m12114A.setRequire;  //內容
			form.getControl("U_Against").onchange = m12114A.setRequire1; 
			
		},
		
		setRequire: function(){
			var U_Types = form.getFieldValue("U_Types");//類型
			var U_Content = form.getFieldValue("U_Content");//內容
			if(U_Types==6){//其他
				form.setFieldVisible("U_TypesOther",true);
			}else{
				form.setFieldVisible("U_TypesOther",false);
			}
			if(U_Content==5){//其他
				form.setFieldVisible("U_ContentOther",true);
			}else{
				form.setFieldVisible("U_ContentOther",false);
			}
			
		},
		setRequire1 :function(){
			var U_Against=form.getFieldValue("U_Against");
			if(U_Against==1){			
				form.setFieldDisabled("U_Describe",false);
				form.setFieldRequired("U_Describe", true);
			}
			else{
				form.setFieldValue("U_Describe",null);
				form.setFieldDisabled("U_Describe",true);
			}
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

	setF_IsCallbackRequire : function()
	{
		var IsCallback = form.getFieldValue("F_IsCallback");
		form.setFieldDisabled("F_CallbackTime",true);
		if(IsCallback==0){
			form.setFieldDisabled("F_CallbackTime",false);
			form.setFieldRequired("F_CallbackTime",true);
		}else{
			form.setFieldValue("F_CallbackTime",null);
		}
	},
	
		
		doOpen : function()
		{
			var F_Identify       	= form.getFieldValue("F_Identify");//身份證字號/统编
			var F_CardKind     		= form.getFieldValue("F_CardKind");//卡種
			var F_Date   		    = form.getFieldValue("F_Date");//時間-时间
			var F_HomePhone      		= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone     	= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone      	= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   	= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   	= form.getFieldValue("F_CardNumber");//正卡卡號
			var F_Branch 			= form.getFieldValue("F_Branch");//往來分行
			var F_IsCallback   		= form.getFieldValue("F_IsCallback");//是否回電給客戶
			var F_CallbackTime   	= form.getFieldValue("F_CallbackTime");//回電期限
			var F_CallbackTruetime  = form.getFieldValue("F_CallbackTruetime");//回電時間
			var F_UserName1   = form.getFieldValue("F_UserName1");//附卡人姓名
			var F_CardNumber1  		= form.getFieldValue("F_CardNumber1");//附卡卡號
			var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
			var F_Type   			= form.getFieldValue("F_Type");//問題類型
			var F_StateProb  		= form.getFieldValue("F_StateProb");//問題陳述區
			var F_ResultCode   		= form.getFieldValue("F_ResultCode");//風控人員處理結果
			var F_CustomerId   		= form.getFieldText("FUserId");//處理人員
			//2021-09-27-Yuwen.Wang-將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除 		
			//var U_Against		=form.getFieldValue("U_Against");
			var U_Describe		=form.getFieldValue("U_Describe");
			
			var args = {
				F_Identify 			: F_Identify , 
				F_CardKind   			: F_CardKind,
				F_CompanyPhone        : F_CompanyPhone,
				F_Date 				: F_Date,
				F_HomePhone	 		: F_HomePhone,
				F_MobilePhone 		: F_MobilePhone,
				F_UserName 		: F_UserName,
				F_CardNumber 		: F_CardNumber,
				F_Branch 			: F_Branch,
				F_IsCallback 		: F_IsCallback,
				F_CallbackTime		: F_CallbackTime,
				F_CallbackTruetime 	: F_CallbackTruetime,
				F_UserName1 	: F_UserName1,
				F_CardNumber1 	 	: F_CardNumber1,
				U_CaseType    		: U_CaseType,
				F_Type 				: F_Type,
				F_StateProb 		: F_StateProb,
				F_ResultCode 		: F_ResultCode,
				F_CustomerId 		: F_CustomerId,
				//2021-09-27-Yuwen.Wang-將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除  
				//U_Against			:U_Against,
				U_Describe			:U_Describe
			};
			Utility.openDialog("TBB.m12114A.Report.page",args);
		},
		
		//2021-07-15-gemfor/lillian-列印頁優化需求
		doOpenNew : function()
		{
			var F_Identify       	= form.getFieldValue("F_Identify");			//身份證字號/统编
			var F_CardKind     		= form.getFieldValue("F_CardKind");			//卡種
			var F_Date   		    = form.getFieldValue("F_Date");				//時間-时间
			var F_HomePhone      	= form.getFieldValue("F_HomePhone");		//住家電話
			var F_CompanyPhone     	= form.getFieldValue("F_CompanyPhone");		//公司電話
			var F_MobilePhone      	= form.getFieldValue("F_MobilePhone");		//手機
			var F_UserName   		= form.getFieldValue("F_UserName");			//正卡人姓名
			var F_CardNumber   		= form.getFieldValue("F_CardNumber");		//正卡卡號
			var F_Branch 			= form.getFieldValue("F_Branch");			//往來分行
			var F_IsCallback   		= form.getFieldValue("F_IsCallback");		//是否回電給客戶
			var F_CallbackTime   	= form.getFieldValue("F_CallbackTime");		//回電期限
			var F_CallbackTruetime  = form.getFieldValue("F_CallbackTruetime");	//回電時間
			var F_UserName1   		= form.getFieldValue("F_UserName1");		//附卡人姓名
			var F_CardNumber1  		= form.getFieldValue("F_CardNumber1");		//附卡卡號
			var U_CaseType          = form.getFieldValue("U_CaseType");			//案件類型
			var F_Type   			= form.getFieldValue("F_Type");				//問題類型
			var F_StateProb  		= form.getFieldValue("F_StateProb");		//問題陳述區
			var F_ResultCode   		= form.getFieldValue("F_ResultCode");		//風控人員處理結果
			var F_CustomerId   		= form.getFieldText("FUserId");				//處理人員		
			var U_Against			= form.getFieldValue("U_Against");
			var U_Describe			= form.getFieldValue("U_Describe");
			
			var args = {
				F_Identify 			: F_Identify, 
				F_CardKind   		: F_CardKind,
				F_CompanyPhone      : F_CompanyPhone,
				F_Date 				: F_Date,
				F_HomePhone	 		: F_HomePhone,
				F_MobilePhone 		: F_MobilePhone,
				F_UserName 			: F_UserName,
				F_CardNumber 		: F_CardNumber,
				F_Branch 			: F_Branch,
				F_IsCallback 		: F_IsCallback,
				F_CallbackTime		: F_CallbackTime,
				F_CallbackTruetime 	: F_CallbackTruetime,
				F_UserName1 		: F_UserName1,
				F_CardNumber1 	 	: F_CardNumber1,
				U_CaseType    		: U_CaseType,
				F_Type 				: F_Type,
				F_StateProb 		: F_StateProb,
				F_ResultCode 		: F_ResultCode,
				F_CustomerId 		: F_CustomerId,
				U_Against			: U_Against,
				U_Describe			: U_Describe
			};
			Utility.openDialog("TBB.m12114A_20210715.Report.page", args);
		},
		
		getStatus : function()
		{
			var status=form.getFieldValue("FStatus");
			var U_Against = form.getFieldValue("U_Against");
			form.setFieldVisible("F_Role",false);

			
			
			if(status=="AgentSign3")
			{
				form.setFieldDisabled("F_Identify",true);
				form.setFieldVisible("F_Role",true);
				/*var args={"entityId":clientData.entityId,"fieldName":["F_Role"]};
				Utility.invoke("TBB.m12114A.GetItem",args,true,function(ret){
					ret.F_Role;

				});*/
				if(form.getFieldValue("F_Role") == '1'){
						var button_result1=document.getElementsByClassName('JuiToolBarLeft')[0].children[2];
						if(button_result1 != undefined ){

									document.getElementsByClassName('JuiToolBarLeft')[0].children[1].style.display='none';

						}

					}
					if (form.getFieldValue("F_Role") == '2' ){

						var button_result2=document.getElementsByClassName('JuiToolBarLeft')[0].children[2];
						 if(!Jui.object.isEmpty(button_result2 )){					
						document.getElementsByClassName('JuiToolBarLeft')[0].children[0].style.display='none';
						}
					}
			}
			if(status!="Audit"){
				form.setFieldDisabled("U_Against",true);
				form.setFieldDisabled("U_Describe",true);
			}
			else if(U_Against==1){
				form.setFieldRequired("U_Describe",true);
			}
			else if(U_Against==0){
				form.setFieldDisabled("U_Describe",true);
			}
			
			if(status=='AgentMgr'){
				document.getElementsByClassName('JuiToolBarLeft')[0].children[2].style.display='none';
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
	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	{
		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
	}
	else{
		EntityForm.$doSubmit();
	}
};

