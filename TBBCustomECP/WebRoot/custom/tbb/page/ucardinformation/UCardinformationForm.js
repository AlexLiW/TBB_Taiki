/********************************************************************************
	 信用卡卡片狀態查詢
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2022.11.21
	 * LastUpdateUser: 
	 * LastUpdateDate: 2022.12.20
	 * Note: 欄位排版
					 2021/10/04 調整轉帳銀行欄位透過條件判斷要呈現的字典內容
					 2022/01/07 針對新增欄位加入電文回傳、增加電文失敗時塞入欄位判斷、增加電文等待效果
					 2022/03/07 doBSIH:修改帶值的欄位名稱
					 2022.03.30-gemfor/Emma-稽核員代號
					 2022.11.21 ai3/Jason新增發查R001、R003電文
					 2022.12.14 新增額度異動按鈕連結
					 2022.12.20 新增高風險按鈕連結
*********************************************************************************/
var UCardinformationForm = {
		doLoad : function(){
			
			UCardinformationForm.doChange();
			UCardinformationForm.setOnchange();//2021.09.20-gemfor/Emily
			
			//如果是從"信用卡持卡總覽查詢"打開時，如果 卡號、卡別 有資料，就帶入。
			if ("U_CardNum" in clientData.urlArgs) {
				form.setFieldValue("U_CardNum", clientData.urlArgs.U_CardNum);
			}
			if ("U_CardType" in clientData.urlArgs) {
				form.setFieldValue("U_CardType", clientData.urlArgs.U_CardType);
			}
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			
			form.getControl("U_Inquiry").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'查詢' 按鈕 與上下間個距離增加
			form.getControl("U_CardNum").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'卡號' 與上下間個距離增加
			//form.getControl("U_CardType").setElementStyle("margin-top: 20px; margin-bottom: 20px;"); 	//'卡別' 與上下間個距離增加 //gemfor/emily 卡別欄位拉掉
			
			/*  // 20210928 gemfor\Emily
			// 舊控管碼
			document.getElementsByName("U_OControlcode")[0].children[0].style.width = "372px";
			document.getElementsByName("U_OControlcode")[0].children[0].align = "right";
			document.getElementsByName("U_OControlcode")[0].children[1].style.width = "495px";
			document.getElementsByName("U_OControlcode")[0].children[1].children[0].style.width = "180px";
			document.getElementsByName("U_OControlcode")[0].children[1].align = "right";

			// 舊控管碼日期
			document.getElementsByName("U_OControlcodedate")[0].children[0].style.width = "400px";
			document.getElementsByName("U_OControlcodedate")[0].children[0].align = "right";
			document.getElementsByName("U_OControlcodedate")[0].children[1].style.width = "495px";
			document.getElementsByName("U_OControlcodedate")[0].children[1].children[0].style.width = "180px";
			document.getElementsByName("U_OControlcodedate")[0].children[1].align = "right";
	    	*/
			// 20210930 舊控管碼  Emily 
	        document.getElementsByName("U_OControlcode")[0].outerHTML = '<div class="JuiFormItem" name="Space" style="width:33.333333333333336%;padding-left:126px" readonly="true"></div>'
	        	+ document.getElementsByName("U_OControlcode")[0].outerHTML;
			
		},
		
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {//查詢按鈕
				UCardinformationForm.doBSIH();
				
			};
			form.getControl("U_QChange").onclick = function() {//額度異動按鈕
				
				UCardinformationForm.doQChange(1);
				
			};	
			form.getControl("U_HRCustomers").onclick = function() {//高風險按鈕
			
				UCardinformationForm.doQChange(2);
				
			};	
		},
		
		setOnchange : function() {
			//2021.09.20-gemfor/Emily-卡號若有資料代入，請確認是否有輸入到16碼，若有少輸或多輸，請跳提醒視窗「信用卡卡號需輸入16碼數字」
			form.getControl("U_CardNum").onchange = function(){
				if(form.getFieldValue("U_CardNum") != null && form.getFieldValue("U_CardNum") != ""){
					if(form.getFieldValue("U_CardNum").length != 16){
						Jui.message.alert("信用卡卡號需輸入16碼數字！");
						form.setFieldValue("U_CardNum", null);
					}
				}
			}; 
		},
		
		doQChange : function(id){//按下額度異動檔按鈕
			
			var args ={
				custID:form.getFieldValue("U_UID"),//抓身分證欄位
			};
			var args2 ={
				TID:form.getFieldValue("U_Cellphone"),//抓持卡人手機聯絡號碼
				CID:form.getFieldValue("U_OCardNum")//抓卡號
			};
			
			if(id==1){
			Utility.openTab("CUS.OCFile.Form.page",args,"額度異動檔");
			//開啟額度異動單元
			}else if(id==2){
				Utility.openTab("CUS.HighRisk.Form.page",args2,"高風險客戶資料檔");
			//開啟高風險單元
			}
		},
		
		doBSIH : function(){
			if (!form.validate()) {
				return;
			}
			
			form.setFieldValue("U_ErrorCode", null);
			form.setFieldValue("U_ErrorMemo", null);
			TBBUtil.doClearFields("查詢結果", null, null);	//清空查詢結果欄位
			
			UCardinformationForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UCardinformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ORG"		: "150",
//			        "TYPE"		: form.getFieldValue("U_CardType"), //gemfor/emily卡別改傳空值
					"TYPE"		: "",
			        "CARDNUM"	: form.getFieldValue("U_CardNum")
			};
					
			var args = JSON.stringify({
				"name" 		: "BSIHtbbapi",
				"from" 		: "CSR",
				"sessionId" : UCardinformationForm.sessionId,
				"agentId" 	: UCardinformationForm.agentId,
				"formData" 	: data
			});
			var bar =
            Jui.message.progress(function() {
                Jui.message.hint("查詢資料中，請稍後...");
            });
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				setTimeout(function() {
				console.log(ret);
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				if (ret.isSuccess == true) {
					var formData = ret.form;			//取回傳資料
					
					var EXPIRDTE = formData.EXPIRDTE.substr(0, 2) + "/" + formData.EXPIRDTE.substr(2, 2);
					
					form.setFieldValue("U_ErrorCode", formData.ABEND);			//交易代號
					
					//交易訊息/結果
					/*if(formData.ABEND == "0000"){
						form.setFieldValue("U_ErrorMemo", "交易成功");
					}else if(formData.ABEND == "MORE"){
						form.setFieldValue("U_ErrorMemo", "資料待續查");
					}*/
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c10cc4a230"}).data; // TBB-BSIH回應碼
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					if (!(ret.form.ABEND == "OKLR" || ret.form.ABEND == "0000")) {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
						bar.close();
						return;
					} else {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
					}
					
					//轉帳銀行處理
					var ACHRTNMBR = formData.ACHRTNMBR;
					if(ACHRTNMBR != "") {
						if(ACHRTNMBR != "000000000" && ACHRTNMBR != "000000050") { //當轉帳銀行不為未申請或臺灣企銀時
							//ACHRTNMBR = ACHRTNMBR.substring(3,6);
							ACHRTNMBR = ACHRTNMBR.substring(2,5); //2021.03.30-gemfor/Emma-修改取值位置
						}
					} 
					
					var Old_ALTBLKCODE = formData.ALTBLKCODE  
		                    Old_ALTBLKCODERet = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c2b44f8290"}).data; // 轉換為舊控管碼字典呈現 -- 20211004 Wolf
		                    for (var m = 0; m < Old_ALTBLKCODERet.length; m++) {
		                        if (Old_ALTBLKCODERet[m].value == Old_ALTBLKCODE) {
		                            Old_ALTBLKCODE = Old_ALTBLKCODERet[m].text;
		                        }
					}
					
					form.setFieldValue("U_OCardNum", formData.CARDNUM);					//卡號
					form.setFieldValue("U_OCardType", formData.TYPE);					//卡別
					form.setFieldValue("U_Cname", formData.SHORTNAME);					//中文姓名
					form.setFieldValue("U_UID", formData.ALPHAKEY);						//身分證字號
					form.setFieldValue("U_Birthday", formData.BIRTHDTE);				//出生年月日
					form.setFieldValue("U_Billprint", formData.CYCLE);					//帳單列印日
					form.setFieldValue("U_AuditorNo", formData.OFFICER);				//稽核員代號
					form.setFieldValue("U_BranchNo", formData.DOMBRANCH);				//分行代號
					form.setFieldValue("U_Controlcode", formData.BLKCODE);				//控管碼
					form.setFieldValue("U_Controlcodedate", formData.BLKCODEDTE);		//控管碼日期
					//form.setFieldValue("U_OControlcode", formData.ALTBLKCODE);			//舊控管碼  //gemfor/emily20210930
					//document.getElementsByName("U_OControlcode")[0].children[1].children[0].innerHTML = '<input value = "' + formData.ALTBLKCODE + '" readonly="readonly">';
					document.getElementsByName("U_OControlcode")[0].children[1].children[0].innerHTML = '<input value = "' + Old_ALTBLKCODE + '" readonly="readonly" style = "background-color: transparent; border: 0;">';
					form.setFieldValue("U_OControlcodedate", formData.ALTBLKCODEDTE);	//舊控管碼日期
					form.setFieldValue("U_Maintaindate", formData.MAINTDTE);			//最近維護日期
					form.setFieldValue("U_Account", formData.ACHDBNMBR);				//帳號
					form.setFieldValue("U_Withhold", formData.COLLCODE);				//扣繳額度
					form.setFieldValue("U_Corporate", formData.CORPACCTNMBR);			//公司戶
					form.setFieldValue("U_Billing", formData.DUPSTMTACCT);				//帳單加寄
					form.setFieldValue("U_Cardapproval", formData.OPENDTE);				//信用卡核準日
					form.setFieldValue("U_Cardexpirydate", EXPIRDTE);					//卡片到期日
					form.setFieldValue("U_Cardmakingday", formData.LSTREQDTE);			//最近製卡日
					form.setFieldValue("U_Dailycashadvance", formData.CSHADVLIM);		//每日預現額
					form.setFieldValue("U_Ename", formData.EMBOSNAME);					//持卡人英文姓名
					form.setFieldValue("U_Cellphone", formData.EMBOSMOBILE);			//持卡人手機聯絡號碼
					form.setFieldValue("U_Email", formData.EMBOSEMAIL);					//持卡人Email信箱
					form.setFieldValue("U_Savacct", formData.SAVACCT);					//升等前卡號
					form.setFieldValue("U_Collectionaccount", formData.COLLACCT);		//催收帳號
					form.setFieldValue("U_Newcard", formData.NEWCARDNMBR);				//新卡卡號
					form.setFieldValue("U_Neweffect", formData.NEWCARDDTE);				//轉卡生效日期
					//form.setFieldValue("U_ACHRTNMBR", formData.ACHRTNMBR);				//轉帳銀行
					form.setFieldValue("U_ACHRTNMBR",ACHRTNMBR);				//轉帳銀行
					form.setFieldValue("U_Custnmbr", formData.CUSTNMBR);				//正卡人ID
					//20220110新增欄位
					form.setFieldValue("U_PostAcct", formData.POSTACCT);				//主帳號
					form.setFieldValue("U_CSHLIMIT", formData.CSHLIMIT);				//預現額度
					var CURRDUE = UCardinformationForm.doAmount(formData.CURRDUE);
					form.setFieldValue("U_CURRDUE", formData.CURRDUESIGN + CURRDUE);				//本期應繳
					form.setFieldValue("U_RIOPT", formData.RIOPT);				//購貨帳款利息免除註記
					form.setFieldValue("U_CIOPT", formData.CIOPT);				//預借現金利息免除註記
					form.setFieldValue("U_LATECHGOPT", formData.LATECHGOPT);				//延遲繳款違約金免除註記
					
					//2022.03.30-gemfor/Emma-稽核員代號
					var OFFICER = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f203-3805-17c2b76ecae0"}).data;
					for (var i = 0; i < OFFICER.length; i++) {
						if (OFFICER[i].value == formData.OFFICER) {
							form.setFieldValue("U_AuditorNo", OFFICER[i].text);
							break;
						}
					}
					
					//分行代號說明
					var DOMBRANCH = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-6813-0e0c-17a2f35ca5d0"}).data;
					for (var i = 0; i < DOMBRANCH.length; i++) {
						if (DOMBRANCH[i].value == formData.DOMBRANCH.substr(2, 3)) {
							form.setFieldValue("U_BranchNops", formData.DOMBRANCH.substr(2, 3), DOMBRANCH[i].text);
							break;
						}
					}
					
					//帳戶別
					var POSTFLG = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F7533-D830-0F8C-40B2-9201392884CE"}).data;
					for (var i = 0; i < POSTFLG.length; i++) {
						if (POSTFLG[i].value == formData.POSTFLG) {
							form.setFieldValue("U_Accounttype", formData.POSTFLG, POSTFLG[i].text);
							break;
						}
					}
					
					//繳款方式
					var PYMTFLG = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F754C-0DC0-0F8C-40B2-9201392884CE"}).data;
					for (var i = 0; i < PYMTFLG.length; i++) {
						if (PYMTFLG[i].value == formData.PYMTFLG) {
							form.setFieldValue("U_Payment", formData.PYMTFLG, PYMTFLG[i].text);
							break;
						}
					}
					
					//客戶屬性
					var OWNSHIPFLG = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F7558-9BD0-0F8C-40B2-9201392884CE"}).data;
					for (var i = 0; i < OWNSHIPFLG.length; i++) {
						if (OWNSHIPFLG[i].value == formData.OWNSHIPFLG) {
							form.setFieldValue("U_Cusattributes", formData.OWNSHIPFLG, OWNSHIPFLG[i].text);
							break;
						}
					}
					
					//PA
					var CARDPREVACT = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F7568-9D70-0F8C-40B2-9201392884CE"}).data;
					for (var i = 0; i < CARDPREVACT.length; i++) {
						if (CARDPREVACT[i].value == formData.CARDPREVACT) {
							form.setFieldValue("U_PA", formData.CARDPREVACT, CARDPREVACT[i].text);
							break;
						}
					}
					
					//催收
					var COLLFLG = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "17800317-2930-047C-7A6C-9201392884CE"}).data;
					for (var i = 0; i < COLLFLG.length; i++) {
						if (COLLFLG[i].value == formData.COLLFLG) {
							form.setFieldValue("U_Collection", formData.COLLFLG, COLLFLG[i].text);
							break;
						}
					}
					
					//TYPE
					var CARDTYP = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "17800506-B440-0344-3FE7-005056C00008"}).data;
					for (var i = 0; i < CARDTYP.length; i++) {
						if (CARDTYP[i].value == formData.CARDTYP) {
							form.setFieldValue("U_Type", formData.CARDTYP, CARDTYP[i].text);
							break;
						}
					}
					
					//信用卡取卡方式
					var CHKACCT = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F7577-B0A0-0F8C-40B2-9201392884CE"}).data;
					for (var i = 0; i < CHKACCT.length; i++) {
						if (CHKACCT[i].value == formData.CHKACCT.substr(0, 1)) {
							form.setFieldValue("U_Ddaacct", formData.CHKACCT.substr(0, 1), CHKACCT[i].text);
							break;
						}
					}
					
					//購貨-基本率
					var RTLRATE = formData.RTLRATE;
					RTLRATE = RTLRATE.replace(/\s*/g,"");
					if(RTLRATE != null && RTLRATE != ""){
						RTLRATE = RTLRATE.substr(0, 2) + "." + (RTLRATE.substr(2, 5)).replace(/0+$/, '') + "%";
						form.setFieldValue("U_Purchase", RTLRATE);
					}
					
					//預現-基本率
					var CSHRATE = formData.CSHRATE;
					CSHRATE = CSHRATE.replace(/\s*/g,"");
					if(CSHRATE != null && CSHRATE != ""){
						CSHRATE = CSHRATE.substr(0, 2) + "." + (CSHRATE.substr(2, 5)).replace(/0+$/, '') + "%";
						form.setFieldValue("U_Advance", CSHRATE);
					}
					
					
					
					var U_O_Data1 = [];					//用來將電文取回且整理好的值塞入網格
					var U_O_Data2 = [];					//用來將電文取回且整理好的值塞入網格
					var U_O_Data3 = [];					//用來將電文取回且整理好的值塞入網格
					var U_O_Data4 = [];					//用來將電文取回且整理好的值塞入網格
					
					//取 TBB-信用卡卡片狀態查詢-繳款評等 字典
					var DELQ = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "2EDA0929-0C00-9C71-8308-17A37C9B6270"}).data;
					
					//最近24個月繳款評等01-06
					var DELQ6_format = [];
					var DELQ6_text = [];
					var DELQ6 = formData.DELQ6;
					DELQ6_format = DELQ6.split("");
					
					for(var j = 0; j < DELQ6_format.length; j++){
						for (var i = 0; i < DELQ.length; i++) {
							if (DELQ[i].value == DELQ6_format[j]) {
								DELQ6_text[j] = DELQ[i].text;
								break;
							}
						}
					}
					
					var data1 = {
							"U_Delq01"	: DELQ6_text[0],
							"U_Delq02"	: DELQ6_text[1],
							"U_Delq03" 	: DELQ6_text[2],
							"U_Delq04"	: DELQ6_text[3],
							"U_Delq05"	: DELQ6_text[4],
							"U_Delq06"	: DELQ6_text[5]
					} 
					U_O_Data1.push(data1);
					form.getControl("U_Rating0106").setValue(U_O_Data1);
					
					//最近24個月繳款評等07-12
					var DELQ12_format = [];
					var DELQ12_text = [];
					var DELQ12 = formData.DELQ12;
					DELQ12_format = DELQ12.split("");
					
					for(var j = 0; j < DELQ12_format.length; j++){
						for (var i = 0; i < DELQ.length; i++) {
							if (DELQ[i].value == DELQ12_format[j]) {
								DELQ12_text[j] = DELQ[i].text;
								break;
							}
						}
					}
					
					var data2 = {
							"U_Delq07"	: DELQ12_text[0],
							"U_Delq08"	: DELQ12_text[1],
							"U_Delq09" 	: DELQ12_text[2],
							"U_Delq10"	: DELQ12_text[3],
							"U_Delq11"	: DELQ12_text[4],
							"U_Delq12"	: DELQ12_text[5]
					} 
					U_O_Data2.push(data2);
					form.getControl("U_Rating0712").setValue(U_O_Data2);
					
					//最近24個月繳款評等13-18
					var DELQ18_format = [];
					var DELQ18_text = [];
					var DELQ18 = formData.DELQ18;
					DELQ18_format = DELQ18.split("");
					
					for(var j = 0; j < DELQ18_format.length; j++){
						for (var i = 0; i < DELQ.length; i++) {
							if (DELQ[i].value == DELQ18_format[j]) {
								DELQ18_text[j] = DELQ[i].text;
								break;
							}
						}
					}
					
					var data3 = {
							"U_Delq13"	: DELQ18_text[0],
							"U_Delq14"	: DELQ18_text[1],
							"U_Delq15" 	: DELQ18_text[2],
							"U_Delq16"	: DELQ18_text[3],
							"U_Delq17"	: DELQ18_text[4],
							"U_Delq18"	: DELQ18_text[5]
					} 
					U_O_Data3.push(data3);
					form.getControl("U_Rating1318").setValue(U_O_Data3);
					
					//最近24個月繳款評等19-24
					var DELQ24_format = [];
					var DELQ24_text = [];
					var DELQ24 = formData.DELQ24;
					DELQ24_format = DELQ24.split("");
					
					for(var j = 0; j < DELQ24_format.length; j++){
						for (var i = 0; i < DELQ.length; i++) {
							if (DELQ[i].value == DELQ24_format[j]) {
								DELQ24_text[j] = DELQ[i].text;
								break;
							}
						}
					}
					
					var data4 = {
							"U_Delq19"	: DELQ24_text[0],
							"U_Delq20"	: DELQ24_text[1],
							"U_Delq21" 	: DELQ24_text[2],
							"U_Delq22"	: DELQ24_text[3],
							"U_Delq23"	: DELQ24_text[4],
							"U_Delq24"	: DELQ24_text[5]
					} 
					//U_O_Data3.push(data4);
					U_O_Data4.push(data4); //Emma -修正帶入的值-20220307
					form.getControl("U_Rating1924").setValue(U_O_Data4);
					UCardinformationForm.doR001();//20221121 ai3 Jason.Fang
					UCardinformationForm.doR003();//20221121 ai3 Jason.Fang
					bar.close();
				} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
				}
				}, 1 * 1000);
			});
		},
		
		doR001:function (){
			console.log("進入R001");
		if (!form.validate()) {
			return;
		}
		var cusid = form.getFieldValue("U_UID");//客戶ID
		var cardtyp = form.getFieldValue("U_OCardType");
		UCardinformationForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		UCardinformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "c7bfb856-5000-197b-330b-1849cfb05ab0"}).data; // TBB-對應卡別
		var cardtxt = form.getFieldValue("U_OCardType");
		for (var i = 0; i < codeDic.length; i++) {
			if (codeDic[i].value == cardtxt) {
				cardtxt = codeDic[i].text;
				break;
			}
		}
		var data = {
	        "TXID": "R001",
			"CUSID" : cusid, // 身分證
			"CARDTYP" : cardtxt,//卡別
		};
		var args = JSON.stringify({
			"name" : "R001tbbapi",
			"from" : "CSR",
			"sessionId" : UCardinformationForm.sessionId,
			"agentId" 	: UCardinformationForm.agentId,
			"formData" : data,	
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("R001發送電文失敗，詳情請洽資訊處！");
                return;
			}
			 if (ret.isSuccess) {
				 if (ret.isSuccess == true) {
					console.log("電文資料OK");
					var formData = ret.form;
					form.setFieldValue("U_EmployeeCode", formData.EMPNO);	//招攬員工代號
								
				}else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			 }
 
			});
		},
		
		doR003:function (){
			console.log("進入R003");
		if (!form.validate()) {
			return;
		}
		
		UCardinformationForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		UCardinformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R003",
			"CARDNUM"	: form.getFieldValue("U_CardNum")
		};
		var args = JSON.stringify({
			"name" : "R003tbbapi",
			"from" : "CSR",
			"sessionId" : UCardinformationForm.sessionId,
			"agentId" 	: UCardinformationForm.agentId,
			"formData" : data,	
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
			if (ret == undefined) {
                Jui.message.alert("R003發送電文失敗，詳情請洽資訊處！");
                return;
			}
			 if (ret.isSuccess) {
				 if (ret.isSuccess == true) {
					console.log("電文資料OK");
					var formData = ret.form;
					form.setFieldValue("U_OutsourcingNote", formData.ENT_FLAG);	//委外註記
					form.setFieldValue("U_UnitCode", formData.ENT_ID);	//委外單位代號
								
				}else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					return;
				}
			 }
 
			});
		},
		
		//後兩位加上小數點+千分位
		doAmount:function (num){
			var str = parseInt(num).toString();
			if(str){
				if(str.length>=3){
					amount= str.substr(0,str.length-2)+'.'+str.substr(str.length-2);   
				}else if(str.length==2){
					amount= '0.'+str.substr(str.length-2);
				}else if(str.length==1){
					amount= '0.0'+str;
				}
				return TBBUtil.thousandComma(amount);
			}else{
				return str;
			}
		}
}