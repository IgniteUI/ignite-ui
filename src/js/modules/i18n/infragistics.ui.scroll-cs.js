/*!@license
* Infragistics.Web.ClientUI Scroll localization resources <build_number>
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
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.cs = $.ig.locale.cs || {};

	    $.ig.locale.cs.Scroll = {
		        errorNoElementLink: 'Prvek, na který se odkazuje, neexistuje.',
		        errorNoScrollbarLink: 'Prvek posuvníku, který je propojen, neexistuje.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.cs.Scroll;
		return $.ig.locale.cs.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
