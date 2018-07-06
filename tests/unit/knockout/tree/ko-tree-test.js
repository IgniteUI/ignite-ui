QUnit.module("igTree KnockoutJS", {
	util: $.ig.TestUtil,
	tree1Html: `
	<div id="tree1" data-bind="igTree: {
		dataSource: data,
		parentNodeImageClass: 'class1',
		leafNodeImageClass: 'class2',
		bindings: {
			textKey: 'name',
			valueKey: 'id',
			imageUrlKey: 'image',
			navigateUrlKey: 'url',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree2Html: `
	<div id="tree2" data-bind="igTree: {
		dataSource: data,
		parentNodeImageUrl: 'url1',
		leafNodeImageUrl: 'url2',
		bindings: {
			textKey: 'name',
			imageUrlKey: 'image',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree3Html: `
	<div id="tree3" data-bind="igTree: {
		dataSource: nonObservable,
		bindings: {
			textKey: 'name',
			valueKey: 'id',
			imageUrlKey: 'image',
			navigateUrlKey: 'url',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree4Html: `
	<div id="tree4" data-bind="igTree: {
		dataSource: nonObservable,
		bindings: {
			textKey: 'name',
			valueKey: 'id',
			imageUrlKey: 'image',
			navigateUrlKey: 'url',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree5Html: `
	<div id="tree5" data-bind="igTree: {
		dataSource: primaryData,
		bindings: {
			textKey: 'name',
			primaryKey: 'id',
			imageUrlKey: 'image',
			navigateUrlKey: 'url',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree6Html: `
	<div id="tree6" data-bind="igTree: {
		dataSource: primaryData,
		bindings: {
			textKey: 'name',
			primaryKey: 'id',
			imageUrlKey: 'image',
			navigateUrlKey: 'url',
			childDataProperty: 'children'
		}
	}"></div>`,
	tree7Html: `
	<div id="tree7" data-bind="igTree: {
		dataSource: data,
		bindings: {
			textKey: 'name',
			valueKey: 'id',
			imageUrlKey: 'image',
			childDataProperty: 'children',
			nodeContentTemplate: 'Name: \${name}'
		}
	}"></div>`,
	reference1Html: `
	<ul id="reference" data-bind="template: { name: 'data-template', foreach: data }" style="list-style: none"></ul>`,
	reference2Html: `
	<ul id="reference2" data-bind="template: { name: 'data-template', foreach: data()[0].children }" style="list-style: none"></ul>`,
	reference3Html: `
	<ul id="reference3" data-bind="template: { name: 'data-template', foreach: nonObservable }" style="list-style: none"></ul>`,
	reference4Html: `
	<ul id="reference4" data-bind="template: { name: 'data-template', foreach: primaryData }" style="list-style: none"></ul>`,
	reference5Html: `
	<ul id="reference5" data-bind="template: { name: 'data-template', foreach: hierarchicalData2 }" style="list-style: none"></ul>`,
	dataTemplateHtml: `
	<script type="text/html" id="data-template">
		<li>
			<input data-bind="value: name" />
			<input data-bind="value: id" />
			<input data-bind="value: url" />
			<input data-bind="value: image" />
		</li>
	</script>`,
	ItemsViewModel: function () {
		var Item = function (id, name, children, url, image) {
			this.id = ko.observable(id);
			this.name = ko.observable(name);
			this.url = ko.observable(url);
			this.image = ko.observable(image);
			this.children = children;
		};

		this.hierarchicalData = ko.observableArray([
			new Item(1, "One child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(2, "Two child"),
			new Item(3, "Three child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(4, "Four child"),
			new Item(5, "Five child"),
			new Item(6, "Six child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png')
		]);

		this.hierarchicalData2 = ko.observableArray([
			new Item(1, "One child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(2, "Two child"),
			new Item(3, "Three child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(4, "Four child"),
			new Item(5, "Five child"),
			new Item(6, "Six child", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png')
		]);

		// add some items manually
		this.data = ko.observableArray([
			new Item(1, "One description", this.hierarchicalData, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(2, "Two description", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(3, "Three description", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(4, "Four description"),
			new Item(5, "Five description"),
			new Item(6, "Six description", this.hierarchicalData, 'http://google.com', '../../tree/databinding/images/bin_empty.png')
		]);

		this.primaryData = ko.observableArray([
			new Item(1, "One description", this.hierarchicalData2, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(2, "Two description", null, 'http://google.com', '../../tree/databinding/images/bin_empty.png'),
			new Item(3, "Six description", this.hierarchicalData2, 'http://google.com', '../../tree/databinding/images/bin_empty.png')
		]);

		this.nonObservable = ko.observableArray([
			{ name: 'a', id: 1, url: 'http://google.com', image: '../../tree/databinding/images/bin_empty.png' },
			{ name: 'b', id: 2, url: 'http://google.com', image: '../../tree/databinding/images/bin_empty.png' },
			{ name: 'c', id: 3, url: 'http://google.com', image: '../../tree/databinding/images/bin_empty.png' }
		]);

		this.item = Item;
	},
	applyBindings: function () {
		ko.applyBindings(this.model, this.qunitFixture[0]);
	},
	before: function () {
	},
	beforeEach: function () {
		$.fx.off = true;
		this.qunitFixture = $('#qunit-fixture');
		this.model = new this.ItemsViewModel();
	},
	afterEach: function () {
		$.fx.off = false;
		ko.cleanNode(this.qunitFixture[0]);
	},
});

QUnit.test('[01] igTree knockout script loaded test.', function (assert) {
	assert.expect(4);

	assert.ok(typeof (ko.bindingHandlers.igTree) !== 'undefined', 'igTree knockoutJS extention script is not loaded');
	assert.ok(typeof (ko.bindingHandlers.igTree) === 'object', 'igTree knockoutJS extention is of a wrong type');
	assert.ok(typeof (ko.bindingHandlers.igTreeNode) !== 'undefined', 'igTree knockoutJS extention script is not loaded');
	assert.ok(typeof (ko.bindingHandlers.igTreeNode) === 'object', 'igTree knockoutJS extention is of a wrong type');
});

QUnit.test('[02] igTree check if data is accurately attached.', function (assert) {
	assert.expect(15);

	var data,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree5 = $(this.tree5Html).appendTo(this.qunitFixture),
		$tree6 = $(this.tree6Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture);

	this.applyBindings();
	data = ko.dataFor($tree1[0]);

	assert.equal(data.data().length, 6, 'The number of data items differs from the number of items inside the item model.');
	assert.equal(data.data()[0].name(), $('#tree1 li[data-role=node]:first a:first').text(), 'The text of the first node is different from the name of the first data item in the view model.');
	assert.equal(data.data()[0].id(), parseInt($('#tree1 li[data-role=node]:first').attr('data-value'), 10), 'The value of the first node is different from the name of the first data item in the view model.');

	data = ko.dataFor($tree2[0]);
	assert.equal(data.data().length, 6, 'The number of data items differs from the number of items inside the item model.');
	assert.equal(data.data()[0].name(), $('#tree2 li[data-role=node]:first a:first').text(), 'The text of the first node is different from the name of the first data item in the view model.');
	assert.notOk($('#tree2 li[data-role=node]:first').attr('data-value'), 'Value is applied on #tree2 even though it does not have valueKey defined in bindings.');

	data = ko.dataFor($tree7[0]);
	assert.equal(data.data().length, 6, 'The number of data items differs from the number of items inside the item model.');
	assert.equal("Name: " + data.data()[0].name(), $('#tree7 li[data-role=node]:first a:first').text(), 'The text of the first node is different from the name of the first data item in the view model.');
	assert.equal(data.data()[0].id(), parseInt($('#tree7 li[data-role=node]:first').attr('data-value'), 10), 'The value of the first node is different from the name of the first data item in the view model.');

	data = ko.dataFor($tree5[0]);
	assert.equal(data.primaryData().length, 3, 'The number of data items differs from the number of items inside the item model.');
	assert.equal(data.primaryData()[0].name(), $('#tree5 li[data-role=node]:first a:first').text(), 'The text of the first node is different from the name of the first data item in the view model.');
	assert.equal(data.primaryData()[0].id(), parseInt($('#tree5 li[data-role=node]:first').attr('data-path'), 10), 'The value of the first node is different from the name of the first data item in the view model.');

	data = ko.dataFor($tree6[0]);
	assert.equal(data.primaryData().length, 3, 'The number of data items differs from the number of items inside the item model.');
	assert.equal(data.primaryData()[0].name(), $('#tree6 li[data-role=node]:first a:first').text(), 'The text of the first node is different from the name of the first data item in the view model.');
	assert.notOk($('#tree6 li[data-role=node]:first').attr('data-value'), 'Value is applied on #tree2 even though it does not have valueKey defined in bindings.');
});

QUnit.test('[03] igTreeNode check if node data is accurately attached.', function (assert) {
	assert.expect(9);

	var data,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture);

	this.applyBindings();
	data = ko.dataFor($('#tree1 li[data-path=0]')[0]);

	assert.equal(data.name(), 'One description', 'The name data member for the first not did not match.');
	assert.equal(data.id(), 1, 'The name data member for the first not did not match.');
	assert.equal(data.children().length, 6, 'The name data member for the first not did not match.');

	data = ko.dataFor($('#tree1 li[data-path=1]')[0]);
	assert.equal(data.name(), 'Two description', 'The name data member for the first not did not match.');
	assert.equal(data.id(), 2, 'The name data member for the first not did not match.');
	assert.equal(data.children, undefined, 'The name data member for the first not did not match.');

	data = ko.dataFor($('#tree1 li[data-path=0_0]')[0]);
	assert.equal(data.name(), 'One child', 'The name data member for the first not did not match.');
	assert.equal(data.id(), 1, 'The name data member for the first not did not match.');
	assert.equal(data.children, undefined, 'The name data member for the first not did not match.');
});

QUnit.test('[04] igTreeNode check if changes are correctly applied on editing.', function (assert) {
	assert.expect(42);

	var data, node1, node2, node3, node4, node5, node6,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference1 = $(this.reference1Html).appendTo(this.qunitFixture),
		$reference2 = $(this.reference2Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();

	node1 = $('#tree1 > ul > li:first'), node2 = $('#tree2 > ul > li:first'), node3 = $('#tree7 > ul > li:first'), node4, node5, node6;
	assert.equal(node1.children('a').text(), 'One description', 'Text of the first node does not match.');
	assert.equal(node1.attr('data-value'), '1', 'Value of the first node does not match.');
	assert.equal(node2.children('a').text(), 'One description', 'Text of the first node does not match.');
	assert.notOk(node2.attr('data-value'), 'Value of the first node does not match.');
	assert.equal(node3.children('a').text(), 'Name: One description', 'Text of the first node does not match.');
	assert.equal(node3.attr('data-value'), '1', 'Value of the first node does not match.');

	$('#reference li:first input').val(22).change();
	node1 = $('#tree1 > ul > li:first');
	node2 = $('#tree2 > ul > li:first');
	node3 = $('#tree7 > ul > li:first');
	assert.equal(node1.children('a').text(), '22', 'Text of the first node does not match.');
	assert.equal(node1.attr('data-value'), '22', 'Value of the first node does not match.');
	assert.equal(node1.children('a').attr('href'), '22', 'Text of the first node does not match.');
	assert.equal(node1.children('img[data-role=node-image]').attr('src'), '22', 'Value of the first node does not match.');
	assert.equal(node2.children('a').text(), '22', 'Text of the first node does not match.');
	assert.notOk(node2.attr('data-value'), 'Value of the first node does not match.');
	assert.equal(node2.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node2.children('img[data-role=node-image]').attr('src'), '22', 'Value of the first node does not match.');
	assert.equal(node3.children('a').text(), 'Name: 22', 'Text of the first node does not match.');
	assert.equal(node3.attr('data-value'), '22', 'Value of the first node does not match.');
	assert.equal(node3.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node3.children('img[data-role=node-image]').attr('src'), '22', 'Value of the first node does not match.');

	$('#reference2 li:first input').val(33).change();
	node1 = $('#tree1 > ul > li:first li:first');
	node2 = $('#tree1 > ul > li:eq(5) li:first');
	node3 = $('#tree2 > ul > li:first li:first');
	node4 = $('#tree2 > ul > li:eq(5) li:first');
	node5 = $('#tree7 > ul > li:first li:first');
	node6 = $('#tree7 > ul > li:eq(5) li:first');
	assert.equal(node1.children('a').text(), '33', 'Text of the first node does not match.');
	assert.equal(node1.attr('data-value'), '33', 'Value of the first node does not match.');
	assert.equal(node1.children('a').attr('href'), '33', 'Text of the first node does not match.');
	assert.equal(node1.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
	assert.equal(node2.children('a').text(), '33', 'Text of the first node does not match.');
	assert.equal(node2.attr('data-value'), '33', 'Value of the first node does not match.');
	assert.equal(node2.children('a').attr('href'), '33', 'Text of the first node does not match.');
	assert.equal(node2.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
	assert.equal(node3.children('a').text(), '33', 'Text of the first node does not match.');
	assert.notOk(node3.attr('data-value'), 'Value of the first node does not match.');
	assert.equal(node3.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node3.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
	assert.equal(node4.children('a').text(), '33', 'Text of the first node does not match.');
	assert.notOk(node4.attr('data-value'), 'Value of the first node does not match.');
	assert.equal(node4.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node4.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
	assert.equal(node5.children('a').text(), 'Name: 33', 'Text of the first node does not match.');
	assert.equal(node5.attr('data-value'), '33', 'Value of the first node does not match.');
	assert.equal(node5.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node5.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
	assert.equal(node6.children('a').text(), 'Name: 33', 'Text of the first node does not match.');
	assert.equal(node6.attr('data-value'), '33', 'Value of the first node does not match.');
	assert.equal(node6.children('a').attr('href'), '#', 'Text of the first node does not match.');
	assert.equal(node6.children('img[data-role=node-image]').attr('src'), '33', 'Value of the first node does not match.');
});

QUnit.test('igTree add node to top level and to viewmodel', function (assert) {
	assert.expect(47);

	var item, node1, node2, node3,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference1 = $(this.reference1Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();

	item = new this.model.item(10, "View Model Data", this.model.hierarchicalData, 'http://yahoo.com', '../../tree/databinding/images/bin_empty.png');
	this.model.data.push(item);
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 7, '[01] The item was not added to #tree1');
	assert.equal($('#tree1 .ui-igtree-noderoot:eq(6) li').length, 6, '[02] The item children were not added to #tree1');
	assert.equal($('#tree2 .ui-igtree-noderoot').length, 7, '[03] The item was not added to #tree2');
	assert.equal($('#tree2 .ui-igtree-noderoot:eq(6) li').length, 6, '[04] The item children were not added to #tree2');
	assert.equal($('#tree7 .ui-igtree-noderoot').length, 7, '[05] The item was not added to #tree7');
	assert.equal($('#tree7 .ui-igtree-noderoot:eq(6) li').length, 6, '[06] The item children were not added to #tree7');
	$('#reference li:last input').val(55).change();

	node1 = $('#tree1 .ui-igtree-noderoot:eq(6)');
	node2 = $('#tree2 .ui-igtree-noderoot:eq(6)');
	node3 = $('#tree7 .ui-igtree-noderoot:eq(6)');
	assert.equal(node1.children('a').text(), '55', '[07] Text of the first node does not match.');
	assert.equal(node1.attr('data-value'), '55', '[08] Value of the first node does not match.');
	assert.equal(node1.children('a').attr('href'), '55', '[09] Text of the first node does not match.');
	assert.equal(node1.children('img[data-role=node-image]').attr('src'), '55', '[10] Value of the first node does not match.');
	assert.equal(node2.children('a').text(), '55', '[11] Text of the first node does not match.');
	assert.notOk(node2.attr('data-value'), '[12] Value of the first node does not match.');
	assert.equal(node2.children('a').attr('href'), '#', '[13] Text of the first node does not match.');
	assert.equal(node2.children('img[data-role=node-image]').attr('src'), '55', '[14] Value of the first node does not match.');
	assert.equal(node3.children('a').text(), 'Name: 55', '[15] Text of the first node does not match.');
	assert.equal(node3.attr('data-value'), '55', '[16] Value of the first node does not match.');
	assert.equal(node3.children('a').attr('href'), '#', '[17] Text of the first node does not match.');
	assert.equal(node3.children('img[data-role=node-image]').attr('src'), '55', '[18] Value of the first node does not match.');

	item = new this.model.item(5, "Tree Added Data", this.model.hierarchicalData, 'http://yahoo.com', '../../tree/databinding/images/bin_empty.png');
	$('#tree1').igTree('addNode', item);
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 8, '[19] The item was not added to #tree1');
	assert.equal($('#tree1 .ui-igtree-noderoot:eq(7) li').length, 6, '[20] The item children were not added to #tree1');
	assert.equal($('#tree2 .ui-igtree-noderoot').length, 8, '[21] The item was not added to #tree2');
	assert.equal($('#tree2 .ui-igtree-noderoot:eq(7) li').length, 6, '[22] The item children were not added to #tree2');
	assert.equal($('#tree7 .ui-igtree-noderoot').length, 8, '[23] The item was not added to #tree7');
	assert.equal($('#tree7 .ui-igtree-noderoot:eq(7) li').length, 6, '[24] The item children were not added to #tree7');
	assert.equal(this.model.data().length, 8, '[25] ViewModel did not get updated from the tree handler');

	$('#reference li:last input').val(55).change();
	node1 = $('#tree1 .ui-igtree-noderoot:eq(7)');
	node2 = $('#tree2 .ui-igtree-noderoot:eq(7)');
	node3 = $('#tree7 .ui-igtree-noderoot:eq(7)');
	assert.equal(node1.children('a').text(), '55', '[26] Text of the first node does not match.');
	assert.equal(node1.attr('data-value'), '55', '[27] Value of the first node does not match.');
	assert.equal(node1.children('a').attr('href'), '55', '[28] Text of the first node does not match.');
	assert.equal(node1.children('img[data-role=node-image]').attr('src'), '55', '[29] Value of the first node does not match.');
	assert.equal(node2.children('a').text(), '55', '[30] Text of the first node does not match.');
	assert.notOk(node2.attr('data-value'), '[31] Value of the first node does not match.');
	assert.equal(node2.children('a').attr('href'), '#', '[32] Text of the first node does not match.');
	assert.equal(node2.children('img[data-role=node-image]').attr('src'), '55', '[33] Value of the first node does not match.');
	assert.equal(node3.children('a').text(), 'Name: 55', '[34] Text of the first node does not match.');
	assert.equal(node3.attr('data-value'), '55', '[35] Value of the first node does not match.');
	assert.equal(node3.children('a').attr('href'), '#', '[36] Text of the first node does not match.');
	assert.equal(node3.children('img[data-role=node-image]').attr('src'), '55', '[37] Value of the first node does not match.');

	item = new this.model.item(5, "Added at index", this.model.hierarchicalData, 'http://yahoo.com', '../../tree/databinding/images/bin_empty.png');
	$('#tree1').igTree('addNode', item, 3);
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 9, '[38] The item was not added to #tree1');
	assert.equal($('#tree1 .ui-igtree-noderoot:eq(3) li').length, 6, '[39] The item children were not added to #tree1');
	assert.equal($('#tree1 .ui-igtree-noderoot:eq(3) a:first').text(), 'Added at index', '[40] Text does not match #tree1');
	assert.equal($('#tree2 .ui-igtree-noderoot').length, 9, '[41] The item was not added to #tree2');
	assert.equal($('#tree2 .ui-igtree-noderoot:eq(3) li').length, 6, '[42] The item children were not added to #tree2');
	assert.equal($('#tree2 .ui-igtree-noderoot:eq(3) a:first').text(), 'Added at index', '[43] Text does not match #tree2');
	assert.equal($('#tree7 .ui-igtree-noderoot').length, 9, '[44] The item was not added to #tree2');
	assert.equal($('#tree7 .ui-igtree-noderoot:eq(3) li').length, 6, '[45] The item children were not added to #tree2');
	assert.equal($('#tree7 .ui-igtree-noderoot:eq(3) a:first').text(), 'Name: Added at index', '[46] Text does not match #tree2');
	assert.equal(this.model.data().length, 9, '[47] ViewModel did not get updated from the tree handler');
});

QUnit.test('igTree remove node from top level and from viewmodel', function (assert) {
	assert.expect(16);

	var $tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference1 = $(this.reference1Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();

	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree2 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree7 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#reference li').length, 'The number of root nodes and of templated items differs.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 6, 'The number of root nodes is not 6.');

	$('#tree2').igTree('removeAt', '1');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree2 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree7 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#reference li').length, 'The number of root nodes and of templated items differs.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 5, 'The number of root nodes is not 5 after a remove.');

	this.model.data().splice(1, 1);
	this.model.data.valueHasMutated();
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree2 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree7 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#reference li').length, 'The number of root nodes and of templated items differs.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 4, 'The number of root nodes is not 4 after a remove.');

	$('#tree1').igTree('removeAt', '1');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree2 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#tree7 .ui-igtree-noderoot').length, 'The two trees have a different number of root nodes.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, $('#reference li').length, 'The number of root nodes and of templated items differs.');
	assert.equal($('#tree1 .ui-igtree-noderoot').length, 3, 'The number of root nodes is not 3 after a remove.');
});

QUnit.test('igTree add node to child level and to child viewmodel', function (assert) {
	assert.expect(15);

	var children1, children2, children3,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference2 = $(this.reference2Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();

	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]')
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');

	this.model.hierarchicalData.push(new this.model.item(1, 1));
	this.model.hierarchicalData.valueHasMutated();
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 7, 'Child count at node 0 (#tree1) is not one more: 7.');

	$('#tree1').igTree('addNode', new this.model.item(1, 'New child'), $('#tree1 li[data-path=0]'));
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 8, 'Child count at node 0 (#tree1) is not one more: 8.');

	$('#tree2').igTree('addNode', new this.model.item(1, 'New child'), $('#tree2 li[data-path=0]'));
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 9, 'Child count at node 0 (#tree1) is not one more: 9.');
});

QUnit.test('igTree remove node from child level and from viewmodel', function (assert) {
	assert.expect(17);

	var children1, children2, children3,
		$tree1 = $(this.tree1Html).appendTo(this.qunitFixture),
		$tree2 = $(this.tree2Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference2 = $(this.reference2Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();

	this.model.hierarchicalData.splice(0, 1);
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 5, 'Child count at node 0 (#tree1) is not one less: 6.');

	$('#tree1').igTree('removeAt', '0_0');
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 4, 'Child count at node 0 (#tree1) is not one less: 5.');

	$('#tree2').igTree('removeAt', '0_0');
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 3, 'Child count at node 0 (#tree1) is not one less: 4.');

	this.model.hierarchicalData.splice(0, 6);
	children1 = $('#tree1 li[data-path=0]').children('ul').children('li[data-role=node]');
	children2 = $('#tree2 li[data-path=0]').children('ul').children('li[data-role=node]');
	children3 = $('#tree7 li[data-path=0]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference2 li').length, children1.length, 'Child count at node 0 (#tree1) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children2.length, 'Child count at node 0 (#tree2) is not the same as templated node count.');
	assert.equal($('#reference2 li').length, children3.length, 'Child count at node 0 (#tree7) is not the same as templated node count.');
	assert.equal(children1.length, 0, 'Child count at node 0 (#tree1) is not 0.');
	assert.equal($('#tree1 li[data-path=0]').children('span[data-role=expander]').length, 0, "The expand indicator for the node wasn't removed.");
});

QUnit.test('igTree non-observable add/remove', function (assert) {
	assert.expect(4);

	var item,
		$tree3 = $(this.tree3Html).appendTo(this.qunitFixture),
		$tree4 = $(this.tree4Html).appendTo(this.qunitFixture);

	this.applyBindings();

	var item = { name: 'd', id: 4, url: 'http://yahoo.com', image: '../../tree/databinding/images/bin_empty.png' };
	this.model.nonObservable.push(item);
	assert.equal($('#tree3 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree1');
	assert.equal($('#tree4 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree2');

	this.model.nonObservable.splice(0, 1);
	this.model.nonObservable.valueHasMutated();
	assert.equal($('#tree3 .ui-igtree-noderoot').length, 3, 'The item was not added to #tree1');
	assert.equal($('#tree4 .ui-igtree-noderoot').length, 3, 'The item was not added to #tree2');
});

QUnit.test('igTree observable primaryKey', function (assert) {
	assert.expect(42);

	var item, node1, node2, input1, children1, children2,
		$tree5 = $(this.tree5Html).appendTo(this.qunitFixture),
		$tree6 = $(this.tree6Html).appendTo(this.qunitFixture),
		$tree7 = $(this.tree7Html).appendTo(this.qunitFixture),
		$reference4 = $(this.reference4Html).appendTo(this.qunitFixture),
		$reference5 = $(this.reference5Html).appendTo(this.qunitFixture),
		$dataTemplate = $(this.dataTemplateHtml).appendTo(this.qunitFixture);

	this.applyBindings();


	// ValueMutation on change
	item = { name: 'd', id: 4, url: 'http://yahoo.com', image: '../../tree/databinding/images/bin_empty.png' };
	node1 = $('#tree5 > ul > li:first'), node2 = $('#tree6 > ul > li:first');
	input1 = $('#reference4 li:first input:first');
	assert.equal(input1.val(), node1.children('a').text(), "The node text and the templated input value differ.");
	assert.equal(input1.val(), node2.children('a').text(), "The node text and the templated input value differ.");

	input1.val("New desc").change();
	assert.equal(input1.val(), "New desc", "The node text and the templated input value differ.");
	assert.equal(input1.val(), node1.children('a').text(), "The node text and the templated input value differ.");
	assert.equal(input1.val(), node2.children('a').text(), "The node text and the templated input value differ.");

	// Collection mutation on add/remove
	this.model.primaryData.push(item);
	assert.equal($('#tree5 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree5');
	assert.equal($('#tree6 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree6');
	assert.equal($('#reference4 li').length, 4, 'The item was not added to the templated list');

	this.model.primaryData().splice(0, 1);
	this.model.primaryData.valueHasMutated();
	assert.equal($('#tree5 .ui-igtree-noderoot').length, 3, 'The item was not removed from #tree5');
	assert.equal($('#tree6 .ui-igtree-noderoot').length, 3, 'The item was not removed from #tree6');
	assert.equal($('#reference4 li').length, 3, 'The item was not removed from the templated list');

	item = new this.model.item(5, 'abc');
	$('#tree5').igTree('addNode', item);
	assert.equal($('#tree5 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree5');
	assert.equal($('#tree6 .ui-igtree-noderoot').length, 4, 'The item was not added to #tree6');
	assert.equal($('#reference4 li').length, 4, 'The item was not added to the templated list');

	$('#tree5').igTree('removeAt', '2');
	assert.equal($('#tree5 .ui-igtree-noderoot').length, 3, 'The item was not removed from #tree5');
	assert.equal($('#tree6 .ui-igtree-noderoot').length, 3, 'The item was not removed from #tree6');
	assert.equal($('#reference4 li').length, 3, 'The item was not removed from the templated list');

	// ValueMutation on change
	node1 = $('#tree5 > ul > li:first');
	node2 = $('#tree6 > ul > li:first');
	input1 = $('#reference4 li:first input:first');
	assert.equal(input1.val(), node1.children('a').text(), "The node text and the templated input value differ.");
	assert.equal(input1.val(), node2.children('a').text(), "The node text and the templated input value differ.");
	
	input1.val("New desc").change();
	assert.equal(input1.val(), "New desc", "The node text and the templated input value differ.");
	assert.equal(input1.val(), node1.children('a').text(), "The node text and the templated input value differ.");
	assert.equal(input1.val(), node2.children('a').text(), "The node text and the templated input value differ.");
	
	// Collection mutation on add/remove in the child data
	// remove
	children1 = $('#tree5 li[data-path=3]').children('ul').children('li[data-role=node]');
	children2 = $('#tree6 li[data-path=3]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference5 li').length, children1.length, 'Child count at node 0 (#tree5) is not the same as templated node count.');
	assert.equal($('#reference5 li').length, children2.length, 'Child count at node 0 (#tree6) is not the same as templated node count.');
	assert.equal(children2.length, children1.length, 'Child count at node 0 (#tree6) is not the same as child count at node 0 (#tree1).');
	assert.equal(children1.length, 6, 'Child count at node 0 (#tree5) is not one less: 6.');
	
	$('#tree5').igTree('removeAt', '3_1');
	children1 = $('#tree5 li[data-path=3]').children('ul').children('li[data-role=node]');
	children2 = $('#tree6 li[data-path=3]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference5 li').length, children1.length, 'Child count at node 0 (#tree5) is not the same as templated node count.');
	assert.equal($('#reference5 li').length, children2.length, 'Child count at node 0 (#tree6) is not the same as templated node count.');
	assert.equal(children2.length, children1.length, 'Child count at node 0 (#tree6) is not the same as child count at node 0 (#tree1).');
	assert.equal(children1.length, 5, 'Child count at node 0 (#tree5) is not one less: 5.');
	
	$('#tree5').igTree('removeAt', '3_2');
	children1 = $('#tree5 li[data-path=3]').children('ul').children('li[data-role=node]');
	children2 = $('#tree6 li[data-path=3]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference5 li').length, children1.length, 'Child count at node 0 (#tree5) is not the same as templated node count.');
	assert.equal($('#reference5 li').length, children2.length, 'Child count at node 0 (#tree6) is not the same as templated node count.');
	assert.equal(children2.length, children1.length, 'Child count at node 0 (#tree6) is not the same as child count at node 0 (#tree1).');
	assert.equal(children1.length, 4, 'Child count at node 0 (#tree5) is not one less: 4.');
	
	// add
	this.model.hierarchicalData2.push(new this.model.item(1, 1));
	this.model.hierarchicalData2.valueHasMutated();
	children1 = $('#tree5 li[data-path=3]').children('ul').children('li[data-role=node]');
	children2 = $('#tree6 li[data-path=3]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference5 li').length, children1.length, 'Child count at node 0 (#tree5) is not the same as templated node count.');
	assert.equal($('#reference5 li').length, children2.length, 'Child count at node 0 (#tree6) is not the same as templated node count.');
	assert.equal(children2.length, children1.length, 'Child count at node 0 (#tree6) is not the same as child count at node 0 (#tree1).');
	assert.equal(children1.length, 5, 'Child count at node 0 (#tree5) is not one more: 5.');
	
	$('#tree5').igTree('addNode', new this.model.item(2, 'New child'), $('#tree5 li[data-path=3]'));
	children1 = $('#tree5 li[data-path=3]').children('ul').children('li[data-role=node]');
	children2 = $('#tree6 li[data-path=3]').children('ul').children('li[data-role=node]');
	assert.equal($('#reference5 li').length, children1.length, 'Child count at node 0 (#tree5) is not the same as templated node count.');
	assert.equal($('#reference5 li').length, children2.length, 'Child count at node 0 (#tree6) is not the same as templated node count.');
	assert.equal(children2.length, children1.length, 'Child count at node 0 (#tree5) is not the same as child count at node 0 (#tree6).');
	assert.equal(children1.length, 6, 'Child count at node 0 (#tree5) is not one more: 6.');
});
