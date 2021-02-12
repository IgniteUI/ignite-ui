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
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};

	$.ig.locale['zh-Hant'].Editor = {
		spinUpperTitle: '增量',
		spinLowerTitle: '減少',
		buttonTitle: '顯示清單',
		clearTitle: '清除值',
		ariaTextEditorFieldLabel: '文字編輯器',
		ariaNumericEditorFieldLabel: '數值編輯器',
		ariaCurrencyEditorFieldLabel: '貨幣編輯器',
		ariaPercentEditorFieldLabel: '百分比編輯器',
		ariaMaskEditorFieldLabel: '遮罩編輯器',
		ariaDateEditorFieldLabel: '日期編輯器',
		ariaDatePickerFieldLabel: '日期選擇器',
		ariaTimePickerFieldLabel: "時間選擇器",
		ariaSpinUpButton: '旋轉',
		ariaSpinDownButton: '調低速度',
		ariaDropDownButton: '下拉',
		ariaClearButton: '清除',
		ariaCalendarButton: '行事曆',
		datePickerButtonTitle: '顯示日曆',
		updateModeUnsupportedValue: 'updateMode 需要不同的設定。在 "onChange" 和 "immediate" 之間選擇一個值。',
		updateModeNotSupported: 'updateMode 屬性僅支援 igMaskEditor，igDateEditor 和 igDatePicker 擴展的 "onchange" 模式',
		renderErrMsg: "基本編輯器無法直接實例化。嘗試使用文字，數字，日期或其他編輯器。",
		multilineErrMsg: 'textArea 需要不同的設定。應將 textMode 設定為"多行"。',
		targetNotSupported: "不支援此目標元素。",
		placeHolderNotSupported: "您的瀏覽器不支援預留位置屬性。",
		allowedValuesMsg: "從下拉式選單中選擇一個值",
		maxLengthErrMsg: "輸入內容太長，已被剪裁為 {0} 個符號",
		maxLengthWarningMsg: "此欄位的輸入項已達到最大長度 {0}",
		minLengthErrMsg: "至少應輸入 {0} 個字元",
		maxValErrMsg: "此欄位的輸入項已達到最大值 {0}",
		minValErrMsg: "此欄位的輸入項已達到最小值 {0}",
		maxValExceedRevertErrMsg: "輸入項超過最大值 {0}，並已還原至上一個",
		minValExceedRevertErrMsg: "輸入項小於最小值 {0}，並已還原至上一個",
		maxValExceedSetErrMsg: "輸入項超過最大值 {0}，並已設定為最大值",
		minValExceedSetErrMsg: "輸入項小於最小值 {0}，並已設定為最小值",
		maxValExceededWrappedAroundErrMsg: "輸入項超過最大值 {0}，並已設定為允許的最小值",
		minValExceededWrappedAroundErrMsg: "輸入項小於最小值 {0}，且已設為允許的最大值",
		btnValueNotSupported: '需要不同的按鈕值。在 "dropdown"，"clear" 和 "spin" 之間選擇一個值。',
		scientificFormatErrMsg: '需要不同的科學格式。在 "E"，"e"，"E+" 和 "e+" 之間選擇一個值。',
		spinDeltaIsOfTypeNumber: "需要其他類型的 spinDelta。應輸入正數。",
		spinDeltaIsOfTypeNumberForPeriod: "{0} 需要不同類型的 spinDelta。應輸入 {1} 和 {2} 之間的正數。",
		spinDeltaIsOfTypeNumberOrObject: "需要其他類型的 spinDelta。輸入正數或定義不同時間段變化量的物件。",
		spinDeltaShouldBeInRange: "{0} 的 spinDelta 選項應介於 {1} 和 {2} 之間",
		spinDeltaCouldntBeNegative: "spinDelta 選項不得為負數。應輸入正數。",
		spinDeltaContainsExceedsMaxDecimals: "spinDelta 的最大允許分數設定為 {0}。更改 MaxDecimals 或嘗試縮小您的值。",
		spinDeltaIncorrectFloatingPoint: '浮點 spinDelta 需要不同的設定。將編輯器的 dataMode 設定為 "double" 或 "float"，或將 spinDelta 設定為 integer。',
		numericEditorNoSuchMethod: "數值編輯器不支援此方法。",
		numericEditorNoSuchOption: "數值編輯器不支援此選項。",
		displayFactorIsOfTypeNumber: "displayFactor 需要不同的值。其數值應設為 1 或 100。",
		displayFactorAllowedValue: "displayFactor 需要不同的值。其數值應設為 1 或 100。",
		instantiateCheckBoxErrMsg: "igCheckboxEditor 需要其他元素。使用INPUT，SPAN 或 DIV 元素。",
		cannotParseNonBoolValue: "igCheckboxEditor 需要不同的值。應該提供一個布林值。",
		cannotSetNonBoolValue: "igCheckboxEditor 需要不同的值。應該提供一個布林值。",
		maskEditorNoSuchMethod: "遮罩編輯器不支援此方法。",
		datePickerEditorNoSuchMethod: "日期編輯器不支援此方法。",
		datePickerNoSuchMethodDropDownContainer: "日期編輯器不支援此方法。請改用 'getCalendar'。",
		buttonTypeIsDropDownOnly: "Datepicker 僅允許下拉和清除 buttonType 選項的值。",
		dateEditorOffsetRange: "displayTimeOffset 選項的取值範圍應在 -720 至 840 之間，根據 UTC，以分鐘為單位，表示從最西端 (-12:00) 到最東端 (+14:00) 的所有時區的偏移量。",
		setOptionError: '以下選項不允許執行階段變更: ',
		invalidDate: "無效日期",
		maskMessage: '所有必填位置均應填寫',
		maskRevertMessage: '所有必要的位置都應填滿，這就是為什麼該值恢復到最後一個有效位置的原因。',
		dateMessage: '必須輸入有效日期',
		centuryThresholdValidValues: "CenturyThreshold 屬性應介於 0 和 99 之間。",
		noListItemsNoButton: "由於沒有清單項，因此未顯示旋轉或下拉按鈕。",
		decimalNumber: "當 dataMode 為 ‘{0}’ 時，{1} 選項可以接受 0 到 {2} 之間的數值。",
		decimalSeparatorErrorMsg: "小數點分隔符選項需要不同的值。其值應為單個字元。",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "groupSeparator 和 decimalSeparator 選項的值不能相等。",
		timePickerNoSuchMethod: "時間選擇器不支援此方法。"
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale['zh-Hant'].Editor;
	return $.ig.locale['zh-Hant'].Editor;
}));// REMOVE_FROM_COMBINED_FILES
