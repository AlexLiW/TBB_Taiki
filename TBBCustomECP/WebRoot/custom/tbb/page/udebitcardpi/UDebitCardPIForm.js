/********************************************************************************
	 DEBIT金融卡圈存事故檔
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.16
	 * LastUpdateUser: AI\Wolf.wu
	 * LastUpdateDate: 2021/10/04
	 * Note: 事故記號 字典化
					2021/10/04 去除網格中交易序號及事故日期為空的資料
*********************************************************************************/
var UDebitCardPIForm = {
		doLoad : function(){
			if ("U_ACN" in clientData.urlArgs) { // "存款帳戶總覽查詢"開啟帶入帳號
				form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
			}
			
			form.setFieldTitle("U_Button", null);						//隱藏按鈕標題
			form.getControl("U_Button").setElementStyle("width: 30%");	//設定按鈕大小
			
			UDebitCardPIForm.doChange();
			
			// 20210921 add by gemfor\Tiffany
			form.getControl("U_Grid").setPageSize(15);
		},
		
		doChange : function(){
			form.getControl("U_Button").onclick = function() {
				UDebitCardPIForm.doA006();
			};
			
			form.getControl("U_ACNO").onchange = function() { // 20210927 add by gemfor\Tiffany
				UDebitCardPIForm.doACNO();
			};
		},
		
		doA006 : function(){
			if (!form.validate()) {
				return;
			}
			
			TBBUtil.doClearFields("輸出區", null, null);	//清空查詢結果欄位
			
			UDebitCardPIForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UDebitCardPIForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"TXACN" 	: form.getFieldValue("U_ACNO"), 	//帳號
					"USERDATA"	: ""
			};
			
			var args = JSON.stringify({
				"name" 		: "A006tbbapi",
				"from" 		: "CSR",
				"sessionId" : UDebitCardPIForm.sessionId,
				"agentId" 	: UDebitCardPIForm.agentId,
				"formData" 	: data
			});
			
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
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
						return;
					}
					var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
					var formData = ret.form;					//取回傳資料
					var REC_LEN = formData.REC.length; 			//看有幾筆資料
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i])) {
							if(!Jui.object.isEmpty(formData.REC[i].CHKNUM)){
								if(formData.REC[i].CHKNUM.replace(/ /g, "") != "" && formData.REC[i].DATEVT.replace(/ /g, "") != "") {
									// 去除網格中交易序號及事故日期為空的資料 20211004 Wolf
									// 事故記號 20210929 Tiffany
									var EVTCOD = formData.REC[i].EVTCOD;
									var EVTCODDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-3e69-ce0d-17c310a35690"}).data; // TBB-DEBIT金融卡圈存事故檔-事故記號
									for (var j = 0; j < EVTCODDic.length; j++) {
										if (EVTCODDic[j].value == EVTCOD) {
											EVTCOD = EVTCODDic[j].text;
											break;
										}
									}
									var data = {
											"U_TRXCode"		: formData.REC[i].CHKNUM,
											// "U_EventFlg"	: formData.REC[i].EVTCOD, // 20210929 Tiffany
											"U_EventFlg"	: EVTCOD,
											"U_ChkNum" 		: formData.REC[i].CNTCHK,
											"U_EventAMT"	: formData.REC[i].AMTEVT,
											"U_StatusFlg"	: formData.REC[i].STATUS,
											"U_EvenDT"		: formData.REC[i].DATEVT,
											"U_ErrCode"		: formData.REC[i].ERRCOD,
											"U_RegDT"		: formData.REC[i].DATACT,
											"U_RegBch"		: formData.REC[i].EVTBRH,
											"U_TellerNo"	: formData.REC[i].EVTTLR,
											"U_DirecctorNo"	: formData.REC[i].EVTSPV,
											"U_Event"		: formData.REC[i].MEMO
									}
									U_O_Data.push(data);
								}
							}
						}
					}
					
					// 20210921 adjust by Tiffany
					//按照"事故日期"由遠到近排序，然後再按照"事故記號"排序
					/*U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_EvenDT > b.U_EvenDT){
							return 1;
						}else if(a.U_EvenDT < b.U_EvenDT){
							return -1;
						}else if(a.U_EvenDT == b.U_EvenDT){
							if(a.U_EventFlg > b.U_EventFlg){
								return 1;
							}else if(a.U_EventFlg < b.U_EventFlg){
								return -1;
							}
						}
					});*/
					
					// "事故記號"VS與MS排在一起優先顯示，再依"實際登錄日期"由遠到近排序
                    var arr1 = [];
                    var arr2 = [];
                    var arr3 = [];
                    for (var i = 0; i < U_O_Data.length; i++) {
                    	if (U_O_Data[i].U_EventFlg == "VS") {
                    		arr1.push(U_O_Data[i]);
                    	} else if (U_O_Data[i].U_EventFlg == "MS") {
                    		arr2.push(U_O_Data[i]);
                        } else {
                    		arr3.push(U_O_Data[i]);
                        } 
                    }
                    arr1 = UDebitCardPIForm.doDtIndex(arr1, "U_RegDT");
                    arr2 = UDebitCardPIForm.doDtIndex(arr2, "U_RegDT");
                    arr3 = UDebitCardPIForm.doDtIndex(arr3, "U_RegDT");
                    
                    U_O_Data = arr1.concat(arr2).concat(arr3);
					
					//將日期為空白時移到最後面
					var temp = [];
					for(i = 0; i < U_O_Data.length; i++){
						if(U_O_Data[i].U_EvenDT != ""){
							temp = U_O_Data.splice(0, i);
							break;
						}
					}
					for(i = 0; i < temp.length; i++){
						U_O_Data.push(temp[i]);
					}
					
					var AMTEVT_sum = 0;
					for(i = 0; i < U_O_Data.length; i++){
						if(U_O_Data[i].U_EventFlg == "MS" || U_O_Data[i].U_EventFlg == "VS"){
							AMTEVT_sum += parseFloat(U_O_Data[i].U_EventAMT);
						}
					}
					form.setFieldValue("U_EventAMTTotal", AMTEVT_sum);
					form.getControl("U_Grid").setValue(U_O_Data);
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			});
		},
		
		// 資料依由遠到近排序
		doDtIndex : function(DataGrid, FieldNm) {
		    var wlen1 = DataGrid.length;
		    var count1 = 0;// 記錄總執行次數
		    for (var i = 0; i < DataGrid.length - 1; i++) {
		        for (var j = 0; j < wlen1 - 1; j++) {
		            if (DataGrid[j][FieldNm] > DataGrid[j + 1][FieldNm]) {
		                var temp;
		                temp = DataGrid[j];
		                DataGrid[j] = DataGrid[j + 1];
		                DataGrid[j + 1] = temp;
		                count1++;
		            }
		        }
		        wlen1 = wlen1 - 1;
		    }
		    return DataGrid;
		},
		
		doACNO : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
			if (form.getFieldValue("U_ACNO")) {
				if (form.getFieldValue("U_ACNO").length < 11) {
					Jui.message.alert("帳號資料格式須為11位實體帳號");
					form.setFieldValue("U_ACNO", null);
				}
			}
		},
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210921 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};