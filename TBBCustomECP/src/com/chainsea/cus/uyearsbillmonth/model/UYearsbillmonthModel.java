package com.chainsea.cus.uyearsbillmonth.model;

import java.sql.ResultSet;

import org.json.JSONObject;

import com.jeedsoft.quicksilver.base.model.EntityModel;
import com.jeedsoft.common.advanced.db.dataset.Record;

public class UYearsbillmonthModel extends EntityModel
{
	private static final long serialVersionUID = 1L;

	public UYearsbillmonthModel()
	{
	}

	public UYearsbillmonthModel(Record r)
	{
		super(r);
	}

	public UYearsbillmonthModel(ResultSet rs)
	{
		super(rs);
	}

	public UYearsbillmonthModel(JSONObject json)
	{
		super(json);
	}
}
