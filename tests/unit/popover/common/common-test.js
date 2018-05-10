QUnit.module("Popover common unit tests", {
	divNotifier: '<div id="notifier" style="width: calc(100vw - 150px); height: 100px; background-color: blue; margin-left: 100px;"></div>',
	divRegForm: '<div id="registrationForm" style="position: relative; left: 200px;">' +
		'<table>' +
		'<tr><td><label>Name</label></td><td><input id="textEditor" type="text" title="Please enter your first and last name" /></td></tr>' +
		'<tr><td><label>Age</label></td><td><input id="numericEditor" type="number" title="Please enter your age" /></td></tr>' +
		'<tr><td><label>Birthdate</label></td><td><input id="dateEditor" type="date" title="Please enter your birthdate in format dd/MM/yyyy" /></td></tr>' +
		'<tr><td><label>Email</label></td><td><input id="maskEditor" type="email" title="Please enter your email for confirmation" /></td></tr>' +
		'<tr><td></td><td style="float: right"><input type="submit" value="Register" id="submitButton" /></td></tr>' +
		'</table>' +
		'</div>',
	divPopoverTooltip: '<div id="popoverTooltip">' +
		'<input id="sofia" style="width: 200px" title="Sofia,Bulgaria" value="Sofia,Bulgaria" /><br />' +
		'<input id="madrid" style="width: 200px" title="Madrid,Spain" value="Madrid,Spain" /><br />' +
		'<input id="montevideo" style="width: 200px" title="Montevideo,Uruguay" value="Montevideo,Uruguay" /><br />' +
		'<input id="prague" style="width: 200px" title="Prague,Czech republic" value="Prague,Czech republic" /><br />' +
		'<input id="tokyo" style="width: 200px" title="Tokyo,Japan" value="Tokyo,Japan" /><br />' +
		'<input id="london" style="width: 200px" title="London,England" value="London,England" /><br />' +
		'</div>',
	divPopoverImg: '<div id="imgPopover" style="position: relative; width:160px;height:260px;">' +
		'<table>' +
		'<tr><td style="align-items: initial"><input value="Show" id="showBth" type="button" onclick="return showTooltip();" title="Show" /><br />' +
		'<input value="Hide" id="hideBth" type="button" onclick="return hideTooltip();" title="Hide" /></td>' +
		'<td><img id="img1" src="http://www.infragistics.com/assets/images/logo.png" title="Default title" alt="ALT text for the IG logo" /></td>' +
		'</tr>' +
		'</table>' +
		'</div>',
	divGreen: '<div id="green" style="width: 500px; height: 100px; background-color: green; margin-left: 5px;"></div>',
	contentFunction: function () {
		var imgTemplate = "<img class='map' alt='${value}' src='http://maps.google.com/maps/api/staticmap?zoom=10&size=250x250&maptype=terrain&sensor=false&center=${value}'>";
		var element = $(this);
		var data = [{ value: element.attr("value") }];
		return $.ig.tmpl(imgTemplate, data);
	},
	checkClass: function (cont, classToCheck) {
		return cont.hasClass(classToCheck) ? 'The control with id: ' + cont[0].id + ' does not contain the class: ' + classToCheck : "";
	},
	getAbsoluteTargetPosition: function (element) {
		var position = { X: 0, Y: 0 };
		var cElement = element;
		if ((cElement !== null) && (cElement.offset() !== null)) {
			position.X += cElement.offset().left;
			position.Y += cElement.offset().top;
		} else {
			position.X += cElement.offsetLeft;
			position.Y += cElement.offsetTop;
		}
		return position;
	},
	getAbsolutePosition: function (element) {
		var position = { X: 0, Y: 0 };
		var cElement = element;
		while (cElement !== null) {
			position.X += cElement.offsetLeft;
			position.Y += cElement.offsetTop;

			cElement = cElement.offsetParent;
		}
		return position;
	},
	showTooltip: function () {
		$("#img1").igPopover("show");
	},
	hideTooltip: function () {
		$("#img1").igPopover("hide");
	},
	testUtil: $.ig.TestUtil,
	cancelS: false,
	cancelH: false,
	beforeEach: function () {
		$("#qunit").css({
			'float': 'right',
			'width': '400px',
			'overflow': 'auto'
		});
	}
});

// Options tests
var testId_21 = "test 2.1 igPopover target option";
var testId_22 = "test 2.2 igPopover selectors option";
var testId_23 = "test 2.3 igPopover content option";
var testId_24 = "test 2.4 igPopover contentFunction option";
var testId_25 = "test 2.5 igPopover showOn option";
var testId_26 = "test 2.6 igPopover title option";
var testId_27 = "test 2.7 igPopover renderCloseButton option";
var testId_28 = "test 2.8 igPopover closeOnBlur option";
var testId_29 = "test 2.9 igPopover all sizes options";
var testId_30 = "test 3.0 igPopover animationDuration option";

// Events tests
var testId_31 = "test 3.1 igPopover event showing";
var testId_32 = "test 3.2 igPopover event showing cancel";
var testId_33 = "test 3.3 igPopover event hiding";
var testId_34 = "test 3.4 igPopover event hiding cancel";

// Position test
var testId_41 = "test 4.1 igPopover position option";
var testId_42 = "test 4.2 igPopover direction option";
var testId_43 = "test 4.3 igPopover containment option";

// Methods test
var testId_51 = "test 5.1 igPopover show method";
var testId_52 = "test 5.2 igPopover hide method";
var testId_53 = "test 5.3 igPopover setContent method";
var testId_54 = "test 5.4 igPopover getContent method";

// Destroy test
var testId_62 = "igPopover test 8.2.: destroy test";

// directionPriority tests
var testId_71 = "test 7.1 Test directionPriority get/set";
var testId_72 = "test 7.2 Test directionPriority when showing Popover";
var testId_73 = "test 7.3 Test strict direction";

//Automating bugs
var testId_91 = "igPopover test 9.1: Test popover shows correctly when right direction is set";
var testId_911 = "igPopover test 9.11: Test popover shows correctly when top direction is set";
var testId_912 = "igPopover test 9.12: Test popover shows correctly when bottom direction is set";
var testId_913 = "igPopover test 9.13: Test popover shows correctly when left direction is set";
var testId_914 = "igPopover test 9.14: Test popover shows correctly when auto direction is set";
var testId_92 = "igPopover test 9.2: Test popover uses the document boundary if it doesn't fit on the current window";

QUnit.test(testId_21, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	var done = assert.async(), self = this;
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	$("#img1").igPopover("show");
	var target = $("#img1"),
		eventForce = jQuery.Event("mousemove"),
		pos = this.getAbsoluteTargetPosition(target);
	eventForce.pageX = pos.X + 3;
	eventForce.pageY = pos.Y + 3;
	eventForce.target = target;
	$(target).trigger(eventForce);
	this.testUtil.wait(500).then(function () {
		assert.ok($('#img1_popover').css("display") !== "none", "Popover not shown!");
		assert.ok($('#img1_popover_contentFrame').css("display") !== "none", "Popover content not shown!");
		assert.ok($('#img1_popover_arrow').css("display") !== "none", "Popover arrow not shown!");
		assert.ok($('#img1_popover_title').css("display") !== "none", "Popover doesn't have a title!");
		assert.ok($('#img1_popover_closeBtn').css("display") !== "none", "Popover doesn't have a close button!");
		self.checkClass($('#img1_popover_arrow'), 'ui-igpopover-arrow-left');
		$('#img1_popover_closeBtn').trigger("click");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_22, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverTooltip);
	var firstIteration = true, done = assert.async(), self = this;
	$('#popoverTooltip').igPopover({
		direction: "right",
		position: "start",
		closeOnBlur: true,
		animationDuration: 5,
		maxHeight: null,
		maxWidth: 260,
		contentTemplate: this.contentFunction,
		selectors: "input",
		headerTemplate: {
			closeButton: true,
			title: "To display the location of the city is used Google maps"
		},
		showOn: "focus"
	});
	$('#popoverTooltip').children('input').each(function (index, element) {
		var target = $(this),
			event = jQuery.Event("focusin"),
			pos = self.getAbsoluteTargetPosition(target);
		event.pageX = pos.X + 3;
		event.pageY = pos.Y + 3;
		event.target = target;
		$(target).trigger(event);
		self.testUtil.wait(500).then(function () {
			if (firstIteration) {

				assert.ok($('#popoverTooltip_popover').css("display") !== "none", "Popover not shown!");
				firstIteration = false;
			}
			assert.ok($('#popoverTooltip_popover_contentFrame').css("display") !== "none", "Popover content not shown!");
			assert.ok($('#popoverTooltip_popover_arrow').css("display") !== "none", "Popover arrow not shown!");
			assert.ok($('#popoverTooltip_popover_title').css("display") !== "none", "Popover doesn't have a title!");
			assert.ok($('#popoverTooltip_popover_closeBtn').css("display") !== "none", "Popover doesn't have a close button!");
			self.checkClass($('#popoverTooltip_popover_arrow'), 'ui-igpopover-arrow-left');
			$('#popoverTooltip_popover_closeBtn').trigger("click");
			if (index == $('#popoverTooltip').children('input').length - 1) {
				done();
			}
		}).catch(function (er) {
			assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});

	});
});

QUnit.test(testId_23, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	this.testUtil.appendToFixture(this.divPopoverTooltip);
	var target = $("#img1"), done = assert.async(), self = this;
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	$('#popoverTooltip').igPopover({
		direction: "right",
		position: "start",
		closeOnBlur: true,
		animationDuration: 5,
		maxHeight: null,
		maxWidth: 260,
		contentTemplate: this.contentFunction,
		selectors: "input",
		headerTemplate: {
			closeButton: true,
			title: "To display the location of the city is used Google maps"
		},
		showOn: "focus"
	});
	$('#popoverTooltip').igPopover("option", "contentTemplate", "<img src='http://www.infragistics.com/assets/images/logo.png' title='IG logo' />");
	var event = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	event.pageX = pos.X + 3;
	event.pageY = pos.Y + 3;
	event.target = target;
	$(target).trigger(event);
	this.testUtil.wait(1000).then(function () {
		assert.ok($('#img1_popover_contentFrame').css("display") !== "none", "Popover content not shown!");
		assert.ok($('#img1_popover_arrow').css("display") !== "none", "Popover arrow not shown!");
		assert.ok($('#img1_popover_title').css("display") !== "none", "Popover doesn't have a title!");
		assert.ok($('#img1_popover_closeBtn').css("display") !== "none", "Popover doesn't have a close button!");
		self.checkClass($('#img1_popover_arrow'), 'ui-igpopover-arrow-left');
		$('#img1_popover_closeBtn').trigger("click");
		self.testUtil.wait(1000).then(function () {
			assert.ok($('#img1_popover').css("display") === "none", "Popover shown after close button is clicked!");
			done();
		});
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_26, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	var target = $("#img1"), done = assert.async(), self = this;
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var event = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	event.pageX = pos.X + 3;
	event.pageY = pos.Y + 3;
	event.target = target;
	$(target).trigger(event);
	this.testUtil.wait(1000).then(function () {
		assert.ok($('#img1_popover_title').css("display") !== "none", "Popover doesn't have a title!");
		assert.ok($('#img1_popover_title').html() === "No title", "Popover doesn't have a title value set!");
		self.checkClass($('#img1_popover_arrow'), 'ui-igpopover-arrow-left');
		$('#img1_popover_closeBtn').trigger("click");
		self.testUtil.wait(1000).then(function () {
			assert.ok($('#img1_popover').css("display") === "none", "Popover shown after close button is clicked!");
			done();
		});
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_29, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	var target = $("#img1"), done = assert.async(), self = this;
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var event = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	event.pageX = pos.X + 3;
	event.pageY = pos.Y + 3;
	event.target = target;
	$(target).trigger(event);
	this.testUtil.wait(1000).then(function () {
		done();
		assert.ok($('#img1_popover_contentFrame').css("display") !== "none", "Popover content not shown!");
		assert.equal($('#img1_popover_contentFrame').css("max-height"), "450px", "The max-height is not equal to the set one");
		assert.equal($('#img1_popover_contentFrame').css("max-width"), "450px", "The max-width is not equal to the set one");
		assert.equal($('#img1_popover_contentFrame').css("height"), "300px", "The height is not equal to the set one");
		assert.equal($('#img1_popover_contentFrame').css("width"), "400px", "The width is not equal to the set one");
		self.checkClass($('#img1_popover_arrow'), 'ui-igpopover-arrow-left');
		$('#img1_popover_closeBtn').trigger("click");
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
// Showing trigger test.
QUnit.test(testId_31, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var animationDuration = $('#img1').igPopover("option", "animationDuration"),
		shownTrigger = false,
		done = assert.async(),
		self = this,
		target = $("#img1");
	target.one("igpopovershown", function () {
		shownTrigger = true;
	});
	var eventForce = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	eventForce.pageX = pos.X + 3;
	eventForce.pageY = pos.Y + 3;
	eventForce.target = target;
	$(target).trigger(eventForce);
	this.testUtil.wait(animationDuration + 500).then(function () {
		done();
		assert.ok($('#img1_popover').css("display") !== "none", "Showing failed!");
		assert.ok(shownTrigger, "Shown event not triggered");
		$('#img1_popover_closeBtn').trigger("click");
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

//// Showing cancel test
QUnit.test(testId_32, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	$("#img1").bind({
		igpopovershowing: function (event, ui) {
			if (this.cancelS === false) {
				return true;
			}
			return false;
		}
	});
	var animationDuration = $('#img1').igPopover("option", "animationDuration"),
		done = assert.async(),
		self = this,
		target = $("#img1"),
		eventForce = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	eventForce.pageX = pos.X + 3;
	eventForce.pageY = pos.Y + 3;
	eventForce.target = target;

	this.cancelS = true;
	$(target).trigger(eventForce);

	this.testUtil.wait(1000).then(function () {
		done();
		assert.ok($('#img1_popover').css("display") === "none", "Showing cancel failed");
		$("#img1").unbind("igpopovershowing");
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

//// Hiding trigger test
QUnit.test(testId_33, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var animationDuration = $('#img1').igPopover("option", "animationDuration"),
		hiddenTrigger = false,
		done = assert.async(),
		target = $("#img1");
	target.one("igpopoverhidden", function () {
		hiddenTrigger = true;
	});
	target.igPopover("show");
	var eventForce = jQuery.Event("mouseleave"),
		pos = this.getAbsoluteTargetPosition(target);
	eventForce.pageX = pos.X + 3;
	eventForce.pageY = pos.Y + 3;
	eventForce.target = target;
	$(target).trigger(eventForce);
	this.testUtil.wait(animationDuration + 1000).then(function () {
		assert.ok($('#img1_popover').css("display") === "none", "Hiding failed!");
		assert.ok(hiddenTrigger, "Hidden event not triggered");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

// Hiding cancel test
QUnit.test(testId_34, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	$("#img1").bind({
		igpopoverhiding: function (event, ui) {
			if (cancelH === false) {
				return true;
			}
			return false;
		}
	});
	var animationDuration = $('#img1').igPopover("option", "animationDuration"),
		target = $("#img1"),
		event = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target),
		done = assert.async(),
		self = this;
	event.pageX = pos.X + 3;
	event.pageY = pos.Y + 3;
	event.target = target;
	this.cancelH = true;
	$(target).trigger(event);
	this.testUtil.wait(1000).then(function () {
		target = $("#img1")
		event = jQuery.Event("mouseenter");
		pos = self.getAbsoluteTargetPosition(target);
		event.pageX = pos.X + 3;
		event.pageY = pos.Y + 3;
		event.target = target;
		cancelH = true;
		$(target).trigger(event);
		self.testUtil.wait(1000).then(function () {
			assert.ok($('#img1_popover').css("display") !== "none", "Cancel hiding failed!");
			$("#img1").unbind("igpopoverhiding");
			done();
		});
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_51, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var target = $("#img1"), shownTriggers = 0,
		done = assert.async();
	target.on("igpopovershown.test igpopovershowing.test", function () {
		shownTriggers++;
	});
	$('#img1').igPopover("show", target,
		"<img src='http://www.infragistics.com/assets/images/logo.png' title='IG logo' />");
	this.testUtil.wait(1000).then(function () {
		assert.ok($('#img1_popover').css("display") !== "none", "Popover content is  shown!");
		assert.strictEqual(shownTriggers, 0, "Shown/-ing events triggered through API!");
		target.off(".test");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_52, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var target = $("#img1"), hideTriggers = 0, done = assert.async();
	target.on("igpopoverhidden.test igpopoverhiding.test", function () {
		hideTriggers++;
	});
	$('#img1').igPopover("hide");
	this.testUtil.wait(1000).then(function () {
		assert.ok($('#img1_popover').css("display") === "none", "Popover content not shown!");
		assert.strictEqual(hideTriggers, 0, "Hidden/hiding events triggered through API!");
		target.off(".test");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_53, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	var target = $("#img1"),
		newContent = "<img title='IG logo' src='http://www.infragistics.com/assets/images/logo.png'>",
		done = assert.async();
	$("#img1").igPopover("setContent", newContent);

	var eventForce = jQuery.Event("mouseenter"),
		pos = this.getAbsoluteTargetPosition(target);
	eventForce.pageX = pos.X + 3;
	eventForce.pageY = pos.Y + 3;
	eventForce.target = target;
	$(target).trigger(eventForce);

	this.testUtil.wait(1000).then(function () {
		var getContent = $("#img1").igPopover("getContent");
		assert.ok($('#img1_popover_contentInner').html() === getContent, "Popover content not shown!");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test(testId_62, function (assert) {
	this.testUtil.appendToFixture(this.divPopoverImg);
	$('#img1').igPopover({
		direction: "right",
		position: "start",
		animationDuration: 100,
		width: 400,
		height: 300,
		maxHeight: "450px",
		maxWidth: "450px",
		contentTemplate: "<input type='checkbox' onclick='clickMe()' value='Checkbox' /> Infragistics' Logo",
		headerTemplate: {
			closeButton: true,
			title: "No title"
		},
		showOn: "mouseenter"
	});
	$("#img1").igPopover("destroy");
	assert.ok($('#img1_popover').length === 0, "Popover not shown!");
	assert.ok($('#img1_popover_contentFrame').length === 0, "Popover content not shown!");
	assert.ok($('#img1_popover_arrow').length === 0, "Popover arrow not shown!");
	assert.ok($('#img1_popover_closeBtn').length === 0, "Popover doesn't have close button!");
	assert.ok($('#img1_popover_title').length === 0, "Popover doesn't have a title!");
});

QUnit.test(testId_71, function (assert) {
	this.testUtil.appendToFixture(this.divNotifier);
	var i, dpo, p = $("#notifier");
	// test init default
	p.igPopover();
	dpo = p.igPopover("option", "directionPriority");
	assert.ok($.ui.igPopover.prototype.options.directionPriority === dpo, "The array should be the same");
	// test init set
	p.igPopover("destroy");
	p.igPopover({ directionPriority: ["right", "top", "bottom"] });
	dpo = p.igPopover("option", "directionPriority");
	assert.strictEqual(dpo[0], "right", "The first direction is properly set.");
	assert.strictEqual(dpo[1], "top", "The second direction is properly set.");
	assert.strictEqual(dpo[2], "bottom", "The third direction is properly set.");
	assert.strictEqual(dpo.length, 3, "The direction array's length is properly set.");
	// test init wrongly set
	p.igPopover("destroy");
	p.igPopover({ directionPriority: ["wrong", "bottom", "verywrong", "left"] });
	dpo = p.igPopover("option", "directionPriority");
	assert.strictEqual(dpo[0], "bottom", "The first direction is properly set.");
	assert.strictEqual(dpo[1], "left", "The second direction is properly set.");
	assert.strictEqual(dpo.length, 2, "The direction array's length is properly set.");
	// test init fully wrong (should return the default)
	p.igPopover("destroy");
	p.igPopover({ directionPriority: ["wrong", "verywrong"] });
	dpo = p.igPopover("option", "directionPriority");
	assert.strictEqual(dpo[0], $.ui.igPopover.prototype.options.directionPriority[0], "The first direction is properly set.");
	assert.strictEqual(dpo[1], $.ui.igPopover.prototype.options.directionPriority[1], "The second direction is properly set.");
	assert.strictEqual(dpo[2], $.ui.igPopover.prototype.options.directionPriority[2], "The third direction is properly set.");
	assert.strictEqual(dpo[3], $.ui.igPopover.prototype.options.directionPriority[3], "The fourth direction is properly set.");
	assert.strictEqual(dpo.length, 4, "The direction array's length is properly set.");
	p.igPopover("destroy");
	// test setOption runtime
	p.igPopover({ directionPriority: ["wrong", "bottom", "verywrong", "left"] });
	p.igPopover("option", "directionPriority", ["left", "wrong", "top", "right"]);
	dpo = p.igPopover("option", "directionPriority");
	assert.strictEqual(dpo[0], "left", "The first direction is properly set.");
	assert.strictEqual(dpo[1], "top", "The second direction is properly set.");
	assert.strictEqual(dpo[2], "right", "The third direction is properly set.");
	assert.strictEqual(dpo.length, 3, "The direction array's length is properly set.");
	//
	p.igPopover("destroy");
});

QUnit.test(testId_72, function (assert) {
	$("body").append(this.divNotifier);
	$("body").append(this.divGreen);
	var p = $("#notifier");
	p.igPopover({ directionPriority: ["right", "bottom"] });
	p.igPopover("show");
	assert.ok(p.outerHeight() < p.igPopover("container").offset().top, "No place to the right so the popover should appear at the bottom.");
	p.igPopover("hide");
	p.igPopover({ directionPriority: ["right", "top", "bottom"] });
	p.igPopover("show");
	assert.ok(p.outerHeight() < p.igPopover("container").offset().top, "No place to the right or top so the popover should appear at the bottom.");
	p.igPopover("hide");
	p.igPopover({ directionPriority: ["right", "bottom", "top"] });
	p.igPopover("show");
	assert.ok(p.outerHeight() < p.igPopover("container").offset().top, "No place to the right so the popover should appear at the bottom.");
	p.igPopover("destroy");
	p = $("#green").igPopover({ directionPriority: ["right", "left", "bottom"] });
	p.igPopover("show");
	assert.ok(p.outerWidth() < p.igPopover("container").offset().left, "The popover should appear at the right.");
	p.igPopover("destroy");
	p.igPopover({ directionPriority: ["top", "right"] });
	p.igPopover("show");
	assert.ok(p.offset().top > p.igPopover("container").offset().top, "The popover should appear at the top.");
	$("#notifier").remove();
	$("#green").remove();
});

QUnit.test(testId_73, function (assert) {
	$("body").append(this.divNotifier);
	$("body").append(this.divGreen);
	var p = $("#green").igPopover({ direction: "left", directionPriority: ["right", "bottom", "left"] });
	p.igPopover("show");
	assert.ok(p.offset().left > p.igPopover("container").offset().left, "Strict direction should make the Popover appear there.");
	p.igPopover("destroy");
	p = $("#notifier").igPopover({ direction: "right", directionPriority: ["top", "bottom", "right"] });
	p.igPopover("show");
	assert.ok(p.outerWidth() < p.igPopover("container").offset().left, "Strict direction should make the Popover appear there.");
	p.igPopover("destroy");
	p.igPopover({ direction: "top", directionPriority: ["bottom", "top", "right"] });
	p.igPopover("show");
	assert.ok(p.offset().top > p.igPopover("container").offset().top, "Strict direction should make the Popover appear there.");
	p.igPopover("destroy");
	p.igPopover({ direction: "bottom", directionPriority: ["top", "bottom", "right"] });
	p.igPopover("show");
	assert.ok(p.outerHeight() < p.igPopover("container").offset().top, "Strict direction should make the Popover appear there.");
	p.igPopover("destroy");
	$("#notifier").remove();
	$("#green").remove();
});

//bug 228621 - Although setting direction='right', igNotifier shows on top of the target element at first.
QUnit.test(testId_91, function (assert) {
	$("body").append(this.divNotifier);
	$('#notifier').igPopover({ direction: 'right' });
	$('#notifier').igPopover('show');
	assert.ok($('#notifier_popover').css('display') !== 'none', 'Popover not shown!');
	assert.ok($('#notifier_popover_contentFrame').css("display") !== "none", 'Popover content not shown!');
	assert.ok($('#notifier_popover_arrow').css("display") !== "none", 'Popover arrow not shown!');
	assert.ok($('#notifier_popover_arrow').hasClass("ui-igpopover-arrow-left"), 'Popover arrow is pointing to left!');
	assert.ok($('#notifier').offset().top < $('#notifier_popover').offset().top &&
		$('#notifier_popover').offset().top < $('#notifier').offset().top + $('#notifier').height(),
		'Popover is positioned above or below its target');
	assert.ok($('#notifier').offset().left + $('#notifier').width() <= $('#notifier_popover').offset().left,
		'Popover is not positioned on the left its target');
	$('#notifier').remove();
});
QUnit.test(testId_911, function (assert) {
	$("body").append(this.divNotifier);
	$('#notifier').igPopover({ direction: 'top' });
	$('#notifier').igPopover('show');
	assert.ok($('#notifier_popover').css('display') !== 'none', 'Popover not shown!');
	assert.ok($('#notifier_popover_contentFrame').css("display") !== "none", 'Popover content not shown!');
	assert.ok($('#notifier_popover_arrow').css("display") !== "none", 'Popover arrow not shown!');
	assert.ok($('#notifier_popover_arrow').hasClass("ui-igpopover-arrow-bottom"), 'Popover arrow is not pointing to bottom!');
	assert.ok($('#notifier_popover').offset().top + $('#notifier_popover').height() <= $('#notifier').offset().top ||
		$('#notifier_popover').offset().top === 0,    // fixed positions may now overlap the container
		'Popover is not positioned above its target');
	assert.ok($('#notifier').offset().left < $('#notifier_popover').offset().left &&
		$('#notifier_popover').offset().left + $('#notifier_popover').width() < $('#notifier').offset().left + $('#notifier').width(),
		'Popover is positioned into the bounderies of the target');
	$('#notifier').remove();
});
QUnit.test(testId_912, function (assert) {
	$("body").append(this.divNotifier);
	$('#notifier').igPopover({ direction: 'bottom' });
	$('#notifier').igPopover('show');
	assert.ok($('#notifier_popover').css('display') !== 'none', 'Popover not shown!');
	assert.ok($('#notifier_popover_contentFrame').css("display") !== "none", 'Popover content not shown!');
	assert.ok($('#notifier_popover_arrow').css("display") !== "none", 'Popover arrow not shown!');
	assert.ok($('#notifier_popover_arrow').hasClass("ui-igpopover-arrow-top"), 'Popover arrow is not pointing to top!');
	assert.ok($('#notifier').offset().top + $('#notifier').height() <= $('#notifier_popover').offset().top,
		'Popover is not positioned below its target');
	assert.ok($('#notifier').offset().left < $('#notifier_popover').offset().left &&
		$('#notifier_popover').offset().left + $('#notifier_popover').width() < $('#notifier').offset().left + $('#notifier').width(),
		'Popover is positioned into the bounderies of the target');
	$('#notifier').remove();
});
QUnit.test(testId_913, function (assert) {
	$("body").append(this.divNotifier);
	$('#notifier').igPopover({ direction: 'left' });
	$('#notifier').igPopover('show');
	assert.ok($('notifier_popover').css('display') !== 'none', 'Popover not shown!');
	assert.ok($('#notifier_popover_contentFrame').css("display") !== "none", 'Popover content not shown!');
	assert.ok($('#notifier_popover_arrow').css("display") !== "none", 'Popover arrow not shown!');
	assert.ok($('#notifier_popover_arrow').hasClass("ui-igpopover-arrow-right"), 'Popover arrow is not pointing to right!');
	assert.ok($('#notifier').offset().top < $('#notifier_popover').offset().top &&
		$('#notifier_popover').offset().top < $('#notifier').offset().top + $('#notifier').height(),
		'Popover is positioned above or below its target');
	assert.ok($('#notifier_popover').offset().left + $('#notifier_popover').width() <= $('#notifier').offset().left,
		'Popover is not positioned on the left its target');
	$('#notifier').remove();
})
QUnit.test(testId_914, function (assert) {
	$("body").append(this.divNotifier);
	$('#notifier').igPopover({ direction: 'auto' });
	$('#notifier').igPopover('show');
	assert.ok($('notifier_popover').css('display') !== 'none', 'Popover not shown!');
	assert.ok($('#notifier_popover_contentFrame').css("display") !== "none", 'Popover content not shown!');
	assert.ok($('#notifier_popover_arrow').css("display") !== "none", 'Popover arrow not shown!');
	assert.ok($('#notifier_popover_arrow').hasClass("ui-igpopover-arrow-top"), 'Popover arrow is not pointing to top!');
	assert.ok($('#notifier').offset().top + $('#notifier').height() <= $('#notifier_popover').offset().top,
		'Popover is not positioned below its target');
	assert.ok($('#notifier').offset().left < $('#notifier_popover').offset().left &&
		$('#notifier_popover').offset().left + $('#notifier_popover').width() < $('#notifier').offset().left + $('#notifier').width(),
		'Popover is positioned into the bounderies of the target');
	$('#notifier').remove();
});


//bug #230963 - Popover is not positioned as expected
QUnit.test(testId_92, function (assert) {
	//use the container to add scrollbar to the page
	var windowHeight = $(window.document).height();
	var windowWidth = $(window.document).width();
	var targetContainer = $("<div>").css({ height: windowHeight + 200, width: windowWidth + 100, position: "absolute", "background-color": "red" })
		.append($("<div id='target_boundary'>").css({ height: windowHeight - 200, width: windowWidth, top: 0, position: "relative", "background-color": "#CC0000" }));
	//height should be smaller than 200 so it can fit in the boundary of the document
	var popoverContent = $("<div>Content</div>").css({ height: 150, width: 50, "background-color": "green" });
	targetContainer.prependTo($("body"));
	$('#target_boundary').igPopover({ "contentTemplate": popoverContent });
	$('#target_boundary').igPopover("show");

	//popover can fit on the bottom inside the boundaries of the current window
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-top"), 'Popover arrow is not pointing to top!');
	assert.ok($('#target_boundary').offset().top + $('#target_boundary').height() <= $('#target_boundary_popover').offset().top,
		'Popover is not positioned below its target');

	//popover can fit on the top inside the boundaries of the current window
	$("#target_boundary").css("top", 200);
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-bottom"), 'Popover arrow is not pointing to bottom!');
	assert.ok($('#target_boundary_popover').offset().top + $('#target_boundary_popover').height() <= $('#target_boundary').offset().top,
		'Popover is not positioned above its target');

	//popover can fit on the right inside the boundaries of the current window
	$("#target_boundary").css({ "top": 0, height: windowHeight, width: windowWidth - 100 });
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-left"), 'Popover arrow is not pointing to left!');
	assert.ok($('#target_boundary').offset().left + $('#target_boundary').width() <= $('#target_boundary_popover').offset().left,
		'Popover is not positioned on the left its target');

	//popover can fit on the left inside the boundaries of the current window
	$("#target_boundary").css({ "left": 100, height: windowHeight, width: windowWidth - 100 });
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-right"), 'Popover arrow is not pointing to right!');
	assert.ok($('#target_boundary_popover').offset().left + $('#target_boundary_popover').width() <= $('#target_boundary').offset().left,
		'Popover is not positioned on the left its target');

	//popover can't fit in the boundaries of the window, but can fit on the bottom inside the boundaries of the document
	windowHeight = $(window.document).height();
	$("#target_boundary").parent().css("height", windowHeight + 200);
	$("#target_boundary").css({ left: 0, height: windowHeight, width: windowWidth });
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-top"), 'Popover arrow is not pointing to top!');
	assert.ok($('#target_boundary').offset().top + $('#target_boundary').height() <= $('#target_boundary_popover').offset().top,
		'Popover is not positioned below its target');

	//popover can't fit in the boundaries of the window, but can fit on the top inside the boundaries of the document
	$("#target_boundary").css("top", 200);
	$(window).scrollTop(200);
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-bottom"), 'Popover arrow is not pointing to bottom!');
	assert.ok($('#target_boundary_popover').offset().top + $('#target_boundary_popover').height() <= $('#target_boundary').offset().top,
		'Popover is not positioned above its target');

	//popover can't fit in the boundaries of the window, but can fit on the right inside the boundaries of the document
	windowHeight = $(window.document).height();
	$("#target_boundary").parent().css("height", windowHeight + 200);
	$("#target_boundary").css({ top: 0, height: windowHeight + 200 });
	$(window).scrollTop(0);
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-left"), 'Popover arrow is not pointing to left!');
	assert.ok($('#target_boundary').offset().left + $('#target_boundary').width() <= $('#target_boundary_popover').offset().left,
		'Popover is not positioned on the left its target');

	//popover can't fit in the boundaries of the window, but can fit on the left inside the boundaries of the document
	$("#target_boundary").css("left", 100);
	$(window).scrollLeft(100);
	$('#target_boundary').igPopover("show");
	assert.ok($('#target_boundary_popover_arrow').hasClass("ui-igpopover-arrow-right"), 'Popover arrow is not pointing to right!');
	assert.ok($('#target_boundary_popover').offset().left + $('#target_boundary_popover').width() <= $('#target_boundary').offset().left,
		'Popover is not positioned on the left its target');

	targetContainer.remove();
	$('#target_boundary').remove();
	$(window).scrollLeft(0);
});



