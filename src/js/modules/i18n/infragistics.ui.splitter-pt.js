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
	$.ig.locale.pt = $.ig.locale.pt || {};

	    $.ig.locale.pt.Splitter = {
		        errorPanels: 'O número de painéis não pode ser superior a dois.',
		        errorSettingOption: 'Erro ao definir opção.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.pt.Splitter;
		return $.ig.locale.pt.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
