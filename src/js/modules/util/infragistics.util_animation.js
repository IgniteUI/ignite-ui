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

export { $ };
