--TBB.EBankingInfo--------------------------------------------------------------
update TsField set FTitle='使用者代號錯誤次數', FType='ComboBox-SelectOnly', FDictionaryId='177f6b2d-f1f0-0f8c-40b2-9201392884ce' where FId='ec9b8729-0c00-c076-4804-17a17d420d10';

UPDATE TsField set FType='ComboBox-SelectOnly',FDictionaryId='177f6b09-4650-0f8c-40b2-9201392884ce' where FId='ec9b8729-0c00-c076-4804-17a17d38bcc0';
--/TBB.EBankingInfo--------------------------------------------------------------



--TBB.UNetBankDepACNO-----------------------------------------------------------
alter table tpTBBUNetBankDepACNO ADD U_OtherGrid varchar(10000);

insert into TsField set FId='c5cfcd29-0c00-431c-dd02-17c252140190', FUnitId='1788c01e-8b60-0001-5ef2-005056c00008', FName='U_OtherGrid', FTitle='其他資訊',                       FType='Grid',          FSize=10000, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

delete from TsFieldGridColumn where FId='1788c04d-ba40-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c050-aa30-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c053-49a0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c056-4d20-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c058-f520-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c05b-9520-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c05e-1730-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c064-f7b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c067-c610-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c06a-8aa0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c06d-30a0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c06f-df30-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c073-b130-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c076-c220-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c078-fd30-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c07b-94b0-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c07e-4d30-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c081-0320-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c084-2520-0001-5ef2-005056c00008';
delete from TsFieldGridColumn where FId='1788c087-0830-0001-5ef2-005056c00008';

insert into TsFieldGridColumn set FId='1788c04d-ba40-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='行庫別',                  FKey='U_BankNo',        FType='String',  FIndex=1,   FControls='';
insert into TsFieldGridColumn set FId='1788c050-aa30-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='轉帳帳號',                FKey='U_TransACNO',     FType='String',  FIndex=2,   FControls='';
insert into TsFieldGridColumn set FId='1788c053-49a0-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='業務類別',                FKey='U_BUTypeDesc',    FType='String',  FIndex=3,   FControls='';
insert into TsFieldGridColumn set FId='1788c056-4d20-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='狀態碼',                  FKey='U_StatusCode',    FType='String',  FIndex=4,   FControls='';
insert into TsFieldGridColumn set FId='1788c058-f520-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='轉帳申請日期',            FKey='U_ApplyTransDT',  FType='String',  FIndex=5,   FControls='';
insert into TsFieldGridColumn set FId='1788c05b-9520-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='轉帳註銷日期',            FKey='U_ApplyCanDT',    FType='String',  FIndex=6,   FControls='';
insert into TsFieldGridColumn set FId='1788c05e-1730-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='約定帳號性質別',          FKey='U_DsACNOType',    FType='String',  FIndex=7,   FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c25177d790', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='是否設定不得轉非約定',    FKey='U_IfSetNonAgree', FType='String',  FIndex=8,   FControls='';
insert into TsFieldGridColumn set FId='1788c06d-30a0-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='是否設定最高轉帳金額',    FKey='U_IsTransLimit',  FType='String',  FIndex=9,   FControls='';
insert into TsFieldGridColumn set FId='1788c06f-df30-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='最高轉帳金額',            FKey='U_TransLimit',    FType='String',  FIndex=10,  FControls='';
insert into TsFieldGridColumn set FId='1788c076-c220-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='黃金存摺網銀台幣帳號',    FKey='U_GoldTWDACNO',   FType='String',  FIndex=11,  FControls='';
insert into TsFieldGridColumn set FId='1788c084-2520-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='匯入款通知設定/取消日期', FKey='U_NoticeSetDT',   FType='String',  FIndex=12,  FControls='';
insert into TsFieldGridColumn set FId='1788c087-0830-0001-5ef2-005056c00008', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='匯入款通知設定金額',      FKey='U_NoticeSetAMT',  FType='String',  FIndex=13,  FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c251c317d0', FFieldId='1788c041-77a0-0001-5ef2-005056c00008', FTitle='其他資訊',                FKey='U_OtherGrid',     FType='Control', FIndex=14,  FControls='[{
    type: "Button",
    text: "其他資訊",
    onclick: UNetBankDepACNOForm.openOtherGrid
}]';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c252296d20', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='是否申請代繳停車費',      FKey='U_IsApplyPkFee',  FType='String',  FIndex=610, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c2522eca00', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='手續費註記',              FKey='U_FeeFlg',        FType='String',  FIndex=611, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c25233b7e0', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='是否設定減免次數',        FKey='U_IsSetTime',     FType='String',  FIndex=612, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c252398610', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='手續費設定日期',          FKey='U_FeeDT',         FType='String',  FIndex=613, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c2524e8130', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='設定手續費金額',          FKey='U_SetFeeAMT',     FType='String',  FIndex=614, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c2525b46a0', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='每月優惠減免次數',        FKey='U_MonTime',       FType='String',  FIndex=615, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c252664c00', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='本月已使用優惠次數',      FKey='U_MonUseTime',    FType='String',  FIndex=616, FControls='';
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-431c-dd02-17c2527fa940', FFieldId='c5cfcd29-0c00-431c-dd02-17c252140190', FTitle='手續費優惠迄日',          FKey='U_FeeEndDT',      FType='String',  FIndex=617, FControls='';

java setFormFields('1788c01e-b080-0001-5ef2-005056c00008', '基本資訊', '1788c01e-b080-1001-5ef2-005056c00008', null, 'U_UID,U_Button', '查詢結果', '1788c08d-4560-0001-5ef2-005056c00008', null, 'U_Grid,U_OtherGrid');

--/TBB.UNetBankDepACNO-----------------------------------------------------------



--TBB.UCardinformation----------------------------------------------------------

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c262441db0';

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c2635dfc00';

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c2636e9ae0';

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c2631be3f0';

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c2616cfa10';

UPDATE TsField set FReadOnly=1 WHERE FId='c5cfcd29-0c00-431c-dd02-17c2623ae640';

java setImportTemplateFields('2eda0929-0c00-9c71-8308-17a3766ed360', 'FName,U_CardNum,U_Inquiry,U_Rating0106,U_Rating0712,U_Rating1318,U_Rating1924');

--/TBB.UCardinformation----------------------------------------------------------