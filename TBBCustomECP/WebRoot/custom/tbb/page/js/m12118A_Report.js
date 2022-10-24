var m12118A_Report ={
		doLoad : function ()
		{
			var id = clientData.urlArgs.id;
			Utility.invoke("TBB.m12118A.select",{id:id},true,function(ret){
				var m12118A = ret.json;				
				var tb = document.getElementById("tb"); 
				for (var i = 0; i < m12118A.length; i++) { 
					var row = tb.insertRow(tb.rows.length);
					var c1 = row.insertCell(0); 
					c1.innerHTML = m12118A[i].F_Datetime; 
					var c2 = row.insertCell(1); 
					c2.innerHTML = m12118A[i].F_Cardholdernumber; 
					var c3 = row.insertCell(2); 
					c3.innerHTML = m12118A[i].F_Cardholder; 
					var c4 = row.insertCell(3); 
					c4.innerHTML = m12118A[i].F_Cardholdersex; 
					var c5 = row.insertCell(4); 
					c5.innerHTML = m12118A[i].F_CardEnglishname; 
					var c6 = row.insertCell(5); 
					c6.innerHTML = m12118A[i].A; 
					var c7 = row.insertCell(6); 
					c7.innerHTML = m12118A[i].B; 
					var c8 = row.insertCell(7); 
					c8.innerHTML = m12118A[i].F_SupportstaffId; 
					var c9 = row.insertCell(8); 
					c9.innerHTML = m12118A[i].F_Remark; 
				}  
								
				});
		},
};

