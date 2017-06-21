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

export { $ };
