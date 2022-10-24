package com.chainsea.cus.uaccounttradedetail.action.impl;


import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.chainsea.cus.uaccounttradedetail.UAccountTradeDetailHome;
import com.chainsea.cus.uaccounttradedetail.action.UAccountTradeDetailAction;
import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.action.impl.EntityActionImpl;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

public class UAccountTradeDetailActionImpl extends EntityActionImpl<UAccountTradeDetailModel> implements UAccountTradeDetailAction {
    private static final Logger logger = LoggerFactory.getLogger(UAccountTradeDetailActionImpl.class);

    public UAccountTradeDetailActionImpl() {
        super(UAccountTradeDetailHome.UNIT_ID, UAccountTradeDetailModel.class);
    }
    
    @Override
    public FileResult exportList(ActionContext ac) {
        ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        JSONArray data = JsonUtil.getJsonArray(args, "data");
        return UAccountTradeDetailHome.getService().exportList(sc, data);
      }
    

}
