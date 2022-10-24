/*******************************************************************************
 * Author: chainsea\hsin.lin; CreateDate: 2021/06/01
 * Description:疑似不法-登錄交易-解圈登錄作業 TBB.57Register
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
	 * LastUpdateUser: Gemfor.Emily
	 * LastUpdateDate: 2022/03/31
 Note:帳號資料格式
			2021/10/18 調整查詢時不卡解圈說明處理
			2021/10/26 針對解圈另外增加欄位顯示交易結果並帶入回傳中文說明
			2021/11/10 對應金額增加小數點及百分位處理
			2021/11/18 調整交易序號抓取的欄位，並抓取該欄位回傳的末五碼，並取消S602金額的部分處理小數點
			Gemfor.Emma 2022/03/03 新增查詢結果/鍵機行/、/事故說明/欄位取值
			Gemfor.Emily 2022/03/31 說明僅限輸入14個字元
 ******************************************************************************/
var Register57Form = {
    sessionId: null,
    agentId: null,
    ACNO: null,
    UID: "",
    doLoad: function() {
    	
    	Register57Form.setOnchange();// 2021.09.29-gemfor/Emily 帳號資料格式須為11位實體帳號
        
    	ACNO = clientData.urlArgs.U_ACN;
        if (!Jui.string.isEmpty(ACNO)) {
            form.setFieldValue("U_ACNO", ACNO);
        }
        Register57Form.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        Register57Form.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        form.getControl("U_Button1").setElementStyle("width: 30%"); //設定按鈕大小
        form.getControl("U_Button1").onclick = Register57Form.doCheck1;

    },

    // 連動欄位 hsin
    doChange: function() {
        var regContext = form.getFieldValue("U_RegContext");
        if (regContext == "165") {
            form.setFieldValue("U_Context", "165-");
        } else if (regContext == "聯防") {
            form.setFieldValue("U_Context", "聯防");
        } else {
            form.setFieldValue("U_Context", "");
        }
    },
    
    setOnchange : function() {
		// 2021.09.29-gemfor/Emily-帳號若有資料代入，請確認是否有輸入到11碼，若有少輸或多輸，請跳提醒視窗「帳號資料格式須為11位實體帳號」
		form.getControl("U_ACNO").onchange = function() {
			if (form.getFieldValue("U_ACNO") != null
					&& form.getFieldValue("U_ACNO") != "") {
				if (form.getFieldValue("U_ACNO").length != 11) {
					Jui.message.alert("帳號資料格式須為11位實體帳號！");
					form.setFieldValue("U_ACNO", null);
				}
			}
		};
	},

    // 【查詢】顯示彈跳訊息確認 hsin
    doCheck1: function() {
        if (!form.getFieldValue("U_ACNO")) {
            Jui.message.hint("請填寫\"帳號\"");
            return;
        } else {
            Register57Form.doSearch();
        }
    },

    // 顯示彈跳訊息確認 hsin
    doCheck: function() {
        if (!form.getFieldValue("U_ACNO")) {
            Jui.message.hint("請填寫\"帳號\"");
            return;
        } else if (!form.getFieldValue("U_Descript")) {
            Jui.message.hint("請填寫\"解圈說明\"");
            return;
        } else if (form.getFieldValue("U_Descript")) { //Gemfor.Emily 2022/03/31 說明僅限輸入14個字元
        	var m =0;	
        	var word = form.getFieldValue("U_Descript");
            for(var i = 0; i < word.length; i++) {
                if(word.charCodeAt(i) < 0x4E00 || word.charCodeAt(i) > 0x9FA5) {
                    m = m + 1;
                }else {
    				m = m + 2;
    			}
           }
      if(m >14 ) {
    	  Jui.message.hint("解圈說明僅限輸入14個字元，請重新輸入");
    	  form.setFieldValue("U_Descript",null);
    	  return;
      }
        }

        var checkMessage = '帳號：' + form.getFieldValue("U_ACNO") + '\n確認執行解圈交易';
        Jui.message.confirm(checkMessage, function(result) {
            if (result == 'ok') {
                Register57Form.doClick();
            } else {
                return;
            }
        });
    },

    // 執行查詢 hsin
    doSearch: function() {
		if(form.getFieldValue("U_ACNO") == null) { //20211018 AI.Wolf 調整若帳號未填時，再提示需填寫帳號
			if (!form.validate()) {
				return;
			}
		}
        form.setFieldValue("U_Result", "");
        form.setFieldValue("U_ResultCode", "");
        form.setFieldValue("U_Grid", "");

        data = { 
            "ACN": form.getFieldValue("U_ACNO"),// 帳號
            "CUSIDN": "",// 統一編號
            "TYPE": "05",// 類別
            "ITEM": "02",// 項目

        };

        var args = JSON.stringify({
            "name": "S602tbbapi",
            "from": "csr",
            "sessionId": Register57Form.sessionId,
            "agentId": Register57Form.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            // console.log('0521'+ret);
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            if (ret.isSuccess == true) {
            	// 20210929 add by gemfor\Emily -- start
            	var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
            	var ABENDtxt = ret.form.ABEND;
				for (var i = 0; i < codeDic.length; i++) {
					if (codeDic[i].value == ret.form.ABEND) {
						ABENDtxt = codeDic[i].text;
						break;
					}
				}
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
					form.setFieldValue("U_ResultCode", ret.form.ABEND);
					form.setFieldValue("U_Result", ABENDtxt);
					return;
				} else {
					form.setFieldValue("U_ResultCode", ret.form.ABEND);
					form.setFieldValue("U_Result", ABENDtxt);
				}
				// 20210929 add by gemfor\Emily -- end
                var DataGrid = [];
                var formData = ret.form;
                for (var i = 0; i <= formData.REC.length - 1; i++) {
                    //if (formData.REC[i].TRNNUM.trim()) {
					var DATEVT = formData.REC[i].DATEVT;
					var SEQNO = formData.REC[i].SEQNO;
                   if (DATEVT != null && DATEVT.trim() != '' && SEQNO != null && SEQNO.trim() != '') { //2021.11.18 AI.Wolf 調整交易序號抓取的欄位
							//2021/11/10 AI.Wolf 針對金額欄位增加小數點及千分位處理
							var AMTEVT = formData.REC[i].AMTEVT;
							/*
							if (AMTEVT == null || AMTEVT=="") {
								AMTEVT = 0;
							} else if (AMTEVT.length == '1') {
								AMTEVT = "0.0"+ AMTEVT;
							} else if (AMTEVT.length == '2') {
								AMTEVT = "0."+ AMTEVT;
							} else {
								AMTEVT = AMTEVT.substr(0,AMTEVT.length-2) + "." + AMTEVT.substr(AMTEVT.length-2, AMTEVT.length)
							}*/
							//2021.11.18 AI.Wolf 針對金額取消小數點的處理
							if (AMTEVT == null || AMTEVT=="") {
								AMTEVT = "0";
							}
							
							 //2021.11.18 AI.Wolf 調整交易序號抓取的欄位，抓取該欄位回傳的末五碼
							if (SEQNO != null && SEQNO.length == '9') {
								SEQNO = SEQNO.substr(4,8);
							}
                        var record = {
                            U_DATEVT: formData.REC[i].DATEVT,
                            U_EVTTLR: formData.REC[i].EVTTLR,
                            //U_TRNNUM: formData.REC[i].TRNNUM, 
                            U_TRNNUM: SEQNO,  //2021.11.18 AI.Wolf 調整交易序號抓取的欄位，抓取該欄位回傳的末五碼
                            //U_AMTEVT: formData.REC[i].AMTEVT, 
							//U_AMTEVT:Common.fmoney(AMTEVT),
							U_AMTEVT:Common.doCheckNumber(AMTEVT), //帶入參數為金額與小數點位數
							Ori_AMTEVT:formData.REC[i].AMTEVT,
							U_EVTBRH:formData.REC[i].EVTBRH,// Emma-新增鍵機行-20220303
							U_MEMO:formData.REC[i].MEMO, // Emma-新增事故說明-20220303
                        };
                        DataGrid.push(record);
                        form.getControl("U_Grid").setValue(DataGrid);
                    }
                }
            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },

    // 執行解圈交易 hsin
    doClick: function() {
        //form.setFieldValue("U_ResultCode", "");
        //form.setFieldValue("U_Result", "");
        form.setFieldValue("U_ResultCode2", "");
        form.setFieldValue("U_Result2", "");

        var grid = form.getControl('U_Grid').getEventRow();
        data = {
            "ACN": form.getFieldValue("U_ACNO"),// 帳號
            "CUSIDN": "",// 統一編號
            "TYPE": "57",// 終止存提登錄類別
            "OPID": Register57Form.agentId,// 客服人員代號
            //"AMOUNT": grid.data.U_AMTEVT,// 抓欄位:金額
			"AMOUNT": grid.data.Ori_AMTEVT,// 抓未轉換格式前的金額
            "DATACT": grid.data.U_DATEVT,// 抓欄位:原登錄日期
            "EVTTLR": grid.data.U_EVTTLR,// 抓欄位:原登錄櫃員代號
            "SEQTRN": grid.data.U_TRNNUM,// 抓欄位:原交易序號
            "MESSAGE": form.getFieldValue("U_Descript"), // 說明
        };

        var args = JSON.stringify({
            "name": "S604tbbapi",
            "from": "csr",
            "sessionId": Register57Form.sessionId,
            "agentId": Register57Form.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                return;
         }
            if (ret.isSuccess) {
                var source = ret.form;
                var resultText = "";
                if (source.ABEND == "OKLR") {
                    resultText = "交易成功";
                } else if (source.ABEND == "EACC") {
                    resultText = "帳號有誤";
                } else if (source.ABEND == "ERDB") {
                    resultText = "中心檔案有誤";
                } else if (source.ABEND == "ENRD") {
                    resultText = "無資料";
                } else { //針對解圈另外增加欄位顯示交易結果並帶入回傳中文說明
					var res_Message = ret.form.MESSAGE
					resultText = res_Message.trim();
				} //針對解圈另外增加欄位顯示交易結果並帶入回傳中文說明
                //form.setFieldValue("U_ResultCode", source.ABEND);
                //form.setFieldValue("U_Result", resultText);
                form.setFieldValue("U_ResultCode2", source.ABEND);
                form.setFieldValue("U_Result2", resultText);
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
            }else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                return;
            }
        })

    },

}
Jui.event.attach(window, 'load', Register57Form.doLoad);