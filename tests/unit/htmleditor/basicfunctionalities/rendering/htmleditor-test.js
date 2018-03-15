QUnit.module("igHTMLEditor unit tests", {
	assert: null,
	htmlEditor: null,
	htmlEditorId: 'html1',
	editorBody: null,
	createHtmlEditor: function () {
		var self = this;
		this.htmlEditor = $.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId });
		this.htmlEditor.igHtmlEditor({
			rendered: function () {
				var editorDocument = self.htmlEditor.find("iframe").contents();
				self.editorBody = editorDocument.find("body");
				self.editorBody.empty().append($("<p>test</p>", editorDocument[0]));
			}
		});
	},
	bold: function (useExecAction) {
		var callback = function (iframeBody) {
			return ((this.children().first().css("fontWeight") === "bold" ||
				this.children().first().css("fontWeight") === "700") ||
				(this.find("strong:only-child").length) //IE
				||
				(this.children().first().css("fontWeight") === "bold")
			);
		};

		if (useExecAction) {
			this._testExecuteAction("Bold", callback);
		} else {
			this._testToolbarButtonClick("Bold", "", "textToolbar", callback);
		}
	},
	italic: function (useExecAction) {
		var callback = function (iframeBody) {
			return ((this.css("fontStyle") === "italic") ||
				((this.find("em:only-child"))) ||
				(this.children().first().css("fontStyle") === "italic")
			);
		};

		if (useExecAction) {
			this._testExecuteAction("Italic", callback);
		} else {
			this._testToolbarButtonClick("Italic", "", "textToolbar", callback);
		}
	},
	undelined: function (useExecAction) {
		var callback = function (iframeBody) {
			return ((this.css("textDecoration") === "underline") ||
				(this.children().first().css("textDecoration") === "underline") ||
				((this.find("u:only-child")))
			);
		};

		if (useExecAction) {
			this._testExecuteAction("Underline", callback);
		} else {
			this._testToolbarButtonClick("Underline", "", "textToolbar", callback);
		}
	},
	strikethroughed: function (useExecAction) {
		var callback = function (iframeBody) {
			return ((this.css("textDecoration").indexOf("line-through") !== -1) ||
				(this.children().first().css("textDecoration").indexOf("line-through") !== -1) ||
				((this.find("strike:only-child")))
			);
		};

		if (useExecAction) {
			this._testExecuteAction("Strikethrough", callback);
		} else {
			this._testToolbarButtonClick("Strikethrough", "", "textToolbar", callback);
		}
	},
	justifyLeft: function (useExecAction) {
		var callback = function (iframeBody) {
			//Chrome default textAlign value is start.
			return this.css("textAlign") === "left" || this.css("textAlign") === "start";
		};

		if (useExecAction) {
			this._testExecuteAction("justifyleft", callback);
		} else {
			this._testToolbarButtonClick("justifyleft", "", "formattingToolbar", callback);
		}
	},
	justifyCenter: function (useExecAction) {
		var callback = function (iframeBody) {
			return this.css("textAlign") === "center";
		};

		if (useExecAction) {
			this._testExecuteAction("justifycenter", callback);
		} else {
			this._testToolbarButtonClick("justifycenter", "", "formattingToolbar", callback);
		}
	},
	justifyRight: function (useExecAction) {
		var callback = function (iframeBody) {
			return this.css("textAlign") === "right";
		};

		if (useExecAction) {
			this._testExecuteAction("justifyright", callback);
		} else {
			this._testToolbarButtonClick("justifyright", "", "formattingToolbar", callback);
		}
	},
	justifyFull: function (useExecAction) {
		var callback = function (iframeBody) {
			return this.css("textAlign") === "justify";
		};

		if (useExecAction) {
			this._testExecuteAction("justifyfull", callback);
		} else {
			this._testToolbarButtonClick("justifyfull", "", "formattingToolbar", callback);
		}
	},
	insertUnorderedList: function (useExecAction) {
		var callback = function (iframeBody) {
			return (this.parents().length === 0 && iframeBody.find("ul").length === 1 //Mozilla
				||
				this.children(":first").is("ul") // chrome
			);
		};

		if (useExecAction) {
			this._testExecuteAction("InsertUnorderedList", callback);
		} else {
			this._testToolbarButtonClick("InsertUnorderedList", "", "formattingToolbar", callback);
		}
	},
	insertOrderedList: function (useExecAction) {
		var callback = function (iframeBody) {
			return (this.parents().length === 0 && iframeBody.find("ol").length === 1 ||
				this.children(":first").is("ol") // chrome
			);
		};

		if (useExecAction) {
			this._testExecuteAction("InsertOrderedList", callback)
		} else {
			this._testToolbarButtonClick("InsertOrderedList", "", "formattingToolbar", callback);
		}
	},
	indentText: function (useExecAction) {
		var callback = function (iframeBody) {
			return this.css("margin-left") === "40px" || (iframeBody.find("blockquote > p").length === 1 && iframeBody.find("blockquote").css("margin-left") === "40px");
		};

		if (useExecAction) {
			this._testExecuteAction("indent", callback);
		} else {
			this._testToolbarButtonClick("indent", "", "formattingToolbar", callback);
		}
	},
	outdentText: function (useExecAction) {
		var callback = function (iframeBody) {
			return this.css("margin-left") === "0px" || (iframeBody.find("blockquote > p").length === 1 && iframeBody.find("blockquote").css("margin-left") === "0px");
		};

		this.indentText();
		if (useExecAction) {
			this._testExecuteAction("outdent", callback);
		} else {
			this._testToolbarButtonClick("outdent", "", "formattingToolbar", callback);
		}
	},
	colorText: function (useExecAction) {
		var callback = function (iframeBody) {
			return (this.css("color") === "rgb(255, 0, 0)" //Mozilla FF
				||
				this.children(":first").css("color") === "rgb(255, 0, 0)"); //IE, Chtome
		};

		if (useExecAction) {
			this._testExecuteAction("forecolor", callback, 'red');
		} else {
			this._testToolbarButtonClick("textColor", "textColor", "formattingToolbar", callback);
		}
	},
	buttonCombinationsTest: function () {
		var i, buttonsNames = arguments;
		for (i = 0; i < buttonsNames.length; i++) {
			if ($.isFunction(this[buttonsNames[i]])) {
				this[buttonsNames[i]]();
			}
		}
	},
	changeFontName: function (useExecAction) {
		var callback = function () {
			return this.children(":first").css("fontFamily") === "Helvetica";
		};

		if (useExecAction) {
			this._testExecuteAction("fontname", callback, 'Helvetica');
		} else {
			this._testIgCombo("fontFamily", "textToolbar", 3, callback);
		}
	},
	changeFontSize: function (useExecAction) {
		var callback = function () {
			return (this.children(":first").css("fontSize") === "18px" //Chrome, FF
				||
				this.children(":first").css("fontSize") === "18.06px") //IE
		};

		if (useExecAction) {
			this._testExecuteAction("fontSize", callback, 4);
		} else {
			this._testIgCombo("fontSize", "textToolbar", 3, callback);
		}
	},
	changeBackgroundColor: function () {
		var callback = function () {
			return (this.children(":first").css("background-color") === "rgb(255, 0, 0)")
		};
		this._testExecuteAction("backcolor", callback, "red");
	},
	changeBackgroundColorWithInteraction: function () {
		// Test with click button interaction
		var self = this,
			done = this.assert.async(),
			p = this.editorBody.find("p:first"),
			button = $("#" + this.htmlEditorId + "_toolbars_formattingToolbar_item_backgroundTextColor_arrow");

		$.ig.TestUtil.wait(100).then(function () {
			self.htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
			return $.ig.TestUtil.wait(100);
		}).then(function () {
			button.trigger("click");
			return $.ig.TestUtil.wait(100);
		}).then(function () {
			// Click on red color, Red  === 'rgb(255, 0, 0)'
			$($($(".ui-colorpicker-standardcolors")[1]).find(".igColorPicker-color")[1]).click();
			return $.ig.TestUtil.wait(100);
		}).then(function () {
			button.trigger("click");
			return $.ig.TestUtil.wait(300);
		}).then(function () {
			$("#" + this.htmlEditorId + "_toolbars_formattingToolbar_item_backgroundTextColor_backgroundTextColor").click();
			self.assert.ok(p.children().css("background-color") === "rgb(255, 0, 0)", "Selected text background color is changed to red, rgb(255, 0, 0)");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	manipulateDomPathToolbarButton: function () {
		var self = this,
			done = this.assert.async(),
			button = $("#" + this.htmlEditorId + "_toolbars_formattingToolbar_item_backgroundTextColor_arrow"),
			td,
			domPathToolbar,
			viewStateBtn = this.htmlEditor.find(".ui-igbutton-viewsource");

		this.htmlEditor.igHtmlEditor("setContent", "<table border='1'><tbody><tr><td>asd</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><br><br>", "html");
		td = $(self.htmlEditor.igHtmlEditor("contentEditable")).find("table tr:nth-child(1) td:nth-child(1)");

		viewStateBtn.click();

		$.ig.TestUtil.wait(200).then(function () {
			viewStateBtn.click();
			domPathToolbar = $("#" + self.htmlEditorId + "_domPathToolbar");
			$(domPathToolbar.find("span")).click();
			self.assert.ok($(self.htmlEditor).data().igHtmlEditor._selectionWrapperSaved._document !== undefined, "Document was selected by using domPathToolbar");
			done();
		}).catch(function (er) {
			assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	editorResizeWorkspace: function () {
		var newDiv = $.ig.TestUtil.appendToFixture('<div></div>');
		$(this.htmlEditor).appendTo(newDiv);

		$(newDiv).css("display", "none");
		$(this.htmlEditor).data().igHtmlEditor.resizeWorkspace();
		this.assert.equal($(this.htmlEditor.data().igHtmlEditor._toolbars).is(":visible"), false, "Toobars are hidden and resized correctly");

		$(newDiv).css("display", "");
		this.assert.equal($(this.htmlEditor.data().igHtmlEditor._toolbars).is(":visible"), true, "Toobars are shown correctly");
	},
	changeHeadingFormat: function (useExecAction) {
		var callback = function (iframeBody) {
			return !!iframeBody.find("h3").length;
		};

		if (useExecAction) {
			this._testExecuteAction("formatBlock", callback, 'h3');
		} else {
			this._testIgCombo("formatsList", "textToolbar", 2, callback);
		}
	},
	isToolbarCollapsible: function (toolbarId) {
		var toolabrCollapseButton = this.htmlEditorId + "_toolbars_" + toolbarId + "_collapseButton",
			toolbar = $("#" + this.htmlEditorId + "_toolbars_" + toolbarId),
			toolbarWidth = toolbar.width(),
			self = this,
			done = this.assert.async(),
			epsilon = 3; //px

		$("#" + toolabrCollapseButton).click();

		$.ig.TestUtil.wait(300).then(function () {
			self.assert.ok(self.equalWithEpsilon(toolbar.width(), toolbar.height(), epsilon), "The " + toolbarId + " toolbar is collapsed.");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	isToolabrExpandable: function (toolbarId) {
		var toolabrCollapseButton = $("#" + this.htmlEditorId + "_toolbars_" + toolbarId + "_collapseButton"),
			toolbar = $("#" + this.htmlEditorId + "_toolbars_" + toolbarId),
			toolbarWidth = toolbar.width(),
			self = this,
			done = this.assert.async(),
			epsilon = 3; //px

		toolabrCollapseButton.click();

		$.ig.TestUtil.wait(300).then(function () {
			toolabrCollapseButton.click();
			return $.ig.TestUtil.wait(300);
		}).then(function () {
			self.assert.ok(self.equalWithEpsilon(toolbar.width(), toolbarWidth, epsilon), "The " + toolbarId + " toolbar is expanded.");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	equalWithEpsilon: function (a, b, epsilon) {
		return Math.abs(a - b) < epsilon;
	},
	_testExecuteAction: function (actionName, conditionCallBack, param) {
		/*
			Test the result of html toolbar buttons click.
			paramType="string" The name of the button as it is defined in the html editor options.
			paramType="function" return="bool". A callback function which scope is the paragraph jq element which is used for the test.
			paramType="bool"
		*/
		var self = this,
			done = this.assert.async();

		$.ig.TestUtil.wait(200).then(function () {
			var p = self.editorBody.find("p:first");
			self.htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
			self.htmlEditor.igHtmlEditor('executeAction', actionName, param);

			var condition = false;
			if ($.isFunction(conditionCallBack)) {
				condition = conditionCallBack.call(p, self.editorBody);
			}
			self.assert.ok(condition, 'Execute action ' + actionName + " combo.");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_testToolbarButtonClick: function (buttonName, splitButtonName, toolbarName, conditionCallBack) {
		/*
			Test the result of html toolbar buttons click.
			paramType="string" The name of the button as it is defined in the html editor options.
			paramType="function" return="bool". A callback function which scope is the paragraph jq element which is used for the test.
			paramType="bool"
		*/
		var self = this,
			done = this.assert.async(),
			splitButtonName = splitButtonName || "",
			button = $("#" + this.htmlEditorId + "_toolbars_" + toolbarName + "_item_" + ((splitButtonName === "") ? buttonName : splitButtonName + "_" + buttonName));

		$.ig.TestUtil.wait(200).then(function () {
			var p = self.editorBody.find("p:first");
			self.htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
			button.trigger("click");
			var condition = false;
			if ($.isFunction(conditionCallBack)) {
				condition = conditionCallBack.call(p, self.editorBody);
			}
			self.assert.ok(condition, buttonName + " combo.");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_testIgCombo: function (name, toolbarName, index, conditionCallBack) {
		var self = this,
			done = this.assert.async(),
			p = null,
			combo = $("#" + this.htmlEditorId + "_toolbars_" + toolbarName + "_item_" + name)
				.igCombo("option", {
					animationShowDuration: 0,
					animationHideDuration: 0
				});

		combo.bind("igcombodropdownopened", function () {
			combo.igCombo('index', index, null, true);
		});

		$.ig.TestUtil.wait(200).then(function () {
			p = self.editorBody.find("p:first");
			self.htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
			combo.igCombo("openDropDown", null, true, true);
			return $.ig.TestUtil.wait(200);
		}).then(function () {
			var condition = false;
			if ($.isFunction(conditionCallBack)) {
				condition = conditionCallBack.call(p, self.editorBody);
			}
			combo.igCombo("closeDropDown");
			self.assert.ok(condition, name + " combo.");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_openLinkDialog: function () {
		var button = $("#" + this.htmlEditorId + "_toolbars_insertObjectToolbar_item_link"),
			self = this,
			done = this.assert.async(),
			dialog,
			anchorAddress = "http://google.com";

		$.ig.TestUtil.wait(200).then(function () {
			button.trigger("click");

			dialog = $("#" + self.htmlEditorId + "_linkDialog_popover");
			dialog.find("#html1_linkDialog_linkHref").val(anchorAddress).end()
				.find("#html1_linkDialog_btnApply").click();

			// Reopen the dialog
			button.trigger("click");
			dialog.find("#html1_linkDialog_btnCancel").click();

			// Close it with esc Also
			button.trigger("click");
			// Simulate keydown of backspace event
			var escClickEvent = jQuery.Event("keypress", { keyCode: 27 });
			dialog.find("div[id*='_contentInner']").trigger(escClickEvent);

			$("body").on("iglinkpropertiesdialoghide", function () {
				var p = self.editorBody.find("p:first"),
					a = p.find("a");

				self.assert.ok(a.length === 1, "The anchor element is inserted properly.");

				self.assert.ok(a.html() === anchorAddress, "The anchor element display text.");
				self.assert.ok(a.attr("href") === anchorAddress, "The anchor element display text.");
			});
			return $.ig.TestUtil.wait(200);
		}).then(function () {
			button.trigger("click");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_openImageDialog: function () {
		var button = $("#" + this.htmlEditorId + "_toolbars_insertObjectToolbar_item_image"),
			dialog,
			imageURL = "http://www.hausmeisterservice-peukert.de/pictures/baum8.jpg",
			imageAlt = "image test",
			done = this.assert.async(),
			self = this;

		$.ig.TestUtil.wait(200).then(function () {
			button.trigger("click");

			dialog = $("#" + self.htmlEditorId + "_imageDialog_popover");
			dialog.find("#html1_imageDialog_imgSrc").val(imageURL).end()
				.find("#html1_imageDialog_imgAlt").val(imageAlt).end()
				.find("#html1_imageDialog_btnApply").click();

			// Reopen the image dialog
			button.trigger("click");
			dialog.find("#html1_imageDialog_imgSrc").val(imageURL).end()
				.find("#html1_imageDialog_imgAlt").val(imageAlt).end()
				.find("#html1_imageDialog_btnCancel").click();

			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});

		$("#qunit-fixture").on("igimagepropertiesdialoghide", function () {
			var p = self.editorBody.find("p:first"),
				img = p.find("img");
			self.assert.ok(img.length === 1, "The image element is inserted properly.");
			self.assert.ok(img.attr("src") === imageURL, "The image url.");
			self.assert.ok(img.attr("alt") === imageAlt, "The image alt text.");
		})
	},
	_openTableDialog: function () {
		var button = $("#" + this.htmlEditorId + "_toolbars_insertObjectToolbar_item_table"),
			dialog, iframeDocument = $($("#" + this.htmlEditorId).data().igHtmlEditor.workspace).contents(),
			done = this.assert.async(),
			self = this, cell, trCount, tdCount;

		$.ig.TestUtil.wait(200).then(function () {
			button.trigger("click");
			dialog = $("#" + self.htmlEditorId + "_tableDialog_popover");
			cell = dialog.find(".ui-igtablepropertiesdialog-sample-table tr:nth-child(2) td:nth-child(2)")

			cell.trigger("mouseover");
			cell.trigger("mouseout");
			cell.trigger("mouseover");
			cell.click();
			// Reopen the image dialog
			button.trigger("click");

			trStaticCount = 2;
			tdStaticCount = 4;
			return $.ig.TestUtil.wait(300);
		}).then(function () {
			$("#html1").data().igHtmlEditor._selectionWrapperSaved.select(iframeDocument.find("table tr:nth-child(1) td:nth-child(1)"));

			var newTable = document.createElement("TABLE"),
				newRow = newTable.insertRow(0),
				cell1 = newRow.insertCell(0);

			$("#html1").data().igHtmlEditor._selectionWrapperSaved.insertTable($(newTable));
			trCount = iframeDocument.find("table tr").length;
			tdCount = iframeDocument.find("table td").length;

			self.assert.equal(trCount, 3, "Table is inserted crrectly with 3 rows");
			self.assert.equal(tdCount, 5, "Table is inserted crrectly with 5 cells.");
			return $.ig.TestUtil.wait(400);
		}).then(function () {
			$("#html1").data().igHtmlEditor._selectionWrapperSaved.select(iframeDocument.find("table"));

			var newTable = document.createElement("TABLE"),
				newRow = newTable.insertRow(0),
				cell1 = newRow.insertCell(0);

			$("#html1").data().igHtmlEditor._selectionWrapperSaved.insertTable($(newTable));
			trCount = iframeDocument.find("table tr").length;
			tdCount = iframeDocument.find("table td").length;

			self.assert.equal(trCount, 1, "Table is cleared");
			self.assert.equal(tdCount, 1, "Table is cleared");
			return $.ig.TestUtil.wait(500);
		}).then(function () {
			$("#html1").igHtmlEditor('setContent', '<br />', 'html');
			$("#html1").data().igHtmlEditor._selectionWrapperSaved.select(iframeDocument.find("br"));

			var newTable = document.createElement("TABLE"),
				newRow = newTable.insertRow(0),
				cell1 = newRow.insertCell(0);

			$("#html1").data().igHtmlEditor._selectionWrapperSaved.insertTable($(newTable));
			trCount = iframeDocument.find("table tr").length;
			tdCount = iframeDocument.find("table td").length;

			self.assert.equal(trCount, 1, "Table is cleared");
			self.assert.equal(tdCount, 1, "Table is cleared");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});

		$("#qunit-fixture").on("igtablepropertiesdialoghide", function () {
			trCount = iframeDocument.find("table tr").length;
			tdCount = iframeDocument.find("table td").length;

			self.assert.equal(trCount, 2, "Table is inserted crrectly with 2 rows");
			self.assert.equal(tdCount, 4, "Table is inserted crrectly with 4 cells.");
		});
	},
	_addRemoveRowsColumns: function () {
		var htmlEditor = $("#" + this.htmlEditorId),
			self = this,
			addRowButton = $("#" + this.htmlEditorId + "_toolbars_insertObjectToolbar_item_addRow"),
			addColumnButton = $("#" + this.htmlEditorId + "_toolbars_insertObjectToolbar_item_addColumn"),
			dialog, iframeDocument = $($("#" + this.htmlEditorId).data().igHtmlEditor.workspace).contents(),
			viewStateBtn = htmlEditor.find(".ui-igbutton-viewsource"),
			done = this.assert.async();

		htmlEditor.igHtmlEditor("setContent", "<table border='1'><tbody><tr><td>asd</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><br><br>", "html");

		$.ig.TestUtil.wait(100).then(function () {
			var trCount, tdCount, td;

			// When <table> element is selected
			// Add table row
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select($(htmlEditor.igHtmlEditor("contentEditable")).find("table"));
			htmlEditor.data().igHtmlEditor._addTableRowPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 3, "Table is inserted crrectly with 3 rows, trCount " + trCount);
			self.assert.ok(tdCount === 6, "Table is inserted crrectly with 6 cells, tdCount " + tdCount);

			// Add table column for table selector
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select($(htmlEditor.igHtmlEditor("contentEditable")).find("table"));
			htmlEditor.data().igHtmlEditor._addTableColumnPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 3, "Table is modified crrectly with 3 rows, trCount " + trCount);
			self.assert.ok(tdCount === 9, "Table is modified crrectly with 9 cells, tdCount " + tdCount);

			// Remove table row for table selector
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select($(htmlEditor.igHtmlEditor("contentEditable")).find("table"));
			htmlEditor.data().igHtmlEditor._removeTableRowPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 2, "Table is modified crrectly with 3 rows, trCount " + trCount);
			self.assert.ok(tdCount === 6, "Table is modified crrectly with 6 cells, tdCount " + tdCount);

			// Remove table column for table selector
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select($(htmlEditor.igHtmlEditor("contentEditable")).find("table"));
			htmlEditor.data().igHtmlEditor._removeTableColumnPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 2, "Table is modified crrectly with 1 rows, trCount " + trCount);
			self.assert.ok(tdCount === 4, "Table is modified crrectly with 3 cells, tdCount " + tdCount);

			// When <td> element is selected
			// Add table row
			td = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr:nth-child(1) td:nth-child(1)")

			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(td);
			htmlEditor.data().igHtmlEditor._addTableRowPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 3, "Table is modified crrectly with 2 rows, trCount " + trCount);
			self.assert.ok(tdCount === 6, "Table is modified crrectly with 6 cells, tdCount " + tdCount);

			// Add table column for td selector
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(td);
			htmlEditor.data().igHtmlEditor._addTableColumnPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 3, "Table is modified crrectly with 2 rows, trCount " + trCount);
			self.assert.ok(tdCount === 9, "Table is modified crrectly with 8 cells, tdCount " + tdCount);

			// Remove table row for td selector
			td = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr:nth-child(1) td:nth-child(1)");
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(td);
			htmlEditor.data().igHtmlEditor._removeTableRowPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 2, "Table is modified crrectly with 3 rows, trCount " + trCount);
			self.assert.ok(tdCount === 6, "Table is modified crrectly with 6 cells, tdCount " + tdCount);

			// Remove table column for td selector
			td = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr:nth-child(1) td:nth-child(1)");
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(td);
			htmlEditor.data().igHtmlEditor._removeTableColumnPlg();

			trCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table tr").length;
			tdCount = $(htmlEditor.igHtmlEditor("contentEditable")).find("table td").length;

			self.assert.ok(trCount === 2, "Table is modified crrectly with 1 rows, trCount " + trCount);
			self.assert.ok(tdCount === 4, "Table is modified crrectly with 3 cells, tdCount " + tdCount);

			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_testSelectionFunctionality: function () {
		var htmlEditor = $("#" + this.htmlEditorId),
			iframeDocument = $($("#" + this.htmlEditorId).data().igHtmlEditor.workspace).contents(),
			done = this.assert.async(),
			self = this;
		$.ig.util.isIE = true;


		htmlEditor.igHtmlEditor("setContent", "<i>Some content</i>", "html");

		$.ig.TestUtil.wait(200).then(function () {
			contentToSelect = $(htmlEditor.igHtmlEditor("contentEditable")).parent().find("body i");
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved._getTextNodesOnlyCallback();
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(contentToSelect.contents());

			$.browser = { "IE": "IE" };
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved._commands.insertunorderedlist.browsers = ["IE", "Chrome"];
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.execCommand("insertunorderedlist", null);
			self.assert.equal(htmlEditor.igHtmlEditor("getContent", "html"), '<ul><li><i>Some content</i><br></li></ul>', "Content changed to have unordered list");

			$.browser = undefined;
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.execCommand("insertunorderedlist", null);
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.execCommand("bold", null);

			self.assert.equal(htmlEditor.igHtmlEditor("getContent", "html"), '<i style=\"font-weight: bold;\">Some content</i><br>', "Content remains the same");
			return $.ig.TestUtil.wait(300);
		}).then(function () {
			htmlEditor.igHtmlEditor("setContent", "<div id='div1'>Some content1<div>Some content2<div>Some content3<div><div><div>", "html");
			contentToSelect = $(htmlEditor.igHtmlEditor("contentEditable")).parent().find("body #div1");
			htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(contentToSelect.contents());
			var nodes = htmlEditor.data("igHtmlEditor")._selectionWrapperSaved._findAllTextNodes(contentToSelect);
			self.assert.equal(nodes.length, 3, "Three nodes are returned");

			return $.ig.TestUtil.wait(300);
		}).then(function () {
			htmlEditor.igHtmlEditor("setContent", "<div id='div1'>Some new content<div>", "html");
			contentToWrap = $(htmlEditor.igHtmlEditor("contentEditable")).parent().find("body #div1");

			var textNode = htmlEditor.data("igHtmlEditor")._selectionWrapperSaved._wrapPartialString("Some", 2, 6, contentToWrap);
			self.assert.equal($($(textNode)[0]).text() + $($(textNode)[1]).text(), "Some", "Text node returned");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	},
	_testInsertElement: function () {
		var htmlEditor = $("#" + this.htmlEditorId),
			iframeDocument = $($("#" + this.htmlEditorId).data().igHtmlEditor.workspace).contents(),
			done = this.assert.async(),
			self = this;
		$.ig.util.isIE = true;

		htmlEditor.igHtmlEditor("setContent", "<div id='div1'>Some content1<div><p id='div2'>Some content2<p>", "html");
		contentToSelect = $(htmlEditor.igHtmlEditor("contentEditable")).parent().find("body #div1");

		$.ig.TestUtil.wait(200).then(function () {
			$("#" + self.htmlEditorId).data().igHtmlEditor._analyser._disableTableControls(false);
			var surroundContentsDiv = $($("#" + self.htmlEditorId).igHtmlEditor("contentEditable")).parent().find("body #div2");
			$("#" + self.htmlEditorId).data("igHtmlEditor")._selectionWrapperSaved.select(contentToSelect.contents());

			$("#" + self.htmlEditorId).data("igHtmlEditor")._selectionWrapperSaved.insertElement(surroundContentsDiv);
			$("#" + self.htmlEditorId).data("igHtmlEditor")._selectionWrapperSaved.getSelectedItem();

			self.assert.equal($("#" + self.htmlEditorId).igHtmlEditor("getContent", "html"), '<div id=\"div1\"><p id=\"div2\">Some content2</p>Some content1<div><p></p></div></div>', "Node inserted");
			done();
		}).catch(function (er) {
			self.assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	}
});

QUnit.test('[ID1] igHtmlEditor interaction tests - Bold', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.bold();
});

QUnit.test('[ID2] igHtmlEditor interaction tests - Execute Action Bold', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.bold(true);
});

QUnit.test('[ID3] igHtmlEditor interaction tests - Italic', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.italic();
});

QUnit.test('[ID4] igHtmlEditor interaction tests - Execute Action Italic', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.italic(true);
});

QUnit.test('[ID5] igHtmlEditor interaction tests - Underline', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.undelined();
});
QUnit.test('[ID6] igHtmlEditor interaction tests - Execute Action Underline', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.undelined(true);
});

QUnit.test('[ID7] igHtmlEditor interaction tests - Strikethroug', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.strikethroughed();
});
QUnit.test('[ID8] igHtmlEditor interaction tests - Execute Action Strikethrough', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.strikethroughed(true);
});

QUnit.test('[ID9] igHtmlEditor interaction tests - "Bold, Italic, Underline, Strikethrough', function (assert) {
	assert.expect(4);
	this.assert = assert;

	this.createHtmlEditor();
	this.buttonCombinationsTest("bold", "italic", "undelined", "strikethroughed");
});

QUnit.test('[ID10] igHtmlEditor interaction tests - Align Text Right', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyRight();
});

QUnit.test('[ID11] igHtmlEditor interaction tests - Execute Action Align Text Right', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyRight(true);
});

QUnit.test('[ID12] igHtmlEditor interaction tests - Align Text Left', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyLeft();
});

QUnit.test('[ID13] igHtmlEditor interaction tests - Execute Action Align Text Left', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyLeft(true);
});

QUnit.test('[ID14] igHtmlEditor interaction tests - Align Text Center', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyCenter();
});

QUnit.test('[ID15] igHtmlEditor interaction tests - Execute Action Align Text Center', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyCenter(true);
});

QUnit.test('[ID16] igHtmlEditor interaction tests - Justify Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyFull();
});

QUnit.test('[ID17] igHtmlEditor interaction tests - Execute Action Justify Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.justifyFull(true);
});

QUnit.test('[ID18] igHtmlEditor interaction tests - Insert Unordered List', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.insertUnorderedList();
});

QUnit.test('[ID19] igHtmlEditor interaction tests - Execute Action Insert Unordered List', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.insertUnorderedList(true);
});


QUnit.test('[ID20] igHtmlEditor interaction tests - Insert Ordered List', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.insertOrderedList();
});

QUnit.test('[ID21] igHtmlEditor interaction tests - Execute Action Insert Ordered List', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.insertOrderedList(true);
});

QUnit.test('[ID22] igHtmlEditor interaction tests - Indent Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.indentText();
});

QUnit.test('[ID23] igHtmlEditor interaction tests - Execute Action Indent Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.indentText(true);
});

QUnit.test('[ID24] igHtmlEditor interaction tests - Outdent Text', function (assert) {
	assert.expect(2);
	this.assert = assert;

	this.createHtmlEditor();
	this.outdentText();
});

QUnit.test('[ID25] igHtmlEditor interaction tests - Execute Action Outdent Text', function (assert) {
	assert.expect(2);
	this.assert = assert;

	this.createHtmlEditor();
	this.outdentText(true);
});

QUnit.test('[ID26] igHtmlEditor interaction tests - Color Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.colorText();
});

QUnit.test('[ID27] igHtmlEditor interaction tests - Execute Action Color Text', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.colorText(true);
});

QUnit.test('[ID28] igHtmlEditor interaction tests - Font Name', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeFontName();
});

QUnit.test('[ID29] igHtmlEditor interaction tests - Execute Action Font Name', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeFontName(true);
});

QUnit.test('[ID30] igHtmlEditor interaction tests - Font Size', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeFontSize();
});

QUnit.test('[ID31] igHtmlEditor interaction tests - Execute Action Font Size', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeFontSize(true);
});

QUnit.test('[ID32] igHtmlEditor interaction tests - Execute Action background color', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeBackgroundColor();
});

QUnit.test('[ID33] igHtmlEditor interaction tests - DOMPathToolbar Buttons', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.manipulateDomPathToolbarButton();
});

QUnit.test('[ID34] igHtmlEditor interaction tests - Resize Workspace', function (assert) {
	assert.expect(2);
	this.assert = assert;

	this.createHtmlEditor();
	this.editorResizeWorkspace();
});

QUnit.test('[ID35] igHtmlEditor interaction tests - Heading', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeHeadingFormat();
});

QUnit.test('[ID36] igHtmlEditor interaction tests - Execute Action Heading', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeHeadingFormat(true);
});

QUnit.test('[ID37] igHtmlEditor interaction tests - Link Dialog', function (assert) {
	assert.expect(3);
	this.assert = assert;

	this.createHtmlEditor();
	this._openLinkDialog();
});

QUnit.test('[ID38] igHtmlEditor interaction tests - Image Dialog', function (assert) {
	assert.expect(9);
	this.assert = assert;

	this.createHtmlEditor();
	this._openImageDialog();
});

QUnit.test('[ID39] igHtmlEditor interaction tests - Table Dialog', function (assert) {
	assert.expect(10);
	this.assert = assert;

	this.createHtmlEditor();
	this._openTableDialog();
});

QUnit.test('[ID40] igHtmlEditor interaction tests - Add/Remove Rows/Columns', function (assert) {
	assert.expect(16);
	this.assert = assert;

	this.createHtmlEditor();
	this._addRemoveRowsColumns();
});

QUnit.test('[ID41] igHtmlEditor interaction tests - Selection Functionality', function (assert) {
	assert.expect(4);
	this.assert = assert;

	this.createHtmlEditor();
	this._testSelectionFunctionality();
});

QUnit.test('[ID42] igHtmlEditor interaction tests - Surround Contents', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this._testInsertElement();
});

QUnit.test('[ID43] igHtmlEditor interaction tests - Execute Action background color with interaction', function (assert) {
	assert.expect(1);
	this.assert = assert;

	this.createHtmlEditor();
	this.changeBackgroundColorWithInteraction();
});

QUnit.test('[ID44] igHtmlEditor rendering tests - Default toolbars rendering', function (assert) {
	assert.expect(5);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	var toolbarsContainer = this.htmlEditorId + "_toolbars";
	var toolbars = $('#' + toolbarsContainer).children();

	assert.equal(toolbars.length, 4, 'All default toolbars are rendered.');
	toolbars.each(function (i, e) {
		assert.ok($(e).hasClass("ui-widget ui-widget-content ui-igtoolbar ui-corner-all"), "The element (" + e.id + ") have all expected classes.");
	});
});

QUnit.test('[ID45] igHtmlEditor rendering tests - Text toolbars rendering', function (assert) {
	assert.expect(8);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	var textToolbarItemsID = this.htmlEditorId + "_toolbars_textToolbar_toolbar_buttons";
	var toolbarItems = $("#" + textToolbarItemsID).children();
	var css = "ui-button-icon-only ui-button ui-igbutton ui-widget ui-widget-content ui-corner-all ui-state-default";

	assert.equal(toolbarItems.length, 7, 'All Text toolbar items are rendered.');
	toolbarItems.each(function (i, e) {
		if ($(e).is(":ui-igCombo")) {
			css = "ui-igcombo-wrapper";
			if ($(e).hasClass("ui-combo-fontfamily")) {
				css += " ui-combo-fontfamily";
			}
		}
		assert.ok($(e).hasClass(css), "The element (" + e.id + ") have all expected classes.");
	});
});

QUnit.test('[ID46] igHtmlEditor rendering tests - Formatting toolbars rendering', function (assert) {
	assert.expect(11);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	var formattingToolbarItemsID = this.htmlEditorId + "_toolbars_formattingToolbar_toolbar_buttons";
	var toolbarItems = $("#" + formattingToolbarItemsID).children();
	var css = "ui-button-icon-only ui-button ui-igbutton ui-widget ui-widget-content ui-corner-all ui-state-default";

	assert.equal(toolbarItems.length, 10, 'All Formatting toolbar items are rendered.');
	toolbarItems.each(function (i, e) {
		if ($(e).is(":ui-igSplitButton") || $(e).is(":ui-igColorPickerSplitButton")) {
			css = "ui-splitbutton ui-widget";
		}
		assert.ok($(e).hasClass(css), "The element (" + e.id + ") have all expected classes.");
	});
});

QUnit.test('[ID47] igHtmlEditor rendering tests - Insert object toolbars rendering', function (assert) {
	assert.expect(8);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	var insertObjectToolbarItemsID = this.htmlEditorId + "_toolbars_insertObjectToolbar_toolbar_buttons";
	var toolbarItems = $("#" + insertObjectToolbarItemsID).children();
	var css = "ui-button-icon-only ui-button ui-igbutton ui-widget ui-widget-content ui-corner-all ui-state-default";

	assert.equal(toolbarItems.length, 7, 'All Insert Object toolbar items are rendered.');
	toolbarItems.each(function (i, e) {
		assert.ok($(e).hasClass(css), "The element (" + e.id + ") have all expected classes.");
	});
});

QUnit.test('[ID48] igHtmlEditor rendering tests - Copy/paste toolbar items rendering', function (assert) {
	assert.expect(6);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	var copyPasteToolbarItemsID = this.htmlEditorId + "_toolbars_copyPasteToolbar_toolbar_buttons";
	var toolbarItems = $("#" + copyPasteToolbarItemsID).children();
	var css = "ui-button-icon-only ui-button ui-igbutton ui-widget ui-widget-content ui-corner-all ui-state-default";

	assert.equal(toolbarItems.length, 5, 'All "Copy/paste" toolbar items are rendered.');
	toolbarItems.each(function (i, e) {
		assert.ok($(e).hasClass(css), "The element (" + e.id + ") have all expected classes.");
	});
});

QUnit.test('[ID49] igHtmlEditor rendering tests - Text toolbar collapsed', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolbarCollapsible("textToolbar");
});


QUnit.test('[ID50] igHtmlEditor rendering tests - Text toolbar expanded', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolabrExpandable("textToolbar");
});

QUnit.test('[ID51] igHtmlEditor rendering tests - Formatting toolbar collapsed', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolbarCollapsible("formattingToolbar");
});

QUnit.test('[ID52] igHtmlEditor rendering tests - Formatting toolbar expanded', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolabrExpandable("formattingToolbar");
});

QUnit.test('[ID53] igHtmlEditor rendering tests - Insert Object toolbar collapsed', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolbarCollapsible("insertObjectToolbar");
});

QUnit.test('[ID54] igHtmlEditor rendering tests - Insert Object toolbar expanded', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolabrExpandable("insertObjectToolbar");
});

QUnit.test('[ID55] igHtmlEditor rendering tests - Copy/Paste toolbar collapsed', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolbarCollapsible("copyPasteToolbar");
});

QUnit.test('[ID56] igHtmlEditor rendering tests - Copy/Paste toolbar expanded', function (assert) {
	assert.expect(1);
	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	this.isToolabrExpandable("copyPasteToolbar");
});

QUnit.test('[ID57] igHtmlEditor rendering tests - Workspace area rendered', function (assert) {
	assert.expect(2);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	var iframe = $("#" + this.htmlEditorId + "_editor"),
		textArea = $("#" + this.htmlEditorId + "_source"),
		htmlEditor = $('#' + this.htmlEditorId);

	htmlEditorWidth = htmlEditor.igHtmlEditor("option", "width"),
		htmlEditorHeight = htmlEditor.igHtmlEditor("option", "height");
	assert.ok(iframe.height() < htmlEditorHeight && (iframe.width() > 0 && iframe.width() <= htmlEditorWidth), "HTML editor design view is rendered.");
	assert.ok(textArea.length && textArea.width() && textArea.height(), "HTML editor source view is rendered.");
});

QUnit.test('[ID58] igHtmlEditor rendering tests - Initial content rendering', function (assert) {
	assert.expect(4);

	var id = 'htmlEditorId1',
		content = '<p>Some text</p><ul><li>list 1</li><li>list 2</li></ul><div>Something in a div</div>';

	$.ig.TestUtil.appendToFixture('<div></div>', { id: id });
	$('#' + id).append(content).igHtmlEditor();
	assert.equal($('#' + id).igHtmlEditor('getContent', 'html'), content, 'The initial content was not rendered in the HTML Editor.');

	var newContent = '<div><span>text 1</span><span>text 2</span><table><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table></div>';
	$('#' + id).igHtmlEditor('setContent', newContent, 'html');
	assert.equal($('#' + id).igHtmlEditor('getContent', 'html'), newContent, 'The set content method did not function properly.');

	// Check if the editor contents were modified or not
	assert.equal($('#' + id).igHtmlEditor('isDirty'), false, 'The editor contents werent modified');

	// Set text content
	var newTextContent = 'Some new text content'
	$('#' + id).igHtmlEditor('setContent', newTextContent, 'text');
	assert.equal($('#' + id).igHtmlEditor('getContent', 'text'), newTextContent, 'The set content method did not function properly.');
});

QUnit.test('[ID59] igHtmlEditor rendering tests - Modify initially set options', function (assert) {
	assert.expect(8);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: "htmlEditorSetInitOptions" })
		.igHtmlEditor({
			showCopyPasteToolbar: false,
			toolbarSettings: [
				{
					name: "textToolbar",
					isExpanded: false,
					isBold: true,
				}]
		});

	var htmlEditor = $('#' + "htmlEditorSetInitOptions");

	// Check toolbarSettings initial existance
	assert.equal(htmlEditor.igHtmlEditor("option", "toolbarSettings").length, 1, "toolbarSettings are not set.");

	htmlEditor.igHtmlEditor("option", "value", "Set and modify toolbar settings");
	htmlEditor.igHtmlEditor("option", "height", 400);
	htmlEditor.igHtmlEditor("option", "width", 700);
	htmlEditor.igHtmlEditor("option", "showFormattingToolbar", true);
	htmlEditor.igHtmlEditor("option", "showCopyPasteToolbar", false);
	htmlEditor.igHtmlEditor("option", "toolbarSettings", [
		{
			name: "textToolbar",
			isExpanded: true
		},
		{
			name: "copyPasteToolbar",
			isExpanded: false
		}]);

	htmlEditor.igHtmlEditor("option", "value", undefined);

	// Check some options that werent set initially (_setOption function)
	assert.equal(htmlEditor.igHtmlEditor("option", "value"), "Set and modify toolbar settings", "Value options is correctly set");
	assert.equal(htmlEditor.igHtmlEditor("option", "toolbarSettings").length, 2, "toolbarSettings changed successfully");
	assert.equal(htmlEditor.igHtmlEditor("option", "height"), 400, "height changed sucessfully");
	assert.equal(htmlEditor.igHtmlEditor("option", "width"), 700, "height changed sucessfully");
	assert.ok(htmlEditor.igHtmlEditor("option", "showFormattingToolbar"), "showFormattingToolbar is set to true");
	assert.notOk(htmlEditor.igHtmlEditor("option", "showCopyPasteToolbar"), "showCopyPasteToolbar is set to false");

	// Check text toolbar custom settings
	assert.ok(htmlEditor.data().igHtmlEditor._allToolbars[0].items[0].settings.props.isBold.value, "isBold Text Toolbar item is set to true");
});

QUnit.test('[ID60] igHtmlEditor rendering tests - Focus node type checker simulating IE Browser', function (assert) {
	assert.expect(1);

	// Set browser to be IE
	$.ig.util.isIE = true;
	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	var htmlEditor = $('#' + this.htmlEditorId),
		htmlElement = $(htmlEditor.igHtmlEditor("contentEditable")).parent(),
		done = assert.async();

	// Workspace document click and mouseup
	// Simulate iframe to be focused
	htmlElement.trigger("click");
	htmlElement.trigger("mouseup");

	$.ig.TestUtil.wait(100).then(function () {
		assert.ok($('#' + this.htmlEditorId).igHtmlEditor("isDirty"), "Iframe was not focused and isDirty isn't set to true");
		done();
	}).catch(function (er) {
		self.assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID61] igHtmlEditor rendering tests - Execute command node type set to text checker simulating IE Browser', function (assert) {
	assert.expect(1);

	// Set browser to be IE version - 10
	$.ig.util.isIE = true;
	$.ig.util.browserVersion = 10;
	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	this.htmlEditor = $('#' + this.htmlEditorId);
	this.editorDocument = this.htmlEditor.find("iframe").contents();

	// Append samo content to the iframe
	var content = '<p>Some text</p><ul><li>list 1</li><li>list 2</li></ul><div>Something in a div</div>';
	$(this.htmlEditor.igHtmlEditor("contentEditable")).append(content);

	// Get the second p tag that the nodeType is text
	var p = $(this.htmlEditor.igHtmlEditor("contentEditable")).find("p:nth-child(2)");

	var done = assert.async(), self = this;
	$.ig.TestUtil.wait(150).then(function () {
		// Select given p element
		self.htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
		// Bold the selected element
		self.htmlEditor.igHtmlEditor("executeAction", "Bold");
		// Check if selected element has the correct style
		var result = (p.children().first().css("fontWeight") === "bold" ||
			p.children().first().css("fontWeight") === "700") ||
			(p.find("strong:only-child").length) //IE
			||
			(p.children().first().css("fontWeight") === "bold")

		assert.ok(result, "Selected element was not affected after execution of the command!")
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID62] igHtmlEditor rendering tests - Execute command node type not set text checker simulating IE Browser', function (assert) {
	assert.expect(1);

	// Set browser to be IE version - 10
	$.ig.util.isIE = true;
	$.ig.util.browserVersion = 10;
	this.htmlEditor = $.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId });
	this.htmlEditor.igHtmlEditor({});

	// Selection type after updateSelection operation.
	var selectionType = "Caret",
		done = assert.async(),
		self = this,
		htmlEditor = $('#' + this.htmlEditorId),
		editorDocument = this.htmlEditor.find("iframe").contents();

	// Get first p tag that the nodeType is element.
	var p = $(this.htmlEditor.igHtmlEditor("contentEditable")).find("p:first");

	$.ig.TestUtil.wait(100).then(function () {
		// Select given p element
		htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(p.contents());
		// Bold the selected element
		htmlEditor.igHtmlEditor("executeAction", "Underline");

		// Get selection type
		var getSelectionType = htmlEditor.data("igHtmlEditor")._selectionWrapperSaved._selection.type;
		assert.deepEqual(getSelectionType, selectionType, "Selection type was not changed after command execution.")
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID63] igHtmlEditor rendering tests - keyboard interactions', function (assert) {
	assert.expect(4);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});

	var keyboardHtmlEditorId = "keyboardInteractionEditor",
		secondHtmlEditorId = "htmlEditorSetInitOptions",
		done = assert.async();

	$.ig.TestUtil.appendToFixture('<div></div>', { id: secondHtmlEditorId })
		.igHtmlEditor({
			showCopyPasteToolbar: false,
			toolbarSettings: [
				{
					name: "textToolbar",
					isExpanded: false,
					isBold: true,
				}]
		});
	$.ig.TestUtil.appendToFixture('<div></div>', { id: keyboardHtmlEditorId })
		.igHtmlEditor({
			value: "<table border='1'><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>"
		});

	var htmlEditor = $('#' + keyboardHtmlEditorId),
		iframe = $("#" + keyboardHtmlEditorId).find("#" + keyboardHtmlEditorId + "_editor"),
		viewStateBtn = htmlEditor.find(".ui-igbutton-viewsource"),
		htmlElement = $($("#" + secondHtmlEditorId).igHtmlEditor("contentEditable")).parent(),
		focusedElement, self = this;

	viewStateBtn.click();

	$.ig.TestUtil.wait(100).then(function () {
		// Check if the edit source is hidden and view source is shown
		assert.notOk(iframe.is(":visible"), "View source mode on");

		viewStateBtn.click();
		htmlEditor.data("igHtmlEditor")._resizeWorkspaceHandler()
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Check if the edit source is shown and view source is hidden
		assert.ok(iframe.is(":visible"), "View source mode off");

		// Workspace document click and mouseup
		// Simulate iframe to be focused
		htmlElement.trigger("click");
		htmlElement.trigger("mouseup");
		return $.ig.TestUtil.wait(300);
	}).then(function () {
		assert.ok($('#' + secondHtmlEditorId).igHtmlEditor('isDirty'), 'Iframe was focused and isDirty is set to true');

		// Simulate keydown of backspace event
		var backspaceClickEvent = jQuery.Event("keydown", { keyCode: 8 });
		// Simulate keydown of backspace event
		var ctrlAndZClickEvent = jQuery.Event("keydown", { ctrlKey: true, which: 90 });

		htmlElement.trigger(backspaceClickEvent);
		htmlElement.trigger(ctrlAndZClickEvent);

		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.equal($("#" + self.htmlEditorId).igHtmlEditor("getContent", "html"), '<p><br></p>', 'Prevent deletion by clicking backspace or delete btn when the p has only <br> in it');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID64] igHtmlEditor rendering tests - Insert at caret position', function (assert) {
	assert.expect(1);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: this.htmlEditorId }).igHtmlEditor({});
	var htmlEditor = $('#' + this.htmlEditorId),
		htmlElement = $(htmlEditor.igHtmlEditor("contentEditable")).parent(),
		done = assert.async(),
		contentToSelect;

	htmlElement.click();

	$.ig.TestUtil.wait(100).then(function () {
		htmlEditor.igHtmlEditor('setContent', '<div>Some text.</div>', 'html');
		htmlElement.click();

		htmlEditor.igHtmlEditor('setContent', '<div>Some text.</div>', 'html');
		contentToSelect = $(htmlEditor.igHtmlEditor("contentEditable")).parent().find("body");
		htmlEditor.data("igHtmlEditor")._selectionWrapperSaved.select(contentToSelect.contents());

		htmlEditor.igHtmlEditor("insertAtCaret", jQuery('<div/>', {
			id: 'divElement',
			text: 'Add new text!'
		}));

		// Process only Dom objects, jQuery objects or strings
		htmlEditor.igHtmlEditor("insertAtCaret", 4);
		assert.equal(htmlEditor.igHtmlEditor("getContent", "text"), "Add new text!Some text.", "Correctly inserted at caret position");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID65] igHtmlEditor rendering tests - Adjust domPathToolbar width when max width is reached', function (assert) {
	assert.expect(1);

	var done = assert.async(),
		adjustSourceButtonsEditorId = "adjustSourceButtonsEditor";

	$.ig.TestUtil.appendToFixture('<div></div>', { id: adjustSourceButtonsEditorId }).igHtmlEditor({});
	var htmlEditor1 = $('#' + adjustSourceButtonsEditorId), contentToSelect,
		htmlElement = $($(htmlEditor1).igHtmlEditor("contentEditable")).parent(),
		combo = $("#" + adjustSourceButtonsEditorId + "_toolbars_textToolbar_item_fontFamily")
			.igCombo("option", {
				animationShowDuration: 0,
				animationHideDuration: 0
			});

	combo.bind("igcombodropdownopened", function () {
		combo.igCombo('index', 3, null, true);
	});

	htmlEditor1.igHtmlEditor("setContent", "<div><div><div><div><div><div><div><div><div><span style='font-weight: bold;'>Lorem ipsum&nbsp;</span><br></div>dolor sit amet, choro quaestio no pro, assum bonorum et sit. Esse pertinax platonem pri ea, suas probo deserunt est ad, te eam consul docendi. Nec omnes vituperata no. Ex sint nullam integre<div><div><div><div><div><div> <b>vis, ex duis aliquip euripidis est. <div><div><div><div><div><div> <i>Case facer et eos. Affert omittantur</i></div><div></div></div></div></div></div></div> pro in.</b></div><div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>", 'html');
	htmlEditor1.igHtmlEditor("option", "width", 670);

	$.ig.TestUtil.wait(100).then(function () {
		contentToSelect = $(htmlEditor1.igHtmlEditor("contentEditable")).parent().find("body i");
		htmlEditor1.data("igHtmlEditor")._selectionWrapperSaved.select(contentToSelect.contents());

		htmlEditor1.igHtmlEditor("insertAtCaret", jQuery('<div/>', {
			id: 'divElement',
			text: 'Add new text!'
		}));

		combo.igCombo("openDropDown", null, true, true);
		return $.ig.TestUtil.wait(50);
	}).then(function () {
		combo.igCombo("closeDropDown");
		assert.ok($(".ui-igpathfinder-overflowMarker").length !== 0, "When the maximum width is reached, remove the last added button, and add the overflow marker.");
		$("#adjustSourceButtonsEditor_domPathToolbar").find("div:nth-child(2)").trigger("mouseover");
		$("#adjustSourceButtonsEditor_domPathToolbar").find("div:nth-child(2)").trigger("mouseleave");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID66] igHtmlEditor popover tests - setOptions method with name isHidden', function (assert) {
	assert.expect(1);

	$.ig.TestUtil.appendToFixture('<div id= targetId ></div><div id= popOverId></div>');
	$("#popOverId").igHtmlEditorPopover({
		target: $("#targetId")
	});

	$("#popOverId").igHtmlEditorPopover('option', 'isHidden', true);
	var actualResult = $("#popOverId").igHtmlEditorPopover('option', 'isHidden');
	assert.ok(actualResult, "isHidden option should be set to true");
});

QUnit.test('[ID67] igHtmlEditor unit tests - getOption testing for width', function (assert) {
	assert.expect(1);

	var editorElement = $.ig.TestUtil.appendToFixture('<div></div>');
	editorElement.igHtmlEditor({});

	var actualWidth = editorElement.igHtmlEditor("option", "width");

	assert.equal(actualWidth, 725, "HtmlEditor default width should be 725");
});

QUnit.test('[ID68] igHtmlEditor unit tests - setOption testing for width', function (assert) {
	assert.expect(1);

	var actualWidth,
		expectedWidth = 725,
		editorElement = $.ig.TestUtil.appendToFixture('<div></div>');
	editorElement.igHtmlEditor({});

	editorElement.igHtmlEditor("option", "width", expectedWidth);
	actualWidth = editorElement.igHtmlEditor("option", "width");

	assert.equal(actualWidth, expectedWidth, "HtmlEditor default width should be 725");
});


QUnit.test('[ID69] igHtmlEditor unit tests - igLinkPropertiesDialog initializing', function (assert) {
	assert.expect(1);

	var linkPropertiesDialogElement = $.ig.TestUtil.appendToFixture('<div></div>', { id: "linkTarket" });
	linkPropertiesDialogElement.igLinkPropertiesDialog({
		item: $("#linkTarket"),
		target: $("#linkTarket"),
	});

	var initialized = linkPropertiesDialogElement.length > 0;
	assert.ok(initialized, "igLinkPropertiesDialog should be initialized");
});


QUnit.test('[ID70] igHtmlEditor unit tests - igTablePropertiesDialog initializing', function (assert) {
	assert.expect(1);

	var tablePropertiesDialogElement = $.ig.TestUtil.appendToFixture('<div></div>', { id: "table" });
	tablePropertiesDialogElement.igTablePropertiesDialog({
		item: $("#table"),
		target: $("#table"),
	});

	var initialized = $("#table_popover").length > 0;
	assert.ok(initialized, "igTablePropertiesDialog should be initialized");
});

QUnit.test('[ID71] igHtmlEditor unit tests - igImagePropertiesDialog initializing', function (assert) {
	assert.expect(1);

	var imagePropertiesDialogElement = $.ig.TestUtil.appendToFixture('<div></div>', { id: "image" });
	imagePropertiesDialogElement.igTablePropertiesDialog({
		item: $("#image"),
		target: $("#image"),
	});

	var initialized = $("#image_popover").length > 0;
	assert.ok(initialized, "igImagePropertiesDialog should be initialized");
});

QUnit.test('[ID72] igHtmlEditor igToolbarHelper unit tests - QueryCommandState with left, right, center and full justify', function (assert) {
	assert.expect(4);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: "htmlEditor" }).igHtmlEditor({});

	var done = assert.async();
	var content = $("<p align='left'>test</p>");
	$("#htmlEditor").igHtmlEditor("setContent", content, "html");

	$.ig.TestUtil.wait(100).then(function () {
		var selectionWrapperSaved = $("#htmlEditor").data("igHtmlEditor")._selectionWrapperSaved;
		var analyser = $("#htmlEditor").data("igHtmlEditor")._analyser;
		var contentDoc = $("#htmlEditor").igHtmlEditor("contentDocument");

		// justify left
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("justifyleft"), "The query command state should be left justified.");

		// justify right
		content = $("<p align='right'>test</p>");
		$("#htmlEditor").igHtmlEditor("setContent", content, "html");
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("justifyright"), "The query command state should be right justified.");

		// justify center
		content = $("<p align='center'>test</p>");
		$("#htmlEditor").igHtmlEditor("setContent", content, "html");
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("justifycenter"), "The query command state should be center justified.");

		// justify full
		content = $("<p align='justify'>test</p>");
		$("#htmlEditor").igHtmlEditor("setContent", content, "html");
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("justifyfull"), "The query command state should be full justified.");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});


QUnit.test('[ID73] igHtmlEditor igToolbarHelper unit tests - QueryCommandState with ordered and unordered lists', function (assert) {
	assert.expect(2);

	$.ig.TestUtil.appendToFixture('<div></div>', { id: "htmlEditor" }).igHtmlEditor({});

	var done = assert.async(),
		content = $("<ol><li>first</li><li>second</li></ol>");
	$("#htmlEditor").igHtmlEditor("setContent", content, "html");

	$.ig.TestUtil.wait(100).then(function () {
		var selectionWrapperSaved = $("#htmlEditor").data("igHtmlEditor")._selectionWrapperSaved;
		var analyser = $("#htmlEditor").data("igHtmlEditor")._analyser;
		var contentDoc = $("#htmlEditor").igHtmlEditor("contentDocument");

		// ordered list
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("insertorderedlist"), "The query command state should be insert ordered list.");

		// unordered list
		content = $("<ul><li>first</li><li>second</li></ul>");
		$("#htmlEditor").igHtmlEditor("setContent", content, "html");
		selectionWrapperSaved.select(content);
		analyser.analyse(selectionWrapperSaved.getSelectedItem());
		assert.ok(contentDoc.queryCommandState("insertunorderedlist"), "The query command state should be insert unordered list.");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID74] igHtmlEditor igToolbarHelper unit tests - Add image to editor with no errors in IE', function (assert) {
	assert.expect(1);
	
	$.ig.TestUtil.appendToFixture('<div></div>', { id: "htmlEditor" }).igHtmlEditor({});

	var done = assert.async(), image, editor, input, htmlEditorElement = $("#htmlEditor"),
		button = htmlEditorElement.find("#htmlEditor_toolbars_insertObjectToolbar_item_image"),
		imageURL = "https://static.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg";
	
	$.ig.TestUtil.wait(200).then(function () {
		button.trigger("click");
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		input = $("#htmlEditor_imageDialog_imgSrc");
		input.val(imageURL);
		button = $("#htmlEditor_imageDialog_btnApply");
		button.click();
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		editor = htmlEditorElement.data().igHtmlEditor;
		image = $(editor.contentEditable()).find("img");
		assert.equal(image.length, 1, "The image should appear into content of the editor.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

