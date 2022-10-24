--Emma----------------------------------------------------------------
--TBB.stopcardapply信用卡一般卡/悠遊卡/一卡通聯名卡停卡申請單-------------------------------------------------------------
--修改欄位名稱、必填
update TsField set FTitle='創建時間' where FId='0100c056-5000-ca09-510a-179e49036a00';
update TsField set FRequired=1 where FId='c5cfcd29-0c00-a07a-b805-17bceeab41f0';
--/流水編號/的編號設定設定為禁用
update TsSerialNumber set FEnabled=0 where FId='c5cfcd29-0c00-a07a-b805-17bce47463a0';
--列表加入/流水編號/
java setListFields('0100c056-5000-ca09-510a-179e48558410', 'F_IDNumber,F_CreditCardNo,U_eCardNo,F_AppendName,F_Identify,U_Control,U_StopDate,U_IsStages,U_CardStop,U_Return,FUserId,U_CheckAgent');
--工作流升級至7版
update TwVersion set FStatus='Expired' where FId='c5cfcd29-0c00-a07a-b805-17bddfe163c0';

insert into TwVersion set FBusinessLogCode=null, FBusinessLogDescription=null, FDepartmentId=null, FDescription=null, FEntityEventCode=null, FId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FNotice='{"useDefaultFinishNotice":true,"useDefaultTerminateNotice":true,"useDefaultWorkItemNotice":true,"useDefaultFinishMedia":true,"useDefaultWorkItemMedia":true,"useDefaultTerminateMedia":true}', FReleaseTime=timestamp('2022-03-23 15:19:01'), FRelevantData='[]', FStatus='Active', FVersion=7, FWorkflowId='0100c056-5000-ca09-510a-179e55fab6b0';
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='AGENT',  FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47c310', FInstant=0,    FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=0,    FName='臺企銀客服一線退回修改', FPageLoadHandler=null, FParticipant='{"source":"Initiator"}',                                                                             FPrivilegeId=null, FSupportBatchPass=0,    FSupportClone=0,    FSupportTransfer=0,    FType='Manual', FUrl=null, FUrlType='EntityInfo', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=10, FY=1;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='AGENT1', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47d180', FInstant=0,    FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=0,    FName='臺企銀客服一線(覆核)',   FPageLoadHandler=null, FParticipant='{"source":"Field","value":"entity.U_CheckAgent"}',                                                   FPrivilegeId=null, FSupportBatchPass=0,    FSupportClone=0,    FSupportTransfer=0,    FType='Manual', FUrl=null, FUrlType='EntityInfo', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=5,  FY=6;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='AGENT2', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47ecf0', FInstant=0,    FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=0,    FName='臺企銀客服二線',         FPageLoadHandler=null, FParticipant='{"source":"List","value":[{"text":"臺企銀客服二線","type":"Role","value":"d1a4bd4e-87d0-4833-a596-5adcdbee4abd"}]}', FPrivilegeId=null, FSupportBatchPass=0,    FSupportClone=0,    FSupportTransfer=0,    FType='Manual', FUrl=null, FUrlType='EntityInfo', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=10, FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='AGENT3', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a4766a0', FInstant=0,    FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=0,    FName='臺企銀作業科人員',       FPageLoadHandler=null, FParticipant='{"source":"List","value":[{"text":"臺企銀作業科人員1","type":"Role","value":"bc5fab26-3887-4d6d-b81c-380e04cf1b06"}]}', FPrivilegeId=null, FSupportBatchPass=0,    FSupportClone=0,    FSupportTransfer=0,    FType='Manual', FUrl=null, FUrlType='EntityInfo', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=18, FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='AGENT4', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47e010', FInstant=0,    FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=0,    FName='臺企銀客服一線',         FPageLoadHandler=null, FParticipant='{"source":"Initiator"}',                                                                             FPrivilegeId=null, FSupportBatchPass=0,    FSupportClone=0,    FSupportTransfer=0,    FType='Manual', FUrl=null, FUrlType='EntityInfo', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=25, FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Agree1', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47a490', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='同意',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=5,  FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Agree2', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47aec0', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='同意',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=14, FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Agree3', FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a47b880', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='同意',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=22, FY=11;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Back1',  FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a479270', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='退回',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=5,  FY=1;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Back2',  FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a478370', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='退回',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=10, FY=6;
insert into TwNode set FAutoCompleteMode='None', FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=1,    FBatchPassResult=null, FCode='Back3',  FDeputeHours=null, FDeputeMode='DefaultHours', FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a479ad0', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='退回',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Auto',   FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=14, FY=6;
insert into TwNode set FAutoCompleteMode=null,   FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='END',    FDeputeHours=null, FDeputeMode=null,           FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a474820', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='結束',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='End',    FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=29, FY=1;
insert into TwNode set FAutoCompleteMode=null,   FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='END2',   FDeputeHours=null, FDeputeMode=null,           FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a475cb0', FInstant=null, FJoinCondition='',   FJoinConditionType=null, FJoinMode='Single', FMultiWorkItem=null, FName='結束',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='End',    FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=29, FY=11;
insert into TwNode set FAutoCompleteMode=null,   FAutoCompleteResult=null, FAutoCompleteTimeLength=null, FAutoCompleteTimeType=null, FAutoFinish=null, FBatchPassResult=null, FCode='START',  FDeputeHours=null, FDeputeMode=null,           FExpectedResult=null, FId='d2b80c29-0c00-c469-f104-17fb5a473db0', FInstant=null, FJoinCondition=null, FJoinConditionType=null, FJoinMode=null,     FMultiWorkItem=null, FName='開始',                   FPageLoadHandler=null, FParticipant=null,                                                                                                 FPrivilegeId=null, FSupportBatchPass=null, FSupportClone=null, FSupportTransfer=null, FType='Start',  FUrl=null, FUrlType=null,         FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0', FX=1,  FY=6;
insert into TwLine set FCode='LINE-1',  FCondition='',                           FConditionType=null,         FDefault=1, FFrom='START',  FId='d2b80c29-0c00-c469-f104-17fb5a4811f0', FJumpResult=null, FName='提交', FRoutes=null, FSupportJump=0,    FTo='AGENT1', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-10', FCondition='${AGENT3Result}=="Back"',    FConditionType='JavaScript', FDefault=0, FFrom='AGENT3', FId='d2b80c29-0c00-c469-f104-17fb5a4824b0', FJumpResult=null, FName='打回', FRoutes=null, FSupportJump=0,    FTo='Back3',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-11', FCondition='',                           FConditionType=null,         FDefault=1, FFrom='Back2',  FId='d2b80c29-0c00-c469-f104-17fb5a482c20', FJumpResult=null, FName='退回', FRoutes='[]', FSupportJump=0,    FTo='AGENT',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-12', FCondition='',                           FConditionType=null,         FDefault=1, FFrom='Back3',  FId='d2b80c29-0c00-c469-f104-17fb5a482e00', FJumpResult=null, FName='退回', FRoutes='[]', FSupportJump=0,    FTo='AGENT',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-13', FCondition='',                           FConditionType=null,         FDefault=1, FFrom='Agree1', FId='d2b80c29-0c00-c469-f104-17fb5a482fe0', FJumpResult=null, FName='同意', FRoutes='[]', FSupportJump=0,    FTo='AGENT2', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-14', FCondition='',                           FConditionType=null,         FDefault=1, FFrom='Agree2', FId='d2b80c29-0c00-c469-f104-17fb5a4833b0', FJumpResult=null, FName='同意', FRoutes='[]', FSupportJump=0,    FTo='AGENT3', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-15', FCondition=null,                         FConditionType=null,         FDefault=1, FFrom='Agree3', FId='d2b80c29-0c00-c469-f104-17fb5a4836a0', FJumpResult=null, FName=null,   FRoutes='[]', FSupportJump=null, FTo='AGENT4', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-16', FCondition='${AGENTResult}==''Submit''', FConditionType='JavaScript', FDefault=0, FFrom='AGENT',  FId='d2b80c29-0c00-c469-f104-17fb5a483b20', FJumpResult=null, FName='提交', FRoutes='[]', FSupportJump=0,    FTo='AGENT1', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-2',  FCondition='${AGENTResult}=="Discard"',  FConditionType='JavaScript', FDefault=0, FFrom='AGENT',  FId='d2b80c29-0c00-c469-f104-17fb5a481680', FJumpResult=null, FName='作廢', FRoutes=null, FSupportJump=0,    FTo='END',    FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-3',  FCondition='${AGENT1Result}=="Back"',    FConditionType='JavaScript', FDefault=0, FFrom='AGENT1', FId='d2b80c29-0c00-c469-f104-17fb5a482720', FJumpResult=null, FName='打回', FRoutes=null, FSupportJump=0,    FTo='Back1',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-4',  FCondition='',                           FConditionType=null,         FDefault=1, FFrom='Back1',  FId='d2b80c29-0c00-c469-f104-17fb5a4829b0', FJumpResult=null, FName='退回', FRoutes=null, FSupportJump=0,    FTo='AGENT',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-5',  FCondition='${AGENT1Result}=="Agree"',   FConditionType='JavaScript', FDefault=0, FFrom='AGENT1', FId='d2b80c29-0c00-c469-f104-17fb5a481b80', FJumpResult=null, FName='同意', FRoutes=null, FSupportJump=0,    FTo='Agree1', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-6',  FCondition='${AGENT3Result}=="Agree"',   FConditionType='JavaScript', FDefault=0, FFrom='AGENT3', FId='d2b80c29-0c00-c469-f104-17fb5a482220', FJumpResult=null, FName='同意', FRoutes=null, FSupportJump=0,    FTo='Agree3', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-7',  FCondition='${AGENT2Result}=="Back"',    FConditionType='JavaScript', FDefault=0, FFrom='AGENT2', FId='d2b80c29-0c00-c469-f104-17fb5a481dc0', FJumpResult=null, FName='打回', FRoutes=null, FSupportJump=0,    FTo='Back2',  FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-8',  FCondition='${AGENT2Result}=="Agree"',   FConditionType='JavaScript', FDefault=0, FFrom='AGENT2', FId='d2b80c29-0c00-c469-f104-17fb5a482030', FJumpResult=null, FName='同意', FRoutes=null, FSupportJump=0,    FTo='Agree2', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwLine set FCode='LINE-9',  FCondition='${AGENT4Result}=="Agree"',   FConditionType='JavaScript', FDefault=0, FFrom='AGENT4', FId='d2b80c29-0c00-c469-f104-17fb5a483d00', FJumpResult=null, FName='同意', FRoutes=null, FSupportJump=0,    FTo='END2',   FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwButton set FCode='Agree',   FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a477410', FIndex=1, FName='同意', FNodeId='d2b80c29-0c00-c469-f104-17fb5a4766a0', FPageId=null, FParentId=null, FSaveForm=null, FScript=null,                                         FType='Button';
insert into TwButton set FCode='Back',    FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a477a00', FIndex=2, FName='打回', FNodeId='d2b80c29-0c00-c469-f104-17fb5a4766a0', FPageId=null, FParentId=null, FSaveForm=0,    FScript='',                                           FType='Button';
insert into TwButton set FCode='Submit',  FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47c790', FIndex=1, FName='提交', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47c310', FPageId=null, FParentId=null, FSaveForm=0,    FScript='',                                           FType='Button';
insert into TwButton set FCode='Discard', FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47ca00', FIndex=2, FName='作廢', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47c310', FPageId=null, FParentId=null, FSaveForm=0,    FScript='',                                           FType='Button';
insert into TwButton set FCode='Agree',   FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47d6b0', FIndex=1, FName='同意', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47d180', FPageId=null, FParentId=null, FSaveForm=null, FScript=null,                                         FType='Button';
insert into TwButton set FCode='Back',    FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47d910', FIndex=2, FName='打回', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47d180', FPageId=null, FParentId=null, FSaveForm=0,    FScript='',                                           FType='Button';
insert into TwButton set FCode='Agree',   FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47e4f0', FIndex=1, FName='同意', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47e010', FPageId=null, FParentId=null, FSaveForm=null, FScript=null,                                         FType='Button';
insert into TwButton set FCode='Agree',   FCommentRequired=0, FEntityEventCode=null, FHandleType='JavaScript', FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47f660', FIndex=1, FName='同意', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47ecf0', FPageId=null, FParentId=null, FSaveForm=0,    FScript='stopcardapplyForm.doOpenAgreeDialog(event)', FType='Button';
insert into TwButton set FCode='Back',    FCommentRequired=0, FEntityEventCode=null, FHandleType='Default',    FIcon=null, FId='d2b80c29-0c00-c469-f104-17fb5a47fc00', FIndex=2, FName='打回', FNodeId='d2b80c29-0c00-c469-f104-17fb5a47ecf0', FPageId=null, FParentId=null, FSaveForm=0,    FScript='',                                           FType='Button';
insert into TwEvent set FContent='{FStatus:"END1"}',                                                                                   FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a4757f0', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a474820', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"End"}',                                                                                    FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a476430', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a475cb0', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"Audit3"}',                                                                                 FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a4780c0', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a4766a0', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a478d70', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a478370', FNoticeId='0100c056-5000-870f-8204-17a36e715a70', FNoticeRecipients='[{"type":"Initiator"}]',                                                                FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a479940', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a479270', FNoticeId='0100c056-5000-870f-8204-17a36e3bcc90', FNoticeRecipients='[{"type":"Initiator"}]',                                                                FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a47a230', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a479ad0', FNoticeId='0100c056-5000-870f-8204-17a36e8b8ec0', FNoticeRecipients='[{"type":"Initiator"}]',                                                                FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a47ac00', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47a490', FNoticeId='0100c056-5000-785f-0408-17a37eddc280', FNoticeRecipients='[{"type":"Initiator"},{"type":"Role","value":"d1a4bd4e-87d0-4833-a596-5adcdbee4abd"}]', FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a47b550', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47aec0', FNoticeId='0100c056-5000-785f-0408-17a37f0cc2c0', FNoticeRecipients='[{"type":"Initiator"},{"type":"Role","value":"bc5fab26-3887-4d6d-b81c-380e04cf1b06"}]', FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='',                                                                                                   FEntityEventCode=null, FHandleType='SendNotice',   FId='d2b80c29-0c00-c469-f104-17fb5a47c010', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47b880', FNoticeId='0100c056-5000-785f-0408-17a37f4b2010', FNoticeRecipients='[{"type":"Initiator"}]',                                                                FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"AgentSign1"}',                                                                             FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a47cf10', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47c310', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"AgentSign"}',                                                                              FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a47de10', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47d180', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"AgentSign"}',                                                                              FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a47ea00', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47e010', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='{FStatus:"Audit"}',                                                                                  FEntityEventCode=null, FHandleType='UpdateEntity', FId='d2b80c29-0c00-c469-f104-17fb5a4803a0', FIndex=1, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47ecf0', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnActivityCreateAfter', FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';
insert into TwEvent set FContent='update TpTBBstopcardapply set U_Check2 =
(select twp.FUserId as FUserId  from  TwWorkItem tw 
left join  TwParticipant twp on twp.FWorkItemId = tw.FId
where tw.FEntityId = ${entity.FId} and tw.FActivityCode = ''AGENT2'' and tw.FStatus = ''Drawn'')
where FId = ${entity.FId}', FEntityEventCode=null, FHandleType='Sql',          FId='d2b80c29-0c00-c469-f104-17fb5a480610', FIndex=2, FNodeId='d2b80c29-0c00-c469-f104-17fb5a47ecf0', FNoticeId=null,                                   FNoticeRecipients='[]',                                                                                    FOccasion='OnWorkItemDrawAfter',   FVersionId='d2b80c29-0c00-c469-f104-17fb5a472fd0';

--TBB.stopcardapply信用卡一般卡/悠遊卡/一卡通聯名卡停卡申請單-------------------------------------------------------------

--TBB.UENetBankRL企業網路銀行關係戶資料檔---------------------------------------------------------------
--更新/企業網路銀行關係戶轉帳約定資料檔/網格順序
update TsFieldGridColumn set FIndex=1 where FId='0869c293-b6ea-4ace-9dbf-7a89b09a403c';
update TsFieldGridColumn set FIndex=2 where FId='8631fc6d-7578-4f90-b65a-83c16301a82c';
update TsFieldGridColumn set FIndex=3 where FId='8b63edfb-d1cc-4a2c-bef6-50e0ddd8d281';
update TsFieldGridColumn set FIndex=4 where FId='be60cf75-3bfb-4335-a6d4-6df2cf38e6fd';
update TsFieldGridColumn set FIndex=5 where FId='859d96fd-f93d-4f41-ae39-f81fe0526a0c';
update TsFieldGridColumn set FIndex=6 where FId='d7ec096a-ba3a-4979-ab16-61fe6f0278d7';
update TsFieldGridColumn set FIndex=7 where FId='4e5a0aad-ea28-430d-98d0-4864b0e2b3fa';
update TsFieldGridColumn set FIndex=8 where FId='ea86fabc-de92-40c4-ab89-b6da9d759d1a';
update TsFieldGridColumn set FIndex=9 where FId='d499d6fb-d912-4510-9404-a2849a036b7e';
update TsFieldGridColumn set FIndex=10 where FId='fd4bc688-bcba-42b7-a167-1aaa709ae381';
update TsFieldGridColumn set FIndex=11 where FId='becc7d64-b804-4765-9bf9-96afbe5b1b48';
update TsFieldGridColumn set FIndex=12 where FId='59a139bc-2e42-4315-975c-13dd261efef0';
update TsFieldGridColumn set FIndex=13 where FId='1565be8c-c187-473b-81a6-b2bf68b8c6d8';
update TsFieldGridColumn set FIndex=14 where FId='00800fc2-9fff-4833-bdc8-30541dc69013';
update TsFieldGridColumn set FIndex=15 where FId='cfb37eb7-58a9-4da5-b3b5-4f71e7e0d862';
update TsFieldGridColumn set FIndex=16 where FId='23d701c3-d874-4786-94a8-fc7a70cad8a3';
update TsFieldGridColumn set FIndex=17 where FId='ab700fcd-7d8a-4a97-8091-974b127607ff';
update TsFieldGridColumn set FIndex=18 where FId='8638c11d-238e-4dc3-b70a-7dbdc01219ed';
update TsFieldGridColumn set FIndex=19 where FId='a5794ffa-f55c-4479-82bf-47d4f94e79aa';                     
--/TBB.UENetBankRL企業網路銀行關係戶資料檔---------------------------------------------------------------

--TBB.m12113A業務諮詢轉介單-------------------------------------------------------------------
--欄位/滿意度/改為非必填
update TsField set FRequired=0 where FId='f7378a6a-ad60-4a04-a122-68d136687c10';
--/TBB.m12113A業務諮詢轉介單-------------------------------------------------------------------

--TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------
--更改/查詢結果/長度
update TsField set FSize=50000 where FId='178876fc-1d00-0001-5ef2-005056c00008';             
--/TBB.UAccountTradeDetail疑似不法-查詢交易-帳戶交易明細查詢作業-------------------------------------------------------

--字典-----------------------------------------------------------------------
--TBB-信用卡卡片狀態查詢-客戶屬性
update TsDictionaryItem set FText='行員' where FId='177f755e-0910-0f8c-40b2-9201392884ce';
--TBB-信用卡卡片狀態查詢-帳戶別
update TsDictionaryItem set FText='此卡是正卡' where FId='177f753e-0720-0f8c-40b2-9201392884ce';
--/字典-----------------------------------------------------------------------

--/Emma----------------------------------------------------------------



--Emily----------------------------------------------------------------

--Ecp.Contact-------------------------------------------------------------------
alter table TcContact alter column U_Phone set data type varchar(100);

alter table TcContact alter column U_Phone2 set data type varchar(100);

UPDATE TsField set FType='InputBox-Text' where FId='0c4291ca-0431-42a7-8285-61a5b4ad1825';

UPDATE TsField set FType='InputBox-Text' WHERE FId='c1795cbd-2cd6-456d-8db9-c8fee0186a13';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='869d6c42-3e89-4298-8065-b19249ed0f5a';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='160e9547-5ac0-0c4e-4caa-000c29b55803';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='160e9558-7230-0c4e-4caa-000c29b55803';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='160e954f-f0f0-0c4e-4caa-000c29b55803';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='16459b7b-8eb0-0fc6-1146-005056c00008';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='1657acd8-07e2-42b3-8204-9f54c41cc209';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='898f7bd3-8e7c-4214-8c3e-fd3dc5918a5f';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0318-ac6d-ffffff1574b5';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0338-7f54-ffffff1574b5';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='83da331a-bcea-0538-02fc-ffffff16d231';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0340-d467-ffffff1574b5';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0358-c80e-ffffff1574b6';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0330-aeee-ffffff1574b5';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='83da331a-bcea-0550-b607-ffffff16d232';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='ad7a100f-cbbb-0348-6efd-ffffff1574b5';

UPDATE TsField SET FType='InputBox-Text' WHERE FId='0100c056-5000-5106-a602-17a5b05a5770';

UPDATE TsField SET FType='InputBox-Text',FSize=100 WHERE FId='0100c056-5000-5106-a602-17a5b053f6b0';

UPDATE TsField SET FType='InputBox-Text',FSize=100 WHERE FId='ec9b8729-0c00-2571-750d-17be2672bdb0';

--/Ecp.Contact-------------------------------------------------------------------

--TBB.UGetForms-----------------------------------------------------------------
alter table UGetForms add column U_RealFaxName varchar(2000);

UPDATE TsField set FSource='select FaxResult from FaxLog
where FaxFrom = UGetForms.U_RealFaxName and FaxResult  <> ''IVR''' where FId='0800c056-5000-f21e-9e05-17e29161d250';

insert into TsField set FId='c5cfcd29-0c00-2d03-d309-17ffca26d7c0', FUnitId='16d4631a-fb7a-4ed2-b953-b75ca995bd93', FName='U_RealFaxName',       FTitle='實際傳真名稱', FType='InputBox-Text',       FSize=2000, FVisible=1, FFilterByRole=0, FRequired=0, FReadOnly=1, FQueryable=1, FDictionaryId=null,                                   FEntityUnitId=null,                                   FSupportLocalText=0,    FSupportI18n=0,    FLocalTextField=null, FRelationTable=null, FRelationCapacity=null, FRelationId=null, FSelectListFilterSql=null, FSourceType='local',    FJoinField=null, FSourceField=null, FSource=null,                                                                                             FColSpan=1, FRowSpan=1, FIsNewRow=0,    FListWidth=100, FListAlign='default', FScale=null, FLabelColor=null, FDefaultValue=null,     FHint='',                                            FValidation=null, FWebServiceListQueryField=null, FWebServiceItemQueryField=null, FWebServiceCreateField=null, FCustomData='',   FSelectListFilterSqlExceedable=null, FSelectListConstantFilterSql=null, FSelectListVariableFilterSql=null, FAlwaysBringDataToClient=0, FDefaultValueType=null, FMobileListFormat=null, FFollowingField=null, FParentField=null;

java setListFields('c94e0edd-189b-4c84-9a2e-3fbe00ea70cd', 'F_DTime,U_SerialNo,U_ApplyForm,U_CustName,U_SendWay,U_PostalCode,U_Address,U_Other,U_FaxHistory_new,U_RealFaxName,U_FaxHistory,U_Fax,U_Email');
--/TBB.UGetForms-----------------------------------------------------------------

--Ecp.Exam----------------------------------------------------------------------

UPDATE TsField SET FSize=37000 WHERE FId='cc615f02-ca0b-4a0e-8387-8bf64955d6ef';

--Ecp.Exam----------------------------------------------------------------------

--/Emily----------------------------------------------------------------





