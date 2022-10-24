/********************************************************************************
	 存款明細查詢表單
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.05.28
	 * LastUpdateUser: 	gemfor\Tiffany
	 * LastUpdateDate: 	2022.02.11
	 * Note: 修正判斷時間超過2年與區間為60天的判斷
	 * 		2022/02/11 Tiffany--1.交易時間 格式HH:mm:ss.fff
	 *		 					2.借貸別 字典化
	 *							3.排除空資料(判斷/最後異動日/為空)
	 *		2022/02/15-lillian--1.支出/存入/帳戶餘額修正
	 *							2.新增電文查詢等待畫面
	 *      2022/03/09-Emma --  1.itemControl & setOnchange : a.查詢迄日皆設定為當日 
	 *                          2.doS134: a.修改交易時間秀 時：分：秒 b.支出/存入/帳戶餘額金額取值 c.查詢結果依最後異動日和交易時間由遠到近顯示
	 *                          3.doLoad & 新增網格筆數顯示 : a.筆數請一頁顯示30筆 
	 *                          
*********************************************************************************/

var DepositDetailForm = {
		doLoad : function(){
			DepositDetailForm.setOnchange();
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			form.setFieldTitle("U_Grid", null);							//隱藏網格標題
			form.getControl("U_Grid").setPageSize(30);                  // 20220309 add by gemfor\Emma -- 網格分頁筆數設定30筆
			
			//2022.02.15-lillian--點選存款總覽裡的快速連結，選擇存款明細查詢，帳號欄位代入帳號
			if ("U_ACN" in clientData.urlArgs) {
				form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
			}
		},
		
		
		//查詢電文
		doS134 : function(){
			if (!form.validate()) {
				return;
			}
			if(Jui.object.isEmpty(form.getFieldValue("U_ACNO"))){
				Jui.message.alert("請填寫\"帳號\"");
				return;
			}
			if(Jui.object.isEmpty(form.getFieldValue("U_Time"))){
				Jui.message.alert("請填寫\"查詢區間\"");
				return;
			}
			
			TBBUtil.doClearFields("輸出區", null, null);	//清空查詢結果欄位
			
			var U_ACNO = form.getFieldValue("U_ACNO");
			var U_StartDT = form.getFieldValue("U_StartDT");
			var U_EndDT = form.getFieldValue("U_EndDT");

			DepositDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			DepositDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ACN" 		: U_ACNO, 					//帳號
					// 20210928 Update by Chainsea\Yuwen.Wang
					"STADATE" 	: U_StartDT.substr(0,4)-1911+U_StartDT.substr(5,2)+U_StartDT.substr(8,2),	//起日
				    "ENDDATE"	: U_EndDT.substr(0,4)-1911+U_EndDT.substr(5,2)+U_EndDT.substr(8,2),	//迄日
					"TYPE" 		: "01", 					//類別
				    "CTDNUM"	: DepositDetailForm.agentId,//登入帳號
				    "LSTIME"	: "",
				    "SIL"		: ""
			};
			
			var args = JSON.stringify({
				"name" 		: "S134tbbapi",
				"from" 		: "CSR",
				"sessionId" : DepositDetailForm.sessionId,
				"agentId" 	: DepositDetailForm.agentId,
				"formData" 	: data
			});
		
			var bar = Jui.message.progress(function() {		//2022.02.15-lillian-新增電文發送等待畫面
	            Jui.message.hint("查詢資料中，請稍後...");
	        });
			
			// 發送電文
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				setTimeout(function() {
					//console.log(ret);
					if (ret == undefined) {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					if (ret.isSuccess == true) {
						if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
							var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
							var ABENDtxt = ret.form.ABEND;
							for (var i = 0; i < codeDic.length; i++) {
								if (codeDic[i].value == ret.form.ABEND) {
									ABENDtxt = codeDic[i].text;
									break;
								}
							}
							Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
							bar.close();
							return;
						}
						var U_O_Data = [];																	//用來將電文取回且整理好的值塞入網格
						var formData = ret.form;															//取回傳資料
						
						// 20220719 sorting 
						formData.REC.sort(function(a, b){
							var keyA = a.LSTLTD;
							var keyB = b.LSTLTD;
							if(keyA < keyB) return -1;
							if(keyA > keyB) return 1;
							return 0;
						});
						formData.REC.sort(function(a, b){
							var keyA = a.TIME;
							var keyB = b.TIME;
							if(keyA < keyB) return -1;
							if(keyA > keyB) return 1;
							return 0;
						});
						
						var REC_LEN = formData.REC.length; 													//看有幾筆資料
						var U_NO = 0; // 項目
						for (var i = 0; i < REC_LEN; i++) {
							// if (!Jui.object.isEmpty(formData.REC[i])) {
							if (!Jui.object.isEmpty(formData.REC[i].LSTLTD.trim())) { // 判斷/最後異動日/為空則不帶資料
								U_NO = U_NO + 1;
								var U_BAMT = "";
								var U_SAMT = "";
								var AMTTRN1=formData.REC[i].AMTTRN;
								//2022.02.15-lillian-修正金額取值方式
								//var AMTTRN = Common.doCheckNumber(formData.REC[i].AMTTRN.substr(0, 9)) + "." + formData.REC[i].AMTTRN.substr(9, 2);
								
								// 20220719 update minus show problem start 
								//var AMTTRN = Common.doCheckNumber(AMTTRN1.substr(0, (AMTTRN1.length-3))) + "." + AMTTRN1.substr((AMTTRN1.length-3), 2); // 2022.03.09-Emma-修正支出/收入金額
								var AMTTRN = "";
								if(AMTTRN1.indexOf('-') != -1){
									console.log("enter - show AMTTRN1: " + AMTTRN1);
									
									AMTTRN1 = AMTTRN1.substr(0, (AMTTRN1.length-1));
									console.log("1 AMTTRN1: " + AMTTRN1);
									
									AMTTRN = Common.doCheckNumber(AMTTRN1.substr(0, (AMTTRN1.length-2))) + "." + AMTTRN1.substr((AMTTRN1.length-2), 2); // 2022.03.09-Emma-修正支出/收入金額
									console.log("2 AMTTRN: " + AMTTRN);
									
									AMTTRN = "-" + AMTTRN;
									console.log("3 AMTTRN: " + AMTTRN);
									
								} else {
									AMTTRN = Common.doCheckNumber(AMTTRN1.substr(0, (AMTTRN1.length-3))) + "." + AMTTRN1.substr((AMTTRN1.length-3), 2); // 2022.03.09-Emma-修正支出/收入金額
								}
								// 20220719 update minus show problem end 
								
								if(formData.REC[i].CODDBCR == "C"){											//如果"借貸別"是"C"(收入)
									U_SAMT = AMTTRN;
									//U_SAMT = U_SAMT.replace(/\b(0+)/gi,"");									//去掉前面的0
									//U_SAMT = U_SAMT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');	//轉換為千分位金錢格式
								}else if(formData.REC[i].CODDBCR == "D"){									//如果"借貸別"是"D"(支出)
									U_BAMT = AMTTRN;
									//U_BAMT = U_BAMT.replace(/\b(0+)/gi,"");									//去掉前面的0
									//U_BAMT = U_BAMT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');	//轉換為千分位金錢格式
								}
								var BAL = formData.REC[i].BAL;
								//U_Balance = U_Balance.replace(/\b(0+)/gi,"");								//去掉前面的0
								//U_Balance = U_Balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');	//轉換為千分位金錢格式
								//var U_Balance = Common.doCheckNumber(BAL.substr(0, 9)) + "." + BAL.substr(9, 2);	//2022.02.15-lillian-修正金額取值方式
								var U_Balance = Common.doCheckNumber(BAL.substr(0, (BAL.length-3))) + "." + BAL.substr((BAL.length-3), 2);	//2022.03.09-Emma-修正帳戶餘額金額
								
								var LSTLTD_F = formData.REC[i].LSTLTD.substr(0, 3) + "/" + formData.REC[i].LSTLTD.substr(3, 2) + "/" + formData.REC[i].LSTLTD.substr(5, 2);	//時間格式重整
								var U_IBankNo = formData.REC[i].PBDATA.substr(8, 3);
								var U_SeqNo = formData.REC[i].PBDATA.substr(27, 7);
								// 交易時間 格式HH:mm:ss.fff --20220211 Tiffany
								//var U_Time = formData.REC[i].TIME.substr(0, 2) + ":" + formData.REC[i].TIME.substr(2, 2) + ":" + formData.REC[i].TIME.substr(4, 2) + "." + formData.REC[i].TIME.substr(6, 3);
								var U_Time = formData.REC[i].TIME.substr(0, 2) + ":" + formData.REC[i].TIME.substr(2, 2) + ":" + formData.REC[i].TIME.substr(4, 2); // 2022.03.09-Emma-交易時間 格式HH:mm:ss
								// TBB-存款明細查詢-借貸別 字典data
								var bsDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-dc22-fa0a-17ee814d4ee0"}).data;
								var data = {
										// "U_NO"				: i+1,
										"U_NO"				: U_NO,
										"U_LastModifyDT"	: LSTLTD_F,
										// "U_Time"			: formData.REC[i].TIME,
										"U_Time"			: U_Time,
										"U_DESC"			: formData.REC[i].MEMO,
										// "U_BS"				: formData.REC[i].CODDBCR,
										"U_BS"				: DepositDetailForm.getDicText(bsDic, formData.REC[i].CODDBCR),
										"U_Balance"			: U_Balance,
										"U_BAMT"			: U_BAMT,
										"U_SAMT"			: U_SAMT,
										"U_CheckNum"		: formData.REC[i].CHKNUM,
										"U_DATA"			: formData.REC[i].DATA16,
										"U_BankNo"			: formData.REC[i].TRNBRH,
										"U_IBankNo"			: U_IBankNo,
										"U_SeqNo"			: U_SeqNo
								};
								U_O_Data.push(data);
							}
						}
						//20220309 add by gemfor\Emma -查詢結果(最後異動日和交易時間由遠到近顯示)
						U_O_Data = U_O_Data.sort(function(a,b){
							if(a.U_Time < b.U_Time){
								return -1;
							}else if(a.U_Time > b.U_Time){
								return 1;
							}else if(a.U_Time == b.U_Time){
								return 0;
							}
						});
						
						U_O_Data = U_O_Data.sort(function(a,b){
							if(a.U_LastModifyDT < b.U_LastModifyDT){
								return -1;								
							}else if(a.U_LastModifyDT > b.U_LastModifyDT){
								return 1;
							}else if(a.U_LastModifyDT == b.U_LastModifyDT){
								return 0;
							}
						});
						
						for(j=0; j<U_O_Data.length; j++){   //20220309 add by gemfor\Emma -修改項目排序
							U_O_Data[j].U_NO = j+1;
						}
						
						form.getControl("U_Grid").setValue(U_O_Data);
						
						var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
						for(var i = 1; i < Billamount.length; i++){
							var tds = Billamount[i].getElementsByTagName("td");
							tds[4].style.textAlign = 'center';
							tds[8].style.textAlign = 'center';
							tds[5].style.textAlign = 'right';
							tds[6].style.textAlign = 'right';
							tds[7].style.textAlign = 'right';
						}
						
						bar.close();
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
				}, 1 * 1000);
			});
		},
		
		//觸發事件
		setOnchange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				form.getControl("U_Grid").setValue();
				DepositDetailForm.doS134();
			};
			
			form.getControl("U_Time").onchange=DepositDetailForm.itemControl;
			
			form.getControl("U_StartDT").onchange=function(){
				var today = new Date();
				var U_StartDT = form.getFieldValue("U_StartDT");
				var U_EndDT = form.getFieldValue("U_EndDT");
				if(Date.parse(U_StartDT).valueOf() > Date.parse(today)){
					Jui.message.alert("選擇之日期大於今日！");
					form.setFieldValue("U_StartDT", null);
					return;
				}
				
				//2021.09.30-gemfor/lillian-修正判斷時間超過2年與區間為60天的判斷
				var today_beforeTwoYear = new Date();
				today_beforeTwoYear = today_beforeTwoYear.setFullYear( today_beforeTwoYear.getFullYear() - 2 );
				var today_beforeTwoYear_format = new Date(today_beforeTwoYear);
				if(Date.parse(U_StartDT).valueOf() < Date.parse(today_beforeTwoYear_format).valueOf()){
					Jui.message.alert("本系統僅提供距今2年內("		+ (parseInt(today_beforeTwoYear_format.getFullYear())-1911) + "/" 
																+ (parseInt(today_beforeTwoYear_format.getMonth())+1) 		+ "/" 
																+ today_beforeTwoYear_format.getDate()						+ " ~ "
																+ (parseInt(today.getFullYear())-1911) 						+ "/" 
																+ (parseInt(today.getMonth())+1) 							+ "/" 
																+ today.getDate() 											+ ")的查詢資料！");
					form.setFieldValue("U_StartDT", null);
					return;
				}else{
					if(U_StartDT != null && U_EndDT != null){
						var startDT = new Date(U_StartDT);
						var endDT = new Date(U_EndDT);
						var endDT_before60day = new Date(U_EndDT);
						var endDT_before60day_S = endDT_before60day.getTime();
						endDT_before60day.setTime(endDT_before60day_S - 1000 * 60 * 60 * 24 * 60);
						if(Date.parse(U_StartDT).valueOf() > Date.parse(U_EndDT)){
							Jui.message.alert("起日不得大於迄日！");
							form.setFieldValue("U_StartDT", null);
							return;
						}else{
							if(Date.parse(U_StartDT).valueOf() < Date.parse(endDT_before60day).valueOf()){
								Jui.message.alert("查詢區間以60天("	+ (parseInt(endDT_before60day.getFullYear())-1911) 	+ "/" 
																	+ (parseInt(endDT_before60day.getMonth())+1) 		+ "/" 
																	+ endDT_before60day.getDate()						+ " ~ "
																	+ (parseInt(endDT.getFullYear())-1911) 				+ "/" 
																	+ (parseInt(endDT.getMonth())+1) 					+ "/" 
																	+ endDT.getDate() 									+ ")為限！");
								form.setFieldValue("U_StartDT", null);
								return;
							}
						}
					}
				}
				
				
				/*
				//20210917 Yuwen.Wang 新增時間區間超過2年內及60天內的判斷
				if(U_StartDT != null && U_EndDT != null){
					var StartDT = new Date(U_StartDT);
					var EndDT = new Date(U_EndDT);
					if(parseInt((Math.abs(EndDT-StartDT))/1000/60/60/24) > 730){
						Jui.message.alert("本系統僅提供距今2年內的查詢資料");
						form.setFieldValue("U_StartDT", null);
						return;
					}else if(parseInt((Math.abs(EndDT-StartDT))/1000/60/60/24) > 60){
						Jui.message.alert("查詢區間以60天為限");
						form.setFieldValue("U_StartDT", null);
						return;
					}
				}*/
			};
			
			form.getControl("U_EndDT").onchange=function(){
				var flag=1;
				var today = new Date();
				var U_StartDT = form.getFieldValue("U_StartDT");
				var U_EndDT = form.getFieldValue("U_EndDT");
				//if(Date.parse(U_StartDT).valueOf() > Date.parse(today)){ //20220309 add by gemfor\Emma -- 查詢迄日檢核是否超過當日
				if(Date.parse(U_EndDT).valueOf() > Date.parse(today)){ //20220309 add by gemfor\Emma -- 查詢迄日檢核是否超過當日
					Jui.message.alert("選擇之日期大於今日！");
					form.setFieldValue("U_EndDT", null);
					return flag=0; //20220309 add by gemfor\Emma -- 查詢迄日提醒框以是否超過當日為先
				}
				
				if(flag=1){  //20220309 add by gemfor\Emma -- 查詢迄日提醒框以是否超過當日為先
				//2021.09.30-gemfor/lillian-修正判斷時間超過2年與區間為60天的判斷
				var today_beforeTwoYear = new Date();
				today_beforeTwoYear = today_beforeTwoYear.setFullYear( today_beforeTwoYear.getFullYear() - 2 );
				var today_beforeTwoYear_format = new Date(today_beforeTwoYear);
				if(Date.parse(U_EndDT).valueOf() < Date.parse(today_beforeTwoYear_format).valueOf()){
					Jui.message.alert("本系統僅提供距今2年內("		+ (parseInt(today_beforeTwoYear_format.getFullYear())-1911) + "/" 
																+ (parseInt(today_beforeTwoYear_format.getMonth())+1) 		+ "/" 
																+ today_beforeTwoYear_format.getDate()						+ " ~ "
																+ (parseInt(today.getFullYear())-1911) 						+ "/" 
																+ (parseInt(today.getMonth())+1) 							+ "/" 
																+ today.getDate() 											+ ")的查詢資料！");
					form.setFieldValue("U_EndDT", null);
					return;
				}else{
					if(U_StartDT != null && U_EndDT != null){
						var startDT = new Date(U_StartDT);
						var endDT = new Date(U_EndDT);
						var startDT_after60day = new Date(startDT);
						var startDT_after60day_S = startDT_after60day.getTime();
						startDT_after60day.setTime(startDT_after60day_S + 1000 * 60 * 60 * 24 * 60);
						if(Date.parse(U_StartDT).valueOf() > Date.parse(U_EndDT)){
							Jui.message.alert("起日不得大於迄日！");
							form.setFieldValue("U_EndDT", null);
							return;
						}else{
							if(Date.parse(U_EndDT).valueOf() > Date.parse(startDT_after60day).valueOf()){
								Jui.message.alert("查詢區間以60天("	+ (parseInt(startDT.getFullYear())-1911) 				+ "/" 
																	+ (parseInt(startDT.getMonth())+ 1) 					+ "/" 
																	+ startDT.getDate()										+ " ~ "
																	+ (parseInt(startDT_after60day.getFullYear())-1911) 	+ "/" 
																	+ (parseInt(startDT_after60day.getMonth())+1) 			+ "/" 
																	+ startDT_after60day.getDate() 							+ ")為限！");
								form.setFieldValue("U_EndDT", null);
								return;
							}
						}
					}
				}
				}
				/*
				//20210917 Yuwen.Wang 新增時間區間超過2年內及60天內的判斷 
				if(U_StartDT != null && U_EndDT != null){
					var StartDT = new Date(U_StartDT);
					var EndDT = new Date(U_EndDT);
					if(parseInt((Math.abs(EndDT-StartDT))/1000/60/60/24) > 730){
						Jui.message.alert("本系統僅提供距今2年內的查詢資料");
						form.setFieldValue("U_EndDT", null);
					}else if(parseInt((Math.abs(EndDT-StartDT))/1000/60/60/24) > 60){
						Jui.message.alert("查詢區間以60天為限");
						form.setFieldValue("U_EndDT", null);
					}
				}*/
			};
			
			form.getControl("U_ACNO").onchange = function() { // 20210927 add by gemfor\Tiffany
				DepositDetailForm.doACNO();
			};
		},
		
		
		//控制項觸發後動作
		itemControl : function(){
			var U_Time = form.getFieldValue("U_Time");
			var today = new Date(); //20220309 add by gemfor\Emma 
			if(U_Time == "當日"){
				form.setFieldDisabled("U_StartDT", true);
				form.setFieldDisabled("U_EndDT", true);
				var today = new Date();
				form.setFieldValue("U_StartDT", today);
				form.setFieldValue("U_EndDT", today);
			}else if(U_Time == "當月"){
				form.setFieldDisabled("U_StartDT", true);
				form.setFieldDisabled("U_EndDT", true);
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
			    var firstDay = new Date(year, month, 1);
			    //var lastDay = new Date(year, month + 1, 0);//20220309 add by gemfor\Emma
			    form.setFieldValue("U_StartDT", firstDay);
				//form.setFieldValue("U_EndDT", lastDay);
				form.setFieldValue("U_EndDT", today);//20220309 add by gemfor\Emma -- 查詢迄日只到當日
			}else if(U_Time == "最近一星期"){
				form.setFieldDisabled("U_StartDT", true);
				form.setFieldDisabled("U_EndDT", true);
				var today = new Date();
				var beforeDay = new Date(today);
				beforeDay.setDate(today.getDate() - 7);
			    form.setFieldValue("U_StartDT", beforeDay);
				form.setFieldValue("U_EndDT", today);
			}else if(U_Time == "最近一個月"){
				form.setFieldDisabled("U_StartDT", true);
				form.setFieldDisabled("U_EndDT", true);
				var today = new Date();
				var beforeDay = new Date(today);
				beforeDay.setDate(today.getDate() - 30);
			    form.setFieldValue("U_StartDT", beforeDay);
				form.setFieldValue("U_EndDT", today);
			}else if(U_Time == "指定期間"){
				form.setFieldValue("U_StartDT", null);
				form.setFieldValue("U_EndDT", null);
				form.setFieldDisabled("U_StartDT", false, true);
				form.setFieldDisabled("U_EndDT", false, true);
			}else{
				form.setFieldDisabled("U_StartDT", true);
				form.setFieldDisabled("U_EndDT", true);
				form.setFieldValue("U_StartDT", null);
				form.setFieldValue("U_EndDT", null);
			}

		},	
		
		doACNO : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
			if (form.getFieldValue("U_ACNO")) {
				if (form.getFieldValue("U_ACNO").length < 11) {
					Jui.message.alert("帳號資料格式須為11位實體帳號");
					form.setFieldValue("U_ACNO", null);
				}
			}
		},
		
		getDicText : function(dicData, postVal) { // 獲取電文對應字典文字 -- 20220211 Tiffany
			var dicText = postVal;
			for (var j = 0; j < dicData.length; j++) {
				if (dicData[j].value == postVal) {
					dicText = dicData[j].text;
					break;
				}
			}
			return dicText;
		},
}
Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20220309 add by gemfor\Emma -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};