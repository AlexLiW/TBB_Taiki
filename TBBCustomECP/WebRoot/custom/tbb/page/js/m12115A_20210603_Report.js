/********************************************************************************
	 帳務組客戶問題單 報表 20210603版
	 * Author			: gemfor\Lillian
	 * CreateDate		: 2021.06.04
	 * LastUpdateUser	: gemfor\Lillian 
	 * LastUpdateDate	: 2021.06.04 
	 * Note: 
*********************************************************************************/
var m12115A_20210603_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value		    	= tbb.F_Identify;        				//身份證字號
		document.getElementById("SystemTime").value 		= tbb.F_Datetime;						//日期時間
		document.getElementById("HomePhone").value 		    = tbb.F_HomePhone;						//住家電話
		document.getElementById("CompanyPhone").value 	    = tbb.F_CompanyPhone;					//公司電話
		document.getElementById("MobilePhone").value 		= tbb.F_MobilePhone;					//手機
		document.getElementById("TcardName").value 			= tbb.F_UserName;						//正卡人姓名
		document.getElementById("TcardID").value 			= tbb.F_CardNumber;						//正卡人卡號
		document.getElementById("Branch").value 			= tbb.F_Branch;							//往來分行
		document.getElementById("Year").value 	            = tbb.F_Year;							//賬單年
		document.getElementById("Tuiyijin").value 	        = Common.doCheckNumber(tbb.F_Tuiyijin);	//退溢金額
		document.getElementById("Zhanghu").value 	        = tbb.F_Zhanghu;						//賬戶
		document.getElementById("Fenhang").value 	        = tbb.F_Fenhang;						//分行區域
		document.getElementById("FenhangName").value 	    = tbb.F_BranchName;						//分行名稱
		document.getElementById("Money").value 		        = Common.doCheckNumber(tbb.F_Money);	//取消回饋金額
		document.getElementById("content").value 			= tbb.F_Chenshu;						//服務項目4問題陳述
	    document.getElementById("ChuliId").value 		    = tbb.F_CustomerId;						//處理人員
		document.getElementById("U_AnnulThisYear").value	= tbb.U_AnnulThisYear;        			//今年減免次數
		document.getElementById("U_AnnulReason").value		= tbb.U_AnnulReason;        			//減免次數其他
		
		document.getElementById("DisCard1").value			= tbb.U_DisCard1;        					//減免卡號1
		document.getElementById("DisCard2").value			= tbb.U_DisCard2;        					//減免卡號2
		document.getElementById("DisCard3").value			= tbb.U_DisCard3;        					//減免卡號3
		document.getElementById("DisCardAMT1").value		= Common.doCheckNumber(tbb.U_DisCardAMT1);  //減免卡號1金額
		document.getElementById("DisCardAMT2").value		= Common.doCheckNumber(tbb.U_DisCardAMT2);  //減免卡號2金額
		document.getElementById("DisCardAMT3").value		= Common.doCheckNumber(tbb.U_DisCardAMT3);  //減免卡號3金額
		//2021.09.09-gemfor/lillian-此提醒事項字眼，列印時不需顯示
		//document.getElementById("Notice").value				= tbb.U_Notice;        						//提醒事項
		document.getElementById("Chenshu").value			= tbb.U_Chenshu;        					//服務項目1問題陳述
		document.getElementById("TransBankNo").value		= tbb.U_TransBankNo;        				//匯款行庫
		document.getElementById("Fkh").value				= tbb.U_TransBch;        					//分行別
		// 2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位
		document.getElementById("U_Chenshu2").value 		= tbb.U_Chenshu2;						//服務項目2問題陳述
		
		if(tbb.F_DepartmentId == "作業科"){
			document.getElementById("DepartId").value		= "信用卡部 " + tbb.F_DepartmentId;			//處理部門
		}if(tbb.F_DepartmentId == "信用卡作業科"){
			document.getElementById("DepartId").value		= "信用卡部作業科";
		}else{
			document.getElementById("DepartId").value		= tbb.F_DepartmentId;
		}
		
		//2021.09.09-lillian-將此區塊從列印頁上移除
		/*if(tbb.U_Describe!=null){
			document.getElementById("U_Describe").innerHTML           = tbb.U_Describe;
		}*/
		   
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
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
		
		//減免原因
		if(tbb.F_Jianmian=="0"){
			document.getElementsByName("CT1")[0].checked="checked";
			document.getElementById("U_AnnulReason1").style.display="none";
		}else if(tbb.F_Jianmian=="1"){
			document.getElementsByName("CT1")[1].checked="checked";
			document.getElementById("U_AnnulReason1").style.display="none";
		}else if(tbb.F_Jianmian=="2"){
		    document.getElementsByName("CT1")[2].checked="checked";
		}else{
			document.getElementById("U_AnnulReason1").style.display="none";
		}
		
		//案件類型
		if(tbb.U_CaseType== "0"){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		//服務項目1
		if(tbb.U_CutYM=="0"){
			document.getElementsByName("CutYM")[0].checked="checked";
		}else if (tbb.U_CutYM=="1"){
			document.getElementsByName("CutYM")[1].checked="checked";
		}
		
		//服務項目2
		if(tbb.F_Tuiyifukuan=="0"){
			document.getElementById("Tuiyifukuan").checked="checked";
		}
		//服務項目3
		if(tbb.F_Qx=="0"){
			document.getElementById("Qx").checked="checked";
		}
		//服務項目4
		if(tbb.F_Other=="0"){
			document.getElementById("Other").checked="checked";
		}
		//減免方式
		if(tbb.F_JianWay=="0"){
			document.getElementsByName("CT")[0].checked="checked";
		}else if(tbb.F_JianWay=="1"){
			document.getElementsByName("CT")[1].checked="checked";
		}else if(tbb.F_JianWay=="2"){
			document.getElementsByName("CT")[2].checked="checked";
		}
		
		//退款方式
		if(tbb.F_Style == "0"){//本行帳戶
			document.getElementsByName("sl")[0].checked="checked";
			document.getElementById("bolck1_2").style.display="none";
			document.getElementById("bolck1_3").style.display="none";
			document.getElementById("bolck1_4").style.display="none";
			document.getElementById("bolck1_5").style.display="none";
		}else if(tbb.F_Style == "1"){//匯款他行
			document.getElementsByName("sl")[1].checked="checked"; 
			document.getElementById("bolck1_2").style.display="none";
			document.getElementById("bolck1_3").style.display="none";
		}else if(tbb.F_Style == "2"){//退支票
			document.getElementsByName("sl")[2].checked="checked";
			document.getElementById("bolck1_1").style.display="none";
			document.getElementById("bolck1_4").style.display="none";
			document.getElementById("bolck1_5").style.display="none";
		}else{
			document.getElementById("bolck1_1").style.display="none";
			document.getElementById("bolck1_2").style.display="none";
			document.getElementById("bolck1_3").style.display="none";
			document.getElementById("bolck1_4").style.display="none";
			document.getElementById("bolck1_5").style.display="none";
		}
		
		//取消原因
		if(tbb.F_Reason == "0"){
			document.getElementsByName("FR")[0].checked="checked";
		}else if(tbb.F_Reason==1){
			document.getElementsByName("FR")[1].checked="checked";
		}	
		//2021.09.09-lillian-將此區塊從列印頁上移除
		/*if(tbb.U_Against == "0"){
			document.getElementsByName("U_Against")[0].checked="checked";
		}else if(tbb.U_Against == "1"){
			document.getElementsByName("U_Against")[1].checked="checked";
		}*/
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12115A_20210603_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
