/*!@license
* Infragistics.Web.ClientUI igEditors KnockoutJS extension <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*	jquery-1.9.1.js
*	infragistics.util.js
*   infragistics.util.jquery.js
*   infragistics.util.jquerydeferred.js
*	infragistics.ui.editors.js
*/

/*global ko*/
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
            "jquery",
            "jquery-ui",
            "knockout",
            "../modules/infragistics.util",
			"../modules/infragistics.util.jquery",
			"../modules/infragistics.util.jquerydeferred",
            "../modules/infragistics.ui.editors"
            ], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
	function updatePropertyValue(element, bindingType, viewModel, newValue) {
		var reg = new RegExp(bindingType + "\\s*:\\s*(?:{.*,?\\s*value\\s*:\\s*)?([^{},\\s]+)"),
			key,
			res = $(element).attr("data-bind").match(reg);
		if (res) {
			key = res[ 1 ];
			if (viewModel[ key ]) {
				viewModel[ key ] = newValue;
			}
		}
	}
	ko.bindingHandlers.igTextEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igTextEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onChange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igtexteditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.newValue);
					} else {
						updatePropertyValue(element, "igTextEditor", viewModel, args.newValue);
					}
				});
			} else {

				//In that case the model is updated on textChanged event
				editor.bind("igtexteditortextchanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.text);
					} else {
						updatePropertyValue(element, "igTextEditor", viewModel, args.text);
					}
				});
				if (options.listItems !== undefined) {

					//In that case the model is updated dropDownItemSelecting event
					editor.bind("igtexteditordropdownitemselecting", function (event, args) {
						if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
							valueAccessor().value(args.item.innerText);
						} else if (args.item !== undefined) {
							updatePropertyValue(element, "igTextEditor", viewModel, args.item.innerText);
						}
					});
				}
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igTextEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().value);
			current = editor.igTextEditor("value");
			if (current !== value) {
				editor.igTextEditor("value", value);
			}
		}
	};
	ko.bindingHandlers.igDatePicker = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igDatePicker(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onchange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igdatepickervaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {

						//T.P. #153479 Fix to use value instead of text, because editor sets date value and we should rely on that date, but not text.
						valueAccessor().value(args.owner.value());
					} else {
						updatePropertyValue(element, "igDatePicker", viewModel, args.owner.value());
					}
				});
			} else {
				throw new Error($.ig.Editor.locale.updateModeNotSupported);
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igDatePicker("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element), parsedDate, val;
			value = ko.utils.unwrapObservable(valueAccessor().value);

			//T.P. fix for bug #147833 When the value is null on initial state the extension should work correclty. #190615 When observable is created without value it's undefined
			//T.P. "value === ''" fix for bug 201698 when the view model updates the value to an empty string the value of the editor should be cleared.
			if (value === null || value === undefined || value === "") {
				editor.igDatePicker("value", value);
			} else {
				value = value.toString().replace(/_(\d)/g, "$1");
				parsedDate = Date.parse(value);
				if (value.toString().indexOf("/Date(") === 0) {

					//handle date data coming via json from Microsoft
					value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1"), 10));
					if (value.toString() === "Invalid Date") {
						value = undefined;
					}
				} else if (isNaN(parsedDate)) {
					val = new Date(value);
					if (val && isNaN(val) && val.toString() !== "Invalid Date") {
						val = $.ig.util.dateFromISO(value);
					}
					value = val;
					if (value.toString() === "Invalid Date") {
						value = undefined;
					}
				}
				current = editor.igDatePicker("value");
				current = Date.parse(current);
				if (current !== parsedDate) {

					//T.P. #153480 This is needed on initial state to allow the editor to accept string which is different locale than en-us
					if (value !== undefined && value !== editor.igDatePicker("displayValue")) {
						value = new Date(value);
					}
					editor.igDatePicker("value", value);
				}
			}
		}
	};
	ko.bindingHandlers.igDateEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igDateEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onchange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igdateeditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {

						//T.P. #153479 Fix to use value instead of text, because editor sets date value and we should rely on that date, but not text.
						valueAccessor().value(args.owner.value());
					} else {
						updatePropertyValue(element, "igDateEditor", viewModel, args.owner.value());
					}
				});
			} else {
				throw new Error($.ig.Editor.locale.updateModeNotSupported);
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igDateEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element), parsedDate, val;
			value = ko.utils.unwrapObservable(valueAccessor().value);

			//T.P. fix for bug #147833 When the value is null on initial state the extension should work correclty. #190615 When observable is created without value it's undefined
			//T.P. "value === ''" fix for bug 201698 when the view model updates the value to an empty string the value of the editor should be cleared.
			if (value === null || value === undefined || value === "") {
				editor.igDateEditor("value", value);
			} else {
				value = String(value).replace(/_(\d)/g, "$1");
				parsedDate = Date.parse(value);
				if (value.toString().indexOf("/Date(") === 0) {

					//handle date data coming via json from Microsoft
					value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1"), 10));
					if (value.toString() === "Invalid Date") {
						value = undefined;
					}
				} else if (isNaN(parsedDate)) {
					val = new Date(value);
					if (val && isNaN(val) && val.toString() !== "Invalid Date") {
						val = $.ig.util.dateFromISO(value);
					}
					value = val;
					if (value.toString() === "Invalid Date") {
						value = undefined;
					}
				}
				current = editor.igDateEditor("value");
				current = Date.parse(current);
				if (current !== parsedDate) {

					//T.P. #153480 This is needed on initial state to allow the editor to accept string which is different locale than en-us
					if (value !== undefined && value !== editor.igDateEditor("displayValue")) {
						value = new Date(value);
					}
					editor.igDateEditor("value", value);
				}
			}
		}
	};
	ko.bindingHandlers.igNumericEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igNumericEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onchange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("ignumericeditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.newValue);
					} else {
						updatePropertyValue(element, "igNumericEditor", viewModel, args.newValue);
					}
				});
			} else {

				//In that case the model is updated on textChanged event
				editor.bind("ignumericeditortextchanged", function (event, args) {
					args.owner._processValueChanging(args.text);
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.owner.value());
					} else {
						updatePropertyValue(element, "igNumericEditor", viewModel, args.owner.value());
					}
				});
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igNumericEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().value);

			// K.D. Good!
			if (isNaN(value)) {
				value = undefined;
			}
			current = editor.igNumericEditor("value");
			if (current !== value) {
				editor.igNumericEditor("value", value);
			}
		}
	};
	ko.bindingHandlers.igCurrencyEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igCurrencyEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onchange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igcurrencyeditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.newValue);
					} else {
						updatePropertyValue(element, "igCurrencyEditor", viewModel, args.newValue);
					}
				});
			} else {

				//In that case the model is updated on textChanged event
				editor.bind("igcurrencyeditortextchanged", function (event, args) {
					args.owner._processValueChanging(args.text);
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.owner.value());
					} else {
						updatePropertyValue(element, "igCurrencyEditor", viewModel, args.owner.value());
					}
				});
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igCurrencyEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().value);
			if (isNaN(value)) {
				value = undefined;
			}
			current = editor.igCurrencyEditor("value");
			if (current !== value) {
				editor.igCurrencyEditor("value", value);
			}
		}
	};
	ko.bindingHandlers.igPercentEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igPercentEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onChange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igpercenteditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.newValue);
					} else {
						updatePropertyValue(element, "igPercentEditor", viewModel, args.newValue);
					}
				});
			} else {

				//In that case the model is updated on textChanged event
				editor.bind("igpercenteditortextchanged", function (event, args) {
					args.owner._processValueChanging(args.text);
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.owner.value());
					} else {
						updatePropertyValue(element, "igPercentEditor", viewModel, args.owner.value());
					}
				});
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igPercentEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().value);
			if (isNaN(value)) {
				value = undefined;
			}
			current = editor.igPercentEditor("value");
			if (current !== value) {
				editor.igPercentEditor("value", value);
			}
		}
	};
	ko.bindingHandlers.igMaskEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.value = ko.utils.unwrapObservable(options.value);
			editor.igMaskEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onChange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}
			if (options.updateMode.toLowerCase() === "onchange") {

				//In that case the model is updated on valueChanged event
				editor.bind("igmaskeditorvaluechanged", function (event, args) {
					if (ko.isObservable(valueAccessor().value)) {
						valueAccessor().value(args.newValue);
					} else {
						updatePropertyValue(element, "igMaskEditor", viewModel, args.newValue);
					}
				});
			} else {

				//In that case the model is updated on textChanged event
				throw new Error($.ig.Editor.locale.updateModeNotSupported);
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igMaskEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().value);
			current = editor.igMaskEditor("value");
			if (current !== value) {
				editor.igMaskEditor("value", value);
			}
		}
	};
	ko.bindingHandlers.igCheckboxEditor = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element), options;
			options = $.extend({}, valueAccessor());
			options.checked = ko.utils.unwrapObservable(options.checked);
			editor.igCheckboxEditor(options);
			if (options.updateMode === undefined) {
				options.updateMode = "onchange";
			} else if (options.updateMode.toLowerCase() !== "onchange" &&
				options.updateMode.toLowerCase() !== "immediate") {
				throw new Error($.ig.Editor.locale.updateModeUnsupportedValue);
			}

			//In that case the model is updated on valueChanged event
			editor.bind("igcheckboxeditorvaluechanged", function (event, args) {
				if (ko.isObservable(valueAccessor().checked)) {
					valueAccessor().checked(args.newValue);
				} else {
					updatePropertyValue(element, "igCheckboxEditor", viewModel, args.newValue);
				}
			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).igCheckboxEditor("destroy");
			});
		},
		update: function (element, valueAccessor) {
			var value, current, editor = $(element);
			value = ko.utils.unwrapObservable(valueAccessor().checked());
			current = editor.igCheckboxEditor("value");
			if (current !== value) {
				editor.igCheckboxEditor("value", value);
			}
		}
	};
}));// REMOVE_FROM_COMBINED_FILES
