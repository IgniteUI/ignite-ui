initialized = false;
QUnit.module("igTimePicker", {
	setup: function () {
		//pause testing until editors are initialized
		if (!initialized) {
			stop();
			setTimeout(function () { start(); }, 100);
			initialized = true;
		}
	},
	teardown: function () {
	},
	dataProvider: [
		{
			element: '<div/>'
		},
		{
			element: '<input/>'
		},
		{
			element: '<span/>'
		}
	],
	timeFormatDataProvider: [
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "HH:mm",
			result: "23:30",
			config:{
				text: "12:12",
				disp: "00:12"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "hh:mm",
			result: "11:30",
			config:{
				text: "12:12",
				disp: "12:12"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "HH:mm tt",
			result: "23:30 PM",
			config:{
				text: "12:30 AM",
				disp: "00:30 AM"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "hh:mm tt",
			result: "11:30 PM",
			config:{
				text: "21:23",
				disp: "09:23 PM"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "HH:mm t",
			result: "23:30 P",
			config:{
				text: "19:00",
				disp: "19:00 P"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: "23:30",
			format: "hh:mm t",
			result: "11:30 P",
			config:{
				text: "22:22",
				disp: "10:22 P"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: (new Date(2018, 07, 02, 23, 30, 15)),
			//value: "23:30",
			format: "tt HH:mm",
			result: "PM 23:30",
			config:{
				text: "08:33",
				disp: "AM 08:33"
			}
		},
		{
			time: (new Date(2018, 07, 02, 23, 30, 15)),
			value: (new Date(2018, 07, 02, 23, 30, 15)),
			//value: "23:30",
			format: "tt hh:mm",
			result: "PM 11:30",
			config:{
				text: "12:00 PM",
				disp: "PM 12:00"
			}
		}
		// {
		// 	value: "23:30",
		// 	format: "tt HH:mm",
		// 	result: "PM 23:30",
		// 	config:{
		// 		text: "08:33",
		// 		disp: "AM 08:33"
		// 	}
		// },
		// {
		// 	value: "23:30",
		// 	format: "tt hh:mm",
		// 	result: "PM 11:30",
		// 	config:{
		// 		text: "12:00 PM",
		// 		disp: "PM 12:00"
		// 	}
		// },
		// {
		// 	value: time,
		// 	format: "t HH:mm",
		// 	result: "P 23:30",
		// 	config:{
		// 		text: "a11235",
		// 		inp: "a 11:23:5_",
		// 		disp: "??"
		// 	}
		// },
		// {
		// 	value: time,
		// 	format: "t hh:mm",
		// 	result: "P 11:30",
		// 	config:{
		// 		text: "am101010",
		// 		inp: "A 10:10:10",
		// 		disp: "??"
		// 	}
		// }
	], 
	itemsDeltaDataProvider: [
		{
			delta: {hours: 2, minutes: 0},
			expItemsCount: 12
		},
		{
			delta: {hours: 7, minutes: 30},
			expItemsCount: 4
		},
		{
			delta: {hours: 1, minutes: 0},
			expItemsCount: 24
		},
		{
			delta: {hours: 0, minutes: 180},
			expItemsCount: 8
		},
		// {
		// 	delta: {hours: 0, minutes: 7000},
		// 	expItemsCount: 1
		// },
		// {
		// 	delta: {hours: 0, minutes: 0},
		// 	expItemsCount: 0
		// }
	],
	mixedDataProvider:[
		{
			text: "10:00 PM", 
			format: "HH:mm tt",
			expDisp: "22:00 PM",
			delta: {hours: 2, minutes: 0},
			min: "06:00 AM",
			max_hh: "06:00 PM",
			max_HH: "18:00 PM"
		},
		{
			text: "07:00 AM", 
			format: "H:mm t",
			expDisp: "7:00 A",
			delta: {hours: 1, minutes: 0},
			min: "11:00 AM",
			max_hh: "04:00 PM",
			max_HH: "16:00 PM"
		}
		// {
		// 	text: "07:00 AM", 
		// 	format: "H:mm t",
		// 	expDisp: "7:00 A",
		// 	delta: {hours: 1, minutes: 30},
		// 	min: "05:00 AM",
		// 	max_hh: "07:30 PM",
		// 	max_HH: "19:30 PM"
		// }
	],
	spinDeltaDataProvider: [
		{
			value: (new Date(0, 0, 0, 16, 30, 00)),
			delta: {hours: 2, minutes: 0},
			expDisp: "16:30 PM",
			iterate: {hours: 3, minutes: 2},
			expRes:
			{
				spinHours: ["06:30 PM", "08:30 PM", "10:30 PM"],
				spinMinutes: ["04:30 PM", "04:30 PM"]
			}
		},
		{
			value: (new Date(0, 0, 0, 10, 58, 00)),
			delta: {hours: 8, minutes: 1},
			expDisp: "10:58 AM",
			iterate: {hours: 3, minutes: 3},
			expRes:
			{
				spinHours: ["06:58 PM", "02:58 AM", "10:58 AM"],
				spinMinutes: ["10:59 AM", "11:00 AM", "11:01 AM"]
			}
		},
		{
			value: (new Date(0, 0, 0, 9, 0, 0)),
			delta: {hours: 4, minutes: 10},
			expDisp: "09:00 AM",
			iterate: {hours: 3, minutes: 6},
			expRes:
			{
				spinHours: ["01:00 PM", "05:00 PM", "09:00 PM"],
				spinMinutes: ["09:10 AM", "09:20 AM", "09:30 AM", "09:40 AM", "09:50 AM", "10:00 AM"]
			}
		}
	]
});

QUnit.test('Init in div/span/input', function (assert) {
	assert.expect(6);

	//this.dataProvider.forEach(data => {
	this.dataProvider.forEach(function(data){
		var timePicker = $(data.element).appendTo("#qunit-fixture").igTimePicker({
			width: 150
		});

		assert.ok(typeof timePicker.igTimePicker === 'function');
		assert.ok(timePicker.data("igTimePicker") !== undefined);

		timePicker.remove();
	});
});

QUnit.test('Set options on initialization', function (assert) {
	assert.expect(72);

	//this.timeFormatDataProvider.forEach(data => {
	this.timeFormatDataProvider.forEach(function(data){
		var timePicker = createInDiv().igTimePicker({
			width: 150,
			value: data.value,
			buttonType: "spin, clear",
			timeInputFormat: data.format,
			timeDisplayFormat: data.format
		});

		assert.equal("Decrement", spinDownBtn().prop("title"));
		assert.equal("Increment", spinUpBtn().prop("title"));
		assert.equal("Clear value", clearBtn().prop("title"));

		assert.ok(spinDownBtn().children(':first').hasClass('ui-igedit-spinlowerimage'));
		assert.ok(spinUpBtn().children(':first').hasClass('ui-igedit-spinupperimage'));
		assert.ok(clearBtn().children(':first').hasClass('ui-icon-circle-close'));

		assert.equal(timePicker.igTimePicker("field").val(), data.result);
		assert.equal(timePicker.igTimePicker("displayValue"), timePicker.igTimePicker("field").val());

		timePicker.igTimePicker("setFocus");
		assert.equal(timePicker.igTimePicker("field").val(), data.result);

		timePicker.remove();
	});
});

QUnit.test('Apply mask in runtime', function (assert) {
	assert.expect(17);

	var timePicker = createInDiv().igTimePicker({
		width: 150,
		buttonType: "clear"
	});

	//this.timeFormatDataProvider.forEach(data => {
	this.timeFormatDataProvider.forEach(function(data){

		//timePicker.igTimePicker("option", "value", data.time);
		timePicker.igTimePicker("option", "value", data.value);
		timePicker.igTimePicker("option", "timeDisplayFormat", data.format);

		assert.equal(timePicker.igTimePicker("displayValue"), data.result);

		timePicker.igTimePicker("setFocus");
		timePicker.igTimePicker("field").val(data.config.text);
		timePicker.igTimePicker("field").trigger("blur");
		assert.equal(timePicker.igTimePicker("field").val(), data.config.disp);
	});

	clearBtn().trigger("click");
	assert.equal(timePicker.igTimePicker("field").val(), "");

	timePicker.remove();
});

QUnit.test('Dropdown - default state', function (assert) {
	assert.expect(58);

	var timePicker = createInDiv().igTimePicker({
		width: 150,
		height: 50,
		timeInputFormat: "hh:mm tt",
		buttonType: "dropdown"
	});

	assert.equal("Show list", dropDownBtn().prop("title"));
	assert.ok(dropDownBtn().children(':first').hasClass('ui-icon-triangle-1-s'));

	assert.notOk(timePicker.igTimePicker("dropDownVisible"));

	dropDownBtn().trigger("click");
	assert.ok(timePicker.igTimePicker("dropDownVisible"));

	assert.equal(5, timePicker.igTimePicker("option", "visibleItemsCount"));

	var itemsDelta = timePicker.igTimePicker("option", "itemsDelta");
	assert.equal(0, itemsDelta.hours);
	assert.equal(30, itemsDelta.minutes);

	assert.equal(null, timePicker.igTimePicker("option", "minTimeValue"));
	assert.equal(null, timePicker.igTimePicker("option", "minTimeValue"));

	var dropDownItems = dropDownList().children();
	assert.equal(48, dropDownItems.length);

	var expValues = dropDownValues(itemsDelta.hours, itemsDelta.minutes);
	for (i = 0; i < dropDownItems.length; i++){
		assert.equal(expValues[i], dropDownItems[i].innerText);
	}

	timePicker.remove();
});

QUnit.test('Dropdown - set itemsDelta', function (assert) {
	assert.expect(64);

	//this.itemsDeltaDataProvider.forEach(data => {
	this.itemsDeltaDataProvider.forEach(function(data){
		var timePicker = createInDiv().igTimePicker({
			width: 150,
			height: 50,
			buttonType: "dropdown",
			timeInputFormat: "hh:mm tt",
			itemsDelta:{
				hours: data.delta.hours,
				minutes: data.delta.minutes,
			}
		});

		dropDownBtn().trigger("click");
		assert.ok(timePicker.igTimePicker("dropDownVisible"));

		var itemsDelta = timePicker.igTimePicker("option", "itemsDelta");
		assert.equal(data.delta.hours, itemsDelta.hours);
		assert.equal(data.delta.minutes, itemsDelta.minutes);

		var dropDownItems = dropDownList().children();
		assert.equal(data.expItemsCount, dropDownItems.length);

		var expValues = dropDownValues(itemsDelta.hours, itemsDelta.minutes);
		for (i = 0; i < dropDownItems.length; i++){
			assert.equal(expValues[i], dropDownItems[i].innerText);
		}

		timePicker.remove();
	});
});

QUnit.test('Dropdown - valid user input', function (assert) {
	assert.expect(14);

	//this.mixedDataProvider.forEach(data => {
	this.mixedDataProvider.forEach(function(data){
		var timePicker = createInDiv().igTimePicker({
			width: 150,
			height: 50,
			itemsDelta: {hours: 1, minutes: 0},
			visibleItemsCount : 10,
			buttonType: "dropdown",
			timeInputFormat: "hh:mm tt"
		});

		assert.equal(10, timePicker.igTimePicker("option", "visibleItemsCount"));

		timePicker.igTimePicker("option", "timeDisplayFormat", data.format);

		timePicker.igTimePicker("setFocus");
		timePicker.igTimePicker("field").val(data.text);
		timePicker.igTimePicker("field").trigger("blur");

		assert.equal(timePicker.igTimePicker("field").val(), data.expDisp);

		dropDownBtn().trigger("click");

		var selectedItem = timePicker.igTimePicker("getSelectedListItem");
		assert.ok(selectedItem.length > 0);
		assert.equal(data.text, selectedItem.prop("innerText"));
		assert.ok(selectedItem.hasClass('ui-state-highlight'));
		assert.ok(selectedItem.hasClass('ui-igedit-listitemselected'));

		var dropDownListItem = dropDownList().children().filter(".ui-igedit-listitemselected");
		assert.equal(dropDownListItem.prop("innerText"), selectedItem.prop("innerText"));

		timePicker.remove();
	});
});

QUnit.test('Dropdown - invalid user input', function (assert) {
	assert.expect(8);

	var timePicker = createInDiv().igTimePicker({
		width: 150,
		height: 50,
		itemsDelta: {hours: 1, minutes: 30},
		visibleItemsCount : 7,
		buttonType: "dropdown, clear",
		timeDisplayFormat: "HH:mm",
		timeInputFormat: "hh:mm tt"
	});

	timePicker.igTimePicker("setFocus");
	timePicker.igTimePicker("field").val("11:33 AM");
	timePicker.igTimePicker("field").trigger("blur");

	assert.ok(timePicker.hasClass('ui-ignotify-warn'));
	assert.equal(timePicker.igTimePicker("field").val(), "");

	popoverCloseBtn().trigger("click");
	assert.notOk(timePicker.hasClass('ui-ignotify-warn'));

	dropDownBtn().trigger("click");
	assert.ok(timePicker.igTimePicker("dropDownVisible"));
	dropDownList().children().first().next().trigger("click");

	var selectedItem = timePicker.igTimePicker("getSelectedListItem");
	assert.ok(selectedItem.length > 0);
	assert.equal("01:30 AM", selectedItem.prop("innerText"));

	timePicker.igTimePicker("field").trigger("blur");
	assert.equal(timePicker.igTimePicker("field").val(), "01:30");

	assert.equal(dropDownList().children().filter(".ui-igedit-listitemselected").prop("innerText"), selectedItem.prop("innerText"));

	timePicker.remove();
});

QUnit.test('Dropdown - min/max values', function (assert) {
	assert.expect(15);

	//this.mixedDataProvider.forEach(data => {
	this.mixedDataProvider.forEach(function(data){
		var timePicker = createInDiv().igTimePicker({
			width: 150,
			height: 50,
			itemsDelta:{
				hours: data.delta.hours, 
				minutes: data.delta.minutes
			},
			timeInputFormat: "hh:mm tt",
			buttonType: "dropdown",
			minTimeValue: data.min,
			maxTimeValue: data.max_hh
		});

		dropDownBtn().trigger("click");
		var dropDownItems = dropDownList().children();

		var expValues = dropDownValues(data.delta.hours, data.delta.minutes, data.min, data.max_HH);
		
		assert.equal(expValues.length, dropDownItems.length);

		for (i = 0; i < dropDownItems.length; i++){
			assert.equal(expValues[i], dropDownItems[i].innerText);
		}

		timePicker.remove();
	});
});

QUnit.test('Spin - default state', function (assert) {
	assert.expect(105);

	var timePicker = createInDiv().igTimePicker({
		width: 150,
		height: 50,
		timeInputFormat: "hh:mm tt",
		timeDisplayFormat: "hh:mm tt",
		buttonType: "spin"
	});

	assert.ok(spinUpBtn().is(':visible'));
	assert.ok(spinDownBtn().is(':visible'));

	var spinDelta = timePicker.igTimePicker("option", "spinDelta");
	assert.equal(1, spinDelta.hours);
	assert.equal(30, spinDelta.minutes);

	assert.equal(timePicker.igTimePicker("field").val(), "");

	var expValues = dropDownValues(0, 30);
	for (i = 0; i < expValues.length; i++){
		timePicker.igTimePicker("spinUp");
		assert.equal(expValues[i], timePicker.igTimePicker("field").val());
	}

	for (j = expValues.length - 1; j >= 0; j--){
		assert.equal(expValues[j], timePicker.igTimePicker("field").val());
		timePicker.igTimePicker("spinDown");
	}

	setCursorAt(1);
	clickOn(spinDownBtn()[0]);
	assert.equal("10:30 PM", timePicker.igTimePicker("field").val());

	clickOn(spinUpBtn()[0]);
	assert.equal("11:30 PM", timePicker.igTimePicker("field").val());

	setCursorAt(5);
	clickOn(spinUpBtn()[0]);
	assert.equal("12:00 AM", timePicker.igTimePicker("field").val());

	clickOn(spinDownBtn()[0]);
	assert.equal("11:30 PM", timePicker.igTimePicker("field").val());

	timePicker.remove();
});

QUnit.test('Spin - spin delta', function (assert) {
	assert.expect(43);

	//this.spinDeltaDataProvider.forEach(data => {
	this.spinDeltaDataProvider.forEach(function(data){
		var timePicker = createInDiv().igTimePicker({
			width: 150,
			height: 50,
			value: data.value,
			timeInputFormat: "hh:mm tt",
			timeDisplayFormat: "HH:mm tt",
			buttonType: "spin"
		});

		timePicker.igTimePicker("option", "spinDelta", { hours: data.delta.hours, minutes: data.delta.minutes });

		assert.equal(data.expDisp, timePicker.igTimePicker("field").val());

		setCursorAt(1);
		for(i = 0; i < data.iterate.hours; i++){
			clickOn(spinUpBtn()[0]);
			assert.equal(data.expRes.spinHours[i], timePicker.igTimePicker("field").val());
		}

		for(j = data.iterate.hours - 1; j >= 0; j--){
			assert.equal(data.expRes.spinHours[j], timePicker.igTimePicker("field").val());
			clickOn(spinDownBtn()[0]);
		}

		setCursorAt(5);
		for(i = 0; i < data.iterate.minutes; i++){
			clickOn(spinUpBtn()[0]);
			assert.equal(data.expRes.spinMinutes[i], timePicker.igTimePicker("field").val());
		}

		for(j = data.iterate.minutes - 1; j >= 0; j--){
			assert.equal(data.expRes.spinMinutes[j], timePicker.igTimePicker("field").val());
			clickOn(spinDownBtn()[0]);
		}

		timePicker.remove();
	});
});

QUnit.test('Spin - limit to current field', function (assert) {
	assert.expect(6);

	var timePicker = createInDiv().igTimePicker({
		width: 150,
		height: 50,
		value: new Date(0,0,0, 23, 30, 0),
		spinDelta: {hours: 1, minutes: 15},
		limitSpinToCurrentField : true,
		timeInputFormat: "HH:mm",
		timeDisplayFormat: "HH:mm",
		buttonType: "spin"
	});

	assert.equal("23:30", timePicker.igTimePicker("field").val());

	setCursorAt(1);
	clickOn(spinUpBtn()[0]);
	assert.equal("23:30", timePicker.igTimePicker("field").val());

	for(i = 0; i < 24; i++){
		clickOn(spinDownBtn()[0]);
	}
	assert.equal("00:30", timePicker.igTimePicker("field").val());

	setCursorAt(5);
	clickOn(spinUpBtn()[0]);
	assert.equal("00:45", timePicker.igTimePicker("field").val());
	clickOn(spinUpBtn()[0]);
	assert.equal("00:45", timePicker.igTimePicker("field").val());

	for(i = 0; i < 3; i++){
		clickOn(spinDownBtn()[0]);
	}
	assert.equal("00:15", timePicker.igTimePicker("field").val());

	timePicker.remove();
});

QUnit.test('Spin + dropdown', function (assert) {
	assert.expect(20);

	var timePicker = createInDiv().igTimePicker({
		width: 200,
		value: "22:00 PM",
		spinDelta: {hours: 1, minutes: 30},
		itemsDelta: {hours: 2, minutes: 0},
		timeInputFormat: "HH:mm tt",
		timeDisplayFormat: "HH:mm tt",
		buttonType: "spin, dropdown, clear"
	});

	assert.ok(spinUpBtn().is(':visible'));
	assert.ok(spinDownBtn().is(':visible'));
	assert.ok(dropDownBtn().is(':visible'));

	assert.equal("22:00 PM", timePicker.igTimePicker("field").val());

	dropDownBtn().trigger("click");
	assert.ok(timePicker.igTimePicker("dropDownVisible"));
	assert.equal("22:00 PM", dropDownList().children().filter(".ui-igedit-listitemselected").prop("innerText"));

	dropDownList().children().first().next().trigger("click");
	assert.equal("02:00 AM", timePicker.igTimePicker("field").val());

	setCursorAt(1);
	clickOn(spinUpBtn()[0]);
	assert.equal("03:00 AM", timePicker.igTimePicker("field").val());

	timePicker.igTimePicker("field").trigger("blur");
	assert.ok(timePicker.hasClass('ui-ignotify-warn'));
	assert.equal("02:00 AM", timePicker.igTimePicker("field").val());
	
	setCursorAt(1);
	clickOn(spinUpBtn()[0]);
	clickOn(spinUpBtn()[0]);

	timePicker.igTimePicker("field").trigger("blur");
	assert.notOk(timePicker.hasClass('ui-ignotify-warn'));
	assert.equal("04:00 AM", timePicker.igTimePicker("field").val());

	dropDownBtn().trigger("click");
	assert.equal("04:00 AM", dropDownList().children().filter(".ui-igedit-listitemselected").prop("innerText"));

	setCursorAt(5);
	clickOn(spinUpBtn()[0]);

	assert.equal("04:30 AM", timePicker.igTimePicker("field").val());

	timePicker.igTimePicker("field").trigger("blur");
	assert.ok(timePicker.hasClass('ui-ignotify-warn'));
	assert.equal("04:00 AM", timePicker.igTimePicker("field").val());

	setCursorAt(5);
	for(i = 0; i < 4; i++){
		clickOn(spinUpBtn()[0]);
	}

	assert.equal("06:00 AM", timePicker.igTimePicker("field").val());

	dropDownBtn().trigger("click");
	assert.equal("06:00 AM", dropDownList().children().filter(".ui-igedit-listitemselected").prop("innerText"));

	clearBtn().trigger("click");
	assert.equal("__:__ __", timePicker.igTimePicker("field").val());

	timePicker.igTimePicker("field").trigger("blur");
	assert.equal("", timePicker.igTimePicker("field").val());

	timePicker.remove();
});

const id = "time-picker";
function createInDiv(){
	return $("<div/>").attr("id", id).appendTo("#qunit-fixture");
};
function input(){
	return $("#" + id + "EditingInput");
};
function spinDownBtn(){
	return $("#" + id + "_spinDownButton");
};
function spinUpBtn(){
	return $("#" + id + "_spinUpButton");
};
function clearBtn(){
	return  $("#" + id + "_clearButton");
};
function dropDownBtn(){
	return $("#" + id + "_dropDownButton");
};
function dropDownList(){
	return $("#" + id + "_list");
};
function popoverCloseBtn(){
	return $("#" + id + "_popover_closeBtn");
};
function clickOn(element){
	var event = document.createEvent('MouseEvents');

	event.initMouseEvent('mousedown', true, true, window, 1, 0, 0, null, null, false, false, false, false, 0, null);
	element.dispatchEvent(event);

	event.initMouseEvent('mouseup', true, true, window, 1, 0, 0, null, null, false, false, false, false, 0, null);
	element.dispatchEvent(event);
};
function setCursorAt(pos){
	input()[0].focus();
	input()[0].setSelectionRange(pos, pos);
};
//function dropDownValues(hDelta, mDelta, start = "", end = ""){
function dropDownValues(hDelta, mDelta, start, end){
	start = typeof start !== 'undefined' ?  start : "";
	end = typeof end !== 'undefined' ?  end : "";

	var list = [],
		startTime = new Date(),
		endTime = new Date()

	var first = (start != "" ? start : "00:00").replace(/ AM| PM/, '');
	startTime.setHours(parseInt(first.split(":")[0]));
	startTime.setMinutes(parseInt(first.split(":")[1]));
	startTime.setSeconds(0);

	var last = (end != "" ? end : "23:30").replace(/ AM| PM/, '');
	endTime.setHours(parseInt(last.split(":")[0]));
	endTime.setMinutes(parseInt(last.split(":")[1]));
	endTime.setSeconds(0);

	var delta = hDelta * 60 + mDelta;
	var itemsCount = ((endTime.getTime() - startTime.getTime()) / 60000) / delta;

	if (itemsCount == Infinity)
	{
		return start;
	}
	for (k = 0; k <= itemsCount; k++)
	{
		var	date = new Date(startTime);
		date.setMinutes(delta * k);

		var time = date.getHours() == 12 ? "PM" : "AM";
		var hours = "";

		if (date.getHours() == 0)
		{
			hours = (12 + date.getHours()).toString();
		}
		else if (date.getHours() < 10)
		{
			hours = "0" + date.getHours();
		}
		else if (date.getHours() > 12)
		{
			var hours = ((date.getHours() - 12) < 10) ? "0" + (date.getHours() - 12) : (date.getHours() - 12).toString();
			time = "PM";
		}
		else
		{
			hours = date.getHours().toString();
		}

		var minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes().toString();

		//var val = `${hours}:${minutes} ${time}`;
		var val = hours + ":" + minutes + " " + time;

		list.push(val);
	}

	return list;
};