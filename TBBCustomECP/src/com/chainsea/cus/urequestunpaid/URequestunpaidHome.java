package com.chainsea.cus.urequestunpaid;

import java.util.UUID;

import com.chainsea.cus.urequestunpaid.dao.URequestunpaidDao;
import com.chainsea.cus.urequestunpaid.service.URequestunpaidService;

public class URequestunpaidHome
{
	public static final UUID UNIT_ID = UUID.fromString("2eda0929-0c00-8d1e-9704-17a19b7f5e10");
	public static final String CACHE_REGION = "tbb_urequestunpaid";
	
	private static URequestunpaidDao dao;
	private static URequestunpaidService service;
	
	public static URequestunpaidDao getDao()
	{
		return dao;
	}

	public static void setDao(URequestunpaidDao dao)
	{
		URequestunpaidHome.dao = dao;
	}
	
	public static URequestunpaidService getService()
	{
		return service;
	}

	public static void setService(URequestunpaidService service)
	{
		URequestunpaidHome.service = service;
	}
}
