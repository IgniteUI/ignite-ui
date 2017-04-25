/* Korea +*/

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
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['ko'] = {
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['1월','2월','3월','4월','5월','6월',
			'7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월',
			'7월','8월','9월','10월','11월','12월'],
			dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			weekHeader: 'Wk',
			dateFormat: 'yy-mm-dd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '년'
		};
    }
    $.ig.regional.ko = {
	    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	    am: '오전',
	    pm: '오후',
	    datePattern: 'yyyy-MM-dd',
	    dateLongPattern: 'yyyy MM dd dddd',
	    dateTimePattern: 'yyyy-MM-dd tt hh:mm',
	    timePattern: 'tt hh:mm',
	    timeLongPattern: 'tt hh:mm:ss',
	    //
	    numericMaxDecimals: 2,
	    currencyNegativePattern: '-$n',
	    currencySymbol: '₩',
	    currencyMaxDecimals: 0,
	    currencyMinDecimals: 0,
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('ko');
    }
}));// REMOVE_FROM_COMBINED_FILES
