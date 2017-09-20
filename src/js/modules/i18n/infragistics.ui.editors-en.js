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
				spinUpperTitle: 'Increment',
				spinLowerTitle: 'Decrement',
				buttonTitle: 'Show list',
				clearTitle: 'Clear value',
				ariaTextEditorFieldLabel: 'Text Editor',
				ariaNumericEditorFieldLabel: 'Numeric Editor',
				ariaCurrencyEditorFieldLabel: 'Currency Editor',
				ariaPercentEditorFieldLabel: 'Percent Editor',
				ariaMaskEditorFieldLabel: 'Mask Editor',
				ariaDateEditorFieldLabel: 'Date Editor',
				ariaDatePickerFieldLabel: 'Date Picker',
				ariaSpinUpButton: 'Spin up',
				ariaSpinDownButton: 'Spin down',
				ariaDropDownButton: 'Drop down',
				ariaClearButton: 'Clear',
				ariaCalendarButton: 'Calendar',
				datePickerButtonTitle: 'Show calendar',
				updateModeUnsupportedValue: 'updateMode requires a different configuration. Choose a value between "onChange" and "immediate".',
				updateModeNotSupported: 'updateMode property supports only "onchange" mode for igMaskEditor, igDateEditor and igDatePicker extensions',
				renderErrMsg: "A base editor cannot be instantiated directly. Try with a text, numeric, date, or other editor.",
				multilineErrMsg: 'textArea requires a different configuration. The textMode should be set to "multiline".',
				targetNotSupported: "This target element is not supported.",
				placeHolderNotSupported: "The placeholder attribute is not supported by your browser.",
				allowedValuesMsg: "Pick a value from the drop-down list",
				maxLengthErrMsg: "Entry is too long and was trimmed to {0} symbols",
				maxLengthWarningMsg: "Entry reached the maximum length of {0} for this field",
				minLengthErrMsg: "At least {0} characters should be entered",
				maxValErrMsg: "Entry reached the maximum value of {0} for this field",
				minValErrMsg: "Entry reached the minimum value of {0} for this field",
				maxValExceedRevertErrMsg: "Entry exceeded the maximum value of {0} and was reverted to previous one",
				minValExceedRevertErrMsg: "Entry was less than the minimum value of {0} and was reverted to previous one",
				maxValExceedSetErrMsg: "Entry exceeded the maximum value of {0} and was set to the maximum value",
				minValExceedSetErrMsg: "Entry exceeded the minimum value of {0} and was set to the minimum value",
				maxValExceededWrappedAroundErrMsg: "Entry exceeded the maximum value of {0} and was set to the minimum allowed one",
				minValExceededWrappedAroundErrMsg: "Entry was less than the minimum value of {0} and was set to the maximum allowed one",
				btnValueNotSupported: 'A different button value is required. Choose a value between "dropdown", "clear" and "spin".',
				scientificFormatErrMsg: 'A different scientificFormat is required. Choose a value between "E", "e", "E+" and "e+".',
				spinDeltaIsOfTypeNumber: "A different type of spinDelta is required. A positive number should be entered.",
				spinDeltaCouldntBeNegative: "The spinDelta option cannot be negative. A positive number should be entered.",
				spinDeltaContainsExceedsMaxDecimals: "Maximum allowed fractions for spinDelta are set to {0}. Either change MaxDecimals or try to shrink your value.",
				spinDeltaIncorrectFloatingPoint: 'A floating point spinDelta requires a different configuration. Set the dataMode of the editor to either "double" or "float" or set spinDelta to integer.',
				numericEditorNoSuchMethod: "The numeric editor does not support this method.",
				numericEditorNoSuchOption: "The numeric editor does not support this option.",
				displayFactorIsOfTypeNumber: "displayFactor requires a different value. Its value should be set to 1 or 100 as a number.",
				displayFactorAllowedValue: "displayFactor requires a different value. Its value should be set to 1 or 100 as a number.",
				instantiateCheckBoxErrMsg: "igCheckboxEditor requires a different element. Use INPUT, SPAN or DIV element.",
				cannotParseNonBoolValue: "igCheckboxEditor requires a different value. A boolean value should be provided.",
				cannotSetNonBoolValue: "igCheckboxEditor requires a different value. A boolean value should be provided.",
				maskEditorNoSuchMethod: "The mask editor does not support this method.",
				datePickerEditorNoSuchMethod: "The date editor does not support this method.",
				datePickerNoSuchMethodDropDownContainer: "The date editor does not support this method. Use 'getCalendar' one instead.",
				buttonTypeIsDropDownOnly: "Datepicker allows only dropdown and clear values for the buttonType option.",
				setOptionError: 'Runtime changes are not allowed for the following option: ',
				invalidDate: "Invalid date",
				maskMessage: 'All required positions should be filled',
				maskRevertMessage: 'All required positions should be filled, that is why the value was reverted to the last valid one.',
				dateMessage: 'A valid date should be entered',
				centuryThresholdValidValues: "centuryThreshold property shoud be between 0 and 99. The value has been reverted to defaults.",
				noListItemsNoButton: "No spin or dropdown button is rendered because there are no listitems."
			}
		};
	}
}));// REMOVE_FROM_COMBINED_FILES
