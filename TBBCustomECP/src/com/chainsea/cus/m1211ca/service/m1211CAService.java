package com.chainsea.cus.m1211ca.service;

import com.jeedsoft.quicksilver.base.service.EntityService;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

import com.chainsea.cus.m1211ca.model.m1211CAModel;

public interface m1211CAService extends EntityService<m1211CAModel>
{
    FileResult pdfFile(ServiceContext sc, String getHtml, String getImg, String filename);
}
