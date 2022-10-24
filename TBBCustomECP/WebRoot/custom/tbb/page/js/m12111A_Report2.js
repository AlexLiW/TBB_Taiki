var m12111A_Report2 = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value				= tbb.F_Identify;//身份證字號/統一編號
		document.getElementById("DTime").value 				= tbb.F_DTime;//日期時間
		document.getElementById("LivePhone").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CorPhone").value 			= tbb.F_CompanyPhone;//公司電話
		document.getElementById("Cellphone").value 			= tbb.F_MobilePhone;//手機
		document.getElementById("ZName").value 				= tbb.F_UserName;//正卡人姓名
		document.getElementById("ZCard").value 				= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("Branch").value 			= tbb.F_Branch;//往來分行
		document.getElementById("FuName").value 			= tbb.F_UserName1;//附卡人姓名
		document.getElementById("FuCard").value 			= tbb.F_CardNumber1;//附卡卡號
		document.getElementById("Address").value 			= tbb.F_Address;//帳單地址
		document.getElementById("SendF").value 				= tbb.F_SendF;//寄送分行
		document.getElementById("FenHang").value 			= tbb.F_FenHang;//分行名稱
		document.getElementById("CustomSerId").value 		= tbb.F_CustomerId;//客服人員
		document.getElementById("SollveId").value 			= tbb.F_DepartmentId;//處理部門
		document.getElementById("Memo").value 				= tbb.U_Memo;//客戶希望送達時間
		document.getElementById("Remark").value 			= tbb.F_Remark;//備註	 // 20210908 add by gemfor\Tiffany
		
		
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else if(tbb.U_CaseType==1){
			document.getElementsByName("CaseType")[1].checked="checked";
		}


		//申請範圍
		if(tbb.F_Limits==0){
			document.getElementsByName("Limits")[0].checked="checked";
		}else if(tbb.F_Limits==1){
			document.getElementsByName("Limits")[1].checked="checked";
		}else if(tbb.F_Limits==2){
			document.getElementsByName("Limits")[2].checked="checked";
		}
		//已確認正卡持卡人同意開啟預借現金功能
		if(tbb.F_Function1==0){
			document.getElementById("Function1").checked="checked";
		}
		//二次以上(含)郵寄密碼函
		if(tbb.F_Repeat==true){
			document.getElementById("Repeat").checked="checked";
		}
		//申辦項目
		if(tbb.F_Item==0){
			document.getElementsByName("Item")[0].checked="checked";
		}else if(tbb.F_Item==1){
			document.getElementsByName("Item")[1].checked="checked";
		}else if(tbb.F_Item==2){
			document.getElementsByName("Item")[2].checked="checked";
		}else if(tbb.F_Item==3){
			document.getElementsByName("Item")[3].checked="checked";
		}
		//是否申請郵寄密碼函
		if(tbb.F_Cypher==0){
			document.getElementsByName("Cypher")[0].checked="checked";
		}else if(tbb.F_Cypher==1){
			document.getElementsByName("Cypher")[1].checked="checked";
		}
		//寄送方式
		if(tbb.F_Way==0){
			document.getElementsByName("Way")[0].checked="checked";
		}else if(tbb.F_Way==1){
			document.getElementsByName("Way")[1].checked="checked";
		}else if(tbb.F_Way==2){
			document.getElementsByName("Way")[2].checked="checked";
		}else if(tbb.F_Way==3){
			document.getElementsByName("Way")[3].checked="checked";
		}
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12111A_Report2.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
