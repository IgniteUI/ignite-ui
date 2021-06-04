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
	$.ig.locale.ro = $.ig.locale.ro || {};

	    $.ig.locale.ro.Splitter = {
		        errorPanels: 'Numărul de panouri nu trebuie să fie mai mare de două.',
		        errorSettingOption: 'Opțiunea de setare a erorii.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.ro.Splitter;
		return $.ig.locale.ro.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
