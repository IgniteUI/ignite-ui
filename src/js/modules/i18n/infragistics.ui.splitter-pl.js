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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pl = $.ig.locale.pl || {};

	    $.ig.locale.pl.Splitter = {
		        errorPanels: 'Liczba paneli nie może przekraczać dwóch.',
		        errorSettingOption: 'Błąd ustawienia opcji.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.pl.Splitter;
		return $.ig.locale.pl.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
