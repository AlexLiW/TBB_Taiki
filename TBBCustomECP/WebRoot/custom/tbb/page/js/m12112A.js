var m12112A = {
	doLoad : function() {
		m12112A.doIsNew();
		m12112A.setOnchange();
		m12112A.setF_WTime();
		m12112A.setF_CustomerIdfiyRequire();

		// 20160926_新增身分證字號由聯絡人表單自動帶入
		m12112A.getInfo();
		m12112A.getStatus();
		m12112A.setU_UnitOther();
		if (clientData.entityId != null) {
			m12112A.addServiceTrack();
		}

		// 20210611 add by gemfor\Tiffany
		m12112A.doDesc2();
	},

	getInfo : function() {
		var args = clientData.urlArgs;
		console.log(args.hasOwnProperty("U_CustID"));

		if (args.hasOwnProperty("U_CustID")) {
			form.setFieldValue("F_Identify", args.U_CustID); // 客戶身分證號
		}
	},
	doOpenAgreeDialog : function(event) {
		var Result = form.getFieldValue("F_Result");
		var Rank = form.getFieldValue("F_Rank");
		var Unit = form.getFieldValue("F_Unit");
		if (Unit == '' || Result == '' || Rank == '') {
			Jui.message.alert("客訴中心處理資訊還未填寫並保存");
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
							fTableName : "TBBm12112",
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
			statu = CommonBusiness.getFieldValue("TBB.m12112A", FId, "FStatus");
		}
		return statu;
	},

	setF_Result : function() {
		m12112A.setFStatus();
		/*
		 * java形式 var userId = CommonBusiness.getCurrentUser().userId;
		 * if((statu!="New" && statu!="AgentSign1")){ var args = { userId :
		 * userId
		 *  };
		 * Utility.invoke("TBB.m12111ADelay.selectRole",args,true,function(ret){
		 * if(ret.select==0){ toolBar.setItemDisabled("Save",true); }else
		 * if(ret.select==1){ if(statu=="Audit"){ console.log("aaaaaaaaa");
		 * form.setFieldDisabled("F_Result",false);
		 * form.setFieldDisabled("F_Rank",false);
		 * form.setFieldDisabled("F_Unit",false); } } });
		 *  }
		 */

		// js形式
		if (statu == "Audit") {
			var name = clientData.workflow.listJson.data[0].FParticipantName;
			var name_Array = name.split("|");

			console.log(name_Array.length);
			for (var i = 0; i < name_Array.length; i++) {
				console.log(name_Array[i]);
				if ((CommonBusiness.getCurrentUser().userName == name_Array[i])
						|| (CommonBusiness.getCurrentUser().userId == '00000000-0000-0000-1002-000000000001')) {
					toolBar.setItemDisabled("Save", false);
					form.setFieldDisabled("F_Result", false);
					form.setFieldDisabled("F_Rank", false);
					form.setFieldDisabled("F_Unit", false);
					form.setFieldDisabled("F_FinishTime", false);
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
		toolBar.getItem("Deal").setVisible(false);
		// toolBar.getItem("unClose").setDisabled(true);
		m12112A.setF_CustomerIdfiyRequire();
		arrayDisabled = [];
		if (Jui.string.isEmpty(clientData.entityId)) {
			toolBar.getItem("Print").setVisible(false);
			toolBar.getItem("newPrint").setVisible(false); // 20210604 add by gemfor\Tiffany
			form.setFieldVisible("U_UnitOther", false);
		} else {
			m12112A.setF_CustomerIdfiyRequire();
			m12112A.setF_Result();
			for (var i = 0; i < clientData.editJson.title.length; i++) {
				arrayDisabled[i] = form
						.isFieldDisabled(clientData.editJson.title[i].name);
			}
			m12112A.changeFStatus();
		}
		m12112A.setSatisfyEnable();
	},

	// 設置滿意度的可用性
	setSatisfyEnable : function() {
		form.setFieldVisible("F_Satisfy", false);
		m12112A.setFStatus();
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
		m12112A.setFStatus();
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
				m12112A.changeFStatus();
			} else {
				Jui.message.alert("執行關閉失敗");
			}

		});

	},
	changeFStatus : function() {
		m12112A.setFStatus();
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
		form.getControl("F_CustomerIdfiy").onchange = m12112A.setF_CustomerIdfiyRequire1;
		form.getControl("F_Unit").onchange = m12112A.setU_UnitOther;
		// 20210601 add by gemfor\Tiffany
		Jui.event.attach(form.getControl("F_Identify"), "onchange", function() {
			var identify = form.getFieldValue("F_Identify");
			if (!Jui.string.isEmpty(identify)) {
				form.setFieldValue("F_Identify", identify.toLocaleUpperCase());
			}
		});
		// 20210611 add by gemfor\Tiffany
		form.getControl("U_CallCenterPhone").onchange = m12112A.doDesc2;
		form.getControl("U_Ext").onchange = m12112A.doDesc2;
		form.getControl("U_Fax").onchange = m12112A.doDesc2;
	},

	// 延時申請
	doDeal : function() {
		if (!form.validate()) {
			return;
		}
		var F_CustomerId = CommonBusiness.getCurrentUser().userId;// 處理人員
		var F_WTime = form.getFieldValue("F_FinishTime");// 預計完成時間
		var FId = form.getFieldValue("FId");// FId
		var args = {
			YTime : F_WTime,
			Dealer : F_CustomerId,
			FId : FId
		};
		Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(
				ret) {
			form.setFieldValue("F_FinishTime", ret.time);
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
		for (var i = 0, j = 5; i < 5, j > 0; i++) {
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
		if (form.getFieldValue("F_FinishTime") == null) {
			form.setFieldValue("F_FinishTime", ETime);
		}
	},

	setF_CustomerIdfiyRequire : function() {
		// 若客戶身分選擇「網銀客戶」，則此欄位不需填寫(唯讀)
		m12112A.setFStatus();
		var Cypher = form.getFieldValue("F_CustomerIdfiy");
		if (statu == 'New') {
			// form.getControl("U_PageStatus").setValue(null);

			if (Cypher == 0) {
				// form.setFieldValue("U_PageCode",'S009');
				form.setFieldVisible("F_CardKind", true);
				form.setFieldDisabled("F_CardKind", false);
				form.setFieldRequired("F_CardKind", true);
				form.setFieldRequired("F_Identify", true);
			} else if (Cypher == 1) {
				// form.setFieldValue("U_PageCode",'S105');
				form.setFieldVisible("F_CardKind", true);
				form.setFieldDisabled("F_CardKind", true);
				form.setFieldRequired("F_Identify", true);
				form.setFieldValue("F_CardKind", null);
			} else if (Cypher == 2) {
				// form.getControl("U_PageCode").setValue(null);
				form.getControl("F_CardKind").setValue(null);
				form.setFieldVisible("F_CardKind", true);
				form.setFieldDisabled("F_CardKind", true); // 20170217 adjust by chainsea\alex.liwu
				form.setFieldRequired("F_CardKind", false); // 20170217 adjust by chainsea\alex.liwu
				form.setFieldValue("F_CardKind", null); // add by chainsea\alex.liwu
				form.setFieldRequired("F_Identify", false);
			}
		}

		// 20170224 add by chainsea\alex.liwu_start
		if (statu == 'Audit') {
			if (Cypher == 1 || Cypher == 2) {
				form.setFieldRequired("F_CardKind", false);
			}
		}
		// 20170224 add by chainsea\alex.liwu_end

		/* form.setFieldDisabled("F_HomePhone", Cypher == 2 ? 0 : 1);
		form.setFieldDisabled("F_CompanyPhone", Cypher == 2 ? 0 : 1);
		form.setFieldDisabled("F_MobilePhone", Cypher == 2 ? 0 : 1); */  // 20210908 adjust by gemfor\Tiffany
		form.setFieldDisabled("F_UserName", Cypher == 2 ? 0 : 1);
		form.setFieldDisabled("F_CardNumber", Cypher == 2 ? 0 : 1);
		// form.setFieldDisabled("F_Branch", Cypher == 2 ? 0 : 1); // 20210923 Tiffany
		form.setFieldDisabled("F_UserName1", Cypher == 2 ? 0 : 1);
		form.setFieldDisabled("F_CardNumber1", Cypher == 2 ? 0 : 1);
		// form.setFieldDisabled("F_Address", Cypher == 2 ? 0 : 1); // 20210923 Tiffany
	},

	setF_CustomerIdfiyRequire1 : function() {
		m12112A.setF_CustomerIdfiyRequire();
		form.getControl("F_HomePhone").setValue(null);
		form.getControl("F_CompanyPhone").setValue(null);
		form.getControl("F_MobilePhone").setValue(null);
		form.getControl("F_UserName").setValue(null);
		form.getControl("F_CardNumber").setValue(null);
		form.getControl("F_Branch").setValue(null);
		form.getControl("F_UserName1").setValue(null);
		form.getControl("F_CardNumber1").setValue(null);
		// form.getControl("F_Address").setValue(null); // 20210923 Tiffany
	},

	getStatus : function() {
		var status = form.getFieldValue("FStatus");
		if (status == "AgentSign1") {
			form.setFieldDisabled("F_Identify", true);
		}

	},
	doOpen : function(type) { // 20210909 adjust by gemfor\Tiffany
		var F_Name = form.getFieldValue("F_Name");// 聯絡人姓名
		var F_Identify = form.getFieldValue("F_Identify");// 身份證字號/統一編號
		var F_DTime = form.getFieldValue("F_DTime");// 日期時間
		var F_CustomerIdfiy = form.getFieldValue("F_CustomerIdfiy");// 客戶身分
		var F_CardKind = form.getFieldValue("F_CardKind");
		var F_HomePhone = form.getFieldValue("F_HomePhone");// 住家電話
		var F_CompanyPhone = form.getFieldValue("F_CompanyPhone");// 公司電話
		var F_MobilePhone = form.getFieldValue("F_MobilePhone");// 手機
		var F_UserName = form.getFieldValue("F_UserName");// 正卡人姓名
		var F_CardNumber = form.getFieldValue("F_CardNumber");// 正卡卡號
		var F_Branch = form.getFieldValue("F_Branch");// 往來分行
		var F_UserName1 = form.getFieldValue("F_UserName1");// 附卡人姓名
		var F_CardNumber1 = form.getFieldValue("F_CardNumber1");// 附卡卡號
		var U_CaseType = form.getFieldValue("U_CaseType");// 案件類型
		var F_Content = form.getFieldValue("F_Content");// 內容說明
		var F_Rank = form.getFieldValue("F_Rank");// 案件等級
		var F_Unit = form.getFieldValue("F_Unit");// 權責單位
		var F_SeiRank = form.getFieldValue("F_SeiRank");// 重要性
		var F_Result = form.getFieldValue("F_Result");// 客訴中心處理結果
		var FUserId = form.getFieldText("FUserId");// 客服人員
		var F_DepartmentId = form.getFieldText("F_DepartmentId");// 處理部門
		var U_UnitOther = form.getFieldValue("U_UnitOther");// 其他
		var U_Desc1 = form.getFieldText("U_Desc1");// 說明1
		var U_Desc2 = form.getFieldValue("U_Desc2");// 說明2
		var U_SupervisorId = form.getFieldText("U_SupervisorId");// 客服主管簽章
		var U_CreateUserId = form.getFieldText("U_CreateUserId");// 接電人員
		var U_Content = form.getFieldText("U_Content");// 內容說明2
				

		var args = {
			F_Name : F_Name,
			F_Identify : F_Identify,
			F_DTime : F_DTime,
			F_CustomerIdfiy : F_CustomerIdfiy,
			F_CardKind : F_CardKind,
			F_HomePhone : F_HomePhone,
			F_CompanyPhone : F_CompanyPhone,
			F_MobilePhone : F_MobilePhone,
			F_UserName : F_UserName,
			F_CardNumber : F_CardNumber,
			F_Branch : F_Branch,
			F_UserName1 : F_UserName1,
			F_CardNumber1 : F_CardNumber1,
			U_CaseType : U_CaseType,
			F_Content : F_Content,
			F_Rank : F_Rank,
			F_Unit : F_Unit,
			F_SeiRank : F_SeiRank,
			F_Result : F_Result,
			FUserId : FUserId,
			F_DepartmentId : F_DepartmentId,
			U_UnitOther : U_UnitOther,
			U_Desc1 : U_Desc1,
			U_Desc2 : U_Desc2,
			U_SupervisorId : U_SupervisorId,
			U_CreateUserId : U_CreateUserId,
			U_Content : U_Content,
		};
		var pageCode = "";
		if ("old" == type) {
			pageCode = "TBB.m12112A.Report.page";
		} else if ("new" == type) {
			pageCode = "TBB.m12112A.Report2.page";
		}
		Utility.openDialog(pageCode, args);
	},
	setU_UnitOther : function() {
		var F_Unit = form.getFieldValue("F_Unit");
		if (F_Unit != null && F_Unit.indexOf("14") >= 0) {
			form.setFieldVisible("U_UnitOther", true);
			form.setFieldRequired("U_UnitOther", true);
		} else {
			form.setFieldVisible("U_UnitOther", false);
		}
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
	
	// 20210923 adjust by gemfor\Tiffany -- 銀行客戶改查詢S601
	doS601 : function() { 
	/* doS105 : function() { // 20210604 add by gemfor\Tiffany
		// 上送S105 */
		
		// 上送S601
		var identify = form.getFieldValue("F_Identify");
		m12112A.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		m12112A.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        // "TXID": "S105",
			// "ID" : identify, // 身份證字號/統編
			"TXID"   : "S601",
			"TYPE"   : "02",
			"CUSIDN" : identify,
			"ACN"    : "",
		};
		var args = JSON.stringify({
			// "name" : "S105tbbapi",
			"name" : "S601tbbapi",
			"from" : "CSR",
			"sessionId" : m12112A.sessionId,
			"agentId" : m12112A.agentId,
			"formData" : data,
		});
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			if (ret == undefined) {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
			if (ret.isSuccess == true) {
				var formData = ret.form;
				
				// 電文交易狀態
				// var MSGCOD = formData.MSGCOD;
				var ABEND = formData.ABEND;
            	// var msgcodText = MSGCOD == 'OKOK' ? '還有資料要傳' : MSGCOD == 'OKLR' ? '最後一筆資料' : MSGCOD == 'EACC' ? '帳號有誤' : MSGCOD == 'ERDB' ? '中心檔案有誤' : MSGCOD == 'ENRD' ? '無資料' : '';
                // form.setFieldValue("U_ErrorCode", MSGCOD);
                // form.setFieldValue("U_PageStatus", MSGCOD);
				form.setFieldValue("U_ErrorCode", ABEND);
                form.setFieldValue("U_PageStatus", ABEND);
                // form.setFieldValue("U_ErrorMemo", msgcodText);
                msgcodDicRet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
				for (var i = 0; i < msgcodDicRet.length; i++) {
					// if (msgcodDicRet[i].value == MSGCOD) {
					if (msgcodDicRet[i].value == ABEND) {
						form.setFieldValue("U_ErrorMemo", msgcodDicRet[i].text);
						break;
					}
				}
				
                // 客戶資料
				/* form.setFieldValue("F_Branch", formData.BRANCH);
				form.setFieldValue("F_CompanyPhone", formData.TEL2);
				form.setFieldValue("F_UserName", formData.OWNERNAME);
				form.setFieldValue("U_PageStatus", formData.MSGCOD);
				form.setFieldValue("F_MobilePhone", formData.MOBILE);
				form.setFieldValue("F_HomePhone", formData.TEL1); */

				form.setFieldValue("U_PageStatus", formData.ABEND);
				form.setFieldValue("F_Name", formData.NAME);
				form.setFieldValue("F_UserName", formData.NAME);
				form.setFieldValue("F_HomePhone", formData.ARACOD + formData.TELNUM);
				form.setFieldValue("F_CompanyPhone", formData.ARACOD2 + formData.TELNUM2);
				form.setFieldValue("F_MobilePhone", formData.MOBTEL);
			} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				return;
			}
		});
	},
	
	doDesc2 : function() { // 20210611 add by gemfor\Tiffany
		// 說明2
		desc2Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-853d-d705-179c662d6f40"}).data;
		
		var centerTxt = ""; // 客服中心聯絡
		var phoneTxt = ""; // 電話
		var extTxt = ""; // 分機
		var faxTxt = ""; // 傳真
		
		for (var i = 0; i < desc2Dic.length; i++) {
			centerTxt = desc2Dic[i].value == "0" ? desc2Dic[i].text : centerTxt;
			phoneTxt = desc2Dic[i].value == "1" ? desc2Dic[i].text : phoneTxt;
			extTxt = desc2Dic[i].value == "2" ? desc2Dic[i].text : extTxt;
			faxTxt = desc2Dic[i].value == "3" ? desc2Dic[i].text : faxTxt;
		}
		
		var phone = Jui.string.isEmpty(form.getFieldValue("U_CallCenterPhone")) ? "" : form.getFieldValue("U_CallCenterPhone");
		var ext = Jui.string.isEmpty(form.getFieldValue("U_Ext")) ? "" : form.getFieldValue("U_Ext");
		var fax = Jui.string.isEmpty(form.getFieldValue("U_Fax")) ? "" : form.getFieldValue("U_Fax");
		
		form.setFieldValue("U_Desc2", centerTxt + " " + phoneTxt + phone + " " + extTxt + ext + " " + faxTxt + fax);
	},
	
};
EntityForm.doSubmit = function() {
	var F_UserName = form.getFieldValue("F_UserName");
	var F_CardNumber = form.getFieldValue("F_CardNumber");
	var F_Branch = form.getFieldValue("F_Branch");

	/*
	 * if(F_UserName == null || F_CardNumber == null || F_Branch == null){
	 * Jui.message.alert("正卡人姓名、正卡卡號、往來分行不能為空"); } else{ EntityForm.$doSubmit(); }
	 */

	// 20170217 adjust by chainsea\alex.liwu_start
	var Cypher = form.getFieldValue("F_CustomerIdfiy");
	if (Cypher == 0 && F_CardNumber == null) { // 信用卡客戶
		Jui.message.alert("信用卡客戶的正卡卡號不能為空");
	} else if (Cypher == 1 && F_UserName == null) { // 網銀客戶
		Jui.message.alert("網銀客戶的正卡人姓名不能為空");
	} else {
		EntityForm.$doSubmit();
	}
	// 20170217 adjust by chainsea\alex.liwu_end

};

// 20210611 add by gemfor\Tiffany
EntityForm.doSave = function(expandToTab)
{
	if (!EntityForm.validate()) {
		return;
	}
	m12112A.doDesc2(); // 保存時/說明2/抓最新的字典文字
	var relationData = {
		relationId		: clientData.relationId,
		masterUnitId	: clientData.masterUnitId,
		masterEntityId	: clientData.masterEntityId
	};
	var data = EntityForm.getData();
	expandToTab = expandToTab == true && Utility.isInDialog(); 
	if (!clientData.checkBeforeSave) {
		EntityForm.save(data, relationData, expandToTab);
		return;
	}
	var args = Jui.object.merge({unitId:clientData.unitId, entityId:clientData.entityId, data:data}, relationData);
	Utility.invoke("Qs.Duplication.getDuplicationJsonBeforeSave", args, true, function(ret) {
		if (ret.data.length == 0) {
			EntityForm.save(data, relationData, expandToTab);
			return;
		}
		var args = {unitName:clientData.unitName, listData:ret.data};
		Utility.openDialog("Qs.Duplication.Confirm.page", args, null, function() {
			EntityForm.save(data, relationData, expandToTab);
		});
	});
};