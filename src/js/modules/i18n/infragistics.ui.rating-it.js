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
	$.ig.locale.it = $.ig.locale.it || {};
	
	$.ig.locale.it.Rating = {
			setOptionError: 'Runtime changes are not allowed for the following option: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.it.Rating;
	return $.ig.locale.it.Rating;
}));// REMOVE_FROM_COMBINED_FILES
