package com.chainsea.cus.uaccounttradedetail.service;

import org.json.JSONArray;

import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.jeedsoft.quicksilver.base.service.EntityService;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

public interface UAccountTradeDetailService extends EntityService<UAccountTradeDetailModel>
{

    FileResult exportList(ServiceContext sc, JSONArray data);
}
