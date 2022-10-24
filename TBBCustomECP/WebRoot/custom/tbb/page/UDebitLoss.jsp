﻿<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
<c:head>
	<style type="text/css">
* {
	font-family:Arial,"微軟正黑體";
	margin:0px;
	padding:0px;
}

img {
	width: 70px;
	height: 52px;
	float:left;
	margin-left:3px;
}

.clear span img {
	width: 70px;
	height: 52px;
	float:none;
}

.top {
	display: block;
	text-align:center;
	width: 750px;
	font-size: 28px;
	height: 70px;
	line-height: 70px;
}



.table {
	border: 3px #000000 solid;
	width: 800px;
	height: 700px;
	font-size: 15px;
	font-weight:bold;
	color:#000000;

}

input {
	border-style: none;
	background: none;
	color:#000000000;
	font-family:Arial,"微軟正黑體";
  font-size:18px;
  font-weight:bold;
}
.text {
	width: 750px;
	height: 100px;
	background: none;
	outline: none;
	border: 0px;
	overflow-y: hidden;
	overflow-x: hidden;
	resize: none
	 font-size:18px;
   font-weight:bold;
}

.text_8 {
	width: 790px;
	height: 160px;
	background: none;
	outline: none;
	border: 0px;
	overflow-y: hidden;
	overflow-x: hidden;
	resize: none
	font-size:18px;
font-weight:bold;
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
  font-size:18px;
  font-weight:bold;
  color:#000000;
  font-family: Arial,"微軟正黑體";
}

.radio {
 	width: 18px;
	height: 18px;
}
.checkbox {
 	width: 18px;
	height: 18px;
}

#td {
	width: 265px;
	height: 20px;
	line-height: 20px;
	 font-size:18px;
}

#hr {
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
					<td colspan="4" valign="top" class="clear">
							<span class="top" ><img src="custom/tbb/image/logo.jpg"  alt=""/>臺灣企銀客服中心</span>
					</td>
				</tr>
				<tr >
					<td colspan="4">
					<div style="border-bottom:#000000 1px solid;">
					<span class="top" >晶片卡/存摺/印鑑章掛失申請單</span>
					</div>
					</td>
				</tr>
			<tr>
				<td colspan="4" valign="top">
					<div>
						<table style="font-size: 18px;">

					        <tr>
								<td colspan="4">客戶姓名：
									<input type="text" size="14" id="CustName" />
								客戶ID/統編：<input type="text" size="8" id="CustID" onclick="return false" />
								</td>
							</tr>
							<tr>
							   <td colspan="4">帳號：
									<input type="text" size="16" id="AccountNumberSystem" onclick="return false" />
									手機：<input type="text" size="15" id="CustMobile" onclick="return false" />
									住家電話：<input type="text" size="15" id="U_TelNum" onclick="return false" /></td>
					        </tr>
							<tr><td colspan="4">住家：<input type="text" size="70" id="CustAddress" onclick="return false" /></td></tr>
							<tr>
							   <td colspan="4">其他聯絡電話：<input type="text" size="15" id="OtherPhone" onclick="return false" />
							   </td>
					        </tr>
								<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td colspan="3">
									通報人：
									<input type="radio" name="Notifiers" onclick="return false" class="radio" />
									本人
									<input type="radio" name="Notifiers" onclick="return false" class="radio" />
									委託人
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio" />
									急件
									<input type="radio" name="CaseType" onclick="return false" class="radio" />
									一般件
								</td>
								
								
							</tr>

							<tr>
								<td colspan="4">
									姓名：
									<input type="text" size="14" id="PrincipalName" />
									關係：
									<input type="text" size="16" id="PrincipalRelation" />
								</td>
							</tr>
							<tr>
								<td colspan="4">
									電話：
									<input type="text" size="10" id="PrincipalPhone" onclick="return false" />
								</td>
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
							 <td rowspan="6" width="100" >掛失類別
							 </td>
							<tr>
								<td colspan="4">
									金融卡端：
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									COMBO
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									晶片卡
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									一般卡
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									VD卡
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									MD卡
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									MD卡悠遊卡端
									<input type="radio" name="DebitCardTerminal" onclick="return false" class="radio" />
									磁條卡
								</td>
							</tr>
							<tr>
								<td colspan="4">
									掛失種類：
									<input type="radio" name="LossKind" onclick="return false" class="radio" />
									使用中之卡片
									<input type="radio" name="LossKind" onclick="return false" class="radio" />
									未啟用之卡片
									<input type="radio" name="LossKind" onclick="return false" class="radio" />
									同步申請之卡片
								</td>
							</tr>
							<tr> 
								<td colspan="4">
									<tr><td colspan="1"><input type="checkbox" name="BankBookSeal" onclick="return false" class="checkbox" /> 
									存摺本</td></tr> 
									<tr><td colspan="1"><input type="checkbox" name="BankBookSeal" onclick="return false" class="checkbox" />
									印鑑章</td></tr>
                                </td> 									
							</tr>
							</tr>
							<tr>
									<td colspan="3">（提醒：COMBO卡信用卡端要至財金掛失、MD卡悠遊卡端要至Clist掛失）</td>
								</tr> 
								<tr><td colspan="4"><hr/></td></tr>
							<tr> 
								<td colspan="4">
									電話告知：
									<input type="checkbox" name="PhoneInform" onclick="return false" class="checkbox" />
									核身
									<input type="checkbox" name="PhoneInform" onclick="return false" class="checkbox" />
									分行
									<input type="checkbox" name="PhoneInform" onclick="return false" class="checkbox" />
									商家/警察局/拾獲人									
								</td>
							</tr> 
								<tr><td colspan="4"><hr/></td></tr>
							<tr>
								 <td rowspan="4" width="100" >掛失時間</td>
									<td colspan="1">金融卡端：<input type="text" size="14" id="DebitCardDate" onclick="return false" />
									 </td>
									<tr><td colspan="1">存摺：<input type="text" size="14" id="BankBookDate" onclick="return false" />
									</td></tr>
									<tr><td colspan="1">印鑑章：<input type="text" size="14" id="SealDate" onclick="return false" />
									</td></tr>
									<tr><td colspan="1">悠遊卡：<input type="text" size="14" id="leisureDate" onclick="return false" />
									</td></tr>
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								 <td rowspan="6" width="100" >回撥時間</td>
									<tr><td colspan="1"><input type="text" size="14" id="CallBackTime1" onclick="return false"  /></td></tr>
									<td><input type="radio" name="CallBackStaff1" onclick="return false" class="radio" />
									本人OK</td>
									<td id="CallBackOther3">
									<input type="radio" name="CallBackStaff1" onclick="return false" class="radio" />
									其他
                                    ：<input type="text" id="CallBackOther1" onclick="return false"/></td>
							</tr>	
							
							<tr>
								<td	colspan="4">	
									<tr><td colspan="1"><input type="text" size="14" id="CallBackTime2" onclick="return false"  /></td></tr>
									<td colspan="1"><input type="radio" name="CallBackStaff2" onclick="return false" class="radio" />
									本人OK</td>
									<td id="CallBackOther4">
									<input type="radio" name="CallBackStaff2" onclick="return false" class="radio" />
									其他
									：<input type="text" id="CallBackOther2" onclick="return false"/></td>
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
									<td colspan="3">備註：<textarea id="Remark" disabled  style="height:200px;"></textarea></td>
								</tr>   
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
							<td colspan="4">  
							經辦：<input type="text" size="35" id="FUserId" onclick="return false" />  
							主管<input type="text" size="15" id="null" onclick="return false" /></td> 
							 </tr>
							 <tr><td colspan="4"><input type="text" size="75"/></td></tr>
						</table>
					</div>
				</td>
			</tr>
		</table>
	</div>
</c:body>
</c:html>
