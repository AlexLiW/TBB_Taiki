package com.chainsea.cus.urequestunpaid.action.impl;

import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.action.impl.EntityActionImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.chainsea.cus.urequestunpaid.URequestunpaidHome;
import com.chainsea.cus.urequestunpaid.action.URequestunpaidAction;
import com.chainsea.cus.urequestunpaid.model.URequestunpaidModel;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class URequestunpaidActionImpl extends EntityActionImpl<URequestunpaidModel> implements URequestunpaidAction
{
	private static final Logger logger = LoggerFactory.getLogger(URequestunpaidActionImpl.class);
	
	public URequestunpaidActionImpl()
	{
		super(URequestunpaidHome.UNIT_ID, URequestunpaidModel.class);
	}
	
	@Override
    public FileResult exportList(ActionContext ac) {
		logger.info("20210916");
		ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        JSONArray data = JsonUtil.getJsonArray(args, "data");
        return URequestunpaidHome.getService().exportList(sc, data);
	}
}
