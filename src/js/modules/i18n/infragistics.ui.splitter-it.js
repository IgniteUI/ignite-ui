﻿/*!@license
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
	$.ig.locale.it = $.ig.locale.it || {};

	    $.ig.locale.it.Splitter = {
		        errorPanels: 'Il numero di pannelli non deve essere superiore a due.',
		        errorSettingOption: 'Opzione impostazione errore.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.it.Splitter;
		return $.ig.locale.it.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
