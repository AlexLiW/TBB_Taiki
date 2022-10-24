--資料連結(ip要改)-------------------------------------------------
insert into TsDataLink set FId='0100c056-5000-9243-6408-17a3339525d0', FName='信用卡各卡別帳單明細查詢',                   FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=19, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UYearsbillmonth.Form.page',          FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='8461ed34-388e-4e81-9eaa-4ca1afb1e172', FName='企業網路銀行關係戶資料檔',                   FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=20, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UENetBankRL.Form.page',              FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='2eda0929-0c00-9c71-8308-17a36a89e7d0', FName='信用卡已授權未請款查詢',                     FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=21, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UAuthorizedunclaimed.Form.page',     FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='2eda0929-0c00-9c71-8308-17a36aad17e0', FName='最近一年交易紀錄查詢',                       FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=22, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.ULastyeartrade.Form.page',           FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='2eda0929-0c00-9c71-8308-17a376c75390', FName='信用卡卡片狀態查詢表單',                     FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=23, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UCardinformation.Form.page',         FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='964802be-008f-4895-aa41-419cf1ddf63c', FName='企業網路銀行關係戶轉帳約定資料檔',           FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=24, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UENetBankRLTrans.Form.page',         FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='fa1d8f39-b88e-42f6-9128-96e94ac6f814', FName='企業網路銀行關係戶連結檔',                   FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=25, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UENetBankRLLink.Form.page',          FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='2eda0929-0c00-8b17-060a-17a3d653bd70', FName='約定轉帳帳號檔',                             FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=26, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UPreDesignateAC.Form.page',          FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
insert into TsDataLink set FId='2eda0929-0c00-9402-910b-17a410d21d00', FName='輸入姓名查詢客戶ID',                         FNote='',   FUnitId='00000000-0000-0000-0001-020000001002', FIndex=27, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.UInquireUID.Form.page',              FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;
--/資料連結(ip要改)------------------------------------------------


--TsMenu功能表-----------------------------------------------------
delete from TsMenu where FId='1788775d-8850-0001-5ef2-005056c00008';
delete from TsMenu where FId='17887988-0c10-0001-5ef2-005056c00008';
delete from TsMenu where FId='17887a3f-4810-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c01e-9f80-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c0bd-87f0-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c19c-6ad0-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c277-3a40-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c41c-25b0-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788c59f-4b30-0001-5ef2-005056c00008';
delete from TsMenu where FId='1788cc62-7010-0001-5ef2-005056c00008';

insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='1788c01e-9f80-0001-5ef2-005056c00008', FIndex=7,  FLicensed=1, FName='網路銀行轉入帳號資料檔',                 FOpenMode=null,     FPageId='1788c01e-9eb0-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e1e51f0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.005.007',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='1788c0bd-87f0-0001-5ef2-005056c00008', FIndex=8,  FLicensed=1, FName='企業網路銀行關係戶資料檔',               FOpenMode=null,     FPageId='1788c0bd-86a0-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e1e51f0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.005.008',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='1788c19c-6ad0-0001-5ef2-005056c00008', FIndex=9,  FLicensed=1, FName='企業網路銀行關係戶轉帳約定資料檔',       FOpenMode=null,     FPageId='1788c19c-6a20-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e1e51f0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.005.009',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='1788c277-3a40-0001-5ef2-005056c00008', FIndex=10, FLicensed=1, FName='企業網路銀行關係戶連結檔',               FOpenMode=null,     FPageId='1788c277-3990-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e1e51f0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.005.010',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-8b17-060a-17a3cd37cee0', FIndex=11, FLicensed=1, FName='約定轉帳帳號檔',                         FOpenMode=null,     FPageId='1788c38e-0860-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e1e51f0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.005.011',             FType='InternalPage';

update TsMenu set FIcon='quicksilver/image/16/Query.gif' where FId='1788c8fe-4c90-0001-5ef2-005056c00008';
update TsMenu set FIcon='quicksilver/image/16/Query.gif' where FId='1788c952-4e60-0001-5ef2-005056c00008';

insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-4062-9a02-17a3172a6ea0', FIndex=6,  FLicensed=1, FName='最近一年交易紀錄查詢',                   FOpenMode=null,     FPageId='2eda0929-0c00-4062-9a02-17a317299b30', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.006.006',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='1788cc62-7010-0001-5ef2-005056c00008', FIndex=7,  FLicensed=1, FName='信用卡各卡別帳單明細查詢',               FOpenMode=null,     FPageId='1788cc62-6f60-0001-5ef2-005056c00008', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='MenuName',  FTreeLevel=3, FTreeSerial='002.006.007',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-9c71-8308-17a3699780f0', FIndex=8,  FLicensed=1, FName='信用卡已授權未請款查詢',                 FOpenMode=null,     FPageId='2eda0929-0c00-9c71-8308-17a36996d010', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.006.008',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-9c71-8308-17a3766fcbb0', FIndex=9,  FLicensed=1, FName='信用卡卡片狀態查詢',                     FOpenMode=null,     FPageId='2eda0929-0c00-9c71-8308-17a3766f7410', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.006.009',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-8b17-060a-17a3d6993150', FIndex=10, FLicensed=1, FName='輸入姓名查詢客戶ID',                     FOpenMode=null,     FPageId='2eda0929-0c00-8b17-060a-17a3d698b6a0', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.006.010',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='2eda0929-0c00-9402-910b-17a412ce0190', FIndex=11, FLicensed=1, FName='信用卡指定日期還款結清金額試算',         FOpenMode=null,     FPageId='2eda0929-0c00-9402-910b-17a412cd9e40', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.006.011',             FType='InternalPage';
insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/16/Query.gif',            FId='0100c056-5000-785f-0408-17a37ff378d0', FIndex=12, FLicensed=1, FName='信用卡申請案件查詢',                     FOpenMode=null,     FPageId='0100c056-5000-785f-0408-17a37ff34670', FParentId='ec9b8729-0c00-cb64-f705-179b0e2172b0', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='MenuName',  FTreeLevel=3, FTreeSerial='002.006.012',             FType='InternalPage';

insert into TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/unit/New.gif',            FId='0100c056-5000-ec04-be07-17a424d6fff0', FIndex=26, FLicensed=1, FName='傳真Log紀錄',                            FOpenMode=null,     FPageId='0100c056-5000-ec04-be07-17a424d6eec0', FParentId='c8abc4dd-d210-4b96-bf77-328f559546c1', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.007.026',             FType='InternalPage';

update TsMenu set FAlwaysOpenNewTab=0,    FArguments='',              FCountJavaClass=null, FCountStatus1=null,        FCountStatus2=null,   FCountStatus3=null,       FCountStatus4=null,       FCountStatusField=null,      FCountType=null,    FCountUnitId=null,                                   FCountUserField=null,            FEnabled=1, FEncrypt=0,    FExternalPageUrl=null,                                         FFunctionName=null,                                                               FIcon='quicksilver/image/unit/New.gif', FIndex=8,  FLicensed=1, FName='信用卡/一卡通/聯名卡停卡申請單',         FOpenMode=null,     FPageId='0100c056-5000-ca09-510a-179e485535c0', FParentId='c8abc4dd-d210-4b96-bf77-328f559546c1', FQueryFormHidden=0,    FQuerySchemaId=null,                                   FQuerySchemaLocked=0,    FReplaceByChildren=0, FSubMenuRoutine='',   FSubMenuSource='MenuTable', FTabTitle=null,              FTabTitleSource='PageTitle', FTreeLevel=3, FTreeSerial='002.007.008',             FType='InternalPage' where FId='0100c056-5000-ca09-510a-179e485554f0';

java refreshSerial('TsMenu');
--/TsMenu功能表----------------------------------------------------


--電文連線設定-----------------------------------------------------
insert into TpCUSmCsrConnect set FId='0100c056-5000-785f-0408-17a384ef45f0', FName='eloan-信用卡申請案件查詢', U_Type='Http', U_ConnectLimit=30, U_ReadLimit=30, U_Encode='UTF-8', U_Decode='UTF-8', U_HttpUrl='systemparam:CuscaCaseQuery',                            U_Head='', U_RequestMethod='Get',  U_PostMessage=0, U_IsSimulate=1;
--/電文連線設定----------------------------------------------------


--電文樣板---------------------------------------------------------
insert into TpCUSmCsrTemplate set FId='0100c056-5000-d840-950b-17a2c8d94d20', FName='Get_Result',   FIndex=31, U_UpTemplate='{
   "name":"Get_Result",
   "from":"csr",
   "sessionId":"sessionId",
   "agentId":"agentId",
   "formData":{
      "Cust_ID": "66666666",
      "Bill_No" :"1",
      "SDate": "",
      "EDate": ""
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='Get_Result',                                  U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='0100c056-5000-d840-950b-17a2c8e40890', FName='Get_Html_img', FIndex=32, U_UpTemplate='{
   "name":"Get_Html_img",
   "from":"csr",
   "sessionId":"sessionId",
   "agentId":"agentId",
   "formData":{
      "Cust_ID": "66666666",
      "Bill_No" :"1",
      "Query_Date": "",
      "User_ID": "113276",
      "Project_No":"15623"
   }
}
', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='Get_Html_img',                                U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='0100c056-5000-d840-950b-17a2c8f4f3e0', FName='Get_Html',     FIndex=33, U_UpTemplate='{
   "name":"Get_Html",
   "from":"csr",
   "sessionId":"sessionId",
   "agentId":"agentId",
   "formData":{
      "Cust_ID": "66666666",
      "Bill_No" :"1",
      "Query_Date": "",
      "User_ID": "113276",
      "Project_No":"15623"
   }
}
', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='Get_Html',                                    U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-4062-9a02-17a3281428c0', FName='BSHC',         FIndex=34, U_UpTemplate='{
    "name": "BSHC",
    "from": "csr",
    "sessionId": "000-000-000",
    "agentId": "00000000",
    "formData": {
        "CARDNUM": "1234123412341234",
        "USERDATA": ""
    }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSHC-卡片歷史消費紀錄',                       U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='ec9b8729-0c00-dc1b-950c-17a32a45c2e0', FName='CQ10',         FIndex=35, U_UpTemplate='{
   "name" : "CQ10tbbapi",
   "from" : "csr",
   "sessionId" : UNetBankDepACNOForm.sessionId,
   "agentId" : UNetBankDepACNOForm.agentId,
   "formData" : {
	"CUSIDN" : form.getFieldValue("U_CustID")
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ10-網路銀行轉入帳號資料檔',                 U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='0100c056-5000-9243-6408-17a32d1c3e30', FName='BSD1',         FIndex=36, U_UpTemplate='{
"name": "BSD1tbbapi",
            "from": "csr",
            "sessionId": UYearsbillmonthForm.sessionId,
            "agentId": UYearsbillmonthForm.agentId,
            "formData":{
            "CARDNUM": form.getFieldValue("U_CardNum")
        }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSD1-信用卡帳單資料',                         U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='0100c056-5000-9243-6408-17a32d281ea0', FName='BSD2',         FIndex=37, U_UpTemplate='{
 "name": "BSD2tbbapi",
            "from": "csr",
            "sessionId": UYearsbillmonthForm.sessionId,
            "agentId": UYearsbillmonthForm.agentId,
            "formData":{
            "CARDNUM": form.getFieldValue("U_CardNum"),
            "STMTDATE" : grid.data.U_Stmtdate.replace("*", ""),
            "STMNBR" : grid.data.U_Tradingnote,
        }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSD2-信用卡帳單資料(明細)',                   U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-9c71-8308-17a36ecae120', FName='BSAI',         FIndex=38, U_UpTemplate='{
    "name": "BSAI",
    "from": "csr",
    "sessionId": "000-000-000",
    "agentId": "00000000",
    "formData": {
        "CARDNUM": "1234123412341234",
        "USERDATA": ""
    }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSAI-已授權未請款資料',                       U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='ec9b8729-0c00-957f-080b-17a36f4fd3f0', FName='CQ09',         FIndex=39, U_UpTemplate='{
   "name" : "CQ09tbbapi",
   "from" : "csr",
   "sessionId" : UENetBankRLForm.sessionId,
   "agentId" : UENetBankRLForm.agentId,
   "formData" : {
	"CUSIDN" : form.getFieldValue("U_UID")
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ09-企業網路銀行關係戶資料檔',               U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='ec9b8729-0c00-957f-080b-17a36f796260', FName='CQ05',         FIndex=40, U_UpTemplate='{
   "name" : "CQ05tbbapi",
   "from" : "csr",
   "sessionId" : UENetBankRLForm.sessionId,
   "agentId" : UENetBankRLForm.agentId,
   "formData" : {
	"CUSIDN" : form.getFieldValue("U_UID2"),
	"BANKCOD" : form.getFieldValue("U_BankNo"),
	"TSFACN" : form.getFieldValue("U_TransACNO"),
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ05-網路銀行轉帳限額檔',                     U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='ec9b8729-0c00-957f-080b-17a383942df0', FName='CQ08',         FIndex=41, U_UpTemplate='{
   "name" : "CQ08tbbapi",
   "from" : "csr",
   "sessionId" : UENetBankRLTransForm.sessionId,
   "agentId" : UENetBankRLTransForm.agentId,
   "formData" : {
	"CUSIDN" : form.getFieldValue("U_UID"),
	"CORIDN" : form.getFieldValue("U_RLUID"),
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ08-企業網路銀行關係戶轉帳約定資料檔',       U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='0100c056-5000-785f-0408-17a38504b320', FName='caCaseQuery',  FIndex=42, U_UpTemplate='{
   "name" : "caCaseQuerytbbapi",
   "from" : "csr",
   "sessionId" : "sessionId",
   "agentId" :"agentId",
   "formData" : "qtype=&qitem="
  }', U_DownTemplate1='{
 "result": {
  "source": {
   "result": {
    "data": [{
     "RCVNO": "A1XXXXXXXXX3",
     "CUSTID": "H2XXXXXXX2",
     "CUSTNM": "王ＯＯ",
     "CENCOIN": "10",
     "CENDATE": "2020/10/08",
     "DOCSTATUS": "29",
     "CENCARD": "86 ",
     "UNCASEDESCTOTH": ""
    },{
     "RCVNO": "B1XXXXXXXXX3",
     "CUSTID": "Y2XXXXXXX2",
     "CUSTNM": "黃ＯＯ",
     "CENCOIN": "10",
     "CENDATE": "2019/10/08",
     "DOCSTATUS": "49",
     "CENCARD": "86 ",
     "UNCASEDESCTOTH": ""
    },{
     "RCVNO": "C1XXXXXXXXX3",
     "CUSTID": "F2XXXXXXX2",
     "CUSTNM": "林ＯＯ",
     "CENCOIN": "10",
     "CENDATE": "2019/10/08",
     "DOCSTATUS": "77",
     "CENCARD": "86 ",
     "UNCASEDESCTOTH": ""
    }]
   },
   "post getStatusCode": 200,
  },
  "isSuccess": true
 },
 "_header_": {
  "success": true,
  "timeCost": 822
 }
}', U_DownTemplate2='',                                                                                                   U_DownTemplate3='{
   "result":{
      "data":[
         {
            "RCVNO":"A1XXXXXXXXX3",
            "CUSTID":"H2XXXXXXX2",
            "CUSTNM":"王ＯＯ",
            "CENCOIN":"10",
            "CENDATE":"2020/10/08",
            "DOCSTATUS":"77",
            "CENCARD":"86 ",
            "UNCASEDESCTOTH":""
         }
      ]
   },
   "post getStatusCode":200,
   "isSuccess":true,
   "_header_":{
      "success":true,
      "timeCost":822
   }
}', FDescription='eloan-信用卡申請案件查詢caCaseQuery',         U_ConnectionId='0100c056-5000-785f-0408-17a384ef45f0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-8b17-060a-17a3bdc93b90', FName='BSIH',         FIndex=43, U_UpTemplate='{
    "name": "BSIH",
    "from": "csr",
    "sessionId": "000-000-000",
    "agentId": "00000000",
    "formData": {
        "ORG": "150",
        "TYPE": "123",
        "CARDNUM": "1234123412341234"
    }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSIH-卡片基本資料',                           U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='ec9b8729-0c00-7932-750a-17a3cb1dcec0', FName='CQ07',         FIndex=44, U_UpTemplate='{
   "name" : "CQ07tbbapi",
   "from" : "csr",
   "sessionId" : UENetBankRLLinkForm.sessionId,
   "agentId" : UENetBankRLLinkForm.agentId,
   "formData" : {
	"CORIDN" : form.getFieldValue("U_RLUID"),
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ07-企業網路銀行關係戶連結檔',               U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-8b17-060a-17a3d04e5930', FName='CQ01',         FIndex=45, U_UpTemplate='{
   "name" : "CQ01",
   "from" : "csr",
   "sessionId" : UVoiceHistoryForm.sessionId,
   "agentId" : UVoiceHistoryForm.agentId,
   "formData" : {
	"CUSIDN" : "A123456789"
   }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='CQ01-約定轉帳帳號檔',                         U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-9402-910b-17a4102a2dc0', FName='BSNL',         FIndex=46, U_UpTemplate='{
    "name": "BSNL",
    "from": "csr",
    "sessionId": "000-000-000",
    "agentId": "00000000",
    "formData": {
        "NAMECH": "王大明"
    }
}', U_DownTemplate1='',                                                                                                   U_DownTemplate2='',                                                                                                   U_DownTemplate3='',                                                                                                   FDescription='BSNL-客戶中文姓名及特約商店',                 U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
--/電文樣板--------------------------------------------------------


--Tiffany字典------------------------------------------------------
--TBB-網銀主檔-資料狀態--------------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2def298a0', FName='TBB-網銀主檔-資料狀態', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2def65e30', FIndex=1, FParentValue=null, FText='未啟用', FValue='空白';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2def662c0', FIndex=2, FParentValue=null, FText='已啟用', FValue='A';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2def298a0', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2def664f0', FIndex=3, FParentValue=null, FText='已關閉', FValue='D';
--/TBB-網銀主檔-資料狀態-------------------------------------------

--TBB-網銀主檔-約定書類別------------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2dee60560', FName='TBB-網銀主檔-約定書類別', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deeca0c0', FIndex=1, FParentValue=null, FText='約定書版號一', FValue='1';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deeca440', FIndex=2, FParentValue=null, FText='約定書版號二', FValue='2';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deeca570', FIndex=3, FParentValue=null, FText='約定書版號三', FValue='3';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deeca6f0', FIndex=4, FParentValue=null, FText='約定書版號四', FValue='4';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deeca840', FIndex=5, FParentValue=null, FText='約定書版號五', FValue='5';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deecaaf0', FIndex=6, FParentValue=null, FText='約定書版號六', FValue='6';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deecac90', FIndex=7, FParentValue=null, FText='約定書版號七', FValue='7';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dee60560', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deecadf0', FIndex=8, FParentValue=null, FText='約定書版號八', FValue='8';
--/TBB-網銀主檔-約定書類別-----------------------------------------

--TBB-網銀主檔-是否同意顯示手機號碼--------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2ded5e9e0', FName='TBB-網銀主檔-是否同意顯示手機號碼', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2ded5e9e0', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deded2f0', FIndex=1, FParentValue=null, FText='是', FValue='Y';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2ded5e9e0', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2deded790', FIndex=2, FParentValue=null, FText='否', FValue='N';
--/TBB-網銀主檔-是否同意顯示手機號碼-------------------------------

--TBB-網銀主檔-客戶性質別------------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2defbd780', FName='TBB-網銀主檔-客戶性質別', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2defbd780', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2defe3f70', FIndex=1, FParentValue=null, FText='行員', FValue='Y';
--/TBB-網銀主檔-客戶性質別-----------------------------------------

--TBB-網銀主檔-行動銀行目前狀態------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-7932-750a-17a3d32ed710', FName='TBB-網銀主檔-行動銀行目前狀態', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-7932-750a-17a3d32ed710', FEnabled=1, FId='ec9b8729-0c00-7932-750a-17a3d3385690', FIndex=1, FParentValue=null, FText='未啟用', FValue='空白';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-7932-750a-17a3d32ed710', FEnabled=1, FId='ec9b8729-0c00-7932-750a-17a3d33860f0', FIndex=2, FParentValue=null, FText='已啟用', FValue='A';
--/TBB-網銀主檔-行動銀行目前狀態-----------------------------------

--TBB-網銀主檔-安全機制碼------------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2df059220', FName='TBB-網銀主檔-安全機制碼', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2df152400', FIndex=1, FParentValue=null, FText='已變更簽入密碼', FValue='1';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2df152730', FIndex=2, FParentValue=null, FText='已變更交易密碼', FValue='2';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2df152880', FIndex=3, FParentValue=null, FText='ＯＴＰ',         FValue='3';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2df152ae0', FIndex=4, FParentValue=null, FText='數位存款帳戶',   FValue='4';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2df059220', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2df152c40', FIndex=5, FParentValue=null, FText='IDGATE',         FValue='5';
--/TBB-網銀主檔-安全機制碼-----------------------------------------

--TBB-XML憑證資料檔-申請電子票據業務註記---------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2dbba2900', FName='TBB-XML憑證資料檔-申請電子票據業務註記', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbba2900', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbbe6660', FIndex=1, FParentValue=null, FText='未申請', FValue='空白';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbba2900', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbbe6b20', FIndex=2, FParentValue=null, FText='正常',   FValue='A';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbba2900', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbbe6ef0', FIndex=3, FParentValue=null, FText='終止',   FValue='D';
--/TBB-XML憑證資料檔-申請電子票據業務註記--------------------------

--TBB-XML憑證資料檔-票交所電子憑證狀態-----------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2dbab4770', FName='TBB-XML憑證資料檔-票交所電子憑證狀態', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbab4770', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbb27e10', FIndex=1, FParentValue=null, FText='未啟用', FValue='空白';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbab4770', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbb28ab0', FIndex=2, FParentValue=null, FText='正常',   FValue='A';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dbab4770', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dbb28d30', FIndex=3, FParentValue=null, FText='終止',   FValue='D';
--/TBB-XML憑證資料檔-票交所電子憑證狀態----------------------------

--TBB-XML憑證資料檔-櫃檯扣帳已使用---------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-084c-280a-17a2dcf15510', FName='TBB-XML憑證資料檔-櫃檯扣帳已使用', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dcf15510', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dcf48090', FIndex=1, FParentValue=null, FText='是', FValue='Y';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-084c-280a-17a2dcf15510', FEnabled=1, FId='ec9b8729-0c00-084c-280a-17a2dcf487b0', FIndex=2, FParentValue=null, FText='否', FValue='N';
--/TBB-XML憑證資料檔-櫃檯扣帳已使用--------------------------------

--TBB-網路銀行轉帳限額檔-約定註記----------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-957f-080b-17a37ae314b0', FName='TBB-網路銀行轉帳限額檔-約定註記', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-957f-080b-17a37ae314b0', FEnabled=1, FId='ec9b8729-0c00-957f-080b-17a37aeeb0f0', FIndex=1, FParentValue=null, FText='非約定', FValue='0';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-957f-080b-17a37ae314b0', FEnabled=1, FId='ec9b8729-0c00-957f-080b-17a37aeeb8c0', FIndex=2, FParentValue=null, FText='約定',   FValue='1';
--/TBB-網路銀行轉帳限額檔-約定註記---------------------------------

--TBB-XML憑證資料檔-是否已更換2048載具-----------------------------
update TsDictionary set FName='TBB-XML憑證資料檔-是否已更換2048載具' where FId='177f6dbc-e770-0f8c-40b2-9201392884ce';
--TBB-XML憑證資料檔-是否已更換2048載具-----------------------------

--TBB-XML憑證資料檔-是否為2048載具---------------------------------
update TsDictionary set FName='TBB-XML憑證資料檔-是否為2048載具' where FId='177f6db1-0500-0f8c-40b2-9201392884ce';
--TBB-XML憑證資料檔-是否為2048載具---------------------------------

--TBB-網路銀行轉入帳號資料檔-業務類別------------------------------
update TsDictionaryItem set FValue='1' where FId='177f6eb6-4f10-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='2' where FId='177f6eb6-4f50-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='3' where FId='177f6eb6-4f60-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='4' where FId='177f6eb6-4f70-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='5' where FId='177f6eb6-4f80-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='6' where FId='177f6eb6-4f90-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='7' where FId='177f6eb6-4fa0-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='8' where FId='177f6eb6-4fa0-1f8c-40b2-9201392884ce';
--/TBB-網路銀行轉入帳號資料檔-業務類別-----------------------------

--TBB-企業網路銀行關係戶資料檔-業務類別----------------------------
update TsDictionaryItem set FValue='1' where FId='177f6f81-ada0-0f8c-40b2-9201392884ce';
--/TBB-企業網路銀行關係戶資料檔-業務類別---------------------------

--TBB-企業網路銀行關係戶轉帳約定資料檔-業務類別--------------------
update TsDictionaryItem set FValue='2' where FId='177f713e-6fc0-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='3' where FId='177f713e-7020-0f8c-40b2-9201392884ce';
update TsDictionaryItem set FValue='8' where FId='177f713e-7040-0f8c-40b2-9201392884ce';
--/TBB-企業網路銀行關係戶轉帳約定資料檔-業務類別-------------------
--/Tiffany字典-----------------------------------------------------


--Hsin字典---------------------------------------------------------
--- TBB-信用卡申請案件查詢-查詢條件 ---
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0100c056-5000-785f-0408-17a38008b570', FName='TBB-信用卡申請案件查詢-查詢條件', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a38008b570', FEnabled=1, FId='0100c056-5000-785f-0408-17a380264c00', FIndex=1, FParentValue=null, FText='身分證字號', FValue='1';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a38008b570', FEnabled=1, FId='0100c056-5000-785f-0408-17a380265040', FIndex=2, FParentValue=null, FText='收件編號',   FValue='2';

--- TBB-信用卡申請案件查詢-審核結果 ---
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0100c056-5000-785f-0408-17a380820050', FName='TBB-信用卡申請案件查詢-審核結果', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985740', FIndex=1, FParentValue=null, FText='案件作業中', FValue='0';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985ad0', FIndex=2, FParentValue=null, FText='案件作業中', FValue='1';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985b70', FIndex=3, FParentValue=null, FText='案件作業中', FValue='11';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985c00', FIndex=4, FParentValue=null, FText='案件作業中', FValue='22';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985ca0', FIndex=5, FParentValue=null, FText='案件作業中', FValue='33';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985d40', FIndex=6, FParentValue=null, FText='拒收',       FValue='29';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985df0', FIndex=7, FParentValue=null, FText='補件',       FValue='39';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985e80', FIndex=8, FParentValue=null, FText='取消',       FValue='49';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-785f-0408-17a380820050', FEnabled=1, FId='0100c056-5000-785f-0408-17a380985f20', FIndex=9, FParentValue=null, FText='已結案',     FValue='77';
--/Hsin字典--------------------------------------------------------


--Lillian字典------------------------------------------------------
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-TYPE', FParentId=null, FTextAsValue=0 where FId='17800506-b440-0344-3fe7-005056c00008';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-PA', FParentId=null, FTextAsValue=0        		where FId='177f7568-9d70-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-繳款方式', FParentId=null, FTextAsValue=0  		where FId='177f754c-0dc0-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-催收', FParentId=null, FTextAsValue=0      		where FId='17800317-2930-047c-7a6c-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-帳戶別', FParentId=null, FTextAsValue=0    		where FId='177f7533-d830-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-客戶屬性', FParentId=null, FTextAsValue=0  		where FId='177f7558-9bd0-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='',  FName='TBB-信用卡卡片狀態查詢-信用卡取卡方式', FParentId=null, FTextAsValue=0	where FId='177f7577-b0a0-0f8c-40b2-9201392884ce';

--TBB-信用卡卡片狀態查詢-分行代號說明
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FName='TBB-信用卡卡片狀態查詢-分行代號說明', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f3773d70', FIndex=1,   FParentValue=null, FText='中和',     FValue='002';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fce0', FIndex=2,   FParentValue=null, FText='博愛',     FValue='003';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd00', FIndex=3,   FParentValue=null, FText='北桃園',   FValue='004';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd20', FIndex=4,   FParentValue=null, FText='南崁',     FValue='005';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd30', FIndex=5,   FParentValue=null, FText='西屯',     FValue='006';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd40', FIndex=6,   FParentValue=null, FText='忠明',     FValue='007';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd60', FIndex=7,   FParentValue=null, FText='金門',     FValue='009';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fd80', FIndex=8,   FParentValue=null, FText='營業部',   FValue='010';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fdb0', FIndex=9,   FParentValue=null, FText='大雅',     FValue='011';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fdc0', FIndex=10,  FParentValue=null, FText='仁大',     FValue='012';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fde0', FIndex=11,  FParentValue=null, FText='仁愛',     FValue='020';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fdf0', FIndex=12,  FParentValue=null, FText='松山',     FValue='021';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fe10', FIndex=13,  FParentValue=null, FText='建成',     FValue='022';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fe20', FIndex=14,  FParentValue=null, FText='士林',     FValue='023';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fe60', FIndex=15,  FParentValue=null, FText='永和',     FValue='024';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fe80', FIndex=16,  FParentValue=null, FText='新店',     FValue='025';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fe90', FIndex=17,  FParentValue=null, FText='新莊',     FValue='026';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565fed0', FIndex=18,  FParentValue=null, FText='化成',     FValue='027';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f565ff20', FIndex=19,  FParentValue=null, FText='信託部',   FValue='030';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660050', FIndex=20,  FParentValue=null, FText='松江',     FValue='040';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56600d0', FIndex=21,  FParentValue=null, FText='國際部',   FValue='041';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660110', FIndex=22,  FParentValue=null, FText='台北',     FValue='050';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660130', FIndex=23,  FParentValue=null, FText='萬華',     FValue='060';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660150', FIndex=24,  FParentValue=null, FText='南台北',   FValue='061';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660170', FIndex=25,  FParentValue=null, FText='復興',     FValue='070';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660190', FIndex=26,  FParentValue=null, FText='中山',     FValue='080';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56601c0', FIndex=27,  FParentValue=null, FText='建國',     FValue='081';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56601f0', FIndex=28,  FParentValue=null, FText='內湖',     FValue='082';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660210', FIndex=29,  FParentValue=null, FText='南京東路', FValue='090';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660240', FIndex=30,  FParentValue=null, FText='忠孝',     FValue='100';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660270', FIndex=31,  FParentValue=null, FText='世貿',     FValue='102';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660290', FIndex=32,  FParentValue=null, FText='永春',     FValue='103';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56602c0', FIndex=33,  FParentValue=null, FText='南港',     FValue='105';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56602f0', FIndex=34,  FParentValue=null, FText='松南',     FValue='110';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660310', FIndex=35,  FParentValue=null, FText='東湖',     FValue='111';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660320', FIndex=36,  FParentValue=null, FText='大安',     FValue='120';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660340', FIndex=37,  FParentValue=null, FText='雙和',     FValue='121';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660360', FIndex=38,  FParentValue=null, FText='錦和',     FValue='122';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660380', FIndex=39,  FParentValue=null, FText='五股',     FValue='130';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56603a0', FIndex=40,  FParentValue=null, FText='林口',     FValue='131';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56603c0', FIndex=41,  FParentValue=null, FText='東林口',   FValue='132';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56603f0', FIndex=42,  FParentValue=null, FText='板橋',     FValue='140';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660400', FIndex=43,  FParentValue=null, FText='樹林',     FValue='141';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660430', FIndex=44,  FParentValue=null, FText='土城',     FValue='142';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660450', FIndex=45,  FParentValue=null, FText='迴龍',     FValue='143';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660470', FIndex=46,  FParentValue=null, FText='汐止',     FValue='144';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660490', FIndex=47,  FParentValue=null, FText='三峽',     FValue='148';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56604b0', FIndex=48,  FParentValue=null, FText='基隆',     FValue='150';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56604d0', FIndex=49,  FParentValue=null, FText='埔墘',     FValue='151';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56604f0', FIndex=50,  FParentValue=null, FText='北三重',   FValue='152';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660500', FIndex=51,  FParentValue=null, FText='南三重',   FValue='153';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660520', FIndex=52,  FParentValue=null, FText='蘆洲',     FValue='154';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660540', FIndex=53,  FParentValue=null, FText='宜蘭',     FValue='160';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660560', FIndex=54,  FParentValue=null, FText='羅東',     FValue='170';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660580', FIndex=55,  FParentValue=null, FText='蘇澳',     FValue='171';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56605a0', FIndex=56,  FParentValue=null, FText='楊梅',     FValue='290';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56605d0', FIndex=57,  FParentValue=null, FText='湖口',     FValue='291';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660610', FIndex=58,  FParentValue=null, FText='桃園',     FValue='300';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e1c-17a2f5660610', FIndex=59,  FParentValue=null, FText='大園',     FValue='301';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660650', FIndex=60,  FParentValue=null, FText='大溪',     FValue='302';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660670', FIndex=61,  FParentValue=null, FText='中壢',     FValue='310';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e1c-17a2f5660670', FIndex=62,  FParentValue=null, FText='內壢',     FValue='311';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660850', FIndex=63,  FParentValue=null, FText='新明',     FValue='312';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e1c-17a2f5660850', FIndex=64,  FParentValue=null, FText='東桃園',   FValue='313';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660860', FIndex=65,  FParentValue=null, FText='新屋',     FValue='315';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660880', FIndex=66,  FParentValue=null, FText='新竹',     FValue='320';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56608a0', FIndex=67,  FParentValue=null, FText='竹北',     FValue='321';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e1c-17a2f56608a0', FIndex=68,  FParentValue=null, FText='竹科',     FValue='322';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56608b0', FIndex=69,  FParentValue=null, FText='八德',     FValue='330';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56608c0', FIndex=70,  FParentValue=null, FText='龍潭',     FValue='332';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56608d0', FIndex=71,  FParentValue=null, FText='竹東',     FValue='340';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f56608e0', FIndex=72,  FParentValue=null, FText='竹南',     FValue='350';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660900', FIndex=73,  FParentValue=null, FText='頭份',     FValue='351';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660930', FIndex=74,  FParentValue=null, FText='苗栗',     FValue='360';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660940', FIndex=75,  FParentValue=null, FText='豐原',     FValue='460';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660960', FIndex=76,  FParentValue=null, FText='太平',     FValue='470';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660bd0', FIndex=77,  FParentValue=null, FText='大甲',     FValue='480';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660bf0', FIndex=78,  FParentValue=null, FText='沙鹿',     FValue='482';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c00', FIndex=79,  FParentValue=null, FText='烏日',     FValue='483';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c20', FIndex=80,  FParentValue=null, FText='台中',     FValue='490';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c40', FIndex=81,  FParentValue=null, FText='民權',     FValue='491';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c50', FIndex=82,  FParentValue=null, FText='興中',     FValue='500';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c60', FIndex=83,  FParentValue=null, FText='北屯',     FValue='501';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c70', FIndex=84,  FParentValue=null, FText='南投',     FValue='510';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c80', FIndex=85,  FParentValue=null, FText='草屯',     FValue='511';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660c90', FIndex=86,  FParentValue=null, FText='埔里',     FValue='520';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ca0', FIndex=87,  FParentValue=null, FText='潭子',     FValue='521';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660cc0', FIndex=88,  FParentValue=null, FText='竹山',     FValue='530';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660cd0', FIndex=89,  FParentValue=null, FText='彰化',     FValue='540';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ce0', FIndex=90,  FParentValue=null, FText='和美',     FValue='541';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d00', FIndex=91,  FParentValue=null, FText='員林',     FValue='550';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d10', FIndex=92,  FParentValue=null, FText='北斗',     FValue='560';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d20', FIndex=93,  FParentValue=null, FText='二林',     FValue='561';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d30', FIndex=94,  FParentValue=null, FText='斗六',     FValue='660';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d40', FIndex=95,  FParentValue=null, FText='北港',     FValue='670';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d50', FIndex=96,  FParentValue=null, FText='虎尾',     FValue='671';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d60', FIndex=97,  FParentValue=null, FText='嘉義',     FValue='680';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d70', FIndex=98,  FParentValue=null, FText='民雄',     FValue='681';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d80', FIndex=99,  FParentValue=null, FText='嘉新',     FValue='686';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660d90', FIndex=100, FParentValue=null, FText='新營',     FValue='690';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660da0', FIndex=101, FParentValue=null, FText='開元',     FValue='691';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660db0', FIndex=102, FParentValue=null, FText='永康',     FValue='700';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e1c-17a2f5660db0', FIndex=103, FParentValue=null, FText='學甲',     FValue='701';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660dc0', FIndex=104, FParentValue=null, FText='善化',     FValue='702';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660dd0', FIndex=105, FParentValue=null, FText='永大',     FValue='703';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660de0', FIndex=106, FParentValue=null, FText='台南',     FValue='710';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660df0', FIndex=107, FParentValue=null, FText='仁德',     FValue='711';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e10', FIndex=108, FParentValue=null, FText='成功',     FValue='720';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e20', FIndex=109, FParentValue=null, FText='東台南',   FValue='721';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e50', FIndex=110, FParentValue=null, FText='安平',     FValue='730';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e60', FIndex=111, FParentValue=null, FText='花蓮',     FValue='760';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e70', FIndex=112, FParentValue=null, FText='台東',     FValue='770';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660e90', FIndex=113, FParentValue=null, FText='東高雄',   FValue='820';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660eb0', FIndex=114, FParentValue=null, FText='岡山',     FValue='830';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ec0', FIndex=115, FParentValue=null, FText='北鳳山',   FValue='840';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ee0', FIndex=116, FParentValue=null, FText='苓雅',     FValue='841';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ef0', FIndex=117, FParentValue=null, FText='高雄',     FValue='850';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f00', FIndex=118, FParentValue=null, FText='北高雄',   FValue='851';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f20', FIndex=119, FParentValue=null, FText='大昌',     FValue='852';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f40', FIndex=120, FParentValue=null, FText='前鎮',     FValue='853';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f50', FIndex=121, FParentValue=null, FText='九如',     FValue='860';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f70', FIndex=122, FParentValue=null, FText='三民',     FValue='870';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660f80', FIndex=123, FParentValue=null, FText='鳳山',     FValue='880';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660fb0', FIndex=124, FParentValue=null, FText='大發',     FValue='881';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660fd0', FIndex=125, FParentValue=null, FText='屏東',     FValue='890';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660fe0', FIndex=126, FParentValue=null, FText='小港',     FValue='891';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-6813-0e0c-17a2f35ca5d0', FEnabled=1, FId='0800c056-5000-6813-0e0c-17a2f5660ff0', FIndex=127, FParentValue=null, FText='潮州',     FValue='892';

--TBB-信用卡卡片狀態查詢-繳款評等
insert into TsDictionary set FBuiltin=0, FDescription='', FId='2eda0929-0c00-9c71-8308-17a37c9b6270', FName='TBB-信用卡卡片狀態查詢-繳款評等', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caeefa0', FIndex=1,  FParentValue=null, FText='有帳單，但繳款金額0', FValue='0';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caef7e0', FIndex=2,  FParentValue=null, FText='繳足最低金額',        FValue='1';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caef9f0', FIndex=3,  FParentValue=null, FText='逾期30天',            FValue='2';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caefb50', FIndex=4,  FParentValue=null, FText='逾期60天',            FValue='3';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caefca0', FIndex=5,  FParentValue=null, FText='逾期90天',            FValue='4';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caefea0', FIndex=6,  FParentValue=null, FText='逾期120天',           FValue='5';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caeffe0', FIndex=7,  FParentValue=null, FText='逾期150天',           FValue='6';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caf01a0', FIndex=8,  FParentValue=null, FText='逾期180天',           FValue='7';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caf0360', FIndex=9,  FParentValue=null, FText='逾期210天',           FValue='8';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a37caf04e0', FIndex=10, FParentValue=null, FText='逾期240天',           FValue='9';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a3841e6580', FIndex=11, FParentValue=null, FText='有帳單，全額繳清',    FValue='B';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-9c71-8308-17a37c9b6270', FEnabled=1, FId='2eda0929-0c00-9c71-8308-17a3841e6d80', FIndex=12, FParentValue=null, FText='無消費無帳單',        FValue='Z';
--/Lillian字典-----------------------------------------------------


--通知列表---------------------------------------------------------
insert into TsNotice set FId='0800c056-5000-6419-220f-157ffe761890', FSubject='未收到帳單查詢申請書-客服二線審核退回',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：未收到帳單查詢申請書-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='029eae0b-22ac-4d62-a202-1584d4dfed00', FSubject='預借現金密碼函-客服襄理審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<div>
	&nbsp;${recipient.FName}：<br />
&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。<br />
&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：預借現金密碼函-客服襄理審核退回。<br />
&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}&nbsp;
</div>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='029eae0b-22ac-4d62-a202-1584d58009a0', FSubject='信用卡額度調整單-客服襄理審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：信用卡額度調整單-客服襄理審核退回。<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='029eae0b-22ac-4d62-a202-1584d5b56790', FSubject='信用卡額度調整單-風控襄理審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：信用卡額度調整單-風控襄理審核退回。<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='029eae0b-22ac-4d62-a202-1584d5ed8630', FSubject='風管科客戶問題單-客服襄理審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<div>
	&nbsp;${recipient.FName}：<br />
&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。<br />
&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：風管科客戶問題單-客服襄理審核退回。<br />
&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}&nbsp;
</div>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='029eae0b-22ac-4d62-a202-1584d62442a0', FSubject='風管科客戶問題單-風控襄理審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<div>
	&nbsp;${recipient.FName}：<br />
&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。<br />
&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：風管科客戶問題單-風控襄理審核退回。<br />
&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}&nbsp;
</div>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-e579-8c09-15861ee48b90', FSubject='預借現金密碼函-作業科襄理審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：預借現金密碼函-作業科襄理審核退回</span><br />
<span>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-e579-8c09-158623a38ea0', FSubject='信用卡額度調整單-客服二線審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：信用卡額度調整單-客服二線審核退回。</span><br />
<span>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-e579-8c09-158623a8c760', FSubject='信用卡額度調整單-客服二線審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：信用卡額度調整單-客服二線審核通過。</span><br />
<span>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-e579-8c09-158623caa940', FSubject='信用卡額度調整單-風控襄理審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：信用卡額度調整單-風控襄理審核通過。</span><br />
<span>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-e579-8c09-158623f8d360', FSubject='信用卡額度調整單-風管科審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡額度調整單-風管科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-fa32-2f06-15889b107a30', FSubject='風管科客戶問題單-風控襄理審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>&nbsp;${recipient.FName}：</span><br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。</span><br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：風管科客戶問題單-風控襄理審核退回。</span><br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}&nbsp;</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-064a-4801-158d89db3e00', FSubject='信用卡來電分期及提前清償申請單-客服襄理審核通過',             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="font-size:13.33px;">${recipient.FName}：</span><br />
<span style="font-size:13.33px;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-客服襄理審核通過
</p>
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-064a-4801-158d89eb8220', FSubject='信用卡來電分期及提前清償申請單-客服襄理審核退回',             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="font-size:13.33px;">${recipient.FName}：</span><br />
<span style="font-size:13.33px;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-客服襄理審核退回
</p>
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-064a-4801-158d8a939900', FSubject='信用卡來電分期及提前清償申請單-作業科襄理審核通過',           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="font-size:13.33px;">${recipient.FName}：</span><br />
<span style="font-size:13.33px;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-<span style="font-size:13.33px;">作業科襄理審核通過</span> 
</p>
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0ca0b23c-8478-064a-4801-158d8aaca400', FSubject='信用卡來電分期及提前清償申請單-作業科襄理審核退回',           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="font-size:13.33px;">${recipient.FName}：</span><br />
<span style="font-size:13.33px;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-<span style="font-size:13.33px;">作業科襄理審核退回</span> 
</p>
<p style="font-size:13.33px;">
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='785ffbb9-bb02-493e-a708-15c521c0e1ca', FSubject='臨時額度調整單-風管科審核通過',                               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：臨時額度調整單-風管科審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-870f-8204-17a36e3bcc90', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀客服一線(覆核)退回',     FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀客服一線(覆核)退回</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-870f-8204-17a36e715a70', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀客服二線退回',           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀客服二線退回</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-870f-8204-17a36e8b8ec0', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀作業科人員退回',         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀作業科人員退回</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-785f-0408-17a37eddc280', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀客服一線(覆核)審核通過', FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀客服一線(覆核)審核通過</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-785f-0408-17a37f0cc2c0', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀客服二線審核通過',       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀客服二線審核通過</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0100c056-5000-785f-0408-17a37f4b2010', FSubject='信用卡/一卡通/聯名卡停卡申請單-臺企銀作業科人員審核通過',     FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<p>${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。</p>

<p>&nbsp; &nbsp; 流程名稱：信用卡/一卡通/聯名卡停卡申請單-臺企銀作業科人員審核通過</p>

<p>&nbsp; &nbsp; 完成時間：${process.FCreateTime}</p>
', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='56ada4ed-2c26-4cb7-956b-1b17e0750d8f', FSubject='利息違約金減免單-客服二線/催收二線審核通過',                  FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-客服二線/催收二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='4d9c8392-4344-4cb1-b2e0-1c6af2fc0f2d', FSubject='機場停車預約單-客服二線審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：機場停車預約單-客服二線審核通退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ec353032-073a-4a55-92e9-1c7f67a42122', FSubject='風管科客戶問題單-風管科審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：風管科客戶問提單-風管科審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a9f80b4c-373e-47b6-a8bd-1f7a05cb2fa7', FSubject='調閱帳單-客服二線審核退回',                                   FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：調閱帳單-客服二線審核退回<br />
&nbsp;&nbsp;&nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='e0f0bc6d-cac4-4790-85a3-20fd2f9d54e7', FSubject='利息違約金減免單-作業科審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-作業科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='4b0c7be9-f334-4eed-a785-2608c696f902', FSubject='轉介客戶抱怨單-客服二線審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：轉介客戶抱怨單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='94301ea1-13f7-4c37-bffa-28a273532d01', FSubject='機場新貴通卡申請單-客服二線審核通過',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='8760f209-463a-4657-8d34-2a1fe1fbc923', FSubject='風管科客戶問題單-客服二線審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：風管科客戶問提單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='7302e5ca-fdbc-4e20-b379-3e3c8316d831', FSubject='利息違約金減免單-作業科審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-作業科審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='8f9c81e7-d2d6-49d6-a974-463828f79aa6', FSubject='機場新貴通卡申請單-客服二線審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='27f66d1f-9515-4f28-ab2e-69bda5f68d7c', FSubject='預借現金密碼函-作業科審核退回',                               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：預借現金密碼函-作業科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0c310538-8ccc-40b3-bb35-6ff53cf30162', FSubject='信用卡來電分期及提前清償申請單-客服二線審核通過',             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='0591f6c8-0859-43f7-baf3-77ef7b0bc10b', FSubject='風管科客戶問題單-風管科審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：風管科客戶問提單-風管科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a986fed1-5680-47a2-84ff-817e96256189', FSubject='帳務組客戶問題單-客服二線/催收二線審核退回',                  FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-客服二線/催收二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='2030b1a7-4522-4991-b3b8-95f2de97ea26', FSubject='帳務組客戶問題單-客服二線/催收二線審核通過',                  FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-客服二線/催收二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='c55e7210-5a63-40fa-ad7e-9bbfdad59a6d', FSubject='臨時額度調整單-客服二線審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：臨時額度調整單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='2977bcfa-3e6f-4391-938d-9fd5be94577e', FSubject='帳務組客戶問題單-作業科審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-作業科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='aa418adf-d682-4397-b34a-ac26833f0787', FSubject='預借現金密碼函-作業科審核通過',                               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：預借現金密碼函-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='5c893ebc-a471-4434-825d-b021805871ea', FSubject='臨時額度調整單-風管科審核退回',                               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：臨時額度調整單-風管科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='146ebbec-a291-4a16-85ca-b049fde625a7', FSubject='風管科客戶問題單-客服二線審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：風管科客戶問提單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='6f0e2a75-4b00-46cf-88ab-b6b8dd3c3f36', FSubject='基本資料變更申請單-客服二線審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='9b738d75-ae52-43b7-a723-bdaed376a6b0', FSubject='機場停車預約單-客服二線審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：機場停車預約單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a4a12956-d036-489d-8bf8-c2903097d3ba', FSubject='信用卡來電分期及提前清償申請單-客服二線審核退回',             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='4da31b2a-e898-4b15-9496-c4f250d3ca34', FSubject='臨時額度調整單-客服二線審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：臨時額度調整單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ee94cc41-c5c9-485a-891e-c920c2dd31fc', FSubject='調閱帳單-客服二線審核通過',                                   FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：調閱帳單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='1dd35600-eeda-4246-ba48-c933a96cf764', FSubject='轉介客戶抱怨單-客服二線審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：轉介客戶抱怨單-客服二線審核通過<br />
&nbsp;&nbsp;&nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='b726083c-6d3a-41b8-a27d-d146404b3fe7', FSubject='預借現金密碼函-客服二線審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：預借現金密碼函-客服二線審核退回。<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a3d35c2b-1668-4764-8f6d-d31eb09465fd', FSubject='帳務組客戶問題單-作業科審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-作業科審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a5dfee8a-26e0-4e2f-adf0-d5b669ecb846', FSubject='預借現金密碼函-客服二線審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：預借現金密碼函-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='fc3d9fd3-ee2a-4970-9def-e4641a9a2c9e', FSubject='利息違約金減免單-客服二線/催收二線審核退回',                  FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-客服二線/催收二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='f67e3df4-de7a-4221-b794-f29013232226', FSubject='信用卡來電分期及提前清償申請單-作業科審核退回',               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-作業科審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='abdd7c2d-d3fc-4314-a4c7-f59ab0c943bc', FSubject='信用卡來電分期及提前清償申請單-作業科審核通過',               FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡來電分期及提前清償申請單-作業科審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='93303d13-66e5-4c79-9d11-f77b3d893e54', FSubject='基本資料變更申請單-客服二線審核通過',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='440f4dea-516f-4220-bca5-fc3adf3bc036', FSubject='信用卡部轉介單-客服二線審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡部轉介單-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='987cbf6a-ae88-47c8-902c-fdffd88fe446', FSubject='信用卡部轉介單-客服二線審核退回',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡部轉介單-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ad7a10c2-f712-0068-0284-ffffff157754', FSubject='基本資料變更申請單-客服襄理審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-客服襄理審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ad7a10c2-f712-0030-dcb0-ffffff157754', FSubject='基本資料變更申請單-客服襄理審核同意',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-客服襄理審核同意
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ad7a10c2-f712-0050-883d-ffffff157772', FSubject='基本資料變更申請單-作業科人員審核退回',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-作業科人員審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ad7a10c2-f712-0010-c31d-ffffff157772', FSubject='基本資料變更申請單-作業科襄理審核通過',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-作業科襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ad7a1060-086a-0230-f756-ffffff157b30', FSubject='基本資料變更申請單-作業科襄理審核退回',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：基本資料變更申請單-作業科襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c4440-eba7-0740-67b5-ffffff157ffe', FSubject='金融端掛失-客服二線審核退回',                                 FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：金融端掛失-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c4440-eba7-0728-e935-ffffff157fff', FSubject='金融端掛失-客服二線審核通過',                                 FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：金融端掛失-客服二線審核通過</span><br />
<span>&nbsp;&nbsp;&nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c4440-eba7-0740-69ed-ffffff158001', FSubject='信用卡掛失-客服二線審核退回',                                 FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：信用卡掛失-客服二線審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c4440-eba7-0710-83b0-ffffff158002', FSubject='信用卡掛失-客服二線審核通過',                                 FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span>&nbsp; &nbsp; 流程名稱：信用卡掛失-客服二線審核通過</span><br />
<span>&nbsp;&nbsp;&nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0028-6112-ffffff158043', FSubject='未收到帳單查詢申請書-客服二線審核通過',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：未收到帳單查詢申請書-客服二線審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0078-7bb2-ffffff158049', FSubject='帳務組客戶問題單-臺企銀客服/催收襄理審核退回',                FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-臺企銀客服/催收襄理審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0068-af95-ffffff158049', FSubject='帳務組客戶問題單-臺企銀客服/催收襄理審核通過',                FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-臺企銀客服/催收襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5aa1-9c69-0510-48ee-ffffff15804a', FSubject='調閱帳單-客服襄理審核退回',                                   FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<div>
	&nbsp;${recipient.FName}：<br />
&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。<br />
&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：調閱帳單-客服襄理審核退回<br />
&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}<br />
</div>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0020-6756-ffffff15804a', FSubject='帳務組客戶問題單-作業科襄理審核通過',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-作業科襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0020-8966-ffffff15804a', FSubject='帳務組客戶問題單-作業科襄理審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：帳務組客戶問題單-作業科襄理審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0060-2f32-ffffff15804b', FSubject='利息違約金減免單-臺企銀客服/催收襄理審核退回',                FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-臺企銀客服/催收襄理審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5aa1-9c69-0568-632f-ffffff15804b', FSubject='調閱帳單-客服襄理審核通過',                                   FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<div>
	&nbsp;${recipient.FName}：<br />
&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。<br />
&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：調閱帳單-客服襄理審核通過<br />
&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}<br />
</div>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0038-7e3e-ffffff15804b', FSubject='利息違約金減免單-臺企銀客服/催收襄理審核通過',                FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-臺企銀客服/催收襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0070-8b98-ffffff15804b', FSubject='利息違約金減免單-作業科襄理審核通過',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-作業科襄理審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='ff1c44bd-0309-0010-eb9f-ffffff15804b', FSubject='利息違約金減免單-作業科襄理審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span>${recipient.FName}：</span><br />
<span>&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<p>
	&nbsp; &nbsp; 流程名稱：利息違約金減免單-作業科襄理審核退回
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5a2d-31d0-0270-1bf6-ffffff158091', FSubject='預借現金密碼函-客服襄理審核通過',                             FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：預借現金密碼函-客服襄理審核通過<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5a2d-31d0-0218-8c8a-ffffff158092', FSubject='預借現金密碼函-作業科襄理審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：預借現金密碼函-作業科襄理審核通過<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}<br />', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5a2d-31d0-0200-b01d-ffffff158093', FSubject='信用卡額度調整單-客服襄理審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;">${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：信用卡額度調整單-客服襄理審核通過<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}<br />
</span><span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;"></span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='a14a5a2d-31d0-0228-e11f-ffffff158095', FSubject='風管科客戶問題單-客服襄理審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;">${recipient.FName}：</span><br />
<span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;">&nbsp;&nbsp;&nbsp;&nbsp;您提交的流程已經完成。</span><br />
<span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;">&nbsp;&nbsp;&nbsp;&nbsp;流程名稱：風管科客戶問題單-客服襄理審核通過</span><br />
<span style="line-height:normal;font-family:微软雅黑, &quot;font-size:13px;background-color:#FFEDC4;">&nbsp;&nbsp;&nbsp;&nbsp;完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da333d-ac06-0300-1dd0-ffffff16cd21', FSubject='機場新貴通卡申請單-作業科襄理審核退回',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">${recipient.FName}：</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-作業科襄理審核退回</span><br />
<br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da333d-ac06-0368-5d52-ffffff16cd21', FSubject='機場新貴通卡申請單-客服主管審核退回',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">${recipient.FName}：</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-客服主管審核退回</span><br />
<br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da333d-ac06-0340-80ae-ffffff16cd21', FSubject='機場新貴通卡申請單-作業科審核通過',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">${recipient.FName}：</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-作業科審核通過</span><br />
<br />
<span style="color:#000000;font-family:&quot;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da333d-ac06-0340-6c0c-ffffff16cd22', FSubject='機場新貴通卡申請單-作業科審核退回',                           FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=1, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<span style="color:#000000;font-family:&quot;sans serif&quot;, tahoma, verdana, helvetica;font-size:12px;font-style:normal;font-weight:400;">${recipient.FName}：</span><br />
<span style="color:#000000;font-family:&quot;sans serif&quot;, tahoma, verdana, helvetica;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 您提交的流程已經完成。</span><br />
<span style="color:#000000;font-family:&quot;sans serif&quot;, tahoma, verdana, helvetica;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-作業科審核退回</span><br />
<br />
<span style="color:#000000;font-family:&quot;sans serif&quot;, tahoma, verdana, helvetica;font-size:12px;font-style:normal;font-weight:400;">&nbsp; &nbsp; 完成時間：${process.FCreateTime}</span>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da331a-bcea-0518-85e2-ffffff16d004', FSubject='機場新貴通卡申請單-客服主管審核通過',                         FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
<p>
	&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-客服主管審核通過
</p>
<p>
	&nbsp; &nbsp; 完成時間：${process.FCreateTime}
</p>', FEmailBcc='',   FSystemMessageFieldValues='';
insert into TsNotice set FId='83da331a-bcea-0540-1364-ffffff16d005', FSubject='機場新貴通卡申請單-作業科襄理審核通過',                       FSendSystemMessage=0, FSendShortMessage=0, FSendEmail=0, FSystemMessageContent='',                                                                                                   FShortMessageContent='',                                                                                                   FEmailCc='', FEmailContent='<br />
${recipient.FName}：<br />
&nbsp; &nbsp; 您提交的流程已經完成。<br />
&nbsp; &nbsp; 流程名稱：機場新貴通卡申請單-作業科襄理審核通過<br />
&nbsp; &nbsp; 完成時間：${process.FCreateTime}', FEmailBcc='',   FSystemMessageFieldValues='';
--/通知列表--------------------------------------------------------