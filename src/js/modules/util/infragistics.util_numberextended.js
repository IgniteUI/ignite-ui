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
 *
 */
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape, $, igRoot*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
import { igRoot as $ } from "./infragistics.util_core";

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

export { $ };
