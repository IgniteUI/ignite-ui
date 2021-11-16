QUnit.module("Runtime locale changes unit tests", {
	assert: null,
	divTag: '<div></div>',
	inputTag: '<input></input>',
	spanTag: '<span></span>',
	ulTag: '<ul></ul>',
	dataSource: [
		{ ID: 1, Name: "John", IsFemale: false },
		{ ID: 2, Name: "Mary", IsFemale: true },
		{ ID: 3, Name: "Bob", IsFemale: false }
	],
	results: [{
		Text: 'Food', Expanded: true, Target: "_blank", Nodes: [
			{
				Text: 'Sandwiches', Nodes: [
					{ Text: 'Ham & Cheese' }
				]
			},
			{ Text: 'Fish' },
			{ Text: 'Hamburgers' },
			{ Text: 'Sishi' },
			{ Text: 'Steaks' }
		]
	},
	{
		Text: 'Beverages', Nodes: [
			{ Text: 'Coke' },
			{ Text: 'Pepsi' },
			{ Text: 'Mountain Dew' },
			{ Text: 'Wine' },
			{ Text: 'Beer' },
			{ Text: 'Lemonade' }
		]
	},
	{
		Text: 'Tech', Nodes: [
			{ Text: 'Laptops' },
			{ Text: 'Desktops' },
			{ Text: 'Tablets' },
			{ Text: 'Smartphones' },
			{ Text: 'Mainframes' }
		]
	},
	{
		Text: 'Literature', Nodes: [
			{ Text: 'Dostoevsky' },
			{ Text: 'Vazov' },
			{ Text: 'Tolstoy' },
			{ Text: 'Goethe' },
			{ Text: 'Stainbeck' }
		]
	},
	{
		Text: 'Accessories', Nodes: [
			{ Text: 'Mouse' },
			{ Text: 'Keyboard' },
			{ Text: 'Microphone' },
			{ Text: 'Camera' },
			{ Text: 'Mousepad' }
		]
	}
	],
	after: function () {
		// restore default locale when done
		$.ig.util.changeGlobalLanguage("en");
	},
	createUpload : function () {
		if ($("#upload_lang").length > 0) {
			$("#upload_lang").remove();
		}
		var upload = $.ig.TestUtil.appendToFixture(this.divTag, { id: "upload_lang" });
		upload.igUpload({
			mode: 'multiple', //Multiple
			autostartupload: false,
			language: "bg"
		});
		return upload;
	},
	checkComboUI: function (combo, lang) {
		// Check drop down button title
		this.assert.equal(combo.find("div.ui-igcombo-button").attr("title"), lang.Combo.dropDownButtonTitle, "Drop-down button title not is localized.");

		// Check clear button('x') title
		this.assert.equal(combo.find("div.ui-igcombo-clear").attr("title"), lang.Combo.clearButtonTitle, "Check clear button title not is localized.");

		// Check placeholder`s text
		this.assert.equal(combo.find("input.ui-igcombo-field").attr("placeholder"), lang.Combo.placeHolder, "Placeholder`s text is not localized");

		// Check 'No match found' text 
		combo.igCombo("filter", "xxx");
		this.assert.equal(combo.igCombo("dropDown").find("li[data-localeid]").text(), lang.Combo.noMatchFoundText, "'No match found' text is not localized.");

		// Check exceptions thrown- for these it should be enough to check _getLocaleValue.
		this.assert.equal(combo.data("igCombo")._getLocaleValue("errorIncorrectGroupingKey"), lang.Combo.errorIncorrectGroupingKey, "Error message is incorrect: errorIncorrectGroupingKey.");
		this.assert.equal(combo.data("igCombo")._getLocaleValue("notSuported"), lang.Combo.notSuported, "Error message is correct: notSuported.");
		this.assert.equal(combo.data("igCombo")._getLocaleValue("errorNoSupportedTextsType"), lang.Combo.errorNoSupportedTextsType, "Error message is incorrect: errorNoSupportedTextsType.");
		this.assert.equal(combo.data("igCombo")._getLocaleValue("errorUnrecognizedHighlightMatchesMode"), lang.Combo.errorUnrecognizedHighlightMatchesMode, "Error message is incorrect: errorUnrecognizedHighlightMatchesMode.");
	},
	checkDialogUI: function (dialog, lang) {
		//Check : 'Close', 'Minimize', 'Pin' /'Unpin'(showPinButton: true), 'Restore' and  'Maximize' buttons titles.
		this.assert.equal(dialog.find("a.ui-igdialog-buttonpin").attr("title"), lang.Dialog.pinButtonTitle, "Pin button is not localized.");
		this.assert.equal(dialog.find("a.ui-igdialog-buttonclose").attr("title"), lang.Dialog.closeButtonTitle, "Close button is not localized.");
		this.assert.equal(dialog.find("a.ui-igdialog-buttonminimize").attr("title"), lang.Dialog.minimizeButtonTitle, "Minimize button is not localized.");

		dialog.find("a.ui-igdialog-buttonpin").click();
		this.assert.equal(dialog.find("a.ui-igdialog-buttonpin").attr("title"), lang.Dialog.unpinButtonTitle, "UnPin button is not localized.");
		dialog.find("a.ui-igdialog-buttonpin").click();

		dialog.find("a.ui-igdialog-buttonminimize").mousedown();
		this.assert.equal(dialog.find("a.ui-igdialog-buttonminimize").attr("title"), lang.Dialog.minimizeButtonTitle, "Maximize button is not localized.");
		dialog.find("a.ui-igdialog-buttonminimize").mousedown();

		//check errors
		this.assert.equal(dialog.data("igDialog")._getLocaleValue("setOptionError"), lang.Dialog.setOptionError, "Error message is incorrect: setOptionError.");
	},
	checkHtmlEditorUI: function (htmlEditor, lang) {
		//check toolbar buttons title
		var toolbars = htmlEditor.find("div.ui-igtoolbars-holder > span.ui-igtoolbar"),
			toolbarButtons = toolbars.find("div[role='button']"),
			self = this;
		toolbarButtons.each(function () {
			var btn = $(this);
			if (btn.attr("data-localeid")) {
				var expectedText = lang.HtmlEditor[btn.attr("data-localeid")];
				self.assert.equal(btn.attr("title"), expectedText, "Button title is not localized.");
			}
		});

		//check editor drop-down button title
		var dropdowns = toolbars.find("div.ui-igcombo");
		dropdowns.each(function () {
			var dd = $(this), btn = dd.find("div.ui-igcombo-button");
			self.assert.equal(btn.attr("title"), lang.Combo[btn.attr("data-localeid")], "Combo button is not localized.");
		});

		//check drop-down editors text
		var fontNameCombo = $("#htmlEditor_lang_toolbars_textToolbar_item_fontFamily");
		var comboData = JSON.stringify(fontNameCombo.igCombo("option", "dataSource").data());
		this.assert.ok(comboData === JSON.stringify(lang.HtmlEditor.fontNames.win) || comboData === JSON.stringify(lang.HtmlEditor.fontNames.mac), "Combo data is localized.");

		var fontSizeCombo = $("#htmlEditor_lang_toolbars_textToolbar_item_fontSize");
		this.assert.equal(JSON.stringify(fontSizeCombo.igCombo("option", "dataSource").data()), JSON.stringify(lang.HtmlEditor.fontSizes), "Combo data is localized.");

		var formatsListCombo = $("#htmlEditor_lang_toolbars_textToolbar_item_formatsList");
		this.assert.equal(JSON.stringify(formatsListCombo.igCombo("option", "dataSource").data()), JSON.stringify(lang.HtmlEditor.formatsList), "Combo data is localized.");

		//check view source button title
		this.assert.equal(htmlEditor.find("div.ui-igbutton-viewsource").attr("title"), lang.HtmlEditor.viewSourceButtonTitle, "View source button is not localized.");
	},
	checkUploadUI: function (upload, lang) {
		//check upload btn text
		var btn = upload.find("button.ui-igstartupbrowsebutton");
		this.assert.equal(btn.attr("title"), lang.Upload.labelUploadButton, "Upload button title is localized.");
		this.assert.equal(btn.text(), lang.Upload.labelUploadButton, "Upload button text is localized.");

		//select file
		var filePicker = $('#upload_lang_ibb_fp'),
			eventFileChange = jQuery.Event("change");

		filePicker.trigger(eventFileChange, { filePath: 'test.xml' });
		//check add button
		btn = upload.find("#upload_lang_bb");
		this.assert.equal(btn.attr("title"), lang.Upload.titleAddFileButton, "Upload Add button title is not localized.");
		this.assert.equal(btn.text(), lang.Upload.labelAddButton, "Upload Add button text is not localized.");

		//check clear all button
		btn = upload.find("button.ui-igupload-button-clear-all");
		this.assert.equal(btn.attr("title"), lang.Upload.titleClearAllButton, "Upload clear all button title is not localized.");
		this.assert.equal(btn.text(), lang.Upload.labelClearAllButton, "Upload clear all button text is not localized.");

		//check cancel button
		var cancelBtn = upload.find("button.ui-igupload-cancel-button");
		this.assert.equal(cancelBtn.attr("title"), lang.Upload.titleCancelUploadButton, "Upload button title is not localized.");

		//check label summary
		var label = upload.find("span.ui-igupload-summaryuploadedfiles-label");
		this.assert.equal(label.text(), lang.Upload.labelSummaryTemplate.replace("{0}", "0").replace("{1}", "1"), "Summary for uploaded files is not localized.");

		//check hide details btn
		var showDetailsBtn = upload.find("a.ui-igupload-showhidedetails-button");
		this.assert.equal(showDetailsBtn.text(), lang.Upload.labelHideDetails, "Hide details button is not localized.");

		//check upload summary button
		var summaryBtn = upload.find(".ui-igupload-summary-button");
		this.assert.equal(summaryBtn.attr("title"), lang.Upload.labelSummaryProgressButtonContinue, "Summary upload button is not localized.");
		this.assert.equal(summaryBtn.text(), lang.Upload.titleSummaryProgressButtonContinue, "Summary upload button is not localized.");

		cancelBtn.click();
		//check done button
		summaryBtn = upload.find(".ui-igupload-summary-button");
		this.assert.equal(summaryBtn.attr("title"), lang.Upload.labelSummaryProgressButtonDone, "Summary upload button is not localized.");
		this.assert.equal(summaryBtn.text(), lang.Upload.titleSummaryProgressButtonDone, "Summary upload button is not localized.");

		//check error
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageMaxSimultaneousFiles"), lang.Upload.errorMessageMaxSimultaneousFiles, "Error message is incorrect: errorMessageMaxSimultaneousFiles.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageValidatingFileExtension"), lang.Upload.errorMessageValidatingFileExtension, "Error message is incorrect: errorMessageValidatingFileExtension.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageDropMultipleFilesWhenSingleModel"), lang.Upload.errorMessageDropMultipleFilesWhenSingleModel, "Error message is incorrect: errorMessageDropMultipleFilesWhenSingleModel.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageMaxUploadedFiles"), lang.Upload.errorMessageMaxUploadedFiles, "Error message is incorrect: errorMessageMaxUploadedFiles.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageTryToStartNonExistingFile"), lang.Upload.errorMessageTryToStartNonExistingFile, "Error message is incorrect: errorMessageTryToStartNonExistingFile.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageOther"), lang.Upload.errorMessageOther, "Error message is incorrect: errorMessageOther.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageGetFileStatus"), lang.Upload.errorMessageGetFileStatus, "Error message is incorrect: errorMessageGetFileStatus.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageCancelUpload"), lang.Upload.errorMessageCancelUpload, "Error message is incorrect: errorMessageCancelUpload.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageTryToRemoveNonExistingFile"), lang.Upload.errorMessageTryToRemoveNonExistingFile, "Error message is incorrect: errorMessageTryToRemoveNonExistingFile.");
		this.assert.equal(upload.data("igUpload")._getLocaleValue("errorMessageAJAXRequestFileSize"), lang.Upload.errorMessageAJAXRequestFileSize, "Error message is incorrect: errorMessageAJAXRequestFileSize.");
	},
	checkVideoPlayerUI: function (videoPlayer, lang) {
		//The igVideoPlayer does not render correctly under headless chrome. Due to this UI testing is currently not possible.

		/*
		//check btns
		var playBtn = videoPlayer.find("#videoPlayer_lang_title_ctrls_play > span.ui-igplayer-playbutton-icon");

		console.log("title:" + playBtn.html());
		equal(playBtn.attr("title"), lang.VideoPlayer.play, "Play button is not localized.");

		//start
		videoPlayer.igVideoPlayer("play");

		var pauseBtn = videoPlayer.find("#videoPlayer_lang_ctrls_play");
		equal(pauseBtn.attr("title"), lang.VideoPlayer.playing, "Pause button is not localized.");
		//pause
		videoPlayer.igVideoPlayer("pause");

		pauseBtn = videoPlayer.find("#videoPlayer_lang_ctrls_play");
		equal(pauseBtn.attr("title"), lang.VideoPlayer.paused, "Pause button is not localized.");

		var volumeBtn = videoPlayer.find("a.ui-igplayer-volumecontrol");
		equal(volumeBtn.attr("title"), lang.VideoPlayer.volume, "Volume button is not localized.");

		var fullScrBtn = videoPlayer.find("a.ui-igplayer-fullscreen-button");
		equal(fullScrBtn.attr("title"), lang.VideoPlayer.enterFullscreen, "Full screen button is not localized.");
		*/

		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("play"), lang.VideoPlayer.play, "String is incorrect: play.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("playing"), lang.VideoPlayer.playing, "String is incorrect: playing.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("paused"), lang.VideoPlayer.paused, "String is incorrect: paused.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("volume"), lang.VideoPlayer.volume, "String is incorrect: paused.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("enterFullscreen"), lang.VideoPlayer.enterFullscreen, "String is incorrect: paused.");

		//check errors
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("nonDivException"), lang.VideoPlayer.nonDivException, "Error message is incorrect: nonDivException.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("unsupportedBrowser"), lang.VideoPlayer.unsupportedBrowser, "Error message is incorrect: unsupportedBrowser.");
		this.assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("unsupportedVideoSource"), lang.VideoPlayer.unsupportedVideoSource, "Error message is incorrect: unsupportedVideoSource.");
	}
});

QUnit.test('[ID1] Loading correct locales when setting language and locale', function (assert) {
	assert.expect(12);

	var $datePicker = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "datepicker" }),
		$numericEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "numeric" });
	$datePicker.igDatePicker({
		buttonType: "spin,clear"
	});

	$numericEditor.igNumericEditor({
		dataMode: "double",
		buttonType: "spin,clear",
		maxValue: 80000
	});

	var locale = $.ig.locale.ja.Editor;
	assert.ok(locale, "The ja locale is not loaded.");
	assert.ok($.ig.Tree.locale, "The tree locale got overwritten");
	assert.notEqual(locale.spinUpperTitle, $.ig.Editor.locale.spinUpperTitle, "The default locale got overwritten");
	assert.equal($datePicker.data("igDatePicker")._getLocaleValue("spinUpperTitle"), $.ig.Editor.locale.spinUpperTitle, "_getLocaleValue returned wrong before setting language");
	$datePicker.igDatePicker("option", "language", "ja");
	assert.equal($datePicker.data("igDatePicker")._getLocaleValue("spinUpperTitle"), locale.spinUpperTitle, "_getLocaleValue returned wrong after setting language for the Date Picker");
	var button = $datePicker.data("igDatePicker")._dropDownButton;
	assert.equal(button.attr("title"), locale.datePickerButtonTitle, "The title attribute should be: " + locale.buttonTitle);
	button = $datePicker.data("igDatePicker")._spinUpButton;
	assert.equal(button.attr("title"), locale.spinUpperTitle, "The title attribute should be: " + locale.spinUpperTitle);
	button = $datePicker.data("igDatePicker")._spinDownButton;
	assert.equal(button.attr("title"), locale.spinLowerTitle, "The title attribute should be: " + locale.spinLowerTitle);
	assert.equal($numericEditor.data("igNumericEditor")._getLocaleValue("spinUpperTitle"), $.ig.Editor.locale.spinUpperTitle, "_getLocaleValue returned wrong before setting language");
	locale = $.ig.locale.bg.Editor;
	$numericEditor.igNumericEditor("option", "locale", locale);
	assert.equal($numericEditor.data("igNumericEditor")._getLocaleValue("spinUpperTitle"), locale.spinUpperTitle, "_getLocaleValue returned wrong before setting language");
	button = $numericEditor.data("igNumericEditor")._spinUpButton;
	assert.equal(button.attr("title"), locale.spinUpperTitle, "The title attribute should be: " + locale.spinUpperTitle);
	button = $numericEditor.data("igNumericEditor")._spinDownButton;
	assert.equal(button.attr("title"), locale.spinLowerTitle, "The title attribute should be: " + locale.spinLowerTitle);
});

QUnit.test('[ID2] Locale lowercase fallback', function (assert) {
	assert.expect(3);
	/* Mock a widget with lowercased locale */
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.Mock = {
		test: "Тест"
	};
	$.ig.mock = $.ig.mock || {};
	$.ig.mock.locale = $.ig.mock.locale || $.ig.locale.bg.Mock;
	$.widget('ui.igMock', $.ui.igWidget, {
		checkLocale: function (key) {
			return this._getLocaleValue(key);
		}
	});
	var $elem = $("<div></div>").igMock({
		language: "en" //force fallback
	});
	assert.equal($elem.igMock("checkLocale", "test"), $.ig.locale.bg.Mock.test, "The locale value should fallback to default");
	$elem.igMock("option", "language", "bg");
	assert.equal($elem.igMock("checkLocale", "test"), $.ig.locale.bg.Mock.test, "The locale value should be corrct");
	$elem.igMock("option", "language", "ja");
	assert.equal($elem.igMock("checkLocale", "test"), $.ig.locale.bg.Mock.test, "The locale value should fallback to default");
	$elem.remove();
});

QUnit.test('[ID3] Changing language globally', function (assert) {
	assert.expect(9);

	var $datePicker = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "datepicker" }),
		$numericEditor = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "numeric" }),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo" }),
		$textEditor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "text" }),
		$checkbox = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "checkbox" }),
		$currency = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "currency" }),
		$dateEditor = $.ig.TestUtil.appendToFixture(this.spanTag, { id: "dateEditor" }),
		$maskEditor = $.ig.TestUtil.appendToFixture(this.spanTag, { id: "maskEditor" }),
		$tree = $.ig.TestUtil.appendToFixture(this.ulTag, { id: "tree" }),
		$tilemanager = $.ig.TestUtil.appendToFixture('<div id="tilemanager"><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div></div>');
	$datePicker.igDatePicker({
		buttonType: "spin,clear"
	});
	$numericEditor.igNumericEditor({
		dataMode: "double",
		buttonType: "spin,clear",
		maxValue: 80000
	});
	$combo.igCombo({
		dataSource: this.dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0,
		mode: 'dropdown',
		multiSelection: {
			enabled: true
		}
	});
	$checkbox.igCheckboxEditor();
	$currency.igCurrencyEditor({
		buttonType: "spin,clear"
	});
	$dateEditor.igDateEditor({
		value: "10/10/2010",
		buttonType: "clear",
		validatorOptions: { required: true, notificationOptions: { mode: "popover" } }
	});
	$maskEditor.igMaskEditor({
		buttonType: "clear",
		value: "AAAAAAAA"
	});
	$textEditor.igTextEditor({
		includeKeys: "abc",
		maxLength: 10,
		selectionOnFocus: "atStart",
		listItems: ["item1", "item2"],
		buttonType: "dropdown,spin,clear",
		preventSubmitOnEnter: true
	});
	$tree.igTree({
		dataSource: this.results
	});
	// $tilemanager.igTileManager({
	// 	animationDuration: 0,
	// 	width: 1000,
	// 	height: 1000
	// });

	var locale = $.ig.locale.bg.Editor;
	$numericEditor.igNumericEditor("option", "locale", locale);
	$.ig.util.changeGlobalLanguage("de");
	assert.equal($datePicker.data("igDatePicker")._getLocaleValue("spinUpperTitle"), $.ig.locale.de.Editor.spinUpperTitle, "_getLocaleValue returned wrong after setting global language");
	assert.equal($numericEditor.data("igNumericEditor")._getLocaleValue("spinUpperTitle"), $.ig.locale.bg.Editor.spinUpperTitle, "_getLocaleValue returned wrong after setting global language but having locale object set spefically for an instance.");
	assert.equal($combo.data("igCombo")._getLocaleValue("noMatchFoundText"), $.ig.locale.de.Combo.noMatchFoundText, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($textEditor.data("igTextEditor")._getLocaleValue("targetNotSupported"), $.ig.locale.de.Editor.targetNotSupported, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($checkbox.data("igCheckboxEditor")._getLocaleValue("targetNotSupported"), $.ig.locale.de.Editor.targetNotSupported, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($currency.data("igCurrencyEditor")._getLocaleValue("targetNotSupported"), $.ig.locale.de.Editor.targetNotSupported, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($dateEditor.data("igDateEditor")._getLocaleValue("targetNotSupported"), $.ig.locale.de.Editor.targetNotSupported, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($maskEditor.data("igMaskEditor")._getLocaleValue("targetNotSupported"), $.ig.locale.de.Editor.targetNotSupported, "_getLocaleValue returned wrong after setting global language.");
	assert.equal($tree.data("igTree")._getLocaleValue("invalidArgumentType"), $.ig.locale.de.Tree.invalidArgumentType, "_getLocaleValue returned wrong after setting global language.");
	// assert.equal($tilemanager.data("igTileManager")._getLocaleValue("setOptionItemsLengthError"), $.ig.locale.de.TileManager.setOptionItemsLengthError, "_getLocaleValue returned wrong after setting global language.");
});

QUnit.test('[ID4] Change language - combo ui tests', function (assert) {
	assert.expect(24);

	this.assert = assert;
	var combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo_lang" });
	combo.igCombo({
		language: "ja",
		dataSource: this.dataSource,
		textKey: 'Name',
		valueKey: 'ID',

		multiSelection: {
			enabled: true
		}
	});

	//check initially set language
	this.checkComboUI(combo, $.ig.locale.ja);

	//check option setter
	combo.igCombo("option", "language", "es");
	this.checkComboUI(combo, $.ig.locale.es);

	combo.data("igCombo")._userPreset = null;
	$.ig.util.changeGlobalLanguage("de");
	this.checkComboUI(combo, $.ig.locale.de);
});

QUnit.test('[ID5] Change language - dialog ui tests', function (assert) {
	assert.expect(18);

	this.assert = assert;
	var dialog = $.ig.TestUtil.appendToFixture(this.divTag, { id: "dialog_lang" });
	dialog.igDialog({
		state: "opened",
		language: "ja",
		showPinButton: true,
		showMinimizeButton: true
	});

	//check initially set language
	this.checkDialogUI(dialog, $.ig.locale.ja);

	//check option setter
	dialog.igDialog("option", "language", "es");
	this.checkDialogUI(dialog, $.ig.locale.es);

	dialog.data("igDialog")._userPreset = null;
	$.ig.util.changeGlobalLanguage("de");
	this.checkDialogUI(dialog, $.ig.locale.de);
});

QUnit.test('[ID6] Change language - html editor ui tests', function (assert) {
	assert.expect(93);

	this.assert = assert;
	var htmlEditor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "htmlEditor_lang" });
	htmlEditor.igHtmlEditor({
		language: "ja"
	});
	//check initially set language
	this.checkHtmlEditorUI(htmlEditor, $.ig.locale.ja);

	//check option setter
	htmlEditor.igHtmlEditor("option", "language", "es");
	this.checkHtmlEditorUI(htmlEditor, $.ig.locale.es);

	htmlEditor.data("igHtmlEditor")._userPreset = null;
	$.ig.util.changeGlobalLanguage("de");
	this.checkHtmlEditorUI(htmlEditor, $.ig.locale.de);
});

QUnit.test('[ID7] Change language -igUpload ui tests', function (assert) {
	assert.expect(69);

	this.assert = assert;
	var upload = this.createUpload();
	//check initially set language
	this.checkUploadUI(upload, $.ig.locale.bg);

	upload = this.createUpload();
	upload.igUpload("option", "language", "es");
	this.checkUploadUI(upload, $.ig.locale.es);

	upload = this.createUpload();
	upload.data("igUpload")._userPreset = null;
	$.ig.util.changeGlobalLanguage("de");
	this.checkUploadUI(upload, $.ig.locale.de);
});

QUnit.test('[ID8] Change language -igVideoPlayer ui tests', function (assert) {
	assert.expect(24);

	this.assert = assert;
	var videoPlayer = $.ig.TestUtil.appendToFixture(this.divTag, { id: "videoPlayer_lang" });
	videoPlayer.igVideoPlayer({
		language: "bg",
		width: 300,
		height: 200,
		sources: [
			"http://medias.jilion.com/sublimevideo/dartmoor.mov", 
			"http://medias.jilion.com/sublimevideo/dartmoor.mp4",
			"http://medias.jilion.com/sublimevideo/dartmoor.webm",
			"http://medias.jilion.com/sublimevideo/dartmoor.ogv"
		],
	});

	//check initially set language
	this.checkVideoPlayerUI(videoPlayer, $.ig.locale.bg);

	//videoPlayer = createPlayer();
	videoPlayer.igVideoPlayer("option", "language", "es");
	this.checkVideoPlayerUI(videoPlayer, $.ig.locale.es);

	//videoPlayer = createPlayer();
	videoPlayer.data("igVideoPlayer")._userPreset = null;
	$.ig.util.changeGlobalLanguage("de");
	this.checkVideoPlayerUI(videoPlayer, $.ig.locale.de);
});

QUnit.test('[ID9] Test change locale option', function (assert) {
	assert.expect(12);

	//combo
	var combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo_locale" });
	combo.igCombo({
		language: "ja",
		dataSource: this.dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		locale: { dropDownButtonTitle: "Custom Title"},
		multiSelection: {
			enabled: true
		}
	});

	// Check drop down button title
	assert.equal(combo.find("div.ui-igcombo-button").attr("title"), "Custom Title", "Drop-down button title should have the value set in the locale.");
	//change runtime
	combo.igCombo("option", "locale", { dropDownButtonTitle: "Custom Title 2"});
	assert.equal(combo.find("div.ui-igcombo-button").attr("title"), "Custom Title 2", "Drop-down button title should have the value set in the locale.");
	//clean
	combo.remove();

	//Editor
	var editor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "editor_locale" });
	editor.igCurrencyEditor({
		buttonType: "spin,clear",
		language: "ja",
		locale: { spinUpperTitle: "Custom Text"}
	});

	assert.equal(editor.data("igCurrencyEditor")._spinUpButton.attr("title"), "Custom Text", "Editor button title should be equal to the set locale value.");
	//change runtime
	editor.igCurrencyEditor("option", "locale", { spinUpperTitle: "Custom Text 2"});
	assert.equal(editor.data("igCurrencyEditor")._spinUpButton.attr("title"), "Custom Text 2", "Editor button title should be equal to the set locale value.");
	//clean
	editor.remove();

	//Dialog
	var dialog = $.ig.TestUtil.appendToFixture(this.divTag, { id: "dialog_locale" });
	dialog.igDialog({
		state: "opened",
		language: "ja",
		showPinButton: true,
		showMinimizeButton: true,
		locale: {pinButtonTitle: "Custom Pin Text"}
	});

	assert.equal(dialog.find("a.ui-igdialog-buttonpin").attr("title"), "Custom Pin Text", "Pin button title should be equal to the set locale value.");
	dialog.igDialog("option", "locale", { pinButtonTitle: "Custom Pin Text 2"});
	assert.equal(dialog.find("a.ui-igdialog-buttonpin").attr("title"), "Custom Pin Text 2", "Pin button title should be equal to the set locale value.");
	//clean
	dialog.remove();

	var upload = $.ig.TestUtil.appendToFixture(this.divTag, { id: "upload_locale" });
		upload.igUpload({
			mode: 'multiple', //Multiple
			autostartupload: false,
			language: "bg",
			locale: {labelUploadButton: "Custom Upload Button text"}
		});

	assert.equal(upload.find("button.ui-igstartupbrowsebutton").text(), "Custom Upload Button text", "Upload button text should be equal to the set locale value.");
	upload.igUpload("option", "locale", { labelUploadButton: "Custom Upload Button text 2"});
	assert.equal(upload.find("button.ui-igstartupbrowsebutton").text(), "Custom Upload Button text 2", "Upload button text should be equal to the set locale value.");
	//clean
	upload.remove();

	//html editor
	var htmlEditor = $.ig.TestUtil.appendToFixture(this.divTag, { id: "htmlEditor_locale" });
	htmlEditor.igHtmlEditor({
		language: "ja",
		locale: {viewSourceButtonTitle:"Custom"}
	});

	//check view source button title
	assert.equal(htmlEditor.find("div.ui-igbutton-viewsource").attr("title"), "Custom", "View source button title should be equal to the set locale value.");
	htmlEditor.igHtmlEditor("option", "locale", { viewSourceButtonTitle: "Custom 2"});
	assert.equal(htmlEditor.find("div.ui-igbutton-viewsource").attr("title"), "Custom 2", "View source button title should be equal to the set locale value.");
	//clean
	htmlEditor.remove();

	var videoPlayer = $.ig.TestUtil.appendToFixture(this.divTag, { id: "videoPlayer_locale" });
	videoPlayer.igVideoPlayer({
			language: "bg",
			width: 300,
			height: 200,
			locale: {play: "Test"}
		});

	assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("play"), "Test", "String is incorrect: play.");
	videoPlayer.igVideoPlayer("option", "locale", { play: "Test 2"});
	assert.equal(videoPlayer.data("igVideoPlayer")._getLocaleValue("play"), "Test 2", "String is incorrect: play.");
	//clean
	videoPlayer.remove();
});
