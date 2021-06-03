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
	$.ig.locale.ro = $.ig.locale.ro || {};
	
	$.ig.locale.ro.Rating = {
			setOptionError: 'Modificările în timpul rulării nu sunt permise pentru următoarea opțiune: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.ro.Rating;
	return $.ig.locale.ro.Rating;
}));// REMOVE_FROM_COMBINED_FILES
