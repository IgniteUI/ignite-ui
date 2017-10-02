/*!@license
* Infragistics.Web.ClientUI Tree localization resources <build_number>
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
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};

	$.ig.locale.fr.Tree = {
			    invalidArgumentType: "Type d'argument fourni invalide.",
			    errorOnRequest: "Une erreur s'est produite pendant la récupération des données : ",
			    noDataSourceUrl: 'La commande igTree requiert une dataSourceUrl pour initier une requête de données pour cette URL.',
			    incorrectPath: 'Un nœud a été trouvé sur le chemin fourni : ',
			    incorrectNodeObject: "L'argument fourni n'est pas un élément de nœud jQuery.",
			    setOptionError: "Les modifications de temps d'exécution ne sont pas autorisées pour l'option suivante : ",
			    moveTo: '<strong>Déplacer vers</strong> {0}',
			    moveBetween: '<strong>Déplacer entre</strong> {0} et {1}',
			    moveAfter: '<strong>Déplacer après</strong> {0}',
			    moveBefore: '<strong>Déplacer avant</strong> {0}',
			    copyTo: '<strong>Copier vers</strong> {0}',
			    copyBetween: '<strong>Copier entre</strong> {0} et {1}',
			    copyAfter: '<strong>Copier après</strong> {0}',
			    copyBefore: '<strong>Copier avant</strong> {0}',
			    and: 'et'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.fr.Tree;
	return $.ig.locale.fr.Tree;;
}));// REMOVE_FROM_COMBINED_FILES
