--Ecp.Contact-------------------------------------------------------------------
insert into TsField set FId='ec9b8729-0c00-dc1b-950c-17a323cdb2b0', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_UNetBankDepACNOBTN',  FTitle='網路銀行轉入帳號資料檔按鈕', FType='Button',              FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='constant', FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor='transparent', FDefaultValue=null, FHint='網路銀行轉入帳號資料檔', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='ec9b8729-0c00-084c-280a-17a2c6315cc0', FUnitId='00000000-0000-0000-0001-020000001002', FName='U_XMLdocBTN',           FTitle='XML憑證資料檔按鈕',          FType='Button',              FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                        FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='constant', FJoinField=null,              FSourceField=null,               FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor='transparent', FDefaultValue=null, FHint='XML憑證資料檔',          FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setFormFields('4f650a4a-571a-4847-8a69-f4bcb7cc27ed', '基本資訊', '1f74ce45-c0b8-427c-9d31-67b558224e74', null, 'U_CustName,U_CustID,FTitle,U_Dialogue,FBusinessPhone', '客戶信用卡基本資料', 'ffffff15-74b6-cb90-500b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CreditName,U_CreditMobile,U_CreditPhone,U_CreditHomePhone,U_CreditCompanyPhone,U_CreditCustBirth,U_CreditBranch,U_CreditAddress,U_CreditEmail,U_CreditMobileTemp', '客戶金融端基本資料', 'ffffff15-74b6-cb90-5013-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_FinanceName,U_FinanceMobile,U_FinancePhone,U_FinanceHomePhone,U_FinanceCustBirth,U_FinanceAddress,U_FinanceNewsLetter,U_FinanceMobileTemp', '其他', 'ffffff15-74b6-cb90-501b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'FNote', '常用交易', '1799d8dd-0350-07e3-6f21-000c29879bec', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UAccountListBTN,U_EBankingInfoBTN,U_UNetBankDepACNOBTN,U_XMLdocBTN', '私人資訊', 'f3c1c46b-924d-44b7-9a2b-dc81f87986a9', null, 'FContactGroupName,FNickname,FLanguage,FBirthday,FAge,FBloodType,FMsn,FGender,FMarriage,FHobby,FEducationRecord,FHomeAddress,FHomePhone,FPrivateEmailAddress', '管理', '4b297eb1-4a93-42bc-abb7-c69e55b024b6', null, 'FCreateTime,FUpdateTime,FCreateUserId,FUpdateUserId,FCreateDepartmentId,FUpdateDepartmentId,FContactGroupId', '登入資訊', '42c45d31-305a-4d5d-8fd2-13c3bd1e13d8', null, 'FLoginAble,FLoginMail');
--/Ecp.Contact------------------------------------------------------------------

--TBB.m12116A-------------------------------------------------------------------
update TsToolItem set FName='帶入客戶資料', FDefaultEventHandler='// Info.doCsrQuery("NB01")
TBBUtil.doInfoPost();' where FId='d4930324-ea54-40e5-8309-676a847f67df';
update TsToolItem set FName='列印(舊)', FDefaultEventHandler='m12116A.doOpen(''old'')' where FId='556ce95c-7e5e-4f8e-92e0-e14b633a1b9b';
--/TBB.m12116A------------------------------------------------------------------

--TBB.m12112A-------------------------------------------------------------------
update TsField set FDefaultValue='02-2356-0050' where FId='ec9b8729-0c00-853d-d705-179c67fdc510';
update TsField set FDefaultValue='1702' where FId='ec9b8729-0c00-853d-d705-179c68024f70';
update TsField set FDefaultValue='02-23920118' where FId='ec9b8729-0c00-853d-d705-179c680aba00';
--/TBB.m12112A------------------------------------------------------------------

--TBB.m12113A-------------------------------------------------------------------
--業務諮詢轉介單(新)
insert into TsPage set FId='ec9b8729-0c00-5231-c70d-17a41315a5c0', FName='業務諮詢轉介單(新)',           FTitle='業務諮詢轉介單(新)', FCode='TBB.m12113A.Report2',       FPlatform='Computer', FType='Other',      FIcon='quicksilver/image/unit/台企銀logo1.jpg', FUrl='custom/tbb/page/m12113A2.jsp', FActionMethodName=null, FLoadHandler='m12113A_Report2.doLoad',     FRelationId=null, FUnitId='f21e8cd4-7419-400a-8fa0-f3cfa8cb331d', FMasterUnitId=null, FIsSlavePage=0, FIndex=null, FDialogWidth=null, FDialogHeight=null, FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null;

insert into TsScript set FId='ec9b8729-0c00-5231-c70d-17a413326420', FIndex=1, FPageId='ec9b8729-0c00-5231-c70d-17a41315a5c0', FUrl='custom/tbb/page/js/m12113A_Report2.js';

insert into TsToolItem set FId='ec9b8729-0c00-5231-c70d-17a4132b5de0', FPageId='ec9b8729-0c00-5231-c70d-17a41315a5c0', FCode='Sure', FName='確定', FHint=null, FLabel=null, FType='Button', FAlign='right', FIndex=1, FWidth=null, FIcon=null, FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null, FDictionaryId=null, FSubItemRoutine='', FVisibleCondition=null, FEnableCondition=null, FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='m12113A_Report2.doPrint', FChartId=null;

--業務諮詢轉介單表單
update TsToolItem set FName='列印(舊)', FDefaultEventHandler='m12113A.doOpen(''old'')' where FId='c393d1c2-110b-4ae7-86a3-e23e65c4e666';
update TsToolItem set FIndex=9 where FId='e0d68d60-4a74-456a-9c0a-50ccb7731950';

insert into TsToolItem set FId='ec9b8729-0c00-5231-c70d-17a413009b00', FPageId='31d8b466-689f-43f2-8c5f-6a5a51ec270d', FCode='newPrint', FName='列印(新)',     FHint=null, FLabel=null, FType='Button',      FAlign='right', FIndex=8, FWidth=null, FIcon='quicksilver/image/16/Print.png',  FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null,           FDictionaryId=null, FSubItemRoutine='', FVisibleCondition=null, FEnableCondition=null, FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='m12113A.doOpen(''new'')', FChartId=null;
--/TBB.m12113A------------------------------------------------------------------

--TBB.EBankingInfo--------------------------------------------------------------
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2defbd780' where FId='ec9b8729-0c00-c076-4804-17a17d5d9d10';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2ded5e9e0' where FId='ec9b8729-0c00-c076-4804-17a17ee56390';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0' where FId='ec9b8729-0c00-c076-4804-17a17ed82590';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0' where FId='ec9b8729-0c00-c076-4804-17a17eeba580';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0' where FId='ec9b8729-0c00-c076-4804-17a17ee294b0';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220' where FId='ec9b8729-0c00-c076-4804-17a17dd1e460';
update TsField set FType='ComboBox-SelectOnly', FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560' where FId='ec9b8729-0c00-c076-4804-17a17f0580a0';
--/TBB.EBankingInfo-------------------------------------------------------------

--TBB.XMLdoc--------------------------------------------------------------------
alter table tpTBBXMLdoc alter column U_UID set data type varchar(10);
alter table tpTBBXMLdoc alter column U_Grid set data type varchar(10000); 

update TsUnit set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788b663-3670-0001-5ef2-005056c00008';

update TsField set FLabelColor='transparent' where FId='1788b843-74c0-0001-5ef2-005056c00008';
update TsField set FSize=10000 where FId='1788b84f-7940-0001-5ef2-005056c00008';
update TsField set FSize=10 where FId='1788b669-f890-0001-5ef2-005056c00008';

update TsPage set FName='XML憑證資料檔表單',     FTitle='XML憑證資料檔',     FCode='TBB.XMLdoc.Form',       FPlatform='Computer', FType='EntityForm', FIcon='quicksilver/image/unit/Form.png', FUrl='quicksilver/page/template/EntityForm.jsp', FActionMethodName='TBB.XMLdoc.prepareForm', FLoadHandler='XMLdocForm.doLoad', FRelationId=null, FUnitId='1788b663-3670-0001-5ef2-005056c00008', FMasterUnitId='1788b663-3670-0001-5ef2-005056c00008', FIsSlavePage=1, FIndex=1,    FDialogWidth=null, FDialogHeight=500,  FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='1788b663-4ba0-0001-5ef2-005056c00008';

--XML憑證資料檔表單
delete from TsToolItem where FId='1788b663-4be0-0001-5ef2-005056c00008';
delete from TsToolItem where FId='1788b663-4bf0-0001-5ef2-005056c00008';
delete from TsToolSubItem where FId='1788b663-4d20-0001-5ef2-005056c00008';

insert into TsScript set FId='ec9b8729-0c00-084c-280a-17a2c69caa50', FIndex=1, FPageId='1788b663-4ba0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/xmldoc/XMLdocForm.js';
insert into TsScript set FId='ec9b8729-0c00-084c-280a-17a2c6c76390', FIndex=2, FPageId='1788b663-4ba0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/common/TBBUtil.js';

java setFormFields('1788b663-6930-0001-5ef2-005056c00008', '基本資訊', '1788b663-6930-1001-5ef2-005056c00008', null, 'U_UID,U_Button', '查詢結果', '1788bfed-a6e0-0001-5ef2-005056c00008', null, 'U_Grid');

update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788b663-8280-3001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788b663-8280-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788b663-8280-2001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788b663-8280-0001-5ef2-005056c00008';
--/TBB.XMLdoc-------------------------------------------------------------------

--TBB.UNetBankDepACNO-----------------------------------------------------------
alter table tpTBBUNetBankDepACNO alter column U_UID set data type varchar(10);
alter table tpTBBUNetBankDepACNO alter column U_Grid set data type varchar(10000); 

update TsUnit set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c01e-8b60-0001-5ef2-005056c00008';

update TsField set FLabelColor='transparent' where FId='1788c03c-3880-0001-5ef2-005056c00008';
update TsField set FSize=10000 where FId='1788c041-77a0-0001-5ef2-005056c00008';
update TsField set FSize=10 where FId='1788c028-6620-0001-5ef2-005056c00008';

update TsPage set FName='網路銀行轉入帳號資料檔表單',     FTitle='網路銀行轉入帳號資料檔',     FCode='TBB.UNetBankDepACNO.Form',       FPlatform='Computer', FType='EntityForm', FIcon='quicksilver/image/unit/Form.png', FUrl='quicksilver/page/template/EntityForm.jsp', FActionMethodName='TBB.UNetBankDepACNO.prepareForm', FLoadHandler='UNetBankDepACNOForm.doLoad', FRelationId=null, FUnitId='1788c01e-8b60-0001-5ef2-005056c00008', FMasterUnitId='1788c01e-8b60-0001-5ef2-005056c00008', FIsSlavePage=1, FIndex=1,    FDialogWidth=null, FDialogHeight=500,  FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='1788c01e-9eb0-0001-5ef2-005056c00008';

--網路銀行轉入帳號資料檔表單
delete from TsToolItem where FId='1788c01e-9ee0-0001-5ef2-005056c00008';
delete from TsToolItem where FId='1788c01e-9ef0-0001-5ef2-005056c00008';
delete from TsToolSubItem where FId='1788c01e-9f10-0001-5ef2-005056c00008';

insert into TsScript set FId='ec9b8729-0c00-dc1b-950c-17a3236afd30', FIndex=1, FPageId='1788c01e-9eb0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/unetbankdepacno/UNetBankDepACNOForm.js';
insert into TsScript set FId='ec9b8729-0c00-dc1b-950c-17a323913550', FIndex=2, FPageId='1788c01e-9eb0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/common/TBBUtil.js';

java setFormFields('1788c01e-b080-0001-5ef2-005056c00008', '基本資訊', '1788c01e-b080-1001-5ef2-005056c00008', null, 'U_UID,U_Button', '查詢結果', '1788c08d-4560-0001-5ef2-005056c00008', null, 'U_Grid');

update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c01e-c520-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c01e-c510-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c01e-c520-0001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c01e-c510-0001-5ef2-005056c00008';
--/TBB.UNetBankDepACNO----------------------------------------------------------

--TBB.UENetBankRL---------------------------------------------------------------
alter table tpTBBUENetBankRL alter column U_UID set data type varchar(10);
alter table tpTBBUENetBankRL alter column U_Grid set data type varchar(10000); 
alter table tpTBBUENetBankRL alter column U_UID2 set data type varchar(10);
alter table tpTBBUENetBankRL alter column U_Grid2 set data type varchar(10000); 

update TsUnit set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c0bd-7390-0001-5ef2-005056c00008';

update TsField set FRequired=1, FReadOnly=0, FIsNewRow=1 where FId='1788c133-c500-0001-5ef2-005056c00008';
update TsField set FSize=10000 where FId='1788c0ec-b170-0001-5ef2-005056c00008';
update TsField set FSize=10000 where FId='1788c13e-46a0-0001-5ef2-005056c00008';
update TsField set FLabelColor='transparent' where FId='1788c0db-c480-0001-5ef2-005056c00008';
update TsField set FIsNewRow=1, FLabelColor='transparent', FHint='查詢網路銀行轉帳限額檔' where FId='1788c0e6-d8e0-0001-5ef2-005056c00008';
update TsField set FRequired=1, FIsNewRow=1 where FId='1788c139-1580-0001-5ef2-005056c00008';
update TsField set FSize=10 where FId='1788c0d7-2960-0001-5ef2-005056c00008';
update TsField set FSize=10, FRequired=1 where FId='1788c169-daf0-0001-5ef2-005056c00008';

update TsFieldGridColumn set FKey='U_ApplyTransDT_DATAPL' where FId='1788c11e-3aa0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FKey='U_ApplyTransDT_DATDLT' where FId='1788c120-7cc0-0001-5ef2-005056c00008';

update TsPage set FName='企業網路銀行關係戶資料檔表單',     FTitle='企業網路銀行關係戶資料檔',     FCode='TBB.UENetBankRL.Form',       FPlatform='Computer', FType='EntityForm', FIcon='quicksilver/image/unit/Form.png', FUrl='quicksilver/page/template/EntityForm.jsp', FActionMethodName='TBB.UENetBankRL.prepareForm', FLoadHandler='UENetBankRLForm.doLoad', FRelationId=null, FUnitId='1788c0bd-7390-0001-5ef2-005056c00008', FMasterUnitId='1788c0bd-7390-0001-5ef2-005056c00008', FIsSlavePage=1, FIndex=1,    FDialogWidth=null, FDialogHeight=500,  FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='1788c0bd-86a0-0001-5ef2-005056c00008';

--企業網路銀行關係戶資料檔表單
delete from TsToolItem where FId='1788c0bd-86d0-0001-5ef2-005056c00008';
delete from TsToolItem where FId='1788c0bd-86d0-1001-5ef2-005056c00008';
delete from TsToolSubItem where FId='1788c0bd-86f0-0001-5ef2-005056c00008';

insert into TsScript set FId='ec9b8729-0c00-957f-080b-17a369527440', FIndex=1, FPageId='1788c0bd-86a0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/uenetbankrl/UENetBankRLForm.js';
insert into TsScript set FId='ec9b8729-0c00-957f-080b-17a369528000', FIndex=2, FPageId='1788c0bd-86a0-0001-5ef2-005056c00008', FUrl='custom/tbb/page/common/TBBUtil.js';

java setFormFields('1788c0bd-9910-1001-5ef2-005056c00008', '基本資訊', '1788c0bd-9910-2001-5ef2-005056c00008', null, 'U_UID,U_Inquiry', '查詢結果', '1788c184-79c0-0001-5ef2-005056c00008', '1788c0bd-9910-2001-5ef2-005056c00008', 'U_Grid', '網路銀行轉帳限額檔', '1788c184-79d0-0001-5ef2-005056c00008', null, 'U_UID2,U_BankNo,U_TransACNO,U_Inquiry2', '查詢結果', '1788c184-79d0-1001-5ef2-005056c00008', '1788c184-79d0-0001-5ef2-005056c00008', 'U_Grid2');

update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c0bd-aaf0-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c0bd-aae0-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c0bd-aaf0-0001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c0bd-aae0-0001-5ef2-005056c00008';
--/TBB.UENetBankRL--------------------------------------------------------------

--TBB.UENetBankRLTrans----------------------------------------------------------
alter table tpTBBUENetBankRLTrans alter column U_Grid set data type varchar(10000); 

update TsUnit set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c19c-5520-0001-5ef2-005056c00008';

update TsField set FLabelColor='transparent' where FId='1788c1ea-5fe0-0001-5ef2-005056c00008';
update TsField set FSize=10000 where FId='1788c1f0-7d90-0001-5ef2-005056c00008';

update TsPage set FName='企業網路銀行關係戶轉帳約定資料檔表單',     FTitle='企業網路銀行關係戶轉帳約定資料檔',     FCode='TBB.UENetBankRLTrans.Form',       FPlatform='Computer', FType='EntityForm', FIcon='quicksilver/image/unit/Form.png', FUrl='quicksilver/page/template/EntityForm.jsp', FActionMethodName='TBB.UENetBankRLTrans.prepareForm', FLoadHandler='UENetBankRLTransForm.doLoad', FRelationId=null, FUnitId='1788c19c-5520-0001-5ef2-005056c00008', FMasterUnitId='1788c19c-5520-0001-5ef2-005056c00008', FIsSlavePage=1, FIndex=1,    FDialogWidth=null, FDialogHeight=500,  FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='1788c19c-6a20-0001-5ef2-005056c00008';

--企業網路銀行關係戶轉帳約定資料檔表單
delete from TsToolItem where FId='1788c19c-6a50-0001-5ef2-005056c00008';
delete from TsToolItem where FId='1788c19c-6a60-0001-5ef2-005056c00008';
delete from TsToolSubItem where FId='1788c19c-6a80-0001-5ef2-005056c00008';

insert into TsScript set FId='ec9b8729-0c00-957f-080b-17a37e969000', FIndex=1, FPageId='1788c19c-6a20-0001-5ef2-005056c00008', FUrl='custom/tbb/page/uenetbankrltrans/UENetBankRLTransForm.js';
insert into TsScript set FId='ec9b8729-0c00-957f-080b-17a37e969a90', FIndex=2, FPageId='1788c19c-6a20-0001-5ef2-005056c00008', FUrl='custom/tbb/page/common/TBBUtil.js';

java setFormFields('1788c19c-7d90-0001-5ef2-005056c00008', '基本資訊', '1788c19c-7d90-1001-5ef2-005056c00008', null, 'U_UID,U_RLUID,U_Button', '查詢結果', '1788c234-9f90-0001-5ef2-005056c00008', null, 'U_Grid');

update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c19c-8fa0-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c19c-8f90-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c19c-8fa0-0001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c19c-8f90-0001-5ef2-005056c00008';
--/TBB.UENetBankRLTrans---------------------------------------------------------

--TBB.UENetBankRLLink-----------------------------------------------------------
update TsUnit set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c277-2690-0001-5ef2-005056c00008';

update TsField set FLabelColor='transparent' where FId='1788c336-d520-0001-5ef2-005056c00008';

update TsPage set FName='企業網路銀行關係戶連結檔表單',     FTitle='企業網路銀行關係戶連結檔',     FCode='TBB.UENetBankRLLink.Form',       FPlatform='Computer', FType='EntityForm', FIcon='quicksilver/image/unit/Form.png', FUrl='quicksilver/page/template/EntityForm.jsp', FActionMethodName='TBB.UENetBankRLLink.prepareForm', FLoadHandler='UENetBankRLLinkForm.doLoad', FRelationId=null, FUnitId='1788c277-2690-0001-5ef2-005056c00008', FMasterUnitId='1788c277-2690-0001-5ef2-005056c00008', FIsSlavePage=1, FIndex=1,    FDialogWidth=null, FDialogHeight=500,  FHasViewFrame=0,    FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='',   FDialogMaximized=0,    FCreateQuerySchemaBox=null, FCreateKeywordBox=null, FToolItemInitArguments='',   FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='1788c277-3990-0001-5ef2-005056c00008';

--企業網路銀行關係戶連結檔表單
delete from TsToolItem where FId='1788c277-39c0-0001-5ef2-005056c00008';
delete from TsToolItem where FId='1788c277-39d0-0001-5ef2-005056c00008';
delete from TsToolSubItem where FId='1788c277-39f0-0001-5ef2-005056c00008';

insert into TsScript set FId='ec9b8729-0c00-7932-750a-17a3c993e410', FIndex=1, FPageId='1788c277-3990-0001-5ef2-005056c00008', FUrl='custom/tbb/page/uenetbankrllink/UENetBankRLLinkForm.js';
insert into TsScript set FId='ec9b8729-0c00-7932-750a-17a3c993f050', FIndex=2, FPageId='1788c277-3990-0001-5ef2-005056c00008', FUrl='custom/tbb/page/common/TBBUtil.js';

update TsForm set FGroupMode='Double' where FId='1788c277-4ad0-0001-5ef2-005056c00008';

java setFormFields('1788c277-4ad0-0001-5ef2-005056c00008', '基本資訊', '1788c277-4ad0-1001-5ef2-005056c00008', null, 'U_RLUID,U_Inquiry', '查詢結果', '17a3d3f2-a790-0a75-3279-000c29879bec', '1788c277-4ad0-1001-5ef2-005056c00008', 'U_CompanyID,U_ApplyTransDT,U_RLTransDT,U_NetSev,U_LastApplyDT,U_IsEmail,U_ChgEmailDT,U_EStatement');

update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c277-5c60-0001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c277-5c50-1001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c277-5c50-2001-5ef2-005056c00008';
update TsPrivilege set FModuleId='ec9b8729-0c00-cb64-f705-179b0e1e51f0' where FId='1788c277-5c50-0001-5ef2-005056c00008';
--/TBB.UENetBankRLLink----------------------------------------------------------
