/*!@license
* Infragistics.Web.ClientUI Editors localization resources <build_number>
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

    if (!$.ig.Editor) {
	    $.ig.Editor = {
		    locale: {
			    spinUpperTitle: 'Augmenter',
			    spinLowerTitle: 'Diminuer',
			    buttonTitle: 'Afficher la liste',
			    clearTitle: 'Effacer la valeur',
			    ariaTextEditorFieldLabel: 'Éditeur de texte',
			    ariaNumericEditorFieldLabel: 'Éditeur numérique',
			    ariaCurrencyEditorFieldLabel: 'Éditeur de monnaie',
			    ariaPercentEditorFieldLabel: 'Éditeur de pourcentage',
			    ariaMaskEditorFieldLabel: 'Éditeur de masque',
			    ariaDateEditorFieldLabel: 'Éditeur de date',
			    ariaDatePickerFieldLabel: 'Sélecteur de date',
			    ariaSpinUpButton: 'Rotation vers le haut',
			    ariaSpinDownButton: 'Rotation vers le bas',
			    ariaDropDownButton: 'Défilement vers le bas',
			    ariaClearButton: 'Effacer',
			    ariaCalendarButton: 'Calendrier',
			    datePickerButtonTitle: 'Afficher le calendrier',
			    updateModeUnsupportedValue: 'L\'option updateMode prend en charge deux valeurs possibles - "onChange" et "immediate"',
			    updateModeNotSupported: 'La propriété updateMode ne prend en charge que le mode "onchange" pour les extensions igMaskEditor, igDateEditor et igDatePicker',
			    renderErrMsg: "L’éditeur de base ne peut pas être directement instancié. Essayez avec du texte, une donnée numérique, une date ou un autre éditeur.",
			    multilineErrMsg: "textArea requiert une configuration différente. textMode doit être réglé sur « multiline ».",
			    targetNotSupported: "L’élément cible n’est pas pris en charge.",
			    placeHolderNotSupported: "L’attribut de l’espace réservé n’est pas pris en charge par votre navigateur.",
			    allowedValuesMsg: "Choisissez une valeur dans la liste déroulante",
			    maxLengthErrMsg: "La valeur entrée est trop longue et a été réduite à {0} symboles",
			    maxLengthWarningMsg: "La saisie a atteint la longueur maximale de {0} pour ce champ",
			    minLengthErrMsg: "La saisie doit comporter {0} caractères au minimum",
			    maxValErrMsg: "La valeur entrée a atteint la valeur maximum fixée à {0} pour ce champ",
			    minValErrMsg: "La valeur entrée a atteint la valeur minimum fixée à {0} pour ce champ",
			    maxValExceedRevertErrMsg: "La valeur entrée a atteint la valeur maximum fixée à {0} et est revenue à la valeur antérieure",
			    minValExceedRevertErrMsg: "La saisie est inférieure à la valeur minimale de {0} et a été ramenée à la précédente",
			    maxValExceedSetErrMsg: "La saisie a dépassé la valeur maximum de {0} et a été fixée sur la valeur maximum",
			    minValExceedSetErrMsg: "La saisie a dépassé la valeur minimum de {0} et a été fixée sur la valeur minimum",
			    maxValExceededWrappedAroundErrMsg: "La valeur entrée a atteint la valeur maximum fixée à {0} et a été fixée à la valeur minimum autorisée",
			    minValExceededWrappedAroundErrMsg: "La saisie est inférieure à la valeur minimale de {0} et a été réglée sur la valeur maximale autorisée",
			    btnValueNotSupported: "Une valeur de bouton différente est requise. Choisissez une valeur entre « dropdown », « clear » et « spin ».",
			    scientificFormatErrMsg: "Un scientificFormat différent est requis. Choisissez une valeur entre « E », « e », « E+ » et « e+ ».",
			    spinDeltaIsOfTypeNumber: "Un type de spinDelta différent est requis. Un nombre positif doit être saisi.",
			    spinDeltaCouldntBeNegative: "L’option spinDelta ne peut pas être négative. Un nombre positif doit être saisi.",
			    spinDeltaContainsExceedsMaxDecimals: "Le nombre maximum de fractions autorisées pour spinDelta est de {0}. Modifiez MaxDecimals ou diminuez la valeur.",
			    spinDeltaIncorrectFloatingPoint: "La virgule flottante spinDelta requiert une configuration différente. Réglez le dataMode de l’éditeur sur 'double' ou 'float', ou réglez spinDelta sur 'integer'.",
			    notEditableOptionByInit: "Cette option ne peut pas être modifiée après l’initialisation. Ses valeurs doivent être définies pendant l’initialisation.",
			    numericEditorNoSuchMethod: "L’éditeur numérique ne prend pas cette méthode en charge.",
			    numericEditorNoSuchOption: "L’éditeur numérique ne prend pas cette option en charge.",
			    displayFactorIsOfTypeNumber: "displayFactor requiert une valeur différente. Sa valeur doit être un nombre compris entre 1 et 100.",
			    displayFactorAllowedValue: "displayFactor requiert une valeur différente. Sa valeur doit être un nombre compris entre 1 et 100.",
			    instantiateCheckBoxErrMsg: "igCheckboxEditor requiert un élément différent. Choisissez entre l’élément INPUT, SPAN ou DIV.",
			    cannotParseNonBoolValue: "igCheckboxEditor requiert une valeur différente. Une valeur booléenne doit être fournie.",
			    cannotSetNonBoolValue: "igCheckboxEditor requiert une valeur différente. Une valeur booléenne doit être fournie.",
			    maskEditorNoSuchMethod: "L’éditeur de masque ne prend pas cette méthode en charge.",
			    datePickerEditorNoSuchMethod: "L’éditeur de date ne prend pas cette méthode en charge.",
			    datePickerNoSuchMethodDropDownContainer: "L’éditeur de date ne prend pas cette méthode en charge. Utilisez 'getCalendar' à la place.",
			    buttonTypeIsDropDownOnly: "Le sélecteur de dates autorise uniquement les valeurs de la liste déroulante ou d’effacement pour l’option buttonType.",
			    cannotSetRuntime: "Cette option ne peut pas être définie lors de l’exécution",
			    invalidDate: "Date non valide",
			    maskMessage: 'Tous les postes requis doivent être remplis',
			    maskRevertMessage: "Toutes les positions requises doivent être remplies, c'est pourquoi la valeur a été réinitialisée à la dernière valeur valide.",
				dateMessage: 'Une date valide doit être saisie',
			    centuryThresholdValidValues: "La propriété centuryThreshold doit être comprise entre 0 et 99. La valeur a été réinitialisée à son état par défaut.",
			    noListItemsNoButton: "Aucun compteur ni bouton de liste ne s’affiche car il n’y a pas d’éléments de liste."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
