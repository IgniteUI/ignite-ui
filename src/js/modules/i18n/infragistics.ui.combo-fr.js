﻿/*!@license
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

	$.ig.Combo = {
		locale: {
			noMatchFoundText: 'Aucun résultat',
			dropDownButtonTitle: 'Afficher la liste déroulante',
			clearButtonTitle: 'Effacer la valeur',
			placeHolder: 'sélectionner...',
			notSuported: 'L’opération n’est pas prise en charge.',
			errorNoSupportedTextsType: "Un texte de filtrage différent est requis. Fournissez une valeur correspondant soit à une chaîne, soit à un tableau de chaînes.",
			errorUnrecognizedHighlightMatchesMode: "Un mode d’association de surbrillance différent est requis. Choisissez une valeur entre « multi », « contains », « startsWith », « full » et « null ».",
			errorIncorrectGroupingKey: "La clé de groupement n’est pas correcte."
		}
	};

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	$.ig.locale.fr.Combo = $.extend({}, $.ig.Combo.locale);
}));// REMOVE_FROM_COMBINED_FILES
