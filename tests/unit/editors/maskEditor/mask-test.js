QUnit.module("igMaskEditor unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>'	
});


QUnit.test('[ID1] Mask editor options set on runtime', function (assert) {
	assert.expect(2);

	var editor = $.ig.TestUtil.appendToFixture(this.divTag);
	editor.igMaskEditor({
		inputMask: "CCC"
	});

	assert.throws(function () {
		editor.igMaskEditor("option", "excludeKeys", "asds")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "excludeKeys");

	assert.throws(function () {
		editor.igMaskEditor("option", "unfilledCharsPrompt", "*")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "unfilledCharsPrompt");
});

QUnit.test('[ID2] Mask editor initialization', function (assert) {
	assert.expect(4);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		value: "CCC",
		width: 400,
		inputName: "firstName",
		selectionOnFocus: "selectAll",
		buttonType: "clear",
		maxLength: 1,
		listItems: [1, 2, 3]
	});

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor2.igMaskEditor({
		inputMask: "LL00C",
		emptyChar: "*",
		value: "aa1"
	});

	assert.ok(typeof (editor1.igMaskEditor) === 'function', "Editor's script is not loaded");
	assert.ok(editor1.data("igMaskEditor") !== undefined, 'igMaskEditor created in an input tag should not throw an error');
	assert.equal(editor1.igMaskEditor("value"), "CCC", 'The initial editor value should be CCC');
	assert.equal(editor2.igMaskEditor("value"), "aa1*", 'The initial editor value should be aa1');
});


QUnit.test('[ID3] Mask editor test typing', function (assert) {
	assert.expect(9);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		excludeKeys: "~!@#$%^&*(){}[]\\'*\"",
	});

	var editValue = "a_________";
	var displayValue = "a";
	var expectedValue = "a";

	editor.igMaskEditor("setFocus");
	editor.igMaskEditor("field").val(editValue);
	$.ig.TestUtil.keyInteraction(65, editor);
	assert.equal(editor.igMaskEditor("field").val(), editValue, "Edit value should be " + editValue);
	editor.igMaskEditor("field").blur();
	assert.equal(editor.igMaskEditor("displayValue"), displayValue, "Display value should be " + displayValue);
	assert.equal(editor.igMaskEditor("value"), expectedValue, "Value sent to the server should be " + expectedValue);

	editValue = "ab________";
	displayValue = "ab";
	expectedValue = "ab";

	editor.igMaskEditor("setFocus");
	editor.igMaskEditor("field").val("ab________");
	$.ig.TestUtil.keyInteraction(66, editor);
	assert.equal(editor.igMaskEditor("field").val(), editValue, "Edit value should be " + editValue);
	editor.igMaskEditor("field").blur();
	assert.equal(editor.igMaskEditor("displayValue"), displayValue, "Display value should be " + displayValue);
	assert.equal(editor.igMaskEditor("value"), expectedValue, "Value sent to the server should be " + expectedValue);

	editValue = "abc_______";
	displayValue = "abc";
	expectedValue = "abc";

	editor.igMaskEditor("setFocus");
	editor.igMaskEditor("field").val("abc_______");
	$.ig.TestUtil.keyInteraction(67, editor);
	assert.equal(editor.igMaskEditor("field").val(), editValue, "Edit value should be " + editValue);
	editor.igMaskEditor("field").blur();
	assert.equal(editor.igMaskEditor("displayValue"), displayValue, "Display value should be " + displayValue);
	assert.equal(editor.igMaskEditor("value"), expectedValue, "Value sent to the server should be " + expectedValue);
});

QUnit.test('[ID4] Mask editor events testing', function (assert) {
	assert.expect(4);
	var done = assert.async();

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: "990",
		promptChar: "_",
		padChar: "~",
		emptyChar: "?",
		value: 34
	});

	var textChanged = 0,
		editorInput = editor.igMaskEditor("field"),
		text;

	editor.igMaskEditor("setFocus");
	editor.on("igmaskeditortextchanged", function (evt, args) {
		assert.equal(args.text, text, "TextChanged event should be fired with the correct new value");
		textChanged++;
	});

	$.ig.TestUtil.wait(200).then(function () {
		text = editorInput.val();
		text = text.substr(0, textChanged) + "1" + text.substr(textChanged + 1, text.length);
		editorInput[0].setSelectionRange(textChanged, textChanged + 1);
		$.ig.TestUtil.keyInteraction(text.charCodeAt(textChanged), editorInput);
		assert.equal(textChanged, 1, "TextChanged event should be fired");
		text = text.substr(0, textChanged) + "2" + text.substr(textChanged + 1, text.length);
		editorInput[0].setSelectionRange(textChanged, textChanged + 1);
		$.ig.TestUtil.keyInteraction(text.charCodeAt(textChanged), editorInput);
		assert.equal(textChanged, 2, "TextChanged event should be fired");
		editor.off("igmaskeditortextchanged");
		editorInput.off("keypress.test");
		editorInput.blur();
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID5] Mask editor dataMode option', function (assert) {
	assert.expect(16);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text"});
	editor.igMaskEditor({
		value: "CCC",
		width: 400,
		inputName: "firstName",
		selectionOnFocus: "selectAll",
		buttonType: "clear",
		maxLength: 1,
		listItems: [1, 2, 3],
		placeholder: "Enter Val"
	});

	assert.throws(function () {
		editor.igMaskEditor("option", "inputMask", "NM234K\\AOIU\\CY0FC9\\A&:C\\A\\L\\a\\9C");
	}, " Error should be thrown");

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text"});
	editor2.igMaskEditor({
		excludeKeys: "~!@#$%^&*(){}[]\\'*\"",
	});

	editor2.igMaskEditor("option", "dataMode", "rawText");
	editor2.igMaskEditor("setFocus");
	editor2.igMaskEditor("field").val("abcd______");
	$.ig.TestUtil.keyInteraction(67, editor2);
	assert.equal(editor2.igMaskEditor("field").val(), "abcd______", "rawText dataMode - edit value should be abcd______");
	editor2.igMaskEditor("field").blur();
	assert.equal(editor2.igMaskEditor("displayValue"), "abcd", "rawText dataMode - editor display value should be abcd");
	assert.equal(editor2.igMaskEditor("value"), "abcd", "rawText dataMode - value sent to the server should be abcd");

	editor2.igMaskEditor("option", "dataMode", "rawTextWithRequiredPrompts");
	editor2.igMaskEditor("setFocus");
	editor2.igMaskEditor("field").val("abcd______");
	$.ig.TestUtil.keyInteraction(67, editor2);
	assert.equal(editor2.igMaskEditor("field").val(), "abcd______", "rawTextWithRequiredPrompts dataMode - edit value should be abcd______");
	editor2.igMaskEditor("field").blur();
	assert.equal(editor2.igMaskEditor("displayValue"), "abcd", "rawTextWithRequiredPrompts dataMode - editor display value should be abcd");
	assert.equal(editor2.igMaskEditor("value"), "abcd", "rawTextWithRequiredPrompts dataMode - value sent to the server should be abcd");

	editor2.igMaskEditor("option", "dataMode", "rawTextWithAllPrompts");
	editor2.igMaskEditor("setFocus");
	editor2.igMaskEditor("field").val("abcd______");
	$.ig.TestUtil.keyInteraction(67, editor2);
	assert.equal(editor2.igMaskEditor("field").val(), "abcd______", "rawTextWithAllPrompts dataMode - edit value should be abcd______");
	editor2.igMaskEditor("field").blur();
	assert.equal(editor2.igMaskEditor("displayValue"), "abcd", "rawTextWithAllPrompts dataMode - editor display value should be abcd");
	assert.equal(editor2.igMaskEditor("value"), "abcd      ", "rawTextWithAllPrompts dataMode - value sent to the server should be abcd      ");

	editor2.igMaskEditor("option", "dataMode", "rawTextWithLiterals");
	editor2.igMaskEditor("setFocus");
	editor2.igMaskEditor("field").val("abcd______");
	$.ig.TestUtil.keyInteraction(67, editor2);
	assert.equal(editor2.igMaskEditor("field").val(), "abcd______", "rawTextWithLiterals dataMode - edit value should be abcd______");
	editor2.igMaskEditor("field").blur();
	assert.equal(editor2.igMaskEditor("displayValue"), "abcd", "rawTextWithLiterals dataMode - editor display value should be abcd");
	assert.equal(editor2.igMaskEditor("value"), "abcd", "rawTextWithLiterals dataMode - value sent to the server should be abcd");

	editor2.igMaskEditor("option", "dataMode", "rawTextWithRequiredPromptsAndLiterals");
	editor2.igMaskEditor("setFocus");
	editor2.igMaskEditor("field").val("abcd______");
	$.ig.TestUtil.keyInteraction(67, editor2);
	assert.equal(editor2.igMaskEditor("field").val(), "abcd______", "rawTextWithRequiredPromptsAndLiterals dataMode - edit value should be abcd______");
	editor2.igMaskEditor("field").blur();
	assert.equal(editor2.igMaskEditor("displayValue"), "abcd", "rawTextWithRequiredPromptsAndLiterals - editor display value should be abcd");
	assert.equal(editor2.igMaskEditor("value"), "abcd", "rawTextWithRequiredPromptsAndLiterals - value sent to the server should be abcd");
});

QUnit.test('[ID6] Mask editor width and height options', function (assert) {
	assert.expect(6);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		value: "CCC",
		width: 400,
		inputName: "firstName",
		selectionOnFocus: "selectAll",
		buttonType: "clear",
		maxLength: 1,
		listItems: [1, 2, 3],
		placeholder: "Enter Val"
	});

	var editor2 = $.ig.TestUtil.appendToFixture(this.divTag,
		{
			type: "text",
			name: "disabledEditor",
			tabIndex: "1",
			disabled: true,
			readonly: true,
			value: "disabled"
		});

	editor2.igMaskEditor({
		buttonType: "clear",
		width: 300,
		height: 70
	});

	// Default stlye from CSS
	assert.equal(editor1.igMaskEditor("editorContainer").css("width"), "400px", "Testing editor default width");
	assert.equal(editor1.igMaskEditor("editorContainer").css("height"), "32px", "Testing editor default height");

	editor1.igMaskEditor("option", "width", 100);
	editor1.igMaskEditor("option", "height", 100);
	assert.equal(editor1.igMaskEditor("editorContainer").css("width"), "100px", "Setting editor width option runtime");
	assert.equal(editor1.igMaskEditor("editorContainer").css("height"), "100px", "Setting editor heigth option runtime");

	// Style set from the options
	assert.equal(editor2.igMaskEditor("editorContainer").css("width"), "300px", "Setting editor width option at initialization");
	assert.equal(editor2.igMaskEditor("editorContainer").css("height"), "70px", "Setting editor heigth option at initialization");
});


QUnit.test('[ID7] Mask editor selection', function (assert) {
	assert.expect(9);
	var done = assert.async();

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		value: "CCC",
		width: 400,
		inputName: "firstName",
		selectionOnFocus: "selectAll",
		buttonType: "clear",
		maxLength: 1,
		listItems: [1, 2, 3]
	});

	editor.igMaskEditor("field").focus();

	$.ig.TestUtil.wait(200).then(function () {
		var text = editor.igMaskEditor("getSelectedText");
		assert.equal(text, "CCC_______", "Selected text is not correct");
		var start = editor.igMaskEditor("getSelectionStart");
		var end = editor.igMaskEditor("getSelectionEnd");
		assert.equal(start, 0, "Selection start is correct");
		assert.equal(end, 10, "Selection end is correct");

		var btn = editor.igMaskEditor("clearButton");
		btn.click();
		$.ig.TestUtil.keyInteraction(0, editor);
		assert.equal(editor.igMaskEditor("field").val(), "__________", "Edit value should be __________");
		editor.igMaskEditor("field").blur();
		assert.equal(editor.igMaskEditor("displayValue"), "", "Display value should be set to an empty string");
		assert.equal(editor.igMaskEditor("value"), "", "Value that needs to be sent to the server should be equal to an empty string");

		editor.igMaskEditor("field").blur();
		text = editor.igMaskEditor("getSelectedText");
		assert.equal(text, "", "Editor selected text should be equal to an empty string");

		editor.igMaskEditor("setFocus");
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		editor.igMaskEditor("insert", "abc");
		editor.igMaskEditor("select", 0, 3);
		text = editor.igMaskEditor("getSelectedText");
		start = editor.igMaskEditor("getSelectionStart");
		end = editor.igMaskEditor("getSelectionEnd");
		assert.equal(start, 0, "Selection start should be 0");
		assert.equal(end, 3, "Selection end should be 3");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID8] Mask editor isValid option in edit mode', function (assert) {
	assert.expect(4);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: "&&00"
	});

	editor.igMaskEditor("field").focus();
	editor.data("igMaskEditor")._enterEditMode();
	assert.notOk(editor.igMaskEditor("isValid"), "isValid option should be equal to false as none of the required fields are filled in");
	editor.igMaskEditor("field").val("zz__");
	assert.notOk(editor.igMaskEditor("isValid"), "isValid option should be equal to false as not all required fields are filled in");
	editor.igMaskEditor("field").val("zz99");
	assert.ok(editor.igMaskEditor("isValid"), "isValid option should be equal to true as all required fields are filled in");
	editor.igMaskEditor("field").blur();
	editor.data("igMaskEditor")._exitEditMode();
	assert.ok(editor.igMaskEditor("isValid"), "isValid option should be equal to true after loosing focus as all required fields are filled in");
});

QUnit.test('[ID9] Mask editor toLower/toUpper options', function (assert) {
	assert.expect(16);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		inputMask: ">00"
	});

	var field = editor1.igMaskEditor("field");
	editor1.data("igMaskEditor")._enterEditMode();
	editor1.data("igMaskEditor")._insert("nn");
	assert.equal(field.val(), "__", "Editor text in edit mode should be equal to __");
	editor1.data("igMaskEditor")._insert("12");
	assert.equal(field.val(), "12", "Editor text in edit mode should be equal to 12");
	editor1.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(editor1.igMaskEditor("value"), "12", "Editor value in edit mode should be equal to 12");
	editor1.data("igMaskEditor")._exitEditMode();
	assert.equal(editor1.igMaskEditor("displayValue"), "12", "Editor display value after exitting edit mode should be equal to 12");

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor2.igMaskEditor({
		inputMask: "<00"
	});

	field = editor2.igMaskEditor("field");
	editor2.data("igMaskEditor")._enterEditMode();
	editor2.data("igMaskEditor")._insert("nn");
	assert.equal(field.val(), "__", "Editor text in edit mode should be equal to __");
	editor2.data("igMaskEditor")._insert("12");
	assert.equal(field.val(), "12", "Editor text in edit mode should be equal to 12");
	editor2.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(editor2.igMaskEditor("value"), "12", "Editor value in edit mode should be equal to 12");
	editor2.data("igMaskEditor")._exitEditMode();
	assert.equal(editor2.igMaskEditor("displayValue"), "12", "Editor display value after exitting edit mode should be equal to 12");

	var editor3 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor3.igMaskEditor({
		inputMask: "<CC00CC"
	});

	field = editor3.igMaskEditor("field");
	editor3.data("igMaskEditor")._enterEditMode();
	editor3.data("igMaskEditor")._insert("nnnn");
	assert.equal(field.val(), "nn____", "Editor text in edit mode should be equal to nn____");
	editor3.data("igMaskEditor")._insert("nn12nn");
	assert.equal(field.val(), "nn12nn", "Editor text in edit mode should be equal to nn12nn");
	editor3.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(editor3.igMaskEditor("value"), "nn12nn", "Editor value in edit mode should be equal to nn12nn");
	editor3.data("igMaskEditor")._exitEditMode();
	assert.equal(editor3.igMaskEditor("displayValue"), "nn12nn", "Editor display value after exitting edit mode should be equal to nn12nn");

	var editor4 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor4.igMaskEditor({
		inputMask: ">CC00CC"
	});

	field = editor4.igMaskEditor("field");
	editor4.data("igMaskEditor")._enterEditMode();
	editor4.data("igMaskEditor")._insert("nnnn");
	assert.equal(field.val(), "NN____", "Editor text in edit mode should be equal to NN____");
	editor4.data("igMaskEditor")._insert("nn12nn");
	assert.equal(field.val(), "NN12NN", "Editor text in edit mode should be equal to NN12NN");
	editor4.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(editor4.igMaskEditor("value"), "NN12NN", "Editor value in edit mode should be equal to NN12NN");
	editor4.data("igMaskEditor")._exitEditMode();
	assert.equal(editor4.igMaskEditor("displayValue"), "NN12NN", "Editor display value after exitting edit mode should be equal to NN12NN");
});

QUnit.test('[ID10] Mask editor toLower/toUpper on paste', function (assert) {
	assert.expect(19);

	var toUpperEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	toUpperEditor.igMaskEditor({
		toUpper: true
	});

	var field = toUpperEditor.igMaskEditor("field");
	toUpperEditor.data("igMaskEditor")._enterEditMode();
	toUpperEditor.data("igMaskEditor")._insert("nnAA");
	assert.equal(field.val(), "NNAA______", "Editor text in edit mode should be equal to NNAA______");
	toUpperEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toUpperEditor.igMaskEditor("value"), "NNAA", "Editor value in edit mode should be equal to NNAA");
	toUpperEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toUpperEditor.igMaskEditor("displayValue"), "NNAA", "Editor display value after exitting edit mode should be equal to NNAA");

	var toLowerEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	toLowerEditor.igMaskEditor({
		toLower: true
	});

	field = toLowerEditor.igMaskEditor("field");
	toLowerEditor.data("igMaskEditor")._enterEditMode();
	toLowerEditor.data("igMaskEditor")._insert("nnAA");
	assert.equal(field.val(), "nnaa______", "Editor text in edit mode should be equal to nnaa______");
	toLowerEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toLowerEditor.igMaskEditor("value"), "nnaa", "Editor value in edit mode should be equal to nnaa");
	toLowerEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toLowerEditor.igMaskEditor("displayValue"), "nnaa", "Editor display value after exitting edit mode should be equal to nnaa");

	var toUppertoLowerMaskEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	toUppertoLowerMaskEditor.igMaskEditor({
		inputMask: "\\C>CC>CC<CC<\\?>C<C>C&"
	});

	field = toUppertoLowerMaskEditor.igMaskEditor("field");
	toUppertoLowerMaskEditor.data("igMaskEditor")._enterEditMode();
	toUppertoLowerMaskEditor.data("igMaskEditor")._insert("nnAAMMfRuu");
	assert.equal(field.val(), "CNNAAmm?FrUU", "Editor text in edit mode should be equal to CNNAAmm?FrUU");

	toUppertoLowerMaskEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("value"), "CNNAAmm?FrUU", "Editor value in edit mode should be equal to CNNAAmm?FrU ");
	toUppertoLowerMaskEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("displayValue"), "CNNAAmm?FrUU", "Editor display value after exitting edit mode should be equal to CNNAAmm?FrUU");

	toUppertoLowerMaskEditor.igMaskEditor("option", "dataMode", "rawTextWithRequiredPrompts");
	toUppertoLowerMaskEditor.data("igMaskEditor")._enterEditMode();
	toUppertoLowerMaskEditor.data("igMaskEditor")._insert("fnAAMMfRuu");
	toUppertoLowerMaskEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("value"), "FNAAmmFrUU", "Editor value in edit mode should be equal to FNAAmmFrUU");
	toUppertoLowerMaskEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("displayValue"), "CFNAAmm?FrUU", "Editor display value after exitting edit mode should be equal to CFNAAmm?FrUU");

	toUppertoLowerMaskEditor.igMaskEditor("option", "dataMode", "rawTextWithRequiredPromptsAndLiterals");
	toUppertoLowerMaskEditor.igMaskEditor("option", "padChar", "*");
	toUppertoLowerMaskEditor.data("igMaskEditor")._enterEditMode();
	toUppertoLowerMaskEditor.data("igMaskEditor")._insert("hnAAMMfRuu");
	toUppertoLowerMaskEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("value"), "CHNAAmm?FrUU", "Editor value in edit mode should be equal to CHNAAmm?FrUU ");
	toUppertoLowerMaskEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("displayValue"), "CHNAAmm?FrUU", "Editor display value after exitting edit mode should be equal to CHNAAmm?FrUU");

	toUppertoLowerMaskEditor.igMaskEditor("option", "padChar", " ");
	toUppertoLowerMaskEditor.igMaskEditor("option", "dataMode", "nonExisting");
	toUppertoLowerMaskEditor.data("igMaskEditor")._enterEditMode();
	toUppertoLowerMaskEditor.data("igMaskEditor")._insert("nnAAMMfRuu");
	assert.equal(field.val(), "CNNAAmm?FrUU", "Text is not CNNAAmm?FrUU");
	toUppertoLowerMaskEditor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("value"), "CNNAAmm?FrUU", "Editor value in edit mode should be equal to CNNAAmm?FrUU");
	toUppertoLowerMaskEditor.data("igMaskEditor")._exitEditMode();
	assert.equal(toUppertoLowerMaskEditor.igMaskEditor("displayValue"), "CNNAAmm?FrUU", "Editor display value after exitting edit mode should be equal to CNNAAmm?FrUU");

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: ">LLL00"
	});
	field = editor.igMaskEditor("field");
	editor.data("igMaskEditor")._enterEditMode();
	editor.data("igMaskEditor")._insert("asd15");
	assert.equal(field.val(), "ASD15", "Text is not ASD15");
	editor.data("igMaskEditor")._processValueChanging(field.val());

	assert.equal(editor.igMaskEditor("value"), "ASD15", "Editor value in edit mode should be equal to ASD15");
	editor.data("igMaskEditor")._exitEditMode();
	assert.equal(editor.igMaskEditor("displayValue"), "ASD15", "Editor display value after exitting edit mode should be equal to ASD15");
});

QUnit.test('[ID11] Mask editor update null value', function (assert) {
	assert.expect(9);

	var customNullValueEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	customNullValueEditor.igMaskEditor({
		allowNullValue: true,
		nullValue: "Zero",
		inputMask: "CCCC"
	});

	customNullValueEditor.igMaskEditor("value", null);
	assert.equal(customNullValueEditor.igMaskEditor("value"), "Zero", "Editor value should be Zero.");
	assert.equal(customNullValueEditor.data("igMaskEditor")._valueInput.val(), "Zero", "Editor hidden input value should be Zero");
	assert.equal(customNullValueEditor.igMaskEditor("displayValue"), "Zero", "Editor display value should be Zero");

	var nullValueEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	nullValueEditor.igMaskEditor({
		allowNullValue: true,
		inputMask: "CCCC"
	});
	nullValueEditor.igMaskEditor("value", null);
	assert.equal(nullValueEditor.igMaskEditor("value"), null, "Editor value should be null");
	assert.equal(nullValueEditor.data("igMaskEditor")._valueInput.val(), "", "Editor hidden input value should be an empty string");
	assert.equal(nullValueEditor.igMaskEditor("displayValue"), "", "Editor display value should be an empty string");

	var notNullValueEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	notNullValueEditor.igMaskEditor({
		allowNullValue: false,
		inputMask: "CC&&"
	});
	notNullValueEditor.igMaskEditor("value", null);
	assert.equal(notNullValueEditor.igMaskEditor("value"), "", "Editor value should be an empty string");
	assert.equal(notNullValueEditor.data("igMaskEditor")._valueInput.val(), "", "Editor hidden input value should be an empty string");
	assert.equal(notNullValueEditor.igMaskEditor("displayValue"), "", "Editor display value should be an empty string");
});

QUnit.test('[ID12] Mask editor validate value against input mask', function (assert) {
	assert.expect(11);
	var done = assert.async();

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: "CCR00"
	});

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		inputMask: "CCR00"
	});

	editor.igMaskEditor("field").focus();

	$.ig.TestUtil.wait(100).then(function () {
		$.ig.TestUtil.paste(editor.igMaskEditor("field")[0], "aaR15");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editor.igMaskEditor("field").val(), "aaR15", "The editor value should be aaR15");
		editor.igMaskEditor("field").blur();
		editor.igMaskEditor("field").focus();
		editor.igMaskEditor("option", "revertIfNotValid", true);
		editor.data("igMaskEditor")._processInternalValueChanging("as;dlfkasdfl;kjasf");
		assert.equal(editor.igMaskEditor("field").val(), "aaR15", "When revertIfNotValid option is set to true the editor value should be reverted to aaR15 after entering an invalid input");
		editor.igMaskEditor("option", "revertIfNotValid", false);
		editor.igMaskEditor("field").focus();
		editor.data("igMaskEditor")._processInternalValueChanging("as;dlfkasdfl;kjasf");
		assert.equal(editor.igMaskEditor("field").val(), "__R__", "When revertIfNotValid option is set to false the editor field should be reverted to an empty mask with prompts after entering an invalid input");
		assert.equal(editor.igMaskEditor("value"), "", "When revertIfNotValid option is set to false the editor value should be reverted to an empty string after entering an invalid input");

		assert.equal(editor.data("igMaskEditor")._valueFromText("bbR23"), "bbR23", "The editor value should be bb23");
		assert.ok(editor.data("igMaskEditor")._validateValueAgainstMask("zz23"), "The value zz23 should be valid against editor's mask");
		assert.notOk(editor.data("igMaskEditor")._validateValueAgainstMask("23Rsd"), "The value 23Rsd should be invalid against editor's mask");
		assert.ok(editor.data("igMaskEditor")._validateValueAgainstMask(""), "Empty string should be a valid input against editor's mask");
		assert.notOk(editor.data("igMaskEditor")._validateValueAgainstMask("ffdd"), "The value ffdd should be invalid against editor's mask");
		assert.ok(editor.data("igMaskEditor")._validateRequiredPrompts(""), "Empty string should be valid against editor required prompts");
		editor1.igMaskEditor("field").focus();
		editor1.data("igMaskEditor")._setCursorPosition(2);
		var evt = $.Event("keydown");
		evt.keyCode = 50;
		evt.charCode = 50;
		assert.ok(editor1.data("igMaskEditor")._validateKey(evt), "Numeric key input should be allowed");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID13] Mask editor trigger keydown event', function (assert) {
	assert.expect(9);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		inputMask: ">?CC",
		value: "VAL"
	});

	editor1.igMaskEditor("field").focus().select();
	$.ig.TestUtil.keyInteraction(8, editor1.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(8, editor1.igMaskEditor("field"));
	assert.equal(editor1.igMaskEditor("field").val(), "___", "Pressing BACKSPACE key should set the editor field to an empty mask with prompts");

	$.ig.TestUtil.keyInteraction(86, editor1.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(69, editor1.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(82, editor1.igMaskEditor("field"));
	assert.equal(editor1.igMaskEditor("field").val(), "VER", "The editor input field value should be VER");

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor2.igMaskEditor({
		inputMask: "<ACC",
		value: "val"
	});

	editor2.igMaskEditor("field").focus().select();
	$.ig.TestUtil.keyInteraction(46, editor2.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(46, editor2.igMaskEditor("field"));
	assert.equal(editor2.igMaskEditor("field").val(), "___", "Pressing DELETE key should set the editor field to an empty mask with prompts");
	editor2.data("igMaskEditor")._setCursorPosition(0);
	$.ig.TestUtil.keyInteraction(86, editor2.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(69, editor2.igMaskEditor("field"));
	$.ig.TestUtil.keyInteraction(82, editor2.igMaskEditor("field"));
	assert.equal(editor2.igMaskEditor("field").val(), "ver", "The editor input field value should be ver");

	var editor3 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor3.igMaskEditor({
		inputMask: "###"
	});

	editor3.igMaskEditor("field").focus().select();
	$.ig.TestUtil.keyInteraction(8, editor3.igMaskEditor("field"));
	assert.equal(editor3.igMaskEditor("field").val(), "___", "Pressing BACKSPACE key should set the editor field to an empty mask with prompts");

	editor2.data("igMaskEditor")._setCursorPosition(0);
	$.ig.TestUtil.keyInteraction(86, editor3.igMaskEditor("field"));
	assert.equal(editor3.igMaskEditor("field").val(), "___", "Pressing non-digit key should set the editor field to an empty mask with prompts");
	var evt = $.Event("keydown");
	evt.keyCode = 50;
	evt.charCode = 50;
	assert.ok(editor3.data("igMaskEditor")._validateKey(evt), "Numeric key input should be allowed");
	var ev = $.Event("keydown");
	ev.keyCode = 65;
	ev.charCode = 65;
	assert.notOk(editor3.data("igMaskEditor")._validateKey(ev), "Non-numeric key input should not be allowed");
	editor3.igMaskEditor("field").blur();

	var editor4 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor4.igMaskEditor({
		inputMask: "990",
		promptChar: "_",
		padChar: "~",
		emptyChar: "?",
		value: 34
	});

	assert.notOk(editor4.igMaskEditor("isValid"), "The editor value should be invalid");
});

QUnit.test('[ID14] Mask editor test unsupported methods and options', function (assert) {
	assert.expect(14);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: "###"
	});

	assert.throws(function () {
		editor.igMaskEditor("option", "excludeKeys", "abe")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "excludeKeys");
	assert.throws(function () {
		editor.igMaskEditor("option", "includeKeys", "abe")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "includeKeys");
	//Unsupported Methods
	assert.throws(function () {
		editor.igMaskEditor("dropDownContainer");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "DropDownContainer method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("showDropDown");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "ShowDropDown method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("hideDropDown");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "HideDropDown method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("dropDownButton");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "DropDownButton method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("spinUpButton");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "SpinUpButton method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("spinDownButton");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "SpinDownButton method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("dropDownVisible");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "DropDownVisible method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("findListItemIndex");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "FindListItemIndex method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("selectedListIndex");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "SelectedListIndex method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("getSelectedListItem");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "GetSelectedListItem method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("spinUp");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "SpinUp method is not supported by mask editor.");

	assert.throws(function () {
		editor.igMaskEditor("spinDown");
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.maskEditorNoSuchMethod) > -1;
	}, "SpinDown method is not supported by mask editor.");
});


QUnit.test('[ID15] Mask editor unfilled char prompts', function (assert) {
	assert.expect(6);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		width: '150',
		placeHolder: 'Phone',
		inputMask: '099-999-99',
		unfilledCharsPrompt: '0'
	});

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor2.igMaskEditor({
		width: '150',
		placeHolder: 'Phone',
		inputMask: '099-999-99',
		unfilledCharsPrompt: '0',
		value: "45000403"
	});

	var editorInput = editor1.igMaskEditor("field");
	editorInput.focus().select();
	$.ig.TestUtil.keyInteraction(48, editorInput);
	assert.equal(editorInput.val(), "000-000-00", "The editor input field value before loosing focus should be 000-000-00");
	editorInput.blur();
	assert.equal(editorInput.val(), "0--", "The editor input field value after loosing focus should be 0--");

	editorInput = editor2.igMaskEditor("field");
	assert.equal(editorInput.val(), "450-004-03", "The editor input field value should be 450-004-03");
	assert.equal(editorInput.igMaskEditor("value"), "450-004-03", "The editor value should be 450-004-03");
	editor2.igMaskEditor("value", "053-400-03");
	assert.equal(editorInput.val(), "053-400-03", "The editor input field value should be 053-400-03");
	assert.equal(editorInput.igMaskEditor("value"), "053-400-03", "The editor value should be 053-400-03");
});

QUnit.test('[ID16] Mask editor revert invalid value', function (assert) {
	assert.expect(8);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor1.igMaskEditor({
		inputMask: "9900",
		revertIfNotValid: true
	});

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor2.igMaskEditor({
		inputMask: "CCC000"
	});

	var field = editor1.igMaskEditor("field");

	editor1.data("igMaskEditor")._enterEditMode();
	editor1.data("igMaskEditor")._insert("1234");
	assert.equal(field.val(), "1234", "Editor input field value should be 1234");
	editor1.data("igMaskEditor")._processValueChanging(field.val());
	assert.equal(editor1.igMaskEditor("value"), "1234", "Editor value should be 1234");
	editor1.data("igMaskEditor")._exitEditMode();
	assert.equal(editor1.igMaskEditor("displayValue"), "1234", "Editor display value should be 1234");

	editor1.data("igMaskEditor")._enterEditMode();
	editor1.data("igMaskEditor")._insert("123_");
	assert.equal(field.val(), "123_", "Editor input field value should be 123_");
	editor1.data("igMaskEditor")._processValueChanging(field.val());
	assert.equal(editor1.igMaskEditor("value"), "1234", "Editor value should be reverted to 1234");
	editor1.data("igMaskEditor")._exitEditMode();
	assert.equal(editor1.igMaskEditor("displayValue"), "1234", "Editor display value should be reverted to 1234");

	field = editor2.igMaskEditor("field");
	editor2.data("igMaskEditor")._enterEditMode();
	editor2.data("igMaskEditor")._insert("123___");
	editor2.data("igMaskEditor")._processValueChanging(field.val());
	assert.equal(field.val(), "______", "Editor value should be reverted to an empty string");
	editor2.data("igMaskEditor")._exitEditMode();
	assert.equal(editor2.igMaskEditor("displayValue"), "", "Editor display value should be reverted to an empty string");
});

QUnit.test('[ID17] Mask editor revertIfNotValid option - digit input mask', function (assert) {
	assert.expect(3);

	var isTriggered = false;
	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text"});
	editor.igMaskEditor({
		inputMask: "9900",
		revertIfNotValid: true,
		valueChanged: function (evt, ui) {
			isTriggered = true;
		}
	});

	var field = editor.igMaskEditor("field");
	field.focus();
	editor.data("igMaskEditor")._insert("1234");
	editor.blur();
	assert.equal(field.val(), "1234", "Editor input field value should be 1234");
	assert.ok(isTriggered, "The valueChanged event should be triggered.");
	field.focus();
	editor.data("igMaskEditor")._insert("123_");
	editor.blur();
	assert.equal(field.val(), "1234", "Editor input field value should be reverted to 1234");
});


QUnit.test('[ID18] Mask editor revertIfNotValid option - character input mask', function (assert) {
	assert.expect(2);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor.igMaskEditor({
		inputMask: "CCC00",
		padChar: "+",
		emptyChar: "/",
		value: "aaa"
	});

	var field = editor.igMaskEditor("field");
	editor.igMaskEditor("setFocus");
	editor.data("igMaskEditor")._insert("sss__");
	editor.blur();
	assert.equal(field.val(), "aaa++", "Editor value should be reverted to aaa++");
	assert.equal(editor.igMaskEditor("value"), "aaa//", "Editor value should be reverted to aaa//");
});

QUnit.test('[ID19] Mask editor paste and insert', function (assert) {
	assert.expect(16);
	var done = assert.async();

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	editor.igMaskEditor({
		inputMask: "00-0L/>aa(test)"
	});

	var editorInput = editor.igMaskEditor("field");
	editorInput.trigger("focus");

	$.ig.TestUtil.wait(100).then(function () {
		$.ig.TestUtil.paste(editorInput[0], "57");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 2, "Selection start should be 2 after paste");
		assert.equal(editorInput.val(), "57-__/__(test)", "Editor text after paste should be 57-__/__(test)");
		$.ig.TestUtil.paste(editorInput[0], "2ab");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 7, "Selection start should be 7 after paste");
		assert.equal(editorInput.val(), "57-2a/B_(test)", "Editor text after paste should be 57-2a/B_(test)");
		$.ig.TestUtil.paste(editorInput[0], "c");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 8, "Selection start should be 8 after paste");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after paste should be 57-2a/BC(test)");
		$.ig.TestUtil.paste(editorInput[0], "random");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 14, "Selection start should be 14 after paste");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after paste should be 57-2a/BC(test)");
		editorInput[0].select();
		$.ig.TestUtil.keyInteraction(8, editorInput);
		$.ig.TestUtil.paste(editorInput[0], "57-2a");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 5, "Selection start should be 5 after paste");
		editorInput[0].select();
		assert.equal(editorInput.val(), "57-2a/__(test)", "Editor text after paste should be 57-2a/__(test)");
		$.ig.TestUtil.paste(editorInput[0], "572a/bc");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 8, "Selection start should be 8 after paste");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after paste should be 57-2a/BC(test)");
		editorInput[0].select();
		$.ig.TestUtil.paste(editorInput[0], "572abc(test)");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 14, "Selection start should be 14 after paste");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after paste should be 57-2a/BC(test)");
		editorInput[0].select();
		$.ig.TestUtil.paste(editorInput[0], "572abc(more random string value test)");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 14, "Selection start should be 14 after paste");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after paste should be 57-2a/BC(test)");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID20] Mask editor show/hide dinamically clear button', function (assert) {
	assert.expect(5);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor.igMaskEditor({
		inputMask: "CCCCCCC",
		buttonType: "clear"
	});

	var field = editor.igMaskEditor("field"),
		clearButton = editor.igMaskEditor("clearButton");
	assert.notOk(clearButton.is(":visible"), "The clear button should not be visible initilly");
	field.focus();
	assert.notOk(clearButton.is(":visible"), "The clear button should not be visible on focus");
	field.val("someVal");

	editor.data("igMaskEditor")._processTextChanged();
	assert.ok(clearButton.is(":visible"), "The clear button should be visible");
	field.blur();
	assert.equal(field.val(), "someVal", "The editor value should be SomeVal");
	assert.ok(clearButton.is(":visible"), "The clear button should be visible on blur");
});

QUnit.test('[ID21] Mask editor clear button state', function (assert) {
	assert.expect(2);

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor.igMaskEditor({
		buttonType: "clear"
	});

	assert.notOk(editor.igMaskEditor("clearButton").is(":visible"), "Clear button should be hidden initially");
	editor.igMaskEditor("value", "someVal");
	assert.ok(editor.igMaskEditor("clearButton").is(":visible"), "Clear button should be visible after setting editor's value");
});


QUnit.test('[ID22] Paste value in mask editor with escaped flag', function (assert) {
	assert.expect(3);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor1.igMaskEditor({
		inputMask: "\\00-0000-0000"
	});

	var field = editor1.igMaskEditor("field");
	editor1.data("igMaskEditor")._enterEditMode();
	editor1.data("igMaskEditor")._insert("11111111111");
	assert.equal(field.val(), "01-1111-1111", "Editor input field value should be set to 01-1111-1111 to match the input mask");

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor2.igMaskEditor({
		inputMask: "00-\\0000-0000"
	});

	field = editor2.igMaskEditor("field");
	editor2.data("igMaskEditor")._enterEditMode();
	editor2.data("igMaskEditor")._insert("11111111111");
	assert.equal(field.val(), "11-0111-1111", "Editor input field value should be set to 11-0111-1111 to match the input mask");


	var editor3 = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor3.igMaskEditor({
		inputMask: "LL-LLLL-LL\\LL"
	});

	field = editor3.igMaskEditor("field");
	editor3.data("igMaskEditor")._enterEditMode();
	editor3.data("igMaskEditor")._insert("MMMMMMMMMMMM");
	assert.equal(field.val(), "MM-MMMM-MMLM", "Editor input field value should be set to MM-MMMM-MMLM to match the input mask");
});

QUnit.test('[ID23] Mask editor nullValue on initialization', function (assert) {
	assert.expect(9);

	var editor1 = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor1.igMaskEditor({
		allowNullValue: false
	});
	//Get null Value
	assert.equal(editor1.igMaskEditor("value"), "", "Editor value should be an empty string");
	//Set null Value
	editor1.igMaskEditor("value", null);
	assert.equal(editor1.igMaskEditor("value"), "", "Editor value should be an empty string when value is set to null");
	//Change allowNullValue option
	editor1.igMaskEditor("option", "allowNullValue", true);
	// Get null value
	assert.equal(editor1.igMaskEditor("value"), "", "Editor value should be an empty string");
	//Set null value
	editor1.igMaskEditor("value", null);
	//Get null value
	assert.equal(editor1.igMaskEditor("value"), null, "Editor value should be an empty string when value is set to null");

	// Test invalid nullValue
	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor2.igMaskEditor({
		inputMask: "9990",
		dataMode: "rawText",
		nullValue: "abc",
		allowNullValue: true,
		buttonType: "clear"
	});

	assert.equal(editor2.val(), "", "Editor display value should be an empty string on init");
	assert.strictEqual(editor2.igMaskEditor("value"), "", "Null value should be ignored on init");
	//Check if clear also ignores the wrong nullValue:
	editor2.igMaskEditor("value", "555");
	editor2.igMaskEditor("clearButton").trigger("click");
	assert.strictEqual(editor2.igMaskEditor("value"), "", "Null value should be ignored on clear");
	editor2.igMaskEditor("value", "123");
	editor2.igMaskEditor("value", null);
	assert.strictEqual(editor2.igMaskEditor("value"), "", "Null value should be ignored on set");
	//Verify empty string is still accepted
	editor2.igMaskEditor("value", "");
	assert.strictEqual(editor2.igMaskEditor("value"), "", "Editor should accept an empty string as value.");
});


QUnit.test('[ID24] Mask editor drag and drop events', function (assert) {
	assert.expect(13);
	var done = assert.async();

	var editor = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor.igMaskEditor({
		inputMask: "00-0L/>aa(test)"
	});

	var editorInput = editor.igMaskEditor("field");
	editorInput.blur();
	editor.igMaskEditor("value", "");
	// Drag enter/leave events:
	editorInput.trigger("dragenter");
	assert.equal(editorInput.val(), "__-__/__(test)", "Editor should enter edit mode on dragenter");
	// Fake FF interaction:
	$.ig.util.isFF = true;
	var ev = jQuery.Event("dragleave");
	ev.relatedTarget = editorInput[0];
	editorInput.trigger(ev);
	assert.equal(editorInput.val(), "__-__/__(test)", "Editor should not exit edit mode on inner dragleave");
	$.ig.util.isFF = false;

	editorInput.trigger("dragleave");
	assert.equal(editorInput.val(), "", "Editor should exit edit mode on dragleave");

	// Drop text with focus
	editorInput.trigger("dragenter");
	assert.equal(editorInput.val(), "__-__/__(test)", "Editor should enter edit mode on dragenter");

	editorInput[0].selectionStart = 0;
	$.ig.TestUtil.drop(editorInput[0], "57");

	$.ig.TestUtil.wait(20).then(function () {
		assert.equal(editorInput[0].selectionStart, 0, "Selection start should be 0");
		assert.equal(editorInput[0].selectionEnd, 2, "Selection end should be 2");
		assert.equal(editorInput.val(), "57-__/__(test)", "Editor text after drop should be 57-__/__(test)");
		editorInput[0].selectionStart = 2;
		$.ig.TestUtil.drop(editorInput[0], "2ab");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 2, "Selection start should be 2");
		assert.equal(editorInput[0].selectionEnd, 7, "Selection end should be 7");
		assert.equal(editorInput.val(), "57-2a/B_(test)", "Editor text after drop should be 57-2a/B_(test)");
		editorInput[0].selectionStart = 7;
		$.ig.TestUtil.drop(editorInput[0], "cc");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorInput[0].selectionStart, 7, "Selection start should be 7");
		assert.equal(editorInput[0].selectionEnd, 14, "Selection end should be 14");
		assert.equal(editorInput.val(), "57-2a/BC(test)", "Editor text after drop should be 57-2a/BC(test)");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("[ID25] Unicode characters regex check", function (assert) {
	assert.expect(14);
	
	var $editor = $.ig.TestUtil.appendToFixture(this.inputTag).igMaskEditor({ inputMask: "LLLLL" }),
		field = $editor.igMaskEditor("field");

	function enterValue(value){
		$editor.focus()[0].setSelectionRange(0,0);
		$.ig.TestUtil.type(value, field);
	}
	var testValues = [{
		value: "たかむごひ",
		valid: true
	},{
		value: "ⰁⰂⰃⰄⰅ",
		valid: true
	},{
		value: "ퟻퟺퟯퟮퟭ",
		valid: true
	},{
		value: "₩₩₩₩₩",
		valid: false,
		expected: "_____"
	},{
		value: "Ⰰ⯿⯾⯽⯼",
		valid: false,
		expected: "Ⰰ____"
	},{
		value: "‐‑‒–—",
		valid: false,
		expected: "_____"
	},{
		value: "¿¾½¼»",
		valid: false,
		expected: "_____"
	}]
	for(var i=0; i< testValues.length; i++){
		$editor.igMaskEditor("field").val("_____");
		enterValue(testValues[i].value);
		assert.ok($editor.igMaskEditor("isValid") == testValues[i].valid, "Value is expected to be accepted.");
		assert.equal(field.val(), testValues[i].valid ? testValues[i].value : testValues[i].expected, "The text is not as expected");
	}
});

QUnit.test("Should properly revert to last valid value", function (assert) {
	assert.expect(3);

	var $editor;
	$editor = $.ig.TestUtil.appendToFixture(this.inputTag).igMaskEditor({ 
		inputMask: "(000) 000-000",
		dataMode: "rawText"
	});
	var field = $editor.igMaskEditor("field");
	$editor.focus()[0].setSelectionRange(0,0);
	$.ig.TestUtil.type("111111111", field);
	$editor.blur();
	$editor.focus()[0].setSelectionRange(12, 13);
	$editor.val("(111) 111-11_");
	$editor.blur();
	$editor.focus()[0].setSelectionRange(12,13);

	$.ig.TestUtil.type("2222", field);
	$editor.blur();
	assert.equal($editor.data("igMaskEditor")._maskedValue.length, 13, "The editor value should be the appropriate length");
	assert.ok($editor.data("igMaskEditor")._editorInput.val().indexOf("(") > -1,"The displayed value has the mask in place");
	assert.equal($editor.igMaskEditor("value"), "111111112", "The editor value should be reverted to the last valid one");
});

QUnit.test('Test plain values that are not containing mask values', function (assert) {
	assert.expect(1);

	var $editor = $.ig.TestUtil.appendToFixture(this.inputTag).igMaskEditor({
		inputMask: "00/00/0000 00:00"
	});

	var inp = $editor.igMaskEditor("field");
	inp.focus();
	inp.val("010120181200");
	inp.blur();

	assert.equal($editor.igMaskEditor("displayValue"), "01/01/2018 12:00", 'The value is not as expected');
});
