/*******************************************************************************
 * Author: chainsea\hsin.lin;
 * CreateDate: 2021/06/11 
 * Description:信用卡歷史繳款狀況查詢 TBB.UHistoricalpayment
 * 
 * input parameters: N/A
 * 
 * output parameters: N/A
 * 
 * LastUpdateUser: gemfor\tiffany.wu; 
 * LastUpdateDate: 2021/09/27
 * Note: 新增查詢無資料邏輯、卡號字數檢核、新增欄位U_Currdue
 ******************************************************************************/
var UHistoricalpaymentForm = {
    sessionId: null,
    agentId: null,
    UID: "",
    doLoad: function() {
        cardNum= clientData.urlArgs.U_CardNum;
        if(!Jui.string.isEmpty(cardNum)){
            form.setFieldValue("U_CardNum", cardNum);
        }
        
        UHistoricalpaymentForm.sessionId = Jui.random.nextUuid();
        var userId = CommonBusiness.getCurrentUser().userId;
        UHistoricalpaymentForm.agentId = CommonBusiness.getFieldValue("Qs.User", userId, "FLoginName");
        
        form.getControl("U_Inquiry").setElementStyle("width: 30%"); //設定按鈕大小
        form.getControl("U_Inquiry").onclick = UHistoricalpaymentForm.doPost;
        
        // 20210927 adjust by gemfor\Tiffany
        document.getElementsByName("U_Payexpired")[0].childNodes[0].style.width="500px";
        document.getElementsByName("U_Payexpired")[0].childNodes[1].style="padding-left:200px";
        document.getElementsByName("U_Currdue")[0].childNodes[0].style.width="500px";
        document.getElementsByName("U_Currdue")[0].childNodes[1].style="padding-left:200px";
        document.getElementsByName("U_Arrearslowpayable")[0].childNodes[0].style.width="500px";
        document.getElementsByName("U_Arrearslowpayable")[0].childNodes[1].style="padding-left:100px";
        document.getElementsByName("U_Arrearstimes")[0].childNodes[0].style.width="500px";
        document.getElementsByName("U_Arrearstimes")[0].childNodes[1].style="padding-left:100px";

        UHistoricalpaymentForm.doOnchange(); // 20210927 add by gemfor\Tiffany
    },



    // BSHI信用卡歷史繳款狀況查詢 hsin
    doPost: function() {
        if (!form.validate()) {
            return;
        }
		if(Jui.object.isEmpty(form.getFieldValue("U_CardNum"))){
			Jui.message.alert("請填寫\"卡號\"");
			return;
		}
        
        TBBUtil.doClearFields("輸出區", null, null);
        
        form.setFieldValue("U_ErrorMemo", "");
        form.setFieldValue("U_ErrorCode", "");

        data = {
            "CARDNUM":  form.getFieldValue("U_CardNum")
        };

        var args = JSON.stringify({
            "name": "BSHItbbapi",
            "from": "csr",
            "sessionId": UHistoricalpaymentForm.sessionId,
            "agentId":UHistoricalpaymentForm.agentId,
            "formData": data
        });
        console.log(args);
        TBBUtil.doPost(JSON.parse(args), function(ret) {
            console.log(ret);
            if (ret == undefined) {
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
            if (ret.isSuccess) { // 電文回傳狀態
	            	// 20210927 adjust by gemfor\Tiffany -- start
					var codeDic = Utility.syncInvoke("Qs.Dictionary.getComboBoxItemsJson", {dictionaryId : "0800c056-5000-5827-6708-17c1113f19a0"}).data; // TBB-BSHI回應碼
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
						return;
					} else {
						form.setFieldValue("U_ErrorCode", ret.form.ABEND);
						form.setFieldValue("U_ErrorMemo", ABENDtxt);
					}
					
					var source = ret.form;
					/* var resultText = "";
                    if (source.ABEND == "0000") {
                        resultText = "交易成功";
                    }
                    form.setFieldValue("U_ErrorCode", source.ABEND);
                    form.setFieldValue("U_ErrorMemo", resultText);*/
					// 20210927 adjust by gemfor\Tiffany -- end
                    form.setFieldValue("U_CardType", source.TYPE);
                    form.setFieldValue("U_Credits", TBBUtil.thousandComma(source.CRLIMIT));
                    form.setFieldValue("U_Creditsdate", TBBUtil.formatDTM(source.CRLDTE,""));
                    form.setFieldValue("U_Lastcredits", TBBUtil.thousandComma(source.LSTCRLIMIT));
                    form.setFieldValue("U_Lastquotadate", TBBUtil.formatDTM(source.LSTCRLDTE,""));
                    //form.setFieldValue("U_Maxbill", UHistoricalpaymentForm.doAmount(source.HIBAL)); //20220217 後兩位為小數 by Liz //20220225 改回原金額 by Liz 
                    form.setFieldValue("U_Maxbill", TBBUtil.thousandComma(source.HIBAL)); 
                    form.setFieldValue("U_Maxbilldate", TBBUtil.formatDTM(source.DTEHIBAL,""));
                    form.setFieldValue("U_Payexpired", UHistoricalpaymentForm.doAmount(source.TOTAMTDUE)); //20220217 後兩位為小數 by Liz
                    //form.setFieldValue("U_Payexpired", TBBUtil.thousandComma(source.TOTAMTDUE));
                    form.setFieldValue("U_Recentcreditdate", TBBUtil.formatDTM(source.DTELSTPUR,""));
                    form.setFieldValue("U_Recentcredit", UHistoricalpaymentForm.doAmount(source.AMTLSTPUR)); //20220217 後兩位為小數 by Liz
                    //form.setFieldValue("U_Recentcredit", TBBUtil.thousandComma(source.AMTLSTPUR));
                    form.setFieldValue("U_Recentlenddate", TBBUtil.formatDTM(source.DTELSTADV,""));
                    form.setFieldValue("U_Recentlend", UHistoricalpaymentForm.doAmount(source.AMTLSTADV));
                    form.setFieldValue("U_Recentpaydate", TBBUtil.formatDTM(source.DTELSTPYM,""));
                    form.setFieldValue("U_Recentpayamount", UHistoricalpaymentForm.doAmount(source.LSTPYMAMT));
                    form.setFieldValue("U_Arrearslowpayable", UHistoricalpaymentForm.doAmount(source.PASTDUE));
                    form.setFieldValue("U_Arrearstimes", source.XDELQCNT);
                    form.setFieldValue("U_Arrears30lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ30DAY));
                    form.setFieldValue("U_Arrears30times", source.DELQ30CNT);
                    form.setFieldValue("U_Arrears60lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ60DAY));
                    form.setFieldValue("U_Arrears60times", source.DELQ60CNT);
                    form.setFieldValue("U_Arrears90lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ90DAY));
                    form.setFieldValue("U_Arrears90times", source.DELQ90CNT);
                    form.setFieldValue("U_Arrears120lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ120DAY));
                    form.setFieldValue("U_Arrears120times", source.DELQ120CNT);
                    form.setFieldValue("U_Arrears150lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ150DAY));
                    form.setFieldValue("U_Arrears150times", source.DELQ150CNT);
                    form.setFieldValue("U_Arrears180lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ180DAY));
                    form.setFieldValue("U_Arrears180times", source.DELQ180CNT);
                    form.setFieldValue("U_Arrears210lowpayable", UHistoricalpaymentForm.doAmount(source.DELQ210DAY));
                    form.setFieldValue("U_Arrears210times", source.DELQ210CNT);
                    form.setFieldValue("U_Currdue", UHistoricalpaymentForm.doAmount(source.CURRDUE)); // 20210927 Tiffany 已超過繳款截止日，未繳足本期最低應繳金額
            } else {
             // 電文失敗
                Jui.message.alert("發送電文失敗，詳情請洽資訊處！");
                return;
            }
        })

    },
    
//    doAmount:function (str){
//        var regex = /(\d)(?=(\d\d\d) (?!\d))/g;
//        var amount = "";
//        if(str.indexOf(".") == -1){
//            amount= str.replace(regex,',')+'.00';
//        }else{
//            var newStr = str.split('.');
//            var amount = newStr[0].replace(regex,',');
//            if(newStr[1].length <= 1){ 
//                // 小數點後只有一位時
//                amount = amount +'.'+newStr[1]+'0';
//            }
//        }
//        
//        return amount;
//    },
    
    //後兩位加上小數點+千分位
    doAmount:function (num){
        var str = num.toString();
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
    },

    doOnchange : function() { // 20210927 add by gemfor\Tiffany -- onchange
		form.getControl("U_CardNum").onchange = function() {
			UHistoricalpaymentForm.doCardNum();
		};
	},
	
	doCardNum : function() { // 20210927 add by gemfor\Tiffany -- 字數檢核
		if (form.getFieldValue("U_CardNum")) {
			if (form.getFieldValue("U_CardNum").length < 16) {
				Jui.message.alert("信用卡卡號需輸入16碼數字");
				form.setFieldValue("U_CardNum", null);
			}
		}
	},
	
}
Jui.event.attach(window, 'load', UHistoricalpaymentForm.doLoad);