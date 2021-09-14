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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale['nb-NO'].Popover = {
		popoverOptionChangeNotSupported: "Det er ikke mulig å endre følgende alternativ etter at igPopover er initialisert:",
		popoverShowMethodWithoutTarget: "Målparameteren for visningsfunksjonen er obligatorisk når alternativet velgere brukes"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale['nb-NO'].Popover;
return $.ig.locale['nb-NO'].Popover;
}));// REMOVE_FROM_COMBINED_FILES
