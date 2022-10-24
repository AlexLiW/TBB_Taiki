/********************************************************************************
	 帳務組客戶問題單 表單
	 * Author: 
	 * CreateDate: 
	 * LastUpdateUser: Chainsea\Yuwen.Wang 
	 * LastUpdateDate: 2021.09.27 
	 * Note: 將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除
*********************************************************************************/
var m12115A = {
	doLoad : function() {

		m12115A.doIsNew();
		m12115A.setOnchange();
		m12115A.setF_WTime();
		m12115A.doCheckValid();
		m12115A.getStatus();
		m12115A.setRequire();

		// 20160926_新增身分證字號由聯絡人表單自動帶入
		m12115A.getInfo();
		if (clientData.entityId != null ) {
			m12115A.addServiceTrack();
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
			statu = CommonBusiness.getFieldValue("TBB.m12115A", FId, "FStatus");
		}
		return statu;
	},
	// 判断表单是否为新建的情况
	doIsNew : function() {
		// form.setFieldVisible("U_AnnulReason",false);
		// form.setFieldVisible("FStatus",false);
		form.setFieldVisible("F_Info", false);
		form.setFieldVisible("F_Informa", false);
		// toolBar.getItem("unClose").setDisabled(true);
		arrayDisabled = [];
		if (Jui.string.isEmpty(clientData.entityId)) {
			toolBar.getItem("Print").setVisible(false);
			toolBar.getItem("PrintNew").setVisible(false);	//2021.06.03-gemfor/lillian-未儲存時隱藏列印按鈕
			form.setFieldDisabled("F_Yearamount", true);
			form.setFieldDisabled("F_Year", true);
			form.setFieldDisabled("F_BillMonth", true);
			form.setFieldDisabled("F_Jianmian", true);
			form.setFieldDisabled("F_Tuiyijin", true);
			form.setFieldDisabled("F_Style", true);
			form.setFieldDisabled("F_Zhanghu", true);
			form.setFieldDisabled("F_Fenhang", true);
			form.setFieldDisabled("F_BranchName", true);
			form.setFieldDisabled("F_Jkrq", true);
			form.setFieldDisabled("F_Weijin", true);
			form.setFieldDisabled("F_Fkh", true);
			form.setFieldDisabled("F_Money", true);
			form.setFieldDisabled("F_Reason", true);
			form.setFieldDisabled("F_DMoney", true);
			// form.setFieldDisabled("F_Chenshu",true);
			form.setFieldDisabled("F_JMoney", true);
			form.setFieldDisabled("U_AnnulThisYear", true); // 20170224 add by
															// chainsea\alex.liwu
		} else {
			//m12115A.setF_CutYMRequire();		//2021.06.03-gemfor/lillian-此方法已註解
			m12115A.setU_CutYM_Change();		//2021.06.03-gemfor/lillian-補上新控制動作
			m12115A.setF_TuiyifukuanRequire();
			m12115A.setF_StyleRequire();
			m12115A.setF_WeiruzhangRequire();
			m12115A.setF_QxRequire();
			m12115A.setF_DiaozhangRequire();
			m12115A.setF_JianRequire();
			for (var i = 0; i < clientData.editJson.title.length; i++) {
				arrayDisabled[i] = form
						.isFieldDisabled(clientData.editJson.title[i].name);
			}
			m12115A.changeFStatus();
		}
		m12115A.setSatisfyEnable();
	},
	// s设置满意度的可用性
	setSatisfyEnable : function() {
		form.setFieldVisible("F_Satisfy", false);
		m12115A.setFStatus();
		console.log(statu);
		if (statu == "End") {
			form.setFieldVisible("F_Satisfy", true);
			toolBar.setItemDisabled("Save", false);

		} else if (statu == "Finish") {
			form.setFieldVisible("F_Satisfy", true);
			toolBar.setItemDisabled("Save", true);
		}
	},
	// 判断关闭、反关闭按钮的可用性
	onClick : function() {
		var FStatus = null;
		m12115A.setFStatus();
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
				m12115A.changeFStatus();
			} else {
				Jui.message.alert("執行關閉失敗");
			}

		});

	},
	changeFStatus : function() {
		m12115A.setFStatus();
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
		//form.getControl("F_CutYM").onchange = m12115A.setF_CutYMRequire; 			//2021.06.02-gemfor/lillian-移除舊欄位控制項
		form.getControl("U_CutYM").onchange = m12115A.setU_CutYM_Change;			//2021.06.02-gemfor/lillian-新欄位"服務項目1"點選框 觸發事件
		form.getControl("F_Tuiyifukuan").onchange = m12115A.setF_TuiyifukuanRequire;
		form.getControl("F_Style").onchange = m12115A.setF_StyleRequire;
		form.getControl("F_Weiruzhang").onchange = m12115A.setF_WeiruzhangRequire;
		form.getControl("F_Qx").onchange = m12115A.setF_QxRequire;
		form.getControl("F_Diaozhang").onchange = m12115A.setF_DiaozhangRequire;
		form.getControl("F_Jian").onchange = m12115A.setF_JianRequire;
		form.getControl("F_Jianmian").onchange = m12115A.setF_JianRequire;
		form.getControl("F_Other").onchange = m12115A.setF_JianRequire;

		form.getControl("F_Jianmian").onchange = m12115A.setRequire; 				// 減免原因
																					// 其他
		form.getControl("U_AnnulReason").onchange = m12115A.setRequire; 			// 減免原因
		form.getControl("U_Against").onchange = m12115A.setRequire1; 
		
		//2021.09.09-gemfor/lillian-減免卡號1.2.3若有資料代入，請確認是否有輸入到16碼，若有少輸或多輸，請跳提醒視窗「信用卡卡號需輸入16碼數字」
		form.getControl("U_DisCard1").onchange = function(){
			if(form.getFieldValue("U_DisCard1") != null && form.getFieldValue("U_DisCard1") != ""){
				if(form.getFieldValue("U_DisCard1").length != 16){
					Jui.message.alert("信用卡卡號需輸入16碼數字！");
					form.setFieldValue("U_DisCard1", null);
				}
			}
		}; 
		form.getControl("U_DisCard2").onchange = function(){
			if(form.getFieldValue("U_DisCard2") != null && form.getFieldValue("U_DisCard2") != ""){
				if(form.getFieldValue("U_DisCard2").length != 16){
					Jui.message.alert("信用卡卡號需輸入16碼數字！");
					form.setFieldValue("U_DisCard2", null);
				}
			}
		}; 
		form.getControl("U_DisCard3").onchange = function(){
			if(form.getFieldValue("U_DisCard3") != null && form.getFieldValue("U_DisCard3") != ""){
				if(form.getFieldValue("U_DisCard3").length != 16){
					Jui.message.alert("信用卡卡號需輸入16碼數字！");
					form.setFieldValue("U_DisCard3", null);
				}
			}
		}; 
	},

	setRequire : function() {
		// 若減免原因為其他則顯示其他欄位
		var F_Jianmian = form.getFieldValue("F_Jianmian");
		var U_AnnulReason = form.getFieldValue("U_AnnulReason");
		if (F_Jianmian == 2) // 其他
		{
			form.setFieldVisible("U_AnnulReason", true);
		} else {
			form.setFieldVisible("U_AnnulReason", false);
		}
		if (U_AnnulReason == 3) //减免原因其他
		{
			form.setFieldRequired("F_Chenshu", true);
		} else {
			form.setFieldRequired("F_Chenshu", false);
		}		
	},
	setRequire1 :function(){
		var U_Against=form.getFieldValue("U_Against");
		if(U_Against==1){			
			form.setFieldDisabled("U_Describe",false);
			form.setFieldRequired("U_Describe", true);
		}
		else{
			form.setFieldValue("U_Describe",null);
			form.setFieldDisabled("U_Describe",true);
		}
	},

	// 延時申請
	doDeal : function() {
		if (!form.validate()) {
			return;
		}
		var F_CustomerId = CommonBusiness.getCurrentUser().userId;// 處理人員
		var F_Customer = CommonBusiness.getFieldValue('Qs.User', F_CustomerId,
				'FName');
		var F_WTime = form.getFieldValue("F_FinishTime");// 预计完成时间
		var FId = form.getFieldValue("FId");// 预计完成时间
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

	// 设置预计完成时间
	setF_WTime : function() {
		var day = (new Date().getDay()) + 1;
		if (day == 7) {
			day = 0;
		}
		var time = new Date().getTime();
		for (var i = 0, j = 10; i < 10, j > 0; i++) {
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
		if (form.getFieldValue("F_FinishTime") == null) {
			form.setFieldValue("F_FinishTime", ETime);
		}
	},

	doCheckValid : function() {
		var Yearamount = form.getFieldValue("F_Yearamount");
		var F_DMoney = form.getFieldValue("F_DMoney");
		var F_JMoney = form.getFieldValue("F_JMoney");
		var F_Money = form.getFieldValue("F_Money");
		var F_Tuiyijin = form.getFieldValue("F_Tuiyijin");
		var F_Weijin = form.getFieldValue("F_Weijin");

		var isValid;

		if (Yearamount < 0) {
			Jui.message.alert("年费金额必须大于0");
			isValid = false;
		} else if (F_DMoney < 0) {
			Jui.message.alert("調帳金額必须大于0");
			isValid = false;
		} else if (F_JMoney < 0) {
			Jui.message.alert("減免金額必须大于0");
			isValid = false;
		} else if (F_Money < 0) {
			Jui.message.alert("取消回饋金額必须大于0");
			isValid = false;
		} else if (F_Tuiyijin < 0) {
			Jui.message.alert("退溢金額必须大于0");
			isValid = false;
		} else if (F_Weijin < 0) {
			Jui.message.alert("未入帳金額必须大于0");
			isValid = false;
		} else {
			isValid = true;
		}
		return isValid;
	},

	//2021.06.02-gemfor/lillian-移除舊欄位控制項
	// 若勾選服務項目，則年費金額、帳單年份、帳單月份為必填
	/*setF_CutYMRequire : function() {
		form.setFieldDisabled("F_Yearamount", true);
		form.setFieldDisabled("F_Year", true);
		form.setFieldDisabled("F_BillMonth", true);
		form.setFieldDisabled("F_Jianmian", true);
		form.setFieldDisabled("U_AnnulThisYear", true); // 20170224 add by
														// chainsea\alex.liwu
		var Cypher = form.getFieldValue("F_CutYM");
		if (Cypher == 0) {
			form.setFieldDisabled("F_Yearamount", false);
			form.setFieldDisabled("F_Year", false);
			form.setFieldDisabled("F_BillMonth", false);
			form.setFieldDisabled("F_Jianmian", false);
			form.setFieldDisabled("U_AnnulThisYear", false); // 20170224 add
																// by
																// chainsea\alex.liwu
			form.setFieldRequired("F_Yearamount", true);
			form.setFieldRequired("F_Year", true);
			form.setFieldRequired("F_BillMonth", true);
			form.setFieldRequired("F_Jianmian", true);
			form.setFieldRequired("U_AnnulThisYear", true); // 20170224 add by
															// chainsea\alex.liwu
		} else {
			form.getControl("F_Yearamount").setValue(null);
			form.getControl("F_Year").setValue(null);
			form.getControl("F_BillMonth").setValue(null);
			form.getControl("F_Jianmian").setValue(null);
			form.getControl("U_AnnulThisYear").setValue(null); // 20170224 add
																// by
																// chainsea\alex.liwu
		}
	},*/
	
	// 若勾選服務項目2，則退溢金額、退款方式必填
	setF_TuiyifukuanRequire : function() {
		form.setFieldDisabled("F_Tuiyijin", true);
		form.setFieldDisabled("F_Style", true);
		var Cypher = form.getFieldValue("F_Tuiyifukuan");
		if (Cypher == 0) {
			form.setFieldDisabled("F_Tuiyijin", false);
			form.setFieldDisabled("F_Style", false);
			form.setFieldRequired("F_Tuiyijin", true);
			form.setFieldRequired("F_Style", true);
		} else {
			form.setFieldRequired("F_Tuiyijin", false);
			form.setFieldRequired("F_Style", false);
			form.getControl("F_Tuiyijin").setValue(null);
			form.getControl("F_Style").setValue(null);
			//2021.06.02-gemfor/lillian-服務項目2新增欄位，同時新增控制("匯款行庫" / "分行別")
			form.setFieldDisabled("U_TransBankNo", true);
			form.setFieldDisabled("U_TransBch", true);
			form.setFieldValue("U_TransBankNo", null);
			form.setFieldValue("U_TransBch", null);
		}
		m12115A.setF_StyleRequire();
	},
	// 退款方式,若選退帳戶，則後帳戶欄位必填；選退支票則分行欄位必填
	setF_StyleRequire : function() {
		form.setFieldDisabled("F_Zhanghu", true);
		form.setFieldDisabled("F_Fenhang", true);
		form.setFieldDisabled("F_BranchName", true);
		var Cypher = form.getFieldValue("F_Style");
		if (Cypher == 0) {
			form.setFieldRequired("F_Zhanghu", true);
			form.setFieldDisabled("F_Zhanghu", false);
			form.getControl("F_Fenhang").setValue(null);
			form.getControl("F_BranchName").setValue(null);
			//2021.07.02-gemfor/lillian-服務項目2新增欄位，同時新增控制("匯款行庫" / "分行別")
			form.setFieldDisabled("U_TransBankNo", true);
			form.setFieldDisabled("U_TransBch", true);
			form.setFieldValue("U_TransBankNo", null);
			form.setFieldValue("U_TransBch", null);
			//2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位與控制
			form.setFieldDisabled("U_Chenshu2", false);
		} else if (Cypher == 1 ) {
			form.setFieldRequired("F_Zhanghu", true);
			form.setFieldDisabled("F_Zhanghu", false);
			form.getControl("F_Fenhang").setValue(null);
			form.getControl("F_BranchName").setValue(null);
			//2021.07.02-gemfor/lillian-服務項目2新增欄位，同時新增控制("匯款行庫" / "分行別")
			form.setFieldDisabled("U_TransBankNo", false, true);
			form.setFieldDisabled("U_TransBch", false, true);
			//2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位與控制
			form.setFieldDisabled("U_Chenshu2", false);
		} else if (Cypher == 2) {
			form.setFieldRequired("F_Fenhang", true);
			form.setFieldRequired("F_BranchName", true);
			form.setFieldDisabled("F_Fenhang", false);
			form.setFieldDisabled("F_BranchName", false);
			form.getControl("F_Zhanghu").setValue(null);
			//2021.07.02-gemfor/lillian-服務項目2新增欄位，同時新增控制("匯款行庫" / "分行別")
			form.setFieldDisabled("U_TransBankNo", true);
			form.setFieldDisabled("U_TransBch", true);
			form.setFieldValue("U_TransBankNo", null);
			form.setFieldValue("U_TransBch", null);
			//2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位與控制
			form.setFieldDisabled("U_Chenshu2", false);
		}else {
			form.getControl("F_Zhanghu").setValue(null);
			form.getControl("F_Fenhang").setValue(null);
			form.getControl("F_BranchName").setValue(null);
			//2021.07.02-gemfor/lillian-服務項目2新增欄位，同時新增控制("匯款行庫" / "分行別")
			form.setFieldDisabled("U_TransBankNo", true);
			form.setFieldDisabled("U_TransBch", true);
			form.setFieldValue("U_TransBankNo", null);
			form.setFieldValue("U_TransBch", null);
			//2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位與控制
			form.setFieldDisabled("U_Chenshu2", true);
			form.setFieldValue("U_Chenshu2", null, null);
		}
	},
	// 若勾選服務項目2，則未入帳金額、繳款日期、付款行必填
	setF_WeiruzhangRequire : function() {
		form.setFieldDisabled("F_Jkrq", true);
		form.setFieldDisabled("F_Weijin", true);
		form.setFieldDisabled("F_Fkh", true);
		var Cypher = form.getFieldValue("F_Weiruzhang");
		if (Cypher == 0) {
			form.setFieldRequired("F_Jkrq", true);
			form.setFieldRequired("F_Weijin", true);
			form.setFieldRequired("F_Fkh", true);
			form.setFieldDisabled("F_Jkrq", false);
			form.setFieldDisabled("F_Weijin", false);
			form.setFieldDisabled("F_Fkh", false);
		} else {
			form.getControl("F_Jkrq").setValue(null);
			form.getControl("F_Weijin").setValue(null);
			form.getControl("F_Fkh").setValue(null);
		}
	},
	// 若勾選服務項目3，則取消回饋金額、取消原因為必填
	setF_QxRequire : function() {
		form.setFieldDisabled("F_Money", true);
		form.setFieldDisabled("F_Reason", true);
		var Cypher = form.getFieldValue("F_Qx");
		if (Cypher == 0) {
			form.setFieldRequired("F_Money", true);
			form.setFieldRequired("F_Reason", true);
			form.setFieldDisabled("F_Money", false);
			form.setFieldDisabled("F_Reason", false);
		} else {
			form.getControl("F_Money").setValue(null);
			form.getControl("F_Reason").setValue(null);
		}
	},
	// 若勾選服務項目4，則調帳金額必填
	setF_DiaozhangRequire : function() {
		form.setFieldDisabled("F_DMoney", true);
		var Cypher = form.getFieldValue("F_Diaozhang");
		if (Cypher == 0) {
			form.setFieldRequired("F_DMoney", true);
			form.setFieldDisabled("F_DMoney", false);
		} else {
			form.getControl("F_DMoney").setValue(null);
		}
	},
	// 若勾選服務項目5，則減免金額為必填
	setF_JianRequire : function() {
	//	form.setFieldDisabled("F_Chenshu", true);
		form.setFieldDisabled("F_JMoney", true);
		var Cypher = form.getFieldValue("F_Jian");
		var Other = form.getFieldValue("F_Other");
		var Jianmian = form.getFieldValue("F_Jianmian");
		if (Other == 0 || Cypher == 0 || Jianmian == 2) {
			form.setFieldRequired("F_Chenshu", true);
			form.setFieldDisabled("F_Chenshu", false);
		} else {
			form.getControl("F_Chenshu").setValue(null);
			//form.setFieldRequired("F_Chenshu", false);
			form.setFieldDisabled("F_Chenshu", true);		//2021.06.03-gemfor/lillian-修正沒有跟著勾選框變動之問題
		}
		if (Cypher == 0) {
			form.setFieldRequired("F_JMoney", true);
			form.setFieldDisabled("F_JMoney", false);
		} else {
			form.getControl("F_JMoney").setValue(null);
		}

	},
	getStatus : function() {
		var status = form.getFieldValue("FStatus");
		var U_Against = form.getFieldValue("U_Against");
		if (status == "AgentSign1") {
			form.setFieldDisabled("F_Identify", true);
		}
//		if(status!="AuditCollection"){
		if(status!="Audit"){
			form.setFieldDisabled("U_Against",true);
			form.setFieldDisabled("U_Describe",true);
		}
		else if(U_Against==1){
			form.setFieldRequired("U_Describe",true);
		}
		else if(U_Against==0){
			form.setFieldDisabled("U_Describe",true);
		}

	},
	setSerialNo : function(event) {
		var U_Against=form.getFieldValue("U_Against");
		var U_Describe=form.getFieldValue("U_Describe");
		if(U_Against==null){
			Jui.message.alert("服務資訊還未填寫并保存");
		}
		else if(U_Against==1 &&U_Describe==null)
		{
			Jui.message.alert("服務資訊還未填寫并保存");
		}
		else{
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
								fTableName : "TBBm12115",
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
	
	//2021.06.02-gemfor/lillian-新欄位"服務項目1"點選框 觸發事件
	setU_CutYM_Change : function(){
		var U_CutYM = form.getFieldValue("U_CutYM");
		if(U_CutYM != null){
			form.setFieldDisabled("F_Year", false, true);
			form.setFieldDisabled("F_BillMonth", false, true);
			form.setFieldDisabled("U_AnnulThisYear", false, true);
			form.setFieldDisabled("F_Jianmian", false, true);
			form.setFieldDisabled("U_Chenshu", false, false);
			if(U_CutYM == "0"){
				form.setFieldDisabled("U_DisCard1", false, true);
				//2021.09.09-gemfor/lillian-若點選減免年費，不論是選單卡年費還是多卡年費，減免卡號1應預設代入上方聯絡人正卡卡號，並開放可修改。
				if(form.getFieldValue("U_DisCard1") == null || form.getFieldValue("U_DisCard1") == ""){
					form.setFieldValue("U_DisCard1", form.getFieldValue("F_CardNumber"));
				}
				form.setFieldDisabled("U_DisCardAMT1", false, true);
				form.setFieldDisabled("U_DisCard2", true);
				form.setFieldDisabled("U_DisCardAMT2", true);
				form.setFieldDisabled("U_DisCard3", true);
				form.setFieldDisabled("U_DisCardAMT3", true);
				form.setFieldValue("U_DisCard2", null);
				form.setFieldValue("U_DisCardAMT2", null);
				form.setFieldValue("U_DisCard3", null);
				form.setFieldValue("U_DisCardAMT3", null);
			}else if(U_CutYM == "1"){
				form.setFieldDisabled("U_DisCard1", false, true);
				//2021.09.09-gemfor/lillian-若點選減免年費，不論是選單卡年費還是多卡年費，減免卡號1應預設代入上方聯絡人正卡卡號，並開放可修改。
				if(form.getFieldValue("U_DisCard1") == null || form.getFieldValue("U_DisCard1") == ""){
					form.setFieldValue("U_DisCard1", form.getFieldValue("F_CardNumber"));
				}
				form.setFieldDisabled("U_DisCardAMT1", false, true);
				form.setFieldDisabled("U_DisCard2", false, false);
				form.setFieldDisabled("U_DisCardAMT2", false, false);
				form.setFieldDisabled("U_DisCard3", false, false);
				form.setFieldDisabled("U_DisCardAMT3", false, false);
			}
		}else{
			form.setFieldDisabled("U_DisCard1", true);
			form.setFieldDisabled("U_DisCardAMT1", true);
			form.setFieldDisabled("U_DisCard2", true);
			form.setFieldDisabled("U_DisCardAMT2", true);
			form.setFieldDisabled("U_DisCard3", true);
			form.setFieldDisabled("U_DisCardAMT3", true);
			form.setFieldValue("U_DisCard1", null);
			form.setFieldValue("U_DisCardAMT1", null);
			form.setFieldValue("U_DisCard2", null);
			form.setFieldValue("U_DisCardAMT2", null);
			form.setFieldValue("U_DisCard3", null);
			form.setFieldValue("U_DisCardAMT3", null);
			
			form.setFieldDisabled("F_Year", true);
			form.setFieldDisabled("F_BillMonth", true);
			form.setFieldDisabled("U_AnnulThisYear", true);
			form.setFieldDisabled("F_Jianmian", true);
			form.setFieldDisabled("U_Chenshu", true);
			form.setFieldVisible("U_AnnulReason", false);
			form.setFieldValue("F_Year", null);
			form.setFieldValue("F_BillMonth", null);
			form.setFieldValue("U_AnnulThisYear", null);
			form.setFieldValue("F_Jianmian", null);
			form.setFieldValue("U_Chenshu", null);
			form.setFieldValue("U_AnnulReason", null);
		}
	},

	doOpen : function() {
		var F_Identify = form.getFieldValue("F_Identify");// 身份證字號
		var F_CardKind = form.getFieldValue("F_CardKind");// 卡種
		var F_Datetime = form.getFieldValue("F_Datetime");// 日期時間
		var F_HomePhone = form.getFieldValue("F_HomePhone");// 住家電話
		var F_CompanyPhone = form.getFieldValue("F_CompanyPhone");// 公司電話
		var F_MobilePhone = form.getFieldValue("F_MobilePhone");// 手機
		var F_UserName = form.getFieldValue("F_UserName");// 正卡人姓名
		var F_CardNumber = form.getFieldValue("F_CardNumber");// 正卡人卡號
		var F_Branch = form.getFieldValue("F_Branch");// 往來分行
		var F_UserName1 = form.getFieldValue("F_UserName1");// 附卡人姓名
		var F_CardNumber1 = form.getFieldValue("F_CardNumber1");// 附卡卡號
		var U_CaseType = form.getFieldValue("U_CaseType");//案件類型
		var F_CutYM = form.getFieldValue("F_CutYM");// 服務項目
		var F_JianWay = form.getFieldValue("F_JianWay");// 減免方式
		var F_Yearamount = form.getFieldValue("F_Yearamount");// 年費金額
		var F_BillMonth = form.getFieldValue("F_BillMonth");// 賬單月
		var F_Year = form.getFieldText("F_Year");// 賬單年
		var F_Tuiyifukuan = form.getFieldValue("F_Tuiyifukuan");// 服務項目1
		var F_Tuiyijin = form.getFieldValue("F_Tuiyijin");// 退溢金額
		var F_Style = form.getFieldValue("F_Style");// 退款方式
		var F_Zhanghu = form.getFieldValue("F_Zhanghu");// 賬戶
		var F_Fenhang = form.getFieldText("F_Fenhang");// 分行
		var F_BranchName = form.getFieldText("F_BranchName");// 分行名稱
		var F_Weiruzhang = form.getFieldValue("F_Weiruzhang");// 服務項目2
		var F_Weijin = form.getFieldValue("F_Weijin");// 未入賬金額
		var F_Jkrq = form.getFieldValue("F_Jkrq");// 繳款日期
		var F_Fkh = form.getFieldValue("F_Fkh");// 付款行
		var F_Qx = form.getFieldValue("F_Qx");// 服務項目3
		var F_Money = form.getFieldValue("F_Money");// 取消回饋金額
		var F_Reason = form.getFieldValue("F_Reason");// 取消原因
		var F_Diaozhang = form.getFieldValue("F_Diaozhang");// 服務項目4
		var F_DMoney = form.getFieldValue("F_DMoney");// 調賬金額
		var F_Jian = form.getFieldValue("F_Jian");// 服務項目5
		var F_JMoney = form.getFieldValue("F_JMoney");// 減免金額
		var F_Jianmian = form.getFieldValue("F_Jianmian");// 減免原因
		var F_Other = form.getFieldValue("F_Other");// 服務項目6
		var F_Chenshu = form.getFieldValue("F_Chenshu");// 問題陳述區
		var F_QianZhang = form.getFieldValue("F_QianZhang");// 客服主管簽章
		var F_CustomerId = form.getFieldText("FUserId");// 處理人員
		var F_DepartmentId = form.getFieldText("F_DepartmentId");// 處理部門
		var U_AnnulThisYear = form.getFieldValue("U_AnnulThisYear");// 今年減免次數
		var U_AnnulReason	=form.getFieldText("U_AnnulReason");//减免次数其他
		//2021.09.27-Chainsea/Yuwen.Wang-將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除
		//var U_Against		=form.getFieldValue("U_Against");
		var U_Describe		=form.getFieldValue("U_Describe");
		var args = {
			F_Identify : F_Identify,
			F_CardKind : F_CardKind,
			F_Datetime : F_Datetime,
			F_HomePhone : F_HomePhone,
			F_CompanyPhone : F_CompanyPhone,
			F_MobilePhone : F_MobilePhone,
			F_UserName : F_UserName,
			F_CardNumber : F_CardNumber,
			F_Branch : F_Branch,
			F_UserName1 : F_UserName1,
			F_CardNumber : F_CardNumber,
			F_Branch : F_Branch,
			F_UserName1 : F_UserName1,
			F_CardNumber1 : F_CardNumber1,
			U_CaseType : U_CaseType,
			F_CutYM : F_CutYM,
			F_JianWay : F_JianWay,
			F_Yearamount : F_Yearamount,
			F_BillMonth : F_BillMonth,
			F_Tuiyifukuan : F_Tuiyifukuan,
			F_Tuiyijin : F_Tuiyijin,
			F_Style : F_Style,
			F_Zhanghu : F_Zhanghu,
			F_Fenhang : F_Fenhang,
			F_BranchName : F_BranchName,
			F_Weiruzhang : F_Weiruzhang,
			F_Weijin : F_Weijin,
			F_Jkrq : F_Jkrq,
			F_Fkh : F_Fkh,
			F_Qx : F_Qx,
			F_Money : F_Money,
			F_Reason : F_Reason,
			F_Diaozhang : F_Diaozhang,
			F_DMoney : F_DMoney,
			F_Jian : F_Jian,
			F_JMoney : F_JMoney,
			F_Jianmian : F_Jianmian,
			F_Other : F_Other,
			F_Chenshu : F_Chenshu,
			F_QianZhang : F_QianZhang,
			F_CustomerId : F_CustomerId,
			F_Year : F_Year,
			F_DepartmentId : F_DepartmentId,
			U_AnnulThisYear : U_AnnulThisYear,
			U_AnnulReason	:U_AnnulReason,
			//2021.09.27-Chainsea/Yuwen.Wang-將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除
			//U_Against		:U_Against,
			U_Describe		:U_Describe
		}
		Utility.openDialog("TBB.m12115A.Report.page", args);
	},
	
	//2021.06.03-gemfor/lillian-添加新欄位、移除舊欄位後的表單
	doOpenNew : function(){
		var F_Identify 		= form.getFieldValue("F_Identify");		// 身份證字號
		var F_CardKind 		= form.getFieldValue("F_CardKind");		// 卡種
		var F_Datetime 		= form.getFieldValue("F_Datetime");		// 日期時間
		var F_HomePhone 	= form.getFieldValue("F_HomePhone");	// 住家電話
		var F_CompanyPhone 	= form.getFieldValue("F_CompanyPhone");	// 公司電話
		var F_MobilePhone 	= form.getFieldValue("F_MobilePhone");	// 手機
		var F_UserName 		= form.getFieldValue("F_UserName");		// 正卡人姓名
		var F_CardNumber 	= form.getFieldValue("F_CardNumber");	// 正卡人卡號
		var F_Branch 		= form.getFieldValue("F_Branch");		// 往來分行
		var U_CaseType 		= form.getFieldValue("U_CaseType");		// 案件類型

		var U_CutYM 		= form.getFieldValue("U_CutYM");		// 服務項目1
		var U_DisCard1 		= form.getFieldValue("U_DisCard1");		// 減免卡號1
		var U_DisCard2 		= form.getFieldValue("U_DisCard2");		// 減免卡號2
		var U_DisCard3 		= form.getFieldValue("U_DisCard3");		// 減免卡號3
		var U_DisCardAMT1 	= form.getFieldValue("U_DisCardAMT1");	// 減免卡號1金額
		var U_DisCardAMT2 	= form.getFieldValue("U_DisCardAMT2");	// 減免卡號2金額
		var U_DisCardAMT3 	= form.getFieldValue("U_DisCardAMT3");	// 減免卡號3金額
		var U_Notice 		= form.getFieldValue("U_Notice$");		// 提醒事項
		var F_Year 			= form.getFieldText("F_Year");			// 賬單年度
		var F_BillMonth 	= form.getFieldValue("F_BillMonth");	// 賬單月
		var U_AnnulThisYear = form.getFieldValue("U_AnnulThisYear");// 今年減免次數
		var F_Jianmian 		= form.getFieldValue("F_Jianmian");		// 減免原因
		var U_AnnulReason	= form.getFieldText("U_AnnulReason");	// 减免原因其他
		var U_Chenshu		= form.getFieldValue("U_Chenshu");		// 服務項目1問題陳述

		var F_Tuiyifukuan	= form.getFieldValue("F_Tuiyifukuan");	// 服務項目2
		var F_Tuiyijin 		= form.getFieldValue("F_Tuiyijin");		// 退溢金額
		var F_Style 		= form.getFieldValue("F_Style");		// 退款方式
		var F_Zhanghu 		= form.getFieldValue("F_Zhanghu");		// 賬戶
		var F_Fenhang 		= form.getFieldText("F_Fenhang");		// 分行區域
		var F_BranchName 	= form.getFieldText("F_BranchName");	// 分行名稱
		var U_TransBankNo 	= form.getFieldText("U_TransBankNo");	// 匯款行庫
		var U_TransBch 		= form.getFieldValue("U_TransBch");		// 分行別

		var F_Qx 			= form.getFieldValue("F_Qx");			// 服務項目3
		var F_Money 		= form.getFieldValue("F_Money");		// 取消回饋金額
		var F_Reason 		= form.getFieldValue("F_Reason");		// 取消原因

		var F_Other 		= form.getFieldValue("F_Other");		// 服務項目4
		var F_Chenshu 		= form.getFieldValue("F_Chenshu");		// 服務項目4問題陳述


		var F_QianZhang 	= form.getFieldValue("F_QianZhang");	// 客服主管簽章
		var F_CustomerId 	= form.getFieldText("FUserId");			// 處理人員
		var F_DepartmentId 	= form.getFieldText("F_DepartmentId");	// 處理部門
		var U_Against		= form.getFieldValue("U_Against");
		var U_Describe		= form.getFieldValue("U_Describe");
		var U_Chenshu2		= form.getFieldText("U_Chenshu2");		// 2021.09.09-gemfor/lillian-新增"服務項目2問題陳述"欄位與控制
		
		var args = {
				F_Identify 		: F_Identify,
				F_CardKind		: F_CardKind,
				F_Datetime		: F_Datetime,
				F_HomePhone		: F_HomePhone,
				F_CompanyPhone	: F_CompanyPhone,
				F_MobilePhone	: F_MobilePhone,
				F_UserName		: F_UserName,
				F_CardNumber	: F_CardNumber,
				F_Branch		: F_Branch,
				U_CaseType		: U_CaseType,
				U_CutYM			: U_CutYM,
				U_DisCard1		: U_DisCard1,
				U_DisCard2		: U_DisCard2,
				U_DisCard3		: U_DisCard3,
				U_DisCardAMT1	: U_DisCardAMT1,
				U_DisCardAMT2	: U_DisCardAMT2,
				U_DisCardAMT3	: U_DisCardAMT3,
				U_Notice		: U_Notice,
				F_Year			: F_Year,
				F_BillMonth		: F_BillMonth,
				U_AnnulThisYear	: U_AnnulThisYear,
				F_Jianmian		: F_Jianmian,
				U_AnnulReason	: U_AnnulReason,
				U_Chenshu		: U_Chenshu,
				F_Tuiyifukuan	: F_Tuiyifukuan,
				F_Tuiyijin		: F_Tuiyijin,
				F_Style			: F_Style,
				F_Zhanghu		: F_Zhanghu,
				F_Fenhang		: F_Fenhang,
				F_BranchName	: F_BranchName,
				U_TransBankNo	: U_TransBankNo,
				U_TransBch		: U_TransBch,
				F_Qx			: F_Qx,
				F_Money			: F_Money,
				F_Reason		: F_Reason,
				F_Other			: F_Other,
				F_Chenshu		: F_Chenshu,
				F_QianZhang		: F_QianZhang,
				F_CustomerId	: F_CustomerId,
				F_DepartmentId	: F_DepartmentId,
				U_Against		: U_Against,
				U_Describe		: U_Describe,
				U_Chenshu2		: U_Chenshu2
		};
		
		for(var key in args){
			if(args[key] == undefined || args[key] == null){
				args[key] = "";
			}
		}
		
		Utility.openDialog("TBB.m12115A_20210603.Report.page", args);
	},
	
	
	doSave : function() {
		var ret = m12115A.doCheckValid();
		if (ret)
			EntityForm.doSave();
	},
	addServiceTrack: function()
	{
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
//	if (F_UserName == null || F_CardNumber == null || F_Branch == null) {
	if (F_UserName == null) {
		Jui.message.alert("正卡人姓名不能为空");
//		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
	} else {
		EntityForm.$doSubmit();
	}

};
