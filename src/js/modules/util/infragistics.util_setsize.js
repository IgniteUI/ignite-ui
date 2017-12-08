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

// Synchronize width/height of widget with its chart/dv controller
	// elem - jquery object which represents widget.element
	// prop - string "width" or "height".
	//   Notes: If it is missing, then a call from destroy is assumed and object/timer is deleted.
	//   A widget must call that method within destroy passing only 1st this.element parameter.
	// val - new value for width or height. It can be any html unit or number: 200, "200", "200px", "50%", "10cm", etc.
	//   Note: if widget was created without explicit width/height and relies on size of target-html element, then null can be used.
	//   In this case if html element was hidden on start, then that method catches first rendering, sets chart.width/height(values) and notifies resized.
	// chart - reference to xam/chart object which controls widgit
	// notifyResized - name of method which should be called when widget was resized
	//
	// Example for codes within create():
	//   if (this.options.width)
	//       $.ig.util.setSize(this.element, "width", this.options.width, this._chart, "notifyResized");
	// Example for codes within create() when no width or height is specified (support for initially hidden element):
	//   if (!this.options.width && !this.options.width)
	//       $.ig.util.setSize(this.element, "width", null, this._chart, "notifyResized");
	// Example for codes within _setOption(key, val):
	//   if (key === "width" || key === "height")
	//       $.ig.util.setSize(this.element, key, val, this._chart, "notifyResized");
	// Example for codes within destroy():
	//   $.ig.util.setSize(this.element);
	$.ig.util.setSize = function (elem, prop, val, chart, notifyResized) {
		if (!elem || !elem[ 0 ]) {
			return;
		}
		var timer, px,
			obj = elem[ 0 ]._w_s_f = elem[ 0 ]._w_s_f || {}, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers

			// width/height flags which trigger timer and adjustments of width/height on ticks
			perc = obj.perc;
		if (!prop) {
			if (obj.tickID) {
				obj.onTick(true);
			}
			delete obj.elem;
			delete obj.chart;
			elem[ 0 ]._w_s_f = null; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return;
		}
		if (!val) {
			val = elem[ prop ]();
		}
		if (perc && perc.indexOf(prop) >= 0) {
			perc = perc.replace(prop, "");
		}
		if (val) {
			elem[ prop ](val);
			if (typeof val !== "number") {

				// possible cases to process:
				// if(##===##px) then use same logic as for number
				// ##% - start timer
				// ##xxx - use elem.offsetWidth/Height for _xam.width/height
				// if elem.offsetWidth or elem.offsetHeight is 0, then start timer
				val = val.toString();
				if (val.indexOf("%") > 0) {
					perc = perc || "";
					if (perc.indexOf(prop) < 0) {

						// start timer
						timer = perc += prop;
					}
				}
				px = val.indexOf("px");
				if (px > 0) {
					val = val.substring(0, px);
				}
				px = parseFloat(val);

				// use same logic as for number
				if (px.toString() === val) {
					val = px;
				} else {
					val = elem[ prop ]();
					if (!val) {

						// width/height flags which trigger timer and adjustments of width/height on ticks
						obj.wait = obj.wait || "";
						if (obj.wait.indexOf(prop) < 0) {
							obj.wait += prop;
						}

						// start timer
						timer = prop;
					}
				}
			}
			obj.perc = perc;
			if (val && chart) {
				if (chart[ prop ]) {
					chart[ prop ](val);
				}
				if (notifyResized) {
					chart[ notifyResized ]();
				}
			}
		}
		if (!timer && !elem[ 0 ].offsetWidth) {
			timer = obj.wait = "width";
		}

		obj.elem = elem;
		obj.chart = chart;
		obj.notify = notifyResized;

		if (timer) {

			// stop: stop timer: coming from destroy
			obj.onTick = obj.onTick || function (stop) {

				// request to call notifyResized
				var resize,
					obj = this,
					chart = obj.chart,
					elem = obj.elem,
					perc = obj.perc || "",
					wait = obj.wait || "",
					width = stop || elem[ 0 ].offsetWidth,
					height = stop || elem[ 0 ].offsetHeight,
					oldWidth = obj.oldWidth || 0,
					oldHeight = obj.oldHeight || 0;
				stop = stop === true || (!perc && !wait);
				if (stop) {
					if (obj.tickID) {
						clearInterval(obj.tickID);
					}
					delete obj.tickID;
					return;
				}
				if (!obj.tickID && (!width || !height || perc)) {
					obj.tickID = setInterval(function () {
						obj.onTick();
					}, 200);
				}
				if (!width || !height) {
					return;
				}

				// width/height was adjusted
				delete obj.wait;

				// current instant width/height
				obj.oldWidth = width;
				obj.oldHeight = height;
				if (!chart) {
					return;
				}
				if (chart.width && ((perc.indexOf("width") >= 0 && width !== oldWidth) ||
					wait.indexOf("width") >= 0)) {
					chart.width(resize = width);
				}
				if (chart.height && ((perc.indexOf("height") >= 0 && height !== oldHeight) ||
					wait.indexOf("height") >= 0)) {
					chart.height(resize = height);
				}
				if (resize && obj.notify) {
					chart[ obj.notify ]();
				}
			};
			obj.onTick();
		}

		if (obj.chart && obj.notify && obj.chart[ obj.notify ] && !obj.__resizeProxy) {
			obj.oldDevicePixelRatio = window.devicePixelRatio || 1.0;
			obj.__resizeProxy = function () {
				var devicePixelRatio = window.devicePixelRatio || 1.0;
				if (devicePixelRatio !== obj.oldDevicePixelRatio) {
					obj.oldDevicePixelRatio = window.devicePixelRatio || 1.0;
					obj.chart[ obj.notify ]();
				}
			};
			window.addEventListener("resize", obj.__resizeProxy, false);
		}
	};

export { igRoot };
