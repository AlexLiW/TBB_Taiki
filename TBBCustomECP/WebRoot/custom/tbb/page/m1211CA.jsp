<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>調閱帳單</title>
		<style type="text/css">
<!--
.STYLE4 {
	font-size: 20px;
	font-weight: bold;
}
.STYLE5 {font-size: 12px;}
table{border-collapse:collapse;width:720px;height:auto;border:2px #000000 solid;align:center}
td{border:1px #000000 solid;border-collapse:collapse;text-align:center;height:35px;width:60px}
input{border-style:none}
--> 
</style>
	</c:head>
	<c:body>



<table>
	<tr>
		<td height="34" colspan="9"  style="border-bottom:1px #000 solid">
			<div align="center">
				<span class="STYLE4">調閱帳單查詢頁欄位規劃</span>
			</div>
		</td>
	</tr>
	<tr>
		<td><span class="STYLE5">日期-時間</td>
		<td><span class="STYLE5">卡號</td>
		<td><span class="STYLE5">持卡人姓名</td>
		<td><span class="STYLE5">性別</td>
		<td><span class="STYLE5">英文姓名</td>
		<td><span class="STYLE5">領取方式</td>
		<td><span class="STYLE5">寄送地址/寄送分行</td>
		<td><span class="STYLE5">經辦人員</td>
		<td><span class="STYLE5">備註</td>
	</tr>
	<tr>
		<td><input type="text" id="date" value=""/></td>
		<td><input type="text" id="Cardholdernumber" value=""/></td>
		<td><input type="text" id="Cardholder" value=""/></td>
		<td><input type="text" id="Cardholdersex" value=""/></td>
		<td><input type="text" id="CardEnglishname" value=""/></td>
		<td><input type="text" id="Getway" value=""/></td>
		<td><input type="text" id="Sendbranch" value=""/></td>
		<td><input type="text" id="SupportstaffId" value=""/></td>
		<td><input type="text" id="Remark" value=""/></td>
	</tr>
	<tr>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
	</tr>
	<tr>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
		<td><input type="text" value=""/></td>
	</tr>
	<tr height="50">
		
		<td>客服主管:</td>
		<td colspan="2"></td>
		<td>作業經辦:</td>
		<td colspan="2"></td>
		<td>作業主管:</td>
		<td colspan="2"></td>

	</tr>
	
</table>
</c:body>
</c:html>
