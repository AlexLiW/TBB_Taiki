package com.chainsea.cus.uaccounttradedetail.action;

import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.jeedsoft.quicksilver.base.action.EntityAction;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.FileResult;

public interface UAccountTradeDetailAction extends EntityAction<UAccountTradeDetailModel>
{
   
    FileResult exportList(ActionContext ac);

}
