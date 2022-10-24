
--金融卡發卡主檔

ALTER TABLE tpTBBUATMCardDetail ADD U_CARDNO_2 varchar(16);
ALTER TABLE tpTBBUATMCardDetail ADD U_SABCOD varchar(14);

insert into TsField set FId='0800c056-5000-8a27-890e-17c4a869f100', FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_CARDNO_2',      FTitle='信用卡卡號',                   FType='InputBox-Text',       FSize=16,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0800c056-5000-8a27-890e-17c4a874dbe0', FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_SABCOD',        FTitle='卡別',                         FType='InputBox-Text',       FSize=14,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
update TsField set FIsNewRow=0 where FId='2eda0929-0c00-e960-be0e-179ef8669c00';

java setFormFields('2eda0929-0c00-8f3a-bb07-179eabb77e80', '基本資訊', '2eda0929-0c00-8f3a-bb07-179eabb780d0', null, 'U_ACNO,U_Inquiry', '查詢結果', '179ef7f4-2980-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_FUserId,U_UID,U_PHPW,U_Status,U_CardNo,U_CardNum,U_IsApplyNoDep,U_IsApplyTrans,U_SABCOD,U_CARDNO_2,U_ApplyInDraw,U_AOPLMT,U_AODLMT,U_PINCNT,U_TRINCT,U_ABAVCT,U_ABAVCTX,U_MEGECT,U_ABUSCT,U_ABUSCTX,U_EndYM,U_GRPCOD,U_VSEXPYM,U_VSDBYN,U_SMART,U_PACNO,U_ABKEYTP,U_BRHACC,U_Inquiry3,U_Inquiry2,U_Inquiry4,U_Result,U_ResultExplain', '金融卡發卡歷史查詢', '179efcde-5f90-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A011Grid', '金融卡發卡明細查詢', '179efd07-bda0-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A012Grid');


--信用卡卡片狀態查詢
update TsField set FTitle='主帳號(正卡)'  where FId='c5cfcd29-0c00-431c-dd02-17c2616cfa10';

--事故交易查詢

delete from TsFieldGridColumn where FId='ec9b8729-0c00-ce20-b708-17bcebf428d0';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-ce20-b708-17bcebf77710';


--調整字典(TBB-終止存提登錄類別)

update TsDictionaryItem set FText='解圈(此圈存、解圈欄位限虛擬帳號使用)' where FDictionaryId='177f1f7e-8990-04c3-1937-d8f2cab1cb50';


--疑似不法-登錄交易-存提交易註記登錄
java setFormFields('17887267-21f0-0001-5ef2-005056c00008', '基本資訊', '17887267-21f0-1001-5ef2-005056c00008', null, 'U_ACNO,U_ACType,U_Result,U_RegType,U_Button,U_Amount,U_RegDT,U_RegTellerNo,U_SeqNo,U_Note');


--信用卡已授權未請款查詢
alter  table tpTBBUAuthorizedunclaimed add U_NAME varchar(50);
update TsField set FType='ComboBox-SelectOnly',FDictionaryId='0800c056-5000-f203-3805-17c303039590'  where FId='2eda0929-0c00-9c71-8308-17a36b216870'; 
insert into TsFieldGridColumn set FId='0800c056-5000-8a27-890e-17c4aa606ba0', FFieldId='2eda0929-0c00-9c71-8308-17a36b414f00', FTitle='卡號',         FKey='U_CARDNMBR1',     FType='String', FIndex=1, FControls='';
insert into TsField set FId='0800c056-5000-8a27-890e-17c4a9b84d60', FUnitId='2eda0929-0c00-9c71-8308-17a36995fd60', FName='U_NAME',          FTitle='姓名',                     FType='InputBox-Text',       FSize=50,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,   FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('2eda0929-0c00-9c71-8308-17a36997ded0', '基本資訊', '2eda0929-0c00-9c71-8308-17a36997e230', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_Account,U_Inquiry', '查詢結果', '17a36b63-e170-0883-719c-000c2909da2e', '2eda0929-0c00-9c71-8308-17a36997e230', 'U_CardType,U_OCardNum,U_Consumptions,U_Totalspending,U_NAME,U_Grid');
