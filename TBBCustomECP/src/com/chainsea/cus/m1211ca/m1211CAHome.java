package com.chainsea.cus.m1211ca;

import java.util.UUID;

import com.chainsea.cus.m1211ca.dao.m1211CADao;
import com.chainsea.cus.m1211ca.service.m1211CAService;

public class m1211CAHome
{
	public static final UUID UNIT_ID = UUID.fromString("9fab5436-78b6-4b43-b32d-6ce5c2d925bd");
	public static final String CACHE_REGION = "tbb_m1211ca";
	
	private static m1211CADao dao;
	private static m1211CAService service;
	
	public static m1211CADao getDao()
	{
		return dao;
	}

	public static void setDao(m1211CADao dao)
	{
		m1211CAHome.dao = dao;
	}
	
	public static m1211CAService getService()
	{
		return service;
	}

	public static void setService(m1211CAService service)
	{
		m1211CAHome.service = service;
	}
}
