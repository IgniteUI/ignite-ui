/*!@license
 * Infragistics.Web.ClientUI SplitButton <build_number>
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
 * 	 infragistics.util.js
 *   infragistics.util.jquery.js
 *   infragistics.ui.shared.js
 *   infragistics.ui.toolbarbutton.js
 */

/*global define */
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
		factory(jQuery);
	}
}
(function ($) {
    /*
		The igSplitButton is a jQuery based widget.
	*/
    $.widget("ui.igSplitButton", {
        options: {
			/* type="array" Button items.
            ```
            // Initialize
            $(".selector").igSplitButton({
                items: [{
                    name: "textColor",
                    label: "Font Color",
                    iconClass: "ui-igbutton-forecolor"
                }]
            });
            // Get
            var items = $(".selector").igSplitButton("option", "items");
            ```
            */
            items: [ {
				/* type="string" Item name*/
                name: "button1",
				/* type="string" Item display label*/
                label: "Button 1",
				/* type="string" Css class to represent the iconClass of the item*/
                iconClass: "ui-icon-gear"
            } ],
            /* type="string" Default button item name.
            ```
            // Initialize
            $(".selector").igColorPickerSplitButton({
                defaultItemName: "SplitButton",
            });
            // Get
            var defaultItemName = $(".selector").igSplitButton("option", "defaultItemName");
            // Set
            $(".selector").igSplitButton("option", "defaultItemName", "SplitButton");
            ```
            */
            defaultItemName: "button1",
            /* type="boolean" Specifies whether the default button will be switched when another button is selected.
            ```
            //Initialize
            $(".selector").igSplitButton({
                swapDefaultEnabled: true
            });
            // Get
            var swapDefaultEnabled = $(".selector").igSplitButton("option", "swapDefaultEnabled");
            // Set
            $(".selector").igSplitButton("option", "swapDefaultEnabled", true);
            ```
            */
            swapDefaultEnabled: false
        },
        events: {
            /* cancel="false" Event fired when the button is clicked.
            ```
            //Initialize
            $(".selector").igSplitButton({
                click: function (evt, ui) {...}
            });
            //Delegate
            $(document).delegate(".selector", "igsplitbuttonclick", function (evt, ui) {
                // return reference to the igSplitButton element
                ui.item
                // return type of the event
                evt.type
            });
            ```
            Function takes arguments evt and ui.
			Use ui.item to get a reference the igSplitButton element.
            */
            click: "click",
            /* cancel="false" Event fired after the button is expanded.
            ```
            //Initialize
            $(".selector").igSplitButton({
                expanded: function (evt, ui) {...}
            });
            //Delegate
            $(document).delegate(".selector", "igsplitexpanded", function (evt, ui) {
                // return reference to the igSplitButton
                ui.owner
                // return type of the event
                evt.type
            });
            ```
            Function takes arguments evt and ui.
			Use ui.owner to get a reference the igSplitButton.
            */
            expanded: "expanded",
            /* cancel="true" Event fired before a button item is expanded.
            ```
            //Initialize
            $(".selector").igSplitButton({
                expanding: function (evt, ui) {...}
            });
            //Delegate
            $(document).delegate(".selector", "igsplitexpanding", function (evt, ui) {
                // return reference to the igSplitButton
                ui.owner
                // return type of the event
                evt.type
            });
            ```
            Function takes arguments evt and ui.
			Use ui.owner to get a reference the igSplitButton.
            */
            expanding: "expanding",
            /* cancel="false" Event fired after the button is collapsed.
            ```
            //Initialize
            $(".selector").igSplitButton({
                collapsed: function (evt, ui) {...}
            });
            //Delegate
            $(document).delegate(".selector", "igsplitcollapsed", function (evt, ui) {
                // return reference to the igSplitButton
                ui.owner
                // return type of the event
                evt.type
            });
            ```
            Function takes arguments evt and ui.
			Use ui.owner to get a reference the igSplitButton.
            */
            collapsed: "collapsed",
            /* cancel="true" Event fired before a button item is collapsed.
            ```
            //Initialize
            $(".selector").igSplitButton({
                collapsing: function (evt, ui) {...}
            });
            //Delegate
            $(document).delegate(".selector", "igsplitcollapsing", function (evt, ui) {
                // return reference to the igSplitButton
                ui.owner
                // return type of the event
                evt.type
            });
            ```
            Function takes arguments evt and ui.
			Use ui.owner to get a reference the igSplitButton.
            */
            collapsing: "collapsing"
        },
        css: {
            /* The widget base class css. */
            container: "ui-splitbutton ui-widget ui-state-default",
            /* The widget arrow css */
            arrow: "ui-splitbutton-arrow",
            /* The widget left div element css. */
            conrnersLeft: "ui-corner-left",
            /* The widget right div element css. */
            conrnersRight: "ui-corner-right",
            /* The widget base element hover css. */
            hover: "ui-splitbutton-hover",
            /* The widget base element active css. */
            active: "ui-state-active",
            /* The widget base element focus css. */
            focus: "ui-state-focus"
        },
        _id: function (id) {
            return this.element[ 0 ].id + id;
        },
        _renderDefaultBtn: function () {
            var options = this.options,
                defaultItem = this._getDefaultItem(options.defaultItemName);

            this._options.defaultButton = $('<div id="' + this._id("_" +
                options.defaultItemName) + '"></div>')
                .appendTo(this.element)
                .igToolbarButton({
                    onlyIcons: true,
                    labelText: "&nbsp;",
                    title: defaultItem.label,
                    icons: {
                        primary: defaultItem.iconClass
                    },
                    name: options.defaultItemName,
                    allowToggling: false
                })
                .addClass("ui-splitbutton-cleargaps " + this.css.conrnersLeft)
                .removeClass("ui-corner-all");
        },
        _renderExpandBtn: function () {
            this._options.expandButton = $("<div id='" + this._id("_arrow") + "' class='" +
                this.css.arrow + "'></div>")
                .igToolbarButton({
                    onlyIcons: true,
                    labelText: "&nbsp;",
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    allowToggling: false
                })
                .addClass("ui-splitbutton-cleargaps " + this.css.conrnersRight)
                .removeClass("ui-corner-all")
                .appendTo(this.element);
        },
        _setupElement: function () {
            this.element
                .addClass(this.css.container)
                .attr("tabIndex", 0);
        },
        _create: function () {
            this._options = {
                defaultButton: null,
                expandButton: null,
                itemsList: null,
                isExpanded: false,
                justFocused: false
            };

            this._setupElement();
            this._renderDefaultBtn();
            this._renderExpandBtn();
            this._createItemsList();
            this._attachEvents();
        },
        _attachEvents: function () {
            var _opt = this._options;

            _opt.defaultButton.on("igtoolbarbuttonclick", $.proxy(this._onDefaultBtnClick, this));
            _opt.expandButton.on("focus", $.proxy(this._onExpandBtnFocus, this));
            _opt.expandButton.on("blur", $.proxy(this._onExpandBtnBlur, this));
            _opt.expandButton.on("igtoolbarbuttonclick", $.proxy(this._onExpandBtnClick, this));
            _opt.itemsList.on("igtoolbarbuttonclick", "a", $.proxy(this._onItemClick, this));

            this.element.on("keypress", $.proxy(this._onEnterKeypress, this));
            this.element.hover($.proxy(this._onMouseEnter, this),
                $.proxy(this._onMouseLeave, this));
        },
        _onDefaultBtnClick: function (e) {
            var self = this;

            e.stopPropagation();
            this._trigger(this.events.click, e, {
                name: self._options.defaultButton.igToolbarButton("option", "name"),
                item: self.element
            });
        },
        _onExpandBtnClick: function (e) {
            var _options = this._options;

            // IE not focusing the element when clicking the inside span
            // Also IE triggers blur when the element is
            // already focused and the inner span is clicked
            if (!_options.expandButton.is(":focus")) {
                if (!_options.isExpanded) {
                    _options.expandButton.focus();
                }
                return;
            }

            // Prevents collapsing the split button when
            // it was just expanded by the focus event
            if (_options.justFocused) {
                _options.justFocused = false;
            } else {
                this.toggle(e);
            }
        },
        _onExpandBtnFocus: function (e) {
            var noCancel;
            if (!this._options.isExpanded) {
                noCancel = this._triggerExpanding(e);
                if (noCancel) {
                    this.expand(e);
                    this._options.justFocused = true;
                }
            }
        },
        _onExpandBtnBlur: function (e) {
            var noCancel,
                self = this;

            if (this._options.isExpanded) {
                // Time for item click event to fire
                // on the menu before it is hidden.
                setTimeout(function () {
                    noCancel = self._triggerCollapsing(e);
                    if (noCancel) {
                        self.collapse(e);
                    }
                }, 150);
            }
        },
        _onItemClick: function (e) {
            var $target = $(e.currentTarget);

            if (this.options.swapDefaultEnabled) {
                this.switchToButton($target);
            }
            e.stopImmediatePropagation();

            this._trigger(this.events.click, e, {
                name: $target.igToolbarButton("option", "name")
            });
        },
        _onEnterKeypress: function (e) {
            if (e.which === $.ui.keyCode.ENTER) {
                this.toggle(e);
            }
        },
        _onMouseEnter: function () {
            this.element.addClass(this.css.hover);
        },
        _onMouseLeave: function () {
            this.element.removeClass(this.css.hover);
        },
        _getDefaultItem: function (name) {
            var options = this.options,
                i;
            for (i = 0; i < options.items.length; i++) {
                if (options.items[ i ].name === name) {
                    return options.items[ i ];
                }
            }
        },
        _createItemsList: function () {
            var list = $("<ul class='ui-splitbutton-list ui-menu ui-widget ui-widget-content ui-corner-all'></ul>"), //jscs:ignore maximumLineLength
                options = this.options,
                i,
                item;

            for (i = 0; i < options.items.length; i++) {
                if (options.items[ i ].name !== options.defaultItemName) {
                    item = $('<a id="' + this._id("_" + options.items[ i ].name) +
                        '" class="ui-corner-all" tabindex="-1"></a>')
                        .igToolbarButton({
                            onlyIcons: true,
                            labelText: "",
                            title: options.items[ i ].label,
                            icons: {
                                primary: options.items[ i ].iconClass
                            },
                            name: options.items[ i ].name,
                            allowToggling: false
                        }).addClass("ui-splitbutton-cleargaps");

                    $('<li class="ui-menu-item" role="menuitem"></li>').appendTo(list).append(item);
                }
            }

            this._options.itemsList = list.appendTo(this.element);
        },
        switchToButton: function (button) {
            /*
                Switch to given igToolbar button.
                ```
                $(".selector").igSplitButton("switchToButton", $element);
                ```
                paramType="string|object" optional="false". The button jQuery element.
            */
            var defaultButton = this._options.defaultButton,
                targetButton = (typeof button === "string") ?
                    $("#" + this._id("_" + button)) :
                    button,
                defBtnOpts = defaultButton.igToolbarButton("option"),
                defBtnId = defaultButton.attr("id"),
                targetBtnOpts = targetButton.igToolbarButton("option"),
                targetBtnId = targetButton.attr("id");

            targetButton
                .igToolbarButton("option", defBtnOpts)
                .attr("id", defBtnId);
            defaultButton
                .igToolbarButton("option", targetBtnOpts)
                .attr("id", targetBtnId)
                .igToolbarButton("toggle");
        },
        _triggerCollapsing: function () {
            var args = {
                owner: this
            };

            return this._trigger(this.events.collapsing, null, args);
        },
        _triggerCollapsed: function () {
            var args = {
                owner: this
            };

            return this._trigger(this.events.collapsed, null, args);
        },
        _triggerExpanding: function () {
            var args = {
                owner: this
            };

            return this._trigger(this.events.expanding, null, args);
        },
        _triggerExpanded: function () {
            var args = {
                owner: this
            };

            return this._trigger(this.events.expanded, null, args);
        },
        widget: function () {
            return this.element;
        },
        toggle: function (e) {
            /* Toggle widget state between collapsed and expanded.
            ```
            $(".selector").igSplitButton( "toggle", e:object );
            ```
            paramType="object" optional="false" The igSplitButton to be expanded/collapsed.
            returnType="object" Returns reference to the curent igSplitButton.
            */
            var noCancel,
                _options = this._options;

            if (_options.isExpanded) {
                noCancel = this._triggerCollapsing(e);
                if (noCancel) {
                    this.collapse(e);
                }
            } else {
                noCancel = this._triggerExpanding(e);
                if (noCancel) {
                    this.expand(e);
                }
            }
        },
        collapse: function (e) {
            /* Collapse the widget.
            ```
            $(".selector").igSplitButton("collapse", evt);
            ```
            paramType="object" optional="true" Indicates the browser event which triggered this action (not API).
            returnType="object" Returns reference to the curent igSplitButton.
            */
            var self = this,
                _opt = this._options,
                expandButton = _opt.expandButton;

            _opt.itemsList.hide(0, function () {
                self.element.removeClass(self.css.active);
                _opt.expandButton.removeClass(self.css.focus);
                _opt.isExpanded = false;
                if (e && e.originalEvent) {
                    self._triggerCollapsed(e);
                } else if (expandButton.is(":focus")) {
                    // Remove the expandButton focus when called as API method
                    expandButton.blur();
                }
            });
        },
        expand: function (e) {
            /* Expands the widget.
            ```
            $(".selector").igSplitButton("expand", evt);
            ```
            paramType="object" optional="true" Indicates the browser event which triggered this action (not API).
            returnType="object" Returns reference to the curent igSplitButton.
            */
            var self = this,
                _opt = this._options,
                expandButton = _opt.expandButton;

            _opt.itemsList.show(0, function () {
                self.element.addClass(self.css.active);
                _opt.isExpanded = true;

                if (e && e.originalEvent) {
                    self._triggerExpanded(e);
                } else if (!expandButton.is(":focus")) {
                    // Focus the expandButton when called as API method
                    expandButton.focus();
                }
            });
        },
        destroy: function () {
            /* Destroy the widget.
            ```
            $(".selector").igSplitButton("destroy");
            ```
            */
            var _opt = this._options;

            $.Widget.prototype.destroy.apply(this, arguments);

            _opt.itemsList.off();
            this.element
                .find(":ui-igToolbarButton")
                    .igToolbarButton("destroy")
                .end()
                .off()
                .removeClass(this.css.container)
                .removeAttr("tabindex")
                .empty();

            delete _opt.expandButton;
            delete _opt.itemsList;
        },
         _setOption: function( key, value ) {
            var options = this.options,
                self = this;

            if (options[ key ] === value) {
                return;
            }

            $.Widget.prototype._setOption.apply(this, arguments);

            switch (key) {
                case "defaultItemName":
                    var result = $("#" + self.element.attr("id") + "_" + value);
                    if (result.length === 1) {
                        self.switchToButton(result);
                    }
                    break;
            }
        }
    });

    $.extend($.ui.igSplitButton, { version: "<build_number>" });
    return $.ui.igSplitButton;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
