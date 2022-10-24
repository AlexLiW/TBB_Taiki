/*******************************************************************************
 * Author: chainsea\hsin.lin; 
 * CreateDate: 2021/07/01
 * Description:傳送傳真 Cti.SipxFaxOutBox
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin; 
 * LastUpdateDate: 2021/07/01 
 * Note:
 ******************************************************************************/
var SipxFaxForm = {
    doLoad: function() {
        F_Fax = clientData.urlArgs.F_Fax;
        if (!Jui.string.isEmpty(F_Fax)) {
            form.getControl("FTargetTelNum")._input.value = F_Fax;
        }
    },

}
Jui.event.attach(window, 'load', SipxFaxForm.doLoad);