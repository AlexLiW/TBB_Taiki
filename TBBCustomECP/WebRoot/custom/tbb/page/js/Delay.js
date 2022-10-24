var Delay =
{
	doLoad: function()
	{			
			if(Jui.string.isEmpty(clientData.entityId)){
				var args = clientData.urlArgs;
				form.setFieldValue("F_YTime",args.YTime);
				form.setFieldValue("F_Dealer",args.Dealer);
				form.setFieldValue("F_tbb",args.FId);	
			}
			form.setFieldVisible("FStatus",false);
			form.setFieldVisible("F_tbb",false);
			form.setFieldVisible("F_Dealer",false);
			var status = form.getFieldValue("FStatus");			
			if(status=="Audited")
			{
				var time = form.getFieldValue("F_NewTime");
				var args = {
					time : time
				};
				Utility.closeDialog(args);
			}
			Delay.doQuery();
			Delay.setOnchange();
			Delay.setNewTime();
	},
	
	setOnchange : function()
	{
		form.getControl("F_NewTime").onchange = Delay.setNewTime;		
	},
	
	 doRefresh:function() 
	{ 		
			var id = form.getFieldValue("FId");
			var status = CommonBusiness.getFieldValue("TBB.m12111ADelay",id,"FStatus");	
			if(status=="Audited"){
				window.location.reload(); 
			}else{
				Jui.message.alert("延時申請流程正在審核中!");
			}
	} ,
	
	setNewTime : function()
	{		
		var YTime = form.getFieldValue("F_YTime");
		var NewTime = form.getFieldValue("F_NewTime");
		
		if(NewTime!=null  && YTime!=null){
			var Time1 	= new Date(YTime).getTime();
			var Time2 = new Date(NewTime).getTime();
			if(Time2 < Time1){
				Jui.message.alert('新的預計完成時間應大于原來的預計完成時間');
				return false;
			}
		}else{
			return true;
		}
	},
	
	doQuery :function(){
		var args={
				FId		:	clientData.urlArgs.FId	
		};
		Utility.invoke("TBB.m12111ADelay.query",args,true,function(ret){
			data=ret.json;
			if(data!=null){
				console.log(data);
				form.setFieldValue("F_tbb",data.F_tbb);
				form.setFieldValue("F_Dealer",data.F_Dealer);
				form.setFieldValue("F_DelayReason",data.F_DelayReason);
				form.setFieldValue("F_NewTime",data.F_NewTime);
				form.setFieldValue("F_YTime",data.F_YTime);
				form.setFieldValue("FId",data.FId);
				form.setFieldValue("FStatus",data.FStatus);
			}
			var status = form.getFieldValue("FStatus");
			console.log(status);
			if(status=='New' || status=='Back'){
				toolBar.getItem("Save").setDisabled(false);	
				toolBar.getItem("Submit").setDisabled(false);
			}else{
				toolBar.getItem("Submit").setDisabled(true);	
				toolBar.getItem("Save").setDisabled(true);		
		}});	
	},
};
