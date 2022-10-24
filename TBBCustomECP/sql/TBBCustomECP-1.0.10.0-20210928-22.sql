--TBB.UFDepositDetail
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='17887861-e190-0001-5ef2-005056c00008';

insert into TsField set FId='ec9b8729-0c00-d84d-160b-17c1165a6aa0', FUnitId='17887849-c130-0001-5ef2-005056c00008', FName='U_Total',  FTitle='總金額筆數',                     FType='Label',               FSize=null,  FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='總筆數，總金額。',                                                                                   FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

delete from TsFieldGridColumn where FId='17887878-2490-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788787c-5100-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788787f-3500-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887882-6f80-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887885-90f0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887888-cf00-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788788c-21f0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788788f-0b80-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887892-1710-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887895-3210-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='17887897-c280-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788789a-08f0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788789c-9e70-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788789f-b880-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='178878a3-5a90-0001-5ef2-005056c00008';

insert into TsFieldGridColumn set FId='ec9b8729-0c00-d84d-160b-17c1123f0520', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='項目',             FKey='U_No',          FType='String', FIndex=1,  FControls='';
insert into TsFieldGridColumn set FId='17887878-2490-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='帳號',             FKey='U_ACNO',        FType='String', FIndex=2,  FControls='';
insert into TsFieldGridColumn set FId='1788787c-5100-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='帳戶管理分行',     FKey='U_ACMgrBch',    FType='String', FIndex=3,  FControls='';
insert into TsFieldGridColumn set FId='1788787f-3500-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='存單種類',         FKey='U_NCDType',     FType='String', FIndex=4,  FControls='';
insert into TsFieldGridColumn set FId='17887882-6f80-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='存單號碼',         FKey='U_NCDNo',       FType='String', FIndex=5,  FControls='';
insert into TsFieldGridColumn set FId='17887885-90f0-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='存單金額',         FKey='U_NCDAMT',      FType='Float',  FIndex=6,  FControls='';
insert into TsFieldGridColumn set FId='17887888-cf00-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='存款期別',         FKey='U_NCDRg',       FType='String', FIndex=7,  FControls='';
insert into TsFieldGridColumn set FId='1788788c-21f0-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='利率%',            FKey='U_Rate',        FType='String', FIndex=8,  FControls='';
insert into TsFieldGridColumn set FId='1788788f-0b80-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='計息方式',         FKey='U_RateType',    FType='String', FIndex=9,  FControls='';
insert into TsFieldGridColumn set FId='17887892-1710-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='起存日',           FKey='U_StartDT',     FType='String', FIndex=10, FControls='';
insert into TsFieldGridColumn set FId='17887895-3210-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='到期日',           FKey='U_EndDT',       FType='String', FIndex=11, FControls='';
insert into TsFieldGridColumn set FId='17887897-c280-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='利息轉入帳號',     FKey='U_RateDepAC',   FType='String', FIndex=12, FControls='';
insert into TsFieldGridColumn set FId='1788789a-08f0-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='自動轉期已轉次數', FKey='U_AutoTime',    FType='String', FIndex=13, FControls='';
insert into TsFieldGridColumn set FId='1788789c-9e70-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='自動轉期未轉次數', FKey='U_AutoNonTime', FType='String', FIndex=14, FControls='';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-eb2c-df0f-17c251c6b1a0', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='轉期方式',         FKey='U_AutoType',    FType='String', FIndex=15, FControls='';
insert into TsFieldGridColumn set FId='1788789f-b880-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='申請不轉期',       FKey='U_ApplyNAuto',  FType='String', FIndex=16, FControls='';
insert into TsFieldGridColumn set FId='178878a3-5a90-0001-5ef2-005056c00008', FFieldId='17887872-6730-0001-5ef2-005056c00008', FTitle='是否質借',         FKey='U_FLAG1',       FType='String', FIndex=17, FControls='';

java setFormFields('17887849-e3a0-0001-5ef2-005056c00008', '基本資訊', '17887849-e3a0-1001-5ef2-005056c00008', null, 'U_Type,U_Button,U_UID,U_ACNO', '查詢結果', '178878aa-e570-0001-5ef2-005056c00008', null, 'U_Hint,U_Grid,U_Total');

--TBB.m12112A
update TsToolItem set FDefaultEventHandler='var customer = form.getFieldValue("F_CustomerIdfiy");
if (customer == 1) {
    // Info.doCsrQuery("TVO2MBBT");
    m12112A.doS601();
}
else if (customer == 0) {
    // Info.doCsrQuery("NB01");
    TBBUtil.doInfoPost();
}' where FId='f8b458c4-0c19-43e1-84d6-93fddf518f32';

--TBB.m12113A
update TsField set FUnitId='f21e8cd4-7419-400a-8fa0-f3cfa8cb331d', FName='F_Branch',            FTitle='往來分行',                FType='InputBox-Text',       FSize=5,     FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,                                   FHint='',   FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,          FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='00bf2884-6402-44ed-a3ce-5423f8ab64d4';

update TsToolItem set FDefaultEventHandler='var customer = form.getFieldValue("F_Status");
if (customer == 1) {
    // Info.doCsrQuery("TVO2MBBT");
    m12113A.doS601();
}
else if (customer == 0) {
    // Info.doCsrQuery("NB01");
    TBBUtil.doInfoPost();
}' where FId='13e516b6-55fa-464d-8016-f9fb87808a5d';

--TBB.UVoiceBank
update TsField set FDictionaryId='0800c056-5000-f40d-c207-17c0b9154140' where FId='178879ef-ae90-0001-5ef2-005056c00008';

--Ecp.Contact
alter table TcContact alter column U_Note set data type varchar(100);

update TsField set FSize=100, FColSpan=3 where FId='0100c056-5000-5106-a602-17a5aef01d00';
update TsField set FType='InputBox-Text', FRowSpan=1 where FId='0100c056-5000-5106-a602-17a5aeb2d0b0';
update TsField set FType='InputBox-Text', FRowSpan=1 where FId='0100c056-5000-5106-a602-17a5aea286e0';
update TsField set FType='InputBox-Text', FRowSpan=1 where FId='0100c056-5000-5106-a602-17a5aea93140';

java setFormFields('4f650a4a-571a-4847-8a69-f4bcb7cc27ed', '基本資訊', '1f74ce45-c0b8-427c-9d31-67b558224e74', null, 'U_CustName,U_CustID,FTitle,U_Dialogue,FBusinessPhone,FDialFeature,U_CustCharact', '常用交易', '1799d8dd-0350-07e3-6f21-000c29879bec', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UAccountListBTN,U_UCreditcardholderBTN,U_EBankingInfoBTN,U_UNetBankDepACNOBTN,U_XMLdocBTN', '信用卡客戶基本資料檔', '17a5b822-1df0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CName,U_Ename,U_Birthday1,U_Homephone,U_Cellphone,U_Companyphone,U_ZIP,U_Bill,U_Accountcategory,U_Domicile,U_Residence,U_Companyaddress,U_Cusserviceunit,U_Custitle,U_Annualincome,U_CENSU,U_AcceptDM,U_Gender,U_Nationality,U_Guarantor,U_Note,U_Billdate,U_Maintaindate', '銀行客戶基本資料檔', '17a5b822-1e70-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UserName,U_Birthday2,U_Birthday,U_Address1,U_Address2,U_Phone,U_Phone2,U_IsEBank,U_Moblie,U_EMAIL,U_IsVoiceBank', '銀行客戶區別資料檔', '17a5b822-1ee0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_Career,U_Title,U_DisFlag,U_RiskLev', '銀行客戶帳戶明細', '17a5b826-f200-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_ACNO,U_SCUFLG,U_BRHACC,U_IBHPWD,U_OpenDT,U_SettleDT,U_AMTICHD,U_ODFMG,U_TDYOFMX,U_ODFBAL,U_RETURN,U_RETMARK,U_REFUSE,U_RETURN2,U_RETMARK2,U_RELEASE', '其他', 'ffffff15-74b6-cb90-501b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'FNote', '客戶信用卡基本資料(舊)', 'ffffff15-74b6-cb90-500b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CreditName,U_CreditMobile,U_CreditPhone,U_CreditHomePhone,U_CreditCompanyPhone,U_CreditCustBirth,U_CreditBranch,U_CreditAddress,U_CreditEmail,U_CreditMobileTemp', '客戶金融端基本資料(舊)', 'ffffff15-74b6-cb90-5013-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_FinanceName,U_FinanceMobile,U_FinancePhone,U_FinanceHomePhone,U_FinanceCustBirth,U_FinanceAddress,U_FinanceNewsLetter,U_FinanceMobileTemp', '私人資訊', 'f3c1c46b-924d-44b7-9a2b-dc81f87986a9', null, 'FContactGroupName,FNickname,FLanguage,FBirthday,FAge,FBloodType,FMsn,FGender,FMarriage,FHobby,FEducationRecord,FHomeAddress,FHomePhone,FPrivateEmailAddress', '管理', '4b297eb1-4a93-42bc-abb7-c69e55b024b6', null, 'FCreateTime,FUpdateTime,FCreateUserId,FUpdateUserId,FCreateDepartmentId,FUpdateDepartmentId,FContactGroupId', '登入資訊', '42c45d31-305a-4d5d-8fd2-13c3bd1e13d8', null, 'FLoginAble,FLoginMail');

--TBB.UCreditcardholder
alter table tpUCreditcardholder alter column U_ErrorMemo set data type varchar(50);
update TsField set FSize=50 where FId='0100c056-5000-5c46-050f-179f8a97eb10';

--TBB.UCUSYearsbillmonth
alter table tpTBBUCUSYearsbillmonth alter column U_ErrorMemo set data type varchar(50);
alter table tpTBBUCUSYearsbillmonth alter column U_ErrorMemo2 set data type varchar(50);
update TsField set FSize=50 where FId='2eda0929-0c00-832b-5c0c-17a13a0145e0';
update TsField set FSize=50 where FId='2eda0929-0c00-832b-5c0c-17a13a101b60';

--TBB.UVoiceBankTrans
insert into TsFieldGridColumn set FId='ec9b8729-0c00-eb2c-df0f-17c25fd14d00', FFieldId='17887a53-4ad0-0001-5ef2-005056c00008', FTitle='鍵機分行別',   FKey='U_BRHCOD',       FType='String', FIndex=8, FControls='';

--TBB.UHistoricalpayment
alter table tpTBBUCUSYearsbillmonth add U_Currdue varchar(30);
alter table tpTBBUCUSYearsbillmonth alter column U_ErrorMemo set data type varchar(50);

update TsField set FSize=50 where FId='0100c056-5000-5c46-050f-179f924559b0';
update TsField set FTitle='累計欠繳最低應繳額(當期帳單累積最低應繳金額)' where FId='1788c970-3d40-0001-5ef2-005056c00008';

insert into TsField set FId='ec9b8729-0c00-eb2c-df0f-17c268327180', FUnitId='1788c952-3b30-0001-5ef2-005056c00008', FName='U_Currdue',              FTitle='已超過繳款截止日，未繳足本期最低應繳金額',     FType='InputBox-Text', FSize=30,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=2, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,   FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('1788c952-5dd0-0001-5ef2-005056c00008', '基本資訊', '1788c952-5dd0-1001-5ef2-005056c00008', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_CardNum,U_Inquiry', '輸出區', '1788ca31-9a30-1001-5ef2-005056c00008', null, 'U_CardType,U_Recentcreditdate,U_Recentcredit,U_Recentlenddate,U_Recentlend,U_Recentpaydate,U_Recentpayamount,U_Maxbilldate,U_Maxbill,U_Creditsdate,U_Credits,U_Lastquotadate,U_Lastcredits,U_Payexpired,U_Currdue,U_Arrearslowpayable,U_Arrearstimes,U_Arrears30lowpayable,U_Arrears30times,U_Arrears60lowpayable,U_Arrears60times,U_Arrears90lowpayable,U_Arrears90times,U_Arrears120lowpayable,U_Arrears120times,U_Arrears150lowpayable,U_Arrears150times,U_Arrears180lowpayable,U_Arrears180times,U_Arrears210lowpayable,U_Arrears210times');

--TBB.UDebitLoss
update TsToolItem set FName='掛失金融端' where FId='dc207da1-9fe6-4df6-b05d-ab8c1c834e0e';