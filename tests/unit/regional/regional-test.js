QUnit.module("Runtime regional changes unit tests", {
	inputTag: '<input></input>',
	comboDates : [
		{ ID: 1, HireDate: new Date ("08/01/2017") },
		{ ID: 2, HireDate: new Date ("08/15/2017") },
		{ ID: 3, HireDate: new Date ("12/23/2013") },
		{ ID: 4, HireDate: new Date ("04/14/2010") },
		{ ID: 5, HireDate: new Date ("12/10/2013") },
		{ ID: 6, HireDate: new Date ("05/13/2012") },
		{ ID: 7, HireDate: new Date ("02/11/2013") },
		{ ID: 8, HireDate: new Date ("03/29/2010") },
		{ ID: 9, HireDate: new Date ("06/13/2016") }
	],
	comboNumbers : [
		{ ID: 1, Salary: 2600 },
		{ ID: 2, Salary: 600 },
		{ ID: 3, Salary: 300 },
		{ ID: 4, Salary: 800 },
		{ ID: 5, Salary: 5000 },
		{ ID: 6, Salary: 1500 },
		{ ID: 7, Salary: 5000 },
		{ ID: 8, Salary: 3500 },
		{ ID: 9, Salary: 200 }
	],
	afterEach: function () { 
		$.fx.off = false;
		if($.ig.util.regional){
			$.ig.util.changeGlobalRegional('');
		}
	 }
});

QUnit.test('[ID1] Loading correct regional in combo for date field', function (assert) {
	assert.expect(3);

	var combo = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "comboDateRegional" });
	combo.igCombo({
		dataSource: this.comboDates,
		format : "dateLong",
		textKey: 'HireDate',
		valueKey: 'ID',
		regional: "de"
	});

	assert.ok(combo.igCombo("items")[0].element.text() == "Dienstag, 1. August 2017", "Date field should be with german regional settings");
	combo.igCombo("option", "regional", "bg");
	assert.ok(combo.igCombo("items")[0].element.text() == "01 Август 2017 г.", "Date field should be with bulgarian regional settings");
	combo.igCombo("option", "regional", "ja");
	assert.ok(combo.igCombo("items")[0].element.text() == "2017年8月1日", "Date field should be with japanese regional settings");
});

QUnit.test('[ID2] Loading correct regional in combo for numeric field', function (assert) {
	assert.expect(3);

	var combo = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "comboNumericRegional" });
	combo.igCombo({
		dataSource: this.comboNumbers,
		format : "currency",
		textKey: 'Salary',
		valueKey: 'ID'
	});
	assert.ok(combo.igCombo("items")[0].element.text() == "$2,600.00", "Numeric field should be with default regional settings");
	combo.igCombo("option", "regional", "bg");
	assert.ok(combo.igCombo("items")[0].element.text() == "2 600,00 лв", "Numeric field should be with bulgarian regional settings");
	combo.igCombo("option", "regional", "ja");
	assert.ok(combo.igCombo("items")[0].element.text() == "¥2,600", "Numeric field should be with japanese regional settings");
});

QUnit.test('[ID3] Loading correct regional in combo when changing global regional', function (assert) {
	assert.expect(2);

	var dateCombo = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "comboDateRegional" }),
		numericCombo = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "comboNumericRegional" });

	dateCombo.igCombo({
		dataSource: this.comboDates,
		format : "dateLong",
		textKey: 'HireDate',
		valueKey: 'ID',
		regional: "de"
	});
	numericCombo.igCombo({
		dataSource: this.comboNumbers,
		format : "currency",
		textKey: 'Salary',
		valueKey: 'ID'
	});

	dateCombo.data("igCombo")._userPreset.regional = null;
	numericCombo.data("igCombo")._userPreset.regional = null;
	$.ig.util.changeGlobalRegional("fr");
	assert.ok(dateCombo.igCombo("items")[0].element.text() == "Mardi 1 Août 2017", "Date field should be with french regional settings");
	assert.ok(numericCombo.igCombo("items")[0].element.text() == "2 600,00 €", "Numeric field should be with french regional settings");
});
