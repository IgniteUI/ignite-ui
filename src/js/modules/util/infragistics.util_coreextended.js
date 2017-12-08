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

$.ig.findPath = function (dsObj, resKey) {
    var resPath, ds = dsObj;
    resPath = resKey.split(".");
    if (resPath.length > 0) {
        for (var i = 0; i < resPath.length; i++) {
            if (ds) {
                ds = ds[ resPath[ i ] ];
            } else {
                break;
            }
        }
    }
    return ds;
};

$.ig.util.appendToQueryString = function (url, str) {
    if (url.indexOf("?") !== -1) {
        url += "&";
    } else {
        url += "?";
    }
    url += str;
    return url;
};

$.ig.util.prependToQueryString = function (url, str) {
    var mainUrl = url.substring(0, url.indexOf("?")),
        queryStr = url.substring(url.indexOf("?"), url.length);
    return mainUrl + str + queryStr;
};

//TODO: Is this in use?
// Checks if given object is a DOM element
$.ig.util.isDomElement = function (o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement :
        o && typeof o === "object" && o !== null && o.nodeType === 1 &&
        typeof o.nodeName === "string"
    );
};

// necessary to automatically detect whether to instantiate JSONP datasource from the URL
$.ig.util.isJsonpUrl = function (url) {
    var isJSONPExpr = /(=)\?(?=&|$)|\?\?/;

    return isJSONPExpr.test(url);
};

// returns button of mouse (down) event: 0-left, 1-middle, 2-right
$.ig.util.evtButton = function (e) {
    e = e ? e.button : null;
    if (e === 1) {
        e = this._ie_8; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        if (!e) {
            var v;
            e = window.navigator.userAgent;
            if (e) {
                // check if IE and its browser mode is 9 or higher
                v = e.toLowerCase().indexOf("msie ");
                if (v > 0) {
                    v = parseFloat(e.substring(v + 5));
                    if (v > 8) {
                        // check if IE document mode is 9 or higher
                        v = parseFloat(document.documentMode);
                    }
                }
            }

            // flag for IE8 and less
            this._ie_8 = e = v && !isNaN(v) && v > 5 && v < 9 ? 1 : -1; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        }

        // treat button==1 of IE 8 and less as 0
        e = e < 0 ? 1 : 0;
    }

    // IE8 may have middle button as 4 instead of 1
    return (e === 2) ? 2 : (e ? 1 : 0);
};

// returns date object(from string formatted in ISO8601)
$.ig.util.dateFromISO = function (obj) {
    var //regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,7})(?:Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/,
        regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{1,7})(?:Z|([\-+])(\d{2}):(\d{2}))?)?)?)?)?)?)?$/,
        m = regexIso8601.exec(obj);
    if (m) {
        return new Date(Date.UTC(
            m[ 1 ],
            (m[ 2 ] || 1) - 1,
            m[ 3 ] || 1,
            m[ 4 ] - (m[ 8 ] ? m[ 8 ] + m[ 9 ] : 0) || 0,
            m[ 5 ] - (m[ 8 ] ? m[ 8 ] + m[ 10 ] : 0) || 0,
            m[ 6 ] || 0,
            ((m[ 7 ] || 0) + "00").substr(0, 3)
        ));
    }
    return obj;
};

$.ig.util.summaries = $.ig.util.summaries || {};
$.ig.util.summaries.min = function (data, dataType) {
    if (data.length === 0) {
        if (dataType === "date") {
            return null;
        }
        return 0;
    }
    return Math.min.apply(Math, data);
};

$.ig.util.summaries.max = function (data, dataType) {
    if (data.length === 0) {
        if (dataType === "date") {
            return null;
        }
        return 0;
    }
    return Math.max.apply(Math, data);
};

$.ig.util.summaries.sum = function (data, dataType) {
    var sum = 0,
        i;
    for (i = 0; i < data.length; i++) {
        sum += data[ i ];
    }
    return sum;
};

$.ig.util.summaries.avg = function (data, dataType) {
    if (data.length === 0) {
        return 0;
    }
    return $.ig.util.summaries.sum(data) / data.length;
};

$.ig.util.summaries.count = function (data, dataType) {
    return data.length;
};

$.ig.calcSummaries = function (summaryFunction, data, caller, dataType) {
    // M.H. 16 Nov. 2011 Fix for bug 97886
    summaryFunction = summaryFunction.toLowerCase();
    if (summaryFunction.startsWith("custom")) {
        summaryFunction = "custom";
    }

    switch (summaryFunction) {
        case "min":
            return $.ig.util.summaries.min(data, dataType);
        case "max":
            return $.ig.util.summaries.max(data, dataType);
        case "sum":
            return $.ig.util.summaries.sum(data, dataType);
        case "avg":
            return $.ig.util.summaries.avg(data, dataType);
        case "count":
            return $.ig.util.summaries.count(data, dataType);
        case "custom":

            // M.H. 30 Sept. 2011 Fix for bug #88717 - fix when caller is string
            if (caller !== undefined && caller !== null) {
                if (typeof caller === "function") {
                    return caller(data, dataType);
                }
                if (typeof caller === "string") {
                    /*jshint evil:true */
                    caller = eval(caller);
                    return caller(data, dataType);
                }
            } else {
                return null;
            }
            break;
    }
};

$.ig.util.defaultSummaryMethods = [
    {
        /* type="string" Label that will be applied to the result of the summary function */
        "label": $.ig.util.locale ? $.ig.util.locale.defaultSummaryMethodLabelCount : "Count = ",
        /* type="string" Name of the summary that can be set as an option inside the igGrid for example */
        "name": "count",
        /* type="function" Speficies the function that will be used when calculating the summary */
        "summaryFunction": $.ig.util.summaries.count,
        /* type="'any'|Array" Speficies to which type of column this summary is applicable. Setting it to 'any' will apply to any type */
        "dataType": "any",
        /* type="bool" Enables/disables the summary to be applied by default */
        "active": true,
        /* type="bool" Speficies the order in which this summary will be placed when there are multiple summaries.
            order: 0 means that it will be displayed on top of all summaries */
        "order": 0,
        /* type="bool" Enables/disables applying format to the summary value */
        "applyFormat": false
    },
    {
        "label": $.ig.util.locale ? $.ig.util.locale.defaultSummaryMethodLabelMin : "Min = ",
        "name": "min",
        "summaryFunction": $.ig.util.summaries.min,
        "dataType": [ "number", "date", "numeric" ],
        "active": true,
        "order": 1,
        "applyFormat": true
    },
    {
        "label": $.ig.util.locale ? $.ig.util.locale.defaultSummaryMethodLabelMax : "Max = ",
        "name": "max",
        "summaryFunction": $.ig.util.summaries.max,
        "dataType": [ "number", "date", "numeric" ],
        "active": true,
        "order": 2,
        "applyFormat": true
    },
    {
        "label": $.ig.util.locale ? $.ig.util.locale.defaultSummaryMethodLabelSum : "Sum = ",
        "name": "sum",
        "summaryFunction": $.ig.util.summaries.sum,
        "dataType": [ "number", "numeric" ],
        "active": true,
        "order": 3,
        "applyFormat": true
    },
    {
        "label": $.ig.util.locale ? $.ig.util.locale.defaultSummaryMethodLabelAvg : "Avg = ",
        "name": "avg",
        "summaryFunction": $.ig.util.summaries.avg,
        "dataType": [ "number", "numeric" ],
        "active": true,
        "order": 4,
        "applyFormat": true
    }
];

$.ig.util.sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

export { igRoot };
