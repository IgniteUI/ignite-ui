/*!@license
 * Infragistics.Web.ClientUI HtmlEditor <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 * <Licensing info>
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *   jquery-1.9.1.js
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   infragistics.util.js
 *   infragistics.ui.shared.js
 *   infragistics.ui.toolbarbutton.js
 *   infragistics.ui.toolbar.js
 *   infragistics.ui.popover.js
 *   infragistics.ui.splitbutton.js
 *   infragistics.ui.colorpicker.js
 *   infragistics.ui.colorpickersplitbutton.js
 *   infragistics.dataSource.js
 *   infragistics.ui.combo.js
 *   infragistics.ui.dialog.js
 *   infragistics.ui.htmleditor-en.js
 *   infragistics.ui.toolbar-en.js
 */

/*global jQuery, window, document, Class*/
if (typeof jQuery !== "function") {
    throw new Error("jQuery is undefined");
}

(function ($) {

    /*
        The igHtmlEditor is a jQuery based widget which allow you to convert a simple html element into a rich text area.
    */
    $.widget("ui.igHtmlEditor", {
        options: {
            /* type="boolean" Shows/hides the "Formatting" toolbar. */
            showFormattingToolbar: true,
            /* type="boolean" Shows/hides the "Text" toolbar. */
            showTextToolbar: true,
            /* type="boolean" Shows/hides the "Insert Object" toolbar. */
            showInsertObjectToolbar: true,
            /* type="boolean" Shows/hides the "Copy Paste" toolbar. */
            showCopyPasteToolbar: true,
            /* type="string|number" The width of the html editor. It can be set as a number in pixels, string (px) or percentage (%).
                string The widget width can be set in pixels (px) and percentage (%).
                number The widget width can be set as a number
            */
            width: 725,
            /* type="string|number" The height of the html editor. It can be set as a number in pixels, string (px) or percentage (%).
                string The widget height can be set in pixels (px) and percentage (%).
                number The widget height can be set as a number
            */
            height: 350,
            /* type="array" The html editor toolbars list. */
            toolbarSettings: [ ],
            /* type="array" The html editor custom toolbars list. */
            customToolbars: [ ],
            /* type="string" The name attribute of the html editor source view. */
            inputName: "source",
            /* type="string" Used to render inside the html editor as initial content */
            value: ""
        },
        events: {
            /* cancel="false" Event fired after the whole html editor widget has been rendered. */
            rendered: "rendered",
            /* cancel="false" Event fired before the html editor widget has been rendered. */
            rendering: "rendering",
            /* cancel="true" Event fired before a toolbar item is clicked. */
            actionExecuting: "actionExecuting",
            /* cancel="false" Event fired after a toolbar item is clicked. */
            actionExecuted: "actionExecuted",
            /* cancel="true" Event fired before a toolbar is collapsed. */
            toolbarCollapsing: "toolbarCollapsing",
            /* cancel="false" Event fired after a toolbar is collapsed. */
            toolbarCollapsed: "toolbarCollapsed",
            /* cancel="true" Event fired before a toolbar is expanded. */
            toolbarExpanding: "toolbarExpanding",
            /* cancel="false" Event fired after a toolbar is expanded. */
            toolbarExpanded: "toolbarExpanded",
            /* cancel="false" Event is fired on keyboard cut action. */
            cut: "cut",
            /* cancel="false" Event is fired on keyboard copy action. */
            copy: "copy",
            /* cancel="false" Event is fired on keyboard paste action. */
            paste: "paste",
            /* cancel="false" Event is fired on keyboard undo action. */
            undo: "undo",
            /* cancel="false" Event is fired on keyboard redo action. */
            redo: "redo",
            /* cancel = "false" Event is fired after reziing of workspace*/
            workspaceResized: "workspaceResized"
        },
        css: {
            /* The widget base class css. */
            htmlEditor: "ui-widget ui-widget-content ui-corner-all ui-ightmleditor ui-helper-clearfix", //jscs:ignore maximumLineLength
            /* The html editor content styles. */
            htmlEditorContent: "ui-ightmleditor-content",
            /* The html editor toolbars style. */
            toolbarsContainer: "ui-igtoolbars-holder",
            /* The html editor dom navigation toolbar css. */
            pathFinder: "ui-igPathFinder",
            /* The workspace css. */
            workspaceIframe: "ui-widget-content"
        },
        defaultToolbars: [ {
            name: "textToolbar",
            displayName: $.ig.HtmlEditor.locale.defaultToolbars.textToolbar,
            isExpanded: true,

            // S.T. 18th of Dec, 2015 Bug #210622: Enable this option in html editor.
            allowCollapsing: true,
            collapseButtonIcon: "ui-igbutton-collapse",
            expandButtonIcon: "ui-igbutton-expand",
            items: [ {
                name: "Bold",
                type: "button",
                scope: null,
                props: {
                    allowToggling: {
                        value: true
                    },
                    isBold: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    boldButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.boldButtonTitle,
                        action: "_tooltipAction"
                    },
                    boldButtonIcon: {
                        value: "ui-igbutton-bold",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "Italic",
                type: "button",
                props: {
                    isItalic: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    italicButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.italicButtonTitle,
                        action: "_tooltipAction"
                    },
                    italicButtonIcon: {
                        value: "ui-igbutton-italic",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "Underline",
                type: "button",
                props: {
                    isUnderline: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    underlineButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.underlineButtonTitle,
                        action: "_tooltipAction"
                    },
                    underlineButtonIcon: {
                        value: "ui-igbutton-underline",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "Strikethrough",
                type: "button",
                props: {
                    isStrikethrough: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    strikethroughButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.strikethroughButtonTitle,
                        action: "_tooltipAction"
                    },
                    strikethroughButtonIcon: {
                        value: "ui-igbutton-strikethrough",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "fontFamily",
                type: "combo",
                scope: null,
                handler: "_fontNamePlg",
                props: {
                    fontFamilyComboWidth: {
                        value: 180,
                        action: "_comboWidthAction"
                    },
                    fontFamilyComboHeight: {
                        value: "",
                        action: "_comboHeightAction"
                    },
                    fontFamilies: {
                        value: $.ig.HtmlEditor.locale.fontNames[ /^win/gi.test(navigator.platform) ? "win" : "mac" ],
                        action: "_comboDataSourceAction"
                    },
                    selectedFontFamily: {
                        value: "Times New Roman",
                        action: "_comboSelectedItem"
                    }
                }
            }, {
                type: "combo",
                name: "fontSize",
                scope: null,
                handler: "_fontSizePlg",
                props: {
                    fontSizeComboWidth: {
                        value: 75,
                        action: "_comboWidthAction"
                    },
                    fontSizeComboHeight: {
                        value: "",
                        action: "_comboHeightAction"
                    },
                    fontSizes: {
                        value: $.ig.HtmlEditor.locale.fontSizes,
                        action: "_comboDataSourceAction"
                    },
                    selectedFontSize: {
                        value: "3",
                        action: "_comboSelectedItem"
                    },
                    fontSizeItemsListWidth: {
                        value: 100,
                        action: "_comboDropDownListWidth"
                    }
                }
            }, {
                type: "combo",
                name: "formatsList",
                scope: null,
                handler: "_formatsListPlg",
                props: {
                    formatsListComboWidth: {
                        value: 170,
                        action: "_comboWidthAction"
                    },
                    formatsListComboHeight: {
                        value: "",
                        action: "_comboHeightAction"
                    },
                    formatsList: {
                        value: $.ig.HtmlEditor.locale.formatsList,
                        action: "_comboDataSourceAction"
                    },
                    selectedFormat: {
                        value: "p",
                        action: "_comboSelectedItem"
                    }
                }
            } ]
        }, {
            name: "formattingToolbar",
            displayName: $.ig.HtmlEditor.locale.defaultToolbars.formattingToolbar,
            isExpanded: true,

            // S.T. 18th of Dec, 2015 Bug #210622: Enable this option in html editor.
            allowCollapsing: true,
            collapseButtonIcon: "ui-igbutton-collapse",
            expandButtonIcon: "ui-igbutton-expand",
            items: [ {
                name: "justifyleft",
                type: "button",
                props: {
                    isJustifyLeft: {
                        value: true,
                        action: "_isSelectedAction"
                    },
                    justifyLeftButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.alignTextLeftButtonTitle,
                        action: "_tooltipAction"
                    },
                    justifyLeftButtonIcon: {
                        value: "ui-igbutton-justifyleft",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "justifycenter",
                type: "button",
                props: {
                    isJustifyCenter: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    justifyCenterButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.alignTextCenterButtonTitle,
                        action: "_tooltipAction"
                    },
                    justifyCenterButtonIcon: {
                        value: "ui-igbutton-justifycenter",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "justifyright",
                type: "button",
                props: {
                    isJustifyRight: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    justifyRightButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.alignTextRightButtonTitle,
                        action: "_tooltipAction"
                    },
                    justifyRightButtonIcon: {
                        value: "ui-igbutton-justifyright",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "justifyfull",
                type: "button",
                props: {
                    isJustifyFull: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    justifyFullButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.justifyButtonTitle,
                        action: "_tooltipAction"
                    },
                    justifyFullButtonIcon: {
                        value: "ui-igbutton-justifyfull",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "InsertUnorderedList",
                type: "button",
                props: {
                    isUnorderedList: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    insertUnorderedListTooltip: {
                        value: $.ig.HtmlEditor.locale.bulletsButtonTitle,
                        action: "_tooltipAction"
                    },
                    insertUnorderedListButtonIcon: {
                        value: "ui-igbutton-unorderedlist",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "InsertOrderedList",
                type: "button",
                props: {
                    isOrderedList: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    insertOrderedListTooltip: {
                        // JD May 19, 2015 Bug #194260 Fixing the locale property name for the order list tooltip
                        value: $.ig.HtmlEditor.locale.numberingButtonTitle,
                        action: "_tooltipAction"
                    },
                    insertOrderedListButtonIcon: {
                        value: "ui-igbutton-orderedlist",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "outdent",
                type: "button",
                props: {
                    outdentButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.decreaseIndentButtonTitle,
                        action: "_tooltipAction"
                    },
                    outdentButtonIcon: {
                        value: "ui-igbutton-removeindent",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "indent",
                type: "button",
                props: {
                    indentTooltip: {
                        value: $.ig.HtmlEditor.locale.increaseIndentButtonTitle,
                        action: "_tooltipAction"
                    },
                    indentButtonIcon: {
                        value: "ui-igbutton-indent",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "textColor",
                type: "splitButtonColor",
                handler: "_fontColorPlg",
                props: {
                    items: {
                        value: [
                            {
                                name: "textColor",
                                label: $.ig.HtmlEditor.locale.fontColorButtonTitle,
                                iconClass: "ui-igbutton-forecolor"
                            }
                         ]
                    },
                    defaultItemName: {
                        value: "textColor"
                    },
                    selectedTextColor: {
                        value: "red",
                        action: "_spltButtonColorAction"
                    }
                }
            }, {
                name: "backgroundTextColor",
                type: "splitButtonColor",
                handler: "_fontBackgroundColorPlg",
                props: {
                    items: {
                        value: [
                            {
                                name: "backgroundTextColor",
                                label: $.ig.HtmlEditor.locale.textHighlightButtonTitle,
                                iconClass: "ui-igbutton-backcolor"
                            }
                         ]
                    },
                    defaultItemName: {
                        value: "backgroundTextColor"
                    },
                    selectedTextBackgroundColor: {
                        value: "",
                        action: "_spltButtonColorAction"
                    }
                }
            } ]
        }, {
            name: "insertObjectToolbar",
            displayName: $.ig.HtmlEditor.locale.defaultToolbars.insertObjectToolbar,
            isExpanded: true,

            // S.T. 18th of Dec, 2015 Bug #210622: Enable this option in html editor.
            allowCollapsing: true,
            collapseButtonIcon: "ui-igbutton-collapse",
            expandButtonIcon: "ui-igbutton-expand",
            items: [ {
                name: "image",
                type: "button",
                handler: "_insertImageDialogPlg",
                props: {
                    isImage: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    imageButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.insertPictureButtonTitle,
                        action: "_tooltipAction"
                    },
                    imageButtonIcon: {
                        value: "ui-igbutton-addimage",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "link",
                type: "button",
                handler: "_insertLinkPlg",
                props: {
                    isLink: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    linkButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.insertLinkButtonTitle,
                        action: "_tooltipAction"
                    },
                    linkButtonIcon: {
                        value: "ui-igbutton-addlink",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "table",
                type: "button",
                handler: "_insertTablePlg",
                props: {
                    isTable: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    tableButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.insertTableButtonTitle,
                        action: "_tooltipAction"
                    },
                    tableButtonIcon: {
                        value: "ui-igbutton-table",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "addRow",
                type: "button",
                handler: "_addTableRowPlg",
                props: {
                    allowToggling: {
                        value: false
                    },
                    isAddRow: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    addRowButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.addRowButtonTitle,
                        action: "_tooltipAction"
                    },
                    addRowButtonIcon: {
                        value: "ui-igbutton-addrow",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "addColumn",
                type: "button",
                handler: "_addTableColumnPlg",
                props: {
                    allowToggling: {
                        value: false
                    },
                    isAddColumn: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    addColumnButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.addColumnButtonTitle,
                        action: "_tooltipAction"
                    },
                    addColumnButtonIcon: {
                        value: "ui-igbutton-addcolumn",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "removeRow",
                type: "button",
                handler: "_removeTableRowPlg",
                props: {
                    allowToggling: {
                        value: false
                    },
                    isRemoveRow: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    removeRowButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.removeRowButtonTitle,
                        action: "_tooltipAction"
                    },
                    removeRowButtonIcon: {
                        value: "ui-igbutton-removerow",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "removeColumn",
                type: "button",
                handler: "_removeTableColumnPlg",
                props: {
                    allowToggling: {
                        value: false
                    },
                    isRemoveColumn: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    removeColumnButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.removeColumnButtonTitle,
                        action: "_tooltipAction"
                    },
                    removeColumnButtonIcon: {
                        value: "ui-igbutton-removecolumn",
                        action: "_buttonIconAction"
                    }
                }
            } ]
        }, {
            name: "copyPasteToolbar",
            displayName: $.ig.HtmlEditor.locale.defaultToolbars.copyPasteToolbar,
            isExpanded: true,

            // S.T. 18th of Dec, 2015 Bug #210622: Enable this option in html editor.
            allowCollapsing: true,
            collapseButtonIcon: "ui-igbutton-collapse",
            expandButtonIcon: "ui-igbutton-expand",
            items: [ {
                name: "copy",
                type: "button",
                scope: null,
                props: {
                    isCopy: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    copyButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.copyButtonTitle,
                        action: "_tooltipAction"
                    },
                    copyButtonIcon: {
                        value: "ui-igbutton-copy",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "cut",
                type: "button",
                scope: null,
                props: {
                    isCut: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    cutButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.cutButtonTitle,
                        action: "_tooltipAction"
                    },
                    cutButtonIcon: {
                        value: "ui-igbutton-cut",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "paste",
                type: "button",
                scope: null,
                props: {
                    isPaste: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    pasteButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.pasteButtonTitle,
                        action: "_tooltipAction"
                    },
                    pasteButtonIcon: {
                        value: "ui-igbutton-paste",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "undo",
                type: "button",
                scope: null,
                props: {
                    allowToggling: {
                        value: false
                    },
                    isUndo: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    undoButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.undoButtonTitle,
                        action: "_tooltipAction"
                    },
                    undoButtonIcon: {
                        value: "ui-igbutton-undo",
                        action: "_buttonIconAction"
                    }
                }
            }, {
                name: "redo",
                type: "button",
                scope: null,
                props: {
                    allowToggling: {
                        value: false
                    },
                    isRedo: {
                        value: false,
                        action: "_isSelectedAction"
                    },
                    redoButtonTooltip: {
                        value: $.ig.HtmlEditor.locale.redoButtonTitle,
                        action: "_tooltipAction"
                    },
                    redoButtonIcon: {
                        value: "ui-igbutton-redo",
                        action: "_buttonIconAction"
                    }
                }
            } ]
        } ],
        NODE: new $.ig.XmlNodeType(),

        // This is property is populated by initToolabrs method in the following format.
        // The state of the toolbars (visible/hidden) is set by _setActiveToolbars method.
        _toolbarsActiveState: {

            // show[ ToolbarName ]: {name: '[ ToolbarName ]', value: true},
        },
        _isDirty: false,
        _createWidget: function () {
            /* !Strip dummy objects from options, because they are defined for documentation purposes only! */
            this._allToolbars = [ ];
            $.Widget.prototype._createWidget.apply(this, arguments);
        },
        _id: function (id) {
            return this.element[ 0 ].id + id;
        },
        widget: function () {
            /*
                Returns the element on which the widget was instantiated
            */
            return this.element;
        },
        _render: function () {
            var html = "",
                inputName = this.options.inputName;

            // K.D. July 16th, 2012 Bug #101208 Removing the code that initially creates a paragraph
            this.element.addClass(this.css.htmlEditor);
            html += '<div id="' + this._id("_toolbars") + '" class="' +
                this.css.toolbarsContainer + '"></div>';
            html += '<div id="' + this._id("_content") + '" class="' +
                this.css.htmlEditorContent + '">';
            html += '<iframe class="' + this.css.workspaceIframe + '" id="' +
                this._id("_editor") + '"></iframe>';
            html += '<textarea name="' + inputName + '" id="' +
                this._id("_source") + '"></textarea>';
            html += "</div>";

            $(html).appendTo(this.element);

            // D.A. Bug #144045 September 17th, 2013 Hide the _source element upon initialization.
            // The css of the textarea is changed to display:block to override the browsers
            // default display:inline-block of the textarea. Needed for the jQuery's show/hide
            // methods to toggle between display:block and display:none.
            $("#" + this._id("_source")).hide();

            // K.D. July 26th, 2012 Bug #113717 The height is applied to the iframe and not to the element. Now the height is correctly
            // calculated relatively to the total height.
            this.element.height(this.options.height);
            this.element.width(this.options.width);
        },
        _createWorkspace: function (content) {
            // D.A. Feb 24th, 2014 Bug #164304 Vertical scrollbar always visible in IE10+. Changed doctype to html5.
            var iFrameContent = "<" + "!" + "DOCTYPE html" + ">" +
                "<html>" +
                "<head>" +
                "<title>igHtmlEditor<\/title>" +
                "<\/head>" +

                // K.D. September 12th, 2012 Bug #120892 adding spellcheck="false" to disable firefox spellchecker
                '<body contentEditable="true" spellcheck="false" style="-webkit-tap-highlight-color: rgba(255, 255, 255, 0);">' + //jscs:ignore maximumLineLength
                "<p>";

            if (!document.all) {
                iFrameContent += "<br \/>";
            }

            iFrameContent += "<\/p><\/body><\/html>";

            this.workspace = this.element.find("#" + this._id("_editor"))[ 0 ];

            this.workspace.contentWindow.document.open("text/html", "replace");
            this.workspace.contentWindow.document.write(iFrameContent);
            this.workspace.contentWindow.document.close();

            // S.T. March 20, 2014 Bug #164898 and it"s related to #113728 Extracting any initial content and rendering it as content in the iframe workspace
            if (content && content.length > 0) {
                $(this.workspace).contents().find("body").html(content);
            }

            if ($.ig.util.isWebKit) {
                this.workspace.contentWindow.document.body.contentEditable = true;
            }
            if (!document.all) {
                var showUI = false,
                    comandValue = true;
                this.workspace.contentWindow.document.
                    execCommand("styleWithCSS", showUI, comandValue);
            }
        },
        _getToolbar: function (index) {
            if (!isNaN(parseInt(index, 10))) {
                return this._toolbars.eq(index);
            }
            if (typeof index === "string") {
                return this._toolbars.find("#" + this._id("_toolbars_" + index));
            }
        },

        // Returns toolbar settings by given name
        _getToolbarSettings: function (name) {
            var curToolbar,
                result,
                i;

            for (i = 0; i < this._allToolbars.length && !result; i++) {
                curToolbar = this._allToolbars[ i ];

                if (curToolbar.name === name) {
                    result = curToolbar;
                }
            }

            return result;
        },
        _getFirefoxVersion: function () {
            if ($.ig.util.isFF) {
                return parseInt(window.navigator.userAgent.match(/\bFirefox\/[ 0-9\. ]+\b/)[ 0 ].split("/").reverse()[ 0 ], 10);
            }
        },
        _create: function () {
            var noCancel = this._trigger(this.events.rendering, null, {
                owner: this
            }),
                content = this.options.value || this.element.html();

            // K.D. July 17th, 2012 Bug #113728 Extracting any initial content and rendering it as content in the iframe workspace
            this.element.empty();

            if (noCancel) {
                this._render();
                this._initToolbars();

                // K.D. July 17th, 2012 Bug #113728 Extracting any initial content and rendering it as content in the iframe workspace
                this._createWorkspace(content);
                this._domPathToolbar();

                // K.D. July 26th, 2012 Bug #113717 The height is applied to the iframe and not to the element. Now the height is correctly
                // calculated relatively to the total height.
                this.resizeWorkspace();
                this._trigger(this.events.rendered, null, {
                    owner: this
                });
            }
        },
        _resizeWorkspaceHandler: function () {
            var args = {
                owner: this
            };
            this.resizeWorkspace();
            return this._trigger(this.events.workspaceResized, null, args);
        },
        _init: function () {
            this._comboHeight = 24;

            this._bindToToolbarEvents();
            this._bindWorkspaceEvents();
            this.sourceWindow = this.element.find("#" + this._id("_source"));

            // TODO: the new content is not wrap in <p> on enter.
            // $(this.workspace).contents().find('body').html(this.sourceWindow.val());
            this._initFontsCombos();
            this._initFormatsListCombo();
            this._initFontSizeCombo();

            // TODO: the new content is not wrap in <p> on enter.
            // this.setContent(this.options.value, "html");
            this._analyser =
                new $.ig.ToolbarHelper(this.workspace.contentWindow, this._toolbars.children());

            var self = this;
            this._onSelectionChange(function () {
                self._initialWorkspaceFormatting();
            });
        },
        _initFontsCombos: function () {
            var fontFamiliesCombo = this._getToolbar("textToolbar")
                .igToolbar("getItem", "fontFamily")
                .addClass("ui-combo-fontfamily");

            fontFamiliesCombo.igCombo("option", {

                // K.D. July 24th, 2012 Bug #111689 Combo items with item template cannot be selected under IE7/IE8
                // Combo bug #113720
                itemTemplate:
                    '<span style="font-family: ${value}" unselectable="on">${text}</span>',
                height: this._comboHeight,
                dropDownOrientation: "bottom"
            });
        },
        _initFormatsListCombo: function () {
            var formatsListCombo = this._getToolbar("textToolbar")
                .igToolbar("getItem", "formatsList");

            // K.D. July 24th, 2012 Bug #111689 Combo items with item template cannot be selected under IE7/IE8
            // Combo bug #113720
            formatsListCombo.igCombo("option", {
                itemTemplate: '<${text} unselectable="on">${value}</${text}>',
                height: this._comboHeight,
                dropDownOrientation: "bottom"
            });
        },
        _initFontSizeCombo: function () {
            var fontSizesCombo = this._getToolbar("textToolbar").igToolbar("getItem", "fontSize");

            fontSizesCombo.igCombo("option", {

                // K.D. July 24th, 2012 Bug #111689 Combo items with item template cannot be selected under IE7/IE8
                // Combo bug #113720
                itemTemplate: '<span unselectable="on">${value}</span>',
                height: this._comboHeight,
                dropDownOrientation: "bottom"
            });
        },
        _setOption: function (name, value) {
            var self = this;

            if (name === undefined || value === undefined) {
                return;
            }

            if (name === "toolbarSettings") {
                $.each(value, function (index, toolbar) {
                    $.each(toolbar, function (tbPropName, tbPropVal) {
                        if (tbPropName !== "name") {

                            // S.T. 18th of Dec, 2015 Bug #210622: Fix set method for items.
                            self._getToolbar(self._allToolbars[ index ].name)
                                .igToolbar("option", tbPropName, tbPropVal);
                        }
                    });
                });
            } else if (this._toolbarsActiveState[ name ]) {
                this._showToolbar(this._toolbarsActiveState[ name ].name, value);
            } else if (name === "width") {
                this.element.width(value);
            } else if (name === "height") {

                // Z.K. December 1, 2015 Fixing Bug #209636 - igHtmlEditor is not resized correctly when using height option
                this.element.height(value);
                this.resizeWorkspace();

                // D.U. 09/05/2014 Bug 171139 [ HtmlEditor ] Option value cannot be changed with set value
            } else if (name === "value") {
                this.setContent(value, "text");
            }

            $.Widget.prototype._setOption.apply(this, arguments);

        },
        _showToolbar: function (name, show) {
            if (show) {
                this._getToolbar(name).removeClass("hidden").show();
            } else {
                this._getToolbar(name).addClass("hidden").hide();
            }
        },
        _initToolbars: function () {
            this._allToolbars = $.extend(
                true, [ ], this.defaultToolbars.concat(this.options.customToolbars));
            this._toolbars = this.element.find("#" + this._id("_toolbars"));

            this._mergeToolbarSettings();
            this._createToolbars();
        },

        // Merges _allToolbars settings and options.toolbarSettings in _allToolbars
        // This method matches the settings by name and assumes that options.toolbarSettings will be given at single level
        // E.g. options.toolbarSettings: { name: "fontFamily", selectedFontFamily: "Arial" }
        // is merged into _allToolbars as : { name: "fontFamily", props: [  selectedFontFamily { value: "Arial" }  ] }
        _mergeToolbarSettings: function () {
            var customSettings = this.options.toolbarSettings,
                curSettings,
                curCustomSettings,
                curName,
                items,
                curItem,
                curItemProps,
                propFound,
                property,
                i, j;

            // Loop through all custom settings and update the corresponding settings in _allToolbars
            for (i = 0; i < customSettings.length; i++) {
                curCustomSettings = customSettings[ i ];
                curName = curCustomSettings.name;

                if (typeof curName === "string") {
                    curSettings = this._getToolbarSettings(curName);

                    if (curSettings) {

                        // Match each custom settings property to the appropriate settings property
                        for (property in curCustomSettings) {
                            if (property !== "name") {
                                propFound = false;

                                // Search for such property in curSettings properties
                                if (curSettings.hasOwnProperty(property)) {
                                    curSettings[ property ] = curCustomSettings[ property ];
                                } else {
                                    items = curSettings.items;

                                    // Search for such property in items properties
                                    for (j = 0; j < items.length && !propFound; j++) {
                                        curItem = items[ j ];
                                        curItemProps = curItem.props;

                                        if (curItemProps.hasOwnProperty(property)) {

                                            // Update the value field of items properties
                                            curItemProps[ property ].value =
                                                curCustomSettings[ property ];
                                            propFound = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        _createToolbars: function () {
            var options = this.options,
                curSettings,
                curName,
                showToolbarOption,
                showToolbar,
                i;

            this._toolbars = this.element.find("#" + this._id("_toolbars"));

            for (i = 0; i < this._allToolbars.length; i++) {
                curSettings = this._allToolbars[ i ];
                curName = curSettings.name;
                showToolbarOption = $.camelCase("show-" + curName);
                showToolbar = true;

                // Create the toolbar
                $("<span>")
                    .attr("id", this._id("_toolbars") + "_" + curName)
                    .appendTo(this._toolbars)
                    .igToolbar(curSettings);

                // Set toolbar's active state
                if (options[ showToolbarOption ] !== undefined) {
                    showToolbar = options[ showToolbarOption ];
                }

                this._toolbarsActiveState[ showToolbarOption ] = {
                    name: curName,
                    value: showToolbar
                };

                this._showToolbar(curName, showToolbar);
            }

            if ($.ig.util.isIE) {

                // D.A. 16th October 2014, Bug #182145 Only one style can be selected in Internet Explorer.
                // Clicking on the toolbar buttons/combos in IE cause lose of selection.
                // The reason is that the elements are <div>-s.
                // We should make everything unselectable to prevent this selection loss.
                this._toolbars.find("*").attr("unselectable", "on");
            }
        },
        _initialWorkspaceFormatting: function () {
            var i, curSettings, property, command, args,
                toolbarSettings = this.options.toolbarSettings,
                commands = {
                    isBold: "bold",
                    isItalic: "italic",
                    isUnderline: "underline",
                    isStrikethrough: "strikethrough",
                    isJustifyLeft: "justifyleft",
                    isJustifyRight: "justifyright",
                    isJustifyCenter: "justifycenter",
                    isJustifyFull: "justifyfull",
                    isUnorderedList: "InsertUnorderedList",
                    isOrderedList: "InsertOrderedList"
                },
                argsCommands = {
                    selectedFontFamily: "fontName",
                    selectedFontSize: "fontSize",
                    selectedFormat: "formatBlock",
                    selectedTextColor: "forecolor",
                    selectedTextBackgroundColor: "backcolor"
                };

            for (i = 0; i < toolbarSettings.length; i++) {

                curSettings = toolbarSettings[ i ];

                for (property in curSettings) {

                    if (curSettings.hasOwnProperty(property)) {

                        if (commands.hasOwnProperty(property)) {
                            command = commands[ property ];
                        } else if (argsCommands.hasOwnProperty(property)) {
                            command = argsCommands[ property ];
                            args = curSettings[ property ];
                        } else {
                            command = null;
                        }

                        if (command) {

                            if (command === argsCommands.selectedFormat) {

                                // Transform the selectedFormat option e.g. "h3"
                                // into execCommand option "<h3>"
                                args = "<" + args + ">";
                            }

                            this._initialSelectionSetup();
                            this._execCommand(command, args, true);
                            this._emptyAndCollapseSelection();
                        }
                    }
                }
            }
        },
        _initialSelectionSetup: function () {
            var lastNode = $(this.contentDocument()).find(":not(br)").last(),
                sel = this._selectionWrapperSaved._getSelection(),
                range = this._selectionWrapperSaved._getRange();

            // Add &nbsp; to execute the initial commands on it
            lastNode.html("&nbsp;");

            if ($.ig.util.isIEOld) {
                range.moveToElementText(lastNode[ 0 ]);
                range.select();
            } else {

                // Set the selection to the dummy element
                range.selectNode(lastNode[ 0 ]);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        },
        _emptyAndCollapseSelection: function () {
            var lastNode = $(this.contentDocument()).find(":not(br)").last(),
                sel = this._selectionWrapperSaved._getSelection(),
                range = this._selectionWrapperSaved._getRange();

            // Remove the dummy text and add <br> to make the element selectable
            lastNode.html("<br>");

            // Collapse the selection
            if (lastNode.length > 0) {

                if ($.ig.util.isIEOld) {
                    range.collapse(true);
                    range.select();
                } else {
                    range.setStart(lastNode[ 0 ], 0);
                    range.setEnd(lastNode[ 0 ], 0);
                    range.collapse(true);

                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        },

        // Z.K. July 15, 2016 - Remove unused code
        //_isToolbarActive: function (tbName) {
        //    var key;
        //    for (key in this._toolbarsActiveState) {
        //        if (this._toolbarsActiveState.hasOwnProperty(key)) {
        //            if (this._toolbarsActiveState[key].name === tbName) {
        //                return this._toolbarsActiveState[key].value;
        //            }
        //        }
        //    }
        //},
        _execCommand: function (name, args, skipIETimeout) {
            var self = this;

            function execute() {
                self._selectionWrapperSaved.focus();
                self._selectionWrapperSaved.execCommand(name.toLowerCase(), args);
                self._onSelectionChange();
            }

            if ($.ig.util.isIE && !skipIETimeout) {

                // D.A., 15th August 2014, Bug #168180 When changing font family and font
                // size the new values are not applied on the typed text in IE and Firefox

                // Combo gets focus in IE after the command is executed
                // This causes some commands to be lost
                // We need to execute commands after focus was taken and then
                // to return the focus and selection back to the editor
                setTimeout(function () {
                    execute();
                }, 0);
            } else {
                execute();
            }
        },
        _hideDialogs: function () {
            this.element.find(":ui-igLinkPropertiesDialog").igLinkPropertiesDialog("hide");
            this.element.find(":ui-igTablePropertiesDialog").igTablePropertiesDialog("hide");
            this.element.find(":ui-igImagePropertiesDialog").igImagePropertiesDialog("hide");
        },
        _bindToToolbarEvents: function () {
            var self = this,
                events = "igtoolbartoolbarbuttonclick igtoolbartoolbarcomboselected " +
                    "igtoolbartoolbarcustomitemclick igtoolbarcollapsing " +
                    "igtoolbarcollapsed igtoolbarexpanding igtoolbarexpanded",
                splitBtnArrowSelector = ".ui-splitbutton-arrow",
                toolbarEvents = {
                    igtoolbarcollapsing: this.events.toolbarCollapsing,
                    igtoolbarcollapsed: this.events.toolbarCollapsed,
                    igtoolbarexpanding: this.events.toolbarExpanding,
                    igtoolbarexpanded: this.events.toolbarExpanded
                };

            this._toolbars.delegate(":ui-igToolbar", events,
                function _onToolbarItemClick(e, ui) {
                    var scope = ui.scope,
                        handler = ui.handler,
                        $eTarget = $(e.originalEvent.currentTarget),
                        noCancel;

                    delete ui.scope;
                    delete ui.handler;

                    self._hideDialogs();

                    // Skip action executing when clicking on the split button arrows
                    if ($eTarget.is(splitBtnArrowSelector)) {

                        // IE is closing the split button when propagation is not stopped
                        e.stopImmediatePropagation();
                        return;
                    }

                    if (toolbarEvents.hasOwnProperty(e.type)) {
                        self.resizeWorkspace();
                        self._trigger(toolbarEvents[ e.type ], e, ui);
                        return;
                    }

                    ui.selectedItem = self._selectionWrapperSaved &&
                        self._selectionWrapperSaved.getSelectedItem();
                    noCancel = self._trigger(self.events.actionExecuting, e, {
                        owner: self,
                        toolbar: ui.toolbarName,
                        actionName: ui.name
                    });

                    if (noCancel) {
                        if (!handler && !scope) {
                            self._execCommand(ui.name, ui.value);
                        } else if (handler && !scope) {
                            self[ handler ](self.workspace.contentWindow.document, ui);
                        } else if (handler && scope) {
                            handler.call(ui.scope, self.workspace.contentWindow.document, ui);
                        }
                        self._trigger(self.events.actionExecuted, e, {

                            // K.D. July 17th, 2012 Bug #113736 ui.owner needs to be the HTML editor itself
                            owner: self,
                            toolbar: ui.toolbarName,
                            actionName: ui.name
                        });
                        e.stopImmediatePropagation();
                    }
                });
        },
        _bindWorkspaceEvents: function () {
            var self = this,
                $workspaceDocument = $(this.contentDocument()),
                $workspaceBody = $(this.contentEditable()),

                // K.D. November 1st, 2012 Bug #104207 As we're no longer using keypress but keydown instead both codes are the same.
                KEYS = {
                    webKitIE: {
                        CTRLZ: 90,
                        CTRLY: 89
                    },
                    moz: {
                        CTRLZ: 90,
                        CTRLY: 89
                    }
                };

            $workspaceDocument.find("html").bind("click", function (e) {
                var target = $(e.target);

                if (target.is("html")) {
                    self.workspace.contentWindow.document.body.focus();
                }
                self._isDirty = true;
                self._hideDialogs();
                e.stopPropagation();
            }).bind("mouseup", function () {
                self._onSelectionChange();
            });

            // K.D. July 17th, 2012 Bug #112076 Need to bind on keydown not keypress in order for it to work in IE/Webkit
            $workspaceDocument.bind("keydown", function (e) {
                var $children,
                    $firstChild;

                self._isDirty = true;

                if (e.ctrlKey && (e.which === KEYS.webKitIE.CTRLZ || e.which === KEYS.moz.CTRLZ)) {
                    self._trigger(self.events.undo, e, { owner: self });
                }

                if (e.ctrlKey && (e.which === KEYS.webKitIE.CTRLY || e.which === KEYS.moz.CTRLY)) {
                    self._trigger(self.events.redo, e, { owner: self });
                }

                // D.A. 30th September 2014, Bug #182044 Prevent removing the <p>-tag
                // by clicking 'backspace' or 'delete' when the p has only <br> in it
                if (e.keyCode === 8 || e.keyCode === 46) {
                    $children = $workspaceBody.children();
                    $firstChild = $children.first();

                    if ($children.length === 1 && $firstChild.html() === "<br>") {
                        e.preventDefault();
                    }
                }

                self._onSelectionChange();
            });

            $workspaceDocument.bind("cut copy paste", function (e) {
                self._trigger(e.type, e, { owner: self });
            });

            this.element.bind("ightmleditoractionexecuted", function (e, ui) {
                if (ui.actionName.toLowerCase() === self.events.undo ||
                    ui.actionName.toLowerCase() === self.events.redo) {
                    self._trigger(ui.actionName.toLowerCase(), e, { owner: self });
                    e.stopImmediatePropagation();
                }
            });

            $(document).click(function (e) {
                var $tarParents = $(e.target).parents();

                // Hide all popovers except when clicking on one of them
                if (!$tarParents.is(".ui-igpopover") && !$tarParents.is(".ui-igcombo-list")) {
                    self._hideDialogs();
                }
            });

            $(window).on("resize", $.proxy(this._resizeWorkspaceHandler, this));

        },
        _viewSource: function () {
            var workspace = $(this.workspace),
                workSpaceBody = workspace.contents().find("body");

            if (workspace.is(":visible")) {
                workSpaceBody.attr("contentEditable", false);

                // K.D. October 3rd, 2012 Bug #123366 Encoding the content before setting the value
                // D.A. November 4th, 2013 Bug #155847 Viewsource cannot be switched when there are leading whitespaces
                this.sourceWindow.val($.trim(workSpaceBody.html()));
                workspace.hide();
                this.sourceWindow.show();
            } else {
                workSpaceBody.attr("contentEditable", true);
                workSpaceBody.html($.trim(this.sourceWindow.val()));
                workspace.show();
                this.sourceWindow.hide();

                // D.A. March 23, 2015 Bug #189760 Special characters (; , / ? : @ & = + $) are not encoded properly. Change encodeURI to encodeURIComponent
                this.sourceWindow.val(encodeURIComponent(this.sourceWindow.val()));
            }
        },
        _viewSourcePlg: function () {
            this._viewSource();
        },
        _insertImageDialogPlg: function (workspace, plgUI) {
            var image = $("<img>", this.workspace.contentWindow.document),
                self = this;

            if (plgUI.selectedItem.is("img")) {
                image = plgUI.selectedItem;
            }
            this._imageDialog = $("#" + this._id("_imageDialog"));

            if (!this._imageDialog.length) {
                this._imageDialog = $('<div id="' + this._id("_imageDialog") + '"></div>')
                    .appendTo(this.element)
                    .igImagePropertiesDialog({
                        item: image,
                        target: plgUI.toolbarItem,
                        applyform: function (e, ui) {
                            self._selectionWrapperSaved.focus();
                            self._selectionWrapperSaved.replaceNode(ui.image);
                        }
                    });
            } else {
                if (this._imageDialog.igImagePropertiesDialog("option", "isHidden")) {
                    this._imageDialog.igImagePropertiesDialog("show", image);
                } else {
                    this._imageDialog.igImagePropertiesDialog("hide", image);
                }
            }
        },
        _insertLinkPlg: function (workspace, ui) {

            // K.D. July 29th, 2013 Bug #146086 The subsequent Hyperlink added replaces the previous Hyperlink
            var self = this,
                selectedItem = this._selectionWrapperSaved.getSelectedItem(),
                selectedItemNodeType = selectedItem[ 0 ].nodeType,
                anchor = $("<a></a>", this.workspace.contentWindow.document);

            if (selectedItem.parent().is("a")) {
                anchor = selectedItem.parent();
            } else if ((selectedItemNodeType === this.NODE._Text) ||
                (selectedItemNodeType === this.NODE._Element)) {
                anchor.html(this._selectionWrapperSaved.getSelectionAsText());
            }

            if (!this._insertLinkDialog) {
                this._insertLinkDialog = $('<div id="' + this._id("_linkDialog") + '"></div>')
                    .appendTo(this.element)
                    .igLinkPropertiesDialog({
                        item: anchor,
                        target: ui.toolbarItem,
                        applyform: function (e, ui) {
                            self._selectionWrapperSaved.focus();
                            self._selectionWrapperSaved.replaceNode(ui.anchor);
                        }
                    });
            } else {
                if (this._insertLinkDialog.igLinkPropertiesDialog("option", "isHidden")) {
                    this._insertLinkDialog.igLinkPropertiesDialog("show", anchor);
                } else {
                    this._insertLinkDialog.igLinkPropertiesDialog("hide", anchor);
                }
            }
        },
        _fontNamePlg: function (workspace, ui) {
            this._execCommand("fontname", ui.value);
        },
        _fontSizePlg: function (workspace, ui) {
            this._execCommand("fontsize", ui.value);
        },
        _formatsListPlg: function (workspace, ui) {
            this._execCommand("formatBlock", "<" + ui.value + ">");
        },
        _insertTablePlg: function (workspace, plgUI) {
            var table = $("<table></table>", this.workspace.contentWindow.document),
                self = this;
            if (plgUI.selectedItem.is("table")) {
                table = plgUI.selectedItem;
            }
            if (!this.insertTableDialog) {
                this.insertTableDialog = $("<div id='" + this._id("_tableDialog") + "'</div>")
                    .appendTo(this.element)
                    .igTablePropertiesDialog({
                        item: table,  //$(this.workspace.contentWindow.document).find('body p'),Should be changed with that or something else
                        target: plgUI.toolbarItem,
                        applyform: function (e, ui) {
                            self._selectionWrapperSaved.insertTable(ui.table);
                        }
                    });
                return;
            }
            if (this.insertTableDialog.igTablePropertiesDialog("option", "isHidden")) {
                this.insertTableDialog.igTablePropertiesDialog("show", table);
                return;
            }
            if (!this.insertTableDialog.igTablePropertiesDialog("option", "isHidden")) {
                this.insertTableDialog.igTablePropertiesDialog("hide");
            }
        },
        _addTableRowPlg: function () {
            var selectedItem = this._selectionWrapperSaved.getSelectedItem();
            if (selectedItem.is("table")) {
                selectedItem.tableManipulator("addRow");
            } else if (selectedItem.is("td")) {
                selectedItem.parents("table").first().
                    tableManipulator("addRow", selectedItem.parent().index());
            }
        },
        _removeTableRowPlg: function () {
            var selectedItem = this._selectionWrapperSaved.getSelectedItem();
            if (selectedItem.is("table")) {
                selectedItem.tableManipulator("removeRow");
            } else if (selectedItem.is("td")) {
                selectedItem.parents("table").first().
                    tableManipulator("removeRow", selectedItem.parent().index());
            }
        },
        _addTableColumnPlg: function () {
            var selectedItem = this._selectionWrapperSaved.getSelectedItem();
            if (selectedItem.is("table")) {
                selectedItem.tableManipulator("addColumn");
            } else if (selectedItem.is("td")) {
                selectedItem.parents("table").first().
                    tableManipulator("addColumn", selectedItem.index());
            }
        },
        _removeTableColumnPlg: function () {
            var selectedItem = this._selectionWrapperSaved.getSelectedItem();
            if (selectedItem.is("table")) {
                selectedItem.tableManipulator("removeColumn");
            } else if (selectedItem.is("td")) {
                selectedItem.parents("table").first().
                    tableManipulator("removeColumn", selectedItem.index());
            }
        },
        _fontColorPlg: function (workspace, ui) {
            this._execCommand("forecolor", ui.value);
        },
        _fontBackgroundColorPlg: function (workspace, ui) {
            var command = this._getFirefoxVersion() ? "hilitecolor" : "backcolor";
            this._execCommand(command, ui.value);
        },
        _domPathToolbar: function () {
            var self = this,
                tableItemPref = "#" + this._id("_toolbars_insertObjectToolbar_item_"),
                tableItemAddRowID = tableItemPref + "addRow",
                tableItemAddColID = tableItemPref + "addColumn",
                tableItemRemRowID = tableItemPref + "removeRow",
                tableItemRemColID = tableItemPref + "removeColumn",
                doNotEnableToolbarButtonsSelector = tableItemAddRowID + ", " +
                    tableItemAddColID + ", " +
                    tableItemRemRowID + ", " +
                    tableItemRemColID;

            this._viewSourceBtn = $('<div class="ui-igbutton-viewsource"></div>')
                .appendTo(this.element)
                .igButton({
                    labelText: "&nbsp;",
                    title: $.ig.HtmlEditor.locale.viewSourceButtonTitle,
                    icons: {
                        primary: "ui-igbutton-viewsource-icon"
                    },
                    onlyIcons: true,
                    click: function () {
                        self._viewSourcePlg();
                        if (self._domPathToolbar.igPathFinder("option", "disabled")) {
                            self._domPathToolbar.igPathFinder("option", "disabled", false);

                            // D.A. January 31st 2014, Bug #130480 Add/remove table items become active after clicking the view source button
                            self._toolbars
                                .find(":ui-igToolbarButton")
                                    .not(doNotEnableToolbarButtonsSelector)
                                        .igToolbarButton("option", "disabled", false)
                                    .end()
                                .end()
                                .find(":ui-igCombo")
                                    .igCombo("enable");

                            // K.D. July 17th, 2012 Bug #113713 In Chrome Cut/Copy/Paste buttons are enabled after switching between design view and source view
                            self._analyser._disableUnsupportedItems();

                            // D.A. March 20th, 2014 Bug #167806 Deleted DOM elements are still available in the DOM path toolbar after deleting them in the source code
                            self._onSelectionChange();
                        } else {
                            self._domPathToolbar.igPathFinder("option", "disabled", true);
                            self._toolbars
                                .find(":ui-igToolbarButton")
                                    .igToolbarButton("option", "disabled", true)
                                .end()
                                .find(":ui-igCombo").igCombo("disable");
                        }
                    }
                });

            this._domPathToolbar = $('<div id="' + this._id("_domPathToolbar") + '"></div>')
                .appendTo(this.element)
                .igPathFinder({
                    click: function (e, ui) {
                        var selectionWrapper = self._selectionWrapperSaved;
                        self.workspace.contentWindow.document.body.focus();
                        if (self._domPathToolbar.igPathFinder("option", "disabled")) {
                            return;
                        }
                        e.preventDefault();
                        if (ui.item.is("html")) {
                            selectionWrapper.select(ui.item.children("body"));
                        } else if (ui.item.is("body")) {
                            selectionWrapper.select(ui.item);
                        } else {
                            selectionWrapper.select(ui.item);
                        }
                    }
                });
        },

        // Z.K. Removing unused code
        // _cutPlg: function () {
        //     this._execCommand("cut");
        // },
        // _copyPlg: function () {
        //     this._execCommand("copy");
        // },
        // _pastePlg: function () {
        //     this._execCommand("paste");
        // },
        _onSelectionChange: function (callback) {
            var self = this,
                selectionWrapper,
                workSpaceBody = $(this.workspace).contents().find("body"),
                selectionCallback = callback || function () {
                    var selectedItem = this.getSelectedItem();

                    // K.D. September 12th, 2012 Bug #120891 We need to return the span/font from the selection
                    // wrapper in order to correctly analyze the styles
                    if (selectedItem && (selectedItem.is("p") ||
                        selectedItem.is(":header")) && selectedItem.children("span").length > 0) {
                        selectedItem = selectedItem.children("span").first();
                    } else if (selectedItem && (selectedItem.is("p") ||
                        selectedItem.is(":header")) && selectedItem.children("font").length > 0) {
                        selectedItem = selectedItem.children("font").first();
                    }

                    if (selectedItem[ 0 ].nodeType === self.NODE._Text) {
                        selectedItem = selectedItem.parent();
                    }

                    self._analyser.analyse(selectedItem);

                    if (selectedItem.length) {
                        self._domPathToolbar.igPathFinder("option", "items",
                            $.merge(selectedItem, selectedItem.parents()));
                    }
                };

            selectionWrapper =
                new $.ig.SelectionWrapper(this.workspace.contentWindow, function () {
                self._selectionWrapperSaved = this;

                // D.A. 18th September 2013 Bug #151506 The TextArea value should
                // be updated after the selection wrapper is initialized.
                // K.D. October 3rd, 2012 Bug #123366 Encoding the content before setting the value
                // D.A. March 23, 2015 Bug #189760 Special characters (; , / ? : @ & = + $) are not encoded properly. Change encodeURI to encodeURIComponent
                self.sourceWindow.val(encodeURIComponent(workSpaceBody.html()));
                selectionCallback.call(this);
            });
        },
        _destroyPopovers: function () {
            var el = this.element[ 0 ];
            $(':data("igPopover")').each(function () {
                if ($.contains(el, this)) {
                    $(this).igPopover("destroy");
                }
            });
        },

        // D.A. 31st July 2014, Bug #176753 Changing resizeWorkspace to public method
        resizeWorkspace: function () {
            /*
                Resizes the height of the workspace
            */

            // K.D. July 26th, 2012 Bug #113717 The height is applied to the iframe and not to the element. Now the height is correctly
            // calculated relatively to the total height.
            var $clonedElement, height = this.element.height(),
                $editor = $("#" + this._id("_editor")),
                $toolbars = $("#" + this._id("_toolbars"));

            // Z.K. December 1, 2015 - Fixing Bug #210366 - igHtmlEditor textarea height exceed the widget actual height
            if (!$toolbars.is(":visible")) {
                $clonedElement = $toolbars.clone();
                $clonedElement.css({
                    "display": "initial",
                    "position": "absolute",
                    "top": "-10000px",
                    "width": this.element.width()
                });

                $("body").append($clonedElement);

                // Cloned element height plus original element margins
                height -= $clonedElement.height() + $toolbars.outerHeight(true);
                $clonedElement.remove();
            } else {
                height -= $toolbars.outerHeight(true);
            }

            height -= $(".ui-igbutton-viewsource").outerHeight(true);

            // D.A. 31st March 2014, Take into account the editor borders and paddings
            height -= $editor.outerHeight(true) - $editor.height();

            $editor.height(height);
            $("#" + this._id("_source")).height(height);
        },
        getContent: function (format) {
            /*
                Gets the content of the html editor.
                paramType="string" optional="false" Returns the content as html or plain text. Values can be "text" or "html".
                returnType="string" The editor content.
            */
            if (format === "text") {
                return $(this.workspace).contents().find("body").text();
            }
            if (format === "html") {
                return $(this.workspace).contents().find("body").html();
            }
        },
        setContent: function (content, format) {
            /*
                Sets the content of the html editor.
                paramType="string" optional="false" The content which will be set.
                paramType="string" The content type: "text" or "html".
            */
            if (format === "text") {
                $(this.workspace).contents().find("body").text(content);
            } else if (format === "html") {
                $(this.workspace).contents().find("body").html(content);
            }

            // K.D. October 2nd, 2012 Bug #123366 Encoding the content before setting the value
            // D.A. March 23, 2015 Bug #189760 Special characters (; , / ? : @ & = + $) are not encoded properly. Change encodeURI to encodeURIComponent
            this.sourceWindow.val(encodeURIComponent(content));
        },
        destroy: function () {
            /* Destroys the widget. */
            $.Widget.prototype.destroy.apply(this, arguments);
            $(this.workspace.contentWindow).undelegate();
            this._destroyPopovers();
            this._viewSourceBtn.igButton("destroy");
            this.element.removeClass(this.css.htmlEditor)
                .find("#" + this._id("_content")).removeClass(this.css.htmlEditorContent).end()
                .find("#" + this._id("_domPathToolbar")).removeClass(this.css.pathFinder).end()
                .find("#" + this._id("_toolbars")).removeClass(this.css.toolbarsContainer).end()
                .find(":ui-igToolbar").igToolbar("destroy").end()
                .empty();
        },
        executeAction: function (actionName, args) {
            /*
                Executes htmleditor commands.
                paramType="string" optional="false" The command name.
                paramType="object" optional="true" Additional parameter for the command.
            */

            // D.A. 25th November 2013, Bug #158403 ExecuteAction method ignores the current selection.
            // The select() call resets the selection.
            //this._selectionWrapperSaved.focus();
            //this._selectionWrapperSaved.select();
            this._selectionWrapperSaved.execCommand(actionName.toLowerCase(), args);
            this._onSelectionChange();
        },
        isDirty: function () {
            /*
                Returns true/false if the editor contents were modified or not.
                returnType="boolean" Returns true if contents were modified and false otherwise.
            */
            return this._isDirty;
        },
        contentWindow: function () {
            /*
                Returns the window object associated with the Html Editor's content editable area
                returnType="object" The window object associated with the Html Editor's content editable area
            */

            return this.workspace.contentWindow;
        },
        contentDocument: function () {
            /*
                Returns the document object associated with the Html Editor's content editable area
                returnType="object" The document object associated with the Html Editor's content editable area
            */

            return this.contentWindow().document;
        },
        contentEditable: function () {
            /*
                Returns the content editable associated with this Html Editor
                returnType="object" The content editable associated with this Html Editor
            */

            return this.contentDocument().body;
        },
        selection: function () {
            /*
                Returns Selection object that represent the current selection in the content editable
                returnType="object" Returns Selection object that represent the current selection in the content editable
            */
            return this._selectionWrapperSaved._getSelection();
        },
        range: function () {
            /*
                Returns Range object that represent the current range in the content editable
                returnType="object" Returns Range object that represent the current range in the content editable
            */
            return this._selectionWrapperSaved._getRange();
        },
        insertAtCaret: function (element) {
            /* Inserts the provided content at the position of the caret.
               paramType="string|object" optional="false" Accepts html string, DOM element or a jQuery object.
            */

            var el,
                range;

            if ($.ig.util.isDomElement(element)) {

                // Convert Dom element to jQuery object
                element = $(element);
            }

            if (element instanceof $) {

                // Get the html of an jQuery object
                element = $("<div />").append(element).html();
            } else if (typeof element !== "string") {

                // Process only Dom objects, jQuery objects or strings
                return;
            }

            // Creates an element with the iframe document as owner document
            el = $(element, this._selectionWrapperSaved._document)[ 0 ];
            range = this.range();

            if (this._selectionWrapperSaved._isIeOld) {
                range.pasteHTML(element);
            } else {
                range.insertNode(el);
            }
        }
    });

    /************************************
        igPathFinder
    ************************************/
    $.widget("ui.igPathFinder", {
        options: {
            items: null
        },
        css: {
            button: "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only " +
                "ui-igbutton ui-widget-content",
            buttonLabel: "ui-button-text",
            stateDefault: "ui-state-default",
            firstButton: "ui-first-button",
            overflowMarker: "ui-igpathfinder-overflowMarker"
        },
        _create: function () {
            this._addStyles();
        },
        _addStyles: function () {
            this.element.addClass("ui-igPathFinder");
        },
        _setOption: function (name, value) {
	        $.Widget.prototype._setOption.apply(this, arguments);
	        switch (name) {
	            case "items":
	                this._updateToolbar();
	                break;
	            case "disabled":

	                // H.A. February 25th 2016 Bug #214778 ui-state-disabled class is not applied to Dom path toolbar in igHtmlEditor
	                // see https://jqueryui.com/upgrade-guide/1.11/#stop-setting-ui-state-disabled-and-aria-disabled-by-default-when-the-disabled-option-is-set
	                // K.D. July 13th, 2012 Bug #114609 The buttons in the path finder submit the page if the path finder is disabled
	                //this.element.find('button').attr('disabled', value).attr('aria-disabled', value);
	                this.element
						.toggleClass("ui-state-disabled", !!value)
						.attr("aria-disabled", value);
                    break;
                default:
                    break;
            }
        },
        _addOverflowMarker: function () {
            var overflowMarker = $("<div>...</div>")
                .addClass(this.css.overflowMarker)
                .addClass(this.css.stateDefault);

            overflowMarker.prependTo(this.element);
        },
        _updateToolbar: function () {

            var i,
                parents,
                btn,
                buttonsList,
                self = this,
                o = this.options,
                path = [ ],
                html = "",
                viewSrcBtn = $(".ui-igbutton-viewsource"),
                overflowMarkerWidth = 20,
                maxWidth = viewSrcBtn.parent().width() - viewSrcBtn.outerWidth(true) -
                    overflowMarkerWidth,
                maxWidthReached = false;

            if (o.items.length) {
                o.items.each(function (index, element) {
                    html = '<div aria-disabled="false" style="z-index:' + index + '" class="' +
                        self.css.button + '">' +
                                '<span class="' + self.css.buttonLabel + '">' +
                                    element.nodeName +
                                "</span>" +
                            "</div>";
                    path.push(html);
                });

                this.element.empty();
                parents = $(o.items.toArray().reverse());
                buttonsList = $(path.reverse().join(""));

                // Add all buttons to the path until the max width is reached
                for (i = buttonsList.length - 1; i >= 0 && !maxWidthReached; i--) {

                    // Clear previously added first button classes
                    buttonsList.removeClass(this.css.firstButton);
                    btn = buttonsList.eq(i)
                        .addClass(this.css.firstButton)
                        .prependTo(this.element);

                    // Adjust the max width to consider the width of the overflow marker
                    if (i === 0) {
                        maxWidth += overflowMarkerWidth;
                    }

                    // When the maximum width is reached, remove the last added button.
                    // Then add the overflow marker.
                    if (this.element.outerWidth(true) > maxWidth) {

                        // Remove the overflowing button
                        btn.remove();

                        // Set first-button class on the previous button
                        buttonsList.eq(i + 1).addClass(this.css.firstButton);
                        this._addOverflowMarker();
                        maxWidthReached = true;
                    }
                }

                buttonsList
                    .attr("disabled", o.disabled)
                    .attr("aria-disabled", o.disabled)
                    .mouseover(function () {
                        if (!o.disabled) {
                            $(this).addClass("ui-state-hover");
                        }
                    })
                    .mouseleave(function () {
                        if (!o.disabled) {
                            $(this).removeClass("ui-state-hover");
                        }
                    })
                    .click(function (e) {
                        if (!o.disabled) {
                            $(this).siblings(".ui-state-active").removeClass("ui-state-active");
                            $(this).addClass("ui-state-active");

                            self._trigger("click", e,
                                { item: parents.eq(buttonsList.index(this)) });
                        }
                    });
            }
        }
    });

    // End HTML Editor Core

    /************************************
        HTML Editor Subcomponents
    ************************************/

    // Dialogs

    /************************************
       igHtmlEditorPopover
   ************************************/
    $.widget("ui.igHtmlEditorPopover", {
        options: {
            item: null,
            target: null,
            isHidden: true
        },
        css: {
            igHtmlEditorPropertiesDialog: "ui-ightmleditor-dialog",
            igHtmlEditorPropertiesDialogContainer: "ui-ightmleditor-dialog-container"
        },
        events: {
            apply: "applyform",
            cancel: "cancelform",
            show: "show",
            hide: "hide"
        },
        _id: function (id) {
            return this.element[ 0 ].id + id;
        },
        _create: function () {
            this.element.igPopover({
                closeOnBlur: false,
                position: "balanced",
                direction: "bottom",
                renderCloseButton: false,

                // T.G,  28 Jan 2014 - 162527 - removing the target from the igPopover
                //target: this.options.target,
                showOn: null,

                // D.A. 14th July 2015, Bug #194183 Increasing the width to avoid truncated strings in JP version
                //maxWidth: 230,
                // Z.K. September 2nd, 2015 Bug #202031 - Dropdown menus on the custom icons are not fully visible on touch device
                maxWidth: "90%",
                width: "95%",
                maxHeight: "300px",
                minWidth: "160px"
            });
            this.poContent = this.element.igPopover("container");
            this._createForm();
        },
        _init: function () {
            this._item = this.options.item;
            this.poContent.addClass(this.css.igHtmlEditorPropertiesDialog);
            this.element.addClass(this.css.igHtmlEditorPropertiesDialogContainer);

            this._attachFormEvents();
            this.show(this._item);
        },
        _createForm: function () { },
        _attachFormEvents: function () { },
        _dataBind: function () { },
        show: function (item) {
            this._item = item;
            this._dataBind(item);
            this.options.isHidden = false;

            // T.G 16 Jan 2014 - Fix bug 161249 - Target option is not needed because the user expects it to be the element on which the popover is initialized
            this.element.igPopover("show", this.options.target);
            this._trigger(this.events.show);
        },
        hide: function () {
            this.options.isHidden = true;
            if (this.options.target.igToolbarButton("option", "isSelected")) {
                this.options.target.igToolbarButton("toggle");
            }
            this.element.igPopover("hide");
            this._trigger(this.events.hide);
        }
    });

    /************************************
      igLinkPropertiesDialog
   ************************************/
    $.widget("ui.igLinkPropertiesDialog", $.ui.igHtmlEditorPopover, {
        _txtUrl: "",
        _cbTarget: "",
        _attachFormEvents: function () {
            var self = this;

            this.poContent.find("#" + this._id("_cmbOpenIn")).igCombo({
                initialSelectedItems: [ {
                    index: 0
                } ],
                enableClearButton: false,

                // JD May 19, 2015 Bug #194183 Changing the width of the combo so it matches the other controls and displays all localized text.
                width: "100%",

                // S.T. 27th Feb 2015 Fix Bug #189075:In add link open in combo should be with mode dropdown
                mode: "dropdown"
            });
            this.poContent.find("#" + this._id("_btnCancel")).igButton({
                click: function () {
                    self.hide();
                }
            });
            this.poContent.find("#" + this._id("_btnApply")).igButton({
                click: function (e) {
                    e.stopImmediatePropagation();

                    // K.D. September 13th, 2012 Bug #120906 Applying the href as text if no text is specified.
                    self._item.attr({
                        href: self._txtUrl.val(),

                        // S.T. April 17th, 2014 Bug #170227: Getting value with JQuery val will return null instead _blank. Use igCombo value method to get the target.
                        target: self._cbTarget.igCombo("value")
                    }).html(self._displayText.val().length > 0 ?
                        self._displayText.val() : self._txtUrl.val());
                    self._trigger(self.events.apply, e, {
                        anchor: self._item
                    });
                    self.hide();
                }
            });
            this.poContent.bind("keypress", function (e) {
                if (e.keyCode === $.ui.keyCode.ESCAPE) {
                    self.hide();
                }
            });
            this.element.bind("igpopovershown", function () {
                self.poContent.find("#" + self._id("_linkHref")).focus();
            });
        },
        _createForm: function () {
            var html = "";

            //jscs:disable
            html += '<div>' +
                '<ol class="layoutList">' +
                    '<li>' +
                        '<label for="' + this._id('_linkHref') + '">' + $.ig.HtmlEditor.locale.linkNavigateToUrlDialogText + '</label>' +
                        '<input autocomplete="off" id="' + this._id('_linkHref') + '" name="href" type="text" value="" />' +
                    '</li>' +
                    '<li>' +
                        '<label for="' + this._id('_linkDisplayText') + '">' + $.ig.HtmlEditor.locale.linkDisplayTextDialogText + '</label>' +
                        '<input autocomplete="off" id="' + this._id('_linkDisplayText') + '" name="href" type="text" value="" />' +
                    '</li>' +
                    '<li>' +
                        '<label for="' + this._id('_cmbOpenIn') + '">' + $.ig.HtmlEditor.locale.linkOpenInDialogText + '</label>' +
                        '<select id="' + this._id('_cmbOpenIn') + '" name="target">' +
                            '<option value="_blank">' + $.ig.HtmlEditor.locale.linkTargetNewWindowDialogText + '</option>' +
                            '<option value="_self">' + $.ig.HtmlEditor.locale.linkTargetSameWindowDialogText + '</option>' +
                            '<option value="_parent">' + $.ig.HtmlEditor.locale.linkTargetParentWindowDialogText + '</option>' +
                            '<option value="_top">' + $.ig.HtmlEditor.locale.linkTargetTopmostWindowDialogText + '</option>' +
                        '</select>' +
                    '</li>' +
                    '<li style="text-align:right">' +
                        '<button aria-disabled="false" id="' + this._id('_btnApply') + '" name="insertLink" role="button" title="' +
                            $.ig.HtmlEditor.locale.applyButtonTitle + '" type="button">' + $.ig.HtmlEditor.locale.applyButtonTitle + '</button>' +
                        '<button aria-disabled="false" id="' + this._id('_btnCancel') + '" role="button" title="' +
                            $.ig.HtmlEditor.locale.cancelButtonTitle + '" type="button">' + $.ig.HtmlEditor.locale.cancelButtonTitle + '</button>' +
                    '</li>' +
                '</ol>' +
            '</div>';

            //jscs:enable

            $(html).appendTo(this.poContent);
        },
        _dataBind: function (anchor) {
            this._txtUrl = this.poContent.find("#" + this._id("_linkHref"))
                .val(anchor.attr("href"));
            this._cbTarget = this.poContent.find("#" + this._id("_cmbOpenIn"))
                .val(anchor.attr("target"));
            this._displayText = this.poContent.find("#" + this._id("_linkDisplayText"))
                .val(anchor.html());
        }
    });

    /************************************
        igTablePropertiesDialog
    ************************************/
    $.widget("ui.igTablePropertiesDialog", $.ui.igHtmlEditorPopover, {
        _init: function () {
            this.rowsNumField = this.element.find("#" + this._id("_tableRows"));
            this.columnsNumField = this.element.find("#" + this._id("_tableColumns"));

            $.ui.igHtmlEditorPopover.prototype._init.apply(this, arguments);
        },
        _createForm: function () {

            //jscs:disable
            var html = '<div>' +
                    '<ol class="layoutList">' +
                        '<li>' +
                        '</li>' +
                        '<li>' +
                            '<div class="ui-igtablepropertiesdialog-cols-rows-num">' +
                                '<input type="hidden" id="' + this._id('_tableRows') + '" name="tableRows" readonly="readonly" value="">' +
                                '<input type="hidden" id="' + this._id('_tableColumns') + '" name="tableColumns" readonly="readonly" value="">' +
                            '</div>' +
                        '</li>' +
                    '</ol>' +
                '</div>';

            //jscs:enable
            $(html).appendTo(this.poContent);

            this._sampleTable = $('<table "' + this._id("_tableModel") +
                '" class="ui-igtablepropertiesdialog-sample-table"></table>')
                .tableManipulator({ rows: 8, columns: 6 })
                .appendTo(this.poContent.find(".layoutList li:first"));
        },
        _attachFormEvents: function () {
            var tablePreview = this.poContent.find("table"),
                cells = tablePreview.find("td").addClass("ui-state-default"),
                rows = tablePreview.find("tr"),
                self = this;

            tablePreview.delegate("td", "mouseover", function (e) {
                var target = $(e.target),
                    currentRowNumber = target.parent().index() + 1,
                    currentColumnNumber = $(this).index() + 1,
                    i;

                cells.removeClass("ui-state-hover");
                for (i = 0; i < currentRowNumber; i++) {
                    $(rows.get(i)).find("td:lt(" + currentColumnNumber + ")")
                        .addClass("ui-state-hover");
                }

                self.rowsNumField.val(currentRowNumber);
                self.columnsNumField.val(currentColumnNumber);
            });

            tablePreview.delegate("td", "click", function (e) {
                var target = $(e.target),
                    currentRowNumber = target.parent().index() + 1,
                    currentColumnNumber = $(this).index() + 1;

                self._item.tableManipulator({
                    rows: currentRowNumber,
                    columns: currentColumnNumber,
                    addSpacingChar: true });

                self._trigger(self.events.apply, e, {
                    table: self._item.attr("border", 1)
                });

                self.hide();
            });

            tablePreview.bind("mouseout", function () {
                cells.removeClass("ui-state-hover");
                self.rowsNumField.val(null);
                self.columnsNumField.val(null);
            });
        },
        _dataBind: function () {
            this.rowsNumField.val();
            this.columnsNumField.val();
        }
    });

    /************************************
        igImagePropertiesDialog
    ************************************/
    $.widget("ui.igImagePropertiesDialog", $.ui.igHtmlEditorPopover, {
        _init: function () {
            this._imgSrcFld = this.poContent.find("#" + this._id("_imgSrc"));
            this._imgAltFld = this.poContent.find("#" + this._id("_imgAlt"));

            $.ui.igHtmlEditorPopover.prototype._init.apply(this, arguments);
        },
        _createForm: function () {
            var html = "";

            //jscs:disable
            html += '<div class="' + this.css.igImagePropertiesDialogContent + '">';
            html += '	<div>';
            html += '		<ol class="layoutList">';
            html += '			<li>';
            html += '				<label for="' + this._id('_imgSrc') + '">' + $.ig.HtmlEditor.locale.imageUrlDialogText + '</label>';
            html += '				<input autocomplete="off" id="' + this._id('_imgSrc') + '" name="src" type="text" value="" />';
            html += '			</li>';
            html += '			<li>';
            html += '				<label for="' + this._id('_imgAlt') + '">' + $.ig.HtmlEditor.locale.imageAlternativeTextDialogText + '</label>';
            html += '				<input autocomplete="off" id="' + this._id('_imgAlt') + '" name="altText" type="text" value="" />';
            html += '			</li>';
            html += '			<li style="text-align:right">';
            html += '				<button aria-disabled="false" id="' + this._id('_btnApply') + '" name="insertLink" role="button" title="' + $.ig.HtmlEditor.locale.applyButtonTitle + '" type="button">' + $.ig.HtmlEditor.locale.applyButtonTitle + '</button>';
            html += '				<button aria-disabled="false" id="' + this._id('_btnCancel') + '" role="button" title="' + $.ig.HtmlEditor.locale.cancelButtonTitle + '" type="button">' + $.ig.HtmlEditor.locale.cancelButtonTitle + '</button>';
            html += '			</li>';
            html += '		</ol>';
            html += '	</div>';
            html += '</div>';

            //jscs:enable
            this.poContent.append(html);
        },
        _attachFormEvents: function () {
            var self = this;

            this.poContent.find("#" + this._id("_btnApply")).igButton({
                click: function (e) {
                    self._item.attr({
                        src: self._imgSrcFld.val(),
                        alt: self._imgAltFld.val()
                    });

                    self._trigger(self.events.apply, e, {
                        image: self._item
                    });

                    self.hide();
                }
            }).end()
                .find("#" + this._id("_btnCancel")).igButton({
                    click: function (e) {
                        self._trigger(self.events.cancel, e);
                        self.hide();
                    }
                });
        },
        _dataBind: function (image) {
            this._imgSrcFld.val(image.attr("src"));
            this._imgAltFld.val(image.attr("alt"));
        }
    });

    // End Dialogs

    /************************************
        End HTML Editor subcomponents
    ************************************/

    /************************************
        HTML Editor Utilities
    ************************************/

    //tableManipulator plugin
    var table,
        tableNumRows = 0,
        tableNumCols = 0,
        settings = {
            document: document,
            rows: 0,
            columns: 0,
            addSpacingChar: false
        },
        spacingChar = "",
        methods = {
            init: function (options) {

                // var self = this;

                return this.each(function () {
                    var tRows;
                    $.extend(settings, options);

                    if (this.nodeName.toLowerCase() !== "table") {
                        return;
                    }

                    if (settings.addSpacingChar) {
                        spacingChar = "&nbsp;";
                    }

                    table = $(this);
                    tRows = methods.getTableRows();

                    if (settings.rows && settings.rows > 0) {
                        tableNumRows = settings.rows;
                    } else {
                        tableNumRows = tRows.length;
                    }
                    if (settings.columns && settings.columns > 0) {
                        tableNumCols = settings.columns;
                    } else if (tRows[ 0 ]) {
                        tableNumCols = tRows[ 0 ].cells.length;
                    }
                    if (!table.children().length) {
                        methods.create();
                    }
                });
            },
            create: function () {
                var newRow,
                    i,
                    j;
                table.empty();
                for (i = 0; i < tableNumRows; i++) {
                    newRow = $("<tr></tr>", settings.document).appendTo(table);
                    for (j = 0; j < tableNumCols; j++) {
                        $("<td>" + spacingChar + "</td>", settings.document).appendTo(newRow);
                    }
                }
            },
            addRow: function (position) {
                var newRow = $("<tr></tr>", settings.document),
                    j;

                // S.T. Dec 17th 2015, Bug #210940: The check if (position) with 0 is false this the reason for adding at last on first selected row/col
                if (position !== undefined) {
                    newRow.insertAfter(methods.getTableRows().eq(position));
                } else {
                    newRow.appendTo(table);
                }

                for (j = 0; j < methods.getColumnsNum() ; j++) {
                    $("<td>" + spacingChar + "</td>", settings.document).appendTo(newRow);
                }
                return newRow;
            },
            removeRow: function (position) {
                var rows = methods.getTableRows(),
                    removedRow;

                // S.T. Dec 17th 2015, Bug #210940: The check if (position) with 0 is false this the reason for adding at last on first selected row/col.
                if (position !== undefined) {
                    removedRow = rows.eq(position).remove();
                } else {
                    removedRow = rows.last().remove();
                }
                return removedRow;
            },
            addColumn: function (position) {
                var columnCellsArr = [ ];

                methods.getTableRows().each(function (idx, el) {
                    var row = $(el),
                        columns = row.children("td"),
                        newColumn = $("<td>" + spacingChar + "</td>", settings.document);

                    // S.T. Dec 17th 2015, Bug #210940: The check if (position) with 0 is false this the reason for adding at last on first selected row/col.
                    if (position !== undefined && columns.length) {
                        columnCellsArr.push(newColumn.insertAfter(columns.eq(position))[ 0 ]);
                        return true;
                    }
                    columnCellsArr.push(newColumn.appendTo(row)[ 0 ]);
                });
                return $([ ]).pushStack(columnCellsArr);
            },
            removeColumn: function (position) {
                var removedRowsArr = [ ];

                methods.getTableRows().each(function (idx, el) {
                    var row = $(el);

                    // S.T. Dec 17th 2015, Bug #210940: The check if (position) with 0 is false this the reason for adding at last on first selected row/col.
                    if (position !== undefined) {
                        removedRowsArr.push(row.children("td").eq(position).remove());
                        return true;
                    }
                    removedRowsArr.push(row.children("td:last").remove());
                });
                return $([ ]).pushStack(removedRowsArr);
            },
            getRowsNum: function () {
                return methods.getTableRows().length;
            },
            getColumnsNum: function () {
                return methods.getTableCols().length;
            },

            // D.A. October 4th 2013, Bug #155868 Nested tables not working correctly
            getTableRows: function () {
                return table.children("tbody").children("tr");
            },
            getTableCols: function () {
                return table.children("tbody").children("tr").first().children("td");
            }
        };
    $.fn.tableManipulator = function (method) {
        if (methods[ method ]) {
            if (table === undefined || this !== table[ 0 ]) {
                table = $(this);
            }
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error("Method " + method + " does not exist on jQuery.tableManipulator");
    };

    // TODO: Remove IE7 support

    /************************************
        igSelectionWrapper
    ************************************/
    $.ig.SelectionWrapper = $.ig.SelectionWrapper || Class.extend({
        _selection: null,
        _range: null,
        _isIeOld: false,
        _window: null,
        _document: null,
        _commands: {
            insertunorderedlist: {
                name: "_insertList",
                browsers: null,
                args: [ "insertunorderedlist" ] },
            insertorderedlist: {
                name: "_insertList",
                browsers: null,
                args: [ "insertorderedlist" ] }
        },
        _css: {
            larger: "ui-ightmleditor-larger",
            smaller: "ui-ightmleditor-smaller"
        },
        NODE: new $.ig.XmlNodeType(),
        init: function (window, callback) {
            var self = this;
            this._window = window;
            this._document = this._window.document;

            if (!this._document.getSelection) {
                this._isIeOld = true;
            }

            if (this._isIeOld) {

                // K.D. July 18th, 2012 If we don't focus the selection with IE <= 8, then executing an action on the window
                // will incorrectly fire on the top-most parent window.
                this.focus();
                this._selection = this._document.selection;
                this._window.setTimeout(function () {
                    self._range = self._selection.createRange();
                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                }, 50);
            } else {
                this._selection = this._window.getSelection();
                this._window.setTimeout(function () {
                    self._range = (self._getSelection().rangeCount === 0) ?
                        self._document.createRange() : self._selection.getRangeAt(0);

                    // D.A. 27th August 2014, Bug #179347 When you click after the text
                    // and select formatting option, the text on the whole row gets updated
                    self._selectClosestTextNode();

                    if ($.isFunction(callback)) {
                        callback.call(self);
                    }
                }, 50);
            }
        },
        _getSelection: function () {
            return this._selection;
        },
        _getRange: function () {
            return this._range;
        },
        _isCommandSupportedByBrowser: function (command) {
            var supportedBrowsers, i;
            if (command === null || !this._commands.hasOwnProperty(command.toLowerCase())) {
                return;
            }
            if (this._commands[ command ].browsers === null) {
                return;
            }
            supportedBrowsers = this._commands[ command ].browsers;
            for (i = 0; i < supportedBrowsers.length; i++) {
                if ($.browser && $.browser.hasOwnProperty(supportedBrowsers[ i ])) {
                    return true;
                }
                if (!$.browser) {
                    if ($.ig.util.isIE || $.ig.util.isSafari || $.ig.util.isChrome) {
                        return true;
                    }
                }
            }
        },
        _findTextNodes: function (node, allTextNodes) {
            var self = this,
                $nodeContents = $(node).contents();

            if ($nodeContents.length > 0) {

                $nodeContents.each(function () {
                    if (this.nodeType === 3) {

                        // Push to allTextNodes when the element is a text node
                        allTextNodes.push(this);
                    } else {

                        // Recursively search for text nodes when the element is not a text node
                        self._findTextNodes(this, allTextNodes);
                    }
                });
            }
        },

        // Finds all text nodes into "node" and returns
        // them in the order that they are met in the document
        _findAllTextNodes: function (node) {
            var allTextNodes = [ ];

            this._findTextNodes(node, allTextNodes);

            return allTextNodes;
        },
        _selectClosestTextNode: function () {
            var children, closestToCaretNode, allTextNodes, textNodeToFocus,
                range = this._range;

            // D.A. 15th October 2014, Bug #182130 When selecting text and applying text formatting in IE selection gets lost.
            // Clicking at the end of a text node in FireFox and IE causes lost of selected styles,
            // because in this case range.startContainer is the top level parent instead of the text node.
            // We should focus the closest text node to the caret to ensure working with the correct selected styles.
            if (($.ig.util.isIE || $.ig.util.isFF) && range.collapsed &&
                range.startOffset > 0 && range.startContainer.nodeType === this.NODE._Element) {

                children = range.startContainer.childNodes;

                if (children.length > 0) {

                    // D.A., 30th October 2014, Bug #180892 In IE after pasting text and
                    // clicking at the end of it, selection changes to last text node
                    // This is the node right before the caret's current position
                    closestToCaretNode = children[ range.startOffset - 1 ];

                    if (closestToCaretNode.nodeType === 3) {

                        // When the element is a text node focus it
                        textNodeToFocus = closestToCaretNode;
                    } else {

                        // Focus last text node in the element
                        allTextNodes = this._findAllTextNodes($(closestToCaretNode));
                        textNodeToFocus = allTextNodes[ allTextNodes.length - 1 ];
                    }

                    // D.A. 9th September 2014, Bug #180280 When the element is link it should not be focused
                    if (textNodeToFocus && !$(textNodeToFocus).parent().is("a")) {
                        range.setStart(textNodeToFocus, textNodeToFocus.length);
                        range.collapse(true);

                        this._updateSelection(range);
                    }
                }
            }
        },
        surroundContents: function (wrapEl) {
            var range = this._getRange();
            if (this._isIeOld) {
                range.pasteHTML(wrapEl.html(range.text).get(0).outerHTML);
            } else {
                this._surroundContents($(range.commonAncestorContainer),
                    $(range.startContainer), $(range.endContainer), wrapEl);
            }

            return wrapEl;
        },
        getSelectedItem: function () {
            var range = this._getRange(),
                rangeParent = $(range.commonAncestorContainer);

            if (!this._isIeOld) {
                if (range.collapsed && (range.endContainer.nodeType === this.NODE._Text)) {
                    if (rangeParent.parent().is("img") || rangeParent.parent().is("td")) {
                        return rangeParent.parent();
                    }
                    return $(range.startContainer);
                }
                if (range.collapsed) {
                    return $(range.commonAncestorContainer);
                }
                if (range.collapsed && (range.endContainer.nodeType === this.NODE._Element)) {
                    return $(range.commonAncestorContainer.
                        childNodes[ range.endOffset - range.startOffset ]);
                }
                return $(range.commonAncestorContainer);
            }

            // K.D. July 18th, 2012 Bug #117375 Exception is thrown when trying to edit the content in Editing Content demo in IE7 or IE8
            if (range.parentElement !== undefined) {
                return $(range.parentElement());
            }
            if (range.commonParentElement !== undefined) {
                return $(range.commonParentElement());
            }
        },
        getSelectionAsText: function () {
            if (this._getRange().text !== undefined) {
                return this._getRange().text;
            }
            return this._getRange().toString();
        },
        select: function (element) {
            var selectedItem = element || this.getSelectedItem(),
                newRange;

            if (!this._isIeOld) {
                this._range.selectNodeContents(selectedItem[ 0 ]);
                this._selection.removeAllRanges();
                this._selection.addRange(this._range);
            } else {
                newRange = this._document.body.createTextRange();
                if (selectedItem.length === 1) {
                    newRange.moveToElementText(selectedItem[ 0 ]);
                }
                newRange.select();
            }
        },
        insertElement: function (element) {
            if (!this._isIeOld) {
                this._getRange().insertNode(element.get(0));
            } else {
                this._getRange().pasteHTML(element.get(0).outerHTML);
            }
        },
        execCommand: function (name, args) {
            var startEl, endEl, p,
                range = this._getRange(),
                customCommand = this._commands[ name ] ? this[ this._commands[ name ].name ] : null,
                customCommandArgs = this._commands[ name ] ? this._commands[ name ].args : null,
                browser = this._commands[ name ] ? this._commands[ name ].browsers : null,
                isCommandSupported = this._isCommandSupportedByBrowser(name);

            if (this._isIeOld) {
                range.select();

                // D.A. 21st August 2014, Bug #168180 The command should be executed
                // by the document not the range to work with iframe
                this._document.execCommand(name, false, args);
            } else {

                // TODO: Refactor the following code block
                // After the focus is restored to the editor most
                // of these cases might work well out of the box
                if (this._selection.isCollapsed && range.collapsed) {
                    if ($(range.startContainer).is("body")) {
                        startEl = $(range.startContainer).find(":first");

                        // D.A. March 17th 2014, Bug #167125, Fixed the case when the body has no elements
                        if (!startEl.length) {
                            startEl = $(range.startContainer);
                        }
                        range.selectNodeContents(startEl[ 0 ]);
                    } else if (range.startContainer.nodeType === this.NODE._Document) {
                        startEl = $(range.startContainer.body).find(":first");

                        // D.A. March 17th 2014, Bug #167125, Fixed the case when the body has no elements
                        if (!startEl.length) {
                            startEl = $(range.startContainer.body);
                        }
                        range.selectNodeContents(startEl[ 0 ]);
                    } else if (range.startContainer.nodeType === this.NODE._Text) {
                        this._document.execCommand(name, false, args);
                        return;
                    } else {

                        // In this case the range.startContainer.nodeType
                        // is most commonly of node type "element" (e.g. <p>)
                        startEl = $(range.startContainer);
                    }

                    if (startEl && startEl.is("br") && endEl && endEl.is("br")) {
                        p = $("<p><br /></p>", this._document);
                        startEl.replaceWith(p);
                        range.selectNodeContents(p[ 0 ]);
                        this._updateSelection(range);
                    }
                }
        
                // K.D. October 9th, 2012 Bug #115567 The browser version should be checked against >= 9 not === 9
                if (($.ig.util.isIE && $.ig.util.browserVersion >= 9) || $.ig.util.isOpera) {
                    // A.K August 8th, 2016 Bug #219768 Toolbar button does not work properly for a selected content range if a 
                    // text is initially selected by double-tapping, and the selection is changed by mouse dragging.
                    if(this._selection.focusNode.nodeType != 3){
                        this._updateSelection(range);
                    }
                }

                if ($.isFunction(customCommand) && browser === null) {
                    customCommand.call(this, name, args);
                } else if ($.isFunction(customCommand) && isCommandSupported) {
                    customCommand.apply(this, customCommandArgs);
                } else {
                    this._document.execCommand(name, false, args);
                }
            }
        },
        _insertList: function (listType, args) {
            var self = this,
                textNodes;
            this._document.execCommand(listType, false, args);

            // queryCommandState returns true if the command is executed on the object
            // and false if the command is not executed on the object.
            if (!this._document.queryCommandState(listType)) {
                if (this._selection.anchorNode &&
                    this._selection.anchorNode.nodeType === this.NODE._Text &&
                    $(this._selection.focusNode).is("body")) {
                    textNodes = $(this._selection.focusNode).contents().filter(function () {
                        if ($(this).is("br")) {
                            $(this).remove();
                            return false;
                        }
                        return this.nodeType === self.NODE._Text;
                    });

                    // K.D. July 16th, 2012 Bug #101208 Removing the code that initially creates a paragraph
                    // wrappedEl = textNodes.wrap(p[ 0 ]);
                    // this._range.selectNodeContents(wrappedEl[ 0 ]);
                    // this._updateSelection(this._range);
                }
            }

            // K.D. July 16th, 2012 Bug #101208 Removing the code that initially creates a paragraph
            // if ($(this._selection.anchorNode).is("body")) { //Only in FF
            // wrappedEl = $(this._selection.anchorNode).children().eq(this._selection.anchorOffset).wrap(p[ 0 ]).parent();
            // this._range.selectNodeContents(wrappedEl[ 0 ]);
            // this._updateSelection(this._range);
            // }
        },
        _getTextNodesOnlyCallback: function () {
            return this.nodeType === this.NODE._Text;
        },

        // Returns a text node.
        _wrapPartialString: function (string, start, end, wrapElName) {
            var stack = [ ];
            stack.push(this._document.createTextNode(string.slice(0, start)));
            stack.push(wrapElName.text(string.substring(start, end))[ 0 ]);
            stack.push(this._document.createTextNode(string.slice(end)));
            return $(stack);
        },
        _updateSelection: function (range) {
            this._selection.removeAllRanges();
            this._selection.addRange(range);
        },
        _surroundContents: function (commonParrent, startEl, endEl, wrapEl) {
            var self = this, startOffset, endOffset,
                rangeStart, rangeEnd, startElPar, endElPar,
                selection = this._getSelection(),
                range = this._getRange(),
                startElSiblings;

            if (startEl[ 0 ] === endEl[ 0 ]) {
                range.surroundContents(wrapEl.get(0));
                return wrapEl;
            }

            startOffset = range.startOffset;
            endOffset = range.endOffset;
            rangeStart = this._document.createRange();

            rangeStart.setStart(startEl.get(0), startOffset);
            rangeStart.setEnd(startEl.get(0), startEl.text().length);
            rangeStart.surroundContents(wrapEl.clone().get(0));
            selection.addRange(rangeStart);

            startElPar = this._getLastParentUntil(startEl, commonParrent);
            endElPar = this._getLastParentUntil(endEl, commonParrent);

            startElSiblings = startElPar.siblings();

            startElPar.siblings().each(function (i, el) {
                if (startElPar[ 0 ] === endElPar[ 0 ]) {
                    return;
                }

                var rangeClone = self._document.createRange();
                rangeClone.setStartBefore(el);
                rangeClone.setEndAfter(el);
                rangeClone.surroundContents(wrapEl.clone().get(0));
                selection.addRange(rangeClone);
            });

            rangeEnd = this._document.createRange();
            rangeEnd.setStart(endEl.get(0), 0);
            rangeEnd.setEnd(endEl.get(0), endOffset);
            rangeEnd.surroundContents(wrapEl.clone().get(0));
            selection.addRange(rangeEnd);

        },
        _getLastParentUntil: function (root, target) {
            while (root.parent().length) {
                if (root.parent()[ 0 ] === target[ 0 ]) {
                    return root;
                }
                root = root.parent();
            }
        },
        replaceNode: function (newNode) {
            var range = this._getRange(),
                selItem = this.getSelectedItem();

            // D.G., 19th February 2016, Bug #214449 - In IE and FireFox Insert Link dialog is not closed when click on Apply
            // if newNode is the same as refence as selItem then in IE and FF
            // HierarchyRequestError(https://msdn.microsoft.com/en-us/library/ff975445(v=vs.85).aspx) is thrown
            // when insertNode is called. Also there is no point replacing the same node with its self
            if (selItem.is(newNode)) {
                return;
            }

            if (range.startOffset !== range.endOffset) {
                range.deleteContents();
            }
            if (range.insertNode !== undefined && !selItem.parent().is("a")) {
                range.insertNode(newNode[ 0 ]);
            } else if (range.pasteHTML !== undefined) {
                range.pasteHTML(newNode[ 0 ].outerHTML);
            }
        },
        insertTable: function (table) {
            var $body, $firstP,
                selItem = this.getSelectedItem(),
                br = $("<br>", this._document);

            if (selItem[ 0 ].nodeType === this.NODE._Document) {
                $body = selItem.find("body");
                $firstP = $body.children("p").first();

                // D.A. 27th April 2015, Bug #193205 Table cannot be inserted when the <p> tag was removed
                if ($firstP.length > 0) {
                    this._range.selectNodeContents($firstP[ 0 ]);
                } else {
                    this._range.selectNodeContents($body[ 0 ]);
                }

                this._range.insertNode(table[ 0 ]);
            } else if (selItem.is("td")) {
                table.appendTo(selItem);
            } else if (selItem.is("table")) {
                selItem.replaceWith(table);
            } else if (selItem.is("br")) {
                selItem.replaceWith(table);
            } else {

                // K.D. July 19th, 2012 Bug #117424 Exception is thrown when inserting a table in IE7 or IE8
                if (this._range.insertNode !== undefined) {
                    this._range.insertNode(table[ 0 ]);
                } else if (this._range.pasteHTML !== undefined) {
                    // This case is IE7/IE8
                    this._range.select();
                    this._range.pasteHTML(table[ 0 ].outerHTML);
                }
            }
            if (this._range.selectNodeContents !== undefined) {
                this._range.selectNodeContents(br.insertAfter(table)[ 0 ]);
            }
        },
        focus: function () {
            var focusTarget;

            if (this._isIeOld) {
                this._document.body.focus();
            } else if ((this._range.startContainer.nodeType === this.NODE._Document ||
                 $(this._range.startContainer).is("body")) && this._range.collapsed) {

                // When the start container is the document or the body we will
                // set it to the first element, because commands like insert img / link
                // cannot be executed against the document / body in Chrome and IE

                focusTarget = $(this._document.body).find(":not(br):first");

                if (focusTarget.length > 0) {
                    this._range.setStart(focusTarget[ 0 ], 0);
                    this._range.setEnd(focusTarget[ 0 ], 0);
                    this._document.body.focus();
                }
            } else {

                // This is the default case
                // The focus is restored to its previous position

                // D.A., 15th August 2014, Bug #168180 When changing font family and font
                // size the new values are not applied on the typed text in IE and Firefox
                if ($.ig.util.isIE) {

                    // Combo takes the focus from the editor in IE
                    // Return the focus and selection as it was
                    // This causes lost of the last chosen command when
                    // selecting multiple commands at once without clicking
                    // or typing something to trigger onSelectionChange
                    
                    // A.K August 8th, 2016 Bug #219768 Toolbar button does not work properly for a selected content range if a 
                    // text is initially selected by double-tapping, and the selection is changed by mouse dragging.
                    if(this._selection.focusNode.nodeType != 3){
                        this._updateSelection(this._range);
                    }
                } else {

                    // Return the focus to the body
                    // FireFox needs focus to execude commands such as fontName
                    this._document.body.focus();
                }
            }
        }
    });

    /************************************
        End HTML Editor Utilities
    ************************************/

    /************************************
        HTML Editor Toolbars
    ************************************/

    $.ig.ToolbarHelper = $.ig.ToolbarHelper || Class.extend({
        _toolbarsItemsLocation: {
            textToolbar: {
                name: "textToolbar",
                bold: { name: "bold" },
                italic: { name: "Italic" },
                underline: { name: "Underline" },
                strikethrough: { name: "Strikethrough" },
                fontFamily: { name: "fontFamily" },
                fontSize: { name: "fontSize" },
                formatsList: { name: "formatsList" }
            },
            formattingToolbar: {
                name: "formattingToolbar",
                justifyleft: { name: "justifyleft" },
                justifycenter: { name: "justifycenter" },
                justifyright: { name: "justifyright" },
                justifyfull: { name: "justifyfull" },
                bullets: { name: "bullets" },
                indent: { name: "indent" },
                outdent: { name: "outdent" },
                textColor: { name: "textColor" },
                backgroundTextColor: { name: "backgroundTextColor" }
            },
            insertObjectToolbar: {
                name: "insertObjectToolbar",
                image: { name: "image" },
                link: { name: "link" },
                table: { name: "table" },
                addRow: { name: "addRow" },
                addColumn: { name: "addColumn" },
                removeRow: { name: "removeRow" },
                removeColumn: { name: "removeColumn" }
            },
            copyPasteToolbar: {
                name: "copyPasteToolbar",
                copy: { name: "copy" },
                cut: { name: "cut" },
                paste: { name: "paste" },
                undo: { name: "undo" },
                redo: { name: "redo" }
            }
        },
        init: function (window, toolbars) {
            this._toolbars = {};
            this._w = window;
            this._d = window.document;
            var self = this;

            toolbars.each(function (idx, el) {
                var igToolbarName = $(el).igToolbar("option", "name");
                self._toolbars[ igToolbarName ] = $(el);
            });

            this._initAlignButtons(toolbars);
            this._disableUnsupportedItems();
            this._disableTableControls(true);
        },
        _initAlignButtons: function (toolbars) {
            var alignButtonsToolbar = this._toolbars.formattingToolbar,
                alignButtons = {
                    justifyleft: alignButtonsToolbar.igToolbar("getItem", "justifyleft"),
                    justifycenter: alignButtonsToolbar.igToolbar("getItem", "justifycenter"),
                    justifyright: alignButtonsToolbar.igToolbar("getItem", "justifyright"),
                    justifyfull: alignButtonsToolbar.igToolbar("getItem", "justifyfull")
                };

            toolbars.bind("igtoolbartoolbarbuttonclick", function (e, ui) {
                if (alignButtons.hasOwnProperty(ui.name)) {
                    $.each(alignButtons, function (buttonName, button) {
                        if (buttonName !== ui.name &&
                            button.igToolbarButton("option", "isSelected")) {
                            button.igToolbarButton("toggle");
                            return;
                        }
                    });
                }
            });
        },
        _disableUnsupportedItems: function () {
            var copyPasteToolbar = this._toolbars.copyPasteToolbar;
            if (!$.ig.util.isIE) {
                copyPasteToolbar.igToolbar("disableItem", "cut", true);
                copyPasteToolbar.igToolbar("disableItem", "copy", true);
                copyPasteToolbar.igToolbar("disableItem", "paste", true);
            }
        },
        _disableTableControls: function (toDisable) {
            var insertObjectToolbar = this._toolbars.insertObjectToolbar;
            if (!toDisable && this._isTableControlsDisabled) {
                insertObjectToolbar.igToolbar("disableItem", "addColumn", false);
                insertObjectToolbar.igToolbar("disableItem", "removeColumn", false);
                insertObjectToolbar.igToolbar("disableItem", "addRow", false);
                insertObjectToolbar.igToolbar("disableItem", "removeRow", false);
                this._isTableControlsDisabled = false;
            } else if (toDisable && !this._isTableControlsDisabled) {
                insertObjectToolbar.igToolbar("disableItem", "addColumn", true);
                insertObjectToolbar.igToolbar("disableItem", "removeColumn", true);
                insertObjectToolbar.igToolbar("disableItem", "addRow", true);
                insertObjectToolbar.igToolbar("disableItem", "removeRow", true);
                this._isTableControlsDisabled = true;
            }
        },
        _callbackMap: {
            _isBold: "_onBold",
            _isItalic: "_onItalic",
            _isUnderlined: "_onUnderlined",
            _isLineThrough: "_onLineThrough",

            // _isAligned: "_onAlign",
            _isJustifyCenter: "_onAlign",
            _isJustifyFull: "_onAlign",
            _isJustifyLeft: "_onAlign",
            _isJustifyRight: "_onAlign",
            _isOrderedList: "_onList",
            _isUnorderedList: "_onList",
            _hasFontName: "_onFontName",
            _hasFontSize: "_onFontSize",
            _isTable: "_onTable"
        },
        analyse: function (el) {

            // All toolbars button are first deactivated
            // Current selection state is retrieved from queryCommandState or from getComputedStyle
            // Then the corresponding buttons are activated to reflect the selection state

            var self = this,
                justify;

            this._resetToolbars();

            if (el[ 0 ].nodeType === 9) {
                this._computedStyles = (this._w.getComputedStyle &&
                    this._w.getComputedStyle(this._d.body)) || this._d.body.currentStyle;
            } else {
                this._computedStyles = (this._w.getComputedStyle &&
                    this._w.getComputedStyle(el[ 0 ])) || el[ 0 ].currentStyle;
            }

            // K.D. November 19th, 2012 Bug #127274 Heading elements never get analyzed by tag name
            if (el.is(":header")) {
                this._onHeader(el);
            }

            $.each(this._callbackMap, function (isTrueFunc, callback) {
                var isTrueRes = self[ isTrueFunc ](el);
                if ($.isFunction(self[ isTrueFunc ]) && isTrueRes &&
                    $.isFunction(self[ callback ])) {
                    self[ callback ](el, isTrueRes);

                    // Bug #184142 In IE justify left button is not active by default
                    if (callback === "_onAlign") {
                        justify = true;
                    }
                }
            });

            if (!justify) {

                // Activate justify left as default
                this._onAlign(el, "justifyleft");
            }

            if (!el.is("table") && !el.is("td")) {
                this._disableTableControls(true);
            }
        },
        _isBold: function () {

            // D.A. Bug #174295 Deselecting Bold, Italic, Underline and Striketrough buttons leaves them in active state
            return this._d.queryCommandState("bold");
        },
        _isItalic: function () {
            return this._d.queryCommandState("italic");
        },
        _isUnderlined: function () {
            return this._d.queryCommandState("underline");
        },
        _isLineThrough: function () {
            return this._d.queryCommandState("strikethrough");
        },
        _isJustifyCenter: function () {
            if (this._d.queryCommandState("justifycenter")) {
                return "justifycenter";
            }
        },
        _isJustifyFull: function () {
            if (this._d.queryCommandState("justifyfull")) {
                return "justifyfull";
            }
        },
        _isJustifyLeft: function () {
            if (this._d.queryCommandState("justifyleft")) {
                return "justifyleft";
            }
        },
        _isJustifyRight: function () {
            if (this._d.queryCommandState("justifyright")) {
                return "justifyright";
            }
        },
        _isOrderedList: function () {
            if (this._d.queryCommandState("insertorderedlist")) {
                return "InsertOrderedList";
            }
        },
        _isUnorderedList: function () {
            if (this._d.queryCommandState("insertunorderedlist")) {
                return "InsertUnorderedList";
            }
        },
        _isTable: function (el) {
            if (el.is("table") || el.is("td")) {
                return true;
            }
        },
        _checkParents: function (el, wanted) {
            while (el.parent()) {
                if (el.parent().is(wanted)) {
                    return true;
                }
                if (el.is("body")) {
                    return;
                }
                el = el.parent();
            }
        },
        _hasFontName: function () {
            var fontName = this._getFontFamily();
            if (fontName === "serif") {
                fontName = "Times New Roman";
            }
            return fontName;
        },
        _getFontFamily: function () {

            // D.U. 21th of July 2014 #174295 Checking inside the query
            // for font name value no in selection wrapper saved values
            var fontName = this._d.queryCommandValue("FontName");

            // Use computed styles font name when the query command does not return the value
            if (fontName === "") {
                fontName = this._computedStyles.fontFamily;
            }

            return fontName;
        },
        _hasFontSize: function () {
            return this._computedStyles.fontSize;
        },
        _onBold: function () {
            this._toolbars.textToolbar.igToolbar("getItem", "Bold").igToolbarButton("toggle");
        },
        _onItalic: function () {
            this._toolbars.textToolbar.igToolbar("getItem", "Italic").igToolbarButton("toggle");
        },
        _onUnderlined: function () {
            this._toolbars.textToolbar.igToolbar("getItem", "Underline").igToolbarButton("toggle");
        },
        _onLineThrough: function () {
            this._toolbars.textToolbar.igToolbar("getItem", "Strikethrough")
                .igToolbarButton("toggle");
        },
        _onAlign: function (el, dir) {
            this._toolbars.formattingToolbar.igToolbar("getItem", dir)
                .igToolbarButton("toggle");
        },
        _onList: function (el, listType) {
            this._toolbars.formattingToolbar.igToolbar("getItem", listType)
                .igToolbarButton("toggle");
        },
        _onFontName: function (el, fontName) {
            var combo = this._toolbars.textToolbar.igToolbar("getItem", "fontFamily");

            // K.D. November 1st, 2012 Bug #125724 The combo values do not contain ' or " so they need to be removed before sending the value
            fontName = fontName.replace(/'|"/g, "");
            this._setComboValue(combo, $.ig.HtmlEditor.locale
                .fontNames[ /^win/gi.test(navigator.platform) ? "win" : "mac" ], fontName);
        },
        _onFontSize: function () {

            // Conversion table pixel to font size units
            var pxTbl = {
                "11": 1,
                "13": 2,
                "16": 3,
                "19": 4,
                "24": 5,
                "32": 6
            },

            // D.A. 28th October 2014, Bug #183490 We should round the font size style in IE, because when choosing some headings it is a float number e.g. 18.73px
            fontSizeUnits = this._d.queryCommandValue("fontsize") ||
                pxTbl[ Math.round(parseFloat(this._computedStyles.fontSize)) ],
                fontSizeUnitsStr = fontSizeUnits ? fontSizeUnits.toString() : "",
                combo = this._toolbars.textToolbar.igToolbar("getItem", "fontSize");
            this._setComboValue(combo, $.ig.HtmlEditor.locale.fontSizes, fontSizeUnitsStr);
        },
        _onHeader: function (element) {

            // K.D. November 19th, 2012 Bug #127274 Heading elements never get analyzed by tag name.
            var combo = this._toolbars.textToolbar.igToolbar("getItem", "formatsList");
            this._setComboValue(combo, $.ig.HtmlEditor.locale.formatsList,
                element[ 0 ].nodeName.toLowerCase());
        },
        _onTable: function () {
            this._disableTableControls(false);
        },
        _setComboValue: function (combo, values, newValue, valueKey) {
            var i,
                dsValueKey = valueKey || valueKey === undefined ? "text" : valueKey,
                currentValue = values[ combo.igCombo("index") ][ dsValueKey ],
                dataSourceValue;

            if (newValue === currentValue) {
                return;
            }

            for (i = 0; i < values.length; i++) {
                dataSourceValue = values[ i ][ dsValueKey ];
                if (newValue === dataSourceValue) {
                    combo.igCombo("index", i);
                    break;
                }
            }
        },
        _resetToolbars: function () {
            $.each(this._toolbars, function (idx, el) {
                $(el).igToolbar("deactivateAll");
            });
        }
    });
    /************************************
        End HTML Editor Toolbars
    ************************************/

    $.extend($.ui.igHtmlEditor, { version: "<build_number>" });
}(jQuery));
