// 待辦事項
var UTodoForm = {

		/***************************************************************************
		 * Author: gemfor\tiffany.wu; 
		 * CreateDate: 2021/07/01 
		 * Description: 待辦事項
		 * 
		 * input parameters: N/A
		 * 
		 * output parameters: N/A
		 * 
		 * LastUpdateUser: gemfor\tiffany.wu; 
		 * LastUpdateDate: 2021/07/02 
		 * Note:
		 **************************************************************************/
	doLoad : function() {
		UTodoForm.doCheckUserRole();
		form.setFieldVisible("FName", false);
		form.getControl("U_Title").onchange = UTodoForm.setFNameValue;
	},

	doCheckUserRole : function() { // 確認員工是否包含角色(系統管理、臺企銀客服二線)。
		var userId = CommonBusiness.getCurrentUser().userId; //取得當前用戶ID
		if ("entityId" in clientData) {
			userId = form.getFieldValue("FCreateUserId"); // 案件建立者
		}
		var userargs = {
			userId : userId
		};
		var ret_temp = Utility.syncInvoke("Ecp.ChatSupervisor.getUserRole", userargs); // 查詢員工角色名單。
		var data = ret_temp.json; // 將當前用戶角色名單取得陣列參數。
		var result = data.some(function(item, index, array) { // 查詢當前用戶是否包含角色(系統管理、臺企銀客服二線)。
			if (item.FRoleId == "00000000-0000-0000-1004-000000000002" || item.FRoleId == "d1a4bd4e-87d0-4833-a596-5adcdbee4abd") {
				return true;
	        } else return false;
		});
		if (result) {
			form.setFieldVisible("U_CustomUserId", true);
		} else {
			form.setFieldVisible("U_CustomUserId", false);
		}
	},

	setFNameValue : function(){
		if(form.getFieldValue("U_Title")!=null){
				form.setFieldValue("FName", form.getFieldValue("U_Title").toLocaleUpperCase());
			}
	},
};
