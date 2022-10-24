
var FinanceInfo = {
		doLoad : function(args)
		{
			var args = clientData.urlArgs;
			var length = args.json.U_GridCardStatus.length;	
			console.log("length="+length);
			document.title=args.title;
			var U_FinanceName =args.json.U_AccountName; 
			var U_FinanceHomePhone = args.json.U_TelExt;
			var U_FinanceMobile = args.json.U_Mobile;			
			var tb = document.getElementById("tb"); 
			for (var i = 0; i < length; i++) { 	
				
					var row = tb.insertRow(tb.rows.length);
					var c1 = row.insertCell(0); 
					c1.innerHTML = '<input type="checkbox" name="checkbox"/>'; 					
					var c2 = row.insertCell(1); 
					c2.innerHTML = U_FinanceName;
					var c3 = row.insertCell(2); 
					c3.innerHTML = args.json.U_GridCardStatus[i].U_gAccountNum;
					var c4 = row.insertCell(3); 
					c4.innerHTML = args.json.U_GridCardStatus[i].U_gSort; 
					var c5 = row.insertCell(4); 
					c5.innerHTML = U_FinanceHomePhone; 
					var c6 = row.insertCell(5); 
					c6.innerHTML = U_FinanceMobile; 
			}			
		},
		
		
		doChecked : function()
		{	
			var args = clientData.urlArgs;
			var U_Birth=args.json.U_Birth;
			var U_Address=args.json.U_Address;
			var U_AddressMail=args.json.U_AddressMail;
			var a = document.getElementsByTagName('input');
		    var nums=0,arg=null;
		    var array=[];
			
			
		    for (var i = 0; i < a.length; i++) {    		
				   if(a[i].checked){  
					   
						nums++;	
						
				   }
			}
			
			if(nums>1)
			{
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
								    U_FinanceName 			: Card[0],    		//姓名
									U_gAccountNum 			: Card[1],    		//帳號
									U_gSort 				: Card[2],	  		//卡片種類
									U_FinanceHomePhone 		: Card[3],	  		//住家電話
									U_FinanceMobile 		: Card[4],    		//手機
									U_Birth					: U_Birth,     		//生日
									U_FinanceAddress		: U_Address,   		//戶籍地址
									U_FinanceNewsLetter	    : U_AddressMail     //通訊地址
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
