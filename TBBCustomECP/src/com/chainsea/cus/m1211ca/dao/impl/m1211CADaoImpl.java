package com.chainsea.cus.m1211ca.dao.impl;

import com.jeedsoft.quicksilver.base.dao.impl.EntityDaoImpl;
import com.chainsea.cus.m1211ca.m1211CAHome;
import com.chainsea.cus.m1211ca.dao.m1211CADao;
import com.chainsea.cus.m1211ca.model.m1211CAModel;

public class m1211CADaoImpl extends EntityDaoImpl<m1211CAModel> implements m1211CADao
{
	public m1211CADaoImpl()
	{
		super(m1211CAHome.UNIT_ID, m1211CAModel.class);
	}
}
