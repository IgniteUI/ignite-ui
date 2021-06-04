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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Editor = $.ig.Editor || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.Editor = {
		spinUpperTitle: 'Artış',
		spinLowerTitle: 'Azalış',
		buttonTitle: 'Listeyi göster',
		clearTitle: 'Değeri temizle',
		ariaTextEditorFieldLabel: 'Metin Düzenleyici',
		ariaNumericEditorFieldLabel: 'Sayısal Düzenleyici',
		ariaCurrencyEditorFieldLabel: 'Para Birimi Düzenleyicisi',
		ariaPercentEditorFieldLabel: 'Yüzde Düzenleyici',
		ariaMaskEditorFieldLabel: 'Maske Düzenleyici',
		ariaDateEditorFieldLabel: 'Tarih Düzenleyici',
		ariaDatePickerFieldLabel: 'Tarih Seçici',
		ariaTimePickerFieldLabel: "Zaman Seçici",
		ariaSpinUpButton: 'Yukarı Döndür',
		ariaSpinDownButton: 'Aşağı Döndür',
		ariaDropDownButton: 'Açılır',
		ariaClearButton: 'Temizle',
		ariaCalendarButton: 'Takvim',
		datePickerButtonTitle: 'Takvimi göster',
		updateModeUnsupportedValue: 'updateMode farklı bir yapılandırma gerektirir. OnChange" ve "immediate" arasında bir değer seçin.',
		updateModeNotSupported: 'updateMode özelliği, igMaskEditor, igDateEditor ve igDatePicker uzantıları için yalnızca "onchange" modunu destekler',
		renderErrMsg: "Bir temel düzenleyici doğrudan somutlaştırılamaz. Bir metin, sayı, tarih veya başka bir düzenleyici ile deneyin.",
		multilineErrMsg: 'textArea farklı bir yapılandırma gerektirir. TextMode, "multiline" olarak ayarlanmalıdır.',
		targetNotSupported: "Bu hedef öğe desteklenmiyor.",
		placeHolderNotSupported: "Yer tutucu özelliği tarayıcınız tarafından desteklenmiyor.",
		allowedValuesMsg: "Açılır listeden bir değer seçin",
		maxLengthErrMsg: "Giriş çok uzun ve {0} sembole kırpıldı",
		maxLengthWarningMsg: "Giriş, bu alan için maksimum {0} uzunluğuna ulaştı",
		minLengthErrMsg: "En az {0} karakter girilmelidir",
		maxValErrMsg: "Giriş, bu alan için maksimum {0} değerine ulaştı",
		minValErrMsg: "Giriş, bu alan için minimum {0} değerine ulaştı",
		maxValExceedRevertErrMsg: "Giriş, maksimum {0} değerini aştı ve önceki girişe geri döndürüldü",
		minValExceedRevertErrMsg: "Giriş, minimum {0} değerinden düşüktü ve önceki girişe geri döndürüldü",
		maxValExceedSetErrMsg: "Giriş, maksimum {0} değerini aştı ve maksimum değere ayarlandı",
		minValExceedSetErrMsg: "Giriş, minimum {0} değerinden düşüktü ve minimum değere ayarlandı",
		maxValExceededWrappedAroundErrMsg: "Giriş, maksimum {0} değerini aştı ve izin verilen minimum değere ayarlandı",
		minValExceededWrappedAroundErrMsg: "Giriş, minimum {0} değerinden düşüktü ve izin verilen maksimum girişe ayarlandı",
		btnValueNotSupported: 'Farklı bir düğme değeri gereklidir. "Dropdown", "clear" ve "spin" arasında bir değer seçin.',
		scientificFormatErrMsg: 'Farklı bir bilimsel format gereklidir. "E", "e", "E+" ve "e+" arasında bir değer seçin.',
		spinDeltaIsOfTypeNumber: "Farklı bir spinDelta türü gereklidir. Pozitif bir sayı girilmelidir.",
		spinDeltaIsOfTypeNumberForPeriod: "{0} için farklı bir spinDelta türü gerekli. {1} ile {2} arasında pozitif bir sayı girilmelidir.",
		spinDeltaIsOfTypeNumberOrObject: "Farklı bir spinDelta türü gereklidir. Pozitif bir sayı veya farklı zaman aralığı deltalarını tanımlayan bir nesne girilmelidir.",
		spinDeltaShouldBeInRange: "{0} için spinDelta seçeneği {1} ile {2} arasında olmalıdır",
		spinDeltaCouldntBeNegative: "SpinDelta seçeneği negatif olamaz. Pozitif bir sayı girilmelidir.",
		spinDeltaContainsExceedsMaxDecimals: "SpinDelta için izin verilen maksimum kesirler {0} olarak ayarlandı. Ya MaxDecimals'ı değiştirin ya da değerinizi küçültmeyi deneyin.",
		spinDeltaIncorrectFloatingPoint: 'Kayan noktalı spinDelta, farklı bir yapılandırma gerektirir. Düzenleyicinin dataMode değerini "double" veya "float" olarak ayarlayın veya spinDelta\'yı tamsayı olarak ayarlayın.',
		numericEditorNoSuchMethod: "Sayısal düzenleyici bu yöntemi desteklemiyor.",
		numericEditorNoSuchOption: "Sayısal düzenleyici bu seçeneği desteklemiyor.",
		displayFactorIsOfTypeNumber: "displayFactor farklı bir değer gerektiriyor. Değeri, sayı olarak 1 veya 100 olarak ayarlanmalıdır.",
		displayFactorAllowedValue: "displayFactor farklı bir değer gerektiriyor. Değeri, sayı olarak 1 veya 100 olarak ayarlanmalıdır.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor farklı bir öğe gerektirir. INPUT, SPAN veya DIV öğesini kullanın.",
		cannotParseNonBoolValue: "igCheckboxEditor farklı bir değer gerektirir. Bir boole değeri sağlanmalıdır.",
		cannotSetNonBoolValue: "igCheckboxEditor farklı bir değer gerektirir. Bir boole değeri sağlanmalıdır.",
		maskEditorNoSuchMethod: "Maske düzenleyici bu yöntemi desteklemiyor.",
		datePickerEditorNoSuchMethod: "Tarih düzenleyici bu yöntemi desteklemiyor.",
		datePickerNoSuchMethodDropDownContainer: "Tarih düzenleyici bu yöntemi desteklemiyor. Bunun yerine 'getCalendar' olanı kullanın.",
		buttonTypeIsDropDownOnly: "Datepicker, buttonType seçeneği için yalnızca açılır menüye ve temizleme değerlerine izin verir.",
		dateEditorOffsetRange: "DisplayTimeOffset seçeneği -720 ile 840 arasında olmalıdır; bu, en batıdan (-12: 00) en doğuya (+14: 00) kadar tüm saat dilimlerinin UTC'ye göre dakika cinsinden farkını temsil eder.",
		setOptionError: 'Aşağıdaki seçenek için çalışma zamanı değişikliklerine izin verilmez: ',
		invalidDate: "Geçersiz tarih",
		maskMessage: 'Gerekli tüm pozisyonlar doldurulmalıdır',
		maskRevertMessage: 'Gerekli tüm pozisyonlar doldurulmalıdır, bu nedenle değer son geçerli olana döndürülmüştür.',
		dateMessage: 'Geçerli bir tarih girilmelidir',
		centuryThresholdValidValues: "CenturyThreshold özelliği 0 ile 99 arasında olmalıdır.",
		noListItemsNoButton: "Liste öğesi olmadığından döndürme veya açılır düğme oluşturulmaz.",
		decimalNumber: "DataMode '{0}' olduğunda, {1} seçeneği 0 ile {2} arasındaki sayısal değerleri kabul edebilir.",
		decimalSeparatorErrorMsg: "DecimalSeparator seçeneği farklı bir değer gerektirir. Değeri tek bir karakter olmalıdır.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "GroupSeparator ve decimalSeparator seçenekleri eşit değerlere sahip olamaz.",
		timePickerNoSuchMethod: "Zaman seçici bu yöntemi desteklemiyor."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.tr.Editor;
	return $.ig.locale.tr.Editor;
}));// REMOVE_FROM_COMBINED_FILES
