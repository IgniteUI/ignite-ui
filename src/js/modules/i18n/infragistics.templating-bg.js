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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.bg.Templating = {
			undefinedArgument: 'Грешка при опит да се вземе стойността на следното свойство от източника на данни: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.bg.Templating;
	return $.ig.locale.bg.Templating;
}));// REMOVE_FROM_COMBINED_FILES
