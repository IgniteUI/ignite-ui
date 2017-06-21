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

// N.A. 2/18/2016 Task #214465: Support for Modernizr 3
// https://modernizr.com/docs, https://github.com/Modernizr/Modernizr/issues/1179.
$.ig.util.isModernizrAvailable = (typeof Modernizr === "object");
$.ig.util.isTouch =
    $.ig.util.isModernizrAvailable &&
    (Modernizr.touch === true ||
        Modernizr.touchevents === true || Modernizr.pointerevents === true);

$.ig.util.isTouchDevice = function () {
    return "ontouchstart" in window ||
        window.navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0;
};

export { igRoot };
