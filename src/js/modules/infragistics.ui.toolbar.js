﻿/*!@license
 * Infragistics.Web.ClientUI Toolbar <build_number>
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
 *   infragistics.util.jquery.js
 *   infragistics.ui.shared.js
 *   infragistics.ui.widget.js
 *   infragistics.ui.popover.js
 *   infragistics.ui.toolbarbutton.js
 *   infragistics.ui.splitbutton.js
 *   infragistics.ui.colorpicker.js
 *   infragistics.ui.colorpickersplitbutton.js
 *   infragistics.ui.combo.js
 */

/*global Class */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.toolbarbutton"
		], factory );
	} else {

		// Browser globals
		return factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    $.ig.igToolbarItemBaseDescriptor = Class.extend({
        settings: {
            width: null,
            height: null,
            props: {
                scope: {
                    value: null
                }
            }
        },
        _updatedProperties: [  ],
        init: function (item) {
            this.settings = $.extend(true, {}, this.settings, item);
            this.name = item.name;
            this.type = item.type;
            if (this.settings.scope) {
                this.settings.props.scope = this.settings.scope;
            }
        },
        updateProperty: function (name, value) {
            this.settings.props[ name ].value = value;
            this._updatedProperties.push(this.settings.props[ name ]);
        },
        getProperty: function (name) {
            return this.settings.props[ name ];
        },
        getUpdatedProperties: function () {
            return this._updatedProperties;
        },
        getProperties: function () {
            return this.settings.props;
        },
        getLocaleProperties: function () {
            return this.settings.localeProperties;
        },
        callbackRenderer: function () {
            if (this.settings.callbackRenderer && $.isFunction(this.settings.callbackRenderer)) {
                return this.settings.callbackRenderer();
            }
        },
        handler: function () {
            return this.settings.handler;
        }
    });

    $.ig.igToolbarButtonDescriptor = $.ig.igToolbarItemBaseDescriptor.extend({
        settings: {
            props: {
                onlyIcons: {
                    value: true
                },
                labelText: {
                    value: "&nbsp;"
                }
            }
        },
        init: function (item) {
            this._super(item);
        }
    });

    $.ig.igToolbarSplitButtonDescriptor = $.ig.igToolbarItemBaseDescriptor.extend({
        settings: {
            props: {
                items: [  ]
            }
        },
        init: function (item) {
            this._super(item);
        }
    });

    $.ig.igToolbarComboDescriptor = $.ig.igToolbarItemBaseDescriptor.extend({
        settings: {
            props: {
                valueKey: {
                    value: "text"
                },
                textKey: {
                    value: "value"
                },
                dropDownOnFocus: {
                    value: true
                },
                enableClearButton: {
                    value: false
                },
                dataSource: {
                    value: null
                },
                mode: {
                    value: "dropdown"
                },
                inputName: {
                    value: null
                }
            }
        },
        init: function (item) {
            this._super(item);
            if (this.settings.dataSource) {
                this.settings.props.dataSource.value = this.settings.dataSource;
            }
        }
    });

    /*
		The igToolbar is a jQuery based widget that support a set from toolbar buttons,
        split buttons, color picker split buttons, and combos.
	*/
    $.widget("ui.igToolbar", $.ui.igWidget, {
        options: {
            /* type="numeric" Set/Get the widget height.
            ```
                 //Initialize
                $(".selector").igToolbar({
                    height: 200
                });

                // Get
                var height = $(".selector").igToolbar("option", "height");

                // Set
                $(".selector").igToolbar("option", "height", 150);
            ```
            */
            height: null,
            /* type="numeric" Set/Get the widget width.
            ```
                //Initialize
                $(".selector").igToolbar({
                    width: 100
                });

                // Get
                var width = $(".selector").igToolbar("option", "width");

                // Set
                $(".selector").igToolbar("option", "width", 100);
            ```
            */
            width: null,
            /* type="boolean" Get/Set whether the toolbar can be collapsed.
            ```
                //Initialize
                $(".selector").igToolbar({
                    allowCollapsing: true
                });

                // Get
                var allowCollapsing = $(".selector").igToolbar("option", "allowCollapsing");

                // Set
                $(".selector").igToolbar("option", "allowCollapsing", false);
            ```
            */
            allowCollapsing: true,
            /* type="string" The css class that will be applied to collapseButtonIcon.
            ```
                //Initialize
                $(".selector").igToolbar({
                    collapseButtonIcon: "ui-igbutton-collapsed"
                });

                // Get
                var collapseButtonIcon = $(".selector").igToolbar("option", "collapseButtonIcon");

                // Set
                $(".selector").igToolbar("option", "collapseButtonIcon", "ui-igbutton-collapsed");
            ```
            */
            collapseButtonIcon: "ui-igbutton-collapsed",
            /* type="string" The css class that will be applied to the expand/collapse button icon.
            ```
                //Initialize
                $(".selector").igToolbar({
                    expandButtonIcon: "ui-igbutton-expanded"
                });

                // Get
                var expandButtonIcon = $(".selector").igToolbar("option", "expandButtonIcon");

                // Set
                $(".selector").igToolbar("option", "expandButtonIcon", "ui-igbutton-expanded");
            ```
            */
            expandButtonIcon: "ui-igbutton-expanded",
            /* type="string" Formal name of the widget.
            ```
                //Initialize
                $(".selector").igToolbar({
                    name: "textToolbar"
                });

                // Get
                var name = $(".selector").igToolbar("option", "name");

                // Set
                $(".selector").igToolbar("option", "name", "textToolbar");
            ```
            */
            name: "",
            /* type="string" Display Name of the widget.
            ```
                //Initialize
                $(".selector").igToolbar({
                    displayName: "toolbar"
                });

                // Get
                var displayName = $(".selector").igToolbar("option", "displayName");

                // Set
                $(".selector").igToolbar("option", "displayName", "toolbar");
            ```
            */
            displayName: "",
            /* type="array" Get/Set Toolbar's items.
            ```
                //Initialize
                $(".selector").igToolbar({
                    items: [{
                        "name": "Italic",
                        "type": "button",
                        "props": {
                            "isItalic": {
                                "value": false,
                                "action": "_isSelectedAction"
                            },
                            "italicButtonTooltip": {
                                "value": "Italic",
                                "action": "_tooltipAction"
                            },
                            "italicButtonIcon": {
                                "value": "ui-igbutton-italic",
                                "action": "_buttonIconAction"
                            }
                        },
                        "name": "Italic",
                        "type": "button",
                        "props": {
                            "isItalic": {
                                "value": false,
                                "action": "_isSelectedAction"
                            },
                            "italicButtonTooltip": {
                                "value": "Italic",
                                "action": "_tooltipAction"
                            },
                            "italicButtonIcon": {
                                "value": "ui-igbutton-italic",
                                "action": "_buttonIconAction"
                            }
                        }
                    }]
                });

                // Get
                var items = $(".selector").igToolbar("option", "items");

                // Set
                var items = [{
                                "name": "Italic",
                                "type": "button",
                                "props": {
                                    "isItalic": {
                                        "value": false,
                                        "action": "_isSelectedAction"
                                    },
                                    "italicButtonTooltip": {
                                        "value": "Italic",
                                        "action": "_tooltipAction"
                                    },
                                    "italicButtonIcon": {
                                        "value": "ui-igbutton-italic",
                                        "action": "_buttonIconAction"
                                    }
                                }
                            }];
                $(".selector").igToolbar("option", "items", items);
            ```
            */
            items: [  ],
            /* type="boolean" Get/Set whether the widget is expanded initially.
            ```
                //Initialize
                $(".selector").igToolbar({
                    isExpanded: true
                });

                // Get
                var isExpanded = $(".selector").igToolbar("option", "isExpanded");

                // Set
                $(".selector").igToolbar("option", "isExpanded", false);
            ```
            */
            isExpanded: true,
            locale: {
				/* type="boolean" Gets/Sets collapse button title.
            ```
                //Initialize
                $(".selector").igToolbar({
                    locale: {
						collapseButtonTitle: "Collapse {0}"
					}
                });

                // Get
                var text = $(".selector").igToolbar("option", "locale").collapseButtonTitle;

                // Set
                $(".selector").igToolbar("option", "locale", {collapseButtonTitle: "Collapse {0}"});
            ```
            */
				collapseButtonTitle: undefined,
				/* type="boolean" Gets/Sets expand button title.
				```
				//Initialize
					$(".selector").igToolbar({
					locale: {
							expandButtonTitle: "Expand {0}"
						}
					});

					// Get
					var text = $(".selector").igToolbar("option", "locale").expandButtonTitle;

					// Set
					$(".selector").igToolbar("option", "locale", {expandButtonTitle: "Expand {0}"});
				```
				*/
				expandButtonTitle: undefined
			}
        },
        events: {
            /*cancel="false" Event fired after a click on any toolbar button
            ```
                //Initialize
                $(".selector").igToolbar({
                    toolbarButtonClick: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbartoolbarbuttonclick", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            toolbarButtonClick: "toolbarButtonClick",
            /*cancel="true" Event is fired before the toolbar is opened.
            ```
                //Initialize
                $(".selector").igToolbar({
                    toolbarComboOpening: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbartoolbarcomboopening", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            toolbarComboOpening: "toolbarComboOpening",
            /*cancel="false" Event fired after toolbar combo is selected
            ```
                //Initialize
                $(".selector").igToolbar({
                    toolbarComboSelected: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbartoolbarcomboselected", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            toolbarComboSelected: "toolbarComboSelected",
            /*cancel="false" Event fired after a click on custom item
            ```
                //Initialize
                $(".selector").igToolbar({
                    toolbarCustomItemClick: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbartoolbarcustomitemclick", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            toolbarCustomItemClick: "toolbarCustomItemClick",
            /*cancel="false" Event fired after item is removed
            ```
                //Initialize
                $(".selector").igToolbar({
                    itemRemoved: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbaritemremoved", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            itemRemoved: "itemRemoved",
            /*cancel="false" Event fired after item is added
            ```
                //Initialize
                $(".selector").igToolbar({
                    itemAdded: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbaritemadded", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            itemAdded: "itemAdded",
            /*cancel="true" Event is fired before item is collapsed.
            ```
                //Initialize
                $(".selector").igToolbar({
                    collapsing: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbarcollapsing", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            collapsing: "collapsing",
            /*cancel="false" Event fired after item is collapsed
            ```
                /Initialize
                $(".selector").igToolbar({
                    collapsed: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbarcollapsed", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            collapsed: "collapsed",
            /*cancel="true" Event fired before item is expanded
            ```
                //Initialize
                $(".selector").igToolbar({
                    expanding: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbarexpanding", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            expanding: "expanding",
            /*cancel="false" Event fired after item is expanded
            ```
                //Initialize
                $(".selector").igToolbar({
                    expanded: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbarexpanded", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            expanded: "expanded",
            /*cancel="false" Fired after item is dissabled
            ```
                //Initialize
                $(".selector").igToolbar({
                    itemDisable: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbaritemdisable", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            itemDisable: "itemDisable",
            /*cancel="false" Fired after item is enabled
            ```
                //Initialize
                $(".selector").igToolbar({
                    itemEnabled: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbaritemenabled", ".selector", function (evt, ui) {
                    //return reference to igToolbar object
                    ui.owner
                    //return type of the event
                    evt.type
                });
            ```
            */
            itemEnabled: "itemEnabled",
            /*cancel="false" Fired after the window is resized
            ```
                //Initialize
                $(".selector").igToolbar({
                    windowResized: function (evt, ui) {...}
                });

                //Bind after initialization
                $(document).on("igtoolbarwindowresized", ".selector", function (evt, ui) {
                    //return type of the event
                    evt.type
                });
            ```
            */
            windowResized: "windowResized"
        },
        css: {
            /* The widget base class css. */
            toolbarWidget: "ui-widget ui-widget-content ui-igtoolbar ui-corner-all",
            /* The widget wrapper class css. */
            toolbarWrapperConteiner: "ui-widget ui-widget-content ui-igtoolbar ui-corner-all",
            /* The widget collapse button class css. */
            toolbarCollapsedButton: "ui-state-default ui-igbutton-all-caps",
            /* The widget toolbar separator class css. */
            igToolbarSeparator: "ig-toolbar-separator ui-widget-content",
            /* The widget toolbar button holder css class. */
            igToolbarButtonsHolder: "ig-toolbar-buttons-holder"
        },
        _id: function (id) {
            return this.element[ 0 ].id + id;
        },
        widget: function () {
            /* Returns the element on which the widget was instantiated
            ```
                $(".selector").igToolbar("widget");
            ```
            */
            return this.element;
        },
        _create: function () {
            var itemDescriptor, i,
                toolbar = this.options;

            for (i = 0; i < toolbar.items.length; i++) {

                if (!toolbar.items[ i ].type) {
                    toolbar.items[ i ].type = "custom";
                }

                itemDescriptor = toolbar.items[ i ] =
                    this._getToolbarItemDescriptor(toolbar.items[ i ]);
            }

            this._render();
            this._createItems();

            // D.U. 13.08.2014 calling once to fit the toolbar items
            this._onResize();
        },
        _getToolbarItemDescriptor: function (item) {
            return new this._toolbarItemsDescriptors[ item.type ](item);
        },
        _toolbarItemsDescriptors: {
            button: $.ig.igToolbarButtonDescriptor,
            "0": $.ig.igToolbarButtonDescriptor,
            combo: $.ig.igToolbarComboDescriptor,
            "1": $.ig.igToolbarComboDescriptor,
            splitButton: $.ig.igToolbarSplitButtonDescriptor,
            "2": $.ig.igToolbarSplitButtonDescriptor,
            splitButtonColor: $.ig.igToolbarSplitButtonDescriptor,
            "3": $.ig.igToolbarSplitButtonDescriptor,
            custom: $.ig.igToolbarItemBaseDescriptor
        },
        _init: function () {
            this._attachEvents();

            if (!this.options.isExpanded) {
                this.buttonsList.hide();
                this.collapseBtn
                    .igToolbarButton("toggle")
                    .children(":first")
                        .switchClass(this.options.collapseButtonIcon,
                            this.options.expandButtonIcon);
            }

            this._width = this.collapseBtn.outerWidth(true) + this.buttonsList.width();
            this._height = this.element.height();
        },
        _render: function () {
            var o = this.options;

            this.element
                .addClass(this.css.toolbarWidget)
                .width(this.options.width)
                .height(this.options.height);

            this.collapseBtn = $('<div tabIndex="0" id="' +
                this._id("_collapseButton") + '"></div>')
                .appendTo(this.element)
				.attr({
					"data-state": "expand"
				})
                .igToolbarButton({
                    "onlyIcons": true,
                    "labelText": "&nbsp;",
                    "title": this._getTooltipByExpandState("expand"),
                    "icons": {
                        "primary": o.collapseButtonIcon
                    }
                });

            this.toolbarBody = this.element.find("#" + this._id("_toolbar"));

            // D.U. 30.04.2014 changing type from span to div and adding a class instead of inline css
            this.buttonsList = $('<div id="' + this._id("_toolbar_buttons") +
                '" class="' + this.css.igToolbarButtonsHolder + '"></div>')
                .appendTo(this.element);
        },
        _onCollapse: function (e) {
            var noCancel, event, cancelableEvent,
                options = this.options, width,
                self = this;

            // S.T. 18th of Dec, 2015 Bug #210622: Stop propagation of collapse button click because thrown exception in toolbar when allowCollapsing is set to false.
            e.stopPropagation();

            if (!options.allowCollapsing) {
                return;
            }

            if (options.isExpanded) {
                event = "collapsed";
                cancelableEvent = "collapsing";

                // S.T. 8th September 2014, Bug #177511: Prevent collapsing if the event is cancelled.
                noCancel = this._trigger(this.events[ cancelableEvent ], e, {
                    owner: this,
                    toolbarElement: this.element,
                    toolbar: {}
                });

                if (noCancel) {
                    options.isExpanded = false;
                    width = this.element.height();
                    this._oldWidth = this._width;

                    this.collapseBtn
                        .attr({
							"title": this._getTooltipByExpandState("collapse"),
							"data-state": "collapse"
						})
                        .children(":first")
                            .switchClass(this.options.collapseButtonIcon,
                                this.options.expandButtonIcon);
                }
            } else {
                event = "expanded";
                cancelableEvent = "expanding";

                // S.T. 8th September 2014, Bug #177511: Prevent expanding if the event is cancelled.
                noCancel = this._trigger(this.events[ cancelableEvent ], e, {
                    owner: this,
                    toolbarElement: this.element,
                    toolbar: {}
                });

                if (noCancel) {
                    options.isExpanded = true;

                    this.buttonsList.show();
                    width = this._getAdjustedWidth();

                    this.collapseBtn
                        .attr({
							"title": this._getTooltipByExpandState("expand"),
							"data-state": "expand"
						})
                        .children(":first")
                            .switchClass(this.options.expandButtonIcon,
                                this.options.collapseButtonIcon);
                }
            }

            if (noCancel) {
                this.element.css({
                    overflow: "hidden"
                });

                this.element.animate({ width: width }, 300, null, function () {
                    if (!options.isExpanded) {
                        self.buttonsList.hide();
                    } else {
                        // D.A. 29th August 2014, Bug #178021 When collapse and then expand
                        // the TextToolbar and then resize the window the toolbar is not correct
                        // After expand we should reset the width to "auto",
                        // to ensure when we hide buttons the width is auto adjusted
                        self.element.css("width", "");
                    }

                    self._trigger(self.events[ event ], e, {
                        owner: self,
                        toolbarElement: self.element,
                        toolbar: {}
                    });
                });
            }
        },

        // D.U. 13.08.2014 Adjusting to the case while you expand after screen resizing
        _getAdjustedWidth: function () {
            var width;

            if (!this.options.isExpanded) {

                // Adjust to collapse button size
                width = this.element.height();
            } else {

                // D.A. 15th August 2014, Fixed how width is calculated
                width = this.buttonsList.outerWidth(true) + this.collapseBtn.outerWidth(true);
            }

            return width;
        },
        /* S.T. 18th of Dec, 2015 Bug #210622: Fix set method for items. Now you can set items such as
        $("#testEditor").igHtmlEditor("option", "toolbarSettings", [ {
            name: "textToolbar",
            items: [ {
                    "name": "Bold",
                    "type": "button",
                    "scope": null,
                    "props": {
                        "allowToggling": {
                            "value": true
                        },
                        "isBold": {
                            "value": false,
                            "action": "_isSelectedAction"
                        },
                        "boldButtonTooltip": {
                            "value": "Bold",
                            "action": "_tooltipAction"
                        },
                        "boldButtonIcon": {
                            "value": "ui-igbutton-bold",
                            "action": "_buttonIconAction"
                        }
                    }
                } ]
        } ]);
        */
        _setOption: function (name, value) {
			this._super(name, value);
            var i, options = this.options;

            switch (name) {
            case "allowCollapsing":
                this.options.allowCollapsing = value;
                break;
            case "items":
                for (i = 0; i < value.length; i++) {
                    if (!value[ i ].type) {
                        value[ i ].type = "custom";
                    }

                    value[ i ] = this._getToolbarItemDescriptor(value[ i ]);
                }

                this._updateItems(value);
                this.options.items = value;
                this._createItems();
                break;
            case "width":
                this.element.width(value);
                break;
            case "height":
                this.element.height(value);
                break;
            case "isExpanded":
                if (options.allowCollapsing) {
                    this._expandOrCollapse();
                }
                break;
            case "collapseButtonIcon":
                this.options.collapseButtonIcon = value;
                break;
            case "expandButtonIcon":
                this.options.expandButtonIcon = value;
                break;
            default:
                break;
            }
        },
        _getTooltipByExpandState: function (state) {
			return (state === "expand" ?
					this._getLocaleValue("collapseButtonTitle") :
					this._getLocaleValue("expandButtonTitle"))
				.replace("{0}", this.options.displayName);
        },
		changeLocale: function() {
			var $button = this.collapseBtn;
			if ($button && $button.length) {
				$button.attr("title", this._getTooltipByExpandState($button.attr("data-state")));
			}
		},
        _expandOrCollapse: function () {
            var self = this;
            if (self.options.isExpanded) {
                // Collapsing
                self.buttonsList.show();
                this._oldWidth = this._width;
                self.collapseBtn
                    .attr({
							"title": this._getTooltipByExpandState("expand"),
							"data-state": "expand"
					})
                    .children(":first")
                        .switchClass(self.options.expandButtonIcon,
                            self.options.collapseButtonIcon);

            } else {

                // Expanding
                if (typeof (self._oldWidth) !== "undefined") {
                    self.element.width(self._oldWidth);
                }

                this._oldWidth = this._width;
                self.buttonsList.hide();
                self.collapseBtn
                    .attr({
						"title": this._getTooltipByExpandState("collapse"),
						"data-state": "collapse"
					})
                    .children(":first")
                        .switchClass(self.options.collapseButtonIcon,
                            self.options.expandButtonIcon);
            }

            this._onResize();
        },
        _isSelectedAction: function (el, props) {
            if (props.value) {
                el.addClass("ui-state-active");
            }
        },
        _createItems: function () {
            var o = this.options,
                i,
                localeProps,
                self = this,
                itemProps = {},
                newItem,
                tbItemsHash = {
                    button: "igToolbarButton",
                    combo: "igCombo",
                    splitButton: "igSplitButton",
                    splitButtonColor: "igColorPickerSplitButton"
                },
                tbItemsPropsTraversing = function (key, property) {
                    var scope = o.items[ i ].scope || self;
                    if (property.action !== undefined && $.isFunction(scope[ property.action ])) {
                        scope[ property.action ](newItem, property, itemProps);
                        return;
                    }
                    itemProps[ key ] = property.value;
                };

            this.buttonsList.empty();
            for (i = 0; i < o.items.length; i++) {
                itemProps = {};
                newItem = (o.items[ i ].callbackRenderer() || $('<div tabIndex="0"></div>'))
                    .attr("id", this._id("_item_" + o.items[ i ].name)).appendTo(this.buttonsList);
                localeProps = o.items[ i ].getLocaleProperties();
                if (localeProps) {
                    newItem.attr(localeProps);
                }
                $.each(o.items[ i ].getProperties(), tbItemsPropsTraversing);

                if (tbItemsHash.hasOwnProperty(o.items[ i ].type)) {
                    newItem[ tbItemsHash[ o.items[ i ].type ] ](itemProps);
                }
            }
        },
        _updateItems: function (items) {
            var options = this.options,
                updProps, scope, el, i;

            for (i = 0; i < items.length; i++) {
                updProps = items[ i ];
                el = this.getItem(items[ i ].name);
                scope = options.items[ i ].scope || this;

                // for (j = 0; j < updProps.length; j++) {

                //     if (updProps[ j ].action !== undefined &&
                //         $.isFunction(scope[ updProps[ j ].action ])) {
                //         scope[ updProps[ j ].action ](el, updProps[ j ]);
                //     } else {

                //         if (items[ i ] instanceof $.ig.igToolbarButtonDescriptor) {
                //             el.igToolbarButton("option", key, updProps[ j ]);
                //         }

                //         if (options.items[ i ] instanceof $.ig.igToolbarComboDescriptor) {
                //             el.igCombo("option", key, updProps[ j ]);
                //         }
                //     }
                // }
            }
        },
        _tooltipAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.title = props.value;
            } else {
                el.igToolbarButton("option", "title", props.value);
            }
        },
        _buttonIconAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.icons = { primary: props.value };
            } else {
                el.igToolbarButton("option", "icons", { primary: props.value });
            }
        },
        _comboDataSourceAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.dataSource = props.value;
            } else {
                el.igCombo("option", "dataSource", props.value);
            }
        },
        _comboWidthAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.width = props.value;
            } else {
                el.igCombo("option", "width", props.value);
            }
        },
        _comboHeightAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.height = props.value;
            } else {
                el.igCombo("option", "height", props.value);
            }
        },
        _comboSelectedItem: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {

                // S.T. March 4th, 2015 Bug # #189831: Incorrect setting of value.
                itemOptionObj.initialSelectedItems = [ {
                    value: props.value
                } ];
            } else {
                el.igCombo("value", props.value);
            }
        },
        _spltButtonColorAction: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.defaultColor = props.value;
            } else {
                el.igColorPickerSplitButton("option", "defaultColor", props.value);
            }
        },
        _comboDropDownListWidth: function (el, props, itemOptionObj) {
            if (itemOptionObj !== undefined) {
                itemOptionObj.dropDownWidth = props.value;
            } else {
                el.igCombo("option", "dropDownWidth", props.value);
            }
        },
        _getWidgetType: function (el) {
            var data, i;

            if (el !== undefined) {
                data = el.data();
                for (i in data) {
                    if (data.hasOwnProperty(i) && data[ i ].widgetName) {
                        return data[ i ].widgetName;
                    }
                }
            }
        },

        // R.K. 19/07/2016 Dead code
        // _isWidgetSupported: function (name) {
        //     var i;
        //     for (i = 0; i < this.supportedWidgets.length; i++) {
        //         if (this.supportedWidgets[i].name === name) {
        //             return true;
        //         }
        //     }
        // },
        _attachEvents: function () {
            var toolbarItemsEvents =
                "igtoolbarbuttonclick igsplitbuttonclick igcolorpickersplitbuttoncolorselected";

            this.element
                .delegate(".ui-widget", toolbarItemsEvents,
                    $.proxy(this._onToolbarItemInteraction, this));

            // Here we bind to igCombo items on click.
            // D.A. 3 Sep. 2013 Bug#150671 Custom combo handler is not called when clicked on the list item.
            // Bound to igcomboselectionchanged event instead of click, because
            // click was not fired when cliking on the list item's text node.
            this.element
                .delegate(":ui-igCombo", "igcomboselectionchanged",
                    $.proxy(this._onComboListItemClick, this))
                .delegate(":ui-igCombo", "igcombodropdownclosed",
                    $.proxy(this._onComboDropDownClose, this));

            this.collapseBtn
                .bind("igtoolbarbuttonclick", $.proxy(this._onCollapse, this));

            // D.U. 30.04.2014 Implementing resizing functionality on window resize
            $(window).on("resize", $.proxy(this._onResize, this));
        },
        _onToolbarItemInteraction: function (e, ui) {
            var selectedItemValue,
                selectedItemIndex,
                triggeredEvent,
                targetWidget = $(e.target).parentsUntil(":ui-igToolbar").eq(-2),
                o = this.options;

            // B.C. 5/22/2012. Bug #112445. Fixes the difference between e.target in the different versions of jQuery.
            if (targetWidget.length === 0) {
                targetWidget = $(e.target);
            }

            selectedItemIndex = this.buttonsList.children().index(targetWidget);
            switch (e.type) {
                case "igtoolbarbuttonclick":
                    triggeredEvent = this.events.toolbarButtonClick;
                    break;
                default:
                    triggeredEvent = this.events.toolbarCustomItemClick;
                    selectedItemValue = ui.data ? ui.data.text : ui.value;
                    break;
            }

            this._trigger(triggeredEvent, e, {
                name: ui.name || o.items[ selectedItemIndex ].name,
                value: selectedItemValue,
                handler: o.items[ selectedItemIndex ].handler(),
                scope: o.items[ selectedItemIndex ].getProperty("scope"),
                itemProperties: o.items[ selectedItemIndex ].getProperties(),
                toolbarItem: targetWidget,
                toolbarName: o.name
            });
        },

        // D.A. March 23, 2015 Bug #189833 Delay command execution when navigating with keyboard until the drop down is closed
        _onComboDropDownClose: function (e, data) {
            // Execute delayed selection changed
            if (this._delayComboSelectionChanged) {
                this._delayComboSelectionChanged = false;
                data.items = $(e.currentTarget).igCombo("selectedItems");
                this._onComboListItemClick(e, data);
            }
        },

        // D.A. 3 Sep. 2013 Bug#150671 Custom combo handler is not called when clicked on the list item.
        // Bound to igcomboselectionchanged event instead of click, because
        // click was not fired when cliking on the list item's text node.
        _onComboListItemClick: function (e, data) {
            var toolbarItemIndex,
                toolbarItem;

            // D.A. March 23, 2015 Bug #189833 Delay command execution when navigating with keyboard until the drop down is closed
            if (e.which >= 37 && e.which <= 40) { // 37-40 = arrow left, up, right, down
                this._delayComboSelectionChanged = true;
                return;
            } else {
                this._delayComboSelectionChanged = false;
            }

            toolbarItemIndex = this.buttonsList.children().index($(e.currentTarget));
            toolbarItem = this.options.items[ toolbarItemIndex ];

            this._trigger(this.events.toolbarComboSelected, e, {
                name: toolbarItem.name,
                value: data.items[ 0 ].data ? data.items[ 0 ].data.text : data.items[ 0 ].value,
                handler: toolbarItem.handler(),
                scope: toolbarItem.getProperty("scope"),
                itemProperties: toolbarItem.getProperties(),
                toolbarItem: data.owner,
                toolbarName: this.options.name
            });
        },

        // D.U. 30.04.2014 Implement funtionality for resizing on window resize
        _onResize: function () {
            var isVisible = this.element.is(":visible"),
                parentWidth = this.element.parent().width();

            // D.A. 29th August 2014, Bug #179147 Updated width check to use outerWidth
            // Hidding and adjusting because of padding
            while (isVisible && this.options.isExpanded &&
                this.element.outerWidth() > parentWidth) {
                this._hideButtonFromToolbar();
            }

            // Showing and adjusting because of padding
            while (this._hiddenButtons && this._hiddenButtons.length > 0 &&
                parentWidth > this.element.outerWidth() +
                    this._hiddenButtons[ this._hiddenButtons.length - 1 ].width()) {
                this._showHiddenButtonFromToolbar();
            }

            this._trigger(this.events.windowResized);
        },

        // D.U. 30.04.2014 Implement funtionality for resizing on window resize
        _hideButtonFromToolbar: function () {
            var buttonToHide,
                notHiddenButtons = this.buttonsList.children().filter(function () {
                    return $(this).css("display") !== "none";
                });

            if (this._hiddenButtons === undefined) {
                this._hiddenButtons = [  ];
            }

            buttonToHide = $(notHiddenButtons[ notHiddenButtons.length - 1 ]);

            if (typeof buttonToHide.length !== "undefined") {
                buttonToHide.hide();
                this._hiddenButtons.push(buttonToHide);
            }
        },

        // D.U. 30.04.2014 Implement funtionality for resizing on window resize
        _showHiddenButtonFromToolbar: function () {
            this._hiddenButtons[ this._hiddenButtons.length - 1 ].show();
            this._hiddenButtons.pop();
        },
        getItem: function (index) {
            /* Gets the item by matching the provided index.
            ```
                $(".selector").igToolbar("getItem", 0);
            ```
                paramType="number|string" optional="false" The index of the item.
                returnType="object" item with the provided index.
            */
            var result;

            if (!isNaN(parseInt(index, 10))) {
                return this.buttonsList.children().eq(index);
            }

            if (typeof index === "string") {
                result = this.buttonsList.find("#" + this._id("_item_" + index));
                if (result.length) {
                    return result;
                }
            }
        },
        addItem: function (item) {
            /* Add item to widget item array
            ```
                $(".selector").igToolbar("addItem", {
					"name": "Italic",
					"type": "button",
					"props": {
						"isItalic": {
							"value": false,
							"action": "_isSelectedAction"
						},
						"italicButtonTooltip": {
							"value": "Italic",
							"action": "_tooltipAction"
						},
						"italicButtonIcon": {
							"value": "ui-igbutton-italic",
							"action": "_buttonIconAction"
						}
					}
				});
            ```
                paramType="object" optional="false" The item to be added.
            */

            // Z.K. September 29, 2015 Bug fix #207328 - igToolbar addItem method is not working as expected
            // Note: scope prop should be set in order the handler to work as expected
            var newItem = this._getToolbarItemDescriptor(item);
            this.options.items.push(newItem);
            this._createItems();
            this._trigger(this.events.itemAdded);
        },
        removeItem: function (index) {
            /* Remove the item matching provided index.
            ```
                $(".selector").igToolbar("removeItem", 0);
            ```
                paramType="number|string" optional="false" The index of the item.
                returnType="object" item with the provided index.
            */

            // D.U. #177515 12th of August 2014 buttonsList children are the actual buttons
            this.buttonsList
                .children()
                    .eq(index)
                        .remove();

            this._trigger(this.events.itemremoved);
        },
        disableItem: function (index, disabled) {
            /*
                Disable item matching provided index.
            ```
                // Set item to be disabled
                $('.selector').igToolbar('disableItem', 0, true);

                // Set item to be not disabled
                $('.selector').igToolbar('disableItem', 0, false);
            ```
                paramType="number|string" optional="false" The index of the item.
                paramType="bool|string" optional="false" The disabled property value.
            */
            var item = this.getItem(index),
                widgetType = this._getWidgetType(item);

            if (widgetType) {
                item[ this._getWidgetType(item) ]("option", "disabled", disabled);
                this._trigger(this.events.itemDisable, {
                    isDisabled: disabled
                });
            }
        },
        activateItem: function (index, activated) {
            /* Activate item matching provided index.
            ```
                // Set item to be active
                $(".selector").igToolbar("activateItem", 0, true);

                // Set item to be inactive
                $(".selector").igToolbar("activateItem", 0, false);
            ```
                paramType="number|string" optional="false" The index of the item.
                paramType="bool|string" optional="false" The activate property value.
            */
            var item = this.getItem(index),
                action = activated ? item.addClass : item.removeClass;

            action.call(item, "ui-state-active");

            // D.U. 12th of August 2014 #177514 Fixing by changing misspelled word
            item.igToolbarButton("option", "isSelected", activated);
            this._trigger(this.events.itemEnabled, {
                isActivated: activated
            });
        },
        deactivateAll: function () {
            /* Deactivate all buttons.
            ```
                $(".selector").igToolbar("deactivateAll");
            ```
            */

            this.buttonsList
                .find(".ui-igbutton.ui-state-active")
                    .igToolbarButton("deactivate");
        },

        // R.K. 19/07/2016 Dead code
        // _setCollapseExpandButtonIcon: function () {

        //     if (this.options.collapseButtonIcon) {
        //         this.collapseBtn
        //             .switchClass('ui-icon-triangle-1-w', this.options.collapseButtonIcon);
        //     }
        // },
        destroy: function () {
            /* Destroy the widget.
            ```
                $(".selector").igToolbar("destroy");
            ```
            */

            // D.U. #177516 12th of August [ igToolbar ] Method destroy remover the toolbar container
            this.element
                .undelegate()
                .unbind();

            this.collapseBtn
                .igToolbarButton("destroy")
                .remove();
            this.buttonsList.remove();
            this.element.removeClass();
            this._superApply(arguments);
        }
    });

    $.extend($.ui.igToolbar, { version: "<build_number>" });
    return $;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
