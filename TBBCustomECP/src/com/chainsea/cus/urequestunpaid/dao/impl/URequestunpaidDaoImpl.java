package com.chainsea.cus.urequestunpaid.dao.impl;

import com.jeedsoft.quicksilver.base.dao.impl.EntityDaoImpl;
import com.chainsea.cus.urequestunpaid.URequestunpaidHome;
import com.chainsea.cus.urequestunpaid.dao.URequestunpaidDao;
import com.chainsea.cus.urequestunpaid.model.URequestunpaidModel;

public class URequestunpaidDaoImpl extends EntityDaoImpl<URequestunpaidModel> implements URequestunpaidDao
{
	public URequestunpaidDaoImpl()
	{
		super(URequestunpaidHome.UNIT_ID, URequestunpaidModel.class);
	}
}
