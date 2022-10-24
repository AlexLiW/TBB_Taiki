
var  Identify={
doCheck : function(){
 
			var aaa = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z');
			var bbb = new Array(10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,30,31,32,33);
			var ccc = [];
			var F_Identify = form.getFieldValue("F_Identify");
			var first = null;
            if(F_Identify==null){
			   Jui.message.alert("請您輸入身份證字號/統一編號！");
			   return false;
			}else{
				if(F_Identify.length<=12){	
					//var str = /^[A-Za-z]*$/;
					
						var one = F_Identify.toLocaleUpperCase();
						F_Identify=one;
						form.setFieldValue("F_Identify",F_Identify);
						
					
				}
				return true;
					
			}
/*	        
			if(F_Identify.length==10){	
			var str = /^[A-Za-z]*$/;
			if (str.test(F_Identify.substring(0,1))){
				var one = F_Identify.substring(0,1).toLocaleUpperCase ();
				F_Identify=one+F_Identify.substring(1,10);
				form.setFieldValue("F_Identify",F_Identify);		
			for(var j = 0;j<F_Identify.length;j++){
				ccc[j]=F_Identify.substring(j,j+1);
			}
			for(var i=0;i<aaa.length;i++){
				if(aaa[i]==ccc[0]){
					first=bbb[i];				
				}
			}
			if(ccc[1]==2 || ccc[1]==1){
				var sum = parseInt(first/10)+first%10*9+ccc[1]*8+ccc[2]*7+ccc[3]*6+ccc[4]*5+ccc[5]*4+ccc[6]*3+ccc[7]*2+ccc[8]*1+ccc[9]*1;
				if(sum%10!=0){
					Jui.message.alert("您輸入的身份證字號不正確！");
					return false;
				}else {return true;}
			}
			else{
				Jui.message.alert("您輸入的身份證字號的第二位不正確！");
				return false;
			}
			}else{Jui.message.alert("身份證字號必須以字母開頭");return false;}
			}
						//統一編號的驗證
			else if(F_Identify.length==8){
				var cx = new Array(1,2,1,2,1,2,4,1);
				var n,SUM = 0;
				var cnum = F_Identify.split("");
				//console.log("cunm數組的值為："+cnum)
				if (!(/^\d+$/.test(F_Identify))) {
					 Jui.message.alert("統編錯誤，要有 8 個 0-9 數字組合");
					 return false;
				}else{
					for (var i=0; i<=7; i++) {
					n=cnum[i] * cx[i];
					//console.log("數組n的值為："+n);
						if (cnum[i] * cx[i] > 9) {
							var s = cnum[i] * cx[i] + "";
							var n1 = s.substring(0,1) * 1;
							var n2 = s.substring(1,2) * 1;
							n = n1 + n2;
							//console.log(s+'\n'+n1+'\n'+n2+'\n'+n);
						}
						SUM+=n;	
					}
					//console.log(SUM);
					if (SUM % 10 == 0){
return true;}
					else if (cnum[6] == 7 && (SUM + 1) % 10 == 0) {return true;}
					else {Jui.message.alert("統一編號："+F_Identify+" 錯誤!");		return false;}	
				}	
			}
			else Jui.message.alert("身份証號碼/統編錯誤，身份証號碼要有 10 個數字,統編要有 8 個數字");*/

   

 }
   };
 /*  EntityForm.validate = function()
        {
		return EntityForm.$validate() && Identify.doCheck();
};*/
	