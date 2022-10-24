--TBB.UVoiceBank----------------------------------------------------------------
update TsField set FIsNewRow=0 where FId='17887994-31f0-0001-5ef2-005056c00008';
--/TBB.UVoiceBank---------------------------------------------------------------

--TBB.m1211AA-------------------------------------------------------------------
insert into TsScript set FId='ec9b8729-0c00-5e09-0a0e-179f51595a00', FIndex=5, FPageId='887feaac-26c0-4f32-9550-b60d880c9def', FUrl='custom/tbb/page/common/TBBUtil.js';

update TsUnit set FIsTreeCheckPrivilege=0, FApiEnabled=0 where FId='81dd2cbd-0751-4fa7-b667-21b49e7bc8f3';

update TsToolItem set FDefaultEventHandler='// Info.doCsrQuery("NB01")
TBBUtil.doInfoPost()' where FId='05b9467f-d258-4834-a4d5-e178ed7382c0';
--/TBB.m1211AA------------------------------------------------------------------

--TBB.m12112A-------------------------------------------------------------------
update TsField set FTitle='內容說明1（330字以内）' where FId='25600c66-0c6a-47ab-aadb-5353d2a67773';
update TsField set FTitle='客訴中心處理結果（330字以内）' where FId='65ec3345-4369-4887-a4d0-3e229a1fe42d';
--/TBB.m12112A------------------------------------------------------------------

--TBB.m12113A-------------------------------------------------------------------
update TsField set FTitle='問題陳述區（650字以内）' where FId='ee8704e8-3cad-406d-9acb-00e3a23153c6';
update TsField set FTitle='處理結果（400字以内）' where FId='b12d696f-6b27-420a-936a-19573dce52a6';
--/TBB.m12113A------------------------------------------------------------------