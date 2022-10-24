/********************************************************************************
	 通話紀錄 表單
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.30
	 * LastUpdateUser: 	gemfor\Lillian 
	 * LastUpdateDate: 	2021.06.30
	 * Note: 
*********************************************************************************/
var CallLogForm = {
		doLoad : function(){
			CallLogEdit.doLoad();
			
			if(form.getFieldValue("FObjectId") != "" && form.getFieldValue("FObjectId") != null && form.getFieldValue("U_CustomId") == null){
				var CustID = CommonBusiness.getFieldValue("Ecp.Contact", form.getFieldValue("FObjectId"), "U_CustID");
				form.setFieldValue("U_CustomId", CustID);		//帶入主檔身分證字號
			}
		}
}