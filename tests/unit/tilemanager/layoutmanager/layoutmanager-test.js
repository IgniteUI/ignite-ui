QUnit.module("igLayoutManager unit tests", {
	divTag: '<div></div>',
	itemArray : [
		{
			width: "10%",
			height: "150px"
		},
		{
			width: "40%",
			height: "250px"
		},
		{
			width: "40%",
			height: "150px"
		},
		{
			width: "20%",
			height: "150px"
		},
		{
			width: "50%",
			height: "150px"
		}
	]
});

QUnit.test('[ID1] igLayoutManager script loading', function (assert) {
	assert.expect(1);

	var layoutManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "layoutmanager" });
	layoutManagerElement.igLayoutManager({
		layoutMode: 'border'
	});

	assert.ok(typeof(layoutManagerElement.igLayoutManager) === 'function', 'igLayoutManager is not defined.');
});

QUnit.test('[ID2] igLayoutManager border layout', function (assert) {
	assert.expect(71);	
	var totalHeight;

	var layoutManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "layoutmanager" });
	layoutManagerElement.css({width: '600px'});
	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		itemRendered: function(evt, args) {
			if (args.region === 'header') {
				args.element.css('background-color', 'red');
			}
			if (args.region === 'footer') {
				args.element.css('background-color', 'green');
			}
			args.element.css({
				'border': '1px solid #000',
				'padding': '20'
			});
		}
	});

	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	assert.equal(layoutManagerElement.children().length, 3, 'The border layout was not initialized with 3 items: header, border container, footer.');
	assert.equal(layoutManagerElement.children('.ig-layout-border-container').children().length, 3, 'The border layout was not initialized with 3 items: left, right, center.');
	assert.equal(layoutManagerElement.find('.ig-layout-border-header').length, 1, 'Header is missing or there is more than one header.');
	assert.equal(layoutManagerElement.find('.ig-layout-border-footer').length, 1, 'Footer is missing or there is more than one footer.');
	assert.equal(layoutManagerElement.find('.ig-layout-border-left').length, 1, 'Left is missing or there is more than one left.');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').length, 1, 'Center is missing or there is more than one center.');
	assert.equal(layoutManagerElement.find('.ig-layout-border-right').length, 1, 'Right is missing or there is more than one right.');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-header'), 'ig-layout-border-item');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-footer'), 'ig-layout-border-item');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-center'), 'ig-layout-border-item');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-left'), 'ig-layout-border-item');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-right'), 'ig-layout-border-item');
	assert.equal(layoutManagerElement.outerWidth(), layoutManagerElement.find('.ig-layout-border-header').outerWidth(), 'The header is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth(), layoutManagerElement.find('.ig-layout-border-footer').outerWidth(), 'The footer is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth(), 600, 'The outer element has grown more than the set pixel value.');
	assert.equal(layoutManagerElement.outerWidth(), layoutManagerElement.find('.ig-layout-border-container').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.2, layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.7, layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.1, layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 'The center holder is with a different width than the containing element');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');
	assert.ok(!layoutManagerElement.hasClass('ig-layout'), 'The rool level class was not removed.');
	
	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		height: 500,
		width: 1000,
		borderLayout: {
			leftWidth: '20%',
			rightWidth: '30%'
		}
	});
	assert.equal(layoutManagerElement.outerWidth() * 0.2, layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.5, layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.3, layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 500, 'The height of the element does not match');
	assert.equal(layoutManagerElement.outerWidth(), 1000, 'The height of the element does not match');
	totalHeight = 0;

	layoutManagerElement.children().each(function () {
	totalHeight += ($(this))[0].offsetHeight;
	
});
	
	assert.equal(totalHeight, 500, 'The height of the children does not match');

	layoutManagerElement.igLayoutManager("option", "borderLayout", {
		leftWidth: '30%',
		rightWidth: '20%'
	});

	assert.equal(layoutManagerElement.outerWidth() * 0.3, layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.5, layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.2, layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 500, 'The height of the element does not match');
	assert.equal(layoutManagerElement.outerWidth(), 1000, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += $(this).outerHeight(true) });
	
	layoutManagerElement.igLayoutManager('destroy')
		.append('<div class="header"></div><div class="footer"></div>')
		.igLayoutManager({
			layoutMode: 'border',
			height: 350,
			borderLayout: {
				leftWidth: '20%',
				rightWidth: '30%'
			}
		});
	assert.equal(layoutManagerElement.outerWidth() * 0.2, layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.5, layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerWidth() * 0.3, layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 350, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 350, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 2, 'The header and footer containers were removed after a destroy.');
	assert.equal(layoutManagerElement.children('.header').attr('class'), 'header', 'The classes were not correctly removed from the header after destroy.');
	assert.equal(layoutManagerElement.children('.footer').attr('class'), 'footer', 'The classes were not correctly removed from the footer after destroy.');
	layoutManagerElement.empty().width(1000).igLayoutManager({
		layoutMode: 'border',
		height: 1000,
		borderLayout: {
			leftWidth: 200,
			rightWidth: 250
		}
	});
	assert.equal(layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 200, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 550, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 250, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 1000, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 1000, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		height: 225,
		borderLayout: {
			leftWidth: 200,
			rightWidth: '15%'
		}
	});
	assert.equal(layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 200, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 650, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 150, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 225, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 225, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		height: 100,
		borderLayout: {
			leftWidth: '30%',
			rightWidth: 150
		}
	});
	assert.equal(layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 300, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 550, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 150, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 100, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 100, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');

	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		height: 100,
		borderLayout: {
			leftWidth: '30%',
			showRight: false
		}
	});
	assert.equal(layoutManagerElement.find('.ig-layout-border-left').outerWidth(), 300, 'The left holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 700, 'The center holder is with a different width than the containing element');
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-right'), 'ig-layout-border-item-hidden');
	assert.equal(layoutManagerElement.outerHeight(), 100, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 100, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');

	layoutManagerElement.igLayoutManager({
		layoutMode: 'border',
		height: 100,
		borderLayout: {
			rightWidth: '30%',
			showLeft: false
		}
	});
	$.ig.TestUtil.checkClass(layoutManagerElement.find('.ig-layout-border-left'), 'ig-layout-border-item-hidden');
	assert.equal(layoutManagerElement.find('.ig-layout-border-center').outerWidth(), 700, 'The center holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.find('.ig-layout-border-right').outerWidth(), 300, 'The right holder is with a different width than the containing element');
	assert.equal(layoutManagerElement.outerHeight(), 100, 'The height of the element does not match');
	totalHeight = 0;
	layoutManagerElement.children().each(function () { totalHeight += ($(this))[0].offsetHeight; });
	assert.equal(totalHeight, 100, 'The height of the children does not match');
	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The containers were not removed after a destroy.');
});


QUnit.test('[ID3] igLayoutManager flow layout', function (assert) {
	assert.expect(56);

	var layoutManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "flow" });
	layoutManagerElement.igLayoutManager({
		layoutMode: "flow",
		items: this.itemArray
	});

	assert.equal(layoutManagerElement.children().length, 5, 'The five items were not rendered in the flow container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-flow');
	var self = this;
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-flow-item');
		assert.equal(self.itemArray[index].width, this.style.width, 'The width of the item does not match the given.');
		assert.equal(self.itemArray[index].height, this.style.height, 'The width of the item does not match the given.');
	});
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-flow'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 0, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: "flow",
		itemCount: 10
	});
	assert.equal(layoutManagerElement.children().length, 10, 'The ten items were not rendered in the flow container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-flow');
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-flow-item');
	});

	layoutManagerElement.igLayoutManager("option", "itemCount", 8);
	assert.equal(layoutManagerElement.children().length, 8, 'The eight items were not rendered in the flow container.');
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-flow'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 0, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.append('<div /><div /><div /><div /><div /><div />').igLayoutManager({
		layoutMode: "flow"
	});
	assert.equal(layoutManagerElement.children().length, 6, 'The five items were not rendered in the flow container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-flow');
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-flow-item');
	});
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-flow'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 6, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: "flow",
		items: [
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"}
		]
	});
	assert.equal(layoutManagerElement.children().length, 5, 'The flow layout container did not clear its children before rendering items.');

	layoutManagerElement.igLayoutManager("option", "items", [
		{width: "20%", height: "150px"},
		{width: "20%", height: "100px"},
		{width: "15%", height: "80px"},
		{width: "20%", height: "100px"}
	]);
	assert.equal(layoutManagerElement.children().length, 4, 'The flow layout container did not clear its children before rendering items.');
	assert.equal(layoutManagerElement.children(":eq(0)").height(), 150, "The height of the first item didn't match.");
	assert.equal(layoutManagerElement.children(":eq(1)").height(), 100, "The height of the second item didn't match.");
	assert.equal(layoutManagerElement.children(":eq(2)").height(), 80, "The height of the third item didn't match.");

	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The flow layout container did not clear its children before rendering items.');
});


QUnit.test('[ID4] igLayoutManager vertical layout', function (assert) {
	assert.expect(56);

	var layoutManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "vertical" });
	layoutManagerElement.igLayoutManager({
		layoutMode: "vertical",
		items: this.itemArray
	});

	assert.equal(layoutManagerElement.children().length, 5, 'The five items were not rendered in the vertical container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-vertical');
	var self = this;
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-vertical-item');
		assert.equal(self.itemArray[index].width, this.style.width, 'The width of the item does not match the given.');
		assert.equal(self.itemArray[index].height, this.style.height, 'The width of the item does not match the given.');
	});
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-vertical'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 0, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: "vertical",
		itemCount: 10
	});
	assert.equal(layoutManagerElement.children().length, 10, 'The ten items were not rendered in the vertical container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-vertical');
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-vertical-item');
	});
	layoutManagerElement.igLayoutManager("option", "itemCount", 8);
	assert.equal(layoutManagerElement.children().length, 8, 'The eight items were not rendered in the vertical container.');
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-vertical'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 0, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.append('<div /><div /><div /><div /><div /><div />').igLayoutManager({
		layoutMode: "vertical"
	});
	assert.equal(layoutManagerElement.children().length, 6, 'The five items were not rendered in the vertical container.');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout');
	$.ig.TestUtil.checkClass(layoutManagerElement, 'ig-layout-vertical');
	layoutManagerElement.children().each(function (index, element) {
		var element = $(this);
		$.ig.TestUtil.checkClass(element, 'ig-layout-vertical-item');
	});
	layoutManagerElement.igLayoutManager('destroy');
	assert.notOk(layoutManagerElement.hasClass('ig-layout'), 'The ig-layout class was not removed on destroy,');
	assert.notOk(layoutManagerElement.hasClass('ig-layout-vertical'), 'The ig-layout class was not removed on destroy,');
	assert.equal(layoutManagerElement.children().length, 6, 'The items were not correctly cleared on destroy.');
	layoutManagerElement.igLayoutManager({
		layoutMode: "vertical",
		items: [
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"},
			{width: "15%", height: "100px"}
		]
	});
	assert.equal(layoutManagerElement.children().length, 5, 'The flow layout container did not clear its children before rendering items.');

	layoutManagerElement.igLayoutManager("option", "items", [
		{width: "20%", height: "150px"},
		{width: "20%", height: "100px"},
		{width: "15%", height: "80px"},
		{width: "20%", height: "100px"}
	]);
	assert.equal(layoutManagerElement.children().length, 4, 'The flow layout container did not clear its children before rendering items.');
	assert.equal(layoutManagerElement.children(":eq(0)").outerHeight(), 150, "The height of the first item didn't match.");
	assert.equal(layoutManagerElement.children(":eq(1)").outerHeight(), 100, "The height of the second item didn't match.");
	assert.equal(layoutManagerElement.children(":eq(2)").outerHeight(), 80, "The height of the third item didn't match.");

	layoutManagerElement.igLayoutManager('destroy');
	assert.equal(layoutManagerElement.children().length, 0, 'The flow layout container did not clear its children before rendering items.');
});

QUnit.test('[ID5] igLayoutManager grid layout', function (assert) {
	assert.expect(19);
	var done = assert.async();

	var layoutManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "grid" });
	layoutManagerElement.css({top: 0, left: 0, position: 'absolute', width : '600px'});
	layoutManagerElement.igLayoutManager({
		layoutMode: 'grid',
		height: 600,
		width: 1000,
		items: [
			{ rowSpan: 1, colSpan: 1 },
			{ rowSpan: 1, colSpan: 1 },
			{ rowSpan: 1, colSpan: 1 },
			{ rowSpan: 1, colSpan: 1 },
			{ rowSpan: 1, colSpan: 1 }
		],
		gridLayout: {
			rows: 3,
			animationDuration : 100
		}
	});
	
	var options = layoutManagerElement.data("igLayoutManager")._opt;
	assert.equal(options.gridLayout.cols, 2, "The columns weren't correctly set");
	assert.equal(layoutManagerElement.children().length, 5, "The items weren't correctly rendered");
	assert.equal(layoutManagerElement.children().first().width(), 490, "The items width wasn't correctly rendered");
	assert.equal(layoutManagerElement.children().first().height(), 190, "The items width wasn't correctly rendered");
	layoutManagerElement.igLayoutManager("option", "width", 800);
	assert.equal(layoutManagerElement.children().eq(2).css("top"), "200px", "The items weren't reflowed");
	layoutManagerElement.igLayoutManager("option", "height", 800);
	assert.equal(layoutManagerElement.children().eq(2).css("top"), "200px", "The items were incorrectly reflowed");
	
	$.ig.TestUtil.wait(150).then(function () {
		assert.equal(layoutManagerElement.children().eq(2).css("top"), "266px", "The items were incorrectly reflowed after animation ends");

		layoutManagerElement.igLayoutManager("option", "gridLayout", {
			columnHeight: 250
		});
	
		options = layoutManagerElement.data("igLayoutManager")._opt;
		assert.equal(options.gridLayout.cols, 2, "The columns weren't correctly set");
		assert.equal(options.gridLayout.rows, 3, "The rows weren't correctly set");
		assert.equal(layoutManagerElement.children().length, 5, "The items weren't correctly rendered");
		assert.equal(layoutManagerElement.children().first().width(), 390, "The items width wasn't correctly rendered");
		assert.equal(layoutManagerElement.children().first().height(), 240, "The items width wasn't correctly rendered");
		layoutManagerElement.igLayoutManager("option", "width", 800);
		assert.equal(layoutManagerElement.children().eq(2).css("top"), "250px", "The items weren't reflowed");
		layoutManagerElement.igLayoutManager("option", "height", 800);
		assert.equal(layoutManagerElement.children().eq(2).css("top"), "250px", "The items were incorrectly reflowed");
	
		layoutManagerElement.igLayoutManager("destroy");
		assert.equal(layoutManagerElement.children().length, 0, 'The grid layout container did not clear its children before rendering items.');
	
		layoutManagerElement.igLayoutManager({
			layoutMode: 'grid',
			height: 600,
			width: 900,
			gridLayout: {
				rows: 3,
				cols: 3
			}
		});
	
		assert.equal(layoutManagerElement.children().length, 9, "The items weren't correctly rendered");
		assert.equal(layoutManagerElement.children().first().outerWidth(), 300, "The items width wasn't correctly rendered");
		assert.equal(layoutManagerElement.children().first().outerHeight(), 200, "The items width wasn't correctly rendered");
	
		layoutManagerElement.igLayoutManager("destroy");
		assert.equal(layoutManagerElement.children().length, 0, 'The grid layout container did not clear its children before rendering items.');
		done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });

});

QUnit.test('[ID6] igLayoutManager grid layoutigLayoutManager grid layout with columsnWidth, columnsHeight and asterisks', function (assert) {
	assert.expect(67);

	var container, lm, gridLayout,
		firstElement, secondElement,
		thirdElement, fourthElement,
		offset;

	var containerElement = $.ig.TestUtil.appendToFixture('<div id="grid-layout"><div class="layout-manager-item red-bk">1</div><div class="layout-manager-item blue-bk">2</div><div class="layout-manager-item orange-bk">3</div><div class="layout-manager-item yellow-bk">4</div></div>');

	container = $('#grid-layout');
	lm = container.igLayoutManager({
		layoutMode: "grid",
		width: "800px",
		height: "500px",
		gridLayout: {
			columnHeight: ["20%", "200px", "*"],
			columnWidth: ["20%", "*", "*"]
		},
		items: [
			{
				rowSpan: 2,
				colSpan: 2,
				colIndex: 0,
				rowIndex: 0
			},
			{
				rowSpan: 1,
				colSpan: 1,
				rowIndex: 0,
				colIndex: 2
			},
			{
				rowSpan: 1,
				colSpan: 1,
				rowIndex: 1,
				colIndex: 2
			},
			{
				rowSpan: 1,
				colSpan: 3,
				colIndex: 0,
				rowIndex: 2
			}
		]
	});
	
	offset = container.igOffset();
	gridLayout = lm.data("igLayoutManager")._opt.gridLayout;
	firstElement = $(gridLayout.elements[0]);
	secondElement = $(gridLayout.elements[1]);
	thirdElement = $(gridLayout.elements[2]);
	fourthElement = $(gridLayout.elements[3]);

	checkGridLayoutItemSize = function (element, elementName, width, height, top, left) {
		assert.equal(element.outerWidth(), width, "The width of the " + elementName + " is not correctly set.");
		assert.equal(element.outerHeight(), height, "The height of the " + elementName + " is not correctly set.");
		assert.equal(element.css("top"), top, "The top of the " + elementName + " not correctly set.");
		assert.equal(element.css("left"), left, "The left of the " + elementName + " is not correctly set.");
	}

	assert.equal(gridLayout.cols, 3, "The columns weren't correctly set");
	assert.equal(gridLayout.rows, 3, "The rows weren't correctly set.");
	assert.equal(gridLayout.elements.length, 4, "The elements weren't correctly set");

	checkGridLayoutItemSize(firstElement, "1st element", 480, 300, offset.top + "px", offset.left + "px");
	checkGridLayoutItemSize(secondElement, "2nd element", 320, 100, offset.top + "px", 480 + offset.left + "px");
	checkGridLayoutItemSize(thirdElement, "3rd element", 320, 200, 100 + offset.top + "px", 480 + offset.left + "px");
	checkGridLayoutItemSize(fourthElement, "4th element", 800, 200, 300 + offset.top + "px", offset.left + "px");

	container.igLayoutManager("option", "gridLayout", {
		columnHeight: ["20%", "200px", "*"],
		columnWidth: "*",
		cols: 3
	});

	checkGridLayoutItemSize(firstElement, "1st element", 532, 300, offset.top + "px", offset.left + "px");
	checkGridLayoutItemSize(secondElement, "2nd element", 266, 100, offset.top + "px", 532 + offset.left + "px");
	checkGridLayoutItemSize(thirdElement, "3rd element", 266, 200, 100 + offset.top + "px", 532 + offset.left + "px");
	checkGridLayoutItemSize(fourthElement, "4th element", 798, 200, 300 + offset.top + "px", offset.left + "px");
	
	container.igLayoutManager("option", "gridLayout", {
		columnHeight: "*",
		columnWidth: ["20%", "*", "*"],
		rows: 3
	});

	checkGridLayoutItemSize(firstElement, "1st element", 480, 332, offset.top + "px", offset.left + "px");
	checkGridLayoutItemSize(secondElement, "2nd element", 320, 166, offset.top + "px", 480 + offset.left + "px");
	checkGridLayoutItemSize(thirdElement, "3rd element", 320, 166, 166 + offset.top + "px", 480 + offset.left + "px");
	checkGridLayoutItemSize(fourthElement, "4th element", 800, 166, 332 + offset.top + "px", offset.left + "px");

	container.igLayoutManager("option", "gridLayout", {
		columnHeight: "*",
		columnWidth: "*",
		rows: 3,
		cols: 3
	});

	checkGridLayoutItemSize(firstElement, "1st element", 532, 332, offset.top + "px", offset.left + "px");
	checkGridLayoutItemSize(secondElement, "2nd element", 266, 166, offset.top + "px", 532 + offset.left + "px");
	checkGridLayoutItemSize(thirdElement, "3rd element", 266, 166, 166 + offset.top + "px", 532 + offset.left + "px");
	checkGridLayoutItemSize(fourthElement, "4th element", 798, 166, 332 + offset.top + "px", offset.left + "px");
});
