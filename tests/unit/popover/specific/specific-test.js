QUnit.module("Popover specific unit tests", {
	divNav: '<div><nav><ul><li><a>Products</a></li><li><a>Downloads</a></li><li><a>Support</a></li></ul></nav></div>',
	testUtil: $.ig.TestUtil,
	beforeEach: function () {
		$(".ui-menu").css("width", "220px");
		$("nav ul").css({
			"list-style": "none !important",
			"list-style-image": "none"
		});
		$("nav ul li").css({
			"float": "left",
			"display": "inline-block",
			"margin": "auto 4px",
			"padding": "2px",
			"border": "1px solid gray"
		});
		$("nav ul li:hover").css({
			"background-color": "#eee",
			"cursor": "pointer"
		});
	}
});

//bug 192052
QUnit.test("Test popover when initialized on multiple items without ID on the parent", function (assert) {
	this.testUtil.appendToFixture(this.divNav);
	var popover, target, done = assert.async(), self = this;
	$('nav ul').igPopover({
		contentTemplate: function contentFunction() {
			return "<p> Dummy content </p>";
		},
		selectors: "li",
		showOn: "click"
	});
	this.testUtil.wait(200).then(function () {
		target = $("nav > ul > li > a").first();
		target.trigger("click");
		self.testUtil.wait(100).then(function () {
			done();
			popover = $('nav ul').data().igPopover.popover;
			assert.ok(popover.length > 0 && popover.closest(document.documentElement).length > 0 && popover.is(":visible"), "Popover element should exist and should be visible");
		});
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});

});