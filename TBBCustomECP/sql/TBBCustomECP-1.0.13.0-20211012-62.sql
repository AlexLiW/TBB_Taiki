
--調整CallerPIN長度
ALTER TABLE IVRNodeFinalRecord ALTER COLUMN CallerPIN varchar(100);
ALTER TABLE IVRNodeCourseRecord ALTER COLUMN CallerPIN varchar(100);
update TsField set FUnitId='0800c056-5000-2012-9b08-17a7a602a3e0', FName='CallerPIN',           FTitle='CallerPIN',    FType='InputBox-Text',    FSize=100 where FId='0800c056-5000-2012-9b08-17a7a6285d50';
update TsField set FUnitId='0800c056-5000-2012-9b08-17a7a5741f30', FName='CallerPIN',           FTitle='CallerPIN', FType='InputBox-Text',    FSize=100 where FId='0800c056-5000-2012-9b08-17a7a59523e0';

--移除歷程節點查詢方格欄位
java setQueryFormFields('0800c056-5000-2012-9b08-17a7a602a3e0','');

--移除通話紀錄頁籤 歷程節點關鍵字查詢欄位、增加讀取客制js function
update TsPage set  FName='通話記錄歷程節點紀錄列表', FTitle='歷程節點紀錄', FCode='Ecp.CallLog.TBBmIVRNodeCourseRecordList', FPlatform='Computer', FType='EntityList', FIcon='quicksilver/image/unit/New.gif', FUrl='quicksilver/page/template/EntityList.jsp', FActionMethodName='TBBmIVRNodeCourseRecord.prepareList', FLoadHandler='IVRNodeCourseRecord.doLoad();',  FRelationId='00000000-0000-b857-7f07-17ae6df1b3c0', FUnitId='0800c056-5000-2012-9b08-17a7a602a3e0', FMasterUnitId='5d6b7749-a28f-496b-9eff-524cb20474fc', FIsSlavePage=1, FIndex=8, FDialogWidth=null, FDialogHeight=null, FHasViewFrame=0, FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='', FDialogMaximized=0, FCreateQuerySchemaBox='No', FCreateKeywordBox='No', FToolItemInitArguments='', FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='00000000-0000-b857-7f07-17ae6eb9a240';

--移除流程節點查詢方格欄位
java setQueryFormFields('0800c056-5000-2012-9b08-17a7a5741f30','');

--移除通話紀錄頁籤 流程節點關鍵字查詢欄位、增加讀取客制js function
update TsPage set FName='通話記錄流程節點紀錄列表', FTitle='流程節點紀錄', FCode='Ecp.CallLog.TBBmIVRNodeFinalRecordList', FPlatform='Computer', FType='EntityList', FIcon='quicksilver/image/unit/New.gif', FUrl='quicksilver/page/template/EntityList.jsp', FActionMethodName='TBBmIVRNodeFinalRecord.prepareList', FLoadHandler='IVRNodeFinalRecord.doLoad();', FRelationId='00000000-0000-b857-7f07-17ae6de35580', FUnitId='0800c056-5000-2012-9b08-17a7a5741f30', FMasterUnitId='5d6b7749-a28f-496b-9eff-524cb20474fc', FIsSlavePage=1, FIndex=7, FDialogWidth=null, FDialogHeight=null, FHasViewFrame=0, FQueryOnLoad=null, FQuerySchemaId=null, FQueryFormAutoQuery=0, FVisible=1, FDescription='', FDialogMaximized=0, FCreateQuerySchemaBox='No', FCreateKeywordBox='No', FToolItemInitArguments='', FVisibleCondition=null, FEditId='4e9b96a5-4c20-42a0-8929-d83efc27af4e', FFormColumnCount=null where FId='00000000-0000-b857-7f07-17ae6ea98d30';

--新增流程節點客製化js
insert into TsScript set FId='0800c056-5000-f41a-0103-17c732f37170', FPageId='00000000-0000-b857-7f07-17ae6ea98d30', FIndex=1, FUrl='custom/tbb/page/js/IVRNodeFinalRecord.js';

--新增歷程節點客製化js
insert into TsScript set FId='0800c056-5000-f41a-0103-17c732f05190', FPageId='00000000-0000-b857-7f07-17ae6eb9a240', FIndex=1, FUrl='custom/tbb/page/js/IVRNodeCourseRecord.js';

--調整聯絡人之是否申請電話銀行位置
java setFormFields('4f650a4a-571a-4847-8a69-f4bcb7cc27ed', '基本資訊', '1f74ce45-c0b8-427c-9d31-67b558224e74', null, 'U_CustName,U_CustID,FTitle,U_Dialogue,FBusinessPhone,FDialFeature,U_CustCharact', '常用交易', '1799d8dd-0350-07e3-6f21-000c29879bec', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UAccountListBTN,U_UCreditcardholderBTN,U_EBankingInfoBTN,U_UNetBankDepACNOBTN,U_XMLdocBTN', '信用卡客戶基本資料檔', '17a5b822-1df0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CName,U_Ename,U_Birthday1,U_Homephone,U_Cellphone,U_Companyphone,U_ZIP,U_Bill,U_Accountcategory,U_Domicile,U_Residence,U_Companyaddress,U_Cusserviceunit,U_Custitle,U_Annualincome,U_CENSU,U_AcceptDM,U_Gender,U_Nationality,U_Guarantor,U_Note,U_Billdate,U_Maintaindate', '銀行客戶基本資料檔', '17a5b822-1e70-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UserName,U_Birthday2,U_Birthday,U_Address1,U_Address2,U_Phone,U_Phone2,U_IsEBank,U_Moblie,U_EMAIL', '銀行客戶區別資料檔', '17a5b822-1ee0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_Career,U_Title,U_DisFlag,U_RiskLev', '銀行客戶帳戶明細', '17a5b826-f200-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_ACNO,U_IsVoiceBank,U_SCUFLG,U_BRHACC,U_IBHPWD,U_OpenDT,U_SettleDT,U_AMTICHD,U_ODFMG,U_TDYOFMX,U_ODFBAL,U_RETURN,U_RETMARK,U_REFUSE,U_RETURN2,U_RETMARK2,U_RELEASE', '其他', 'ffffff15-74b6-cb90-501b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'FNote', '客戶信用卡基本資料(舊)', 'ffffff15-74b6-cb90-500b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CreditName,U_CreditMobile,U_CreditPhone,U_CreditHomePhone,U_CreditCompanyPhone,U_CreditCustBirth,U_CreditBranch,U_CreditAddress,U_CreditEmail,U_CreditMobileTemp', '客戶金融端基本資料(舊)', 'ffffff15-74b6-cb90-5013-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_FinanceName,U_FinanceMobile,U_FinancePhone,U_FinanceHomePhone,U_FinanceCustBirth,U_FinanceAddress,U_FinanceNewsLetter,U_FinanceMobileTemp', '私人資訊', 'f3c1c46b-924d-44b7-9a2b-dc81f87986a9', null, 'FContactGroupName,FNickname,FLanguage,FBirthday,FAge,FBloodType,FMsn,FGender,FMarriage,FHobby,FEducationRecord,FHomeAddress,FHomePhone,FPrivateEmailAddress', '管理', '4b297eb1-4a93-42bc-abb7-c69e55b024b6', null, 'FCreateTime,FUpdateTime,FCreateUserId,FUpdateUserId,FCreateDepartmentId,FUpdateDepartmentId,FContactGroupId', '登入資訊', '42c45d31-305a-4d5d-8fd2-13c3bd1e13d8', null, 'FLoginAble,FLoginMail');

--調整聯絡人VIP註記呈現欄位
update TsField set FUnitId='00000000-0000-0000-0001-020000001002', FName='FDialFeature',           FTitle='VIP註記',                    FType='MultiCheckBox',       FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId='fd3ef6a6-52d3-4335-a94f-2c1b08242d7f', FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable='TcGroupContactDialFeature', FRelationCapacity=20,   FRelationId=null, FSelectListFilterSql=null,                                                            FSourceType='join',     FJoinField='FContactGroupId', FSourceField='FDialFeature',     FSource=null,                                                                                                 FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='',                       FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',                        FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null,                                                                        FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null,               FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='a8aa447d-84ab-4185-9acd-19a07dfcd1ad';
java setFormFields('4f650a4a-571a-4847-8a69-f4bcb7cc27ed', '基本資訊', '1f74ce45-c0b8-427c-9d31-67b558224e74', null, 'U_CustName,U_CustID,FTitle,FDialFeature,FBusinessPhone,U_CustCharact', '常用交易', '1799d8dd-0350-07e3-6f21-000c29879bec', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UAccountListBTN,U_UCreditcardholderBTN,U_EBankingInfoBTN,U_UNetBankDepACNOBTN,U_XMLdocBTN', '信用卡客戶基本資料檔', '17a5b822-1df0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CName,U_Ename,U_Birthday1,U_Homephone,U_Cellphone,U_Companyphone,U_ZIP,U_Bill,U_Accountcategory,U_Domicile,U_Residence,U_Companyaddress,U_Cusserviceunit,U_Custitle,U_Annualincome,U_CENSU,U_AcceptDM,U_Gender,U_Nationality,U_Guarantor,U_Note,U_Billdate,U_Maintaindate', '銀行客戶基本資料檔', '17a5b822-1e70-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_UserName,U_Birthday2,U_Birthday,U_Address1,U_Address2,U_Phone,U_Phone2,U_IsEBank,U_Moblie,U_EMAIL', '銀行客戶區別資料檔', '17a5b822-1ee0-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_Career,U_Title,U_DisFlag,U_RiskLev', '銀行客戶帳戶明細', '17a5b826-f200-02a6-0651-005056c00001', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_ACNO,U_IsVoiceBank,U_SCUFLG,U_BRHACC,U_IBHPWD,U_OpenDT,U_SettleDT,U_AMTICHD,U_ODFMG,U_TDYOFMX,U_ODFBAL,U_RETURN,U_RETMARK,U_REFUSE,U_RETURN2,U_RETMARK2,U_RELEASE', '其他', 'ffffff15-74b6-cb90-501b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'FNote', '客戶信用卡基本資料(舊)', 'ffffff15-74b6-cb90-500b-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_CreditName,U_CreditMobile,U_CreditPhone,U_CreditHomePhone,U_CreditCompanyPhone,U_CreditCustBirth,U_CreditBranch,U_CreditAddress,U_CreditEmail,U_CreditMobileTemp', '客戶金融端基本資料(舊)', 'ffffff15-74b6-cb90-5013-bbcb0f107aad', '1f74ce45-c0b8-427c-9d31-67b558224e74', 'U_FinanceName,U_FinanceMobile,U_FinancePhone,U_FinanceHomePhone,U_FinanceCustBirth,U_FinanceAddress,U_FinanceNewsLetter,U_FinanceMobileTemp', '私人資訊', 'f3c1c46b-924d-44b7-9a2b-dc81f87986a9', null, 'FContactGroupName,FNickname,FLanguage,FBirthday,FAge,FBloodType,FMsn,FGender,FMarriage,FHobby,FEducationRecord,FHomeAddress,FHomePhone,FPrivateEmailAddress', '管理', '4b297eb1-4a93-42bc-abb7-c69e55b024b6', null, 'FCreateTime,FUpdateTime,FCreateUserId,FUpdateUserId,FCreateDepartmentId,FUpdateDepartmentId,FContactGroupId', '登入資訊', '42c45d31-305a-4d5d-8fd2-13c3bd1e13d8', null, 'FLoginAble,FLoginMail');

--調整電子表單功能列表排序

--預借現金密碼函 以創建時間排序
java setOrderFields('ff23e0c3-b1fc-4916-8f51-385f1d7dcb78', 'FCreateTime','1');
--轉介客戶抱怨單 以創建時間排序
java setOrderFields('28c2e152-0c0f-4857-a1da-a50a963f3c2c', 'FCreateTime','1');
--業務諮詢轉介單 以創建時間排序
java setOrderFields('f21e8cd4-7419-400a-8fa0-f3cfa8cb331d', 'FCreateTime','1');
--信用卡額度調整單 以創建時間排序
java setOrderFields('498d34bb-0721-451e-9f60-2333f9bdabbd', 'FCreateTime','1');
--基本資料變更申請單 以創建時間排序
java setOrderFields('81dd2cbd-0751-4fa7-b667-21b49e7bc8f3', 'FCreateTime','1');
--信用卡一般卡/悠遊卡/一卡通聯名卡停卡申請單 以創建時間排序
java setOrderFields('0100c056-5000-ca09-510a-179e4854e130', 'FCreateTime','1');
--憑證暫禁/一般網銀密碼終止 以創建時間排序
java setOrderFields('a9fd5f22-6fc1-0620-cd27-ffffff16b4f0', 'FCreateTime','1');
--信用卡掛失 以創建時間排序
java setOrderFields('caedb879-742d-4063-91fe-7dc89e658685', 'FCreateTime','1');
--金融端掛失 以創建時間排序
java setOrderFields('facf418f-d079-4741-be22-35352ced706f', 'FCreateTime','1');
--索取各項表格(含申請書) 以創建時間排序
java setOrderFields('16d4631a-fb7a-4ed2-b953-b75ca995bd93', 'FCreateTime','1');
--未收到帳單查詢申請書 以創建時間排序
java setOrderFields('ad7a100f-cbbb-0318-f152-ffffff1574b3', 'FCreateTime','1');
--帳務組客戶問題單  以創建時間排序
java setOrderFields('c120fea7-0c5d-4c1f-9a0b-ac9802c13f88', 'FCreateTime','1');
--利息違約金減免單  以創建時間排序
java setOrderFields('cf948c0c-b80e-4f46-8fb7-cc47e6a9f9dd', 'FCreateTime','1');

--更新A010電文樣板
update TpCUSmCsrTemplate set  FName='A010', FIndex=12, U_UpTemplate='{
   "name": "A010",
   "from" : "CSR",
   "sessionId" : UATMCardDetailForm.sessionId,
   "agentId" : UATMCardDetailForm.agentId,
   "formData" : data
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='A010-簽帳卡',                 U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null where FId='2eda0929-0c00-262e-cd02-179f53dae770';
--新增A008電文樣板
insert into TpCUSmCsrTemplate set FId='0800c056-5000-f41a-0103-17c923616230', FName='A008', FIndex=50, U_UpTemplate='{
      "name" : "A008tbbapi",
      "from" : "CSR",
      "sessionId" : UPreDesignateACForm.sessionId,
      "agentId" : UPreDesignateACForm.agentId,
      "formData" : data
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='A008-金融卡約定轉入帳號查詢', U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
--新增A004電文樣板
insert into TpCUSmCsrTemplate set FId='0800c056-5000-f41a-0103-17c9249ce810', FName='A004', FIndex=51, U_UpTemplate='{
   "name" : "A004tbbapi",
   "from" : "CSR",
   "sessionId" : UATMCardDetailForm.sessionId,
   "agentId" : UATMCardDetailForm.agentId,
   "formData" : data
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='A004-金融卡明細查詢',         U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;

--更新終止存提登錄類別字典文本
update TsDictionaryItem set FText='登錄' where FDictionaryId='177f1f7e-8990-04c3-1937-d8f2cab1cb50' and FValue = '29';
update TsDictionaryItem set FText='圈存' where FDictionaryId='177f1f7e-8990-04c3-1937-d8f2cab1cb50' and FValue = '07';
update TsDictionaryItem set FText='解圈(此圈存、解圈欄位限虛擬帳號使用)' where FDictionaryId='177f1f7e-8990-04c3-1937-d8f2cab1cb50' and FValue = '57';

--對應解圈登錄作業增加交易結果欄位
ALTER TABLE TpTBB57Register ADD U_Result2 varchar(20);
ALTER TABLE TpTBB57Register ADD U_ResultCode2 varchar(50);
insert into TsField set FId='0800c056-5000-ad54-c30f-17cbb6f7fc60', FUnitId='178875ab-10e0-0001-5ef2-005056c00008', FName='U_Result2',     FTitle='交易結果-解圈',     FType='InputBox-Text', FSize=20,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,          FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0800c056-5000-ad54-c30f-17cbb73fae70', FUnitId='178875ab-10e0-0001-5ef2-005056c00008', FName='U_ResultCode2', FTitle='交易結果代碼-解圈', FType='InputBox-Text', FSize=50,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,          FHint='',     FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
java setFormFields('178875ab-39a0-0001-5ef2-005056c00008', '基本資訊', '178875ab-39a0-1001-5ef2-005056c00008', null, 'U_ACNO,U_Button1,U_Grid,U_Descript,U_Result,U_ResultCode,U_Result2,U_ResultCode2');

--針對金融卡掛失功能調整
ALTER TABLE  UDebitLoss ADD U_SAMDKEY varchar(50);
ALTER TABLE  UDebitLoss ADD U_GridA015 varchar(10000);
ALTER TABLE  UDebitLoss ADD U_Result_5 varchar(10);
ALTER TABLE  UDebitLoss ADD U_ResultExplain_5 varchar(50);

insert into TsField set FId='0100c056-5000-807a-0408-17c447abd130', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_GetECTime',           FTitle='取得悠遊卡掛失時間',              FType='Button',              FSize=null,  FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor='transparent', FDefaultValue=null,            FHint='取得悠遊卡掛失時間',                FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0100c056-5000-807a-0408-17c448ec6120', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_GridA015',            FTitle='A015網格',                        FType='Grid',                FSize=10000, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=3, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0100c056-5000-807a-0408-17c4498440b0', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_Result_5',            FTitle='交易結果-查詢掛失悠遊卡',         FType='InputBox-Text',       FSize=10,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=1,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0100c056-5000-807a-0408-17c44989fec0', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_ResultExplain_5',     FTitle='交易結果說明-查詢掛失悠遊卡結果', FType='InputBox-Text',       FSize=50,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=2, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsField set FId='0100c056-5000-807a-0408-17c444271770', FUnitId='facf418f-d079-4741-be22-35352ced706f', FName='U_SAMDKEY',             FTitle='悠遊卡外顯卡號',                  FType='InputBox-Text',       FSize=50,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null,                  FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null,            FHint='',                                  FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
insert into TsFieldGridColumn set FId='0100c056-5000-807a-0408-17c448f69480', FFieldId='0100c056-5000-807a-0408-17c448ec6120', FTitle='交易代號',           FKey='U_TXNCODE',  FType='String',  FIndex=618, FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-807a-0408-17c448fba8b0', FFieldId='0100c056-5000-807a-0408-17c448ec6120', FTitle='交易時間',           FKey='U_A015TIME', FType='String',  FIndex=619, FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-807a-0408-17c448ffdff0', FFieldId='0100c056-5000-807a-0408-17c448ec6120', FTitle='處理代碼',           FKey='U_PROTYPE',  FType='String',  FIndex=620, FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-807a-0408-17c449043de0', FFieldId='0100c056-5000-807a-0408-17c448ec6120', FTitle='掛卡結果',           FKey='U_RESULT',   FType='String',  FIndex=621, FControls='';
insert into TsFieldGridColumn set FId='0100c056-5000-807a-0408-17c4490da160', FFieldId='0100c056-5000-807a-0408-17c448ec6120', FTitle='帶入悠遊卡掛失時間', FKey='U_Button',   FType='Control', FIndex=622, FControls='[{type:"Button",text:"選擇",onclick:"UDebitLossForm.doChoice()"}]';
java setFormFields('0f4b106e-4e17-464c-96be-29ce45705040', '基本資訊', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', null, 'U_AccountNumberSystem,FUserid2', '基本資料', 'b775af01-0169-4a56-86a1-2699ab6a5bd0', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_CustName,U_CustID,U_SAMDKEY,U_CustMobile,U_TelNum,U_CustAddress,U_OtherPhone,U_Attn,U_Notifiers,U_CaseType,U_PrincipalName,U_PrincipalRelation,U_PrincipalPhone,U_Result,U_ResultExplain,U_Result_1,U_ResultExplain_1,U_Result_2,U_ResultExplain_2,U_Result_3,U_ResultExplain_3,U_Result_4,U_ResultExplain_4,FStatus,U_DateTime', '掛失類別', 'e3b15d51-5515-47a8-a368-298ac640e6bb', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_LossType,U_LossCardType,U_LossKind_New,U_PhoneInform,U_Remind', '掛失時間', 'ffe2a957-8073-4ff5-8c78-86f4d66a12be', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_LossWay,U_Remind1,U_DebitCardDate,U_BankBookDate,U_SealDate,U_leisureDate,U_GetECTime,U_GridA015', '回撥時間', 'bd067001-38f8-48ec-aeaa-828bccf92e8c', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_CallBackTime1,U_CallBackStaff1,U_CallBackOther1,U_CallBackTime2,U_CallBackStaff2,U_CallBackOther2,U_Remark,FUserId', '舊有欄位', '17a138a2-4b60-05ec-4cf4-005056c00001', '4ab129a0-bcba-450a-9bc6-486a8b0858a4', 'U_DebitCardTerminal,U_LossKind,U_BankBookSeal');
java setFormFields('0ca0b23c-8478-9214-5101-15841c793ae0', '基本資訊', '15841c79-3d80-0151-1492-78843cb2a00c', null, 'U_AccountNumberSystem,U_CaseType,FUserid2', '基本資料', '15841c79-3da0-0151-1492-78843cb2a00c', '15841c79-3d80-0151-1492-78843cb2a00c', 'U_CustName,U_CustID,U_CustMobile,U_TelNum,U_CustAddress,U_OtherPhone,U_Attn,U_Notifiers,U_PrincipalName,U_PrincipalRelation,U_PrincipalPhone,U_Result,U_ResultExplain,FStatus,U_DateTime', '掛失類別', '15841c79-42d0-0151-1492-78843cb2a00c', '15841c79-3d80-0151-1492-78843cb2a00c', 'U_LossType,U_LossCardType,U_LossKind_New,U_BankBookSeal,U_PhoneInform,U_Remind', '掛失時間', '15841c79-4320-0151-1492-78843cb2a00c', '15841c79-3d80-0151-1492-78843cb2a00c', 'U_LossWay,U_Remind1,U_DebitCardDate,U_BankBookDate,U_SealDate,U_leisureDate', '回撥時間', '15841c79-4360-0151-1492-78843cb2a00c', '15841c79-3d80-0151-1492-78843cb2a00c', 'U_CallBackTime1,U_CallBackStaff1,U_CallBackOther1,U_CallBackTime2,U_CallBackStaff2,U_CallBackOther2,U_Remark,FUserId');

--新增字典TBB-悠遊卡交易代號 Dictionary
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0100c056-5000-807a-0408-17c4470b82f0', FName='TBB-悠遊卡交易代號', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c4470b82f0', FEnabled=1, FId='0100c056-5000-807a-0408-17c447273c30', FIndex=1, FParentValue=null, FText='2442 自動加值',       FValue='2442';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c4470b82f0', FEnabled=1, FId='0100c056-5000-807a-0408-17c447274000', FIndex=2, FParentValue=null, FText='2446 掛失或取消掛失', FValue='2446';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c4470b82f0', FEnabled=1, FId='0100c056-5000-807a-0408-17c4472740a0', FIndex=3, FParentValue=null, FText='DCBP 餘額轉置',       FValue='DCBP';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c4470b82f0', FEnabled=1, FId='0100c056-5000-807a-0408-17c447274110', FIndex=4, FParentValue=null, FText='DCRT 退卡',           FValue='DCRT';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c4470b82f0', FEnabled=1, FId='0100c056-5000-807a-0408-17c4472741b0', FIndex=5, FParentValue=null, FText='DCBD 掛失贖回餘額',   FValue='DCBD';

--新增字典TBB-掛失悠遊卡結果-處理代碼 Dictionary
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0100c056-5000-807a-0408-17c447312ec0', FName='TBB-掛失悠遊卡結果-處理代碼', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c447312ec0', FEnabled=1, FId='0100c056-5000-807a-0408-17c447380af0', FIndex=1, FParentValue=null, FText='03 掛卡',     FValue='03';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-807a-0408-17c447312ec0', FEnabled=1, FId='0100c056-5000-807a-0408-17c447380c30', FIndex=2, FParentValue=null, FText='04 取消掛卡', FValue='04';

--建立A015ECP電文樣板
insert into TpCUSmCsrTemplate set FId='0100c056-5000-807a-0408-17c44ba141c0', FName='A015', FIndex=52, U_UpTemplate='{
   "name" : "A015tbbapi",
   "from" : "csr",
   "sessionId" : UDebitLossForm.sessionId,
   "agentId" : UDebitLossForm.agentId,
   "formData" : {
       "TXSAMD": form.getFieldValue("U_SAMDKEY")// 悠遊卡外顯卡號
   }
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='A015-查詢掛失/取消掛失悠遊卡結果', U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;


