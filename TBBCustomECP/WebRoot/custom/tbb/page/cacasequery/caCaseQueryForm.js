/*******************************************************************************
 * Author: chainsea\hsin.lin; 
 * CreateDate: 2021/06/23
 * Description:信用卡申請案件查詢 TBB.caCaseQuery
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: AI.Wolf.Wu 
 * LastUpdateDate: 2021/10/28
 * Note: chainsea\Yuwen.Wang;  2021/10/26 調整拆解回傳方式
				2021/10/28 針對回傳狀態控制進行調整
 ******************************************************************************/
var caCaseQueryForm = {
    sessionId: null,
    agentId: null,
    ACNO: null,
    UID: "",
    doLoad: function() {
        ACNO = clientData.urlArgs.U_ACN;
        if (!Jui.string.isEmpty(ACNO)) {
            form.setFieldValue("U_ACNO", ACNO);
        }

        if (TBBUtil.getContact()) {
            caCaseQueryForm.UID = TBBUtil.getContact().U_CustID;
        }

        caCaseQueryForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        caCaseQueryForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        form.getControl("U_Qtype").onchange = caCaseQueryForm.doChange;
        form.getControl("U_Button").onclick = caCaseQueryForm.doPost;
        form.getControl("U_Button").setElementStyle("width: 30%"); //設定按鈕大小
    },

    doChange: function() {
        if (form.getFieldValue("U_Qtype") == 1) {
            form.setFieldValue("U_Qitem", caCaseQueryForm.UID);
        } else {
            form.setFieldValue("U_Qitem", "");
        }
    },

    //post eloan-caCaseQuery
    doPost: function() {

        form.setFieldValue("U_Grid", "");

        if (!form.validate()) {
            return;
        }

        var data = "qtype=" + form.getFieldValue("U_Qtype") + "&qitem=" + form.getFieldValue("U_Qitem")

        var startDT = form.getFieldValue("U_Sdate"),
            endDT = form.getFieldValue("U_Edate");
        if (startDT && endDT) {
            if ((Date.parse(endDT)).valueOf() < (Date.parse(startDT)).valueOf()) {
                Jui.message.alert("查詢迄日時間不能小於查詢起日時間"); // 改成文本
                return;
            }
            //日期轉格式yyy/mm/dd            
            var startDTY = startDT.substring(0, 4);
            var startCDTY = parseInt(startDTY) - 1911;
            startDT = startCDTY + "/" + startDT.substring(5, 7) + "/" + startDT.substring(8, 10);

            var endDTY = endDT.substring(0, 4);
            var endCDTY = parseInt(endDTY) - 1911;
            endDT = endCDTY + "/" + endDT.substring(5, 7) + "/" + endDT.substring(8, 10);

            data += "&sdate=" + startDT + "&edate=" + endDT;
        }

        console.log("caCaseQuery data" + data);

        var args = JSON.stringify({
            "name": "caCaseQuerytbbapi",
            //"name" : "caCaseQuery",
            "from": "csr",
            "sessionId": caCaseQueryForm.sessionId,
            "agentId": caCaseQueryForm.agentId,
            "formData": data
        });
        console.log(args);

        // 20211006 Alex提供 新增發url方式
        var http = new XMLHttpRequest();
        var url = window.location.toString().split("ecp")[0] + "ecp/openapi/custom/transaction/json";
        var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍候。");
            });
        http.open("POST", url, true);
        http.setRequestHeader("Access-Control-Allow-Origin", "*");
        http.setRequestHeader("Content-type", "application/json");
        setTimeout(function() {
            http.onreadystatechange = function() {


                if (http.readyState == 4) {
                    if (http.status == 200) {
                        var DataGrid = [];


                        //20211025 Yuwen.Wang 調整拆解回傳方式
                        var responseText = JSON.parse(http.responseText);
                        console.log("responseText = " + responseText);
                        var formData = responseText.result.source.data;
                        //console.log("formData = "+formData);
						if(formData != null) { //確保查詢到的資料存在。
							for (var i = 0; i <= formData.length - 1; i++) {

								// 審核結果
								var docstatus = formData[i].DOCSTATUS
								docstatusRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {
									dictionaryId: "0100c056-5000-785f-0408-17a380820050"
								}).data;
								for (var n = 0; n < docstatusRet.length; n++) {
									if (docstatusRet[n].value == docstatus) {
										docstatus = docstatusRet[n].text;
										break;
									}
								}

								var record = {
									RCVNO: formData[i].RCVNO,
									CUSTID: formData[i].CUSTID,
									CUSTNM: formData[i].CUSTNM,
									CENCOIN: formData[i].CENCOIN,
									CENDATE: formData[i].CENDATE,
									DOCSTATUS: docstatus,
									CENCARD: formData[i].CENCARD,
									UNCASEDESCTOTH: formData[i].UNCASEDESCTOTH,
									EMP2NM:formData[i].EMP2NM,
								};
								console.log("第" + (i + 1) + "筆資料 : " + record);
								DataGrid.push(record);
								form.getControl("U_Grid").setValue(DataGrid);
							}
						} else {
							Jui.message.alert("查無資料。");
							bar.close();
						}
                    } else {
                        console.log('readyState: ' + http.readyState + 'status: ' + http.status);
                        // 電文失敗
                        Jui.message.alert("呼叫 API 失敗，詳情請洽資訊處！");
						bar.close();
                        return;
                    }
                    bar.close();
                }
            }
            http.send(args);
        }, 1 * 1000);

        // 20211006 Alex提供 註解原本方式

        /* TBBUtil.doPost(JSON.parse(args), function(ret) {
             console.log(ret);
             if (ret == undefined) {
                     Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                     return;
             }
             if(ret.isSuccess){
                 var DataGrid = [];
                 var formData = ret.data;
                 //var formData = ret.source.result.data;
                 for (var i = 0; i <= formData.length - 1; i++) {                        
                         
                         // 審核結果
                         var docstatus = formData[i].DOCSTATUS    
                         docstatusRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0100c056-5000-785f-0408-17a380820050"}).data;
                         for (var n = 0; n < docstatusRet.length; n++) {
                             if (docstatusRet[n].value == docstatus) {
                                 docstatus = docstatusRet[n].text;
                             }
                         }
                         
                         var record = {
                             RCVNO: formData[i].RCVNO,
                             CUSTID: formData[i].CUSTID,
                             CUSTNM: formData[i].CUSTNM,
                             CENCOIN: formData[i].CENCOIN,
                             CENDATE: formData[i].CENDATE,
                             DOCSTATUS: docstatus,
                             CENCARD: formData[i].CENCARD,
                             UNCASEDESCTOTH: formData[i].UNCASEDESCTOTH,
                         };
                         DataGrid.push(record);
                         form.getControl("U_Grid").setValue(DataGrid);
                 }
             }else {
                 // 電文失敗
                 Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                 return;
             }
         })*/

    },



}
Jui.event.attach(window, 'load', caCaseQueryForm.doLoad);