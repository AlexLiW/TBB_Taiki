<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8" %>
<c:html>
    <c:head>
        <title>臺灣中小企業銀行利息違約金減免單</title>
        <link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
        <style type="text/css">
            * {
                font-family: Arial, "微軟正黑體";
                margin: 0px;
                padding: 0px;
            }
        </style>
    </c:head>
    <c:body>
        <div align="center" id="tbb">
            <table class="table">
                <tr>
                    <td colspan="3" valign="top">
                        <div style="border-bottom:#000000 1px solid;height:70px">
                            <span><img src="custom/tbb/image/logo.jpg" alt="" /></span>
                            <span class="top">臺灣企銀利息/違約金/掛失費暨帳務調整減免單</span>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan="3" valign="top">
                        <div id="main">
                            <table style="font-size:18px;">
                                <tr>
                                	<td>身分證字號/統編：<input type="text" disabled size="7" id="IDNUmber" onclick="return false" /></td>
                                	<td>
                                		卡種：
                                	    <input type="radio" name="KZ" onclick="return false" class="radio" />信用卡
                                        <input type="radio" name="KZ" onclick="return false" class="radio" />簽帳金融卡
                                	</td>
                                	<td>日期-時間：<input type="text" disabled size="12" id="Time" onclick="return false" /></td>
                                </tr>

                                <tr>
                                	<td>住家電話：<input type="text" disabled size="13" id="HomePhone" onclick="return false" /></td>
                                	<td>公司電話：<input type="text" disabled size="13" id="CompanyPhone" onclick="return false" /></td>
                                	<td>手機：<input type="text" disabled size="13" id="MobilePhone" onclick="return false" /></td>
                                </tr>

                                <tr>
                                	<td>正卡人姓名：<input type="text" disabled size="11" id="UserName" onclick="return false" /></td>
                                	<td>正卡卡號：<input type="text" disabled size="13" id="CardNo" onclick="return false" /></td>
                                	<td>往來分行：<input type="text" disabled size="13" id="CurrentBranch" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
										案件類型：
                                        <input type="radio" name="CaseType" onclick="return false" class="radio" /> 急件&emsp;
                                        <input type="radio" name="CaseType" onclick="return false" class="radio" /> 一般件
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                	<td>服務項目1：<input type="checkbox" id="U_SevItem1" size="6" onclick="return false" class="checkbox" />違約金利息減免</td>
                                </tr>
                                <tr id = "bolck1_1">
                                    <td colspan="2">
										帳單年度：<input disabled type="text" id="Year" size="5" onclick="return false" />
                                    </td>
                                </tr>
                                <tr id = "bolck1_2">
                                    <td colspan="3">
										 帳單月份：
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />1月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />2月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />3月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />4月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />5月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />6月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />7月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />8月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />9月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />10月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />11月
                                        <input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox" />12月
                                    </td>
                                </tr>
                                <tr id = "bolck1_3">
                                	<td>
                                		<div style="width:36.5%; float:left; margin: auto; line-height: 45px;">減調類型：</div>
                                		<div style="width:63.5%; float:right; margin: auto;" >
                                			<input name="JTL" type="checkbox" onclick="return false" class="checkbox" />調減違約金<br>
                                			<input name="JTL" type="checkbox" onclick="return false" class="checkbox" />調減利息
                                		</div>
                                	</td>
                                	<td colspan="2">
                                		違約金調減金額：<input name="text2" type="text" disabled id="ChangMoney" onclick="return false" /><br>
                                		利息調減金額：<input name="text2" type="text" disabled id="ChangMoney1" onclick="return false" />
                                	</td>
                                </tr>
                                <tr id = "bolck1_4">
                                    <td colspan="3">
                                    	<div style="width:75%; float:left; margin: auto;">今年度減免次數：
	                                        <input type="radio" name="NJ" onclick="return false" class="radio" />今年度第一次減免&nbsp;
	                                        <input type="radio" name="NJ" onclick="return false" class="radio" />今年度第二次減免&nbsp;
	                                        <input type="radio" name="NJ" onclick="return false" class="radio" />其他&emsp;&emsp;
                                        </div>
	                                   	<div id = "NJ1_T" style="width:25%; float:right; margin: auto;">
	                                   		減免次數：<input type="text" size="7" disabled id="NJ1" onclick="return false" />
	                                    </div>
                                    </td>
                                </tr>
                                <tr id = "bolck1_5">
                                    <td colspan="3">
                                       	 調減原因：
                                        <input type="radio" name="JTY" onclick="return false" class="radio" />未收到帳單&emsp;
                                        <input type="radio" name="JTY" onclick="return false" class="radio" />其他(請註明原因)
                                    </td>
                                </tr>
                                <tr id = "bolck1_6">
                                    <td colspan="3">
                                       	備註：
                                       	<textarea id="Remark" disabled style="height:380px; line-height: 20px; font-size: 15px; width: 830px;"></textarea>
                                    </td>
                                </tr>
								<tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    	服務項目2：<input type="checkbox" id="U_SevItem2" size="6" onclick="return false" class="checkbox" />不同卡號間調帳
                                    </td>
                                    <td></td>
                                    <td id = "bolck2_0">
                                    	<input type="radio" name="U_SevType2" onclick="return false" class="radio" />單卡調整&nbsp;
                                        <input type="radio" name="U_SevType2" onclick="return false" class="radio" />多卡調整
                                    </td>
                                </tr>
                                <tr id = "bolck2_1">
                                    <td id="ACardNo">
										請從卡號：<input type="text" size="13" disabled id="U_ACardNo" onclick="return false" />
                                    </td>
                                    <td id="BCardNo">
										調至卡號：<input type="text" size="13" disabled id="U_BCardNo" onclick="return false" />
                                    </td>
                                    <td>
										調帳金額：<input type="text" size="12" disabled id="U_SevAMT2" onclick="return false" />
                                    </td>
                                </tr>
                                <tr id = "bolck2_2">
                                    <td colspan="3">
                                       	服務項目2問題陳述：<textarea id="U_Descript2" disabled style="height:300px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                    	服務項目3：<input type="checkbox" id="U_SevItem3" size="6" onclick="return false" class="checkbox" />減免掛失費
                                    </td>
                                    <td id = "bolck3_0">
                                    	<input type="radio" name="U_SevType3" onclick="return false" class="radio" />已產生帳單&nbsp;
                                        <input type="radio" name="U_SevType3" onclick="return false" class="radio" />未產生帳單
                                    </td>
                                </tr>
                                <tr id = "bolck3_1">
                                    <td colspan="2">
										減免金額：<input type="text" size="12" disabled id="U_SevAMT3" onclick="return false" />
                                    </td>
                                    <td id = "SevNotice3">
										<input type="text" size="30" disabled id="U_SevNotice3" onclick="return false" />
                                    </td>
                                </tr>
                                <tr id = "bolck3_2">
                                    <td colspan="4">
										減免原因：<textarea id="U_DisReason" disabled style="height:50px;"></textarea>
                                    </td>
                                </tr>
                                <tr id = "bolck3_3">
                                    <td colspan="3">
										其他說明請於問題陳訴區說明
                                    </td>
                                </tr>
                                <tr id = "bolck3_4">
                                     <td colspan="3">
                                       	服務項目3問題陳述：<textarea id="U_Descript3" disabled style="height:300px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
										服務項目4：<input type="checkbox" id="U_SevItem4" size="6" onclick="return false" class="checkbox" />其他
                                    </td>
                                </tr>
                                <tr id = "bolck4_1">
                                    <td colspan="3">服務類型4：
										<input type="radio" name="U_SevType4" onclick="return false" class="radio" />調閱帳單手續費&nbsp;
                                        <input type="radio" name="U_SevType4" onclick="return false" class="radio" />藝FUN卡博物館優惠&nbsp;
                                        <input type="radio" name="U_SevType4" onclick="return false" class="radio" />其他
                                    </td>
                                </tr>
                                <tr id = "bolck4_2">
                                    <td colspan="3">
										調閱帳單手續費說明：<textarea id="U_BillNotice" disabled style="height:50px;"></textarea>
                                    </td>
                                </tr>
                                <tr id = "bolck4_3">
                                    <td colspan="3">
										藝FUN卡博物館優惠說明：<textarea id="U_eFUNCardNotice" disabled style="height:50px;"></textarea>
                                    </td>
                                </tr>
                                <tr id = "bolck4_4">
                                     <td colspan="3">
                                       	服務項目4問題陳述：<textarea id="U_Descript4" disabled style="height:300px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>處理人員：<input type="text" disabled size="10" id="FisposeId" onclick="return false" /></td>
                                    <td></td>
                                    <td>客服主管簽章：</td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>處理部門：<input type="text" disabled size="10" id="FisposeDepaetmentId" onclick="return false" /></td>
                                </tr>
                                <tr>
                                	<td>作業人員簽章：</td>
                                	<td>作業主管簽章：</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </c:body>
</c:html>