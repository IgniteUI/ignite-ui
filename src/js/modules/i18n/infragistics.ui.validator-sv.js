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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Validator = $.ig.Validator || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.Validator = {
		        defaultMessage: 'Detta fält behöver uppmärksammas',
		        selectMessage: 'Ett värde borde väljas',
		        rangeSelectMessage: 'Minst {0} men högst {1} objekt borde väljas',
		        minSelectMessage: 'Minst {0} objekt borde väljas',
		        maxSelectMessage: 'Högst {0} objekt borde väljas',
		        rangeLengthMessage: 'Inmatningen bör vara mellan {0} och {1} tecken lång',
		        minLengthMessage: 'Inmatningen ska innehålla minst {0} tecken',
		        maxLengthMessage: 'Inmatningen får inte vara längre än {0} tecken',
		        requiredMessage: 'Detta fält krävs',
		        patternMessage: 'Inmatningen matchar inte det önskade mönstret',
		        maskMessage: 'Alla obligatoriska positioner måste fyllas i',
		        dateFieldsMessage: 'Datumfältvärden borde anges',
		        invalidDayMessage: 'En giltig dag i månaden borde anges',
		        dateMessage: 'Ett giltigt datum borde anges',
		        numberMessage: 'Ett giltigt nummer borde anges',
		        rangeValueMessage: 'Ett värde mellan {0} och {1} borde anges',
		        minValueMessage: 'Ett värde på minst {0} borde anges',
		        maxValueMessage: 'Ett värde högst {0} borde anges',
		        emailMessage: 'En giltig e-postadress borde anges',
		        creditCardMessage: 'Ett giltigt betalkortsnummer borde anges',
		        equalToMessage: 'De två värdena matchar inte',
		        optionalString: '(frivillig)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.sv.Validator;
	return $.ig.locale.sv.Validator;
}));// REMOVE_FROM_COMBINED_FILES
