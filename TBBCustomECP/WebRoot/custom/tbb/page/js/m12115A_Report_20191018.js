var m12115A_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("IdCard").value		    	= tbb.F_Identify;        //身份證字號
		document.getElementById("SystemTime").value 		= tbb.F_Datetime;//日期時間
		document.getElementById("HomePhone").value 		    = tbb.F_HomePhone;//住家電話
		document.getElementById("CompanyPhone").value 	    = tbb.F_CompanyPhone;//公司電話
		document.getElementById("MobilePhone").value 		= tbb.F_MobilePhone;//手機
		document.getElementById("TcardName").value 			= tbb.F_UserName;//正卡人姓名
		document.getElementById("TcardID").value 			= tbb.F_CardNumber;//正卡人卡號
		document.getElementById("Branch").value 			= tbb.F_Branch;//往來分行
		document.getElementById("FuName").value 			= tbb.F_UserName1;//附卡人姓名
		document.getElementById("Fukahao").value 			= tbb.F_CardNumber1;//附卡卡號
		document.getElementById("Yearamount").value 	    = Common.doCheckNumber(tbb.F_Yearamount);//年費金額
		document.getElementById("Year").value 	            = tbb.F_Year;//賬單年
		document.getElementById("Tuiyijin").value 	        = Common.doCheckNumber(tbb.F_Tuiyijin);//退溢金額
		document.getElementById("Zhanghu").value 	        = tbb.F_Zhanghu;//賬戶
		document.getElementById("Fenhang").value 	        = tbb.F_Fenhang;//分行
		document.getElementById("FenhangName").value 	    = tbb.F_BranchName;//分行名稱
        document.getElementById("Weijin").value 		    = Common.doCheckNumber(tbb.F_Weijin);//未入賬金額
		document.getElementById("Jkrq").value 		        = tbb.F_Jkrq;//繳款日期
		document.getElementById("Fkh").value 		        = tbb.F_Fkh;//付款行
		document.getElementById("Money").value 		        = Common.doCheckNumber(tbb.F_Money);//取消回饋金額
		document.getElementById("DMoney").value 		    = Common.doCheckNumber(tbb.F_DMoney);//調賬金額
		document.getElementById("JMoney").value 		    = Common.doCheckNumber(tbb.F_JMoney);//減免金額
		document.getElementById("content").value 			= tbb.F_Chenshu;//問題陳述區
	    document.getElementById("ChuliId").value 		    = tbb.F_CustomerId;//處理人員
		document.getElementById("DepartId").value 		    = tbb.F_DepartmentId;//處理部門
		document.getElementById("U_AnnulThisYear").value	= tbb.U_AnnulThisYear;        //今年減免次數
		document.getElementById("U_AnnulReason").value		= tbb.U_AnnulReason;        //減免次數其他
		if(tbb.U_Describe!=null){
			document.getElementById("U_Describe").innerHTML           = tbb.U_Describe;
		}
		   
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		
		//帳單月份
		if(tbb.F_BillMonth!=null){
			var s = tbb.F_BillMonth.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("BillMonth")[s[i]].checked="checked";
			}
		}
		//減免原因
		if(tbb.F_Jianmian==null){
			document.getElementById("U_AnnulReason1").style.display="none";
			document.getElementById("U_AnnulReason1").style.display="none";
			document.getElementById("U_AnnulReason1").style.display="none";
		}
		if(tbb.F_Jianmian=='0'){
			document.getElementsByName("CT1")[0].checked="checked";
			document.getElementById("U_AnnulReason1").style.display="none";
		}else if(tbb.F_Jianmian=='1'){
			document.getElementsByName("CT1")[1].checked="checked";
			document.getElementById("U_AnnulReason1").style.display="none";
		}else if(tbb.F_Jianmian=='2'){
		    document.getElementsByName("CT1")[2].checked="checked";
		    
		}
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		//服務項目1
		if(tbb.F_CutYM=="0"){
			document.getElementById("CutYM").checked="checked";
		}
		
		//服務項目2
		if(tbb.F_Tuiyifukuan=="0"){
			document.getElementById("Tuiyifukuan").checked="checked";
		}
		//服務項目3
		if(tbb.F_Weiruzhang=="0"){
			document.getElementById("Weiruzhang").checked="checked";
		}
		//服務項目4
		if(tbb.F_Qx=="0"){
			document.getElementById("Qx").checked="checked";
		}
		//服務項目5
		if(tbb.F_Diaozhang=="0"){
			document.getElementById("Diaozhang").checked="checked";
		}
		//服務項目6
		if(tbb.F_Jian=="0"){
			document.getElementById("Jian").checked="checked";
			document.getElementById("Service_6").style.color="red";
		}
		//服務項目7
		if(tbb.F_Other=="0"){
			document.getElementById("Other").checked="checked";
		}
		//減免方式
		if(tbb.F_JianWay==0){
			document.getElementsByName("CT")[0].checked="checked";
		}else if(tbb.F_JianWay==1){
			document.getElementsByName("CT")[1].checked="checked";
		}else if(tbb.F_JianWay==2){
			document.getElementsByName("CT")[2].checked="checked";
		}
		//退款方式
		if(tbb.F_Style==0){
			document.getElementsByName("sl")[0].checked="checked";
		}else if(tbb.F_Style==1){
			document.getElementsByName("sl")[1].checked="checked";
		}
		//取消原因
		if(tbb.F_Reason==0){
			document.getElementsByName("FR")[0].checked="checked";
		}else if(tbb.F_Reason==1){
			document.getElementsByName("FR")[1].checked="checked";
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
		m12115A_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
