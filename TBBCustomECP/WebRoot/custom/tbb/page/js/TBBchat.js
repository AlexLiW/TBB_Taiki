	var TBBchat ={
		doLoad : function()
		{
			form.setFieldVisible("FName",false);
			var userId = CommonBusiness.getCurrentUser().userId; //取得當前用戶ID
			var userName = CommonBusiness.getCurrentUser().userName; //取得當前用戶名稱
			var QueryFilter = {
                fieldNames: ["FLoginName"], //設定要回傳的欄位(參數值)
                conditions: [{
                    fieldName: "FId", //設定條件欄位
                    operator: "Equal", //設定條件 Equql為等於
                    value: userId //設定條件值
                }]
            };
            Utility.invoke("Qs.User.getListData", QueryFilter, true, function(ret) {
				var ChatUrl = 'https://10.16.22.179:80/index.php';
                if (ret.data.records.length <= 0) //判斷回傳筆數<=0
                {
                    console.log(ret.data);
                    console.log("Search Fail. FLoginName is not exists. ");
					setTimeout(function() {
						window.open(ChatUrl, '智能客服系統');
						Utility.closeTab();
					}, 1 * 200);
                } else {
                    console.log(ret.data.records);
                    console.log("Search FLoginName Complet. ");
					var getFLoginName = ret.data.records[0].FLoginName;
					ChatUrl += '?id=' + getFLoginName;
					setTimeout(function() {
						window.open(ChatUrl, '智能客服系統');
						Utility.closeTab();
					}, 1 * 200);
				}
		});
	}
}