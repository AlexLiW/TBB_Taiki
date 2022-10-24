var UCreditLoss = {
		doLoad : function()
		{
			UCreditLoss.doIsNew();
			UCreditLoss.setOnChange();
			UCreditLoss.getStatus();
			UCreditLoss.setRequire();
			UCreditLoss.setLossInfo();//是否补卡
			UCreditLoss.setWhetherCardReplace();
			UCreditLoss.setRequire1();
			UCreditLoss.setRequire2();
			UCreditLoss.doFireOnchange();
			if(clientData.entityId){
				var U_SupplyCard= clientData.editJson.data.U_SupplyCard;
				if(U_SupplyCard=="7"){
					form.setFieldVisible("U_SupplyCardOther",true);//其他(是否補卡)
					form.setFieldRequired("U_SupplyCardOther",true);//20170217 add by chainsea\alex.liwu
				}
				console.log(U_SupplyCard);
				form.setFieldValue("U_SupplyCard",U_SupplyCard);
				var U_LossInform= clientData.editJson.data.U_LossInform;
				console.log(U_LossInform);
				if(U_LossInform==null){
				U_LossInform="";
				}
				var arr=U_LossInform.split(",");
				console.log(arr);
				form.getControl("U_LossInform").setValues(arr);
				if(U_LossInform.indexOf("12") >= 0){
					form.setFieldVisible("U_LossInformOther",true);
					form.setFieldRequired("U_LossInformOther",true); //20170217 add by chainsea\alex.liwu
				}
				
			 }	
			 if (clientData.entityId != null ) {
				UCreditLoss.addServiceTrack();
			}
			
			
		},
		doFireOnchange : function()
		   {
			   
				var fieldNames = ['U_Notifiers', 'U_CardSort', 'U_SupplyCard', 'U_LossInform'];//監控哪些欄位發生變化
				for(var i = 0; i < fieldNames.length; i++){
					var fieldName = fieldNames[i];
					console.log(fieldName);
					if(form.hasControl(fieldName)){
						form.getControl(fieldName).fireEvent('onchange');
				    }
				}
			  
			},
		
		setOnChange : function()
		{	
			//form.getControl("U_Notifiers").onchange=UCreditLoss.setRequire;			
			form.getControl("U_CallBackStaff1").onchange=UCreditLoss.setRequire;
			form.getControl("U_IfSend").onchange=UCreditLoss.setRequire;
			form.getControl("U_LocationOccur").onchange=UCreditLoss.setRequire;
			form.getControl("U_LossReason").onchange=UCreditLoss.setRequire;			
			form.getControl("U_Remark").onchange=UCreditLoss.setRequire;			
			form.getControl("U_Notifiers").onchange = UCreditLoss.setControl; // 通報人
			form.getControl("U_CardSort").onchange = UCreditLoss.setControl;//卡别
			form.getControl("U_SupplyCard").onchange = UCreditLoss.setLossInfo;//是否补卡
			form.getControl("U_LossInform").onchange=UCreditLoss.setRequire1;//挂失告知
						
		},
	//控制是否补卡，和挂失告知
		setControl : function()
		{
			UCreditLoss.setWhetherCardReplace();//是否补卡
			UCreditLoss.setLossInfo();
		},
   //新建狀態頁面
		doIsNew : function()
		{
			form.setFieldRequired("U_PrimaryCredit",true);
			form.setFieldDisabled("U_CustID",false);//身份證字號
			form.setFieldDisabled("U_SendBranche",true);
			form.setFieldDisabled("U_SendBrancheName",true);
			var fid=form.getFieldValue("FId");
			form.setFieldVisible("U_SendPhone",false);
			if(fid==null){
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
				form.setFieldVisible("U_CallBackOther1",false);//其他1
				form.setFieldVisible("U_LossInformOther",false);//其他(掛失告知)
				form.setFieldVisible("U_LossReasonOther",false);//其他(掛失原因)
				form.setFieldVisible("U_RemarkOther",false);//其他(備註)
				form.setFieldVisible("U_SupplyCardOther",false);//其他(是否補卡)
				form.setFieldVisible("U_Foreign",false); //國外

				//開啟時/回撥時間/、/回撥人員/為唯讀 20170217 add by chainsea\alex.liwu		
				form.setFieldDisabled("U_CallBackDate1",true); //回撥時間
				form.setFieldDisabled("U_CallBackStaff1",true);//回撥人員
			}
		},
//客戶身分證號
		/* getContactInfo : function()
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
		}, */

//是否补卡
		setWhetherCardReplace : function(){
			var Notifiers=form.getFieldValue("U_Notifiers");
			var CardSort=form.getFieldValue("U_CardSort");
			var SupplyCard=form.getFieldValue("U_SupplyCard");			
			var items= form.getControl("U_SupplyCard").getItems();
			var item= form.getControl("U_LossInform").getItems();
			console.log(items);
			

			if((Notifiers==0 || Notifiers==2)&& CardSort==0)//通报人 0,2 卡别 0 是否补卡 0,2,7 , 20170224 add by chainsea\alex.liwu
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "2" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==3)//通报人 0,2 卡别 3 是否补卡 0,2,3,4,7 , 20170224 adjust by chainsea\alex.liwu
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==4)//通报人 0,2 卡别 4 是否补卡 1,2,3,4,7
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if((Notifiers==0 || Notifiers==2)&& (CardSort==1 || CardSort==2))//通报人 0,2 卡别 1,2 是否补卡 5,6,7
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "5" || items[i].value== "6" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if(Notifiers==1 && (CardSort==3 || CardSort==4)) //通报人 1 卡别 3,4 是否补卡 2,3,4,7
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if(Notifiers==1 && (CardSort==1 || CardSort==2)) //通报人 1 卡别 1,2 是否补卡 6,7
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "6" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}				
			}
			else if (Notifiers==1 && CardSort==0 )	//通报人 1 卡别 0 是否补卡 2,7
			{
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "7"){
							items[i].disabled=false;			
					}
					else{
						items[i].disabled=true;
					}					
				}	
			}
			else
			{
				for(var i=0;i<items.length;i++){
					items[i].disabled=false;		
				}
			}		
			form.getControl("U_SupplyCard").loadItems(items);
			var U_Notifiers = form.getFieldValue("U_Notifiers");
			if(U_Notifiers == 1) // 委託人
			{
				form.setFieldRequired("U_PrincipalName", true);
				form.setFieldRequired("U_PrincipalRelation", true);
				form.setFieldRequired("U_PrincipalPhone", true);
			}
			else // 本人
			{
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
			}
			
		},
	//控制掛失告知
		 setLossInfo : function()
		{
			form.setFieldVisible("U_LossInformOther",false);
			var Notifiers=form.getFieldValue("U_Notifiers"); //通报人
			var CardSort=form.getFieldValue("U_CardSort");  //卡别
			var SupplyCard=form.getFieldValue("U_SupplyCard");  //是否补卡
			var items=form.getControl("U_LossInform").getItems();;
			if((Notifiers==0 || Notifiers==2)&& (CardSort==0||CardSort==3)&&SupplyCard==0)//通报人 0,2 卡别 0,3 是否补卡0  //1&3
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "12"){
						items[i].disabled=false;
						//items[i].readOnly=true;
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","5"]);	
			}
			else if((Notifiers==0 || Notifiers==2)&& (CardSort==0||CardSort==3)&&(SupplyCard==2 || SupplyCard==3 || SupplyCard==4))//通报人 0,2 卡别 0,3 是否补卡2,3,4   //2&4
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "8" ||  items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","5","8"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==4 && SupplyCard==1)//通报人 0,2 卡别 4 是否补卡1  //5
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "6" || items[i].value== "7" ||  items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","6","7"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==4 && (SupplyCard==2 || SupplyCard==3 || SupplyCard==4))//通报人 0,2 卡别 4 是否补卡2,3,4  //6
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "6" || items[i].value== "7" || items[i].value== "8" ||  items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","6","7","8"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==1 && SupplyCard==5)//通报人 0,2 卡别 1 是否补卡5  //7
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "9" || items[i].value== "10" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","5","9","10"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==1 && SupplyCard==6)//通报人 0,2 卡别 1 是否补卡6  //8
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "9" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","5","9"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==2 && SupplyCard==5)//通报人 0,2 卡别 2 是否补卡5  //9
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "6" || items[i].value== "7" || items[i].value== "10" || items[i].value== "11" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","6","7","10","11"]);			
			}
			else if((Notifiers==0 || Notifiers==2)&& CardSort==2 && SupplyCard==6)//通报人 0,2 卡别 2 是否补卡6  //10
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "0" || items[i].value== "1" || items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "6" || items[i].value== "7" || items[i].value== "11" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["0","1","3","4","6","7","11"]);			
			}
			else if(Notifiers==1 && CardSort==3 && (SupplyCard==2 || SupplyCard==3 || SupplyCard==4))//通报人1 卡别 3 是否补卡2,3,4  //11
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "8" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["3","4","5","8"]);			
			}
			else if(Notifiers==1 && CardSort==4 && (SupplyCard==2 || SupplyCard==3 || SupplyCard==4))//通报人1 卡别 4 是否补卡2,3,4  //12
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "6" || items[i].value== "7" || items[i].value== "8" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["3","4","6","7","8"]);			
			}
			else if(Notifiers==1 && CardSort==1 && SupplyCard==6)//通报人1 卡别 1 是否补卡6  //13
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "9" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["3","4","5","9"]);			
			}
			else if(Notifiers==1 && CardSort==2 && SupplyCard==6)//通报人1 卡别 2 是否补卡6  //14
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "6" || items[i].value== "7" || items[i].value== "11" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["3","4","6","7","11"]);			
			}
			else if(Notifiers==1 && CardSort==0 && SupplyCard==2)//通报人1 卡别 0 是否补卡2  //15
			{				
				for(var i=0;i<items.length;i++){
					if(items[i].value== "2" || items[i].value== "3" || items[i].value== "4" || items[i].value== "5" || items[i].value== "8" || items[i].value== "12"){
						items[i].disabled=false;					
					}else{
						items[i].disabled=true;
					}					
				}
				form.getControl("U_LossInform").loadItems(items);	
				form.getControl("U_LossInform").setValues(["3","4","5","8"]);			
			}
			else if(SupplyCard==7){    //是否补卡7
				for(var i=0;i<items.length;i++){
					
						items[i].disabled=false;									
				}
				form.getControl("U_LossInform").loadItems(items);	
			}
			if(SupplyCard==7){//其他(是否補卡)
				form.setFieldVisible("U_SupplyCardOther",true);
				form.setFieldRequired("U_SupplyCardOther",true);//20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_SupplyCardOther",false);
			}
		},  
		/***************/
		setRequire : function()
		{			
			var U_CallBackStaff1 = form.getFieldValue("U_CallBackStaff1"); //回撥人員1
			var U_IfSend = form.getFieldValue("U_IfSend"); //是否发送简讯
			if(U_CallBackStaff1==1){//其他
				form.setFieldVisible("U_CallBackOther1",true);
			}
			else if(U_CallBackStaff1==0){
				form.setFieldVisible("U_CallBackOther1",false);				
			}
			else{
				form.setFieldVisible("U_CallBackOther1",false);
				
			}
			if(U_IfSend==0){//是否发送简讯
				form.setFieldVisible("U_SendPhone",true);

				if(form.getFieldValue("U_SendPhone") == "" || form.getFieldValue("U_SendPhone") == null){
				    form.setFieldValue("U_SendPhone",form.getFieldValue("U_Mobile"));
				}
			}
			else{
				form.setFieldVisible("U_SendPhone",false);
				
			}			
			
			var U_LocationOccur = form.getFieldValue("U_LocationOccur");//發生地點
			if(U_LocationOccur==1){//國外
				form.setFieldVisible("U_Foreign",true);
			}else{
				form.setFieldVisible("U_Foreign",false);
			}
			
			
			var U_LossReason = form.getFieldValue("U_LossReason");//掛失原因
			if(U_LossReason==4){//其他(掛失原因)
				form.setFieldVisible("U_LossReasonOther",true);
				form.setFieldRequired("U_LossReasonOther", true); //20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_LossReasonOther",false);
			}
			var U_Remark = form.getFieldValue("U_Remark");//備註
			console.log("備註："+U_Remark);
			if(U_Remark==2){//其他(備註)
				form.setFieldVisible("U_RemarkOther",true);
				form.setFieldDisabled("U_SendBranche",true);
				form.setFieldDisabled("U_SendBrancheName",true);
				form.setFieldRequired("U_RemarkOther",true);
				form.setFieldRequired("U_SendBranche",false);
				form.setFieldRequired("U_SendBrancheName",false);
			}else if(U_Remark==1){//分行
				form.setFieldVisible("U_RemarkOther",false);
				form.setFieldDisabled("U_SendBranche",false);
				form.setFieldDisabled("U_SendBrancheName",false);
				form.setFieldRequired("U_RemarkOther",false);
				form.setFieldRequired("U_SendBranche",true);
				form.setFieldRequired("U_SendBrancheName",true);
			}else if(U_Remark==0){//郵寄
				form.setFieldVisible("U_RemarkOther",false);
				form.setFieldDisabled("U_SendBranche",true);
				form.setFieldDisabled("U_SendBrancheName",true);
				form.setFieldRequired("U_RemarkOther",false);
				form.setFieldRequired("U_SendBranche",false);
				form.setFieldRequired("U_SendBrancheName",false);
			}
			else{
				form.setFieldVisible("U_RemarkOther",false);
				form.setFieldDisabled("U_SendBranche",true);
				form.setFieldDisabled("U_SendBrancheName",true);
				form.setFieldRequired("U_RemarkOther",false);
				form.setFieldRequired("U_SendBranche",false);
				form.setFieldRequired("U_SendBrancheName",false);
			}
		},
		//挂失告知
		setRequire1 : function(){
			var U_LossInform=form.getFieldValue("U_LossInform");
			if(U_LossInform==null){
				U_LossInform="";
			}
			if(U_LossInform.indexOf("12") >= 0){
				form.setFieldVisible("U_LossInformOther",true);
				form.setFieldRequired("U_LossInformOther",true); //20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_LossInformOther",false);
			}		
		},
		setRequire2 : function(){
			var SupplyCard=form.getFieldValue("U_SupplyCard");  //是否补卡
			if(SupplyCard==7){//其他(是否補卡)
				form.setFieldVisible("U_SupplyCardOther",true);
				form.setFieldRequired("U_SupplyCardOther",true); //20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_SupplyCardOther",false);
			}		
		},
		//带入客户资料
		doCreditLossQuery : function(trNo){
			if(UCustID.doCheck()){	
				if(form.getFieldValue("U_CardKind")==null)
				{
					Jui.message.alert("請選擇卡種");
					return ;
				}
				var args = {form:form.getData()};
				args.form.F_TrNo = trNo;
				args.form.F_CardKind = form.getFieldValue("U_CardKind")+"               ";
				args.form.U_PageCode ="S009";
				//console.log(args.form);
				if(form.getFieldValue("U_CustID").length==8){
					args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}
				Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					//console.log(json);
					form.updateData(json);
				});		

				Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
					console.log(json);
					 var Info = json.F_Info.length-1;
					 
						form.setFieldValue("U_ErrorCode",json.F_Info[Info].F_MSGCOD);
						form.setFieldValue("U_PageStatus",json.F_Info[Info].F_MSGCOD);
												
						var PageNum = json.F_Info.length;
											   
						form.setFieldValue("U_PageNum",PageNum);
						if(json.F_Info[Info].F_MSGCOD=="OKLR"){
							console.log(JSON.stringify(json.F_Info[Info]));
							
							var unitCode = clientData.unitCode;
							var title = document.title;
							var args = {
								json : json,
								unitCode : unitCode,
								title : title
							};
							console.log(json);
							console.log(json.F_Info[Info]);
							for(var i=0;i<json.F_Informa.length;i++){
								console.log(json.F_Informa[i]);
							}			
	
						//if卡號資料只有一筆
						if(json.F_Informa.length==1){
							form.setFieldValue("U_PrimaryCreditName",json.F_Informa[0].F_AppendName);
							form.setFieldValue("U_PrimaryCredit",json.F_Informa[0].F_CreditCardNo);						
							form.setFieldValue("U_Mobile",json.F_Info[0].F_Mobile);
							form.setFieldValue("U_Telnumber",json.F_Info[0].F_Tel1);
							form.setFieldValue("U_Branches",json.F_Info[0].F_branch);
						}
					  //卡號資料有多筆
						else{				    	
							//彈出多筆卡號資料清單
							Utility.openDialog("TBB.CreditLossInfo.page",args,true,function(ret){
								for(var i=0;i<ret.length;i++){
									if(ret.length==1){
											form.setFieldValue("U_PrimaryCreditName",ret[i].F_AppendName);
											form.setFieldValue("U_PrimaryCredit",ret[i].F_CreditCardNo);
											form.setFieldValue("U_Mobile",ret[i].F_Mobile);
											form.setFieldValue("U_Telnumber",ret[i].F_Tel1);
											form.setFieldValue("U_Branches",ret[i].F_branch);	
									}
									else
									{
										if(i==0){
											form.setFieldValue("U_PrimaryCreditName",ret[i].F_AppendName);
											form.setFieldValue("U_PrimaryCredit",ret[i].F_CreditCardNo);
											form.setFieldValue("U_Mobile",ret[i].F_Mobile);
											form.setFieldValue("U_Telnumber",ret[i].F_Tel1);
											form.setFieldValue("U_Branches",ret[i].F_branch);	
										}
										else if(i==1){
											form.setFieldValue("U_SecondaryCreditName",ret[i].F_AppendName);
											form.setFieldValue("U_SecondaryCredit",ret[i].F_CreditCardNo);
											form.setFieldValue("U_Mobile",ret[i].F_Mobile);
											form.setFieldValue("U_Telnumber",ret[i].F_Tel1);
											form.setFieldValue("U_Branches",ret[i].F_branch);																	
										}
									}
								}
							});	
						}
					}
					var U_Result = json.U_ErrorCode;
					var U_ResultExplain =json.U_ErrorMemo;
					form.setFieldValue("U_Result",U_Result);
					form.setFieldValue("U_ResultExplain",U_ResultExplain);														
				});
			}else  {return false;}
		
		}, 
		getStatus : function(){
			var status=form.getFieldValue("FStatus"); 
			if(status=="AgentSign1"){
				toolBar.setItemDisabled("InfoCustData",false);	
				form.setFieldDisabled("U_CustID",true);  //客戶ID/統編					
			}

			//20170303 add by chainsea\alex.liwu_start
			if(status=="Audit"){
				toolBar.setItemDisabled("Save",false);				
			}
			//20170303 add by chainsea\alex.liwu_end
		},
		doOpen : function()
		{
			var U_CustID                	= form.getFieldValue("U_CustID");//身份證號碼統一編碼	
			var U_CardKind              	= form.getFieldValue("U_CardKind");//卡種
			var U_DateTime               	= form.getFieldValue("U_DateTime");//日期時間
			var U_PrimaryCreditName   		= form.getFieldValue("U_PrimaryCreditName");//正卡人姓名
			var U_PrimaryCredit   	        = form.getFieldValue("U_PrimaryCredit");//正卡人卡號
			var U_SecondaryCreditName	  	= form.getFieldValue("U_SecondaryCreditName");//副卡人姓名
			var U_SecondaryCredit  			= form.getFieldValue("U_SecondaryCredit");//附卡卡號
			var U_Mobile			        = form.getFieldValue("U_Mobile");//手机
			var U_Telnumber                 = form.getFieldValue("U_Telnumber");//住家电话
			var U_Branches                  = form.getFieldValue("U_Branches");//往来分行 
			var	U_OtherPhone            	= form.getFieldValue("U_OtherPhone");//其他联络电话
			var U_Result     			    = form.getFieldValue("U_Result");//交易结果
			var U_ResultExplain     		= form.getFieldValue("U_ResultExplain");//交易结果说明
			var U_Cardholder    		    = form.getFieldValue("U_Cardholder");//持卡人
			var U_Notifiers    		        = form.getFieldValue("U_Notifiers");//通报人
			var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
			var U_PrincipalName         	= form.getFieldValue("U_PrincipalName");//姓名
			var U_PrincipalRelation         = form.getFieldValue("U_PrincipalRelation");//关系
			var U_PrincipalPhone         	= form.getFieldValue("U_PrincipalPhone");//电话
			var U_CallBackDate1   	        = form.getFieldValue("U_CallBackDate1");//回拨时间1		
			var U_CallBackStaff1   			= form.getFieldValue("U_CallBackStaff1");//回拨人员1
			var U_LossTime   		        = form.getFieldValue("U_LossTime");//挂失时间
			var U_LocationOccur   	        = form.getFieldValue("U_LocationOccur");//发生地点	
            var U_LossReason     		    = form.getFieldValue("U_LossReason");//挂失原因
			var U_CardSort              	= form.getFieldValue("U_CardSort");//卡别	
			var U_SupplyCard             	= form.getFieldValue("U_SupplyCard");//是否补卡
		//	var U_LossInform                = form.getFieldValue("U_LossInform");//挂失告知
			var U_Remark    	            = form.getFieldValue("U_Remark");//备注
			var U_RemarkOther               = form.getFieldValue("U_RemarkOther");//其他备注
			var U_SendBranche               = form.getFieldText("U_SendBranche");//邮寄分行
			var FUserId                 	= form.getFieldText("FUserId");//处理人员
			var U_Foreign                   = form.getFieldValue("U_Foreign");//國外
			var U_CallBackOther1            = form.getFieldValue("U_CallBackOther1");//其他1
			var U_LossReasonOther           = form.getFieldValue("U_LossReasonOther");//其他(掛失原因)
			var U_SupplyCardOther           = form.getFieldValue("U_SupplyCardOther");//其他(是否補卡)
			var U_IfSend					=form.getFieldValue("U_IfSend");//是否發送簡訊
			var U_SendPhone					=form.getFieldValue("U_SendPhone");//手機
			var U_LossInformOther			=form.getFieldValue("U_LossInformOther");//挂失告知其他
			var U_SendBrancheName			=form.getFieldText("U_SendBrancheName");//郵寄分行名稱
			

			
	
			var args = {
				U_CustID 			  : U_CustID , 
				U_CardKind   	      : U_CardKind,
				U_DateTime 			  : U_DateTime,
				U_PrimaryCreditName   : U_PrimaryCreditName,
				U_PrimaryCredit		  : U_PrimaryCredit,
				U_SecondaryCreditName : U_SecondaryCreditName,
				U_SecondaryCredit	  : U_SecondaryCredit,
				U_Mobile	 		  : U_Mobile,
				U_Telnumber           :U_Telnumber,
				U_Branches 		      : U_Branches,
				U_OtherPhone		  : U_OtherPhone,
				U_Result			  : U_Result,
				U_ResultExplain		  : U_ResultExplain,
				U_Cardholder		  : U_Cardholder,
				U_Notifiers			  : U_Notifiers,
				U_CaseType                : U_CaseType,
				U_PrincipalName		  : U_PrincipalName,
				U_PrincipalRelation	  : U_PrincipalRelation,
				U_PrincipalPhone 	  : U_PrincipalPhone,
				U_CallBackDate1		  :U_CallBackDate1,
				U_CallBackStaff1	  : U_CallBackStaff1,
				U_LossTime			  :U_LossTime,
				U_LocationOccur		  :U_LocationOccur,
				U_LossReason	      :U_LossReason,
				U_CardSort            :U_CardSort,
				U_SupplyCard          :U_SupplyCard,
			//	U_LossInform          :U_LossInform,
				U_Remark              :U_Remark,
				U_RemarkOther         :U_RemarkOther,
				U_SendBranche         :U_SendBranche,
				FUserId          	  :FUserId,
				U_Foreign             :U_Foreign,
				U_CallBackOther1      :U_CallBackOther1,
				U_LossReasonOther     :U_LossReasonOther,
				U_SupplyCardOther     :U_SupplyCardOther,
				U_IfSend			  :U_IfSend,
				U_SendPhone			  :U_SendPhone,
				U_LossInformOther	  :U_LossInformOther,
				U_SendBrancheName	  :U_SendBrancheName
			}
			Utility.openDialog("TBB.UCreditLoss.Report.page",args);
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