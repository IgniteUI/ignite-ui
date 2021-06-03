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
	$.ig.locale.hu = $.ig.locale.hu || {};
	
	$.ig.locale.hu.Rating = {
			setOptionError: 'A következő opció esetében nem engedélyezettek a futásidejű változtatások: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.hu.Rating;
	return $.ig.locale.hu.Rating;
}));// REMOVE_FROM_COMBINED_FILES
