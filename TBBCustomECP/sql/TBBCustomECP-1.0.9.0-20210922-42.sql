--金融卡發卡主檔
update TsField set FTitle='優惠組別' where FId='2eda0929-0c00-8d1e-9704-17a196ca9b60';
update TsField set FTitle='是否有已申請尚未啟用之金融卡' where FId='2eda0929-0c00-e960-be0e-179efa780ec0';

update TsField set  FTitle='第二軌密碼錯誤次數',FType='ComboBox-SelectOnly' where FId='2eda0929-0c00-e960-be0e-179ef8da2dd0';
update TsFieldGridColumn set  FTitle='發卡順序' where FId='2eda0929-0c00-e960-be0e-179efad25c90';


--修改字典(TBB_是否晶片金融卡)
update TsDictionaryItem set FValue='Y' where FId='177dd949-e500-01dd-2e61-d8f2cab1cb50';
update TsDictionaryItem set FValue='N' where FId='177dd949-e550-01dd-2e61-d8f2cab1cb50';

--新增字典(TBB-第二軌密碼錯誤次數)
insert into TsDictionary set FBuiltin=0, FDescription='', FId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FName='TBB-第二軌密碼錯誤次數', FParentId=null, FTextAsValue=0;
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FEnabled=1, FId='0800c056-5000-4f76-c40e-17bc86b0d4d0', FIndex=1, FParentValue=null, FText='0次',    FValue='4';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FEnabled=1, FId='0800c056-5000-4f76-c40e-17bc86b0efb0', FIndex=2, FParentValue=null, FText='1次',    FValue='3';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FEnabled=1, FId='0800c056-5000-4f76-c40e-17bc86b0efd0', FIndex=3, FParentValue=null, FText='2次',    FValue='2';
insert into TsDictionaryItem set FDictionaryId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FEnabled=1, FId='0800c056-5000-4f76-c40e-17bc86b0eff0', FIndex=4, FParentValue=null, FText='已鎖住', FValue='1';



--DEBIT金融卡圈存事故檔
update TsField set  FTitle='簽帳金額加總' where FId='2eda0929-0c00-ca54-c30f-17a1298bc070';
java setFormFields('17887165-83b0-0001-5ef2-005056c00008', '基本資訊', '17887165-83c0-0001-5ef2-005056c00008', null, 'U_ACNO,U_Button', '輸出區', '1788722a-4200-0001-5ef2-005056c00008', null, 'U_Grid,U_EventAMTTotal');


update TsFieldGridColumn set FIndex=1 where FId='178871ac-4ff0-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=2 where FId='178871b2-9b00-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=3 where FId='178871cf-1f60-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=4 where FId='178871ba-3970-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=5 where FId='178871c3-9b60-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=6 where FId='178871b6-ed50-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=7 where FId='178871a9-3560-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=8 where FId='178871af-44f0-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=9 where FId='178871bf-cd60-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=10 where FId='178871c6-b4e0-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=11 where FId='178871c9-6e60-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=12 where FId='178871cc-5760-0001-5ef2-005056c00008'; 

--存款明細查詢

update TsFieldGridColumn set FIndex=1 where FId='1788792d-0fa0-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=2 where FId='17887930-ef10-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=3 where FId='17887937-dd80-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=4 where FId='1788793a-d160-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=5 where FId='17887940-b890-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=6 where FId='17887942-f670-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=7 where FId='1788793d-9400-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=8 where FId='17887945-7c80-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=9 where FId='17887948-ff80-0001-5ef2-005056c00008'; 
update TsFieldGridColumn set FIndex=10 where FId='1788794c-35f0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=11 where FId='1788794e-ac80-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=12 where FId='17887951-7400-0001-5ef2-005056c00008';

insert into TsFieldGridColumn set FId='0800c056-5000-4502-8600-17bde1f56a60', FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='項目',       FKey='U_NO',           FType='String', FIndex=1,  FControls='';


--定期存款餘額資料查詢
update TsField set FHint='<p>1、	「轉存方式」申請為「本息」者，則表示本金及利息一併轉期；「本金」者，則表示本金轉期，利息轉入綜存活存；「空白」者則表示未申請。</p>
<p>2、	「申請不轉期」為「是」者，則表示已申請不轉期；「＊」者，則表示申請轉期次數屆滿後不轉期；「空白」者，則表示未申請。</p>
<p>3、	若存單種類為『零存整付/整存零付』，則『自動轉期未轉次數』為『零存整付/整存零付』剩餘期數。</p>
<p>4、	『零存整付』按月繳存金額為『存單金額除以自動轉期已轉次數』。</p>
' where FId='2eda0929-0c00-a113-d406-179c1effdc10';

update TsFieldGridColumn set FType='String' where FId='1788788c-21f0-0001-5ef2-005056c00008';

--網銀主檔

java setFormFields('ec9b8729-0c00-c076-4804-17a17bd100f0', '基本資訊', 'ec9b8729-0c00-c076-4804-17a17bd103a0', null, 'U_UID,U_CQ13Button', '網路銀行轉帳主檔', '17a17c05-4740-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_TSFCNT,U_LOGINDTM,U_IsEmail,U_STSCOD1_CQ13,U_STSCOD2_CQ13,U_CHGMAIL,U_SETNBP1,U_SETNBP2,U_PWDDTTM,U_CNTNBW1,U_CNTNBW2,U_TYPE,U_APLCODB,U_APLCODA,U_USERID,U_UIDSTC,U_E_BILL,U_UIDCNT,U_APLBRH,U_SNHKEY,U_TRAACN,U_CHGPWDT,U_DATAPL,U_DATDLT,U_UPDFLG,U_OPCODE,U_CNMARK,U_PASCODE,U_CORFLAG,U_SECCODE,U_IDNCOD,U_CQ14Button,U_CQ15Button', '網路銀行轉帳延伸檔', '17a17ec9-8990-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_Grid', '行動銀行快速登入記錄檔', '17a180e0-8320-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_QKLINDTTM,U_QLGIDT,U_QCKSTAT,U_QTRNDT,U_QTRSTAT,U_MOBYN,U_QSMLDT,U_QSMSTAT,U_MOBCODE,U_MOBDATE,U_BIOME,U_VERYN,U_VERTYPE,U_VERNUM1,U_VERDATE1,U_STSCOD1,U_VERNUM2,U_VERDATE2,U_STSCOD2,U_VERNUM3,U_VERDATE3,U_STSCOD3,U_VERNUM4,U_VERDATE4,U_STSCOD4,U_VERNUM5,U_VERDATE5,U_STSCOD5,U_VERNUM6,U_VERDATE6,U_STSCOD6,U_VERNUM7,U_VERDATE7,U_STSCOD7,U_VERNUM8,U_VERDATE8,U_STSCOD8');

update TsDictionaryItem set FText='NB線上約定轉入帳號 CNB外幣約定匯出匯款受款人' where FId='177f6bf1-58e0-0f8c-40b2-9201392884ce';


update TsField set FTitle='簽入密碼錯誤次數' where FId='ec9b8729-0c00-c076-4804-17a17c3af660';
update TsField set FTitle='簽入密碼解鎖次數' where FId='ec9b8729-0c00-c076-4804-17a17c2bca60';
update TsField set FTitle='簽入密碼狀態'     where FId='ec9b8729-0c00-c076-4804-17a1805e0d50';



update TsFieldGridColumn set FTitle='MB登入日期/時間'     where FId='ec9b8729-0c00-c076-4804-17a17eb8d1b0';
update TsFieldGridColumn set FTitle='MB行動銀行目前狀態'  where FId='ec9b8729-0c00-c076-4804-17a17eba8f70';
update TsFieldGridColumn set FTitle='MB啟用/關閉日期/時間' where FId='ec9b8729-0c00-c076-4804-17a17ebc4940';

delete from TsFieldGridColumn where FId='ec9b8729-0c00-c076-4804-17a17eb6c9f0';


update TsFieldGridColumn set FIndex=1 where FId='ec9b8729-0c00-c076-4804-17a17eb8d1b0';
update TsFieldGridColumn set FIndex=2 where FId='ec9b8729-0c00-c076-4804-17a17eba8f70';
update TsFieldGridColumn set FIndex=3 where FId='ec9b8729-0c00-c076-4804-17a17ebc4940';
update TsFieldGridColumn set FIndex=4 where FId='ec9b8729-0c00-c076-4804-17a17ebe41b0';
update TsFieldGridColumn set FIndex=5 where FId='ec9b8729-0c00-c076-4804-17a17ec163c0';
update TsFieldGridColumn set FIndex=6 where FId='ec9b8729-0c00-c076-4804-17a17ebfcd50';
update TsFieldGridColumn set FIndex=7 where FId='ec9b8729-0c00-c076-4804-17a17ec32990';

java setFormFields('ec9b8729-0c00-c076-4804-17a17bd100f0', '基本資訊', 'ec9b8729-0c00-c076-4804-17a17bd103a0', null, 'U_UID,U_CQ13Button', '網路銀行轉帳主檔', '17a17c05-4740-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_TSFCNT,U_LOGINDTM,U_IsEmail,U_STSCOD1_CQ13,U_STSCOD2_CQ13,U_CHGMAIL,U_SETNBP1,U_SETNBP2,U_PWDDTTM,U_CNTNBW1,U_CNTNBW2,U_TYPE,U_APLCODB,U_APLCODA,U_USERID,U_UIDSTC,U_E_BILL,U_UIDCNT,U_APLBRH,U_SNHKEY,U_TRAACN,U_CHGPWDT,U_DATAPL,U_DATDLT,U_UPDFLG,U_OPCODE,U_CNMARK,U_PASCODE,U_CORFLAG,U_SECCODE,U_IDNCOD,U_CQ14Button,U_CQ15Button', '網路銀行轉帳延伸檔', '17a17ec9-8990-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_Grid', '行動銀行快速登入記錄檔', '17a180e0-8320-0448-76c0-000c29879bec', 'ec9b8729-0c00-c076-4804-17a17bd103a0', 'U_QKLINDTTM,U_QLGIDT,U_QCKSTAT,U_QTRNDT,U_QTRSTAT,U_MOBYN,U_QSMLDT,U_QSMSTAT,U_MOBCODE,U_MOBDATE,U_BIOME,U_VERYN,U_VERTYPE,U_VERNUM1,U_VERDATE1,U_STSCOD1,U_VERNUM2,U_VERDATE2,U_STSCOD2,U_VERNUM3,U_VERDATE3,U_STSCOD3,U_VERNUM4,U_VERDATE4,U_STSCOD4,U_VERNUM5,U_VERDATE5,U_STSCOD5,U_VERNUM6,U_VERDATE6,U_STSCOD6,U_VERNUM7,U_VERDATE7,U_STSCOD7,U_VERNUM8,U_VERDATE8,U_STSCOD8');


create table tpTBBEBankingInfo_VERTYPE (FEntityId uuid, FValue varchar(100));
create index IpTBBEBankingInfo_VERTYPE1 on tpTBBEBankingInfo_VERTYPE (FEntityId);
create index IpTBBEBankingInfo_VERTYPE2 on tpTBBEBankingInfo_VERTYPE (FEntityId, FValue);

update TsField set FType='MultiCheckBox',FRelationTable='tpTBBEBankingInfo_VERTYPE',FRelationCapacity=30,FColSpan=3  where FId='ec9b8729-0c00-c076-4804-17a17f0580a0';

update TsField set FTitle='MB台灣Pay存款帳號約定書版號'      where FId='ec9b8729-0c00-c076-4804-17a17f07f6f0';
update TsField set FTitle='MB台灣Pay存款帳號立約註銷日期'    where FId='ec9b8729-0c00-c076-4804-17a17f0abcf0';
update TsField set FTitle='MB台灣Pay存款帳號狀態'            where FId='ec9b8729-0c00-c076-4804-17a1804eff00';
update TsField set FTitle='MB台灣Pay掃碼提款約定書版號'      where FId='ec9b8729-0c00-c076-4804-17a1807d21c0';
update TsField set FTitle='MB台灣Pay掃碼提款立約註銷日期'    where FId='ec9b8729-0c00-c076-4804-17a18080ab40';
update TsField set FTitle='MB台灣Pay掃碼提款狀態'            where FId='ec9b8729-0c00-c076-4804-17a18084cce0';
update TsField set FTitle='MB台灣Pay信用卡約定書版號'        where FId='ec9b8729-0c00-c076-4804-17a18087da40';
update TsField set FTitle='MB台灣Pay信用卡立約註銷日期'     where FId='ec9b8729-0c00-c076-4804-17a1808bad80';
update TsField set FTitle='MB台灣Pay信用卡狀態'             where FId='ec9b8729-0c00-c076-4804-17a1808f5940';
update TsField set FTitle='LINE官方帳號-台灣Pay約定書版號'   where FId='ec9b8729-0c00-c076-4804-17a180937af0';
update TsField set FTitle='LINE官方帳號-台灣Pay立約註銷日期' where FId='ec9b8729-0c00-c076-4804-17a180964480';
update TsField set FTitle='LINE官方帳號-台灣Pay狀態'         where FId='ec9b8729-0c00-c076-4804-17a180995d50';
--修改字典(TBB-網銀主檔-約定書類別)
update TsDictionaryItem set FText='MB台灣Pay存款帳號'     where FId='ec9b8729-0c00-084c-280a-17a2deeca0c0';
update TsDictionaryItem set FText='MB台灣Pay掃碼提款'     where FId='ec9b8729-0c00-084c-280a-17a2deeca440';
update TsDictionaryItem set FText='MB台灣Pay信用卡'       where FId='ec9b8729-0c00-084c-280a-17a2deeca570';
update TsDictionaryItem set FText='LINE官方帳號-台灣Pay'  where FId='ec9b8729-0c00-084c-280a-17a2deeca6f0';


--信用卡持卡總覽查詢

update TsFieldGridColumn set FControls='[{
     type:"ComboButton",
     text:"請選擇",
     items:[{
        onclick:"UCreditcardholderForm.openQuickLinck(''G'')",
        id:"G",
        text:"信用卡卡片狀態查詢"
     },{
        onclick:"UCreditcardholderForm.openQuickLinck(''F'')",
        id:"F",
        text:"信用卡已授權未請款查詢"
     },{
        onclick:"UCreditcardholderForm.openQuickLinck(''C'')",
        id:"C",
        text:"信用卡各卡別未出帳單明細查詢"
     },{
        onclick:"UCreditcardholderForm.openQuickLinck(''B'')",
        id:"B",
        text:"信用卡各卡別帳單明細查詢"
     } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''A'')",
        id:"A",
        text:"信用卡歷史繳款狀況查詢"
     } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''E'')",
        id:"E",
        text:"信用卡利息計算方式"
     } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''D'')",
        id:"D",
        text:"信用卡指定日期還款結清金額查詢"
     } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''H'')",
        id:"H",
        text:"最近一年交易紀錄查詢"
     }
]
}]
' where FId='1788c92e-7130-0001-5ef2-005056c00008';


--信用卡已出總帳單明細查詢

delete from TsFieldGridColumn where FId='2eda0929-0c00-8d1e-9704-17a190c5ffd0';
delete from TsFieldGridColumn where FId='2eda0929-0c00-8d1e-9704-17a199c55840';
delete from TsFieldGridColumn where FId='2eda0929-0c00-5f26-6a01-17a13e17a330';

update TsFieldGridColumn set  FIndex=1 where FId='2eda0929-0c00-8d1e-9704-17a199cc52f0';
update TsFieldGridColumn set  FIndex=2 where FId='2eda0929-0c00-8d1e-9704-17a199d0c8b0';
update TsFieldGridColumn set  FIndex=3 where FId='2eda0929-0c00-5f26-6a01-17a13e113c90';
update TsFieldGridColumn set  FIndex=4 where FId='2eda0929-0c00-5f26-6a01-17a13e1ab110';
update TsFieldGridColumn set  FIndex=5 where FId='2eda0929-0c00-5f26-6a01-17a13e146130';
update TsFieldGridColumn set  FIndex=6 where FId='2eda0929-0c00-5f26-6a01-17a13e249860';
update TsFieldGridColumn set  FIndex=7 where FId='2eda0929-0c00-5f26-6a01-17a13e2b9ba0';
update TsFieldGridColumn set  FIndex=8 where FId='2eda0929-0c00-5f26-6a01-17a13e27e6e0';
update TsFieldGridColumn set  FIndex=9 where FId='2eda0929-0c00-5f26-6a01-17a13e2e7840';
update TsFieldGridColumn set  FIndex=10 where FId='2eda0929-0c00-5f26-6a01-17a13e1d6f10';
update TsFieldGridColumn set  FIndex=11 where FId='2eda0929-0c00-5f26-6a01-17a13e21b8f0';



update TsField set FTitle='-繳款/貸方'  where FId='2eda0929-0c00-832b-5c0c-17a13aff88a0'; 
update TsField set FTitle='+消費款/借方' where FId='2eda0929-0c00-5f26-6a01-17a13e8904e0';
update TsField set FTitle='+預借現金'  where FId='2eda0929-0c00-832b-5c0c-17a13b04cb60'; 
update TsField set FTitle='+利息費用'  where FId='2eda0929-0c00-832b-5c0c-17a13b0a6020'; 
update TsField set FTitle='=應繳總額'  where FId='2eda0929-0c00-832b-5c0c-17a13b10aae0'; 
update TsField set FTitle='+累積最低'  where FId='2eda0929-0c00-5f26-6a01-17a13dd438d0'; 
update TsField set FTitle='=最低應繳'  where FId='2eda0929-0c00-5f26-6a01-17a13deb1b80'; 

insert into TsField set FId='0800c056-5000-a547-7404-17be741bf1e0', FUnitId='1788c8fe-35f0-0001-5ef2-005056c00008', FName='U_Inquiry2',  FTitle='信用卡已出總帳單明細查詢', FType='Button',        FSize=null,  FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null, FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor='transparent', FDefaultValue=null,   FHint='信用卡已出總帳單明細查詢', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
java setFormFields('1788c8fe-5cc0-0001-5ef2-005056c00008', '基本資訊', '1788c8fe-5cd0-0001-5ef2-005056c00008', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_UID,U_Inquiry,U_Inquiry2', '輸出區', '1788c947-3f30-0001-5ef2-005056c00008', null, 'U_Grid');


--信用卡已授權未請款查詢
update TsFieldGridColumn set FTitle='授權碼' where FId='2eda0929-0c00-9c71-8308-17a36b535660';


--事故交易查詢
update TsField set FTitle='帳號/虛擬帳號' where FId='17887762-8170-0001-5ef2-005056c00008';



--疑似不法-登入交易-存提交易註記登錄
insert into TsField set FId='0800c056-5000-774f-0f0a-17bd0ce64360', FUnitId='17887266-f300-0001-5ef2-005056c00008', FName='U_Mark',        FTitle='解圈後備註',       FType='Label',               FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null,          FDefaultValue=null, FHint='此圈存、解圈欄位限虛擬帳號使用', FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
--java setFormFields('17887267-21f0-0001-5ef2-005056c00008', '基本資訊', '17887267-21f0-1001-5ef2-005056c00008', null, 'U_Type,U_ACNO,U_UID,U_ACType,U_RegType,U_Mark,U_Button,U_Amount,U_RegDT,U_RegTellerNo,U_SeqNo,U_Result'); Tiffany註解

--update TsField set FIsNewRow=1,FTitle='執行登錄' where FId='178872b7-c100-0001-5ef2-005056c00008'; Tiffany修改
update TsField set FTitle='執行登錄' where FId='178872b7-c100-0001-5ef2-005056c00008';

java setImportTemplateFields('17887266-f300-0001-5ef2-005056c00008', 'FName,U_AgentCode,U_UID,U_MESSAGE,U_ACNO,U_Button');

update TsField set FTitle='帳號/虛擬帳號' where FId='17887278-ad40-0001-5ef2-005056c00008';

--自動化銀行系統-電話銀行主檔
java setFormFields('17887988-2c20-0001-5ef2-005056c00008', '基本資訊', '17887988-2c20-1001-5ef2-005056c00008', null, 'U_ACNO,U_Button', '查詢結果', '17887a21-be50-0001-5ef2-005056c00008', null, 'U_UID,U_BUTypeDesc,U_ApplyDT,U_Status,U_BVoiceSev,U_CancelDT,U_PwdErrTime,U_PwdErr,U_LastChgDT,U_TodayDepAMT,U_Today3DepAMT,U_TodayODepAMT,U_FaxRegion,U_Fax');


--自動化銀行系統-電話銀行語音轉帳資料檔

update TsFieldGridColumn set FIndex=1 where FId='17887a63-e650-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=2 where FId='17887a60-9d60-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=3 where FId='17887a68-5760-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=4 where FId='17887a76-3de0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=5 where FId='17887a6d-ee50-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=6 where FId='17887a71-1160-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=7 where FId='17887a79-86e0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=8 where FId='17887a73-cc70-0001-5ef2-005056c00008';


--信用卡歷史繳款狀況查詢

java setFormFields('1788c952-5dd0-0001-5ef2-005056c00008', '基本資訊', '1788c952-5dd0-1001-5ef2-005056c00008', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_CardNum,U_Inquiry', '輸出區', '1788ca31-9a30-1001-5ef2-005056c00008', null, 'U_CardType,U_Payexpired,U_Maxbilldate,U_Maxbill,U_Recentcreditdate,U_Recentcredit,U_Recentlenddate,U_Recentlend,U_Recentpaydate,U_Recentpayamount,U_Creditsdate,U_Credits,U_Lastquotadate,U_Lastcredits,U_Arrearslowpayable,U_Arrearstimes,U_Arrears30lowpayable,U_Arrears30times,U_Arrears60lowpayable,U_Arrears60times,U_Arrears90lowpayable,U_Arrears90times,U_Arrears120lowpayable,U_Arrears120times,U_Arrears150lowpayable,U_Arrears150times,U_Arrears180lowpayable,U_Arrears180times,U_Arrears210lowpayable,U_Arrears210times');

update TsField set FTitle='最近一次繳款/回饋金/餘額轉置日期' where FId='1788c995-3330-0001-5ef2-005056c00008';
update TsField set FTitle='最近一次繳款/回饋金/餘額轉置金額' where FId='1788c999-5760-0001-5ef2-005056c00008';
update TsField set FColSpan=1,FTitle='欠繳XDAYS最低應繳額' where FId='1788c9af-04c0-0001-5ef2-005056c00008';
update TsField set FColSpan=1,FTitle='欠繳XDAYS累積次數',FIsNewRow=0 where FId='1788c9b5-14e0-0001-5ef2-005056c00008';

--信用卡利息計算方式查詢
--java setFormFields('17887267-21f0-0001-5ef2-005056c00008', '基本資訊', '17887267-21f0-1001-5ef2-005056c00008', null, 'U_Type,U_ACNO,U_UID,U_ACType,U_RegType,U_Mark,U_Button,U_Amount,U_RegDT,U_RegTellerNo,U_SeqNo,U_Result'); Tiffany註解
java setImportTemplateFields('17887266-f300-0001-5ef2-005056c00008', 'FName,U_AgentCode,U_UID,U_MESSAGE,U_ACNO,U_Button');


delete from TsFieldGridColumn where FId='2eda0929-0c00-a201-820d-17aa812a59c0';


--金融卡發卡主檔
insert into TsField set FId='0800c056-5000-fb2c-1404-17bf27ac1d70', FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_Inquiry4',      FTitle='約定轉帳帳號檔查詢',           FType='Button',              FSize=null,  FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='約定轉帳帳號檔查詢',          FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;
java setFormFields('2eda0929-0c00-8f3a-bb07-179eabb77e80', '基本資訊', '2eda0929-0c00-8f3a-bb07-179eabb780d0', null, 'U_ACNO,U_Inquiry', '查詢結果', '179ef7f4-2980-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_FUserId,U_UID,U_CardNo,U_CardNum,U_Status,U_IsApplyTrans,U_IsApplyNoDep,U_ApplyInDraw,U_PINCNT,U_TRINCT,U_ABAVCT,U_ABAVCTX,U_MEGECT,U_ABUSCT,U_ABUSCTX,U_EndYM,U_GRPCOD,U_VSEXPYM,U_VSDBYN,U_SMART,U_PACNO,U_ABKEYTP,U_BRHACC,U_Inquiry3,U_Inquiry2,U_Inquiry4,U_Result,U_ResultExplain', '金融卡發卡歷史查詢', '179efcde-5f90-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A011Grid', '金融卡發卡明細查詢', '179efd07-bda0-0ebe-60e9-000c2909da2e', '2eda0929-0c00-8f3a-bb07-179eabb780d0', 'U_A012Grid');




