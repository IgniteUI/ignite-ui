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
import { igRoot as $ } from "infragistics.util_core";

$.ig.extendNativePrototype(Array.prototype, "clear", function () {
	this.length = 0;
});

$.ig.util.shallowClone = function (arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		newArr[ i ] = arr[ i ];
	}
	return newArr;
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

$.ig.util.arrayIndexOf1 = function ($t, array, value) {
	return array.indexOf(value);
};

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

$.ig.removeFromArray = function (arr, from, to) {
	var rest = arr.slice((to || from) + 1 || arr.length);
	arr.length = from < 0 ? arr.length + from : from;
	return arr.push.apply(arr, rest);
};

export { $ };
