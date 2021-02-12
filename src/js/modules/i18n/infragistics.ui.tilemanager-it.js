/*!@license
* Infragistics.Web.ClientUI Tile Manager localization resources <build_number>
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
	$.ig.TileManager = $.ig.TileManager || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.TileManager = {
			renderDataError: "Dati non recuperati o analizzati correttamente.",
		    setOptionItemsLengthError: "La lunghezza delle configurazioni degli elementi non corrisponde al numero dei riquadri.",
			setOptionError: "Le modifiche al runtime non sono consentite per questa opzione."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.it.TileManager;
	return $.ig.locale.it.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
