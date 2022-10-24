var CustomInfo = 
{
	doCsrQuery: function(trNo)
	{    			
		if(UCustID.doCheck()){
			var args = {form:form.getData()};
			args.form.F_TrNo = trNo;
			//args.form.F_CardKind ="C"+'               ';
			console.log(args.form);
			var account=[];
			if(form.getFieldValue("U_CustID").length==8){
				args.form.U_CustID = form.getFieldValue(U_CustID)+"  ";
			}


			Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
				var json = JSON.parse(	ret.result	);
				form.updateData(json);
			});		

			Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
				var json = JSON.parse(	ret.result	);
				//console.log(ret.result);
				//console.log(json);
				form.updateData(json);
				//key value 
				for(var i=0;i<json.U_GridCardStatus.length;i++){
					var act = {};
					act.value = json.U_GridCardStatus[i].U_gAccountNum;
					act.text = json.U_GridCardStatus[i].U_gAccountNum;
					account.push(act)
				}
				//console.log(account);
				/* form.setFieldValue("U_AccountNumberSystem",account); */
				 form.getControl("U_AccountNumberSystem").loadItems(account);
			});
	}
	else  {return false;}
		
	}, 

		
};
	        

		
		
