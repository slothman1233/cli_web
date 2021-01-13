(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('worker_threads')) :
        typeof define === 'function' && define.amd ? define(['exports', 'worker_threads'], factory) :
            (global = global || self, factory(global.fx = {}, global.worker_threads))
}(this, function (exports, worker_threads) { 

    function unwrapExports (x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x
    }

    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports
    }

    let classCallCheck = createCommonjsModule(function (module, exports) {

        exports.__esModule = true

        exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function')
	  }
        }
    })

    let _classCallCheck = unwrapExports(classCallCheck)

    /**
	 * 绑定方法
	 * @param {Element} obj 绑定的元素
	 * @param {String} type 方法名称
	 * @param {function} fn  绑定的方法
	 */
    let addEvent = function addEvent(obj, type, fn) {
	    if (obj.addEventListener) {
	        obj.addEventListener(type, fn, false)
	    } else {
	        obj['e' + type + fn] = fn
	        obj[type + fn] = function () {
	            obj['e' + type + fn](window.event)
	        }
	        obj.attachEvent('on' + type, obj[type + fn])
	    }
    }

    /**
	 * 解除方法绑定
	 * @param {Element} obj 解除方法绑定的元素
	 * @param {String} type 方法名称
	 * @param {function} fn  解除方法绑定的方法
	 */
    let removeEvent = function removeEvent(obj, type, fn) {
	    if (obj.detachEvent) {
	        obj.detachEvent('on' + type, obj[type + fn])
	        obj[type + fn] = null
	    } else {obj.removeEventListener(type, fn, false)}
    }

    /**
	 * 获取cookie里面的值
	 * @param {String} name cookie名称
	 * @param {String} 对应cookie名称的值  不存在返回null
	 */
    let getCookie = function getCookie(name) {
	    try {
	        let arr,
	            reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	        if (arr = document.cookie.match(reg)) {
	            //  return unescape(arr[2]);
	            return decodeURIComponent(arr[2])
	        } else {
	            return null
	        }
	    } catch (e) {
	        return null
	    }
    }

    /**
	 * 写入cookie
	 * @param {String} name  cookie名
	 * @param {String} value cookie值
	 * @param {String} time  存储时间 收一个字符是代表的时间名词
	                        s20是代表20秒
	                        h是指小时，如12小时则是：h12
	                        d是天数，30天则：d30
	 */
    let setCookie = function setCookie(name, value, time) {
	    let strsec = getsec(time)
	    let exp = new Date()
	    exp.setTime(exp.getTime() + strsec * 1)
	    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
    }
    function getsec(str) {
	    let str1 = parseFloat(str.substring(1, str.length))
	    let str2 = str.substring(0, 1)
	    switch (str2) {
	        case 's':
	            return str1 * 1000
	        case 'm':
	            return str1 * 60 * 1000
	        case 'h':
	            return str1 * 60 * 60 * 1000
	        default:
	            return str1 * 24 * 60 * 60 * 1000
	    }
    }

    /**
	 * 获取链接的参数
	 * @param {String} name 参数名
	 * @return {String} 对应参数名的值  不存在返回null
	 */
    let GetQueryString = function GetQueryString(name) {
	    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	    let r = window.location.search.substr(1).match(reg)
	    if (r != null) {return r[2]}
	    return null
    }

    /**
	 * 获取链接hash后面的参数
	 * @param {String} name hash名称
	 * @param {String} 对应的hash名称的值
	 */
    let GethashString = function GethashString(name) {
	    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	    let h = window.location.hash
	    let r = h.substr(h.lastIndexOf('?') + 1).match(reg)
	    if (r != null) {return r[2]}
	    return null
    }

    // 7.1.4 ToInteger
    let ceil = Math.ceil
    let floor = Math.floor
    let _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it)
    }

    // 7.2.1 RequireObjectCoercible(argument)
    let _defined = function (it) {
	  if (it == undefined) {throw TypeError('Can\'t call method on  ' + it)}
	  return it
    }

    // true  -> String#at
    // false -> String#codePointAt
    let _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    let s = String(_defined(that))
	    let i = _toInteger(pos)
	    let l = s.length
	    let a, b
	    if (i < 0 || i >= l) {return TO_STRING ? '' : undefined}
	    a = s.charCodeAt(i)
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000
	  }
    }

    let _library = true

    let _global = createCommonjsModule(function (module) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        let global = module.exports = typeof window !== 'undefined' && window.Math == Math
	  ? window : typeof self !== 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')()
        if (typeof __g === 'number') {__g = global} // eslint-disable-line no-undef
    })

    let _core = createCommonjsModule(function (module) {
        let core = module.exports = { version: '2.6.1' }
        if (typeof __e === 'number') {__e = core} // eslint-disable-line no-undef
    })
    let _core_1 = _core.version

    let _aFunction = function (it) {
	  if (typeof it !== 'function') {throw TypeError(it + ' is not a function!')}
	  return it
    }

    // optional / simple context binding

    let _ctx = function (fn, that, length) {
	  _aFunction(fn)
	  if (that === undefined) {return fn}
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a)
	    }
	    case 2: return function (a, b) {
	      return fn.call(that, a, b)
	    }
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c)
	    }
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments)
	  }
    }

    let _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function'
    }

    let _anObject = function (it) {
	  if (!_isObject(it)) {throw TypeError(it + ' is not an object!')}
	  return it
    }

    let _fails = function (exec) {
	  try {
	    return !!exec()
	  } catch (e) {
	    return true
	  }
    }

    // Thank's IE8 for his funny defineProperty
    let _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7 } }).a != 7
    })

    let document$1 = _global.document
    // typeof document.createElement is 'object' in old IE
    let is = _isObject(document$1) && _isObject(document$1.createElement)
    let _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {}
    }

    let _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7 } }).a != 7
    })

    // 7.1.1 ToPrimitive(input [, PreferredType])

    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    let _toPrimitive = function (it, S) {
	  if (!_isObject(it)) {return it}
	  let fn, val
	  if (S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) {return val}
	  if (typeof (fn = it.valueOf) === 'function' && !_isObject(val = fn.call(it))) {return val}
	  if (!S && typeof (fn = it.toString) === 'function' && !_isObject(val = fn.call(it))) {return val}
	  throw TypeError('Can\'t convert object to primitive value')
    }

    let dP = Object.defineProperty

    let f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O)
	  P = _toPrimitive(P, true)
	  _anObject(Attributes)
	  if (_ie8DomDefine) {try {
	    return dP(O, P, Attributes)
	  } catch (e) { /* empty */ }}
	  if ('get' in Attributes || 'set' in Attributes) {throw TypeError('Accessors not supported!')}
	  if ('value' in Attributes) {O[P] = Attributes.value}
	  return O
    }

    let _objectDp = {
        f: f
    }

    let _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  }
    }

    let _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value))
    } : function (object, key, value) {
	  object[key] = value
	  return object
    }

    let hasOwnProperty = {}.hasOwnProperty
    let _has = function (it, key) {
	  return hasOwnProperty.call(it, key)
    }

    let PROTOTYPE = 'prototype'

    var $export = function (type, name, source) {
	  let IS_FORCED = type & $export.F
	  let IS_GLOBAL = type & $export.G
	  let IS_STATIC = type & $export.S
	  let IS_PROTO = type & $export.P
	  let IS_BIND = type & $export.B
	  let IS_WRAP = type & $export.W
	  let exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
	  let expProto = exports[PROTOTYPE]
	  let target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE]
	  let key, own, out
	  if (IS_GLOBAL) {source = name}
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined
	    if (own && _has(exports, key)) {continue}
	    // export native or passed
	    out = own ? target[key] : source[key]
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] !== 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      let F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C()
	            case 1: return new C(a)
	            case 2: return new C(a, b)
	          } return new C(a, b, c)
	        } return C.apply(this, arguments)
	      }
	      F[PROTOTYPE] = C[PROTOTYPE]
	      return F
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out === 'function' ? _ctx(Function.call, out) : out
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) {_hide(expProto, key, out)}
	    }
	  }
    }
    // type bitmap
    $export.F = 1   // forced
    $export.G = 2   // global
    $export.S = 4   // static
    $export.P = 8   // proto
    $export.B = 16  // bind
    $export.W = 32  // wrap
    $export.U = 64  // safe
    $export.R = 128 // real proto method for `library`
    let _export = $export

    let _redefine = _hide

    let _iterators = {}

    let toString = {}.toString

    let _cof = function (it) {
	  return toString.call(it).slice(8, -1)
    }

    // fallback for non-array-like ES3 and non-enumerable old V8 strings

    // eslint-disable-next-line no-prototype-builtins
    let _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it)
    }

    // to indexed object, toObject with fallback for non-array-like ES3 strings


    let _toIobject = function (it) {
	  return _iobject(_defined(it))
    }

    // 7.1.15 ToLength

    let min = Math.min
    let _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0 // pow(2, 53) - 1 == 9007199254740991
    }

    let max = Math.max
    let min$1 = Math.min
    let _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index)
	  return index < 0 ? max(index + length, 0) : min$1(index, length)
    }

    // false -> Array#indexOf
    // true  -> Array#includes



    let _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    let O = _toIobject($this)
	    let length = _toLength(O.length)
	    let index = _toAbsoluteIndex(fromIndex, length)
	    let value
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) {while (length > index) {
	      value = O[index++]
	      // eslint-disable-next-line no-self-compare
	      if (value != value) {return true}
	    // Array#indexOf ignores holes, Array#includes - not
	    }} else {for (;length > index; index++) {if (IS_INCLUDES || index in O) {
	      if (O[index] === el) {return IS_INCLUDES || index || 0}
	    }}} return !IS_INCLUDES && -1
	  }
    }

    let _shared = createCommonjsModule(function (module) {
        let SHARED = '__core-js_shared__'
        let store = _global[SHARED] || (_global[SHARED] = {});

        (module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {})
        })('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
        })
    })

    let id = 0
    let px = Math.random()
    let _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36))
    }

    let shared = _shared('keys')

    let _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key))
    }

    let arrayIndexOf = _arrayIncludes(false)
    let IE_PROTO = _sharedKey('IE_PROTO')

    let _objectKeysInternal = function (object, names) {
	  let O = _toIobject(object)
	  let i = 0
	  let result = []
	  let key
	  for (key in O) {if (key != IE_PROTO) {_has(O, key) && result.push(key)}}
	  // Don't enum bug & hidden keys
	  while (names.length > i) {if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key)
	  }}
	  return result
    }

    // IE 8- don't enum bug keys
    let _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
    ).split(',')

    // 19.1.2.14 / 15.2.3.14 Object.keys(O)



    let _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys)
    }

    let _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O)
	  let keys = _objectKeys(Properties)
	  let length = keys.length
	  let i = 0
	  let P
	  while (length > i) {_objectDp.f(O, P = keys[i++], Properties[P])}
	  return O
    }

    let document$2 = _global.document
    let _html = document$2 && document$2.documentElement

    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



    let IE_PROTO$1 = _sharedKey('IE_PROTO')
    let Empty = function () { /* empty */ }
    let PROTOTYPE$1 = 'prototype'

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  let iframe = _domCreate('iframe')
	  let i = _enumBugKeys.length
	  let lt = '<'
	  let gt = '>'
	  let iframeDocument
	  iframe.style.display = 'none'
	  _html.appendChild(iframe)
	  iframe.src = 'javascript:' // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document
	  iframeDocument.open()
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt)
	  iframeDocument.close()
	  createDict = iframeDocument.F
	  while (i--) {delete createDict[PROTOTYPE$1][_enumBugKeys[i]]}
	  return createDict()
    }

    let _objectCreate = Object.create || function create(O, Properties) {
	  let result
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O)
	    result = new Empty()
	    Empty[PROTOTYPE$1] = null
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O
	  } else {result = createDict()}
	  return Properties === undefined ? result : _objectDps(result, Properties)
    }

    let _wks = createCommonjsModule(function (module) {
        let store = _shared('wks')

        let Symbol = _global.Symbol
        let USE_SYMBOL = typeof Symbol === 'function'

        let $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name))
        }

        $exports.store = store
    })

    let def = _objectDp.f

    let TAG = _wks('toStringTag')

    let _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) {def(it, TAG, { configurable: true, value: tag })}
    }

    let IteratorPrototype = {}

    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    _hide(IteratorPrototype, _wks('iterator'), function () { return this })

    let _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) })
	  _setToStringTag(Constructor, NAME + ' Iterator')
    }

    // 7.1.13 ToObject(argument)

    let _toObject = function (it) {
	  return Object(_defined(it))
    }

    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


    let IE_PROTO$2 = _sharedKey('IE_PROTO')
    let ObjectProto = Object.prototype

    let _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O)
	  if (_has(O, IE_PROTO$2)) {return O[IE_PROTO$2]}
	  if (typeof O.constructor === 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype
	  } return O instanceof Object ? ObjectProto : null
    }

    let ITERATOR = _wks('iterator')
    let BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
    let FF_ITERATOR = '@@iterator'
    let KEYS = 'keys'
    let VALUES = 'values'

    let returnThis = function () { return this }

    let _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next)
	  let getMethod = function (kind) {
	    if (!BUGGY && kind in proto) {return proto[kind]}
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind) }
	      case VALUES: return function values() { return new Constructor(this, kind) }
	    } return function entries() { return new Constructor(this, kind) }
	  }
	  let TAG = NAME + ' Iterator'
	  let DEF_VALUES = DEFAULT == VALUES
	  let VALUES_BUG = false
	  var proto = Base.prototype
	  let $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	  let $default = $native || getMethod(DEFAULT)
	  let $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	  let $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	  let methods, key, IteratorPrototype
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()))
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true)
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] !== 'function') {_hide(IteratorPrototype, ITERATOR, returnThis)}
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true
	    $default = function values() { return $native.call(this) }
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default)
	  }
	  // Plug for library
	  _iterators[NAME] = $default
	  _iterators[TAG] = returnThis
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    }
	    if (FORCED) {for (key in methods) {
	      if (!(key in proto)) {_redefine(proto, key, methods[key])}
	    }} else {_export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods)}
	  }
	  return methods
    }

    let $at = _stringAt(true)

    // 21.1.3.27 String.prototype[@@iterator]()
    _iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated) // target
	  this._i = 0                // next index
        // 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
	  let O = this._t
	  let index = this._i
	  let point
	  if (index >= O.length) {return { value: undefined, done: true }}
	  point = $at(O, index)
	  this._i += point.length
	  return { value: point, done: false }
    })

    let _iterStep = function (done, value) {
	  return { value: value, done: !!done }
    }

    // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()
    let es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated) // target
	  this._i = 0                   // next index
	  this._k = kind                // kind
        // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
	  let O = this._t
	  let kind = this._k
	  let index = this._i++
	  if (!O || index >= O.length) {
	    this._t = undefined
	    return _iterStep(1)
	  }
	  if (kind == 'keys') {return _iterStep(0, index)}
	  if (kind == 'values') {return _iterStep(0, O[index])}
	  return _iterStep(0, [index, O[index]])
    }, 'values')

    // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    _iterators.Arguments = _iterators.Array

    let TO_STRING_TAG = _wks('toStringTag')

    let DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',')

    for (let i = 0; i < DOMIterables.length; i++) {
	  let NAME = DOMIterables[i]
	  let Collection = _global[NAME]
	  let proto = Collection && Collection.prototype
	  if (proto && !proto[TO_STRING_TAG]) {_hide(proto, TO_STRING_TAG, NAME)}
	  _iterators[NAME] = _iterators.Array
    }

    let f$1 = _wks

    let _wksExt = {
        f: f$1
    }

    let iterator = _wksExt.f('iterator')

    let iterator$1 = createCommonjsModule(function (module) {
        module.exports = { 'default': iterator, __esModule: true }
    })

    unwrapExports(iterator$1)

    let _meta = createCommonjsModule(function (module) {
        let META = _uid('meta')


        let setDesc = _objectDp.f
        let id = 0
        let isExtensible = Object.isExtensible || function () {
	  return true
        }
        let FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}))
        })
        let setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } })
        }
        let fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) {return typeof it === 'symbol' ? it : (typeof it === 'string' ? 'S' : 'P') + it}
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) {return 'F'}
	    // not necessary to add metadata
	    if (!create) {return 'E'}
	    // add missing metadata
	    setMeta(it)
	  // return object ID
	  } return it[META].i
        }
        let getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) {return true}
	    // not necessary to add metadata
	    if (!create) {return false}
	    // add missing metadata
	    setMeta(it)
	  // return hash weak collections IDs
	  } return it[META].w
        }
        // add metadata on freeze-family methods calling
        let onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) {setMeta(it)}
	  return it
        }
        var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
        }
    })
    let _meta_1 = _meta.KEY
    let _meta_2 = _meta.NEED
    let _meta_3 = _meta.fastKey
    let _meta_4 = _meta.getWeak
    let _meta_5 = _meta.onFreeze

    let defineProperty = _objectDp.f
    let _wksDefine = function (name) {
	  let $Symbol = _core.Symbol || (_core.Symbol = {})
	  if (name.charAt(0) != '_' && !(name in $Symbol)) {defineProperty($Symbol, name, { value: _wksExt.f(name) })}
    }

    let f$2 = Object.getOwnPropertySymbols

    let _objectGops = {
        f: f$2
    }

    let f$3 = {}.propertyIsEnumerable

    let _objectPie = {
        f: f$3
    }

    // all enumerable object keys, includes symbols



    let _enumKeys = function (it) {
	  let result = _objectKeys(it)
	  let getSymbols = _objectGops.f
	  if (getSymbols) {
	    let symbols = getSymbols(it)
	    let isEnum = _objectPie.f
	    let i = 0
	    let key
	    while (symbols.length > i) {if (isEnum.call(it, key = symbols[i++])) {result.push(key)}}
	  } return result
    }

    // 7.2.2 IsArray(argument)

    let _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array'
    }

    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

    let hiddenKeys = _enumBugKeys.concat('length', 'prototype')

    let f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys)
    }

    let _objectGopn = {
        f: f$4
    }

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

    let gOPN = _objectGopn.f
    let toString$1 = {}.toString

    let windowNames = typeof window === 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : []

    let getWindowNames = function (it) {
	  try {
	    return gOPN(it)
	  } catch (e) {
	    return windowNames.slice()
	  }
    }

    let f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it))
    }

    let _objectGopnExt = {
        f: f$5
    }

    let gOPD = Object.getOwnPropertyDescriptor

    let f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O)
	  P = _toPrimitive(P, true)
	  if (_ie8DomDefine) {try {
	    return gOPD(O, P)
	  } catch (e) { /* empty */ }}
	  if (_has(O, P)) {return _propertyDesc(!_objectPie.f.call(O, P), O[P])}
    }

    let _objectGopd = {
        f: f$6
    }

    // ECMAScript 6 symbols shim





    let META = _meta.KEY



















    let gOPD$1 = _objectGopd.f
    let dP$1 = _objectDp.f
    let gOPN$1 = _objectGopnExt.f
    let $Symbol = _global.Symbol
    let $JSON = _global.JSON
    let _stringify = $JSON && $JSON.stringify
    let PROTOTYPE$2 = 'prototype'
    let HIDDEN = _wks('_hidden')
    let TO_PRIMITIVE = _wks('toPrimitive')
    let isEnum = {}.propertyIsEnumerable
    let SymbolRegistry = _shared('symbol-registry')
    let AllSymbols = _shared('symbols')
    let OPSymbols = _shared('op-symbols')
    let ObjectProto$1 = Object[PROTOTYPE$2]
    let USE_NATIVE = typeof $Symbol === 'function'
    let QObject = _global.QObject
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    let setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    let setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a }
	  })).a != 7
    }) ? function (it, key, D) {
	  let protoDesc = gOPD$1(ObjectProto$1, key)
	  if (protoDesc) {delete ObjectProto$1[key]}
	  dP$1(it, key, D)
	  if (protoDesc && it !== ObjectProto$1) {dP$1(ObjectProto$1, key, protoDesc)}
        } : dP$1

    let wrap = function (tag) {
	  let sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2])
	  sym._k = tag
	  return sym
    }

    let isSymbol = USE_NATIVE && typeof $Symbol.iterator === 'symbol' ? function (it) {
	  return typeof it === 'symbol'
    } : function (it) {
	  return it instanceof $Symbol
    }

    var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) {$defineProperty(OPSymbols, key, D)}
	  _anObject(it)
	  key = _toPrimitive(key, true)
	  _anObject(D)
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) {dP$1(it, HIDDEN, _propertyDesc(1, {}))}
	      it[HIDDEN][key] = true
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) {it[HIDDEN][key] = false}
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) })
	    } return setSymbolDesc(it, key, D)
	  } return dP$1(it, key, D)
    }
    let $defineProperties = function defineProperties(it, P) {
	  _anObject(it)
	  let keys = _enumKeys(P = _toIobject(P))
	  let i = 0
	  let l = keys.length
	  let key
	  while (l > i) {$defineProperty(it, key = keys[i++], P[key])}
	  return it
    }
    let $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P)
    }
    let $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  let E = isEnum.call(this, key = _toPrimitive(key, true))
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) {return false}
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true
    }
    let $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it)
	  key = _toPrimitive(key, true)
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) {return}
	  let D = gOPD$1(it, key)
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) {D.enumerable = true}
	  return D
    }
    let $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  let names = gOPN$1(_toIobject(it))
	  let result = []
	  let i = 0
	  let key
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) {result.push(key)}
	  } return result
    }
    let $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  let IS_OP = it === ObjectProto$1
	  let names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it))
	  let result = []
	  let i = 0
	  let key
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) {result.push(AllSymbols[key])}
	  } return result
    }

    // 19.4.1.1 Symbol([description])
    if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) {throw TypeError('Symbol is not a constructor!')}
	    let tag = _uid(arguments.length > 0 ? arguments[0] : undefined)
	    var $set = function (value) {
	      if (this === ObjectProto$1) {$set.call(OPSymbols, value)}
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) {this[HIDDEN][tag] = false}
	      setSymbolDesc(this, tag, _propertyDesc(1, value))
	    }
	    if (_descriptors && setter) {setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set })}
	    return wrap(tag)
	  }
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k
	  })

	  _objectGopd.f = $getOwnPropertyDescriptor
	  _objectDp.f = $defineProperty
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames
	  _objectPie.f = $propertyIsEnumerable
	  _objectGops.f = $getOwnPropertySymbols

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true)
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name))
	  }
    }

    _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol })

    for (let es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
        ).split(','), j = 0; es6Symbols.length > j;){_wks(es6Symbols[j++])}

    for (let wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {_wksDefine(wellKnownSymbols[k++])}

    _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key)
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) {throw TypeError(sym + ' is not a symbol!')}
	    for (let key in SymbolRegistry) {if (SymbolRegistry[key] === sym) {return key}}
	  },
	  useSetter: function () { setter = true },
	  useSimple: function () { setter = false }
    })

    _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
    })

    // 24.3.2 JSON.stringify(value [, replacer [, space]])
    $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  let S = $Symbol()
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}'
    })), 'JSON', {
	  stringify: function stringify(it) {
	    let args = [it]
	    let i = 1
	    let replacer, $replacer
	    while (arguments.length > i) {args.push(arguments[i++])}
	    $replacer = replacer = args[1]
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) {return} // IE8 returns string on undefined
	    if (!_isArray(replacer)) {replacer = function (key, value) {
	      if (typeof $replacer === 'function') {value = $replacer.call(this, key, value)}
	      if (!isSymbol(value)) {return value}
	    }}
	    args[1] = replacer
	    return _stringify.apply($JSON, args)
	  }
    })

    // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
    $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf)
    // 19.4.3.5 Symbol.prototype[@@toStringTag]
    _setToStringTag($Symbol, 'Symbol')
    // 20.2.1.9 Math[@@toStringTag]
    _setToStringTag(Math, 'Math', true)
    // 24.3.3 JSON[@@toStringTag]
    _setToStringTag(_global.JSON, 'JSON', true)

    _wksDefine('asyncIterator')

    _wksDefine('observable')

    let E__work_gitlab______toolTs_node_modules_coreJs_library_fn_symbol = _core.Symbol

    let symbol = createCommonjsModule(function (module) {
        module.exports = { 'default': E__work_gitlab______toolTs_node_modules_coreJs_library_fn_symbol, __esModule: true }
    })

    unwrapExports(symbol)

    let _typeof_1 = createCommonjsModule(function (module, exports) {

        exports.__esModule = true



        let _iterator2 = _interopRequireDefault(iterator$1)



        let _symbol2 = _interopRequireDefault(symbol)

        let _typeof = typeof _symbol2.default === 'function' && typeof _iterator2.default === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof _symbol2.default === 'function' && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? 'symbol' : typeof obj }

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

        exports.default = typeof _symbol2.default === 'function' && _typeof(_iterator2.default) === 'symbol' ? function (obj) {
	  return typeof obj === 'undefined' ? 'undefined' : _typeof(obj)
        } : function (obj) {
	  return obj && typeof _symbol2.default === 'function' && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? 'symbol' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)
        }
    })

    let _typeof = unwrapExports(_typeof_1)

    /**
	 * 是否是object类型
	 */
    function isObject(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object'
    }

    /**
	 * 判断是否是数组对象类型
	 * @param value 值
	 */
    function isPlain(value) {
	  return isObject(value) && Object.prototype.toString.call(value) === '[object Object]' && value.constructor === Object
    }

    // most Object methods by ES6 should accept primitives



    let _objectSap = function (KEY, exec) {
	  let fn = (_core.Object || {})[KEY] || Object[KEY]
	  let exp = {}
	  exp[KEY] = exec(fn)
	  _export(_export.S + _export.F * _fails(function () { fn(1) }), 'Object', exp)
    }

    // 19.1.2.14 Object.keys(O)



    _objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it))
	  }
    })

    let keys = _core.Object.keys

    let keys$1 = createCommonjsModule(function (module) {
        module.exports = { 'default': keys, __esModule: true }
    })

    let _Object$keys = unwrapExports(keys$1)

    let keys$2 = function keys(object) {
	    return isObject(object) ? _Object$keys(object) : []
    }
    /**
	 * 对象的循环
	 * @param {Object} object 对象
	 * @param {Function} fn(value,key) 回调的函数
	 */
    function each(object, fn) {
	    keys$2(object).forEach(function (key) {
	        return fn(object[key], key)
	    })
    }

    /**
	 * 合并对象
	 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
	 * @param sources 需要合并的对象
	 */
    function mergeOptions() {
	    let result = {}

	    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	        sources[_key] = arguments[_key]
	    }

	    sources.forEach(function (source) {
	        if (!source) {
	            return
	        }
	        each(source, function (value, key) {
	            if (!isPlain(value)) {
	                result[key] = value
	                return
	            }
	            if (!isPlain(result[key])) {
	                result[key] = {}
	            }
	            result[key] = mergeOptions(result[key], value)
	        })
	    })
	    return result
    }

    /**
	 * 递归替换
	 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
	 * @return { object }
	 * @example
	 *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
	 */
    function extend() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key]
	    }

	    if (args.length < 1) {
	        return {}
	    } else if (args.length == 1) {
	        return RecursionSubstitution({}, args[0])
	    } else {
	        let argObj = args[0]
	        for (let ii = 1; ii < args.length; ii++) {
	            argObj = RecursionSubstitution(argObj, args[ii])
	        }
	        return argObj
	    }
	    function RecursionSubstitution(c, f) {
	        if (!c) {c = {}}
	        for (let i in f) {
	            if (f[i] && _typeof(f[i]) == 'object') {
	                c[i] = RecursionSubstitution(c[i], f[i])
	            } else {
	                c[i] = f[i]
	            }
	        }
	        return c
	    }
    }

    /**
	 * 异步加载js文件
	 * @param {Array<string>} fileAry js文件的数组
	 */
    function addScriptLoad(fileAry) {
	    recursion(fileAry, 0)
	    function recursion(fileAry, i) {
	        if (fileAry.length > 0) {
	            ScriptModel(fileAry[i]).onload = function () {
	                if (fileAry.length - 1 != i) {
	                    recursion.call(this, fileAry, ++i)
	                }
	            }
	        }
	        function ScriptModel(src) {
	            let js = document.createElement('script')
	            js.src = src
	            document.getElementsByTagName('head')[0].appendChild(js)
	            return js
	        }
	        return false
	    }
    }

    /**
	 * 异步加载css文件
	 * @param {Array<string>} fileAry css文件的数组
	 */
    function addLinkLoad(fileAry) {
	    recursion(fileAry, 0)
	    function recursion(fileAry, i) {
	        if (fileAry.length > 0) {
	            ScriptModel(fileAry[i]).onload = function () {
	                if (fileAry.length - 1 != i) {
	                    recursion.call(this, fileAry, ++i)
	                }
	            }
	        }
	        function ScriptModel(src) {
	            let link = document.createElement('link')
	            link.href = src
	            link.rel = 'stylesheet'
	            document.getElementsByTagName('head')[0].appendChild(link)
	            return link
	        }
	        return false
	    }
    }

    /**
	 *@param {Object} data 需要转换的数据
	 *@return {Object} FormData
	 */
    function toFormData(data) {
	    let formData = new FormData()
	    if (!data) {return formData}
	    _Object$keys(data).forEach(function (key) {
	        formData.append(key, data[key] !== void 0 ? data[key].toString() : '')
	    })
	    return formData
    }

    /**
	 * 请求回传的状态
	 * @param {string} subCode 状态码
	 * @return {boolean} true 成功 false 失败
	 */
    function dataState(subCode) {
	    let state = subCode.slice(-2)
	    if (state === '00') {return true}
	    return false
    }

    /**
	 * 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符
	 * @param {string} str
	 */
    function strlen(str) {
	    let len = 0
	    for (let i = 0; i < str.length; i++) {
	        let c = str.charCodeAt(i)
	        //单字节加1   
	        if (c >= 0x0001 && c <= 0x007e || 0xff60 <= c && c <= 0xff9f) {
	            len++
	        } else {
	            len += 2
	        }
	    }
	    return len
    }

    /**
	 * 获取元素的下标
	 * @param {Element} Ele 当前元素
	 * @return {number} 元素的下标
	 */
    function index(Ele) {
	    if (Ele.nodeName === 'HTML' || Ele.nodeName === 'BODY') {return 0}
	    let parent = Ele.parentElement
	    let chidren = parent.children
	    for (let i = 0; i < parent.childElementCount; i++) {
	        if (chidren[i] === Ele) {return i}
	    }
	    return 0
    }

    /**
	 * 去掉字符串的前后空格
	 * @param {string} value 字符串
	 * @return {string} 去掉前后空格的字符串
	 */
    function trim(value) {
	    if (Object.prototype.toString.call(value) !== '[object String]') {return value}
	    return value.replace(/^\s*|\s*$/, '')
    }

    /**
	 * 四舍五入保留几位小数点 toFixeds的兼容处理
	 * @param {number|string} value  需要取余的数字
	 * @param  {number|string} N  保留小数点后几位数
	 * @return {string|null}  为null则val不是数字
	 */
    function toFixeds(value, N) {
	    if (isNaN(parseInt(value + ''))) {return null}
	    let val = value.toString()
	    //有小数点
	    let isSpot = function isSpot() {
	        let n = parseFloat(N + ''),
	            v = val.toString(),
	            last = v.slice(v.indexOf('.') + 1 + n, v.indexOf('.') + 2 + n)
	        if (parseInt(last) == 5) {
	            v = v.substr(0, v.indexOf('.') + 1 + n) + 6
	        } else {
	            v = v.substr(0, v.indexOf('.') + 2 + n)
	        }
	        return parseFloat(v).toFixed(n)
	    }
	    // 补足小数点后天的位数
	    let InsufficientFigures = function InsufficientFigures(v) {
	        let i = parseFloat(N + '') - v.slice(v.indexOf('.') + 1).length
	        while (i > 0) {
	            v += '0'
	            i--
	        }
	        return v
	    }
	    if (val.indexOf('.') >= 0) {
	        if (val.slice(val.indexOf('.') + 1).length > N) {
	            return isSpot()
	        } else {
	            return InsufficientFigures(val)
	        }
	    } else {
	        return InsufficientFigures(val + '.0')
	    }
    }

    /**
	 * IE下的children兼容处理
	 * @param {Element} element
	 * @return {Array<Element>}
	 */
    function getChildElementNodes(element) {
	    //第一步是条件语句来判断浏览器是否支持element.children属性
	    //如果支持呢，element.children的值是一个集合而不是undefined
	    if (element.children == 'undefined' || element.children == undefined) {
	        // 既然没有，自己为element元素创建一个children属性，并把函数returnEle的返回值给这个属性
	        element.children = returnEle()
	    }
	    return element.children
	    //element.children等号右边要进行的逻辑操作
	    function returnEle() {
	        var childNodes,
	            EleNodes = [],
	            i = 0,

	        // 等号右边获取的所有节点类型全部赋值给EleNodes这个变量
	        childNodes = element.childNodes
	        //现在要为childNodes里面的节点做循环判断了，我们只要元素节点
	        for (var i = 0; i < childNodes.length; i++) {
	            // 判断节点是不是元素节点想到了两种方法
	            // childNodes[i].nodeType === 1
	            if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(childNodes[i])) || childNodes[i].nodeName === '#text' && childNodes[i].length > 0) {
	                EleNodes.push(childNodes[i])
	            }
	        }
	        return EleNodes
	    }
    }

    let cn = {
	    index: {
	        error: '已经存在改方法名称'
	    },
	    httprequest: {
	        timeOut: '请求超时',
	        noAuthority: '没有权限',
	        parameterError: '参数有误'
	    },
	    dom: {
	        throwWhitespace: '类具有非法空格字符',
	        notElement: '不是元素'
	    },
	    select: {
	        prompt: '请选择'
	    },
	    proportion: {
	        noImg: 'imageUrl参数不正确',
	        noParentEle: '容器元素不正确'
	    }
    }

    let fxClass = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [addEvent, removeEvent, getCookie, setCookie, GetQueryString, GethashString, mergeOptions, extend, addScriptLoad, addLinkLoad, toFormData, dataState, strlen, index, trim, toFixeds, getChildElementNodes].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let compatible = /*#__PURE__*/Object.freeze({
        default: fxClass,
        addEvent: addEvent,
        removeEvent: removeEvent,
        getCookie: getCookie,
        setCookie: setCookie,
        GetQueryString: GetQueryString,
        GethashString: GethashString,
        mergeOptions: mergeOptions,
        extend: extend,
        addScriptLoad: addScriptLoad,
        addLinkLoad: addLinkLoad,
        toFormData: toFormData,
        dataState: dataState,
        strlen: strlen,
        index: index,
        trim: trim,
        toFixeds: toFixeds,
        getChildElementNodes: getChildElementNodes
    })

    let IS_PC = function () {
	    let userAgentInfo = navigator.userAgent
	    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
	    let flag = true
	    for (let v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false
	            break
	        }
	    }
	    return flag
    }()

    let USER_AGENT = window.navigator && window.navigator.userAgent || ''

    /**
	 * 是否是ipad
	 *
	 * @static
	 * @const
	 * @type {Boolean}
	 */
    let IS_IPAD = /iPad/i.test(USER_AGENT)

    /**
	 * 是否是iPhone
	 *

	 * @return {Boolean}
	 */
    let IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD

    /**
	 * 是否是iPod
	 *
	 * @static
	 * @const
	 * @return {Boolean}
	 */
    let IS_IPOD = /iPod/i.test(USER_AGENT)

    /**
	 * 是否是ios
	 *
	 * @return {Boolean}
	 */
    let IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD

    /**
	 * ios的版本号 没有则返回null
	 *
	 * @return {string|null}
	 */
    let IOS_VERSION = function () {
	    let match = USER_AGENT.match(/OS (\d+)_/i)
	    if (match && match[1]) {
	        return match[1]
	    }
	    return null
    }()

    /**
	 * 是否是android
	 *
	 * @return {Boolean}
	 */
    let IS_ANDROID = /Android/i.test(USER_AGENT)

    /**
	 * android的版本号 没有则返回null
	 *
	 * @return {number|string|null}
	 */
    let ANDROID_VERSION = function () {
	    let match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i)
	    if (!match) {
	        return null
	    }
	    let major = match[1] && parseFloat(match[1])
	    let minor = match[2] && parseFloat(match[2])
	    if (major && minor) {
	        return parseFloat(match[1] + '.' + match[2])
	    } else if (major) {
	        return major
	    }
	    return null
    }()

    let webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(USER_AGENT)
    let appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null
    /**
	 * 这是否是本机Android浏览器
	 *
	 * @return {Boolean}
	 */
    let IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537

    /**
	 * 是否是火狐浏览器
	 *
	 * @return {Boolean}
	 */
    let IS_FIREFOX = /Firefox/i.test(USER_AGENT)

    /**
	 * IE的版本号 没有则返回-1
	 *
	 * @return {Number|String|null}
	        -1 不是ie浏览器 Number
	         6/7/8/9/10/11 浏览器的版本 Number
	         'edge'  ie的edge浏览器 String
	 */
    let IE_VERSION = function () {
	    let isIE = USER_AGENT.indexOf('compatible') > -1 && USER_AGENT.indexOf('MSIE') > -1 //判断是否IE<11浏览器  
	    let isEdge = USER_AGENT.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器  
	    let isIE11 = USER_AGENT.indexOf('Trident') > -1 && USER_AGENT.indexOf('rv:11.0') > -1
	    if (isIE) {
	        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
	        reIE.test(USER_AGENT)
	        let fIEVersion = parseFloat(RegExp['$1'])
	        if (fIEVersion == 7) {
	            return 7
	        } else if (fIEVersion == 8) {
	            return 8
	        } else if (fIEVersion == 9) {
	            return 9
	        } else if (fIEVersion == 10) {
	            return 10
	        } else {
	            return 6 //IE版本<=7
	        }
	    } else if (isEdge) {
	        return 'edge' //edge
	    } else if (isIE11) {
	        return 11 //IE11  
	    } else {
	        return -1 //不是ie浏览器
	    }
    }()

    /**
	 * 是否是Edge
	 *
	 * @return {Boolean}
	 */
    let IS_EDGE = /Edge/i.test(USER_AGENT)

    /**
	* 是否是Chrome
	*
	* @return {Boolean}
	*/
    let IS_CHROME = !IS_EDGE && (/Chrome/i.test(USER_AGENT) || /CriOS/i.test(USER_AGENT))

    /**
	 * Chrome的版本号 没有则返回null
	 *
	 * @return {number|string|null}
	 */
    let CHROME_VERSION = function () {
	    let match = USER_AGENT.match(/(Chrome|CriOS)\/(\d+)/)
	    if (match && match[2]) {
	        return parseFloat(match[2])
	    }
	    return null
    }()

    /**
	 * 是否是ios下的Safari
	 *
	 * @return {Boolean}
	 */
    let IS_IOS_SAFARI = /Safari/i.test(USER_AGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE

    /**
	 * 是否是Safari
	 *
	 * @return {Boolean}
	 */
    let IS_SAFARI = (IS_IOS_SAFARI || IS_IOS) && !IS_CHROME

    let fxClass$1 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [IS_PC, IS_IPHONE, IS_IPAD, IS_IPOD, IS_IOS, IOS_VERSION, IS_ANDROID, ANDROID_VERSION, IS_NATIVE_ANDROID, IS_FIREFOX, IE_VERSION, IS_EDGE, IS_CHROME, CHROME_VERSION, IS_IOS_SAFARI, IS_SAFARI].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let browser = /*#__PURE__*/Object.freeze({
        default: fxClass$1,
        IS_PC: IS_PC,
        IS_IPHONE: IS_IPHONE,
        IS_IPAD: IS_IPAD,
        IS_IPOD: IS_IPOD,
        IS_IOS: IS_IOS,
        IOS_VERSION: IOS_VERSION,
        IS_ANDROID: IS_ANDROID,
        ANDROID_VERSION: ANDROID_VERSION,
        IS_NATIVE_ANDROID: IS_NATIVE_ANDROID,
        IS_FIREFOX: IS_FIREFOX,
        IE_VERSION: IE_VERSION,
        IS_EDGE: IS_EDGE,
        IS_CHROME: IS_CHROME,
        CHROME_VERSION: CHROME_VERSION,
        IS_IOS_SAFARI: IS_IOS_SAFARI,
        IS_SAFARI: IS_SAFARI
    })

    let win
    if (typeof window !== 'undefined') {
	    win = window
    } else if (typeof global !== 'undefined') {
	    win = global
    } else if (typeof self !== 'undefined') {
	    win = self
    } else {
	    win = {}
    }
    let window$1 = win

    /**
	 * 获取元素样式表里面的样式
	 * @param {Element} el 获取样式的元素
	 * @param {string} prop 样式的名称
	 * @return {String | Number}
	 * @example
	 *  computedStyle(document.getElementById('id'),"fontSize") ==> "12px"
	 */
    function computedStyle(el, prop) {
	    if (!el || !prop) {
	        return ''
	    }
	    let cs = void 0
	    if (typeof window$1.getComputedStyle === 'function') {
	        cs = window$1.getComputedStyle(el)
	        return cs ? cs[prop] : ''
	    } else {
	        //ie6-8下不兼容
	        if (prop === 'opacity') {
	            //有些属性在浏览器上是不兼容的例如opacity
	            cs = el.currentStyle['filter']
	            let _reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i
	            cs = _reg.test(cs) ? _reg.exec(cs)[1] / 100 : 1
	        }
	        let reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i //去掉单位的正则
	        cs = el.currentStyle[prop]
	        return cs ? reg.test(cs) ? parseFloat(cs) : cs : ''
	    }
    }

    let computedStyle$1 = /*#__PURE__*/Object.freeze({
        computedStyle: computedStyle
    })

    /**
	 * 是否是元素
	 * @param {any} value 元素
	 */
    function isEl(value) {
	  return value && isObject(value) && value.nodeType === 1
    }

    /**
	   * 判断是否是文本
	   * @param {any} value 内容
	   */
    function isTextNode(value) {
	   return isObject(value) && value.nodeType === 3
    }

    // 19.1.2.7 Object.getOwnPropertyNames(O)
    _objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f
    })

    let $Object = _core.Object
    let getOwnPropertyNames = function getOwnPropertyNames(it) {
	  return $Object.getOwnPropertyNames(it)
    }

    let getOwnPropertyNames$1 = createCommonjsModule(function (module) {
        module.exports = { 'default': getOwnPropertyNames, __esModule: true }
    })

    let _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1)

    /**
	 * 添加文本内容的兼容处理
	 * @param {Element} el 需要添加文本的元素
	 * @param {String} text 添加的文本
	 * @return {Element} 元素
	 */
    function textContent(el, text) {
	    if (typeof el.textContent === 'undefined') {
	        el.innerText = text
	    } else {
	        el.textContent = text
	    }
	    return el
    }

    /**
	 * 这是一个混合值，描述要注入到DOM中的内容
	 * 通过某种方法。它可以是以下类型:
	 * 输入     | 描述
	 * string   | 值将被规范化为一个文本节点。
	 * Element  | 值将按原样接受。
	 * TextNode | 值将按原样接受。
	 * Array    | 一维数组，包含字符串、元素、文本节点或函数。这些函数应该返回字符串、元素或文本节点(任何其他返回值，如数组，都将被忽略)。
	 * Function |一个函数，它期望返回一个字符串、元素、文本节点或数组——上面描述的任何其他可能的值。这意味着内容描述符可以是返回函数数组的函数，但是这些二级函数必须返回字符串、元素或文本节点
	 *
	 * 规范化最终插入到DOM中的内容
	 * 这允许广泛的内容定义方法，但有助于保护
	 * 避免陷入简单编写“innerHTML”的陷阱，这是可能的成为XSS关注的对象。
	 *
	 * 元素的内容可以以多种类型传递
	 * 组合，其行为如下:
	 * @param {module:dom~ContentDescriptor} content
	 * @return {Array}
	 */
    function normalizeContent(content) {
	    if (typeof content === 'function') {
	        content = content()
	    }
	    return (Array.isArray(content) ? content : [content]).map(function (value) {
	        if (typeof value === 'function') {
	            value = value()
	        }
	        if (isEl(value) || isTextNode(value)) {
	            return value
	        }
	        if (typeof value === 'string' && /\S/.test(value)) {
	            return document.createTextNode(value)
	        }
	    }).filter(function (value) {
	        return value
	    })
    }

    /**
	 * 添加元素
	 * @param {Element} el 父元素
	 * @param {Array<Element> | Element} content 添加的元素
	 * @return {Element} 父元素
	 */
    function appendContent(el, content) {
	  normalizeContent(content).forEach(function (node) {
	    return el.appendChild(node)
	  })
	  return el
    }

    /**
	 * 传一个元素
	 * @param {String} tagName 标签
	 * @param properties 标签里面的文本内容
	        {
	            className: 'vjs-seek-to-live-text',
	            innerHTML: this.localize('LIVE')
	        }
	 * @param {Object} attributes  添加属性
	 * @param {Array<Element> | Element} content 标签里面添加元素
	 * @return {Element} 返回添加的元素
	 *
	 * @or
	 * 只传入一个参数
	 * @param {String} tagName html代码
	 * @return {Element} 返回需要创建的html代码的元素
	 * @example
	        createEl("<div>adsffadf</div>")
	 */
    function createEl() {
	    let tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div'

	    if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
	        let ele = document.createElement('div')
	        ele.innerHTML = tagName
	        return ele.firstElementChild
	    } else {
	        let properties = (arguments.length <= 1 ? undefined : arguments[1]) || {}
	        let attributes = (arguments.length <= 2 ? undefined : arguments[2]) || {}
	        let content = arguments.length <= 3 ? undefined : arguments[3]
	        let el = document.createElement(tagName)
	        _Object$getOwnPropertyNames(properties).forEach(function (propName) {
	            let val = properties[propName]
	            if (propName === 'textContent') {
	                textContent(el, val)
	            } else {
	                el[propName] = val
	            }
	        })
	        _Object$getOwnPropertyNames(attributes).forEach(function (attrName) {
	            el.setAttribute(attrName, attributes[attrName])
	        })
	        if (content) {
	            appendContent(el, content)
	        }
	        return el
	    }
    }

    /**
	 * 类具有非法空格字符
	 * @param {string} str 字符串
	 * @return {boolean}
	 */
    function throwIfWhitespace(str) {
	    if (/\s/.test(str)) {
	        throw new Error('' + cn.dom.throwWhitespace)
	    }
    }

    /**
	 * 正则表达式化
	 * @param {string} className 正则的匹配内容
	 * @return {RegExp} 正则表达式对象
	 */
    function classRegExp(className) {
	  return new RegExp('(^|\\s)' + className + '($|\\s)')
    }

    /**
	 * 检索元素的类中是否包含该类
	 * @param {Element} element  查找的元素
	 * @param {String} classToCheck 需要匹配的类
	 * @return {boolean} true包含  false包含
	 */
    function hasClass(element, classToCheck) {
	    if (!element) {return false}
	    throwIfWhitespace(classToCheck)
	    if (element.classList) {
	        return element.classList.contains(classToCheck)
	    }
	    return classRegExp(classToCheck).test(element.className)
    }

    /**
	 * 兼容table的innerHTML
	 * @param {HTMLElement} table 需要赋值表格元素
	 * @param {String} html 添加的内容
	 * @return {HTMLElement} 返回table
	 * @example setTableInnerHTML(document.createElement('table'),html) => table
	 */
    function setTableInnerHTML(table, html) {
	    if (navigator && navigator.userAgent.match(/msie/i)) {
	        let temp = table.ownerDocument.createElement('div')
	        temp.innerHTML = '<table><tbody>' + html + '</tbody></table>'
	        if (table.tBodies.length == 0) {
	            let tbody = document.createElement('tbody')
	            table.appendChild(tbody)
	        }
	        table.replaceChild(temp.firstChild.firstChild, table.tBodies[0])
	    } else {
	        table.innerHTML = html
	    }
	    return table
    }

    /**
	 * 获取或判断任意数据类类型的通用方法
	 * @param {any} any 任意数据
	 * @example
	 * var aa=null;
	 * getDataType(aa);
	 * var abc;
	 * getDataType(abc); //[object Undefined] 说明此变量已经声明，但尚未被初始化
	 * var fn=function(){}
	 * getDataType(fn); //[object Function]
	 * getDataType(new Object()); //[object Object]
	 * getDataType("Hello");//[object String]
	 * getDataType(234);//[object Number]
	 * getDataType(true));//[object Boolean]
	 * getDataType(new Date()); //[object Date]
	 * getDataType(new Date().getTime()); //[object Number]
	 * getDataType(document.getElementById("demopic")); //[object HTMLDivElement]
	 * getDataType(document.querySelector('div'));//[object HTMLDivElement]
	 * var nodelist=NodeListToArray(document.getElementsByTagName("*"));
	 * getDataType(nodelist); //[object Array]
	 * getDataType(document.getElementsByTagName("*")); //[object NodeList)]
	 * getDataType(document.querySelectorAll('div')); //[object NodeList)]
	 * //nodelist[10].tagName);
	 * getDataType(/[a-z]/); //[object RegExp]
	 */
    function getDataType(any) {
	    /* (1) Object.prototype.toString.call 方法判断类型：
	    优点：通用，返回"[object String]" 具体object的类型
	    缺点：不能返回继承的类型
	    
	    (2)typeof x
	    缺点：对object类型不能细分；
	    优点：对空null的判断 'undefined'的应用;
	    返回类型有：'undefined' “string” 'number' 'boolean' 'function' 'object'
	    
	    (3) instanceof 能返回具体的类型，只适用于用new关键字创建的对象进行判断
	    */
	    // var baseType=["string","number","boolean"];//基本类型
	    // var refType=["object", "Function","Array","Date"];//引用类型
	    try {
	        let dtype = Object.prototype.toString.call(any)
	        if (dtype == '[object Object]') //IE，某个dom元素对象
	            {
	                try {
	                    if (any.constructor) {
	                        let constructorStr = any.constructor.toString() //obj.constructor可以返回继承的类型
	                        if (constructorStr.indexOf('Array') != -1) {
	                            dtype = '[object Array]'
	                        } else if (constructorStr.indexOf('HTMLCollection') != -1) {
	                            /* IE */
	                            dtype = '[object NodeList]'
	                        } else if (constructorStr.indexOf('function') != -1 && constructorStr.indexOf('Object()') != -1) {
	                            dtype = '[object Object]'
	                        } else {dtype = constructorStr}
	                    }
	                } catch (e) {
	                    return '[object Null]'
	                }
	            } else {
	            if (dtype == '[object HTMLCollection]') {
	                /* FF */
	                dtype = '[object NodeList]'
	            }
	        }
	        return dtype
	    } catch (e) {
	        return 'variable is not defined.'
	    }
    }

    /**
	 * 显示当前元素
	 * @param {Element|NodeList | Array<Element>} ele 需要显示的元素
	 * @return {Element|NodeList | Array<Element>} 返回当前元素
	 */
    function show(ele) {
	    let e = ele
	    let type = getDataType(ele)
	    switch (type) {
	        case '[object String]':
	        case '[object NodeList]':
	        case '[object Array]':
	            for (let i = 0; i < e.length; i++) {
	                if (computedStyle(e[i], 'display') === 'none') {e[i].style.display = 'block'}
	            }
	            break
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                if (computedStyle(ele, 'display') === 'none') {ele.style.display = 'block'}
	            } else {
	                throw new Error('' + cn.dom.notElement)
	            }
	    }
	    return ele
    }

    /**
	 * 隐藏当前元素
	 * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素
	 * @return {Element|NodeList | Array<Element>} 返回当前元素
	 */
    function hide(ele) {
	    let e = ele
	    let type = getDataType(ele)
	    switch (type) {
	        case '[object String]':
	        case '[object NodeList]':
	        case '[object Array]':
	            for (let i = 0; i < e.length; i++) {
	                if (computedStyle(e[i], 'display') !== 'none') {e[i].style.display = 'none'}
	            }
	            break
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                if (computedStyle(ele, 'display') !== 'none') {ele.style.display = 'none'}
	            } else {
	                throw new Error('' + cn.dom.notElement)
	            }
	    }
	    return ele
    }

    /**
	 * 显示/隐藏元素
	 * @param {Element} ele 需要隐藏的元素
	 * @return {Element} 返回当前元素
	 */
    function toggle(ele) {
	    if (!isEl(ele)) {throw new Error('' + cn.dom.notElement)}
	    ele.style.display = computedStyle(ele, 'display') !== 'none' ? 'none' : 'block'
    }

    /**
	 * 当前元素的同辈元素
	 * @param {string | Element} ele 当前元素
	 * @param {Function} callback 每个元素的回调方法
	 * @return {Array<Element>} 返回对象数组
	 * @example
	 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))
	 */
    function siblings(ele, callback) {
	    let e = ele
	    let r = []
	    let type = getDataType(ele)
	    switch (type) {
	        case '[object String]':
	            e = document.querySelector(ele)
	            break
	        case '[object NodeList]':
	            e = ele[0]
	            break
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                e = ele
	            } else {
	                throw new Error('' + cn.dom.notElement)
	            }
	    }
	    let n = e.parentNode.firstChild
	    for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== e) {
	            callback && callback(n)
	            r.push(n)
	        }
	    }
	    return r
    }

    /**
	 * 删除元素的类
	 * @param {Element} ele 元素
	 * @param {string} className 类名
	 * @return {Element}
	 */
    function removeClass(ele, className) {
	    let type = getDataType(ele)
	    if (!/\[object HTML.*Element\]/.test(type)) {
	        throw new Error('' + cn.dom.notElement)
	    }
	    let classAry = ele.className.split(' ')
	    if (classAry.indexOf(className) >= 0) {classAry.splice(classAry.indexOf(className), 1)}
	    ele.className = classAry.join(' ')
	    return ele
    }

    /**
	 * 添加元素的类
	 * @param {Element} ele 元素
	 * @param {string} className 类名
	 * @return {Element}
	 */
    function addClass(ele, className) {
	    let type = getDataType(ele)
	    if (!/\[object HTML.*Element\]/.test(type)) {
	        throw new Error('' + cn.dom.notElement)
	    }
	    let classAry = ele.className.split(' ')
	    if (classAry.indexOf(className) === -1) {classAry.push(className)}
	    ele.className = classAry.join(' ')
	    return ele
    }

    /**
	 * 向当前元素的之后插入一个元素节点
	 * @param {Node} newEl 插入的节点
	 * @param {Node} targetEl 当前的节点
	 * @return {Node} 返回插入的节点
	 */
    function insertAfter(newEl, targetEl) {
	    let parentEl = targetEl.parentNode
	    if (parentEl.lastChild == targetEl) {
	        parentEl.appendChild(newEl)
	    } else {
	        parentEl.insertBefore(newEl, targetEl.nextSibling)
	    }
	    // targetEl.insertAdjacentElement("afterEnd", newEl);
	    return newEl
    }

    /**
	 * 向当前元素的之前插入一个元素节点
	 * @param {Node} newEl 插入的节点
	 * @param {Node} targetEl 当前的节点
	 * @return {Node} 返回插入的节点
	 */
    function insertBefore(newEl, targetEl) {
	  // let parentEl = targetEl.parentNode;
	  targetEl.insertAdjacentElement('beforeBegin', newEl)
	  //parentEl.insertBefore(newEl, targetEl);
	  return newEl
    }

    /**
	 * 元素是否是str所值的元素
	 * @param {Element} ele 比对的元素
	 * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]
	 */
    function eleEqualStr(ele, str) {
	    let eleString = str
	    //判断属性是否相同
	    //判断 [data-id] [data-id=aa] 是否正确
	    if (str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
	        let isb = onlyAttrbuite()
	        if (!isb) {return false}
	        //[data-id] [data-id=aa]
	        if (str.indexOf('[') == 0 && str.indexOf(']') === str.length - 1 && isb) {return true}
	        eleString = str.slice(0, str.indexOf('['))
	    }
	    //id的情况
	    if (eleString.charAt(0) === '#' && ele.id === eleString.slice(1)) {
	        return true
	        //class的情况
	    } else if (eleString.charAt(0) === '.' && hasClass(ele, eleString.slice(1))) {
	        return true
	        //标签的情况
	    } else if (ele.nodeName && ele.nodeName.toUpperCase() === str.toUpperCase()) {
	        return true
	    }
	    //判断 [data-id] [data-id=aa] 是否正确
	    function onlyAttrbuite() {
	        let ary = getTagName(str.slice(str.indexOf('[')))
	        //[data-id]
	        if (ele.getAttribute(ary[0]) && ary[1] === null) {return true}
	        // [data-id=aa]
	        if (ary[1] && ele.getAttribute(ary[0]) && ele.getAttribute(ary[0]) === ary[1]) {return true}
	        return false
	    }
	    return false
    }
    /**
	 * 解析出属性名称和值
	 * @param {string} str [data-id=11]  [data-id] [data-id='a']
	 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
	 */
    function getTagName(str) {
	    if (str.charAt(0) === '[' && str.indexOf(']') === str.length - 1) {
	        str = str.slice(1, -1)
	    }
	    let strAry = str.split('=')
	    if (strAry.length === 2) {
	        if (strAry[1].charAt(0) === '\'' || strAry[1].charAt(0) === '"') {
	            strAry[1] = strAry[1].slice(1, -1)
	        }
	        return strAry
	    }
	    strAry.push(null)
	    return strAry
    }

    /**
	 * 返回指定的父级元素
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element | null} 返回指定的元素，没有则返回null
	 */
    function parent(ele, tag) {
	    if (!tag || tag.length <= 0) {return null}
	    let d = ele.parentElement
	    do {
	        if (eleEqualStr(d, tag)) {
	            return d
	        }
	        if (d.nodeName === 'HTML') {return null}
	        d = d.parentElement
	    } while (d)
	    return null
    }

    /**
	 * 返回指定的父级元素集合
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
	 */
    function parents(ele, tag) {
	    let d = ele.parentElement,
	        eleAry = []
	    if (!tag || tag.length <= 0) {return eleAry}
	    do {
	        if (eleEqualStr(d, tag)) {
	            eleAry.push(d)
	        }
	        if (d.nodeName === 'HTML') {return eleAry}
	        d = d.parentElement
	    } while (d)
	    return eleAry
    }

    /**
	 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
	 * @param {Node} Node 当前元素节点
	 * @param {Element} ele 终止的节点
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的距离
	      * @param {number} left 元素节点离左部的距离
	 */
    function getOffset(Node, ele) {
	    let offset = { top: 0, left: 0 }
	    offsets(Node, offset)
	    function offsets(Node, offset) {
	        if (ele && Node === ele || Node == document.body || !Node) {
	            //当该节点为body节点时，结束递归        
	            return offset
	        }
	        offset.top += Node.offsetTop
	        offset.left += Node.offsetLeft
	        return offsets(Node.offsetParent, offset) //向上累加offset里的值
	    }
	    return offset
    }

    /**
	 * 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
    function getOffsetScroll(ele) {
	    let scroll = { left: 0, top: 0 }
	    let offsetParent = ele.offsetParent
	    while (ele !== offsetParent) {
	        scroll.top += ele.scrollTop
	        scroll.left += ele.scrollLeft
	        ele = ele.parentElement
	    }
	    return scroll
    }

    /**
	 * 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
    function AllScroll(ele) {
	    let scroll = { left: 0, top: 0 }
	    while (ele) {
	        scroll.top += ele.scrollTop
	        scroll.left += ele.scrollLeft
	        ele = ele.parentElement
	    }
	    return scroll
    }

    /**
	 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
    function getoffsetAndScroll(ele) {
	    let scroll = { left: 0, top: 0 }
	    while (ele) {
	        if (ele !== document.body) {
	            scroll.top += ele.offsetTop - ele.scrollTop
	            scroll.left += ele.offsetLeft - ele.scrollLeft
	        }
	        ele = ele.offsetParent
	    }
	    // scroll.top += document.querySelector("html").scrollTop + document.querySelector("body").scrollTop;
	    // scroll.left += document.querySelector("html").scrollLeft + document.querySelector("body").scrollLeft;
	    return scroll
    }

    /**
	* 数组元素交换位置
	* @param {array} arr 数组
	* @param {number} index1 添加项目的位置
	* @param {number} index2 删除项目的位置
	* @return {array} 返回交换后的数组
	* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
	*/
    function swapArray(arr, index1, index2) {
	    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
	    return arr
    }

    /**
	 * 删除元素 兼容IE
	 * @param {Element} ele 需要删除的元素
	 */
    function remove(ele) {
	    if (ele.removeNode) {
	        ele.removeNode(true)
	    } else {
	        ele.remove()
	    }
    }

    /**
	 * 返回指定的子级元素集合
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
	 */
    function find(ele, tag) {
	    let eleAry = []
	    function recursion(ele, tag) {
	        let childrenAll = ele.children
	        if (childrenAll.length > 0) {
	            for (let i = 0; i < childrenAll.length; i++) {
	                if (eleEqualStr(childrenAll[i], tag)) {
	                    eleAry.push(childrenAll[i])
	                }
	                recursion(childrenAll[i], tag)
	            }
	        }
	    }
	    recursion(ele, tag)
	    return eleAry
    }

    let fxClass$2 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [isEl, isTextNode, createEl, textContent, appendContent, normalizeContent, throwIfWhitespace, classRegExp, hasClass, setTableInnerHTML, show, hide, toggle, siblings, removeClass, addClass, insertAfter, insertBefore, parent, parents, getOffset, getOffsetScroll, AllScroll, getoffsetAndScroll, swapArray, remove, find].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let dom = /*#__PURE__*/Object.freeze({
        default: fxClass$2,
        isEl: isEl,
        isTextNode: isTextNode,
        createEl: createEl,
        textContent: textContent,
        appendContent: appendContent,
        normalizeContent: normalizeContent,
        throwIfWhitespace: throwIfWhitespace,
        classRegExp: classRegExp,
        hasClass: hasClass,
        setTableInnerHTML: setTableInnerHTML,
        show: show,
        hide: hide,
        toggle: toggle,
        siblings: siblings,
        removeClass: removeClass,
        addClass: addClass,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        parent: parent,
        parents: parents,
        getOffset: getOffset,
        getOffsetScroll: getOffsetScroll,
        AllScroll: AllScroll,
        getoffsetAndScroll: getoffsetAndScroll,
        swapArray: swapArray,
        remove: remove,
        find: find
    })

    /**
	 * 判断是否是字符串
	 * @param value 值
	 */
    function isString(value) {
	  return Object.prototype.toString.call(value) === '[object String]'
    }

    ///<reference path="../../indexModel.d.ts" />
    /**
	 * NodeList转为数组
	 * @param {NodeList} nodes 对象数组类型
	 * @return {Array} 转化后的数组
	 */
    function NodeListToArray(nodes) {
	    let array = null
	    try {
	        array = Array.prototype.slice.call(nodes, 0)
	    } catch (ex) {
	        array = new Array()
	        for (let i = 0, len = nodes.length; i < len; i++) {
	            array.push(nodes[i])
	        }
	    }
	    return array
    }

    let $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify })
    let stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON$1.stringify.apply($JSON$1, arguments)
    }

    let stringify$1 = createCommonjsModule(function (module) {
        module.exports = { 'default': stringify, __esModule: true }
    })

    let _JSON$stringify = unwrapExports(stringify$1)

    function pySegSort(arr, arr1) {
	    if (!String.prototype.localeCompare) {return null}
	    let letters = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	    let zh = '阿八嚓哒额发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	    let en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	    let reg = new RegExp('^[a-zA-Z]')
	    let segs = []
	    let objs = {}
	    let curr = void 0
	    let index = 0
	    each(letters, function (value, i) {
	        curr = { letter: value, data: [], id: [] }
	        if (value !== 'I' && value !== 'U' && value !== 'V') {
	            each(arr, function (val, item) {
	                if (i <= 0 && arr1 && arr1[item]) {
	                    objs[val] = arr1[item]
	                }
	                if ((!zh[index - 1] || zh[index - 1].localeCompare(val) <= 0) && val.localeCompare(zh[index]) == -1) {
	                    curr.data.push(val)
	                }
	                if (reg.test(val) && en[i - 1] && val[0].toUpperCase() === en[i - 1]) {
	                    curr.data.push(val)
	                }
	            })
	            index++
	        } else {
	            each(arr, function (val, item) {
	                if (reg.test(val) && en[i - 1] && val[0].toUpperCase() === en[i - 1]) {
	                    curr.data.push(val)
	                }
	            })
	        }
	        if (curr.data.length) {
	            segs.push(curr)
	            curr.data.sort(function (a, b) {
	                return a.localeCompare(b)
	            })
	            if (_JSON$stringify(objs) !== '{}') {
	                each(curr.data, function (vals) {
	                    let dataId = objs[vals] ? objs[vals] : 0
	                    curr.id.push(dataId)
	                })
	            }
	        }
	    })
	    return segs
    }

    let fxClass$3 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [isObject, getDataType, each, isPlain, isString, NodeListToArray, pySegSort].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let obj = /*#__PURE__*/Object.freeze({
        default: fxClass$3,
        isObject: isObject,
        getDataType: getDataType,
        each: each,
        isPlain: isPlain,
        isString: isString,
        NodeListToArray: NodeListToArray,
        pySegSort: pySegSort
    })

    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f })

    let $Object$1 = _core.Object
    let defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object$1.defineProperty(it, key, desc)
    }

    let defineProperty$2 = createCommonjsModule(function (module) {
        module.exports = { 'default': defineProperty$1, __esModule: true }
    })

    unwrapExports(defineProperty$2)

    let createClass = createCommonjsModule(function (module, exports) {

        exports.__esModule = true



        let _defineProperty2 = _interopRequireDefault(defineProperty$2)

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

        exports.default = function () {
	  function defineProperties(target, props) {
	    for (let i = 0; i < props.length; i++) {
	      let descriptor = props[i]
	      descriptor.enumerable = descriptor.enumerable || false
	      descriptor.configurable = true
	      if ('value' in descriptor) {descriptor.writable = true}
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor)
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) {defineProperties(Constructor.prototype, protoProps)}
	    if (staticProps) {defineProperties(Constructor, staticProps)}
	    return Constructor
	  }
        }()
    })

    let _createClass = unwrapExports(createClass)

    /**
	 * 发布订阅模式
	 */
    let events = function () {
	    function events() {
	        _classCallCheck(this, events)

	        this.clientList = {}
	    }
	    /**
	    * 添加订阅者
	    * @param {string} key 订阅名称
	    * @param {Function} fn 订阅的函数
	    */


	    _createClass(events, [{
	        key: 'listen',
	        value: function listen(key, fn) {
	            if (!this.clientList[key]) {
	                this.clientList[key] = new Array()
	            }
	            this.clientList[key].push(fn)
	        }
	        /**
	         * 发送消息
	         * @param {string} key 订阅名称
	         * @param {any} arg 函数的参数
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(key) {
	            let _this = this

	            for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                arg[_key - 1] = arguments[_key]
	            }

	            if (!this.clientList[key] || this.clientList[key].length === 0) {
	                return
	            }
	            this.clientList[key].forEach(function (fn) {
	                fn.apply(_this, arg)
	            })
	        }
	        /**
	         * 取消订阅事件
	         * @param {string} key 订阅名称
	         * @param {function} fn 取消的函数 不传等于清空里面的所有的方法
	         */

	    }, {
	        key: 'remove',
	        value: function remove(key, fn) {
	            if (!this.clientList[key]) {
	                return
	            }
	            if (!fn) {
	                this.clientList[key].length = 0
	                return
	            }
	            for (let i = this.clientList[key].length - 1; i >= 0; i--) {
	                if (this.clientList[key][i] == fn) {
	                    this.clientList[key].splice(i, 1)
	                }
	            }
	        }
	    }])

	    return events
    }()
    /**
	 * 动态安装 发布-订阅功能
	 */


    let installEvents = function installEvents() {
	    let obj = new events()
	    return obj
    }

    let subscrible = /*#__PURE__*/Object.freeze({
        installEvents: installEvents
    })

    let log = function log(value) {
	    console.log(value)
    }

    let popup = function popup(value) {
	    alert(value)
    }

    let fxClass$4 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [log, popup].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let log$1 = /*#__PURE__*/Object.freeze({
        default: fxClass$4,
        log: log,
        popup: popup
    })

    /**
	 * 解析出属性名称和值
	 * @param {string} str [data-id=11]  [data-id] [data-id='a']
	 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
	 */
    function getTagName$1(str) {
	    if (str.charAt(0) === '[' && str.indexOf(']') === str.length - 1) {
	        str = str.slice(1, -1)
	    }
	    let strAry = str.split('=')
	    if (strAry.length === 2) {
	        if (strAry[1].charAt(0) === '\'' || strAry[1].charAt(0) === '"') {
	            strAry[1] = strAry[1].slice(1, -1)
	        }
	        return strAry
	    }
	    strAry.push(null)
	    return strAry
    }

    /**
	 * 获取指定的所有对象
	 * @param {String} str 元素的字符串名称
	 * @return {Array<Element>} 返回对象的数组
	 */
    function dom$1(str) {
	    if (!str || str.length <= 0) {return ''}
	    if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(str))) {return str}
	    if (isString(str)) {
	        if (str === 'window') {return window}
	        if (str === 'document') {return document}
	        if (str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
	            let strAry = getTagName$1(str.slice(str.indexOf('[')))
	            if (strAry[1] !== null) {
	                let strValue = '\'' + strAry[1] + '\''
	                str = str.slice(0, str.indexOf('[')) + '[' + strAry[0] + '=' + strValue + ']'
	            }
	        }
	        return document.querySelectorAll(str)
	    } else {
	        return str
	    }
    }

    let event = installEvents() //没有代理对象的缓存
    /**
	 * 兼容 e.path方法
	 * @param {Event} e 需要获取的指针
	 */
    function eventsPath(e) {
	    let ev = e || event
	    if (ev.path || ev.composedPath) {return ev.path || ev.composedPath && ev.composedPath()}
	    let Ary = []
	    let ele = ev.target || ev.srcElement
	    while (ele) {
	        Ary.push(ele)
	        ele = ele.parentElement
	    }
	    return Ary
    }

    ///<reference path="../../indexModel.d.ts" />
    function LoopBinding(ele, cb) {
	    if (/\[object HTML.*Element\]/.test(ele)) {ele = [ele]}
	    for (let i = 0; i < ele.length; i++) {
	        (function (i) {
	            cb(i)
	        })(i)
	    }
    }
    /**
	 * 解除绑定
	 * @param {listenDataModel} data
	    * @param {String | Element} agent 代理对象
	    * @param {Stirng} events 触发的方法
	    * @param {Stirng} ele 事件对象
	    * @param {Function} fn 事件方法
	 * @return {Element} 事件对象
	 * @example
	 *      fx.off({
	    *          agent:document,
	    *          events:"click",
	    *          ele:".aa",
	    *          fn:function(){fx.log(1)}
	    *          })
	    */
    function off(data) {
	    let agentDom = Object.prototype.toString.call(data.agent) === '[object String]' ? dom$1(data.agent)[0] : data.agent
	    let events = dom$1(data.ele)
	    //有代理元素
	    if (data.agent) {
	        removeEvent(agentDom, data.events, data.fn)
	    } else {
	        //没有代理元素的情况
	        LoopBinding(events, function (i) {
	            removeEvent(events[i], data.events, data.fn)
	        })
	    }
    }

    ///<reference path="../../indexModel.d.ts" />
    let event$1 = installEvents() //没有代理对象的缓存
    function LoopBinding$1(ele, cb) {
	    if (/\[object HTML.*Element\]/.test(ele)) {ele = [ele]}
	    for (let i = 0; i < ele.length; i++) {
	        (function (i) {
	            cb(i)
	        })(i)
	    }
    }
    /**
	 * 绑定方法
	 * @param {listenDataModel} data
	    * @param {String | Element} agent 代理对象
	    * @param {Stirng} events 触发的方法
	    * @param {Stirng} ele 事件对象
	    * @param {Function} fn 事件方法
	 * @return {Element} 事件对象
	 * @example
	 *      fx.on({
	 *          agent:document,
	 *          events:"click",
	 *          ele:".aa",
	 *          fn:function(){fx.log(1)}
	 *          })
	 */
    function on(data) {
	    if (!data.fn) {return}
	    let agentDom = dom$1(data.agent)
	    let events = dom$1(data.ele)
	    //有代理元素
	    if (data.agent) {
	        if (agentDom) {if (/\[object HTML.*Element\]/.test(agentDom)) {agentDom = [agentDom]}}
	        (function (data) {
	            LoopBinding$1(agentDom, function (i) {
	                addEvent(agentDom[i], data.events, function (e) {
	                    let ev = e || event$1
	                    let path = eventsPath(ev)
	                    for (let _i = 0; _i < path.length; _i++) {
	                        if (path[_i] === this) {return}
	                        if (path[_i].nodeName === '#document') {return}
	                        if (NodeListToArray(this.querySelectorAll(data.ele)).indexOf(path[_i]) >= 0) {
	                            data.fn(path[_i], ev)
	                        }
	                    }
	                })
	            })
	        })(data)
	    } else {
	        //没有代理元素的情况
	        if (/\[object HTML.*Element\]/.test(events)) {events = [events]}
	        (function (data) {
	            LoopBinding$1(events, function (i) {
	                addEvent(events[i], data.events, function (e) {
	                    let ev = e || event$1
	                    let path = eventsPath(ev)
	                    data.fn(path, ev)
	                })
	            })
	        })(data)
	    }
    }

    /**
	 * 只执行一次的放
	 * @param {Element} dom  元素
	 * @param {String} event  方法名称
	 * @param {Function} callback 执行的方法
	 */
    function once(dom, event, callback) {
	    let handle = function handle() {
	        callback()
	        dom.removeEventListener(event, handle)
	    }
	    dom.addEventListener(event, handle)
    }

    let fxClass$5 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [dom$1, eleEqualStr, eventsPath, getTagName$1, off, on, once].forEach(function (k) {
	        for (let i in k) {
	            if (fxClass.prototype[i]) {}
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let event$2 = /*#__PURE__*/Object.freeze({
        default: fxClass$5,
        dom: dom$1,
        eleEqualStr: eleEqualStr,
        eventsPath: eventsPath,
        getTagName: getTagName$1,
        off: off,
        on: on,
        once: once
    })

    let requestNextAnimationFrames = function () {
	    let originalWebkitRequestAnimationFrame = undefined,
	        wrapper = undefined,
	        geckoVersion = 0,
	        userAgent = navigator.userAgent,
	        index = 0,
	        self = this
	    // Workaround for Chrome 10 bug where Chrome
	    // does not pass the time to the animation function
	    if (window$1.webkitRequestAnimationFrame) {
	        // Define the wrapper
	        wrapper = function wrapper(time) {
	            if (time === undefined) {
	                time = +new Date()
	            }
	            self.callback(time)
	        }
	        // Make the switch
	        originalWebkitRequestAnimationFrame = window$1.webkitRequestAnimationFrame
	        window$1.webkitRequestAnimationFrame = function (callback, element) {
	            self.callback = callback
	            // Browser calls the wrapper and wrapper calls the callback
	            originalWebkitRequestAnimationFrame(wrapper, element)
	        }
	    }
	    // Workaround for Gecko 2.0, which has a bug in
	    // mozRequestAnimationFrame() that restricts animations
	    // to 30-40 fps.
	    if (window$1.mozRequestAnimationFrame) {
	        // Check the Gecko version. Gecko is used by browsers
	        // other than Firefox. Gecko 2.0 corresponds to
	        // Firefox 4.0.
	        index = userAgent.indexOf('rv:')
	        if (userAgent.indexOf('Gecko') != -1) {
	            geckoVersion = userAgent.substr(index + 3, 3)
	            if (geckoVersion === '2.0') {
	                // Forces the return statement to fall through
	                // to the setTimeout() function.
	                window$1.mozRequestAnimationFrame = undefined
	            }
	        }
	    }
	    return window$1.requestAnimationFrame || window$1.webkitRequestAnimationFrame || window$1.mozRequestAnimationFrame || window$1.oRequestAnimationFrame || window$1.msRequestAnimationFrame || function (callback, element) {
	        let start, finish
	        window$1.setTimeout(function () {
	            start = +new Date()
	            callback(start)
	            finish = +new Date()
	            self.timeout = 1000 / 60 - (finish - start)
	        }, self.timeout)
	    }
    }()
    // requestAnimationFrame 的上下文必须是window才能执行
    let requestNextAnimationFrame = requestNextAnimationFrames.bind(window$1)

    let requestNextAnimationFrame$1 = /*#__PURE__*/Object.freeze({
        requestNextAnimationFrame: requestNextAnimationFrame
    })

    let promise = function () {
	    if (!window$1.Promise) {
	        let _Promise = function () {
	            function _Promise() {
	                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	                    arg[_key] = arguments[_key]
	                }

	                _classCallCheck(this, _Promise)

	                let that = this
	                let process = arg[0]
	                that.cache = [] //缓存有的then catch方法
	                that.msg = ''
	                that.enum = {
	                    padding: 'padding',
	                    resolve: 'resolve',
	                    reject: 'reject'
	                }
	                that.status = that.enum.padding
	                process(function () {
	                    that.status = 'resolve'
	                    that.msg = arguments[0]
	                    that.method()
	                }, function () {
	                    that.status = that.enum.reject
	                    that.msg = arguments[0]
	                    that.method()
	                })
	                return that
	            }

	            _createClass(_Promise, [{
	                key: 'method',
	                value: function method() {
	                    let that = this
	                    for (let i = that.cache.length; i > 0; i--) {
	                        let obj = that.cache.shift()
	                        if (obj.type === that.status) {
	                            try {
	                                let msg = obj.fn(that.msg)
	                                that.status = that.enum.resolve
	                                //在then 或者 catch 的返回值 是否是new Promise;
	                                if (!!msg && msg.constructor === _Promise) {
	                                    msg.msg = that.msg
	                                    msg.cache = that.cache
	                                    msg.status = that.status
	                                    return
	                                } else {
	                                    that.msg = msg
	                                }
	                            } catch (e) {
	                                that.msg = e
	                                that.status = 'reject'
	                            }
	                        }
	                    }
	                    return that
	                }
	            }, {
	                key: 'then',
	                value: function then() {
	                    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                        arg[_key2] = arguments[_key2]
	                    }

	                    if (this.status == this.enum.padding) {
	                        this.cache.push({ type: this.enum.resolve, fn: arg[0] })
	                    } else if (this.status == this.enum.resolve) {
	                        this.msg = arg[0](this.msg)
	                    } else if (this.status == this.enum.reject && arg[1]) {
	                        this.msg = arg[1](this.msg)
	                    }
	                    return this
	                }
	            }, {
	                key: 'catch',
	                value: function _catch(callback) {
	                    if (this.status == this.enum.padding) {
	                        this.cache.push({ type: this.enum.reject, fn: callback })
	                    } else if (this.status == this.enum.reject) {
	                        callback(this.msg)
	                    }
	                    return this
	                }
	            }])

	            return _Promise
	        }()

	        _Promise.resolve = function () {
	            for (var _len3 = arguments.length, arg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                arg[_key3] = arguments[_key3]
	            }

	            if (arg.length <= 0) {
	                return new _Promise(function (resolve, reject) {
	                    resolve()
	                })
	            } else {
	                if (arg[0].constructor === _Promise) {
	                    return arg[0]
	                } else {
	                    return new _Promise(function (resolve, reject) {
	                        resolve(arg[0])
	                    })
	                }
	            }
	        }
	        _Promise.reject = function (data) {
	            return new _Promise(function (resolve, reject) {
	                reject(arguments)
	            })
	        }
	        _Promise.all = function (data) {
	            return new _Promise(function (resolve, reject) {
	                let promises = Object.prototype.toString.call(data) !== '[object Array]' ? [data] : data
	                let promiseNum = promises.length
	                let resolvedCounter = 0
	                let resolvedValues = []

	                let _loop = function _loop() {
	                    let index = i
	                    _Promise.resolve(promises[index]).then(function (value) {
	                        resolvedCounter++
	                        resolvedValues[index] = value
	                        if (resolvedCounter == promiseNum) {
	                            return resolve(resolvedValues)
	                        }
	                    }, function (e) {
	                        return reject(e)
	                    })
	                }

	                for (var i = 0; i < promiseNum; i++) {
	                    _loop()
	                }
	            })
	        }
	        return _Promise
	    }
	    return window$1.Promise
    }()

    let promise$1 = /*#__PURE__*/Object.freeze({
        promise: promise
    })

    // getting tag from 19.1.3.6 Object.prototype.toString()

    let TAG$1 = _wks('toStringTag')
    // ES3 wrong here
    let ARG = _cof(function () { return arguments }()) == 'Arguments'

    // fallback for IE11 Script Access Denied error
    let tryGet = function (it, key) {
	  try {
	    return it[key]
	  } catch (e) { /* empty */ }
    }

    let _classof = function (it) {
	  let O, T, B
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) === 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee === 'function' ? 'Arguments' : B
    }

    let _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!')
	  } return it
    }

    // call something on iterator step with safe closing on error

    let _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value)
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    let ret = iterator['return']
	    if (ret !== undefined) {_anObject(ret.call(iterator))}
	    throw e
	  }
    }

    // check on default Array iterator

    let ITERATOR$1 = _wks('iterator')
    let ArrayProto = Array.prototype

    let _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it)
    }

    let ITERATOR$2 = _wks('iterator')

    let core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) {return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)]}
    }

    let _forOf = createCommonjsModule(function (module) {
        let BREAK = {}
        let RETURN = {}
        let exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  let iterFn = ITERATOR ? function () { return iterable } : core_getIteratorMethod(iterable)
	  let f = _ctx(fn, that, entries ? 2 : 1)
	  let index = 0
	  let length, step, iterator, result
	  if (typeof iterFn !== 'function') {throw TypeError(iterable + ' is not iterable!')}
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) {for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index])
	    if (result === BREAK || result === RETURN) {return result}
	  }} else {for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries)
	    if (result === BREAK || result === RETURN) {return result}
	  }}
        }
        exports.BREAK = BREAK
        exports.RETURN = RETURN
    })

    // 7.3.20 SpeciesConstructor(O, defaultConstructor)


    let SPECIES = _wks('species')
    let _speciesConstructor = function (O, D) {
	  let C = _anObject(O).constructor
	  let S
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S)
    }

    // fast apply, http://jsperf.lnkit.com/fast-apply/5
    let _invoke = function (fn, args, that) {
	  let un = that === undefined
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that)
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0])
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1])
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2])
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3])
	  } return fn.apply(that, args)
    }

    let process = _global.process
    let setTask = _global.setImmediate
    let clearTask = _global.clearImmediate
    let MessageChannel = _global.MessageChannel
    let Dispatch = _global.Dispatch
    let counter = 0
    let queue = {}
    let ONREADYSTATECHANGE = 'onreadystatechange'
    let defer, channel, port
    let run = function () {
	  let id = +this
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    let fn = queue[id]
	    delete queue[id]
	    fn()
	  }
    }
    let listener = function (event) {
	  run.call(event.data)
    }
    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    let args = []
	    let i = 1
	    while (arguments.length > i) {args.push(arguments[i++])}
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn === 'function' ? fn : Function(fn), args)
	    }
	    defer(counter)
	    return counter
	  }
	  clearTask = function clearImmediate(id) {
	    delete queue[id]
	  }
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1))
	    }
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1))
	    }
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel()
	    port = channel.port2
	    channel.port1.onmessage = listener
	    defer = _ctx(port.postMessage, port, 1)
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage === 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*')
	    }
	    _global.addEventListener('message', listener, false)
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this)
	        run.call(id)
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0)
	    }
	  }
    }
    let _task = {
	  set: setTask,
	  clear: clearTask
    }

    let macrotask = _task.set
    let Observer = _global.MutationObserver || _global.WebKitMutationObserver
    let process$1 = _global.process
    let Promise = _global.Promise
    let isNode = _cof(process$1) == 'process'

    let _microtask = function () {
	  let head, last, notify

	  let flush = function () {
	    let parent, fn
	    if (isNode && (parent = process$1.domain)) {parent.exit()}
	    while (head) {
	      fn = head.fn
	      head = head.next
	      try {
	        fn()
	      } catch (e) {
	        if (head) {notify()}
	        else {last = undefined}
	        throw e
	      }
	    } last = undefined
	    if (parent) {parent.enter()}
	  }

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush)
	    }
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    let toggle = true
	    let node = document.createTextNode('')
	    new Observer(flush).observe(node, { characterData: true }) // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle
	    }
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    let promise = Promise.resolve(undefined)
	    notify = function () {
	      promise.then(flush)
	    }
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush)
	    }
	  }

	  return function (fn) {
	    let task = { fn: fn, next: undefined }
	    if (last) {last.next = task}
	    if (!head) {
	      head = task
	      notify()
	    } last = task
	  }
    }

    // 25.4.1.5 NewPromiseCapability(C)


    function PromiseCapability(C) {
	  let resolve, reject
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) {throw TypeError('Bad Promise constructor')}
	    resolve = $$resolve
	    reject = $$reject
	  })
	  this.resolve = _aFunction(resolve)
	  this.reject = _aFunction(reject)
    }

    let f$7 = function (C) {
	  return new PromiseCapability(C)
    }

    let _newPromiseCapability = {
        f: f$7
    }

    let _perform = function (exec) {
	  try {
	    return { e: false, v: exec() }
	  } catch (e) {
	    return { e: true, v: e }
	  }
    }

    let navigator$1 = _global.navigator

    let _userAgent = navigator$1 && navigator$1.userAgent || ''

    let _promiseResolve = function (C, x) {
	  _anObject(C)
	  if (_isObject(x) && x.constructor === C) {return x}
	  let promiseCapability = _newPromiseCapability.f(C)
	  let resolve = promiseCapability.resolve
	  resolve(x)
	  return promiseCapability.promise
    }

    let _redefineAll = function (target, src, safe) {
	  for (let key in src) {
	    if (safe && target[key]) {target[key] = src[key]}
	    else {_hide(target, key, src[key])}
	  } return target
    }

    let SPECIES$1 = _wks('species')

    let _setSpecies = function (KEY) {
	  let C = typeof _core[KEY] === 'function' ? _core[KEY] : _global[KEY]
	  if (_descriptors && C && !C[SPECIES$1]) {_objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this }
	  })}
    }

    let ITERATOR$3 = _wks('iterator')
    let SAFE_CLOSING = false

    try {
	  let riter = [7][ITERATOR$3]()
	  riter['return'] = function () { SAFE_CLOSING = true }
    } catch (e) { /* empty */ }

    let _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) {return false}
	  let safe = false
	  try {
	    let arr = [7]
	    let iter = arr[ITERATOR$3]()
	    iter.next = function () { return { done: safe = true } }
	    arr[ITERATOR$3] = function () { return iter }
	    exec(arr)
	  } catch (e) { /* empty */ }
	  return safe
    }

    let task = _task.set
    let microtask = _microtask()




    let PROMISE = 'Promise'
    let TypeError$1 = _global.TypeError
    let process$2 = _global.process
    let versions = process$2 && process$2.versions
    let v8 = versions && versions.v8 || ''
    let $Promise = _global[PROMISE]
    let isNode$1 = _classof(process$2) == 'process'
    let empty = function () { /* empty */ }
    let Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper
    let newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f

    let USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    let promise = $Promise.resolve(1)
	    let FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty)
	    }
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent === 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1
	  } catch (e) { /* empty */ }
    }()

    // helpers
    let isThenable = function (it) {
	  let then
	  return _isObject(it) && typeof (then = it.then) === 'function' ? then : false
    }
    let notify = function (promise, isReject) {
	  if (promise._n) {return}
	  promise._n = true
	  let chain = promise._c
	  microtask(function () {
	    let value = promise._v
	    let ok = promise._s == 1
	    let i = 0
	    let run = function (reaction) {
	      let handler = ok ? reaction.ok : reaction.fail
	      let resolve = reaction.resolve
	      let reject = reaction.reject
	      let domain = reaction.domain
	      let result, then, exited
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) {onHandleUnhandled(promise)}
	            promise._h = 1
	          }
	          if (handler === true) {result = value}
	          else {
	            if (domain) {domain.enter()}
	            result = handler(value) // may throw
	            if (domain) {
	              domain.exit()
	              exited = true
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'))
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject)
	          } else {resolve(result)}
	        } else {reject(value)}
	      } catch (e) {
	        if (domain && !exited) {domain.exit()}
	        reject(e)
	      }
	    }
	    while (chain.length > i) {run(chain[i++])} // variable length - can't use forEach
	    promise._c = []
	    promise._n = false
	    if (isReject && !promise._h) {onUnhandled(promise)}
	  })
    }
    var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    let value = promise._v
	    let unhandled = isUnhandled(promise)
	    let result, handler, console
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise)
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value })
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value)
	        }
	      })
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1
	    } promise._a = undefined
	    if (unhandled && result.e) {throw result.v}
	  })
    }
    var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0
    }
    var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    let handler
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise)
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v })
	    }
	  })
    }
    let $reject = function (value) {
	  let promise = this
	  if (promise._d) {return}
	  promise._d = true
	  promise = promise._w || promise // unwrap
	  promise._v = value
	  promise._s = 2
	  if (!promise._a) {promise._a = promise._c.slice()}
	  notify(promise, true)
    }
    var $resolve = function (value) {
	  let promise = this
	  let then
	  if (promise._d) {return}
	  promise._d = true
	  promise = promise._w || promise // unwrap
	  try {
	    if (promise === value) {throw TypeError$1('Promise can\'t be resolved itself')}
	    if (then = isThenable(value)) {
	      microtask(function () {
	        let wrapper = { _w: promise, _d: false } // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1))
	        } catch (e) {
	          $reject.call(wrapper, e)
	        }
	      })
	    } else {
	      promise._v = value
	      promise._s = 1
	      notify(promise, false)
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e) // wrap
	  }
    }

    // constructor polyfill
    if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h')
	    _aFunction(executor)
	    Internal.call(this)
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1))
	    } catch (err) {
	      $reject.call(this, err)
	    }
	  }
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = []             // <- awaiting reactions
	    this._a = undefined      // <- checked in isUnhandled reactions
	    this._s = 0              // <- state
	    this._d = false          // <- done
	    this._v = undefined      // <- value
	    this._h = 0              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false          // <- notify
	  }
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      let reaction = newPromiseCapability(_speciesConstructor(this, $Promise))
	      reaction.ok = typeof onFulfilled === 'function' ? onFulfilled : true
	      reaction.fail = typeof onRejected === 'function' && onRejected
	      reaction.domain = isNode$1 ? process$2.domain : undefined
	      this._c.push(reaction)
	      if (this._a) {this._a.push(reaction)}
	      if (this._s) {notify(this, false)}
	      return reaction.promise
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected)
	    }
	  })
	  OwnPromiseCapability = function () {
	    let promise = new Internal()
	    this.promise = promise
	    this.resolve = _ctx($resolve, promise, 1)
	    this.reject = _ctx($reject, promise, 1)
	  }
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C)
	  }
    }

    _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise })
    _setToStringTag($Promise, PROMISE)
    _setSpecies(PROMISE)
    Wrapper = _core[PROMISE]

    // statics
    _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    let capability = newPromiseCapability(this)
	    let $$reject = capability.reject
	    $$reject(r)
	    return capability.promise
	  }
    })
    _export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x)
	  }
    })
    _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty)
    })), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    let C = this
	    let capability = newPromiseCapability(C)
	    let resolve = capability.resolve
	    let reject = capability.reject
	    let result = _perform(function () {
	      let values = []
	      let index = 0
	      let remaining = 1
	      _forOf(iterable, false, function (promise) {
	        let $index = index++
	        let alreadyCalled = false
	        values.push(undefined)
	        remaining++
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) {return}
	          alreadyCalled = true
	          values[$index] = value
	          --remaining || resolve(values)
	        }, reject)
	      })
	      --remaining || resolve(values)
	    })
	    if (result.e) {reject(result.v)}
	    return capability.promise
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    let C = this
	    let capability = newPromiseCapability(C)
	    let reject = capability.reject
	    let result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject)
	      })
	    })
	    if (result.e) {reject(result.v)}
	    return capability.promise
	  }
    })

    _export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  let C = _speciesConstructor(this, _core.Promise || _global.Promise)
	  let isFunction = typeof onFinally === 'function'
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x })
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e })
	    } : onFinally
	  )
    } })

    // https://github.com/tc39/proposal-promise-try




    _export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  let promiseCapability = _newPromiseCapability.f(this)
	  let result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v)
	  return promiseCapability.promise
    } })

    let promise$2 = _core.Promise

    let promise$3 = createCommonjsModule(function (module) {
        module.exports = { 'default': promise$2, __esModule: true }
    })

    let _Promise = unwrapExports(promise$3)

    /*
	The MIT License (MIT)

	Copyright (c) 2016 CoderPuppy

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	*/
    let _endianness
    function endianness() {
	  if (typeof _endianness === 'undefined') {
	    let a = new ArrayBuffer(2)
	    let b = new Uint8Array(a)
	    let c = new Uint16Array(a)
	    b[0] = 1
	    b[1] = 2
	    if (c[0] === 258) {
	      _endianness = 'BE'
	    } else if (c[0] === 513){
	      _endianness = 'LE'
	    } else {
	      throw new Error('unable to figure out endianess')
	    }
	  }
	  return _endianness
    }

    function hostname() {
	  if (typeof global.location !== 'undefined') {
	    return global.location.hostname
	  } else {return ''}
    }

    function loadavg() {
	  return []
    }

    function uptime() {
	  return 0
    }

    function freemem() {
	  return Number.MAX_VALUE
    }

    function totalmem() {
	  return Number.MAX_VALUE
    }

    function cpus() {
	  return []
    }

    function type() {
	  return 'Browser'
    }

    function release () {
	  if (typeof global.navigator !== 'undefined') {
	    return global.navigator.appVersion
	  }
	  return ''
    }

    function networkInterfaces(){}
    function getNetworkInterfaces(){}

    function tmpDir() {
	  return '/tmp'
    }
    let tmpdir = tmpDir

    let EOL = '\n'
    let os = {
	  EOL: EOL,
	  tmpdir: tmpdir,
	  tmpDir: tmpDir,
	  networkInterfaces: networkInterfaces,
	  getNetworkInterfaces: getNetworkInterfaces,
	  release: release,
	  type: type,
	  cpus: cpus,
	  totalmem: totalmem,
	  freemem: freemem,
	  uptime: uptime,
	  loadavg: loadavg,
	  hostname: hostname,
	  endianness: endianness,
    }

    let cpusLength = os.cpus().length
    /**
	 * 线程池
	 * @param {string} workerPath 需要在线程里面执行的js文件地址
	 * @param {number} numberOfThreads 启动线程的数量 某人为CPU的数量
	 */

    let workerPool = function () {
	    function workerPool(workerPath) {
	        let numberOfThread = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cpusLength

	        _classCallCheck(this, workerPool)

	        //任务队列
	        this._queue = []
	        // Worker 索引
	        this._workerById = {}
	        // Worker 激活状态索引
	        this._activeWorkerById = {}
	        //启动线程的数量
	        this.numberOfThreads = cpusLength
	        if (numberOfThread < 1) {
	            throw new Error('线程的数量应该大于或等于1!')
	        }
	        this.numberOfThreads = numberOfThread
	        //创建worker
	        for (let i = 0; i < this.numberOfThreads; i++) {
	            let worker = new worker_threads.Worker(workerPath)
	            //保存worker索引
	            this._workerById[i] = worker
	            // 将这些 Worker 设置为未激活状态
	            this._activeWorkerById[i] = false
	        }
	    }
	    /**
	     * 寻找空闲的worker用于执行
	     */


	    _createClass(workerPool, [{
	        key: 'getInactiveWorkerId',
	        value: function getInactiveWorkerId() {
	            for (let i = 0; i < this.numberOfThreads; i++) {
	                if (!this._activeWorkerById[i]) {
	                    return i
	                }
	            }
	            return -1
	        }
	        /**
	         * 调用 Worker 执行
	         * @param {number} workerId worker索引
	         * @param {any} taskObj data传给子线程的参数
	                * error 失败的信息 成功的话error为null
	                * result成功返回的信息
	         */

	    }, {
	        key: 'runWorker',
	        value: function runWorker(workerId, taskObj) {
	            let _this = this

	            let worker = this._workerById[workerId]
	            // 当任务执行完毕后执行
	            let doAfterTaskIsFinished = function doAfterTaskIsFinished() {
	                // 去除所有的 Listener，不然一次次添加不同的 Listener 会 OOM 的
	                worker.removeAllListeners('message')
	                worker.removeAllListeners('error')
	                // 将这个 Worker 设为未激活状态
	                _this._activeWorkerById[workerId] = false
	                if (_this._queue.length > 0) {
	                    // 任务队列非空，使用该 Worker 执行任务队列中第一个任务
	                    _this.runWorker(workerId, _this._queue.shift())
	                }
	            }
	            // 将这个 Worker 设置为激活状态
	            this._activeWorkerById[workerId] = true
	            // 设置两个回调，用于 Worker 的监听器
	            let messageCallback = function messageCallback(result) {
	                taskObj.callback(null, result)
	                doAfterTaskIsFinished()
	            }
	            let errorCallbcak = function errorCallbcak(error) {
	                taskObj.callback(error, null)
	                doAfterTaskIsFinished()
	            }
	            // 为 Worker 添加 'message' 和 'error' 两个 Listener
	            worker.on('message', messageCallback)
	            worker.on('error', errorCallbcak)
	            // 将数据传给 Worker 供其获取和执行
	            worker.postMessage(taskObj.data)
	        }
	        /**
	         * 执行线程
	         * @param {any} data 传给子线程的参数
	         */

	    }, {
	        key: 'run',
	        value: function run(data) {
	            let _this2 = this

	            return new _Promise(function (resolve, reject) {
	                // 调用 getInactiveWorkerId() 获取一个空闲的 Worker
	                let availableWorkerId = _this2.getInactiveWorkerId()
	                let taskObj = {
	                    data: data,
	                    callback: function callback(error, result) {
	                        if (error) {
	                            reject(error)
	                        }
	                        return resolve(result)
	                    }
	                }
	                // 当前没有空闲的 Workers 了，把任务丢进队列里，这样一旦有 Workers 空闲时就会开始执行。
	                if (availableWorkerId === -1) {
	                    _this2._queue.push(taskObj)
	                    return null
	                }
	                // 有一个空闲的 Worker，用它执行任务
	                _this2.runWorker(availableWorkerId, taskObj)
	            })
	        }
	        /**
	         * 清空所有子线程
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

	            for (let i = 0; i < this.numberOfThreads; i++) {
	                if (this._activeWorkerById[i] && !force) {
	                    // 通常情况下，不应该在还有 Worker 在执行的时候就销毁它，这一定是什么地方出了问题，所以还是抛个 Error 比较好
	                    // 不过保留一个 force 参数，总有人用得到的
	                    throw new Error(i + '\u7EBF\u7A0B\u6B63\u5728\u8FD0\u884C\uFF01')
	                }
	                this._workerById[i].terminate()
	            }
	        }
	    }])

	    return workerPool
    }()

    let cpusLength$1 = 1
    /**
	 * 线程池
	 * @param {string} workerPath 需要在线程里面执行的js文件地址
	 * @param {number} numberOfThreads 启动线程的数量 某人为CPU的数量
	 */

    let workerPool$1 = function () {
	    function workerPool(workerPath) {
	        let numberOfThread = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cpusLength$1

	        _classCallCheck(this, workerPool)

	        //任务队列
	        this._queue = []
	        // Worker 索引
	        this._workerById = {}
	        // Worker 激活状态索引
	        this._activeWorkerById = {}
	        //启动线程的数量
	        this.numberOfThreads = cpusLength$1
	        if (numberOfThread < 1) {
	            throw new Error('线程的数量应该大于或等于1!')
	        }
	        this.numberOfThreads = numberOfThread
	        //创建worker
	        for (let i = 0; i < this.numberOfThreads; i++) {
	            let worker = new Worker(workerPath)
	            //保存worker索引
	            this._workerById[i] = worker
	            // 将这些 Worker 设置为未激活状态
	            this._activeWorkerById[i] = false
	        }
	    }
	    /**
	     * 寻找空闲的worker用于执行
	     */


	    _createClass(workerPool, [{
	        key: 'getInactiveWorkerId',
	        value: function getInactiveWorkerId() {
	            for (let i = 0; i < this.numberOfThreads; i++) {
	                if (this._activeWorkerById[i] === false) {
	                    return i
	                }
	            }
	            return -1
	        }
	        /**
	         * 调用 Worker 执行
	         * @param {number} workerId worker索引
	         * @param {any} taskObj data传给子线程的参数
	                * error 失败的信息 成功的话error为null
	                * result成功返回的信息
	         */

	    }, {
	        key: 'runWorker',
	        value: function runWorker(workerId, taskObj) {
	            let _this = this

	            let worker = this._workerById[workerId]
	            // 当任务执行完毕后执行
	            let doAfterTaskIsFinished = function doAfterTaskIsFinished() {
	                // 去除所有的 Listener，不然一次次添加不同的 Listener 会 OOM 的
	                worker.removeEventListener('message', messageCallback)
	                worker.removeEventListener('error', errorCallbcak)
	                // 将这个 Worker 设为未激活状态
	                _this._activeWorkerById[workerId] = false
	                if (_this._queue.length > 0) {
	                    // 任务队列非空，使用该 Worker 执行任务队列中第一个任务
	                    _this.runWorker(workerId, _this._queue.shift())
	                }
	            }
	            // 将这个 Worker 设置为激活状态
	            this._activeWorkerById[workerId] = true
	            // 设置两个回调，用于 Worker 的监听器
	            var messageCallback = function messageCallback(result) {
	                taskObj.callback(null, result)
	                doAfterTaskIsFinished()
	            }
	            var errorCallbcak = function errorCallbcak(error) {
	                taskObj.callback(error, null)
	                doAfterTaskIsFinished()
	            }
	            // 为 Worker 添加 'message' 和 'error' 两个 Listener
	            worker.addEventListener('message', messageCallback)
	            worker.addEventListener('error', errorCallbcak)
	            // 将数据传给 Worker 供其获取和执行
	            worker.postMessage(taskObj.data)
	        }
	        /**
	         * 执行线程
	         * @param {any} data 传给子线程的参数
	         */

	    }, {
	        key: 'run',
	        value: function run(data) {
	            let _this2 = this

	            if (_JSON$stringify(this._activeWorkerById) === '{}') {
	                promise.reject('worker子线程已经被销毁')
	                return
	            }
	            return new promise(function (resolve, reject) {
	                // 调用 getInactiveWorkerId() 获取一个空闲的 Worker
	                let availableWorkerId = _this2.getInactiveWorkerId()
	                let taskObj = {
	                    data: data,
	                    callback: function callback(error, result) {
	                        if (error) {
	                            reject(error)
	                        }
	                        return resolve(result)
	                    }
	                }
	                // 当前没有空闲的 Workers 了，把任务丢进队列里，这样一旦有 Workers 空闲时就会开始执行。
	                if (availableWorkerId === -1) {
	                    _this2._queue.push(taskObj)
	                    return null
	                }
	                // 有一个空闲的 Worker，用它执行任务
	                _this2.runWorker(availableWorkerId, taskObj)
	            })
	        }
	        /**
	         * 清空所有子线程
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

	            for (let i = 0; i < this.numberOfThreads; i++) {
	                if (this._activeWorkerById[i] && !force) {
	                    // 通常情况下，不应该在还有 Worker 在执行的时候就销毁它，这一定是什么地方出了问题，所以还是抛个 Error 比较好
	                    // 不过保留一个 force 参数，总有人用得到的
	                    throw new Error(i + '\u7EBF\u7A0B\u6B63\u5728\u8FD0\u884C\uFF01')
	                }
	                this._workerById[i].terminate()
	            }
	            // Worker 索引
	            this._workerById = {}
	            // Worker 激活状态索引
	            this._activeWorkerById = {}
	        }
	    }])

	    return workerPool
    }()

    let fxClass$6 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [workerPool$1, workerPool].forEach(function (k) {
	        for (let i in k) {
	            fxClass.prototype[i] = k[i]
	        }
	    })
    }

    let index$1 = /*#__PURE__*/Object.freeze({
        default: fxClass$6,
        webwork: workerPool$1,
        serverwork: workerPool
    })

    exports.compatible = compatible
    exports.browser = browser
    exports.computedStyle = computedStyle$1
    exports.dom = dom
    exports.obj = obj
    exports.subscrible = subscrible
    exports.log = log$1
    exports.requestNextAnimationFrame = requestNextAnimationFrame$1
    exports.event = event$2
    exports.promise = promise$1
    exports.work = index$1

    Object.defineProperty(exports, '__esModule', { value: true })

}))
//# sourceMappingURL=index.js.map
