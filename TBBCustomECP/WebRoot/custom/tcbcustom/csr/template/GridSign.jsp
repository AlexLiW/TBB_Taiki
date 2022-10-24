<%@include file="/quicksilver/page/include/Initialize.jsp"%>

<c:html>
	<c:head import="Form,List,Resizer">
		<c:script src="quicksilver/page/util/CommonBusiness.js"/>
		<c:css src="quicksilver/page/template/EntityForm.css"/>
		<c:script src="custom/csr/page/template/GridSign.js"/>
	</c:head>
	<c:body>
		<div id="FormZone" class="FormZone" style="height:20%"></div>
		<div id="ListZone" class="ListZone" style="top:20%">
			<div class="ButtonPanel">
				<div><%=result.getClientString("pageName")%></div>
				<div id=ListButtonCell class=QsLeftButtonPanel></div>
			</div>
			<div id="ListPanel" class="QsFullSize QsBorder QsShortShadow"></div>
		</div>		
	</c:body>
</c:html>