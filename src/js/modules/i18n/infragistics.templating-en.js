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
	$.ig.locale.en = $.ig.locale.en || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.en.Templating = {
			undefinedArgument: 'An error has occurred while trying to retrieve data source property: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.en.Templating;
	return $.ig.locale.en.Templating;
}));// REMOVE_FROM_COMBINED_FILES
