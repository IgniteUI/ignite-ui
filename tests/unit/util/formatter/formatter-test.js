QUnit.module("igUtil formatter unit tests", {
	afterEach: function () { 
		$.fx.off = false;
		if($.ig.util.regional){
			$.ig.util.changeGlobalRegional('');
		}
	 }
});

QUnit.test('[ID1] Test number type', function (assert) {
	assert.expect(19);

	// change the regional default
	$.ig.util.changeGlobalRegional("en-US");
	var stringValue = $.ig.formatter(55, "number");
	assert.equal("55", stringValue);
	stringValue = $.ig.formatter(55, "number", "number");
	assert.equal("55", stringValue);
	stringValue = $.ig.formatter(55, "number", "currency");
	assert.equal("$55.00", stringValue);
	stringValue = $.ig.formatter(0.55, "number", "percent");
	assert.equal("55.00%", stringValue);
	stringValue = $.ig.formatter(55, "number", "int");
	assert.equal("55", stringValue);
	stringValue = $.ig.formatter(55, "number", "double");
	assert.equal("55", stringValue);
	stringValue = $.ig.formatter(55.123456789, "number", "double");
	assert.equal("55.123456789", stringValue);
	stringValue = $.ig.formatter(55, "number", "0.00");
	assert.equal("55.00", stringValue);
	stringValue = $.ig.formatter(5555555, "number");
	assert.equal("5,555,555", stringValue);
	stringValue = $.ig.formatter(-5555555, "number");
	assert.equal("-5,555,555", stringValue);
	stringValue = $.ig.formatter(5555555.55, "number");
	assert.equal("5,555,555.55", stringValue);
	stringValue = $.ig.formatter(5555555.55678, "number");
	assert.equal("5,555,555.56", stringValue);


	stringValue = $.ig.formatter(-55, "number", "currency");
	assert.equal("-$55.00", stringValue);
	stringValue = $.ig.formatter(5555555.55678, "number", "currency");
	assert.equal("$5,555,555.56", stringValue);

	stringValue = $.ig.formatter(-0.55, "number", "percent");
	assert.equal("-55.00%", stringValue);
	stringValue = $.ig.formatter(.55789, "number", "percent");
	assert.equal("55.79%", stringValue);

	// change the regional default
	$.ig.util.changeGlobalRegional("bg");

	stringValue = $.ig.formatter(55, "number", "currency");
	assert.equal("55,00 лв", stringValue);
	stringValue = $.ig.formatter(55, "number", "0.00");
	assert.equal("55,00", stringValue);
	stringValue = $.ig.formatter(.55, "number", "percent");
	assert.equal("55,00 %", stringValue);
 });

 QUnit.test('[ID2] Test date type', function (assert) {
	assert.expect(36);
	// d - day 1 digit
	// dd - day 2 digits
	// ddd - weekday short name
	// dddd - weekday long name
	// M - month 1 digit
	// MM - month 2 digits
	// MMM - month short name
	// MMMM - month long name
	// yy - year short
	// yyyy - year long
	// H - hour 1 digit 24 hour format
	// HH - hour 2 digits 24 hour format
	// tt - AM/PM
	// change the regional default
	$.ig.util.changeGlobalRegional("en-US");
	var stringValue = $.ig.formatter(new Date(2013, 0, 1), "date");
	assert.equal("1/1/2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "date");
	assert.equal("1/1/2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dateLong");
	assert.equal("Tuesday, January 01, 2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "dateTime");
	assert.equal("1/1/2013 3:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "time");
	assert.equal("3:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "timeLong");
	assert.equal("3:00:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "MM/dd/yyyy");
	assert.equal("01/01/2013", stringValue);

	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "M/d/yyyy");
	assert.equal("1/1/2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "M/d/yy");
	assert.equal("1/1/13", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "MM/dd/yy");
	assert.equal("01/01/13", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "yy/MM/dd");
	assert.equal("13/01/01", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "yyyy-MM-dd");
	assert.equal("2013-01-01", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dd-MMM-yy");
	assert.equal("01-Jan-13", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dddd, MMMM d, yyyy");
	assert.equal("Tuesday, January 1, 2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "h:mm tt");
	assert.equal("12:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 15), "date", "h:mm tt");
	assert.equal("3:00 PM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 1), "date", "h:mm:ss tt");
	assert.equal("1:00:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 1), "date", "hh:mm tt");
	assert.equal("01:00 AM", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 15), "date", "H:mm");
	assert.equal("15:00", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 1), "date", "HH:mm");
	assert.equal("01:00", stringValue);

	// bug: 184712 - enableUTCDates is ignored when using a format of 'dddd'
	//$.ig.formatter = function (val, type, format, notTemplate, enableUTCDates, displayStyle)
	stringValue = $.ig.formatter(new Date(2014, 0, 1, 1, 40), "date", "dddd", true, false);
	assert.equal("Wednesday", stringValue);
	stringValue = $.ig.formatter(new Date("January 1, 2014, 00:01:40 UTC+2"), "date", "dddd", true, true);
	assert.equal("Tuesday", stringValue);

	stringValue = $.ig.formatter(new Date(2014, 0, 1, 1, 40), "date", "ddd", true, false);
	assert.equal("Wed", stringValue);
	stringValue = $.ig.formatter(new Date("January 1, 2014, 00:01:40 UTC+2"), "date", "ddd", true, true);
	assert.equal("Tue", stringValue);

	// change the regional default
	$.ig.util.changeGlobalRegional("bg");
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date");
	assert.equal("01.01.2013 г.", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "date");
	assert.equal("01.01.2013 г.", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dateLong");
	// M.P. Note: in Bulgarian the names of the months and weekdays are written in lowercase, so I think there is a bug in the Bulgarian regional settings
	assert.equal("01 Януари 2013 г.", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "dateTime");
	assert.equal("01.01.2013 г. 03:00", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "time");
	assert.equal("03:00", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1, 3), "date", "timeLong");
	assert.equal("03:00:00", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "MM/dd/yyyy");
	assert.equal("01/01/2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dddd, d MMMM, yyyy");
	assert.equal("Вторник, 1 Януари, 2013", stringValue);
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "ddd, d MMM, yyyy");
	assert.equal("Вто, 1 Яну, 2013", stringValue);

	$.ig.util.changeGlobalRegional("es");
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "dddd, dd \\de MMMM \\de yyyy");
	assert.equal("Martes, 01 de Enero de 2013", stringValue);

	// check that the escape sequence for the special character placeholders works
	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "\\d \\y \\M\\M\\M \\m \\s \\t \\f");
	assert.equal("d y MMM m s t f", stringValue);

	stringValue = $.ig.formatter(new Date(2013, 0, 1), "date", "\\ddddd \\y \\M\\M\\M \\m \\s \\t \\f \\h \\H");
	assert.equal("dMartes y MMM m s t f h H", stringValue);
});

QUnit.test('[ID3] Test checkbox format', function (assert) {
	assert.expect(2);
	var stringValue = $.ig.formatter(true, "checkbox", "checkbox", true, false, 0, "block", "labelText", 1);
	assert.equal(stringValue,
		"<span class='ui-igcheckbox-container' style='display:block;' role='checkbox' aria-disabled='true' aria-checked='true' aria-label='labelText' tabindex='1'><span class='' style='display:inline-block'><span style='display:block' class='ui-icon ui-icon-check ui-igcheckbox-small-on'></span></span></span>",
		"Verify the checkbox format is properly applied.");

	stringValue = $.ig.formatter(false, "checkbox", "checkbox", true, false, 0, "block", "labelText", 1);

	assert.equal(stringValue,
		"<span class='ui-igcheckbox-container' style='display:block;' role='checkbox' aria-disabled='true' aria-checked='false' aria-label='labelText' tabindex='1'><span class='' style='display:inline-block'><span style='display:block' class='ui-igcheckbox-small-off ui-icon ui-icon-check ui-igcheckbox-small-on'></span></span></span>",
		"Verify the checkbox format is properly applied.");
});

QUnit.test('[ID4] Test escape', function (assert) {
	assert.expect(1);
	// change the regional default
	$.ig.util.changeGlobalRegional("en-US");
	var stringValue = $.ig.encode("<script>alert()<\/script>");

	assert.equal("&lt;script&gt;alert()&lt;/script&gt;", stringValue);
});
