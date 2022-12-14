<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行預借現金密碼函</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
						
							<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top">臺灣企銀信用卡預借現金密碼函</span>
						</div>
					</td>
				</tr>	
				<tr>
					<td colspan="3" valign="top">
						<div>
							<table style="font-size:18px;">
								<tr>
									<td colspan="3">身份證字號/統編：<input type="text" disabled id="IdCard" size="10"/>                       
									日期-時間：<input type="text" disabled size="16" id="DTime" onclick="return false" /></td>
								</tr>
							  
								
							  <tr>
									<td colspan="3">住家電話：<input type="text" disabled size="16" id="LivePhone" onclick="return false"/>
									公司電話：<input type="text" disabled size="16" id="CorPhone" onclick="return false"/>
									手機：<input type="text" disabled size="16" id="Cellphone" onclick="return false"/></td>
								
							  			<tr>
									<td colspan="3">正卡人姓名：<input type="text" disabled size="14" id="ZName" onclick="return false"/>
									正卡卡號：<input type="text" disabled size="16" id="ZCard" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="Branch" onclick="return false"/></td>
								</tr>
								<tr>
									<td>附卡人姓名：
										<input type="text" disabled size="8" id="FuName" onclick="return false"/> </td>
									<td colspan="2">附卡卡號：
										<input type="text" disabled size="18" id="FuCard" onclick="return false"/> </td>
								</tr>	
									 
								<tr>						
									<td colspan="2">案件類型：
										<input type="radio" name="CaseType" onclick="return false" class="radio"/>
										急件
										<input type="radio" name="CaseType" onclick="return false" class="radio"/>
										一般件					
									</td>  
								</tr>
									<tr><td colspan="3"><hr/></td></tr>

								<tr>						
									<td colspan="2">申請範圍：
										<input type="radio" name="Limits" onclick="return false" class="radio"/>
										正卡
										<input type="radio" name="Limits" onclick="return false" class="radio"/>
										附卡
										<input type="radio" name="Limits" onclick="return false" class="radio"/>
										正附卡					
									</td>  
									</tr>
								<tr>
									<td colspan="2">
										<input type="checkbox" id="Function1" onclick="return false" class="checkbox"/>
										已確認正卡持卡人同意開啟/取消開啟預借現金功能													
									</td>  
								</tr>
							
								<tr>							
									<td colspan="3">申辦項目：</td>  
								</tr>
								
								<tr>
									<td colspan="3"><input type="radio" name="Item" onclick="return false" class="radio"/>
										新戶開啟預借額度(10%)</td>
								</tr>
								
								<tr>
									<td colspan="3"><input type="radio" name="Item" onclick="return false" class="radio"/>
									舊戶(依開戶日99/10/26前申辦都)開啟預借額度(20%)</td>
								</tr>
								
								<tr>
									<td colspan="3"><input type="radio" name="Item" onclick="return false" class="radio"/>
									取消預借現金功能</td>	
								</tr>   

								<tr>
									<td colspan="3"><input type="radio" name="Item" onclick="return false" class="radio"/>
									僅申請密碼函</td>	
								</tr> 
							  
								<tr>
									<td colspan="3">是否申請郵寄密碼函：
										<input type="radio" name="Cypher" onclick="return false" class="radio"/>
										是
										<input type="radio" name="Cypher" onclick="return false" class="radio"/>
										否							
									<br>
									寄送方式：
										<input type="radio" name="Way" onclick="return false" class="radio"/>
										平信 
										<input type="radio" name="Way" onclick="return false" class="radio"/>
										限時		
										<input type="radio" name="Way" onclick="return false" class="radio"/>
										掛號
										<input type="radio" name="Way" onclick="return false" class="radio"/>
										寄送分行										
									</td>
								</tr>
							  
								<tr>
									<td colspan="3">帳單地址：<input type="text" disabled size="60" id="Address" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td>寄送分行：<input type="text" disabled id="SendF" onclick="return false" size="8"/></td>
									<td>分行名稱：<input type="text" disabled id="FenHang" onclick="return false" size="8"/></td>
								</tr>
								
								<tr>
									<td colspan="2"><input type="checkbox" id="Repeat" onclick="return false" class="checkbox"/>二次以上(含)郵寄密碼函：</td>
								</tr>
								<tr><td><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></td></tr>
								<tr>
									<td><br />
									處理人員：
									<input type="text" disabled id="CustomSerId" size="14" onclick="return false"/></td>   
									<td><br />
									客服主管簽章：
									</td>								
									<td><br />
									處理部門：
									<input type="text" disabled id="SollveId" size="10" onclick="return false"/></td>
									
								</tr>
								<tr><td colspan="3"><hr/></td></tr>
								<tr>
									
									<td><br />
									作業人員簽章：
									</td>
									<td><br />
									作業主管簽章：
									</td>
								</tr>
								
							</table>
						</div>
					</td>
				 </tr>
			</table>
		</div>
	</c:body>
</c:html>
