var m12117A_Report = {
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

		
		document.getElementById("ChangMoney1").value 		= Common.doCheckNumber(tbb.F_Lixi);//利息調減金額
		document.getElementById("Remark").value 			= tbb.F_Remark;//備註
		document.getElementById("FisposeId").value 			= tbb.F_CustomerId;//處理人員
		document.getElementById("FisposeDepaetmentId").value = tbb.F_DepartmentId;//處理部門
		
		document.getElementById("ChangMoney").value 		= Common.doCheckNumber(tbb.F_Wyuej);//違約金調減金額

		//var number=tbb.F_Wyuej;
/*		if(parseInt(number)==number)
		{
//			alert('是整数');
			var newStr=new Array(number.length+parseInt(number.length/3));   
			var strArray=number.split("");
			newStr[newStr.length]=strArray[strArray.length-1];   
			var currentIndex=strArray.length-1;   
			for(var i=newStr.length-1;i>0;i--){   
				if((newStr.length-i)%4==0){   
						newStr[i]=",";   
				}  
				else{   
					newStr[i]=strArray[currentIndex--];   
				}   
			}
			var num = newStr.join("");
//			alert(num);
		}
		
		
//		var num=18000; 
//		console.log(cutStr(num+""));

/*			number += '';
			var x = number.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			alert(x1 + x2);
		}
		*/
		
		
		//卡種
		if(tbb.F_CardKind=='C'){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.F_CardKind=='D'){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		//減調類型
		if(tbb.F_ChangType!=null){
			var s = tbb.F_ChangType.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("JTL")[s[i]].checked="checked";
			}
		}
		
		//帳單月份
		if(tbb.F_BillMonth!=null){
			var s = tbb.F_BillMonth.split(",");
			for(var i=0;i<s.length;i++){
				document.getElementsByName("BillMonth")[s[i]].checked="checked";
			}
		}

		//減調原因
		
		if(tbb.F_DerateReason==0){
			document.getElementsByName("JTY")[0].checked="checked";
		}else if(tbb.F_DerateReason==1){
			document.getElementsByName("JTY")[1].checked="checked";
		}
		
		//年減免次數
		if(tbb.F_YearDerateNo==0){
			document.getElementsByName("NJ")[0].checked="checked";
		}else if(tbb.F_YearDerateNo==1){
			document.getElementsByName("NJ")[1].checked="checked";
		}else{
			document.getElementsByName("NJ")[2].checked="checked";
		}
		if(tbb.U_AnnulTimes!=null){
			document.getElementById("NJ1").value			= tbb.U_AnnulTimes; //減免次數
		}
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		m12117A_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
