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
	$.ig.locale.pl = $.ig.locale.pl || {};
	
	$.ig.locale.pl.Rating = {
			setOptionError: 'Zmiany w trakcie wykonywania są niedozwolone w przypadku następującej opcji: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.pl.Rating;
	return $.ig.locale.pl.Rating;
}));// REMOVE_FROM_COMBINED_FILES
