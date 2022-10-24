--TBB.UDebitLoss[金融端掛失]./悠遊卡外顯卡號/ 不唯讀----------------
-- update TsField set FReadOnly=0 where FId='0800c056-5000-ad54-c30f-17cc045a81b0'; -- 此欄位FId與現場不同，已在32裡更新調整
--/TBB.UDebitLoss---------------------------------------------------

--TBB.m12114A-------------------------------------------------------
java setOrderFields('4cbd7598-5cca-4891-8455-1c85f03f33c6', 'FCreateTime,F_Identify,F_CardNumber', '1,0,0');
--/TBB.m12114A------------------------------------------------------

--TBB.m1211CA-------------------------------------------------------
java setOrderFields('9fab5436-78b6-4b43-b32d-6ce5c2d925bd', 'FCreateTime,F_Identify,F_Year,F_Month,F_Day', '1,0,0,0,0');
--/TBB.m1211CA------------------------------------------------------

--TBB.m12117A-------------------------------------------------------
update TwButton set FHandleType='JavaScript', FScript='m12117A.setSerialNo(event)' where FId='2eda0929-0c00-7c06-9009-17baafa720a0';
--/TBB.m12117A------------------------------------------------------

--TBB.UAccountTradeDetail-------------------------------------------
update TsFieldGridColumn set FIndex=1 where FId='1788770b-ae90-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=2 where FId='17887710-c420-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=3 where FId='17887714-3890-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=4 where FId='17887716-eca0-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=5 where FId='1788771a-2f90-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=6 where FId='1788771d-8390-0001-5ef2-005056c00008';
update TsFieldGridColumn set FIndex=8 where FId='17887720-7520-0001-5ef2-005056c00008';
insert into TsFieldGridColumn set FId='ec9b8729-0c00-6330-8207-17f1af87c320', FFieldId='178876fc-1d00-0001-5ef2-005056c00008', FTitle='行庫別',        FKey='U_IBankNo',     FType='String', FIndex=7, FControls='';
--/TBB.UAccountTradeDetail------------------------------------------