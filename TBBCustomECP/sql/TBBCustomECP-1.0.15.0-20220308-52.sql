--TBB.UDebitLoss金融端掛失----------------------------------------------------------------
--/悠遊卡外顯卡號/ 設定唯讀
update TsField set FReadOnly=0 where FId='0100c056-5000-807a-0408-17c444271770';
--/TBB.UDebitLoss----------------------------------------------------------------

--TBB.stopcardapply信用卡一般卡/悠遊卡/一卡通聯名卡停卡申請單-------------------------------------------------------------
--卡號改為必填
update TsField set FRequired=1 where FId='0100c056-5000-ca09-510a-179e6138f500';
--將/建立時間/加入聯絡人分組內
java setFormFields('0100c056-5000-ca09-510a-179e48556da0', '基本資訊', '0100c056-5000-ca09-510a-179e48556eb0', null, 'U_ErrorCode,U_ErrorMemo,U_PageCode,U_PageNum,U_PageStatus', '聯絡人', '179e5046-2920-0a51-09ca-005056c00001', '0100c056-5000-ca09-510a-179e48556eb0', 'F_Identify,F_PMCard,F_CreditCardNo,F_AppendName,FCreateTime', '服務資訊', '179e5056-5b00-0a51-09ca-005056c00001', '0100c056-5000-ca09-510a-179e48556eb0', 'U_StopDate,U_CardAttribute,U_eCardNo,U_Control,U_IsStages,U_CardStop,U_Return,U_StopCard,U_Other,U_Remark,U_CheckAgent,U_Check2,FUserId,FStatus');
--/TBB.stopcardapply-------------------------------------------------------------

--TBB.UYearsbillmonth信用卡各卡別帳單明細查詢-----------------------------------------------------------
--/帳單交易明細/ 長度變更
update TsField set FSize=50000 where FId='0100c056-5000-7268-7c09-17a31da176f0';                

--/TBB.UYearsbillmonth-----------------------------------------------------------

---字典項更新-----------------------------------------------------------
--字典TBB-存款帳戶總覽-類別  [身分證字號]改為[身分證字號、統一編號或統一證號]
update TsDictionaryItem set FText='身分證字號、統一編號或統一證號' where FId='1788c4f5-4ba0-0001-5ef2-005056c00008';

---/字典項更新-----------------------------------------------------------

--TBBPassbookLoss事故交易查詢--------------------------------------------------------------
update TsUnit set FCode='TBBPassbookLoss' where FId='1788775d-7440-0001-5ef2-005056c00008';
update TsPage set  FCode='TBBPassbookLoss.List' , FActionMethodName='TBBPassbookLoss.prepareList' where FId='1788775d-8810-0001-5ef2-005056c00008';
update TsPage set  FCode='TBBPassbookLoss.SelectList', FActionMethodName='TBBPassbookLoss.prepareList' where FId='1788775d-8830-2001-5ef2-005056c00008';
update TsPage set  FCode='TBBPassbookLoss.Form', FActionMethodName='TBBPassbookLoss.prepareForm'       where FId='1788775d-87a0-0001-5ef2-005056c00008';

--/TBBPassbookLoss事故交易查詢--------------------------------------------------------------


--字典-TBB-交易代碼對應帳單金額正負號------------
delete from TsDictionaryItem where FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20';

insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869de920', FIndex=1,  FParentValue=null, FText='+', FValue='10';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e07b0', FIndex=2,  FParentValue=null, FText='-', FValue='11';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e0a70', FIndex=3,  FParentValue=null, FText='+', FValue='12';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e0cf0', FIndex=4,  FParentValue=null, FText='-', FValue='13';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef73eba5e0', FIndex=5,  FParentValue=null, FText='+', FValue='14';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e2030', FIndex=6,  FParentValue=null, FText='-', FValue='15';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005530', FIndex=7,  FParentValue=null, FText='+', FValue='16';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e2550', FIndex=8,  FParentValue=null, FText='-', FValue='17';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e2820', FIndex=9,  FParentValue=null, FText='-', FValue='19';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740055d0', FIndex=10, FParentValue=null, FText='-', FValue='20';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e2cc0', FIndex=11, FParentValue=null, FText='-', FValue='21';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740056b0', FIndex=12, FParentValue=null, FText='-', FValue='22';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e31b0', FIndex=13, FParentValue=null, FText='-', FValue='23';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e3410', FIndex=14, FParentValue=null, FText='+', FValue='24';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e36f0', FIndex=15, FParentValue=null, FText='+', FValue='25';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e3a20', FIndex=16, FParentValue=null, FText='+', FValue='26';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e3c90', FIndex=17, FParentValue=null, FText='+', FValue='27';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e3f50', FIndex=18, FParentValue=null, FText='+', FValue='28';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740056c0', FIndex=19, FParentValue=null, FText='+', FValue='30';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e4540', FIndex=20, FParentValue=null, FText='-', FValue='31';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e4790', FIndex=21, FParentValue=null, FText='+', FValue='32';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e49d0', FIndex=22, FParentValue=null, FText='-', FValue='33';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e4d10', FIndex=23, FParentValue=null, FText='+', FValue='34';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e4f20', FIndex=24, FParentValue=null, FText='+', FValue='35';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f6869e5220', FIndex=25, FParentValue=null, FText='-', FValue='36';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005800', FIndex=26, FParentValue=null, FText='+', FValue='37';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c37ec0', FIndex=27, FParentValue=null, FText='+', FValue='38';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c38490', FIndex=28, FParentValue=null, FText='-', FValue='39';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef740058b0', FIndex=29, FParentValue=null, FText='+', FValue='40';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005990', FIndex=30, FParentValue=null, FText='-', FValue='41';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c38d20', FIndex=31, FParentValue=null, FText='+', FValue='42';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005a30', FIndex=32, FParentValue=null, FText='-', FValue='43';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c392b0', FIndex=33, FParentValue=null, FText='+', FValue='48';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c39510', FIndex=34, FParentValue=null, FText='-', FValue='49';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c39780', FIndex=35, FParentValue=null, FText='-', FValue='50';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c399c0', FIndex=36, FParentValue=null, FText='+', FValue='51';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='56692d29-0c00-2e0d-db00-17ef74005ad0', FIndex=37, FParentValue=null, FText='+', FValue='60';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686c39f80', FIndex=38, FParentValue=null, FText='-', FValue='61';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de6d50', FIndex=39, FParentValue=null, FText='+', FValue='62';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de7230', FIndex=40, FParentValue=null, FText='+', FValue='65';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de75e0', FIndex=41, FParentValue=null, FText='-', FValue='66';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de7ae0', FIndex=42, FParentValue=null, FText='-', FValue='67';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de7fd0', FIndex=43, FParentValue=null, FText='+', FValue='68';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de83b0', FIndex=44, FParentValue=null, FText='-', FValue='69';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de8510', FIndex=45, FParentValue=null, FText='-', FValue='94';
insert into TsDictionaryItem set FDictionaryId='56692d29-0c00-2e0d-db00-17ef73d59d20', FEnabled=1, FId='c5cfcd29-0c00-641f-f90a-17f686de8890', FIndex=46, FParentValue=null, FText='-', FValue='95';

--/字典-TBB-交易代碼對應帳單金額正負號------------