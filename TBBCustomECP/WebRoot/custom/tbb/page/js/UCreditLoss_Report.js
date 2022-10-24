var UCreditLoss_Report = {
	doLoad : function()
	{
		var tbb = clientData.urlArgs;
		document.getElementById("CustID").value				  = tbb.U_CustID;//身份證字號/統一編號
		document.getElementById("DateTime").value 			  = tbb.U_DateTime;//日期時間
		document.getElementById("PrimaryCreditName").value    = tbb.U_PrimaryCreditName;//正卡人姓名
		document.getElementById("PrimaryCredit").value 		  = tbb.U_PrimaryCredit;//正卡人卡號
		document.getElementById("SecondaryCreditName").value  = tbb.U_SecondaryCreditName;//副卡人姓名
		document.getElementById("SecondaryCredit").value 	  = tbb.U_SecondaryCredit;//附卡卡號
		document.getElementById("CallBackDate1").value 		  = tbb.U_CallBackDate1;//回撥時間1
	    document.getElementById("LossTime").value 			  = tbb.U_LossTime;//挂失时间
		document.getElementById("Mobile").value 			  = tbb.U_Mobile;//手机
		document.getElementById("Telnumber").value          = tbb.U_Telnumber;//住家电话
		document.getElementById("Branches").value 			  = tbb.U_Branches;//往来分行
		document.getElementById("OtherPhone").value 	      = tbb.U_OtherPhone;//其他联络电话
		document.getElementById("PrincipalName").value		  = tbb.U_PrincipalName;//姓名
		document.getElementById("PrincipalRelation").value 	  = tbb.U_PrincipalRelation;//关系
		document.getElementById("PrincipalPhone").value       = tbb.U_PrincipalPhone;//电话
	    document.getElementById("Foreign").value              = tbb.U_Foreign;//国外
		document.getElementById("CallBackOther1").value       = tbb.U_CallBackOther1;//其他1
		document.getElementById("LossReasonOther").value      = tbb.U_LossReasonOther;//其他(掛失原因)
		document.getElementById("SupplyCardOther").value      = tbb.U_SupplyCardOther;//其他(是否補卡)
		document.getElementById("RemarkOther").value          = tbb.U_RemarkOther;//其他(备注)
		document.getElementById("FUserId").value                = tbb.FUserId;//处理人员
		
		if(tbb.U_SendBranche!==null){
			document.getElementById("SendBranche").innerHTML           = tbb.U_SendBranche;//郵寄分行區域
		}
		if(tbb.U_SendBrancheName!==null){
			document.getElementById("SendBrancheName").innerHTML       = tbb.U_SendBrancheName;//郵寄分行名稱
		}
		
		document.getElementById("U_SendPhone").value          = tbb.U_SendPhone;//手機
		
		
     	//卡種
		if(tbb.U_CardKind==0){
			document.getElementsByName("KZ")[0].checked="checked";
		}else if(tbb.U_CardKind==1){
			document.getElementsByName("KZ")[1].checked="checked";
		}
		
		//持卡人
		if(tbb.U_Cardholder==0){
			document.getElementsByName("Cardholder")[0].checked="checked";
		}else if(tbb.U_Cardholder==1){
			document.getElementsByName("Cardholder")[1].checked="checked";
		}
		
		//通报人
		if(tbb.U_Notifiers==0){
			document.getElementsByName("Notifiers")[0].checked="checked";
		}else if(tbb.U_Notifiers==1){
			document.getElementsByName("Notifiers")[1].checked="checked";
		}else if(tbb.U_Notifiers==2){
			document.getElementsByName("Notifiers")[2].checked="checked";
		}
		
		//案件類型
		if(tbb.U_CaseType==0){
			document.getElementsByName("CaseType")[0].checked="checked";
		}else{
			document.getElementsByName("CaseType")[1].checked="checked";
		}

		
		//回撥人員1
		if(tbb.U_CallBackStaff1==0){
			document.getElementsByName("CallBackStaff1")[0].checked="checked";
			document.getElementById("CallBackOther3").style.display="none";
		}else if(tbb.U_CallBackStaff1==1){
			document.getElementsByName("CallBackStaff1")[1].checked="checked";
		}
		
		//回撥人員2
		if(tbb.U_CallBackStaff2==0){
			document.getElementsByName("CallBackStaff2")[0].checked="checked";
			document.getElementById("CallBackOther4").style.display="none";
		}else if(tbb.U_CallBackStaff2==1){
			document.getElementsByName("CallBackStaff2")[1].checked="checked";
			
		}
		
		//發生地點
		if(tbb.U_LocationOccur==0){
			document.getElementsByName("LocationOccur")[0].checked="checked";
			document.getElementById("Foreign1").style.display="none";
		}else if(tbb.U_LocationOccur==1){
			document.getElementsByName("LocationOccur")[1].checked="checked";
		}
		
		//掛失原因
		if(tbb.U_LossReason==0){
			document.getElementsByName("LossReason")[0].checked="checked";
			document.getElementById("LossReasonOther1").style.display="none";
		}else if(tbb.U_LossReason==1){
			document.getElementsByName("LossReason")[1].checked="checked";
			document.getElementById("LossReasonOther1").style.display="none";
		}else if(tbb.U_LossReason==2){
			document.getElementsByName("LossReason")[2].checked="checked";
			document.getElementById("LossReasonOther1").style.display="none";
		}else if(tbb.U_LossReason==3){
			document.getElementsByName("LossReason")[3].checked="checked";
			document.getElementById("LossReasonOther1").style.display="none";
		}else if(tbb.U_LossReason==4){
			document.getElementsByName("LossReason")[4].checked="checked";
		}
		
		//卡別
		if(tbb.U_CardSort==0){
			document.getElementsByName("CardSort")[0].checked="checked";
		}else if(tbb.U_CardSort==1){
			document.getElementsByName("CardSort")[1].checked="checked";
		}else if(tbb.U_CardSort==2){
			document.getElementsByName("CardSort")[2].checked="checked";
		}else if(tbb.U_CardSort==3){
			document.getElementsByName("CardSort")[3].checked="checked";
		}else if(tbb.U_CardSort==4){
			document.getElementsByName("CardSort")[4].checked="checked";
		}
		
		//是否補卡
		if(tbb.U_SupplyCard==0){
			document.getElementsByName("SupplyCard")[0].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==1){
			document.getElementsByName("SupplyCard")[1].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==2){
			document.getElementsByName("SupplyCard")[2].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==3){
			document.getElementsByName("SupplyCard")[3].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==4){
			document.getElementsByName("SupplyCard")[4].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==5){
			document.getElementsByName("SupplyCard")[5].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==6){
			document.getElementsByName("SupplyCard")[6].checked="checked";
			document.getElementById("SupplyCardOther1").style.display="none";
		}else if(tbb.U_SupplyCard==7){
			document.getElementsByName("SupplyCard")[7].checked="checked";
		}
		
		/*//掛失告知
		if(tbb.U_LossInform!=null){
		var args=tbb.U_LossInform.split(",");
			for(var i=0;i<13;i++){
				if(args[i]==0){
					document.getElementsByName("LossInform")[0].checked="checked";
				}else if(args[i]==1){
					document.getElementsByName("LossInform")[1].checked="checked";
				}else if(args[i]==2){
					document.getElementsByName("LossInform")[2].checked="checked";
				}else if(args[i]==3){
					document.getElementsByName("LossInform")[3].checked="checked";
				}else if(args[i]==4){
					document.getElementsByName("LossInform")[4].checked="checked";
				}else if(args[i]==5){
					document.getElementsByName("LossInform")[5].checked="checked";
				}else if(args[i]==6){
					document.getElementsByName("LossInform")[6].checked="checked";
				}else if(args[i]==7){
					document.getElementsByName("LossInform")[7].checked="checked";
				}else if(args[i]==8){
					document.getElementsByName("LossInform")[8].checked="checked";
				}else if(args[i]==9){
					document.getElementsByName("LossInform")[9].checked="checked";
				}else if(args[i]==10){
					document.getElementsByName("LossInform")[10].checked="checked";
				}else if(args[i]==11){
					document.getElementsByName("LossInform")[11].checked="checked";
				}else if(args[i]==12){
					document.getElementsByName("LossInform")[12].checked="checked";
					document.getElementById("LossInformOther").value = tbb.U_LossInformOther;//挂失告知其他
				}
			}
		}*/
		
		
		//備註
		if(tbb.U_Remark==0){
			document.getElementsByName("Remark")[0].checked="checked";
			document.getElementById("RemarkOther1").style.display="none";
			document.getElementById("SendBranche1").style.display="none";
		}else if(tbb.U_Remark==1){
			document.getElementsByName("Remark")[1].checked="checked";
			document.getElementById("RemarkOther1").style.display="none";
		}
		else if(tbb.U_Remark==2){
			document.getElementsByName("Remark")[2].checked="checked";
			document.getElementById("SendBranche1").style.display="none";
		}
		else{
			document.getElementById("RemarkOther1").style.display="none";
			document.getElementById("SendBranche1").style.display="none";
		}
		//是否發送簡訊
		if(tbb.U_IfSend==0){
			document.getElementsByName("U_IfSend")[0].checked="checked";
		}
		
	},
	doPrint : function()
	{	
		var body=document.getElementById("tbb");
		document.body.innerHTML=body.innerHTML;
		UCreditLoss_Report.doLoad();
		window.print();
		window.history.go(0);		
	}	
};
