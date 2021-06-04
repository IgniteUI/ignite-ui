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
	$.ig.locale.cs = $.ig.locale.cs || {};
	
	$.ig.locale.cs.Rating = {
			setOptionError: 'Změny za běhu nejsou povoleny pro následující možnost: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.cs.Rating;
	return $.ig.locale.cs.Rating;
}));// REMOVE_FROM_COMBINED_FILES
