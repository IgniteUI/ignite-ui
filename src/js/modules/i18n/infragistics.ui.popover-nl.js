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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.nl.Popover = {
		popoverOptionChangeNotSupported: "Het wijzigen van de volgende optie nadat igPopover is geïnitialiseerd, wordt niet ondersteund:",
		popoverShowMethodWithoutTarget: "De doelparameter van de showfunctie is verplicht wanneer de optie selectors wordt gebruikt"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.nl.Popover;
return $.ig.locale.nl.Popover;
}));// REMOVE_FROM_COMBINED_FILES
