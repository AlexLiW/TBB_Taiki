package com.chainsea.cus.uaccounttradedetail.model;

import java.sql.ResultSet;

import org.json.JSONObject;

import com.jeedsoft.common.advanced.db.dataset.Record;
import com.jeedsoft.quicksilver.base.model.EntityModel;

public class UAccountTradeDetailModel extends EntityModel
{
	private static final long serialVersionUID = 1L;

	public UAccountTradeDetailModel()
	{
	}

	public UAccountTradeDetailModel(Record r)
	{
		super(r);
	}

	public UAccountTradeDetailModel(ResultSet rs)
	{
		super(rs);
	}

	public UAccountTradeDetailModel(JSONObject json)
	{
		super(json);
	}
}
