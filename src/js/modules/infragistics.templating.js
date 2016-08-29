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
 *	jquery-1.9.1.js
 */

 /*
	1. comment RegExp matches comments in the template string in the form # My comment #.
		Unterminated comments would not be matched
	2. sub (substitute) RegExp matches templated data items to be replaced in the form of ${DataItem}.
	3. block RegExp matches terminated block statements
		e.g. {{if condition}} do something {{else}} do something else {{/if}}
		limitation: Regular expressions are equivalent to finite automatons as described by theory of computation and more precisely the formal languages and automata computability theory. This means that they are limited to recognizing languages of the type AB^nC but noy languages of the type [AB]^n which are recognized by context-free grammars (Regular expressions are still a subset of context-free grammars). However the A^nB^n is recognized due to the fact that we can use greedy regular expressions allowing us to match the last existing token of a type. Thus nested if-statements would not be recognized without stack-tokenizing the block statement.
 */

/*global define, jQuery */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./infragistics.util",
			"./i18n/infragistics.templating-en"
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
			    tmpl = tmpl.replace(this.regExp.lineBreak, "");

				// Removing comments
				tmpl = tmpl.replace(this.regExp.comment, "");
				if (typeof data === "function") {
					if (args) {
						data = data.apply(this, args);
					} else {
						data = data.call();
					}
				}
				if (this._internalTmplCache && this._internalTmplCache.hasOwnProperty(tmpl)) {
					this.tokens = this._internalTmplCache[ tmpl ].tokens;
					this.args = this._internalTmplCache[ tmpl ].args;
					this.i = this._internalTmplCache[ tmpl ].i;
					this._hasBlock = this._internalTmplCache[ tmpl ]._hasBlock;
					tmpl = this._internalTmplCache[ tmpl ].tmpl;
				} else {
					this.tokens = [ ];
					this.args = [ ];
					this.i = 0;
					this._tokenizeTemplate(tmpl);
					cacheConst = tmpl;
					this._internalTmplCache[ cacheConst ] = {};
					this._internalTmplCache[ cacheConst ].tokens = this.tokens;
					if (this.regExp.block.test(tmpl)) {
						this._hasBlock = true;
						tmpl = this._tokenizeDirectives(tmpl);
					} else {
						this._hasBlock = false;
					}
					this._internalTmplCache[ cacheConst ].args = this.args;
					this._internalTmplCache[ cacheConst ].i = this.i;
					this._internalTmplCache[ cacheConst ]._hasBlock = this._hasBlock;
					this._internalTmplCache[ cacheConst ].tmpl = tmpl;
				}
				if (!this.tokens.length) {

					// Nothing got tokenized
					return tmpl;// An exception can be thrown here
				}
				if (this._hasBlock) {
					tmpl = this._compileTemplate(tmpl, data);
				} else {
					tmpl = this._populateTemplate(tmpl, data);
				}
				delete this.args;
				delete this.tokens;
				delete this._hasBlock;
				delete this.i;
			}
			return tmpl;
		},
		clearTmplCache: function () {
			delete this._internalTmplCache;
			this._internalTmplCache = {};
		},
		encode: function (value) {
			/* Encoding < > ' and "
				paramType="string" The string to be encoded.
				returnType="string" Returns the encoded string.
			 */
		    return value !== null && value !== undefined ?
            value.toString().replace(this.regExp.lt, "&lt;").replace(this.regExp.gt, "&gt;").
            replace(this.regExp.ap, "&#39;").replace(this.regExp.ic, "&#34;") : "";
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
			sub: /\$\{(([\w\$\-]+(\.|\s)?[\w\$\-]*)+)\}/,
			/* type="RegExp" Matches any substitution element in the template that is to be rendered as it is
				Use $.ig.regExp.sub.exec(tmpl) in order to get the substitution element in the tmpl string
			*/
			nonEncodeSub: /\{\{html\s+([\w\$\-]+(\.|\s)?[\w\$\-]*)+\}\}/,
			forSub: /\$\{(([\w\$]+\.[\w\$]*)+)\}/,
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
			ic: /"/g
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
			if (this.regExp.sub.test(template)) {
				tempToken = this.regExp.sub.exec(template);
				while (tempToken !== null) {
				    splitName = tempToken[ 1 ].split(".");

					// K.D. September 25th, 2012 Bug #122463 The property can contain $ in its name.
					template = template.replace(new RegExp("\\$\\{" + tempToken[ 1 ].replace(/\$/g, "\\$") + "\\}", "g"), "");
					tempToken[ 3 ] = new RegExp("\\$\\{" + tempToken[ 1 ].replace(/\$/g, "\\$")  + "\\}", "g");
					tempToken[ 1 ] = splitName;
					tempToken[ 2 ] = true;
					this.tokens.push(tempToken);
					tempToken = this.regExp.sub.exec(template);
				}
			}
			if (this.regExp.nonEncodeSub.test(template)) {
				tempToken = this.regExp.nonEncodeSub.exec(template);
				while (tempToken !== null) {
				    splitName = tempToken[ 1 ].split(".");

					// K.D. September 25th, 2012 Bug #122463 The property can contain $ in its name.
					template = template.replace(new RegExp("\\{\\{html\\s+" + tempToken[ 1 ].replace(/\$/g, "\\$") + "\\}\\}", "g"), "");
					tempToken[ 3 ] = new RegExp("\\{\\{html\\s+" + tempToken[ 1 ].replace(/\$/g, "\\$") + "\\}\\}", "g");
					tempToken[ 1 ] = splitName;
					tempToken[ 2 ] = false;
					this.tokens.push(tempToken);
					tempToken = this.regExp.nonEncodeSub.exec(template);
				}
			}
		},
		_tokenizeDirectives: function (template) {
		    var tmpl = 'var result = "";', tokens = this.regExp.block.exec(template), temp;

			// Begin handling of directives tokenization
			if (template.indexOf(tokens[ 0 ]) > 0 || template.length !== tokens[ 0 ].length) {
				temp = template.split(tokens[ 0 ]);
				if (temp[ 0 ] && temp[ 0 ].length > 0) {
					this.args.push(temp[ 0 ]);
					tmpl += "result += args[" + this.i++ + "];";
				}
			}
			tmpl += this._handleCompleteBlock(tokens);
			if (temp && temp.length > 0 && temp[ 1 ].length > 0) {
				this.args.push(temp[ 1 ]);
				tmpl += "result += args[" + this.i++ + "];";
			}
			tmpl += "return result;";

			// Stack population is complete
			return tmpl;
		},
		_handleCompleteBlock: function (tokens) {
		    var tmpl = tokens[ 0 ], template = "", blocks = [ ], i, temp;

			// Remove the start and end tokens of the completed block
		    tmpl = tmpl.replace("{{" + tokens[ 1 ], this._directives[ tokens[ 1 ] ].start);

			// K.D. July 4th, 2013 Bug #146297 Adding logic to handle sequential {{each}}
			if (tokens[ 1 ] === "each") {
				blocks.push(tokens[ 0 ].split(tokens[ 3 ]));
				blocks.push(tokens[ 2 ].split(tokens[ 3 ]));
				for (i = 0; i < blocks[ 1 ].length; i++) {
					if (blocks[ 0 ][ i ].indexOf("{{each") > 0) {
						temp = blocks[ 0 ][ i ].split("{{each")[ 0 ];
						this.args.push(temp);
						template += "result += args[" + this.i++ + "];";
						blocks[ 0 ][ i ] = blocks[ 0 ][ i ].substr(blocks[ 0 ][ i ].indexOf("{{each"));
						temp = this.regExp.blockDirective.exec(blocks[ 1 ][ i ]);
						blocks[ 1 ][ i ] = blocks[ 1 ][ i ].substr(blocks[ 1 ][ i ].
                        indexOf(temp[ 0 ]) + temp[ 0 ].length);
					}
					blocks[ 0 ][ i ] = blocks[ 0 ][ i ].
                    replace("{{" + tokens[ 1 ], this._directives[ tokens[ 1 ] ].start);
					template += this._handleEach(blocks[ 0 ][ i ] + "{{/each}}", [
						blocks[ 0 ][ i ] + "{{/each}}",
						"each",
						blocks[ 1 ][ i ],
						"{{/each}}"
					]);
				}
			} else if (tokens[ 1 ] === "if") {
				template += this._handleIfElse(tmpl, tokens);
			}
			return template;
		},
		_handleEach: function (template, tokens) {
			var tmpl = template, eachVar, body, forSub, sub, expr, inner;
			eachVar = this.regExp.sub.exec(tmpl);
			tmpl = tmpl.replace(eachVar[ 0 ], "");
			tmpl = tmpl.replace("$data", eachVar[ 0 ]);
			body = tokens[ 2 ];
			if (/\$data/.test(body)) {
				body = body.replace(/\$data/g, '" + ' + eachVar[ 0 ] + '[ i ] + "');
				this.args.push(eachVar[ 0 ]);
				this.i++;
			}
			forSub = this.regExp.forSub.exec(body);
			while (forSub) {
			    body = body.replace(new RegExp("\\$\\{" + forSub[ 1 ] + "\\}", "g"), '" + ' +
                eachVar[ 0 ] + "[ i ]" + forSub[ 1 ].substr(forSub[ 1 ].indexOf(".")) + ' + "');
				forSub = this.regExp.forSub.exec(body);
			}
			body = body.replace(/\$index/g, '" + i + "');
			tmpl = tmpl.replace(tokens[ 2 ], 'result += "' + body + '"');
			tmpl = tmpl.replace(/\}\}/, this._directives[ tokens[ 1 ] ].close);
			tmpl = tmpl.replace(tokens[ 3 ], this._directives[ tokens[ 1 ] ].end);

			// Check for a nested blocks and recursively handle them
			if (this.regExp.block.test(tmpl)) {
				inner = this.regExp.block.exec(tmpl);
				tmpl = tmpl.replace(inner[ 0 ], this._handleCompleteBlock(inner));
			}

			// Parse the contents of the block
			// Put all data members on the stack
			sub = this.regExp.sub.exec(tmpl);
			while (sub) {
				expr = new RegExp("\\$\\{" + sub[ 1 ] + "\\}", "g");
				tmpl = tmpl.replace(expr, "args[" + this.i++ + "]");
				this.args.push(sub[ 0 ]);
				sub = this.regExp.sub.exec(tmpl);
			}
			return tmpl;
		},
		_handleIfElse: function (template, tokens) {
		    var tmpl = template, i = 0, htmlStrings, sub, inner, index, tmplArr = [ ];

			// Remove the start and end tokens of the completed block
			tmpl = tmpl.replace(/\}\}/, this._directives[ tokens[ 1 ] ].close);
			index = tmpl.lastIndexOf(tokens[ 3 ]);
			tmpl = tmpl.substr(0, index) + tmpl.slice(index + tokens[ 3 ].length - 1);

			// Check for a nested blocks and recursively handle them
			if (this.regExp.block.test(tmpl)) {
				inner = this.regExp.block.exec(tmpl);
				tmpl = tmpl.replace(inner[ 0 ], this._handleCompleteBlock(inner));
			}

			// Parse the contents of the block
			htmlStrings = tokens[ 2 ].split(this.regExp.blockDirective);

			// We need to make sure that we"re not replacing a substitute inside the if condition with result +=...
			tmplArr.push(tmpl.slice(0, tmpl.indexOf(") {") + 3));
			tmplArr.push(tmpl.slice(tmpl.indexOf(") {") + 3));
			for (i; i < htmlStrings.length; i++) {
				if (htmlStrings[ i ] && htmlStrings[ i ].length && htmlStrings[ i ].length > 0) {
					tmplArr[ 1 ] = tmplArr[ 1 ].replace(htmlStrings[ i ], "result += args[" + this.i++ + "];");
					this.args.push(htmlStrings[ i ]);
				}
			}
			tmpl = tmplArr.join("");

			// End Parse
			// Parse block continuations such as {{else}}
			tokens = this.regExp.blockCont.exec(tmpl);
			while (tokens) {
				tmpl = tmpl.replace("{{" + tokens[ 1 ], this._directives[ tokens[ 1 ] ].start);
				tmpl = tmpl.replace(/\}\}/, this._directives[ tokens[ 1 ] ].close);
				tokens = this.regExp.blockCont.exec(tmpl);
			}

			// Put all data members on the stack as well
			sub = this.regExp.sub.exec(tmpl);
			while (sub) {
				tmpl = tmpl.replace(new RegExp("\\$\\{" + sub[ 1 ] + "\\}", "g"), "args[" + this.i++ + "]");
				this.args.push(sub[ 0 ]);
				sub = this.regExp.sub.exec(tmpl);
			}

			// Stack population is complete
			return tmpl;
		},
		_populateTemplate: function (template, data) {
			var i, j, result = "", temp;
			if ($.type(data) !== "array") {
				for (i = 0; i < this.tokens.length; i++) {
					template = this._populateArgumentValue(data, this.tokens[ i ], template);
				}
				result = template;
			} else {
				for (j = 0; j < data.length; j++) {
					temp = template;
					for (i = 0; i < this.tokens.length; i++) {
						temp = this._populateArgumentValue(data[ j ], this.tokens[ i ], temp);
					}
					temp = temp.replace(this.regExp.index, j);
					result += temp;
				}
			}
			return result;
		},
		_compileTemplate: function (template, data) {
			var i, j, k, result = "", temp, tempArgs = [ ], arg = "", f;
			if ($.type(data) !== "array") {
				for (j = 0; j < this.args.length; j++) {
					arg = this.args[ j ];
					for (i = 0; i < this.tokens.length; i++) {
						if (arg === this.tokens[ i ][ 0 ]) {
							arg = this._getArgumentValue(data, this.tokens[ i ], arg);
							break;
						} else if (typeof arg === "string") {
							arg = this._populateArgumentValue(data, this.tokens[ i ], arg);
						}
					}
					if (arg === undefined) {
						throw new Error($.ig.Templating.locale.undefinedArgument + this.tokens[ i ][ 0 ]);
					}
					if (typeof arg === "string") {
						arg = arg.replace(this.regExp.index, 0);
					}
					tempArgs.push(arg);
				}
				template = template.replace(/\$i/g, 0);
				/*jshint -W054 */
				result = new Function("args", template).call(this, tempArgs) || "";
			} else {
				temp = template.replace(this.regExp.index, "args[" + this.args.length + "]");
				f = new Function("args", temp);
				/*jshint +W054 */
				for (j = 0; j < data.length; j++) {
					tempArgs = [ ];
					for (k = 0; k < this.args.length; k++) {
						arg = this.args[ k ];
						for (i = 0; i < this.tokens.length; i++) {
							if (arg === this.tokens[ i ][ 0 ]) {
								arg = this._getArgumentValue(data[ j ], this.tokens[ i ], arg);
								break;
							} else if (typeof arg === "string") {
								arg = this._populateArgumentValue(data[ j ], this.tokens[ i ], arg);
							}
						}
						if (arg === undefined) {
							throw new Error($.ig.Templating.locale.undefinedArgument + this.tokens[ i ][ 0 ]);
						}
						if (typeof arg === "string") {
							arg = arg.replace(this.regExp.index, j);
						}
						tempArgs.push(arg);
					}
					tempArgs.push(j);
					result += f.call(this, tempArgs) || "";
				}
			}
			return result;
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
					arg = this.encode(tempData);
				} else {
					arg = tempData;
				}
			} else {
				if (token[ 2 ] && typeof data[ token[ 1 ] ] === "string") {
					arg = this.encode(data[ token[ 1 ] ]);
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

}));
