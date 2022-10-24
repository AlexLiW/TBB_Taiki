package com.chainsea.cus.m1211ca.action;

import com.jeedsoft.quicksilver.base.action.EntityAction;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.DataResult;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.chainsea.cus.m1211ca.model.m1211CAModel;

public interface m1211CAAction extends EntityAction<m1211CAModel>
{
    
    FileResult pdfFile(ActionContext ac) throws Exception;

    DataResult getFaxSetting(ActionContext ac);

}
