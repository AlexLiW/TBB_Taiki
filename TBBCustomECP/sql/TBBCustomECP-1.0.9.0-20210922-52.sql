--TBB.URequestunpaid------------------------------------------------------------

update TsUnit set FHomeClassName='com.chainsea.cus.urequestunpaid.URequestunpaidHome', FDaoClassName='com.chainsea.cus.urequestunpaid.dao.impl.URequestunpaidDaoImpl', FServiceClassName='com.chainsea.cus.urequestunpaid.service.impl.URequestunpaidServiceImpl', FActionClassName='com.chainsea.cus.urequestunpaid.action.impl.URequestunpaidActionImpl' where FId='2eda0929-0c00-8d1e-9704-17a19b7f5e10';

UPDATE TsField set FRequired=0 where FId='2eda0929-0c00-2477-180e-17a1cf79d3d0';

insert into TsFieldGridColumn set FId='c5cfcd29-0c00-4318-150b-17be892ae8c0', FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='卡號',     FKey='U_OCardNum',     FType='String', FIndex=1,  FControls='';

update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='入帳日期', FKey='U_Creditdate',   FType='String', FIndex=2,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfd95350';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='交易日期', FKey='U_Tradingdate',  FType='String', FIndex=3,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfe312e0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='交易摘要', FKey='U_Tradingnote',  FType='String', FIndex=4,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfdc45d0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='國別',     FKey='U_Country',      FType='String', FIndex=5,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfebae60';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='地區',     FKey='U_Area',         FType='String', FIndex=6,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfede050';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='幣別',     FKey='U_Currency',     FType='String', FIndex=7,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cff0d260';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='外幣金額', FKey='U_Foreignmoney', FType='String', FIndex=8,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cff43b20';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='交易代碼', FKey='U_Tradenum',     FType='String', FIndex=9,  FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfe5ebb0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-2477-180e-17a1cfb073c0', FTitle='交易金額', FKey='U_Billamount',   FType='String', FIndex=10, FControls='' where FId='2eda0929-0c00-2477-180e-17a1cfe897e0';


insert into TsToolItem set FId='c5cfcd29-0c00-4318-150b-17be8d590390', FPageId='2eda0929-0c00-8d1e-9704-17a19b7f8c30', FCode='ExcelExport', FName='匯出Excel', FHint=null, FLabel=null, FType='Button', FAlign='right', FIndex=1, FWidth=null, FIcon='quicksilver/image/16/Excel.png', FScale=null, FEntityUnitId=null, FDefaultValue=null, FSubItemSource=null, FDictionaryId=null, FSubItemRoutine='', FVisibleCondition=null, FEnableCondition=null, FHandleType='JavaScript', FHandlePageId=null, FConfirmMessage=null, FDefaultEventHandler='URequestunpaidForm.doExcel()', FChartId=null;

--/TBB.URequestunpaid------------------------------------------------------------



--TBB.ULastyeartrade------------------------------------------------------------
insert into TsFieldGridColumn set FId='c5cfcd29-0c00-6c3b-7c0c-17bf2535ec70', FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='利息',             FKey='U_Interest',             FType='String', FIndex=4,  FControls='';

update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='帳單月份',         FKey='U_BillMonth',            FType='String', FIndex=1,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317d4a790';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='年費筆數',         FKey='U_Annualfee12times',     FType='String', FIndex=2,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317f424a0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='年費金額',         FKey='U_Annualfee12sum',       FType='String', FIndex=3,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317f0cfe0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='違約金筆數',       FKey='U_Breakamo12times',      FType='String', FIndex=5,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317fb1eb0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='違約金金額',       FKey='U_Breakamo12sum',        FType='String', FIndex=6,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317f7bda0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='零售交易筆數',     FKey='U_Retail12times',        FType='String', FIndex=7,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317dd7390';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='零售交易金額',     FKey='U_Retail12sum',          FType='String', FIndex=8,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317d8a290';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='ATM預借現金筆數',  FKey='U_Cashadvance12times',   FType='String', FIndex=9,  FControls='' where FId='2eda0929-0c00-4062-9a02-17a317e62780';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='ATM預借現金金額',  FKey='U_Cashadvance12sum',     FType='String', FIndex=10, FControls='' where FId='2eda0929-0c00-4062-9a02-17a317e18ba0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='預現手續費筆數',   FKey='U_Cashadvperfee12sum',   FType='String', FIndex=11, FControls='' where FId='2eda0929-0c00-4062-9a02-17a31817ffb0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='預現手續費金額',   FKey='U_Cashadvperfee12times', FType='String', FIndex=12, FControls='' where FId='2eda0929-0c00-4062-9a02-17a31813bc60';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='服務費筆數',       FKey='U_Servicecharge12times', FType='String', FIndex=13, FControls='' where FId='2eda0929-0c00-4062-9a02-17a31810c8a0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='服務費金額',       FKey='U_Servicecharge12sum',   FType='String', FIndex=14, FControls='' where FId='2eda0929-0c00-4062-9a02-17a3180c0a80';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='其他手續費筆數',   FKey='U_Otherfee12times',      FType='String', FIndex=15, FControls='' where FId='2eda0929-0c00-4062-9a02-17a31801f600';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='其他手續費金額',   FKey='U_Otherfee12sum',        FType='String', FIndex=16, FControls='' where FId='2eda0929-0c00-4062-9a02-17a317fe9c20';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='超額手續費筆數',   FKey='U_Misccharge12times',    FType='String', FIndex=17, FControls='' where FId='2eda0929-0c00-4062-9a02-17a31808bc60';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='超額手續費金額',   FKey='U_Misccharge12sum',      FType='String', FIndex=18, FControls='' where FId='2eda0929-0c00-4062-9a02-17a318051060';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='臨櫃預借現金筆數', FKey='U_CNTCAMAN',             FType='String', FIndex=19, FControls='' where FId='2eda0929-0c00-4062-9a02-17a317edb5a0';
update TsFieldGridColumn set FFieldId='2eda0929-0c00-4062-9a02-17a317ceaa60', FTitle='臨櫃預借現金金額', FKey='U_CAMAN',                FType='String', FIndex=20, FControls='' where FId='2eda0929-0c00-4062-9a02-17a317e99400';

--/TBB.ULastyeartrade------------------------------------------------------------




--TBB.UCardinformation----------------------------------------------------------

update TsField set FTitle='申請書存放(帳單加寄)' where FId='2eda0929-0c00-9c71-8308-17a3796e26d0';

update TsField set FTitle='信用卡核卡日' where FId='2eda0929-0c00-9c71-8308-17a37973a540';

update TsField set FRequired=0 where FId='2eda0929-0c00-9c71-8308-17a3773b3ce0';

update TsField set FTitle='註記' where FId='2eda0929-0c00-9c71-8308-17a379a34c80';


--/TBB.UCardinformation----------------------------------------------------------




--TBB.UNetBankDepACNO-----------------------------------------------------------
update TsField set FTitle='身分證字號、統一編號或統一證號' where FId='1788c028-6620-0001-5ef2-005056c00008';

update TsFieldGridColumn set FTitle='轉帳帳號' where FId='1788c050-aa30-0001-5ef2-005056c00008';

--/TBB.UNetBankDepACNO-----------------------------------------------------------