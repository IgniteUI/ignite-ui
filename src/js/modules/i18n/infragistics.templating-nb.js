﻿/*!@license
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
	$.ig.locale.nb = $.ig.locale.nb || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.nb.Templating = {
			undefinedArgument: 'Det har oppstått en feil under forsøket på å hente datakildegenskapen: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.nb.Templating;
	return $.ig.locale.nb.Templating;
}));// REMOVE_FROM_COMBINED_FILES
