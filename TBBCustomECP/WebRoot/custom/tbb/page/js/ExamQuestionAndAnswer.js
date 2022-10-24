var ExamQuestionAndAnswer =
{
	doAnswerQuestion : function()
	{
		var item = Homepage.getItemByEvent();
//		console.log(item);
		var selected = item.list.getSelectedKeys();
		if (selected == null) {
			alert($text("Public.SelectAlert"));
			return;
		}
		if (selected.length != 1) {
		    Jui.message.alert($text("Ecp.Exam.SelectOne"));
		    return;
		}
		var examId = selected[0];
		var args = {
			"examId"	: examId,
			"action"	: "doAnswerQuestion"
		};
		Utility.openDialog("Ecp.AnswerSheet.View.page", args, null, function(ret) {
			list.refresh();
		});		
	}	
};
Homepage.doLoad= function()
{
	for (var i = 0; i < Homepage.toolBarData.length; ++i) {
		var item = Homepage.toolBarData[i];
//		console.log(item);
		if(Homepage.items[item.id].unitCode=="Ecp.Exam"){
			var args = {
					control:"Button",
					"face" : "ToolButton",
					"highlight" : true,
					"icon" : "ecp/image/16/DoAnswerQuestion.png",
//					"onclick" : function(){alert("aa");},
					"onclick" : ExamQuestionAndAnswer.doAnswerQuestion,
					"text" : "開始作答"
					
			};
			item.data.right.push(args);
		}
		Homepage.items[item.id].toolBar.load(item.data);
		
	}
	
	for (var itemId in Homepage.items) {
		Homepage.items[itemId].content = document.getElementById("BlockContent-" + itemId);
	}
	for (var i = 0, elems = document.getElementsByClassName("HomepageItem"); i < elems.length; ++i) {
		var item = Homepage.items[elems[i].id];
		if (item.refresh != null) {
			Homepage.asyncLoadItems.push(item);
		}
	}
	if (Homepage.asyncLoadItems.length > 0) {
		Homepage.asyncLoadItems.shift().refresh(true);
	}
};
