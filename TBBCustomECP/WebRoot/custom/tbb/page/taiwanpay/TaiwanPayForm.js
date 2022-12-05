/********************************************************************************
	 台灣PAY查詢
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.11.01
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.11.09
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
	 *							
	 *      
	 *                          
	 *                          
	 *                          
*********************************************************************************/
var TaiwanPayForm = {

	doLoad : function() {
		/*form.setFieldVisible("U_STime", false);//隱藏指定期間時間欄位
		form.setFieldVisible("U_ETime", false);//隱藏指定期間時間欄位
		TaiwanPayForm.doOnchangSelTime();//查詢時間下拉判斷欄位顯示*/
		TaiwanPayForm.setOnchange();
		form.setFieldVisible("U_Grid", false);//隱藏網格
		form.setFieldVisible("U_Grid2", false);//隱藏網格
		TaiwanPayForm.doOnchangSelType();//查詢類型下拉判斷網格顯示
		
		
		form.getControl("U_Button").onclick = function() {
			form.getControl("U_Grid").setValue();//清空網格
			form.getControl("U_Grid2").setValue();//清空網格
			TaiwanPayForm.doCheckNull();//檢查欄位是否為空，並判斷執行852||854
			
		};
	},
	
	doN852 : function() { //電文N852
		//Jui.message.alert("N852");
		
		console.log("進入N852");
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		var STime = form.getFieldValue("U_STime");
		var ETime = form.getFieldValue("U_ETime");
		TaiwanPayForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		TaiwanPayForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "N852",
			"BANKID" : cusidn, // 身分證
			"TPAN" : STime.substr(0,4)-1911+STime.substr(5,2)+STime.substr(8,2),
			"SIR" : ETime.substr(0,4)-1911+ETime.substr(5,2)+ETime.substr(8,2),
			"TRTYPE":"123",
			"TRCNUM":"123",
			"EVENTP":"123",
			"BALNTP":"123",
			
		};
		var args = JSON.stringify({
			"name" : "N852tbbapi",
			"from" : "CSR",
			"sessionId" : TaiwanPayForm.sessionId,
			"agentId" : TaiwanPayForm.agentId,
			"formData" : data,
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
			}
            	
               	if (ret.isSuccess == true) {
					console.log("電文資料OK");
					if ((ret.form.RESULT == "00"|| ret.form.RESULT == "01"|| ret.form.RESULT =="02"|| ret.form.RESULT =="03"|| ret.form.RESULT =="04"|| ret.form.RESULT =="99")){ //判斷交易結果說明(欄位)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-d55e-310b-18450c45d680"}).data; // TBB-台灣PAY狀態查詢
						var RESULTtxt = ret.form.RESULT;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.RESULT) {
								RESULTtxt = codeDic[i].text;
								break;
							}
						}	
						console.log("交易代碼說明"+":"+RESULTtxt); 
						form.setFieldValue("U_TransactionResult", ret.form.RESULT);
						form.setFieldValue("U_TransactionResults", RESULTtxt);
					
				}
				
				console.log("ret.form.RESUL"+":"+ret.form.RESULT);
				if (ret.form.RESULT !="00") { //判斷交易結果(彈跳視窗)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-d55e-310b-18450c45d680"}).data; // TBB-台灣PAY狀態查詢
						var RESULTtxt = ret.form.RESUL;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.RESULT) {
								RESULTtxt = codeDic[i].text;
								break;
							}
						}	
						Jui.message.alert("錯誤：" + RESULTtxt);
						return;
				}
				
				var U_O_Data = [];//網格1
				var formData = ret.form;
				var MEMSTATE ="";
					if(formData.MEMSTATE==00){					
						 MEMSTATE = "未啟用";
						
					}
					else if(formData.MEMSTATE==01){
						MEMSTATE = "已啟用";
						
					}
					else if(formData.MEMSTATE==02){
						MEMSTATE = "已終止";	
					}		

				var record = {//網格1內容
								
							U_MStatus:MEMSTATE,
							U_TDividends:"NULL",
							U_PBTY:TaiwanPayForm.dothousandComma(formData.BALANCE1),
							U_PBLY:TaiwanPayForm.dothousandComma(formData.BALANCE2),
							U_Tmonth:TaiwanPayForm.dothousandComma(formData.ADDTSMON),
							U_Plimit:TaiwanPayForm.dothousandComma(formData.ADDLIMON),
							U_CStatus:formData.REDSTATE,
							U_DAmount:TaiwanPayForm.dothousandComma(formData.POINTAMT),
		
				};
				U_O_Data.push(record);
				form.getControl("U_Grid").setValue(U_O_Data);
				document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[6].width = '100px';
				var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格金額靠右
					for(var i = 1; i < Billamount.length; i++){
								var tds = Billamount[i].getElementsByTagName("td");
								tds[2].style.textAlign = 'right';
								tds[3].style.textAlign = 'right';
								tds[4].style.textAlign = 'right';
								tds[5].style.textAlign = 'right';
								tds[7].style.textAlign = 'right';
								
					}
				
				}else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				

			
		
			
			});
		
		
		
	},
	
	doN854 : function() { //電文N854
		console.log("進入N854");
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		var STime = form.getFieldValue("U_STime");
		var ETime = form.getFieldValue("U_ETime");
		TaiwanPayForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		TaiwanPayForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TRTYPE": "1",
			"BANKID" : cusidn, // 身分證
			"STADATE" : STime.substr(0,4)-1911+STime.substr(5,2)+STime.substr(8,2),
			"ENDDATE" : ETime.substr(0,4)-1911+ETime.substr(5,2)+ETime.substr(8,2),
			"POINTP":"123",
			"SIR":"123",
			"TPAN":"123",
			"TRCNUM":"123",
			
		};
		var args = JSON.stringify({
			"name" : "N854tbbapi",
			"from" : "CSR",
			"sessionId" : TaiwanPayForm.sessionId,
			"agentId" : TaiwanPayForm.agentId,
			"formData" : data,
		});
		console.log(args);
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
			}
            if (ret.isSuccess) {
                // 電文回傳狀態
            	
               	if (ret.isSuccess == true) {
					console.log("電文資料OK");
					if ((ret.form.RESULT == "00"|| ret.form.RESULT == "01"|| ret.form.RESULT =="02"|| ret.form.RESULT =="03"|| ret.form.RESULT =="04"|| ret.form.RESULT =="99")){ //判斷交易結果說明(欄位)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-d55e-310b-18450c45d680"}).data; // TBB-台灣pay查詢狀態
						var RESULTtxt = ret.form.RESULT;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.RESULT) {
								RESULTtxt = codeDic[i].text;
								break;
							}
						}	
						console.log("交易代碼說明"+":"+RESULTtxt); 
						form.setFieldValue("U_TransactionResult", ret.form.RESULT);
						form.setFieldValue("U_TransactionResults", RESULTtxt);
					
				}
				
				console.log("ret.form.RESUL"+":"+ret.form.RESULT);
				if (ret.form.RESULT !="00") { //判斷交易結果(彈跳視窗)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-d55e-310b-18450c45d680"}).data; // TBB-台灣PAY狀態查詢
						var RESULTtxt = ret.form.RESUL;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.RESULT) {
								RESULTtxt = codeDic[i].text;
								break;
							}
						}	
						Jui.message.alert("錯誤：" + RESULTtxt);
						return;
				}
				console.log("ret.form"+ret.form);
				var U_O_Data = [];//網格2
				var formData = ret.form;
				console.log("formData"+formData);
				var U_Time = formData.REC[0].TXTIME.substr(0, 4) + "/" + formData.REC[0].TXTIME.substr(4, 2) + "/" + formData.REC[0].TXTIME.substr(6, 2)+"  "+formData.REC[0].TXTIME.substr(8, 2)+":"+formData.REC[0].TXTIME.substr(10, 2)+":"+formData.REC[0].TXTIME.substr(12, 2); // 交易時間格式yyyy/mm/dd HH:mm:ss

				var record = {//網格2內容
								
							U_TTime:U_Time,
							U_TType:formData.REC[0].TXTYPE,
							U_TAmount:"NULL",
							U_Deduction:"NULL",
							U_Repayment:"NULL",
							U_AddPoints:TaiwanPayForm.dothousandComma(formData.REC[0].TXPTAD),
							U_Rpoints:TaiwanPayForm.dothousandComma(formData.REC[0].TXPTDE),
							U_Points:TaiwanPayForm.dothousandComma(formData.REC[0].TXALLP),
							U_TNumber:"NULL",
							U_SSNCode:"特店名稱 :"+formData.REC[0].TXMCNM+"\r\n"+"特店代號 :"+formData.REC[0].TXMCID,
							U_Acquirer:formData.REC[0].TXABNK,
							U_TradingTools:formData.REC[0].TXTOOL,
							U_FeeName:formData.REC[0].TXARNM,
							U_PointName:"NULL",
		
				};
				U_O_Data.push(record);
				form.getControl("U_Grid2").setValue(U_O_Data);
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[0].width = '140px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[1].width = '40px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[2].width = '100px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[3].width = '100px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[4].width = '125px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[5].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[6].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[7].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[8].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[9].width = '100px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[11].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[12].width = '65px';
				document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[13].width = '65px';
				var Billamount = document.getElementsByClassName("JuiGridTable")[1].getElementsByTagName("tr");//網格金額靠右
					for(var i = 1; i < Billamount.length; i++){
								var tds = Billamount[i].getElementsByTagName("td");
								tds[2].style.textAlign = 'right';
								tds[3].style.textAlign = 'right';
								tds[4].style.textAlign = 'right';
								tds[5].style.textAlign = 'right';
								tds[6].style.textAlign = 'right';
								tds[7].style.textAlign = 'right';
								
					}				
				}else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			}
		
			
			});
		
	},
	
	doOnchangSelType : function() { //查詢類型下拉判斷網格顯示
		form.getControl("U_SelType").onchange = function(){
			if(form.getFieldValue("U_SelType") == 1){
				form.setFieldVisible("U_Grid", true);
				form.setFieldVisible("U_Grid2", false);
			}else{
				form.setFieldVisible("U_Grid2", true);
				form.setFieldVisible("U_Grid", false);
			}
		};
	},
	
	doOnchangSelTime : function() { //查詢時間下拉判斷欄位顯示
		form.getControl("U_SelTime").onchange = function(){
			if(form.getFieldValue("U_SelTime") == 5){
				form.setFieldVisible("U_STime", true);
				form.setFieldVisible("U_ETime", true);
			}else{
				form.setFieldVisible("U_STime", false);
				form.setFieldVisible("U_ETime", false);
			}
		};
	},
	
	doN852OR854 : function() { //選擇執行電文
		if(form.getFieldValue("U_SelType") == 1){					
					TaiwanPayForm.doN852();
			}
			else if(form.getFieldValue("U_SelType") == 2){
					TaiwanPayForm.doN854();
			}	
	},
	
	
	doCheckNull : function() { //檢查欄位空值&選擇執行電文
		if(form.getFieldValue("U_SelTime") == 5){
			if(form.getFieldValue("U_STime")==null||form.getFieldValue("U_ETime")==null||form.getFieldValue("U_ID")==null||form.getFieldValue("U_SelType")==null){
				Jui.message.alert("欄位有空，請輸入完整資料");
			}
			else{
				TaiwanPayForm.doN852OR854();
			}
		}

		else if (form.getFieldValue("U_SelTime") == null ||form.getFieldValue("U_ID")==null||form.getFieldValue("U_SelType")==null){
					Jui.message.alert("欄位有空，請輸入完整資料");
			
		}
		else {
			TaiwanPayForm.doN852OR854();
		}
	},
	
	setOnchange : function(){

			form.getControl("U_SelTime").onchange=TaiwanPayForm.itemControl;//時間區間
			
			form.getControl("U_STime").onchange=function(){
				var today = new Date();
				var U_StartDT = form.getFieldValue("U_STime");
				var U_EndDT = form.getFieldValue("U_ETime");
				if(Date.parse(U_StartDT).valueOf() > Date.parse(today)){
					Jui.message.alert("選擇之日期大於今日！");
					form.setFieldValue("U_STime", null);
					return;
				}
				
				
				if(U_StartDT != null && U_EndDT != null){
					var startDT = new Date(U_StartDT);
					var endDT = new Date(U_EndDT);
					var endDT_before60day = new Date(U_EndDT);
					var endDT_before60day_S = endDT_before60day.getTime();
					if(Date.parse(U_StartDT).valueOf() > Date.parse(U_EndDT)){
						Jui.message.alert("起日不得大於迄日！");
						form.setFieldValue("U_StartDT", null);
						return;
					}
				}
				
			};
			
			form.getControl("U_ETime").onchange=function(){
				var today = new Date();
				var U_StartDT = form.getFieldValue("U_STime");
				var U_EndDT = form.getFieldValue("U_ETime");
				if(Date.parse(U_EndDT).valueOf() > Date.parse(today)){ //20220309 add by gemfor\Emma -- 查詢迄日檢核是否超過當日
					Jui.message.alert("選擇之日期大於今日！");
					form.setFieldValue("U_ETime", null);
					return ; //20220309 add by gemfor\Emma -- 查詢迄日提醒框以是否超過當日為先
				}
				
				
				
			};
			
		},
	//控制項觸發後動作
		itemControl : function(){
			var U_SelTime = form.getFieldValue("U_SelTime");
			var today = new Date(); //20220309 add by gemfor\Emma 
			if(U_SelTime == "當日"){
				form.setFieldDisabled("U_STime", true);
				form.setFieldDisabled("U_ETime", true);
				var today = new Date();
				form.setFieldValue("U_STime", today);
				form.setFieldValue("U_ETime", today);
			}else if(U_SelTime == "當月"){
				form.setFieldDisabled("U_STime", true);
				form.setFieldDisabled("U_ETime", true);
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
			    var firstDay = new Date(year, month, 1);
			    //var lastDay = new Date(year, month + 1, 0);//20220309 add by gemfor\Emma
			    form.setFieldValue("U_STime", firstDay);
				form.setFieldValue("U_ETime", today);//20220309 add by gemfor\Emma -- 查詢迄日只到當日
			}else if(U_SelTime == "最近一星期"){
				form.setFieldDisabled("U_STime", true);
				form.setFieldDisabled("U_ETime", true);
				var today = new Date();
				var beforeDay = new Date(today);
				beforeDay.setDate(today.getDate() - 7);
			    form.setFieldValue("U_STime", beforeDay);
				form.setFieldValue("U_ETime", today);
			}else if(U_SelTime == "最近一個月"){
				form.setFieldDisabled("U_STime", true);
				form.setFieldDisabled("U_ETime", true);
				var today = new Date();
				var beforeDay = new Date(today);
				beforeDay.setDate(today.getDate() - 30);
			    form.setFieldValue("U_STime", beforeDay);
				form.setFieldValue("U_ETime", today);
			}else if(U_SelTime == "指定期間"){
				form.setFieldValue("U_STime", null);
				form.setFieldValue("U_ETime", null);
				form.setFieldDisabled("U_STime", false, true);
				form.setFieldDisabled("U_ETime", false, true);
			}else{
				form.setFieldDisabled("U_STime", true);
				form.setFieldDisabled("U_ETime", true);
				form.setFieldValue("U_STime", null);
				form.setFieldValue("U_ETime", null);
			}

		},	
		dothousandComma : function(number) {//千分位
        var num = number.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while (pattern.test(num)) {
            num = num.replace(pattern, "$1,$2");
        }
        return num;

    }
		
		
	

};
