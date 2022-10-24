var m12113A_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value				= tbb.F_Identify;//身份證字號
		document.getElementById("Name").value				= tbb.F_Name;//聯絡人姓名
		document.getElementById("DateTime").value 			= tbb.F_DateTime;//日期時間
		document.getElementById("HomePhone").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhone").value 		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("MobilePhone").value 		= tbb.F_MobilePhone;//手機
		document.getElementById("TakecardName").value 		= tbb.F_UserName;//正卡人姓名
		document.getElementById("TakecardNum").value 		= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("OtherBank").value 			= tbb.F_Branch;//往來分行
		document.getElementById("FcardName").value 			= tbb.F_UserName1;//附卡人姓名
		document.getElementById("OthCardNum").value 		= tbb.F_CardNumber1;//附卡卡號
		document.getElementById("BackPhoneTime").value 		= tbb.F_TelegramTime;//限期回電時間	
		document.getElementById("PeoblemExpression").value 	= tbb.F_PeoblemExpression;//問題陳述區
		document.getElementById("TranCompny").value 		= tbb.F_TranCompny;//轉介單位
		document.getElementById("TranCompny1").value 		= tbb.F_TranCompny1;//轉介單位
		document.getElementById("BankArea").value 			= tbb.F_BankArea;//分行區域
		document.getElementById("BankName").value 			= tbb.F_BankName;//分行名稱
		document.getElementById("Result").value 			= tbb.F_Result;//處理結果
		document.getElementById("CustomerServiceId").value 	= tbb.F_CustomerId;//客服人員
		
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else if(tbb.U_CaseType==1){
			document.getElementsByName("CaseType")[1].checked="checked";
		}
		
		//是否回電給客戶
		if(tbb.F_IsBackPhone==0){
			document.getElementsByName("IsBackq")[0].checked="checked";
		}else if(tbb.F_IsBackPhone==1){
			document.getElementsByName("IsBackq")[1].checked="checked";
		}
		//客戶身份
		if(tbb.F_Status==0){
			document.getElementsByName("FK")[0].checked="checked";
		}else if(tbb.F_Status==1){
			document.getElementsByName("FK")[1].checked="checked";
		}else if(tbb.F_Status==2){
			document.getElementsByName("FK")[2].checked="checked";
			document.getElementById("CardKind").style.display="none";
		}
		//申辦項目
		if(tbb.F_DefenseProject==0){
			document.getElementsByName("IsBack")[0].checked="checked";
		}else if(tbb.F_DefenseProject==1){
			document.getElementsByName("IsBack")[1].checked="checked";
		}
		else if(tbb.F_DefenseProject==2){
			document.getElementsByName("IsBack")[2].checked="checked";
		}
		else if(tbb.F_DefenseProject==3){
			document.getElementsByName("IsBack")[3].checked="checked";
		}
		else if(tbb.F_DefenseProject==4){
			document.getElementsByName("IsBack")[4].checked="checked";
		}
		else if(tbb.F_DefenseProject==5){
			document.getElementsByName("IsBack")[5].checked="checked";
		}
		else if(tbb.F_DefenseProject==6){
			document.getElementsByName("IsBack")[6].checked="checked";
		}

		
	},
	
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12113A_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
