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
	$.ig = window.$.ig || $.ig || { _isNamespace: true };
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

	$.ig.formatter = function (val, type, format, notTemplate, enableUTCDates,
		displayStyle, labelText, tabIndex) {
		var min, y, h, m, s, ms, am, e, day, pattern, len, n, dot, gr,
			gr0, grps, curS, percS, cur, perc, prefix, i, d = val && val.getTime,
			reg = $.ig.regional.defaults, pow,

			// L.A. 17 October 2012 - Fixing bug #123215 The group rows of a grouped checkbox column are too large
			display = displayStyle || "inline-block";
		if (format === "checkbox" && notTemplate) {
			s = "<span class='ui-igcheckbox-container' style='display:" +
				display + ";' role='checkbox' aria-disabled='true' aria-checked='" +
				val + "' aria-label='" + labelText + "' tabindex='" + tabIndex + "'>";
			s += "<span class='" + $.ig.checkboxMarkupClasses + "' style='display:inline-block'>";
			s += "<span style='display:block' class='" + (val ? "" : "ui-igcheckbox-small-off ");
			return s + "ui-icon ui-icon-check ui-igcheckbox-small-on'></span></span></span>";
		}
		if (!val && val !== 0 && val !== false) {
			return "&nbsp;";
		}
		if (type === "date" || d) {
			if (!val) {
				return "&nbsp;";
			}
			if (!d) {
				return val;
			}
			pattern = reg[ (format && format !== "null" && format !== "undefined") ?
				format + "Pattern" : "datePattern" ] || format;
			if (enableUTCDates) {
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
				am = (h >= 12) ? reg.pm : reg.am;
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
			pattern = pattern.replace("\x01", reg.monthNames[ m - 1 ])
				.replace("\x02", reg.monthNamesShort[ m - 1 ]).replace("\x05", am);
			pattern = pattern.replace("\x03", reg.dayNames[ day ]).replace("\x04", reg.dayNamesShort[ day ]);
			pattern = pattern.replace(/\x06/g, "d").replace(/\x07/g, "y").replace(/\x08/g, "M")
				.replace(/\x09/g, "m").replace(/\x0A/g, "t").replace(/\x0B/g, "s")
				.replace(/\x0C/g, "f").replace("\x0D", "h").replace("\x0E", "H");
			return pattern;
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
			if (!n) {

				// N.A. 26 April 2013 - Fixing bug #139790 When regional settings, different from english, are used and the decimal separator is different than "." the value is calculated wrong
				// keep only e, E, -, +, decimal separator and digits
				val = parseFloat(val.replace("(", "-")
					.replace(new RegExp("[^0-9\\-eE\\" +
						reg.numericDecimalSeparator + "\\+]", "gm"), "")
					.replace(reg.numericDecimalSeparator, "."));
			}
			if (isNaN(val)) {
				return "&nbsp;";
			}

			// M.H. 27 Oct 2014 Fix for bug #183668: when setting column format to percent the formatted value doesn"t reflect proper math to address decimal placement
			if (perc) {
				val *= 100;
			}
			prefix = cur ? curS : (perc ? percS : "numeric");
			pattern = reg[ prefix + ((val < 0) ? "Negative" : "Positive") + "Pattern" ] || "n";
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
				min = reg[ prefix + "MinDecimals" ] || 0;
				if (d) {
					m = 999;
				} else {
					m = reg[ prefix + "MaxDecimals" ];
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
			s = reg[ prefix + "DecimalSeparator" ];
			if (s) {
				val = val.replace(".", s);
			}

			// insert group separators
			s = reg[ prefix + "GroupSeparator" ];
			grps = s ? reg[ prefix + "Groups" ] : "";
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
			s = reg[ prefix + "Symbol" ] || "";
			return pattern.replace("-", reg.negativeSign).replace("n", val + e).replace("$", s);
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
	$.ig._regional = {
		monthNames: [ "January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December" ],
		monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday" ],
		dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
		am: "AM",
		pm: "PM",
		datePattern: "M/d/yyyy",
		dateLongPattern: "dddd, MMMM dd, yyyy",
		dateTimePattern: "M/d/yyyy h:mm tt",
		timePattern: "h:mm tt",
		timeLongPattern: "h:mm:ss tt",
		negativeSign: "-",
		numericNegativePattern: "-$n",
		numericDecimalSeparator: ".",
		numericGroupSeparator: ",",
		numericGroups: [ 3 ],
		numericMaxDecimals: 2,
		numericMinDecimals: 0,
		currencyPositivePattern: "$n",
		currencyNegativePattern: "-$n",
		currencySymbol: "$",
		currencyDecimalSeparator: ".",
		currencyGroupSeparator: ",",
		currencyGroups: [ 3 ],
		currencyMaxDecimals: 2,
		currencyMinDecimals: 2,
		percentPositivePattern: "n$",
		percentNegativePattern: "-n$",
		percentSymbol: "%",
		percentDecimalSeparator: ".",
		percentGroupSeparator: ",",
		percentGroups: [ 3 ],
		percentDisplayFactor: 100,
		percentMaxDecimals: 2,
		percentMinDecimals: 2
	};
	$.ig.regional = $.ig.regional || {};
	$.ig.regional.defaults = $.ig._regional;
	$.ig.setRegionalDefault = function (regional) {
		if ($.ui && $.ui.igEditor) {
			$.ui.igEditor.setDefaultCulture(regional);
		} else {
			$.ig.regional.defaults = $.extend($.ig._regional,
				(typeof regional === "string") ? $.ig.regional[ regional ] : regional);
		}
	};
	$.ig.calcSummaries = function (summaryFunction, data, caller, dataType) {
		var sum = function (data) {
			var sum = 0,
				i;
			for (i = 0; i < data.length; i++) {
				sum += data[ i ];
			}
			return sum;
		};

		// M.H. 16 Nov. 2011 Fix for bug 97886
		summaryFunction = summaryFunction.toLowerCase();
		if (summaryFunction.startsWith("custom")) {
			summaryFunction = "custom";
		}

		switch (summaryFunction) {
			case "min":
				if (data.length === 0) {
					if (dataType === "date") {
						return null;
					}
					return 0;
				}
				return Math.min.apply(Math, data);
			case "max":
				if (data.length === 0) {
					if (dataType === "date") {
						return null;
					}
					return 0;
				}
				return Math.max.apply(Math, data);
			case "sum":
				return sum(data);
			case "avg":
				if (data.length === 0) {
					return 0;
				}
				return sum(data) / data.length;
			case "count":
				return data.length;
			case "custom":

				// M.H. 30 Sept. 2011 Fix for bug #88717 - fix when caller is string
				if (caller !== undefined && caller !== null) {
					if ($.type(caller) === "function") {
						return caller(data);
					}
					if ($.type(caller) === "string") {
						/*jshint evil:true */
						caller = eval(caller);
						return caller(data);
					}
				} else {
					return null;
				}
				break;
		}
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
	}(jQuery));

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
				container = $("<div></div>").css("overflow", "auto")
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
