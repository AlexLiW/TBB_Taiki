var KnowViewDiv = {
	doLoad : function(){	
		KnowViewDiv.setToolBarVisible();
					   
	},
	
	
	setToolBarVisible : function (){
		var userId = CommonBusiness.getCurrentUser().userId;
		if(userId!="00000000-0000-0000-1002-000000000001"){
			var a = document.getElementsByTagName('div');
			for (var i = 0; i < a.length; i++) {
				if(a[i].innerHTML=="轉寄"){
					a[i].style.display="none";
				}
			}
		}
		
		var args ={
				userId : userId
		};
		Utility.invoke("TBB.m12111ADelay.select",args,true,function(ret){
			var select=ret.select;
			if(select==0){
				var a = document.getElementsByTagName('div');
			    for (var i = 0; i < a.length; i++) {
					 if(a[i].innerHTML=="編輯"){
						a[i].style.display="none";
					 }
				}
			}
		});	 
	}
	
};
Jui.event.attach(window, 'load', function(){Jui.util.execute('KnowViewDiv.doLoad');});