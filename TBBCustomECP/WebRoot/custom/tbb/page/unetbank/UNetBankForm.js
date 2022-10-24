// 網路銀行事故檔
var UNetBankForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/16 
	 * Description: 網路銀行事故檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\lillian.lin; 
	 * LastUpdateDate: 2022/02/22
	 * Note: 新增查詢無資料邏輯
	 * 		2022.02.22-lillian-查詢結果網格需依 依交易日期 由遠到近 排序
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Button").onclick = function() {
			if(Jui.object.isEmpty(form.getFieldValue("U_UID"))){
				Jui.message.alert("請填寫\"身分證字號、統一編號或統一證號\""); // 20210915
				return;
			}
			form.getControl("U_Grid").setValue();
			UNetBankForm.doCQ06();
			
			form.getControl("U_Grid").setPageSize(15); // 20210915
		};
		
		// 20210713
		if ("entityId" in EntityForm.getInfoWindow().clientData) { // 聯絡人從屬頁面
			form.setFieldValue("U_UID", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));
		} else { // 電子金融開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
		
		UNetBankForm.setIdOnchange(); // 20210915
	},

	doCQ06 : function() { // 上送CQ06
		if (!form.validate()) {
			return;
		}
		var uid = form.getFieldValue("U_UID");
		UNetBankForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UNetBankForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ06",
			"CUSIDN" : uid, // 統一編號
		};
		var args = JSON.stringify({
			"name" : "CQ06tbbapi",
			"from" : "CSR",
			"sessionId" : UNetBankForm.sessionId,
			"agentId" : UNetBankForm.agentId,
			"formData" : data,
		});
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
				//if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
				//	var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				//	var ABENDtxt = ret.form.ABEND;
				//	for (var i = 0; i < codeDic.length; i++) {
				//		if (codeDic[i].value == ret.form.ABEND) {
				//			ABENDtxt = codeDic[i].text;
				//			break;
				//		}
				//	}
				//	Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
				//	return;
				//}
				var U_O_Data = [];
				var formData = ret.form;
				var itemDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dd510-1ee0-0d75-1395-d8f2cab1cb50"}).data; // 網路銀行事故檔-交易項目
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				if(REC_LEN > 0){
					for (var i = 0; i < REC_LEN; i++) {
						if (!Jui.object.isEmpty(formData.REC[i].DATTRN.trim()) && !Jui.object.isEmpty(formData.REC[i].TIMTRN.trim())) {
							// 交易項目
							var item = formData.REC[i].ITEM;
							for (var q = 0; q < itemDic.length; q++) {
								if (itemDic[q].value == formData.REC[i].ITEM) {
									item = itemDic[q].text;
									break;
								}
							}
							
							var record = {
									U_DateAndTime : TBBUtil.formatDTM(formData.REC[i].DATTRN, formData.REC[i].TIMTRN.substr(0,6)).substr(0,15),  // 20210915
									U_Item : item,
									U_Data1 : formData.REC[i].DATA01,
									U_Data2 : formData.REC[i].DATA02,
									U_Data3 : formData.REC[i].DATA03,
									U_Data4 : formData.REC[i].DATA04,
									U_Data5 : formData.REC[i].DATA05,
									U_TellerNo : formData.REC[i].TLRNUM,
									U_DirecctorNo : formData.REC[i].SPVNUM,
									U_NetDepositAC : formData.REC[i].USERID,
									U_NetSev : formData.REC[i].BRHTMP,
									U_VoiceAC : formData.REC[i].VOACN,
									U_RLUID : formData.REC[i].CORIDN,
							};
							U_O_Data.push(record);
						}
					}
				} else {
					Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
					return;
				}
				
				//2022.02.22-lillian-查詢結果網格需依 依交易日期 由遠到近 排序
				if(U_O_Data != null){
					U_O_Data = U_O_Data.sort(function(a,b){
						if(a.U_DateAndTime > b.U_DateAndTime){
							return 1;
						}else if(a.U_DateAndTime < b.U_DateAndTime){
							return -1;
						}else if(a.U_DateAndTime == b.U_DateAndTime){
							return 1;
						}
					});
				}
				
				form.getControl("U_Grid").setValue(U_O_Data);
				document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '140px'; // 交易日期/時間
				document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[10].width = '65px'; // 網路服務鍵機行
				document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[11].width = '65px'; // 櫃員代號
				document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[12].width = '65px'; // 主管代號
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	setIdOnchange : function() { // 20210915 Tiffany -- 檢核身份證、統編、統一證號
		Jui.event.attach(form.getControl("U_UID"), "onchange", function() {
			ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
			if (ret) {
				form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
			} else {
				form.setFieldValue("U_UID", null);
			}
		});
	},
};

Jui.option.Grid.doPageButtonClick=function(){ // 20210915 add by gemfor\Tiffany -- 改寫網格選頁按鈕
	var b=Jui.$owner();
	var a=this;
	if(!a.hasAttribute("Forbidden")){
		if(a==b._firstPageButton){
			b._loadPage(1);
		}else{
			if(a==b._previousPageButton){
				b._loadPage(b._pageIndex-1);
			}else{
				if(a==b._nextPageButton){
					b._loadPage(b._pageIndex+1);
				}else{
					if(a==b._lastPageButton){
						b._loadPage(Math.ceil(b._dataJson.length/b._pageSize));
					}
				}
			}
		}
	}
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '140px'; // 交易日期/時間
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[10].width = '65px'; // 網路服務鍵機行
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[11].width = '65px'; // 櫃員代號
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[12].width = '65px'; // 主管代號
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20210915 add by gemfor\Tiffany -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};