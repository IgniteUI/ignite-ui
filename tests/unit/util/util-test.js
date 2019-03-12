QUnit.module("igUtil basic unit tests", {
	divTag: '<div></div>'
});

QUnit.test('[ID1] Test getColType function', function (assert) {
	assert.expect(6);

	var result = $.ig.getColType(new Date());
	assert.equal(result, "date", "Check if result is correct for the object type.");

	result = $.ig.getColType(1);
	assert.equal(result, "number", "Check if result is correct for the object type.");

	result = $.ig.getColType("1");
	assert.equal(result, "string", "Check if result is correct for the object type.");

	result = $.ig.getColType(true);
	assert.equal(result, "bool", "Check if result is correct for the object type.");

	result = $.ig.getColType([1, 2, 3]);
	assert.equal(result, "object", "Check if result is correct for the object type.");

	result = $.ig.getColType(undefined);
	assert.equal(result, "string", "Check if result is correct for the object type.");
});

QUnit.test('[ID2] Test getRelativeOffset function', function (assert) {
	assert.expect(3);

	var $container = $.ig.TestUtil.appendToFixture(this.divTag, { id: "container", style:"float:right;width:100%;overflow:auto;" });
	$container.append("<div class='container'><span id='span1' class='bottomleft'> Span elem</span><div>");
	
	$container.append("<div class='container'><div style='position:absolute;' class='topright'><table id='table1'><tr><td>Table cell 1</td><td>Table cell 2</td></tr></table><div></div>");
	
	$container.append("<div style='position:absolute; height:500px;' class='container topright'><div class='bottomleft' style='position:static;'><span id='span2' style='position:static;'>Span2</span></div></div>");

	//check getRelativeOffset with relative positioning of the parent
	var relOffset = $.ig.util.getRelativeOffset($("#span1"));
	assert.ok($("#span1").parent().igOffset().left - $("#span1").parent().scrollLeft() === relOffset.left && $("#span1").parent().igOffset().top - $("#span1").parent().scrollTop() === relOffset.top, "The element offset should be correct.");
	
	//check getRelativeOffset with absolute positioning of the parent
	relOffset = $.ig.util.getRelativeOffset($("#table1"));
	assert.ok($("#table1").parent().igOffset().left - $("#table1").parent().scrollLeft() === relOffset.left && $("#table1").parent().igOffset().top - $("#table1").parent().scrollTop() === relOffset.top, "The element offset should be correct.");
	
	//check getRelativeOffset with static positioning of the parent
	relOffset = $.ig.util.getRelativeOffset($("#span2"));
	assert.ok($("#span2").parent().parent().igOffset().left - $("#span2").parent().parent().scrollLeft() === relOffset.left && $("#span2").parent().parent().igOffset().top - $("#span2").parent().parent().scrollTop() === relOffset.top, "The element offset should be correct.");
});

QUnit.test('[ID3] Test defEnum', function (assert) {
	assert.expect(12);

	//simple non-flagged enum
	assert.equal(3, $.ig.DayOfWeek.prototype.wednesday, "Simple enum member - Access value via prototype");
	assert.equal("Wednesday", $.ig.DayOfWeek.prototype.getBox(3).toString(), "Simple enum member - ToString.");
	assert.equal("Wednesday", $.ig.Enum.prototype.parse($.ig.DayOfWeek.prototype.$type, "wednesday", true).toString(), "Simple enum member - Parse");
	
	//flagged enum
	assert.equal(111, $.ig.NumberStyles.prototype.number, "Simple flagged enum member - Access value via prototype");
	assert.equal(167, $.ig.NumberStyles.prototype.floatNumber, "Complex flagged enum member - Access value via prototype");
	assert.equal("Number", $.ig.NumberStyles.prototype.getBox(111).toString(), "Simple enum member - ToString.");
	assert.equal("Float", $.ig.NumberStyles.prototype.getBox(167).toString(), "Complex enum member - ToString.");
	assert.equal("Number", $.ig.Enum.prototype.parse($.ig.NumberStyles.prototype.$type, "number", true).toString(), "Simple flagged enum member - Parse");
	assert.equal("Float", $.ig.Enum.prototype.parse($.ig.NumberStyles.prototype.$type, "float", true).toString(), "Complex flagged enum member - Parse");

	//and some tests for public enums which differ in that the values are on the type instead of the prototype
	$.ig.util.defEnum("TestPublicEnum", false, true, {
		Foo: 0,
		Bar: 1
	});

	assert.equal(1, $.ig.TestPublicEnum.bar, "Simple public enum member - Access value via prototype");
	assert.equal("Bar", $.ig.TestPublicEnum.prototype.getBox(1).toString(), "Simple public enum member - ToString.");
	assert.equal("Bar", $.ig.Enum.prototype.parse($.ig.TestPublicEnum.prototype.$type, "bar", true).toString(), "Simple public enum member - Parse");
 });

QUnit.test('[ID4] Test appendToQueryString and prependToQueryString util functions', function (assert) {
	assert.expect(2);
	var url = "http://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=json&%24skip=0&%24top=25&%24inlinecount=allpages&dbdepth=0&pk=CustomerID";
	var newUrl = $.ig.util.appendToQueryString(url, "additionalParam=1");
	assert.equal(newUrl, "http://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=json&%24skip=0&%24top=25&%24inlinecount=allpages&dbdepth=0&pk=CustomerID&additionalParam=1", "Verify url is correct and the new param is appended.");
	newUrl = $.ig.util.prependToQueryString (url, "('ALFKI')/Orders");
	assert.equal(newUrl, "http://services.odata.org/V2/Northwind/Northwind.svc/Customers('ALFKI')/Orders?$format=json&%24skip=0&%24top=25&%24inlinecount=allpages&dbdepth=0&pk=CustomerID","Verify url is correct and the new string is prepended.");
});

QUnit.test('[ID5] Test calcSummaries function by specifying summary name', function (assert) {
	assert.expect(14);

	var data = [ 114601, 82742, 63895, 27186, 63198, 73758 ];
	
	//Min
	assert.equal($.ig.calcSummaries("min", data, null, "number"), 27186, "Function did determine the minimum number correctly");
	assert.equal($.ig.calcSummaries("min", [], null, "number"), 0, "Min return 0 when the data is empty and dataType is 'number'");
	assert.equal($.ig.calcSummaries("min", [], null, "date"), null, "Min returns null when the data is empty and dataType is 'date'");

	//Max
	assert.equal($.ig.calcSummaries("max", data, null, "number"), 114601, "Max function did determine the minimum number correctly");
	assert.equal($.ig.calcSummaries("max", [], null, "number"), 0, "Max return 0 when the data is empty and dataType is 'number'");
	assert.equal($.ig.calcSummaries("max", [], null, "date"), null, "Max returns null when the data is empty and dataType is 'date'");
	
	//Sum
	assert.equal($.ig.calcSummaries("sum", data, null, "number"), 425380, "Sum function calculated the sum correctly");
	assert.equal($.ig.calcSummaries("sum", data), 425380, "Sum function calculated the sum correctly");
	assert.equal($.ig.calcSummaries("sum", [], null, "number"), 0, "Sum function return 0 when the array is empty");
	
	//Avg
	assert.equal($.ig.calcSummaries("avg", data, null, "number").toFixed(0), 70897, "Avg function calculated the average correctly");
	assert.equal($.ig.calcSummaries("avg", data).toFixed(0), 70897, "Avg function calculated the average correctly");
	assert.equal($.ig.calcSummaries("avg", [], null, "number"), 0, "Avg function return 0 when the array is empty");
	
	//Count
	assert.equal($.ig.calcSummaries("count", data, null, "number"), 6, "Count function return the number of elements correctly");
	assert.equal($.ig.calcSummaries("count", [], null, "number"), 0, "Count function return 0 when the array is empty");
});

QUnit.test('[ID6] Test calcSummaries function by specifying summary function directly', function (assert) {
	assert.expect(14);

	var data = [ 114601, 82742, 63895, 27186, 63198, 73758 ];
	
	//Min
	assert.equal($.ig.calcSummaries("customMin", data, $.ig.util.summaries.min, "number"), 27186, "Function did determine the minimum number correctly");
	assert.equal($.ig.calcSummaries("customMin", [], $.ig.util.summaries.min, "number"), 0, "Min return 0 when the data is empty and dataType is 'number'");
	assert.equal($.ig.calcSummaries("customMin", [], $.ig.util.summaries.min, "date"), null, "Min returns null when the data is empty and dataType is 'date'");

	//Max
	assert.equal($.ig.calcSummaries("customMax", data, $.ig.util.summaries.max, "number"), 114601, "Max function did determine the minimum number correctly");
	assert.equal($.ig.calcSummaries("customMax", [], $.ig.util.summaries.max, "number"), 0, "Max return 0 when the data is empty and dataType is 'number'");
	assert.equal($.ig.calcSummaries("customMax", [], $.ig.util.summaries.max, "date"), null, "Max returns null when the data is empty and dataType is 'date'");
	
	//Sum
	assert.equal($.ig.calcSummaries("customSum", data, $.ig.util.summaries.sum, "number"), 425380, "Sum function calculated the sum correctly");
	assert.equal($.ig.calcSummaries("customSum", [], $.ig.util.summaries.sum), 0, "Sum function return 0 when the array is empty");
	
	//Avg
	assert.equal($.ig.calcSummaries("customAvg", data, $.ig.util.summaries.avg, "number").toFixed(0), 70897, "Avg function calculated the average correctly");
	assert.equal($.ig.calcSummaries("customAvg", [], $.ig.util.summaries.avg, "number"), 0, "Avg function return 0 when the array is empty");
	
	//Count
	assert.equal($.ig.calcSummaries("custom", data, $.ig.util.summaries.count), 6, "Count function return the number of elements correctly");
	assert.equal($.ig.calcSummaries("custom", [], $.ig.util.summaries.count), 0, "Count function return 0 when the array is empty");
	
	assert.equal($.ig.calcSummaries("random", [], $.ig.util.summaries.count), null, "Count function returns null when the summary name is not starting with custom");
	assert.equal($.ig.calcSummaries("custom", []), null, "Count function returns null when the custom summary function is not defined");
});

QUnit.test('[ID7] Test Complex Generic TypeArguments', function (assert) {
	assert.expect(1);

	var listNullInt = $.ig.IList$1.prototype.$type.specialize($.ig.Nullable$1.prototype.$type.specialize($.ig.Number.prototype.$type));
	assert.equal($.ig.Number.prototype.$type, listNullInt.typeArguments[0].typeArguments[0], "List<Nullable<int>>");
});


QUnit.test('[ID8] Test Date.toStringFormat', function (assert) {
	assert.expect(13);

	var dt = new Date("1980-10-11T12:00:00");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "MM/dd"), "10/11", "Date.toStringFormat formats MM/dd correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "MMM dd"), "Oct 11", "Date.toStringFormat formats MMM dd correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "MMM"), "Oct", "Date.toStringFormat formats MMM correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "yyyy"), "1980", "Date.toStringFormat formats yyyy correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "yy"), "80", "Date.toStringFormat formats yy correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "HH"), "12", "Date.toStringFormat formats HH correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "hh"), "12", "Date.toStringFormat formats hh correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "mm"), "00", "Date.toStringFormat formats mm correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "ss"), "00", "Date.toStringFormat formats ss correctly");	
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "hh:mmtt"), "12:00PM", "Date.toStringFormat formats hh:mmtt correctly");	
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "d"), "10/11/1980", "Date.toStringFormat formats d correctly");
	// travis ci build doesn't seem to fully implement the part of toLocaleString where it infers the format based on the given options, causing several of these tests to fail. commenting for now.
	// equal($.ig.Date.prototype.toStringFormat(dt, "D"), "Saturday, October 11, 1980", "Date.toStringFormat formats D correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "f"), "Saturday, October 11, 1980, 12:00 PM", "Date.toStringFormat formats f correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "F"), "Saturday, October 11, 1980, 12:00:00 PM", "Date.toStringFormat formats F correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "g"), "10/11/1980, 12:00:00 PM", "Date.toStringFormat formats g correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "G"), "10/11/1980, 12:00:00 PM", "Date.toStringFormat formats G correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "M"), "October 11", "Date.toStringFormat formats M correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "m"), "October 11", "Date.toStringFormat formats m correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "t"), "12:00 PM", "Date.toStringFormat formats t correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "T"), "12:00:00 PM", "Date.toStringFormat formats T correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "y"), "October 1980", "Date.toStringFormat formats y correctly");
	// equal($.ig.Date.prototype.toStringFormat(dt, "Y"), "October 1980", "Date.toStringFormat formats Y correctly");
	assert.equal($.ig.Date.prototype.toStringFormat(dt, "hh:mm:ss:ff"), "12:00:00:00", "Date.toStringFormat formats hh:mm:ss:ff correctly");
});

QUnit.test('[ID9] Test IsAssignableFrom', function (assert) {
	assert.expect(5);

	// type itself
	assert.ok($.ig.Enum.prototype.$type.isAssignableFrom($.ig.Enum.prototype.$type), "Enum type");
	// base type
	assert.ok($.ig.IEnumerable.prototype.$type.isAssignableFrom($.ig.IList.prototype.$type), "Base type of IList is IEnumerable");
	// interfaces
	assert.ok($.ig.IConvertible.prototype.$type.isAssignableFrom($.ig.Enum.prototype.$type), "Enum implements IConvertible");
	assert.ok($.ig.IComparable$1.prototype.$type.specialize($.ig.Int32.prototype.$type).isAssignableFrom($.ig.Int32.prototype.$type), "Int32 implements IComparable<Int32>");
	assert.ok($.ig.IEquatable$1.prototype.$type.specialize($.ig.Int32.prototype.$type).isAssignableFrom($.ig.Int32.prototype.$type), "Int32 implements IEquatable<Int32>");
});

QUnit.test('[ID10] Test stringCompare2', function (assert) {
	assert.expect(7);

	var c = $.ig.CultureInfo.prototype.currentCulture();
	var o = $.ig.CompareOptions.prototype.none;
	
	assert.equal($.ig.util.stringCompare2("A", "B", c, o), -1, "A before B");
	assert.equal($.ig.util.stringCompare2("B", "A", c, o), 1, "B before A");
	assert.equal($.ig.util.stringCompare2("A", "A", c, o), 0, "A === A");
	assert.equal($.ig.util.stringCompare2(null, "A", c, o), -1, "null befoe A");
	assert.equal($.ig.util.stringCompare2("A", null, c, o), 1, "A after null");
	assert.equal($.ig.util.stringCompare2(null, "", c, o), -1, "null before empty");
	assert.equal($.ig.util.stringCompare2("", null, c, o), 1, "empty after null");
});

QUnit.test('[ID11] Test trimStart', function (assert) {
	assert.expect(6);

	assert.equal("  ABC  ".trimStart(), "ABC  ", "No arguments");
	assert.equal("  ABC  ".trimStart([]), "ABC  ", "Empty array argument");
	assert.equal("  ABC  ".trimStart([' ']), "ABC  ", "Explicit space argument");
	assert.equal("aa  ABC  aa".trimStart(['a']), "  ABC  aa", "Nonstandard trim character");
	assert.equal("aa  ABC  aa".trimStart('a'), "  ABC  aa", "character only");
	assert.equal("aa  ABC  aa".trimStart('a', ' '), "ABC  aa", "Multiple characters only");
});

QUnit.test('[ID12] Test trimEnd', function (assert) {
	assert.expect(6);

	assert.equal("  ABC  ".trimEnd(), "  ABC", "No arguments");
	assert.equal("  ABC  ".trimEnd([]), "  ABC", "Empty array argument");
	assert.equal("  ABC  ".trimEnd([' ']), "  ABC", "Explicit space argument");
	assert.equal("aa  ABC  aa".trimEnd(['a']), "aa  ABC  ", "Nonstandard trim character");
	assert.equal("aa  ABC  aa".trimEnd('a'), "aa  ABC  ", "character only");
	assert.equal("aa  ABC  aa".trimEnd('a', ' '), "aa  ABC", "Multiple characters only");
});

QUnit.test('[ID13] Test $.ig.encode', function (assert) {
	assert.expect(4);

	assert.equal($.ig.encode("<div></div>"), "&lt;div&gt;&lt;/div&gt;", "Should encode div element");
	assert.equal($.ig.encode("&lt;div&gt;&lt;/div&gt;"), "&amp;lt;div&amp;gt;&amp;lt;/div&amp;gt;", "Should encode encoded div element");
	assert.equal($.ig.encode("<span id='span1'></span>"), "&lt;span id=&#39;span1&#39;&gt;&lt;/span&gt;", "Should encode span element with attribute and single quote");
	assert.equal($.ig.encode("<span id=\"span1\"></span>"), "&lt;span id=&#34;span1&#34;&gt;&lt;/span&gt;", "Should encode span element with attribute and double quote")
});

QUnit.test('[ID14] Test $.ig.util.stringToColor', function (assert) {
	assert.expect(6);

	assert.deepEqual($.ig.util.stringToColor(null), { a: 0, r: 0, g: 0, b: 0 }, "Passing null to stringToColor should return transparent.");
	assert.deepEqual($.ig.util.stringToColor("papayawhip"), { a: 255, r: 255, g: 239, b: 213 }, "Passing papayawhip to stringToColor should look as delicious as whipped papaya.");
	assert.deepEqual($.ig.util.stringToColor("rgba(13, 14, 15, 0.2)"), { r: 13, g: 14, b: 15, a: 51 }, "Passing rgba(13, 14, 15, 16) to stringToColor should return that color.");
	assert.deepEqual($.ig.util.stringToColor("rgb(13, 14, 15)"), { a: 255, r: 13, g: 14, b: 15 }, "Passing rgb(13, 14, 15) to stringToColor should return that color.");
	assert.deepEqual($.ig.util.stringToColor("#beefed"), { a: 255, r: 190, g: 239, b: 237 }, "Passing #beefed to stringToColor should return a nice pale cyan color.");
	assert.deepEqual($.ig.util.stringToColor("#def"), { a: 255, r: 221, g: 238, b: 255 }, "Passing #def to stringToColor should return a nice pale lavender color.");
});

QUnit.test('[ID15] Test numberToString', function (assert) {
	assert.expect(12);

	assert.equal($.ig.util.numberToString1(Math.PI, "0"), "3", "numberToString1 truncates all decimals when format is 0");   
	assert.equal($.ig.util.numberToString1(Math.PI, "0.0"), "3.1", "numberToString1 truncates to 1 decimal place when format is 0.0 and 2nd decimal place rounds down");
	assert.equal($.ig.util.numberToString1(Math.PI, "00"), "03", "numberToString1 truncates all decimals and prepends leading 0 when format is 00 and number integral part has 1 digit");
	assert.equal($.ig.util.numberToString1(Math.PI, "00.00"), "03.14", "numberToString1 truncates to 2 decimal places and prepends leading 0 when format is 00.00 and number integral part has 1 digit and 3rd decimal place rounds down");
	assert.equal($.ig.util.numberToString1(Math.PI, "0.000"), "3.142", "numberToString1 rounds up when format is 0.000 and 4th decimal place rounds up");
	assert.equal($.ig.util.numberToString1(.1, "00.00"), "00.10", "numberToString1 prepends 2 leading 0s and appends 1 trailing 0 when format is 00.00 and number has 0 integral digits and 1 decimal digit");
	assert.equal($.ig.util.numberToString1(.1, "00.0#"), "00.1", "numberToString1 prepends 2 leading 0s and includes only significant decimal when format is 00.0# and number has 0 integral digits and 1 decimal digit");
	assert.equal($.ig.util.numberToString1(.19, "00.0#"), "00.19", "numberToString1 prepends 2 leading 0s and includes all significant decimals when format is 00.0# and number has 0 integral digits and 2 decimal digits");
	assert.equal($.ig.util.numberToString1(.1, "#"), "", "numberToString1 returns an empty string when format is # and number has 0 integral digits");
	assert.equal($.ig.util.numberToString1(1.1, "#"), "1", "numberToString1 truncates decimal portion when format is #");
	assert.equal($.ig.util.numberToString1(1.1, "0"), "1", "numberToString1 truncates decimal portion when format is 0");
	assert.equal($.ig.util.numberToString1(300, "0.#"), "300", "numberToString1 truncates decimal portion when format is 0.# and number has 0 decimal digits");
});

QUnit.test('[ID16] Test resetDateToCurrentDate', function (assert) {
	assert.expect(3);

	assert.equal($.ig.Date.prototype.resetDateToCurrentDate(new Date(10000000)).getDate(), new Date().getDate(),  "The date should be reset");
	assert.equal($.ig.Date.prototype.resetDateToCurrentDate(new Date(21/10/2007)).getDate(), new Date().getDate(),  "The date should be reset");
	assert.equal($.ig.Date.prototype.resetDateToCurrentDate(new Date(null)).getDate(), new Date().getDate(),  "The date should be reset");
});

QUnit.test("[ID17] Test getDate", function (assert) {
	assert.expect(29);
	var hoursArray = [ 1, 5 ];
	var hoursSuffix = [" - before", " - after"];
 
	for (var i = 0; i < hoursArray.length; i++) {
	 var hour = hoursArray[i];
	 var suffix = hoursSuffix[i];
 
	 // test some dst dates with a time after the change
	 assert.equal(0, $.ig.Date.prototype.getDate(new Date(2018, 2, 11, hour)).getHours(), "Hours of US daylight savings start" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getDate(new Date(2018, 2, 25, hour)).getHours(), "Hours 0f BG daylight savings start" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getDate(new Date(2018, 10, 11, hour)).getHours(), "Hours of US daylight savings end" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getDate(new Date(2018, 9, 28, hour)).getHours(), "Hours of BG daylight savings end" + suffix);
 
	 assert.equal(11, $.ig.Date.prototype.getDate(new Date(2018, 2, 11, hour)).getDate(), "getDate of US daylight savings start" + suffix);
	 assert.equal(25, $.ig.Date.prototype.getDate(new Date(2018, 2, 25, hour)).getDate(), "getDate of BG daylight savings start" + suffix);
	 assert.equal(11, $.ig.Date.prototype.getDate(new Date(2018, 10, 11, hour)).getDate(), "getDate of US daylight savings end" + suffix);
	 assert.equal(28, $.ig.Date.prototype.getDate(new Date(2018, 9, 28, hour)).getDate(), "getDate of BG daylight savings end" + suffix);
 
	 assert.equal(0, $.ig.Date.prototype.getTimeOfDay($.ig.Date.prototype.getDate(new Date(2018, 2, 11, hour))), "getTimeOfDay of US daylight savings start" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getTimeOfDay($.ig.Date.prototype.getDate(new Date(2018, 2, 25, hour))), "getTimeOfDay 0f BG daylight savings start" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getTimeOfDay($.ig.Date.prototype.getDate(new Date(2018, 10, 11, hour))), "getTimeOfDay of US daylight savings end" + suffix);
	 assert.equal(0, $.ig.Date.prototype.getTimeOfDay($.ig.Date.prototype.getDate(new Date(2018, 9, 28, hour))), "getTimeOfDay of BG daylight savings end" + suffix);
	}
 
	var dateWithTime = $.ig.Date.prototype.getDate(new Date(2018, 2, 11, 23, 25, 15, 19));
	assert.equal(0, dateWithTime.getHours(), "Hours of Date with time");
	assert.equal(0, dateWithTime.getMinutes(), "Minutes of Date with time");
	assert.equal(0, dateWithTime.getSeconds(), "Seconds of Date with time");
	assert.equal(0, dateWithTime.getMilliseconds(), "Milliseconds of Date with time");
	assert.equal(0, $.ig.Date.prototype.getTimeOfDay(dateWithTime), "getTimeOfDay of Date with time");
   });

QUnit.test("[ID18] Test stringSplit", function (assert) {
	assert.expect(70);

	assert.equal($.ig.util.stringSplit("", [","], $.ig.StringSplitOptions.prototype.none).toString(), "", "Empty String - Single Separator - None");
	assert.equal($.ig.util.stringSplit("", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Empty String - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abcd", [","], $.ig.StringSplitOptions.prototype.none).toString(), "abcd", "Plain String w/o Separators - Single Separator - None");
	assert.equal($.ig.util.stringSplit("abcd", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd", "Plain String w/o Separators - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("ab,cd", [","], $.ig.StringSplitOptions.prototype.none).toString(), "ab,cd", "String w/ One Separator - Single Separator - None");
	assert.equal($.ig.util.stringSplit("ab,cd", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "ab,cd", "String w/ One Separator - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("ab,,cd", [","], $.ig.StringSplitOptions.prototype.none).toString(), "ab,,cd", "String w/ Adjacent Separators - Single Separator - None");
	assert.equal($.ig.util.stringSplit("ab,,cd", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "ab,cd", "String w/ Adjacent Separators - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",abcd", [","], $.ig.StringSplitOptions.prototype.none).toString(), ",abcd", "String w/ Leading Separator - Single Separator - None");
	assert.equal($.ig.util.stringSplit(",abcd", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd", "String w/ Leading Separator - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abcd,", [","], $.ig.StringSplitOptions.prototype.none).toString(), "abcd,", "String w/ Trailing Separator - Single Separator - None");
	assert.equal($.ig.util.stringSplit("abcd,", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd", "String w/ Trailing Separator - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",", [","], $.ig.StringSplitOptions.prototype.none).toString(), ",", "Only Separators1 - Single Separator - None");
	assert.equal($.ig.util.stringSplit(",", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators1 - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",,", [","], $.ig.StringSplitOptions.prototype.none).toString(), ",,", "Only Separators2 - Single Separator - None");
	assert.equal($.ig.util.stringSplit(",,", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators2 - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",ab,,c,d", [","], $.ig.StringSplitOptions.prototype.none).toString(), ",ab,,c,d", "String w/ Lots of Separators - Single Separator - None");
	assert.equal($.ig.util.stringSplit(",ab,,c,d", [","], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "ab,c,d", "String w/ Lots of Separators - Single Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abcd", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), "abcd", "Plain String w/o Separators - Multiple Separators - None");
	assert.equal($.ig.util.stringSplit("abcd", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd", "Plain String w/o Separators - Multiple Separators - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("a,bc,d", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), "a,bc,d", "Plain String w Separator1 - Multiple Separators - None");
	assert.equal($.ig.util.stringSplit("a,bc,d", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "a,bc,d", "Plain String w Separator1 - Multiple Separators - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("a;bc;d", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), "a,bc,d", "Plain String w Separator2 - Multiple Separators - None");
	assert.equal($.ig.util.stringSplit("a;bc;d", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "a,bc,d", "Plain String w Separator2 - Multiple Separators - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("a;bc,d", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), "a,bc,d", "Plain String w Both Separators - Multiple Separators - None");
	assert.equal($.ig.util.stringSplit("a;bc,d", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "a,bc,d", "Plain String w Both Separators - Multiple Separators - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(";", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), ",", "Only Separators1 - Multiple Separator - None");
	assert.equal($.ig.util.stringSplit(";", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators1 - Multiple Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",;", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), ",,", "Only Separators2 - Multiple Separator - None");
	assert.equal($.ig.util.stringSplit(",;", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators2 - Multiple Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(";,", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), ",,", "Only Separators3 - Multiple Separator - None");
	assert.equal($.ig.util.stringSplit(";,", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators3 - Multiple Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), ",", "Only Separators4 - Multiple Separator - None");
	assert.equal($.ig.util.stringSplit(",", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators4 - Multiple Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(";,;,,", [",", ";"], $.ig.StringSplitOptions.prototype.none).toString(), ",,,,,", "Only Separators5 - Multiple Separator - None");
	assert.equal($.ig.util.stringSplit(";,;,,", [",", ";"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators5 - Multiple Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abcd", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), "abcd", "Plain String w/o Separators - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit("abcd", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd", "Plain String w/o Separators - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("ab,cd", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), "ab,cd", "String w/ One Separator - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit("ab,cd", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "ab,cd", "String w/ One Separator - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("ab,,cd", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), "ab,,cd", "String w/ Adjacent Separators - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit("ab,,cd", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "ab,,cd", "String w/ Adjacent Separators - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",abcd", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), ",abcd", "String w/ Leading Separator - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit(",abcd", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), ",abcd", "String w/ Leading Separator - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abcd,", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), "abcd,", "String w/ Trailing Separator - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit("abcd,", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abcd,", "String w/ Trailing Separator - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(",ab,,c,d", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), ",ab,,c,d", "String w/ Lots of Separators - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit(",ab,,c,d", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), ",ab,,c,d", "String w/ Lots of Separators - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(";3", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), ",", "Only Separators1 - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit(";3", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators1 - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(";3;3", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), ",,", "Only Separators2 - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit(";3;3", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "", "Only Separators2 - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("3;33;;;333", [";3"], $.ig.StringSplitOptions.prototype.none).toString(), "3,3;;,33", "Parts Of MultiChar Separator w/ Separators - MultiChar Separator - None");
	assert.equal($.ig.util.stringSplit("3;33;;;333", [";3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "3,3;;,33", "Parts Of MultiChar Separator w/ Separators - MultiChar Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("5|25|abc", ["|"], $.ig.StringSplitOptions.prototype.none).toString(), "5,25,abc", "Pipe Separator - None");
	assert.equal($.ig.util.stringSplit("5|25|abc", ["|"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "5,25,abc", "Pipe Separator - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("5.25", ["."], $.ig.StringSplitOptions.prototype.none).toString(), "5,25", "Period Separator1 - None");
	assert.equal($.ig.util.stringSplit("5.25", ["."], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "5,25", "Period Separator1 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("5.252.568,35", ["."], $.ig.StringSplitOptions.prototype.none).toString(), "5,252,568,35", "Period Separator2 - None");
	assert.equal($.ig.util.stringSplit("5.252.568,35", ["."], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "5,252,568,35", "Period Separator2 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(".5.252..568,35..", ["."], $.ig.StringSplitOptions.prototype.none).toString(), ",5,252,,568,35,,", "Period Separator3 - None");
	assert.equal($.ig.util.stringSplit(".5.252..568,35..", ["."], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "5,252,568,35", "Period Separator3 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("5,45.3|35;3", [".", " ", "|3"], $.ig.StringSplitOptions.prototype.none).toString(), "5,45,3,5;3", "Other Examples 1 - None");
	assert.equal($.ig.util.stringSplit("5,45.3|35;3", [".", " ", "|3"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "5,45,3,5;3", "Other Examples 1 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit(" some white space around words", [" "], $.ig.StringSplitOptions.prototype.none).toString(), ",some,white,space,around,words", "Other Examples 2 - None");
	assert.equal($.ig.util.stringSplit(" some white space around words", [" "], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "some,white,space,around,words", "Other Examples 2 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("abc	123	xyz", ["	"], $.ig.StringSplitOptions.prototype.none).toString(), "abc,123,xyz", "Other Examples 3 - None");
	assert.equal($.ig.util.stringSplit("abc	123	xyz", ["	"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "abc,123,xyz", "Other Examples 3 - RemoveEmptyEntries");
	assert.equal($.ig.util.stringSplit("This is easy. So is this.", [".", " ", "!", ">"], $.ig.StringSplitOptions.prototype.none).toString(), "This,is,easy,,So,is,this,", "Other Examples 4 - None");
	assert.equal($.ig.util.stringSplit("This is easy. So is this.", [".", " ", "!", ">"], $.ig.StringSplitOptions.prototype.removeEmptyEntries).toString(), "This,is,easy,So,is,this", "Other Examples 4 - RemoveEmptyEntries");
   });

QUnit.test('[ID19] Test arrayCopy1', function (assert) {
	assert.expect(4);

	var arr = [0,2,3,4,5];
	$.ig.util.arrayCopy1(arr, 1, arr, 0, 4);
	assert.deepEqual(arr, [2,3,4,5,5], "Move content forwards within same array");

	arr = [2,3,4,5,0];
	$.ig.util.arrayCopy1(arr, 0, arr, 1, 4);
	assert.deepEqual(arr, [2,2,3,4,5], "Move content back within the same array");

	arr = [1,2,3,4,5];
	var target = [6,7,8,9,10];
	$.ig.util.arrayCopy1(arr, 1, target, 0, 4);
	assert.deepEqual(target, [2,3,4,5,10], "Copy content to the beginning of another array");

	target = [6,7,8,9,10];
	$.ig.util.arrayCopy1(arr, 0, target, 1, 4);
	assert.deepEqual(target, [6,1,2,3,4], "Copy content to the end of another array");
});