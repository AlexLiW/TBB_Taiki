/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/11 
 * Description:信用卡持卡總覽查詢 TBB.UCreditcardholder
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor\Emily.tsai
 * LastUpdateDate: 2022/03/29
 * Note: 控管 更改字典來源
				 2022/02/09 Gemfor\Emily.tsai 將信用卡持卡總攬查詢原一頁10筆改成一頁30筆
				 2022/02/11 Gemfor\Liz.chen 網格排序
				 2022/02/21 Gemfor\Liz.chen	回傳金額後兩位不為小數、加上千分位
				 2022/02/25 Gemfor\Liz.chen 網格中控管和卡別欄位縮短
				 2022/03/29 Gemfor\Emily.tsai 網格欄位值靠右
 ******************************************************************************/
var UCreditcardholderForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    doLoad: function() {
		// 20210909 Yuwen.Wang 新增從聯絡人開啟表單時，帶身分證至信用卡持卡總覽的身分證字號
		if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID);
		} else {// 信用卡持卡總覽查詢
			var ret = TBBUtil.getContact();
			if (!Jui.array.isEmpty(ret)) {
				var custID = ret.U_CustID;
				form.setFieldValue("U_UID", custID);
			}
		}
        UCreditcardholderForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UCreditcardholderForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        // 20210914 adjust by gemfor\Tiffany
        if ("custID" in clientData.urlArgs) { // 聯絡人開啟表單
			form.setFieldValue("U_UID", clientData.urlArgs.custID); // 身分證字號
		} else { // 金融端業務開啟表單
			if (TBBUtil.getContact()) {
				form.setFieldValue("U_UID", TBBUtil.getContact().U_CustID);
	            UCreditcardholderForm.UID = TBBUtil.getContact().U_CustID;
			} else {
	            form.setFieldValue("U_UID", "");
	        }
		}
        
        form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
        form.getControl("U_Inquiry").onclick = UCreditcardholderForm.doPost;
		// 20210909 Yuwen.Wang 表單新增「信用卡已出總帳單明細查詢」按紐觸發條件
        // 20210916 adjust by gemfor\Tiffany -- 修改bug
		// form.getControl("U_Inquir2").onclick = UCreditcardholderForm.openTBBForm("TBB.UCUSYearsbillmonth.Form");
		Jui.event.attach(form.getControl("U_Inquiry2"), "onclick", function() {
			UCreditcardholderForm.openTBBForm("TBB.UCUSYearsbillmonth.Form");
		});
		
		UCreditcardholderForm.setIdOnchange(); // 20210916
		
		// 20220209 add by gemfor\Emily
		form.getControl("U_Grid").setPageSize(30);
		
    },

    // 快速鏈結 hsin
    openQuickLinck: function(page) {
        
        var grid = form.getControl('U_Grid').getEventRow();
        var args1 = {    U_CardNum : grid.data.U_CardNum   };
        var args2 = {    U_CardNum : grid.data.U_CardNum, U_CardType:grid.data.U_CardType   };
        switch (page) {

            case 'A':
                Utility.openDialog("TBB.UHistoricalpayment.Form.page",args1);
                break; 
            case 'B':
                Utility.openDialog("TBB.UYearsbillmonth.Form.page",args1);
                break; 
            case 'C':
                Utility.openDialog("TBB.URequestunpaid.Form.page",args2);
                break; 
            case 'D':
                Utility.openDialog("TBB.UCardrepaymentsettled.Form.page",args1);
                break; 
            case 'E':
                Utility.openDialog("TBB.UCardinterestcalculation.Form.page",args2);
                break; 
            case 'F':
                Utility.openDialog("TBB.UAuthorizedunclaimed.Form.page",args1);
                break; 
            case 'G':
                Utility.openDialog("TBB.UCardinformation.Form.page",args2);
                break; 
			case 'H':// 20210909 Yuwen.Wang 快速連結新增「最近一年交易查詢」選項
                Utility.openDialog("TBB.ULastyeartrade.Form.page",args1);
                break; 
        }
    },
	// 20210909 Yuwen.Wang 表單點選「信用卡已出總帳單明細查詢」按紐呼叫的動作
	openTBBForm : function(pageCode) { // 開啟對應表單
		var args = {
			custID : form.getFieldValue("U_UID"), // 身分證字號
		};
		var options = {
				width: 1685,
                height: 740
		};
		Utility.openDialog(pageCode + ".page", args, options);
	},


    // BSIK信用卡持卡總覽查詢 hsin
    doPost: function() {
        if (!form.validate()) {
            return;
        }
		// 20210908 Yuwen.Wang 新增按下查詢 沒有輸入身分證的提示視窗
        if(Jui.object.isEmpty(form.getFieldValue("U_UID"))){
			Jui.message.alert("請填寫\"身分證字號\"");
			return;
		}
		
        form.setFieldValue("U_Grid", "");
        form.setFieldValue("U_ErrorMemo", "");
        form.setFieldValue("U_ErrorCode", "");
		
		var fpidInfo = form.getFieldValue("U_UID"); 
		var newfpid = "";
		if(fpidInfo.length == 10){
			var res = /[A-Z]{2}[0-9]{8}/;
			if(res.test(fpidInfo)){
				newfpid = form.getFieldValue("U_UID") + "R";
			} else{
				newfpid = form.getFieldValue("U_UID");
			}
		} else {
			newfpid = form.getFieldValue("U_UID");
		}

        data = {
            //"ID": form.getFieldValue("U_UID"),
			"ID": newfpid,
            "ORG": "150"
        };

        var args = JSON.stringify({
            "name": "BSIKtbbapi",
            "from": "csr",
            "sessionId": UCreditcardholderForm.sessionId,
            "agentId": UCreditcardholderForm.agentId,
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
                // 電文回傳狀態
            	
                if (ret.isSuccess) {                	
                	if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) { // 20210927 add by gemfor\Tiffany
						var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10ca9e650"}).data; // TBB-BSIK回應碼
						var ABENDtxt = ret.form.ABEND;
						for (var i = 0; i < codeDic.length; i++) {
							if (codeDic[i].value == ret.form.ABEND) {
								ABENDtxt = codeDic[i].text;
								break;
							}
						}
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
						return;
					}
                    var DataGrid = [];
                    var formData = ret.form;
                    for(var i=0; i<=formData.REC.length-1; i++)
                    {
	                    if (parseInt(formData.REC[i].CARDNMBR) > 0) { // 排除卡號為0或空
		                    // 控管
		                    var control = formData.REC[i].BLOCKCODE    
		                    controlRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c2b44f8290"}).data; // TBB-信用卡卡片狀態查詢-控管碼/舊控款碼 -- 20210930 Tiffany
		                    for (var n = 0; n < controlRet.length; n++) {
		                        if (controlRet[n].value == control) {
		                            control = controlRet[n].text;
		                        }
		                    }
							var CardTypeText = formData.REC[i].TYPE    
		                    CardTypeRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c303039590"}).data; // TBB-信用卡卡別 -- 20211004 Wolf
		                    for (var m = 0; m < CardTypeRet.length; m++) {
		                        if (CardTypeRet[m].value == CardTypeText) {
		                            CardTypeText = CardTypeRet[m].text;
		                        }
		                    }
		                              
		                    
		                    
		                    var record={
		                        U_Control : formData.REC[i].BLOCKCODE + control, // 20210916 Tiffany
		                        U_Overdraft : formData.REC[i].CURRBALSIGN + ((formData.REC[i].CURRBAL.toString()).indexOf(".") != -1 ? (formData.REC[i].CURRBAL.toFixed((formData.REC[i].CURRBAL).toString().indexOf(".") + 1).toLocaleString().substring(0, (formData.REC[i].CURRBAL).toString().indexOf(".") + 3)) : formData.REC[i].CURRBAL.toLocaleString() + ".00"), // 20220221 by Liz
		                        //U_Overdraft : formData.REC[i].CURRBALSIGN+UCreditcardholderForm.doAmount(formData.REC[i].CURRBAL),
		                        U_CardCredit : TBBUtil.thousandComma(formData.REC[i].CRLIMIT),
		                        U_CardType : CardTypeText, // TBB-信用卡卡別 -- 20211004 Wolf
		                        U_CardNum : formData.REC[i].CARDNMBR,
		                    };
		                    DataGrid.push(record);
		                    form.getControl("U_Grid").setValue(DataGrid);
	                    }
                    }
                    
                    // 20210916 Tiffany - 依據卡別由小到大排序
                    var gridData = form.getControl("U_Grid").getData();
                    var wlen1 = gridData.length;
                    var count1 = 0;// 記錄總執行次數
                    for (var i = 0; i < gridData.length - 1; i++) {
                        for (var j = 0; j < wlen1 - 1; j++) {
                            if (gridData[j].U_CardType > gridData[j + 1].U_CardType 
                            		// 20220210 Liz - 再依卡號由小到大排序
                                    || (gridData[j].U_CardType == gridData[j + 1].U_CardType && gridData[j].U_CardNum > gridData[j + 1].U_CardNum)) {
                                var temp;
                                temp = gridData[j];
                                gridData[j] = gridData[j + 1];
                                gridData[j + 1] = temp;
                                count1++;
                            }
                        }
                        wlen1 = wlen1 - 1;
                    }
                    form.getControl("U_Grid").setValue(gridData);
                    
                    var MSGCOD = ret.form.ABEND;
                    form.setFieldValue("U_ErrorCode", ret.form.ABEND);
                    msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10ca9e650"}).data; // 20210927 Tiffany
                    for (var i = 0; i < msgcodDicRet.length; i++) {
                        if (msgcodDicRet[i].value == MSGCOD) {
                            form.setFieldValue("U_ErrorMemo", msgcodDicRet[i].text);
                            break;
                        }
                    }

                    //document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '180px'; // 20220225 控管長度 by Liz
                    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '450px'; // 20220225 控管長度 by Emma
                    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '100px'; // 20220225 現欠總額長度 by Emma
                    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[2].width = '100px'; // 20220225 卡片額度長度 by Emma
                    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[3].width = '150px'; // 20220225 卡別長度 by Liz
                    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[4].width = '150px'; // 卡號 -- 20210930 Tiffany
                    //表格欄位的值靠左或靠右
                    //20220329 現欠總額值靠右-Emily
                    var Overdraft = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		
            		for(var i = 1; i < Overdraft.length; i++){
            			
            			    var tds = Overdraft[i].getElementsByTagName("td");
            			        tds[1].style.textAlign = 'right'
            		}
            		//20220329 卡片額度值靠右-Emily
                    var CardCredit = document.getElementsByClassName("JuiGridTable")[0].getElementsByTagName("tr");
            		
            		for(var i = 1; i < CardCredit.length; i++){
            			
            			    var tds = CardCredit[i].getElementsByTagName("td");
            			        tds[2].style.textAlign = 'right'
            		}
                }

            } else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },
    
    //後兩位加上小數點+千分位
    doAmount:function (num){
        var str = num.toString();
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
    },
    
	setIdOnchange : function() { // 20210916 Tiffany -- 檢核身份證、統編、統一證號
		Jui.event.attach(form.getControl("U_UID"), "onchange", function() {
			ret = TBBUtil.doCheckIdentify(form.getFieldValue("U_UID"), 6);
			if (ret) {
				form.setFieldValue("U_UID", form.getFieldValue("U_UID").toLocaleUpperCase());
			} else {
				form.setFieldValue("U_UID", null);
			}
		});
	},
	
}
Jui.event.attach(window, 'load', UCreditcardholderForm.doLoad);

Jui.option.Grid.doPageButtonClick=function(){ // 20210930 Tiffany - 改寫網格選頁按鈕
	var b=Jui.$owner();
	var a=this;
	if(!a.hasAttribute("Forbidden")){
		if(a==b._firstPageButton){
			b._loadPage(1);
		}else{
			if(a==b._previousPageButton){
				b._loadPage(b._pageIndex-1);
			}else{
				if(a==b._nextPageButton){
					b._loadPage(b._pageIndex+1);
				}else{
					if(a==b._lastPageButton){
						b._loadPage(Math.ceil(b._dataJson.length/b._pageSize));
					}
				}
			}
		}
	}
	//document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '150px'; // 控管
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[0].width = '450px'; // 20220225 控管長度 by Emma
    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[1].width = '100px'; // 20220225 現欠總額長度 by Emma
    document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[2].width = '100px'; // 20220225 卡片額度長度 by Emma
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[3].width = '150px'; // 卡號
	document.getElementsByClassName("JuiGridTable")[0].firstChild.firstChild.children[4].width = '150px'; // 卡號
};

Jui.option.Grid.prototype.setPageSize = function(pageSize) { // 20220209 add by gemfor\Emily -- 網格分頁筆數設定
	var me = this;
	me._pageSize = Math.max(1, Jui.cast.toNumber(pageSize) || 10);
	me.load({
		header : me._headerJson,
		data : me._dataJson
	});
};