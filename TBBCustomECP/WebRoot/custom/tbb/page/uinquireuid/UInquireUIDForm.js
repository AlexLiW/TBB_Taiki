/********************************************************************************
	 輸入姓名查詢客戶ID
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.24
	 * LastUpdateUser: 	gemfor\Lillian 
	 * LastUpdateDate: 	2021.09.28
	 * Note: 姓名欄位輸入完後自動就代入*字號、提示訊息改跳中間、新增查無資料時要跳的提示訊息
*********************************************************************************/
var UInquireUIDForm = {
		doLoad : function(){
			
			UInquireUIDForm.doChange();
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); //'查詢' 按鈕 與上下間個距離增加
			form.getControl("U_Cname").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'中文姓名' 與上下間個距離增加
			
			form.setFieldTitle("U_Grid", null);							//隱藏網格標題
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				//2021.09.28-gemfor/lillian-提示訊息改跳中間
				let U_Cname = form.getFieldValue("U_Cname");
				if(U_Cname == "" || U_Cname == null){
					Jui.message.alert("請填寫「中文姓名」");
					return;
				}
				UInquireUIDForm.doBSNL();
			};
			
			//2021.09.28-gemfor/lillian-姓名欄位輸入完後自動就代入*字號
			form.getControl("U_Cname").onchange = function() {
				form.setFieldValue("U_Cname", form.getFieldValue("U_Cname") + "*");
			};
		},
		
		doBSNL : function(){
			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			UInquireUIDForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UInquireUIDForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"NAMECH" 		: form.getFieldValue("U_Cname"), 		//虛擬帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "BSNLtbbapi",
				"from" 		: "CSR",
				"sessionId" : UInquireUIDForm.sessionId,
				"agentId" 	: UInquireUIDForm.agentId,
				"formData" 	: data
			});
			
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
				if (ret.isSuccess == true) {
					
					//2021.09.28-gemfor/lillian-新增查無資料時要跳的提示訊息
					let ABEND = ret.form.ABEND;					//電文回應代號
					
					form.setFieldValue("U_ErrorCode", ABEND);			//交易代號
					
					let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10bd9caf0"}).data;
					
					for (let i = 0; i < ABEND_Dic.length; i++) {
						if (ABEND_Dic[i].value == ABEND) {
							form.setFieldValue("U_ErrorMemo", ABEND_Dic[i].text ? ABEND_Dic[i].text : "" );
						}
					}
					
					if(ABEND == "0000"){
						var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
						var formData = ret.form;					//取回傳資料
						var REC_LEN = formData.REC.length; 			//看有幾筆資料
						
						for (var i = 0; i < REC_LEN; i++) {
							if (!Jui.object.isEmpty(formData.REC[i])) {
								var CHNAME = formData.REC[i].CHNAME;
								var IDNUM = formData.REC[i].IDNUM;
								if(!Jui.object.isEmpty(CHNAME.replace(/\s*/g,"")) || !Jui.object.isEmpty(IDNUM.replace(/\s*/g,""))){
									
									var data = {
											"U_Name"	: formData.REC[i].CHNAME,	//姓名
											"U_UID"		: formData.REC[i].IDNUM		//身分證字號
									}
									U_O_Data.push(data);
								}
							}
						}
						form.getControl("U_Grid").setValue(U_O_Data);
					}else{
						Jui.message.alert("查詢無資料！");
						return;
					}	
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			});
		},
}