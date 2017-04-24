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
 *  jquery-1.9.1.js
 *  modernizr.js (Optional)
 *
 */

/* Simple JavaScript Inheritance
* By John Resig http://ejohn.org/
* MIT Licensed.
*/

// Inspired by base2 and Prototype
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {

	var initializing = false, fnTest = /xyz/.test(function () { xyz(); }) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing) or expects Class to already be defined as a function
	// K.D. August 18, 2016 Bug #242 global scope Class object is overridden by Ignite UI Class object
	this.Class = this.Class || function () { };

	// Create a new Class that inherits from this class
	Class.extend = function (prop, doAugment) {
		var doSuper = true,
			_super = this.prototype,
			prototype,
			name;

		if (doAugment) {
			doSuper = false;
		}

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		prototype = new this();
		initializing = false;

		function makeFn(name, fn) {
			return function () {
				var tmp = this._super,
					ret;

				// Add a new ._super() method that is the same method
				// but on the super-class
				this._super = _super[ name ];

				// The method only need to be bound temporarily, so we
				// remove it when we're done executing
				ret = fn.apply(this, arguments);
				this._super = tmp;

				return ret;
			};
		}

		// Set these before copying over values from the prop, so we don't overwrite a custom getHashCode implementation.
		if (doAugment) {
			prototype.getType = function () {
				return this.$type;
			};

			prototype.getHashCode = function () {
				if (this.$hashCode !== undefined) {
					return this.$hashCode;
				}
				this.$hashCode = $.ig.nextHashCode++;
				return this.$hashCode;
			};
		}

		// Copy the properties over onto the new prototype
		for (name in prop) {
			if (prop.hasOwnProperty(name)) {
				// Check if we're overwriting an existing function
				prototype[ name ] = doSuper && typeof prop[ name ] === "function" &&
					typeof _super[ name ] === "function" && fnTest.test(prop[ name ]) ?
					makeFn(name, prop[ name ]) : prop[ name ];
			}
		}

		// For some reason, intellisense gets tripped up when we allow the constructors to call the init function. So when the intellisense
		// object is defined, just use a dummy constructor
		var isForIntellisense =
			window.intellisense &&
			window.intellisense.annotate;

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) {
				if (!isForIntellisense || Class === $.ig.Type) {
					this.init.apply(this, arguments);
				}
			}
		}

		if (prop.$type) {
			prop.$type.InstanceConstructor = Class;
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = this.extend;

		if (doAugment) {
			Class.typeName = function () {
				return this.prototype.$type;
			};

			Class.baseType = function () {
				return this.$type.baseType;
			};
		}

		return Class;
	};

	// N.A. 12/8/2015 Bug #210921 In IE8 'console' is 'undefined' and to remove exceptions when console.log is used just create empty function.
	// For the moment editors and notifier are using console.log() function.
	if (!window.console) {
		window.console = { log: function () { } };
	}

	/* 	requestAnimationFrame and cancelAnimationFrame polyfill
	* 	By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
	* 	MIT license
	*/
	var lastTime = 0;
	var prefixes = [ "ms", "moz", "webkit", "o" ];

	for (var x = 0; x < prefixes.length &&
			(!window.requestAnimationFrame || !window.cancelAnimationFrame) ; ++x) {
		window.requestAnimationFrame = window[ prefixes[ x ] + "RequestAnimationFrame" ];
		window.cancelAnimationFrame = window[ prefixes[ x ] + "CancelAnimationFrame" ] ||
										window[ prefixes[ x ] + "CancelRequestAnimationFrame" ];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback) {
			var currTime = Date.now();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}

	$.fn.startsWith = function (str) {
		return this[ 0 ].innerHTML.indexOf(str) === 0;
	};

	$.ig = $.ig || { _isNamespace: true };
	$.ig.util = $.ig.util || {};

	$.ig.util.browserVersion = "";

	//D.A. 11th November 2013, Updated the isIE & browserVersion to be compatible with IE11+
	$.ig.util.isIE = window.navigator.userAgent.indexOf("MSIE") > -1 || !!window.navigator.userAgent.match(/trident/i);
	$.ig.util.isIEOld = $.ig.util.isIE && !window.HTMLElement ? true : false;
	if ($.ig.util.isIE) {

		//Bug #176413 T.P. 3rd October 2014 use documentMode to detect browser version as we no longer support IE7
		$.ig.util.browserVersion = document.documentMode;
		$.ig.util.isIE7 = $.ig.util.browserVersion <= 7;
		$.ig.util.isIE8 = $.ig.util.browserVersion === 8;
		$.ig.util.isIE9 = $.ig.util.browserVersion === 9;
		$.ig.util.isIE10 = $.ig.util.browserVersion === 10;
		$.ig.util.isIE11 = $.ig.util.browserVersion >= 11;
	}

	$.ig.util.isChrome = window.chrome;
	$.ig.util.isFF = window.mozInnerScreenX !== undefined;
	$.ig.util.isOpera = !!window.opera;
	$.ig.util.isSafari =
		(Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) ||
		window.ApplePaySession ?
			true :
			false;
	$.ig.util.isWebKit = !!window.webkitURL;
	$.ig.util.isEdge = window.navigator.userAgent.indexOf("Edge") > -1;

	$.ajaxQueue = function (queueName, options) {
		var callback;

		//        var s = $("#status");
		//        s.html(options.url + "<br />" + s.html());

		if (typeof document.ajaxQueue === "undefined") {
			document.ajaxQueue = { queue: {} };
		}
		if (typeof document.ajaxQueue.queue[ queueName ] === "undefined") {
			document.ajaxQueue.queue[ queueName ] = [ ];
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

	//A.T. 29 Nov 2012 - Fix for bug #119896
	if (typeof $.ig.useDefineProperty === "undefined") { $.ig.useDefineProperty = true; }

	// N.A. 2/18/2016 Task #214465: Support for Modernizr 3
	// https://modernizr.com/docs, https://github.com/Modernizr/Modernizr/issues/1179.
	$.ig.util.isModernizrAvailable = (typeof Modernizr === "object");
	$.ig.util.isTouch =
		$.ig.util.isModernizrAvailable &&
		(Modernizr.touch === true ||
			Modernizr.touchevents === true || Modernizr.pointerevents === true);

	$.ig.util.isTouchDevice = function () {
		return "ontouchstart" in window ||
			window.navigator.msMaxTouchPoints > 0;
	};

	$.ig.extendNativePrototype = function (proto, propName, val) {
		if ($.ig.useDefineProperty) {
			try {
				Object.defineProperty(proto, propName, {
					value: val,
					enumerable: false,
					configurable: true,
					writable: true
				});
			} catch (e) { // IE8 has defineProperty defined, but doesn't support setting enumerable to false
				proto[ propName ] = val;
			}
		} else {
			proto[ propName ] = val;
		}
	};

	$.ig.util.stackPeek = function (array) {
		return array[ array.length - 1 ];
	};

	$.ig.util.stackContains = function (array, item) {
		for (var i = 0; i < array.length; i++) {
			if ($.ig.Object.prototype.equalsStatic(array[ i ], item)) {
				return true;
			}
		}

		return false;
	};

	$.ig.util.createString1 = function (charArray) {
		return charArray.join("");
	};

	$.ig.util.createString2 = function (c, count) {
		var ret = "";
		for (var i = 0; i < count; i++) {
			ret = ret + c;
		}

		return ret;
	};

	$.ig.util.createString3 = function (charArray, start, length) {
		var ret = "";
		for (var i = 0; i < length; i++) {
			ret = ret + charArray[ start + i ];
		}

		return ret;
	};

	String.prototype.copyTo = function (sourceIndex, destination, destinationIndex, count) {
		for (var i = destinationIndex; i < destinationIndex + count; i++) {
			destination[ i ] = this.charAt(sourceIndex + i - destinationIndex);
		}
	};

	Date.prototype.stdTimezoneOffset = function () {
		var jan, jul, janOffset, julOffset;
		jan = new Date(this.getFullYear(), 0, 1);
		jul = new Date(this.getFullYear(), 6, 1);
		julOffset = jul.getTimezoneOffset();
		janOffset = jan.getTimezoneOffset();
		return Math.max(janOffset, julOffset);
	};

	Date.prototype.dst = function () {
		return this.getTimezoneOffset() < this.stdTimezoneOffset();
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
				var result = [ ], prop, i;
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

	$.ig.findPath = function (dsObj, resKey) {
		var resPath, ds = dsObj;
		resPath = resKey.split(".");
		if (resPath.length > 0) {
			for (var i = 0; i < resPath.length; i++) {
				if (ds) {
					ds = ds[ resPath[ i ] ];
				} else {
					break;
				}
			}
		}
		return ds;
	};

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

	$.ig.nextHashCode = 0;
	$.ig.util.ensureUniqueId = function (obj) {
		if (!obj.getHashCode) {
			var code = $.ig.nextHashCode++;
			obj.getHashCode = function () {
				return code;
			};
		}
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

	$.ig.typeIdentifierCache = {};
	$.ig.nextTypeIdentifier = 0;
	$.ig.Type = Class.extend({
		init: function (identifier, baseType, interfaces, staticInitializer) {
			this.specializationCache = {};
			this._staticInitializer = staticInitializer;
			this._fullName = identifier;
			this.name = identifier;
			var lastDotIndex = this.name.lastIndexOf(".");
			if (lastDotIndex >= 0) {
				this.name = this.name.substr(lastDotIndex + 1);
			}

			this.typeArguments = null;
			this.baseType = null;
			this.interfaces = null;
			if (baseType) {
				this.baseType = baseType;
			}
			if (interfaces) {
				this.interfaces = interfaces;
			}

			if ($.ig.typeIdentifierCache[ identifier ]) {
				this.identifier = $.ig.typeIdentifierCache[ identifier ];
			} else {
				this.identifier = $.ig.nextTypeIdentifier++;
				$.ig.typeIdentifierCache[ identifier ] = this.identifier;
			}

		    // rather than always evaluating a function on a type to see if it is an enum
            // we can just cache it once on the type
			if (baseType && $.ig.Enum && baseType == $.ig.Enum.prototype.$type) {
				this.isEnumType = true;
			}
		},
		typeName: function () {
			return this.name;
		},
		fullName: function () {
			return this._fullName;
		},
		getSpecId: function (types) {
		    if (types.length === 1) {
		        if (!types[ 0 ]) {
					return "undef";
		        } else if (types[ 0 ] === -1) {
		            return undefined;
		        } else if (!types[ 0 ].typeName) {
		            return types[ 0 ].toString();
		        } else if (types[ 0 ].stringId) {
		            return types[ 0 ].stringId;
				} else {
		            return types[ 0 ].identifier.toString();
				}
			}

			var ret = "";
			for (var i = 0; i < types.length; i++) {
			    var type = types[ i ];
				if (!type) {
					ret += "undef";
				} else if (type == -1) {
				    return undefined;
				} else if (!type.typeName) {
					ret += type.toString();
				} else if (type.stringId) {
					ret += type.stringId;
				} else {
					ret += type.identifier.toString();
				}
			}
			return ret;
		},
		_isGenericType: null,
		isGenericType: function () {
			if (this._isGenericType === null) {
				this._isGenericType = this.name.indexOf("$") >= 0;
			}

			return this._isGenericType;
		},
		isGenericTypeDefinition: function () {
			return this.typeArguments === null && this.isGenericType();
		},
		genericTypeArguments: function () {
			return this.typeArguments;
		},
		_staticInitializer: null,
		_staticFields: null,
		getStaticFields: function (type) {
			if (type === undefined) {
				type = this;
			}

			var t = this;

			while (t != null) {
				if (t === type || t._fullName == type._fullName) {
					if (t._staticFields == null && t._staticInitializer) {
						t._staticFields = {};
						t._staticInitializer.apply(t._staticFields, t.typeArguments);
					}

					return t._staticFields;
				}

				t = t.baseType;
			}

			return null;
		},
		specializationCache: null,
		initSelfReferences: function (replacement) {
			var i, j;
			if (replacement) {
				if (this.typeArguments) {
				    var updateCache = false;

				    for (j = 0; j < this.typeArguments.length; j++) {
						var typeArg = this.typeArguments[ j ];
						if (typeArg == -1) {
						    updateCache = true;
						    this.typeArguments[ j ] = replacement;
						} else if (typeArg && typeArg.initSelfReferences) {
						    typeArg.initSelfReferences(replacement);
						}
				    }

				    if (updateCache) {
				        var specId = this.getSpecId(this.typeArguments);
				        var ret = this.specializationCache[ specId ];

				        if (!ret) {
				            this.specializationCache[ specId ] = this;
				        }
				    }
				}
			} else {
				if (this.baseType) {
					this.baseType.initSelfReferences(this);
				}

				if (this.interfaces) {
					for (i = 0; i < this.interfaces.length; i++) {
						this.interfaces[ i ].initSelfReferences(this);
					}
				}
			}
		},
		specialize: function () {
			var i;
			if (!this.isGenericType()) {
				return this;
			}

			var specId = this.getSpecId(arguments);
			var ret = this.specializationCache[ specId ];
			if (ret) {
				return ret;
			}
			ret = new $.ig.Type(this._fullName, this.baseType, this.interfaces, this._staticInitializer);

			var placeholders = this.typeArguments;
			var hasPlaceholders = false;

			// Make sure the placeholders are actually numbers. If they are types, we are re-specializing an
			// already specialized type.
			if (placeholders && placeholders.length) {
			    /* going back to how it used to be. we shouldn't assume that the number/order of the arguments
                   relates to the typearguments. this may be an interface that has its type information already
                   and either has placeholders or is a closed type
			    // you can have a mixed bag where some are placeholders and others are not and the
			    // placeholder doesn't have to be the first slot
			    for (i = 0; i < placeholders.length; i++) {
			        if (isFinite(placeholders[ i ])) {
			            hasPlaceholders = true;
			            break;
			        }
			    }*/
			    hasPlaceholders = true;
			}

			ret.typeArguments = [ ];
			if (hasPlaceholders) {
				for (i = 0; i < placeholders.length; i++) {

			        // if the argument being provided is a placeholder index and we already have
			        // a placeholder then keep the index we have. otherwise we're taking the index
                    // of the parent type
			        if (isFinite(placeholders[ i ]) && !isFinite(arguments[ placeholders[ i ] ])) {
			            ret.typeArguments[ i ] = arguments[ placeholders[ i ] ];
			        } else {
			            ret.typeArguments[ i ] = placeholders[ i ];
			        }
			    }
			} else {
			    for (i = 0; i < arguments.length; i++) {
		            ret.typeArguments[ i ] = arguments[ i ];
				}
			}

		    // since the placeholder indexes for the basetype and interfaces implemented are based
		    // on the order of the type arguments for the defining types we should pass its typeargs
		    // and not the outermost type's type arguments which may be different in number and order
            // than the base type of the base types and interfaces implemented
			if (this.baseType && this.baseType.typeArguments) {
			    ret.baseType = this.specialize.apply(this.baseType, ret.typeArguments);
			}

			if (this.interfaces) {
				ret.interfaces = [ ];
				for (i = 0; i < this.interfaces.length; i++) {
				    ret.interfaces[ i ] = this.specialize.apply(this.interfaces[ i ], ret.typeArguments);
				}
			}

            // rather than doing this check in various places we could just cache a field on the type
			if (this._fullName == "Nullable$1" && ret.typeArguments.length == 1) {
				ret.isNullable = true;
			}

		    // if this was a self referencing type (e.g. IEquatable<Int32> for Int32 then we won't have the
		    // specId yet because we don't know the type argument. we'll update the cache when we update
		    // the self references. otherwise other types that use self references (but for a different type)
            // will get and use the wrong type arguments
			if (specId) {
			    this.specializationCache[ specId ] = ret;
			    ret.stringId = ret.generateString();
			}

			var _self = this;
			ret.InstanceConstructor = function () {
				_self.InstanceConstructor.apply(this,
					ret.typeArguments.concat(Array.prototype.slice.call(arguments, 0)));
				return this;
			};
			ret.InstanceConstructor.prototype = this.InstanceConstructor.prototype;

			return ret;
		},
		equals: function (other) {
			if (!(other instanceof $.ig.Type)) {
				return false;
			}
			if (this.identifier !== other.identifier) {
				return false;
			}
			if (this.typeArguments === null && other.typeArguments === null) {
				return true;
			}
			if (this.typeArguments === null && other.typeArguments !== null) {
				return false;
			}
			if (this.typeArguments !== null && other.typeArguments === null) {
				return false;
			}
			if (this.typeArguments.length !== other.typeArguments.length) {
				return false;
			}
			for (var i = 0; i < this.typeArguments.length; i++) {

				//TODO: handle covariance case here.
				//if (!$.ig.util.canAssign(this.typeArguments[ i ], other.typeArguments[ i ])) {
				//    return false;
				//}
				if (!$.ig.Type.prototype.checkEquals(this.typeArguments[ i ], other.typeArguments[ i ])) {
					return false;
				}
			}

			return true;
		},
		checkEquals: function (type1, type2) {
			if (type1 instanceof $.ig.Type) {
				return type1.equals(type2);
			} else if (type2 instanceof $.ig.Type) {
				return type2.equals(type1);
			} else {
				return type1 === type2;
			}
		},

		op_Equality: function (type1, type2) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return type1.equals(type2);
		},
		op_Inequality: function (type1, type2) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return !type1.equals(type2);
		},

		generateString: function () {
			if (!this.typeArguments || !this.typeArguments.length) {
				return this.identifier.toString();
			} else {
				var ret = this.identifier.toString() + "[";
				var first = true;
				for (var i = 0; i < this.typeArguments.length; i++) {
					if (this.typeArguments[ i ] == undefined) {
						continue;
					}
					if (first) { first = false; } else { ret += ","; }
					if (this.typeArguments[ i ].toString) {
						ret += this.typeArguments[ i ].toString();
					} else {
						ret += this.typeArguments[ i ].identifier.toString();
					}
				}
				ret += "]";
				return ret;
			}
		},
		isEnum: function () {
			return this.baseType === $.ig.Enum.prototype.$type;
		},
		isValueType: function () {
			return this.baseType === $.ig.ValueType.prototype.$type;
		},
		isAssignableFrom: function (tOther) {

			// TODO: Unit test and make sure this is right (especially with generics
			if (this === tOther) {
				return true;
			}

			if (tOther.baseType && this.isAssignableFrom(tOther.baseType)) {
				return true;
			}

			if (tOther.interfaces) {
				for (var i = 0; i < tOther.interfaces.length; i++) {
					if (this.isAssignableFrom(tOther.interfaces[ i ])) {
						return true;
					}
				}
			}

			return false;
		},
		isInstanceOfType: function (value) {
			return $.ig.util.cast(this, value) !== null;
		},
		isPrimitive: function () {
			return this === $.ig.Number.prototype.$type ||
				this === $.ig.Boolean.prototype.$type;
		}
	}, true);

	$.ig.Object = Class.extend({
		init: function () {

		},
		equals: function (other) {
			return this === other;
		},
		equalsStatic: function (a, b) {
			/*jshint eqnull:true */
			var aIsNull = (a == null) || (!!a.isNullable && !a.hasValue());
			var bIsNull = (b == null) || (!!b.isNullable && !b.hasValue());

			if (aIsNull || bIsNull) {
				return aIsNull && bIsNull;
			}

			if (a.equals) {
				return a.equals(b);
			}

			if (b.equals) {
				return b.equals(a);
			}

			if ($.ig.util.isNaN(a) && $.ig.util.isNaN(b)) {
				return true;
			}

			return a == b && typeof a == typeof b;
		},
		memberwiseClone: function () {

			function Cons() { }
			Cons.prototype = this.$type.InstanceConstructor.prototype;
			var clone = new Cons();

			for (var prop in this) {
				if (this.hasOwnProperty(prop)) {
					clone[ prop ] = this[ prop ];
				}
			}

			return clone;
		},
		referenceEquals: function (a, b) {
			/*jshint eqnull:true */
			return a === b || (a == null && b == null);
		},
		$type: new $.ig.Type("Object")
	}, true);
	$.ig.$o = $.ig.Object;
	$.ig.$op = $.ig.Object.prototype;
	$.ig.$ot = $.ig.Object.prototype.$type;

	$.ig.Type.prototype.$type = new $.ig.Type("Type", $.ig.Object.prototype.$type);

	$.ig.IConvertible = Class.extend({
		$type: new $.ig.Type("IConvertible")
	}, true);

	$.ig.IComparable = Class.extend({
		$type: new $.ig.Type("IComparable")
	}, true);

	$.ig.IComparable$1 = Class.extend({
		$type: new $.ig.Type("IComparable$1")
	}, true);

	$.ig.IEquatable$1 = Class.extend({
		$type: new $.ig.Type("IEquatable$1")
	}, true);

	$.ig.Enum = Class.extend({
		parse: function (enumType, value, ignoreCase) {
			var info = $.ig.util.getDefinedNameAndNamespace(enumType.fullName());

			if ($.ig.util.canAssign(this.$type, enumType)) {
				var p = info.namespace[ info.name ].prototype;
				var values = p.$type.InstanceConstructor._isEnum ? p.$type.InstanceConstructor : p;

				if (values.hasOwnProperty(value)) {
					return p.getBox(values[ value ]);
				} else if (ignoreCase) {
					var upper = value.toUpperCase();

					for (var x in values) {
						if (x.toUpperCase() === upper) {
							return p.getBox(values[ x ]);
						}
					}
				} else {

					// TODO: Find a more permanent solution to this casing issue. Maybe the Enums should have their names stored with the values somehow
					var firstChar = value.charAt(0);
					value = firstChar.toLowerCase() + value.substr(1);
					if (values.hasOwnProperty(value)) {
						return p.getBox(values[ value ]);
					}
				}
			}

			throw new Error("Invalid " + info.name + " value: " + value);
		},
		getBox: function (v) {
			if (!this._boxes) {
				this._boxes = {};
			}

			if (!this._boxes[ v ]) {
				this._boxes[ v ] = new this.$type.InstanceConstructor(v);
			}

			return this._boxes[ v ];
		},
		toString: function () {
			return this.$type.InstanceConstructor.prototype.$getName(this._v);
		},
		getFlaggedName: function (v, getName) {
			var names = [ ];
			var original = v;
			var zeroValueName;
			var value;

			var values = [ ];
			for (var p in this) {
				if (this.hasOwnProperty(p)) {
					value = this[ p ];
					if (typeof this[ p ] == "number") {
						values.push(p);
					}
				}
			}

			values.sort(function (a, b) { return this[ a ] - this[ b ]; });

			for (var i = values.length - 1; i >= 0; i--) {
				value = this[ values[ i ] ];
				if (value === 0) {
					zeroValueName = getName(0);
				}
					/*jslint bitwise: true */
				else if ((v & value) === value) {
					v -= value;
					names.unshift(getName(value));
				}
			}

			if (v !== 0) {
				return original.toString();
			}

			if (original !== 0) {
				return names.join(", ");
			}

			return zeroValueName || "0";
		},
		getValues: function ($t) {
			var result = [ ];

			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (typeof p[ member ] === "number") {
						result.push(p[ member ]);
					}
				}
			}

			return result;
		},
		getNames: function ($t) {
			var result = [ ];

			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (typeof p[ member ] === "number") {
						result.push(member);
					}
				}
			}

			return result;
		},
		isDefined: function ($t, value) {
			value = $.ig.util.getValue(value);
			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (p[ member ] === value) {
						return true;
					}
				}
			}

			return false;
		},

		// TODO: Fill out remaining IConvertible implementation
		toDouble: function (provider) {
			return this.$value();
		},
		toObject: function ($t, value) {
			return value;
		},
		tryParse$1: function ($tEnum, value, ignoreCase, result) {
			try {
				return {
					ret: true,
					p2: this.parse($tEnum, value, ignoreCase).$value()
				};
			} catch (e) {
				result = $.ig.util.createInstance($tEnum);
				return {
					ret: false,
					p2: result
				};
			}
		},
		$type: new $.ig.Type("Enum",
			$.ig.Object.prototype.$type, [ $.ig.IConvertible.prototype.$type ])
	}, true);
	$.ig.$e = $.ig.Enum;
	$.ig.$ep = $.ig.Enum.prototype;
	$.ig.$et = $.ig.Enum.prototype.$type;

	$.ig.ValueType = Class.extend({
		init: function () {

		},
		$type: new $.ig.Type("ValueType", $.ig.Object.prototype.$type)
	}, true);

	$.ig.INotifyPropertyChanged = Class.extend({
		init: function () {

		},
		_PropertyChanged: function () {

		},
		$type: new $.ig.Type("INotifyPropertyChanged")
	}, true);

	$.ig.PropertyChangedEventArgs = $.ig.Object.extend({
		init: function (propertyName) {
			this._propertyName = propertyName;
		},
		_propertyName: null,
		propertyName: function (value) {
			if (arguments.length === 0) {
				return this._propertyName;
			} else {
				this._propertyName = value;
			}
		},
		$type: new $.ig.Type("PropertyChangedEventArgs", $.ig.Object.$type)
	}, true);

	$.ig.XmlNodeType = Class.extend({
		_None: 0,
		_Attribute: 2,
		_CDATA: 4,
		_Comment: 8,
		_Document: 9,
		_DocumentFragment: 11,
		_DocumentType: 10,
		_Element: 1,
		_EndElement: 15,
		_EndEntity: 16,
		_Entity: 6,
		_EntityReference: 5,
		_Notation: 12,
		_ProcessingInstruction: 7,
		_SignificantWhitespace: 14,
		_Text: 3,
		_Whitespace: 13,
		_XmlDeclaration: 17,

		none: 0,
		element: 1,
		attribute: 2,
		text: 3,
		cDATA: 4,
		entityReference: 5,
		entity: 6,
		processingInstruction: 7,
		comment: 8,
		document: 9,
		documentType: 10,
		documentFragment: 11,
		notation: 12,
		whitespace: 13,
		significantWhitespace: 14,
		endElement: 15,
		endEntity: 16,
		xmlDeclaration: 17

	}, true);

	$.ig.XmlDocumentParser = Class.extend({
		parse: function (markup) {
			if (!window.DOMParser) {
				var parsers = [ "Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument" ];

				for (var i = 0; i < parsers.length; i++) {
					try {
						var xmlDOM = new ActiveXObject(parsers[ i ]);
						xmlDOM.async = false;
						xmlDOM.loadXML(markup);
						xmlDOM.setProperty("SelectionLanguage", "XPath");

						return xmlDOM;
					}
					catch (ex) {
					}
				}
			} else {
				try {
					var domParser = new DOMParser();
					return domParser.parseFromString(markup, "text/xml");
				}
				catch (ex) {
				}
			}
			return null;
		}
	}, true);

	$.ig.Array = Array;

	$.ig.extendNativePrototype(Array.prototype, "add", function (item) {
		this[ this.length ] = item;
	});

	$.ig.addToArray = function (arr, item) {
		arr[ arr.length ] = item;
	};

	$.ig.indexInArray = function (arr, item) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[ i ] == item) {
				return i;
			}
		}
		return -1;
	};

	$.ig.arrayContains = function (arr, item) {
		var index = arr.indexOf(item);
		return (index >= 0);
	};

	if (!Array.prototype.indexOf) {
		$.ig.extendNativePrototype(Array.prototype, "indexOf", function (item) {
			for (var i = 0; i < this.length; i++) {
				if (this[ i ] == item) {
					return i;
				}
			}
			return -1;
		});
	}

	if (!Array.prototype.lastIndexOf) {
		$.ig.extendNativePrototype(Array.prototype, "lastIndexOf", function (item) {
			for (var i = this.length - 1; i >= 0; i--) {
				if (this[ i ] == item) {
					return i;
				}
			}
			return -1;
		});
	}

	// TODO: Can we remove this? We have $.ig.util.arrayCopy1 now
	$.ig.extendNativePrototype(Array.prototype, "copy",
		function (source, sourceIndex, dest, destIndex, count) {
		for (var i = 0; i < count; i++) {
			dest[ destIndex + i ] = source[ sourceIndex + i ];
		}
	});

	$.ig.removeFromArray = function (arr, from, to) {
		var rest = arr.slice((to || from) + 1 || arr.length);
		arr.length = from < 0 ? arr.length + from : from;
		return arr.push.apply(arr, rest);
	};

	$.ig.extendNativePrototype(Array.prototype, "contains", function (item) {
		var index = this.indexOf(item);
		return (index >= 0);
	});

	$.ig.extendNativePrototype(Array.prototype, "insert", function (index, item) {
		this.splice(index, 0, item);
	});

	$.ig.extendNativePrototype(Array.prototype, "removeAt", function (i) {
		this.splice(i, 1);
	});

	$.ig.extendNativePrototype(Array.prototype, "removeItem", function (item) {
		var index = this.indexOf(item);
		if (index >= 0) {
			this.splice(index, 1);
			return true;
		}
		return false;
	});

	$.ig.extendNativePrototype(Array.prototype, "getEnumerator", function () {
		return new $.ig.ArrayEnumerator(this);
	});

	$.ig.extendNativePrototype(Array.prototype, "count", function () {
		return this.length;
	});

	$.ig.extendNativePrototype(Array.prototype, "item", function (index, value) {
		if (arguments.length === 2) {
			this[ index ] = value;
			return value;
		} else {
			return this[ index ];
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "getLength", function (dimension) {

		// TODO: Is there a better way to do this? Maybe attach the rank values to the array?

		var array = this;
		var dim = dimension;

		while (array) {
			if (dim === 0) {
				return array.length;
			}

			dim--;
			array = array[ 0 ];
		}

		return this.dimensionLength[ dimension - 1 ];
	});

	$.ig.extendNativePrototype(Array.prototype, "resize", function () {
		this.length = 0;
	});

	$.ig.ArrayEnumerator = Class.extend({

		init: function (array) {
			this._array = array;
			this._index = -1;
		},
		current: function () {
			return this._array[ this._index ];
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._array.length);
		},
		reset: function () {
			this._index = -1;
		},
		dispose: function () { }
	}, true);

	$.ig.Date = Class.extend({
		init: function () {
			return new Date();
		},
		fromOADate: function (value) {
			var result = new Date(+(new Date(1899, 11, 30)) + Math.round(value * 86400000));

			if (result.dst && result.dst()) {
				return $.ig.Date.prototype.addHours(result, -1);
			}

			return result;
		},
		fromValues: function (year, month, day, hour, minute, second, millisecond) {
			return new Date(year, month - 1, day, hour, minute, second, millisecond);
		},
		fromTicks: function (ticks) {
			return new Date(ticks);
		},
		addSeconds: function (value, seconds) {
			return $.ig.Date.prototype.addDays(value, seconds / 86400);
		},
		addMinutes: function (value, minutes) {
			return $.ig.Date.prototype.addDays(value, minutes / 1440);
		},
		addHours: function (value, hours) {
			return $.ig.Date.prototype.addDays(value, hours / 24);
		},
		addDays: function (value, days) {
			var result = new Date(+value + (days * 86400000));

			// Correct for any daylight saving time shifts
			if (value.dst) {
				if (!value.dst()) {
					if (result.dst()) {
						result = new Date(+result - 3600000);
					}
				} else {
					if (!result.dst()) {
						result = new Date(+result + 3600000);
					}
				}
			}

			return result;
		},
		addMonths: function (value, num) {

			var result = new Date(value.getTime());
			var currentMonth = result.getMonth() + result.getFullYear() * 12;
			result.setMonth(result.getMonth() + num);
			var diff = result.getMonth() + result.getFullYear() * 12 - currentMonth;

			// If don't get the right number, set date to
			// last day of previous month
			if (diff != num) {
				result.setDate(0);
			}
			return result;
		},
		addYears: function (value, num) {
			var result = new Date(value.getTime());
			result.setFullYear(result.getFullYear() + num);
			return result;
		},
		daysInMonth: function (year, month) {
			switch (month) {
				case 1: return 31; // Jan
				case 2: return $.ig.Date.prototype.isLeapYear(year) ? 29 : 28; // Feb
				case 3: return 31; // Mar
				case 4: return 30; // Apr
				case 5: return 31; // May
				case 6: return 30; // Jun
				case 7: return 31; // Jul
				case 8: return 31; // Aug
				case 9: return 30; // Sep
				case 10: return 31; // Oct
				case 11: return 30; // Nov
				case 12: return 31; // Dec
			}

			// TODO: throw error here?
			return 0;
		},
		isLeapYear: function (year) {
			return year % 4 === 0 && year % 100 !== 0;
		},
		toFileTime: function (value) {
			return (value - new Date(1600, 11, 31, 19, 0, 0, 0)) * 10000;
		},
		fromFileTime: function (value) {

			// TODO: Test this
			return (value / 10000) + new Date(1600, 11, 31, 19, 0, 0, 0);
		},
		tryParse: function (s) {
			var date = new Date(s);
			if (date == null || $.ig.util.isNaN(+date)) {

				// IE8 does not support this format, so parse it manually
				var r = /(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/.exec(s);
				if (r) {
					if (r[ 4 ]) {
						return {
							p1: new Date(+r[ 1 ], +r[ 2 ] - 1, +r[ 3 ],
								+r[ 4 ], +r[ 5 ], +r[ 6 ]), ret: true
						};
					} else {
						return { p1: new Date(+r[ 1 ], +r[ 2 ] - 1, +r[ 3 ]), ret: true };
					}
				}

				return { p1: null, ret: false };
			}

			// TODO: Use the current date separator/date format here here?
			if (date.getFullYear() < 1930 && /\d+\/\d+\/\d\d(?!\d)/.test(s)) {
				date.setFullYear(date.getFullYear() + 100);
			}

			return { p1: date, ret: true };
		},
		parseExact: function (s, format, provider) {
			// TODO: Use the format and provider
			var r = $.ig.Date.prototype.tryParse(s);

			if (!r.ret) {
				throw new $.ig.FormatException("Unknown date format");
			}

			return r.p1;
		},
		toLocalTime: function (value) {

			// TODO: Implement
			return value;
		},
		toUniversalTime: function (value) {

			// TODO: Implement
			return value;
		},
		getMonth: function (value) {
			return value.getMonth() + 1;
		},
		today: function (value) {
			var r = new Date();
			r.setHours(0, 0, 0, 0);
			return r;
		},
		getTimeOfDay: function (value) {
			return (value.getHours() * 3600000) +
				(value.getMinutes() * 60000) +
				(value.getSeconds() * 1000) +
				value.getMilliseconds();
		},
		getDate: function (value) {
			return new Date(value - $.ig.Date.prototype.getTimeOfDay(value));
		},
		_requiresISOCorrection: !isNaN(+new Date("2000-01-01T00:00:00")) &&
			new Date("2000-01-01T00:00:00").getHours() !== 0,
		_requiresISODateCorrection: !isNaN(new Date("2000-01-01")) &&
			new Date("2000-01-01").getHours() !== 0,
		parse: function (s, provider) {
			provider = provider || $.ig.CultureInfo.prototype.currentCulture(); // TODO: Use the provider below
			var result;

			var isoTest = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.| )?(\d*)?/.exec(s);
			if (isoTest) {
				result = $.ig.Date.prototype.parseExact(isoTest[ 1 ]);
				if (isoTest[ 2 ]) {
					var ms = Number("0." + isoTest[ 2 ]) * 1000;
					result = new Date(+result + ms);
				}

				if (!$.ig.Date.prototype._requiresISOCorrection) {
					return result;
				}
			} else {
				result = $.ig.Date.prototype.parseExact(s);
				if (!$.ig.Date.prototype._requiresISODateCorrection) {
					return result;
				}
			}

			return new Date(result.getUTCFullYear(), result.getUTCMonth(), result.getUTCDate(),
				result.getUTCHours(), result.getUTCMinutes(),
				result.getUTCSeconds(), result.getUTCMilliseconds());
		},
		_longDateFormatOptions: {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		},
		toLongDateString: function (value) {
			return value.toLocaleString($.ig.CultureInfo.prototype.currentCulture().name(),
				this._longDateFormatOptions).replace(/\u200E/g, "");
		},
		_longTimeFormatOptions: { hour: "numeric", minute: "numeric", second: "numeric" },
		toLongTimeString: function (value) {
			return value.toLocaleString($.ig.CultureInfo.prototype.currentCulture().name(),
				this._longTimeFormatOptions).replace(/\u200E/g, "");
		},
		$type: new $.ig.Type("Date", $.ig.Object.$type)
	}, true);

	$.ig.extendNativePrototype(Date.prototype, "toOADate", function () {
		var result = (this - new Date(1899, 11, 30)) / 86400000;

		if (this.dst && this.dst()) {
			return result + (1 / 24);
		}

		return result;
	});

	$.ig.extendNativePrototype(Date.prototype, "kind", function () {
		return $.ig.DateTimeKind.prototype.local;
	});

	$.ig.Date.prototype.now = function () {
		return new Date();
	};
	$.ig.Date.prototype.minValue = function () {
		return new Date(1, 1, 1, 0, 0, 0, 0);
	};
	$.ig.Date.prototype.maxValue = function () {
		return new Date(9999, 12, 31, 23, 59, 59, 0.9999999);
	};
	$.ig.Date.prototype.fromMilliseconds = function (value) {
		return value;
	};

	$.ig.Date.prototype.toString = function (value, provider) {
		return $.ig.Date.prototype.toStringFormat(value, "s", provider);
	};

	// This polyfill for IE8 was written by Douglas Crockford, obtained from here:
	// https://github.com/douglascrockford/JSON-js/blob/master/json2.js
	if (!Date.prototype.toISOString) {
		// Here we rely on JSON serialization for dates because it matches
		// the ISO standard. However, we check if JSON serializer is present
		// on a page and define our own .toJSON method only if necessary
		if (!Date.prototype.toJSON) {
			Date.prototype.toJSON = function (key) {
				function f(n) {
					// Format integers to have at least two digits.
					return n < 10 ? "0" + n : n;
				}

				return this.getUTCFullYear() + "-" +
					f(this.getUTCMonth() + 1) + "-" +
					f(this.getUTCDate()) + "T" +
					f(this.getUTCHours()) + ":" +
					f(this.getUTCMinutes()) + ":" +
					f(this.getUTCSeconds()) + "Z";
			};
		}

		Date.prototype.toISOString = Date.prototype.toJSON;
	}

	$.ig.Date.prototype.toStringFormat = function (value, format, provider) {
		var result;
		provider = provider || $.ig.CultureInfo.prototype.currentCulture(); // TODO: Use the provider below
		switch (format) {
			case "s":
				{
					var s = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(),
						value.getHours(), value.getMinutes(), value.getSeconds())).toISOString();
					var d = s.lastIndexOf(".");
					if (d < 0) {
						return s;
					}

					return s.slice(0, d);
				}

			case "MMM":
				{

					// On some browsers, the ja-JP month short formatting seems to not match .NET"s "MMM" formatting
					var cultureName = provider.name();
					if (cultureName == "ja-JP") {
						result = value.toLocaleString("en-US", { month: "numeric" })
							.replace(/\u200E/g, "");
					} else {
						result = value.toLocaleString(provider.name(), { month: "short" })
							.replace(/\u200E/g, "");
					}

					if (result.contains(" ")) {

						// Date.toLocaleString is not supported fully
						// TODO: Handle other cultures?
						return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
							"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][ value.getMonth() ];
					}

					return result;
				}

			case "MMMM":
				return value.toLocaleString(provider.name(), { month: "long" })
					.replace(/\u200E/g, "");

			case "ddd":
				return value.toLocaleString(provider.name(), { weekday: "short" })
					.replace(/\u200E/g, "");

			case "dddd":
				{
					result = value.toLocaleString(provider.name(), { weekday: "long" })
						.replace(/\u200E/g, "");

					if (result.contains(" ")) {

						// Date.toLocaleString is not supported fully
						// TODO: Handle other cultures?
						return [ "Sunday", "Monday", "Tuesday", "Wednesday",
							"Thursday", "Friday", "Saturday" ][ value.getDay() ];
					}

					return result;
				}

			case "tt":
				return value.getHours() <= 11 ? "AM" : "PM"; // TODO: Figure out how to get this based on culture

			case "%t":
				return value.getHours() <= 11 ? "A" : "P"; // TODO: Figure out how to get this based on culture
		}

		throw new $.ig.FormatException(1, "Unknown Date format: " + format);
	};

	// implement casting
	$.ig.util.canAssign = function (targetType, type) {
		if (targetType.name === "Nullable$1" && type.name !== "Nullable$1") {
			targetType = $.ig.Nullable.prototype.getUnderlyingType(targetType);
		}

		return $.ig.util.canAssignSimple(targetType, type);
	};

	$.ig.util.canAssignSimple = function (targetType, type) {
		if (targetType === type || $.ig.Type.prototype.checkEquals(targetType, type)) {
			return true;
		}
		if (type.interfaces) {
			for (var i = 0; i < type.interfaces.length; i++) {
				if ($.ig.util.canAssignSimple(targetType, type.interfaces[ i ])) {
					return true;
				}
			}
		}
		if (type.baseType) {
			return $.ig.util.canAssignSimple(targetType, type.baseType);
		}

		return false;
	};

	$.ig.util.cast = function (targetType, obj) {
		if (obj === undefined || obj === null) {
			return null;
		}

		if (targetType === Array) {
			return (obj instanceof Array) ? obj : null;
		}

		if (targetType === String) {
			targetType = $.ig.String.prototype.$type;
		}

		var type = obj;

		if (obj.$type) {
			type = obj.$type;
		} else if (typeof obj === "number") {
			type = targetType === Number ? Number : $.ig.Number.prototype.$type;
		} else if (typeof obj === "string") {
			type = $.ig.String.prototype.$type;
		} else if (typeof obj === "boolean") {
			type = $.ig.Boolean.prototype.$type;
		} else if (obj instanceof Date) {
			type = $.ig.Date.prototype.$type;
		}

		if ($.ig.util.canAssignSimple(targetType, type)) {
			return obj;
		}

		if (targetType.name === "Nullable$1" && type.name !== "Nullable$1") {
			targetType = $.ig.Nullable.prototype.getUnderlyingType(targetType);
			if ($.ig.util.canAssignSimple(targetType, type)) {
				return $.ig.util.toNullable(targetType, obj);
			}

			return $.ig.util.toNullable(targetType, null);
		}

		return null;
	};

	$.ig.Dictionary = Class.extend({
		init: function () {
			this.proxy = {};
			this.keysHolder = this.proxy;
			this._count = 0;
		},
		$type: new $.ig.Type("Dictionary", $.ig.Object.prototype.$type),
		proxy: null
	}, true);

	$.ig.Dictionary.prototype.getDictionary = function (o) {
		var dict = new $.ig.Dictionary();
		dict.proxy = o;
		dict.keysHolder = o;
		return dict;
	};

	$.ig.Dictionary.prototype.containsKey = function (key) {
		return this.proxy[ key ] !== undefined;
	};

	$.ig.Dictionary.prototype.count = function () {
		return this._count;
	};

	$.ig.Dictionary.prototype.item = function (key, value) {
		if (arguments.length === 1) {
			return this.proxy[ key ];
		} else {
			if (!this.proxy[ key ]) {
				this._count++;
			}
			this.proxy[ key ] = value;
		}
	};

	$.ig.Dictionary.prototype.add = function (key, value) {
		if (!this.proxy[ key ]) {
			this._count++;
		}
		this.proxy[ key ] = value;
	};

	$.ig.Dictionary.prototype.remove = function (key) {
		delete this.proxy[ key ];
		this._count--;
	};

	$.ig.Dictionary.prototype.keys = function () {
		return new $.ig.KeyEnumerator(this);
	};

	$.ig.Dictionary.prototype.values = function () {
		return new $.ig.ValueEnumerator(this);
	};

	$.ig.Dictionary.prototype.clear = function () {
		this.proxy = {};
		this.keysHolder = this.proxy;
		this._count = 0;
	};

	$.ig.EventArgs = $.ig.Object.extend({
		init: function () {

		}
	}, true);

	$.ig.String = Class.extend({
		$type: new $.ig.Type("String", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.String.prototype.isDigit = function (str, index) {
		index = index || 0;
		var ch = str.charAt(index);
		if (ch >= "0" && ch <= "9") {
			return true;
		}

		return false;
	};

	$.ig.String.prototype.charMaxValue = function (s) {
		return "\uffff";
	};

	$.ig.String.prototype.charMinValue = function (s) {
		return "\u0000";
	};

	$.ig.Boolean = Class.extend({
		tryParse: function (value) {

			value = value.toLowerCase();
			if (value == "true") {
				return { p1: true, ret: true };
			} else if (value == "false") {
				return { p1: false, ret: true };
			}

			return { p1: false, ret: false };
		},
		$type: new $.ig.Type("Boolean", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.Number = Class.extend({
		$type: new $.ig.Type("Number", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.Number.prototype.parseInt = function (a, b) {
		return parseInt(a, b);
	};

	$.ig.Number.prototype.log10 = function (x) {
		return Math.log(x) / Math.log(10);
	};

	if (!Number.isPrimitive) {
		Number.isPrimitive = function () { return true; };
	}

	if (!String.isPrimitive) {
		String.isPrimitive = function () { return false; };
	}

	$.ig.extendNativePrototype(String.prototype, "toDateTime", function (provider) {
		var result = new Date(this);
		if (!isNaN(+result)) {
			return result;
		}

		// TODO: Cache this regex?
		if (/^((([0-9]{1,4})\s*(\s+((a|p)m?)\s*))|(([0-9]{1,4})\s*:\s*([0-9]?[0-9])\s*(:\s*([0-9]?[0-9])\s*(.\s*([0-9]{0,4})[0-9]*\s*)?)?(\s+((a|p)m?)\s*)?)|(\s*([0-9]?[0-9])\s*:\s*([0-9]?[0-9])\s*.\s*([0-9]{0,4})[0-9]*\s*(\s+((a|p)m?)\s*)?))$/i.test(this)) {
			// The string can be a time string only, in which case we should return today at that time.
			return new Date(new Date().toDateString() + " " + this);
		}

		throw new $.ig.FormatException(1, "The string cannot be converted to a date");
	});

	$.ig.extendNativePrototype(String.prototype, "toDecimal", function (provider) {
		var result = +this;

		if ($.ig.util.isNaN(result)) {
			throw new $.ig.FormatException(1, "The string cannot be converted to a number");
		}

		return result;
	});

	$.ig.extendNativePrototype(String.prototype, "toString1", function (provider) {
		return this.toString();
	});

	String.isInstanceOfType = function (value) {
		return typeof value == "string";
	};

	$.ig.extendNativePrototype(Number.prototype, "toDecimal", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Number.prototype, "toDouble", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Number.prototype, "toString1", function (provider) {
		return this.toLocaleString(provider.name(), { useGrouping: false }); // TODO: Figure out how to use the provider correctly here
	});

	$.ig.extendNativePrototype(Date.prototype, "getType", function (provider) {
		return $.ig.Date.prototype.$type;
	});

	$.ig.extendNativePrototype(Date.prototype, "equals", function (other) {
		return other instanceof Date && +this === +other;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "getHashCode", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toByte", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toSByte", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt16", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt16", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt32", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt32", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt64", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt64", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toSingle", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toDouble", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toDecimal", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toBoolean", function (provider) {
		/*jshint -W018 */
		return !!+this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toString1", function (provider) {
		return this.toString();
	});

	$.ig.extendNativePrototype(Boolean.prototype, "compareTo", function (other) {
		return $.ig.util.boolCompare(this, other);
	});

	$.ig.extendNativePrototype(Number.prototype, "compareTo", function (other) {
		return $.ig.util.compareSimple(+this, other);
	});

	$.ig.Single = Class.extend({

	}, true);

	$.ig.Single.prototype.parseFloat = function (s) {
		return parseFloat(s);
	};

	$.ig.Single.prototype.isInfinity = function (s) {
		return s === Infinity || s === -Infinity;
	};

	$.ig.Int32 = Class.extend({
		$type: new $.ig.Type("Int32", $.ig.Object.prototype.$type,
			[ $.ig.IComparable.prototype.$type, $.ig.IComparable$1.prototype.$type.specialize(-1),
				$.ig.IEquatable$1.prototype.$type.specialize(-1) ])
	}, true);
	$.ig.Int32.prototype.$type.initSelfReferences();

	$.ig.Double = Class.extend({
		$type: new $.ig.Type("Double", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Delegate = Class.extend({
		$type: new $.ig.Type("Delegate", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Delegate.prototype.combine = function (del1, del2) {
		if (!del1) {
			return del2;
		}

		if (!del2) {
			return del1;
		}

		var ret = function () {
			del1.apply(null, arguments);
			return del2.apply(null, arguments);
		};
		ret.enumerate = function (arr) {
			if (del1) {
				if (del1.enumerate) {
					del1.enumerate(arr);
				} else {
					arr.push(del1);
				}
			}
			if (del2) {
				if (del2.enumerate) {
					del2.enumerate(arr);
				} else {
					arr.push(del2);
				}
			}
		};

		return ret;
	};

	$.ig.Delegate.prototype.remove = function (del1, del2) {
		if (!del1) {
			return null;
		}
		if (!del2) {
			return del1;
		}

		var arr = [ ];
		var del = null;
		if (del1.enumerate) {
			del1.enumerate(arr);
		} else {
			arr.push(del1);
		}

		for (var i = 0; i < arr.length; i++) {
			if (del2.original) {
				if (arr[ i ].original == del2.original &&
					arr[ i ].target == del2.target) {
					continue;
				}
			}

			if (arr[ i ] == del2) {
				continue;
			}

			del = $.ig.Delegate.prototype.combine(del, arr[ i ]);
		}

		return del;
	};

	$.ig.ReflectionUtil = Class.extend({
		$type: new $.ig.Type("ReflectionUtil", $.ig.Object.prototype.$type)
	}, true);

	$.ig.ReflectionUtil.prototype.getPropertyGetter = function (type, propertyName) {
		if (typeof type.prototype[ propertyName ] === "function") {
			return function (instance) {
				return type.prototype[ propertyName ].apply(instance, arguments);
			};
		}

		return function (instance) {
			return instance[ propertyName ];
		};
	};

	$.ig.IEnumerable = Class.extend({
		$type: new $.ig.Type("IEnumerable", null)
	}, true);

	$.ig.IEnumerator = Class.extend({
		$type: new $.ig.Type("IEnumerator", null)
	}, true);

	$.ig.IEqualityComparer$1 = Class.extend({
		$type: new $.ig.Type("IEqualityComparer", $.ig.Object.prototype.$type)
	}, true);

	$.ig.IList = Class.extend({
		$type: new $.ig.Type("IList", null, [ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IEnumerable$1 = Class.extend({
		$type: new $.ig.Type("IEnumerable$1", null, [ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.ICollection$1 = Class.extend({
		$type: new $.ig.Type("ICollection$1", null,
			[ $.ig.IEnumerable$1.prototype.$type.specialize(0), $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IList$1 = Class.extend({
		$type: new $.ig.Type("IList$1", null,
			[ $.ig.ICollection$1.prototype.$type.specialize(0),
				$.ig.IEnumerable$1.prototype.$type.specialize(0),
				$.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IEnumerator$1 = Class.extend({
		$type: new $.ig.Type("IEnumerator$1", null, [ $.ig.IEnumerator.prototype.$type ])
	}, true);

	$.ig.Error = Class.extend({
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}
			this.__message = null;
			this.__innerException = null;
		},
		init1: function (initNumber, message) {
			this.__message = message;
		},
		init2: function (initNumber, message, innerException) {
			this.__message = message;
			this.__innerException = innerException;
		},
		toString: function () {
			return this.message();
		},
		$type: new $.ig.Type("Error", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Error.prototype.message = function () {
		return this.__message;
	};

	$.ig.Error.prototype.innerException = function () {
		return this.__innerException;
	};

	$.ig.IDictionary = Class.extend({
		$type: new $.ig.Type("IDictionary", null)
	}, true);

	$.ig.ValueEnumerator = Class.extend({
		init: function (dict) {
			this._dict = dict;
			this._index = -1;
			this._count = 0;
			this._values = [ ];
			for (var item in this._dict.proxy) {
				if (this._dict.proxy.hasOwnProperty(item)) {
					this._values[ this._count ] = this._dict.proxy[ item ];
					this._count++;
				}
			}
		},
		current: function () {
			return this._values[ this._index ];
		},
		dispose: function () {
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._count);
		},
		reset: function () {
			this._index = -1;
		},
		getEnumerator: function () {
			this.reset();
			return this;
		},
		$type: new $.ig.Type("ValueEnumerator", $.ig.Object.prototype.$type,
			[ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.KeyEnumerator = Class.extend({

		init: function (dict) {
			this._dict = dict;
			this._index = -1;
			this._count = 0;
			this._keys = [ ];
			for (var item in this._dict.proxy) {
				if (this._dict.proxy.hasOwnProperty(item)) {
					this._keys[ this._count ] = item;
					this._count++;
				}
			}
		},
		current: function () {
			return this._keys[ this._index ];
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._count);
		},
		reset: function () {
			this._index = -1;
		},
		getEnumerator: function () {
			this.reset();
			return this;
		},
		$type: new $.ig.Type("KeyEnumerator", $.ig.Object.prototype.$type,
			[ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.truncate = function (val) {
		if (val >= 0) {
			return Math.floor(val);
		} else {
			return Math.ceil(val);
		}
	};

	$.ig.intDivide = function (int1, int2) {
		var result = int1 / int2;
		return $.ig.truncate(result);
	};

	$.ig.Nullable = Class.extend({
		getUnderlyingType: function (nullableType) {
			if (nullableType.isGenericType !== undefined && nullableType.isGenericType() &&
				!nullableType.isGenericTypeDefinition() &&
				$.ig.Nullable$1.prototype.$type.typeName() == nullableType.typeName()) {
				return nullableType.genericTypeArguments()[ 0 ];
			}

			return null;
		},

		$type: new $.ig.Type("Nullable", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Nullable$1 = Class.extend({
		$t: null,
		init: function ($t, value) {
			this.$t = $t;
			this.$type = this.$type.specialize(this.$t);
			$.ig.Object.prototype.init.call(this);

			if (value !== undefined) {
				this._value = value;
			}
		},
		equals: function (value) {
			return $.ig.util.nullableEquals(this, value);
		},
		getHashCode: function () {
			return this._value === null ? 0 : this._value.getHashCode();
		},
		hasValue: function () {
			return this._value !== null;
		},
		toString: function () {
			return this._value === null ? "" : this._value.toString();
		},
		_value: null,
		value: function (value) {
			if (arguments.length === 1) {
				this._value = value;
				return value;
			} else {
				return this._value;
			}
		},
		getValueOrDefault: function () {
			if (this.hasValue()) {
				return this._value;
			} else {
				return this.getDefaultValue();
			}
		},
		getDefaultValue: function () {
			if ($.ig.util.canAssign($.ig.Number.prototype.$type, this.$t)) {
				return 0;
			} else if ($.ig.util.canAssign($.ig.Boolean.prototype.$type, this.$t)) {
				return false;
			} else if (this.$t.baseType == $.ig.ValueType.prototype.$type) {
				return $.ig.util.createInstance(this.$t);
			} else {
				return null;
			}
		},
		getValueOrDefault1: function (defaultValue) {
			if (this.hasValue()) {
				return this._value;
			} else {
				return defaultValue;
			}
		},
		preIncrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			this._value++;
			return this;
		},
		preDecrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			this._value--;
			return this;
		},
		postIncrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			var originalValue = this._value;
			this._value++;
			return new $.ig.Nullable$1(this.$t, originalValue);
		},
		postDecrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			var originalValue = this._value;
			this._value--;
			return new $.ig.Nullable$1(this.$t, originalValue);
		},
		isNullable: true,
		$type: new $.ig.Type("Nullable$1", $.ig.Object.prototype.$type)
	}, true);

	$.ig.util.toNullable = function (t, value) {

		if (value == null) {
			return t._$nullNullable || (t._$nullNullable = new $.ig.Nullable$1(t, value));
		} else if (value.isNullable) {
			return value;
		}

		return new $.ig.Nullable$1(t, value);
	};

	$.ig.util.toLowerCase = function (c) {
		return c.toLowerCase();
	};

	$.ig.util.isLower = function (c) {
		return c === c.toLowerCase();
	};

	$.ig.util.isLetterOrDigit = function (c) {
		var charCode = c.charCodeAt(0);

		// "a" <= c && c <= "z"
		if (97 <= charCode && charCode <= 122) {
			return true;
		}

		// "A" <= c && c <= "Z"
		if (65 <= charCode && charCode <= 90) {
			return true;
		}

		// "0" <= c && c <= "9"
		if (48 <= charCode && charCode <= 57) {
			return true;
		}

		if (charCode <= 0x7F) {
			return false;
		}

		return $.ig.unicode_hack("(\\p{L}|\\p{Nd})").test(c); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	};

	$.ig.util.isLetter = function (c) {
		var charCode = c.charCodeAt(0);

		// "a" <= c && c <= "z"
		if (97 <= charCode && charCode <= 122) {
			return true;
		}

		// "A" <= c && c <= "Z"
		if (65 <= charCode && charCode <= 90) {
			return true;
		}

		if (charCode <= 0x7F) {
			return false;
		}

		return $.ig.unicode_hack("\\p{L}").test(c); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	};

	$.ig.util.isDigit1 = function (c, index) {
		return $.ig.util.isDigit(c[ index ]);
	};

	$.ig.util.isDigit = function (c) {
		var charCode = c.charCodeAt(0);

		// "0" <= c && c <= "9"
		if (48 <= charCode && charCode <= 57) {
			return true;
		}

		if (charCode <= 0x7F) {
			return false;
		}

		return $.ig.unicode_hack("\\p{Nd}").test(c); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	};

	$.ig.util.isNumber = function (c) {
		var charCode = c.charCodeAt(0);

		// "0" <= c && c <= "9"
		if (48 <= charCode && charCode <= 57) {
			return true;
		}

		if (charCode <= 0x7F) {
			return false;
		}

		return $.ig.unicode_hack("\\p{N}").test(c); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	};

	$.ig.util.toUpperCase = function (c) {
		return c.toUpperCase();
	};

	$.ig.util.concat = function (v1, v2) {
		if (v1 == null) {
			v1 = "";
		} else if (!!v1.isNullable) {
			v1 = v1.getValueOrDefault1("");
		}

		if (v2 == null) {
			v2 = "";
		} else if (!!v2.isNullable) {
			v2 = v2.getValueOrDefault1("");
		}

		return v1.toString() + v2.toString();
	};

	$.ig.util.nullableAdd = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 + val2);
	};

	$.ig.util.nullableSubtract = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 - val2);
	};

	$.ig.util.nullableMultiply = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 * val2);
	};

	$.ig.util.nullableDivide = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 / val2);
	};

	$.ig.util.nullableModulus = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 % val2);
	};

	$.ig.util.nullableGreaterThan = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 > val2;
	};

	$.ig.util.nullableGreaterThanOrEqual = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 >= val2;
	};

	$.ig.util.nullableLessThan = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 < val2;
	};

	$.ig.util.nullableLessThanOrEqual = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 <= val2;
	};

	$.ig.util.nullableIsNull = function (v) {
		/*jshint eqnull:true */
		return v == null || (!!v.isNullable && !v.hasValue());
	};

	$.ig.util.nullableEquals = function (v1, v2) {
		/*jshint eqnull:true */
		var v1IsNull = (v1 == null) || (!!v1.isNullable && !v1.hasValue());
		var v2IsNull = (v2 == null) || (!!v2.isNullable && !v2.hasValue());

		if (v1IsNull && v2IsNull) {
			return true;
		}
		if (v1IsNull != v2IsNull) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 == val2;
	};

	$.ig.util.nullableNotEquals = function (v1, v2) {
		return !$.ig.util.nullableEquals(v1, v2);
	};

	$.ig.util.unwrapNullable = function (v) {
		/*jshint eqnull:true */
		if (v == null || !v.isNullable) {
			return v;
		}

		if (!v.hasValue()) {
			return null;
		}

		return v.value();
	};

	$.ig.util.wrapNullable = function ($t, v) {
		/*jshint eqnull:true */
		if (v != null && v.isNullable) {
			return v;
		}

		return $.ig.util.toNullable($t, v);
	};

	$.ig.util.getColorStringSafe = function (v) {
		/*jshint eqnull:true */
		return v == null ? null : v.colorString();
	};

	$.ig.util.wellKnownColors = {
		aliceblue: "f0f8ff",
		antiquewhite: "faebd7",
		aqua: "00ffff",
		aquamarine: "7fffd4",
		azure: "f0ffff",
		beige: "f5f5dc",
		bisque: "ffe4c4",
		black: "000000",
		blanchedalmond: "ffebcd",
		blue: "0000ff",
		blueviolet: "8a2be2",
		brown: "a52a2a",
		burlywood: "deb887",
		cadetblue: "5f9ea0",
		chartreuse: "7fff00",
		chocolate: "d2691e",
		coral: "ff7f50",
		cornflowerblue: "6495ed",
		cornsilk: "fff8dc",
		crimson: "dc143c",
		cyan: "00ffff",
		darkblue: "00008b",
		darkcyan: "008b8b",
		darkgoldenrod: "b8860b",
		darkgray: "a9a9a9",
		darkgreen: "006400",
		darkkhaki: "bdb76b",
		darkmagenta: "8b008b",
		darkolivegreen: "556b2f",
		darkorange: "ff8c00",
		darkorchid: "9932cc",
		darkred: "8b0000",
		darksalmon: "e9967a",
		darkseagreen: "8fbc8f",
		darkslateblue: "483d8b",
		darkslategray: "2f4f4f",
		darkturquoise: "00ced1",
		darkviolet: "9400d3",
		deeppink: "ff1493",
		deepskyblue: "00bfff",
		dimgray: "696969",
		dodgerblue: "1e90ff",
		feldspar: "d19275",
		firebrick: "b22222",
		floralwhite: "fffaf0",
		forestgreen: "228b22",
		fuchsia: "ff00ff",
		gainsboro: "dcdcdc",
		ghostwhite: "f8f8ff",
		gold: "ffd700",
		goldenrod: "daa520",
		gray: "808080",
		green: "008000",
		greenyellow: "adff2f",
		honeydew: "f0fff0",
		hotpink: "ff69b4",
		indianred: "cd5c5c",
		indigo: "4b0082",
		ivory: "fffff0",
		khaki: "f0e68c",
		lavender: "e6e6fa",
		lavenderblush: "fff0f5",
		lawngreen: "7cfc00",
		lemonchiffon: "fffacd",
		lightblue: "add8e6",
		lightcoral: "f08080",
		lightcyan: "e0ffff",
		lightgoldenrodyellow: "fafad2",
		lightgrey: "d3d3d3",
		lightgreen: "90ee90",
		lightpink: "ffb6c1",
		lightsalmon: "ffa07a",
		lightseagreen: "20b2aa",
		lightskyblue: "87cefa",
		lightslateblue: "8470ff",
		lightslategray: "778899",
		lightsteelblue: "b0c4de",
		lightyellow: "ffffe0",
		lime: "00ff00",
		limegreen: "32cd32",
		linen: "faf0e6",
		magenta: "ff00ff",
		maroon: "800000",
		mediumaquamarine: "66cdaa",
		mediumblue: "0000cd",
		mediumorchid: "ba55d3",
		mediumpurple: "9370d8",
		mediumseagreen: "3cb371",
		mediumslateblue: "7b68ee",
		mediumspringgreen: "00fa9a",
		mediumturquoise: "48d1cc",
		mediumvioletred: "c71585",
		midnightblue: "191970",
		mintcream: "f5fffa",
		mistyrose: "ffe4e1",
		moccasin: "ffe4b5",
		navajowhite: "ffdead",
		navy: "000080",
		oldlace: "fdf5e6",
		olive: "808000",
		olivedrab: "6b8e23",
		orange: "ffa500",
		orangered: "ff4500",
		orchid: "da70d6",
		palegoldenrod: "eee8aa",
		palegreen: "98fb98",
		paleturquoise: "afeeee",
		palevioletred: "d87093",
		papayawhip: "ffefd5",
		peachpuff: "ffdab9",
		peru: "cd853f",
		pink: "ffc0cb",
		plum: "dda0dd",
		powderblue: "b0e0e6",
		purple: "800080",
		red: "ff0000",
		rosybrown: "bc8f8f",
		royalblue: "4169e1",
		saddlebrown: "8b4513",
		salmon: "fa8072",
		sandybrown: "f4a460",
		seagreen: "2e8b57",
		seashell: "fff5ee",
		sienna: "a0522d",
		silver: "c0c0c0",
		skyblue: "87ceeb",
		slateblue: "6a5acd",
		slategray: "708090",
		snow: "fffafa",
		springgreen: "00ff7f",
		steelblue: "4682b4",
		tan: "d2b48c",
		teal: "008080",
		thistle: "d8bfd8",
		tomato: "ff6347",
		turquoise: "40e0d0",
		violet: "ee82ee",
		violetred: "d02090",
		wheat: "f5deb3",
		white: "ffffff",
		whitesmoke: "f5f5f5",
		yellow: "ffff00",
		yellowgreen: "9acd32"
	};

	$.ig.util.stringToColor = function (str) {
		var ret = {
			a: 255,
			r: 0,
			g: 0,
			b: 0
		};

		var asColorName = str.replace(" ", "").toLowerCase();

		if (asColorName === "transparent") {
			return { a: 0, r: 0, g: 0, b: 0 };
		}

		if ($.ig.util.wellKnownColors[ asColorName ] !== undefined) {
			str = $.ig.util.wellKnownColors[ asColorName ];
		}
		var parts;
		if (str.lastIndexOf("rgba", 0) === 0) {
			str = str.replace("rgba", "").replace(" ", "").replace("(", "").replace(")", "");
			parts = str.split(",");
			ret.r = parseInt(parts[ 0 ], 10);
			ret.g = parseInt(parts[ 1 ], 10);
			ret.b = parseInt(parts[ 2 ], 10);
			ret.a = parseFloat(parts[ 3 ]) * 255.0;
		} else if (str.lastIndexOf("rgb", 0) === 0) {
			str = str.replace("rgb", "").replace(" ", "").replace("(", "").replace(")", "");
			parts = str.split(",");
			ret.r = parseInt(parts[ 0 ], 10);
			ret.g = parseInt(parts[ 1 ], 10);
			ret.b = parseInt(parts[ 2 ], 10);
		} else {
			str = str.replace("#", "").replace(" ", "");
			if (str.length === 6) {
				ret.r = parseInt(str.substr(0, 2), 16);
				ret.g = parseInt(str.substr(2, 2), 16);
				ret.b = parseInt(str.substr(4, 2), 16);
			} else if (str.length === 3) {
				ret.r = parseInt(str.substr(0, 1) + str.substr(0, 1), 16);
				ret.g = parseInt(str.substr(1, 1) + str.substr(1, 1), 16);
				ret.b = parseInt(str.substr(2, 1) + str.substr(2, 1), 16);
			}
		}
		return ret;
	};

	$.ig.util.rgbToHex = function (color) {
		/* Convert color from RGB to HEX format. null if non-rgb color is provided.
			paramType="string" optional="false" Color in RGB format.
			returnType="string|null" Returns converted color from RGB to HEX format. null if non-rgb color is provided.
		*/
		var r, g, b, colHex = null;

		if (color.charAt(0) === "r") {
			color = color.replace("rgb(", "").replace(")", "").split(",");
			r = parseInt(color[ 0 ], 10).toString(16);
			g = parseInt(color[ 1 ], 10).toString(16);
			b = parseInt(color[ 2 ], 10).toString(16);
			r = r.length === 1 ? "0" + r : r;
			g = g.length === 1 ? "0" + g : g;
			b = b.length === 1 ? "0" + b : b;
			colHex = "#" + r + g + b;
		}
		return colHex;
	};

	$.ig.util.isResponseTypeSupported = function (responseType) {
		var xhr = null;
		try {
			xhr = new XMLHttpRequest();
			xhr.open("GET", "/");
			xhr.responseType = responseType;
		} catch (e) {
			return false;
		}
		if (xhr === null) {
			return false;
		}
		return xhr.responseType === responseType;
	};

	$.ig.util.getBinary = function (url, callback, error) {
		var data, ret, req, useVbArray = false,
		arrayBufferSupported = $.ig.util.isResponseTypeSupported("arraybuffer") &&
			typeof Uint8Array != "undefined";

		if (typeof XMLHttpRequest == "undefined") {
			try { req = new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
			catch (e) { }
			try { req = new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
			catch (e) { }
			req = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			req = new XMLHttpRequest();
		}

		if (!arrayBufferSupported) {
			if (req.overrideMimeType) {
				req.overrideMimeType("text/plain; charset=x-user-defined");
			}
		}

		if (typeof VBArray != "undefined") {
			useVbArray = true;
		}

		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					if (arrayBufferSupported && typeof this.response != "undefined") {
						callback(new Uint8Array(this.response));
					} else {
						if (useVbArray) {
							data = new VBArray(req.responseBody).toArray();
							for (var i = 0; i < data.length; i++) {
								data[ i ] = String.fromCharCode(data[ i ]);
							}
							ret = data.join("");
							callback(ret);
						} else {
							callback(req.responseText);
						}
					}
				} else {
					error(req.error);
				}
			}
		};

		req.open("GET", url, true);
		if (arrayBufferSupported) {
			req.responseType = "arraybuffer";
		}
		req.send(null);
	};

	$.ig.util.extCopy = function (source, bindings) {
		var i, j, k;
		if (typeof source == "undefined" || !source) {
			return;
		}
		for (j = 0; j < bindings.length; j++) {
			var dests = bindings[ j ][ 0 ];
			var meths = bindings[ j ][ 1 ];
			for (k = 0; k < dests.length; k++) {
				for (i = 0; i < meths.length; i++) {
					if (typeof dests[ k ] == "undefined" || !dests[ k ] ||
						typeof meths[ i ] == "undefined" || !meths[ i ]) {
						continue;
					}

					//A.T. make sure the translated code uses a similar approach to using defineProperty
					//dests[ k ].prototype[ meths[ i ] ] = source.prototype[ meths[ i ] ];
					$.ig.extendNativePrototype(dests[ k ].prototype, meths[ i ],
						source.prototype[ meths[ i ] ]);
				}
			}
		}
	};

	$.ig.$currDefinitions = null;
	$.ig.$allDefinitions = [ ];

	$.ig.util.getDefinedNameAndNamespace = function (name) {
		var ns = $.ig;
		var nParts = name.split(".");
		if (nParts.length != 1) {
			for (var i = 0; i < nParts.length - 1; i++) {
				var nsName = nParts[ i ];
				if (!ns[ nsName ]) {
					ns[ nsName ] = {};
				}

				ns = ns[ nsName ];
			}

			name = nParts[ nParts.length - 1 ];
		}

		return { name: name, namespace: ns };
	};

	$.ig.util.bulkDefine = function (toDefine) {
		var i = 0, curr = null, els = null;
		for (i = 0; i < toDefine.length; i++) {
			curr = toDefine[ i ];
			els = curr.split(":");
			curr = els[ 0 ];
			var info = $.ig.util.getDefinedNameAndNamespace(curr);

			info.namespace[ info.name ] = info.namespace[ info.name ] ||
				Class.extend({
					$type: new $.ig.Type(curr, $.ig.Object.prototype.$type),
					$placeholder: true
				}, true);
			if (els.length > 1 && $.ig.$currDefinitions) {
				$.ig.$currDefinitions[ els[ 1 ] ] = info.namespace[ info.name ];
				$.ig.$currDefinitions[ "$" + els[ 1 ] ] = info.namespace[ info.name ].prototype;
				$.ig.$currDefinitions[ "$_" + curr ] = els[ 1 ];
			}
			if ($.ig.$allDefinitions && $.ig.$allDefinitions.indexOf($.ig.$currDefinitions) < 0) {
				$.ig.$allDefinitions.push($.ig.$currDefinitions);
			}
		}
	};

	$.ig.util.defType = function (name, baseName, definition) {
		var els = null, i, currDefs, shortName;
		els = name.split(":");
		name = els[ 0 ];

		var info = $.ig.util.getDefinedNameAndNamespace(name);

		var result = info.namespace[ info.name ];

		if (!result || result.prototype.$placeholder) {
			var baseInfo = $.ig.util.getDefinedNameAndNamespace(baseName);
			result = baseInfo.namespace[ baseInfo.name ].extend(definition);
			info.namespace[ info.name ] = result;
		}

		if (els.length > 1 && $.ig.$currDefinitions) {
			$.ig.$currDefinitions[ els[ 1 ] ] = result;
			$.ig.$currDefinitions[ "$" + els[ 1 ] ] = result.prototype;
			$.ig.$currDefinitions[ "$_" + name ] = els[ 1 ];

			if ($.ig.$allDefinitions) {
				for (i = 0; i < $.ig.$allDefinitions.length; i++) {
					currDefs = $.ig.$allDefinitions[ i ];
					if (currDefs[ "$_" + name ] !== undefined) {
						shortName = currDefs[ "$_" + name ];
						currDefs[ shortName ] = result;
						currDefs[ "$" + shortName ] = result.prototype;
					}
				}
			}
		}

		return result;
	};

	$.ig.util.getClassCount = function (classNamePrefix, isPrefix) {
		var styleSheets = document.styleSheets, numFound = 0, count = 0,
			currSheet, rules, currSelector, currVal;
		classNamePrefix = classNamePrefix.toLowerCase();
		if (!styleSheets) {
			return 0;
		}
		for (var i = 0; i < styleSheets.length; i++) {
			try {
				currSheet = styleSheets[ i ];
				rules = currSheet.rules ? currSheet.rules : currSheet.cssRules;
				if (!rules) {
					continue;
				}
				for (var j = 0; j < rules.length; j++) {
					currSelector = rules[ j ].selectorText;
					if (currSelector) {
						currSelector = currSelector.toLowerCase();
						if (isPrefix) {
							if (currSelector.indexOf(classNamePrefix) === 0) {
								currVal = parseInt(currSelector.replace(classNamePrefix, ""), 10);
								if (isNaN(currVal)) {
									count++;
								} else {
									numFound = Math.max(numFound, currVal);
								}
							}
						} else {
							if (currSelector == classNamePrefix) {
								numFound++;
							}
						}
					}
				}
			} catch (e) {

				//ignore cross domain sheets.
			}
		}
		return Math.max(numFound, count);
	};
	$.ig.util._isCanvasSupported = function () {
		var canvas = document.createElement("canvas");
		return !!(canvas.getContext && canvas.getContext("2d"));
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
	/*jshint -W100 */ // jscs:disable
	var globalInfo = { "invariant": { c: "¤", d: "MM/dd/yyyy" }, 127: "invariant",
		"af": { c: "R", d: "yyyy/MM/dd" }, 54: "af", "af-ZA": { c: "R", d: "yyyy/MM/dd" }, 1078: "af-ZA", "am": { c: "ETB", d: "d/M/yyyy" }, 94: "am", "am-ET": { c: "ETB", d: "d/M/yyyy" }, 1118: "am-ET", "ar": { c: "ر.س.‏", d: "dd/MM/yy", n: "٠١٢٣٤٥٦٧٨٩" }, 1: "ar", "ar-AE": { c: "د.إ.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 14337: "ar-AE", "ar-BH": { c: "د.ب.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 15361: "ar-BH", "ar-DZ": { c: "د.ج.‏", d: "dd-MM-yyyy" }, 5121: "ar-DZ", "ar-EG": { c: "ج.م.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 3073: "ar-EG", "ar-IQ": { c: "د.ع.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 2049: "ar-IQ", "ar-JO": { c: "د.ا.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 11265: "ar-JO", "ar-KW": { c: "د.ك.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 13313: "ar-KW", "ar-LB": { c: "ل.ل.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 12289: "ar-LB", "ar-LY": { c: "د.ل.‏‏", d: "dd/MM/yyyy" }, 4097: "ar-LY", "ar-MA": { c: "د.م.‏‏", d: "dd-MM-yyyy" }, 6145: "ar-MA", "arn": { c: "$", d: "dd-MM-yyyy" }, 122: "arn", "arn-CL": { c: "$", d: "dd-MM-yyyy" }, 1146: "arn-CL", "ar-OM": { c: "ر.ع.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 8193: "ar-OM", "ar-QA": { c: "ر.ق.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 16385: "ar-QA", "ar-SA": { c: "ر.س.‏", d: "dd/MM/yy", n: "٠١٢٣٤٥٦٧٨٩" }, 1025: "ar-SA", "ar-SY": { c: "ل.س.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 10241: "ar-SY", "ar-TN": { c: "د.ت.‏‏", d: "dd-MM-yyyy" }, 7169: "ar-TN", "ar-YE": { c: "ر.ي.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 9217: "ar-YE", "as": { c: "₹", d: "dd-MM-yyyy", n: "০১২৩৪৫৬৭৮৯" }, 77: "as", "as-IN": { c: "₹", d: "dd-MM-yyyy", n: "০১২৩৪৫৬৭৮৯" }, 1101: "as-IN", "az": { c: "man.", d: "dd.MM.yyyy" }, 44: "az", "az-Cyrl": { c: "ман.", d: "dd.MM.yyyy" }, 29740: "az-Cyrl", "az-Cyrl-AZ": { c: "ман.", d: "dd.MM.yyyy" }, 2092: "az-Cyrl-AZ", "az-Latn": { c: "man.", d: "dd.MM.yyyy" }, 30764: "az-Latn", "az-Latn-AZ": { c: "man.", d: "dd.MM.yyyy" }, 1068: "az-Latn-AZ", "ba": { c: "₽", d: "dd.MM.yy" }, 109: "ba", "ba-RU": { c: "₽", d: "dd.MM.yy" }, 1133: "ba-RU", "be": { c: "Br", d: "dd.MM.yy" }, 35: "be", "be-BY": { c: "Br", d: "dd.MM.yy" }, 1059: "be-BY", "bg": { c: "лв.", d: "d.M.yyyy \"г.\"" }, 2: "bg", "bg-BG": { c: "лв.", d: "d.M.yyyy \"г.\"" }, 1026: "bg-BG", "bn": { c: "₹", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 69: "bn", "bn-BD": { c: "৳", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 2117: "bn-BD", "bn-IN": { c: "₹", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 1093: "bn-IN", "bo": { c: "¥", d: "yyyy/M/d", n: "༠༡༢༣༤༥༦༧༨༩" }, 81: "bo", "bo-CN": { c: "¥", d: "yyyy/M/d", n: "༠༡༢༣༤༥༦༧༨༩" }, 1105: "bo-CN", "br": { c: "€", d: "dd/MM/yyyy" }, 126: "br", "br-FR": { c: "€", d: "dd/MM/yyyy" }, 1150: "br-FR", "bs": { c: "KM", d: "d.M.yyyy" }, 30746: "bs", "bs-Cyrl": { c: "КМ", d: "d.M.yyyy" }, 25626: "bs-Cyrl", "bs-Cyrl-BA": { c: "КМ", d: "d.M.yyyy" }, 8218: "bs-Cyrl-BA", "bs-Latn": { c: "KM", d: "d.M.yyyy" }, 26650: "bs-Latn", "bs-Latn-BA": { c: "KM", d: "d.M.yyyy" }, 5146: "bs-Latn-BA", "ca": { c: "€", d: "dd/MM/yyyy" }, 3: "ca", "ca-ES": { c: "€", d: "dd/MM/yyyy" }, 1027: "ca-ES", "ca-ES-valencia": { c: "€", d: "dd/MM/yy" }, 2051: "ca-ES-valencia", "chr": { c: "$", d: "M/d/yyyy" }, 92: "chr", "chr-Cher": { c: "$", d: "M/d/yyyy" }, 31836: "chr-Cher", "chr-Cher-US": { c: "$", d: "M/d/yyyy" }, 1116: "chr-Cher-US", "co": { c: "€", d: "dd/MM/yyyy" }, 131: "co", "co-FR": { c: "€", d: "dd/MM/yyyy" }, 1155: "co-FR", "cs": { c: "Kč", d: "d. M. yyyy" }, 5: "cs", "cs-CZ": { c: "Kč", d: "d. M. yyyy" }, 1029: "cs-CZ", "cy": { c: "£", d: "dd/MM/yy" }, 82: "cy", "cy-GB": { c: "£", d: "dd/MM/yy" }, 1106: "cy-GB", "da": { c: "kr.", d: "dd-MM-yyyy" }, 6: "da", "da-DK": { c: "kr.", d: "dd-MM-yyyy" }, 1030: "da-DK", "de": { c: "€", d: "dd.MM.yyyy" }, 7: "de", "de-AT": { c: "€", d: "dd.MM.yyyy" }, 3079: "de-AT", "de-CH": { c: "Fr.", d: "dd.MM.yyyy" }, 2055: "de-CH", "de-DE": { c: "€", d: "dd.MM.yyyy" }, 1031: "de-DE", "de-LI": { c: "CHF", d: "dd.MM.yyyy" }, 5127: "de-LI", "de-LU": { c: "€", d: "dd.MM.yyyy" }, 4103: "de-LU", "dsb": { c: "€", d: "d. M. yyyy" }, 31790: "dsb", "dsb-DE": { c: "€", d: "d. M. yyyy" }, 2094: "dsb-DE", "dv": { c: "ރ.", d: "dd/MM/yy" }, 101: "dv", "dv-MV": { c: "ރ.", d: "dd/MM/yy" }, 1125: "dv-MV", "el": { c: "€", d: "d/M/yyyy" }, 8: "el", "el-GR": { c: "€", d: "d/M/yyyy" }, 1032: "el-GR", "en": { c: "$", d: "M/d/yyyy" }, 9: "en", "en-029": { c: "EC$", d: "dd/MM/yyyy" }, 9225: "en-029", "en-AU": { c: "$", d: "d/MM/yyyy" }, 3081: "en-AU", "en-BZ": { c: "BZ$", d: "dd/MM/yyyy" }, 10249: "en-BZ", "en-CA": { c: "$", d: "yyyy-MM-dd" }, 4105: "en-CA", "en-GB": { c: "£", d: "dd/MM/yyyy" }, 2057: "en-GB", "en-HK": { c: "$", d: "d/M/yy" }, 15369: "en-HK", "en-IE": { c: "€", d: "dd/MM/yyyy" }, 6153: "en-IE", "en-IN": { c: "₹", d: "dd-MM-yyyy" }, 16393: "en-IN", "en-JM": { c: "J$", d: "dd/MM/yyyy" }, 8201: "en-JM", "en-MY": { c: "RM", d: "d/M/yyyy" }, 17417: "en-MY", "en-NZ": { c: "$", d: "d/MM/yyyy" }, 5129: "en-NZ", "en-PH": { c: "₱", d: "M/d/yyyy" }, 13321: "en-PH", "en-SG": { c: "$", d: "d/M/yyyy" }, 18441: "en-SG", "en-TT": { c: "TT$", d: "dd/MM/yyyy" }, 11273: "en-TT", "en-US": { c: "$", d: "M/d/yyyy" }, 1033: "en-US", "en-ZA": { c: "R", d: "yyyy-MM-dd" }, 7177: "en-ZA", "en-ZW": { c: "$", d: "dd/MM/yyyy" }, 12297: "en-ZW", "es": { c: "€", d: "dd/MM/yyyy" }, 10: "es", "es-419": { c: "US$", d: "dd/MM/yy" }, 22538: "es-419", "es-AR": { c: "$", d: "dd/MM/yyyy" }, 11274: "es-AR", "es-BO": { c: "Bs.", d: "dd/MM/yyyy" }, 16394: "es-BO", "es-CL": { c: "$", d: "dd-MM-yyyy" }, 13322: "es-CL", "es-CO": { c: "$", d: "dd/MM/yyyy" }, 9226: "es-CO", "es-CR": { c: "₡", d: "dd/MM/yyyy" }, 5130: "es-CR", "es-DO": { c: "RD$", d: "d/M/yy" }, 7178: "es-DO", "es-EC": { c: "$", d: "dd/MM/yyyy" }, 12298: "es-EC", "es-ES": { c: "€", d: "dd/MM/yyyy" }, 3082: "es-ES", "es-GT": { c: "Q", d: "dd/MM/yyyy" }, 4106: "es-GT", "es-HN": { c: "L.", d: "dd/MM/yyyy" }, 18442: "es-HN", "es-MX": { c: "$", d: "dd/MM/yyyy" }, 2058: "es-MX", "es-NI": { c: "C$", d: "dd/MM/yyyy" }, 19466: "es-NI", "es-PA": { c: "B/.", d: "d/M/yy" }, 6154: "es-PA", "es-PE": { c: "S/.", d: "dd/MM/yyyy" }, 10250: "es-PE", "es-PR": { c: "$", d: "dd/MM/yyyy" }, 20490: "es-PR", "es-PY": { c: "₲", d: "dd/MM/yyyy" }, 15370: "es-PY", "es-SV": { c: "$", d: "dd/MM/yyyy" }, 17418: "es-SV", "es-US": { c: "$", d: "M/d/yyyy" }, 21514: "es-US", "es-UY": { c: "$U", d: "dd/MM/yyyy" }, 14346: "es-UY", "es-VE": { c: "Bs.F.", d: "dd-MM-yyyy" }, 8202: "es-VE", "et": { c: "€", d: "d.MM.yyyy" }, 37: "et", "et-EE": { c: "€", d: "d.MM.yyyy" }, 1061: "et-EE", "eu": { c: "€", d: "yyyy/MM/dd" }, 45: "eu", "eu-ES": { c: "€", d: "yyyy/MM/dd" }, 1069: "eu-ES", "fa": { c: "ريال", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 41: "fa", "fa-IR": { c: "ريال", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 1065: "fa-IR", "ff": { c: "CFA", d: "dd/MM/yyyy" }, 103: "ff", "ff-Latn": { c: "CFA", d: "dd/MM/yyyy" }, 31847: "ff-Latn", "ff-Latn-SN": { c: "CFA", d: "dd/MM/yyyy" }, 2151: "ff-Latn-SN", "fi": { c: "€", d: "d.M.yyyy" }, 11: "fi", "fi-FI": { c: "€", d: "d.M.yyyy" }, 1035: "fi-FI", "fil": { c: "₱", d: "M/d/yyyy" }, 100: "fil", "fil-PH": { c: "₱", d: "M/d/yyyy" }, 1124: "fil-PH", "fo": { c: "kr.", d: "dd-MM-yyyy" }, 56: "fo", "fo-FO": { c: "kr.", d: "dd-MM-yyyy" }, 1080: "fo-FO", "fr": { c: "€", d: "dd/MM/yyyy" }, 12: "fr", "fr-BE": { c: "€", d: "dd-MM-yy" }, 2060: "fr-BE", "fr-CA": { c: "$", d: "yyyy-MM-dd" }, 3084: "fr-CA", "fr-CD": { c: "FC", d: "dd/MM/yyyy" }, 9228: "fr-CD", "fr-CH": { c: "fr.", d: "dd.MM.yyyy" }, 4108: "fr-CH", "fr-CI": { c: "CFA", d: "dd/MM/yyyy" }, 12300: "fr-CI", "fr-CM": { c: "FCFA", d: "dd/MM/yyyy" }, 11276: "fr-CM", "fr-FR": { c: "€", d: "dd/MM/yyyy" }, 1036: "fr-FR", "fr-HT": { c: "G", d: "dd/MM/yyyy" }, 15372: "fr-HT", "fr-LU": { c: "€", d: "dd/MM/yyyy" }, 5132: "fr-LU", "fr-MA": { c: "DH", d: "dd/MM/yyyy" }, 14348: "fr-MA", "fr-MC": { c: "€", d: "dd/MM/yyyy" }, 6156: "fr-MC", "fr-ML": { c: "CFA", d: "dd/MM/yyyy" }, 13324: "fr-ML", "fr-RE": { c: "€", d: "dd/MM/yyyy" }, 8204: "fr-RE", "fr-SN": { c: "CFA", d: "dd/MM/yyyy" }, 10252: "fr-SN", "fy": { c: "€", d: "d-M-yyyy" }, 98: "fy", "fy-NL": { c: "€", d: "d-M-yyyy" }, 1122: "fy-NL", "ga": { c: "€", d: "dd/MM/yyyy" }, 60: "ga", "ga-IE": { c: "€", d: "dd/MM/yyyy" }, 2108: "ga-IE", "gd": { c: "£", d: "dd/MM/yyyy" }, 145: "gd", "gd-GB": { c: "£", d: "dd/MM/yyyy" }, 1169: "gd-GB", "gl": { c: "€", d: "dd/MM/yyyy" }, 86: "gl", "gl-ES": { c: "€", d: "dd/MM/yyyy" }, 1110: "gl-ES", "gn": { c: "₲", d: "dd/MM/yyyy" }, 116: "gn", "gn-PY": { c: "₲", d: "dd/MM/yyyy" }, 1140: "gn-PY", "gsw": { c: "€", d: "dd/MM/yyyy" }, 132: "gsw", "gsw-FR": { c: "€", d: "dd/MM/yyyy" }, 1156: "gsw-FR", "gu": { c: "₹", d: "dd-MM-yy", n: "૦૧૨૩૪૫૬૭૮૯" }, 71: "gu", "gu-IN": { c: "₹", d: "dd-MM-yy", n: "૦૧૨૩૪૫૬૭૮૯" }, 1095: "gu-IN", "ha": { c: "₦", d: "d/M/yyyy" }, 104: "ha", "ha-Latn": { c: "₦", d: "d/M/yyyy" }, 31848: "ha-Latn", "ha-Latn-NG": { c: "₦", d: "d/M/yyyy" }, 1128: "ha-Latn-NG", "haw": { c: "$", d: "M/d/yyyy" }, 117: "haw", "haw-US": { c: "$", d: "M/d/yyyy" }, 1141: "haw-US", "he": { c: "₪", d: "dd/MM/yyyy" }, 13: "he", "he-IL": { c: "₪", d: "dd/MM/yyyy" }, 1037: "he-IL", "hi": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 57: "hi", "hi-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1081: "hi-IN", "hr": { c: "kn", d: "d.M.yyyy." }, 26: "hr", "hr-BA": { c: "KM", d: "d.M.yyyy." }, 4122: "hr-BA", "hr-HR": { c: "kn", d: "d.M.yyyy." }, 1050: "hr-HR", "hsb": { c: "€", d: "d. M. yyyy" }, 46: "hsb", "hsb-DE": { c: "€", d: "d. M. yyyy" }, 1070: "hsb-DE", "hu": { c: "Ft", d: "yyyy.MM.dd." }, 14: "hu", "hu-HU": { c: "Ft", d: "yyyy.MM.dd." }, 1038: "hu-HU", "hy": { c: "֏", d: "dd.MM.yyyy" }, 43: "hy", "hy-AM": { c: "֏", d: "dd.MM.yyyy" }, 1067: "hy-AM", "id": { c: "Rp", d: "dd/MM/yyyy" }, 33: "id", "id-ID": { c: "Rp", d: "dd/MM/yyyy" }, 1057: "id-ID", "ig": { c: "₦", d: "d/M/yyyy" }, 112: "ig", "ig-NG": { c: "₦", d: "d/M/yyyy" }, 1136: "ig-NG", "ii": { c: "¥", d: "yyyy/M/d" }, 120: "ii", "ii-CN": { c: "¥", d: "yyyy/M/d" }, 1144: "ii-CN", "is": { c: "kr.", d: "d.M.yyyy" }, 15: "is", "is-IS": { c: "kr.", d: "d.M.yyyy" }, 1039: "is-IS", "it": { c: "€", d: "dd/MM/yyyy" }, 16: "it", "it-CH": { c: "fr.", d: "dd.MM.yyyy" }, 2064: "it-CH", "it-IT": { c: "€", d: "dd/MM/yyyy" }, 1040: "it-IT", "iu": { c: "$", d: "d/MM/yyyy" }, 93: "iu", "iu-Cans": { c: "$", d: "d/M/yyyy" }, 30813: "iu-Cans", "iu-Cans-CA": { c: "$", d: "d/M/yyyy" }, 1117: "iu-Cans-CA", "iu-Latn": { c: "$", d: "d/MM/yyyy" }, 31837: "iu-Latn", "iu-Latn-CA": { c: "$", d: "d/MM/yyyy" }, 2141: "iu-Latn-CA", "ja": { c: "¥", d: "yyyy/MM/dd" }, 17: "ja", "ja-JP": { c: "¥", d: "yyyy/MM/dd" }, 1041: "ja-JP", "jv": { c: "Rp", d: "dd/MM/yyyy" }, 4096: "jv", "jv-Latn": { c: "Rp", d: "dd/MM/yyyy" }, "jv-Latn-ID": { c: "Rp", d: "dd/MM/yyyy" }, "ka": { c: "ლ.", d: "dd.MM.yyyy" }, 55: "ka", "ka-GE": { c: "ლ.", d: "dd.MM.yyyy" }, 1079: "ka-GE", "kk": { c: "₸", d: "d-MMM-yy" }, 63: "kk", "kk-KZ": { c: "₸", d: "d-MMM-yy" }, 1087: "kk-KZ", "kl": { c: "kr.", d: "dd-MM-yyyy" }, 111: "kl", "kl-GL": { c: "kr.", d: "dd-MM-yyyy" }, 1135: "kl-GL", "km": { c: "៛", d: "dd/MM/yy", n: "០១២៣៤៥៦៧៨៩" }, 83: "km", "km-KH": { c: "៛", d: "dd/MM/yy", n: "០១២៣៤៥៦៧៨៩" }, 1107: "km-KH", "kn": { c: "₹", d: "dd-MM-yy", n: "೦೧೨೩೪೫೬೭೮೯" }, 75: "kn", "kn-IN": { c: "₹", d: "dd-MM-yy", n: "೦೧೨೩೪೫೬೭೮೯" }, 1099: "kn-IN", "ko": { c: "₩", d: "yyyy-MM-dd" }, 18: "ko", "kok": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 87: "kok", "kok-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1111: "kok-IN", "ko-KR": { c: "₩", d: "yyyy-MM-dd" }, 1042: "ko-KR", "ku": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 146: "ku", "ku-Arab": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 31890: "ku-Arab", "ku-Arab-IQ": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 1170: "ku-Arab-IQ", "ky": { c: "сом", d: "d-MMM yy" }, 64: "ky", "ky-KG": { c: "сом", d: "d-MMM yy" }, 1088: "ky-KG", "lb": { c: "€", d: "dd.MM.yy" }, 110: "lb", "lb-LU": { c: "€", d: "dd.MM.yy" }, 1134: "lb-LU", "lo": { c: "₭", d: "dd/MM/yyyy", n: "໐໑໒໓໔໕໖໗໘໙" }, 84: "lo", "lo-LA": { c: "₭", d: "dd/MM/yyyy", n: "໐໑໒໓໔໕໖໗໘໙" }, 1108: "lo-LA", "lt": { c: "Lt", d: "yyyy-MM-dd" }, 39: "lt", "lt-LT": { c: "Lt", d: "yyyy-MM-dd" }, 1063: "lt-LT", "lv": { c: "€", d: "dd.MM.yyyy." }, 38: "lv", "lv-LV": { c: "€", d: "dd.MM.yyyy." }, 1062: "lv-LV", "mg": { c: "Ar", d: "d/M/yyyy" }, "mg-MG": { c: "Ar", d: "d/M/yyyy" }, "mi": { c: "$", d: "dd/MM/yyyy" }, 129: "mi", "mi-NZ": { c: "$", d: "dd/MM/yyyy" }, 1153: "mi-NZ", "mk": { c: "ден.", d: "dd.MM.yyyy" }, 47: "mk", "mk-MK": { c: "ден.", d: "dd.MM.yyyy" }, 1071: "mk-MK", "ml": { c: "₹", d: "dd-MM-yy", n: "൦൧൨൩൪൫൬൭൮൯" }, 76: "ml", "ml-IN": { c: "₹", d: "dd-MM-yy", n: "൦൧൨൩൪൫൬൭൮൯" }, 1100: "ml-IN", "mn": { c: "₮", d: "yyyy-MM-dd" }, 80: "mn", "mn-Cyrl": { c: "₮", d: "yyyy-MM-dd" }, 30800: "mn-Cyrl", "mn-MN": { c: "₮", d: "yyyy-MM-dd" }, 1104: "mn-MN", "mn-Mong": { c: "¥", d: "yyyy/M/d" }, 31824: "mn-Mong", "mn-Mong-CN": { c: "¥", d: "yyyy/M/d" }, 2128: "mn-Mong-CN", "mn-Mong-MN": { c: "₮", d: "yyyy/M/d" }, 3152: "mn-Mong-MN", "moh": { c: "$", d: "M/d/yyyy" }, 124: "moh", "moh-CA": { c: "$", d: "M/d/yyyy" }, 1148: "moh-CA", "mr": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 78: "mr", "mr-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1102: "mr-IN", "ms": { c: "RM", d: "dd/MM/yyyy" }, 62: "ms", "ms-BN": { c: "$", d: "dd/MM/yyyy" }, 2110: "ms-BN", "ms-MY": { c: "RM", d: "dd/MM/yyyy" }, 1086: "ms-MY", "mt": { c: "€", d: "dd/MM/yyyy" }, 58: "mt", "mt-MT": { c: "€", d: "dd/MM/yyyy" }, 1082: "mt-MT", "my": { c: "K", d: "dd-MM-yyyy", n: "၀၁၂၃၄၅၆၇၈၉" }, 85: "my", "my-MM": { c: "K", d: "dd-MM-yyyy", n: "၀၁၂၃၄၅၆၇၈၉" }, 1109: "my-MM", "nb": { c: "kr", d: "dd.MM.yyyy" }, 31764: "nb", "nb-NO": { c: "kr", d: "dd.MM.yyyy" }, 1044: "nb-NO", "ne": { c: "रु", d: "M/d/yyyy", n: "०१२३४५६७८९" }, 97: "ne", "ne-IN": { c: "₹", d: "yyyy-MM-dd", n: "०१२३४५६७८९" }, 2145: "ne-IN", "ne-NP": { c: "रु", d: "M/d/yyyy", n: "०१२३४५६७८९" }, 1121: "ne-NP", "nl": { c: "€", d: "d-M-yyyy" }, 19: "nl", "nl-BE": { c: "€", d: "d/MM/yyyy" }, 2067: "nl-BE", "nl-NL": { c: "€", d: "d-M-yyyy" }, 1043: "nl-NL", "nn": { c: "kr", d: "dd.MM.yyyy" }, 30740: "nn", "nn-NO": { c: "kr", d: "dd.MM.yyyy" }, 2068: "nn-NO", "no": { c: "kr", d: "dd.MM.yyyy" }, 20: "no", "nqo": { c: "ߖߕ.", d: "dd/MM/yyyy", n: "߀߁߂߃߄߅߆߇߈߉" }, "nqo-GN": { c: "ߖߕ.", d: "dd/MM/yyyy", n: "߀߁߂߃߄߅߆߇߈߉" }, "nso": { c: "R", d: "dd/MM/yy" }, 108: "nso", "nso-ZA": { c: "R", d: "dd/MM/yy" }, 1132: "nso-ZA", "oc": { c: "€", d: "dd/MM/yyyy" }, 130: "oc", "oc-FR": { c: "€", d: "dd/MM/yyyy" }, 1154: "oc-FR", "om": { c: "Br", d: "dd/MM/yy" }, 114: "om", "om-ET": { c: "Br", d: "dd/MM/yy" }, 1138: "om-ET", "or": { c: "₹", d: "dd-MM-yy", n: "୦୧୨୩୪୫୬୭୮୯" }, 72: "or", "or-IN": { c: "₹", d: "dd-MM-yy", n: "୦୧୨୩୪୫୬୭୮୯" }, 1096: "or-IN", "pa": { c: "₹", d: "dd-MM-yy", n: "੦੧੨੩੪੫੬੭੮੯" }, 70: "pa", "pa-Arab": { c: "Rs", d: "dd-MM-yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 31814: "pa-Arab", "pa-Arab-PK": { c: "Rs", d: "dd-MM-yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2118: "pa-Arab-PK", "pa-IN": { c: "₹", d: "dd-MM-yy", n: "੦੧੨੩੪੫੬੭੮੯" }, 1094: "pa-IN", "pl": { c: "zł", d: "yyyy-MM-dd" }, 21: "pl", "pl-PL": { c: "zł", d: "yyyy-MM-dd" }, 1045: "pl-PL", "prs": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 140: "prs", "prs-AF": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 1164: "prs-AF", "ps": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 99: "ps", "ps-AF": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 1123: "ps-AF", "pt": { c: "R$", d: "dd/MM/yyyy" }, 22: "pt", "pt-AO": { c: "Kz", d: "dd/MM/yy" }, "pt-BR": { c: "R$", d: "dd/MM/yyyy" }, 1046: "pt-BR", "pt-PT": { c: "€", d: "dd/MM/yyyy" }, 2070: "pt-PT", "qut": { c: "Q", d: "dd/MM/yyyy" }, 134: "qut", "qut-GT": { c: "Q", d: "dd/MM/yyyy" }, 1158: "qut-GT", "quz": { c: "Bs.", d: "dd/MM/yyyy" }, 107: "quz", "quz-BO": { c: "Bs.", d: "dd/MM/yyyy" }, 1131: "quz-BO", "quz-EC": { c: "$", d: "dd/MM/yyyy" }, 2155: "quz-EC", "quz-PE": { c: "S/.", d: "dd/MM/yyyy" }, 3179: "quz-PE", "rm": { c: "fr.", d: "dd-MM-yyyy" }, 23: "rm", "rm-CH": { c: "fr.", d: "dd-MM-yyyy" }, 1047: "rm-CH", "ro": { c: "lei", d: "dd.MM.yyyy" }, 24: "ro", "ro-MD": { c: "L", d: "dd.MM.yyyy" }, 2072: "ro-MD", "ro-RO": { c: "lei", d: "dd.MM.yyyy" }, 1048: "ro-RO", "ru": { c: "₽", d: "dd.MM.yyyy" }, 25: "ru", "ru-RU": { c: "₽", d: "dd.MM.yyyy" }, 1049: "ru-RU", "rw": { c: "RWF", d: "d/MM/yyyy" }, 135: "rw", "rw-RW": { c: "RWF", d: "d/MM/yyyy" }, 1159: "rw-RW", "sa": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 79: "sa", "sah": { c: "₽", d: "dd.MM.yyyy" }, 133: "sah", "sah-RU": { c: "₽", d: "dd.MM.yyyy" }, 1157: "sah-RU", "sa-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1103: "sa-IN", "sd": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 89: "sd", "sd-Arab": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 31833: "sd-Arab", "sd-Arab-PK": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2137: "sd-Arab-PK", "se": { c: "kr", d: "dd.MM.yyyy" }, 59: "se", "se-FI": { c: "€", d: "d.M.yyyy" }, 3131: "se-FI", "se-NO": { c: "kr", d: "dd.MM.yyyy" }, 1083: "se-NO", "se-SE": { c: "kr", d: "yyyy-MM-dd" }, 2107: "se-SE", "si": { c: "රු.", d: "yyyy-MM-dd" }, 91: "si", "si-LK": { c: "රු.", d: "yyyy-MM-dd" }, 1115: "si-LK", "sk": { c: "EUR", d: "d.M.yyyy" }, 27: "sk", "sk-SK": { c: "EUR", d: "d.M.yyyy" }, 1051: "sk-SK", "sl": { c: "€", d: "d.M.yyyy" }, 36: "sl", "sl-SI": { c: "€", d: "d.M.yyyy" }, 1060: "sl-SI", "sma": { c: "kr", d: "yyyy-MM-dd" }, 30779: "sma", "sma-NO": { c: "kr", d: "dd.MM.yyyy" }, 6203: "sma-NO", "sma-SE": { c: "kr", d: "yyyy-MM-dd" }, 7227: "sma-SE", "smj": { c: "kr", d: "yyyy-MM-dd" }, 31803: "smj", "smj-NO": { c: "kr", d: "dd.MM.yyyy" }, 4155: "smj-NO", "smj-SE": { c: "kr", d: "yyyy-MM-dd" }, 5179: "smj-SE", "smn": { c: "€", d: "d.M.yyyy" }, 28731: "smn", "smn-FI": { c: "€", d: "d.M.yyyy" }, 9275: "smn-FI", "sms": { c: "€", d: "d.M.yyyy" }, 29755: "sms", "sms-FI": { c: "€", d: "d.M.yyyy" }, 8251: "sms-FI", "sn": { c: "US$", d: "dd/MM/yyyy" }, "sn-Latn": { c: "US$", d: "dd/MM/yyyy" }, "sn-Latn-ZW": { c: "US$", d: "dd/MM/yyyy" }, "so": { c: "S", d: "dd/MM/yy" }, 119: "so", "so-SO": { c: "S", d: "dd/MM/yy" }, 1143: "so-SO", "sq": { c: "Lek", d: "d.M.yyyy" }, 28: "sq", "sq-AL": { c: "Lek", d: "d.M.yyyy" }, 1052: "sq-AL", "sr": { c: "din.", d: "d.M.yyyy." }, 31770: "sr", "sr-Cyrl": { c: "дин.", d: "d.M.yyyy." }, 27674: "sr-Cyrl", "sr-Cyrl-BA": { c: "КМ", d: "d.M.yyyy." }, 7194: "sr-Cyrl-BA", "sr-Cyrl-CS": { c: "дин.", d: "d.M.yyyy." }, 3098: "sr-Cyrl-CS", "sr-Cyrl-ME": { c: "€", d: "d.M.yyyy." }, 12314: "sr-Cyrl-ME", "sr-Cyrl-RS": { c: "дин.", d: "d.M.yyyy." }, 10266: "sr-Cyrl-RS", "sr-Latn": { c: "din.", d: "d.M.yyyy." }, 28698: "sr-Latn", "sr-Latn-BA": { c: "KM", d: "d.M.yyyy." }, 6170: "sr-Latn-BA", "sr-Latn-CS": { c: "din.", d: "d.M.yyyy." }, 2074: "sr-Latn-CS", "sr-Latn-ME": { c: "€", d: "d.M.yyyy." }, 11290: "sr-Latn-ME", "sr-Latn-RS": { c: "din.", d: "d.M.yyyy." }, 9242: "sr-Latn-RS", "st": { c: "R", d: "yyyy-MM-dd" }, 48: "st", "st-ZA": { c: "R", d: "yyyy-MM-dd" }, 1072: "st-ZA", "sv": { c: "kr", d: "yyyy-MM-dd" }, 29: "sv", "sv-FI": { c: "€", d: "d.M.yyyy" }, 2077: "sv-FI", "sv-SE": { c: "kr", d: "yyyy-MM-dd" }, 1053: "sv-SE", "sw": { c: "KSh", d: "M/d/yyyy" }, 65: "sw", "sw-KE": { c: "KSh", d: "M/d/yyyy" }, 1089: "sw-KE", "syr": { c: "ܠ.ܣ.‏", d: "dd/MM/yyyy" }, 90: "syr", "syr-SY": { c: "ܠ.ܣ.‏", d: "dd/MM/yyyy" }, 1114: "syr-SY", "ta": { c: "₹", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 73: "ta", "ta-IN": { c: "₹", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 1097: "ta-IN", "ta-LK": { c: "Rs", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 2121: "ta-LK", "te": { c: "₹", d: "dd-MM-yy", n: "౦౧౨౩౪౫౬౭౮౯" }, 74: "te", "te-IN": { c: "₹", d: "dd-MM-yy", n: "౦౧౨౩౪౫౬౭౮౯" }, 1098: "te-IN", "tg": { c: "смн", d: "dd.MM.yyyy" }, 40: "tg", "tg-Cyrl": { c: "смн", d: "dd.MM.yyyy" }, 31784: "tg-Cyrl", "tg-Cyrl-TJ": { c: "смн", d: "dd.MM.yyyy" }, 1064: "tg-Cyrl-TJ", "th": { c: "฿", d: "d/M/yyyy", n: "๐๑๒๓๔๕๖๗๘๙" }, 30: "th", "th-TH": { c: "฿", d: "d/M/yyyy", n: "๐๑๒๓๔๕๖๗๘๙" }, 1054: "th-TH", "ti": { c: "ERN", d: "d/M/yyyy" }, 115: "ti", "ti-ER": { c: "ERN", d: "d/M/yyyy" }, 2163: "ti-ER", "ti-ET": { c: "ብር", d: "d/M/yyyy" }, 1139: "ti-ET", "tk": { c: "m.", d: "dd.MM.yy \"ý.\"" }, 66: "tk", "tk-TM": { c: "m.", d: "dd.MM.yy \"ý.\"" }, 1090: "tk-TM", "tn": { c: "R", d: "dd/MM/yy" }, 50: "tn", "tn-BW": { c: "P", d: "dd/MM/yy" }, 2098: "tn-BW", "tn-ZA": { c: "R", d: "dd/MM/yy" }, 1074: "tn-ZA", "tr": { c: "₺", d: "d.M.yyyy" }, 31: "tr", "tr-TR": { c: "₺", d: "d.M.yyyy" }, 1055: "tr-TR", "ts": { c: "R", d: "yyyy-MM-dd" }, 49: "ts", "ts-ZA": { c: "R", d: "yyyy-MM-dd" }, 1073: "ts-ZA", "tt": { c: "₽", d: "dd.MM.yyyy" }, 68: "tt", "tt-RU": { c: "₽", d: "dd.MM.yyyy" }, 1092: "tt-RU", "tzm": { c: "DA", d: "dd-MM-yyyy" }, 95: "tzm", "tzm-Latn": { c: "DA", d: "dd-MM-yyyy" }, 31839: "tzm-Latn", "tzm-Latn-DZ": { c: "DA", d: "dd-MM-yyyy" }, 2143: "tzm-Latn-DZ", "tzm-Tfng": { c: "ⴷⵔ", d: "dd-MM-yyyy" }, 30815: "tzm-Tfng", "tzm-Tfng-MA": { c: "ⴷⵔ", d: "dd-MM-yyyy" }, 4191: "tzm-Tfng-MA", "ug": { c: "¥", d: "yyyy-M-d" }, 128: "ug", "ug-CN": { c: "¥", d: "yyyy-M-d" }, 1152: "ug-CN", "uk": { c: "₴", d: "dd.MM.yyyy" }, 34: "uk", "uk-UA": { c: "₴", d: "dd.MM.yyyy" }, 1058: "uk-UA", "ur": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 32: "ur", "ur-IN": { c: "₹", d: "d/M/yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2080: "ur-IN", "ur-PK": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 1056: "ur-PK", "uz": { c: "so\"m", d: "dd.MM.yyyy" }, 67: "uz", "uz-Cyrl": { c: "сўм", d: "dd.MM.yyyy" }, 30787: "uz-Cyrl", "uz-Cyrl-UZ": { c: "сўм", d: "dd.MM.yyyy" }, 2115: "uz-Cyrl-UZ", "uz-Latn": { c: "so\"m", d: "dd.MM.yyyy" }, 31811: "uz-Latn", "uz-Latn-UZ": { c: "so\"m", d: "dd.MM.yyyy" }, 1091: "uz-Latn-UZ", "vi": { c: "₫", d: "dd/MM/yyyy" }, 42: "vi", "vi-VN": { c: "₫", d: "dd/MM/yyyy" }, 1066: "vi-VN", "wo": { c: "CFA", d: "dd/MM/yyyy" }, 136: "wo", "wo-SN": { c: "CFA", d: "dd/MM/yyyy" }, 1160: "wo-SN", "xh": { c: "R", d: "yyyy/MM/dd" }, 52: "xh", "xh-ZA": { c: "R", d: "yyyy/MM/dd" }, 1076: "xh-ZA", "yo": { c: "₦", d: "d/M/yyyy" }, 106: "yo", "yo-NG": { c: "₦", d: "d/M/yyyy" }, 1130: "yo-NG", "zgh": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zgh-Tfng": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zgh-Tfng-MA": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zh": { c: "¥", d: "yyyy/M/d" }, 30724: "zh", "zh-CHS": { c: "¥", d: "yyyy/M/d" }, 4: "zh-CHS", "zh-CHT": { c: "HK$", d: "d/M/yyyy" }, 31748: "zh-CHT", "zh-CN": { c: "¥", d: "yyyy/M/d" }, 2052: "zh-CN", "zh-Hans": { c: "¥", d: "yyyy/M/d" }, "zh-Hant": { c: "HK$", d: "d/M/yyyy" }, "zh-HK": { c: "HK$", d: "d/M/yyyy" }, 3076: "zh-HK", "zh-MO": { c: "MOP", d: "d/M/yyyy" }, 5124: "zh-MO", "zh-SG": { c: "$", d: "d/M/yyyy" }, 4100: "zh-SG", "zh-TW": { c: "NT$", d: "yyyy/M/d" }, 1028: "zh-TW", "zu": { c: "R", d: "dd-MM-yyyy" }, 53: "zu", "zu-ZA": { c: "R", d: "dd-MM-yyyy" }, 1077: "zu-ZA" };
	/*jshint +W100 */

	// jscs:enable
	$.ig.CultureInfo = Class.extend({
		_name: null,
		_isInvariant: false,
		init: function (name) {
			this._name = name;
		},
		clone: function () {
			var copy = new $.ig.CultureInfo(this._name);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			if (copy._dateTimeFormat) {
				copy._dateTimeFormat = copy._dateTimeFormat.clone();
			}

			if (copy._numberFormat) {
				copy._numberFormat = copy._numberFormat.clone();
			}

			return copy;
		},
		compareInfo: function () {

			// TODO:
			return new $.ig.CompareInfo();
		},
		getFormat: function ($t) {
			if ($t === $.ig.NumberFormatInfo.prototype.$type) {
				return this.numberFormat();
			}

			if ($t === $.ig.DateTimeFormat.prototype.$type) {
				return this.dateTimeFormat();
			}

			throw new Error("Unknown format type");
		},
		name: function () {
			return this._name;
		},
		calendar: function () {

			// TODO
			return new $.ig.Calendar();
		},
		dateTimeFormat: function (value) {
			if (arguments.length === 1) {
				this._dateTimeFormat = value;
			}

			if (!this._dateTimeFormat) {
				this._dateTimeFormat = new $.ig.DateTimeFormat(this._name, this._isInvariant);
			}

			return this._dateTimeFormat;
		},
		numberFormat: function (value) {
			if (arguments.length === 1) {
				this._numberFormat = value;
			}

			if (!this._numberFormat) {
				this._numberFormat = new $.ig.NumberFormatInfo(this._name, this._isInvariant);
			}

			return this._numberFormat;
		},
		twoLetterISOLanguageName: function () {
			if (this._name.length > 2 && this._name[ 2 ] == "-") {
				return this._name.substr(0, 2);
			}

			// TODO
			return "";
		},
		getCultureInfo: function (lcid) {
			var name = globalInfo[ lcid ];
			if (name) {
				if (name === "invariant") {
					return $.ig.CultureInfo.prototype.invariantCulture();
				}

				return new $.ig.CultureInfo(name);
			}

			// TODO: throw error here?
			return $.ig.CultureInfo.prototype.invariantCulture();
		},
		$type: new $.ig.Type("CultureInfo", $.ig.Object.prototype.$type)
	}, true);

	$.ig.CultureInfo.prototype.currentCulture = function () {
		return $.ig.Thread.prototype.currentThread().currentCulture();
	};

	$.ig.CultureInfo.prototype.invariantCulture = function () {
		if (this._cachedInvariant) {
			return this._cachedInvariant;
		}

		// TODO: Make a true invariant culture
		/*jshint -W093 */
		this._cachedInvariant = new $.ig.CultureInfo("en-US");
		this._cachedInvariant._isInvariant = true;
		return this._cachedInvariant;
	};

	$.ig.Calendar = Class.extend({
		init: function () {
		},
		eras: function () {

			// TODO: Base this on the culture
			return [ 1 ];
		},
		getEra: function (time) {

			// TODO: Base this on the culture
			return 1;
		},
		getDayOfMonth: function (time) {

			// TODO: Base this on the culture
			return time.getDate();
		},
		getDaysInMonth: function (year, month, era) {

			// TODO: Base this on the culture
			return $.ig.Date.prototype.daysInMonth(year, month);
		},
		getDaysInYear: function (year, era) {

			// TODO: Base this on the culture
			return $.ig.Date.prototype.isLeapYear(year) ? 366 : 365;
		},
		getMonth: function (time) {

			// TODO: Base this on the culture
			return $.ig.Date.prototype.getMonth(time);
		},
		getYear: function (time) {

			// TODO: Base this on the culture
			return time.getFullYear();
		},
		toDateTime: function (year, month, day, hour, minute, second, millisecond, era) {

			// TODO: Base this on the culture
			return $.ig.Date.prototype.fromValues(year, month, day, hour,
				minute, second, millisecond);
		},
		$type: new $.ig.Type("Calendar", $.ig.Object.prototype.$type)
	}, true);

	$.ig.util.defType("CompareInfo", "Object", {
		init: function () {
		},
		compare1: function (string1, offset1, length1, string2, offset2, length2, options) {
			var v1 = string1.substr(offset1, length1);
			var v2 = string2.substr(offset2, length2);

			// TODO: Handle other compare options
			/*jslint bitwise: true */
			if ((options & $.ig.CompareOptions.prototype.ignoreCase) !== 0) {
				v1 = v1.toLowerCase();
				v2 = v2.toLowerCase();
			}

			return $.ig.util.compare(v1, v2);
		},
		compare4: function (string1, string2) {
			return this.compare5(string1, string2, $.ig.CompareOptions.prototype.none);
		},
		compare5: function (string1, string2, options) {
			return this.compare1(string1, 0, string1.length, string2, 0, string2.length, options);
		},
		indexOf1: function (source, value) {
			return this.indexOf6(source, value, 0, $.ig.CompareOptions.prototype.none);
		},
		indexOf3: function (source, value, options) {
			return this.indexOf6(source, value, 0, options);
		},
		indexOf6: function (source, value, startIndex, options) {

			// TODO: Handle other compare options
			/*jslint bitwise: true */
			if ((options & $.ig.CompareOptions.prototype.ignoreCase) !== 0) {
				source = source.toLowerCase();
				value = value.toLowerCase();
			}

			return source.indexOf(value, startIndex);
		},
		indexOf5: function (source, value, options) {

			// TODO: Use options
			return source.indexOf(value);
		},
		referenceEquals: function (a, b) {
			return a === b;
		},
		$type: new $.ig.Type("CompareInfo", $.ig.Object.prototype.$type)
	}, true);

	$.ig.DateTimeFormat = Class.extend({
		init: function (cultureName, isInvariant) {
			this._cultureName = cultureName;
			this._isInvariant = isInvariant;
		},
		clone: function () {
			var copy = new $.ig.DateTimeFormat(this._cultureName, this._isInvariant);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			return copy;
		},
		dateSeparator: function (value) {
			if (arguments.length === 1) {
				this._dateSeparator = value;
			}

			if (!this._dateSeparator) {
				this._dateSeparator = "/"; // TODO: Get this based on the culture somehow
			}

			return this._dateSeparator;
		},
		timeSeparator: function (value) {
			if (arguments.length === 1) {
				this._timeSeparator = value;
			}

			if (!this._timeSeparator) {
				this._timeSeparator = ":"; // TODO: Get this based on the culture somehow
			}

			return this._timeSeparator;
		},
		longDatePattern: function (value) {
			if (arguments.length === 1) {
				this._longDatePattern = value;
			}

			if (!this._longDatePattern) {
				this._longDatePattern = "dddd, MMMM d, yyyy"; // TODO: Get this based on the culture somehow
			}

			return this._longDatePattern;
		},
		shortDatePattern: function (value) {
			if (arguments.length === 1) {
				this._shortDatePattern = value;
			}

			if (!this._shortDatePattern) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g) {
					this._shortDatePattern = g.d;
				} else {
					this._shortDatePattern = "M/d/yyyy";
				}
			}

			return this._shortDatePattern;
		},
		shortTimePattern: function (value) {

			if (arguments.length === 1) {
				this._shortTimePattern = value;
			}

			if (!this._shortTimePattern) {
				this._shortTimePattern = "h:mm tt"; // TODO: Get this based on the culture somehow
			}

			return this._shortTimePattern;
		},
		$type: new $.ig.Type("DateTimeFormat", $.ig.Object.prototype.$type) // TODO: Define and add IFormatProvider interface here
	}, true);

	$.ig.NumberFormatInfo = Class.extend({
		init: function (cultureName, isInvariant) {
			this._cultureName = cultureName;
			this._isInvariant = isInvariant;
		},
		clone: function () {
			var copy = new $.ig.NumberFormatInfo(this._cultureName, this._isInvariant);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			return copy;
		},
		currencySymbol: function (value) {
			if (arguments.length === 1) {
				this._currencySymbol = value;
			}

			if (!this._currencySymbol) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g) {
					this._currencySymbol = g.c;
				} else {
					this._currencySymbol = "$";
				}
			}

			return this._currencySymbol;
		},
		nativeDigits: function () {
			if (!this._nativeDigits) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g && g.n) {
					this._nativeDigits = g.n;
				} else {
					this._nativeDigits = "0123456789";
				}
			}

			return this._nativeDigits;
		},
		negativeSign: function (value) {

			if (arguments.length === 1) {
				this._negativeSign = value;
			}

			if (!this._negativeSign) {
				this._negativeSign = "-";
			}

			return this._negativeSign;
		},
		percentSymbol: function (value) {
			if (arguments.length === 1) {
				this._percentSymbol = value;
			}

			if (!this._percentSymbol) {
				var temp = (1).toLocaleString(this._cultureName, { style: "percent" });
				this._percentSymbol = temp[ temp.length - 1 ];
			}

			return this._percentSymbol;
		},
		positiveSign: function (value) {
			if (arguments.length === 1) {
				this._positiveSign = value;
			}

			if (!this._positiveSign) {
				this._positiveSign = "+";
			}

			return this._positiveSign;
		},
		numberDecimalSeparator: function (value) {

			if (arguments.length === 1) {
				this._numberDecimalSeparator = value;
			}

			if (!this._numberDecimalSeparator) {
				this._numberDecimalSeparator = (1.1).toLocaleString(this._cultureName)
					.substring(1, 2);
			}

			return this._numberDecimalSeparator;
		},
		numberGroupSeparator: function (value) {
			if (arguments.length === 1) {
				this._numberGroupSeparator = value;
			}

			if (!this._numberGroupSeparator) {
				var s = (123456789.0).toLocaleString(this._cultureName);
				var result = /\D/.exec(s);
				if (result === null || result.length === 0) {
					this._numberGroupSeparator = ",";
				} else {
					this._numberGroupSeparator = result[ 0 ];
				}
			}

			return this._numberGroupSeparator;
		},
		numberGroupSizes: function (value) {
			if (arguments.length === 1) {
				this._numberGroupSizes = value;
			}

			if (!this._numberGroupSizes) {
				var s = (123456789.0).toLocaleString(this._cultureName);
				var result = /\D(\d+)\D/.exec(s);

				if (result === null || result.length === 0) {
					this._numberGroupSizes = [ 3 ];
				} else {
					this._numberGroupSizes = [ result[ 1 ].length ];
				}
			}

			return this._numberGroupSizes;
		},
		$type: new $.ig.Type("NumberFormatInfo", $.ig.Object.prototype.$type) // TODO: Define and add IFormatProvider interface here
	}, true);

	$.ig.util.defType("Thread", "Object", {
		init: function () {
		},
		currentThread: function () {
			if (!this._currentThread) {
				this._currentThread = new $.ig.Thread();
			}

			return this._currentThread;
		},
		currentCulture: function (value) {
			if (arguments.length === 1) {
				this._currentCulture = value;
			}

			if (!this._currentCulture) {
				var currentLocale = navigator.language || navigator.userLanguage;
				this._currentCulture = new $.ig.CultureInfo(currentLocale);
			}

			return this._currentCulture;
		},
		$type: new $.ig.Type("Thread", $.ig.Object.prototype.$type)
	}, true);

	$.ig.util.defType("Stream", "Object", {
		init: function () {
		},
		close: function () {
			this.disposeCore(true);
		},
		dispose: function () {
			this.close();
		},
		disposeCore: function (disposing) {
		},
		flush: function () {
		},
		readByte: function () {
			var bytes = [ 0 ];
			var count = this.read(bytes, 0, 1);
			if (count === 0) {
				return -1;
			}

			return bytes[ 0 ];
		},
		writeByte: function (value) {
			this.write([ value ], 0, 1);
		},
		$type: new $.ig.Type("Stream", $.ig.Object.prototype.$type)
	}, true);

	(function () {

		$.ig.util.profiler = {};

		var methods = {};

		$.ig.util.profiler.recordTime = function (methodName, time) {
			var key = "meth: " + methodName;
			if (!methods[ key ]) {
				methods[ key ] = [ ];
			}
			methods[ key ][ methods[ key ].length ] = time;
		};

		$.ig.util.profiler.reset = function () {
			methods = {};
		};

		$.ig.util.profiler.logReport = function () {
			var meths = [ ];
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
	})();

	/*
	Function.prototype.invoke = function () {
		return this.apply(null, arguments);
	};

	Function.prototype.on = function (target) {
		var self = this;
		var ret = function () {
			return self.apply(target, arguments);
		};
		ret.original = this;
		ret.target = target;
		return ret;
	};
	*/

	$.ig.extendNativePrototype(Function.prototype, "invoke", function () {
		return this.apply(null, arguments);
	});

	$.ig.extendNativePrototype(Function.prototype, "runOn", function (target) {
		var self = this;
		var ret = function () {
			return self.apply(target, arguments);
		};
		ret.original = this;
		ret.target = target;
		return ret;
	});

	String.prototype.startsWith = function (s) {
		return this.indexOf(s) === 0;
	};

	String.prototype.startsWith1 = function (s, comparisonType) {
		if (this.length < s.length) {
			return false;
		}

		return $.ig.util.stringCompare1(this.slice(0, s.length), s, comparisonType || 0) === 0;
	};

	String.prototype.endsWith = function (s, comparisonType) {
		if (this.length < s.length) {
			return false;
		}

		return $.ig.util.stringCompare1(this.slice(-s.length), s, comparisonType || 0) === 0;
	};

	String.prototype.remove = function (index, count) {
		if (!count || ((index + count) > this.length)) {
			return this.substr(0, index);
		}
		return this.substr(0, index) + this.substr(index + count);
	};

	String.prototype.compareTo = function (other) {
		if (this == other) {
			return 0;
		}
		if (this < other) {
			return -1;
		}
		return 1;
	};

	if (!String.prototype.trim) {

		//String.trim() was added natively in JavaScript 1.8.1 / ECMAScript 5
		//supported in: Firefox 3.5+, Chrome/Safari 5+, IE9+ (in Standards mode only!)
		String.prototype.trim = function () {
			return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
		};
	}

	if (!String.prototype.getHashCode) {
		String.prototype.getHashCode = function () {
			var hash = 0, i, chr, len;
			if (this.length === 0) {
				return hash;
			}
			for (i = 0, len = this.length; i < len; i++) {
				chr = this.charCodeAt(i);
				/*jslint bitwise: true */
				hash = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}

			return hash;
		};
	}

	String.prototype.fullTrim = function () {
		return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
	};

	String.prototype.trimStart = function () {
		var args = [ " " ];
		if (arguments.length > 0) {
			args = Array.prototype.slice.call(arguments);
			if (args.length === 1 && $.isArray(args[ 0 ])) {
				args = args[ 0 ];
			}
		}
		if (this.length === 0) {
			return this;
		}
		var i = 0;
		for (; i < this.length && args.indexOf(this.charAt(i)) > -1; i++) { }
		return this.substring(i);
	};

	String.prototype.trimEnd = function () {
		var args = [ " " ];
		if (arguments.length > 0) {
			args = Array.prototype.slice.call(arguments);
			if (args.length === 1 && $.isArray(args[ 0 ])) {
				args = args[ 0 ];
			}
		}
		var i = this.length - 1;
		for (; i >= 0 && args.indexOf(this.charAt(i)) > -1; i--) { }
		return this.substring(0, i + 1);
	};

	String.getHashCode = function () { return this; };
	String.isNullOrEmpty = function (s) { return !s || s.length < 1; };
	String.isNullOrWhiteSpace = function (s) { return !s || s.trim().length < 1; };
	String.empty = function () { return ""; };
	String.concat = function () { return [ ].join.call(arguments, ""); };
	String.concat1 = function (o1, o2) { return [ ].join.call(arguments, ""); };
	String.concat2 = function (s1, s2) { return [ ].join.call(arguments, ""); };
	String.concat3 = function () { return [ ].join.call(arguments, ""); };
	String.concat4 = function (o1, o2, o3) { return [ ].join.call(arguments, ""); };
	String.concat5 = function (s1, s2, s3) { return [ ].join.call(arguments, ""); };
	String.concat6 = function (o1, o2, o3, o4) { return [ ].join.call(arguments, ""); };
	String.concat7 = function (s1, s2, s3, s4) { return [ ].join.call(arguments, ""); };
	String.equalsStatic = $.ig.Object.prototype.equalsStatic;

	String.prototype.equals = function (other) {
		return this == other;
	};

	String.prototype.contains = function (s) {
		return this.indexOf(s) > -1;
	};

	String.prototype.padLeft = function (len, c) {
		var s = this;
		c = c || " ";
		while (s.length < len) {
			s = c + s;
		}
		return s;
	};

	String.prototype.reverse = function () {
		/* Inverts the order of the characters in a string.
			returnType="string" Returns a new inverted string.
		*/
		var s = "";
		for (var i = this.length - 1; i >= 0; i--) {
			s += this[ i ];
		}
		return s;
	};

	String.prototype.padRight = function (len, c) {
		var s = this;
		c = c || " ";
		while (s.length < len) {
			s += c;
		}
		return s;
	};

	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	if (!String.prototype.indexOfAny) {
		String.prototype.indexOfAny = function (chars) {

			// On IE8, this[ i ] will return undefined
			var s = this.toString();

			for (var i = 0; i < s.length; i++) {
				if (chars.contains(s[ i ])) {
					return i;
				}
			}

			return -1;
		};
	}

	if (!String.prototype.lastIndexOfAny) {
		String.prototype.lastIndexOfAny = function (chars) {

			// On IE8, this[ i ] will return undefined
			var s = this.toString();

			for (var i = s.length - 1; i >= 0; i--) {
				if (chars.contains(s[ i ])) {
					return i;
				}
			}

			return -1;
		};
	}

	/*
	Array.prototype.insertRange = function (index, items) {
		var i = 0;
		if (this.length == 0) {
			for (i = 0; i < items.length; i++) {
			this[ index++ ] = items[ i ];
		}
		} else {
			for (i = 0; i < items.length; i++) {
				this.splice(index++, 0, items[ i ]);
	}
		}
	};

	Array.prototype.clone = function () {
		return $.extend(true, [ ], this);
	};

	Array.prototype.clear = function () {
		this.length = 0;
	};
	*/

	/* S.S. March 12, 2013 - Bug #134399 Adding filter for older browsers */
	if (!Array.prototype.filter) {
		Array.prototype.filter = function (fun/*, thisp */) {
			var t, len, res, thisp, val, i;
			if (this === undefined || this === null) {
				throw new TypeError();
			}
			t = Object(this);
			/*jslint bitwise: true */
			len = t.length >>> 0;
			if (typeof fun != "function") {
				throw new TypeError();
			}
			res = [ ];
			thisp = arguments[ 1 ];
			for (i = 0; i < len; i++) {
				if (i in t) {
					val = t[ i ]; // in case fun mutates this
					if (fun.call(thisp, val, i, t)) {
						res.push(val);
					}
				}
			}
			return res;
		};
	}

	$.ig.extendNativePrototype(Array.prototype, "insertRange", function (index, items) {
		var i = 0;
		if (this.length === 0) {
			for (i = 0; i < items.length; i++) {
				this[ index++ ] = items[ i ];
			}
		} else {
			for (i = 0; i < items.length; i++) {
				this.splice(index++, 0, items[ i ]);
			}
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "insertRange1", function (index, items) {

		//TODO: adjust this later, but this is the safest change to make right now.
		var i = 0;
		if (this.length === 0) {
			for (i = 0; i < items.length; i++) {
				this[ index++ ] = items[ i ];
			}
		} else {
			for (i = 0; i < items.length; i++) {
				this.splice(index++, 0, items[ i ]);
			}
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "clone", function () {
		return $.extend(true, [ ], this);
	});

	$.ig.extendNativePrototype(Array.prototype, "clear", function () {
		this.length = 0;
	});

	Math.log10 = function (n) {
		return Math.log(n) / Math.log(10);
	};

	Math.logBase = function (n, n2) {
		return Math.log(n) / Math.log(n2);
	};

	Math.sign = function (n) {
		if (n < 0) {
			return -1;
		} else if (n > 0) {
			return 1;
		} else {
			return 0;
		}
	};

	if (!Math.cosh) {
		Math.cosh = function (x) {
			var y = Math.exp(x);
			return (y + 1 / y) / 2;
		};
	}

	if (!Math.sinh) {
		Math.sinh = function (x) {
			var y = Math.exp(x);
			return (y - 1 / y) / 2;
		};
	}

	if (!Math.tanh) {
		Math.tanh = function (x) {
			if (x === Infinity) {
				return 1;
			} else if (x === -Infinity) {
				return -1;
			} else {
				var y = Math.exp(2 * x);
				return (y - 1) / (y + 1);
			}
		};
	}

	if (!Math.ieeeRemainder) {
		Math.ieeeRemainder = function (a, b) {
			var r = Math.abs(a % b);
			if (isNaN(r) || r == b || r <= Math.abs(b) / 2.0) {
				return r;
			} else {
				return Math.signum(a) * (r - b);
			}
		};
	}

	Number.getHashCode = function () { return this; };

	//Number.isNaN = function(n) { return isNaN(n); }
	Number.isInfinity = function (n) { return n === Infinity || n === -Infinity; };

	if (!Number.prototype.getHashCode) {
		Number.prototype.getHashCode = function () {
			return this;
		};
	}

	Boolean.prototype.getType = function () {
		return $.ig.Boolean.prototype.$type;
	};

	Number.prototype.getType = function () {
		return Number;
	};

	String.prototype.getType = function () {
		return String;
	};

	/*
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function (from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
	*/

	// K.D. Fix for WinJS dynamic content exceptions.
	window.toStaticHTML = window.toStaticHTML || function (s) { return s; };
	window.MSApp = window.MSApp || {};
	window.MSApp.execUnsafeLocalFunction = window.MSApp.execUnsafeLocalFunction ||
		function (fn) { fn.apply(); };

	// N.A. 10/17/2013 - Bug #155039: The property "offset" is deprecated in 1.9.
	$.ig.util.jQueryUIMainVersion = $.ui && $.ui.version &&
		$.ui.version.length > 0 ? parseInt($.ui.version.split(".", 1)[ 0 ], 10) : null;
	$.ig.util.jQueryUISubVersion = $.ui && $.ui.version &&
		$.ui.version.length > 0 ? parseInt($.ui.version.split(".", 2)[ 1 ], 10) : null;

	$.ig.util.jQueryMainVersion = $.fn.jquery &&
		$.fn.jquery.length ? parseInt($.fn.jquery.split(".", 1)[ 0 ], 10) : null;
	$.ig.util.jQuerySubVersion = $.fn.jquery &&
		$.fn.jquery.length ? parseInt($.fn.jquery.split(".", 2)[ 1 ], 10) : null;

	//A CommonJS Promises/A implementation that will be used with jquery versions prior to 1.5
	//that do not have a $.Deferred implementation

	// String to Object flags format cache
	$.ig.util.jqueryFlagsCache = {};

	// Convert String-formatted flags into Object-formatted ones and store in cache
	$.ig.util.jqueryCreateFlags = function (flags) {
		var object = $.ig.util.jqueryFlagsCache[ flags ] = {},
				i, length;
		flags = flags.split(/\s+/);
		for (i = 0, length = flags.length; i < length; i++) {
			object[ flags[ i ] ] = true;
		}
		return object;
	};

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	flags:	an optional list of space-separated flags that will change how
	 *			the callback list behaves
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible flags:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
		$.ig.util.jqueryCallbacks = function( flags ) {

		// Convert flags from String-formatted to Object-formatted
		// (we check in cache first)
			flags = flags ? ($.ig.util.jqueryFlagsCache[ flags ] ||
				$.ig.util.jqueryCreateFlags(flags)) : { };

		var // Actual Callbacks object
			self,

			// Actual callback list
			list = [ ],

			// Stack of fire calls for repeatable lists
			stack = [ ],

			// Last fire value (for non-forgettable lists)
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to know if list is currently firing
			firing,

			// First callback to fire (used internally by add and fireWith)
			firingStart,

			// End of the loop when firing
			firingLength,

			// Index of currently firing callback (modified by remove if needed)
			firingIndex,

			// Add one or several callbacks to the list
			add = function( args ) {
				var i,
					length,
					elem,
					type,
					actual;
				for ( i = 0, length = args.length; i < length; i++ ) {
					elem = args[ i ];
					type = $.type( elem );
					if (type === "array") {

						// Inspect recursively
						add( elem );
					} else if (type === "function") {

						// Add if not in unique mode and callback is not in
						if ( !flags.unique || !self.has( elem ) ) {
							list.push( elem );
						}
					}
				}
			},

			// Fire callbacks
			fire = function( context, args ) {
				args = args || [ ];
				memory = !flags.memory || [ context, args ];
				fired = true;
				firing = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
						memory = true; // Mark as halted
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( !flags.once ) {
						if ( stack && stack.length ) {
							memory = stack.shift();
							self.fireWith( memory[ 0 ], memory[ 1 ] );
						}
					} else if ( memory === true ) {
						self.disable();
					} else {
						list = [ ];
					}
				}
			};

			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						var length = list.length;
						add(arguments);

						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;

						// With memory, if we're not firing then
						// we should call right away, unless previous
						// firing was halted (stopOnFalse)
						} else if ( memory && memory !== true ) {
							firingStart = length;
							fire( memory[ 0 ], memory[ 1 ] );
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						var args = arguments,
							argIndex = 0,
							argLength = args.length;
						for ( ; argIndex < argLength ; argIndex++ ) {
							for ( var i = 0; i < list.length; i++ ) {
								if (args[ argIndex ] === list[ i ]) {

									// Handle firingIndex and firingLength
									if ( firing ) {
										if ( i <= firingLength ) {
											firingLength--;
											if ( i <= firingIndex ) {
												firingIndex--;
											}
										}
									}

									// Remove the element
									list.splice(i--, 1);

									// If we have some unicity property then
									// we only need to do this once
									if ( flags.unique ) {
										break;
									}
								}
							}
						}
					}
					return this;
				},

				// Control if a given callback is in the list
				has: function( fn ) {
					if ( list ) {
						var i = 0,
							length = list.length;
						for ( ; i < length; i++ ) {
							if ( fn === list[ i ] ) {
								return true;
							}
						}
					}
					return false;
				},

				// Remove all callbacks from the list
				empty: function () {
					list = [ ];
					return this;
				},

				// Have the list do nothing anymore
				disable: function () {
					list = stack = memory = undefined;
					return this;
				},

				// Is it disabled?
				disabled: function () {
					return !list;
				},

				// Lock the list in its current state
				lock: function () {
					stack = undefined;
					if ( !memory || memory === true ) {
						self.disable();
					}
					return this;
				},

				// Is it locked?
				locked: function () {
					return !stack;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( stack ) {
						if ( firing ) {
							if ( !flags.once ) {
								stack.push( [ context, args ] );
							}
						} else if ( !( flags.once && memory ) ) {
							fire( context, args );
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function () {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function () {
					return !!fired;
				}
			};

		return self;
	};

	$.ig.util.jqueryDeferred = function( func ) {
		var deferred,
			doneList = $.ig.util.jqueryCallbacks( "once memory" ),
			failList = $.ig.util.jqueryCallbacks( "once memory" ),
			progressList = $.ig.util.jqueryCallbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function () {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function ( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function () {
					deferred.done.apply( deferred, arguments ).fail.apply(deferred, arguments);
					return this;
				},
				pipe: function ( fnDone, fnFail, fnProgress ) {
					return $.ig.util.jqueryDeferred(function ( newDefer ) {
						$.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function ( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( $.isFunction( fn ) ) {
								deferred[ handler ](function () {
									returned = fn.apply( this, arguments );
									if ( returned && $.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function ( obj ) {
					if (obj === undefined || obj === null) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			key;

			deferred = promise.promise({});

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done(function () {
			state = "resolved";
		}, failList.disable, progressList.lock).fail(function () {
			state = "rejected";
		}, doneList.disable, progressList.lock);

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	};

	// PA 7/8/2013 - fix for jQuery versions in the interval (1.4.4, 1.7.0) where $.Deferred is defined, but has some missing members that we need
	$.ig.util.checkDeferred = function () {
		$.ig.util.deferredDefined = !!($.Deferred !== undefined && $.Deferred().state);
	};

	$.ig.util.deferred = function () {
		if ($.ig.util.deferredDefined === undefined) {
			$.ig.util.checkDeferred();
		}

		if ($.ig.util.deferredDefined) {
			return $.Deferred();
		} else {
			return $.ig.util.jqueryDeferred();
		}
	};

	$.ig.util.ajax = function (url, contentType, data, method, requestOptions) {
		//return $.ig.util.corsRequest(url, contentType, data, method, requestOptions);

		var deferred = $.ig.util.deferred();
		var isCrossDomain;
		if (requestOptions && "isCrossDomain" in requestOptions) {
			isCrossDomain = requestOptions.isCrossDomain;
		} else {
			isCrossDomain = $.support.cors;
		}

		var xhrObj = (function (rOptions) {
			var xhr = new XMLHttpRequest();

			// do not use XDomainRequest for IE8/IE9 if the user has specifed withCredentials in request options
			// which is interpreted as XmlHttpRequest to be used against trusted domain
			// since XDomainRequest does not support withCredentials
			if (isCrossDomain &&
				!(("withCredentials" in xhr) ||
				(rOptions && "withCredentials" in rOptions && rOptions.withCredentials)) &&
					typeof XDomainRequest != "undefined") {

				// handle IE8/IE9 with anonymous authentication
				xhr = new XDomainRequest();

				// fix for jQuery.ajax() callback is expecting some methods and props are defined
				// PP 12/05/2012 jQuery 1.4.4 fix
				xhr.getResponseHeader = function () {
					return null;
				};

				// M.S. July 24st, 2013 Bug #145199 Fixed the data loading from XMLA, when using jQuery 2.0.0 in IE9
				xhr.setRequestHeader = function () {
					xhr.status = 200;
				};

				xhr.getAllResponseHeaders = function () {
					return null;
				};

				xhr.onload = function () {
					xhr.readyState = 4;
					xhr.status = 200;
					xhr.statusText = "success";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				xhr.onerror = function () {
					xhr.readyState = 4;
					xhr.status = 0;
					xhr.statusText = "error";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				xhr.ontimeout = function () {
					xhr.readyState = 4;
					xhr.status = 0;
					xhr.statusText = "timeout";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				// keep this callback because otherwise XDomainRequest is aborted
				// it's a bug in XDomainRequest
				xhr.onprogress = function () {
				};
			}

			return xhr;
		})(requestOptions);

		var xhrFields;

		// when credentials are specified that will work with Chrome/FireFox/IE10
		if ("withCredentials" in xhrObj &&
			requestOptions && "withCredentials" in requestOptions &&
		requestOptions.withCredentials) {

			xhrFields = {
				withCredentials: true
			};
		}

		var beforeSend = function (jqXHR, options) {
			if (requestOptions) {

				if ($.isFunction(requestOptions.beforeSend)) {
					jqXHR.setRequestHeader("Content-Type", contentType);
					requestOptions.beforeSend.call(this, jqXHR, options, requestOptions);
				}
			}
		};

		$.ajax({
			crossDomain: (isCrossDomain ? true : false),
			isLocal: false,
			url: url,
			contentType: contentType,
			data: data,
			type: method,
			dataType: "text",
			xhrFields: xhrFields,
			beforeSend: beforeSend,
			xhr: function () {
				return xhrObj;
			},
			success: function (responce, textStatus, jqXHR) {
				deferred.resolve(responce);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				deferred.reject(errorThrown);
			}
		});

		return deferred.promise();
	};

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

	// Synchronize width/height of widget with its chart/dv controller
	// elem - jquery object which represents widget.element
	// prop - string "width" or "height".
	//   Notes: If it is missing, then a call from destroy is assumed and object/timer is deleted.
	//   A widget must call that method within destroy passing only 1st this.element parameter.
	// val - new value for width or height. It can be any html unit or number: 200, "200", "200px", "50%", "10cm", etc.
	//   Note: if widget was created without explicit width/height and relies on size of target-html element, then null can be used.
	//   In this case if html element was hidden on start, then that method catches first rendering, sets chart.width/height(values) and notifies resized.
	// chart - reference to xam/chart object which controls widgit
	// notifyResized - name of method which should be called when widget was resized
	//
	// Example for codes within create():
	//   if (this.options.width)
	//       $.ig.util.setSize(this.element, "width", this.options.width, this._chart, "notifyResized");
	// Example for codes within create() when no width or height is specified (support for initially hidden element):
	//   if (!this.options.width && !this.options.width)
	//       $.ig.util.setSize(this.element, "width", null, this._chart, "notifyResized");
	// Example for codes within _setOption(key, val):
	//   if (key === "width" || key === "height")
	//       $.ig.util.setSize(this.element, key, val, this._chart, "notifyResized");
	// Example for codes within destroy():
	//   $.ig.util.setSize(this.element);
	$.ig.util.setSize = function (elem, prop, val, chart, notifyResized) {
		if (!elem || !elem[ 0 ]) {
			return;
		}
		var timer, px,
			obj = elem[ 0 ]._w_s_f = elem[ 0 ]._w_s_f || {}, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers

			// width/height flags which trigger timer and adjustments of width/height on ticks
			perc = obj.perc;
		if (!prop) {
			if (obj.tickID) {
				obj.onTick(true);
			}
			delete obj.elem;
			delete obj.chart;
			elem[ 0 ]._w_s_f = null; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return;
		}
		if (!val) {
			val = elem[ prop ]();
		}
		if (perc && perc.indexOf(prop) >= 0) {
			perc = perc.replace(prop, "");
		}
		if (val) {
			elem[ prop ](val);
			if (typeof val !== "number") {

				// possible cases to process:
				// if(##===##px) then use same logic as for number
				// ##% - start timer
				// ##xxx - use elem.offsetWidth/Height for _xam.width/height
				// if elem.offsetWidth or elem.offsetHeight is 0, then start timer
				val = val.toString();
				if (val.indexOf("%") > 0) {
					perc = perc || "";
					if (perc.indexOf(prop) < 0) {

						// start timer
						timer = perc += prop;
					}
				}
				px = val.indexOf("px");
				if (px > 0) {
					val = val.substring(0, px);
				}
				px = parseFloat(val);

				// use same logic as for number
				if (px.toString() === val) {
					val = px;
				} else {
					val = elem[ prop ]();
					if (!val) {

						// width/height flags which trigger timer and adjustments of width/height on ticks
						obj.wait = obj.wait || "";
						if (obj.wait.indexOf(prop) < 0) {
							obj.wait += prop;
						}

						// start timer
						timer = prop;
					}
				}
			}
			obj.perc = perc;
			if (val && chart) {
				if (chart[ prop ]) {
					chart[ prop ](val);
				}
				if (notifyResized) {
					chart[ notifyResized ]();
				}
			}
		}
		if (!timer && !elem[ 0 ].offsetWidth) {
			timer = obj.wait = "width";
		}

		obj.elem = elem;
		obj.chart = chart;
		obj.notify = notifyResized;

		if (timer) {

			// stop: stop timer: coming from destroy
			obj.onTick = obj.onTick || function (stop) {

				// request to call notifyResized
				var resize,
					obj = this,
					chart = obj.chart,
					elem = obj.elem,
					perc = obj.perc || "",
					wait = obj.wait || "",
					width = stop || elem[ 0 ].offsetWidth,
					height = stop || elem[ 0 ].offsetHeight,
					oldWidth = obj.oldWidth || 0,
					oldHeight = obj.oldHeight || 0;
				stop = stop === true || (!perc && !wait);
				if (stop) {
					if (obj.tickID) {
						clearInterval(obj.tickID);
					}
					delete obj.tickID;
					return;
				}
				if (!obj.tickID && (!width || !height || perc)) {
					obj.tickID = setInterval(function () {
						obj.onTick();
					}, 200);
				}
				if (!width || !height) {
					return;
				}

				// width/height was adjusted
				delete obj.wait;

				// current instant width/height
				obj.oldWidth = width;
				obj.oldHeight = height;
				if (!chart) {
					return;
				}
				if (chart.width && ((perc.indexOf("width") >= 0 && width !== oldWidth) ||
					wait.indexOf("width") >= 0)) {
					chart.width(resize = width);
				}
				if (chart.height && ((perc.indexOf("height") >= 0 && height !== oldHeight) ||
					wait.indexOf("height") >= 0)) {
					chart.height(resize = height);
				}
				if (resize && obj.notify) {
					chart[ obj.notify ]();
				}
			};
			obj.onTick();
		}

		if (obj.chart && obj.notify && obj.chart[ obj.notify ] && !obj.__resizeProxy) {
			obj.oldDevicePixelRatio = window.devicePixelRatio || 1.0;
			obj.__resizeProxy = function () {
				var devicePixelRatio = window.devicePixelRatio || 1.0;
				if (devicePixelRatio !== obj.oldDevicePixelRatio) {
					obj.oldDevicePixelRatio = window.devicePixelRatio || 1.0;
					obj.chart[ obj.notify ]();
				}
			};
			window.addEventListener("resize", obj.__resizeProxy, false);
		}
	};

	$.ig.util.getEasingFunction = function (easingValue) {
		if (easingValue === null || easingValue == "null" ||
			easingValue == "linear") {
			return null;
		}
		switch (easingValue) {
			case "cubic":
				return $.ig.EasingFunctions.prototype.cubicEase;
		}

		return easingValue;
	};

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

	// Checks if given object is a DOM element
	$.ig.util.isDomElement = function (o) {
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement :
			o && typeof o === "object" && o !== null && o.nodeType === 1 &&
			typeof o.nodeName === "string"
		);
	};

	// necessary to automatically detect whether to instantiate JSONP datasource from the URL
	$.ig.util.isJsonpUrl = function (url) {
		var isJSONPExpr = /(=)\?(?=&|$)|\?\?/;

		return isJSONPExpr.test(url);
	};

	// returns button of mouse (down) event: 0-left, 1-middle, 2-right
	$.ig.util.evtButton = function (e) {
		e = e ? e.button : null;
		if (e === 1) {
			e = this._ie_8; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			if (!e) {
				var v;
				e = window.navigator.userAgent;
				if (e) {
					// check if IE and its browser mode is 9 or higher
					v = e.toLowerCase().indexOf("msie ");
					if (v > 0) {
						v = parseFloat(e.substring(v + 5));
						if (v > 8) {
							// check if IE document mode is 9 or higher
							v = parseFloat(document.documentMode);
						}
					}
				}

				// flag for IE8 and less
				this._ie_8 = e = v && !isNaN(v) && v > 5 && v < 9 ? 1 : -1; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			}

			// treat button==1 of IE 8 and less as 0
			e = e < 0 ? 1 : 0;
		}

		// IE8 may have middle button as 4 instead of 1
		return (e === 2) ? 2 : (e ? 1 : 0);
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

	// returns date object(from string formatted in ISO8601)
	$.ig.util.dateFromISO = function (obj) {
		var //regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,7})(?:Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/,
			regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{1,7})(?:Z|([\-+])(\d{2}):(\d{2}))?)?)?)?)?)?)?$/,
			m = regexIso8601.exec(obj);
		if (m) {
			return new Date(Date.UTC(
				m[ 1 ],
				(m[ 2 ] || 1) - 1,
				m[ 3 ] || 1,
				m[ 4 ] - (m[ 8 ] ? m[ 8 ] + m[ 9 ] : 0) || 0,
				m[ 5 ] - (m[ 8 ] ? m[ 8 ] + m[ 10 ] : 0) || 0,
				m[ 6 ] || 0,
				((m[ 7 ] || 0) + "00").substr(0, 3)
			));
		}
		return obj;
	};

	$.ig.util.defaultDVDateParse = function (obj) {
		return new Date(parseInt(obj.replace("/Date(", "").replace(")/", ""), 10));
	};

	// creates crc32 table
	$.ig.util.makeCRCTable = function () {
		var c, n, k, crcTable = [ ];
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

	$.ig.util.createGuid = function () {
		/*jslint bitwise: true */
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}

		return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() +
			S4() + S4()).toLowerCase();
	};

	$.ig.util.escapeRegExp = function (str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	// To escape jQuery selectors. It escapes basically everything questionable
	$.ig.util.escapeStr = function (str) {
		return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "\\$1");
	};

	$.ig.util.replace = function (str, oldValue, newValue) {
		return str.replace(new RegExp($.ig.util.escapeRegExp(oldValue), "g"), newValue);
	};

	// Implements the .NET String.Format functionality
	$.ig.util.stringFormat = function (format) {
		return $.ig.util.stringFormat1(format, Array.prototype.slice.call(arguments, 1));
	};

	$.ig.util.stringFormat1 = function (format, args) {
		return $.ig.util.stringFormat2($.ig.CultureInfo.prototype.currentCulture(), format, args);
	};

	$.ig.util.stringFormat2 = function (provider, format, args) {

		// TODO: Use the provider somehow
		return format.replace(/{(\d+)(?::)?([^}]*)?}/g, function (match, number, format) {
			var arg = args[ number ];

			if (arg === void 0) {
				return match;
			}

			if (arg === null) {
				return "";
			}

			if (format) {
				if (format[ 0 ] === "X") {
					return $.ig.util.intToString1(arg, format, provider);
				} else {
					return $.ig.util.numberToString1(arg, format, provider);
				}
			}

			return arg;
		});
	};

	$.ig.util.createInstance = function ($t) {
		if ($t === Number || $t == $.ig.Number.prototype.$type ||
			$t.baseType === $.ig.Enum.prototype.$type) {
			return 0;
		}

		if ($t == Boolean || $t == $.ig.Boolean.prototype.$type) {
			return false;
		}

		if ($t.InstanceConstructor) {
			var result;
			if (typeof Object.create === "function") {
				result = Object.create($t.InstanceConstructor.prototype);
			} else {
				var Cons = function () { };
				Cons.prototype = $t.InstanceConstructor.prototype;
				result = new Cons();
			}
			$t.InstanceConstructor.apply(result, Array.prototype.slice.call(arguments, 1));
			return result;
		}

		throw new Error("Cannot find instance constructor for the type parameter");
	};

	$.ig.util.getDefaultValue = function ($t) {
		if ($t === Number || $t == $.ig.Number.prototype.$type ||
			$t.baseType === $.ig.Enum.prototype.$type) {
			return 0;
		}

		if ($t == Boolean || $t == $.ig.Boolean.prototype.$type) {
			return false;
		}

		if ($t.baseType === $.ig.ValueType.prototype.$type) {
			return $.ig.util.createInstance($t);
		}

		return null;
	};

	$.ig.util.equalsSimple = function (item1, item2) {
		return item1 == item2;
	};

	$.ig.util.compareSimple = function (item1, item2) {
		if (item1 == item2) {
			return 0;
		}

		if (item1 < item2) {
			return -1;
		}
		return 1;
	};

	$.ig.util.compare = function (item1, item2) {
		if (item1 === item2) {
			return 0;
		}

		var xComparable = $.ig.util.cast($.ig.IComparable.prototype.$type, item1);
		if (xComparable !== null) {
			return xComparable.compareTo(item2);
		}

		var yComparable = $.ig.util.cast($.ig.IComparable.prototype.$type, item2);
		if (yComparable !== null) {
			return -yComparable.compareTo(item1);
		}

		return $.ig.util.compareSimple(item1, item2);
	};

	$.ig.util.boolCompare = function (item1, item2) {
		if (item1 == item2) {
			return 0;
		}

		return item1 ? 1 : -1;
	};

	// Check wheather certain array of values is equal to another array
	$.ig.util.areSetsEqual = function (array1, array2) {
	    var sortedArray1, sortedArray2;

	    if (!array1 || !array2 || array1.length !== array2.length) { return false; }

	    if (array1 === array2) { return true; }

	    sortedArray1 = array1.slice().sort();
	    sortedArray2 = array2.slice().sort();

	    for (var i = 0; i < sortedArray1.length; i++) {
	        if (sortedArray1[ i ] !== sortedArray2[ i ]) { return false; }
	    }

	    return true;
	};

	$.ig.util.sleep = function (milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	};

	$.ig.util.toCharArray = function (string) {
		{
			return string.split("");
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
	$.ig.util.stringCompare1 = function (strA, strB, comparisonType) {

		if (!strA) {
			return !strB ? 0 : -1;
		} else if (!strB) {
			return 1;
		}

		// TODO: Make sure this is right
		switch (comparisonType) {
			case $.ig.StringComparison.prototype.currentCulture:
				return $.ig.CultureInfo.prototype.currentCulture()
					.compareInfo().compare4(strA, strB);
			case $.ig.StringComparison.prototype.currentCultureIgnoreCase:
				return $.ig.CultureInfo.prototype.currentCulture().compareInfo()
					.compare4(strA.toLowerCase(), strB.toLowerCase());
			case $.ig.StringComparison.prototype.invariantCulture:
			case $.ig.StringComparison.prototype.ordinal:
				return strA.compareTo(strB);
			case $.ig.StringComparison.prototype.invariantCultureIgnoreCase:
			case $.ig.StringComparison.prototype.ordinalIgnoreCase:
				return strA.toLowerCase().compareTo(strB.toLowerCase());
			default:
				break;
		}

		return 0;
	};

	$.ig.util.stringCompare2 = function (strA, strB, culture, options) {
		return culture.compareInfo().compare5(strA, strB, options);
	};

	$.ig.util.stringCompare3 = function (strA, indexA, strB, indexB, length) {
		var v1 = strA.substr(indexA, length);
		var v2 = strB.substr(indexB, length);
		return $.ig.util.stringCompare1(v1, v2, $.ig.StringComparison.prototype.currentCulture);
	};

	$.ig.util.tryParseNumber = function (s) {
		var value = Number(s);
		if (value !== null && isFinite(value) && s.trim().length !== 0) {
			return {
				p1: value,
				ret: true
			};
		} else {
			return {
				p1: 0,
				ret: false
			};
		}
	};

	$.ig.util.tryParseNumber1 = function (s, style, provider) {
		var value,
			i,
			currentCharCode;

		provider = provider || $.ig.CultureInfo.prototype.currentCulture();

		/*jslint bitwise: true */
		if (style & $.ig.NumberStyles.prototype.allowLeadingWhite) {
			s = s.trimStart();
		}

		if (style & $.ig.NumberStyles.prototype.allowTrailingWhite) {
			s = s.trimEnd();
		}

		if (s.length != s.trim().length) {
			return {
				p3: 0,
				ret: false
			};
		}

		var numberFormat = provider.numberFormat();

		if (style & $.ig.NumberStyles.prototype.allowCurrencySymbol) {
			// TODO: Use the locale specific symbol from the provider here
			if (s[ 0 ] == "$") {
				s = s.slice(1);
			}
		}

		var multiplier = 1;
		var hadParentheses = false;
		if (style & $.ig.NumberStyles.prototype.allowParentheses) {
			if (s[ 0 ] == "(" && s[ s.length - 1 ] == ")") {
				hadParentheses = true;
				multiplier *= -1;
				s = s.slice(1, -1);
			}
		}

		if (style & $.ig.NumberStyles.prototype.allowCurrencySymbol) {
			// TODO: Use the locale specific symbol from the provider here
			if (s[ 0 ] == "$") {
				s = s.slice(1);
			}
		}

		if (style & $.ig.NumberStyles.prototype.allowLeadingSign) {
			var positiveSign = numberFormat.positiveSign();
			var negativeSign = numberFormat.negativeSign();
			if (s[ 0 ] == positiveSign || s[ 0 ] == negativeSign) {

				if (hadParentheses) {
					return {
						p3: 0,
						ret: false
					};
				}

				if (s[ 0 ] == negativeSign) {
					multiplier *= -1;
				}

				s = s.slice(1);
			}
		}

		if (style & $.ig.NumberStyles.prototype.allowTrailingSign) {
			// TODO
		}

		if (style & $.ig.NumberStyles.prototype.allowDecimalPoint) {

			if (style & $.ig.NumberStyles.prototype.allowExponent) {
				// TODO
			}

			if (style & $.ig.NumberStyles.prototype.allowThousands) {
				var decimalSeparator = numberFormat.numberDecimalSeparator();
				var groupSeparator = numberFormat.numberGroupSeparator();

				var hitDecimalSeparator = false;
				for (i = 0; i < s.length; i++) {
					switch (s[ i ]) {
						case groupSeparator:
							if (hitDecimalSeparator) {
								return {
									p3: 0,
									ret: false
								};
							}

							s = s.slice(0, i) + s.slice(i + 1);
							i--;
							break;

						case decimalSeparator:
							hitDecimalSeparator = true;
							if (decimalSeparator != ".") {
								s = s.slice(0, i) + "." + s.slice(i + 1);
							}
							break;
					}
				}
			}

			value = Number(s);

			if (value !== null && isFinite(value) && s.trim().length !== 0) {
				return {
					p3: value * multiplier,
					ret: true
				};
			}
		} else {
			var zeroCharCode = "0".charCodeAt(0);
			var nineCharCode = "9".charCodeAt(0);

			value = 0;

			if (style & $.ig.NumberStyles.prototype.allowHexSpecifier) {
				var aCharCode = "a".charCodeAt(0);
				var fCharCode = "f".charCodeAt(0);
				var ACharCode = "A".charCodeAt(0);
				var FCharCode = "F".charCodeAt(0);

				for (i = 0; i < s.length; i++) {
					value *= 16;

					currentCharCode = s[ i ].charCodeAt(0);
					if (zeroCharCode <= currentCharCode && currentCharCode <= nineCharCode) {
						value += (currentCharCode - zeroCharCode);
					} else if (aCharCode <= currentCharCode && currentCharCode <= fCharCode) {
						value += (currentCharCode - aCharCode) + 10;
					} else if (ACharCode <= currentCharCode && currentCharCode <= FCharCode) {
						value += (currentCharCode - ACharCode) + 10;
					} else {
						return {
							p3: 0,
							ret: false
						};
					}
				}
			} else {
				for (i = 0; i < s.length; i++) {
					value *= 10;

					currentCharCode = s[ i ].charCodeAt(0);
					if (zeroCharCode <= currentCharCode && currentCharCode <= nineCharCode) {
						value += (currentCharCode - zeroCharCode);
					} else {
						return {
							p3: 0,
							ret: false
						};
					}
				}
			}

			return {
				p3: value * multiplier,
				ret: true
			};
		}

		return {
			p3: 0,
			ret: false
		};
	};

	$.ig.util.parseNumber = function (s, provider) {
		var r = $.ig.util.tryParseNumber1(s, 231, provider);
		if (!r.ret) {
			throw new $.ig.FormatException(1, "Incorrect number format");
		}

		return r.p3;
	};

	$.ig.util.isNegativeInfinity = function (v) {
		return v == Number.NEGATIVE_INFINITY;
	};

	$.ig.util.isPositiveInfinity = function (v) {
		return v == Number.POSITIVE_INFINITY;
	};

	$.ig.util.parseInt8_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -128, 127);
	};

	$.ig.util.parseInt8_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -128, 127, style);
	};

	$.ig.util.parseInt16_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -32768, 32767);
	};

	$.ig.util.parseInt16_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -32768, 32767, style);
	};

	$.ig.util.parseInt32_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -2147483648, 2147483647);
	};

	$.ig.util.parseInt32_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -2147483648, 2147483647, style);
	};

	$.ig.util.parseInt64_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, -9223372036854775808, 9223372036854775807);
	};

	$.ig.util.parseInt64_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.
			parseIntCore(s, provider, -9223372036854775808, 9223372036854775807, style);
	};

	$.ig.util.parseUInt8_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 255);
	};

	$.ig.util.parseUInt8_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 255, style);
	};

	$.ig.util.parseUInt16_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 65535);
	};

	$.ig.util.parseUInt16_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 65535, style);
	};

	$.ig.util.parseUInt32_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 4294967295);
	};

	$.ig.util.parseUInt32_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 4294967295, style);
	};

	$.ig.util.parseUInt64_1 = function (s, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 18446744073709551615);
	};

	$.ig.util.parseUInt64_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.parseIntCore(s, provider, 0, 18446744073709551615, style);
	};

	$.ig.util.parseIntCore = function (s, provider, min, max, style) {
		var r = $.ig.util.tryParseIntCore(s, provider, min, max, style);

		if (!r.ret) {
			throw new $.ig.FormatException(1, "Incorrect number format");
		}

		return r.p3;
	};

	$.ig.util.tryParseInt8_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, -128, 127);
	};

	$.ig.util.tryParseInt8_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, -128, 127, style);
	};

	$.ig.util.tryParseInt16_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, -32768, 32767);
	};

	$.ig.util.tryParseInt16_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, -32768, 32767, style);
	};

	$.ig.util.tryParseInt32_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, -2147483648, 2147483647);
	};

	$.ig.util.tryParseInt32_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, -2147483648, 2147483647, style);
	};

	$.ig.util.tryParseInt64_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, -9223372036854775808, 9223372036854775807);
	};

	$.ig.util.tryParseInt64_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util
			.tryParseIntCore(s, provider, -9223372036854775808, 9223372036854775807, style);
	};

	$.ig.util.tryParseUInt8_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, 0, 255);
	};

	$.ig.util.tryParseUInt8_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, 0, 255, style);
	};

	$.ig.util.tryParseUInt16_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, 0, 65535);
	};

	$.ig.util.tryParseUInt16_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, 0, 65535, style);
	};

	$.ig.util.tryParseUInt32_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, 0, 4294967295);
	};

	$.ig.util.tryParseUInt32_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, 0, 4294967295, style);
	};

	$.ig.util.tryParseUInt64_1 = function (s) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, null, 0, 18446744073709551615);
	};

	$.ig.util.tryParseUInt64_2 = function (s, style, provider) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		return $.ig.util.tryParseIntCore(s, provider, 0, 18446744073709551615, style);
	};

	$.ig.util.tryParseIntCore = function (s, provider, min, max, style) {
		/*jshint eqnull:true */
		/*jslint bitwise: true */
		style = style != null ? style : $.ig.NumberStyles.prototype.integer; // Don't use || here, because 0 could be a valid style
		provider = provider || $.ig.CultureInfo.prototype.currentCulture();

		var r = $.ig.util.tryParseNumber1(s, style, provider);

		if ((style & $.ig.NumberStyles.prototype.allowHexSpecifier) && max < r.p3) {
			r.p3 -= (-min * 2);
		}

		if (!r.ret || r.p3 < min || max < r.p3 || r.p3 % 1 !== 0) {
			return {
				p1: 0,
				p3: 0,
				ret: false
			};
		}

		r.p1 = r.p3;
		return r;
	};

	$.ig.util.parseBool = function (s) {
		var r = $.ig.util.tryParseBool(s);

		if (!r.ret) {
			throw new $.ig.FormatException(1, "Incorrect boolean format");
		}

		return r.p1;
	};

	$.ig.util.tryParseBool = function (s) {
		switch (s == null ? "" : s.trim().toLowerCase()) {
			case "true":
				return {
					p1: true,
					ret: true
				};

			case "false":
				return {
					p1: false,
					ret: true
				};

			default:
				return {
					p1: false,
					ret: false
				};
		}
	};

	$.ig.util.arrayClear1 = function (array, index, length) {
		for (var i = index; i < index + length; i++) {
			array[ i ] = null;
		}
	};

	$.ig.util.arrayCopy1 = function (source, sourceIndex, dest, destIndex, count) {
		for (var i = 0; i < count; i++) {
			dest[ i + destIndex ] = source[ i + sourceIndex ];
		}
	};

	$.ig.util.arrayCopy2 = function (source, dest, count) {
		for (var i = 0; i < count; i++) {
			dest[ i ] = source[ i ];
		}
	};

	$.ig.util.arrayCopyTo = function (source, dest, index) {
		for (var i = 0; i < source.length; i++) {
			dest[ index++ ] = source[ i ];
		}
	};

	$.ig.util.arrayIndexOf1 = function ($t, array, value) {
		return array.indexOf(value);
	};

	$.ig.util.isNaN = function (v) {
		return v !== v; // http://us6.campaign-archive1.com/?u=2cc20705b76fa66ab84a6634f&id=43bf7f05e9
	};

	$.ig.util.numberToString = function (number, provider) {
		return $.ig.util.numberToString1(number, "G", provider);
	};

	var gFormatOptions = { useGrouping: false, maximumSignificantDigits: 15 };
	var zeroFormatOptions = {
		useGrouping: false,
		maximumSignificantDigits: 15,
		maximumFractionDigits: 0
	};

	$.ig.util.numberToString1 = function (number, format, provider) {
		provider = provider || $.ig.CultureInfo.prototype.currentCulture();

		switch (format) {
			case "G":
				return number.toLocaleString(provider.name(), gFormatOptions);

			case "R":
			case "r":
				return number.toString()
					.replace(".", provider.numberFormat().numberDecimalSeparator());
		}

		if (format.startsWith("0")) {
			var integerDigitsRequired = 0;
			var isValid = true;
			for (var i = 0; i < format.length; i++) {
				if (format[ i ] === "0") {
					integerDigitsRequired++;
				} else {
					isValid = false;
					break;
				}
			}

			if (isValid) {
				var result = number.toLocaleString(provider.name(), zeroFormatOptions);
				while (result.length < integerDigitsRequired) {
					result = "0" + result;
				}

				return result;
			}
		}

		// TODO: Add fraction support as well
		throw new $.ig.FormatException(1, "Unsupported format code: " + format);
	};

	$.ig.util.intToString = function (number, provider) {
		return $.ig.util.intToString1(number, "G", provider);
	};

	$.ig.util.intToString1 = function (number, format, provider) {
		provider = provider || $.ig.CultureInfo.prototype.currentCulture();

		if (format && format.length) {
			if (format[ 0 ] == "X") {
				number = $.ig.util.intSToU(number);

				var result = number.toString(16).toUpperCase();
				if (format.length !== 1) {
					var digits = +format.substr(1);
					if (!isFinite(digits)) {
						throw new Error("Unsupported format code: " + format);
					}

					while (result.length < digits) {
						result = "0" + result;
					}
				}

				return result;
			}
		}

		switch (format) {
			case "G":
				return number.toLocaleString(provider.name(), gFormatOptions);
		}

		throw new Error("Unsupported format code: " + format);
	};

	$.ig.util.intSToU = function (number) {
		if (number < 0) {
			number = number + 1 + 0xFFFFFFFF;
		}

		return number;
	};

	$.ig.util.enumHasFlag = function (value, flag) {
		/*jslint bitwise: true */
		return (value & flag) === flag;
	};

	$.ig.util.boolToString = function (value, provider) {
		return value.toString();
	};

	$.ig.util.getArrayOfValues = function (obj) {
		var result = [ ];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				result.push(obj[ i ]);
			}
		}

		return result;
	};

	$.ig.util.getArrayOfProperties = function (obj) {
		var result = [ ];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				result.push(i);
			}
		}

		return result;
	};

	$.ig.util.stringInsert = function (str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
	$.ig.util.b64toUint8Array = function (b64Data, nBlocksSize) {
		/*jslint bitwise: true */
		function b64ToUint6(nChr) {

			return nChr > 64 && nChr < 91 ?
				nChr - 65
			  : nChr > 96 && nChr < 123 ?
				nChr - 71
			  : nChr > 47 && nChr < 58 ?
				nChr + 4
			  : nChr === 43 ?
				62
			  : nChr === 47 ?
				63
			  :
				0;

		}

		var
			sB64Enc = b64Data.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
			nOutLen = nBlocksSize ?
				Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize :
				nInLen * 3 + 1 >> 2, taBytes;

		if (typeof window.Uint8Array === "function") {
			taBytes = new Uint8Array(nOutLen);
		} else {
			taBytes = new Array(nOutLen);
		}

		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[ nOutIdx ] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;

			}
		}

		return taBytes;
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
	$.ig.util.uint8ArraytoB64 = function (aBytes) {
		/*jslint bitwise: true */
		function uint6ToB64(nUint6) {

			return nUint6 < 26 ?
				nUint6 + 65
			  : nUint6 < 52 ?
				nUint6 + 71
			  : nUint6 < 62 ?
				nUint6 - 4
			  : nUint6 === 62 ?
				43
			  : nUint6 === 63 ?
				47
			  :
				65;

		}

		var nMod3 = 2, sB64Enc = "";

		for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
			nMod3 = nIdx % 3;
			if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
			nUint24 |= aBytes[ nIdx ] << (16 >>> nMod3 & 24);
			if (nMod3 === 2 || aBytes.length - nIdx === 1) {
				sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63),
					uint6ToB64(nUint24 >>> 12 & 63),
					uint6ToB64(nUint24 >>> 6 & 63),
					uint6ToB64(nUint24 & 63));
				nUint24 = 0;
			}
		}

		return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) +
			(nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");

	};

	$.ig.util.stringSplit = function (value, separators, options) {
		var r = "",
			i;
		for (i = 0; i < separators.length; i++) {

			if (i !== 0) {
				r += "|";
			}

			r += separators[ i ];
		}

		var result = value.split(new RegExp(r));

		for (i = result.length - 1; i >= 0; i--) {
			/*jslint bitwise: true */
			if ((result[ i ].length === 0 &&
				(options & $.ig.StringSplitOptions.prototype.removeEmptyEntries)) ||
					separators.contains(result[ i ])) {
				result.splice(i, 1);
			}
		}

		return result;
	};

	$.ig.util.stringJoin = function (sep, vals) {
		return vals.join(sep);
	};

	$.ig.util.stringJoin1 = function ($t, sep, vals) {
		var result;
		var en = vals.getEnumerator();
		while (en.moveNext()) {
			var v = en.current().toString();

			if (result === undefined) {
				result = v;
			} else {
				result += sep + v;
			}
		}

		return result;
	};

	$.ig.util.toString$1 = function ($t, v) {
		if (v !== null && $t) {
			if ($t.isNullable) {
				$t = $t.typeArguments[ 0 ];
			}

			if ($t.isEnumType) {
				return $t.InstanceConstructor.prototype.$getName(v);
			}
		}

		return v.toString();
	};

	$.ig.util.castObjTo$t = function ($t, v) {

		var shouldWrap = false;
		if ($t.isNullable) {
			$t = $t.typeArguments[ 0 ];
			shouldWrap = true;
		}

		if (v !== null && $t.isEnumType) {
			v = v.$value();
		}

		return shouldWrap ? $.ig.util.toNullable($t, v) : v;
	};

	$.ig.util.getBoxIfEnum = function ($t, v) {
		if (v !== null && $t) { // TODO: Remove the $t check here and fix the null ref issue
			if ($t.isNullable) {
				$t = $t.typeArguments[ 0 ];
			}

			if ($t.isEnumType) {
				return $t.InstanceConstructor.prototype.getBox(v);
			}
		}

		return v;
	};

	$.ig.util.getValue = function (v) {
		if (v !== null && v.$type && v.$type.isEnum && v.$type.isEnum()) {
			return v.$value();
		}

		return v;
	};

	$.ig.util.getEnumValue = function (v) {
		if (v !== null) {
			if (typeof v === "number") {
				return v;
			} else {
				return v.$value();
			}
		}

		return 0;
	};

	/*! unicode_hack.js
	Copyright (C) 2010-2012,2014  Marcelo Gibson de Castro GonÃ§alves. All rights reserved.

	Copying and distribution of this file, with or without modification,
	are permitted in any medium without royalty provided the copyright
	notice and this notice are preserved.  This file is offered as-is,
	without any warranty.
	*/

	// jscs:disable
	var unicodeCategories = {
		Cn: "[\u0378\u0379\u037f-\u0383\u038b\u038d\u03a2\u0528-\u0530\u0557\u0558\u0560\u0588\u058b-\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u05ff\u0604\u0605\u061c\u061d\u070e\u074b\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e\u082f\u083f\u085c\u085d\u085f-\u08ff\u0978\u0980\u0984\u098d\u098e\u0991\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba\u09bb\u09c5\u09c6\u09c9\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a\u0a3b\u0a3d\u0a43-\u0a46\u0a49\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba\u0abb\u0ac6\u0aca\u0ace\u0acf\u0ad1-\u0adf\u0ae4\u0ae5\u0af0\u0af2-\u0b00\u0b04\u0b0d\u0b0e\u0b11\u0b12\u0b29\u0b31\u0b34\u0b3a\u0b3b\u0b45\u0b46\u0b49\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0c00\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5a-\u0c5f\u0c64\u0c65\u0c70-\u0c77\u0c80\u0c81\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4\u0ce5\u0cf0\u0cf3-\u0d01\u0d04\u0d0d\u0d11\u0d3b\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5f\u0d64\u0d65\u0d76-\u0d78\u0d80\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85\u0e86\u0e89\u0e8b\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8\u0ea9\u0eac\u0eba\u0ebe\u0ebf\u0ec5\u0ec7\u0ece\u0ecf\u0eda\u0edb\u0ede-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6-\u10cf\u10fd-\u10ff\u1249\u124e\u124f\u1257\u1259\u125e\u125f\u1289\u128e\u128f\u12b1\u12b6\u12b7\u12bf\u12c1\u12c6\u12c7\u12d7\u1311\u1316\u1317\u135b\u135c\u137d-\u137f\u139a-\u139f\u13f5-\u13ff\u169d-\u169f\u16f1-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de\u17df\u17ea-\u17ef\u17fa-\u17ff\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191d-\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c\u1a1d\u1a5f\u1a7d\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bab-\u1bad\u1bba-\u1bbf\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1ccf\u1cf3-\u1cff\u1de7-\u1dfb\u1f16\u1f17\u1f1e\u1f1f\u1f46\u1f47\u1f4e\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e\u1f7f\u1fb5\u1fc5\u1fd4\u1fd5\u1fdc\u1ff0\u1ff1\u1ff5\u1fff\u2065-\u2069\u2072\u2073\u208f\u209d-\u209f\u20ba-\u20cf\u20f1-\u20ff\u218a-\u218f\u23f4-\u23ff\u2427-\u243f\u244b-\u245f\u2700\u27cb\u27cd\u2b4d-\u2b4f\u2b5a-\u2bff\u2c2f\u2c5f\u2cf2-\u2cf8\u2d26-\u2d2f\u2d66-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e32-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u2fff\u3040\u3097\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fcc-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua674-\ua67b\ua698-\ua69f\ua6f8-\ua6ff\ua78f\ua792-\ua79f\ua7aa-\ua7f9\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fc-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9e0-\ua9ff\uaa37-\uaa3f\uaa4e\uaa4f\uaa5a\uaa5b\uaa7c-\uaa7f\uaac3-\uaada\uaae0-\uab00\uab07\uab08\uab0f\uab10\uab17-\uab1f\uab27\uab2f-\uabbf\uabee\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\ud7ff\ufa2e\ufa2f\ufa6e\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90\ufd91\ufdc8-\ufdef\ufdfe\ufdff\ufe1a-\ufe1f\ufe27-\ufe2f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd\ufefe\uff00\uffbf-\uffc1\uffc8\uffc9\uffd0\uffd1\uffd8\uffd9\uffdd-\uffdf\uffe7\uffef-\ufff8\ufffe\uffff]",
		Lu: "[\u0041-\u005a\u00c0-\u00d6\u00d8-\u00de\u0100\u0102\u0104\u0106\u0108\u010a\u010c\u010e\u0110\u0112\u0114\u0116\u0118\u011a\u011c\u011e\u0120\u0122\u0124\u0126\u0128\u012a\u012c\u012e\u0130\u0132\u0134\u0136\u0139\u013b\u013d\u013f\u0141\u0143\u0145\u0147\u014a\u014c\u014e\u0150\u0152\u0154\u0156\u0158\u015a\u015c\u015e\u0160\u0162\u0164\u0166\u0168\u016a\u016c\u016e\u0170\u0172\u0174\u0176\u0178\u0179\u017b\u017d\u0181\u0182\u0184\u0186\u0187\u0189-\u018b\u018e-\u0191\u0193\u0194\u0196-\u0198\u019c\u019d\u019f\u01a0\u01a2\u01a4\u01a6\u01a7\u01a9\u01ac\u01ae\u01af\u01b1-\u01b3\u01b5\u01b7\u01b8\u01bc\u01c4\u01c7\u01ca\u01cd\u01cf\u01d1\u01d3\u01d5\u01d7\u01d9\u01db\u01de\u01e0\u01e2\u01e4\u01e6\u01e8\u01ea\u01ec\u01ee\u01f1\u01f4\u01f6-\u01f8\u01fa\u01fc\u01fe\u0200\u0202\u0204\u0206\u0208\u020a\u020c\u020e\u0210\u0212\u0214\u0216\u0218\u021a\u021c\u021e\u0220\u0222\u0224\u0226\u0228\u022a\u022c\u022e\u0230\u0232\u023a\u023b\u023d\u023e\u0241\u0243-\u0246\u0248\u024a\u024c\u024e\u0370\u0372\u0376\u0386\u0388-\u038a\u038c\u038e\u038f\u0391-\u03a1\u03a3-\u03ab\u03cf\u03d2-\u03d4\u03d8\u03da\u03dc\u03de\u03e0\u03e2\u03e4\u03e6\u03e8\u03ea\u03ec\u03ee\u03f4\u03f7\u03f9\u03fa\u03fd-\u042f\u0460\u0462\u0464\u0466\u0468\u046a\u046c\u046e\u0470\u0472\u0474\u0476\u0478\u047a\u047c\u047e\u0480\u048a\u048c\u048e\u0490\u0492\u0494\u0496\u0498\u049a\u049c\u049e\u04a0\u04a2\u04a4\u04a6\u04a8\u04aa\u04ac\u04ae\u04b0\u04b2\u04b4\u04b6\u04b8\u04ba\u04bc\u04be\u04c0\u04c1\u04c3\u04c5\u04c7\u04c9\u04cb\u04cd\u04d0\u04d2\u04d4\u04d6\u04d8\u04da\u04dc\u04de\u04e0\u04e2\u04e4\u04e6\u04e8\u04ea\u04ec\u04ee\u04f0\u04f2\u04f4\u04f6\u04f8\u04fa\u04fc\u04fe\u0500\u0502\u0504\u0506\u0508\u050a\u050c\u050e\u0510\u0512\u0514\u0516\u0518\u051a\u051c\u051e\u0520\u0522\u0524\u0526\u0531-\u0556\u10a0-\u10c5\u1e00\u1e02\u1e04\u1e06\u1e08\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1e1e\u1e20\u1e22\u1e24\u1e26\u1e28\u1e2a\u1e2c\u1e2e\u1e30\u1e32\u1e34\u1e36\u1e38\u1e3a\u1e3c\u1e3e\u1e40\u1e42\u1e44\u1e46\u1e48\u1e4a\u1e4c\u1e4e\u1e50\u1e52\u1e54\u1e56\u1e58\u1e5a\u1e5c\u1e5e\u1e60\u1e62\u1e64\u1e66\u1e68\u1e6a\u1e6c\u1e6e\u1e70\u1e72\u1e74\u1e76\u1e78\u1e7a\u1e7c\u1e7e\u1e80\u1e82\u1e84\u1e86\u1e88\u1e8a\u1e8c\u1e8e\u1e90\u1e92\u1e94\u1e9e\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u1ec8\u1eca\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u1ef2\u1ef4\u1ef6\u1ef8\u1efa\u1efc\u1efe\u1f08-\u1f0f\u1f18-\u1f1d\u1f28-\u1f2f\u1f38-\u1f3f\u1f48-\u1f4d\u1f59\u1f5b\u1f5d\u1f5f\u1f68-\u1f6f\u1fb8-\u1fbb\u1fc8-\u1fcb\u1fd8-\u1fdb\u1fe8-\u1fec\u1ff8-\u1ffb\u2102\u2107\u210b-\u210d\u2110-\u2112\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u2130-\u2133\u213e\u213f\u2145\u2183\u2c00-\u2c2e\u2c60\u2c62-\u2c64\u2c67\u2c69\u2c6b\u2c6d-\u2c70\u2c72\u2c75\u2c7e-\u2c80\u2c82\u2c84\u2c86\u2c88\u2c8a\u2c8c\u2c8e\u2c90\u2c92\u2c94\u2c96\u2c98\u2c9a\u2c9c\u2c9e\u2ca0\u2ca2\u2ca4\u2ca6\u2ca8\u2caa\u2cac\u2cae\u2cb0\u2cb2\u2cb4\u2cb6\u2cb8\u2cba\u2cbc\u2cbe\u2cc0\u2cc2\u2cc4\u2cc6\u2cc8\u2cca\u2ccc\u2cce\u2cd0\u2cd2\u2cd4\u2cd6\u2cd8\u2cda\u2cdc\u2cde\u2ce0\u2ce2\u2ceb\u2ced\ua640\ua642\ua644\ua646\ua648\ua64a\ua64c\ua64e\ua650\ua652\ua654\ua656\ua658\ua65a\ua65c\ua65e\ua660\ua662\ua664\ua666\ua668\ua66a\ua66c\ua680\ua682\ua684\ua686\ua688\ua68a\ua68c\ua68e\ua690\ua692\ua694\ua696\ua722\ua724\ua726\ua728\ua72a\ua72c\ua72e\ua732\ua734\ua736\ua738\ua73a\ua73c\ua73e\ua740\ua742\ua744\ua746\ua748\ua74a\ua74c\ua74e\ua750\ua752\ua754\ua756\ua758\ua75a\ua75c\ua75e\ua760\ua762\ua764\ua766\ua768\ua76a\ua76c\ua76e\ua779\ua77b\ua77d\ua77e\ua780\ua782\ua784\ua786\ua78b\ua78d\ua790\ua7a0\ua7a2\ua7a4\ua7a6\ua7a8\uff21-\uff3a]",
		Ll: "[\u0061-\u007a\u00aa\u00b5\u00ba\u00df-\u00f6\u00f8-\u00ff\u0101\u0103\u0105\u0107\u0109\u010b\u010d\u010f\u0111\u0113\u0115\u0117\u0119\u011b\u011d\u011f\u0121\u0123\u0125\u0127\u0129\u012b\u012d\u012f\u0131\u0133\u0135\u0137\u0138\u013a\u013c\u013e\u0140\u0142\u0144\u0146\u0148\u0149\u014b\u014d\u014f\u0151\u0153\u0155\u0157\u0159\u015b\u015d\u015f\u0161\u0163\u0165\u0167\u0169\u016b\u016d\u016f\u0171\u0173\u0175\u0177\u017a\u017c\u017e-\u0180\u0183\u0185\u0188\u018c\u018d\u0192\u0195\u0199-\u019b\u019e\u01a1\u01a3\u01a5\u01a8\u01aa\u01ab\u01ad\u01b0\u01b4\u01b6\u01b9\u01ba\u01bd-\u01bf\u01c6\u01c9\u01cc\u01ce\u01d0\u01d2\u01d4\u01d6\u01d8\u01da\u01dc\u01dd\u01df\u01e1\u01e3\u01e5\u01e7\u01e9\u01eb\u01ed\u01ef\u01f0\u01f3\u01f5\u01f9\u01fb\u01fd\u01ff\u0201\u0203\u0205\u0207\u0209\u020b\u020d\u020f\u0211\u0213\u0215\u0217\u0219\u021b\u021d\u021f\u0221\u0223\u0225\u0227\u0229\u022b\u022d\u022f\u0231\u0233-\u0239\u023c\u023f\u0240\u0242\u0247\u0249\u024b\u024d\u024f-\u0293\u0295-\u02af\u0371\u0373\u0377\u037b-\u037d\u0390\u03ac-\u03ce\u03d0\u03d1\u03d5-\u03d7\u03d9\u03db\u03dd\u03df\u03e1\u03e3\u03e5\u03e7\u03e9\u03eb\u03ed\u03ef-\u03f3\u03f5\u03f8\u03fb\u03fc\u0430-\u045f\u0461\u0463\u0465\u0467\u0469\u046b\u046d\u046f\u0471\u0473\u0475\u0477\u0479\u047b\u047d\u047f\u0481\u048b\u048d\u048f\u0491\u0493\u0495\u0497\u0499\u049b\u049d\u049f\u04a1\u04a3\u04a5\u04a7\u04a9\u04ab\u04ad\u04af\u04b1\u04b3\u04b5\u04b7\u04b9\u04bb\u04bd\u04bf\u04c2\u04c4\u04c6\u04c8\u04ca\u04cc\u04ce\u04cf\u04d1\u04d3\u04d5\u04d7\u04d9\u04db\u04dd\u04df\u04e1\u04e3\u04e5\u04e7\u04e9\u04eb\u04ed\u04ef\u04f1\u04f3\u04f5\u04f7\u04f9\u04fb\u04fd\u04ff\u0501\u0503\u0505\u0507\u0509\u050b\u050d\u050f\u0511\u0513\u0515\u0517\u0519\u051b\u051d\u051f\u0521\u0523\u0525\u0527\u0561-\u0587\u1d00-\u1d2b\u1d62-\u1d77\u1d79-\u1d9a\u1e01\u1e03\u1e05\u1e07\u1e09\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1e1f\u1e21\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e2d\u1e2f\u1e31\u1e33\u1e35\u1e37\u1e39\u1e3b\u1e3d\u1e3f\u1e41\u1e43\u1e45\u1e47\u1e49\u1e4b\u1e4d\u1e4f\u1e51\u1e53\u1e55\u1e57\u1e59\u1e5b\u1e5d\u1e5f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e6b\u1e6d\u1e6f\u1e71\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1e7f\u1e81\u1e83\u1e85\u1e87\u1e89\u1e8b\u1e8d\u1e8f\u1e91\u1e93\u1e95-\u1e9d\u1e9f\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u1ec9\u1ecb\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u1ef3\u1ef5\u1ef7\u1ef9\u1efb\u1efd\u1eff-\u1f07\u1f10-\u1f15\u1f20-\u1f27\u1f30-\u1f37\u1f40-\u1f45\u1f50-\u1f57\u1f60-\u1f67\u1f70-\u1f7d\u1f80-\u1f87\u1f90-\u1f97\u1fa0-\u1fa7\u1fb0-\u1fb4\u1fb6\u1fb7\u1fbe\u1fc2-\u1fc4\u1fc6\u1fc7\u1fd0-\u1fd3\u1fd6\u1fd7\u1fe0-\u1fe7\u1ff2-\u1ff4\u1ff6\u1ff7\u210a\u210e\u210f\u2113\u212f\u2134\u2139\u213c\u213d\u2146-\u2149\u214e\u2184\u2c30-\u2c5e\u2c61\u2c65\u2c66\u2c68\u2c6a\u2c6c\u2c71\u2c73\u2c74\u2c76-\u2c7c\u2c81\u2c83\u2c85\u2c87\u2c89\u2c8b\u2c8d\u2c8f\u2c91\u2c93\u2c95\u2c97\u2c99\u2c9b\u2c9d\u2c9f\u2ca1\u2ca3\u2ca5\u2ca7\u2ca9\u2cab\u2cad\u2caf\u2cb1\u2cb3\u2cb5\u2cb7\u2cb9\u2cbb\u2cbd\u2cbf\u2cc1\u2cc3\u2cc5\u2cc7\u2cc9\u2ccb\u2ccd\u2ccf\u2cd1\u2cd3\u2cd5\u2cd7\u2cd9\u2cdb\u2cdd\u2cdf\u2ce1\u2ce3\u2ce4\u2cec\u2cee\u2d00-\u2d25\ua641\ua643\ua645\ua647\ua649\ua64b\ua64d\ua64f\ua651\ua653\ua655\ua657\ua659\ua65b\ua65d\ua65f\ua661\ua663\ua665\ua667\ua669\ua66b\ua66d\ua681\ua683\ua685\ua687\ua689\ua68b\ua68d\ua68f\ua691\ua693\ua695\ua697\ua723\ua725\ua727\ua729\ua72b\ua72d\ua72f-\ua731\ua733\ua735\ua737\ua739\ua73b\ua73d\ua73f\ua741\ua743\ua745\ua747\ua749\ua74b\ua74d\ua74f\ua751\ua753\ua755\ua757\ua759\ua75b\ua75d\ua75f\ua761\ua763\ua765\ua767\ua769\ua76b\ua76d\ua76f\ua771-\ua778\ua77a\ua77c\ua77f\ua781\ua783\ua785\ua787\ua78c\ua78e\ua791\ua7a1\ua7a3\ua7a5\ua7a7\ua7a9\ua7fa\ufb00-\ufb06\ufb13-\ufb17\uff41-\uff5a]",
		Lt: "[\u01c5\u01c8\u01cb\u01f2\u1f88-\u1f8f\u1f98-\u1f9f\u1fa8-\u1faf\u1fbc\u1fcc\u1ffc]",
		Lm: "[\u02b0-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0374\u037a\u0559\u0640\u06e5\u06e6\u07f4\u07f5\u07fa\u081a\u0824\u0828\u0971\u0e46\u0ec6\u10fc\u17d7\u1843\u1aa7\u1c78-\u1c7d\u1d2c-\u1d61\u1d78\u1d9b-\u1dbf\u2071\u207f\u2090-\u209c\u2c7d\u2d6f\u2e2f\u3005\u3031-\u3035\u303b\u309d\u309e\u30fc-\u30fe\ua015\ua4f8-\ua4fd\ua60c\ua67f\ua717-\ua71f\ua770\ua788\ua9cf\uaa70\uaadd\uff70\uff9e\uff9f]",
		Lo: "[\u01bb\u01c0-\u01c3\u0294\u05d0-\u05ea\u05f0-\u05f2\u0620-\u063f\u0641-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u0800-\u0815\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e45\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10d0-\u10fa\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17dc\u1820-\u1842\u1844-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c77\u1ce9-\u1cec\u1cee-\u1cf1\u2135-\u2138\u2d30-\u2d65\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3006\u303c\u3041-\u3096\u309f\u30a1-\u30fa\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcb\ua000-\ua014\ua016-\ua48c\ua4d0-\ua4f7\ua500-\ua60b\ua610-\ua61f\ua62a\ua62b\ua66e\ua6a0-\ua6e5\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa6f\uaa71-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb\uaadc\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff66-\uff6f\uff71-\uff9d\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
		Mn: "[\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962\u0963\u0981\u09bc\u09c1-\u09c4\u09cd\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b62\u0b63\u0b82\u0bc0\u0bcd\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc6\u0ccc\u0ccd\u0ce2\u0ce3\u0d41-\u0d44\u0d4d\u0d62\u0d63\u0dca\u0dd2-\u0dd4\u0dd6\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1be6\u1be8\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfc-\u1dff\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26]",
		Me: "[\u0488\u0489\u20dd-\u20e0\u20e2-\u20e4\ua670-\ua672]",
		Mc: "[\u0903\u093b\u093e-\u0940\u0949-\u094c\u094e\u094f\u0982\u0983\u09be-\u09c0\u09c7\u09c8\u09cb\u09cc\u09d7\u0a03\u0a3e-\u0a40\u0a83\u0abe-\u0ac0\u0ac9\u0acb\u0acc\u0b02\u0b03\u0b3e\u0b40\u0b47\u0b48\u0b4b\u0b4c\u0b57\u0bbe\u0bbf\u0bc1\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcc\u0bd7\u0c01-\u0c03\u0c41-\u0c44\u0c82\u0c83\u0cbe\u0cc0-\u0cc4\u0cc7\u0cc8\u0cca\u0ccb\u0cd5\u0cd6\u0d02\u0d03\u0d3e-\u0d40\u0d46-\u0d48\u0d4a-\u0d4c\u0d57\u0d82\u0d83\u0dcf-\u0dd1\u0dd8-\u0ddf\u0df2\u0df3\u0f3e\u0f3f\u0f7f\u102b\u102c\u1031\u1038\u103b\u103c\u1056\u1057\u1062-\u1064\u1067-\u106d\u1083\u1084\u1087-\u108c\u108f\u109a-\u109c\u17b6\u17be-\u17c5\u17c7\u17c8\u1923-\u1926\u1929-\u192b\u1930\u1931\u1933-\u1938\u19b0-\u19c0\u19c8\u19c9\u1a19-\u1a1b\u1a55\u1a57\u1a61\u1a63\u1a64\u1a6d-\u1a72\u1b04\u1b35\u1b3b\u1b3d-\u1b41\u1b43\u1b44\u1b82\u1ba1\u1ba6\u1ba7\u1baa\u1be7\u1bea-\u1bec\u1bee\u1bf2\u1bf3\u1c24-\u1c2b\u1c34\u1c35\u1ce1\u1cf2\ua823\ua824\ua827\ua880\ua881\ua8b4-\ua8c3\ua952\ua953\ua983\ua9b4\ua9b5\ua9ba\ua9bb\ua9bd-\ua9c0\uaa2f\uaa30\uaa33\uaa34\uaa4d\uaa7b\uabe3\uabe4\uabe6\uabe7\uabe9\uabea\uabec]",
		Nd: "[\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19]",
		Nl: "[\u16ee-\u16f0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303a\ua6e6-\ua6ef]",
		No: "[\u00b2\u00b3\u00b9\u00bc-\u00be\u09f4-\u09f9\u0b72-\u0b77\u0bf0-\u0bf2\u0c78-\u0c7e\u0d70-\u0d75\u0f2a-\u0f33\u1369-\u137c\u17f0-\u17f9\u19da\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215f\u2189\u2460-\u249b\u24ea-\u24ff\u2776-\u2793\u2cfd\u3192-\u3195\u3220-\u3229\u3251-\u325f\u3280-\u3289\u32b1-\u32bf\ua830-\ua835]",
		Zs: "[\u0020\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]",
		Zl: "[\u2028]",
		Zp: "[\u2029]",
		Cc: "[\u0000-\u001f\u007f-\u009f]",
		Cf: "[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]",
		Cs: "[\ud800-\udfff]",
		Co: "[\ue000-\uf8ff]",
		Ps: "[\u0028\u005b\u007b\u0f3a\u0f3c\u169b\u201a\u201e\u2045\u207d\u208d\u2329\u2768\u276a\u276c\u276e\u2770\u2772\u2774\u27c5\u27e6\u27e8\u27ea\u27ec\u27ee\u2983\u2985\u2987\u2989\u298b\u298d\u298f\u2991\u2993\u2995\u2997\u29d8\u29da\u29fc\u2e22\u2e24\u2e26\u2e28\u3008\u300a\u300c\u300e\u3010\u3014\u3016\u3018\u301a\u301d\ufd3e\ufe17\ufe35\ufe37\ufe39\ufe3b\ufe3d\ufe3f\ufe41\ufe43\ufe47\ufe59\ufe5b\ufe5d\uff08\uff3b\uff5b\uff5f\uff62]",
		Pd: "[\u002d\u058a\u05be\u1400\u1806\u2010-\u2015\u2e17\u2e1a\u301c\u3030\u30a0\ufe31\ufe32\ufe58\ufe63\uff0d]",
		Pc: "[\u005f\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]",
		Pe: "[\u0029\\\u005d\u007d\u0f3b\u0f3d\u169c\u2046\u207e\u208e\u232a\u2769\u276b\u276d\u276f\u2771\u2773\u2775\u27c6\u27e7\u27e9\u27eb\u27ed\u27ef\u2984\u2986\u2988\u298a\u298c\u298e\u2990\u2992\u2994\u2996\u2998\u29d9\u29db\u29fd\u2e23\u2e25\u2e27\u2e29\u3009\u300b\u300d\u300f\u3011\u3015\u3017\u3019\u301b\u301e\u301f\ufd3f\ufe18\ufe36\ufe38\ufe3a\ufe3c\ufe3e\ufe40\ufe42\ufe44\ufe48\ufe5a\ufe5c\ufe5e\uff09\uff3d\uff5d\uff60\uff63]",
		Sm: "[\u002b\u003c-\u003e\u007c\u007e\u00ac\u00b1\u00d7\u00f7\u03f6\u0606-\u0608\u2044\u2052\u207a-\u207c\u208a-\u208c\u2118\u2140-\u2144\u214b\u2190-\u2194\u219a\u219b\u21a0\u21a3\u21a6\u21ae\u21ce\u21cf\u21d2\u21d4\u21f4-\u22ff\u2308-\u230b\u2320\u2321\u237c\u239b-\u23b3\u23dc-\u23e1\u25b7\u25c1\u25f8-\u25ff\u266f\u27c0-\u27c4\u27c7-\u27ca\u27cc\u27ce-\u27e5\u27f0-\u27ff\u2900-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2aff\u2b30-\u2b44\u2b47-\u2b4c\ufb29\ufe62\ufe64-\ufe66\uff0b\uff1c-\uff1e\uff5c\uff5e\uffe2\uffe9-\uffec]",
		Po: "[\u0021-\u0023\u0025-\u0027\u002a\u002c\u002e\u002f\u003a\u003b\u003f\u0040\u005c\u00a1\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30\u2e31\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]",
		Sk: "[\u005e\u0060\u00a8\u00af\u00b4\u00b8\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u309b\u309c\ua700-\ua716\ua720\ua721\ua789\ua78a\ufbb2-\ufbc1\uff3e\uff40\uffe3]",
		Sc: "[\u0024\u00a2-\u00a5\u060b\u09f2\u09f3\u09fb\u0af1\u0bf9\u0e3f\u17db\u20a0-\u20b9\ua838\ufdfc\ufe69\uff04\uffe0\uffe1\uffe5\uffe6]",
		Pi: "[\u00ab\u2018\u201b\u201c\u201f\u2039\u2e02\u2e04\u2e09\u2e0c\u2e1c\u2e20]",
		So: "[\u00a6\u00a7\u00a9\u00ae\u00b0\u00b6\u0482\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u09fa\u0b70\u0bf3-\u0bf8\u0bfa\u0c7f\u0d79\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1360\u1390-\u1399\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u214a\u214c\u214d\u214f\u2195-\u2199\u219c-\u219f\u21a1\u21a2\u21a4\u21a5\u21a7-\u21ad\u21af-\u21cd\u21d0\u21d1\u21d3\u21d5-\u21f3\u2300-\u2307\u230c-\u231f\u2322-\u2328\u232b-\u237b\u237d-\u239a\u23b4-\u23db\u23e2-\u23f3\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u25b6\u25b8-\u25c0\u25c2-\u25f7\u2600-\u266e\u2670-\u26ff\u2701-\u2767\u2794-\u27bf\u2800-\u28ff\u2b00-\u2b2f\u2b45\u2b46\u2b50-\u2b59\u2ce5-\u2cea\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua828-\ua82b\ua836\ua837\ua839\uaa77-\uaa79\ufdfd\uffe4\uffe8\uffed\uffee\ufffc\ufffd]",
		Pf: "[\u00bb\u2019\u201d\u203a\u2e03\u2e05\u2e0a\u2e0d\u2e1d\u2e21]"
	};

	//jscs:enable
	$.ig.util.netRegexToJS = function (netPattern) {
		var jsPattern = "";
		var nextNETGroupIndex = 1;
		var nextJSGroupIndex = 1;
		var namedGroups = [ ];
		var nameToJSGroupIndexMap = {};
		var netToJSGroupIndexMap = [ [ 0 ] ];
		var matchMustStartAtCurrentPosition = false;
		var name;

		var i = 0;
		if (netPattern.startsWith("\\G")) {
			i += 2;
			matchMustStartAtCurrentPosition = true;
		}

		var isInClass = false;
		for (; i < netPattern.length; i++) {
			var current = netPattern.charAt(i);
			switch (current) {
				case "\\":
					switch (netPattern.charAt(i + 1)) {
						case "A":
							jsPattern = jsPattern.concat("^");
							i++;
							break;

						case "z":
						case "Z":
							jsPattern = jsPattern.concat("$");
							i++;
							break;

						case "G":
							throw new Error("\\G .NET Regex escape is only supported at the start of the pattern.");

						case "p":
							if (netPattern.charAt(i + 2) !== "{") {
								throw new Error("\\p should be followed by braces.");
							}

							var endBraceIndex = netPattern.indexOf("}", i + 3);
							if (endBraceIndex < 0) {
								throw new Error("Could not find the close brace of the \\p pattern.");
							}

							var pattern = netPattern.substring(i + 3, endBraceIndex);
							i = endBraceIndex;

							var content = unicodeCategories[ pattern ];
							if (content === void 0) {
								throw new Error("Unknown \\p pattern: " + pattern);
							}

							if (isInClass) {
								jsPattern = jsPattern.concat(content.substr(1, content.length - 2));
							} else {
								jsPattern = jsPattern.concat(content);
							}
							break;

						default:
							jsPattern = jsPattern.concat(netPattern.substr(i, 2));
							i++;
							break;
					}
					break;

				case "/":
					jsPattern = jsPattern.concat("\\/");
					break;

				case "[":
					isInClass = true;
					jsPattern = jsPattern.concat("[");
					break;

				case "]":
					isInClass = false;
					jsPattern = jsPattern.concat("]");
					break;

				case "(":

					jsPattern = jsPattern.concat("(");

					var next = netPattern[ i + 1 ];
					name = "";

					if (next === "?") {
						i++;
						next = netPattern[ i + 1 ];
						if (next === "<" || next === "\"") {

							if (netPattern[ i + 2 ] === "=" || netPattern[ i + 2 ] === "!") {
								throw new Error("Lookbehind assertions are not supported in JavaScript: " + pattern);
							}

							i++;
							var end = next === "<" ? ">" : "\"";
							var start = ++i;
							for (; i < netPattern.length && netPattern[ i ] != end; i++) {
							}

							name = netPattern.slice(start, i);
						} else {
							jsPattern = jsPattern.concat("?");

							// Non-capturing group
							if (next === ":") {
								continue;
							}
						}
					}

					var currentJSGroupIndex = nextJSGroupIndex++;

					if (name.length !== 0) {
						if (!namedGroups.contains(name)) {
							namedGroups.push(name);
						}

						var jsGroups = nameToJSGroupIndexMap[ name ];
						if (!jsGroups) {
							nameToJSGroupIndexMap[ name ] = jsGroups = [ ];
						}
						jsGroups.push(currentJSGroupIndex);
					} else {
						netToJSGroupIndexMap[ nextNETGroupIndex++ ] = [ currentJSGroupIndex ];
					}

					break;

				default:
					jsPattern = jsPattern.concat(netPattern.substr(i, 1));
					break;
			}
		}

		var nameToNetGroupIndexMap = {};
		for (i = 0; i < namedGroups.length; i++) {
			var currentNETGroupIndex = nextNETGroupIndex++;
			name = namedGroups[ i ];
			netToJSGroupIndexMap[ currentNETGroupIndex ] = nameToJSGroupIndexMap[ name ];
			nameToNetGroupIndexMap[ name ] = currentNETGroupIndex;
		}

		return {
			pattern: jsPattern,
			nameToNetGroupIndexMap: nameToNetGroupIndexMap,
			netToJSGroupIndexMap: netToJSGroupIndexMap,
			matchMustStartAtCurrentPosition: matchMustStartAtCurrentPosition
		};
	};

	$.ig.util.timeSpanInit1 = function (h, m, s) {
		return (h * 3600000) + (m * 60000) + (s * 1000);
	};
	$.ig.util.timeSpanInit2 = function (d, h, m, s, ms) {
		return (d * 86400000) + (h * 3600000) + (m * 60000) + (s * 1000) + ms;
	};
	$.ig.util.timeSpanInit3 = function (d, h, m, s) {
		return (d * 86400000) + (h * 3600000) + (m * 60000) + (s * 1000);
	};

	$.ig.util.timeSpanTotalDays = function (t) { return t / 86400000; };
	$.ig.util.timeSpanTotalHours = function (t) { return t / 3600000; };
	$.ig.util.timeSpanTotalMilliseconds = function (t) { return t; };
	$.ig.util.timeSpanTotalMinutes = function (t) { return t / 60000; };
	$.ig.util.timeSpanTotalSeconds = function (t) { return t / 1000; };

	$.ig.util.timeSpanFromDays = function (v) { return v * 86400000; };
	$.ig.util.timeSpanFromHours = function (v) { return v * 3600000; };
	$.ig.util.timeSpanFromMilliseconds = function (v) { return v; };
	$.ig.util.timeSpanFromMinutes = function (v) { return v * 60000; };
	$.ig.util.timeSpanFromSeconds = function (v) { return v * 1000; };
	$.ig.util.timeSpanFromTicks = function (v) { return v / 10000; };

	$.ig.util.timeSpanDays = function (t) { return $.ig.truncate(t / 86400000); };
	$.ig.util.timeSpanHours = function (t) { return $.ig.truncate((t / 3600000) % 24); };
	$.ig.util.timeSpanMilliseconds = function (t) { return t % 1000; };
	$.ig.util.timeSpanMinutes = function (t) { return $.ig.truncate((t / 60000) % 60); };
	$.ig.util.timeSpanSeconds = function (t) { return $.ig.truncate((t / 1000) % 60); };
	$.ig.util.timeSpanTicks = function (t) { return $.ig.truncate(t * 10000); };

	$.ig.util.timeSpanNegate = function (t) { return -t; };

	$.ig.util.dateAdd = function (d, t) { return new Date(+d + t); };
	$.ig.util.dateSubtract = function (d, t) { return new Date(+d - t); };

	/* jshint -W016*/
	$.ig.util.u32BitwiseAnd = function (a, b) {
		var r = a & b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32BitwiseOr = function (a, b) {
		var r = a | b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32BitwiseXor = function (a, b) {
		var r = a ^ b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32LS = function (a, b) {
		var r = a << b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
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

	/*<BeginType Name="System.SystemException" />*/
	$.ig.util.defType("SystemException", "Error", {
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}

			$.ig.Error.prototype.init.call(this, 0);
		},
		init1: function (initNumber, message) {
			$.ig.Error.prototype.init1.call(this, 1, message);
		},
		init2: function (initNumber, message, innerException) {
			$.ig.Error.prototype.init2.call(this, 2, message, innerException);
		},
		$type: new $.ig.Type("SystemException", $.ig.Error.prototype.$type)
	}, true);
	/*<EndType Name="System.SystemException" />*/

	/*<BeginType Name="System.FormatException" />*/
	$.ig.util.defType("FormatException", "SystemException", {
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}

			$.ig.SystemException.prototype.init.call(this, 0);
		},
		init1: function (initNumber, message) {
			$.ig.SystemException.prototype.init1.call(this, 1, message);
		},
		init2: function (initNumber, message, innerException) {
			$.ig.SystemException.prototype.init2.call(this, 2, message, innerException);
		},
		$type: new $.ig.Type("FormatException", $.ig.SystemException.prototype.$type)
	}, true);
	/*<EndType Name="System.FormatException" />*/

	$.ig.util.defType("NumberStyles", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: (function () {
			function getNameSingle(v) {
				switch (v) {
					case 0: return "None";
					case 1: return "AllowLeadingWhite";
					case 2: return "AllowTrailingWhite";
					case 4: return "AllowLeadingSign";
					case 7: return "Integer";
					case 8: return "AllowTrailingSign";
					case 16: return "AllowParentheses";
					case 32: return "AllowDecimalPoint";
					case 64: return "AllowThousands";
					case 111: return "Number";
					case 128: return "AllowExponent";
					case 167: return "Float";
					case 256: return "AllowCurrencySymbol";
					case 383: return "Currency";
					case 511: return "Any";
					case 512: return "AllowHexSpecifier";
					case 515: return "HexNumber";
					default: return v.toString();
				}
			}
			return function (v) {
				return this.getFlaggedName(v, getNameSingle);
			};
		}()),
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("NumberStyles", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.NumberStyles.prototype.none = 0;
	$.ig.NumberStyles.prototype.allowLeadingWhite = 1;
	$.ig.NumberStyles.prototype.allowTrailingWhite = 2;
	$.ig.NumberStyles.prototype.allowLeadingSign = 4;
	$.ig.NumberStyles.prototype.integer = 7;
	$.ig.NumberStyles.prototype.allowTrailingSign = 8;
	$.ig.NumberStyles.prototype.allowParentheses = 16;
	$.ig.NumberStyles.prototype.allowDecimalPoint = 32;
	$.ig.NumberStyles.prototype.allowThousands = 64;
	$.ig.NumberStyles.prototype.number = 111;
	$.ig.NumberStyles.prototype.allowExponent = 128;
	$.ig.NumberStyles.prototype.floatNumber = 167;
	$.ig.NumberStyles.prototype.allowCurrencySymbol = 256;
	$.ig.NumberStyles.prototype.currency = 383;
	$.ig.NumberStyles.prototype.any = 511;
	$.ig.NumberStyles.prototype.allowHexSpecifier = 512;
	$.ig.NumberStyles.prototype.hexNumber = 515;

	$.ig.util.defType("CompareOptions", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: (function () {
			function getNameSingle(v) {
				switch (v) {
					case 0: return "None";
					case 1: return "IgnoreCase";
					case 2: return "IgnoreNonSpace";
					case 4: return "IgnoreSymbols";
					case 8: return "IgnoreKanaType";
					case 16: return "IgnoreWidth";
					case 268435456: return "OrdinalIgnoreCase";
					case 536870912: return "StringSort";
					case 1073741824: return "Ordinal";
					default: return v.toString();
				}
			}
			return function (v) {
				return this.getFlaggedName(v, getNameSingle);
			};
		}()),
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("CompareOptions", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.CompareOptions.prototype.none = 0;
	$.ig.CompareOptions.prototype.ignoreCase = 1;
	$.ig.CompareOptions.prototype.ignoreNonSpace = 2;
	$.ig.CompareOptions.prototype.ignoreSymbols = 4;
	$.ig.CompareOptions.prototype.ignoreKanaType = 8;
	$.ig.CompareOptions.prototype.ignoreWidth = 16;
	$.ig.CompareOptions.prototype.ordinalIgnoreCase = 268435456;
	$.ig.CompareOptions.prototype.stringSort = 536870912;
	$.ig.CompareOptions.prototype.ordinal = 1073741824;

	$.ig.util.defType("StringComparison", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: function (v) {
			switch (v) {
				case 0: return "CurrentCulture";
				case 1: return "CurrentCultureIgnoreCase";
				case 2: return "InvariantCulture";
				case 3: return "InvariantCultureIgnoreCase";
				case 4: return "Ordinal";
				case 5: return "OrdinalIgnoreCase";
				default: return v.toString();
			}
		},
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("StringComparison", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.StringComparison.prototype.currentCulture = 0;
	$.ig.StringComparison.prototype.currentCultureIgnoreCase = 1;
	$.ig.StringComparison.prototype.invariantCulture = 2;
	$.ig.StringComparison.prototype.invariantCultureIgnoreCase = 3;
	$.ig.StringComparison.prototype.ordinal = 4;
	$.ig.StringComparison.prototype.ordinalIgnoreCase = 5;

	$.ig.util.defType("DateTimeKind", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: function (v) {
			switch (v) {
				case 0: return "Unspecified";
				case 1: return "Utc";
				case 2: return "Local";
				default: return v.toString();
			}
		},
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("DateTimeKind", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.DateTimeKind.prototype.unspecified = 0;
	$.ig.DateTimeKind.prototype.utc = 1;
	$.ig.DateTimeKind.prototype.local = 2;

	$.ig.util.defType("SeekOrigin", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: function (v) {
			switch (v) {
				case 0: return "Begin";
				case 1: return "Current";
				case 2: return "End";
				default: return v.toString();
			}
		},
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("SeekOrigin", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.SeekOrigin.prototype.begin = 0;
	$.ig.SeekOrigin.prototype.current = 1;
	$.ig.SeekOrigin.prototype.end = 2;

	$.ig.util.defType("StringSplitOptions", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: function (v) {
			switch (v) {
				case 0: return "None";
				case 1: return "RemoveEmptyEntries";
				default: return v.toString();
			}
		},
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("StringSplitOptions", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.StringSplitOptions.prototype.none = 0;
	$.ig.StringSplitOptions.prototype.removeEmptyEntries = 1;

	$.ig.util.defType("DayOfWeek", "Enum", {
		init: function (v) {
			this._v = v;
		},
		$getName: function (v) {
			switch (v) {
				case 0: return "Sunday";
				case 1: return "Monday";
				case 2: return "Tuesday";
				case 3: return "Wednesday";
				case 4: return "Thursday";
				case 5: return "Friday";
				case 6: return "Saturday";
				default: return v.toString();
			}
		},
		$value: function () {
			return this._v;
		},
		$type: new $.ig.Type("DayOfWeek", $.ig.Enum.prototype.$type)
	}, true);
	$.ig.DayOfWeek.prototype.sunday = 0;
	$.ig.DayOfWeek.prototype.monday = 1;
	$.ig.DayOfWeek.prototype.tuesday = 2;
	$.ig.DayOfWeek.prototype.wednesday = 3;
	$.ig.DayOfWeek.prototype.thursday = 4;
	$.ig.DayOfWeek.prototype.friday = 5;
	$.ig.DayOfWeek.prototype.saturday = 6;

	function decimalAdjust(type, value, exp) {

		// If the exp is undefined or zero...
		if (typeof exp === "undefined" || +exp === 0) {
			return Math[ type ](value);
		}
		value = +value;
		exp = +exp;

		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
			return NaN;
		}

		// Shift
		value = value.toString().split("e");
		value = Math[ type ](+(value[ 0 ] + "e" + (value[ 1 ] ? (+value[ 1 ] - exp) : -exp)));

		// Shift back
		value = value.toString().split("e");
		return +(value[ 0 ] + "e" + (value[ 1 ] ? (+value[ 1 ] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function (value, exp) {
			return decimalAdjust("round", value, exp);
		};
	}
	if (!Math.round10N) {
		Math.round10N = function (value, exp) {
			return decimalAdjust("round", value, -exp);
		};
	}

	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function (value, exp) {
			return decimalAdjust("floor", value, exp);
		};
	}

	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function (value, exp) {
			return decimalAdjust("ceil", value, exp);
		};
	}

	$.ig.util.isPoint = function (p) {
		if (p == null) {
			return false;
		}

		// Test for internal Point type
		if ($.ig.util.cast($.ig.Point.prototype.$type, p) != null) {
			return true;
		}

		// Test for Point literal
		if (typeof p.x === "number" && typeof p.y === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.pointFromLiteral = function (p) {
		if (p == null) {
			return new $.ig.Point(1, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Point.prototype.$type, p);
		if (cast != null) {
			return cast;
		}

		return new $.ig.Point(1, p.x, p.y);
	};

	$.ig.util.pointToLiteral = function (p) {
		var cast = $.ig.util.cast($.ig.Point.prototype.$type, p);
		if (cast == null) {
			return null;
		}

		return { x: cast.x(), y: cast.y() };
	};

	$.ig.util.isSize = function (s) {
		if (s == null) {
			return false;
		}

		// Test for internal Size type
		if ($.ig.util.cast($.ig.Size.prototype.$type, s) != null) {
			return true;
		}

		// Test for Size literal
		if (typeof s.width === "number" && typeof s.height === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.sizeFromLiteral = function (s) {
		if (s == null) {
			return new $.ig.Size(1, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Size.prototype.$type, s);
		if (cast != null) {
			return cast;
		}

		return new $.ig.Size(1, s.width, s.height);
	};

	$.ig.util.sizeToLiteral = function (s) {
		var cast = $.ig.util.cast($.ig.Size.prototype.$type, s);
		if (cast == null) {
			return null;
		}

		return { width: cast.width(), height: cast.height() };
	};

	$.ig.util.isRect = function (r) {
		if (r == null) {
			return false;
		}

		// Test for internal Rect type
		if ($.ig.util.cast($.ig.Rect.prototype.$type, r) != null) {
			return true;
		}

		// Test for Rect literal
		if (typeof r.x === "number" && typeof r.y === "number" &&
			typeof r.width === "number" && typeof r.height === "number") {
			return true;
		}

		if (typeof r.left === "number" && typeof r.top === "number" &&
			typeof r.right === "number" && typeof r.bottom === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.rectFromLiteral = function (r) {
		if (r == null) {
			return new $.ig.Rect(0, 0, 0, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Rect.prototype.$type, r);
		if (cast != null) {
			return cast;
		}

		// Test for Rect literal
		if (typeof r.x === "number" && typeof r.y === "number" &&
			typeof r.width === "number" && typeof r.height === "number") {
			return new $.ig.Rect(0, r.x, r.y, r.width, r.height);
		}

		return new $.ig.Rect(0, r.left, r.top, r.right - r.left, r.bottom - r.top);
	};

	$.ig.util.rectToLiteral = function (r) {
		var cast = $.ig.util.cast($.ig.Rect.prototype.$type, r);
		if (cast == null) {
			return null;
		}

		return {
			x: cast.x(),
			y: cast.y(),
			width: cast.width(),
			height: cast.height(),
			left: cast.left(),
			top: cast.top(),
			right: cast.right(),
			bottom: cast.bottom()
		};
	};

	$.ig.unicode_hack = (function () { //jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		/* Regexps to match characters in the BMP according to their Unicode category.
		   Extracted from running all characters (code units) against Java's
		   Character.getType. Source:
		   https://ideone.com/04llh4
		*/
		/* Also supports the general category (only the first letter) */
		var firstLetters = {}, p;
		for (p in unicodeCategories) {
			if (firstLetters[ p[ 0 ] ]) {
				firstLetters[ p[ 0 ] ] = unicodeCategories[ p ]
					.substring(0, unicodeCategories[ p ].length - 1) + firstLetters[ p[ 0 ] ].substring(1);
			} else {
				firstLetters[ p [ 0 ] ] = unicodeCategories[ p ];
			}
		}
		for (p in firstLetters) {
			unicodeCategories[ p ] = firstLetters[ p ];
		}

		/* Gets a regex written in a dialect that supports unicode categories and
		   translates it to a dialect supported by JavaScript. */
		return function (regexpString) {
			var modifiers = "";
			if (regexpString instanceof RegExp) {
				modifiers = (regexpString.global ? "g" : "") +
							(regexpString.ignoreCase ? "i" : "") +
							(regexpString.multiline ? "m" : "");
				regexpString = regexpString.source;
			}
			regexpString = regexpString.replace(/\\p\{(..?)\}/g, function (match, group) {
				return unicodeCategories[ group ] || match;
			});
			return new RegExp(regexpString, modifiers);
		};
	})();

}));// REMOVE_FROM_COMBINED_FILES
