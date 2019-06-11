QUnit.module("igSplitter common", {
	divTag: '<div></div>',
	divLoremIpsum: '<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>',
	divLoremIpsumAuto: '<div style="overflow: auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>',
	divIFrame: '<div><iframe></iframe></div>',
	util: $.ig.TestUtil,
	assert: QUnit.assert,
	equalSplitter: function(val1, val2) {
		return Math.abs(val1 - val2) < 3;
	},
	mainContainerCheckClasses: function(container) {
		this.util.checkClass(container, 'ui-igsplitter');
		this.util.checkClass(container, 'ui-widget');
		this.util.checkClass(container, 'ui-widget-content');
	},
	panelContainerCheckClasses: function(panel, orientation) {
		this.util.checkClass(panel, orientation);
		this.util.checkClass(panel, 'ui-widget-content');
	},
	initSplitter: function($splitter, options) {
		if (!options.childElements) {
			var numberOfDivs = options.numberOfDivs !== undefined ? options.numberOfDivs : 2;

			for (var i = 0; i < numberOfDivs; i++) {
				$(this.divLoremIpsum).appendTo($splitter);
			}
		} else {
			for (var i = 0; i < options.childElements.length; i++) {
				$(options.childElements[i]).appendTo($splitter);
			}
		}

		$splitter.igSplitter(options);
	},

	/************************************************************************************************************************************************
	// The addSplitter method generates the required html and intializes an igSplitter with the provided options.
	// By default it would create the following html:
	// <div id="splitterID">
	// 		<div>
	// 			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	// 		</div>
	// 		<div>
	// 			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	// 		</div>
	// </div>
	// And it will call .igSplitter(options) on the main div.
	// There are several ways to cutomize the generated html and you can specify them by adding more fields to your options method (see the tests for examples).
	// ID: the splitterID. By setting this you can just call the method with only options object (I only use it that way throughout the tests).
	// parentID: the ID of the parent element. If left uspecified the parent will be the 'qunit-fixture' div provided by the framework.
	// childElements: the child elements of the main div. If unspecified there will be two divs with Lorem Ipsum text and no attributes.
	// numberOfDivs: the number of child elements that will be added to the main div. These will always be standard div with Lorem Ipsum text. This will have no effect if childElements array is provided.
	// childOptions: an array with options object, so that you can create nested splitters.
	// Feel free to extend/modify this however you see fit.
	************************************************************************************************************************************************/
	addSplitter: function(splitterID, options) {
		if(typeof splitterID !== 'string' && splitterID !== undefined) {
			// You can just pass an options object that has an ID field.
			this.addSplitter(splitterID.ID, splitterID);
		} else if(splitterID) {
			if(!options.parentID) {
				this.util.appendToFixture(this.divTag, { id: splitterID });

				if(!options.childOptions) {
					this.initSplitter($("#" + splitterID), options);
				}

			} else {
				var $parentSplitter = $("#" + options.parentID);

				$(this.divTag, {id: splitterID}).appendTo($parentSplitter);
				this.initSplitter($("#" + splitterID), options);
			}

			if(options.childOptions) {
				for(var i = 0; i < options.childOptions.length; i++) {
					options.childOptions[i].parentID = splitterID;
					this.addSplitter(options.childOptions[i]);
				}

				$("#" + splitterID).igSplitter(options);
			}
		}
	},
	setterWidthAsserts: function(selector, expectedWidth, expectedFirstWidth, expectedSecondWidth) {
		var actualFirstWidth, actualSecondWidth, actualWidth;

		actualFirstWidth = $(selector).igSplitter('firstPanel').width();
		actualSecondWidth = $(selector).igSplitter('secondPanel').width();
		actualWidth = $(selector).igSplitter('option', 'width');

		this.assert.ok(this.equalSplitter(actualWidth, expectedWidth), "Splitter width \nActual: " + actualWidth+ "\nExpected: " + expectedWidth);
		this.assert.ok(this.equalSplitter(actualFirstWidth, expectedFirstWidth), "First panel width \nActual: " + actualFirstWidth + "\nExtepcted: "+ expectedFirstWidth);
		this.assert.ok(this.equalSplitter(actualSecondWidth, expectedSecondWidth), "Second panel width \nActual: " + actualSecondWidth + "\nExtepcted: "+ expectedSecondWidth);
	},
	setterHeightAsserts: function(selector, expectedHeight, expectedFirstHeight, expectedSecondHeight) {
		var actualFirstHeight, actualSecondHeight, actualHeight;

		actualHeight = $(selector).igSplitter('option', 'height');
		actualFirstHeight = $(selector).igSplitter('firstPanel').height();
		actualSecondHeight = $(selector).igSplitter('secondPanel').height();

		this.assert.ok(this.equalSplitter(actualHeight, expectedHeight), "Splitter height \nActual: "+ actualHeight +"\nExpected: " + expectedHeight);
		this.assert.ok(this.equalSplitter(actualFirstHeight, expectedFirstHeight), "First panel height \nActual: " + actualFirstHeight + "\nExpected: " + expectedFirstHeight);
		this.assert.ok(this.equalSplitter(actualSecondHeight, expectedSecondHeight), "Second panel height \nActual: " + actualSecondHeight + "\nExpected: " + expectedSecondHeight);
	}
});

QUnit.test('Test 1: igSplitter script loaded test.', function(assert){
	assert.expect(2);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'sVer'
	};
	this.addSplitter(options);
	var container = $("#sVer");

	assert.ok(typeof container.igSplitter === 'function', "igSplitter script is not loaded");
	assert.ok(container.length > 0, 'igSplitter did not initialize');
});

QUnit.test('Test 2: igSplitter widget vertical rendering test.', function (assert) {
	assert.expect(26);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'sVer'
	};
	this.addSplitter(options);
	var container = $('#sVer'), children = null, panel = null, widths = [];

	widths[0] = 400;
	widths[1] = 4;
	widths[2] = 194;

	this.mainContainerCheckClasses(container);

	assert.ok(this.equalSplitter(container.width(), 600), 'igSplitter container has width. Expected: 600 Actual: ' + container.width());
	assert.ok(this.equalSplitter(container.height(), 480), 'igSplitter container has height. Expected: 480 Actual: ' + container.height());

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-vertical');
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-default');

			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter bar has wrong width. Expected: ' + widths[i] + ' Actual: ' + panel.width());
			assert.ok(panel.css("float") === "left", 'igSplitter bar has wrong float.');
			assert.ok(this.equalSplitter(panel.height(), 478), 'igSplitter bar has wrong height.');

			var buttonLeft = $(panel.children()[0]);
			var buttonRight = $(panel.children()[1]);

			this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-vertical-left');
			this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-w');
			this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-vertical-right');
			this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');

			assert.ok(buttonLeft.css("position") === "relative", 'igSplitter buttonLeft has wrong postion.');
			assert.ok(buttonRight.css("position") === "relative", 'igSplitter bar has wrong postion.');
		} else {
			this.panelContainerCheckClasses(panel, 'ui-igsplitter-panel-vertical');

			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter panel has wrong width.');
			assert.ok(panel.css("float") === "left", 'igSplitter panel has wrong float.');
			assert.ok(this.equalSplitter(panel.height(), 480), 'igSplitter panel has wrong height.');
		}
	}
});

QUnit.test('Test 3: igSplitter widget horizontal rendering test.', function (assert) {
	assert.expect(25);
	var options = {
		width: 600,
		height: 400,
		orientation: 'horizontal',
		panels: [
			{ size: 100, collapsible: true },
			{ size: 300, collapsible: true }
		],
		ID: 'sHor'
	};
	this.addSplitter(options);
	var container = $('#sHor'), children = null, panel = null, heights = [];

	heights[0] = 100;
	heights[1] = 4;
	heights[2] = 294;

	this.mainContainerCheckClasses(container);

	assert.ok(this.equalSplitter(container.width(), 600), 'igSplitter wrong container width.');
	assert.ok(this.equalSplitter(container.height(), 400), 'igSplitter wrong container height.');

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-horizontal ui-igsplitter-splitbar-default');

			assert.ok(this.equalSplitter(panel.height(), heights[i]), 'igSplitter bar has wrong height.');
			assert.ok(panel.css("float") === "none", 'igSplitter bar has wrong float.');
			assert.ok(this.equalSplitter(panel.width(), 598), 'igSplitter bar has wrong width.');

			var buttonLeft = $(panel.children()[0]);
			var buttonRight = $(panel.children()[1]);

			this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-horizontal-left');
			this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-n');
			this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-horizontal-right');
			this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-s');

			assert.ok(buttonLeft.css("position") === "relative", 'igSplitter buttonLeft has wrong postion.');
			assert.ok(buttonRight.css("position") === "relative", 'igSplitter buttonRight has wrong postion.');
		} else {
			this.panelContainerCheckClasses(panel, 'ui-igsplitter-panel-horizontal');

			assert.ok(panel.height() === heights[i], 'igSplitter panel has wrong height.');
			assert.ok(panel.css("float") === "none", 'igSplitter panel has wrong float.');
			assert.ok(this.equalSplitter(panel.width(), 600), 'igSplitter panel has wrong width.');
		}
	}
});

QUnit.test('Test 4: igSplitter widget destroying test.', function (assert) {
	assert.expect(18);
	var options = {
		width: 600,
		height: 400,
		orientation: 'horizontal',
		panels: [
			{ size: 100, collapsible: true },
			{ size: 300, collapsible: true }
		],
		ID: 'sDestroyed'
	};
	this.addSplitter(options);
	var container = $('#sDestroyed');

	this.mainContainerCheckClasses(container);

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-horizontal');
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-default');

			var buttonLeft = $(panel.children()[0]);
			var buttonRight = $(panel.children()[1]);

			this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-horizontal-left');
			this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-n');
			this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-horizontal-right');
			this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-s');
		} else {
			this.panelContainerCheckClasses(panel, 'ui-igsplitter-panel-horizontal');
		}
	}

	container.igSplitter('destroy');

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, '');
			this.util.checkClass(panel, '');

			assert.ok(panel.children().length === 0, 'igSplitter button not removed.');
		} else {
			this.util.checkClass(panel, '');
			this.util.checkClass(panel, '');
		}
	}
});

QUnit.test('Test 5: igSplitter widget nesting test.', function (assert) {
	assert.expect(39);
	var verticalInnerOptions = {
		width: 400,
		height: 680,
		ID: 'sVerInnerOptions'
	};
	var horizontalInnerOpitions = {
		width: 400,
		height: 680,
		orientation: 'horizontal',
		panels: [
			{ collapsible: false},
			{ collapsible: true }
		],
		ID: 'sHorInnerOptions'
	};
	var nestedOptions = {
		width: 800,
		height: 680,
		panels: [
			{ size: 400, collapsible: true },
			{ size: 400, collapsible: true }
		],
		ID: 'sNested',
		childOptions: [
			verticalInnerOptions,
			horizontalInnerOpitions
		]
	};
	this.addSplitter(nestedOptions);
	var container = $('#sNested'), children = null, panel = null, vSplitter = null, vChildren = null, vPanel;

	this.mainContainerCheckClasses(container);

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-vertical');
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-default');

			var buttonLeft = $(panel.children()[0]);
			var buttonRight = $(panel.children()[1]);

			this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-vertical-left');
			this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-w');
			this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-vertical-right');
			this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');
		} else {
			this.panelContainerCheckClasses(panel, 'ui-igsplitter-panel-vertical');
			vSplitter = $(panel);
			vChildren = vSplitter.children();
			this.mainContainerCheckClasses(vSplitter);

			for (var j = 0; j < vChildren.length; j += 1) {
				vPanel = $(vChildren[j]);
				if (j % 2 === 1 && i === 0) {
					this.util.checkClass(vPanel, 'ui-igsplitter-splitbar-vertical');
					this.util.checkClass(vPanel, 'ui-igsplitter-splitbar-default');

					var buttonLeft = $(vPanel.children()[0]);
					var buttonRight = $(vPanel.children()[1]);

					this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-vertical-left');
					this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-w');
					this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-vertical-right');
					this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');
				} else if (j % 2 === 1 && i === 2) {
					this.util.checkClass(vPanel, 'ui-igsplitter-splitbar-horizontal');
					this.util.checkClass(vPanel, 'ui-igsplitter-splitbar-default');

					var buttonLeft = $(vPanel.children()[0]);
					var buttonRight = $(vPanel.children()[1]);

					this.util.checkClass(buttonLeft, 'ui-igsplitter-collapse-button-horizontal-left');
					this.util.checkClass($(buttonLeft.children()), 'ui-icon ui-icon-triangle-1-n');
					this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-horizontal-right');
					this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-s');
				} else {
					this.panelContainerCheckClasses(vPanel, i === 0 ? 'ui-igsplitter-panel-vertical' : 'ui-igsplitter-panel-horizontal');
				}
			}
		}
	}
});

QUnit.test('Test 6: igSplitter widget collapsing/expanding test.', function (assert) {
	assert.expect(23);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'sVer'
	};
	this.addSplitter(options);
	var container = $('#sVer'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;
	panel1 = $(container.children()[0]);
	bar = $(container.children()[1]);
	buttonRight = $(bar.children()[1]);
	panel2 = $(container.children()[2]);

	this.util.checkClass(bar, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default');

	this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');


	buttonRight.mouseenter();
	this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');
	this.util.checkClass(buttonRight, 'ui-igsplitter-collapse-single-button ui-state-default ui-igsplitter-collapse-button-hover ui-state-hover');


	buttonRight.mousedown();
	assert.ok(this.equalSplitter(panel1.width(), 594), 'igSplitter panel1 has wrong width.');
	assert.ok(this.equalSplitter(panel2.width(), 0), 'igSplitter panel2 has wrong width.');
	this.util.checkClass(bar, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default ui-state-default ui-igsplitter-splitbar-collapsed');

	buttonRight.mouseleave();
	bar.mouseleave();
	var sliptbars = $('.ui-igsplitter-splitbar-hover');
	assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');

	this.util.checkClass(buttonRight, 'ui-state-default ui-igsplitter-collapse-button-pressed ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon-triangle-1-w ui-icon');

	panel1 = $(container.children()[0]);
	bar = $(container.children()[1]);
	buttonRight = $(bar.children()[1]);
	panel2 = $(container.children()[2]);

	this.util.checkClass(bar, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default');
	this.util.checkClass(buttonRight, 'ui-state-default ui-igsplitter-collapse-button-pressed ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon-triangle-1-w ui-icon');
	buttonRight.mouseenter();
	this.util.checkClass(buttonRight, 'ui-state-default ui-igsplitter-collapse-button-pressed ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon-triangle-1-w ui-icon');

	buttonRight.mousedown();
	this.util.checkClass(bar, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default');

	buttonRight.mouseleave();
	bar.mouseleave();
	this.util.checkClass(buttonRight, 'ui-state-default ui-igsplitter-collapse-button-vertical-right');
	this.util.checkClass($(buttonRight.children()), 'ui-icon ui-icon-triangle-1-e');

	assert.ok(panel1.width() === 400, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 194, 'igSplitter panel2 has wrong width.');

	var sliptbars = $('.ui-igsplitter-splitbar-hover');
	assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
});

QUnit.test('Test 7: igSplitter widget verify after collapsing/expanding test.', function (assert) {
	assert.expect(23);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'sVer'
	};
	this.addSplitter(options);
	var container = $('#sVer'), children = null, panel = null, widths = [];

	widths[0] = 400;
	widths[1] = 4;
	widths[2] = 194;

	this.mainContainerCheckClasses(container);

	assert.ok(this.equalSplitter(container.width(), 600), 'igSplitter container has width.');
	assert.ok(this.equalSplitter(container.height(), 480), 'igSplitter container has height.');

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default');


			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter bar has wrong width.');
			assert.ok(panel.css("float") === "left", 'igSplitter bar has wrong float.');
			assert.ok(this.equalSplitter(panel.height(), 478), 'igSplitter bar has wrong height.');
			var buttonLeft = $(panel.children()[0]);
			var buttonRight = $(panel.children()[1]);

			this.util.checkClass(panel, 'ui-igsplitter-splitbar-vertical');
			this.util.checkClass(panel, 'ui-igsplitter-splitbar-default');

			assert.ok(buttonLeft.css("position") === "relative", 'igSplitter buttonLeft has wrong postion.');
			assert.ok(buttonRight.css("position") === "relative", 'igSplitter buttonRight has wrong postion.');
		} else {
			this.panelContainerCheckClasses(panel, 'ui-igsplitter-panel-vertical');
			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter panel has wrong width.');
			assert.ok(panel.css("float") === "left", 'igSplitter panel has wrong float.');
			assert.ok(this.equalSplitter(panel.height(), 480), 'igSplitter panel has wrong height.');
		}
	}
});

QUnit.test('Test 8: igSplitter widget drag vertical split bar test.', function (assert) {
	assert.expect(10);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'sVerDrag'
	};
	this.addSplitter(options);
	var container = $('#sVerDrag'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;
	bar = $($(container.children())[1]);

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(this.equalSplitter(panel1.width(), 400), 'igSplitter panel1 has wrong width.');
	assert.ok(this.equalSplitter(panel2.width(), 194), 'igSplitter panel2 has wrong width.');

	var sliptbars = $('.ui-igsplitter-splitbar-hover');
	assert.ok(sliptbars.length === 0, 'igSplitter hover sliptbar is not missing.');

	bar.simulate("drag", {
		dx: 120,
		checkAfterMouseDown: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseMove: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseUp: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar is missing.');
		},
		checkAfterClick: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
		}
	});

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);
	assert.ok(this.equalSplitter(panel1.width(), 520), 'igSplitter panel1 has wrong width.');
	assert.ok(this.equalSplitter(panel2.width(), 74), 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 9: igSplitter widget drag horizontal split bar test.', function (assert) {
	assert.expect(10);
	var options = {
		width: 600,
		height: 400,
		orientation: 'horizontal',
		panels: [
			{ size: 100, collapsible: true },
			{ size: 300, collapsible: true }
		],
		ID: 'sHorDrag'
	};
	this.addSplitter(options);
	var container = $('#sHorDrag'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;
	bar = $($(container.children())[1]);

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.height() === 100, 'igSplitter panel1 has wrong height.');
	assert.ok(panel2.height() === 294, 'igSplitter panel2 has wrong height.');

	var sliptbars = $('.ui-igsplitter-splitbar-hover');
	assert.ok(sliptbars.length === 0, 'igSplitter hover sliptbar is not missing.');
	bar.focus();
	bar.simulate("drag", {
		dy: 200,
		checkAfterMouseDown: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseMove: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseUp: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar is missing.');
		},
		checkAfterClick: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
		}
	});

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.height() === 300, 'igSplitter panel1 has wrong height.');
	assert.ok(panel2.height() === 94, 'igSplitter panel2 has wrong height.');
});

QUnit.test('Test 10: igSplitter widget min and max panel properties test.', function (assert) {
	assert.expect(17);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ size: 100, max: 90, min: 20 },
			{ size: 100, collapsible: true}
		],
		ID: 'sMinMax'
	};
	this.addSplitter(options);
	var container = $('#sMinMax'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;

	bar = $($(container.children())[1]);

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	var sliptbars = $('.ui-igsplitter-splitbar-hover');
	assert.ok(sliptbars.length === 0, 'igSplitter hover sliptbar is not missing.');

	bar.simulate("drag", {
		dx: 100,
		checkAfterMouseDown: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseMove: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseUp: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar is missing.');
		},
		checkAfterClick: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
		}
	});

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.width() === 90, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 104, 'igSplitter panel2 has wrong width.');

	bar.simulate("drag", {
		dx: -100,
		checkAfterMouseDown: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseMove: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 2, 'igSplitter splitbar and clone sliptbar are missing.');
		},
		checkAfterMouseUp: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar is missing.');
		},
		checkAfterClick: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
		}
	});

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.width() === 20, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 174, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 11: igSplitter widget collapsed property test.', function (assert) {
	assert.expect(3);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ size: 100, collapsed: true, collapsible: true },
			{ size: 100, collapsible: true}
		],
		ID: 'sCollapsed'
	};
	this.addSplitter(options);
	var container = $('#sCollapsed'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;

	bar = $($(container.children())[1]);
	this.util.checkClass(bar, 'ui-igsplitter-splitbar-vertical ui-igsplitter-splitbar-default ui-state-default ui-igsplitter-splitbar-collapsed');
	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.width() === 0, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 194, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 12: igSplitter widget resizable property test.', function (assert) {
	assert.expect(9);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ size: 100, resizable: false },
			{ size: 100, collapsible: true}
		],
		ID: 'sResizable'
	};
	this.addSplitter(options);
	var container = $('#sResizable'), bar = buttonLeft = buttonRight = panel1 = panel2 = null;

	bar = $($(container.children())[1]);

	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	bar.simulate("drag", {
		dx: -10,
		checkAfterMouseDown: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar hover is not presented and clone sliptbar is not missing.');
		},
		checkAfterMouseMove: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar hover is not presented and clone sliptbar is not missing.');
		},
		checkAfterMouseUp: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 1, 'igSplitter splitbar hover is not presented and clone sliptbar is not missing.');
		},
		checkAfterClick: function (target) {
			var sliptbars = $('.ui-igsplitter-splitbar-hover');
			assert.ok(sliptbars.length === 0, 'igSplitter splitbar is not missing.');
		}
	});
	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 13: igSplitter widget events.', function (assert) {
	assert.expect(3);
	var options = {
		width: 200,
		height: 400,
		collapsed: function (event, args) {
			assert.ok(args.owner === $('#sEvents').data('igSplitter'), 'Owner argument does not match');
			assert.ok(args.index === 0, 'Collapsed index argument does not match');
		},
		expanded: function (event, args) {
			assert.ok(args.owner === $('#sEvents').data('igSplitter'), 'Owner argument does not match');
			assert.ok(args.index === 0, 'Expanded index argument does not match');
		},
		resizeStarted: function (event, args) {
			assert.ok(args.owner === $('#sEvents').data('igSplitter'), 'Owner argument does not match');
		},
		resizing: function (event, args) {
			assert.ok(args.owner === $('#sEvents').data('igSplitter'), 'Owner argument does not match');
		},
		resizeEnded: function (event, args) {
			assert.ok(args.owner === $('#sEvents').data('igSplitter'), 'Owner argument does not match');
		},
		ID: 'sEvents'
	};
	this.addSplitter(options);
	$('#sEvents').igSplitter("collapseAt", 0);
	$('#sEvents').igSplitter("expandAt", 0);

	var container = $('#sEvents'), bar = null;
	bar = $($(container.children())[1]);

	bar.simulate("drag", {
		dx: 10
	});
});

QUnit.test('Test 14: igSplitter widget keyboard navigation.', function (assert) {
	assert.expect(6);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ collapsible: true },
			{ collapsible: true }
		],
		ID: 'sKbNav'
	};
	this.addSplitter(options);
	$('div[tabindex="0"]')[0].focus();
	var container = $('#sKbNav'), bar = $($(container.children())[1]), sliptbars = panel1 = panel2 = null;
	panel1 = $($(container.children())[0]);
	panel2 = $($(container.children())[2]);

	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT, ctrlKey: true});
	assert.ok(panel1.width() === 0, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 194, 'igSplitter panel2 has wrong width.');

	bar.simulate("keydown", {keyCode: $.ui.keyCode.RIGHT, ctrlKey: true});
	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.RIGHT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.RIGHT});
	bar.simulate("keydown", {keyCode: $.ui.keyCode.ENTER});

	assert.ok(this.equalSplitter(panel1.width(), 30), 'igSplitter panel1 has wrong width.');
	assert.ok(this.equalSplitter(panel2.width(), 164), 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 15: igSplitter widget set panel sizes with percentages.', function (assert) {
	assert.expect(24);
	var options = {
		width: "90%",
		height: 400,
		panels: [
			{ size: "30%" },
			{ size: "70%" }
		],
		ID: 'sFluid'
	};
	this.addSplitter(options);
	var container = $('#sFluid'), children = null, panel = null, widths = [];
	widths[0] = 30; // in percentages
	widths[1] = 4; // in pixels
	widths[2] = 70; // in percentages

	assert.ok(this.equalSplitter((container.width() / $('#qunit-fixture').width() ) * 100, 90), 'igSplitter container has wrong width. Expected: 40 Actual: ' + (container.width() / $(document).width()) * 100); // in percentages
	assert.ok(this.equalSplitter(container.height(), 400), 'igSplitter container has wrong height. Expected: 400 Actual: ' + container.height());

	children = container.children();

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter bar has wrong width. Expected: ' + widths[i] + ' Actual: ' + panel.width());
			assert.ok(this.equalSplitter(panel.height(), 400), 'igSplitter bar has wrong height. Expected: 400 Actual: ' + panel.height());
		} else {
			assert.ok(this.equalSplitter((panel.width() / container.width()) * 100, widths[i]), 'igSplitter panel has wrong width. Expected: ' + widths[i] + ' Actual: ' + (panel.width() / container.width()) * 100);
			assert.ok(this.equalSplitter(panel.height(), 400), 'igSplitter panel has wrong height. Expected: 400 Actual: ' + panel.height());
		}
	}

	container.igSplitter("setFirstPanelSize", "10%");

	widths[0] = 10; // in percentages
	widths[1] = 4; // in pixels
	widths[2] = 90; // in percentages

	assert.ok(this.equalSplitter((container.width() / $('#qunit-fixture').width() ) * 100, 90), 'igSplitter container has wrong width. Expected: 40 Actual: ' + (container.width() / $(document).width() ) * 100); // in percentages
	assert.ok(this.equalSplitter(container.height(), 400), 'igSplitter container has wrong height. Expected: 400 Actual: ' + container.height());

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter bar has wrong width. Expected: ' + widths[i] + ' Actual: ' + panel.width());
			assert.ok(this.equalSplitter(panel.height(), 400), 'igSplitter bar has wrong height. Expected: 400 Actual: ' + panel.height());
		} else {
			assert.ok(this.equalSplitter((panel.width() / container.width()) * 100, widths[i]), 'igSplitter panel has wrong width. Expected: ' + widths[i] + ' Actual: ' + (panel.width() / container.width()) * 100);
			assert.ok(this.equalSplitter(panel.outerHeight(), 400), 'igSplitter panel has wrong height. Expected: 400 Actual: ' + panel.height());
		}
	}

	container.igSplitter("setSecondPanelSize", "20%");

	widths[0] = 80; // in percentages
	widths[1] = 4; // in pixels
	widths[2] = 20; // in percentages

	assert.ok(this.equalSplitter((container.width() / $('#qunit-fixture').width() ) * 100, 90), 'igSplitter container has wrong width. Expected: 40 Actual: ' + (container.width() / $(document).width() ) * 100); // in percentages
	assert.ok(this.equalSplitter(container.height(), 400), 'igSplitter container has wrong height. Expected: 400 Actual: ' + container.height());

	for (var i = 0; i < children.length; i += 1) {
		panel = $(children[i]);
		if (i % 2 === 1) {
			assert.ok(this.equalSplitter(panel.width(), widths[i]), 'igSplitter bar has wrong width. Expected: ' + widths[i] + ' Actual: ' + panel.width());
			assert.ok(this.equalSplitter(panel.height(), 400), 'igSplitter bar has wrong height. Expected: 400 Actual: ' + panel.height());
		} else {
			assert.ok(this.equalSplitter((panel.width() / container.width()) * 100, widths[i]), 'igSplitter panel has wrong width. Expected: ' + widths[i] + ' Actual: ' + (panel.width() / container.width()) * 100);
			assert.ok(this.equalSplitter(panel.height(), 400), 'igSplitter panel has wrong height. Expected: 400 Actual: ' + panel.height());
		}
	}

});

QUnit.test('Test 16: igSplitter widget set new smaller width to horizontal.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sHorizontal', 300, 300, 300);
});

QUnit.test('Test 17: igSplitter widget set new bigger width to horizontal.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sHorizontal', 800, 800, 800);
});

QUnit.test('Test 18: igSplitter widget set new smaller height to horizontal.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sHorizontal', 300, 243, 51);
});

QUnit.test('Test 19: igSplitter widget set new bigger height to horizontal.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sHorizontal', 800, 649, 145);
});

QUnit.test('Test 20: igSplitter widget set new smaller width to vertical.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sVertical', 300, 243, 51);
});

QUnit.test('Test 21: igSplitter widget set new bigger width to vertical.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sVertical', 800, 649, 145);
});

QUnit.test('Test 22: igSplitter widget set new smaller height to vertical.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sVertical', 300, 300, 300);
});

QUnit.test('Test 23: igSplitter widget set new bigger height to vertical.', function(assert) {
	assert.expect(3);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sVertical', 800, 800, 800);
});

QUnit.test('Test 24: igSplitter widget set new bigger height then set new bigger width to horizontal.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sHorizontal', 800, 800, 800);

	$('#sHorizontal').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sHorizontal', 800, 649, 145);
});

QUnit.test('Test 25: igSplitter widget set new bigger height then set new bigger width to vertical.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sVertical', 800, 649, 145);

	$('#sVertical').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sVertical', 800, 800, 800);
});

QUnit.test('Test 26: igSplitter widget set new smaller height then set new smaller width to horizontal.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sHorizontal', 300, 300, 300);

	$('#sHorizontal').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sHorizontal', 300, 243, 51);
});

QUnit.test('Test 27: igSplitter widget set new smaller height then set new smaller width to vertical.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 200}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sVertical', 300, 243, 51);

	$('#sVertical').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sVertical', 300, 300, 283);
});

QUnit.test('Test 28: igSplitter widget set new bigger height then set new smaller width to horizontal.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sHorizontal', 800, 649, 145);

	$('#sHorizontal').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sHorizontal', 300, 300, 300);
});

QUnit.test('Test 29: igSplitter widget set new bigger height then set new smaller width to vertical.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sVertical', 800, 800, 800);

	$('#sVertical').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sVertical', 300, 243, 51);
});

QUnit.test('Test 30: igSplitter widget set new smaller height then set new bigger width to horizontal.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sHorizontal', 300, 243, 51);

	$('#sHorizontal').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sHorizontal', 800, 800, 800);
});

QUnit.test('Test 31: igSplitter widget set new smaller height then set new bigger width to vertical.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sVertical', 300, 300, 300);

	$('#sVertical').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sVertical', 800, 649, 145);
});

QUnit.test('Test 32: igSplitter widget set new smaller width then set new bigger width to horizontal.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		orientation: 'horizontal',
		panels: [{ size: 400}, { size: 100}],
		ID: 'sHorizontal'
	};
	this.addSplitter(options);
	$('#sHorizontal').igSplitter('option', 'width', 300);
	this.setterWidthAsserts('#sHorizontal', 300, 300, 300);

	$('#sHorizontal').igSplitter('option', 'width', 800);
	this.setterWidthAsserts('#sHorizontal', 800, 800, 800);
});

QUnit.test('Test 33: igSplitter widget set new smaller height then set new bigger height to vertical.', function(assert) {
	assert.expect(6);
	var options = {
		width: 500,
		height: 500,
		panels: [{ size: 400}, { size: 100}],
		ID: 'sVertical'
	};
	this.addSplitter(options);
	$('#sVertical').igSplitter('option', 'height', 300);
	this.setterHeightAsserts('#sVertical', 300, 300, 300);

	$('#sVertical').igSplitter('option', 'height', 800);
	this.setterHeightAsserts('#sVertical', 800, 800, 800);
});

QUnit.test('Test 34: igSplitter widget set min and max panels boundries.', function(assert) {
	assert.expect(5);
	this.util.appendToFixture(this.divTag, { id: 'wrapper_34' });

	var options = {
		height: "300px",
		width: "100%",
		panels: [
			{ size: "550px", min: "200px", max: "75%" },
			{ max: "30%", min: "40%" }
		],
		ID: 'splitter_34',
		parentID: 'wrapper_34',
		childElements: [ this.divLoremIpsumAuto, this.divLoremIpsum ]
	}
	this.addSplitter(options);

	var container = $("#splitter_34"),
					maxWidthPanel1,
					minWidthPanel2,
					maxWidthPanel2;

	assert.ok(this.equalSplitter((container.width() / $('#qunit-fixture').width() ) * 100, 100), 'igSplitter container has wrong width. Expected: 100 Actual: ' + (container.width() / $('#qunit-fixture').width()) * 100); // in percentages
	assert.ok(this.equalSplitter(container.height(), 300), 'igSplitter container has wrong height. Expected: 400 Actual: ' + container.height());

	maxWidthPanel1 = (container.data().igSplitter.options.panels[0].max / container.width()) * 100;
	minWidthPanel2 = (container.data().igSplitter.options.panels[1].min / container.width()) * 100;
	maxWidthPanel2 = (container.data().igSplitter.options.panels[1].max / container.width()) * 100;

	assert.ok(this.equalSplitter(maxWidthPanel1, 75), 'igSplitter first panel max value is wrong. Expected: 75 Actual:' + maxWidthPanel1);
	assert.ok(this.equalSplitter(minWidthPanel2, 40), 'igSplitter second panel min value is wrong. Expected: 40 Actual:' + minWidthPanel2);
	assert.ok(this.equalSplitter(maxWidthPanel2, 30), 'igSplitter second panel min value is wrong. Expected: 30 Actual:' + maxWidthPanel2);
});

QUnit.test('Test 35: igSplitter widget set clone min panels boundries.', function(assert) {
	assert.expect(2);
	var options = {
		height: "300px",
		width: "100%",
		panels: [
			{ size: "2000px", min: "80%" },
			{ min: "30%" }
		],
		ID: 'splitter_35',
		childElements: [ this.divLoremIpsumAuto, this.divLoremIpsum ]
	}
	this.addSplitter(options);
	var container = $("#splitter_35"),
					maxWidthPanel1,
					minWidthPanel2,
					maxWidthPanel2;

	minWidthPanel1 = (container.data().igSplitter.options.panels[0].min / container.width()) * 100;
	minWidthPanel2 = (container.data().igSplitter.options.panels[1].min / container.width()) * 100;

	assert.ok(this.equalSplitter(minWidthPanel1, 80), 'igSplitter first panel min value is wrong. Expected: 80 Actual:' + minWidthPanel1);
	assert.ok(this.equalSplitter(minWidthPanel2, 30), 'igSplitter second panel min value is wrong. Expected: 30 Actual:' + minWidthPanel2);
});

QUnit.test('Test 36: igSplitter widget set clone max panels boundries.', function(assert) {
	assert.expect(2);
	var options = {
		height: "300px",
		width: "100%",
		panels: [
			{ size: "60%", min: "200px", max: "75%" },
			{ max: 60, min: "20%"}
		],
		ID: 'splitter_36',
		childElements: [ this.divLoremIpsumAuto, this.divLoremIpsum ]
	}
	this.addSplitter(options);
	var container = $("#splitter_36"),
					maxWidthPanel1,
					maxWidthPanel2;

	maxWidthPanel1 = (container.data().igSplitter.options.panels[0].max / container.width()) * 100;
	maxWidthPanel2 = container.data().igSplitter.options.panels[1].max;

	assert.ok(this.equalSplitter(maxWidthPanel1, 75), 'igSplitter first panel max value is wrong. Expected: 75 Actual:' + maxWidthPanel1);
	assert.ok(this.equalSplitter(maxWidthPanel2, 60), 'igSplitter second panel max value is wrong. Expected: 60 Actual:' + maxWidthPanel2);
});

QUnit.test('Test 37: igSplitter widget horizontal calculation test when first panel is not defined', function (assert) {
	assert.expect(3);
	var options = {
		width: 200,
		height: 400,
		orientation: 'horizontal',
		panels: [{}, { size: 200 }],
		ID: 'sHorizontalUndefinedFirstPanel'
	};
	this.addSplitter(options);
	this.setterHeightAsserts('#sHorizontalUndefinedFirstPanel', 400, 200, 194);
});

QUnit.test('Test 38: igSplitter widget vertical calculation test when first panel is not defined', function (assert) {
	assert.expect(3);
	var options = {
		width: 400,
		height: 200,
		panels: [{}, { size: 200 }],
		ID: 'sVerticalUndefinedFirstPanel'
	};
	this.addSplitter(options);
	this.setterWidthAsserts('#sVerticalUndefinedFirstPanel', 400, 200, 194);
});

QUnit.test('Test 39: igSplitter when we have one element, create method should add another element in splitter container.', function (assert) {
	assert.expect(2);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'splitterWithOneElem',
		numberOfDivs: 1
	};
	this.addSplitter(options);
	var container = $("#splitterWithOneElem");
	var getLenOFElementsContent = container.children('div[class*="content"]').length;

	assert.ok(typeof container.igSplitter === 'function', "igSplitter script is not loaded");
	assert.ok(getLenOFElementsContent === 2, 'igSplitter did not create second content element.');
});

QUnit.test('Test 40: igSplitter when we have an empty splitter, create method should add two elements in splitter container.', function (assert) {
	assert.expect(2);
	var options = {
		width: 600,
		height: 480,
		disabled: true,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'emptySplitter',
		numberOfDivs: 0
	};
	this.addSplitter(options);
	var container = $("#emptySplitter");
	var getLenOFElementsContent = container.children('div[class*="content"]').length;

	assert.ok(typeof container.igSplitter === 'function', 'igSplitter script is not loaded');
	assert.ok(getLenOFElementsContent === 2, 'igSplitter did not create two content elements.');
});

QUnit.test('Test 41: igSPlitter set disabled to be true.', function (assert) {
	assert.expect(1);
	var options = {
		width: 600,
		height: 480,
		disabled: true,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		ID: 'emptySplitter',
		numberOfDivs: 0
	};
	this.addSplitter(options);
	var container = $("#emptySplitter");

	var isDisabled = $("#emptySplitter").igSplitter('option', 'disabled');
	assert.ok(isDisabled, 'igSplitter wasn\'t set to be disabled.')
});

QUnit.test('Test 42: igSplitter bind resize event.', function (assert) {
	assert.expect(1);
	var options = {
		width: 600,
		height: 480,
		panels: [
			{ size: 400 },
			{ size: 100, collapsible: true }
		],
		layoutRefreshed: function(evt, ui) {
			$(evt.target).attr('isResized', true);
		},
		ID: 'splitterWithOneElem',
		numberOfDivs: 1
	};
	this.addSplitter(options);
	var container = $("#splitterWithOneElem");

	container.trigger('resize', function (evt, args) { });

	assert.ok(container.attr('isresized'), 'igSplitter was not resized.')
});

QUnit.test('Test 43: igSplitter move bar to right out of range.', function (assert) {
	assert.expect(4);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ collapsible: true },
			{ collapsible: true }
		],
		ID: 'splitterDragBarOutOfRange'
	};
	this.addSplitter(options);

	var container = $('#splitterDragBarOutOfRange'),
		bar = $($(container.children())[1]),
		panel1 = $(container.igSplitter('firstPanel')),
		panel2 = $(container.igSplitter('secondPanel'));

	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	// Drag bar to rigth out of range.
	bar.simulate("drag", {
		dx: 200,
	});

	bar.simulate("keydown", {keyCode: $.ui.keyCode.RIGHT});

	assert.ok(panel1.width() === 194, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 0, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 44: igSplitter move bar to left out of range.', function (assert) {
	assert.expect(4);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ collapsible: true },
			{ collapsible: true }
		],
		ID: 'splitterDragBarOutOfRange'
	};
	this.addSplitter(options);

	var container = $('#splitterDragBarOutOfRange'),
		bar = $($(container.children())[1]),
		panel1 = $(container.igSplitter('firstPanel')),
		panel2 = $(container.igSplitter('secondPanel'));

	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	// Drag bar to left out of range.
	bar.simulate("drag", {
		dx: -400,
	});

	bar.simulate("keydown", {keyCode: $.ui.keyCode.LEFT});

	assert.ok(panel1.width() === 0, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 194, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 45: igSplitter is ebale to drag delta with iframe inside panel.', function (assert) {
	assert.expect(4);
	var options = {
		width: 200,
		height: 400,
		panels: [
			{ collapsible: true },
			{ collapsible: true }
		],
		ID: 'splitterWithIframe',
		childElements: [ this.divLoremIpsum, this.divIFrame ]
	};
	this.addSplitter(options);
	var container = $('#splitterWithIframe'),
		bar = $($(container.children())[1]),
		panel1 = $(container.igSplitter('firstPanel')),
		panel2 = $(container.igSplitter('secondPanel'));

	assert.ok(panel1.width() === 100, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 94, 'igSplitter panel2 has wrong width.');

	bar.simulate("drag", {
		dx: 20,
	});

	bar.simulate("keydown", {keyCode: $.ui.keyCode.RIGTH});

	assert.ok(panel1.width() === 120, 'igSplitter panel1 has wrong width.');
	assert.ok(panel2.width() === 74, 'igSplitter panel2 has wrong width.');
});

QUnit.test('Test 46: igSplitter when disabled and try to fire mousedown, mouseleave and mouseenter events should stop.', function (assert) {
	assert.expect(3);
	/* classes defining the hover state style of the split bar */
	var buttonHoverClass = "ui-state-hover",
		barCollapsedClass = "ui-igsplitter-splitbar-collapsed";

	var options = {
		height: "300px",
		width: "100px",
		disabled: true,
		ID: 'disabledSplitter'
	};
	this.addSplitter(options);

	var container = $("#disabledSplitter"),
		bar = $($(container.children())[1]),
		panel1 = $(container.igSplitter('firstPanel')),
		buttonRight = $(bar.children()[1]),
		panel2 = $(container.igSplitter('secondPanel'));

	buttonRight.mousedown();
	assert.ok(!$(bar).attr('class').contains(barCollapsedClass), 'mousedown was fired when the splitter is disabled.');

	buttonRight.mouseenter();
	assert.ok(!$(buttonRight).attr('class').contains(buttonHoverClass), 'mouseenter was fired when the splitter is disabled.');

	buttonRight.mouseleave();
	bar.mouseleave();
	assert.ok(!$(bar).attr('class').contains(buttonHoverClass), 'mouseleave was fired when the splitter is disabled.');
});

QUnit.test('Test 47: igSplitter exception on initialize', function(assert) {
	assert.expect(1);
	var $elem = $(this.divTag);
	assert.throws(
		function() {
			var options = {
				panels: [
					{ collapsible: true },
					{ collapsible: false },
					{ collapsible: true }
				],
				ID: 'splitterExceptions'
			};
			$elem.igSplitter(options);
		},
		new Error($.ig.Splitter.locale.errorPanels),
		"Initializing more than 2 panels throws an error"
	);
	$elem.igSplitter("destroy");
});

QUnit.test('Test 48: igSplitter exception on _setOption', function(assert) {
	assert.expect(2);
	var options = {
		orientation: "horizontal",
		panels: [
			{size: "50%", min: "40%", max: "55%", collapsed: true, collapsible: true},
			{collapsible: true}
		],
		ID: 'splitterExceptions'
	};
	this.addSplitter(options);

	assert.throws(
		function() {
			$("#splitterExceptions").data().igSplitter._setOption("orientation", "vertical");
		},
		new Error($.ig.Splitter.locale.errorSettingOption),
		"Trying to set orinentation after initializing throws error"
	);

	assert.throws(
		function() {
			$("#splitterExceptions").data().igSplitter._setOption("panels", []);
		},
		new Error($.ig.Splitter.locale.errorSettingOption),
		"Trying to set panels after initializing throws error"
	);
});

QUnit.test('Test 49: igSplitter box-sizing: border-box', function(assert) {
	assert.expect(2);
	var options = {
		orientation: "vertical",
		panels: [
			{ size: "300px", max: "300px", collapsed: false, collapsible: false },
			{ collapsible: false, size: "300px", max: "300px" }
		],
		ID: 'splitterBorderBox'
	};
	this.addSplitter(options);
	$('#splitterBorderBox').attr('style', 'width: 600px; height: 100px; border: solid 2px #ccc; box-sizing: border-box');

	var borderWidth = 2, parentWidth = parseInt($('#splitterBorderBox').css('width'), 10),
		actualWidth = $("#splitterBorderBox").data().igSplitter._getSize("width"),
		parentHeight;

	assert.equal(actualWidth, parentWidth - (2 * borderWidth), "Actual width with border box matches");

	$("#splitterBorderBox").igSplitter("destroy");

	$("#splitterBorderBox").igSplitter({
		orientation: "horizontal",
		panels: [
			{size: "300px", max: "300px", collapsed: false, collapsible: false},
			{collapsible: false, size: "300px", max: "300px"}
		]
	});

	actualWidth = $("#splitterBorderBox").data().igSplitter._getSize("height");
	parentHeight = parseInt($('#splitterBorderBox').css('height'), 10);
	assert.equal(actualWidth, parentHeight - (2 * borderWidth), "Actual height with border box matches");
});