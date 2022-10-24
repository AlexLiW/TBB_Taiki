
var UDebitLoss = {
		doLoad : function()
		{
			UDebitLoss.doIsNew();
			UDebitLoss.setOnChange();
		//	UDebitLoss.getContactInfo();
			UDebitLoss.getDebitCardLossDisabled();
			UDebitLoss.getStatus();
			if (clientData.entityId != null ) {
				UDebitLoss.addServiceTrack();
			}
			
			//20180927      防呆設置   susie
			UDebitLoss.setRequire();
			UDebitLoss.setRequire1();
			UDebitLoss.setRequire2();
			UDebitLoss.checkDebitCardLoss();
		},
		doIsNew : function() // 若表單為新建
		{			
			var fid=form.getFieldValue("FId");
			if(fid==null){
				toolBar.setItemDisabled("DebitCardLoss",true);
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
				
				form.setFieldVisible("U_CallBackOther1",false);//其他1
				form.setFieldVisible("U_CallBackOther2",false);//其他2
				
				//開啟時/回撥時間1/、/回撥人員1/、/回撥時間2/、/回撥人員2/為唯讀
				
				form.setFieldDisabled("U_CallBackTime1",true); //回撥時間1
				form.setFieldDisabled("U_CallBackStaff1",true);//回撥人員1
				form.setFieldDisabled("U_CallBackTime2",true);//回撥時間1
				form.setFieldDisabled("U_CallBackStaff2",true);//回撥人員2
				form.setFieldDisabled("U_CallBackTime1",true); //回撥時間1
				
				//身分證字號、客戶姓名、手機、住家，可供Agent輸入
			//	form.setFieldDisabled("U_CustName",false);//客戶姓名
				form.setFieldDisabled("U_CustID",false);//身分證字號
			//	form.setFieldDisabled("U_CustMobile",false);//手機
			//form.setFieldDisabled("U_CustAddress",false); //住家
			}
			else{
				UDebitLoss.setRequire();
				UDebitLoss.setRequire4();
				UDebitLoss.checkDebitCardLoss();
				
			}
			
		},
		checkDebitCardLoss:function()
		{
			var U_AccountNumberSystem=form.getFieldValue("U_AccountNumberSystem");
			var U_DebitCardTerminal=form.getFieldValue("U_DebitCardTerminal");
			var U_LossKind=form.getFieldValue("U_LossKind");
			var U_LossWay=form.getFieldValue("U_LossWay");
			if(U_AccountNumberSystem=='請選擇帳號' ||  U_DebitCardTerminal==null ||  U_LossKind==null ||  U_LossWay==null)
				toolBar.setItemDisabled("DebitCardLoss",true);
			else
				toolBar.setItemDisabled("DebitCardLoss",false);

			if(U_DebitCardTerminal == 6)
			{
				
				form.setFieldRequired("U_leisureDate",true);
				form.setFieldRequired("U_DebitCardDate",false);
			}else if(U_DebitCardTerminal == 4){
				form.setFieldRequired("U_DebitCardDate",true);
				form.setFieldRequired("U_leisureDate",true);
			}else {
				form.setFieldRequired("U_leisureDate",false);

			}

		},
		setOnChange : function()
		{
			form.getControl("U_Notifiers").onchange = UDebitLoss.setRequire; // 通報人狀態
			form.getControl("U_CallBackStaff1").onchange = UDebitLoss.setRequire;//回撥人員1
			form.getControl("U_CallBackStaff2").onchange = UDebitLoss.setRequire;//回撥人員2
			//form.getControl("U_DebitCardTerminal").onchange = UDebitLoss.setRequire1;//金融卡端
			
			//20170213 Add by chainsea\alex.liwu_start
			form.getControl("U_BankBookSeal").onchange = UDebitLoss.setRequire2; //存摺本/印鑑章
			//20170213 Add by chainsea\alex.liwu_end
			
			//20180927      防呆設置   susie
			//form.getControl("U_LossWay").onchange = UDebitLoss.setRequire; //掛失方式

			//20180927      防呆設置   susie
			Jui.event.attach(form.getControl("U_DebitCardTerminal"),'onchange',function(){
				UDebitLoss.checkDebitCardLoss();
				UDebitLoss.setRequire1();
			});
			Jui.event.attach(form.getControl("U_LossWay"),'onchange',function(){
				UDebitLoss.checkDebitCardLoss();
				UDebitLoss.setRequire();
			});
			//form.getControl("U_DebitCardTerminal").onchange = UDebitLoss.checkDebitCardLoss;//金融卡端
			form.getControl("U_LossKind").onchange = UDebitLoss.checkDebitCardLoss;//掛失種類
			//form.getControl("U_AccountNumberSystem").onchange = UDebitLoss.checkDebitCardLoss;//帳號
			Jui.event.attach(form.getControl("U_AccountNumberSystem"),'onchange',function(){
				UDebitLoss.checkDebitCardLoss();
				EntityForm.$doSave();
			});
			//form.getControl("U_LossWay").onchange = UDebitLoss.checkDebitCardLoss;//掛失方式
		},
		setRequire : function()
		{
			var U_Notifiers = form.getFieldValue("U_Notifiers");
			if(U_Notifiers== 0) // 本人
			{
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
				form.setFieldValue("U_PhoneInform",0+","+1+","+3);
				

			}
			else if(U_Notifiers== 1) // 委託人
			{
				form.setFieldRequired("U_PrincipalName", true);
				form.setFieldRequired("U_PrincipalRelation", true);
				form.setFieldRequired("U_PrincipalPhone", true);
				form.setFieldValue("U_PhoneInform","");
				
				
			}
			else
			{
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
				form.setFieldValue("U_PhoneInform","");
				
			}
			
			var U_CallBackStaff1 = form.getFieldValue("U_CallBackStaff1");
			var U_CallBackStaff2 = form.getFieldValue("U_CallBackStaff2");
			if(U_CallBackStaff1==1){
				form.setFieldVisible("U_CallBackOther1",true);
				form.setFieldRequired("U_CallBackOther1", true); //20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_CallBackOther1",false);
			}
			
			if(U_CallBackStaff2==1){
				form.setFieldVisible("U_CallBackOther2",true);
				form.setFieldRequired("U_CallBackOther2", true); //20170217 add by chainsea\alex.liwu
			}else{
				form.setFieldVisible("U_CallBackOther2",false);
			}
			
			//20180927      防呆設置   susie
			var U_LossWay = form.getFieldValue("U_LossWay");
			if(U_LossWay=='1')
			{				
				form.setFieldDisabled('U_DebitCardDate',false);
				form.setFieldVisible('U_Remind1',true);
			}
			else 
			{
				form.setFieldDisabled('U_DebitCardDate',true);
				form.setFieldVisible('U_Remind1',false);
			}

			



		},
		doOpen : function()
		{
			var U_CustName              = form.getFieldValue("U_CustName");//客户姓名
			var U_CustID              	= form.getFieldValue("U_CustID");//客戶ID/統編
			var U_AccountNumberSystem   = form.getFieldText("U_AccountNumberSystem");//帳號	
			var U_CustMobile   		    = form.getFieldValue("U_CustMobile");//手機
			var U_TelNum   		    = form.getFieldValue("U_TelNum");//住家电话
			var U_CustAddress   		= form.getFieldValue("U_CustAddress");//住家
			var U_OtherPhone   	        = form.getFieldValue("U_OtherPhone");//其他联络电话
			var U_Attn	  	            = form.getFieldValue("U_Attn");//经办人
			var U_Notifiers  			= form.getFieldValue("U_Notifiers");//通报人
			var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
			var U_PrincipalName		    = form.getFieldValue("U_PrincipalName");//姓名
			var U_PrincipalRelation     = form.getFieldValue("U_PrincipalRelation");//关系
			var U_PrincipalPhone        = form.getFieldValue("U_PrincipalPhone");//电话 
			var	U_Result            	= form.getFieldValue("U_Result");//交易结果
			var U_ResultExplain         = form.getFieldValue("U_ResultExplain");//交易结果说明
			var U_DebitCardTerminal     = form.getFieldValue("U_DebitCardTerminal");//金融卡端
			var U_DebitCardDate         = form.getFieldValue("U_DebitCardDate");//金融卡端時間
			var U_leisureDate     = form.getFieldValue("U_leisureDate");//悠遊卡掛失時間
			var U_PhoneInform    		= form.getFieldValue("U_PhoneInform");//电话告知
			var U_LossKind         	    = form.getFieldValue("U_LossKind");//挂失种类
			var U_BankBookSeal          = form.getFieldValue("U_BankBookSeal");//存摺本/印鑑
			var U_SealDate         	    = form.getFieldValue("U_SealDate");//印鉴章
			var U_BankBookDate   	    = form.getFieldValue("U_BankBookDate");//存折
			var U_CallBackTime1   		= form.getFieldValue("U_CallBackTime1");//回拨时间1			
			var U_CallBackStaff1   		= form.getFieldValue("U_CallBackStaff1");//回拨人员1
			var U_CallBackTime2   		= form.getFieldValue("U_CallBackTime2");//回拨时间2
			var U_CallBackStaff2   	    = form.getFieldValue("U_CallBackStaff2");//回拨人员2
			var U_Remark   		        = form.getFieldValue("U_Remark");//备注
			var FUserId   	        	= form.getFieldText("FUserId");//处理人员	
			var U_CallBackOther1        = form.getFieldValue("U_CallBackOther1");//其他1
			var U_CallBackOther2        = form.getFieldValue("U_CallBackOther2");//其他2
			
			var args = {
				U_CustName 			  : U_CustName , 
				U_CustID   	          : U_CustID,
				U_AccountNumberSystem : U_AccountNumberSystem,
				U_CustMobile          : U_CustMobile,
				U_TelNum			  :U_TelNum,
				U_CustAddress         : U_CustAddress,
				U_OtherPhone		  : U_OtherPhone,
				U_Attn                : U_Attn,
				U_Notifiers	          : U_Notifiers,
				U_CaseType            : U_CaseType,
				U_PrincipalName	 	  : U_PrincipalName,
				U_PrincipalRelation   : U_PrincipalRelation,
				U_PrincipalPhone	  : U_PrincipalPhone,
				U_Result	 		  : U_Result,
				U_ResultExplain		  : U_ResultExplain,
				U_DebitCardTerminal	  : U_DebitCardTerminal,
				U_DebitCardDate       : U_DebitCardDate,
				U_leisureDate         : U_leisureDate,
				U_PhoneInform		  : U_PhoneInform,
				U_LossKind		      : U_LossKind,
				U_BankBookSeal        : U_BankBookSeal,
				U_SealDate	          : U_SealDate,
				U_BankBookDate 	      : U_BankBookDate,
				U_CallBackTime1		  : U_CallBackTime1,
				U_CallBackStaff1	  : U_CallBackStaff1,
				U_CallBackTime2	      : U_CallBackTime2,				
				U_CallBackStaff2	  : U_CallBackStaff2,
				U_Remark			  : U_Remark,
				FUserId		      	  : FUserId,
				U_CallBackOther1	  : U_CallBackOther1,
				U_CallBackOther2	  : U_CallBackOther2
				
			}
			Utility.openDialog("TBB.UDebitLoss.Report.page",args);
		},
		setRequire1 : function()
		{//掛失類別選擇/金融卡端/任一選項，則/掛失種類/為必填
			var U_DebitCardTerminal = form.getFieldValue("U_DebitCardTerminal");
			if(U_DebitCardTerminal!=null && U_DebitCardTerminal!= 6)
			{
				form.setFieldRequired("U_LossKind", true);								
				
				//20170213 add by chainsea\alex.liwu_start
				form.setFieldRequired("U_DebitCardDate", true);
				//20170213 add by chainsea\alex.liwu_end
				toolBar.setItemDisabled("DebitCardLoss",false);
				
			}else
			{
				form.setFieldRequired("U_LossKind", false);

				//20170213 add by chainsea\alex.liwu_start
				form.setFieldRequired("U_DebitCardDate", false);
				//20170213 add by chainsea\alex.liwu_end
				toolBar.setItemDisabled("DebitCardLoss",true);
				
				//20180927      防呆設置   susie
				form.setFieldValue("U_DebitCardDate", null);
				form.setFieldValue("U_LossKind", null);

			}
			
		},
		setRequire2 : function() //存摺本/印鑑章 20170213 add by chainsea\alex.liwu_start
		{
			var items = form.getFieldValue("U_BankBookSeal");
			console.log(items);

			if(items == null){
			    items = "";
			}

			if(items.indexOf("0") >= 0){
			    form.setFieldRequired("U_BankBookDate", true);
			}else{
			    form.setFieldRequired("U_BankBookDate", false);
			}

			if(items.indexOf("1") >= 0){
			    form.setFieldRequired("U_SealDate", true);
			}else{
			    form.setFieldRequired("U_SealDate", false);
			}
		//存摺本/印鑑章 20170213 add by chainsea\alex.liwu_end
		},
		getWhetherLoss : function(trNo){
			//經辦人欄位設置值
			var userId = CommonBusiness.getCurrentUser().userId;
			var user = CommonBusiness.getEntity("Qs.User", userId);	
			var name = user.FLoginName	;		
			var FLoginName = name.substring(name.length-3);	
			var args = {form:form.getData()};
			var AccountNumberSystem=form.getFieldText("U_AccountNumberSystem");
			var LossKind=form.getFieldValue("U_LossKind");
			args.form.F_TrNo = trNo;
			//args.form.F_CardKind ='';			
			form.setFieldValue("U_Attn" , FLoginName);
			//console.log(args.form);	
			// 判斷值是否為空
			if(AccountNumberSystem=="")
			{
				Jui.message.alert("請輸入帳號");
				return ;
			}
			Jui.message.confirm("你確定執行金融卡掛失動作嗎\n"+"掛失卡號："+AccountNumberSystem+"\n"+"掛失經辦："+FLoginName,  function(){
			//	args.form.U_AccountNumberSystem =AccountNumberSystem;						
				if(LossKind==null)
				{
					args.form.U_LossKind = null;
				}else
				{
					args.form.U_LossKind =(Number(LossKind)+1).toString();	
				}				
				args.form.U_Attn = FLoginName;				
				console.log(args.form);
				Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
				});		

				Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					var U_Result = json.U_Result;
					var U_ResultExplain ='';
			//		console.log(ret.result);
					console.log(json);
					form.updateData(json);					
					var U_Result = json.U_ErrorCode;
					var U_ResultExplain =json.U_ErrorMemo;
					var U_DebitCardDate	=json.U_DebitCardDate;
					if(U_DebitCardDate !=null){
						U_DebitCardDate=(Number(U_DebitCardDate.substr(0,3))+1911).toString()+U_DebitCardDate.substring(3);
						U_DebitCardDate=U_DebitCardDate.substr(0,4)+"-"+U_DebitCardDate.substr(4,2)+"-"+U_DebitCardDate.substr(6,2);
					}
					var F_TIMLST =json.F_TIMLST;
					if(F_TIMLST !=null){
						F_TIMLST=F_TIMLST.substr(0,2)+":"+F_TIMLST.substr(2,2);
					}					
					var daytime=U_DebitCardDate+" "+F_TIMLST;
					console.log(daytime);
					form.setFieldValue("U_DebitCardDate",daytime);
					form.setFieldValue("U_Result",U_Result);
					form.setFieldValue("U_ResultExplain",U_ResultExplain);					
				});				
					
				toolBar.setItemDisabled("DebitCardLoss",true);
				
		});			
			
		},
		//20180927      防呆設置   susie
		setRequire4:function()
		{
			if(UCustID.doCheck()){
				var args = {form:form.getData()};
				args.form.F_TrNo = "TVO3MBBT";
				//args.form.F_CardKind ="C"+'               ';
				var account=[];
				if(form.getFieldValue("U_CustID").length==8){
					args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}


				Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
				});		

				Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					//console.log(ret.result);
					//console.log(json);
					form.updateData(json);
					//key value 
					for(var i=0;i<json.U_GridCardStatus.length;i++){
						var act = {};
						act.value = json.U_GridCardStatus[i].U_gAccountNum;
						act.text = json.U_GridCardStatus[i].U_gAccountNum;
						account.push(act)
					}					
					form.getControl("U_AccountNumberSystem").loadItems(account);
					//UDebitLoss.doLoad();
				});
			}
		},
		getDebitCardLossDisabled : function(){
				if(form.getFieldValue("U_Result")!=null){
					toolBar.setItemDisabled("DebitCardLoss",true);
				}
		},
		//打回客服一線修改時欄位唯讀設置
		getStatus : function(){
			var status=form.getFieldValue("FStatus");
			var lossWay=form.getFieldValue("U_LossWay");
			

			if(status=="AgentSign1"){
				if(lossWay==0){
					form.setFieldDisabled("U_DebitCardDate",true); //金融卡端時間
					form.setFieldDisabled("U_BankBookDate",true); //存摺掛失時間
					form.setFieldDisabled("U_SealDate",true); //印鑑章掛失時間
				}
				else{
					form.setFieldDisabled("U_DebitCardDate",false); //金融卡端時間
					form.setFieldDisabled("U_BankBookDate",false); //存摺掛失時間
					form.setFieldDisabled("U_SealDate",false); //印鑑章掛失時間
				}
				form.setFieldDisabled("U_CustID",true);  //客戶ID/統編
				form.setFieldDisabled("U_CustName",true); //客戶姓名
				form.setFieldDisabled("U_AccountNumberSystem",true); //帳號
				form.setFieldDisabled("U_CustMobile",true); //手機
				form.setFieldDisabled("U_CustAddress",true); //住家
				form.setFieldDisabled("U_Attn",true);  // 經辦人
				form.setFieldDisabled("U_OtherPhone",true); //其他連絡電話
				form.setFieldDisabled("U_LossKind",true); //掛失種類
				
			}

			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_start
			if(status=="Audit"){
				form.setFieldDisabled("U_CustID",true);  //客戶ID/統編
				form.setFieldDisabled("U_CustName",true); //客戶姓名
				form.setFieldDisabled("U_AccountNumberSystem",true); //帳號
				form.setFieldDisabled("U_CustMobile",true); //手機
				form.setFieldDisabled("U_CustAddress",true); //住家
				form.setFieldDisabled("U_Attn",true);  // 經辦人
				form.setFieldDisabled("U_OtherPhone",true); //其他連絡電話
				form.setFieldDisabled("U_LossKind",true); //掛失種類

				form.setFieldDisabled("U_AccountNumberSystem",true); //帳號
				form.setFieldDisabled("U_OtherPhone",true); //其他聯絡電話
				form.setFieldDisabled("U_Notifiers",true); //通報人
				form.setFieldDisabled("U_PrincipalName",true); //姓名
				form.setFieldDisabled("U_PrincipalRelation",true); //關係
				form.setFieldDisabled("U_PrincipalPhone",true); //電話
				form.setFieldDisabled("U_LossWay",true); //掛失方式
				form.setFieldDisabled("U_DebitCardDate",true); //金融卡掛失時間
				form.setFieldDisabled("U_BankBookDate",true); //存摺掛失時間
				form.setFieldDisabled("U_SealDate",true); //印鑑章掛失時間
				form.setFieldDisabled("U_DebitCardTerminal",true); //金融卡端
				form.setFieldDisabled("U_LossKind",true); //掛失種類
				form.setFieldDisabled("U_BankBookSeal",true); //存摺本印鑑
				form.setFieldDisabled("U_PhoneInform",true); //電話告知
			}
			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_end

			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_start
			if(status=="AgentSign"){
				var DebitCardTerminal=form.getFieldValue("U_DebitCardTerminal");
				if(DebitCardTerminal== 0 || DebitCardTerminal== 2 || DebitCardTerminal== 3 || DebitCardTerminal== 4 || DebitCardTerminal== 5 ){
					form.setFieldRequired("U_CallBackStaff1",true);
					form.setFieldRequired("U_CallBackTime1",true);
				}
				else if(DebitCardTerminal== 6){
					var BankBookSeal=form.getFieldValue("U_BankBookSeal");
					if(BankBookSeal==0 ||BankBookSeal==1){
						form.setFieldRequired("U_CallBackStaff1",true);
						form.setFieldRequired("U_CallBackTime1",true);
					}
				}
			}




			//add 狀態為台企銀客服二線審核中唯讀設置 by chainsea\alex.liwu_end



			
		},
		getFinanceQuery : function(trNo){
			if(UCustID.doCheck()){
				var args = {form:form.getData()};
				args.form.F_TrNo = trNo;
				//args.form.F_CardKind ="C"+'               ';
				var account=[];
				if(form.getFieldValue("U_CustID").length==8){
					args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}


				Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
				});		

				Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					//console.log(ret.result);
					//console.log(json);
					form.updateData(json);
					//key value 
					for(var i=0;i<json.U_GridCardStatus.length;i++){
						var act = {};
						act.value = json.U_GridCardStatus[i].U_gAccountNum;
						act.text = json.U_GridCardStatus[i].U_gAccountNum;
						account.push(act)
					}
					//console.log(account);
				//	form.setFieldValue("U_AccountNumberSystem",account);
					form.setFieldValue("U_CustName",json.U_AccountName);//客户姓名
					form.setFieldValue("U_CustMobile",json.U_Mobile	);//手机
					form.setFieldValue("U_TelNum",json.U_TelExt	);//住家电话
					form.setFieldValue("U_CustAddress",json.U_AddressMail);//地址
					 form.getControl("U_AccountNumberSystem").loadItems(account);
					 
					//20180927      防呆設置   susie
						form.setFieldValue("U_Notifiers",'0');//通報人     預設‘本人’
						form.setFieldValue("U_DebitCardTerminal",'2');//金融卡端   預設‘一般卡’
						form.setFieldValue("U_LossKind",'2');//掛失種類     預設‘使用中之卡片’
						form.setFieldValue("U_PhoneInform",'1');//電話告知    預設‘分行’
						form.setFieldValue("U_LossWay",'0');//掛失方式   預設‘系統’
						form.setFieldValue("U_AccountNumberSystem",'請選擇帳號');//帳號   預設‘請選擇帳號’
						
						EntityForm.$doSave();
				});
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

		doSave:function()
		{
			var U_DebitCardTerminal = form.getFieldValue("U_DebitCardTerminal");
			var U_BankBookSeal = form.getFieldValue("U_BankBookSeal");
			var U_AccountNumberSystem=form.getFieldValue("U_AccountNumberSystem");//帳號  
			if(U_AccountNumberSystem=='請選擇帳號')
			{
				Jui.message.alert("請選擇正確的帳號");
				return;
			}
			if(U_DebitCardTerminal==null && U_BankBookSeal==null)
			{
				Jui.message.alert("請至少選擇一種掛失方式");
			}
			else
			{
				EntityForm.$doSave();
			}
		},
		doSubmit:function()
		{
			Jui.message.confirm("請確認已在Clist系統掛失金融卡",function(){
				EntityForm.$doSubmit();
			});
		}
	
};

//20180927      防呆設置   susie

EntityForm.doSave=UDebitLoss.doSave;
EntityForm.doSubmit=UDebitLoss.doSubmit;
