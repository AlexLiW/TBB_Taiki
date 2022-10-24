package com.chainsea.cus.uyearsbillmonth.action;

import com.jeedsoft.quicksilver.base.action.EntityAction;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.DataResult;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.chainsea.cus.uyearsbillmonth.model.UYearsbillmonthModel;

public interface UYearsbillmonthAction extends EntityAction<UYearsbillmonthModel>
{

    FileResult exportList(ActionContext ac);

    FileResult pdfFile(ActionContext ac) throws Exception;

    DataResult getFaxSetting(ActionContext ac);
}
