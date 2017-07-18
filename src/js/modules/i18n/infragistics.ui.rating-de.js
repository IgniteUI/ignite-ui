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
		define( [
			"jquery"
		], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
   	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Rating = $.ig.Rating || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	
	$.ig.locale.de.Rating = {
			setOptionError: 'Laufzeit-Änderungen sind für die folgende Option nicht zugelassen: '
		}
		
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.de.Rating;
	return $.ig.locale.de.Rating;
}));// REMOVE_FROM_COMBINED_FILES
