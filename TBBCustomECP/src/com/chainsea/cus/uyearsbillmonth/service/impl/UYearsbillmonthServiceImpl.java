package com.chainsea.cus.uyearsbillmonth.service.impl;

import com.jeedsoft.common.basic.util.JsonUtil;
import com.jeedsoft.quicksilver.base.service.impl.EntityServiceImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import com.jeedsoft.quicksilver.layout.ExportHome;
import com.jeedsoft.quicksilver.layout.model.ExcelExportModel;
import com.jeedsoft.quicksilver.unit.model.FieldModel;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;




//直接指定字型
import com.itextpdf.layout.font.FontProvider;
import com.itextpdf.styledxmlparser.resolver.font.BasicFontProvider;

import java.io.*;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.io.source.OutputStream;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfOutputStream;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;


import com.chainsea.cus.uyearsbillmonth.UYearsbillmonthHome;
import com.chainsea.cus.uyearsbillmonth.service.UYearsbillmonthService;
import com.ibm.icu.text.SimpleDateFormat;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.chainsea.cus.uyearsbillmonth.model.UYearsbillmonthModel;

public class UYearsbillmonthServiceImpl extends EntityServiceImpl<UYearsbillmonthModel> implements UYearsbillmonthService
{
	public UYearsbillmonthServiceImpl()
	{
		super(UYearsbillmonthHome.UNIT_ID, UYearsbillmonthModel.class);
	}
	 
    /*******************************************************************************
     * Author: chainsea\hsin.lin;
     * CreateDate: 2021/06/22 
     * Description:匯出多筆excel
     * 
     * input parameters: JSONArray data
     * 
     * output parameters: file
     * 
     * LastUpdateUser: gemfor\Emily.tsai;
     * LastUpdateDate: 2021/09/16
     * Note:新增欄位、順序調整
     ******************************************************************************/
    
    @Override
    public FileResult exportList(ServiceContext sc, JSONArray data) {
        // TODO Auto-generated method stub
        
    	//2021/09/16-gemfor\Emily 
        FieldModel[] fields = new FieldModel[11]; 
        String[] name = { "U_CardType", "U_OCardNum", "U_Creditdate", "U_Tradingdate", "U_Tradingnote", "U_Country", "U_Area", "U_Currency", "U_Foreignmoney", "U_Tradenum", "U_Billamount"};

        String[] title = { "卡別", "卡號", "入帳日期", "交易日期", "交易摘要", "國別", "地區", "幣別", "外幣金額", "交易代碼", "帳單金額"};


        for (int i = 0; i < name.length; i++) {
          fields[i] = new FieldModel(name[i], title[i]);
          fields[i].setType("InputBox-Text");
        } 

        String day = getDate(); 
        UYearsbillmonthModel[] datalist = (UYearsbillmonthModel[])JsonUtil.toObjectArray(data, UYearsbillmonthModel.class);
        List<UYearsbillmonthModel> list = Arrays.asList(datalist);
        ExcelExportModel model = new ExcelExportModel("UAccountTradeDetail", fields, list);
        return new FileResult("信用卡各卡別帳單明細查詢"+day+".xlsx", ExportHome.getService().getExcelBytes(sc, new ExcelExportModel[] { model }));
    }
    
    public static String getDate() {
        Date now = new Date();
        SimpleDateFormat smp = new SimpleDateFormat("yyyyMMdd");
        String today = smp.format(now);
        return today;
    }
    
    /*******************************************************************************
     * Author: chainsea\hsin.lin;
     * CreateDate: 2021/06/21
     * Description:html匯出pdf
     * 
     * input parameters: String getHtml,getImg
     * 
     * output parameters: file
     * 
     * LastUpdateUser: chainsea\hsin.lin;
     * LastUpdateDate: 2021/07/28
     * Note:update img html
     * @return 
     ******************************************************************************/
    @Override
    public FileResult pdfFile(ServiceContext sc, String getHtml, String getImg,String filename) {

        // TODO Auto-generated method stub

        String html = getHtml;
        html = StringEscapeUtils.unescapeXml(html);
        html = html.replace("</body>", "").replace("</html>", "");
        html += "<div style=\"height: 500px; page-break-inside: avoid;\"><center> <img width=\"700\" src=\"data:image/jpeg;base64," + getImg + "\" /> </center></div></body>\r\n </html>";
        //logger.info("html:    " + html);
        ConverterProperties props = new ConverterProperties();
        
        //(pdf設定字型, 嵌入字型, 系統字型)
        DefaultFontProvider dfp = new DefaultFontProvider(false, false, true);
        //DefaultFontProvider dfp = new DefaultFontProvider(true, true, true);
        //logger.info("fonts");
        
        //直接指定字型
        //FontProvider dfp = new BasicFontProvider(false, false);
        //dfp.addDirectory("C:/fonts");
        //dfp.addDirectory("../../custom/fonts");
        
        props.setFontProvider(dfp); 
        


        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            HtmlConverter.convertToPdf(html, out, props);
            FileResult result = new FileResult(filename+".pdf", ((ByteArrayOutputStream) out).toByteArray());
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            // logger.info("[pdfFile Error] = {}", e);
            return null;
        }
        

//        String pdfFile = filename+".pdf";
//        try (PdfWriter wr = new PdfWriter(pdfFile)) {
//            PdfDocument doc = new PdfDocument(wr);
//            //doc.setDefaultPageSize(PageSize.A4);
//            doc.setDefaultPageSize(new PageSize(900, 1273));
//            HtmlConverter.convertToPdf(html, doc, props);
//            FileResult result = new FileResult(pdfFile, doc);
//            return result;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }


    }
}
