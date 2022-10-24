var m12114A_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value				= tbb.F_Identify;        //身份證字號
		document.getElementById("Date").value 				= tbb.F_Date;//時間-日期
		document.getElementById("HomeTel").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyTel").value 		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("Telephone").value 			= tbb.F_MobilePhone;//手機
		document.getElementById("CardholdName").value 		= tbb.F_UserName;//正卡人姓名
		document.getElementById("CardholderID").value 		= tbb.F_CardNumber;//正卡卡號
		document.getElementById("SubBank").value 			= tbb.F_Branch;//往來分行
		document.getElementById("CallbackTime").value 		= tbb.F_CallbackTime;//回電期限
		document.getElementById("CallbackTruetime").value 	= tbb.F_CallbackTruetime;//回電時間
		document.getElementById("AddcardPeopName").value 	= tbb.F_UserName1;//附卡人姓名
		document.getElementById("AddcardID").value 			= tbb.F_CardNumber1;//附卡卡號	
		document.getElementById("StateProb").value 			= tbb.F_StateProb;//問題陳述區
		document.getElementById("ResultCode").value 		= tbb.F_ResultCode;//風控人員處理結果
		document.getElementById("ServiceId").value 		    = tbb.F_CustomerId;//客服人員
		document.getElementById("SolveDeptId").value 		= tbb.F_DepartmentId;//處理部門
		if(tbb.U_Describe!=null){
			document.getElementById("U_Describe").innerHTML           = tbb.U_Describe;
		}
		
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("IdType")[0].checked="checked";
		}else{
			document.getElementsByName("IdType")[1].checked="checked";
		}
		//是否回電給客戶
		if(tbb.F_IsCallback==0){
			document.getElementsByName("IsCallback")[0].checked="checked";
		}else{
			document.getElementsByName("IsCallback")[1].checked="checked";
		}
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		//問題類型
		if(tbb.F_Type!=null){
			var s = tbb.F_Type.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("Type")[s[i]].checked="checked";
			}
		}
		if(tbb.U_Against==0){
			document.getElementsByName("U_Against")[0].checked="checked";
		}else if(tbb.U_Against==1){
			document.getElementsByName("U_Against")[1].checked="checked";
		}
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12114A_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
