/********************************************************************************
	 約定轉帳帳號檔
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.24
	 * LastUpdateUser: 	gemfor/Emma
	 * LastUpdateDate: 	2022/04/01
	 * Note: 2021.09.29檢核帳號是否輸入11碼、電文由CQ01改為A008
	 			    2022/01/07 增加電文等待效果
	 			    2022/02/15-lillian-網格調整為一頁16筆
	 			    2022.04.01 gemfor/Emma 取申請日期
*********************************************************************************/
var UPreDesignateACForm = {
		doLoad : function(){
			//20210917 Yuwen.Wang 新增從「約定轉帳帳號檔查詢」按鈕打開約定轉帳帳號檔的頁面 帶入統一編號的判斷
			if ("U_ACNO" in clientData.urlArgs) {
				form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACNO);
			}
			
			UPreDesignateACForm.doChange();
			
			form.setFieldTitle("U_Button", null);						//隱藏按鈕標題
			form.getControl("U_Button").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.setFieldTitle("U_Grid", null);							//隱藏網格標題
			
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {								//如果有進線就抓進線，沒有就抓聯絡人
				var custID = ret.U_CustID;
				form.setFieldValue("U_ACNO", custID);
			}else{
				if(EntityForm.getInfoWindow().clientData.entityId != "" && EntityForm.getInfoWindow().clientData.entityId != null){
					var a = CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID");
					form.setFieldValue("U_ACNO", a);							//帶入主檔身分證字號
				}
			}
			
			form.getControl("U_Memo").setElementStyle("padding-left: 118px;");	//2021.09.23-gemfor/lillian-標籤對齊網格
			form.getControl("U_Grid").setPageSize(16);							//2022.02.14-gemfor/lillian-一頁16筆
		},
		
		doChange : function(){
			form.getControl("U_Button").onclick = function() {
				TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
				let U_ACNO = form.getFieldValue("U_ACNO"); 
				//2021.09.27-gemfor/lillian-檢核是否輸入11碼
				if(U_ACNO.length != 11){
					Jui.message.alert("金融卡帳號 請輸入11碼！");
					form.setFieldValue("U_ACNO", null); 
				}else{
					UPreDesignateACForm.doA008();
				}
			};
		},
		
		//2021.09.23-gemfor/lillian--電文由CQ01改為A008
		doA008 : function(){
			if (!form.validate()) {
				return;
			}
			
			UPreDesignateACForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UPreDesignateACForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
			        "TXACN"	: form.getFieldValue("U_ACNO")
			};
			
			var args = JSON.stringify({
				"name" 		: "A008tbbapi",
				"from" 		: "CSR",
				"sessionId" : UPreDesignateACForm.sessionId,
				"agentId" 	: UPreDesignateACForm.agentId,
				"formData" 	: data
			});
			var bar = Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				setTimeout(function() {

					console.log(ret);
					if (ret == undefined) {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					if (ret.isSuccess == true) {
						let ABEND = ret.form.ABEND;					//電文回應代號
						var ABEND_text = "";
						//2021.09.29-gemfor/lillian-新增回應代碼抓字典項文字
						let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
						for (let i = 0; i < ABEND_Dic.length; i++) {
							if (ABEND_Dic[i].value == ABEND) {
								ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
							}
						}
						
						
						if(ABEND == "0000" || ABEND == "OKLR"){
							var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
							var formData = ret.form;					//取回傳資料
							
							form.setFieldValue("U_DepACNum", formData.XATENO);			//自行轉入帳號個數
							form.setFieldValue("U_IterBkDepACNum", formData.XAXENO);	//跨行轉入帳號個數
							
							var BankNo = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dcfbb-a590-0d75-1395-d8f2cab1cb50"}).data;
							
							for(let key in formData){
								if(key.substr(0, 6) == "XAIACC"){
									if(!Jui.object.isEmpty( (formData[key].replace(/\s*/g,"")).replace(/0/g,"") )){
										let U_BankNo = formData[key].substr(0, 3);
										for (let i = 0; i < BankNo.length; i++) {
											if (BankNo[i].value == U_BankNo) {
												BankNo_text = BankNo[i].text;
											}
										}
										let U_TransACNO = formData[key].substr(3, 16);
										//let U_ApplyTransDT = formData[key].substr(19, 7);
										let U_ApplyTransDT = formData[key].substr(20, 6); //2022.04.01 gemfor/Emma 取申請日期
										
										//let U_ApplyTransDT_format = U_ApplyTransDT.substr(0, 3) + "/" + U_ApplyTransDT.substr(3, 2) + "/" + U_ApplyTransDT.substr(5, 2);
										
										let data = {
												"U_Number"			: "",
												"U_BankNo"			: BankNo_text,
												"U_TransACNO"		: U_TransACNO,
												//"U_ApplyTransDT" 	: U_ApplyTransDT_format
												"U_ApplyTransDT" 	: U_ApplyTransDT //2022.04.01 gemfor/Emma 取申請日期
										}
										U_O_Data.push(data);
									}
								}
							}
							
							//查詢結果網格需以 申請時間 由遠到近 排序
							U_O_Data = U_O_Data.sort(function(a,b){
								if(a.U_ApplyTransDT > b.U_ApplyTransDT){
									return 1;
								}else if(a.U_ApplyTransDT < b.U_ApplyTransDT){
									return -1;
								}else if(a.U_ApplyTransDT == b.U_ApplyTransDT){
									return 1;
								}
							});
							
							for(let i = 0; i < U_O_Data.length; i++){
								U_O_Data[i].U_Number = i + 1 ;
							}
							
							form.getControl("U_Grid").setValue(U_O_Data);
							bar.close();
						}else{
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					
				}, 1 * 1000);
			});
		},
}

//2022.02.14-lillian--改寫網格一頁的筆數
Jui.option.Grid.prototype.setPageSize = function(pageSize) {
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};