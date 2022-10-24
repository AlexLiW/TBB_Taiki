<?xml version="1.0" encoding="Big5"?>
<%@page import="com.jeedsoft.quicksilver.base.type.PageResult"%>
<%@page isELIgnored="true"%>
<%@page contentType="text/html;charset=Big5"%>
<%PageResult result = (PageResult)request.getAttribute("result");%>
<%=new String(result.getServerString("Html_Ret"))%>



 