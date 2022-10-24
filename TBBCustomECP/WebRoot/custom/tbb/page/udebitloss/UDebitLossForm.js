/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/16 Description: 金融端掛失
 * UDebitLoss
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor\Emily;
 * LastUpdateDate: 2022/04/08
 * Note: 2021/10/03 hsin.lin 新增A004查詢，抓取悠遊卡外顯卡號、S604存摺印鑑掛失時間、觸發A015
				 2021/11/01 Wolf 調整S604回覆交易結果說明，改為抓取電文回覆之Message內容
				 2021/11/16 Wolf 對應調整UDebitLoss，修正各電文會重複發動的問題
				 2022/01/20 Wolf 針對掛失金融卡時，抓取金融卡種類的欄位錯誤的問題
				 2022/02/10 Tiffany 雲端問題#53：狀態為新建或一線關卡時可修改金融卡類別
				 2022/02/22-lillian-發現S604該電文並未有欄位回傳日期時間欄位(SYSDAY)(SYSTIME)，與小駱討論後，
            	 				改為當電文[交易訊息]欄位為成功時，帶入當前系統時間，並開放欄位可以修改，[印鑑章掛失]也一樣這樣處理，
            	 				只有[OKLR]是代表有掛失成功。
            	 2022/04/08-Emily S103 電文上行加傳/TLRLST/使用者帳號
 ******************************************************************************/
var UDebitLossForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    count:0,
    counts:0,
    doLoad: function() {
        UDebitLossForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UDebitLossForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        UDebitLoss.doLoad(); // 確認原本doload的觸發java點       
        
        form.getControl("U_LossCardType").onchange = UDebitLossForm.doChange;
        form.getControl("U_LossType").fireEvent('onchange');
        form.getControl("U_LossWay").onchange=UDebitLossForm.doChange;
        if(form.getFieldValue("U_Result_1") || form.getFieldValue("U_Result_2") || form.getFieldValue("U_Result_3") || form.getFieldValue("U_Result_4")||form.getFieldValue("U_Result_5")){
            toolBar.setItemDisabled("DebitCardLoss",true);
        }
        form.getControl("U_LossType").onchange = UDebitLossForm.doChange;

        form.getControl("U_GetECTime").onclick = UDebitLossForm.doPostA015;
		
        //悠遊卡掛失交易結果成功時 U_GetECTime按鈕取消唯讀 20211003 hsin
        if(form.getFieldValue("U_Result_2")=="0000" || form.getFieldValue("U_Result_2")=="OKLR"){
            form.setFieldDisabled("U_GetECTime",false);
            form.setFieldValue("U_GridA015",null);
            form.setFieldVisible("U_GridA015",true);
        }else{
            form.setFieldDisabled("U_GetECTime",true);
            form.setFieldValue("U_GridA015",null);
            form.setFieldVisible("U_GridA015",false);
        }
        UDebitLossForm.doStatus(); // 判斷狀態 20220210 Tiffany
        form.getControl("U_LossKind_New").onchange = UDebitLossForm.doChange; // 金融卡狀態 20220210 Tiffany
    },

    // 連動欄位 hsin
    doChange: function() {
        var lossType = form.getFieldValue("U_LossType");
        var lossCard = form.getFieldValue("U_LossCardType");
        var loosWay = form.getFieldValue("U_LossWay");
        if (lossType) {
            if (lossType.indexOf(0) != -1) {
                form.setFieldRequired("U_LossCardType", true);
                form.setFieldDisabled("U_LossCardType", false);
                
            } else {
                if(form.getFieldValue("U_Result_1") || form.getFieldValue("U_Result_2") || form.getFieldValue("U_Result_3") || form.getFieldValue("U_Result_4")||form.getFieldValue("U_Result_5")){
                    form.setFieldRequired("U_LossCardType", false);
                    form.setFieldDisabled("U_LossCardType", true);
                    form.setFieldRequired("U_DebitCardDate", false);
                }else{
                    form.setFieldRequired("U_LossCardType", false);
                    form.setFieldDisabled("U_LossCardType", true);
                    form.setFieldValue("U_LossCardType", null);
                    form.setFieldRequired("U_DebitCardDate", false);
                    form.setFieldValue("U_DebitCardDate", null);
                }
               
            }
            
//            if (lossType.indexOf(0) != -1 && lossCard != 4 ) {
//                form.setFieldRequired("U_DebitCardDate", true);
//            }else{
//                form.setFieldRequired("U_DebitCardDate", false);
//                form.setFieldValue("U_DebitCardDate", null);
//            }
            
//            if (lossType.indexOf(1) != -1) {
//                form.setFieldRequired("U_BankBookDate", true);
//            } else {
//                form.setFieldRequired("U_BankBookDate", false);
//                form.setFieldValue("U_BankBookDate", null);
//            }
            
//            if (lossType.indexOf(2) != -1) {
//                form.setFieldRequired("U_SealDate", true);
//            } else {
//                form.setFieldRequired("U_SealDate", false);
//                form.setFieldValue("U_SealDate", null);
//            }
            
            if(loosWay==0){
                if(form.getFieldValue("U_Result_1") || form.getFieldValue("U_Result_2") || form.getFieldValue("U_Result_3") || form.getFieldValue("U_Result_4")||form.getFieldValue("U_Result_5")){
                    form.setFieldDisabled('U_DebitCardDate',true);
                    form.setFieldVisible('U_Remind1',false);
                    form.setFieldDisabled('U_BankBookDate',true);
                    form.setFieldDisabled('U_SealDate',true);
                }else{
                    form.setFieldDisabled('U_DebitCardDate',true);
                    form.setFieldVisible('U_Remind1',false);
                    form.setFieldValue("U_DebitCardDate", null);
                    form.setFieldDisabled('U_BankBookDate',true);
                    form.setFieldValue("U_BankBookDate", null);
                    form.setFieldDisabled('U_SealDate',true);
                    form.setFieldValue("U_SealDate", null);
                }
                
                //form.setFieldDisabled('U_leisureDate',true);
                //form.setFieldValue("U_leisureDate", null);
            }else{
//                if (lossCard == 3 || lossCard == 4) {
//                    form.setFieldDisabled('U_leisureDate',false);
//                    form.setFieldRequired("U_leisureDate", true);
//                }else {
//                    form.setFieldDisabled('U_leisureDate',true);
//                    form.setFieldValue("U_leisureDate", null);
//                }
                
                if (lossType.indexOf(2) != -1) {
                    form.setFieldDisabled('U_SealDate',false);
                    form.setFieldRequired("U_SealDate", true);
                }else {
                    form.setFieldDisabled('U_SealDate',true);
                    form.setFieldValue("U_SealDate", null);
                }
                
                if (lossType.indexOf(1) != -1) {
                    form.setFieldDisabled('U_BankBookDate',false);
                    form.setFieldRequired("U_BankBookDate", true);
                } else {
                    form.setFieldDisabled('U_BankBookDate',true);
                    form.setFieldValue("U_BankBookDate", null);
                }
                
                if (lossType.indexOf(0) != -1 && lossCard != 4 ) {
                    form.setFieldRequired("U_DebitCardDate", true);
                    form.setFieldDisabled('U_DebitCardDate',false);
                }else{
                    if(form.getFieldValue("U_Result_1") || form.getFieldValue("U_Result_2") || form.getFieldValue("U_Result_3") || form.getFieldValue("U_Result_4")||form.getFieldValue("U_Result_5")){
                        form.setFieldRequired("U_DebitCardDate", false);
                        form.setFieldDisabled('U_DebitCardDate',true);
                    }else{
                        form.setFieldRequired("U_DebitCardDate", false);
                        form.setFieldDisabled('U_DebitCardDate',true);
                        form.setFieldValue("U_DebitCardDate", null);
                    }
                    
                }
            }
            
            //悠遊卡的掛失時間不會透過A014回來，欄位改成非唯讀(不用判斷系統或手動的選項) 20211003 hsin
            if (lossCard == 3 || lossCard == 4) {
                form.setFieldDisabled('U_leisureDate',false);
                //form.setFieldRequired("U_leisureDate", true);
            }else {
                form.setFieldDisabled('U_leisureDate',true);
                form.setFieldValue("U_leisureDate", null);
            }
            
        }else{
            if(form.getFieldValue("U_Result_1") || form.getFieldValue("U_Result_2") || form.getFieldValue("U_Result_3") || form.getFieldValue("U_Result_4")||form.getFieldValue("U_Result_5")){
                form.setFieldRequired("U_LossCardType", false);
                form.setFieldDisabled("U_LossCardType", true);
                form.setFieldRequired("U_DebitCardDate", false);
                form.setFieldRequired("U_BankBookDate", false);
                form.setFieldRequired("U_SealDate", false);
            }else{
                form.setFieldRequired("U_LossCardType", false);
                form.setFieldDisabled("U_LossCardType", true);
                form.setFieldValue("U_LossCardType", null);
                form.setFieldRequired("U_DebitCardDate", false);
                form.setFieldValue("U_DebitCardDate", null);
                form.setFieldRequired("U_BankBookDate", false);
                form.setFieldRequired("U_SealDate", false);
            }
            
        }

        
        if (lossCard == 0 || lossCard == 1 || lossCard == 2 || lossCard == 3) {
            form.setFieldRequired("U_LossKind_New", true);
            form.setFieldDisabled("U_LossKind_New", false);
        } else {
            form.setFieldRequired("U_LossKind_New", false);
            form.setFieldDisabled("U_LossKind_New", true);
            form.setFieldValue("U_LossKind_New", null);
        }
//        if (lossCard == 3 || lossCard == 4) {
//            form.setFieldRequired("U_leisureDate", true);
//        } else {
//            form.setFieldRequired("U_leisureDate", false);
//            form.setFieldValue("U_leisureDate", null);
//        }
        
       
        
    },
    
    //選擇帳號後發動A004，取得悠遊卡卡號(M.A004.SAMDKEY) 20211003 hsin
    doAccChange: function(){
      
        var data = {
            "ACN" : form.getFieldValue("U_AccountNumberSystem"),//帳號
        };
        
        var args = JSON.stringify({
            "name"      : "A004tbbapi",
            "from"      : "CSR",
            "sessionId" : UDebitLossForm.sessionId,
            "agentId"   : UDebitLossForm.agentId,
            "formData"  : data
        });
        
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            if (ret.isSuccess == true) {
                var formData = ret.form;                           
                form.setFieldValue("U_SAMDKEY", formData.SAMDKEY); //悠遊卡外顯卡號
               
            } else {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        });
        
        
        
    },

    // 帶入客戶資料 改寫成發S102 hsin
    getFinanceQuery: function() {
        if (UCustID.doCheck()) {
            form.setFieldValue("U_Result", "");
            form.setFieldValue("U_ResultExplain", "");
            var data = {};
            data = {
                "CUSIDN": form.getFieldValue("U_CustID"), // 統一編號
                "USERDATA": ""
            };

            var args = JSON.stringify({
                "name": "S102tbbapi",
                "from": "csr",
                "sessionId": UDebitLossForm.sessionId,
                "agentId": UDebitLossForm.agentId,
                "formData": data
            });
            console.log(args);
            TBBUtil.doPost(JSON.parse(args), function(ret) {
                console.log(ret);
                if (ret == undefined) {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    return;
             }
                if (ret.isSuccess) {
                    var source = ret.form;
                    var account = [];
                    for (var i = 0; i < source.REC.length; i++) {
                        var act = {};
						if (source.REC[i].ACN != null && source.REC[i].ACN.trim() != "") {
							act.value = source.REC[i].ACN;
							act.text = source.REC[i].ACN;
							account.push(act);
						}
                    }

                    form.setFieldValue("U_CustName", source.NAME);// 客戶姓名
                    form.setFieldValue("U_CustMobile", source.MOBTEL); // 手機
                    form.setFieldValue("U_TelNum", source.TELNUM); // 住家電話
                    form.setFieldValue("U_CustAddress", source.CTTADR); // 地址
                    form.getControl("U_AccountNumberSystem").loadItems(account);
					//2021.11.16 Wolf wu 調整將帳號資料暫存至文字欄位上，在doLoad時，抓取此欄位將帳號塞回下拉項目中
					form.setFieldValue("U_AccountNumberSystemTemp",JSON.stringify(account)); //將查回的帳號存至暫存欄位
					
                    

                   
                        // 電文交易結果
                        var MSGCOD = ret.form.ABEND;
                        form.setFieldValue("U_Result", ret.form.ABEND);
                        msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                        for (var i = 0; i < msgcodDicRet.length; i++) {
                            if (msgcodDicRet[i].value == MSGCOD) {
                                form.setFieldValue("U_ResultExplain", msgcodDicRet[i].text);
                                break;
                            }
                        }
                   
                    
                

                    // 20180927 防呆設置 susie
                    form.setFieldValue("U_Notifiers", '0');// 通報人 預設‘本人’
                    // form.setFieldValue("U_DebitCardTerminal", '2');// 金融卡端
                    // 預設‘一般卡’
                    // form.setFieldValue("U_LossKind", '2');// 掛失種類 預設‘使用中之卡片’
                    form.setFieldValue("U_PhoneInform", '1');// 電話告知 預設‘分行’
                    form.setFieldValue("U_LossWay", '0');// 掛失方式 預設‘系統’
                    form.setFieldValue("U_AccountNumberSystem", '請選擇帳號');// 帳號
                    // 預設‘請選擇帳號’

                    //發完後先自動保存
                    form.setFieldRequired("FUserid2", false);// 覆核人員
                    form.setFieldRequired("U_LossType", false);
                    EntityForm.$doSave();
                } else {
                    // 電文失敗
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    return;
                }
            })
        } else {
            return false;
        }

    },

    // 顯示彈跳訊息確認 hsin
    doCheck: function() {
        var AccountNumberSystem = form.getFieldText("U_AccountNumberSystem");
        if(AccountNumberSystem=='請選擇帳號')
        {
            Jui.message.alert("請選擇正確的帳號");
            return;
        }
        form.setFieldRequired("FUserid2", false);// 覆核人員
        if (!form.validate()) {
            return;
        }
        form.setFieldRequired("FUserid2", true);// 覆核人員
        // 經辦人欄位設置值
        var userId = CommonBusiness.getCurrentUser().userId;
        var user = CommonBusiness.getEntity("Qs.User", userId);
        var name = user.FLoginName;
        var FLoginName = name.substring(name.length - 3);
        form.setFieldValue("U_Attn" , FLoginName);
        var lossType = form.getFieldValue("U_LossType");
        var lossTypeT = form.getControl("U_LossType").getTexts();
        var lossCard = form.getFieldValue("U_LossCardType");
        var checkMessage = '你確定執行金融卡掛失動作嗎\n' + '客戶姓名' + form.getFieldValue("U_CustName") + "\n" + "掛失種類：" + lossTypeT + "\n" + "帳號：" + AccountNumberSystem + "\n" + "掛失經辦：" + FLoginName;
        Jui.message.confirm(checkMessage, function(result) {
            if (result == 'ok') {
                form.setFieldValue("U_Result_1", "");
                form.setFieldValue("U_ResultExplain_1", "");
                form.setFieldValue("U_Result_2", "");
                form.setFieldValue("U_ResultExplain_2", "");
                form.setFieldValue("U_Result_3", "");
                form.setFieldValue("U_ResultExplain_3", "");
                form.setFieldValue("U_Result_3", "");
                form.setFieldValue("U_ResultExplain_3", "");
                var SAMDKEY = form.getFieldValue("U_SAMDKEY");
                UDebitLossForm.count=0;
                UDebitLossForm.counts=0;
                
                if (lossType.indexOf(1) != -1) { // 掛失種類-存摺
                    UDebitLossForm.count+=1;
                    UDebitLossForm.doPostS6041();
                }
                if (lossType.indexOf(2) != -1) { // 掛失種類-印鑑
                    UDebitLossForm.count+=1;
                    UDebitLossForm.doPostS6042();
                }
                if (lossType.indexOf(0) != -1) { // 掛失種類-金融卡
                    if (lossCard == 3 ) { // 金融卡類別-悠遊卡 
                        UDebitLossForm.count+=2;
						if(SAMDKEY != null && SAMDKEY.trim() != "") {
							UDebitLossForm.doPostS103();
							UDebitLossForm.doPostA014();
						} else {
							Jui.message.alert("悠遊卡卡號不存在，無法掛失MASTER悠遊簽帳卡，請重新勾選其他掛失項目或填入悠遊卡卡號！");
							return;
						}
                    }else if(lossCard == 4 ){ //md卡只發一支悠遊卡 20210913 hsin 
                        UDebitLossForm.count+=1;
						if(SAMDKEY != null && SAMDKEY.trim() != "") {
							UDebitLossForm.doPostA014();
						} else {
							Jui.message.alert("悠遊卡卡號不存在，無法掛失MD悠遊卡功能，，請重新勾選其他掛失項目或填入悠遊卡卡號！");
							return;
						}
                    } else {
                        UDebitLossForm.count+=1;
                        UDebitLossForm.doPostS103();
                    }
                    
                }
                toolBar.setItemDisabled("DebitCardLoss",true);
            } else {
                return;
            }
            console.log("e");
        });

    },
    
    doCheckSave: function() {
        if(UDebitLossForm.count == UDebitLossForm.counts){
            //發完後先自動保存
            form.setFieldRequired("FUserid2", false);// 覆核人員
            EntityForm.$doSave();
        }
    },
    // 金融卡掛失發S103電文 hsin
    doPostS103: function() {
    	var userId = CommonBusiness.getCurrentUser().userId;
        var user = CommonBusiness.getEntity("Qs.User", userId);
        var name = user.FLoginName;
        var FLoginName = name.substring(name.length - 3);
        form.setFieldValue("U_Result_1", "");
        form.setFieldValue("U_ResultExplain_1", "");
        data = {
            "ACN": form.getFieldText("U_AccountNumberSystem"),// 帳號
            //"ITEM": form.getFieldValue("U_LossType")// 掛失種類
			"ITEM": form.getFieldValue("U_LossKind_New"),// 掛失種類 //20220120 針對更換過掛失種類的欄位，塞入上行電文時的欄位需配合調整
			"TLRLST": FLoginName //20220408 使用者帳號
        };

        var args = JSON.stringify({
            "name": "S103tbbapi",
            "from": "csr",
            "sessionId": UDebitLossForm.sessionId,
            "agentId": UDebitLossForm.agentId,
            "formData": data
        });
        TBBUtil.doPost(JSON.parse(args), function(ret) {

            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
         }
            if (ret.isSuccess) {

                var source = ret.form;
                var cardDate = source.DATLST;
                //console.log("cardDate"+cardDate);
                var cardTime = source.TIMLST;
                //console.log("cardTime"+cardTime);
                if (cardDate != null) {
                    cardDate = (Number(cardDate.substr(0, 3)) + 1911).toString() + cardDate.substring(3);
                    cardDate = cardDate.substr(0, 4) + "-" + cardDate.substr(4, 2) + "-" + cardDate.substr(6, 2);
                }
                //console.log("cardDate2"+cardDate);
                if (cardTime != null) {
                    cardTime = cardTime.substr(0, 2) + ":" + cardTime.substr(2, 2);
                }
                //console.log("cardTime2"+cardTime);
                console.log("cardDatecardTime"+cardDate+cardTime);
                form.setFieldValue("U_DebitCardDate", cardDate +" "+ cardTime);
                
                
                
                
                // 電文交易結果
                var MSGCOD = ret.form.ABEND;
                form.setFieldValue("U_Result_1", ret.form.ABEND);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                for (var i = 0; i < msgcodDicRet.length; i++) {
                    if (msgcodDicRet[i].value == MSGCOD) {
                        form.setFieldValue("U_ResultExplain_1", msgcodDicRet[i].text);
                        break;
                    }
                }
                UDebitLossForm.counts+=1;
                UDebitLossForm.doCheckSave();
            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },

    // 悠遊卡掛失發A014電文 hsin
    doPostA014: function() {
        form.setFieldValue("U_Result_2", "");
        form.setFieldValue("U_ResultExplain_2", "");
        data = {
            //"TXSAMD": form.getFieldText("U_AccountNumberSystem"),// 悠遊卡 DEBIT 卡外顯卡號
			 "TXSAMD": form.getFieldValue("U_SAMDKEY"),
            "TXSEL": "03"// 掛失
        };

        var args = JSON.stringify({
            "name": "A014tbbapi",
            "from": "csr",
            "sessionId": UDebitLossForm.sessionId,
            "agentId": UDebitLossForm.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {

            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
         }
            if (ret.isSuccess) {
              
                // 電文交易結果
                var MSGCOD = ret.form.ABEND;
                form.setFieldValue("U_Result_2", ret.form.ABEND);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                for (var i = 0; i < msgcodDicRet.length; i++) {
                    if (msgcodDicRet[i].value == MSGCOD) {
                        form.setFieldValue("U_ResultExplain_2", msgcodDicRet[i].text);
                        break;
                    }
                }
                UDebitLossForm.counts+=1;
                UDebitLossForm.doCheckSave();

            }else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },

    // 存摺S604電文 hsin
    doPostS6041: function() {
        form.setFieldValue("U_Result_3", "");
        form.setFieldValue("U_ResultExplain_3", "");
        data = {
            "ACN": form.getFieldText("U_AccountNumberSystem"),// 帳號
            "CUSIDN": form.getFieldValue("U_CustID"), //ID
            "TYPE":"02",
            "OPID":UDebitLossForm.agentId,
            "AMOUNT":"",
            "DATACT":"",
            "EVTTLR":"",
            "SEQTRN":"",
            "MESSAGE":"1存摺掛失"
        };

        var args = JSON.stringify({
            "name": "S604tbbapi",
            "from": "csr",
            "sessionId": UDebitLossForm.sessionId,
            "agentId": UDebitLossForm.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {

            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            if (ret.isSuccess) {
                
                //存摺掛失時間(日期加時間 M.S604.XXXX + M.S604.SYSTIME) 20211003 hsin
            	/*2022/02/22-lillian-發現S604該電文並未有欄位回傳日期時間欄位(SYSDAY)(SYSTIME)，與小駱討論後，
            	 * 改為當電文[交易訊息]欄位為成功時，帶入當前系統時間，並開放欄位可以修改，[印鑑章掛失]也一樣這樣處理，
            	 * 只有[OKLR]是代表有掛失成功。*/
                //var source = ret.form;
                /*
                var cardDate = source.SYSDAY;
                var cardTime = source.SYSTIME;

                if (cardDate != null) {
                    cardDate = cardDate.substr(0, 4) + "-" + cardDate.substr(4, 2) + "-" + cardDate.substr(6, 2);
                }
                if (cardTime != null) {
                    cardTime = cardTime.substr(0, 2) + ":" + cardTime.substr(2, 2);
                }
                form.setFieldValue("U_BankBookDate", cardDate +" "+ cardTime);*/
                
                // 電文交易結果 
				//2021.11.01 Wolf 調整S604回覆交易結果說明，改為抓取電文回覆之Message內容MESSAGE
                //var MSGCOD = ret.form.ABEND;
                //form.setFieldValue("U_Result_3", ret.form.ABEND);
                //2022.02.22-lillian-上方說抓取MESSAGE欄位但城市還是寫ABEND，故修正
                //20220317 hsin 現場測試 message回傳欄位不符格式 先用abend判斷
                //var MSGCOD = ret.form.MESSAGE;
                var MSGCOD = ret.form.ABEND;
                //form.setFieldValue("U_Result_3", ret.form.MESSAGE);
                form.setFieldValue("U_Result_3", ret.form.ABEND);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                for (var i = 0; i < msgcodDicRet.length; i++) {
                    if (msgcodDicRet[i].value == MSGCOD) {
						if(MSGCOD == "OKLR" || MSGCOD == "0000") {
							form.setFieldValue("U_ResultExplain_3", msgcodDicRet[i].text);
							form.setFieldValue("U_BankBookDate", new Date());
							break;
						} else {
							var res_Message = ret.form.MESSAGE
							form.setFieldValue("U_ResultExplain_3",res_Message.trim());
							break;
						}
                    } else {
						var res_Message = ret.form.MESSAGE
						form.setFieldValue("U_ResultExplain_3",res_Message.trim());
					}
                }
                UDebitLossForm.counts+=1;
                UDebitLossForm.doCheckSave();

            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },
    
    // 印鑑S604電文 hsin
    doPostS6042: function() {
        form.setFieldValue("U_Result_4", "");
        form.setFieldValue("U_ResultExplain_4", "");
        data = {
            "ACN": form.getFieldText("U_AccountNumberSystem"),// 帳號
            "CUSIDN": form.getFieldValue("U_CustID"), //ID
            "TYPE":"03",
            "OPID":UDebitLossForm.agentId,
            "AMOUNT":"",
            "DATACT":"",
            "EVTTLR":"",
            "SEQTRN":"",
            "MESSAGE":"1印鑑掛失"
        };

        var args = JSON.stringify({
            "name": "S604tbbapi",
            "from": "csr",
            "sessionId": UDebitLossForm.sessionId,
            "agentId": UDebitLossForm.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {

            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
         }
            if (ret.isSuccess) {
                
                //印鑑掛失時間(日期加時間 M.S604.XXXX + M.S604.SYSTIME) 20211003 hsin
            	/*2022/02/22-lillian-發現S604該電文並未有欄位回傳日期時間欄位(SYSDAY)(SYSTIME)，與小駱討論後，
            	 * 改為當電文[交易訊息]欄位為成功時，帶入當前系統時間，並開放欄位可以修改，[印鑑章掛失]也一樣這樣處理，
            	 * 只有[OKLR]是代表有掛失成功。*/
                //var source = ret.form;
                /*var cardDate = source.SYSDAY;
                var cardTime = source.SYSTIME;

                if (cardDate != null) {
                    cardDate = (Number(cardDate.substr(0, 3)) + 1911).toString() + cardDate.substring(3);
                    cardDate = cardDate.substr(0, 4) + "-" + cardDate.substr(4, 2) + "-" + cardDate.substr(6, 2);
                }
                if (cardTime != null) {
                    cardTime = cardTime.substr(0, 2) + ":" + cardTime.substr(2, 2);
                }
                form.setFieldValue("U_SealDate", cardDate +" "+ cardTime);*/
                
                // 電文交易結果
				//2021.11.01 Wolf 調整S604回覆交易結果說明，改為抓取電文回覆之Message內容
                //2022.02.22-lillian-上方說抓取MESSAGE欄位但城市還是寫ABEND，故修正
                //20220317 hsin 現場測試 message回傳欄位不符格式 先用abend判斷
                var MSGCOD = ret.form.ABEND;
                form.setFieldValue("U_Result_4", ret.form.ABEND);
                //var MSGCOD = ret.form.MESSAGE;
                //form.setFieldValue("U_Result_4", ret.form.MESSAGE);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                for (var i = 0; i < msgcodDicRet.length; i++) {
                    if (msgcodDicRet[i].value == MSGCOD) {
						if(MSGCOD == "OKLR" || MSGCOD == "0000") {
							form.setFieldValue("U_ResultExplain_4", msgcodDicRet[i].text);
							form.setFieldValue("U_SealDate", new Date());
							break;
						} else {
							var res_Message = ret.form.MESSAGE
							form.setFieldValue("U_ResultExplain_4",res_Message.trim());
							break;
						}
                    } else {
						var res_Message = ret.form.MESSAGE
						form.setFieldValue("U_ResultExplain_4",res_Message.trim());
					}
                }
                UDebitLossForm.counts+=1;
                UDebitLossForm.doCheckSave();


            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },
    
    //抓取悠遊卡外顯卡號發動A015，將資料帶到A015的網格上顯示 20211003 hsin
    doPostA015 : function(){
        form.setFieldValue("U_GridA015",null);
        
        if (!form.getFieldValue("U_SAMDKEY")) {
            Jui.message.hint("無\"悠遊卡外顯卡號\"");
            return;
        } 
        
        data = {
            "TXSAMD": form.getFieldValue("U_SAMDKEY")// 悠遊卡外顯卡號
        };
        
        var args = JSON.stringify({
            "name"      : "A015tbbapi",
            "from"      : "CSR",
            "sessionId" : UDebitLossForm.sessionId,
            "agentId"   : UDebitLossForm.agentId,
            "formData"  : data
        });
        
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            
            if(ret.isSuccess){ 
                var DataGrid = [];
                var formData = ret.form;
                for (var i = 0; i <= formData.REC.length - 1; i++) {
                    
                    //悠遊卡交易代號
                    var txnCode = formData.REC[i].TXNCODE;      
                    txnCodeRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0100c056-5000-807a-0408-17c4470b82f0"}).data;
                    for (var n = 0; n < txnCodeRet.length; n++) {
                        if (txnCodeRet[n].value == txnCode) {
                            txnCode = txnCodeRet[n].text;
                        }
                    }
                    //處理代碼 
                    var proType = formData.REC[i].PROTYPE;     
                    proTypeRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0100c056-5000-807a-0408-17c447312ec0"}).data;
                    for (var n = 0; n < proTypeRet.length; n++) {
                        if (proTypeRet[n].value == proType) {
                            proType = proTypeRet[n].text;
                        }
                    }
                    
                    //交易時間
                    var cardDate = formData.REC[i].TXNDATE;
                    var cardTime = formData.REC[i].TXNTIME;
                    if (cardDate != null && cardDate.trim() != "") {
                        cardDate = cardDate.substr(0, 4) + "-" + cardDate.substr(4, 2) + "-" + cardDate.substr(6, 2);
                    }
                    if (cardTime != null && cardTime.trim() != "") {
                        cardTime = cardTime.substr(0, 2) + ":" + cardTime.substr(2, 2);
                    }                    
                    
                    if(txnCode != null && txnCode.trim() != "") {
                      var record = {
                        U_TXNCODE: txnCode,
                        U_A015TIME: cardDate +" "+ cardTime,
                        U_PROTYPE: proType,
                        U_RESULT: formData.REC[i].RESULT
                        
                      };
                      DataGrid.push(record);
                    }
                       
                }
                
                // 資料依"日期"由大到小排序
                var wlen1 = DataGrid.length;
                var count1 = 0;// 記錄總執行次數
                for (var i = 0; i < DataGrid.length - 1; i++) {
                    for (var j = 0; j < wlen1 - 1; j++) {
                        if (DataGrid[j].U_A015TIME < DataGrid[j + 1].U_A015TIME) {
                            var temp;
                            temp = DataGrid[j];
                            DataGrid[j] = DataGrid[j + 1];
                            DataGrid[j + 1] = temp;
                            count1++;
                        }
                    }
                    wlen1 = wlen1 - 1;
                }
                form.getControl("U_GridA015").setValue(DataGrid);
                
                
                var MSGCOD = ret.form.ABEND;
                form.setFieldValue("U_Result_5", ret.form.ABEND);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                for (var i = 0; i < msgcodDicRet.length; i++) {
                    if (msgcodDicRet[i].value == MSGCOD) {
                        form.setFieldValue("U_ResultExplain_5", msgcodDicRet[i].text);
                        break;
                    }
                }


            }else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            
            
        });

    },
    
    //點擊帶入悠遊卡掛失時間後，將交易時間帶入悠遊卡掛失時間欄位上 20211003 hsin
    doChoice:function(){
        var grid = form.getControl('U_GridA015').getEventRow();
        var date = grid.data.U_A015TIME ;
        form.setFieldValue("U_leisureDate",date);
    },
    
    doOpen : function()
    {
        var U_CustName              = form.getFieldValue("U_CustName");//客户姓名
        var U_CustID                = form.getFieldValue("U_CustID");//客戶ID/統編
        var U_AccountNumberSystem   = form.getFieldText("U_AccountNumberSystem");//帳號   
        var U_CustMobile            = form.getFieldValue("U_CustMobile");//手機
        var U_TelNum            = form.getFieldValue("U_TelNum");//住家电话
        var U_CustAddress           = form.getFieldValue("U_CustAddress");//住家
        var U_OtherPhone            = form.getFieldValue("U_OtherPhone");//其他联络电话
        var U_Attn                  = form.getFieldValue("U_Attn");//经办人
        var U_Notifiers             = form.getFieldValue("U_Notifiers");//通报人
        var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
        var U_PrincipalName         = form.getFieldValue("U_PrincipalName");//姓名
        var U_PrincipalRelation     = form.getFieldValue("U_PrincipalRelation");//关系
        var U_PrincipalPhone        = form.getFieldValue("U_PrincipalPhone");//电话 
        var U_Result                = form.getFieldValue("U_Result");//交易结果
        var U_ResultExplain         = form.getFieldValue("U_ResultExplain");//交易结果说明
        var U_DebitCardTerminal     = form.getFieldValue("U_DebitCardTerminal");//金融卡端
        var U_DebitCardDate         = form.getFieldValue("U_DebitCardDate");//金融卡端時間
        var U_leisureDate     = form.getFieldValue("U_leisureDate");//悠遊卡掛失時間
        var U_PhoneInform           = form.getFieldValue("U_PhoneInform");//电话告知
        var U_BankBookSeal          = form.getFieldValue("U_BankBookSeal");//存摺本/印鑑
        var U_SealDate              = form.getFieldValue("U_SealDate");//印鉴章
        var U_BankBookDate          = form.getFieldValue("U_BankBookDate");//存折
        var U_CallBackTime1         = form.getFieldValue("U_CallBackTime1");//回拨时间1            
        var U_CallBackStaff1        = form.getFieldValue("U_CallBackStaff1");//回拨人员1
        var U_CallBackTime2         = form.getFieldValue("U_CallBackTime2");//回拨时间2
        var U_CallBackStaff2        = form.getFieldValue("U_CallBackStaff2");//回拨人员2
        var U_Remark                = form.getFieldValue("U_Remark");//备注
        var FUserId                 = form.getFieldText("FUserId");//处理人员   
        var U_CallBackOther1        = form.getFieldValue("U_CallBackOther1");//其他1
        var U_CallBackOther2        = form.getFieldValue("U_CallBackOther2");//其他2
        var U_LossCardType          = form.getFieldValue("U_LossCardType");//金融卡類別 hsin
        var U_LossKind_New          = form.getFieldValue("U_LossKind_New");//金融卡端狀態 hsin 
        var U_LossType              = form.getFieldValue("U_LossType");//掛失種類 hsin
        
        var args = {
            U_CustName            : U_CustName , 
            U_CustID              : U_CustID,
            U_AccountNumberSystem : U_AccountNumberSystem,
            U_CustMobile          : U_CustMobile,
            U_TelNum              :U_TelNum,
            U_CustAddress         : U_CustAddress,
            U_OtherPhone          : U_OtherPhone,
            U_Attn                : U_Attn,
            U_Notifiers           : U_Notifiers,
            U_CaseType            : U_CaseType,
            U_PrincipalName       : U_PrincipalName,
            U_PrincipalRelation   : U_PrincipalRelation,
            U_PrincipalPhone      : U_PrincipalPhone,
            U_Result              : U_Result,
            U_ResultExplain       : U_ResultExplain,
            U_DebitCardTerminal   : U_DebitCardTerminal,
            U_DebitCardDate       : U_DebitCardDate,
            U_leisureDate         : U_leisureDate,
            U_PhoneInform         : U_PhoneInform,
            U_BankBookSeal        : U_BankBookSeal,
            U_SealDate            : U_SealDate,
            U_BankBookDate        : U_BankBookDate,
            U_CallBackTime1       : U_CallBackTime1,
            U_CallBackStaff1      : U_CallBackStaff1,
            U_CallBackTime2       : U_CallBackTime2,                
            U_CallBackStaff2      : U_CallBackStaff2,
            U_Remark              : U_Remark,
            FUserId               : FUserId,
            U_CallBackOther1      : U_CallBackOther1,
            U_CallBackOther2      : U_CallBackOther2,
            U_LossType            : U_LossType,
            U_LossCardType        : U_LossCardType,
            U_LossKind_New        : U_LossKind_New
            
        }
        Utility.openDialog("TBB.UDebitLoss.NewReport.page",args);
    },
    
    doStatus: function() { // 判斷狀態 20220210 Tiffany
    	var fstatus = form.getFieldValue("FStatus");
    	if (fstatus == 'New' || fstatus == 'AgentSign' || fstatus == 'AgentSign1') {
    		// 掛失種類
    		form.setFieldDisabled("U_LossType", false);
    		// 金融卡狀態
    		var lossCardType = form.getFieldValue("U_LossCardType");
    		if (lossCardType == 0 || lossCardType == 1 || lossCardType == 2 || lossCardType == 3) {
        		form.setFieldDisabled("U_LossKind_New", false);
                form.setFieldRequired("U_LossKind_New", true);
    		} else {
    			form.setFieldDisabled("U_LossKind_New", true);
    		}
    		// 金融卡類別
    		if (form.getFieldValue("U_LossType").indexOf(0) != -1) {
    			form.setFieldDisabled("U_LossCardType", false);
                form.setFieldRequired("U_LossCardType", true);                
            } else {
            	form.setFieldDisabled("U_LossCardType", true);
            	form.setFieldDisabled("U_LossKind_New", true);
            }
    	}
    },
    
}
Jui.event.attach(window, 'load', UDebitLossForm.doLoad);