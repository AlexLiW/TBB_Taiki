// 自動化銀行系統-語音查詢歷史資料檔
var UVoiceHistoryForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/16 
	 * Description: 自動化銀行系統-語音查詢歷史資料檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\tiffany.wu; 
	 * LastUpdateDate: 2021/09/27
	 * Note: 新增查詢無資料邏輯、帳號字數檢核、新增網格欄位鍵機分行別
	 **************************************************************************/
	doLoad : function() {
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Button").onclick = function() {
			form.getControl("U_Grid").setValue();
			UVoiceHistoryForm.doCQ02();
		};
		UVoiceHistoryForm.doOnchange(); // 20210927 add by gemfor\Tiffany
	},

	doCQ02 : function() { // 上送CQ02
		if (!form.validate()) {
			return;
		}
		var acno = form.getFieldValue("U_ACNO");
		UVoiceHistoryForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UVoiceHistoryForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ02",
			"ACN" : acno, // 申請帳號
		};
		var args = JSON.stringify({
			"name" : "CQ02tbbapi",
			"from" : "CSR",
			"sessionId" : UVoiceHistoryForm.sessionId,
			"agentId" : UVoiceHistoryForm.agentId,
			"formData" : data,
		});
		TBBUtil.doPost(JSON.parse(args), function(ret) {
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
				var U_O_Data = [];
				var formData = ret.form;
				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
					if (!Jui.object.isEmpty(formData.REC[i].DATTRN.trim()) && !Jui.object.isEmpty(formData.REC[i].TIMTRN.trim())) {
						// 業務類別
						var bUTypeDesc = formData.REC[i].TYPE;
						bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dd4ba-6820-0d75-1395-d8f2cab1cb50"}).data;
						for (var q = 0; q < bUTypeDescDic.length; q++) {
							if (bUTypeDescDic[q].value == formData.REC[i].TYPE) {
								bUTypeDesc = bUTypeDescDic[q].text;
								break;
							}
						}
						// 行庫別
						var bankNo = formData.REC[i].BANKCOD;
						bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dcfbb-a590-0d75-1395-d8f2cab1cb50"}).data;
						for (var j = 0; j < bankNoDic.length; j++) {
							if (bankNoDic[j].value == formData.REC[i].BANKCOD) {
								bankNo = bankNoDic[j].text;
								break;
							}
						}
						// 掛失種類
						var disType = formData.REC[i].LOSFLG;
						disTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6ab0-7b10-0f8c-40b2-9201392884ce"}).data;
						for (var p = 0; p < disTypeDic.length; p++) {
							if (disTypeDic[p].value == formData.REC[i].LOSFLG) {
								disType = disTypeDic[p].text;
								break;
							}
						}
						// 鍵機分行別 20210927 add by gemfor\Tiffany
						var brhCOD = formData.REC[i].BRHCOD;
						brhCODDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f40d-c207-17c0b9154140"}).data; // TBB-分行別(中文+代號)
						for (var r = 0; r < brhCODDic.length; r++) {
							if (brhCODDic[r].value == formData.REC[i].BRHCOD) {
								brhCOD = brhCODDic[r].text;
								break;
							}
						}
						var record = {
								U_DateAndTime : TBBUtil.formatDTM(formData.REC[i].DATTRN, formData.REC[i].TIMTRN).substr(0,18),
								U_BUTypeDesc : bUTypeDesc,
								U_BankNo : bankNo,
								U_TransACNO: formData.REC[i].TSFACN,
								U_ErrMsg : formData.REC[i].TRXCOD,
								U_DisType : disType,
								U_TellerNo : formData.REC[i].TLRNUM,
								U_DirecctorNo : formData.REC[i].SPVNUM,
								U_BRHCOD : brhCOD, // 20210927 Tiffany
						};
						U_O_Data.push(record);
					}
				}
				
				// 20210917 add by gemfor\Tiffany - 資料依轉帳申請由遠到近排序
				U_O_Data = U_O_Data.sort(function(a,b){
					if(a.U_DateAndTime < b.U_DateAndTime){
						return -1;
					}else if(a.U_DateAndTime > b.U_DateAndTime){
						return 1;
					}else if(a.U_DateAndTime == b.U_DateAndTime){
						return -1;
					}
				});
				
				form.getControl("U_Grid").setValue(U_O_Data);
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	doOnchange : function() { // 20210927 add by gemfor\Tiffany -- onchange
		form.getControl("U_ACNO").onchange = function() {
			UVoiceHistoryForm.doACNO();
		};
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
