var UDebitLoss_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("CustName").value		       = tbb.U_CustName;//客户姓名
		document.getElementById("CustID").value 			   = tbb.U_CustID;//客戶ID/統編
		document.getElementById("AccountNumberSystem").value   = tbb.U_AccountNumberSystem;//帳號
		document.getElementById("CustMobile").value 		   = tbb.U_CustMobile;//手機 
		document.getElementById("U_TelNum").value 		  	   = tbb.U_TelNum;//住家電話
		document.getElementById("CustAddress").value 		   = tbb.U_CustAddress;//住家
		document.getElementById("OtherPhone").value            = tbb.U_OtherPhone;//其他联络电话
		document.getElementById("PrincipalName").value 		   = tbb.U_PrincipalName;//姓名
		document.getElementById("PrincipalRelation").value 	   = tbb.U_PrincipalRelation;//关系
		document.getElementById("PrincipalPhone").value 	   = tbb.U_PrincipalPhone;//电话
		document.getElementById("DebitCardDate").value         = tbb.U_DebitCardDate;//金融卡端時間
		document.getElementById("BankBookDate").value          = tbb.U_BankBookDate;//存摺掛失時間
		document.getElementById("SealDate").value              = tbb.U_SealDate;//印鑑章掛失時間
		document.getElementById("leisureDate").value         =tbb.U_leisureDate;//悠遊卡掛失時間
		document.getElementById("CallBackOther1").value        = tbb.U_CallBackOther1;//其他1
		document.getElementById("CallBackOther2").value        = tbb.U_CallBackOther2;//其他2
		document.getElementById("CallBackTime1").value         = tbb.U_CallBackTime1;//回撥時間1
		document.getElementById("CallBackTime2").value         = tbb.U_CallBackTime2;//回撥時間2
		document.getElementById("Remark").value                = tbb.U_Remark;//備註
		document.getElementById("FUserId").value                = tbb.FUserId;//处理人员
		
		
		
		
		
		//通报人
		if(tbb.U_Notifiers==0){
			document.getElementsByName("Notifiers")[0].checked="checked";
		}else if(tbb.U_Notifiers==1){
			document.getElementsByName("Notifiers")[1].checked="checked";
		}

		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		
		
		//掛失类别-金融卡端
		if(tbb.U_DebitCardTerminal==0){
			document.getElementsByName("DebitCardTerminal")[0].checked="checked";
		}else if(tbb.U_DebitCardTerminal==1){
			document.getElementsByName("DebitCardTerminal")[1].checked="checked";
		}else if(tbb.U_DebitCardTerminal==2){
			document.getElementsByName("DebitCardTerminal")[2].checked="checked";
		}else if(tbb.U_DebitCardTerminal==3){
			document.getElementsByName("DebitCardTerminal")[3].checked="checked";
		}else if(tbb.U_DebitCardTerminal==4){
			document.getElementsByName("DebitCardTerminal")[4].checked="checked";
		}else if(tbb.U_DebitCardTerminal==5){
			document.getElementsByName("DebitCardTerminal")[6].checked="checked";
		}else if(tbb.U_DebitCardTerminal==6){
			document.getElementsByName("DebitCardTerminal")[5].checked="checked";
		}
		
		//存摺本/印鑑：20170210 adjust by chainsea\alex.liwu
		/*if(tbb.U_BankBookSeal==0){
			document.getElementsByName("BankBookSeal")[0].checked="checked";
		}else if(tbb.U_BankBookSeal==1){
			document.getElementsByName("BankBookSeal")[1].checked="checked";
		} */

		if(tbb.U_BankBookSeal!=null){
			var s = tbb.U_BankBookSeal.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("BankBookSeal")[s[i]].checked="checked";
			}
		}
		//存摺本/印鑑：20170210 adjust by chainsea\alex.liwu
		
		//挂失种类
		if(tbb.U_LossKind==0){
			document.getElementsByName("LossKind")[0].checked="checked";
		}else if(tbb.U_LossKind==1){
			document.getElementsByName("LossKind")[1].checked="checked";
		}else if(tbb.U_LossKind==2){
			document.getElementsByName("LossKind")[2].checked="checked";
		}
		
		//电话告知 20170210 adjust by chainsea\alex.liwu
		/*if(tbb.U_PhoneInform==0){
			document.getElementsByName("PhoneInform")[0].checked="checked";
		}else if(tbb.U_PhoneInform==1){
			document.getElementsByName("PhoneInform")[1].checked="checked";
		}else if(tbb.U_PhoneInform==2){
			document.getElementsByName("PhoneInform")[2].checked="checked";
		} */
		if(tbb.U_PhoneInform!=null){
			var s = tbb.U_PhoneInform.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("PhoneInform")[s[i]].checked="checked";
			}
		}
		//电话告知 20170210 adjust by chainsea\alex.liwu
		
		//回拨人员1
		if(tbb.U_CallBackStaff1==0){
			document.getElementsByName("CallBackStaff1")[0].checked="checked";
			document.getElementById("CallBackOther3").style.display="none";
		}else if(tbb.U_CallBackStaff1==1){
			document.getElementsByName("CallBackStaff1")[1].checked="checked";
		}
		
		//回拨人员2
		if(tbb.U_CallBackStaff2==0){
			document.getElementsByName("CallBackStaff2")[0].checked="checked";
			document.getElementById("CallBackOther4").style.display="none";
		}else if(tbb.U_CallBackStaff2==1){
			document.getElementsByName("CallBackStaff2")[1].checked="checked";
		}
		
		
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		UDebitLoss_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
