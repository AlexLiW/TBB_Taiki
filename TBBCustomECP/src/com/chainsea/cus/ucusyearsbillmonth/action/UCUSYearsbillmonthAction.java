package com.chainsea.cus.ucusyearsbillmonth.action;

import com.jeedsoft.quicksilver.base.action.EntityAction;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.chainsea.cus.ucusyearsbillmonth.model.UCUSYearsbillmonthModel;

public interface UCUSYearsbillmonthAction extends EntityAction<UCUSYearsbillmonthModel>
{

    FileResult doExcel(ActionContext ac);
}
