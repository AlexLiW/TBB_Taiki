--字典
--TBB-信用卡交易代碼
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0800c056-5000-e607-8e00-17be3ca46140', FName='TBB-信用卡交易代碼', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32540', FIndex=1,  FParentValue=null, FText='預借手續費',     FValue='14';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32e70', FIndex=2,  FParentValue=null, FText='手續費',         FValue='16';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32e80', FIndex=3,  FParentValue=null, FText='繳款/貸方/調帳', FValue='20';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32ea0', FIndex=4,  FParentValue=null, FText='紅利回饋',       FValue='22';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32eb0', FIndex=5,  FParentValue=null, FText='預借現金',       FValue='30';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32ec0', FIndex=6,  FParentValue=null, FText='預借手續費',     FValue='37';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32ee0', FIndex=7,  FParentValue=null, FText='購貨',           FValue='40';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32ef0', FIndex=8,  FParentValue=null, FText='退貨',           FValue='41';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32f00', FIndex=9,  FParentValue=null, FText='購貨更正',       FValue='43';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-e607-8e00-17be3ca46140', FEnabled=1, FId='0800c056-5000-e607-8e00-17be3cc32f10', FIndex=10, FParentValue=null, FText='其他費用',       FValue='60';



--TBB-約定帳號性質別
insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a403-17c021c578d0', FIndex=1, FParentValue=null, FText='約定自行轉帳帳號',   FValue='01';
insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a403-17c021c58660', FIndex=2, FParentValue=null, FText='約定跨行轉帳帳號',   FValue='02';
insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a413-17c021c58660', FIndex=3, FParentValue=null, FText='約定虛擬期貨帳號',   FValue='03';
insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a423-17c021c58660', FIndex=4, FParentValue=null, FText='約定信用卡繳款帳號', FValue='04';

update TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FIndex=5, FParentValue=null, FText='約定綜存帳號',       FValue='05' where FId='177f70fd-1670-0f8c-40b2-9201392884ce';

insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a403-17c021c58a70', FIndex=6, FParentValue=null, FText='約定虛擬帳號',       FValue='06';

update TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FIndex=7, FParentValue=null, FText='約定外幣活期',       FValue='07' where FId='177f70fd-16e0-0f8c-40b2-9201392884ce';

insert into TsDictionaryItem set FDictionaryId='177f706b-ba20-0f8c-40b2-9201392884ce', FEnabled=1, FId='c5cfcd29-0c00-ce12-a403-17c021c58c40', FIndex=8, FParentValue=null, FText='約定外幣定期',       FValue='08';


--Qs.FieldGridColumn
alter table TsFieldGridColumn alter column FControls set data type varchar(50000);
update TsField set FSize=50000 where FId='97f9e7a5-37ad-47ee-9cf1-38219218abef';