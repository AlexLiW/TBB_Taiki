/********************************************************************************
	 信用卡特約商店資料
	 * Author: 			
	 * CreateDate: 		2022.12.19
	 * LastUpdateUser: 	
	 * LastUpdateDate: 	2022.12.20
	 * Note: 
	 * 		
	 *		 					
	 *							
	 *		
                      
*********************************************************************************/
var CCSInformationForm = {
	
	

	doLoad : function() {


		form.getControl("U_Button").setElementStyle("width: 30%"); //設定查詢按鈕大小

		form.getControl("U_Button").onclick = function() {
		form.getControl("U_Grid").setValue();//清空累計金額網格
		form.getControl("U_Grid2").setValue();//清空累計金額網格
		form.getControl("U_Grid3").setValue();//清空累計金額網格
		form.getControl("U_Grid4").setValue();//清空累計金額網格
		form.getControl("U_Grid5").setValue();//清空累計金額網格
		form.getControl("U_Grid6").setValue();//清空累計金額網格
		form.getControl("U_Grid7").setValue();//清空累計金額網格
		CCSInformationForm.doR017();
		CCSInformationForm.doR018();
		};
	},



	doR017 : function() { // 上送R017
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			bar.close();
			return;
		}
		var CORPIDN = form.getFieldValue("U_licenseNum");
		CCSInformationForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCSInformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R017",
			"CORPIDN" : CORPIDN, 
		};
		var args = JSON.stringify({
			"name" : "R017tbbapi",
			"from" : "CSR",
			"sessionId" : CCSInformationForm.sessionId,
			"agentId" : CCSInformationForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
			if (ret.isSuccess == true) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDTtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDTtxt = codeDic[i].text;
							break;
						}
					}	
					console.log("交易代碼說明"+":"+ABENDTtxt); 
					form.setFieldValue("U_TransactionResult", ret.form.ABEND);
					form.setFieldValue("U_TransactionResults", ABENDTtxt);
					bar.close();
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("特約主檔明細資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_Principal :formData.MRTRESP,
							U_PrincipalID:formData.MRTRPID,
							U_CName :formData.MRTCHNM,
							U_Alias:formData.MRTNKNM,
							U_EName:formData.MRTENNM,
							U_RAddress:formData.MRTADR1,
							U_OAddress:formData.MRTADR2,
							U_SSPhone:formData.MRTTELN,
							U_CCategory:formData.MRTMCCD,
							U_AcquiringType:formData.BRHTYPE,
							U_StatusCode:formData.STATUS,
							U_LDChange:CCSInformationForm.doDate(formData.LSTDATE),
							U_ProvincialCode:formData.MRTSTAT,
							U_SCCode:formData.MRTCITY,
							
							};
							U_O_Data.push(record);	
							form.getControl("U_Grid").setValue(U_O_Data);
							bar.close();							
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},
	
	doR018 : function() { // 上送R018
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			bar.close();
			return;
		}
		var CORPIDN = form.getFieldValue("U_licenseNum");
		CCSInformationForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCSInformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R018",
			"CORPIDN" : CORPIDN, 
		};
		var args = JSON.stringify({
			"name" : "R018tbbapi",
			"from" : "CSR",
			"sessionId" : CCSInformationForm.sessionId,
			"agentId" : CCSInformationForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
			if (ret.isSuccess == true) {
				var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
				var ABENDTtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDTtxt = codeDic[i].text;
							break;
						}
					}	
					console.log("交易代碼說明"+":"+ABENDTtxt); 
					form.setFieldValue("U_TransactionResult2", ret.form.ABEND);
					form.setFieldValue("U_TransactionResults2", ABENDTtxt);
					bar.close();
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("特約明細檔明細資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data= [];
				var U_O_Data2 = [];
				var U_O_Data3= [];
				var U_O_Data4= [];
				var U_O_Data5= [];
				var formData = ret.form;
				
				
				
							var record = {//網格內容
								U_BC :formData.BRHNMBR,
								U_Jurisdiction:formData.MRTBANK,
								U_SpecialAccount :formData.MRTACCT,
													
							};

							var record2 = {//網格內容
								U_ODDNum :CORPIDN,
								U_SCode:formData.BRHNMBR,
								U_SCode :formData.STATUS,
								U_BC :formData.BRHNMBR,
								U_Jurisdiction:formData.MRTBANK,
								U_SpecialAccount :formData.MRTACCT,
								U_MBusiness:formData.MRTIDNO,
								U_GrantDays:formData.PAYDATE,
								U_Principal:formData.MRTOWNR,
								U_PrincipalID:formData.OWNERID,
								U_SSAccount:formData.MRTACCT,
								U_CNum:formData.SIGNNBR,
								U_CName:formData.MRTCHNM,
								U_Alias:formData.MRTNKNM,
								U_EName:formData.MRTENNM,
								U_EMachines:formData.POSCUNT,
								U_RAddress:formData.REGADDR,
								U_OAddress:formData.MRTADDR,
								U_SSPhone:formData.MRTTELN,
								U_CCategory:formData.MCCCODE,
								U_Postal:formData.MRTZIPN,
								U_SCategory:formData.MRTBIZT,
								U_Products:formData.MRTPPAD,
								U_Capital:CCSInformationForm.dothousandComma(formData.MRTCAPT),
								U_Open:formData.MRTCHAN,
								U_SDate:CCSInformationForm.doDate(formData.MRTDATE),
								U_Properties:formData.MRTATTR,
								U_TRM:formData.POSFLAG,
								U_TRR:formData.CAMFLAG,
								U_KDate:CCSInformationForm.doDate(formData.DELQ_DATE),
								U_KNote:formData.DELQ_FLAG,
													
							};
							
							var record3 = {//網格內容
								U_SC :formData.TRNCARD,
								U_CDate :CCSInformationForm.doDate(formData.SIGNDTE),
								U_TType :formData.ENDTYPE,
								U_KDate :formData.ENDDATE,
								U_RT :formData.ENDRESN,
								U_GID :formData.TLRIDNO,
								U_DAmont :formData.MRTRATE,
								U_RS :formData.SPVIDNO,
								U_LDChange :CCSInformationForm.doDate(formData.LSTDATE),
								U_TSID :formData.MRTSTAT,
								U_TDCID :formData.MRTCITY,
													
							};
							var record4 = {//網格內容
								U_FTM :formData.FEERATE1,
								U_TMFA :formData.FEERATE2,
								U_TAFM :formData.FEERATE3,
								U_TMFJ :formData.FEERATE4,
								U_AU :formData.FEERATE5,
								U_SFR :formData.FEERATEX,
													
							};
							var record5 = {//網格內容
								U_FTM :formData.FEERATEA,
								U_TMFA :formData.FEERATEB,
								U_TAFM :formData.FEERATEC,
								U_TMFJ :formData.FEERATED,
								U_AU :formData.FEERATEE,
								U_SFR :formData.FEERATEY,
							};
							U_O_Data.push(record);	
							U_O_Data2.push(record2);
							U_O_Data3.push(record3);
							U_O_Data4.push(record4);
							U_O_Data5.push(record5);
							form.getControl("U_Grid2").setValue(U_O_Data);
							form.setFieldValue("U_BranchNum",formData.BRHNMBR);
							form.getControl("U_Grid3").setValue(U_O_Data2);
							form.getControl("U_Grid4").setValue(U_O_Data3);
							form.getControl("U_Grid5").setValue(U_O_Data4);
							form.getControl("U_Grid6").setValue(U_O_Data5);
							bar.close();
							CCSInformationForm.doR019();
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},

	
	doR019 : function() { // 上送R019
	
	
		 var bar = Jui.message.progress(function() {		
           Jui.message.hint("查詢資料中，請稍後...");
        });
		if (!form.validate()) {
			bar.close();
			return;
		}
		var CORPIDN = form.getFieldValue("U_licenseNum");
		var BRHNMBR = form.getFieldValue("U_BranchNum");
		CCSInformationForm.sessionId = Jui.random.nextUuid();//隨機給sessionId 
		var userId = CommonBusiness.getCurrentUser().userId;
		CCSInformationForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		var data = {
	        "TXID": "R019",
			"CORPIDN" : CORPIDN, 
			"BRHNMBR":BRHNMBR
		};
		var args = JSON.stringify({
			"name" : "R019tbbapi",
			"from" : "CSR",
			"sessionId" : CCSInformationForm.sessionId,
			"agentId" : CCSInformationForm.agentId,
			"formData" : data,
			
		});
		console.log(args);
		
		
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			setTimeout(function() {
				if (ret == undefined) {
					Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
					bar.close();
					return;
				}
			if (ret.isSuccess == true) {
				
				if (!(ret.form.ABEND == "OKLR"|| ret.form.ABEND == "0000"|| ret.form.ABEND == "OKOK" )) { 
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "ec9b8729-0c00-a947-3c06-179e5676d840"}).data; // TBB-電文交易結果說明
					var ABENDtxt = ret.form.ABEND;
					for (var i = 0; i < codeDic.length; i++) {
						if (codeDic[i].value == ret.form.ABEND) {
							ABENDtxt = codeDic[i].text;
							break;
						}
					}
					Jui.message.alert("本行信用卡特店資料有誤！\n交易代號：" + ABENDtxt);
					bar.close();
					return;
				}
		
				
				
				var U_O_Data = [];
				var U_O_Data2 = [];
				var formData = ret.form;
				

							var record = {//網格內容
							U_BNumber :BRHNMBR,
							U_Jurisdiction:formData.MRTBANK,
							U_SSName:formData.MRTCHNM
							};
							
							var record2 = {//網格內容
							U_SSID :BRHNMBR,
							U_JBranch:formData.MRTBANK,
							U_CN:formData.SIGNNBR,
							U_BP:formData.MRTATTR,
							U_Management:formData.MRTIDNO,
							U_EMNum :formData.POSCUNT,
							U_BRName:formData.MRTCHNM,
							U_BRN:formData.MRTNKNM,
							U_BREName:formData.MRTENNM,
							U_BC:CCSInformationForm.dothousandComma(formData.MRTCAPT),
							U_BM:formData.MRTOWNR,
							U_RP:formData.OWNERID,
							U_RAddress:formData.REGADDR,
							U_OAddress:formData.MRTADDR,
							U_SSPhone:formData.MRTTELN,
							U_POST:formData.MRTZIPN,
							U_PCode:formData.MRTSTAT,
							U_CCode:formData.MRTCITY,
							U_TC:formData.TRNCARD,
							U_SCategory:formData.MRTBIZT,
							U_BEDate:CCSInformationForm.doDate(formData.MRTDATE),
							U_Products:formData.MRTPPAD,
							U_LBDate:CCSInformationForm.doDate(formData.LSTDATE),
							};
							
							
							U_O_Data.push(record);	
							U_O_Data2.push(record2);
							form.getControl("U_SSInformation").setValue(U_O_Data);
							form.getControl("U_Grid7").setValue(U_O_Data2);
							bar.close();							
							
							
	
				} else {
				Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
				bar.close();
				return;
			}
			}, 1 * 1000);
		});
	},
	
	dothousandComma : function(number) {//千分位
        var num = number.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while (pattern.test(num)) {
            num = num.replace(pattern, "$1,$2");
        }
        return num;

    },
	doDate : function(date) {//日期格式重整
        var Date=
		date.substr(0, 3) + "/" + date.substr(3, 2) + "/" + date.substr(5, 2);
		return Date;
		
    },
	doTime : function(time) {//日期格式重整
        var Time=
		time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2);
		return Time;
		
    },
	
};
