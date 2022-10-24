/********************************************************************************
	 通話紀錄 表單(新增時)
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.30
	 * LastUpdateUser: 	gemfor\Lillian 
	 * LastUpdateDate: 	2021.06.30
	 * Note: 
*********************************************************************************/
var CallLogActivityLogForm = {
		doLoad : function(){
			CallLogActivityLogEdit.doLoad();
			
			if(EntityForm.getInfoWindow().clientData.urlArgs.objectId != "" && EntityForm.getInfoWindow().clientData.urlArgs.objectId != null){
				var CustID = CommonBusiness.getFieldValue("Ecp.Contact", EntityForm.getInfoWindow().clientData.urlArgs.objectId, "U_CustID");
				form.setFieldValue("U_CustomId", CustID);		//帶入進線人身分證字號
			}
		},
}