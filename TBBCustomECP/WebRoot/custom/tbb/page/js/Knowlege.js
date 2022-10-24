var KnowlegeForm = 
{	
	doLoad : function(){
		form.setFieldVisible("F_IDNumber",false);	
		form.setFieldVisible("F_Publish",false);
		if(!(Jui.string.isEmpty(clientData.entityId))){
			var FStatus = form.getFieldValue("FStatus");
			console.log(FStatus);
			KnowlegeForm.setOnUse();
		}
	},	
	
	//對狀態進行判斷，并進行相應的操作
	setOnUse : function(){	
		if(form.getFieldValue("FStatus")=="Published"){
			KnowlegeForm.setIDNumber();	
		}else if(form.getFieldValue("FStatus")=="Revising"){
			KnowlegeForm.setValueNull();
		}
	},
	
	//查詢流水編號數據，并進行計數判斷，且求最大值
	setIDNumber : function(){
		var Publish = form.getFieldValue("F_Publish");
		if(Publish!=null){
			var Time=Publish.substring(0,10).split("-");
			Number=Time[0]+Time[1]+Time[2];
			FId     = form.getFieldValue("FId");
			args={
					FId    	  : FId,
					Time	  :Publish
			};
			Utility.invoke("TBB.m12111ADelay.querys",args,true,function(ret){
				data=ret.json;
				if(data.F_IDNumber==''){
					Utility.invoke("TBB.m12111ADelay.count",args,true,function(ret){
						var counts=ret.count;
						console.log(counts+"    "+Number);
						if(counts==1){
							Num=Number+KnowlegeForm.pad(counts,5);
							console.log(Num);
							KnowlegeForm.update();
						}else{	
							Utility.invoke("TBB.m12111ADelay.max",args,true,function(ret){
								var maxs=ret.max;
								Num=KnowlegeForm.pad(parseInt(maxs)+1,5);//流水编号的后半部分：00001
								KnowlegeForm.update();
							});
						}
						form.setFieldVisible("F_IDNumber",true);
					});
				}
					
			});
		}
	},
	
	//將流水編號更新到數據庫中
	update :function(){
		var args={
				FId    	  : FId,
				IDNumber  : Num
		};
		console.log(args.IDNumber);
		Utility.invoke("TBB.m12111ADelay.update",args,true,function(ret){});
		KnowlegeForm.querys();
	},
	
	//查詢數據庫，并給流水編號進行賦值
	querys : function(){
		var FId     = form.getFieldValue("FId");
		var args={
				FId    	  : FId
		};
		Utility.invoke("TBB.m12111ADelay.querys",args,true,function(ret){
			var data=ret.json;
			console.log(data);
			form.setFieldValue("F_IDNumber",data.F_IDNumber);
		});
	},
	
	//將流水編號的值清空
	setValueNull : function(){
		var FId     = form.getFieldValue("FId");
		var args={
				FId    	  : FId
		};
		Utility.invoke("TBB.m12111ADelay.clean",args,true,function(ret){});
		form.setFieldValue("F_IDNumber",null);
	},

	//補零操作，如00001
	pad : function (num, n) {  
	    var len = num.toString().length;  
	    while(len < n) {  
	        num = "0" + num;  
	        len++;  
	    }  
	    return num;  
	}
};
Jui.event.attach(window, 'load', function(){Jui.util.execute('KnowlegeForm.doLoad');});
	        

		
		
