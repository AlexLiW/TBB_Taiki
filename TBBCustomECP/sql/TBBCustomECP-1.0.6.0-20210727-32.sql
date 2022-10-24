
update  TsField set  FUnitId='2eda0929-0c00-832b-5c0c-17a138ac4b90', FName='U_PageNum',          FTitle='TXNID',                      FType='InputBox-Text', FSize=10,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue='BSB1,BSB2', FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='2eda0929-0c00-832b-5c0c-17a1396477f0';



----------------------------------------------------通話紀錄串聯聯絡人ID欄位顯示-----------------------------------------------------------------------------------------

java setFormFields('4f9a1eb1-cd28-4f45-b18b-8b2952a23e55', '基本資訊', 'f53e8a6e-8f8c-4f20-a857-0e3e40e8a35c', null, 'U_OpenFormYN,U_InterestsInform,U_ImportantNote,FPhonePlanName,FPhonePlanTime,U_CustomId', '進線資訊', 'a624b295-db29-4b7c-b1c9-6e187e0a7fa0', null, 'FAni,FDnis,FWG,FABNCounter,FDesignationUser,FWGError,FIsComplaintCase,FInboundCounter,FObjectId,FUnitId,FWaitTime,FCallerPIN,FIsShortCall,FIsLongCall,FFailReason,FIsBeginner,FCallKind,FPId', '管理', '1a480dc3-372e-4ebd-8f71-9f0337ecc0b1', null, 'FEndTime,FStartTime,FDuration,FUserId,FDepartmentId,FOutboundResult,FProductCatalogId,FTargetCustomerId,FContactId,FLeadId');





----------------------------------------------------虛擬帳號查詢-----------------------------------------------------------------------------------------

ALTER TABLE tpTBBVirtualAC ALTER column U_OVACN1 set data type varchar(16);

update  TsField set  FUnitId='1788c8a8-ec50-0001-5ef2-005056c00008', FName='U_OVACN1',  FTitle='虛擬帳號',     FType='InputBox-Text', FSize=16,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='1788c8c9-3d60-0001-5ef2-005056c00008';


