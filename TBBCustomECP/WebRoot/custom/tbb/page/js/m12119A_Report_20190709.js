var m12119A_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IDNo").value		    			= tbb.F_Identify;  //身份證字號
		document.getElementById("Date").value 						= tbb.F_Date;//日期-時間：		
		document.getElementById("MasterName").value 				= tbb.F_UserName;//正卡人姓名
		document.getElementById("TcardID").value 					= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("SubsidiaryBank").value 			= tbb.F_Branch;//往來分行
		document.getElementById("HomePhone").value 		    		= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhone").value 	    		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("CellPhone").value 					= tbb.F_MobilePhone;//手機
		document.getElementById("JYDate").value 					= tbb.F_JYDate;//交易日期
		document.getElementById("F_AuthorizationCode").value 		= tbb.F_AuthorizationCode;//授權碼
                document.getElementById("F_Installmentdate").value 		= tbb.F_Installmentdate;//
//		document.getElementById("TotalMoney").value 	    		= Common.doCheckNumber(tbb.F_TotalMoney);//分期總金額
//		document.getElementById("Unallocated").value 	    		= Common.doCheckNumber(tbb.F_Unallocated);//尚未攤還之分期本金
		document.getElementById("content").value 	        		= tbb.F_Reason;//問題陳述區
		document.getElementById("CustomerServiceId").value 			= tbb.F_CustomerId;//客服人員
		document.getElementById("ProcessingDepartmentId").value    	= tbb.F_DepartmentId;//處理部門
		//分期總金額
		if(tbb.F_TotalMoney==null){
			document.getElementById("TotalMoney").value = tbb.F_TotalMoney;
		}
		else{
			document.getElementById("TotalMoney").value = Common.doCheckNumber(tbb.F_TotalMoney);
		}
		//尚未攤還之分期本金
		if(tbb.F_Unallocated==null){
			document.getElementById("Unallocated").value = tbb.F_Unallocated;
		}
		else{
			document.getElementById("Unallocated").value = Common.doCheckNumber(tbb.F_Unallocated);
		}
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		//來電分期申請書送件
		if(tbb.F_Application=="0"){
			document.getElementById("Application").checked="checked";
		}
		//申請分期
		if(tbb.F_ApplyInstall=='0'){
			document.getElementsByName("VoteOption")[0].checked="checked";
			document.getElementById("Unallocated1").style.display="none";
		}else if(tbb.F_ApplyInstall=='1'){
			document.getElementsByName("VoteOption")[1].checked="checked";
			document.getElementById("Isnull").style.display="none";
			document.getElementById("TotalMoney1").style.display="none";
			document.getElementById("instalments1").style.display="none";
		}else{
			document.getElementById("Unallocated1").style.display="none";
			document.getElementById("Isnull").style.display="none";
			document.getElementById("TotalMoney1").style.display="none";
			document.getElementById("instalments1").style.display="none";
			document.getElementById("StageType2").style.display="none";
		}
		//是否曾經開立信用卡來電分期專案申請書
		if(tbb.F_Ever==0){
			document.getElementsByName("yesorno")[0].checked="checked";
			document.getElementById("no").style.display="none";
			document.getElementById("Application1").style.display="none";
		}else if(tbb.F_Ever==1){
			document.getElementsByName("yesorno")[1].checked="checked";

		}else{
			document.getElementById("no").style.display="none";
			document.getElementById("Application1").style.display="none";
		}
		//暂不分期
		if(tbb.F_StageType==0){
			document.getElementsByName("no1")[0].checked="checked";
document.getElementById("content").style.height="450px";
		}else{
		document.getElementById("content").style.height="400px";
		}
		
		//分期類型
		if(tbb.F_StageType2==0){
			document.getElementsByName("no2")[0].checked="checked";
			document.getElementById("qq").style.display="none";
//			document.getElementById("da").style.display="none";



		}else if(tbb.F_StageType2==1){
			document.getElementsByName("no2")[1].checked="checked";
			document.getElementById("TradeDate").style.display="none";
			document.getElementById("AuthorizationCode").style.display="none";


		}else{
			document.getElementById("qq").style.display="none";
			document.getElementById("da").style.display="none";
			document.getElementById("TradeDate").style.display="none";
			document.getElementById("AuthorizationCode").style.display="none";


		}


		
		//分期期數：
		if(tbb.F_Periods==0){
			document.getElementsByName("instalments")[0].checked="checked";
		}else if(tbb.F_Periods==1){
			document.getElementsByName("instalments")[1].checked="checked";
		}else if(tbb.F_Periods==2){
			document.getElementsByName("instalments")[2].checked="checked";
		}else if(tbb.F_Periods==3){
			document.getElementsByName("instalments")[3].checked="checked";
		}else if(tbb.F_Periods==4){
			document.getElementsByName("instalments")[4].checked="checked";
		}
		//繳足最低應繳金額
		if(tbb.F_Money==0){
			document.getElementsByName("yn")[0].checked="checked";
		}else if(tbb.F_Money==1){
			document.getElementsByName("yn")[1].checked="checked";
		}
		
		//結帳日：
		if(tbb.F_ReckonDate==0){
			document.getElementsByName("da")[0].checked="checked";
		}else if(tbb.F_ReckonDate==1){
			document.getElementsByName("da")[1].checked="checked";
		}	
    },
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12119A_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
