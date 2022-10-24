package com.chainsea.cus.urequestunpaid.model;

import java.sql.ResultSet;

import org.json.JSONObject;

import com.jeedsoft.quicksilver.base.model.EntityModel;
import com.jeedsoft.common.advanced.db.dataset.Record;

public class URequestunpaidModel extends EntityModel
{
	private static final long serialVersionUID = 1L;

	public URequestunpaidModel()
	{
	}

	public URequestunpaidModel(Record r)
	{
		super(r);
	}

	public URequestunpaidModel(ResultSet rs)
	{
		super(rs);
	}

	public URequestunpaidModel(JSONObject json)
	{
		super(json);
	}
}
