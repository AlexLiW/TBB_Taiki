 
var CsrJs = 
{  	
		doGateway : function()
		{    
			if (form.validate()){
			    var args = {form:form.getData()};
			    Utility.invoke("CSR.Gateway.getBankEditData", args, true, function(ret) {
			    	alert ('傳回值 :'+ ret.result) ;
			    	var json = JSON.parse(	ret.result	);
			 	    form.updateData(json);						
			    });		
			}
		},		
		
		doPopLoad : function()
		{   
			var errorcode = clientData.urlArgs.U_ErrorCode;
     	    errorcodeControl.setValue(errorcode);
		},
		
		doPopPreLoad : function ()
		{
			var U_ErrorCode = form.getFieldValue("U_ErrorCode");
			var args  = {U_ErrorCode :U_ErrorCode};
			Utility.openDialog("CSR.41005A.PopUp.page", args);
		},			
		doTCPIP : function()
		{    
			if (form.validate()){				 	
			    var args = {form:form.getData()};
			    Utility.invoke("CSR.Gateway.doTCPIP", args, true, function(ret) {
			    	alert ('傳回值 :'+ ret.result) ;
			    	var json = JSON.parse(ret.result);
			    	form.updateData(json);						
			    });		
			}
		},				 		
		
		doAlertNumber: function()
		{    
			var args = {entityId:clientData.entityId, form:form.getData()};
			Utility.invoke("單元編碼.java函式", args, true, function(ret) {			
			alert($text("Public.OperationSuccess"));
				EntityForm.reload(clientData.entityId);
			});					     	
		},			
		doTestAction : function () 
		{  	 
			Utility.invoke("PFT.pft.testAction", null, false, function(ret) {
				 alert (ret.result) ;
			});
		},		
		doShowData : function (getData) 
		{  	 alert('message') ;
			Utility.invoke("CSR.Gateway.showData", getData, false, function(ret) {
				 alert (ret.result) ;
			});
		},
		
		doSendWs:function ( ) 
		{  
			 var args = {form:form.getData()};
			 Utility.invoke("CSR.Gateway.sendWS", args, true, function(ret) {
			    Jui.message.hint('傳回值 :'+ ret.result) ;
				var json = JSON.parse(ret.result);
			 	form.updateData(json);
	        });		
		}, 	
		doCsrQuery: function(trNo)
		{    
			//alert(encodeURI("帳號錯誤") ) ;  顯示 16禁制馬			
			if (form.validate())
			{				 	
			    var args = {form:form.getData()};
			   // console.log(JSON.stringify(args));
			    args.form.F_TrNo = trNo;
		        Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
		          //  	alert ('傳回值 :'+ ret.result) ;
                 //	標準 alert方法     	Jui.message.hint($text("Public.SaveSuccess"));
			    var json = JSON.parse(	ret.result	);
		 	    form.updateData(json);
		        });		
		        Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
				 //   	alert ('傳回值 :'+ ret.result) ;
					var json = JSON.parse(	ret.result	);
				 	form.updateData(json);
		        });		 			        
			        
			}
		}
		
};		