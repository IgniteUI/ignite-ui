/*!@license
 * Infragistics.Web.ClientUI Editors <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 * jquery-1.9.1.js
 *	jquery.ui-1.9.0.js
 *	infragistics.util.js
 *  infragistics.util.jquery.js
 *	infragistics.ui.scroll.js
 *	infragistics.ui.validator.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.scroll",
			"./infragistics.ui.validator"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	/* The igBaseEditor is a widget based on jQuery UI. */
	$.widget("ui.igBaseEditor", {
		options: {
			/* type="string|number|null" Gets/Sets the width of the control.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					width : 200
				});

				//Get
				var width = $(".selector").%%WidgetName%%("option", "width");

				//Set
				$(".selector").%%WidgetName%%("option", "width", 200);
				```
				string The widget width can be set in pixels (px) and percentage (%).
				number The widget width can be set as a number in pixels.
				null type="object" will stretch to fit data, if no other widths are defined.
			*/
			width: null,
			/* type="string|number|null" Gets/Sets the height of the control.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					height : 25
				});

				//Get
				var height = $(".selector").%%WidgetName%%("option", "height");

				//Set
				$(".selector").%%WidgetName%%("option", "height", 25);
				```
				string The height can be set in pixels (px) and percentage (%).
				number The height can be set as a number in pixels.
				null type="object" will fit the editor inside its parent container, if no other heights are defined.
			*/
			height: null,
			/* type="object" Gets/Sets value in editor. The effect of setting/getting that option depends on type of editor and on dataMode options for every type of editor.
			```
			//Initialize
			$(".selector").%%WidgetName%%({
				value : "Some text"
			});

			//Get
			var value = $(".selector").%%WidgetName%%("option", "value");

			//Set
			$(".selector").%%WidgetName%%("option", "value", "Some text");

			```
			*/
			value: null,
			/* type="number" Gets/Sets tabIndex attribute for the editor input.
			  ```
			  //Initialize
			  $('.selector').%%WidgetName%%({
				  tabIndex: 1
			  });

			  //Get
			  var tabIndex = $(".selector").%%WidgetName%%("option", "tabIndex");

			  //Set
			  $(".selector").%%WidgetName%%("option", "tabIndex", 1);
			  ```
			*/
			tabIndex: null,
			/* type="bool" Gets/Sets whether the editor value can become null.
				If that option is false, and editor has no value, then value is set to an empty string.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					allowNullValue : false
				});

				//Get
				var allowNullValue = $(".selector").%%WidgetName%%("option", "allowNullValue");

				//Set
				$(".selector").%%WidgetName%%("option", "allowNullValue", false);
				```
			*/
			allowNullValue: false,
			/* type="string|number|null" Gets/Sets the representation of null value. In case of default the value for the input is set to null, which makes the input to hold an empty string
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					nullValue : null
				});

				//Get
				var nullValue = $(".selector").%%WidgetName%%("option", "nullValue");

				//Set
				$(".selector").%%WidgetName%%("option", "nullValue", null);
				```
			*/
			nullValue: null,
			/* type="string" Gets/Sets the name attribute of the value input. This input is used to sent the value to the server. In case the target element is input and it has name attribute, but the developer has set the inputName option, so this option overwrites the value input and removes the attribute from the element.
			```
			//Initialize
				$(".selector").%%WidgetName%%({
				  inputName : "textField"
				});

				//Get
				var inputName = $(".selector").%%WidgetName%%("option", "inputName");

			//Set
			$(".selector").%%WidgetName%%("option", "inputName", "textField");
			```
			*/
			inputName: null,
			/* type="bool" Gets/Sets the readonly attribute for the input. If set to true the input is readonly, and all buttons and interactions are disabled. On submitting the form the editor belongs to, the value is submitted.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					readOnly : true
				});

				//Get
				var readOnly = $(".selector").%%WidgetName%%("option", "readOnly");

				//Set
				$(".selector").%%WidgetName%%("option", "readOnly", true);
			```
			*/
			readOnly: false,
			/* type="bool" Gets/Sets the disabled attribute for the input. If set to true the input is disabled, and all buttons and interactions are disabled. On submitting the form the editor belongs to, the value is not submitted.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					disabled : false
				});

				//Get
				var disabled = $(".selector").%%WidgetName%%("option", "disabled");

				//Set
				$(".selector").%%WidgetName%%("option", "disabled", true);
			```
			*/
			disabled: false,
			/* type="object" Gets/Sets options supported by the [igValidator](ui.igvalidator#options) widget.
				Note: Validation rules of [igValidator](ui.igvalidator#options), such as min and max value/length are applied separately triggering errors,
				while the corresponding options of the editor prevent values violating the defined rules from being entered.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						validatorOptions : {
						   successMessage: "Success",
									 required: true,
									 onchange: true,
						   notificationOptions: { mode: "popover" }
						}
					});

					//Get
					var validateOptions = $(".selector").%%WidgetName%%("option", "validatorOptions");

					//Set
					$(".selector").%%WidgetName%%("option", "validatorOptions", {onblur: true, onchange: true});
				```
			*/
			validatorOptions: null
		},
		css: {
			/* Class applied to the main/top element. Default value is 'ui-igedit-input' */
			editor: "ui-igedit-input",
			/* Class applied to the top element when editor is rendered in container. Default value is 'ui-igedit ui-igedit-container ui-widget ui-corner-all ui-state-default' */
			container: "ui-igedit ui-igedit-container ui-widget ui-corner-all ui-state-default",
			/* Class applied to the top element when editor is hovered. Default value is 'ui-state-hover' */
			hover: "ui-state-hover",
			/* Class applied to the top element when editor is active. Default value is 'ui-state-active' */
			active: "ui-state-active",
			/* Class applied to the top element when editor is on focus. Default value is 'ui-state-focus' */
			focus: "ui-state-focus",
			/* Classes applied to the editing element in disabled state. Default value is 'ui-igedit-disabled ui-state-disabled' */
			disabled: "ui-state-disabled"
		},
		events: {
			/* igWidget events go here */
			/* cancel="false" Event which is raised before rendering of the editor completes.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the editor performing rendering.
				Use ui.element to get a reference to the editor element.
				```
				$(".selector").on("%%WidgetNameLowered%%rendering", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					rendering: function (evt, ui) {
						...
					}
				});
				```
			*/
			rendering: "rendering",
			/* cancel="false" Event which is raised after rendering of the editor completes.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the editor performing rendering.
				Use ui.element to get a reference to the editor element.
				```
				$(".selector").on("%%WidgetNameLowered%%rendered", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					rendered: function (evt, ui) {
						...
					}
				});
				```
			*/
			rendered: "rendered",
			/* Event which is raised on mousedown event.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%mousedown", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					mousedown: function (evt, ui) {
						...
					}
				});
				```
			*/
			mousedown: "mousedown",
			/* Event which is raised on mouseup event.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%mouseup", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					mouseup: function (evt, ui) {
						...
					}
				});
				```
			*/
			mouseup: "mouseup",
			/* Event which is raised on mousemove at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%mousemove", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					mousemove: function (evt, ui) {
						...
					}
				});
				```
			*/
			mousemove: "mousemove",
			/* Event which is raised on mouseover at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%mouseover", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					mouseover: function (evt, ui) {
						...
					}
				});
				```
			*/
			mouseover: "mouseover",
			/* Event which is raised on mouseleave at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%mouseout", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					mouseout: function (evt, ui) {
						...
					}
				});
				```
			*/
			mouseout: "mouseout",
			/* Event which is raised when input field of editor loses focus.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%blur", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					blur: function (evt, ui) {
						...
					}
				});
				```
			*/
			blur: "blur",
			/* Event which is raised when input field of editor gets focus.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput to get a reference to the editor field.
				```
				$(".selector").on("%%WidgetNameLowered%%focus", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					focus: function (evt, ui) {
						...
					}
				});
				```
			*/
			focus: "focus",
			/* cancel="true" Event which is raised on keydown event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode.
				```
				$(".selector").on("%%WidgetNameLowered%%keydown", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					keydown: function (evt, ui) {
						...
					}
				});
				```
			*/
			keydown: "keydown",
			/* cancel="true" Event which is raised on keypress event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode.
				```
				$(".selector").on("%%WidgetNameLowered%%keypress", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					keypress: function (evt, ui) {
						...
					}
				});
				```
			*/
			keypress: "keypress",
			/* Event which is raised on keyup event.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode.
				```
				$(".selector").on("%%WidgetNameLowered%%keyup", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					keyup: function (evt, ui) {
						...
					}
				});
				```
			*/
			keyup: "keyup",
			/* cancel="true" Event which is raised before the editor value is changed.
				Return false in order to cancel change.
				It can be raised after loosing focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.oldValue to obtain the old value.
				Use ui.editorInput to obtain reference to the editor input.
				```
				$(".selector").on("%%WidgetNameLowered%%valuechanging", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					valueChanging: function (evt, ui) {
						...
					}
				});
				```
			*/
			valueChanging: "valueChanging",
			/* Event which is raised after the editor value is changed. It can be raised after loosing focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.originalValue to obtain the original value.
				Use ui.editorInput to obtain reference to the editor input.
				```
				$(".selector").on("%%WidgetNameLowered%%valuechanged", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					valueChanged: function (evt, ui) {
						...
					}
				});
				```
			*/
			valueChanged: "valueChanged"
		},
		_createWidget: function (options) {

			// Those are only the options that are defined by the user, before merged with the default ones.
			this._definedOptions = options;
			$.Widget.prototype._createWidget.apply(this, arguments);
		},
		_create: function () { //BaseEditor
			/* igWidget constructor goes here */
			this._initialize();
			this._readAttributes();
			this._saveDOMConent();
			this._render();
		},
		_initialize: function () {
			this._timeouts = [];
		},
		_readAttributes: function () {
			this._saveAttributes();
			this._removeAttributesAndSetThemAsOptions();
		},
		_saveAttributes: function () {
			var i;
			var element = this.element[ 0 ], attr;

			this._initialAttributes = [];
			attr = element.attributes;
			for (i = 0; i < attr.length; i++) {
				if (attr[ i ].name !== "id") {
					this._initialAttributes.push({
						name: attr[ i ].name,
						attrValue: attr[ i ].value // ,
						// propValue: element[ attr[ i ].name ]
					});
				}
			}
		},
		_removeAttributesAndSetThemAsOptions: function ( ) {
			var element = this.element,
				name = element.attr("name"),
				value = element.attr("value"),
				disabled = element.attr("disabled"),
				readOnly = element.attr("readOnly");

			if (name) {
				element.removeAttr("name");
				if (this.options.inputName === null) {
					this.options.inputName = name;
				}
			}
			if (value) {
				element.removeAttr("value");
				if (this.options.value === null) {
					this.options.value = value;
				}
			}
			if (disabled) {
				element.removeAttr("disabled");

				// If we have 'disabled' attribute, then it is applied only when 'disabled' options is not defined.
				if (this._definedOptions === undefined || this._definedOptions.disabled === undefined) {
					this.options.disabled = true;
				}
			}
			if (readOnly) {
				element.removeAttr("readonly");

				// If we have 'readOnly' attribute, then it is applied only when 'readOnly' options is not defined.
				if (this._definedOptions === undefined || this._definedOptions.readOnly === undefined) {
					this.options.readOnly = true;
				}
			}
			delete this._definedOptions;
		},
		_saveDOMConent: function () {
			if (this.element.children().length > 0) {

				// We use clone because we will preserve event binding to the elements(if any) if binging is through javascript.
				// If we use innerHtml then it will be faster(better for performance) but will not preserve data binding to the element inside to the table(if any).
				this._initialDOMContent = this.element.children().clone(true);
				this.element.empty(); // Remove all element content before rendering it.
			}
		},
		_render: function () {
			throw new Error($.ig.Editor.locale.renderErrMsg);
		},
		_applyOptions: function () {
			if (this.options.tabIndex !== null) {
				this._setTabIndex(this.options.tabIndex);
			}
			if (this.options.readOnly) {
				this._setReadOnly(true);
			}
			if (this.options.disabled) {
				this._setDisabled(true);
			}
			if (this.options.inputName) {
				this.inputName(this.options.inputName);
			}
			if (this.options.validatorOptions) {
				this._setupValidator();
			}
		},
		_attachEvents: function () {
			var self = this;
			this._editorContainer.on({
				"mousedown.editor": function (event) {
					self._triggerMouseDown(event);
				},
				"mouseup.editor": function (event) {

					self._triggerMouseUp(event);
				},
				"mousemove.editor": function (event) {
					self._triggerMouseMove(event);
				},
				"mouseover.editor": function (event) {
					self._triggerMouseOver(event);
				},
				"mouseout.editor": function (event) {
					self._triggerMouseOut(event);
				}
			});
		},
		_setupValidator: function () {
			if (this.element.igValidator) {
				this._validator = this.element.igValidator(this.options.validatorOptions).data("igValidator");
				this._validator.owner = this;
			}
		},
		_destroyValidator: function () {
			if (this._validator && this._validator.owner === this) {
				this._validator.destroy();
				this._validator = null;
			}
		},
		_applyAria: function () {
			var ariaLabeledBy = this.element.attr("aria-labelledby");

			if (ariaLabeledBy) {
				this.element.removeAttr("aria-labelledby");
				this._editorInput.attr("aria-labelledby", ariaLabeledBy);
			}
			if (this._dropDownButton) {
				this._editorInput.attr("role", "combobox");
			} else {
				this._editorInput.attr("role", "textbox");
			}
		},
		_triggerRendering: function () {
			var args = {
				element: this.element,
				owner: this
			};
			return this._trigger(this.events.rendering, null, args);
		},
		_triggerRendered: function () {
			var args = {
				element: this.element,
				owner: this
			};
			this._trigger(this.events.rendered, null, args);
		},
		_triggerMouseMove: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mousemove, event, args);
		},
		_triggerMouseDown: function (event) {
			this._editorContainer.addClass(this.css.active);
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			return this._trigger(this.events.mousedown, event, args);
		},
		_triggerMouseUp: function (event) {
			this._editorContainer.removeClass(this.css.active);
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseup, event, args);
		},
		_triggerMouseOver: function (event) {
			this._editorContainer.addClass(this.css.hover);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseover, event, args);
		},
		_triggerMouseOut: function (event) {
			this._editorContainer.removeClass(this.css.hover);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseout, event, args);
		},
		_triggerFocus: function (event) {
			this._editorContainer.addClass(this.css.focus);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.focus, event, args);
		},
		_triggerBlur: function (event) {
			this._editorContainer.removeClass(this.css.focus);
			this._editorContainer.removeClass(this.css.active);
			this._clearEditorNotifier();
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.blur, event, args);
		},
		_setOption: function (option, value) { //Base editor
			/* igWidget custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "readOnly":
					this._setReadOnly(value);
					break;
				case "disabled":
					this._setDisabled(value);
					break;
				case "width":
					this._setWidth(value);
					break;
				case "height":
					this._setHeight(value);
					break;
				case "validatorOptions":
					this._setupValidator();
					break;
				case "tabIndex":
					this._setTabIndex(value);
					break;
				case "inputName":
					this._valueInput.attr("name", value);
					break;
				default:
					break;
			}
		},
		_validateValue: function (val) {//Base editor
			return val ? true : false;
		},
		_updateValue: function (value) { //Base Editor
			if (value === this.options.nullValue && this.options.nullValue === null) {
				this._editorInput.val("");
				this._valueInput.val("");
			} else {

				//207411 T.P. 30th Oct 2015 setting the value at this stage causes the input to reset its cursor position.
				//this._editorInput.val(value);
				this._valueInput.val(value);
			}
			this.options.value = value;
		}, //BaseEditor
		//This method sets the value to null, or empty string depending on the nullable option.
		_clearValue: function (textOnly) {
			var newValue = "";

			// TODO use null, or 0 depending on the nullable option
			if (this.options.allowNullValue) {
				newValue = this.options.nullValue;
			}

			if (textOnly) {
				this._editorInput.val(newValue);
			} else {
				this._updateValue(newValue);
			}
		},
		_detachEvents: function () {
			if (this._detachButtonsEvents) {
				this._detachButtonsEvents();
			}
			if (this._detachListEvents) {
				this._detachListEvents();
			}

			this._editorContainer
				.off("mousedown.editor mouseup.editor mouseover.editor mouseout.editor");
		},
		_detachButtonsEvents: function () {
			if (this._dropDownList) {
				this._detachListEvents();
			}
			if (this._dropDownButton) {
				this._detachButtonsEvents(this._dropDownButton);
			}

			if (this._clearButton) {
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._detachButtonsEvents(this._spinDownButton);
			}
		},
		_restoreDOMStructure: function () {
			this._removeDOM();
			this._removeAttributes();
			this._setPropsDefaults();
			this._recoverInitialAttributes();
			this._recoverInitialDOMContent();
		},
		_removeDOM: function () {
			this._removeList();
			this._removeClearButton();
			this._removeSpinButtons();
			this._removeContainer();
		},
		_removeContainer: function () {
			this._valueInput.remove();
			if (this.element.is("input")) {
				this.element.unwrap().unwrap();
			} else if (this.element.is("div")) {
				this.element.empty();
			} else if (this.element.is("span")) {
				this.element.empty();
				this.element.unwrap().unwrap();
			}
		},
		_removeList: function () {
			if (this._dropDownList) {
				this._deleteList();
				this._deleteDropDownButton();
			}
		},
		_removeClearButton: function () {
			if (this._clearButton) {
				this._clearButton.remove();
				delete this._clearButton;
			}
		},
		_removeSpinButtons: function () {
			if (this._spinUpButton) {
				this._spinUpButton.remove();
				delete this._spinUpButton;
			}
			if (this._spinDownButton) {
				this._spinDownButton.remove();
				delete this._spinDownButton;
			}
		},
		_removeAttributes: function () {
			var element = this.element,
				attr = element[ 0 ].attributes,
				concatenatedAttr = "", i;

			for (i = 0; i < attr.length; i++) {
				if (attr[ i ].name !== "id") {
					concatenatedAttr += (attr[ i ].name + " ") ;
				}
			}
			element.removeAttr(concatenatedAttr.trim(" "));
		},
		_setPropsDefaults: function () {
			var element = this.element[ 0 ];

			element.disabled = false;
			element.readOnly = false;
			element.checked = false;
			element.value = null;
		},
		_recoverInitialAttributes: function () {
			var i;
			if (this._initialAttributes) {
				for (i = 0; i < this._initialAttributes.length; i++) {
					if (this._initialAttributes[ i ].name !== "id") {
						this.element.attr(this._initialAttributes[ i ].name,
							this._initialAttributes[ i ].attrValue);

						// I.G. 11/4/2016 Fix for #487 [igBaseEditor] input value property is not restored when destroy method is called
						// Restore the initial value property as it was before the widget initialization, so it is aggain displayed in the input
						if (this._initialAttributes[ i ].name === "value" &&
							(this.element.is("input"))) {
							$(this.element).val(this._initialAttributes[ i ].attrValue);
						}

						// 3/2/2016 Bug #213138: Don't need to recover DOM information, only attributes.
						// if (this._initialAttributes[ i ].propValue !== undefined) {
						//	this.element.prop(this._initialAttributes[ i ].name,
						//		this._initialAttributes[ i ].propValue);
						//}
					}
				}
				delete this._initialAttributes;
			}
		},
		_recoverInitialDOMContent: function () {
			if (this._initialDOMContent) {
				this._initialDOMContent.appendTo(this.element);
				delete this._initialDOMContent;
			}
		},
		_clearStyling: function () {
			this._editorContainer
				.removeClass(this.css.container)
				.removeClass(this.css.hover)
				.removeClass(this.css.active);

			this._editorInput.removeClass(this.css.editor);
		},
		_deleteInternalProperties: function () {
			delete this._editorInput;
			delete this._editorContainer;
				delete this._valueInput;
			if (this._timeouts) {
				delete this._timeouts;
			}
		},
		_clearTimeouts: function() {
			var i, timeouts = this._timeouts;
			if (timeouts && timeouts instanceof Array) {
				for (i = 0; i < timeouts.length; i++) {
					clearTimeout(timeouts[ i ]);
				}
				this._timeouts = [];
			}
		},
		_disableEditor: function (applyDisabledClass) {

			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (applyDisabledClass) {
				this._editorContainer.addClass(this.css.disabled);
			}
			this._detachEvents();
		},
		_setEditableMode: function () {

			//Default value we don't do anything unless we implement setOption related to that.
			this._editorInput.prop("readonly", false);
			this._valueInput.prop("readonly", false);
			this._editorInput.prop("disabled", false);
			this._valueInput.prop("disabled", false);
			this._editorContainer.removeClass(this.css.disabled);
			this._attachEvents();
		},
		_setDisabled: function (activate) {
			if (activate) {
				this._editorInput.prop("disabled", true);
				this._valueInput.prop("disabled", true);
				this._disableEditor(true);
			} else {
				this._editorInput.prop("disabled", false);
				this._valueInput.prop("disabled", false);
				if (!this.options.readOnly) {
					this._setEditableMode();
				}
			}
		},
		_setReadOnly: function (activate) {
			if (activate) {
				this._editorInput.prop("readonly", true);
				this._valueInput.prop("readonly", true);
				this._disableEditor();
			} else {
				this._editorInput.prop("readonly", false);
				this._valueInput.prop("readonly", false);
				if (!this.options.disabled) {
					this._setEditableMode();

				}
				this._editorInput.off(".readonly");
			}
		},
		_setWidth: function (width) {
			if (width) {
				this._editorContainer.css("width", this.options.width);
			}
		},
		_setHeight: function (height) {
			if (height) {
				this._editorContainer.css("height", this.options.height);
			}
		},
		_setTabIndex: function (index) {
			this._editorInput.attr("tabIndex", index);
		},
		_setFocusDelay: function (delay) {
			var self = this;
			if (delay) {
				this._timeouts.push(setTimeout(function () { self.field().focus(); }, delay));
			} else {
				this.field().focus();
			}
		},
		_setFocus: function (event) {
			// D.P. 22nd Aug 2016 #226 Can't right-click paste in Edge, double focus event on menu closing
			if (this._focused) {
				return;
			}

			//getValue and set it to the input
			this._focused = true;
			this._enterEditMode();
			if (event) {
				this._triggerFocus(event);
			}
		},
		_setBlur: function (event) { //Base Editor
			var newValue;
			if (this._cancelBlurOnInput) {
				this._editorInput.focus();
				delete this._cancelBlurOnInput;
			} else {
				this._triggerBlur(event);
				newValue = $(event.target).val();
				this._currentInputTextValue = this._editorInput.val();
				this._processValueChanging(newValue);
				this._processTextChanged();
				this._exitEditMode();

				//In case our dropdown is opened we need to close it.
				if (this._dropDownList && this._dropDownList.is(":visible") && this._triggerDropDownClosing()) {
					this._hideDropDownList();
				}
				this._focused = false;
				this._clearTimeouts();
				if (this._validator) { // TODO VERIFY
					this._validator._validateInternal(this.element, event, true);
				}
				if (this._inComposition === true) {
					delete this._inComposition;
				}
			}
		},
		/* igBaseEditor public methods */
		inputName: function (newValue) {
			/* Gets/Sets name attribute applied to the editor element.
				```
				$(".selector").%%WidgetName%%("inputName", "checkbox");
				```
				paramType="string" optional="true" The new input name.
				returnType="string" Current input name. */
			if (newValue) {
				this.options.inputName = newValue;
				this._valueInput.attr("name", newValue);
			} else {
				return this.options.inputName;
			}
		},
		value: function (newValue) {
			var listIndex;
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (this._validateValue(newValue)) {
					if (this.options.toUpper) {
						if (newValue) { newValue = newValue.toLocaleUpperCase(); }
					} else if (this.options.toLower) {
						if (newValue) { newValue = newValue.toLocaleLowerCase(); }
					}
					if (this._dropDownList && this.options.isLimitedToListValues &&
						(listIndex = this._valueIndexInList(newValue)) !== -1 ) {
						// D.P. 6th Feb 2017 #786 Double check, final value should match list item casing
						newValue = this.options.listItems[ listIndex ];
					}
					this._updateValue(newValue);
					this._editorInput.val(this._getDisplayValue());
				} else {
					this._clearValue();
					if (this._focused !== true) {
						this._exitEditMode();
					}
				}
			} else {
				return this.options.value;
			}

			// N.A. January 3th, 2017 #665: Update button state, when value is changed using API method.
			this._checkClearButtonState();
		},
		field: function () {
			/* Gets the input element of the editor.
			```
			$(".selector").%%WidgetName%%("field");
			```
			returnType="$" The visual editor element. */
			return this._editorInput;
		},
		editorContainer: function () {
			/* Gets a reference to the jQuery element that wraps the editor.
			```
			$(".selector").%%WidgetName%%("editorContainer");
			```
			returnType="$" The container editor element. */
			return this._editorContainer;
		},
		hasFocus: function () {
			/* Gets whether the editor has focus.
			```
				$(".selector").%%WidgetName%%("hasFocus");
			```
				returnType="bool" Returns if the editor is focused or not. */
			return this._focused;
		},
		setFocus: function (delay) {
			/* Sets focus to the editor after the specified delay.
				```
				$(".selector").%%WidgetName%%("setFocus", 200);
				```
				paramType="number" optional="true" The delay before focusing the editor. */
			this._setFocusDelay(delay);
		},
		hide: function () {
			/* Hides the editor.
			```
			$(".selector").%%WidgetName%%("hide");
			```
			*/
			this._editorContainer.hide();
		},
		show: function () {
			/* Shows the editor.
			```
			$(".selector").%%WidgetName%%(("show");
			```
			*/
			this._editorContainer.show();
		},
		validator: function () {
			/* Gets a reference to [igValidator](ui.igvalidator) used by the editor.
				```
					var validator = $(".selector").%%WidgetName%%("validator");
				```
				returnType="object" Returns reference to [igValidator](ui.igvalidator) or null. */
			return this._validator;
		},
		isValid: function () {
			/* Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
				```
				var isValid = $(".selector").%%WidgetName%%("isValid");
				```
				returnType="bool" Whether editor value is valid or not. */
			this._skipMessages = true;
			var valid = this._validateValue(this._editMode ? this.field().val() : this.value());
			this._skipMessages = false;
			return valid;
		},
		validate: function () {
			/* Triggers validation for the editor. If validatorOptions are set will also call validate on the [igValidator](ui.igvalidator).
				```
				var valid = $(".selector").%%WidgetName%%("validate");
				```
				returnType="bool" Whether editor value is valid or not. */
			if (this.options.validatorOptions) {
				return this.validator().validate();
			} else {
				return this._validateValue(this.value());
			}
		},
		destroy: function () {
			/* Destroys the widget
				```
					$(".selector").%%WidgetName%%("destroy");
				```
			*/
			this._destroyValidator();
			this._detachEvents();
			this._clearTimeouts();
			this._clearStyling();
			this._restoreDOMStructure();
			this._deleteInternalProperties();
			delete this.options;
			$.Widget.prototype.destroy.apply(this, arguments);
			return this;
		}
	});
	$.extend($.ui.igBaseEditor, { version: "<build_number>" });
	$.widget("ui.igTextEditor", $.ui.igBaseEditor, {
		options: {

			/* type="dropdown|clear|spin" Gets visibility of the spin, clear and drop-down button. That option can be set only on initialization. Combinations like 'dropdown,spin' or 'spin,clear' are supported too.
				Note! This option can not be set runtime.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						buttonType : "dropdown"
					});

					//Get
					var button = $(".selector").%%WidgetName%%("option", "buttonType");

					//Initialize multiple buttons
					$(".selector").%%WidgetName%%({
						buttonType : "dropdown,clear"
					});
				```
				dropdown type="string" A button to open/close the list is located on the right side of the editor.
				clear type="string" A button to clear the value is located on the right side of the editor.
				spin type="string" Spin buttons are located on the right side of the editor.
			*/
			buttonType: "none",
			/* type="array" Gets/Sets list of items which are used as a source for the drop-down list.
				Items in the list can be of type string.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					listItems : [
						"item 1",
						"item 2",
						"item 3"
					]
				});

				//Get
				var items = $(".selector").%%WidgetName%%("option", "listItems");

				//Set
				$(".selector").%%WidgetName%%("option", "listItems", ["item 1", "item 2", "item 3"]);
				```
			 */
			listItems: null,
			/* type="number" Gets/Sets custom width of the drop-down list in pixels. If the value is equal to 0 or negative, then the width of editor is set as a drop-down width.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					listWidth : 200
				});

				//Get
				var width = $(".selector").%%WidgetName%%("option", "listWidth");

				//Set
				$(".selector").%%WidgetName%%("option", "listWidth", 200);
			```
			*/
			listWidth: 0,
			/* type="number" Gets/Sets the hover/unhover animation duration of a drop-down list item.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					listItemHoverDuration : 100
				});

				//Get
				var hoverDuration = $(".selector").%%WidgetName%%("option", "listItemHoverDuration");

				//Set
				$(".selector").%%WidgetName%%("option", "listItemHoverDuration", 100);
			```
			*/
			listItemHoverDuration: 0,
			/* type="bool" Gets wheather the drop-down list element is attached to the body of the document, or to the editor container element.
				If the option is set to false the editor will attach the drop-down list element to the editor container
				If the option is set to true the editor will attach its drop-down list to as a child of the body.
				Note! This option can not be set runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownAttachedToBody : true
				});

				//Get
				var attachedToBody = $(".selector").%%WidgetName%%("option", "dropDownAttachedToBody");
				```
			*/
			dropDownAttachedToBody: false,

			/* type="number" Gets/Sets show/hide drop-down list animation duration in milliseconds.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
				  dropDownAnimationDuration: 500
				});
				//Get
				var animationShowDuration= $(".selector").%%WidgetName%%("option", "dropDownAnimationDuration");
				//Set
				$(".selector").%%WidgetName%%("option", "dropDownAnimationDuration", 500);
			```
			*/
			dropDownAnimationDuration: 300,
			/* type="number" Gets the number of the items to be shown at once when the drop-down list get opened.
				Notes:
				This option is overwritten if the number of list items is less than the set value. In that case the drop-down list displays all the items.
				This option can not be set runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					visibleItemsCount : 5
				});

				//Get
				var visibleItemsCount = $(".selector").%%WidgetName%%("option", "visibleItemsCount");
				```
			*/
			visibleItemsCount: 5,
			/* type="string" Gets/Sets the ability of the editor to allow entering only specific characters in the input-field from the keyboard and on paste.
				Notes:
				If both "excludeKeys" and "includeKeys" options are used, then "excludeKeys" has priority and includeKeys options is not respected.
				The option is case sensitive! If the option is set runtime it's not applied on the current value.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					 includeKeys: "AaBC"
				});

				//Get
				var includedKeys= $(".selector").%%WidgetName%%("option", "includeKeys");

				//Set
				$(".selector").%%WidgetName%%("option", "includeKeys", "ABC");
				```
				*/
			includeKeys: null,
			/* type="string" Gets/Sets the ability of the editor to prevent entering specific characters from the keyboard or on paste.
				Notes:
				If both "excludeKeys" and "includeKeys" options are used, then "excludeKeys" has priority and includeKeys options is not respected.
				The option is case sensitive! If the option is set runtime it's not applied on the current value.
					```
					//Initialize
					$(".selector").%%WidgetName%%({
						   excludeKeys: "AaBC"
					});

					//Get
					var excludedKeys= $(".selector").%%WidgetName%%("option", "excludeKeys");

					//Set
					$(".selector").%%WidgetName%%("option", "excludeKeys", "ABC");
					```
				*/
			excludeKeys: null,
			/* type="left|right|center" Gets/Sets the horizontal alignment of the text in the editor.
					left type="string" The text into the input gets aligned to the left.
					right type="string" The text into the input gets aligned to the right.
					center type="string" The text into the input gets aligned to the center.
					```
					//Initialize
					$(".selector").%%WidgetName%%({
						textAlign : "center"
					});

					//Get
					var align = $(".selector").%%WidgetName%%("option", "textAlign");

					//Set
					$(".selector").%%WidgetName%%("option", "textAlign", "center");
					```
				*/
			textAlign: "left",
			/* type="string" Gets/Sets the text which appears in the editor when it has no focus and the "value" is null or empty string.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					placeHolder : "Enter Value"
				});

				//Get
				var placeHolder = $(".selector").%%WidgetName%%("option", "placeHolder");

				//Set
				$(".selector").%%WidgetName%%("option", "placeHolder", "Enter Value");
			```
			*/
			placeHolder: null,
				/* type="selectAll|atStart|atEnd|browserDefault" Gets/Sets the action when the editor gets focused. The default value is selectAll.
					```
					//Initialize
					$(".selector").%%WidgetName%%({
						selectionOnFocus: "atStart"
					});

					//Get
					var selectionOnFocus= $(".selector").%%WidgetName%%("option", "selectionOnFocus");

					//Set
					$(".selector").%%WidgetName%%("option", "selectionOnFocus", "selectAll");
					```
					selectAll type="string" Setting this option will select all the text into the editor when the edit mode gets enetered.
					atStart type="string" Setting this option will move the cursor at the begining the text into the editor when the edit mode gets enetered.
					atEnd type="string" Setting this option will move the cursor at the end the text into the editor when the edit mode gets enetered.
					browserDefault type="string" Setting this option won't do any extra logic, but proceed with the browser default behavior.
				*/
			selectionOnFocus: "selectAll",
			/* type="text|password|multiline" Gets the text mode of the editor such as: single-line text editor, password editor or multiline editor. That option has effect only on initialization. If based element (selector) is TEXTAREA, then it is used as input-field.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					textMode : "password"
				});

				//Get
				var mode = $(".selector").%%WidgetName%%("option", "textMode");

				```
				text type="string" Single line text editor based on INPUT element is created.
				password type="string" Editor based on INPUT element with type password is created.
				multiline type="string" Multiline editor based on TEXTAREA element is created.
			*/
			textMode: "text",
			/* type="bool" Gets/Sets the ability of the editor to automatically move the dropdown list selection item from one end to the opposite side. When the last item is reached and spin down is performed, the first item gets selected and vice versa. This option has no effect there is no drop-down list.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					spinWrapAround : true
				});

				//Get
				var spinAround = $(".selector").%%WidgetName%%("option", "spinWrapAround");

				//Set
				$(".selector").%%WidgetName%%("option", "spinWrapAround", true);
			```
			*/
			spinWrapAround: false,
			/* type="bool" Gets/Sets if the editor should only allow values from the list of items. Matching is case-insensitive.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					isLimitedToListValues : true
				});

				//Get
				var limited = $(".selector").%%WidgetName%%("option", "isLimitedToListValues");

				//Set
				$(".selector").%%WidgetName%%("option", "isLimitedToListValues", false);
			```*/
			isLimitedToListValues: false,
			/* type="bool" Gets/Sets if the editor should revert it's value to the previously valid value in case the value on blur, or enter key is not valid. If the opiton is set to false, editor calls clear functionality.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					revertIfNotValid : false
				});

				//Get
				var revertIfNotValid = $(".selector").%%WidgetName%%("option", "revertIfNotValid");

				//Set
				$(".selector").%%WidgetName%%("option", "revertIfNotValid", false);
			```
			*/
			revertIfNotValid: true,
			/* type="bool" Gets/Sets if the editor should prevent form submition when enter key is pressed.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
						preventSubmitOnEnter: true
				});

				//Get
				var preventSubmitOnEnter = $(".selector").%%WidgetName%%("option", "preventSubmitOnEnter");

				//Set
				$(".selector").%%WidgetName%%("option", "preventSubmitOnEnter", true);
			```
			*/
			preventSubmitOnEnter: false,
			/* type="auto|bottom|top" Gets/Sets the drop-down list opening orientation when the list gets open. If the option is set to auto the editor has priority to open the drop-down list bottom. If the space is not enough it tries to open the list top. If the space is not enough in both directions then the list gets opened at the bottom of the editor.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownOrientation : "top"
				});

				//Get
				var orientation = $(".selector").%%WidgetName%%("option", "dropDownOrientation");

				//Set
				$(".selector").%%WidgetName%%("option", "dropDownOrientation", "bottom");

				```
				auto type="string" If the option is set to auto the editor has priority to open the drop-down list bottom. If the space is not enough it tries to open the list top. If the space is not enough in both directions then the list gets opened at the bottom of the editor.
				bottom type="string" The drop-down list is opened at the bottom of the editor.
				top type="string" The drop-down list is opened at the top of the editor.
			*/
			dropDownOrientation: "auto",
			/* type="number" Gets/Sets the maximum length of a text which can be entered by the user.
				Negative values or 0 disables that behavior. If set at runtime the editor doesn't apply the option to the cuurent value.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					maxLength : 25
				});

				//Get
				var textLength = $(".selector").%%WidgetName%%("option", "maxLength");

				//Set
				$(".selector").%%WidgetName%%("option", "maxLength", 25);

				```
			*/
			maxLength: null,
			/* type="bool" Gets the ability to limit the editor to be used only as a dropdown list. When set to true the editor input is not editable.
				Note! In case there are no list items - the editor will reamin readonly
				Note! This option can not be set runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownOnReadOnly : true
				});

				//Get
				var readOnly = $(".selector").%%WidgetName%%("option", "dropDownOnReadOnly");
				```
			*/
			dropDownOnReadOnly: false,
			/* type="bool" Gets/Sets the ability to convert the input characters to upper case (true) or keeps the characters as they are (false). The option has effect only while keyboard entries and paste.
				Note! When the option is set at runtime the editor is not changing the current value.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					toUpper : true
				});

				//Get
				var toUpper = $(".selector").%%WidgetName%%("option", "toUpper");

				//Set
				$(".selector").%%WidgetName%%("option", "toUpper", true);
				```
			*/
			toUpper: false,
			/* type="bool" Gets/Sets the ability to convert the input characters to lower case (true) or keeps the characters as they are (false). The option has effect only while keyboard entries and paste.
				Note! When the option is set at runtime the editor is not changing the current value.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					toLower : true
				});

				//Get
				var toLower = $(".selector").%%WidgetName%%("option", "toLower");

				//Set
				$(".selector").%%WidgetName%%("option", "toLower", true);
				```
			*/
			toLower: false,
			/* type="object" Gets/Sets the strings used for the localization of the component. This includes button titles, error messages etc. Value of the object should contain pairs or key:value members. Note: any sub-option of locale can appear within the main option of igEditor. In this case those values within main options will have highest priority and override corresponding value in locale.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					locale: {
							spinUpperTitle: 'SpinUp'
					}
				});

				//Get
				var locale = $(".selector").%%WidgetName%%("option", "locale");

				//Set
				$(".selector").%%WidgetName%%("option", "locale", {spinUpperTitle: 'SpinUp'});
			```
			*/
			locale: null,
			/* type="bool" Disables/Enables default notifications for basic validation scenarios built in the editors such as required list selection, value wrapping around or spin limits.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					suppressNotifications : true
				});

				//Get
				var suppressNotifications = $(".selector").%%WidgetName%%("option", "suppressNotifications");

				//Set
				$(".selector").%%WidgetName%%("option", "suppressNotifications", true);
			```
			*/
			suppressNotifications: false
		},
		css: {
			/* igWidget element classes go here */
			/* Class applied to the div which wraps the editable input (in case of multiline textarea). Default value is "ui-igeditor-input-container ui-corner-all" */
			editorInputContainer: "ui-igeditor-input-container ui-corner-all",
			/* Class applied to the div holding the spin up button image. Default value is "ui-igedit-spinupperimage ui-icon-carat-1-n ui-icon ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage'*/
			spinButtonUpImage: "ui-igedit-spinupperimage ui-icon-carat-1-n ui-icon " +
				"ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage",
			/* Class applied to the div holding the spin down button image. Default value is 'ui-igedit-spinlowerimage ui-icon-carat-1-s ui-icon ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage'*/
			spinButtonDownImage: "ui-igedit-spinlowerimage ui-icon-carat-1-s ui-icon " +
				"ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage",
			/* Class applied to the div holding the drop down button image. Default value is 'ui-icon ui-icon-carat-1-s ui-igedit-buttonimage'*/
			dropDownImage: "ui-icon ui-icon-triangle-1-s ui-igedit-buttonimage",
			/* Class applied to the div holding the drop down button. Default value is 'ui-igedit-dropdown-button'*/
			dropDownButton: "ui-igedit-dropdown-button ",
			/* Class applied to the div holding the clear button image. Default value is 'ui-igedit-buttonimage ui-icon-circle-close ui-icon ui-igedit-buttondefault'*/
			clearButtonImage: "ui-igedit-buttonimage ui-icon-circle-close " +
				"ui-icon ui-igedit-buttondefault",
			/* Class applied to the div holding the clear button. Default value is 'ui-igedit-cleararea ui-state-default'*/
			clearButton: "ui-igedit-cleararea ui-state-default",
			/* Class applied commonly to all the button containers, Default value is 'ui-igedit-button-common ui-unselectable ui-igedit-button-ltr ui-state-default'*/
			buttonCommon: "ui-igedit-button-common ui-unselectable " +
				"ui-igedit-button-ltr ui-state-default",
			/* Class applied to the container holding the listitems. Default value is 'ui-igedit-dropdown'*/
			dropDownList: "ui-igedit-dropdown ui-widget",
			/* Class applied to the SPAN element which represents item in dropdown list. Default value is 'ui-igedit-listitem ui-state-default' */
			listItem: "ui-igedit-listitem ui-state-default",
			/* Class applied to the Class applied to the SPAN element which represents item in dropdown list with mouse-over state. Default value is 'ui-igedit-listitemhover ui-state-hover' */
			listItemHover: "ui-igedit-listitemhover ui-state-hover",
			/* Class applied to the Class applied to the SPAN element which represents active item in dropdown list. Default value is 'ui-igedit-listitemselected ui-state-highlight' */
			listItemActive: "ui-state-active ui-igedit-listitemactive",
			/* Class applied to the Class applied to the SPAN element which represents selected item in dropdown list. Default value is 'ui-igedit-listitemselected ui-state-highlight' */
			listItemSelected: "ui-igedit-listitemselected ui-state-highlight",
			/* Classes applied to the SPAN element of button in mouse-over state. Default value is 'ui-igedit-buttonhover ui-state-hover' */
			buttonHover: "ui-igedit-buttonhover ui-state-hover",
			/* Classes applied to the SPAN element of button in pressed state. Default value is 'ui-igedit-buttonpressed ui-state-highlight' */
			buttonPressed: "ui-igedit-buttonpressed ui-state-highlight",
			/* Class applied to the visible input in case of plaseHolder option set. This class is related only to the placeHolder styling. Default value is 'ui-igedit-placeholder'*/
			placeHolder: "ui-igedit-placeholder",
			/* Class applied to the visible textarea element in case of textMode set to 'multiline'*/
			textArea: "ui-igedit-textarea"
		},
		events: {
			/* cancel="true" Event which is raised when the drop down is opening.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistopening", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListOpening: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListOpening: "dropDownListOpening",
			/* Event which is raised after the drop down is opened.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistopened", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListOpened: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListOpened: "dropDownListOpened",
			/* cancel="true" Event which is raised when the drop down is closing.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistclosing", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListClosing: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListClosing: "dropDownListClosing",
			/* Event which is raised after the drop down is closed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistclosed", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListClosed: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListClosed: "dropDownListClosed",
			/* cancel="true" Event which is raised when an item in the drop down list is being selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is about to be selected.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownitemselecting", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownItemSelecting: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownItemSelecting: "dropDownItemSelecting",
			/* Event which is raised after an item in the drop down list is selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is selected.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownitemselected", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownItemSelected: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownItemSelected: "dropDownItemSelected",
			/* Event which is raised after text in the editor was changed. It can be raised when keyUp event occurs,
				when the clear button is clicked or when an item from a list is selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.text to obtain new text
				Use ui.oldText to obtain the old text.
				```
				$(".selector").on("%%WidgetNameLowered%%textchanged", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					textChanged: function (evt, ui) {
					...
					}
				});
				```
			*/
			textChanged: "textChanged"
		},
		_create: function () { //igTextEditor
			$.ui.igBaseEditor.prototype._create.call(this);
		},
		_setOption: function (option, value) { // igTextEditor
			/* igTextEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "value":
					this.value(value);

					//if (this._validateValue(value)) {
					//	this._updateValue(value);
					//	this._exitEditMode();
					//} else {
					//	this._clearValue();
					//	this._exitEditMode();
					//}
					break;
				case "placeHolder":
					this._applyPlaceHolder();
					break;
				case "suppressNotifications":
					if (value) {
						this._clearEditorNotifier();
					}
					break;
				case "listItems":

					//M.S. November, 7th 2016 - Issue 481 - Cannot set listItems on run time when it is not set initially
					if (prevValue !== null) {
						this._deleteList();
					}
					this._createList();
					this._clearValue();
					break;
				case "listWidth":
					this._setDropDownListWidth();
					break;
				case "spinWrapAround":
					if (value) {
						this._enableSpinButton(this._spinDownButton, "spinDown");
						this._enableSpinButton(this._spinUpButton, "spinUp");
					} else {
						this._setSpinButtonsState(this.value());
					}
					break;
				case "excludeKeys":
					if (value === "") {
						this._excludeKeysArray = [];
					} else {
						this._excludeKeysArray = value.toString().split("");
					}
					break;
				case "includeKeys":
					if (value === "") {
						this._includeKeysArray = [];
					} else {
						this._includeKeysArray = value.toString().split("");
					}
					break;
				case "textAlign":
					this._editorInput.css("text-align", value);
					break;
				case "dropDownOnReadOnly":
				case "visibleItemsCount":
				case "buttonType":
				case "dropDownAttachedToBody":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.setOptionError + option);
				default:

					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
					break;
			}
		},

		//This method validates and updates the value input the hidden input
		_updateValue: function (value) { //TextEditor //WE should detect dataMode, so we can use the options.
			if (value !== null && value !== undefined) {
				value = value.toString();
			}
			this._super(value);
			if (this._dropDownList) {
				this._updateDropdownSelection(value);
			}
		},
		_applyOptions: function () { //TextEditor
			var initialValue;
			this._editMode = false;
			this._focused = false;
			this._super();
			if (this.options.includeKeys) {
				this._includeKeysArray = this.options.includeKeys.toString().split("");
			}
			if (this.options.excludeKeys) {
				this._excludeKeysArray = this.options.excludeKeys.toString().split("");
			}

			initialValue = this.options.value;
			if (this.options.maxLength) {
				if (initialValue && initialValue.toString().length > this.options.maxLength) {
					initialValue = initialValue.toString().substring(0, this.options.maxLength);

					//Raise warning
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
							this.options.maxLength));
				}
			}
			if (this._validateValue(initialValue)) {
				this._setInitialValue(initialValue);
				this._editorInput.val(this._getDisplayValue());
			} else if (initialValue === null && !this.options.allowNullValue) {
				this._setInitialValue("");
			}

			//M.S. 4/19/2017. Issue 779 and issue 892 Initially when allowNullValue is true and the value is not set, the value should be equal to nullValue
			if (!this.options.value && this.options.allowNullValue &&
				this.options.nullValue !== null && this._validateValue(this.options.nullValue)) {
				this._setOption("value", this.options.nullValue);
			}

			this._applyPlaceHolder();
		},
		_render: function () {
			//We asume the base renderer has already been invoked
			var editorElementWrapper, editorElement, tempTimeStamp;
			this._triggerRendering();
			if (this.element.attr("id") !== undefined) {
				this.id = this.element.attr("id");
			} else {
				tempTimeStamp = new Date();
				this.id = tempTimeStamp.getTime();
			}
			if (this.element.is("div") || this.element.is("span")) {
				if (this.options.textMode === "multiline") {
					editorElement = $("<textarea rows='4' cols='50'></textarea>");
					editorElement.addClass(this.css.textArea);
				} else if (this.options.textMode === "password") {
					editorElement = $("<input type='password' autocomplete='off'/>");
				} else {
					editorElement = $("<input type='text' />");
				}

				if (this.element.is("span")) {
					editorElement = this.element.html(editorElement);
				}
				editorElementWrapper = editorElement.wrap($("<div></div>")).parent();
				editorElementWrapper.addClass(this.css.editorInputContainer);
				this._editorInputWrapper = editorElementWrapper;
				if (this.element.is("span")) {
					this._editorInput = editorElement.children(0);
					this._editorContainer = editorElementWrapper.wrap($("<div></div>")).parent();
				} else {
					this._editorInput = editorElement;
					this._editorContainer = this.element;
				}
				this._editorContainer.prepend(editorElementWrapper);
			} else if (this.element.is("input")) {
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._editorInput = this.element;
				editorElementWrapper = this._editorInput.wrap($("<div></div>")).parent();
				editorElementWrapper.addClass(this.css.editorInputContainer);
				this._editorInputWrapper = editorElementWrapper;
			} else if (this.element.is("textarea")) {
				if (this.options.textMode !== "multiline") {
					throw new Error($.ig.Editor.locale.multilineErrMsg);
				} else {
					this._editorContainer = this.element.wrap($("<div></div>")).parent();
					this._editorInput = this.element;
					this._editorInput.addClass(this.css.textArea);
					editorElementWrapper = this._editorInput.wrap($("<div></div>")).parent();
					editorElementWrapper.addClass(this.css.editorInputContainer);
					this._editorInputWrapper = editorElementWrapper;
				}
			} else {

				//TODO Throw target element not supported.
				throw new Error($.ig.Editor.locale.targetNotSupported);
			}
			this._editorContainer.addClass(this.css.container);
			this._editorInput.addClass(this.css.editor);
			this._editorInput.css("height", "100%");

			if ((this.element.is("input") || this.element.is("textarea")) &&
				this._editorInput.attr("id") !== undefined) {
				this._editorInputId = this._editorInput.attr("id");
			} else {
				this._editorInput.attr("id", this.id + "EditingInput");
				this._editorInputId = this.id + "EditingInput";
			}

			//Set input type to text
			if (!$.ig.util.isIE8) {
				if (this.options.textMode !== "multiline") {
					if (this.options.textMode === "password") {
						this._editorInput.attr("type", "password");
						this._editorInput.attr("autocomplete", "off");
					} else {
						this._editorInput.attr("type", "text");
					}
				}
			}

			if (this.options.buttonType && this.options.buttonType !== "none" &&
				this.options.textMode !== "multiline" && this.options.textMode !== "password") {
				this._renderButtons();
			}
			if (this.options.width) {
				this._editorContainer.css("width", this.options.width);
			}
			if (this.options.height) {
				this._editorContainer.css("height", this.options.height);
			}

			//TODO check for textarea
			if (this.options.textMode === "multiline") {
				this._valueInput = $("<textarea style='display:none'></textarea>");
			} else {
				this._valueInput = $("<input type='hidden'></input>");
			}
			this._editorInput.after(this._valueInput);
			this._editorInput.css("text-align", this.options.textAlign);
			this._createList();

			this._attachEvents();
			this._applyOptions();
			this._applyAria();
			this._checkClearButtonState();

			this._triggerRendered();
		},
		_applyAria: function () {
			this._super();
			this._applyInputAriaLabel();
		},
		_applyInputAriaLabel: function () {
			var ariaLabelText;
			switch (this.widgetName) {
				case "igTextEditor": {
					ariaLabelText = this._getLocaleOption("ariaTextEditorFieldLabel");
				}
					break;
				case "igNumericEditor": {
					ariaLabelText = this._getLocaleOption("ariaNumericEditorFieldLabel");
				}
					break;
				case "igCurrencyEditor": {
					ariaLabelText = this._getLocaleOption("ariaCurrencyEditorFieldLabel");
				}
					break;
				case "igPercentEditor": {
					ariaLabelText = this._getLocaleOption("ariaPercentEditorFieldLabel");
				}
					break;
				case "igMaskEditor": {
					ariaLabelText = this._getLocaleOption("ariaMaskEditorFieldLabel");
				}
					break;
				case "igDateEditor": {
					ariaLabelText = this._getLocaleOption("ariaDateEditorFieldLabel");
				}
					break;
				case "igDatePicker": {
					ariaLabelText = this._getLocaleOption("ariaDatePickerFieldLabel");
				}
					break;
				default: {
					ariaLabelText = this._getLocaleOption("ariaTextEditorFieldLabel");
				}
			}
			this._editorInput.attr("aria-label", ariaLabelText);
		},
		_sendNotification: function (state, message) {
			if (this.options.suppressNotifications || this._skipMessages /* flag on isValid() call */) {
				this._currentMessage = message;
				return;
			}
			if (!this._editorContainer.data("igNotifier")) {
				this._editorContainer.igNotifier();
			}
			this._editorContainer.igNotifier("notify", state, message);
		},
		_applyPlaceHolder: function() {
			if (this.options.placeHolder && this.options.placeHolder !== "") {
				this._editorInput.attr("placeholder", this.options.placeHolder);

				//If placeholder is not supported
				this._editorInput.addClass(this.css.placeHolder);
				if (this._placeHolderNotSupported()) {
					throw new Error($.ig.Editor.locale.placeHolderNotSupported);
				}
			} else if (this._editorInput.attr("placeholder")) {
				this._editorInput.removeAttr("placeholder");
			}
		},
		_placeHolderNotSupported: function () {
			return document.createElement("input").placeholder === undefined;
		},

		//We use this extra function so we can branch the logic into mask editor.
		_setInitialValue: function (value) { //igTextEditor
			this._updateValue(value);
		},
		_disableEditor: function (applyDisabledClass) { //TextEditor
			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._editorInput.addClass(this.css.disabled);
				}
			} else {
				if (applyDisabledClass) {
					this._editorContainer.addClass(this.css.disabled);
				}
				this._detachEvents();
			}

			if (this._dropDownList && !this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._dropDownList.addClass(this.css.disabled);
				}
				this._detachListEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._dropDownButton);
			}
			if (this._clearButton) {
				this._clearButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinDownButton);
			}
		},

		// N.A. January 4th, 2017 #664 Move spin buttons state logic from numeric to text editor in order to be used by the date editor and date picker.
		_disableSpinButton: function (target) {
			if (target && !target.attr("disabled") && !this.options.spinWrapAround) {
				target.addClass(this.css.disabled);
				target.attr("disabled", "disabled");
				target.prop("disabled", true);
				target.removeClass(this.css.buttonHover);
				if (target._pressed) {
					delete target._pressed;
					target.removeClass(this.css.buttonPressed);
				}
				if (target._spinTimeOut) {
					clearTimeout(target._spinTimeOut);
					delete this._spinUpButton._spinTimeOut;
				}
				if (target._spinInterval) {
					clearInterval(target._spinInterval);
					delete target._spinInterval;
				}
				this._detachButtonsEvents(target);
			}
		},
		_enableSpinButton: function (target, type) {
			if (target && target.attr("disabled")) {
				target.removeClass(this.css.disabled);
				target.removeAttr("disabled");
				target.prop("disabled", false);
				this._attachButtonsEvents(type, target);
			}
		},
		_exceedsMaxValue: function() { //TextEditor
			return this._dropDownList && !this._getSpinItem("up").length;
		},
		_lessThanMinValue: function() { //TextEditor
			return this._dropDownList && !this._getSpinItem("down").length;
		},
		_setSpinButtonsState: function (val) {
			if (typeof val === "string" || val instanceof String) {
				val = val.trim();
			}
			if (val === null) {
				this._enableSpinButton(this._spinDownButton, "spinDown");
				this._enableSpinButton(this._spinUpButton, "spinUp");
				return;
			}
			if (val !== "" && !this.options.spinWrapAround) {
				if (this._exceedsMaxValue(val)) {
					this._disableSpinButton(this._spinUpButton);
					this._enableSpinButton(this._spinDownButton, "spinDown");
				} else if (this._lessThanMinValue(val)) {
					this._disableSpinButton(this._spinDownButton);
					this._enableSpinButton(this._spinUpButton, "spinUp");
				} else {
					this._enableSpinButton(this._spinDownButton, "spinDown");
					this._enableSpinButton(this._spinUpButton, "spinUp");
				}
			}
		},

		// replaces characted at a specific position
		_replaceCharAt: function (stringValue, index, ch) {
			if (stringValue !== undefined) {
				return stringValue.substring(0, index) + ch + stringValue.substring(index + 1);
			}
		},
		_getStringRange: function (stringValue, start, end) {
			if (stringValue !== undefined) {
				return stringValue.substring(start, end);
			}
		},
		_replaceStringRange: function (stringValue, replacementValue, indexStart, indexEnd) {
			var i = 0;
			while (indexStart <= indexEnd) {
				stringValue = this._replaceCharAt(stringValue, indexStart, replacementValue.charAt(i));
				i++;
				indexStart++;
			}
			return stringValue;
		},
		_valueIndexInList: function (val) {
			if (!val && val !== 0) {
				return -1;
			}
			var loweredItems = $.map(this.options.listItems, function (item) {
				return item.toString().toLowerCase();
			});
			return $.inArray(val.toString().toLowerCase(), loweredItems);
		},
		_validateValue: function (val) { //Text Editor
			var result;
			if (val === undefined) {
				result = false;
			} else if (val === null) {
				if (this.options.allowNullValue) {
					result = val === this.options.nullValue ? true : false;
				} else {
					result = false;
				}
			} else if (this.options.isLimitedToListValues && this._dropDownList) {
				if (this._valueIndexInList(val) !== -1) {
					result = true;
				} else {
					this._sendNotification("warning", $.ig.Editor.locale.allowedValuesMsg);
					result = false;
				}
			} else if (this.options.maxLength) {
				 if (val.toString().length <= this.options.maxLength) {
					result = true;
				} else {
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
							this.options.maxLength));
					result = false;
				}
			} else {
				result = true;
			}
			return result;
		},
		_setEditableMode: function () {
			//Default value we don't do anything unless we implement setOption related to that.
			this._super("_setEditableMode");

			if (this._dropDownList && !this.options.dropDownOnReadOnly) {
				this._dropDownList.removeClass(this.css.disabled);
				this._attachListEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("dropdown", this._dropDownButton);
			}
			if (this._clearButton) {
				this._clearButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("clear", this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("spinUp", this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("spinDown", this._spinDownButton);
			}
		},
		_calculateDropDownListOrientation: function () {
			var containerOffset = this._editorContainer.offset(),
				containerTop = containerOffset.top,
				containerHeight = parseFloat(this._editorContainer.css("height")),
				dropDownAndEditorHeight = parseInt(containerTop + containerHeight + this._listInitialHeight),
				widndowHeight = $(window).height(),
				orientation;
			if (this.options.dropDownOrientation === "auto") {
				if (dropDownAndEditorHeight < widndowHeight + $(window).scrollTop()) {
					orientation = "bottom";
				} else if ((containerTop - this._listInitialHeight) > 0) {
					orientation = "top";
				} else {
					orientation = "bottom";
				}
			} else {
				orientation = this.options.dropDownOrientation;
			}
			return orientation;
		},
		_positionDropDownList: function () {
			var containerOffset = this._editorContainer.offset(),
			containerTop = containerOffset.top,
			containerLeft = containerOffset.left,
			containerHeight = parseFloat(this._editorContainer.css("height")),
			orientation = this._calculateDropDownListOrientation();
			if (this.options.dropDownAttachedToBody) {
				this._dropDownList.css("left", containerLeft);
				if (orientation === "bottom") {
					this._dropDownList.css("top", containerTop + containerHeight);
					this._dropDownListOrientation = "down";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-top");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-bottom");
				} else {
					this._dropDownList.css("top", containerTop - this._listInitialHeight);
					this._dropDownListOrientation = "up";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-bottom");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-top");
				}
			} else {
				this._dropDownList.css("left", "");
				if (orientation === "bottom") {
					this._dropDownList.css("top", "");
					this._dropDownListOrientation = "down";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-top");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-bottom");
				} else {
					this._dropDownList.css("top", -this._listInitialHeight);
					this._dropDownListOrientation = "up";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-bottom");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-top");
				}
			}

			// In case we have editor width set into percent, once the window is resized the width of the editor might be changed and we need to set new width for the list
			this._setDropDownListWidth();
		},
		_createList: function () {
			// Remove items that can't be displayed. isArray, filter polyfills in util
			if (Array.isArray(this.options.listItems)) {
				this.options.listItems = this.options.listItems.filter(function (item) {
					return item || item === 0;
				});
			}
			if (this.options.textMode !== "multiline" &&
				this.options.textMode !== "password" &&
				this.options.listItems && this.options.listItems.length > 0) {

				if (this.options.buttonType.toString().indexOf("dropdown") === -1) {
					this._renderDropDownButton();
				}
				this._renderList();
				this._positionDropDownList();
				this._attachListEvents();
			}
		},
		_renderList: function () {
			var i, list = this.options.listItems, itemValue, currentItem, itemHeight, dropdown,
				id = this.id, html;

			html = "<div id='" + id + "_list" + "' tabindex='-1' class='" +
				this.css.dropDownList + "' role='listbox' aria-activedescendant='" +
				this._editorInputId + "'>";
			this._editorInput.attr("aria-owns", this.id + "_list");
			for (i = 0; i < list.length; i++) {
				itemValue = list[ i ] ?
					this._getEditModeValue(list[ i ]) :
					list[ i ];
				currentItem = "<span id='" + id + "_item_" + (i + 1) +
					"' tabindex='-1' role='option' aria-selected='false' aria-posinset='" +
					(i + 1).toString() + "' class='" + this.css.listItem + "' title='" +
					itemValue + "'>" + itemValue +
					"</span>";
				html += currentItem;
			}
			html += "</div>";
			dropdown = $(html);
			if (currentItem) {
				currentItem = $(currentItem);
			}

			if (this.options.dropDownAttachedToBody) {
				$(document.body).append(dropdown);
			} else {
				this._editorContainer.append(dropdown);
			}
			itemHeight = currentItem.css("height");
			itemHeight = parseFloat(itemHeight);
			if (itemHeight === 0) {

				// According to Designers, when height is 0, this is better solution, then setting min-height: 23 in CSS.
				itemHeight = 23;
			}
			if (list.length < this.options.visibleItemsCount) {
				dropdown.css("height", parseFloat(itemHeight * list.length));
				this._listInitialHeight = parseFloat(itemHeight * list.length);

				//TODO - hide scroll
			} else {
				dropdown.css("height", parseFloat(itemHeight * this.options.visibleItemsCount) + 2);
				this._listInitialHeight = parseFloat(itemHeight * this.options.visibleItemsCount) + 2;
			}
			this._dropDownList = dropdown;
			this._setDropDownListWidth();
			dropdown.hide();
			dropdown.visible = false;
		},
		_setDropDownListWidth: function () {
			if (this.options.listWidth && this.options.listWidth > 0) {
				this._dropDownList.css("width", this.options.listWidth);
			} else {
				this._dropDownList.css("width", this._editorContainer.css("width"));
			}
		},
		_attachListEvents: function () {
			var self = this;
			this._dropDownList.on({
				"mouseenter.editorList": function (event) {
					var item = event.target;
					$(item).addClass(self.css.listItemHover, self.options.listItemHoverDuration);
					$(item).attr("data-hovered", true);
				},
				"mouseleave.editorList": function (event) {
					var item = event.target;
					$(item).removeClass(self.css.listItemHover, self.options.listItemHoverDuration);
					$(item).removeAttr("data-hovered");
				},
				"click.editorList": function (event) {
					self._triggerListItemClick(event.target);
				},
				"mousedown.editorList": function (event) {
					event.preventDefault();

					// N.A. 12/8/2015 Bug #210922: In IE8 click is not fired, if the propagation is stopped in mousedown.
					if (!$.ig.util.isIE8) {
						event.stopPropagation();
					}
				}
			}, ".ui-igedit-listitem");

			this._dropDownList.on("mousedown.editorList", function (event) {
				self._listMouseDownHandler(event);
			});

		},
		_listMouseDownHandler: function (event) { //igTextEditor
			if ($.ig.util.isIE || $.ig.util.isEdge) {
				this._cancelBlurOnInput = true;
			} else {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		_deleteList: function () {
			this._detachListEvents();
			this._dropDownList.remove();
			delete this._dropDownList;
		},
		_deleteDropDownButton: function () {
			this._detachButtonsEvents(this._dropDownButton);
			this._dropDownButton.remove();
			delete this._dropDownButton;
		},
		_detachListEvents: function () {
			if (this._dropDownList) {
				this._dropDownList.off("mouseenter.editorList mouseleave.editorList ");
				this._dropDownList.off("click.editorList mousedown.editorList");
			}
		},
		_renderDropDownButton: function () {
			var dropDownButton = $("<div role='button' tabindex='-1' id='" +
				this.id + "_dropDownButton' aria-label='" +
				this._getLocaleOption("ariaDropDownButton") + "'></div>"),
					dropDownIcon = $("<div></div>");
			if (this._dropDownButton) {
				return;
			}
			dropDownButton.addClass(this.css.buttonCommon);
			dropDownButton.attr("title", this._getLocaleOption("buttonTitle"));
			this._editorContainer.prepend(dropDownButton
				.addClass(this.css.dropDownButton)
				.append(dropDownIcon.addClass(this.css.dropDownImage)));
			this._dropDownButton = dropDownButton;
			this._attachButtonsEvents("dropdown", dropDownButton);
		},
		_renderSpinButtons: function () {
			var spinButtonUp = $("<div role='button' tabindex='-1' id='" +
				this.id +
				"_spinUpButton' aria-label='" +
				this._getLocaleOption("ariaSpinUpButton") +
				"'></div>"), spinButtonUpImage = $("<div></div>"),

				spinButtonDown = $("<div role='button' tabindex='-1' id='" +
					this.id + "_spinDownButton' aria-label='" +
					this._getLocaleOption("ariaSpinDownButton") +
					"'></div>"),

				spinButtonDownImage = $("<div></div>");
			if (this._spinUpButton) {
				return;
			}
			spinButtonUp
				.addClass(this.css.buttonCommon)
				.append(spinButtonUpImage.addClass(this.css.spinButtonUpImage));
			spinButtonDown
				.addClass(this.css.buttonCommon)
				.append(spinButtonDownImage.addClass(this.css.spinButtonDownImage));
			spinButtonUp.attr("title", this._getLocaleOption("spinUpperTitle"));
			spinButtonDown.attr("title", this._getLocaleOption("spinLowerTitle"));
			this._editorContainer.prepend(spinButtonDown).prepend(spinButtonUp);
			this._attachButtonsEvents("spinDown", spinButtonDown);
			this._attachButtonsEvents("spinUp", spinButtonUp);
			this._spinUpButton = spinButtonUp;
			this._spinDownButton = spinButtonDown;
		},
		_renderClearButton: function () {
			var clearButton = $("<div role='button' id='" +
				this.id +
				"_clearButton' tabindex='-1' aria-label='" +
				this._getLocaleOption("ariaClearButton") + "'></div>"),

				buttonClearIcon = $("<div></div>");
			if (this._clearButton) {
				return;
			}
			clearButton.addClass(this.css.buttonCommon);
			clearButton.append(buttonClearIcon.addClass(this.css.clearButtonImage));
			clearButton.attr("title", this._getLocaleOption("clearTitle"));
			this._editorContainer.prepend(clearButton.addClass(this.css.clearButton));
			this._clearButton = clearButton;
			this._attachButtonsEvents("clear", clearButton);
		},
		_renderButtons: function () {
			var buttons = this.options.buttonType.toString().split(/[\s,]+/), buttonsCountRendered = 0;

			if ($.inArray("clear", buttons) !== -1) {
				this._renderClearButton();
				buttonsCountRendered++;
			}
			if ($.inArray("spin", buttons) !== -1) {

				//In that case we need to render spin buttons in case of numeric editors and for all others we need to check if there is listItems.
				if (this._numericType || (this.options.listItems &&
					this.options.listItems !== null &&
					this.options.listItems.length > 0)) {
					this._renderSpinButtons();
					buttonsCountRendered += 2;
				} else if (this.options.listItems === null || this.options.listItems.length === 0) { //#208356 S.D. Error for no listitems
					throw new Error($.ig.Editor.locale.noListItemsNoButton);
				}
			}

			if ($.inArray("dropdown", buttons) !== -1) {
				if (this.options.listItems &&
					this.options.listItems !== null &&
					this.options.listItems.length > 0) {
					this._renderDropDownButton();
					buttonsCountRendered++;
				} else if (this.options.listItems === null || this.options.listItems.length === 0) {
					throw new Error($.ig.Editor.locale.noListItemsNoButton);
				}
			}

			if (buttonsCountRendered === 0) {
				throw new Error($.ig.Editor.locale.btnValueNotSupported);
			}
		},
		_attachButtonsEvents: function (type, target) {
			var self = this;
			if (!target) {
				return;
			}
			/* jshint -W083*/
			target.on({
				"mouseenter.button": function () {
					target.addClass(self.css.buttonHover);
				},
				"mouseleave.button": function () {
					target.removeClass(self.css.buttonHover);
					if (target._pressed) {
						delete target._pressed;
						target.removeClass(self.css.buttonPressed);
					}
					if (target._spinTimeOut) {
						clearTimeout(target._spinTimeOut);
						delete target._spinTimeOut;
					}
					if (target._spinInterval) {
						clearInterval(target._spinInterval);
						delete target._spinInterval;
					}

				},
				"mousedown.button": function (event) {
					if (event.button === 0 || (event.button === 1 && $.ig.util.isIE8)) {
						target.addClass(self.css.buttonPressed);
						target._pressed = true;
						event.preventDefault();
						if (type === "spinUp" || type === "spinDown") {
							self._handleSpinEvent(type, target);
						}
					}

					// A.M. 30 October, 2015 Bug #207460 "'active' class is applied to all buttons when you click any of them"
					event.stopPropagation();
				},
				"mouseup.button": function () {
					target.removeClass(self.css.buttonPressed);
					delete target._pressed;
					if (target._spinTimeOut) {
						clearTimeout(target._spinTimeOut);
						delete target._spinTimeOut;
					}
					if (target._spinInterval) {
						clearInterval(target._spinInterval);
						delete target._spinInterval;
					}
				},
				"click.button": function (event) {
					self._triggerButtonClick(event, type);
				}
			});
			/* jshint +W083*/
		},
		_detachButtonsEvents: function (target) {
			if (target) {
				target.off("mouseenter.button mouseleave.button mousedown.button mouseup.button click.button");
			}
		},
		_attachEvents: function () { //TextEditor
			var self = this;
			self._super();
			this._editorInput.on({
				"focus.editor": function (event) {
					self._setFocus(event);
				},
				"dragenter.editor": function () {
					if (!self._focused && !self._editMode) {
						//Controlled edit mode without selection to allow default drop handling
						self._dragging = true;
						self._enterEditMode();
					}
				},
				"dragleave.editor": function (e) {
					if ($.ig.util.isFF && e.relatedTarget === this) {
						// FF spams drag events over child text nodes.. https://bugzilla.mozilla.org/show_bug.cgi?id=812807
						// and also for changing text node from entering edit mode
						return;
					}
					if (self._dragging && self._editMode) {
						self._exitEditMode();
						delete self._dragging;
					}
				},
				"blur.editor": function (event) {
					self._setBlur(event);
				},
				"paste.editor": function (event) {
					self._currentInputTextValue = self._editorInput.val();
					self._pasteHandler(event);
				},
				"drop.editor": function (event) {
					self._focused = true;
					delete self._dragging;
					self._pasteHandler(event, true);
				},
				"keydown.editor": function (event) {

					//T.P. In case of backspace and delete we need to trigger textchanged eved directly
					if ((event.keyCode === 8 || event.keyCode === 46) &&
						self._editorInput.val() !== self._currentInputTextValue) {
						self._processTextChanged();
					}
					self._currentInputTextValue = self._editorInput.val();
					self._triggerKeyDown(event);
				},
				"keyup.editor": function (event) {
					self._triggerKeyUp(event);
					self._processTextChanged();
				},
				"keypress.editor": function (event) {
					self._triggerKeyPress(event);
				},
				"compositionstart.editor": function () {
					var widgetName = self.widgetName, cursorPosition = self._getCursorPosition();
					if (cursorPosition === -1) {
						switch (widgetName){
							case "igMaskEditor":
							case "igDateEditor":
							case "igDatePicker": {
								self._editorInput.val(self._maskWithPrompts);
								self._setCursorPosition(0);
							}
								break;
							default:
						}
					}
					self._compositionStartValue = self._editorInput.val();
					self._copositionStartIndex = self._getCursorPosition();

					// 207318 T.P. 4th Dec 2015, Internal flag needed for specific cases.
					self._inComposition = true;
				},
				"compositionend.editor": function () {
					setTimeout(function () {
						var value, pastedValue, widgetName = self.widgetName,
							cursorPosition = self._getCursorPosition();

						// In that case blur event is triggered before the composition end and the editor has already processed the change.
						if (self._inComposition !== true) {
							return;
						}
						switch (widgetName) {
							case "igMaskEditor":
								{
									pastedValue = value = self._replaceStringRange(self._compositionStartValue,
										self._currentCompositionValue, self._copositionStartIndex,
										self._copositionStartIndex + self._currentCompositionValue.length - 1);
								}
								break;
							case "igDateEditor":
							case "igDatePicker":
								{
									value = self._currentCompositionValue;
									value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping());
									pastedValue = value = self._parseValueByMask(value);
									if (value !== self._maskWithPrompts) {
										value = self._parseDateFromMaskedValue(value);
									}
								}
								break;
							default: {
								pastedValue = value = self._editorInput.val();
							}
						}

						//T.P. 7th April 2016. Bug 217371 - In case of text/mask editor the full width numbers should not be converted to half width,
						//because they are valid characters.
						if (widgetName !== "igTextEditor" && widgetName !== "igMaskEditor") {
							value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping());
							pastedValue = $.ig.util.IMEtoNumberString(pastedValue, $.ig.util.IMEtoENNumbersMapping());
						}
						if (self._validateValue(value)) {
							self._insert(pastedValue, self._compositionStartValue);
							self._setCursorPosition(cursorPosition);
						} else {
							if (self.options.revertIfNotValid) {
								value = self._valueInput.val();
								self._updateValue(value);
							} else {
								self._clearValue();
							}
							if (self._focused) {
								self._enterEditMode();
							}
						}

						//207318 T.P. 4th Dec 2015, Internal flag needed for specific cases.
						delete self._inComposition;
						delete self._copositionStartIndex;
						delete self._currentCompositionValue;
						delete self._compositionStartValue;
					}, 0);
				},
				"compositionupdate.editor": function (evt) {
					setTimeout(function () {
						self._currentCompositionValue =
							$(evt.target)
							.val()
							.toString()
							.substring(self._copositionStartIndex, self._getCursorPosition());
					}, 0);
				}
			});
		},
		_detachEvents: function () {
			this._super();
			this._editorInput.off("focus.editor blur.editor paste.editor");
			this._editorInput.off("dragenter.editor dragleave.editor drop.editor");
			this._editorInput.off("keydown.editor keyup.editor keypress.editor");
			this._editorInput.off("compositionstart.editor compositionend.editor compositionupdate.editor");
		},
		_processValueChanging: function (value) { //TextEditor

			if (value !== this.value()) {
				if (!(this.value() === null && value === "")) {
				this._triggerInternalValueChange(value);
			}
			}
		},
		_triggerInternalValueChange: function (value) { //TextEditor
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);

				//We pass the new value in order to have the original value into the arguments
				this._triggerValueChanged(value);

			}
		},
		_processInternalValueChanging: function (value) { //TextEditor
			var listIndex;
			if (this._validateValue(value)) {
				if (this._dropDownList && this.options.isLimitedToListValues &&
					(listIndex = this._valueIndexInList(value)) !== -1 ) {
					// D.P. 6th Feb 2017 #786 Double check, final value should match list item casing
					value = this.options.listItems[ listIndex ];
				}
				this._updateValue(value);
			} else {

				// If the value is not valid, we clear the editor
				if (this.options.revertIfNotValid) {
					value = this._valueInput.val();
					this._updateValue(value);
				} else {
					this._clearValue();
					value = this._valueInput.val();
				}
			}
		},
		_triggerKeyDown: function (event) { //TextEditor
			//cancellable
			var e = event, noCancel, activeItem, args, currentInputVal, selection;
			args = {
				owner: this,
				element: event.target,
				key: event.keyCode,
				editorInput: this._editorInput
			};
			noCancel = this._trigger(this.events.keydown, event, args);
			if (noCancel) {
				//clear notifier
				this._clearEditorNotifier();
				if (e.keyCode === 13) {
					if (event.altKey && this.options.textMode === "multiline") {
						// This is needed, because of the grid. By default the HTML textarea didn't go to next line on ALT + ENTER, but it should, because in grid updating, this is the used as a keyboard navigation to go the next line.
						// N.A. July 8th, 2016 #90: Carry over the word on new line and move the cursor there.
						this._carryOverNewLine(this._editorInput.val());
					} else {
						currentInputVal = this._editorInput.val();
						if (this._dropDownList && this._dropDownList.is(":visible")) {
							activeItem = this._dropDownList
								.children(".ui-igedit-listitem")
								.filter("[data-active='true']");
							if (activeItem.length > 0) {
								// We use the same handler, because it runs the common logic for item selecting and so on.
								this._triggerListItemClick(activeItem);
							} else {
								this._toggleDropDown();
								this._processValueChanging(currentInputVal);
								this._enterEditMode();
							}
						} else {
							// We repeat the logic in case we don't have dropdown list. On enter the value is updated with the current value into editorInput.
							this._processValueChanging(currentInputVal);

							// A. M. 20/07/2016 #98 'Value of numeric editor is not set to 'minValue' after pressing ENTER'
							this._enterEditMode();
						}
					}
				} else {
					if (this._dropDownList) {
						//Arrow Up
						if (e.keyCode === 38) {
							//Close if opened
							if (e.altKey && this._dropDownList.is(":visible")) {
								this._toggleDropDown();
							} else if (this._dropDownList.is(":visible")) {
								//hover previousItem
								activeItem = this._dropDownList
									.children(".ui-igedit-listitem")
									.filter("[data-active='true']");
								if (activeItem.length > 0 && !activeItem.is(":first-child")) {
									this._hoverPreviousDropDownListItem();
								} else {
									//Close DropDonw
									this._toggleDropDown();
								}

								// prevent default arrow action (cursor move or page scroll on readonly):
								e.preventDefault();
							}
						} else if (e.keyCode === 40 || (e.keyCode === 38 && e.altKey)) { //Arrow Down
							if (!this._dropDownList.is(":visible")) {
								//openDropDown
								this._toggleDropDown();
							} else {
								//hover next element
								this._hoverNextDropDownListItem();
							}
							e.preventDefault();
						} else if (e.keyCode === 27 && this._dropDownList.is(":visible")) { //Escape and dropdown is opened
							//Close dropdown
							this._toggleDropDown();
						}
					}
					if (this.options.maxLength) {
						currentInputVal = this._editorInput.val();
						if (currentInputVal.length === this.options.maxLength &&
								(e.keyCode > 46 || e.keyCode === 32) && !e.altKey && !e.ctrlKey) {
							selection = this._getSelection(this._editorInput[ 0 ]);
							if (selection.start === selection.end) {
								e.preventDefault();
								e.stopPropagation();
								this._sendNotification("warning",
									$.ig.util.stringFormat($.ig.Editor.locale.maxLengthWarningMsg,
										this.options.maxLength));
							}
						}
					}
				}
			}

			//We need this flag into the derived method, because if the key has been canceled by the user, we should not proceed with the execution.
			return noCancel;
		},
		_triggerKeyUp: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				key: event.keyCode,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keyup, event, args);
		},
		_validateNonCharacter: function (event) {
			// We need this method only in firefox, as all other browsers handle nonChar keyboard iteractions and doesn't fire keypress events.
			if ($.ig.util.isFF) {
				var e = event;

				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 ||

					// Allow: Ctrl+A
					(e.which === 97 && e.ctrlKey === true) ||

					// Allow Ctrl+C
					(e.which === 99 && e.ctrlKey === true) ||

					// Allow Ctrl+X
					(e.which === 120 && e.ctrlKey === true) ||

					// Allow Ctrl+V
					(e.which === 118 && e.ctrlKey === true) ||

					// Allow Ctrl+Z
					(e.which === 122 && e.ctrlKey === true) ||

					// Allow Ctrl+Y
					(e.which === 121 && e.ctrlKey === true) ||

					// Allow: home, end, left, right, down, up
					(e.keyCode >= 35 && e.keyCode <= 40)) {

					// let it happen, don't do anything
					return true;
				}
			} else {
				//In case of enter key the validation should pass,
				//because we need to trigger keypress event and give the option for custom handling by the user
				if (event.keyCode === 13) {
					return true;
				}

				//For all other browsers we rely only on _validateKey method
				return false;
			}
		},
		_triggerKeyPress: function (event) { //TextEditor
			if (this._validateNonCharacter(event) || this._validateKey(event)) {
				var args = {
					owner: this,
					element: event.target,
					key: event.keyCode,
					originalEvent: event,
					editorInput: this._editorInput
				};
				if (this.options.preventSubmitOnEnter &&
					event.keyCode === 13 &&
					!event.shiftKey &&
					this.options.textMode !== "multiline") {
					event.preventDefault();
					event.stopPropagation();
				}

				// T.P. 6th Nov 2015 When running firefox special keys like backspace ctrl etc. trigger keypress events and apply toLower and toUpper should happen only if character key is pressed
				if ((this.options.toUpper || this.options.toLower) &&
					!this._validateNonCharacter(event)) {
					var keyCode = event.which ? event.which : event.keyCode;
					if (keyCode) {
						var charStr, transformedChar, key, selection, val;
						charStr = String.fromCharCode(keyCode);
						if (this.options.toUpper) {
							transformedChar = charStr.toLocaleUpperCase();
						} else {
							transformedChar = charStr.toLocaleLowerCase();
						}
						key = transformedChar.charCodeAt(0);
						args.key = key;
						selection = this._getSelection(this._editorInput[ 0 ]);
						val = this._editorInput.val();

						this._editorInput.val(val.slice(0, selection.start) +
							transformedChar + val.slice(selection.end));

						// Move the caret
						this._setCursorPosition(selection.start + 1);
						event.preventDefault();
					}
				}
				return this._trigger(this.events.keypress, event, args);
			} else {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		_triggerValueChanged: function (originalValue) {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				newValue: this.options.value
			};
			if (originalValue) {
				args.originalValue = originalValue;
			}
			this._trigger(this.events.valueChanged, null, args);
		},
		_triggerValueChanging: function (newValue) {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				oldValue: this.value(),
				newValue: newValue
			};
			return this._trigger(this.events.valueChanging, null, args);
		},
		_triggerListItemClick: function (item) {
			var noCancel;

			// Trigger itemSelecting (Cancellable)
			noCancel = this._triggerDropDownItemSelecting(item);
			if (noCancel) {

				// TODO select closest parent class
				this._setSelectedItemByIndex($(item).index());

				if (this._dropDownList.is(":visible") && this._triggerDropDownClosing()) {
					this._hideDropDownList();
				}

				// D.P. _processValueChanging and text process have checks for change
				this._currentInputTextValue = this._editorInput.val();
				this._processValueChanging($(item).text());
				if (this._editMode) {
					this._enterEditMode();
				} else {
					this._editorInput.val(this._getDisplayValue());
					this._processTextChanged();
				}
				this._triggerDropDownItemSelected();
			}
		},
		_triggerButtonClick: function (event, buttonType) {
			if (buttonType) {
				switch (buttonType) {
					case "dropdown": {
						this._toggleDropDown();
					}
						break;
					case "clear": {
						this._currentInputTextValue = this._editorInput.val();

						//A.M. 3 November 2016 #447 "valueChanged event fired when pressing the close button even if the editor is empty"
						if (this._editorIsCleared())
						{
							if (!this.options.allowNullValue) {
								this._clearValue();
							}
							return;
						}
						if (!this._editMode) {
							this._clearValue();
							this._exitEditMode();
							this._triggerValueChanged();
						} else {
							this._clearValue(true);
							this._processTextChanged();
							this._positionCursor();
						}

					}
						break;
				}
			}
		},
		_triggerDropDownClosing: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListClosing, null, args);
		},
		_triggerDropDownClosed: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			this._trigger(this.events.dropDownListClosed, null, args);
		},
		_triggerDropDownOpening: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpening, null, args);
		},
		_triggerDropDownOpened: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpened, null, args);
		},
		_triggerDropDownItemSelecting: function (item) {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList,
				item: item
			};
			return this._trigger(this.events.dropDownItemSelecting, null, args);
		},
		_triggerDropDownItemSelected: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList,
				item: this.getSelectedListItem()[ 0 ]
			};
			this._trigger(this.events.dropDownItemSelected, null, args);
		},
		_processTextChanged: function () {
			var currentVal = this._editorInput.val(),
				previousVal = this._currentInputTextValue;
			if (currentVal !== previousVal) {
				if (previousVal === undefined) {
					//In case we don't have track of previous value
					previousVal = "";
				}
				this._triggerTextChanged(previousVal, currentVal);

				if (this._editMode && this._dropDownList) {
					this._updateDropdownSelection(this._valueFromText(currentVal));
				}
				if (this._validator) {
					// D.P. 26th Oct 2015 Bug 20972 validation onchange does not work correctly
					this._validator._validateInternal(this.element, null, false,
						this._editMode ? this._valueFromText(currentVal) : this.value());
				}
				this._currentInputTextValue = currentVal;
			}
			this._checkClearButtonState();

			// N.A. January 4th, 2017 #664 Validate spin button state on a change.
			this._setSpinButtonsState(currentVal);
		},
		_triggerTextChanged: function (oldValue, newValue) {
			var args = {
				owner: this,
				text: newValue,
				oldText: oldValue ? oldValue : ""
			};
			this._trigger(this.events.textChanged, null, args);
		},
		_checkClearButtonState: function () {
			if (this._clearButton) {
				if (this._editorIsCleared()) {
					this._clearButton.hide();
				} else {
					this._clearButton.show();
				}
			}
		},
		_editorIsCleared: function () { //TextEditor
			var result = false, currentVal = this._editorInput.val();
			if (currentVal === "") {
				result = true;
			}
			return result;
		},
		_elementPositionInViewport: function (el) {
				var areaTop = Math.ceil(el.parent().offset().top),
					elementoffset = Math.ceil(el.offset().top),
					elementHeight = Math.ceil(el.outerHeight()),
					listVisibleHeight = el.parent().outerHeight(), result;
				if (elementoffset - areaTop < 0) {
					result = "top";
				} else if (elementoffset + elementHeight - areaTop < listVisibleHeight) {
					result = "inside";
				} else if (elementoffset + elementHeight - areaTop > listVisibleHeight) {
					result = "bottom";
				}
				return result;
		},
		_hoverPreviousDropDownListItem: function () {
			var newItem, position,
				currentItem = this._listItems().filter("[data-active='true']");
			newItem = this._getSpinItem("up", currentItem);
			if (newItem.length > 0) {
				position = this._elementPositionInViewport(newItem);

				// Element is outside the viewPort and we need to scroll
				if (position === "top") {
					this._dropDownList.scrollTop(this._dropDownList.scrollTop() -
						newItem.outerHeight());
				} else if (position === "bottom") {
					this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
						newItem.position().top);
				}
				currentItem.removeClass(this.css.listItemActive,
					this.options.listItemHoverDuration);
				currentItem.removeAttr("data-active");
				newItem.addClass(this.css.listItemActive, this.options.listItemHoverDuration);
				newItem.attr("data-active", true);
			}
		},
		_hoverNextDropDownListItem: function () {
			var newItem, position,
				currentItem = this._listItems().filter("[data-active='true']");
			newItem = this._getSpinItem("down", currentItem);
			if (newItem.length > 0) {
				position = this._elementPositionInViewport(newItem);

				// Element is outside the viewPort and we need to scroll
				if (position === "bottom") {
					this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
						newItem.outerHeight());
				} else if (position === "top") {
					this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
						newItem.position().top);
				}
				currentItem.removeClass(this.css.listItemActive,
					this.options.listItemHoverDuration);
				currentItem.removeAttr("data-active");
				newItem.addClass(this.css.listItemActive, this.options.listItemHoverDuration);
				newItem.attr("data-active", true);
			}
		},
		_pasteHandler: function (e, drop) { // TextEditor Handler
			var self = this, previousValue = $(e.target).val(), newValue, selection;

			this._currentInputTextValue = this._editorInput.val();

			this._timeouts.push(setTimeout(function () {
				newValue = self._editorInput.val();
				selection = self._getSelection(self._editorInput[ 0 ]);
				self._insert(newValue, previousValue, selection);
				if (drop) {
					if (self._editorInput.is(":focus")) {
						// fire focus if it was ignored initally
						self._triggerFocus(e);
					} else {
						self._processValueChanging(newValue);
						self._focused = false;
						self._exitEditMode();
					}
				}
			}, 10));
		},
		_insertHandler: function (string) {  // TextEditor
			var selection = this._getSelection(this.field()[ 0 ]),
				previousValue, newValue;
			if (string) {
				if (this._editMode) {
					previousValue = this._editorInput.val();
					newValue = this._replaceDisplayValue(selection, previousValue, string);
				} else {
					// D.P. 30th Aug 2016 #287 Insert to replace value when not in edit mode
					previousValue = this.value();
					newValue = string;
				}
				this._insert(newValue, previousValue);
			}
		},
		_replaceDisplayValue: function (selection, previousValue, string) {
			return previousValue.substring(0, selection.start) + string +
				previousValue.substring(selection.end, previousValue.length);
		},
		_insert: function (newValue, previousValue, selection) { // TextEditor
			var i, ch;
			if (this.options.maxLength) {
				if (newValue && newValue.toString().length > this.options.maxLength) {
					newValue = newValue.toString().substring(0, this.options.maxLength);

					//Raise warning
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
							this.options.maxLength));
					}
				}
			if (this._validateValue(newValue)) {
				if (this.options.toUpper) {
					if (newValue) { newValue = newValue.toLocaleUpperCase(); }
				} else if (this.options.toLower) {
					if (newValue) { newValue = newValue.toLocaleLowerCase(); }
				}
				if (this.options.includeKeys !== null) {
					for (i = 0; i < newValue.length; i++) {
						ch = newValue.charAt(i);
						if ($.inArray(ch, this._includeKeysArray) !== -1) {
							continue;
						} else {
							newValue = this._replaceCharAt(newValue, i, "");
							i--;
						}
					}
				}
				if (this.options.excludeKeys !== null) {
					for (i = 0; i < newValue.length; i++) {
						ch = newValue.charAt(i);
						if ($.inArray(ch, this._excludeKeysArray) !== -1) {
							newValue = this._replaceCharAt(newValue, i, "");
							i--;
						}
					}
				}
				if (this._editMode) {
					this._editorInput.val(newValue);
					if (selection !== undefined) {
						// Move the caret
						this._setSelectionRange(this._editorInput[ 0 ], selection.start, selection.end);
					}
				} else {
					this._processInternalValueChanging(newValue);
					this._exitEditMode();
				}
				this._processTextChanged();
			} else {
				this._editorInput.val(previousValue);
			}
		},
		_markDropDownHoverActiveItem: function () {
			var activeItem = this._dropDownList
					.children(".ui-igedit-listitem")
					.filter(".ui-igedit-listitemselected");

			if (!activeItem.length) {
				return;
			}
			if (this._elementPositionInViewport(activeItem) !== "inside") {
				this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
						activeItem.position().top);
			}
			activeItem.attr("data-active", true);
		},
		_clearDropDownHoverActiveItem: function () {
			var hoveredItem = this._dropDownList.children(".ui-igedit-listitem")
					.filter("[data-hovered='true']"),
				activeItem = this._dropDownList.children(".ui-igedit-listitem")
					.filter("[data-active='true']");
			if (hoveredItem.length > 0) {
				hoveredItem.removeClass(this.css.listItemHover);
				hoveredItem.removeAttr("data-hovered");
			}
			if (activeItem.length > 0) {
				activeItem.removeClass(this.css.listItemActive);
				activeItem.removeAttr("data-active");
			}
		},
		_showDropDownList: function () {
			// Open Dropdown
			var direction;
			this._positionDropDownList();
			if (this._dropDownListOrientation === "up") {

				// We need this parameter as part of blind animation we're using
				direction = "down";
			} else {
				direction = "up";
			}
			try {
				$(this._dropDownList).show("blind", { direction: direction },
					this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownOpened, this));
			} catch (ex) {
				$(this._dropDownList).show(this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownOpened, this));
			}
			this._editorInput.attr("aria-expanded", true);
			this._markDropDownHoverActiveItem();
		},
		_hideDropDownList: function () {
			var direction;
			if (this._dropDownListOrientation === "up") {
				//We need this parameter as part of blind animation we're using
				direction = "down";
			} else {
				direction = "up";
			}
			try {
				$(this._dropDownList).hide("blind", { direction: direction },
					this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownClosed, this));
			} catch (ex) {
				$(this._dropDownList).hide(this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownClosed, this));
			}
			this._editorInput.attr("aria-expanded", false);
			this._clearDropDownHoverActiveItem();
		},
		_toggleDropDown: function () { //TextEditor
			var noCancel;

			// Close dropdown
			if (this._dropDownList.is(":visible")) {
				noCancel = this._triggerDropDownClosing();
				if (noCancel) {

					// Proceed with hiding
					this._hideDropDownList();

				}
			} else {

				// Open DropDown
				noCancel = this._triggerDropDownOpening();
				if (noCancel) {

					// Proceed with hiding
					// D.P. 21 Jun 2016 Bug 220712: igTextEditor - typed text is reverted to previous value in case the drop down is opened
					if (!this._editMode) {
						this._editorInput.focus();
					}
					this._showDropDownList();
				}

			}
		},
		_validateKey: function (event) {
			var ch, result;
			if (this.options.excludeKeys) {
				ch = String.fromCharCode(event.charCode || event.which);
				if ($.inArray(ch, this._excludeKeysArray) !== -1) {
					result = false;
				} else {
					result = true;
				}
			} else if (this.options.includeKeys) {
				ch = String.fromCharCode(event.charCode || event.which);
				if ($.inArray(ch, this._includeKeysArray) !== -1) {
					result = true;
				} else {
					result = false;
				}
			} else {
				result = true;
			}
			return result;
		},
		_enterEditMode: function () { //TextEditor
			var val = this._valueInput.val(),
				selection = this._getSelection(this._editorInput[ 0 ]);

			this._editMode = true;
			this._currentInputTextValue = this._editorInput.val();
			this._editorInput.val(this._getEditModeValue(val));
			this._positionCursor(selection.start, selection.end);
			this._processTextChanged();
		},
		_getEditModeValue: function (val) { //igTextEditor
			return val;
		},
		_exitEditMode: function () { //TextEditor
			// Update the editor input with display value
			if (this.options.textMode === "text" && !$.ig.util.isIE8) {
				this._editorInput.attr("type", "text");
			}
			this._currentInputTextValue = this._editorInput.val();
			this._editorInput.val(this._getDisplayValue());
			this._editMode = false;
			this._processTextChanged();
		},

		// This method is used to get the display value according to masks, displayFactor and all the properties related to the value displayed when editor is blured.
		_getDisplayValue: function () { //igTextEditor
			return this._valueInput.val();
		},

		// This method is used to get the actual value according to masks, displayFactor and all the properties related to the value displayed when editor is edit mode.
		_valueFromText: function (text) { //igTextEditor
			return text;
		},

		_setCursorPosition: function (positionIndex) {
			this._setSelectionRange(this._editorInput[ 0 ], positionIndex, positionIndex);
		},
		_setSelectionRange: function (input, selectionStart, selectionEnd) {
			if (input.setSelectionRange) {
				// IE specific issue when the editor is detached
				// and setSelectionRange is called as part of a composition mode end
				if (!$.contains(document.documentElement, input) && $.ig.util.isIE) {
					return;
				}
				input.setSelectionRange(selectionStart, selectionEnd);
			} else if (input.createTextRange) {
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd("character", selectionEnd);
				range.moveStart("character", selectionStart);
				range.select();
			}
		},
		_positionCursor: function (startPostion, endPosition) {
			if (this._dragging) {
				return;
			}
			var currentValue = this._editorInput.val(), self = this;

			if (currentValue && currentValue.length > 0) {

				// Proceed acording to the options.
				switch (this.options.selectionOnFocus) {
					case "selectAll": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ], 0,
									currentValue.length);
							}, 100));
						} else {
							this._editorInput.select();
						}
					}
						break;
					case "atStart": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ], 0, 0);
							}, 100));
						} else {
							this._setSelectionRange(this._editorInput[ 0 ], 0, 0);
						}
					}
						break;
					case "atEnd": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ],
									currentValue.length,
									currentValue.length);
							}, 100));
						} else {
							this._setSelectionRange(this._editorInput[ 0 ],
								currentValue.length,
								currentValue.length);
						}
					}
						break;
					case "browserDefault": {
						if (startPostion) {
							if (endPosition) {
								if (endPosition > currentValue.length - 1) {
									endPosition = currentValue.length - 1;
								}
							} else {
								endPosition = startPostion;
							}
							if ($.ig.util.isChrome || $.ig.util.isSafari) {
								this._timeouts.push(setTimeout(function () {
									self._setSelectionRange(self._editorInput[ 0 ],
										startPostion, endPosition);
								}, 100));
							} else {
								this._setSelectionRange(this._editorInput[ 0 ],
									startPostion, endPosition);
							}
						} else {

							// If there is no startSelection we use default behavior selectAll
							if ($.ig.util.isChrome || $.ig.util.isSafari) {
								this._timeouts.push(setTimeout(function () {
									self._setSelectionRange(self._editorInput[ 0 ], 0,
									currentValue.length);
								}, 100));
							} else {
								this._editorInput.select();
							}
						}

					}
						break;
					default:
				}
			} else {
				this._editorInput.select();
			}
		},
		_carryOverNewLine: function(value) {
			var cursorPosition = this._getCursorPosition(),
				substrings = this._splitString(value, cursorPosition);

			this._editorInput.val(substrings.before + "\r\n" + substrings.after);
			this._setCursorPosition(cursorPosition + 1);
		},
		_splitString: function (value, index) {
			return {
				before: value.substring(0, index),
				after: value.substring(index)
			};
		},
		_spin: function (type, fireEvent) {
			var nextItem;
			if (this._dropDownList) {
				nextItem = this._getSpinItem(type);
				if (!nextItem.length) {
					// no allowed item found
					return;
				}
				if (fireEvent && !this._triggerDropDownItemSelecting(nextItem[ 0 ])) {
					return;
				}
				this._currentInputTextValue = this._editorInput.val();
				if (this._editMode) {
					this._editorInput.val(nextItem.text());
					this._processTextChanged();
					this._editorInput.select();
				} else {
					this._processValueChanging(nextItem.text());
					this._editorInput.val(this._getDisplayValue());
					this._processTextChanged();
				}
				if (fireEvent) {
					this._triggerDropDownItemSelected();
				}
			}
		},
		_getSpinItem: function (spinType, selected) { //igTextEditor
			var items = this._listItems(), newItem, currentItem;
			if (!items.length) {
				return items;
			}
			if (selected) {
				currentItem = selected;
			} else {
				currentItem = this.getSelectedListItem();
			}
			if (currentItem.length > 0) {
				newItem = currentItem[ spinType === "up" ? "prev" : "next" ]();

				if (!newItem.length && this.options.spinWrapAround) {
					newItem = items[ spinType === "up" ? "last" : "first" ]();
				}
				return newItem;
			} else {
				return items.first();
			}
		},
		_handleSpinUpEvent: function () { //igTextEditor
			this._spin("up", true);
		},
		_handleSpinDownEvent: function () { //igTextEditor
			this._spin("down", true);
		},
		_handleSpinEvent: function (type, target) {
			var self = this;
			if (type === "spinUp") {
				this._handleSpinUpEvent();
				if (!target.attr("disabled")) {
					target._spinTimeOut = setTimeout(function () {
						target._spinInterval = setInterval(function () {
							self._handleSpinUpEvent();
						}, 75);
					}, 300);
				}
			} else if (type === "spinDown") {
				this._handleSpinDownEvent();
				if (!target.attr("disabled")) {
					target._spinTimeOut = setTimeout(function () {
						target._spinInterval = setInterval(function () {
							self._handleSpinDownEvent();
						}, 75);
					}, 300);
				}
			}
			this._timeouts.push(target._spinTimeOut);
		},
		_clearValue: function (textOnly) {
			this._super(textOnly);
		},
		_clearEditorNotifier: function () {
			var notifier = this._editorContainer.data("igNotifier");
			if (notifier && notifier.options.state === "warning" && notifier.isVisible()) {
				notifier.hide();
			}
		},
		_getCursorPosition: function () {
			var selection = this._getSelection(this._editorInput[ 0 ]);
			if ((selection.end - selection.start) === this._editorInput.val().length &&
				this._editorInput.val().length > 0) {

				// Whole value is selected. We use flag -1 in case of all text is selected
				return -1;
			} else {

				// If multiple selection is done we use the beginig of the selection as metric.
				return selection.start;
			}
		},
		_getSelection: function (editor) {
			var startPostion = 0, endPosition = 0;
			if (editor.selectionStart !== undefined) {
				startPostion = editor.selectionStart;
				endPosition = editor.selectionEnd;
			} else if (document.selection) {

				// IE8 support, from the current text selection:
				var globalSelection = document.selection.createRange(), range, rangeClone;
				if (globalSelection !== null) {
					range = editor.createTextRange();
					rangeClone = range.duplicate();

					// Editor selection:
					range.moveToBookmark(globalSelection.getBookmark());
					endPosition = range.text.length;

					// Select text up to the selection:
					rangeClone.setEndPoint("EndToStart", range);
					startPostion = rangeClone.text.length;

					// Move end index with the start offset
					endPosition += startPostion;
				}
			}
			return { start: startPostion, end: endPosition };
		},
		_getLocaleOption: function (key) {
			var locale = this.options.locale;
			if (locale && locale[ key ]) {
				return locale[ key ];
			} else if ($.ig && $.ig.Editor && $.ig.Editor.locale) {
				return $.ig.Editor.locale[ key ];
			} else {
				return "";
			}
		},
		_listItems: function () {
			return this._dropDownList.children(".ui-igedit-listitem");
		},
		_getListItemByIndex: function (index) {
			return this._listItems().eq(index);
		},
		_getSelectedItemIndex: function () {
			var items = this._listItems(), i;
			for (i = 0; i < items.length; i++) {
				if ($(items[ i ]).hasClass(this.css.listItemSelected)) {
					return i;
				}
			}
			return -1;
		},
		_setSelectedItemByIndex: function (index) {
			var oldSelectedItem, newSelectedItem, position;

			if (this._getSelectedItemIndex() !== index) {
				oldSelectedItem = this.getSelectedListItem();
				oldSelectedItem.removeClass(this.css.listItemSelected);
				oldSelectedItem.removeAttr("data-active");
				oldSelectedItem.attr("aria-selected", false);
				newSelectedItem = this._getListItemByIndex(index);
				newSelectedItem.addClass(this.css.listItemSelected);
				newSelectedItem.attr("aria-selected", true);
				if (this.dropDownVisible()) {
					position = this._elementPositionInViewport(newSelectedItem);
					if (position !== "inside") {
						this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
							newSelectedItem.position().top);
					}
					this._clearDropDownHoverActiveItem();
					newSelectedItem.attr("data-active", true);
				}
			}
		},
		_updateDropdownSelection: function (currentVal) { //igTextEditor
			var current = this.getSelectedListItem().index(),
				selectedIndex = this._valueIndexInList(currentVal);
			if (current !== selectedIndex) {
				if (selectedIndex > -1) {
					this._setSelectedItemByIndex(selectedIndex);
				} else {
					this.getSelectedListItem()
						.removeClass(this.css.listItemSelected)
						.attr("aria-selected", false)
						.removeAttr("data-active");
					if (this.dropDownVisible()) {
						this._clearDropDownHoverActiveItem();
					}
				}
			}
		},

		// igTextEditor public methods
		displayValue: function () {
			/* Gets the visible text in the editor.
			``` $(".selector").%%WidgetName%%("displayValue"); ```
				returnType="string" Visible text of the editor. */
			return this._getDisplayValue();
		},
		dropDownContainer: function () {
			/* Gets reference to jquery object which is used as container of drop-down list.
			```
				 $(".selector").%%WidgetName%%("dropDownContainer");
			```
				returnType="$" Returns reference to jquery object. */
			return this._dropDownList ? this._dropDownList : null;
		},
		showDropDown: function () {
			/* Shows the drop down list.
			```
			$(".selector").%%WidgetName%%("showDropDown");
			```
			*/
			this._showDropDownList();
		},
		hideDropDown: function () {
			/* Hides the drop down list.
			```
			$(".selector").%%WidgetName%%("hideDropDown");
			```*/
			this._hideDropDownList();
		},
		dropDownButton: function () {
			/* Returns a reference to the drop-down button UI element of the editor.
			```
			var button = $(".selector").%%WidgetName%%("dropDownButton");
			```
				returnType="$" Returns reference to jquery object. */
			return this._dropDownButton;
		},
		dropDownVisible: function () {
			/* Returns if the drop-down list is visible.
			```
			var visible =  $(".selector").%%WidgetName%%("dropDownVisible");
			```
				returnType="bool" The visibility state of the drop down. */
			return this._dropDownList.is(":visible");
		},
		clearButton: function () {
			/* Returns a reference to the clear button UI element of the editor.
			```
			var button =  $(".selector").%%WidgetName%%("clearButton");
			```
				returnType="$" Returns a reference to the jquery object. */
			return this._clearButton;
		},
		findListItemIndex: function (text, matchType) {
			/* Finds index of list item by text that matches with the search parameters.
			```
				var item =  $(".selector").igTextEditor("findListItemIndex");

			```
				paramType="string" optional="false" The text to search for in the drop down list.
				paramType="startsWith|endsWith|contains|exact" optional="true" The rule that is applied for searching the text.
				returnType="number" Returns index of the found item. */

			var list = this.options.listItems,
				matchCase = "i",
				index = -1,
				regString, regExp, i;

			if (!list || list.length === 0) {
				return -1;
			}
			switch (matchType) {
				case "startsWith":
					regString = "^{pattern}";
					break;
				case "endsWith":
					regString = "{pattern}$";
					break;
				case "exact":
					regString = "^{pattern}$";
					matchCase = undefined;
					break;
				default:
					regString = "{pattern}";
					break;
			}
			regExp = new RegExp(regString.replace("{pattern}",
				$.ig.util.escapeRegExp(text)), matchCase);
			for (i = 0; i < list.length; i++) {
				if (regExp.test(list[ i ])) {
					index = i;
				}
			}
			return index;
		},
		selectedListIndex: function (index) {
			/* Gets the index of the selected list item. Sets selected item by index.
			```
				$(".selector").%%WidgetName%%("selectedListIndex", 1);
				var selectedIndex = $(".selector").%%WidgetName%%("selectedListIndex");
			```
				paramType="number" optional="true" The index of the item that needs to be selected.
				returnType="number" Returns the selected index. */
			if (index !== undefined && typeof this.options.listItems[ index ] !== "undefined") {
				this._processInternalValueChanging(this.options.listItems[ index ]);
			} else {
				return this._getSelectedItemIndex();
			}
		},
		getSelectedListItem: function () {
			/* Gets the selected list item.
			```
			var selectedItem =  $(".selector").%%WidgetName%%("getSelectedListItem");
			```
				returnType="$" Selected list item.*/
			return this._listItems().filter(".ui-igedit-listitemselected");
		},
		getSelectedText: function () {
			/* Gets the selected text from the editor in edit mode. This can be done inside key event handlers, like keydown or keyup. This method can be used only when the editor is focused. If you invoke this method in display mode, when the editor input is blurred, the returned value will be an empty string.

			```
			var text =  (".selector").%%WidgetName%%("getSelectedText");
			```
				returnType="string" Selected text in editor.*/
			var text = this._editMode ? this._editorInput.val() : this.displayValue(),
				startIndex = this.getSelectionStart(),
				endIndex = this.getSelectionEnd();
			if (startIndex === undefined || endIndex === undefined ||
				startIndex === null || endIndex === null || startIndex === endIndex) {
				return "";
			}
			return text.substring(startIndex, endIndex);
		},
		getSelectionStart: function () {
			/* Gets the start index of the selected text in the editor.
			```
			var intex = $(".selector").%%WidgetName%%("getSelectionStart");
			```
				returnType="number" Start index of the selected text in the editor.*/
			return this._getSelection(this._editorInput[ 0 ]).start;
		},
		getSelectionEnd: function () {
			/* Gets the end index of the selected text in the editor.
			```
			var intex = $(".selector").%%WidgetName%%("getSelectionEnd");
			```
				returnType="number" End index of the selected text in the editor.*/
			return this._getSelection(this._editorInput[ 0 ]).end;
		},
		insert: function (string) {
			/*  Inserts the text at the location of the caret or over the current selection. If the editor is focused the method will insert the text over the current selection. If the editor is not focused the method will set the text as value of the editor.
				Note: The method raises [textChanged](ui.igtexteditor#events:textChanged) event.
				paramType="string" optional="false" The string to be inserted.
				```
				$('.selector').%%WidgetName%%({
					blur: function (evt, ui) {
						// insert 0 as the user leaves the field
						ui.owner.insert("0");
					}
				});
				$(".selector").%%WidgetName%%("insert", "20");
				```
			*/
			this._insertHandler(string);
		},
		select: function (start, end) {
			/*	Selects the text between start and end indices in the editor. If the parameters are equal, then the method sets location of caret. The method has effect only when the editor has focus.
			```
				$(".selector").%%WidgetName%%("select", 2, 4);
			```
				paramType="number" optional="false" Start of the selection.
				paramType="number" optional="false" End of the selection. */
			this._setSelectionRange(this._editorInput[ 0 ], start, end);
		},
		spinUp: function () {
			/* Selects the previous item from the drop-down list.
			```
			 $(".selector").igTextEditor("spinUp");
			```
			*/
			this._spin("up");
		},
		spinDown: function () {
			/* Selects the next item from the drop-down list.
			```
				$(".selector").igTextEditor("spinDown");
			```
			*/
			this._spin("down");
		},
		spinUpButton: function () {
			/* Returns a reference to the spin up UI element of the editor.
			```
				var button = $(".selector").%%WidgetName%%("spinUpButton");
			```
				returnType="$" The jQuery object representing the spin up UI element of the editor. */
			return this._spinUpButton;
		},
		spinDownButton: function () {
			/* Returns a reference to the spin down UI element of the editor.
			```
				var button = $(".selector").%%WidgetName%%("spinDownButton");
			```
				returnType="$" The jQuery object representing the spin down UI element of the editor. */
			return this._spinDownButton;
		}
	});

	$.widget("ui.igNumericEditor", $.ui.igTextEditor, {
		options: {
			/* type="array" Gets/Sets list of items which are used as a source for the drop-down list.
				Items in the list can be of type number.
				```
				$(".selector").%%WidgetName%%({
					listItems : [
						10,
						20,
						30
					]
				});

				//Get
				var items = $(".selector").%%WidgetName%%("option", "listItems");

				//Set
				$(".selector").%%WidgetName%%("option", "listItems", [10, 20, 30]);
				```
			 */
			listItems: null,
			/* type="object" Gets/Sets custom regional settings for editor. If it is string, then $.ig.regional[stringValue] is assumed.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					regional: "en-US"
				});

				//Get
				var region = $(".selector").%%WidgetName%%("option", "regional");

				//Set
				$(".selector").%%WidgetName%%("option", "regional", "en-US");
			```
			*/
			regional: null,
			/* type="string" Gets/Sets the character, which is used as negative sign.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				Note: This option's value should not be equal to the value of [groupSeparator](ui.igNumericEditor#options:groupSeparator) or [decimalSeparator](ui.igNumericEditor#options:decimalSeparator) options.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						negativeSign : "-"
					});

					//Get
					var negativeSign = $(".selector").%%WidgetName%%("option", "negativeSign");

					//Set
					$(".selector").%%WidgetName%%("option", "negativeSign", "-");
				```
				*/
			negativeSign: null,
			/* type="string" Gets/Sets the string, which is used as negative pattern. The "n" flag represents the value of number. The "-" and "()" flags are static part of pattern.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						negativePattern : "-  n"
					});

					//Get
					var pattern = $(".selector").%%WidgetName%%("option", "negativePattern");

					//Set
					$(".selector").%%WidgetName%%("option", "negativePattern", "-  n");
							```
				*/
			negativePattern: null,
			/* type="string" Gets/Sets the character, which is used as decimal separator.
				Note: this option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				Note: This option's value should not be equal to the value of [groupSeparator](ui.igNumericEditor#options:groupSeparator) or [negativeSign](ui.igNumericEditor#options:negativeSign) options.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						decimalSeparator : ","
					});

					//Get
					var separator = $(".selector").%%WidgetName%%("option", "decimalSeparator");

					//Set
					$(".selector").%%WidgetName%%("option", "decimalSeparator", ",");
				```
				*/
			decimalSeparator: null,
			/* type="string" Gets/Sets the character, which is used as separator for groups (like thousands).
				That option has effect only in display mode(no focus).
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				Note: This option's value should not be equal to the value of [decimalSeparator](ui.igNumericEditor#options:decimalSeparator) or [negativeSign](ui.igNumericEditor#options:negativeSign) options.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						groupSeparator : "."
					});

					//Get
					var groupSeparator = $(".selector").%%WidgetName%%("option", "groupSeparator");

					//Set
					$(".selector").%%WidgetName%%("option", "groupSeparator", ".");
				```
				*/
			groupSeparator: null,
			/* type="array" (array of number objects) Gets/Sets the number of digits in the integer part of a number, which are divided into groups.
				The "groupSeparator" is inserted between groups.
				If the sum of all values in array is smaller than the length of integer part, then the last item in array is used for all following groups.
				Count of groups starts from the decimal point (from right to left).
				That option has effect only in display mode(no focus).
				Note: The numbers in the array must be positive integers.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						groups : [1, 2, 3]
					});

					//Get
					var groups = $(".selector").%%WidgetName%%("option", "groups");

					//Set
					$(".selector").%%WidgetName%%("option", "groups", [3, 3, 3]);
				```
				*/
			groups: null,
			/* type="number" Gets/Sets the maximum number of decimal places supported by the editor.
				Note: this option has priority over possible regional settings.
				Note: In case of min decimals value higher than max decimals - max decimals are equaled to min decimals property.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				Note: This option supports values between 0 and 15, when dataMode is 'double' (default) and values between 0 and 7 in 'float' mode.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						maxDecimals: 10
					});

					//Get
					var maxDecimals = $(".selector").%%WidgetName%%("option", "maxDecimals");

					//Set
					$(".selector").%%WidgetName%%("option", "maxDecimals", 5);
				```
				*/
			maxDecimals: null,
			/* type="number" Gets/Sets the minimum number of decimal places supported by the editor.
				If number of digits in fractional part of number is less than the value of this option, then the "0" characters are used to fill missing digits.
				Note: This option has priority over possible regional settings.
				Note: In case of min decimals value higher than max decimals - max decimals are equaled to min decimals property.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				Note: This option supports values between 0 and 15, when dataMode is 'double' (default) and values between 0 and 7 in 'float' mode.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
							minDecimals: 5
					});

					//Get
					var minDecimals = $(".selector").%%WidgetName%%("option", "minDecimals");

					//Set
					$(".selector").%%WidgetName%%("option", "minDecimals", 3);
				```
				*/
			minDecimals: null,
			/* type="bool" Gets/Sets whether the last decimal place will be rounded, when the maxDecimal option is defined and applied.
			For example if the initial editor value is set to 123.4567, maxDecimals option is set to 3 and roundDecimals is enabled,
			then editor will round the value and will display it as 123.457. If roundDecimals is disabled then editor value will be truncated to 123.456.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					roundDecimals : false
				});

				//Get
				var roundDecimals = $(".selector").%%WidgetName%%("option", "roundDecimals");

				//Set
				$(".selector").%%WidgetName%%("option", "roundDecimals", false);
				```
			*/
			roundDecimals: true,
			/* type="left|right|center" Gets/Sets the horizontal alignment of the text in the editor.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						textAlign : "center"
					});

					//Get
					var align = $(".selector").%%WidgetName%%("option", "textAlign");

					//Set
					$(".selector").%%WidgetName%%("option", "textAlign", "center");
				```
				left type="string" The text into the input gets aligned to the left.
				right type="string" The text into the input gets aligned to the right.
				center type="string" The text into the input gets aligned to the center.
			*/
			textAlign: "right",
			/* type="double|float|long|ulong|int|uint|short|ushort|sbyte|byte" Defines the range that editor's value can accept.
			This is achieved by setting the [minValue](ui.igNumericEditor#options:minValue) and [maxValue](ui.igNumericEditor#options:maxValue) editor's options, accordingly to the lowest and highest accepted values for the defined numeric mode.
			The range for the specific type follows the numeric type standards, e.g. in .NET Framework  [floating-point](https://msdn.microsoft.com/en-us/library/9ahet949.aspx) types and [integral types](https://msdn.microsoft.com/en-us/library/exx3b86w.aspx).
			In addition, the maximum value that can be set to [minDecimals](ui.igNumericEditor#options:minDecimals) and [maxDecimals](ui.igNumericEditor#options:maxDecimals) options can be 15, when editor is in 'double' mode and 7, when in 'float' mode.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					dataMode : "int"
				});

				//Get
				var dataMode = $(".selector").%%WidgetName%%("option", "dataMode");

			```
				double type="string" the Number object is used with the limits of a double and if the value is not set, then the null or Number.NaN is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue). Note: that is used as default.
				float type="string" the Number object is used with the limits of a float and if the value is not set, then the null or Number.NaN is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				long type="string" the Number object is used with the limits of a signed long and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				ulong type="string" the Number object is used with the limits of an unsigned long and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				int type="string" the Number object is used with the limits of a signed int and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				uint type="string" the Number object is used with the limits of an unsigned int and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				short type="string" the Number object is used with the limits of a signed short and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				ushort type="string" the Number object is used with the limits of an unsigned short and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				sbyte type="string" the Number object is used with the limits of a signed byte and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
				byte type="string" the Number object is used with the limits of an unsigned byte and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igNumericEditor#options:allowNullValue).
			*/
			dataMode: "double",
			/* type="number" Gets/Sets the minimum value which can be entered in the editor by the end user.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					minValue: 5
				});

				//Get
				var minValue = $(".selector").%%WidgetName%%("option", "minValue");

				//Set
				$(".selector").%%WidgetName%%("option", "minValue", 3);
			```
			*/
			minValue: null,
			/* type="number" Gets/Sets the maximum value which can be entered in the editor by the end user.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					maxValue : 100
				});

				//Get
				var maxValue = $(".selector").%%WidgetName%%("option", "maxValue");

				//Set
				$(".selector").%%WidgetName%%("option", "maxValue", 100);
			```
			*/
			maxValue: null,
			/* type="bool" Gets/Sets whether the editor value can become null.
				If that option is disabled, and editor has no value, then value is set to 0 (or minValue/maxValue).
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					allowNullValue : false
				});

				//Get
				var allowNullValue = $(".selector").%%WidgetName%%("option", "allowNullValue");

				//Set
				$(".selector").%%WidgetName%%("option", "allowNullValue", false);
				```
			*/
			allowNullValue: false,
			/* type="number" Gets/Sets the default delta-value which is used with "spin" [buttonType](ui.igNumericEditor#options:buttonType) or [spinUp](ui.igNumericEditor#methods:spinUp) and [spinDown](ui.igNumericEditor#methods:spinDown) methods to increment or decrement value in the editor. The value can not be negative. Non integer value is supported only for dataMode double and float.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					spinDelta: 2
				});

				//Get
				var spinDelta= $(".selector").%%WidgetName%%("option", "spinDelta");

				//Set
				$(".selector").%%WidgetName%%("option", "spinDelta", 2);
			```
			*/
			spinDelta: 1,
			/* type="null|E|e|E+|e+"
				Gets/Sets support for scientific format.
				If that option is set, then numeric value appears as a string with possible E-power flag. In edit mode the "E" or "e" character can be entered as well.
				Notes: The "+" character is not supported in edit mode.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						scientificFormat : "e"
					});

					//Get
					var scientificFormat = $(".selector").%%WidgetName%%("option", "scientificFormat");

					//Set
					$(".selector").%%WidgetName%%("option", "scientificFormat", "e+");
				```
				null type="object" scientific format is disabled.
				E type="string" scientific format is enabled and the "E" character is used.
				e type="string" scientific format is enabled and the "e" character is used.
				E+ type="string" scientific format is enabled and the "E" character is used. The "E+" is used for positive values in display mode.
				e+ type="string" scientific format is enabled and the "e" character is used. The "e+" is used for positive values in display mode.
			*/
			scientificFormat: null,
			/* type="bool" Gets/Set the ability of the editor to automatically set value in the editor to the opposite side of the limit, when the spin action reaches minimum or maximum limit.
				This applies to [minValue](ui.%%WidgetNameLowered%%#options:minValue) and [maxValue](ui.%%WidgetNameLowered%%#options:maxValue) or cycling through list items if [isLimitedToListValues](ui.%%WidgetNameLowered%%#options:isLimitedToListValues) is enabled.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					spinWrapAround : true
				});

				//Get
				var spinAround = $(".selector").%%WidgetName%%("option", "spinWrapAround");

				//Set
				$(".selector").%%WidgetName%%("option", "spinWrapAround", true);
			```
			*/
			spinWrapAround: false,
			/* type="bool" Gets/Sets if the editor should only allow values from the list of items. Enabling this also causes spin actions to cycle through list items instead.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					isLimitedToListValues : true
				});

				//Get
				var limited = $(".selector").%%WidgetName%%("option", "isLimitedToListValues");

				//Set
				$(".selector").%%WidgetName%%("option", "isLimitedToListValues", false);
			```*/
			isLimitedToListValues: false,
			/* @Ignored@ Removed from numeric editor options*/
			maxLength: null,
			/* @Ignored@ Removed from numeric editor options*/
			excludeKeys: null,
			/* @Ignored@ Removed from numeric editor options*/
			includeKeys: null,
			/* @Ignored@ Removed from numeric editor options*/
			toLower: null,
			/* @Ignored@ Removed from numeric editor options*/
			toUpper: null,
			/* type="text|password|multiline" @Ignored@
			*/
			textMode: "text",
			/* type="object" Gets/Sets value in editor. The effect of setting/getting that option depends on type of editor and on dataMode options for every type of editor.

			```
			//Initialize
			$(".selector").%%WidgetName%%({
				value : 42
			});

			//Get
			var value = $(".selector").%%WidgetName%%("option", "value");

			//Set
			$(".selector").%%WidgetName%%("option", "value", 42);

			```
			*/
			value: null
		},
		events: {
			/* igWidget events go here */
		},
		css: {

			/* Class applied to the editing element of numeric editor when value is negative. The class is applied only when the editor is in display mode (no focus). Default value is 'ui-igedit-negative' */
			negative: "ui-igedit-negative"
		},
		_create: function () { //Numeric Editor

			// We need this option internaly for parsing the value, set this option via method so we can overwrite it.
			$.ui.igTextEditor.prototype._create.call(this);

			//TODO - make this as an option for using native input
			if (!$.ig.util.isIE8) {
				this._editorInput.attr("type", "tel");
			}
		},
		_initialize: function () {
			this._super();
			this._applyRegionalSettings();
			this._applyDataModeSettings();
			this._setNumericType();
			var numericChars = "0123456789", dataMode = this.options.dataMode;

			// Allow decimal separator as a char.
			// When the dataMode is set to int, decimal separator should not be allowed
			if (dataMode === "double" || dataMode === "float") {
				numericChars += this.options.decimalSeparator;

				// K.D. September 25th, 2015 The decimal separator key on the keyboard is always the 110 and 190 keycodes, which is '.'
				if (this.options.decimalSeparator !== ".") {
					numericChars += ".";
				}
			}
			if (this._getScientificFormat()) {
				numericChars += this._getScientificFormat();
			}

			// Allow negativeSign as a char only where negative values are supported
			if (dataMode === "double" || dataMode === "float" || dataMode === "long" ||
				dataMode === "int" || dataMode === "short" || dataMode === "sbyte") {
				numericChars += this.options.negativeSign;
			}

			// Setting Exclude keys is not allowed into numeric/percent/currency editor
			if (this.options.excludeKeys) {
				this.options.excludeKeys = null;
			}

			// `A.M. March 07, 2017 #769 Verifying decimalSeparator is a single character`
			if (this.options.decimalSeparator.toString().length > 1) {
				throw new Error($.ig.Editor.locale.decimalSeparatorErrorMsg);
			}

			// This property is only internally used and it's not configurable in this widget.
			this.options.includeKeys = numericChars;

			// A.M. April 12, 2017 #852 Don't allow groupSeparator and groupSeparator to use the same symbol
			if (this.options.decimalSeparator === this.options.groupSeparator) {
				throw new Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg);
			}
		},
		_setNumericType: function () {
			this._numericType = "numeric";
		},
		_getScientificFormat: function () {
			var result;
			if (this.options.scientificFormat) {
				switch (this.options.scientificFormat) {
					case "E":
					case "E+": {
						result = "E";
					}
						break;
					case "e":
					case "e+": {
						result = "e";
					}
						break;
					default: {
						result = "e";
						throw new Error($.ig.Editor.locale.scientificFormatErrMsg);
					}
				}
			} else {
				result = null;
			}
			return result;
		},
		_applyRegionalSettings: function () { //Numeric
			this.options.negativeSign = this._getRegionalOption("negativeSign");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("numericNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("numericDecimalSeparator");

			// TODO: make a validate function to ignore numbers as separators, undefined vs allowed chars here?
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("numericGroupSeparator");
			this.options.groups = this.options.groups || this._getRegionalOption("numericGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("numericMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("numericMinDecimals") :
				this.options.minDecimals;
		},
		_setInitialValue: function (value) { // NumericEditor
			// D.P. 6th Mar 2017 #777 'minValue/maxValue options are not respected at initialization'
			if (!isNaN(this.options.maxValue) && value > this.options.maxValue) {
				value = this.options.maxValue;
			} else if (!isNaN(this.options.minValue) && value < this.options.minValue) {
				value = this.options.minValue;
			}
			this._super(value);
		},
		_applyOptions: function () { // NumericEditor

			this._validateDecimalSettings();
			this._super();
			this._validateSpinSettings();

			if (this.options.maxLength !== null) {
				this.options.maxLength = null;
			}
			if (this.options.value < 0) {
				this._editorInput.addClass(this.css.negative);
			}
		},
		_validateSpinSettings: function() {
			var delta, fractional;

			// A.M. October 11 2016 #420 "Spin button increase/decrease button not disabled"
			if (this.options.buttonType === "spin") {
				this._setSpinButtonsState(this.options.value);
			}
			if (this.options.spinDelta !== 1) {
				delta = this.options.spinDelta;
				if (typeof delta !== "number") {
					this.options.spinDelta = 1;
					throw new Error($.ig.Editor.locale.spinDeltaIsOfTypeNumber);
				}
				if (delta < 0) {
					this.options.spinDelta = 1;
					throw new Error($.ig.Editor.locale.spinDeltaCouldntBeNegative);
				}
				if (this.options.dataMode === "float" || this.options.dataMode === "double") {

					// Validate if the fractional part is longer than maxDecimals
					if (delta % 1 !== 0) {
						fractional = delta.toString().substring(delta.toString().indexOf(".") + 1);
						if (fractional.toString().length > this.options.maxDecimals) {
							throw new Error($.ig.util.stringFormat($.ig.Editor.locale.
								spinDeltaContainsExceedsMaxDecimals,
							this.options.maxDecimals));
						}
					}
				} else {
					// This means the value is integer, without floating point
					if (delta % 1 !== 0) {
						throw new Error($.ig.Editor.locale.spinDeltaIncorrectFloatingPoint);
					}
				}
			}
			if (this.options.scientificFormat) {
				this.options.spinDelta = Number(this.options.spinDelta.toExponential());
			}
		},
		_validateDecimalSettings: function() {
			try {
				this._validateDecimalSetting("minDecimals", this.options.minDecimals);
			} catch (e) {
				this.options.minDecimals = this._getRegionalOption("numericMinDecimals");
				throw e;
			}
			try {
				this._validateDecimalSetting("maxDecimals", this.options.maxDecimals);
			} catch (e) {
				this.options.minDecimals = this._getRegionalOption("numericMaxDecimals");
				throw e;
			}
			this._validateDecimalMinMax();
		},
		_validateDecimalSetting: function(name, value) {
			var mode = this.options.dataMode, boundary;

			if (mode === "double") {
				boundary = 15;
			} else if (mode === "float") {
				boundary = 7;
			}

			if (value === "" || isNaN(value) ||
				(!isNaN(value) && (value < 0 || value > boundary))) {
				throw new Error($.ig.util.stringFormat($.ig.Editor.locale.decimalNumber,
					mode, name, boundary));
			}
		},
		_validateDecimalMinMax: function() {
			if (this.options.minDecimals > this.options.maxDecimals) {
				this.options.maxDecimals = this.options.minDecimals;
			}
		},
		_setOption: function (option, value) { // igNumericEditor
			/* igNumericEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "scientificFormat": {
					//M.S. 3/16/2017 Issue 745 - When we set scientificFormat runtime, we cannot write 'e' or 'E' in edit mode.
					if (this._getScientificFormat() || value === null) {
						if (prevValue) {
							if (prevValue === "e+" || prevValue === "E+") {
								prevValue = prevValue.replace("+", "");
							}
							this.options.includeKeys = this.options.includeKeys.replace(prevValue, "");
						}
						if (value === null) {
							 this._includeKeysArray = this.options.includeKeys.split( "" );
							break;
						}
						 var numericChars = this._getScientificFormat();
						 this.options.includeKeys += numericChars;
						 this._includeKeysArray = this.options.includeKeys.split( "" );
					}
				}
					break;
				case "spinDelta": {
					if (typeof value !== "number") {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaIsOfTypeNumber);
					} else if (value < 0) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaCouldntBeNegative);
					} else if ((this.options.dataMode !== "float" &&
						this.options.dataMode !== "double") && value % 1 !== 0) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaIncorrectFloatingPoint);
					} else if (this.options.scientificFormat) {
						this.options[ option ] = Number(value.toExponential());
					}
					break;
				}
				case "minValue":
				case "maxValue":
					if (isNaN(value)) {
						this.options[ option ] = prevValue;
						return;
					}
					if (value === null) {
						// ensure dataMode defaults
						this._applyDataModeSettings();
					} else {
						this._processInternalValueChanging(this.value());
						if (!this._editMode) {
							this._editorInput.val(this._getDisplayValue());
						}
					}

					// A.M. October 11 2016 #420 "Spin button increase/decrease button not disabled"
					this._setSpinButtonsState(this.value());
					break;
				case "minDecimals":
				case "maxDecimals":
					try {
						this._validateDecimalSetting(option, value);
					} catch (e) {
						this.options[ option ] = prevValue;
						throw e;
					}
					if (this.options[ option ] !== prevValue) {
						this._validateDecimalMinMax();
						this._processInternalValueChanging(this.value());
						if (!this._editMode) {
							this._editorInput.val(this._getDisplayValue());
						}
					}
					break;

				// `A.M. March 07, 2017 #769 Verifying decimalSeparator is a single character`
				case "decimalSeparator": {
					if (value.toString().length > 1) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.decimalSeparatorErrorMsg);
					}

					// A.M. April 12, 2017 #852 Don't allow groupSeparator and groupSeparator to use the same symbol
					if (this.options[ option ] === this.options.groupSeparator) {
						throw new Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg);
					}
				}
					break;

				// A.M. April 06, 2017 #772 Exception is thrown when the 'groupSeparator' is set to null at runtime
				case "groupSeparator": {
					if (this.options[ option ] === null) {
						this.options[ option ] = this._getRegionalOption("numericGroupSeparator");
					}

					// A.M. April 12, 2017 #852 Don't allow groupSeparator and groupSeparator to use the same symbol
					if (this.options[ option ] === this.options.decimalSeparator) {
						throw new Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg);
					}
				}
					break;
				case "regional":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.setOptionError + option);

				case "excludeKeys":
				case "includeKeys":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.numericEditorNoSuchOption);

				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
						this.options[ option ] = prevValue;
						this._super(option, value);
					}
					break;
			}
		},
		_processValueChanging: function (value) { //NumericEditor
			if (typeof value === "string" || value instanceof String) {
				value = value.trim();
				value = this._parseNumericValueByMode(value,
					this._numericType,
					this.options.dataMode);

				// I.G. 18th Aug 2016 Bug 223245:igPercentEditor does not persist empty string value when allowNullValue: true
				if (value === "" && !this.options.allowNullValue) {
					value = 0;
				}
				if (this._numericType === "percent" && this.options.displayFactor) {
					if (value !== "" && !isNaN(value)) {

						// TODO - any logic related to "percent" should not be in numeric editor.
						value = this._divideWithPrecision(value, this.options.displayFactor);
					}
				}
			}
			this._super(value);
		},
		_processInternalValueChanging: function (value) { //NumericEditor
			value = this._parseNumericValueByMode(value,
					this._numericType,
					this.options.dataMode);
			if (value !== "" && !isNaN(value)) {

				// I.G. 29/11/2016 #539 'If min/max value is set to 0 and the entered value is invalid, the editor's value is not reverted'
				if (!isNaN(this.options.maxValue) && value > this.options.maxValue) {
					value = this.options.maxValue;

					//Raise warning
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));

				// I.G. 29/11/2016 #539 'If min/max value is set to 0 and the entered value is invalid, the editor's value is not reverted'
				} else if (!isNaN(this.options.minValue) && value < this.options.minValue) {
					value = this.options.minValue;

						// Raise Warning level 2
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
								this.options.minValue));
				}
			}
			if (!this._validateValue(value)) {
				if (value !== "" && !isNaN(value)) {

					// I.G. 11/03/2017 #809 'Wrong value is set when we have isLimitedToListValues: true and revertIfNotValid: false'
						if (this.options.revertIfNotValid) { // TODO VERIFY!!! revertIfNotValid > minValue/maxValue
							value = this._valueInput.val();
						} else if (this.options.isLimitedToListValues) {
							value = "";
						}
				} else {
					if (this.options.allowNullValue) { // TODO VERIFY!!! allowNullValue > revertIfNotValid
						value = this.options.nullValue;
					} else {
						if (this.options.revertIfNotValid) {
							value = this._valueInput.val();
						} else {
							value = 0; // TODO VERIFY!!! If value is "" and allowNullValue and revertIfNotValid is false, then becasue it is numeric editor we set it to 0. right?
							if (this.options.minValue > 0) {
								value = this.options.minValue;
							} else if (this.options.maxValue < 0) {
								value = this.options.maxValue;
							} else {
								value = 0;
							}
						}
					}
				}
			}
			if (value !== this.value()) {
				this._updateValue(value);
			}
			this._setSpinButtonsState(value);
		},
		_triggerKeyDown: function (event) { //NumericEditor
			var e = event, noCancel, args, currentInputVal;
			args = {
				owner: this,
				element: event.target,
				key: event.keyCode,
				editorInput: this._editorInput
			};
			noCancel = this._trigger(this.events.keydown, event, args);
			if (noCancel) {

				// Clear notifier
				this._clearEditorNotifier();
				if (e.keyCode === 13) {
					currentInputVal = this._editorInput.val();

					if (this._dropDownList && this._dropDownList.is(":visible")) {
						this._super(event);
					} else {

						// We repeat the logic in case we don't have dropdown list. On enter the value is updated with the current value into editorInput
						this._processValueChanging(currentInputVal);
						this._enterEditMode();
					}

				} else if (e.keyCode === 38) {

					// Arrow Up
					// Close if opened
					if (e.altKey && this._dropDownList && this._dropDownList.is(":visible")) {
						this._toggleDropDown();
					} else if (this._dropDownList && this._dropDownList.is(":visible")) {

						// Hover previous element
						this._hoverPreviousDropDownListItem();
					} else if (!this.options.readOnly ||
						(this.options.readOnly && this.options.isLimitedToListValues)) {

						// Spin numeric value
						this._handleSpinUpEvent();
					}

					// prevent default arrow action (cursor move or page scroll on readonly):
					e.preventDefault();
				} else if (e.keyCode === 40) {//Arrow Down
					if (e.altKey && this._dropDownList && !this._dropDownList.is(":visible")) {

						// OpenDropDown
						this._toggleDropDown();
					} else if (this._dropDownList && this._dropDownList.is(":visible")) {

						// Hover next element
						this._hoverNextDropDownListItem();
					} else if (!this.options.readOnly ||
						(this.options.readOnly && this.options.isLimitedToListValues)) {

						// Spin numeric value
						this._handleSpinDownEvent();
					}
					e.preventDefault();
				} else if (e.keyCode === 27 && this._dropDownList &&
					this._dropDownList.is(":visible")) { //Escape and dropdown is opened

					// Close dropdown
					this._toggleDropDown();
				}
			}
			return noCancel;
		},
		_applyDataModeSettings: function () {
			switch (this.options.dataMode) {
				case "double": {
					this._setMinMaxValues(-(Number.MAX_VALUE), Number.MAX_VALUE);
				}
					break;
				case "float": {
					var floatMinValue = -3.40282347e38, floatMaxValue = 3.40282347e38;
					this._setMinMaxValues(floatMinValue, floatMaxValue);
				}
					break;
				case "long": {
					var longMinValue = -9223372036854775807, longMaxValue = 9223372036854775807;
					this._setMinMaxValues(longMinValue, longMaxValue);
				}
					break;
				case "ulong": {
					var ulongMinValue = 0, ulongMaxValue = 18446744073709551615;
					this._setMinMaxValues(ulongMinValue, ulongMaxValue);
				}
					break;
				case "int": {
					var intMinValue = -2147483647, intMaxValue = 2147483647;
					this._setMinMaxValues(intMinValue, intMaxValue);
				}
					break;
				case "uint": {
					var uintMinValue = 0, uintMaxValue = 4294967295;
					this._setMinMaxValues(uintMinValue, uintMaxValue);
				}
					break;
				case "short": {
					var shortMinValue = -32768, shortMaxValue = 32767;
					this._setMinMaxValues(shortMinValue, shortMaxValue);
				}
					break;
				case "ushort": {
					var ushortMinValue = 0, ushortMaxValue = 65535;
					this._setMinMaxValues(ushortMinValue, ushortMaxValue);
				}
					break;
				case "sbyte": {
					var sbyteMinValue = -127, sbyteMaxValue = 127;
					this._setMinMaxValues(sbyteMinValue, sbyteMaxValue);
				}
					break;
				case "byte": {
					var byteMinValue = 0, byteMaxValue = 256;
					this._setMinMaxValues(byteMinValue, byteMaxValue);
				}
					break;

				// If dataMode doesn't match the editor fails back to dataMode double
				default: {
					this.options.dataMode = "double";
					this._setMinMaxValues(Number.MIN_VALUE, Number.MAX_VALUE);
				}
			}
		},
		_setMinMaxValues: function (typeMinValue, typeMaxValue) {
			//Set bounderies based on the type
			if (this.options.minValue === null || this.options.minValue < typeMinValue) {
				this.options.minValue = typeMinValue;
			}
			if (this.options.maxValue === null || this.options.maxValue > typeMaxValue) {
				this.options.maxValue = typeMaxValue;
			}
		},
		_parseNumericValueByMode: function (value, numericEditorType, dataMode) { //NumericEditor
			var val, stringValue, exponent, exponentIndex,
				decimalSeparator = this.options.decimalSeparator,
				groupSeparator = this.options.groupSeparator,
				maxDecimals = this.options.maxDecimals;

			if (value === null || value === "") { // TODO VERIFY _validateValue and _updateValue both have cases calling parse with null!
				return value;
			}

			if ($.type(value) !== "number") {

				// In case of IME input digits we need to convert
				// value = $.ig.util.replaceJpToEnNumbers(value);
				value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping);

				// D.P. 27th Oct 2015 Bug 208296: Don't replace group separator on actual numbers as it can be '.'
				value = value.toString().replace(new RegExp($.ig.util.escapeRegExp(groupSeparator), "g"), ""); // TODO VERIFY Remove group separator cause parseInt("1,000") returns 1?
				if (this.options.negativeSign !== "-") {
					value = value.replace(this.options.negativeSign, "-");
				}
				if (numericEditorType === "percent") {
					value = value.replace(this.options.percentSymbol, "").trim();
				} else if (numericEditorType === "currency") {
					value = value.replace(this.options.currencySymbol, "").trim();
				}

				// D.P. decimalSeparator replace before any parsing, regardless of mode (ensure scientific decimals are parsed correctly)
				if (value.indexOf(decimalSeparator) !== -1) {
					value = value.replace(decimalSeparator, ".");
				}
			}
			if (dataMode === "double" || dataMode === "float") {
				stringValue = value.toString().toLowerCase();
				if (stringValue.indexOf("e") !== -1) {
					val = value = Number(value);

					// values with negative exponent (less than 1) go through maxDecimal handling:
					if (value < 1) {
						if (!this.options.scientificFormat) {
							// D.P. 28th Apr 2017 #761: Wrong value when setting the value to a number with too many digits:
							// If scientific value when not enabled, expand to fixed-point notation and carry on with processsing
							stringValue = value.toFixed(this.options.maxDecimals + 1);
						} else {
							//refresh stringValue in case the original value entered has more than one digit before the decimal sep.
							stringValue = value.toString().toLowerCase();
							exponentIndex = stringValue.indexOf("e");
							exponent = stringValue.substring(exponentIndex + 1);
							stringValue = stringValue.substring(0, exponentIndex);
						}
					} else {
						return value;
					}
				}

				// In that case we need to validate the value against the constraints.
				if (stringValue.indexOf(".") !== -1) {
					var integerDigits, fractionalDigits;
					decimalSeparator = ".";
					fractionalDigits = stringValue.substring(stringValue.indexOf(decimalSeparator) + 1);

					//In case of pasted value with multiple decimal points. We can't use parseFloat because we want to keep the number of the fractional digits, but parseFloat cuts to 6th
					if (fractionalDigits.indexOf(decimalSeparator) > 0) {
						fractionalDigits = fractionalDigits.substring(0, fractionalDigits.indexOf(decimalSeparator));
					}
					if (fractionalDigits.length > maxDecimals) {

						// January 26th, 2017 #626: Round values, when decimal places are more than the allowed, set at the maxDecimals option.
						if (this.options.roundDecimals) {
							stringValue = Math.round10(stringValue, -maxDecimals).toFixed(maxDecimals);
							if (stringValue.indexOf(decimalSeparator) > -1) {
								fractionalDigits = stringValue.substring(stringValue.indexOf(decimalSeparator) + 1);
							} else {
								fractionalDigits = "";
							}
						} else {
							fractionalDigits = fractionalDigits.substring(0, maxDecimals);
						}
					}
					if (stringValue.indexOf(decimalSeparator) > -1) {
						integerDigits = stringValue.substring(0, stringValue.indexOf(decimalSeparator));
					} else {
						integerDigits = stringValue;
					}

					val = integerDigits + "." + fractionalDigits;
					if (exponent) {
						val += "e" + exponent;
					}

					//We want to evaluate the number without losing fractional digits, as parseFloat cuts six digits after the decimal point.
					val = val / 1;
				} else if (!exponent) {
					//In that case we don't have fractional digits, so we can use ParseInt for the integer digits.
					val = parseInt(value);
				}
			} else {
				if (value.toString().toLowerCase().indexOf("e") !== -1) {
					value = Number(value).toFixed();
				}
				if (this._numericType === "percent" &&
					this.options.displayFactor === 100 &&
					this.options.dataMode === "int" &&
					parseInt(value) !== parseInt(this._editorInput.val())) {

					// TODO - This is edge case
					val = value;
				} else {
					val = parseInt(value);
				}
			}
			return val;
		},
		_multiplyWithPrecision: function (value1, value2, precision) {

			// Values MUST be numeric, precision is optoinal
			// TODO: verify, test with 0.57 * 100[00] or (0.1, 0.2), might be overdone
			var fractionalDigits, fractionalDigits2, result;
			if (!precision) {
				fractionalDigits = value1.toString().indexOf(".") > 0 ?
					value1.toString().substring(value1.toString().indexOf(".") + 1) : "";
				fractionalDigits2 = value2.toString().indexOf(".") > 0 ?
					value2.toString().substring(value2.toString().indexOf(".") + 1) : "";
				if (fractionalDigits2.length) {

					// if both are floats, must use combined?
					fractionalDigits += fractionalDigits2;
				}
				precision = Math.pow(10, fractionalDigits.length);
			}

			value1 *= precision;
			value2 *= precision;
			result = (value1 * value2) / (precision * precision);
			return result.toFixed(fractionalDigits.length) * 1;
		},
		_divideWithPrecision: function (value1, value2) {

			// TODO: verify
			var fractionalDigits, fractionalDigits2, precision;
			fractionalDigits = value1.toString().indexOf(".") > 0 ?
				value1.toString().substring(value1.toString().indexOf(".") + 1) : "";
			fractionalDigits2 = value2.toString().indexOf(".") > 0 ?
				value2.toString().substring(value2.toString().indexOf(".") + 1) : "";
			if (fractionalDigits2.length > fractionalDigits.length) {
				fractionalDigits = fractionalDigits2;
			}
			precision = Math.pow(10, fractionalDigits.length);

			// Ensure both are integers
			value1 = this._multiplyWithPrecision(value1, precision);
			value2 = this._multiplyWithPrecision(value2, precision);

			return (value1 / value2);
		},

		//This method validates and updates the value input the hidden input
		_updateValue: function (value) { //Numeric Editor
			// WE should detect dataMode, so we can use the options.
			var val, dataMode = this.options.dataMode;
			if (value === "" && this.options.allowNullValue) {
				val = this.options.nullValue;
				this._valueInput.val("");
			} else if (value === this.options.nullValue && value === null) {
				val = value;
				this._valueInput.val("");
			} else {
				val = this._parseNumericValueByMode(value, this._numericType, dataMode);
				this._valueInput.val(val);
			}
			this.options.value = val;

			if (this._dropDownList) {
				this._updateDropdownSelection(val);
			}
		},
		_validateKey: function (event) { //NumericEditor
			if (this._super(event)) {
				var dataMode = this.options.dataMode, ch, val,
					negativeSign = this.options.negativeSign, nextCh, prevCh,
					leadPos = 0, nextDirection = 1,
					cursorPos = this._getCursorPosition(),
					isDecimal = event.which ? event.which === 46 : false;
				ch = String.fromCharCode(event.charCode || event.which).toLowerCase();

				//don't block replacing entire value if everything is selected (-1)
				if (cursorPos === -1) {
					//all includeKeys, except E-s
					return ch !== "e";
				}

				val = this._editorInput.val().toLowerCase();
				nextCh = val.substring(cursorPos, cursorPos + nextDirection);

				//nothing before the number negative sign
				if (cursorPos === leadPos && nextCh === negativeSign) {
					return false;
				}

				// Allow negative at start and after exponent
				prevCh = val.substring(cursorPos - nextDirection, cursorPos);
				if (ch === negativeSign) {
					return (cursorPos === leadPos || prevCh === "e") && nextCh !== negativeSign;
				}

				if (ch === "e" && val.indexOf("e") !== -1) {
					return false;
				}

				//We need this extra validation in case the user tries to enter decimal separator multiple times
				if (dataMode === "double" || dataMode === "float") {
					var decimalSeparator = this.options.decimalSeparator;

					// val = $(event.target).val();
					if (decimalSeparator !== "." && isDecimal &&
						(val.indexOf(".") !== -1 || val.indexOf(decimalSeparator) !== -1) &&
						cursorPos !== -1) {
						return false;
					}
					if (((ch === decimalSeparator || isDecimal) &&
							(val.indexOf(decimalSeparator) !== -1 || val.indexOf(".") !== -1) &&
							cursorPos !== -1)) {

						// We already have decimal separator so prevent default
						return false;
					} else {
						return true;
					}
				} else {
					// If the dataMode differs from double, or float and the super method returns true the cher is valid
					return true;
				}
			} else {
				// If the super method fails, the char is not allowed
				return false;
			}

			// return true;
		},
		_validateValue: function (val) { //Numeric Editor
			var result;
			if (this._super(val) && !isNaN(val = this._parseNumericValueByMode(val,
					this._numericType, this.options.dataMode))) { // TODO VERIFY it was !isNaN(parseFloat(val), but this is not OK. The case where you press enter then value is updated, and then on TAB the value isNaN "$123.90"
				{
					result = true;
				}
			} else {
				result = false;
			}
			return result;
		},
		_insert: function (newValue, previousValue, selection) { //NumericEditor
			var newLenght = newValue.length, diff;
			if (!isNaN(newValue = this._parseNumericValueByMode(newValue,
					this._numericType, this.options.dataMode))) {

				if (!isNaN(this.options.maxValue) && newValue > this.options.maxValue) {
					newValue = this.options.maxValue;

					// Raise Warning level 2
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));
				} else if (!isNaN(this.options.minValue) && newValue < this.options.minValue) {
					newValue = this.options.minValue;

					// Raise Warning level 2
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
							this.options.minValue));
				}

				if (!this._validateValue(newValue) && this.options.revertIfNotValid) {
					newValue = previousValue;
				}
			} else if (this.options.revertIfNotValid) {
				newValue = previousValue;
			} else {
				newValue = "";
			}
			if (this._editMode) {
				this._editorInput.val(this._getEditModeValue(newValue));
				if (selection !== undefined) {
					// Move the caret, account for cuts from number parsing:
					diff = newLenght - newValue.toString().length;
					selection.start -= diff;
					selection.end -= diff;
					this._setSelectionRange(this._editorInput[ 0 ], selection.start, selection.end);
				}
			} else {
				this._processInternalValueChanging(newValue);
				this._exitEditMode();
			}
			this._setSpinButtonsState(newValue);
			this._processTextChanged();
		},
		_clearValue: function (textOnly) { //Numeric Editor
			var newValue;
			if (this.options.allowNullValue) {
				newValue = this.options.nullValue;
				if (this.options.nullValue === null) {
					this._editorInput.val("");
				} else {

					//M.S. 4/19/2017. Issue 892 Initially when allowNullValue is true and the value is not set, the value should be equal to nullValue
					if (this._validateValue(newValue)) {
						this._editorInput.val(this.options.nullValue);
					} else {
						this._editorInput.val(this.options.value);
					}
				}
			} else {

				// If the min value is different from zero, we clear the value with the minimum value.
				if (!isNaN(this.options.minValue) && this.options.minValue > 0) {
					newValue = this.options.minValue;
					this._editorInput.val(this.options.minValue);
				} else if (!isNaN(this.options.maxValue) && this.options.maxValue < 0) {
					newValue = this.options.maxValue;
					this._editorInput.val(this.options.maxValue);

				// I.G. 13/04/2017 #942 'When clearing with the 'clear' button, the value is set to 0 even if 0 is not in the list of items'
				} else if (this.options.isLimitedToListValues) {
					newValue = "";
					this._editorInput.val("");
				} else {
					if (this.value()) {
						newValue = 0;
						this._editorInput.val(0);
					}
				}
			}

			//M.S. 4/19/2017. Issue 892 Initially when allowNullValue is true and the value is not set, the value should be equal to nullValue
			if (!textOnly && newValue !== undefined && this._validateValue(newValue)) {
				this._updateValue(newValue);
			}
		},
		_getRegionalOption: function (key) {
			var regional = this.options.regional;
			if (this.options[ key ]) {
				return this.options[ key ];
			}
			if (typeof regional === "string") {
				regional = $.ig.regional[ regional ];
			}
			if (regional && regional[ key ]) {
				return regional[ key ];
			} else {

				// return defaults
				return $.ig.regional.defaults[ key ];
			}
		},
		_convertScientificToNumeric: function (num) {
			var stringValue = num.toString(),
				scientificPrecision = stringValue
				.substring(stringValue.toLowerCase().indexOf("e") + 1);
			num = num / 1;
			scientificPrecision = Math.abs(scientificPrecision);
			if (scientificPrecision <= 20) {
				stringValue = num.toFixed(scientificPrecision);
			}
			return stringValue;
		},
		_getDisplayValue: function () { //Numeric Editor
			var value = this._valueInput.val(),
				decimalSeparator = this.options.decimalSeparator, decimalPoint = ".",
				minDecimals = this.options.minDecimals, dataMode = this.options.dataMode,
				stringValue, displayValue, integerDigits, fractionalDigits,
				scientificValue, scientificExponent, negativeSign,
				positivePattern, negativePattern, groups, groupSeparator, symbol = "";
			if (value === this.options.nullValue || value === "" || isNaN(value)) {
				if (isNaN(value)) {
					this._valueInput.val("");
					return "";
				} else {
					return value;
				}
			}
			if (this._numericType !== "numeric") {
				positivePattern = this.options.positivePattern;
				symbol = this.options[ this._numericType + "Symbol" ];
			}
			negativePattern = this.options.negativePattern;

			// A. M. March 15, 2017 #771 "If the 'groups' option's array contains '0' no groups are rendered"
			var originalArray = this.options.groups;
			groups = originalArray.filter(function(item) {return item !== 0;} );
			groupSeparator = this.options.groupSeparator;
			if (this._numericType === "percent" && this.options.displayFactor) {
				value = this._multiplyWithPrecision(value, this.options.displayFactor);
				value = this._parseNumericValueByMode(value, this._numericType, this.options.dataMode);
			}

			stringValue = value.toString().toLowerCase();
			if (this.options.scientificFormat) {
				if (stringValue.indexOf("e") === -1) {
					stringValue = (stringValue / 1).toExponential();
					scientificValue = stringValue.split("e")[ 0 ];
					scientificExponent = stringValue.split(/e\+?/).pop();
				}
			} else if (stringValue.indexOf("e") !== -1) {
				// If the value is in scientific, try to convert:
				stringValue = this._convertScientificToNumeric(stringValue);
			}
			displayValue = stringValue;

			// Min decimals check.
			if (dataMode === "double" || dataMode === "float") {

				// There are edge cases where the value after convertion still contains scientific format. In that case we just pass that value.
				if (stringValue.indexOf("e") !== -1) {
					displayValue = stringValue;
				} else {

					// In that case we need to validate the value against the constraints.
					// Here decimalPoint is used instead of the decimalSeparator, as we work with the value from the hiddedn input, which is Number, so the decimalSeparator is dot.
					if (stringValue.indexOf(decimalPoint) !== -1) {
						fractionalDigits = stringValue
							.substring(stringValue.indexOf(decimalPoint) + 1);
						if (fractionalDigits.length < minDecimals) {
							var missingDecimals = minDecimals - fractionalDigits.length;
							while (missingDecimals > 0) {
								fractionalDigits += "0";
								missingDecimals--;
							}
						}
						integerDigits = stringValue
							.substring(0, stringValue.indexOf(decimalPoint));
					} else {
						integerDigits = stringValue;
						if (minDecimals > 0) {
							stringValue = parseInt(stringValue).toFixed(minDecimals);
							fractionalDigits = stringValue
								.substring(stringValue.indexOf(decimalPoint) + 1);
						}
					}
					integerDigits = this._applyGroups(integerDigits, groups, groupSeparator);
					if (fractionalDigits && fractionalDigits.length > 0) {
						displayValue = integerDigits + decimalSeparator + fractionalDigits;
					} else {
						displayValue = integerDigits;
					}
				}
			} else if (stringValue.indexOf("e") === -1) {
				// Only apply groups to non-scientific format:
				displayValue = this._applyGroups(value.toString(), groups, groupSeparator);
			}

			if (this.options.scientificFormat) {
				// Scientific format:
				if (scientificExponent > 0) {
					displayValue = scientificValue + this.options.scientificFormat + scientificExponent;
				} else {
					displayValue = stringValue.replace("e", this._getScientificFormat());
				}
				displayValue = displayValue.replace(decimalPoint, decimalSeparator);
			}

			if (value < 0 ) {
				negativeSign = this.options.negativeSign;
				displayValue = displayValue.replace("-", "");
				displayValue = negativePattern
					.replace("n", displayValue).replace("$", symbol).replace("-", negativeSign);
			} else if (positivePattern) {

				// Apply Positive Pattern
				displayValue = positivePattern.replace("n", displayValue).replace("$", symbol);
			}
			return displayValue;
		},
		_valueFromText: function (text) { //NumericEditor
			return this._parseNumericValueByMode(text, this._numericType, this.options.dataMode);
		},
		_applyGroups: function (integerDigits, groups, groupSeparator) {
			var digitsPosition = integerDigits.length - 1, br = 1,
				l = groups.length, digitsLimit = 0, group;
			group = (groups.length > 0) ? groups[ 0 ] : 0;

			// The first group is longer than the integer - we can't insert group separator
			if (group > integerDigits.length || group === 0) {
				return integerDigits;
			}

			// If the value is negative we need to skip the minus sign
			if (parseFloat(integerDigits) < 0) {
				digitsLimit = 1;
			}
			for (digitsPosition; digitsPosition > digitsLimit; digitsPosition--) {

				// Group size exceeded - we need to insert group separator
				if (--group === 0) {
					integerDigits = integerDigits.substring(0, digitsPosition) +
						groupSeparator + integerDigits.substring(digitsPosition);
					if (br === l) {
						// We are on the last group
						group = groups[ --br ];
					} else {
						group = groups[ br ];
						br++;
					}
				}
			}
			return integerDigits;
		},
		_enterEditMode: function () { //NumericEditor
			if (!$.ig.util.isIE8) {
				this._editorInput.attr("type", "tel");
			}
			if (this._valueInput.val() < 0) {

				// Remove negative css into edit mode
				this._editorInput.removeClass(this.css.negative);
			}
			this._super();
		},
		_getEditModeValue: function (val) { //NumericEditor
			// value must be numeric
			if (this.options.scientificFormat) {
				val = Number(val).toExponential()
					.replace("e", this._getScientificFormat())
					.replace("+", "");
			} else if (val.toString().indexOf("e") !== -1) {
				val = this._convertScientificToNumeric(val).replace("+", "");
			}
			if (this.options.decimalSeparator !== ".") {
				val = val.toString().replace(".", this.options.decimalSeparator);
			}
			if (this.options.negativeSign !== "-") {
				val = val.toString().replace("-", this.options.negativeSign);
			}
			return val;
		},
		_exitEditMode: function () { //NumericEditor
			this._super();
			if (this.value() < 0) {
				this._editorInput.addClass(this.css.negative);
			} else {
				this._editorInput.removeClass(this.css.negative);
			}
		},
		_getSpinValue: function (spinType, currentValue, delta) { //NumericEditor
			var fractional, scientificPrecision, spinPrecision, valuePrecision,
				spinDelta, toFixedVal, precision, spinDeltaValue = this.options.spinDelta;

			// currentValue much be a valid number string
			if (delta) {
				spinDeltaValue = Number(delta);
			}
			if (currentValue.toString().toLowerCase().indexOf("e") !== -1) {

				// Number is in scientific format
				currentValue = Number(currentValue);
				if (spinDeltaValue.toString().toLowerCase().indexOf("e") === -1) {
					spinDelta = Number(spinDeltaValue.toExponential());
				} else {
					spinDelta = spinDeltaValue;
				}

				if (spinType === "spinUp") {
					currentValue += spinDelta;
				} else {
					currentValue -= spinDelta;
				}
			} else if (currentValue.toString().indexOf(".") !== -1) {
				fractional = currentValue
					.substring(currentValue.toString().indexOf(".") + 1);

				toFixedVal = fractional.toString().length;

				currentValue = currentValue / 1;

				// D.P. value is already float, always use precision
				if (spinDeltaValue.toString().toLowerCase().indexOf("e") !== -1) {
					currentValue = Number(currentValue.toExponential());
					scientificPrecision = spinDeltaValue.toString().toLowerCase()
						.substring(spinDeltaValue.toString()
							.toLowerCase().indexOf("e") + 1);
					spinPrecision = Math.abs(scientificPrecision);
				} else {
					spinPrecision = spinDeltaValue.toString().toLowerCase()
						.substring(spinDeltaValue.toString()
							.toLowerCase().indexOf(".") + 1).length;
					valuePrecision = currentValue.toString()
						.substring(currentValue.toString().indexOf(".") + 1).length;
					spinPrecision = valuePrecision > spinPrecision ?
						valuePrecision :
						spinPrecision;
				}
				precision = Math.pow(10, spinPrecision);
				if (spinType === "spinUp") {
					if (currentValue === 0 && scientificPrecision) {

						// We guarantee we have spin delta in scientific format
						currentValue = spinDeltaValue.toFixed(spinPrecision);
					} else {
						currentValue = (Math.round(currentValue * precision) +
							Math.round(spinDeltaValue * precision)) / precision;
					}
				} else {
					if (currentValue === 0 && scientificPrecision) {

						// We guarantee we have spin delta in scientific format
						currentValue = (-spinDeltaValue).toFixed(spinPrecision);
					} else {
						currentValue = (Math.round(currentValue * precision) -
							Math.round(spinDeltaValue * precision)) / precision;
					}
				}

				// We need to call to fixed only in case current fractional lenth is less than it originally was.
				if (currentValue.toString().substring(currentValue
					.toString().indexOf(".") + 1).length < fractional.length) {
					currentValue = currentValue.toFixed(toFixedVal);
				}
			} else {
				currentValue = currentValue / 1;
				if (spinDeltaValue % 1 === 0) {

					// Integer value
					if (spinType === "spinUp") {
						currentValue += spinDeltaValue;
					} else {
						currentValue -= spinDeltaValue;
					}
				} else {
					if (spinDeltaValue.toString().toLowerCase().indexOf("e") !== -1) {
						scientificPrecision = spinDeltaValue.toString().toLowerCase()
							.substring(spinDeltaValue.toString()
								.toLowerCase().indexOf("e") + 1);
						spinPrecision = Math.abs(scientificPrecision);
					} else {
						spinPrecision = spinDeltaValue.toString().toLowerCase()
							.substring(spinDeltaValue.toString()
								.toLowerCase().indexOf(".") + 1).length;
					}
					precision = Math.pow(10, spinPrecision);
					if (spinType === "spinUp") {
						if (currentValue === 0) {

							// We guarantee we have spin delta in scientific format
							currentValue = spinDeltaValue.toFixed(spinPrecision);
						} else {
							currentValue = (Math.round(currentValue * precision) +
								Math.round(spinDeltaValue * precision)) / precision;
						}
					} else {
						if (currentValue === 0) {

							// We guarantee we have spin delta in scientific format
							currentValue = (-spinDeltaValue).toFixed(spinPrecision);
						} else {
							currentValue = (Math.round(currentValue * precision) -
								Math.round(spinDeltaValue * precision)) / precision;
						}
					}
				}
			}
			return currentValue;
		},
		_spinUp: function (delta) { //NumericEditor
			var currVal, noCancel;

			if (this._dropDownList && this.options.isLimitedToListValues) {
				this._spin("up");
				return;
			}
			if (this._focused) {
				currVal = this._valueFromText(this._editorInput.val()).toString();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinUp", currVal, delta);

			// A. M. April 5th, 2017 #896 spinWrapAround doesn't spin to minValue if there is no maxValue set
			if ((currVal > this.options.maxValue &&
				this.options.spinWrapAround) || currVal < this.options.minValue ||
				(this._currentInputTextValue === this.options.maxValue.toString() &&
				this.options.spinWrapAround)) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValExceededWrappedAroundErrMsg,
						this.options.maxValue));
			} else if (currVal >= this.options.maxValue && !this.options.spinWrapAround) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValErrMsg,
						this.options.maxValue));
			}
			if (this._focused) {
				currVal = this._getEditModeValue(currVal);
				this._editorInput.val(currVal);
				this._processTextChanged();
			} else {
				noCancel = this._triggerValueChanging(currVal);

				// Trigger value changing
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},
		_editorIsCleared: function () { //NumericEditor
			var result = false, currentVal = this._editorInput.val();
			if (currentVal === "" || currentVal === "0") {
				result = true;
			}
			return result;
		},
		_spinDown: function (delta) { //NumericEditor
			var currVal, noCancel;

			if (this._dropDownList && this.options.isLimitedToListValues) {
				this._spin("down");
				return;
			}
			if (this._focused) {
				currVal = this._valueFromText(this._editorInput.val()).toString();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinDown", currVal, delta);
			if ((currVal < this.options.minValue &&
				this.options.spinWrapAround) || currVal > this.options.maxValue ||
				(this._currentInputTextValue === this.options.minValue.toString() &&
				this.options.spinWrapAround)) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValExceededWrappedAroundErrMsg,
						this.options.minValue));

			} else if (currVal <= this.options.minValue && !this.options.spinWrapAround) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValErrMsg,
						this.options.minValue));
			}
			if (this._focused) {
				currVal = this._getEditModeValue(currVal);
				this._editorInput.val(currVal);
				this._processTextChanged();
			} else {

				// Trigger value changing
				noCancel = this._triggerValueChanging(currVal);
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},
		_exceedsMaxValue: function(value) {  //NumericEditor
			if (this.options.isLimitedToListValues) {
				return this._super(value);
			}
			return this.options.maxValue !== null && value >= this.options.maxValue;
		},
		_lessThanMinValue: function(value) { //NumericEditor
			if (this.options.isLimitedToListValues) {
				return this._super(value);
			}
			return this.options.minValue !== null && value <= this.options.minValue;
		},
		_handleSpinUpEvent: function () {
			if (this._dropDownList && this.options.isLimitedToListValues) {
				// default to text list selection
				this._super();
			} else {
				this._spinUp();
				if (this._focused) {
					this._editorInput.select();
				}
			}
		},
		_handleSpinDownEvent: function () {
			if (this._dropDownList && this.options.isLimitedToListValues) {
				// default to text list selection
				this._super();
			} else {
				this._spinDown();
				if (this._focused) {
					this._editorInput.select();
				}
			}
		},
		_setSpinButtonsState: function (val) {
			val = this._valueFromText(val);
			this._super(val);
		},

		// igNumericEditor public methods
		value: function (newValue) { // Numeric Editor
			/* Gets/Sets editor value.
			```
				$(".selector").%%WidgetName%%("value", 25);
			```
				paramType="number" optional="true" New editor value.
				returnType="number" Current editor value. */
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (newValue !== null && !isNaN(this._parseNumericValueByMode(newValue,
					this._numericType, this.options.dataMode))) {
					if (newValue !== "" && !isNaN(newValue)) {

						// I.G. 29/11/2016 #539 'If min/max value is set to 0 and the entered value is invalid, the editor's value is not reverted'
						if (!isNaN((this.options.maxValue)) && newValue > this.options.maxValue) {
							newValue = this.options.maxValue;

							// Raise Warning level 2
							this._sendNotification("warning",
								$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
									this.options.maxValue));

							// I.G. 29/11/2016 #539 'If min/max value is set to 0 and the entered value is invalid, the editor's value is not reverted'
						} else if (!isNaN((this.options.minValue)) && newValue < this.options.minValue) {
							newValue = this.options.minValue;

							// Raise Warning level 2
							this._sendNotification("warning",
								$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
									this.options.value));
						}
					}
					if (this._validateValue(newValue)) {
						this._updateValue(newValue);
						if (!this._focused) {
							this._editorInput.val(this._getDisplayValue());
						} else {
							this._enterEditMode();
						}
					} else {
						if (newValue < this.options.minValue) {
							newValue = this.options.minValue;
						} else if (newValue > this.options.maxValue) {
							newValue = this.options.maxValue;
						}
						this._updateValue(newValue);
						if (!this._focused) {
							this._editorInput.val(this._getDisplayValue());
						} else {
							this._enterEditMode();
						}
					}
					this._setSpinButtonsState(newValue);
				} else {
					if (this.options.revertIfNotValid &&
					!(newValue === null && this.options.allowNullValue)) {
						newValue = this._valueInput.val();
						this._updateValue(newValue);
					} else {
						this._clearValue();
					}
				}
				if (newValue < 0) {
					this._editorInput.addClass(this.css.negative);
				} else {
					this._editorInput.removeClass(this.css.negative);
				}
			} else {
				return this.options.value;
			}

			// N.A. January 3th, 2017 #665: Update button state, when value is changed using API method.
			this._checkClearButtonState();
		},
		findListItemIndex: function (number) {
			/* Finds index of list item by text that matches with the search parameters.
			```
				$(".selector").%%WidgetName%%("findListItemIndex");
			```
				paramType="number" optional="false" The text to search for.
				returnType="number" Returns index of the found item. */
			var list = this.options.listItems, i;

			for (i = 0; i < list.length; i++) {
				if (this._parseNumericValueByMode(list[ i ],
					this._numericType, this.options.dataMode) === number) {
					return i;
			}
		}
			return -1;
		},
		getSelectedText: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		getSelectionStart: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		getSelectionEnd: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		spinUp: function (delta) {
			/* Increments value in editor according to the parameter or selects the previous item from the drop-down list if [isLimitedToListValues](ui.%%WidgetNameLowered%%#options:isLimitedToListValues) is enabled.
			```
				$(".selector").%%WidgetName%%("spinUp");
			```
				paramType="number" optional="true" Increments value. */
			this._spinUp(delta);
		},
		spinDown: function (delta) {
			/* Decrements value in editor according to the parameter selects the next item from the drop-down list if [isLimitedToListValues](ui.%%WidgetNameLowered%%#options:isLimitedToListValues) is enabled.
			```
				$(".selector").%%WidgetName%%("spinDown");
			```
				paramType="number" optional="true" Decrement value. */
			this._spinDown(delta);
		},
		selectListIndexUp: function () {
			/* @Deprecated@ This method is deprecated in favor of [spinUp](ui.%%WidgetNameLowered%%#options:spinUp).
			```
				$(".selector").%%WidgetName%%("selectListIndexUp");
			```
			*/
			this._spinUp();
		},
		selectListIndexDown: function () {
			/* @Deprecated@ This method is deprecated in favor of [spinDown](ui.%%WidgetNameLowered%%#options:spinDown).
			```
				$(".selector").%%WidgetName%%("selectListIndexDown");
			```
			*/
			this._spinDown();
		},
		getRegionalOption: function () {
			/* Gets current regional.
			```
				$(".selector").%%WidgetName%%("getRegionalOption");
			```
				returnType="string" Current regional */
			return this._getRegionalOption();
		}
	});
	$.widget("ui.igCurrencyEditor", $.ui.igNumericEditor, {
		options: {
			/* type="string" Gets/Sets the string, which is used as positive pattern. The "n" flag represents the value of number.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set.
				```
					//Initialize
					$(".selector").igCurrencyEditor({
						positivePattern : "+  n"
					});

					//Get
					var pattern = $(".selector").igCurrencyEditor("option", "positivePattern");

					//Set
					$(".selector").igCurrencyEditor("option", "positivePattern", "+  n");
				```
				*/
			positivePattern: null,
			/* type="string" Gets/Sets a string that is used as the currency symbol that is shown in display mode.
			```
				//Initialize
				$(".selector").igCurrencyEditor({
					currencySymbol: "*"
				});

				//Get
				var currencySymbol = $(".selector").igCurrencyEditor("option", "currencySymbol");

				//Set
				$(".selector").igCurrencyEditor("option", "currencySymbol", "*");
			```
			*/
			currencySymbol: null

		},
		events: {
			/* igWidget events go here */
		},
		_create: function () { //Currency editor
			$.ui.igNumericEditor.prototype._create.call(this);
		},
		_setNumericType: function () {
			this._numericType = "currency";
		},
		_applyRegionalSettings: function () { //igCurrencyEditor

			this.options.negativeSign = this._getRegionalOption("negativeSign");
			this.options.currencySymbol = this._getRegionalOption("currencySymbol");
			this.options.positivePattern = this.options.positivePattern ||
				this._getRegionalOption("currencyPositivePattern");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("currencyNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("currencyDecimalSeparator");
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("currencyGroupSeparator");
			this.options.groups = this.options.groups ||
				this._getRegionalOption("currencyGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("currencyMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("currencyMinDecimals") :
				this.options.minDecimals;
		},

		// igCurrencyEditor public methods
		currencySymbol: function (symbol) {
			/* Gets/sets a string that is used as the currency symbol shown with the number in the input. The value provided as a param is propagated to the currencySymbol option and thus has the same priority as the option.
				```
					$(".selector").igCurrencyEditor("currencySymbol", "$");
				```
				paramType="sting" optional="true" New currency symbol.
				returnType="string" Current currency symbol. */
			if (symbol) {
				this.options.currencySymbol = symbol;
			} else {
				return this.options.currencySymbol;
			}
		}
	});
	$.widget("ui.igPercentEditor", $.ui.igNumericEditor, {
		options: {
			/* type="string" Gets/Sets the pattern for positive numeric values, which is used in display (no focus) state.
				If you use the "en-US" culture the default value for "positivePattern" will be "n$" where the "$" flag represents the "numericSymbol" and the "n" flag represents the value of the number.
				Note: this option has priority over possible regional settings.
				```
				//Initialize
				$(".selector").igPercentEditor({
					positivePattern : "+ n"
				});

				//Get
				var pattern = $(".selector").igPercentEditor("option", "positivePattern");

				//Set
				$(".selector").igPercentEditor("option", "positivePattern", "+ n");
				```
				*/
			positivePattern: null,
			/* type="string" Gets/Sets the symbol, which is used in display (no focus) state.
				Note: this option has priority over possible regional settings.
				```
				//Initialize
				$(".selector").igPercentEditor({
					percentSymbol: "pc"
				});

				//Get
				var percentSymbol= $(".selector").igPercentEditor("option", "percentSymbol");

				//Set
				$(".selector").igPercentEditor("option", "percentSymbol", "pc");
				```
				*/
			percentSymbol: null,
			/* type="number" Gets/Sets the factor which is used for the get and set of the "value" method.
				On get the number (string) entered by the user is divided by that factor and on set the number (string) displayed in the editor is multiplied by that factor.
				For example, if the factor is 100 and the "value" is set to 0.123, then the editor will show string "12.3".
				Possible values: 1 or 100.
				Note: this option has priority over possible regional settings.
				```
				//Initialize
				$(".selector").igPercentEditor({
					displayFactor : 100
				});

				//Get
				var factor = $(".selector").igPercentEditor("option", "displayFactor");

				//Set
				$(".selector").igPercentEditor("option", "displayFactor", 100);
				```
				*/
			displayFactor: 100,
			/* type="double|float|long|ulong|int|uint|short|ushort|sbyte|byte" Defines the range that editor's value can accept.
			This is achieved by setting the [minValue](ui.igPercentEditor#options:minValue) and [maxValue](ui.igPercentEditor#options:maxValue) editor's options, accordingly to the lowest and highest accepted values for the defined numeric mode.
			The range for the specific type follows the numeric type standards, e.g. in .NET Framework  [floating-point](https://msdn.microsoft.com/en-us/library/9ahet949.aspx) types and [integral types](https://msdn.microsoft.com/en-us/library/exx3b86w.aspx).
			In addition, the maximum value that can be set to [minDecimals](ui.igPercentEditor#options:minDecimals) and [maxDecimals](ui.igPercentEditor#options:maxDecimals) options can be 15, when editor is in 'double' mode and 7, when in 'float' mode.
				```
				//Initialize
				$(".selector").igPercentEditor({
					dataMode : "double"
				});

				//Get
				var dataMode = $(".selector").igPercentEditor("option", "dataMode");

				```
				double type="string" the Number object is used with the limits of a double and if the value is not set, then the null or Number.NaN is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue). Note: that is used as default.
				float type="string" the Number object is used with the limits of a float and if the value is not set, then the null or Number.NaN is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				long type="string" the Number object is used with the limits of a signed long and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				ulong type="string" the Number object is used with the limits of an unsigned long and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				int type="string" the Number object is used with the limits of a signed int and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				uint type="string" the Number object is used with the limits of an unsigned int and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				short type="string" the Number object is used with the limits of a signed short and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				ushort type="string" the Number object is used with the limits of an unsigned short and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				sbyte type="string" the Number object is used with the limits of a signed byte and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
				byte type="string" the Number object is used with the limits of an unsigned byte and if the value is not set, then the null or 0 is used depending on the option [allowNullValue](ui.igpercenteditor#options:allowNullValue).
			*/
			dataMode: "float", // TODO maybe it should be "double"?
			/* type="number" Gets/Sets the default delta-value which is used with "spin" [buttonType](ui.igpercenteditor#options:buttonType) or [spinUp](ui.igpercenteditor#methods:spinUp) and [spinDown](ui.igpercenteditor#methods:spinDown) methods to increment or decrement value in the editor. The value can not be negative. Non integer value is supported only for dataMode double and float.
			```
			//Initialize
			$(".selector").igPercentEditor({
				spinDelta: 2
			});

			//Get
			var spinDelta= $(".selector").igPercentEditor("option", "spinDelta");

			//Set
			$(".selector").igPercentEditor("option", "spinDelta", 2);
			```
			*/
			spinDelta: 0.01
		},
		events: {
		},
		_create: function () { //Percent
			$.ui.igNumericEditor.prototype._create.call(this);
		},
		_setNumericType: function () {
			this._numericType = "percent";
		},
		_insert: function (newValue, previousValue, selection) { // Percent Editor
			var newLenght = newValue.length, diff;
			if (!isNaN(newValue = this._parseNumericValueByMode(newValue,
				this._numericType, this.options.dataMode))) {
				if (!isNaN(this.options.maxValue) &&
					newValue / this.options.displayFactor > this.options.maxValue) {
					newValue = this.options.maxValue * this.options.displayFactor;

					//Notify
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));
				} else if (!isNaN(this.options.minValue) &&
					newValue / this.options.displayFactor < this.options.minValue) {
					newValue = this.options.minValue * this.options.displayFactor;

					//Notify
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
						this.options.minValue));
				}

				if (!this._validateValue(newValue / this.options.displayFactor) &&
					this.options.revertIfNotValid) {
					newValue = previousValue;
				}
			} else if (this.options.revertIfNotValid) {
				newValue = previousValue;
			} else {
				newValue = "";
			}
			if (this._editMode) {
				this._editorInput.val(newValue);
				if (selection !== undefined) {
					// Move the caret, account for cuts from number parsing:
					diff = newLenght - newValue.toString().length;
					selection.start -= diff;
					selection.end -= diff;
					this._setSelectionRange(this._editorInput[ 0 ], selection.start, selection.end);
				}
			} else {
				newValue = this._divideWithPrecision(newValue, this.options.displayFactor);
				this._processInternalValueChanging(newValue);
				this._exitEditMode();
			}
			this._setSpinButtonsState(newValue / this.options.displayFactor);
			this._processTextChanged();
		},
		_applyRegionalSettings: function () { //Percent

			this.options.negativeSign = this.options.negativeSign ||
				this._getRegionalOption("negativeSign");
			this.options.percentSymbol = this.options.percentSymbol ||
				this._getRegionalOption("percentSymbol");
			this.options.positivePattern = this.options.positivePattern ||
				this._getRegionalOption("percentPositivePattern");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("percentNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("percentDecimalSeparator");
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("percentGroupSeparator");
			this.options.groups = this.options.groups ||
				this._getRegionalOption("percentGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("percentMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("percentMinDecimals") :
				this.options.minDecimals;
			if (this.options.displayFactor === 100) {
				// TODO - this is needed, cause when value(20.34) is devided by 100, then it becomes 0.2034, and if maxDecimals is 2 then it will be cut to 0.20
				this.options.maxDecimals += 2;
			}
			this.options.displayFactor = this.options.displayFactor ||
				this._getRegionalOption("displayFactor");
			if (typeof this.options.displayFactor !== "number") {
				throw new Error($.ig.Editor.locale.displayFactorIsOfTypeNumber);
			} else if (this.options.displayFactor !== 1 && this.options.displayFactor !== 100) {
				throw new Error($.ig.Editor.locale.displayFactorAllowedValue);
			}
		},
		_setOption: function (option, value) { // igPercentEditor
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "displayFactor": {
					if (typeof value !== "number") {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.displayFactorIsOfTypeNumber);
					} else if (value !== 1 && value !== 100) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.displayFactorAllowedValue);
					}
				}
					break;
				default: {
					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_getEditModeValue: function (val) { //igPercentEditor
			// value must be numeric
			if (val !== "" && !isNaN(val)) {
				// I.G. 11/1/2017 #695 '[igPercentEditor] Focusing the widget causes it's value to be multiplied by 10000 when using regional "de-DE"'
				val = this._multiplyWithPrecision(parseFloat(val), this.options.displayFactor);
			}
			return this._super(val);
		},
		_valueFromText: function (text) { //igPercentEditor
			var val = this._parseNumericValueByMode(text, this._numericType, this.options.dataMode);
			return this._divideWithPrecision(val, this.options.displayFactor);
		},

		// igPercentEditor public methods
		insert: function (string) {
			/* Paste text at location of the caret or over the current selection. Best used during editing, as the method will instead set the text as value (modified by the [displayFactor](ui.igpercenteditor#options:displayFactor)) if the editor is not focused.
				Note: the method raises the [textChanged](ui.igpercenteditor#events:textChanged) event.
				paramType="string" optional="false" The string to be inserted.
				```
				$('.selector').igPercentEditor({
					blur: function (evt, ui) {
						// insert 0 as the user leaves the field
						ui.owner.insert("0");
					}
				});
				```
			*/
			this._insertHandler(string);
		},
		percentSymbol: function (symbol) {
			/* Gets/Sets a string that is used as the percent symbol shown with the number in the input. The value provided as a param is propagated to the [percentSymbol](ui.igpercenteditor#options:percentSymbol) option and thus has the same priority as the option.
				```
				$(".selector").igPercentEditor("percentSymbol", "pc");
				```
				paramType="sting" optional="true" New percent symbol.
				returnType="string" Current percent symbol. */
			if (symbol) {
				this.options.percentSymbol = symbol;
			} else {
				return this.options.percentSymbol;
			}

		}
	});
	$.widget("ui.igMaskEditor", $.ui.igTextEditor, {
		options: {
			/* type="object" Gets custom regional settings for editor. If it is string, then $.ig.regional[stringValue] is assumed.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					regional: "en-US"
				});

				//Get
				var region = $(".selector").%%WidgetName%%("option", "regional");
				```
			*/
			regional: null,
			/*type="clear|none" Gets visibility of the clear button. That option can be set only on initialization.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					buttonType : "clear"
				});

				//Get
				var button = $(".selector").%%WidgetName%%("option", "buttonType");
				```
				clear type="string" A button to clear the value is located on the right side of the editor.
			*/
			buttonType: "none",
			/* type="string" Gets input mask. Mask may include filter-flags and literal characters.
				Literal characters are part of mask which cannot be modified by end user. In order to use a filter-flag as a literal character, the escape "\\" character should be used.
				Default is "CCCCCCCCCC"
				Note: optional flags/entries affect the value returned by get of the [value](ui.igmaskeditor#methods:value) methods.
				List of filter-flags:
				C: any keyboard character. Entry is optional.
				&: any keyboard character. Entry is required.
				a: letter or digit character. Entry is optional.
				A: letter or digit character. Entry is required.
				?: letter character. Entry is optional.
				L: letter character. Entry is required.
				9: digit character. Entry is optional.
				0: digit character. Entry is required.
				#: digit character or "+" or "_". Entry is optional with replacement by [emptyChar](ui.igmaskeditor#options:emptyChar) or by [padChar](ui.igmaskeditor#options:padChar).
				>: all letters to the right are converted to the upper case. In order to disable conversion, the ">" flag should be used again.
				<: all letters to the right are converted to the lower case. In order to disable conversion, the "<" flag should be used again.
				Note! This option can not be set runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					inputMask : "cccccccccc"
				});

				//Get
				var inputMask = $(".selector").%%WidgetName%%("option", "inputMask");
				```
			*/
			inputMask: "CCCCCCCCCC",
			/* type="rawText|rawTextWithRequiredPrompts|rawTextWithAllPrompts|rawTextWithLiterals|rawTextWithRequiredPromptsAndLiterals|allText" It affects the value of the control (value method/option and submitted in forms). It defines what the value should contain from text, unfilled prompts and literals. The default is allText and when used value method/option returns the text entered, all prompts (positions) and literals.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					dataMode : "rawTextWithLiterals"
				});

				//Get
				var dataMode = $(".selector").%%WidgetName%%("option", "dataMode");

				```
				rawText type="string" only entered text. All unfilled prompts (positions) and literals are ignored (removed).
				rawTextWithRequiredPrompts type="string" only entered text and required prompts (positions). All optional unfilled prompts and literals are ignored (removed)
				rawTextWithAllPrompts type="string" only entered text and prompts (positions). All literals are ignored (removed).
				rawTextWithLiterals type="string" only entered text and literals. All unfilled prompts are ignored (removed).
				rawTextWithRequiredPromptsAndLiterals type="string" only entered text, required prompts (positions) and literals. All optional unfilled prompts are ignored (removed).
				allText type="string" entered text, all prompts (positions) and literals. Note: that is used as default.
			*/
			dataMode: "allText",
			/* type="string" Gets character which is used as prompt in edit mode for available entry position.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					unfilledCharsPrompt : "*"
				});

				//Get
				var prompt = $(".selector").%%WidgetName%%("option", "unfilledCharsPrompt");
				```
			*/
			unfilledCharsPrompt: "_",
			/* type="string" Gets/Sets character which is used as replacement of not-filled required position in mask when editor is in display mode (not focused).
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					padChar: "*"
				});

				//Get
				var padChar= $(".selector").%%WidgetName%%"option", "padChar");

				//Set
				$(".selector").%%WidgetName%%("option", "padChar", "*");
				```
			*/
			padChar: " ",
			/* type="string" Gets/Sets character which is used as replacement of not-filled required position in mask when application calls get for the [value](ui.igmaskeditor#methods:value) methods.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					emptyChar: "*"
				});

				//Get
				var emptyChar= $(".selector").%%WidgetName%%("option", "emptyChar");

				//Set
				$(".selector").%%WidgetName%%("option", "emptyChar", "*");
				```
			*/
			emptyChar: " ",
			/* type="string" Gets ability to enter only specific characters in input-field from keyboard and on paste.
				Notes:
				If "excludeKeys" option contains same characters as this option, then "excludeKeys" has priority.
				Note! This option can not be se runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					includeKeys: "ABC"
				});

				//Get
				var includedKeys= $(".selector").%%WidgetName%%("option", "includeKeys");
				```
				*/
			includeKeys: null,
			/* type="string" Gets ability to prevent entering specific characters from keyboard or on paste.
				Notes:
				If a character is specified in "includeKeys" option also, then "excludeKeys" has priority.
				Note! This option can not be se runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					excludeKeys: "ABC"
				});

				//Get
				var excludedKeys= $(".selector").%%WidgetName%%("option", "excludeKeys");
				```
				*/
			excludeKeys: null,
			/* type="bool" @Ignored@ Gets/Sets the ability of the editor to automatically change the hoverd item into the opened dropdown list to its oposide side.*/
			spinWrapAround: false,
			/* type="array" @Ignored@ Sets gets list of items which are used for drop-down list.
				Items in list can be strings, numbers or objects. The items are directly rendered without casting, or manipulating them.
			 */
			listItems: null,
			/* type="number" @Ignored@ Sets gets custom width of drop-down list in pixels. If value is equal to 0 or negative, then the width of editor is used. */
			listWidth: 0,
			/* type="number" @Ignored@ Sets the hover/unhover animation duration. */
			listItemHoverDuration: 0,
			/* type="bool" @Ignored@ Sets the ability to allow values only set into the list items. This validation is done only when the editor is blured, or enter key is pressed*/
			isLimitedToListValues: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igMaskEditor */
			dropDownOrientation: "auto",
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igMaskEditor */
			dropDownAttachedToBody: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igMaskEditor */
			dropDownAnimationDuration: 300,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igMaskEditor */
			dropDownOnReadOnly: false,
			/* type="text|password|multiline" @Ignored@
			*/
			textMode: "text",
			/* type="number" @Ignored@ Gets/Sets how many items should be shown at once.
				Notes:
				That option is overwritten if the number of list items is less than the value. In that case the height of the dropdown is adjusted to the number of items.
				Note! This option can not be set runtime.
			*/
			visibleItemsCount: 5,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igMaskEditor
			*/
			maxLength: null,
			/* type="object" Gets/Sets value in editor. The effect of setting/getting that option depends on type of editor and on dataMode options for every type of editor.
			```
			//Initialize
			$(".selector").%%WidgetName%%({
				value : "0415565685"
			});

			//Get
			var value = $(".selector").%%WidgetName%%("option", "value");

			//Set
			$(".selector").%%WidgetName%%("option", "value", "0415565685");

			```
			*/
			value: null
		},
		events: {
			/* igWidget events go here */
			/* @Ignored@ */
			dropDownListOpening: "dropDownListOpening",
			/* @Ignored@ */
			dropDownListOpened: "dropDownListOpened",
			/* @Ignored@ */
			dropDownListClosing: "dropDownListClosing",
			/* @Ignored@ */
			dropDownListClosed: "dropDownListClosed",
			/* @Ignored@ */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* @Ignored@ */
			dropDownItemSelected: "dropDownItemSelected"
		},
		_create: function () { //igMaskEditor
			$.ui.igTextEditor.prototype._create.call(this);
		},
		_initialize: function () {
			this._super();
			if (this.options.maxLength) {

				// In case of explicidly set length as an option, we remove it because that option is controlled by the mask
				this.options.maxLength = null;
			}
			if (this.options.listItems) {

				// In case of mask editor we're not supporting listItems. When the listItems are disabled,1890 there are no spin buttons rendered.
				this.options.listItems = null;
			}
			if (this._maskFlagsArray) {
				this._maskFlagsArray = $.merge(this._maskFlagsArray,
					[ "C", "&", "a", "A", "?", "L", "9", "0", "<", ">", "#" ]);
			} else {
				this._maskFlagsArray = [ "C", "&", "a", "A", "?", "L", "9", "0", "<", ">", "#" ];
			}
			this._promptCharsIndices = [];

			//M.S. 4/19/2017. Issue 892 Initially when allowNullValue is true and the value is not set, the value should be equal to nullValue
			if (this.options.allowNullValue && !this.options.value && this.options.nullValue) {
				this.options.value = this.options.nullValue;
			}
		},
		_applyOptions: function () { //igMaskEditor
			this._getMaskLiteralsAndRequiredPositions();

			// In case value is not set we need to use the setInitialValue method to store mask, required field indeces, prompt indeces etc.
			this._super();
			/*if (this.options.value === null) {
				if (this.options.allowNullValue) {
				this._setInitialValue();
				} else {
					this._setInitialValue("");
				}
			} else if (this.options.value === undefined) {
				this._setInitialValue();
			}*/
		},

		_getEditModeValue: function () { // MaskEditor
			// Use already parsed mask, other uses already handled by _parseValueByMask
			if (this._maskedValue === "") {
				return this._maskWithPrompts;
			} else {
				return this._maskedValue;
			}
		},
		_insert: function (newValue, previousValue, selection) { // MaskEditor
			if (this.options.toUpper) {
				if (newValue) { newValue = newValue.toLocaleUpperCase(); }
			} else if (this.options.toLower) {
				if (newValue) { newValue = newValue.toLocaleLowerCase(); }
			}
			this._promptCharsIndices = [];

			if (this._editMode) {
				newValue = this._parseValueByMask(newValue);
				this._editorInput.val(newValue);
				if (selection !== undefined) {
					// Move the caret
					this._setSelectionRange(this._editorInput[ 0 ], selection.start, selection.end);
				}
			} else if (newValue !== previousValue) {
				newValue = this._parseValueByMask(newValue);
				this._processInternalValueChanging(newValue);
				this._exitEditMode();
			}
			this._processTextChanged();
		},
		_pasteHandler: function (e, drop) { // MaskEditor Handler
			var self = this, previousValue = $(e.target).val(), newValue, data, selection,
				dtObj = drop ? e.originalEvent.dataTransfer :
					(e.originalEvent && e.originalEvent.clipboardData) ||
					window.clipboardData;

			// Don't use "text/plain" - IEs error out. Per spec the DataTransfer getData will:
			// Convert to lower case and change "text" to "text/plain", making "Text" universal
			data = dtObj && dtObj.getData("Text");
			this._currentInputTextValue = this._editorInput.val();

			this._timeouts.push(setTimeout(function () {
				selection = self._getSelection(e.target);
				if (selection.start === selection.end) {
					selection.start -= data.length;
					newValue = self._replaceDisplayValue(selection, previousValue, data);
					selection.start = selection.end;
				} else {
					newValue = self._replaceDisplayValue(selection, previousValue, data);
				}

				if (self._validateValueAgainstMask(newValue)) {
					self._insert(newValue, previousValue, selection);
				} else {
					if (self.options.revertIfNotValid) {
						newValue = self._valueInput.val();
						self._updateValue(newValue);
					} else {
						self._clearValue();
					}
					if (self._focused) {
						self._enterEditMode();
					}
				}

				if (drop) {
					if (self._editorInput.is(":focus")) {
						// fire focus if it was ignored initally
						self._triggerFocus(e);
					} else {
						self._processValueChanging(newValue);
						self._focused = false;
						self._exitEditMode();
					}
				}
			}, 10));
		},
		_replaceDisplayValue: function (selection, previousValue, newValue) { // MaskEditor
			var value = previousValue, i = selection.start, j = 0,
				currentChar, newChar;
			newValue = newValue.toString();
			for (; i < previousValue.length && j < newValue.length; i++, j++) {
				currentChar = previousValue.charAt(i);
				newChar = newValue.charAt(j);
				if ($.inArray(i, this._literalIndeces) !== -1) {
					if (currentChar !== newChar) {
						//skip over literal and extend selection
						selection.end++;
						j--;
					}
				} else {
					value = value.substring(0, i) + newChar +
						value.substring(i + 1, previousValue.length);
				}
			}
			return value;
		},
		_attachEvents: function () { //MaskEditor
			var self = this;
			self._super();
			this._editorInput.on({
				"dragend.editor": function () {
					self._handleDeleteKey(true);
				},
				"cut.editor": function () {
					self._handleDeleteKey(true);
				}
			});
		},
		_detachEvents: function () {
			this._super();
			this._editorInput.off("cut.editor dragend.editor");
		},
		_getMaskLiteralsAndRequiredPositions: function() {
			// This method returns array of indexes which represent literals into edit mode.
			var mask, literalIndeces = [], requiredFieldsIndeces = [],
				maskFlagsArray = this._maskFlagsArray, output, maskChar, unescapedMask, i, j,
			isToLower = false, isToUpper = false, toLowerIndeces = [], toUpperIndeces = [];

			output = unescapedMask = mask = this.options.inputMask;

			// j stands for real index, after we remove escape chars
			for (i = 0, j = 0; i < mask.length; i++, j++) {
				maskChar = mask.charAt(i);
				if ($.inArray(maskChar, maskFlagsArray) !== -1) {

					// Get requred chars
					// #364 In case of digit mask char, toLower and toUpper flags should be ignored
					if (isToLower && maskChar !== "9" && maskChar !== "0" && maskChar !== "#") {
						toLowerIndeces.push(j);
					} else if (isToUpper && maskChar !== "9" && maskChar !== "0" && maskChar !== "#") {
						toUpperIndeces.push(j);
					}
					if (maskChar === "&" || maskChar === "A" ||
						maskChar === "L" || maskChar === "0") {
						requiredFieldsIndeces.push(j);
					} else if (maskChar === ">") {
						if (!isToUpper) {
							isToUpper = true;

							// toUpperIndeces.push(j);
							if (isToLower) {
								isToLower = false;
								toLowerIndeces.pop();
							}
						} else {

							// If there are two flags < all between characters are converted toUpper
							isToUpper = false;
							toUpperIndeces.pop();
						}

						// We need to remove the symbol < from the unescaped mask
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						j--;
					} else if (maskChar === "<") {
						if (!isToLower) {
							isToLower = true;

							// toLowerIndeces.push(j);
							if (isToUpper) {
								isToUpper = false;
								toUpperIndeces.pop();
							}
						} else {
							isToLower = false;
							toLowerIndeces.pop();
						}
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						j--;
					}
				} else if (maskChar === "\\") {
					if ($.inArray(mask.charAt(i + 1), maskFlagsArray) !== -1) {
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						i++;
					}
					literalIndeces.push(j);
				} else {

					// Literal add it.
					literalIndeces.push(j);
				}
			}
			this._literalIndeces = literalIndeces;
			this._requiredIndeces = requiredFieldsIndeces;
			this._toLowerIndeces = toLowerIndeces;
			this._toUpperIndeces = toUpperIndeces;

			// We need the mask into this format to be sure we have the right index when the key is pressed.
			this._unescapedMask = unescapedMask;
		},
		_validateValue: function (val) { // Mask Editor
			if (val === undefined || val === null) {
				return this._super(val);
			} else {
				return this._validateValueAgainstMask(val);
			}
		},
		_parseValueByMask: function (value) { //igMaskEditor
			var mask = this.options.inputMask, outputVal = mask,
				ch, maskFlagsArray = this._maskFlagsArray,
			length = mask.length, i, j, tempChar;

			value = value ? value.toString() : "";
			if (length && length > 0) {
				if (value.indexOf(this.options.unfilledCharsPrompt !== -1)) {
					i = 225;

					// We need to generate tempchar which is not part of both mask and value
					tempChar = String.fromCharCode(i);
					while ((mask.indexOf(tempChar) !== -1) &&
						(value.indexOf(tempChar) !== -1)) {
						i++;
					}
				}
				for (i = 0, j = 0; i < length; i++, j++) {
					ch = value.charAt(j);
					if (this._validateCharOnPostion(ch, i) === null) {

						// Move to next char on the mask
						// We need to detect Escaped chars

						if (mask.charAt(i) === "\\") {
							i++;
							j--;
						} else if (mask.charAt(i) === "<" || mask.charAt(i) === ">") {
							j--;
						}

						// In case passed value contains both literals and filled prompts we try to parse the value.
						// In case of mask 00/00 we should accept both 1234 and 12/34 as input and parse it with the correct result.
						else if ($.inArray(i, this._literalIndeces) !== -1) {
							if (mask.charAt(i) !== ch) {
								j--;
							}
						}
					} else if (this._validateCharOnPostion(ch, i) === true) {
						if (ch === this.options.unfilledCharsPrompt) {
							outputVal = this._replaceCharAt(outputVal, i, tempChar);
						} else {
							outputVal = this._replaceCharAt(outputVal, i, ch);
						}

					} else {

						// We replace with unfilledCharsPrompt
						outputVal = this
							._replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
					}
				}

				// We need to loop throught the value and remove escape chars
				for (i = 0; i < outputVal.length; i++) {
					ch = outputVal.charAt(i);
					if (ch === "\\" && $.inArray(outputVal.charAt(i + 1), maskFlagsArray) !== -1) {
						outputVal = this._replaceCharAt(outputVal, i, "");
					} else if (ch === "<" || ch === ">") {
						outputVal = this._replaceCharAt(outputVal, i, "");
						i--;
					} else if ($.inArray(i, this._toLowerIndeces) !== -1) {
						if (ch === tempChar) {
							outputVal = this._replaceCharAt(outputVal, i,
								this.options.unfilledCharsPrompt);
							this._promptCharsIndices.push(i);
						}
						outputVal = this
							._replaceCharAt(outputVal, i, outputVal.charAt(i).toLocaleLowerCase());
					} else if ($.inArray(i, this._toUpperIndeces) !== -1) {
						outputVal = this
							._replaceCharAt(outputVal, i, outputVal.charAt(i).toLocaleUpperCase());
						if (ch === tempChar) {
							outputVal = this
								._replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
							this._promptCharsIndices.push(i);
						}
					} else if (ch === tempChar) {
						outputVal = this.
							_replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
						this._promptCharsIndices.push(i);
					}
				}
			}
			return outputVal;
		},
		_getValueByDataMode: function (maskedVal) {
			var dataModeValue, regExpr, i, ch, index, tempChar,
				dataMode = this.options.dataMode;
			maskedVal = maskedVal !== undefined ? maskedVal : this._maskedValue;
			if (this._promptCharsIndices.length > 0) {
				i = 225;
				tempChar = String.fromCharCode(i);
				while (maskedVal.indexOf(tempChar) !== -1) {
					i++;
				}
				for (i = 0; i < this._promptCharsIndices.length; i++) {
					index = this._promptCharsIndices[ i ];
					maskedVal = this._replaceCharAt(maskedVal, index, tempChar);
				}
			}
			switch (dataMode) {
				case "allText": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);
						if (ch === this.options.unfilledCharsPrompt) {
							if ($.inArray(i, this._requiredIndeces) !== -1) {
								ch = this.options.emptyChar;
							} else {
								ch = "";
							}
						}
						dataModeValue += ch;
					}
					if (this._promptCharsIndices.length > 0) {
						regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
						dataModeValue = dataModeValue
							.replace(regExpr, this.options.unfilledCharsPrompt);
					}
				}
					break;
				case "rawText": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1 &&
							ch !== this.options.unfilledCharsPrompt) {
							if (this._promptCharsIndices.length > 0 && ch === tempChar) {
								dataModeValue += this.options.unfilledCharsPrompt;
							} else {
								dataModeValue += ch;
							}
						}
					}
				}
					break;
				case "rawTextWithRequiredPrompts": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {
								if ($.inArray(i, this._requiredIndeces) !== -1) {
									dataModeValue += this.options.emptyChar;
								}
							} else {
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						}
					}
				}
					break;
				case "rawTextWithAllPrompts": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {
								dataModeValue += this.options.emptyChar;
							} else {
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						}
					}
				}
					break;
				case "rawTextWithLiterals": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if (ch !== this.options.unfilledCharsPrompt) {
							if (this._promptCharsIndices.length > 0 && ch === tempChar) {
								dataModeValue += this.options.unfilledCharsPrompt;
							} else {
								dataModeValue += ch;
							}
						}
					}
				}
					break;
				case "rawTextWithRequiredPromptsAndLiterals": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {

								// Non filled required
								if ($.inArray(i, this._requiredIndeces) !== -1) {
									dataModeValue += this.options.emptyChar;
								}
							} else {

								// Filled char
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						} else {

							// Literal
							dataModeValue += ch;
						}
					}
				}
					break;
				default: {

					// If the option is not valid we default back to the allText
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);
						if (ch === this.options.unfilledCharsPrompt) {
							if ($.inArray(i, this._requiredIndeces) !== -1) {
								ch = this.options.emptyChar;
							} else {
								ch = "";
							}
						}
						dataModeValue += ch;
					}
					if (this._promptCharsIndices.length > 0) {
						regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
						dataModeValue = dataModeValue
							.replace(regExpr, this.options.unfilledCharsPrompt);
					}
				}
			}
			return dataModeValue;
		},
		_updateValue: function (value) { //igMaskEditor
			var nullValue;
			if (value === "") {

				// Convert empty value by dataMode
				this.options.value = "";
				this._valueInput.val("");
				this._maskedValue = "";
			} else if (value === null) {
				if (this.options.allowNullValue) {
					if (this.options.nullValue === null) {
						// D.P. Dec 16th, 2016 #655 Clear masked value (display text) when setting allowed null as value
						this._maskedValue = "";
						this._valueInput.val("");
						this.options.value = this.options.nullValue;
					} else {
						nullValue = this._parseValueByMask(value);
						this._maskedValue = nullValue;
						this._valueInput.val(nullValue);
						this.options.value = nullValue;

					}
				} else {

					// Convert empty value by dataMode
					this.options.value = "";
					this._valueInput.val("");
					this._maskedValue = "";
				}
			} else {
				this._maskedValue = value;
				this.options.value = this._getValueByDataMode();
				this._valueInput.val(this.options.value);
			}
		},
		_clearValue: function (textOnly) { //igMaskEditor
			var newValue = "";
			if (this.options.allowNullValue) {
				newValue = this.options.nullValue;
				this._editorInput.val(this._parseValueByMask(newValue));
			} else {
				this._editorInput.val(this._maskWithPrompts);
			}
			if (!textOnly) {
				this._updateValue(newValue);
			}
			if (this._editMode === false) {
				this._exitEditMode();
			}
		},
		_getDisplayValue: function () { //igMaskEditor
			return this._replaceValueInMask(this.options.unfilledCharsPrompt, this.options.padChar);
		},
		_getMaskedValue: function (maskedValue) {
			return this._replaceValueInMask(this.options.emptyChar, this.options.unfilledCharsPrompt,
				maskedValue);
		},
		_replaceValueInMask: function (oldChar, newChar, maskedValue) {
			var result, maskedVal = maskedValue || this._maskedValue,
				i, j, p, maskChar, tempChar, index, regExpr,
				inputMask = this.options.inputMask, maskFlagsArray = this._maskFlagsArray;

			result = maskedVal;
			if (this._promptCharsIndices.length > 0) {
				i = 225;
				tempChar = String.fromCharCode(i);
				while (maskedVal.indexOf(tempChar) !== -1) {
					i++;
				}
				for (i = 0; i < this._promptCharsIndices.length; i++) {
					index = this._promptCharsIndices[ i ];
					maskedVal = this._replaceCharAt(maskedVal, index, tempChar);
				}
			}
			for (i = 0, j = 0, p = 0; i < maskedVal.length; i++, j++, p++) {

				if (inputMask.charAt(j) === "<" || inputMask.charAt(j) === ">") {
					j++;
				} // We need extra counter for the escaped chars, so we can be sure we check the correct mask flag
				if (inputMask.charAt(j) === "\\" &&
					$.inArray(inputMask.charAt(j + 1), maskFlagsArray) !== -1) {
					j++;
					continue;
				}

				if (maskedVal.charAt(i) === oldChar) {
					maskChar = inputMask.charAt(j);
					if (maskChar === "&" || maskChar === "A" ||
						maskChar === "L" || maskChar === "0") {

						// All the required fields, which are unfilled are replaced with the padChar
						result = this._replaceCharAt(result, p, newChar);
					} else {
						result = this._replaceCharAt(result, p, "");
						p--;
					}
				}
			}
			if (this._promptCharsIndices.length > 0) {
				regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
				result = result.replace(regExpr, oldChar);
			}
			return result;
		},
		_valueFromText: function (text) { //igMaskEditor
			return this._getValueByDataMode(text);
		},
		_editorIsCleared: function () { //igMaskEditor
			var result = false, currentVal = this._editorInput.val();
			if (currentVal === "" || currentVal === this._maskWithPrompts) {
				result = true;
			}
			return result;
		},
		_validateValueAgainstMask: function (value) {
			var i, j, length = value.length, result = true, ch, mask = this._unescapedMask;
			if (length && length > 0) {
				for (j = 0, i = 0; i < mask.length && j < value.length; i++, j++) {
					ch = value.charAt(j);

					// D.P. 24th Aug 2016 #264 Position tweaks before unfilledCharsPrompt skip, literals match unescapedMask
					// In case passed value contains both literals and filled prompts we try to parse the value.
					// In case of mask 00/00 we should accept both 1234 and 12/34 as input and parse it with the correct result.
					if ($.inArray(i, this._literalIndeces) !== -1) {
						if (mask.charAt(i) !== ch) {
							j--;
						}
						continue;
					}

					if (!(this._focused && ch === this.options.unfilledCharsPrompt) &&
						this._validateCharOnPostion(ch, i, mask) === false) {
						return false;
					}
				}
			} else {
				result = true;
			}
			return result;
		},
		_setInitialValue: function (value) { //igMaskEditor
			this._maskWithPrompts = this._parseValueByMask("");
			this._getMaskLiteralsAndRequiredPositions();
			if (value === null || value === "") {
				this._updateValue(value);
				this._maskedValue = "";
			} else if (typeof value === "undefined") {
				this._updateValue("");
				this._maskedValue = "";
			} else {
				this._maskedValue = this._parseValueByMask(value);
				this._updateValue(this._maskedValue);
			}
			this._checkClearButtonState();
		},
		_triggerInternalValueChange: function (value) { //MaskEditor
			var oldValue = this.options.value, message;
			if (value === this._maskWithPrompts && this._promptCharsIndices.length === 0) {
				value = "";
			}
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);
				if (this.options.value !== oldValue) {

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(value);
				}

				// Check if maskedValue contains promptChars
				if (value !== "" && !this._validateRequiredPrompts(value)) {
					// Raise warning not all required fields are entered
					// State - message
					if (this.options.revertIfNotValid) {
						message = $.ig.Editor.locale.maskRevertMessage;
					} else {
						message = $.ig.Editor.locale.maskMessage;
					}
					this._sendNotification("warning", message);
				}
			}
		},
		_validateRequiredPrompts: function (value) {
			var i;
			if (value === "") {
				// D.P. Ignore empty value
				return true;
			}
			for (i = 0; i < this._requiredIndeces.length; i++) {
				var ch = value.charAt(this._requiredIndeces[ i ]);
				if (ch === this.options.unfilledCharsPrompt) {
					if (this._promptCharsIndices.length > 0 &&
						$.inArray(this._requiredIndeces[ i ], this._promptCharsIndices) !== -1) {
						continue;
					} else {
						return false;
					}
				}
			}
			return true;
		},
		_processInternalValueChanging: function (value) { //MaskEditor
			if (this._validateValue(value) &&
				(this.options.revertIfNotValid && this._validateRequiredPrompts(value) ||
				!this.options.revertIfNotValid)) {
				this._updateValue(value);
			} else {

				// If the value is not valid, we clear the editor
				if (this.options.revertIfNotValid) {

					// N.A. May 12th, 2017 #903: Properly revert display value.
					value = this._getMaskedValue(this._valueInput.val().trim());
					this._updateValue(value);

					// N.A. July 25th, 2016 #150: Mask editor empty mask is deleted.
					value = this._parseValueByMask(value.trim());
					this._editorInput.val(value);

				} else {
					this._clearValue();
					value = this._valueInput.val();
					if (this._focused) {
						this._enterEditMode();
					}
				}
			}
		},
		_triggerKeyDown: function (event) { // MaskEditor
			var key = !event.charCode ? event.which : event.charCode,
				cursorStartPosition = this._getSelection(this._editorInput[ 0 ]).start,
				ch, transformedChar, noCancel;

			// N.A. 3/9/2016 Bug #215523: Cancel keyDown event in the derived editors.
			noCancel = this._super(event);
			if (noCancel) {
				if (key === 8) { // Backspace
					this._handleBackSpaceKey();
					event.preventDefault();
				} else if (key === 46) { // Delete
					this._handleDeleteKey();
					event.preventDefault();
				} else if (($.inArray(cursorStartPosition, this._toUpperIndeces) !== -1) &&
					this._inComposition !== true) {
					if (!event.ctrlKey && !event.altKey && ((key > 46 && key < 91) || (key > 145))) {

						// Bug 207318. T.P. 4th Dec 2015 In case of webkit composition start is fired with different order and _inCompositio flag is not correctly set.
						if (!$.ig.util.isWebKit || key !== 229) {
							ch = String.fromCharCode(key);
							transformedChar = ch.toLocaleUpperCase();
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorStartPosition, transformedChar));
							this._setCursorPosition(cursorStartPosition + 1);
							event.preventDefault();
						}
					}
				} else if (($.inArray(cursorStartPosition, this._toLowerIndeces) !== -1) &&
					this._inComposition !== true) {
					if (!event.ctrlKey && !event.altKey && ((key > 46 && key < 91) || (key > 145))) {

						// Bug 207318. T.P. 4th Dec 2015 In case of webkit composition start is fired with different order and _inCompositio flag is not correctly set.
						if (!$.ig.util.isWebKit || key !== 229) {
							ch = String.fromCharCode(key);
							transformedChar = ch.toLocaleLowerCase();
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorStartPosition, transformedChar));
							this._setCursorPosition(cursorStartPosition + 1);
							event.preventDefault();
						}
					}
				}
			}
			return noCancel;
		},
		_triggerKeyPress: function (event) { // MaskEditor
			var cursorPosition,
				key = !event.charCode ? event.which : event.charCode,
				ch;
			if (this._super(event)) {
				cursorPosition = this._getCursorPosition();
				if (key === 46 && this._promptCharsIndices.length > 0) { // Delete
					if ($.inArray(cursorPosition, this._promptCharsIndices) !== -1) {
						this._promptCharsIndices = this._promptCharsIndices.splice(
							$.inArray(cursorPosition, this._promptCharsIndices), 1);
					}
				} else if (key === 8 && this._promptCharsIndices.length > 0) { // BackSpace
					if ($.inArray(cursorPosition - 1, this._promptCharsIndices) !== -1) {
						this._promptCharsIndices = this._promptCharsIndices.splice(
							$.inArray(cursorPosition - 1, this._promptCharsIndices), 1);
					}
				} else {
					ch = String.fromCharCode(key);
					if (ch === this.options.unfilledCharsPrompt &&
						$.inArray(cursorPosition, this._promptCharsIndices) === -1) {
						this._promptCharsIndices.push(cursorPosition);
					}
				}
			}
		},
		_validateKey: function (event) {
			var result, ch, key, cursorPosition = this._getCursorPosition();
			if (this._super(event) && this.options.inputMask) {

				// Validate key against the mask
				key = !event.charCode ? event.which : event.charCode;
				if ($.ig.util.isFF && this._validateNonCharacter(event)) {
					result = true;
				} else if (key !== 8 && key !== 46) { // Backspace
					ch = String.fromCharCode(key);
					if (cursorPosition === -1) {

						// In case all the text is selected we set the cursor to 0, so we can continue correctly with the indexes.
						this._editSelectAllStartied = true;
						this._editorValueBeforeClear = this._editorInput.val();
						this._editorInput.val(this._maskWithPrompts);
						cursorPosition++;
					}
					while ($.inArray(cursorPosition, this._literalIndeces) !== -1 ||
						cursorPosition === this._maskWithPrompts.length) {
						cursorPosition++;
					}
					result = this._validateKeyCharAgainstMask(ch,
						cursorPosition, this._unescapedMask);
					if (result === true) {

						// In firefow when key is held down triggers keypress and on rightArrow we need to manually move the cursor to the left.
						if ($.ig.util.isFF && event.keyCode === 37) {

							// Bug 206039
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition - 1);
						} else {

							// If the key is valid, we selec the next char so we don't extend the value but delete the prompt char.
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition + 1);
						}
					}
				}
			} else {
				result = false;
			}
			if (result === false && this._editSelectAllStartied) {
				this._editorInput.val(this._editorValueBeforeClear);
				this._editorInput.select();
				delete this._editSelectAllStartied;
				delete this._editorValueBeforeClear;
			}
			if (result === true && this._editSelectAllStartied) {
				delete this._editSelectAllStartied;
				delete this._editorValueBeforeClear;
			}
			return result;
		},

		// We use this method both in edit mode and when validte value
		_validateKeyCharAgainstMask: function (ch, cursorPosition, inputMask) {
			var mask = inputMask || this.options.inputMask, isValid;//,
			if (cursorPosition >= this._maskWithPrompts.length) {

				// The cursor position at the end of the possible value
				isValid = false;
			} else {

				if (this._validateCharOnPostion(ch, cursorPosition, mask) === null) {

					// In that case we need to move to next char on the mask
					isValid = this._validateKeyCharAgainstMask(ch, cursorPosition + 1);

				} else {
					isValid = this._validateCharOnPostion(ch, cursorPosition, mask);
				}
			}
			return isValid;
		},
		_validateCharOnPostion: function (ch, position, inputMask) {
			var maskSymbol, mask, isValid,
				regex,
				inputChar = ch,
				letterOrDigitRegEx = "[\\d\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z]",
				letterRegEx = "[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z]",
				digitRegEx = "[\\d]",
				digitSpecialRegEx = "[\\d_\\+]";
				mask = inputMask || this.options.inputMask;
				maskSymbol = mask.charAt(position);
				switch (maskSymbol) {
					case "C":
					case "&": {
						if (inputChar === "") {
							isValid = false;
						} else {
							isValid = true;
						}
					}
						break;
					case "a":
					case "A": {
						regex = new RegExp(letterOrDigitRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "?":
					case "L": {
						regex = new RegExp(letterRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "0":
					case "9": {
						regex = new RegExp(digitRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "#": {
						regex = new RegExp(digitSpecialRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					default: {

						// Move cursor if possible
						// this._setCursorPosition(cursorPosition + 1);
						// this._validateCharAgainstMask(char, cursorPosition + 1);
						isValid = null;
					}
				}
				return isValid;
		},
		_setOption: function (option, value) { // igMaskEditor
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "inputMask": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.setOptionError + option);
				}
				case "excludeKeys":
				case "includeKeys":
				case "regional":
				case "unfilledCharsPrompt":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.setOptionError + option);
				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_handleBackSpaceKey: function () {
			// Get setlection
			var selection = this._getSelection(this._editorInput[ 0 ]),
				startPostion = selection.start,
				endPosition = selection.end, index = endPosition;
			if (startPostion === endPosition) {
				startPostion--;
			}
			index--;
			for (index; index > startPostion - 1; index--) {
				while ($.inArray(index, this._literalIndeces) !== -1 || index === -1) {
					index--;
				}
				if (index > -1) {
					this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
						index, this.options.unfilledCharsPrompt));
					this._setCursorPosition(index);
				}
			}
		},
		_handleDeleteKey: function (skipCursorPosition) { //MaskEditor
			// Get setlection
			var selection = this._getSelection(this._editorInput[ 0 ]),
				startPostion = selection.start,
				endPosition = selection.end, index = startPostion;
			if (startPostion === endPosition) {

				// In that case we don't have selection, but cursor set and we increase the endCursor so we can enter the loop.
				endPosition++;
			}
			for (index; index < endPosition; index++) {

				while ($.inArray(index, this._literalIndeces) !== -1 &&
					index <= this._maskWithPrompts.length) {
					index++;
				}
				if (index !== this._maskWithPrompts.length) {
					this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
						index, this.options.unfilledCharsPrompt));
					if (!skipCursorPosition) {
						this._setCursorPosition(index + 1);
					}
				} else {
					if (!skipCursorPosition) {
						this._setCursorPosition(index);
					}
				}
			}
		},

		// igMaskEditor public methods
		value: function (newValue) { // Mask Editor
			/* Gets/Sets mask editor value.
				```
				$(".selector").%%WidgetName%%("value", "New Text");
				```
				paramType="string" optional="true" New mask editor value.
				returnType="string" Current mask editor value. */
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (newValue !== null) {
					this._promptCharsIndices = [];
					newValue = this._parseValueByMask(newValue);
				}
				if (newValue === this._maskWithPrompts) {
					newValue = "";
				}
				this._updateValue(newValue);

				//M.S. 4/19/2017. Issue 892 Initially when allowNullValue is true and the value is not set, the value should be equal to nullValue
				if (this.options.allowNullValue && newValue === null && this.options.nullValue) {
					this.value(this.options.nullValue);
				}

				// this._setInitialValue(newValue);
				//In the applyOption there is initial value false to _editMode variable, so the editor input is changed based on the state of the editor.
				//if (this._focused === false || this._focused === undefined) {
					this._editorInput.val(this._editMode ?
						this._maskedValue :
						this._getDisplayValue());
			} else {
				return this.options.value;
			}

			// N.A. January 3th, 2017 #665: Update button state, when value is changed using API method.
			this._checkClearButtonState();
		},
		dropDownContainer: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		showDropDown: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		hideDropDown: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		dropDownButton: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinUpButton: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinDownButton: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		dropDownVisible: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		findListItemIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		selectedListIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		getSelectedListItem: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinUp: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinDown: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		isValid: function () { //igMaskEditor
			/* Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
			```
				var isValid = $(".selector").%%WidgetName%%("isValid");
			```
			returnType="bool" Whether editor value is valid or not. */
			var value, valid;

			this._skipMessages = true;
			if (this._editMode) {
				value = this.field().val();
				valid = this._validateRequiredPrompts(value);
			} else {
				value = this.options.value;
				valid = this._validateValue(value);
				if (value !== "" && !this._validateRequiredPrompts(this._maskedValue)) {

					// Raise warning not all required fields are entered
					// State - message
					valid = false;
					this._sendNotification("warning", $.ig.Editor.locale.maskMessage);
				}
			}
			this._skipMessages = false;
			return valid;
		}
	});
	$.widget("ui.igDateEditor", $.ui.igMaskEditor, {
		options: {
			/* type="date" Gets/Sets the value of the editor. Date object can be set as value. String can be set and the editor will pass it to the Date object constructor and use the corresponding Date object as the value. MVC date format can be used too.
				Note! This option doesn't use the dateInputFormat to extract the date.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					value : new Date (2015, 11, 11)
				});

				//Get
				var value = $(".selector").%%WidgetName%%("option", "value");

				//Set
				$(".selector").%%WidgetName%%("option", "value", new Date (2015, 11, 11));
				```
				*/
			value: null,
			/* type="date" Gets the minimum value which can be entered in editor by user. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too.
				Note! This option doesn't use the dateInputFormat to extract the date.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						minValue: new Date(1980, 6, 1)
					});

					//Get
					var minValue = $(".selector").%%WidgetName%%("option", "minValue");

					//Set
					$(".selector").%%WidgetName%%("option", "minValue", new Date(1980, 6, 1));
				```
				*/
			minValue: null,
			/* type="date" Gets the maximum value which can be entered in editor by user. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too.
				Note! This option doesn't use the dateInputFormat to extract the date.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						maxValue: new Date(2020, 11, 21)
					});

					//Get
					var maxValue = $(".selector").%%WidgetName%%("option", "maxValue");

					//Set
					$(".selector").%%WidgetName%%("option", "maxValue", new Date(2020, 11, 21));
				```
				*/
			maxValue: null,
			/* type="string"
				Gets/Sets format of date while editor has no focus.
				Value of that option can be set to a specific date pattern or to a flag defined by regional settings.
				If value is not set, then the dateInputFormat is used automatically.
				If value is set to explicit date pattern and pattern besides date-flags has explicit characters which match with date-flags or mask-flags, then the "escape" character should be used in front of them.
				List of predefined regional flags:
				"date": the datePattern member of regional option is used
				"dateLong": the dateLongPattern member of regional option is used
				"time": the timePattern member of regional option is used
				"timeLong": the timeLongPattern member of regional option is used
				"dateTime": the dateTimePattern member of regional option is used
				List of explicit characters, which should have escape \\ character in front of them:
					C, &, a, A, ?, L, 9, 0, #, >, <, y, M, d, h, H, m, s, t, f.
				List of date-flags when explicit date pattern is used:
				"y": year field without century and without leading zero
				"yy": year field without century and with leading zero
				"yyyy": year field with leading zeros
				"M": month field as digit without leading zero
				"MM": month field as digit with leading zero
				"MMM": month field as short month name
				"MMMM": month field as long month name
				"d": day of month field without leading zero
				"dd": day of month field with leading zero
				"ddd": day of the week as short name
				"dddd": day of the week as long name
				"t": first character of string which represents AM/PM field
				"tt": 2 characters of string which represents AM/PM field
				"h": hours field in 12-hours format without leading zero
				"hh": hours field in 12-hours format with leading zero
				"H": hours field in 24-hours format without leading zero
				"HH": hours field in 24-hours format with leading zero
				"m": minutes field without leading zero
				"mm": minutes field with leading zero
				"s": seconds field without leading zero
				"ss": seconds field with leading zero
				"f": milliseconds field in hundreds
				"ff": milliseconds field in tenths
				"fff": milliseconds field
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						dateDisplayFormat: "dateLong"
					});

					//Get
					var dateDisplayFormat = $(".selector").%%WidgetName%%("option", "dateDisplayFormat");

					//Set
					$(".selector").%%WidgetName%%("option", "dateDisplayFormat", "dateLong");
				```
			*/
			dateDisplayFormat: null,
			/* type="string"
				Gets format of date while editor has focus.
				Value of that option can be set to explicit date pattern or to a flag defined by regional settings.
				If value is set to explicit date pattern and pattern besides date-flags has explicit characters which match with date-flags or mask-flags, then the "escape" character should be used in front of them.
				If option is not set, then the "date" is used automatically.
				List of predefined regional flags:
				"date": the datePattern member of regional option is used
				"dateLong": the dateLongPattern member of regional option is used
				"time": the timePattern member of regional option is used
				"timeLong": the timeLongPattern member of regional option is used
				"dateTime": the dateTimePattern member of regional option is used
				List of explicit characters, which should have escape \\ character in front of them: C, &, a, A, ?, L, 9, 0, #, >, <, y, M, d, h, H, m, s, t, f.
				List of date-flags when explicit date pattern is used:
				"yy": year field without century and with leading zero
				"yyyy": year field with leading zeros
				"MM": month field as digit with leading zero
				"dd": day of month field with leading zero
				"t": first character of string which represents AM/PM field
				"tt": 2 characters of string which represents AM/PM field
				"hh": hours field in 12-hours format with leading zero
				"HH": hours field in 24-hours format with leading zero
				"mm": minutes field with leading zero
				"ss": seconds field with leading zero
				"f": milliseconds field in hundreds
				"ff": milliseconds field in tenths
				"fff": milliseconds field
				Note! This option can not be set runtime.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						dateInputFormat : "dateLong"
					});

					//Get
					var dateInputFormat = $(".selector").%%WidgetName%%("option", "dateInputFormat");
				```
			*/
			dateInputFormat: null,
			/* type="date|editModeText|displayModeText|" Gets the value type returned by the get of value() method and option. Also affects how the value is stored for form submit.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					dataMode: "editModeText"
				});

				//Get
				var dataMode = $(".selector").%%WidgetName%%("option", "dataMode");

			```
				date type="string" The value method returns a Date object. When this mode is set the value sent to the server on submit is serialized as ISO 8061 string with local time and zone values by default.
					The [enableUTCDates](ui.%%WidgetNameLowered%%#options:enableUTCDates) option can be used to output an UTC ISO string instead.
					For example 10:00 AM from a client with local offset of 5 hours ahead of GMT will be serialized as:
					"2016-11-11T10:00:00+05:00"
				displayModeText type="string" The "text" in display mode (no focus) format (pattern) is used to be send to the server and is returned from the value() method (returns a string object).
				editModeText type="string" The "text" in edit mode (focus) format (pattern) is used to be send to the server and is returned from the value() method (returns a string object).
			*/
			dataMode: "date",
			/* type="int" Gets/Sets time zone offset from UTC, in minutes. The client date values are displayed with this offset instead of the local one.
			Note: It is recommended that this option is used with an UTC value (e.g. "2016-11-03T14:08:08.504Z") so the outcome is consistent.
				Values with ambiguous time zone could map to unpredictable times depending on the user agent local zone.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					displayTimeOffset: 180
				});

				//Get
				var displayTimeOffset = $(".selector").%%WidgetName%%("option", "displayTimeOffset");
			```
			*/
			displayTimeOffset: null,
			/*type="clear|spin" Gets visibility of the spin and clear buttons. That option can be set only on initialization. Combinations like 'spin,clear' are supported too.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						buttonType : "clear"
					});

					//Get
					var buttonType = $(".selector").%%WidgetName%%("option", "buttonType");
				```
				clear type="string" A button to clear the value is located on the right side of the editor.
				spin type="string" Spin buttons are located on the right side of the editor
			*/
			buttonType: "none",
			/* type="number" Gets/Sets delta-value which is used to increment or decrement the editor date on spin actions.
				When not editing (focused) the delta is applied on the day if available in the input mask or the lowest available period.
				When in edit mode the time period, where the cursor is positioned, is incremented or decremented with the defined delta value.
				The value can be only a positive integer number, otherwise it will be set as 1, or in the cases with double or float the the whole part will be taken.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					spinDelta: 10
				});

				//Get
				var spinDelta= $(".selector").%%WidgetName%%("option", "spinDelta");

				//Set
				$(".selector").%%WidgetName%%("option", "spinDelta", 10);
			```
			*/
			spinDelta: 1,
			/* type="bool" Gets/Sets ability to modify only 1 date field on spin events.
				Value false enables changes of other date fields when incremented or decremented date-field reaches its limits.
				Value true modifies only value of one field.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						limitSpinToCurrentField : true
					});

					//Get
					var limitSpinToCurrentField = $(".selector").%%WidgetName%%("option", "limitSpinToCurrentField");

					//Set
					$(".selector").%%WidgetName%%("option", "limitSpinToCurrentField", true);
				```
			*/
			limitSpinToCurrentField: false,
			/* type="bool" Enables/Disables serializing client date as UTC ISO 8061 string instead of using the local time and zone values.
				The option is only applied in "date" [dataMode](ui.%%WidgetNameLowered%%#options:dataMode).
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						enableUTCDates : true
					});

					//Get
					var enableUTCDates = $(".selector").%%WidgetName%%("option", "enableUTCDates");

					//Set
					$(".selector").%%WidgetName%%("option", "enableUTCDates", true);
				```
			*/
			enableUTCDates: false,
			/* type="number" Gets/Sets year for auto detection of 20th and 21st centuries.
				That option is used to automatically fill century when the user entered only 1 or 2 digits into the year field or when the date pattern contains only 1 or 2 year positions, e.g. "yy" or "y".
				If user entered value larger than value of this option, then 20th century is used, otherwise the 21st.
				```
					//Initialize
					$(".selector").%%WidgetName%%({
						centuryThreshold: 35
					});

					//Get
					var centuryThreshold = $(".selector").%%WidgetName%%("option", "centuryThreshold");

					//Set
					$(".selector").%%WidgetName%%("option", "centuryThreshold", 35);
				```
				*/
			centuryThreshold: 29,
			/* type="number" Gets/Set value used to increase/decrease year part of the date, in order to set difference between year in Gregorian calendar and displayed year.
			```
				//Initialize
				$(".selector").%%WidgetName%%({
					yearShift : 4500
				});

				//Get
				var yearShift = $(".selector").%%WidgetName%%("option", "yearShift");

				//Set
				$(".selector").%%WidgetName%%("option", "yearShift", 4500);
			```
			*/
			yearShift: 0,
			/* type="string|number|date|null" Gets/Sets the representation of null value. In case of default the value for the input is set to null, which makes the input to hold an empty string
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					nullValue : new Date(2015, 09, 08)
				});

				//Get
				var nullText = $(".selector").%%WidgetName%%("option", "nullValue");

				//Set
				$(".selector").%%WidgetName%%("option", "nullValue", new Date(2015, 09, 08));
				```
			*/
			nullValue: null,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			isLimitedToListValues: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listItemHoverDuration: 0,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listItems: null,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listWidth: 0,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownAnimationDuration: 0,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownAttachedToBody: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownOnReadOnly: false,
			/*@Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor*/
			inputMask: "CCCCCCCCCC",
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			unfilledCharsPrompt: "_",
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			padChar: " ",
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			emptyChar: " ",
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			toUpper: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			toLower: false
		},
		events: {
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListOpening: "dropDownListOpening",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListOpened: "dropDownListOpened",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListClosing: "dropDownListClosing",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListClosed: "dropDownListClosed",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownItemSelected: "dropDownItemSelected"
		},
		_create: function () { // igDateEditor

			$.ui.igMaskEditor.prototype._create.call(this);
		},
		_initialize: function () {
			var offset = this.options.displayTimeOffset;
			this._super();
			this._applyRegionalSettings();
			this.options.inputMask =
				this._convertDateMaskToDigitMask(this.options.dateInputFormat);
			this._setNumericType();

			// RegEx for /Date(milisecond)/
			this._mvcDateRegex = /^\/Date\((.*?)\)\/$/i;
			if (offset !== null && (offset > 840 || offset < -720)) {
				throw new Error($.ig.Editor.locale.dateEditorOffsetRange);
			}
		},
		_setNumericType: function () {
			this._numericType = "datetime";
		},
		_setOption: function (option, value) { // igDateEditor
			/* igDateEditor custom setOption goes here */
			var prevValue = this.options[ option ], date;
			if ($.type(prevValue) === "date") {
				date = this._getDateObjectFromValue(value);
				if ($.type(date) === "date" && (prevValue.getTime() === date.getTime())) {
					return;
				}
			} else if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "displayTimeOffset": {
					if (this._editMode) {
						this._updateMaskedValue();
						this._enterEditMode();
					} else {
						this._editorInput.val(this._getDisplayValue());
					}
					break;
				}
				case "minValue":
				case "maxValue":
					if (!this._isValidDate(value)) {
						this.options[ option ] = prevValue;
						return;
					}
					if (value !== null) {
						this.options[ option ] = this._getDateObjectFromValue(value);
						this._processInternalValueChanging(this.value());
						if (!this._editMode) {
							this._editorInput.val(this._getDisplayValue());
							this._currentInputTextValue = this._editorInput.val();
						}
					}
					this._setSpinButtonsState(this.value());
					break;
				case "listItems":
				case "dateInputFormat": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.setOptionError + option);
				}
				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_applyRegionalSettings: function () { //DateEditor
			var format;
			if (this.options.dateInputFormat !== null) {
				format = this.options.dateInputFormat;
				if (format === "date" || format === "dateLong" || format === "dateTime" ||
					format === "time" || format === "timeLong") {
					this.options.dateInputFormat = this._getRegionalOption(format + "Pattern");
				}
			} else {
				this.options.dateInputFormat = this._getRegionalOption("datePattern");
			}
			if (this.options.dateDisplayFormat !== null) {
				format = this.options.dateDisplayFormat;
				if (format === "date" || format === "dateLong" || format === "dateTime" ||
					format === "time" || format === "timeLong") {
					this.options.dateDisplayFormat = this._getRegionalOption(format + "Pattern");
				}
			} else {
				this.options.dateDisplayFormat = this.options.dateInputFormat;
			}
		},
		_setInitialValue: function (value) { //igDateEditor
			this._maskWithPrompts = this._parseValueByMask("");
			if (value === null || value === "") {
				this._updateValue(value);
				this._maskedValue = "";
			} else if (typeof value === "undefined") {
				this._updateValue("");
				this._maskedValue = "";
			} else {
				//check value
				if (this._validateValue(value)) {
					this._updateValue(this._getDateObjectFromValue(value));

					// Update maskedValue according to the new value.
					this._updateMaskedValue();
				}
				this._editorInput.val(this._getDisplayValue());
			}
			this._checkClearButtonState();

			// N.A. January 4th, 2017 #664 Validate spin button state on a change.
			this._setSpinButtonsState(value);
		},
		_applyOptions: function () { // DateEditor
			var delta = this.options.spinDelta;

			if (typeof delta !== "number") {
				this.options.spinDelta = 1;
				throw new Error($.ig.Editor.locale.spinDeltaIsOfTypeNumber);
			} else if (delta < 0) {
				this.options.spinDelta = 1;
				throw new Error($.ig.Editor.locale.spinDeltaCouldntBeNegative);
			} else {
				this.options.spinDelta = parseInt(delta, 10);
			}

			if (this.options.centuryThreshold > 99 || this.options.centuryThreshold < 0) {
				this.options.centuryThreshold = 29;
				throw new Error($.ig.Editor.locale.centuryThresholdValidValues);
			}

			if (this.options.minValue) {
				if (!this._isValidDate(new Date(this.options.minValue))) {
					throw new Error($.ig.Editor.locale.invalidDate);
				} else {
					this.options.minValue = this._getDateObjectFromValue(this.options.minValue);
				}
			}
			if (this.options.maxValue) {
				if (!this._isValidDate(new Date(this.options.maxValue))) {
					throw new Error($.ig.Editor.locale.invalidDate);
				} else {
					this.options.maxValue = this._getDateObjectFromValue(this.options.maxValue);
				}
			}

			// N.A. January 23th, 2017 #731 If value exceeds the min/max value, then set it to min/max and show notification.
			this.options.value = this._getValueBetweenMinMax(this.options.value);

			this._super();

			if (this._maskWithPrompts === undefined) {
				this._setInitialValue();
			}
		},
		_triggerKeyDown: function (event) { //DateEditor
			var key = !event.charCode ? event.which : event.charCode,
				noCancel;

			// N.A. 3/9/2016 Bug #215523: Cancel keyDown event in the derived editors.
			noCancel = this._super(event);
			if (noCancel) {

				// TODO: Optimize this method together with _triggerKeyDown in the igDatePicker.
				if (key === 38 && !(this instanceof $.ui.igDatePicker)) {
					this._spinUpEditMode();
					event.preventDefault();
				}
				if (key === 40 && !(this instanceof $.ui.igDatePicker)) {
					this._spinDownEditMode();
					event.preventDefault();
				}
				if (key === 13) {
					this._enterEditMode();
				}
			}
			return noCancel;
		},

		// N.A. January 4th, 2017 #664 Validate min and max values in date editor and date picker by comparing dates.
		_exceedsMaxValue: function(value) {

			// Display mode may remove leading zeros, and also in display mode value is already updated, that's why we can use it.
			if (!this._editMode) {
				value = this.value();
			}
			return this.options.maxValue !== null &&
				this._getDateObjectFromValue(value).getTime() >=
				this._getDateObjectFromValue(this.options.maxValue).getTime();
		},
		_lessThanMinValue: function(value) {

			// Display mode may remove leading zeros, and also in display mode value is already updated, that's why we can use it
			if (!this._editMode) {
				value = this.value();
			}
			return this.options.minValue !== null &&
				this._getDateObjectFromValue(value).getTime() <=
				this._getDateObjectFromValue(this.options.minValue).getTime();
		},
		_handleSpinUpEvent: function () { // DateEditor

			// N.A. January 10th, 2016 #701 Spin value using the spinDelta option and fire events only on user interaction.
			this._spin(this.options.spinDelta, true);
		},
		_handleSpinDownEvent: function () { // DateEditor
			this._spin(-this.options.spinDelta, true);
		},
		_serializeDate: function (sDate) {
			if (this.options.dataMode === "date") {
				if (this.options.enableUTCDates) {
					sDate = sDate.toISOString();
				} else {
					sDate = $.ig.toLocalISOString(sDate);
				}
			} else {
				sDate = this.options.value;
			}
			return sDate;
		},

		// Returns numeric value from getFullYear (with shift), getMonth, etc or null.
		// Flag to get specific date field (year, month, day, hours, minutes, seconds, milliseconds)
		// date DateObject
		_getDateField: function (flag, date) {
			var shift = this.options.yearShift, value;

				if (!date || isNaN(date.getTime())) {
					return null;
				}

				value = date[ "get" + flag ]();
				if (flag === "FullYear" && shift) {
					value += shift;
				}
				return value;
		},

		// This method sets specific field - setFullYear (with shift), setHours, setMinutes, etc.
		_setDateField: function(flag, date, newValue) {
			var shift = this.options.yearShift;
			if (!date) {
				return;
			}
			if (flag === "FullYear" && shift) {
				newValue -= shift;
			}
			date[ "set" + flag ](newValue);
		},
		_setNewDateMidnight: function() {
			var date = new Date();
			this._setDateField("Hours", date, 0);
			this._setDateField("Minutes", date, 0);
			this._setDateField("Seconds", date, 0);
			this._setDateField("Milliseconds", date, 0);
			return date;
		},
		_getInternalMaskedValue: function (newDate) {
			return this._updateMaskedValue(newDate, true);
		},
		_replaceDisplayValue: function(selection, previousValue, newValue) {

			// This is special case, when a date is pasted, but the new pasted string is not fully formatted date, and doesn't contain leading zeros (e.g. 11/3/2015 3:24 PM).
			// In such case, we add underscore in order to fully format date. The date is transformed to 11/_3/2015 _3:24 PM.
			// But we do this only in cases, when the selection starts from the beginning of the editor, оtherwise it cannot be predicted, how to format the date.
			if (selection.start === 0) {
				newValue = this._formatDateString(newValue.toString());
			}
			return this._super(selection, previousValue, newValue);
		},
		_formatDateString: function(value) {
			var dateMask, periodName, startIndex, endIndex,
				prompt = this.options.unfilledCharsPrompt;

			// This method is used only for date editor/picker to transform not fully formatted dates, like 1/3/2015 3:24 PM, to 11/_3/2015 _3:24 PM.
			// We depend on mask editor to format numbers, because it cannot recognize how to format date. It will transform 1/3/2015 3:24 PM to 11/3_/2015 3_:24 PM.
			// In addition, in the date editor, we need to format this to be correct date.
			dateMask = this._parseValueByMask(value);

			// We split the parsed date into time periods' chunks (year, month...), according to their indices.
			// Then we format each chunk to be valid date period - if it is needed we preceed it with underscore.
			if (dateMask.indexOf(prompt) >= 0) {
				for (periodName in this._dateIndices) {
					startIndex = this._dateIndices[ periodName ];
					switch (periodName) {
						case "fourDigitYear":
						case "ffLength":
						case "hh24":
							startIndex = null;
							break;
						case "yy":
							endIndex = startIndex + (this._dateIndices.fourDigitYear ? 4 : 2);
							break;
						case "ff":
							endIndex = startIndex + this._dateIndices.ffLength;
							break;
						default:
							endIndex = startIndex + 2;
							break;
					}
					if (startIndex !== null) {
						dateMask = (startIndex > 0 ? dateMask.substring(0, startIndex) : "") +
							this._reverseMaskWithUnderscore(dateMask.substring(startIndex, endIndex)) +
							(endIndex <  dateMask.length ? dateMask.substring(endIndex, dateMask.length) : "" );
					}
				}
			}
			return dateMask;
		},
		_reverseMaskWithUnderscore: function(mask) {
			var count, reg, match, reversedMask, regPrompt,
				prompt = this.options.unfilledCharsPrompt;

			// Transform 3_ to _3; 999_ to _999
			reg = new RegExp("(\\d{1,3}\\" + prompt + "{1,3})", "g");
			regPrompt = new RegExp("\\" + prompt, "g");
			match = reg.exec(mask);
			if (match && match[ 0 ]) {
				count = (mask.match(regPrompt) || []).length;
				reversedMask = Array(count + 1).join(prompt) + match[ 0 ].replace(regPrompt, "");
				mask = mask.replace(match[ 0 ], reversedMask);
			}
			return mask;
		},
		_updateMaskedValue: function (newDate, returnValue) {

			// This method updated maskwith prompts according to te set new date value
			var currentMaskValue = this._maskWithPrompts ?
					this._maskWithPrompts :
					this._parseValueByMask(""),
				dateObj, year, month, day, hours, minutes, seconds, milliseconds;
			dateObj = newDate ? newDate : this._dateObjectValue;

			if (this.options.displayTimeOffset !== null) {
				dateObj = this._getDateOffset(dateObj);
			}

			// TODO update all the fields
			if (dateObj) {
				if (this._dateIndices.yy !== undefined) {
					year = this._getDateField("FullYear", dateObj).toString();
					if (this._dateIndices.fourDigitYear) {

						// T.P. 29th Jan 2016 Bug #212642 When the year is 3 digit for example (111) we need to add extra zero in fron of the value, so in edit mode it's displayed correctly
						if (year.toString().length < 4) {
							while (year.toString().length < 4) {
								year = "0" + year;
							}
						}
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							year, this._dateIndices.yy, this._dateIndices.yy + 3);
					} else {
						year = year.substring(2);
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							year, this._dateIndices.yy, this._dateIndices.yy + 1);
					}
				}
				if (this._dateIndices.MM !== undefined) {
					month = this._getDateField("Month", dateObj);
					month++;
					if (month < 10) {
						month = "0" + month.toString();
					} else {
						month = month.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						month, this._dateIndices.MM, this._dateIndices.MM + 1);
				}
				if (this._dateIndices.dd !== undefined) {
					day = this._getDateField("Date", dateObj);
					if (day < 10) {
						day = "0" + day.toString();
					} else {
						day = day.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						day, this._dateIndices.dd, this._dateIndices.dd + 1);
				}
				if (this._dateIndices.hh !== undefined) {
					hours = this._getDateField("Hours", dateObj);
					if (!this._dateIndices.hh24 && hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (!this._dateIndices.hh24 && hours === 0) {
						hours = 12;
					}
					if (hours < 10) {
						hours = "0" + hours.toString();
					} else {
						hours = hours.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						hours, this._dateIndices.hh, this._dateIndices.hh + 1);
				}
				if (this._dateIndices.mm !== undefined) {
					minutes = this._getDateField("Minutes", dateObj);
					if (minutes < 10) {
						minutes = "0" + minutes.toString();
					} else {
						minutes = minutes.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						minutes, this._dateIndices.mm, this._dateIndices.mm + 1);
				}
				if (this._dateIndices.ss !== undefined) {
					seconds = this._getDateField("Seconds", dateObj);
					if (seconds < 10) {
						seconds = "0" + seconds.toString();
					} else {
						seconds = seconds.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						seconds, this._dateIndices.ss, this._dateIndices.ss + 1);
				}
				if (this._dateIndices.tt !== undefined) {
					hours = this._getDateField("Hours", dateObj);

					// N.A. 3/16/2016 Bug #216017: When we are in the 12 hour format, then 12 o'clock is PM and 24 (00) o'clock is AM.
					if (hours >= 12 && hours < 24) {

						// PM
						if (this._dateIndices._ttLength === 1) {

							// _replaceCharAt
							currentMaskValue = this._replaceCharAt(currentMaskValue,
								this._dateIndices.tt, "P");
						} else {
							currentMaskValue = this._replaceStringRange(currentMaskValue,
								"PM", this._dateIndices.tt, this._dateIndices.tt + 1);
						}
					} else {
						// AM
						if (this._dateIndices._ttLength === 1) {
							// _replaceCharAt
							currentMaskValue = this._replaceCharAt(currentMaskValue,
								this._dateIndices.tt, "A");
						} else {
							currentMaskValue = this._replaceStringRange(currentMaskValue,
								"AM", this._dateIndices.tt, this._dateIndices.tt + 1);
						}
					}
				}
				if (this._dateIndices.ff !== undefined) {
					milliseconds = this._getDateField("Milliseconds", dateObj);
					if (this._dateIndices.ffLength === 1) {
						currentMaskValue = this._replaceCharAt(currentMaskValue,
							this._dateIndices.ff,
							this._getMilliseconds(milliseconds, 100).toString());
					} else if (this._dateIndices.ffLength === 2) {
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							this._getMilliseconds(milliseconds, 10).toString(),
								this._dateIndices.ff, this._dateIndices.ff + 1);
					} else {
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							this._getMilliseconds(milliseconds, 1).toString(),
								this._dateIndices.ff, this._dateIndices.ff + 2);
					}
				}
			}

			// That check is needed in case we want to return the maskedvalue without setting it.
			if (returnValue === true) {
				return currentMaskValue;
			} else {
				this._maskedValue = currentMaskValue;
			}
		},

		// This method is used to get indices of the date groups within the mask and to convert the date mask into a mask with digit flags valid for igMaskEditor
		_convertDateMaskToDigitMask: function (mask) {
			var x, i, j, flag = -1, txt = "", maskVal = mask;
			if (!maskVal) {
				maskVal = "";
			}
			maskVal = maskVal.replace("dddd", "ddd").replace("ddd,", "").replace("ddd ", "")
						.replace(" ddd", "").replace("ddd", "");

			this._dateIndices = {};
			this._dateIndices.fourDigitYear = false;

			// temporary replace \\f,d,s,m,etc. by \x01-\x09
			maskVal = maskVal.replace(/\x08/g, " ").replace(/\x09/g, " ");
			maskVal = maskVal.replace(/\\f/g, "\x01").replace(/\\d/g, "\x02")
				.replace(/\\s/g, "\x03").replace(/\\m/g, "\x04")
				.replace(/\\t/g, "\x05").replace(/\\H/g, "\x06")
				.replace(/\\h/g, "\x07").replace(/\\M/g, "\x08").replace(/\\y/g, "\x09");

			// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
			// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
			// 20-ddd,21-dddd,22-f,23-ff,24-fff
			// Temporary remove 0 and 9, as they are valid mask flags

			maskVal = maskVal.replace(/9/g, "\x11").replace(/0/g, "\x12");
			maskVal = maskVal.replace("fff", "24").replace("ff", "23").replace("f", "22");
			maskVal = maskVal.replace("dddd", "").replace("ddd", "").replace("dd", "09")
				.replace("d", "08").replace("ss", "19").replace("s", "18")
				.replace("mm", "17").replace("m", "16");
			maskVal = maskVal.replace("tt", "15").replace("t", "14").replace("HH", "13")
				.replace("H", "12").replace("hh", "11").replace("h", "10");
			maskVal = maskVal.replace("MMMM", "MM").replace("MMM", "MM")
				.replace("MM", "05").replace("M", "04");
			maskVal = maskVal.replace("yyyy", "03").replace("yy", "02").replace("y", "01");

			// Restore original \\f,d,s,m,etc.
			maskVal = maskVal.replace(/\x01/g, "g").replace(/\x02/g, "d").replace(/\x03/g, "s")
				.replace(/\x04/g, "m").replace(/\x05/g, "t").replace(/\x06/g, "H")
				.replace(/\x07/g, "h").replace(/\x08/g, "M").replace(/\x09/g, "y");

			for (i = 0, j = 0; i < maskVal.length; i++, j++) {
				x = maskVal.charCodeAt(i);
				if (x < 48 || x > 57) {
					flag = maskVal.charAt(i);
						if (flag === "\\" && i + 1 < maskVal.length &&
							($.inArray(maskVal.charAt(i + 1), this._maskFlagsArray) !== -1) || //Escaped mask flag
							maskVal.charAt(i + 1) === "\x11" || // Temporary removed 9
							maskVal.charAt(i + 1) === "\x12") { // Temporary removed 0
							j--;
						}
						txt += maskVal.charAt(i);
					continue;
				}

				// Generate flag (Still using VS functionality )
				flag = (x - 48) * 10 + maskVal.charCodeAt(++i) - 48;
				if (flag === 14) {
					txt += "L";

				} else if (flag === 15) {
					txt += "LL";

				} else if (flag === 22) {
					txt += "0";
				} else {
					txt += "00";
					if (flag === 3) {
						txt += "00";
					}
					if (flag === 24) {
						txt += "0";
					}
				}

				// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
				// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
				// 20-ddd,21-dddd,22-f,23-ff,24-fff
				// TODO discuss if we want to throw an w
				switch (flag) {

					// 4, 5, 6, 7
					// 04-M,05-MM,06-MMM,07-MMMM
					case 4:
					case 5:
					case 6:
					case 7: {
						if (this._dateIndices.MM) {
							j++;
							break;
						} else {
							this._dateIndices.MM = j;
							j++;
						}
					}
						break;
					case 8:
					case 9:
					case 20:
					case 21: {
						if (this._dateIndices.dd) {
							j++;
							break;
						} else {
							this._dateIndices.dd = j;
							j++;
						}
					}
						break;
					case 1:
					case 2: {
						if (this._dateIndices.yy) {
							j++;
							break;
						} else {
							this._dateIndices.yy = j;
							j++;
							this._dateIndices.fourDigitYear = false;
						}
					}
						break;
					case 3: {
						if (this._dateIndices.yy) {
							j += 3;
							break;
						} else {
							this._dateIndices.yy = j;
							j += 3;
							this._dateIndices.fourDigitYear = true;
						}
					}
						break;
					case 14: { // t
						if (this._dateIndices.tt) {
							break;
						} else {
							this._dateIndices.tt = j;
							j++;

							// Flag representing am/pm field
							this._dateIndices._ttLength = 1;
						}
					}
						break;
					case 15: { // tt
						if (this._dateIndices.tt) {
							j++;
							break;
						} else {
							this._dateIndices.tt = j;
							j++;

							// Flag representing am/pm field
							this._dateIndices._ttLength = 2;
						}
					}
						break;

						// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
					case 10: //h
					case 11: { // hh
						if (this._dateIndices.hh) {
							j += 2;
							break;
						} else {
							this._dateIndices.hh = j;

							// This flag is used to distinguish if the hours are in 24 hours format or 12 hours
							this._dateIndices.hh24 = false;
							j++;
						}
					}
						break;
					case 12: // H
					case 13: { // HH
						if (this._dateIndices.hh) {
							j += 2;
							break;
						} else {
							this._dateIndices.hh = j;

							// This flag is used to distinguish if the hours are in 24 hours format or 12 hours
							this._dateIndices.hh24 = true;
							j++;
						}
					}
						break;
					case 16: // m
					case 17: { //mm
						if (this._dateIndices.mm) {
							j++;
							break;
						} else {
							this._dateIndices.mm = j;
							j++;
						}
					}
						break;
					case 18: //s
					case 19: {//ss
						if (this._dateIndices.ss) {
							j++;
							break;
						} else {
							this._dateIndices.ss = j;
							j++;
						}
					}
						break;

						//22 - f, 23 - ff, 24 - fff
					case 22: {
						if (this._dateIndices.ff) {
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 1;
						}
					}
						break;
					case 23: {
						if (this._dateIndices.ff) {
							j++;
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 2;
							j++;
						}
					}
						break;
					case 24: {
						if (this._dateIndices.ff) {
							j += 2;
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 3;
							j += 2;
						}
					}
						break;
					default:
				}
			}

			// Restore temporary removed 0 and 9 flags.
			txt = txt.replace(/\x11/g, 9).replace(/\x12/g, 0);
			return txt;
		},
		_getRegionalOption: function (key) { // igDateEditor
			var regional = this.options.regional;
			if (this.options[ key ]) {
				return this.options[ key ];
			}
			if (typeof regional === "string") {
				regional = $.ig.regional[ regional ];
			}
			if (regional && regional[ key ]) {
				return regional[ key ];
			} else {

				// return defaults
				return $.ig.regional.defaults[ key ];
			}
		},
		_validateKey: function (event) {
			var result = true, ch, key, cursorPosition;
			if (this._super(event) === true) {
				cursorPosition = this._getCursorPosition();

				// TODO add all needed checks for indices /left
				// For every pair we check if the current index is in the array for month fields, or the previous index is in the array. if we have dd, as a mask and we have alredy entered 1, when we type 5 - current cursor position is not in the list so we check if the previous one is in the list and pass the validation to month validateion.
				if (cursorPosition === this._dateIndices.MM ||
					(cursorPosition - 1) === this._dateIndices.MM) {

					// ValidateMonthInput
					result = this._validateMonthInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.dd ||
					(cursorPosition - 1) === this._dateIndices.dd) {

					// ValidateDayInput
					result = this._validateDayInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.hh ||
					(cursorPosition - 1) === this._dateIndices.hh) {

					// ValidateHoursInput
					result = this._validateHoursInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.mm ||
					(cursorPosition - 1) === this._dateIndices.mm) {

					// ValidateMinutesInput
					result = this._validateMinutesInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.ss ||
					(cursorPosition - 1) === this._dateIndices.ss) {

					// ValidateSeconsInput
					result = this._validateSecondsInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.tt ||
					(cursorPosition - 1) === this._dateIndices.tt) {

					// ValidateMidDayInput and process
					result = this._validateMidDayInput(event, cursorPosition);

					// In case the value is valid and the field contains 2 chars we need to type the m
					if (result === true) {
						//We might insert only m after the current position
						key = !event.charCode ? event.which : event.charCode;
						ch = String.fromCharCode(key);
						if (ch.toLocaleLowerCase() === "a") {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorPosition, "A"));
				} else {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorPosition, "P"));
						}
						if (this._dateIndices._ttLength === 2) {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								++cursorPosition, "M"));

						}
						this._setCursorPosition(++cursorPosition);
						event.preventDefault();
					}
				} else {
					result = true;
				}

				if (result === null) {
					cursorPosition++;
					while ($.inArray(cursorPosition, this._literalIndeces) !== -1 ||
						cursorPosition === this._maskWithPrompts.length) {
						cursorPosition++;
					}
					this._setCursorPosition(cursorPosition);
					result = this._validateKey(event);
				}

				// In case the key is valid according to te parent method the symbol after the cursor position gets selected and if the key is not valid we are setting the cursor position to remain the same without seelection
				if (result === false) {
					this._setCursorPosition(cursorPosition);
				}
			} else {
				result = false;
			}
			return result;
		},
		_setBlur: function (event) { //DateEditor
			var newValue, oldVal, convertedDate;
			if (this._cancelBlurOnInput) {
				this._editorInput.focus();
				delete this._cancelBlurOnInput;
			} else {
				this._triggerBlur(event);
				newValue = $(event.target).val();
				oldVal = this._dateObjectValue;

				convertedDate = this._parseDateFromMaskedValue(newValue);

				// #206308 in case newValiue == maskWithPrompts it's either clear value, or just exiting edit mode without entering value.
				if (newValue === this._maskWithPrompts) {
					if (oldVal) {
						this._processValueChanging(newValue);
					}
				} else if (!oldVal) {
					this._processValueChanging(newValue);
				} else if (convertedDate !== "" && convertedDate - oldVal !== 0) {
					this._processValueChanging(newValue);
				}
				this._exitEditMode();

				// TODO: There is no dropdown functionality in the igDateEditor should be removed !!!
				////In case our dropdown is opened we need to close it.

				this._focused = false;
				this._clearTimeouts();
				if (this._validator) { // TODO VERIFY
					this._validator._validateInternal(this.element, event, true);
				}
			}
		},
		_validateDayInput: function (event, position) {
			var /*cursor = position ? position : this._getCursorPosition(), */result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key),
				num = parseInt(ch),
				charAtCurrentPosition = parseInt(this._editorInput.val().charAt(position)),
				charAtPreviousPosition, charAtNextPosition;

			if (position === this._dateIndices.dd) {
				if (num < 4) {
					charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
					if (!isNaN(charAtNextPosition) && charAtNextPosition > 1 && num === 3) {

						// In that case we have valid digit ot first position but entering 37 as a day is not valid
						result = null;
					} else {
						result = true;
					}
				} else {
					if (!isNaN(charAtCurrentPosition) && charAtCurrentPosition === 3) {

						// In that case we have, 3 on first position and we know the the entered number is greater than 3, which is not valid and we want to move the index to the next group
						result = null;
					} else {
						this._setSelectionRange(this._editorInput[ 0 ],
							position + 1, position + 2);
						result = true;
					}
				}
			} else {

				// We need to check the previous char (digit) and if it's 3
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 3) {
					// If the previous digit is 3 the only valid digits are 0 and 1,
					if (num === 0 || num === 1) {
						result = true;
					} else {

						// In that case the digit is not valid in case first digit in the group remains - so we delete the first digit and proceed with the entry
						this._setCursorPosition(position - 1);
						this._handleDeleteKey();
						this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						result = true;
					}
				} else {
					result = true;
				}
			}
			return result;
		},
		_validateMonthInput: function (event, position) {
			var result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key),
				num = parseInt(ch),
				charAtCurrentPosition = parseInt(this._editorInput.val().charAt(position)),
				charAtPreviousPosition, charAtNextPosition;
			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.MM) { //the cursor is on the first pair
				if (num < 2) {
					charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
					if (!isNaN(charAtNextPosition) && charAtNextPosition > 2 && num === 1) {

						// In that case we have valid digit ot first position but entering 17 as a month is not valid
						result = null;
					} else {
						result = true;
					}
				} else {

					if (!isNaN(charAtCurrentPosition) && charAtCurrentPosition === 1) {

						// In that case we have, 1 on first position and we know the the entered number is greater than 3, which is not valid and we want to move the index to the next group
						if (num === 2) {
							result = true;
						} else {
							result = null;
						}
					} else if (this._editorInput.val().charAt(position) ===
						this.options.unfilledCharsPrompt) {
						if (num < 2) {
							result = true;
						} else {
							result = null;
						}
					} else {

						// First position is either empty, or 0, so all the digits are valid for month.
						this._setSelectionRange(this._editorInput[ 0 ],
							position + 1, position + 2);
						result = true;
					}
				}
			} else {

				// We need to check the previous char (digit) and if it's 3
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 1) {

					// If the previous digit is 1 the only valid digits are 0, 1 and 2;
					if (num === 0 || num === 1 || num === 2) {
						result = true;
					} else {

						// In that case the digit is not valid in case first digit in the group remains - so we delete the first digit and proceed with the entry
						this._setCursorPosition(position - 1);
						this._handleDeleteKey();
						this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						result = true;
					}
				} else {
					result = true;
				}
			}
			return result;
		},
		_validateMidDayInput: function (event, position) {
			var result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.tt) { //the cursor is on the first pair
				if (ch.toString().toLocaleLowerCase() === "a" || ch.toString().toLocaleLowerCase() === "p") {
					result = true;
				} else {
					result = false;
				}
			} else {

				// In that case we are in the second pair and we can't distinguish what the user wants to enter as the second letter is alwayas "m" (am/pm). so the result is null and the cursor will be moved to the next possible position
				result = null;
			}
			return result;
		},
		_validateHoursInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch),
					charAtPreviousPosition, charAtNextPosition;

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.hh) {

				// The 24 hours format
				if (this._dateIndices.hh24) {
					if (num === 0 || num === 1) {
						result = true;
					} else if (num === 2) {
						charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
						if (!isNaN(charAtNextPosition) && charAtNextPosition > 4 ) {

							// In that case we have valid digit ot first position but entering 37 as a day is not valid
							result = null;
						} else {
							result = true;
						}
					} else {
						result = null;
					}
				} else {

					// 12 hour format
					if (num === 0) {
						result = true;
					} else if (num === 1) {
						charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
						if (!isNaN(charAtNextPosition) && charAtNextPosition > 2) {

							// In that case we have valid digit ot first position but entering 37 as a day is not valid
							result = null;
						} else {
							result = true;
						}
					} else {
						result = null;
					}
				}
			} else {
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (this._dateIndices.hh24) {
					if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 2) {

						// If the previous digit is 2 the only valid digits are 0 and 1, 2, 3 and 4
						if (num <= 4) {
							result = true;
						} else {

							// We need to use this flag to move the cursor to the next group
							result = true;
							this._setCursorPosition(position - 1);
							this._handleDeleteKey();
							this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						}
					} else {
						result = true;
					}
				} else {
					if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 1) {
						// If the previous digit is 1 the only valid digits are 0 and 1 and 2
						if (num <= 2) {
							result = true;
						} else {
							// We need to use this flag to move the cursor to the next group
							this._setCursorPosition(position - 1);
							this._handleDeleteKey();
							this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
							result = true;

						}
					} else {
						result = true;
					}
				}

			}
			return result;
		},
		_validateMinutesInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.mm) {

				if (num < 6) {
					result = true;
				} else {
					result = true;
					this._handleDeleteKey();
					this._setSelectionRange(this._editorInput[ 0 ], position + 1, position + 2);
				}
			} else {
				result = true;
			}
			return result;
		},
		_validateSecondsInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.ss) {
				if (num < 6) {
					result = true;
				} else {
					this._handleDeleteKey();
					this._setSelectionRange(this._editorInput[ 0 ], position + 1, position + 2);
					result = true;
				}
			} else {
				result = true;
			}
			return result;
		},
		_fillCentury: function (year) {
			if (!isNaN(year)) {
				if (year >= 0 && year <= this.options.centuryThreshold) {
					year = 2000 + year;
				} else if (year < 100) {
					year = 1900 + year;
				}
			}
			return year;
		},
		_triggerInternalValueChange: function (value) { //DateEditor
			if (value === this._maskWithPrompts) {
				value = "";
			}
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);

				// We pass the new value in order to have the original value into the arguments
				this._triggerValueChanged(value);
			}
		},
		_processInternalValueChanging: function (value) { //DateEditor

			// value = this._parseDateFromMaskedValue(value);
			var parsedVal, cursorPosition;
			if (value === "") { //Empty string is passed only when the value from the _triggerInternalValueChange is equal to the empty mask with prompts
				cursorPosition = this._getCursorPosition();
				this._clearValue();
				if (this._focused && cursorPosition !== undefined) {
					// Bug #207321 If all the text is selected and the value is cleared the cursor is positioned on the first place
					cursorPosition = cursorPosition === -1 ? cursorPosition++ : cursorPosition;
					this._setCursorPosition(cursorPosition);
				}
				return;
			}
			if ($.type(value) === "date") {
				parsedVal = value;
			} else {
				parsedVal = this._parseDateFromMaskedValue(value);
			}
			parsedVal = this._getValueBetweenMinMax(parsedVal);
			if (this._validateValue(parsedVal)) {
				this._updateValue(parsedVal);
			} else {

				// If the value is not valid, we clear the editor
				if (this.options.revertIfNotValid) {
					value = this._valueInput.val();
					this._updateValue(value);
				} else {
					this._clearValue();
					value = this._valueInput.val();
				}
			}
		},
		_isValidDate: function (date) {
			date = this._getDateObjectFromValue(date);
			return date.getTime() === date.getTime();
		},
		_validateValue: function (val) { // igDateEditor
			var result, dateObj, minValue, maxValue;
			if (val === null || val === "") {
				return this._super(val);
			}
			dateObj = this._getDateObjectFromValue(val);
			if (this.options.minValue) {
			minValue = this._getDateObjectFromValue(this.options.minValue);
			}
			if (this.options.maxValue) {
			maxValue = this._getDateObjectFromValue(this.options.maxValue);
			}
			if (this._isValidDate(dateObj)) {
				if (this.options.maxValue && this._isValidDate(maxValue) && dateObj > maxValue) {
					result = false;
				} else if (this.options.minValue && this._isValidDate(minValue) && dateObj < minValue) {
					result = false;
				} else {
					result = true;
				}
			} else {
				result = false;
			}
			return result;
		},
		_getValueBetweenMinMax: function(date) {
			var validDate = date;
			if (date !== null && this._isValidDate(date)) {
				if (this.options.maxValue && date > this.options.maxValue) {
					validDate = this._getDateObjectFromValue(this.options.maxValue);
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this._getDisplayValue(new Date(this.options.maxValue))));
				} else if (this.options.minValue && date < this.options.minValue) {
					validDate = this._getDateObjectFromValue(this.options.minValue);
					this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
							this._getDisplayValue(new Date(this.options.minValue))));
				}
			}
			return validDate;
		},
		_updateValue: function (value) { //igDateEditor
			if (value === null) {
				this._maskedValue = this._maskWithPrompts;
				this._valueInput.val("");
				this.options.value = this.options.allowNullValue ? null : "";
				this._dateObjectValue = null;
			} else if (value === "") {

				// Empty string is passed only when clear is called, or when an empty value is created
				// In that case we have empty editor.

				this._maskedValue = this._maskWithPrompts;
				this._valueInput.val("");
				this.options.value = "";
				this._dateObjectValue = null;
			} else {

				// Convert the value to date object;
				this._dateObjectValue = this._getDateObjectFromValue(value);
				this._updateMaskedValue();
				this.options.value = this._getValueByDataMode();

				this._valueInput.val(this._serializeDate(this._dateObjectValue));
			}
		},
		_clearValue: function (textOnly) { //DateEditor
			var newValue = "", maskedValue = this._maskWithPrompts;
			if (this.options.allowNullValue) {
				newValue = this.options.nullValue;
				if (newValue instanceof Date) {
					maskedValue = this._updateMaskedValue(this.options.nullValue, true);
				}
			}
			this._editorInput.val(maskedValue);
			if (!textOnly) {
				this._updateValue(newValue);
			}
			if (this._editMode === false) {
				this._exitEditMode();
			}
		},
		_getDateObjectFromValue: function (value) { //DateEditor
			var date;
			if (this._mvcDateRegex.test(value)) {
				date = new Date(parseInt(value.replace(this._mvcDateRegex, "$1"), 10));
			} else {
				date = new Date(value);
			}
			return date;
		},
		_getValueByDataMode: function () {
			var dataModeValue,
				maskedVal = this._maskedValue ? this._maskedValue : this._maskWithPrompts,
				dataMode = this.options.dataMode;

			switch (dataMode) {
				case "date": {
					dataModeValue = this._dateObjectValue;
				}
					break;
				case "displayModeText": {
					dataModeValue = this._getDisplayValue();
				}
					break;
				case "editModeText": {
					dataModeValue = maskedVal;
				}
					break;
				default: {

					// If the option is not valid we default back to the date
						dataModeValue = this._dateObjectValue;
				}
			}
			return dataModeValue;
		},
		_getDateOffset: function(date) {
			var newDate, zoneOffset;

			if (!date) {
				return date;
			}
			newDate = new Date(date.getTime());
			zoneOffset = newDate.getTimezoneOffset();
			newDate.setUTCMinutes(newDate.getUTCMinutes() +
				zoneOffset + this.options.displayTimeOffset);
			if (zoneOffset !== newDate.getTimezoneOffset()) {
				// if date changes offset due to DST, re-adjust
				newDate.setUTCMinutes(newDate.getUTCMinutes() +
					newDate.getTimezoneOffset() - zoneOffset);
			}
			return newDate;
		},
		_clearDateOffset: function(date) {
			date.setUTCMinutes(date.getUTCMinutes() -
				date.getTimezoneOffset() - this.options.displayTimeOffset);
		},
		_parseDateFromMaskedValue: function (value) {
			var dateField, monthField, yearField, hourField, minutesField, secondsField,
				millisecondsField, midDayField,
				dateStartIndex = this._dateIndices.dd, regExpr, ffCount, lastDayOfMonth,
				monthStartIndex = this._dateIndices.MM,
				yearStartIndex = this._dateIndices.yy,
				hourStartIndex = this._dateIndices.hh,
				minuteStartIndex = this._dateIndices.mm,
				secondsStartIndex = this._dateIndices.ss,
				midDayStartIndex = this._dateIndices.tt,
				millisecondsStartIndex = this._dateIndices.ff,
				extractedDate = "";
			if (value === "" || value === null || $.type(value) === "date") {

				// That case is when in the process value changing the value is equal to the empty mask. We don"t have any user input.
				return extractedDate;
			}

			// Extract Day
			if (dateStartIndex !== undefined && dateStartIndex !== null) {
				dateField = value.substring(dateStartIndex, dateStartIndex + 2);
				if (dateField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					dateField = dateField.replace(regExpr, "");
				}
				if (dateField !== "") {
					dateField = parseInt(dateField, 10);
					if (dateField <= 0) {
						//0 is not valid date
						dateField = null;
					}
				} else {
					dateField = null;
				}
			}

			// Extract Month
			if (monthStartIndex !== undefined && monthStartIndex !== null) {
				monthField = value.substring(monthStartIndex, monthStartIndex + 2);
				if (monthField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					monthField = monthField.replace(regExpr, "");
				}
				if (monthField !== "") {
					monthField = parseInt(monthField, 10);
					if (monthField <= 0) {
						monthField = null;
					} else {

					// jquery uses zero base months while the user enters real months
					monthField--;
					}
				} else {
					monthField = null;
				}
			}

			// Extract Year
			if (yearStartIndex !== undefined && yearStartIndex !== null) {
				if (this._dateIndices.fourDigitYear) {
					yearField = value.substring(yearStartIndex, yearStartIndex + 4);
				} else {
					yearField = value.substring(yearStartIndex, yearStartIndex + 2);
				}
				if (yearField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					yearField = yearField.replace(regExpr, "");
				}
				if (yearField !== "") {
					yearField = parseInt(yearField, 10);
					yearField = this._fillCentury(yearField);
				} else {
					yearField = null;
				}

				//TODO Century
			}

			// Extract midday am/pm
			if (midDayStartIndex !== undefined && midDayStartIndex !== null) {
				midDayField = value.substring(midDayStartIndex, midDayStartIndex + 1);
				if (midDayField === this.options.unfilledCharsPrompt) {
					midDayField = null;
				} else {

					// Possible values "a" and "p"
					midDayField = midDayField.toLocaleLowerCase();
				}
			}

			// Extract Hour
			if (hourStartIndex !== undefined && hourStartIndex !== null) {
				hourField = value.substring(hourStartIndex, hourStartIndex + 2);
				if (hourField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					hourField = hourField.replace(regExpr, "");
				}
				if (hourField !== "") {
					hourField = parseInt(hourField, 10);
					if (this._dateIndices.hh24 === false) {
						if (midDayField && midDayField === "p") {

							// Bug 209696 T.P. 25.11.2015 In that case there is PM flag entered and hour field is 12, so it should be left as it is.
							if (hourField !== 12) {
								hourField += 12;
							}
						} else if (hourField === 12) {

							// Bug 209696 T.P. 25.11.2015. In that case there is AM flag entered and hour field is 12, so it should be converted to 0
							hourField = 0;
						}
					}
				} else {
					hourField = null;
				}
			}

			//Extract Minute
			if (minuteStartIndex !== undefined && minuteStartIndex !== null) {
				minutesField = value.substring(minuteStartIndex, minuteStartIndex + 2);
				if (minutesField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					minutesField = minutesField.replace(regExpr, "");
				}
				if (minutesField !== "") {
					minutesField = parseInt(minutesField, 10);
				} else {
					minutesField = null;
				}
			}

			// Extract Seconds
			if (secondsStartIndex !== undefined && secondsStartIndex !== null) {
				secondsField = value.substring(secondsStartIndex, secondsStartIndex + 2);
				if (secondsField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					secondsField = secondsField.replace(regExpr, "");
				}
				if (secondsField !== "") {
					secondsField = parseInt(secondsField, 10);

				} else {
					secondsField = null;
				}

			}

			//Extract Milliseconds
			if (millisecondsStartIndex !== undefined && millisecondsStartIndex !== null) {
				millisecondsField = value.substring(millisecondsStartIndex,
					millisecondsStartIndex + this._dateIndices.ffLength);
				if (millisecondsField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					millisecondsField = millisecondsField.replace(regExpr, "");
				}
				if (millisecondsField !== "") {
					if (millisecondsField.length < this._dateIndices.ffLength) {
						ffCount = this._dateIndices.ffLength - millisecondsField.length;

						// If the user has entered 1 in 3 digit field - the value is converted into 300
						millisecondsField = parseInt(millisecondsField, 10) * Math.pow(10, ffCount);
					}
					millisecondsField = parseInt(millisecondsField, 10);
					if (this._dateIndices.ffLength === 2) {
						millisecondsField *= 10;
					} else if (this._dateIndices.ffLength === 1) {
						millisecondsField *= 100;
					}
				} else {
					millisecondsField = null;
				}
			}

			if (!this._dateObjectValue) {

				// If we have year, month and day field we create date from them, else we create today date.
				if (yearField !== null && yearField !== undefined &&
					monthField !== null && monthField !== undefined &&
					dateField !== null && dateField !== undefined) {
					extractedDate = new Date(yearField, monthField, dateField);
				} else {
					extractedDate = this._setNewDateMidnight();
					if (yearField !== null && yearField !== undefined) {
						this._setDateField("FullYear", extractedDate, yearField);
					}
					if (monthField !== null && monthField !== undefined) {
						this._setDateField("Month", extractedDate, monthField);
					}
					if (dateField !== null && dateField !== undefined) {
						lastDayOfMonth = this._lastDayOfMonth(this
							._getDateField("FullYear", extractedDate),
								this._getDateField("Month", extractedDate) + 1);
						if (dateField > lastDayOfMonth) {
							dateField = lastDayOfMonth;
						}
						this._setDateField("Date", extractedDate, dateField);
					}
				}
			} else {

				// extractedDate = this._dateObjectValue;
				// N.A. 11/10/2015 Bug #207560: Set new date using timestamp.
				extractedDate = new Date(this._dateObjectValue.getTime());
			}
			if (yearField !== null && yearField !== undefined) {
				this._setDateField("FullYear", extractedDate, yearField);
			}
			if (monthField !== null && monthField !== undefined) {

				if (dateField !== null && dateField !== undefined) {
					//temporary set day to be in the middle of the month to ensure when setting the month the day won't overflow into the next month.
					this._setDateField("Date", extractedDate, "15");
				}
				this._setDateField("Month", extractedDate, monthField);
			}
			if (dateField !== null && dateField !== undefined) {
				lastDayOfMonth = this._lastDayOfMonth(this
					._getDateField("FullYear", extractedDate),
					this._getDateField("Month", extractedDate) + 1);
				if (dateField > lastDayOfMonth) {
					dateField = lastDayOfMonth;
				}
				this._setDateField("Date", extractedDate, dateField);
			}
			if (hourField !== null && hourField !== undefined) {
				this._setDateField("Hours", extractedDate, hourField);
			}
			if (minutesField !== null && minutesField !== undefined) {
				this._setDateField("Minutes", extractedDate, minutesField);
			}
			if (secondsField !== null && secondsField !== undefined) {
				this._setDateField("Seconds", extractedDate, secondsField);
			}
			if (millisecondsField !== null && millisecondsField !== undefined) {
				this._setDateField("Milliseconds", extractedDate, millisecondsField);
			}

			if (this.options.displayTimeOffset !== null) {
				this._clearDateOffset(extractedDate);
			}
			return extractedDate;

		},
		_getDisplayValue: function (newDate) { //igDateEditor
			var maskVal, dateObject = newDate ? newDate : this._dateObjectValue;

			if (!dateObject) {
				return "";
			}

			if (this.options.displayTimeOffset !== null) {
				dateObject = this._getDateOffset(dateObject);
			}

			maskVal = this.options.dateDisplayFormat;
			maskVal = maskVal.replace(/\x08/g, " ").replace(/\x09/g, " ");
			maskVal = maskVal.replace(/\\f/g, "\x01").replace(/\\d/g, "\x02")
				.replace(/\\s/g, "\x03").replace(/\\m/g, "\x04").replace(/\\t/g, "\x05")
				.replace(/\\H/g, "\x06").replace(/\\h/g, "\x07").replace(/\\M/g, "\x08")
				.replace(/\\y/g, "\x09");

			// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
			// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
			// 20-ddd,21-dddd,22-f,23-ff,24-fff
			// Temporary remove 0 and 9, as they are valid mask flags
			// maskVal = maskVal.replace(/9/g, "\x11").replace(/0/g, "\x12");

			// Mark all flags as hexadecimal
			maskVal = maskVal.replace(/fff/g, "\x10030")
				.replace(/ff/g, "\x10031")
				.replace(/f/g, "\x10032");

			maskVal = maskVal.replace(/dddd/g, "\x10033")
				.replace(/ddd/g, "\x10034")
				.replace(/dd/g, "\x10035")
				.replace(/d/g, "\x10036")
				.replace(/ss/g, "\x10037")
				.replace(/s/g, "\x10038")
				.replace(/mm/g, "\x10039")
				.replace(/m/g, "\x10040");
			maskVal = maskVal.replace(/tt/g, "\x10041")
				.replace(/t/g, "\x10042")
				.replace(/HH/g, "\x10043")
				.replace(/H/g, "\x10044")
				.replace(/hh/g, "\x10045")
				.replace(/h/g, "\x10046");
			maskVal = maskVal.replace(/MMMM/g, "\x10047")
				.replace(/MMM/g, "\x10048")
				.replace(/MM/g, "\x10049")
				.replace(/M/g, "\x10050");
			maskVal = maskVal.replace(/yyyy/g, "\x10051")
				.replace(/yy/g, "\x10052")
				.replace(/y/g, "\x10053");

			maskVal = maskVal.replace(/\x10030/g,
				this._getMilliseconds(this._getDateField("Milliseconds", dateObject), 1))
				.replace(/\x10031/g, this._getMilliseconds(this._getDateField("Milliseconds",
					dateObject), 10))
				.replace(/\x10032/g, this._getMilliseconds(this._getDateField("Milliseconds",
					dateObject), 100));

			maskVal = maskVal.replace(/\x10033/g,
				this._getDay(this._getDateField("Day", dateObject), "dddd"))
				.replace(/\x10034/g, this._getDay(this._getDateField("Day", dateObject), "ddd"))
				.replace(/\x10035/g, this._getDate(this._getDateField("Date", dateObject), "dd"))
				.replace(/\x10036/g, this._getDate(this._getDateField("Date", dateObject), "d"))
				.replace(/\x10037/g,
					this._getSeconds(this._getDateField("Seconds", dateObject), "ss"))
				.replace(/\x10038/g,
					this._getSeconds(this._getDateField("Seconds", dateObject), "s"))
				.replace(/\x10039/g,
					this._getMinutes(this._getDateField("Minutes", dateObject), "mm"))
				.replace(/\x10040/g,
					this._getMinutes(this._getDateField("Minutes", dateObject), "m"))

				.replace(/\x10041/g,
					this._getAMorPM(this._getDateField("Hours", dateObject), "tt"))
				.replace(/\x10042/g, this._getAMorPM(this._getDateField("Hours", dateObject), "t"))
				.replace(/\x10043/g, this._getHours(this._getDateField("Hours", dateObject), "HH"))
				.replace(/\x10044/g, this._getHours(this._getDateField("Hours", dateObject), "H"))
				.replace(/\x10045/g, this._getHours(this._getDateField("Hours", dateObject), "hh"))
				.replace(/\x10046/g, this._getHours(this._getDateField("Hours", dateObject), "h"));

			maskVal = maskVal.replace(/\x10047/g,
				this._getMonth(this._getDateField("Month", dateObject), "MMMM"))
				.replace(/\x10048/g, this._getMonth(this._getDateField("Month", dateObject), "MMM"))
				.replace(/\x10049/g, this._getMonth(this._getDateField("Month", dateObject), "MM"))
				.replace(/\x10050/g, this._getMonth(this._getDateField("Month", dateObject), "M"));

			maskVal = maskVal.replace(/\x10051/g,
				this._getYear(this._getDateField("FullYear", dateObject), "yyyy"))
				.replace(/\x10052/g, this._getYear(this._getDateField("FullYear", dateObject), "yy"))
				.replace(/\x10053/g, this._getYear(this._getDateField("FullYear", dateObject), "y"));

			// Restore original \\f,d,s,m,etc.
			maskVal = maskVal.replace(/\x01/g, "g").replace(/\x02/g, "d").replace(/\x03/g, "s")
				.replace(/\x04/g, "m").replace(/\x05/g, "t").replace(/\x06/g, "H")
				.replace(/\x07/g, "h").replace(/\x08/g, "M").replace(/\x09/g, "y");

			return maskVal;
		},
		_valueFromText: function (text) { //igDateEditor
			// TODO Verify
			var dateFromText = this._parseDateFromMaskedValue(text), dataModeValue;
			switch (this.options.dataMode) {
				case "date": {
					dataModeValue = dateFromText;
				}
					break;
				case "displayModeText": {
					dataModeValue = this._getDisplayValue(dateFromText);
				}
					break;
				case "editModeText": {
					dataModeValue = this._getInternalMaskedValue(dateFromText);
				}
					break;
				default: {

					// If the option is not valid we default back to the date
					dataModeValue = dateFromText;
				}
			}
			return dataModeValue;
		},

		// We use flag for different mask flags f milliseconds field in thousands, ff milliseconds field in tenths, fff milliseconds field in hundreds
		_getMilliseconds: function (milliseconds, flag) {
			var result = parseInt(milliseconds / flag).toString();
			if (flag === 10) {
				if (result.length !== 2) {
					while (result.length < 2) {
						result = "0" + result;
					}
				}
			} else if (flag === 1) {

				// Flag 1
				if (result.length !== 3) {
					while (result.length < 3) {
						result = "0" + result;
					}
				}
			}
			return result;
		},

		// Flag values are dddd, ddd, dd, d - according to the
		_getSeconds: function (seconds, flag) {
			var result;
			if (flag === "ss" && seconds < 10) {
				result = "0" + seconds.toString();
			} else {
				result = seconds.toString();
			}
			return result;
		},
		_getMinutes: function (minutes, flag) {
			var result;
			if (flag === "mm" && minutes < 10) {
				result = "0" + minutes.toString();
			} else {
				result = minutes.toString();
			}
			return result;
		},

		// Get before midday, or after middday
		_getAMorPM: function (hours, flag) {
			var result;
			if (hours >= 12) {

				// pm
				result = this._getRegionalOption("pm");
			} else {
				result = this._getRegionalOption("am");
			}
			if (flag === "t") {
				result = result.charAt(0);
			}
			return result;
		},
		_getHours: function (hours, flag) {
			var result;
			switch (flag) {
				case "h": {
					if (hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (hours === 0) {
						hours = 12;
					}
					result = hours.toString();
				}
					break;
				case "hh": {
					if (hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (hours === 0) {
						hours = 12;
					}
					if (hours < 10) {
						result = "0" + hours.toString();
					} else {
						result = hours.toString();
					}
				}
					break;
				case "H": {
					result = hours.toString();
				}
					break;
				case "HH": {
					if (hours < 10) {
						result = "0" + hours.toString();
					} else {
						result = hours.toString();
					}
				}
					break;

			}
			return result;
		},
		_getDate: function (date, flag) {
			var result;
			switch (flag) {
				case "dd": {
					if (date < 10) {
						result = "0" + date.toString();
					} else {
						result = date;
					}
				}
					break;
				case "d": {
					result = date.toString();
				}
					break;
			}
			return result;
		},
		_getDay: function (day, flag) {
			var result;
			switch (flag) {
				case "dddd": {
					result = this._getRegionalOption("dayNames")[ day ];
				}
					break;
				case "ddd": {
					result = this._getRegionalOption("dayNamesShort")[ day ];
				}
					break;
			}
			return result;
		},
		_getMonth: function (month, flag) {
			var result;
			switch (flag) {
				case "MMMM": {
					result = this._getRegionalOption("monthNames")[ month ];
				}
					break;
				case "MMM": {
					result = this._getRegionalOption("monthNamesShort")[ month ];
				}
					break;
				case "MM": {
					month++;
					if (month < 10) {
						result = "0" + month.toString();
					} else {
						result = month;
					}
				}
					break;
				case "M": {
					month++;
					result = month.toString();
				}
					break;
			}
			return result;
		},
		_getYear: function (year, flag) {
			var result;
			if (flag === "yy") {
				result = year.toString().substring(2);
			} else if (flag === "y") {
				result = parseInt(year.toString().substring(2)).toString();
			} else {
				result = year.toString();
			}
			return result;

		},
		_handleBackSpaceKey: function () { //igDateEditor
			var cursorPosition;
			this._super();
			cursorPosition = this._getSelection(this._editorInput[ 0 ]).start;
			if (cursorPosition === this._dateIndices.tt ||
				(cursorPosition - 1) === this._dateIndices.tt) {
				if (this._dateIndices._ttLength === 2) {
					if (cursorPosition === this._dateIndices.tt) {
						this._setCursorPosition(cursorPosition + 1);
						$.ui.igMaskEditor.prototype._handleDeleteKey.call(this);
						this._setCursorPosition(cursorPosition);
					} else {
						this._super();
					}
				}
			}
		},
		_handleDeleteKey: function (skipCursorPosition) { //igDateEditor
			var cursorPosition = this._getSelection(this._editorInput[ 0 ]).start;
			if (cursorPosition === this._maskWithPrompts.length) {
				// D.P. Should do nothing at end of input
				return;
			}
			this._super(skipCursorPosition);
			cursorPosition = this._getSelection(this._editorInput[ 0 ]).start;
			if ((cursorPosition - 2) === this._dateIndices.tt ||
				(cursorPosition - 1) === this._dateIndices.tt) {
				if (this._dateIndices._ttLength === 2) {
					if ((cursorPosition - 1) === this._dateIndices.tt) {
						this._super(skipCursorPosition);
					} else {
						if (!skipCursorPosition) {
							this._setCursorPosition(cursorPosition - 1);
						}
						$.ui.igMaskEditor.prototype._handleBackSpaceKey.call(this);
						if (!skipCursorPosition) {
							this._setCursorPosition(cursorPosition);
						}
					}
				}
			}
		},
		_setMillisecondsEditMode: function (mask, time, currentMilliseconds, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMilliseconds,
				secondsUpdateDelta = 0, currentSecond, timeSecond, boundary;

			switch (this._dateIndices.ffLength) {
				case 1: boundary = 10; break;
				case 2: boundary = 100; break;
				case 3: boundary = 1000; break;
			}
			if (currentMilliseconds + delta >= boundary) {
				if (isLimited) {
					newMilliseconds = currentMilliseconds;
				} else {
					newMilliseconds = (currentMilliseconds + delta) - boundary;
					secondsUpdateDelta = 1;
				}
			} else if (currentMilliseconds + delta < 0) {
				if (isLimited) {
					newMilliseconds = currentMilliseconds;
				} else {
					if (currentMilliseconds + delta === 0) {
						newMilliseconds = 0;
					} else {
						newMilliseconds = boundary + (currentMilliseconds + delta);
						secondsUpdateDelta = -1;
					}
				}
			} else {
				newMilliseconds = currentMilliseconds + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMilliseconds, newMilliseconds);
			if (secondsUpdateDelta !== undefined && secondsUpdateDelta !== 0) {
				timeSecond = this._createSecondsPosition();
				if (timeSecond !== null) {
					currentSecond = parseInt(this._getStringRange(mask, timeSecond.startPosition,
						timeSecond.endPosition), 10);
					mask = this._setSecondsEditMode(mask, timeSecond,
						currentSecond, secondsUpdateDelta);
				} else {

					// This is the case, when we don't have seconds in the mask, but we increase/decrease the milliseconds to the next/previous second.
					// In such a situation, we update the internal date with the new second, so that when we loose focus the second is the correct one.
					if (!isLimited) {
						this._setDateField("Seconds",
							this._dateObjectValue,
							this._getDateField("Seconds", this._dateObjectValue) +
								secondsUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setSecondsEditMode: function (mask, time, currentSecond, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newSecond,
				minuteUpdateDelta = 0, currentMinute, timeMinute;

			delta = delta % 60;
			if (currentSecond + delta >= 60) {
				if (isLimited) {
					newSecond = currentSecond;
				} else {
					newSecond = (currentSecond + delta) - 60;
					minuteUpdateDelta = 1;
				}
			} else if (currentSecond + delta < 1) {
				if (isLimited) {
					newSecond = currentSecond;
				} else {
					if (currentSecond + delta === 0) {
						newSecond = 0;
					} else {
						newSecond = 60 + (currentSecond + delta);
						minuteUpdateDelta = -1;
					}
				}
			} else {
				newSecond = currentSecond + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentSecond, newSecond);
			if (minuteUpdateDelta !== undefined && minuteUpdateDelta !== 0) {
				timeMinute = this._createMinutesPosition();
				if (timeMinute !== null) {
					currentMinute = parseInt(this._getStringRange(mask,
						timeMinute.startPosition, timeMinute.endPosition), 10);
					mask = this._setMinutesEditMode(mask,
						timeMinute, currentMinute, minuteUpdateDelta);
				} else {

					// This is the case, when we don't have minute in the mask, but we increase/decrease the seconds to the next/previous minute.
					// In such a situation, we update the internal date with the new minute, so that when we loose focus the minute is the correct one.
					if (!isLimited) {
						this._setDateField("Minutes",
							this._dateObjectValue,
							this._getDateField("Minutes", this._dateObjectValue) +
								minuteUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setMinutesEditMode: function (mask, time, currentMinute, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMinute,
				hourUpdateDelta = 0, currentHour, timeHour;

			delta = delta % 60;
			if (currentMinute + delta >= 60) {
				if (isLimited) {
					newMinute = currentMinute;
				} else {
					newMinute = (currentMinute + delta) - 60;
					hourUpdateDelta = 1;
				}
			} else if (currentMinute + delta < 1) {
				if (isLimited) {
					newMinute = currentMinute;
				} else {
					if (currentMinute + delta === 0) {
						newMinute = 0;
					} else {
						newMinute = 60 + (currentMinute + delta);
						hourUpdateDelta = -1;
					}
				}
			} else {
				newMinute = currentMinute + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMinute, newMinute);
			if (hourUpdateDelta !== undefined && hourUpdateDelta !== 0) {
				timeHour = this._createHoursPosition();
				if (timeHour !== null) {
					currentHour = parseInt(this._getStringRange(mask,
						timeHour.startPosition, timeHour.endPosition), 10);
					mask = this._setHoursEditMode(mask, timeHour, currentHour, hourUpdateDelta);
				} else {

					// This is the case, when we don't have hours in the mask, but we increase/decrease the minute to the next/previous hour.
					// In such a situation, we update the internal date with the new hour, so that when we loose focus the hour is the correct one.
					if (!isLimited) {
						this._setDateField("Hours",
							this._dateObjectValue,
							this._getDateField("Hours", this._dateObjectValue) +
								hourUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setHoursEditMode: function (mask, time, currentHour, delta) {
			var isLimited = this.options.limitSpinToCurrentField,
				is24format = this._dateIndices.hh24,
				dayUpdateDelta = false,
				amPmUpdateDelta = false,
				newHour, hours, wrapUpHours, wrapDownHours, currentDay, currentAmPm,
				timeDay, timeAmPm, dayDelta;

			if (is24format) {
				hours = 24;
				newHour = currentHour + (delta % 24);
				wrapUpHours = newHour >= hours; // The maximum hour in 24H format is 23, that's why 24 is the turning point.
				wrapDownHours = newHour < 0; // The minumum hour in 24H format is 00, that's why -1 is the turing point.
			} else {
				hours = 12;
				newHour = currentHour + (delta % 12);
				wrapUpHours = newHour > hours; // The maximum hour in 12H format is 12, that's why 13 is the turning point.
				wrapDownHours = newHour < 1; // The minumum hour in 12H format is 01, that's why 0 is the turning point.
				currentAmPm = (mask.toLowerCase().indexOf(" pm") >= 0) ? "pm" : "am";
			}

			if (wrapUpHours) {
				if (isLimited) {
					newHour = currentHour;
				} else {
					dayDelta = (delta !== 0) ? 1 : 0;
					if (is24format) {

						// In 24H format date, when the hour changes (wraps up) from 23 to 00, this is the time that the day is increased also.
						newHour -= hours;
						dayUpdateDelta = true;
					} else {

						// In 12H format date, when the hour changes (wraps up) from 12 to 01, this is NOT the time that the day is increased.
						// It is increased an hour earlier. (implemented in the top else block).
						if (newHour >= 13) {
							newHour = newHour - hours;
							if (newHour > 13 || delta > 1) {
								amPmUpdateDelta = true;
							}
							if (currentAmPm === "pm") {
								dayUpdateDelta = true;
							}
						}
					}
				}
			} else if (wrapDownHours) {
				if (isLimited) {
					newHour = currentHour;
				} else {
					dayDelta = (delta !== 0) ? -1 : 0;
					if (is24format) {

						// In 24H format date, when the hour changes (wraps up) from 00 to 23, this is the time that the day is decreased also.
						newHour += hours;
						dayUpdateDelta = true;
					} else {

						// In 12H format date, when the hour changes (wraps down) from 01 to 12, this is NOT the time that the day is decreased.
						// It is decreased an hour later. (implemented in the top else block).
						// N.A. September 15th, 2016 #342: Fix spinning down of the limit value.
						if (newHour <= 0) {
							newHour = 12 + newHour;
							if (newHour < 0 || delta < -1) {
								amPmUpdateDelta = true;
							}
							if (currentAmPm === "am") {
								dayUpdateDelta = true;
							}
						}
					}
				}
			} else {
				if (!is24format) {

					// Update AM/PM and date in 12H format.
					if (delta > 0 && newHour >= 12 && newHour - delta < 12 ) {
						dayDelta = (delta !== 0) ? 1 : 0;
						amPmUpdateDelta = true;
						if (currentAmPm === "pm") {
							dayUpdateDelta = true;
						}
					}
					if (delta < 0 && newHour < 12 && newHour - delta >= 12) {
						dayDelta = (delta !== 0) ? -1 : 0;
						amPmUpdateDelta = true;
						if (currentAmPm === "am") {
							dayUpdateDelta = true;
						}
					}
				}
			}

			mask = this._setTimeEditMode(mask, time, currentHour, newHour);
			if (amPmUpdateDelta) {
				timeAmPm = this._createAmOrPmPosition();
				if (timeAmPm !== null) {
					mask = this._setAmOrPmEditMode(mask, timeAmPm, currentAmPm);
				}
			}
			if (dayUpdateDelta) {
				timeDay = this._createDayPosition();
				if (timeDay !== null) {
					currentDay = parseInt(this._getStringRange(mask, timeDay.startPosition,
						timeDay.endPosition), 10);
					mask = this._setDayEditMode(mask, timeDay, currentDay, dayDelta);
				} else {

					// This is the case, when we don't have day in the mask, but we increase/decrease the hour to the next/previous day.
					// In such a situation, we update the internal date with the new day, so that when we loose focus the day is the correct one.
					if (!isLimited) {
						this._setDateField("Date", this._dateObjectValue,
							this._getDateField("Date", this._dateObjectValue) + dayDelta);
					}
				}
			}
			return mask;
		},
		_setAmOrPmEditMode: function (mask, time, currentAmOrPm, noSwap) {
			var newAmOrPm;
			if (noSwap) {
				newAmOrPm = currentAmOrPm;
			} else {
				if (currentAmOrPm.toLocaleLowerCase() === "am") {
					newAmOrPm = "PM";
				} else {
					newAmOrPm = "AM";
				}
			}
			mask = this._setTimeEditMode(mask, time, currentAmOrPm, newAmOrPm);
			return mask;
		},
		_lastDayOfMonth: function (year, month) {
			var day;

			if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 ||
				month === 10 || month === 12) {
				day = 31;
			} else if (month === 4 || month === 6 || month === 9 || month === 11) {
				day = 30;
			} else if (month === 2 && year % 4 === 0) {
				day = 29;
			} else if (month === 2 && year % 4 !== 0) {
				day = 28;
			}
			return day;
		},
		_setDayEditMode: function (mask, time, currentDay, delta) {
			var isLimited = this.options.limitSpinToCurrentField, currentYear,
				currentMonth, lastDayOfMonth, lastDayOfPreviousMonth, newDay,
				monthUpdateDelta, timeYear, timeMonth, today;

			today = new Date();
			timeYear = this._createYearPosition();
			if (timeYear === null) {
				currentYear = today.getFullYear();
			} else {
				currentYear = parseInt(this._getStringRange(mask,
					timeYear.startPosition, timeYear.endPosition), 10);
			}
			timeMonth = this._createMonthPosition();
			if (timeMonth === null) {
				currentMonth = today.getMonth() + 1;
			} else {
				currentMonth = parseInt(this._getStringRange(mask,
					timeMonth.startPosition, timeMonth.endPosition), 10);
			}
			lastDayOfMonth = this._lastDayOfMonth(currentYear, currentMonth);
			lastDayOfPreviousMonth = this._lastDayOfMonth(currentYear,
				currentMonth - 1 !== 0 ? currentMonth - 1 : 12);

			if (currentDay + delta > lastDayOfMonth) {
				if (isLimited) {
					newDay = currentDay;
				} else {
					newDay = (currentDay + delta) - lastDayOfMonth;
					monthUpdateDelta = 1;
				}
			} else if (currentDay + delta < 1) {
				if (isLimited) {
					newDay = currentDay;
				} else {
					newDay = lastDayOfPreviousMonth + (currentDay + delta);
					monthUpdateDelta = -1;
				}
			} else {
				newDay = currentDay + delta;
				}
			mask = this._setTimeEditMode(mask, time, currentDay, newDay);
			if (monthUpdateDelta !== undefined && monthUpdateDelta !== 0) {
				timeMonth = this._createMonthPosition();
				if (timeMonth !== null) {
					currentMonth = parseInt(this._getStringRange(mask, timeMonth.startPosition,
						timeMonth.endPosition), 10);
					mask = this._setMonthEditMode(mask, timeMonth, currentMonth, monthUpdateDelta);
				} else {

					// This is the case, when we don't have month in the mask, but we increase/decrease the days to the next/previous month.
					// In such a situation, we update the internal date with the new month, so that when we loose focus the month is the correct one.
					if (!isLimited) {
						this._setDateField("Month", this._dateObjectValue,
							this._getDateField("Month", this._dateObjectValue) + monthUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setMonthEditMode: function (mask, time, currentMonth, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMonth, yearUpdateDelta = 0,
				currentYear, timeYear;
			if (currentMonth + delta > 12) {
				if (isLimited) {
					newMonth = currentMonth;
				} else {
					newMonth = (currentMonth + delta) - 12;
					yearUpdateDelta = 1;
				}
			} else if (currentMonth + delta < 1) {
				if (isLimited) {
					newMonth = currentMonth;
				} else {
					newMonth = 12 + (currentMonth + delta);
					yearUpdateDelta = -1;
				}
			} else {
				newMonth = currentMonth + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMonth, newMonth);
			if (yearUpdateDelta !== undefined && yearUpdateDelta !== 0) {
				timeYear = this._createYearPosition();
				if (timeYear !== null) {
					currentYear = parseInt(this._getStringRange(mask,
						timeYear.startPosition, timeYear.endPosition), 10);
					mask = this._setYearEditMode(mask, timeYear, currentYear, yearUpdateDelta);
				} else {

					// This is the case, when we don't have year in the mask, but we increase/decrease the month to the next/previous year.
					// In such a situation, we update the internal date with the new year, so that when we loose focus the month is the correct one.
					if (!isLimited) {
						this._setDateField("FullYear",
							this._dateObjectValue,
							this._getDateField("FullYear", this._dateObjectValue) + yearUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setYearEditMode: function (mask, time, currentYear, delta) {
			var newYear;
			if (currentYear + delta < 0) {
				newYear = currentYear;
			} else {
				newYear = currentYear + delta;
			}
			newYear = newYear.toString();
			if (!this._dateIndices.fourDigitYear) {
				newYear = newYear.substring(newYear.length - 2, newYear.length);
			}
			mask = this._setTimeEditMode(mask, time, currentYear, newYear);
			return mask;
		},
		_setTimeEditMode: function (mask, time, currentValue, newValue) {
			var newValueAsString;

			newValueAsString = newValue.toString();
			if (newValueAsString.length === 1) {
				if (!(time.name === "milliseconds" && this._dateIndices.ffLength === 1)) {

					// Only when milliseconds mask is with length 1, then we don't precede the new value with 0.
					newValueAsString = "0" + newValueAsString;
				}
				if (time.name === "milliseconds" && this._dateIndices.ffLength === 3) {
					newValueAsString = "0" + newValueAsString;
				}

				// N.A. 3/17/2016 Bug #216293: When we don't have date object and we spin the year needs additional 0, depending on the current year we are spinning.
				if (time.name === "year" && this._dateIndices.fourDigitYear) {
					newValueAsString = "00" + newValueAsString;
				}
			} else if (newValueAsString.length === 2 &&
				time.name === "year" && this._dateIndices.fourDigitYear) {
				newValueAsString = "00" + newValueAsString;
			} else if (newValueAsString.length === 3 &&
				time.name === "year" && this._dateIndices.fourDigitYear) {
				newValueAsString = "0" + newValueAsString;
			}
			mask = this._replaceStringRange(mask,
				newValueAsString, time.startPosition, time.endPosition - 1);

			return mask;
		},
		_createYearPosition: function () {
			var time = null;
			if (this._dateIndices.yy !== undefined) {
				time = {};
				time.name = "year";
				time.startPosition = this._dateIndices.yy;
				time.length = this._dateIndices.fourDigitYear ? 4 : 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMonthPosition: function () {
			var time = null;
			if (this._dateIndices.MM !== undefined) {
				time = {};
				time.name = "month";
				time.startPosition = this._dateIndices.MM;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createDayPosition: function () {
			var time = null;
			if (this._dateIndices.dd !== undefined) {
				time = {};
				time.name = "day";
				time.startPosition = this._dateIndices.dd;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createAmOrPmPosition: function () {
			var time = null;
			if (this._dateIndices.tt !== undefined) {
				time = {};
				time.name = "amOrPm";
				time.startPosition = this._dateIndices.tt;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createHoursPosition: function () {
			var time = null;
			if (this._dateIndices.hh !== undefined) {
				time = {};
				time.name = "hours";
				time.startPosition = this._dateIndices.hh;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMinutesPosition: function () {
			var time = null;
			if (this._dateIndices.mm !== undefined) {
				time = {};
				time.name = "minutes";
				time.startPosition = this._dateIndices.mm;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createSecondsPosition: function () {
			var time = null;
			if (this._dateIndices.ss !== undefined) {
				time = {};
				time.name = "seconds";
				time.startPosition = this._dateIndices.ss;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMillisecondsPosition: function () {
			var time = null;
			if (this._dateIndices.ff !== undefined) {
				time = {};
				time.name = "milliseconds";
				time.startPosition = this._dateIndices.ff;
				time.length = this._dateIndices.ffLength;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_getTimePosition: function () {
			var cursorPosition = this._getCursorPosition(),
				indices = this._dateIndices, time = null;

			if (cursorPosition < 0) {
				cursorPosition = 0;
			}
			if (cursorPosition >= indices.yy &&
				(indices.fourDigitYear && cursorPosition <= indices.yy + 4 ||
					(indices.fourDigitYear === undefined || indices.fourDigitYear === false) &&
						cursorPosition <= indices.yy + 2)) {
				time = this._createYearPosition();
			} else if (cursorPosition >= indices.MM && cursorPosition <= indices.MM + 2) {
				time = this._createMonthPosition();
			} else if (cursorPosition >= indices.dd && cursorPosition <= indices.dd + 2) {
				time = this._createDayPosition();
			} else if (cursorPosition >= indices.tt && cursorPosition <= indices.tt + 2) {
				time = this._createAmOrPmPosition();
			} else if (cursorPosition >= indices.hh && cursorPosition <= indices.hh + 2) {
				time = this._createHoursPosition();
			} else if (cursorPosition >= indices.mm && cursorPosition <= indices.mm + 2) {
				time = this._createMinutesPosition();
			} else if (cursorPosition >= indices.ss && cursorPosition <= indices.ss + 2) {
				time = this._createSecondsPosition();
			} else if (cursorPosition >= indices.ff &&
				cursorPosition <= indices.ff + indices.ffLength) {
				time = this._createMillisecondsPosition();
			}
			return time;
		},
		_updateTimeMask: function (mask, time, delta) {
			var currentValueString, currentValue, range, index,
				unfilled = this.options.unfilledCharsPrompt;

			// N.A. 3/12/2016 Bug #215134: We remove unfilled characters before parsing the date.
			// N.A. 3/17/2016 Bug #216293: When we don't have date object and we spin the year needs additional 0, depending on the current year we are spinning.
			currentValueString = range = this._getStringRange(mask, time.startPosition, time.endPosition);
			for (index = 0; index < range.length; index++) {
				if (currentValueString.indexOf(unfilled) === index) {
					currentValueString = currentValueString.replace(unfilled, "0");
				} else {
					break;
				}
			}

			if (time.name !== "amOrPm") {
				currentValue = parseInt(currentValueString, 10);
			}

			// N.A. 3/12/2016 Bug #215134: When we enter a value and spin before the date is created, we create a today date, cause everything is empty.
			if (!this._dateObjectValue && mask.indexOf(unfilled) >= 0) {
				mask = this._initEmptyMask(this._dateObjectValue);
				mask = mask.substring(0, time.startPosition) +
					currentValueString +
					mask.substring(time.endPosition, mask.length);
			}

			switch (time.name) {
				case "year":
					mask = this._setYearEditMode(mask, time, currentValue, delta);
					break;
				case "month":
					mask = this._setMonthEditMode(mask, time, currentValue, delta);
					break;
				case "day":
					mask = this._setDayEditMode(mask, time, currentValue, delta);
					break;
				case "amOrPm":
					currentValue =
						this._getStringRange(mask, time.startPosition, time.endPosition);
					mask = this._setAmOrPmEditMode(mask, time, currentValue);
					break;
				case "hours":
					mask = this._setHoursEditMode(mask, time, currentValue, delta);
					break;
				case "minutes":
					mask = this._setMinutesEditMode(mask, time, currentValue, delta);
					break;
				case "seconds":
					mask = this._setSecondsEditMode(mask, time, currentValue, delta);
					break;
				case "milliseconds":
					mask = this._setMillisecondsEditMode(mask, time, currentValue, delta);
					break;
			}
			return mask;
		},
		_initEmptyMask: function (date) {
			var mask = this._maskWithPrompts,
				today = this._setNewDateMidnight(),
				timeYear, timeMonth, timeDay, timeHours,
				timeAmOrPM, timeMinutes, timeSeconds, timeMilliseconds,
				year, month, day, hours, amPM, minutes, seconds, milliseconds;

			if (!date) {
				date = today;
			}

			timeYear = this._createYearPosition();
			timeMonth = this._createMonthPosition();
			timeDay = this._createDayPosition();
			timeHours = this._createHoursPosition();
			timeAmOrPM = this._createAmOrPmPosition();
			timeMinutes = this._createMinutesPosition();
			timeSeconds = this._createSecondsPosition();
			timeMilliseconds = this._createMillisecondsPosition();

			year = date.getFullYear();
			month = date.getMonth() + 1;
			day = date.getDate();
			hours = date.getHours();
			amPM = !this._dateIndices.hh24 && hours >= 12 ? "PM" : "AM";
			hours = !this._dateIndices.hh24 && hours > 12 ? hours - 12 : hours;
			minutes = date.getMinutes();
			seconds = date.getSeconds();
			milliseconds = date.getMilliseconds();

			if (timeYear) {
				mask = this._setYearEditMode(mask, timeYear, year, 0);
			}
			if (timeMonth) {
				mask = this._setMonthEditMode(mask, timeMonth, month, 0);
			}
			if (timeDay) {
				mask = this._setDayEditMode(mask, timeDay, day, 0);
			}
			if (timeHours) {
				mask = this._setHoursEditMode(mask, timeHours, hours, 0);
			}
			if (timeAmOrPM) {
				mask = this._setAmOrPmEditMode(mask, timeAmOrPM, amPM, true);
			}
			if (timeMinutes) {
				mask = this._setMinutesEditMode(mask, timeMinutes, minutes, 0);
			}
			if (timeSeconds) {
				mask = this._setSecondsEditMode(mask, timeSeconds, seconds, 0);
			}
			if (timeMilliseconds) {
				mask = this._setMillisecondsEditMode(mask, timeMilliseconds, milliseconds, 0);
			}
			return mask;
		},
		_spinEditMode: function (delta, userInteraction) {
			var self = this, cursorPosition = this._getCursorPosition(),
				mask = this._editorInput.val(), time;

			time = this._getTimePosition();
			if (!time) {

				// If the cursor position is not available for some reason, we do not spin.
				return;
			}

			if (mask === undefined) {
				return;
			} else if (mask === "" || mask === this._maskWithPrompts) {
				mask = this._initEmptyMask(this._dateObjectValue);
			} else {
				mask = this._updateTimeMask(mask, time, delta);
			}

			//	N.A. 3/2/2016 Bug #215046: We don't need to update _maskedValue, before the value is updated.
			// this._maskedValue = mask;
			this._editorInput.val(mask);
			if (userInteraction) {
				this._processTextChanged();
			}
			self._setCursorPosition(cursorPosition);
		},
		_setTimePeriod: function (periodName, delta, userInteraction) {
			var date, period, newPeriod;

			if (!this._dateObjectValue || !this._isValidDate(this._dateObjectValue)) {

				// When there is no date at all we want to set today and should not increase the day.
				// It's the same for the other time periods.
				date = this._setNewDateMidnight();
				delta = 0;
			} else {
				date = new Date(this._dateObjectValue);
			}
			period = this._getDateField(periodName, date);
			newPeriod = period + delta;

			if (!this._isNewPeriodLimited(periodName, newPeriod, delta, date)) {
				this._setDateField(periodName, date, newPeriod);
				if (userInteraction) {
					this._triggerInternalValueChange(date);
					this._editorInput.val(this._getDisplayValue());
					this._processTextChanged();
				} else {
					this._processInternalValueChanging(date);
					this._editorInput.val(this._getDisplayValue());
				}
			}
		},
		_isNewPeriodLimited: function(name, value, delta, date) {
			var isLimited = false;
			if (this.options.limitSpinToCurrentField) {
				if (delta < 0) {
					if (value < 0) {
						isLimited = true;
					}
				} else if (name === "Month" && value === 13 ||
					name === "Month" && value ===
						this._lastDayOfMonth(date.getFullYear() && date.getMonth()) + 1 ||
					(name === "Hours" || name === "Minutes"  || name === "Seconds") &&
						value === 60 ||
					name === "Milliseconds" && value === 1000) {
					isLimited = true;
				}
			}
			return isLimited;
		},
		_spinDisplayMode: function (delta, userInteraction) {
			var indices = this._dateIndices, periodName;

			if (indices.dd !== undefined) {

				// Default behavior is that we always spin up/down day if it is available in the mask.
				periodName = "Date";
			} else if (indices.ff !== undefined) {

				// If day is not available then we spin the smallest time period, that's why we start from milliseconds.
				periodName = "Milliseconds";
				if (indices.ffLength === 2) {
					delta = delta * 10;
				} else if (indices.ffLength === 1) {
					delta = delta * 100;
				}
			} else if (indices.ss !== undefined) {
				periodName = "Seconds";
			} else if (indices.mm !== undefined) {
				periodName = "Minutes";
			} else if (indices.hh !== undefined) {
				periodName = "Hours";
			} else if (indices.MM !== undefined) {
				periodName = "Month";
			} else {
				periodName = "FullYear";
			}
			this._setTimePeriod(periodName, delta, userInteraction);
		},
		_spin: function (delta, userInteraction) {
			if (!delta) {
				return;
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			if (this._editMode) {
				this._spinEditMode(delta, userInteraction);
			} else {
				this._spinDisplayMode(delta, userInteraction);
			}
		},
		_spinUpEditMode: function (delta) {
			this._spinEditMode(delta ? delta : this.options.spinDelta);
		},
		_spinDownEditMode: function (delta) {
			this._spinEditMode(delta ? -delta : -this.options.spinDelta);
		},

		// igDateEditor public methods
		value: function (newValue) { // Date Editor
			/* Gets/Sets editor value.
			```
				$(".selector").%%WidgetName%%("value", new Date (2016, 2, 3);
			```
				paramType="date" optional="true" New editor value. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too. For example Date(/"thicks"/).
				Note! This option doesn't use the dateInputFormat to extract the date
				returnType="date" Current editor value. */
			var parsedVal;
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();

				//If the value is valid proceed with min/max value
				parsedVal = this._getDateObjectFromValue(newValue);
				if (this._isValidDate(parsedVal)) {
					if (this.options.maxValue && parsedVal > this.options.maxValue) {
						newValue = this._getDateObjectFromValue(this.options.maxValue);
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
								this._getDisplayValue(new Date(this.options.maxValue))));
					} else if (this.options.minValue && parsedVal < this.options.minValue) {
						newValue = this._getDateObjectFromValue(this.options.minValue);
						this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
								this._getDisplayValue(new Date(this.options.minValue))));
					}
				}
				if (this._validateValue(newValue)) {
					this._updateValue(newValue);

					//TODO Update maskedValue according to the new value.
					this._updateMaskedValue();
				}
				this._editorInput.val(this._editMode ?
					this._maskedValue :
					this._getDisplayValue());

				// N.A. January 4th, 2017 #664 Validate spin button state on a change.
				this._setSpinButtonsState(newValue);
			} else {
				if (this.options.value) {
					return this._getValueByDataMode();
				} else {
					return this.options.value;
				}
			}

			// N.A. January 3th, 2017 #665: Update button state, when value is changed using API method.
			this._checkClearButtonState();
		},
		getSelectedDate: function() {
			/* Gets selected date as a date object. This method can be used when dataMode is set as either displayModeText or editModeText.
			In such cases the value() method will not return date object and getSelectedDate() can be used to replace that functionality.
			```
			$(".selector").%%WidgetName%%("getSelectedDate");
			```
				returnType="date" */
			return new Date(this._dateObjectValue.getTime());
		},
		selectDate: function (date) {
			/* Sets selected date. This method can be used when dataMode is set as either displayModeText or editModeText.
			In such cases the value() cannot accept a date object as a new value and getSelectedDate() can be used to replace that functionality.
			```
				$(".selector").%%WidgetName%%("selectDate", new Date (2016, 2, 3));
			```
				paramType="date" optional="false" */
			this._updateValue(date);
			this._exitEditMode();
		},
		spinUp: function (delta) {
			/* Increases the date or time period, depending on the current cursor position.
			```
				$(".selector").%%WidgetName%%("spinUp", 2);
			```
				paramType="number" optional="true" The increase delta. */
			delta = parseInt(delta, 10);
			this._spin((!isNaN(delta) && delta >= 0) ? delta : this.options.spinDelta);
		},
		spinDown: function (delta) {
			/* Decreases the date or time period, depending on the current cursor position.
			```
				$(".selector").%%WidgetName%%("spinDown", 3);
			```
				paramType="number" optional="true" The decrease delta. */
			delta = parseInt(delta, 10);
			this._spin(!isNaN(delta) && delta >= 0 ? -delta : -this.options.spinDelta);
		},
		spinUpButton: function () {
			/* Returns a reference to the spin up UI element of the editor.
			```
			$(".selector").%%WidgetName%%("spinUpButton");
			```
				returnType="$" The jQuery object representing the spin up UI element of the editor. */
			return $.ui.igTextEditor.prototype.spinUpButton.call(this);
		},
		spinDownButton: function () {
			/* Returns a reference to the spin down UI element of the editor.
			```
				$(".selector").%%WidgetName%%("spinDownButton");
			```
				returnType="$" The jQuery object representing the spin down UI element of the editor. */
			return $.ui.igTextEditor.prototype.spinDownButton.call(this);
		},
		isValid: function () { //igDateEditor
			/* Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
			```
				var isValid = $(".selector").%%WidgetName%%("isValid");
			```
				returnType="bool" Whether editor value is valid or not */
			var value, valid;
			value = this.field().val();
			this._skipMessages = true;
			if (this._editMode) {
				if (value === this._maskWithPrompts) {
					valid = false;
				} else {
					valid = this._validateValue(this._parseDateFromMaskedValue(value));
				}
			} else {
				valid = this._validateValue(this._dateObjectValue);
				if (value !== "" && !valid) {

					//Raise warning not all required fields are entered
					//State - message
					valid = false;
					this._sendNotification("warning", $.ig.Editor.locale.dateMessage);
				}
			}
			this._skipMessages = false;
			return valid;
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownButton: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownContainer: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownVisible: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		findListItemIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		getSelectedListItem: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		selectedListIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		}
	});
	$.widget("ui.igDatePicker", $.ui.igDateEditor, {
		options: {
			/* type="object" Gets/Sets the custom regional settings for the editor. If it is a string, then $.ig.regional[stringValue] is assumed.
			```
			//Initialize
				$(".selector").igDatePicker({
					regional: "en-US"
				});

				//Get
				var regional = $(".selector").igDatePicker("option", "regional");

				//Set
				$(".selector").igDatePicker("option", "regional", "en-US");
			```
			*/
			regional: null,
			/* type="dropdown|clear|spin" Gets visibility of the spin, clear and drop-down button. That option can be set only on initialization. Combinations like 'dropdown,spin' or 'spin,clear' are supported too.
```
					//Initialize
					$(".selector").%%WidgetName%%({
						buttonType : "dropdown"
					});

					//Get
					var button = $(".selector").%%WidgetName%%("option", "buttonType");

					//Initialize multiple buttons
					$(".selector").%%WidgetName%%({
						buttonType : "dropdown,clear"
					});
				```
				dropdown type="string" A button to open/close the list is located on the right side of the editor.
				clear type="string" A button to clear the value is located on the right side of the editor.
				spin type="string" Spin buttons are located on the right side of the editor.
			*/
			buttonType: "dropdown",
			/* type="object" Gets/Sets the options supported by the [jquery.ui.datepicker](http://api.jqueryui.com/datepicker/). Only options related to the drop-down calendar are supported.
			```
			//Initialize
			$(".selector").igDatePicker({
				datepickerOptions: {minDate : new Date(2015, 9, 17), maxDate : new Date(2015, 9, 30)}
			});

			//Get
			var datepickerOptions = $(".selector").igDatePicker("option", "datepickerOptions");

			//Set
			$(".selector").igDatePicker("option", "datepickerOptions", {minDate : new Date(2017, 9, 11), maxDate : new Date(2017, 9, 22)});

			```
			*/
			datepickerOptions: null,
			/* type="bool" Gets the ability to limit igDatePicker to be used only as s calendar. When set to true the editor input is not editable.
				Note! This option can not be set runtime.
				```
				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownOnReadOnly : true
				});

				//Get
				var readOnly = $(".selector").%%WidgetName%%("option", "dropDownOnReadOnly");
				```
			*/
			dropDownOnReadOnly: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			dropDownAttachedToBody: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			isLimitedToListValues: false,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listItemHoverDuration: 0,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listItems: null,
			/* @Ignored@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listWidth: 0
		},
		events: {
			/* cancel="true" Event which is raised when the drop down is opening.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistopening", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListOpening: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListOpening: "dropDownListOpening",
			/* Event which is raised after the drop down is opened.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistopened", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListOpened: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListOpened: "dropDownListOpened",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownListClosing: "dropDownListClosing",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* Event which is raised after the drop down (calendar) is closed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker.
				```
				$(".selector").on("%%WidgetNameLowered%%dropdownlistclosed", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					dropDownListClosed: function (evt, ui) {
					...
					}
				});
				```
			*/
			dropDownListClosed: "dropDownListClosed",
			/* @Ignored@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownItemSelected: "dropDownItemSelected",
			/* cancel="false" Event which is raised after a date selection in the calendar.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.dateFromPicker to obtain reference to the date object which is selected.
				Use ui.item to obtain a referece to the selected html element from the calendar.
				Use ui.calendar to obtain a reference to jQuery UI date picker, used as a calendar from the igDatePicker.
				```
				$(".selector").on("%%WidgetNameLowered%%itemselected", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").%%WidgetName%%({
					itemSelected: function (evt, ui) {
					...
					}
				});
				```
			*/
			itemSelected: "itemSelected"
		},
		_setDropDownListWidth: function () { // igDatePicker
		},
		_listMouseDownHandler: function () { // igDatePicker
		},
		_updateDropdownSelection: function () { //igDatePicker
		},
		_disableEditor: function (applyDisabledClass) { //igDatePicker
			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._editorInput.addClass(this.css.disabled);
				}
				this._detachEvents();
			} else {
				if (applyDisabledClass) {
					this._editorContainer.addClass(this.css.disabled);
				}
				this._detachEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._dropDownButton);
			}

			if (this._clearButton) {
				this._clearButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinDownButton);
			}
		},
		_setBlur: function (event) { // igDatePicker
			if (this._pickerOpen) {
				// D.P. 3rd Aug 2016 #174 Ignore blur handling with open picker
				return;

			} else {
				this._super(event);
			}
		},
		_pickerDefaults: function () {
			var self = this, pickerDefaults;
			pickerDefaults = {
				showOn: "",
				duration: self.options.dropDownAnimationDuration ?
					self.options.dropDownAnimationDuration :
					"normal",
				onSelect: function (dateText, inst) {
					var date, dateFromPicker = $(this).datepicker("getDate");
					if (self._dateObjectValue) {

						// Date comming from the picker contains only year, month and date - if the user has specified inputMask with hours and minutes - then selecting the date from the picker should keep the same hours and minutes.
						if (self.options.displayTimeOffset !== null) {

							// use display values to set picker result and reset before processing
							date = self._getDateOffset(self._dateObjectValue);
						} else {
							date = new Date(self._dateObjectValue);
						}
					} else {
						date = self._setNewDateMidnight();
					}

					self._setDateField("FullYear", date, dateFromPicker.getFullYear());

					//Temporary change the date to be in the middle of the month 15th, because when using JavaScript Date object to set month when date is 31, the date object is moved with one day.
					self._setDateField("Date", date, 15);
					self._setDateField("Month", date, dateFromPicker.getMonth());
					self._setDateField("Date", date, dateFromPicker.getDate());

					if (self.options.displayTimeOffset !== null) {
						self._clearDateOffset(date);
					}

					self._processValueChanging(date);
					self._triggerItemSelected.call(self,
						inst.dpDiv.find(".ui-datepicker-calendar>tbody>tr>td .ui-state-hover"),
							dateFromPicker);
					self._processTextChanged();
					if (self.options.readOnly === true || self.options.disabled === true) {
						self._exitEditMode();
					} else {
						self._focused = false;
						self._editorInput.focus();
					}
				},
				beforeShow: function(/*input*/) {
					// fires before input focus
					self._pickerOpen = true;
				},
				onClose: function (/*dateText, inst*/) {

					// fires before input blur
					delete self._pickerOpen;

					// I.G. 01/12/2016 Fix for #585 [igDatePicker] Year change dropdown does not open in IE by single click
					if (!self._editorInput.is(document.activeElement)) {
						self._editorInput.blur();
					}
					self._triggerDropDownClosed();
				}
			};
			return pickerDefaults;
		},
		_renderList: function () { // igDatePicker
			var self = this, options, regional;

			//#207222 S.D. Change options to have priority instead of regional settings
			regional = $.extend({}, self._dpRegion(), self.options.datepickerOptions) || {};

			options = $.extend(regional, this._pickerDefaults());
			if (regional.onSelect) {
				var igOnSelect = regional.onSelect;
				options.onSelect = function (dateText, inst) {
					igOnSelect.call(this, dateText, inst);
					if (self.options.datepickerOptions &&
						self.options.datepickerOptions.onSelect) {
						self.options.datepickerOptions.onSelect.call(this, dateText, inst);
					}
				};
			}
			if (regional.onClose) {
				var igOnClose = regional.onClose;
				options.onClose = function (dateText, inst) {
					igOnClose.call(this);
					if (self.options.datepickerOptions && self.options.datepickerOptions.onClose) {
						self.options.datepickerOptions.onClose.call(this, dateText, inst);
					}
				};
			}
			if (self.options.datepickerOptions && self.options.datepickerOptions.beforeShow) {
				var isbeforeShow = regional.beforeShow;
				options.beforeShow = function (input) {
					isbeforeShow.call(this);
					if (self.options.datepickerOptions && self.options.datepickerOptions.beforeShow) {
						self.options.datepickerOptions.beforeShow.call(this, input);
					}
				};
			}
			this._editorInput.datepicker(options);
			this._dropDownList = this._editorInput.datepicker("widget");
		},
		_renderDropDownButton: function () {
			var dropDownButton = $("<div role='button' tabindex='-1' id='" +
					this.id + "_calendarButton' aria-label='" +
					this._getLocaleOption("ariaCalendarButton") + "'></div>"),
				dropDownIcon = $("<div></div>");

			dropDownButton.addClass(this.css.buttonCommon);
			dropDownButton.attr("title", this._getLocaleOption("datePickerButtonTitle"));
			this._editorContainer.prepend(dropDownButton
				.addClass(this.css.dropDownButton)
				.append(dropDownIcon.addClass(this.css.dropDownImage)));
			this._dropDownButton = dropDownButton;
			this._attachButtonsEvents("dropdown", dropDownButton);
		},
		_dpRegion: function () {
			var reg = this.options.regional, lastRegional, regional;
			regional = ($.datepicker && typeof reg === "string") ?
				$.datepicker.regional[ (reg === "defaults" || reg === "en-US") ? "" : reg ] :
				null;
			if (regional === null && $.datepicker) {
				for (lastRegional in $.datepicker.regional) { }
				if ($.datepicker.regional[ lastRegional ]) {
					regional = $.datepicker.regional[ lastRegional ];
				}
			}
			return regional;

			// TODO refactor that function later
		},
		_create: function () { // igDatePicker
			$.ui.igDateEditor.prototype._create.call(this);
		},
		_initialize: function () { //igDatePicker
			this._super();

			//We set this option internally so we can call the _renderList method.
			this.options.listItems = [ "datePicker" ];
		},
		_applyOptions: function () { // DatePicker
			this._super();

			if (!this.options.minValue &&
				this.options.datepickerOptions &&
				this.options.datepickerOptions.minDate) {
				if (this._isValidDate(this.options.datepickerOptions.minDate)) {
					this.options.minValue = this.options.datepickerOptions.minDate;
					if (this.options.displayTimeOffset !== null) {
						this._editorInput.datepicker("option", "minDate", this._getDateOffset(
							this._getDateObjectFromValue(this.options.datepickerOptions.minDate)
						));
						this._editorInput.val(this._getDisplayValue());
					}
				}
			}
			if (!this.options.maxValue &&
				this.options.datepickerOptions &&
				this.options.datepickerOptions.maxDate) {
				if (this._isValidDate(this.options.datepickerOptions.minDate)) {
					this.options.maxValue = this.options.datepickerOptions.maxDate;
					if (this.options.displayTimeOffset !== null) {
						this._editorInput.datepicker("option", "maxDate", this._getDateOffset(
							this._getDateObjectFromValue(this.options.datepickerOptions.maxDate)
						));
						this._editorInput.val(this._getDisplayValue());
					}
				}
			}
		},
		_setOption: function (option, value) { // igDatePicker
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "datepickerOptions": {
					var pickerOptions = this._editorInput.data("datepicker").settings,
						settings, self = this, options;
					settings = $.extend(value, this._pickerDefaults());

				    //A.M. June 30, 2016 #221414 "'Cannot read property 'dpDiv' of undefined' exception"
					options = $.extend(pickerOptions, settings);

					if (settings.onSelect) {
						var igOnSelect = settings.onSelect;
						options.onSelect = function (dateText, inst) {
							igOnSelect.call(this, dateText, inst);
							if (self.options.datepickerOptions &&
								self.options.datepickerOptions.onSelect) {
								self.options.datepickerOptions
									.onSelect.call(this, dateText, inst);
							}
						};
					}
					if (settings.onClose) {
						var igOnClose = settings.onClose;
						pickerOptions.onClose = function (dateText, inst) {
							igOnClose.call(this);
							if (self.options.datepickerOptions &&
								self.options.datepickerOptions.onClose) {
								self.options.datepickerOptions
									.onClose.call(this, dateText, inst);
							}
						};
					}
					this._editorInput.data("datepicker").settings = pickerOptions;

					// A . M. 08/07/2016 #84 "If 'minDate' is set when initializing date picker, it cannot be changed at runtime"
					if (value.minDate &&
						(this._editorInput.data("datepicker").settings.minDate !==
							this.options.minValue))
					{
						this._setOption("minValue", this._editorInput.data("datepicker").settings.minDate);
					}
					if (value.maxDate &&
						(this._editorInput.data("datepicker").settings.maxDate !==
							this.options.maxValue))
					{
						this._setOption("maxValue", this._editorInput.data("datepicker").settings.maxDate);
					}
				}
					break;
				case "minValue":
				case "maxValue":
					this.options[ option ] = prevValue;
					this._super(option, value);
					this._editorInput.datepicker("option", "minDate", this.options.minValue);
					this._editorInput.datepicker("option", "maxDate", this.options.maxValue);

					// prevent datepicker from updating the input text (if min/max change selection)
					this._editorInput.val(this._currentInputTextValue);
					break;
				default: {

					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_triggerKeyDown: function (event) { //igDatePicker
			// If we press arrow down/up, without alt, we don't want drop down to appear/disappear.
			// If we press arrow down/up, with ctrl, we want to navigate in the calendar, instead of increasing the time, where the cursor is positioned.
			if (event.keyCode === 38 && !event.altKey) {
				if (!event.ctrlKey) {
					this._spinUpEditMode();
					event.preventDefault();
				}
			} else if (event.keyCode === 40 && !event.altKey) {
				if (!event.ctrlKey) {
					this._spinDownEditMode();
					event.preventDefault();
				}
			} else {
				this._super(event);
			}
		},
		_triggerDropDownOpened: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			this._trigger(this.events.dropDownListOpened, null, args);
		},
		_triggerDropDownOpening: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpening, null, args);
		},
		_triggerDropDownClosed: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			this._trigger(this.events.dropDownListClosed, null, args);
		},
		_toggleDropDown: function () { //igDatePicker
			var noCancel;

			// Close dropdown
			//T.P. 15th March 2016. When there are two editors and the drpdown is opened - when we click the dropwodn button
			//of the other editor - click event is triggered prior to blur of the previous editor
			//M.S. 26th June 2016. Closing the dropdown with dropdown button if "readOnly: true, dropDownOnReadOnly : true"
			//Adding internal flag for calendar visibility.
			if (this._dropDownList.is(":visible") &&
				(!!this._focused || this.options.readOnly) &&
				!!this._dropDownOpened) {

					// Proceed with hiding
					this._hideDropDownList();
			} else {

				// Open DropDown
				noCancel = this._triggerDropDownOpening();
				if (noCancel) {

					// Proceed with hiding
					this._showDropDownList();
				}
			}
		},
		_triggerItemSelected: function (htmlItem, dateFromPicker) {
			var args = {
				owner: this,
				dateFromPicker: dateFromPicker,
				item: htmlItem,
				calendar: this._dropDownList
			};
			this._trigger(this.events.itemSelected, null, args);
		},
		_showDropDownList: function () { //DatePicker

			this._dropDownOpened = true;

			// Open Dropdown
			var self = this, direction, currentDate = this._dateObjectValue, currentInputValue;
			this._cancelBlurDatePickerOpen = true;
			this._positionDropDownList();
			if (this._dropDownListOrientation === "up") {

				//We need this parameter as part of blind animation we're using
				direction = "up";
			} else {
				direction = "down";
			}
			if (this._editMode && this._editorInput.val() !== this._maskWithPrompts) {
				// D.P. 15th May 2017 #1002 Drop down cannot be opened w/ displayTimeOffset when dataMode is "editModeText"
				currentDate = this._parseDateFromMaskedValue(this._editorInput.val());
			}

			if (currentDate) {
				if (this.options.displayTimeOffset !== null) {
					currentDate = this._getDateOffset(currentDate);
				}

				// N.A. July 11th, 2016 #89 Enter edit mode in order to put 0 if date or month is < 10.
				this._enterEditMode();
				currentInputValue = this._editorInput.val();
				$(this._editorInput).datepicker("setDate", currentDate);

			}
			if (currentInputValue === undefined) {
				currentInputValue = this._editorInput.val();
			}
			try {
				this._editorInput.datepicker("option", "showOptions", { direction: direction });

				// $(this._dropDownList).show("blind", { direction: direction }, this.options.dropDownAnimationDuration);
				this._editorInput.datepicker("show");
				if (currentInputValue) {
					this._editorInput.val(currentInputValue);
				}
			} catch (ex) {

				// $(this._dropDownList).show(this.options.dropDownAnimationDuration);
				this._editorInput.datepicker("show");
				if (currentInputValue) {
					this._editorInput.val(currentInputValue);
				}
			}

			// We cannot trigger drop down opened callback, using the datepicker widget API.
			// That's why we use promise and wait all the animations applied to the drop down list and then trigger the event.
			this._dropDownList.promise().done(function () {
				self._triggerDropDownOpened();
			});
		},
		_hideDropDownList: function () {
			this._dropDownOpened = false;
			this._editorInput.datepicker("hide");
			this._editorInput.attr("aria-expanded", false);
		},

		// igDatePicker public methods
		getCalendar: function () {
			/* Returns a reference to the jQuery calendar used as a picker selector
			```
			$(".selector").igDatePicker("getCalendar");
			```
			returnType="$" Returns a reference to the jquery object. */
			return $.ui.igTextEditor.prototype.dropDownContainer.call(this);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		dropDownContainer: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		findListItemIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		getSelectedListItem: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		selectedListIndex: function () {
			/*@Ignored@*/
			throw new Error($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		showDropDown: function () {
			/* Shows the drop down list.
			```
			$(".selector").igDatePicker("showDropDown");
			```
			*/
			$.ui.igTextEditor.prototype.showDropDown.call(this);
		},
		hideDropDown: function () {
			/* Hides the drop down list.
			```
			$(".selector").igDatePicker("hideDropDown");
			```
			*/
			$.ui.igTextEditor.prototype.hideDropDown.call(this);
		},
		dropDownButton: function () {
			/* Returns a reference to the calendar button UI element of the editor.
			```
			var button = $(".selector").igDatePicker("dropDownButton");
			```
				returnType="$" Returns reference to jquery object. */
			return $.ui.igTextEditor.prototype.dropDownButton.call(this);
		},
		dropDownVisible: function () {
			/* Returns the visibility state of the calendar.
			```
			$(".selector").igDatePicker("dropDownVisible");
			```
				returnType="bool" The visibility state of the calendar. */
			return $.ui.igTextEditor.prototype.dropDownVisible.call(this);
		},
		destroy: function () {
			/* Destroys the widget
			```
			$(".selector").igDatePicker("destroy");
			```
			*/
			this._editorInput.datepicker("destroy");
			this._super();
			return this;
		}
	});
	$.widget("ui.igCheckboxEditor", $.ui.igBaseEditor, {
		options: {
			/* type="bool" Gets/Sets whether the checkbox is checked.
				```
				//Initialize
				$('.selector').%%WidgetName%%({
					checked: true
				});

				//Get
				var checked = $(".selector").%%WidgetName%%("option", "checked");

				//Set
				$(".selector").%%WidgetName%%("option", "checked", true);
				```
			*/
			checked: false,
			/* type="verysmall|small|normal|large" Gets/Sets size of the checkbox based on preset styles.
				For different sizes, define 'width' and 'height' options instead.
				```
				//Initialize
				$('.selector').%%WidgetName%%({
					size: "large"
				});

				//Get
				var size = $(".selector").%%WidgetName%%("option", "size");

				//Set
				$(".selector").%%WidgetName%%("option", "size", "large");
				```
				verysmall type="string" The size of the Checkbox editor is very small.
				small type="string" The size of the Checkbox editor is small.
				normal type="string" The size of the Checkbox editor is normal.
				large type="string" The size of the Checkbox editor is large.
			*/
			size: "normal",
			/* type="string" Gets/Sets a custom class on the checkbox. Custom image can be used this way.
				The following jQuery classes can be used in addition http://api.jqueryui.com/theming/icons/
				```
				//Initialize
				$('.selector').%%WidgetName%%({
					iconClass: "ui-icon-check"
				});

				//Get
				var iconClass = $(".selector").%%WidgetName%%("option", "iconClass");

				//Set
				$(".selector").%%WidgetName%%("option", "iconClass", "ui-icon-check");
				```
			*/
			iconClass: "ui-icon-check",
			/* type="number" Gets/Sets tabIndex attribute for the editor input.
				```
				//Initialize
				$('.selector').%%WidgetName%%({
					tabIndex: 1
				});

				//Get
				var tabIndex = $(".selector").%%WidgetName%%("option", "tabIndex");

				//Set
				$(".selector").%%WidgetName%%("option", "tabIndex", 1);
				```
			*/
			tabIndex: 0,
			/* type="bool" Gets/Sets the readonly attribute. Does not allow editing. Disables changing the checkbox state as an interaction, but it still can be changed programmatically. On submit the current value is sent into the request.
				```
				//Initialize
				$('.selector').%%WidgetName%%({
					readOnly: true
				});

				//Get
				var readOnly = $(".selector").%%WidgetName%%("option", "readOnly");

				//Set
				$(".selector").%%WidgetName%%("option", "readOnly", true);
				```
			*/
			readOnly: false,
			/*@Ignored@*/
			allowNullValue: false,
			/*@Ignored@*/
			nullValue: null
		},
		css: {
			/* Classes applied to the top element when editor is rendered in container. Default value is 'ui-state-default ui-corner-all ui-widget ui-checkbox-container ui-igcheckbox-normal' */
			container: "ui-state-default ui-corner-all ui-widget ui-checkbox-container ui-igcheckbox-normal",
			/* Class applied to the top element when editor is checked. Default value is 'ui-state-checkbox-checked' */
			containerChecked: "ui-state-checkbox-checked",
			/* Class applied to the checkbox element when that holds the styles for the checkbox icon. Default value is 'ui-icon' */
			checkboxIcon: "ui-icon",
			/* Class applied to the checkbox element that there is custom width and height, in order to have the image centered. Default value is 'ui-icon-custom' */
			iconCentered: "ui-icon-custom",
			/* Class applied to the checkbox element when it is checked. Default value is 'ui-igcheckbox-normal-on' */
			checked: "ui-igcheckbox-normal-on",
			/* Class applied to the checkbox element when it is unchecked. Default value is 'ui-igcheckbox-normal-off' */
			unchecked: "ui-igcheckbox-normal-off",
			/* Class applied to the hidden HTML checkbox input when. Default value is 'ui-helper-hidden' */
			checkboxInput: "ui-helper-hidden"
		},
		events: {
			/* cancel="true" Event which is raised before value in editor was changed.
				Return false in order to cancel change.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.newState to obtain the new state.
				Use ui.oldValue to obtain the old value.
				Use ui.oldState to obtain the old state.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput obtain reference to the editor element.
				```
				$(".selector").on("igcheckboxeditorvaluechanging", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").igCheckboxEditor({
					valueChanging: function (evt, ui) {
						...
					}
				});
				```
			*/
			valueChanging: "valueChanging",
			/* Event which is raised after value in editor was changed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.newState to obtain the new state.
				Use ui.element to obtain a reference to the event target.
				Use ui.editorInput obtain reference to the editor element.
				```
				$(".selector").on("igcheckboxeditorvaluechanged", function (evt, ui) {
					...
				});

				//Initialize
				$(".selector").igCheckboxEditor({
					valueChanged: function (evt, ui) {
						...
					}
				});
				```
			*/
			valueChanged: "valueChanged"
		},
		_triggerKeyUp: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				key: event.keyCode,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keyup, event, args);
		},
		_triggerKeyPress: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				key: event.keyCode,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keypress, event, args);
		},
		_triggerKeyDown: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				key: event.keyCode,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keydown, event, args);
		},
		_create: function () {
			this._checkedClass = this.css.checked;
			this._uncheckedClass = this.css.unchecked;
			$.ui.igBaseEditor.prototype._create.call(this);
		},
		_render: function () {
			this._triggerRendering();

			if (this.element.is("div")) {
				this._editorContainer = this.element;
				this._editorInput = $("<span></span>");
				this._valueInput = $("<input type='checkbox'></input>");
				this._editorContainer.prepend(this._editorInput);
				this._editorInput.after(this._valueInput);
			} else if (this.element.is("input")) {
				this._valueInput = this.element;
				this._editorInput = $("<span></span>");
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._valueInput.before(this._editorInput);
			} else if (this.element.is("span")) {
				this._editorInput = this.element;
				this._valueInput = $("<input type='checkbox'></input>");
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._editorInput.after(this._valueInput);
			} else {
				throw new Error($.ig.Editor.locale.instantiateCheckBoxErrMsg);
			}

			this._editorContainer
				.addClass(this.css.container)
				.attr("role", "checkbox");
			this._editorInput.
				addClass(this.css.checkboxIcon).
				addClass(this.options.iconClass).
				addClass(this.css.checked);
			this._valueInput
				.addClass(this.css.checkboxInput)
				.attr("aria-hidden", "true");

			if (!$.ig.util.isIE8 && this._valueInput.attr("type") !== "checkbox") {
				this._valueInput.attr("type", "checkbox");
			}

			this._attachEvents();
			this._applyOptions();
			this._applyAria();

			this._triggerRendered();
		},
		_applyAria: function () {
			var ariaLabeledBy = this.element.attr("aria-labelledby");

			if (ariaLabeledBy) {
				this.element.removeAttr("aria-labelledby");
				this._editorContainer.attr("aria-labelledby", ariaLabeledBy);
			}
		},
		_applyOptions: function () {
			var checked = this.options.checked;
			this._super();

			if (checked) {
				this._initialState();
			} else {
				this.options.checked = false;
			}
			if (this.options.value) {
				this._inputValue = this.options.value;
				this.value(this.options.value);
			}
			this._size(this.options.size);
			this._setWidth(this.options.width);
			this._setHeight(this.options.height);
			this._updateState(checked && checked !== "false" ? true : false);
		},
		_setOption: function (option, value) {
			var iconClass = this.options.iconClass;

			this._super(option, value);
			switch (option) {
				case "checked":
					this._updateState(value && value !== "false" ? true : false);
					break;
				case "value":
					this._inputValue = value;
					this._updateState(this.options.checked);
					break;
				case "size":
					this._size(value);
					break;
				case "iconClass":
					this._setIconClass(iconClass, value);
					break;
				default:
					break;
			}

		},
		_readAttributes: function () {
			var checked = this.element.attr("checked");

			this._super(this.element);

			if (checked) {
				this.element.removeAttr("checked");
				this.options.checked = true;
			}
		},
		_attachEvents: function () {
			var self = this;
			this._super();
			this._editorContainer.on({
				"click.editor": function (event) {
					var internalChecked = self._inputValue !== undefined ?
						self.options.checked :
						true;

					// D.P. Label for can trigger click as if the internal checkbox has been clicked. Browsers toggle state in advance, so revert before _toggleInternal()
					if (self._valueInput[ 0 ].checked !== internalChecked) {

						// Note: Don't preventDefault (all changes in this handler will be ignored) - set value back instead:
						self._valueInput[ 0 ].checked = internalChecked;
						this.focus();
					}
					self._toggleInternal(event);
				},
				"mousedown.editor": function (event) {
					/* Prevent multi-click text selection, but keep focus */
					this.focus();
					event.preventDefault();
					return false;
				},
				"focus.editor": function (event) {
					self._setFocus(event, self._cancelFocusTrigger);
				},
				"blur.editor": function (event) {
					self._setBlur(event);
				},
				"keyup.editor": function (event) {
					var keyCode = event.keyCode || event.which || 0; /*space*/
					self._triggerKeyUp(event);
					if (keyCode === 32) {
						self._toggleInternal(event);
						event.preventDefault();
					}
				},
				"keydown.editor": function (event) {
					self._triggerKeyDown(event);
				},
				"keypress.editor": function (event) {
					var keyCode = event.keyCode || event.which || 0;
					self._triggerKeyPress(event);
					if (keyCode === 32) {
						event.preventDefault();
					}
				}
			});
		},
		_triggerValueChanging: function (event, newState, newValue) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput,
				oldState: this.options.checked,
				newState: newState,
				oldValue: this.value(),
				newValue: newValue
			};
			return this._trigger(this.events.valueChanging, event, args);
		},
		_triggerValueChanged: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput,
				newState: this.options.checked,
				newValue: this.value()
			};
			this._trigger(this.events.valueChanged, event, args);
			this._trigger(this.options.checked ?
				this.events.checked :
				this.events.unchecked, event, args);
		},
		_triggerFocus: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.focus, event, args);
		},
		_triggerBlur: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.blur, event, args);
		},
		_getState: function () {
			var state;
			if (this._inputValue !== undefined) {
				state = this._valueInput[ 0 ].checked;
			} else {
				var value = this._tryParseBool(this._valueInput[ 0 ].value);
				if (value.ret) {
					state = value.p1;
				} else {
					throw new Error($.ig.Editor.locale.cannotParseNonBoolValue);
				}
			}

			return state;
		},
		_tryParseBool: function (value) {
			if (typeof value === "boolean") {
				return { ret: true, p1: value };
			} else if (typeof value === "string") {
				return $.ig.Boolean.prototype.tryParse(value);
			}
		},
		_toggleInternal: function (event) {
			var noCancel, newState, newVal;
			newState = !this._getState();
			newVal = this.value();
			if (this._inputValue === undefined) {
				newVal = newState;
			}
			noCancel = this._triggerValueChanging(event, newState, newVal);
			if (noCancel) {
				this._updateState(newState);
				this._triggerValueChanged(event);
				if (this._validator) {// TODO VERIFY
					this._validator._validateInternal(this.element, event);
				}
			}
		},
		_initialState: function () {
			this._valueInput.attr("checked", "checked");
		},
		_updateState: function (value) {
			this.options.checked = value;
			this._editorContainer.attr("aria-checked", value);

			if (value) {
				this._editorInput.removeClass(this._uncheckedClass);
				this._editorContainer.addClass(this.css.containerChecked);

			} else {
				this._editorInput.addClass(this._uncheckedClass);
				this._editorContainer.removeClass(this.css.containerChecked);
			}
			if (this._inputValue !== undefined) {
				this._valueInput[ 0 ].checked = value;
				this._valueInput[ 0 ].value = this._inputValue;
			} else {
				this._valueInput[ 0 ].checked = true;
				this._valueInput[ 0 ].value = value;
			}
		},
		_removeDOM: function () {
			if (this.element.is("div")) {
				this.element.empty();
			} else if (this.element.is("input")) {
				this._editorInput.remove();
				this.element.unwrap();
			} else if (this.element.is("span")) {
				this._valueInput.remove();
				this.element.unwrap();
			}
		},
		_detachEvents: function () {
			this._editorContainer
				.off("click.editor mousedown.editor focus.editor blur.editor keydown.editor");
			this._super();
		},
		_clearStyling: function () {
			this._editorContainer
				.removeClass(this.css.checkboxContainer)
				.removeClass(this.css.containerChecked)
				.removeAttr("role");
			this._editorInput
				.removeClass(this._checkedClass)
				.removeClass(this._uncheckedClass)
				.removeClass(this.css.checkboxIcon)
				.removeClass(this.options.iconClass);
			this._valueInput
				.removeClass(this.css.checkboxInput)
				.removeAttr("aria-hidden");
			this._super();
		},
		_deleteInternalProperties: function () {
			delete this._checkedClass;
			delete this._uncheckedClass;
			this._super();
		},
		_size: function (size) {
			if (size) {
				this._editorContainer
					.removeClass("ui-igcheckbox-verysmall ui-igcheckbox-small")
					.removeClass("ui-igcheckbox-normal ui-igcheckbox-large");
				this._editorContainer.addClass("ui-igcheckbox-" + size);
				this._editorInput
					.removeClass(this._checkedClass).removeClass(this._uncheckedClass);
				this._checkedClass = "ui-igcheckbox-" + size + "-on";
				this._uncheckedClass = "ui-igcheckbox-" + size + "-off";
				this._editorInput.addClass(this._checkedClass);
			}
		},
		_setTabIndex: function (index) {
			this._editorContainer.attr("tabIndex", index);
		},
		_setWidth: function (width) {
			this._super(width);
			if (width) {
				this._editorInput.addClass(this.css.iconCentered);
			}
		},
		_setHeight: function (height) {
			this._super(height);
			if (height) {
				this._editorInput.addClass(this.css.iconCentered);
			}
		},
		_setIconClass: function (oldIconClass, iconClass) {
			this._editorInput.removeClass(oldIconClass).addClass(iconClass);
		},
		_setFocus: function (event, triggerEvent) {
			this._editorContainer.addClass(this.css.focus);
			if (event && !triggerEvent) {
				this._triggerFocus(event);
			} else {
				delete this._cancelFocusTrigger;
			}
		},
		_setFocusDelay: function (delay) {
			var self = this;
			if (delay) {
				this._timeouts.push(setTimeout(function () {
					self._cancelFocusTrigger = true;
					self._editorContainer.focus();
					self._setFocus();
				}, delay));
			} else {
				this._cancelFocusTrigger = true;
				this._editorContainer.focus();
				this._setFocus();
			}
		},
		_setBlur: function (event) { // Checkbox
			this._editorContainer.removeClass(this.css.focus);
			this._triggerBlur(event);
			if (this._validator) { // TODO VERIFY
				this._validator._validateInternal(this.element, event, true);
			}
		},
		isValid: function () { // Checkbox
			/* Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
				```
				var isValid = $(".selector").%%WidgetName%%("isValid");
				```
				returnType="bool" Whether editor value is valid or not */

			// TODO VERIFY
			return true;
		},

		// igCheckboxEditor public methods
		value: function (newValue) {
			/* Gets/Sets Current checked state/Value of the igCheckboxEditor that will be submitted by the HTML form.
				1. If the [value](ui.igcheckboxeditor#options:value) option IS NOT defined, then 'value' method will match the checked state of the editor.
				This option is used when the checkbox is intended to operate as a Boolean editor. In that case the return type is bool.
				2. If the [value](ui.igcheckboxeditor#options:value) option IS defined, then 'value' method will return the value that will be submitted when the editor is checked and the form is submitted.
				To get checked state regardless of the 'value' option, use $(".selector").igCheckboxEditor("option", "checked");
				```
				//Get
				var editorVal = $(".selector").%%WidgetName%%("value");

				//Set
				$(".selector").%%WidgetName%%("value", 42);
				```
				returnType="string" Current checked state(bool) or the value(string) of the igCheckboxEditor that will be submitted by the HTML form.
			*/
			if (newValue !== undefined) {
				if (this._inputValue === undefined) {
					/*no explicit value */
					var result = this._tryParseBool(newValue);
					if (result && result.ret) {
						this._updateState(result.p1);
					} else {
						throw new Error($.ig.Editor.locale.cannotSetNonBoolValue);
					}
				} else {
					/* update value only */
					this.options.value = newValue;
					this._inputValue = newValue;
					this._updateState(this._getState());
				}
			} else {
				if (this._inputValue === undefined) {
					return this._getState();
				}
				return this.options.value;
			}
		},
		toggle: function () {
			/* Toggles the state of the checkbox.
				```
				$(".selector").%%WidgetName%%("toggle");
				```
			*/
			if (this._getState()) {
				this._updateState(false);
			} else {
				this._updateState(true);
			}
		}
	});

}));// REMOVE_FROM_COMBINED_FILES
