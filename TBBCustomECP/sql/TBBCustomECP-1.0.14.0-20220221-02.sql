--字典：TBB-事故交易查詢-類別--------------
delete from TsDictionaryItem where FId='17887775-a290-0001-5ef2-005056c00008';
delete from TsDictionaryItem where FId='17887775-a280-2001-5ef2-005056c00008';

insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a280-2001-5ef2-005056c00008', FIndex=5, FParentValue=null, FText='存摺/印鑑掛失紀錄查詢',           FValue='04';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a290-0001-5ef2-005056c00008', FIndex=4, FParentValue=null, FText='圈存明細查詢',                    FValue='05';
--/字典：TBB-事故交易查詢-類別--------------



--字典：TBB-金融卡卡別--------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FName='TBB-金融卡卡別', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2bab9ae0', FIndex=1, FParentValue=null, FText='理財戶版面',  FValue='Y';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babb0d0', FIndex=2, FParentValue=null, FText='晶片卡',      FValue='I';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babb430', FIndex=3, FParentValue=null, FText='晶片現金卡',  FValue='H';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babb810', FIndex=4, FParentValue=null, FText='校園卡',      FValue='S';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babbbd0', FIndex=5, FParentValue=null, FText='COMBO卡',     FValue='C';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babbfc0', FIndex=6, FParentValue=null, FText='VISA晶片卡',  FValue='V';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7463-a90b-17ee2b90cf60', FEnabled=1, FId='2eda0929-0c00-7463-a90b-17ee2babc350', FIndex=7, FParentValue=null, FText='悠遊DEBIT卡', FValue='M';
--/字典：TBB-金融卡卡別--------------

--字典：TBB-存款明細查詢-借貸別--------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='ec9b8729-0c00-dc22-fa0a-17ee814d4ee0', FName='TBB-存款明細查詢-借貸別', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-dc22-fa0a-17ee814d4ee0', FEnabled=1, FId='ec9b8729-0c00-dc22-fa0a-17ee815fe150', FIndex=1, FParentValue=null, FText='收入', FValue='C';
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-dc22-fa0a-17ee814d4ee0', FEnabled=1, FId='ec9b8729-0c00-dc22-fa0a-17ee81600ab0', FIndex=2, FParentValue=null, FText='支出', FValue='D';
--/字典：TBB-存款明細查詢-借貸別--------------

--電文：A007-附屬帳號查詢--------------
insert into TpCUSmCsrTemplate set FId='2eda0929-0c00-7463-a90b-17ee2d8fe9e0', FName='A007', FIndex=53, U_UpTemplate='{
   "name" : "A007tbbapi",
   "from" : "CSR",
   "sessionId" : UATMCardDetailForm.sessionId,
   "agentId" : UATMCardDetailForm.agentId,
   "formData" : data
}', U_DownTemplate1='', U_DownTemplate2='', U_DownTemplate3='', FDescription='A007-附屬帳號查詢', U_ConnectionId='ec9b8729-0c00-a162-6507-1798887712b0', U_DataModelUp='Json', U_DataModel='Json', FDataModel=null;
--/電文：A007-附屬帳號查詢--------------

--字典TBB-交易代碼對應帳單金額正負號-------------------------------------------------------------------
insert into TsDictionary set FBuiltin=0, FDescription='', FId='56692d29-0c00-2e0d-db00-17ef73d59d20', FName='TBB-交易代碼對應帳單金額正負號', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef73eba5e0', FIndex=1,  FParentValue=null, FText='+', FValue='14';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005530', FIndex=2,  FParentValue=null, FText='+', FValue='16';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740055d0', FIndex=3,  FParentValue=null, FText='-', FValue='20';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740056b0', FIndex=4,  FParentValue=null, FText='-', FValue='22';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740056c0', FIndex=5,  FParentValue=null, FText='+', FValue='30';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005800', FIndex=6,  FParentValue=null, FText='+', FValue='37';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740058b0', FIndex=7,  FParentValue=null, FText='+', FValue='40';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005990', FIndex=8,  FParentValue=null, FText='-', FValue='41';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005a30', FIndex=9,  FParentValue=null, FText='-', FValue='43';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005ad0', FIndex=10, FParentValue=null, FText='+', FValue='60';
--/字典TBB-交易代碼對應帳單金額正負號-------------------------------------------------------------------
