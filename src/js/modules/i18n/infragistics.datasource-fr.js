/*!@license
* Infragistics.Web.ClientUI data source localization resources <build_number>
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

    if (!$.ig.DataSourceLocale) {
	    $.ig.DataSourceLocale = {};

	    $.extend($.ig.DataSourceLocale, {

		    locale: {
			    invalidDataSource: "La source de données fournie est invalide. Il s'agit d'un scalaire.",
			    unknownDataSource: "Impossible de déterminer le type de source de données. Veuillez préciser s'il s'agit de données JSON ou XML.",
			    errorParsingArrays: "Une erreur s'est produite lors de l'analyse syntaxique des données de tableaux  et de l'application du schéma de données défini : ",
			    errorParsingJson: "Une erreur s'est produite lors de l'analyse syntaxique des données JSON et de l'application du schéma de données défini : ",
			    errorParsingXml: "Une erreur s'est produite lors de l'analyse syntaxique des données XML et de l'application du schéma de données défini : ",
			    errorParsingHtmlTable: "Une erreur s'est produite lors de l'extraction des données du tableau HTML et lors de l'application du schéma : ",
			    errorExpectedTbodyParameter: "Un corps ou un tableau était attendu comme paramètre.",
			    errorTableWithIdNotFound: "Le tableau HTML avec l'ID suivant n'a pas été trouvé : ",
			    errorParsingHtmlTableNoSchema: "Une erreur s'est produite lors de l'analyse syntaxique du tableau DOM : ",
			    errorParsingJsonNoSchema: "Une erreur s'est produite lors de l'analyse syntaxique/l'évaluation de la chaîne JSON : ",
			    errorParsingXmlNoSchema: "Une erreur s'est produite lors de l'analyse syntaxique de la chaîne XML : ",
			    errorXmlSourceWithoutSchema: "La source de données fournie est un document xml, mais il n'existe pas de schéma de données défini ($.IgDataSchema) ",
			    errorUnrecognizedFilterCondition: " La condition de filtre spécifiée n'a pas été reconnue : ",
			    errorRemoteRequest: "La requête à distance pour récupérer les données a échoué : ",
			    errorSchemaMismatch: "Les données entrées ne coïncident pas avec le schéma, le champ suivant n'a pas pu être cartographié : ",
			    errorSchemaFieldCountMismatch: "Les données entrées ne coïncident pas avec le schéma en termes de nombre de champs. ",
			    errorUnrecognizedResponseType: "Le type de réponse n'a pas été défini correctement ou il était impossible de le détecter automatiquement. Veuillez définir settings.responseDataType et/ou settings.responseContentType.",
			    hierarchicalTablesNotSupported: "Les tableaux ne sont pas pris en charge pour HierarchicalSchema",
			    cannotBuildTemplate: "Le modèle jQuery n'a pas pu être créé. Aucune archive présente dans la source de données et aucune colonne définie.",
			    unrecognizedCondition: "Condition de filtrage non reconnue dans l'expression suivante : ",
			    fieldMismatch: "L'expression suivante contient un champ ou une condition de filtrage invalide : ",
			    noSortingFields: "Aucun champ spécifié. Spécifiez au moins un champ de tri pour utiliser l'option de tri ().",
			    filteringNoSchema: "Aucun schéma/champ spécifié. Spécifiez un schéma avec des définitions et types de champs pour pouvoir filtrer la source de données.",
			    noSaveChanges: "Échec de l’enregistrement des modifications. Le serveur n’a pas renvoyé l’objet Success ou a renvoyé Success:false.",
			    errorUnexpectedCustomFilterFunction: "Une valeur inattendue a été fournie pour une fonction de filtre personnalisé. Une fonction ou une chaîne est attendue."
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
