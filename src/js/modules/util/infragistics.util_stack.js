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

export { igRoot };
