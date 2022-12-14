<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行帳務組客戶問題會辦處理單</title>
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
	height: 1100px;
	font-size: 15px;
	font-weight:bold;
	color:#000000;

}

input {
	border-style: none;
	background: none;
	color:#000000;;
	font-family:Arial,"微軟正黑體";
  font-size:18px;
  font-weight:bold;
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
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
				<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top" align="center">臺灣企銀客戶帳務問題會辦處理單</span>
						</div>
					</td>
				</tr>

				<tr>
					<td colspan="3"  valign="top">
						<div id="main">
							<table  style="font-size:18px;">
				
								<tr>
									<td>身份證字號/統編：<input type="text" disabled size="8" id="IdCard" onclick="return false"/></td>
									<td>卡種：
										<input type="radio" name="KZ" onclick="return false" class="radio"/>信用卡
										<input type="radio" name="KZ" onclick="return false" class="radio"/>簽帳金融卡
									</td>
									<td>日期-時間：<input type="text" disabled size="14" id="SystemTime" onclick="return false" /></td>
								</tr>
								<tr>
									<td colspan="3">住家電話：<input type="text" disabled size="13" id="HomePhone" onclick="return false"/>
									公司電話：<input type="text" disabled size="16" id="CompanyPhone" onclick="return false"/>
									手機：<input type="text" disabled size="14" id="MobilePhone" onclick="return false"/></td>
								</tr>
							
								<tr>
									<td colspan="3">正卡人姓名：<input type="text" disabled size="12" id="TcardName" onclick="return false"/>
									正卡卡號：<input type="text" disabled size="16" id="TcardID" onclick="return false"/>
									往來分行：<input type="text" disabled size="3" id="Branch" onclick="return false"/></td>
								</tr>
								<tr>
									<td colspan="3">附卡人姓名：<input type="text" disabled size="12" id="FuName" onclick="return false"/>
									附卡卡號：<input type="text" disabled size="16" id="Fukahao" onclick="return false"/></td>
									
								</tr>


								<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>

								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								<tr>

									<td>服務項目1：<input type="checkbox" id="CutYM" size="6" onclick="return false" class="checkbox"/>減免年費</td>
									<td>年費金額：<input type="text" disabled size="10" id="Yearamount" onclick="return false"/></td>
									<td>帳單年： <input type="text" disabled size="4" id="Year" onclick="return false"/></td>
								</tr>
								<tr>
									<td colspan="4">※減免年費，減免次營業日倘客戶繳款已扣抵年費，需執行不同卡號調帳。
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
									<td rowspan="3">
									今年減免次數：<input type="text"  disabled  size="9" id="U_AnnulThisYear" onclick="return false"/>
									</td>

									<td colspan="2">減免原因：
									    <input type="radio"  name="CT1" onclick="return false"/>停卡
										<input type="radio"  name="CT1" onclick="return false" class="radio"/>願補刷卡
										<input type="radio"  name="CT1" onclick="return false" class="radio"/>其他
							        </td>
								<tr>
								<tr>
								<td  colspan="3" id="U_AnnulReason1">
									減免原因(其他):<input type="text"  disabled id="U_AnnulReason" onclick="return false"/>
								</td>
								</tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								<tr>
									<td>服務項目2：<input type="checkbox" id="Tuiyifukuan" size="6" onclick="return false" class="checkbox"/>退溢付款</td>
									<td>退溢金額：<input type="text" disabled id="Tuiyijin"size="10" onclick="return false"/></td>
									<td>退款方式：
									    <input type="radio"  name="sl" onclick="return false" class="radio"/>本行帳戶
										<input type="radio"  name="sl" onclick="return false" class="radio"/>退支票
											<input type="radio"  name="sl" onclick="return false" class="radio"/>匯款他行
							        </td>
								</tr>

									
								<tr>
									<td>帳戶：<input type="text" disabled id="Zhanghu" onclick="return false"/></td>
									<td>分行：<input type="text" disabled id="Fenhang" onclick="return false"/></td>
									<td>分行名稱： <input type="text" disabled id="FenhangName" onclick="return false"/></td>
								</tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
							     <tr>
                                    <td>服務項目3：<input type="checkbox" id="Weiruzhang" size="10 onclick="return false" class="checkbox"/>繳款未入帳</td>
                                    <td>未入帳金額：<input type="text" disabled size="10" id="Weijin" onclick="return false"/></td>
                                     <td>繳款日期：<input type="text" disabled size="14" id="Jkrq" onclick="return false"/></td>
                                </tr>
							    <tr>
                                    <td>付款行：<input type="text" disabled id="Fkh" onclick="return false"/></td>
                                </tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								 <tr>
                                    <td>服務項目4：<input type="checkbox" id="Qx" onclick="return false" class="checkbox"/>取消現金回饋</td>
                                    <td colspan="1">取消回饋金額：<input type="text" disabled size="10" id="Money" onclick="return false"/></td>
									<td>取消原因：
									    <input type="radio"  name="FR" onclick="return false" class="radio"/>持卡人停卡 
										<input type="radio"  name="FR" onclick="return false" class="radio"/>不願收到帳單</td>
                                    
                                </tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								<tr>
                                    <td>服務項目5：<input type="checkbox" id="Diaozhang" onclick="return false" class="checkbox"/>不同卡號間調帳</td>
                                    <td>調帳金額：<input type="text" disabled id="DMoney" onclick="return false"/></td>
								</tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								<tr>
                                    <td>服務項目6：<input type="checkbox" id="Jian" onclick="return false" class="checkbox"/>減免掛失費</td>
                                    <td>減免金額：<input type="text" disabled id="JMoney" onclick="return false"/></td>
									<td id="Service_6">減免原因請於問題陳述區說明</td>
								</tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
								<tr>
                                    <td colspan="3">服務項目7：<input type="checkbox" id="Other" onclick="return false" class="checkbox"/>其他( 請於問題陳述區說明)</td>
                                  
								</tr>
								<tr><td colspan="3" id="hr1215"><hr/></td></tr>
					<tr>			
                              <td  colspan="3"  valign="top">  問題陳述區：（2000字以內）<textarea id="content"  disabled  style="height:125px;"></textarea></td>
                               </tr>
							   <!-- Yuwen.Wang 20210927 將有無違反本行「公平待客原則」或金融消費者保護法規 的文字從列印畫面移除   --> 
                                                             <!--tr><td colspan="3"><hr/></td></tr>
 								<tr>
									<td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規 
									<input type="radio" name="U_Against" onclick="return false" class="radio"/> 無違反
									<input type="radio" name="U_Against" onclick="return false" class="radio"/> 有違反（簡述違反情形及改善措施：<span id="U_Describe" onclick="return false"></span>）
								</tr-->
                                                             <tr><td colspan="4"><hr/></td></tr>
								<tr>
								<td>客服中心</td>
								</tr>
								 <tr>
                                                                         <td valign="bottom"> 處理人員：<input type="text" disabled size="10" id="ChuliId"  onclick="return false"/></td>
									<td valign="bottom"> 客服主管簽章：</td>
                                                                        <td valign="bottom"> 處理部門：<input type="text" disabled size="10" id="DepartId" onclick="return false"/></td>
                                                                   </tr>

                                                             <tr><td colspan="4" style="height:30px;" id="hr1215"><hr/></td></tr>
								<tr>
								<td>信用卡部 &nbsp&nbsp&nbsp&nbsp作業人員簽章：&nbsp&nbsp&nbsp&nbsp&nbsp</td><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp作業主管簽章：</td>
                                                                 </tr>
							</table>
						</div>
					</td>
				 </tr>
			</table>
		</div>
	</c:body>
</c:html>
