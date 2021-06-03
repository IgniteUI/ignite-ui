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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.Validator = {
		        defaultMessage: 'To pole wymaga uwagi',
		        selectMessage: 'Należy wybrać wartość',
		        rangeSelectMessage: 'Należy wybrać co najmniej {0}, ale nie więcej niż {1} elementów(-y)',
		        minSelectMessage: 'Należy wybrać co najmniej {0} elementów(-y)',
		        maxSelectMessage: 'Nalży wybrać nie więcej niż {0} elementów(-y)',
		        rangeLengthMessage: 'Wpis powinien mieć długość od {0} do {1} znaków',
		        minLengthMessage: 'Wpis powinien mieć co najmniej {0} znaków',
		        maxLengthMessage: 'Długość wpisu nie może przekraczać {0} znaków',
		        requiredMessage: 'To pole jest wymagane',
		        patternMessage: 'Wpis nie pasuje do wymaganego wzorca',
		        maskMessage: 'Wszystkie wymagane pozycje powinny być wypełnione',
		        dateFieldsMessage: 'Należy wprowadzić wartości w polach daty',
		        invalidDayMessage: 'Należy wprowadzić prawidłowy dzień miesiąca',
		        dateMessage: 'Należy wprowadzić prawidłową datę',
		        numberMessage: 'Należy wprowadzić prawidłową liczbę',
		        rangeValueMessage: 'Należy wprowadzić wartość z przedziału od {0} do {1}',
		        minValueMessage: 'Należy wprowadzić wartość równą co najmniej {0}',
		        maxValueMessage: 'Należy wprowadzić wartość nie większą niż {0}',
		        emailMessage: 'Należy podać prawidłowy adres e-mail',
		        creditCardMessage: 'Należy wprowadzić prawidłowy numer karty płatniczej',
		        equalToMessage: 'Te dwie wartości są niezgodne',
		        optionalString: '(opcjonalnie)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.pl.Validator;
	return $.ig.locale.pl.Validator;
}));// REMOVE_FROM_COMBINED_FILES
