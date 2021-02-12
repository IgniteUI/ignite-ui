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
	$.ig.locale.it = $.ig.locale.it || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.it.Popover = {
		popoverOptionChangeNotSupported: "La modifica dell'opzione seguente dopo l'inizializzazione di igPopover non è supportata:",
		popoverShowMethodWithoutTarget: "Il parametro target della funzione show è obbligatorio quando si utilizza l'opzione selettori"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.it.Popover;
return $.ig.locale.it.Popover;
}));// REMOVE_FROM_COMBINED_FILES
