var CreditCardsInfo = {
		doLoad : function(args)
		{
			var args = clientData.urlArgs;
			var length = args.json.F_Informa.length;	
			console.log("length="+length);
			document.title=args.title;
			var U_CreditMobile = args.json.F_Info[0].F_Mobile;
			var U_CreditHomePhone = args.json.F_Info[0].F_Tel1;
			var U_CreditCompanyPhone = args.json.F_Info[0].F_Tel2;
			var U_CreditBranch = args.json.F_Info[0].F_branch;		
			var tb = document.getElementById("tb"); 
			for (var i = 0; i < length; i++) { 	
				
					var row = tb.insertRow(tb.rows.length);
					var c1 = row.insertCell(0); 
					c1.innerHTML = '<input type="radio" name="checkbox"/>'; 					
					var c2 = row.insertCell(1); 
					c2.innerHTML = args.json.F_Informa[i].F_AppendName;
					var c3 = row.insertCell(2); 
					c3.innerHTML = U_CreditMobile;
					var c4 = row.insertCell(3); 
					c4.innerHTML = U_CreditHomePhone; 
					var c5 = row.insertCell(4); 
					c5.innerHTML = U_CreditCompanyPhone; 
					var c6 = row.insertCell(5); 
					c6.innerHTML = args.json.F_Informa[i].F_CreditCardNo;
					var c7 = row.insertCell(6); 
					c7.innerHTML = U_CreditBranch; 					
			}			
		},
		
		
		doChecked : function()
		{	
			var args = clientData.urlArgs;	
			var a = document.getElementsByTagName('input');
			var U_CreditAddress =args.json.F_Info[0].F_Address
		    var arg=null;
			var nums=0;
		    var array=[];
		    for (var i = 0; i < a.length; i++) {    		
				   if(a[i].checked){  
					   
						nums++;	
						
				   }
			}
		    if(nums>1){
				Jui.message.alert("只能选择一笔资料");
				return;	 
			}else if(nums==0){
				Jui.message.alert("請選擇至少一筆資料");
				return;	
			}
			else{
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
							console.log("***********");	
							console.log(Card[0]);	
							console.log(Card);								
							arg = {
								    U_CreditName 			: Card[0],    		
									U_CreditMobile 			: Card[1],    		
									U_CreditHomePhone 		: Card[2],	  		
									U_CreditCompanyPhone 	: Card[3],	  		
									F_CreditCardNo		 	: Card[4],    		
									U_CreditBranch			: Card[5],     			
									U_CreditAddress	    	: U_CreditAddress     
							};
							//console.log("arg=  "+JSON.stringify(arg));	
							//將每個對象都存放在array數組中
							array[0]=arg;
						console.log(array[0])    			   	    	  			        
					}
				}
			}
			
				Jui.message.confirm("確定選擇此筆資料帶入？！",  function(){Utility.closeDialog(array[0]);});
			/* if(Jui.message.confirm("確定選擇此筆資料帶入？！")){ 
				//遍歷數組，清除為空的元素
				
				//關閉頁面，返回數組參數
			    Utility.closeDialog(array);
			}else{ 
			    return; 
			}  */
		        				        
		}	

};
