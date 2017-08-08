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
		define( [], factory );
	} else {
		factory();
	}
}
(function () {
	$ = $ || {};
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.de.Templating = {
			undefinedArgument: 'Beim Abrufen der Datenquellen-Eigenschaft ist ein Fehler aufgetreten: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.de.Templating;
	return $.ig.locale.de.Templating;
}));// REMOVE_FROM_COMBINED_FILES
