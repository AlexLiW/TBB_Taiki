<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
    	<title>臺灣中小企業銀行風險管理科客戶問題會辦處理單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
						
							<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top">臺灣企銀客戶風險管理問題會辦處理單</span>
						</div>
					</td>
				</tr>

				
				<tr>
					<td colspan="3" valign="top">
					<div>
							<table  style="font-size:18px;">
								
								<tr>
									<td colspan="3">身份證字號/統編：<input type="text" disabled size="8" id="IdCard" onclick="return false"/>
									卡種：
										<input type="radio" name="IdType" onclick="return false" class="radio"/>信用卡
										<input type="radio" name="IdType" onclick="return false" class="radio"/>簽帳金融卡
									日期-時間：<input type="text" disabled size="14" id="Date" onclick="return false"/></td>
								</tr>
								<tr>
									<td colspan="3">住家電話：<input type="text" disabled size="16" id="HomeTel" onclick="return false"/>
									公司電話：<input type="text" disabled size="18" id="CompanyTel" onclick="return false"/>
									手機：<input type="text" disabled size="16" id="Telephone" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">正卡人姓名：<input type="text" disabled size="14" id="CardholdName"  onclick="return false"/>
									正卡卡號：<input type="text" disabled size="18" id="CardholderID" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="SubBank" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="2">附卡人姓名：<input type="text" disabled size="14" id="AddcardPeopName" onclick="return false"/>
									附卡卡號：<input type="text" disabled size="18" id="AddcardID" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>

								<tr><td colspan="3"><hr/><span>問題類型</span></td></tr>
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>疑為冒用盜刷</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>疑為重覆請款</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>未收到商品、服務</td>
								</tr>
								
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>刷退、退貨尚未入帳</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>跨月辦理退貨</td>
									<td id="td"> 
										<input type="checkbox" name="Type"  onclick="return false" class="checkbox"/>重覆佔額</td>
								</tr>
								
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>客戶願先付款</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>客戶不願先付款</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>轉爭議款後續處理</td>
								</tr>
								
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>調閱簽帳單</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>已告知調單費用</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>已做卡片控管</td>
								</tr>
								
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>取消調單</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>預借現金未吐鈔</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>HCE</td>
								</tr>
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false" class="checkbox"/>其他</td>
	
								</tr>

                                                             <tr><td colspan="3"><hr/></td></tr>
								<tr>
									<td colspan="3">風控人員是否需回電給客戶：
									<input type="radio" name="IsCallback" onclick="return false" class="radio"/> 是
									<input type="radio" name="IsCallback" onclick="return false" class="radio"/> 否 
									<br>風控人員回電時限：<input type="text" disabled size="20" id="CallbackTime" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">問題陳述區：（2000字以內）<textarea id="StateProb" disabled  style="height:180px;"></textarea></td>
								</tr>   


					<tr>
                                                                     <td>處理人員：<input type="text" disabled id="ServiceId"  size="8" onclick="return false"/></td>
									<td>客服主管簽章：</td>									
									
								</tr>

								<tr><td colspan="3"><hr/><span><strong>處理結果</strong></span></td></tr>
								<tr>
									<td colspan="3">風控人員回電時間：
										<input type="text" disabled id="CallbackTruetime" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="3">風控人員處理結果：（1000字以內）<textarea id="ResultCode" class="text" disabled style="height: 150px;"></textarea></td>
								</tr>	
								<tr>
                                                                     <td>處理人員：</td>
									<td>風控主管簽章：</td>									
									
								</tr>
								<!--Yuwen.Wang 20210927 將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除   -->   
								<!--tr><td colspan="3"><hr/></td></tr>
								
 								<tr>
									<td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規 
									<input type="radio" name="U_Against" onclick="return false" class="radio"/> 無違反
									<input type="radio" name="U_Against" onclick="return false" class="radio"/> 有違反（簡述違反情形及改善措施：<span id="U_Describe" onclick="return false"></span>）
									</td>
								</tr-->
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</c:body>
</c:html>
