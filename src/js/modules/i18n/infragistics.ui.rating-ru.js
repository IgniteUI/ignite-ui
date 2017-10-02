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
	$.ig.locale.ru = $.ig.locale.ru || {};

	$.ig.locale.ru.Rating = {
			setOptionError: 'Динамические изменения следующей опции не поддерживаются: '
	}

	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.ru.Rating;
	return $.ig.locale.ru.Rating;
}));// REMOVE_FROM_COMBINED_FILES
