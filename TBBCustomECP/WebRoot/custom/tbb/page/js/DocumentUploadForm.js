var UploadForm ={

	doUpload: function(toSubmit)
	{
		if (!EntityForm.validate()) {
			return;
		}
		
		var fileListData = DocumentUploadForm.list.getData();
		if (fileListData.length == 0) {
			Jui.message.alert($text("Qs.Misc.FileBatchUpload.NoReadyFileAlert"));
			return;
		}
		
		if (form.getFieldValue("FPublicType") == "Range" 
			&& PublicRangeUtil.PublicRangeList.length() == 0) {
				Jui.message.alert($text("Ecp.Document.SelectPublishRangeAlert"));
				return;
		}
		var fFileTypeArray;
		var fFileType;
		var flag =0;
		Utility.syncInvoke("TBB.UGetForms.doGetFileType",null,function(ret){
				fFileTypeArray = ret.fFileTypeArray; 
				fFileType = ret.fFileType;
				
		});
		//1.先檢查檔名
		var nameList = {};
		for(var i=0; i < fileListData.length; i++){
			var filesName = fileListData[i].name.split(".");
			for(var j=0 ;j<fFileTypeArray.length;j++){
				if(fFileTypeArray[j].match(filesName[filesName.length-1].toString().toLocaleLowerCase())){
					flag =1;
				}
			}
			//var fileType = "tif"; 
			if(flag==0){		
				Jui.message.alert("上傳文件中包含不是"+fFileType+"格式，請正確格式的文檔！！！");
				return;
			} 
			nameList[i]  = {
				id : fileListData[i].id,
				name : fileListData[i].name
			};
		}
		var args = {
				nameList 	: nameList,
				editId		: uploadData.args.editId,
				catalogIds	: uploadData.args.catalogIds
		};
		Utility.invoke(clientData.unitCode + ".checkDocumentCatalogRelation", args, true, function(ret){
			if(ret.conflict != null){
				//2.跳衝突頁面
				Utility.openDialog(clientData.unitCode + ".ConflictForm.page", {conflictList : ret.conflict}, null, function(retHandle){
					//3.更新上傳資訊
					DocumentUploadForm.conflictList = retHandle.conflict;
					//4.再上傳
					DocumentUploadForm.startUpload(toSubmit);
				});
			}else{
				DocumentUploadForm.startUpload(toSubmit);
			}
		}, {ignoreError:true});
	}

};
DocumentUploadForm.doUpload=UploadForm.doUpload;