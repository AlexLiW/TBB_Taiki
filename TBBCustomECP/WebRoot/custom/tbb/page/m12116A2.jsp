<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
<c:head>
	<title>臺灣中小企業銀行額度調整單</title>
	<link href="custom/tbb/page/css/tbb.css" rel="stylesheet"
		type="text/css" />
</c:head>
<c:body>
	<div align="center" id="tbb">
		<table class="table">
			<tr>
				<td colspan="3" valign="top">
					<div style="border-bottom: #000000 1px solid; height: 70px">

						<span><img src="custom/tbb/image/logo.jpg" alt="" /></span> <span
							class="top">臺灣企銀信用卡額度調整單</span>
					</div>
				</td>
			</tr>

			<tr>
				<td colspan="3" valign="top">
					<div id="main">
						<table style="font-size: 18px;">
							<tr>
								<td colspan="3">身分證字號/統編：<input type="text" disabled
									size="11" id="IdCard" onclick="return false" /> 日期-時間：<input
									type="text" disabled size="18" id="SystemTime"
									onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="1">住家電話：<input type="text" disabled size="12"
									id="HomePhone" onclick="return false" /></td>
								<td colspan="1">公司電話：<input type="text" disabled size="12"
									id="CompanyPhone" onclick="return false" /></td>
								<td colspan="1">手機：<input type="text" disabled size="14"
									id="MobilePhone" onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="1">正卡人姓名：<input type="text" disabled size="11"
									id="TcardName" onclick="return false" /></td>
								<td colspan="1">正卡卡號：<input type="text" disabled size="13"
									id="TcardID" onclick="return false" /></td>
								<td colspan="1">往來分行：<input type="text" disabled size="13"
									id="Branch" onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="3">EMAIL： <input type="text" disabled
									size="60" id="EMAIL" onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="3">案件類型： <input type="radio" name="CaseType"
									onclick="return false" class="radio" /> 急件 <input type="radio"
									name="CaseType" onclick="return false" class="radio" /> 一般件
								</td>

							</tr>

							<tr>
								<td colspan="3"><hr /></td>
							</tr>

							<tr>
								<td colspan="3">申請項目： <input type="text" disabled size="17"
									id="ApplyItem" onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="3">是否回電給客戶： <input type="radio" name="IsBack"
									onclick="return false" class="radio" />是 <input type="radio"
									name="IsBack" onclick="return false" class="radio" />否 限期回電時間：<input
									type="text" disabled size="16" id="CallbackTime"
									onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="3">請務必回覆客戶 <input
									type="radio" name="ReplyCust" onclick="return false"
									class="radio" />電話 <input type="radio" name="ReplyCust"
									onclick="return false" class="radio" />EMAIL <input
									type="radio" name="ReplyCust" onclick="return false"
									class="radio" />簡訊
								</td>
							</tr>

							<tr>
								<td colspan="3">原始信用額度：<input type="text" disabled
									size="14" id="FirstMoney" onclick="return false" /> 調整信用額度：<input
									type="text" disabled size="10" id="NewMoney"
									onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="2">調整信用額度日期起日： <input type="text" disabled
									size="14" id="StartDate" onclick="return false" /></td>
								<td>迄日： <input type="text" disabled size="14" id="EndDate"
									onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="1">調整卡號： <input type="radio" name="ChgCardNo"
									onclick="return false" class="radio" />調整名下所有卡</td>
									
							</tr>
							
							<tr>
								<td colspan="1">&emsp;&emsp;&emsp;&emsp;&emsp;
								<input type="radio" name="ChgCardNo" onclick="return false"
									class="radio" />調整卡號</td>
									<td colspan="2">	
									<!-- <input type="text" disabled id="ChgNo" onclick="return false" style="height: 70px; width: 500px;"/> -->
									<textarea disabled id="ChgNo" disabled style="height: 50px; width: 500px; vertical-align: middle; 
									display: table-cell; display: flex; justify-content: center; align-items: center; display : none;"> </textarea>
									</td>
							</tr>
							
							<tr>
								<td colspan="3">調整原因：<textarea type="text" disabled
										size="60" id="Reason" class="text" disabled
										style="height: 100px; width: 830px; font-size: 15px; line-height: 20px;"></textarea></td>
							</tr>

							<tr>
								<td colspan="3">財力證明：<input type="text" disabled size="60"
									id="Prove" onclick="return false" /></td>
							</tr>

							<tr>
								<td colspan="3">核身時間： <input type="text" disabled
									id="VerifyTime" onclick="return false" />
								</td>
							</tr>

							<tr>
								<td colspan="3">備註：（500字以內）<textarea id="Remark"
										class="text_8" disabled
										style="height: 180px; width: 830px; font-size: 15px; line-height: 20px;"></textarea></td>
							</tr>
							<tr>
								<td>處理人員： <input type="text" disabled size="10" id="UserId"
									　onclick="return false" />
								</td>
								<td></td>
								<td>客服主管簽章：</td>
							</tr>
							<tr>
								<td colspan="3"><hr /></td>
							</tr>
							<tr>
								<td colspan="3">風控人員處理日期： <input type="text" disabled
									id="DealTime" onclick="return false" /></td>
							</tr>
							<tr>
								<td colspan="3">風控人員處理結果：（500字以內）<textarea id="EndDeal"
										class="text_8" disabled
										style="height: 180px; width: 830px; font-size: 15px; line-height: 20px;"></textarea></td>
								</td>
							</tr>

							<tr>
								<td>處理部門： <input type="text" disabled size="10"
									id="DealDepId" onclick="return false" />
								</td>
							</tr>

							<tr>
								<td>風控經辦簽章：</td>
								<td>風控主管簽章：</td>
							</tr>

						</table>
					</div>
				</td>
			</tr>
		</table>
	</div>
</c:body>
</c:html>
