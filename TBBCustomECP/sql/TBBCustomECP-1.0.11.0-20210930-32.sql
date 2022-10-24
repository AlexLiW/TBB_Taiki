
------金融卡發卡主檔
update TsField set  FUnitId='2eda0929-0c00-8f3a-bb07-179eabb6da30', FName='U_TRINCT',        FTitle='第二軌密碼錯誤次數',           FType='ComboBox-SelectOnly', FSize=10,    FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId='0800c056-5000-4f76-c40e-17bc86a4b2f0', FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null, FHint='',                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='2eda0929-0c00-e960-be0e-179ef8da2dd0';




------存款明細查詢
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='項目',       FKey='U_NO',           FType='String', FIndex=1,  FControls='' where FId='0800c056-5000-4502-8600-17bde1f56a60';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='最後異動日', FKey='U_LastModifyDT', FType='String', FIndex=2,  FControls='' where FId='1788792d-0fa0-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='交易時間',   FKey='U_Time',         FType='String', FIndex=3,  FControls='' where FId='17887930-ef10-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='摘要',       FKey='U_DESC',         FType='String', FIndex=4,  FControls='' where FId='17887937-dd80-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='借貸別',     FKey='U_BS',           FType='String', FIndex=5,  FControls='' where FId='1788793a-d160-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='支出',       FKey='U_BAMT',         FType='String', FIndex=6,  FControls='' where FId='17887940-b890-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='存入',       FKey='U_SAMT',         FType='String', FIndex=7,  FControls='' where FId='17887942-f670-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='帳戶餘額',   FKey='U_Balance',      FType='String', FIndex=8,  FControls='' where FId='1788793d-9400-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='票據號碼',   FKey='U_CheckNum',     FType='String', FIndex=9,  FControls='' where FId='17887945-7c80-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='資料內容',   FKey='U_DATA',         FType='String', FIndex=10, FControls='' where FId='17887948-ff80-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='代收付行',   FKey='U_BankNo',       FType='String', FIndex=11, FControls='' where FId='1788794c-35f0-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='轉入行庫別', FKey='U_IBankNo',      FType='String', FIndex=12, FControls='' where FId='1788794e-ac80-0001-5ef2-005056c00008';
update TsFieldGridColumn set  FFieldId='17887928-0770-0001-5ef2-005056c00008', FTitle='金資序號',   FKey='U_SeqNo',        FType='String', FIndex=13, FControls='' where FId='17887951-7400-0001-5ef2-005056c00008';


-------信用卡持卡總覽查詢
update TsFieldGridColumn set  FFieldId='1788c919-8850-0001-5ef2-005056c00008', FTitle='快速連結', FKey='U_QuickLink',  FType='Control', FIndex=450, FControls='[{
    type:"ComboButton",
    text:"請選擇",
    items:[{
       onclick:"UCreditcardholderForm.openQuickLinck(''G'')",
       id:"G",
       text:"信用卡卡片狀態查詢"
    } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''C'')",
        id:"C",
        text:"信用卡各卡別未出帳單明細查詢"
    } , {
       onclick:"UCreditcardholderForm.openQuickLinck(''F'')",
       id:"F",
       text:"信用卡已授權未請款查詢"
    } , {
       onclick:"UCreditcardholderForm.openQuickLinck(''B'')",
       id:"B",
       text:"信用卡各卡別帳單明細查詢"
    } , {
       onclick:"UCreditcardholderForm.openQuickLinck(''A'')",
       id:"A",
       text:"信用卡歷史繳款狀況查詢"
    } , {
        onclick:"UCreditcardholderForm.openQuickLinck(''H'')",
        id:"H",
        text:"最近一年交易紀錄查詢"
    } , {
       onclick:"UCreditcardholderForm.openQuickLinck(''E'')",
       id:"E",
       text:"信用卡利息計算方式"
    } , {
       onclick:"UCreditcardholderForm.openQuickLinck(''D'')",
       id:"D",
       text:"信用卡指定日期還款結清金額查詢"
    }
]
}]
' where FId='1788c92e-7130-0001-5ef2-005056c00008';


------信用卡利息計算方式查詢
java setFormFields('2eda0929-0c00-2477-180e-17a1d9e72150', '基本資訊', '2eda0929-0c00-2477-180e-17a1d9e72810', null, 'U_PageNum,U_ErrorCode,U_ErrorMemo,U_ErrorCode2,U_ErrorMemo2,U_CardNum,U_Inquiry', '查詢結果', '17a1e3d1-5950-0d43-0125-000c2909da2e', '2eda0929-0c00-2477-180e-17a1d9e72810', 'U_Grid,U_OCardNum,U_OCardType,U_Checkoutdate,U_Intabreakdte,U_Revolvingrate,U_Cashadvancerate,U_Grid2');
java setImportTemplateFields('2eda0929-0c00-2477-180e-17a1d9e63b40', 'U_CardType,FName,U_Stmtno,U_CardNum,U_Inquiry,U_Grid,U_Grid2');




------疑似不法-登錄交易-存提交易註記登錄
update TsField set  FUnitId='17887266-f300-0001-5ef2-005056c00008', FName='U_Button',      FTitle='執行存提交易註記登錄', FType='Button',              FSize=null, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=0, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='constant', FJoinField=null, FSourceField=null, FSource=null, FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor='transparent', FDefaultValue=null, FHint='執行登錄',                                                                                           FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null where FId='178872b7-c100-0001-5ef2-005056c00008';
