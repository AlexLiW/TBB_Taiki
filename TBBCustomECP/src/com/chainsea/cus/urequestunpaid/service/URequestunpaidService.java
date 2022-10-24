package com.chainsea.cus.urequestunpaid.service;

import com.jeedsoft.quicksilver.base.service.EntityService;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

import org.json.JSONArray;

import com.chainsea.cus.urequestunpaid.model.URequestunpaidModel;

public interface URequestunpaidService extends EntityService<URequestunpaidModel>
{

	FileResult exportList(ServiceContext sc, JSONArray data);
}
