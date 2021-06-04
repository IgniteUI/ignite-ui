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
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.pl.Popover = {
		popoverOptionChangeNotSupported: "Zmiana następującej opcji po zainicjowaniu funkcji igPopover nie jest obsługiwana:",
		popoverShowMethodWithoutTarget: "Parametr docelowy funkcji pokazywania jest obowiązkowy, gdy używana jest opcja selektorów"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.pl.Popover;
return $.ig.locale.pl.Popover;
}));// REMOVE_FROM_COMBINED_FILES
