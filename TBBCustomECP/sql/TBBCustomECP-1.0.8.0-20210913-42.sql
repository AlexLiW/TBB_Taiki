
--機場新貴通申請單

update TwVersion set FDescription='20210903_修改節點的狀態',FNotice='{"useDefaultFinishNotice":true,"useDefaultTerminateNotice":true,"useDefaultWorkItemNotice":true,"useDefaultFinishMedia":true,"useDefaultWorkItemMedia":true,"useDefaultTerminateMedia":true}', FReleaseTime=timestamp('2021-09-03 12:14:23')    where FId='83da332b-c60f-0210-bac2-ffffff16e101';
update TwNode set FInstant=0,FSupportBatchPass=0 where FId='83da332b-c60f-0200-bfc2-ffffff16e101';
update TwNode set FSupportBatchPass=0 where FId='83da332b-c60f-0258-cac2-ffffff16e101';
update TwNode set FParticipant='{"source":"List","value":[{"text":"客服主管","type":"Role","value":"f0b6ad9a-b24b-4f44-aa8f-6e060449d4c5"}]}',FSupportBatchPass=0 where FId='83da332b-c60f-0a50-cdc2-ffffff16e101';

update TwNode set FInstant=0,FParticipant='{"source":"List","value":[{"text":"臺企銀客服二線","type":"Role","value":"d1a4bd4e-87d0-4833-a596-5adcdbee4abd"}]}',FSupportBatchPass=0 where FId='83da332b-c60f-0268-c6c2-ffffff16e101';
update TwNode set FParticipant='{"source":"List","value":[{"text":"臺企銀作業科人員3","type":"Role","value":"83da338f-2cd2-0050-9fe5-ffffff16bd44"}]}',FSupportBatchPass=0 where FId='83da332b-c60f-0248-d0c2-ffffff16e101';
update TwNode set FParticipant='{"source":"List","value":[{"text":"臺企銀作業科襄理","type":"Role","value":"83da337e-5373-0348-a20d-ffffff15af45"}]}',FSupportBatchPass=0 where FId='83da332b-c60f-0240-d3c2-ffffff16e101';

update TwEvent set FContent='{FStatus:''AgentSign''}' where  FId='83da332b-c60f-0278-c2c2-ffffff16e101';
update TwEvent set FContent='{FStatus:''Audit''}' where  FId='83da332b-c60f-0268-c7c2-ffffff16e101';
update TwEvent set FContent='{FStatus:''AgentSign1''}' where  FId='83da332b-c60f-0258-cbc2-ffffff16e101';
update TwEvent set FContent='{FStatus:''AgentSupervisor''}' where  FId='83da332b-c60f-0248-cfc2-ffffff16e101';
update TwEvent set FContent='{FStatus:''Audit3''}'  where  FId='83da332b-c60f-1a48-d0c2-ffffff16e101';
update TwEvent set FContent='{FStatus:''StaffMgr''}'  where  FId='83da332b-c60f-0238-d4c2-ffffff16e101';

--信用卡分期及提前清償申請單
update TwVersion set FNotice='{"useDefaultFinishNotice":true,"useDefaultTerminateNotice":true,"useDefaultWorkItemNotice":true,"useDefaultFinishMedia":true,"useDefaultWorkItemMedia":true,"useDefaultTerminateMedia":true}', FReleaseTime=timestamp('2021-09-03 13:14:25')  where  FId='83da3350-1b01-0200-2888-ffffff15b3c7';
update TwNode set FInstant=0,FSupportBatchPass=0 where FId='83da3350-1b01-0a00-2888-ffffff15b3c7';
update TwNode set FInstant=0,FSupportBatchPass=0 where FId='83da3350-1b01-2200-2888-ffffff15b3c7';
update TwNode set FParticipant='{"source":"List","value":[{"text":"臺企銀客服二線","type":"Role","value":"d1a4bd4e-87d0-4833-a596-5adcdbee4abd"}]}',FSupportBatchPass=0 where FId='83da3350-1b01-0a70-2d88-ffffff15b3c7';
update TwNode set FInstant=0,FParticipant='{"source":"List","value":[{"text":"臺企銀作業科人員1","type":"Role","value":"bc5fab26-3887-4d6d-b81c-380e04cf1b06"}]}',FSupportBatchPass=0 where FId='83da3350-1b01-0278-2a88-ffffff15b3c7';
update TwLine set FRoutes='[{"x":432,"y":336}]' where FId='83da3350-1b01-0268-2e88-ffffff15b3c7';
update TwEvent set FContent='{FStatus:''AgentSign''}' where FId='83da3350-1b01-1a00-2888-ffffff15b3c7';
update TwEvent set FContent='{FStatus:''AgentSign1''}' where FId='83da3350-1b01-1200-2988-ffffff15b3c7';
update TwEvent set FContent='{FStatus:''Audit3''}' where FId='83da3350-1b01-1a78-2a88-ffffff15b3c7';
update TwEvent set FNoticeRecipients='[{"type":"Role","value":"bc5fab26-3887-4d6d-b81c-380e04cf1b06"},{"type":"Initiator"}]' where FId='83da3350-1b01-0270-2d88-ffffff15b3c7';
update TwEvent set FContent='{FStatus:''Audit''}' where FId='83da3350-1b01-2270-2d88-ffffff15b3c7';



--信用卡/一卡通/聯名卡停卡申請單 調整列表順序
java setListFields('0100c056-5000-ca09-510a-179e48558410', 'F_CreditCardNo,U_eCardNo,F_AppendName,F_Identify,U_Control,U_StopDate,U_IsStages,U_CardStop,U_Return,FUserId,U_Check1,U_CheckAgent');

