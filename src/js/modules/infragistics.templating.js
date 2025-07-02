/*!@license
 * Infragistics.Web.ClientUI Templating Engine <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * Engine used for data templating
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery.js
 *  infragistics.util.jquery.js
 */

 /*
	1. comment RegExp matches comments in the template string in the form # My comment #.
		Unterminated comments would not be matched
	2. sub (substitute) RegExp matches templated data items to be replaced in the form of ${DataItem}.
	3. block RegExp matches terminated block statements
		e.g. {{if condition}} do something {{else}} do something else {{/if}}
		limitation: Regular expressions are equivalent to finite automatons as described by theory of computation and more precisely the formal languages and automata computability theory. This means that they are limited to recognizing languages of the type AB^nC but noy languages of the type [AB]^n which are recognized by context-free grammars (Regular expressions are still a subset of context-free grammars). However the A^nB^n is recognized due to the fact that we can use greedy regular expressions allowing us to match the last existing token of a type. Thus nested if-statements would not be recognized without stack-tokenizing the block statement.
 */
"use strict";
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./infragistics.util",
			"./infragistics.util.jquery"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {

	$.ig = $.ig || {};

	$.extend($.ig, {
	/* pluginName="igTemplating" */
		tmpl: function (template, data, args) {
			/*  Populates the given template with the provided data. If data is a function that requires arguments, the arguments need to be provided as an array following the data. tmpl(template, data[, args])
				paramType="string" optional="false" Specifies the template string
				paramType="object|array|function" optional="false" Specifies the data to be templated in the template. If function is provided, then it has to be object or array returning function, possible receiving arguments array which can be specified as the third parameter
				paramType="array" optional="true" If function is provided as the second parameter, then this parameter is the arguments for the function.
				returnType="string" Returns the templated data as a string. Returns the original template if nothing is to be templated. */
		    var tmpl = template, cacheConst;

			// K.D. May 28th, 2012 Bug #112490 Removing linebreaks in the template before rendering it.
			//D.U. February 28th 2014 Checking if tmpl is initialized
			if (tmpl) {
			    tmpl = tmpl.replace($.ig.regExp.lineBreak, "");

				// Removing comments
				tmpl = tmpl.replace($.ig.regExp.comment, "");
				if (typeof data === "function") {
					if (args) {
						data = data.apply(this, args);
					} else {
						data = data.call();
					}
				}
				if ($.ig._internalTmplCache && $.ig._internalTmplCache.hasOwnProperty(tmpl)) {
					$.ig.tokens = $.ig._internalTmplCache[ tmpl ].tokens;
					$.ig.args = $.ig._internalTmplCache[ tmpl ].args;
					$.ig.i = $.ig._internalTmplCache[ tmpl ].i;
					$.ig._hasBlock = $.ig._internalTmplCache[ tmpl ]._hasBlock;
					tmpl = $.ig._internalTmplCache[ tmpl ].tmpl;
				} else {
					$.ig.tokens = [ ];
					$.ig.args = [ ];
					$.ig.i = 0;
					$.ig._tokenizeTemplate(tmpl);
					cacheConst = tmpl;
					$.ig._internalTmplCache[ cacheConst ] = {};
					$.ig._internalTmplCache[ cacheConst ].tokens = $.ig.tokens;
					if ($.ig.regExp.block.test(tmpl)) {
						$.ig._hasBlock = true;
						if (typeof $.ig._tokenizeDirectives === "function") {
							tmpl = $.ig._tokenizeDirectives(tmpl);
						} else {
							console.warn($.ig._getLocaleString("noAdvancedTemplating"));
						}
					} else {
						$.ig._hasBlock = false;
					}
					$.ig._internalTmplCache[ cacheConst ].args = $.ig.args;
					$.ig._internalTmplCache[ cacheConst ].i = $.ig.i;
					$.ig._internalTmplCache[ cacheConst ]._hasBlock = $.ig._hasBlock;
					$.ig._internalTmplCache[ cacheConst ].tmpl = tmpl;
				}
				if (!$.ig.tokens.length) {

					// Nothing got tokenized
					return tmpl;// An exception can be thrown here
				}
				if ($.ig._hasBlock) {
					if (typeof $.ig._compileTemplate === "function") {
						// K.D. August 27th, 2013 Bug #150299 Using the advanced templating engine
						tmpl = $.ig._compileTemplate(tmpl, data);
					} else {
						console.warn($.ig._getLocaleString("noAdvancedTemplating"));
					}
				} else {
					tmpl = $.ig._populateTemplate(tmpl, data);
				}
				delete $.ig.args;
				delete $.ig.tokens;
				delete $.ig._hasBlock;
				delete $.ig.i;
			}
			return tmpl;
		},
		clearTmplCache: function () {
			delete $.ig._internalTmplCache;
			$.ig._internalTmplCache = {};
		},
		/* type="RegExp" Used to tokenize the template string. */
		regExp: {
			/* type="RegExp" Matches any comment in the template
				Use tmpl.replace($.ig.regExp.comment, "") in order to remove comments from the tmpl string
			*/

			// K.D. August 27th, 2013 Bug #150299 Making the comment to have to be preceded by a white space.
			// This avoids issues with double anchors with href="#"
			comment: /\s#[^#]*#/g,
			/* type="RegExp" Matches any substitution element in the template that is to be encoded before rendering
				Use $.ig.regExp.sub.exec(tmpl) in order to get the substitution element in the tmpl string
			*/
			sub: /\$\{([\w\$\-]+(?:\.[\w\$\-]+|\s[\w\$\-]+)*)\}/,
			/* type="RegExp" Matches any substitution element in the template that is to be rendered as it is
				Use $.ig.regExp.sub.exec(tmpl) in order to get the substitution element in the tmpl string
			*/
			nonEncodeSub: /\{\{html\s+((?:[\w\$-]+)(?:\.(?:[\w\$-]+)|\s(?:[\w\$-]+))*)\}\}/,
			forSub: /\$\{([\w\$]+\.[\w\$]+(?:\.[\w\$]+)*)\}/,
			arg: /args\[\d+\](?!.*\+)/,
			/* type="RegExp" Matches any block directive in the template
				Use $.ig.regExp.block.exec(tmpl) in order to get the block directive in the tmpl string
			*/
			block: /\{\{(\w+).*?\}\}+(.*)(\{\{\/\1\}\})/,
			/* type="RegExp" Matches any continuation inside a block directive in the template
				Use $.ig.regExp.blockCont.exec(tmpl) in order to get the directive within a block in the tmpl string
			*/
			blockCont: /\{\{(?!\/)(\S+)(.*)\}\}(.*)/,
			/* type="RegExp" Matches any continuation inside a block directive in the template
				Use $.ig.regExp.blockCont.exec(tmpl) in order to get the directive within a block in the tmpl string
			*/
			blockDirective: /\{\{\S+.*?\}\}/,
			/* type="RegExp" Matches index substitution $i
				Use $.ig.regExp.index.test(tmpl) in order to test for index variable in the tmpl string
			*/
			index: /\$i/g,
			/* type="RegExp" Matches linebreaks and carriages */
			lineBreak: /(\r\n|\n|\r)/gm,
			/* Characters to encode */
			lt: /</g,
			gt: />/g,
			ap: /'/g,
			ic: /"/g,
			amp: /&/g
		},
		/* Used to compile template directives. */
		_directives: {
			"if": {
				start: "if (",
				close: ") {",
				end: " }"
			},
			"elseif": {
				start: " } else if (",
				close: ") {",
				end: ""
			},
			"else": {
				start: " } else {",
				close: "",
				end: ""
			},
			"each": {
				start: "for (var i = 0; i < $data.length; i++) {",
				close: "",
				end: " }"
			}
		},
		_internalTmplCache: {},
		_tokenizeTemplate: function (template) {
			var tempToken, splitName;
			if ($.ig.regExp.sub.test(template)) {
				tempToken = $.ig.regExp.sub.exec(template);
				while (tempToken !== null) {
				    splitName = tempToken[ 1 ].split(".");

					// K.D. September 25th, 2012 Bug #122463 The property can contain $ in its name.
					tempToken[ 1 ] = tempToken[ 1 ].replace(/\\/g, "\\\\").replace(/\$/g, "\\$");
					template = template.replace(new RegExp("\\$\\{" + tempToken[ 1 ] + "\\}", "g"), "");
					tempToken[ 3 ] = new RegExp("\\$\\{" + tempToken[ 1 ] + "\\}", "g");
					tempToken[ 1 ] = splitName;
					tempToken[ 2 ] = true;
					$.ig.tokens.push(tempToken);
					tempToken = $.ig.regExp.sub.exec(template);
				}
			}
			if ($.ig.regExp.nonEncodeSub.test(template)) {
				tempToken = $.ig.regExp.nonEncodeSub.exec(template);
				while (tempToken !== null) {
				    splitName = tempToken[ 1 ].split(".");

					// K.D. September 25th, 2012 Bug #122463 The property can contain $ in its name.
					tempToken[ 1 ] = tempToken[ 1 ].replace(/\\/g, "\\\\").replace(/\$/g, "\\$");
					template = template.replace(new RegExp("\\{\\{html\\s+" + tempToken[ 1 ] + "\\}\\}", "g"), "");
					tempToken[ 3 ] = new RegExp("\\{\\{html\\s+" + tempToken[ 1 ] + "\\}\\}", "g");
					tempToken[ 1 ] = splitName;
					tempToken[ 2 ] = false;
					$.ig.tokens.push(tempToken);
					tempToken = $.ig.regExp.nonEncodeSub.exec(template);
				}
			}
		},
		_populateTemplate: function (template, data) {
			var i, j, result = "", temp;
			if ($.ig.util.getType(data) !== "array") {
				for (i = 0; i < $.ig.tokens.length; i++) {
					template = $.ig._populateArgumentValue(data, $.ig.tokens[ i ], template);
				}
				result = template;
			} else {
				for (j = 0; j < data.length; j++) {
					temp = template;
					for (i = 0; i < $.ig.tokens.length; i++) {
						temp = $.ig._populateArgumentValue(data[ j ], $.ig.tokens[ i ], temp);
					}
					temp = temp.replace($.ig.regExp.index, j);
					result += temp;
				}
			}
			return result;
		},
		_getLocaleString: function(key) {
			return $.ig.util ?
				$.ig.util.getLocaleValue("Templating", key) :
				$.ig.Templating.locale[key];
		},
		_getArgumentValue: function (data, token, arg) {
			var tempData, l;
			if (token[ 1 ].length && token[ 1 ].length > 1) {
				tempData = data;
				for (l = 0; l < token[ 1 ].length; l++) {

					// K.D. August 14th, 2012 Bug #118861 When a prop is undefined/null we should not try to evaluate a prop
					if (tempData && tempData.hasOwnProperty(token[ 1 ][ l ])) {
						tempData = tempData[ token[ 1 ][ l ] ];
					} else {
						tempData = "";
						break;
					}
				}
				if (token[ 2 ] && typeof tempData === "string") {
					arg = $.ig.encode(tempData);
				} else {
					arg = tempData;
				}
			} else {
				if (token[ 2 ] && typeof data[ token[ 1 ] ] === "string") {
					arg = $.ig.encode(data[ token[ 1 ] ]);
				} else {
					arg = data[ token[ 1 ] ];
				}
			}
			return arg;
		},
		_populateArgumentValue: function (data, token, arg) {
			var tempData, l, self = this;
			if (token[ 1 ].length && token[ 1 ].length > 1) {
				tempData = data;
				for (l = 0; l < token[ 1 ].length; l++) {

					// K.D. August 14th, 2012 Bug #118861 When a prop is undefined we should not try to evaluate a prop
					if (tempData && tempData.hasOwnProperty(token[ 1 ][ l ])) {
					    tempData = typeof tempData[ token[ 1 ][ l ] ] === "function" ?
                        tempData[ token[ 1 ][ l ] ]() : tempData[ token[ 1 ][ l ] ];
					} else {
						tempData = "";
						break;
					}
				}
				if (token[ 2 ] && typeof tempData === "string") {

					// K.D. June 14th, 2012 Bug #114536 Switching to a function to ignore flag parameters
					// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace
					arg = arg.replace(token[ 3 ], function () {
						return self.encode(tempData);
					});
				} else {

					// K.D. June 14th, 2012 Bug #114536 Switching to a function to ignore flag parameters
					// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace
				    arg = arg.replace(token[ 3 ], function () {

						// K.D. May 7th, 2013 Bug #140356 null values are being returned as "null" and should be ""
						return tempData === null ? "" : tempData;
					});
				}
			} else {
			    if (token[ 2 ]) {

					// K.D. June 14th, 2012 Bug #114536 Switching to a function to ignore flag parameters
					// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace
			        arg = arg.replace(token[ 3 ], function () {

                    // K.D. June 25th, 2014 Bug #173722 Handling function types
			            return self.encode(typeof data[ token[ 1 ] ] === "function" ?
                        data[ token[ 1 ] ]() : data[ token[ 1 ] ]);
					});
			    } else {

					// K.D. June 14th, 2012 Bug #114536 Switching to a function to ignore flag parameters
					// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace
			        arg = arg.replace(token[ 3 ], function () {

						// K.D. May 7th, 2013 Bug #140356 null values are being returned as "null" and should be ""
			            return data[ token[ 1 ] ] === null ? "" : typeof data[ token[ 1 ] ] === "function" ?
                        data[ token[ 1 ] ]() : data[ token[ 1 ] ];
					});
				}
			}
			return arg;
		}
	});

}));// REMOVE_FROM_COMBINED_FILES
