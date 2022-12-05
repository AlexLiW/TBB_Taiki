// 網銀主檔
var EBankingInfoForm = {

	/***************************************************************************
	 * Author: gemfor\tiffany.wu; 
	 * CreateDate: 2021/06/17 
	 * Description: 網銀主檔
	 * 
	 * input parameters: N/A
	 * 
	 * output parameters: N/A
	 * 
     * LastUpdateUser: gemfor/Emma; 
     * LastUpdateDate: 2022/3/30
     * Note: 2021/12/21 加入等待電文回覆效果，調整將臨櫃異動種類改為多勾選框、網銀服務鍵機行轉為中文顯示
					 2021/09/28 chainsea\Yuwen.Wang CQ13下行新增網銀服務鍵機行、網路銀行推廣行員
					 2022/3/11 gemfor/Emma doCQSend:調整CQ15/約定書類別/傳值內容
					 2022/3/30 gemfor/Emma doCQSend:調整CQ15/約定書類別/傳值內容、新增doMultiCheckBox1 for約定書類別
	 **************************************************************************/
	doLoad : function() {
		// 設定按鈕大小
		form.getControl("U_CQ13Button").setElementStyle("width: 30%");
		form.getControl("U_CQ14Button").setElementStyle("width: auto");
		form.getControl("U_CQ15Button").setElementStyle("width: auto");
		EBankingInfoForm.setOnclick();
		
		if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID);
		} else {// 電子金融開啟表單
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
		
		EBankingInfoForm.setIdOnchange(); // 20210915
	},

	setOnclick : function() { // onclick
		form.getControl("U_CQ13Button").onclick = function() { // 查詢
			TBBUtil.doClearFields("網路銀行轉帳主檔", "基本資訊");
			form.getControl("U_Grid").setValue(); // 20210713
			TBBUtil.doClearFields("行動銀行快速登入記錄檔", "基本資訊"); // 20210713
			EBankingInfoForm.doCQSend("CQ13");
		};
		form.getControl("U_CQ14Button").onclick = function() { // 查詢網路銀行轉帳延伸檔
			form.getControl("U_Grid").setValue();
			EBankingInfoForm.doCQSend("CQ14");
		};
		form.getControl("U_CQ15Button").onclick = function() { // 查詢行動銀行快速登入紀錄檔
			TBBUtil.doClearFields("行動銀行快速登入記錄檔", "基本資訊");
			EBankingInfoForm.doCQSend("CQ15");
		};
	},
	
	doCQSend : function(TXID) { // 上送CQ13、CQ14、CQ15
		if (!form.validate()) {
			return;
		}
		var uid = form.getFieldValue("U_UID"); // 統一編號
		EBankingInfoForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		EBankingInfoForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": TXID,
			"CUSIDN" : uid, // 統一編號
		};
		var args = JSON.stringify({
			"name" : TXID + "tbbapi",
			"from" : "CSR",
			"sessionId" : EBankingInfoForm.sessionId,
			"agentId" : EBankingInfoForm.agentId,
			"formData" : data,
		});
		var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177dcfbb-a590-0d75-1395-d8f2cab1cb50"
        }).data; // TBB_銀行行庫代碼
        var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					if ("CQ13" == TXID) {
						TBBUtil.doClearFields("網路銀行轉帳主檔", null, null);
					} else if ("CQ14" == TXID) {
						TBBUtil.doClearFields("網路銀行轉帳延伸檔", null, null);		
					} if ("CQ15" == TXID) {
						TBBUtil.doClearFields("行動銀行快速登入記錄檔", null, null);		
					}
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
						if ("CQ13" == TXID) {
							TBBUtil.doClearFields("網路銀行轉帳主檔", null, null);
						} else if ("CQ14" == TXID) {
							TBBUtil.doClearFields("網路銀行轉帳延伸檔", null, null);		
						} if ("CQ15" == TXID) {
							TBBUtil.doClearFields("行動銀行快速登入記錄檔", null, null);		
						}
						Jui.message.alert("查詢無資料！\n交易代號：" + ABENDtxt);
						bar.close();
						return;
					}
					var formData = ret.form;				
					if ("CQ13" == TXID) {
						form.setFieldValue("U_TSFCNT", formData.TSFCNT); // 轉出帳個數
						form.setFieldValue("U_LOGINDTM", TBBUtil.formatDTM(formData.LOGINDT, formData.LOGINTM)); // 上次登入日期/時間
						form.setFieldValue("U_IsEmail", formData.E_MAIL); // 是否保留電子郵箱位址
						form.setFieldValue("U_STSCOD1_CQ13", Jui.string.isEmpty(formData.STSCOD1) ? "空白" : formData.STSCOD1); // 通行碼狀態
						form.setFieldValue("U_STSCOD2_CQ13", Jui.string.isEmpty(formData.STSCOD2) ? "空白" : formData.STSCOD2); // 交易密碼狀態
						form.setFieldValue("U_CHGMAIL", TBBUtil.formatDTM(formData.CHGMAIL)); // 變更電子郵箱位址日期
						form.setFieldValue("U_SETNBP1", formData.SETNBP1); // 通行碼解鎖次數
						form.setFieldValue("U_SETNBP2", formData.SETNBP2); // 交易碼解鎖次數
						form.setFieldValue("U_PWDDTTM", TBBUtil.formatDTM(formData.PWDDAT, formData.PWDTIM)); // 密碼連續鎖誤五次日期/時間
						form.setFieldValue("U_CNTNBW1", formData.CNTNBW1); // 通行碼錯誤次數
						form.setFieldValue("U_CNTNBW2", formData.CNTNBW2); // 交易碼錯誤次數
						form.setFieldValue("U_TYPE", EBankingInfoForm.doMultiCheckBox(formData.TYPE)); // 業務類別
						form.setFieldValue("U_APLCODB", EBankingInfoForm.doMultiCheckBox(formData.APLCODB)); // 申請業務類別B
						form.setFieldValue("U_APLCODA", EBankingInfoForm.doMultiCheckBox(formData.APLCODA)); // 申請類別A
						form.setFieldValue("U_USERID", formData.USERID); // 使用者名稱
						form.setFieldValue("U_UIDSTC", formData.UIDSTC); // 使用者名稱狀態
						form.setFieldValue("U_E_BILL", formData.E_BILL); // EMAIL電子交易對帳單
						form.setFieldValue("U_UIDCNT", formData.UIDCNT); // 使用者代號可錯誤次數
						form.setFieldValue("U_APLBRH", formData.APLBRH); // 原網路服務申請行
						form.setFieldValue("U_SNHKEY", TBBUtil.formatDTM(formData.SNHKEY)); // 申請行變更日期
						form.setFieldValue("U_CUSCOD", formData.CUSCOD); // 客戶性質別
						form.setFieldValue("U_TRAACN", formData.TRAACN); // 扣帳帳號
						if(formData.CHGPSS == "000000"){
							form.setFieldValue("U_CHGPSS", "交易密碼變更成功，簽入密碼變更失敗"); //上次密碼變更日期
						}else if(formData.CHGPSS == "999999"){
							form.setFieldValue("U_CHGPSS", "簽入密碼變更成功，交易密碼變更成功"); //上次密碼變更日期
						}else{
							form.setFieldValue("U_CHGPSS", TBBUtil.formatDTM(formData.CHGPSS)); //上次密碼變更日期
						}
						form.setFieldValue("U_DATAPL", TBBUtil.formatDTM(formData.DATAPL)); // 申請日期
						form.setFieldValue("U_DATDLT", TBBUtil.formatDTM(formData.DATDLT)); // 註銷日期
						//form.setFieldValue("U_UPDFLG", formData.UPDFLG); // 企網臨櫃異動種類
						form.setFieldValue("U_UPDFLG", EBankingInfoForm.doMultiCheckBox(formData.UPDFLG)); // 企網臨櫃異動種類
						form.setFieldValue("U_OPCODE", formData.OPCODE); // 企網使用方式     
						form.setFieldValue("U_CNMARK", formData.CNMARK); // 憑證優惠註記     
						form.setFieldValue("U_PASCODE", EBankingInfoForm.doComboBox(formData.PASCODE, 2)); // 單人交易放行機制 
						form.setFieldValue("U_CORFLAG", formData.CORFLAG); // 關係戶           
						form.setFieldValue("U_SECCODE", EBankingInfoForm.doComboBox(formData.SECCODE, 5)); // 安全機制代碼     
						form.setFieldValue("U_IDNCOD", formData.IDNCOD); // 企業網銀/個人網銀
						//20210928 chainsea/Yuwen.Wang CQ13下行新增網銀服務鍵機行、網路銀行推廣行員
						form.setFieldValue("U_BRHTMP", formData.BRHTMP); // 網銀服務鍵機行
						form.setFieldValue("U_CHEERER", formData.CHEERER); // 網路銀行推廣行員
						bar.close();
					} else if ("CQ14" == TXID) {
						var mbstatDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-7932-750a-17a3d32ed710"}).data; // TBB-網銀主檔-行動銀行目前狀態
						var U_O_Data = [];
						var record = {
								//U_TRAAMT : TBBUtil.thousandComma(parseInt(formData.TRAAMT)), // 本日累計轉帳金額
								U_MBLINDTTM : TBBUtil.formatDTM(formData.MBLINDT, formData.MBLINTM), // 上次登入日期/時間 (MB)
								U_MBSTAT : EBankingInfoForm.getDicText(mbstatDic, formData.MBSTAT), // 行動銀行目前狀態
								U_MBOPNDTTM : TBBUtil.formatDTM(formData.MBOPNDT, formData.MBOPNTM), // MB啟用/關閉日期/時間
								U_SETPWDT : TBBUtil.formatDTM(formData.SETPWDT), // 簽入密碼重設日期
								U_SETPWDT2 : TBBUtil.formatDTM(formData.SETPWDT2), // 交易密碼重設日期
								U_SETPCNT : formData.SETPCNT, // 簽入當日密碼重設次數
								U_SETPCNT2 : formData.SETPCNT2, // 交易當日密碼重設次數
						};
						U_O_Data.push(record);
						form.getControl("U_Grid").setValue(U_O_Data);
						bar.close();
					} else if ("CQ15" == TXID) {
						form.setFieldValue("U_QKLINDTTM", TBBUtil.formatDTM(formData.QKLINDT, formData.QKLINTM)); // 上次登入日期/時間(快登)
						form.setFieldValue("U_QLGIDT", TBBUtil.formatDTM(formData.QLGIDT)); // 快登啟用/關閉日期
						form.setFieldValue("U_QCKSTAT", Jui.string.isEmpty(formData.QCKSTAT) ? "空白" : formData.QCKSTAT); // 快登目前狀態
						form.setFieldValue("U_QTRNDT", TBBUtil.formatDTM(formData.QTRNDT)); // 快交啟用/關閉日期
						form.setFieldValue("U_QTRSTAT", Jui.string.isEmpty(formData.QTRSTAT) ? "空白" : formData.QTRSTAT); // 快交目前狀態
						form.setFieldValue("U_MOBYN", formData.MOBYN); // 是否同意顯示手機條碼
						form.setFieldValue("U_QSMLDT", TBBUtil.formatDTM(formData.QSMLDT)); // 小額啟用/關閉日期
						form.setFieldValue("U_QSMSTAT", Jui.string.isEmpty(formData.QSMSTAT) ? "空白" : formData.QSMSTAT); // 小額目前狀態
						form.setFieldValue("U_MOBCODE", formData.MOBCODE); // 手機條碼
						form.setFieldValue("U_QSMTFDT", TBBUtil.formatDTM(formData.QSMTFDT)); // 轉帳日期
						form.setFieldValue("U_QSMLCNT", formData.QSMLCNT); // 小額當日已轉帳次數
						form.setFieldValue("U_MOBDATE", TBBUtil.formatDTM(formData.MOBDATE)); // 手機條碼日期
						form.setFieldValue("U_BIOME", formData.BIOME); // 生物辨識
						form.setFieldValue("U_VERYN", formData.VERYN); // 是否同意約定書
						//form.setFieldValue("U_VERTYPE", EBankingInfoForm.doComboBox(formData.VERTYPE, 8)); // 約定書類別
						//form.setFieldValue("U_VERTYPE", EBankingInfoForm.doComboBox(formData.VERTYPE)); // 約定書類別 20220311 add gemfor/Emma 約定書類別為勾選框,更改傳值內容
						form.setFieldValue("U_VERTYPE", (EBankingInfoForm.doMultiCheckBox1(formData.VERTYPE))); // 約定書類別 20220330 add gemfor/Emma 約定書類別為勾選框,更改傳值內容
						form.setFieldValue("U_VERNUM1", formData.VERNUM1); // 約定書版號一	
						form.setFieldValue("U_VERDATE1", TBBUtil.formatDTM(formData.VERDATE1)); // 立約註銷日期一	
						form.setFieldValue("U_STSCOD1", formData.STSCOD1); // 狀態一			
						form.setFieldValue("U_VERNUM2", formData.VERNUM2); // 約定書版號二	
						form.setFieldValue("U_VERDATE2", TBBUtil.formatDTM(formData.VERDATE2)); // 立約註銷日期二	
						form.setFieldValue("U_STSCOD2", formData.STSCOD2); // 狀態二			
						form.setFieldValue("U_VERNUM3", formData.VERNUM3); // 約定書版號三	
						form.setFieldValue("U_VERDATE3", TBBUtil.formatDTM(formData.VERDATE3)); // 立約註銷日期三	
						form.setFieldValue("U_STSCOD3", formData.STSCOD3); // 狀態三			
						form.setFieldValue("U_VERNUM4", formData.VERNUM4); // 約定書版號四	
						form.setFieldValue("U_VERDATE4", TBBUtil.formatDTM(formData.VERDATE4)); // 立約註銷日期四	
						form.setFieldValue("U_STSCOD4", formData.STSCOD4); // 狀態四			
						form.setFieldValue("U_VERNUM5", formData.VERNUM5); // 約定書版號五	
						form.setFieldValue("U_VERDATE5",TBBUtil.formatDTM(formData.VERDATE5)); // 立約註銷日期五	
						form.setFieldValue("U_STSCOD5", formData.STSCOD5); // 狀態五			
						form.setFieldValue("U_VERNUM6", formData.VERNUM6); // 約定書版號六	
						form.setFieldValue("U_VERDATE6", TBBUtil.formatDTM(formData.VERDATE6)); // 立約註銷日期六	
						form.setFieldValue("U_STSCOD6", formData.STSCOD6); // 狀態六			
						form.setFieldValue("U_VERNUM7", formData.VERNUM7); // 約定書版號七	
						form.setFieldValue("U_VERDATE7", TBBUtil.formatDTM(formData.VERDATE7)); // 立約註銷日期七	
						form.setFieldValue("U_STSCOD7", formData.STSCOD7); // 狀態七			
						form.setFieldValue("U_VERNUM8", formData.VERNUM8); // 約定書版號八	
						form.setFieldValue("U_VERDATE8", TBBUtil.formatDTM(formData.VERDATE8)); // 立約註銷日期八	
						form.setFieldValue("U_STSCOD8", formData.STSCOD8); // 狀態八
						bar.close();
					}
				} else {
					if ("CQ13" == TXID) {
						TBBUtil.doClearFields("網路銀行轉帳主檔", null, null);
					} else if ("CQ14" == TXID) {
						TBBUtil.doClearFields("網路銀行轉帳延伸檔", null, null);		
					} if ("CQ15" == TXID) {
						TBBUtil.doClearFields("行動銀行快速登入記錄檔", null, null);		
					}
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
			}, 1 * 1000);
		});
	},
	
	doMultiCheckBox : function(data) { // 多勾選框 取值方法
		var value = "";
		var array = data.split("", 8);
		for (var i = 0; i < array.length; i++) {
			if (array[i] == "1") {
				value = value + i + ",";
			}
		}
		return value;
	},
	doMultiCheckBox1 : function(data) { // 2022.03.30-Emmma-多勾選框 取值方法for約定書類別
		var value = "";
		var array = data.split("", 8);
		for (var i = 0; i < array.length; i++) {
			if (array[i] == "1") {
				value = value + (i+1) + ",";
			}
		}
		return value;
	},
	
	doComboBox : function(data, limit) { // 下拉選單 取值方法
		var value = "";
		if (data.split("1").length - 1 < 2) { // 0或1個
			var array = data.split("", 8);
			for (var i = 0; i < array.length; i++) {
				if (array[i] == "1") {
					value = i + 1;
				}
			}
			if (value > limit) {
				value = data;
			}
		} else { // 超過1個
			value = data;
		}
		return value;
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
	
	setIdOnchange : function() { // 20210915 Tiffany -- 檢核身份證、統編、統一證號
		Jui.event.attach(form.getControl("U_UID"), "onchange", function() {
			ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
			if (ret) {
				form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
			} else {
				form.setFieldValue("U_UID", null);
				TBBUtil.doClearFields("網路銀行轉帳主檔", null, null);
				TBBUtil.doClearFields("網路銀行轉帳延伸檔", null, null);		
				TBBUtil.doClearFields("行動銀行快速登入記錄檔", null, null);		
			}
		});
	},
};
