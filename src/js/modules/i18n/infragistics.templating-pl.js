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
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.pl.Templating = {
			undefinedArgument: 'An error has occurred while trying to retrieve data source property: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.pl.Templating;
	return $.ig.locale.pl.Templating;
}));// REMOVE_FROM_COMBINED_FILES
