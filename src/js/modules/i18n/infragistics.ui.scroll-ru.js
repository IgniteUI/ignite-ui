/*!@license
* Infragistics.Web.ClientUI Scroll localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [], factory );
	} else {
		return factory();
	}
}
(function ($) {
		$ = $ || {};
		$.ig = $.ig || {};
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ru = $.ig.locale.ru || {};

	    $.ig.locale.ru.Scroll = {
		        errorNoElementLink: 'Связанный элемент не найден.',
		        errorNoScrollbarLink: 'Связанный элемент "полоса прокрутки" не найден.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.ru.Scroll;
		return $.ig.locale.ru.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
