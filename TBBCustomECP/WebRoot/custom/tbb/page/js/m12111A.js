var m12111A = {
	doLoad : function() {

		m12111A.doIsNew();
		m12111A.setOnchange();
		m12111A.setF_WTime();
		m12111A.setF_WTime();
		form.setFieldRequired("F_Function1", true);

		// 20160926_新增身分證字號由聯絡人表單自動帶入
		m12111A.getInfo();
		m12111A.getStatus();
		if (clientData.entityId != null) {
			m12111A.addServiceTrack();
		}
	},

	getInfo : function() {
		var args = clientData.urlArgs;
		console.log(args.hasOwnProperty("U_CustID"));

		if (args.hasOwnProperty("U_CustID")) {
			form.setFieldValue("F_Identify", args.U_CustID); // 客戶身分證號
		}
	},
	setFStatus : function() {
		var FId = form.getFieldValue("FId");
		if (FId == null) {
			statu = "New";
		} else {
			statu = CommonBusiness.getFieldValue("TBB.m12111A", FId, "FStatus");
		}
		return statu;
	},
	// 判斷表單是否為新建的情况
	doIsNew : function() {
		// form.setFieldVisible("FStatus",false);
		form.setFieldVisible("F_Info", false);
		form.setFieldVisible("F_Informa", false);
		form.setFieldDisabled("F_Address", true);

		// toolBar.getItem("unClose").setDisabled(true);
		arrayDisabled = [];

		if (Jui.string.isEmpty(clientData.entityId)) {
			toolBar.getItem("Print").setVisible(false);
			toolBar.getItem("newPrint").setVisible(false); // 20210604 add by gemfor\Tiffany
		} else {

			m12111A.setF_CypherRequire();
			for (var i = 0; i < clientData.editJson.title.length; i++) {

				arrayDisabled[i] = form
						.isFieldDisabled(clientData.editJson.title[i].name);
			}
			m12111A.changeFStatus();

		}
		m12111A.setSatisfyEnable();
	},
	// 設置滿意度的可用性
	setSatisfyEnable : function() {
		form.setFieldVisible("F_Satisfy", false);
		m12111A.setFStatus();
		if (statu == "End") {
			form.setFieldVisible("F_Satisfy", true);
			//toolBar.setItemDisabled("Save", false); // 20210908 adjust by gemfor\Tiffany

		} else if (statu == "Finish") {
			form.setFieldVisible("F_Satisfy", true);
			toolBar.setItemDisabled("Save", true);
		}
	},
	// 判斷關閉、反關閉按鈕的可用性
	onClick : function() {
		var FStatus = null;
		m12111A.setFStatus();
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
				m12111A.changeFStatus();
			} else {
				Jui.message.alert("執行關閉失敗");
			}

		});

	},
	changeFStatus : function() {
		m12111A.setFStatus();
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
		form.getControl("F_Cypher").onchange = m12111A.setF_CypherRequire;
		form.getControl("F_Way").onchange = m12111A.setF_WayRequire;
		// form.getControl("F_Way").onchange=m12111A.setF_WayRequire;
		Jui.event.attach(form.getControl("F_Identify"), "onchange", function() { // 20210531 add by gemfor\Tiffany
			var identify = form.getFieldValue("F_Identify");
			if (!Jui.string.isEmpty(identify)) {
				form.setFieldValue("F_Identify", identify.toLocaleUpperCase());
			}
		});
		Jui.event.attach(form.getControl("F_Item"), "onchange", function() { // 20210908 add by gemfor\Tiffany
			var item = form.getFieldValue("F_Item");
			if ("2" == item) {
				form.setFieldValue("F_Cypher", "1");
			} else if ("3" == item) {
				form.setFieldValue("F_Cypher", "0");
			}
			m12111A.setF_CypherRequire();
		});
	},

	// 延時申請
	doDeal : function() {
		if (!form.validate()) {
			return;
		}
		var F_CustomerId = CommonBusiness.getCurrentUser().userId;// 處理人員
		var F_WTime = form.getFieldValue("F_WTime");// 預計完成時間
		var FId = form.getFieldValue("FId");// FId
		var args = {
			YTime : F_WTime,
			Dealer : F_CustomerId,
			FId : FId
		};
		Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(
				ret) {
			form.setFieldValue("F_WTime", ret.time);
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
				day = day + 1;
				time = time + (1000 * 60 * 60 * 24);
				j--;
				break;
			case 0:
				day = day + 1;
				time = time + (1000 * 60 * 60 * 24);
				break;
			case 6:
				day = 6 - day;
				time = time + (1000 * 60 * 60 * 24);
				break;
			}
		}
		var ETime = new Date(time);
		// var day = new Date(new Date().getTime() + 5*(1000*60*60*24));
		if (form.getFieldValue("F_WTime") == null) {
			form.setFieldValue("F_WTime", ETime);
		}
	},

	// 設置是否申請郵寄密碼函的聯動
	setF_CypherRequire : function() {
		var Cypher = form.getFieldValue("F_Cypher");
		if (Cypher == 0) {
			form.setFieldRequired("F_Way", true);
			form.setFieldDisabled("F_Way", false);
		} else {
			form.setFieldDisabled("F_Way", true);
			form.getControl("F_Way").setValue(null);
		}
		m12111A.setF_WayRequire();
	},
	setF_WayRequire : function() { // 20210908 adjust by gemfor\Tiffany
		var Way = form.getFieldValue("F_Way");
		if (Way == 3) {
			form.setFieldDisabled("F_SendF", false);
			form.setFieldDisabled("F_FenHang", false);
			form.setFieldRequired("F_SendF", true);
			form.setFieldRequired("F_FenHang", true);

			form.setFieldDisabled("F_Address", true);
			// form.setFieldDisabled("F_Remark", true);
			form.getControl("F_Address").setValue(null);
			// form.getControl("F_Remark").setValue(null);
		} else if (Way == 0 || Way == 1) {
			form.setFieldDisabled("F_Address", false);
			form.setFieldRequired("F_Address", true);

			form.setFieldDisabled("F_SendF", true);
			form.setFieldDisabled("F_FenHang", true);
			// form.setFieldDisabled("F_Remark", true);

			// form.getControl("F_Remark").setValue(null);
			form.getControl("F_SendF").setValue(null);
			form.getControl("F_FenHang").setValue(null);

		} else if (Way == 2) {
			form.setFieldDisabled("F_Address", false);
			form.setFieldRequired("F_Address", true);

			// form.setFieldDisabled("F_Remark", false);

			form.setFieldDisabled("F_SendF", true);
			form.setFieldDisabled("F_FenHang", true);
			form.getControl("F_SendF").setValue(null);
			form.getControl("F_FenHang").setValue(null);

		} else {
			form.setFieldDisabled("F_SendF", true);
			form.setFieldDisabled("F_FenHang", true);
			form.setFieldDisabled("F_Address", true);
			// form.setFieldDisabled("F_Remark", true);
			// form.getControl("F_Remark").setValue(null);
			// form.getControl("F_Address").setValue(null);
			form.getControl("F_SendF").setValue(null);
			form.getControl("F_FenHang").setValue(null);
			
			if (form.getFieldValue("F_Cypher") == 1) { // 20210716 add by gemfor\Tiffany
				form.getControl("F_Address").setValue(null);
			}
		}
	},
	setSerialNo : function(event) {
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
						fTableName : "TBBm12111",
						fId : form.getFieldValue("FId"),
						fSerialNo : "F_IDNumber"
					}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo", arg,
							function(ret) {
							});
					EntityForm._closeOrReload();
				});
	},
	getStatus : function() {
		var status = form.getFieldValue("FStatus");
		if (status == "AgentSign1") {
			form.setFieldDisabled("F_Identify", true);
		}

	},

	doOpen : function(type) { // 20210908 adjust by gemfor\Tiffany

		var F_Identify = form.getFieldValue("F_Identify");// 身份證字號/統一編號
		var F_DTime = form.getFieldValue("F_DTime");// 日期時間
		var F_HomePhone = form.getFieldValue("F_HomePhone");// 住家電話
		var F_CompanyPhone = form.getFieldValue("F_CompanyPhone");// 公司電話
		var F_MobilePhone = form.getFieldValue("F_MobilePhone");// 手機
		var F_UserName = form.getFieldValue("F_UserName");// 正卡人姓名
		var F_CardNumber = form.getFieldValue("F_CardNumber");// 正卡卡號
		var F_Branch = form.getFieldValue("F_Branch");// 往來分行
		var F_UserName1 = form.getFieldValue("F_UserName1");// 附卡人姓名
		var F_CardNumber1 = form.getFieldValue("F_CardNumber1");// 附卡卡號
		var U_CaseType = form.getFieldValue("U_CaseType");// 案件類型
		var F_Limits = form.getFieldValue("F_Limits");// 申請範圍
		var F_Function1 = form.getFieldValue("F_Function1");// 已確認正卡持卡人同意開啟預借現金功能
		var F_Item = form.getFieldValue("F_Item");// 申辦項目
		var F_Cypher = form.getFieldValue("F_Cypher");// 是否申請郵寄密碼函
		var F_Way = form.getFieldValue("F_Way");// 寄送方式
		var F_Address = form.getFieldValue("F_Address");// 帳單地址
		var F_SendF = form.getFieldText("F_SendF");// 寄送分行
		var F_FenHang = form.getFieldText("F_FenHang");// 分行名稱
		var F_Repeat = form.getFieldValue("F_Repeat");// 二次以上(含)郵寄密碼函
		var F_CustomerId = form.getFieldText("FUserId");// 客服人員
		var F_DepartmentId = form.getFieldText("F_DepartmentId");// 處理部門
		var U_Memo = form.getFieldText("U_Memo");// 客戶希望送達時間
		var F_Remark = form.getFieldValue("F_Remark");// 備註

		var args = {
			F_Identify : F_Identify,
			F_DTime : F_DTime,
			F_HomePhone : F_HomePhone,
			F_CompanyPhone : F_CompanyPhone,
			F_MobilePhone : F_MobilePhone,
			F_UserName : F_UserName,
			F_CardNumber : F_CardNumber,
			F_CardNumber1 : F_CardNumber1,
			F_Branch : F_Branch,
			F_UserName1 : F_UserName1,
			U_CaseType : U_CaseType,
			F_Limits : F_Limits,
			F_Function1 : F_Function1,
			F_Item : F_Item,
			F_Cypher : F_Cypher,
			F_Way : F_Way,
			F_CustomerId : F_CustomerId,
			F_Repeat : F_Repeat,
			F_DepartmentId : F_DepartmentId,
			F_FenHang : F_FenHang,
			F_Address : F_Address,
			F_SendF : F_SendF,
			U_Memo : U_Memo,
			F_Remark : F_Remark,
		};
		var pageCode = "";
		if ("old" == type) {
			pageCode = "TBB.m12111A.Report.page";
		} else if ("new" == type) {
			pageCode = "TBB.m12111A.Report2.page";
		}
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
};
EntityForm.doSubmit = function() {
	var F_UserName = form.getFieldValue("F_UserName");
	var F_CardNumber = form.getFieldValue("F_CardNumber");
	var F_Branch = form.getFieldValue("F_Branch");
	if (F_UserName == null || F_CardNumber == null || F_Branch == null) {
		Jui.message.alert("正卡姓名，正卡卡號，往來分行不能為空");
	} else {
		EntityForm.$doSubmit();
	}

};
