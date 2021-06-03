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
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.TileManager = {
			renderDataError: "Os dados não foram recuperados ou analisados com sucesso.",
		    setOptionItemsLengthError: "O comprimento das configurações dos itens não corresponde ao número dos blocos.",
			setOptionError: "As alterações ao tempo de execução não são permitidas para esta opção."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.pt.TileManager;
	return $.ig.locale.pt.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
