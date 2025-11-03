/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.de.Templating = {
			undefinedArgument: 'Beim Abrufen der Datenquellen-Eigenschaft ist ein Fehler aufgetreten: ',
			noAdvancedTemplating: 'Die erweiterte Vorlagen-Engine ist nicht geladen, um {{if}} oder {{each}} zu verarbeiten. Bitte das Modul "infragistics.templating.advanced.js" einbinden, um erweiterte Vorlagenfunktionen zu verwenden.'
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.de.Templating;
	return $.ig.locale.de.Templating;
}));// REMOVE_FROM_COMBINED_FILES
