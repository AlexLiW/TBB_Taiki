package com.chainsea.cus.m1211ca.action.impl;

import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.action.impl.EntityActionImpl;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.DaoContext;
import com.jeedsoft.quicksilver.base.type.DataResult;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.jeedsoft.quicksilver.parameter.ParameterHome;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.chainsea.cus.m1211ca.m1211CAHome;
import com.chainsea.cus.m1211ca.action.m1211CAAction;
import com.chainsea.cus.m1211ca.model.m1211CAModel;


public class m1211CAActionImpl extends EntityActionImpl<m1211CAModel> implements m1211CAAction
{
    private static final Logger logger = LoggerFactory.getLogger(m1211CAActionImpl.class);
    public m1211CAActionImpl()
	{
		super(m1211CAHome.UNIT_ID, m1211CAModel.class);
	}

    @Override
    public FileResult pdfFile(ActionContext ac) throws Exception {
        // TODO Auto-generated method stub
        ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        String getHtml = JsonUtil.getString(args, "getHtml");
        String getImg = JsonUtil.getString(args, "getImg");
        String filename = JsonUtil.getString(args, "filename");
        return  m1211CAHome.getService().pdfFile(sc, getHtml, getImg, filename);
    }
    

    @Override
    public DataResult getFaxSetting(ActionContext ac) {
        // TODO Auto-generated method stub
        DataResult result = new DataResult();
        String faxUrl = ParameterHome.getDao().getSystemParameter(DaoContext.getDefaultInstance(), "FaxWebServiceURL");
        String faxTel = ParameterHome.getDao().getSystemParameter(DaoContext.getDefaultInstance(), "FaxTel");
        result.put("faxUrl", faxUrl);
        result.put("faxTel", faxTel);
        return  result;
    }
}
