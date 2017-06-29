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
			/* type="object" Set/Get the locale setting for the widget.
			```
					//Initialize
				$(".selector").%%WidgetName%%({
					locale: {}
				});

				// Get
				var locale = $(".selector").%%WidgetName%%("option", "locale");

				// Set
				$(".selector").%%WidgetName%%("option", "locale", {});
			```
			*/
			locale: null,
			/* type="string" Set/Get the locale language setting for the widget.
			```
					//Initialize
				$(".selector").%%WidgetName%%({
					language: "ja"
				});

				// Get
				var language = $(".selector").%%WidgetName%%("option", "language");

                // Set
                $(".selector").%%WidgetName%%("option", "language", "ja");
            ```
            */
			language: "en",
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
		_createWidget: function (options) {
			this._userPreset = options;

			this._registerWidget();

			if (!options || !options.language) {
				this.options.language = $.ig.util.language;
			}
			this._superApply(arguments);
		},
		_setOption: function (option, value) {
			this._super(option, value);

			switch (option) {
			case "language":
			case "locale":
				this.changeLocale();
				break;
			case "regional":
				this._changeRegional();
				break;
			default:
				break;
			}
		},
		_registerWidget: function () {
			$.ig.util.widgetStack.push(this);
		},
		_unregisterWidget: function () {
			$.ig.util.widgetStack.splice($.ig.util.widgetStack.indexOf(this), 1);
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
		_getLocaleValueFromCollection: function (key, collection) {
			var value, i, keys;
			if (!collection) {
				return "";
			}
			if (collection && collection[ key ]) {
				return collection[ key ];
			}
			if (key.indexOf(".") > 0) {
				keys = key.split(".");
				value = collection;
				for (i = 0; i < keys.length; i++) {
					value = value[ keys[ i ] ];
				}
			}
			return value || "";
		},
		_getLocaleValue: function (key) {
			var language = this.options.language,
				widgetName = this.localeWidgetName || this.widgetName.replace("ig", ""),
				locale = $.extend({}, $.ig.locale[ language ][ widgetName ]);
			locale = $.extend(locale, this.options.locale);
			return	this._getLocaleValueFromCollection(key, locale);
		},
		_changeLocaleForElement: function ($element) {
			var key = $element.attr("data-localeid");
			if (key) {
				this._changeLocaleByKey(key, $element);
			}
		},
		_changeLocaleByKey: function (key, $element) {
			var attr = $element.attr("data-localeattr");
			if (attr) {
				$element.attr(attr, this._getLocaleValue(key));
			} else {
				$element.text(this._getLocaleValue(key));
			}
		},
		_changeRegional: $.noop,
		changeLocale: function ($container) {
			var self = this;
			$container = $container || this.element;
			this._changeLocaleForElement($container);
			$container.find("[data-localeid]").each(function () {
				self._changeLocaleForElement($(this));
			});
		},
		changeGlobalLanguage: function () {
			if (!this._userPreset || !this._userPreset.language) {
				this._setOption("language", $.ig.util.language);
			}
		},
		destroy: function () {
			this._unregisterWidget();
			this._super();
		}
	});

	$.extend($.ui.igWidget, { version: "<build_number>" });
	return $.ui.igWidget;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
