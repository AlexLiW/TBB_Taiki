/********************************************************************************
	 金融卡發卡主檔
	 * Author: 			gemfor\Lillian
	 * CreateDate: 		2021.06.09
	 * LastUpdateUser: gemfor\emma.lu
	 * LastUpdateDate: 2022/3/7
	 * Note: 新增A004電文 取回「全行收付(PHPW)」、「消費扣款每日限額(AOPLMT)」、「簽帳卡每日限額(AODLMT)」
					2021/10/18  Wolf 移除需要先查詢才能點擊約定轉帳帳號查詢的邏輯
					2021/11/01  Wolf  針對按鈕 簽帳卡暫停/解除暫停刷卡註記 及 金融卡發卡歷史查詢 調整防呆條件與提示內容
					2022/1/13 Wolf 新增查詢附屬帳號按鈕、調整發卡歷史查詢網格順序
					2022/02/11 lillian 欄位缺少「卡別」、「信用卡卡號」，新增欄位在發卡主檔明細檔。
					2022/02/16 lillian
						1."簽帳卡暫停刷卡註記"改取A004電文欄位"AODSTS"，電文下行只會回傳" "、"U"。
						2.A004電文欄位"簽帳卡暫停刷卡註記" 回來為 " " 時直接丟入欄位內，電文回來為"U"時則轉換為中文"暫停"。
					2022/3/4 Emma 修改doInquire、doInquire2、doA001、doA001、doA012內分組名稱「金融卡發卡明細查詢」→「金融卡發卡明細檔」
					2022/3/7 Emma 1. doA001:帳戶管理行改抓字典的值 2. doA004:全行代付改文中文顯示 3. 新增:getDicText 取字典的值
					2022/3/11 Emma doA007 : 附屬帳號網格
					2022/11/2 Olivia doA015 : 悠遊 DEBIT 卡外顯卡號檔
******************************************************s***************************/
var UATMCardDetailForm = {
		doLoad : function(){
			UATMCardDetailForm.doChange();
			
			//如果是從"存款帳戶總覽查詢"打開時，如果帳號有資料，就帶入。
			if ("U_ACN" in clientData.urlArgs) {
				form.setFieldValue("U_ACNO", clientData.urlArgs.U_ACN);
			}
			//20210917 Yuwen.Wang 新增「約定轉帳帳號檔查詢(U_Inquiry4)」按鈕設定
			form.getControl("U_Inquiry4").setElementStyle("width: 90%");	//設定按鈕大小
			document.getElementsByName("U_Inquiry4")[0].style.width = "290px";
			document.getElementsByName("U_Inquiry4")[0].style.paddingLeft = "8px";
			
			form.getControl("U_Inquiry3").setElementStyle("width: 90%");	//設定按鈕大小
			document.getElementsByName("U_Inquiry3")[0].style.width = "290px";
			document.getElementsByName("U_Inquiry3")[0].style.paddingLeft = "8px";
			
			form.getControl("U_Inquiry2").setElementStyle("width: 90%");	//設定按鈕大小
			document.getElementsByName("U_Inquiry2")[0].style.width = "290px";
			document.getElementsByName("U_Inquiry2")[0].style.paddingLeft = "8px";
			
			form.getControl("U_Inquiry5").setElementStyle("width: 100%");	//設定按鈕大小
			document.getElementsByName("U_Inquiry2")[0].style.width = "290px";
			document.getElementsByName("U_Inquiry2")[0].style.paddingLeft = "8px";
			
			form.setFieldTitle("U_Inquiry", null);						//隱藏按鈕標題
			form.getControl("U_Inquiry").setElementStyle("width: 30%");	//設定按鈕大小
			form.setFieldTitle("U_Inquiry2", null);						//隱藏按鈕標題
			form.setFieldTitle("U_Inquiry3", null);						//隱藏按鈕標題
			//20210917 Yuwen.Wang 新增「約定轉帳帳號檔查詢」按鈕設定
			form.setFieldTitle("U_Inquiry4", null);						//隱藏按鈕標題
			
			//「附屬帳號」按鈕設定
			form.setFieldTitle("U_Inquiry5", null);						//隱藏按鈕標題
			form.setFieldTitle("U_A007Grid", null);
			form.setFieldTitle("U_A007Grid", null);
			form.setFieldVisible("U_A007Grid",false);
			
			form.getControl("U_Inquiry2").setElementStyle("margin-top: 30px; margin-bottom: 20px;"); //'金融卡發卡歷史查詢' 按鈕 與上下間個距離增加
			form.getControl("U_Inquiry3").setElementStyle("margin-top: 30px; margin-bottom: 20px;"); //'簽帳卡暫停/解除暫停刷卡註記' 按鈕 與上下間個距離增加
			//20210917 Yuwen.Wang 新增「約定轉帳帳號檔查詢」按鈕設定
			form.getControl("U_Inquiry4").setElementStyle("margin-top: 30px; margin-bottom: 20px;"); //'約定轉帳帳號檔查詢' 按鈕 與上下間個距離增加
			
			//隱藏網格標題
			form.setFieldTitle("U_A011Grid", null);
			form.setFieldTitle("U_A012Grid", null);
		},
		
		doChange : function(){
			form.getControl("U_Inquiry").onclick = function() {
				UATMCardDetailForm.doInquire();
			};
			
			form.getControl("U_Inquiry2").onclick = function() {
				UATMCardDetailForm.doInquire2();
			};
			
			form.getControl("U_Inquiry3").onclick = function() {
				UATMCardDetailForm.doInquire3();
			};
			//20210917 Yuwen.Wang 新增「約定轉帳帳號檔查詢(U_Inquiry4)」觸發動作
			form.getControl("U_Inquiry4").onclick = function() {
				UATMCardDetailForm.openTBBForm("TBB.UPreDesignateAC.Form");
			};
			
			form.getControl("U_Inquiry5").onclick = function() {
				UATMCardDetailForm.doInquire5();
			};
			
		},
		
		doInquire : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			//2021.09.27-gemfor/lillian-提示訊息改跳中間
			if(U_ACNO == "" || U_ACNO == null){
				Jui.message.alert("請填寫「帳號」");
				return;
			}
			
			//清空查詢結果欄位
			TBBUtil.doClearFields("查詢結果", null, null);
			TBBUtil.doClearFields("金融卡發卡歷史查詢", null, null);
			//TBBUtil.doClearFields("金融卡發卡明細查詢", null, null);
			TBBUtil.doClearFields("金融卡發卡明細檔", null, null); // Emma-修正分組名稱-20220304
			TBBUtil.doClearFields("附屬帳號", null, null);
			form.setFieldVisible("U_A007Grid",false);
			
			//2021.09.27-gemfor/lillian-檢核帳號是否輸入11碼
			if(U_ACNO.length != 11){
				Jui.message.alert("「帳號」請輸入11碼！");
				form.setFieldValue("U_ACNO", null); 
			}else{
				UATMCardDetailForm.doS601();
				UATMCardDetailForm.doA001();
				UATMCardDetailForm.doA004();//20210928 Chainsea/Yuwen 新增A004電文 取回「全行收付(PHPW)」、「消費扣款每日限額(AOPLMT)」、「簽帳卡每日限額(AODLMT)」
			}
		},
		
		//2021.11.01  Wolf  針對 金融卡發卡歷史查詢 調整防呆條件與提示內容
		doInquire2 : function(){
			var ACNO = form.getFieldValue("U_ACNO"); //取得帳號
			var U_VSDBYN = form.getFieldValue("U_VSDBYN");
			//if(U_VSDBYN == "" || U_VSDBYN == null){ 
			if (ACNO == "" || ACNO == null) {
				Jui.message.alert("請先點選「查詢」取得金融卡發卡主檔資料！");
				return;
			}
			if (!form.validate()) {
				return;
			}
			
			TBBUtil.doClearFields("金融卡發卡歷史查詢", null, null);
			//TBBUtil.doClearFields("金融卡發卡明細查詢", null, null);
			TBBUtil.doClearFields("金融卡發卡明細檔", null, null); // Emma-修正分組名稱-20220304
			
			UATMCardDetailForm.doA011();
		},
		//2021.11.01  Wolf  針對按鈕 簽帳卡暫停/解除暫停刷卡註記 調整防呆條件與提示內容		
		doInquire3 : function(){
			var ACNO = form.getFieldValue("U_ACNO"); //取得帳號
			var U_VSDBYN = form.getFieldValue("U_VSDBYN");
			//if(U_VSDBYN == "" || U_VSDBYN == null) {
			if (ACNO == "" || ACNO == null) {
				Jui.message.alert("請先點選「查詢」取得金融卡發卡主檔資料！");
				return;
			}
			
			/*2022.02.16-lillian-改為不做任何阻擋
			if(U_VSDBYN == "" || U_VSDBYN == null) {
				Jui.message.alert("簽帳卡功能生效註記資料不存在！");
				return;
			}*/
			
			if (!form.validate()) {
				return;
			}
			
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			//簽帳卡功能生效註記--old
			/*if(U_VSDBYN == "Y"){
				var VSDBYN = "無暫停";
				var VSDBYN_act = "暫停";
				var VSDBYN_value = "01";
				var VSDBYN_OK = "暫停";
				var VSDBYN_OK_value = "N";
			}else if(U_VSDBYN == "N"){
				var VSDBYN = "暫停";
				var VSDBYN_act = "解除暫停";
				var VSDBYN_value = "02";
				var VSDBYN_OK = "無暫停";
				var VSDBYN_OK_value = "Y";
			}*/
			
			//簽帳卡暫停刷卡註記--2022.02.16-lillian-修正
			if(U_VSDBYN == "" || U_VSDBYN == " " || U_VSDBYN == null){
				var VSDBYN = "無暫停";
				var VSDBYN_act = "暫停";
				var VSDBYN_value = "01";
				var VSDBYN_OK = "暫停";
			}else if(U_VSDBYN == "暫停"){
				var VSDBYN = "暫停";
				var VSDBYN_act = "解除暫停";
				var VSDBYN_value = "02";
				var VSDBYN_OK = " ";
			}else{
				Jui.message.alert("無法辨認[簽帳卡暫停刷卡註記]狀態，詳情請洽資訊處！");
				return;
			}
					
			var data = {
					"TXACN" : U_ACNO,
					"TXSEL" : VSDBYN_value
			};
					
			var args = JSON.stringify({
				"name" 		: "A010tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
				"formData" 	: data
			});
					
			Jui.message.confirm("簽帳卡帳號："+ U_ACNO + "\n\r目前狀態：" + VSDBYN + "\n\r確定執行簽帳卡「" + VSDBYN_act + "」刷卡註記？", function(){
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
							var formData = ret.form;	//取回傳資料
							
							if(formData.ABEND == "OKLR"){
								var ABEND_Explain = "最後一筆資料";
							}else if(formData.ABEND == "EACC"){
								var ABEND_Explain = "帳號有誤";
							}else if(formData.ABEND == "ERDB"){
								var ABEND_Explain = "中心檔案有誤";
							}else if(formData.ABEND == "ENRD"){
								var ABEND_Explain = "無資料";
							}
							
							form.setFieldValue("U_Result", formData.ABEND);				//交易結果-刷卡註記
							form.setFieldValue("U_ResultExplain", ABEND_Explain);		//交易結果-刷卡註記
							//form.setFieldValue("U_VSDBYN", VSDBYN_OK_value, VSDBYN_OK);	//簽帳卡功能生效註記 變更狀態
							form.setFieldValue("U_VSDBYN", VSDBYN_OK);	//簽帳卡暫停刷卡註記 變更狀態--2022.02.16--lillian--修正
							bar.close();
						} else {
							Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
							bar.close();
							return;
						}	  
					}, 1 * 1000);
				});
			});
		},
		
		doInquire5 : function(){
			var ACNO = form.getFieldValue("U_ACNO"); //取得帳號
			
			TBBUtil.doClearFields("附屬帳號", null, null);	//清空網格
			form.setFieldVisible("U_A007Grid", false);		//隱藏網格
			
			if (ACNO == "" || ACNO == null) {
				Jui.message.alert("請先點選「查詢」取得金融卡發卡主檔資料！");
				return;
			}
			if (!form.validate()) {
				return;
			}
			UATMCardDetailForm.doA007(); //待開發建立
		},
		
		//20210917 Yuwen.Wang 新增「約定轉帳帳號檔查詢」按鈕觸發的function
		openTBBForm : function(pageCode){
			/* //20211018 Ai.Wolf 移除需要先查詢才能點擊約定轉帳帳號查詢的邏輯
			var U_UID = form.getFieldValue("U_UID");
			if(U_UID == "" || U_UID == null){
				Jui.message.alert("請先點選「查詢」取得金融卡發卡主檔資料！");
				return;
			}
			if (!form.validate()) {
				return;
			}*/
			 var args = {
				//U_ACNO : form.getFieldValue("U_UID") // 身分證字號
				U_ACNO : form.getFieldValue("U_ACNO") 	//2021.09.23-gemfor/lillian-此處為傳遞帳號
			};
			
			var options = {
				width: 1685,
                height: 740
			};

			Utility.openDialog(pageCode + ".page", args, options);
		},
		
		doA001 : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"TXACN" 		: U_ACNO, 	//帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "A001tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
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
						form.setFieldValue("U_UID", formData.CUSIDN11);		//身分證字號
						form.setFieldValue("U_CardNo", formData.SEQCRD);	//使用中卡片號碼
						form.setFieldValue("U_CardNum", formData.CRDNUM);	//使用中卡號
						
						//狀況碼
						var STSCOD = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f19b4-72e0-04c3-1937-d8f2cab1cb50"}).data;
						for (var i = 0; i < STSCOD.length; i++) {
							if (STSCOD[i].value == formData.STSCOD) {
								form.setFieldValue("U_Status", formData.STSCOD, STSCOD[i].text);
								break;
							}
						}
						
						//是否申請約定轉帳
						var isApply = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dd91b-0ec0-01dd-2e61-d8f2cab1cb50"}).data;
						for (var i = 0; i < isApply.length; i++) {
							if (isApply[i].value == formData.TRINFG) {
								form.setFieldValue("U_IsApplyTrans", formData.TRINFG, isApply[i].text);
								break;
							}
						}
						
						//是否申請小額非約定轉帳
						for (var i = 0; i < isApply.length; i++) {
							if (isApply[i].value == formData.TROUFG) {
								form.setFieldValue("U_IsApplyNoDep", formData.TROUFG, isApply[i].text);
								break;
							}
						}
						
						//是否申請跨國提款
						for (var i = 0; i < isApply.length; i++) {
							if (isApply[i].value == formData.FWITYN) {
								form.setFieldValue("U_ApplyInDraw", formData.FWITYN, isApply[i].text);
								break;
							}
						}
						
						form.setFieldValue("U_TRINCT", formData.TRINCT);	//第二軌密碼尚可打錯次數
						form.setFieldValue("U_PINCNT", formData.PINCNT);	//薪轉戶網路轉帳已享次數
						form.setFieldValue("U_ABAVCT", formData.ABAVCT);	//跨提可享免付手續費次數
						form.setFieldValue("U_ABUSCT", formData.ABUSCT);	//跨提己享免付手續費次數
						form.setFieldValue("U_MEGECT", formData.MEGECT);	//合併優惠可享次數
						form.setFieldValue("U_ABAVCTX", formData.ABAVCTX);	//跨轉可享免付手續費次數
						form.setFieldValue("U_ABUSCTX", formData.ABUSCTX);	//跨轉已享免付手續費次數
						form.setFieldValue("U_GRPCOD", formData.GRPCOD);	//組別
						
						var EXPYM = formData.EXPYM.substr(0, 3) + "/" + formData.EXPYM.substr(3, 2)
						form.setFieldValue("U_EndYM", EXPYM);				//優惠到期年月
						
						var VSEXPYM = formData.VSEXPYM.substr(0, 2) + "/" + formData.VSEXPYM.substr(2, 2)
						form.setFieldValue("U_VSEXPYM", VSEXPYM);			//簽帳卡有效年月
						
						/* 2022-02-16-lillian-"簽帳卡暫停刷卡註記"改取A004電文欄位"AODSTS"，電文下行只會回傳" "、"U"，取消字典，
						 * 改為A004電文欄位"簽帳卡暫停刷卡註記" 回來為 " " 時直接丟入欄位內，電文回來為"U"時則轉換為中文"暫停"。。
						//簽帳卡功能生效註記
						var VSDBYN = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "2eda0929-0c00-e960-be0e-179efa636870"}).data;
						for (var i = 0; i < VSDBYN.length; i++) {
							if (VSDBYN[i].value == formData.VSDBYN) {
								form.setFieldValue("U_VSDBYN", formData.VSDBYN, VSDBYN[i].text);
								break;
							}
						}*/
						
						//是晶片金融卡與否
						var SMART_value = formData.SMART;
						if(SMART_value == "" || SMART_value == null){
							SMART_value = "0";
						}
						var SMART = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177dd944-e9e0-01dd-2e61-d8f2cab1cb50"}).data;
						for (var i = 0; i < SMART.length; i++) {
							if (SMART[i].value == SMART_value) {
								form.setFieldValue("U_SMART", SMART_value, SMART[i].text);
								break;
							}
						}
						form.setFieldValue("U_PACNO", formData.SAGCNT);		//附屬帳號個數
						form.setFieldValue("U_ABKEYTP", formData.ABKEYTP);	//小額首次免費
						//Emma-帳戶管理行顯示分行號+分行中文-20220307
						var bankNoDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-f40d-c207-17c0b9154140"}).data;
						var BRHACC=UATMCardDetailForm.getDicText(bankNoDic, formData.BRHACC);
						//form.setFieldValue("U_BRHACC", formData.BRHACC);	//帳戶管理行
						form.setFieldValue("U_BRHACC", BRHACC);	//帳戶管理行
						bar.close();
					}else{
						//2021.09.27-gemfor/lillian-清空查詢結果欄位
						TBBUtil.doClearFields("查詢結果", null, null);
						TBBUtil.doClearFields("金融卡發卡歷史查詢", null, null);
						//TBBUtil.doClearFields("金融卡發卡明細查詢", null, null);
						TBBUtil.doClearFields("金融卡發卡明細檔", null, null); // Emma-修正分組名稱-20220304
						Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
						bar.close();
						return;
					}
				} else {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
				}, 1 * 1000);
			});
		},
		
		doS601 : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ACN" 		: U_ACNO, 		//帳號
					"CUSIDN"	: "",
					"TYPE"		: "01"
			};
			
			var args = JSON.stringify({
				"name" 		: "S601tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
				"formData" 	: data
			});
			
			var bar = Jui.message.progress(function() {
											 
                Jui.message.hint("查詢資料中，請稍後...");
            });
			
			TBBUtil.doPost(JSON.parse(args), function(ret) {
				console.log(ret);
				setTimeout(function() {
					if (ret == undefined) {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");																							  
						bar.close();
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
							form.setFieldValue("U_FUserId", formData.NAME);		//姓名
							bar.close();
						}else{
							//2021.09.27-gemfor/lillian-清空查詢結果欄位
							TBBUtil.doClearFields("查詢結果", null, null);
							TBBUtil.doClearFields("金融卡發卡歷史查詢", null, null);
							//TBBUtil.doClearFields("金融卡發卡明細查詢", null, null);
							TBBUtil.doClearFields("金融卡發卡明細檔", null, null); // Emma-修正分組名稱-20220304
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}	 
				}, 1 * 1000);
			});
		},
		//20210928 Yuwen 新增A004電文的function
		doA004 : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ACN" 		: U_ACNO, 		//帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "A004tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
				"formData" 	: data
			});
			
			var bar = Jui.message.progress(function() {
											 
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
						var formData = ret.form;							//取回傳資料
						//form.setFieldValue("U_PHPW", formData.PHPW);		//全行收付
						//Emma-全行收付改為中文顯示-20220307
						if(formData.PHPW=="Y"){
							form.setFieldValue("U_PHPW", "是");		//全行收付
						}else if(formData.PHPW=="N"){
							form.setFieldValue("U_PHPW", "否");		//全行收付
						}
						form.setFieldValue("U_AOPLMT", formData.AOPLMT);	//消費扣款每日限額
						form.setFieldValue("U_AODLMT", formData.AODLMT);	//簽帳卡每日限額
						form.setFieldValue("U_SABCOD", formData.SABCOD); 	//卡別
						form.setFieldValue("U_CARDNO_2", formData.CARDNO); 	//卡號
						//簽帳卡暫停刷卡註記
						form.setFieldValue("U_VSDBYN", (formData.AODSTS == "U" ? "暫停" : formData.AODSTS));
						bar.close();
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
					
				}, 1 * 1000);
			});
		},
		
		doA011 : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"ACN" 	: U_ACNO, 	//帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "A011tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
				"formData" 	: data
			});
			
			var bar = Jui.message.progress(function() {
											 
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
							var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
							var formData = ret.form;					//取回傳資料
							var REC_LEN = formData.REC.length; 			//看有幾筆資料
							
							for (var i = 0; i < REC_LEN; i++) {
								if (!Jui.object.isEmpty(formData.REC[i])) {
									//2021.09.29-grmfor/lillian-新增判斷如果是帶一堆空格視同無資料
									if(formData.REC[i].ODATAPL.replace(/\s+/g, '') != "" 
									//if(formData.REC[i].ACN.replace(/\s+/g, '') != "" || formData.REC[i].ODATAPL.replace(/\s+/g, '') != "" 
											|| formData.REC[i].ODATISU.replace(/\s+/g, '') != "" || formData.REC[i].ODATUSE.replace(/\s+/g, '') != ""
											|| formData.REC[i].OSEQCRD.replace(/\s+/g, '') != "" || formData.REC[i].OCRDNUM.replace(/\s+/g, '') != "" 
											|| formData.REC[i].OSEQREC.replace(/\s+/g, '') != "" || formData.REC[i].OSTSCOD.replace(/\s+/g, '') != ""){
										var OSTSCOD_name = "";
										//狀況碼
										var OSTSCOD = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177f19b4-72e0-04c3-1937-d8f2cab1cb50"}).data;
										for (var j = 0; j < OSTSCOD.length; j++) {
											if (OSTSCOD[j].value == formData.REC[i].OSTSCOD) {
												OSTSCOD_name = OSTSCOD[j].text;
												break;
											}
										}
		  
										if(formData.REC[i].ODATAPL != null && formData.REC[i].ODATAPL != ""){
											var ODATAPL = formData.REC[i].ODATAPL.substr(0, 3) + "/" + formData.REC[i].ODATAPL.substr(3, 2) + "/" + formData.REC[i].ODATAPL.substr(5, 2);	//時間格式重整
										}
										if(formData.REC[i].ODATISU != null && formData.REC[i].ODATISU != ""){							
											var ODATISU = formData.REC[i].ODATISU.substr(0, 3) + "/" + formData.REC[i].ODATISU.substr(3, 2) + "/" + formData.REC[i].ODATISU.substr(5, 2);	//時間格式重整
										}
										if(formData.REC[i].ODATUSE != null && formData.REC[i].ODATUSE != ""){
											var ODATUSE = formData.REC[i].ODATUSE.substr(0, 3) + "/" + formData.REC[i].ODATUSE.substr(3, 2) + "/" + formData.REC[i].ODATUSE.substr(5, 2);	//時間格式重整
										}
										var data = {
												"U_ACN"	: formData.ACN,
												"U_OSEQCRD"	: formData.REC[i].OSEQCRD,
												"U_OCRDNUM" : formData.REC[i].OCRDNUM,
												"U_OSEQREC"	: formData.REC[i].OSEQREC,
												"U_OSTSCOD"	: OSTSCOD_name,
												"U_ODATAPL"	: ODATAPL,
												"U_ODATISU"	: ODATISU,
												"U_ODATUSE"	: ODATUSE
										}
										U_O_Data.push(data);
									}
							 
								}
							}
							
							//2021.09.29-gemfor/lillian-依發卡順序排列
							U_O_Data = U_O_Data.sort(function(a,b){
								if(a.U_OCRDNUM > b.U_OCRDNUM){
									return 1;
								}else if(a.U_OCRDNUM < b.U_OCRDNUM){
									return -1;
								}else if(a.U_OCRDNUM == b.U_OCRDNUM){
									return 1;
								}
							});
							
							form.getControl("U_A011Grid").setValue(U_O_Data);
							bar.close();
						}else{
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}				  
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");																			 
						bar.close();
						return;
					}
	 
				}, 1 * 1000);
			});
		},
		
		doA012 : function(){
			if (!form.validate()) {
				return;
			}
			
			//TBBUtil.doClearFields("金融卡發卡明細查詢", null, null);
			TBBUtil.doClearFields("金融卡發卡明細檔", null, null); // Emma-修正分組名稱-20220304
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"TXACN" 	: form.getFieldValue("U_ACNO"), 								//帳號
					"TXSEQ"		: form.getControl("U_A011Grid").getEventRow().data.U_OSEQCRD	//卡號
			};
			
			var args = JSON.stringify({
				"name" 		: "A012tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
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
							var U_O_Data = [];																	//用來將電文取回且整理好的值塞入網格
							var formData = ret.form;															//取回傳資料
							
							//可否第三方行銷
							var OSALEYON_name = ""
							var OSALEYON = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "177F1ED4-C6A0-04C3-1937-D8F2CAB1CB50"}).data;
							for (var i = 0; i < OSALEYON.length; i++) {
								if (OSALEYON[i].value == formData.OSALEYON) {
									OSALEYON_name = OSALEYON[i].text;
									break;
								}
							}
							
							if(formData.ODATCNL != null && formData.ODATCNL != ""){
								var ODATAPL = formData.ODATCNL.substr(0, 3) + "/" + formData.ODATCNL.substr(3, 2) + "/" + formData.ODATCNL.substr(5, 2);	//時間格式重整
								if(formData.OTIMCNL != null && formData.OTIMCNL != ""){
									ODATAPL += " " + formData.OTIMCNL.substr(0, 2) + ":" + formData.OTIMCNL.substr(2, 2) + ":" + formData.OTIMCNL.substr(4, 2);
								}
							}
							
							if(formData.ODATLST != null && formData.ODATLST != ""){							
								var ODATLST = formData.ODATLST.substr(0, 3) + "/" + formData.ODATLST.substr(3, 2) + "/" + formData.ODATLST.substr(5, 2);	//時間格式重整
								if(formData.OTIMLST != null && formData.OTIMLST != ""){
									ODATLST += " " + formData.OTIMLST.substr(0, 2) + ":" + formData.OTIMLST.substr(2, 2) + ":" + formData.OTIMLST.substr(4, 2);
								}
							}
							
							//2022.02.10-lillian-新增卡別欄位
							var OMMACARD_name = ""
							if(formData.OMMACARD == " " || formData.OMMACARD == ""){
								OMMACARD_name = "一般卡"
							}else{
								var OMMACARD = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "2eda0929-0c00-7463-a90b-17ee2b90cf60"}).data;
								for (var i = 0; i < OMMACARD.length; i++) {
									if (OMMACARD[i].value == formData.OMMACARD) {
										OMMACARD_name = OMMACARD[i].text;
										break;
									}
								}
							}
							
							var data = {
									"U_OSAMDKEY"	: formData.OSAMDKEY,
									"U_OSALEYON"	: OSALEYON_name,
									"U_OTLRUSE" 	: formData.OTLRUSE,
									"U_ODATCNL"		: ODATAPL,
									"U_ODATLST"		: ODATLST,
									"U_OMMACARD"	: OMMACARD_name,		//2022.02.10-lillian-卡別
									"U_OCARDNO"		: formData.OCARDNO		//2022.02.10-lillian-新增信用卡卡號
							}
console.log(data);

							U_O_Data.push(data);
							//form.getControl("U_A012Grid").setValue(U_O_Data);
							form.getControl("U_A012Grid").loadData(U_O_Data.reverse());
							
							var U_OSAMDKEY = form.getControl("U_A012Grid").element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[2];
							U_OSAMDKEY.setAttribute("id", "osamdkey");
							U_OSAMDKEY.setAttribute("style", "color: #0040A0; cursor: default; text-decoration: underline;");
							
							var osamdkey = document.getElementById('osamdkey')
							var args = {
								"U_OSAMDKEY" : formData.OSAMDKEY
							};
							osamdkey.onclick = function(){
								Utility.openTab("CUS.ECTransaction.Form.page", args, "悠遊卡交易明細表單", "quicksilver/image/16/Query.gif", "悠遊卡交易明細表單", null, "true", {lock:false});
							};
							
							bar.close();
							
						}else{
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}
				}, 1 * 1000);
			});
		},
		
		doA007 : function(){
			var U_ACNO = form.getFieldValue("U_ACNO");
			
			UATMCardDetailForm.sessionId = Jui.random.nextUuid();
			var userId = CommonBusiness.getCurrentUser().userId;
			UATMCardDetailForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
			
			var data = {
					"TXACN" 		: U_ACNO, 		//帳號
			};
			
			var args = JSON.stringify({
				"name" 		: "A007tbbapi",
				"from" 		: "CSR",
				"sessionId" : UATMCardDetailForm.sessionId,
				"agentId" 	: UATMCardDetailForm.agentId,
				"formData" 	: data
			});
			
			var bar = Jui.message.progress(function() {
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
						let ABEND = ret.form.ABEND;					//電文回應代號
						var ABEND_text = "";
						//回應代碼抓字典項文字
						let ABEND_Dic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data;
						for (let i = 0; i < ABEND_Dic.length; i++) {
							if (ABEND_Dic[i].value == ABEND) {
								ABEND_text =  ABEND_Dic[i].text ? ABEND_Dic[i].text : ABEND ;
							}
						}
						if(ABEND == "0000" || ABEND == "OKLR"){
							var U_O_Data = [];							//用來將電文取回且整理好的值塞入網格
							var formData = ret.form;					//取回傳資料
							
							delete formData["TXACN"];
							delete formData["ABEND"];
							//20220311 add gemfor/Emma --附屬帳號網格
							for(i=1 ; i<8 ;i++){
								var TGA="TGACN"+i;
								var TGACN=formData[TGA];
								if(TGACN.trim() != ""){
									let data = {
											"U_TGACN" : TGACN,
									}
									U_O_Data.push(data);
							}
							}							
/*							for(let key in formData){
								let TGACN = formData[key];
								if(TGACN.trim() != ""){
									let data = {
											"U_TGACN" : formData[key],
									}
									
									U_O_Data.push(data);
								}
							}
*/							
							if(U_O_Data.length > 0){
								form.setFieldVisible("U_A007Grid", true);
								form.getControl("U_A007Grid").setValue(U_O_Data);
							}else{
								Jui.message.alert("查詢無資料！");
							}
							
							bar.close();
							
						}else{
							Jui.message.alert("查詢無資料！\r\n交易代號："+ ABEND_text);
							bar.close();
							return;
						}				  
					} else {
						Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
						bar.close();
						return;
					}	 
				}, 1 * 1000);
			});
			
		},
		getDicText : function(dicData, postVal) { //Emma-電文取值字典顯示文本方式-20220307
			var dicText = postVal;
			for (var j = 0; j < dicData.length; j++) {
				if (dicData[j].value == postVal) {
					dicText = dicData[j].text;
					break;
				}
			}
			return dicText;
		},
		doCardNumDetail : function() { 
			var U_OSAMDKEY = form.getControl("U_A012Grid").getEventRow().data.U_OSAMDKEY;
			CommonBusiness.openEntity("CUS.NumFile",form.getControl("U_A012Grid").getEventRow().data.U_OSAMDKEY);
		},
		doCardDetail : function() { 
			var U_OSAMDKEY = form.getControl("U_A012Grid").getEventRow().data.U_OSAMDKEY;
			CommonBusiness.openEntity("CUS.NumFile",form.getControl("U_A012Grid").getEventRow().data.U_OSAMDKEY);
		}
		
		
}