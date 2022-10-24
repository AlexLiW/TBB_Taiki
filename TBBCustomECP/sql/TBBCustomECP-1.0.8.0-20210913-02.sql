--字典----
--TBB-預借現金備註
update TsDictionaryItem set FText='客戶希望/前收到' where FId='17800566-bb80-0344-3fe7-005056c00008';

--TBB-信用卡轉介部-處理部門
update TsDictionaryItem set FText='數位金融部' where FId='83da33d5-ecbf-0210-c856-ffffff15e6e8';
update TsDictionaryItem set FText='徵信產經研究部' where FId='83da338f-2cd2-0078-a696-ffffff16bd4c';

--TBB-信用卡額度調整單-調整卡號
update TsDictionaryItem set FText='調整卡號' where FId='178018ec-ca60-003a-31c7-005056c00008';

--TBB-處理部門
update TsDictionaryItem set FText='信用卡部風控科' where FId='1c99837d-a498-4fc9-8cc2-d57b2f01559c';

--TBB-臨時額度調整-財力證明
delete from TsDictionaryItem where FId='d0724fac-c66a-4af2-97b1-0e97446fe3e8';
delete from TsDictionaryItem where FId='dc6a08df-740b-43db-8b66-0de61462e8d9';
delete from TsDictionaryItem where FId='ea231c9b-7f97-4623-9915-4249663c0f75';
delete from TsDictionaryItem where FId='3c612945-ba58-49c0-aff4-a4418c16b85c';
delete from TsDictionaryItem where FId='ec9b8729-0c00-ee0d-a70a-179d08242c90';
insert into TsDictionaryItem set FDictionaryId='e7a4c650-4c1f-41e8-ac30-222fa370a401', FEnabled=1, FId='ec9b8729-0c00-ee0d-a70a-179d08242c90', FIndex=1, FParentValue=null, FText='在臺企有往來帳戶',   FValue='4';
insert into TsDictionaryItem set FDictionaryId='e7a4c650-4c1f-41e8-ac30-222fa370a401', FEnabled=1, FId='ea231c9b-7f97-4623-9915-4249663c0f75', FIndex=2, FParentValue=null, FText='他行存摺明細',       FValue='2';
insert into TsDictionaryItem set FDictionaryId='e7a4c650-4c1f-41e8-ac30-222fa370a401', FEnabled=1, FId='d0724fac-c66a-4af2-97b1-0e97446fe3e8', FIndex=3, FParentValue=null, FText='扣繳憑單',           FValue='0';
insert into TsDictionaryItem set FDictionaryId='e7a4c650-4c1f-41e8-ac30-222fa370a401', FEnabled=1, FId='dc6a08df-740b-43db-8b66-0de61462e8d9', FIndex=4, FParentValue=null, FText='薪資單',             FValue='1';
insert into TsDictionaryItem set FDictionaryId='e7a4c650-4c1f-41e8-ac30-222fa370a401', FEnabled=1, FId='3c612945-ba58-49c0-aff4-a4418c16b85c', FIndex=5, FParentValue=null, FText='其他(請於備註說明)', FValue='3';

--TBB-利息違約金減免單-減免掛失費原因
delete from TsDictionaryItem where FId='17800de6-6e60-003a-31c7-005056c00008';
delete from TsDictionaryItem where FId='17800de6-6ed0-003a-31c7-005056c00008';
insert into TsDictionaryItem set FDictionaryId='17800ddf-8f30-003a-31c7-005056c00008', FEnabled=1, FId='17800de6-6e60-003a-31c7-005056c00008', FIndex=1, FParentValue=null, FText='*/*掛失，兩個營業日內通知找回，*/*卡片已寄回，請協助減免掛失費200元。', FValue='0';
insert into TsDictionaryItem set FDictionaryId='17800ddf-8f30-003a-31c7-005056c00008', FEnabled=1, FId='17800de6-6ed0-003a-31c7-005056c00008', FIndex=2, FParentValue=null, FText='客戶未收到續卡也未開卡，風險考量故掛失，煩請減免掛失費200元。',         FValue='1';
insert into TsDictionaryItem set FDictionaryId='17800ddf-8f30-003a-31c7-005056c00008', FEnabled=1, FId='ec9b8729-0c00-ce20-b708-17bce49ba620', FIndex=3, FParentValue=null, FText='其他',                                                                  FValue='2';

--TBB-利息違約金減免單-服務類型3提醒
update TsDictionaryItem set FText='掛失費產生在*年*月帳單' where FId='17800df1-aec0-003a-31c7-005056c00008';

--TBB-事故交易查詢-類別
delete from TsDictionaryItem where FId='17887775-9fa0-0001-5ef2-005056c00008';
delete from TsDictionaryItem where FId='17887775-a280-0001-5ef2-005056c00008';
delete from TsDictionaryItem where FId='17887775-a280-1001-5ef2-005056c00008';
delete from TsDictionaryItem where FId='17887775-a280-2001-5ef2-005056c00008';
delete from TsDictionaryItem where FId='17887775-a290-0001-5ef2-005056c00008';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-9fa0-0001-5ef2-005056c00008', FIndex=1, FParentValue=null, FText='事故(現況)登錄紀錄查詢',          FValue='01';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a280-0001-5ef2-005056c00008', FIndex=2, FParentValue=null, FText='事故(歷史)登錄紀錄查詢',          FValue='02';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a280-1001-5ef2-005056c00008', FIndex=3, FParentValue=null, FText='圈存/解圈/暫停/終止存提紀錄查詢', FValue='03';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a290-0001-5ef2-005056c00008', FIndex=4, FParentValue=null, FText='圈存明細查詢',                    FValue='04';
insert into TsDictionaryItem set FDictionaryId='1788776a-8ae0-0001-5ef2-005056c00008', FEnabled=1, FId='17887775-a280-2001-5ef2-005056c00008', FIndex=5, FParentValue=null, FText='存摺/印鑑掛失紀錄查詢',           FValue='05';


--TBB-停卡申請單-分期(新)
insert into TsDictionary set FBuiltin=0, FDescription='', FId='c5cfcd29-0c00-a07a-b805-17bcdb944b10', FName='TBB-停卡申請單-分期(新)', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcdb944b10', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcdbadc060', FIndex=1, FParentValue=null, FText='是，分期款將一次到期', FValue='Y';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcdb944b10', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcdbadcdf0', FIndex=2, FParentValue=null, FText='否',                   FValue='N';


--TBB-停卡申請單-停卡原因
insert into TsDictionary set FBuiltin=0, FDescription='', FId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FName='TBB-停卡申請單-停卡原因', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b5eb0', FIndex=1, FParentValue=null, FText='較少使用',         FValue='1';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b6d60', FIndex=2, FParentValue=null, FText='改辦其他卡',       FValue='2';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b7050', FIndex=3, FParentValue=null, FText='卡片已銷毀',       FValue='3';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b7330', FIndex=4, FParentValue=null, FText='回饋活動優惠不滿', FValue='4';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b7620', FIndex=5, FParentValue=null, FText='收到停卡通知書',   FValue='5';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b7810', FIndex=6, FParentValue=null, FText='附註銷書',         FValue='6';
insert into TsDictionaryItem set FDictionaryId='c5cfcd29-0c00-a07a-b805-17bcee76a6e0', FEnabled=1, FId='c5cfcd29-0c00-a07a-b805-17bcee8b7b20', FIndex=7, FParentValue=null, FText='其他',             FValue='7';


----帳務組-提醒事項
update TsDictionaryItem set FDictionaryId='2eda0929-0c00-e911-cd02-179c6ee24040', FEnabled=1,  FIndex=1, FParentValue=null, FText='倘減免正附卡年費，請將正附卡卡號及年費填寫於備註欄，減免卡號欄位只需填寫正卡卡號，減免金額欄位請填寫正附卡加總金額，減免附卡填寫方式亦同', FValue='0' where FId='2eda0929-0c00-e911-cd02-179c6ee8ca70';



----TBB_銀行行庫代碼
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=1,   FParentValue=null, FText='004 臺灣銀行',                                           FValue='004' where FId='177dd069-c510-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=2,   FParentValue=null, FText='005 土地銀行',                                           FValue='005' where FId='177dd069-c730-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=3,   FParentValue=null, FText='006 合庫商銀',                                           FValue='006' where FId='177dd069-c740-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=4,   FParentValue=null, FText='007 第一銀行',                                           FValue='007' where FId='177dd069-c750-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=5,   FParentValue=null, FText='008 華南銀行',                                           FValue='008' where FId='177dd069-c760-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=6,   FParentValue=null, FText='009 彰化銀行',                                           FValue='009' where FId='177dd069-c760-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=7,   FParentValue=null, FText='011 上海銀行',                                           FValue='011' where FId='177dd069-c770-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=8,   FParentValue=null, FText='012 台北富邦',                                           FValue='012' where FId='177dd069-c780-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=9,   FParentValue=null, FText='013 國泰世華',                                           FValue='013' where FId='177dd069-c790-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=10,  FParentValue=null, FText='016 高雄銀行',                                           FValue='016' where FId='177dd08b-d590-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=11,  FParentValue=null, FText='017 兆豐銀行',                                           FValue='017' where FId='177dd069-c7a0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=12,  FParentValue=null, FText='018 農業金庫',                                           FValue='018' where FId='177dd0cc-a6e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=13,  FParentValue=null, FText='020 瑞穗銀行',                                           FValue='020' where FId='177dd0cc-a6f0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=14,  FParentValue=null, FText='021 花旗(台灣)銀行',                                     FValue='021' where FId='177dd069-c7a0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=15,  FParentValue=null, FText='022 美國銀行',                                           FValue='022' where FId='177dd069-c7b0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=16,  FParentValue=null, FText='023 盤谷銀行',                                           FValue='023' where FId='177dd12f-59e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=17,  FParentValue=null, FText='025 首都銀行',                                           FValue='025' where FId='177dd08b-d5c0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=18,  FParentValue=null, FText='039 澳商澳盛銀行',                                       FValue='039' where FId='177dd12f-5a00-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=19,  FParentValue=null, FText='048 王道銀行',                                           FValue='048' where FId='177dd069-c7c0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=20,  FParentValue=null, FText='050 臺灣企銀',                                           FValue='050' where FId='177dd0cc-a740-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=21,  FParentValue=null, FText='052 渣打商銀',                                           FValue='052' where FId='177dd08b-d5e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=22,  FParentValue=null, FText='053 台中銀行',                                           FValue='053' where FId='177dd069-c7d0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=23,  FParentValue=null, FText='054 京城商銀',                                           FValue='054' where FId='177dd069-c7f0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=24,  FParentValue=null, FText='072 德意志銀行',                                         FValue='072' where FId='177dd12f-5a60-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=25,  FParentValue=null, FText='075 東亞銀行',                                           FValue='075' where FId='177dd069-c810-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=26,  FParentValue=null, FText='081 匯豐(台灣)銀行',                                     FValue='081' where FId='177dd0cc-a780-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=27,  FParentValue=null, FText='082 巴黎銀行',                                           FValue='082' where FId='177dd069-c820-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=28,  FParentValue=null, FText='101 瑞興銀行',                                           FValue='101' where FId='177dd0cc-a7a0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=29,  FParentValue=null, FText='102 華泰銀行',                                           FValue='102' where FId='177dd0cc-a7b0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=30,  FParentValue=null, FText='103 臺灣新光商銀',                                       FValue='103' where FId='177dd12f-5ab0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=31,  FParentValue=null, FText='104 台北五信',                                           FValue='104' where FId='177dd12f-5ac0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=32,  FParentValue=null, FText='108 陽信銀行',                                           FValue='108' where FId='177dd0cc-a7b0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=33,  FParentValue=null, FText='114 基隆一信',                                           FValue='114' where FId='177dd1ae-6a50-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=34,  FParentValue=null, FText='115 基隆二信',                                           FValue='115' where FId='177dd1ae-6a60-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=35,  FParentValue=null, FText='118 板信銀行',                                           FValue='118' where FId='177dd069-c830-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=36,  FParentValue=null, FText='119 淡水一信',                                           FValue='119' where FId='177dd1ae-6a80-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=37,  FParentValue=null, FText='120 淡水信合社',                                         FValue='120' where FId='177dd1ae-6a80-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=38,  FParentValue=null, FText='124 宜蘭信合社',                                         FValue='124' where FId='177dd12f-5b00-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=39,  FParentValue=null, FText='130 新竹一信',                                           FValue='130' where FId='177dd1ae-6aa0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=40,  FParentValue=null, FText='132 新竹三信',                                           FValue='132' where FId='177dd1ae-6ab0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=41,  FParentValue=null, FText='146 台中二信',                                           FValue='146' where FId='177dd12f-5b10-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=42,  FParentValue=null, FText='147 三信銀行',                                           FValue='147' where FId='177dd069-c840-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=43,  FParentValue=null, FText='158 彰化一信',                                           FValue='158' where FId='177dd1ae-6ad0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=44,  FParentValue=null, FText='151 彰化五信',                                           FValue='161' where FId='177dd1ae-6ae0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=45,  FParentValue=null, FText='162 彰化六信',                                           FValue='162' where FId='177dd1ae-6ae0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=46,  FParentValue=null, FText='163 彰化十信',                                           FValue='163' where FId='177dd1ae-6af0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=47,  FParentValue=null, FText='165 鹿港信合社',                                         FValue='165' where FId='177dd1ae-6b00-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=48,  FParentValue=null, FText='178 嘉義三信',                                           FValue='178' where FId='177dd1ae-6b00-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=49,  FParentValue=null, FText='188 台南三信',                                           FValue='188' where FId='177dd12f-5b30-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=50,  FParentValue=null, FText='215 花蓮一信',                                           FValue='215' where FId='177dd12f-5b30-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=51,  FParentValue=null, FText='216 花蓮二信',                                           FValue='216' where FId='177dd12f-5b40-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=52,  FParentValue=null, FText='222 澎湖一信',                                           FValue='222' where FId='177dd1ae-6b40-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=53,  FParentValue=null, FText='223 澎湖二信',                                           FValue='223' where FId='177dd1ae-6b40-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=54,  FParentValue=null, FText='224 金門信合社',                                         FValue='224' where FId='177dd12f-5b50-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=55,  FParentValue=null, FText='501 蘇澳漁會',                                           FValue='501' where FId='177dd33f-6fe0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=56,  FParentValue=null, FText='502 頭城漁會',                                           FValue='502' where FId='177dd33f-6ff0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=57,  FParentValue=null, FText='506 桃園漁會',                                           FValue='506' where FId='177dd2f1-b240-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=58,  FParentValue=null, FText='507 新竹漁會',                                           FValue='507' where FId='177dd2f1-b250-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=59,  FParentValue=null, FText='508 通苑漁會',                                           FValue='508' where FId='177dd2f1-b250-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=60,  FParentValue=null, FText='510 南龍漁會',                                           FValue='510' where FId='177dd2f1-b260-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=61,  FParentValue=null, FText='511 彰化漁會',                                           FValue='511' where FId='177dd33f-7040-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=62,  FParentValue=null, FText='512 雲林漁會',                                           FValue='512' where FId='178165c9-1700-0dfc-5d81-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=63,  FParentValue=null, FText='513 瑞芳漁會',                                           FValue='513' where FId='177dd2f1-b270-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=64,  FParentValue=null, FText='514 萬里漁會',                                           FValue='514' where FId='177dd2f1-b270-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=65,  FParentValue=null, FText='515 嘉義漁會',                                           FValue='515' where FId='177dd33f-7070-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=66,  FParentValue=null, FText='516 基隆漁會',                                           FValue='516' where FId='177dd2f1-b280-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=67,  FParentValue=null, FText='517 南市漁會',                                           FValue='517' where FId='177dd2f1-b280-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=68,  FParentValue=null, FText='518 南縣漁會',                                           FValue='518' where FId='178165c9-17c0-0dfc-5d81-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=69,  FParentValue=null, FText='519 新化農會',                                           FValue='519' where FId='178165c9-17c0-1dfc-5d81-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=70,  FParentValue=null, FText='520 小港漁會、高雄漁會',                                 FValue='520' where FId='177dd1ae-6b60-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=71,  FParentValue=null, FText='521 永安漁會、梓官漁會、興達港漁會、彌陀漁會、林園漁會', FValue='521' where FId='177dd2f1-b2a0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=72,  FParentValue=null, FText='523 東港漁會、林邊漁會、枋寮漁會、琉球漁會',             FValue='523' where FId='177dd2f1-b2a0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=73,  FParentValue=null, FText='524 新港漁會',                                           FValue='524' where FId='177dd2f1-b2b0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=74,  FParentValue=null, FText='525 澎湖漁會',                                           FValue='525' where FId='177dd33f-70b0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=75,  FParentValue=null, FText='526 金門漁會',                                           FValue='526' where FId='177dd2f1-b2c0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=76,  FParentValue=null, FText='549 下營農會',                                           FValue='549' where FId='178165c9-1830-0dfc-5d81-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=77,  FParentValue=null, FText='568 七股農會',                                           FValue='568' where FId='177dd364-04c0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=78,  FParentValue=null, FText='599 三星農會',                                           FValue='599' where FId='177dd3cc-7440-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=79,  FParentValue=null, FText='600 農金資中心',                                         FValue='600' where FId='177dd2f1-b2d0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=80,  FParentValue=null, FText='614 二林農會',                                           FValue='614' where FId='177dd364-04d0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=81,  FParentValue=null, FText='616 二崙農會、口湖農會',                                 FValue='616' where FId='177dd364-04d0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=82,  FParentValue=null, FText='620 九如農會',                                           FValue='620' where FId='177dd364-04e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=83,  FParentValue=null, FText='643 二水農會',                                           FValue='643' where FId='177dd364-04f0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=84,  FParentValue=null, FText='700 中華郵政',                                           FValue='700' where FId='177dd12f-5b60-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=85,  FParentValue=null, FText='767 蘆洲農會',                                           FValue='767' where FId='177dd33f-70e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=86,  FParentValue=null, FText='769 八德農會',                                           FValue='769' where FId='177dd3cc-74c0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=87,  FParentValue=null, FText='776 三重農會',                                           FValue='776' where FId='177dd3cc-74d0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=88,  FParentValue=null, FText='790 八里農會',                                           FValue='790' where FId='177dd3cc-74e0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=89,  FParentValue=null, FText='799 三芝農會',                                           FValue='799' where FId='177dd3cc-74e0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=90,  FParentValue=null, FText='803 聯邦銀行',                                           FValue='803' where FId='177dd12f-5b60-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=91,  FParentValue=null, FText='805 遠東銀行',                                           FValue='805' where FId='177dd12f-5b80-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=92,  FParentValue=null, FText='806 元大銀行',                                           FValue='806' where FId='177dd069-c850-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=93,  FParentValue=null, FText='807 永豐銀行',                                           FValue='807' where FId='177dd069-c850-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=94,  FParentValue=null, FText='808 玉山銀行',                                           FValue='808' where FId='177dd069-c860-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=95,  FParentValue=null, FText='809 凱基銀行',                                           FValue='809' where FId='177dd08b-d660-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=96,  FParentValue=null, FText='810 星展(台灣)銀行',                                     FValue='810' where FId='177dd069-c870-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=97,  FParentValue=null, FText='812 台新銀行',                                           FValue='812' where FId='177dd069-c880-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=98,  FParentValue=null, FText='815 日盛銀行',                                           FValue='815' where FId='177dd069-c890-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=99,  FParentValue=null, FText='816 安泰銀行',                                           FValue='816' where FId='177dd069-c8a0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=100, FParentValue=null, FText='822 中國信託',                                           FValue='822' where FId='177dd069-c8a0-1d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=101, FParentValue=null, FText='826 樂天銀行',                                           FValue='826' where FId='177dd12f-5be0-0d75-1395-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=102, FParentValue=null, FText='919 三義農會',                                           FValue='919' where FId='178165c9-19e0-0dfc-5d81-d8f2cab1cb50';
update TsDictionaryItem set FDictionaryId='177dcfbb-a590-0d75-1395-d8f2cab1cb50', FEnabled=1,  FIndex=103, FParentValue=null, FText='925 三灣農會',                                           FValue='925' where FId='178165c9-19f0-0dfc-5d81-d8f2cab1cb50';



----TBB-帳務組客戶問題單-服務項目2問題陳述
insert into TsDictionary set FBuiltin=0, FDescription='', FId='2eda0929-0c00-7f33-440c-17bc99393b50', FName='TBB-帳務組客戶問題單-服務項目2問題陳述', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c56820', FIndex=1, FParentValue=null, FText='客戶不願抵扣消費，請將款項退回帳戶',                     FValue='0';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5a400', FIndex=2, FParentValue=null, FText='此為簽帳金融卡，請將款項退回帳戶',                       FValue='1';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5a7d0', FIndex=3, FParentValue=null, FText='收到停卡溢繳款簡訊，請將款項退回帳戶',                   FValue='2';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5ab80', FIndex=4, FParentValue=null, FText='信用卡已停卡，請將款項退回帳戶',                         FValue='3';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5af40', FIndex=5, FParentValue=null, FText='客戶在臺企無帳戶，要退他行帳戶，已告知會收手續費',       FValue='4';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5b270', FIndex=6, FParentValue=null, FText='客戶在臺企帳戶不常使用，要退他行帳戶，已告知會收手續費', FValue='5';
insert into TsDictionaryItem set FDictionaryId='2eda0929-0c00-7f33-440c-17bc99393b50', FEnabled=1, FId='2eda0929-0c00-7f33-440c-17bc99c5b750', FIndex=7, FParentValue=null, FText='其他：(可自行輸入)',                                     FValue='99';


--/字典----