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
			undefinedArgument: 'Грешка при опит да се вземе стойността на следното свойство от източника на данни: '
		}
	});

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.Templating = $.extend({}, $.ig.Templating.locale);
}));// REMOVE_FROM_COMBINED_FILES
