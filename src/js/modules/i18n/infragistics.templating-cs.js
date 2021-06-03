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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.cs.Templating = {
			undefinedArgument: 'Při pokusu o načtení vlastnosti zdroje dat došlo k chybě: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.cs.Templating;
	return $.ig.locale.cs.Templating;
}));// REMOVE_FROM_COMBINED_FILES
