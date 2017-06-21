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
import { igRoot as $ } from "infragistics.util_numberextended";

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

String.prototype.remove = function (index, count) {
		if (!count || ((index + count) > this.length)) {
			return this.substr(0, index);
		}
		return this.substr(0, index) + this.substr(index + count);
	};

String.prototype.trimStart = function () {
		var args = [ " " ];
		if (arguments.length > 0) {
			args = Array.prototype.slice.call(arguments);
			if (args.length === 1 && Array.isArray(args[ 0 ])) {
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
			if (args.length === 1 && Array.isArray(args[ 0 ])) {
				args = args[ 0 ];
			}
		}
		var i = this.length - 1;
		for (; i >= 0 && args.indexOf(this.charAt(i)) > -1; i--) { }
		return this.substring(0, i + 1);
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

export { $ };
