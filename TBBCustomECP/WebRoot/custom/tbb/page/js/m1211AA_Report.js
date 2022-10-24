var m1211AA_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("Identity").value			= tbb.F_Identify;//身份證號碼統一編碼
		document.getElementById("Time").value 				= tbb.F_Time;//日期時間
		document.getElementById("HomePhNo").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhNo").value 		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("MobilePhNo").value 		= tbb.F_MobilePhone;//手機
		document.getElementById("UserNumber").value 		= tbb.F_AppendName;//持卡人姓名
		document.getElementById("UserCardNo").value 		= tbb.F_CreditCardNo;//持卡人卡號
		document.getElementById("CorBank").value 			= tbb.F_Branch;//往來分行
		document.getElementById("CompangyName").value 		= tbb.F_CompangyName;//公司名稱
		document.getElementById("Duty").value 				= tbb.F_Duty;//職稱
		document.getElementById("RegisterAddress").value 	= tbb.F_RegisterAddress;//戶籍地址
		document.getElementById("LiveAddress").value 		= tbb.F_LiveAddress;//居住地址
		document.getElementById("CompanyAddress").value 	= tbb.F_CompanyAddress;//公司地址
		document.getElementById("Email2").value 	        = tbb.F_Email2;//email地址
		document.getElementById("IdentityNo").value 	    = tbb.F_IdentityNo;//附卡人身分證號
		document.getElementById("Number").value 	        = tbb.F_Number;//郵遞區號
		document.getElementById("Other").value 				= tbb.F_Other;//其他
		document.getElementById("ESQId").value 				= tbb.FUserId;//客服人員
		document.getElementById("HandleDepartId").value 	= tbb.F_DepartmentId;//處理單位	
		//document.getElementById("Address2").value 	        = tbb.F_Address2;
		document.getElementById("LiveAddress1").value 	    = tbb.F_LiveAddress1;
		document.getElementById("CompanyAddress1").value 	= tbb.F_CompanyAddress1;
		document.getElementById("Email1").value 	        = tbb.F_Email1;
		document.getElementById("RegisterAddress1").value 	= tbb.F_RegisterAddress1;
		
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		
		
		
		//正/附卡
		if(tbb.F_PMCard==0){
			document.getElementsByName("ZK")[0].checked="checked";
		}else if(tbb.F_PMCard==1){
			document.getElementsByName("ZK")[1].checked="checked";
		}

		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		//帳單寄送方式
		if(tbb.F_SendWay==0){
			document.getElementsByName("SendWay")[0].checked="checked";
		}else if(tbb.F_SendWay==1){
			document.getElementsByName("SendWay")[1].checked="checked";
		}else if(tbb.F_SendWay==2){
			document.getElementsByName("SendWay")[2].checked="checked"
		}
		//地址類別
		if(tbb.F_Address1=='0'){
			document.getElementsByName("Address")[0].checked="checked";
			document.getElementById("LiveAddress2").style.display="none";
			document.getElementById("CompanyAddress2").style.display="none";
			document.getElementById("EmailAddress2").style.display="none";
		}else if(tbb.F_Address1=='1'){
			document.getElementsByName("Address")[1].checked="checked";
			document.getElementById("RegisterAddress2").style.display="none";
			document.getElementById("CompanyAddress2").style.display="none";
			document.getElementById("EmailAddress2").style.display="none";
		}else if(tbb.F_Address1=='2'){
			document.getElementsByName("Address")[2].checked="checked";
			document.getElementById("RegisterAddress2").style.display="none";		
			document.getElementById("LiveAddress2").style.display="none";
			document.getElementById("EmailAddress2").style.display="none";
		}else if(tbb.F_Address1=='3'){
			document.getElementsByName("Address")[3].checked="checked";
			document.getElementById("CompanyAddress2").style.display="none";
			document.getElementById("RegisterAddress2").style.display="none";		
			document.getElementById("LiveAddress2").style.display="none";
		}else{
			document.getElementById("LiveAddress2").style.display="none";
			document.getElementById("CompanyAddress2").style.display="none";
			document.getElementById("RegisterAddress2").style.display="none";
			document.getElementById("EmailAddress2").style.display="none";
		}
		
		if(tbb.F_Address11=='0'){
			document.getElementsByName("Address11")[0].checked="checked";
		}else if(tbb.F_Address11=='1'){
			document.getElementsByName("Address11")[1].checked="checked";
		}else if(tbb.F_Address11=='2'){
			document.getElementsByName("Address11")[2].checked="checked";
		}else if(tbb.F_Address11=='3'){
			document.getElementsByName("Address11")[3].checked="checked";
		}
		if(tbb.F_SendAddress=='0'){
			document.getElementsByName("Type")[0].checked="checked";		
			document.getElementById("RegisterAddress11").style.display="none";
			document.getElementById("LiveAddress11").style.display="none";
			document.getElementById("CompanyAddress11").style.display="none";
			document.getElementById("Email11").style.display="none";
document.getElementById("Other").style.height="300px";
		}else if(tbb.F_SendAddress=='1'){
			document.getElementsByName("Type")[1].checked="checked";
			document.getElementById("EmailAddress2").style.display="none";
			document.getElementById("RegisterAddress2").style.display="none";
			document.getElementById("LiveAddress2").style.display="none";
			document.getElementById("CompanyAddress2").style.display="none";

document.getElementById("Other").style.height="180px";

		}else if(tbb.F_SendAddress=='0,1'){
			document.getElementsByName("Type")[0].checked="checked";
			document.getElementsByName("Type")[1].checked="checked";

document.getElementById("Other").style.height="180px";

		}else{
			document.getElementById("RegisterAddress11").style.display="none";
			document.getElementById("LiveAddress11").style.display="none";
			document.getElementById("CompanyAddress11").style.display="none";
			document.getElementById("Email11").style.display="none";
			document.getElementById("EmailAddress2").style.display="none";
			document.getElementById("RegisterAddress2").style.display="none";
			document.getElementById("LiveAddress2").style.display="none";
			document.getElementById("CompanyAddress2").style.display="none";
document.getElementById("Other").style.height="300px";

		}
		
		
		//變更結帳日
		if(tbb.F_UpDataDate==0){
			document.getElementsByName("UpDataDate")[0].checked="checked";
		}else if(tbb.F_UpDataDate==1){
			document.getElementsByName("UpDataDate")[1].checked="checked";
		}
		//確認
		console.log(tbb.U_Check);
		if(tbb.U_Check==0){
			document.getElementsByName("U_Check")[0].checked="checked";
		}
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m1211AA_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
