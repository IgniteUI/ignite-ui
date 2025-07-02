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
			"./infragistics.util.jquery",
			"./infragistics.templating.js"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {

	$.ig = $.ig || {};

	$.extend($.ig, {
		_tokenizeDirectives: function (template) {
		    var tmpl = 'var result = "";', tokens = $.ig.regExp.block.exec(template), temp;

			// Begin handling of directives tokenization
			if (template.indexOf(tokens[ 0 ]) > 0 || template.length !== tokens[ 0 ].length) {
				temp = template.split(tokens[ 0 ]);
				if (temp[ 0 ] && temp[ 0 ].length > 0) {
					$.ig.args.push(temp[ 0 ]);
					tmpl += "result += args[" + this.i++ + "];";
				}
			}
			tmpl += this._handleCompleteBlock(tokens);
			if (temp && temp.length > 0 && temp[ 1 ].length > 0) {
				$.ig.args.push(temp[ 1 ]);
				tmpl += "result += args[" + this.i++ + "];";
			}
			tmpl += "return result;";

			// Stack population is complete
			return tmpl;
		},
		_handleCompleteBlock: function (tokens) {
		    var tmpl = tokens[ 0 ], template = "", blocks = [ ], i, temp;

			// Remove the start and end tokens of the completed block
		    tmpl = tmpl.replace("{{" + tokens[ 1 ], $.ig._directives[ tokens[ 1 ] ].start);

			// K.D. July 4th, 2013 Bug #146297 Adding logic to handle sequential {{each}}
			if (tokens[ 1 ] === "each") {
				blocks.push(tokens[ 0 ].split(tokens[ 3 ]));
				blocks.push(tokens[ 2 ].split(tokens[ 3 ]));
				for (i = 0; i < blocks[ 1 ].length; i++) {
					if (blocks[ 0 ][ i ].indexOf("{{each") > 0) {
						temp = blocks[ 0 ][ i ].split("{{each")[ 0 ];
						$.ig.args.push(temp);
						template += "result += args[" + $.ig.i++ + "];";
						blocks[ 0 ][ i ] = blocks[ 0 ][ i ].substr(blocks[ 0 ][ i ].indexOf("{{each"));
						temp = $.ig.regExp.blockDirective.exec(blocks[ 1 ][ i ]);
						blocks[ 1 ][ i ] = blocks[ 1 ][ i ].substr(blocks[ 1 ][ i ].
                        indexOf(temp[ 0 ]) + temp[ 0 ].length);
					}
					blocks[ 0 ][ i ] = blocks[ 0 ][ i ].
                    replace("{{" + tokens[ 1 ], $.ig._directives[ tokens[ 1 ] ].start);
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
			var tmpl = template, eachVar, body, forSub, sub, expr;
			eachVar = $.ig.regExp.sub.exec(tmpl);
			tmpl = tmpl.replace(eachVar[ 0 ], "");
			tmpl = tmpl.replace("$data", eachVar[ 0 ]);
			body = tokens[ 2 ];
			if (/\$data/.test(body)) {
				body = body.replace(/\$data/g, '" + ' + eachVar[ 0 ] + '[ i ] + "');
				$.ig.args.push(eachVar[ 0 ]);
				$.ig.i++;
			}
			forSub = $.ig.regExp.forSub.exec(body);
			while (forSub) {
			    body = body.replace(new RegExp("\\$\\{" + forSub[ 1 ] + "\\}", "g"), '" + ' +
                eachVar[ 0 ] + "[ i ]" + forSub[ 1 ].substr(forSub[ 1 ].indexOf(".")) + ' + "');
				forSub = $.ig.regExp.forSub.exec(body);
			}
			body = body.replace(/\$index/g, '" + i + "');
			tmpl = tmpl.replace(tokens[ 2 ], 'result += "' + body + '"');
			tmpl = tmpl.replace(/\}\}/, $.ig._directives[ tokens[ 1 ] ].close);
			tmpl = tmpl.replace(tokens[ 3 ], $.ig._directives[ tokens[ 1 ] ].end);

			// Parse the contents of the block
			// Put all data members on the stack
			sub = $.ig.regExp.sub.exec(tmpl);
			while (sub) {
				expr = new RegExp("\\$\\{" + sub[ 1 ] + "\\}", "g");
				tmpl = tmpl.replace(expr, "args[" + $.ig.i++ + "]");
				$.ig.args.push(sub[ 0 ]);
				sub = $.ig.regExp.sub.exec(tmpl);
			}
			return tmpl;
		},
		_handleIfElse: function (template, tokens) {
		    var tmpl = template, i = 0, htmlStrings, sub, inner, index, tmplArr = [ ];

			// Remove the start and end tokens of the completed block
			tmpl = tmpl.replace(/\}\}/, $.ig._directives[ tokens[ 1 ] ].close);
			index = tmpl.lastIndexOf(tokens[ 3 ]);
			tmpl = tmpl.substr(0, index) + tmpl.slice(index + tokens[ 3 ].length - 1);

			// Check for a nested blocks and recursively handle them
			if ($.ig.regExp.block.test(tmpl)) {
				inner = $.ig.regExp.block.exec(tmpl);
				tmpl = tmpl.replace(inner[ 0 ], this._handleCompleteBlock(inner));
			}

			// Parse the contents of the block
			htmlStrings = tokens[ 2 ].split(this.regExp.blockDirective);

			// We need to make sure that we"re not replacing a substitute inside the if condition with result +=...
			tmplArr.push(tmpl.slice(0, tmpl.indexOf(") {") + 3));
			tmplArr.push(tmpl.slice(tmpl.indexOf(") {") + 3));
			for (i; i < htmlStrings.length; i++) {
				if (htmlStrings[ i ] && htmlStrings[ i ].length && htmlStrings[ i ].length > 0) {
					tmplArr[ 1 ] = tmplArr[ 1 ].replace(htmlStrings[ i ], "result += args[" + $.ig.i++ + "];");
					$.ig.args.push(htmlStrings[ i ]);
				}
			}
			tmpl = tmplArr.join("");

			// End Parse
			// Parse block continuations such as {{else}}
			tokens = $.ig.regExp.blockCont.exec(tmpl);
			while (tokens) {
				tmpl = tmpl.replace("{{" + tokens[ 1 ], $.ig._directives[ tokens[ 1 ] ].start);
				tmpl = tmpl.replace(/\}\}/, $.ig._directives[ tokens[ 1 ] ].close);
				tokens = $.ig.regExp.blockCont.exec(tmpl);
			}

			// Put all data members on the stack as well
			sub = $.ig.regExp.sub.exec(tmpl);
			while (sub) {
				tmpl = tmpl.replace(new RegExp("\\$\\{" + sub[ 1 ] + "\\}", "g"), "args[" + $.ig.i++ + "]");
				$.ig.args.push(sub[ 0 ]);
				sub = $.ig.regExp.sub.exec(tmpl);
			}

			// Stack population is complete
			return tmpl;
		},
		_compileTemplate: function (template, data) {
			var i, j, k, result = "", temp, tempArgs = [ ], arg = "", f;
			if ($.ig.util.getType(data) !== "array") {
				for (j = 0; j < $.ig.args.length; j++) {
					arg = $.ig.args[ j ];
					for (i = 0; i < $.ig.tokens.length; i++) {
						if (arg === $.ig.tokens[ i ][ 0 ]) {
							arg = $.ig._getArgumentValue(data, $.ig.tokens[ i ], arg);
							break;
						} else if (typeof arg === "string") {
							arg = $.ig._populateArgumentValue(data, $.ig.tokens[ i ], arg);
						}
					}
					if (arg === undefined) {
						throw new Error($.ig._getLocaleString("undefinedArgument") + $.ig.tokens[ i ][ 0 ]);
					}
					if (typeof arg === "string") {
						arg = arg.replace($.ig.regExp.index, 0);
					}
					tempArgs.push(arg);
				}
				template = template.replace(/\$i/g, 0);
				/*jshint -W054 */
				result = new Function("args", template).call(this, tempArgs) || "";
			} else {
				temp = template.replace($.ig.regExp.index, "args[" + $.ig.args.length + "]");
				f = new Function("args", temp);
				/*jshint +W054 */
				for (j = 0; j < data.length; j++) {
					tempArgs = [ ];
					for (k = 0; k < $.ig.args.length; k++) {
						arg = $.ig.args[ k ];
						for (i = 0; i < $.ig.tokens.length; i++) {
							if (arg === $.ig.tokens[ i ][ 0 ]) {
								arg = $.ig._getArgumentValue(data[ j ], $.ig.tokens[ i ], arg);
								break;
							} else if (typeof arg === "string") {
								arg = $.ig._populateArgumentValue(data[ j ], $.ig.tokens[ i ], arg);
							}
						}
						if (arg === undefined) {
							throw new Error($.ig._getLocaleString("undefinedArgument") + $.ig.tokens[ i ][ 0 ]);
						}
						if (typeof arg === "string") {
							arg = arg.replace($.ig.regExp.index, j);
						}
						tempArgs.push(arg);
					}
					tempArgs.push(j);
					result += f.call(this, tempArgs) || "";
				}
			}
			return result;
		}
	});

}));// REMOVE_FROM_COMBINED_FILES
