// 網路銀行轉入帳號資料檔
var UNetBankDepACNOForm = {

    /***************************************************************************
     * Author: gemfor\tiffany.wu; 
     * CreateDate: 2021/06/22 
     * Description: 網路銀行轉入帳號資料檔
     * 
     * input parameters: N/A
     * 
     * output parameters: N/A
     * 
     * LastUpdateUser: AI.Wolf.Wu; 
     * LastUpdateDate: 2021/12/28
     * Note: 2021/12/21 將企業網銀轉帳限額檔加入此單元中
					 2021/12/28 調整將是否設定不得轉非約定帳號加入網格，並根據新增的帳號長度欄位，調整帳號顯示的內容
     **************************************************************************/

    OtherData: [],

    doLoad: function() {
        form.setFieldVisible("U_OtherGrid", false); //20210927-Emily 其他資訊網格
        form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
		document.getElementsByName("U_Button")[0].childNodes[0].style.display = "none";
        form.getControl("U_Button").onclick = function() {
            form.getControl("U_Grid").setValue();
            UNetBankDepACNOForm.doCQ10();
        };
        if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
            form.setFieldValue("U_UID", clientData.urlArgs.custID);
        } else { // 電子金融開啟表單
            var ret = TBBUtil.getContact();
            if (!Jui.array.isEmpty(ret)) {
                var custID = ret.U_CustID;
                form.setFieldValue("U_UID", custID);
            }
        }
        //UNetBankDepACNOForm.setIdOnchange(); // 20210920-Emily
		TBBUtil.setIdOnchange("U_UID"); //20211222
    },

    doCQ10: function() { // 上送CQ10
        if (!form.validate()) {
            return;
        }
        TBBUtil.doClearFields("網路銀行轉帳限額檔", null, null); //查詢轉入帳號資料檔前，清除網路銀行轉帳限額檔
		TBBUtil.doClearFields("查詢結果", null, null); //查詢轉入帳號資料檔前，清除查詢結果(含其他資訊)
        var uid = form.getFieldValue("U_UID");
        UNetBankDepACNOForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UNetBankDepACNOForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        var data = {
            "TXID": "CQ10",
            "CUSIDN": uid, // 統一編號
        };
        var args = JSON.stringify({
            "name": "CQ10tbbapi",
            "from": "CSR",
            "sessionId": UNetBankDepACNOForm.sessionId,
            "agentId": UNetBankDepACNOForm.agentId,
            "formData": data,
        });
        var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            setTimeout(function() {
                if (ret == undefined) {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
                }
                if (ret.isSuccess == true) {
                    if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210930 add by gemfor\Emily
                        var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "ec9b8729-0c00-a947-3c06-179e5676d840"
                        }).data; // TBB-電文交易結果說明
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
                    var U_O_Data = [];
                    var U_OtherData = [];
                    var formData = ret.form;

                    // 獲取字典data
                    var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177dcfbb-a590-0d75-1395-d8f2cab1cb50"
                    }).data; // TBB_銀行行庫代碼
                    var bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6e9d-8e70-0f8c-40b2-9201392884ce"
                    }).data; // TBB-網路銀行轉入帳號資料檔-業務類別	
                    var statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6ec2-1080-0f8c-40b2-9201392884ce"
                    }).data; // TBB-網路銀行轉入帳號資料檔-狀態碼
                    var dsACNOTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f706b-ba20-0f8c-40b2-9201392884ce"
                    }).data; // TBB-約定帳號性質別  
                    var isTransLimitDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6df8-b0c0-0f8c-40b2-9201392884ce"
                    }).data; // TBB-是否設定最高轉帳金額
                    var isApplyPkFeeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6e09-0a40-0f8c-40b2-9201392884ce"
                    }).data; // TBB-是否申請代繳停車費
                    var isSetTimeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6e8e-7840-0f8c-40b2-9201392884ce"
                    }).data; // TBB-是否設定減免次數
					var isTSFNAPL = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "0800c056-5000-4b12-fb06-17e044c2d180"
                    }).data; // TBB-網路銀行轉入帳號資料檔-是否設定不得轉非約定

                    var REC_LEN = formData.REC.length; // 看有幾筆資料
                    for (var i = 0; i < REC_LEN; i++) {
                        if (!Jui.object.isEmpty(formData.REC[i].BANKCOD.trim()) && !Jui.object.isEmpty(formData.REC[i].TSFACN.trim())) {
                            var bankNo = UNetBankDepACNOForm.getDicText(bankNoDic, formData.REC[i].BANKCOD); // 行庫別
                            //var bUTypeDesc = UNetBankDepACNOForm.getDicText(bUTypeDescDic, UNetBankDepACNOForm.doBiteVal(formData.REC[i].TYPE)); // 業務類別	
							var bUTypeDesc = UNetBankDepACNOForm.changeBUType(formData.REC[i].TYPE);  // 業務類別
                            var statusCode = UNetBankDepACNOForm.getDicText(statusCodeDic, formData.REC[i].STSCOD); // 狀態碼	
                            var dsACNOType = UNetBankDepACNOForm.getDicText(dsACNOTypeDic, formData.REC[i].ATRCOD); // 約定帳號性質別	
                            var isTransLimit = UNetBankDepACNOForm.getDicText(isTransLimitDic, formData.REC[i].AMTCOD); // 是否設定最高轉帳金額	
                            var isApplyPkFee = UNetBankDepACNOForm.getDicText(isApplyPkFeeDic, formData.REC[i].PARKING); // 是否申請代繳停車費	
                            var isSetTime = UNetBankDepACNOForm.getDicText(isSetTimeDic, formData.REC[i].FEECOD2); // 是否設定減免次數	

                            // 網格
                            var record = {
                                U_BankNo: bankNo,
                                //U_TransACNO: formData.REC[i].TSFACN,
								U_TransACNO: UNetBankDepACNOForm.changeACNOLength(formData.REC[i].TSFACN,formData.REC[i].ACN_LEN),
                                U_BUTypeDesc: bUTypeDesc,
                                U_StatusCode: statusCode,
                                U_ApplyTransDT: formData.REC[i].DATAPL,
                                U_ApplyCanDT: formData.REC[i].DATDLT,
                                U_DsACNOType: dsACNOType,
                                //U_FeeDT			: formData.REC[i].FEEDATE,
                                //U_FeeFlg		: formData.REC[i].FEECOD1,
                                //U_SetFeeAMT		: TBBUtil.thousandComma(parseInt(formData.REC[i].FEEAMT)),
                                U_IsTransLimit: isTransLimit,
                                U_TransLimit: TBBUtil.thousandComma(parseInt(formData.REC[i].AMTLMT)),
                                //U_IsApplyPkFee	: isApplyPkFee,                                          
                                U_GoldTWDACNO: formData.REC[i].SVACN,
                                //U_IsSetTime		: isSetTime,
                                //U_MonTime		: TBBUtil.thousandComma(parseInt(formData.REC[i].DISCONT)),
                                //U_MonUseTime	: TBBUtil.thousandComma(parseInt(formData.REC[i].DISMON)),
                                //U_FeeEndDT		: formData.REC[i].FEEENDE,
                                U_NoticeSetDT: formData.REC[i].REDATE,
                                U_NoticeSetAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].REAMT)),
								U_BANKCOD : formData.REC[i].BANKCOD, //增加原本的行庫別參數用來取值
								//20211228 AI.Wolf 新增是否設定不得轉非約定
								U_IfSetNonAgree : UNetBankDepACNOForm.getDicText(isSetTimeDic,formData.REC[i].TSFNAPL), 
								U_TransACNO_Ori: formData.REC[i].TSFACN,
                            };

                            var recordOther = { // 其他資訊
                                U_IsApplyPkFee: isApplyPkFee, // 是否申請代繳停車費
                                U_FeeFlg: formData.REC[i].FEECOD1, // 手續費註記
                                U_IsSetTime: isSetTime, // 是否設定減免次數
                                U_FeeDT: formData.REC[i].FEEDATE, // 手續費設定日期
                                U_SetFeeAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].FEEAMT)), // 設定手續費金額
                                U_MonTime: TBBUtil.thousandComma(parseInt(formData.REC[i].DISCONT)), // 每月優惠減免次數
                                U_MonUseTime: TBBUtil.thousandComma(parseInt(formData.REC[i].DISMON)), // 本月已使用優惠次數
                                U_FeeEndDT: formData.REC[i].FEEENDE, // 手續費優惠迄日
                            };
                            U_O_Data.push(record);
                            U_OtherData.push(recordOther);
                        }
                    }
					U_O_Data = U_O_Data.sort(function(a,b){ //20211213 AI.Wolf 以行庫別、由小到大排序
							if(a.U_ApplyTransDT < b.U_ApplyTransDT) {
								return -1;
							} else if(a.U_ApplyTransDT > b.U_ApplyTransDT) {
								return 1;
							} else if(a.U_ApplyTransDT == b.U_ApplyTransDT){
								return -1;
							}
							
							if(a.U_BANKCOD < b.U_BANKCOD) {
								return -1;
							} else if(a.U_BANKCOD > b.U_BANKCOD) {
								return 1;
							} else if(a.U_BANKCOD == b.U_BANKCOD){
								return -1;
							}
						});
                    OtherData = U_OtherData;
                    form.getControl("U_Grid").setValue(U_O_Data);
                    bar.close();
                } else {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
                }
            }, 1 * 1000);
        });
    },

    doCQ05: function() { // 上送CQ05
        if (!form.validate()) {
            return;
        }
        var uid = form.getFieldValue("U_UID");
        UNetBankDepACNOForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UNetBankDepACNOForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var grid = form.getControl('U_Grid').getEventRow();
        var data = {
            "TXID": "CQ05",
            "CUSIDN": form.getFieldValue("U_UID"), // 統一編號
            "BANKCOD": grid.data.U_BANKCOD, // 行庫別
            //"TSFACN": grid.data.U_TransACNO, // 轉帳帳號
			"TSFACN": grid.data.U_TransACNO_Ori, // 轉帳帳號 //20211229 AI.Wolf 配合帳號長度縮短，查詢CQ05時抓取原始的帳號
			
        };
        var args = JSON.stringify({
            "name": "CQ05tbbapi",
            "from": "CSR",
            "sessionId": UNetBankDepACNOForm.sessionId,
            "agentId": UNetBankDepACNOForm.agentId,
            "formData": data,
        });
        var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            setTimeout(function() {
                if (ret == undefined) {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
                }
                if (ret.isSuccess == true) {
                    if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210930 add by gemfor\Emily
                        var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "ec9b8729-0c00-a947-3c06-179e5676d840"
                        }).data; // TBB-電文交易結果說明
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
                    var U_O_Data = [];
                    var U_OtherData = [];
                    var formData = ret.form;

                    // 獲取字典data
                    var currencyDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f7035-d3c0-0f8c-40b2-9201392884ce"
                    }).data; // TBB-網路銀行轉帳限額檔-幣別
                    var ecFlgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f7054-35d0-0f8c-40b2-9201392884ce"
                    }).data; // TBB-網路銀行轉帳限額檔-電子簽章註記
                    var flgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "ec9b8729-0c00-957f-080b-17a37ae314b0"
                    }).data; // TBB-網路銀行轉帳限額檔-約定註記

                    var REC_LEN = formData.REC.length; // 看有幾筆資料
                    for (var i = 0; i < REC_LEN; i++) {
                        if (!Jui.object.isEmpty(formData.REC[i].TYPE.trim())) {
                            var record = {
                                U_TransType: formData.REC[i].TYPE, // 轉帳類別
                                U_Flg: UNetBankDepACNOForm.getDicText(flgDic, formData.REC[i].TRFLAG), // 約定註記
                                U_EcFlg: UNetBankDepACNOForm.getDicText(ecFlgDic, formData.REC[i].XMLCOD), // 電子簽章註記
                                U_Currency: UNetBankDepACNOForm.getDicText(currencyDic, formData.REC[i].CRY), // 幣別
                                U_TransDT: formData.REC[i].TSFDAT, // 轉帳日期
                                U_TransTotalAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].TRAAMT01)), // 一般轉帳累計金額
                                U_ATransTotalAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].TRAAMT02)), // 整批轉帳累計金額
                            };
                            U_O_Data.push(record);
                        }
                    }
                    form.getControl("U_Grid2").setValue(U_O_Data);
                    bar.close();
                } else {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
                }
            }, 1 * 1000);
        });
    },

    getDicText: function(dicData, postVal) { // 獲取電文對應字典文字
        var dicText = postVal;
        for (var j = 0; j < dicData.length; j++) {
            if (dicData[j].value == postVal) {
                dicText = dicData[j].text;
                break;
            }
        }
        return dicText;
    },

    doBiteVal: function(data) { // bite取值方法
        var value = "";
        if (data.split("1").length - 1 < 2) { // 0或1個
            var array = data.split("", 8);
            for (var i = 0; i < array.length; i++) {
                if (array[i] == "1") {
                    value = i + 1;
                }
            }
        } else { // 超過1個
            value = data;
        }
        return value;
    },

    openOtherGrid: function() { // 20210927 網格-其他資訊
        form.setFieldVisible("U_OtherGrid", true);
        form.getControl("U_OtherGrid").setValue(null);
        var index = form.getControl("U_Grid").getEventRow().index;
        form.getControl("U_OtherGrid").setValue([OtherData[index]]);
    },

    setIdOnchange: function() { // 20210920 Emily -- 檢核身份證、統編、統一證號
        Jui.event.attach(form.getControl("U_UID"), "onchange", function() {
            ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
            if (ret) {
                form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
            } else {
                form.setFieldValue("U_UID", null);
				TBBUtil.doClearFields("網路銀行轉帳限額檔", null, null);
				TBBUtil.doClearFields("查詢結果", null, null);
            }
        });
    },
	changeACNOLength : function(ACNO,length) {
		var c_ACNO = "";
		var length = Number("-" + length);
		if (typeof(ACNO) == "undefined") ACNO = ""; //防止參數為undefined
		if (typeof(length) == "undefined") length = "";
		if (!ACNO && typeof(ACNO)!="undefined" && ACNO!=0) ACNO = ""; //防止參數為null
		if (!length && typeof(length)!="undefined" && length!=0) length = ""; //防止參數為null
		c_ACNO = ACNO.slice(length);
		return c_ACNO;
	},
	changeBUType : function(Type) {
		var bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "177f6e9d-8e70-0f8c-40b2-9201392884ce"
                }).data; // TBB-網路銀行轉入帳號資料檔-業務類別
		var BUTypeDescTmp =[];
		var result = [];
		BUTypeDescTmp = Type.split("");
		for (var i=0; i < BUTypeDescTmp.length; i++) {
			if (BUTypeDescTmp[i] == "1") {
				result.push(UNetBankDepACNOForm.getDicText(bUTypeDescDic, i+1)); 
			}
		}
		result = JSON.stringify(result);
		result = result.replace("[",'').replace("]",'').replace(/\"/g, '');
		return result;
	},
};