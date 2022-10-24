---------TBB-簽帳卡功能生效註記
insert into TsDictionary set FBuiltin=0, FDescription='', FId='2eda0929-0c00-e960-be0e-179efa636870', FName='TBB-簽帳卡功能生效註記', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-e960-be0e-179efa636870', FEnabled=1, FId='2eda0929-0c00-e960-be0e-179efa6bb2a0', FIndex=1, FParentValue=null, FText='無暫停', FValue='Y';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-e960-be0e-179efa636870', FEnabled=1, FId='2eda0929-0c00-e960-be0e-179efa6bbac0', FIndex=2, FParentValue=null, FText='暫停',   FValue='N';

-- 聯絡人相關字典改名稱 ---- 
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-性別',       FParentId=null, FTextAsValue=0 where FId='177f73fe-91c0-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-保證人',     FParentId=null, FTextAsValue=0 where FId='177f74bc-39a0-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-帳戶類別',   FParentId=null, FTextAsValue=0 where FId='177f74fb-81b0-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-帳單寄送',   FParentId=null, FTextAsValue=0 where FId='177f7410-cd40-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-接受DM',     FParentId=null, FTextAsValue=0 where FId='177f74a8-9e90-0f8c-40b2-9201392884ce';
update TsDictionary set FBuiltin=0, FDescription='', FName='TBB-聯絡人-預借現金',   FParentId=null, FTextAsValue=0 where FId='177f7481-51e0-0f8c-40b2-9201392884ce';

-- TBB-聯絡人-失聯戶註記 ---- 
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0100c056-5000-5106-a602-17a5b676fb20', FName='TBB-聯絡人-失聯戶註記', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e2ba0', FIndex=1, FParentValue=null, FText='客戶基本資料不全',     FValue='0';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e31e0', FIndex=2, FParentValue=null, FText='聯名戶未註記',         FValue='1';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e3270', FIndex=3, FParentValue=null, FText='總分公司統編未登錄',   FValue='2';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e32f0', FIndex=4, FParentValue=null, FText='同戶名不同統編未確認', FValue='3';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e3370', FIndex=5, FParentValue=null, FText='支票存款失聯戶',       FValue='4';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e33e0', FIndex=6, FParentValue=null, FText='籌備處未處理',         FValue='5';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e3460', FIndex=7, FParentValue=null, FText='盡職調查未完成註記',   FValue='6';
insert into TsDictionaryItem set FDictionaryId='0100c056-5000-5106-a602-17a5b676fb20', FEnabled=1, FId='0100c056-5000-5106-a602-17a5b69e34d0', FIndex=8, FParentValue=null, FText='保留',                 FValue='7';

-- Ecp-聯絡人-對話特徵 ----
update TsDictionaryItem set FDictionaryId='fd3ef6a6-52d3-4335-a94f-2c1b08242d7f', FEnabled=1, FIndex=1, FParentValue=null, FText='VIP重要客戶', FValue='1' where FId='2a696e64-52e1-43c4-b28d-12fb7271abf2';
update TsDictionaryItem set FDictionaryId='fd3ef6a6-52d3-4335-a94f-2c1b08242d7f', FEnabled=0, FIndex=2, FParentValue=null, FText='重度抱怨',    FValue='2' where FId='93e8b37f-d20d-4cf5-8261-504db9aadf27';
update TsDictionaryItem set FDictionaryId='fd3ef6a6-52d3-4335-a94f-2c1b08242d7f', FEnabled=0, FIndex=3, FParentValue=null, FText='脾氣很大',    FValue='3' where FId='aeb60e22-1cbe-40a3-8d82-28cc1f12849a';
update TsDictionaryItem set FDictionaryId='fd3ef6a6-52d3-4335-a94f-2c1b08242d7f', FEnabled=0, FIndex=4, FParentValue=null, FText='騷擾客',      FValue='4' where FId='15c0e7d5-7a07-467a-ae7b-afe867291da2';


-- 電文樣板BSIC ---
insert into TpCUSmCsrTemplate set FId='0100c056-5000-5106-a602-17a5c1be8dd0', FName='BSIC', FIndex=48, U_UpTemplate='{
            "name" : "BSICtbbapi",
            "from" : "csr",
            "sessionId" : ContactFormBTN.sessionId,
            "agentId" : ContactFormBTN.agentId,
            "formData" :{
            "IDNUM" : form.getFieldValue("U_CustID")//統一編號
        }
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='BSIC-查詢客戶基本資料', U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;

-- menu ----
insert into TsMenuNumber set FBold=0, FColor='#0000FF', FFilterSql='', FId='0100c056-5000-7727-8401-17a51230f140', FIndex=48, FMenuId='0100c056-5000-ca09-510a-179e485554f0', FName='待辦工作事項', FQuerySql='select FUserId, count(*) as FCount
from (
 select distinct w.FId as FWorkItemId, u.FId as FUserId
 from TwWorkItem w
  inner join TwParticipant p on p.FWorkItemId = w.FId
  inner join TsUser u on u.FId = p.FUserId or w.FDeputable = 1 and exists (
  select * from TwDeputy
  where FUserId = p.FUserId and FDeputyId = u.FId
 )
  
 where w.FEntityUnitId = ''0100c056-5000-ca09-510a-179e4854e130'' and w.FStatus in (''Drawn'', ''NotDrawn'') and exists (
  select * from TwActivity
 where FId = w.FActivityId and FStatus=''Running''
 )
) t
group by FUserId', FStatusFieldId=null, FStatusValues=null, FType='Custom', FUserFieldId=null;

