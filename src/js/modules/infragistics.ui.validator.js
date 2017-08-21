/*!@license
* Infragistics.Web.ClientUI Editors <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
* Depends on:
* jquery-1.9.1.js
* jquery.ui.core.js
* jquery.ui.widget.js
* infragistics.util.js
* infragistics.util.jquery.js
* infragistics.ui.popover.js
* infragistics.ui.notifier.js

* Example to use:
*	<script type="text/javascript">
*	$(function () {
*		$('#text1').igValidator({ minLength: 3 });
*	});
*	</script>
*	<input id="text1" type="text" />
*/

/*global Class */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.notifier"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
/*
	The igValidator is a widget based on jQuery UI that provides functionality to validate a target's value and show an appropriate error message.
	It can be attached to an INPUT/TEXTAREA/SELECT element in order to validate its value or a FORM (or inner container) to handle multiple fields at once.
	It can also be attached to a igEditors, igCombo and igRating.
	Validation can be triggered on various events like onchange, onblur, onsubmit.
	Every igValidator may have its own rules and enable/disable specific validation triggers, fields collection can provide thier own rules as well as inherit from the main configuration.
	If the target element is an INPUT with type=radio/checkbox, then all elements with the same name attribute as the target are validated as a group.
	If the validator is enabled on an igEditor, then any editor-specific failure like unfilled required positions in igMaskEditor can also fail the validation and show a corresponding message.

	In order to customize the default submit behavior globally for all widgets, the "$.ui.igValidator.defaults" object can be used to allow showing all errors when validating a form. Default is true.
	Example:
	$.ui.igValidator.defaults.showAllErrorsOnSubmit = false;
*/
$.widget("ui.igValidator", {
	options: {
		/* type="bool"  Gets/Sets whether validation is triggered when the text in editor changes.
			Note that this is more appropriate for selection controls such as checkbox, combo or rating.
			As it can cause excessive messages with text-based fields, the initail validation can be delayed via the [threshold](ui.igvalidator#options:threshold) option.
		```
			//Initialize
			$('.selector').igValidator({
				onchange: true
			});

			//Get
			var onchange = $(".selector").igValidator("option", "onchange");

			//Set
			$(".selector").igValidator("option", "onchange", true);
		```
		*/
		onchange: false,
		/* type="bool" Gets/Sets whether validation is triggered when the editor loses focus.
		```
		//Initialize
		$('.selector').igValidator({
			onblur: true
		});

		//Get
		var onblur = $(".selector").igValidator("option", "onblur");

		//Set
		$(".selector").igValidator("option", "onblur", true);
		```
		*/
		onblur: true,
		/* type="bool" Gets/Sets whether validation is triggered when a form containing validation targets is submitting. If any of the validations fail, the submit action will be prevented.
			Note that this doesn't apply to the native JavaScript submit function, but will handle the jQuery equivalent and the browser default action.
		```
			//Initialize
			$('.selector').igValidator({
				onsubmit: true
			});

			//Get
			var onsubmit = $(".selector").igValidator("option", "onsubmit");

			//Set
			$(".selector").igValidator("option", "onsubmit", true);
		```
		*/
		onsubmit: true,
		/* type="bool|object" Gets/Sets option to validate if a value was entered (not empty text, selected item, etc.)
		```
			//Initialize
			$('.selector').igValidator({
				required: true
			});

			//OR
			$('.selector').igValidator({
				required: {
					errorMessage: "This field is required."
				}
			});

			//Get
			var required = $(".selector").igValidator("option", "required");

			//Set
			$(".selector").igValidator("option", "required", true);
		```
			bool type="bool" A boolean value indicating if the field is required.
			object type="object" A configuration object with optional error message (e.g. required: { errorMessage: "Error!"} )
			*/
		required: false,
		/* type="bool|object" Gets/Sets number validation rule options.
			Default separators for decimals and thousands are '.' and ',' respectively and are defined in the "$.ui.igValidator.defaults" object.
		```
			//Initialize
			$('.selector').igValidator({
				number: true
			});

			//OR
			$('.selector').igValidator({
				number: {
					errorMessage : "Not a valid number",
					decimalSeparator: ".",
					thousandsSeparator: " "
				}
			});

			//Get
			var number = $(".selector").igValidator("option", "number");

			//Set
			$(".selector").igValidator("option", "number", true);
		```
			bool type="bool" A boolean value indicating if the field should be a number. Default separators are used.
			object type="object" A configuration object with errorMessage, decimalSeparator and thousandsSeparator. Those properties are all optional.
			*/
		number: false,
		/* type="bool|object" Gets/Sets date validation rule options. This can additionally help guide the [valueRange](ui.igvalidator#options:valueRange) validation.
			Note: Dependat on JavaScript Date parsing which will accept a wide range of values.
			```
				//Initialize
				$('.selector').igValidator({
					date: true
				});

				//OR
				$('.selector').igValidator({
					date: {
						errorMessage: "Not a valid date"
					}
				});

				//Get
				var date = $(".selector").igValidator("option", "date");

				//Set
				$(".selector").igValidator("option", "date", true);
			```
			bool type="bool" A boolean value indicating if the field should be a valid JavaScript Date or can be parsed as one.
			object type="object" A configuration object with optional error message (e.g. date: { errorMessage: "Enter a valid number"} )
		*/
		date: false,
		/* type="bool|object" Gets/Sets email validation rule options. Uses a RegExp defined in the "$.ui.igValidator.defaults" object.
		```
			//Initialize
			$('.selector').igValidator({
				email: true
			}

			//OR
			$('.selector').igValidator({
				email: {
					errorMessage : "Enter a valid email"
				}
			});

			//Get
			var email = $(".selector").igValidator("option", "email");

			//Set
			$(".selector").igValidator("option", "email", true);
		```
			bool type="bool" A boolean value indicating if the field should be an email.
			object type="object" A configuration object with optional error message (e.g. email: { errorMessage: "Enter a valid email"} )
		*/
		email: false,
		/* type="array|object" Gets/Sets a minimum and/or maximum length of text or number of selected items. Null or 0 values are ignored.
		```
			//Initialize
			$('.selector').igValidator({
				lengthRange: [2, 6]
			});

			//OR
			$('.selector').igValidator({
			lengthRange: {
				min: 2,
				max: 6,
				errorMessage: "Must be at least {0} long and no more than {1}."
			}
			});
			//Get
			var lengthRange = $(".selector").igValidator("option", "lengthRange");

			//Set
			$(".selector").igValidator("option", "lengthRange", [2, 6]);
		```
			array type="array" An array of two numbers, where the first value is the minimum and the second is the maximum. (e.g. lengthRange: [ 1, 10] )
			object type="object" A configuration object with optional error message. Message strings can contain format items for min and max respecitively (e.g. lengthRange: { min: 6, max: 20, errorMessage: "Password must be at least {0} long and no more than {1}." } )
			*/
		lengthRange: null,
		/* type="array|object" Gets/Sets a minimum and/or maximum value. Null values are ignored.
		```
			//Initialize
				$('.selector').igValidator({
					valueRange: [2, 6]

			//OR
			$('.selector').igValidator({
				valueRange: {
					min: 2,
					max: 6,
					errorMessage: "Value must be between {0} and {1}."
				}
			});
			//Get
			var valueRange = $(".selector").igValidator("option", "valueRange");

			//Set
			var range = [2, 6];
			$(".selector").igValidator("option", "valueRange", range);
		```
			array type="array" An array of two numbers or dates, where the first is the minimum and the second is the maximum. (e.g. valueRange: [ 1, 10] )
			object type="object" A configuration object with optional error message. Message strings can contain format items for min and max respecitively (e.g. lengthRange: { min: 6, max: 20, errorMessage: "Value must be between {0} and {1}." } )
			*/
		valueRange: null,
		/* type="bool|object" Gets/Sets Credit Card number validation rule options.
			Note: This rule will only validate the checksum of the number using Luhn algorithm irregardless of card type.
			```
			//Initialize
			 $('.selector').igValidator({
				creditCard: true
			});

			//OR
			$('.selector').igValidator({
				creditCard: {
					errorMessage : "Enter a valid card number"
				}
			});

			//Get
			var creditCard = $('.selector').igValidator("option", "creditCard");

			//Set
			$('.selector').igValidator("option", 'creditCard', true);
			```
			bool type="bool" A boolean value indicating if the field should be a valid Credit Card number.
			object type="object" A configuration object with optional error message (e.g. creditCard: { errorMessage: "Enter a valid card number"} )
		*/
		creditCard: false,
		/* type="string|object" Gets/Sets regular expression validation rule options.
		```
			//Initialize
			$(".selector").igValidator({
				pattern: "^\\d*\\.{0,1}\\d+$"
			});

			//OR
			$('.selector').igValidator({
				pattern: {
					expression: /^[a-z]+$/,
					errorMessage : "Value did not match"
				}
			});

			//Get
			var pattern = $(".selector").igValidator("option", "pattern");

			//Set
			$(".selector").igValidator("option", "pattern", "^\\d*\\.{0,1}\\d+$");
		```
			string type="string" A string containing regular expression.
			object type="object" A RegExp object or an object with expression and errorMessage properties.
		*/
		pattern: null,
		/* type="dom" Gets/Sets a custom jQuery element to be used for validation messages. That inner HTML of the target is modified, can be a SPAN, LABEL or DIV.
		```
			//Initialize
			$('.selector').igValidator({
				messageTarget: "#field1"
			});

			//Get
			var messageTarget = $(".selector").igValidator("option", "messageTarget");

			//Set
			$(".selector").igValidator("option", "messageTarget", "#field1");
		```
		*/
		messageTarget: null,
		/* type="string" Gets/Sets text for an error message to be used if none is set for the particular rule. Overrides default rule-specific error messages.
		```
			//Initialize
			$('.selector').igValidator({
				errorMessage: 'This field is required!'
			});

			//Get
			var errorMessage = $(".selector").igValidator("option", "errorMessage");

			//Set
			$(".selector").igValidator("option", "errorMessage", 'This field is required!');
		```
		*/
		errorMessage: null,
		/* type="string" Gets/Sets text for a success message. Note that since there is no default, setting this message will enable showing success indication.
		```
			//Initialize
			$('.selector').igValidator({
				successMessage: "Well done!"
			});

			//Get
			var successMessage = $(".selector").igValidator("option", "successMessage");

			//Set
			$(".selector").igValidator("option", "successMessage", "Well done!");
		```
		*/
		successMessage: null,
		/* type="number" Gets/Sets validation minimum input length. Validation won't be triggered for input before that value is reached on change and focus loss.
			Note: This will not affect required fields on form submit.
		```
			//Initialize
			$('.selector').igValidator({
				threshold: 1
			});

			//Get
			var threshold = $(".selector").igValidator("option", "threshold");

			//Set
			$(".selector").igValidator("option", "threshold", 1);
		```
		*/
		threshold: -1,
		/* type="string|object" Gets/Sets a requirement for the value in this field to be the same as another input element or editor control.
		```
			//Initialize
			$('.selector').igValidator({
				equalTo: "#field1"
			});

			//OR
			$('.selector').igValidator({
				equalTo: {
					selector: "#myEditor"
					errorMessage: "Value did not match."
				}
			});

			//Get
			var equalTo = $(".selector").igValidator("option", "equalTo");

			//Set
			$(".selector").igValidator("option", "equalTo", "#field1");
		```
			string type="string" A valid jQuery selector for the target element
			object type="object" A reference to the jQuery object for the target or an object with selector property and custom errorMessage.
		*/
		equalTo: null,
		/* type="function|string|object" Gets/Sets a custom function to perform validation. Use 'this' to reference the calling validator and the value and optional field settings arguments to determine and return the state of the field.
		```
			//Initialize
			$('.selector').igValidator({
				custom: function(value, fieldOptions){
						return false;
					}
				});

			//OR
			$('.selector').igValidator({
				custom: {
					method: function(value, fieldOptions){
						return false;
					},
					errorMessage : "Value did not match"
				}
			});

			//Get
			var custom = $(".selector").igValidator("option", "custom");

			//Set
			var custom = {
				method: function (value, fieldOptions) {
					return false;
				},
				errorMessage: "This field is required."
			};

			$(".selector").igValidator("option", "custom", custom);
		```
			function type="function" The function to call
			string type="string" Function name, must be in global namespace (window["name"])
			object type="object" A configuration object with method property being the function and optional error message.
		*/
		custom: null,
		/* type="array" Gets a list of target field items describing each with validation options and a required selector. Fields can contain any of the validation rules and triggers but not other fields or event handlers.
			Applicable options are also inherited from the global control configuration if not set.
			```
				//Initialize
				$('.selector').igValidator({
					fields: [{
						selector: "#input1",
						required: true,
						number: true,
						onblur: false
					},
					{
						selector: "#input2",
						lengthRange: {
							min: 2,
							max: 10
						},
						onchange: true
					}]
				});

				//Get
				var fields = $(".selector").igValidator("option", "fields");
			```
		*/
		fields: [{
			/* type="string|object" Gets the target element (input or control target) to be validated. This field setting is required.
			```
			//Initialize
			$('.selector').igValidator({
				fields: [{
					selector: "#input1"
				},
				{
					selector: "#input2"
				}]
			});
			```
				string type="string" A valid jQuery selector for the element
				object type="object" A reference to a jQuery object
			*/
			selector: null
		}],
		/* type="object" Gets/Sets the options for the [igNotifier](ui.ignotifier#options) used to show error messages.
		```
			//Initialize
				$('.selector').igValidator({
				notificationOptions: {
					direction: "right",
					showIcon: "true",
					mode:"popover",
					messages: {
						error: "This field is required!"
					}
				}
				});

				//Get
				var notificationOptions = $(".selector").igValidator("option", "notificationOptions");

				//Set
				var notificationOptions = {
					direction: "right",
					showIcon: "true",
					mode:"popover",
					messages: {
						error: "This field is required!"
					};

				$(".selector").igValidator("option", "notificationOptions", notificationOptions);
		```
		*/
		notificationOptions: null,
		/* type="bool" Gets/Sets the option to show an asterisks indication next to required fields.
			Note: Indicators are not supported on grouped controls such as checkbox or radio button sets and the igRating control.
			```
				//Initialize
				$('.selector').igValidator({
					requiredIndication: true
				});

				//Get
				var requiredIndication = $(".selector").igValidator("option", "requiredIndication");

				//Set
				$(".selector").igValidator("option", "requiredIndication", true);
			```
		*/
		requiredIndication: false,
		/* type="bool" Gets/Sets the option to show a label indication next to optional fields.
			Note: Indicators are not supported on grouped controls such as checkbox or radio button sets and the igRating control.
			```
				//Initialize
				$('.selector').igValidator({
					optionalIndication: true
				});

				//Get
				var optionalIndication = $(".selector").igValidator("option", "optionalIndication");

				//Set
				$(".selector").igValidator("option", "optionalIndication", true);
			```
			*/
		optionalIndication: false
	},
	css: {
		/* Class applied to the target element with validation. Has no visual effect. */
		target: "ui-igvalidator-target",
		/* Class applied to the asterisks indication span next to required fields . */
		requiredIndication: "ui-igvalidator-required-indication",
		/* Class applied to the indication span next to optional fields . */
		optionalIndication: "ui-igvalidator-optional-indication"
	},
	events: {
		/* cancel="true" Event which is raised on validation before default validation logic is applied.
			Return false in order to cancel the event and consider the field valid.
			```
				$(document).delegate(".selector", "igvalidatorvalidating", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get current value in target
					ui.value ;
					//get the options of the specific field in the collection
					ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					validating: function (evt, ui) {
					...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.value to get current value in target.
			ui.fieldOptions is populated with options for the specific field in the collection or null. */
		validating: "validating",
		/* cancel="false" Event which is raised after value was validated but before any action takes effect.
		```
			$(document).delegate(".selector", "igvalidatorvalidated", function (evt, ui) {
				//get reference to the igValidator widget
				ui.owner;
				//get current value in target
				ui.value;
				//determine the outcome of the validation
				ui.valid;
				//gets text of message if available
				ui.message;
				//get name of the rule that failed validation, if any.
				ui.rule;
				//get the options of the specific field in the collection
				ui.fieldOptions;
			});

			//Initialize
			$(".selector").igValidator({
				validated: function (evt, ui) {
				...
				}
			});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.value to get current value in target.
			Use ui.valid to determine the outcome of the validation.
			Use ui.message to get text of message.
			ui.rule is populated with the name of the rule that failed validation, if any.
			ui.fieldOptions is populated with options for the specific field in the collection or null. */
		validated: "validated",
		/* cancel="false" Event raised for valid field after value was validated but before any action takes effect.
			Function takes arguments evt and ui.
			```
				$(document).delegate(".selector", "igvalidatorsuccess", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get current value in target
					ui.value;
					//gets text of message, if any
					ui.message;
					//get the options of the specific field in the collection
					ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					success: function (evt, ui) {
					...
					}
				});
			```
			Use ui.owner to get reference to the igValidator widget.
			Use ui.value to get current value in target.
			Use ui.valid to determine the outcome of the validation.
			Use ui.message to get text of message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		success: "success",
		/* cancel="false" Event raised for invalid field after value was validated but before any action takes effect.
			Function takes arguments evt and ui.
			```
				$(document).delegate(".selector", "igvalidatorerror", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get current value in target
					ui.value;
					//determine the outcome of the validation
					ui.valid;
					//get name of the rule that failed validation
					ui.rule;
					//gets text of message
					ui.message;
					//get the options of the specific field in the collection
					ui.fieldOptions;
					});

				//Initialize
				$(".selector").igValidator({
					error: function (evt, ui) {
					...
					}
				});
			```
			Use ui.owner to get reference to the igValidator widget.
			Use ui.value to get current value in target.
			Use ui.valid to determine the outcome of the validation.
			Use ui.message to get text of message.
			ui.rule is populated with the name of the rule that failed validation.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		error: "error",
		/* cancel="true" Event which is raised before error message is displayed.
			Return false in order to prevent error message display.
			```
				$(document).delegate(".selector", "igvalidatorerrorshowing", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//gets text of message
					ui.message;
					//get reference to the target of the message
					ui.target;
					//get the options of the specific field in the collection
					ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					errorShowing: function (evt, ui) {
						...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		errorShowing: "errorShowing",
		/* cancel="true" Event which is raised before error message is hidden.
			Return false in order to keep the error message displayed.
			```
				$(document).delegate(".selector", "igvalidatorerrorhiding", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//gets text of message
					ui.message;
					//get reference to the target of the message
					ui.target;
					//get the options of the specific field in the collection
					ui.fieldOptions;

				});

				//Initialize
				$(".selector").igValidator({
					errorHiding: function (evt, ui) {.
					...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		errorHiding: "errorHiding",
		/* cancel="false" Event which is raised after error message was displayed.
		```
			$(document).delegate(".selector", "igvalidatorerrorshown", function (evt, ui) {
				//get reference to the igValidator widget
				ui.owner;
				//gets text of message
				ui.message;
				//get reference to the target of the message
				ui.target;
				//get the options of the specific field in the collection
				ui.fieldOptions;
		});

			//Initialize
			$(".selector").igValidator({
				errorShown: function (evt, ui) {
				...
				}
			});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		errorShown: "errorShown",
		/* cancel="false" Event which is raised after error message was hidden.
		```
			$(document).delegate(".selector", "igvalidatorerrorhidden", function (evt, ui) {
				//get reference to the igValidator widget
				ui.owner;
				//gets text of message
				ui.message;
				//get reference to the target of the message
				ui.target;
				//get the options of the specific field in the collection
				ui.fieldOptions;
		});

		//Initialize
		$(".selector").igValidator({
			errorHidden: function (evt, ui) {
			...
			}
		});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null. */
		errorHidden: "errorHidden",
		/* cancel="true" Event which is raised before success message is displayed.
			Return false in order to prevent success message display.
			```
				$(document).delegate(".selector", "igvalidatorsuccessshowing", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//gets text of message
					ui.message;
					//get reference to the target of the message
					ui.target;
					//get the options of the specific field in the collection
					ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					successShowing: function (evt, ui) {
					...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		successShowing: "successShowing",
		/* cancel="true" Event which is raised before success message is hidden.
			Return false in order to keep success message displayed.
			```
			$(document).delegate(".selector", "igvalidatorsuccesshiding", function (evt, ui) {
				//get reference to the igValidator widget
				ui.owner;
				//gets text of message
				ui.message;
				//get reference to the target of the message
				ui.target;
				//get the options of the specific field in the collection
				ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					successHiding: function (evt, ui) {
					...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null. */
		successHiding: "successHiding",
		/* cancel="false" Event which is raised after success message was displayed.
			```
				$(document).delegate(".selector", "igvalidatorsuccessshown", function (evt, ui) {
						//get reference to the igValidator widget
						ui.owner;
						//gets text of message
						ui.message;
						//get reference to the target of the message
						ui.target;
						//get the options of the specific field in the collection
						ui.fieldOptions;
					});

					//Initialize
					$(".selector").igValidator({
						successShown: function (evt, ui) {
						...
						}
					});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null. */
		successShown: "successShown",
		/* cancel="false" Event which is raised after success message was hidden.
		```
			$(document).delegate(".selector", "igvalidatorsuccesshidden", function (evt, ui) {
				//get reference to the igValidator widget
				ui.owner;
				//gets text of message
				ui.message;
				//get reference to the target of the message
				ui.target;
				//get the options of the specific field in the collection
				ui.fieldOptions;
				});

				//Initialize
				$(".selector").igValidator({
					successHidden: function (evt, ui) {
					...
					}
				});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.message to get text of message.
			Use ui.target to get reference to the target of the message.
			ui.fieldOptions is populated with options for the specific field in the collection or null.  */
		successHidden: "successHidden",
		/* cancel="true" Event triggered on Validator instance level before handling a form submit event.
			Return false to cancel to skip validating and potentially allow the submit if no other other validators return erros.
			```
				$(document).delegate(".selector", "igvalidatorformvalidating", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get reference of the event target form
					ui.target;
				});

				//Initialize
				$(".selector").igValidator({
					formValidating: function (evt, ui) {
					...
					}
				});
			```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.target to get reference of the event target form. */
		formValidating: "formValidating",
		/* cancel="false" Event triggered on Validator instance level after validation on form submit event..
		```
			$(document).delegate(".selector", "igvalidatorformvalidated", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get reference of the event target form
					ui.target;
					//determine the outcome of the validation
					ui.valid;
				});

			//Initialize
			$(".selector").igValidator({
			formValidated: function (evt, ui) {
				...
				}
			});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.target to get reference of the event target form.
			Use ui.valid to determine the outcome of the validation. */
		formValidated: "formValidated",
		/* cancel="false" Event triggered on Validator instance level after failed validation on form submit event.
		```
			$(document).delegate(".selector", "igvalidatorformerror", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get reference of the event target form
					ui.target
				});

			//Initialize
			$(".selector").igValidator({
				formError: function (evt, ui) {
				...
				}
			});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.target to get reference of the event target form. */
		formError: "formError",
		/* cancel="false" Event triggered on Validator instance level after successful validation on form submit event.
		```
			$(document).delegate(".selector", "igvalidatorformsuccess", function (evt, ui) {
					//get reference to the igValidator widget
					ui.owner;
					//get reference of the event target form
					ui.target;
				});

				//Initialize
				$(".selector").igValidator({
					formSuccess: function (evt, ui) {
					...
					}
				});
		```
			Function takes arguments evt and ui.
			Use ui.owner to get reference to the igValidator widget.
			Use ui.target to get reference of the event target form. */
		formSuccess: "formSuccess"
	},
	/* defaults for the notifier */
	notifierDefaults: {
		state: "error"
	},
	rules: [],
	summaryResult: false,
	_createWidget: function () {
		// strip dummy fields collection
		delete this.options.fields;
		$.Widget.prototype._createWidget.apply(this, arguments);
	},
	_create: function () {
		// internal counter for how many fields require form handling
		this._formHandleCounter = 0;
		this._fieldOptions = this.options.fields ? $.extend([], this.options.fields) : null; // TODO use internal
		var shouldHandleForm = false;

		// fields:
		if (this.options.fields) {
			for (var i = 0; i < this.options.fields.length; i++) {
				var options = this.options.fields[ i ];
				this._initializeField($(options.selector), options);

				// handle form for multiple fields, ignore global
				if (options.onsubmit !== undefined ? options.onsubmit : this.options.onsubmit) {
					shouldHandleForm = true;
					this._formHandleCounter++;
				}
			}
		} else {
			this._initializeField(this.element, this.options);
		}

		this._attachToForm(shouldHandleForm || this.options.onsubmit);
		this._initalizeRules();
	},
	_setOption: function (option, value) {
		var i;
		switch (option) {
			case "notificationOptions":
				this.options.notificationOptions = value;
				this._updateNotifiers();
				break;
			case "onchange":
			case "onblur":
				if (!this.options.fields && !this.options._control) { // TODO: ignore?
					this.element.unbind(".validator");
					this._attachFieldEvents(this.element);
				}
				break;
			case "onsubmit":
				if (this.options.onsubmit === value) {
					break;
				}
				if (this.options.fields) {
					for (i = 0; i < this.options.fields.length; i++) {

						//go though fields that inherit the global setting
						if (this.options.fields[ i ].onsubmit === undefined) {
							if (value) {
								if (!this._formHandleCounter) {
									// handle form for multiple fields, ignore global
									this._attachToForm(true);
								}
								this._formHandleCounter++;
							} else if (!--this._formHandleCounter) {
								// if no more fields need form submit, detach
								this._detachFromForm();
							}
						}
					}
				}
				break;
			case "messageTarget":
				var oldVisible = this._fieldMessageVisible(this.options);
				this._clearMessageTarget(this.options);
				this._hideSuccess(this.options);
				this._hideError(this.options);

				this.options.messageTarget = value;
				this._evalMessageTarget(this.options);
				if (oldVisible) {
					if (this.options.isValid) {
						this._showSuccess(this.options, { message: this.options._currentMessage });
					} else {
						this._showError(this.options, { message: this.options._currentMessage });
					}
				}
				break;
			case "errorMessage":
			case "successMessage":

				//var oldVisible = this._fieldMessageVisible(this.options);
				// TODO: hide enough? let user call validate after?
				this._hideError(this.options);
				this._hideSuccess(this.options);
				break;
			case "requiredIndication":
			case "optionalIndication":
				if (this.options.fields) {
					for (i = 0; i < this.options.fields.length; i++) {

						this._removeFieldIndications(this.options.fields[ i ]);
						this.options[ option ] = value;
						this._addFieldIndications(this.options.fields[ i ]);
					}
				} else {
					this._removeFieldIndications(this.options);
					this.options[ option ] = value;
					this._addFieldIndications(this.options);
				}
				break;

			// Not supported after init:
			case "fields":
				return;
			default:
				break;

		}
		$.Widget.prototype._setOption.apply(this, arguments);
	},
	_initalizeRules: function () {
		// prevent using the prototype array
		this.rules = [];

		// order of rules is important:
		this.rules.push(new $.ig.igValidatorRequiredRule(this));
		this.rules.push(new $.ig.igValidatorControlRule(this));
		this.rules.push(new $.ig.igValidatorNumberRule(this));
		this.rules.push(new $.ig.igValidatorDateRule(this));
		this.rules.push(new $.ig.igValidatorLengthRule(this));
		this.rules.push(new $.ig.igValidatorValueRule(this));
		this.rules.push(new $.ig.igValidatorEqualToRule(this));
		this.rules.push(new $.ig.igValidatorEmailRule(this));
		this.rules.push(new $.ig.igValidatorCreditCardRule(this));
		this.rules.push(new $.ig.igValidatorPatternRule(this));
		this.rules.push(new $.ig.igValidatorCustomRule(this));
	},
	_initializeField: function (element, options) {
		var target = element;
		if (!target.length) {
			// ignore invalid selector on fields
			options._ignored = true;
			return;
		}

		// check if initialized on a editor control:
		options._control = this._getEditor(target);
		if (options._control) {
			this._form = this._form || target.closest("form").get(0);
			if (options._control.widgetName === "igCombo") {
				options._type = "selectrange";
			} else if (options._control.widgetName === "igRating") {
				options._type = "select";
			}

			// bridge
			if (options._control._options) {    // igCombo
				options._control._options.validator = this;
			} else {    // igEditors
				options._control._validator = this;
			}
		} else {
			// evaluate target type
			var elemType = target[ 0 ].tagName;
			switch (elemType) {
				case "INPUT":
					if (target[ 0 ].type === "checkbox") {
						// check for other checkboxes:
						options._group = this._findGroupTargets(target);
						options._type = options._group.length > 1 ? "checkboxrange" : "checkbox";
						target = options._group;
					} else if (target[ 0 ].type === "radio") {
						// get all radios:
						options._group = this._findGroupTargets(target);
						options._type = "radio";
						target = options._group;
					} else {
						options._type = "input";
					}
					break;
				case "TEXTAREA":
					options._type = "textarea";
					break;
				case "SELECT":
					if (target[ 0 ].multiple) {
						options._type = "selectrange";
					} else {
						options._type = "select";
					}
					break;

					// forms and containers, skip other steps:
				case "FORM":
					this._form = this._form || target[ 0 ];
					options._ignored = true;
					return;

				default:

					// assume container inside the form?
					this._form = this._form || target.closest("form").get(0);
					options._ignored = true;
					return;
			}

			// attach events (only for fields)
			this._attachFieldEvents(target);
		}
		options._ignored = false;
		target.addClass(this.css.target);
		target.data("igValidatorField", options);
		options.notifyTarget = this._targetFromOptions(options, true);
		this._evalMessageTarget(options);
		this._ensureNotifier(options, true);

		this._addFieldIndications(options);
	},
	_findGroupTargets: function (target) {
		if (target[ 0 ].name) {
			return $("[name=" + target[ 0 ].name + "]", target[ 0 ].form || document);
		}
		return target;
	},
	_attachFieldEvents: function (element) {
		var self = this, evts = {
			"keyup.validator": function (e) {
				// skip ctrls, alts, shifts, caps + TAB
				if (e.keyCode !== 9 && e.keyCode < 15 || e.keyCode > 20) {
					self._validateInternal(element, e);
				}
			},
			"change.validator": function (e) { self._validateInternal(element, e); },

			// fires before actual value
			"cut.validator": function (e) {
				setTimeout(function () { self._validateInternal(element, e); }, 10);
			},
			"paste.validator": function (e) {
				setTimeout(function () { self._validateInternal(element, e); }, 10);
			},
			"drop.validator": function (e) {
				setTimeout(function () { self._validateInternal(element, e); }, 10);
			},
			"dragend.validator": function (e) {
				setTimeout(function () { self._validateInternal(element, e); }, 10);
			},
			"blur.validator": function (e) { self._validateInternal(element, e, true); }
		};
		element.bind(evts);
	},
	_ensureNotifier: function (options, reinit) {
		/* Checks for and/or initializes igNotifier */
		if (reinit && options.notifyTarget.data("igNotifier")) {
			options.notifyTarget.igNotifier("destroy").unbind(".validator");
		}
		if (!options.notifyTarget.data("igNotifier")) {
			var args = {
				owner: this,
				target: options.notifyTarget,
				fieldOptions: options === this.options ? null : options
			};

			// proxy events:
			options.notifyTarget.igNotifier($.extend({},
					this.notifierDefaults,
					this.options.notificationOptions,
					options.notificationOptions
				))
				.bind({
					"ignotifiershowing.validator": function (evt, ui) {
						return args.owner._handleNotifierEvent(evt, ui, "Showing", args);
					},
					"ignotifiershown.validator": function (evt, ui) {
						return args.owner._handleNotifierEvent(evt, ui, "Shown", args);
					},
					"ignotifierhiding.validator": function (evt, ui) {
						return args.owner._handleNotifierEvent(evt, ui, "Hiding", args);
					},
					"ignotifierhidden.validator": function (evt, ui) {
						return args.owner._handleNotifierEvent(evt, ui, "Hidden", args);
					}
				});
		}
	},
	_updateNotifiers: function () {
		if (this.options.fields) {
			for (var i = 0; i < this.options.fields.length; i++) {
				this._ensureNotifier(this.options.fields[ i ], true);
			}
		} else {
			this._ensureNotifier(this.options, true);
		}
	},
	_clearMessageTarget: function (options) {
		if (options._$messageTarget) {
			options._$messageTarget
				.removeClass("field-validation-valid field-validation-error")
				.empty().css("display", "");
		}
	},
	_evalMessageTarget: function (options) {
		options._$messageTarget = options.messageTarget;
		if (typeof options._$messageTarget === "string") {
			var target = $("[data-valmsg-for='" + options._$messageTarget + "']");
			options._$messageTarget = target.length ? target : $(options._$messageTarget);
		}
		if (options._$messageTarget instanceof $) {
			if (options._$messageTarget.length) {
				options._$messageTarget.hide();
			} else {
				options._$messageTarget = null;
			}
		}
	},
	_addFieldIndications: function (options) {
		var ops, target = options.notifyTarget;
		if ((options._group && options._group.length > 1) ||
			(options._control && options._control.widgetName === "igRating")) {
			// not supported on groups
			return;
		}

		// M.S. 12/2/2016 Bug 228364: The target for the igCombo should be the parent in order for the asterix to be displayed next to the control
		if (options._control !== null && options._control.widgetName === "igCombo") {
			target = target.parent();
		}

		ops = this._addGlobalSettings(options);
		if (ops.required && ops.requiredIndication) {
			// TODO: or use CSS?
			options._$indicator = target.after(
				"<span title='" + this._getLocalizedMessage("required") +
				"' class='" + this.css.requiredIndication + "'>*</span>")
			.next();
		}
		if (!ops.required && ops.optionalIndication) {
			// TODO: or use CSS?
			options._$indicator = target.after("<span class='" +
				this.css.optionalIndication + "'>" +
				this._getLocalizedMessage("optional", "String") + "</span>")
			.next();
		}
	},
	_removeFieldIndications: function (options) {
		if (options._$indicator) {
			// TODO: hide or cleanup?
			options._$indicator.hide();
			options._$indicator.remove();
			delete options._$indicator;
		}
	},
	_attachToForm: function (shouldHandleForm) {
		this._form = this._form || this.element[ 0 ].form || this.element.closest("form").get(0);
		if (!this._form || !shouldHandleForm) {
			return;
		}

		if (!this._form._igValidators || !this._form._igValidators.length) {
			this._form._igValidators = [];
			$(this._form).bind("submit.validator", function (e) {
				this._igErrorShown = false;
				var summaryResult = true, current;
				for (var i = 0; i < this._igValidators.length; i++) {
					current = this._igValidators[ i ]._validateForm(e);

					summaryResult = summaryResult ? current : summaryResult;
				}
				if (!summaryResult) {
					e.preventDefault();
					e.stopPropagation();
				}
				delete this._igErrorShown;
			});
		}
		this._form._igValidators.push(this);
	},
	_detachFromForm: function () {
		var index;
		if (this._form && (index = $.inArray(this, this._form._igValidators)) > -1) {
			this._form._igValidators.splice(index, 1);
			if (!this._form._igValidators.length) {
				//also detach handler if all validators are destoyed
				$(this._form).unbind("submit.validator");
			}
		}
	},
	_validate: function (field, evt, isSubmitting) {
		var current, i,
			valid = true; /* sticky valid state (should stay false between multiple checks) */

		if (this.options.fields) {
			if (field !== undefined && (i = this._fieldIndexOf(field)) > -1) {
				// single field passed
				field = this.options.fields[ i ];
				valid = field.isValid = this._validateField(field, evt, isSubmitting);
			} else {
				// check all
				for (i = 0 ; i < this.options.fields.length; i++) {
					field = this.options.fields[ i ];
					current = field.isValid = this._validateField(field, evt, isSubmitting);
					valid = valid ? current : valid;
				}
			}
		} else {
			valid = this._validateField(this.options, evt, isSubmitting);
			this.options.isValid = valid;
		}

		return valid;
	},
	_validateForm: function (evt) {
		var valid = true,
			args = {
				owner: this,
				target: $(evt.target)
			};

		// overall "form" event
		if (this._trigger(this.events.formValidating, evt, args)) {

			args.valid = valid = this._validate(null, evt, true);

			// overall "form" event
			this._trigger(this.events.formValidated, evt, args);
			this._trigger(valid ? this.events.formSuccess : this.events.formError, evt, args);
		}
		return valid;
	},
	_errorOnSubmitAllowed: function () {
		if (!$.ui.igValidator.defaults.showAllErrorsOnSubmit &&
				this._form && this._form._igErrorShown !== undefined) {
			return !this._form._igErrorShown;
		}
		return true;
	},
	_addErrorOnSubmit: function () {
		if (!$.ui.igValidator.defaults.showAllErrorsOnSubmit &&
				this._form && this._form._igErrorShown !== undefined) {
			this._form._igErrorShown = true;
		}
	},
	_validateInternal: function (element, evt, blur, value) {
		// Called from events && internally used by other controls
		element = element ||
				(evt && (element = $(evt.target).closest("." + this.css.target)).length) ||
				this.element;
		var field = element.data("igValidatorField");
		if (field) {
			field.isValid = this._validateField(field, evt || {}, false, value, blur);
			return field.isValid;
		}

		if (value !== undefined) {
			// internal check:
			this.options.isValid = this._validateField(this.options, evt || {}, false, value, blur);
			return this.options.isValid;
		} else {
			return this._validate(null, evt || {});
		}
	},
	_validateField: function (opts, evt, isSubmitting, value, blur) {
		if (opts._ignored) {
			return true;
		}
		var options = this._addGlobalSettings(opts);

		// Called per field with optional value to check, event and blur flag
		value = value !== undefined ? value : this._getTargetValue(options);
		var valueString = value !== 0 ? value && value.toString() : value.toString(),
			hasLength = valueString && value.length !== undefined;

		// validation stop rules (threshold, triggers validation)
		// Note: Options must be extended with globals at this point to properly validate triggers and conditions
		if (isSubmitting && !options.onsubmit) {
			return true;
		}
		if (!this._forceValidation && !isSubmitting) { // set on API calls
			if ((blur && !options.onblur) || (!blur && !options.onchange)) {
				// validate change and blur internal calls without the setting
				return true;
			}

			if (options.hasOwnProperty("threshold") && hasLength && value.length <= options.threshold) {
				// threshold in effect, skip checks
				return true;
			}
		}

		var args = {
			value: value,
			owner: this,
			fieldOptions: options === this.options ? null : opts
		};

		if (evt && !this._trigger(this.events.validating, evt, args)) {
			//cancel, state remains unchanged
			return true;
		}

		opts._currentMessage = null;

		if (!options.required && !valueString) {
			//no value and not required, return
			args.message = opts._currentMessage = options.successMessage;
			this._success(options, args, evt, isSubmitting);
			return true;
		}

		for (var i = 0; i < this.rules.length; i++) {
			if (options[ this.rules[ i ].name ] || this.rules[ i ].name === "control") {
				// validate rules
				var result = this.rules[ i ].isValid(options, value);
				if (!result) {
					opts._currentMessage = this.rules[ i ].getRuleMessage(options) ||
						this._getLocalizedMessage(this.rules[ i ].getMessageType(options));

					opts._currentMessage = this.rules[ i ].formatMessage(opts._currentMessage);

					args.message = opts._currentMessage;
					args.rule = this.rules[ i ].name;
					this._showError(options, args, evt);
					return false;
				}
			}
		}

		// Success
		args.message = opts._currentMessage = options.successMessage;
		this._success(options, args, evt);
		return true;
	},
	_success: function (options, args, evt) {
		// Success
		args.valid = true;
		if (evt) {
			this._trigger(this.events.validated, evt, args);
			this._trigger(this.events.success, evt, args);
		}

		this._showSuccess(options, args, evt);
	},
	_showError: function (options, args, evt) {
		args.valid = false;
		if (evt) {
			this._trigger(this.events.validated, evt, args);
			this._trigger(this.events.error, evt, args);
		}

		if (this._skipMessages || !this._errorOnSubmitAllowed()) {
			return;
		}

		this._hideSuccess(options, evt);

		// D.P. 9th June 2016 Bug 216714: Event parameters consistency, adjust target
		args = {
			owner: this,
			message: args.message,
			target: options._$messageTarget ? options._$messageTarget : options.notifyTarget,
			fieldOptions: args.fieldOptions
		};

		if (evt && !this._trigger(this.events.errorShowing, evt, args)) {
			return; //canceled
		}
		this._ensureNotifier(options);
		if (options._$messageTarget) {
			// custom error container
			options._$messageTarget.removeClass("field-validation-valid")
					.addClass("field-validation-error")
					.html(args.message).show();
			options.notifyTarget.data("igNotifier")._setOption("state", "error");
			options.notifyTarget.data("igNotifier")._setTargetState();
		} else {
			options.notifyTarget.igNotifier("notify", "error", args.message);
		}
		if (evt) {
			this._trigger(this.events.errorShown, evt, args);
		}
		this._addErrorOnSubmit();
	},
	_hideError: function (options, evt) {
		var notifier = options._$messageTarget || options.notifyTarget.data("igNotifier"),
			args = {
				owner: this,
				target: options._$messageTarget || options.notifyTarget,
				message: notifier._currentText || options._$messageTarget && options._$messageTarget.text(),
				fieldOptions: options === this.options ? null : options
			};

		if (this._hasVisibleError(options)) {
			if (evt && !this._trigger(this.events.errorHiding, evt, args)) {
				return; //canceled
			}

			// will call either igNotifier or jQuery hide this way
			notifier.hide();
			options.notifyTarget.data("igNotifier")._setTargetState(true);
			if (evt) {
				this._trigger(this.events.errorHidden, evt, args);
			}
		}
	},
	_showSuccess: function (options, args, evt) {
		if (this._skipMessages) {
			return;
		}

		this._hideError(options, evt);

		if (args.message) {
			// D.P. 9th June 2016 Bug 216714: Event parameters consistency, adjust target
			args = {
				owner: this,
				message: args.message,
				target: options._$messageTarget ? options._$messageTarget : options.notifyTarget,
				fieldOptions: args.fieldOptions
			};

			// D.P. 13th Apr 2016 Bug 216717: Success showing will trigger even where there's no message set
			if (evt && !this._trigger(this.events.successShowing, evt, args)) {
				return; //canceled
			}

			this._ensureNotifier(options);
			if (options._$messageTarget) {
				// custom error container
				options._$messageTarget.removeClass("field-validation-error")
						.addClass("field-validation-valid")
						.html(args.message).show();

				options.notifyTarget.data("igNotifier")._setOption("state", "success");
				options.notifyTarget.data("igNotifier")._setTargetState();
			} else {
				options.notifyTarget.igNotifier("notify", "success", args.message);
			}
			if (evt) {
				this._trigger(this.events.successShown, evt, args);
			}
		}
	},
	_hideSuccess: function (options, evt) {
		var notifier = options._$messageTarget || options.notifyTarget.data("igNotifier"),
			args = {
				owner: this,
				target: options._$messageTarget || options.notifyTarget,
				message: notifier._currentText || options._$messageTarget && options._$messageTarget.text(),
				fieldOptions: options === this.options ? null : options
			};

		if (this._hasVisibleSuccess(options)) {
			if (evt && !this._trigger(this.events.successHiding, evt, args)) {
				return; //canceled
			}

			// will call either igNotifier or jQuery hide this way
			notifier.hide();
			if (evt) {
				this._trigger(this.events.successHidden, evt, args);
			}
		}
	},
	_handleNotifierEvent: function (evt, ui, type, args) {
		/* type is Shown, Hiding, etc */
		var state = ui.owner.options.state;

		// D.P. 9th June 2016 Bug 216714: No message/fieldOptions from notifier events
		args.message = ui.owner._currentText;

		if (state === "error") {
			return args.owner._trigger(this.events[ "error" + type ], evt, args);
		} else if (state === "success") {
			return args.owner._trigger(this.events[ "success" + type ], evt, args);
		}
		return true;
	},
	_getTargetValue: function (options) {
		if (options._control) {
			if (options._control.options.checked !== undefined) { // CheckBoxEditor
				return options._control.options.checked;
			} else if (options._control.refreshValue && options._control.options.allowCustomValue) { // igCombo + allowCustomValue
				options._control.refreshValue();
			}
			return options._control.value(); // igEditors, igCombo, igRating
		}
		var $target = this._targetFromOptions(options);
		if (!$target.length) {
			return null;
		}
		switch (options._type) {
			case "textarea":

				// TODO: val() strips \r, http://api.jquery.com/val/
				return $target.val().replace(/\r?\n/g, "\r\n");
			case "checkbox":
				return $target[ 0 ].checked;
			case "radio":
			case "checkboxrange":
				return options._group.filter(":checked").map(function () {
					return this.value;
				}).get();
			case "input":
			case "select":
			case "selectrange":
				return $target.val();
		}

		// D.P. 15th Dec 2015 Bug 211119: default in case there's no _type evaluated from equalTo target
		return $target.val && $target.val();
	},
	_getLocalizedMessage: function (key, postfix) {
		key += postfix || "Message";
		var message = this.options.locale ? this.options.locale[ key ] : null;
		if (!message && $.ig && $.ig.Validator && $.ig.Validator.locale) {
			message = $.ig.Validator.locale[ key ];
		}
		return message || "";
	},
	_targetFromOptions: function (options, outer) {
		if (outer && options._control) {
			if (options._control.editorContainer) {
				return options._control.editorContainer();
			} else if (options._control.comboWrapper) {
				return options._control.comboWrapper().children().first();
			}
		}
		if (options.selector) {
			return options.selector instanceof $ ? options.selector : $(options.selector);
		} else {
			return this.element;
		}
	},
	_getEditor: function (elem) {
		// check if initialized on a editor control:
		var widgets = elem.data(),
			controls = [ "Editor", "Combo", "Rating", "DatePicker" ],

			// regEx results in something like /ig.*?(Editor|Combo|Rating)/
			regEx = new RegExp("ig.*?(" + controls.join("|") + ")");
		for (var i in widgets) {
			if (widgets[ i ].widgetName && regEx.test(widgets[ i ].widgetName)) {
				return widgets[ i ];
			}
		}
		return null;
	},
	_cleanupField: function (options) {
		var element = this._targetFromOptions(options || this.options);
		element.unbind(".validator");
		if (options.notifyTarget && options.notifyTarget.data("igNotifier")) {
			options.notifyTarget.igNotifier("destroy").unbind(".validator");
		}
		this._clearMessageTarget(options);
		if (element.data("igValidatorField")) {
			element.removeData("igValidatorField");
		}
		this._removeFieldIndications(options);

		// bridge
		if (options._control) {
			if (options._control._options) {    // igCombo
				options._control._options.validator = null;
			} else {    // igEditors
				options._control._validator = null;
			}
		}
		element.removeClass(this.css.target);
	},
	_addGlobalSettings: function (options) {
		if (options === this.options) {
			return options;
		}

		// cherry-pick options to merge
		var properties = [ "required", "threshold", "number", "date", "lengthRange",
							"valueRange", "email", "creditCard", "custom", "onblur", "onchange",
							"onsubmit", "successMessage", "errorMessage",
							"requiredIndication", "optionalIndication" ],
			extendedOptions = $.extend({}, options);

		for (var i = 0; i < properties.length; i++) {
			if (!options.hasOwnProperty(properties[ i ]) && this.options[ properties[ i ] ] !== null) {
				// TODO: if (typeof this.options[properties[ i ]] !== object) extend complex options?
				extendedOptions[ properties[ i ] ] = this.options[ properties[ i ] ];
			}
		}
		return extendedOptions;
	},
	_indexOfByProerty: function (array, property, value) {
		// TODO: move to utils
		for (var i = 0; i < array.length; i++) {
			if (array[ i ][ property ] && array[ i ][ property ] === value) {
				return i;
			}
		}
		return -1;
	},
	_hasVisibleSuccess: function (options) {
		if (this._fieldMessageVisible(options)) {
			if (options._$messageTarget && options._$messageTarget.hasClass("field-validation-valid")) {
				return true;
			} else {
				return options.notifyTarget.data("igNotifier").options.state === "success";
			}
		}
		return false;
	},
	_hasVisibleError: function (options) {
		if (this._fieldMessageVisible(options)) {
			if (options._$messageTarget && options._$messageTarget.hasClass("field-validation-error")) {
				return true;
			} else {
				return options.notifyTarget.data("igNotifier").options.state === "error";
			}
		}
		return false;
	},
	_fieldMessageVisible: function (options) {
		if (options._$messageTarget) {
			return options._$messageTarget.is(":visible");
		}
		if (options.notifyTarget.data("igNotifier")) {
			return options.notifyTarget.data("igNotifier").isVisible();
		}
		return false;
	},
	_fieldIndexOf: function (fieldParam) {
		/* extracts the field index from a field parameter of multiple types */
		var index = -1;
		if (typeof fieldParam === "number" && this.options.fields[ fieldParam ]) {
			return fieldParam;
		}
		if (typeof fieldParam === "string") {
			index = this._indexOfByProerty(this.options.fields, "selector", fieldParam );
		}
		if (typeof fieldParam === "object") {
			index = $.inArray(fieldParam, this.options.fields);
		}
		if (index >= this.options.fields.length) {
			return -1;
		}
		return index;
	},
	validate: function (field) {
		/* Trigger validation and show errors for invalid fields.
		```
			var validate = $(".selector").igValidator("validate");
		```
			paramType="number|string|object" optional="true" Optional field object, its selector or zero-based index to check. Only has effect with fields collection and skips other fields.
			returnType="bool" True if the field(s) passed all checks.
		*/
		var valid;

		// apply validation-forcing flag
		this._forceValidation = true;

		valid = this._validate(field);

		this._forceValidation = false;
		return valid;
	},
	isValid: function (field) {
		/* Trigger validation but do not display error messages.
		```
			var isValid = $(".selector").igValidator("isValid");
		```
			paramType="number|string|object" optional="true" Optional field object, its selector or zero-based index to check. Only has effect with fields collection and skips other fields.
			returnType="bool" True if the field(s) passed all checks.
		*/
		this._skipMessages = true;
		var valid = this.validate(field);
		this._skipMessages = false;
		return valid;
	},
	hide: function (field) {
		/* Hide any possible message(s) (either messageTarget or igNotifier).
			Note: When the validator has a fields colleciton, not passing a field will hide messages on all fields.
			```
				$(".selector").igValidator("hide");
			```
			paramType="number|string|object" optional="true" Optional field object, its selector or zero-based index to hide message for.
		*/
		var i;
		if (this.options.fields) {
			if (field !== undefined) {
				// single field passed
				if ((i = this._fieldIndexOf(field)) > -1) {
					this._hideError(this.options.fields[ i ]);
					this._hideSuccess(this.options.fields[ i ]);
				}
				return;
			}
			for (i = 0; i < this.options.fields.length; i++) {
				if (this.options.fields[ i ].isValid !== undefined) {
					// single field passed
					this._hideError(this.options.fields[ i ]);
					this._hideSuccess(this.options.fields[ i ]);
				}
			}
		} else {
			this._hideError(this.options);
			this._hideSuccess(this.options);
		}
	},
	getErrorMessages: function (field) {
		/* Gets all current error messages for invalid field(s). Note that this method does not valdiate and states and messages are only updated on validation, so
			this can be used on formValidated event or after validate/isValid method calls.
			```
				var getErrorMessages = $(".selector").igValidator("getErrorMessages","#field1");
			```
			paramType="number|string|object" optional="true" Optional field object, selector or zero-based index for a single field to get error message for.
			returnType="array" An array of all current error messages.
		*/
		var result = [], i;
		if (this.options.fields) {
			if (field !== undefined) {
				// single field passed
			    if ((i = this._fieldIndexOf(field)) > -1 &&
                    this.options.fields[ i ].isValid !== undefined &&
                    !this.options.fields[ i ].isValid) {
					result.push(this.options.fields[ i ]._currentMessage);
				}
				return result;
			}
			for (i = 0; i < this.options.fields.length; i++) {
				if (this.options.fields[ i ].isValid !== undefined && !this.options.fields[ i ].isValid) {
					result.push(this.options.fields[ i ]._currentMessage);
				}
			}
    } else if (this.options.isValid !== undefined && !this.options.isValid) {
			result.push(this.options._currentMessage);
		}
		return result;
	},
	isMessageDisplayed: function (field) {
		/* Check for currently displayed message(s). Takes an optional field.
			Note: When the validator has a fields colleciton, not passing a field will return a cumulative true even if just one field has a visible message.
			```
				var isMessageDisplayed = $(".selector").igValidator("isMessageDisplayed","#field1");
			```
			paramType="number|string|object" optional="true" Optional field object, selector or zero-based index for a single field to get error message for.
			returnType="bool" True if there is a currently visible message.
		*/
		var result = false, i;
		if (this.options.fields) {
			if (field !== undefined) {
				// single field passed
				if ((i = this._fieldIndexOf(field)) > -1) {
					result = !result ? this._fieldMessageVisible(this.options.fields[ i ]) : result;
				}
				return result;
			}
			for (i = 0; i < this.options.fields.length; i++) {
				result = !result ? this._fieldMessageVisible(this.options.fields[ i ]) : result;
			}
		} else {
			result = this._fieldMessageVisible(this.options);
		}
		return result;
	},
	notifier: function (field) {
		/* Gets the notifier for the igValidator or for a single filed.
		```
			var notifier = $(".selector").igValidator("notifier");
		```
			paramType="number|string|object" optional="true" Optional field object, its selector or zero-based index to get notifier for.
			returnType="object" Reference to igNotifier or null on incorect field.
		*/
		var i, notifier;
		if (field !== undefined && this.options.fields && (i = this._fieldIndexOf(field)) > -1) {
			notifier = this.options.fields[ i ].notifyTarget &&
						this.options.fields[ i ].notifyTarget.data("igNotifier");
		} else {
			notifier = this.options.notifyTarget && this.options.notifyTarget.data("igNotifier");
		}
		return notifier || null;
	},
	addField: function (field) {
		/* Adds an new input to the fields collection and initializes it with the validator. Note: Additional fields are only accepted if the validator has been created with the collection.
		```
			var field = {
				selector: "#input1",
				required: true,
				number: true,
				onblur: false
			};
			$(".selector").igValidator("addField",field);
		```
			paramType="object" optional="false" An object with the field selector and options.
		*/
		if (!this.options.fields) {
			return;
		}
		this.options.fields.push(field);
		this._initializeField($(field.selector), field);

		var options = this._addGlobalSettings(field);
		if (options.onsubmit) {
			if (!this._formHandleCounter) {
				// handle form for multiple fields, ignore global
				this._attachToForm(true);
			}
			this._formHandleCounter++;
		}
	},
	removeField: function (field) {
		/* Removes an input from the fields collection.
		```
			$(".selector").igValidator("removeField","#input1");
		```
			paramType="object|number|string" optional="false" The field object to remove, its zero-based index or selector.
		*/
		if (!this.options.fields) {
			return;
		}
		var index = this._fieldIndexOf(field);

		if (index > -1) {
			var removed = this.options.fields.splice(index, 1)[ 0 ],
				options = this._addGlobalSettings(removed);
			this._cleanupField(removed);
			if (options.onsubmit && !--this._formHandleCounter) {
				// if no more fields need form submit, detach
				this._detachFromForm();
			}
		}
	},
	updateField: function (field, fieldOptions) {
		/* Updates a field in the validator collection. Used to reinitialize field in case a control has been created after the validator or to pass in new options.
		```
			var newOptions = {
				required: true,
				number: true,
				onblur: false
			};

			$(".selector").igValidator("updateField","#input1", newOptions);
		```
			paramType="object|number|string" optional="false" The field object to update, its zero-based index or selector.
			paramType="object" optional="true" New options to apply to the field.
		*/
		if (!this.options.fields) {
			return;
		}
		var index = this._fieldIndexOf(field);

		if (index > -1) {
			if (!fieldOptions) {
				this._cleanupField(this.options.fields[ index ]);
				this._initializeField($(this.options.fields[ index ].selector), this.options.fields[ index ]);
				return;
			}

			fieldOptions = $.extend({}, this.options.fields[ index ], fieldOptions);

			// TODO just remove and add?
			var current = this._addGlobalSettings(this.options.fields[ index ]),
				options = this._addGlobalSettings(fieldOptions);
			this._cleanupField(current);
			this._initializeField($(fieldOptions.selector), fieldOptions);

			if (current.onsubmit && !--this._formHandleCounter) {
				// if no more fields need form submit, detach
				this._detachFromForm();
			}
			if (options.onsubmit) {
				if (!this._formHandleCounter) {
					// handle form for multiple fields, ignore global
					this._attachToForm(true);
				}
				this._formHandleCounter++;
			}

			// swap fields:
			this.options.fields.splice(index, 1, fieldOptions);

			//or options.fields.splice(index, 0, options);
		}
	},
	destroy: function () {
		/* Destroys the validator widget.
		```
			$(".selector").igValidator("destroy");
		```
		*/
		if (!this.options.fields) {
			this._cleanupField(this.options);
		} else {
			for (var i = 0; i < this.options.fields.length; i++) {
				this._cleanupField(this.options.fields[ i ]);
			}
		}
		this._detachFromForm();
		$.Widget.prototype.destroy.apply(this, arguments);
	}
});
$.extend($.ui.igValidator, { version: "<build_number>" });

/* Global defaults used by igValidator. If appication change them, then all igValidators created after that will pickup new defaults. */
$.ui.igValidator.defaults = {
	/* type="bool" Gets/Sets the ability to show all errors on submit.
		Value of false will show an error message only for the first failed target.
		Default value is true. */
	showAllErrorsOnSubmit: true,
	/* type="string" Default decimal separator (".") to use when no explicit number option property is defined */
	decimalSeparator: ".",
	/* type="string" Default decimal thousands (",") to use when no explicit number option property is defined */
	thousandsSeparator: ",",
	/* type="object" Default email checking RegExp object */
	emailRegEx: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
};

/* Base class used by all validator rules */
$.ig.igValidatorBaseRule = $.ig.igValidatorBaseRule || Class.extend({
	/* type="string" The name of the rule matching the respective option name */
	name: "base",
	/* type="array" Items produced and stored during validation, to be used for message formatting before next validation call */
	formatItems: [],
	/*jshint unused: false*/
	getMessageType: function (options) {
		/* Gets the error message type to get from locale settings (matching as "<type>Message>"). Returns the rule name by default.
			Only used when there's no errorMessage option available through getRuleMessage.
			returnType="string" Returns the locale message type to show on error.
		*/
		return this.name;
	},
	/*jshint unused: true*/
	getRuleMessage: function (options) {
		/* Gets an errorMessage from either the rule or field/global options.
			returnType="string" Returns an error message from options or empty string.
		*/
		if (options[ this.name ].errorMessage) {
			return options[ this.name ].errorMessage;
		} else if (options.errorMessage) {
			return options.errorMessage;
		}
		return "";
	},
	formatMessage: function (message) {
		/* Formats an error message using rule-specific values (usually from formatItems).
			paramType="string" optional="false" The unformatted error message the validator intends to display.
			returnType="string" Formatted error message ready to be shown.
		*/
		for (var i = 0; i < this.formatItems.length; i++) {
			message = message.replace("{" + i + "}", this.formatItems[ i ]);
		}
		return message;
	},
	/*jshint unused: false*/
	/* istanbul ignore next */
	isValid: function(options, value) {
		/* Validates a value against this rule and returns the result.
			paramType="object" optional="false" Options for the validator, if fields are used this parameter is already populated with inherited ones.
			paramType="object" optional="false" The value to check.
			returnType="bool" Bool value determining if the value is valid for this rule.
		*/
		return true;
	},
	/*jshint unused: true*/
	init: function (validator) {
		/* Initializes a new instance of the validator rule. Used once per igValidator.
			paramType="object" optional="false" Rule receives a reference to the owner igValidator widget.
		*/
		this.validator = validator;
	}
});

$.ig.igValidatorRequiredRule = $.ig.igValidatorRequiredRule || $.ig.igValidatorBaseRule.extend({
	name: "required",
	groupTypes: [ "checkboxrange", "radio", "select", "selectrange" ],
	groupMessageName: "select",
	getMessageType: function (options) {
		if ($.inArray(options._type, this.groupTypes) > -1) {
			return this.groupMessageName;
		} else {
			return this.name;
		}
	},
	isValid: function(options, value) {
		// 0 needs to be valid for required fields, but not false for checkbox/select
		var internalValue = !isNaN(parseFloat(value)) ? value.toString() : value;
		if (!internalValue || value.length === 0) {
			return false;
		}
		return true;
	}
});

$.ig.igValidatorControlRule = $.ig.igValidatorControlRule || $.ig.igValidatorBaseRule.extend({
	name: "control",
	getMessageType: function (/* options */) {
		return "default";
	},
	getRuleMessage: function (options) {
		/* returns an error message for the rule from options */
		return options.errorMessage ||
			options._control._currentMessage || "";
	},
	isValid: function(options /*, value*/) {
		if (options._control && typeof options._control.isValid === "function") {
			return options._control.isValid();
		}
		return true;
	}
});

$.ig.igValidatorNumberRule = $.ig.igValidatorNumberRule || $.ig.igValidatorBaseRule.extend({
	name: "number",
	_isNumber: function (options, value) {
		if (typeof value === "number") {
			return true;
		} else if (typeof value === "string") {
			return this._parseNumber(value, options) !== null;
		}
		return false;
	},
	_parseNumber: function (value, options) {
		/* returns the parsed number or null */
		if (typeof value === "number") {
			return value;
		}
		var decimalSeparator = options.number && options.number.decimalSeparator,
			thousandsSeparator = options.number && options.number.thousandsSeparator,
			thousandsRegEx, result;

		decimalSeparator = decimalSeparator || $.ui.igValidator.defaults.decimalSeparator;
		thousandsSeparator = thousandsSeparator || $.ui.igValidator.defaults.thousandsSeparator;
		thousandsRegEx = new RegExp("\\" + thousandsSeparator, "g");

		// split decimals so thousandsSeparator can be removed only from the integer part
		// this ensures strings like "2,445.1,454" are not valid
		value = value.split(decimalSeparator);

		// strip thousands separator(s)
		value[ 0 ] = value[ 0 ].replace(thousandsRegEx, "");

		result = value.join(".");

		if (result.length && !isNaN(result)) { // isNaN will accept "" as 0
			return parseFloat(result);
		}
		return null;
	},
	isValid: function(options, value) {
		var internalValue = "" + value; // implicit toString() for 0s
		if (internalValue) {
			return this._isNumber(options, value);
		}
		return true;
	}
});

$.ig.igValidatorDateRule = $.ig.igValidatorDateRule || $.ig.igValidatorBaseRule.extend({
	name: "date",
	isValid: function(options, value) {
		return value instanceof Date || !isNaN(new Date(value).getSeconds());
	}
});

$.ig.igValidatorLengthRule = $.ig.igValidatorLengthRule || $.ig.igValidatorBaseRule.extend({
	name: "lengthRange",
	_lastMessageType: "rangeLength",
	getMessageType: function (/* options */) {
		return this._lastMessageType;
	},
	isValid: function(options, value) {
		if (value && value.length) {
			var min, max,
				messageSuffix = value.push ? "Select" : "Length",
				minLength = options.lengthRange.push ? options.lengthRange[ 0 ] : options.lengthRange.min,
				maxLength = options.lengthRange.push ? options.lengthRange[ 1 ] : options.lengthRange.max;

			min = minLength && value.length < minLength;
			max = maxLength && value.length > maxLength;

			if (minLength && maxLength && (min || max)) {
				// range message
				this._lastMessageType =  "range" + messageSuffix;
				this.formatItems = [ minLength, maxLength ];
			} else if (min) {
				this._lastMessageType = "min" + messageSuffix;
				this.formatItems = [ minLength ];
			} else if (max) {
				this._lastMessageType = "max" + messageSuffix;
				this.formatItems = [ maxLength ];
			}

			if (min || max) {
				return false;
			}
		}
		return true;
	}
});

$.ig.igValidatorValueRule = $.ig.igValidatorValueRule || $.ig.igValidatorNumberRule.extend({
	name: "valueRange",
	_lastMessageType: "rangeValue",
	getMessageType: function (/* options */) {
		return this._lastMessageType;
	},
	isValid: function(options, value) {
		var min = false, max = false, //error flags
			minValue, maxValue, hasMin, hasMax,
			isNumber = this._isNumber(options, value),
			isDateParsable = !isNaN(new Date(value).getSeconds());

		if (!isDateParsable && !isNumber) {
			//can't be handled by this rule
			return true;
		}
		minValue = options.valueRange.push ? options.valueRange[ 0 ] : options.valueRange.min;
		maxValue = options.valueRange.push ? options.valueRange[ 1 ] : options.valueRange.max;

		// must be type checked, 0 should be valid
		hasMin = typeof minValue === "number" || minValue;
		hasMax = typeof maxValue === "number" || maxValue;

		if (!hasMin && !hasMax) {
			//no usable range
			return true;
		}
		if (isNumber && !options.date) {
			value = this._parseNumber(value, options);
			if (hasMin) {
				min = value < minValue;
			}
			if (hasMax) {
				max = value > maxValue;
			}
		} else if (isDateParsable && !options.number) {
			value = new Date(value);
			if (hasMin) {
				minValue = new Date(minValue);
				min = value < minValue;
				minValue = minValue.toLocaleString();
			}
			if (hasMax) {
				maxValue = new Date(maxValue);
				max = value > maxValue;
				maxValue = maxValue.toLocaleString();
			}
		}

		if (hasMin && hasMax && (min || max)) {
			// range message
			this._lastMessageType = "rangeValue";
			this.formatItems = [ minValue, maxValue ];
		} else if (min) {
			this._lastMessageType = "minValue";
			this.formatItems = [ minValue ];
		} else if (max) {
			this._lastMessageType = "maxValue";
			this.formatItems = [ maxValue ];
		}

		return !(min || max);
	}
});

$.ig.igValidatorEqualToRule = $.ig.igValidatorEqualToRule || $.ig.igValidatorBaseRule.extend({
	name: "equalTo",
	isValid: function(options, value) {
		var selector = options.equalTo.selector || options.equalTo,
			targetValue = this.validator._getTargetValue({
				_control: this.validator._getEditor($(selector)),
				selector: selector
			});
		if ($.ig.util.compare(value, targetValue)) {
			return false;
		}
		return true;
	}
});

$.ig.igValidatorEmailRule = $.ig.igValidatorEmailRule || $.ig.igValidatorBaseRule.extend({
	name: "email",
	isValid: function(options, value) {
		return $.ui.igValidator.defaults.emailRegEx.test(value);
	}
});

$.ig.igValidatorPatternRule = $.ig.igValidatorPatternRule || $.ig.igValidatorBaseRule.extend({
	name: "pattern",
	isValid: function(options, value) {
		// D.P. 22th Dec 2015 Bug 211530: Misspelled "expression" in pattern option, keeping both versions per customer request
		var regEx = options.pattern.expresion || options.pattern.expression || options.pattern;
		regEx = regEx.test ? regEx : new RegExp(regEx.toString());

		return regEx.test(value);
	}
});

$.ig.igValidatorCustomRule = $.ig.igValidatorCustomRule || $.ig.igValidatorBaseRule.extend({
	name: "custom",
	getMessageType: function (/* options */) {
		return "default";
	},
	isValid: function(options, value) {
		var fieldOptions = options === this.validator.options ? null : options,
			func = options.custom.method || options.custom;

		if (typeof func === "string" && typeof window[ func ] === "function") {
			func = window[ func ];
		}
		if (typeof func === "function" && !func.apply(this.validator, [ value, fieldOptions ])) {
			return false;
		}
		return true;
	}
});

$.ig.igValidatorCreditCardRule = $.ig.igValidatorCreditCardRule || $.ig.igValidatorBaseRule.extend({
	name: "creditCard",
	isValid: function(options, value) {
		/* Based on ASP.NET CreditCardAttribute check,
			https://github.com/Microsoft/referencesource/blob/master/System.ComponentModel.DataAnnotations/DataAnnotations/CreditCardAttribute.cs
		   using Luhn algorithm https://en.wikipedia.org/wiki/Luhn_algorithm */
		var val = value && "" + value,
			evenDigit = false,
			checksum = 0;

		if (val) {
			val = val.replace(/-/g, "");
            val = val.replace(/ /g, "");
			val =  val.reverse();

			for (var i = 0; i < val.length; i++) {
                if (!$.ig.String.prototype.isDigit(val[ i ])) {
                    return false;
                }

                var digitValue = (+val[ i ]) * (evenDigit ? 2 : 1);
                evenDigit = !evenDigit;

				// perform sum where double digit numbers are added as digits (i.e. doubled 8 would add: + 1 + 6 )
                while (digitValue > 0) {
                    checksum += digitValue % 10;

					// only int leftovers:
                    digitValue = Math.floor( digitValue / 10 );
                }
            }

			return (checksum % 10) === 0;
		}
		return true;
	}
});

}));// REMOVE_FROM_COMBINED_FILES
