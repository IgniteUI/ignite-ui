/*!@license
* Infragistics.Web.ClientUI Editors <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
* jquery-1.9.1.js
* jquery.ui.core.js
* jquery.ui.widget.js
* infragistics.util.js
* infragistics.util.jquery.js
* infragistics.ui.widget.js
* infragistics.ui.rating-en.js
*
* Example to use:
*	<script type="text/javascript">
*	$(function () {
*		$('#rating1').igRating({ voteCount:3, value:0.5, vertical:true });
*	});
*	</script>
*	<div id="rating1"></div>
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"./infragistics.ui.widget"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	var _aNull = function (v) {
		return v === null || v === undefined || (typeof v === "number" && isNaN(v));
	};
	/*
		igRating is a widget based on jQuery UI that provides functionality to edit numeric value by mouse, which appears as a row or a column of vote/star images.
	*/
	$.widget("ui.igRating", $.ui.igWidget, {
		options: {
			/* type="bool" Gets a vertical or horizontal orientation for the votes.
				Change of that option is not supported after igRating was created.
				```
				$(".selector").igRating({
					vertical : true
				});

				//Get
				var isVertical = $(".selector").igRating("option", "vertical");
				```
			*/
			vertical: false,
			/* type="number|string" Gets/Sets value (selected votes or percent). If the value is of type string, it should be suitable for parsing to number. According to [valueAsPercent](ui.igrating#options:valueAsPercent) options the value is used as number of selected votes or as a percent of the votes.
				```
				//Initialize
				$(".selector").igRating({
					value : 3
				});

				//Get
				var value = $(".selector").igRating("option", "value");

				//Set
				$(".selector").igRating("option", "value", 3);
				```
			*/
			value: null,
			/* type="number|string" Gets/Sets value-hover (hovered votes or percent of hovered votes). The default is same as value. If the value is of type string, it should be suitable for parsing to number. According to [valueAsPercent](ui.igrating#options:valueAsPercent) options the valueHover is used as number of hovered votes or as a percent of the hovered votes.
				```
				//Initialize
				$(".selector").igRating({
					valueHover : 2
				});

				//Get
				var hoverVal = $(".selector").igRating("option", "valueHover");

				//Set
				$(".selector").igRating("option", "valueHover", 2);
				```
			 */
			valueHover: null,
			/* type="number" Gets/Sets number of votes.
				```
				//Initialize
				$(".selector").igRating({
					voteCount : 3
				});

				//Get
				var count = $(".selector").igRating("option", "voteCount");

				//Set
				$(".selector").igRating("option", "voteCount", 3);
				```
			*/
			voteCount: 5,
			/* type="number" Gets/Sets custom width of a vote in pixels. In case of 0 the run time style value is used.
				```
				//Initialize
				$(".selector").igRating({
					voteWidth : 64
				});

				//Get
				var width = $(".selector").igRating("option", "voteWidth");

				//Set
				$(".selector").igRating("option", "voteWidth", 64);
				```
			*/
			voteWidth: 0,
			/* type="number" Gets/Sets custom height of a vote in pixels. In case of 0 the run time style value is used.
				```
				//Initialize
				$(".selector").igRating({
					voteHeight : 38
				});

				//Get
				var height = $(".selector").igRating("option", "voteHeight");

				//Set
				$(".selector").igRating("option", "voteHeight", 38);
				```
			 */
			voteHeight: 0,
			/* type="bool" Gets the direction of selected and hovered votes. Change of that option is not supported after igRating was created.
				Value true: from left to right or from top to bottom.
				Value false: from right to left or from bottom to left.
				```
				//Initialize
				$(".selector").igRating({
					swapDirection : true
				});

				//Get
				var swap = $(".selector").igRating("option", "swapDirection");
				```
			*/
			swapDirection: false,
			/* type="bool" Gets/Sets percent or vote number to measure value and value-hover.
				Value true: value is measured as percent (from 0 to 1).
				Value false: value is measured in number of voted (from 0 to voteCount)
				```
				//Initialize
				$(".selector").igRating({
					valueAsPercent : false
				});

				//Get
				var isPercent = $(".selector").igRating("option", "valueAsPercent");

				//Set
				$(".selector").igRating("option", "valueAsPercent", false);
				```
			 */
			valueAsPercent: true,
			/* type="bool" Gets if igRating can have focus. Change of that option is not supported after igRating was created.
				Value true: can get focus and process key events.
				Value false: cannot get focus.
				```
				//Initialize
				$(".selector").igRating({
					focusable : false
				});

				//Get
				var focusable = $(".selector").igRating("option", "focusable");
				```
				*/
			focusable: true,
			/* type="exact|half|whole" Gets/Sets precision. Precision of value and valueHover.
				```
				//Initialize
				$(".selector").igRating({
					precision : "half"
				});

				//Get
				var precision = $(".selector").igRating("option", "precision");

				//Set
				$(".selector").igRating("option", "precision", "half");
				```
				exact type="string" Value corresponds location of mouse.
				half type="string" Value is rounded to the half of vote.
				whole type="string" Value is rounded to the number of votes. */
			precision: "whole",
			/* type="number" Gets/Sets part of vote-size, which is considered as zero value.
				It has effect only when precision is set to "half" or "whole".
				If user clicks between edge of the first vote and (sizeOfVote * precisionZeroVote), then value is set to 0.
				Same is applied for mouseover as well.
				```
				//Initialize
				$(".selector").igRating({
					precisionZeroVote : 0.5
				});

				//Get
				var precisionZero = $(".selector").igRating("option", "precisionZeroVote");

				//Set
				$(".selector").igRating("option", "precisionZeroVote", 0.5);
				```
				*/
			precisionZeroVote: 0.25,
			/* type="number" Gets/Sets number of decimal places used to round value and value-hover.
				Negative value will disable that option and value will not be rounded.
				Notes:
				If precision is "whole" or "half" and roundedDecimalPlaces is set in range of 0..2, then 3 is used.
				If valueAsPercent is enabled and roundedDecimalPlaces is set to 0, then 1 is used.
				If it is larger than 15, then 15 is used.
				```
				//Initialize
				$(".selector").igRating({
					roundedDecimalPlaces : 2
				});

				//Get
				var decimalPlaces = $(".selector").igRating("option", "roundedDecimalPlaces");

				//Set
				$(".selector").igRating("option", "roundedDecimalPlaces", 2);
				```
			*/
			roundedDecimalPlaces: 3,
			/* type="string" Gets/Sets selector for css classes.
				That option allows replacing all default css styles by custom values.
				Application should provide css classes for all members defined in the css options with "theme" selector.
				```
				//Initialize
				$(".selector").igRating({
					theme : "redmond"
				});

				//Get
				var theme = $(".selector").igRating("option", "theme");

				//Set
				$(".selector").igRating("option", "theme", "redmond");

				//CSS theme definition
				.redmond .ui-igrating { ... }
				.redmond .ui-igrating-active { ... }
				.redmond .ui-igrating-hover { ... }
				.redmond .ui-igrating-vote { ... }
				.redmond .ui-igrating-voteselected { ... }
				.redmond .ui-igrating-votehover { ... }
				.redmond .ui-igrating-votedisabled { ... }
				.redmond .ui-igrating-votedisabledselected { ... }
				```
			*/
			theme: null,
			/* type="object" Gets/Sets object which contains options supported by igValidator.
				Note that for onblur validation depends on the [focusable](ui.igrating#options:focusable) option.
				```
				//Initialize
				$(".selector").igRating({
					validatorOptions : {
						onblur: true
					}
				});

				//Get
				var validatorOptions = $(".selector").igRating("option", "validatorOptions");

				//Set
				$(".selector").igRating("option", "validatorOptions", {onblur: true});
				```
			*/
			validatorOptions: null,
			/* type="object" Gets/Sets custom css votes.
				That object should be 2-dimentional array or object with indexes, where every item of first level represents settings for a vote at that index.
				Second level of an item is settings for a vote and it should contain classes for a specific state of vote.
				Item at index [0] on second level is used for css class of vote in normal state.
				Item at index [1] on second level is used for css class of vote in selected state.
				Item at index [2] on second level is used for css class of vote in hover state.
				Examples:
				{ 1: { 0: "normalCss", 1: "selectedCss", 2: "hoverCss"} }
				will customize only second vote with [normalCss](ui.igrating#theming:ui-igrating ui-state-default ui-widget-content) for normal state, [hoverCss](ui.igrating#theming:ui-igrating-hover ui-state-hover) for hover state and [selectedCss](ui.igrating#theming:ui-igrating-voteselected) for selected state.
				[[null, 's1', 'h1'], [null, 's2', 'h2'], [null, 's3', 'h3']]
				will customize selected and hover states for first 3 votes with classes h# and s#.
				```
				 //Initialize
				$(".selector").igRating({
					cssVotes : customCss
				});

				//Get
				var css = $(".selector").igRating("option", "cssVotes");

				//Set
				$(".selector").igRating("option", "cssVotes", customCss);

				customCss = [
					["selected0", "selected1", "selected2"],
					["normal0", "normal1", "normal2"],
					["hovered0", "hovered1", "hovered2"]
				];

				<style type="text/css">
				.normal0 { ... }
				.normal1 { ... }
				.normal2 { ... }
				.selected0 { ... }
				.selected1 { ... }
				.selected2 { ... }
				.hovered0 { ... }
				.hovered1 { ... }
				.hovered2 { ... }
				</style>
				```
				*/
			cssVotes: null
		},
		css: {
			/* Classes applied to the DIV container element. Default value is 'ui-igrating ui-state-default ui-widget-content' */
			normal: "ui-igrating ui-state-default ui-widget-content",
			/* Class applied to the DIV container element when igRating has focus. Default value is 'ui-igrating-active' */
			active: "ui-igrating-active",
			/* Classes applied to the container of hover votes. Default value is 'ui-igrating-selected ui-state-highlight' */
			selected: "ui-igrating-selected ui-state-highlight",
			/* Classes applied to the container of hover votes. Default value is 'ui-igrating-hover ui-state-hover' */
			hover: "ui-igrating-hover ui-state-hover",
			/* Classes applied to the SPAN element of a vote. Default value is 'ui-igrating-vote ui-icon ui-icon-star' */
			vote: "ui-igrating-vote ui-icon ui-icon-star",
			/* Class applied to the SPAN element of a vote in selected state. Default value is 'ui-igrating-voteselected' */
			voteSelected: "ui-igrating-voteselected",
			/* Classes applied to the SPAN element of a vote in disabled state. Default value is 'ui-igrating-votedisabled ui-state-disabled' */
			voteDisabled: "ui-igrating-votedisabled ui-state-disabled",
			/* Class applied to the SPAN element of a vote in hover state. Default value is 'ui-igrating-votehover' */
			voteHover: "ui-igrating-votehover",
			/* Classes applied to the SPAN element of a vote in selected state when igRating is disabled. Default value is 'ui-igrating-votedisabledselected ui-state-disabled' */
			voteDisabledSelected: "ui-igrating-votedisabledselected ui-state-disabled"
		},
		events: {
			/* cancel="true" Event which is raised before hover value is changed.
				If application returns false, then action is canceled and hover value stays unchanged.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igratinghoverchange", function (evt, ui) {
					//return the triggered event
					evt;

					//the value before the igRating was hovered
					ui.oldValue;
					//the current hover value
					ui.value;
				});

				//Initialize
				$(".selector").igRating({
					hoverChange : function(evt, ui) {...}
				});
				```
				Function takes arguments evt and ui.
				Use ui.value to get new value.
				Use ui.oldValue to get old value. */
			hoverChange: null,
			/* cancel="true" Event which is raised before (selected) value is changed.
				If application returns false, then action is canceled and value stays unchanged.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igratingvaluechange", function (evt, ui) {
					//return the triggered event
					evt;

					//gets old value of the igRating widget
					ui.oldValue;
					//gets the current selected value of the igRating widget
					ui.value;
				});

				//Initialize
				$(".selector").igRating({
					valueChange : function(evt, ui) {...}
				});

				```
				Function takes arguments evt and ui.
				Use ui.value to get new value.
				Use ui.oldValue to get old value. */
			valueChange: null
		},
		_create: function () {
			var inp, cont, elem,
				sto = {
					fontSize: "1px",
					width: "100%",
					height: "100%",
					position: "relative",
					overflow: "hidden"
				},
				o = this.options,
				elem0 = this.element,
				me = this,
				css = this.css,
				count = this._count(o),
				v = elem0[ 0 ].style,
				id = o.inputName;
			me._old = { width: v.width, height: v.height, html: elem0[ 0 ].innerHTML };
			if (!id) {
				elem0[ 0 ].innerHTML = "";
			}
			if (o.theme) {
				elem0.addClass(o.theme);
			}
			me._swap = o.swapDirection;
			me._rtl = elem0.css("direction") === "rtl";
			if (me._rtl) {
				me._swap = !me._swap;
				elem0.css("direction", "ltr");
			}

			// flag if control should use hover-css. Bit 1-has mouse, Bit 2-has focus.
			me._hasHov = 0;
			elem = me._elem = $("<div/>").css(sto).addClass(css.normal).appendTo(elem0).bind(me._evts = {
				mousedown: function (e) { me._doEvt(e, 1); },
				mousemove: function (e) { me._doEvt(e, 2); },
				mouseleave: function (e) { me._doEvt(e, 3); }
			});
			cont = $("<div/>").css(sto).appendTo(elem);
			if (o.focusable) {
				v = {
					left: "5px",
					top: "5px",
					opacity: 0.1,
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: "0px",
					zIndex: -1,
					border: "0px",
					outline: 0
				};
				me._foc = $("<input type=\"button\"/>").css(v).appendTo(cont).focus(function (evt) {
					if (o.disabled || me._fcs) {
						return;
					}
					me._fcs = 1;

					// flag if control should use hover-css. Bit 1-has mouse, Bit 2-has focus.
					// set focus bit
					if (me._hasHov < 2) {
						me._hasHov += 2;
					}
					if (me._hov) {
						me._doVal(me._valH, 1, evt);
						me._hov.css("visibility", "visible");
					}
					me._elem.addClass(css.active);
				}).blur(function (e) {
					if (o.disabled || !me._fcs) {
						return;
					}
					me._fcs = null;

					// flag if control should use hover-css. Bit 1-has mouse, Bit 2-has focus.
					// remove focus bit
					me._hasHov %= 2;
					if (me._hov && me._hasHov === 0) {
						me._hov.css("visibility", "hidden");
					}
					me._elem.removeClass(css.active);
					if (me._validator) {
					    me._validator._validateInternal(me.element, e, true);
					}
				}).keydown(function (evt) {
					var old,
					arrow = 0,
					k = evt.keyCode,
					kc = $.ui.keyCode,
					val = me._valH,
					swap = me._swap ? -1 : 1,
					vertical = o.vertical, d = 1 / me._count(o);
					if (o.disabled) {
						return;
					}
					old = val;

					// exact=4, half=2, whole=1
					d /= me._prec(o);
					if (k === kc.SPACE || k === kc.ENTER) {
						me._doVal(val, false, evt);
						return;
					}
					if (k === kc.HOME) {
						val = 0;
					} else if (k === kc.END) {
						val = 1;
					} else if (k === kc.PAGE_DOWN) {
						val += d * 4;
					} else if (k === kc.PAGE_UP) {
						val -= d * 4;
					} else if (k === kc.UP && vertical) {
						val += (arrow = -d * swap);
					} else if (k === kc.DOWN && vertical) {
						val += (arrow = d * swap);
					} else if (k === kc.LEFT && !vertical) {
						val += (arrow = -d * swap);
					} else if (k === kc.RIGHT && !vertical) {
						val += (arrow = d * swap);
					}
					if (k > 32 && k < 41) {
						try {
							evt.preventDefault();
							evt.stopPropagation();
						} catch (ex) { }
					}

					// if roundedValue is too small (like 0), then requested increment/decrement by arrow can fail
					for (k = 0; k < 3; k++) {

						// _doVal returns 1, if new and old values are the same
						if (old !== (val = Math.max(Math.min(val, 1), 0)) && me._doVal(val, 1, evt) && arrow) {
							val += arrow;
						} else {
							break;
						}
					}
				});
			}
			me._doVotes(o, cont);

			// implement back-button of browser
			if (id) {
				inp = $('input[name="' + id + '"]');
				if (inp.length <= 0) {
					inp = $("#" + id);
				}
				v = inp[ 0 ] ? inp[ 0 ].value : null;
				if (v) {
					o.value = me._toNum(v, o);
				}
			}

			// selected value: it will be always in range of 0..1
			me._val = me._toNum(o.value, o);
			v = o.valueHover;

			// hover value: it will be always in range of 0..1
			me._valH = _aNull(v) ? me._val : me._toNum(v, o);
			if (!o.valueAsPercent) {
				me._val /= count;
				me._valH /= count;
			}
			me.validator();
			me._set = true;

			// 2-flag to adjust inputName.value (used by Mvc model)
			me._doVal(me._val, null, inp ? 2 : inp);
			me._doVal(me._valH, 1);
			delete me._set;
		},
		_toNum: function (v, o) {
			if (!v) {
				return 0;
			}
			o = o._vsFormat;
			if (typeof v === "string") {
				v = parseFloat(o ? v.replace(o, "_").replace(/[`,\. \':]/g, "").replace("_", ".") : v);
			}
			return (isNaN(v) || v < 0) ? 0 : v;
		},
		_count: function (o) {
			o = parseInt(o.voteCount, 10);
			return isNaN(o) ? 5 : Math.max(o, 1);
		},
		_doVotes: function (o, cont) {
			var hov, sel, cssV, height, width, div, span, cssi, val = cont,
				count = this._count(o),
				sto = {
					width: "100%",
					height: "100%"
				},
				abs = {
					left: "0px",
					top: "0px",
					position: "absolute",
					overflow: "hidden",
					border: "none",
					background: "none"
				},
				i = -1,
				me = this,
				css = this.css,
				elem = this._elem,
				elem0 = this.element,
				touch = { touchstart: function (e) { e.preventDefault(); $(this).trigger("mousedown"); } };
			if (!cont) {
				cont = me._div.parent();
				me._div.remove();
				me._hov.remove();
				me._sel.remove();
				me._selSwap = me._hovSwap = null;
			}
			div = me._div = $("<div/>").addClass(css.vote).css(abs).appendTo(cont);
			if (!o.vertical) {
				div.css("whiteSpace", "nowrap");
			}

			// validate width and height
			height = parseInt(o.voteHeight, 10);
			width = parseInt(o.voteWidth, 10);
			if (isNaN(height) || height < 2) {
				height = div.css("height");
				height = (!height || height.indexOf("px") < 1) ? 16 : parseInt(height, 10);
			}
			if (isNaN(width) || width < 2) {
				width = div.css("width");
				width = (!width || width.indexOf("px") < 1) ? 16 : parseInt(width, 10);
			}
			div.removeClass(css.vote);

			// selected div
			sel = me._sel = $("<div/>").addClass(css.selected).css(sto).css(abs).appendTo(cont);
			if (!o.vertical) {
				sel.css("whiteSpace", "nowrap");
			}

			// hover div
			hov = me._hov = $("<div/>").addClass(css.hover).css(sto).css(abs)
									.css("visibility", "hidden").appendTo(cont);
			if (!o.vertical) {
				hov.css("whiteSpace", "nowrap");
			}
			if (me._swap && !o.vertical) {
				me._hovSwap = hov = $("<div/>").css(sto).appendTo(me._hov);
				me._selSwap = sel = $("<div/>").css(sto).appendTo(me._sel);
			}
			cssV = {
				display: o.vertical ? "block" : "inline-block",
				width: width,
				height: height,
				textIndent: "0px",
				overflow: "visible"
			};
			while (++i < count) {
				span = $("<span />").addClass(css.vote).css(cssV).appendTo(div).bind(touch);
				if (o.disabled) {
					span.addClass(css.voteDisabled);
				}
				cssi = o.cssVotes ? o.cssVotes[ i ] : null;
				if (cssi && cssi[ 0 ]) {
					span.addClass(cssi[ 0 ]);
				}
				span[ 0 ]._i = i;
				span = $("<span />").addClass(css.vote).addClass(css.voteSelected)
							.css(cssV).appendTo(sel).bind(touch);
				if (o.disabled) {
					span.addClass(css.voteDisabledSelected);
				}
				if (cssi && cssi[ 1 ]) {
					span.addClass(cssi[ 1 ]);
				}
				span[ 0 ]._i = i;
				if (me._swap && !me._selSwap) {
					me._selSwap = span;
				}
				span = $("<span />").addClass(css.vote).addClass(css.voteHover)
							.css(cssV).appendTo(hov).bind(touch);
				if (cssi && cssi[ 2 ]) {
					span.addClass(cssi[ 2 ]);
				}
				span[ 0 ]._i = i;
				if (me._swap && !me._hovSwap) {
					me._hovSwap = span;
				}
			}
			if (o.vertical) {
				me._size = height;
				height *= count;
			} else {
				me._size = width;
				width *= count;
			}

			// moving this line above try{}, seems to get around bugs in jquery-1.4.4. But keep try{} in case of bugs in future jquerys
			elem.css({
				height: height + "px",
				width: width + "px"
			});

			// get around bugs in jquery-1.4.4 (exception in Opera or huge elem.innerHeight in IE)
			try {
				height += ((i = Math.max(elem.outerHeight() - elem.innerHeight(), 0)) > 10) ? 2 : i;
				width += ((i = Math.max(elem.outerWidth() - elem.innerWidth(), 0)) > 10) ? 2 : i;
			} catch (ex) { }
			elem0.css({
				height: height + "px",
				width: width + "px"
			});
			div.css(sto);
			if (!val) {
				me.value(me.value());
			}
		},
		validator: function (destroy) {

			/* Gets reference to [igValidator](ui.igvalidator) used by igRating.
				```
				//get igValidator widget that is used by the igRating
				var validator = $(".selector").igRating("validator");

				//destroy the igValidator widget that is used by the igRating
				$(".selector").igRating("validator", "destroy");
				```
				paramType="bool" optional="true" Request to destroy validator.
				returnType="object" Returns reference to igValidator or null.
			*/
			var o = this.options.validatorOptions, v = this._validator;
			if (v && v.owner === this && (destroy || !o)) {
				v.destroy();
				delete this._validator;
			} else if (!v && !destroy && o && this.element.igValidator) {
			    this._validator = this.element.igValidator(o).data("igValidator");
			    this._validator.owner = this;
			} else if (v && !destroy && o && this.element.igValidator) {
			    this._validator = this.element.igValidator(o).data("igValidator");
			}
			return this._validator;
		},
		validate: function () {
		    /* Triggers validation.
				```
				$(".selector").igRating("validate");
				```
                returnType="bool" True if all checks have passed. Can be null in case validation is not enabled.
			*/
			return this._validator ? this._validator.validate() : null;
		},
		_doEvt: function (evt, type) {
			var val, me = this, o = this.options;
			if (o.disabled) {
				return;
			}

			// mouseleave
			if (type === 3) {

				// flag if control should use hover-css. Bit 1-has mouse, Bit 2-has focus.
				// remove mouse bit
				me._hasHov -= me._hasHov % 2;
				if (me._hov && me._hasHov === 0) {
					me._hov[ 0 ].style.visibility = "hidden";
				}
				return;
			}
			val = me._valFromEvt(evt);
			if (val < 0) {
				return;
			}

			// mousedown
			if (type === 1) {
				if (!me._sel) {
					return;
				}
				val = me._lastHov || val;
				me._doVal(val, false, evt);
				me._doVal(val, 1, evt);

				// get around bugs in IE9
				if (me._foc && document.hasFocus && !document.hasFocus()) {
					return setTimeout(function () { me.focus(); }, 0);
				}
				me.focus();
			}

			// mousemove
			if (type === 2) {
				me._lastHov = val;
				if (!me._hov) {
					return;
				}

				// flag if control should use hover-css. Bit 1-has mouse, Bit 2-has focus.
				// set mouse bit
				if (me._hasHov % 2 === 0) {
					me._hasHov++;
				}
				me._hov[ 0 ].style.visibility = "visible";
				me._doVal(val, 1, evt);
			}
			evt.preventDefault();
		},
		_setOption: function (key, val) {
			var spans, count, css, o = this.options;
			if (o[ key ] === val) {
			    return this;
			}
			if (key === "swapDirection" || key === "vertical" || key === "focusable") {
			    throw new Error(this._getLocaleValue("setOptionError") + key);
			}
			count = this._count(o);
			if (key === "disabled") {
				spans = $("SPAN", this._div);
				css = this.css.voteDisabled;
				if (spans.length !== count) {
					return this;
				}
				if (val) {
					spans.addClass(css);
				} else {
					spans.removeClass(css);
				}
				spans = $("SPAN", this._sel);
				css = this.css.voteDisabledSelected;
				if (spans.length !== count && this._selSwap) {
					spans = $("SPAN", this._selSwap);
				}
				if (spans.length === count) {
					if (val) {
						spans.addClass(css);
					} else {
						spans.removeClass(css);
					}
				}
			}
			if (key === "theme") {
				if (o.theme) {
					this.element.removeClass(o.theme);
				}
				if (val) {
					this.element.addClass(val);
				}
			}
			o[ key ] = val;
			if (typeof val === "function") {
				return this;
			}
			this._set = true;
			if (key === "precision" || key === "valueAsPercent") {
				this._doVal(this._val, false, 1);
				this._doVal(this._valH, 1, 1);
			}
			if (key.indexOf("vote") === 0 || key === "theme" || key === "cssVotes") {
				this._doVotes(o);
			}
			if (key.indexOf("value") >= 0) {
				this._doVal(val, key.length > 6, 1, 1);
			}
			if (key === "validatorOptions") {
				this.validator();
			}
			delete this._set;
			return this;
		},
		_evtOffset: function (evt, xy) {
			var val,
				oEvt = evt.originalEvent || evt,
				offset = "offset" + xy;
			if (_aNull(val = evt[ offset ])) {
				if (_aNull(val = oEvt[ offset ])) {
					if (_aNull(val = evt[ offset = "layer" + xy ])) {
						val = oEvt[ offset ];
					}
				}
			}
			return val || 1;
		},
		_valFromEvt: function (evt) {
			var plus, val, offset, i, o = this.options, targ = evt ? evt.target : null;
			i = (targ && targ.nodeName === "SPAN") ? targ._i : null;
			if (_aNull(i)) {
				return -1;
			}
			if (!targ.unselectable) {
				targ.unselectable = "on";
			}
			offset = this._evtOffset(evt, o.vertical ? "Y" : "X");
			plus = this._size;

			// N.A. December 12th, 2016 #623 With new firefox this workaround (it's deleted) is not necessary, cause now firefox works like other browsers.
			plus *= i;
			if (plus > offset) {
				offset += plus;
			}
			val = offset / this._count(o) / this._size;
			if (this._swap) {
				val = 1 - val;
			}
			return Math.max(Math.min(val, 1), 0);
		},

		// val: value
		// hov: flag for valueHover
		// evt: event of browser, 1-flag to adjust _val/_valH, 2-init flag to adjust only inputName, or undefined
		// v0: flag that public value() or option-value was called
		// returns 1 if evt is on and new and old values after "_fixVal" are the same (used by arrow keys)
		_doVal: function (val, hov, evt, v0) {
			var id, inp, v1,
			count, o = this.options,
			style = hov ? this._hov : this._sel,
			size = this._size,
			swap = this._swap ? (hov ? this._hovSwap : this._selSwap) : null;
			if (style) {
				style = style[ 0 ];
				if (style) {
					style = style.style;
				}
			}
			if (!style) {
				return;
			}
			count = this._count(o);
			if (v0) {
				val = parseFloat(val);
			}
			if (isNaN(val)) {
				val = -1;
			} else if (v0 && !o.valueAsPercent) {
				val /= count;
			}
			if (evt && evt.type && val >= 0) {
				v0 = this._fixVal(hov ? this._valH : this._val, 1);
				v1 = this._fixVal(val, 1);
				if (v0 === v1) {
					return 1;
				}
				if (!this._trigger(hov ? "hoverChange" : "valueChange", evt, { value: v1, oldValue: v0 })) {
					return;
				}
			}
			if (val < 0 && hov) {
				val = this._val;
			}
			val = this._fixVal(val);
			if (evt) {
				v0 = this._round(o.valueAsPercent ? val : val * count, o);
				if (hov) {
					this._valH = val;
					o.valueHover = v0;
				} else {
					if (evt !== 2) {
						this._val = val;
						o.value = v0;
						if (this._validator) {
						    this._validator._validateInternal(this.element, evt);
						}
					}
					id = o.inputName;
					if (id) {
						inp = $('input[name="' + id + '"]');
						if (inp.length === 0) {
							inp = $('<input type="hidden" name="' + id + '" />').appendTo(this.element.parent());
						}
						v1 = o._vsFormat;
						inp.val(v1 ? v0.toString().replace(".", v1) : v0);
					}
				}
			}
			if (!hov && this._foc) {
				this._foc.val(this._fixVal(val, 1));
			}
			if (swap) {
				val = 1 - val;
			}
			val = Math.floor(val * size * count + 0.3);
			val += "px";
			if (swap) {
				swap = swap[ 0 ];
				if (swap) {
					swap = swap.style;
				}
			}
			if (o.vertical) {
				if (swap) {
					style.top = val;
					swap.marginTop = "-" + val;
				} else {
					style.height = val;
				}
			} else {
				if (swap) {
					style.left = val;
					swap.marginLeft = "-" + val;
				} else {
					style.width = val;
				}
			}
		},
		_prec: function (o) {
			o = this._set ? null : o.precision;
			if (o) {
				o = o.toLowerCase();
			}
			return (o === "half") ? 2 : ((o === "whole") ? 1 : 4);
		},

		// val-value in range 0..1
		// full-return value according to valueAsPercent
		_fixVal: function (val, full, prec) {
			var fix, count, o = this.options;
			prec = prec || this._prec(o);
			count = this._count(o);
			val = Math.max(Math.min(val, 1), 0);

			// half (2) or whole (1)
			if (prec < 4) {
				fix = count * prec;
				val *= fix;
				val = (val < o.precisionZeroVote) ? 0 : Math.floor(Math.floor(val + 0.99) + 0.499 * prec) / fix;
			}
			if (!full) {
				return val;
			}
			if (!o.valueAsPercent) {
				val *= count;

				// half (2) or exact (4)
				val = (prec > 1) ? val : Math.floor(val + 0.1);
			}
			return this._round(val, o);
		},
		_round: function (val, o) {
			var pow = 1, fix = parseInt(o.roundedDecimalPlaces, 10);
			if (isNaN(fix) || fix < 0) {
				return val;
			}
			fix = Math.min(15, Math.max(fix, (this._prec(o) < 4) ? 3 : (o.valueAsPercent ? 1 : 0)));
			while (fix-- > 0) {
				pow *= 10;
			}
			return Math.round(val * pow) / pow;
		},
		value: function (val) {

			/* Gets/Sets (selected) value.
				```
				//Get
				var value = $(".selector").igRating("value");

				//Set
				$(".selector").igRating("value", 4);
				```
				paramType="number" New value which is rendered with selected css.
				returnType="number|object" If parameter is not 'number', then exact value rendered with selected css is returned. Otherwise, reference to igRating is returned.
			*/
			if (typeof val !== "number") {
				return this._fixVal(this._val, 1, 4);
			}
			this._set = true;
			this._doVal(val, false, 1, 1);
			delete this._set;
			return this;
		},
		valueHover: function (val) {

			/* Gets/Sets hover value.
				```
				//Get
				var value = $(".selector").igRating("valueHover");

				//Set
				$(".selector").igRating("valueHover", 5);
				```
				paramType="number" optional="true" New value which will be rendered with hover css when rating gets mouse.
				returnType="number|object" If parameter is not "number", then last value which was rendered with hover css is returned. Otherwise, reference to igRating is returned.
			*/
			if (typeof val !== "number") {
				return this._fixVal(this._valH, 1, 4);
			}
			this._set = true;
			this._doVal(val, 1, 1, 1);
			delete this._set;
			return this;
		},
		hasFocus: function () {

			/* Checks if igRating has focus.
				```
				var focused = $(".selector").igRating("hasFocus");
				```
				returnType="bool" Returns true if igRating has focus.
			*/
			return this._fcs === 1;
		},
		focus: function () {

			/* Sets focus to igRating. That has effect only when options.focusable is enabled.
				```
				$(".selector").igRating("focus");
				```
				returnType="object" Returns reference to this igRating.
			*/
			if (this._foc) {
				try {
					this._foc[ 0 ].focus();
				} catch (ex) {}
			}
			return this;
		},
		destroy: function () {

			/* Destroys igRating widget.
				```
				$(".selector").igRating("destroy");
				```
				returnType="object" Returns reference to this igRating.
			*/
			var o = this.options, old = this._old, e = this.element;
			if (!this._elem) {
				return this;
			}
			this.validator(1);
			if (this._foc) {
				this._foc.unbind().remove();
			}
			this._elem.remove();
			if (o.theme) {
				e.removeClass(o.theme);
			}
			e[ 0 ].style.width = old.width;
			e[ 0 ].style.height = old.height;
			if (!o.inputName) {
				e[ 0 ].innerHTML = old.html;
			}
			if (this._rtl) {
				e.css("direction", "rtl");
			}
			this._superApply(arguments);
			this._elem = this._hov = this._sel =
			this._selSwap = this._hovSwap = this._foc = this._evts = null;
			return this;
		}
	});
	$.extend($.ui.igRating, { version: "<build_number>" });
	return $;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
