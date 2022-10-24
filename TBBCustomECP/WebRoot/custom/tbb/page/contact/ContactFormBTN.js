// 聯絡人--常用交易按鈕
/***************************************************************************
* Author: gemfor\tiffany.wu; 
* CreateDate: 2021/05/24
* Description: [聯絡人]常用交易按鈕
* 
* input parameters: N/A
* 
* output parameters: N/A
* 
* LastUpdateUser: gemfor\emma.lu
* LastUpdateDate: 2022/03/15
* Note: 新增欄位(開戶日期、結清日期、總退票(三年)、總退票註記(三年))
			2021/10/12 AI\Wolf.wu 針對將銀行客戶基本資料內的是否申請電話銀行移動到銀行客戶帳戶明細內，調整塞入的欄位並新增使用帳號查詢S601取得是否申請電話銀行
			2022/01/11 AI\Wolf.wu 調整電文回覆錯誤代碼時顯示提示視窗，調整客戶帳戶明細檔之透支餘額未正確抓取的問題、金額套入格式處理
			2022/02/21 gemfor\Liz.chen 是否申請網銀欄位改使用下拉選單
			2022/3/7 gemfor\emma.lu doPostS110:修改帳號取值迴圈的長度,將所有帳號帶回來
			2022/3/15gemfor\emma.lu doPostS110:帳號順序
**************************************************************************/
var ContactFormBTN = {
    sessionId : null,
    agentId : null,
	doLoad : function() {
		ContactFormBTN.setOnClick();
		
		// 發電文BSIC、S601
		ContactFormBTN.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        ContactFormBTN.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        
        //TBBUtil.doClearFields("客戶帳戶明細", null, "U_ACNO");
        /* TBBUtil.doClearFields("信用卡客戶基本資料查詢", null, null);
        TBBUtil.doClearFields("客戶基本資料檔", null, null);
        TBBUtil.doClearFields("客戶區別資料檔", null, null);
        TBBUtil.doClearFields("客戶帳戶明細", null, null); */
        
        TBBUtil.doClearFields("信用卡客戶基本資料檔", null, null);
        TBBUtil.doClearFields("銀行客戶基本資料檔", null, null);
        TBBUtil.doClearFields("銀行客戶區別資料檔", null, null);
        TBBUtil.doClearFields("銀行客戶帳戶明細", null, null);
        
        if(form.getFieldValue("U_CustID")){
            ContactFormBTN.doPostBSIC();
            ContactFormBTN.doPostS601();
            ContactFormBTN.doPostS110();
        }
       
		
	},

	setOnClick : function() { // onClick
		form.getControl("U_UAccountListBTN").onclick = function() { // 存款帳戶總覽按鈕
			ContactFormBTN.openTBBForm("TBB.UAccountList.Form");
		};
		form.getControl("U_EBankingInfoBTN").onclick = function() { // 網銀主檔
			ContactFormBTN.openTBBForm("TBB.EBankingInfo.Form");
		};
		form.getControl("U_XMLdocBTN").onclick = function() { // XML憑證資料檔
			ContactFormBTN.openTBBForm("TBB.XMLdoc.Form");
		};
		form.getControl("U_UNetBankDepACNOBTN").onclick = function() { // 網路銀行轉入帳號資料檔
			ContactFormBTN.openTBBForm("TBB.UNetBankDepACNO.Form");
		};
		form.getControl("U_UCreditcardholderBTN").onclick = function() { // 信用卡持卡總覽
            ContactFormBTN.openTBBForm("TBB.UCreditcardholder.Form");
        };
        form.getControl("U_ACNO").onchange = ContactFormBTN.doPostS603; // 查詢客戶帳戶明細 下拉onchange S110
        
	},
	
	openTBBForm : function(pageCode) { // 開啟對應表單
		var args = {
			custID : form.getFieldValue("U_CustID"), // 身分證字號
		};
		var options = {
				width: 1685,
                height: 740
		};
		Utility.openDialog(pageCode + ".page", args, options);
	},
	
	// 查詢客戶基本資料BSIC hsin
    doPostBSIC : function() {
		
		var fpidInfo = form.getFieldValue("U_CustID"); 
		var newfpid = "";
		if(fpidInfo.length == 10){
			var res = /[A-Z]{2}[0-9]{8}/;
			if(res.test(fpidInfo)){
				newfpid = form.getFieldValue("U_CustID") + "R";
			} else{
				newfpid = form.getFieldValue("U_CustID");
			}
		} else {
			newfpid = form.getFieldValue("U_CustID");
		}

        data = {
            //"IDNUM" : form.getFieldValue("U_CustID")//統一編號
			"IDNUM" : newfpid//統一編號
        };

        var args = JSON.stringify({
            "name" : "BSICtbbapi",
            "from" : "csr",
            "sessionId" : ContactFormBTN.sessionId,
            "agentId" : ContactFormBTN.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
					var BSIC_Not0000 = Jui.message.hint("發送電文(查詢客戶基本資料BSIC)失敗，詳情請洽資訊處！");
						BSIC_Not0000;
						setTimeout(function() {
							BSIC_Not0000.close();
						}, 1 * 2000);
						return;
            }
            if(ret.isSuccess) {
				let ABEND = ret.form.ABEND;					//電文回應代號
				let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10b4e9770"}).data;
                var formData = ret.form; 
				if(ABEND == "0000") {
					form.setFieldValue("U_CName", formData.NAMECH);
					form.setFieldValue("U_Ename", formData.NAMEEN);
					form.setFieldValue("U_Birthday1", TBBUtil.formatDTM(formData.BIRTHDAY,"").trim());
					form.setFieldValue("U_Gender", formData.GENDER);
					form.setFieldValue("U_Nationality", formData.CTRYIND);
					form.setFieldValue("U_Homephone", formData.TELHOME);
					form.setFieldValue("U_Cellphone", formData.MOBILE);
					form.setFieldValue("U_Custitle", formData.TITLE);
					form.setFieldValue("U_Cusserviceunit", formData.SERVICEUNIT);
					form.setFieldValue("U_Annualincome", formData.ANNUALINCOME);
					form.setFieldValue("U_Domicile", formData.ADDRESIDENT + formData.ADDRESIDENT2);
					form.setFieldValue("U_Residence", formData.ADDMAILING + formData.ADDMAILING2);
					form.setFieldValue("U_Companyaddress", formData.ADDOFFICE + formData.ADDOFFICE2);
					form.setFieldValue("U_Companyphone", formData.TELOFFICE);
					form.setFieldValue("U_Bill", formData.BILLINGADD);
					form.setFieldValue("U_CENSU", formData.CENSU);
					form.setFieldValue("U_ZIP", formData.ZIPCODE);
					form.setFieldValue("U_Note", formData.MEMO);
					form.setFieldValue("U_Billdate", formData.BILLCYCLE);
					form.setFieldValue("U_Maintaindate", TBBUtil.formatDTM(formData.MAINTAINDATE,"").trim());
					form.setFieldValue("U_AcceptDM", formData.DM);
					form.setFieldValue("U_Guarantor", formData.GUARANTOR);
					form.setFieldValue("U_Accountcategory", formData.ACCTTYPE);
				} else {
						for (let i = 0; i < ABEND_Dic.length; i++) {
							if (ABEND_Dic[i].value == ABEND) {
								var  ABENDResult = ABEND_Dic[i].text ? ABEND_Dic[i].text : "";
								var BSIC_Not0000 = Jui.message.hint("查詢無資料(查詢客戶基本資料BSIC)！\n交易代號：" + ABEND + " " +  ABENDResult); 
								BSIC_Not0000;
								setTimeout(function() {
									BSIC_Not0000.close();
								}, 1 * 2000);
							}
						}
						return;
				}
            } else {
                // 電文失敗
                var BSIC_Not0000 = Jui.message.hint("發送電文(查詢客戶基本資料BSIC)失敗，詳情請洽資訊處！");
				BSIC_Not0000;
				setTimeout(function() {
					BSIC_Not0000.close();
				}, 1 * 2000);
                return;
            }
        });
    },	
	
	// 客戶主檔查詢S601 hsin
	doPostS601 : function() {

        data = {
            "ACN" : "", //帳單
            "CUSIDN" : form.getFieldValue("U_CustID"),//統一編號
            "TYPE" : "02",
        };

        var args = JSON.stringify({
            "name" : "S601tbbapi",
            "from" : "csr",
            "sessionId" : ContactFormBTN.sessionId,
            "agentId" : ContactFormBTN.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                    var S601_NotOKLR = Jui.message.hint("發送電文(客戶主檔查詢S601)失敗，詳情請洽資訊處！");
					S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
                    return;
            }
            if(ret.isSuccess){
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDtxt = ret.form.ABEND;
				for (var i = 0; i < codeDic.length; i++) {
					if (codeDic[i].value == ret.form.ABEND) {
						ABENDtxt = codeDic[i].text;
						break;
					}
				}
				var S601_NotOKLR = Jui.message.hint("查詢無資料(客戶主檔查詢S601)！\n交易代號：" + ABENDtxt);
				S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
				return;
			}
                var formData = ret.form; 
                var isEBank,isVoiceBank;
                isEBank = formData.NBYON; //20220221 是否申請網銀改為下拉清單 by Liz
                //formData.NBYON=='Y'?isEBank=1:isEBank=0;
                //formData.TELBYON=='Y'?isVoiceBank=1:isVoiceBank=0; //AI.Wolf移動至帳號明細呼叫
                
                var mark="";
                formData.LCT_MARK_01=='Y'? mark+="0,":"";
                formData.LCT_MARK_02=='Y'? mark+="1,":"";
                formData.LCT_MARK_03=='Y'? mark+="2,":"";
                formData.LCT_MARK_04=='Y'? mark+="3,":"";
                formData.LCT_MARK_05=='Y'? mark+="4,":"";
                formData.LCT_MARK_06=='Y'? mark+="5,":"";
                formData.LCT_MARK_07=='Y'? mark+="6,":"";
                formData.LCT_MARK_08=='Y'? mark+="7,":"";

                
                form.setFieldValue("U_UserName", formData.NAME);
                form.setFieldValue("U_Birthday2", TBBUtil.formatDTM(formData.BRTHDY,"").trim());
                // form.setFieldValue("U_Birthday", formData.BRTHDY);
                form.setFieldValue("U_Birthday", formData.BRTHDY.substr(-4, 4)); // 20210928 Tiffany 語音識別碼
                form.setFieldValue("U_IsEBankOpt", isEBank); //20220221 使用下拉清單 by Liz
                form.setFieldValue("U_Address1", formData.PMTADR);
                form.setFieldValue("U_Address2", formData.CTTADR);
                //form.setFieldValue("U_IsVoiceBank", isVoiceBank); //AI.Wolf移動至帳號明細呼叫
                form.setFieldValue("U_Phone", formData.ARACOD+formData.TELNUM);
                form.setFieldValue("U_Phone2", formData.ARACOD2+formData.TELNUM2);
                form.setFieldValue("U_Moblie", formData.MOBTEL);
                form.setFieldValue("U_EMAIL", formData.MAILADDR);
                form.setFieldValue("U_Career", formData.CAREER1);
                form.setFieldValue("U_Title", formData.CAREER2);
                form.setFieldValue("U_DisFlag", mark); //多勾選formData.LCT_MARK_01~08
                form.setFieldValue("U_RiskLev", formData.CDDCOD);
            } else {
                // 電文失敗
				var S601_NotOKLR = Jui.message.hint("發送電文(客戶主檔查詢S601)失敗，詳情請洽資訊處！");
				S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
                return;
            }
        })

    },
    
    // 發查帳號 S110 hsin
    doPostS110:function()
    {
        if(UCustID.doCheck()){
            var data = {};
            data = {
                "ACN": "", 
                "CUSIDN": form.getFieldValue("U_CustID"),// 統一編號
                "TYPE":"02"
            };

            var args = JSON.stringify({
                "name": "S110tbbapi",
                "from": "csr",
                "sessionId": ContactFormBTN.sessionId,
                "agentId": ContactFormBTN.agentId,
                "formData": data
            });
            TBBUtil.doPost(JSON.parse(args), function(ret) {
                console.log(ret);
				if (ret == undefined) {
					var S110_NotOKLR = Jui.message.hint("發送電文(取得客戶帳戶明細檔帳號 S110)失敗，詳情請洽資訊處！");
					S110_NotOKLR;
					setTimeout(function() {
						S110_NotOKLR.close();
					}, 1 * 2000);
                    return;
				}
                if (ret.isSuccess) {
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDtxt = ret.form.ABEND;
				for (var i = 0; i < codeDic.length; i++) {
					if (codeDic[i].value == ret.form.ABEND) {
						ABENDtxt = codeDic[i].text;
						break;
					}
				}
					var S110_NotOKLR = Jui.message.hint("查詢無資料(取得客戶帳戶明細檔帳號 S110)！\n交易代號：" + ABENDtxt);
					S110_NotOKLR;
					setTimeout(function() {
						S110_NotOKLR.close();
					}, 1 * 2000);
					return;
				}
                    var source = ret.form;
                    var account = [];
                    //for (var i = 0; i < source.REC.length - 1; i++) {
                    for (var i = 0; i < source.REC.length; i++) { // Emma-修正迴圈長度將每筆帳號拉回-20220307
                        if(source.REC[i].ACN.trim()){
                        var act = {};
                        act.value = source.REC[i].ACN;
                        act.text = source.REC[i].ACN;
                        account.push(act);
                        }
                    }
                  if(account.length>1){ //Emma20220315
                      //查詢結果網格需依 帳號 由小到大 排序
                      account = account.sort(function(a,b){
  						if(a.value > b.value){
  							return 1;
  						}else if(a.value < b.value){
  							return -1;
  						}else if(a.value == b.value){
  							return 0;
  						}
  					});  
                  }

                    form.getControl("U_ACNO").loadItems(account);
                }
            })
        }   
    },
    
    
    // 查詢客戶帳戶明細S603 hsin
    doPostS603 : function() {
        ContactFormBTN.doPostS601_ACN(); //取得銀行客戶基本資料之是否申請電話銀行 下拉onchange S601 Wolf
        TBBUtil.doClearFields("客戶帳戶明細", null, "U_ACNO");
        
        data = {
            "ACN" : form.getFieldValue("U_ACNO"),//帳號
            "CUSIDN":form.getFieldValue("U_CustID")//統一編號
        };

        var args = JSON.stringify({
            "name" : "S603tbbapi",
            "from" : "csr",
            "sessionId" : ContactFormBTN.sessionId,
            "agentId" : ContactFormBTN.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
					var S603_NotOKLR = Jui.message.hint("發送電文(查詢客戶帳戶明細S603)失敗，詳情請洽資訊處！");
					S603_NotOKLR;
					setTimeout(function() {
						S603_NotOKLR.close();
					}, 1 * 2000);
                    return;
            }
            if(ret.isSuccess){
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDtxt = ret.form.ABEND;
				for (var i = 0; i < codeDic.length; i++) {
					if (codeDic[i].value == ret.form.ABEND) {
						ABENDtxt = codeDic[i].text;
						break;
					}
				}
					var S603_NotOKLR = Jui.message.hint("查詢無資料(查詢客戶帳戶明細S603)！\n交易代號：" + ABENDtxt);
					S603_NotOKLR;
					setTimeout(function() {
						S603_NotOKLR.close();
					}, 1 * 2000);
					return;
				}
                var formData = ret.form; 
				var U_AMTICHD = TBBUtil.thousandComma(formData.AMTICHD);
				if (U_AMTICHD = "000,000,000") U_AMTICHD = "0";
                form.setFieldValue("U_BRHACC", formData.BRHACC);
                form.setFieldValue("U_AMTICHD", U_AMTICHD);
                form.setFieldValue("U_TDYOFMX", ContactFormBTN.doAmount(formData.TDYOFMX));
                //form.setFieldValue("U_ODFBAL", formData.U_ODFBAL);
				form.setFieldValue("U_ODFBAL", ContactFormBTN.doAmount(formData.ODFBAL));
                form.setFieldValue("U_IBHPWD", formData.IBHPWD);
                form.setFieldValue("U_ODFMG", formData.ODFMG);
                form.setFieldValue("U_SCUFLG", formData.SCUFLG);
                form.setFieldValue("U_RETURN", formData.RETURN);
                form.setFieldValue("U_RETMARK", formData.RETMARK);
                form.setFieldValue("U_REFUSE", TBBUtil.formatDTM(formData.REFUSE,"").trim());
                form.setFieldValue("U_RELEASE", TBBUtil.formatDTM(formData.RELEASE,"").trim());    
                form.setFieldValue("U_OpenDT", TBBUtil.formatDTM(formData.STADT,"").trim()); // 開戶日期 -- 20210929 Tiffany
                form.setFieldValue("U_SettleDT", TBBUtil.formatDTM(formData.CLSDT,"").trim()); // 結清日期 -- 20210929 Tiffany
                form.setFieldValue("U_RETURN2", formData.RETURN3); // 總退票(三年) -- 20210929 Tiffany
                form.setFieldValue("U_RETMARK2", formData.RETMARK3); // 總退票註記(三年) -- 20210929 Tiffany
            }else {
                // 電文失敗
				var S603_NotOKLR = Jui.message.hint("發送電文(查詢客戶帳戶明細S603)失敗，詳情請洽資訊處！");
					S603_NotOKLR;
					setTimeout(function() {
						S603_NotOKLR.close();
					}, 1 * 2000);
                return;
            }
        })

    },  
	
	// 客戶主檔查詢S601(帳號查詢) Wolf
	doPostS601_ACN : function() {

        data = {
            "ACN" : form.getFieldValue("U_ACNO"), //帳號
            "CUSIDN" : "",//統一編號
            "TYPE" : "01",
        };

        var args = JSON.stringify({
            "name" : "S601tbbapi",
            "from" : "csr",
            "sessionId" : ContactFormBTN.sessionId,
            "agentId" : ContactFormBTN.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
				var S601_NotOKLR = Jui.message.hint("發送電文(客戶主檔查詢S601)失敗，詳情請洽資訊處！");
					S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
                    return;
            }
            if(ret.isSuccess){
				if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDtxt = ret.form.ABEND;
				for (var i = 0; i < codeDic.length; i++) {
					if (codeDic[i].value == ret.form.ABEND) {
						ABENDtxt = codeDic[i].text;
						break;
					}
				}
					var S601_NotOKLR = Jui.message.hint("查詢無資料(客戶主檔查詢S601)！\n交易代號：" + ABENDtxt);
					S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
					return;
				}
                var formData = ret.form; 
                var isVoiceBank;
                formData.TELBYON=='Y'?isVoiceBank=1:isVoiceBank=0;
                form.setFieldValue("U_IsVoiceBank", isVoiceBank);
            }else {
                // 電文失敗
                var S601_NotOKLR = Jui.message.hint("發送電文(客戶主檔查詢S601)失敗，詳情請洽資訊處！");
					S601_NotOKLR;
					setTimeout(function() {
						S601_NotOKLR.close();
					}, 1 * 2000);
                return;
            }
        })

    },
	 doAmount:function (num){
	        var str = parseInt(num).toString();
	        if(str){
	            if(str.length>=3){
	                amount= str.substr(0,str.length-2)+'.'+str.substr(str.length-2);   
	            }else if(str.length==2){
	                amount= '0.'+str.substr(str.length-2);
	            }else if(str.length==1){
	                amount= '0.0'+str;
	            }
	            return TBBUtil.thousandComma(amount);
	        }else{
	            return str;
	        }
	    }
	
	
	
	
};

Jui.event.attach(window, 'load', ContactFormBTN.doLoad);