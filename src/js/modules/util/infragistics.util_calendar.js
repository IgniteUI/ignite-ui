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

$.ig.Calendar = Class.extend({
    init: function () {
    },
    eras: function () {

        // TODO: Base this on the culture
        return [ 1 ];
    },
    getEra: function (time) {

        // TODO: Base this on the culture
        return 1;
    },
    getDayOfMonth: function (time) {

        // TODO: Base this on the culture
        return time.getDate();
    },
    getDaysInMonth: function (year, month, era) {

        // TODO: Base this on the culture
        return $.ig.Date.prototype.daysInMonth(year, month);
    },
    getDaysInYear: function (year, era) {

        // TODO: Base this on the culture
        return $.ig.Date.prototype.isLeapYear(year) ? 366 : 365;
    },
    getMonth: function (time) {

        // TODO: Base this on the culture
        return $.ig.Date.prototype.getMonth(time);
    },
    getYear: function (time) {

        // TODO: Base this on the culture
        return time.getFullYear();
    },
    toDateTime: function (year, month, day, hour, minute, second, millisecond, era) {

        // TODO: Base this on the culture
        return $.ig.Date.prototype.fromValues(year, month, day, hour,
            minute, second, millisecond);
    },
    $type: new $.ig.Type("Calendar", $.ig.Object.prototype.$type)
}, true);

export { igRoot };
