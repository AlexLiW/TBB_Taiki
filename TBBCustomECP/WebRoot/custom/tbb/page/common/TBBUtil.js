//TBB共用function
var TBBUtil = {
    sessionId : null,
    agentId : null,
    address : "",

  /********************************************************************************
  * Author: chainsea\hsin.lin;  
  * CreateDate: 2021/05/20
  * Description: 發電文
  * 
  * input parameters: 
  *     @param  args(JSON)
  *     @param  func
  * output parameters: 
  *     @return ReturnJson(JSON)
  * LastUpdateUser: chainsea\hsin.lin;
  * LastUpdateDate: 2021/05/20
  * Note: 
  *******************************************************************************/
    doPost: function(args,func){
            var ReturnJson="";
            var http = new XMLHttpRequest();
            var url = window.location.toString().split("ecp")[0] + "ecp/openapi/custom/transaction/json";
            http.open("POST", url, true);
            http.setRequestHeader("Access-Control-Allow-Origin", "*");
            http.setRequestHeader("Content-type", "application/json");
            http.onreadystatechange = function(){
                if(http.readyState == 4 && http.status == 200){
                    //alert(JSON.stringify(args));
                    var responseText = JSON.parse(http.responseText);
                    //alert("doSend response: " + http.responseText);
                    ReturnJson = http.responseText;
                    //console.log('ReturnJson' + ReturnJson);
                    if(JSON.parse(ReturnJson).result){
                        Jui.util.execute(func, window, JSON.parse(ReturnJson).result.source.result);
                    }else{
                        Jui.util.execute(func, window, JSON.parse(ReturnJson));
                    }
                }
            }

            http.send(JSON.stringify(args));
        
    },
    
    
  /********************************************************************************
  * Author: gemfor\tiffany.wu;  
  * CreateDate: 2021/05/24
  * Description: 數值轉字串並加上千分位
  * 
  * input parameters: 
  *     @param  number
  * output parameters: 
  *     @return num
  * LastUpdateUser: gemfor\tiffany.wu;
  * LastUpdateDate: 2021/05/24
  * Note: 
  *******************************************************************************/  
    thousandComma : function(number) {
        var num = number.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while (pattern.test(num)) {
            num = num.replace(pattern, "$1,$2");
        }
        return num;

    },
    
    
  /********************************************************************************
  * Author: chainsea\hsin.lin;  
  * CreateDate: 2021/05/25
  * Description: 獲取當前進線聯絡人資訊
  * 
  * input parameters: 
  *     @param  N/A
  * output parameters: 
  *     @return result
  * LastUpdateUser: chainsea\hsin.lin;
  * LastUpdateDate: 2021/05/25
  * Note: 
  *******************************************************************************/  
    getContact : function() {
        var ctiData = Jui.window.getTop().CtiMainFrame.getCurrentBobyCtiData() || {};
        if (!Jui.string.isEmpty(ctiData.objectId)) {
            var result = Utility.syncInvoke("Ecp.Contact.getListData.data", {
                conditions: [{
                    fieldName: "FId",
                    operator: "Equal",
                    value: ctiData.objectId
                }]
            }).data.records[0];
            return result;
        }
    },
    
  /*******************************************************************************
  * Author: chainsea\hsin.lin; 
  * CreateDate: 2021/05/25
  * Description: 帶入客戶資料電文發送(NB01)及選擇，原舊有表單Info.doCsrQuery("NB01")
  * 
  * input parameters: N/A
  * 
  * output parameters: N/A
  * 
  * LastUpdateUser: gemfor/Emily;
  * LastUpdateDate: 2022/02/14
  * Note:           2022/02/14-gemfor/Emily-將身分證帶回表單
  ******************************************************************************/
    doInfoPost: function() {
        TBBUtil.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        TBBUtil.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        if (Identify.doCheck()) {
            var data = {};
            var cardkink="C";
            if(form.getFieldValue("F_CardKind")){
                cardkink=form.getFieldValue("F_CardKind");
            }
            data = {
                "CARDNUM": cardkink, // 卡種
                //"CARDNUM": form.getFieldValue("F_CardKind"), // 卡種
                "CUSIDN": form.getFieldValue("F_Identify"), // 身分證字號或統一編號
                "TXNCOD": "NB01"
            };

            var args = JSON.stringify({
                "name": "NB01tbbapi",
                "from": "csr",
                "sessionId": TBBUtil.sessionId,
                "agentId": TBBUtil.agentId,
                "formData": data
            });

            TBBUtil.doPost(JSON.parse(args),
            function(ret) {
                //電文回傳
                if (ret.isSuccess) {
                    var json = ret;

                    json.F_Info = [];
                    json.F_Informa = ret.form.Card;

                    var temp = {};
                    temp["F_Tel1"] = ret.form.TEL1;
                    temp["F_Tel2"] = ret.form.TEL2;
                    temp["F_Mobile"] = ret.form.MOBILE;
                    temp["F_OwnerName"] = ret.form.OWNERNAME;
                    temp["F_OwnerEname"] = ret.form.OWNERENAME;
                    temp["F_branch"] = ret.form.BRANCH;
                    temp["F_Address"] = ret.form.ADDRESS;
                    
                    var unitCode = clientData.unitCode;
                    if (unitCode == "TBB.m1211CA"){
                        TBBUtil.address = ret.form.ADDRESS;
                    }

                    json.F_Info.push(temp);

                    for (var i = 0; i < ret.form.Card.length; i++) {
                        json.F_Informa[i].F_CardKind = ret.form.Card[i].CARDKIND;
                        json.F_Informa[i].F_AppendName = ret.form.Card[i].APPENDNAME;
                        json.F_Informa[i].F_AppendEname = ret.form.Card[i].APPENDENAME;
                        json.F_Informa[i].F_CreditCardNo = ret.form.Card[i].CREDITCARDNO;
                        json.F_Informa[i].F_Sex = ret.form.Card[i].SEX;
                        json.F_Informa[i].F_ID = ret.form.Card[i].ID;
                        json.F_Informa[i].F_CreditType = ret.form.Card[i].CREDITTYPE;
                        json.F_Informa[i].F_OwnerName = ret.form.Card[i].APPENDNAME;
                    }
                    
                    //2021.09.15-gemfor/lillian-將回傳的資料倒置並去除空白
                    let F_Informa_format = [];
                    for(i = json.F_Informa.length -1 ; i > -1 ; i--){
                    	let F_CardKind = json.F_Informa[i].F_CardKind;
                    	let F_AppendName = json.F_Informa[i].F_AppendName;
                    	let F_AppendEname = json.F_Informa[i].F_AppendEname;
                    	let F_CreditCardNo = json.F_Informa[i].F_CreditCardNo;
                    	let F_Sex = json.F_Informa[i].F_Sex;
                    	let F_ID = json.F_Informa[i].F_ID;
                    	let F_CreditType = json.F_Informa[i].F_CreditType;
                    	let F_OwnerName = json.F_Informa[i].F_OwnerName;
                    	if(
                    			!Jui.object.isEmpty(F_CardKind.replace(/\s*/g,"")) 		|| 
                    			!Jui.object.isEmpty(F_AppendName.replace(/\s*/g,"")) 	||
                    			!Jui.object.isEmpty(F_AppendEname.replace(/\s*/g,"")) 	||
                    			!Jui.object.isEmpty(F_CreditCardNo.replace(/\s*/g,"")) 	||
                    			!Jui.object.isEmpty(F_Sex.replace(/\s*/g,"")) 			||
                    			!Jui.object.isEmpty(F_ID.replace(/\s*/g,"")) 			||
                    			!Jui.object.isEmpty(F_CreditType.replace(/\s*/g,"")) 	||
                    			!Jui.object.isEmpty(F_OwnerName.replace(/\s*/g,"")) 
                    		){
                    			F_Informa_format.push(json.F_Informa[i]);
                    	}
                    }
                    json.F_Informa = F_Informa_format;
                    

                    // console.log(json);

                    // 電文交易結果
                    var MSGCOD = ret.form.MSGCOD;
                    // var msgcodText = MSGCOD == 'OKOK' ? '還有資料要傳': MSGCOD == 'OKLR' ? '最後一筆資料': MSGCOD == 'EACC' ? '帳號有誤': MSGCOD == 'ERDB' ? '中心檔案有誤': MSGCOD == 'ENRD' ? '無資料': '';
                    form.setFieldValue("U_ErrorCode", MSGCOD);
                    form.setFieldValue("U_PageStatus", MSGCOD);
                    // form.setFieldValue("U_ErrorMemo", msgcodText);

                    msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                    for (var i = 0; i < msgcodDicRet.length; i++) {
                        if (msgcodDicRet[i].value == MSGCOD) {
                            form.setFieldValue("U_ErrorMemo", msgcodDicRet[i].text);
                            break;
                        }
                    }

                    var PageNum = json.F_Info.length;
                    form.setFieldValue("U_PageNum", "");
                    
                    if (MSGCOD == "OKLR") {
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
                        
                        
                        /* if (unitCode == "TBB.m12116A") { // [信用卡額度調整單] 直接帶入第一筆正卡資料
                            for (var i = 0; i < json.F_Informa.length; i++) {
                                if (json.F_Informa[i].F_CreditType == "0") {
                                    form.setFieldValue("F_UserName", json.F_Informa[i].F_OwnerName);
                                    form.setFieldValue("F_CardNumber", json.F_Informa[i].F_CreditCardNo);
                                    form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
                                    form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
                                    form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                                    form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                                    break;
                                }
                            }
                            return;
                        } */
                        
                        /* if (unitCode == "TBB.m12112A") { // [轉介客戶抱怨單] 只帶入客戶資料
                            for (var i = 0; i < json.F_Informa.length; i++) {
                                if (json.F_Informa[i].F_CreditType == "0") {
                                    form.setFieldValue("F_Name", json.F_Informa[i].F_OwnerName);
                                    form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
                                    form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
                                    form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                                    form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                                    form.setFieldValue("F_Address", json.F_Info[0].F_Address);
                                    break;
                                }
                            }
                            return;
                        } */
                        
                        //if卡號資料只有一筆
                        if (json.F_Informa.length == 1) {
                            if (unitCode != "TBB.m1211AA") {	//20220217 基本資料變更申請單按下帶入客戶資料後，不可帶上住家電話、手機、公司電話等資訊 by Liz
	                            form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
	                            form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
	                            form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                            }else{
                                form.setFieldValue("F_AppendName", json.F_Info[0].F_OwnerName); // 20220225 帶入姓名 by Liz
                                form.setFieldValue("F_CreditCardNo", json.F_Informa[0].F_CreditCardNo);  //20220225 帶入卡號 by Liz
                            }
                            form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                            form.setFieldValue("F_Name", json.F_Info[0].F_OwnerName);
                            form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                            form.setFieldValue("F_CardNumber", json.F_Informa[0].F_CreditCardNo);
                            form.setFieldValue("F_Address", json.F_Info[0].F_Address);
							// 20220719 add english name and gender 
							form.setFieldValue("F_EnglishName", json.F_Informa[0].F_AppendEname);
							form.setFieldValue("F_Sex", json.F_Informa[0].F_Sex);
                        }
                        //卡號資料有多筆
                        else {
                            console.log(unitCode);
                            //彈出多筆卡號資料清單
                            Utility.openDialog("TBB.Info.page", args, true,
                            function(ret) {
                                if (unitCode != "TBB.m1211AA") {
                                    form.setFieldValue("F_HomePhone", json.F_Info[0].F_Tel1);
                                    form.setFieldValue("F_CompanyPhone", json.F_Info[0].F_Tel2);
                                    form.setFieldValue("F_MobilePhone", json.F_Info[0].F_Mobile);
                                }
                                // form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                                // form.setFieldValue("F_Name", json.F_Info[0].F_OwnerName);
                                form.setFieldValue("F_Branch", json.F_Info[0].F_branch);
                                form.setFieldValue("F_Address", json.F_Info[0].F_Address);
                                for (var i = 0; i < ret.length; i++) {
                                    
                                    /* if (unitCode == "TBB.m12111A" || unitCode == "TBB.m12113A") { // [預借現金密碼函]、[業務諮詢轉介單] 選擇附卡只帶附卡資料
                                        var j = 0;
                                        if (ret.length > 1) {
                                            j = 1;
                                        }
                                        if (ret[j].F_CreditType == "正卡") {
                                            form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                                            // form.setFieldValue("F_EnglishName", json.F_Info[0].F_OwnerEname);
                                            form.setFieldValue("F_CardNumber", ret[j].F_CardNo);
                                            // form.setFieldValue("F_Sex", ret[j].F_Sex);
                                            form.setFieldValue("F_UserName1", "");
                                            form.setFieldValue("F_CardNumber1", "");
                                        } else if (ret[j].F_CreditType == "附卡") {
                                        	form.setFieldValue("F_UserName", "");
                                            form.setFieldValue("F_CardNumber", "");
                                        	form.setFieldValue("F_UserName1", ret[j].F_AppendName);
                                            // form.setFieldValue("F_EnglishName1", ret[j].F_AppendEname);
                                            form.setFieldValue("F_CardNumber1", ret[j].F_CardNo);
                                            // form.setFieldValue("F_Sex1", ret[j].F_Sex);
                                        }
                                        break;
                                    } */
                                    
                                    form.setFieldValue("F_UserName", json.F_Info[0].F_OwnerName);
                                    form.setFieldValue("F_Name", json.F_Info[0].F_OwnerName);
                                    if (ret.length == 1) {
                                        if (unitCode == "TBB.m1211AA" || unitCode == "TBB.m1211BA"|| args.unitCode == "TBB.stopcardapply") {
                                            //form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                            //form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                            // form.setFieldValue("F_ID", ret[i].F_ID);
                                            var F_CreditType = null;
                                            if (ret[i].F_CreditType == "正卡") {
                                                F_CreditType = 0;
                                                form.setFieldValue("F_ID", ret[i].F_ID);
                                                form.setFieldValue("F_IdentityNo", null); //2021.09.14-gemfor/Emily-清空附卡人身分證號
                                                //form.setFieldValue("F_Identify", ret[i].F_ID);//2021.09.23-gemfor/Emily
                                                form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                                form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                                form.setFieldValue("F_Identify", ret[i].F_ID.replace(/\s+/g, ''));//2022.02.14-gemfor/Emily-將身分證帶回表單
                                            } else if (ret[i].F_CreditType == "附卡") {
                                                F_CreditType = 1;
                                                form.setFieldValue("F_IdentityNo", ret[i].F_ID);
                                                //form.setFieldValue("F_Identify", ret[i].F_ID);
                                                form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                                form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                                form.setFieldValue("F_Identify", ret[i].F_ID.replace(/\s+/g, ''));//2022.02.14-gemfor/Emily-將身分證帶回表單
                                            }
                                            form.setFieldValue("F_PMCard", F_CreditType);


                                        } else {
                                            form.setFieldValue("F_EnglishName", json.F_Info[0].F_OwnerEname);
                                            form.setFieldValue("F_CardNumber", ret[i].F_CardNo);
                                            form.setFieldValue("F_Sex", ret[i].F_Sex);
                                        }
                                    } else {
                                        if (unitCode == "TBB.m1211AA" || unitCode == "TBB.m1211BA"|| args.unitCode == "TBB.stopcardapply") {
                                            //form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                            //form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                            // form.setFieldValue("F_ID", ret[i].F_ID);
                                            var F_CreditType = null;
                                            if (ret[i].F_CreditType == "正卡") {
                                                F_CreditType = 0;
                                                form.setFieldValue("F_ID", ret[i].F_ID);
                                                form.setFieldValue("F_IdentityNo", null); //2021.09.14-gemfor/Emily-清空附卡人身分證號
                                                //form.setFieldValue("F_Identify", ret[i].F_ID); //2021.09.23-gemfor/Emily
                                                form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                                form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
                                            } else if (ret[i].F_CreditType == "附卡") {
                                                F_CreditType = 1;
												F_ID = ret[i].F_ID
                                                form.setFieldValue("F_IdentityNo", F_ID.replace(/\s+/g, ''));
												//2022/01/18 Ai.Wolf 針對停卡申請單，選擇附卡時，將附卡ID帶入身分證字號做調整
												if(args.unitCode == "TBB.stopcardapply") {
													form.setFieldValue("F_Identify", F_ID.replace(/\s+/g, ''));
												}
                                                form.setFieldValue("F_AppendName", ret[i].F_AppendName);
                                                form.setFieldValue("F_CreditCardNo", ret[i].F_CardNo);
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
                                if(unitCode == "TBB.m12117A"){
                                	if(form.getFieldValue("U_SevType2") == "1"){
                                		form.setFieldValue("U_BCardNo", form.getFieldValue("F_CardNumber"));
                                	}
                                }
                            });
                        }
                    }
                }
            })
        } else {
            return false;
        }
    },

  /********************************************************************************
   * Author: gemfor\tiffany.wu;  
   * CreateDate: 2021/06/17
   * Description: 日期時間格式化(yyyy/mm/dd hh:mm:ss.sss)
   * 
   * input parameters: 
   *        @param  date
   *        @param  time
   * output parameters: 
   *        @return newDate
   * LastUpdateUser: gemfor\tiffany.wu;
   * LastUpdateDate: 2021/06/18
   * Note: 
   *******************************************************************************/ 
        formatDTM : function(date, time) {
            var newDT = "";
            var newTM = "";
            if (!Jui.string.isEmpty(date)) { // 日期
                newDT = date.length == "7" ? date.substr(0, 3) + "/" + date.substr(3, 2) + "/" + date.substr(5, 2) 
                        : date.length == "8" ? date.substr(0, 4) + "/" + date.substr(4, 2) + "/" + date.substr(6, 2) : "";

                newDT = newDT + " "
            }
            
            if (!Jui.string.isEmpty(time)) { // 時間
                newTM = time.length == "6" ? time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2) 
                        : time.length == "9" ? time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2) + "." + time.substr(6, 3) : "";
            }
            
            var newDTM = (Jui.string.isEmpty(newDT) ? "" : newDT) + (Jui.string.isEmpty(newTM) ? "" : newTM);
            return newDTM;
        },
        
        
  /********************************************************************************
  * Author: chainsea\hsin.lin;  
  * CreateDate: 2021/06/22
  * Description: 清空分組欄位
  * 
  * input parameters: 
  *      @param   String      要清空的欄位組
  *      @param   String      欄位組的上級分組
  *      @param   String      不清空的欄位(欄位A,欄位B)
  * output parameters: 
  *       N/A
  * LastUpdateUser: chainsea\hsin.lin;
  * LastUpdateDate: 2021/06/22
  * Note: 
  *******************************************************************************/   
    
    doClearFields : function(clearGroupName, TabName, exceptions)
    {
        if(Jui.string.isEmpty(clearGroupName)){
            return;
        }
        var clearGroup = clearGroupName.split(',');
        for(var i = 0; i < clearGroup.length; i++){
            clearGroup[i] = Jui.string.trim(clearGroup[i]);
        }
        var isTabNameEmpty = Jui.string.isEmpty(TabName);
        var exceptionItems = Jui.string.isEmpty(exceptions) ? [] : exceptions.split(',');
        for(var i = 0; i < exceptionItems.length; i++){
            exceptionItems[i] = Jui.string.trim(exceptionItems[i]);
        }
        var controls = form.getControls();
        for(var i = 0; i < controls.length; i++){
            var control = controls[i];
            var args = control.getArgs();
            if(Jui.array.contains(exceptionItems, args.name)){
                continue;
            }
            var isEmpty = false;//是否清空欄位
            if(isTabNameEmpty){
                isEmpty = Jui.array.contains(clearGroup, args.group2);
            }
            else{
                isEmpty = args.group1 == TabName && Jui.array.contains(clearGroup, args.group2);
            }
            if(isEmpty){
                try{
                    control.setValue();
                }catch(e){
                    
                }
            }   
        }
    },
    
    /********************************************************************************
     * Author: gemfor\tiffany.wu;
     * CreateDate: 2021/09/09
     * Description: 分組欄位唯讀
     * 
     * input parameters: 
     *      @param   group1      一級分組
     *      @param   group2      二級分組
     *      @param   disabled    默認傳true或不傳
     *      @param   exceptArr	 不需要反灰的欄位，格式為一個數組如['FName', 'FIndex']，可不傳
     * output parameters: 
     *       N/A
     * LastUpdateUser: gemfor\tiffany.wu;
     * LastUpdateDate: 2021/09/09
     * Note: 
     *******************************************************************************/  
    
   setGroupFieldsDisabled : function(group1, group2, disabled, exceptArr)
     {
       if (Jui.string.isEmpty(group1) && Jui.string.isEmpty(group2)) {
             return;
         }
         disabled = Jui.cast.toBool(disabled, true);
         exceptArr = exceptArr || [];
         var fields = clientData.editJson.title || [];
         for (var i = 0; i < fields.length; i++) {
             var field = fields[i];
             if (Jui.array.contains(exceptArr, field.name)) {
                 continue;
             }
             if (Jui.string.isEmpty(group1)) {
                 if (group2 == field.group2) {
                     form.setFieldDisabled(field.name, disabled);
                 }
             }
             else if (Jui.string.isEmpty(group2)) {
                 if (group1 == field.group1) {
                     form.setFieldDisabled(field.name, disabled);
                 }
             }
             else {
                 if (group1 == field.group1 && group2 == field.group2) {
                     form.setFieldDisabled(field.name, disabled);
                 }
             }
         }
     },
	 
	      /********************************************************************************
      * Author: gemfor\tiffany.wu;
      * CreateDate: 2021/09/15
      * Description: 檢核 身份證字號、統一編號、舊式統一證號
      * 
      * input parameters: 
      *      @param   id	      身份證字號、統一編號、舊式統一證號
      *      @param   type	      type=1 檢核身分證；type=2 檢核統編；type=3 檢核身分證+統編檢核；type=5 檢核舊式統一證號；type=6 檢核身分證+統編+舊式統一證號檢核
      * output parameters: 
      *      @return  ret
      * LastUpdateUser: gemfor\tiffany.wu;
      * LastUpdateDate: 2021/09/15
      * Note: 
      *******************************************************************************/
 	doCheckIdentify : function(id, type) {
		var Msg = "";
		var ret = true;
		var MsgCode = 0;
		if (id == null) {
			if (type == 1) {
				MsgCode = 1;
			}
			if (type == 2) {
				MsgCode = 2;
			}
			if (type == 3) {
				MsgCode = 3;
			}
			if (type == 5) {
				MsgCode = 5;
			}
			if (type == 6) {
				//MsgCode = 6; //20211222  AI.Wolf 對應客戶需求，將判斷舊式、新式身分證及統一編號的邏輯改為僅判斷長度是否達8碼。
				MsgCode = 7;
			}
			if (type == 7) {
				MsgCode = 7;
			}
		} else {
			id = id.toUpperCase();
			if (type == 1) {
				MsgCode = TBBUtil.validationIdNo(id);
			}
			if (type == 2) {
				MsgCode = TBBUtil.validationVatNo(id);
			}
			if (type == 3) {
				if (TBBUtil.validationIdNo(id) != 0	&& TBBUtil.validationVatNo(id) != 0) {
					// MsgCode = 10;
					MsgCode = 4;
				}
			}
			if (type == 5) {
				MsgCode = TBBUtil.validationOldIdNo(id);
			}
			if (type == 6) {
				//20211222  AI.Wolf 對應客戶需求，將判斷舊式、新式身分證及統一編號的邏輯改為僅判斷長度是否達8碼。
				/*if (TBBUtil.validationIdNo(id) != 0	&& TBBUtil.validationVatNo(id) != 0	&& TBBUtil.validationOldIdNo(id) != 0) {
					MsgCode = 4;
				}*/
				if (TBBUtil.validationCheckLength(id) != 0) {
					MsgCode = 8;
				}
			}
			if (type == 7) {
				if (TBBUtil.validationCheckLength(id) != 0) {
					MsgCode = 8;
				}
			}
		}
		Msg = TBBUtil.getMsg(MsgCode);
		if (MsgCode == 0) {
			ret = true;
		} else {
			Jui.message.alert(Msg);
			ret = false;
		}
		return ret;
	},
	
	validationIdNo : function(id) { // 身份證 
		var fortmatLetter = /^[A-Za-z]*$/;
		var fortmatNum = /^(1|2|8|9)\d{8}$/;
		if (fortmatLetter.test(id.substring(0, 1))) {
			if (fortmatNum.test(id.substring(1, 10))) {
				id = id.toUpperCase();
				var letters = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
				// 將英文轉換成數字並重組字串
				var id = (letters.indexOf(id.substr(0, 1)) + 10) + ""
						+ id.substr(1, 9);
				var checksum = parseInt(id.substr(0, 1)) * 1;
				for (i = 1; i <= 9; i++) {
					checksum += parseInt(id.substr(i, 1)) * (10 - i);
				}
				checksum = checksum % 10;
				checksum = (checksum == 0 ? 0 : 10 - checksum);
				// 和最後一個數字比對
				if (checksum != id.substr(i, 1)) {
					return 4;
				}
				return 0;
			} else {
				// return 7;
				return 4;
			}
		} else {
			// return 6;
			return 4;
		}

	},
	
	validationVatNo : function(id) { // 統一編號
		// 使用「正規表達式」檢驗格式
		var fortmatNum = /^\d{8}$/;
		if (fortmatNum.test(id)) {
		} else {
			// 基本格式錯誤
			// return 9;
			return 4;
		}
		// 計算
		var num = new Array(1, 2, 1, 2, 1, 2, 4, 1);
		var checksum = 0;
		for (var i = 0; i < num.length; i++) {
			var temp = parseInt(id.charAt(i)) * num[i];
			checksum += parseInt(temp / 10) + temp % 10;
		}
		if (checksum % 10 == 0 || (checksum % 10 == 9 && id.charAt(6) == 7)) {
			return 0;
		} else {
			// return 8;
			return 4;
		}
	},
	
	validationOldIdNo : function(id) { // 舊式身份證 
		var fortmatLetter = /^[A-Za-z]*$/;
		var fortmatLetter2 = /^(A|B|C|D)$/;
		var fortmatNum = /^\d{8}$/;
		if (fortmatLetter.test(id.substring(0, 1))) {
			if (fortmatLetter2.test(id.substring(1, 2))) {
				if (fortmatNum.test(id.substring(2, 10))) {
					id = id.toUpperCase();
					var letters = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
					// 將英文轉換成數字並重組字串
					var id = (letters.indexOf(id.substr(0, 1)) + 10) + "" 
								+ ((letters.indexOf(id.substr(1, 1)) + 10) % 10) + ""
								+ id.substr(2, 9);
					var checksum = parseInt(id.substr(0, 1)) * 1;
					for (i = 1; i <= 9; i++) {
						checksum += parseInt(id.substr(i, 1)) * (10 - i);
					}
					checksum = checksum % 10;
					checksum = (checksum == 0 ? 0 : 10 - checksum);
					// 和最後一個數字比對
					if (checksum != id.substr(i, 1)) {
						return 4;
					}
					return 0;
				} else {
					return 4;
				}
			} else {
				return 4;
			}
		} else {
			return 4;
		}
		
	},

	validationCheckLength : function(id) { // 檢核長度是否大於等於8碼
		if (id.length >= 8) {
			return 0;
		} else {
			return 8;
		}
	},
	
	getMsg : function(errCode) {
		var errMsg = "";
		switch (errCode) {
		case 0:
			errMsg = "成功";
			break;
		case 1:
			errMsg = "請您輸入身份證字號！";
			break;
		case 2:
			errMsg = "請您輸入統一編號！";
			break;
		case 3:
			errMsg = "請您輸入身份證字號/統一編號！";
			break;
		case 4:
			errMsg = "格式不符！";
			break;
		case 5:
			errMsg = "請您輸入統一證號！";
			break;
		case 6:
			errMsg = "請您輸入身份證字號/統一編號/統一證號！";
			break;
		case 7: //20211221 AI.Wolf 針對關係人統一編號增加type
			errMsg = "請您輸入查詢資料！";
			break;
		case 8: //20211221 AI.Wolf 針對關係人統一編號增加type
			errMsg = "格式不符，請確認輸入內容達8碼(含)以上！";
			break;
		/*case 4:
			errMsg = "您輸入的身分證字號格式不正確！";
			break;
		case 5:
			errMsg = "身分證字號須為10碼！";
			break;
		case 6:
			errMsg = "身分證字號首字母必須為英文字母！";
			break;
		case 7:
			errMsg = "您輸入的身分證字號後9碼須為數字！";
			break;
		case 8:
			errMsg = "您輸入的統一編號格式不正確！";
			break;
		case 9:
			errMsg = "統編錯誤，要有 8 個 0-9 數字組合!";
			break;
		case 10:
			errMsg = "身分證字號/統編錯誤!";
			break;*/
		default:
			errMsg = "未增加的錯誤！";
			break;
		}
		return errMsg;
	},
    /********************************************************************************
     * Author: AI\Wolf.Wu;
     * CreateDate: 2021/12/06
     * Description: 客制調整產品保存機制，保存表單後不重整畫面
     * 
     * input parameters: 
     *       N/A
     * output parameters: 
     *       N/A
     * LastUpdateUser: AI\Wolf.Wu;
     * LastUpdateDate: 2021/12/06
     * Note: 
     *******************************************************************************/
	doSave_custom: function(expandToTab)
	{
		if (!EntityForm.validate()) {
			return;
		}
		var relationData = {
			relationId		: clientData.relationId,
			masterUnitId	: clientData.masterUnitId,
			masterEntityId	: clientData.masterEntityId
		};
		var data = EntityForm.getData();
		expandToTab = expandToTab == true && Utility.isInDialog(); 
		if (!clientData.checkBeforeSave) {
			TBBUtil.save_custom(data, relationData, expandToTab);
			return;
		}
		var args = Jui.object.merge({unitId:clientData.unitId, entityId:clientData.entityId, data:data}, relationData);
		Utility.invoke("Qs.Duplication.getDuplicationJsonBeforeSave", args, true, function(ret) {
			if (ret.data.length == 0) {
				TBBUtil.save_custom(data, relationData, expandToTab);
				return;
			}
			var args = {unitName:clientData.unitName, listData:ret.data};
			Utility.openDialog("Qs.Duplication.Confirm.page", args, null, function() {
				TBBUtil.save_custom(data, relationData, expandToTab);
			});
		});
	},
	save_custom: function (data, relationData, expandToTab)
	{
		CommonBusiness.saveEntity(clientData.unitCode, [data], relationData, function(json) {
			EntityForm.clearModificationFlag();
			Utility.refreshMenuNumbers(clientData.unitId);
			var entityId = json.entityIds[0];
			EntityForm.addDialogResultEntityId(entityId);
			if (EntityForm.closeAfterSave) {
				Jui.message.hint($text("Public.SaveSuccess"));
				Utility.closeDialog();
				return;
			}
			else if (!expandToTab && !EntityForm.slientSave) {
				if (clientData.entityId != null || !EntityForm.multiAdd || !clientData.queryAddNext) {
					Jui.message.hint($text("Public.SaveSuccess"));
				}
				else if (confirm($text("Public.SaveSuccessAndAddNext"))) {
					entityId = null;
				}
			}
			if (EntityForm.onSaveSuccess != null && EntityForm.onSaveSuccess(entityId) == false) {
				return;
			}
		});
	},
	  /********************************************************************************
     * Author: AI\Wolf.Wu;
     * CreateDate: 2021/12/22
     * Description: 將檢核查詢欄位是否符合條件改為共用Function處理 (根據客戶需求，改為調整僅檢核長度是否達八位數以上)
     * 
     * input parameters: 
     *       FieldName：需判斷的欄位名稱
     * output parameters: 
     *       N/A
     * LastUpdateUser: AI\Wolf.Wu;
     * LastUpdateDate: 2021/12/22
     * Note: 
     *******************************************************************************/
	  setIdOnchange: function(FieldName) { 
			Jui.event.attach(form.getControl(FieldName), "onchange", function() {
				ret = TBBUtil.doCheckIdentify(form.getFieldValue(FieldName), 7);
				if (ret) {
					form.setFieldValue(FieldName, form.getFieldValue(FieldName).toLocaleUpperCase());
				} else {
					form.setFieldValue(FieldName, null);
				}
			});
    }
};

