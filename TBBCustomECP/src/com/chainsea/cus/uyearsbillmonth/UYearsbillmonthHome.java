package com.chainsea.cus.uyearsbillmonth;

import java.util.UUID;

import com.chainsea.cus.uyearsbillmonth.dao.UYearsbillmonthDao;
import com.chainsea.cus.uyearsbillmonth.service.UYearsbillmonthService;

public class UYearsbillmonthHome
{
	public static final UUID UNIT_ID = UUID.fromString("1788cc62-59c0-0001-5ef2-005056c00008");
	public static final String CACHE_REGION = "tbb_uyearsbillmonth";
	
	private static UYearsbillmonthDao dao;
	private static UYearsbillmonthService service;
	
	public static UYearsbillmonthDao getDao()
	{
		return dao;
	}

	public static void setDao(UYearsbillmonthDao dao)
	{
		UYearsbillmonthHome.dao = dao;
	}
	
	public static UYearsbillmonthService getService()
	{
		return service;
	}

	public static void setService(UYearsbillmonthService service)
	{
		UYearsbillmonthHome.service = service;
	}
}
