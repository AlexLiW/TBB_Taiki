var Info = 
{
		doCsrQuery: function(trNo)
		{    			
			if(Identify.doCheck()){	
			    var args = {form:form.getData()};
			    args.form.F_TrNo = trNo;
			    console.log(args.form);
			    if(form.getFieldValue("F_Identify").length==8){
			    	args.form.F_Identify = form.getFieldValue("F_Identify")+"  ";
				}

					args.form.U_PageStatus = " ";
					args.form.F_CardKind = form.getFieldValue("F_CardKind")+"               ";
					form.setFieldValue("U_PageNum","0");

//args.form.U_PageNum = PageNum;
		        Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
		        	var json = JSON.parse(	ret.result	);
		        	//console.log(json);
		        	form.updateData(json);
		        });		

		        Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
					var json = JSON.parse(	ret.result	);
					console.log(json);

					if(trNo=="TVO2MBBT"){
					if(json.U_PageStatus=="OKLR" && json.U_PageStatus!=null){
						form.setFieldValue("U_PageNum",1);
						form.updateData(json);
					}else{
						alert("MSGCOD不是OKLR");
					}
						
					}
					else if(trNo=="NB01"){
						form.updateData(json);
					 var Info = json.F_Info.length-1;
					 //console.log(json.F_Info[4].F_MSGCOD);
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
		    	form.setFieldValue("F_HomePhone",json.F_Info[0].F_Tel1);
		    	form.setFieldValue("F_CompanyPhone",json.F_Info[0].F_Tel2);
		    	form.setFieldValue("F_MobilePhone",json.F_Info[0].F_Mobile);
		    	form.setFieldValue("F_UserName",json.F_Info[0].F_OwnerName);
		    	form.setFieldValue("F_Branch",json.F_Info[0].F_branch);
		    	form.setFieldValue("F_CardNumber",json.F_Informa[0].F_CreditCardNo);
			//form.setFieldValue("F_Address",json.F_Info[0].F_Address);
		    }
		  //卡號資料有多筆
		    else{				    	
		    	console.log(unitCode);
		    	//彈出多筆卡號資料清單
		    	Utility.openDialog("TBB.Info.page",args,true,function(ret){
				if(unitCode!="TBB.m1211AA"){
				form.setFieldValue("F_HomePhone",json.F_Info[0].F_Tel1);
		    	form.setFieldValue("F_CompanyPhone",json.F_Info[0].F_Tel2);
		    	form.setFieldValue("F_MobilePhone",json.F_Info[0].F_Mobile);
				}
		    	form.setFieldValue("F_UserName",json.F_Info[0].F_OwnerName);
		    	form.setFieldValue("F_Branch",json.F_Info[0].F_branch);
			//form.setFieldValue("F_Address",json.F_Info[0].F_Address);
		    		for(var i=0;i<ret.length;i++){
					if(ret.length==1){
						if(unitCode=="TBB.m1211AA" || unitCode=="TBB.m1211BA"){
								form.setFieldValue("F_AppendName",ret[i].F_AppendName);
								form.setFieldValue("F_CreditCardNo",ret[i].F_CardNo);
								form.setFieldValue("F_ID",ret[i].F_ID);
								var F_CreditType = null;
								if(ret[i].F_CreditType=="正卡"){
									F_CreditType = 0;
								}else if(ret[i].F_CreditType=="附卡"){
									F_CreditType = 1;
								}
								form.setFieldValue("F_PMCard",F_CreditType);
								
								
						}
						else{
								form.setFieldValue("F_EnglishName",json.F_Info[0].F_OwnerEname);
								form.setFieldValue("F_CardNumber",ret[i].F_CardNo);
								form.setFieldValue("F_Sex",ret[i].F_Sex);
						}
					}
		    		else{
						if(unitCode=="TBB.m1211AA" || unitCode=="TBB.m1211BA"){
								form.setFieldValue("F_AppendName",ret[i].F_AppendName);
								form.setFieldValue("F_CreditCardNo",ret[i].F_CardNo);
								form.setFieldValue("F_ID",ret[i].F_ID);
								var F_CreditType = null;
								if(ret[i].F_CreditType=="正卡"){
									F_CreditType = 0;
								}else if(ret[i].F_CreditType=="附卡"){
									F_CreditType = 1;
								}
								form.setFieldValue("F_PMCard",F_CreditType);
								
								
						}
						else{
							if(i==0){
									form.setFieldValue("F_EnglishName",json.F_Info[0].F_OwnerEname);
									form.setFieldValue("F_CardNumber",ret[i].F_CardNo);
									form.setFieldValue("F_Sex",ret[i].F_Sex);
							}
							else if(i==1){								
									form.setFieldValue("F_UserName1",ret[i].F_AppendName);
									form.setFieldValue("F_EnglishName1",ret[i].F_AppendEname);
									form.setFieldValue("F_Sex1",ret[i].F_Sex);
									form.setFieldValue("F_CardNumber1",ret[i].F_CardNo);								
							}
							else if(i==2){
								form.setFieldValue("F_UserName2",ret[i].F_AppendName);
								form.setFieldValue("F_EnglishName2",ret[i].F_AppendEname);
								form.setFieldValue("F_Sex2",ret[i].F_Sex);
								form.setFieldValue("F_CardNumber2",ret[i].F_CardNo);
								
								
							}
						}
					}
				}					
		    	});	
		    }
					}
					}});}else  {return false;}
			
		},

		
};
	        

		
		
