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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Validator) {
	    $.ig.Validator = {
		    locale: {
		        defaultMessage: 'Обърнете внимание на това поле',
		        selectMessage: 'Трябва да бъде избрана стойност.',
		        rangeSelectMessage: 'Поне {0}, но не повече от {1} е елемента трябва да бъдат избрани.',
		        minSelectMessage: 'Поне {0} елемента трябва да бъдат избрани.',
		        maxSelectMessage: 'Не повече от {0} трябва да бъдат избрани',
		        rangeLengthMessage: 'Входните данни трябва да са дълги между {0} и {1} знака',
		        minLengthMessage: 'Входните данни трябва да са дълги поне {0} знака.',
		        maxLengthMessage: 'Входните данни не трябва да са дълги повече от {0} знака.',
			    requiredMessage: 'Това поле е задължително',
			    patternMessage: 'Въведените данни не спазват зададения образец.',
			    maskMessage: 'Всички задължителни позиции трябва да бъдат попълнени.',
			    dateFieldsMessage: 'Трябва да бъдат въведени стойности от полето за дата',
			    invalidDayMessage: 'Трябва да бъде въведен валиден ден от месеца.',
			    dateMessage: 'Трябва да бъде въведена валидна дата.',
			    numberMessage: 'Трябва да бъде въведено валидно число.',
			    rangeValueMessage: 'Моля попълнете стойност между {0} и {1}',
			    minValueMessage: 'Моля попълнете стойност по-голяма или равна на {0}',
			    maxValueMessage: 'Моля попълнете стойност по-малка или равна на {0}',
			    emailMessage: 'Трябва да бъде въведен валиден имейл адрес.',
		        creditCardMessage: 'Трябва да бъде въведен валиден номер на банкова карта.',
			    equalToMessage: 'Двете стойности не съвпадат.',
			    optionalString: '(незадължително)'
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
