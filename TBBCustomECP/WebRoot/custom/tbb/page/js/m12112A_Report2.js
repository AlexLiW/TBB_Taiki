var m12112A_Report2 = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("Name").value				= tbb.F_Name; //聯絡人姓名
		document.getElementById("IdCard").value				= tbb.F_Identify; //身份證字號/統一編號
		document.getElementById("DTime").value 				= tbb.F_DTime;//日期時間
		document.getElementById("LivePhone").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CorPhone").value 			= tbb.F_CompanyPhone;//公司電話
		document.getElementById("Cellphone").value 			= tbb.F_MobilePhone;//手機
		// document.getElementById("ZName").value 				= tbb.F_UserName;//正卡人姓名
		// document.getElementById("CardNo").value 			= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("Branch").value 			= tbb.F_Branch;//往來分行
		// document.getElementById("FuName").value 			= tbb.F_UserName1;//附卡人姓名
		// document.getElementById("FuCard").value 			= tbb.F_CardNumber1;//附卡人卡號 
		document.getElementById("Content").value 			= tbb.F_Content;//內容說明
		document.getElementById("Result").value 			= tbb.F_Result;//客訴中心處理結果
		document.getElementById("UserId").value 			= tbb.FUserId;//客服人員
		document.getElementById("SollveId").value 			= tbb.F_DepartmentId;//處理部門
		// document.getElementById("UnitOther").value 			= tbb.U_UnitOther;//其他
		document.getElementById("Desc1").value 				= tbb.U_Desc1;// 說明1
		document.getElementById("Desc2").value 				= tbb.U_Desc2;// 說明2
		document.getElementById("SupervisorId").value 		= tbb.U_SupervisorId;// 客服主管簽章
		document.getElementById("CreateUserId").value 		= tbb.U_CreateUserId;// 接電人員
		document.getElementById("Content2").value 			= tbb.U_Content;// 內容說明2
		
		
		if(tbb.UnitOther!==null){
			document.getElementById("UnitOther").innerHTML       = tbb.U_UnitOther;//郵寄分行名稱
		}
		//卡種
		/* if(tbb.F_CardKind=='C'){
			document.getElementsByName("CardS")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("CardS")[1].checked="checked";
		} */
		
		//客户身份
		if(tbb.F_CustomerIdfiy==0){
			document.getElementsByName("CustomerIdfiy")[0].checked="checked";
		}else if(tbb.F_CustomerIdfiy==1){
			document.getElementsByName("CustomerIdfiy")[1].checked="checked";
		}else if(tbb.F_CustomerIdfiy==2){
			document.getElementsByName("CustomerIdfiy")[2].checked="checked";
		}
		
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		
		//案件等級 
		/*if(tbb.F_Rank==0){
			document.getElementsByName("Rank")[0].checked="checked";
		}else if(tbb.F_Rank==1){
			document.getElementsByName("Rank")[1].checked="checked";
		}else if(tbb.F_Rank==2){
			document.getElementsByName("Rank")[2].checked="checked";
		}else if(tbb.F_Rank==3){
			document.getElementsByName("Rank")[3].checked="checked";
		}*/
		//20190614將案件等級選項從"A級、B級、C級、D級"改成"第一級、第二級"
		if(tbb.F_Rank==0){
			document.getElementsByName("Rank")[0].checked="checked";
		}else if (tbb.F_Rank==1){
			document.getElementsByName("Rank")[1].checked="checked";
		}else if (tbb.F_Rank==2){
			document.getElementsByName("Rank")[2].checked="checked";
		}



		
		//權責單位
		if(tbb.F_Unit!=null){
			var s = tbb.F_Unit.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("Type")[s[i]].checked="checked";
				if("14" == s[i]){ // 20210909 add by gemfor\Tiffany
					document.getElementById("U_UnitOther").style.display = '';
				}
			}
		}
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12112A_Report2.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
