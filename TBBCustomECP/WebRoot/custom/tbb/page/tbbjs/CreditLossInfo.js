var CreditLossInfo = {
		doLoad : function(args)
		{
			var args = clientData.urlArgs;
			var length = args.json.F_Informa.length;	
			console.log("length="+length);
			document.title=args.title;		
			var tb = document.getElementById("tb"); 
			for (var i = 0; i < length; i++) { 	
				
					var row = tb.insertRow(tb.rows.length);
					var c1 = row.insertCell(0); 
					c1.innerHTML = '<input type="radio" name="checkbox"/>'; 
					var c2 = row.insertCell(1); 
					if(args.json.F_Informa[i].F_CreditType==0)
					{
						c2.innerHTML = "正卡";	
					}else if(args.json.F_Informa[i].F_CreditType==1)
					{
						c2.innerHTML = "附卡";
					}									
					var c3 = row.insertCell(2); 
					c3.innerHTML = args.json.F_Informa[i].F_AppendName;
					var c4 = row.insertCell(3); 
					c4.innerHTML = args.json.F_Informa[i].F_ID;
					var c5 = row.insertCell(4); 
					c5.innerHTML =args.json.F_Informa[i].F_CardKind; 
					var c6 = row.insertCell(5); 
					c6.innerHTML = args.json.F_Informa[i].F_CreditCardNo; 					
			}			
		},
		
		
		doChecked : function()
		{	
			var args = clientData.urlArgs;
			var F_PositiveCardName = args.json.F_Info[0].F_PositiveCardName;
			var U_Mobile = args.json.F_Info[0].F_Mobile;
			var U_Telnumber	= args.json.F_Info[0].F_Tel1;
			var U_Branches = args.json.F_Info[0].F_branch;
			var a = document.getElementsByTagName('input');
		    var arg=null,nums=0;
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
						//for循環一行的列長度，并取出每個單元格中的數據放在str字符串中		    		    		     
						if(tds[1].innerHTML=="正卡"){
							for(var j = 1;j < tds.length;j++){  		     
								str = str + tds[j].innerHTML + "*";  		    			   
							
							
							//拆分字符串str，並將拆分后的數據放在args對象中
							var Card = str.split("*");		    		   
							arg = {
										F_CreditType 			: Card[0],    		
										F_AppendName 			: Card[1],    		
										F_CreditCardNo 			: Card[4],	  		
										F_Mobile 				: U_Mobile,	  		
										F_Tel1		 			: U_Telnumber,    		
										F_branch				: U_Branches
							};
							
							}
							//console.log("arg=  "+JSON.stringify(arg));	
							//將每個對象都存放在array數組中
							array[0]=arg;
						}
						else if(tds[1].innerHTML=="附卡"){								
								var index = row.rowIndex-2;
								for(var x=index;x>=0;x--){
									var row1 = a[x].parentElement.parentElement.cells[1].innerHTML;									
									if(row1=="正卡"){
										row1 = a[x].parentElement.parentElement;
										var tds1 = row1.cells;
										for(var j = 1;j < tds1.length;j++){  		     
											str = str + tds1[j].innerHTML + "*";  		    			   
										
											
											//拆分字符串str，並將拆分后的數據放在args對象中
											var Card = str.split("*");		    		   
											arg = {
													F_CreditType 			: Card[0],    		
													F_AppendName 			: Card[1],    		
													F_CreditCardNo 			: Card[4],	  		
													F_Mobile 				: U_Mobile,	  		
													F_Tel1		 			: U_Telnumber,    		
													F_branch				: U_Branches
											};
												
										}
										//console.log("arg1111=  "+JSON.stringify(arg));
											//將每個對象都存放在array數組中
											array[0]=arg;
									}								
								}
								//console.log(row);
								//console.log(row.cells[1].innerHTML);
								var	str1="";
							for(var j = 1;j < tds.length;j++){
														
								str1 = str1 + tds[j].innerHTML + "*";  
								//console.log("这是str="+str1);
								//拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str1.split("*");		    		   
								arg = {
										F_CreditType 			: Card[0],    		
										F_AppendName 			: Card[1],    		
										F_CreditCardNo 			: Card[4],	  		
										F_Mobile 				: U_Mobile,	  		
										F_Tel1		 			: U_Telnumber,    		
										F_branch				: U_Branches
								};
								
							}
							//console.log("arg=  "+JSON.stringify(arg));
								//將每個對象都存放在array數組中
								array[1]=arg;			       
						}
						else{
							for(var j = 1;j < tds.length;j++){  		     
								str = str + tds[j].innerHTML + "*";  		    			   
							
							
							//拆分字符串str，並將拆分后的數據放在args對象中
							var Card = str.split("*");		    		   
							arg = {
										F_CreditType 			: Card[0],    		
										F_AppendName 			: F_PositiveCardName,    		
										F_CreditCardNo 			: Card[4],	  		
										F_Mobile 				: U_Mobile,	  		
										F_Tel1		 			: U_Telnumber,    		
										F_branch				: U_Branches
							};
							
							}
							//console.log("arg=  "+JSON.stringify(arg));	
							//將每個對象都存放在array數組中
							array[0]=arg;
							
						}
					}
				}
			}
			
				Jui.message.confirm("確定選擇此筆資料帶入？！",  function(){Utility.closeDialog(array);});
			/* if(Jui.message.confirm("確定選擇此筆資料帶入？！")){ 
				//遍歷數組，清除為空的元素
				
				//關閉頁面，返回數組參數
			    Utility.closeDialog(array);
			}else{ 
			    return; 
			}  */
		        				        
		}	

};
