// 自動化銀行系統-電話銀行語音轉帳資料檔
var UVoiceBankTransForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/08 
	 * Description: 自動化銀行系統-電話銀行語音轉帳資料檔
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
			if(Jui.object.isEmpty(form.getFieldValue("U_ACNO"))){
				Jui.message.alert("請填寫\"申請帳號\"");
				return;
			}
			form.getControl("U_Grid").setValue();
			UVoiceBankTransForm.doCQ03();
		};
		UVoiceBankTransForm.doOnchange(); // 20210927 add by gemfor\Tiffany
	},

	doCQ03 : function() { // 上送CQ03
		if (!form.validate()) {
			return;
		}
		var acno = form.getFieldValue("U_ACNO");
		UVoiceBankTransForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		UVoiceBankTransForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ03",
			"ACN" : acno, // 申請帳號
		};
		var args = JSON.stringify({
			"name" : "CQ03tbbapi",
			"from" : "CSR",
			"sessionId" : UVoiceBankTransForm.sessionId,
			"agentId" : UVoiceBankTransForm.agentId,
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
					if (!Jui.object.isEmpty(formData.REC[i].TSFACN.trim())) {
						// 行庫別
						var bankNo = formData.REC[i].BANKCOD;
						bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dcfbb-a590-0d75-1395-d8f2cab1cb50"}).data;
						for (var j = 0; j < bankNoDic.length; j++) {
							if (bankNoDic[j].value == formData.REC[i].BANKCOD) {
								bankNo = bankNoDic[j].text;
								break;
							}
						}
						// 狀態碼
						var statusCode = formData.REC[i].STSCOD;
						statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6a74-4ec0-0f8c-40b2-9201392884ce"}).data;
						for (var p = 0; p < statusCodeDic.length; p++) {
							if (statusCodeDic[p].value == formData.REC[i].STSCOD) {
								statusCode = statusCodeDic[p].text;
								break;
							}
						}
						// 業務類別
						var bUTypeDesc = formData.REC[i].TYPE;
						bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6a61-1950-0f8c-40b2-9201392884ce"}).data;
						for (var q = 0; q < bUTypeDescDic.length; q++) {
							if (bUTypeDescDic[q].value == formData.REC[i].TYPE) {
								bUTypeDesc = bUTypeDescDic[q].text;
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
								U_DepositAC : formData.REC[i].TSFACN,
								U_BankNo : bankNo,
								U_StatusCode : statusCode,
								U_ApplyTransDT : formData.REC[i].DATAPL.length == "7" ? formData.REC[i].DATAPL.substr(0, 3) + "/" + formData.REC[i].DATAPL.substr(3, 2) + "/" + formData.REC[i].DATAPL.substr(5, 2) : "",
								U_ApplyCanDT : formData.REC[i].DATDLT.length == "7" ? formData.REC[i].DATDLT.substr(0, 3) + "/" + formData.REC[i].DATDLT.substr(3, 2) + "/" + formData.REC[i].DATDLT.substr(5, 2) : "",
								U_TellerNo : formData.REC[i].TLRNUM,
								U_BUTypeDesc : bUTypeDesc,
								U_UUseACNO : formData.REC[i].OFACNID,
								U_BRHCOD : brhCOD, // 20210927 Tiffany 鍵機分行別
						};
						U_O_Data.push(record);
					}
				}
				
				// 20210917 add by gemfor\Tiffany - 資料依轉帳申請由遠到近排序
				U_O_Data = U_O_Data.sort(function(a,b){
					if(a.U_ApplyTransDT < b.U_ApplyTransDT){
						return -1;
					}else if(a.U_ApplyTransDT > b.U_ApplyTransDT){
						return 1;
					}else if(a.U_ApplyTransDT == b.U_ApplyTransDT){
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
			UVoiceBankTransForm.doACNO();
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
