var m12116A_Report2 = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value				= tbb.F_Identify; //身份證字號
		document.getElementById("SystemTime").value 		= tbb.F_SystemTime;//日期時間
		document.getElementById("HomePhone").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhone").value 		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("MobilePhone").value 		= tbb.F_MobilePhone;//手機
		document.getElementById("TcardName").value 			= tbb.F_UserName;//正卡人姓名
		document.getElementById("TcardID").value 			= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("Branch").value 			= tbb.F_Branch;//往來分行
		document.getElementById("CallbackTime").value 		= tbb.F_CallbackTime;//限期回電時間
		document.getElementById("NewMoney").value 		    = Common.doCheckNumber(tbb.F_LastDollers);//最新金額
		document.getElementById("FirstMoney").value 		= Common.doCheckNumber(tbb.F_HighDollers);//開始金額
		document.getElementById("StartDate").value 			= tbb.F_StartTime;//開始日期
		document.getElementById("EndDate").value 			= tbb.F_EdTime;//結束日期
		document.getElementById("Reason").value 			= tbb.F_Reason;//臨調原因
		document.getElementById("Prove").value 				= tbb.F_Prove;//財力證明
		document.getElementById("VerifyTime").value 		= tbb.F_VerifyTime;//核身時間
		document.getElementById("Remark").value 			= tbb.F_Remark;//備註
		document.getElementById("DealTime").value 			= tbb.F_DealTime;
		document.getElementById("EndDeal").value 			= tbb.F_EndDeal;
		document.getElementById("UserId").value 			= tbb.FUserId;//處理人员
		//document.getElementById("DealUserId").value 		= tbb.F_CustomerId;//處理人員
		document.getElementById("DealDepId").value 			= tbb.F_DepartmentId;//處理部門
		document.getElementById("EMAIL").value 				= tbb.U_EMAIL;//EMAIL
		document.getElementById("ApplyItem").value 			= tbb.U_ApplyItem;//申請項目
		document.getElementById("ChgNo").value 				= tbb.U_ChgNo; // 調整卡號號碼
		
		//卡種
		//if(tbb.F_CardKind==0){
			//document.getElementsByName("KZ")[0].checked="checked";
		//}else{
			//document.getElementsByName("KZ")[1].checked="checked";
		//}

		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		
		//是否回電給客戶
		if(tbb.F_Iscallback==0){
			document.getElementsByName("IsBack")[0].checked="checked";
		}else{
			document.getElementsByName("IsBack")[1].checked="checked";
		}
		
		//請務必回覆客戶
		if (tbb.U_ReplyCust == 0) {
			document.getElementsByName("ReplyCust")[0].checked="checked";
		} else if (tbb.U_ReplyCust == 1) {
			document.getElementsByName("ReplyCust")[1].checked="checked";
		} else if (tbb.U_ReplyCust == 2) {
			document.getElementsByName("ReplyCust")[2].checked="checked";
		}
		
		//調整卡號
		if (tbb.U_ChgCardNo == 0) {
			document.getElementsByName("ChgCardNo")[0].checked="checked";
		} else {
			document.getElementsByName("ChgCardNo")[1].checked="checked";
			document.getElementById("ChgNo").style.display="";
		}
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12116A_Report2.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
