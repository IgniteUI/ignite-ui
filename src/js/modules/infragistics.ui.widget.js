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
		_getLocaleValue: function (key) {
			var locale = this.options.locale,
				widgetName = this.localeWidgetName || this.widgetName.split("ig")[ 1 ];

			if (locale && locale[ key ]) {
				return locale[ key ];
			} else if ($.ig && $.ig[ widgetName ] && $.ig[ widgetName ].locale) {
				return $.ig[ widgetName ].locale[ key ];
			} else {
				return "";
			}
		},
		_changeLocale: function () {
			var elements = this.element.find("[data-localeid]"),
				self = this;
			elements.each(function () {
				var $el = $(this);
				self._changeLocaleByKey($el, $el.attr("data-localeid"), $el.attr("data-localeattr"));
			});
		},
		_changeLocaleByKey: function (element, key, attr) {
			if (attr) {
				element.attr(attr, this._getLocaleValue(key));
			} else {
				element.text(this._getLocaleValue(key));
			}
		},
		_changeRegional: $.noop
    });

    $.extend($.ui.igWidget, { version: "<build_number>" });
    return $.ui.igWidget;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
