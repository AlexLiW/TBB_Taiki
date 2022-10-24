/*******************************************************************************
 * Author: chainsea\hsin.lin; 
 * CreateDate: 2021/05/25
 * Description: 帶入客戶資料電文發送及選擇(機場停車預約單、機場新貴通申請單)NB01
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin;
 * LastUpdateDate: 2021/05/25
 * Note:
 ******************************************************************************/
var m1211Form = {
	sessionId : null,
	agentId : null,
    doPost: function() {
    	m1211Form.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		m1211Form.agentId = CommonBusiness.getFieldValue("Qs.User",userId, "FLoginName");

    	if (Identify.doCheck()){
        var data = {};
        data = {
            "CARDNUM": form.getFieldValue("F_CardKind"), // 卡種
            "CUSIDN": form.getFieldValue("F_Identify"), // 身分證字號或統一編號
            "TXNCOD" :"NB01"
        };

        var args = JSON.stringify({
            "name": "NB01tbbapi",
            "from": "csr",
            "sessionId": m1211Form.sessionId,
            "agentId": m1211Form.agentId,
            "formData": data
        });

        TBBUtil.doPost(JSON.parse(args), function(ret) {
        	//電文回傳
            if (ret.isSuccess) {
            	var json = ret;
            	
            	json.F_Info = [];
            	json.F_Informa = ret.form.Card;
         	
            	var temp={};
            	temp["F_Tel1"] = ret.form.TEL1;
            	temp["F_Tel2"] = ret.form.TEL2;
            	temp["F_Mobile"] = ret.form.MOBILE;
            	temp["F_OwnerName"] = ret.form.OWNERNAME;
            	temp["F_OwnerEname"] = ret.form.OWNERENAME;
            	temp["F_branch"] = ret.form.BRANCH;
            	
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
            	
            	
            	// console.log(json);

                form.setFieldValue("U_ErrorCode", ret.form.MSGCOD);
                form.setFieldValue("U_PageStatus", ret.form.MSGCOD);

                var PageNum = json.F_Info.length;

                form.setFieldValue("U_PageNum", "");
                if (ret.form.MSGCOD == "OKLR") {
//                    console.log(JSON.stringify(json.F_Info[Info]));

                    var unitCode = clientData.unitCode;
                    var title = document.title;
                    var args = {
                        json: json,
                        unitCode: unitCode,
                        title: title
                    };
                    // console.log(json);
                   // console.log(json.F_Info[Info]);
//                    for (var i = 0; i < json.F_Informa.length; i++) {
//                        console.log(json.F_Informa[i]);
//                    }
                    //if卡號資料只有一筆
                    if (json.F_Informa.length == 1) {
                        form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
                        form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
                        form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                        form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                        form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                        form.setFieldValue("F_CardNumber", json.F_Informa[0].F_CreditCardNo);
                        //form.setFieldValue("F_Address",json.F_Info[0].F_Address);
                    }
                    //卡號資料有多筆
                    else {
                        console.log(unitCode);
                        //彈出多筆卡號資料清單
                        Utility.openDialog("TBB.Info.page", args, true, function(ret) {
                            if (unitCode != "TBB.m1211AA") {
                                form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
                                form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
                                form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                            }
                            form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                            form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                            //form.setFieldValue("F_Address",json.F_Info[0].F_Address);
                            for (var i = 0; i < ret.length; i++) {
                                if (ret.length == 1) {
                                    if (unitCode == "TBB.m1211AA" || unitCode == "TBB.m1211BA") {
                                        form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                        form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                        form.setFieldValue("F_ID", ret[i].F_ID);
                                        var F_CreditType = null;
                                        if (ret[i].F_CreditType == "正卡") {
                                            F_CreditType = 0;
                                        } else if (ret[i].F_CreditType == "附卡") {
                                            F_CreditType = 1;
                                        }
                                        form.setFieldValue("F_PMCard", F_CreditType);


                                    } else {
                                        form.setFieldValue("F_EnglishName", json.F_Info[0].F_OwnerEname);
                                        form.setFieldValue("F_CardNumber", ret[i].F_CardNo);
                                        form.setFieldValue("F_Sex", ret[i].F_Sex);
                                    }
                                } else {
                                    if (unitCode == "TBB.m1211AA" || unitCode == "TBB.m1211BA") {
                                        form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                        form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                        form.setFieldValue("F_ID", ret[i].F_ID);
                                        var F_CreditType = null;
                                        if (ret[i].F_CreditType == "正卡") {
                                            F_CreditType = 0;
                                        } else if (ret[i].F_CreditType == "附卡") {
                                            F_CreditType = 1;
                                        }
                                        form.setFieldValue("F_PMCard", F_CreditType);


                                    } else {
                                        if (i == 0) {
                                            form.setFieldValue("F_EnglishName", json.F_Info[0].F_OwnerEname);
                                            form.setFieldValue("F_CardNumber", ret[i].F_CardNo);
                                            form.setFieldValue("F_Sex", ret[i].F_Sex);
                                        } else if (i == 1) {
                                            form.setFieldValue("F_UserName1", ret[i].F_AppendName);
                                            form.setFieldValue("F_EnglishName1", ret[i].F_AppendEname);
                                            form.setFieldValue("F_Sex1", ret[i].F_Sex);
                                            form.setFieldValue("F_CardNumber1", ret[i].F_CardNo);
                                        } else if (i == 2) {
                                            form.setFieldValue("F_UserName2", ret[i].F_AppendName);
                                            form.setFieldValue("F_EnglishName2", ret[i].F_AppendEname);
                                            form.setFieldValue("F_Sex2", ret[i].F_Sex);
                                            form.setFieldValue("F_CardNumber2", ret[i].F_CardNo);


                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            }
        })
    	}else  {return false;}
    }

}