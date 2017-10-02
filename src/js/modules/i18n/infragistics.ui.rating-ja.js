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
	$.ig.locale.ja = $.ig.locale.ja || {};

	$.ig.locale.ja.Rating = {
			setOptionError: '次のオプションはランタイムで変更できません: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.ja.Rating;
	return $.ig.locale.ja.Rating;
}));// REMOVE_FROM_COMBINED_FILES
