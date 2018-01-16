QUnit.module("igColorPickerSplitButton unit tests", {
	colorPickerSplitButtonSelector: "color-picker-split-button",
	actualColorPickerSplitButton: null,
	beforeEach: function () {
		$('body').append($("<div></div>").attr("id", this.colorPickerSplitButtonSelector));
		$(this.id(this.colorPickerSplitButtonSelector)).igColorPickerSplitButton({
			items: [{
				name: "textColor",
				label: "Font Color",
				icon: "ui-igbutton-forecolor"
			}],
			defaultItemName: "textColor",
			hasDefaultIcon: false,
			selectedTextColor: "red",
			expanded: function (evt, ui) {
				$('<input>').attr('type','hidden').val('expanded').appendTo(evt.target);
			},
			 click: function (evt, ui) {
				$('<input>').attr('type','hidden').val('clicked').appendTo(evt.target);
			},
			collapsed: function (evt, ui) {
				$('<input>').attr('type','hidden').val('collapsed').appendTo(evt.target);
			}
		});
		this.actualColorPickerSplitButton = $(this.id(this.colorPickerSplitButtonSelector));
	},
	afterEach: function () {
		this.actualColorPickerSplitButton.igColorPickerSplitButton("destroy");
		$(this.id(this.colorPickerSplitButtonSelector)).remove();
	},
	id: function (selector) {
		return "#" + selector;
	}
});


QUnit.test("_onColorSelect", function (assert) {
	assert.expect(1)
	var firstElemCustomColorsColorPicker = this.actualColorPickerSplitButton.parent().find(".igColorPicker-customColors").find(".igColorPicker-color").first();
	
	firstElemCustomColorsColorPicker.click();

	var getDefaultColorOptionVal = this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor");
	var getColorFromCustColorsColorPicker = firstElemCustomColorsColorPicker.css("background-color");
	
	assert.deepEqual(getDefaultColorOptionVal, getColorFromCustColorsColorPicker, "default color was not changed");
});

QUnit.test("expand", function (assert) {
	assert.expect(1)
	this.actualColorPickerSplitButton.igColorPickerSplitButton("expand", true);
	this.actualColorPickerSplitButton.trigger('expanded');
	var isExpanded = this.actualColorPickerSplitButton.igColorPickerSplitButton().find("input").val();
	
	assert.equal(isExpanded, "expanded", "expand event was not triggered");
});

QUnit.test("setColor", function (assert) {
	assert.expect(2)
	var getDefaultValue = this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor");
	assert.equal(getDefaultValue, "#000", "default color value isn't euqal with given color value");

	var  color = "#f0f0f0";
	this.actualColorPickerSplitButton.igColorPickerSplitButton("setColor", color);
	var getDefaultChangedColor = this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor");
	
	assert.equal(getDefaultChangedColor, color, "default color value wasn't changed");
});

QUnit.test("_onDefaultButtonClick", function (assert) {
	assert.expect(2)
	// Check before click if input element exist
	var clickInputValue = this.actualColorPickerSplitButton.igColorPickerSplitButton().find("input").val();
	var getDefaultButton = this.actualColorPickerSplitButton.igColorPickerSplitButton().children(":first").children(":first");
	
	assert.equal(clickInputValue, undefined, "default button was clicked");
	
	getDefaultButton.click();
	// Check after click the input element value
	clickInputValue = this.actualColorPickerSplitButton.igColorPickerSplitButton().find("input").val();
	assert.equal(clickInputValue, "clicked", "default button was not clicked");
});

QUnit.test("_setOptinWithEqualKeyValues", function (assert) {
	assert.expect(3)
	var color = "#afafaf";

	assert.notEqual(this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor"), color, "defaultColor option hasn't different value from given color value");

	this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor", color);
	assert.equal(this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor"), color, "default color value was not changed");
	
	this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor", color);
	assert.equal(this.actualColorPickerSplitButton.igColorPickerSplitButton("option", "defaultColor"), color, "default color value was change with given color value");

});

QUnit.test("collapse", function (assert) {
	assert.expect(1)
	this.actualColorPickerSplitButton.igColorPickerSplitButton("collapse", true);
	var isCollapsed = this.actualColorPickerSplitButton.igColorPickerSplitButton().find("input").val();
	assert.ok(isCollapsed, "collapse event was not trigger");
});