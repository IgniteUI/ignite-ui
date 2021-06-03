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
	$.ig.locale.tr = $.ig.locale.tr || {};
	
	$.ig.locale.tr.Rating = {
			setOptionError: 'Aşağıdaki seçenek için çalışma zamanı değişikliklerine izin verilmez: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.tr.Rating;
	return $.ig.locale.tr.Rating;
}));// REMOVE_FROM_COMBINED_FILES
