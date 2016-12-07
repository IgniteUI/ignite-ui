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
 * jquery-1.9.1.js
 * modernizr.js (Optional)
 * infragistics.util.js
 * infragistics.util.jquery.js
 *
 */
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
            "./infragistics.util",
            "./infragistics.util.jquery"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || { _isNamespace: true };
	window.$ig = window.$ig || $.ig;

	//A CommonJS Promises/A implementation that will be used with jquery versions prior to 1.5
	//that do not have a $.Deferred implementation

	// String to Object flags format cache
	$.ig.util.jqueryFlagsCache = {};

	// Convert String-formatted flags into Object-formatted ones and store in cache
	$.ig.util.jqueryCreateFlags = function (flags) {
		var object = $.ig.util.jqueryFlagsCache[ flags ] = {},
				i, length;
		flags = flags.split(/\s+/);
		for (i = 0, length = flags.length; i < length; i++) {
			object[ flags[ i ] ] = true;
		}
		return object;
	};

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	flags:	an optional list of space-separated flags that will change how
	 *			the callback list behaves
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible flags:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	$.ig.util.jqueryCallbacks = function (flags) {

		// Convert flags from String-formatted to Object-formatted
		// (we check in cache first)
		flags = flags ? ($.ig.util.jqueryFlagsCache[ flags ] ||
			$.ig.util.jqueryCreateFlags(flags)) : {};

		var // Actual Callbacks object
			self,

			// Actual callback list
			list = [],

			// Stack of fire calls for repeatable lists
			stack = [],

			// Last fire value (for non-forgettable lists)
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to know if list is currently firing
			firing,

			// First callback to fire (used internally by add and fireWith)
			firingStart,

			// End of the loop when firing
			firingLength,

			// Index of currently firing callback (modified by remove if needed)
			firingIndex,

			// Add one or several callbacks to the list
			add = function (args) {
				var i,
					length,
					elem,
					type;
				for (i = 0, length = args.length; i < length; i++) {
					elem = args[ i ];
					type = jQuery.type(elem);
					if (type === "array") {

						// Inspect recursively
						add(elem);
					} else if (type === "function") {

						// Add if not in unique mode and callback is not in
						if (!flags.unique || !self.has(elem)) {
							list.push(elem);
						}
					}
				}
			},

			// Fire callbacks
			fire = function (context, args) {
				args = args || [];
				memory = !flags.memory || [ context, args ];
				fired = true;
				firing = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[ firingIndex ].apply(context, args) === false && flags.stopOnFalse) {
						memory = true; // Mark as halted
						break;
					}
				}
				firing = false;
				if (list) {
					if (!flags.once) {
						if (stack && stack.length) {
							memory = stack.shift();
							self.fireWith(memory[ 0 ], memory[ 1 ]);
						}
					} else if (memory === true) {
						self.disable();
					} else {
						list = [];
					}
				}
			};

		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function () {
				if (list) {
					var length = list.length;
					add(arguments);

					// Do we need to add the callbacks to the
					// current firing batch?
					if (firing) {
						firingLength = list.length;

						// With memory, if we're not firing then
						// we should call right away, unless previous
						// firing was halted (stopOnFalse)
					} else if (memory && memory !== true) {
						firingStart = length;
						fire(memory[ 0 ], memory[ 1 ]);
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function () {
				if (list) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for (; argIndex < argLength ; argIndex++) {
						for (var i = 0; i < list.length; i++) {
							if (args[ argIndex ] === list[ i ]) {

								// Handle firingIndex and firingLength
								if (firing) {
									if (i <= firingLength) {
										firingLength--;
										if (i <= firingIndex) {
											firingIndex--;
										}
									}
								}

								// Remove the element
								list.splice(i--, 1);

								// If we have some unicity property then
								// we only need to do this once
								if (flags.unique) {
									break;
								}
							}
						}
					}
				}
				return this;
			},

			// Control if a given callback is in the list
			has: function (fn) {
				if (list) {
					var i = 0,
						length = list.length;
					for (; i < length; i++) {
						if (fn === list[ i ]) {
							return true;
						}
					}
				}
				return false;
			},

			// Remove all callbacks from the list
			empty: function () {
				list = [];
				return this;
			},

			// Have the list do nothing anymore
			disable: function () {
				list = stack = memory = undefined;
				return this;
			},

			// Is it disabled?
			disabled: function () {
				return !list;
			},

			// Lock the list in its current state
			lock: function () {
				stack = undefined;
				if (!memory || memory === true) {
					self.disable();
				}
				return this;
			},

			// Is it locked?
			locked: function () {
				return !stack;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function (context, args) {
				if (stack) {
					if (firing) {
						if (!flags.once) {
							stack.push([ context, args ]);
						}
					} else if (!(flags.once && memory)) {
						fire(context, args);
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function () {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function () {
				return !!fired;
			}
		};

		return self;
	};

	$.ig.util.jqueryDeferred = function (func) {
		var deferred,
			doneList = $.ig.util.jqueryCallbacks("once memory"),
			failList = $.ig.util.jqueryCallbacks("once memory"),
			progressList = $.ig.util.jqueryCallbacks("memory"),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function () {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function (doneCallbacks, failCallbacks, progressCallbacks) {
					deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
					return this;
				},
				always: function () {
					deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
					return this;
				},
				pipe: function (fnDone, fnFail, fnProgress) {
					return $.ig.util.jqueryDeferred(function (newDefer) {
						jQuery.each({
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function (handler, data) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if (jQuery.isFunction(fn)) {
								deferred[ handler ](function () {
									returned = fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify);
									} else {
										newDefer[ action + "With" ](this === deferred ? newDefer : this, [ returned ]);
									}
								});
							} else {
								deferred[ handler ](newDefer[ action ]);
							}
						});
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function (obj) {
					if (obj === undefined || obj === null) {
						obj = promise;
					} else {
						for (var key in promise) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			key;

		deferred = promise.promise({});

		for (key in lists) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done(function () {
			state = "resolved";
		}, failList.disable, progressList.lock).fail(function () {
			state = "rejected";
		}, doneList.disable, progressList.lock);

		// Call given func if any
		if (func) {
			func.call(deferred, deferred);
		}

		// All done!
		return deferred;
	};

	// PA 7/8/2013 - fix for jQuery versions in the interval (1.4.4, 1.7.0) where $.Deferred is defined, but has some missing members that we need
	$.ig.util.checkDeferred = function () {
		$.ig.util.deferredDefined = !!($.Deferred !== undefined && $.Deferred().state);
	};

	$.ig.util.deferred = function () {
		if ($.ig.util.deferredDefined === undefined) {
			$.ig.util.checkDeferred();
		}

		if ($.ig.util.deferredDefined) {
			return $.Deferred();
		} else {
			return $.ig.util.jqueryDeferred();
		}
	};

	$.ig.util.ajax = function (url, contentType, data, method, requestOptions) {
		//return $.ig.util.corsRequest(url, contentType, data, method, requestOptions);

		var deferred = $.ig.util.deferred();
		var isCrossDomain;
		if (requestOptions && "isCrossDomain" in requestOptions) {
			isCrossDomain = requestOptions.isCrossDomain;
		} else {
			isCrossDomain = $.support.cors;
		}

		var xhrObj = (function (rOptions) {
			var xhr = new XMLHttpRequest();

			// do not use XDomainRequest for IE8/IE9 if the user has specifed withCredentials in request options
			// which is interpreted as XmlHttpRequest to be used against trusted domain
			// since XDomainRequest does not support withCredentials
			if (isCrossDomain &&
				!(("withCredentials" in xhr) ||
				(rOptions && "withCredentials" in rOptions && rOptions.withCredentials)) &&
					typeof XDomainRequest !== undefined) {

				// handle IE8/IE9 with anonymous authentication
				xhr = new XDomainRequest();

				// fix for jQuery.ajax() callback is expecting some methods and props are defined
				// PP 12/05/2012 jQuery 1.4.4 fix
				xhr.getResponseHeader = function () {
					return null;
				};

				// M.S. July 24st, 2013 Bug #145199 Fixed the data loading from XMLA, when using jQuery 2.0.0 in IE9
				xhr.setRequestHeader = function () {
					xhr.status = 200;
				};

				xhr.getAllResponseHeaders = function () {
					return null;
				};

				xhr.onload = function () {
					xhr.readyState = 4;
					xhr.status = 200;
					xhr.statusText = "success";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				xhr.onerror = function () {
					xhr.readyState = 4;
					xhr.status = 0;
					xhr.statusText = "error";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				xhr.ontimeout = function () {
					xhr.readyState = 4;
					xhr.status = 0;
					xhr.statusText = "timeout";
					xhr.getAllResponseHeaders = function () {
					};
					xhr.onreadystatechange();
				};

				// keep this callback because otherwise XDomainRequest is aborted
				// it's a bug in XDomainRequest
				xhr.onprogress = function () {
				};
			}

			return xhr;
		})(requestOptions);

		var xhrFields;

		// when credentials are specified that will work with Chrome/FireFox/IE10
		if ("withCredentials" in xhrObj &&
			requestOptions && "withCredentials" in requestOptions &&
		requestOptions.withCredentials) {

			xhrFields = {
				withCredentials: true
			};
		}

		var beforeSend = function (jqXHR, options) {
			if (requestOptions) {

				if ($.isFunction(requestOptions.beforeSend)) {
					jqXHR.setRequestHeader("Content-Type", contentType);
					requestOptions.beforeSend.call(this, jqXHR, options, requestOptions);
				}
			}
		};

		$.ajax({
			crossDomain: (isCrossDomain ? true : false),
			isLocal: false,
			url: url,
			contentType: contentType,
			data: data,
			type: method,
			dataType: "text",
			xhrFields: xhrFields,
			beforeSend: beforeSend,
			xhr: function () {
				return xhrObj;
			},
			success: function (responce) {
				deferred.resolve(responce);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				deferred.reject(errorThrown);
			}
		});

		return deferred.promise();
	};

}));// REMOVE_FROM_COMBINED_FILES
