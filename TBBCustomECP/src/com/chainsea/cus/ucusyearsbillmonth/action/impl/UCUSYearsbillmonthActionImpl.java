package com.chainsea.cus.ucusyearsbillmonth.action.impl;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chainsea.cus.ucusyearsbillmonth.UCUSYearsbillmonthHome;
import com.chainsea.cus.ucusyearsbillmonth.action.UCUSYearsbillmonthAction;
import com.chainsea.cus.ucusyearsbillmonth.model.UCUSYearsbillmonthModel;
import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.action.impl.EntityActionImpl;
import com.jeedsoft.quicksilver.base.type.ActionContext;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;

public class UCUSYearsbillmonthActionImpl extends EntityActionImpl<UCUSYearsbillmonthModel> implements UCUSYearsbillmonthAction {

    /*******************************************************************************
     * Author: gemfor\Tiffany.Wu;
     * CreateDate: 2021/09/17
     * Description: 信用卡已出總帳單明細查詢 - 匯出EXCEL
     * 
     * input parameters: JSONArray data
     * 
     * output parameters: file
     * 
     * LastUpdateUser: gemfor\Tiffany.Wu;
     * LastUpdateDate: 2021/09/17
     * Note:
     ******************************************************************************/

    // private static final Logger logger = LoggerFactory.getLogger(UCUSYearsbillmonthActionImpl.class);

    public UCUSYearsbillmonthActionImpl() {
        super(UCUSYearsbillmonthHome.UNIT_ID, UCUSYearsbillmonthModel.class);
    }

    @Override
    public FileResult doExcel(ActionContext ac) {
        // logger.info("20210622");
        ServiceContext sc = ac.getServiceContext();
        JSONObject args = ac.getArguments();
        JSONArray data = JsonUtil.getJsonArray(args, "data");
        return UCUSYearsbillmonthHome.getService().doExcel(sc, data);

    }
}
