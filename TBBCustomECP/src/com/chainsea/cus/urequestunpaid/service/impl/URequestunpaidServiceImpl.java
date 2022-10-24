package com.chainsea.cus.urequestunpaid.service.impl;

import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.service.impl.EntityServiceImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.jeedsoft.quicksilver.layout.ExportHome;
import com.jeedsoft.quicksilver.layout.model.ExcelExportModel;
import com.jeedsoft.quicksilver.unit.model.FieldModel;
import java.util.Date;
import java.util.List;
import java.util.Arrays;
import com.ibm.icu.text.SimpleDateFormat;

import org.json.JSONArray;

import com.chainsea.cus.urequestunpaid.URequestunpaidHome;
import com.chainsea.cus.urequestunpaid.service.URequestunpaidService;
import com.chainsea.cus.urequestunpaid.model.URequestunpaidModel;

public class URequestunpaidServiceImpl extends EntityServiceImpl<URequestunpaidModel> implements URequestunpaidService
{
	public URequestunpaidServiceImpl()
	{
		super(URequestunpaidHome.UNIT_ID, URequestunpaidModel.class);
	}

    /*******************************************************************************
     * Author: gemfor\Emily.tsai;
     * CreateDate: 2021/09/16 
     * Description:匯出多筆excel
     * 
     * input parameters: JSONArray data
     * 
     * output parameters: file
     * 
     * LastUpdateUser: gemfor\Emily.tsai;
     * LastUpdateDate: 2021/09/16
     * Note:
     ******************************************************************************/
	
	
	@Override
	public FileResult exportList(ServiceContext sc, JSONArray data) {
		FieldModel[] fields = new FieldModel[10];
		String[] name = {"U_OCardNum","U_Creditdate","U_Tradingdate","U_Tradingnote","U_Country","U_Area","U_Currency","U_Foreignmoney","U_Tradenum","U_Billamount"};
		String[] title = {"卡號","入帳日期","交易日期","交易摘要","國別","地區","幣別","外幣金額","交易代碼","交易金額"};
		
		for (int i = 0; i < name.length; i++) {
	          fields[i] = new FieldModel(name[i], title[i]);
	          fields[i].setType("InputBox-Text");
	        }
		
		String day = getDate();
		
		URequestunpaidModel[] datalist = (URequestunpaidModel[])JsonUtil.toObjectArray(data, URequestunpaidModel.class);
		List<URequestunpaidModel> list = Arrays.asList(datalist);
		ExcelExportModel model = new ExcelExportModel("UAccountTradeDetail", fields, list);
        return new FileResult("信用卡各卡別未出帳單明細查詢"+day+".xlsx", ExportHome.getService().getExcelBytes(sc, new ExcelExportModel[] { model }));
		
	}
	
	public static String getDate() {
        Date now = new Date();
        SimpleDateFormat smp = new SimpleDateFormat("yyyyMMdd");
        String today = smp.format(now);
        return today;
    }
	
}
