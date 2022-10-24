var Common = {
	 doCheckNumber : function(number)
	{
		if(parseInt(number)==number && number!=null)
		{
			//2021.09.29-gemfor/lillian-去除開頭的"0"------
			let num_format = number.replace(/\b(0+)/gi,"");
			if(num_format != ""){
				number = num_format;
			}else{
				number = "0"
			}
			//---------------------------------------------
			if((number.length%3)==0)
				var newStr=new Array(number.length+parseInt(number.length/3)-1);
			else
				var newStr=new Array(number.length+parseInt(number.length/3));
			var strArray=number.split("");
			newStr[newStr.length]=strArray[strArray.length-1];
			var currentIndex=strArray.length-1;
			for(var i=newStr.length-1;i>0;i--){ 
				if((newStr.length-i)%4==0){
					newStr[i]=",";
				}
				else{
					newStr[i]=strArray[currentIndex--];
				}
			}
		return newStr.join("");
		}else{
			return "";
		}
	},
	doLoad : function(){
		if(clientData.pageCode.substring(12,17)=="Form"){
			form.setFieldVisible("FName",false);
			form.getControl("F_Identify").onchange = Common.setFNameValue;
		}
		console.log(clientData.pageCode);
		//console.log(clientData.unitCode.substring(0,3));
		//console.log(clientData.unitCode.substring(0,3)=="TBB");
		if(clientData.pageCode=="Qs.Entity.Info" && clientData.unitCode.substring(0,3)=="TBB"){
		console.log("aaaa");
			Common.reLoad();
		}
	},
	setFNameValue : function(){
		if(form.getFieldValue("F_Identify")!=null){
				form.setFieldValue("FName",form.getFieldValue("F_Identify").toLocaleUpperCase());
			}
	},
	reLoad : function(){
		EntityInfo.doLoad = function()
	{
		EntityInfo.tree = Jui.option.Tree.create({
			target		: "LeftZone",
			onleafclick	: EntityInfo.doTreeLeafClick,
			style		: "height:100%;width:100%;padding-left:6px;overflow:auto"
		});
		Jui.option.Resizer.create({elements:["LeftZone", "ContentZone"]});
		console.log(clientData.urlArgs.unitCode.substring(0,3));
		if(clientData.urlArgs.unitCode.substring(0,3)=="TBB"){
			var data = clientData.typeAndName;
			var first = data.split("：");
			clientData.typeAndName = first[0]+"：";
		}
		Jui.dom.setInnerText($elem("TypeAndName"), clientData.typeAndName);
		if (clientData.urlArgs.entityId == null || clientData.urlArgs.isCopy) {
			for (var i = 1; i < clientData.pages.length; ++i) {
				clientData.pages[i].disabled = true;
			}
		}
		var pageCode = EntityInfo.firstPageCode;
		if (clientData.urlArgs.slavePageCode != null) {
			for (var i = 0; i < clientData.pages.length; ++i) {
				if (clientData.pages[i].id == clientData.urlArgs.slavePageCode) {
					pageCode = clientData.pages[i].id;
				}
			}
		}
		var pages = clientData.pages.concat(clientData.datalinkPages);
		EntityInfo.tree.load(pages);
		EntityInfo.tree.setCurrentId(pageCode);
		EntityInfo.doTreeLeafClick();
};
	},
	fmoney :function(s, n) { //AI.wolf 20211110 將含小數點的金額轉換為千分位顯示 s為金額、n為小數點位數
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
	r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
	}
};
Jui.event.attach(window, 'load', function(){Jui.util.execute('Common.doLoad');});


