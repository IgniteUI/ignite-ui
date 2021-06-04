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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.ro.Templating = {
			undefinedArgument: 'A apărut o eroare la încercarea de recuperare a proprietății sursei de date: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.ro.Templating;
	return $.ig.locale.ro.Templating;
}));// REMOVE_FROM_COMBINED_FILES
