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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Rating = $.ig.Rating || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.Rating = {
			setOptionError: 'Стойността на следната опция не може да бъде променяна след инициализация: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.bg.Rating;
	return $.ig.locale.bg.Rating;
}));// REMOVE_FROM_COMBINED_FILES
