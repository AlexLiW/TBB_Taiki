<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@page import="java.net.URLEncoder" %>
<%@page import="java.net.URLDecoder" %>
<c:html>
	<c:head>
		<title>考試模組使用手冊</title>
		
	</c:head>
	<c:body>
		<% String str="Exam_Help.ppt";  
		
	str =  URLDecoder.decode(str, "UTF-8");

	%>
	
	<div align="center" style="height:50px;line-height:50px">
		<h2>考試模組使用手冊</h2>
		<p style="color:red">詳細的考試模組的使用步驟請點擊下面的按鈕下載《考試模组使用手册》</p>
		<a href="custom/tbb/page/exam/<%=str %>"><img src="custom/tbb/image/download.png"/></a>
	</div>	
	</c:body>
</c:html>
