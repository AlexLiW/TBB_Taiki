// XML憑證資料檔
var XMLdocForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/21 
	 * Description: XML憑證資料檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
	 * LastUpdateUser: gemfor\tiffany.wu; 
	 * LastUpdateDate: 2021/09/27
	 * Note: 新增查詢無資料邏輯
	 * 		 Gemfor.Tiffany 2022/02/21 重新查詢時清空/其他資訊/網格
	 **************************************************************************/
	
	OtherData : [],
		
	doLoad : function() {
		form.setFieldVisible("U_OtherGrid", false);
		form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		form.getControl("U_Button").onclick = function() {
			form.getControl("U_Grid").setValue();
			form.getControl("U_OtherGrid").setValue(); // 20220221 add by gemfor\Tiffany 清空/其他資訊/網格
			XMLdocForm.doCQ11();
		};
		if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID);
		} else {// 電子金融開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
		XMLdocForm.setIdOnchange();
	},

	doCQ11 : function() { // 上送CQ11
		if (!form.validate()) {
			return;
		}
		var uid = form.getFieldValue("U_UID");
		XMLdocForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		XMLdocForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "CQ11",
			"CUSIDN" : uid, // 統一編號
		};
		var args = JSON.stringify({
			"name" : "CQ11tbbapi",
			"from" : "CSR",
			"sessionId" : XMLdocForm.sessionId,
			"agentId" : XMLdocForm.agentId,
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
				var U_OtherData = [];
				var formData = ret.form;
				
				// 獲取字典data
				var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dcfbb-a590-0d75-1395-d8f2cab1cb50"}).data; // TBB_銀行行庫代碼
				var tCHEcFlgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-084c-280a-17a2dbab4770"}).data; // TBB-XML憑證資料檔-票交所電子憑證狀態
				var applyEcFlgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-084c-280a-17a2dbba2900"}).data; // TBB-XML憑證資料檔-申請電子票據業務註記
				var statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6dcf-1e80-0f8c-40b2-9201392884ce"}).data; // TBB-XML憑證資料檔-狀態碼
				var deductTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6de1-f060-0f8c-40b2-9201392884ce"}).data; // TBB-XML憑證資料檔-扣帳方式
				var ctDdUseDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-084c-280a-17a2dcf15510"}).data; // TBB-XML憑證資料檔-櫃檯扣帳已使用
				var is2048DevDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6db1-0500-0f8c-40b2-9201392884ce"}).data; // TBB-XML憑證資料檔-是否為2048載具
				var chg2048DevDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f6dbc-e770-0f8c-40b2-9201392884ce"}).data; // TBB-XML憑證資料檔-是否已更換2048載具

				var REC_LEN = formData.REC.length; // 看有幾筆資料
				for (var i = 0; i < REC_LEN; i++) {
					if (!Jui.object.isEmpty(formData.REC[i].BNKRA.trim())) {
						var bankNo = XMLdocForm.getDicText(bankNoDic, formData.REC[i].BNKRA); // 行庫別
						var tCHEcFlg = XMLdocForm.getDicText(tCHEcFlgDic, Jui.string.isEmpty(formData.REC[i].ECHSTS) ? "空白" : formData.REC[i].ECHSTS); // 票交所電子憑證狀態
						var applyEcFlg = XMLdocForm.getDicText(applyEcFlgDic, Jui.string.isEmpty(formData.REC[i].ECHECK) ? "空白" : formData.REC[i].ECHECK); // 申請電子票據業務註記
						var statusCode = XMLdocForm.getDicText(statusCodeDic, Jui.string.isEmpty(formData.REC[i].STSCOD) ? "空白" : formData.REC[i].STSCOD); // 狀態碼
						var deductType = XMLdocForm.getDicText(deductTypeDic, formData.REC[i].PAYMTH); // 扣帳方式
						var ctDdUse = XMLdocForm.getDicText(ctDdUseDic, formData.REC[i].PAYCOD); // 櫃檯扣帳已使用
						var is2048Dev = XMLdocForm.getDicText(is2048DevDic, formData.REC[i].KEY_NEW); // 是否為2048載具
						var chg2048Dev = XMLdocForm.getDicText(chg2048DevDic, formData.REC[i].REPL_2048); // 是否已更換2048載具

						// 網格
						/* var record = {
								U_BankNo	    : bankNo,
								U_CACode	    : formData.REC[i].XMLCA,
								U_CA		    : formData.REC[i].XMLCN,
								U_DevNo	   		: formData.REC[i].READ_NO,
								U_TCHEcFlg	    : tCHEcFlg,
								U_ApplyEcFlg    : applyEcFlg,
								U_ApplyDate	    : formData.REC[i].DATAPL,
								U_CanDate	    : formData.REC[i].DATDLT,
								U_EcFeeACNO	    : formData.REC[i].ECKACN,
								U_Deduct	    : parseInt(formData.REC[i].PAYCNT),
								U_StatusCode    : statusCode,
								U_CFCDdAmt	    : TBBUtil.thousandComma(parseInt(formData.REC[i].AMOUNT)),
								U_CFCUseDate    : formData.REC[i].CMRKDT,
								U_DeductType    : deductType,
								U_DeductDate    : formData.REC[i].PAYDATE,
								U_EBillDate	    : formData.REC[i].CNPYDT,
								U_EBillTime	    : parseInt(formData.REC[i].CNPYCT),   
								U_CtDdUse	    : ctDdUse,
								U_Is2048Dev	    : is2048Dev,
								U_Chg2048Dev    : chg2048Dev,
								U_CFCStartDt    : formData.REC[i].VLSDT,
								U_CFCEndDt	    : formData.REC[i].VLEDT,
								U_OldDevNo	    : formData.REC[i].READ_OLD,
								U_CFCNo	  		: formData.REC[i].CANUM,
								U_DeductErr	    : formData.REC[i].MSGCOD,
						}; */
						var record = { // 查詢結果
								U_BankNo	    : 	bankNo, 												 // 行庫別
								U_CACode	    : 	formData.REC[i].XMLCA,                                   // CA識別碼
								U_CA		    : 	formData.REC[i].XMLCN,                                   // 憑證CN
								U_DevNo	   		: 	formData.REC[i].READ_NO,                                 // 載具序號
								U_StatusCode    : 	statusCode,                                              // 狀態碼
								U_ApplyDate	    : 	formData.REC[i].DATAPL,                                  // 申請日期
								U_CanDate	    : 	formData.REC[i].DATDLT,                                  // 註銷日期
								U_CFCStartDt    : 	formData.REC[i].VLSDT,                                   // 憑證有效起日
								U_CFCEndDt	    : 	formData.REC[i].VLEDT,                                   // 憑證有效迄日
								U_CFCUseDate    : 	formData.REC[i].CMRKDT,                                  // 憑證優惠使用日期
								U_DeductType    : 	deductType,                                              // 扣帳方式
								U_DeductDate    : 	formData.REC[i].PAYDATE,                                 // 扣帳日期
								U_CtDdUse	    : 	ctDdUse,                                                 // 櫃檯扣帳已使用
								U_CFCDdAmt	    : 	TBBUtil.thousandComma(parseInt(formData.REC[i].AMOUNT)), // 憑證扣款金額
								U_DeductErr	    : 	formData.REC[i].MSGCOD,                                  // 扣帳錯誤訊息
								U_CFCNo	  		: 	formData.REC[i].CANUM,                                   // 憑證序號
						};
						
						var recordOther = { // 其他資訊
								U_EBillDate	    : 	formData.REC[i].CNPYDT,                                  // 全國性繳費憑證優惠日期
								U_EBillTime	    : 	parseInt(formData.REC[i].CNPYCT),                        // 全國性繳費憑證當年度優惠次數
								U_Is2048Dev	    : 	is2048Dev,                                               // 是否為2048載具
								U_Chg2048Dev    : 	chg2048Dev,                                              // 是否已更換2048載具
								U_OldDevNo	    : 	formData.REC[i].READ_OLD,                                // 舊載具序號
								U_TCHEcFlg	    : 	tCHEcFlg,                                                // 票交所電子憑證狀態
								U_ApplyEcFlg    : 	applyEcFlg,                                              // 申請電子票據業務註記
								U_EcFeeACNO	    : 	formData.REC[i].ECKACN,                                  // 電子票據手續費扣帳帳號
								U_Deduct	    : 	parseInt(formData.REC[i].PAYCNT),                        // 詢問扣帳次數
						};
						U_O_Data.push(record);
						U_OtherData.push(recordOther);
					}
				}
				OtherData = U_OtherData;
				form.getControl("U_Grid").setValue(U_O_Data);
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	getDicText : function(dicData, postVal) { // 獲取電文對應字典文字
		var dicText = postVal;
		for (var j = 0; j < dicData.length; j++) {
			if (dicData[j].value == postVal) {
				dicText = dicData[j].text;
				break;
			}
		}
		return dicText;
	},
	
	openOtherGrid : function() { // 20210913 網格-其他資訊
		form.setFieldVisible("U_OtherGrid", true);
		form.getControl("U_OtherGrid").setValue(null);
		var index = form.getControl("U_Grid").getEventRow().index;
		form.getControl("U_OtherGrid").setValue([OtherData[index]]);
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
