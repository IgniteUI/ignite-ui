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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.Validator = {
		        defaultMessage: 'Bu alana dikkat edilmesi gerekiyor',
		        selectMessage: 'Bir değer seçilmelidir',
		        rangeSelectMessage: 'En az {0}, en fazla {1} öğe seçilmelidir',
		        minSelectMessage: 'En az {0} öğe seçilmelidir',
		        maxSelectMessage: '{0} öğeden fazlası seçilmemelidir',
		        rangeLengthMessage: 'Giriş, {0} ile {1} karakter uzunluğunda olmalıdır',
		        minLengthMessage: 'Giriş en az {0} karakter uzunluğunda olmalıdır',
		        maxLengthMessage: 'Giriş, {0} karakterden uzun olmamalıdır',
		        requiredMessage: 'Bu alan gereklidir',
		        patternMessage: 'Giriş, gerekli modelle eşleşmiyor',
		        maskMessage: 'Gerekli tüm pozisyonlar doldurulmalıdır',
		        dateFieldsMessage: 'Tarih alanı değerleri girilmelidir',
		        invalidDayMessage: 'Ayın geçerli bir günü girilmelidir',
		        dateMessage: 'Geçerli bir tarih girilmelidir',
		        numberMessage: 'Geçerli bir sayı girilmelidir',
		        rangeValueMessage: '{0} ile {1} arasında bir değer girilmelidir',
		        minValueMessage: 'En az {0} değeri girilmelidir',
		        maxValueMessage: 'En fazla {0} değeri girilmelidir',
		        emailMessage: 'Geçerli bir e-posta adresi girilmelidir',
		        creditCardMessage: 'Geçerli bir ödeme kartı numarası girilmelidir',
		        equalToMessage: 'İki değer uyuşmuyor',
		        optionalString: '(isteğe bağlı)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.tr.Validator;
	return $.ig.locale.tr.Validator;
}));// REMOVE_FROM_COMBINED_FILES
