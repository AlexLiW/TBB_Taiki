/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/18 
 * Description: 索取各項表格(含申請書) TBB.UGetForms
 * UDebitLoss
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: Gemfor.Emily
 * LastUpdateDate: 2022/02/25 
 * Note: 2022/02/25 Gemfor.Emily 更新呼叫WebService資料之網址內容及寫入記錄格式調整
 ******************************************************************************/
var UGetFormsForm = {

    doSave: function() {
		var FaxName = form.getFieldValue("F_DTime").replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "_" + form.getFieldValue("U_Fax");//20220411 更正取值
			form.setFieldValue("U_RealFaxName", "ECP_" + FaxName);//20220406 add by chainsea\Emily.Tsai
		
        if (!EntityForm.validate()) {
            return;
        }
        var data = EntityForm.getData();
        data.U_ApplyForm = form.getFieldText("U_ApplyForm");
        console.log(data);

        //判斷是否是傳真 hsin 
        if (form.getFieldValue("U_ApplyWay") == 1) {

            //抓系統參數 傳真設定
            //var ret = Utility.syncInvoke("TBB.m1211CA.getFaxSetting", null);
            //var ret = Utility.syncInvoke("TBB.UYearsbillmonth.getFaxSetting", null);
            Utility.invoke("TBB.UYearsbillmonth.getFaxSetting", {},
            true,
            function(faxRet) {
                var faxUrl = "";
                var faxTel = "";
                if (faxRet.faxUrl && faxRet.faxTel) {
                    faxUrl = faxRet.faxUrl;
                    faxTel = faxRet.faxTel;
                }

                var today = new Date();
                var F_DTime = form.getFieldValue("F_DTime");
                //var FaxName = F_DTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "_" + form.getFieldValue("U_Fax");
                var saveargs = {
                    "data": [{
                        //FaxFrom: "ECP_" + FaxName,
                        FaxFrom: form.getFieldValue("U_RealFaxName"),//20220406 add by chainsea\Emily.Tsai
                        FaxTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
                        //FaxTel:faxTel, //抓系統參數
                        //Ani:form.getFieldValue("U_Fax"),
                        FaxTel: form.getFieldValue("U_Fax"),
                        Ani: faxTel,
                        //抓系統參數
                        FaxName: form.getFieldText("U_ApplyForm").substr(0, 2) + ".TIF",
                        CreateTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
                        FaxResult: "0",
                    }]
                };
                console.log(saveargs);
                //寫紀錄到傳真單元
                Utility.invoke("TBB.UFaxLog.save.data", saveargs, true,
                function(ret) {
                    console.log(ret);
                    //查序號
                    Utility.invoke("TBB.UFaxLog.getListData.data", {
                        pageSize: -1,
                        conditions: [{
                            fieldName: "FId",
                            operator: "Equal",
                            value: ret.entityIds[0]
                        }]
                    },
                    true,
                    function(rets) {
                        console.log(rets.data.records[0].Seq);
                        var seq = rets.data.records[0].Seq;
                        //組傳真檔案名稱 要確認client端能不能發webap
                        var file = form.getFieldText("U_ApplyForm").substr(0, 2) + ".TIF"; //申請表單
                        var fax = form.getFieldValue("U_Fax"); //傳真號碼
                        var url = faxUrl + 'Data1=' + file + '&Data2=' + fax + '&Data3=' + seq; //抓系統參數
                        console.log("faxurl" + url);
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == XMLHttpRequest.DONE) {
                                console.log(xhr.responseText);
                                console.log("fax web finished");

                                var F_DTime = form.getFieldValue("F_DTime");
                                var FaxName = F_DTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "_" + form.getFieldValue("U_Fax");
                                data.U_FaxRecord = "ECP_" + FaxName;
                                var args = {
                                    data: [data]
                                };
                                Utility.invoke(clientData.unitCode + '.doSave', args, true,
                                function(ret) {
                                    var entityIds = ret.entityIds;
                                    EntityForm.addDialogResultEntityId(entityIds);
                                    EntityForm.clearModificationFlag();
                                    EntityForm.reload(entityIds);
                                    Jui.message.hint($text('Public.SaveSuccess'));
                                });
                            }
                        }
                        xhr.open('GET', url, true);
                        xhr.send(null);
                    });
                });

            });

        } else {
            var F_DTime = form.getFieldValue("F_DTime");
            var FaxName = F_DTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "_" + form.getFieldValue("U_Fax");
            data.U_FaxRecord = "ECP_" + FaxName;
            var args = {
                data: [data]
            };
            Utility.invoke(clientData.unitCode + '.doSave', args, true,
            function(ret) {
                var entityIds = ret.entityIds;
                EntityForm.addDialogResultEntityId(entityIds);
                EntityForm.clearModificationFlag();
                EntityForm.reload(entityIds);
                Jui.message.hint($text('Public.SaveSuccess'));
            });
        }
    }
};

//格式化時間 hsin
Date.prototype.format = function(format)
{
    var me = this;
    if (format == null) {
        format = "yyyy-MM-dd HH:mm:ss";
    }
    var y = me.getFullYear();
    var m = me.getMonth() + 1;
    var d = me.getDate();
    var h = me.getHours();
    var n = me.getMinutes();
    var s = me.getSeconds();
    var w = me.getDay();
    var f = me.getMilliseconds();
    return format.replace("yyyy", y).replace("yy", y % 100 < 10 ? "0" + y % 100 : y % 100)
                 .replace("MM", m < 10 ? "0" + m : m).replace("M", m)
                 .replace("dd", d < 10 ? "0" + d : d).replace("d", d)
                 .replace("HH", h < 10 ? "0" + h : h).replace("H", h)
                 .replace("mm", n < 10 ? "0" + n : n).replace("m", n)
                 .replace("ss", s < 10 ? "0" + s : s).replace("s", s)
                 .replace("fff", f < 10 ? "00" + f : ( f < 100 ? '0' + f : f)).replace("ff", f < 10 ? "0" + f : f).replace("f", f)
                 .replace("ww", Jui.util.getWeekDayName(w, false)).replace("w", Jui.util.getWeekDayName(w, true));
};