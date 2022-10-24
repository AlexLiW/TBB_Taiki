/*******************************************************************************
 * Author: chainsea\hsin.lin; CreateDate: 2021/06/07
 * Description:信用卡/一卡通/聯名卡停卡申請單 TBB.stopcardapply
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin; LastUpdateDate: 2021/06/07 Note:
 ******************************************************************************/
var stopcardapplyForm = {
	sessionId : null,
	agentId : null,
	ACNO : null,
	UID : "",
	doLoad : function() {
		ACNO = clientData.urlArgs.U_ACN;
		if (!Jui.string.isEmpty(ACNO)) {
			form.setFieldValue("U_ACNO", ACNO);
		}
		stopcardapplyForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		stopcardapplyForm.agentId = CommonBusiness.getFieldValue("Qs.User",
				userId, "FLoginName");
		form.getControl("U_CardAttribute").onchange = stopcardapplyForm.doChange;
		form.setFieldVisible("U_Other", false);// 2021.09.10-gemfor/Emily-停卡原因其他選項
		form.getControl("U_StopCard").onchange = stopcardapplyForm.doOther;// 2021.09.10-gemfor/Emily-停卡原因其他選項
	},

	// 連動欄位 hsin
	doChange : function() {
		var cardType = form.getFieldValue("U_CardAttribute");
		if (cardType == 1 || cardType == 2) {
			form.setFieldRequired("U_eCardNo", true);
			form.setFieldRequired("U_CardStop", true); // 2021.09.09-gemfor/Emily-電子票證已退卡欄位改為必填
			form.setFieldRequired("U_Return", true); // 2021.09.09-gemfor/Emily-說明卡片已收回欄位改為必填
			form.setFieldDisabled("U_eCardNo", false);
		} else {
			form.setFieldRequired("U_eCardNo", false);
			form.setFieldRequired("U_CardStop", false);
			form.setFieldRequired("U_Return", false);
			form.setFieldDisabled("U_eCardNo", true);
			form.setFieldValue("U_eCardNo", null);
		}

	},

	// 停卡原因其他選項 2021.09.10-gemfor/Emily
	doOther : function() {
		var stopCard = form.getFieldValue("U_StopCard");
		if (stopCard == 7) {
			form.setFieldVisible("U_Other", true);
		} else {
			form.setFieldVisible("U_Other", false);
			form.setFieldValue("U_Other", null);
		}
	},
	// 二線同意後產出流水編號-20220323-gemfor/Emma
	doOpenAgreeDialog : function(event) {
		var ss = form.getFieldValue("U_StopCard");
		if (ss == '') {
			Jui.message.alert("停卡原因還未填寫並保存");
		} else {
			var page = {
				"dialogWidth" : 500,
				"icon" : "quicksilver/image/unit/WorkItem.png",
				"title" : "工作項",
				"dialogHeight" : 226,
				"code" : "Wf.WorkItem.Submit",
				"dialogMaximized" : false
			};
			var args = {
				entityEventCode : clientData.toolBarJson.left[0].entityEventCode,
				entityId : clientData.entityId,
				workItemId : clientData.workflow.workItemId,
				result : clientData.toolBarJson.left[0].id,
				resultText : clientData.toolBarJson.left[0].text,
				noComment : '',
				isSubmit : true,
				enableAllFields : true,
				addConfirmButton : true
			};
			Utility.openDialog(page.code + ".page", args,
					CommonBusiness.defaultDialogOptions.form, function() {
						Jui.message.hint($text("Public.OperationSuccess"));
						var arg = {
							fTableName : "TpTBBstopcardapply",
							fId : form.getFieldValue("FId"),
							fSerialNo : "F_IDNumber"
						}
						Utility.syncInvoke("TBB.UGetForms.setSerialNo", arg,
								function(ret) {
								});
						EntityForm._closeOrReload();
					});
		}


	},

}
Jui.event.attach(window, 'load', stopcardapplyForm.doLoad);