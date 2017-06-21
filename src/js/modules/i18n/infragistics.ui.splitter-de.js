/*!@license
* Infragistics.Web.ClientUI Splitter localization resources <build_number>
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

	$.ig.Splitter = {};

	$.extend($.ig.Splitter, {
		locale: {
		    errorPanels: 'Die Anzahl Bereiche muss größer als zwei sein.',
		    errorSettingOption: 'Option der Fehlereinstellung.'
		}
	});

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.de = $.ig.locale.de || {};
		$.ig.locale.de.Splitter = $.extend({}, $.ig.Splitter.locale);
}));// REMOVE_FROM_COMBINED_FILES
