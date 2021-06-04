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
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.Editor = {
		spinUpperTitle: 'Incremento',
		spinLowerTitle: 'Decremento',
		buttonTitle: 'Mostrar lista',
		clearTitle: 'Limpar valor',
		ariaTextEditorFieldLabel: 'Editor de texto',
		ariaNumericEditorFieldLabel: 'Editor numérico',
		ariaCurrencyEditorFieldLabel: 'Editor de moeda',
		ariaPercentEditorFieldLabel: 'Editor de percentagem',
		ariaMaskEditorFieldLabel: 'Editor de máscaras',
		ariaDateEditorFieldLabel: 'Editor de data',
		ariaDatePickerFieldLabel: 'Seletor de data',
		ariaTimePickerFieldLabel: "Seletor de tempo",
		ariaSpinUpButton: 'Girar para cima',
		ariaSpinDownButton: 'Girar para baixo',
		ariaDropDownButton: 'Pendente',
		ariaClearButton: 'Limpar',
		ariaCalendarButton: 'Calendário',
		datePickerButtonTitle: 'Mostrar calendário',
		updateModeUnsupportedValue: 'updateMode requer uma configuração diferente. Escolha um valor entre "onChange" e "immediate".',
		updateModeNotSupported: 'A propriedade modoDeAtualização suporta apenas o modo "onChange" para as extensões igMaskEditor, igDateEditor e igDatePicker',
		renderErrMsg: "Um editor de base não pode ser instanciado diretamente. Tente com um texto, numérico, data ou outro editor.",
		multilineErrMsg: 'textArea requer uma configuração diferente. O textMode deve ser definido como "multiline".',
		targetNotSupported: "Este elemento de destino não é suportado.",
		placeHolderNotSupported: "O atributo marcador de posição não é suportado pelo seu navegador.",
		allowedValuesMsg: "Escolha um valor na lista pendente",
		maxLengthErrMsg: "A entrada é demasiado longa e foi cortada para {0} símbolos",
		maxLengthWarningMsg: "A entrada atingiu o comprimento máximo de {0} para este campo",
		minLengthErrMsg: "Devem ser introduzidos pelo menos {0} caracteres",
		maxValErrMsg: "A entrada atingiu o valor máximo de {0} para este campo",
		minValErrMsg: "A entrada atingiu o valor mínimo de {0} para este campo",
		maxValExceedRevertErrMsg: "A entrada excedeu o valor máximo de {0} e foi revertida para a anterior",
		minValExceedRevertErrMsg: "A entrada era inferior ao valor mínimo de {0} e foi revertida para a anterior",
		maxValExceedSetErrMsg: "A entrada excedeu o valor máximo de {0} e foi definida para o valor máximo",
		minValExceedSetErrMsg: "A entrada foi inferior ao valor mínimo de {0} e foi definida para o valor mínimo",
		maxValExceededWrappedAroundErrMsg: "A entrada excedeu o valor máximo de {0} e foi definida para o valor mínimo permitido",
		minValExceededWrappedAroundErrMsg: "A entrada foi inferior ao valor mínimo de {0} e foi definida para o valor máximo permitido",
		btnValueNotSupported: 'É necessário um valor do botão diferente. Escolha um valor entre "dropdown", "clear" e "spin".',
		scientificFormatErrMsg: 'É necessário um scientificFormat diferente. Escolha um valor entre "E", "e", "E+" e "e+".',
		spinDeltaIsOfTypeNumber: "É necessário um tipo diferente de spinDelta. Um número positivo deve ser inserido.",
		spinDeltaIsOfTypeNumberForPeriod: "É necessário um tipo diferente de spinDelta para {0}. Um número positivo entre {1} e {2} deve ser inserido.",
		spinDeltaIsOfTypeNumberOrObject: "É necessário um tipo diferente de spinDelta. Um número positivo ou um objeto, que defina diferentes deltas de tempo, deve ser inserido.",
		spinDeltaShouldBeInRange: "A opção spinDelta para {0} deve estar entre {1} e {2}",
		spinDeltaCouldntBeNegative: "A opção spinDelta não pode ser negativa. Um número positivo deve ser inserido.",
		spinDeltaContainsExceedsMaxDecimals: "As frações máximas permitidas para spinDelta estão definidas para {0}. Altere MaxDecimals ou tente reduzir o seu valor.",
		spinDeltaIncorrectFloatingPoint: 'Um spinDelta de vírgula flutuante requer uma configuração diferente. Defina o dataMode do editor como "double" ou "float" ou defina spinDelta como número inteiro.',
		numericEditorNoSuchMethod: "O editor numérico não suporta este método.",
		numericEditorNoSuchOption: "O editor numérico não suporta esta opção.",
		displayFactorIsOfTypeNumber: "O displayFactor requer um valor diferente. O seu valor deve ser definido como 1 ou 100 como um número.",
		displayFactorAllowedValue: "O displayFactor requer um valor diferente. O seu valor deve ser definido como 1 ou 100 como um número.",
		instantiateCheckBoxErrMsg: "O igCheckboxEditor requer um valor diferente. Use o elemento INPUT, SPAN ou DIV.",
		cannotParseNonBoolValue: "O igCheckboxEditor requer um valor diferente. Um valor booleano deve ser fornecido.",
		cannotSetNonBoolValue: "O igCheckboxEditor requer um valor diferente. Um valor booleano deve ser fornecido.",
		maskEditorNoSuchMethod: "O editor de máscaras não suporta este método.",
		datePickerEditorNoSuchMethod: "O editor de data não suporta este método.",
		datePickerNoSuchMethodDropDownContainer: "O editor de data não suporta este método. Use antes 'getCalendar'.",
		buttonTypeIsDropDownOnly: "O seletor de data permite apenas valores pendentes e de limpeza para a opção buttonType.",
		dateEditorOffsetRange: "A opção displayTimeOffset deve estar entre -720 e 840, o que representa o desfasamento em minutos, de acordo com o UTC, de todos os fusos horários, do oeste (-12:00) ao leste (+14:00).",
		setOptionError: 'As alterações ao tempo de execução não são permitidas para a seguinte opção: ',
		invalidDate: "Data inválida",
		maskMessage: 'Todas as posições necessárias devem ser preenchidas',
		maskRevertMessage: 'Todas as posições necessárias devem ser preenchidas, por isso o valor foi revertido para a última válida.',
		dateMessage: 'Deverá ser introduzida uma data válida',
		centuryThresholdValidValues: "A propriedade centuryThreshold deve estar entre 0 e 99.",
		noListItemsNoButton: "Nenhum botão giratório ou pendente é composto porque não há itens de lista.",
		decimalNumber: "Quando dataMode é '{0}', a opção {1} pode aceitar valores numéricos entre 0 e {2}.",
		decimalSeparatorErrorMsg: "A opção decimalSeparator requer um valor diferente. O seu valor deve ser um único carácter.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "As opções groupSeparator e decimalSeparator não podem ter valores iguais.",
		timePickerNoSuchMethod: "O seletor de tempo não suporta este método."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.pt.Editor;
	return $.ig.locale.pt.Editor;
}));// REMOVE_FROM_COMBINED_FILES
