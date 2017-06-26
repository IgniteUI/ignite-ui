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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
$.ig = $.ig || {};

$.ig.Popover = {};

$.extend( $.ig.Popover, {
	locale: {
		popoverOptionChangeNotSupported: "La modification de l'option suivante après l'initialisation de FinPopig n'est pas prise en charge :",
		popoverShowMethodWithoutTarget: "Le paramètre target de la fonction show est obligatoire lorsque l'option selectors est utilisée"
	}
});

$.ig.locale = $.ig.locale || {};
$.ig.locale.fr = $.ig.locale.fr || {};
$.ig.locale.fr.Popover = $.extend({}, $.ig.Popover.locale);
}));// REMOVE_FROM_COMBINED_FILES
