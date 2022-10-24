/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/01 
 * Description:疑似不法-登錄交易-圈存登錄作業 TBB.07Register
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor.Emily;
 * LastUpdateDate: 2022/03/31
 * Note: 2021/09/29 新增查詢代碼邏輯、帳號字數檢核
				 2021/10/26 調整圈存類別，將數字07改為字串07、調整欄位顯示交易結果並帶入回傳中文說明
				 Gemfor.Emily 2022/03/31 說明僅限輸入14個字元
 ******************************************************************************/
var Register07Form = {
	sessionId : null,
	agentId : null,
	ACNO : null,
	UID : "",
	doLoad : function() {
		ACNO= clientData.urlArgs.U_ACN;
		if(!Jui.string.isEmpty(ACNO)){
			form.setFieldValue("U_ACNO", ACNO);
		}
		Register07Form.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		Register07Form.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

		form.getControl("U_RegContext").onchange = Register07Form.doChange;
		form.getControl("U_Button").onclick = Register07Form.doCheck;
		
		// 20210921 add by Tiffany
		document.getElementsByName("U_Button")[0].style.paddingLeft = "8px";
		document.getElementsByName("U_Button")[0].style.width = "290px";
		// 20210929 add by Tiffany
		form.getControl("U_ACNO").onchange = Register07Form.doACNO;
	},

	// 連動欄位 hsin
	doChange : function() {
		var regContext = form.getFieldValue("U_RegContext");
		if(regContext == "165"){
			form.setFieldValue("U_Context","165-");	
		}else if(regContext == "聯防"){
			form.setFieldValue("U_Context","聯防");	
		}else{
			form.setFieldValue("U_Context","");	
		}
	},
	
	doACNO : function() { // 20210929 add by gemfor\Tiffany -- 字數檢核
		if (form.getFieldValue("U_ACNO")) {
			if (form.getFieldValue("U_ACNO").length < 11) {
				Jui.message.alert("帳號資料格式須為11位實體帳號");
				form.setFieldValue("U_ACNO", null);
			}
		}
	},

	// 顯示彈跳訊息確認 hsin
	doCheck : function() {
		if (!form.validate()) {
			return;
		} else if (form.getFieldValue("U_Context")) { //Gemfor.Emily 2022/03/31 說明僅限輸入14個字元
			var m =0;	
        	var word = form.getFieldValue("U_Context");
            for(var i = 0; i < word.length; i++) {
                if(word.charCodeAt(i) < 0x4E00 || word.charCodeAt(i) > 0x9FA5) {
                    m = m + 1;
                }else {
    				m = m + 2;
    			}
           }
      if(m >14 ) {
    	  Jui.message.hint("說明僅限輸入14個字元，請重新輸入");
    	  form.setFieldValue("U_Context",null);
    	  return;
      }
		}
		// var checkMessage = '帳號：' + form.getFieldValue("U_ACNO") +  '\n確認執行圈存交易';
		var checkMessage = '帳號：' + form.getFieldValue("U_ACNO") +  '\n確認執行圈存交易' + '\n說明：' + form.getFieldValue("U_Context"); // 20210921 Tiffany
		Jui.message.confirm(checkMessage, function(result) {
			if (result == 'ok') {
				Register07Form.doPost();
			} else {
				return;
			}
		});
	},

	// 執行圈存交易 hsin
	doPost : function() {
		form.setFieldValue("U_ResultCode", "");
		form.setFieldValue("U_Result", "");
		
		data = {
			"ACN" : form.getFieldValue("U_ACNO"),// 帳號
			"CUSIDN" : "",// 統一編號
			"TYPE" : "07",// 終止存提登錄類別 //加上雙引號避免辨識為數字型態
			"OPID" : Register07Form.agentId,// 客服人員代號
			"AMOUNT" : form.getFieldValue("U_Amount"),// 金額
			"DATACT" : "",// 原登錄日期
			"EVTTLR" : "",// 原登錄櫃員代號
			"SEQTRN" : 0,// 原交易序號
			"MESSAGE" : form.getFieldValue("U_Context"), //說明
		};

		var args = JSON.stringify({
			"name" : "S604tbbapi",
			"from" : "csr",
			"sessionId" : Register07Form.sessionId,
			"agentId" : Register07Form.agentId,
			"formData" : data
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			// console.log('0521'+ret);
			console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                return;
         }
			if(ret.isSuccess){
				var source = ret.form;
				if (!(source.ABEND == "OKLR" || source.ABEND == "0000")) { // 20210929 add by gemfor\Tiffany
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = source.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == source.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					//調整欄位顯示交易結果並帶入回傳中文說明
					var res_Message = source.MESSAGE
					form.setFieldValue("U_ResultCode", source.ABEND);
					//form.setFieldValue("U_Result", ABENDtxt);
					form.setFieldValue("U_Result",res_Message.trim());
					TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
					return;
				} else {
					form.setFieldValue("U_ResultCode", source.ABEND);
					form.setFieldValue("U_Result", "交易成功");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
				}
				/* var resultText="";
				if(source.ABEND == "OKLR"){
					resultText="交易成功";
				}else if(source.ABEND == "EACC"){
					resultText="帳號有誤";
				}else if(source.ABEND == "ERDB"){
					resultText="中心檔案有誤";
				}else if(source.ABEND == "ENRD"){
					resultText="無資料";
				}
				form.setFieldValue("U_ResultCode", source.ABEND);
				form.setFieldValue("U_Result", resultText);*/
			}else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				TBBUtil.doSave_custom(); //20211206 加入保存當前表單記錄
                return;
            }
		})

	},
	
	
}
Jui.event.attach(window, 'load', Register07Form.doLoad);