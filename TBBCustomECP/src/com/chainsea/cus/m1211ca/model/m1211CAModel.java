package com.chainsea.cus.m1211ca.model;

import java.sql.ResultSet;

import org.json.JSONObject;

import com.jeedsoft.quicksilver.base.model.EntityModel;
import com.jeedsoft.common.advanced.db.dataset.Record;

public class m1211CAModel extends EntityModel
{
	private static final long serialVersionUID = 1L;

	public m1211CAModel()
	{
	}

	public m1211CAModel(Record r)
	{
		super(r);
	}

	public m1211CAModel(ResultSet rs)
	{
		super(rs);
	}

	public m1211CAModel(JSONObject json)
	{
		super(json);
	}
}
