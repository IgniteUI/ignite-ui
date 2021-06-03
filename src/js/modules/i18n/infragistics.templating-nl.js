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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.nl.Templating = {
			undefinedArgument: 'Er is een fout opgetreden bij het ophalen van de eigenschap van de gegevensbron: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.nl.Templating;
	return $.ig.locale.nl.Templating;
}));// REMOVE_FROM_COMBINED_FILES
