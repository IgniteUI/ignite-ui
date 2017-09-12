/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
    $ = $ || {};
    $.ig = $.ig || {};
	$.ig.Validator = $.ig.Validator || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	
	$.ig.locale.fr.Validator = {
			    defaultMessage: 'Veuillez réparer ce champ',
			    selectMessage: 'Veuillez sélectionner une valeur',
			    rangeSelectMessage: 'Veuillez sélectionner au maximum {0} et au minimum {1} éléments',
			    minSelectMessage: 'Veuillez sélectionner au moins {0} éléments',
			    maxSelectMessage: 'Veuillez sélectionner au maximum {0} éléments',
			    rangeLengthMessage: 'Veuillez entrer une valeur contenant {0} à {1} caractères',
			    minLengthMessage: 'Veuillez entrer au moins {0} caractères',
			    maxLengthMessage: 'Veuillez sélectionner au maximum {0} caractères',
			    requiredMessage: 'Ce champ est obligatoire',
			    patternMessage: 'La valeur entrée ne correspond pas au schéma requis',
			    maskMessage: 'Veuillez remplir tous les postes requis',
			    dateFieldsMessage: 'Veuillez entrer des valeurs dans les champs de dates',
			    invalidDayMessage: 'Jour du mois invalide. Veuillez entrer un jour correct',
			    dateMessage: 'Veuillez entrer une date valide',
			    numberMessage: 'Veuillez entrer un nombre valide',
                rangeValueMessage: 'Veuillez entrer une valeur entre {0} et {1}',
		        minValueMessage: 'Veuillez entrer une valeur supérieure ou égale à {0}',
		        maxValueMessage: 'Veuillez entrer une valeur inférieure ou égale à {0}',
		        emailMessage: 'Une adresse e-mail valide doit être saisie',
				creditCardMessage: 'Un numéro de carte de paiement valide doit être saisi',
		        equalToMessage: 'Les deux valeurs ne correspondent pas',
		        optionalString: '(facultatif)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.fr.Validator;
	return $.ig.locale.fr.Validator;
}));// REMOVE_FROM_COMBINED_FILES
