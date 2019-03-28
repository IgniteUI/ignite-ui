QUnit.module("igTemplating", {
	before: function() {
		window.data1 = {
			Template: 'Success'
		};
		window.data2 = [
			{ Text: 'Item 1', Value: 1, Cond: false },
			{ Text: 'Item 2', Value: 2, Cond: true },
			{ Text: 'Item 3', Value: 3, Cond: false }
		];
		window.points = [
			{ point: { x: 1, y: 1 } },
			{ point: { x: 2, y: 2 } },
			{ point: { x: 3, y: 3 } },
			{ point: { x: 4, y: 4 } },
			{ point: { x: 5, y: 5 } },
			{ point: { x: 6, y: 6 } },
			{ point: { x: 7, y: 7 } },
			{ point: { x: 8, y: 8 } },
			{ point: { x: 9, y: 9 } }
		];
		window.data3 = [
			{ point: [
				{x: 1, y: 1},
				{x: 2, y: 2},
			]},
			{ point: [
				{x: '1a', y: '1a'},
				{x: '2a', y: '2a'},
			]}
		];
		window.function1 = function () {
			return data1;
		};
		window.function2 = function (index) {
			if (!index) {
				return data2;
			} else if (index > 2) {
				return data1;
			} else {
				return data2[index];
			}
		};
	},
	after: function() {
		delete window.data1;
		delete window.data2;
		delete window.points;
		delete window.data3;
		delete window.function1;
		delete window.function2 ;
	}
});

var testId1 = "igTemplating script loaded and $.ig fully defined",
	testId2 = "igTemplating comments recognition and removal",
	testId3 = "igTemplating data substitution and invalid template handling",
	testId4 = "igTemplating $i index recognition",
	testId5 = "igTemplating directives recognition {{if/else}}",
	testId6 = "igTemplating directives recognition {{each}}",
	testId7 = "igTemplating retrieving data with '.' e.g. ${Data.Product}",
	testId8 = "igTemplating encoding data",
	testId9 = "igTemplating nested {{if}} blocks",
	testId10 = "igTemplating combining content and blocks",
	testId11 = "igTemplating Bug #102102",
	testId12 = "igTemplating $data and $index inside each",
	testId13 = "igTemplating $0 inside string.replace",
	testId14 = "igTemplating internal template caching and internal errors",
	testId15 = "igTemplating prop with $ in the name",
	testId16 = "igTemplating sequential {{each}}",
	testId17 = "igTemplating properties with spaces",
	testId18 = "igTemplating resolving methods",
	testId19 = "igTemplating handling objects with 'length' property",
	testId20 = "igTemplating properties with dashes";

QUnit.test(testId1, function (assert) {
	assert.expect(7);
	assert.ok($.ig, '$.ig is undefined');
	assert.ok($.ig.regExp, '$.ig.regExp object is undefined');
	assert.equal(typeof $.ig.regExp, 'object', 'Type of $.ig.regExp is not an object');
	assert.ok($.ig._directives, '$.ig.directives object is undefined');
	assert.equal(typeof $.ig._directives, 'object', 'Type of $.ig.directives is not an object');
	assert.ok($.ig.tmpl, '$.ig.tmpl function is undefined');
	assert.equal(typeof $.ig.tmpl, 'function', 'Type of $.ig.tmpl is not a function');
});

QUnit.test(testId2, function (assert) {
	assert.expect(3);
	var tmpl1 = '<div #Some comment#>Test # Comment goes in here # </div>',
		tmpl = '<a href="#">${Template}</a><a href="#"></a>',
		tmpl2 = '<a href="#">Nothing should be replaced</a><a href="#">yeah?</a>',
		result1 = $.ig.tmpl(tmpl1, data1),
		result = $.ig.tmpl(tmpl, data1),
		result2 = $.ig.tmpl(tmpl2, data1);
	assert.equal(result2, '<a href="#">Nothing should be replaced</a><a href="#">yeah?</a>', 'Templating handled incorrectly a no template string.');
	assert.equal(result1, '<div>Test </div>', 'Comment was not correctly removed from the template');
	assert.equal(result, '<a href="#">Success</a><a href="#"></a>', 'Comment was not correctly removed from the template');
});

QUnit.test(testId3, function (assert) {
	assert.expect(7);
	var tmpl1 = 'invalid ${Template}',
		tmpl2 = '<div id="${ID}">${Template} valid</div>',
		tmpl5 = '<img src="${Template}" />',
		tmpl3 = '<span id="${Value}">${Text}</span>',
		tmpl4 = '<li id="${Value}"><img src="${ImageUrl}" /><a href="${NavigateUrl}">${Text}</a></li>',
		result1 = $.ig.tmpl(tmpl1, data1),
		result2 = $.ig.tmpl(tmpl2, data1),
		result3 = $.ig.tmpl(tmpl1, function1),
		result4 = $.ig.tmpl(tmpl2, function1),
		result5 = $.ig.tmpl(tmpl2, function2, [3]),
		result6 = $.ig.tmpl(tmpl3, data2),
		result7 = $.ig.tmpl(tmpl5, data1);
	assert.equal(result1, 'invalid Success', 'Invalid template was handled wrong by the templating engine');
	assert.equal(result2, '<div id="">Success valid</div>', 'Template is incorrectly handled by the engine');
	assert.equal(result3, 'invalid Success', 'Invalid template was handled wrong by the templating engine');
	assert.equal(result4, '<div id="">Success valid</div>', 'Template is incorrectly handled by the engine');
	assert.equal(result5, '<div id="">Success valid</div>', 'Template is incorrectly handled by the engine');
	assert.equal(result6, '<span id="1">Item 1</span><span id="2">Item 2</span><span id="3">Item 3</span>', 'Template is incorrectly handled by the engine');
	assert.equal(result7, '<img src="Success" />', 'Template is incorrectly handled by the engine');
});

QUnit.test(testId4, function (assert) {
	assert.expect(1);
	var tmpl = '<span id="${Value}">$i: ${Text}</span>',
		result = $.ig.tmpl(tmpl, data2);
	assert.equal(result, '<span id="1">0: Item 1</span><span id="2">1: Item 2</span><span id="3">2: Item 3</span>', 'Template is incorrectly handled by the engine');
});

QUnit.test(testId5, function (assert) {
	assert.expect(5);
	var tmpl = '{{if $i % 2 === 0}}<span id="${Value}" class="ui-even">${Text}</span>{{else}}<span id="${Value}" class="ui-odd">${Text}</span>{{/if}}',
		tmpl1 = '{{if true}}<span class="ui-even">${Template}</span>{{/if}}',
		tmpl2 = '{{if ${Cond} }}${Value}{{elseif ${Value} == 3}}${Text}{{else}}Testing{{/if}}',
		tmpl3 = '{{if ${Field} }}${Field.Value1} > ${Field.Value2}{{elseif ${Field2} }}${Field2.Value3}{{/if}}',
		result = $.ig.tmpl(tmpl, data2),
		result1 = $.ig.tmpl(tmpl1, data1),
		result2 = $.ig.tmpl(tmpl2, function2);
		result3 = $.ig.tmpl(tmpl3, [{ Field: { Value1: 1, Value2: 0 }, Field2: null }, { Field: null, Field2: { Value3: 'a' } }]);
	assert.ok($.ig.regExp.block.test(tmpl), 'Block regular expression did not match if-else block');
	assert.equal(result, '<span id="1" class="ui-even">Item 1</span><span id="2" class="ui-odd">Item 2</span><span id="3" class="ui-even">Item 3</span>', 'Iterative If-else directive was not correctly handled by the templating engine');
	assert.equal(result1, '<span class="ui-even">Success</span>', 'Non iterative if-else failed.');
	assert.equal(result2, 'Testing2Item 3', 'If-elseif-else conditional failed.');
	assert.equal(result3, '1 > 0a', 'Null or undefined check for properties failed.');
});

QUnit.test(testId7, function (assert) {
	assert.expect(2);
	var tmpl = "<li>X: ${point.x}, Y: ${point.y}</li>",
		result = $.ig.tmpl(tmpl, points);
	assert.equal(result, '<li>X: 1, Y: 1</li><li>X: 2, Y: 2</li><li>X: 3, Y: 3</li><li>X: 4, Y: 4</li><li>X: 5, Y: 5</li><li>X: 6, Y: 6</li><li>X: 7, Y: 7</li><li>X: 8, Y: 8</li><li>X: 9, Y: 9</li>', 'Each directive templating failed.');
	var tmpl1 = '{{if ${point.x} == 1}}${point.y}{{/if}}',
		result = $.ig.tmpl(tmpl1, points);
	assert.equal(result, 1, 'The result did not match');
});

QUnit.test(testId6, function (assert) {
	assert.expect(2);
	var tmpl = "{{each ${point} }}<li>X: ${point.x}, Y: ${point.y}</li>{{/each}}",
		result = $.ig.tmpl(tmpl, data3),
		tmpl1 = "{{each ${point}}}<li>X: ${point.x}, Y: ${point.y}</li>{{/each}}",
		result1 = $.ig.tmpl(tmpl1, data3);

	assert.equal(result, '<li>X: 1, Y: 1</li><li>X: 2, Y: 2</li><li>X: 1a, Y: 1a</li><li>X: 2a, Y: 2a</li>', 'Each directive templating failed.');
	assert.equal(result1, '<li>X: 1, Y: 1</li><li>X: 2, Y: 2</li><li>X: 1a, Y: 1a</li><li>X: 2a, Y: 2a</li>', 'Each directive templating failed.');
});

QUnit.test(testId8, function (assert) {
	assert.expect(4);
	var encodeData = [
		{ html: '<div>Item 1&</div>' },
		{ html: '<div>Item 2&</div>' },
		{ html: '<div>Item 3&</div>' }
	];
	var tmpl = '${html}', result = $.ig.tmpl(tmpl, encodeData), tmpl2 = '{{html html}}', result1 = $.ig.tmpl(tmpl2, encodeData);
	assert.equal(result, "&lt;div&gt;Item 1&amp;&lt;/div&gt;&lt;div&gt;Item 2&amp;&lt;/div&gt;&lt;div&gt;Item 3&amp;&lt;/div&gt;", 'The result did not get encoded');
	assert.equal(result1, '<div>Item 1&</div><div>Item 2&</div><div>Item 3&</div>', 'Non-encode properties did not yield correct results');

	var encodeComplexData = [
		{ html: { html: '<div>Item 1&</div>'} },
		{ html: { html: '<div>Item 2&</div>'} },
		{ html: { html: '<div>Item 3&</div>'} }
	];
	tmpl = '${html.html}';
	result = $.ig.tmpl(tmpl, encodeComplexData);
	tmpl2 = '{{html html.html}}';
	result1 = $.ig.tmpl(tmpl2, encodeComplexData);
	assert.equal(result, "&lt;div&gt;Item 1&amp;&lt;/div&gt;&lt;div&gt;Item 2&amp;&lt;/div&gt;&lt;div&gt;Item 3&amp;&lt;/div&gt;", 'The result did not get encoded');
	assert.equal(result1, '<div>Item 1&</div><div>Item 2&</div><div>Item 3&</div>', 'Non-encode properties did not yield correct results');
});

QUnit.test(testId9, function (assert) {
	assert.expect(1);
	var nestedData = [
		{prop1: 0, prop2: 1, prop3: 2},
		{prop1: '00', prop2: 10, prop3: 20},
		{prop1: '000', prop2: 100, prop3: 200}
	];
	var tmpl = '{{if ${prop1} !== 0}}{{if ${prop2} !== 100}}Value: ${prop3}{{else}}Value: ${prop2}{{/if}}{{else}}Value: ${prop1}{{/if}}',
		result = $.ig.tmpl(tmpl, nestedData);

	assert.equal(result, "Value: 0Value: 20Value: 100", 'Nested conditionals were not handled correctly.');
});

QUnit.test(testId10, function (assert) {
	assert.expect(1);
	var tmpl = '<tr id="${Value}">{{if ${Cond} }}<td>Text: ${Text}</td>{{else}}<td>&nbsp;</td>{{/if}}</tr>',
		result = $.ig.tmpl(tmpl, data2);

	assert.equal(result, '<tr id="1"><td>&nbsp;</td></tr><tr id="2"><td>Text: Item 2</td></tr><tr id="3"><td>&nbsp;</td></tr>' , 'Combining content with blocks was not handled correctly by the templating engine.');
});

QUnit.test(testId11, function (assert) {
	assert.expect(2);
	var tmpl = '{{if ${Value} == 1}} ${Value} {{/if}}',
		result = $.ig.tmpl(tmpl, data2),
		tmpl1 = '{{if ${Value}== 1}} ${Value}{{/if}}'
		result1 = $.ig.tmpl(tmpl1, data2);

	assert.equal(result, ' 1 ');
	assert.equal(result1, ' 1');
});

QUnit.test(testId12, function (assert) {
	assert.expect(1);
	var tmpl = '<ul>{{each ${entries}}}<li>$index: $data</li>{{/each}}</ul>',
		entry = [{ entries: [1, 2, 3, 4]}],
		result = $.ig.tmpl(tmpl, entry);

	assert.equal(result, '<ul><li>0: 1</li><li>1: 2</li><li>2: 3</li><li>3: 4</li></ul>', '$data and $index were not evaluated correctly by the templating engine.');
});

QUnit.test(testId13, function (assert) {
	assert.expect(3);
	var tmpl = '<div>${entries}</div>',
		entry = [{ entries: '$0'}],
		result = $.ig.tmpl(tmpl, entry),
		entry1 = [{ entries: '$0'}, { entries: '$0'}, { entries: '$0'}],
		result1 = $.ig.tmpl(tmpl, entry1);

	assert.ok($.ig._internalTmplCache.hasOwnProperty(tmpl), 'The template was not cached');
	assert.equal(result, '<div>$0</div>', 'The string.replace parameterized $0.');
	assert.equal(result1, '<div>$0</div><div>$0</div><div>$0</div>', 'The string.replace parameterized $0 in an array.');
});

QUnit.test(testId14, function (assert) {
	assert.expect(5);
	// Internal caching with loop through the data
	var tmpl = '<span id="${Value}" data-src="${NavigateUrl}">${Text}</span>', result, result1,
		tmpl1 = '{{if ${Value} === "boom"}} ${Text} {{/if}}';

	var d1 = new Date();
	result = $.ig.tmpl(tmpl, DB2);
	result1 = $.ig.tmpl(tmpl, DB2);
	assert.equal(result, result1, 'The two results differ');
	assert.ok($.ig._internalTmplCache.hasOwnProperty(tmpl), 'The template was not cached');
	$.ig.clearTmplCache();
	var count = 0;
	for (prop in $.ig._internalTmplCache) {
		if ($.ig._internalTmplCache.hasOwnProperty(prop)) {
			count++;
		}
	}
	assert.equal(count, 0, 'The cache was not properly cleared.');
	// Internal errors
	var data = { Text: '' };
	assert.throws(function () {$.ig.tmpl(tmpl1, data);}, function (err) { return err.message === $.ig.Templating.locale.undefinedArgument + '${Value}'; }, 'An error was not correctly thrown when having an undefined prop.');
	data = [{ Text: '' },{ Text: '' }];
	assert.throws(function () {$.ig.tmpl(tmpl1, data);}, function (err) { return err.message === $.ig.Templating.locale.undefinedArgument + '${Value}'; }, 'An error was not correctly thrown when having an undefined prop.');
});

QUnit.test(testId15, function (assert) {
	assert.expect(1);
	var tmpl = '${Value$0}',
		data = { Value$0: 1 },
		result = $.ig.tmpl(tmpl, data);

	assert.equal(result, '1', 'Property with "$" in the name was not correctly evaluated.');
});

QUnit.test(testId16, function (assert) {
	assert.expect(1);
	var tmpl = '<div><ul>{{each ${prop1} }}<li>${prop1.subprop1}</li>{{/each}}</ul>' +
				'<div>{{each ${prop2} }}<span>${prop2.subprop1}</span>{{/each}}</div>' +
				'<ul>{{each ${prop1} }}<li>${prop1.subprop2}</li>{{/each}}</ul></div>',
		data = {
			prop1: [
				{ subprop1: 1, subprop2: 'a' },
				{ subprop1: 2, subprop2: 'b' },
				{ subprop1: 3, subprop2: 'c' },
				{ subprop1: 4, subprop2: 'd' }
			],
			prop2: [
				{ subprop1: 'asd'},
				{ subprop1: 'qwe'},
				{ subprop1: 'zxc'}
			]
		},
		result = $.ig.tmpl(tmpl, data);
	assert.equal(result, '<div><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>' +
				'<div><span>asd</span><span>qwe</span><span>zxc</span></div>' +
				'<ul><li>a</li><li>b</li><li>c</li><li>d</li></ul></div>',
				'Sequential {{each}} blocks were not evaluated correctly.');
});

QUnit.test(testId17, function (assert) {
	assert.expect(1);
	var tmpl = '<div><span>${Prop 1}</span><span>{{html Prop 2}}</span></div>',
		data = {
			"Prop 1": 'test',
			"Prop 2": '<p>test</p>'
		},
		result = $.ig.tmpl(tmpl, data);
	assert.equal(result, '<div><span>test</span><span><p>test</p></span></div>', 'The properties with spaces were not correctly read');
});

QUnit.test(testId18, function (assert) {
	assert.expect(2);
	var tmpl = '<div><span>${Prop 1}</span><span>{{html Prop 2}}</span><span>${prop.prop1}</span><span>{{html prop.prop2}}</span></div>',
		data = {
			"Prop 1": function () {
				return 1;
			},
			"Prop 2": function () {
				return "<p>1</p>";
			},
			prop: function () {
				return {
					prop1: function () { return "prop1 value"; },
					prop2: function () { return "<p>prop2 value</p>"; }
				};
			}
		}, data2 = [{
				"Prop 1": function () {
					return 1;
				},
				"Prop 2": function () {
					return "<p>1</p>";
				},
				prop: function () {
					return {
						prop1: function () { return "prop1 value"; },
						prop2: function () { return "<p>prop2 value</p>"; }
					};
				}
			}, {
				"Prop 1": function () {
					return 2;
				},
				"Prop 2": function () {
					return "<p>2</p>";
				},
				prop: function () {
					return {
						prop1: function () { return "prop1 value 2"; },
						prop2: function () { return "<p>prop2 value 2</p>"; }
					};
				}
			}
		];
	assert.equal($.ig.tmpl(tmpl, data), '<div><span>1</span><span><p>1</p></span><span>prop1 value</span><span><p>prop2 value</p></span></div>', 'The properties which are functions were not correctly read');
	assert.equal($.ig.tmpl(tmpl, data2), '<div><span>1</span><span><p>1</p></span><span>prop1 value</span><span><p>prop2 value</p></span></div><div><span>2</span><span><p>2</p></span><span>prop1 value 2</span><span><p>prop2 value 2</p></span></div>', 'The properties which are functions were not correctly read');
});

QUnit.test(testId19, function (assert) {
	assert.expect(1);
	var tmpl = '<div>${length}</div>',
		data = [
			{ "Name": "John Smith", "Age": 45, "length":1 },
			{ "Name": "Mary Johnson", "Age": 32 , "length":1 },
			{ "Name": "Bob Ferguson", "Age": 27 , "length":1 }
		],
		result = $.ig.tmpl(tmpl, data);
	assert.equal(result, '<div>1</div><div>1</div><div>1</div>', 'The properties with spaces were not correctly read');
});

QUnit.test(testId20, function (assert) {
	assert.expect(1);
	var tmpl = '<div><span>${Prop-1}</span><span>{{html Prop-2}}</span><span>${Prop-3.Prop-4}</span><span>{{html Prop-3.prop-5}}</span></div>',
		data = {
			"Prop-1": 'test',
			"Prop-2": '<p>test</p>',
			"Prop-3": {
				"Prop-4": "test",
				"prop-5": '<p>test</p>'
			}
		},
		result = $.ig.tmpl(tmpl, data);
	assert.equal(result, '<div><span>test</span><span><p>test</p></span><span>test</span><span><p>test</p></span></div>', 'The properties with spaces were not correctly read');
});
