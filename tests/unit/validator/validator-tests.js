QUnit.module("igValidator unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>',
	formTag: '<form></form>',
	fields: [{
		selector: "#grpEdit1",
		onsubmit: true,
		onblur: false
	},
	{
		selector: "#grpEdit2",
		date: true,
		required: false,
		onchange: true,
		valueRange: [new Date()]
	},
	{
		selector: "#igCheckboxEditor",
		required: true,
		onchange: true
	}
	]
});

QUnit.test('[ID1] Validator init/destroy', function (assert) {
	assert.expect(17 + this.fields.length);

	var field,
		initialized = false;

	var validatorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	validatorInput.igValidator({
		email: true,
		successMessage: "Yay",
		notificationOptions: { mode: "popover" }
	});

	assert.ok(typeof (validatorInput.igValidator) === 'function', "Validator script should be loaded");
	assert.ok(validatorInput.data("igValidator") !== undefined, 'igValidator should be created in an input without throwing any errors');

	var textEditorDiv = $.ig.TestUtil.appendToFixture(this.divTag);
	textEditorDiv.igTextEditor({
		inputName: "pass",
		textMode: "password",
		validatorOptions: {
			required: true,
			onblur: true,
			lengthRange: {
				min: 6
			},
			requiredIndication: true
		}
	});
	assert.ok(textEditorDiv.igTextEditor("editorContainer").data("igValidator") !== undefined, 'igValidator should be created through igEditor options without throwing any errors');

	var emptyDiv = $.ig.TestUtil.appendToFixture(this.divTag);
	emptyDiv.igValidator();
	assert.ok(emptyDiv.data("igValidator") !== undefined, 'igValidator should be created in an empty div without throwing any errors');

	var form = $.ig.TestUtil.appendToFixture(this.formTag);
	form.igValidator();
	assert.ok(form.data("igValidator") !== undefined, 'igValidator should be created in an empty form without throwing any errors');
	assert.ok(form.igValidator("option", "_ignored") && !form.hasClass($.ui.igValidator.prototype.css.target), 'igValidator should be initialized properly in an empty form');

	var validationForm = $('<form id=validationForm" action=""><fieldset><h4> Fields collection ( required on submit)</h4><input type="text" id="grpEdit1" /><p> ( date, onblur, not required on submit)</p><input type="text" id="grpEdit2" /><p> rating, min half(2.5) onsubmit</p><div id="rating"></div><p> CheckboxEditor, required onsubmit</p><div id="igCheckboxEditor"></div><div id="numericEditor"></div><p> combo, 2 min selection, required onsubmit</p><div id="combo2"></div><input type="submit" value="Submit" /></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm);
	var checkboxEditor = $('#igCheckboxEditor');
	checkboxEditor.igCheckboxEditor();
	validationForm.igValidator({
		required: true,
		onsubmit: true,
		successMessage: "Thanks!",
		fields: this.fields
	});

	assert.ok(validationForm.data("igValidator") !== undefined, 'igValidator should be created in a form without throwing any errors');

	for (var i = 0; i < this.fields.length; i++) {
		field = $(this.fields[i].selector);
		//Verify all fields are initialized with the proper class
		assert.ok(field.hasClass($.ui.igValidator.prototype.css.target) && field.data("igValidatorField") !== undefined, 'Validator field should be initialized with the ui-validator-target class');
	}

	assert.ok($._data($(this.fields[0].selector)[0], 'events').blur && $._data($(this.fields[0].selector)[0], 'events').blur[0].namespace == "validator", 'Field events should be attached to the input');

	var validationForm1 = $('<form id="validationForm1" action=""><p>Checkbox group</p><label for="check1">Form checkbox 1</label><input type="checkbox" name="checkboxname" value="check1" id="check1" /><label for="check2">Form checkbox 2</label><input type="checkbox" name="checkboxname" value="check2" id="check2" /> <input type="submit" value="Submit" /></form>');
	$.ig.TestUtil.appendToFixture(validationForm1);
	$("#check2").igValidator({
		required: true,
		onchange: true,
		lengthRange: [2]
	});

	assert.ok($("#check1").hasClass($.ui.igValidator.prototype.css.target) && $("#check2").hasClass($.ui.igValidator.prototype.css.target), 'Group checkboxes sharing the same name should be initialized properly');

	//Verify getErrorMessages returns empty arrays before any validations is made
	var validationForm2 = $('<form id="validationForm2" action=""><fieldset><input type="text" class="test"/><div id="numericEditor"></div><input type="number" id="msgInput" value="2" /><label id="msgLabel"> message target </label><input type="submit" value="Submit"/></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm2);
	validationForm2.igValidator({
		required: true,
		fields: [{
			selector: ".test"
		}, {
			selector: "#msgInput",
			number: true,
			valueRange: [-315, -15],
			messageTarget: "#msgLabel"
		}]
	});
	assert.equal(validationForm2.igValidator("getErrorMessages").length, 0, "Validator should not render any error messages");
	assert.equal(validatorInput.igValidator("getErrorMessages").length, 0, "Validator should not render any error messages");
	assert.equal(textEditorDiv.igTextEditor("validator").getErrorMessages().length, 0, "Text editor validator should not render any error messages");

	//Indication on editor container
	assert.ok(textEditorDiv.igTextEditor("editorContainer").next(".ui-igvalidator-required-indication").length === 1, "igEditor should render the required indication");

	//Destroy validators
	emptyDiv.igValidator("destroy");
	assert.ok(emptyDiv.data("igValidator") === undefined && !emptyDiv.hasClass($.ui.igValidator.prototype.css.target), 'igValidator should destoy correctly');

	validationForm.igValidator("destroy");
	assert.ok(validationForm.data("igValidator") === undefined, 'igValidator should destoy correctly on container');
	assert.ok(!$(this.fields[1].selector).hasClass($.ui.igValidator.prototype.css.target) && $(this.fields[2].selector).data("igValidatorField") === undefined, 'Fields should be cleared after valiadtor destruction');
	assert.ok(!($._data($(this.fields[0].selector)[0], 'events') && $._data($(this.fields[0].selector)[0], 'events').blur), 'Field events should be detached after validator destruction');
});


QUnit.test('[ID2] Validator events', function (assert) {
	assert.expect(38);

	var validatorInput1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text", id: "input1" });
	validatorInput1.igValidator({
		email: true,
		successMessage: "Yay",
		notificationOptions: { mode: "popover" }
	});

	var validatorInput2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text", id: "input2" });
	validatorInput2.igValidator({
		email: true
	});

	var validationForm = $('<form id=validationForm" action=""><fieldset><h4> Fields collection ( required on submit)</h4><input type="text" id="grpEdit1" /><p> ( date, onblur, not required on submit)</p><input type="text" id="grpEdit2" /><p> rating, min half(2.5) onsubmit</p><div id="rating"></div><p> CheckboxEditor, required onsubmit</p><div id="igCheckboxEditor"></div><div id="numericEditor"></div><p> combo, 2 min selection, required onsubmit</p><div id="combo2"></div><input type="submit" value="Submit" /></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm);
	var checkboxEditor = $('#igCheckboxEditor');
	checkboxEditor.igCheckboxEditor();
	validationForm.igValidator({
		required: true,
		onsubmit: true,
		successMessage: "Thanks!",
		fields: this.fields
	});

	function resetFlagsCounters() {
		flag = successFlag = errorFlag = cancelEvent = false,
			validatedCounter = 0;
	};

	function attachShowingHiding(namespace) {
		validatorInput1.on("igvalidatorerrorshowing" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			if (cancelEvent) {
				return false;
			}
		}).on("igvalidatorerrorshown" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			errorFlag = true;
		}).on("igvalidatorerrorhiding" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			if (cancelEvent) {
				return false;
			}
		}).on("igvalidatorerrorhidden" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			errorFlag = false;
		}).on("igvalidatorsuccessshowing" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			if (cancelEvent) {
				return false;
			}
		}).on("igvalidatorsuccessshown" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			successFlag = true;
		}).on("igvalidatorsuccesshiding" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			if (cancelEvent) {
				return false;
			}
		}).on("igvalidatorsuccesshidden" + namespace, function (e, ui) {
			validateMsgArgsOnce(e, ui);
			successFlag = false;
		});
	};

	function validateMsgArgsOnce(e, ui) {
		if (eventsValidated.indexOf(e.type) == -1) {
			assert.ok(validateMsgArgs(ui), e.type.replace("igvalidator", "") + " arguments should be valid");
			eventsValidated.push(e.type);
		}
	}

	function validateBaseArgs(ui) {
		if (!(ui.owner instanceof $.ui.igValidator)) {
			return false;
		}
		if (typeof ui.fieldOptions === "undefined") {
			return false;
		}
		return true;
	}

	function validateMsgArgs(ui) {
		if (!validateBaseArgs(ui)) {
			return false;
		}
		if (!ui.message || !validatorInput1.is(ui.target) || Object.keys(ui).length > 4) {
			return false;
		}
		return true;
	}

	function validateEvtArgs(ui) {
		if (!validateBaseArgs(ui)) {
			return false;
		}
		if (typeof ui.valid !== "boolean" || typeof ui.value === "undefined" || !ui.message) {
			return false;
		}
		return true;
	}

	function validateFormEvtArgs(ui, finished) {
		if (!(ui.owner instanceof $.ui.igValidator) || !validationForm.is(ui.target)) {
			return false;
		}
		if (finished && typeof ui.valid !== "boolean") {
			return false;
		}
		return true;
	}

	var btn = $("input[type=submit]", validationForm),
		flag = successFlag = errorFlag = cancelEvent = false,
		validatedCounter = 0,
		eventsValidated = [];

	validationForm.on("igvalidatorvalidated", function (e) {
		validatedCounter++;
	}).on("igvalidatorformvalidating", function (e, ui) {
		if (cancelEvent) {
			assert.ok(validateFormEvtArgs(ui), e.type.replace("igvalidator", "") + " arguments should be valid");
			return false;
		}
	}).on("igvalidatorformvalidated", function (e) {
		flag = true;
	}).on("igvalidatorformsuccess", function (e) {
		successFlag = flag;
	}).on("igvalidatorformerror", function (e, ui) {
		assert.ok(validateFormEvtArgs(ui, true), e.type.replace("igvalidator", "") + " arguments should be valid");
		errorFlag = flag;
	});

	validatorInput1.on("igvalidatorvalidating.validate", function (e, ui) {
		if (cancelEvent) {
			assert.ok(validateBaseArgs(ui) && typeof ui.value !== "undefined", e.type.replace("igvalidator", "") + " arguments should be valid");
			return false;
		}
	}).on("igvalidatorvalidated.validate", function (e, ui) {
		assert.ok(validateEvtArgs(ui), e.type.replace("igvalidator", "") + " arguments should be valid");
		flag = true;
	}).on("igvalidatorsuccess.validate", function (e) {
		successFlag = flag;
	}).on("igvalidatorerror.validate", function (e, ui) {
		assert.ok(validateEvtArgs(ui) && ui.rule && ui.rules, e.type.replace("igvalidator", "") + " arguments should be valid");
		errorFlag = flag;
	});

	var done = assert.async();
	var fieldsNumber = this.fields.length;

	cancelEvent = true;
	btn.click();
	assert.notOk(flag, "Form validation should be canceled");
	resetFlagsCounters();

	btn.click();
	$.ig.TestUtil.wait(50).then(function () {
	assert.ok(flag, "Form validation should be fired");
	assert.equal(validatedCounter, fieldsNumber, "Validated event should be fired for all fields.")
	assert.notOk(successFlag, "Form success should not be fired on error");
	assert.ok(errorFlag, "Form error not fired");
	resetFlagsCounters();

	cancelEvent = true;
	validatorInput1.blur();
	assert.notOk(flag, "Validation event should be canceled");
	resetFlagsCounters();

	validatorInput1.blur();
	assert.ok(flag, "Validation event should be fired");
	assert.ok(successFlag, "Validation success should be fired");
	assert.notOk(errorFlag, "Validation error should not be fired on suceess");
	resetFlagsCounters();

	validatorInput1.val("not email").blur();
	assert.ok(flag, "Validation event should be fired");
	assert.notOk(successFlag, "Validation success should not be fired");
	assert.ok(errorFlag, "Validation error should be fired");
	resetFlagsCounters();

	//Hiding/showing setup
	validatorInput1.off(".validate");
	validatorInput1.data("igNotifier").hide();
	attachShowingHiding(".notify");

	//Cancel error message
	cancelEvent = true;
	validatorInput1.val("not email").blur();
	assert.notOk(errorFlag, "Error showing should be canceled");
	resetFlagsCounters();

	//Allow error message
	validatorInput1.blur();
	assert.ok(errorFlag, "Show error should be fired");
	assert.notOk(successFlag, "Show success should not be fired on error");
	resetFlagsCounters();

	//Hide error message
	errorFlag = true; //make sure hidden event doesn't set to false
	validatorInput1.igNotifier("option", "animationDuration", 0); //avoid waiting for animation to end
	var closeBtn = validatorInput1.data("igNotifier").popover.find(".ui-igpopover-close-button");
	closeBtn.click();
	closeBtn.click();
	assert.notOk(errorFlag, "Error message should not popup");
	validatorInput1.blur();
	resetFlagsCounters();

	//Chain cancel new success message (error should remain visible)
	cancelEvent = true;
	errorFlag = true; //make sure hidden event doesn't set the false
	validatorInput1.val("email@email").blur();
	assert.notOk(successFlag, "Success show should be canceled");
	assert.ok(errorFlag, "Error hiding should be canceled");
	assert.ok(validatorInput1.igNotifier("isVisible") && validatorInput1.igNotifier("option", "state") === "error", "Error notification should not be visible");
	resetFlagsCounters();

	errorFlag = true; //make sure hidden event doesn't set the false
	validatorInput1.blur();
	assert.ok(successFlag, "Success message should be shown");
	assert.notOk(errorFlag, "Error hidden should be triggered on success");
	resetFlagsCounters();

	//Hide success
	validatorInput1.val("not email").blur();
	assert.notOk(successFlag, "Success message should be hidden");
	resetFlagsCounters();
	validatorInput1.off(".notify");

	//Bug 216717:igValidator success showing will trigger even when there's no message set
	validatorInput2.on("igvalidatorsuccessshowing.notify", function (e) {
		successFlag = true;
	});
	validatorInput2.val("email@email").blur();
	assert.notOk(successFlag, "Success showing should not be triggered with any message");
	assert.notOk(validatorInput2.igValidator("isMessageDisplayed"), "Success message should not be displayed");
	validatorInput2.off(".notify");
	done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID3] Validator show errors on submit', function (assert) {
	assert.expect(15);

	var validationForm = $('<form id="showErrorsForm" action="" method="post"><label>First name*</label><input class="group" type="text" id="firstName" /><br><label>Email*</label><input class="group" type="text" id="email" /><br><input class="group" type="text" id="target1" /><br><input class="group" type="text" id="target2" /><br><input type="submit" value="Sign Up" /></form>');
	$.ig.TestUtil.appendToFixture(validationForm);

	var shouldSubmit = false,
		nameInput = $('#firstName'),
		emailInput = $('#email')
	submitBtn = validationForm.find("input[type=submit]");

	nameInput.igValidator({ required: true });
	emailInput.igValidator({ required: true });
	validationForm.igValidator({
		onsubmit: true,
		required: true,
		fields: [
			{ selector: "#target1" },
			{ selector: "#target2" }
		]
	});

	validationForm.off('submit.test').on('submit', function (e) {
		assert.equal(e.isDefaultPrevented(), !shouldSubmit, "Handle form submit");
		return false;
	});

	$.ui.igValidator.defaults.showAllErrorsOnSubmit = false;

	submitBtn.click();
	// Display only one message:
	assert.ok(nameInput.igValidator("isMessageDisplayed"), "First field error message should be visible");
	assert.notOk(emailInput.igValidator("isMessageDisplayed"), "Second field error message should not be visible");
	assert.notOk(validationForm.igValidator("isMessageDisplayed"), "Form error message should not be visible");

	nameInput.val("a");
	submitBtn.click();
	assert.notOk(nameInput.igValidator("isMessageDisplayed"), "First field error message should not be visible when an input is entered");
	assert.ok(emailInput.igValidator("isMessageDisplayed"), "Second field error message should be visible");
	assert.notOk(validationForm.igValidator("isMessageDisplayed"), "Form error message should not be visible");

	// Onblur should be unaffected
	$("#target1").trigger("blur");
	assert.ok(validationForm.igValidator("isMessageDisplayed"), "Third field error message should be displayed");
	validationForm.igValidator("hide");

	emailInput.val("a");
	submitBtn.click();
	assert.notOk(emailInput.igValidator("isMessageDisplayed"), "Second field error message should not be visible");
	assert.ok(validationForm.igValidator("isMessageDisplayed"), "Form error message should be visible");

	$("#target1").val("a");
	submitBtn.click();
	assert.equal(validationForm.igValidator("getErrorMessages").length, 1, "One error expected on form fields");

	$("#target2").val("a");
	shouldSubmit = true;
	submitBtn.click();
	$.ui.igValidator.defaults.showAllErrorsOnSubmit = true;
});

QUnit.test('[ID4] Validator API', function (assert) {
	assert.expect(68);

	var successText = "Success",
		flag = false,
		event,
		value;

	var validationForm1 = $('<form id=validationForm" action=""><fieldset><h4> Fields collection ( required on submit)</h4><input type="text" id="grpEdit1" /><p> ( date, onblur, not required on submit)</p><input type="text" id="grpEdit2" /><p> rating, min half(2.5) onsubmit</p><div id="rating"></div><p> CheckboxEditor, required onsubmit</p><div id="igCheckboxEditor"></div><div id="numericEditor"></div><p> combo, 2 min selection, required onsubmit</p><div id="combo2"></div><input type="submit" value="Submit" /></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm1);
	var checkboxEditor = $('#igCheckboxEditor');
	checkboxEditor.igCheckboxEditor();
	validationForm1.igValidator({
		required: true,
		onsubmit: true,
		successMessage: "Thanks!",
		fields: this.fields
	});

	validationForm1.igValidator("option", "fields", []);
	assert.equal(validationForm1.igValidator("option", "fields").length, 3, "Setting validator fields option on initialization");

	var textEditor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "textEditor" });
	textEditor.igTextEditor({
		inputName: "pass",
		textMode: "password",
		validatorOptions: {
			required: true,
			onblur: true,
			lengthRange: {
				min: 6
			},
			requiredIndication: true
		}
	});

	var indication = textEditor.next(".ui-igvalidator-required-indication");
	textEditor.igValidator("option", "requiredIndication", false);
	assert.equal(indication.parent().length, 0, "Required indication should be removed after changing option");

	var validatorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	var validationLabel = '<label data-valmsg-for="input1"></label>';
	var validationLabel2 = '<label id="msgLabel2"> message target2 </label>';
	$.ig.TestUtil.appendToFixture(validationLabel);
	$.ig.TestUtil.appendToFixture(validationLabel2);
	validatorInput.igValidator({
		email: true,
		successMessage: "Yay",
		notificationOptions: { mode: "popover" }
	});

	validatorInput.val("").igValidator("option", "successMessage", successText).blur();
	assert.equal(validatorInput.igValidator("notifier").container().text(), successText, "Validator success message should be set");

	// TODO: Should handle more message set variants? change while visible without extra validation?
	validatorInput.on("igvalidatorvalidated.change", function (e) {
		flag = true;
	});
	validatorInput.igValidator("option", "onblur", false).blur();
	assert.notOk(flag, "Validation should not be fired after setting blur to false");
	validatorInput.igValidator("option", "onchange", true);

	event = $.Event('keyup');
	event.keyCode = 73;
	validatorInput.trigger(event);
	assert.ok(flag, "Validation should be fired when onchange option is set to true");

	// Ignored alt, ctrl, shift:
	flag = false;
	event.keyCode = 16; //shift
	validatorInput.trigger(event);
	assert.notOk(flag, "Validation should not fire onchange event when SHIFT key is pressed");
	event.keyCode = 17; //ctrl
	validatorInput.trigger(event);
	assert.notOk(flag, "Validation should not fire onchange event when CTRL key is pressed");
	event.keyCode = 18; //atl
	validatorInput.trigger(event);
	assert.notOk(flag, "Validation should not fire onchange event when ALT key is pressed");
	validatorInput.off(".change");

	// One field is invalid, should be ignored without exceptions
	var validationContainer = $('<div id="validationContainer"><textarea id="areaInput">line' + '/n' + 'line2</textarea></div>');
	$.ig.TestUtil.appendToFixture(validationContainer);
	validationContainer.igValidator({
		required: true,
		fields: [{
			selector: "#iDontExist"
		}, {
			selector: "#areaInput"
		}]
	});
	assert.ok(validationContainer.igValidator("isValid"), "Validator with non-existing fields should be valid");

	// Fields
	var validationForm2 = $('<form id="validationForm2" action=""><fieldset><input type="text" class="test"/><div id="numericEditor"></div><input type="number" id="msgInput" value="2" /><label id="msgLabel"> message target </label><input type="submit" value="Submit"/></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm2);
	validationForm2.igValidator({
		required: true,
		fields: [{
			selector: ".test"
		},
		{
			selector: "#msgInput",
			number: true,
			valueRange: [-315, -15],
			messageTarget: "#msgLabel"
		}]
	});
	validationForm2.igValidator("addField", {
		selector: "#numericEditor",
		requred: true
	}).on("igvalidatorvalidated.change", function (e, ui) {
		if (ui.fieldOptions && ui.fieldOptions.selector === "#numericEditor") {
			value = ui.value;
		}
	});

	var numericEditor = $("#numericEditor");
	var msgLabel = $("#msgLabel");
	assert.ok(validationForm2.igValidator("option", "fields").length === 3 && !numericEditor.hasClass($.ui.igValidator.prototype.css.target), "Validator addField method should add a field to the fields option");
	validationForm2.trigger("submit");
	assert.notOk(value, "Newly added field should not get validated");

	numericEditor.igNumericEditor({ value: 6 });
	validationForm2.igValidator("updateField", "#numericEditor");
	assert.ok(numericEditor.hasClass($.ui.igValidator.prototype.css.target) && numericEditor.data("igValidatorField") !== undefined, "Validator field should initialize after calling updateField")
	validationForm2.trigger("submit");
	assert.strictEqual(value, 6, "Updated field should validate with actual igNumericEditor value");

	validationForm2.igValidator("updateField", 2, {
		selector: "#numericEditor",
		optionalIndication: true,
		required: false
	});
	assert.ok(numericEditor.igNumericEditor("editorContainer").next(".ui-igvalidator-optional-indication").length === 1, "Indication should be rendered on update field");

	// Verify requiredIndication is inherited:
	validationForm2.igValidator("option", "requiredIndication", true);
	assert.ok($(validationForm2.igValidator("option", "fields")[0].selector).next(".ui-igvalidator-required-indication").length === 1, "Indication should be rendered when setting global requiredIndication");
	assert.ok($(validationForm2.igValidator("option", "fields")[1].selector).next(".ui-igvalidator-required-indication").length === 1, "Indication should be rendered when setting global requiredIndication");
	validationForm2.igValidator("option", "requiredIndication", false);
	assert.ok($(validationForm2.igValidator("option", "fields")[1].selector).next(".ui-igvalidator-required-indication").length === 0, "Indication should be removed when setting global requiredIndication to false");

	validationForm2.igValidator("removeField", 2);
	assert.ok(validationForm2.igValidator("option", "fields").length === 2 && $("#numericEditor").data("igValidatorField") === undefined, "removeField method should remove field");
	assert.ok($(".ui-igvalidator-optional-indication").length === 0, "Indication should be removed when a field is removed");

	//Bug 220806:igValidator - successs not shown on submit
	validationForm2.igValidator("addField", {
		selector: "#numericEditor",
		successMessage: "Valid",
		required: true,
		number: true,
		onsubmit: true,
		onblur: false
	});
	numericEditor.val(6);
	validationForm2.trigger("submit");
	assert.ok(validationForm2.igValidator("isMessageDisplayed", 2) && validationForm2.igValidator("notifier", 2).options.state === "success", "Additional field should show success message on submit");
	validationForm2.igValidator("removeField", 2);

	//Per-field form handling
	var validationForm3 = $('<form id="submitHandlerForm" action=""><input type="number" id="nonSubmitEditor" value="2" /><div><div><input type="text" id="submitEditor" value="" /></div><input type="submit" value="Submit" /></div></form>');
	$.ig.TestUtil.appendToFixture(validationForm3);
	validationForm3.igValidator({
		onsubmit: false,
		fields: [{
			selector: "#nonSubmitEditor",
			valueRange: [5, 6]
		}]
	});
	validationForm3.igValidator("updateField", 0, {
		selector: "#nonSubmitEditor",
		valueRange: [5, 6],
		onsubmit: true
	});
	assert.equal(validationForm3.data("igValidator")._formHandleCounter, 1, "Form handler should be added on field update");
	validationForm3.igValidator("updateField", 0, {
		selector: "#nonSubmitEditor",
		valueRange: [5, 6],
		onsubmit: false
	});
	validationForm3.on('submit', function () {
		assert.equal($("#nonSubmitEditor").data("igValidatorField").isValid, undefined, "Validation should not be triggered on submit after field update");
		assert.equal(validationForm3.data("igValidator")._formHandleCounter, 0, "Form handler should be removed on field update");
		return false;
	});

	validationForm3.find("input[type=submit]").click();
	validationForm3.off();

	validationForm3.igValidator("addField", {
		selector: "#submitEditor",
		required: true,
		onsubmit: true
	});

	validationForm3.find("input[type=submit]").click();
	assert.strictEqual($("#submitEditor").data("igValidatorField").isValid, false, "Validation should be triggered on submit after field addition");
	assert.equal(validationForm3.data("igValidator")._formHandleCounter, 1, "There should be a form handler after field addition");
	validationForm3.igValidator("removeField", "#submitEditor");
	assert.equal(validationForm3.data("igValidator")._formHandleCounter, 0, "Form handler should be removed on field remove");

	//Messages
	assert.ok(validatorInput.igValidator("isMessageDisplayed"), "Success message should be displayed");
	assert.equal(validatorInput.igValidator("getErrorMessages").length, 0, "Error messages should not be displayed on valid input");

	validatorInput.igValidator("hide");
	assert.notOk(validatorInput.igValidator("isMessageDisplayed"), "Success message should be hidden");

	validatorInput.igValidator("isValid");
	assert.notOk(validatorInput.igValidator("isMessageDisplayed"), "Success message should not be displayed on isValid call");

	validatorInput.igValidator("validate");
	assert.ok(validatorInput.igValidator("isMessageDisplayed"), "Success message should be shown on validate call");

	//For Bug 217826: Updating calling isValid() should not hide current errors (no chance to react to them)
	validatorInput.val("wrong").igValidator("isValid");
	assert.ok(validatorInput.igValidator("isMessageDisplayed"), "Success message should be displayed on isValid call");
	// Force error and then revert back to empty to get valid field
	validatorInput.igValidator("validate");
	validatorInput.val("").igValidator("isValid");
	assert.ok(validatorInput.igValidator("isMessageDisplayed") && validatorInput.igValidator("notifier").options.state == "error", "Error message should be displayed on isValid call");

	value = new Date();
	value.setHours(0, 0, 0, 0);
	var rangeDateEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text", id: "rangeDateEditor" });
	rangeDateEditor.igValidator({
		date: true
	});
	rangeDateEditor.igValidator("option", "valueRange", [value]);
	rangeDateEditor.focus();
	rangeDateEditor.val(value.getFullYear() - 1).blur();
	assert.equal(rangeDateEditor.igValidator("getErrorMessages")[0], $.ig.Validator.locale.minValueMessage.replace("{0}", value.toLocaleString()), "Wrong date min value message should be displayed");

	rangeDateEditor.igValidator("option", "valueRange", [null, value]);
	rangeDateEditor.focus();
	rangeDateEditor.val(value.getFullYear() + 1).blur();
	assert.equal(rangeDateEditor.igValidator("getErrorMessages")[0], $.ig.Validator.locale.maxValueMessage.replace("{0}", value.toLocaleString()), "Wrong date max value message should be displayed");

	rangeDateEditor.igValidator("option", "valueRange", [value, new Date(value.getFullYear() + 1, value.getMonth(), value.getDate())]);
	rangeDateEditor.val(value.getFullYear() + 2).blur();
	assert.equal(rangeDateEditor.igValidator("getErrorMessages")[0],
		$.ig.Validator.locale.rangeValueMessage
			.replace("{0}", value.toLocaleString())
			.replace("{1}", new Date(value.getFullYear() + 1, value.getMonth(), value.getDate()).toLocaleString()),
		"Wrong date range value message should be displayed");

	//messageTarget
	validatorInput.igValidator("option", "messageTarget", "input1");
	assert.ok($('[data-valmsg-for="input1"]').hasClass("field-validation-valid"), "Message target not marked with proper class");
	validatorInput.val("wrong");
	validatorInput.igValidator("option", "messageTarget", "#msgLabel2").igValidator("validate");
	assert.ok(!$('[data-valmsg-for="input1"]').is(".field-validation-error, field-validation-valid") && $('[data-valmsg-for="input1"]').text() === "", "Old message target not properly cleared");
	assert.ok($('#msgLabel2').hasClass("field-validation-error"), "New message target should be marked with field-validation-error class");
	assert.ok($('#msgLabel2').text() === validatorInput.igValidator("getErrorMessages")[0], "New message target contents should be set");

	validatorInput.igValidator("option", "messageTarget", "");
	assert.ok(validatorInput.igValidator("notifier").isVisible(), "Setting invalid message target should revert to notifier");

	//Field messages
	assert.ok(validationForm2.igValidator("isMessageDisplayed", 0), "isMessageDisplayed should return true on field with error");
	assert.ok(validationForm2.igValidator("isMessageDisplayed", "#msgInput"), "isMessageDisplayed should return true on field with messageTarget");
	assert.notOk(validationForm2.igValidator("isMessageDisplayed", 2), "isMessageDisplayed should not return cumulative true for bad field prameter");
	assert.ok(validationForm2.igValidator("isMessageDisplayed"), "isMessageDisplayed should not return cumulative false for fields with visible error");

	validationForm1.igValidator("isValid");
	assert.equal(validationForm1.igValidator("getErrorMessages").length, 2, "Number of messages from getErrorMessages should be equal to 2");
	assert.notOk(validationForm1.igValidator("isMessageDisplayed", 0), "isMessageDisplayed should return false for field with visible error");
	assert.notOk(validationForm1.igValidator("isMessageDisplayed", 1), "isMessageDisplayed should return false for valid field with no success message");

	// Field messageTarget
	assert.equal(msgLabel.text(), validationForm2.igValidator("getErrorMessages", "#msgInput"), "Error message should be set properly on target");
	assert.ok(msgLabel.hasClass("field-validation-error"), "Message target should be marked with proper class");
	$("#msgInput").val(-33);
	validationForm2.igValidator("validate", '#msgInput');
	assert.notOk(validationForm2.igValidator("isMessageDisplayed", '#msgInput'), "Error-only messageTarget should be hidden on success");
	assert.ok(msgLabel.hasClass("field-validation-error"), "Message target should be marked with proper class");

	validationForm2.igValidator("updateField", '#msgInput', { successMessage: "Success" }); //Update merge
	assert.ok(validationForm2.igValidator("option", 'fields')[1].successMessage === "Success" &&
		validationForm2.igValidator("option", 'fields')[1].number, "updateField method should merge filed options");
	validationForm2.igValidator("validate", '#msgInput');
	assert.ok(validationForm2.igValidator("isMessageDisplayed", '#msgInput'), "Success messageTarget should be shown");
	assert.ok(msgLabel.hasClass("field-validation-valid"), "Message target should be marked with proper class");

	//Pre-check state
	assert.ok(validationForm2.igValidator("isMessageDisplayed", 0) && validationForm2.igValidator("isMessageDisplayed", 1), "Validation messages should be displayed for all the fields");
	validationForm2.igValidator("hide", validationForm2.igValidator("option", "fields")[1]);
	assert.notOk(validationForm2.igValidator("isMessageDisplayed", 1), "isMessageDisplayed should return false for field after hide call");

	//Bug 216715:igValidator hide method not working correctly with fields collection
	assert.ok(validationForm2.igValidator("isMessageDisplayed", 0), "Wrong error message should not be hidden on hide call with field parameter");

	//Wrong index is ignored
	validationForm2.igValidator("hide", 5);
	assert.ok(validationForm2.igValidator("isMessageDisplayed", 0), "Hide method should be applied to fifth field only.");

	validationForm2.igValidator("hide");
	assert.notOk(validationForm2.igValidator("isMessageDisplayed"), "Hide method should be applied to all fields.");

	//Notifier
	assert.equal(validationForm1.igValidator("notifier", 0).widgetName, $.ui.igNotifier.prototype.widgetName, "Field notifier should be returned when calling notifier method");
	assert.equal(validationForm1.igValidator("notifier", 3), null, "Notifier method should return null for invalid field index");
	//notifier required to apply target classes at minimum, must be initialized regardless of messageTarget
	assert.equal(validationForm2.igValidator("notifier", "#msgInput").widgetName, $.ui.igNotifier.prototype.widgetName, "Notifier should be initialized on field with messageTarget");
	validationForm1.igValidator("updateField", 0, { notificationOptions: { mode: "popover" } });
	assert.equal(validationForm1.igValidator("notifier", 0).options.mode, "popover", "Notifier option should be set.");
	validationForm1.igValidator("option", "notificationOptions", { mode: "inline" });
	assert.equal(validationForm1.igValidator("notifier", 1).options.mode, "inline", "Notifier global option should be set");
	assert.equal(validationForm1.igValidator("notifier", 0).options.mode, "popover", "Notifier global option should not override field option.");

	//Fields onsubmit
	validationForm1.igValidator("updateField", 0, { "onsubmit": false });
	validationForm1.igValidator("option", "onsubmit", false);
	assert.equal(validationForm1.data("igValidator")._formHandleCounter, 0, "Fields onsubmit handlers should be removed.");
	validationForm1.igValidator("option", "onsubmit", true);
	assert.equal(validationForm1.data("igValidator")._formHandleCounter, 2, "Fields onsubmit handlers should be added.");

});

QUnit.test('[ID5] Validation targets/types', function (assert) {
	assert.expect(22);

	var checkboxInput = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "checkbox", id: "singleCheck"});
	checkboxInput.igValidator({
		required: true
	});
	assert.notOk(checkboxInput.igValidator("isValid"), "Validator should return false when checkbox is unchecked.");
	checkboxInput.click();
	assert.ok(checkboxInput.igValidator("isValid"), "Validator should return true when checkbox is checked");

	//HTML checkboxes
	var validationForm = $.ig.TestUtil.appendToFixture('<form id="validationForm" action=""><input type="text" id="rulesInput" /><input type="text" id="textEditor"/><p> checkbox group, (2 required, onsubmit)</p><label for="check1"> Form checkbox 1</label><input type="checkbox" name="checkboxname" value="check1" id="check1" /><label for="check2"> Form checkbox 2</label><input type="checkbox" name="checkboxname" value="check2" id="check2" /><p> select (required onblur, onsubmit)</p><select id="singleSelect"><option value="" selected=selected>select..</option><option value="1">one</option><option value="2">two</option><option value="3">three</option><option value="4">four</option></select><p> multi-select, 2-3 selcted (onblur, not required)</p><select id="multipleSelect" multiple=multiple><option value="1">one</option><option value="2">two</option><option value="3">three</option><option value="4">four</option></select><input type="submit" value="Submit" /></form>');
	var checkbox1 = $("#check1");
	var checkbox2 = $("#check2");
	checkbox2.igValidator({
		required: true,
		onchange: true,
		lengthRange: [2]
	});

	checkbox1.click();
	assert.equal(checkbox2.igValidator("getErrorMessages")[0], "At least 2 item(s) should be selected", "Validation on group checkboxes interaction");
	checkbox2.focus();
	$.ig.TestUtil.keyInteraction(32, checkbox2); // space to toggle
	checkbox2.attr("checked", true);
	$.ig.TestUtil.keyInteraction(9, checkbox2); // tab (should be ignored)
	assert.equal(checkbox2.igValidator("getErrorMessages").length, 1, "Checkbox validation should be triggered on tab without blur");
	checkbox2.blur();
	assert.equal(checkbox2.igValidator("getErrorMessages").length, 0, "Checkbox validation on group interaction");

	// Radio options
	var radioOption1 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "radio", id: "radioOption1", name: "options", value: "Option 1" });
	var radioOption2 = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "radio", id: "radioOption2", name: "options", value: "Option 2" });
	radioOption1.igValidator({
		required: true,
		onchange: true,
		validated: function (evt, ui) {
			assert.equal(ui.valid, true, "Radio: Required group should be valid after secondary one is checked");
			assert.equal(ui.value[0], "Option 2", "Group radio options value should be Option 2");
		}
	});
	assert.notOk(radioOption1.igValidator("isValid"), "Validator should not be valid when radio button is not selected");
	$("input[name=options]").eq(1).prop("checked", true).trigger("change");

	// Select
	var selectInput = $("#singleSelect");
	selectInput.igValidator({
		onblur: true,
		required: true
	});
	assert.notOk(selectInput.igValidator("isValid"), "Select validator should not be valid without selection");
	selectInput.one("igvalidatorvalidated", function (evt, ui) {
		assert.equal(ui.valid, true, "Required select should be valid after selection");
		assert.equal(ui.value, "3", "Select group value should be 3");
	});
	selectInput.val("3").blur();

	//Multiselect
	var multipleSelect = $("#multipleSelect");
	multipleSelect.igValidator({
		onblur: true,
		lengthRange: [2, 3]
	});
	multipleSelect.one("igvalidatorvalidated", function (evt, ui) {
		assert.ok(ui.valid, "Multi-Select: range 2-3 select should be valid with 2 selections");
		assert.equal(ui.value[1], "3", "Multi-Select: group value should be 3");
	});
	multipleSelect.val([2, 3]).blur();
	multipleSelect.one("igvalidatorvalidated", function (evt, ui) {
		assert.notOk(ui.valid, "Multi-Select: range 2-3 select should not be valid with 4 selections");
	});
	multipleSelect.val([2, 3, 1, 4]).blur();

	//Text area
	var validationContainer = $.ig.TestUtil.appendToFixture('<div id="validationContainer"><textarea id="areaInput">line,\r\nline2</textarea></div>');
	validationContainer.igValidator({
		required: true,
		fields: [{
			selector: "#iDontExist"
		}, {
			selector: "#areaInput"
		}]
	});

	validationContainer.on("igvalidatorvalidated", function (evt, ui) {
		assert.equal(ui.value, "line,\r\nline2", "Textarea value validation");
	});
	$("#areaInput").blur();

	//Input, keyup, blur
	var textEditor = $('#textEditor');
	textEditor.igValidator({
		lengthRange: [2, 3],
		onchange: true
	});

	textEditor.one("igvalidatorvalidating", function (evt, ui) {
		assert.equal(ui.value, "2", "Text editor value on validation should be equal to 2");
	});

	textEditor.val("2").blur();
	textEditor.val("").focus();
	$.ig.TestUtil.keyInteraction(50, textEditor);
	textEditor.off("igvalidatorvalidating");

	// Threshold checks
	var validatorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	validatorInput.igValidator({
		threshold: 2,
		onchange: true,
		lengthRange: { min: 10, max: null },
		validated: function (evt, ui) {
			assert.strictEqual(ui.valid, check.result, check.message);
		}
	});

	var check = {
		result: false,
		message: "Value shouldn't be valid over the threshold"
	};

	validatorInput.focus();
	$.ig.TestUtil.keyInteraction(65, validatorInput);
	$.ig.TestUtil.keyInteraction(66, validatorInput);
	$.ig.TestUtil.keyInteraction(67, validatorInput);
	//Reset
	validatorInput.igValidator("option", "threshold", -1);
	check.message = "Value shouldn't be valid without threshold";
	$.ig.TestUtil.keyInteraction(66, validatorInput);
	validatorInput.igValidator("option", "threshold", 5);
	check.result = "not valid";
	check.message = "Validated event should not trigger until threshold is reached";
	$.ig.TestUtil.keyInteraction(67, validatorInput);
	validatorInput.off();

	var done = assert.async();

	textEditor.one("igvalidatorvalidating", function (evt, ui) {
		assert.equal(ui.value, "", "Input: Cut handler failed to validate proper value");
	}).val("").trigger("cut");
	$.ig.TestUtil.wait(20).then(function () {
		textEditor.one("igvalidatorvalidating", function (evt, ui) {
			assert.equal(ui.value, "", "Input: Dragend (value moved away from input) failed to validate proper value");
		}).val("").trigger("dragend");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		textEditor.one("igvalidatorvalidating", function (evt, ui) {
			assert.equal(ui.value, "dropped", "Input: Drop handler failed to validate proper value");
		}).val("dropped").trigger("drop");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		textEditor.one("igvalidatorvalidating", function (evt, ui) {
			assert.equal(ui.value, "3333333333", "Input: Paste handler  failed to validate proper value");
		}).val("3333333333").trigger("paste");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] Validation rules', function (assert) {
	assert.expect(44);

	var rulesInput = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text", id: "rulesInput" });
	rulesInput.igValidator();
	var textEditor1 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "textEditor1" });
	textEditor1.igTextEditor({
		inputName: "pass",
		textMode: "password",
		validatorOptions: {
			required: true,
			onblur: true,
			lengthRange: {
				min: 6
			},
			requiredIndication: true
		}
	});
	var textEditor2 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "textEditor2" });
	textEditor2.igNumericEditor({
		listItems: [1, 2, 22],
		buttonType: 'spin', isLimitedToListValues: true, width: 400
	}).igValidator({
		equalTo: $('#textEditor1')
	});
	var textEditor3 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "textEditor3" });
	textEditor3.igTextEditor({
		placeHolder: "Place Holder",
		revertIfNotValid: false,
		maxLength: 2
	})
		.igValidator({
			valueRange: [0, 2]
		});

	//Required
	assert.ok(rulesInput.igValidator("isValid"), "Editor should be valid with initial value");
	rulesInput.igValidator("option", "required", true);
	assert.notOk(rulesInput.igValidator("isValid"), "Required validator should not be valid on empty input");
	rulesInput.val(" ");
	assert.ok(rulesInput.igValidator("isValid"), "Required validator should be valid when empty string is eneterd");
	rulesInput.val("w");
	assert.ok(rulesInput.igValidator("isValid"), "Required validator should be valid when a valid input is eneterd");

	//Number
	rulesInput.igValidator("option", "number", true);
	assert.notOk(rulesInput.igValidator("isValid"), "Number validator should not be valid on string input");
	rulesInput.val("27.5");
	assert.ok(rulesInput.igValidator("isValid"), "Number validator should be valid on number input");
	rulesInput.val("27,5").igValidator("option", "number", { decimalSeparator: "," });
	assert.ok(rulesInput.igValidator("isValid"), "Number validator should be valid on number input with the proper decimal separator");
	rulesInput.igValidator("option", "number", false);

	//Date
	rulesInput.igValidator("option", "date", true);
	assert.notOk(rulesInput.igValidator("isValid"), "Date validator should not be valid on number input");
	rulesInput.val("2207-10-25");
	assert.ok(rulesInput.igValidator("isValid"), "Date validator should be valid on date input");
	rulesInput.igValidator("option", "date", false);

	// length min 6:
	textEditor1.igTextEditor("value", "four");
	assert.notOk(textEditor1.igValidator("isValid"), "Editor should not be valid when input length is less than the min input length");
	textEditor1.igTextEditor("value", "itsenough");
	assert.ok(textEditor1.igValidator("isValid"), "Editor should be valid when input length is greater than the min input length");
	textEditor1.igValidator("option", "lengthRange", [2, 5]);
	assert.notOk(textEditor1.igValidator("isValid"), "Text editor should not be valid when input length is greater than the max input length");
	textEditor1.igTextEditor("value", "22");
	assert.ok(textEditor1.igValidator("isValid"), "Editor should be valid when input length is equal to the min input length");

	//Value range
	textEditor3.igTextEditor("value", "-1");
	assert.notOk(textEditor3.igValidator("isValid"), "Editor should not be valid when the input is not in the required range");
	textEditor3.igTextEditor("value", "2");
	assert.ok(textEditor3.igValidator("isValid"), "Editor should be valid when the input is in the required range");
	textEditor3.igTextEditor("value", "22");
	assert.notOk(textEditor3.igValidator("isValid"), "Editor should not be valid when the input is above the required range");

	rulesInput.igValidator("option", "date", true);
	rulesInput.igValidator("option", "valueRange", { min: null, max: new Date(2015, 11, 31) });
	rulesInput.val("2016-10-25");
	assert.notOk(rulesInput.igValidator("isValid"), "Validator should not be valid when the input date is after the max date");
	rulesInput.igValidator("option", "valueRange", { min: new Date(2015, 9, 1), max: new Date(2015, 11, 31) });
	rulesInput.val("2015-09-25");
	assert.notOk(rulesInput.igValidator("isValid"), "Validator should not be valid when the input date is before the min date");
	rulesInput.val("2015-11-25");
	assert.ok(rulesInput.igValidator("isValid"), "Validator should be valid when the input date is within the required date range");
	rulesInput.igValidator("option", "date", false).igValidator("option", "valueRange", [null, null]);

	//Control specific
	//List values
	textEditor2.igNumericEditor("value", "7");
	assert.notOk(textEditor2.igValidator("isValid"), "Editor should not be valid when the input value is not in the control list");

	//equals to:
	textEditor1.igTextEditor("value", "2");
	textEditor2.igNumericEditor("value", "22");
	assert.notOk(textEditor2.igValidator("isValid"), "Editor should not be valid when the input value does not match the target value");
	textEditor1.igTextEditor("value", "22");
	assert.ok(textEditor2.igValidator("isValid"), "Editor should be valid when the input value matches the target value");

	// Bug 211119: equalTo doesn't work with html inputs
	textEditor1.igValidator("option", "lengthRange", null);
	textEditor1.igValidator("option", "equalTo", "#rulesInput");
	assert.notOk(textEditor1.igValidator("isValid"), "Editor should not be valid when the input value does not match the equalTo target");
	textEditor1.igTextEditor("value", "2015-11-25");
	assert.ok(textEditor1.igValidator("isValid"), "Editor should be valid when the input value matches the equalTo target");

	//Invalid euqualTo field:
	textEditor1.igValidator("option", "equalTo", "form");
	assert.notOk(textEditor1.igValidator("isValid"), "Editor should not be valid with invalid equalTo option");
	//Invalid euqualTo selector:
	textEditor1.igValidator("option", "equalTo", "#notFound");
	assert.notOk(textEditor1.igValidator("isValid"), "Editor should not be valid with invalid equalTo selector");

	//CreditCard
	rulesInput.igValidator("option", "creditCard", true);
	assert.notOk(rulesInput.igValidator("isValid"), "CreditCard validator should not be valid when a date is entered.");
	//Basic Luhn test
	rulesInput.val("79927398713");
	assert.ok(rulesInput.igValidator("isValid"), "Credit card digits validation");
	//Generated with https://gist.github.com/B-Con/4988902
	rulesInput.val("4280361754636370");
	assert.ok(rulesInput.igValidator("isValid"), "Credit card (visa) validation");
	rulesInput.val("5126 071821403 390");
	assert.ok(rulesInput.igValidator("isValid"), "Credit card (master with spaces) validation");
	rulesInput.val("3404 - 52757150 - 877");
	assert.ok(rulesInput.igValidator("isValid"), "Credit card (AE with spaces and dashes) validation");
	rulesInput.igValidator("option", "creditCard", false);

	//Pattern:
	rulesInput.igValidator("option", "pattern", /^test$/);
	rulesInput.val(" test");
	assert.notOk(rulesInput.igValidator("isValid"), "Editor should not be valid when the input value does not match the pattern");
	rulesInput.val("test");
	assert.ok(rulesInput.igValidator("isValid"), "Editor should be valid when the input value matches the pattern");
	rulesInput.igValidator("option", "pattern", "\\d\\d");
	rulesInput.val("22");
	assert.ok(rulesInput.igValidator("isValid"), "Editor should be valid when the input value matches the pattern");
	//Bug 211530: Misspelled "expression" in pattern option, keeping both versions per customer request
	rulesInput.igValidator("option", "pattern", { expresion: "^nomatch$" });
	assert.notOk(rulesInput.igValidator("isValid"), "Editor should not be valid when the input value does not match the pattern");
	rulesInput.igValidator("option", "pattern", { expresion: "\\d\\d" });
	assert.ok(rulesInput.igValidator("isValid"), "Editor should be valid when the input value matches the pattern");
	rulesInput.igValidator("option", "pattern", { expression: "^nomatch$" });
	assert.notOk(rulesInput.igValidator("isValid"), "Editor should not be valid when the input value does not match the pattern");
	rulesInput.igValidator("option", "pattern", { expression: "\\d\\d" });
	assert.ok(rulesInput.igValidator("isValid"), "Editor should be valid when the input value matches the pattern");
	rulesInput.igValidator("option", "pattern", null);

	//Custom option
	rulesInput.igValidator("option", "custom", function (value, fieldOptions) {
		//also validate custom function params and context:
		assert.equal(this, rulesInput.data("igValidator"), "igValidator context");
		assert.equal(fieldOptions, undefined, "fieldOptions should not be present");
		assert.equal(value, 66, "Value should be 66");
		return false;
	});
	rulesInput.val("66");
	var valid = rulesInput.igValidator("isValid");
	assert.notOk(valid, "Custom rule result should be applied");

	var isCustomRuleApplied = false;
	var validationForm = $.ig.TestUtil.appendToFixture('<form action=""><fieldset><input type="text" class="test"/><div id="numericEditor"></div><input type="number" id="msgInput" value="2" /><label id="msgLabel"> message target </label><input type="submit" value="Submit" /></fieldset></form>');
	window.customValidationFunc = function (value, fieldOptions) {
		isCustomRuleApplied = true;
		assert.equal(fieldOptions.selector, "#msgInput", "fieldOptions should be set correctly on custom validation");
		return true;
	}
	validationForm.igValidator({
		required: true,
		fields: [{
			selector: ".test"
		},
		{
			selector: "#msgInput",
			number: true
		}],
		custom: "customValidationFunc"
	});

	valid = validationForm.igValidator("isValid", "#msgInput");
	assert.ok(isCustomRuleApplied, "Custom rule result should be applied on validation");
});


QUnit.test('[ID7] Execute all rules', function (assert) {
	assert.expect(33);

	var field = $.ig.TestUtil.appendToFixture(this.inputTag);
	field.igValidator({
		onchange: true,
		required: false,
		lengthRange: { min: 2, max: null },
		pattern: { expression: /\d/, errorMessage: "Must contain at least one number" },
		custom: function () {
			return false;
		}
	});

	var arrayDiff = function (arr1, arr2) {
		var total = arr1.concat(arr2);
		return total.filter(function (msg, i, array) {
			var inExp = arr1.indexOf(msg),
				inRes = arr2.indexOf(msg);
			if (inExp == -1 || inRes == -1 || inExp !== inRes) {
				return true;
			}
			return false;
		});
	},
		getNotifierMessages = function (field) {
			return field.igValidator("notifier").container().find("ul > li").map(function () {
				return $.trim($(this).text());
			}).get()
		};

	assert.ok(field.igValidator("isValid"), "Non-required filed should be valid if no other rules apply");
	assert.equal(field.igValidator("getErrorMessages").length, 0, "There should be no error messages");
	field.igValidator("option", "executeAllRules", true);
	assert.notOk(field.igValidator("isValid"), "Non-required filed shouldn't be valid when all rules are executed");
	var check = {
		result: false,
		message: "This field needs attention",
		rules: ["custom"],
		errorMessages: ["This field needs attention"]
	};
	var messages = field.igValidator("getErrorMessages");
	var diff = arrayDiff(messages, check.errorMessages);
	assert.equal(diff.length, 0, "Error messages should match the expected ones, diff: " + diff);

	check.message = "Entry should be at least 2 character(s) long";
	check.rules = ["lengthRange", "pattern", "custom"];
	check.errorMessages = ["Entry should be at least 2 character(s) long", "Must contain at least one number", "This field needs attention"];
	field.on("igvalidatorvalidated.test", function (evt, ui) {
		assert.strictEqual(ui.valid, check.result, check.message);
		if (!ui.valid) {
			var diff = arrayDiff(ui.messages, check.errorMessages);
			assert.equal(diff.length, 0, "Error messages event args should match the expected ones, diff: " + diff);
			diff = arrayDiff(ui.rules, check.rules);
			assert.equal(diff.length, 0, "Failed rules event args should match the expected ones, diff: " + diff);
		}
	});
	field.focus();
	$.ig.TestUtil.keyInteraction(65, field);

	check.message = "Must contain at least one number";
	check.rules = ["pattern", "custom"];
	check.errorMessages = ["Must contain at least one number", "This field needs attention"];
	$.ig.TestUtil.keyInteraction(66, field);

	var field1 = $.ig.TestUtil.appendToFixture(this.inputTag);
	field1.igValidator({
		onchange: true,
		required: true,
		executeAllRules: true,
		lengthRange: { min: 2, max: null },
		pattern: { expression: /\d/, errorMessage: "Must contain at least one number" },
		custom: function () {
			return false;
		}
	});
	field1.focus();
	$.ig.TestUtil.keyInteraction(65, field1);
	check.errorMessages = ["Entry should be at least 2 character(s) long", "Must contain at least one number", "This field needs attention"];
	messages = getNotifierMessages(field1);
	diff = arrayDiff(messages, check.errorMessages);
	assert.equal(diff.length, 0, "Error messages should match the expected ones when a char is entered. Diff: " + diff);

	field1.val("");
	$.ig.TestUtil.keyInteraction(8 /*bkspc*/, field1);
	check.errorMessages = ["This field is required", "This field needs attention"];
	messages = getNotifierMessages(field1);
	diff = arrayDiff(messages, check.errorMessages);
	assert.equal(diff.length, 0, "Error messages should match the expected ones on emty field. Diff: " + diff);
	field1.val("343");
	$.ig.TestUtil.keyInteraction(65, field1);
	check.errorMessages = ["This field needs attention"];
	messages = getNotifierMessages(field1);
	diff = arrayDiff(messages, check.errorMessages);
	assert.equal(diff.length, 0, "Error messages should match the expected ones when all but custom fulfilled. Diff: " + diff);
	field1.igValidator("option", "custom", null);
	assert.ok(field1.igValidator("isValid"), "Non-required filed should be valid if no other rules apply");

	//Inherit:
	var passwordInputs = $.ig.TestUtil.appendToFixture("<div> <input id='password'/><input id='repeatParrword'/></div>");
	passwordInputs.igValidator({
		executeAllRules: true, //inherited
		fields: [{
			selector: "#password",
			required: true,
			lengthRange: { min: 8 },
			pattern: { expression: /\d/, errorMessage: "Must contain at least one number" },
		},
		{
			selector: "#repeatParrword",
			required: true,
			equalTo: "#password",
			lengthRange: { min: 8 },
			executeAllRules: false //override
		}
		]
	});
	passwordInputs.find("#password").val("pass");
	assert.notOk(passwordInputs.igValidator("isValid", "#password"), "First input should not be valid when the input does not contain a number");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#password").length, 2, "There should be two error messages");
	passwordInputs.find("#password").val("pass2");
	assert.notOk(passwordInputs.igValidator("isValid", "#password"), "First input should not be valid when the input length is under the min requirement");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#password").length, 1, "There should be one error message");

	assert.notOk(passwordInputs.igValidator("isValid", "#repeatParrword"), "Second input should not be valid when there is not a value entered");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword").length, 1, "Second validator should have one error message");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword")[0], "This field is required", "Validator should have required message");
	passwordInputs.find("#repeatParrword").val("pass");
	assert.notOk(passwordInputs.igValidator("isValid", "#repeatParrword"), "Second input should not be valid when the input length is under the min requirementn");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword").length, 1, "Second validator should have one error message");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword")[0], "Entry should be at least 8 character(s) long", "Validator should have length error message");
	passwordInputs.find("#repeatParrword").val("passpass");
	assert.notOk(passwordInputs.igValidator("isValid", "#repeatParrword"), "Second validator should not be valid when passwords do not match");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword").length, 1, "Second validator should have one error message");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword")[0], "The two values do not match", "Validator should have the equalTo error message");

	passwordInputs.igValidator("updateField", "#repeatParrword", { executeAllRules: true });
	passwordInputs.find("#repeatParrword").val("p");
	assert.notOk(passwordInputs.igValidator("isValid", "#repeatParrword"), "Second validator should not be valid when passwords do not match");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword").length, 2, "Second validator should have two error messages");
	assert.equal(passwordInputs.igValidator("getErrorMessages", "#repeatParrword").toString(), "Entry should be at least 8 character(s) long,The two values do not match", "Validator should have error messages for min length and password match");
});

QUnit.test('[ID8] #1102 Setting valueRange min/max to null causes exceptions', function (assert) {
	assert.expect(7);

	var field = $.ig.TestUtil.appendToFixture(this.inputTag);
	field.igValidator({
		valueRange: { min: 10, max: null }
	});
	field.focus();
	field.val(5);
	field.blur();
	assert.notOk(field.igValidator("isValid"), "Value below min should not be valid");
	field.val(10);
	assert.ok(field.igValidator("isValid"), "Value equal to the min value should be valid");

	var field1 = $.ig.TestUtil.appendToFixture(this.inputTag);
	field1.igValidator({
		valueRange: { min: null, max: 50 }
	});
	field1.focus();
	field1.val(-44);
	field1.blur();
	assert.ok(field.igValidator("isValid"), "Value below max should be valid");
	field1.val(55);
	assert.notOk(field1.igValidator("isValid"), "Value above max should not be valid");

	var field2 = $.ig.TestUtil.appendToFixture(this.inputTag);
	field2.igValidator({
		valueRange: { min: null, max: undefined }
	});
	field2.val(555);
	assert.ok(field2.igValidator("isValid"), "Value should be valid");
	field2.igValidator("option", "valueRange", [null, null]);
	assert.ok(field2.igValidator("isValid"), "Null value should be valid when value range is set to  null");

	var field3 = $.ig.TestUtil.appendToFixture(this.inputTag);
	field3.igValidator({
		valueRange: { min: "50", max: undefined }
	});
	field3.val(10);
	assert.notOk(field3.igValidator("isValid"), "Value below min should not be valid");
});

QUnit.test('[ID9] igControls integration', function (assert) {
	assert.expect(19);

	var event, value, rule, valid;

	var validationForm = $('<form id=validationForm" action=""><fieldset><h4> Fields collection ( required on submit)</h4><input type="text" id="grpEdit1" /><p> ( date, onblur, not required on submit)</p><input type="text" id="grpEdit2" /><p> rating, min half(2.5) onsubmit</p><div id="rating"></div><p> CheckboxEditor, required onsubmit</p><div id="igCheckboxEditor"></div><div id="numericEditor"></div><p> combo, 2 min selection, required onsubmit</p><div id="combo2"></div><input type="submit" value="Submit" /></fieldset></form>');
	$.ig.TestUtil.appendToFixture(validationForm);

	var checkboxEditor = $("#igCheckboxEditor");
	checkboxEditor.igCheckboxEditor();
	validationForm.igValidator({
		required: true,
		onsubmit: true,
		successMessage: "Thanks!",
		fields: this.fields
	});

	//igCheckbox:
	validationForm.one("igvalidatorvalidating", function (evt, ui) {
		assert.ok(ui.value, "igCheckboxEditor event args value on validating after click");
	});
	$.ig.TestUtil.keyInteraction(32, checkboxEditor);
	validationForm.one("igvalidatorvalidating", function (evt, ui) {
		assert.notOk(ui.value, "igCheckboxEditor event args value on validating after click");
	});
	checkboxEditor.click();
	validationForm.one("igvalidatorvalidating", function (evt, ui) {
		assert.notOk(ui.value, "igCheckboxEditor event args value on validating after blur");
	});
	checkboxEditor.blur();

	// igRating
	var ratingStandalone = $.ig.TestUtil.appendToFixture(this.divTag);
	ratingStandalone.igRating({
		precision: "whole",
		valueAsPercent: false,
		validatorOptions: {
			successMessage: "Thanks!",
			required: true,
			onchange: true,
			valueRange: [3],
			errorMessage: "At least 3 stars required (custom message)",
			notificationOptions: { mode: "popover", direction: "bottom" }
		}
	});
	ratingStandalone.one("igvalidatorvalidating", function (evt, ui) {
		assert.equal(ui.value, 4, "igRating event args value on validating after mouse click");
	});
	ratingStandalone.find(".ui-igrating-votehover").eq(3).trigger("mouseover").trigger("mousedown").trigger("mouseup");

	//igTextEditor on change
	value = "3";
	valid = true;

	var textbox = $.ig.TestUtil.appendToFixture(this.divTag);
	textbox.igTextEditor({
		validatorOptions: {
			onchange: true,
			required: true
		}
	});

	textbox.on("igvalidatorvalidated", function (evt, ui) {
		// Bug 209772: validation onchange does not work correctly when in edit mode
		assert.strictEqual(ui.value, value, "Text editor event args value validation");
		assert.strictEqual(ui.valid, valid, "Text editor event args valid validation");
	});

	var spinEditor = $.ig.TestUtil.appendToFixture(this.divTag);
	spinEditor.igNumericEditor({
		dataMode: 'int',
		buttonType: 'spin',
		spinDelta: 1,
		validatorOptions: {
			number: true,
			required: true,
			onchange: true,
			valueRange: [0, 5]
		}
	});

	textbox.igTextEditor("field").focus();
	$.ig.TestUtil.keyInteraction(51, textbox.igTextEditor("field"), null, true); // enter 3
	value = "";
	valid = false;
	$.ig.TestUtil.keyDownChar(8, spinEditor.igNumericEditor("field")); // backspace / delete + empty string for value
	$.ig.TestUtil.keyPressChar(8, spinEditor.igNumericEditor("field"));
	spinEditor.igNumericEditor("field").val('');
	$.ig.TestUtil.keyUpChar(8, spinEditor.igNumericEditor("field"));
	textbox.off("igvalidatorvalidated");

	spinEditor.one("igvalidatorvalidating", function (evt, ui) {
		// Bug 209772: validation onchange does not work correctly when in edit mode
		assert.strictEqual(ui.value, 3, "Spin editor event args value on validating");
	});
	spinEditor.igNumericEditor("field").focus();
	$.ig.TestUtil.keyInteraction(51, spinEditor.igNumericEditor("field"), null, true); // enter 3

	spinEditor.one("igvalidatorvalidated", function (evt, ui) {
		assert.notOk(ui.value, "Spin editor event args value on validated");
		assert.ok(!ui.valid && ui.rule === "required", "Spin editor event args valid and rule on validated");
	});
	$.ig.TestUtil.keyDownChar(8, spinEditor.igNumericEditor("field")); // backspace / delete + empty string for value
	$.ig.TestUtil.keyPressChar(8, spinEditor.igNumericEditor("field"));
	spinEditor.igNumericEditor("field").val('');
	$.ig.TestUtil.keyUpChar(8, spinEditor.igNumericEditor("field"));
	spinEditor.igNumericEditor("field").blur();

	//igNumericEditor spin change
	spinEditor.one("igvalidatorvalidating", function (evt, ui) {
		assert.strictEqual(ui.value, 1, "Spin editor event args value on validating");
	});
	event = $.Event("mousedown");
	event.button = 0;
	spinEditor.igNumericEditor("spinUpButton").trigger(event).trigger("mouseup");
	assert.ok(spinEditor.igNumericEditor("validator").isValid(), "igNumericEditor should be valid after spin");

	//onchange mask editor
	var maskEditor = $.ig.TestUtil.appendToFixture(this.divTag);
	maskEditor.igMaskEditor({
		inputMask: "&ccccc",
		dataMode: "rawText",
		validatorOptions: {
			required: true,
			onchange: true
		}
	});
	value = "";
	maskEditor.on("igvalidatorvalidating", function (evt, ui) {
		assert.equal(ui.value, value, "Mask Editor event args value on validating");
	});
	maskEditor.igMaskEditor("setFocus");
	value = "5";
	$.ig.TestUtil.keyDownChar(53, maskEditor.igMaskEditor("field"));
	$.ig.TestUtil.keyPressChar(53, maskEditor.igMaskEditor("field"));
	maskEditor.igMaskEditor("field").val("5ccccc");
	$.ig.TestUtil.keyUpChar(53, maskEditor.igMaskEditor("field"));
	maskEditor.off("igvalidatorvalidating");

	//Date editor onchange
	var dateEditor = $.ig.TestUtil.appendToFixture(this.divTag);
	dateEditor.igDateEditor({
		validatorOptions: {
			date: true,
			required: true,
			onchange: true,
			valueRange: [new Date(2015, 10, 25), new Date(2015, 10, 27)]
		}
	});

	value = new Date();
	rule = "control";
	dateEditor.on("igvalidatorvalidated", function (evt, ui) {
		// compare shorter strings to ignore ms differences, Note: toLocaleDateString varsly varies between cultures, phantom 
		assert.equal(ui.value.toLocaleDateString(), value.toLocaleDateString(), "Date Editor event args value on validated");
		assert.ok(!ui.valid && ui.rule === rule, "Date Editor event args valid and rule on validated");
	});
	dateEditor.igDateEditor("setFocus");
	value = new Date(2015, 10, 11);
	rule = "valueRange";
	$.ig.TestUtil.keyDownChar(53, dateEditor.igDateEditor("field"));
	$.ig.TestUtil.keyPressChar(53, dateEditor.igDateEditor("field"));
	dateEditor.igDateEditor("field").val('11/11/2015');
	$.ig.TestUtil.keyUpChar(53, dateEditor.igDateEditor("field"));
	dateEditor.off("igvalidatorvalidated");

	//igCombo
	var data = [{ ID: "BG", Name: "Bulgaria", Code: 359 },
	{ ID: "US", Name: "United States", Code: 1 },
	{ ID: "DE", Name: "Germany", Code: 2 },
	{ ID: "UK", Name: "United Kingdom", Code: 3 },
	{ ID: "FI", Name: "Finland", Code: 4 },
	{ ID: "DN", Name: "Denmark", Code: 5 },
	{ ID: "SP", Name: "Spain", Code: 6 },
	{ ID: "IT", Name: "Italy", Code: 7 },
	{ ID: "SW", Name: "Switzerland", Code: 8 },
	{ ID: "AU", Name: "Austria", Code: 9 },
	{ ID: "JA", Name: "Japan", Code: 10 }];
	var comboEditor = $.ig.TestUtil.appendToFixture(this.divTag);
	comboEditor.igCombo({
		width: 200,
		inputName: "country",
		dataSource: data,
		textKey: 'Name',
		valueKey: "ID",
		validatorOptions: { required: true, notificationOptions: { mode: "popover" } }
	});
	assert.notOk(comboEditor.igValidator("isValid"), "igCombo should be validated when required is set to true");
	comboEditor.igCombo("select", comboEditor.igCombo("dropDown").find("li").eq(0));
	assert.ok(comboEditor.igCombo("validator").isValid(), "igcombo should be valid after selection");
});

QUnit.test('[ID10] Validator edge cases', function (assert) {
	assert.expect(4);

	var form = $.ig.TestUtil.appendToFixture(this.formTag);
	form.igValidator();

	// because _validateInternal is externally called private funcition
	// will keep redundant checks and test the function responds to various calls and conditions:
	assert.ok(form.data("igValidator")._validateInternal(), "Internal validate should not fail on empty target with no rules.");
	assert.ok(form.data("igValidator")._validateInternal(null, $.Event("blur", { target: "#randomSelector" })), "Internal validate should not fail on wrong target with no rules.");

	// in case other controls re-render the target and it looses it's field data
	var validatorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { type: "text" });
	validatorInput.igValidator({ required: true });
	validatorInput.data("igValidatorField", null);
	assert.notOk(validatorInput.data("igValidator")._validateInternal(null, null, true, ""), "Internal validate should fail with empty value and required.");
	assert.ok(validatorInput.data("igValidator")._validateInternal(null, null, true, "value"), "Internal validate should not fail with non-empty value and required.");
});

QUnit.test('[ID11] igCombo asterix', function (assert) {
	assert.expect(2);

	var comboEditor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "requiredCombo" });
	comboEditor.igCombo({
		width: 200,
		dataSource: ["a", "b", "c"],
		validatorOptions: {
			required: true,
			requiredIndication: true,
			notificationOptions: { mode: "popover" }
		}
	});

	var indicatorElement = $('.ui-igvalidator-required-indication');
	var asterixPosition = indicatorElement.position();
	// Allow for line-height variation affecting vertical-align top:
	assert.ok(Math.abs(comboEditor.position().top - asterixPosition.top) <= 1, "The asterix should be on the same position as the combo.");
	assert.ok((comboEditor.igCombo("option", "width") <= asterixPosition.left && asterixPosition.left < 300), "The asterix position should be next to the combo.");
});
