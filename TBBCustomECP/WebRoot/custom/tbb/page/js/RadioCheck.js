var  RadioCheck = {
	doLoad : function(){
		var title = clientData.editJson.title;
		var array_Name = [], array_Number = []; num=0;
		console.log(title.length);
		for(var i = 0;i<title.length;i++){
			if(title[i].control=="MultiCheckBox"){
				array_Name[num] = title[i].name;
				array_Number[num] = i;
				num++;

			}			
		}
		var a = document.getElementsByTagName('div');
		for(var i = 0;i<array_Name.length;i++){
		console.log(array_Name[i]);
			console.log(a.length);
			for (var j = 0; j < a.length; j++) {
				if(a[i].name==array_Name[i]){
					var check = a[i].ChildNode.ChildNode.ChildNode.ChildNode;
					if(check.checked="true"){
						check.checked=null;
					}
				}
			}
			//form.getControl('"'+array_Name[i]+'"').attachEvent("onclick", handler); 
		}
	},
};
Jui.event.attach(window, 'load', function(){Jui.util.execute('RadioCheck.doLoad');});