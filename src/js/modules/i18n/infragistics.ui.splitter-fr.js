/*!@license
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
	$.ig.locale.fr = $.ig.locale.fr || {};

	 $.ig.locale.fr.Splitter = {
		    errorPanels: 'Le nombre de panneaux ne doit pas être supérieur à deux.',
		    errorSettingOption: "Erreur lors du réglage de l'option."
		}

	$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.fr.Splitter;
	return $.ig.locale.fr.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
