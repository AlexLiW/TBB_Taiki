/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/07/20 
 * Description:基本資料 TBB.UBasicInformation
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin;
 * LastUpdateDate: 2021/07/20 
 * Note:
 ******************************************************************************/
var UBasicInformationForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    doLoad: function() {
        UBasicInformationForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UBasicInformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");

        form.getControl("U_CertificateSuspend1").onchange = UBasicInformationForm.doChange;
        UBasicInformation.doLoad();

    },




    // 帶入客戶資料 改寫成發S102 hsin
    SearchBasicData: function() {
        if (UCustID.doCheck()) {
            form.setFieldValue("U_Result", "");
            form.setFieldValue("U_ResultExplain", ""); 
            var data = {};
            data = {
                "CUSIDN": form.getFieldValue("U_CustID"), // 統一編號
                "USERDATA":""
            };

            var args = JSON.stringify({
                "name": "S102tbbapi",
                "from": "csr",
                "sessionId": UBasicInformationForm.sessionId,
                "agentId": UBasicInformationForm.agentId,
                "formData": data
            });
            console.log(args);
            TBBUtil.doPost(JSON.parse(args), function(ret) {
                console.log(ret);
                if (ret.isSuccess) {
                    var source = ret.form;
                    form.setFieldValue("U_AccountName", source.NAME);//戶名
                    form.setFieldValue("U_Mobile", source.MOBTEL); //手機
                    form.setFieldValue("U_AreaNum", source.ARACOD); //電話區碼
                    form.setFieldValue("U_TelExt", source.TELNUM); //電話
                    form.setFieldValue("U_Address", source.PMTADR); //地址
                    form.setFieldValue("U_AddressMail", source.CTTADR); //地址
                    form.setFieldValue("U_Birth", source.BRTHDY); //生日
                    form.setFieldValue("U_Cnt", source.CNT);//筆數
                    form.setFieldValue("U_ID",form.getFieldValue("U_CustID"));
                     
                    var DataGrid = [];
                    var formData = ret.form;
                    for(var i=0; i<=formData.REC.length-1; i++){               
                        var record={
                            U_gAccountNum : formData.REC[i].ACN,
                            U_gSort : formData.REC[i].TYPE,
                            U_gCardStatus : formData.REC[i].STATUS,
                        };
                        DataGrid.push(record);
                        form.getControl("U_GridCardStatus").setValue(DataGrid);
                    }
                    
                    
                     var MSGCOD = ret.form.ABEND;
                     form.setFieldValue("U_Result", ret.form.ABEND);
                     msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
                     for (var i = 0; i < msgcodDicRet.length; i++) {
                         if (msgcodDicRet[i].value == MSGCOD) {
                             form.setFieldValue("U_ResultExplain", msgcodDicRet[i].text);
                             form.setFieldValue("U_Response", msgcodDicRet[i].text);
                             break;
                         }
                     }

                }
            })

        }else  {return false;}

    },
    

}
Jui.event.attach(window, 'load', UBasicInformationForm.doLoad);