QUnit.module("igSplitButton unit tests", {
	$sButton: $("#igSplitButton"),
	iconSelector: "#igSplitButton_Name1",
	iconPicSelector: "#igSplitButton_Name1_picn",
	iconLabelSelector: "#igSplitButton_Name1_lbl",
	arrowSelector: "#igSplitButton_arrow",
	arrowPicSelector: "#igSplitButton_arrow_picn",
	arrowLabelSelector: "#igSplitButton_arrow_lbl",
	itemsListSelector: ".ui-splitbutton-list",
	menuItemsSelector: ".ui-menu-item",
	menuItemAnchorSelector: "#igSplitButton_Name2",
	menuItemPicSelector: "#igSplitButton_Name2_picn",
	menuItemLabelSelector: "#igSplitButton_Name2_lbl",
	firstItemName: "Name1",
	firstItemLabel: "Label1",
	secondItemName: "Name2",
	secondItemLabel: "Label2",
	iconClass: "ui-icon-gear",
	expanding: false,
	expanded: false,
	collapsing: false,
	collapsed: false,
	itemsList: null,
	assert: null,

	beforeEach: function () {
		var splitBtnElement = $.ig.TestUtil.appendToFixture('<div></div>', { id: "igSplitButton" });
		splitBtnElement.igSplitButton({
			defaultItemName: this.firstItemName,
			items: [{
				name: this.firstItemName,
				label: this.firstItemLabel,
				iconClass: this.iconClass
			},
			{
				name: this.secondItemName,
				label: this.secondItemLabel,
				iconClass: this.iconClass
			}]
		});

		this.$sButton = $("#igSplitButton");
	},

	attachSplitBtnEvents: function (clickElemName) {
		var self = this;

		this.$sButton.igSplitButton({
			click: function (event, ui) {
				self.assert.equal(event.type, 'igsplitbuttonclick', 'Click event type is incorrect.');
				self.assert.equal(ui.name, clickElemName, 'The clicked element name is incorrect.');
			},
			expanding: function (event, ui) {
				self.expanding = true;
				self.assert.notOk(self.expanded, 'The expanded event is fired before expanding.');
				self.assert.equal(event.type, 'igsplitbuttonexpanding', 'Expanding event type is incorrect.');
				self.assert.equal(ui.owner.element.attr('id'), 'igSplitButton', 'The expanding event owner argument is incorrect.');
			},
			expanded: function (event, ui) {
				self.itemsList = self.$sButton.find(self.itemsListSelector);
				self.expanded = true;
				self.assert.ok(self.expanding, 'The expanding event is fired before expanded.');
				self.assert.equal(event.type, 'igsplitbuttonexpanded', 'Expanded event type is incorrect.');
				self.assert.equal(ui.owner.element.attr('id'), 'igSplitButton', 'The expanded event owner argument is incorrect.');
				self.assert.ok(self.$sButton.hasClass('ui-state-active'), 'The ui-state-active class is not applied to the split button.');
				self.assert.ok(self.itemsList.is(':visible'), 'The items list is not shown after expanding.');
			},
			collapsing: function (event, ui) {
				self.collapsing = true;
				self.assert.notOk(self.collapsed, 'The collapsed event is fired before collapsing.');
				self.assert.equal(event.type, 'igsplitbuttoncollapsing', 'Collapsing event type is incorrect.');
				self.assert.equal(ui.owner.element.attr('id'), 'igSplitButton', 'The collapsing event owner argument is incorrect.');
			},
			collapsed: function (event, ui) {
				self.itemsList = self.$sButton.find(self.itemsListSelector);
				self.collapsed = true;
				self.assert.ok(self.collapsing, 'The collapsing event is fired before collapsed');
				self.assert.equal(event.type, 'igsplitbuttoncollapsed', 'Collapsed event type is incorrect.');
				self.assert.equal(ui.owner.element.attr('id'), 'igSplitButton', 'The collapsed event owner argument is incorrect.');
				self.assert.notOk(self.$sButton.hasClass('ui-state-active'), "The ui-state-active class is not applied to the split button.");
				self.assert.notOk(self.itemsList.is(':visible'), 'The items list is not hidden after collapsing.');
			}
		});
	}
});

QUnit.test('[ID1] igSplitButton script loading', function (assert) {
	assert.expect(1);

	assert.ok(typeof this.$sButton.igSplitButton === 'function', 'igSplitButton is not defined.');
});

QUnit.test('[ID2] igSplitButton container rendering', function (assert) {
	assert.expect(6);

	assert.ok(this.$sButton.hasClass('ui-splitbutton'), 'The ui-splitbutton class is not applied to the split button.');
	assert.ok(this.$sButton.hasClass('ui-widget'), 'The ui-widget class is not applied to the split button.');
	assert.ok(this.$sButton.hasClass('ui-state-default'), 'The ui-state-default class is not applied to the split button.');
	assert.equal(this.$sButton.attr('tabindex'), 0, 'The tabindex attribute on the split button does not match.');

	// Hovering
	this.$sButton.mouseenter();
	assert.ok(this.$sButton.hasClass('ui-splitbutton-hover'), 'The ui-splitbutton-hover class is not applied to the split button on hover.');
	this.$sButton.mouseleave();
	assert.notOk(this.$sButton.hasClass('ui-splitbutton-hover'), 'The ui-splitbutton-hover class is not applied to the split button on hover.');
});

QUnit.test('[ID3] igSplitButton icon rendering', function (assert) {
	assert.expect(22);
	var $sButtonIcon = this.$sButton.find(this.iconSelector),
		$sButtonIconPic = $sButtonIcon.find(this.iconPicSelector),
		$sButtonIconLabel = $sButtonIcon.find(this.iconLabelSelector);

	// Icon
	assert.ok($sButtonIcon.length, 'The split button icon is not rendered.');
	assert.ok($sButtonIcon.is('div'), 'The split button icon is not a div element.');
	assert.ok($sButtonIcon.hasClass('ui-button-icon-only'), 'The ui-button-icon-only class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-button'), 'The ui-button class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-igbutton'), 'The ui-igbutton class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-widget'), 'The ui-widget class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-widget-content'), 'The ui-widget-content class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-state-default'), 'The ui-state-default class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-igtoolbarbutton'), 'The ui-igtoolbarbutton class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-splitbutton-cleargaps'), 'The ui-splitbutton-cleargaps class is not applied to the split button icon.');
	assert.ok($sButtonIcon.hasClass('ui-corner-left'), 'The ui-corner-left class is not applied to the split button icon.');
	assert.equal($sButtonIcon.attr('aria-disabled'), 'false', 'The aria-disabled attribute on the split button icon does not match.');
	assert.equal($sButtonIcon.attr('title'), this.firstItemLabel, 'The title attribute on the split button icon does not match.');
	assert.equal($sButtonIcon.attr('tabindex'), '1', 'The tabindex attribute on the split button icon does not match.');

	// Icon picture
	assert.ok($sButtonIconPic.length, 'The split button icon picture is not rendered.');
	assert.ok($sButtonIconPic.is('span'), 'The split button icon picture is not a span element.');
	assert.ok($sButtonIconPic.hasClass('ui-button-icon-primary'), 'The ui-button-icon-primary class is not applied to the split button icon picture.');
	assert.ok($sButtonIconPic.hasClass('ui-icon'), 'The ui-icon class is not applied to the split button icon picture.');
	assert.ok($sButtonIconPic.hasClass('ui-icon-gear'), 'The ui-icon-gear class is not applied to the split button icon picture.');

	// Icon label
	assert.ok($sButtonIconLabel.length, 'The split button icon label is not rendered.');
	assert.ok($sButtonIconLabel.is('span'), 'The split button icon label is not a span element.');
	assert.ok($sButtonIconLabel.hasClass('ui-button-text'), 'The ui-button-text class is not applied to the split button icon label.');
});

QUnit.test('[ID4] igSplitButton arrow rendering', function (assert) {
	assert.expect(21);

	var $sButtonArrow = this.$sButton.find(this.arrowSelector),
		$sButtonArrowPic = $sButtonArrow.find(this.arrowPicSelector),
		$sButtonArrowLabel = $sButtonArrow.find(this.arrowLabelSelector);

	// Arrow
	assert.ok($sButtonArrow.length, 'The split button arrow is not rendered.');
	assert.ok($sButtonArrow.is('div'), 'The split button arrow is not a div element.');
	assert.ok($sButtonArrow.hasClass('ui-splitbutton-arrow'), 'The ui-splitbutton-arrow class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-button-icon-only'), 'The ui-button-icon-only class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-button'), 'The ui-button class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-igbutton'), 'The ui-splitbutton-arrow class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-widget'), 'The ui-widget class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-widget-content'), 'The ui-widget-content class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-state-default'), 'The ui-state-default class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-splitbutton-cleargaps'), 'The ui-splitbutton-cleargaps class is not applied to the split button arrow.');
	assert.ok($sButtonArrow.hasClass('ui-corner-right'), 'The ui-corner-right class is not applied to the split button arrow.');
	assert.equal($sButtonArrow.attr('aria-disabled'), 'false', 'The aria-disabled attribute on the split button arrow does not match.');
	assert.equal($sButtonArrow.attr('tabindex'), '1', 'The tabindex attribute on the split button arrow does not match.');

	// Arrow picture
	assert.ok($sButtonArrowPic.length, 'The split button arrow picture is not rendered.');
	assert.ok($sButtonArrowPic.is('span'), 'The split button arrow picture is not a span element.');
	assert.ok($sButtonArrowPic.hasClass('ui-button-icon-primary'), 'The ui-button-icon-primary class is not applied to the split button arrow picture.');
	assert.ok($sButtonArrowPic.hasClass('ui-icon'), 'The ui-icon class is not applied to the split button arrow picture.');
	assert.ok($sButtonArrowPic.hasClass('ui-icon-triangle-1-s'), 'The ui-icon-triangle-1-s class is not applied to the split button arrow picture.');

	// Arrow label
	assert.ok($sButtonArrowLabel.length, 'The split button arrow label is not rendered.');
	assert.ok($sButtonArrowLabel.is('span'), 'The split button arrow label is not a span element.');
	assert.ok($sButtonArrowLabel.hasClass('ui-button-text'), 'The ui-button-text class is not applied to the split button arrow label.');
});

QUnit.test('[ID5] igSplitButton item list rendering', function (assert) {
	assert.expect(32);

	var $sButtonItemsList = $(this.itemsListSelector),
		$sButtonMenuItems = $sButtonItemsList.find(this.menuItemsSelector),
		$sButtonMenuItemAnchor = $sButtonMenuItems.find(this.menuItemAnchorSelector),
		$sButtonMenuItemPic = $sButtonMenuItemAnchor.find(this.menuItemPicSelector),
		$sButtonMenuItemLabel = $sButtonMenuItemAnchor.find(this.menuItemLabelSelector);

	// Items list
	assert.ok($sButtonItemsList.length, 'The split button items list is not rendered.');
	assert.ok($sButtonItemsList.is('ul'), 'The split button items list is not an ul element.');
	assert.ok($sButtonItemsList.hasClass('ui-splitbutton-list'), 'The ui-splitbutton-list class is not applied to the split button items list.');
	assert.ok($sButtonItemsList.hasClass('ui-menu'), 'The ui-menu class is not applied to the split button items list.');
	assert.ok($sButtonItemsList.hasClass('ui-widget'), 'The ui-widget class is not applied to the split button items list.');
	assert.ok($sButtonItemsList.hasClass('ui-widget-content'), 'The ui-widget-content class is not applied to the split button items list.');
	assert.ok($sButtonItemsList.hasClass('ui-corner-all'), 'The ui-corner-all class is not applied to the split button items list.');

	// Menu items
	assert.equal($sButtonMenuItems.length, 1, 'The split button did not render the correct number of menu items.');
	assert.ok($sButtonMenuItems.is('li'), 'The split button menu item is not a li element.');
	assert.ok($sButtonMenuItems.hasClass('ui-menu-item'), 'The ui-splitbutton-list class is not applied to the split button items list.');

	// Menu item anchor
	assert.ok($sButtonMenuItemAnchor.length, 'The split button menu item anchor is not rendered.');
	assert.ok($sButtonMenuItemAnchor.is('a'), 'The split button menu item anchor is not an anchor element.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-corner-all'), 'The ui-corner-all class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-button-icon-only'), 'The ui-button-icon-only class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-button'), 'The ui-button class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-igbutton'), 'The ui-igbutton class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-widget'), 'The ui-widget class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-widget-content'), 'The ui-widget-content class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-state-default'), 'The ui-widget-content class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-igtoolbarbutton'), 'The ui-widget-content class is not applied to the split button menu item anchor.');
	assert.ok($sButtonMenuItemAnchor.hasClass('ui-splitbutton-cleargaps'), 'The ui-widget-content class is not applied to the split button menu item anchor.');
	assert.equal($sButtonMenuItemAnchor.attr('aria-disabled'), 'false', 'The aria-disabled attribute on the split button menu item anchor does not match.');
	assert.equal($sButtonMenuItemAnchor.attr('title'), this.secondItemLabel, 'The title attribute on the split button menu item anchor does not match.');
	assert.equal($sButtonMenuItemAnchor.attr('tabindex'), '1', 'The tabindex attribute on the split button menu item anchor does not match.');

	// Menu item picture
	assert.ok($sButtonMenuItemPic.length, 'The split button menu item picture is not rendered.');
	assert.ok($sButtonMenuItemPic.is('span'), 'The split button menu item picture is not a span element.');
	assert.ok($sButtonMenuItemPic.hasClass('ui-button-icon-primary'), 'The ui-button-icon-primary class is not applied to the split button menu item picture.');
	assert.ok($sButtonMenuItemPic.hasClass('ui-icon'), 'The ui-icon class is not applied to the split button menu item picture.');
	assert.ok($sButtonMenuItemPic.hasClass('ui-icon-gear'), 'The ui-icon-gear class is not applied to the split button menu item picture.');

	// Menu item label
	assert.ok($sButtonMenuItemLabel.length, 'The split button menu item label is not rendered.');
	assert.ok($sButtonMenuItemLabel.is('span'), 'The split button menu item label is not a span element.');
	assert.ok($sButtonMenuItemLabel.hasClass('ui-button-text'), 'The ui-button-text class is not applied to the split button menu item label.');
});

QUnit.test('[ID6] igSplitButton default item click', function (assert) {
	assert.expect(2);

	this.assert = assert;
	this.attachSplitBtnEvents(this.firstItemName);

	this.$sButton
		.find(this.iconSelector)
		.click();
});

QUnit.test('[ID7] igSplitButton menu item click', function (assert) {
	assert.expect(2);

	this.assert = assert;
	this.attachSplitBtnEvents(this.secondItemName);

	this.$sButton
		.find(this.menuItemAnchorSelector)
		.click();
});

QUnit.test('[ID8] igSplitButton focus, click and blur events', function (assert) {
	assert.expect(16);

	this.assert = assert;
	var done = assert.async();

	this.attachSplitBtnEvents();
	this.$sButton.find(this.arrowSelector).focus().click().blur();

	$.ig.TestUtil.wait(200).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] igSplitButton double click events', function (assert) {
	assert.expect(16);

	this.assert = assert;
	var done = assert.async();
	this.attachSplitBtnEvents();

	this.$sButton
		.find(this.arrowSelector)
		.focus()
		.click()
		.click();

	$.ig.TestUtil.wait(200).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID10] igSplitButton user click events', function (assert) {
	assert.expect(16);

	this.assert = assert;
	var done = assert.async();
	this.attachSplitBtnEvents();

	this.$sButton.find(this.arrowSelector).click().blur();

	$.ig.TestUtil.wait(200).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID11] igSplitButton press enter events', function (assert) {
	assert.expect(16);

	this.assert = assert;

	this.attachSplitBtnEvents();

	var enterPress = $.Event("keypress", {
		which: 13,
		keyCode: 13,
		originalEvent: {}
	});

	this.$sButton
		.trigger(enterPress)
		.trigger(enterPress);
});

QUnit.test('[ID12] igSplitButton API methods', function (assert) {
	assert.expect(4);

	var itemsList = this.$sButton.find(this.itemsListSelector);

	// Expand
	this.$sButton.igSplitButton("expand");
	assert.ok(this.$sButton.hasClass('ui-state-active'), "The ui-state-active class is not applied to the split button.");
	assert.ok(itemsList.is(':visible'), 'The items list is not shown after expanding.');

	// Collapse
	this.$sButton.igSplitButton("collapse");
	assert.notOk(this.$sButton.hasClass('ui-state-active'), "The ui-state-active class is not applied to the split button.");
	assert.notOk(itemsList.is(':visible'), 'The items list is not hidden after collapsing.');
});

QUnit.test('[ID13] igSplitButton API methods and user interaction', function (assert) {
	assert.expect(10);

	this.attachSplitBtnEvents();
	this.assert = assert;
	var itemsList = this.$sButton.find(this.itemsListSelector),
		done = assert.async(),
		self = this;

	// Expand
	this.$sButton.igSplitButton("expand");
	assert.ok(this.$sButton.hasClass('ui-state-active'), "The ui-state-active class is not applied to the split button.");
	assert.ok(itemsList.is(':visible'), 'The items list is not shown after expanding.');

	this.$sButton.find(this.arrowSelector).blur();
	$.ig.TestUtil.wait(200).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID14] igSplitButton change defaultItemName through options', function (assert) {
	assert.expect(2);

	var defaultItemNameBeforeChange = this.$sButton.igSplitButton("option", "defaultItemName");

	var defaultItemNameNewValue = "defaultItemNameWasChanged"
	this.$sButton.igSplitButton("option", "defaultItemName", defaultItemNameNewValue);

	var defaultItemNameAfterChange = this.$sButton.igSplitButton("option", "defaultItemName");

	assert.notEqual(defaultItemNameBeforeChange, defaultItemNameAfterChange, "The defaultItemName was not changed");
	assert.equal(defaultItemNameNewValue, defaultItemNameAfterChange, "The defaultItemName value is not equal to the new one!");
});

QUnit.test('[ID15] igSplitButton destroy', function (assert) {
	assert.expect(7);

	this.$sButton.igSplitButton("destroy");

	assert.notOk(this.$sButton.is("igSplitButton"), "The widget was not destroyed.");
	assert.notOk(this.$sButton.hasClass('ui-splitbutton'), 'The ui-splitbutton class was not removed from the split button.');
	assert.notOk(this.$sButton.hasClass('ui-widget'), 'The ui-widget class was not removed from the split button.');
	assert.notOk(this.$sButton.hasClass('ui-state-default'), 'The ui-state-default class was not removed from the split button.');
	assert.equal(this.$sButton.children().length, 0, "The children of the split button were not removed.");
	assert.equal(this.$sButton.attr('tabindex'), undefined, 'The tabindex attribute was not removed from the split button.');
	assert.equal($._data(this.$sButton[0], "events"), undefined, 'Some events were not removed from the split button.');
});
