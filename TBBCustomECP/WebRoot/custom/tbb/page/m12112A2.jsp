<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
<c:head>
	<title>臺灣中小企業銀行轉介客戶抱怨單</title>
	<link href="custom/tbb/page/css/tbb.css" rel="stylesheet"
		type="text/css" />
	<style type="text/css">
.clear span img {
	width: 70px;
	height: 52px;
	float: none;
}
</style>
</c:head>
<c:body>
	<div align="center" id="tbb">
		<table class="table">

			<tr>
				<td colspan="4" valign="top" class="clear">
					<div style="border-bottom: #000000 1px solid;">
						<span class="top"><img src="custom/tbb/image/logo.jpg"
							alt="" />臺灣企銀客服中心客戶抱怨轉介單</span>
					</div>
				</td>
			</tr>

			<tr>
				<td colspan="4" valign="top">
					<div>
						<table style="font-size: 18px;">
							<tr>
								<td colspan="4">申訴人姓名：<input type="text" disabled size="4"
									id="Name" onclick="return false" /> 身分證字號/統編：<input
									type="text" disabled size="9" id="IdCard"
									onclick="return false" /> 日期：<input type="text" disabled
									size="16" id="DTime" onclick="return false" /></td>
							</tr>
							<tr>
								<td colspan="4">客戶身分： <input type="radio"
									name="CustomerIdfiy" onclick="return false" class="radio" />
									信用卡客戶 <input type="radio" name="CustomerIdfiy"
									onclick="return false" class="radio" /> 銀行客戶 <input
									type="radio" name="CustomerIdfiy" onclick="return false"
									class="radio" /> 其他 
									<div style="margin-right: 135px;float: right;">往來分行：<input type="text" disabled="" size="10" id="Branch" onclick="return false"></div>
								</td>
							</tr>

							<tr>
								<td colspan="4">住家電話：<input type="text" disabled
									id="LivePhone" onclick="return false" size="12" /> 公司電話：<input
									type="text" disabled id="CorPhone" onclick="return false"
									size="14" /> 手機：<input type="text" disabled id="Cellphone"
									onclick="return false" size="17" /></td>
							</tr>

							<tr>
								<td colspan="2">案件類型： <input type="radio" name="CaseType"
									onclick="return false" class="radio" /> 急件 <input type="radio"
									name="CaseType" onclick="return false" class="radio" /> 一般件
							</tr>

							<tr>
								<td colspan="4"><hr/></td>
							</tr>
							<tr>
								<td colspan="4">內容說明：<textarea id="Content"
										disabled style="height: 120px; width: 830px; font-size:20px; line-height:20px;"></textarea></td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr>
								<td colspan="4"><textarea id="Content2"
										disabled style="height: 20px; font-size:15px; line-height:20px;"></textarea></td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr style="height: 20px;font-size: 15px;">
								<td colspan="4">接電人員：<input style="font-size: 15px;" type="text" disabled id="CreateUserId" onclick="return false" size="6" /> 
								處理人員：<input style="font-size: 15px;" type="text" disabled id="UserId" onclick="return false" size="6" /> 
								客服主管簽章：<input style="font-size: 15px;" type="text" disabled id="SupervisorId" onclick="return false" size="6" />
								 處理部門：<input style="font-size: 15px;" type="text" disabled id="SollveId" onclick="return false" size="6" /></td>

							</tr>

							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>

							<tr style="font-size: 15px;">
								<td colspan="2">案件等級： <input style="font-size: 15px;" type="radio" name="Rank"
									onclick="return false" /> 第一級 <input style="font-size: 15px;" type="radio" name="Rank"
									onclick="return false" /> 第二級 <input style="font-size: 15px;" type="radio" name="Rank"
									onclick="return false" /> 第三級

								</td>

								<td colspan="2"><input style="font-size: 15px;" type="text" disabled id="Desc1"
									onclick="return false" size="40" /></td>
							</tr>
							<tr style="font-size: 15px;">
								<td>權責單位</td>
							</tr>

							<tr style="font-size: 15px;">
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />個人金融部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />信用卡部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />業務發展部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />人力資源處</td>
							</tr>

							<tr style="font-size: 15px;">

								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />企業金融部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />國際部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />債權管理部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />授信管理部</td>
							</tr>

							<tr style="font-size: 15px;">

								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />財富管理部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />信託部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />資訊部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />證券部</td>
							</tr>
							<tr style="font-size: 15px;">
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />徵信部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />數位金融部</td>
								<td id="td"><input style="font-size: 15px;" type="checkbox" name="Type"
									onclick="return false" />其他</td>
								<td id="td"><div id = "U_UnitOther" style = "display : none;">其他：<span id="UnitOther" style="font-size: 15px;"></span></div></td>
							</tr>



							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>

							<tr>
								<td colspan="4"><input style="font-size: 15px;" type="text" disabled id="Desc2"
									onclick="return false" size="80" /></td>
							</tr>



							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr>
								<td colspan="4">處理情形回覆：<textarea id="Result" class="text"
										disabled style="height: 120px; width: 830px; font-size:15px; line-height:20px;"></textarea></td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr style="height: 20px;">
								<td colspan="2">分行回電時間：</td>
								<td colspan="2">回電經辦：</td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr>
								<td colspan="4">分析客訴原因：<textarea id="null" class="text"
										disabled style="height: 60Px;"></textarea></td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr>
								<td colspan="4">研擬改善措施：<textarea id="null" class="text"
										disabled style="height: 100Px;"></textarea></td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>
							<tr>
								<td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規 <input
									type="checkbox" name="Rank" onclick="return false" /> 無違反 <input
									type="checkbox" name="Rank" onclick="return false" />
									有違反：(簡述違反情形及改善措施____________________________________)
								</td>
							</tr>
							<tr>
								<td colspan="4" style="height: 3px;"><hr /></td>
							</tr>


							<tr>
								<td colspan="4">經辦：<input type="text" disabled size="6" />
								襄理(組長)：<input type="text" disabled size="6" />
								副理：<input type="text" disabled size="12" />
								單位主管：<input type="text" disabled size="6" /></td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
		</table>
	</div>
</c:body>
</c:html>
