/*!@license
 * Infragistics.Web.ClientUI Util functions <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * util functions that extend the jQuery  namespace
 * if something is not already available in jQuery, please add it here.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 * jquery-1.9.1.js
 * modernizr.js (Optional)
 * infragistics.util.js
 *
 */
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.ig = (window.$ && window.$.ig) || $.ig || { _isNamespace: true };
	window.$ig = window.$ig || $.ig;

	$.fn.startsWith = function (str) {
		return this[ 0 ].innerHTML.indexOf(str) === 0;
	};

	$.ig.extendNativePrototype(Array.prototype, "clone", function () {
		return $.extend(true, [], this);
	});

	$.ajaxQueue = function (queueName, options) {
		var callback;

		//        var s = $("#status");
		//        s.html(options.url + "<br />" + s.html());

		if (typeof document.ajaxQueue === "undefined") {
			document.ajaxQueue = { queue: {} };
		}
		if (typeof document.ajaxQueue.queue[ queueName ] === "undefined") {
			document.ajaxQueue.queue[ queueName ] = [];
		}

		if (typeof options === "undefined") {
			return;
		}

		callback = options.complete; //original callback

		//overwrite complete
		options.complete = function (request, status) {
			document.ajaxQueue.queue[ queueName ].shift(); //remove the first element from the array
			//we should check if original callbak is defined in options
			if (typeof callback !== "undefined") {
				callback(request, status);
			}

			if (document.ajaxQueue.queue[ queueName ].length > 0) {
				$.ajax(document.ajaxQueue.queue[ queueName ][ 0 ]);
			}
		};

		document.ajaxQueue.queue[ queueName ].push(options);
		if (document.ajaxQueue.queue[ queueName ].length === 1) {
			$.ajax(document.ajaxQueue.queue[ queueName ][ 0 ]);
		}
	};

	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	if (!Object.keys) {
		Object.keys = (function () {
			"use strict";
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({ toString: null }).propertyIsEnumerable("toString"),
				dontEnums = [
					"toString",
					"toLocaleString",
					"valueOf",
					"hasOwnProperty",
					"isPrototypeOf",
					"propertyIsEnumerable",
					"constructor"
				],
				dontEnumsLength = dontEnums.length;
			return function (obj) {
				if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
					throw new TypeError("Object.keys called on non-object");
				}
				var result = [], prop, i;
				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}
				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[ i ])) {
							result.push(dontEnums[ i ]);
						}
					}
				}
				return result;
			};
		}());
	}

	//checkbox markup classes can be changed
	//and setting them in a a box can be done by the predefined classes "ui-state-default ui-corner-all ui-igcheckbox-small"
	$.ig.checkboxMarkupClasses = "";
	$.ig.getRegionalOptions = function (reg) {
		if (!reg) {
			return $.ig.regional.defaults || {};
		}
		return (($.type(reg) === "string") ?
			$.ig.regional[ reg ] : reg) || {};
	};
	$.ig.getRegionalValue = function (key, reg) {
		reg = $.ig.getRegionalOptions(reg);
		var value = reg[ key ];
		return (value === undefined) ? $.ig.regional.defaults[ key ] : value;
	};

	$.ig.encode = function (value) {
		/* Encode string.
			paramType="string" The string to be encoded.
			returnType="string" Returns the encoded string.
		*/
		return value !== null && value !== undefined ?
			value.toString()
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/'/g, "&#39;")
			.replace(/"/g, "&#34;") : "";
	};

	$.ig.millisecondsToString = function(milliseconds, flag) {
		var result = parseInt(milliseconds / Math.pow(10, flag.length - 1)).toString();
			if (flag === "ff") {
				if (result.length !== 2) {
					while (result.length < 2) {
						result = "0" + result;
					}
				}
			} else if (flag === "f") {
				if (result.length !== 3) {
					while (result.length < 3) {
						result = "0" + result;
					}
				}
			}
			return result;
	};

	// Flag values are dddd, ddd, dd, d - according to the
	$.ig.secondsToString = function (seconds, flag) {
		var result;
		if (flag === "ss" && seconds < 10) {
			result = "0" + seconds.toString();
		} else {
			result = seconds.toString();
		}
		return result;
	};

	$.ig.minutesToString = function (minutes, flag) {
		var result;
		if (flag === "mm" && minutes < 10) {
			result = "0" + minutes.toString();
		} else {
			result = minutes.toString();
		}
		return result;
	};

	// Get before midday, or after middday
	$.ig.amPmToString = function (hours, flag, regional) {
		var result;
		if (hours >= 12) {

			// pm
			result = $.ig.getRegionalValue("pm", regional);
		} else {
			result = $.ig.getRegionalValue("am", regional);
		}
		if (flag === "t") {
			result = result.charAt(0);
		}
		return result;
	};

	$.ig.hoursToString = function (hours, flag) {
		var result;
		switch (flag) {
			case "h":
				if (hours > 12) {
					hours -= 12;
				}

				// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
				if (hours === 0) {
					hours = 12;
				}
				result = hours.toString();
				break;
			case "hh":
				if (hours > 12) {
					hours -= 12;
				}

				// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
				if (hours === 0) {
					hours = 12;
				}
				if (hours < 10) {
					result = "0" + hours.toString();
				} else {
					result = hours.toString();
				}
				break;
			case "H":
				result = hours.toString();
				break;
			case "HH":
				/* falls through */
			default:
				if (hours < 10) {
					result = "0" + hours.toString();
				} else {
					result = hours.toString();
				}
				break;
		}
		return result;
	};

	$.ig.dateToString = function (date, flag) {
		var result;
		switch (flag) {
			case "dd":
				if (date < 10) {
					result = "0" + date.toString();
				} else {
					result = date;
				}
				break;
			case "d":
				/* falls through */
			default:
				result = date.toString();
				break;
		}
		return result;
	};

	$.ig.dayToString = function (day, flag, regional) {
		var result;
		switch (flag) {
			case "dddd":
				result = $.ig.getRegionalValue("dayNames", regional)[ day ];
				break;
			case "ddd":
				/* falls through */
			default:
				result = $.ig.getRegionalValue("dayNamesShort", regional)[ day ];
				break;
		}
		return result;
	};

	$.ig.monthToString = function (month, flag, regional) {
		var result;
		switch (flag) {
			case "MMMM":
				result = $.ig.getRegionalValue("monthNames", regional)[ month ];
				break;
			case "MMM":
				result = $.ig.getRegionalValue("monthNamesShort", regional)[ month ];
				break;
			case "M":
				month++;
				result = month.toString();
				break;
			case "MM":
				/* falls through */
			default:
				month++;
				if (month < 10) {
					result = "0" + month.toString();
				} else {
					result = month;
				}
				break;
		}
		return result;
	};

	$.ig.yearToString = function (year, flag) {
		var result;
		if (flag === "yy") {
			result = year.toString().substring(2);
		} else if (flag === "y") {
			result = parseInt(year.toString().substring(2)).toString();
		} else {
			result = year.toString();
		}
		return result;
	};

	$.ig.formatCheckboxes = function (display, val, labelText, tabIndex) {
		var s;
		/* P.Zh. 11 August 2017 - Fixing bug #238125 When headerText contains HTML string the column cell data is broken (contains escaped html) */
		labelText = $.ig.encode(labelText);
		s = "<span class='ui-igcheckbox-container' style='display:" +
			display + ";' role='checkbox' aria-disabled='true' aria-checked='" +
			val + "' aria-label='" + labelText + "' tabindex='" + tabIndex + "'>";
		s += "<span class='" + $.ig.checkboxMarkupClasses + "' style='display:inline-block'>";
		s += "<span style='display:block' class='" + (val ? "" : "ui-igcheckbox-small-off ");
		return s + "ui-icon ui-icon-check ui-igcheckbox-small-on'></span></span></span>";
	};

	$.ig.formatDate = function (mask, date, regional) {
		mask = mask.replace(/\x08/g, " ").replace(/\x09/g, " ");
		mask = mask.replace(/\\f/g, "\x01").replace(/\\d/g, "\x02")
			.replace(/\\s/g, "\x03").replace(/\\m/g, "\x04").replace(/\\t/g, "\x05")
			.replace(/\\H/g, "\x06").replace(/\\h/g, "\x07").replace(/\\M/g, "\x08")
			.replace(/\\y/g, "\x09");

		// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
		// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
		// 20-ddd,21-dddd,22-f,23-ff,24-fff
		// Temporary remove 0 and 9, as they are valid mask flags
		// mask = mask.replace(/9/g, "\x11").replace(/0/g, "\x12");

		// Mark all flags as hexadecimal
		mask = mask.replace(/fff/g, "\x10030")
			.replace(/ff/g, "\x10031")
			.replace(/f/g, "\x10032");

		mask = mask.replace(/dddd/g, "\x10033")
			.replace(/ddd/g, "\x10034")
			.replace(/dd/g, "\x10035")
			.replace(/d/g, "\x10036")
			.replace(/ss/g, "\x10037")
			.replace(/s/g, "\x10038")
			.replace(/mm/g, "\x10039")
			.replace(/m/g, "\x10040");
		mask = mask.replace(/tt/g, "\x10041")
			.replace(/t/g, "\x10042")
			.replace(/HH/g, "\x10043")
			.replace(/H/g, "\x10044")
			.replace(/hh/g, "\x10045")
			.replace(/h/g, "\x10046");
		mask = mask.replace(/MMMM/g, "\x10047")
			.replace(/MMM/g, "\x10048")
			.replace(/MM/g, "\x10049")
			.replace(/M/g, "\x10050");
		mask = mask.replace(/yyyy/g, "\x10051")
			.replace(/yy/g, "\x10052")
			.replace(/y/g, "\x10053");

		mask = mask.replace(/\x10030/g, $.ig.millisecondsToString(date.getMilliseconds(), "f"))
			.replace(/\x10031/g, $.ig.millisecondsToString(date.getMilliseconds(), "ff"))
			.replace(/\x10032/g, $.ig.millisecondsToString(date.getMilliseconds(), "fff"));

		mask = mask.replace(/\x10033/g, $.ig.dayToString(date.getDay(), "dddd", regional))
			.replace(/\x10034/g, $.ig.dayToString(date.getDay(), "ddd", regional))
			.replace(/\x10035/g, $.ig.dateToString(date.getDate(), "dd"))
			.replace(/\x10036/g, $.ig.dateToString(date.getDate(), "d"))
			.replace(/\x10037/g, $.ig.secondsToString(date.getSeconds(), "ss"))
			.replace(/\x10038/g, $.ig.secondsToString(date.getSeconds(), "s"))
			.replace(/\x10039/g, $.ig.minutesToString(date.getMinutes(), "mm"))
			.replace(/\x10040/g, $.ig.minutesToString(date.getMinutes(), "m"))

			.replace(/\x10041/g, $.ig.amPmToString(date.getHours(), "tt", regional))
			.replace(/\x10042/g, $.ig.amPmToString(date.getHours(), "t", regional))
			.replace(/\x10043/g, $.ig.hoursToString(date.getHours(), "HH"))
			.replace(/\x10044/g, $.ig.hoursToString(date.getHours(), "H"))
			.replace(/\x10045/g, $.ig.hoursToString(date.getHours(), "hh"))
			.replace(/\x10046/g, $.ig.hoursToString(date.getHours(), "h"));

		mask = mask.replace(/\x10047/g, $.ig.monthToString(date.getMonth(), "MMMM", regional))
			.replace(/\x10048/g, $.ig.monthToString(date.getMonth(), "MMM", regional))
			.replace(/\x10049/g, $.ig.monthToString(date.getMonth(), "MM", regional))
			.replace(/\x10050/g, $.ig.monthToString(date.getMonth(), "M", regional));

		mask = mask.replace(/\x10051/g, $.ig.yearToString(date.getFullYear(), "yyyy"))
			.replace(/\x10052/g, $.ig.yearToString(date.getFullYear(), "yy"))
			.replace(/\x10053/g, $.ig.yearToString(date.getFullYear(), "y"));

		// Restore original \\f,d,s,m,etc.
		mask = mask.replace(/\x01/g, "g").replace(/\x02/g, "d").replace(/\x03/g, "s")
			.replace(/\x04/g, "m").replace(/\x05/g, "t").replace(/\x06/g, "H")
			.replace(/\x07/g, "h").replace(/\x08/g, "M").replace(/\x09/g, "y");

		return mask;
	};

	$.ig.formatDates = function (val, d, format, enableUTCDates, dateOffset, reg) {
		var min, y, h, m, s, ms, am, day, pattern;
		if (!val) {
			return "&nbsp;";
		}
		if (!d) {
			return val;
		}
		pattern = $.ig.getRegionalValue((format && format !== "null" && format !== "undefined") ?
			format + "Pattern" : "datePattern", reg) || format;
		if (dateOffset !== undefined && dateOffset !== null) {
			val = new Date(val.getTime() + dateOffset);
		}
		if (enableUTCDates || (dateOffset !== undefined && dateOffset !== null)) {
			y = val.getUTCFullYear();
			m = val.getUTCMonth() + 1;
			d = val.getUTCDate();
			h = val.getUTCHours();
			min = val.getUTCMinutes();
			s = val.getUTCSeconds();
			ms = val.getUTCMilliseconds();
			day = val.getUTCDay();
		} else {
			y = val.getFullYear();
			m = val.getMonth() + 1;
			d = val.getDate();
			h = val.getHours();
			min = val.getMinutes();
			s = val.getSeconds();
			ms = val.getMilliseconds();
			day = val.getDay();
		}

		// M.P. 25 July 2014: 176543 - $.ig.formatter doesn't work with escaped characters for date formatting
		pattern = pattern.replace(/\\d/g, "\x06").replace(/\\y/g, "\x07").replace(/\\M/g, "\x08")
			.replace(/\\m/g, "\x09").replace(/\\t/g, "\x0A").replace(/\\s/g, "\x0B")
			.replace(/\\f/g, "\x0C").replace(/\\h/g, "\x0D").replace(/\\H/g, "\x0E");

		// remove MMMM, MMM, dddd, ddd, tt, t
		pattern = pattern.replace("MMMM", "\x01").replace("MMM", "\x02").replace("dddd", "\x03")
			.replace("ddd", "\x04");
		if (pattern.indexOf("t") >= 0) {
			am = (h >= 12) ? $.ig.getRegionalValue("pm", reg) : $.ig.getRegionalValue("am", reg);
			am = am || " ";
			if (pattern.indexOf("tt") >= 0) {
				pattern = pattern.replace("tt", "t");
			} else if (am.length > 1) {
				am = am.substring(0, 1);
			}
			pattern = pattern.replace("t", "\x05");
		}
		if (pattern.indexOf("h") >= 0) {
			if (h > 12) {
				h -= 12;
			}

			// M.P. 2 August 2013 - Fix for bug #147778 Incorrect date formatting when 12 hour format is used
			if (h === 0) {
				h = 12;
			}
		}
		pattern = pattern.replace(/H/g, "h");

		// L.A. 23 October 2012 - Fixing bug #125273 Missing leading zeros when using format MM/dd/yyyy for dates before 1000
		pattern = pattern
			.replace("yyyy", y < 10 ? "000" + y : y < 100 ? "00" + y : y < 1000 ? "0" + y : y)
			.replace("yy", ((y = y % 100) < 10) ? "0" + y : y).replace("y", y % 100)
			.replace("MM", (m < 10) ? "0" + m : m).replace("M", m);
		pattern = pattern.replace("dd", (d < 10) ? "0" + d : d).replace("d", d);
		pattern = pattern.replace("hh", (h < 10) ? "0" + h : h).replace("h", h)
			.replace("mm", (min < 10) ? "0" + min : min).replace("m", min)
			.replace("ss", (s < 10) ? "0" + s : s).replace("s", s);
		pattern = pattern.replace("fff", (ms < 10) ? "00" + ms : ((ms < 100) ? "0" + ms : ms))
			.replace("ff", ((ms = Math.round(ms / 10)) < 10) ? "0" + ms : ms)
			.replace("f", Math.round(ms / 100));
		pattern = pattern
			.replace("\x01", $.ig.getRegionalValue("monthNames", reg)[ m - 1 ])
			.replace("\x02", $.ig.getRegionalValue("monthNamesShort", reg)[ m - 1 ])
			.replace("\x05", am);
		pattern = pattern
			.replace("\x03", $.ig.getRegionalValue("dayNames", reg)[ day ])
			.replace("\x04", $.ig.getRegionalValue("dayNamesShort", reg)[ day ]);
		pattern = pattern.replace(/\x06/g, "d").replace(/\x07/g, "y").replace(/\x08/g, "M")
			.replace(/\x09/g, "m").replace(/\x0A/g, "t").replace(/\x0B/g, "s")
			.replace(/\x0C/g, "f").replace("\x0D", "h").replace("\x0E", "H");
		return pattern;
	};

	$.ig.formatNumbers = function (n, val, reg, perc, percS, cur, curS, format, i, d) {
		var prefix, pattern, len, s, min, dot, m, pow, e, gr, gr0, grps;
		if (!n) {
			// N.A. 26 April 2013 - Fixing bug #139790 When regional settings, different from english, are used and the decimal separator is different than "." the value is calculated wrong
			// keep only e, E, -, +, decimal separator and digits
			val = parseFloat(val.replace("(", "-")
				.replace(new RegExp("[^0-9\\-eE\\" +
					$.ig.getRegionalValue("numericDecimalSeparator", reg) + "\\+]", "gm"), "")
				.replace($.ig.getRegionalValue("numericDecimalSeparator", reg), "."));
		}
		if (isNaN(val)) {
			return "&nbsp;";
		}

		// M.H. 27 Oct 2014 Fix for bug #183668: when setting column format to percent the formatted value doesn"t reflect proper math to address decimal placement
		if (perc) {
			val *= 100;
		}
		prefix = cur ? curS : (perc ? percS : "numeric");
		pattern = $.ig.getRegionalValue(
			prefix + ((val < 0) ? "Negative" : "Positive") + "Pattern", reg) ||
			"n";
		len = format ? format.length : 0;

		// calculate maximum number of decimals
		if (len > 0 && ((s = format.charAt(0)) === "0" || s === "#")) {
			min = m = 0;
			dot = format.indexOf(".");
			if (dot > 0) {
				m = len - 1 - dot;
				while (++dot < len) {
					if (format.charAt(dot) !== "0") {
						break;
					}
					min++;
				}
			}
		} else {
			min = $.ig.getRegionalValue(prefix + "MinDecimals", reg) || 0;
			if (d) {
				m = 999;
			} else {
				m = $.ig.getRegionalValue(prefix + "MaxDecimals", reg);
				m = (m && !i) ? m : 0;
			}
		}
		if (val < 0) {
			val = -val;
		}

		// S.S. March 26, 2013 Bug #137025. IE8 and below do not round numbers in toFixed() so we need to round
		// them first before passing them to toFixed()
		// val = (m === 999) ? val.toString(10) : val.toFixed(m);
		if (m === 999) {
			val = val.toString(10);
		} else {
			if ($.ig.util.isIE && $.ig.util.browserVersion <= 8) {
				pow = Math.pow(10, m);
				val = (Math.round(pow * val) / pow).toFixed(m);
			} else {
				val = val.toFixed(m);
			}
		}
		if ((i = val.indexOf("E")) < 0) {
			i = val.indexOf("e");
		}

		// cut-off E-power (e)
		e = "";
		if (i > 0) {
			e = val.substring(i);
			val = val.substring(0, i);
		}
		dot = val.indexOf(".");
		len = val.length;
		i = 0;

		// remove trailing 0s
		while (dot > 0 && m > min + i && val.charAt(len - 1 - i) === "0") {
			i++;
		}
		if (i > 0) {
			val = val.substring(0, len -= i);
		}

		// remove trailing .
		if (dot === len - 1) {
			val = val.substring(0, dot);
		}
		if (dot > 0) {
			len = dot;
		}

		// replace decimal separator
		s = $.ig.getRegionalValue(prefix + "DecimalSeparator", reg);
		if (s) {
			val = val.replace(".", s);
		}

		// insert group separators
		s = $.ig.getRegionalValue(prefix + "GroupSeparator", reg);
		grps = s ? $.ig.getRegionalValue(prefix + "Groups", reg) : "";
		gr = gr0 = (grps.length > 0) ? grps[ i = 0 ] : 0;
		while (gr > 0 && --len > 0) {
			if (--gr === 0) {
				val = val.substring(0, len) + s + val.substring(len);
				gr = grps[ ++i ];
				if (!gr || gr < 1) {
					gr = gr0;
				} else {
					gr0 = gr;
				}
			}
		}

		// replace "n" by number, "$" by symbol and "-" by negative sign
		s = $.ig.getRegionalValue(prefix + "Symbol", reg) || "";
		return pattern
			.replace("-", $.ig.getRegionalValue("negativeSign", reg))
			.replace("n", val + e).replace("$", s);
	};

	$.ig.formatter = function (val, type, format, notTemplate, enableUTCDates, dateOffset,
		displayStyle, labelText, tabIndex, reg) {
		var formatterArgs = arguments[ 0 ];
		if (typeof formatterArgs === "object" && formatterArgs !== null &&
				formatterArgs.hasOwnProperty("val")) {
			val = formatterArgs.val;
			type = formatterArgs.type;
			format = formatterArgs.format;
			notTemplate = formatterArgs.notTemplate;
			enableUTCDates = formatterArgs.enableUTCDates;
			dateOffset = formatterArgs.dateOffset;
			displayStyle = formatterArgs.displayStyle;
			labelText = formatterArgs.labelText;
			tabIndex = formatterArgs.tabIndex;
			reg = formatterArgs.reg;
		}

		var n, curS, percS, cur, perc, i, d = val && val.getTime, s,

			// L.A. 17 October 2012 - Fixing bug #123215 The group rows of a grouped checkbox column are too large
			display = displayStyle || "inline-block";
		if (format === "checkbox" && notTemplate) {
			return $.ig.formatCheckboxes(display, val, labelText, tabIndex);
		}

		if (!val && val !== 0 && val !== false) {
			return "&nbsp;";
		}

		if (type === "date" || d) {
			return $.ig.formatDates(val, d, format, enableUTCDates, dateOffset, reg);
		}

		d = format === "double";
		if (!d) {
			cur = format === (curS = "currency");
			if (!cur) {
				perc = format === (percS = "percent");
				if (!perc) {
					i = format === "int";
				}
			}
		}
		n = typeof val === "number";
		if (d || n || i || cur || perc || type === "number") {
			return $.ig.formatNumbers(n, val, reg, perc, percS, cur, curS, format, i, d);
		}

		if (format) {
			if (format.indexOf(s = "{0}") >= 0) {
				return format.replace(s, val);
			}
			if (format.indexOf(s = "[0]") >= 0) {
				return format.replace(s, val);
			}
		}
		return (val || val === 0) ? val : "&nbsp;";
	};

	// get max zIndex of ui-dialogs - method is usually called by feautures for configuring zIndex of modal dialogs(like filtering, feature chooser, hiding, etc.)
	$.ig.getMaxZIndex = function (id) {
		var maxZ = 10000, thisZ;
		$(".ui-dialog").each(function () {
			if (!id || $(this)[ 0 ].id !== id) {
				thisZ = $(this).css("z-index");
				if (!isNaN(thisZ)) {
					maxZ = Math.max(maxZ, thisZ);
				}
			}
		});
		return maxZ;
	};

	$.ig.getZIndex = function (elem) {
		var position, value;
		while (elem.length && elem[ 0 ] !== document) {
			position = elem.css( "position" );
			if (position === "absolute" || position === "relative" || position === "fixed") {
				value = parseInt( elem.css( "zIndex" ), 10 );
				if ( !isNaN( value ) && value !== 0 ) {
					return value;
				}
			}
			elem = elem.parent();
		}
		return 0;
	};

	// generate unique identifiers
	$.ig.uid = function () {
		return ((1 + Math.random()) * parseInt("10000", 16)).toString(16).substring(1, 5);
	};

	$.ig.getColType = function (o) {
		var t = typeof o;
		if (t === "undefined") {
			return "string";
		} else if (o && o.getTime && !isNaN(o.getTime()) &&
			Object.prototype.toString.call(o) === "[object Date]") {
			return "date";
		} else if (t === "boolean") {
			return "bool";
		} else if (t === "number") {
			return t;
		} else if (t === "object") {
			return "object";
		} else {
			return "string";
		}

	};

	$.ig.toLocalISOString = function (date) {
		var tzo = -date.getTimezoneOffset(),
			dif = tzo >= 0 ? "+" : "-",
			pad = function(num) {
				var norm = Math.abs(Math.floor(num));
				return (norm < 10 ? "0" : "") + norm;
			};
		return date.getFullYear() +
			"-" + pad(date.getMonth() + 1) +
			"-" + pad(date.getDate()) +
			"T" + pad(date.getHours()) +
			":" + pad(date.getMinutes()) +
			":" + pad(date.getSeconds()) +
			dif + pad(tzo / 60) +
			":" + pad(tzo % 60);
	};

	(function ($) {

		$.ig.util.profiler = {};

		var methods = {};

		$.ig.util.profiler.recordTime = function (methodName, time) {
			var key = "meth: " + methodName;
			if (!methods[ key ]) {
				methods[ key ] = [];
			}
			methods[ key ][ methods[ key ].length ] = time;
		};

		$.ig.util.profiler.reset = function () {
			methods = {};
		};

		$.ig.util.profiler.logReport = function () {
			var meths = [];
			var j = 0;
			var sum = 0;
			var avg = 0;
			for (var prop in methods) {
				if (prop.indexOf("meth:") === 0) {
					var meth = {};
					meth.name = prop.substr(5);

					sum = 0;
					for (var i = 0; i < methods[ prop ].length; i++) {
						sum = sum + methods[ prop ][ i ];
					}
					avg = sum / methods[ prop ].length;
					meth.avg = avg;
					meth.callCount = methods[ prop ].length;
					meths[ j ] = meth;
					j++;
				}
			}

			meths.sort(function (m1, m2) {
				if (m1.avg < m2.avg) {
					return 1;
				}
				if (m1.avg > m2.avg) {
					return -1;
				}
				if (m1.avg == m2.avg) {
					return 0;
				}
			});

			for (var k = 0; k < Math.min(200, meths.length) ; k++) {
				console.log(meths[ k ].name + " avg: " + meths[ k ].avg +
					" callCount: " + meths[ k ].callCount);
			}
		};
	})($);

	// N.A. 10/17/2013 - Bug #155039: The property "offset" is deprecated in 1.9.
	$.ig.util.jQueryUIMainVersion = $.ui && $.ui.version &&
		$.ui.version.length > 0 ? parseInt($.ui.version.split(".", 1)[ 0 ], 10) : null;
	$.ig.util.jQueryUISubVersion = $.ui && $.ui.version &&
		$.ui.version.length > 0 ? parseInt($.ui.version.split(".", 2)[ 1 ], 10) : null;

	$.ig.util.jQueryMainVersion = $.fn.jquery &&
		$.fn.jquery.length ? parseInt($.fn.jquery.split(".", 1)[ 0 ], 10) : null;
	$.ig.util.jQuerySubVersion = $.fn.jquery &&
		$.fn.jquery.length ? parseInt($.fn.jquery.split(".", 2)[ 1 ], 10) : null;

	// Ajdusts jQuery.offset in IE10/IE11/Edge.
	// jQuery.offset function calculates the coordinates by using element.getBoundingClientRect()
	// function and adding the page scrolls offests (window.pageXOffset and window.pageYOffset).
	// When zooming in/out the offset is incorrect because window.pageXOffset and
	// window.pageYOffset values increase when the user zooms in/out. They should not.
	// Below we calculate the element coordinates by adding the real page scroll offsets.
	// The page zoom is detected by using the the inner window's width which reacts to
	// zooming in/out the page.
	// e: jquery object/element
	// xy: optional precalculated e.offset or existing position/point with members left/top
	$.ig.util.offset = function (e, xy) {
		var doc = e ? e[ 0 ].ownerDocument : document,
            windowBorderWidth = 8,
            zoom = (window.outerWidth - (windowBorderWidth * 2)) / window.innerWidth;

		xy = xy || e.offset();

		if (zoom && zoom > 1 && ($.ig.util.isIE10 || $.ig.util.isIE11 || $.ig.util.isEdge)) {
			if ($.ig.util.isIE) {
				xy.documentScrollLeft = doc.documentElement.scrollLeft;
				xy.documentScrollTop = doc.documentElement.scrollTop;
			} else if ($.ig.util.isEdge) {
				xy.documentScrollLeft = doc.body.scrollLeft;
				xy.documentScrollTop = doc.body.scrollTop;
			}

			xy.left += xy.documentScrollLeft - window.pageXOffset;
			xy.top += xy.documentScrollTop - window.pageYOffset;
		}

		return xy;
	};

	// Get relative offset of the passed element according to the closest parent element with relative position if any
	// e: jquery element
	$.ig.util.getRelativeOffset = function (e) {
		var elem = e.parent(), o = { left: 0, top: 0 }, position,
			 windowBorderWidth = 8,
			 zoom = (window.outerWidth - (windowBorderWidth * 2)) / window.innerWidth,
			 documentScrollLeft, documentScrollTop, doc = e.length > 0 ? e[ 0 ].ownerDocument : document;

		while (elem[ 0 ] !== null && elem[ 0 ] !== undefined && elem[ 0 ].nodeName !== "#document") {
			position = elem.css("position");
			/* because the element which is passed as argument is supposed to be with position absolute we should find whether it has parent in the DOM tree which is with position which is not static - like relative, absolute, etc */
			if (position !== "static" && position !== "") {
				if (zoom && zoom > 1 && ($.ig.util.isIE10 || $.ig.util.isIE11 || $.ig.util.isEdge)) {
					if ($.ig.util.isIE) {
						documentScrollLeft = doc.documentElement.scrollLeft;
						documentScrollTop = doc.documentElement.scrollTop;
					} else if ($.ig.util.isEdge) {
						documentScrollLeft = doc.body.scrollLeft;
						documentScrollTop = doc.body.scrollTop;
					}

					o.left = elem.offset().left;
					o.top = elem.offset().top;

					o.left += documentScrollLeft - window.pageXOffset;
					o.top += documentScrollTop - window.pageYOffset;
				} else {
					o.left = elem.offset().left - elem.scrollLeft();
					o.top = elem.offset().top - elem.scrollTop();
				}
				break;
			}
			elem = elem.parent();
		}
		return o;
	};

	// animates rotation
	$.fn.animateRotate = function (startAngle, endAngle, duration, easing, complete) {
		return this.each(function () {
			var elem = $(this);
			$({ deg: startAngle }).animate({ deg: endAngle }, {
				duration: duration,
				easing: easing,
				step: function (now) {
					elem.css({
						"-moz-transform": "rotate(" + now + "deg)",
						"-webkit-transform": "rotate(" + now + "deg)",
						"-o-transform": "rotate(" + now + "deg)",
						"-ms-transform": "rotate(" + now + "deg)",
						"transform": "rotate(" + now + "deg)"
					});
				},
				complete: complete || $.noop
			});
		});
	};

	// creates crc32 table
	$.ig.util.makeCRCTable = function () {
		var c, n, k, crcTable = [];
		for (n = 0; n < 256; n++) {
			c = n;
			for (k = 0; k < 8; k++) {
				/*jslint bitwise: true */
				c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
			}
			crcTable[ n ] = c;
		}
		return crcTable;
	};

	// returns crc32 checksum for the input string
	$.ig.util.crc32 = function (str) {
		/*jslint bitwise: true */
		var crcTable = $.ig.util.crcTable || ($.ig.util.crcTable = $.ig.util.makeCRCTable()),
			crc = 0 ^ (-1), i;
		str = unescape(encodeURIComponent(str));
		for (i = 0; i < str.length; i++) {
			crc = (crc >>> 8) ^ crcTable[ (crc ^ str.charCodeAt(i)) & 0xFF ];
		}
		return (crc ^ (-1)) >>> 0;
	};

	// returns checksum based on the string representations of an object's property values
	$.ig.util.getCheckSumForObject = function (obj) {
		var str = "", key;
		for (key in obj) {
			if (obj.hasOwnProperty(key) && typeof obj[ key ] !== "object"/* only stringify simple properties */) {
				str += obj[ key ];
			}
		}
		return $.ig.util.crc32(str);
	};

	/* jshint +W016*/

	$.ig.util.invokeCallback = function (callback, args) {
		if (callback) {
			if ($.type(callback) === "string" &&
				window[ callback ] && $.type(window[ callback ]) === "function") {
				callback = window[ callback ];
			}
			if ($.type(callback) === "function") {
				callback.apply(window, args);
			}
		}
	};

	$.ig.util.IMEtoENNumbersMapping = function () {
		return {
			"１": "1", "２": "2", "３": "3", "４": "4", "５": "5",
			"６": "6", "７": "7", "８": "8", "９": "9", "０": "0"
		};
	};
	$.ig.util.IMEtoNumberString = function (stringValue, mapping) {
		if (mapping === undefined) {
			return stringValue;
		}
		if (stringValue) {
			stringValue = stringValue.toString();
			$.each(mapping, function (jpVal, engVal) {
				stringValue = stringValue.replace(new RegExp(jpVal, "g"), engVal);
			});
		}
		return stringValue;
	};

	// M.H. 5 Mar 2013 Fix for bug #134982: When you instantiate dataSource object and there isn't reference to jQueryUI js error is thrown.
	if ($.Widget) {

		// M.H. 1 Mar 2013 Fix for bug #134534: Updating the jQuery`s version breaks most of the samples in the new samples browser
		// In jquery-ui 1.9.2+ it is used only full name - we fix this breaking change as adding also widgetName(it is used in older versions)
		(function (createWidget) {
			$.Widget.prototype._createWidget = function (options, element) {
				var el = $(element || this.defaultElement || this)[ 0 ];
				if (el !== this) {
					$.data(el, this.widgetName, this);
				}
				return createWidget.apply(this, arguments);
			};
		})($.Widget.prototype._createWidget);

		// M.H. 21 Oct 2014 Fix for bug #183464: With jQuery UI 1.11.x destroy leaves the { widgetName: widgetInstance } pairs intact on the elements
		// it should be removed data for this.widgetName as well
		(function (destroy) {
			$.Widget.prototype.destroy = function () {
				// we should call first prototype destroy because _destroy is called before remove data for the element
				var ret = destroy.apply(this, arguments);
				if (this.widgetName && this.element) {
					this.element.removeData(this.widgetName);
				}
				return ret;
			};
		})($.Widget.prototype.destroy);
	}

	// Check if given element has vertical scrollbar
	// elem - jQuery object
	$.ig.util.hasVerticalScroll = function (elem) {
		var overflow = $(elem).css("overflow-y");
		return overflow === "scroll" ||
			overflow === "auto" && elem[ 0 ].scrollHeight > elem[ 0 ].clientHeight;
	};

	// Check if given element has horizontal scrollbar
	// elem - jQuery object
	$.ig.util.hasHorizontalScroll = function (elem) {
		var overflow = $(elem).css("overflow-x");
		return overflow === "scroll" ||
			overflow === "auto" && elem[ 0 ].scrollWidth > elem[ 0 ].clientWidth;
	};

	// Returns the width of the vertical scrollbar
	$.ig.util.getScrollWidth = function () {
		var el = $('<div style="width: 100px; height: 100px; position: absolute; ' +
			'top: -10000px; left: -10000px; overflow: scroll"></div>')
			.appendTo($(document.body)), scrollWidth;
		scrollWidth = el[ 0 ].offsetWidth - el[ 0 ].clientWidth;
		el.remove();
		return scrollWidth;
	};

	// Returns the height of the horizontal scrollbar
	$.ig.util.getScrollHeight = function () {
		var el = $('<div style="width: 100px; height: 100px; position: absolute; ' +
			'top: -10000px; left: -10000px; overflow: scroll"></div>')
			.appendTo($(document.body)), scrollHeight;
		scrollHeight = el[ 0 ].offsetHeight - el[ 0 ].clientHeight;
		el.remove();
		return scrollHeight;
	};

	$.ig.util._renderUnsupportedBrowser = function (widget, locale) {
		if (!widget.events || !widget.events.browserNotSupported ||
			widget._trigger(widget.events.browserNotSupported)) {
			var elem = widget.element, o = widget.options,
				container = $("<div></div>")
					.attr({
						"data-not-supported-browser": true
					})
					.css("overflow", "auto")
					.addClass(widget.css.unsupportedBrowserClass).appendTo(elem),
				ul, browserUnsupported;
			locale = locale || $.ig.util.locale;
			if ($.ig.util.isIE) {
				browserUnsupported = "Internet Explorer " + $.ig.util.browserVersion;
			} else if ($.ig.util.isOpera) {
				browserUnsupported = "Opera " + $.ig.util.browserVersion;
			} else if ($.ig.util.isWebKit) {
				browserUnsupported = "Webkit " + $.ig.util.browserVersion;
			} else if ($.ig.util.isFF) {
				browserUnsupported = "Mozilla Firefox " + $.ig.util.browserVersion;
			} else {
				browserUnsupported = $.ig.util.browserVersion;
			}

			$("<div></div>").addClass("ui-html5-current-browser-label")
				.html(locale.currentBrowser.replace("{0}", browserUnsupported))
				.appendTo(container);
			$("<div></div>").addClass("ui-html5-non-html5-text")
				.html(locale.unsupportedBrowser).appendTo(container);
			ul = $("<ul></ul>").addClass("ui-html5-browsers-list").appendTo(container);
			$("<a></a>").attr("href", locale.chromeDownload).attr("target", "_blank")
				.addClass("ui-html5-chrome-icon").html(locale.chrome8).appendTo($("<li></li>")
				.addClass("ui-corner-all").appendTo(ul));
			$("<a></a>").attr("href", locale.firefoxDownload).attr("target", "_blank")
				.addClass("ui-html5-firefox-icon").html(locale.firefox36).appendTo($("<li></li>")
				.addClass("ui-corner-all").appendTo(ul));
			$("<a></a>").attr("href", locale.operaDownload).attr("target", "_blank")
				.addClass("ui-html5-Opera-icon").html(locale.opera11).appendTo($("<li></li>")
				.addClass("ui-corner-all").appendTo(ul));
			$("<a></a>").attr("href", locale.safariDownload).attr("target", "_blank")
				.addClass("ui-html5-safari-icon").html(locale.safari5).appendTo($("<li></li>")
				.addClass("ui-corner-all").appendTo(ul));
			$("<a></a>").attr("href", locale.ieDownload).attr("target", "_blank")
				.addClass("ui-html5-ie-icon").html(locale.ie9).appendTo($("<li></li>")
				.addClass("ui-corner-all").appendTo(ul));
			if (widget.css.unsupportedBrowserClass.indexOf(" ui-html5-non-html5") === -1) {
				elem.addClass("ui-html5-non-html5");
			}
			if (o.width) {
				elem.css("width", o.width);
			}
			if (o.height) {
				elem.css("height", o.height);
			}
		}
	};

	$.ig.util.defType("jQueryDomRenderer", "Object", {
		init: function () {
		},
		$type: new $.ig.Type("jQueryDomRenderer", $.ig.Object.prototype.$type)
	}, true);

}));// REMOVE_FROM_COMBINED_FILES
