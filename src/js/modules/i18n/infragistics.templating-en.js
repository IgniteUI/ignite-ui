/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};

	$.ig.Templating = {};

	$.extend($.ig.Templating, {
		locale: {
			undefinedArgument: 'An error has occurred while trying to retrieve data source property: '
		}
	});

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};
	$.ig.locale.en.Templating = $.extend({}, $.ig.Templating.locale);
}));// REMOVE_FROM_COMBINED_FILES
