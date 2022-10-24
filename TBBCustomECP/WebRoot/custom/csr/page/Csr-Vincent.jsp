<?xml version="1.0" encoding="Big5"?>

<%@page isELIgnored="true"%><%@page import="java.util.*"%><%@page import="com.jeedsoft.quicksilver.base.type.*"%><%@page import="com.jeedsoft.quicksilver.dictionary.*"%><%@page import="com.jeedsoft.quicksilver.i18n.*"%><%@page import="com.jeedsoft.quicksilver.unit.*"%><%@taglib prefix="c" uri="/WEB-INF/taglib/Computer.tld"%><%@page import="com.chainsea.csr.gateway.GatewayHome"%><%@page import="com.chainsea.csr.gateway.dao.GatewayDao"%>
<%@page import="com.chainsea.csr.gateway.service.GatewayService"%><%@page import="com.chainsea.csr.gateway.action.GatewayAction"%><%@page import="com.chainsea.csr.gateway.model.GatewayModel"%>
<%!	public ActionContext getActionContext()
	{
		return ActionContext.getThreadInstance();
	}
	public ServiceContext getServiceContext()
	{
		return ActionContext.getThreadInstance().getServiceContext();
	}
	public DaoContext getDaoContext()
	{
		return ActionContext.getThreadInstance().getDaoContext();
	}	
	public String text(String key)
	{
		return TextResourceHome.getText(key);
	}
	public String fieldTitle(String unitCode, String fieldName)
	{
		return FieldHome.getDao().getFieldTitle(getDaoContext(), unitCode, fieldName);
	}
	public String unitName(String unitCode)
	{
		return UnitHome.getDao().getItem(getDaoContext(), unitCode).getName();
	}
	public org.json.JSONArray comboBoxItems(java.util.UUID dictId)
	{
		return DictionaryHome.getService().getComboBoxItemsJson(getServiceContext(), dictId);
	}
	public org.json.JSONArray comboBoxItems(String unitCode, String fieldName)
	{
		UUID unitId = UnitHome.getDao().getItem(getDaoContext(), unitCode).getId();
		UUID dictionaryId = FieldHome.getDao().getItem(getDaoContext(), unitId, fieldName).getDictionaryId();
		return DictionaryHome.getService().getComboBoxItemsJson(getServiceContext(), dictionaryId);
	}%>
<%@page contentType="text/html;charset=Big5"%><%PageResult result = (PageResult)request.getAttribute("result");%><%=new String(result.getServerString("Html_Ret"))%>
 
 <%  //�쥻�H�W�O @include file="/quicksilver/page/include/Initialize.jsp  �u�O���F�n�N���e�אּ Big5 ,�B�b�ɮ׳̫e���[�W xml �ŧi   %>


 