var CsrLogger = 
{
	_debugData	: [],
	_infoData	: [],
	_errorData	: [],
	
	_merge : function()
	{
		var user = CommonBusiness.getCurrentUser();
		var merge =  'csrxml [' + new Date().format("yyyy-MM-dd HH:mm:ss.fff") + '] pageCode=' + clientData.pageCode + ', userName=' + user.userName + ', log=';
		return merge;
	},
	
	debug : function(debug)
	{
		debug = Jui.cast.toString(debug);
		if(debug != null){
			debug = CsrLogger._merge() + debug;
			Jui.window.getTop().CsrLogger._debugData.push(debug);
		}
	},
	
	info : function(info)
	{
		info = Jui.cast.toString(info);
		if(info != null){
			info = CsrLogger._merge() + info;
			Jui.window.getTop().CsrLogger._infoData.push(info);
		}
	},
	
	error : function(error)
	{
		error = Jui.cast.toString(error);
		if(error != null){
			error = CsrLogger._merge() + error;
			Jui.window.getTop().CsrLogger._errorData.push(error);
		}
	},
	
	_doLoad : function()
	{
		
		setInterval(CsrLogger._doCheck, 10000);
	},
	
	_doCheck : function()
	{
		var args = {};
		if(CsrLogger._debugData.length > 200){
			args.debug = CsrLogger._debugData;
			CsrLogger._debugData = [];
		}
		if(CsrLogger._infoData.length > 200){
			args.info = CsrLogger._infoData;
			CsrLogger._infoData = [];
		}
		if(CsrLogger._errorData.length > 200){
			args.error = CsrLogger._errorData;
			CsrLogger._errorData = [];
		}
		if(!Jui.object.isEmpty(args)){
			Utility.invoke("Csr.Logger.write", args, false, function(ret){});
		}
	},
	
	doSendAll : function(event)
	{
		var me = this;
		var wnd = Jui.window.getTop();
		var args = {};
		if(wnd.CsrLogger._debugData.length > 0){
			args.debug = wnd.CsrLogger._debugData;
			wnd.CsrLogger._debugData = [];
		}
		if(wnd.CsrLogger._infoData.length > 0){
			args.info = wnd.CsrLogger._infoData;
			wnd.CsrLogger._infoData = [];
		}
		if(wnd.CsrLogger._errorData.length > 0){
			args.error = wnd.CsrLogger._errorData;
			wnd.CsrLogger._errorData = [];
		}
		if(!Jui.object.isEmpty(args)){
			Utility.invoke("Csr.Logger.write", args, false, function(ret){
				if("getName" in me){
					Jui.message.hint($text("Csr.Csrlog.ClearCache.Success"));
				}
			});
		}
		else{
			if("getName" in me){
				Jui.message.hint($text("Csr.Csrlog.ClearCache.Success"));
			}
		}
	}
};
//if(Jui.window.isTop() && clientData.pageCode == 'Qs.MainFrame'){
//	Jui.event.attach(window, 'load', CsrLogger.doLoad);
//	Jui.event.attach(window, 'unload', CsrLogger.doSendAll);
//	clientData.toolBarJson.right.unshift({
//        icon 	: "quicksilver/image/16/Clear.png",
//        control	: "Button",
//        text	: $text("Csr.Csrlog.ClearCache"),
//        name	: "ClearCSRLogCache",
//        onclick	: CsrLogger.doSendAll
//    });
//}

Date.prototype.format = function(format)
{
	var me = this;
	if (format == null) {
		format = "yyyy-MM-dd HH:mm:ss";
	}
	var y = me.getFullYear();
	var m = me.getMonth() + 1;
	var d = me.getDate();
	var h = me.getHours();
	var n = me.getMinutes();
	var s = me.getSeconds();
	var w = me.getDay();
	var f = me.getMilliseconds();
	return format.replace("yyyy", y).replace("yy", y % 100 < 10 ? "0" + y % 100 : y % 100)
				 .replace("MM", m < 10 ? "0" + m : m).replace("M", m)
				 .replace("dd", d < 10 ? "0" + d : d).replace("d", d)
				 .replace("HH", h < 10 ? "0" + h : h).replace("H", h)
				 .replace("mm", n < 10 ? "0" + n : n).replace("m", n)
				 .replace("ss", s < 10 ? "0" + s : s).replace("s", s)
				 .replace("fff", f < 10 ? "00" + f : ( f < 100 ? '0' + f : f)).replace("ff", f < 10 ? "0" + f : f).replace("f", f)
				 .replace("ww", Jui.util.getWeekDayName(w, false)).replace("w", Jui.util.getWeekDayName(w, true));
};
