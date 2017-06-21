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

	$.ig.Nullable = Class.extend({
		getUnderlyingType: function (nullableType) {
			if (nullableType.isGenericType !== undefined && nullableType.isGenericType() &&
				!nullableType.isGenericTypeDefinition() &&
				$.ig.Nullable$1.prototype.$type.typeName() == nullableType.typeName()) {
				return nullableType.genericTypeArguments()[ 0 ];
			}

			return null;
		},

		$type: new $.ig.Type("Nullable", $.ig.Object.prototype.$type)
	}, true);

	$.ig.Nullable$1 = Class.extend({
		$t: null,
		init: function ($t, value) {
			this.$t = $t;
			this.$type = this.$type.specialize(this.$t);
			$.ig.Object.prototype.init.call(this);

			if (value !== undefined) {
				this._value = value;
			}
		},
		equals: function (value) {
			return $.ig.util.nullableEquals(this, value);
		},
		getHashCode: function () {
			return this._value === null ? 0 : this._value.getHashCode();
		},
		hasValue: function () {
			return this._value !== null;
		},
		toString: function () {
			return this._value === null ? "" : this._value.toString();
		},
		_value: null,
		value: function (value) {
			if (arguments.length === 1) {
				this._value = value;
				return value;
			} else {
				return this._value;
			}
		},
		getValueOrDefault: function () {
			if (this.hasValue()) {
				return this._value;
			} else {
				return this.getDefaultValue();
			}
		},
		getDefaultValue: function () {
			if ($.ig.util.canAssign($.ig.Number.prototype.$type, this.$t)) {
				return 0;
			} else if ($.ig.util.canAssign($.ig.Boolean.prototype.$type, this.$t)) {
				return false;
			} else if (this.$t.baseType == $.ig.ValueType.prototype.$type) {
				return $.ig.util.createInstance(this.$t);
			} else {
				return null;
			}
		},
		getValueOrDefault1: function (defaultValue) {
			if (this.hasValue()) {
				return this._value;
			} else {
				return defaultValue;
			}
		},
		preIncrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			this._value++;
			return this;
		},
		preDecrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			this._value--;
			return this;
		},
		postIncrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			var originalValue = this._value;
			this._value++;
			return new $.ig.Nullable$1(this.$t, originalValue);
		},
		postDecrement: function () {
			if (!this.hasValue()) {
				return this;
			}

			var originalValue = this._value;
			this._value--;
			return new $.ig.Nullable$1(this.$t, originalValue);
		},
		isNullable: true,
		$type: new $.ig.Type("Nullable$1", $.ig.Object.prototype.$type)
	}, true);

	$.ig.util.toNullable = function (t, value) {

		if (value == null) {
			return t._$nullNullable || (t._$nullNullable = new $.ig.Nullable$1(t, value));
		} else if (value.isNullable) {
			return value;
		}

		return new $.ig.Nullable$1(t, value);
	};

    $.ig.util.nullableAdd = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 + val2);
	};

	$.ig.util.nullableSubtract = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 - val2);
	};

	$.ig.util.nullableMultiply = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 * val2);
	};

	$.ig.util.nullableDivide = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 / val2);
	};

	$.ig.util.nullableModulus = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return null;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return null;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return $.ig.util.toNullable($.ig.Number.prototype.$type, val1 % val2);
	};

	$.ig.util.nullableGreaterThan = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 > val2;
	};

	$.ig.util.nullableGreaterThanOrEqual = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 >= val2;
	};

	$.ig.util.nullableLessThan = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 < val2;
	};

	$.ig.util.nullableLessThanOrEqual = function (v1, v2) {
		if (v1.isNullable && !v1.hasValue()) {
			return false;
		}
		if (v2.isNullable && !v2.hasValue()) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 <= val2;
	};

	$.ig.util.nullableIsNull = function (v) {
		/*jshint eqnull:true */
		return v == null || (!!v.isNullable && !v.hasValue());
	};

	$.ig.util.nullableEquals = function (v1, v2) {
		/*jshint eqnull:true */
		var v1IsNull = (v1 == null) || (!!v1.isNullable && !v1.hasValue());
		var v2IsNull = (v2 == null) || (!!v2.isNullable && !v2.hasValue());

		if (v1IsNull && v2IsNull) {
			return true;
		}
		if (v1IsNull != v2IsNull) {
			return false;
		}

		var val1 = v1;
		var val2 = v2;
		if (v1.isNullable) {
			val1 = v1.value();
		}
		if (v2.isNullable) {
			val2 = v2.value();
		}

		return val1 == val2;
	};

	$.ig.util.nullableNotEquals = function (v1, v2) {
		return !$.ig.util.nullableEquals(v1, v2);
	};

    $.ig.util.unwrapNullable = function (v) {
		/*jshint eqnull:true */
		if (v == null || !v.isNullable) {
			return v;
		}

		if (!v.hasValue()) {
			return null;
		}

		return v.value();
	};

	$.ig.util.wrapNullable = function ($t, v) {
		/*jshint eqnull:true */
		if (v != null && v.isNullable) {
			return v;
		}

		return $.ig.util.toNullable($t, v);
	};

export { igRoot };
