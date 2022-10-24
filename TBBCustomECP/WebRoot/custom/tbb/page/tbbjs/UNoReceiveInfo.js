
var UNoReceiveInfo = {
		doLoad : function(args)
		{
			var args = clientData.urlArgs;
			var length = args.json.F_Informa.length;
	
			console.log("length="+length);
			document.title=args.title;
			var U_PositiveCardName =args.json.F_Info[0].F_PositiveCardName; 
			var  U_Address =args.json.F_Info[0].F_Address;
			var tb = document.getElementById("tb"); 
			for (var i = 0; i < length; i++) { 
				
				
					var row = tb.insertRow(tb.rows.length);
					var c1 = row.insertCell(0); 
					c1.innerHTML = '<input type="radio" name="checkbox"/>'; 
					
					var c2 = row.insertCell(1); 
					c2.innerHTML = U_PositiveCardName;
					var c3 = row.insertCell(2); 
					c3.innerHTML =  U_Address;
					var c4 = row.insertCell(3); 
					c4.innerHTML = args.json.F_Informa[i].F_CreditCardNo; 
			}			
		},
		
		
		doChecked : function()
		{	
			var args = clientData.urlArgs;
			var a = document.getElementsByTagName('input');
		    var arg=null;
		    var array=[];
			
				for (var i = 0; i < a.length; i++) {						
					if(a[i].checked){  
						var row = a[i].parentElement.parentElement; 		    		   
						var tds = row.cells; 
						var str = "";
						//console.log(tds[1].innerHTML);
						//for循環一行的列長度，并取出每個單元格中的數據放在str字符串中		    		    		     
						for(var j = 1;j < tds.length;j++){  		     
								str = str + tds[j].innerHTML + "*";  		    			   
							} 
							//console.log("这是str="+str);
							//拆分字符串str，並將拆分后的數據放在args對象中
							var Card = str.split("*");
							console.log(Card);								
							arg = {
									U_PositiveCardName 	: Card[0],
									U_Address 	: Card[1],
									F_CreditCardNo 		: Card[2]
							};
							//console.log("arg=  "+JSON.stringify(arg));	
							//將每個對象都存放在array數組中
							array[0]=arg;
						console.log(array[0])    			   	    	  			        
					}
				}
			
				Jui.message.confirm("確定選擇此筆資料帶入？",  function(){Utility.closeDialog(array[0]);});
			/* if(Jui.message.confirm("確定選擇此筆資料帶入？！")){ 
				//遍歷數組，清除為空的元素
				
				//關閉頁面，返回數組參數
			    Utility.closeDialog(array);
			}else{ 
			    return; 
			}  */
		        				        
		}	

};
