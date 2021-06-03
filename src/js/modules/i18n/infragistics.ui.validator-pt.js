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
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.Validator = {
		        defaultMessage: 'Este campo precisa de atenção',
		        selectMessage: 'Um valor deve ser selecionado',
		        rangeSelectMessage: 'Pelo menos {0}, mas não mais que {1} itens devem ser selecionados',
		        minSelectMessage: 'Pelo menos {0} item (s) devem ser selecionados',
		        maxSelectMessage: 'Não devem ser selecionados mais que {0} item (s)',
		        rangeLengthMessage: 'A entrada deve ter entre {0} e {1} caracteres',
		        minLengthMessage: 'A entrada deve ter pelo menos {0} caracteres',
		        maxLengthMessage: 'A entrada não deve ter mais de {0} caracteres',
		        requiredMessage: 'Este campo é obrigatório',
		        patternMessage: 'A entrada não corresponde ao padrão necessário',
		        maskMessage: 'Todas as posições necessárias devem ser preenchidas',
		        dateFieldsMessage: 'Os valores do campo de data devem ser introduzidos',
		        invalidDayMessage: 'Deve ser inserido um dia válido do mês',
		        dateMessage: 'Deverá ser introduzida uma data válida',
		        numberMessage: 'Um número válido deve ser inserido',
		        rangeValueMessage: 'Um valor entre {0} e {1} deve ser inserido',
		        minValueMessage: 'Um valor de pelo menos {0} deve ser inserido',
		        maxValueMessage: 'Um valor não superior a {0} deve ser introduzido',
		        emailMessage: 'Deve ser introduzido um endereço de e-mail válido',
		        creditCardMessage: 'Deve ser introduzido o número de um cartão de pagamento válido',
		        equalToMessage: 'Os dois valores não correspondem',
		        optionalString: '(opcional)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.pt.Validator;
	return $.ig.locale.pt.Validator;
}));// REMOVE_FROM_COMBINED_FILES
