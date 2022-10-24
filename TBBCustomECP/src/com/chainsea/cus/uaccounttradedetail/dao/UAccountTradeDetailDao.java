package com.chainsea.cus.uaccounttradedetail.dao;

import java.util.UUID;

import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.jeedsoft.common.advanced.db.dataset.DataSet;
import com.jeedsoft.common.advanced.db.dataset.Record;
import com.jeedsoft.quicksilver.base.dao.EntityDao;
import com.jeedsoft.quicksilver.base.type.DaoContext;

public interface UAccountTradeDetailDao extends EntityDao<UAccountTradeDetailModel>
{

    DataSet<Record> getUAccountTradeDetailData(DaoContext dc, UUID entityId);

    DataSet<Record> getAppealData(DaoContext dc, String u_Branch, String u_Account);

    DataSet<Record> getContactKey(DaoContext dc, UUID entityId);
}
