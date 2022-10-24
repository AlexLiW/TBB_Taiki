--Emma----------------------------------------------------------------

--TBB.57Register解圈登錄作業----------------------------------------------------------------
--查詢結果欄位新增/補充資料/、/鍵機行/及順序更動

update TsFieldGridColumn set FIndex=1 where FId='17887633-1490-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=2 where FId='17887646-0120-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=3 where FId='17887649-2d20-0001-5ef2-005056c00008';
insert into TsFieldGridColumn set FId='d2b80c29-0c00-e112-8208-17f4e88241a0', FFieldId='17887623-57e0-0001-5ef2-005056c00008', FTitle='補充資料',     FKey='U_MEMO',       FType='String',  FIndex=4, FControls='';
update TsFieldGridColumn set FIndex=5 where FId='1788763d-b8a0-0001-5ef2-005056c00008';
insert into TsFieldGridColumn set FId='d2b80c29-0c00-e112-8208-17f4e888e0d0', FFieldId='17887623-57e0-0001-5ef2-005056c00008', FTitle='鍵機行',       FKey='U_EVTBRH',     FType='String',  FIndex=6, FControls='';
update TsFieldGridColumn set FIndex=7 where FId='0100c056-5000-765d-6003-179c69572fb0';

--/TBB.57Register解圈登錄作業----------------------------------------------------------------

--TBB.UENetBankRL企業網路銀行關係戶資料檔---------------------------------------------------------------
--新增/網路服務鍵機行/欄位、/狀態碼/欄位
alter table tpTBBUENetBankRL add column U_RLUIDView varchar(20);
insert into TsField set FId='ac5d512f-4f08-4bd9-a2cc-2893f836f194', FUnitId='1788c0bd-7390-0001-5ef2-005056c00008', FName='U_NetSev',       FTitle='網路服務鍵機行',                       FType='InputBox-Text', FSize=20,     FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,  FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

alter table tpTBBUENetBankRL add column U_StatusCode varchar(5);
insert into TsField set FId='d2b80c29-0c00-ab2f-9b04-17f72d9f8370', FUnitId='1788c0bd-7390-0001-5ef2-005056c00008', FName='U_StatusCode',   FTitle='狀態碼',                               FType='InputBox-Text', FSize=5,      FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,  FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
java setFormFields('1788c0bd-9910-1001-5ef2-005056c00008', '企業網路銀行關係戶資料檔', '1788c0bd-9910-2001-5ef2-005056c00008', null, 'U_UID,U_Inquiry', '查詢結果', '1788c184-79c0-0001-5ef2-005056c00008', '1788c0bd-9910-2001-5ef2-005056c00008', 'U_Grid', '企業網路銀行關係戶轉帳約定資料檔', '17ddbb62-e340-06fb-124b-005056c00008', '1788c0bd-9910-2001-5ef2-005056c00008', 'U_RLUIDView,U_Grid3', '企業網路銀行關係戶連結檔', '17ddbd0b-f920-06fb-124b-005056c00008', null, 'U_RLUID,U_Inquiry3', '企業網路銀行關係戶連結檔', '17ddbda9-e0c0-06fb-124b-005056c00008', '17ddbd0b-f920-06fb-124b-005056c00008', 'U_CompanyID,U_ApplyTransDT,U_RLTransDT,U_StatusCode,U_NetSev,U_LastApplyDT,U_IsEmail,U_ChgEmailDT,U_EStatement');

--/TBB.UENetBankRL---------------------------------------------------------------

--TBB.UENetBankRLTrans企業網路銀行關係戶轉帳約定資料檔----------------------------------------------------------
--查詢結果網格順序調整
update TsFieldGridColumn set FIndex=1 where FId='1788c1f5-5c40-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=2 where FId='1788c1f8-7a90-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=3 where FId='1788c1fb-a2a0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=4 where FId='1788c1fe-8290-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=5 where FId='1788c201-1530-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=6 where FId='1788c204-3720-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=7 where FId='1788c20c-7010-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=8 where FId='1788c227-bca0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=9 where FId='1788c220-3390-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=10 where FId='1788c222-c380-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=11 where FId='1788c21d-b420-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=12 where FId='1788c209-a940-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=13 where FId='1788c20f-0390-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=14 where FId='1788c211-74a0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=15 where FId='1788c213-d090-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=16 where FId='1788c216-0710-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=17 where FId='1788c218-89a0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=18 where FId='1788c21b-5a90-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=19 where FId='1788c225-3200-0001-5ef2-005056c00008';
--/TBB.UENetBankRLTrans企業網路銀行關係戶轉帳約定資料檔----------------------------------------------------------

--TBB.DepositDetail存款明細查詢-------------------------------------------------------------
--輸出區改為查詢結果
java setFormFields('178878bf-90b0-0001-5ef2-005056c00008', '基本資訊', '178878bf-90c0-0001-5ef2-005056c00008', null, 'U_ACNO,U_Inquiry,U_Time,U_StartDT,U_EndDT', '查詢結果', '1788795a-6920-0001-5ef2-005056c00008', null, 'U_Grid');
--/TBB.DepositDetail存款明細查詢-------------------------------------------------------------

--TBB.EBankingInfo網銀主檔--------------------------------------------------------------
--更換欄位位置
java setFormFields('ec9b8729-0c00-c076-4804-17a17bd100f0', '基本資訊', 'ec9b8729-0c00-c076-4804-17a17bd103a0', null, 'U_UID,U_CQ13Button', '網路銀行轉帳主檔', '17a17c05-4740-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_IDNCOD,U_OPCODE,U_PASCODE,U_USERID,U_UIDSTC,U_UIDCNT,U_STSCOD1_CQ13,U_CNTNBW1,U_SETNBP1,U_STSCOD2_CQ13,U_CNTNBW2,U_SETNBP2,U_LOGINDTM,U_PWDDTTM,U_CHGPWDT,U_DATAPL,U_DATDLT,U_CHEERER,U_APLBRH,U_BRHTMP,U_SNHKEY,U_TYPE,U_APLCODB,U_APLCODA,U_TRAACN,U_CNMARK,U_CORFLAG,U_IsEmail,U_CHGMAIL,U_E_BILL,U_TSFCNT,U_UPDFLG,U_SECCODE,U_CQ14Button,U_CQ15Button', '網路銀行轉帳延伸檔', '17a17ec9-8990-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_Grid', '行動銀行快速登入記錄檔', '17a180e0-8320-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_QKLINDTTM,U_QLGIDT,U_QCKSTAT,U_QTRNDT,U_QTRSTAT,U_MOBYN,U_QSMLDT,U_QSMSTAT,U_MOBCODE,U_BIOME,U_VERYN,U_MOBDATE,U_VERTYPE,U_VERNUM1,U_VERDATE1,U_STSCOD1,U_VERNUM2,U_VERDATE2,U_STSCOD2,U_VERNUM3,U_VERDATE3,U_STSCOD3,U_VERNUM4,U_VERDATE4,U_STSCOD4,U_VERNUM5,U_VERDATE5,U_STSCOD5,U_VERNUM6,U_VERDATE6,U_STSCOD6,U_VERNUM7,U_VERDATE7,U_STSCOD7,U_VERNUM8,U_VERDATE8,U_STSCOD8');

--/TBB.EBankingInfo網銀主檔--------------------------------------------------------------

--TBB.m12113A業務諮詢轉介單-------------------------------------------------------------------
--清除保存按鈕的可用條件內容
update TsToolItem set FEnableCondition='' where FId='00214044-6c07-44a7-aa4e-9b9009c5d91a';
--/TBB.m12113A業務諮詢轉介單-------------------------------------------------------------------

--TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------
--分組[輸出區]改為查詢結果
java setFormFields('1788769c-5ae0-0001-5ef2-005056c00008', '基本資訊', '1788769c-5ae0-1001-5ef2-005056c00008', null, 'U_Hint,U_ACNO,U_StartDT,U_EndDT,U_Button', '查詢結果', '17887737-f700-0001-5ef2-005056c00008', null, 'U_Grid', '管理', '17d8e8a6-ded0-1da6-6ab9-005056c00008', null, 'FCreateUserId,FCreateTime,FUserId');
--/TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------

--/Emma----------------------------------------------------------------


--Emily----------------------------------------------------------------

--TBB.UYearsbillmonth-----------------------------------------------------------

update TsField set FTitle='+預借/其他' where FId='178aa624-df40-0001-5ef2-005056c00008';

--/TBB.UYearsbillmonth-----------------------------------------------------------


--TBB.UCUSYearsbillmonth--------------------------------------------------------

update TsField set FTitle='+預借/其他' where FId='2eda0929-0c00-832b-5c0c-17a13b04cb60';

--/TBB.UCUSYearsbillmonth--------------------------------------------------------


--TBB.UAccountTradeDetail-------------------------------------------------------

java setFormFields('1788769c-5ae0-0001-5ef2-005056c00008', '基本資訊', '1788769c-5ae0-1001-5ef2-005056c00008', null, 'U_Hint,U_ACNO,U_StartDT,U_EndDT,U_Button', '查詢結果', '17887737-f700-0001-5ef2-005056c00008', null, 'U_Grid', '管理', '17d8e8a6-ded0-1da6-6ab9-005056c00008', null, 'FCreateUserId,FCreateTime,FUserId');

--/TBB.UAccountTradeDetail-------------------------------------------------------


--/Emily----------------------------------------------------------------






