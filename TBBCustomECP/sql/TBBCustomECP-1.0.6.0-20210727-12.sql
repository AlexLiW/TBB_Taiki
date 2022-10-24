
-- Ecp.Contact ---
update TsPage set FName='聯絡人服務請求列表',       FTitle='服務請求',             FCode='Ecp.Contact.ServiceRequestList',              FPlatform='Computer', FType='EntityList',   FIcon='ecp/image/unit/ServiceRequest.gif',      FUrl='quicksilver/page/template/EntityList.jsp',       FActionMethodName='Ecp.ServiceRequest.prepareList',                    FLoadHandler=null,                                     FRelationId='72393ac4-6d8e-4eaf-a7d5-3bb9a3d4a3b5', FUnitId='32c8c225-2422-4a20-9e4d-1947f0548a1a', FMasterUnitId='00000000-0000-0000-0001-020000001002', FIsSlavePage=1, FIndex=999,  FDialogWidth=null, FDialogHeight=null, FHasViewFrame=null, FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=1,    FVisible=0, FDescription=null, FDialogMaximized=null, FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments=null, FVisibleCondition=null,                                    FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='0e19073d-cc5e-4da2-90e0-29d683503a17';


--字典
update TsDictionary set FBuiltin=0, FDescription='', FName='憑證暫禁/一般網路密碼終止-勾選框', FParentId=null, FTextAsValue=0 where FId='a9fd5f22-6fc1-0650-78fa-ffffff16b4f3';
update TsDictionary set FBuiltin=0, FDescription='', FName='憑證暫禁/一般網路密碼終止-通報人', FParentId=null, FTextAsValue=0 where FId='a9fd5f22-6fc1-0618-5c1a-ffffff16b4f1';


-- TBB.stopcardapply ---
insert into TsToolItem set FAlign='right', FChartId=null, FCode='ExcelExport', FConfirmMessage=null, FDefaultEventHandler='EntityList.doExcelExport', FDefaultValue=null, FDictionaryId=null, FEnableCondition=null, FEntityUnitId=null, FHandlePageId=null, FHandleType='JavaScript', FHint=null,                                                   FIcon='quicksilver/image/16/Excel.png',   FId='0100c056-5000-5e6d-190b-17aadc689190', FIndex=6, FLabel=null, FName='匯出Excel', FPageId='0100c056-5000-ca09-510a-179e485535c0', FScale=null, FSubItemRoutine='',   FSubItemSource=null,           FType='Button',      FVisibleCondition=null, FWidth=null;

-- TBB.UDepositFlag ---
alter table tpTBBUDepositFlag alter U_ACNO set data type varchar(16);
update TsField set FUnitId='17887266-f300-0001-5ef2-005056c00008', FName='U_ACNO',        FTitle='帳號',                 FType='InputBox-Text',       FSize=16,   FVisible=1, FFilterByRole=0, FRequired=1, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='17887278-ad40-0001-5ef2-005056c00008';

-- 臺企銀客服二線 ---
insert into TsRolePrivilege set FExpression='',        FGlobal=1, FId='5110f6b6-1f46-4969-ae8a-7a865dd3fe97', FOperator='',   FPrivilegeId='e6566429-7f28-47ba-aef1-d2660ae4b97e', FRoleId='d1a4bd4e-87d0-4833-a596-5adcdbee4abd', FSql='';

-- 臺企銀作業科人員1 ---
insert into TsRolePrivilege set FExpression='', FGlobal=1, FId='2b7cba96-d55a-422a-be8b-cb915a8a5fe8', FOperator='', FPrivilegeId='e6566429-7f28-47ba-aef1-d2660ae4b97e', FRoleId='bc5fab26-3887-4d6d-b81c-380e04cf1b06', FSql='';
insert into TsRolePrivilege set FExpression='', FGlobal=1, FId='7d8bf045-3a44-40e3-9cf2-6373bda31cc4', FOperator='', FPrivilegeId='0100c056-5000-ca09-510a-179e48559100', FRoleId='bc5fab26-3887-4d6d-b81c-380e04cf1b06', FSql='';
insert into TsRolePrivilege set FExpression='', FGlobal=1, FId='e4aadaab-7dad-4768-a3ab-300c61c5b7a4', FOperator='', FPrivilegeId='0100c056-5000-ca09-510a-179e48559290', FRoleId='bc5fab26-3887-4d6d-b81c-380e04cf1b06', FSql='';
insert into TsRolePrivilege set FExpression='', FGlobal=1, FId='7309acdc-eaf9-4402-a44f-1bb74538d63e', FOperator='', FPrivilegeId='0100c056-5000-ca09-510a-179e48559370', FRoleId='bc5fab26-3887-4d6d-b81c-380e04cf1b06', FSql='';
insert into TsRolePrivilege set FExpression='', FGlobal=1, FId='b6416e77-e34d-4998-a794-72fb93f331fa', FOperator='', FPrivilegeId='0100c056-5000-ca09-510a-179e48559490', FRoleId='bc5fab26-3887-4d6d-b81c-380e04cf1b06', FSql='';

--TBB.UBasicInformation---------------------------------------------------------
insert into TsScript set FId='0100c056-5000-de13-4103-17ae16b820f0', FIndex=3, FPageId='a9f91062-8f50-4c01-8244-c417569d647b', FUrl='custom/tbb/page/ubasicInformationform/UBasicInformationForm.js';
insert into TsScript set FId='0100c056-5000-de13-4103-17ae16c62550', FIndex=4, FPageId='a9f91062-8f50-4c01-8244-c417569d647b', FUrl='custom/tbb/page/common/TBBUtil.js';
update TsToolItem set FPageId='a9f91062-8f50-4c01-8244-c417569d647b', FCode='SearchBasicData', FName='查詢基本資料', FHint=null, FLabel=null, FType='Button',      FAlign='left',  FIndex=1, FWidth=null, FIcon='quicksilver/image/16/Server.png', FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null,           FDictionaryId=null, FSubItemRoutine='',   FVisibleCondition=null, FEnableCondition=null, FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='//UBasicInformation.SearchBasicData("TVO3MBBT")
UBasicInformationForm.SearchBasicData()', FChartId=null where FId='1a74d5e7-ae85-48bf-830f-7ad807376d3c';


