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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.sv.Popover = {
		popoverOptionChangeNotSupported: "Ändring av följande alternativ efter igPopover har initierats stöds inte:",
		popoverShowMethodWithoutTarget: "Målparametern för visningsfunktionen är obligatorisk när väljaralternativet används"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.sv.Popover;
return $.ig.locale.sv.Popover;
}));// REMOVE_FROM_COMBINED_FILES
