package com.chainsea.cus.uaccounttradedetail.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.chainsea.cus.uaccounttradedetail.UAccountTradeDetailHome;
import com.chainsea.cus.uaccounttradedetail.model.UAccountTradeDetailModel;
import com.chainsea.cus.uaccounttradedetail.service.UAccountTradeDetailService;
import com.ibm.icu.text.SimpleDateFormat;
import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.service.impl.EntityServiceImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.jeedsoft.quicksilver.layout.ExportHome;
import com.jeedsoft.quicksilver.layout.model.ExcelExportModel;
import com.jeedsoft.quicksilver.unit.model.FieldModel;

public class UAccountTradeDetailServiceImpl extends EntityServiceImpl<UAccountTradeDetailModel> implements UAccountTradeDetailService
{
    private static final Logger logger = LoggerFactory.getLogger(UAccountTradeDetailServiceImpl.class);
    public UAccountTradeDetailServiceImpl()
	{
		super(UAccountTradeDetailHome.UNIT_ID, UAccountTradeDetailModel.class);
	}

    
    /*******************************************************************************
     * Author: chainsea\hsin.lin;
     * CreateDate: 2021/06/03 
     * Description:匯出多筆excel
     * 
     * input parameters: JSONArray data
     * 
     * output parameters: file
     * 
     * LastUpdateUser: gemfor/Emma;
     * LastUpdateDate: 2022.04.02
     * Note: 2022.04.02-gemfor/Emma -加入/行庫別/
     ******************************************************************************/
    
    @Override
    public FileResult exportList(ServiceContext sc, JSONArray data) {
        // TODO Auto-generated method stub
        
        //FieldModel[] fields = new FieldModel[7];
        FieldModel[] fields = new FieldModel[8]; //2022.04.02-gemfor/Emma -加入/行庫別/
        //String[] name = { "U_DateAndTime", "U_Memo", "U_Pay", "U_Income", "U_Balance", "U_BankNo","U_UserData"};
        String[] name = { "U_DateAndTime", "U_Memo", "U_Pay", "U_Income", "U_Balance", "U_BankNo","U_IBankNo","U_UserData"}; //2022.04.02-gemfor/Emma -加入/行庫別/

        //String[] title = { "交易日期/時間", "摘要", "支出", "存入", "結存", "代收支付","補充資料"};
        String[] title = { "交易日期/時間", "摘要", "支出", "存入", "結存", "代收支付","行庫別","補充資料"}; //2022.04.02-gemfor/Emma -加入/行庫別/


        for (int i = 0; i < name.length; i++) {
          fields[i] = new FieldModel(name[i], title[i]);
          fields[i].setType("InputBox-Text");
        } 

        String day = getDate(); 
        UAccountTradeDetailModel[] datalist = (UAccountTradeDetailModel[])JsonUtil.toObjectArray(data, UAccountTradeDetailModel.class);
        List<UAccountTradeDetailModel> list = Arrays.asList(datalist);
        ExcelExportModel model = new ExcelExportModel("UAccountTradeDetail", fields, list);
        return new FileResult("疑似不法-查詢交易-帳戶交易明細查詢作業"+day+".xlsx", ExportHome.getService().getExcelBytes(sc, new ExcelExportModel[] { model }));
    }
    
    public static String getDate() {
        Date now = new Date();
        SimpleDateFormat smp = new SimpleDateFormat("yyyyMMdd");
        String today = smp.format(now);
        return today;
    }
}
