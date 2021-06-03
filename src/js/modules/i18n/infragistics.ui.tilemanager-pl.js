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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.TileManager = {
			renderDataError: "Dane nie zostały pomyślnie pobrane lub przeanalizowane.",
		    setOptionItemsLengthError: "Długość konfiguracji elementów nie odpowiada liczbie fragmentów.",
			setOptionError: "W przypadku tej opcji zmiany w czasie wykonywania nie są dozwolone."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.pl.TileManager;
	return $.ig.locale.pl.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
