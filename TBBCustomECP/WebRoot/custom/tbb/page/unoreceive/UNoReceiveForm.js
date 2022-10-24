/*******************************************************************************
 * Author: chainsea\hsin.lin; 
 * CreateDate: 2021/05/26
 * Description: 帶入客戶資料電文發送及選擇(機場停車預約單、機場新貴通申請單)NB02
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin;
 * LastUpdateDate: 2021/05/26
 * Note:
 ******************************************************************************/
var UNoReceiveForm = {
    sessionId: null,
    agentId: null,
    doPost: function() {
        UNoReceiveForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UNoReceiveForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        if (UCustID.doCheck()) {
            if (form.getFieldValue("U_CardKind") == null) {
                Jui.message.alert("請選擇卡種");
                return;
            }
            var data = {};
            data = {
                "CARDNUM": form.getFieldValue("U_CardKind"), // 卡種
                "CUSIDN": form.getFieldValue("U_CustID"), // 身分證字號或統一編號
                "TXNCOD": "NB02"
            };

            var args = JSON.stringify({
                "name": "NB02tbbapi",
                "from": "csr",
                "sessionId": UNoReceiveForm.sessionId,
                "agentId": UNoReceiveForm.agentId,
                "formData": data
            });


            TBBUtil.doPost(JSON.parse(args), function(ret) {
                //電文回傳
                if (ret.isSuccess) {
                    //console.log(JSON.stringify(json.F_Info[Info]));
                	var json = ret;
                	
                	json.F_Info = [];
                	json.F_Informa = ret.form.Card;
             	
                	var temp={};
                	temp["F_Tel1"] = ret.form.TEL1;
                	temp["F_Tel2"] = ret.form.TEL2;
                	temp["F_Mobile"] = ret.form.MOBILE;
                	temp["F_PositiveCardName"] = ret.form.OWNERNAME;
                	temp["F_OwnerEname"] = ret.form.OWNERENAME;
                	temp["F_branch"] = ret.form.BRANCH;
                	temp["F_Address"] = ret.form.ADDRESS;
                	json.F_Info.push(temp);


                	for (var i = 0; i < ret.form.Card.length; i++) {
                       json.F_Informa[i].F_CardKind= ret.form.Card[i].CARDKIND;
                       json.F_Informa[i].F_AppendName= ret.form.Card[i].APPENDNAME;
                       json.F_Informa[i].F_AppendEname= ret.form.Card[i].APPENDENAME;
                       json.F_Informa[i].F_CreditCardNo= ret.form.Card[i].CREDITCARDNO;
                       json.F_Informa[i].F_Sex= ret.form.Card[i].SEX;
                       json.F_Informa[i].F_ID= ret.form.Card[i].ID;
                       json.F_Informa[i].F_CreditType= ret.form.Card[i].CREDITTYPE;
                       json.F_Informa[i].F_OwnerName= ret.form.Card[i].APPENDNAME;
                    }
                	
                	
                    var unitCode = clientData.unitCode;
                    var title = document.title;
                    var args = {
                        json: json,
                        unitCode: unitCode,
                        title: title
                    };
                    // console.log(json);
                   // console.log(json.F_Info[Info]);
                    /* for (var i = 0; i < json.F_Informa.length; i++) {
                        console.log(json.F_Informa[i]);
                    } */

                    //if卡號資料只有一筆
                    if (json.F_Informa.length == 1) {
                        form.setFieldValue("U_PositiveCardName", json.F_Info[0].F_PositiveCardName);
                        form.setFieldValue("U_Address", json.F_Info[0].F_Address);
                    }
                    //卡號資料有多筆
                    else {
                        console.log(unitCode);
                        //彈出多筆卡號資料清單
                        Utility.openDialog("TBB.UNoReceiveInfo.page", args, true, function(ret) {
                            form.setFieldValue("U_PositiveCardName", ret.U_PositiveCardName);
                            form.setFieldValue("U_Address", ret.U_Address);

                        });
                    }
                }
                var U_Result = ret.form.MSGCOD;
				var U_ResultExplain = ret.form.MSGCOD; //轉中文
				if(U_ResultExplain == "OKLR"){
					U_ResultExplain="交易成功";
				}else if(U_ResultExplain == "EACC"){
					U_ResultExplain="帳號有誤";
				}else if(U_ResultExplain == "ERDB"){
					U_ResultExplain="中心檔案有誤";
				}else if(U_ResultExplain == "ENRD"){
					U_ResultExplain="無資料";
				}
				
				form.setFieldValue("U_Result",U_Result);
				form.setFieldValue("U_ResultExplain",U_ResultExplain);
            })

        } else { return false; }
    },

};