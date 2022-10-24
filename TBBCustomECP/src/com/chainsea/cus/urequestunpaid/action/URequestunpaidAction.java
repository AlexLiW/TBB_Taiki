package com.chainsea.cus.urequestunpaid.action;

import com.jeedsoft.quicksilver.base.action.EntityAction;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.chainsea.cus.urequestunpaid.model.URequestunpaidModel;

public interface URequestunpaidAction extends EntityAction<URequestunpaidModel>
{
	FileResult exportList(ActionContext ac);
}
