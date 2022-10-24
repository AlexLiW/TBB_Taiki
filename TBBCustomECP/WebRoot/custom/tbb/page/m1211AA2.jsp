﻿<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
		<title>臺灣中小企業銀行基本資料變更申請單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				<tr>
					<td colspan="3" valign="top">
						<div style="border-bottom:#000000 1px solid;height:70px">
						
							<span><img src="custom/tbb/image/logo.jpg" alt=""/></span>
							<span class="top">臺灣企銀基本資料變更申請單</span>
						</div>
					</td>
				</tr>

				<tr>
					<td colspan="3" valign="top">
					  <div>
					    <table style="font-size:18px;">
                          
				<tr>
									<td  colspan="3" >身分證字號/統編：<input type="text" size="8" id="Identity"   onclick="return false"/>
									卡種
										<input type="radio" name="KZ" onclick="return false" class="radio"/>信用卡
										<input type="radio" name="KZ" onclick="return false" class="radio"/>簽帳金融卡
									
									日期-時間：<input type="text"  size="14" id="Time" onclick="return false" /></td>
								</tr>		  
                          <tr>
                            <td  colspan="3">持卡人姓名：<input type="text" size="14"  id="UserNumber" />
                            持卡人卡號：<input type="text"  size="16" id="UserCardNo"/>
                            往來分行：<input type="text"  size="3" id="CorBank"/></td>
                          </tr>
						  
						  <tr>
							  <td  colspan="4">正/附卡：
                              <input type="radio"   name="ZK"   onclick="return false" class="radio"/>
                              正卡
                              <input type="radio"  name="ZK"   onclick="return false" class="radio"/>
                              附卡 

								附卡人身分證號：
                              <input type="text"  size="14" id="IdentityNo"   onclick="return false"/>
				<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>
							
</td>
						  </tr>
	                   <tr><td colspan="3"><hr/></td></tr>
						   <tr>
                            	<td  colspan="3">住家電話：
                              	<input type="text"   size="15"id="HomePhNo"   onclick="return false"/> 							
				公司電話：
                                <input type="text"  size="15" id="CompanyPhNo"   onclick="return false"/>
				手機：
                              	<input type="text"   size="10" id="MobilePhNo"   onclick="return false"/></td>	
                          </tr>
                           <tr>
                            	<td  colspan="3">職稱：<input type="text"  size="15" id="Duty"   onclick="return false"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                 公司名稱：<input type="text"  size="30" id="CompangyName"   onclick="return false"/>
				</td>	
                          </tr>
                          
						 
                                                                                                          <tr><td colspan="3"><hr/></td></tr>
                               <tr>
									<td colspan="3">寄送地址:
						            
										<input type="checkbox" name="Type"   onclick="return false"  class="checkbox"/>帳單寄送地址
									
										<input type="checkbox" name="Type"   onclick="return false"  class="checkbox"/><font color="#9400D3">非帳單寄送地址</font>
										</td>
							</tr>
<td colspan="3">
								郵遞區號：
                              <input type="text"  size="14" id="Number"   onclick="return false"/></td>
							</td>
                        
							<tr>
						   	<td height="36" colspan="2" id="qq">地址類別：
								<input type="radio" name="Address"   onclick="return false"  class="radio"/>
								戶籍
								<input type="radio"  name="Address"   onclick="return false"  class="radio"/>
								居住
								<input type="radio" name="Address"   onclick="return false"  class="radio"/>
								公司
								<input type="radio" name="Address"   onclick="return false"  class="radio"/>
								email
							</td>
							</tr>

						  <tr><td id="RegisterAddress2" colspan="3">
						     戶籍地址：
                             <input type="text"  size="75" id="RegisterAddress"   onclick="return false"/></td>
						    
						   <tr><td id="LiveAddress2" colspan="3">
							  居住地址：
                              <input type="text"  size="75" id="LiveAddress"   onclick="return false"/></td>
							  </tr>
						   <tr><td  id="CompanyAddress2"  colspan="3">
                              公司地址：
                              <input type="text"  size="75"  id="CompanyAddress"   onclick="return false"/></td>
							<tr><td  id="EmailAddress2"  colspan="3">
                              email地址：
                              <input type="text"  size="75"  id="Email2"   onclick="return false"/></td>
							  </tr>				   

						  <tr><td id="RegisterAddress11" colspan="3">
						     <font color="#9400D3">戶籍地址：</font>
                             <input type="text"  size="75" id="RegisterAddress1"   onclick="return false"/></td>
						    
						   <tr><td id="LiveAddress11" colspan="3">
							  <font color="#9400D3">居住地址：</font>
                              <input type="text"  size="75" id="LiveAddress1"   onclick="return false"/></td>
							  </tr>
						   <tr><td id="CompanyAddress11" colspan="3">
                              <font color="#9400D3">公司地址：</font>
                              <input type="text"  size="75"  id="CompanyAddress1"   onclick="return false"/></td>
							  </tr>
							<tr>
                            <td id="Email11" colspan="3">
							<font color="#9400D3">EMAIL：</font>
                              <input type="text"  size="50" id="Email1"   onclick="return false"/></td>
						  </tr>							  
						  
						  <tr><td colspan="3"><hr/></td></tr>
						  
						   <tr>
							<td colspan="3">帳單寄送方式：
								<input type="radio" name="SendWay"   onclick="return false" class="radio"/>
								紙本帳單
								<input type="radio" name="SendWay"   onclick="return false" class="radio"/>
								電子帳單
								<input type="radio" name="SendWay"   onclick="return false" class="radio"/>
								紙本電子帳單皆寄送				
							 </td> 
						 </tr>
                                           <tr><td colspan="3"><hr/></td></tr>
						 <tr>
							<td >變更結帳日：
								<input type="radio" name="UpDataDate"   onclick="return false" class="radio"/>
								1日
								<input type="radio" name="UpDataDate"   onclick="return false" class="radio"/>
								7日
							</td>
							
							<td colspan="2">
							確認 <input type="checkbox" name="U_Check"   onclick="return false" class="checkbox"/>
							已確認客戶無申辦長循或來電分期，且有繳足帳單最低應繳金額以上
								
							</td>
						 </tr>
						<tr>
                            <td colspan="3">其他：（100字以內）
                              <b><textarea name="textarea"  id="Other" ></textarea></b></td>
                         </tr>
                          
                         <tr>
                            <td><br />
                              客服人員：
                              <input type="text"  disabled size="10" id="ESQId"   onclick="return false"/></td>
                            <td><br />
                              客服覆核：
                              <input type="text"  size="14"   onclick="return false"/></td>
                            <td><br />
                              客服主管簽章：
                              </td>
                         </tr>
						 
                         <tr>
                            <td rowspan="2"><br />
                              處理單位：
                              <input type="text"  disabled size="10" id="HandleDepartId"   onclick="return false"/></td>
                            <td><br />
                              作業鍵機：
                              </td>
                            <td rowspan="2"><br />
                              作業主管簽章：
                              </td>
                          </tr>
						  <tr>
						  <td>作業覆核：</td>
						  </tr>
                        </table>
					  </div>
					</td>
				 </tr>
			</table>
		</div>
	</c:body>
</c:html>
