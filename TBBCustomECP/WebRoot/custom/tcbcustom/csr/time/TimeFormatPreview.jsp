<%@include file="/quicksilver/page/include/Initialize.jsp"%>

<c:html>
	<c:head>
		<c:script src="custom/csr/page/time/TimeFormatPreview.js"/>
		<c:css src="quicksilver/page/misc/SingleBox.css"/>
	</c:head>
	<c:body onload="TimeFormatPreview.doLoad()">
		<div class=QsMiddleAlign><div><script>document.write(TimeFormatPreview.information);</script></div></div>
		<div id="BoxPanel"></div>
	</c:body>
</c:html>
