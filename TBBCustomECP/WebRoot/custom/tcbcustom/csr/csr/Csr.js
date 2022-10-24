var CsrJs = 
{  	
	version : "1.0", 
	doSendWs:function()
	{  
		var args = {form:form.getData()};
		Utility.invoke("CSR.Gateway.sendWS", args, true, function(ret) {
		    Jui.message.hint(ret.result) ;
			var json = JSON.parse(ret.result);
		 	form.updateData(json);
        });		
	}, 	
	
	doCsrQuery: function(trNo)
	{    
		if (form.validate()){				 	
		    var args = {form:form.getData()};
		    args.form.F_TrNo = trNo;
	        Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret){
			    var json = JSON.parse(ret.result);
		 	    form.updateData(json);
		 	    Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret){
					var json = JSON.parse(	ret.result	);
				 	form.updateData(json);
		        });
	        });		
	        		 			        
		}
	}
};		