var InfoList = {
	doLoad : function(args) {
		var args = clientData.urlArgs;
		var length = args.json.F_Informa.length, length1 = 0;
		for (var i = 0; i < length; i++) {
			console.log(args.json.F_Informa[i].hasOwnProperty("F_CreditType"));

			if (args.json.F_Informa[i].hasOwnProperty("F_CreditType")) {
				length1 = i;
				// break;

			}
		}
		length1 = length1 + 1;
		console.log("length=" + length1);
		document.title = args.title;
		var tb = document.getElementById("tb");
		for (var i = 0; i < length1; i++) {

			var row = tb.insertRow(tb.rows.length);
			var c1 = row.insertCell(0);
			if (args.unitCode != "TBB.m12118A") {
				c1.innerHTML = '<input type="radio" name="radio"/>';
			} else {
				c1.innerHTML = '<input type="checkbox" name="checkbox"/>';
			}
			var c2 = row.insertCell(1);
			if (args.json.F_Informa[i].F_CreditType == "0" || args.json.F_Informa[i].F_CreditType == "9") { // 20210610 adjust by gemfor\Tiffany
				c2.innerHTML = "正卡";
			} else if (args.json.F_Informa[i].F_CreditType == "1") {
				c2.innerHTML = "附卡";
			}
			var c3 = row.insertCell(2);
			c3.innerHTML = args.json.F_Informa[i].F_AppendName;
			var c4 = row.insertCell(3);
			c4.innerHTML = args.json.F_Informa[i].F_AppendEname;
			var c5 = row.insertCell(4);
			c5.innerHTML = args.json.F_Informa[i].F_Sex;
			var c6 = row.insertCell(5);
			c6.innerHTML = args.json.F_Informa[i].F_ID;
			var c7 = row.insertCell(6);
			c7.innerHTML = args.json.F_Informa[i].F_CardKind;
			var c8 = row.insertCell(7);
			c8.innerHTML = args.json.F_Informa[i].F_CreditCardNo;

		}
	},

	doChecked : function() {
		var args = clientData.urlArgs;
		var F_OwnerName = args.json.F_Info[0].F_OwnerName;
		var a = document.getElementsByTagName('input');
		var nums = 0, arg = null;
		var array = [];

		for (var i = 0; i < a.length; i++) {
			if (a[i].checked) {

				nums++;

			}
		}

		// 判斷只帶入一筆正卡資料
		console.log(args.unitCode);
		// console.log(args.unitCode=="TBB.m1211A"?0:1);
		if (args.unitCode == "TBB.m12116A" || args.unitCode == "TBB.m12117A"
				|| args.unitCode == "TBB.m12119A"
				|| args.unitCode == "TBB.m1211CA") {

			if (nums > 1) {
				Jui.message.alert("只能選擇一筆資料");
				return;
			} else if (nums == 0) {
				Jui.message.alert("請選擇至少一筆資料");
				return;
			} else {
				for (var i = 0; i < a.length; i++) {
					if (a[i].checked) {
						var row = a[i].parentElement.parentElement;
						var tds = row.cells;
						var str = "";
						// console.log(tds[1].innerHTML);
						// for循環一行的列長度，并取出每個單元格中的數據放在str字符串中
						if (tds[1].innerHTML == "正卡") {
							// console.log(tds[1].innerHTML);
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";
							}
							// console.log("这是str="+str);
							// 拆分字符串str，並將拆分后的數據放在args對象中
							var Card = str.split("*");
							console.log(Card);
							arg = {
								F_CreditType : Card[0],
								F_AppendName : Card[1],
								F_AppendEname : Card[2],
								F_Sex : Card[3],
								F_ID : Card[4],
								F_CardKind : Card[5],
								F_CardNo : Card[6]
							};
							// console.log("arg= "+JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[0] = arg;
							console.log(array[0]);
						} else if (tds[1].innerHTML == "附卡") {
							Jui.message.alert("您只能勾選一筆正卡資料");
							return;
						} else {
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";
							}
							// console.log("这是str="+str);
							// 拆分字符串str，並將拆分后的數據放在args對象中
							var Card = str.split("*");
							console.log(Card);
							arg = {
								F_CreditType : Card[0],
								F_AppendName : F_OwnerName,
								F_AppendEname : Card[2],
								F_Sex : Card[3],
								F_ID : Card[4],
								F_CardKind : Card[5],
								F_CardNo : Card[6]
							};
							// console.log("arg= "+JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[0] = arg;

						}
					}
				}
			}
		}

		else if (args.unitCode == "TBB.m12111A"
				|| args.unitCode == "TBB.m12112A"
				|| args.unitCode == "TBB.m12113A"
				|| args.unitCode == "TBB.m12114A"
				|| args.unitCode == "TBB.m12115A"
				|| args.unitCode == "TBB.m1211BA"
				|| args.unitCode == "TBB.m1211AA"
				|| args.unitCode == "TBB.stopcardapply") { // 20210610 adjust by gemfor\Tiffany
			if (nums > 1) {
				Jui.message.alert("只能選擇一筆資料");
				return;
			} else if (nums == 0) {
				Jui.message.alert("請選擇至少一筆資料");
				return;
			} else {
				for (var i = 0; i < a.length; i++) {
					if (a[i].checked) {
						var row = a[i].parentElement.parentElement;
						var tds = row.cells;
						var str = "";
						// for循環一行的列長度，并取出每個單元格中的數據放在str字符串中
						if (tds[1].innerHTML == "正卡") {
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";

								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : Card[1],
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};

							}
							// console.log("arg= "+JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[i] = arg;
						} else if (tds[1].innerHTML == "附卡") {
							var index = row.rowIndex - 2;
							for (var x = index; x >= 0; x--) {
								var row1 = a[x].parentElement.parentElement.cells[1].innerHTML;
								if (row1 == "正卡") {
									row1 = a[x].parentElement.parentElement;
									var tds1 = row1.cells;
									for (var j = 1; j < tds1.length; j++) {
										str = str + tds1[j].innerHTML + "*";

										// 拆分字符串str，並將拆分后的數據放在args對象中
										var Card = str.split("*");
										arg = {
											F_CreditType : Card[0],
											F_AppendName : Card[1],
											F_AppendEname : Card[2],
											F_Sex : Card[3],
											F_ID : Card[4],
											F_CardKind : Card[5],
											F_CardNo : Card[6]
										};

									}
									// console.log("arg1111=
									// "+JSON.stringify(arg));
									// 將每個對象都存放在array數組中
									array[0] = arg;
								}
							}
							// console.log(row);
							// console.log(row.cells[1].innerHTML);
							var str1 = "";
							for (var j = 1; j < tds.length; j++) {

								str1 = str1 + tds[j].innerHTML + "*";
								// console.log("这是str="+str1);
								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str1.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : Card[1],
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};

							}
							// console.log("arg= "+JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[1] = arg;
						} else {
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";

								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : F_OwnerName,
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};

							}
							// console.log("arg= "+JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[0] = arg;
						}
					}
				}
			}
		} else if (args.unitCode == "TBB.m12118A") {
			var a = document.getElementsByTagName('input');
			var nums = 0, arg = null, FK = 0;
			var array = [];
			var arr = [];
			// for循環得到已勾選的數量
			for (var i = 0; i < a.length; i++) {

				if (a[i].checked) {

					arr[nums] = a[i].parentElement.parentElement.cells[7].innerHTML
							.substring(0, 12);
					if (a[i].parentElement.parentElement.cells[1].innerHTML == "附卡") {
						FK++;
					}
					nums++;
					console.log(nums);
				}
			}
			if (FK > 2) {
				Jui.message.alert("您最多只能勾選兩張附卡");
				return false;
			}
			for (var j = 0; j < nums; j++) {
				console.log("aaa=" + arr[j]);
				if ((j + 1) < nums) {
					if (arr[j] == arr[j + 1]) {
						continue;
					} else {
						console.log("bbb=" + arr[j + 1]);
						Jui.message.alert("您勾選的信用卡不屬於同一個正卡！");
						return false;
					}
				}
			}

			// for循環進行業務處理
			for (var i = 0; i < a.length; i++) {
				// if已勾選數量大於3
				if (nums > 3) {
					Jui.message.alert("您最多只能勾選三筆資料！");
					return;
				} else if (nums < 1) {
					Jui.message.alert("請選擇至少一筆資料");
					return;
				}

				// if已勾選數量在1-3之間
				else {
					// if第i行已勾選，通過tds獲取單元格屬性
					if (a[i].checked) {
						var row = a[i].parentElement.parentElement;
						var tds = row.cells;
						var str = "";
						// for循環一行的列長度，并取出每個單元格中的數據放在str字符串中
						if (tds[1].innerHTML == "正卡") {
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";

								// console.log("这是str="+str);
								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : Card[1],
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};
								// console.log("arg= "+JSON.stringify(arg));
								array[i] = arg;
							}
						} else if (tds[1].innerHTML == "附卡") {
							var index = row.rowIndex - 2;
							for (var x = index; x >= 0; x--) {
								var row1 = a[x].parentElement.parentElement.cells[1].innerHTML;
								if (row1 == "正卡") {
									row1 = a[x].parentElement.parentElement;
									var tds1 = row1.cells;
									for (var j = 1; j < tds1.length; j++) {
										str = str + tds1[j].innerHTML + "*";

										// 拆分字符串str，並將拆分后的數據放在args對象中
										var Card = str.split("*");
										arg = {
											F_CreditType : Card[0],
											F_AppendName : Card[1],
											F_AppendEname : Card[2],
											F_Sex : Card[3],
											F_ID : Card[4],
											F_CardKind : Card[5],
											F_CardNo : Card[6]
										};

									}
									console.log("arg1111=  "
											+ JSON.stringify(arg));
									// 將每個對象都存放在array數組中
									array[0] = arg;
								}
							}
							// console.log(row);
							// console.log(row.cells[1].innerHTML);
							var str1 = "";
							for (var j = 1; j < tds.length; j++) {

								str1 = str1 + tds[j].innerHTML + "*";
								// console.log("这是str="+str1);
								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str1.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : Card[1],
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};

							}
							console
									.log("arg" + i + "=  "
											+ JSON.stringify(arg));
							// 將每個對象都存放在array數組中
							array[i] = arg;
						} else {
							for (var j = 1; j < tds.length; j++) {
								str = str + tds[j].innerHTML + "*";

								// console.log("这是str="+str);
								// 拆分字符串str，並將拆分后的數據放在args對象中
								var Card = str.split("*");
								arg = {
									F_CreditType : Card[0],
									F_AppendName : F_OwnerName,
									F_AppendEname : Card[2],
									F_Sex : Card[3],
									F_ID : Card[4],
									F_CardKind : Card[5],
									F_CardNo : Card[6]
								};
								// console.log("arg= "+JSON.stringify(arg));
								array[i] = arg;
							}

						}

					}
				}

			}
		}
		console.log("正卡長度=" + array.length);
		for (var i = 0; i < array.length; i++) {
			console.log(array[i]);
			if (array[i] == "" || array[i] == null) {
				// Jui.message.alert("daozhe");
				array.splice(i, 1);
				i--;

			}
		}
		if (confirm("確定選擇此筆資料帶入？")) {
			// 遍歷數組，清除為空的元素

			// 關閉頁面，返回數組參數
			Utility.closeDialog(array);
		} else {
			return;
		}

	}

};
