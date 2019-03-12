QUnit.module("igColorPicker unit tests", {
	colorPickerSelector: "color-picker",
	actualColorPicker: null,
	firstColor: null,
	beforeEach: function () {
		$('body').append($("<div></div>").attr("id", this.colorPickerSelector));
		$(this.id(this.colorPickerSelector)).igColorPicker();
		this.actualColorPicker = $(this.id(this.colorPickerSelector));
		this.firstColor = "#ffffff";
		this.secondColor = "#000000";
		this.firstColorElement = $(this.id(this.colorPickerSelector)).find(".igColorPicker-color:eq(0)");
		this.secondColorElement = $(this.id(this.colorPickerSelector)).find(".igColorPicker-color:eq(1)");
	},
	afterEach: function () {
		$(this.id(this.colorPickerSelector)).remove();
	},
	id: function (selector) {
		return "#" + selector;
	}
});

QUnit.test("_create", function (assert) {
	assert.expect(1);
	var expectedHtmlMarkup = '<div class="igColorPicker-customColors"><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #ffffff;"></div><div class="igColorPicker-color" style="background-color: #000000;"></div><div class="igColorPicker-color" style="background-color: #EEECE1;"></div><div class="igColorPicker-color" style="background-color: #1F497D;"></div><div class="igColorPicker-color" style="background-color: #4F81BD;"></div><div class="igColorPicker-color" style="background-color: #C0504D;"></div><div class="igColorPicker-color" style="background-color: #9BBB59;"></div><div class="igColorPicker-color" style="background-color: #8064A2;"></div><div class="igColorPicker-color" style="background-color: #4BACC6;"></div><div class="igColorPicker-color" style="background-color: #F79646;"></div></div><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #F2F2F2;"></div><div class="igColorPicker-color" style="background-color: #7F7F7F;"></div><div class="igColorPicker-color" style="background-color: #DDD9C3;"></div><div class="igColorPicker-color" style="background-color: #C6D9F0;"></div><div class="igColorPicker-color" style="background-color: #DBE5F1;"></div><div class="igColorPicker-color" style="background-color: #F2DCDB;"></div><div class="igColorPicker-color" style="background-color: #EBF1DD;"></div><div class="igColorPicker-color" style="background-color: #E5E0EC;"></div><div class="igColorPicker-color" style="background-color: #DBEEF3;"></div><div class="igColorPicker-color" style="background-color: #FDEADA;"></div></div><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #D8D8D8;"></div><div class="igColorPicker-color" style="background-color: #595959;"></div><div class="igColorPicker-color" style="background-color: #C4BD97;"></div><div class="igColorPicker-color" style="background-color: #8DB3E2;"></div><div class="igColorPicker-color" style="background-color: #B8CCE4;"></div><div class="igColorPicker-color" style="background-color: #E5B9B7;"></div><div class="igColorPicker-color" style="background-color: #D7E3BC;"></div><div class="igColorPicker-color" style="background-color: #CCC1D9;"></div><div class="igColorPicker-color" style="background-color: #B7DDE8;"></div><div class="igColorPicker-color" style="background-color: #FAC08F;"></div></div><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #BFBFBF;"></div><div class="igColorPicker-color" style="background-color: #3F3F3F;"></div><div class="igColorPicker-color" style="background-color: #938953;"></div><div class="igColorPicker-color" style="background-color: #548DD4;"></div><div class="igColorPicker-color" style="background-color: #95B3D7;"></div><div class="igColorPicker-color" style="background-color: #D99694;"></div><div class="igColorPicker-color" style="background-color: #C3D69B;"></div><div class="igColorPicker-color" style="background-color: #B2A1C7;"></div><div class="igColorPicker-color" style="background-color: #92CDDC;"></div><div class="igColorPicker-color" style="background-color: #FAC08F;"></div></div><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #A5A5A5;"></div><div class="igColorPicker-color" style="background-color: #262626;"></div><div class="igColorPicker-color" style="background-color: #494429;"></div><div class="igColorPicker-color" style="background-color: #17365D;"></div><div class="igColorPicker-color" style="background-color: #366092;"></div><div class="igColorPicker-color" style="background-color: #953734;"></div><div class="igColorPicker-color" style="background-color: #76923C;"></div><div class="igColorPicker-color" style="background-color: #5F497A;"></div><div class="igColorPicker-color" style="background-color: #31859B;"></div><div class="igColorPicker-color" style="background-color: #E36C09;"></div></div><div class="igColorPicker-row"><div class="igColorPicker-color" style="background-color: #7F7F7F;"></div><div class="igColorPicker-color" style="background-color: #0C0C0C;"></div><div class="igColorPicker-color" style="background-color: #1D1B10;"></div><div class="igColorPicker-color" style="background-color: #0F243E;"></div><div class="igColorPicker-color" style="background-color: #244061;"></div><div class="igColorPicker-color" style="background-color: #632423;"></div><div class="igColorPicker-color" style="background-color: #4F6128;"></div><div class="igColorPicker-color" style="background-color: #3F3151;"></div><div class="igColorPicker-color" style="background-color: #205867;"></div><div class="igColorPicker-color" style="background-color: #974806;"></div></div></div><div class="ui-colorpicker-standardcolors"><div class="igColorPicker-color" style="background-color: #C00000;"></div><div class="igColorPicker-color" style="background-color: #FF0000;"></div><div class="igColorPicker-color" style="background-color: #FFC000;"></div><div class="igColorPicker-color" style="background-color: #FFFF00;"></div><div class="igColorPicker-color" style="background-color: #92D050;"></div><div class="igColorPicker-color" style="background-color: #00B050;"></div><div class="igColorPicker-color" style="background-color: #00B0F0;"></div><div class="igColorPicker-color" style="background-color: #0070C0;"></div><div class="igColorPicker-color" style="background-color: #002060;"></div><div class="igColorPicker-color" style="background-color: #7030A0;"></div></div>';

	assert.deepEqual($(this.actualColorPicker.igColorPicker("colorTable")).html(), expectedHtmlMarkup, "color table does not append right markup.");
});

QUnit.test("_changeSelectedColor", function (assert) {
	assert.expect(1);
	this.actualColorPicker.igColorPicker("selectColor", this.firstColor);
	assert.ok(this.firstColorElement.hasClass("selected-color"), "first color wasn't selected.");
});

QUnit.test("_changeColorOptions", function (assert) {
	assert.expect(1);
	this.actualColorPicker.igColorPicker("option", "colors", []);
	assert.equal(this.actualColorPicker.igColorPicker("customColorTable").children().length, 0, "colors were not removed as elements.")
});

QUnit.test("_changeStandardColorsOption", function (assert) {
	assert.expect(6);
	var colors = ["#f0ff0f", "#000a00", "#FEECE1"];
	
	assert.notEqual(this.actualColorPicker.igColorPicker("standardColorsTable").children().length, colors.length, "standardColors length is equal with given colors length.");
	
	this.actualColorPicker.igColorPicker("option", "standardColors", colors)
	
	this.actualColorPicker.igColorPicker("standardColorsTable").children().each(function(ind, val){ 
		var standardColorToRgb = $(val).css("background-color");
		var givenColorToRgb = hexToRgb(colors[ind]);

		assert.equal(standardColorToRgb, givenColorToRgb, "standard color value isn't equal with given color value.")
	})

	assert.equal(this.actualColorPicker.igColorPicker("standardColorsTable").children().length, colors.length, "standard colors length isn't equal with given colors length.");

	var clickFirstCustomColor = this.actualColorPicker.find(".igColorPicker-table").find(".ui-colorpicker-standardcolors").find(".igColorPicker-color").first().click();
	assert.ok(clickFirstCustomColor.hasClass("selected-color"), "click event was not triggered.");
});

QUnit.test("selectColor", function (assert) {
	assert.expect(1);
	this.actualColorPicker.igColorPicker("selectColor", "#000000");
	assert.ok(this.secondColorElement.hasClass("selected-color"), "color was not selected.");
});

QUnit.test("_getColorByElement", function (assert) {
	assert.expect(1);
	var expectedResult = this.secondColorElement.css("background-color");
	var getColor = this.actualColorPicker.igColorPicker("colorFromElement", this.secondColorElement);
	assert.equal(getColor, expectedResult, "color was not get by element.");   	
});

QUnit.test("_clickFirstCustomColor", function (assert) {
	assert.expect(1);
	var clickFirstCustomColor = this.actualColorPicker.find(".igColorPicker-table").find(".igColorPicker-customColors").find(".igColorPicker-row").first().find(".igColorPicker-color").first().click();
	assert.ok(clickFirstCustomColor.hasClass("selected-color"), "click event was not triggered.");
});

QUnit.test("_clickFirstStandardColor", function (assert) {
	assert.expect(1);
	var firstStandardColor = this.actualColorPicker.find(".igColorPicker-table").find(".ui-colorpicker-standardcolors").children().first().click();
	assert.ok(firstStandardColor.hasClass("selected-color"), "click event was not triggered.");
});

QUnit.test("_setTheSameOptionValue", function (assert) {
	assert.expect(4);
	var color = ["#C00000"];
	
	assert.notEqual(this.actualColorPicker.igColorPicker("standardColorsTable").children().length, color.length, "color value is equal with standardColor value."); 
	
	this.actualColorPicker.igColorPicker("option", "standardColors", color)
	var convertGivenColorToRgb = hexToRgb(color[0])
	assert.equal($(this.actualColorPicker.igColorPicker("standardColorsTable").children()).css("background-color"), convertGivenColorToRgb, "given color was not set to standard colors.");
	
	this.actualColorPicker.igColorPicker("option", "standardColors", color)
	assert.equal($(this.actualColorPicker.igColorPicker("standardColorsTable").children()).css("background-color"), convertGivenColorToRgb, "standard color value isn't equal with given color value.");

	assert.equal(this.actualColorPicker.igColorPicker("standardColorsTable").children().length, color.length, "standard color length isn't equal with given color length.");
});

QUnit.test("selectedColor", function (assert) {
	assert.expect(2);
	var getSelectedColor = this.actualColorPicker.igColorPicker("selectedColor");
	assert.equal(getSelectedColor, null, "selected color exist.");

	this.actualColorPicker.igColorPicker("selectColor", this.firstColor);
	getSelectedColor = this.actualColorPicker.igColorPicker("selectedColor");
	assert.equal(getSelectedColor, this.firstColor, "color was not selected.");
})

function hexToRgb (hex) {
	
	if(hex == undefined){
		return "";
	}

	var valueWithoutSymbol = hex.slice(1, hex.length);
	var bigint = parseInt(valueWithoutSymbol, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

	return "rgb(" + r + ", " + g + ", " + b + ")";
}