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

//bug https://github.com/IgniteUI/ignite-ui/issues/1918
QUnit.test("Test popover when containment, direction and position are specified", function (assert) {
	var divElement = `<div id="containment">
		<input id="right" placeholder="Focus me to show popover to the right" style="width:250px";/>
	</div>`;
	var self = this, done = assert.async(), popover;
	this.testUtil.appendToFixture(divElement);
	$('#containment').css({"background-color": "bisque",
		width: "500px",
		height: "400px",
		margin: "50px 0 0 100px",
		display: "flex",
		"flex-flow": "column",
		"align-items": "center",
		"justify-content": "center"});
	$("#right").igPopover({
		containment: $('#containment'),
		direction: "right",
		position: "end",
		height: 100,
		width: 300,
		showOn: 'focus',
		closeOnBlur: true
	});

	this.testUtil.wait(200).then(function () {
		$("#right").trigger("focus");
		self.testUtil.wait(100).then(function () {
			done();
			popover = $('#right').data("igPopover").popover;
			var containmentRect = $('#containment')[0].getBoundingClientRect();
			assert.ok(popover.length > 0 && popover.closest(document.documentElement).length > 0 && popover.is(":visible"), "Popover element should exist and should be visible");
			assert.ok(popover.position().left > containmentRect.left, "Popover is positioned correctly");
			assert.ok(popover.position().left + popover.outerWidth() < containmentRect.width, `Popover is positioned correctly - left + width: ${popover.position().left + popover.outerWidth()}, containment width: ${containmentRect.width}`);
			assert.ok(popover.position().top > containmentRect.top, "Popover is positioned correctly");
			assert.ok(popover.position().top + popover.outerHeight() < containmentRect.height, `Popover is positioned correctly - top + height: ${popover.position().top + popover.outerHeight()}, containment height: ${containmentRect.height}`);
		});
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});