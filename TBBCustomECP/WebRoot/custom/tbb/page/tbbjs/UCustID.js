var  UCustID={
	doCheck : function(){
	 
		var aaa = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z');
		var bbb = new Array(10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,30,31,32,33);
		var ccc = [];
		var U_CustID = form.getFieldValue("U_CustID");
		var first = null;
	    if(U_CustID==null){
		   Jui.message.alert("請您輸入客戶身份證字號/統一編號！");
		   return false;
		}else{
			if(U_CustID.length<=12){	
				var one = U_CustID.toLocaleUpperCase();
				U_CustID=one;
				form.setFieldValue("U_CustID",U_CustID);
			}
			return true;
				
		}
	}
};