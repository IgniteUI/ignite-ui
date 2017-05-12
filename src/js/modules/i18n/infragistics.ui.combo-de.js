/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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

    if (!$.ig.Combo) {
	    $.ig.Combo = {
		    locale: {
		        noMatchFoundText: 'Keine Ergebnisse',
		        dropDownButtonTitle: 'Dropdown anzeigen',
		        clearButtonTitle: 'Wert löschen',
		        placeHolder: 'auswählen...',
		        notSuported: 'Vorgang wird nicht unterstützt.',
		        errorNoSupportedTextsType: "Ein anderer Filtertext ist erforderlich. Einen Wert angeben, der entweder eine Zeichenfolge oder ein Array mit Zeichenfolgen ist.",
		        errorUnrecognizedHighlightMatchesMode: 'Ein anderer Modus zum Hervorheben von Übereinstimmungen ist erforderlich. Einen Wert aus "multi", "contains", "startsWith", "full" und "null" wählen.',
		        errorIncorrectGroupingKey: "Gruppierungsschlüssel ist nicht korrekt."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
