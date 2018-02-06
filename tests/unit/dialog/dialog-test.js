QUnit.module("igDialog", {
	dialog1: "<div id='dialog1' title='Title of DIV' style='background-color:orange;'>" +
		"<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Content for Dialog1</p>" +
		"</div>",

	dialog2: "<div id='dialog2' title='Title of DIV' style='background-color:orange;'>" +
		"<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Content for Dialog2</p>" +
		"</div>",

	dialog3: "<div id='dialog3' title='Title of DIV' style='background-color:orange;'>" +
		"<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 7px 20px 0;'></span>Content for Dialog3</p>" +
		"</div>",

	dialog4: "<div id='dialog4' title='Focus tracking' style='background-color:orange;'>" +
		"<iframe id='testFrame'></iframe>" +
		"</div>",

	dialog5: "<div id=.dialog5.></div>",
	divTag: "<div>",
	formTag: "<form>",
	inputTag: "<input>",
	util: $.ig.TestUtil,

	beforeEach: function () { },

	afterEach: function () { },

	createDialog: function createDialog(dialogHtml, options) {
		return this.util.appendToFixture(dialogHtml)
			.igDialog(options);
	},

	simulateEvent: function simulateEvent(target, name, options) {
		var event = jQuery.Event(name);
		event.target = target;
		$.extend(event, options);
		$(target).trigger(event);
	},

	getElementDimensions: function getElementDimensions(element) {
		var offset = element.offset(),
			top = offset.top,
			bottom = top + element[0].offsetHeight,
			left = offset.left,
			right = left + element[0].offsetWidth;

		return { top: top, bottom: bottom, left: left, right: right };
	},
});

QUnit.test('[ID1] dialog structure and layout', function (assert) {
	assert.expect(45);

	var elem, main, good, i = 0, dialogName, $dialog;
	this.createDialog(this.dialog1, {
		resizable: false,
		draggable: false,
		imageClass: 'ui-icon ui-icon-info',
		headerText: 'Dialog1 Caption'
	});
	this.createDialog(this.dialog2, {
		showMinimizeButton: true,
		showMaximizeButton: true,
		showFooter: true,
		imageClass: 'ui-icon ui-icon-info',
		headerText: 'Dialog2 Caption'
	});
	this.createDialog(this.dialog3, {
		showMinimizeButton: true,
		showMaximizeButton: true,
		showPinButton: true,
		showFooter: true,
		footerText: 'Footer',
		imageClass: 'ui-icon ui-icon-info',
		headerText: 'Dialog3 Caption'
	});
	while (i++ < 3) {
		dialogName = 'Dialog' + i;

		// find main element
		main = elem = $('#dialog' + i).igDialog('mainElement');
		good = elem && elem.length === 1 && elem[0].nodeName === 'DIV';
		assert.ok(good, dialogName + ' has correct main element');

		elem = main.find('.ui-igdialog-headertext');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN' && elem.html().indexOf('Dialog') === 0;
		assert.ok(good, dialogName + ' has correct caption in header');

		elem = main.find('.ui-icon-alert');
		good = elem && elem.length === 1;
		assert.ok(good, dialogName + ' has correct content');

		elem = main.find('.ui-icon-info');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN';
		assert.ok(good, dialogName + ' has correct imageClass element');

		elem = elem[0].parentNode;
		good = elem && elem.nodeName === 'DIV' && elem.className.indexOf('ui-igdialog-header') >= 0;
		assert.ok(good, dialogName + ' has imageClass element located in its header');

		elem = main.find('.ui-igdialog-close-icon');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN';
		assert.ok(good, dialogName + ' has correct element with close icon');

		elem = elem[0].parentNode;
		good = elem && elem.nodeName === 'A' && elem.className.indexOf('ui-igdialog-headerbutton') >= 0;
		assert.ok(good, dialogName + ' has close icon element located in button');

		elem = elem.parentNode;
		good = elem && elem.nodeName === 'DIV' && elem.className.indexOf('ui-igdialog-header') >= 0;
		assert.ok(good, dialogName + ' has close button located in its header');

		elem = main.find('.ui-igdialog-minimize-icon');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN';
		good = good === (i > 1);
		assert.ok(good, dialogName + ' has(does not have) correct element with minimized icon');

		elem = main.find('.ui-igdialog-maximize-icon');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN';
		good = good === (i > 1);
		assert.ok(good, dialogName + ' has(does not have) correct element with maximized icon');

		elem = main.find('.ui-igdialog-footer');
		good = elem && elem.length === 1 && elem[0].nodeName === 'DIV';
		good = good === (i > 1);
		assert.ok(good, dialogName + ' has(does not have) footer');

		good = elem && elem.html() === 'Footer';
		good = good === (i > 2);
		assert.ok(good, dialogName + ' has(does not have) footer text');

		elem = main.find('.ui-igdialog-pin-icon');
		good = elem && elem.length === 1 && elem[0].nodeName === 'SPAN';
		good = good === (i > 2);
		assert.ok(good, dialogName + ' has(does not have) element with pin icon');

		elem = main.find('.ui-resizable-handle');
		good = elem && elem.length > 3 && main[0].className.indexOf('ui-resizable') >= 0;
		good = good === (i > 1);
		assert.ok(good, dialogName + ' is(is not) resizable');

		good = main[0].className.indexOf('ui-draggable') >= 0;
		good = good === (i > 1);
		assert.ok(good, dialogName + ' is(is not) draggable');
	}
});

QUnit.test('[ID2] dialog actions', function (assert) {
	assert.expect(54);

	var val, elem, main, dialog, good, j, i = 0, parentNodeId;
	this.createDialog(this.dialog1, {
		width: 250,
		height: 250,
	});
	this.createDialog(this.dialog2, {
		width: 250,
		height: 250,
	});
	this.createDialog(this.dialog3, {
		width: 250,
		height: 250,
	});

	while (i++ < 3) {
		dialog = $('#dialog' + i).data('igDialog');
		// find main element
		main = elem = dialog.mainElement();
		//
		val = (elem && elem.length === 1) ? elem[0].offsetWidth : 0;
		good = val >= 250 && val < 260;
		assert.ok(good, 'Dialog' + i + ' has correct width:' + val);

		val = (elem && elem.length === 1) ? elem[0].offsetHeight : 0;
		good = val >= 250 && val < 260;
		assert.ok(good, 'Dialog' + i + ' has correct height:' + val);

		elem = main.find('.ui-igdialog-header');
		val = (elem && elem.length === 1) ? elem[0].offsetHeight : 0;
		good = val >= 25 && val < 50;
		assert.ok(good, 'Dialog' + i + ' has correct height of header:' + val);

		val = dialog.state();
		good = val === 'opened';
		assert.ok(good, 'Dialog' + i + ' has correct state:' + val);

		if (i === 1) {
			dialog.state('closed');
		} else if (i === 2) {
			dialog.close();
		} else {
			dialog._setOption('state', 'closed');
		}
		val = dialog.state();
		good = val === 'closed';
		assert.ok(good, 'Dialog' + i + ' was closed by state:' + val);

		elem = main;
		val = (elem && elem.length === 1) ? elem[0].offsetWidth : 10;
		good = val === 0;
		assert.ok(good, 'Dialog' + i + ' was closed:' + val);

		if (i === 1) {
			dialog.state('maximized');
		} else if (i === 2) {
			dialog.maximize();
		} else {
			dialog._setOption('state', 'maximized');
		}
		val = (elem && elem.length === 1) ? elem.outerHeight() : 0;

		// Height of the dialog is always one or two pixels less then the window height.
		// If the test fails then we can decrease the window height with some more pixels
		good = (val >= $(window).height() - 2);
		assert.ok(good, 'Dialog' + i + ' was maximized:' + val);

		assert.ok(dialog.element.parent().is('body'), "The maximized dialog is not attached to the body.");

		if (i === 1) {
			dialog.state('minimized');
		} else if (i === 2) {
			dialog.minimize();
		} else {
			dialog._setOption('state', 'minimized');
		}
		val = (elem && elem.length === 1) ? elem[0].offsetHeight : 0;
		good = val > 35 && val < 60;
		assert.ok(good, 'Dialog' + i + ' was minimized:' + val);

		elem = main[0].parentNode;
		good = elem && elem.nodeName === 'DIV';
		assert.ok(good, 'Dialog' + i + ' has correct parent');

		if (i === 1) {
			dialog.pin();
		} else {
			dialog._setOption('pinned', true);
		}
		dialog.state('pinned');
		elem = main[0].parentNode;
		good = elem && elem.nodeName === 'DIV';
		assert.ok(good, 'Dialog' + i + ' has correct parent in pinned state');

		if (i === 1) {
			dialog.unpin();
		} else {
			dialog._setOption('pinned', false);
		}
		elem = main[0].parentNode;
		good = elem && elem.nodeName === 'DIV';
		assert.ok(good, 'Dialog' + i + ' got correct parent in unpinned state');

		elem = main;
		if (i === 1) {
			dialog.state('opened');
		} else {
			dialog._setOption('state', 'opened');
		}
		val = (elem && elem.length === 1) ? elem[0].offsetHeight : 0;
		good = val >= 250 && val < 260;
		assert.ok(good, 'Dialog' + i + ' got correct height in normal state:' + val);

		good = !dialog.getTopModal();
		assert.ok(good, 'Dialog' + i + ' is not TopModal');

		good = !dialog.isTopModal();
		assert.ok(good, 'Dialog' + i + ' is not top modal');

		assert.ok(good, 'Dialog' + i + ' is on top:' + val);

		dialog.moveToTop();
		val = main[0].style.zIndex;
		good = true;

		for (j = 1; j < 4; j++) {
			if (j !== i) {
				if ($('#dialog' + j).data('igDialog').mainElement()[0].style.zIndex >= val) {
					good = false;
					break;
				}
			}
		}
		good = val > 0;
		assert.ok(good, 'Dialog' + i + ' is on top:' + val + '. Bad dialog:' + j);
	}
	i = 0;

	parentNodeId = elem[0].parentNode.id
	while (i++ < 3) {
		$('#dialog' + i).data('igDialog').destroy();
		elem = $('#dialog' + i);
		val = elem[0].parentNode.id;
		good = val === parentNodeId;
		assert.ok(good, 'Dialog' + i + ' was destroyed parent:' + val);
	}
});

QUnit.test("[ID3] igDialog API", function (assert) {
	assert.expect(6);

	var $dialog = this.createDialog(this.dialog1),
		content = $dialog.igDialog("content");
	this.util.checkClass(content, "ui-igdialog-content");
	this.util.checkClass(content, "ui-widget-content");
	this.util.checkClass(content, "ui-dialog-content");

	content.html("Content changed.");
	assert.equal($dialog.find(".ui-igdialog-content").html(), "Content changed.", "The content in the igDialog didn't change after being set on the content container retrieved by API.");

	$dialog.igDialog("content", "Content changed again.");
	assert.equal($dialog.find(".ui-igdialog-content").html(), "Content changed again.", "The content in the igDialog didn't change after being set on the content container retrieved by API.");

	$dialog.igDialog("destroy");
	assert.equal($dialog.html(), "Content changed again.", "The content is different than the expected value after destroy.");
});

QUnit.test("[ID4] focus handling", function (assert) {
	assert.expect(1);

	var $dialog = this.createDialog(this.dialog4),
		$frameBody, $input, $header
	done = assert.async();
	$dialog.igDialog("open");
	$frameBody = $("#testFrame").contents().find('body');
	$header = $dialog.find("." + $.ui.igDialog.prototype.css.header.split(" ").join("."));

	$frameBody.html('<input type="text" id="frameInput" value="" />');
	$input = $frameBody.find("#frameInput");

	// focus handler on a 100 timeout... + previous tests
	this.util.wait(250).then(function () {
		assert.ok($header.hasClass($.ui.igDialog.prototype.css.headerFocus), "header doesn't have focus class on open");
		$dialog.igDialog("close");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("[ID5] resizable options", function (assert) {
	assert.expect(8);

	var $dialog = this.createDialog(this.dialog4),
		i,
		settings = ["minWidth", "maxWidth", "minHeight", "maxHeight"],
		newValues = [400, 700, 250, 300];

	// #312 'minWidth', 'maxWidth' and 'maxHeight' options cannot be set at runtime
	$dialog.igDialog("open");

	for (i = 0; i < settings.length; i++) {
		$dialog.igDialog("option", settings[i], newValues[i]);
		// verify option propagated to the resizable widget:
		assert.equal($dialog.resizable("option", settings[i]), newValues[i], "Expected " + settings[i] + " to be " + newValues[i]);
	}

	// with closed dialog all settings are applied at once on open:
	$dialog.igDialog("close");
	newValues = [300, 600, 150, 200];
	for (i = 0; i < settings.length; i++) {
		$dialog.igDialog("option", settings[i], newValues[i]);
	}
	$dialog.igDialog("open");
	for (i = 0; i < settings.length; i++) {
		// verify option propagated to the resizable widget:
		assert.equal($dialog.resizable("option", settings[i]), newValues[i], "Expected " + settings[i] + " to be " + newValues[i]);
	}
});

QUnit.test("[ID6] inner controls/frames", function (assert) {
	var $dialog = this.createDialog(this.dialog4),
		$testFrame = $("#testFrame"),
		$frameBody = $testFrame.contents().find('body'),
		text = "test text";

	// Bug 209633: the internal frame with text mocks and HTML Editor and should not reload on dialog actions
	$testFrame.contents().find('body').text(text);
	$dialog.igDialog("open");

	$dialog.igDialog("minimize").igDialog("pin");
	assert.equal($testFrame.contents().find('body').text(), text, "Internal frame lost its content on pin");

	$dialog.igDialog("minimize").igDialog("unpin");
	assert.equal($testFrame.contents().find('body').text(), text, "Internal frame lost its content on unpin");

	// when the dialog is on body maximize/minimize should retain content without moving
	$dialog.appendTo("body");
	$testFrame.contents().find('body').text(text);
	$dialog.igDialog("maximize");
	assert.equal($testFrame.contents().find('body').text(), text, "Internal frame lost its content on maximize");

	$dialog.igDialog("minimize");
	assert.equal($testFrame.contents().find('body').text(), text, "Internal frame lost its content on minimize");
	$dialog.appendTo("body").igDialog("close");
});

QUnit.test("[ID7] setting mainElement at runtime", function (assert) {
	var $dialog = this.createDialog(this.dialog5),
		objContainer = this.util.appendToFixture("divId");
	try {
		$dialog.igDialog("option", "mainElement", objContainer);
	} catch (e) { }
	assert.equal($dialog.igDialog("option", "mainElement"), null, "mainElement is set at runtime!");
});

QUnit.test("[ID8] modal Dialog with open Animation bug: 230989", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			modal: true,
			closeOnEscape: false,
			draggable: false,
			resizable: false,
			openAnimation: "bounce",
			closeAnimation: "fade",
			width: "350px"
		}),
		done = assert.async();

	this.util.wait(1000).then(function () {
		var zIndexDialog = $dialog.css("z-index"),
			zIndex = $(".ui-igdialog-overlay").css("z-index");

		console.log(zIndexDialog);
		console.log(zIndex);
		assert.equal(parseInt(zIndexDialog), parseInt(zIndex) + 1, "The dialog is not interactable.");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("[ID9] press tab and Esc", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			modal: true,
			trackFocus: false,
			position: [100, 100]
		}),
		dialog = $dialog.data().igDialog;

	this.util.keyInteraction(9, $dialog);
	this.util.keyInteraction(27, $dialog);
	assert.equal(dialog.options.state, "closed", "The dialog is closed");

	$dialog.igDialog("option", "trackFocus", true);
	assert.equal(dialog.options.trackFocus, true, "The dialog's trackFocus is true");
});

QUnit.test("[ID10] restore", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			state: "maximized",
			position: [100, 100]
		}),
		dialog = $dialog.data().igDialog;

	dialog.restore();
	dialog.minimize();
	dialog.restore();

	assert.equal(dialog.options.state, "opened", "The dialog is restored");
});

QUnit.test("[ID11] initizlize Container", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			position: [100, 100]
		}),
		objContainer = this.util.appendToFixture(this.divTag);

	$dialog.igDialog("option", "container");
	$dialog.igDialog("option", "container", "objContainer");
	$dialog.igDialog("option", "container", objContainer);

	this.util.keyInteraction(9, $dialog);
	assert.ok($dialog.igDialog("option", "container").is(objContainer), "Container is set");
});

QUnit.test("[ID12] start minimized and pinned", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			state: "minimized",
			pinned: true,
			position: [100, 100]
		}),
		dialog = $dialog.data().igDialog;

	assert.equal(dialog.options.state, "minimized", "The dialog is minimized");
	assert.equal(dialog.options.pinned, true, "The dialog is pinned");
});

QUnit.test("[ID13] set different options", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			draggable: false,
			resizable: false,
			modal: true,
			trackFocus: false,
			pinned: true,
			showFooter: true,
			position: { left: -50, top: 50 }
		}),
		dialog = $dialog.data().igDialog;

	$dialog.igDialog("option", "draggable", true);
	assert.equal(dialog.options.draggable, true, "The dialog is draggable");

	$dialog.igDialog("option", "resizable", true);
	assert.equal(dialog.options.resizable, true, "The dialog is resizable");

	$dialog.igDialog("option", "modal", false);
	assert.equal(dialog.options.modal, false, "The dialog is not modal");

	$dialog.igDialog("option", "headerText", "Dialog6");
	assert.equal(dialog.options.headerText, "Dialog6", "The dialog's header text is Dialog6");

	$dialog.igDialog("option", "footerText", "footer");
	assert.equal(dialog.options.footerText, "footer", "The dialog has footer");

	$dialog.igDialog("option", "tabIndex", 1);
	assert.equal(dialog.options.tabIndex, 1, "The dialog's tab index is 1");

	$dialog.igDialog("option", "zIndex", 1);
	assert.equal(dialog.options.zIndex, 1, "The dialog's z index is 1");

	$dialog.igDialog("option", "trackFocus", true);
	assert.equal(dialog.options.trackFocus, true, "The dialog's trackFocus is true");
});

QUnit.test("[ID14] header tests", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			draggable: true,
			resizable: true,
			enableDblclick: false,
			position: [100, 100]
		}),
		dialog = $dialog.data().igDialog,
		header = $dialog.find('.ui-igdialog-header'),
		dim = this.getElementDimensions(header),
		vCenter = (dim.top + dim.bottom) / 2,
		resultDim;

	this.simulateEvent(header, "mousemove", { which: 1, pageX: dim.right, pageY: vCenter });
	this.simulateEvent(header, "mousedown", { which: 1, pageX: dim.right, pageY: vCenter });
	this.simulateEvent(header, "mousemove", { which: 1, pageX: dim.right - 10, pageY: vCenter });
	this.simulateEvent(header, "mouseup", { which: 1, pageX: dim.right - 10, pageY: vCenter });

	resultDim = this.getElementDimensions(header);
	assert.equal(resultDim.right, dim.right - 10, "The dialog is positioned correctly");

	$dialog.igDialog("option", "state", "maximized");

	dim = this.getElementDimensions(header);
	vCenter = (dim.top + dim.bottom) / 2;

	this.simulateEvent(header, "mousemove", { which: 1, pageX: dim.right, pageY: vCenter });
	this.simulateEvent(header, "mousedown", { which: 1, pageX: dim.right, pageY: vCenter });
	this.simulateEvent(header, "mousemove", { which: 1, pageX: dim.right + 10, pageY: vCenter });
	this.simulateEvent(header, "mouseup", { which: 1, pageX: dim.right + 10, pageY: vCenter });

	resultDim = this.getElementDimensions($dialog);
	assert.equal(resultDim.right - 1, dim.right, "The dialog is not moved");

	$dialog.igDialog("option", "state", "opened");

	this.simulateEvent(header, "dblclick", { which: 1, pageX: dim.right, pageY: vCenter });
	assert.equal(dialog.options.state, "opened", "The dialog is opened");

	$dialog.igDialog("option", "enableDblclick", true);
	this.simulateEvent(header, "dblclick", { which: 1, pageX: dim.right, pageY: vCenter });
	assert.equal(dialog.options.state, "maximized", "The dialog is maximized");

	$dialog.igDialog("option", "state", "minimized");
	this.simulateEvent(header, "dblclick", { which: 1, pageX: dim.right, pageY: vCenter });
	assert.equal(dialog.options.state, "opened", "The dialog is not opened after being minimized");

	this.simulateEvent(header, "touchstart", { which: 1, pageX: dim.right, pageY: vCenter, originalEvent: { touches: "1" } });
	this.simulateEvent(header, "touchmove", { which: 1, pageX: dim.right + 1, pageY: vCenter, originalEvent: { touches: "1" } });
	this.simulateEvent(header, "touchend", { which: 1, pageX: dim.right + 1, pageY: vCenter, originalEvent: { touches: "1" } });

	$dialog.igDialog("option", "showHeader", false);

	resultDim = this.getElementDimensions(header);
	assert.equal(resultDim.left, 0, "The dialog doesn't have header");
	assert.equal(resultDim.top, 0, "The dialog doesn't have header");
});

QUnit.test("[ID15] resize horizontally", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			draggable: true,
			resizable: true,
			position: [100, 100]
		}),
		dialog = $dialog.data().igDialog,
		seResizer, dialogWidth, resultDim,
		dim, vPoint, xPoint;

	$dialog.igDialog("option", "modal", false);
	dialog.moveToTop();

	seResizer = $dialog.find('.ui-resizable-se'),
		dim = this.getElementDimensions($dialog),
		vPoint = dim.bottom - 3,
		xPoint = dim.right - 3;

	dialogWidth = dialog.options.width;

	this.simulateEvent(seResizer[0], "mouseover", { which: 1, pageX: xPoint, pageY: vPoint });
	this.simulateEvent(seResizer[0], "mousedown", { which: 1, pageX: xPoint, pageY: vPoint });
	this.simulateEvent(seResizer[0], "mousemove", { which: 1, pageX: xPoint - 10, pageY: vPoint });
	this.simulateEvent(seResizer[0], "mouseup", { which: 1, pageX: xPoint, pageY: vPoint });

	resultDim = this.getElementDimensions($dialog);
	assert.equal(dialog.options.width, dialogWidth - 10, "The dialog is resized correctly");
});

QUnit.test("[ID16] inputName", function (assert) {
	var $form = this.util.appendToFixture(this.formTag),
		$input = this.util.appendToFixture(this.inputTag, { name: "input1" }),

		$dialog = this.util.appendToFixture(this.divTag)
			.igDialog({
				inputName: "input1",
				position: [100, 100]
			});

	$dialog.igDialog("option", "inputName", "input2");
	$dialog.igDialog("option", "state", "minimized");

	assert.ok($input[0].value.indexOf("s1:w300") !== -1, "The saved value is correct");
	assert.ok($input[0].value.indexOf("p100,100") !== -1, "The saved value is correct");
});

QUnit.test("[ID17] toPX", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
		.igDialog({
			width: 200,
			height: 200,
			position: [100, 100]
		});

	$dialog.igDialog("option", "width", '20em');
	assert.equal($dialog[0].offsetWidth, 322, "The dialog's width is calculated correctly from 'em'");
});

QUnit.test("[ID18] change locale", function (assert) {
	var $dialog = this.util.appendToFixture(this.divTag)
	$dialog = $("<div></div>")
		.igDialog({
			position: [100, 100]
		}),
		closeButton = $dialog.find('.ui-igdialog-buttonclose');

	assert.equal(closeButton[0].getAttribute('title'), 'Close', "The title of the Close Button is 'Close'");

	$dialog.data().igDialog.options.language = "es";
	$dialog.data().igDialog.changeLocale();

	assert.equal(closeButton[0].getAttribute('title'), 'Cerrar', "The title of the Close Button is localized to 'Cerrar'");
});
