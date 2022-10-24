package com.chainsea.cus.uaccounttradedetail.dao.impl;

import java.util.UUID;

import com.chainsea.cus.uaccounttradedetail.UAccountTradeDetailHome;
import com.chainsea.cus.uaccounttradedetail.dao.UAccountTradeDetailDao;
import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.jeedsoft.common.advanced.db.dataset.DataSet;
import com.jeedsoft.common.advanced.db.dataset.Record;
import com.jeedsoft.quicksilver.base.dao.impl.EntityDaoImpl;
import com.jeedsoft.quicksilver.base.type.DaoContext;

public class UAccountTradeDetailDaoImpl extends EntityDaoImpl<UAccountTradeDetailModel> implements UAccountTradeDetailDao {
    public UAccountTradeDetailDaoImpl() {
        super(UAccountTradeDetailHome.UNIT_ID, UAccountTradeDetailModel.class);
    }

    @Override
    public DataSet<Record> getUAccountTradeDetailData(DaoContext dc, UUID entityId) {
        String sql = "select ";
        DataSet<Record> ds = getExecutor().getDataSet(sql, new Object[] { entityId });
        return ds;

    }

    @Override
    public DataSet<Record> getAppealData(DaoContext dc, String u_Branch, String u_Account) {
        // TODO Auto-generated method stub
        return null;

    }

    @Override
    public DataSet<Record> getContactKey(DaoContext dc, UUID entityId) {
        // TODO Auto-generated method stub
        return null;
    }
}
