---A014---
---新增欄位

alter table UDebitLoss add U_Result_6 varchar(10);
alter table UDebitLoss add U_ResultExplain_6  varchar(50);

insert into TsField set FId='0800c056-5000-2640-3d0b-1841d663bcb0', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_Result_6',                FTitle='交易結果_取消掛失',               FType='InputBox-Text',       FSize=10,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0800c056-5000-2640-3d0b-1841d67657b0', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_ResultExplain_6',         FTitle='交易結果說明_取消掛失',           FType='InputBox-Text',       FSize=50,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=2, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('0f4b106e-4e17-464c-96be-29ce45705040', '基本資訊', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', null, 'U_AccountNumberSystem,FUserid2', '基本資料', 'b775af01-0169-4a56-86a1-2699ab6a5bd0', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_CustName,U_CustID,U_SAMDKEY,U_CustMobile,U_TelNum,U_CustAddress,U_OtherPhone,U_Attn,U_Notifiers,U_CaseType,U_PrincipalName,U_PrincipalRelation,U_PrincipalPhone,U_Result,U_ResultExplain,U_Result_1,U_ResultExplain_1,U_Result_2,U_ResultExplain_2,U_Result_3,U_ResultExplain_3,U_Result_4,U_ResultExplain_4,U_Result_5,U_ResultExplain_5,FStatus,U_DateTime', '取消掛失', '183cacbb-fb20-00e8-6ca3-5254000e5458', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_SAMDKEY_Result,U_loss_report,U_Loss_Report_Result,U_Result_6,U_ResultExplain_6', '掛失類別', 'e3b15d51-5515-47a8-a368-298ac640e6bb', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_LossType,U_LossCardType,U_LossKind_New,U_PhoneInform,U_Remind', '掛失時間', 'ffe2a957-8073-4ff5-8c78-86f4d66a12be', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_LossWay,U_Remind1,U_DebitCardDate,U_BankBookDate,U_SealDate,U_leisureDate,U_GetECTime,U_GridA015', '回撥時間', 'bd067001-38f8-48ec-aeaa-828bccf92e8c', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_CallBackTime1,U_CallBackStaff1,U_CallBackOther1,U_CallBackTime2,U_CallBackStaff2,U_CallBackOther2,U_Remark,FUserId', '舊有欄位', '17a138a2-4b60-05ec-4cf4-005056c00001', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_DebitCardTerminal,U_LossKind,U_BankBookSeal', '資料暫存用', '17d2765b-2da0-0502-44c5-005056c00008', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_AccountNumberSystemTemp');

---CQ16---
---修改欄位長度

alter table TpCUSmBankTel alter column U_account set data type varchar(16);

update TsField set FSize=16 where FId='c7bfb856-5000-c601-070a-183cf468d410';

---CQ17---
---修改欄位長度

alter table TpCUSmGlobalNetwork alter column U_CCID set data type varchar(10);

update TsField set FSize=10 where FId='c7bfb856-5000-c601-070a-183cfe0d29c0';

