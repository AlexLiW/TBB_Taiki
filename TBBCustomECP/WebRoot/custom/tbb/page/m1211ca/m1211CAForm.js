/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/16 
 * Description:調閱帳單 TBB.m1211CA
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: chainsea\hsin.lin;
 * LastUpdateDate: 2021/06/16
 * Note:
 ******************************************************************************/
var m1211CAForm = {
	sessionId : null,
	agentId : null,
	ACNO : null,
	UID : "",
	doLoad : function() {
		ACNO= clientData.urlArgs.U_ACN;
		if(!Jui.string.isEmpty(ACNO)){
			form.setFieldValue("U_ACNO", ACNO);
		}
		m1211CAForm.sessionId = Jui.random.nextUuid();
		var userId = CommonBusiness.getCurrentUser().userId;
		m1211CAForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
		
		//form.getControl("F_Delivery").onchange = m1211CAForm.doChange;
		form.getControl("F_Delivery").fireEvent("onchange");
		form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
        form.getControl("U_Inquiry").onclick = m1211CAForm.doPost;
        m1211CA.doLoad();
		
	},

	// 連動欄位 hsin
	doChange : function() {
		var delivery = form.getFieldValue("F_Delivery");
		if(delivery == 0){
		    form.setFieldVisible("U_BillNo",true);
		    form.setFieldVisible("U_SDate",true);
		    form.setFieldVisible("U_EDate",true);
		    form.setFieldVisible("U_Inquiry",true);
		    form.setFieldVisible("U_Grid",true);
		}else{
	         form.setFieldVisible("U_BillNo",false);
	         form.setFieldVisible("U_SDate",false);
	         form.setFieldVisible("U_EDate",false);
	         form.setFieldVisible("U_Inquiry",false);
	         form.setFieldVisible("U_Grid",false);
	         form.setFieldValue("U_BillNo",null);
	         form.setFieldValue("U_SDate",null);
	         form.setFieldValue("U_EDate",null);
	         form.setFieldValue("U_Inquiry",null);
	         form.setFieldValue("U_Grid",null);
		}
	},

	

	// 查詢帳單明細 Get_Result  hsin
	doPost : function() {
	    
	    form.setFieldValue("U_Grid",null);
		
	     if (!form.getFieldValue("F_Identify")) {
            Jui.message.hint("請填寫\"身份證字號/統編\"");
            return;
        } 
	    
	    
	    //日期防呆
	    var startDate = form.getFieldValue("U_SDate"), endDate = form.getFieldValue("U_EDate");
	    if(startDate && endDate){
	        if ( (Date.parse(endDate)).valueOf() < (Date.parse(startDate)).valueOf()){
	            Jui.message.alert("查詢迄日時間不能小於查詢起日時間"); // 改成文本
	            return;
	        }
	        startDate = form.getFieldValue("U_SDate").replace(/-/g, "/");
	        endDate = form.getFieldValue("U_EDate").replace(/-/g, "/");
	    }
	    
	    
		data = {
			"Cust_ID" : form.getFieldValue("F_Identify"),//身分證ID或統編
			"SDate" : Jui.string.isEmpty(startDate)?"":startDate, //2021.09.14-gemfor/Emily-選擇帳單種類查詢
					"EDate" : Jui.string.isEmpty(endDate)?"":endDate, //2021.09.14-gemfor/Emily-選擇帳單種類查詢
					"Bill_No" : Jui.string.isEmpty(form.getFieldValue("U_BillNo"))?"":form.getFieldValue("U_BillNo") //帳單編號  //2021.09.14-gemfor/Emily-選擇帳單種類查詢
			
		};

		var args = JSON.stringify({
			"name" : "Get_Resulttbbapi",
			"from" : "csr",
			"sessionId" : m1211CAForm.sessionId,
			"agentId" : m1211CAForm.agentId,
			"formData" : data
		});
		console.log(args);
		TBBUtil.doPost(JSON.parse(args), function(ret) {
			console.log(ret);
	         if (ret == undefined) {
	                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
	                return;
	         }
			if(ret.isSuccess){
			    
			    var DataGrid = [];
                var formData = ret.form;
                for (var i = 0; i <= formData.Table.length - 1; i++) {
                        var qDate = formData.Table[i].Query_Date;
                        if(qDate){
                            qDate=qDate.substr(0,10);
                        }
                        var record = {
                            U_Subject: formData.Table[i].Subject,
                            U_BillNo: formData.Table[i].Bill_no,
                            U_Billtype: formData.Table[i].Bill_type,
                            U_BillMonth: formData.Table[i].Bill_Month,
                            U_CardType: formData.Table[i].userid,
                            U_QueryDate: qDate,
                            U_ProjectNo: formData.Table[i].Project_No,
                        };
                        DataGrid.push(record);
                       
                }
                
                // 資料依"日期"由大到小排序
                var wlen1 = DataGrid.length;
                var count1 = 0;// 記錄總執行次數
                for (var i = 0; i < DataGrid.length - 1; i++) {
                    for (var j = 0; j < wlen1 - 1; j++) {
                        if (DataGrid[j].U_QueryDate < DataGrid[j + 1].U_QueryDate) {
                            var temp;
                            temp = DataGrid[j];
                            DataGrid[j] = DataGrid[j + 1];
                            DataGrid[j + 1] = temp;
                            count1++;
                        }
                    }
                    wlen1 = wlen1 - 1;
                }
                
                form.getControl("U_Grid").setValue(DataGrid);
                
			    
			}else {
                // 電文失敗
			    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
		})

	},
	
	
	// 匯出帳單 hsin
    doClick : function() {
        
        var bar =
            Jui.message.progress(function() {
            Jui.message.hint("資料處理中，請稍後...");
            });
        var grid = form.getControl('U_Grid').getEventRow();
        var date = grid.data.U_QueryDate;
        if(date){
            date= date.replace(/-/g, "");
        }
        //var filename =  grid.data.U_CardType + date + grid.data.U_ProjectNo;   //2021.09.09-gemfor/Emily-修改匯出帳單pdf檔名
        var filename =  form.getFieldValue("F_Identify") + "_" + form.getFieldValue("F_UserName") + "_" + grid.data.U_Billtype + "_" + date; //2021.09.09-gemfor/Emily-修改匯出帳單pdf檔名
        m1211CAForm.doPostHtml(bar,filename);
        
        
        
    },
	
	
	// 查詢帳單明細 Get_Html  hsin
	doPostHtml : function(bar,filename) {

        var grid = form.getControl('U_Grid').getEventRow();
       
        data = {
            "Bill_No" : form.getFieldValue("U_BillNo"), //帳單編號
            "Cust_ID" : form.getFieldValue("F_Identify"),//身分證ID或統編
            "Query_Date" : grid.data.U_QueryDate,
            "User_ID" : grid.data.U_CardType,
            "Project_No" : grid.data.U_ProjectNo,
            "F_UserName" : form.getFieldValue("F_UserName"), //2021.09.09-gemfor/Emily-改匯出帳單pdf檔名
            "U_Billtype" : grid.data.U_Billtype,  //2021.09.09-gemfor/Emily-改匯出帳單pdf檔名
        };

        var args = JSON.stringify({
            "name" : "Get_Htmltbbapi",
            "from" : "csr",
            "sessionId" : m1211CAForm.sessionId,
            "agentId" : m1211CAForm.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
            }
            if(ret.isSuccess){
                //console.log("000"+ret.form.HtmlBody);
                //return ret.form.HtmlBody;
                var getHtml = ret.form.HtmlBody;
                m1211CAForm.doPostImg(getHtml,bar,filename);
            }else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                bar.close();
                return;
            }
        })

    },
    
    // 查詢帳單明細 Get_Html_img  hsin
    doPostImg : function(getHtml,bar,filename) {

        var grid = form.getControl('U_Grid').getEventRow();
       
        data = {
            "Bill_No" : form.getFieldValue("U_BillNo"), //帳單編號
            "Cust_ID" : form.getFieldValue("F_Identify"),//身分證ID或統編
            "Query_Date" : grid.data.U_QueryDate,
            "User_ID" : grid.data.U_CardType,
            "Project_No" : grid.data.U_ProjectNo,
            "F_UserName": form.getFieldValue("F_UserName"), //2021.09.09-gemfor/Emily-改匯出帳單pdf檔名
            "U_Billtype" : grid.data.U_Billtype,  //2021.09.09-gemfor/Emily-改匯出帳單pdf檔名
        };

        var args = JSON.stringify({
            "name" : "Get_Html_imgtbbapi",
            "from" : "csr",
            "sessionId" : m1211CAForm.sessionId,
            "agentId" : m1211CAForm.agentId,
            "formData" : data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                    Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                    bar.close();
                    return;
            }
            if(ret.isSuccess){
                //console.log("123"+ret.form.GIF_BtyeArray);
                //return ret.form.GIF_BtyeArray;
                var getImg =ret.form.GIF_BtyeArray;
                var args={
                    getHtml: getHtml,
                    getImg:  getImg,
                    filename: filename
                    };
                //console.log("agrs20210624"+args);
                //Utility.download("TBB.m1211CA.pdfFile", args);
                Utility.download("TBB.UYearsbillmonth.pdfFile", args);
                bar.close();
            }else {
                // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                bar.close();
                return;
            }
        })

    },
    
    //開啟傳真 hsin
    doFax : function() {
        //Cti.SipxFaxOutBox.FaxSendForm.page
        //單元編碼 Cti.SipxFaxOutBox
        /*Utility.openTab("Cti.SipxFaxOutBox.FaxSendForm.page",null,"發送傳真","cti/image/ccfax/faxsend.png",null,function(ret){
           form.setFieldValue("FTargetTelNum","",form.getFieldValue("F_Fax"));
        });*/
        
        var args = {
            F_Fax : form.getFieldValue("F_Fax")
        };
        
        Utility.openDialog("Cti.SipxFaxOutBox.FaxSendForm.page", args);
       
    },
    
    
    
	
}
Jui.event.attach(window, 'load', m1211CAForm.doLoad);