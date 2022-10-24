var TBBContactForm ={
	doLoad:function(){
		if(form.hasControl("U_CustName")){
			form.getControl("U_CustName").onchange = TBBContactForm.syncName;
			form.getControl("U_CustName").fireEvent("onchange");
		}
		form.setFieldValue("U_CardKind",0);
		form.setFieldVisible("U_CardKind",false);	
	},
	
	syncName: function(event)
	{
		var U_CustName = form.getFieldValue("U_CustName");
		
		/* var name = lastName.concat(firstName);
		if (/^[a-zA-Z]+/.test(name)) {
			name = firstName.concat(" " + lastName).trim();
		} */
		form.setFieldValue("FName", U_CustName);
		// 新增當歸戶下只有0~1個身分時，歸戶姓名一併連動
		var contactGroupId = form.getFieldValue("FContactGroupId");
		var args = {contactGroupId:contactGroupId};		
		Utility.invoke("Ecp.ContactGroup.getContactCount", args, true, function(ret) {
			if (ret.count <= 1) {
				form.setFieldValue("FContactGroupName", name);
			}
		});
	},
	
	doOpenUGetForms : function(event){
		/* if (!EntityForm.validate()) {
			return;
		} */
		console.log(event);
		var fApplyForm = event.text;
		var fApplyId =event.id;
		var data = form.getData();
		data.fApplyForm = fApplyForm;
		data.fApplyId=fApplyId;
		//console.log(data);
		Utility.openDialog("TBB.UGetForms.LiaisonForm.page", data);
	},
	/********存款查詢流程**************/
	doOpenUDepositInquire : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UDepositInquire.Form.page", data);
	},
	/********基本資料流程**************/
	doOpenUBasicInformation : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UBasicInformation.Form.page", data);
	},
	/********發卡明細查詢**************/
	doOpenUCardDetail : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UCardDetail.Form.page", data);
	},
	/********金融端掛失**************/
	doOpenUDebitLoss : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UDebitLoss.LiaisonForm.page", data);
		//edit.getItem(""); 
	},
	
	doOpenFormm12111A  : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12111A.Form.page", data);
	},
	 
	doOpenFormm12112A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12112A.Form.page", data);
	},
	 
	doOpenFormm12113A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12113A.Form.page", data);
	},
	
	 
	doOpenFormm12114A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12114A.Form.page", data);
	},
		 
	doOpenFormm12115A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12115A.Form.page", data);
	},
	
	 
	doOpenFormm12116A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12116A.Form.page", data);
	},
		
	doOpenFormm12117A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12117A.Form.page", data);
	},
	
	doOpenFormm12118A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12118A.Form.page", data);
	},
	
	doOpenFormm12119A : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m12119A.Form.page", data);
	},
	
	doOpenFormm1211AA : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m1211AA.Form.page", data);
	},
	
	doOpenFormm1211BA : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m1211BA.Form.page", data);
	},
	
	doOpenFormm1211CA : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.m1211CA.Form.page", data);
	},
	
	doOpenUCreditLoss : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UCreditLoss.LiaisonForm.page", data);
	},
	doOpenUNoReceive : function(){
		var data = form.getData();
		//console.log(data);
		Utility.openDialog("TBB.UNoReceive.LiaisonForm.page", data);
	},
	doFinanceQuery : function(trNo){
		if(UCustID.doCheck()){	
			    var args = {form:form.getData()};
			    args.form.F_TrNo = trNo;
				args.form.F_CardKind ='';			
			    //console.log(args.form);
			    if(form.getFieldValue("U_CustID").length==8){
			    	args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}
		        Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
		        	var json = JSON.parse(	ret.result	);
		        	//console.log(json);
		        	form.updateData(json);
		        });		

		        Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					json.U_Birth=TBBContactForm.getBirth(json.U_Birth);
					form.updateData(json);
					var unitCode = clientData.urlArgs.unitCode;
					var title = document.title;
					var args = {
						json : json,
						unitCode : unitCode,
						title : title
					};
					if(json.U_ErrorCode=="OKLR"){
						//if卡號資料只有一筆
						if(json.U_GridCardStatus.length==1){
							form.setFieldValue("U_FinanceName",json.U_AccountName);
							form.setFieldValue("U_FinanceMobile",json.U_Mobile);
							form.setFieldValue("U_FinanceHomePhone",json.U_TelExt);
							form.setFieldValue("U_FinanceCustBirth",json.U_Birth);
							form.setFieldValue("U_FinanceAddress",json.U_Address);
							form.setFieldValue("U_FinanceNewsLetter",json.U_AddressMail);
						}
					  //卡號資料有多筆
						else{				    	
							//彈出多筆卡號資料清單
							Utility.openDialog("TBB.FinanceInfo.page",args,true,function(ret){
								form.setFieldValue("U_FinanceName",ret.U_FinanceName);
								form.setFieldValue("U_FinanceMobile",ret.U_FinanceMobile);
								form.setFieldValue("U_FinanceHomePhone",ret.U_FinanceHomePhone);
								form.setFieldValue("U_FinanceCustBirth",ret.U_Birth);
								form.setFieldValue("U_FinanceAddress",ret.U_FinanceAddress);
								form.setFieldValue("U_FinanceNewsLetter",ret.U_FinanceNewsLetter);
							});	
						}
					}	
				});
			}else  {return false;}
		
	},
	doCreditCardsQuery : function(trNo){
		if(UCustID.doCheck()){	
			    var args = {form:form.getData()};
			    args.form.F_TrNo = trNo;
				args.form.F_CardKind ="C"+"               ";
				args.form.U_PageCode ="S009";
			    //console.log(args.form);
			    if(form.getFieldValue("U_CustID").length==8){
			    	args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}
		        Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
		        	var json = JSON.parse(	ret.result	);
		        	//console.log(json);
		        	form.updateData(json);
		        });		

		        Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					form.updateData(json);
					console.log(json);
					 var Info = json.F_Info.length-1;
					 
						form.setFieldValue("U_ErrorCode",json.F_Info[Info].F_MSGCOD);
						form.setFieldValue("U_PageStatus",json.F_Info[Info].F_MSGCOD);
												
						var PageNum = json.F_Info.length;
											   
						form.setFieldValue("U_PageNum",PageNum);
						if(json.F_Info[Info].F_MSGCOD=="OKLR"){
							console.log(JSON.stringify(json.F_Info[Info]));
							
							var unitCode = clientData.unitCode;
							var title = document.title;
							var args = {
								json : json,
								unitCode : unitCode,
								title : title
							};
							console.log(json);
							console.log(json.F_Info[Info]);
							for(var i=0;i<json.F_Informa.length;i++){
								console.log(json.F_Informa[i]);
							}			
	
							//if卡號資料只有一筆
							if(json.F_Informa.length==1){
								console.log("qqqqq");
								form.setFieldValue("U_CreditName",json.F_Informa[0].F_AppendName);
								form.setFieldValue("U_CreditMobile",json.F_Info[0].F_Mobile);
								form.setFieldValue("U_CreditHomePhone",json.F_Info[0].F_Tel1);
								form.setFieldValue("U_CreditCompanyPhone",json.F_Info[0].F_Tel2);
								form.setFieldValue("U_CreditBranch",json.F_Info[0].F_branch);
								form.setFieldValue("U_CreditAddress",json.F_Info[0].F_Address);
							}
						  //卡號資料有多筆
							else{				    	
								//彈出多筆卡號資料清單
								Utility.openDialog("TBB.CreditCardsInfo.page",args,true,function(ret){
									form.setFieldValue("U_CreditName",ret.U_CreditName);
									form.setFieldValue("U_CreditMobile",ret.U_CreditMobile);
									form.setFieldValue("U_CreditHomePhone",ret.U_CreditHomePhone);
									form.setFieldValue("U_CreditCompanyPhone",ret.U_CreditCompanyPhone);
									form.setFieldValue("U_CreditBranch",ret.U_CreditBranch);
									form.setFieldValue("U_CreditAddress",ret.U_CreditAddress);
								});	
							}
							
						}							
				});
			}else  {return false;}
		
	},
	getBirth : function(Birth) {
		var year=(Number(Birth.substr(0,3))+1911).toString();
		console.log(year);
		var curDateTime=year;
		var month = Birth.substr(3,2);
		var date = Birth.substr(5,2);
		if(month>9)
		curDateTime = curDateTime +"-"+month;
		else
		curDateTime = curDateTime +"-0"+month;
		if(date>9)
		curDateTime = curDateTime +"-"+date;
		else
		curDateTime = curDateTime +"-0"+date;
		console.log(curDateTime);
		return curDateTime;
	}
};
Jui.event.attach(window, 'load', TBBContactForm.doLoad);