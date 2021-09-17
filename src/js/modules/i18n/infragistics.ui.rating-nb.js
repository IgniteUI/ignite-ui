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
	$.ig.locale.nb = $.ig.locale.nb || {};
	
	$.ig.locale.nb.Rating = {
			setOptionError: 'Kjøretidsendringer er ikke tillatt for følgende alternativ: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.nb.Rating;
	return $.ig.locale.nb.Rating;
}));// REMOVE_FROM_COMBINED_FILES
