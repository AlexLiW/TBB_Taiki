--TBB.XMLdoc
Alter table tpTBBXMLdoc add U_OtherGrid varchar(10000);

insert into TsField set FId='ec9b8729-0c00-9201-e000-17bdd419dd30', FUnitId='1788b663-3670-0001-5ef2-005056c00008', FName='U_OtherGrid', FTitle='其他資訊', FType='Grid',          FSize=10000, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

delete from TsFieldGridColumn where FId='1788b855-1de0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b85e-7180-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b862-14f0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b865-73f0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfa5-6ac0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfaa-16b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfad-75b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfb0-2d20-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfb2-ecb0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfb8-26c0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfbb-36b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfbe-a230-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfc1-65b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfc5-8840-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfc8-2b40-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfca-c230-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfcd-6730-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfd0-61b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfd3-1cb0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfd6-0940-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfd8-cd30-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfdc-5730-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfdf-c930-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfe2-b020-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788bfe5-6b40-0001-5ef2-005056c00008';

insert into TsFieldGridColumn set FId='1788b855-1de0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='行庫別',                       FKey='U_BankNo',     FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='1788b85e-7180-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='CA識別碼',                     FKey='U_CACode',     FType='String',  FIndex=2,   FControls='';
insert into TsFieldGridColumn set FId='1788b862-14f0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證CN',                       FKey='U_CA',         FType='String',  FIndex=3,   FControls='';
insert into TsFieldGridColumn set FId='1788b865-73f0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='載具序號',                     FKey='U_DevNo',      FType='String',  FIndex=4,   FControls='';
insert into TsFieldGridColumn set FId='1788bfbb-36b0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='狀態碼',                       FKey='U_StatusCode', FType='String',  FIndex=5,   FControls='';
insert into TsFieldGridColumn set FId='1788bfad-75b0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='申請日期',                     FKey='U_ApplyDate',  FType='String',  FIndex=6,   FControls='';
insert into TsFieldGridColumn set FId='1788bfb0-2d20-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='註銷日期',                     FKey='U_CanDate',    FType='String',  FIndex=7,   FControls='';
insert into TsFieldGridColumn set FId='1788bfd8-cd30-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證有效起日',                 FKey='U_CFCStartDt', FType='String',  FIndex=8,   FControls='';
insert into TsFieldGridColumn set FId='1788bfdc-5730-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證有效迄日',                 FKey='U_CFCEndDt',   FType='String',  FIndex=9,   FControls='';
insert into TsFieldGridColumn set FId='1788bfc1-65b0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證優惠使用日期',             FKey='U_CFCUseDate', FType='String',  FIndex=10,  FControls='';
insert into TsFieldGridColumn set FId='1788bfc5-8840-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='扣帳方式',                     FKey='U_DeductType', FType='String',  FIndex=11,  FControls='';
insert into TsFieldGridColumn set FId='1788bfc8-2b40-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='扣帳日期',                     FKey='U_DeductDate', FType='String',  FIndex=12,  FControls='';
insert into TsFieldGridColumn set FId='1788bfd0-61b0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='櫃檯扣帳已使用',               FKey='U_CtDdUse',    FType='String',  FIndex=13,  FControls='';
insert into TsFieldGridColumn set FId='1788bfbe-a230-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證扣款金額',                 FKey='U_CFCDdAmt',   FType='String',  FIndex=14,  FControls='';
insert into TsFieldGridColumn set FId='1788bfe5-6b40-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='扣帳錯誤訊息',                 FKey='U_DeductErr',  FType='String',  FIndex=15,  FControls='';
insert into TsFieldGridColumn set FId='1788bfe2-b020-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='憑證序號',                     FKey='U_CFCNo',      FType='String',  FIndex=16,  FControls='';
insert into TsFieldGridColumn set FId='1788bfb8-26c0-0001-5ef2-005056c00008', FFieldId='1788b84f-7940-0001-5ef2-005056c00008', FTitle='其他資訊',                     FKey='U_OtherGrid',  FType='Control', FIndex=17,  FControls='[{
    type: "Button",
    text: "其他資訊",
    onclick: XMLdocForm.openOtherGrid
}]';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddac81150', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='全國性繳費憑證優惠日期',       FKey='U_EBillDate',  FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddacc9990', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='全國性繳費憑證當年度優惠次數', FKey='U_EBillTime',  FType='String',  FIndex=2,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddad177a0', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='是否為2048載具',               FKey='U_Is2048Dev',  FType='String',  FIndex=3,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddad62010', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='是否已更換2048載具',           FKey='U_Chg2048Dev', FType='String',  FIndex=4,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddae4f5b0', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='舊載具序號',                   FKey='U_OldDevNo',   FType='String',  FIndex=5,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bdd4245390', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='票交所電子憑證狀態',           FKey='U_TCHEcFlg',   FType='String',  FIndex=6,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bdda7b0120', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='申請電子票據業務註記',         FKey='U_ApplyEcFlg', FType='String',  FIndex=7,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddaabacb0', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='電子票據手續費扣帳帳號',       FKey='U_EcFeeACNO',  FType='String',  FIndex=8,   FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-9201-e000-17bddaeccb40', FFieldId='ec9b8729-0c00-9201-e000-17bdd419dd30', FTitle='詢問扣帳次數',                 FKey='U_Deduct',     FType='String',  FIndex=609, FControls='';

java setFormFields('1788b663-6930-0001-5ef2-005056c00008', '基本資訊', '1788b663-6930-1001-5ef2-005056c00008', null, 'U_UID,U_Button', '查詢結果', '1788bfed-a6e0-0001-5ef2-005056c00008', null, 'U_Grid,U_OtherGrid');

--Ecp.Contact
Alter table TcContact add U_Phone2 varchar(20);
Alter table TcContact add U_OpenDT varchar(20);
Alter table TcContact add U_SettleDT varchar(20);
Alter table TcContact add U_RETURN2 varchar(20);
Alter table TcContact add U_RETMARK2 varchar(20);
Alter table TcContact add U_CustCharact varchar(100);

update TsField set FTitle='帳單寄送方式', FColSpan=1 where FId='0100c056-5000-5106-a602-17a5b001e460';
update TsField set FTitle='郵寄地址' where FId='0100c056-5000-5106-a602-17a5af903420';
update TsField set FTitle='公司地址', FType='TextBox', FRowSpan=2 where FId='0100c056-5000-5106-a602-17a5aeb2d0b0';
update TsField set FTitle='公司電話' where FId='0100c056-5000-5106-a602-17a5aeb8ade0';
update TsField set FTitle='戶籍地址', FType='TextBox', FRowSpan=2 where FId='0100c056-5000-5106-a602-17a5aea286e0';
update TsField set FTitle='居住地址', FType='TextBox', FRowSpan=2 where FId='0100c056-5000-5106-a602-17a5aea93140';
update TsField set FColSpan=3 where FId='0100c056-5000-5106-a602-17a5b03cbbf0';
update TsField set FColSpan=3 where FId='0100c056-5000-5106-a602-17a5b043a1b0';
update TsField set FReadOnly=0 where FId='0100c056-5000-5106-a602-17a5b715d4d0';
update TsField set FTitle='市話1' where FId='0100c056-5000-5106-a602-17a5b053f6b0';
update TsField set FTitle='總退票註記(半年)' where FId='0100c056-5000-6977-f60b-17a60889f5a0';
update TsField set FTitle='總退票(半年)' where FId='0100c056-5000-6977-f60b-17a608825e30';
update TsField set FTitle='郵遞區號' where FId='0100c056-5000-5106-a602-17a5aeea9c90';
update TsField set FTitle='備註' where FId='0100c056-5000-5106-a602-17a5aef01d00';

insert into TsField set FId='ec9b8729-0c00-2571-750d-17be30a48490', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_CustCharact',          FTitle='客戶特徵',                   FType='InputBox-Text',       FSize=100,  FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-2571-750d-17be2ec90f30', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_OpenDT',               FTitle='開戶日期',                   FType='InputBox-Text',       FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-2571-750d-17be2ed60cb0', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_SettleDT',             FTitle='結清日期',                   FType='InputBox-Text',       FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-2571-750d-17be2672bdb0', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_Phone2',               FTitle='市話2',                      FType='InputBox-Phone',      FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-2571-750d-17be2fb94c90', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_RETMARK2',             FTitle='總退票註記(三年)',           FType='InputBox-Text',       FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-2571-750d-17be2fb0abb0', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_RETURN2',              FTitle='總退票(三年)',               FType='InputBox-Text',       FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='local',    FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;

update TsToolItem set FVisibleCondition='0' where FId='83da33bd-d798-0038-021a-ffffff15c38b';

insert into TsToolItem set FId='ec9b8729-0c00-2571-750d-17be31f990a0', FPageId='477b5ef2-141f-46a3-b965-3e2a428a0fd7', FCode='U_ReQuery',           FName='重新查詢',               FHint=null, FLabel=null, FType='Button',              FAlign='right', FIndex=20, FWidth=null, FIcon='quicksilver/image/16/Refresh.png',  FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null,           FDictionaryId=null,                                   FSubItemRoutine='',                                                                                                   FVisibleCondition=null,    FEnableCondition=null,                    FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='ContactFormBTN.doLoad',                     FChartId=null;

java setFormFields('4f650a4a-571a-4847-8a69-f4bcb7cc27ed', '基本資訊', '1f74ce45-c0b8-427c-9d31-67b558224e74', null, 'U_CustName,U_CustID,FTitle,U_Dialogue,FBusinessPhone,FDialFeature,U_CustCharact', '常用交易', '1799d8dd-0350-07e3-6f21-000c29879bec', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UAccountListBTN,U_UCreditcardholderBTN,U_EBankingInfoBTN,U_UNetBankDepACNOBTN,U_XMLdocBTN', '信用卡客戶基本資料檔', '17a5b822-1df0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CName,U_Ename,U_Birthday1,U_Homephone,U_Cellphone,U_Companyphone,U_ZIP,U_Bill,U_Accountcategory,U_Domicile,U_Residence,U_Companyaddress,U_Cusserviceunit,U_Custitle,U_Annualincome,U_CENSU,U_AcceptDM,U_Gender,U_Nationality,U_Guarantor,U_Billdate,U_Maintaindate,U_Note', '銀行客戶基本資料檔', '17a5b822-1e70-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UserName,U_Birthday2,U_Birthday,U_Address1,U_Address2,U_IsEBank,U_Phone,U_Phone2,U_IsVoiceBank,U_Moblie,U_EMAIL', '銀行客戶區別資料檔', '17a5b822-1ee0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_Career,U_Title,U_DisFlag,U_RiskLev', '銀行客戶帳戶明細', '17a5b826-f200-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_ACNO,U_SCUFLG,U_BRHACC,U_IBHPWD,U_OpenDT,U_SettleDT,U_AMTICHD,U_ODFMG,U_TDYOFMX,U_ODFBAL,U_RETURN,U_RETMARK,U_REFUSE,U_RETURN2,U_RETMARK2,U_RELEASE', '其他', 'ffffff15-74b6-cb90-501b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'FNote', '客戶信用卡基本資料(舊)', 'ffffff15-74b6-cb90-500b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CreditName,U_CreditMobile,U_CreditPhone,U_CreditHomePhone,U_CreditCompanyPhone,U_CreditCustBirth,U_CreditBranch,U_CreditAddress,U_CreditEmail,U_CreditMobileTemp', '客戶金融端基本資料(舊)', 'ffffff15-74b6-cb90-5013-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_FinanceName,U_FinanceMobile,U_FinancePhone,U_FinanceHomePhone,U_FinanceCustBirth,U_FinanceAddress,U_FinanceNewsLetter,U_FinanceMobileTemp', '私人資訊', 'f3c1c46b-924d-44b7-9a2b-dc81f87986a9', null, 'FContactGroupName,FNickname,FLanguage,FBirthday,FAge,FBloodType,FMsn,FGender,FMarriage,FHobby,FEducationRecord,FHomeAddress,FHomePhone,FPrivateEmailAddress', '管理', '4b297eb1-4a93-42bc-abb7-c69e55b024b6', null, 'FCreateTime,FUpdateTime,FCreateUserId,FUpdateUserId,FCreateDepartmentId,FUpdateDepartmentId,FContactGroupId', '登入資訊', '42c45d31-305a-4d5d-8fd2-13c3bd1e13d8', null, 'FLoginAble,FLoginMail');

--TBB.UYearsbillmonth
update TsField set FTitle='+消費款/借方', FIsNewRow=0 where FId='178aa35b-cdc0-0001-5ef2-005056c00008';
update TsField set FTitle='+利息費用' where FId='178aa61d-3280-0001-5ef2-005056c00008';
update TsField set FTitle='=最低應繳' where FId='178aacfb-0420-0001-5ef2-005056c00008';
update TsField set FTitle='+累積最低' where FId='178aacef-8290-0001-5ef2-005056c00008';
update TsField set FTitle='-繳款/貸方' where FId='178aa326-13f0-0001-5ef2-005056c00008';
update TsField set FIsNewRow=1 where FId='178aaceb-db90-0001-5ef2-005056c00008';
update TsField set FTitle='+預借現金' where FId='178aa624-df40-0001-5ef2-005056c00008';
update TsField set FTitle='=應繳總額' where FId='178aac8f-b300-0001-5ef2-005056c00008';

delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31dbc20e0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31def35d0';

delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31dd51400';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31dd87e00';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31dddd4d0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31de2eb60';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31de62480';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31de940f0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31deba7d0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31df1d6a0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31df47400';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31df6efd0';
delete from TsFieldGridColumn where FId='0100c056-5000-7268-7c09-17a31dfa0290';

insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31dd87e00', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='卡別',     FKey='U_CardType',     FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31dd51400', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='卡號',     FKey='U_OCardNum',     FType='String',  FIndex=2,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31dddd4d0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='入帳日期', FKey='U_Creditdate',   FType='String',  FIndex=3,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31de940f0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='交易日期', FKey='U_Tradingdate',  FType='String',  FIndex=4,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31de2eb60', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='交易摘要', FKey='U_Tradingnote',  FType='String',  FIndex=5,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31df1d6a0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='國別',     FKey='U_Country',      FType='String',  FIndex=6,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31df47400', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='地區',     FKey='U_Area',         FType='String',  FIndex=7,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31df6efd0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='幣別',     FKey='U_Currency',     FType='String',  FIndex=8,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31dfa0290', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='外幣金額', FKey='U_Foreignmoney', FType='String',  FIndex=9,   FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31deba7d0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='交易代碼', FKey='U_Tradenum',     FType='String',  FIndex=10,  FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-7268-7c09-17a31def35d0', FFieldId='0100c056-5000-7268-7c09-17a31da176f0', FTitle='帳單金額', FKey='U_Billamount',   FType='String',  FIndex=11,  FControls='';

java setFormFields('1788cc62-8240-0001-5ef2-005056c00008', '基本資訊', '1788cc62-8240-1001-5ef2-005056c00008', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_ErrorCode2,U_ErrorMemo2,U_CardNum,U_Inquiry', '查詢結果', '178aae39-bba0-0001-5ef2-005056c00008', null, 'U_Grid,U_Prebalance,U_Paymentcredit,U_Consumptiondebit,U_Precash,U_Intexpense,U_Totalpay,U_Dispute,U_Actualpay,U_Periodpay,U_Minimum,U_Lowerpay,U_Cardcheckday,U_Days,U_Paydeadline,U_Grid2');

--TBB.XMLdoc
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='1788b669-f890-0001-5ef2-005056c00008';

--TBB.UNetBank
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='1788b59a-8c90-0001-5ef2-005056c00008';

delete from TsFieldGridColumn where FId='1788b5b9-4bb0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b5bd-5b90-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b5c0-89a0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b5f9-ac40-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b5fd-2590-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b600-1bc0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b604-0ca0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b607-43a0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b60c-2480-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b60f-b720-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b612-6b20-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b615-5e90-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788b618-1820-0001-5ef2-005056c00008';
insert into TsFieldGridColumn set FId='1788b5b9-4bb0-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='交易日期/時間',    FKey='U_DateAndTime',  FType='String', FIndex=1,  FControls='';
insert into TsFieldGridColumn set FId='1788b5bd-5b90-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='交易項目',         FKey='U_Item',         FType='String', FIndex=2,  FControls='';
insert into TsFieldGridColumn set FId='1788b5c0-89a0-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='資料一',           FKey='U_Data1',        FType='String', FIndex=3,  FControls='';
insert into TsFieldGridColumn set FId='1788b5f9-ac40-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='資料二',           FKey='U_Data2',        FType='String', FIndex=4,  FControls='';
insert into TsFieldGridColumn set FId='1788b5fd-2590-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='資料三',           FKey='U_Data3',        FType='String', FIndex=5,  FControls='';
insert into TsFieldGridColumn set FId='1788b600-1bc0-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='資料四',           FKey='U_Data4',        FType='String', FIndex=6,  FControls='';
insert into TsFieldGridColumn set FId='1788b604-0ca0-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='資料五',           FKey='U_Data5',        FType='String', FIndex=7,  FControls='';
insert into TsFieldGridColumn set FId='1788b60f-b720-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='線上約定轉入帳號', FKey='U_NetDepositAC', FType='String', FIndex=8,  FControls='';
insert into TsFieldGridColumn set FId='1788b615-5e90-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='語音帳號',         FKey='U_VoiceAC',      FType='String', FIndex=9,  FControls='';
insert into TsFieldGridColumn set FId='1788b618-1820-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='子公司統一編號',   FKey='U_RLUID',        FType='String', FIndex=10, FControls='';
insert into TsFieldGridColumn set FId='1788b612-6b20-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='網路服務鍵機行',   FKey='U_NetSev',       FType='String', FIndex=11, FControls='';
insert into TsFieldGridColumn set FId='1788b607-43a0-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='櫃員代號',         FKey='U_TellerNo',     FType='String', FIndex=12, FControls='';
insert into TsFieldGridColumn set FId='1788b60c-2480-0001-5ef2-005056c00008', FFieldId='1788b5a8-43c0-0001-5ef2-005056c00008', FTitle='主管代號',         FKey='U_DirecctorNo',  FType='String', FIndex=13, FControls='';

--TBB.EBankingInfo
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='ec9b8729-0c00-c076-4804-17a17bebda10';

--TBB.UCreditcardholder
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='1788c907-5740-0001-5ef2-005056c00008';

--TBB.UCUSYearsbillmonth
update TsUnit set FHomeClassName='com.chainsea.cus.ucusyearsbillmonth.UCUSYearsbillmonthHome', FDaoClassName='com.chainsea.cus.ucusyearsbillmonth.dao.impl.UCUSYearsbillmonthDaoImpl', FServiceClassName='com.chainsea.cus.ucusyearsbillmonth.service.impl.UCUSYearsbillmonthServiceImpl', FActionClassName='com.chainsea.cus.ucusyearsbillmonth.action.impl.UCUSYearsbillmonthActionImpl' where FId='2eda0929-0c00-832b-5c0c-17a138ac4b90';

update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='2eda0929-0c00-832b-5c0c-17a13a16f300';

insert into TsToolItem set FId='ec9b8729-0c00-ae27-9f0d-17bf18a1d580', FPageId='2eda0929-0c00-832b-5c0c-17a138ac91c0', FCode='ExcelExport', FName='匯出Excel', FHint=null, FLabel=null, FType='Button', FAlign='right', FIndex=1, FWidth=null, FIcon='quicksilver/image/16/Excel.png', FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null, FDictionaryId=null, FSubItemRoutine='', FVisibleCondition=null, FEnableCondition=null, FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='UCUSYearsbillmonthForm.doExcel()', FChartId=null;

java setFormFields('2eda0929-0c00-832b-5c0c-17a138ad0160', '基本資訊', '2eda0929-0c00-832b-5c0c-17a138ad04c0', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_ErrorCode2,U_ErrorMemo2,U_UID,U_Inquiry', '查詢結果', '17a13ada-7e80-0c5c-2b83-000c2909da2e', '2eda0929-0c00-832b-5c0c-17a138ad04c0', 'U_Grid,U_Prebalance,U_Paymentcredit,U_Consumptiondebit,U_Precash,U_Intexpense,U_Actualpay,U_Dispute,U_Actualpayment,U_Periodpay,U_Minimum,U_Lowerpay,U_Cardcheckday,U_Days,U_Paydeadline,U_Grid2');

--TBB.UVoiceBank
create table tpTBBEBankingInfoFormBUTypeDes (FEntityId uuid, FValue varchar(100));
create index IpTBBEBankingInfoFormBUTypeDes1 on tpTBBEBankingInfoFormBUTypeDes (FEntityId);
create index IpTBBEBankingInfoFormBUTypeDes2 on tpTBBEBankingInfoFormBUTypeDes (FEntityId, FValue);

update TsField set FUnitId='17887987-ef90-0001-5ef2-005056c00008', FName='U_BUTypeDesc',   FTitle='業務類別',                FType='MultiCheckBox',       FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId='177f2674-7ae0-04c3-1937-d8f2cab1cb50', FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable='tpTBBEBankingInfoFormBUTypeDes', FRelationCapacity=10,   FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='178879a1-f960-0001-5ef2-005056c00008';
update TsField set FUnitId='17887987-ef90-0001-5ef2-005056c00008', FName='U_BVoiceSev',    FTitle='原語音服務申請行',        FType='ComboBox-SelectOnly', FSize=20,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId='0ceaf66f-7545-4516-8cb1-710912a889dd', FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                             FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='178879ef-ae90-0001-5ef2-005056c00008';

--TBB.UVoiceHistory
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef4cf810';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef504730';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef52c590';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef552e70';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef574730';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef596b40';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef5b90b0';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef5d4c40';
delete from TsFieldGridColumn where FId='ec9b8729-0c00-387c-7f0b-17a0ef5f15c0';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef4cf810', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='交易日期/時間', FKey='U_DateAndTime', FType='String', FIndex=1, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef504730', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='業務類別',      FKey='U_BUTypeDesc',  FType='String', FIndex=2, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef52c590', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='行庫別',        FKey='U_BankNo',      FType='String', FIndex=3, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef552e70', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='轉帳帳號',      FKey='U_TransACNO',   FType='String', FIndex=4, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef574730', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='錯誤訊息',      FKey='U_ErrMsg',      FType='String', FIndex=5, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef596b40', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='掛失種類',      FKey='U_DisType',     FType='String', FIndex=6, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef5f15c0', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='鍵機分行別',    FKey='U_BRHCOD',      FType='String', FIndex=7, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef5b90b0', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='櫃員代號',      FKey='U_TellerNo',    FType='String', FIndex=8, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-387c-7f0b-17a0ef5d4c40', FFieldId='ec9b8729-0c00-387c-7f0b-17a0ef272fd0', FTitle='主管代號',      FKey='U_DirecctorNo', FType='String', FIndex=9, FControls='';

--TBB.UAccountList
update TsField set FTitle='帳號' where FId='1788c504-a170-0001-5ef2-005056c00008'; 

--TBBPassbookLoss
alter table tpTBBPassbookLoss alter column U_ACNO set data type varchar(16);
update TsField set FSize=16 where FId='17887762-8170-0001-5ef2-005056c00008';

--TBB.UCardrepaymentsettled
update TsField set FTitle='預計應收新增利息' where FId='2eda0929-0c00-1a0b-8d01-17a427eca090';
update TsField set FTitle='目前欠繳本金' where FId='2eda0929-0c00-1a0b-8d01-17a427d6b6f0';
update TsField set FIsNewRow=1 where FId='2eda0929-0c00-1a0b-8d01-17a427dfe110';
update TsField set FTitle='預計結清日期' where FId='2eda0929-0c00-9402-910b-17a4149c7200';
update TsField set FTitle='預計結清日期' where FId='2eda0929-0c00-9402-910b-17a41c30d020';

insert into TsField set FId='ec9b8729-0c00-fd7a-8703-17bfe55626c0', FUnitId='2eda0929-0c00-9402-910b-17a412cd4dc0', FName='U_Note1',               FTitle='備註事項1',          FType='Label',         FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,       FHint='1.結清繳款金額=目前欠繳本金+預借現金累積已計息+消費累積已計息+預計應收新增利息。',                   FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-fd7a-8703-17bfe5607800', FUnitId='2eda0929-0c00-9402-910b-17a412cd4dc0', FName='U_Note2',               FTitle='備註事項2',          FType='Label',         FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,       FHint='2.此表僅供試算參考，若有已授權未請款交易需自行加總，並留意是否有分期付款，且需告知客戶實際須以帳單金額為依據。', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-fd7a-8703-17bfe569e620', FUnitId='2eda0929-0c00-9402-910b-17a412cd4dc0', FName='U_Note3',               FTitle='備註事項3',          FType='Label',         FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,       FHint='3.此指令僅適用超過4日寬限期支客戶(未超過4日寬限期，不會產生利息)。',                                 FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-fd7a-8703-17bfe57195b0', FUnitId='2eda0929-0c00-9402-910b-17a412cd4dc0', FName='U_Note4',               FTitle='備註事項4',          FType='Label',         FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,       FHint='4.已超過寬限期，未繳足最低會產生違約金，試算金額需自行加上違約金；若未出帳明細有預借現金或是需要手續費的交易，需自行加上手續費用。', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-fd7a-8703-17bfe581b000', FUnitId='2eda0929-0c00-9402-910b-17a412cd4dc0', FName='U_Note5',               FTitle='備註事項5',          FType='Label',         FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,       FHint='5.預計應收新增利息=(預計結清日期-系統已累積計息日期)*每日利息。',                                    FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('2eda0929-0c00-9402-910b-17a412ce5a50', '基本資訊', '2eda0929-0c00-9402-910b-17a412ce5d90', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_CardNum,U_Nowdate,U_Inquiry', '查詢結果', '17a414bf-ee30-0b91-0294-000c2909da2e', '2eda0929-0c00-9402-910b-17a412ce5d90', 'U_Interestaccrualdate,U_Lastpatdate,U_Dailyinterest,U_Settlementdate,U_Balance,U_Cashadvanceint,U_Consumeint,U_ACCRUEDINTEREST,U_Settlepayment,U_Note1,U_Note2,U_Note3,U_Note4,U_Note5');
java setImportTemplateFields('2eda0929-0c00-9402-910b-17a412cd4dc0', 'FName,U_CardNum,U_Nowdate,U_Inquiry,U_Note1,U_Note2,U_Note3,U_Note4,U_Note5');

--TBB.07Register
update TsField set FIsNewRow=0 where FId='1788753a-28a0-0001-5ef2-005056c00008';
update TsField set FColSpan=1, FIsNewRow=0, FHint='說明僅限輸入14個字元' where FId='0100c056-5000-ee33-dc0b-179d629f7610';

--TBB.UDepositFlag
alter table tpTBBUDepositFlag alter column U_ACNO set data type varchar(16);

update TsField set FSize=16 where FId='17887278-ad40-0001-5ef2-005056c00008';
update TsField set FIsNewRow=0 where FId='178872b7-c100-0001-5ef2-005056c00008';
update TsField set FIsNewRow=0 where FId='178872be-85f0-0001-5ef2-005056c00008';

insert into TsField set FId='ec9b8729-0c00-bf56-a001-17c06741e260', FUnitId='17887266-f300-0001-5ef2-005056c00008', FName='U_Note',        FTitle='備註',                 FType='Label',               FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='虛擬帳號說明：
<p>虛擬帳號「登錄107-29」同時對虛擬帳號設定終止存提註記及其應對之實體帳號登錄圈存金額。
<p>虛擬帳號「圈存107-07」對虛擬帳號對應之實體帳號登錄圈存金額。
<p>虛擬帳號「解圈107-57」對虛擬帳號對應之實體帳號執行解圈作業。', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('17887267-21f0-0001-5ef2-005056c00008', '基本資訊', '17887267-21f0-1001-5ef2-005056c00008', null, 'U_ACNO,U_ACType,U_Button,U_Result,U_RegType,U_Mark,U_Amount,U_RegDT,U_RegTellerNo,U_SeqNo,U_Note');
