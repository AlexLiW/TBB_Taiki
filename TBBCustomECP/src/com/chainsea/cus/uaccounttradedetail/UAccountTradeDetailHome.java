package com.chainsea.cus.uaccounttradedetail;



import java.util.UUID;

import com.chainsea.cus.uaccounttradedetail.dao.UAccountTradeDetailDao;
import com.chainsea.cus.uaccounttradedetail.service.UAccountTradeDetailService;

public class UAccountTradeDetailHome
{
	public static final UUID UNIT_ID = UUID.fromString("1788769c-3400-0001-5ef2-005056c00008");
	public static final String CACHE_REGION = "tbb_uaccounttradedetail";
	
	private static UAccountTradeDetailDao dao;
	private static UAccountTradeDetailService service;
	
	public static UAccountTradeDetailDao getDao()
	{
		return dao;
	}

	public static void setDao(UAccountTradeDetailDao dao)
	{
		UAccountTradeDetailHome.dao = dao;
	}
	
	public static UAccountTradeDetailService getService()
	{
		return service;
	}

	public static void setService(UAccountTradeDetailService service)
	{
		UAccountTradeDetailHome.service = service;
	}
}
