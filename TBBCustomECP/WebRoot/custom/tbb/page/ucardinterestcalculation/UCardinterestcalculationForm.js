/********************************************************************************
	 信用卡利息計算方式查詢
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.18
	 * LastUpdateUser: AI\Wolf.wu
	 * LastUpdateDate: 2022/01/10
	 * Note: 提示訊息改跳中間、檢核帳號是否輸入11碼、新增查無資料時要跳的提示訊息
					 2021/10/04 AI\Wolf.wu 對應移除卡別後，需將送出電文上行改為帶入空值
					 2022/01/10 調整過濾空資料、增加電文等待效果
*********************************************************************************/
var UCardinterestcalculationForm = {
		doLoad : function(){
			
			UCardinterestcalculationForm.doChange();
			
			//如果是從"信用卡持卡總覽查詢"打開時，如果 卡號、卡別 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_CardNum", clientData.urlArgs.U_CardNum);
			}
			if ("U_CardType" in clientData.urlArgs) {
				form.setFieldValue("U_CardType", clientData.urlArgs.U_CardType);
			}
			
			form.setFieldTitle("U_Inquiry", null);							//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");		//設定按鈕大小
			form.setFieldTitle("U_Grid", null);								//隱藏網格標題
			form.getControl("U_Grid").setElementStyle("min-width: 180px;");	//設定網格最小寬度
			form.setFieldTitle("U_Grid2", null);
			
			//2021.09.17-gemfor/lillian-調整網格顯示數量
			form.getControl("U_Grid").setPageSize(12);
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				var U_CardNum = form.getFieldValue("U_CardNum");
				form.setFieldValue("U_ErrorCode", null);
				form.setFieldValue("U_ErrorMemo", null);
				form.setFieldValue("U_ErrorCode2", null);
				form.setFieldValue("U_ErrorMemo2", null);
				TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
				//2021.09.27-gemfor/lillian-提示訊息改跳中間
				if(U_CardNum == "" || U_CardNum == null){
					Jui.message.alert("請填寫「卡號」");
					return;
				}
				//2021.09.27-gemfor/lillian-檢核帳號是否輸入11碼
				if(U_CardNum.length != 16){
					Jui.message.alert("「卡號」 請輸入16碼！");
					form.setFieldValue("U_CardNum", null); 
				}else{
					UCardinterestcalculationForm.doBDS1();
				}
			};
		},
		
		doBDS1 : function(){
			if (!form.validate()) {
				return;
			}
			
			UCardinterestcalculationForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCardinterestcalculationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var STMTNO = form.getFieldValue("U_Stmtno");
			if(STMTNO == null){
				STMTNO = "";
			}
			
			var data = {
					"ORG"			: "150",
			        //"TYPE"			: form.getFieldValue("U_CardType"),
					"TYPE"			: "", //AI.Wolf 對應表單欄位移除卡別條件，將上行電文欄位改為送入空值
			        "CARDNUM"		: form.getFieldValue("U_CardNum"),
			        "STMTNO"		: STMTNO,
			        "DTEACCRTHRU"	: ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BDS1tbbapi",
				"from" 		: "CSR",
				"sessionId" : UCardinterestcalculationForm.sessionId,
				"agentId" 	: UCardinterestcalculationForm.agentId,
				"formData" 	: data
			});
			var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				setTimeout(function() {
				console.log(ret);
				if (ret == undefined) {
					bar.close();
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				
				if (ret.isSuccess == true) {
					
					//2021.09.27-gemfor/lillian-新增查無資料時要跳的提示訊息
					let ABEND = ret.form.ABEND;					//電文回應代號
					
					form.setFieldValue("U_ErrorCode", ABEND);			//交易代號
					
					let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10cfe2000"}).data;
					
					for (let i = 0; i < ABEND_Dic.length; i++) {
						if (ABEND_Dic[i].value == ABEND) {
							form.setFieldValue("U_ErrorMemo", ABEND_Dic[i].text ? ABEND_Dic[i].text : "" );
						}
					}
					
					if(ABEND == "0000"){
						var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
						var formData = ret.form;					//取回傳資料
						var REC_LEN = formData.REC.length; 			//看有幾筆資料
						
						for (var i = 0; i < REC_LEN; i++) {
							if (!Jui.object.isEmpty(formData.REC[i])) {
								let STMTDATE = formData.REC[i].STMTDATE.replace(/\s+/g, '');
								if(STMTDATE != "0000/00/00" && STMTDATE != "" && STMTDATE != null){
									var data = {
											"U_Stmtdate"	: STMTDATE
											//2021.09.17-gemfor/lillian-查詢結果的帳單編號移除
											//"U_STMNNO"		: formData.REC[i].STMNNO
									}
									U_O_Data.push(data);
								}
							}
						}
						
						//查詢結果網格需以帳單月份由新到舊排序
						U_O_Data = U_O_Data.sort(function(a,b){
							if(a.U_Stmtdate > b.U_Stmtdate){
								return -1;
							}else if(a.U_Stmtdate < b.U_Stmtdate){
								return 1;
							}else if(a.U_Stmtdate == b.U_Stmtdate){
								return -1;
							}
						});
						
						form.getControl("U_Grid").setValue(U_O_Data);
						bar.close();
					}else{
						Jui.message.alert("查詢無資料！");
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
		
		doBDS2 : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode2", null);
			form.setFieldValue("U_ErrorMemo2", null);
			TBBUtil.doClearFields("查詢結果", null, "U_Grid");	//清空查詢結果欄位
			
			UCardinterestcalculationForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCardinterestcalculationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			//2021.09.17-gemfor/lillian-BDS1移除卡號，BDS2也相對應移除卡號
			//STMTNO = form.getControl("U_Grid").getEventRow().data.U_STMNNO;
			STMTDATE = form.getControl("U_Grid").getEventRow().data.U_Stmtdate;
			
			var data = {
					"ORG"			: "150",
			        //"TYPE"			: form.getFieldValue("U_CardType"),
					"TYPE"			: "", //AI.Wolf 對應表單欄位移除卡別條件，將上行電文欄位改為送入空值
			        "CARDNUM"		: form.getFieldValue("U_CardNum"),
			        //"STMTNO"		: STMTNO,
			        "STMTNO"		: STMTDATE.replace(/\//g,''),
			        "DTEACCRTHRU"	: "",
			        "USERDATA"		: ""
			};
					
			var args = JSON.stringify({
				"name" 		: "BDS2tbbapi",
				"from" 		: "CSR",
				"sessionId" : UCardinterestcalculationForm.sessionId,
				"agentId" 	: UCardinterestcalculationForm.agentId,
				"formData" 	: data
			});
			var bar =
            Jui.message.progress(function() {
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
					//2021.09.27-gemfor/lillian-新增查無資料時要跳的提示訊息
					let ABEND = ret.form.ABEND;					//電文回應代號
					
					form.setFieldValue("U_ErrorCode2", ABEND);			//交易代號
					
					let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10cfe2000"}).data;
					
					for (let i = 0; i < ABEND_Dic.length; i++) {
						if (ABEND_Dic[i].value == ABEND) {
							form.setFieldValue("U_ErrorMemo2", ABEND_Dic[i].text ? ABEND_Dic[i].text : "" );
						}
					}
					
					if(ABEND == "0000"){
						var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
						var formData = ret.form;					//取回傳資料
						var REC_LEN = formData.REC.length; 			//看有幾筆資料
						
						form.setFieldValue("U_OCardNum", formData.CARDNUM);				//卡號
						form.setFieldValue("U_OCardType", formData.TYPE);				//卡別
						form.setFieldValue("U_Checkoutdate", formData.INTADTESTMT);		//帳單結帳日
						form.setFieldValue("U_Intabreakdte", formData.INTABREAKDTE);	//開始計算利息之日期
						form.setFieldValue("U_Revolvingrate", "0." + formData.INTARTLRATE1);	//消費循環利率
						form.setFieldValue("U_Cashadvancerate", "0." + formData.INTACSHRATE1);	//預借現金循環利率
						
						
						for (var i = 0; i < REC_LEN; i++) {
							if (!Jui.object.isEmpty(formData.REC[i])) {
								
								var INTARTLACCR = formData.REC[i].INTARTLACCRSIGN + Common.doCheckNumber(formData.REC[i].INTARTLACCR.substr(0, 9)) + "." + formData.REC[i].INTARTLACCR.substr(9, 4);
								var INTACSHACCR = formData.REC[i].INTACSHACCRSIGN + Common.doCheckNumber(formData.REC[i].INTACSHACCR.substr(0, 9)) + "." + formData.REC[i].INTACSHACCR.substr(9, 4);
								var INTARTLBEARBAL = formData.REC[i].INTARTLBEARBALSIGN + Common.doCheckNumber(formData.REC[i].INTARTLBEARBAL.substr(0, 9)) + "." + formData.REC[i].INTARTLBEARBAL.substr(9, 2);
								var INTACSHBEARBAL = formData.REC[i].INTACSHBEARBALSIGH + Common.doCheckNumber(formData.REC[i].INTACSHBEARBAL.substr(0, 9)) + "." + formData.REC[i].INTACSHBEARBAL.substr(9, 2);
								var INTARTLACCRSUM = formData.REC[i].INTARTLACCRSUMSIGN + Common.doCheckNumber(formData.REC[i].INTARTLACCRSUM.substr(0, 9)) + "." + formData.REC[i].INTARTLACCRSUM.substr(9, 4);
								var INTACSHACCRSUM = formData.REC[i].INTACSHACCRSUMSIGN + Common.doCheckNumber(formData.REC[i].INTACSHACCRSUM.substr(0, 9)) + "." + formData.REC[i].INTACSHACCRSUM.substr(9, 4);
								var INTATOTALCOMB = Common.doCheckNumber(formData.REC[i].INTATOTALCOMB.substr(0, 9)) + "." + formData.REC[i].INTATOTALCOMB.substr(9, 4);
								
								var data = {
										"U_Caltermination"			: formData.REC[i].INTADTEACCRTHRU,
										"U_Interestcalday"			: formData.REC[i].INTANOOFDAYS,
										"U_Stageinterest"			: INTARTLACCR,
										"U_INTACSHACCR"				: INTACSHACCR,
										"U_BEARINGBALANCE"			: INTARTLBEARBAL,
										"U_INTACSHBEARBAL"			: INTACSHBEARBAL,
										"U_Stageinterestalltotal"	: INTARTLACCRSUM,
										"U_INTACSHACCRSUM"			: INTACSHACCRSUM,
										"U_Stageinteresttotal"		: INTATOTALCOMB
								}
								
								if(data.U_BEARINGBALANCE ==  " 0.00" && data.U_Caltermination ==  "0000/00/00" && data.U_INTACSHACCR ==  " 0.0000" && data.U_INTACSHACCRSUM ==  " 0.0000" && data.U_INTACSHBEARBAL ==  " 0.00" &&  data.U_Interestcalday ==  "00" &&  data.U_Stageinterest ==  "0.0000" &&  data.U_Stageinterestalltotal ==  " 0.0000" &&  data.U_Stageinteresttotal ==  "0.0000") { //去除空白資料
								
								} else {
									U_O_Data.push(data);
								}
							}
						}
						
						//2021.09.29-gemfor/lillian查詢結果網格需以"每一階段計算終止日"由遠到近排序
						U_O_Data = U_O_Data.sort(function(a,b){
							if(a.U_Caltermination > b.U_Caltermination){
								return 1;
							}else if(a.U_Caltermination < b.U_Caltermination){
								return -1;
							}else if(a.U_Caltermination == b.U_Caltermination){
								return 1;
							}
						});
						
						form.getControl("U_Grid2").setValue(U_O_Data);
						UCardinterestcalculationForm.doChangeGridColor();
						bar.close();
					}else{
						Jui.message.alert("查詢無資料！");
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
		
		doChangeGridColor : function(){
			let U_Grid2 = document.getElementsByName("U_Grid2")[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
			let totle 	= document.getElementsByName("U_Grid2")[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes.length;
			for(i = 1; i < totle; i++){
				U_Grid2.childNodes[i].childNodes[2].style.backgroundColor = "#FFFF6F";
				U_Grid2.childNodes[i].childNodes[5].style.backgroundColor = "#FFFF6F";
			}
		}
}

//2021.09.17-gemfor\lillian -- 網格分頁筆數設定
Jui.option.Grid.prototype.setPageSize = function(pageSize) { 
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};

Jui.option.Grid.doPageButtonClick = function () {
    var b = Jui.$owner();
    var a = this;
    if (!a.hasAttribute("Forbidden")) {
        if (a == b._firstPageButton) {
            b._loadPage(1);
        } else {
            if (a == b._previousPageButton) {
                b._loadPage(b._pageIndex - 1);
            } else {
                if (a == b._nextPageButton) {
                    b._loadPage(b._pageIndex + 1);
                } else {
                    if (a == b._lastPageButton) {
                        b._loadPage(Math.ceil(b._dataJson.length / b._pageSize));
                    }
                }
            }
        }
    }
    UCardinterestcalculationForm.doChangeGridColor();
};
