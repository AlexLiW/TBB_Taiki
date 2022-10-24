<%@page contentType="text/html;charset=UTF-8"%>
<%
String ck="Pie2D" ;          //Line   MSLine  MSBar2D  ScrollColumn2D ScrollLine2D Pie2D 
String pagekind="4" ;        //ChartShow 的 xml 格式類別
int debugMode=0;             // 0,1 
String showPageTag= "CSR.Gateway.ChartShow.page" ;   //單元葉面名稱
String kind="Pie2D,4" ;    //單純示範 swf 檔案傳直的方式   

 if ( request.getParameter("kind") !=  null )  
        {  kind=request.getParameter(filter("kind")); 
           kind=kind + ",Pie3D,6" ;
           String[] kinds =kind.split(","); 
           ck=kinds[0] ;
           pagekind=kinds[1] ;  
        }
 
//For Cross-Site Scripting: Reflected
 public static String filter(output){
     List<String> list = new ArrayList<String>();
     list.add("<");
     list.add(">");
     list.add("(");
     list.add(")");
     list.add("&");
     list.add("?");
     list.add(";");
     String encode= Normalizer.normalize(output,Normalizer.Form.NFKC);
     for(int i = 0; i<list.size();i++){
         encode=encode.replace(list.get(i),"");
     }
 return encode;
 }
%>
<html>   
<head>   
    <%@include file="/quicksilver/page/include/Initialize.jsp"%>
    <%@include file="/quicksilver/page/include/HeadBegin.jsp"%>
	<script src="quicksilver/page/util/CommonBusiness.js"></script>
	<script src="quicksilver/esc/EscMinimized.js"></script>
	<%@include file="/quicksilver/page/include/HeadEnd.jsp"%>	

</head>    
<body  >    
 <form  >	 

 
 


		  <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0"  >
            <tr><td>
 <table  border="0" align="center" cellpadding="0" cellspacing="0"  >
            <tr><td>
	 <object width="1000" height="420" id="<%=ck%>" 
	 classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  
	 codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" >   
     <param name="movie" value="/ecp/quicksilver/fusioncharts/<%=ck%>.swf" />    
	 <param name="FlashVars" value="&dataURL=<%=showPageTag%>?kind=<%=kind%>,0000,30&chartWidth=1162&chartHeight=420&DOMId=myChartId&registerWithJS=1&debugMode=<%=debugMode%>">   
     <param name="quality" value="high" />    
	 <embed src="/ecp/quicksilver/fusioncharts/<%=ck%>.swf" 
	 flashVars="&dataURL=<%=showPageTag%>?kind=<%=kind%>,0000,30&chartWidth=1162&chartHeight=420&DOMId=myChartId&registerWithJS=1&debugMode=<%=debugMode%>"   
	 width="1162" height="420" name="Angular Gauge" quality="high" type="application/x-shockwave-flash"   pluginspage="http://www.macromedia.com/go/getflashplayer" />   
     </object>    			 
            </td></tr>
</table> 
		 </td> 
        </tr>
      </table> 
 
 

 
 
 
 
 
 </form>
 

 
 
</body>
	 
</html>