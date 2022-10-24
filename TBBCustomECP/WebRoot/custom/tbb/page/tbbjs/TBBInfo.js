var TBBInfo = 
{
		doCsrQuery: function(trNo)
		{    			
			if(UCustID.doCheck()){	
				if(form.getFieldValue("U_CardKind")==null)
				{
					Jui.message.alert("請選擇卡種");
					return ;
				}
			    var args = {form:form.getData()};
			    args.form.F_TrNo = trNo;
			    args.form.U_PageCode ="S009";
			    //console.log(args.form);
			    if(form.getFieldValue("U_CustID").length==8){
			    	args.form.U_CustID = form.getFieldValue("U_CustID")+"  ";
				}
				args.form.U_PageStatus = " ";
				args.form.F_CardKind = form.getFieldValue("U_CardKind")+"               ";
				console.log("Cardking"+args.form.F_CardKind);
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
							form.setFieldValue("U_PositiveCardName",json.F_Info[0].F_PositiveCardName);
							form.setFieldValue("U_Address",json.F_Info[0].F_Address);
						}
					  //卡號資料有多筆
						else{				    	
							console.log(unitCode);
							//彈出多筆卡號資料清單
							Utility.openDialog("TBB.UNoReceiveInfo.page",args,true,function(ret){
								form.setFieldValue("U_PositiveCardName",ret.U_PositiveCardName);
								form.setFieldValue("U_Address",ret.U_Address);
													
							});	
						}					
				}					
					var U_Result = json.U_ErrorCode;
					var U_ResultExplain =json.U_ErrorMemo;
					form.setFieldValue("U_Result",U_Result);
					form.setFieldValue("U_ResultExplain",U_ResultExplain);
				});
			}else  {return false;}
			
		},

		
};
	        

		
		
