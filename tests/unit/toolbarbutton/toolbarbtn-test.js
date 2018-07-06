QUnit.module("igToolbarButton unit tests", {
	toolbarButtonSelector: "#toolbar-button",
	toolbarBtn : null,
	beforeEach : function(){
		var toolbarBtnElement = $.ig.TestUtil.appendToFixture('<div></div>', { id: "toolbar-button" });
		toolbarBtnElement.igToolbarButton({});
		this.toolbarBtn = $(this.toolbarButtonSelector).data("ui-igToolbarButton");
	}
});

QUnit.test('[ID1] igToolbarButton _setOptions', function (assert) {
	assert.expect(4);

	assert.ok(this.toolbarBtn.options.allowToggling, "igToolbarButton allowToggling option should be equal to true");
	this.toolbarBtn._setOption("allowToggling", false);
	assert.notOk(this.toolbarBtn.options.allowToggling, "igToolbarButton allowToggling option should be equal to false");

	assert.notOk(this.toolbarBtn.options.isSelected, "igToolbarButton isSelected option should be equal to false");
	this.toolbarBtn._setOption("isSelected", true);
	assert.ok(this.toolbarBtn.options.isSelected, "igToolbarButton isSelected option should be equal to true");
});


QUnit.test('[ID1] igToolbarButton events', function (assert) {
	assert.expect(5);
	
	this.toolbarBtn.options.disabled = true;
	this.toolbarBtn.element.click();
	assert.notOk(this.toolbarBtn.element.hasClass(this.toolbarBtn.options.css.buttonActiveClasses), 'igToolbarButton should not be active');

	this.toolbarBtn.options.disabled = false;
	this.toolbarBtn.element.click();
	assert.ok(this.toolbarBtn.element.hasClass(this.toolbarBtn.options.css.buttonActiveClasses), 'igToolbarButton should be active');

	this.toolbarBtn.options.allowToggling = false;

	this.toolbarBtn.element.mousedown();
	assert.ok(this.toolbarBtn.element.hasClass(this.toolbarBtn.options.css.buttonActiveClasses), 'igToolbarButton mousedown event should be fired');

	this.toolbarBtn.element.mouseup();
	assert.notOk(this.toolbarBtn.element.hasClass(this.toolbarBtn.options.css.buttonHoverClasses), 'igToolbarButton mouseup event should be fired');
	assert.notOk(this.toolbarBtn.element.hasClass(this.toolbarBtn.options.css.buttonActiveClasses), 'igToolbarButton mouseup event should be fired');
});
