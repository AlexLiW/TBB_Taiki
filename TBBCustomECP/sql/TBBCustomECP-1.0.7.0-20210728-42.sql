--更新歷程節點紀錄主鍵值
update TsUnit set FCode='TBBmIVRNodeCourseRecord', FName='歷程節點紀錄', FIcon='quicksilver/image/unit/New.gif', FEditId='541c707d-79dd-4dbb-85fc-1a214fd5fce4', FModuleId='c8abc4dd-d210-4b96-bf77-328f559546c1', FOpenMode='System', FIsTreeStructure=0, FMaxTreeLevel=null, FIsSlaveUnit=0, FMasterUnitId=null, FSupportWorkflow=0, FSupportUser=0, FSupportDepartment=0, FSupportEditType=0, FSupportAttachment=0, FSupportDataPrivilege=0, FSupportVersion=0, FSupportBusinessLog=0, FSupportNote=0, FSupportSort=0, FSupportPrivilegeField=0, FIsFullTextSearch=0, FSearchAttachment=0, FSupportEqualQuery=0, FUseSystemI18nTable=0, FExtraQueryResultLimit=0, FRecordCreateInfo=1, FRecordUpdateInfo=0, FRecordDeleteInfo=0, FOpenViewPageFirst=0, FDataSource='default', FTable='IVRNodeCourseRecord', FKeyField='Seq', FKeyType='Uuid', FNameField='FName', FMasterField=null, FHomeClassName=null, FDaoClassName=null, FServiceClassName=null, FActionClassName=null, FWebServiceUniqueField=null, FUnitFilterSql='', FBusinessFilterSql='', FDescription='', FOpenViewPageCondition=null, FViewPageConditionForList=null, FViewPageConditionForLink=null, FBigIcon='quicksilver/image/unit/New-64.png', FIsTreeCheckPrivilege=0, FApiClassName=null, FApiEnabled=0 where FId='0800c056-5000-2012-9b08-17a7a602a3e0'; 

--更新流程節點紀錄主鍵值
update TsUnit set FCode='TBBmIVRNodeFinalRecord', FName='流程節點紀錄', FIcon='quicksilver/image/unit/New.gif', FEditId='541c707d-79dd-4dbb-85fc-1a214fd5fce4', FModuleId='c8abc4dd-d210-4b96-bf77-328f559546c1', FOpenMode='System', FIsTreeStructure=0, FMaxTreeLevel=null, FIsSlaveUnit=0, FMasterUnitId=null, FSupportWorkflow=0, FSupportUser=0, FSupportDepartment=0, FSupportEditType=0, FSupportAttachment=0, FSupportDataPrivilege=0, FSupportVersion=0, FSupportBusinessLog=0, FSupportNote=0, FSupportSort=0, FSupportPrivilegeField=0, FIsFullTextSearch=0, FSearchAttachment=0, FSupportEqualQuery=0, FUseSystemI18nTable=0, FExtraQueryResultLimit=0, FRecordCreateInfo=1, FRecordUpdateInfo=0, FRecordDeleteInfo=0, FOpenViewPageFirst=0, FDataSource='default', FTable='IVRNodeFinalRecord', FKeyField='Seq', FKeyType='Uuid', FNameField='FName', FMasterField=null, FHomeClassName=null, FDaoClassName=null, FServiceClassName=null, FActionClassName=null, FWebServiceUniqueField=null, FUnitFilterSql='', FBusinessFilterSql='', FDescription='', FOpenViewPageCondition=null, FViewPageConditionForList=null, FViewPageConditionForLink=null, FBigIcon='quicksilver/image/unit/New-64.png', FIsTreeCheckPrivilege=0, FApiClassName=null, FApiEnabled=0 where FId='0800c056-5000-2012-9b08-17a7a5741f30';

--加入歷程節點紀錄創建時間時間格式顯示邏輯
insert into TsFieldProperty set FId='12a99f93-6bd6-467c-aa7c-26a60eddd941', FFieldId='0800c056-5000-2012-9b08-17a7a602af50', FName='format', FValue='"yyyy-MM-dd HH:mm:ss"';

--加入歷程節點紀錄創建時間時間格式顯示邏輯
insert into TsFieldProperty set FId='e3436669-ad7e-470d-8ee8-96d20c2294aa', FFieldId='0800c056-5000-2012-9b08-17a7a5742390', FName='format', FValue='"yyyy-MM-dd HH:mm:ss"';

--加入通話記錄對歷程、流程節點之關聯關係
insert into TsRelation set FDeleteAction1='unset',  FDeleteAction2='unset',  FField1='FCallerPIN', FField2='CallerPIN',               FId='00000000-0000-b857-7f07-17ae6de35580', FName='通話記錄-流程節點紀錄',     FOppositeId='00000000-0000-b857-7f07-17ae6de355d0', FOppositeName='流程節點紀錄-通話記錄',     FPrivilegeTypeId1=null, FPrivilegeTypeId2=null, FTable='tpTBBIVRNFRtoCallerPIN',  FType='table', FUnitId1='5d6b7749-a28f-496b-9eff-524cb20474fc', FUnitId2='0800c056-5000-2012-9b08-17a7a5741f30';
insert into TsRelation set FDeleteAction1='unset',  FDeleteAction2='unset',  FField1='FCallerPIN', FField2='CallerPIN',               FId='00000000-0000-b857-7f07-17ae6df1b3c0', FName='通話記錄-歷程節點紀錄',     FOppositeId='00000000-0000-b857-7f07-17ae6df1b3e0', FOppositeName='歷程節點紀錄-通話記錄',     FPrivilegeTypeId1=null, FPrivilegeTypeId2=null, FTable='tpTBBIVRNCRtoCallerPIN',  FType='table', FUnitId1='5d6b7749-a28f-496b-9eff-524cb20474fc', FUnitId2='0800c056-5000-2012-9b08-17a7a602a3e0';

--加入通話記錄對歷程、流程節點之關聯表
create table tpTBBIVRNCRtoCallerPIN
(
	CallerPIN varchar(100),
	FCallerPIN varchar(100)
);
create table tpTBBIVRNFRtoCallerPIN
(
	FCallerPIN varchar(100),
	CallerPIN varchar(100)
);


--加入通話記錄之歷程、流程節點關聯功能表
insert into TsPage set FActionMethodName='TBBmIVRNodeFinalRecord.prepareList', FCode='Ecp.CallLog.TBBmIVRNodeFinalRecordList', FCreateKeywordBox=null, FCreateQuerySchemaBox=null, FDescription='',   FDialogHeight=null, FDialogMaximized=0,    FDialogWidth=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null, FHasViewFrame=0,    FIcon='quicksilver/image/unit/New.gif',  FId='00000000-0000-b857-7f07-17ae6ea98d30', FIndex=7, FIsSlavePage=1, FLoadHandler=null, FMasterUnitId='5d6b7749-a28f-496b-9eff-524cb20474fc', FName='通話記錄流程節點紀錄列表', FPlatform='Computer', FQueryFormAutoQuery=1, FQueryOnLoad=null, FQuerySchemaId=null, FRelationId='00000000-0000-b857-7f07-17ae6de35580', FTitle='流程節點紀錄',     FToolItemInitArguments='',   FType='EntityList', FUnitId='0800c056-5000-2012-9b08-17a7a5741f30', FUrl='quicksilver/page/template/EntityList.jsp', FVisible=1, FVisibleCondition=null;
insert into TsPage set FActionMethodName='TBBmIVRNodeCourseRecord.prepareList', FCode='Ecp.CallLog.TBBmIVRNodeCourseRecordList', FCreateKeywordBox=null, FCreateQuerySchemaBox=null, FDescription='',   FDialogHeight=null, FDialogMaximized=0,    FDialogWidth=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null, FHasViewFrame=0,    FIcon='quicksilver/image/unit/New.gif',  FId='00000000-0000-b857-7f07-17ae6eb9a240', FIndex=8, FIsSlavePage=1, FLoadHandler=null, FMasterUnitId='5d6b7749-a28f-496b-9eff-524cb20474fc', FName='通話記錄歷程節點紀錄列表', FPlatform='Computer', FQueryFormAutoQuery=1, FQueryOnLoad=null, FQuerySchemaId=null, FRelationId='00000000-0000-b857-7f07-17ae6df1b3c0', FTitle='歷程節點紀錄',     FToolItemInitArguments='',   FType='EntityList', FUnitId='0800c056-5000-2012-9b08-17a7a602a3e0', FUrl='quicksilver/page/template/EntityList.jsp', FVisible=1, FVisibleCondition=null;


--更新FaxLog資料表欄位與單元
ALTER TABLE FaxLog ADD FaxResultCCFAX varchar(50);
insert into TsField set FId='25353a29-0c00-9204-d30b-17b0f821d880', FUnitId='0100c056-5000-ec04-be07-17a424d6bc10', FName='FaxResultCCFAX', FTitle='FaxResultCCFAX',   FType='InputBox-Text',       FSize=50,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',   FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
java setFormFields('0100c056-5000-ec04-be07-17a424d71990', '基本資訊', '0100c056-5000-ec04-be07-17a424d71a90', null, 'Seq,FaxFrom,CallerPIN,FaxTime,FaxTel,Ani,FaxName,FaxTimes,FaxResult,FaxResultCCFAX,CreateTime,FaxLastTime');
java setListFields('0100c056-5000-ec04-be07-17a424d728a0', 'Seq,FaxFrom,CallerPIN,FaxTime,FaxTel,Ani,FaxName,FaxTimes,FaxResult,FaxResultCCFAX,CreateTime,FaxLastTime');
java setOrderFields('0100c056-5000-ec04-be07-17a424d6bc10', 'CreateTime', '1');
