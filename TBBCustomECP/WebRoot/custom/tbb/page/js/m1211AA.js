var m1211AA = {
	doLoad : function() {
		m1211AA.doIsNew();
		m1211AA.setF_WTime();
		m1211AA.setOnchange();
		m1211AA.getStatus();
		m1211AA.setRequire();
		// 20160926_新增身分證字號由聯絡人表單自動帶入
		m1211AA.getInfo();
		if (clientData.entityId != null) {
			m1211AA.addServiceTrack();
		}
	},

	getInfo : function() {
		var args = clientData.urlArgs;
		console.log(args.hasOwnProperty("U_CustID"));

		if (args.hasOwnProperty("U_CustID")) {
			form.setFieldValue("F_Identify", args.U_CustID); // 客戶身分證號
		}
	},
	doOpenAgreeDialog : function(event) {
		var ApplyState = form.getFieldValue("F_ApplyState");
		if (ApplyState == null) {
			Jui.message.alert("處理結果還未填寫並保存");
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
							fTableName : "TBBm1211A",
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
	setFStatus : function() {
		var FId = form.getFieldValue("FId");
		if (FId == null) {
			statu = "New";
		} else {
			statu = CommonBusiness.getFieldValue("TBB.m1211AA", FId, "FStatus");
		}
		return statu;
	},
	// 申請狀態
	setF_ApplyStateEnable : function() {
		m1211AA.setFStatus();
		if (statu == "Audit") {
			var name = clientData.workflow.listJson.data[0].FParticipantName;
			var name_Array = name.split("|");
			console.log(name_Array.length);
			for (var i = 0; i < name_Array.length; i++) {
				console.log(name_Array[i]);
				if ((CommonBusiness.getCurrentUser().userName == name_Array[i])
						|| (CommonBusiness.getCurrentUser().userId == '00000000-0000-0000-1002-000000000001')) {
					toolBar.setItemDisabled("Save", false);
					form.setFieldDisabled("F_ApplyState", false);
					break;
				} else {
					toolBar.setItemDisabled("Save", true);
				}
			}

		}
	},

	// 判斷表單是否為新建的情况
	doIsNew : function() {
		// form.setFieldVisible("FStatus",false);
		form.setFieldVisible("F_Info", false);
		form.setFieldVisible("F_Informa", false);

		form.setFieldVisible("F_Address", false);
		form.setFieldVisible("F_Address1", false);
		form.setFieldVisible("F_Email2", false);
		form.setFieldVisible("F_RegisterAddress", false);
		form.setFieldVisible("F_LiveAddress", false);
		form.setFieldVisible("F_CompanyAddress", false);
		form.setFieldVisible("F_Email", false);

		form.setFieldVisible("F_Address2", false);
		form.setFieldVisible("F_Address11", false);
		form.setFieldVisible("F_RegisterAddress1", false);
		form.setFieldVisible("F_LiveAddress1", false);
		form.setFieldVisible("F_CompanyAddress1", false);
		form.setFieldVisible("F_Email1", false);

		// toolBar.getItem("unClose").setDisabled(true);
		arrayDisabled = [];
		if (Jui.string.isEmpty(clientData.entityId)) {
			toolBar.getItem("Print").setVisible(false);
			toolBar.getItem("newPrint").setVisible(false); // 20210615 add by gemfor\Tiffany
		} else {
			m1211AA.setF_ApplyStateEnable();
			m1211AA.setF_SendAddress();
			m1211AA.setF_Address1();
			for (var i = 0; i < clientData.editJson.title.length; i++) {
				arrayDisabled[i] = form
						.isFieldDisabled(clientData.editJson.title[i].name);
			}
			m1211AA.changeFStatus();
		}
		m1211AA.setSatisfyEnable();
	},
	// 設置滿意度的可用性
	setSatisfyEnable : function() {
		form.setFieldVisible("F_Satisfy", false);
		m1211AA.setFStatus();
		console.log(statu);
		if (statu == "End") {
			form.setFieldVisible("F_Satisfy", true);
			toolBar.setItemDisabled("Save", false);

		} else if (statu == "Finish") {
			form.setFieldVisible("F_Satisfy", true);
			toolBar.setItemDisabled("Save", true);
		}
	},
	// 判斷關閉、反關閉按钮的可用性
	onClick : function() {
		var FStatus = null;
		m1211AA.setFStatus();
		if (statu == "Finish") {
			FStatus = "unClose";
		} else if (statu == "unClose") {
			FStatus = "Finish";
		} else if (statu == "End" || statu == "END1") {
			FStatus = "Finish";
		}
		var table = clientData.unitCode, table_Arr = [];
		table = table.substring("table", 10);
		table_Arr = table.split(".");
		table = table_Arr[0] + table_Arr[1];

		var args = {
			table : table,
			FStatus : FStatus,
			FId : clientData.entityId
		};
		console.log(args);
		Utility.invoke("TBB.m12111ADelay.updateFStatus", args, true, function(
				ret) {
			if (ret.json == 1) {
				location.reload();
				m1211AA.changeFStatus();
			} else {
				Jui.message.alert("執行關閉失敗");
			}

		});

	},
	changeFStatus : function() {
		m1211AA.setFStatus();
		if (statu == "Finish") {
			console.log(clientData.editJson.title.length);
			for (var i = 0; i < clientData.editJson.title.length; i++) {
				form.setFieldDisabled(clientData.editJson.title[i].name, true);
			}
			toolBar.getItem("unClose").setDisabled(false);
			toolBar.getItem("Finish").setDisabled(true);
			toolBar.getItem("Save").setDisabled(true);
			toolBar.getItem("Submit").setDisabled(true);
			toolBar.getItem("Deal").setDisabled(true);
		} else if (statu == "unClose") {

			for (var i = 0; i < clientData.editJson.title.length; i++) {

				form.setFieldDisabled(clientData.editJson.title[i].name,
						arrayDisabled[i]);
			}
			toolBar.getItem("unClose").setDisabled(true);
			toolBar.getItem("Finish").setDisabled(false);
			toolBar.getItem("Save").setDisabled(false);
			toolBar.getItem("Submit").setDisabled(false);
			toolBar.getItem("Deal").setDisabled(false);
		}
	},
	setOnchange : function() {
		form.getControl("F_SendAddress").onchange = m1211AA.setF_SendAddress;
		form.getControl("F_Address1").onchange = m1211AA.setF_Address1;
		form.getControl("U_CardLinkWay").onchange = m1211AA.setStatus; // 20160929_新增變更方式狀態
		form.getControl("F_UpDataDate").onchange = m1211AA.setRequire;
	},
	setStatus : function() // 20160929_新增狀態轉換
	{
		var way = form.getFieldValue("U_CardLinkWay");
		if (way == 0) // 正常
		{
			form.setFieldRequired("F_MobilePhone", false);
			form.setFieldRequired("F_HomePhone", false);
			form.setFieldRequired("F_CompanyPhone", false);
			form.setFieldRequired("F_SendWay", false);
		} else if (way == 1) // 例外
		{
			form.setFieldRequired("F_MobilePhone", false);
			form.setFieldRequired("F_HomePhone", false);
			form.setFieldRequired("F_CompanyPhone", false);
			form.setFieldRequired("F_SendWay", false);
		}
	},
	setRequire : function() {
		var F_UpDataDate = form.getFieldValue("F_UpDataDate");
		if (F_UpDataDate != null) {
			form.setFieldVisible("U_Check", true);
		} else {
			form.setFieldVisible("U_Check", false);
		}
	},
	setF_SendAddress : function() {
		// console.log(form.getControl('F_SendAddress').getAttribute());
		// 若客戶身分選擇「網銀客戶」，則此欄位不需填寫(唯讀)
		var F_SendAddress = form.getFieldValue("F_SendAddress");
		if (F_SendAddress == 0) {
			form.setFieldVisible("F_Address1", true);
			form.setFieldVisible("F_Address2", false);
			form.setFieldValue("F_Address2", null);
			form.setFieldVisible("F_Address11", false);
			form.setFieldValue("F_Address11", null);
			form.setFieldVisible("F_RegisterAddress1", false);
			form.setFieldValue("F_RegisterAddress1", null);
			form.setFieldVisible("F_LiveAddress1", false);
			form.setFieldValue("F_LiveAddress1", null);
			form.setFieldVisible("F_CompanyAddress1", false);
			form.setFieldValue("F_CompanyAddress1", null);
			form.setFieldVisible("F_Email1", false);
			form.setFieldValue("F_Email1", null);
			form.setFieldRequired("F_Number", false); // 20170303 add by chainsea\alex.liwu
		} else if (F_SendAddress == 1) {
			form.setFieldVisible("F_Address2", true);
			form.setFieldVisible("F_Address11", true);
			form.setFieldVisible("F_RegisterAddress1", true);
			form.setFieldVisible("F_LiveAddress1", true);
			form.setFieldVisible("F_CompanyAddress1", true);
			form.setFieldVisible("F_Email1", true);

			form.setFieldVisible("F_Address1", false);
			form.setFieldValue("F_Address1", null);
			form.setFieldVisible("F_RegisterAddress", false);
			form.setFieldValue("F_RegisterAddress", null);
			form.setFieldVisible("F_LiveAddress", false);
			form.setFieldValue("F_LiveAddress", null);
			form.setFieldVisible("F_CompanyAddress", false);
			form.setFieldValue("F_CompanyAddress", null);
			form.setFieldVisible("F_Email2", false);
			form.setFieldValue("F_Email2", null);

			form.setFieldValue("F_Address1", null);
			form.setFieldRequired("F_Number", false); // 20170303 add by chainsea\alex.liwu

		} else if (F_SendAddress == null) {
			form.setFieldVisible("F_Address1", false);
			form.setFieldVisible("F_RegisterAddress", false);
			form.setFieldVisible("F_LiveAddress", false);
			form.setFieldVisible("F_CompanyAddress", false);
			form.setFieldVisible("F_Email2", false);

			form.setFieldVisible("F_Address2", false);
			form.setFieldVisible("F_Address11", false);
			form.setFieldVisible("F_RegisterAddress1", false);
			form.setFieldVisible("F_LiveAddress1", false);
			form.setFieldVisible("F_CompanyAddress1", false);
			form.setFieldVisible("F_Email1", false);
			form.setFieldValue("F_Address1", null);
			form.setFieldRequired("F_Number", false); // 20170303 add by chainsea\alex.liwu
		} else {
			form.setFieldVisible("F_Address", true);
			form.setFieldVisible("F_Address1", true);
			form.setFieldVisible("F_Email", true);
			form.setFieldVisible("F_Address2", true);
			form.setFieldVisible("F_Address11", true);
			form.setFieldVisible("F_RegisterAddress1", true);
			form.setFieldVisible("F_LiveAddress1", true);
			form.setFieldVisible("F_CompanyAddress1", true);
			form.setFieldVisible("F_Email1", true);
			// form.setFieldVisible("F_Email2",true);
		}
	},
	setF_Address1 : function() {
		form.setFieldVisible("F_RegisterAddress", false);
		form.setFieldVisible("F_LiveAddress", false);
		form.setFieldVisible("F_CompanyAddress", false);
		form.setFieldVisible("F_Email2", false);
		form.setFieldRequired("F_Number", false); // 20170303 add by chainsea\alex.liwu
		var Address1 = form.getFieldValue("F_Address1");
		console.log("wetwrtwt" + Address1);
		if (Address1 == 0) {
			form.setFieldVisible("F_RegisterAddress", true);
			form.setFieldRequired("F_RegisterAddress", true);
			form.setFieldValue("F_LiveAddress", null);
			form.setFieldValue("F_CompanyAddress", null);
			form.setFieldValue("F_Email2", null);
			form.setFieldRequired("F_Number", true); // 20170303 add by chainsea\alex.liwu
		} else if (Address1 == 1) {
			form.setFieldVisible("F_LiveAddress", true);
			form.setFieldRequired("F_LiveAddress", true);
			form.setFieldValue("F_RegisterAddress", null);
			form.setFieldValue("F_CompanyAddress", null);
			form.setFieldValue("F_Email2", null);
			form.setFieldRequired("F_Number", true); // 20170303 add by chainsea\alex.liwu
		} else if (Address1 == 2) {
			form.setFieldVisible("F_CompanyAddress", true);
			form.setFieldRequired("F_CompanyAddress", true);
			form.setFieldValue("F_RegisterAddress", null);
			form.setFieldValue("F_LiveAddress", null);
			form.setFieldValue("F_Email2", null);
			form.setFieldRequired("F_Number", true); // 20170303 add by chainsea\alex.liwu
		} else if (Address1 == 3) {
			form.setFieldVisible("F_Email2", true);
			form.setFieldValue("F_RegisterAddress", null);
			form.setFieldValue("F_LiveAddress", null);
			form.setFieldValue("F_CompanyAddress", null);
			form.setFieldRequired("F_Number", false); // 20170303 add by chainsea\alex.liwu
		}
	},

	// 延時申請
	doDeal : function() {
		if (!form.validate()) {
			return;
		}
		var FUserId = CommonBusiness.getCurrentUser().userId;// 處理人員
		var F_Customer = CommonBusiness.getFieldValue('Qs.User', FUserId,
				'FName');
		var F_WTime = form.getFieldValue("F_EndTime");// 預計完成時間
		var FId = form.getFieldValue("FId");// FId
		var args = {
			YTime : F_WTime,
			Dealer : FUserId,
			FId : FId
		};
		Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(
				ret) {
			form.setFieldValue("F_EndTime", ret.time);
			EntityForm.doSave();
		});
	},

	// 設置預計完成時間
	setF_WTime : function() {
		var day = (new Date().getDay()) + 1;
		if (day == 7) {
			day = 0;
		}
		var time = new Date().getTime();
		for (var i = 0, j = 3; i < 3, j > 0; i++) {
			switch (day) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				var day = day + 1;
				var time = time + (1000 * 60 * 60 * 24);
				j--;
				break;
			case 0:
				var day = day + 1;
				var time = time + (1000 * 60 * 60 * 24);
				break;
			case 6:
				var day = 6 - day;
				var time = time + (1000 * 60 * 60 * 24);
				break;
			}
		}
		var ETime = new Date(time);
		// var day = new Date(new Date().getTime() + 5*(1000*60*60*24));
		if (form.getFieldValue("F_EndTime") == null) {
			form.setFieldValue("F_EndTime", ETime);
		}
	},
	getStatus : function() {
		var status = form.getFieldValue("FStatus");
		if (status == "AgentSign1") {
			// toolBar.setItemDisabled("InfoCustData",false);
			form.setFieldDisabled("F_Identify", true);
		}

		if (status == "End") {
			toolBar.getItem("Save").setDisabled(true);
		}
	},

	doOpen : function(type) { // 20210611 adjust by gemfor\Tiffany
		var F_Identify = form.getFieldValue("F_Identify");// 身份證號碼統一編碼
		var F_CardKind = form.getFieldValue("F_CardKind");// 卡種
		var F_Time = form.getFieldValue("F_Time");// 日期時間
		var F_AppendName = form.getFieldValue("F_AppendName");// 持卡人姓名
		var F_CreditCardNo = form.getFieldValue("F_CreditCardNo");// 持卡人卡號
		var F_Branch = form.getFieldValue("F_Branch");// 往來分行
		var F_PMCard = form.getFieldValue("F_PMCard");// 正/附卡
		var U_CaseType = form.getFieldValue("U_CaseType");// 案件類型
		var F_HomePhone = form.getFieldValue("F_HomePhone");// 住家電話
		var F_CompanyPhone = form.getFieldValue("F_CompanyPhone");// 公司電話
		var F_MobilePhone = form.getFieldValue("F_MobilePhone");// 手機
		var F_CompangyName = form.getFieldValue("F_CompangyName");// 公司名稱
		var F_Duty = form.getFieldValue("F_Duty");// 職稱
		var F_SendWay = form.getFieldValue("F_SendWay");// 帳單寄送方式
		var F_Address = form.getFieldValue("F_Address");// 寄送地址
		var F_Address1 = form.getFieldValue("F_Address1");// 地址類別
		var F_SendAddress = form.getFieldValue("F_SendAddress");// 寄送地址
		var F_RegisterAddress = form.getFieldValue("F_RegisterAddress");// 戶籍地址
		var F_LiveAddress = form.getFieldValue("F_LiveAddress");// 居住地址
		var F_CompanyAddress = form.getFieldValue("F_CompanyAddress");// 公司地址
		var F_UpDataDate = form.getFieldValue("F_UpDataDate");// 變更結帳日
		var F_Email = form.getFieldValue("F_Email");// EMAIL
		var F_Other = form.getFieldValue("F_Other");// 其他
		var FUserId = form.getFieldText("FUserId");// 客服人員
		var F_DepartmentId = form.getFieldText("F_DepartmentId");// 處理部門

		var F_Address2 = form.getFieldValue("F_Address2");// 帳單寄送地址
		var F_Address11 = form.getFieldValue("F_Address11");// 地址類別
		var F_LiveAddress1 = form.getFieldValue("F_LiveAddress1");// 居住地址
		var F_CompanyAddress1 = form.getFieldValue("F_CompanyAddress1");// 公司地址
		var F_Email1 = form.getFieldValue("F_Email1");// EMAIL
		var F_RegisterAddress1 = form.getFieldValue("F_RegisterAddress1");// 戶籍地址
		var F_Email2 = form.getFieldValue("F_Email2");// email地址
		var F_IdentityNo = form.getFieldValue("F_IdentityNo");// 附卡人身分證號
		var F_Number = form.getFieldValue("F_Number");// 郵遞區號
		var U_Check = form.getFieldValue("U_Check");// 確認
		console.log(U_Check);

		var args = {
			F_Identify : F_Identify,
			F_CardKind : F_CardKind,
			F_Time : F_Time,
			F_AppendName : F_AppendName,
			F_CreditCardNo : F_CreditCardNo,
			F_Branch : F_Branch,
			F_PMCard : F_PMCard,
			U_CaseType : U_CaseType,
			F_HomePhone : F_HomePhone,
			F_CompanyPhone : F_CompanyPhone,
			F_MobilePhone : F_MobilePhone,
			F_CompangyName : F_CompangyName,
			F_Duty : F_Duty,
			F_Address : F_Address,
			F_SendWay : F_SendWay,
			F_Address : F_Address,
			F_Address1 : F_Address1,
			F_SendAddress : F_SendAddress,
			F_RegisterAddress : F_RegisterAddress,
			F_LiveAddress : F_LiveAddress,
			F_CompanyAddress : F_CompanyAddress,
			F_UpDataDate : F_UpDataDate,
			F_Email : F_Email,
			F_Other : F_Other,
			FUserId : FUserId,
			F_DepartmentId : F_DepartmentId,
			F_Address2 : F_Address2,
			F_Address11 : F_Address11,
			F_LiveAddress1 : F_LiveAddress1,
			F_CompanyAddress1 : F_CompanyAddress1,
			F_Email1 : F_Email1,
			F_RegisterAddress1 : F_RegisterAddress1,
			F_Email2 : F_Email2,
			F_IdentityNo : F_IdentityNo,
			F_Number : F_Number,
			U_Check : U_Check
		}
		
		var pageCode = "";
		if ("old" == type) {
			pageCode = "TBB.m1211AA.Report.page";
		} else if ("new" == type) {
			pageCode = "TBB.m1211AA.Report2.page";
		}
		// Utility.openDialog("TBB.m1211AA.Report.page", args);
		Utility.openDialog(pageCode, args);
	},
	addServiceTrack : function() {
		var args = {
			typeCode : clientData.unitId,
			typeName : clientData.unitName,
			objectId : clientData.entityId,
			objectName : form.getFieldValue("F_Identify")
		};
		Jui.window.getTop().CtiMainFrame.ctiAddServiceTrack(args);
	},
	ToCDB : function() {
		var str = form.getFieldValue('F_Number');
		if (str == null) {
			str = '';
		}
		var tmp = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
				tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
			} else {
				tmp += String.fromCharCode(str.charCodeAt(i));
			}
		}
		form.setFieldValue('F_Number', tmp);
	}

};

EntityForm.doSubmit = function() {
	var F_AppendName = form.getFieldValue("F_AppendName");
	var F_CreditCardNo = form.getFieldValue("F_CreditCardNo");
	var F_Branch = form.getFieldValue("F_Branch");
	if (F_AppendName == null || F_CreditCardNo == null || F_Branch == null) {
		Jui.message.alert("持卡人姓名，持卡人卡號，往來分行不能为空");
	} else {
		m1211AA.ToCDB();
		EntityForm.$doSubmit();
	}

};
EntityForm.doSave = function() {
	m1211AA.ToCDB();
	EntityForm.$doSave();
};
