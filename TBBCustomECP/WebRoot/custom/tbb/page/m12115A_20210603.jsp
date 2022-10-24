<%@include file="/quicksilver/page/include/Initialize.jsp" %>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8" %>
<c:html>
    <c:head>
        <title>臺灣中小企業銀行帳務組客戶問題會辦處理單</title>
        <style type="text/css">
            * {
                font-family: Arial, "微軟正黑體";
                margin: 0px;
                padding: 0px;
            }

            img {
                width: 70px;
                height: 52px;
                float: left;
                margin-left: 3px;
            }

            .clear span img {
                width: 70px;
                height: 52px;
                float: none;
            }

            .top {
                display: block;
                text-align: center;
                width: 750px;
                font-size: 28px;
                height: 70px;
                line-height: 70px;
            }

            .table {
                border: 3px #000000 solid;
                width: 800px;
                height: 1100px;
                font-size: 15px;
                font-weight: bold;
                color: #000000;

            }

            input {
                border-style: none;
                background: none;
                color: #000000;
                ;
                font-family: Arial, "微軟正黑體";
                font-size: 17px;
                font-weight: bold;
            }

            table tr td {
                /*border: 1px #000000 solid;*/
                width: 300px;
                height: 28px;
                line-height: 20px;

            }

            .text {
                width: 750px;
                height: 100px;
                background: none;
                outline: none;
                border: 0px;
                overflow-y: hidden;
                overflow-x: hidden;
                resize: none ;
                font-size:17px;
                font-weight: bold;
            }

            .text_8 {
                width: 790px;
                height: 160px;
                background: none;
                outline: none;
                border: 0px;
                overflow-y: hidden;
                overflow-x: hidden;
                resize: none ;
                font-size:18px;
                font-weight: bold;
            }

            textarea {
                width: 790px;
                height: 100px;
                background: none;
                outline: none;
                border: 0px;
                overflow-y: hidden;
                overflow-x: hidden;
                resize: none;
                font-size: 17px;
                font-weight: bold;
                color: #000000;
                font-family: Arial, "微軟正黑體";
            }

            .radio {
                width: 18px;
                height: 18px;
            }

            .checkbox {
                width: 18px;
                height: 18px;
            }

            td {
                width: 265px;
                height: 20px;
                line-height: 20px;
                font-size: 17px;
            }
			
            hr {
                height: 4px;
            }

            #hr1215 {
                height: 2px;
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
                            <span class="top" align="center">臺灣企銀客戶帳務問題會辦處理單</span>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td colspan="3" valign="top">
                        <div id="main">
                            <table style="font-size:18px;">
                                <tr>
                                    <td>身分證字號/統編：<input type="text" disabled size="7" id="IdCard" onclick="return false" /></td>
                                    <td>卡種：
                                        <input type="radio" name="KZ" onclick="return false" class="radio" />信用卡
                                        <input type="radio" name="KZ" onclick="return false" class="radio" />簽帳金融卡
                                    </td>
                                    <td>日期-時間：<input type="text" disabled size="12" id="SystemTime" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td>住家電話：<input type="text" disabled size="12" id="HomePhone" onclick="return false" /></td>
					                <td>公司電話：<input type="text" disabled size="12" id="CompanyPhone" onclick="return false" /></td>
					                <td>手機：<input type="text" disabled size="12" id="MobilePhone" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td>正卡人姓名：<input type="text" disabled size="10" id="TcardName" onclick="return false" /></td>
                                    <td>正卡卡號：<input type="text" disabled size="16" id="TcardID" onclick="return false" /></td>
                                    <td>往來分行：<input type="text" disabled size="12" id="Branch" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td colspan="2">案件類型：
                                        <input type="radio" name="CaseType" onclick="return false" class="radio" /> 急件&emsp;
                                        <input type="radio" name="CaseType" onclick="return false" class="radio" /> 一般件
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="hr1215">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">服務項目1：
                                    	<input type="radio" name="CutYM" onclick="return false" class="radio" />減免單卡年費&emsp;
                                    	<input type="radio" name="CutYM" onclick="return false" class="radio" />減免多卡年費
                                    </td>
                                </tr> 
                                <tr>
                                    <td colspan="4">※減免年費，減免次營業日倘客戶繳款已扣抵年費，需執行不同卡號調帳。</td>
                                </tr>                         	
                                <tr>
                                	<td>減免卡號1：<input type="text" disabled size="13" id="DisCard1" onclick="return false" /></td>
                                	<td>減免卡號2：<input type="text" disabled size="13" id="DisCard2" onclick="return false" /></td>
                                	<td>減免卡號3：<input type="text" disabled size="13" id="DisCard3" onclick="return false" /></td>
                                </tr>
                                <tr>
                                	<td>減免卡號1金額：<input type="text" disabled size="8" id="DisCardAMT1" onclick="return false" /></td>
                                	<td>減免卡號2金額：<input type="text" disabled size="8" id="DisCardAMT2" onclick="return false" /></td>
                                	<td>減免卡號2金額：<input type="text" disabled size="8" id="DisCardAMT3" onclick="return false" /></td>
                                </tr>
                                <%--2021.09.09-gemfor/lillian-此提醒事項字眼，列印時不需顯示 <tr>
                                	<td colspan="3">提醒事項： <input type="text" disabled size="60" id="Notice" onclick="return false" /></td>
                                </tr>--%>
                                <tr>
                                	<td>帳單年度： <input type="text" disabled size="4" id="Year" onclick="return false" /></td>
                                </tr>
                                <tr>
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
                                <tr>
                                    <td rowspan="3">
										今年減免次數：<input type="text" disabled size="9" id="U_AnnulThisYear" onclick="return false" />
                                    </td>
                                    <td colspan="2">減免原因：
                                        <input type="radio" name="CT1" onclick="return false" class="radio" />停卡&emsp;
                                        <input type="radio" name="CT1" onclick="return false" class="radio" />補刷卡&emsp;
                                        <input type="radio" name="CT1" onclick="return false" class="radio" />其他
                                    </td>
                                <tr>
                                <tr>
                                    <td colspan="3" id="U_AnnulReason1">
										減免原因(其他):<input type="text" disabled size="40" id="U_AnnulReason" onclick="return false" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" valign="top"> 
                                    	服務項目1問題陳述(300字以內)： 
                                    	<textarea id="Chenshu" disabled style="height:120px; font-size: 15px; line-height: 20px; width: 830px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="hr1215">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>服務項目2：<input type="checkbox" id="Tuiyifukuan" size="6" onclick="return false" class="checkbox" />退溢付款</td>
                                    <td>退溢金額：<input type="text" disabled id="Tuiyijin" size="12" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td colspan="3">退款方式：
                                        <input type="radio" name="sl" onclick="return false" class="radio" />本行帳戶&emsp;
                                        <input type="radio" name="sl" onclick="return false" class="radio" />匯款他行&emsp;
                                        <input type="radio" name="sl" onclick="return false" class="radio" />退支票
                                    </td>
                                </tr>
                                <tr>
                                    <td id = "bolck1_1">帳戶：<input type="text" disabled size="17" id="Zhanghu" onclick="return false" /></td>
                                    <td id = "bolck1_2">分行區域：<input type="text" disabled size="15" id="Fenhang" onclick="return false" /></td>
                                    <td id = "bolck1_3">分行名稱： <input type="text" disabled size="12" id="FenhangName" onclick="return false"/></td>
                                    <td id = "bolck1_4">匯款行庫：<input type="text" disabled size="15" id="TransBankNo" onclick="return false" /></td>
                                    <td id = "bolck1_5">分行別：<input type="text" disabled size="12" id="Fkh" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                    	服務項目2問題陳述：
                                    	<textarea id="U_Chenshu2" disabled style="height:40px; font-size: 15px; line-height: 20px; width: 830px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="hr1215">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>服務項目3：<input type="checkbox" id="Qx" onclick="return false" class="checkbox" />取消現金回饋</td>
                                    <td>取消回饋金額：<input type="text" disabled size="9" id="Money" onclick="return false" /></td>
                                    <td>
                                    	<div style="width:40%; float:left; margin: auto; line-height: 45px;">取消原因：</div>
                                    	<div style="width:60%; float:right; margin: auto;">
                                    		<input type="radio" name="FR" onclick="return false" class="radio" />持卡人停卡<br>
                                        	<input type="radio" name="FR" onclick="return false" class="radio" />不願收到帳單
                                    	</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="hr1215">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">服務項目4：<input type="checkbox" id="Other" onclick="return false" class="checkbox" />其他( 請於問題陳述區說明)</td>
                                </tr>
                                <tr>
                                    <td colspan="3" valign="top"> 
                                    	服務項目4問題陳述(300字以內)： 
                                    	<textarea id="content" disabled style="height:120px; font-size: 15px; line-height: 20px; width: 830px;"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" id="hr1215">
                                        <hr />
                                    </td>
                                </tr>
                                <%--2021.09.09-lillian-將此區塊從列印頁上移除<tr>
                                    <td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規
                                        <input type="radio" name="U_Against" onclick="return false" class="radio" /> 無違反&emsp;
                                        <input type="radio" name="U_Against" onclick="return false" class="radio" /> 有違反
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
										（簡述違反情形及改善措施：<span id="U_Describe" onclick="return false"></span>）
                                    </td>
                                </tr> 
                                <tr>
                                    <td colspan="3">
                                        <hr />
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td>客服中心</td>
                                </tr>
                                <tr>
                                    <td valign="bottom"> 處理人員：<input type="text" disabled size="10" id="ChuliId" onclick="return false" /></td>
                                    <td></td>
                                    <td valign="bottom"> 客服主管簽章：</td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td>處理部門： <input type="text" disabled size="10" id="DepartId" onclick="return false" /></td>
                                </tr>
                                <tr>
                                    <td>信用卡部&emsp;作業人員簽章：</td>
                                    <td>&emsp;&emsp;&emsp;&emsp;&emsp;作業主管簽章：</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </c:body>
</c:html>