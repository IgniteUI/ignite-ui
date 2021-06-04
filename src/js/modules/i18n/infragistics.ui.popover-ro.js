/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.ro.Popover = {
		popoverOptionChangeNotSupported: "Modificarea următoarei opțiuni după inițializarea igPopover nu este acceptată:",
		popoverShowMethodWithoutTarget: "Parametrul țintă al funcției de afișare este obligatoriu atunci când este utilizată opțiunea de selectare"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.ro.Popover;
return $.ig.locale.ro.Popover;
}));// REMOVE_FROM_COMBINED_FILES
