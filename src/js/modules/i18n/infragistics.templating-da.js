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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.da.Templating = {
			undefinedArgument: 'Der opstod en fejl under forsøg på at hente datakildeegenskaben: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.da.Templating;
	return $.ig.locale.da.Templating;
}));// REMOVE_FROM_COMBINED_FILES
