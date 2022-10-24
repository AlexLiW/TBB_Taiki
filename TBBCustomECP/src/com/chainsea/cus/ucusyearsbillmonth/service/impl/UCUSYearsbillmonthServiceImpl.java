package com.chainsea.cus.ucusyearsbillmonth.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;

import com.chainsea.cus.ucusyearsbillmonth.UCUSYearsbillmonthHome;
import com.chainsea.cus.ucusyearsbillmonth.model.UCUSYearsbillmonthModel;
import com.chainsea.cus.ucusyearsbillmonth.service.UCUSYearsbillmonthService;
import com.ibm.icu.text.SimpleDateFormat;
import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.service.impl.EntityServiceImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.jeedsoft.quicksilver.layout.ExportHome;
import com.jeedsoft.quicksilver.layout.model.ExcelExportModel;
import com.jeedsoft.quicksilver.unit.model.FieldModel;

public class UCUSYearsbillmonthServiceImpl extends EntityServiceImpl<UCUSYearsbillmonthModel> implements UCUSYearsbillmonthService {
    public UCUSYearsbillmonthServiceImpl() {
        super(UCUSYearsbillmonthHome.UNIT_ID, UCUSYearsbillmonthModel.class);
    }

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

    @Override
    public FileResult doExcel(ServiceContext sc, JSONArray data) {
        FieldModel[] fields = new FieldModel[11];
        String[] name = { "U_TYPE", "U_CARDNUM", "U_Creditdate", "U_Tradingdate", "U_Tradingnote", "U_Country", "U_Currency", "U_Area", "U_Foreignmoney", "U_Tradenum", "U_Billamount" };
        String[] title = { "卡別", "卡號", "入帳日期", "交易日期", "交易摘要", "國別", "幣別", "地區", "外幣金額", "交易代碼", "帳單金額" };

        for (int i = 0; i < name.length; i++) {
            fields[i] = new FieldModel(name[i], title[i]);
            fields[i].setType("InputBox-Text");
        }

        String day = getDate();
        UCUSYearsbillmonthModel[] datalist = (UCUSYearsbillmonthModel[]) JsonUtil.toObjectArray(data, UCUSYearsbillmonthModel.class);
        List<UCUSYearsbillmonthModel> list = Arrays.asList(datalist);
        ExcelExportModel model = new ExcelExportModel("UCUSYearsbillmonth", fields, list);
        return new FileResult("信用卡已出總帳單明細查詢" + day + ".xlsx", ExportHome.getService().getExcelBytes(sc, new ExcelExportModel[] { model }));
    }

    public static String getDate() {
        Date now = new Date();
        SimpleDateFormat smp = new SimpleDateFormat("yyyyMMdd");
        String today = smp.format(now);
        return today;
    }
}
