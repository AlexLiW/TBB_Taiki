package com.chainsea.cus.m1211ca.service.impl;

import com.jeedsoft.quicksilver.base.service.impl.EntityServiceImpl;
import com.jeedsoft.quicksilver.base.type.FileResult;
import com.jeedsoft.quicksilver.base.type.ServiceContext;
import org.apache.commons.lang3.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


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
import com.chainsea.cus.m1211ca.m1211CAHome;
import com.chainsea.cus.m1211ca.service.m1211CAService;
import com.chainsea.cus.m1211ca.model.m1211CAModel;

public class m1211CAServiceImpl extends EntityServiceImpl<m1211CAModel> implements m1211CAService {
    private static final Logger logger = LoggerFactory.getLogger(m1211CAServiceImpl.class);

    public m1211CAServiceImpl() {
        super(m1211CAHome.UNIT_ID, m1211CAModel.class);
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
