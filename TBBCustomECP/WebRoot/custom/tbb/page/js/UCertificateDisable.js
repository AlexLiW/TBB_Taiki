var UCertificateDisable = {
		doLoad : function()
		{
			UCertificateDisable.doIsNew();
			UCertificateDisable.setOnChange();

			UCertificateDisable.getDebitCardLossDisabled();
			UCertificateDisable.getStatus();
			if (clientData.entityId != null ) {
				UCertificateDisable.addServiceTrack();
			}
			
			//20180927      防呆設置   susie
			UCertificateDisable.setRequire();

		},
		doIsNew : function() // 若表單為新建
		{			
			var fid=form.getFieldValue("FId");
			if(fid==null){
				toolBar.setItemDisabled("UCertificateDisable",true);
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
				UCertificateDisable.setRequire();
				//UCertificateDisable.setRequire4();
				
			}
			
		},
	
		setOnChange : function()
		{
			form.getControl("U_Notifiers").onchange = UCertificateDisable.setRequire; // 通報人狀態
			form.getControl("U_CallBackStaff1").onchange = UCertificateDisable.setRequire;//回撥人員1
			form.getControl("U_CallBackStaff2").onchange = UCertificateDisable.setRequire;//回撥人員2



		},
		setRequire : function()
		{
			var U_Notifiers = form.getFieldValue("U_Notifiers");
			if(U_Notifiers== 0) // 本人
			{
				form.setFieldRequired("U_PrincipalName", false);
				form.setFieldRequired("U_PrincipalRelation", false);
				form.setFieldRequired("U_PrincipalPhone", false);
				
			}
			else if(U_Notifiers== 1) // 委託人
			{
				form.setFieldRequired("U_PrincipalName", true);
				form.setFieldRequired("U_PrincipalRelation", true);
				form.setFieldRequired("U_PrincipalPhone", true);
				
				
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
			
		
		},


		doOpen : function()
		{
			var U_CustName              = form.getFieldValue("U_CustName");//客户姓名
			var U_CustID              	= form.getFieldValue("U_CustID");//客戶ID/統編	
			var U_CustMobile   		    = form.getFieldValue("U_CustMobile");//手機
			var U_TelNum   		    = form.getFieldValue("U_TelNum");//住家电话
			var U_CustAddress   		= form.getFieldValue("U_CustAddress");//住家
			var U_OtherPhone   	        = form.getFieldValue("U_OtherPhone");//其他联络电话
			var U_Notifiers  			= form.getFieldValue("U_Notifiers");//通报人
			var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
			var U_PrincipalName		    = form.getFieldValue("U_PrincipalName");//姓名
			var U_PrincipalRelation     = form.getFieldValue("U_PrincipalRelation");//关系
			var U_PrincipalPhone        = form.getFieldValue("U_PrincipalPhone");//电话
			var	U_Result            	= form.getFieldValue("U_Result");//交易结果
			var U_ResultExplain         = form.getFieldValue("U_ResultExplain");//交易结果说明
			var U_CertificateSuspend1           = form.getFieldValue("U_CertificateSuspend1");//憑證暫禁/一般網銀密碼終止
			var U_PhoneInform    		= form.getFieldValue("U_PhoneInform");//电话告知
			var U_CertificateDisableDate   	    = form.getFieldValue("U_CertificateDisableDate");//憑證暫禁完成時間
			var U_PasswordSuspendDate   	    = form.getFieldValue("U_PasswordSuspendDate");//一般網銀密碼終止完成時間
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
				U_CustMobile          : U_CustMobile,
				U_TelNum			  :U_TelNum,
				U_CustAddress         : U_CustAddress,
				U_OtherPhone		  : U_OtherPhone,
				U_Notifiers	          : U_Notifiers,
				U_CaseType            : U_CaseType,
				U_PrincipalName	 	  : U_PrincipalName,
				U_PrincipalRelation   : U_PrincipalRelation,
				U_PrincipalPhone	  : U_PrincipalPhone,
				U_Result	 		  : U_Result,
				U_ResultExplain		  : U_ResultExplain,
				U_CertificateSuspend1     : U_CertificateSuspend1,
				U_PhoneInform		  : U_PhoneInform,
				U_CertificateDisableDate       : U_CertificateDisableDate,
				U_PasswordSuspendDate       : U_PasswordSuspendDate,
				U_CallBackTime1		  : U_CallBackTime1,
				U_CallBackStaff1	  : U_CallBackStaff1,
				U_CallBackTime2	      : U_CallBackTime2,				
				U_CallBackStaff2	  : U_CallBackStaff2,
				U_Remark			  : U_Remark,
				FUserId		      	  : FUserId,
				U_CallBackOther1	  : U_CallBackOther1,
				U_CallBackOther2	  : U_CallBackOther2
				
			}
			Utility.openDialog("TBB.UCertificateDisable.Report.page",args);
		
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
					//form.getControl("U_AccountNumberSystem").loadItems(account);
					UCertificateDisable.doLoad();
				});
			}
		},
		getDebitCardLossDisabled : function(){
				if(form.getFieldValue("U_Result")!=null){
					toolBar.setItemDisabled("UCertificateDisable",true);
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

					 
					//20180927      防呆設置   susie
						form.setFieldValue("U_Notifiers",'0');//通報人     預設‘本人’
						form.setFieldValue("U_PhoneInform",'1');//電話告知    預設‘分行’
						//EntityForm.$doSave();
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
			
				EntityForm.$doSave();
		},
		doSubmit:function()
		{
			//Jui.message.confirm("請確認已在Clist系統掛失金融卡",function(){
				EntityForm.$doSubmit();
			//});
		}
	
};

//20180927      防呆設置   susie

EntityForm.doSave=UCertificateDisable.doSave;
EntityForm.doSubmit=UCertificateDisable.doSubmit;
