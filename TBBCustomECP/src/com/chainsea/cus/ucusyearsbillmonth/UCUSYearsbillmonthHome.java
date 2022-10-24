package com.chainsea.cus.ucusyearsbillmonth;

import java.util.UUID;

import com.chainsea.cus.ucusyearsbillmonth.dao.UCUSYearsbillmonthDao;
import com.chainsea.cus.ucusyearsbillmonth.service.UCUSYearsbillmonthService;

public class UCUSYearsbillmonthHome
{
	public static final UUID UNIT_ID = UUID.fromString("2eda0929-0c00-832b-5c0c-17a138ac4b90");
	public static final String CACHE_REGION = "tbb_ucusyearsbillmonth";
	
	private static UCUSYearsbillmonthDao dao;
	private static UCUSYearsbillmonthService service;
	
	public static UCUSYearsbillmonthDao getDao()
	{
		return dao;
	}

	public static void setDao(UCUSYearsbillmonthDao dao)
	{
		UCUSYearsbillmonthHome.dao = dao;
	}
	
	public static UCUSYearsbillmonthService getService()
	{
		return service;
	}

	public static void setService(UCUSYearsbillmonthService service)
	{
		UCUSYearsbillmonthHome.service = service;
	}
}
