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
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};

	 $.ig.locale.de.Splitter = {
		    errorPanels: 'Die Anzahl Bereiche muss größer als zwei sein.',
		    errorSettingOption: 'Option der Fehlereinstellung.'
		}

		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.de.Splitter;
		return $.ig.locale.de.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
