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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.Validator = {
		        defaultMessage: 'Dette felt har brug for opmærksomhed',
		        selectMessage: 'Der skal vælges en værdi',
		        rangeSelectMessage: 'Mindst {0} men ikke mere end {1} elementer skal vælges',
		        minSelectMessage: 'Mindst {0} element (er) skal vælges',
		        maxSelectMessage: 'Der skal ikke vælges mere end {0} element (er)',
		        rangeLengthMessage: 'Indtastningen skal være mellem {0} og {1} tegn',
		        minLengthMessage: 'Indtastningen skal være mindst {0} tegn',
		        maxLengthMessage: 'Indtastningen må højst være {0} tegn',
		        requiredMessage: 'Dette felt er påkrævet',
		        patternMessage: 'Indtastning stemmer ikke overens med det krævede mønster',
		        maskMessage: 'Alle krævede positioner skal udfyldes',
		        dateFieldsMessage: 'Der skal indtastes værdier for datofelter',
		        invalidDayMessage: 'Der skal indtastes en gyldig månedsdag',
		        dateMessage: 'Der skal indtastes en gyldig dato',
		        numberMessage: 'Der skal indtastes et gyldigt tal',
		        rangeValueMessage: 'Der skal indtastes en værdi mellem {0} og {1}',
		        minValueMessage: 'Der skal indtastes en værdi på mindst {0}',
		        maxValueMessage: 'Der skal indtastes en værdi, der ikke mere end {0}',
		        emailMessage: 'Der skal indtastes en gyldig e-mailadresse',
		        creditCardMessage: 'Der skal indtastes et gyldigt betalingskortnummer',
		        equalToMessage: 'De to værdier stemmer ikke overens',
		        optionalString: '(valgfri)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.da.Validator;
	return $.ig.locale.da.Validator;
}));// REMOVE_FROM_COMBINED_FILES
