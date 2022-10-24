﻿<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行利息違約金減免單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
						
							<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
					<span class="top">臺灣企銀利息/違約金/掛失費暨帳務調整減免單</span>
						</div>
					</td>
				</tr>
				
				<tr>
					<td colspan="3" valign="top">
						<div id="main">
							<table  style="font-size:18px;">
								<tr>
									<td  colspan="3" >身份證字號/統編：<input type="text" disabled size="8" id="IDNUmber" onclick="return false"/>
									卡種
										<input type="radio" name="KZ" onclick="return false" class="radio"/>信用卡
										<input type="radio" name="KZ" onclick="return false" class="radio"/>簽帳金融卡
									
									日期-時間：<input type="text" disabled size="14" id="Time" onclick="return false" /></td>
								</tr>
								
								<tr>
									<td colspan="3">住家電話：<input type="text" disabled size="16" id="HomePhone" onclick="return false"/>
									公司電話：<input type="text" disabled size="18" id="CompanyPhone" onclick="return false"/>
									手機：<input type="text" disabled size="14" id="MobilePhone" onclick="return false"/></td>
								</tr>
							
								<tr>
									<td colspan="3">正卡人姓名：<input type="text" disabled size="14" id="UserName" onclick="return false"/>
									正卡卡號：<input type="text" disabled size="18" id="CardNo" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="CurrentBranch" onclick="return false"/></td>
								</tr>


								<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>

								<tr><td colspan="3"><hr/></td></tr>
								<tr>
									<td colspan="2">
									帳單年份：<input disabled type="text" id="Year" size="5" onclick="return false"/>		
									</td>
								</tr>
								<tr>
									<td colspan="3">
									帳單月份：
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>1月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>2月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>3月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>4月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>5月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>6月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>7月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>8月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>9月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>10月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>11月
									<input type="checkbox" id="BillMonth" name="BillMonth" onclick="return false" class="checkbox"/>12月									
									</td>
								</tr>
						<tr>
                            <td> 調減違約金： <input name="JTL" type="checkbox" onclick="return false" class="checkbox"/>調減違約金
                             </td>
                            <td colspan="2">違約金調減金額：
                              <input name="text2" type="text" disabled id="ChangMoney" onclick="return false"/></td>
                        </tr>
							<tr>
								<td>調減利息：<input name="JTL" type="checkbox" onclick="return false"/>
								調減利息
								</td>
								<td colspan="2">利息調減金額：
									<input name="text2" type="text" disabled id="ChangMoney1" onclick="return false"/></td>
							</tr>
								
								<tr>
									<td colspan="3">今年度減免次數
									<input type="radio" name="NJ" onclick="return false" class="radio"/>
									今年度第一次減免  
									<input type="radio" name="NJ" onclick="return false" class="radio"/>
									今年度第二次減免
									<input type="radio" name="NJ" onclick="return false" class="radio"/>
									其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									減免次數:<input type="text" size="10" disabled  id="NJ1" onclick="return false"/>
								</td>
								</tr>
								
								<tr>
									<td colspan="3">調減原因
									<input type="radio" name="JTY" onclick="return false" class="radio"/>
									未收到帳單  
									<input type="radio" name="JTY" onclick="return false" class="radio"/>
									其他(請註明原因)</td>
								</tr>
								
								<tr>
									<td colspan="3">備註：（字數限定1000字）<textarea id="Remark" disabled style="height:550px;"></textarea></td>
								</tr>
								
								<tr>
									
									<td>處理人員：<input type="text" disabled size="10" id="FisposeId" onclick="return false"/></td>
									<td>客服主管簽章：</td>
									<td>處理部門：<input type="text" disabled size="10" id="FisposeDepaetmentId" onclick="return false"/></td>
								</tr>
                                                                      <tr><td colspan="3"><hr/></td></tr>
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
