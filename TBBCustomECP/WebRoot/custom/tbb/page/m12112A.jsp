﻿<%@include file="/quicksilver/page/include/Initialize.jsp"%>
<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<c:html>
	<c:head>
    	<title>臺灣中小企業銀行轉介客戶抱怨單</title>
		<link href="custom/tbb/page/css/tbb.css" rel="stylesheet" type="text/css" />
		<style type="text/css">
		.clear span img {
			width: 70px;
			height: 52px;
			float:none;
		}
		</style>
	</c:head>
	<c:body>
		<div align="center" id="tbb">
			<table class="table">
				
				<tr >
					<td colspan="4" valign="top" class="clear">
					<div style="border-bottom:#000000 1px solid;">
					<span class="top" ><img src="custom/tbb/image/logo.jpg"  alt=""/>臺灣企銀客服中心客戶抱怨轉介單</span>
					</div>
					</td>
				</tr>
							
				<tr>
					<td colspan="4" valign="top">
					<div>
							<table  style="font-size:18px;">
								<tr>
								<td colspan="4">申訴人姓名：<input type="text" disabled size="4" id="Name" onclick="return false"/>
									身份證字號/統編：<input type="text" disabled size="9" id="IdCard" onclick="return false"/>					
									日期：<input type="text" disabled size="16" id="DTime" onclick="return false" /></td>
								</tr>
								<tr>						
								<td colspan="4">客戶身分：
									<input type="radio" name="CustomerIdfiy" onclick="return false" class="radio"/>
									信用卡客戶
									<input type="radio" name="CustomerIdfiy" onclick="return false" class="radio"/>
									網銀客戶
									<input type="radio" name="CustomerIdfiy" onclick="return false" class="radio"/>
									其他					
                                                               								
                                                                        卡種：
									<input type="radio" name="CardS" onclick="return false" class="radio"/>
									信用卡
									<input type="radio" name="CardS" onclick="return false" class="radio"/>
									簽帳金融卡					
								</td>  
								</tr>
								
								<tr>
									<td colspan="4">住家電話：<input type="text" disabled id="LivePhone" onclick="return false" size="12"/>
								 公司電話：<input type="text" disabled id="CorPhone" onclick="return false" size="14"/>
									手機：<input type="text" disabled id="Cellphone" onclick="return false" size="17"/></td>
								</tr>
								
								<tr>
									<td colspan="4">正卡人姓名：<input type="text" disabled size="10" id="ZName" onclick="return false"/>
									正卡卡號：<input type="text" disabled  size="18" id="CardNo" onclick="return false"/>
									往來分行：<input type="text" disabled  size="10" id="Branch" onclick="return false"/></td>
								</tr>
								
								<tr>
									<td colspan="4">附卡人姓名：<input type="text" disabled size="10" id="FuName" onclick="return false"/>
									附卡卡號：<input type="text" disabled size="18" id="FuCard" onclick="return false"/></td>
								</tr>

								<tr>
									<td colspan="2">案件類型：
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 急件
									<input type="radio" name="CaseType" onclick="return false" class="radio"/> 一般件
									
								</tr>

								<tr><td colspan="4"><hr/></td></tr>
								<tr>
									<td colspan="4">內容說明：(1000字以內)<textarea id="Content" disabled style="height:100px;"></textarea></td>
								</tr> 
								<tr>
								<td colspan="4">
								處理人員：<input type="text" disabled id="UserId" onclick="return false" size="15"/>    
								客服主管簽章：<input type="text"   size="15"/>
								處理部門：<input type="text" disabled id="SollveId" onclick="return false"  size="6"/></td>
								
							</tr>		

								<tr><td colspan="4"><hr/></td></tr>						
														
								<tr>
									<td colspan="2">案件等級：
									<input type="radio" name="Rank" onclick="return false"/> 第一級
									<input type="radio" name="Rank" onclick="return false"/> 第二級 

									</td>
								
									<td colspan="2">請於___個營業日內處理完畢後回傳客服中心</td>
								</tr>
								<tr>
									<td>權責單位</td>
								</tr>
			
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>個人金融部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>信用卡部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>業務發展部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>人力資源處</td>	
								</tr>
								
								<tr>
									
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>企業金融部</td>
									<td id="td"> 
										<input type="checkbox" name="Type" onclick="return false"/>國際部</td>
										<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>債權管理部</td>
									<td id="td">
										<input type="checkbox" name="Type"onclick="return false"/>授信管理部</td>
								</tr>
								
								<tr>
									
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>財富管理部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>信託部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>資訊部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>證券部</td>
								</tr>
								<tr>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>徵信部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>數位金融部</td>
									<td id="td">
										<input type="checkbox" name="Type" onclick="return false"/>其他</td>
									<td id="td">其他：<span id="UnitOther"></span></td>
								</tr>

								
								
								<tr><td colspan="4"><hr/></td></tr>

								<tr>
									
                                                                        <td colspan="4">客服中心聯絡 電話：02-2356-0050 分機1753  傳真：02-23570246 </td>
								</tr>

								
									
								<tr><td colspan="4"><hr/></td></tr>
								<tr>
									<td colspan="4">處理情形回覆：<textarea id="Result" class="text" disabled style="height:60Px;"></textarea></td>
								</tr>
								<tr><td colspan="4"><hr/></td></tr>
								<tr>
									<td colspan="4">分析客訴原因：<textarea id="null" class="text" disabled style="height:30Px;"></textarea></td>
								</tr>
								<tr><td colspan="4"><hr/></td></tr>
								<tr>
									<td colspan="4">研擬改善措施：<textarea id="null" class="text" disabled style="height:30Px;"></textarea></td>
								</tr>
								<tr><td colspan="4"><hr/></td></tr>
 								<tr>
									<td colspan="4">有無違反本行「公平待客原則」或金融消費者保護法規 
									<input type="checkbox" name="Rank" onclick="return false"/> 無違反
									<input type="checkbox" name="Rank" onclick="return false"/> 有違反：(簡述違反情形及改善措施____________________________________)
									</td>
								</tr>
								<tr><td colspan="4"><hr/></td></tr>
							
								
								<tr>									
								<td>經辦：<input type="text" disabled  size="2"/></td>   
								<td>襄理(組長)：<input type="text" disabled  size="5"/></td>								
								<td>副理：<input type="text" disabled  size="5"/></td>
								<td>單位主管：<input type="text" disabled  size="5"/></td>
                                                                      
								</tr>
<tr><td colspan="3"></td></tr>
								</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</c:body>
</c:html>
