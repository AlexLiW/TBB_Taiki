var ReCallLogActivityLogEditdoSave =
{ //針對Ecp版本 6.9.15.7 調整話後視窗，保存動作前抓取通話開始時間、客制重要記事欄位，寫入原重要記事欄位中。
	doSave: function(close)
	{
        //---------------------------客製化start---------------------------
		var SetFNoteData = form.getFieldValue("U_ImportantNote");
		if(SetFNoteData == "") SetFNoteData = "無重要記事";
		form.setFieldValue("FNote",SetFNoteData);
        //---------------------------客製化end----------------------------
		if(CallLogActivityLogEdit.doPhonePlanTimeChange()) {
			return false;
		}
		if(form.hasControl("FPhonePlanTime") && form.hasControl("FPhonePlanName")
				&& form.hasControl("FCallReplyStatus")){
			var phonePlanTime  = form.getFieldValue("FPhonePlanTime");
			var phonePlanName  = form.getFieldValue("FPhonePlanName");
			var callReply      = form.getFieldValue("FCallReplyStatus");
			
			if(!Jui.string.isEmpty(phonePlanTime) || !Jui.string.isEmpty(phonePlanName) || !Jui.string.isEmpty(callReply)){
				if(!Jui.string.isEmpty(phonePlanTime) && !Jui.string.isEmpty(phonePlanName)  && !Jui.string.isEmpty(callReply)){}
				else{
					alert($text("ECP.Calllog.phoneplan"));
					return false;
				}			
			}
		}
		
		if(close){
			if(CallLogActivityLogEdit.getActivityLogsRequired()){
				return false;
			}
			if (!EntityForm.validate()) {
				return false;
			}
			var relationData = {
				relationId		: clientData.relationId,
				masterUnitId	: clientData.masterUnitId,
				masterEntityId	: clientData.masterEntityId
			};	
			if (!clientData.checkBeforeSave) {
				CallLogActivityLogEdit.save(relationData, null,close);
				return true;
			}
		}else{
			if (!EntityForm.validate()) {
				return false;
			}
			var relationData = {
				relationId		: clientData.relationId,
				masterUnitId	: clientData.masterUnitId,
				masterEntityId	: clientData.masterEntityId
			};
			
			if (!clientData.checkBeforeSave) {
				CallLogActivityLogEdit.save(relationData, null,close);
				return true;
			}
		}		
	}
}
CallLogActivityLogEdit.doSave = ReCallLogActivityLogEditdoSave.doSave;