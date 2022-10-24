--字典[TBB-存款帳戶總覽-類別]修改名稱----------------------
update TsDictionary set FName='TBB-存款帳戶總覽-類別' where FId='1788c4f0-9d00-0001-5ef2-005056c00008';

--新增資料連結[帳號查詢客戶資料]----------------------
insert into TsDataLink set FId='ec9b8729-0c00-ff3f-d90b-17ae60d381b0', FName='帳號查詢客戶資料',                           FNote='', FUnitId='00000000-0000-0000-0001-020000001002', FIndex=29, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.DepBalanceInq.Form.page',            FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;


--新增資料連結[虛擬帳號查詢]----------------------
insert into TsDataLink set FId='2eda0929-0c00-ea67-870c-17ae61823590', FName='虛擬帳號查詢', FNote='', FUnitId='00000000-0000-0000-0001-020000001002', FIndex=30, FUrlAddress='http://127.0.0.1:8080/ecp/TBB.VirtualAC.Form.page', FEncrypt=0, FOpenMode='SlavePage', FEnabled=1, FIcon='quicksilver/image/16/Query.gif', FFunctionName=null, FIsEc=0;


