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
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape, $, igRoot, unicodeCategories*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
import { igRoot as $ } from "infragistics.util_core";
import { igRoot as $2 } from "infragistics.util_charextended";

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

export { igRoot };
