/********************************************************************************
	 虛擬帳號查詢表單
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.08
	 * LastUpdateUser: 	gemfor\Lillian 
	 * LastUpdateDate: 	2021.09.29 
	 * Note: 提示訊息改跳中間、新增查無資料時要跳的提示訊息
*********************************************************************************/
var VirtualACForm = {
		doLoad : function(){
			VirtualACForm.doChange();
			form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				VirtualACForm.doA005();
			};
		},
		
		//查詢電文
		doA005 : function(){
			var U_OVACN = form.getFieldValue("U_OVACN");
			//2021.09.27-gemfor/lillian-提示訊息改跳中間
			if(U_OVACN == "" || U_OVACN == null){
				Jui.message.alert("請填寫「虛擬帳號」");
				return;
			}
			
			TBBUtil.doClearFields("輸出區", null, null);	//清空查詢結果欄位
			
			var U_OVACN = form.getFieldValue("U_OVACN");

			VirtualACForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			VirtualACForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"VIACN" 		: U_OVACN, 		//虛擬帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "A005tbbapi",
				"from" 		: "CSR",
				"sessionId" : VirtualACForm.sessionId,
				"agentId" 	: VirtualACForm.agentId,
				"formData" 	: data
			});
		
			// 發送電文
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.isSuccess == true) {
					//2021.09.27-gemfor/lillian-新增查無資料時要跳的提示訊息
					let ABEND = ret.form.ABEND;					//電文回應代號
					var ABEND_text = "";
					//2021.09.29-gemfor/lillian-新增回應代碼抓字典項文字
					let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
					for (let i = 0; i < ABEND_Dic.length; i++) {
						if (ABEND_Dic[i].value == ABEND) {
							ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
						}
					}
					
					if(ABEND == "0000" || ABEND == "OKLR"){
						var formData = ret.form;							//取回傳資料
						form.setFieldValue("U_OVACN1", formData.OVACN);		//虛擬帳號
						form.setFieldValue("U_OACNN", formData.OACNN);		//實體帳號
						form.setFieldValue("U_OCODE", formData.OCODE);		//帳戶類型---- 1: 帳號 2: 科目
						form.setFieldValue("U_NAME", formData.NAME);		//客戶中文戶名
					}else{
						Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
						return;
					}
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			});
		},
}