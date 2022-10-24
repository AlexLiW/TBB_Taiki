<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行信用卡分期及提前清償申請單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
				<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top" align="center">臺灣企銀信用卡分期及提前清償申請單</span>
						</div>
					</td>
				</tr>	
				<tr>
					<td colspan="3" valign="top">
						<div id="main">
							<table  style="font-size:18px;">
								<tr>
									<td colspan="3">身分證字號/統編：<input type="text" disabled size="8" id="IDNo" readonly/>
									卡種：<input type="radio" name="KZ" onclick="return false" class="radio"/>信用卡
									      <input type="radio" name="KZ" onclick="return false" class="radio"/>簽帳金融卡
									日期-時間：<input type="text" disabled size="14" id="Date" readonly/></td>
								</tr>
								<tr>
									<td colspan="3">正卡人姓名：<input type="text" size="14" id="MasterName" onclick="return false"/>
									正卡卡號：<input type="text" disabled size="16" id="TcardID" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="SubsidiaryBank" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">住家電話：<input type="text" disabled size="16" id="HomePhone" readonly/>
									公司電話：<input type="text" disabled size="16" id="CompanyPhone" readonly/>
									手機：<input type="text" disabled size="10" id="CellPhone" readonly/></td>
								</tr>

								<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>

								<tr><td colspan="3"><hr/></td></tr>
								<tr>
                                     <td colspan="3">申請分期：
										 <input type="radio" name="VoteOption" onclick="return false" class="radio"/>申請來電分期
										 <input type="radio" name="VoteOption" onclick="return false" class="radio"/>申請保費分期A02
 										<input type="radio" name="VoteOption" onclick="return false" class="radio"/>申請所得稅分期
										 <input type="radio" name="VoteOption" onclick="return false" class="radio"/>申請分期提前償還
									</td>
                                </tr>
								
								<tr>
                                    <td id="Isnull" colspan="3"> 是否曾經開立信用卡分期專案申請書：
                                      <input type="radio" name="yesorno" onclick="return false" class="radio"/>是
                                      <input type="radio" name="yesorno" onclick="return false" class="radio"/>否（需提供申請書） 
									</td>
                                </tr>
								
								<tr>
                                     <td id="Unallocated1" colspan="3">尚未攤還之分期本金：<input type="text" disabled id="Unallocated" onclick="return false"/></td>
                                 </tr>
					<tr>
						<td colspan="3" id="StageType3">分期：
						<input type="radio" name="no3" onclick="return false" class="radio"/>聯信特店分期(2-N-3)
						<input type="radio" name="no3" onclick="return false" class="radio"/>來電分期
						<input type="radio" name="no3" onclick="return false" class="radio"/>保費分期
						<input type="radio" name="no3" onclick="return false" class="radio"/>所得稅分期</td>
					</tr>
								
						       <tr>
                                   <td id="Application1" colspan="2">分期申請書送件：
								   <input type='checkbox' id="Application" onclick="return false" class="checkbox"/>分期申請書送件</td>
                               </tr>
							   <tr>
									<td id="no" colspan="3">
								       <input type="radio" name="no1" onclick="return false" class="radio"/>暫不分期</td>
								</tr>
								<tr>
									<td colspan="3" id="StageType2">分期：
									<input type="radio" name="no2" onclick="return false" class="radio"/>單筆分期
									<input type="radio" name="no2" onclick="return false" class="radio"/>帳單分期
									<input type="radio" name="no2" onclick="return false" class="radio"/>專案分期</td>
								</tr>
								<tr>
									<td id="CaseStage1" colspan="3">分期代碼：<input type="text" disabled id="CaseStage" onclick="return false"/></td>
								</tr>


								<tr>
									<td id="instalments1" colspan="3">分期期數：
									    <input type="radio"name="instalments" onclick="return false" class="radio"/>3期
                                        <input type="radio" name="instalments" onclick="return false" class="radio"/>6期
                                        <input type="radio" name="instalments" onclick="return false" class="radio"/>9期
                                        <input type="radio" name="instalments" onclick="return false" class="radio"/>12期
                                        <input type="radio" name="instalments" onclick="return false" class="radio"/>15期
										<input type="radio" name="instalments" onclick="return false" class="radio"/>24期
										<input type="radio" name="instalments" onclick="return false" class="radio"/>30期
                                     </td>
                               </tr>
							     <tr>
									<td id="TotalMoney1"  colspan="3">分期總金額：<input type="text" disabled id="TotalMoney" readonly/></td>
								</tr>
								<tr>
									<td id="TradeDate">交易日期：<input type="text" size="12" disabled id="JYDate" readonly/></td>
									<td id="AuthorizationCode">授權碼：<input type="text" size="6" disabled id="F_AuthorizationCode" readonly/></td>
								</tr>
                                                                <tr><td colspan="3"><hr/></td></tr>
							   <tr>
									<td id="qq" colspan="2">是否繳足最低應繳金額：
									     <input type="radio" name="yn"   onclick="return false" class="radio"/>是
                                         <input type="radio" name="yn"   onclick="return false" class="radio"/>否（客戶無法申請）
                                     </td>
                               </tr>
							    <tr>
                                    <td  id="da">結帳日：
                                    <input type="radio" name="da"  onclick="return false" class="radio"/>1號
                                    <input type="radio" name="da"  onclick="return false" class="radio"/>7號 </td>
                                  
                                </tr>

								 <tr>
                                      <td colspan="3">問題陳述區：（2000字以內）<textarea id="content" ></textarea></td>

								  <tr>
                                                                    <td>處理人員：
										<input type="text" disabled  size="20" id="CustomerServiceId" onclick="return false"/>
									</td>
									<td><div style="text-indent:130px;">客服主管簽章：</div></td>
									</tr>
									<tr>
                                                          <td>處理部門：
										<input type="text" disabled  size="10" id="ProcessingDepartmentId" onclick="return false"/>
									</td> 
								
                                  </tr>
								  <tr><td colspan="3"><hr/></td></tr>
								   
<tr>
                                     
                                     <td>作業人員簽章：</td>
                                     <td><div style="text-indent:-70px;">作業主管簽章：</div></td>
                                   </tr>
							</table>
						</div>
					</td>
				 </tr>
			</table>
		</div>
	</c:body>
</c:html>
