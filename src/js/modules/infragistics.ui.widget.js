/*!@license
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
            /* type="string" Set/Get the locale setting for the widget.
            ```
                 //Initialize
                $(".selector").igWidget({
                    locale: "ja"
                });

                // Get
                var locale = $(".selector").igWidget("option", "locale");

                // Set
                $(".selector").igWidget("option", "locale", "ja");
            ```
            */
            locale: "en",
            /* type="string" Set/Get the regional setting for the widget.
            ```
                //Initialize
                $(".selector").igWidget({
                    regional: "ja"
                });

                // Get
                var regional = $(".selector").igWidget("option", "regional");

                // Set
                $(".selector").igWidget("option", "regional", "ja");
            ```
            */
            regional: "en-US"
		},
		_setOption: function (option, value) {
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}
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
		_getLocaleValue: function (key) {
			var locale = this.options.locale,
				widgetName = this.localeWidgetName || this.widgetName.split("ig")[1];

			if (locale && locale[ key ]) {
				return locale[ key ];
			} else if ($.ig && $.ig[ widgetName ] && $.ig[ widgetName ].locale) {
				return $.ig[ widgetName ].locale[ key ];
			} else {
				return "";
			}
		},
		_changeLocale: $.noop,
		_changeRegional: $.noop
    });

    $.extend($.ui.igWidget, { version: "<build_number>" });
    return $.ui.igWidget;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
