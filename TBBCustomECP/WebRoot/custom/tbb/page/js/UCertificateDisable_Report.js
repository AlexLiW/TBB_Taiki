var UCertificateDisable_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("CustName").value		       = tbb.U_CustName;//客户姓名
		document.getElementById("CustID").value 			   = tbb.U_CustID;//客戶ID/統編
		document.getElementById("CustMobile").value 		   = tbb.U_CustMobile;//手機 
		document.getElementById("U_TelNum").value 		  	   = tbb.U_TelNum;//住家電話
		document.getElementById("CustAddress").value 		   = tbb.U_CustAddress;//住家
		document.getElementById("OtherPhone").value            = tbb.U_OtherPhone;//其他联络电话
		document.getElementById("PrincipalName").value 		   = tbb.U_PrincipalName;//姓名
		document.getElementById("PrincipalRelation").value 	   = tbb.U_PrincipalRelation;//关系
		document.getElementById("PrincipalPhone").value 	   = tbb.U_PrincipalPhone;//电话
		document.getElementById("CertificateDisableDate").value        = tbb.U_CertificateDisableDate;//申請類別(憑證暫禁)
		document.getElementById("PasswordSuspendDate").value        = tbb.U_PasswordSuspendDate;//申請類別(一般網銀密碼終止)
		document.getElementById("CallBackOther1").value        = tbb.U_CallBackOther1;//其他1
		document.getElementById("CallBackOther2").value        = tbb.U_CallBackOther2;//其他2
		document.getElementById("CallBackTime1").value         = tbb.U_CallBackTime1;//回撥時間1
		document.getElementById("CallBackTime2").value         = tbb.U_CallBackTime2;//回撥時間2
		document.getElementById("Remark").value                = tbb.U_Remark;//備註
		document.getElementById("FUserId").value                = tbb.FUserId;//處理人员
		
		
		
		
		
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

		//憑證暫禁/一般網銀密碼終止
		if(tbb.U_CertificateSuspend1 != null)
		{
			var s = tbb.U_CertificateSuspend1.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("CertificateSuspend1")[s[i]].checked="checked";
			}
		}
		

		//电话告知 

		if(tbb.U_PhoneInform!=null){
			var s = tbb.U_PhoneInform.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("PhoneInform")[s[i]].checked="checked";
			}
		}

		
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
		UCertificateDisable_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
