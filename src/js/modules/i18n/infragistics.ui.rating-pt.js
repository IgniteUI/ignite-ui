/*!@license
* Infragistics.Web.ClientUI Rating localization resources <build_number>
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
	$.ig.Rating = $.ig.Rating || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};
	
	$.ig.locale.pt.Rating = {
			setOptionError: 'As alterações ao tempo de execução não são permitidas para a seguinte opção: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.pt.Rating;
	return $.ig.locale.pt.Rating;
}));// REMOVE_FROM_COMBINED_FILES
