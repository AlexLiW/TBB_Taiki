<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行信用卡部轉介單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
						
							<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top">臺灣企銀客服中心業務諮詢轉介單</span>
						</div>
					</td>
				</tr>

				<tr>
					<td colspan="3" valign="top">
						<div>
							<table  style="font-size:18px;">
								<tr>
								<td colspan="3">聯絡人姓名：
								  <input type="text" disabled size="8" id="Name" onclick="return false"/>
								  身份證字號/統編：
								  <input type="text" disabled size="10" id="IdCard" onclick="return false"/>
								  日期-時間：
								  <input type="text" disabled size="16" id="DateTime" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="2">客戶身分：
										<input type="radio" name="FK" onclick="return false" class="radio"/>信用卡客戶  
										<input type="radio" name="FK" onclick="return false" class="radio"/>網銀客戶
										<input type="radio" name="FK" onclick="return false" class="radio"/>其他									
									</td>
									<td id="CardKind">卡種：
										<input type="radio" name="KZ" onclick="return false" class="radio"/>信用卡
										<input type="radio" name="KZ" onclick="return false" class="radio"/>簽帳金融卡
									</td>
								</tr>
								
								<tr>
									<td colspan="3">手機：<input type="text" disabled size="14" id="MobilePhone" onclick="return false"/>
									公司電話：<input type="text" disabled size="14" id="CompanyPhone" onclick="return false"/>
									住家電話：<input type="text" disabled size="12" id="HomePhone" onclick="return false"/></td>
								</tr>
							
								<tr>
									<td colspan="3">正卡人姓名：<input type="text" disabled size="14" id="TakecardName" onclick="return false"/>
									正卡卡號：<input type="text" disabled size="18" id="TakecardNum" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="OtherBank" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">附卡人姓名：<input type="text" disabled size="14" id="FcardName" onclick="return false"/>
									附卡卡號：<input type="text" disabled size="18" id="OthCardNum" onclick="return false"/></td>
										
								</tr>
								<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									</td>

								<tr>
								<tr><td colspan="3"><hr/></td></tr>
									<td colspan="3">是否回電給客戶：
										<input type="radio" name="IsBackq" onclick="return false" class="radio"/>是
										<input type="radio" name="IsBackq" onclick="return false" class="radio"/>否
									限期回電時間：<input type="text" disabled id="BackPhoneTime" size="16" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">申辦項目：
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>信用卡業務  
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>銀行業務  
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>貸款業務  
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>ATM留置存摺本  
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>ATM留置金融卡 
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>165警示帳戶
										<input type="radio" name="IsBack" onclick="return false" class="radio"/>其他  										
									</td>
								</tr>
									<tr><td colspan="3"><hr/></td></tr>												
								<tr>
									<td colspan="3">問題陳述區：（2000字以內）<textarea id="PeoblemExpression" disabled style="height:260px;"></textarea></td>
								</tr>
								
								<tr>
								    <td>
								  轉介單位：<input type="text" disabled id="TranCompny" onclick="return false" size="10"/>
								  </td>
								  <td>
								  其他單位：<input type="text" disabled id="TranCompny1" onclick="return false" size="10"/>
								  </td>
								  <td>
										分行區域：<input type="text" disabled id="BankArea" onclick="return false" size="10"/>   
									</td>
								 </tr>
									
								
								<tr>
									<td> 
										分行名稱：<input type="text" disabled id="BankName" onclick="return false" size="10"/>  
									</td>
									<td>處理人員：<input type="text" disabled size="10" id="CustomerServiceId" onclick="return false"/></td>
									<td>客服主管簽章：</td>
									
								</tr>
								<tr><td colspan="3"><hr/></td></tr>
								<tr>
									<td colspan="3">處理結果：（1000字以內）<textarea id="Result" class="text" disabled style="height:150px;"></textarea></td>
								</tr>
								
								<!-- Yuwen.Wang 20210927 將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除   -->   
 								<!--tr>
									<td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規&#9733 
									<span style="border:5px green solid;" ><input type="checkbox" name="Rank" onclick="return false"/> 無違反
									<input type="checkbox" name="Rank" onclick="return false"/> 有違反</span>：(簡述違反情形及改善措施____________________________________)
									</td>
								</tr-->

							
																<tr><td colspan="3"><hr/></td></tr>
								<tr>									
									<td><br>經辦人員簽章：</td>
									<td><br>經辦主管簽章：</td>
                                                                      
								</tr>
<tr><td colspan="3">請於兩個營業日處理完畢並回傳客服中心，電話:02-2356-0050分機1707 傳真號碼(02)2392-0118</td></tr>
							</table>
						</div>
					</td>
				 </tr>
			</table>
		</div>
	</c:body>
</c:html>
