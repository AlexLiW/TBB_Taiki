<%  byte[] utf8Bom = new byte[]{(byte) 0xef, (byte) 0xbb, (byte) 0xbf};
    String utf8BomStr = new String(utf8Bom,"UTF-8");
%><%=utf8BomStr%><?xml version='1.0' encoding='UTF-8'?>
<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>


<%
String kind=request.getParameter("kind");
String pageKind="1";
 

 if ( request.getParameter("kind") !=  null )  
 {  kind=request.getParameter("kind"); 
    String[] kinds =kind.split(","); 
    String ck=kinds[0] ;
    pageKind=kinds[1] ;  
 }

//if ( request.getParameter("ck") !=  null )  
//{  ck=request.getParameter("ck");      
//   ck=ck+"46BFCD17-73B3-43F5-B097-A0E4EB73D256" ;              
//   String[] cks = ck.split(","); 
//   pageKind=cks[0] ; 
//   depID=cks[1] ; 
//}
%>





<%
  if (pageKind.equals("1")) //Line.swf
{ 	
%>	
<chart caption='Monthly Unit Sales' xAxisName='Month' yAxisName='Units' showValues='0' formatNumberScale='0' showBorder='1'>
  <set label='Jan' value='462' /> 
  <set label='Feb' value='857' />
  <set label='Mar' value='671' />  
  <set label='Apr' value='494' /> 
  <set label='May' value='761' /> 
  <set label='Jun' value='960' /> 
  <set label='Jul' value='629' /> 
  <set label='Aug' value='622' /> 
  <set label='Sep' value='376' /> 
  <set label='Oct' value='494' /> 
  <set label='Nov' value='761' /> 
  <set label='Dec' value='960' />
</chart>

<%
}
%>


<%
  if (pageKind.equals("2"))   //MSLine.swf
{ 	
%>	
<chart palette="3" caption="損益表   " subCaption=" 趨勢圖   " showValues="0"  yAxisMaxValue="100"  divLineDecimalPrecision="1" limitsDecimalPrecision="1" PYAxisName="Amount" SYAxisName="Quantity" numberPrefix=""   numbersuffix=""   formatNumberScale="0"  showExportDataMenuItem="1"    showBorder="0" borderColor="FFFFFF"  borderAlpha="50"  borderThickness="0" bgColor="004EA0,EBEBFF" bgImageAlpha='100'  >

<categories>
  <category label="一月" />
  <category label="二月" />
  <category label="三月" />
  <category label="四月" />
  <category label="五月" />
  <category label="六月" />
  <category label="七月" />
  <category label="八月" />
  <category label="九月" />
  <category label="十月" />
  <category label="十一月" />
  <category label="十二月" />
</categories>

<dataset seriesName="外部收入"  renderAs="Line" >
  <set value="100.00" />
  <set value="150.00" />
  <set value="120.00" />
  <set value="140.00" />
  <set value="160.00" />
  <set value="145.00" />
  <set value="150.00" />
  <set value="160.00" />
  <set value="130.00" />
  <set value="140.00" />
  <set value="135.00" />
  <set value="140.00" />
</dataset>

<dataset seriesName="內部收入"   renderAs="Line"  >
  <set value="140.00" />
  <set value="130.00" />
  <set value="120.00" />
  <set value="140.00" />
  <set value="150.00" />
  <set value="130.00" />
  <set value="145.00" />
  <set value="150.00" />
  <set value="130.00" />
  <set value="150.00" />
  <set value="140.00" />
  <set value="143.00" />
</dataset>

<dataset seriesName="部門支出"   renderAs="Line"  >
  <set value="114.00" />
  <set value="115.00" />
  <set value="80.00" />
  <set value="95.00" />
  <set value="146.00" />
  <set value="140.00" />
  <set value="110.00" />
  <set value="120.00" />
  <set value="116.00" />
  <set value="124.00" />
  <set value="145.00" />
  <set value="123.00" />
</dataset>

<dataset seriesName="費用"   renderAs="Line"  >
  <set value="90.00" />
  <set value="120.00" />
  <set value="115.00" />
  <set value="130.00" />
  <set value="146.00" />
  <set value="95.00" />
  <set value="113.00" />
  <set value="123.00" />
  <set value="117.00" />
  <set value="80.00" />
  <set value="123.00" />
  <set value="147.00" />
</dataset>

<dataset seriesName="損益"   renderAs="Line"  >
  <set value="36.00" />
  <set value="45.00" />
  <set value="45.00" />
  <set value="55.00" />
  <set value="18.00" />
  <set value="40.00" />
  <set value="72.00" />
  <set value="67.00" />
  <set value="27.00" />
  <set value="86.00" />
  <set value="7.00" />
  <set value="13.00" />
</dataset>

<dataset seriesName="纍計損益"   renderAs="Line"  >
  <set value="36.00" />
  <set value="81.00" />
  <set value="126.00" />
  <set value="181.00" />
  <set value="199.00" />
  <set value="239.00" />
  <set value="311.00" />
  <set value="378.00" />
  <set value="405.00" />
  <set value="491.00" />
  <set value="498.00" />
  <set value="511.00" />
</dataset>

</chart>
<%
}
%>




<%
  if (pageKind.equals("3"))   //MSBar2D.swf  ,ScrollColumn2D.swf ,  ScrollLine2D
{ 	
%>	
<chart palette="3" caption="損益表   " subCaption=" 趨勢圖   " showValues="0"  yAxisMaxValue="100"  divLineDecimalPrecision="1" limitsDecimalPrecision="1" PYAxisName="Amount" SYAxisName="Quantity" numberPrefix=""   numbersuffix=""   formatNumberScale="0"  showExportDataMenuItem="1"    showBorder="0" borderColor="FFFFFF"  borderAlpha="50"  borderThickness="0" bgColor="004EA0,EBEBFF" bgImageAlpha='100'  >

<categories>
  <category label="一月" />
  <category label="二月" />
  <category label="三月" />
  <category label="四月" />
  <category label="五月" />
  <category label="六月" />
  <category label="七月" />
  <category label="八月" />
  <category label="九月" />
  <category label="十月" />
  <category label="十一月" />
  <category label="十二月" />
</categories>

<dataset seriesName="外部收入"  renderAs="Line" >
  <set value="100.00" />
  <set value="150.00" />
  <set value="120.00" />
  <set value="140.00" />
  <set value="160.00" />
  <set value="145.00" />
  <set value="150.00" />
  <set value="160.00" />
  <set value="130.00" />
  <set value="140.00" />
  <set value="135.00" />
  <set value="140.00" />
</dataset>

<dataset seriesName="內部收入"   renderAs="Line"  >
  <set value="140.00" />
  <set value="130.00" />
  <set value="120.00" />
  <set value="140.00" />
  <set value="150.00" />
  <set value="130.00" />
  <set value="145.00" />
  <set value="150.00" />
  <set value="130.00" />
  <set value="150.00" />
  <set value="140.00" />
  <set value="143.00" />
</dataset>

<dataset seriesName="部門支出"   renderAs="Line"  >
  <set value="114.00" />
  <set value="115.00" />
  <set value="80.00" />
  <set value="95.00" />
  <set value="146.00" />
  <set value="140.00" />
  <set value="110.00" />
  <set value="120.00" />
  <set value="116.00" />
  <set value="124.00" />
  <set value="145.00" />
  <set value="123.00" />
</dataset>

<dataset seriesName="費用"   renderAs="Line"  >
  <set value="90.00" />
  <set value="120.00" />
  <set value="115.00" />
  <set value="130.00" />
  <set value="146.00" />
  <set value="95.00" />
  <set value="113.00" />
  <set value="123.00" />
  <set value="117.00" />
  <set value="80.00" />
  <set value="123.00" />
  <set value="147.00" />
</dataset>

<dataset seriesName="損益"   renderAs="Line"  >
  <set value="36.00" />
  <set value="45.00" />
  <set value="45.00" />
  <set value="55.00" />
  <set value="18.00" />
  <set value="40.00" />
  <set value="72.00" />
  <set value="67.00" />
  <set value="27.00" />
  <set value="86.00" />
  <set value="7.00" />
  <set value="13.00" />
</dataset>

<dataset seriesName="纍計損益"   renderAs="Line"  >
  <set value="36.00" />
  <set value="81.00" />
  <set value="126.00" />
  <set value="181.00" />
  <set value="199.00" />
  <set value="239.00" />
  <set value="311.00" />
  <set value="378.00" />
  <set value="405.00" />
  <set value="491.00" />
  <set value="498.00" />
  <set value="511.00" />
</dataset>

</chart>
<%
}
%>



<%
  if (pageKind.equals("4"))   //Pie2D
{ 	
%>	
<chart ShowAboutMenuItem='0' caption='損益分配圖' xAxisName='月份' yAxisName='損益' numberPrefix='%A5' 
  exportEnabled='1' exportShowMenuItem='1' exportAtClient='1' exportHandler='fcExporter1'  
   baseFont='宋体'  baseFontSize='14' bgColor='FFFFFF' shadowAlpha='100'  
    exportFormats='JPEG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF文件'    canvasBgColor='FFFFFF' >	
      <set name='一月' value='36.00' />     
      <set name='二月' value='45.00' />   
      <set name='三月' value='45.00' />   
      <set name='四月' value='55.00' />   	
      <set name='五月' value='18.00' isSliced = '1'  />   	
      <set name='六月' value='40.00' isSliced = '1'/>   
      <set name='七月' value='72.00' link='javascript:showFusinValue("650")'/>  
      <set name='八月' value='67.00' link='javascript:showFusinValue(622)'/>  
      <set name='九月' value='27.00' />   
      <set name='十月' value='86.00' />   	
      <set name='十一月' value='7.00'/>   
      <set name='十二月' value='13.00' /> 
</chart>
<%
}
%>
