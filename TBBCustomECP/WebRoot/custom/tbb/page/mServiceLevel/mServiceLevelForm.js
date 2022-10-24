//服務水準
var mServiceLevelForm ={
	doLoad : function()
	{
		/***************************************************************************
		 * Author: AI\Yuwen.Wang; 
		 * CreateDate: 2022/03/10
		 * Description: 服務水準
		 * 
		 * input parameters: N/A
		 * 
		 * output parameters: N/A
		 * 
		 * LastUpdateUser: AI\Yuwen.Wang; 
		 * LastUpdateDate: 2022/03/23
		 * Note: 
		 **************************************************************************/
			var x = 0;//更新次數
			var y=0;
			//新增 img和div 的tag
	　　　　var img = document.createElement("img");
			var div = document.createElement("div");
			var div2 = document.createElement("div");
			
	　　　　//設定 img 相關屬性
	　　　　img.setAttribute("id", "newImg"); //給予id屬性名稱
			img.src = "/ecp/custom/image/green.png";//設定 img 圖片位置
			img.style.position="absolute";
			//設定顯示位置
			img.style.left="80pt";	
			img.style.width="900pt";
			img.style.height="100pt";
			img.style.cssFloat  = "right";
			//設定一開始不顯示
			img.style.display="none";
			img.style.zIndex = 1; //設定顯示上下層位置(數字越大 物件顯示越上層)
				
			//設定 div 屬性
			div.setAttribute("id", "newDiv");
			div.style.position="absolute";			
			//設定顯示位置
			div.style.left="100pt";
			div.style.top="30pt";
			//div.style.top="20pt";
			div.style.fontSize="30pt";//設定文字大小
			//div.style.fontSize="40pt";//設定文字大小
			div.style.cssFloat  = "right";
			div.style.zIndex = 2; //設定顯示上下層位置(數字越大 物件顯示越上層)
			
			//設定 div 屬性
			div2.setAttribute("id", "newDiv2");
			div2.style.position="absolute";			
			//設定顯示位置
			div2.style.left="600pt";
			div2.style.top="70pt";
			//div.style.top="20pt";
			div2.style.fontSize="20pt";//設定文字大小
			//div.style.fontSize="40pt";//設定文字大小
			div2.style.cssFloat  = "right";
			div2.style.zIndex = 2; //設定顯示上下層位置(數字越大 物件顯示越上層)
			

			//取得mServiceLevelForm.jsp內div Service的class屬性名稱 新增img和div的tag
			var classname = document.getElementsByClassName('Service')[0].appendChild(img);
			classname = document.getElementsByClassName('Service')[0].appendChild(div);
			classname = document.getElementsByClassName('Service')[0].appendChild(div2);
			
			document.getElementById("newDiv").innerHTML ="";	//將div的文字清空
			document.getElementById("newDiv2").innerHTML ="";	//將div的文字清空
			document.getElementById("newImg").style.display="block"; //顯示圖片
			mServiceLevelForm.doSelect(x);
			
			
			
	},
	//取得服務水準資訊
	doSelect : function(x)
	{
		//每更新一次就加1
		//console.log(x);
		
		x++;
		
	//x++;
		
		
		//console.log("1"+x);
		
		//取得當下時間(年和月)
			var today=new Date();
			var YY=today.getFullYear();
			var MM=today.getMonth()+1;
			var DD=today.getDate();
			console.log("當下年月份為="+YY+"年"+MM+"月"+DD+"日");
			
			MM = MM < 10 ? '0'+ MM : MM; //05
			DD = DD < 10 ? '0'+ DD : DD; //05
			
			//取得當下時間(年和月)
			var nowDate = new Date(new Date().toLocaleDateString());
			var yesterday = new Date(nowDate.getTime()-24*60*60*1000);
			var YY_yesterday=yesterday.getFullYear();
			var MM_yesterday=yesterday.getMonth()+1;
			var DD_yesterday=yesterday.getDate();
			
			MM_yesterday = MM_yesterday < 10 ? '0'+ MM_yesterday : MM_yesterday; //05
			DD_yesterday = DD_yesterday < 10 ? '0'+ DD_yesterday : DD_yesterday; //05
			
			console.log("昨天日期為="+YY_yesterday+"年"+MM_yesterday+"月"+DD_yesterday+"日");
			
			
			var tomorrow = new Date(nowDate.getTime()+24*60*60*1000);
			var YY_tomorrow=tomorrow.getFullYear();
			var MM_tomorrow=tomorrow.getMonth()+1;
			var DD_tomorrow=tomorrow.getDate();
			
			MM_tomorrow = MM_tomorrow < 10 ? '0'+ MM_tomorrow : MM_tomorrow; //05
			DD_tomorrow = DD_tomorrow < 10 ? '0'+ DD_tomorrow : DD_tomorrow; //05
			
			console.log("明天日期為="+YY_tomorrow+"年"+MM_tomorrow+"月"+DD_tomorrow+"日");
			
			
			//計算這個月的最後一天
			/*var currentDay= new Date(YY,MM,0);
			var currentYear = currentDay.getFullYear();  //2019
			var currentMonth = currentDay.getMonth() + 1;  //5
			currentMonth = currentMonth < 10 ? '0'+ currentMonth : currentMonth; //05
			var day = currentDay.getDate();  //31
			day = day < 10 ? '0'+day : day;  //31*/
			
			
				
			//取得專案參數的設定
			var ServiceSLT = CommonBusiness.getFieldValue("CUS.CustomParameter", "0800c056-5000-441f-060a-17f01ff62ef0", "U_Value"); // 服務水準_SLT秒數
			var DatasourceID = CommonBusiness.getFieldValue("CUS.CustomParameter", "0800c056-5000-441f-060a-17f0204f4e50", "U_Value"); // 服務水準_Datasource對應DB的ID設定
			var over_Seconds=CommonBusiness.getFieldValue("CUS.CustomParameter", "0800c056-5000-1c4e-0102-17f718637a80", "U_Value"); // 服務水準_更新秒數設定
			
			console.log("服務水準_SLT秒數：" + ServiceSLT);	
			console.log("服務水準_Datasource對應DB的ID設定：" + DatasourceID);	
			console.log("服務水準_更新秒數設定：" + over_Seconds+"(單位:秒)");	
			
			//var Date_Start=currentYear+currentMonth; //當月
			//var Date_End=currentYear+currentMonth+day; //當月的最後一天日
			//console.log("當月的年月：" + Date_Now);	
			//console.log("上個月的年月日：" + Date_Now);	
			var Date_Now=YY+MM+DD;
			var Date_Yesterday=YY_yesterday+MM_yesterday+DD_yesterday;
			var Date_tomorrow=YY_tomorrow+MM_tomorrow+DD_tomorrow;

			console.log("當月的年月日：" + Date_Now);
			console.log("昨天年月日：" + Date_Yesterday);
			console.log("明天年月日：" + Date_tomorrow);
			
				
			var args = {
					"ServiceSLT":ServiceSLT,
					"DatasourceID":DatasourceID,
					"Date_Start":Date_Now,
					"Date_End":Date_Now,
					"current_YYYYMM":YY+MM,
					"Date_Yesterday":Date_Yesterday,
					"Date_tomorrow":Date_tomorrow
				
				};
				console.log("上送到jar的參數："+JSON.stringify(args));
				Utility.invoke("TBB.mServiceLevel.doServiceLevel",args,true, function(result) {
					console.log("查詢回傳結果："+JSON.stringify(result));
					
					var U_O_Slt_CNT="";
					var U_O_Sum_CNT="";
					var U_O_ServiceLevel="";
					var U_O_HangUp_CNT="";
					var InCallLostPercen="";
					
					U_O_Slt_CNT = result.SLTInCallCnt;
					//U_O_Sum_CNT = result.InCallCnt;
					U_O_Sum_CNT = parseInt(result.SLTInCallAnsCnt)+parseInt(result.NotSLTInCallAnsCnt);
					U_O_ServiceLevel = Math.round(result.U_O_ServiceLevel)+"%";
					U_O_HangUp_CNT = result.InCallLost;
					InCallLostPercen = Math.round(result.InCallLostPercen)+"%";
					
					console.log("slt秒數內接聽與掛斷通數："+U_O_Slt_CNT);
					console.log("總進線量："+U_O_Sum_CNT);
					console.log("服務水準(四捨五入前)："+result.U_O_ServiceLevel);
					console.log("服務水準："+U_O_ServiceLevel);
					console.log("掛斷數："+U_O_HangUp_CNT);
					console.log("掛斷率(四捨五入前)："+result.InCallLostPercen);
					console.log("掛斷率："+InCallLostPercen);

					

					if(!Jui.object.isEmpty(U_O_Slt_CNT)){
						document.getElementById("newImg").style.display="block";
						document.getElementById("newDiv").innerHTML="服務水準 "+U_O_ServiceLevel+"&emsp;總應答電話通數 "+U_O_Sum_CNT+"&emsp;掛斷數 "+U_O_HangUp_CNT+"&emsp;掛斷率 "+InCallLostPercen;			
						document.getElementById("newDiv2").innerHTML="更新次數："+x+"次";			
						
					}else{
						document.getElementById("newDiv").innerHTML="服務水準 100%&emsp;總應答電話通數 0&emsp;掛斷數 0&emsp;掛斷率 0%";
						document.getElementById("newDiv2").innerHTML="更新次數："+x+"次";
					}
				
				
				
				});
				//設定倒數機制 如果秒數扣到0，會觸發time的方法
				var interval;
				interval=setInterval(test,1000);
				function test(){
					over_Seconds--;	
					//console.log(over_Seconds);

					if(over_Seconds == 0){
						
						clearInterval(interval); //清除執行test方法的動作
						mServiceLevelForm.time(x);
					}	
				}
				
				//20220310 Yuwen.Wang 新增服務水準至ECP頁面 End
	},
	//會在執行doSelect方法
	time : function(x){	
		
		setTimeout(function(){mServiceLevelForm.doSelect(x)}, 1000);

		
	}

};
Jui.event.attach(window, "load", function(){
	mServiceLevelForm.doLoad();
});