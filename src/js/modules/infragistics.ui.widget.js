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
		return factory(jQuery);
	}
}
(function ($) {
	/*
		Base igWidget for all Ignite UI widgets.
	*/
	$.widget("ui.igWidget", {
		localeWidgetName: null,
		localeContainer: null,
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
			if (option === "language" && this.options.language === value) {
				return;
			}
			this._super(option, value);

			switch (option) {
			case "language":
			case "locale":
				this.changeLocale();
				break;
			case "regional":
				this.changeRegional();
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
			return !collection ? "" : (collection[ key ] || "");
		},
		_getLocaleDictionary: function () {
			var language = this.options.language,
				widgetName = this.localeWidgetName || this.widgetName.replace("ig", ""),
				localeObj = ($.ig.locale[ language ] && $.ig.locale[ language ][ widgetName ]) ||
					($.ig[ widgetName ] && $.ig[ widgetName ].locale) ||
					/* excel, spreadsheet locale generated with lower cases for its defaults */
					($.ig[ widgetName.toLowerCase() ] && $.ig[ widgetName.toLowerCase() ].locale);
			return localeObj;
		},
		_getLocaleValue: function (key) {
			var locale = $.extend({}, this._getLocaleDictionary());
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
		changeRegional: $.noop,
		changeLocale: function ($container) {
			/* changes the all locales contained into a specified container to the language specified in [options.language](ui.igwidget#options:language)
			Note that this method is for rare scenarios, use [language](ui.igwidget#options:language) or [locale](ui.igwidget#options:locale) option setter
			```
				$(".selector").%%WidgetName%%("changeLocale");
			```
				paramType="object" Optional parameter - if not set it would use the element of the widget as $container
			*/
			var self = this;
			$container = $container || this.localeContainer || this.element;
			$container.find("[data-localeid]").addBack("[data-localeid]").each(function () {
				self._changeLocaleForElement($(this));
			});
		},
		changeGlobalLanguage: function () {
			/* changes the widget language to global language. Global language is the value in $.ig.util.language
			```
				$(".selector").%%WidgetName%%("changeGlobalLanguage");
			```
			*/
			if (!this._userPreset || !this._userPreset.language) {
				this._setOption("language", $.ig.util.language);
			}
		},
		changeGlobalRegional: function () {
			/* changes the widget regional settins to global regional settings. Global regional settings are container in $.ig.util.regional
			```
				$(".selector").%%WidgetName%%("changeGlobalLanguage");
			```
			*/
			if (!this._userPreset || !this._userPreset.regional) {
				this._setOption("regional", $.ig.util.regional);
			}
		},
		destroy: function () {
			/* destroy is part of the jQuery UI widget API and does the following:
				1. Remove custom CSS classes that were added.
				2. Unwrap any wrapping elements such as scrolling divs and other containers.
				3. Unbind all events that were bound.
				```
					$(".selector").%%WidgetName%%("destroy");
				```
			*/
			this._unregisterWidget();
			this._super();
		}
	});

	$.extend($.ui.igWidget, { version: "<build_number>" });
	return $;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
