--暫停轉帳簡訊發送表單--------------------------------------------------------------------------

insert into TsScript set FId='c7bfb856-5000-8a1f-3d0f-1843133115b0', FIndex=1, FPageId='c7bfb856-5000-c601-070a-183d06885eb0', FUrl='custom/tbb/page/notSMS/NotSMSForm.js';
insert into TsScript set FId='c7bfb856-5000-8a1f-3d0f-184313311770', FIndex=2, FPageId='c7bfb856-5000-c601-070a-183d06885eb0', FUrl='custom/tbb/page/common/TBBUtil.js';
update TsField set FLabelColor=null where FId='c7bfb856-5000-c601-070a-183d06cb3720';
--/暫停轉帳簡訊發送表單--------------------------------------------------------------------------

--TBB-電文交易結果說明--------------------------------------------------------------------------
insert into TsDictionaryItem set FDictionaryId='ec9b8729-0c00-a947-3c06-179e5676d840', FEnabled=1, FId='c7bfb856-5000-9f58-c70d-1842d2fbbe40', FIndex=11, FParentValue=null, FText='重複申請',     FValue='0001';
--/TBB-電文交易結果說明--------------------------------------------------------------------------
