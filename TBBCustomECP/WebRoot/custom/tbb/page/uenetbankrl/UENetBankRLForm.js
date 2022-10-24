// 企業網路銀行關係戶資料檔
var UENetBankRLForm = {

    /***************************************************************************
     * Author: gemfor\tiffany.wu; 
     * CreateDate: 2021/06/23 
     * Description: 企業網路銀行關係戶資料檔
     * 
     * input parameters: N/A
     * 
     * output parameters: N/A
     * 
     * LastUpdateUser: AI.Wolf.Wu; 
     * LastUpdateDate: 2022/01/20
     * Note: 2021/10/27 增加查無資料時顯示錯誤代碼提示
    				 2021/12/21 將企業網路銀行關係戶轉帳約定資料檔及企業網路銀行關係戶連結檔加入此單元中
					  2022/01/20 AI.Wolf.Wu 增加關係人統一編號欄位，在查詢轉帳約定資料檔時帶入
					  2022/03/10 gemfor Emma.lu CQ07新增/狀態碼/欄位
     **************************************************************************/
    doLoad: function() {
        //設定按鈕大小
        form.getControl("U_Inquiry").setElementStyle("width: 30%");
        //form.getControl("U_Inquiry2").setElementStyle("width: auto");
        form.getControl("U_Inquiry3").setElementStyle("width: 30%");
        document.getElementsByName("U_RLUID")[0].childNodes[0].style.width = "280px"; //調整企業網路銀行關係戶連結檔查詢欄位
        document.getElementsByName("U_RLUID")[0].childNodes[1].style = "padding-left:160px";
		document.getElementsByName("U_RLUID")[0].childNodes[1].children[0].style.width = "180px"
		document.getElementsByName("U_Inquiry")[0].childNodes[0].style.display = "none";
		document.getElementsByName("U_Inquiry3")[0].childNodes[0].style.display = "none";
        UENetBankRLForm.setOnclick();

        if ("entityId" in EntityForm.getInfoWindow().clientData) { // 聯絡人從屬頁面
            form.setFieldValue("U_UID", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));
            /*form.setFieldValue("U_UID2", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));*/
            form.setFieldValue("U_RLUID", CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.entityId, "U_CustID"));
        } else { // 電子金融開啟表單
            var ret = TBBUtil.getContact();
            if (!Jui.array.isEmpty(ret)) {
                var custID = ret.U_CustID;
                form.setFieldValue("U_UID", custID);
                //form.setFieldValue("U_UID2", custID);
                form.setFieldValue("U_RLUID", custID);
            }
        }
		
		TBBUtil.setIdOnchange("U_UID"); //20211222
		TBBUtil.setIdOnchange("U_RLUID"); //20211222
    },
	
    setOnclick: function() { // onclick
        form.getControl("U_Inquiry").onclick = function() { // 查詢
            TBBUtil.doClearFields("企業網路銀行關係戶轉帳約定資料檔", null, null); //查詢前先清空資料
            form.getControl("U_Grid").setValue();
            UENetBankRLForm.doCQSend("CQ09");
        };
        /*form.getControl("U_Inquiry2").onclick = function() { // 查詢網路銀行轉帳延伸檔
            form.getControl("U_Grid2").setValue();
            UENetBankRLForm.doCQSend("CQ05");
        };*/
        form.getControl("U_Inquiry3").onclick = function() { // 查詢
            TBBUtil.doClearFields("企業網路銀行關係戶連結檔", null, null); //查詢前先清空資料
            UENetBankRLForm.doCQSend("CQ07");
        };
    },

    doCQSend: function(TXID) { // 上送CQ09、CQ05  2021.12.21 AI.Wolf 增加上送CQ07、CQ08

        if (!UENetBankRLForm.doValidate(TXID)) { // 檢核必填
            return;
        }

        UENetBankRLForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UENetBankRLForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        var data = {
            "TXID": TXID,
        };
        if ("CQ09" == TXID) {
            data.CUSIDN = form.getFieldValue("U_UID"); // 統一編號
        } else if ("CQ05" == TXID) {
            data.CUSIDN = form.getFieldValue("U_UID2"); // 統一編號
            data.BANKCOD = form.getFieldValue("U_BankNo"); // 行庫別
            data.TSFACN = form.getFieldValue("U_TransACNO"); // 轉出帳號
        } else if ("CQ08" == TXID) {
            TBBUtil.doClearFields("企業網路銀行關係戶轉帳約定資料檔", null, null); //查詢前先清空資料
            var grid = form.getControl('U_Grid').getEventRow();
            data.CUSIDN = form.getFieldValue("U_UID"); // 統一編號
            data.CORIDN = grid.data.U_RLUID; // 關係人統一編號
			//2022/01/20 新增
			form.setFieldValue("U_RLUIDView",grid.data.U_RLUID);
        } else if ("CQ07" == TXID) {
            data.CORIDN = form.getFieldValue("U_RLUID"); // 關係人統一編號
        }
        var args = JSON.stringify({
            "name": TXID + "tbbapi",
            "from": "CSR",
            "sessionId": UENetBankRLForm.sessionId,
            "agentId": UENetBankRLForm.agentId,
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
                    //2021.10.27-AI.Wolf-新增查無資料時要跳的提示訊息
                    let ABEND = ret.form.ABEND; //電文回應代號
                    var ABEND_text = "";
                    //2021.10.27-AI.Wolf-新增回應代碼抓字典項文字
                    let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                        dictionaryId: "ec9b8729-0c00-a947-3c06-179e5676d840"
                    }).data;
                    for (let i = 0; i < ABEND_Dic.length; i++) {
                        if (ABEND_Dic[i].value == ABEND) {
                            ABEND_text = ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND;
                        }
                    }
                    if (ABEND == "0000" || ABEND == "OKLR") {
                        var U_O_Data = [];
                        var formData = ret.form;

                        // 獲取字典data
                        var bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f6f7c-99a0-0f8c-40b2-9201392884ce"
                        }).data; // TBB-企業網路銀行關係戶資料檔-業務類別
                        var statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f6faf-c590-0f8c-40b2-9201392884ce"
                        }).data; // TBB-企業網路銀行關係戶資料檔-狀態碼	
                        var currencyDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f7035-d3c0-0f8c-40b2-9201392884ce"
                        }).data; // TBB-網路銀行轉帳限額檔-幣別
                        var ecFlgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f7054-35d0-0f8c-40b2-9201392884ce"
                        }).data; // TBB-網路銀行轉帳限額檔-電子簽章註記
                        var flgDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "ec9b8729-0c00-957f-080b-17a37ae314b0"
                        }).data; // TBB-網路銀行轉帳限額檔-約定註記

                        //網路銀行關係戶轉帳約定資料檔字典
                        var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177dcfbb-a590-0d75-1395-d8f2cab1cb50"
                        }).data; // TBB_銀行行庫代碼
                        var bUTypeDescDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f7134-1410-0f8c-40b2-9201392884ce"
                        }).data; // TBB-企業網路銀行關係戶轉帳約定資料檔-業務類別
                        var statusCodeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f7149-be10-0f8c-40b2-9201392884ce"
                        }).data; // TBB-企業網路銀行關係戶轉帳約定資料檔-狀態碼
                        var dsACNOTypeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f706b-ba20-0f8c-40b2-9201392884ce"
                        }).data; // TBB-約定帳號性質別  
                        var isSetTimeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f6e8e-7840-0f8c-40b2-9201392884ce"
                        }).data; // TBB-是否設定減免次數
                        var isTransLimitDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f6df8-b0c0-0f8c-40b2-9201392884ce"
                        }).data; // TBB-是否設定最高轉帳金額
                        var isNonPredDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f7128-1f40-0f8c-40b2-9201392884ce"
                        }).data; // TBB-是否設定不得轉非約定

                        //企業網路銀行關係戶連結檔字典
                        var isEmailDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
                            dictionaryId: "177f73d8-8fa0-0f8c-40b2-9201392884ce"
                        }).data; // TBB-是否保留電子郵箱位址

                        if ("CQ09" == TXID) {
                            var REC_LEN = formData.REC.length; // 看有幾筆資料
                            for (var i = 0; i < REC_LEN; i++) {
                                if (!Jui.object.isEmpty(formData.REC[i].CORIDN.trim())) {
                                    var record = {
                                        U_RLUID: formData.REC[i].CORIDN, // 關係人統一編號
                                        U_RLName: formData.REC[i].CORNAM, // 關係人戶名
                                        U_BUTypeDesc: UENetBankRLForm.getDicText(bUTypeDescDic, UENetBankRLForm.doBiteVal(formData.REC[i].TYPE, 1)), // 業務類別
                                        U_StatusCode: UENetBankRLForm.getDicText(statusCodeDic, formData.REC[i].STSCOD), // 狀態碼
                                        U_ApplyTransDT_DATAPL: formData.REC[i].DATAPL, // 關係戶申請授權日期
                                        U_ApplyTransDT_DATDLT: formData.REC[i].DATDLT, // 關係戶註銷授權日期
                                        U_TransAcnoNum: TBBUtil.thousandComma(parseInt(formData.REC[i].TSFCNT)), // 轉出帳號個數
                                        U_TransACNO: formData.REC[i].NBCNT, // 目前網路可用帳號
                                        U_TransDT: formData.REC[i].TSFDAT, // 轉帳日期
                                        U_TotalTransAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].TRAAMT)), // 本日累計轉帳金額
                                        U_LastApplyDT: formData.REC[i].CHGDATE, // 上次業務申請日期
                                    };
                                    U_O_Data.push(record);
                                }
                            }
                            form.getControl("U_Grid").setValue(U_O_Data);
                            bar.close();
                        } else if ("CQ05" == TXID) {
                            var REC_LEN = formData.REC.length; // 看有幾筆資料
                            for (var i = 0; i < REC_LEN; i++) {
                                if (!Jui.object.isEmpty(formData.REC[i].TYPE.trim())) {
                                    var record = {
                                        U_TransType: formData.REC[i].TYPE, // 轉帳類別
                                        U_Flg: UENetBankRLForm.getDicText(flgDic, formData.REC[i].TRFLAG), // 約定註記
                                        U_EcFlg: UENetBankRLForm.getDicText(ecFlgDic, formData.REC[i].XMLCOD), // 電子簽章註記
                                        U_Currency: UENetBankRLForm.getDicText(currencyDic, formData.REC[i].CRY), // 幣別
                                        U_TransDT: formData.REC[i].TSFDAT, // 轉帳日期
                                        U_TransTotalAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].TRAAMT01)), // 一般轉帳累計金額
                                        U_ATransTotalAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].TRAAMT02)), // 整批轉帳累計金額
                                    };
                                    U_O_Data.push(record);
                                }
                            }
                            form.getControl("U_Grid2").setValue(U_O_Data);
                            bar.close();
                        } else if ("CQ08" == TXID) {
                            var REC_LEN = formData.REC.length; // 看有幾筆資料
                            for (var i = 0; i < REC_LEN; i++) {
                                if (!Jui.object.isEmpty(formData.REC[i].BANKCOD.trim()) && !Jui.object.isEmpty(formData.REC[i].TSFACN.trim())) {
                                    // 網格
                                    var record = {
                                        U_BankNo: UENetBankRLForm.getDicText(bankNoDic, formData.REC[i].BANKCOD), // 行庫別
                                        U_TransACNO: formData.REC[i].TSFACN, // 轉帳帳號	
                                        U_BUTypeDesc: UENetBankRLForm.getDicText(bUTypeDescDic, UENetBankRLForm.doBiteVal(formData.REC[i].TYPE)), // 業務類別	
                                        U_StatusCode: UENetBankRLForm.getDicText(statusCodeDic, formData.REC[i].STSCOD), // 狀態碼		
                                        U_ApplyTransDT: formData.REC[i].DATAPL, // 轉帳申請日期	
                                        U_ApplyCanDT: formData.REC[i].DATDLT, // 轉帳註銷日期	
                                        U_FeeDT: formData.REC[i].FEEDATE, // 手續費設定日期	
                                        U_DsACNOType: UENetBankRLForm.getDicText(dsACNOTypeDic, formData.REC[i].ATRCOD), // 約定帳號性質別	
                                        U_FeeFlg: formData.REC[i].FEECOD1, // 手續費註記	
                                        U_IsSetTime: UENetBankRLForm.getDicText(isSetTimeDic, formData.REC[i].FEECOD2), // 是否設定減免次數	
                                        U_SetFeeAMT: TBBUtil.thousandComma(parseInt(formData.REC[i].FEEAMT)), // 設定手續費金額	
                                        U_MonTime: TBBUtil.thousandComma(parseInt(formData.REC[i].DISCONT)), // 每月優惠減免次數	
                                        U_FeeEndDT: formData.REC[i].FEEENDE, // 手續費優惠迄日	
                                        U_MonUseTime: TBBUtil.thousandComma(parseInt(formData.REC[i].DISMON)), // 本月已使用優惠次數	
                                        U_NoticeSetDT: formData.REC[i].REDATE, // 匯款通知取消日期	
                                        U_IsTransLimit: UENetBankRLForm.getDicText(isTransLimitDic, formData.REC[i].AMTCOD), // 是否設定最高轉帳金額	
                                        U_TransLimit: TBBUtil.thousandComma(parseInt(formData.REC[i].AMTLMT)), // 最高轉帳金額	
                                        U_FeeTime: parseInt(formData.REC[i].FCDCNT), // 跨行減免手續費次數	
                                        U_IsNonPred: UENetBankRLForm.getDicText(isNonPredDic, formData.REC[i].TSFNAPL), // 是否設定不得轉非約定	
                                    };
                                    U_O_Data.push(record);
                                }
                            }
                            form.getControl("U_Grid3").setValue(U_O_Data);
                            bar.close();
                        } else if ("CQ07" == TXID) {
                            form.setFieldValue("U_CompanyID", formData.CUSIDN); // 母公司統一編號
                            form.setFieldValue("U_ApplyTransDT", formData.DATAPL); // 關係戶申請授權日期	
                            form.setFieldValue("U_RLTransDT", formData.DATDLT); // 關係戶註銷授權日期	
                            form.setFieldValue("U_NetSev", formData.BRHTMP); // 網路服務鍵機行		
                            form.setFieldValue("U_LastApplyDT", formData.CHGDATE); // 上次業務申請日期		
                            form.setFieldValue("U_IsEmail", UENetBankRLForm.getDicText(isEmailDic, formData.E_MAIL)); // 是否保留電子郵箱位址	
                            form.setFieldValue("U_ChgEmailDT", formData.CHGMAIL); // 變更電子郵箱位址日期	
                            form.setFieldValue("U_EStatement", formData.E_BILL); // E-MAIL電子交易對帳單
                            var STSCOD="";
                            if(formData.STSCOD=="A"){
                            	STSCOD="A正常";
                            }else if(formData.STSCOD=="D"){
                            	STSCOD="D註銷";
                            }
                            form.setFieldValue("U_StatusCode", STSCOD); // 20220310 add by gemfor/Emma-新增/狀態碼/
                            bar.close();
                        }
                    } else {
                        //2021.10.27-AI.Wolf清空查詢結果欄位
                        if ("CQ09" == TXID) {
                            TBBUtil.doClearFields("查詢結果", null, null);
                        } else if ("CQ05" == TXID) {
                            TBBUtil.doClearFields("網路銀行轉帳限額檔", null, null);
                        } else if ("CQ08" == TXID) {
                            TBBUtil.doClearFields("企業網路銀行關係戶轉帳約定資料檔", null, null);
                        } else if ("CQ07" == TXID) {
                            TBBUtil.doClearFields("企業網路銀行關係戶連結檔", null, null);
                        }
                        Jui.message.alert("查詢無資料！\r\n交易代號：" + ABEND_text);
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

    doValidate: function(TXID) { // 檢核必填
        if ("CQ09" == TXID && Jui.string.isEmpty(form.getFieldValue("U_UID"))) {
            Jui.message.hint("請填寫“統一編號”。");
            return false;
        } else if ("CQ05" == TXID) {
            if (Jui.string.isEmpty(form.getFieldValue("U_UID2"))) {
                Jui.message.hint("請填寫“統一編號2”。");
                return false;
            }
            if (Jui.string.isEmpty(form.getFieldValue("U_BankNo"))) {
                Jui.message.hint("請填寫“行庫別”。");
                return false;
            }
            if (Jui.string.isEmpty(form.getFieldValue("U_TransACNO"))) {
                Jui.message.hint("請填寫“轉出帳號”。");
                return false;
            }
        } else if ("CQ07" == TXID && Jui.string.isEmpty(form.getFieldValue("U_RLUID"))) {
            Jui.message.hint("請填寫“關係人統一編號”。");
            return false;
        }
        return true;
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

    doBiteVal: function(data, limit) { // bite取值方法
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
};