package com.chainsea.cus.ucusyearsbillmonth.model;

import java.sql.ResultSet;

import org.json.JSONObject;

import com.jeedsoft.quicksilver.base.model.EntityModel;
import com.jeedsoft.common.advanced.db.dataset.Record;

public class UCUSYearsbillmonthModel extends EntityModel
{
	private static final long serialVersionUID = 1L;

	public UCUSYearsbillmonthModel()
	{
	}

	public UCUSYearsbillmonthModel(Record r)
	{
		super(r);
	}

	public UCUSYearsbillmonthModel(ResultSet rs)
	{
		super(rs);
	}

	public UCUSYearsbillmonthModel(JSONObject json)
	{
		super(json);
	}
}
