package com.chainsea.cus.uyearsbillmonth.action.impl;

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
import com.chainsea.cus.uyearsbillmonth.UYearsbillmonthHome;
import com.chainsea.cus.uyearsbillmonth.action.UYearsbillmonthAction;
import com.chainsea.cus.uyearsbillmonth.model.UYearsbillmonthModel;

public class UYearsbillmonthActionImpl extends EntityActionImpl<UYearsbillmonthModel> implements UYearsbillmonthAction {
    private static final Logger logger = LoggerFactory.getLogger(UYearsbillmonthActionImpl.class);

    public UYearsbillmonthActionImpl() {
        super(UYearsbillmonthHome.UNIT_ID, UYearsbillmonthModel.class);
    }

    @Override
    public FileResult exportList(ActionContext ac) {
        logger.info("20210622");
        ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        JSONArray data = JsonUtil.getJsonArray(args, "data");
        return UYearsbillmonthHome.getService().exportList(sc, data);

    }
    
    @Override
    public FileResult pdfFile(ActionContext ac) throws Exception {
        // TODO Auto-generated method stub
        ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        String getHtml = JsonUtil.getString(args, "getHtml");
        String getImg = JsonUtil.getString(args, "getImg");
        String filename = JsonUtil.getString(args, "filename");
        return  UYearsbillmonthHome.getService().pdfFile(sc, getHtml, getImg, filename);
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
