/********************************************************************************
	 利息違約金減免單 報表 20210604版
	 * Author			: gemfor\Lillian
	 * CreateDate		: 2021.06.07
	 * LastUpdateUser	: gemfor\Lillian 
	 * LastUpdateDate	: 2021.06.07
	 * Note: 
*********************************************************************************/
var m12117A_20210604_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IDNUmber").value			= tbb.F_Identify; //身份證字號/統一編號
		document.getElementById("Time").value 				= tbb.F_Time;//日期時間
		document.getElementById("HomePhone").value 			= tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhone").value 		= tbb.F_CompanyPhone;//公司電話
		document.getElementById("MobilePhone").value 		= tbb.F_MobilePhone;//手機
		document.getElementById("UserName").value 			= tbb.F_UserName;//正卡人姓名
		document.getElementById("CardNo").value 			= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("CurrentBranch").value 		= tbb.F_Branch;//往來分行

		document.getElementById("Year").value 				= tbb.F_Year;//帳單年
		document.getElementById("ChangMoney1").value 		= tbb.F_Lixi;//利息調減金額
		document.getElementById("ChangMoney").value 		= tbb.F_Wyuej;//違約金調減金額
		document.getElementById("Remark").value 			= tbb.F_Remark;//備註：（字數限定1000字）
		
		document.getElementById("U_ACardNo").value 			= tbb.U_ACardNo;//請從卡號
		document.getElementById("U_BCardNo").value 			= tbb.U_BCardNo;//調至卡號
		document.getElementById("U_SevAMT2").value 			= Common.doCheckNumber(tbb.U_SevAMT2);//調帳金額
		document.getElementById("U_Descript2").value 		= tbb.U_Descript2;//調至卡號
		
		document.getElementById("U_SevAMT3").value 			= Common.doCheckNumber(tbb.U_SevAMT3);//減免金額
		document.getElementById("U_SevNotice3").value 		= tbb.U_SevNotice3;//服務類型3提醒
		document.getElementById("U_DisReason").value 		= tbb.U_DisReason;//減免原因
		document.getElementById("U_Descript3").value 		= tbb.U_Descript3;//服務項目3問題陳述
		
		document.getElementById("U_BillNotice").value 		= tbb.U_BillNotice;//調閱帳單手續費說明
		document.getElementById("U_eFUNCardNotice").value 	= tbb.U_eFUNCardNotice;//藝FUN卡博物館優惠說明
		document.getElementById("U_Descript4").value 		= tbb.U_Descript4;//服務項目4問題陳述
		
		document.getElementById("FisposeId").value 			= tbb.F_CustomerId;//處理人員
		document.getElementById("FisposeDepaetmentId").value = tbb.F_DepartmentId;//處理部門
		
		
		
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		
		//減調類型
		if(tbb.F_ChangType != null && tbb.F_ChangType != ""){
			var s = tbb.F_ChangType.split(",");
			for( var i = 0; i < 2; i++ ){
				for( var j = 0; j < s.length; j++ ){
					if( i == s[j]){
						document.getElementsByName("JTL")[i].checked="checked";
					}
				}
			}
		}

		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		//服務項目1-利息減免
		if(tbb.U_SevItem1){
			document.getElementById("U_SevItem1").checked="checked";
		}else{
			//如果沒有勾選，就隱藏項目下的欄位
			document.getElementById("bolck1_1").style.display="none";
			document.getElementById("bolck1_2").style.display="none";
			document.getElementById("bolck1_3").style.display="none";
			document.getElementById("bolck1_4").style.display="none";
			document.getElementById("bolck1_5").style.display="none";
			document.getElementById("bolck1_6").style.display="none";
		}
		
		//服務項目2-不同卡號間調帳
		if(tbb.U_SevItem2){
			document.getElementById("U_SevItem2").checked="checked";
		}else{
			//如果沒有勾選，就隱藏項目下的欄位
			document.getElementById("bolck2_0").style.display="none";
			document.getElementById("bolck2_1").style.display="none";
			document.getElementById("bolck2_2").style.display="none";
		}
		
		//服務項目3-減免掛失費
		if(tbb.U_SevItem3){
			document.getElementById("U_SevItem3").checked="checked";
		}else{
			//如果沒有勾選，就隱藏項目下的欄位
			document.getElementById("bolck3_0").style.display="none";
			document.getElementById("bolck3_1").style.display="none";
			document.getElementById("bolck3_2").style.display="none";
			document.getElementById("bolck3_3").style.display="none";
			document.getElementById("bolck3_4").style.display="none";
		}
		
		//服務項目4-其他
		if(tbb.U_SevItem4){
			document.getElementById("U_SevItem4").checked="checked";
		}else{
			//如果沒有勾選，就隱藏項目下的欄位
			document.getElementById("bolck4_1").style.display="none";
			document.getElementById("bolck4_2").style.display="none";
			document.getElementById("bolck4_3").style.display="none";
			document.getElementById("bolck4_4").style.display="none";
		}
		
		//帳單月份
		if(tbb.F_BillMonth != null && tbb.F_BillMonth != ""){
			var s = tbb.F_BillMonth.split(",");
			for( var i = 0; i < 12; i++ ){
				for( var j = 0; j < s.length; j++ ){
					if( i == s[j]){
						document.getElementsByName("BillMonth")[i].checked="checked";
					}
				}
			}
		}

		//減調原因
		if(tbb.F_DerateReason=="0"){
			document.getElementsByName("JTY")[0].checked="checked";
		}else if(tbb.F_DerateReason=="1"){
			document.getElementsByName("JTY")[1].checked="checked";
		}
		
		//今年減免次數
		if(tbb.F_YearDerateNo=="0"){
			document.getElementsByName("NJ")[0].checked="checked";
			document.getElementById("NJ1_T").style.display="none";
		}else if(tbb.F_YearDerateNo=="1"){
			document.getElementsByName("NJ")[1].checked="checked";
			document.getElementById("NJ1_T").style.display="none";
		}else if(tbb.F_YearDerateNo=="2"){
			document.getElementsByName("NJ")[2].checked="checked";
			if(tbb.U_AnnulTimes!=null){
				document.getElementById("NJ1").value			= tbb.U_AnnulTimes; //減免次數
			}
		}else{
			document.getElementById("NJ1_T").style.display="none";
		}
		
		//服務類型2
		// 20210910 adjust by gemfor\Tiffany
		document.getElementById("ACardNo").style.display = 'none';
		document.getElementById("BCardNo").style.display = 'none';
		if(tbb.U_SevType2 == "1"){
			document.getElementsByName("U_SevType2")[0].checked="checked";
			document.getElementById("ACardNo").style.display = '';
			document.getElementById("BCardNo").style.display = '';
		}else if(tbb.U_SevType2 == "2"){
			document.getElementsByName("U_SevType2")[1].checked="checked";
		}
		
		//服務類型3
		// 20210910 adjust by gemfor\Tiffany
		document.getElementById("SevNotice3").style.display = 'none';
		if(tbb.U_SevType3 == "1"){
			document.getElementsByName("U_SevType3")[0].checked="checked";
			document.getElementById("SevNotice3").style.display = '';
		}else if(tbb.U_SevType3 == "2"){
			document.getElementsByName("U_SevType3")[1].checked="checked";
		}
		
		//服務類型4
		if(tbb.U_SevType4 == "0"){
			document.getElementsByName("U_SevType4")[0].checked="checked";
			document.getElementById("bolck4_3").style.display="none";
		}else if(tbb.U_SevType4 == "1"){
			document.getElementsByName("U_SevType4")[1].checked="checked";
			document.getElementById("bolck4_2").style.display="none";
		}else if(tbb.U_SevType4 == "2"){
			document.getElementsByName("U_SevType4")[2].checked="checked";
			document.getElementById("bolck4_2").style.display="none";
			document.getElementById("bolck4_3").style.display="none";
		}else{
			document.getElementById("bolck4_2").style.display="none";
			document.getElementById("bolck4_3").style.display="none";
		}
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12117A_20210604_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
