/********************************************************************************
	 電子自動化轉帳歷史
	 * Author: 			Ai3\Jason
	 * CreateDate: 		2022.10.28
	 * LastUpdateUser: 	Ai3\Jason
	 * LastUpdateDate: 	2022.10.28
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
var EAutoForm = {

	doLoad : function() {
		var Today=new Date();
		var Month = Today.getMonth()+1;//本月時間
		var Month_1 = Month-1;//前一個月時間
		var Month_2 = Month-2;//前兩個月時間時間
		var Year = Today.getYear()-11;//本年時間
		var Year_1 = Year;//前一個月民國年時間
		var Year_2 = Year;//前兩個月民國年時間
		var comboBox = form.getControl("U_YMonth");
		if(Month >=1&& Month<=9){//個位數月份補0
			Month ="0"+Month;
		}
		if(Month_1 >=1&& Month_1<=9){
			Month_1 ="0"+Month_1;
		}
		if(Month_2 >=1&& Month_2<=9){
			Month_2 ="0"+Month_2;
		}
		if(Month_1==00){//如本月是1月份，判斷前1、2個月月份及民國年
			Month_1=12;
			Year_1 =Year_1-1; 
		}
		if(Month_2==00){
			Month_2=12;
			Year_2=Year_2-1;
		}else if(Month_2==-1){
			Month_2=11;
			Year_2=Year_2-1;
		}

		var items = [{"value": Year+""+Month, "text":Year+"/"+Month},
		{"value": Year_1+""+Month_1, "text":Year_1+"/"+Month_1},
		{"value": Year_2+""+Month_2, "text":Year_2+"/"+Month_2}]; 
		comboBox.onbeforedrop = comboBox.loadItems(items); //重新載入下拉選單
		comboBox.setValue(items[0].value, items[0].text); //設定下拉選單預設值


		
		form.getControl("U_Button").onclick = function() {
		form.setFieldValue("U_TransactionResult","");//清空交易結果
		form.setFieldValue("U_TransactionResults","");//清空交易結果說明
		form.getControl("U_Grid").setValue();//清空明細網格
		form.getControl("U_Grid2").setValue();//清空明細2網格
		console.log("清空");
		EAutoForm.doCQ21();
		
		};

	},

	doCQ21 : function() { // 上送CQ21
	console.log("進入CQ21");
		if (!form.validate()) {
			return;
		}
		var cusidn = form.getFieldValue("U_ID");
		var yyymm = form.getFieldValue("U_YMonth");
		EAutoForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		EAutoForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ21",
			"CUSIDN" : cusidn, // 身分證
			"YYYMM" : yyymm,
		};
		var args = JSON.stringify({
			"name" : "CQ21tbbapi",
			"from" : "CSR",
			"sessionId" : EAutoForm.sessionId,
			"agentId" : EAutoForm.agentId,
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
					if ((ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND =="OKOK"|| ret.form.ABEND =="EACC"|| ret.form.ABEND =="ERDB"|| ret.form.ABEND =="ENRD")){ //判斷交易結果說明(欄位)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
						var ABENDtxt = ret.form.ABEND;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.ABEND) {
								ABENDtxt = codeDic[i].text;
								break;
							}
						}	
						console.log("交易代碼說明"+":"+ABENDtxt); 
						form.setFieldValue("U_TransactionResult", ret.form.ABEND);
						form.setFieldValue("U_TransactionResults", ABENDtxt);
					
					}
					
					if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000" )) { //判斷交易結果(彈跳視窗)
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
						var ABENDtxt = ret.form.ABEND;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.ABEND) {
								ABENDtxt = codeDic[i].text;
								break;
							}
						}	
						Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
						return;
					}
					

					
						
					var U_O_Data = [];//網格1
					var U_O_Data2 = [];//網格2
					var formData = ret.form;
					var REC_LEN = formData.REC.length; // 看有幾筆資料
					for (var i = 0; i < REC_LEN; i++) {
						
						var U_Time = formData.REC[i].TIMTRN.substr(0, 2) + ":" + formData.REC[i].TIMTRN.substr(2, 2) + ":" + formData.REC[i].TIMTRN.substr(4, 2); // 交易時間格式HH:mm:ss
						var record = {//網格1內容
								
							U_TTime :formData.REC[i].DATTRN+"日  "+U_Time,
							U_TID :formData.REC[i].TRXCOD,
							U_EID:formData.REC[i].ERRCOD,
							U_TAmount:EAutoForm.dothousandComma(formData.REC[i].TSFAMT),
						};
						var record2 = {//網格2內容
								
							U_TTime :form.getFieldValue("U_YMonth").substr(0,3)+"/"+form.getFieldValue("U_YMonth").substr(3,2)+"/"+formData.REC[i].DATTRN+"   "+U_Time,
							U_Project :formData.REC[i].PRDATA1,
							U_NContent:formData.REC[i].PRDATA2+"\r\n"+formData.REC[i].PRDATA3,
							U_Remark:formData.REC[i].PRDATA4,
						};

						U_O_Data.push(record);
						U_O_Data2.push(record2);						
					}
					//查詢結果網格1需依 日期 由小到大 排序
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_TTime > b.U_TTime){
							return 1;
						}else if(a.U_TTime < b.U_TTime){
							return -1;
						}else if(a.U_TTime == b.U_TTime){
							return 1;
						}
					});
					//查詢結果網格2需依 日期 由小到大 排序
					U_O_Data2 = U_O_Data2.sort(function(a,b){
						if(a.U_TTime > b.U_TTime){
							return 1;
						}else if(a.U_TTime < b.U_TTime){
							return -1;
						}else if(a.U_TTime == b.U_TTime){
							return 1;
						}
					});
					
					form.getControl("U_Grid").setValue(U_O_Data);
					form.getControl("U_Grid2").setValue(U_O_Data2);
					document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[3].width = '50px';
					document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[0].width = '150px';
					document.getElementsByClassName("JuiGridTable")[1].firstChild.firstChild.children[1].width = '100px';
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '100px';
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[2].width = '100px';
					document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '150px';
					var Billamount = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");//網格金額靠右
					for(var i = 1; i < Billamount.length; i++){
								var tds = Billamount[i].getElementsByTagName("td");
								tds[3].style.textAlign = 'right';
					}
								
				}else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			}
			
		});
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
