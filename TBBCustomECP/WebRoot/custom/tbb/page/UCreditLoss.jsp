<%@include file="/quicksilver/page/include/Initialize.jsp"%>
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
	height: 40px;
	float:none;
}

.top {
	display: block;
	text-align:center;
	width: 750px;
	font-size: 28px;
	height: 50px;
	line-height: 50px;
}



.table {
	border: 3px #000000 solid;
	width: 800px;
	height: 810px;
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
.red {color: #FF0000}

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
		<table class="table" width="100%">
		<tr>
					<td colspan="4" valign="top" class="clear">
							<span class="top" ><img src="custom/tbb/image/logo.jpg"  alt=""/>臺灣企銀客服中心</span>
					</td>
				</tr>
				<tr >
					<td colspan="4">
					<div style="border-bottom:#000000 1px solid;">
					<span class="top" >信用卡/VISA晶片金融卡/Master悠遊金融卡電話掛失記錄單</span>
					</div>
					</td>
				</tr>
			<tr>
				<td colspan="4" valign="top">
					<div>
						<table  style="font-size: 18px;" >
						
					<tr>
								<td colspan="4">身份證字號/統編：<input type="text" size="8" id="CustID" onclick="return false" />
									卡種
									<input type="radio" name="KZ" onclick="return false" class="radio" />信用卡
									<input type="radio" name="KZ" onclick="return false" class="radio" />簽帳金融卡 
									日期-時間：<input type="text" size="14" id="DateTime" onclick="return false" />

								</td>
					</tr>
							<tr>
								<td colspan="4">
									正卡人姓名：
									<input type="text" size="14" id="PrimaryCreditName" />
									正卡卡號：
									<input type="text" size="16" id="PrimaryCredit" />
								</td>
							</tr>
							<tr>
								<td colspan="4">
									附卡人姓名：
									<input type="text" size="14" id="SecondaryCreditName" />
									附卡卡號：
									<input type="text" size="16" id="SecondaryCredit" />
								</td>
							</tr>
							<tr>
								<td colspan="4">
									手機：<input type="text" size="15" id="Mobile" onclick="return false" />
									住家電話：<input type="text" size="15" id="Telnumber" onclick="return false" />
									往來分行：<input type="text" size="12" id="Branches" onclick="return false" />
							        其它連絡電話：<input type="text" size="15" id="OtherPhone" onclick="return false" />
								</td>
							</tr>
                        <tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td colspan="4">
									持卡人：
									<input type="radio" name="Cardholder" onclick="return false" class="radio" />
									正卡持卡人
									<input type="radio" name="Cardholder" onclick="return false" class="radio" />
									附卡持卡人
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
									<input type="radio" name="Notifiers" onclick="return false" class="radio" />
									正卡人
								</td>
								<td colspan="1">
									案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
								</td>
							</tr>
							<tr>
								<td colspan="4">
									姓名：
									<input type="text" size="15" id="PrincipalName" onclick="return false" />
									關係：
									<input type="text" size="15" id="PrincipalRelation" onclick="return false" />
									電話：
									<input type="text" size="10" id="PrincipalPhone" onclick="return false" />
								</td>
							</tr>
							<tr>
								<td colspan="3">
									回撥：
									<input type="text" size="14" id="CallBackDate1" onclick="return false"  />
									<input type="radio" name="CallBackStaff1" onclick="return false" class="radio" />
									本人OK</td>
									<td id="CallBackOther3" >
									<input type="radio" name="CallBackStaff1" onclick="return false" class="radio" />
									其他
									：<input type="text" id="CallBackOther1" onclick="return false"/></td>
							</tr>	
							<tr>
								<td	colspan="4">	
									是否發送簡訊：
									<input type="radio" name="U_IfSend" onclick="return false" class="radio" />是
									手機：<input type="text" id="U_SendPhone" onclick="return false"/></td>
								
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td colspan="4">
									掛失時間：
									<input type="text" size="14" id="LossTime" onclick="return false"  />
								</td>
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td colspan="4">
									發生地點：
									<input type="radio" name="LocationOccur" onclick="return false" class="radio" />
									國內
									<input type="radio" name="LocationOccur" onclick="return false" class="radio" />
									國外
								</td>
							</tr>
							<tr>
                                     <td id="Foreign1" colspan="3">國外：<input type="text" id="Foreign" onclick="return false"/></td>
                                 </tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td colspan="4">
									掛失原因：
									<input type="radio" name="LossReason" onclick="return false" class="radio" />
									遺失(L)
									<input type="radio" name="LossReason" onclick="return false" class="radio" />
									被偷、盜(S)
									<input type="radio" name="LossReason" onclick="return false" class="radio" />
									自行ATM留置
									<input type="radio" name="LossReason" onclick="return false" class="radio" />
									他行ATM留置
									<input type="radio" name="LossReason" onclick="return false" class="radio" />
									其他
								</td>
							</tr>
							<tr>
                              <td id="LossReasonOther1" colspan="4">其他(掛失原因)：<input type="text" id="LossReasonOther" onclick="return false"/></td>
                            </tr>
							<tr><td colspan="4"><hr/></td></tr>						
                            <tr>
                                <td rowspan="2" width="50" >卡别</td>
                                <td colspan="3" ><input type="radio" name="CardSort" onclick="return false" class="radio" />
									得利晶片卡(COMBO)
                                <input type="radio" name="CardSort" onclick="return false" class="radio" />
									VISA晶片金融卡(VD)
                                <input type="radio" name="CardSort" onclick="return false" class="radio" />
									MASTER悠遊金融卡(MD)</td>
                            </tr>
                            <tr>							
                                <td colspan="3"><input type="radio" name="CardSort" onclick="return false" class="radio" />
									一般信用卡<input type="radio" name="CardSort" onclick="return false" class="radio" />
									悠遊/一卡通聯名卡</td>
                            </tr>

							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td rowspan="8" width="90" >是否補卡</td>
									<td colspan="3"><input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									掛失後第三營業日補發信用卡［適用一般信用卡、COMBO卡］</td>
							</tr>	
							<tr>
									<td colspan="3"><input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									掛失後次營業日補發卡［適用悠遊聯名卡、一卡通聯名卡］</td>
							</tr>
							<tr>	
								<td colspan="2">
								<input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									正卡掛失不補卡(無附卡)</td>
							</tr>
							<tr>	
								 <td colspan="3"><input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									正卡掛失不補卡(有附卡，若正卡未撤掛，請將附卡一併停用)</td>
							</tr>
							
							<tr>
									<td colspan="2"> <input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									附卡掛失不補卡</td>	
									
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
							        <td colspan="4">
									<input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									掛失後補卡［適用VD卡、MD卡］
								    <input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									掛失不補卡［適用VD卡、MD卡］</td>
							</tr>
							<tr>
									<td id="SupplyCardOther1" colspan="3">
									<input type="radio" name="SupplyCard" onclick="return false" class="radio" />
									其他
									：<input type="text" id="SupplyCardOther" onclick="return false"/></td>
							</tr>
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td rowspan="2" width="50" >備註</td>
									<td colspan="2" ><input type="radio" name="Remark" onclick="return false" class="radio" />
									郵寄
									<input type="radio" name="Remark" onclick="return false" class="radio" />分行
									<input type="radio" name="Remark" onclick="return false" class="radio" />其他</td>
									<td id="RemarkOther1" >
									其他（備註）
									：<input type="text" id="RemarkOther" onclick="return false"/></td>
									<tr>
									<td id="SendBranche1" colspan="3" >
									郵寄分行區域：<span id="SendBranche"></span>
									    郵寄分行名稱：<span id="SendBrancheName"></span></td>
									</tr>
							</tr>
							
							
							
							<tr><td colspan="4"><hr/></td></tr>
							<tr>
								<td rowspan="7" width="50" >作業科</td>
								<tr>	
								 <td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									鍵機前，請執行944事故查詢。</td>
								<tr>
								 <td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									此為COMBO卡請分行逕行鍵機補發執行107-41及115-01
                                  （參考資料欄位鍵入卡別________及招攬員工代號________）</td>
								  <tr><td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									此為VISA金融卡/悠遊DEBIT卡請分行逕行鍵機補發執行107-41及115-01</td></tr>
								  <tr><td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									1本表為客戶電話掛失紀錄。<br>
									 <input type="checkbox" name="null" value="checkbox"  disabled="disabled" /><font color="red">COMBO卡/VISA金融卡/悠遊DEBIT卡如“掛失不補卡”僅執行107-41即可。</font></td></tr>
									<tr><td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									2除客戶表明不再續用外，餘均由 
									<input type="checkbox" name="null" onclick="return false" class="checkbox"/>本部 
									<input type="checkbox" name="null" onclick="return false" class="checkbox"/>營業單位補發（請務必送交客戶）。 </td>
									</tr>
									<tr><td colspan="3"><input type="radio" name="null" onclick="return false" class="radio" />
									3若有非本人交易時，請要求客戶，於受通知日起七日內向當地警察機關報案。此致________分行</td></tr>
							</tr>
							</tr>	
							<tr><td colspan="4"><hr/></td></tr>
							 <tr>
                              <td colspan="2">客服中心經辦 ：<input type="text"   id="FUserId" onclick="return false"/></td>
							  <td colspan="2">
                              覆核
							   <input type="text"  size="4"  id="null" onclick="return false"/>
							  主管<input type="text" size="15" id="null" onclick="return false" /></td> 
								
                             </tr>
								 <tr><td colspan="4"><hr/></td></tr> 
                            <tr>  
                                <td colspan="2" >敬會信用卡部　經辦</td>
				<td colspan="1">       主管 </td>
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
