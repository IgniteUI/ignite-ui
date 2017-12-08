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

export { $ };
