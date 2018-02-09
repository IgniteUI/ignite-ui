/*global window, setTimeout, $, startTesting, QUnit, module, test, ok, equals*/
QUnit.module("igRating unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>',

	beforeEach: function () { },

	afterEach: function () { },
});

QUnit.test('[ID1] Rating common', function (assert) {
	assert.expect(26);
	
	var rating1 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating1" });
	rating1.igRating();
	var actualValue = rating1.igRating('value');
	var expectedValue = 0;
	assert.equal(actualValue, expectedValue, 'Value of rating 1 is correct.');

	var rating2 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating2" });
	rating2.igRating({
		vertical: true,
		precision: 'exact',
		value: 0.8
	});
	actualValue = rating2.igRating('value');
	expectedValue = 0.8;
	assert.equal(actualValue, expectedValue, 'Value of rating 2 is correct.');			

	var rating3 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating3" });
	rating3.igRating({
		voteCount: 6,
		value: 0.8,
		precision: 'half'
	});

	var rating4 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating4" });
	rating4.igRating({
		vertical: true,
		voteCount: 6,
		value: 0.8,
		precision: 'half'
	});

	var rating5 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating5" });
	rating5.igRating({
		voteCount: 4,
		swapDirection: true,
		value: 0.8,
		precision: 'whole'
	});

	var rating6 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating6" });
	rating6.igRating({
		vertical: true,
		voteCount: 4,
		swapDirection: true,
		value: 0.8,
		precision: 'whole'
	});

	for (index = 3; index <= 6; index++) {
		ratingElement = $('#rating' + index);
		actualValue = ratingElement.igRating('value');
		var expectedResult = Math.abs(actualValue - 0.8) < 0.002;
		assert.ok(expectedResult, 'Value of rating ' + index + ' is correct.');
	}

	for (i = 1; i < 3; i++) {
		var ratingIndex = i;
		ratingElement = $('#rating' + ratingIndex).igRating();
		var voteElement = ratingElement.find('.ui-igrating-vote');
		expectedResult = voteElement && voteElement.length === 15;
		assert.ok(expectedResult, 'The number of vote elements in rating ' + ratingIndex + ' is 15.');

		voteElement = ratingElement.find('.ui-igrating-voteselected');
		expectedResult = voteElement && voteElement.length === 5;
		assert.ok(expectedResult, 'The number of selected votes in rating ' + ratingIndex + ' is 5.');

		voteElement = ratingElement.find('.ui-igrating-votehover');
		expectedResult = voteElement && voteElement.length === 5;
		assert.ok(expectedResult, 'The number of hover votes in rating ' + ratingIndex + ' is 5.');

		ratingIndex += 2;
		ratingElement = $('#rating' + ratingIndex).igRating();
		voteElement = ratingElement.find('.ui-igrating-vote');
		expectedResult = voteElement && voteElement.length === 18;
		assert.ok(expectedResult, 'The number of vote elements in rating ' + ratingIndex + ' is 18.');

		voteElement = ratingElement.find('.ui-igrating-voteselected');
		expectedResult = voteElement && voteElement.length === 6;
		assert.ok(expectedResult, 'The number of selected votes in rating ' + ratingIndex + ' is 6.');

		voteElement = ratingElement.find('.ui-igrating-votehover');
		expectedResult = voteElement && voteElement.length === 6;
		assert.ok(expectedResult, 'The number of hover votes in rating ' + ratingIndex + ' is 6.');

		ratingIndex += 2;
		ratingElement = $('#rating' + ratingIndex).igRating();
		voteElement = ratingElement.find('.ui-igrating-vote');
		expectedResult = voteElement && voteElement.length === 12;
		assert.ok(expectedResult, 'The number of vote elements in rating ' + ratingIndex + ' is 12.');

		voteElement = ratingElement.find('.ui-igrating-voteselected');
		expectedResult = voteElement && voteElement.length === 4;
		assert.ok(expectedResult, 'The number of selected votes in rating ' + ratingIndex + ' is 4.');

		voteElement = ratingElement.find('.ui-igrating-votehover');
		expectedResult = voteElement && voteElement.length === 4;
		assert.ok(expectedResult, 'The number of hover votes in rating ' + ratingIndex + ' is 4.');
	}

	ratingElement = $('#rating6');
	var ratingChildElementsNumber = ratingElement.find('*').length;
	expectedResult = ratingChildElementsNumber > 10;
	assert.ok(expectedResult, 'Rating has child elements.');

	ratingElement.igRating('destroy');
	ratingChildElementsNumber = ratingElement.find('*').length;
	expectedResult = ratingChildElementsNumber === 0;
	assert.ok(expectedResult, 'Destroyed rating has no child elements.');
});

QUnit.test('[ID2] Rating valueHover option', function (assert) {
	assert.expect(9);

	var rating = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating2" });
	rating.igRating({
		vertical: true,
		precision: 'exact',
		value: 0.8
	});

	var actualValue = rating.igRating('value');
	var expectedValue = 0.8;
	assert.equal(actualValue, expectedValue, 'Rating value is correct.');

	actualValue = rating.igRating('valueHover');
	assert.equal(actualValue, expectedValue, 'Rating hover value is correct.');

	expectedValue = 0.5;
	rating.igRating('valueHover', expectedValue);
	actualValue = rating.igRating('valueHover');
	assert.equal(actualValue, expectedValue, 'Rating hover value set to ' + expectedValue);

	expectedValue = 0.3;
	rating.igRating('value', expectedValue);
	actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, 'Rating value set to ' + expectedValue);

	expectedValue = 'exact';
	actualValue = rating.igRating('option', 'precision');
	assert.equal(actualValue, expectedValue, 'Rating precision is correct.');

	expectedValue = 'whole';
	rating.igRating('option', 'precision', expectedValue);
	actualValue = rating.igRating('option', 'precision');
	assert.equal(actualValue, expectedValue, 'Rating precision option was changed correctly.');

	expectedValue = 0.3;
	actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, 'Rating get value option is correct.');

	expectedValue = 0.5;
	actualValue = rating.igRating('valueHover');
	assert.equal(actualValue, expectedValue, 'Rating whole precision valueHover option is correct.');

	expectedValue = 0.3;
	rating.igRating('valueHover', expectedValue);
	actualValue = rating.igRating('valueHover');
	assert.equal(actualValue, expectedValue, 'Rating whole precision valueHover option set to ' + expectedValue);
});

QUnit.test('[ID3] Rating constructor over div tag', function (assert) {
	assert.expect(9);

	var rating = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating7" });
	rating.css('direction', 'rtl');
	rating.igRating({
		theme: 'redmond',
		valueAsPercent: false,
		value: 0.5,
		valueHover: 0.55
	});

	var done = assert.async();

	var theme = rating.igRating("option", "theme");
	assert.equal(theme, "redmond", "Rating theme option is set correctly.");

	var direction = rating.css("direction");
	assert.equal(direction, "ltr", "Rating css direction swapped.");
	var swapDirection = rating.igRating("option", "swapDirection");
	assert.notOk(swapDirection, "Rating swapDirection.")

	var val = rating.igRating("value");
	assert.equal(val, 0.5, "Rating get value of the div.");

	val = rating.igRating("valueHover");
	assert.equal(val, 0.55, "Rating get valueHover.");

	val = rating.igRating('hasFocus');
	assert.ok(!val, 'Rating has no focus.');

	rating.igRating("focus");

	$.ig.TestUtil.wait(300).then(function () {
		val = rating.igRating('hasFocus');
		assert.ok(val, 'Rating has focus.');

		// Get the internal input element of the rating control
		var activeElem = rating.find(".ui-igrating-active");
		assert.ok(activeElem && activeElem.length > 0, "Rating has active element after focus.");

		var inputEl = activeElem[0].children[0].children[0];
		$(inputEl).blur();

		return $.ig.TestUtil.wait(400);
	}).then(function () {
		var activeElem1 = rating.find(".ui-igrating-active");
		assert.ok(activeElem1 && activeElem1.length === 0, "Rating doesn't have active element after blur.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID4] Rating constructor over input tag', function (assert) {
	assert.expect(2);
	var expectedValue = 0.3;
	var expectedInputName = 'rating8';

	var rating = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "rating8", value: expectedValue });
	rating.igRating({
		inputName: expectedInputName,
		value: 0.5
	});

	var actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, 'Rating over input get value is correct.');

	actualValue = rating.igRating("option", "inputName");
	assert.equal(actualValue, expectedInputName, 'Rating input name is correct.');
});

QUnit.test('[ID5] Rating constructor over non existing input tag', function (assert) {
	assert.expect(1);
	var expectedValue = 0.5;

	var rating = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "rating9", value: 0.3 });
	rating.igRating({
		inputName: 'rating_non_existing',
		value: 0.5
	});

	var actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, 'Rating get value of the widget is correct.');
});

QUnit.test('[ID6] Rating keydown events', function (assert) {
	assert.expect(10);

	var rating10 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating10" });
	rating10.igRating({
		valueHover: 0.2
	});

	rating11 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating11" });
	rating11.igRating({
		valueHover: 0.6,
		vertical: true
	});
	var kc = $.ui.keyCode;

	// Get the internal input element of the rating control
	var inputEl10 = rating10[0].children[0].children[0].children[0];
	var inputEl11 = rating11[0].children[0].children[0].children[0];

	// Space key down
	$.ig.TestUtil.keyDownChar(kc.SPACE, $(inputEl10), false);
	var expectedValue = 0.2;
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value set to valueHover when space key is pressed.");

	// Enter key down
	$.ig.TestUtil.keyDownChar(kc.ENTER, $(inputEl11), false);
	expectedValue = 0.6;
	actualValue = rating11.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value set to valueHover when Enter key is pressed");

	// Reset the ratings' values for the following tests
	rating10.igRating('value', 0.3);
	rating11.igRating('value', 0.5);

	// Home key down
	$.ig.TestUtil.keyDownChar(kc.HOME, $(inputEl10), false);
	expectedValue = 0.3;
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Home key is being pressed.");

	// End key down
	$.ig.TestUtil.keyDownChar(kc.END, $(inputEl10), false);
	expectedValue = 0.3;
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after End key is being pressed");

	// Page Up key down
	$.ig.TestUtil.keyDownChar(kc.PAGE_UP, $(inputEl10), false);
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Page Up key is being pressed.");

	// Page Down key down
	$.ig.TestUtil.keyDownChar(kc.PAGE_DOWN, $(inputEl10), false);
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Page Down key is being pressed");

	// Left key down
	$.ig.TestUtil.keyDownChar(kc.LEFT, $(inputEl10), false);
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Left key is being pressed.");

	// Right key down
	$.ig.TestUtil.keyDownChar(kc.RIGHT, $(inputEl10), false);
	var actualValue = rating10.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Right key is being pressed.");

	// Up key down
	$.ig.TestUtil.keyDownChar(kc.UP, $(inputEl11), false);
	expectedValue = 0.5;
	var actualValue = rating11.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Up key is being pressed.");

	// Down key down
	$.ig.TestUtil.keyDownChar(kc.DOWN, $(inputEl11), false);
	var actualValue = rating11.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value is unchanged after Down key is being pressed.");
});

QUnit.test('[ID7] Rating options', function (assert) {
	assert.expect(8);

	var rating = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating12" });
	rating.igRating({
		value: 0.3,
		focusable: true,
		theme: 'redmond'
	});

	var expectedValue = 0.3;
	rating.igRating('option', 'value', expectedValue);
	var actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, 'Rating value should not be changed when trying to set the same value again.');

	assert.throws(function () {
		rating.igRating('option', 'focusable', false);
	}, "Trying to set a readonly option should result in exception");

	rating.igRating('option', 'disabled', true);
	var spans = $("SPAN", rating);
	assert.ok(spans.hasClass("ui-state-disabled"), "The ui-state-disabled class should be applied to all child spans.");

	rating.igRating('option', 'disabled', false);
	assert.notOk(spans.hasClass("ui-state-disabled"), "The ui-state-disabled class shouldn't be applied to all child spans.");

	rating.igRating('option', 'theme', 'gold');
	var theme = rating.igRating('option', 'theme');
	assert.equal(theme, 'gold', 'Rating theme option is set correctly.')

	rating.igRating('option', 'dummyOption', function () { });
	var dummyOption = rating.igRating('option', 'dummyOption');
	assert.ok(dummyOption && typeof (dummyOption) === 'function', 'Rating dummyOption option should be defined as function.');

	expectedValue = 0.5;
	rating.igRating('option', 'value', expectedValue);
	actualValue = rating.igRating('value');
	assert.equal(actualValue, expectedValue, "Rating value should be changed.");

	rating.igRating("option", "validatorOptions", { onblur: true });
	var validatorOptions = rating.igRating("option", "validatorOptions");
	assert.ok(validatorOptions.onblur, 'Rating validatorOptions should be applied correctly.');
});

QUnit.test('[ID8] Rating mouse events', function (assert) {
	assert.expect(3);

	var rating = $.ig.TestUtil.appendToFixture(this.divTag, { id: "rating13" });
	rating.igRating();

	var eventFired = false;
	var spans = rating.find('.ui-igrating-vote');
	var done = assert.async();

	var span3 = $(spans[2]);
	span3.on('mousedown', function () {
		eventFired = true;
	});
	span3.on('mousemove', function () {
		eventFired = true;
	});
	span3.on('mouseleave', function () {
		eventFired = true;
	});

	// mousemove over the third span
	span3.trigger('mousemove');
	$.ig.TestUtil.wait(300).then(function () {
		assert.ok(eventFired, 'Mousemove event fired.');
		flag = false;

		// mousedown on the third span
		span3.trigger('mousedown');

		return $.ig.TestUtil.wait(300);
	}).then(function () {
		var ratingValue = rating.igRating('value');
		assert.ok(eventFired && ratingValue >= 0.4 && ratingValue <= 0.6, 'Mousedown event fired.');
		flag = false;

		// mouseleave on the third span
		span3.trigger('mouseleave');

		return $.ig.TestUtil.wait(300);
	}).then(function () {
		assert.ok(eventFired, 'Mouseleave event fired.');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});