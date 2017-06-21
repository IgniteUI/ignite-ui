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

export { igRoot };
