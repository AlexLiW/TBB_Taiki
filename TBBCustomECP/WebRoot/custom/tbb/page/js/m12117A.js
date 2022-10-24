/********************************************************************************
	 利息違約金減免單單元畫面控制
	 * Author: 
	 * CreateDate: 
	 * LastUpdateUser: gemfor\Lillian 
	 * LastUpdateDate: 2022.02.23
	 * Note:  2021.05.21 gemfor\Lillian 
					 2022.01.26 Ai\Wolf 針對利息調減金額抓取錯誤參數進行調整
					 2022.02.23--gemfor/lillian--'減免原因' 為其他時，'服務項目3問題陳述' 需為必填
*********************************************************************************/
var m12117A ={
		doLoad : function()
		{
			m12117A.doIsNew();
			m12117A.setOnchange();
			m12117A.setF_WTime();
			m12117A.setF_Lixi();
			m12117A.getStatus();			
			// 20160926_新增身分證字號由聯絡人表單自動帶入
			m12117A.getInfo();
			var F_YearDerateNo=form.getFieldValue("F_YearDerateNo");
			if(F_YearDerateNo==2)
			{
				form.setFieldVisible("U_AnnulTimes",true);
			}
			else
			{
				form.setFieldVisible("U_AnnulTimes",false);
			}
			if (clientData.entityId != null ) {
				m12117A.addServiceTrack();
			}
			
			m12117A.set_U_SevItem1Change();
			m12117A.set_U_SevItem2Change();
			m12117A.set_U_SevItem3Change();
			m12117A.set_U_SevItem4Change();
			m12117A.set_F_Wyuej_Lixi();
			
			form.setFieldTitle("U_SevType2", null);		//隱藏服務類型2 標題
			form.setFieldTitle("U_SevType3", null);		//隱藏服務類型3 標題
			form.setFieldTitle("U_SevNotice3", null);	//隱藏服務類型3 提醒 標題
		},
		
		getInfo : function(){
			var args = clientData.urlArgs;
			console.log(args.hasOwnProperty("U_CustID"));
		
			if(args.hasOwnProperty("U_CustID")){
				form.setFieldValue("F_Identify",args.U_CustID); // 客戶身分證號
			}
		},
		setFStatus :function(){
			var FId   = form.getFieldValue("FId");
			if(FId==null){
				statu="New";
			}else{
			 statu = CommonBusiness.getFieldValue("TBB.m12117A",FId,"FStatus");
			 }
			return statu;
		},
		
		//判断表单是否为新建的情况
		doIsNew : function()
		{
			//form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_Info",false);
			form.setFieldVisible("F_Informa",false);
//			toolBar.getItem("unClose").setDisabled(true);
			arrayDisabled =[];
			if(Jui.string.isEmpty(clientData.entityId)){
				toolBar.getItem("Print").setVisible(false);
				toolBar.getItem("PrintNew").setVisible(false);
			}else{
				m12117A.setChangTypeRequire();
				m12117A.setF_RemarkRequire();				
				for(var i=0;i<clientData.editJson.title.length;i++){
					arrayDisabled[i] = form.isFieldDisabled(clientData.editJson.title[i].name);
				}
				m12117A.changeFStatus();
			}
			m12117A.setSatisfyEnable();
		},
		//s设置满意度的可用性
		setSatisfyEnable : function(){
			form.setFieldVisible("F_Satisfy",false);
			m12117A.setFStatus();
			console.log(statu);
			if(statu=="End"){
				form.setFieldVisible("F_Satisfy",true);
				toolBar.setItemDisabled("Save",false);
				
			}else if(statu=="Finish"){
				form.setFieldVisible("F_Satisfy",true);
				toolBar.setItemDisabled("Save",true);			
			}
		},
		//判断关闭、反关闭按钮的可用性
		onClick : function()
		{	
			var FStatus=null;
			m12117A.setFStatus();
			if(statu=="Finish"){
				FStatus="unClose";
			}
			else if(statu=="unClose"){
				FStatus="Finish";
			}
			else if(statu=="End" || statu=="END1"){
				FStatus="Finish";
			}
			var table = clientData.unitCode , table_Arr = [];
			table = table.substring("table",10);
			table_Arr = table.split(".");
			table = table_Arr[0]+table_Arr[1];
			
			var args = {
					table   : table,
					FStatus : FStatus,
					FId : clientData.entityId
			};		
			console.log(args);
			Utility.invoke("TBB.m12111ADelay.updateFStatus",args,true,function(ret){
				if(ret.json==1){
					location.reload();
					m12117A.changeFStatus();
				}else{
					Jui.message.alert("執行關閉失敗");
				}
				
			});
			
		},
		changeFStatus : function(){
			m12117A.setFStatus();
			if(statu=="Finish"){
				console.log(clientData.editJson.title.length);
				for(var i=0;i<clientData.editJson.title.length;i++){
					form.setFieldDisabled(clientData.editJson.title[i].name,true);
				}
				toolBar.getItem("unClose").setDisabled(false);
				toolBar.getItem("Finish").setDisabled(true);
				toolBar.getItem("Save").setDisabled(true);
				toolBar.getItem("Submit").setDisabled(true);
				toolBar.getItem("Deal").setDisabled(true);	
			}else if(statu=="unClose"){
				
				for(var i=0;i<clientData.editJson.title.length;i++){
				
					form.setFieldDisabled(clientData.editJson.title[i].name,arrayDisabled[i]);
				}
				toolBar.getItem("unClose").setDisabled(true);
				toolBar.getItem("Finish").setDisabled(false);
				toolBar.getItem("Save").setDisabled(false);
				toolBar.getItem("Submit").setDisabled(false);
				toolBar.getItem("Deal").setDisabled(false);	
			}
		},
			
		// 延時申請
		doDeal: function()
		{
			if (!form.validate()) {
				return;
			}
			var F_CustomerId    = CommonBusiness.getCurrentUser().userId;//處理人員
			var F_WTime   	    = form.getFieldValue("F_EndTime");//预计完成时间	
			var FId	   	 		= form.getFieldValue("FId");//预计完成时间	
			var args = {
				YTime 	 : F_WTime,
				Dealer	 : F_CustomerId,
				FId	 : FId
			};
			Utility.openDialog("TBB.m12111ADelay.Form.page", args, null, function(ret) {
				form.setFieldValue("F_EndTime",ret.time);
				EntityForm.doSave();	
			});
		},
		
		//设置预计完成时间
		setF_WTime : function()
		{
			var day=(new Date().getDay())+1;
			if(day==7){
			  day=0;
			}
			var time=new Date().getTime();
			for(var i=0,j=10;i<10,j>0;i++){
				switch(day)
				{
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						day=day+1;
						time=time+(1000*60*60*24);
						j--;
						break;
					case 0:
						day=day+1;
						time=time+(1000*60*60*24);
						break;	
					case 6:
						day=6-day;
						time=time+(1000*60*60*24);
						break;	
				}
			}				
			var ETime = new Date(time);
			//var day = new Date(new Date().getTime() + 5*(1000*60*60*24)); 
			if(form.getFieldValue("F_EndTime")==null){
				form.setFieldValue("F_EndTime",ETime);
			}
		},
		//備註
		setF_RemarkRequire : function(){
			var F_DerateReason = form.getFieldValue("F_DerateReason");
			if(F_DerateReason==1){
				form.setFieldRequired("F_Remark",true);
			}else{
				form.setFieldRequired("F_Remark",false);
			//	form.setFieldValue("F_Remark",null);
			}

		},
		
		setF_Lixi  : function()
		{
		  
		   var F_Lixi=form.getFieldValue("F_Lixi");
		   var F_Wyuej=form.getFieldValue("F_Wyuej");
	         var isValid;
			  if(F_Lixi<0 &&  F_Wyuej<0){
			        Jui.message.alert("利息調減金額和違約金調減金額必須大於0");
			        isValid= false;
		        }
		        else if(F_Lixi<0){
			        Jui.message.alert("利息調減金額必須大於0");
			        isValid= false;
		        }
				 else  if(F_Wyuej<0){
			        Jui.message.alert("違約金調減金額必須大於0");
			        isValid= false;
		        }
				 
				else{
			        isValid= true;
		        }
			  return isValid;
		},	

		//2021.06.04-gemfor/lillian-"違約金調減金額" 轉換為金錢格式
		set_F_Wyuej_Lixi : function(){
			var F_Wyuej = form.getFieldValue("F_Wyuej");
			var F_Lixi = form.getFieldValue("F_Lixi");
			if(F_Wyuej != null && F_Wyuej != ""){
				var F_Wyuej_F = F_Wyuej.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
				form.setFieldValue("F_Wyuej", F_Wyuej_F);
			}
			if(F_Lixi != null && F_Lixi != ""){
				var F_Lixi_F = F_Lixi.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
				form.setFieldValue("F_Lixi", F_Lixi_F);
			}
		},

		
		set_U_SevItem1Change : function(){
			var U_SevItem1 = form.getFieldValue("U_SevItem1");
			var U_SevItem2 = form.getFieldValue("U_SevItem2");
			var U_SevItem3 = form.getFieldValue("U_SevItem3");
			var U_SevItem4 = form.getFieldValue("U_SevItem4");
			
			if(U_SevItem1 == true){
				if(U_SevItem2 == true || U_SevItem3 == true || U_SevItem4 == true){
					Jui.message.alert("請勿選擇複數項服務項目！");
					form.setFieldValue("U_SevItem1", false);
				}else{
					form.setFieldDisabled("F_Year", false);
					form.setFieldDisabled("F_BillMonth", false);
					form.setFieldDisabled("F_ChangType", false);
					form.setFieldDisabled("F_YearDerateNo", false);
					form.setFieldDisabled("F_DerateReason", false);
					form.setFieldDisabled("F_Remark", false);
					form.setFieldRequired("F_Remark",false);
				}
			}else{
				form.setFieldDisabled("F_Year", true);
				form.setFieldDisabled("F_BillMonth", true);
				form.setFieldDisabled("F_Lixi", true);
				form.setFieldDisabled("F_Wyuej", true);
				form.setFieldDisabled("F_ChangType", true);
				form.setFieldDisabled("F_YearDerateNo", true);
				form.setFieldDisabled("F_DerateReason", true);
				form.setFieldDisabled("F_Remark", true);
				form.setFieldVisible("U_AnnulTimes",false);
				
				form.setFieldValue("F_Year", null);
				form.setFieldValue("F_BillMonth", null);
				form.setFieldValue("F_Lixi", null);
				form.setFieldValue("F_Wyuej", null);
				form.setFieldValue("F_ChangType", null);
				form.setFieldValue("F_YearDerateNo", null);
				form.setFieldValue("F_DerateReason", null);
				form.setFieldValue("F_Remark", null);
				form.setFieldValue("U_AnnulTimes", null);
			}
		},
		
		set_U_SevItem2Change : function(){
			var U_SevItem1 = form.getFieldValue("U_SevItem1");
			var U_SevItem2 = form.getFieldValue("U_SevItem2");
			var U_SevItem3 = form.getFieldValue("U_SevItem3");
			var U_SevItem4 = form.getFieldValue("U_SevItem4");
			
			if(U_SevItem2 == true){
				if(U_SevItem1 == true || U_SevItem3 == true || U_SevItem4 == true){
					Jui.message.alert("請勿選擇複數項服務項目！");
					form.setFieldValue("U_SevItem2", false);
				}else{
					form.setFieldDisabled("U_SevType2", false);
					form.setFieldDisabled("U_SevAMT2", false);
					form.setFieldDisabled("U_Descript2", false);
				}
			}else{
				form.setFieldDisabled("U_SevType2", true);
				form.setFieldDisabled("U_ACardNo", true);
				form.setFieldDisabled("U_BCardNo", true);
				form.setFieldDisabled("U_SevAMT2", true);
				form.setFieldDisabled("U_Descript2", true);
				
				form.setFieldValue("U_SevType2",null);
				form.setFieldValue("U_ACardNo",null);
				form.setFieldValue("U_BCardNo",null);
				form.setFieldValue("U_SevAMT2",null);
				form.setFieldValue("U_Descript2",null);
			}
		},
		
		
		set_U_SevItem3Change : function(){
			var U_SevItem1 = form.getFieldValue("U_SevItem1");
			var U_SevItem2 = form.getFieldValue("U_SevItem2");
			var U_SevItem3 = form.getFieldValue("U_SevItem3");
			var U_SevItem4 = form.getFieldValue("U_SevItem4");
			
			if(U_SevItem3 == true){
				if(U_SevItem1 == true || U_SevItem2 == true || U_SevItem4 == true){
					Jui.message.alert("請勿選擇複數項服務項目！");
					form.setFieldValue("U_SevItem3", false);
				}else{
					form.setFieldDisabled("U_SevType3", false);
					form.setFieldDisabled("U_SevAMT3", false);
					form.setFieldDisabled("U_DisReason", false);
					form.setFieldDisabled("U_Descript3", false);
				}
			}else{
				form.setFieldDisabled("U_SevType3", true);
				form.setFieldDisabled("U_SevAMT3", true);
				form.setFieldDisabled("U_SevNotice3", true);
				form.setFieldDisabled("U_DisReason", true);
				form.setFieldDisabled("U_Descript3", true);
				
				form.setFieldValue("U_SevType3",null);
				form.setFieldValue("U_SevAMT3",null);
				form.setFieldValue("U_SevNotice3", "1", "掛失費產生在**年**月帳單");
				form.setFieldValue("U_DisReason",null);
				form.setFieldValue("U_Descript3",null);
				form.setFieldRequired("U_Descript3", false)
			}
		},
		
		set_U_SevItem4Change : function(){
			var U_SevItem1 = form.getFieldValue("U_SevItem1");
			var U_SevItem2 = form.getFieldValue("U_SevItem2");
			var U_SevItem3 = form.getFieldValue("U_SevItem3");
			var U_SevItem4 = form.getFieldValue("U_SevItem4");
			
			if(U_SevItem4 == true){
				if(U_SevItem1 == true || U_SevItem2 == true || U_SevItem3 == true){
					Jui.message.alert("請勿選擇複數項服務項目！");
					form.setFieldValue("U_SevItem4", false);
				}else{
					form.setFieldDisabled("U_SevType4", false);
					form.setFieldDisabled("U_Descript4", false);
				}
			}else{
				form.setFieldDisabled("U_SevType4", true);
				form.setFieldDisabled("U_Descript4", true);
				form.setFieldDisabled("U_eFUNCardNotice", true);
				form.setFieldDisabled("U_BillNotice", true);
				
				form.setFieldValue("U_SevType4",null);
				form.setFieldValue("U_Descript4",null);
				form.setFieldValue("U_eFUNCardNotice", "0", "客戶符合藝FUN卡免費參觀國內外百大指定博物館資格，檢附相關資料(入場門票票根或其他購票證明)，煩請相關經辦協助處理，謝謝。");
				form.setFieldValue("U_BillNotice", "0", "客戶申請補寄帳單 ，請收取費用**元。");
			}
		},
		
		setOnchange : function()
		{
			form.getControl("F_DerateReason").onchange=m12117A.setF_RemarkRequire;
			form.getControl("F_ChangType").onchange=m12117A.setChangTypeRequire;
			form.getControl("F_YearDerateNo").onchange=m12117A.setChangTypeRequire;
			form.getControl("U_SevType2").onchange=m12117A.setChangTypeRequire;
			form.getControl("U_DisReason").onchange=m12117A.setChangTypeRequire;
			form.getControl("U_SevType3").onchange=m12117A.setChangTypeRequire;
			form.getControl("U_SevType4").onchange=m12117A.setChangTypeRequire;
			
			form.getControl("F_Wyuej").onchange = m12117A.set_F_Wyuej_Lixi;	//2021.06.04-gemfor/lillian-"違約金調減金額" 轉換為金錢格式
			form.getControl("F_Lixi").onchange = m12117A.set_F_Wyuej_Lixi;	//2021.06.04-gemfor/lillian-"利息調減金額" 轉換為金錢格式
			
			//**********2021.05.24--gemfor/lillian--依據勾選的服務項目作區域解鎖唯讀動作*************
			form.getControl("U_SevItem1").onchange = m12117A.set_U_SevItem1Change;
			form.getControl("U_SevItem2").onchange = m12117A.set_U_SevItem2Change;
			form.getControl("U_SevItem3").onchange = m12117A.set_U_SevItem3Change;
			form.getControl("U_SevItem4").onchange = m12117A.set_U_SevItem4Change;
			//*********************************************************************************
			
			form.getControl("U_ACardNo").onchange = m12117A.doACardNo; // 20210910 add by gemfor\Tiffany
		},
		
		doACardNo: function() { // 20210910 add by gemfor\Tiffany
			if (form.getFieldValue("U_ACardNo") && form.getFieldValue("U_ACardNo").length != "16") {
				Jui.message.alert("信用卡卡號需輸入16碼數字。");
				form.setFieldValue("U_ACardNo", null);
			}
		},
		
		setChangTypeRequire : function()
		{
			var way = form.getFieldValue("F_ChangType");
			if(way== "0"){
				form.setFieldRequired("F_Wyuej",true);
				form.setFieldRequired("F_Lixi",false);
				form.setFieldValue("F_Lixi",null);
			}else if(way=="1"){
				form.setFieldRequired("F_Lixi",true);
				form.setFieldRequired("F_Wyuej",false);
				form.setFieldValue("F_Wyuej",null);
			}else if(way=="0,1"){
				form.setFieldRequired("F_Wyuej",true);
				form.setFieldRequired("F_Lixi",true);
			}else{
				form.setFieldRequired("F_Wyuej",false);
				form.setFieldRequired("F_Lixi",false);
				form.setFieldValue("F_Wyuej",null);
				form.setFieldValue("F_Lixi",null);
			}
			var F_YearDerateNo=form.getFieldValue("F_YearDerateNo");
			if(F_YearDerateNo==2)
			{
				form.setFieldVisible("U_AnnulTimes",true);
			}
			else
			{
				form.setFieldVisible("U_AnnulTimes",false);
			}
			
			/*****************************以上是原有的判斷，不做更動*********************************/
			//2021.05.21--gemfor/lillian--依減調類型勾選狀況決定'違約金調減金額'與'利息調減金額'是否唯讀
			var F_ChangType = form.getFieldValue("F_ChangType");
			if(F_ChangType == null){
				form.setFieldDisabled("F_Lixi",true);
				form.setFieldDisabled("F_Wyuej",true);
				form.setFieldValue("F_Lixi",null);
				form.setFieldValue("F_Wyuej",null);
			}else if(F_ChangType == "0"){
				form.setFieldDisabled("F_Lixi",true);
				form.setFieldDisabled("F_Wyuej",false);
				form.setFieldValue("F_Lixi",null);
			}else if(F_ChangType == "1"){
				form.setFieldDisabled("F_Lixi",false);
				form.setFieldDisabled("F_Wyuej",true);
				form.setFieldValue("F_Wyuej",null);
			}else if(F_ChangType == "0,1"){
				form.setFieldDisabled("F_Lixi",false);
				form.setFieldDisabled("F_Wyuej",false);
			}
			
			//2021.05.24--gemfor/lillian--選擇'單卡調整'則 '請從卡號' 、'調至卡號' 取消唯讀
			var U_SevType2 = form.getFieldValue("U_SevType2");
			if(U_SevType2 == null || U_SevType2 == "2"){
				form.setFieldDisabled("U_ACardNo",true);
				form.setFieldDisabled("U_BCardNo",true);
				form.setFieldValue("U_ACardNo",null);
				form.setFieldValue("U_BCardNo",null);
			}if(U_SevType2 == "1"){
				form.setFieldDisabled("U_ACardNo",false);
				form.setFieldDisabled("U_BCardNo",false);
				//2021.07.26--gemfor/lillian--調至卡號需預設抓取正卡卡號欄位
				if(form.getFieldValue("U_BCardNo") == null || form.getFieldValue("U_BCardNo") == ""){
					form.setFieldValue("U_BCardNo", form.getFieldValue("F_CardNumber"));
				}
			}
			
			//2022.02.23--gemfor/lillian--'減免原因' 為其他時，'服務項目3問題陳述' 需為必填
			var U_DisReason = form.getFieldValue("U_DisReason");
			if(U_DisReason == "2"){
				form.setFieldRequired("U_Descript3", true)
			}else{
				form.setFieldRequired("U_Descript3", false)
			}
			
			//2021.05.24--gemfor/lillian--點選框為'已產生帳單'時，取消'服務類型3提醒'之唯讀
			var U_SevType3 = form.getFieldValue("U_SevType3");
			if(U_SevType3 == "1"){
				form.setFieldDisabled("U_SevNotice3", false);
			}else if(U_SevType3 == null || U_SevType3 == "2"){
				form.setFieldDisabled("U_SevNotice3", true);
				form.setFieldValue("U_SevNotice3", "1", "掛失費產生在**年**月帳單");
			}
			
			//2021.05.24--gemfor/lillian--'服務類型4'為調閱帳單手續費時，'調閱帳單手續費說明'解除唯讀；為藝FUN卡博物館優惠時，'藝FUN卡博物館優惠說明'解除唯讀。
			var U_SevType4 = form.getFieldValue("U_SevType4"); 
			if(U_SevType4 == "0"){
				form.setFieldDisabled("U_BillNotice", false);
				form.setFieldDisabled("U_eFUNCardNotice", true);
				//2021.09.03--gemfor/lillian--修正錯誤
				//form.setFieldValue("U_BillNotice", "0", "客戶申請補寄帳單 ，請收取費用**元。");
				form.setFieldValue("U_eFUNCardNotice", "0", "客戶符合藝FUN卡免費參觀國內外百大指定博物館資格，檢附相關資料(入場門票票根或其他購票證明)，煩請相關經辦協助處理，謝謝。");
			}else if(U_SevType4 == "1"){
				form.setFieldDisabled("U_BillNotice", true);
				form.setFieldDisabled("U_eFUNCardNotice", false);
				form.setFieldValue("U_BillNotice", "0", "客戶申請補寄帳單 ，請收取費用**元。");
				//2021.09.03--gemfor/lillian--修正錯誤
				//form.setFieldValue("U_eFUNCardNotice", "0", "客戶符合藝FUN卡免費參觀國內外百大指定博物館資格，檢附相關資料(入場門票票根或其他購票證明)，煩請相關經辦協助處理，謝謝。");
			}else{
				form.setFieldDisabled("U_BillNotice", true);
				form.setFieldDisabled("U_eFUNCardNotice", true);
				form.setFieldValue("U_eFUNCardNotice", "0", "客戶符合藝FUN卡免費參觀國內外百大指定博物館資格，檢附相關資料(入場門票票根或其他購票證明)，煩請相關經辦協助處理，謝謝。");
				form.setFieldValue("U_BillNotice", "0", "客戶申請補寄帳單 ，請收取費用**元。");
			}
			
			//2021.05.24--gemfor/lillian--'服務類型4'為藝FUN卡博物館優惠或其他時，'服務項目4問題陳述'設為必填。
			if(U_SevType4 == "1" || U_SevType4 == "2"){
				form.setFieldRequired("U_Descript4", true);
			}else{
				form.setFieldRequired("U_Descript4", false);
			}
		},
		
		getStatus : function()
		{
			var status=form.getFieldValue("FStatus");
			if(status=="AgentSign1")
			{
				form.setFieldDisabled("F_Identify",true);
			}
			
		},
		setSerialNo:function(event){			
			var page= {
                    "dialogWidth": 500,
                    "icon": "quicksilver/image/unit/WorkItem.png",
                    "title": "工作項",
                    "dialogHeight": 226,
                    "code": "Wf.WorkItem.Submit",
                    "dialogMaximized": false
                };
				var args = {
					entityEventCode		: clientData.toolBarJson.left[0].entityEventCode,
					entityId			: clientData.entityId,
					workItemId			: clientData.workflow.workItemId,
					result				: clientData.toolBarJson.left[0].id,
					resultText			: clientData.toolBarJson.left[0].text,
					noComment			: '',
					isSubmit			: true,
					enableAllFields		: true,
					addConfirmButton	: true
				};
				Utility.openDialog(page.code+".page", args, CommonBusiness.defaultDialogOptions.form, function()
				{
					Jui.message.hint($text("Public.OperationSuccess")); 					
					var arg={
							fTableName:"TBBm12117",
							fId       :form.getFieldValue("FId"),
							fSerialNo :"F_IDNumber"
						}
					Utility.syncInvoke("TBB.UGetForms.setSerialNo",arg,function(ret){});					
					EntityForm._closeOrReload();
				});
		},
		doOpen : function()
		{
			var F_Identify       		= form.getFieldValue("F_Identify");//身份證字號/統一編號	
			var F_CardKind     			= form.getFieldValue("F_CardKind");//卡種
			var F_Time   				= form.getFieldValue("F_Time");//日期時間
			var F_HomePhone				= form.getFieldValue("F_HomePhone");//住家電話
			var F_CompanyPhone   		= form.getFieldValue("F_CompanyPhone");//公司電話
			var F_MobilePhone   		= form.getFieldValue("F_MobilePhone");//手機
			var F_UserName   			= form.getFieldValue("F_UserName");//正卡人姓名
			var F_CardNumber   		    = form.getFieldValue("F_CardNumber");//正卡人卡號
			var F_Branch 		        = form.getFieldValue("F_Branch");//往來分行
			var U_CaseType                  = form.getFieldValue("U_CaseType");//案件類型
			var F_Year					= form.getFieldText("F_Year");//帳單年
			var F_BillMonth   			= form.getFieldValue("F_BillMonth");//帳單月份
			var F_ChangType  	    	= form.getFieldValue("F_ChangType");//減調類型
			var F_Wyuej	    			= form.getFieldValue("F_Wyuej");//違約金調減金額
			var F_Lixi	   				= form.getFieldValue("F_Lixi");//利息調減金額
			var F_YearDerateNo   		= form.getFieldValue("F_YearDerateNo");//年減免次數
			var F_DerateReason   		= form.getFieldValue("F_DerateReason");//調減原因
			var F_Remark   				= form.getFieldValue("F_Remark");//備註
			var F_CustomerId  			= form.getFieldText("FUserId");//處理人員			
			var F_DepartmentId  	    = form.getFieldText("F_DepartmentId");//處理部門
			var U_AnnulTimes			=form.getFieldValue("U_AnnulTimes");//減免次數
			
			var args = {
				F_Identify				: F_Identify, 
				F_CardKind   			: F_CardKind,
				F_Time 					: F_Time,
				F_HomePhone	 			: F_HomePhone,
				F_CompanyPhone 			: F_CompanyPhone,
				F_MobilePhone 			: F_MobilePhone,
				F_UserName 				: F_UserName,
				F_CardNumber 			: F_CardNumber,
				F_Branch 				: F_Branch,
				U_CaseType     			: U_CaseType,
				F_Year					: F_Year,
				F_BillMonth 			: F_BillMonth,
				F_ChangType 			: F_ChangType,
				F_Wyuej		            : F_Wyuej,
				F_Lixi		            : F_Lixi,
				F_YearDerateNo 			: F_YearDerateNo,
				F_DerateReason 			: F_DerateReason,
				F_Remark 				: F_Remark,
				F_CustomerId 			: F_CustomerId,
				F_DepartmentId 			: F_DepartmentId,
				U_AnnulTimes			:U_AnnulTimes
			};
			console.log(args);
			Utility.openDialog("TBB.m12117A.Report.page",args);
		},
		
		doOpenNew : function()
		{
			var F_Identify       		= form.getFieldValue("F_Identify");		//身份證字號/統一編號	
			var F_CardKind     			= form.getFieldValue("F_CardKind");		//卡種
			var F_Time   				= form.getFieldValue("F_Time");			//日期時間
			var F_HomePhone				= form.getFieldValue("F_HomePhone");	//住家電話
			var F_CompanyPhone   		= form.getFieldValue("F_CompanyPhone");	//公司電話
			var F_MobilePhone   		= form.getFieldValue("F_MobilePhone");	//手機
			var F_UserName   			= form.getFieldValue("F_UserName");		//正卡人姓名
			var F_CardNumber   		    = form.getFieldValue("F_CardNumber");	//正卡人卡號
			var F_Branch 		        = form.getFieldValue("F_Branch");		//往來分行
			var U_CaseType              = form.getFieldValue("U_CaseType");		//案件類型
			
			var U_SevItem1				= form.getFieldValue("U_SevItem1");		//服務項目1-利息減免
			var F_Year					= form.getFieldText("F_Year");			//帳單年度
			var F_BillMonth   			= form.getFieldValue("F_BillMonth");	//帳單月份
			var F_ChangType  	    	= form.getFieldValue("F_ChangType");	//減調類型
			var F_Wyuej	    			= form.getFieldText("F_Wyuej");			//違約金調減金額
			//var F_Lixi	   				= form.getFieldText("F_Lixi");			//利息調減金額
			var F_Lixi	   				= form.getFieldValue("F_Lixi");			//利息調減金額	
			var F_YearDerateNo   		= form.getFieldValue("F_YearDerateNo");	//今年度減免次數
			var F_DerateReason   		= form.getFieldValue("F_DerateReason");	//調減原因
			var F_Remark   				= form.getFieldValue("F_Remark");		//備註（1000字以内）
			
			var U_SevItem2				= form.getFieldValue("U_SevItem2");		//服務項目2-不同卡號間調帳
			var U_SevType2				= form.getFieldValue("U_SevType2");		//服務類型2
			var U_ACardNo				= form.getFieldValue("U_ACardNo");		//請從卡號
			var U_BCardNo				= form.getFieldValue("U_BCardNo");		//調至卡號
			var U_SevAMT2				= form.getFieldValue("U_SevAMT2");		//調帳金額
			var U_Descript2				= form.getFieldValue("U_Descript2");	//服務項目2問題陳述
			
			var U_SevItem3				= form.getFieldValue("U_SevItem3");		//服務項目3-減免掛失費
			var U_SevType3				= form.getFieldValue("U_SevType3");		//服務類型3
			var U_SevAMT3				= form.getFieldValue("U_SevAMT3");		//減免金額
			var U_SevNotice3			= form.getFieldText("U_SevNotice3");	//服務類型3提醒
			var U_DisReason				= form.getFieldText("U_DisReason");		//減免原因
			var U_Descript3				= form.getFieldValue("U_Descript3");	//服務項目3問題陳述
			
			var U_SevItem4				= form.getFieldValue("U_SevItem4");		//服務項目4-其他
			var U_SevType4				= form.getFieldValue("U_SevType4");		//服務類型4
			var U_BillNotice			= form.getFieldText("U_BillNotice");	//調閱帳單手續費說明
			var U_eFUNCardNotice		= form.getFieldText("U_eFUNCardNotice");//藝FUN卡博物館優惠說明
			var U_Descript4				= form.getFieldValue("U_Descript4");	//服務項目4問題陳述
			
			var F_CustomerId  			= form.getFieldText("FUserId");			//處理人員			
			var F_DepartmentId  	    = form.getFieldText("F_DepartmentId");	//處理部門
			var U_AnnulTimes			= form.getFieldValue("U_AnnulTimes");	//減免次數
			
			var args = {
				F_Identify				: F_Identify, 
				F_CardKind   			: F_CardKind,
				F_Time 					: F_Time,
				F_HomePhone	 			: F_HomePhone,
				F_CompanyPhone 			: F_CompanyPhone,
				F_MobilePhone 			: F_MobilePhone,
				F_UserName 				: F_UserName,
				F_CardNumber 			: F_CardNumber,
				F_Branch 				: F_Branch,
				U_CaseType     			: U_CaseType,
				
				U_SevItem1				: U_SevItem1,
				F_Year					: F_Year,
				F_BillMonth 			: F_BillMonth,
				F_ChangType 			: F_ChangType,
				F_Wyuej		            : F_Wyuej,
				F_Lixi		            : F_Lixi,
				F_YearDerateNo 			: F_YearDerateNo,
				F_DerateReason 			: F_DerateReason,
				F_Remark 				: F_Remark,
				
				U_SevItem2				: U_SevItem2,
				U_SevType2				: U_SevType2,
				U_ACardNo				: U_ACardNo,
				U_BCardNo				: U_BCardNo,
				U_SevAMT2				: U_SevAMT2,
				U_Descript2				: U_Descript2,
				
				U_SevItem3				: U_SevItem3,
				U_SevType3				: U_SevType3,
				U_SevAMT3				: U_SevAMT3,
				U_SevNotice3			: U_SevNotice3,
				U_DisReason				: U_DisReason,
				U_Descript3				: U_Descript3,
				
				U_SevItem4				: U_SevItem4,
				U_SevType4				: U_SevType4,
				U_BillNotice			: U_BillNotice,
				U_eFUNCardNotice		: U_eFUNCardNotice,
				U_Descript4				: U_Descript4,
				
				F_CustomerId 			: F_CustomerId,
				F_DepartmentId 			: F_DepartmentId,
				U_AnnulTimes			: U_AnnulTimes
			};
			console.log(args);
			
			for(var key in args){
				if(args[key] == undefined || args[key] == null){
					args[key] = "";
				}
			}
			
			Utility.openDialog("TBB.m12117A_20210604.Report.page",args);
		},
		
		doSave : function(){
		  var ret = m12117A.setF_Lixi();
		  if(ret)
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
EntityForm.doSubmit = function()
{
	var  F_UserName = form.getFieldValue("F_UserName");
	var  F_CardNumber = form.getFieldValue("F_CardNumber");
	var  F_Branch = form.getFieldValue("F_Branch");	
//	if(F_UserName == null || F_CardNumber == null || F_Branch == null)
	if(F_UserName == null)
	{
//		Jui.message.alert("正卡人姓名，正卡卡號，往來分行不能为空");
		Jui.message.alert("正卡人姓名不能為空");
	}
	else{
		EntityForm.$doSubmit();
	}
};
