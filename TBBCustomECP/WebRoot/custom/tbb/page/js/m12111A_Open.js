var Contact = {
		doLoad : function(){
			var Json 		= 	JSON.parse(localStorage.getItem("Json"));
			var data = form.getData();
			if(data.hasOwnProperty("F_Ani")){
				if(Json!=null || Json!=undefined){
					form.setFieldValue("F_Ani",Json);
				}
			}
		},
		
		doOpen : function(){
			var data = form.getData();
			console.log(data);
			var Json 		= 	JSON.parse(localStorage.getItem("Json"));  //localStorage存儲json數據
			data.FAni = Json;
		//	Utility.openDialog("TBB.m12111A.Form.page", data);
			var unit = Utility.getUnit("TBB.m12111A");
			Utility.openTab("TBB.m12111A.Form.page", data, unit.name, unit.icon, null, null, null, null);
		}
};
Jui.event.attach(window, 'load', function(){Jui.util.execute('Contact.doLoad');});