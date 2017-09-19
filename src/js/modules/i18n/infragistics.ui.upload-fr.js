/*!@license
* Infragistics.Web.ClientUI Upload localization resources <build_number>
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

    if (!$.ig.Upload) {
	    $.ig.Upload = {};

	    $.extend($.ig.Upload, {

		    locale: {
			    labelUploadButton: "Charger le fichier",
			    labelAddButton: "Ajouter",
			    labelClearAllButton: "Effacer chargés",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} de {1} chargés",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Afficher Détails",
			    labelHideDetails: "Masquer Détails",
			    labelSummaryProgressButtonCancel: "Annuler",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Charger",
			    labelSummaryProgressButtonDone: "Terminé",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Taille de fichier maxi excédée.",
			    errorMessageGetFileStatus: "Impossible d'obtenir votre statut de fichier actuel ! Connexion probablement perdue.",
			    errorMessageCancelUpload: "Impossible d'envoyer au serveur l'ordre d'annuler le chargement ! Connexion probablement perdue.",
			    errorMessageNoSuchFile: "Impossible de trouver le fichier demandé. Fichier probablement trop gros.",
			    errorMessageOther: "Erreur interne lors du chargement du fichier. Code d'erreur : {0}.",
			    errorMessageValidatingFileExtension: "Echec validation de l'extension du fichier.",
			    errorMessageAJAXRequestFileSize: "Erreur AJAX lors de la détermination de la taille du fichier.",
			    errorMessageMaxUploadedFiles: "Nombre maxi de fichiers chargés excédé.",
			    errorMessageMaxSimultaneousFiles: "La valeur igTree est incorrecte. Elle doit être supérieure ou égale à 0.",
			    errorMessageTryToRemoveNonExistingFile: "Vous essayez de supprimer un fichier qui n'existe pas avec l'id {0}.",
			    errorMessageTryToStartNonExistingFile: "Vous essayez de démarrer un fichier qui n'existe pas avec l'id {0}.",
			    errorMessageDropMultipleFilesWhenSingleModel: "Vous ne pouvez pas déposer plus d’un fichier en mode simple",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Charger le fichier",
			    titleAddFileButton: "Ajouter",
			    titleCancelUploadButton: "Annuler",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Charger",
			    titleClearUploaded: "Effacer chargés",
			    titleShowDetailsButton: "Afficher Détails",
			    titleHideDetailsButton: "Masquer Détails",
			    titleSummaryProgressButtonCancel: "Annuler",
			    titleSummaryProgressButtonDone: "Terminé",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Charger",
			    titleClearAllButton: "Effacer chargés"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
