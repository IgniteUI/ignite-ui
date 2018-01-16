
QUnit.module("igBaseEditor Editors Common", {
	inputTag: "<input type='text'></input>",
	divTag: "<div></div>",
	spanTag: "<span></span>",
	textareaTag: "<textarea></textarea>",
	pTag: "<p></p>",
	util: $.ig.TestUtil,
	messages: {
		info: "Heads up! This alert needs your attention, but it's not super important.",
		success: "Well done! You successfully read this important alert message.",
		warning: "Warning! Better check yourself, you're not looking too good.",
		error: "Oh snap! Change a few things up and try submitting again."
	},

	beforeEach: function () { },

	afterEach: function () { },

	mouseout: function (element) {
		// create a mouse click event
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('mouseout', true, true, window, 1, 0, 0);

		// send click to element
		element.dispatchEvent(event);
	}

});

QUnit.test('Editors initialization.', function (assert) {
	assert.expect(8);

	var $editorInInput = this.util.appendToFixture(this.inputTag),
		$editorInDiv = this.util.appendToFixture(this.divTag),
		$textEditorInTextArea = this.util.appendToFixture(this.textareaTag),
		$textEditorInDiv = this.util.appendToFixture(this.divTag);

	$editorInInput.igTextEditor({
		value: "input value",
		maxLength: 15
	});

	$textEditorInDiv.igTextEditor(
		{
			value: "div value"
		}).igNotifier({
			direction: "right",
			messages: this.messages
		});

	assert.throws(function () {
		$editorInInput.igBaseEditor();
	},
		Error($.ig.Editor.locale.renderErrMsg),
		"igBaseEditor should not be initialized"
	);

	assert.throws(function () {
		$textEditorInTextArea.igTextEditor();
	},
		Error($.ig.Editor.locale.multilineErrMsg),
		"You should have the type of the editor as multiline"
	);

	assert.ok(typeof ($editorInInput.igTextEditor) === 'function', "Editors Script is not loaded");
	assert.ok($editorInInput.data("igTextEditor") !== undefined, 'Error creating igTextEditor in an input');
	assert.ok($textEditorInDiv.data("igTextEditor") !== undefined, 'Error creating igTextEditor in a div');
	assert.throws(function () {
		$editorInDiv.igBaseEditor();
	}, "Base editor should not be instantiated");
	assert.equal($editorInInput.igTextEditor("value"), "input value", 'The initial value is not as expexted');
	assert.equal($textEditorInDiv.igTextEditor("value"), "div value", 'The initial value is not as expexted');

});

QUnit.test('Events', function (assert) {
	assert.expect(10);
	var $editor = this.util.appendToFixture(this.inputTag), //old $('#eventeditor')
		$field, // old editor
		$container, // old container
		newText = "1",
		testEvent,
		flag = false;

	$editor.igTextEditor();
	$field = $editor.igTextEditor("field");
	$container = $editor.igTextEditor("editorContainer");

	testEvent = function (eventName, attachTo, triggerWith) {
		flag = false;
		// if (attachTo) {
		// 	attachTo.igTextEditor({
		// 		eventName: function () {
		// 			flag = true;
		// 		}
		// 	});
		// }
		attachTo.on("igtexteditor" + eventName, function () {
			flag = true;
		});

		triggerWith.trigger(eventName);
		assert.ok(flag, eventName + " not fired");
	};

	testEvent("mousedown", $editor, $field);
	testEvent("mouseup", $editor, $container);
	testEvent("mousemove", $editor, $editor);
	testEvent("mouseover", $editor, $container);
	this.mouseout($container[0]);
	testEvent("keydown", $editor, $editor);
	testEvent("keyup", $editor, $editor);
	testEvent("keypress", $editor, $editor);
	testEvent("focus", $editor, $field);

	flag = false;
	$editor.off("igtexteditorkeydown igtexteditorkeyup igtexteditorkeypress");
	$editor.on("igtexteditortextchanged", function (evt, ui) {
		flag = ui.oldText === "" && ui.text === newText;
	});
	$editor.trigger("keydown");
	$field.val(newText);
	$editor.trigger("keypress").trigger("keyup");
	assert.ok(flag, "textChanged not fired");
	testEvent("blur", $editor, $field);
});

QUnit.test('Main Methods', function (assert) {
	assert.expect(4);

	var $textEditorInDiv = this.util.appendToFixture(this.divTag),
		$textEditorInInput = this.util.appendToFixture(this.inputTag);

	$textEditorInDiv.igTextEditor(
		{
			value: "div value"
		}).igNotifier({
			direction: "right",
			messages: this.messages
		});

	$textEditorInInput.igTextEditor();

	$textEditorInDiv.igTextEditor("inputName", "nameattr");
	assert.equal($textEditorInDiv.igTextEditor("inputName"), "nameattr", 'The name attribute is not as expected');

	//Value set to null 
	$textEditorInInput.igTextEditor("value", null);

	// TODO: It's not sure what happens if we set null.
	assert.equal($textEditorInInput.igTextEditor("value"), "", 'The value is not correctly set to null');

	//Value set to null when property nullable set to false
	$textEditorInInput.igTextEditor("option", "allowNullValue", false);
	$textEditorInInput.igTextEditor("value", null);
	assert.equal($textEditorInInput.igTextEditor("value"), "", 'The value is not correctly set to an Empty string');

	$textEditorInInput.igTextEditor("value", "MyVal");
	assert.equal($textEditorInInput.igTextEditor("value"), "MyVal", 'The value is not correctly set to MyVal string');
});

QUnit.test('Set Options', function (assert) {
	assert.expect(2);

	var $textEditor = this.util.appendToFixture(this.inputTag);

	$textEditor.igTextEditor({
		button: 'dropdown',
		tabIndex: 2,
		inputName: "myInputName"
	});

	$textEditor.igTextEditor("option", "value", "newVal");
	assert.equal($textEditor.igTextEditor("value"), "newVal", 'The value is not correctly set to "newVal" string');

	// TODO: It's not sure what happens if we set null.
	$textEditor.igTextEditor("option", "value", null);
	assert.equal($textEditor.igTextEditor("value"), "", 'The value is not correctly set to null string');
});

QUnit.test('Test option buttons title', function (assert) {
	assert.expect(4);

	var $numericEditor = this.util.appendToFixture(this.divTag);

	$numericEditor.igNumericEditor({
		listItems: [1, 2, 3],
		buttonType: ' clear , dropdown ,spin',
	});

	assert.equal($numericEditor.data("igNumericEditor")._spinUpButton.attr("title"), $.ig.Editor.locale.spinUpperTitle, "Spin up button doesn't have a title");
	assert.equal($numericEditor.data("igNumericEditor")._spinDownButton.attr("title"), $.ig.Editor.locale.spinLowerTitle, "Spin down button doesn't have a title");
	assert.equal($numericEditor.data("igNumericEditor")._dropDownButton.attr("title"), $.ig.Editor.locale.buttonTitle, "Dropdown button doesn't have a title");
	assert.equal($numericEditor.data("igNumericEditor")._clearButton.attr("title"), $.ig.Editor.locale.clearTitle, "Clear button doesn't have a title");
});

QUnit.test('Test Notifier basics', function (assert) {
	assert.expect(29);
	var done = assert.async();

	var $textEditor = this.util.appendToFixture(this.divTag),
		message = "some dummy message",
		newContent = "<div id='newContent'>nothing to replace</div>",
		originalCoords,
		offsetCoords;

	$textEditor.igTextEditor({
		value: "div value"
	}).igNotifier({
		direction: "right",
		messages: this.messages,
		animationDuration: -1
	});

	/* show success */
	$textEditor.igNotifier("notify", "success");
	assert.ok($textEditor.data("igNotifier").popover.is(":visible"), "Notification not visible");
	assert.ok($textEditor.data("igNotifier").popover.hasClass($.ui.igNotifier.prototype.css.successState), "Notification state class not applied");
	assert.ok($textEditor.hasClass($.ui.igNotifier.prototype.css.successState), "Notification target state class not applied");
	assert.ok($textEditor.igNotifier("getContent").indexOf($.ui.igNotifier.prototype.css.successIcon) === -1, "Notification state icon visible with showIcons off");

	$textEditor.igNotifier("option", "showIcon", true);
	assert.ok($textEditor.igNotifier("getContent").indexOf($.ui.igNotifier.prototype.css.successIcon) > -1, "Notification state icon not visible");

	/* hide */
	$textEditor.igNotifier("hide");
	assert.notOk($textEditor.igNotifier("isVisible"), "Notification not hidden");
	assert.notOk($textEditor.hasClass($.ui.igNotifier.prototype.css.successState), "Notification target state class not cleared");
	$textEditor.igNotifier("show");

	/* set message /message object has been deleted from notifier options and cannot be set through the options due to localization changes/*/
	/*$textEditor.igNotifier("option", "messages", { success: message });
	assert.ok($textEditor.igNotifier("isVisible"), "Notification not visible");
	assert.ok($textEditor.igNotifier("getContent").indexOf($.ui.igNotifier.prototype.css.successIcon) > -1, "Notification state icon not visible");
	assert.ok($textEditor.igNotifier("getContent").indexOf(message) > -1, "Notification message not applied");*/

	$textEditor.igNotifier("notify", "success", "Temp");
	//assert.ok($textEditor.igNotifier("getContent").indexOf("Temp") > -1, "Notification message not applied");
	//assert.ok($textEditor.igNotifier("option", "messages").success === message, "Notification message defaults not preserved");

	/* contentTemplate */
	$textEditor.igNotifier("option", "messages", { success: message });
	$textEditor.igNotifier("option", "contentTemplate", newContent);
	assert.ok($textEditor.igNotifier("getContent") === $(newContent).get(0).outerHTML, "Html content/template not applied");
	$textEditor.igNotifier("option", "contentTemplate", $.ui.igNotifier.prototype.options.contentTemplate);

	/* set states */
	assert.throws(function () {
		$textEditor.igNotifier("option", "state", "random");
	},
		Error($.ig.Notifier.locale.notSupportedState),
		"Not supported notification state is set.");

	assert.ok($textEditor.igNotifier("option", "state") === "success", "Wrong notification state accepted");

	$textEditor.igNotifier("option", "state", "error");
	assert.ok($textEditor.igNotifier("isVisible"), "Notification not visible");
	assert.ok($textEditor.igNotifier("option", "state") === "error", "Error notification state not set");
	assert.ok($textEditor.hasClass($.ui.igNotifier.prototype.css.errorState) && $textEditor.data("igNotifier").popover.hasClass($.ui.igNotifier.prototype.css.errorState), "Error notification state not applied");
	//assert.ok($textEditor.igNotifier("getContent").indexOf(messages.error) > -1, "Notification message not applied");

	/* set notifyLevel and animationSlideDistance (Bug 216623: base widget _setOption) */
	$textEditor.igNotifier("option", "notifyLevel", "error");
	$textEditor.igNotifier("notify", "success");
	assert.ok($textEditor.igNotifier("option", "notifyLevel") === "error", "notifyLevel not set");
	assert.ok(!$textEditor.igNotifier("isVisible"), "Notification still visible with wrong level");

	$textEditor.igNotifier("notify", "error");
	assert.ok($textEditor.igNotifier("isVisible"), "Notification not visible with acceptable level");

	$textEditor.igNotifier("option", "notifyLevel", "success");
	$textEditor.igNotifier("notify", "success");
	assert.ok($textEditor.igNotifier("option", "notifyLevel") === "success", "notifyLevel not set");
	assert.ok($textEditor.igNotifier("isVisible"), "Notification not visible with acceptable level");

	$textEditor.igNotifier("option", "animationSlideDistance", "0");
	$textEditor.igNotifier("notify", "info");

	// parse "Npx" and sum to ignore direcition checks
	originalCoords = parseInt($textEditor.igNotifier("getCoordinates").top) + parseInt($textEditor.igNotifier("getCoordinates").left);
	assert.equal($textEditor.igNotifier("option", "animationSlideDistance"), "0", "AnimationSlideDistance not set");

	$textEditor.igNotifier("option", "animationSlideDistance", 10);
	$textEditor.igNotifier("notify", "info");
	offsetCoords = parseInt($textEditor.igNotifier("getCoordinates").top) + parseInt($textEditor.igNotifier("getCoordinates").left);
	assert.equal($textEditor.igNotifier("option", "animationSlideDistance"), "10", "AnimationSlideDistance not set");
	assert.equal(offsetCoords - originalCoords, 10, "Slide Distance not applied");

	/* destroy */
	var $popover = $textEditor.data("igNotifier").popover;
	$textEditor.igNotifier("destroy");
	assert.ok($textEditor.data("igNotifier") === undefined && $popover.closest(document.documentElement).length === 0, "Notification not removed");
	assert.ok($textEditor.attr('class').indexOf("ui-ignotify") === -1, "Notification styles not removed");

	$textEditor.igNotifier({ notifyLevel: "warning" }).igNotifier("show");
	/* inline */
	assert.throws(function () {
		$textEditor.igNotifier("option", "mode", "random");
	},
		Error($.ig.Notifier.locale.notSupportedMode),
		"Not supported notification mode is set.");

	assert.ok($textEditor.igNotifier("option", "mode") === "auto", "Wrong notification mode accepted");

	$textEditor.igNotifier("option", "mode", "inline");
	assert.ok($textEditor.igNotifier("isVisible"), "Inline changed visible state");
	assert.ok($textEditor.igNotifier("option", "mode") === "inline"
		&& $textEditor.data("igNotifier").popover.hasClass($.ui.igNotifier.prototype.css.inline)
		&& $textEditor.data("igNotifier").popover.prev()[0] === $textEditor[0]
		, "Inline mode not applied");
	$textEditor.igNotifier("option", "mode", "popover");
	assert.ok($textEditor.igNotifier("isVisible") && !$textEditor.data("igNotifier").popover.hasClass($.ui.igNotifier.prototype.css.inline), "Inline state did not get properly switched");

	// Multiple show() calls positioning for Bug 220794:igNotifier is not positioned correctly inside a grid
	$textEditor.igNotifier("destroy");

	// first message must be considerably longer to push the container way up
	$textEditor.igNotifier({
		contentTemplate: "<p>Entry reached the maximum value of 99999 for this field 323122p3 12321 213 123 123123 123 12333</p>",
		direction: "top"
	}).igNotifier("show");

	setTimeout(function () {
		var popoverBottom = parseInt($textEditor.igNotifier("getCoordinates").top) + $textEditor.igNotifier("container").closest(".ui-igpopover").height(), // bottom point of popover
			distanceToEditor = $.ig.util.offset($textEditor).top - popoverBottom; // top point of target

		assert.equal(distanceToEditor, $textEditor.igNotifier("option", "animationSlideDistance"), "Notifier not positioned correctly above editor");
		done();
	}, $textEditor.igNotifier("option", "animationDuration"));
	//immediately fire another show with smalller message
	$($textEditor).igNotifier("setContent", "<p>Entry reached the maximum value of 99999 for this field</p>").igNotifier("show");
});

QUnit.test('Test Notifier hiding when value method is called', function (assert) {
	assert.expect(6);

	var $textEditor = this.util.appendToFixture(this.divTag),
		$numericEditor = this.util.appendToFixture(this.divTag),
		$dateEditor = this.util.appendToFixture(this.divTag);

	$textEditor.igTextEditor({
		value: "input value",
		maxLength: 15
	});
	$numericEditor.igNumericEditor({
		value: 4,
		minValue: 0,
		maxValue: 5
	});

	$dateEditor.igDateEditor({
		maxValue: "12/12/2016",
		minValue: "12/12/2014"
	});

	$textEditor.igTextEditor("value", "I'm very long long long long long message");
	assert.ok($textEditor.igNotifier("isVisible"), "Notifier is shown");
	$textEditor.igTextEditor("value", "I'm short");
	assert.notOk($textEditor.igNotifier("isVisible"), "Notifier is hidden");

	$numericEditor.igNumericEditor("value", 6);
	assert.ok($numericEditor.igNotifier("isVisible"), "Notifier is shown");
	$numericEditor.igNumericEditor("value", 3);
	assert.notOk($numericEditor.igNotifier("isVisible"), "Notifier is hidden");

	$dateEditor.igDateEditor("value", new Date(2018, 1, 1));
	assert.ok($dateEditor.igNotifier("isVisible"), "Notifier is shown");
	$dateEditor.igDateEditor("value", new Date(2015, 1, 1));
	assert.notOk($dateEditor.igNotifier("isVisible"), "Notifier is hidden");
});

QUnit.test('Editor Set Options', function (assert) {
	assert.expect(4);

	var $textEditor = this.util.appendToFixture(this.inputTag);
	$textEditor.igTextEditor(
		{
			button: 'dropdown',
			tabIndex: 2,
			inputName: "myInputName"
		});

	assert.equal($textEditor.igTextEditor("field").attr('tabindex'), "2", "The tab index should be 2");

	$textEditor.igTextEditor("option", "tabIndex", 5);
	assert.equal($textEditor.igTextEditor("field").attr('tabindex'), "5", "The tab index should be 5");

	//inputName inputName: "myInputName"
	assert.equal($textEditor.igTextEditor("editorContainer").find("input[type='hidden']").attr("name"), "myInputName", "The inputName should be myInputName");

	$textEditor.igTextEditor("option", "inputName", "myInputNameNew");
	assert.equal($textEditor.igTextEditor("editorContainer").find("input[type='hidden']").attr("name"), "myInputNameNew", "The inputName should be myInputNameNew");
});

QUnit.test('Test Notifier contentTemplate function and title', function (assert) {
	assert.expect(5);

	var $notifier = this.util.appendToFixture(this.pTag),
		lastState,
		expectedHtml,
		$title,
		title = 'There\'s a message below to take notice of:',
		template = "<span class='{0}'><span class='{1}'></span></span> {2} <span class='{0}'><span class='{1}'></span></span> ",
		templFunc = function () {
			return template;
		};

	$notifier.igNotifier({
		mode: "popover",
		contentTemplate: function (state) {
			lastState = state;
			return templFunc();
		},
		state: "success",
		showOn: "click",
		showIcon: true,
		headerTemplate: {
			closeButton: true,
			title: title
		}
	});

	lastState = "";
	$notifier.click();

	// title
	$title = $notifier.igNotifier("container").closest(".ui-ignotify").find("." + $.ui.igNotifier.prototype.css.titleClass).eq(0);
	assert.ok($title.length && $title.is(":visible"));
	assert.equal($title.text(), title, "Title not correct");

	// contentTemplate
	expectedHtml = template.replace(/\{0\}/g, $.ui.igNotifier.prototype.css.iconContainer)
		.replace(/\{1\}/g, $.ui.igNotifier.prototype.css[lastState + "Icon"])
		.replace(/\{2\}/g, "message!");

	assert.equal(lastState, $notifier.igNotifier("option", "state"), "State argument in template function is not correct");
	assert.ok(($notifier.igNotifier("getContent") !== $('<div>').append(expectedHtml).html()), "Content from template function is not correct.");

	// contentTemplate as jQuery object
	templFunc = function () {
		return $('<div>').append("<div>Ea</div>");
	}
	$notifier.igNotifier("show");
	assert.equal($notifier.igNotifier("getContent"), $('<div>').append("<div>Ea</div>").html(), "Content from template function is correct.");
	$notifier.remove();
});

QUnit.test('Read-Set Options.', function (assert) {
	assert.expect(4);

	var $textEditor = this.util.appendToFixture(this.inputTag);

	$textEditor.attr({
		name: "inputname",
		value: "inputElemValue",
		readonly: "readonly",
		disabled: "disabled"
	}).igTextEditor({
		maxLength: 15
	});

	assert.equal($textEditor.igTextEditor("value"), "inputElemValue", 'Editor value does not match the input attribute value');
	assert.equal($textEditor.igTextEditor("option", "inputName"), "inputname", 'Editor input name does not match the input attribute name');
	assert.equal($textEditor.igTextEditor("option", "readOnly"), true, 'Editor readonly option does not match the input attribute');
	assert.equal($textEditor.igTextEditor("option", "disabled"), true, 'Editor disabled option does not match the input attribute');
});

QUnit.test('Destroy method reverts input state.', function (assert) {
	assert.expect(5);

	var textEditorId = 'textEditorId',
		$textEditor = this.util.appendToFixture('<input/>', { id: textEditorId, type: "text" });

	$textEditor.attr({
		name: "myInputName",
		value: "myInputValue",
		readonly: "readonly",
	}).igTextEditor({
		inputName: "newInputName",
		value: "newInputValue",
		readOnly: false
	});

	$textEditor.igTextEditor("destroy");

	assert.ok(document.getElementById(textEditorId).readOnly === true, 'Input readOnly value is not the same as before Editor init');
	assert.equal(document.getElementById(textEditorId).getAttribute("readonly"), "readonly", 'Input readonly attr is not the same as before Editor init');
	assert.equal(document.getElementById(textEditorId).name, "myInputName", 'Input name value is not the same as before Editor init');

	//check the value prop and see if it is restored
	assert.equal(document.getElementById(textEditorId).value, "myInputValue", 'Input value is not the same as before Editor init');

	//check the value attribute and see if it is restored
	assert.equal(document.getElementById(textEditorId).getAttribute("value"), "myInputValue", 'Input value attr is not the same as before Editor init');
});
