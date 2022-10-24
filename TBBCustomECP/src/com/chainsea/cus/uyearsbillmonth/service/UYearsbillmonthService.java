package com.chainsea.cus.uyearsbillmonth.service;

import com.jeedsoft.quicksilver.base.service.EntityService;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

import org.json.JSONArray;

import com.chainsea.cus.uyearsbillmonth.model.UYearsbillmonthModel;

public interface UYearsbillmonthService extends EntityService<UYearsbillmonthModel>
{

    FileResult exportList(ServiceContext sc, JSONArray data);
    FileResult pdfFile(ServiceContext sc, String getHtml, String getImg, String filename);
}
