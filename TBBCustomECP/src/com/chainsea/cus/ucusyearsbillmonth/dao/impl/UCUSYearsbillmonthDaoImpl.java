package com.chainsea.cus.ucusyearsbillmonth.dao.impl;

import com.jeedsoft.quicksilver.base.dao.impl.EntityDaoImpl;
import com.chainsea.cus.ucusyearsbillmonth.UCUSYearsbillmonthHome;
import com.chainsea.cus.ucusyearsbillmonth.dao.UCUSYearsbillmonthDao;
import com.chainsea.cus.ucusyearsbillmonth.model.UCUSYearsbillmonthModel;

public class UCUSYearsbillmonthDaoImpl extends EntityDaoImpl<UCUSYearsbillmonthModel> implements UCUSYearsbillmonthDao
{
	public UCUSYearsbillmonthDaoImpl()
	{
		super(UCUSYearsbillmonthHome.UNIT_ID, UCUSYearsbillmonthModel.class);
	}
}
