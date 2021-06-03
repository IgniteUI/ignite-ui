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
	$.ig.locale.sv = $.ig.locale.sv || {};
	
	$.ig.locale.sv.Rating = {
			setOptionError: 'Runtime-ändringar är inte tillåtna för följande alternativ: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.sv.Rating;
	return $.ig.locale.sv.Rating;
}));// REMOVE_FROM_COMBINED_FILES
