/*!@license
 * Infragistics.Web.ClientUI ToolbarButton <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.util.js
 *	infragistics.ui.shared.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.ui.shared"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
    /*
		The igToolbarButton is a jQuery based widget which allow you to create a toolbar button.
	*/
    $.widget("ui.igToolbarButton", $.ui.igButton, {
        options: {
            /* type="boolean" Enable/Disable the "Toggling" of a button.
            ```
                //Initialize
                $(".selector").igToolbarButton({
                    allowToggling: true
                });

                // Get
                var allowedToggling = $(".selector").igToolbarButton("option", "allowToggling");

                // Set
                $(".selector").igToolbarButton("option", "allowToggling", false);
            ```
            */
            allowToggling: true,
            /* type="boolean" Enable/Disable the toolbar button.
            ```
                //Initialize
                $(".selector").igToolbarButton({
                    isSelected: false
                });

                // Get
                var isSelected = $(".selector").igToolbarButton("option", "isSelected");

                // Set
                $(".selector").igToolbarButton("option", "isSelected", true);
            ```
            */
            isSelected: false
        },
        css: {
            toolbarButtonWidget: "ui-igtoolbarbutton"
        },
        events: {
            /* cancel="true" Event fired before the toolbar button is activated.
                Function takes arguments evt and ui.
                Use ui.owner to get reference to this igToolbarButton.
            ```
                $(document).delegate(".selector", "igtoolbarbuttonactivating", function(evt, ui) {
                    //use to obtain reference to the event browser
                    evt.originalEvent;
                    //return reference to igToolbarButton
                    ui.owner;
                });

                $(".selector").igToolbarButton({
                    activating: function(evt, ui) {
                    ...
                    }
                });
            ```
            */
            activating: "activating",
            /* Event fired after the toolbar button is activated.
                Function takes arguments evt and ui.
                Use ui.owner to get reference to this igToolbarButton.
            ```
                $(document).delegate(".selector", "igtoolbarbuttonactivated", function(evt, ui) {
                    //use to obtain reference to the event browser
                    evt.originalEvent;
                    //return reference to igToolbarButton
                    ui.owner;
                });

                $(".selector").igToolbarButton({
                    activated: function(evt, ui) {
                    ...
                    }
                });
            ```
            */
            activated: "activated",
            /* cancel="true" Event fired before the toolbar button is deactivated.
                Function takes arguments evt and ui.
                Use ui.owner to get reference to this igToolbarButton.
            ```
                $(".selector").igToolbarButton({
                    deactivating: function(evt, ui) {
                        //use to obtain reference to the event browser
                        evt.originalEvent;
                        //return reference to igToolbarButton
                        ui.owner;
                    }
                });

                $(document).delegate(".selector", "igtoolbarbuttondeactivating", function(evt, ui) {
                    //return reference to igToolbarButton
                    ui.owner;
                });
            ```
            */
            deactivating: "deactivating",
            /* Event fired after the toolbar button is deactivated.
                Function takes arguments evt and ui.
                Use ui.owner to get reference to this igToolbarButton.
            ```
                $(".selector").igToolbarButton({
                    deactivated: function(evt, ui) {
                        //use to obtain reference to the event browser
                        evt.originalEvent;
                        //return reference to igToolbarButton
                        ui.owner;
                    }
                });

                $(document).delegate(".selector", "igtoolbarbuttondeactivated", function(evt, ui) {
                    //return reference to igToolbarButton
                    ui.owner;
                });
            ```
            */
            deactivated: "deactivated"
        },
        _setOption: function (option, value) {
            if (this.options[ option ] === value) {
                return;
            }

            $.ui.igButton.prototype._setOption.apply(this, arguments);
        },
        _create: function () {
            $.ui.igButton.prototype._create.apply(this);

            this._setupElement();
            this._attachToolbarBtnEvents();
        },
        _setupElement: function () {
            this.element
                .addClass(this.css.toolbarButtonWidget)
                .attr("tabindex", "1");

            if (this.options.isSelected) {
                this.element.addClass(this.options.css.buttonActiveClasses);
            }
        },

        // Overrides igButton's _onBlur
        _onBlur: function (event) {
            var noCancel,
                o = this.options;

            if (!o.disabled) {
                noCancel = this._trigger("blur", event);
                if (noCancel) {
                    this.element.removeClass(o.css.buttonFocusClasses);
                    if (!o.allowToggling) {
                        this.element.removeClass(o.css.buttonActiveClasses);
                    }
                }
            }
        },

        // Overrides igButton's _onMouseDown
        _onMouseDown: function (event) {
            var noCancel,
                e = this.element,
                o = this.options;

            if (!o.disabled) {
                noCancel = this._trigger("mousedown", event);
                if (noCancel) {
                    e.removeClass(o.css.buttonHoverClasses);
                    if (!o.allowToggling) {
                        e.addClass(o.css.buttonActiveClasses);
                    }
                }
            }
        },

        // Overrides igButton's _onMouseUp
        _onMouseUp: function (event) {
            var noCancel,
                o = this.options;

            if (!o.disabled) {
                noCancel = this._trigger("mouseup", event);
                if (noCancel) {
                    this.element.removeClass(o.css.buttonHoverClasses);
                    if (!o.allowToggling) {
                        this.element.removeClass(o.css.buttonActiveClasses);
                    }
                }
            }
        },
        _onEnterKey: function (e) {
            if (e.keyCode !== $.ui.keyCode.ENTER) {
                return;
            }

            this.element.mousedown();
        },
        _triggerActivating: function (event) {
            var args = {
                owner: this
            };

            return this._trigger(this.events.activating, event, args);
        },
        _triggerActivated: function (event) {
            var args = {
                owner: this
            };

            return this._trigger(this.events.activated, event, args);
        },
        _triggerDeactivating: function (event) {
            var args = {
                owner: this
            };

            return this._trigger(this.events.deactivating, event, args);
        },
        _triggerDeactivated: function (event) {
            var args = {
                owner: this
            };

            return this._trigger(this.events.deactivated, event, args);
        },
        _attachToolbarBtnEvents: function () {
            var noCancel,
                o = this.options,
                self = this;

            // Toggle element state on click
            this.element.click(function (e) {
                if (o.allowToggling) {
                    if (o.isSelected) {
                        noCancel = self._triggerDeactivating(e);
                        if (noCancel) {
                            self.deactivate(e);
                            self.element.addClass(o.css.buttonHoverClasses);
                        }
                    } else {
                        noCancel = self._triggerActivating(e);
                        if (noCancel) {
                            self.activate(e);
                        }
                    }
                }
            });

            this.element.on("keypress", $.proxy(this._onEnterKey, this));
        },
        toggle: function () {
            /* Toggle toolbar button
            ```
                $(".selector").igToolbarButton("toggle");
            ```
            */
            var o = this.options;

            if (o.disabled === true || o.allowToggling === false) {
                return;
            }

            o.isSelected = !o.isSelected;
            this.element.toggleClass(o.css.buttonActiveClasses);
        },
        activate: function (event) {
            /* Activate toolbar button
            ```
                $(".selector").igToolbarButton("activate");
            ```
            */
            var o = this.options;

            if (o.disabled === true || o.allowToggling === false) {
                return;
            }

            o.isSelected = true;
            this.element.addClass(o.css.buttonActiveClasses);

            if (event) {
                this._triggerActivated(event);
            }
        },
        deactivate: function (event) {
            /* Deactivate toolbar button
            ```
                $(".selector").igToolbarButton("deactivate");
            ```
            */
            var o = this.options;

            if (o.disabled === true || o.allowToggling === false) {
                return;
            }

            o.isSelected = false;
            this.element
                .removeClass(o.css.buttonActiveClasses)
		        .removeClass(o.css.buttonFocusClasses);

            if (event) {
                this._triggerDeactivated(event);
            }
        },
        widget: function () {
            /* Returns the element that represents this widget.
            ```
                $('.selector').igToolbarButton("widget");
            ```
               returnType="object" Returns the element that represents this widget.
            */
            return this.element;
        },
        destroy: function () {
            /* Destroy the widget.
            ```
                $(".selector").igToolbarButton("destroy");
            ```
            */
            $.ui.igButton.prototype.destroy.call(this);
            this.element
                .off()
                .removeClass("");
        }
    });

    $.extend($.ui.igToolbarButton, { version: "<build_number>" });
    return $.ui.igToolbarButton;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
