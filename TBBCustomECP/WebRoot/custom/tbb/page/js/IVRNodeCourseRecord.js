var IVRNodeCourseRecord = {
	doLoad: function() {
		console.log("clientData.urlArgs.masterEntityId = " + clientData.urlArgs.masterEntityId);
		var CallLogFId = clientData.urlArgs.masterEntityId;
		var CallLog_QueryFilter = {
					fieldNames: ["FCallerPIN"], //回傳的欄位
					conditions: [{
						fieldName: "FId", //設定條件欄位
						operator: "Equal", //設定條件
						value: CallLogFId //設定條件值
					}]
		};
		Utility.invoke("Ecp.CallLog.getListData", CallLog_QueryFilter, true, function(ret) {
			console.log("Ecp.CallLog.getListData res = " + JSON.stringify(ret ));
			if (ret.data.records.length <= 0) { //判斷回傳筆數<=0
				console.log("Search Fail. Ecp.CallLog.getListData is not exists. ");
					
			} else if (ret.data.records.length == 1) {
				console.log("Ecp.CallLog.getListData Search Complet. ");
				IVRNodeCourseRecord.doSearchRecord(ret.data.records[0].FCallerPIN);
			} else {
				console.log("Search Fail. Ecp.CallLog.getListData is not exists. ");
					
			}
		});
	},
	doSearchRecord: function(CallerPIN) {
		var QueryFilter = {
					fieldNames: ["Seq","NodeRecord","NodeRecord_Previous","CustomData","CallerPIN","FCreateTime"], //回傳的欄位
					conditions: [{
						fieldName: "CallerPIN", //設定條件欄位
						operator: "Equal", //設定條件
						value: CallerPIN //設定條件值
					}]
		};
		Utility.invoke("TBBmIVRNodeCourseRecord.getListData", QueryFilter, true, function(ret) {
			console.log("TBBmIVRNodeCourseRecord.getListData res = " + JSON.stringify(ret ));
			if (ret.data.records.length <= 0) { //判斷回傳筆數<=0
				console.log("Search Fail. TBBmIVRNodeCourseRecord.getListData is not exists. ");	
			} else {
				console.log("TBBmIVRNodeCourseRecord.getListData Search Complet. ");
				var resultData = ret.data.records;
				resultData.sort(function(a, b) {
					return a.Seq > b.Seq;
				});
				list.setValue(resultData);
			}
		});
	},
}
