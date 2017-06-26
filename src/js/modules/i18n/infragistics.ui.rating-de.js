﻿/*!@license
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
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	$.ig.Rating = {};

	$.extend($.ig.Rating, {
		locale: {
			setOptionError: 'Laufzeit-Änderungen sind für die folgende Option nicht zugelassen: '
		}
	});
		
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.locale.de.Rating = $.extend({}, $.ig.Rating.locale);
}));// REMOVE_FROM_COMBINED_FILES
