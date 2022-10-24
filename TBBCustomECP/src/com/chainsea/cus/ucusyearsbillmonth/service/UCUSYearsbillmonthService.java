package com.chainsea.cus.ucusyearsbillmonth.service;

import com.jeedsoft.quicksilver.base.service.EntityService;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

import org.json.JSONArray;

import com.chainsea.cus.ucusyearsbillmonth.model.UCUSYearsbillmonthModel;

public interface UCUSYearsbillmonthService extends EntityService<UCUSYearsbillmonthModel>
{

    FileResult doExcel(ServiceContext sc, JSONArray data);
}
