/*!@license
 * Infragistics.Web.ClientUI Base Widget <build_number>
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
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
    /*
		Base igWidget for all Ignite UI widgets.
	*/
    $.widget("ui.igWidget", {
		localeWidgetName: null,
		localeAttributeName: "data-locale",
        options: {
            /* type="string|object" Set/Get the locale setting for the widget.
            ```
                 //Initialize
                $(".selector").%%WidgetName%%({
                    locale: "ja"
                });

                // Get
                var locale = $(".selector").%%WidgetName%%("option", "locale");

                // Set
                $(".selector").%%WidgetName%%("option", "locale", "ja");
            ```
            */
            locale: "en",
            /* type="string|object" Set/Get the regional setting for the widget.
            ```
                //Initialize
                $(".selector").%%WidgetName%%({
                    regional: "ja"
                });

                // Get
                var regional = $(".selector").%%WidgetName%%("option", "regional");

                // Set
                $(".selector").%%WidgetName%%("option", "regional", "ja");
            ```
            */
			regional: "en-US"
		},
		_setOption: function (option, value) {
			this._super(option, value);

			switch (option) {
			case "locale":
				this._changeLocale();
				break;
			case "regional":
				this._changeRegional();
				break;
			default:
				break;
			}
		},
		_getRegionalValue: function (key) {
			var regional = this.options.regional;
			if (this.options[ key ]) {
				return this.options[ key ];
			}
			if (typeof regional === "string") {
				regional = $.ig.regional[ regional ];
			}
			if (regional && regional[ key ]) {
				return regional[ key ];
			} else {

				// return defaults
				return $.ig.regional.defaults[ key ];
			}
		},
		_getLocaleWidgetName: function () {
			this.localeWidgetName = this.localeWidgetName ||
							(this.widgetFullName || this.widgetName)
								.replace(/^((ui-ig(\.)*)|(ig(\.)*))/ig, "");
			return this.localeWidgetName;
		},
		_getLocaleObject: function (locale) {
			localeWidgetName = this._getLocaleWidgetName();
			return 	$.ig.locale &&
					$.ig.locale[ locale ] &&
					$.ig.locale[ locale ][ localeWidgetName ];
		},
		_getLocaleValue: function (key) {
			var locale = this.options.locale, localeObject, localeWidgetName;
			if (locale) {
				if (typeof locale === "object" && locale[ key ]) {
					return locale[ key ];
				}
				localeObject = this._getLocaleObject(locale);
				if (localeObject && localeObject[ key ]) {
					return localeObject[ key ];
				}
			}
			localeWidgetName = this._getLocaleWidgetName();
			if ($.ig && $.ig[ localeWidgetName ] && $.ig[ localeWidgetName ].locale) {
				return $.ig[ localeWidgetName ].locale[ key ];
			}
			return "";
		},
		_changeLocaleForElement: function ($element, localeId) {
			// localeId is optional - if set - then changes only those locale setting specified by localeId in attribute data-locale
			// if localeId is NOT set - changes all locales for the specified element(set in attribute data-locale)
			var i, pairs, localeAttr = $element.attr(this.localeAttributeName);// format "optionName0:attributeName0;optionName1:attributeName1;"
			if (!localeAttr) {
				return;
			}
			pairs = localeAttr.split(";");
			for (i = 0; i < pairs.length; i++) {
				keyValue = pairs[ i ].split(":");
				key = keyValue[ 0 ];
				attr = keyValue[ 1 ];
				if (!key || !attr) {
					continue;
				}
				if (localeId === key || !localeId) {
					if (attr === "text") {
						$element.text(this._getLocaleValue(key));
					} else {
						$element.attr(attr, this._getLocaleValue(key));
					}
					if (localeId === key) {// if localeId is specified
						break;
					}
				}
			}
		},
		_changeLocaleByLocaleId: function (localeId, $container) {
			if (!localeId) {
				return;
			}
			var self = this;
			($container || this.element)
				.find("[" + this.localeAttributeName + "*='" + localeId + ":']")
				.each(function () {
					self._changeLocaleForElement($(this), localeId);
				});
		},
		_changeLocaleInContainer: function ($container) {
			var self = this;
			($container || this.element)
				.find("[" + this.localeAttributeName + "]")
				.each(function () {
					self._changeLocaleForElement($(this));
				});
		},
		_getLocaleOptions: function () {
			return {};
		},
		_changeLocale: function () {
			var opts = this._getLocaleOptions();
			if (!jQuery.isEmptyObject(opts)) {
				if (opts.locale) {
					return;
				}
				this._setOptions(opts);
			}
		},
		_changeRegional: $.noop
    });
    $.extend($.ui.igWidget, { version: "<build_number>" });
    return $.ui.igWidget;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
