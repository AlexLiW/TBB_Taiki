package com.chainsea.cus.uyearsbillmonth.dao.impl;

import com.jeedsoft.quicksilver.base.dao.impl.EntityDaoImpl;
import com.chainsea.cus.uyearsbillmonth.UYearsbillmonthHome;
import com.chainsea.cus.uyearsbillmonth.dao.UYearsbillmonthDao;
import com.chainsea.cus.uyearsbillmonth.model.UYearsbillmonthModel;

public class UYearsbillmonthDaoImpl extends EntityDaoImpl<UYearsbillmonthModel> implements UYearsbillmonthDao
{
	public UYearsbillmonthDaoImpl()
	{
		super(UYearsbillmonthHome.UNIT_ID, UYearsbillmonthModel.class);
	}
}
