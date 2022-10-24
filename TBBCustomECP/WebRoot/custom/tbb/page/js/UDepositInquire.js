var UDepositInquire = {
		doLoad : function()
		{
			UDepositInquire.doIsNew();
			UDepositInquire.getContactInfo();
		//	UDepositInquire.SampleData(); // 網格範例資料
		},
		doIsNew : function() // 若表單為新建
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				form.setFieldRequired("U_Note", true);
			}
		},
		getContactInfo : function()
		{
			var fid=form.getFieldValue("FId");
			if(fid==null){
				var args = clientData.urlArgs;
				//console.log(args.hasOwnProperty("U_CustID"));
				var FId = args.FId;
				var arg={
					fContactId:args.FId
				}
				Utility.syncInvoke("TBB.UGetForms.doGetCustID",arg,function(ret){
					form.setFieldValue("U_CustID",ret.fCustID); // 客戶身分證號
				});
				CustomInfo.doCsrQuery("TVO3MBBT");
				/* if(args.hasOwnProperty("U_CustID")){
					form.setFieldValue("U_CustID",args.U_CustID); // 客戶身分證號
				} */
			}
		},
		
		getDepositTransactionDetails:function(trNo){
			if (!EntityForm.validate()) {
				return;
			}
			var args = {form:form.getData()};
			args.form.F_TrNo = trNo;
			args.form.F_CardKind ="C"+"               ";
			StartDate=form.getFieldValue("U_StartDate");
			EndDate=form.getFieldValue("U_EndDate");
			StartDate=StartDate.substr(0,4)-1911+StartDate.substring(4);
			EndDate=EndDate.substr(0,4)-1911+EndDate.substring(4);
			
			args.form.U_StartDate=StartDate.replace(/-/ig, "");
			args.form.U_EndDate=EndDate.replace(/-/ig, "");
			console.log(args.form.U_StartDate+"kkk"+args.form.U_EndDate);
			args.form.U_AccountNumberSystem =form.getFieldText("U_AccountNumberSystem");
			Utility.invoke("CSR.Gateway.cleanCSR", args, true, function(ret) {
				var json = JSON.parse(	ret.result	);
				form.updateData(json);
			});		

			Utility.invoke("CSR.Gateway.queryCSR", args, true, function(ret) {
				var json = JSON.parse(	ret.result	);
				console.log(ret.result);
				console.log(json);
				form.updateData(json);
				var U_Result = json.U_ErrorCode;
				var U_ResultExplain =json.U_ErrorMemo;
				form.setFieldValue("U_Result",U_Result);
				form.setFieldValue("U_ResultExplain",U_ResultExplain);
				form.setFieldValue("U_NoteMessage",U_ResultExplain);	
			});
			
		}
	/*	SampleData : function() // 網格範例資料
		{
			form.setFieldValue("U_CustName", "測試中");
			
			var DepositList = form.getControl("U_GridTransaction");
			var data=[
					{U_gAccountNum:"123456789",U_gAlertDate:"1050928",U_gSummary:"跨行轉", U_gDebitCredit:"D", U_gAmount:"5015.00", U_gBalance:"8.00", U_gCheckNumber:"", U_gRemark:"234567887654345678", U_gBranch:"822"},
					{U_gAccountNum:"123456789",U_gAlertDate:"1050929",U_gSummary:"繳費", U_gDebitCredit:"D", U_gAmount:"2343.00", U_gBalance:"45.00", U_gCheckNumber:"", U_gRemark:"北富銀信用卡費", U_gBranch:"012"},
					{U_gAccountNum:"123456789",U_gAlertDate:"1050930",U_gSummary:"繳費", U_gDebitCredit:"C", U_gAmount:"2233.00", U_gBalance:"4.00", U_gCheckNumber:"", U_gRemark:"台企銀信用卡費", U_gBranch:"543"},
					]
			DepositList.loadData(data);
		},  */
		
};