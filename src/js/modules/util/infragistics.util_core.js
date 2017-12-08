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
/* Simple JavaScript Inheritance
* By John Resig http://ejohn.org/
* MIT Licensed.
*/

// Inspired by base2 and Prototype

/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape, $, igRoot*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
window.igRoot = window.igRoot || {};
/* jshint ignore:start */
if (window.$ !== undefined || typeof $ === "function") {
    window.igRoot = window.$ || $;
}
/* jshint ignore:end */

//window.$ = window.$ || window.igRoot;

window.igRoot.ig = window.igRoot.ig || { _isNamespace: true };
window.$ig = window.$ig || window.igRoot.ig;

var $ = igRoot; // REMOVE_FROM_COMBINED_FILES

var initializing = false, fnTest = /xyz/.test(function () { xyz(); }) ? /\b_super\b/ : /.*/;

if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}

// The base Class implementation (does nothing) or expects Class to already be defined as a function
// K.D. August 18, 2016 Bug #242 global scope Class object is overridden by Ignite UI Class object
window.Class = window.Class || function () { };

// Create a new Class that inherits from this class
Class.extend = function (prop, doAugment) {
    var doSuper = true,
        _super = this.prototype,
        prototype,
        name;

    if (doAugment) {
        doSuper = false;
    }

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    prototype = new this();
    initializing = false;

    function makeFn(name, fn) {
        return function () {
            var tmp = this._super,
                ret;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[ name ];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
        };
    }

    // Set these before copying over values from the prop, so we don't overwrite a custom getHashCode implementation.
    if (doAugment) {
        prototype.getType = function () {
            return this.$type;
        };

        prototype.getHashCode = function () {
            if (this.$hashCode !== undefined) {
                return this.$hashCode;
            }
            this.$hashCode = $.ig.nextHashCode++;
            return this.$hashCode;
        };
    }

    // Copy the properties over onto the new prototype
    for (name in prop) {
        if (prop.hasOwnProperty(name)) {
            // Check if we're overwriting an existing function
            prototype[ name ] = doSuper && typeof prop[ name ] === "function" &&
                typeof _super[ name ] === "function" && fnTest.test(prop[ name ]) ?
                makeFn(name, prop[ name ]) : prop[ name ];
        }
    }

    // For some reason, intellisense gets tripped up when we allow the constructors to call the init function. So when the intellisense
    // object is defined, just use a dummy constructor
    var isForIntellisense =
        window.intellisense &&
        window.intellisense.annotate;

    // The dummy class constructor
    function Class() {
        // All construction is actually done in the init method
        if (!initializing && this.init) {
            if (!isForIntellisense || Class === $.ig.Type) {
                this.init.apply(this, arguments);
            }
        }
    }

    if (prop.$type) {
        prop.$type.InstanceConstructor = Class;
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = this.extend;

    if (doAugment) {
        Class.typeName = function () {
            return this.prototype.$type;
        };

        Class.baseType = function () {
            return this.$type.baseType;
        };
    }

    return Class;
};

// N.A. 12/8/2015 Bug #210921 In IE8 'console' is 'undefined' and to remove exceptions when console.log is used just create empty function.
// For the moment editors and notifier are using console.log() function.
if (!window.console) {
    window.console = { log: function () { } };
}

$.ig.util = $.ig.util || {};

//A.T. 29 Nov 2012 - Fix for bug #119896
if (typeof $.ig.useDefineProperty === "undefined") { $.ig.useDefineProperty = true; }

$.ig.extendNativePrototype = function (proto, propName, val) {
    if ($.ig.useDefineProperty) {
        try {
            Object.defineProperty(proto, propName, {
                value: val,
                enumerable: false,
                configurable: true,
                writable: true
            });
        } catch (e) { // IE8 has defineProperty defined, but doesn't support setting enumerable to false
            proto[ propName ] = val;
        }
    } else {
        proto[ propName ] = val;
    }
};

$.ig.nextHashCode = 0;
	$.ig.util.ensureUniqueId = function (obj) {
		if (!obj.getHashCode) {
			var code = $.ig.nextHashCode++;
			obj.getHashCode = function () {
				return code;
			};
		}
	};

	$.ig.typeIdentifierCache = {};
	$.ig.nextTypeIdentifier = 0;
	$.ig.Type = Class.extend({
		init: function (identifier, baseType, interfaces, staticInitializer) {
			this.specializationCache = {};
			this._staticInitializer = staticInitializer;
			this._fullName = identifier;
			this.name = identifier;
			var lastDotIndex = this.name.lastIndexOf(".");
			if (lastDotIndex >= 0) {
				this.name = this.name.substr(lastDotIndex + 1);
			}

			this.typeArguments = null;
			this.baseType = null;
			this.interfaces = null;
			if (baseType) {
				this.baseType = baseType;
			}
			if (interfaces) {
				this.interfaces = interfaces;
			}

			if ($.ig.typeIdentifierCache[ identifier ]) {
				this.identifier = $.ig.typeIdentifierCache[ identifier ];
			} else {
				this.identifier = $.ig.nextTypeIdentifier++;
				$.ig.typeIdentifierCache[ identifier ] = this.identifier;
			}

		    // rather than always evaluating a function on a type to see if it is an enum
            // we can just cache it once on the type
			if (baseType && $.ig.Enum && baseType == $.ig.Enum.prototype.$type) {
				this.isEnumType = true;
			}
		},
		typeName: function () {
			return this.name;
		},
		fullName: function () {
			return this._fullName;
		},
		getSpecId: function (types) {
		    if (types.length === 1) {
		        if (!types[ 0 ]) {
					return "undef";
		        } else if (types[ 0 ] === -1) {
		            return undefined;
		        } else if (!types[ 0 ].typeName) {
		            return types[ 0 ].toString();
		        } else if (types[ 0 ].stringId) {
		            return types[ 0 ].stringId;
				} else {
		            return types[ 0 ].identifier.toString();
				}
			}

			var ret = "";
			for (var i = 0; i < types.length; i++) {
			    var type = types[ i ];
				if (!type) {
					ret += "undef";
				} else if (type == -1) {
				    return undefined;
				} else if (!type.typeName) {
					ret += type.toString();
				} else if (type.stringId) {
					ret += type.stringId;
				} else {
					ret += type.identifier.toString();
				}
			}
			return ret;
		},
		_isGenericType: null,
		isGenericType: function () {
			if (this._isGenericType === null) {
				this._isGenericType = this.name.indexOf("$") >= 0;
			}

			return this._isGenericType;
		},
		isGenericTypeDefinition: function () {
			return this.typeArguments === null && this.isGenericType();
		},
		genericTypeArguments: function () {
			return this.typeArguments;
		},
		_staticInitializer: null,
		_staticFields: null,
		getStaticFields: function (type) {
			if (type === undefined) {
				type = this;
			}

			var t = this;

			while (t != null) {
				if (t === type || t._fullName == type._fullName) {
					if (t._staticFields == null && t._staticInitializer) {
						t._staticFields = {};
						t._staticInitializer.apply(t._staticFields, t.typeArguments);
					}

					return t._staticFields;
				}

				t = t.baseType;
			}

			return null;
		},
		specializationCache: null,
		initSelfReferences: function (replacement) {
			var i, j;
			if (replacement) {
				if (this.typeArguments) {
				    var updateCache = false;

				    for (j = 0; j < this.typeArguments.length; j++) {
						var typeArg = this.typeArguments[ j ];
						if (typeArg == -1) {
						    updateCache = true;
						    this.typeArguments[ j ] = replacement;
						} else if (typeArg && typeArg.initSelfReferences) {
						    typeArg.initSelfReferences(replacement);
						}
				    }

				    if (updateCache) {
				        var specId = this.getSpecId(this.typeArguments);
				        var ret = this.specializationCache[ specId ];

				        if (!ret) {
				            this.specializationCache[ specId ] = this;
				        }
				    }
				}
			} else {
				if (this.baseType) {
					this.baseType.initSelfReferences(this);
				}

				if (this.interfaces) {
					for (i = 0; i < this.interfaces.length; i++) {
						this.interfaces[ i ].initSelfReferences(this);
					}
				}
			}
		},
		specialize: function () {
			var i;
			if (!this.isGenericType()) {
				return this;
			}

			var specId = this.getSpecId(arguments);
			var ret = this.specializationCache[ specId ];
			if (ret) {
				return ret;
			}
			ret = new $.ig.Type(this._fullName, this.baseType, this.interfaces, this._staticInitializer);

			var placeholders = this.typeArguments;
			var hasPlaceholders = false;

			// Make sure the placeholders are actually numbers. If they are types, we are re-specializing an
			// already specialized type.
			if (placeholders && placeholders.length) {
			    /* going back to how it used to be. we shouldn't assume that the number/order of the arguments
                   relates to the typearguments. this may be an interface that has its type information already
                   and either has placeholders or is a closed type
			    // you can have a mixed bag where some are placeholders and others are not and the
			    // placeholder doesn't have to be the first slot
			    for (i = 0; i < placeholders.length; i++) {
			        if (isFinite(placeholders[ i ])) {
			            hasPlaceholders = true;
			            break;
			        }
			    }*/
			    hasPlaceholders = true;
			}

			ret.typeArguments = [ ];
			if (hasPlaceholders) {
				for (i = 0; i < placeholders.length; i++) {

			        // if the argument being provided is a placeholder index and we already have
			        // a placeholder then keep the index we have. otherwise we're taking the index
                    // of the parent type
			        if (isFinite(placeholders[ i ]) && !isFinite(arguments[ placeholders[ i ] ])) {
			            ret.typeArguments[ i ] = arguments[ placeholders[ i ] ];
			        } else if (placeholders[ i ] &&
						placeholders[ i ] != arguments[ i ] &&
						placeholders[ i ].typeArguments) {
			            ret.typeArguments[ i ] = this.specialize.apply(placeholders[ i ], arguments);
			        } else {
			            ret.typeArguments[ i ] = placeholders[ i ];
			        }
			    }
			} else {
			    for (i = 0; i < arguments.length; i++) {
		            ret.typeArguments[ i ] = arguments[ i ];
				}
			}

		    // since the placeholder indexes for the basetype and interfaces implemented are based
		    // on the order of the type arguments for the defining types we should pass its typeargs
		    // and not the outermost type's type arguments which may be different in number and order
            // than the base type of the base types and interfaces implemented
			if (this.baseType && this.baseType.typeArguments) {
			    ret.baseType = this.specialize.apply(this.baseType, ret.typeArguments);
			}

			if (this.interfaces) {
				ret.interfaces = [ ];
				for (i = 0; i < this.interfaces.length; i++) {
				    ret.interfaces[ i ] = this.specialize.apply(this.interfaces[ i ], ret.typeArguments);
				}
			}

            // rather than doing this check in various places we could just cache a field on the type
			if (this._fullName == "Nullable$1" && ret.typeArguments.length == 1) {
				ret.isNullable = true;
			}

		    // if this was a self referencing type (e.g. IEquatable<Int32> for Int32 then we won't have the
		    // specId yet because we don't know the type argument. we'll update the cache when we update
		    // the self references. otherwise other types that use self references (but for a different type)
            // will get and use the wrong type arguments
			if (specId) {
			    this.specializationCache[ specId ] = ret;
			    ret.stringId = ret.generateString();
			}

			var _self = this;
			ret.InstanceConstructor = function () {
				_self.InstanceConstructor.apply(this,
					ret.typeArguments.concat(Array.prototype.slice.call(arguments, 0)));
				return this;
			};
			ret.InstanceConstructor.prototype = this.InstanceConstructor.prototype;

			return ret;
		},
		equals: function (other) {
			if (!(other instanceof $.ig.Type)) {
				return false;
			}
			if (this.identifier !== other.identifier) {
				return false;
			}
			if (this.typeArguments === null && other.typeArguments === null) {
				return true;
			}
			if (this.typeArguments === null && other.typeArguments !== null) {
				return false;
			}
			if (this.typeArguments !== null && other.typeArguments === null) {
				return false;
			}
			if (this.typeArguments.length !== other.typeArguments.length) {
				return false;
			}
			for (var i = 0; i < this.typeArguments.length; i++) {

				//TODO: handle covariance case here.
				//if (!$.ig.util.canAssign(this.typeArguments[ i ], other.typeArguments[ i ])) {
				//    return false;
				//}
				if (!$.ig.Type.prototype.checkEquals(this.typeArguments[ i ], other.typeArguments[ i ])) {
					return false;
				}
			}

			return true;
		},
		checkEquals: function (type1, type2) {
			if (type1 instanceof $.ig.Type) {
				return type1.equals(type2);
			} else if (type2 instanceof $.ig.Type) {
				return type2.equals(type1);
			} else {
				return type1 === type2;
			}
		},

		op_Equality: function (type1, type2) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return type1.equals(type2);
		},
		op_Inequality: function (type1, type2) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
			return !type1.equals(type2);
		},

		generateString: function () {
			if (!this.typeArguments || !this.typeArguments.length) {
				return this.identifier.toString();
			} else {
				var ret = this.identifier.toString() + "[";
				var first = true;
				for (var i = 0; i < this.typeArguments.length; i++) {
					if (this.typeArguments[ i ] == undefined) {
						continue;
					}
					if (first) { first = false; } else { ret += ","; }
					if (this.typeArguments[ i ].toString) {
						ret += this.typeArguments[ i ].toString();
					} else {
						ret += this.typeArguments[ i ].identifier.toString();
					}
				}
				ret += "]";
				return ret;
			}
		},
		isEnum: function () {
			return this.baseType === $.ig.Enum.prototype.$type;
		},
		isValueType: function () {
			return this.baseType === $.ig.ValueType.prototype.$type;
		},
		isAssignableFrom: function (tOther) {

			// TODO: Unit test and make sure this is right (especially with generics
			if (this === tOther) {
				return true;
			}

			if (tOther.baseType && this.isAssignableFrom(tOther.baseType)) {
				return true;
			}

			if (tOther.interfaces) {
				for (var i = 0; i < tOther.interfaces.length; i++) {
					if (this.isAssignableFrom(tOther.interfaces[ i ])) {
						return true;
					}
				}
			}

			return false;
		},
		isInstanceOfType: function (value) {
			return $.ig.util.cast(this, value) !== null;
		},
		isPrimitive: function () {
			return this === $.ig.Number.prototype.$type ||
				this === $.ig.Boolean.prototype.$type;
		}
	}, true);

	$.ig.Object = Class.extend({
		init: function () {

		},
		equals: function (other) {
			return this === other;
		},
		equalsStatic: function (a, b) {
			/*jshint eqnull:true */
			var aIsNull = (a == null) || (!!a.isNullable && !a.hasValue());
			var bIsNull = (b == null) || (!!b.isNullable && !b.hasValue());

			if (aIsNull || bIsNull) {
				return aIsNull && bIsNull;
			}

			if (a.equals) {
				return a.equals(b);
			}

			if (b.equals) {
				return b.equals(a);
			}

			if ($.ig.util.isNaN(a) && $.ig.util.isNaN(b)) {
				return true;
			}

			return a == b && typeof a == typeof b;
		},
		memberwiseClone: function () {

			function Cons() { }
			Cons.prototype = this.$type.InstanceConstructor.prototype;
			var clone = new Cons();

			for (var prop in this) {
				if (this.hasOwnProperty(prop)) {
					clone[ prop ] = this[ prop ];
				}
			}

			return clone;
		},
		referenceEquals: function (a, b) {
			/*jshint eqnull:true */
			return a === b || (a == null && b == null);
		},
		$type: new $.ig.Type("Object")
	}, true);
	$.ig.$o = $.ig.Object;
	$.ig.$op = $.ig.Object.prototype;
	$.ig.$ot = $.ig.Object.prototype.$type;

	$.ig.Type.prototype.$type = new $.ig.Type("Type", $.ig.Object.prototype.$type);

	$.ig.IConvertible = Class.extend({
		$type: new $.ig.Type("IConvertible")
	}, true);

	$.ig.IComparable = Class.extend({
		$type: new $.ig.Type("IComparable")
	}, true);

	$.ig.IComparable$1 = Class.extend({
		$type: new $.ig.Type("IComparable$1")
	}, true);

	$.ig.IEquatable$1 = Class.extend({
		$type: new $.ig.Type("IEquatable$1")
	}, true);

	$.ig.Enum = Class.extend({
		parse: function (enumType, value, ignoreCase) {
			var info = $.ig.util.getDefinedNameAndNamespace(enumType.fullName());

			if ($.ig.util.canAssign(this.$type, enumType)) {
				var p = info.namespace[ info.name ].prototype;
				var values = p.$type.InstanceConstructor._isEnum ? p.$type.InstanceConstructor : p;

				if (values.hasOwnProperty(value)) {
					return p.getBox(values[ value ]);
				} else if (ignoreCase) {
					var upper = value.toUpperCase();

					for (var x in values) {
						if (x.toUpperCase() === upper) {
							return p.getBox(values[ x ]);
						}
					}
				} else {
					// A.S. Nov 4, 2016 Adjusted to handle case where leading char is _.
					var firstChar = value.charAt(0);
					if (firstChar != "_") {
						value = firstChar.toLowerCase() + value.substr(1);
					} else {
						value = "_" + value.charAt(1).toLowerCase() + value.substr(2);
					}
					if (values.hasOwnProperty(value)) {
						return p.getBox(values[ value ]);
					}
				}

				// A.S. Nov 4, 2016 We now track the renamed enum members
				if (p.$renamed) {
					var rVal = p.$renamed[ ignoreCase ? value.toUpperCase() : value ];

					if (rVal) {
						return p.getBox(values[ rVal ]);
					}
				}
			}

			throw new Error("Invalid " + info.name + " value: " + value);
		},
		getBox: function (v) {
			if (!this._boxes) {
				this._boxes = {};
			}

			if (!this._boxes[ v ]) {
				this._boxes[ v ] = new this.$type.InstanceConstructor(v);
			}

			return this._boxes[ v ];
		},
		toString: function () {
			return this.$type.InstanceConstructor.prototype.$getName(this._v);
		},
		getFlaggedName: function (v, getName) {
			var names = [ ];
			var original = v;
			var zeroValueName;
			var value;

			var values = [ ];
			for (var p in this) {
				if (this.hasOwnProperty(p)) {
					value = this[ p ];
					if (typeof this[ p ] == "number") {
						values.push(p);
					}
				}
			}

			values.sort(function (a, b) { return this[ a ] - this[ b ]; });

			for (var i = values.length - 1; i >= 0; i--) {
				value = this[ values[ i ] ];
				if (value === 0) {
					zeroValueName = getName(0);
				}
					/*jslint bitwise: true */
				else if ((v & value) === value) {
					v -= value;
					names.unshift(getName(value));
				}
			}

			if (v !== 0) {
				return original.toString();
			}

			if (original !== 0) {
				return names.join(", ");
			}

			return zeroValueName || "0";
		},
		getValues: function ($t) {
			var result = [ ];

			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (typeof p[ member ] === "number") {
						result.push(p[ member ]);
					}
				}
			}

			return result;
		},
		getNames: function ($t) {
			var result = [ ];

			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (typeof p[ member ] === "number") {
						result.push(member);
					}
				}
			}

			return result;
		},
		isDefined: function ($t, value) {
			value = $.ig.util.getValue(value);
			var p = $t.InstanceConstructor._isEnum ?
				$t.InstanceConstructor : $t.InstanceConstructor.prototype;
			for (var member in p) {
				if (p.hasOwnProperty(member)) {
					if (p[ member ] === value) {
						return true;
					}
				}
			}

			return false;
		},

		// TODO: Fill out remaining IConvertible implementation
		toDouble: function (provider) {
			return this.$value();
		},
		toObject: function ($t, value) {
			return value;
		},
		tryParse$1: function ($tEnum, value, ignoreCase, result) {
			try {
				return {
					ret: true,
					p2: this.parse($tEnum, value, ignoreCase).$value()
				};
			} catch (e) {
				result = $.ig.util.createInstance($tEnum);
				return {
					ret: false,
					p2: result
				};
			}
		},
		$type: new $.ig.Type("Enum",
			$.ig.Object.prototype.$type, [ $.ig.IConvertible.prototype.$type ])
	}, true);
	$.ig.$e = $.ig.Enum;
	$.ig.$ep = $.ig.Enum.prototype;
	$.ig.$et = $.ig.Enum.prototype.$type;

	$.ig.ValueType = Class.extend({
		init: function () {

		},
		$type: new $.ig.Type("ValueType", $.ig.Object.prototype.$type)
	}, true);

	$.ig.INotifyPropertyChanged = Class.extend({
		init: function () {

		},
		_PropertyChanged: function () {

		},
		$type: new $.ig.Type("INotifyPropertyChanged")
	}, true);

	$.ig.PropertyChangedEventArgs = $.ig.Object.extend({
		init: function (propertyName) {
			this._propertyName = propertyName;
		},
		_propertyName: null,
		propertyName: function (value) {
			if (arguments.length === 0) {
				return this._propertyName;
			} else {
				this._propertyName = value;
			}
		},
		$type: new $.ig.Type("PropertyChangedEventArgs", $.ig.Object.$type)
	}, true);

    $.ig.Array = Array;

	$.ig.extendNativePrototype(Array.prototype, "add", function (item) {
		this[ this.length ] = item;
	});

	if (!Array.prototype.indexOf) {
		$.ig.extendNativePrototype(Array.prototype, "indexOf", function (item) {
			for (var i = 0; i < this.length; i++) {
				if (this[ i ] == item) {
					return i;
				}
			}
			return -1;
		});
	}

	if (!Array.prototype.lastIndexOf) {
		$.ig.extendNativePrototype(Array.prototype, "lastIndexOf", function (item) {
			for (var i = this.length - 1; i >= 0; i--) {
				if (this[ i ] == item) {
					return i;
				}
			}
			return -1;
		});
	}

    $.ig.util.arrayCopyTo = function (source, dest, index) {
		for (var i = 0; i < source.length; i++) {
			dest[ index++ ] = source[ i ];
		}
	};

	// TODO: Can we remove this? We have $.ig.util.arrayCopy1 now
	$.ig.extendNativePrototype(Array.prototype, "copy",
		function (source, sourceIndex, dest, destIndex, count) {
		for (var i = 0; i < count; i++) {
			dest[ destIndex + i ] = source[ sourceIndex + i ];
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "contains", function (item) {
		var index = this.indexOf(item);
		return (index >= 0);
	});

	$.ig.extendNativePrototype(Array.prototype, "insert", function (index, item) {
		this.splice(index, 0, item);
	});

	$.ig.extendNativePrototype(Array.prototype, "removeAt", function (i) {
		this.splice(i, 1);
	});

	$.ig.extendNativePrototype(Array.prototype, "removeItem", function (item) {
		var index = this.indexOf(item);
		if (index >= 0) {
			this.splice(index, 1);
			return true;
		}
		return false;
	});

	$.ig.extendNativePrototype(Array.prototype, "getEnumerator", function () {
		return new $.ig.ArrayEnumerator(this);
	});

	$.ig.extendNativePrototype(Array.prototype, "count", function () {
		return this.length;
	});

	$.ig.extendNativePrototype(Array.prototype, "item", function (index, value) {
		if (arguments.length === 2) {
			this[ index ] = value;
			return value;
		} else {
			return this[ index ];
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "getLength", function (dimension) {

		// TODO: Is there a better way to do this? Maybe attach the rank values to the array?

		var array = this;
		var dim = dimension;

		while (array) {
			if (dim === 0) {
				return array.length;
			}

			dim--;
			array = array[ 0 ];
		}

		return this.dimensionLength[ dimension - 1 ];
	});

	$.ig.extendNativePrototype(Array.prototype, "resize", function () {
		this.length = 0;
	});

	$.ig.ArrayEnumerator = Class.extend({

		init: function (array) {
			this._array = array;
			this._index = -1;
		},
		current: function () {
			return this._array[ this._index ];
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._array.length);
		},
		reset: function () {
			this._index = -1;
		},
		dispose: function () { }
	}, true);

	$.ig.Date = Class.extend({
		init: function () {
			return new Date();
		},
		fromOADate: function (value) {
			var result = new Date(+(new Date(1899, 11, 30)) + Math.round(value * 86400000));

			if (result.dst && result.dst()) {
				return $.ig.Date.prototype.addHours(result, -1);
			}

			return result;
		},
		fromValues: function (year, month, day, hour, minute, second, millisecond) {
			return new Date(year, month - 1, day, hour, minute, second, millisecond);
		},
		fromTicks: function (ticks) {
			return new Date(ticks);
		},
		addSeconds: function (value, seconds) {
			return $.ig.Date.prototype.addDays(value, seconds / 86400);
		},
		addMinutes: function (value, minutes) {
			return $.ig.Date.prototype.addDays(value, minutes / 1440);
		},
		addHours: function (value, hours) {
			return $.ig.Date.prototype.addDays(value, hours / 24);
		},
		addDays: function (value, days) {
			var result = new Date(+value + (days * 86400000));

			// Correct for any daylight saving time shifts
			if (value.dst) {
				if (!value.dst()) {
					if (result.dst()) {
						result = new Date(+result - 3600000);
					}
				} else {
					if (!result.dst()) {
						result = new Date(+result + 3600000);
					}
				}
			}

			return result;
		},
		addMonths: function (value, num) {

			var result = new Date(value.getTime());
			var currentMonth = result.getMonth() + result.getFullYear() * 12;
			result.setMonth(result.getMonth() + num);
			var diff = result.getMonth() + result.getFullYear() * 12 - currentMonth;

			// If don't get the right number, set date to
			// last day of previous month
			if (diff != num) {
				result.setDate(0);
			}
			return result;
		},
		addYears: function (value, num) {
			var result = new Date(value.getTime());
			result.setFullYear(result.getFullYear() + num);
			return result;
		},
		daysInMonth: function (year, month) {
			switch (month) {
				case 1: return 31; // Jan
				case 2: return $.ig.Date.prototype.isLeapYear(year) ? 29 : 28; // Feb
				case 3: return 31; // Mar
				case 4: return 30; // Apr
				case 5: return 31; // May
				case 6: return 30; // Jun
				case 7: return 31; // Jul
				case 8: return 31; // Aug
				case 9: return 30; // Sep
				case 10: return 31; // Oct
				case 11: return 30; // Nov
				case 12: return 31; // Dec
			}

			// TODO: throw error here?
			return 0;
		},
		isLeapYear: function (year) {
			return year % 4 === 0 && year % 100 !== 0;
		},
		toFileTime: function (value) {
			return (value - new Date(1600, 11, 31, 19, 0, 0, 0)) * 10000;
		},
		fromFileTime: function (value) {

			// TODO: Test this
			return (value / 10000) + new Date(1600, 11, 31, 19, 0, 0, 0);
		},
		tryParse: function (s) {
			var date = new Date(s);
			if (date == null || $.ig.util.isNaN(+date)) {

				// IE8 does not support this format, so parse it manually
				var r = /(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/.exec(s);
				if (r) {
					if (r[ 4 ]) {
						return {
							p1: new Date(+r[ 1 ], +r[ 2 ] - 1, +r[ 3 ],
								+r[ 4 ], +r[ 5 ], +r[ 6 ]), ret: true
						};
					} else {
						return { p1: new Date(+r[ 1 ], +r[ 2 ] - 1, +r[ 3 ]), ret: true };
					}
				}

				return { p1: null, ret: false };
			}

			// TODO: Use the current date separator/date format here here?
			if (date.getFullYear() < 1930 && /\d+\/\d+\/\d\d(?!\d)/.test(s)) {
				date.setFullYear(date.getFullYear() + 100);
			}

			return { p1: date, ret: true };
		},
		parseExact: function (s, format, provider) {
			// TODO: Use the format and provider
			var r = $.ig.Date.prototype.tryParse(s);

			if (!r.ret) {
				throw new $.ig.FormatException("Unknown date format");
			}

			return r.p1;
		},
		toLocalTime: function (value) {

			// TODO: Implement
			return value;
		},
		toUniversalTime: function (value) {

			// TODO: Implement
			return value;
		},
		getMonth: function (value) {
			return value.getMonth() + 1;
		},
		today: function (value) {
			var r = new Date();
			r.setHours(0, 0, 0, 0);
			return r;
		},
		getTimeOfDay: function (value) {
			return (value.getHours() * 3600000) +
				(value.getMinutes() * 60000) +
				(value.getSeconds() * 1000) +
				value.getMilliseconds();
		},
		getDate: function (value) {
			return new Date(value - $.ig.Date.prototype.getTimeOfDay(value));
		},
		_requiresISOCorrection: !isNaN(+new Date("2000-01-01T00:00:00")) &&
			new Date("2000-01-01T00:00:00").getHours() !== 0,
		_requiresISODateCorrection: !isNaN(new Date("2000-01-01")) &&
			new Date("2000-01-01").getHours() !== 0,
		parse: function (s, provider) {
			provider = provider || $.ig.CultureInfo.prototype.currentCulture(); // TODO: Use the provider below
			var result;

			var isoTest = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.| )?(\d*)?/.exec(s);
			if (isoTest) {
				result = $.ig.Date.prototype.parseExact(isoTest[ 1 ]);
				if (isoTest[ 2 ]) {
					var ms = Number("0." + isoTest[ 2 ]) * 1000;
					result = new Date(+result + ms);
				}

				if (!$.ig.Date.prototype._requiresISOCorrection) {
					return result;
				}
			} else {
				result = $.ig.Date.prototype.parseExact(s);
				if (!$.ig.Date.prototype._requiresISODateCorrection) {
					return result;
				}
			}

			return new Date(result.getUTCFullYear(), result.getUTCMonth(), result.getUTCDate(),
				result.getUTCHours(), result.getUTCMinutes(),
				result.getUTCSeconds(), result.getUTCMilliseconds());
		},
		_longDateFormatOptions: {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		},
		toLongDateString: function (value) {
			return value.toLocaleString($.ig.CultureInfo.prototype.currentCulture().name(),
				this._longDateFormatOptions).replace(/\u200E/g, "");
		},
		_longTimeFormatOptions: { hour: "numeric", minute: "numeric", second: "numeric" },
		toLongTimeString: function (value) {
			return value.toLocaleString($.ig.CultureInfo.prototype.currentCulture().name(),
				this._longTimeFormatOptions).replace(/\u200E/g, "");
		},
		$type: new $.ig.Type("Date", $.ig.Object.$type)
	}, true);

	$.ig.extendNativePrototype(Date.prototype, "toOADate", function () {
		var result = (this - new Date(1899, 11, 30)) / 86400000;

		if (this.dst && this.dst()) {
			return result + (1 / 24);
		}

		return result;
	});

	$.ig.extendNativePrototype(Date.prototype, "kind", function () {
		return $.ig.DateTimeKind.prototype.local;
	});

	$.ig.Date.prototype.now = function () {
		return new Date();
	};
	$.ig.Date.prototype.minValue = function () {
		return new Date(1, 1, 1, 0, 0, 0, 0);
	};
	$.ig.Date.prototype.maxValue = function () {
		return new Date(9999, 12, 31, 23, 59, 59, 0.9999999);
	};
	$.ig.Date.prototype.fromMilliseconds = function (value) {
		return value;
	};

	$.ig.Date.prototype.toString = function (value, provider) {
		return $.ig.Date.prototype.toStringFormat(value, "s", provider);
	};

	// implement casting
	$.ig.util.canAssign = function (targetType, type) {
		if (targetType.name === "Nullable$1" && type.name !== "Nullable$1") {
			targetType = $.ig.Nullable.prototype.getUnderlyingType(targetType);
		}

		return $.ig.util.canAssignSimple(targetType, type);
	};

	$.ig.util.canAssignSimple = function (targetType, type) {
		if (targetType === type || $.ig.Type.prototype.checkEquals(targetType, type)) {
			return true;
		}
		if (type.interfaces) {
			for (var i = 0; i < type.interfaces.length; i++) {
				if ($.ig.util.canAssignSimple(targetType, type.interfaces[ i ])) {
					return true;
				}
			}
		}
		if (type.baseType) {
			return $.ig.util.canAssignSimple(targetType, type.baseType);
		}

		return false;
	};

	$.ig.util.cast = function (targetType, obj) {
		if (obj === undefined || obj === null) {
			return null;
		}

		if (targetType === Array) {
			return (obj instanceof Array) ? obj : null;
		}

		if (targetType === String) {
			targetType = $.ig.String.prototype.$type;
		}

		var type = obj;

		if (obj.$type) {
			type = obj.$type;
		} else if (typeof obj === "number") {
			type = targetType === Number ? Number : $.ig.Number.prototype.$type;
		} else if (typeof obj === "string") {
			type = $.ig.String.prototype.$type;
		} else if (typeof obj === "boolean") {
			type = $.ig.Boolean.prototype.$type;
		} else if (obj instanceof Date) {
			type = $.ig.Date.prototype.$type;
		}

		if ($.ig.util.canAssignSimple(targetType, type)) {
			return obj;
		}

		if (targetType.name === "Nullable$1" && type.name !== "Nullable$1") {
			targetType = $.ig.Nullable.prototype.getUnderlyingType(targetType);
			if ($.ig.util.canAssignSimple(targetType, type)) {
				return $.ig.util.toNullable(targetType, obj);
			}

			return $.ig.util.toNullable(targetType, null);
		}

		return null;
	};

	$.ig.Dictionary = Class.extend({
		init: function () {
			this.proxy = {};
			this.keysHolder = this.proxy;
			this._count = 0;
		},
		$type: new $.ig.Type("Dictionary", $.ig.Object.prototype.$type),
		proxy: null
	}, true);

	$.ig.Dictionary.prototype.getDictionary = function (o) {
		var dict = new $.ig.Dictionary();
		dict.proxy = o;
		dict.keysHolder = o;
		return dict;
	};

	$.ig.Dictionary.prototype.containsKey = function (key) {
		return this.proxy[ key ] !== undefined;
	};

	$.ig.Dictionary.prototype.count = function () {
		return this._count;
	};

	$.ig.Dictionary.prototype.item = function (key, value) {
		if (arguments.length === 1) {
			return this.proxy[ key ];
		} else {
			if (!this.proxy[ key ]) {
				this._count++;
			}
			this.proxy[ key ] = value;
		}
	};

	$.ig.Dictionary.prototype.add = function (key, value) {
		if (!this.proxy[ key ]) {
			this._count++;
		}
		this.proxy[ key ] = value;
	};

	$.ig.Dictionary.prototype.remove = function (key) {
		delete this.proxy[ key ];
		this._count--;
	};

	$.ig.Dictionary.prototype.keys = function () {
		return new $.ig.KeyEnumerator(this);
	};

	$.ig.Dictionary.prototype.values = function () {
		return new $.ig.ValueEnumerator(this);
	};

	$.ig.Dictionary.prototype.clear = function () {
		this.proxy = {};
		this.keysHolder = this.proxy;
		this._count = 0;
	};

	$.ig.EventArgs = $.ig.Object.extend({
		init: function () {

		}
	}, true);

	$.ig.String = Class.extend({
		$type: new $.ig.Type("String", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.String.prototype.isDigit = function (str, index) {
		index = index || 0;
		var ch = str.charAt(index);
		if (ch >= "0" && ch <= "9") {
			return true;
		}

		return false;
	};

	$.ig.String.prototype.charMaxValue = function (s) {
		return "\uffff";
	};

	$.ig.String.prototype.charMinValue = function (s) {
		return "\u0000";
	};

	$.ig.Boolean = Class.extend({
		tryParse: function (value) {

			value = value.toLowerCase();
			if (value == "true") {
				return { p1: true, ret: true };
			} else if (value == "false") {
				return { p1: false, ret: true };
			}

			return { p1: false, ret: false };
		},
		$type: new $.ig.Type("Boolean", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.Number = Class.extend({
		$type: new $.ig.Type("Number", $.ig.Object.prototype.$type,
			[ $.ig.IConvertible.prototype.$type, $.ig.IComparable.prototype.$type ])
	}, true);

	$.ig.Number.prototype.parseInt = function (a, b) {
		return parseInt(a, b);
	};

	$.ig.Number.prototype.log10 = function (x) {
		return Math.log(x) / Math.log(10);
	};

	if (!Number.isPrimitive) {
		Number.isPrimitive = function () { return true; };
	}

	if (!String.isPrimitive) {
		String.isPrimitive = function () { return false; };
	}

$.ig.extendNativePrototype(String.prototype, "toDateTime", function (provider) {
		var result = new Date(this);
		if (!isNaN(+result)) {
			return result;
		}

		// TODO: Cache this regex?
		if (/^((([0-9]{1,4})\s*(\s+((a|p)m?)\s*))|(([0-9]{1,4})\s*:\s*([0-9]?[0-9])\s*(:\s*([0-9]?[0-9])\s*(.\s*([0-9]{0,4})[0-9]*\s*)?)?(\s+((a|p)m?)\s*)?)|(\s*([0-9]?[0-9])\s*:\s*([0-9]?[0-9])\s*.\s*([0-9]{0,4})[0-9]*\s*(\s+((a|p)m?)\s*)?))$/i.test(this)) {
			// The string can be a time string only, in which case we should return today at that time.
			return new Date(new Date().toDateString() + " " + this);
		}

		throw new $.ig.FormatException(1, "The string cannot be converted to a date");
	});

	$.ig.extendNativePrototype(String.prototype, "toDecimal", function (provider) {
		var result = +this;

		if ($.ig.util.isNaN(result)) {
			throw new $.ig.FormatException(1, "The string cannot be converted to a number");
		}

		return result;
	});

	$.ig.extendNativePrototype(String.prototype, "toString1", function (provider) {
		return this.toString();
	});

	String.isInstanceOfType = function (value) {
		return typeof value == "string";
	};

	$.ig.extendNativePrototype(Number.prototype, "toDecimal", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Number.prototype, "toDouble", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Number.prototype, "toString1", function (provider) {
		return this.toLocaleString(provider.name(), { useGrouping: false }); // TODO: Figure out how to use the provider correctly here
	});

	$.ig.extendNativePrototype(Date.prototype, "getType", function (provider) {
		return $.ig.Date.prototype.$type;
	});

	$.ig.extendNativePrototype(Date.prototype, "equals", function (other) {
		return other instanceof Date && +this === +other;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "getHashCode", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toByte", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toSByte", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt16", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt16", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt32", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt32", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toInt64", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toUInt64", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toSingle", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toDouble", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toDecimal", function (provider) {
		return +this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toBoolean", function (provider) {
		/*jshint -W018 */
		return !!+this;
	});

	$.ig.extendNativePrototype(Boolean.prototype, "toString1", function (provider) {
		return this.toString();
	});

	$.ig.extendNativePrototype(Boolean.prototype, "compareTo", function (other) {
		return $.ig.util.boolCompare(this, other);
	});

	$.ig.extendNativePrototype(Number.prototype, "compareTo", function (other) {
		return $.ig.util.compareSimple(+this, other);
	});

	$.ig.Single = Class.extend({

	}, true);

	$.ig.Single.prototype.parseFloat = function (s) {
		return parseFloat(s);
	};

	$.ig.Single.prototype.isInfinity = function (s) {
		return s === Infinity || s === -Infinity;
	};

	$.ig.Int32 = Class.extend({
		$type: new $.ig.Type("Int32", $.ig.Object.prototype.$type,
			[ $.ig.IComparable.prototype.$type, $.ig.IComparable$1.prototype.$type.specialize(-1),
				$.ig.IEquatable$1.prototype.$type.specialize(-1) ])
	}, true);
	$.ig.Int32.prototype.$type.initSelfReferences();

	$.ig.Double = Class.extend({
		$type: new $.ig.Type("Double", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Delegate = Class.extend({
		$type: new $.ig.Type("Delegate", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Delegate.prototype.combine = function (del1, del2) {
		if (!del1) {
			return del2;
		}

		if (!del2) {
			return del1;
		}

		var ret = function () {
			del1.apply(null, arguments);
			return del2.apply(null, arguments);
		};
		ret.enumerate = function (arr) {
			if (del1) {
				if (del1.enumerate) {
					del1.enumerate(arr);
				} else {
					arr.push(del1);
				}
			}
			if (del2) {
				if (del2.enumerate) {
					del2.enumerate(arr);
				} else {
					arr.push(del2);
				}
			}
		};

		return ret;
	};

	$.ig.Delegate.prototype.remove = function (del1, del2) {
		if (!del1) {
			return null;
		}
		if (!del2) {
			return del1;
		}

		var arr = [ ];
		var del = null;
		if (del1.enumerate) {
			del1.enumerate(arr);
		} else {
			arr.push(del1);
		}

		for (var i = 0; i < arr.length; i++) {
			if (del2.original) {
				if (arr[ i ].original == del2.original &&
					arr[ i ].target == del2.target) {
					continue;
				}
			}

			if (arr[ i ] == del2) {
				continue;
			}

			del = $.ig.Delegate.prototype.combine(del, arr[ i ]);
		}

		return del;
	};

	$.ig.ReflectionUtil = Class.extend({
		$type: new $.ig.Type("ReflectionUtil", $.ig.Object.prototype.$type)
	}, true);

	$.ig.ReflectionUtil.prototype.getPropertyGetter = function (type, propertyName) {
		if (typeof type.prototype[ propertyName ] === "function") {
			return function (instance) {
				return type.prototype[ propertyName ].apply(instance, arguments);
			};
		}

		return function (instance) {
			return instance[ propertyName ];
		};
	};

	$.ig.IEnumerable = Class.extend({
		$type: new $.ig.Type("IEnumerable", null)
	}, true);

	$.ig.IEnumerator = Class.extend({
		$type: new $.ig.Type("IEnumerator", null)
	}, true);

	$.ig.IEqualityComparer$1 = Class.extend({
		$type: new $.ig.Type("IEqualityComparer", $.ig.Object.prototype.$type)
	}, true);

	$.ig.IList = Class.extend({
		$type: new $.ig.Type("IList", null, [ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IEnumerable$1 = Class.extend({
		$type: new $.ig.Type("IEnumerable$1", null, [ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.ICollection$1 = Class.extend({
		$type: new $.ig.Type("ICollection$1", null,
			[ $.ig.IEnumerable$1.prototype.$type.specialize(0), $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IList$1 = Class.extend({
		$type: new $.ig.Type("IList$1", null,
			[ $.ig.ICollection$1.prototype.$type.specialize(0),
				$.ig.IEnumerable$1.prototype.$type.specialize(0),
				$.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.IEnumerator$1 = Class.extend({
		$type: new $.ig.Type("IEnumerator$1", null, [ $.ig.IEnumerator.prototype.$type ])
	}, true);

	$.ig.Error = Class.extend({
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}
			this.__message = null;
			this.__innerException = null;
		},
		init1: function (initNumber, message) {
			this.__message = message;
		},
		init2: function (initNumber, message, innerException) {
			this.__message = message;
			this.__innerException = innerException;
		},
		toString: function () {
			return this.message();
		},
		$type: new $.ig.Type("Error", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Error.prototype.message = function () {
		return this.__message;
	};

	$.ig.Error.prototype.innerException = function () {
		return this.__innerException;
	};

	$.ig.IDictionary = Class.extend({
		$type: new $.ig.Type("IDictionary", null)
	}, true);

	$.ig.ValueEnumerator = Class.extend({
		init: function (dict) {
			this._dict = dict;
			this._index = -1;
			this._count = 0;
			this._values = [ ];
			for (var item in this._dict.proxy) {
				if (this._dict.proxy.hasOwnProperty(item)) {
					this._values[ this._count ] = this._dict.proxy[ item ];
					this._count++;
				}
			}
		},
		current: function () {
			return this._values[ this._index ];
		},
		dispose: function () {
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._count);
		},
		reset: function () {
			this._index = -1;
		},
		getEnumerator: function () {
			this.reset();
			return this;
		},
		$type: new $.ig.Type("ValueEnumerator", $.ig.Object.prototype.$type,
			[ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.KeyEnumerator = Class.extend({

		init: function (dict) {
			this._dict = dict;
			this._index = -1;
			this._count = 0;
			this._keys = [ ];
			for (var item in this._dict.proxy) {
				if (this._dict.proxy.hasOwnProperty(item)) {
					this._keys[ this._count ] = item;
					this._count++;
				}
			}
		},
		current: function () {
			return this._keys[ this._index ];
		},
		moveNext: function () {
			this._index++;
			return (this._index < this._count);
		},
		reset: function () {
			this._index = -1;
		},
		getEnumerator: function () {
			this.reset();
			return this;
		},
		$type: new $.ig.Type("KeyEnumerator", $.ig.Object.prototype.$type,
			[ $.ig.IEnumerable.prototype.$type ])
	}, true);

	$.ig.truncate = function (val) {
		if (val >= 0) {
			return Math.floor(val);
		} else {
			return Math.ceil(val);
		}
	};

	$.ig.intDivide = function (int1, int2) {
		var result = int1 / int2;
		return $.ig.truncate(result);
	};

    $.ig.util.concat = function (v1, v2) {
		if (v1 == null) {
			v1 = "";
		} else if (!!v1.isNullable) {
			v1 = v1.getValueOrDefault1("");
		}

		if (v2 == null) {
			v2 = "";
		} else if (!!v2.isNullable) {
			v2 = v2.getValueOrDefault1("");
		}

		return v1.toString() + v2.toString();
	};

    $.ig.util.getColorStringSafe = function (v) {
		/*jshint eqnull:true */
		return v == null ? null : v.colorString();
	};

	$.ig.util.wellKnownColors = {
		aliceblue: "f0f8ff",
		antiquewhite: "faebd7",
		aqua: "00ffff",
		aquamarine: "7fffd4",
		azure: "f0ffff",
		beige: "f5f5dc",
		bisque: "ffe4c4",
		black: "000000",
		blanchedalmond: "ffebcd",
		blue: "0000ff",
		blueviolet: "8a2be2",
		brown: "a52a2a",
		burlywood: "deb887",
		cadetblue: "5f9ea0",
		chartreuse: "7fff00",
		chocolate: "d2691e",
		coral: "ff7f50",
		cornflowerblue: "6495ed",
		cornsilk: "fff8dc",
		crimson: "dc143c",
		cyan: "00ffff",
		darkblue: "00008b",
		darkcyan: "008b8b",
		darkgoldenrod: "b8860b",
		darkgray: "a9a9a9",
		darkgreen: "006400",
		darkkhaki: "bdb76b",
		darkmagenta: "8b008b",
		darkolivegreen: "556b2f",
		darkorange: "ff8c00",
		darkorchid: "9932cc",
		darkred: "8b0000",
		darksalmon: "e9967a",
		darkseagreen: "8fbc8f",
		darkslateblue: "483d8b",
		darkslategray: "2f4f4f",
		darkturquoise: "00ced1",
		darkviolet: "9400d3",
		deeppink: "ff1493",
		deepskyblue: "00bfff",
		dimgray: "696969",
		dodgerblue: "1e90ff",
		feldspar: "d19275",
		firebrick: "b22222",
		floralwhite: "fffaf0",
		forestgreen: "228b22",
		fuchsia: "ff00ff",
		gainsboro: "dcdcdc",
		ghostwhite: "f8f8ff",
		gold: "ffd700",
		goldenrod: "daa520",
		gray: "808080",
		green: "008000",
		greenyellow: "adff2f",
		honeydew: "f0fff0",
		hotpink: "ff69b4",
		indianred: "cd5c5c",
		indigo: "4b0082",
		ivory: "fffff0",
		khaki: "f0e68c",
		lavender: "e6e6fa",
		lavenderblush: "fff0f5",
		lawngreen: "7cfc00",
		lemonchiffon: "fffacd",
		lightblue: "add8e6",
		lightcoral: "f08080",
		lightcyan: "e0ffff",
		lightgoldenrodyellow: "fafad2",
		lightgrey: "d3d3d3",
		lightgreen: "90ee90",
		lightpink: "ffb6c1",
		lightsalmon: "ffa07a",
		lightseagreen: "20b2aa",
		lightskyblue: "87cefa",
		lightslateblue: "8470ff",
		lightslategray: "778899",
		lightsteelblue: "b0c4de",
		lightyellow: "ffffe0",
		lime: "00ff00",
		limegreen: "32cd32",
		linen: "faf0e6",
		magenta: "ff00ff",
		maroon: "800000",
		mediumaquamarine: "66cdaa",
		mediumblue: "0000cd",
		mediumorchid: "ba55d3",
		mediumpurple: "9370d8",
		mediumseagreen: "3cb371",
		mediumslateblue: "7b68ee",
		mediumspringgreen: "00fa9a",
		mediumturquoise: "48d1cc",
		mediumvioletred: "c71585",
		midnightblue: "191970",
		mintcream: "f5fffa",
		mistyrose: "ffe4e1",
		moccasin: "ffe4b5",
		navajowhite: "ffdead",
		navy: "000080",
		oldlace: "fdf5e6",
		olive: "808000",
		olivedrab: "6b8e23",
		orange: "ffa500",
		orangered: "ff4500",
		orchid: "da70d6",
		palegoldenrod: "eee8aa",
		palegreen: "98fb98",
		paleturquoise: "afeeee",
		palevioletred: "d87093",
		papayawhip: "ffefd5",
		peachpuff: "ffdab9",
		peru: "cd853f",
		pink: "ffc0cb",
		plum: "dda0dd",
		powderblue: "b0e0e6",
		purple: "800080",
		red: "ff0000",
		rosybrown: "bc8f8f",
		royalblue: "4169e1",
		saddlebrown: "8b4513",
		salmon: "fa8072",
		sandybrown: "f4a460",
		seagreen: "2e8b57",
		seashell: "fff5ee",
		sienna: "a0522d",
		silver: "c0c0c0",
		skyblue: "87ceeb",
		slateblue: "6a5acd",
		slategray: "708090",
		snow: "fffafa",
		springgreen: "00ff7f",
		steelblue: "4682b4",
		tan: "d2b48c",
		teal: "008080",
		thistle: "d8bfd8",
		tomato: "ff6347",
		turquoise: "40e0d0",
		violet: "ee82ee",
		violetred: "d02090",
		wheat: "f5deb3",
		white: "ffffff",
		whitesmoke: "f5f5f5",
		yellow: "ffff00",
		yellowgreen: "9acd32"
	};

	$.ig.util.stringToColor = function (str) {
		var ret = {
			a: 255,
			r: 0,
			g: 0,
			b: 0
		};

		var asColorName = str.replace(" ", "").toLowerCase();

		if (asColorName === "transparent") {
			return { a: 0, r: 0, g: 0, b: 0 };
		}

		if ($.ig.util.wellKnownColors[ asColorName ] !== undefined) {
			str = $.ig.util.wellKnownColors[ asColorName ];
		}
		var parts;
		if (str.lastIndexOf("rgba", 0) === 0) {
			str = str.replace("rgba", "").replace(" ", "").replace("(", "").replace(")", "");
			parts = str.split(",");
			ret.r = parseInt(parts[ 0 ], 10);
			ret.g = parseInt(parts[ 1 ], 10);
			ret.b = parseInt(parts[ 2 ], 10);
			ret.a = parseFloat(parts[ 3 ]) * 255.0;
		} else if (str.lastIndexOf("rgb", 0) === 0) {
			str = str.replace("rgb", "").replace(" ", "").replace("(", "").replace(")", "");
			parts = str.split(",");
			ret.r = parseInt(parts[ 0 ], 10);
			ret.g = parseInt(parts[ 1 ], 10);
			ret.b = parseInt(parts[ 2 ], 10);
		} else {
			str = str.replace("#", "").replace(" ", "");
			if (str.length === 6) {
				ret.r = parseInt(str.substr(0, 2), 16);
				ret.g = parseInt(str.substr(2, 2), 16);
				ret.b = parseInt(str.substr(4, 2), 16);
			} else if (str.length === 3) {
				ret.r = parseInt(str.substr(0, 1) + str.substr(0, 1), 16);
				ret.g = parseInt(str.substr(1, 1) + str.substr(1, 1), 16);
				ret.b = parseInt(str.substr(2, 1) + str.substr(2, 1), 16);
			}
		}
		return ret;
	};

	$.ig.util.rgbToHex = function (color) {
		/* Convert color from RGB to HEX format. null if non-rgb color is provided.
			paramType="string" optional="false" Color in RGB format.
			returnType="string|null" Returns converted color from RGB to HEX format. null if non-rgb color is provided.
		*/
		var r, g, b, colHex = null;

		if (color.charAt(0) === "r") {
			color = color.replace("rgb(", "").replace(")", "").split(",");
			r = parseInt(color[ 0 ], 10).toString(16);
			g = parseInt(color[ 1 ], 10).toString(16);
			b = parseInt(color[ 2 ], 10).toString(16);
			r = r.length === 1 ? "0" + r : r;
			g = g.length === 1 ? "0" + g : g;
			b = b.length === 1 ? "0" + b : b;
			colHex = "#" + r + g + b;
		}
		return colHex;
	};

    $.ig.$currDefinitions = null;
	$.ig.$allDefinitions = [ ];

	$.ig.util.getDefinedNameAndNamespace = function (name) {
		var ns = $.ig;
		var nParts = name.split(".");
		if (nParts.length != 1) {
			for (var i = 0; i < nParts.length - 1; i++) {
				var nsName = nParts[ i ];
				if (!ns[ nsName ]) {
					ns[ nsName ] = {};
				}

				ns = ns[ nsName ];
			}

			name = nParts[ nParts.length - 1 ];
		}

		return { name: name, namespace: ns };
	};

	$.ig.util.bulkDefine = function (toDefine) {
		var i = 0, curr = null, els = null;
		for (i = 0; i < toDefine.length; i++) {
			curr = toDefine[ i ];
			els = curr.split(":");
			curr = els[ 0 ];
			var info = $.ig.util.getDefinedNameAndNamespace(curr);

			info.namespace[ info.name ] = info.namespace[ info.name ] ||
				Class.extend({
					$type: new $.ig.Type(curr, $.ig.Object.prototype.$type),
					$placeholder: true
				}, true);
			if (els.length > 1 && $.ig.$currDefinitions) {
				$.ig.$currDefinitions[ els[ 1 ] ] = info.namespace[ info.name ];
				$.ig.$currDefinitions[ "$" + els[ 1 ] ] = info.namespace[ info.name ].prototype;
				$.ig.$currDefinitions[ "$_" + curr ] = els[ 1 ];
			}
			if ($.ig.$allDefinitions && $.ig.$allDefinitions.indexOf($.ig.$currDefinitions) < 0) {
				$.ig.$allDefinitions.push($.ig.$currDefinitions);
			}
		}
	};

	$.ig.util.defType = function (name, baseName, definition) {
		var els = null, i, currDefs, shortName;
		els = name.split(":");
		name = els[ 0 ];

		var info = $.ig.util.getDefinedNameAndNamespace(name);

		var result = info.namespace[ info.name ];

		if (!result || result.prototype.$placeholder) {
			var baseInfo = $.ig.util.getDefinedNameAndNamespace(baseName);
			result = baseInfo.namespace[ baseInfo.name ].extend(definition);
			info.namespace[ info.name ] = result;
		}

		if (els.length > 1 && $.ig.$currDefinitions) {
			$.ig.$currDefinitions[ els[ 1 ] ] = result;
			$.ig.$currDefinitions[ "$" + els[ 1 ] ] = result.prototype;
			$.ig.$currDefinitions[ "$_" + name ] = els[ 1 ];

			if ($.ig.$allDefinitions) {
				for (i = 0; i < $.ig.$allDefinitions.length; i++) {
					currDefs = $.ig.$allDefinitions[ i ];
					if (currDefs[ "$_" + name ] !== undefined) {
						shortName = currDefs[ "$_" + name ];
						currDefs[ shortName ] = result;
						currDefs[ "$" + shortName ] = result.prototype;
					}
				}
			}
		}

		return result;
	};

    $.ig.util.defEnum = function(name, isFlag, isPublic, values) {
		var _values = {};
		var renamed = null;

		for (var m in values) {
			var mParts = m.split(":");
			_values[ values[ m ] ] = mParts[ 0 ];

			if (mParts.length > 1) {
				renamed = renamed || {};
				renamed[ mParts[ 0 ] ] = mParts[ 1 ];
				renamed[ mParts[ 0 ].toUpperCase() ] = mParts[ 1 ];
			}
		}

		var simpleName = name.split(":")[ 0 ];
		var getNameSingle = function (v) {
			if (_values.hasOwnProperty(v)) {
				return _values[ v ];
			} else {
				return v.toString();
			}
		};

		var getName = getNameSingle;

		if (isFlag) {
			getName = function (v) {
				return this.getFlaggedName(v, getNameSingle);
			};
		}

		var definition = {
			init: function (v) {
				this._v = v;
			},
			$value: function () {
				return this._v;
			},
			$renamed: renamed,
			$type: new $.ig.Type(simpleName, $.ig.Enum.prototype.$type),
			$getName: getName
		};

		var type = $.ig.util.defType(name, "Enum", definition, true);
		var enumTarget = isPublic ? type : type.prototype;

		for (var member in values) {
			var parts = member.split(":");
			var memberName;

			if (parts.length > 1) {
				memberName = parts[ 1 ];
			} else if (member.charAt(0) === "_") {
				memberName = "_" + member.charAt(1).toLowerCase() + member.slice(2);
			} else {
				memberName = member.charAt(0).toLowerCase() + member.slice(1);
			}

			enumTarget[ memberName ] = values[ member ];
		}

		if (isPublic) {
			enumTarget._isEnum = true;
		}

		return type;
    };

    $.ig.util.getClassCount = function (classNamePrefix, isPrefix) {
		var styleSheets = document.styleSheets, numFound = 0, count = 0,
			currSheet, rules, currSelector, currVal;
		classNamePrefix = classNamePrefix.toLowerCase();
		if (!styleSheets) {
			return 0;
		}
		for (var i = 0; i < styleSheets.length; i++) {
			try {
				currSheet = styleSheets[ i ];
				rules = currSheet.rules ? currSheet.rules : currSheet.cssRules;
				if (!rules) {
					continue;
				}
				for (var j = 0; j < rules.length; j++) {
					currSelector = rules[ j ].selectorText;
					if (currSelector) {
						currSelector = currSelector.toLowerCase();
						if (isPrefix) {
							if (currSelector.indexOf(classNamePrefix) === 0) {
								currVal = parseInt(currSelector.replace(classNamePrefix, ""), 10);
								if (isNaN(currVal)) {
									count++;
								} else {
									numFound = Math.max(numFound, currVal);
								}
							}
						} else {
							if (currSelector == classNamePrefix) {
								numFound++;
							}
						}
					}
				}
			} catch (e) {

				//ignore cross domain sheets.
			}
		}
		return Math.max(numFound, count);
	};
	$.ig.util._isCanvasSupported = function () {
		var canvas = document.createElement("canvas");
		return !!(canvas.getContext && canvas.getContext("2d"));
	};

    $.ig.extendNativePrototype(Function.prototype, "invoke", function () {
		return this.apply(null, arguments);
	});

	$.ig.extendNativePrototype(Function.prototype, "runOn", function (target) {
		var self = this;
		var ret = function () {
			return self.apply(target, arguments);
		};
		ret.original = this;
		ret.target = target;
		return ret;
	});

	String.prototype.startsWith = function (s) {
		return this.indexOf(s) === 0;
	};

	String.prototype.startsWith1 = function (s, comparisonType) {
		if (this.length < s.length) {
			return false;
		}

		return $.ig.util.stringCompare1(this.slice(0, s.length), s, comparisonType || 0) === 0;
	};

	String.prototype.endsWith = function (s, comparisonType) {
		if (this.length < s.length) {
			return false;
		}

		return $.ig.util.stringCompare1(this.slice(-s.length), s, comparisonType || 0) === 0;
	};

	String.prototype.compareTo = function (other) {
		if (this == other) {
			return 0;
		}
		if (this < other) {
			return -1;
		}
		return 1;
	};

	if (!String.prototype.trim) {

		//String.trim() was added natively in JavaScript 1.8.1 / ECMAScript 5
		//supported in: Firefox 3.5+, Chrome/Safari 5+, IE9+ (in Standards mode only!)
		String.prototype.trim = function () {
			return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
		};
	}

	if (!String.prototype.getHashCode) {
		String.prototype.getHashCode = function () {
			var hash = 0, i, chr, len;
			if (this.length === 0) {
				return hash;
			}
			for (i = 0, len = this.length; i < len; i++) {
				chr = this.charCodeAt(i);
				/*jslint bitwise: true */
				hash = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}

			return hash;
		};
	}

	String.prototype.fullTrim = function () {
		return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
	};

	String.getHashCode = function () { return this; };
	String.isNullOrEmpty = function (s) { return !s || s.length < 1; };
	String.isNullOrWhiteSpace = function (s) { return !s || s.trim().length < 1; };
	String.empty = function () { return ""; };
	String.concat = function () { return [ ].join.call(arguments, ""); };
	String.concat1 = function (o1, o2) { return [ ].join.call(arguments, ""); };
	String.concat2 = function (s1, s2) { return [ ].join.call(arguments, ""); };
	String.concat3 = function () { return [ ].join.call(arguments, ""); };
	String.concat4 = function (o1, o2, o3) { return [ ].join.call(arguments, ""); };
	String.concat5 = function (s1, s2, s3) { return [ ].join.call(arguments, ""); };
	String.concat6 = function (o1, o2, o3, o4) { return [ ].join.call(arguments, ""); };
	String.concat7 = function (s1, s2, s3, s4) { return [ ].join.call(arguments, ""); };
	String.equalsStatic = $.ig.Object.prototype.equalsStatic;

	String.prototype.equals = function (other) {
		return this == other;
	};

	String.prototype.contains = function (s) {
		return this.indexOf(s) > -1;
	};

    $.ig.util.stringSplit = function (value, separators, options) {
		var r = "",
			i;
		for (i = 0; i < separators.length; i++) {

			if (i !== 0) {
				r += "|";
			}

			r += separators[ i ];
		}

		var result = value.split(new RegExp(r));

		for (i = result.length - 1; i >= 0; i--) {
			/*jslint bitwise: true */
			if ((result[ i ].length === 0 &&
				(options & $.ig.StringSplitOptions.prototype.removeEmptyEntries)) ||
					separators.contains(result[ i ])) {
				result.splice(i, 1);
			}
		}

		return result;
	};

	$.ig.util.stringJoin = function (sep, vals) {
		return vals.join(sep);
	};

	$.ig.util.stringJoin1 = function ($t, sep, vals) {
		var result;
		var en = vals.getEnumerator();
		while (en.moveNext()) {
			var v = en.current().toString();

			if (result === undefined) {
				result = v;
			} else {
				result += sep + v;
			}
		}

		return result;
	};

	$.ig.extendNativePrototype(Array.prototype, "insertRange", function (index, items) {
		var i = 0;
		if (this.length === 0) {
			for (i = 0; i < items.length; i++) {
				this[ index++ ] = items[ i ];
			}
		} else {
			for (i = 0; i < items.length; i++) {
				this.splice(index++, 0, items[ i ]);
			}
		}
	});

	$.ig.extendNativePrototype(Array.prototype, "insertRange1", function (index, items) {

		//TODO: adjust this later, but this is the safest change to make right now.
		var i = 0;
		if (this.length === 0) {
			for (i = 0; i < items.length; i++) {
				this[ index++ ] = items[ i ];
			}
		} else {
			for (i = 0; i < items.length; i++) {
				this.splice(index++, 0, items[ i ]);
			}
		}
	});

	Math.log10 = function (n) {
		return Math.log(n) / Math.log(10);
	};

	Math.logBase = function (n, n2) {
		return Math.log(n) / Math.log(n2);
	};

	Math.sign = function (n) {
		if (n < 0) {
			return -1;
		} else if (n > 0) {
			return 1;
		} else {
			return 0;
		}
	};

	if (!Math.cosh) {
		Math.cosh = function (x) {
			var y = Math.exp(x);
			return (y + 1 / y) / 2;
		};
	}

	if (!Math.sinh) {
		Math.sinh = function (x) {
			var y = Math.exp(x);
			return (y - 1 / y) / 2;
		};
	}

	if (!Math.tanh) {
		Math.tanh = function (x) {
			if (x === Infinity) {
				return 1;
			} else if (x === -Infinity) {
				return -1;
			} else {
				var y = Math.exp(2 * x);
				return (y - 1) / (y + 1);
			}
		};
	}

	if (!Math.ieeeRemainder) {
		Math.ieeeRemainder = function (a, b) {
			var r = Math.abs(a % b);
			if (isNaN(r) || r == b || r <= Math.abs(b) / 2.0) {
				return r;
			} else {
				return Math.signum(a) * (r - b);
			}
		};
	}

	Number.getHashCode = function () { return this; };

	//Number.isNaN = function(n) { return isNaN(n); }
	Number.isInfinity = function (n) { return n === Infinity || n === -Infinity; };

	if (!Number.prototype.getHashCode) {
		Number.prototype.getHashCode = function () {
			return this;
		};
	}

	Boolean.prototype.getType = function () {
		return $.ig.Boolean.prototype.$type;
	};

	Number.prototype.getType = function () {
		return Number;
	};

	String.prototype.getType = function () {
		return String;
	};

	// K.D. Fix for WinJS dynamic content exceptions.
	window.toStaticHTML = window.toStaticHTML || function (s) { return s; };
	window.MSApp = window.MSApp || {};
	window.MSApp.execUnsafeLocalFunction = window.MSApp.execUnsafeLocalFunction ||
		function (fn) { fn.apply(); };

	$.ig.util.getEasingFunction = function (easingValue) {
		if (easingValue === null || easingValue == "null" ||
			easingValue == "linear") {
			return null;
		}
		switch (easingValue) {
			case "cubic":
				return $.ig.EasingFunctions.prototype.cubicEase;
			case "exponential":
				return $.ig.EasingFunctions.prototype.exponentialEase;
			case "circle":
				return $.ig.EasingFunctions.prototype.circleEase;
		}

		return easingValue;
	};

    $.ig.util.defaultDVDateParse = function (obj) {
		return new Date(parseInt(obj.replace("/Date(", "").replace(")/", ""), 10));
	};

    $.ig.util.escapeRegExp = function (str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	// To escape jQuery selectors. It escapes basically everything questionable
	$.ig.util.escapeStr = function (str) {
		return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "\\$1");
	};

	$.ig.util.replace = function (str, oldValue, newValue) {
		return str.replace(new RegExp($.ig.util.escapeRegExp(oldValue), "g"), newValue);
	};

    $.ig.util.createInstance = function ($t) {
		if ($t === Number || $t == $.ig.Number.prototype.$type ||
			$t.baseType === $.ig.Enum.prototype.$type) {
			return 0;
		}

		if ($t == Boolean || $t == $.ig.Boolean.prototype.$type) {
			return false;
		}

		if ($t.InstanceConstructor) {
			var result;
			if (typeof Object.create === "function") {
				result = Object.create($t.InstanceConstructor.prototype);
			} else {
				var Cons = function () { };
				Cons.prototype = $t.InstanceConstructor.prototype;
				result = new Cons();
			}
			$t.InstanceConstructor.apply(result, Array.prototype.slice.call(arguments, 1));
			return result;
		}

		throw new Error("Cannot find instance constructor for the type parameter");
	};

    $.ig.util.equalsSimple = function (item1, item2) {
		return item1 == item2;
	};

	$.ig.util.compareSimple = function (item1, item2) {
		if (item1 == item2) {
			return 0;
		}

		if (item1 < item2) {
			return -1;
		}
		return 1;
	};

	$.ig.util.compare = function (item1, item2) {
		if (item1 === item2) {
			return 0;
		}

		var xComparable = $.ig.util.cast($.ig.IComparable.prototype.$type, item1);
		if (xComparable !== null) {
			return xComparable.compareTo(item2);
		}

		var yComparable = $.ig.util.cast($.ig.IComparable.prototype.$type, item2);
		if (yComparable !== null) {
			return -yComparable.compareTo(item1);
		}

		return $.ig.util.compareSimple(item1, item2);
	};

	$.ig.util.boolCompare = function (item1, item2) {
		if (item1 == item2) {
			return 0;
		}

		return item1 ? 1 : -1;
	};

	// Check wheather certain array of values is equal to another array
	$.ig.util.areSetsEqual = function (array1, array2) {
	    var sortedArray1, sortedArray2;

	    if (!array1 || !array2 || array1.length !== array2.length) { return false; }

	    if (array1 === array2) { return true; }

	    sortedArray1 = array1.slice().sort();
	    sortedArray2 = array2.slice().sort();

	    for (var i = 0; i < sortedArray1.length; i++) {
	        if (sortedArray1[ i ] !== sortedArray2[ i ]) { return false; }
	    }

	    return true;
	};

	$.ig.util.toCharArray = function (string) {
		{
			return string.split("");
		}
	};

    $.ig.util.parseBool = function (s) {
		var r = $.ig.util.tryParseBool(s);

		if (!r.ret) {
			throw new $.ig.FormatException(1, "Incorrect boolean format");
		}

		return r.p1;
	};

	$.ig.util.tryParseBool = function (s) {
		switch (s == null ? "" : s.trim().toLowerCase()) {
			case "true":
				return {
					p1: true,
					ret: true
				};

			case "false":
				return {
					p1: false,
					ret: true
				};

			default:
				return {
					p1: false,
					ret: false
				};
		}
	};

    $.ig.util.enumHasFlag = function (value, flag) {
		/*jslint bitwise: true */
		return (value & flag) === flag;
	};

	$.ig.util.boolToString = function (value, provider) {
		return value.toString();
	};

	$.ig.util.getArrayOfValues = function (obj) {
		var result = [ ];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				result.push(obj[ i ]);
			}
		}

		return result;
	};

	$.ig.util.getArrayOfProperties = function (obj) {
		var result = [ ];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				result.push(i);
			}
		}

		return result;
	};

    $.ig.util.castObjTo$t = function ($t, v) {

		var shouldWrap = false;
		if ($t.isNullable) {
			$t = $t.typeArguments[ 0 ];
			shouldWrap = true;
		}

		if (v !== null && $t.isEnumType) {
			v = v.$value();
		}

		return shouldWrap ? $.ig.util.toNullable($t, v) : v;
	};

	$.ig.util.getBoxIfEnum = function ($t, v) {
		if (v !== null && $t) { // TODO: Remove the $t check here and fix the null ref issue
			if ($t.isNullable) {
				$t = $t.typeArguments[ 0 ];
			}

			if ($t.isEnumType) {
				return $t.InstanceConstructor.prototype.getBox(v);
			}
		}

		return v;
	};

	$.ig.util.getValue = function (v) {
		if (v !== null && v.$type && v.$type.isEnum && v.$type.isEnum()) {
			return v.$value();
		}

		return v;
	};

	$.ig.util.getEnumValue = function (v) {
		if (v !== null) {
			if (typeof v === "number") {
				return v;
			} else {
				return v.$value();
			}
		}

		return 0;
	};

	$.ig.util.timeSpanInit1 = function (h, m, s) {
		return (h * 3600000) + (m * 60000) + (s * 1000);
	};
	$.ig.util.timeSpanInit2 = function (d, h, m, s, ms) {
		return (d * 86400000) + (h * 3600000) + (m * 60000) + (s * 1000) + ms;
	};
	$.ig.util.timeSpanInit3 = function (d, h, m, s) {
		return (d * 86400000) + (h * 3600000) + (m * 60000) + (s * 1000);
	};

	$.ig.util.timeSpanTotalDays = function (t) { return t / 86400000; };
	$.ig.util.timeSpanTotalHours = function (t) { return t / 3600000; };
	$.ig.util.timeSpanTotalMilliseconds = function (t) { return t; };
	$.ig.util.timeSpanTotalMinutes = function (t) { return t / 60000; };
	$.ig.util.timeSpanTotalSeconds = function (t) { return t / 1000; };

	$.ig.util.timeSpanFromDays = function (v) { return v * 86400000; };
	$.ig.util.timeSpanFromHours = function (v) { return v * 3600000; };
	$.ig.util.timeSpanFromMilliseconds = function (v) { return v; };
	$.ig.util.timeSpanFromMinutes = function (v) { return v * 60000; };
	$.ig.util.timeSpanFromSeconds = function (v) { return v * 1000; };
	$.ig.util.timeSpanFromTicks = function (v) { return v / 10000; };

	$.ig.util.timeSpanDays = function (t) { return $.ig.truncate(t / 86400000); };
	$.ig.util.timeSpanHours = function (t) { return $.ig.truncate((t / 3600000) % 24); };
	$.ig.util.timeSpanMilliseconds = function (t) { return t % 1000; };
	$.ig.util.timeSpanMinutes = function (t) { return $.ig.truncate((t / 60000) % 60); };
	$.ig.util.timeSpanSeconds = function (t) { return $.ig.truncate((t / 1000) % 60); };
	$.ig.util.timeSpanTicks = function (t) { return $.ig.truncate(t * 10000); };

	$.ig.util.timeSpanNegate = function (t) { return -t; };

	$.ig.util.dateAdd = function (d, t) { return new Date(+d + t); };
	$.ig.util.dateSubtract = function (d, t) { return new Date(+d - t); };

	/**
	 * Decimal adjustment of a number.
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Decimal_rounding
	 *
	 * @param {String}  type  The type of adjustment.
	 * @param {Number}  value The number.
	 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	 * @returns {Number} The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {

		// If the exp is undefined or zero...
		if (typeof exp === "undefined" || +exp === 0) {
			return Math[ type ](value);
		}
		value = +value;
		exp = +exp;

		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
			return NaN;
		}

		// Shift
		value = value.toString().split("e");
		value = Math[ type ](+(value[ 0 ] + "e" + (value[ 1 ] ? (+value[ 1 ] - exp) : -exp)));

		// Shift back
		value = value.toString().split("e");
		return +(value[ 0 ] + "e" + (value[ 1 ] ? (+value[ 1 ] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function (value, exp) {
			return decimalAdjust("round", value, exp);
		};
	}
	if (!Math.round10N) {
		Math.round10N = function (value, exp) {
			return decimalAdjust("round", value, -exp);
		};
	}

	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function (value, exp) {
			return decimalAdjust("floor", value, exp);
		};
	}

	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function (value, exp) {
			return decimalAdjust("ceil", value, exp);
		};
	}

	$.ig.util.isPoint = function (p) {
		if (p == null) {
			return false;
		}

		// Test for internal Point type
		if ($.ig.util.cast($.ig.Point.prototype.$type, p) != null) {
			return true;
		}

		// Test for Point literal
		if (typeof p.x === "number" && typeof p.y === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.pointFromLiteral = function (p) {
		if (p == null) {
			return new $.ig.Point(1, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Point.prototype.$type, p);
		if (cast != null) {
			return cast;
		}

		return new $.ig.Point(1, p.x, p.y);
	};

	$.ig.util.pointToLiteral = function (p) {
		var cast = $.ig.util.cast($.ig.Point.prototype.$type, p);
		if (cast == null) {
			return null;
		}

		return { x: cast.x(), y: cast.y() };
	};

	$.ig.util.isSize = function (s) {
		if (s == null) {
			return false;
		}

		// Test for internal Size type
		if ($.ig.util.cast($.ig.Size.prototype.$type, s) != null) {
			return true;
		}

		// Test for Size literal
		if (typeof s.width === "number" && typeof s.height === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.sizeFromLiteral = function (s) {
		if (s == null) {
			return new $.ig.Size(1, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Size.prototype.$type, s);
		if (cast != null) {
			return cast;
		}

		return new $.ig.Size(1, s.width, s.height);
	};

	$.ig.util.sizeToLiteral = function (s) {
		var cast = $.ig.util.cast($.ig.Size.prototype.$type, s);
		if (cast == null) {
			return null;
		}

		return { width: cast.width(), height: cast.height() };
	};

	$.ig.util.isRect = function (r) {
		if (r == null) {
			return false;
		}

		// Test for internal Rect type
		if ($.ig.util.cast($.ig.Rect.prototype.$type, r) != null) {
			return true;
		}

		// Test for Rect literal
		if (typeof r.x === "number" && typeof r.y === "number" &&
			typeof r.width === "number" && typeof r.height === "number") {
			return true;
		}

		if (typeof r.left === "number" && typeof r.top === "number" &&
			typeof r.right === "number" && typeof r.bottom === "number") {
			return true;
		}

		return false;
	};

	$.ig.util.rectFromLiteral = function (r) {
		if (r == null) {
			return new $.ig.Rect(0, 0, 0, 0, 0);
		}

		var cast = $.ig.util.cast($.ig.Rect.prototype.$type, r);
		if (cast != null) {
			return cast;
		}

		// Test for Rect literal
		if (typeof r.x === "number" && typeof r.y === "number" &&
			typeof r.width === "number" && typeof r.height === "number") {
			return new $.ig.Rect(0, r.x, r.y, r.width, r.height);
		}

		return new $.ig.Rect(0, r.left, r.top, r.right - r.left, r.bottom - r.top);
	};

	$.ig.util.rectToLiteral = function (r) {
		var cast = $.ig.util.cast($.ig.Rect.prototype.$type, r);
		if (cast == null) {
			return null;
		}

		return {
			x: cast.x(),
			y: cast.y(),
			width: cast.width(),
			height: cast.height(),
			left: cast.left(),
			top: cast.top(),
			right: cast.right(),
			bottom: cast.bottom()
		};
	};

    $.ig.util.isNaN = function (v) {
		return v !== v; // http://us6.campaign-archive1.com/?u=2cc20705b76fa66ab84a6634f&id=43bf7f05e9
	};

/*<BeginType Name="System.SystemException" />*/
	$.ig.util.defType("SystemException", "Error", {
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}

			$.ig.Error.prototype.init.call(this, 0);
		},
		init1: function (initNumber, message) {
			$.ig.Error.prototype.init1.call(this, 1, message);
		},
		init2: function (initNumber, message, innerException) {
			$.ig.Error.prototype.init2.call(this, 2, message, innerException);
		},
		$type: new $.ig.Type("SystemException", $.ig.Error.prototype.$type)
	}, true);
	/*<EndType Name="System.SystemException" />*/

	/*<BeginType Name="System.FormatException" />*/
	$.ig.util.defType("FormatException", "SystemException", {
		init: function (initNumber) {
			if (initNumber > 0) {
				switch (initNumber) {
					case 1:
						this.init1.apply(this, arguments);
						break;
					case 2:
						this.init2.apply(this, arguments);
						break;
				}
				return;
			}

			$.ig.SystemException.prototype.init.call(this, 0);
		},
		init1: function (initNumber, message) {
			$.ig.SystemException.prototype.init1.call(this, 1, message);
		},
		init2: function (initNumber, message, innerException) {
			$.ig.SystemException.prototype.init2.call(this, 2, message, innerException);
		},
		$type: new $.ig.Type("FormatException", $.ig.SystemException.prototype.$type)
	}, true);
	/*<EndType Name="System.FormatException" />*/

	$.ig.util.defEnum("NumberStyles", true, false, {
		"None": 0,
		"AllowLeadingWhite": 1,
		"AllowTrailingWhite": 2,
		"AllowLeadingSign": 4,
		"Integer": 7,
		"AllowTrailingSign": 8,
		"AllowParentheses": 16,
		"AllowDecimalPoint": 32,
		"AllowThousands": 64,
		"Number": 111,
		"AllowExponent": 128,
		"Float:floatNumber": 167,
		"AllowCurrencySymbol": 256,
		"Currency": 383,
		"Any": 511,
		"AllowHexSpecifier": 512,
		"HexNumber": 515
	});

	$.ig.util.defEnum("CompareOptions", true, false, {
		"None": 0,
		"IgnoreCase": 1,
		"IgnoreNonSpace": 2,
		"IgnoreSymbols": 4,
		"IgnoreKanaType": 8,
		"IgnoreWidth": 16,
		"OrdinalIgnoreCase": 268435456,
		"StringSort": 536870912,
		"Ordinal": 1073741824
	});

	$.ig.util.defEnum("StringComparison", false, false, {
		"CurrentCulture": 0,
		"CurrentCultureIgnoreCase": 1,
		"InvariantCulture": 2,
		"InvariantCultureIgnoreCase": 3,
		"Ordinal": 4,
		"OrdinalIgnoreCase": 5
	});

	$.ig.util.defEnum("DateTimeKind", false, false, {
		"Unspecified": 0,
		"Utc": 1,
		"Local": 2
	});

	$.ig.util.defEnum("SeekOrigin", false, false, {
		"Begin": 0,
		"Current": 1,
		"End": 2
	});

	$.ig.util.defEnum("StringSplitOptions", false, false, {
		"None": 0,
		"RemoveEmptyEntries": 1
	});

	$.ig.util.defEnum("DayOfWeek", false, false, {
		"Sunday": 0,
		"Monday": 1,
		"Tuesday": 2,
		"Wednesday": 3,
		"Thursday": 4,
		"Friday": 5,
		"Saturday": 6
	});

    $.ig.util.defType("DomRenderer", "Object", {

		$type: new $.ig.Type("DomRenderer", null)
	}, true);

	$.ig.util.defType("DomWrapper", "Object", {

		$type: new $.ig.Type("DomWrapper", null)
	}, true);

    $.ig.util.defType("Stream", "Object", {
		init: function () {
		},
		close: function () {
			this.disposeCore(true);
		},
		dispose: function () {
			this.close();
		},
		disposeCore: function (disposing) {
		},
		flush: function () {
		},
		readByte: function () {
			var bytes = [ 0 ];
			var count = this.read(bytes, 0, 1);
			if (count === 0) {
				return -1;
			}

			return bytes[ 0 ];
		},
		writeByte: function (value) {
			this.write([ value ], 0, 1);
		},
		$type: new $.ig.Type("Stream", $.ig.Object.prototype.$type)
	}, true);

/* jshint -W016*/
	$.ig.util.u32BitwiseAnd = function (a, b) {
		var r = a & b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32BitwiseOr = function (a, b) {
		var r = a | b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32BitwiseXor = function (a, b) {
		var r = a ^ b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	$.ig.util.u32LS = function (a, b) {
		var r = a << b;

		if (r < 0) {
			r += 4294967296;
		}

		return r;
	};

	window.$ig_c = function (t) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
		$.ig.$currDefinitions = t;
	};

	$.ig.util.toString$1 = function ($t, v) {
		if (v !== null && $t) {
			if ($t.isNullable) {
				$t = $t.typeArguments[ 0 ];
			}

			if ($t.isEnumType) {
				return $t.InstanceConstructor.prototype.$getName(v);
			}
		}

		return v.toString();
	};

	$.ig.util.getDefaultValue = function ($t) {
		if ($t === Number || $t == $.ig.Number.prototype.$type ||
			$t.baseType === $.ig.Enum.prototype.$type) {
			return 0;
		}

		if ($t == Boolean || $t == $.ig.Boolean.prototype.$type) {
			return false;
		}

		if ($t.baseType === $.ig.ValueType.prototype.$type) {
			return $.ig.util.createInstance($t);
		}

		return null;
	};

    export { igRoot };
