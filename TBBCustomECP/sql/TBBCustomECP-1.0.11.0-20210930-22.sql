--TBB.UVoiceBank
alter table tpTBBUVoiceBank drop column U_BUTypeDesc;
alter table tpTBBUVoiceBank add U_BUTypeDesc varchar(20);
drop table tpTBBEBankingInfoFormBUTypeDes;

update TsField set FUnitId='17887987-ef90-0001-5ef2-005056c00008', FName='U_BUTypeDesc',   FTitle='業務類別',                FType='ComboBox-SelectOnly', FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId='177f2674-7ae0-04c3-1937-d8f2cab1cb50', FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='178879a1-f960-0001-5ef2-005056c00008';

--TBBPassbookLoss
update TsFieldGridColumn set FKey='U_CHKNUM' where FId='ec9b8729-0c00-ce20-b708-17bcebdd78b0';
update TsFieldGridColumn set FKey='U_AMTEVT' where FId='ec9b8729-0c00-ce20-b708-17bcebe5c060';
update TsFieldGridColumn set FKey='U_MEMO' where FId='ec9b8729-0c00-ce20-b708-17bcebec9680';

--TBB.EBankingInfo
update TsField set FTitle='MB快登上次登入日期/時間' where FId='ec9b8729-0c00-c076-4804-17a17ed14bf0';

--TBB.UHistoricalpayment
alter table tpTBBUHistoricalpayment add U_Currdue varchar(30);
alter table tpTBBUHistoricalpayment alter column U_ErrorMemo set data type varchar(50);

--TBB.UCUSYearsbillmonth
alter table tpTBBUCUSYearsbillmonth drop column U_Currdue;

update TsField set FIsNewRow=0 where FId='2eda0929-0c00-5f26-6a01-17a13e8904e0';
update TsField set FIsNewRow=1 where FId='2eda0929-0c00-5f26-6a01-17a13dce6570';

