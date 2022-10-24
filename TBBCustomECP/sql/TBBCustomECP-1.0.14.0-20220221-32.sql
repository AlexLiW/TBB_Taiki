-------------------金融卡發卡主檔---------------------------
ALTER TABLE tpTBBUATMCardDetail ADD U_A007Grid varchar(100000);

insert into TsField set FId='0800c056-5000-df39-160c-17e5769c3900', FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_A007Grid',      FTitle='附屬帳號',                     FType='Grid',                FSize=100000, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=2, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0800c056-5000-df39-160c-17e57683dcf0', FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_Inquiry5',      FTitle='附屬帳號查詢',                 FType='Button',              FSize=null,   FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='附屬帳號查詢',                FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

update TsField set FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_PACNO',         FTitle='附屬帳號個數',                 FType='InputBox-Text',       FSize=10,     FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='2eda0929-0c00-e960-be0e-179efa7f4710';

insert into TsFieldGridColumn set FId='2eda0929-0c00-7463-a90b-17ee29ff7080', FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='卡別',                  FKey='U_OMMACARD',   FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='2eda0929-0c00-7463-a90b-17ee29ef3ac0', FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='信用卡卡號',            FKey='U_OCARDNO',    FType='String',  FIndex=2,   FControls='';
insert into TsFieldGridColumn set FId='0800c056-5000-df39-160c-17e576a53d60', FFieldId='0800c056-5000-df39-160c-17e5769c3900', FTitle='附屬帳號',              FKey='U_TGACN',      FType='String',  FIndex=626, FControls='';

update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='悠遊卡外顯卡號',        FKey='U_OSAMDKEY',   FType='String',  FIndex=3,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd19fe80';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='可否第三方行銷',        FKey='U_OSALEYON',   FType='String',  FIndex=7,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd1ff440';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='分行啟用之櫃員代號',    FKey='U_OTLRUSE',    FType='String',  FIndex=6,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd23fef0';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='分行掛失/註銷日期時間', FKey='U_ODATCNL',    FType='String',  FIndex=4,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd28ce40';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='客服電話掛失日期時間',  FKey='U_ODATLST',    FType='String',  FIndex=5,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd2e2b20';


java setFormFields('2eda0929-0c00-8f3a-bb07-179eabb77e80', '基本資訊', '2eda0929-0c00-8f3a-bb07-179eabb780d0', null, 'U_ACNO,U_Inquiry', '查詢結果', '179ef7f4-2980-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_FUserId,U_UID,U_PHPW,U_Status,U_CardNo,U_CardNum,U_IsApplyNoDep,U_IsApplyTrans,U_SABCOD,U_CARDNO_2,U_ApplyInDraw,U_AOPLMT,U_AODLMT,U_PINCNT,U_TRINCT,U_ABAVCT,U_ABAVCTX,U_MEGECT,U_ABUSCT,U_ABUSCTX,U_EndYM,U_GRPCOD,U_VSEXPYM,U_VSDBYN,U_SMART,U_ABKEYTP,U_BRHACC,U_PACNO,U_Inquiry5,U_A007Grid,U_Inquiry3,U_Inquiry2,U_Inquiry4,U_Result,U_ResultExplain', '金融卡發卡歷史查詢', '179efcde-5f90-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A011Grid', '金融卡發卡明細檔', '179efd07-bda0-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A012Grid');

update TsField set FTitle='跨提已享免付手續費次數' where FId='2eda0929-0c00-e960-be0e-179ef8fca2b0';
update TsField set FIsNewRow=0 where FId='2eda0929-0c00-e960-be0e-179efa411ec0';
update TsField set FIsNewRow=1 where FId='2eda0929-0c00-e960-be0e-179efa935b40';
update TsField set FIsNewRow=0 where FId='2eda0929-0c00-e960-be0e-179efd4e4f30';
update TsField set FTitle='簽帳卡暫停刷卡註記', FType='InputBox-Text', FDictionaryId=null where FId='2eda0929-0c00-e960-be0e-179efa6e2eb0';

insert into TsFieldGridColumn set FId='2eda0929-0c00-7463-a90b-17ee29ff7080', FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='卡別',                  FKey='U_OMMACARD',   FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='2eda0929-0c00-7463-a90b-17ee29ef3ac0', FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='信用卡卡號',            FKey='U_OCARDNO',    FType='String',  FIndex=2,   FControls='';

update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='悠遊卡外顯卡號',        FKey='U_OSAMDKEY',   FType='String',  FIndex=3,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd19fe80';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='可否第三方行銷',        FKey='U_OSALEYON',   FType='String',  FIndex=7,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd1ff440';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='分行啟用之櫃員代號',    FKey='U_OTLRUSE',    FType='String',  FIndex=6,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd23fef0';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='分行掛失/註銷日期時間', FKey='U_ODATCNL',    FType='String',  FIndex=4,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd28ce40';
update TsFieldGridColumn set  FFieldId='2eda0929-0c00-e960-be0e-179efd148a70', FTitle='客服電話掛失日期時間',  FKey='U_ODATLST',    FType='String',  FIndex=5,   FControls='' where FId='2eda0929-0c00-e960-be0e-179efd2e2b20';
update TsFieldGridColumn set  FFieldId='0800c056-5000-df39-160c-17e5769c3900', FTitle='附屬帳號',              FKey='U_TGACN',      FType='String',  FIndex=626, FControls='' where FId='0800c056-5000-df39-160c-17e576a53d60';

java setFormFields('2eda0929-0c00-8f3a-bb07-179eabb77e80', '基本資訊', '2eda0929-0c00-8f3a-bb07-179eabb780d0', null, 'U_ACNO,U_Inquiry', '查詢結果', '179ef7f4-2980-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_FUserId,U_UID,U_PHPW,U_Status,U_CardNo,U_CardNum,U_IsApplyNoDep,U_IsApplyTrans,U_SABCOD,U_CARDNO_2,U_ApplyInDraw,U_AOPLMT,U_AODLMT,U_TRINCT,U_GRPCOD,U_EndYM,U_ABAVCT,U_ABAVCTX,U_MEGECT,U_ABUSCT,U_ABUSCTX,U_PINCNT,U_VSEXPYM,U_VSDBYN,U_SMART,U_ABKEYTP,U_BRHACC,U_PACNO,U_Inquiry5,U_A007Grid,U_Inquiry2,U_Inquiry4,U_Inquiry3,U_Result,U_ResultExplain', '金融卡發卡歷史查詢', '179efcde-5f90-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A011Grid', '金融卡發卡明細檔', '179efd07-bda0-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A012Grid');



--TBB.m1211BA-------------------------------------------------------------------
update TsField set FRequired=0 where FId='00a354eb-0b36-47f0-80f7-87c250162b3c';
update TsField set FRequired=0 where FId='9cf76526-42d8-455a-b831-27b2c04f12f2';
update TsField set FRequired=0 where FId='088690be-1a8b-47ee-a137-281f99d9c667';
--/TBB.m1211BA-------------------------------------------------------------------



--TBB.DepositDetail存款明細查詢-------------------------------------------------------------
update TsFieldGridColumn set  FIndex=12 where FId='17887948-ff80-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FIndex=10 where FId='1788794c-35f0-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FIndex=11 where FId='1788794e-ac80-0001-5ef2-005056c00008';
insert into TsScript set FId='2eda0929-0c00-0664-3a06-17efc1c8c970', FIndex=3, FPageId='178878bf-7f60-0001-5ef2-005056c00008', FUrl='custom/tbb/page/js/Common.js';


--/TBB.DepositDetail存款明細查詢-------------------------------------------------------------

--TBB.PassbookLoss事故交易查詢--------------------------------------------------------------
update TsUnit set FCode='TBB.PassbookLoss' where FId='1788775d-7440-0001-5ef2-005056c00008';
update TsPage set  FCode='TBB.PassbookLoss.List'       where FId='1788775d-8810-0001-5ef2-005056c00008';
update TsPage set  FCode='TBB.PassbookLoss.SelectList' where FId='1788775d-8830-2001-5ef2-005056c00008';
update TsPage set  FCode='TBB.PassbookLoss.Form'       where FId='1788775d-87a0-0001-5ef2-005056c00008';

--/TBB.PassbookLoss事故交易查詢--------------------------------------------------------------

--TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------
insert into TsScript set FId='2eda0929-0c00-a21c-2e0d-17eddc246ab0', FIndex=3, FPageId='1788769c-4870-0001-5ef2-005056c00008', FUrl='custom/tbb/page/js/Common.js';

--/TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------

--TBB.UDebitLoss金融端掛失----------------------------------------------------------------
update TsField set FReadOnly = 0 where FId = '0100C056-5000-807A-0408-17C444271770'
--/TBB.UDebitLoss金融端掛失----------------------------------------------------------------

--TBB.m12113A-----------------------------------------------
update TsToolItem set FEnableCondition=null where FId='00214044-6c07-44a7-aa4e-9b9009c5d91a';
--/TBB.m12113A-----------------------------------------------



--TBB.EBankingInfo網銀主檔--------------------------------------------------------------
java setFormFields('ec9b8729-0c00-c076-4804-17a17bd100f0', '基本資訊', 'ec9b8729-0c00-c076-4804-17a17bd103a0', null, 'U_UID,U_CQ13Button', '網路銀行轉帳主檔', '17a17c05-4740-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_IDNCOD,U_OPCODE,U_PASCODE,U_USERID,U_UIDSTC,U_UIDCNT,U_STSCOD1_CQ13,U_CNTNBW1,U_SETNBP1,U_STSCOD2_CQ13,U_CNTNBW2,U_SETNBP2,U_LOGINDTM,U_PWDDTTM,U_CHGPWDT,U_DATAPL,U_DATDLT,U_CHEERER,U_APLBRH,U_BRHTMP,U_SNHKEY,U_TYPE,U_APLCODB,U_APLCODA,U_TRAACN,U_CNMARK,U_CORFLAG,U_IsEmail,U_CHGMAIL,U_E_BILL,U_TSFCNT,U_UPDFLG,U_SECCODE,U_CQ14Button,U_CQ15Button', '網路銀行轉帳延伸檔', '17a17ec9-8990-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_Grid', '行動銀行快速登入記錄檔', '17a180e0-8320-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_QKLINDTTM,U_QLGIDT,U_QCKSTAT,U_QTRNDT,U_QTRSTAT,U_MOBYN,U_QSMLDT,U_QSMSTAT,U_MOBCODE,U_MOBDATE,U_BIOME,U_VERYN,U_VERTYPE,U_VERNUM1,U_VERDATE1,U_STSCOD1,U_VERNUM2,U_VERDATE2,U_STSCOD2,U_VERNUM3,U_VERDATE3,U_STSCOD3,U_VERNUM4,U_VERDATE4,U_STSCOD4,U_VERNUM5,U_VERDATE5,U_STSCOD5,U_VERNUM6,U_VERDATE6,U_STSCOD6,U_VERNUM7,U_VERDATE7,U_STSCOD7,U_VERNUM8,U_VERDATE8,U_STSCOD8');
--/TBB.EBankingInfo網銀主檔--------------------------------------------------------------
