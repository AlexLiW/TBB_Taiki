var JSClick =
{
	doLoad: function()
	{

	},

	doSend: function()
	{
		var http = new XMLHttpRequest();
		var url = window.location.toString().split("ecp")[0] + "ecp/openapi/custom/transaction/json";
		http.open("POST", url, true);
		http.setRequestHeader("Access-Control-Allow-Origin", "*");
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function(){
			if(http.readyState == 4 && http.status == 200){
				console.log("doSend response: " + http.responseText);
				alert("doSend response: " + http.responseText);
			}
		}

		// var data = {
		// 	"TZCEE-CMEBM500-INQOperation": {
		// 		"ZC-INPUT": {
		// 			"RSTM500": {
		// 				"ZCSRQ_HEADER": {
		// 					"ZCEE_AREA": {
		// 						"ZCSRQ_LU_NAME": "HCTR"
		// 					}
		// 				},
		// 				"ZC_EBCOM1_HEADER": {
		// 					"ZC_EBCOM1_TRMID": "*HCTR",
		// 					"ZC_EBCOM1_EMPLE_NO": "",
		// 					"ZC_EBCOM1_BUS_AUTH": "",
		// 					"ZC_EBCOM1_SUP_EMPLE_NO": "",
		// 					"ZC_EBCOM1_SUP_BUS_AUTH": "",
		// 					"ZC_EBCOM1_IQRS": "",
		// 					"ZC_EBCOM1_ETXN_CUST_DATA": "HCTRSERVER"
		// 				},
		// 				"ZC_EBCOM1_TEXT": {
		// 					"ACTF_CM_ID_NO": "A117107506",
		// 					"ACTF_CM_ID_DUP": "0",
		// 					"ACTF_CM_FLGADD1": "",
		// 					"ACTF_CM_ADRTYPE1": "",
		// 					"ACTF_CM_ZIPCODE1": ""
		// 				}
		// 			}
		// 		}
		// 	}
		// };

		// var args = {
		// 	"name": "M500megaapi",
		// 	"from": "CSR",
		// 	"sessionId": "20210223_3",
		// 	"formData": JSON.stringify(data),
		// };

		var args = JSON.parse(form.getFieldValue("FArgs"));

		http.send(JSON.stringify(args));
	}
};
Jui.event.attach(window, 'load', TransactionForm.doLoad);