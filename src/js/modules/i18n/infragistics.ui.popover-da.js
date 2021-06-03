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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.da.Popover = {
		popoverOptionChangeNotSupported: "Ændring af følgende indstilling efter igPopover er initialiseret understøttes ikke:",
		popoverShowMethodWithoutTarget: "Visningsfunktionens målparameter er obligatorisk, når valgtilstanden bruges"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.da.Popover;
return $.ig.locale.da.Popover;
}));// REMOVE_FROM_COMBINED_FILES
