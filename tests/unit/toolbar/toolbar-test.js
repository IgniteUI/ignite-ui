QUnit.module("igToolbar unit tests", {
	divTag: '<div></div>',
	igToolbarId: "igToolbar",
	igToolbarSelector: "#igToolbar",
	expectedWidth: 100,
	expectedHeight: 200,
	beforeEach : function(){
		var toolbarElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: this.igToolbarId });
		toolbarElement.igToolbar({});
	}
});

QUnit.test('[ID1] igToolbar initialization', function (assert) {
	assert.expect(1);
	
	var initialized =  $(this.igToolbarSelector).length > 0;
	assert.ok(initialized, "igToolbar should be initialized");
});


QUnit.test('[ID2] igToolbar test collapsing event with isExpanded true', function (assert) {
	assert.expect(1);

	var done = assert.async();
	$(this.igToolbarSelector + "_collapseButton").click();
	var selector = this.igToolbarSelector;
	$.ig.TestUtil.wait(500).then(function () {
		assert.notOk($(selector).igToolbar("option", "isExpanded"), "igToolbar should not be expanded");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});


QUnit.test('[ID3] igToolbar test collapsing event with isExpanded false', function (assert) {
	assert.expect(1);

	var done = assert.async();
	$(this.igToolbarSelector + "_collapseButton").click();
	$(this.igToolbarSelector + "_collapseButton").click();
	var selector = this.igToolbarSelector;
	$.ig.TestUtil.wait(500).then(function () {
		assert.ok($(selector).igToolbar("option", "isExpanded"), "igToolbar should be expanded");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});


QUnit.test('[ID4] igToolbar setOptions height and width', function (assert) {
	assert.expect(2);

	var actualWidth, actualHeight;

	$(this.igToolbarSelector).igToolbar("option", "width", this.expectedWidth);
	$(this.igToolbarSelector).igToolbar("option", "height", this.expectedHeight);

	actualWidth = $(this.igToolbarSelector).data().igToolbar.options.width;
	actualHeight = $(this.igToolbarSelector).data().igToolbar.options.height;

	assert.equal(actualWidth, this.expectedWidth, "igToolbar width should be 100");
	assert.equal(actualHeight, this.expectedHeight, "igToolbar height should be 200");
});

QUnit.test('[ID5] igToolbar get height and width', function (assert) {
	assert.expect(2);

	var actualWidth, actualHeight;		

	$(this.igToolbarSelector).igToolbar("option", "width", this.expectedWidth);
	$(this.igToolbarSelector).igToolbar("option", "height", this.expectedHeight);

	actualWidth = $(this.igToolbarSelector).igToolbar("option", "width");
	actualHeight = $(this.igToolbarSelector).igToolbar("option", "height");

	assert.equal(actualWidth, this.expectedWidth, "igToolbar width should be 100");
	assert.equal(actualHeight, this.expectedHeight, "igToolbar height should be 200");
});

QUnit.test('[ID6] igToolbar allowCollapsiong option', function (assert) {
	assert.expect(1);

	$(this.igToolbarSelector).igToolbar("option", "allowCollapsing", false);

	var actualAllowCollapsing = $(this.igToolbarSelector).data().igToolbar.options.allowCollapsing;

	assert.notOk(actualAllowCollapsing, "igToolbar allowCollapsing option should be false");
});

QUnit.test('[ID7] igToolbar setOptions items, isExpanded, CRUD items', function (assert) {
	assert.expect(18);
	var callbackRendererCount = 0;
	var newItems = [
		// Button
		{
			name: 'Button',
			type: 'button',
			scope: this,
			title: 'Simple button',
			callbackRenderer: function () {
				callbackRendererCount++;
			},
			props: {
					allowToggling: {
						value: true
					},
					isImage: {
						value: false,
						action: function() { console.log('Action'); }
					},
					imageButtonTooltip: {
						value: "Insert e-mail signature",
						action: function() { console.log('Action'); }
					},
					imageButtonIcon: {
						value: "ui-icon-insert-email",
						action: function() { console.log('Action'); }
					}
				}
		},
		// Combo
		{
			type: 'combo',
			name: 'fontSize',
			scope: null,
			dataSource: [
				{'ID': 1, 'Value': 'One'},
				{'ID': 2, 'Value': 'Two'},
				{'ID': 3, 'Value': 'Three'}
			],
			valueKey: 'ID',
			textKey: 'Value',
			initialSelectedItems: [{'ID': 1}],
			width: '123px',
			height: '33px',
			props: {
				fontSizeChangeWidth: {
					value: 'Change width',
					action: function() { console.log('Width changed'); }
				}
			}
		},
		{
			name: "Bold",
			type: "button",
			scope: null,
			props: {
				"allowToggling": {
					"value": true
				},
				"isBold": {
					"value": false,
					"action": "_isSelectedAction"
				},
				"boldButtonTooltip": {
					"value": "Bold",
					"action": "_tooltipAction"
				},
				"boldButtonIcon": {
					"value": "ui-igbutton-bold",
					"action": "_buttonIconAction"
				}
			}
		},
		{
			name: 'emptyItem',
			scope: null,
		}
	];

	$(this.igToolbarSelector).igToolbar({
		isExpanded: false,
		items: newItems
	});
	assert.equal($(this.igToolbarSelector).igToolbar('option', 'items').length, newItems.length, 'igToolbar items are correctly set');
	assert.equal(callbackRendererCount, 1, "callbackRenderer not called");

	$(this.igToolbarSelector).igToolbar('option', 'isExpanded', true);
	assert.ok($(this.igToolbarSelector).igToolbar('option', 'isExpanded'), 'igToolbar should be expanded');

	$(this.igToolbarSelector).igToolbar('option', 'isExpanded', false);
	assert.notOk($(this.igToolbarSelector).igToolbar('option', 'isExpanded'), 'igToolbar should not be expanded');

	var newButton = {
			name: 'NewButton',
			type: 'button',
			scope: this,
			props: {
					isImage: {
						value: false,
						action: '_isSelectedAction'
					},
					imageButtonTooltip: {
						value: "Insert e-mail signature",
						action: '_tooltipAction'
					},
					imageButtonIcon: {
						value: "ui-icon-insert-email",
						action: '_buttonIconAction'
					}
				}
		};

	$(this.igToolbarSelector).igToolbar('addItem', newButton);
	assert.equal($(this.igToolbarSelector).igToolbar('option', 'items').length, newItems.length, 'igToolbar should have 3 items');
	assert.equal(callbackRendererCount, 2, "callbackRenderer not called for second createItems");


	assert.ok($(this.igToolbarSelector).igToolbar('getItem', 0) != undefined, 'igToolbar getItem should return an object');

	$(this.igToolbarSelector).igToolbar('activateItem', 0, true);
	assert.ok($(this.igToolbarSelector).igToolbar('getItem', 0).igToolbarButton('option', 'isSelected'), 'Toolbar item should be activated');

	// Hiding buttons
	$(this.igToolbarSelector).data().igToolbar._hideButtonFromToolbar();
	assert.equal($(this.igToolbarSelector).data().igToolbar._hiddenButtons.length, 1, '1 button should be hidden');
	$(this.igToolbarSelector).data().igToolbar._hideButtonFromToolbar();
	assert.equal($(this.igToolbarSelector).data().igToolbar._hiddenButtons.length, 2, '2 buttons should be hidden');
	$(this.igToolbarSelector).data().igToolbar._showHiddenButtonFromToolbar();
	$(this.igToolbarSelector).data().igToolbar._showHiddenButtonFromToolbar();
	assert.equal($(this.igToolbarSelector).data().igToolbar._hiddenButtons.length, 0, 'No button should be hidden');


	// Custom collapse/expand button css classes
	var $iconEl = $($(this.igToolbarSelector + "_collapseButton").find('span')[0]);

	$(this.igToolbarSelector).igToolbar('option', 'collapseButtonIcon', 'testColapseIcon');
	assert.equal($(this.igToolbarSelector).igToolbar('option', 'collapseButtonIcon'), 'testColapseIcon', 'igToolbar collapseButtonIcon should be set');
	$(this.igToolbarSelector).igToolbar('option', 'isExpanded', true);
	assert.ok($iconEl.hasClass('testColapseIcon'), 'igToolbar span icon element should have the new class set (collapsing)');

	$(this.igToolbarSelector).igToolbar('option', 'expandButtonIcon', 'testExpandIcon');
	assert.equal($(this.igToolbarSelector).igToolbar('option', 'expandButtonIcon'), 'testExpandIcon', 'igToolbar expandButtonIcon should be set');
	$(this.igToolbarSelector).igToolbar('option', 'isExpanded', false);
	assert.ok($iconEl.hasClass('testExpandIcon'), 'igToolbar span icon element should have the new class set (expanding)');


	// Test button descriptors
	newItems[0].updateProperty('isImage', true);
	assert.ok(newItems[0].getProperty('isImage').value, 'igToolbar updating properties should work');
	assert.ok(newItems[0].getUpdatedProperties()[0].value, 'igToolbar getUpdatedProperties() should work');

	$(this.igToolbarSelector).igToolbar('removeItem', 0);
	assert.equal($(this.igToolbarSelector).igToolbar('option', 'items').length, newItems.length, 'igToolbar should have 2 items');
});


QUnit.test('[ID8] igToolbar destroy method', function (assert) {
	assert.expect(1);

	$(this.igToolbarSelector).igToolbar("destroy");
	assert.equal($(this.igToolbarSelector).children().length, 0, "igToolbar should be destroyed");
});
