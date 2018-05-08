var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function () {
    Object.defineProperty(Function.prototype, "setupPool", { value: setupPool });
    function setupPool(newPoolSize) {
        if (!(newPoolSize >= 0))
            throw ("setupPool takes a size >= 0 as argument.");
        this.pool = this.pool || [];
        this.poolSize = this.poolSize || 0;
        this.pnew = pnew;
        Object.defineProperty(this.prototype, "pdispose", { value: pdispose });
        while (this.poolSize < newPoolSize) {
            (new this()).pdispose();
        }
        if (this.poolSize > newPoolSize) {
            this.poolSize = newPoolSize;
            this.pool.length = newPoolSize;
        }
    }
    function pnew(p1, p2, p3, p4) {
        var pnewObj = null;
        if (this.poolSize !== 0) {
            this.poolSize--;
            pnewObj = this.pool[this.poolSize];
            this.pool[this.poolSize] = null;
            if (pnewObj.reuse) {
                pnewObj.reuse(p1, p2, p3, p4);
            }
        }
        else {
            pnewObj = new this(p1, p2, p3, p4);
        }
        return pnewObj;
    }
    function pdispose() {
        var thisCttr = this.constructor;
        for (var i = 0; i < thisCttr.poolSize; ++i) {
            if (thisCttr.pool[i] === this) {
                console.log("ERROR already disposed", new Error());
                return;
            }
        }
        if (this.unuse)
            this.unuse();
        thisCttr.pool[thisCttr.poolSize++] = this;
    }
})();
(function () {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    function waitGroupCallByName(arr, funcName, cb) {
        var len = arr.length;
        function next(idx) {
            if (idx >= len) {
                cb();
                return;
            }
            var obj = arr[idx];
            obj[funcName].call(obj, function () {
                next(idx + 1);
            });
        }
        next(0);
    }
    function waitCallNum(num, func, cb) {
        function next(idx) {
            if (idx >= num) {
                cb();
                return;
            }
            func(function () {
                next(idx + 1);
            });
        }
        next(0);
    }
    function waitGroupCallByFunction(arr, func, cb) {
        var len = arr.length;
        function next(idx) {
            if (idx >= len) {
                cb();
                return;
            }
            var obj = arr[idx];
            func(obj, function () {
                next(idx + 1);
            });
        }
        next(0);
    }
    function dateFormat(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (k == "S+") {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (("000" + o[k]).substr(("" + o[k]).length)));
                }
            }
            else {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
        }
        return fmt;
    }
    function fixSpace(s, num) {
        var str = s;
        var len = num - s.length;
        for (var i = 0; i < len; ++i) {
            str += " ";
        }
        return str;
    }
    function paddingGenerator(num) {
        var str = [];
        for (var i = 0; i < num; ++i) {
            str.push(" ");
        }
        return str.join("");
    }
    function wait(time, cb) {
        var timer = setTimeout(cb, time);
        return function () {
            clearTimeout(timer);
        };
    }
    function QueueFunction() {
        this.queues = util.FastArray.pnew();
        this._next = this._next.bind(this);
        this._executing = false;
    }
    QueueFunction.prototype.add = function (cb) {
        this.queues.push(cb);
        if (!this._executing) {
            this._next();
        }
    };
    QueueFunction.prototype._next = function () {
        var len = this.queues.length;
        if (len === 0) {
            this._executing = false;
            this.queues.clear();
            return;
        }
        this._executing = true;
        var cb = this.queues.shift();
        cb(this._next);
    };
    function CacheObjects(createFunc, reuseFunc, clearFunc, initNum) {
        var i;
        this._createFunc = createFunc;
        this._reuseFunc = reuseFunc;
        this._clearFunc = clearFunc;
        this._caches = new FastArray(100);
        if (initNum) {
            if (createFunc) {
                for (i = 0; i <= initNum; ++i) {
                    this._caches.push(createFunc());
                }
            }
            else {
                for (i = 0; i <= initNum; ++i) {
                    this._caches.push({});
                }
            }
        }
    }
    CacheObjects.prototype.get = function (params) {
        if (this._caches.length > 0) {
            var obj = this._caches.pop();
            if (!this._reuseFunc) {
                return obj;
            }
            this._reuseFunc.call(obj, params);
            return obj;
        }
        else {
            if (!this._createFunc) {
                return {};
            }
            return this._createFunc(params);
        }
    };
    CacheObjects.prototype.put = function (obj) {
        if (this._caches.indexOf(obj) != -1) {
            console.log("ERROR: cache twice", obj);
            return;
        }
        if (this._clearFunc) {
            this._clearFunc(obj);
        }
        this._caches.push(obj);
    };
    CacheObjects.prototype.clear = function () {
        var clear = this._clearFunc;
        if (clear) {
            var caches = this._caches;
            for (var i = 0, len = caches.length; i < len; ++i) {
                clear(caches.get(i));
            }
        }
        this._caches.clear();
    };
    function PriorityArrayFuncs() {
        this.funcs = [];
    }
    function ArrayValidFunction() {
        this.funcs = [];
    }
    ArrayValidFunction.prototype.add = function (func) {
        var tempFunc = function (modified, changeInfo) {
            return func.call(null, modified, changeInfo);
        };
        this.funcs.push(tempFunc);
        return function () {
            var idx = funcs.indexOf(tempFunc);
            if (idx != -1) {
                splice(funcs, idx);
            }
        };
    };
    ArrayValidFunction.prototype.process = function (modified, changeInfo) {
        var funcs = this.funcs;
        for (var i = 0, len = funcs.length; i < len; ++i) {
            modified = funcs[i](modified, changeInfo);
        }
        return modified;
    };
    function ArrayPropertyModifyFunction() {
        this.funcs = [];
    }
    ArrayPropertyModifyFunction.prototype.add = function (func) {
        var tempFunc = function (modified, changeInfo) {
            return func.call(null, modified, changeInfo);
        };
        this.funcs.push(tempFunc);
        return function () {
            var idx = funcs.indexOf(tempFunc);
            if (idx != -1) {
                splice(funcs, idx);
            }
        };
    };
    ArrayPropertyModifyFunction.prototype.process = function (modified, changeInfo) {
        var funcs = this.funcs;
        for (var i = 0, len = funcs.length; i < len; ++i) {
            modified = funcs[i](modified, changeInfo);
        }
        return modified;
    };
    function FastArray(initSize) {
        this._start = 0;
        this._length = 0;
        this._finish = 0;
        if (initSize) {
            this._data = new Array(initSize);
        }
        else {
            this._data = [];
        }
    }
    Object.defineProperty(FastArray.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (v) {
            if (v === 0) {
                this.clear();
            }
        }
    });
    FastArray.prototype.unuse = function () {
        for (var i = this._start, len = this._start + this._length; i < len; ++i) {
            this._data[i] = null;
        }
        this._start = 0;
        this._finish = 0;
        this._length = 0;
    };
    FastArray.prototype.clear = function () {
        this._start = 0;
        this._finish = 0;
        this._length = 0;
    };
    FastArray.prototype.clearAndDisposeChildren = function () {
        for (var i = this._start, len = this._start + this._length; i < len; ++i) {
            if (this._data[i].clearAndDisposeChildren) {
                this._data[i].clearAndDisposeChildren();
            }
            this._data[i].pdispose();
            this._data[i] = null;
        }
        this._start = 0;
        this._finish = 0;
        this._length = 0;
    };
    FastArray.prototype.shift = function () {
        this._length--;
        var obj = this._data[this._start];
        this._data[this._start] = null;
        this._start++;
        return obj;
    };
    FastArray.prototype.push = function (obj) {
        this._length++;
        this._data[this._finish] = obj;
        this._finish++;
    };
    FastArray.prototype.pop = function () {
        this._length--;
        this._finish--;
        var obj = this._data[this._finish];
        this._data[this._finish] = null;
        return obj;
    };
    FastArray.prototype.concat = function (arr) {
        var i, len;
        var copy = FastArray.pnew();
        var cData = copy._data;
        var data = this._data;
        var start = this._start;
        var oldlen = this._length;
        for (i = start, len = this._finish; i < len; ++i) {
            cData[i - start] = data[i];
        }
        start = arr._start;
        data = arr._data;
        for (i = start, len = arr._finish; i < len; ++i) {
            cData[i - start + oldlen] = data[i];
        }
        copy._start = 0;
        copy._length = oldlen + len;
        copy._finish = copy._length;
        return copy;
    };
    FastArray.prototype.indexOf = function (obj) {
        for (var i = this._start; i < this._finish; ++i) {
            if (this._data[i] === obj) {
                return i - this._start;
            }
        }
        return -1;
    };
    FastArray.prototype.splice = function (idx) {
        var data = this._data;
        for (var i = this._start + idx, k = i + 1, n = this._finish; k < n; i += 1, k += 1) {
            data[i] = data[k];
        }
        data[this._length - 1] = null;
        this._length--;
        this._finish--;
    };
    FastArray.prototype.erase = function (obj) {
        var idx = this.indexOf(obj);
        if (idx === -1) {
            return;
        }
        this.splice(idx);
    };
    FastArray.prototype.copyFrom = function (arr) {
        this._start = 0;
        var i, len = arr.length;
        if (len === 0) {
            this._finish = 0;
            this._length = 0;
            return;
        }
        this._length = len;
        this._finish = len;
        var data = this._data;
        var adata = arr._data;
        var start = arr._start;
        for (i = 0; i < len; ++i) {
            data[i] = adata[start + i];
        }
    };
    FastArray.prototype.clone = function () {
        var copy = FastArray.pnew();
        copy.copyFrom(this);
        return copy;
    };
    FastArray.prototype.get = function (idx) {
        return this._data[this._start + idx];
    };
    var charForRandomId = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "k", "m", "n", "p", "q", "r", "s", "t", "u", "w", "x", "y", "z"];
    function genRandomId(num) {
        var str = "";
        for (var i = 0; i < num; ++i) {
            str += charForRandomId[Math.floor(Math.random() * charForRandomId.length)];
        }
        return str;
    }
    function splice(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
            list[i] = list[k];
        list.pop();
    }
    function removeFromArray(arr, obj) {
        var idx = arr.indexOf(obj);
        if (idx === -1) {
            return;
        }
        splice(arr, idx);
    }
    function arrayClone(arr) {
        var i = arr.length;
        var copy = new Array(i);
        while (i--)
            copy[i] = arr[i];
        return copy;
    }
    function randomObjects(objs) {
        var k, len = 0;
        for (k in objs) {
            len++;
        }
        var idx = Math.floor(Math.random() * len);
        len = 0;
        for (k in objs) {
            if (idx === len) {
                return objs[k];
            }
            len++;
        }
    }
    function shuffleArray(arr, seed) {
        var rng = new SeedRandom(seed);
        var len = arr.length;
        var tmp, swap;
        for (var i = len; i > 1; --i) {
            tmp = arr[i - 1];
            swap = rng.range(0, i);
            arr[i - 1] = arr[swap];
            arr[swap] = tmp;
        }
    }
    function addArrayToArray(from, to) {
        for (var i = 0; i < from.length; ++i) {
            to.push(from[i]);
        }
    }
    function normalizeObjectsWeights(objs) {
        var normObjs = {};
        var k;
        var total = 0;
        for (k in objs) {
            total += objs[k];
        }
        for (k in objs) {
            normObjs[k] = objs[k] / total;
        }
        return normObjs;
    }
    FastArray.setupPool(10);
    function isNodeJs() {
        return typeof module !== "undefined" && module.exports;
    }
    function numberToPercentage(v) {
        return Math.floor(v * 100) + "%";
    }
    function clampVec(vec, len) {
        var len2 = vec.x * vec.x + vec.y * vec.y;
        if (len2 === 0) {
            return;
        }
        var clen2 = len * len;
        if (len2 == clen2) {
            return;
        }
        var s = Math.sqrt(clen2 / len2);
        vec.x *= s;
        vec.y *= s;
    }
    function assign(o1, o2) {
        var obj = {};
        for (var k in o1) {
            obj[k] = o1[k];
        }
        for (var k in o2) {
            obj[k] = o2[k];
        }
        return obj;
    }
    var util = {
        waitGroupCallByName: waitGroupCallByName,
        waitGroupCallByFunction: waitGroupCallByFunction,
        waitCallNum: waitCallNum,
        dateFormat: dateFormat,
        fixSpace: fixSpace,
        assign: assign,
        paddingGenerator: paddingGenerator,
        wait: wait,
        QueueFunction: QueueFunction,
        CacheObjects: CacheObjects,
        splice: splice,
        arrayClone: arrayClone,
        randomObjects: randomObjects,
        genRandomId: genRandomId,
        FastArray: FastArray,
        isNodeJs: isNodeJs,
        shuffleArray: shuffleArray,
        addArrayToArray: addArrayToArray,
        removeFromArray: removeFromArray,
        normalizeObjectsWeights: normalizeObjectsWeights,
        numberToPercentage: numberToPercentage,
        clampVec: clampVec,
    };
    function addGlobal(name, obj) {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            root[name] = obj;
            define(name, function () {
                return obj;
            });
        }
        else if (freeModule) {
            (freeModule.exports = obj)[name] = obj;
            freeExports[name] = obj;
            root[name] = obj;
        }
        else {
            root[name] = obj;
        }
    }
    addGlobal("util", util);
    addGlobal("addGlobal", addGlobal);
})();
(function () {
    "use strict";
    var internalUtil;
    var domain;
    function EventEmitter(bindObj) {
        EventEmitter.init.call(this);
        if (bindObj) {
            bindObj.on = this.on.bind(this);
            bindObj.emit = this.emit.bind(this);
            bindObj.once = this.once.bind(this);
        }
    }
    addGlobal("EventEmitter", EventEmitter);
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = false;
    EventEmitter.prototype.domain = undefined;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    var defaultMaxListeners = 10;
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function () {
            return defaultMaxListeners;
        },
        set: function (arg) {
            console;
            defaultMaxListeners = arg;
        }
    });
    EventEmitter.init = function () {
        this.domain = null;
        if (EventEmitter.usingDomains) {
            domain = domain || require("domain");
            if (domain.active && !(this instanceof domain.Domain)) {
                this.domain = domain.active;
            }
        }
        if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
            this._events = {};
            this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || undefined;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || isNaN(n))
            throw new TypeError("\"n\" argument must be a positive number");
        this._maxListeners = n;
        return this;
    };
    function $getMaxListeners(that) {
        if (that._maxListeners === undefined)
            return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return $getMaxListeners(this);
    };
    function emitNone(handler, isFn, self) {
        if (isFn)
            handler.call(self);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
                listeners[i].call(self);
        }
    }
    function emitOne(handler, isFn, self, arg1) {
        if (isFn)
            handler.call(self, arg1);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
                listeners[i].call(self, arg1);
        }
    }
    function emitTwo(handler, isFn, self, arg1, arg2) {
        if (isFn)
            handler.call(self, arg1, arg2);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
                listeners[i].call(self, arg1, arg2);
        }
    }
    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
        if (isFn)
            handler.call(self, arg1, arg2, arg3);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
                listeners[i].call(self, arg1, arg2, arg3);
        }
    }
    function emitMany(handler, isFn, self, args) {
        if (isFn)
            handler.apply(self, args);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
                listeners[i].apply(self, args);
        }
    }
    function createWaitCb(num, cb) {
        return function finish() {
            num--;
            if (num <= 0) {
                cb();
            }
        };
    }
    function nextArrIndexNone(idx, len, arr, self, cb) {
        if (idx >= len) {
            cb();
            return;
        }
        arr[idx].call(self, function () {
            nextArrIndexNone(idx + 1, len, arr, self, cb);
        });
    }
    function nextArrIndexOne(idx, len, arr, self, arg1, cb) {
        if (idx >= len) {
            cb();
            return;
        }
        arr[idx].call(self, function () {
            nextArrIndexOne(idx + 1, len, arr, self, arg1, cb);
        }, arg1);
    }
    function nextArrIndexTwo(idx, len, arr, self, arg1, arg2, cb) {
        if (idx >= len) {
            cb();
            return;
        }
        arr[idx].call(self, function () {
            nextArrIndexTwo(idx + 1, len, arr, self, arg1, arg2, cb);
        }, arg1, arg2);
    }
    function nextArrIndexThree(idx, len, arr, self, arg1, arg2, arg3, cb) {
        if (idx >= len) {
            cb();
            return;
        }
        arr[idx].call(self, function () {
            nextArrIndexThree(idx + 1, len, arr, self, arg1, arg2, arg3, cb);
        }, arg1, arg2, arg3);
    }
    function nextArrIndexMany(idx, len, arr, self, args, cb) {
        if (idx >= len) {
            cb();
            return;
        }
        args[0] = function () {
            nextArrIndexMany(idx + 1, len, arr, self, args, cb);
        };
        arr[idx].apply(self, args);
    }
    function emitNoneCb(cb, handler, isFn, self) {
        if (isFn)
            handler.call(self, cb);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            nextArrIndexNone(0, len, listeners, self, cb);
        }
    }
    function emitOneCb(cb, handler, isFn, self, arg1) {
        if (isFn)
            handler.call(self, cb, arg1);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            nextArrIndexOne(0, len, listeners, self, arg1, cb);
        }
    }
    function emitTwoCb(cb, handler, isFn, self, arg1, arg2) {
        if (isFn)
            handler.call(self, cb, arg1, arg2);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            nextArrIndexTwo(0, len, listeners, self, arg1, arg2, cb);
        }
    }
    function emitThreeCb(cb, handler, isFn, self, arg1, arg2, arg3) {
        if (isFn)
            handler.call(self, cb, arg1, arg2, arg3);
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            nextArrIndexThree(0, len, listeners, self, arg1, arg2, arg3, cb);
        }
    }
    function emitManyCb(cb, handler, isFn, self, args) {
        if (isFn) {
            args[0] = cb;
            handler.apply(self, args);
        }
        else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            nextArrIndexMany(0, len, listeners, self, args, cb);
        }
    }
    EventEmitter.prototype.emit = function emit(type) {
        var er, handler, len, args, i, events, domain;
        var needDomainExit = false;
        var doError = (type === "error");
        events = this._events;
        if (events)
            doError = (doError && events.error == null);
        else if (!doError)
            return false;
        domain = this.domain;
        if (doError) {
            er = arguments[1];
            if (domain) {
                if (!er)
                    er = new Error("Uncaught, unspecified \"error\" event");
                er.domainEmitter = this;
                er.domain = domain;
                er.domainThrown = false;
                domain.emit("error", er);
            }
            else if (er instanceof Error) {
                throw er;
            }
            else {
                var err = new Error("Uncaught, unspecified \"error\" event. (" + er + ")");
                err.context = er;
                throw err;
            }
            return false;
        }
        handler = events[type];
        if (!handler)
            return false;
        if (domain && this !== process) {
            domain.enter();
            needDomainExit = true;
        }
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
            case 1:
                emitNone(handler, isFn, this);
                break;
            case 2:
                emitOne(handler, isFn, this, arguments[1]);
                break;
            case 3:
                emitTwo(handler, isFn, this, arguments[1], arguments[2]);
                break;
            case 4:
                emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
                break;
            default:
                args = new Array(len - 1);
                for (i = 1; i < len; i++)
                    args[i - 1] = arguments[i];
                emitMany(handler, isFn, this, args);
        }
        if (needDomainExit)
            domain.exit();
        return true;
    };
    EventEmitter.prototype.emitCb = function emitCb(type, cb) {
        var er, handler, len, args, i, events, domain;
        var needDomainExit = false;
        var doError = (type === "error");
        events = this._events;
        if (events)
            doError = (doError && events.error == null);
        else if (!doError)
            return false;
        domain = this.domain;
        if (doError) {
            er = arguments[2];
            if (domain) {
                if (!er)
                    er = new Error("Uncaught, unspecified \"error\" event");
                er.domainEmitter = this;
                er.domain = domain;
                er.domainThrown = false;
                domain.emit("error", er);
            }
            else if (er instanceof Error) {
                throw er;
            }
            else {
                var err = new Error("Uncaught, unspecified \"error\" event. (" + er + ")");
                err.context = er;
                throw err;
            }
            return false;
        }
        handler = events[type];
        if (!handler) {
            cb();
            return false;
        }
        if (domain && this !== process) {
            domain.enter();
            needDomainExit = true;
        }
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
            case 1:
                emitNoneCb(cb, handler, isFn, this);
                break;
            case 2:
                emitOneCb(cb, handler, isFn, this, arguments[2]);
                break;
            case 3:
                emitTwoCb(cb, handler, isFn, this, arguments[2], arguments[3]);
                break;
            case 4:
                emitThreeCb(cb, handler, isFn, this, arguments[2], arguments[3], arguments[4]);
                break;
            default:
                args = new Array(len - 1);
                for (i = 2; i < len; i++)
                    args[i - 1] = arguments[i];
                emitManyCb(cb, handler, isFn, this, args, len);
        }
        if (needDomainExit)
            domain.exit();
        return true;
    };
    EventEmitter.prototype.addListener = function addListener(type, listener) {
        var _this = this;
        var m;
        var events;
        var existing;
        if (typeof listener !== "function")
            throw new TypeError("\"listener\" argument must be a function");
        events = this._events;
        if (!events) {
            events = this._events = {};
            this._eventsCount = 0;
        }
        else {
            if (events.newListener) {
                this.emit("newListener", type, listener.listener ? listener.listener : listener);
                events = this._events;
            }
            existing = events[type];
        }
        if (!existing) {
            existing = events[type] = listener;
            ++this._eventsCount;
        }
        else {
            if (typeof existing === "function") {
                existing = events[type] = [existing, listener];
            }
            else {
                existing.push(listener);
            }
            if (!existing.warned) {
                m = $getMaxListeners(this);
                if (m && m > 0 && existing.length > m) {
                    existing.warned = true;
                    if (!internalUtil)
                        internalUtil = require("internal/util");
                    internalUtil.error("warning: possible EventEmitter memory " +
                        "leak detected. %d %s listeners added. " +
                        "Use emitter.setMaxListeners() to increase limit.", existing.length, type);
                    console.trace();
                }
            }
        }
        var canceled = false;
        return function () {
            if (canceled) {
                return;
            }
            canceled = true;
            _this.removeListener(type, listener);
        };
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function once(type, listener) {
        if (typeof listener !== "function")
            throw new TypeError("\"listener\" argument must be a function");
        var fired = false;
        function g() {
            this.removeListener(type, g);
            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }
        g.listener = listener;
        return this.on(type, g);
    };
    EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
            var list, events, position, i;
            if (typeof listener !== "function")
                throw new TypeError("\"listener\" argument must be a function");
            events = this._events;
            if (!events)
                return this;
            list = events[type];
            if (!list)
                return this;
            if (list === listener || (list.listener && list.listener === listener)) {
                if (--this._eventsCount === 0)
                    this._events = {};
                else {
                    delete events[type];
                    if (events.removeListener)
                        this.emit("removeListener", type, listener);
                }
            }
            else if (typeof list !== "function") {
                position = -1;
                for (i = list.length; i-- > 0;) {
                    if (list[i] === listener ||
                        (list[i].listener && list[i].listener === listener)) {
                        position = i;
                        break;
                    }
                }
                if (position < 0)
                    return this;
                if (list.length === 1) {
                    list[0] = undefined;
                    if (--this._eventsCount === 0) {
                        this._events = {};
                        return this;
                    }
                    else {
                        delete events[type];
                    }
                }
                else {
                    spliceOne(list, position);
                }
                if (events.removeListener)
                    this.emit("removeListener", type, listener);
            }
            return this;
        };
    EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
            var listeners, events;
            events = this._events;
            if (!events)
                return this;
            if (!events.removeListener) {
                if (arguments.length === 0) {
                    this._events = {};
                    this._eventsCount = 0;
                }
                else if (events[type]) {
                    if (--this._eventsCount === 0)
                        this._events = {};
                    else
                        delete events[type];
                }
                return this;
            }
            if (arguments.length === 0) {
                var keys = Object.keys(events);
                for (var i = 0, key; i < keys.length; ++i) {
                    key = keys[i];
                    if (key === "removeListener")
                        continue;
                    this.removeAllListeners(key);
                }
                this.removeAllListeners("removeListener");
                this._events = {};
                this._eventsCount = 0;
                return this;
            }
            listeners = events[type];
            if (typeof listeners === "function") {
                this.removeListener(type, listeners);
            }
            else if (listeners) {
                do {
                    this.removeListener(type, listeners[listeners.length - 1]);
                } while (listeners[0]);
            }
            return this;
        };
    EventEmitter.prototype.listeners = function listeners(type) {
        var evlistener;
        var ret;
        var events = this._events;
        if (!events)
            ret = [];
        else {
            evlistener = events[type];
            if (!evlistener)
                ret = [];
            else if (typeof evlistener === "function")
                ret = [evlistener];
            else
                ret = arrayClone(evlistener, evlistener.length);
        }
        return ret;
    };
    EventEmitter.listenerCount = function (emitter, type) {
        if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type);
        }
        else {
            return listenerCount.call(emitter, type);
        }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
        var events = this._events;
        if (events) {
            var evlistener = events[type];
            if (typeof evlistener === "function") {
                return 1;
            }
            else if (evlistener) {
                return evlistener.length;
            }
        }
        return 0;
    }
    function spliceOne(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
            list[i] = list[k];
        list.pop();
    }
    function arrayClone(arr, i) {
        var copy = new Array(i);
        while (i--)
            copy[i] = arr[i];
        return copy;
    }
}.call(this));
;
(function () {
    var undefined;
    var VERSION = "4.17.4";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrim = /^\s+|\s+$/g, reTrimStart = /^\s+/, reTrimEnd = /\s+$/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)", rsOrdUpper = "\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
        "Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array",
        "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object",
        "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array",
        "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap",
        "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
        typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
            typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
                typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
                    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
        typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
            typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
                typedArrayTags[errorTag] = typedArrayTags[funcTag] =
                    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
                        typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
                            typedArrayTags[setTag] = typedArrayTags[stringTag] =
                                typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
        cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
            cloneableTags[boolTag] = cloneableTags[dateTag] =
                cloneableTags[float32Tag] = cloneableTags[float64Tag] =
                    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
                        cloneableTags[int32Tag] = cloneableTags[mapTag] =
                            cloneableTags[numberTag] = cloneableTags[objectTag] =
                                cloneableTags[regexpTag] = cloneableTags[setTag] =
                                    cloneableTags[stringTag] = cloneableTags[symbolTag] =
                                        cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
                                            cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
        cloneableTags[weakMapTag] = false;
    var deburredLetters = {
        "\xc0": "A", "\xc1": "A", "\xc2": "A", "\xc3": "A", "\xc4": "A", "\xc5": "A",
        "\xe0": "a", "\xe1": "a", "\xe2": "a", "\xe3": "a", "\xe4": "a", "\xe5": "a",
        "\xc7": "C", "\xe7": "c",
        "\xd0": "D", "\xf0": "d",
        "\xc8": "E", "\xc9": "E", "\xca": "E", "\xcb": "E",
        "\xe8": "e", "\xe9": "e", "\xea": "e", "\xeb": "e",
        "\xcc": "I", "\xcd": "I", "\xce": "I", "\xcf": "I",
        "\xec": "i", "\xed": "i", "\xee": "i", "\xef": "i",
        "\xd1": "N", "\xf1": "n",
        "\xd2": "O", "\xd3": "O", "\xd4": "O", "\xd5": "O", "\xd6": "O", "\xd8": "O",
        "\xf2": "o", "\xf3": "o", "\xf4": "o", "\xf5": "o", "\xf6": "o", "\xf8": "o",
        "\xd9": "U", "\xda": "U", "\xdb": "U", "\xdc": "U",
        "\xf9": "u", "\xfa": "u", "\xfb": "u", "\xfc": "u",
        "\xdd": "Y", "\xfd": "y", "\xff": "y",
        "\xc6": "Ae", "\xe6": "ae",
        "\xde": "Th", "\xfe": "th",
        "\xdf": "ss",
        "\u0100": "A", "\u0102": "A", "\u0104": "A",
        "\u0101": "a", "\u0103": "a", "\u0105": "a",
        "\u0106": "C", "\u0108": "C", "\u010a": "C", "\u010c": "C",
        "\u0107": "c", "\u0109": "c", "\u010b": "c", "\u010d": "c",
        "\u010e": "D", "\u0110": "D", "\u010f": "d", "\u0111": "d",
        "\u0112": "E", "\u0114": "E", "\u0116": "E", "\u0118": "E", "\u011a": "E",
        "\u0113": "e", "\u0115": "e", "\u0117": "e", "\u0119": "e", "\u011b": "e",
        "\u011c": "G", "\u011e": "G", "\u0120": "G", "\u0122": "G",
        "\u011d": "g", "\u011f": "g", "\u0121": "g", "\u0123": "g",
        "\u0124": "H", "\u0126": "H", "\u0125": "h", "\u0127": "h",
        "\u0128": "I", "\u012a": "I", "\u012c": "I", "\u012e": "I", "\u0130": "I",
        "\u0129": "i", "\u012b": "i", "\u012d": "i", "\u012f": "i", "\u0131": "i",
        "\u0134": "J", "\u0135": "j",
        "\u0136": "K", "\u0137": "k", "\u0138": "k",
        "\u0139": "L", "\u013b": "L", "\u013d": "L", "\u013f": "L", "\u0141": "L",
        "\u013a": "l", "\u013c": "l", "\u013e": "l", "\u0140": "l", "\u0142": "l",
        "\u0143": "N", "\u0145": "N", "\u0147": "N", "\u014a": "N",
        "\u0144": "n", "\u0146": "n", "\u0148": "n", "\u014b": "n",
        "\u014c": "O", "\u014e": "O", "\u0150": "O",
        "\u014d": "o", "\u014f": "o", "\u0151": "o",
        "\u0154": "R", "\u0156": "R", "\u0158": "R",
        "\u0155": "r", "\u0157": "r", "\u0159": "r",
        "\u015a": "S", "\u015c": "S", "\u015e": "S", "\u0160": "S",
        "\u015b": "s", "\u015d": "s", "\u015f": "s", "\u0161": "s",
        "\u0162": "T", "\u0164": "T", "\u0166": "T",
        "\u0163": "t", "\u0165": "t", "\u0167": "t",
        "\u0168": "U", "\u016a": "U", "\u016c": "U", "\u016e": "U", "\u0170": "U", "\u0172": "U",
        "\u0169": "u", "\u016b": "u", "\u016d": "u", "\u016f": "u", "\u0171": "u", "\u0173": "u",
        "\u0174": "W", "\u0175": "w",
        "\u0176": "Y", "\u0177": "y", "\u0178": "Y",
        "\u0179": "Z", "\u017b": "Z", "\u017d": "Z",
        "\u017a": "z", "\u017c": "z", "\u017e": "z",
        "\u0132": "IJ", "\u0133": "ij",
        "\u0152": "Oe", "\u0153": "oe",
        "\u0149": "'n", "\u017f": "s"
    };
    var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    };
    var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": "\"",
        "&#39;": "'"
    };
    var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function () {
        try {
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
        }
        catch (e) { }
    }());
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function addMapEntry(map, pair) {
        map.set(pair[0], pair[1]);
        return map;
    }
    function addSetEntry(set, value) {
        set.add(value);
        return set;
    }
    function apply(func, thisArg, args) {
        switch (args.length) {
            case 0: return func.call(thisArg);
            case 1: return func.call(thisArg, args[0]);
            case 2: return func.call(thisArg, args[0], args[1]);
            case 3: return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
    }
    function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }
        return array;
    }
    function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
            if (iteratee(array[length], length, array) === false) {
                break;
            }
        }
        return array;
    }
    function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
            if (!predicate(array[index], index, array)) {
                return false;
            }
        }
        return true;
    }
    function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
                result[resIndex++] = value;
            }
        }
        return result;
    }
    function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
            if (comparator(value, array[index])) {
                return true;
            }
        }
        return false;
    }
    function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
            result[index] = iteratee(array[index], index, array);
        }
        return result;
    }
    function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
            array[offset + index] = values[index];
        }
        return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
            accumulator = array[++index];
        }
        while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
            accumulator = array[--length];
        }
        while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
    }
    function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
            if (predicate(array[index], index, array)) {
                return true;
            }
        }
        return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
        return string.split("");
    }
    function asciiWords(string) {
        return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function (value, key, collection) {
            if (predicate(value, key, collection)) {
                result = key;
                return false;
            }
        });
        return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while ((fromRight ? index-- : ++index < length)) {
            if (predicate(array[index], index, array)) {
                return index;
            }
        }
        return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
        return value === value
            ? strictIndexOf(array, value, fromIndex)
            : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
            if (comparator(array[index], value)) {
                return index;
            }
        }
        return -1;
    }
    function baseIsNaN(value) {
        return value !== value;
    }
    function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? (baseSum(array, iteratee) / length) : NAN;
    }
    function baseProperty(key) {
        return function (object) {
            return object == null ? undefined : object[key];
        };
    }
    function basePropertyOf(object) {
        return function (key) {
            return object == null ? undefined : object[key];
        };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function (value, index, collection) {
            accumulator = initAccum
                ? (initAccum = false, value)
                : iteratee(accumulator, value, index, collection);
        });
        return accumulator;
    }
    function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
            array[length] = array[length].value;
        }
        return array;
    }
    function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined) {
                result = result === undefined ? current : (result + current);
            }
        }
        return result;
    }
    function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
            result[index] = iteratee(index);
        }
        return result;
    }
    function baseToPairs(object, props) {
        return arrayMap(props, function (key) {
            return [key, object[key]];
        });
    }
    function baseUnary(func) {
        return function (value) {
            return func(value);
        };
    }
    function baseValues(object, props) {
        return arrayMap(props, function (key) {
            return object[key];
        });
    }
    function cacheHas(cache, key) {
        return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) { }
        return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) { }
        return index;
    }
    function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
            if (array[length] === placeholder) {
                ++result;
            }
        }
        return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
        return object == null ? undefined : object[key];
    }
    function hasUnicode(string) {
        return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
            result.push(data.value);
        }
        return result;
    }
    function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function (value, key) {
            result[++index] = [key, value];
        });
        return result;
    }
    function overArg(func, transform) {
        return function (arg) {
            return func(transform(arg));
        };
    }
    function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
                array[index] = PLACEHOLDER;
                result[resIndex++] = index;
            }
        }
        return result;
    }
    function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function (value) {
            result[++index] = value;
        });
        return result;
    }
    function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function (value) {
            result[++index] = [value, value];
        });
        return result;
    }
    function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
            if (array[index] === value) {
                return index;
            }
        }
        return index;
    }
    function stringSize(string) {
        return hasUnicode(string)
            ? unicodeSize(string)
            : asciiSize(string);
    }
    function stringToArray(string) {
        return hasUnicode(string)
            ? unicodeToArray(string)
            : asciiToArray(string);
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
            ++result;
        }
        return result;
    }
    function unicodeToArray(string) {
        return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
    }
    var runInContext = (function runInContext(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array = context.Array, Date = context.Date, Error = context.Error, Function = context.Function, Math = context.Math, Object = context.Object, RegExp = context.RegExp, String = context.String, TypeError = context.TypeError;
        var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = (function () {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? ("Symbol(src)_1." + uid) : "";
        }());
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object);
        var oldDash = root._;
        var reIsNative = RegExp("^" +
            funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&")
                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer = moduleExports ? context.Buffer : undefined, Symbol = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined, symIterator = Symbol ? Symbol.iterator : undefined, symToStringTag = Symbol ? Symbol.toStringTag : undefined;
        var defineProperty = (function () {
            try {
                var func = getNative(Object, "defineProperty");
                func({}, "", {});
                return func;
            }
            catch (e) { }
        }());
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date && Date.now !== root.Date.now && Date.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math.ceil, nativeFloor = Math.floor, nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max, nativeMin = Math.min, nativeNow = Date.now, nativeParseInt = context.parseInt, nativeRandom = Math.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map = getNative(context, "Map"), Promise = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object, "create");
        var metaMap = WeakMap && new WeakMap;
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
        function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                if (value instanceof LodashWrapper) {
                    return value;
                }
                if (hasOwnProperty.call(value, "__wrapped__")) {
                    return wrapperClone(value);
                }
            }
            return new LodashWrapper(value);
        }
        var baseCreate = (function () {
            function object() { }
            return function (proto) {
                if (!isObject(proto)) {
                    return {};
                }
                if (objectCreate) {
                    return objectCreate(proto);
                }
                object.prototype = proto;
                var result = new object;
                object.prototype = undefined;
                return result;
            };
        }());
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined;
        }
        lodash.templateSettings = {
            "escape": reEscape,
            "evaluate": reEvaluate,
            "interpolate": reInterpolate,
            "variable": "",
            "imports": {
                "_": lodash
            }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
        }
        function lazyClone() {
            var result = new LazyWrapper(this.__wrapped__);
            result.__actions__ = copyArray(this.__actions__);
            result.__dir__ = this.__dir__;
            result.__filtered__ = this.__filtered__;
            result.__iteratees__ = copyArray(this.__iteratees__);
            result.__takeCount__ = this.__takeCount__;
            result.__views__ = copyArray(this.__views__);
            return result;
        }
        function lazyReverse() {
            if (this.__filtered__) {
                var result = new LazyWrapper(this);
                result.__dir__ = -1;
                result.__filtered__ = true;
            }
            else {
                result = this.clone();
                result.__dir__ *= -1;
            }
            return result;
        }
        function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : (start - 1), iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
                return baseWrapperValue(array, this.__actions__);
            }
            var result = [];
            outer: while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                    var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
                    if (type == LAZY_MAP_FLAG) {
                        value = computed;
                    }
                    else if (!computed) {
                        if (type == LAZY_FILTER_FLAG) {
                            continue outer;
                        }
                        else {
                            break outer;
                        }
                    }
                }
                result[resIndex++] = value;
            }
            return result;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
        }
        function hashDelete(key) {
            var result = this.has(key) && delete this.__data__[key];
            this.size -= result ? 1 : 0;
            return result;
        }
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? undefined : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
            return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
        }
        function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
                return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
                data.pop();
            }
            else {
                splice.call(data, index, 1);
            }
            --this.size;
            return true;
        }
        function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined : data[index][1];
        }
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
                ++this.size;
                data.push([key, value]);
            }
            else {
                data[index][1] = value;
            }
            return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
                "hash": new Hash,
                "map": new (Map || ListCache),
                "string": new Hash
            };
        }
        function mapCacheDelete(key) {
            var result = getMapData(this, key)["delete"](key);
            this.size -= result ? 1 : 0;
            return result;
        }
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
            var data = getMapData(this, key), size = data.size;
            data.set(key, value);
            this.size += data.size == size ? 0 : 1;
            return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values) {
            var index = -1, length = values == null ? 0 : values.length;
            this.__data__ = new MapCache;
            while (++index < length) {
                this.add(values[index]);
            }
        }
        function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
        }
        function setCacheHas(value) {
            return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
        }
        function stackClear() {
            this.__data__ = new ListCache;
            this.size = 0;
        }
        function stackDelete(key) {
            var data = this.__data__, result = data["delete"](key);
            this.size = data.size;
            return result;
        }
        function stackGet(key) {
            return this.__data__.get(key);
        }
        function stackHas(key) {
            return this.__data__.has(key);
        }
        function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
                var pairs = data.__data__;
                if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
                    pairs.push([key, value]);
                    this.size = ++data.size;
                    return this;
                }
                data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
            for (var key in value) {
                if ((inherited || hasOwnProperty.call(value, key)) &&
                    !(skipIndexes && (key == "length" ||
                        (isBuff && (key == "offset" || key == "parent")) ||
                        (isType && (key == "buffer" || key == "byteLength" || key == "byteOffset")) ||
                        isIndex(key, length)))) {
                    result.push(key);
                }
            }
            return result;
        }
        function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined;
        }
        function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
            if ((value !== undefined && !eq(object[key], value)) ||
                (value === undefined && !(key in object))) {
                baseAssignValue(object, key, value);
            }
        }
        function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
                (value === undefined && !(key in object))) {
                baseAssignValue(object, key, value);
            }
        }
        function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
                if (eq(array[length][0], key)) {
                    return length;
                }
            }
            return -1;
        }
        function baseAggregator(collection, setter, iteratee, accumulator) {
            baseEach(collection, function (value, key, collection) {
                setter(accumulator, value, iteratee(value), collection);
            });
            return accumulator;
        }
        function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
                defineProperty(object, key, {
                    "configurable": true,
                    "enumerable": true,
                    "value": value,
                    "writable": true
                });
            }
            else {
                object[key] = value;
            }
        }
        function baseAt(object, paths) {
            var index = -1, length = paths.length, result = Array(length), skip = object == null;
            while (++index < length) {
                result[index] = skip ? undefined : get(object, paths[index]);
            }
            return result;
        }
        function baseClamp(number, lower, upper) {
            if (number === number) {
                if (upper !== undefined) {
                    number = number <= upper ? number : upper;
                }
                if (lower !== undefined) {
                    number = number >= lower ? number : lower;
                }
            }
            return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
            var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
                result = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result !== undefined) {
                return result;
            }
            if (!isObject(value)) {
                return value;
            }
            var isArr = isArray(value);
            if (isArr) {
                result = initCloneArray(value);
                if (!isDeep) {
                    return copyArray(value, result);
                }
            }
            else {
                var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
                if (isBuffer(value)) {
                    return cloneBuffer(value, isDeep);
                }
                if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                    result = (isFlat || isFunc) ? {} : initCloneObject(value);
                    if (!isDeep) {
                        return isFlat
                            ? copySymbolsIn(value, baseAssignIn(result, value))
                            : copySymbols(value, baseAssign(result, value));
                    }
                }
                else {
                    if (!cloneableTags[tag]) {
                        return object ? value : {};
                    }
                    result = initCloneByTag(value, tag, baseClone, isDeep);
                }
            }
            stack || (stack = new Stack);
            var stacked = stack.get(value);
            if (stacked) {
                return stacked;
            }
            stack.set(value, result);
            var keysFunc = isFull
                ? (isFlat ? getAllKeysIn : getAllKeys)
                : (isFlat ? keysIn : keys);
            var props = isArr ? undefined : keysFunc(value);
            arrayEach(props || value, function (subValue, key) {
                if (props) {
                    key = subValue;
                    subValue = value[key];
                }
                assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
            });
            return result;
        }
        function baseConforms(source) {
            var props = keys(source);
            return function (object) {
                return baseConformsTo(object, source, props);
            };
        }
        function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
                return !length;
            }
            object = Object(object);
            while (length--) {
                var key = props[length], predicate = source[key], value = object[key];
                if ((value === undefined && !(key in object)) || !predicate(value)) {
                    return false;
                }
            }
            return true;
        }
        function baseDelay(func, wait, args) {
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            return setTimeout(function () { func.apply(undefined, args); }, wait);
        }
        function baseDifference(array, values, iteratee, comparator) {
            var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
            if (!length) {
                return result;
            }
            if (iteratee) {
                values = arrayMap(values, baseUnary(iteratee));
            }
            if (comparator) {
                includes = arrayIncludesWith;
                isCommon = false;
            }
            else if (values.length >= LARGE_ARRAY_SIZE) {
                includes = cacheHas;
                isCommon = false;
                values = new SetCache(values);
            }
            outer: while (++index < length) {
                var value = array[index], computed = iteratee == null ? value : iteratee(value);
                value = (comparator || value !== 0) ? value : 0;
                if (isCommon && computed === computed) {
                    var valuesIndex = valuesLength;
                    while (valuesIndex--) {
                        if (values[valuesIndex] === computed) {
                            continue outer;
                        }
                    }
                    result.push(value);
                }
                else if (!includes(values, computed, comparator)) {
                    result.push(value);
                }
            }
            return result;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
            var result = true;
            baseEach(collection, function (value, index, collection) {
                result = !!predicate(value, index, collection);
                return result;
            });
            return result;
        }
        function baseExtremum(array, iteratee, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
                var value = array[index], current = iteratee(value);
                if (current != null && (computed === undefined
                    ? (current === current && !isSymbol(current))
                    : comparator(current, computed))) {
                    var computed = current, result = value;
                }
            }
            return result;
        }
        function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }
            end = (end === undefined || end > length) ? length : toInteger(end);
            if (end < 0) {
                end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
                array[start++] = value;
            }
            return array;
        }
        function baseFilter(collection, predicate) {
            var result = [];
            baseEach(collection, function (value, index, collection) {
                if (predicate(value, index, collection)) {
                    result.push(value);
                }
            });
            return result;
        }
        function baseFlatten(array, depth, predicate, isStrict, result) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result || (result = []);
            while (++index < length) {
                var value = array[index];
                if (depth > 0 && predicate(value)) {
                    if (depth > 1) {
                        baseFlatten(value, depth - 1, predicate, isStrict, result);
                    }
                    else {
                        arrayPush(result, value);
                    }
                }
                else if (!isStrict) {
                    result[result.length] = value;
                }
            }
            return result;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee) {
            return object && baseFor(object, iteratee, keys);
        }
        function baseForOwnRight(object, iteratee) {
            return object && baseForRight(object, iteratee, keys);
        }
        function baseFunctions(object, props) {
            return arrayFilter(props, function (key) {
                return isFunction(object[key]);
            });
        }
        function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
                object = object[toKey(path[index++])];
            }
            return (index && index == length) ? object : undefined;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result = keysFunc(object);
            return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
        }
        function baseGetTag(value) {
            if (value == null) {
                return value === undefined ? undefinedTag : nullTag;
            }
            return (symToStringTag && symToStringTag in Object(value))
                ? getRawTag(value)
                : objectToString(value);
        }
        function baseGt(value, other) {
            return value > other;
        }
        function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
            return object != null && key in Object(object);
        }
        function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee, comparator) {
            var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
            while (othIndex--) {
                var array = arrays[othIndex];
                if (othIndex && iteratee) {
                    array = arrayMap(array, baseUnary(iteratee));
                }
                maxLength = nativeMin(array.length, maxLength);
                caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
                    ? new SetCache(othIndex && array)
                    : undefined;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer: while (++index < length && result.length < maxLength) {
                var value = array[index], computed = iteratee ? iteratee(value) : value;
                value = (comparator || value !== 0) ? value : 0;
                if (!(seen
                    ? cacheHas(seen, computed)
                    : includes(result, computed, comparator))) {
                    othIndex = othLength;
                    while (--othIndex) {
                        var cache = caches[othIndex];
                        if (!(cache
                            ? cacheHas(cache, computed)
                            : includes(arrays[othIndex], computed, comparator))) {
                            continue outer;
                        }
                    }
                    if (seen) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
            }
            return result;
        }
        function baseInverter(object, setter, iteratee, accumulator) {
            baseForOwn(object, function (value, key, object) {
                setter(accumulator, iteratee(value), key, object);
            });
            return accumulator;
        }
        function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined : apply(func, object, args);
        }
        function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
                return true;
            }
            if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
                if (!isBuffer(other)) {
                    return false;
                }
                objIsArr = true;
                objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
                stack || (stack = new Stack);
                return (objIsArr || isTypedArray(object))
                    ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
                    : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                if (objIsWrapped || othIsWrapped) {
                    var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                    stack || (stack = new Stack);
                    return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
                }
            }
            if (!isSameTag) {
                return false;
            }
            stack || (stack = new Stack);
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
                return !length;
            }
            object = Object(object);
            while (index--) {
                var data = matchData[index];
                if ((noCustomizer && data[2])
                    ? data[1] !== object[data[0]]
                    : !(data[0] in object)) {
                    return false;
                }
            }
            while (++index < length) {
                data = matchData[index];
                var key = data[0], objValue = object[key], srcValue = data[1];
                if (noCustomizer && data[2]) {
                    if (objValue === undefined && !(key in object)) {
                        return false;
                    }
                }
                else {
                    var stack = new Stack;
                    if (customizer) {
                        var result = customizer(objValue, srcValue, key, object, source, stack);
                    }
                    if (!(result === undefined
                        ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                        : result)) {
                        return false;
                    }
                }
            }
            return true;
        }
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
                return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
            return isObjectLike(value) &&
                isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
            if (typeof value == "function") {
                return value;
            }
            if (value == null) {
                return identity;
            }
            if (typeof value == "object") {
                return isArray(value)
                    ? baseMatchesProperty(value[0], value[1])
                    : baseMatches(value);
            }
            return property(value);
        }
        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != "constructor") {
                    result.push(key);
                }
            }
            return result;
        }
        function baseKeysIn(object) {
            if (!isObject(object)) {
                return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result = [];
            for (var key in object) {
                if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                    result.push(key);
                }
            }
            return result;
        }
        function baseLt(value, other) {
            return value < other;
        }
        function baseMap(collection, iteratee) {
            var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
            baseEach(collection, function (value, key, collection) {
                result[++index] = iteratee(value, key, collection);
            });
            return result;
        }
        function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
                return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function (object) {
                return object === source || baseIsMatch(object, source, matchData);
            };
        }
        function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
                return matchesStrictComparable(toKey(path), srcValue);
            }
            return function (object) {
                var objValue = get(object, path);
                return (objValue === undefined && objValue === srcValue)
                    ? hasIn(object, path)
                    : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
                return;
            }
            baseFor(source, function (srcValue, key) {
                if (isObject(srcValue)) {
                    stack || (stack = new Stack);
                    baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                }
                else {
                    var newValue = customizer
                        ? customizer(object[key], srcValue, (key + ""), object, source, stack)
                        : undefined;
                    if (newValue === undefined) {
                        newValue = srcValue;
                    }
                    assignMergeValue(object, key, newValue);
                }
            }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
            if (stacked) {
                assignMergeValue(object, key, stacked);
                return;
            }
            var newValue = customizer
                ? customizer(objValue, srcValue, (key + ""), object, source, stack)
                : undefined;
            var isCommon = newValue === undefined;
            if (isCommon) {
                var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                newValue = srcValue;
                if (isArr || isBuff || isTyped) {
                    if (isArray(objValue)) {
                        newValue = objValue;
                    }
                    else if (isArrayLikeObject(objValue)) {
                        newValue = copyArray(objValue);
                    }
                    else if (isBuff) {
                        isCommon = false;
                        newValue = cloneBuffer(srcValue, true);
                    }
                    else if (isTyped) {
                        isCommon = false;
                        newValue = cloneTypedArray(srcValue, true);
                    }
                    else {
                        newValue = [];
                    }
                }
                else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                    newValue = objValue;
                    if (isArguments(objValue)) {
                        newValue = toPlainObject(objValue);
                    }
                    else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
                        newValue = initCloneObject(srcValue);
                    }
                }
                else {
                    isCommon = false;
                }
            }
            if (isCommon) {
                stack.set(srcValue, newValue);
                mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
            var length = array.length;
            if (!length) {
                return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined;
        }
        function baseOrderBy(collection, iteratees, orders) {
            var index = -1;
            iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));
            var result = baseMap(collection, function (value, key, collection) {
                var criteria = arrayMap(iteratees, function (iteratee) {
                    return iteratee(value);
                });
                return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result, function (object, other) {
                return compareMultiple(object, other, orders);
            });
        }
        function basePick(object, paths) {
            return basePickBy(object, paths, function (value, path) {
                return hasIn(object, path);
            });
        }
        function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result = {};
            while (++index < length) {
                var path = paths[index], value = baseGet(object, path);
                if (predicate(value, path)) {
                    baseSet(result, castPath(path, object), value);
                }
            }
            return result;
        }
        function basePropertyDeep(path) {
            return function (object) {
                return baseGet(object, path);
            };
        }
        function basePullAll(array, values, iteratee, comparator) {
            var indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
            if (array === values) {
                values = copyArray(values);
            }
            if (iteratee) {
                seen = arrayMap(array, baseUnary(iteratee));
            }
            while (++index < length) {
                var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
                while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
                    if (seen !== array) {
                        splice.call(seen, fromIndex, 1);
                    }
                    splice.call(array, fromIndex, 1);
                }
            }
            return array;
        }
        function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
                var index = indexes[length];
                if (length == lastIndex || index !== previous) {
                    var previous = index;
                    if (isIndex(index)) {
                        splice.call(array, index, 1);
                    }
                    else {
                        baseUnset(array, index);
                    }
                }
            }
            return array;
        }
        function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
            while (length--) {
                result[fromRight ? length : ++index] = start;
                start += step;
            }
            return result;
        }
        function baseRepeat(string, n) {
            var result = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
                return result;
            }
            do {
                if (n % 2) {
                    result += string;
                }
                n = nativeFloor(n / 2);
                if (n) {
                    string += string;
                }
            } while (n);
            return result;
        }
        function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
            return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
                return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
                var key = toKey(path[index]), newValue = value;
                if (index != lastIndex) {
                    var objValue = nested[key];
                    newValue = customizer ? customizer(objValue, key, nested) : undefined;
                    if (newValue === undefined) {
                        newValue = isObject(objValue)
                            ? objValue
                            : (isIndex(path[index + 1]) ? [] : {});
                    }
                }
                assignValue(nested, key, newValue);
                nested = nested[key];
            }
            return object;
        }
        var baseSetData = !metaMap ? identity : function (func, data) {
            metaMap.set(func, data);
            return func;
        };
        var baseSetToString = !defineProperty ? identity : function (func, string) {
            return defineProperty(func, "toString", {
                "configurable": true,
                "enumerable": false,
                "value": constant(string),
                "writable": true
            });
        };
        function baseShuffle(collection) {
            return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }
            end = end > length ? length : end;
            if (end < 0) {
                end += length;
            }
            length = start > end ? 0 : ((end - start) >>> 0);
            start >>>= 0;
            var result = Array(length);
            while (++index < length) {
                result[index] = array[index + start];
            }
            return result;
        }
        function baseSome(collection, predicate) {
            var result;
            baseEach(collection, function (value, index, collection) {
                result = predicate(value, index, collection);
                return !result;
            });
            return !!result;
        }
        function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                while (low < high) {
                    var mid = (low + high) >>> 1, computed = array[mid];
                    if (computed !== null && !isSymbol(computed) &&
                        (retHighest ? (computed <= value) : (computed < value))) {
                        low = mid + 1;
                    }
                    else {
                        high = mid;
                    }
                }
                return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee, retHighest) {
            value = iteratee(value);
            var low = 0, high = array == null ? 0 : array.length, valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined;
            while (low < high) {
                var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), othIsDefined = computed !== undefined, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
                if (valIsNaN) {
                    var setLow = retHighest || othIsReflexive;
                }
                else if (valIsUndefined) {
                    setLow = othIsReflexive && (retHighest || othIsDefined);
                }
                else if (valIsNull) {
                    setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
                }
                else if (valIsSymbol) {
                    setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
                }
                else if (othIsNull || othIsSymbol) {
                    setLow = false;
                }
                else {
                    setLow = retHighest ? (computed <= value) : (computed < value);
                }
                if (setLow) {
                    low = mid + 1;
                }
                else {
                    high = mid;
                }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee) {
            var index = -1, length = array.length, resIndex = 0, result = [];
            while (++index < length) {
                var value = array[index], computed = iteratee ? iteratee(value) : value;
                if (!index || !eq(computed, seen)) {
                    var seen = computed;
                    result[resIndex++] = value === 0 ? 0 : value;
                }
            }
            return result;
        }
        function baseToNumber(value) {
            if (typeof value == "number") {
                return value;
            }
            if (isSymbol(value)) {
                return NAN;
            }
            return +value;
        }
        function baseToString(value) {
            if (typeof value == "string") {
                return value;
            }
            if (isArray(value)) {
                return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
                return symbolToString ? symbolToString.call(value) : "";
            }
            var result = (value + "");
            return (result == "0" && (1 / value) == -INFINITY) ? "-0" : result;
        }
        function baseUniq(array, iteratee, comparator) {
            var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
            if (comparator) {
                isCommon = false;
                includes = arrayIncludesWith;
            }
            else if (length >= LARGE_ARRAY_SIZE) {
                var set = iteratee ? null : createSet(array);
                if (set) {
                    return setToArray(set);
                }
                isCommon = false;
                includes = cacheHas;
                seen = new SetCache;
            }
            else {
                seen = iteratee ? [] : result;
            }
            outer: while (++index < length) {
                var value = array[index], computed = iteratee ? iteratee(value) : value;
                value = (comparator || value !== 0) ? value : 0;
                if (isCommon && computed === computed) {
                    var seenIndex = seen.length;
                    while (seenIndex--) {
                        if (seen[seenIndex] === computed) {
                            continue outer;
                        }
                    }
                    if (iteratee) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
                else if (!includes(seen, computed, comparator)) {
                    if (seen !== result) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
            }
            return result;
        }
        function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) &&
                predicate(array[index], index, array)) { }
            return isDrop
                ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
                : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
        }
        function baseWrapperValue(value, actions) {
            var result = value;
            if (result instanceof LazyWrapper) {
                result = result.value();
            }
            return arrayReduce(actions, function (result, action) {
                return action.func.apply(action.thisArg, arrayPush([result], action.args));
            }, result);
        }
        function baseXor(arrays, iteratee, comparator) {
            var length = arrays.length;
            if (length < 2) {
                return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result = Array(length);
            while (++index < length) {
                var array = arrays[index], othIndex = -1;
                while (++othIndex < length) {
                    if (othIndex != index) {
                        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
                    }
                }
            }
            return baseUniq(baseFlatten(result, 1), iteratee, comparator);
        }
        function baseZipObject(props, values, assignFunc) {
            var index = -1, length = props.length, valsLength = values.length, result = {};
            while (++index < length) {
                var value = index < valsLength ? values[index] : undefined;
                assignFunc(result, props[index], value);
            }
            return result;
        }
        function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
            return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
            if (isArray(value)) {
                return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined ? length : end;
            return (!start && end >= length) ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function (id) {
            return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
                return buffer.slice();
            }
            var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result);
            return result;
        }
        function cloneArrayBuffer(arrayBuffer) {
            var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array(result).set(new Uint8Array(arrayBuffer));
            return result;
        }
        function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneMap(map, isDeep, cloneFunc) {
            var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
            return arrayReduce(array, addMapEntry, new map.constructor);
        }
        function cloneRegExp(regexp) {
            var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result.lastIndex = regexp.lastIndex;
            return result;
        }
        function cloneSet(set, isDeep, cloneFunc) {
            var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
            return arrayReduce(array, addSetEntry, new set.constructor);
        }
        function cloneSymbol(symbol) {
            return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
            if (value !== other) {
                var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
                var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
                if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
                    (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
                    (valIsNull && othIsDefined && othIsReflexive) ||
                    (!valIsDefined && othIsReflexive) ||
                    !valIsReflexive) {
                    return 1;
                }
                if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
                    (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
                    (othIsNull && valIsDefined && valIsReflexive) ||
                    (!othIsDefined && valIsReflexive) ||
                    !othIsReflexive) {
                    return -1;
                }
            }
            return 0;
        }
        function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
                var result = compareAscending(objCriteria[index], othCriteria[index]);
                if (result) {
                    if (index >= ordersLength) {
                        return result;
                    }
                    var order = orders[index];
                    return result * (order == "desc" ? -1 : 1);
                }
            }
            return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
                result[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
                if (isUncurried || argsIndex < argsLength) {
                    result[holders[argsIndex]] = args[argsIndex];
                }
            }
            while (rangeLength--) {
                result[leftIndex++] = args[argsIndex++];
            }
            return result;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
                result[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
                result[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
                if (isUncurried || argsIndex < argsLength) {
                    result[offset + holders[holdersIndex]] = args[argsIndex++];
                }
            }
            return result;
        }
        function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array(length));
            while (++index < length) {
                array[index] = source[index];
            }
            return array;
        }
        function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
                var key = props[index];
                var newValue = customizer
                    ? customizer(object[key], source[key], key, object, source)
                    : undefined;
                if (newValue === undefined) {
                    newValue = source[key];
                }
                if (isNew) {
                    baseAssignValue(object, key, newValue);
                }
                else {
                    assignValue(object, key, newValue);
                }
            }
            return object;
        }
        function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
            return function (collection, iteratee) {
                var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
                return func(collection, setter, getIteratee(iteratee, 2), accumulator);
            };
        }
        function createAssigner(assigner) {
            return baseRest(function (object, sources) {
                var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
                customizer = (assigner.length > 3 && typeof customizer == "function")
                    ? (length--, customizer)
                    : undefined;
                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                    customizer = length < 3 ? undefined : customizer;
                    length = 1;
                }
                object = Object(object);
                while (++index < length) {
                    var source = sources[index];
                    if (source) {
                        assigner(object, source, index, customizer);
                    }
                }
                return object;
            });
        }
        function createBaseEach(eachFunc, fromRight) {
            return function (collection, iteratee) {
                if (collection == null) {
                    return collection;
                }
                if (!isArrayLike(collection)) {
                    return eachFunc(collection, iteratee);
                }
                var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
                while ((fromRight ? index-- : ++index < length)) {
                    if (iteratee(iterable[index], index, iterable) === false) {
                        break;
                    }
                }
                return collection;
            };
        }
        function createBaseFor(fromRight) {
            return function (object, iteratee, keysFunc) {
                var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                while (length--) {
                    var key = props[fromRight ? length : ++index];
                    if (iteratee(iterable[key], key, iterable) === false) {
                        break;
                    }
                }
                return object;
            };
        }
        function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
                var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
        }
        function createCaseFirst(methodName) {
            return function (string) {
                string = toString(string);
                var strSymbols = hasUnicode(string)
                    ? stringToArray(string)
                    : undefined;
                var chr = strSymbols
                    ? strSymbols[0]
                    : string.charAt(0);
                var trailing = strSymbols
                    ? castSlice(strSymbols, 1).join("")
                    : string.slice(1);
                return chr[methodName]() + trailing;
            };
        }
        function createCompounder(callback) {
            return function (string) {
                return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
        }
        function createCtor(Ctor) {
            return function () {
                var args = arguments;
                switch (args.length) {
                    case 0: return new Ctor;
                    case 1: return new Ctor(args[0]);
                    case 2: return new Ctor(args[0], args[1]);
                    case 3: return new Ctor(args[0], args[1], args[2]);
                    case 4: return new Ctor(args[0], args[1], args[2], args[3]);
                    case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                    case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                    case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                }
                var thisBinding = baseCreate(Ctor.prototype), result = Ctor.apply(thisBinding, args);
                return isObject(result) ? result : thisBinding;
            };
        }
        function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
                var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper);
                while (index--) {
                    args[index] = arguments[index];
                }
                var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
                    ? []
                    : replaceHolders(args, placeholder);
                length -= holders.length;
                if (length < arity) {
                    return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
                }
                var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                return apply(fn, this, args);
            }
            return wrapper;
        }
        function createFind(findIndexFunc) {
            return function (collection, predicate, fromIndex) {
                var iterable = Object(collection);
                if (!isArrayLike(collection)) {
                    var iteratee = getIteratee(predicate, 3);
                    collection = keys(collection);
                    predicate = function (key) { return iteratee(iterable[key], key, iterable); };
                }
                var index = findIndexFunc(collection, predicate, fromIndex);
                return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
            };
        }
        function createFlow(fromRight) {
            return flatRest(function (funcs) {
                var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
                if (fromRight) {
                    funcs.reverse();
                }
                while (index--) {
                    var func = funcs[index];
                    if (typeof func != "function") {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                        var wrapper = new LodashWrapper([], true);
                    }
                }
                index = wrapper ? index : length;
                while (++index < length) {
                    func = funcs[index];
                    var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined;
                    if (data && isLaziable(data[0]) &&
                        data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                        !data[4].length && data[9] == 1) {
                        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                    }
                    else {
                        wrapper = (func.length == 1 && isLaziable(func))
                            ? wrapper[funcName]()
                            : wrapper.thru(func);
                    }
                }
                return function () {
                    var args = arguments, value = args[0];
                    if (wrapper && args.length == 1 && isArray(value)) {
                        return wrapper.plant(value).value();
                    }
                    var index = 0, result = length ? funcs[index].apply(this, args) : value;
                    while (++index < length) {
                        result = funcs[index].call(this, result);
                    }
                    return result;
                };
            });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : createCtor(func);
            function wrapper() {
                var length = arguments.length, args = Array(length), index = length;
                while (index--) {
                    args[index] = arguments[index];
                }
                if (isCurried) {
                    var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
                }
                if (partials) {
                    args = composeArgs(args, partials, holders, isCurried);
                }
                if (partialsRight) {
                    args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
                }
                length -= holdersCount;
                if (isCurried && length < arity) {
                    var newHolders = replaceHolders(args, placeholder);
                    return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
                }
                var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
                length = args.length;
                if (argPos) {
                    args = reorder(args, argPos);
                }
                else if (isFlip && length > 1) {
                    args.reverse();
                }
                if (isAry && ary < length) {
                    args.length = ary;
                }
                if (this && this !== root && this instanceof wrapper) {
                    fn = Ctor || createCtor(fn);
                }
                return fn.apply(thisBinding, args);
            }
            return wrapper;
        }
        function createInverter(setter, toIteratee) {
            return function (object, iteratee) {
                return baseInverter(object, setter, toIteratee(iteratee), {});
            };
        }
        function createMathOperation(operator, defaultValue) {
            return function (value, other) {
                var result;
                if (value === undefined && other === undefined) {
                    return defaultValue;
                }
                if (value !== undefined) {
                    result = value;
                }
                if (other !== undefined) {
                    if (result === undefined) {
                        return other;
                    }
                    if (typeof value == "string" || typeof other == "string") {
                        value = baseToString(value);
                        other = baseToString(other);
                    }
                    else {
                        value = baseToNumber(value);
                        other = baseToNumber(other);
                    }
                    result = operator(value, other);
                }
                return result;
            };
        }
        function createOver(arrayFunc) {
            return flatRest(function (iteratees) {
                iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
                return baseRest(function (args) {
                    var thisArg = this;
                    return arrayFunc(iteratees, function (iteratee) {
                        return apply(iteratee, thisArg, args);
                    });
                });
            });
        }
        function createPadding(length, chars) {
            chars = chars === undefined ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
                return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars)
                ? castSlice(stringToArray(result), 0, length).join("")
                : result.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
                var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                while (++leftIndex < leftLength) {
                    args[leftIndex] = partials[leftIndex];
                }
                while (argsLength--) {
                    args[leftIndex++] = arguments[++argsIndex];
                }
                return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
        }
        function createRange(fromRight) {
            return function (start, end, step) {
                if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                    end = step = undefined;
                }
                start = toFinite(start);
                if (end === undefined) {
                    end = start;
                    start = 0;
                }
                else {
                    end = toFinite(end);
                }
                step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
                return baseRange(start, end, step, fromRight);
            };
        }
        function createRelationalOperation(operator) {
            return function (value, other) {
                if (!(typeof value == "string" && typeof other == "string")) {
                    value = toNumber(value);
                    other = toNumber(other);
                }
                return operator(value, other);
            };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
            bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
                bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
                func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
                newHoldersRight, argPos, ary, arity
            ];
            var result = wrapFunc.apply(undefined, newData);
            if (isLaziable(func)) {
                setData(result, newData);
            }
            result.placeholder = placeholder;
            return setWrapToString(result, func, bitmask);
        }
        function createRound(methodName) {
            var func = Math[methodName];
            return function (number, precision) {
                number = toNumber(number);
                precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
                if (precision) {
                    var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                    pair = (toString(value) + "e").split("e");
                    return +(pair[0] + "e" + (+pair[1] - precision));
                }
                return func(number);
            };
        }
        var createSet = !(Set && (1 / setToArray(new Set([, -0]))[1]) == INFINITY) ? noop : function (values) {
            return new Set(values);
        };
        function createToPairs(keysFunc) {
            return function (object) {
                var tag = getTag(object);
                if (tag == mapTag) {
                    return mapToArray(object);
                }
                if (tag == setTag) {
                    return setToPairs(object);
                }
                return baseToPairs(object, keysFunc(object));
            };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
                bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
                partials = holders = undefined;
            }
            ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
            arity = arity === undefined ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                var partialsRight = partials, holdersRight = holders;
                partials = holders = undefined;
            }
            var data = isBindKey ? undefined : getData(func);
            var newData = [
                func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
                argPos, ary, arity
            ];
            if (data) {
                mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined
                ? (isBindKey ? 0 : func.length)
                : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
                bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
                var result = createBind(func, bitmask, thisArg);
            }
            else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
                result = createCurry(func, bitmask, arity);
            }
            else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
                result = createPartial(func, bitmask, thisArg, partials);
            }
            else {
                result = createHybrid.apply(undefined, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined ||
                (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                return srcValue;
            }
            return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
                stack.set(srcValue, objValue);
                baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
                stack["delete"](srcValue);
            }
            return objValue;
        }
        function customOmitClone(value) {
            return isPlainObject(value) ? undefined : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
                return false;
            }
            var stacked = stack.get(array);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var index = -1, result = true, seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
                var arrValue = array[index], othValue = other[index];
                if (customizer) {
                    var compared = isPartial
                        ? customizer(othValue, arrValue, index, other, array, stack)
                        : customizer(arrValue, othValue, index, array, other, stack);
                }
                if (compared !== undefined) {
                    if (compared) {
                        continue;
                    }
                    result = false;
                    break;
                }
                if (seen) {
                    if (!arraySome(other, function (othValue, othIndex) {
                        if (!cacheHas(seen, othIndex) &&
                            (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                            return seen.push(othIndex);
                        }
                    })) {
                        result = false;
                        break;
                    }
                }
                else if (!(arrValue === othValue ||
                    equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    result = false;
                    break;
                }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
                case dataViewTag:
                    if ((object.byteLength != other.byteLength) ||
                        (object.byteOffset != other.byteOffset)) {
                        return false;
                    }
                    object = object.buffer;
                    other = other.buffer;
                case arrayBufferTag:
                    if ((object.byteLength != other.byteLength) ||
                        !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                        return false;
                    }
                    return true;
                case boolTag:
                case dateTag:
                case numberTag:
                    return eq(+object, +other);
                case errorTag:
                    return object.name == other.name && object.message == other.message;
                case regexpTag:
                case stringTag:
                    return object == (other + "");
                case mapTag:
                    var convert = mapToArray;
                case setTag:
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                    convert || (convert = setToArray);
                    if (object.size != other.size && !isPartial) {
                        return false;
                    }
                    var stacked = stack.get(object);
                    if (stacked) {
                        return stacked == other;
                    }
                    bitmask |= COMPARE_UNORDERED_FLAG;
                    stack.set(object, other);
                    var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                    stack["delete"](object);
                    return result;
                case symbolTag:
                    if (symbolValueOf) {
                        return symbolValueOf.call(object) == symbolValueOf.call(other);
                    }
            }
            return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                    return false;
                }
            }
            var stacked = stack.get(object);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var result = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key], othValue = other[key];
                if (customizer) {
                    var compared = isPartial
                        ? customizer(othValue, objValue, key, other, object, stack)
                        : customizer(objValue, othValue, key, object, other, stack);
                }
                if (!(compared === undefined
                    ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
                    : compared)) {
                    result = false;
                    break;
                }
                skipCtor || (skipCtor = key == "constructor");
            }
            if (result && !skipCtor) {
                var objCtor = object.constructor, othCtor = other.constructor;
                if (objCtor != othCtor &&
                    ("constructor" in object && "constructor" in other) &&
                    !(typeof objCtor == "function" && objCtor instanceof objCtor &&
                        typeof othCtor == "function" && othCtor instanceof othCtor)) {
                    result = false;
                }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result;
        }
        function flatRest(func) {
            return setToString(overRest(func, undefined, flatten), func + "");
        }
        function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function (func) {
            return metaMap.get(func);
        };
        function getFuncName(func) {
            var result = (func.name + ""), array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0;
            while (length--) {
                var data = array[length], otherFunc = data.func;
                if (otherFunc == null || otherFunc == func) {
                    return data.name;
                }
            }
            return result;
        }
        function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
        }
        function getIteratee() {
            var result = lodash.iteratee || iteratee;
            result = result === iteratee ? baseIteratee : result;
            return arguments.length ? result(arguments[0], arguments[1]) : result;
        }
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key)
                ? data[typeof key == "string" ? "string" : "hash"]
                : data.map;
        }
        function getMatchData(object) {
            var result = keys(object), length = result.length;
            while (length--) {
                var key = result[length], value = object[key];
                result[length] = [key, value, isStrictComparable(value)];
            }
            return result;
        }
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
        }
        function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
                value[symToStringTag] = undefined;
                var unmasked = true;
            }
            catch (e) { }
            var result = nativeObjectToString.call(value);
            if (unmasked) {
                if (isOwn) {
                    value[symToStringTag] = tag;
                }
                else {
                    delete value[symToStringTag];
                }
            }
            return result;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
            if (object == null) {
                return [];
            }
            object = Object(object);
            return arrayFilter(nativeGetSymbols(object), function (symbol) {
                return propertyIsEnumerable.call(object, symbol);
            });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
            var result = [];
            while (object) {
                arrayPush(result, getSymbols(object));
                object = getPrototype(object);
            }
            return result;
        };
        var getTag = baseGetTag;
        if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
            (Map && getTag(new Map) != mapTag) ||
            (Promise && getTag(Promise.resolve()) != promiseTag) ||
            (Set && getTag(new Set) != setTag) ||
            (WeakMap && getTag(new WeakMap) != weakMapTag)) {
            getTag = function (value) {
                var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
                if (ctorString) {
                    switch (ctorString) {
                        case dataViewCtorString: return dataViewTag;
                        case mapCtorString: return mapTag;
                        case promiseCtorString: return promiseTag;
                        case setCtorString: return setTag;
                        case weakMapCtorString: return weakMapTag;
                    }
                }
                return result;
            };
        }
        function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
                var data = transforms[index], size = data.size;
                switch (data.type) {
                    case "drop":
                        start += size;
                        break;
                    case "dropRight":
                        end -= size;
                        break;
                    case "take":
                        end = nativeMin(end, start + size);
                        break;
                    case "takeRight":
                        start = nativeMax(start, end - size);
                        break;
                }
            }
            return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, result = false;
            while (++index < length) {
                var key = toKey(path[index]);
                if (!(result = object != null && hasFunc(object, key))) {
                    break;
                }
                object = object[key];
            }
            if (result || ++index != length) {
                return result;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) &&
                (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
            var length = array.length, result = array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
                result.index = array.index;
                result.input = array.input;
            }
            return result;
        }
        function initCloneObject(object) {
            return (typeof object.constructor == "function" && !isPrototype(object))
                ? baseCreate(getPrototype(object))
                : {};
        }
        function initCloneByTag(object, tag, cloneFunc, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
                case arrayBufferTag:
                    return cloneArrayBuffer(object);
                case boolTag:
                case dateTag:
                    return new Ctor(+object);
                case dataViewTag:
                    return cloneDataView(object, isDeep);
                case float32Tag:
                case float64Tag:
                case int8Tag:
                case int16Tag:
                case int32Tag:
                case uint8Tag:
                case uint8ClampedTag:
                case uint16Tag:
                case uint32Tag:
                    return cloneTypedArray(object, isDeep);
                case mapTag:
                    return cloneMap(object, isDeep, cloneFunc);
                case numberTag:
                case stringTag:
                    return new Ctor(object);
                case regexpTag:
                    return cloneRegExp(object);
                case setTag:
                    return cloneSet(object, isDeep, cloneFunc);
                case symbolTag:
                    return cloneSymbol(object);
            }
        }
        function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
                return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
            return isArray(value) || isArguments(value) ||
                !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length &&
                (typeof value == "number" || reIsUint.test(value)) &&
                (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
                return false;
            }
            var type = typeof index;
            if (type == "number"
                ? (isArrayLike(object) && isIndex(index, object.length))
                : (type == "string" && index in object)) {
                return eq(object[index], value);
            }
            return false;
        }
        function isKey(value, object) {
            if (isArray(value)) {
                return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" ||
                value == null || isSymbol(value)) {
                return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
                (object != null && value in Object(object));
        }
        function isKeyable(value) {
            var type = typeof value;
            return (type == "string" || type == "number" || type == "symbol" || type == "boolean")
                ? (value !== "__proto__")
                : (value === null);
        }
        function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
                return false;
            }
            if (func === other) {
                return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
        }
        function isMasked(func) {
            return !!maskSrcKey && (maskSrcKey in func);
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
            var Ctor = value && value.constructor, proto = (typeof Ctor == "function" && Ctor.prototype) || objectProto;
            return value === proto;
        }
        function isStrictComparable(value) {
            return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
            return function (object) {
                if (object == null) {
                    return false;
                }
                return object[key] === srcValue &&
                    (srcValue !== undefined || (key in Object(object)));
            };
        }
        function memoizeCapped(func) {
            var result = memoize(func, function (key) {
                if (cache.size === MAX_MEMOIZE_SIZE) {
                    cache.clear();
                }
                return key;
            });
            var cache = result.cache;
            return result;
        }
        function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
                ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
                ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));
            if (!(isCommon || isCombo)) {
                return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
                data[2] = source[2];
                newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
                var partials = data[3];
                data[3] = partials ? composeArgs(partials, value, source[4]) : value;
                data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
                partials = data[5];
                data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
                data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
                data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
                data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
                data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
        }
        function nativeKeysIn(object) {
            var result = [];
            if (object != null) {
                for (var key in Object(object)) {
                    result.push(key);
                }
            }
            return result;
        }
        function objectToString(value) {
            return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform) {
            start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
            return function () {
                var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                while (++index < length) {
                    array[index] = args[start + index];
                }
                index = -1;
                var otherArgs = Array(start + 1);
                while (++index < start) {
                    otherArgs[index] = args[index];
                }
                otherArgs[start] = transform(array);
                return apply(func, this, otherArgs);
            };
        }
        function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
                var index = indexes[length];
                array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
            }
            return array;
        }
        var setData = shortOut(baseSetData);
        var setTimeout = ctxSetTimeout || function (func, wait) {
            return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
            var source = (reference + "");
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function () {
                var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                lastCalled = stamp;
                if (remaining > 0) {
                    if (++count >= HOT_COUNT) {
                        return arguments[0];
                    }
                }
                else {
                    count = 0;
                }
                return func.apply(undefined, arguments);
            };
        }
        function shuffleSelf(array, size) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size = size === undefined ? length : size;
            while (++index < size) {
                var rand = baseRandom(index, lastIndex), value = array[rand];
                array[rand] = array[index];
                array[index] = value;
            }
            array.length = size;
            return array;
        }
        var stringToPath = memoizeCapped(function (string) {
            var result = [];
            if (reLeadingDot.test(string)) {
                result.push("");
            }
            string.replace(rePropName, function (match, number, quote, string) {
                result.push(quote ? string.replace(reEscapeChar, "$1") : (number || match));
            });
            return result;
        });
        function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
                return value;
            }
            var result = (value + "");
            return (result == "0" && (1 / value) == -INFINITY) ? "-0" : result;
        }
        function toSource(func) {
            if (func != null) {
                try {
                    return funcToString.call(func);
                }
                catch (e) { }
                try {
                    return (func + "");
                }
                catch (e) { }
            }
            return "";
        }
        function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function (pair) {
                var value = "_." + pair[0];
                if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
                    details.push(value);
                }
            });
            return details.sort();
        }
        function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
                return wrapper.clone();
            }
            var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result.__actions__ = copyArray(wrapper.__actions__);
            result.__index__ = wrapper.__index__;
            result.__values__ = wrapper.__values__;
            return result;
        }
        function chunk(array, size, guard) {
            if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
                size = 1;
            }
            else {
                size = nativeMax(toInteger(size), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size < 1) {
                return [];
            }
            var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
            while (index < length) {
                result[resIndex++] = baseSlice(array, index, (index += size));
            }
            return result;
        }
        function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
            while (++index < length) {
                var value = array[index];
                if (value) {
                    result[resIndex++] = value;
                }
            }
            return result;
        }
        function concat() {
            var length = arguments.length;
            if (!length) {
                return [];
            }
            var args = Array(length - 1), array = arguments[0], index = length;
            while (index--) {
                args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function (array, values) {
            return isArrayLikeObject(array)
                ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
                : [];
        });
        var differenceBy = baseRest(function (array, values) {
            var iteratee = last(values);
            if (isArrayLikeObject(iteratee)) {
                iteratee = undefined;
            }
            return isArrayLikeObject(array)
                ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
                : [];
        });
        var differenceWith = baseRest(function (array, values) {
            var comparator = last(values);
            if (isArrayLikeObject(comparator)) {
                comparator = undefined;
            }
            return isArrayLikeObject(array)
                ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
                : [];
        });
        function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            n = (guard || n === undefined) ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            n = (guard || n === undefined) ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
            return (array && array.length)
                ? baseWhile(array, getIteratee(predicate, 3), true, true)
                : [];
        }
        function dropWhile(array, predicate) {
            return (array && array.length)
                ? baseWhile(array, getIteratee(predicate, 3), true)
                : [];
        }
        function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
                start = 0;
                end = length;
            }
            return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
                index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined) {
                index = toInteger(fromIndex);
                index = fromIndex < 0
                    ? nativeMax(length + index, 0)
                    : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
            while (++index < length) {
                var pair = pairs[index];
                result[pair[0]] = pair[1];
            }
            return result;
        }
        function head(array) {
            return (array && array.length) ? array[0] : undefined;
        }
        function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
                index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
        }
        function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function (arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return (mapped.length && mapped[0] === arrays[0])
                ? baseIntersection(mapped)
                : [];
        });
        var intersectionBy = baseRest(function (arrays) {
            var iteratee = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee === last(mapped)) {
                iteratee = undefined;
            }
            else {
                mapped.pop();
            }
            return (mapped.length && mapped[0] === arrays[0])
                ? baseIntersection(mapped, getIteratee(iteratee, 2))
                : [];
        });
        var intersectionWith = baseRest(function (arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined;
            if (comparator) {
                mapped.pop();
            }
            return (mapped.length && mapped[0] === arrays[0])
                ? baseIntersection(mapped, undefined, comparator)
                : [];
        });
        function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined;
        }
        function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return -1;
            }
            var index = length;
            if (fromIndex !== undefined) {
                index = toInteger(fromIndex);
                index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value
                ? strictLastIndexOf(array, value, index)
                : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
            return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values) {
            return (array && array.length && values && values.length)
                ? basePullAll(array, values)
                : array;
        }
        function pullAllBy(array, values, iteratee) {
            return (array && array.length && values && values.length)
                ? basePullAll(array, values, getIteratee(iteratee, 2))
                : array;
        }
        function pullAllWith(array, values, comparator) {
            return (array && array.length && values && values.length)
                ? basePullAll(array, values, undefined, comparator)
                : array;
        }
        var pullAt = flatRest(function (array, indexes) {
            var length = array == null ? 0 : array.length, result = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function (index) {
                return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result;
        });
        function remove(array, predicate) {
            var result = [];
            if (!(array && array.length)) {
                return result;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result.push(value);
                    indexes.push(index);
                }
            }
            basePullAt(array, indexes);
            return result;
        }
        function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
                start = 0;
                end = length;
            }
            else {
                start = start == null ? 0 : toInteger(start);
                end = end === undefined ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
        }
        function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
                var index = baseSortedIndex(array, value);
                if (index < length && eq(array[index], value)) {
                    return index;
                }
            }
            return -1;
        }
        function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
        }
        function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
                var index = baseSortedIndex(array, value, true) - 1;
                if (eq(array[index], value)) {
                    return index;
                }
            }
            return -1;
        }
        function sortedUniq(array) {
            return (array && array.length)
                ? baseSortedUniq(array)
                : [];
        }
        function sortedUniqBy(array, iteratee) {
            return (array && array.length)
                ? baseSortedUniq(array, getIteratee(iteratee, 2))
                : [];
        }
        function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
            if (!(array && array.length)) {
                return [];
            }
            n = (guard || n === undefined) ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
                return [];
            }
            n = (guard || n === undefined) ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
            return (array && array.length)
                ? baseWhile(array, getIteratee(predicate, 3), false, true)
                : [];
        }
        function takeWhile(array, predicate) {
            return (array && array.length)
                ? baseWhile(array, getIteratee(predicate, 3))
                : [];
        }
        var union = baseRest(function (arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function (arrays) {
            var iteratee = last(arrays);
            if (isArrayLikeObject(iteratee)) {
                iteratee = undefined;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
        });
        var unionWith = baseRest(function (arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
        });
        function uniq(array) {
            return (array && array.length) ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee) {
            return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
        }
        function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined;
            return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
        }
        function unzip(array) {
            if (!(array && array.length)) {
                return [];
            }
            var length = 0;
            array = arrayFilter(array, function (group) {
                if (isArrayLikeObject(group)) {
                    length = nativeMax(group.length, length);
                    return true;
                }
            });
            return baseTimes(length, function (index) {
                return arrayMap(array, baseProperty(index));
            });
        }
        function unzipWith(array, iteratee) {
            if (!(array && array.length)) {
                return [];
            }
            var result = unzip(array);
            if (iteratee == null) {
                return result;
            }
            return arrayMap(result, function (group) {
                return apply(iteratee, undefined, group);
            });
        }
        var without = baseRest(function (array, values) {
            return isArrayLikeObject(array)
                ? baseDifference(array, values)
                : [];
        });
        var xor = baseRest(function (arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function (arrays) {
            var iteratee = last(arrays);
            if (isArrayLikeObject(iteratee)) {
                iteratee = undefined;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
        });
        var xorWith = baseRest(function (arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values) {
            return baseZipObject(props || [], values || [], assignValue);
        }
        function zipObjectDeep(props, values) {
            return baseZipObject(props || [], values || [], baseSet);
        }
        var zipWith = baseRest(function (arrays) {
            var length = arrays.length, iteratee = length > 1 ? arrays[length - 1] : undefined;
            iteratee = typeof iteratee == "function" ? (arrays.pop(), iteratee) : undefined;
            return unzipWith(arrays, iteratee);
        });
        function chain(value) {
            var result = lodash(value);
            result.__chain__ = true;
            return result;
        }
        function tap(value, interceptor) {
            interceptor(value);
            return value;
        }
        function thru(value, interceptor) {
            return interceptor(value);
        }
        var wrapperAt = flatRest(function (paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function (object) { return baseAt(object, paths); };
            if (length > 1 || this.__actions__.length ||
                !(value instanceof LazyWrapper) || !isIndex(start)) {
                return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
                "func": thru,
                "args": [interceptor],
                "thisArg": undefined
            });
            return new LodashWrapper(value, this.__chain__).thru(function (array) {
                if (length && !array.length) {
                    array.push(undefined);
                }
                return array;
            });
        });
        function wrapperChain() {
            return chain(this);
        }
        function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
            if (this.__values__ === undefined) {
                this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
            return { "done": done, "value": value };
        }
        function wrapperToIterator() {
            return this;
        }
        function wrapperPlant(value) {
            var result, parent = this;
            while (parent instanceof baseLodash) {
                var clone = wrapperClone(parent);
                clone.__index__ = 0;
                clone.__values__ = undefined;
                if (result) {
                    previous.__wrapped__ = clone;
                }
                else {
                    result = clone;
                }
                var previous = clone;
                parent = parent.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result;
        }
        function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
                var wrapped = value;
                if (this.__actions__.length) {
                    wrapped = new LazyWrapper(this);
                }
                wrapped = wrapped.reverse();
                wrapped.__actions__.push({
                    "func": thru,
                    "args": [reverse],
                    "thisArg": undefined
                });
                return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
        }
        function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function (result, value, key) {
            if (hasOwnProperty.call(result, key)) {
                ++result[key];
            }
            else {
                baseAssignValue(result, key, 1);
            }
        });
        function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
                predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee) {
            return baseFlatten(map(collection, iteratee), 1);
        }
        function flatMapDeep(collection, iteratee) {
            return baseFlatten(map(collection, iteratee), INFINITY);
        }
        function flatMapDepth(collection, iteratee, depth) {
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee), depth);
        }
        function forEach(collection, iteratee) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee, 3));
        }
        function forEachRight(collection, iteratee) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee, 3));
        }
        var groupBy = createAggregator(function (result, value, key) {
            if (hasOwnProperty.call(result, key)) {
                result[key].push(value);
            }
            else {
                baseAssignValue(result, key, [value]);
            }
        });
        function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
                fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection)
                ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
                : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
        }
        var invokeMap = baseRest(function (collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result = isArrayLike(collection) ? Array(collection.length) : [];
            baseEach(collection, function (value) {
                result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result;
        });
        var keyBy = createAggregator(function (result, value, key) {
            baseAssignValue(result, key, value);
        });
        function map(collection, iteratee) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
                return [];
            }
            if (!isArray(iteratees)) {
                iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined : orders;
            if (!isArray(orders)) {
                orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function (result, value, key) {
            result[key ? 0 : 1].push(value);
        }, function () { return [[], []]; });
        function reduce(collection, iteratee, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
        }
        function sampleSize(collection, n, guard) {
            if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
                n = 1;
            }
            else {
                n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
        }
        function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
        }
        function size(collection) {
            if (collection == null) {
                return 0;
            }
            if (isArrayLike(collection)) {
                return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
                return collection.size;
            }
            return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
                predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function (collection, iteratees) {
            if (collection == null) {
                return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
                iteratees = [];
            }
            else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
                iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function () {
            return root.Date.now();
        };
        function after(n, func) {
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function () {
                if (--n < 1) {
                    return func.apply(this, arguments);
                }
            };
        }
        function ary(func, n, guard) {
            n = guard ? undefined : n;
            n = (func && n == null) ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }
        function before(n, func) {
            var result;
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function () {
                if (--n > 0) {
                    result = func.apply(this, arguments);
                }
                if (n <= 1) {
                    func = undefined;
                }
                return result;
            };
        }
        var bind = baseRest(function (func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
                var holders = replaceHolders(partials, getHolder(bind));
                bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function (object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
                var holders = replaceHolders(partials, getHolder(bindKey));
                bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result.placeholder = curry.placeholder;
            return result;
        }
        function curryRight(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result.placeholder = curryRight.placeholder;
            return result;
        }
        function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
                leading = !!options.leading;
                maxing = "maxWait" in options;
                maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
                var args = lastArgs, thisArg = lastThis;
                lastArgs = lastThis = undefined;
                lastInvokeTime = time;
                result = func.apply(thisArg, args);
                return result;
            }
            function leadingEdge(time) {
                lastInvokeTime = time;
                timerId = setTimeout(timerExpired, wait);
                return leading ? invokeFunc(time) : result;
            }
            function remainingWait(time) {
                var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
                return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
            }
            function shouldInvoke(time) {
                var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
                return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                    (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
            }
            function timerExpired() {
                var time = now();
                if (shouldInvoke(time)) {
                    return trailingEdge(time);
                }
                timerId = setTimeout(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
                timerId = undefined;
                if (trailing && lastArgs) {
                    return invokeFunc(time);
                }
                lastArgs = lastThis = undefined;
                return result;
            }
            function cancel() {
                if (timerId !== undefined) {
                    clearTimeout(timerId);
                }
                lastInvokeTime = 0;
                lastArgs = lastCallTime = lastThis = timerId = undefined;
            }
            function flush() {
                return timerId === undefined ? result : trailingEdge(now());
            }
            function debounced() {
                var time = now(), isInvoking = shouldInvoke(time);
                lastArgs = arguments;
                lastThis = this;
                lastCallTime = time;
                if (isInvoking) {
                    if (timerId === undefined) {
                        return leadingEdge(lastCallTime);
                    }
                    if (maxing) {
                        timerId = setTimeout(timerExpired, wait);
                        return invokeFunc(lastCallTime);
                    }
                }
                if (timerId === undefined) {
                    timerId = setTimeout(timerExpired, wait);
                }
                return result;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
        }
        var defer = baseRest(function (func, args) {
            return baseDelay(func, 1, args);
        });
        var delay = baseRest(function (func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
            if (typeof func != "function" || (resolver != null && typeof resolver != "function")) {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var memoized = function () {
                var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result) || cache;
                return result;
            };
            memoized.cache = new (memoize.Cache || MapCache);
            return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
            if (typeof predicate != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            return function () {
                var args = arguments;
                switch (args.length) {
                    case 0: return !predicate.call(this);
                    case 1: return !predicate.call(this, args[0]);
                    case 2: return !predicate.call(this, args[0], args[1]);
                    case 3: return !predicate.call(this, args[0], args[1], args[2]);
                }
                return !predicate.apply(this, args);
            };
        }
        function once(func) {
            return before(2, func);
        }
        var overArgs = castRest(function (func, transforms) {
            transforms = (transforms.length == 1 && isArray(transforms[0]))
                ? arrayMap(transforms[0], baseUnary(getIteratee()))
                : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function (args) {
                var index = -1, length = nativeMin(args.length, funcsLength);
                while (++index < length) {
                    args[index] = transforms[index].call(this, args[index]);
                }
                return apply(func, this, args);
            });
        });
        var partial = baseRest(function (func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
        });
        var partialRight = baseRest(function (func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
        });
        var rearg = flatRest(function (func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
        });
        function rest(func, start) {
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = start === undefined ? start : toInteger(start);
            return baseRest(func, start);
        }
        function spread(func, start) {
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function (args) {
                var array = args[start], otherArgs = castSlice(args, 0, start);
                if (array) {
                    arrayPush(otherArgs, array);
                }
                return apply(func, this, otherArgs);
            });
        }
        function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
                leading = "leading" in options ? !!options.leading : leading;
                trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
                "leading": leading,
                "maxWait": wait,
                "trailing": trailing
            });
        }
        function unary(func) {
            return ary(func, 1);
        }
        function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
        }
        function castArray() {
            if (!arguments.length) {
                return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
        }
        function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
            return value === other || (value !== value && other !== other);
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function (value, other) {
            return value >= other;
        });
        var isArguments = baseIsArguments(function () { return arguments; }()) ? baseIsArguments : function (value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") &&
                !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
            return value === true || value === false ||
                (isObjectLike(value) && baseGetTag(value) == boolTag);
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
            if (value == null) {
                return true;
            }
            if (isArrayLike(value) &&
                (isArray(value) || typeof value == "string" || typeof value.splice == "function" ||
                    isBuffer(value) || isTypedArray(value) || isArguments(value))) {
                return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
                return !value.size;
            }
            if (isPrototype(value)) {
                return !baseKeys(value).length;
            }
            for (var key in value) {
                if (hasOwnProperty.call(value, key)) {
                    return false;
                }
            }
            return true;
        }
        function isEqual(value, other) {
            return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            var result = customizer ? customizer(value, other) : undefined;
            return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
        }
        function isError(value) {
            if (!isObjectLike(value)) {
                return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag ||
                (typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value));
        }
        function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
            if (!isObject(value)) {
                return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
            return typeof value == "number" &&
                value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
            return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN(value) {
            return isNumber(value) && value != +value;
        }
        function isNative(value) {
            if (isMaskable(value)) {
                throw new Error(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
        }
        function isNull(value) {
            return value === null;
        }
        function isNil(value) {
            return value == null;
        }
        function isNumber(value) {
            return typeof value == "number" ||
                (isObjectLike(value) && baseGetTag(value) == numberTag);
        }
        function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
                return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
                return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor &&
                funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
            return typeof value == "string" ||
                (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
        }
        function isSymbol(value) {
            return typeof value == "symbol" ||
                (isObjectLike(value) && baseGetTag(value) == symbolTag);
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
            return value === undefined;
        }
        function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function (value, other) {
            return value <= other;
        });
        function toArray(value) {
            if (!value) {
                return [];
            }
            if (isArrayLike(value)) {
                return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
                return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);
            return func(value);
        }
        function toFinite(value) {
            if (!value) {
                return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
                var sign = (value < 0 ? -1 : 1);
                return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
        }
        function toInteger(value) {
            var result = toFinite(value), remainder = result % 1;
            return result === result ? (remainder ? result - remainder : result) : 0;
        }
        function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
            if (typeof value == "number") {
                return value;
            }
            if (isSymbol(value)) {
                return NAN;
            }
            if (isObject(value)) {
                var other = typeof value.valueOf == "function" ? value.valueOf() : value;
                value = isObject(other) ? (other + "") : other;
            }
            if (typeof value != "string") {
                return value === 0 ? value : +value;
            }
            value = value.replace(reTrim, "");
            var isBinary = reIsBinary.test(value);
            return (isBinary || reIsOctal.test(value))
                ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
                : (reIsBadHex.test(value) ? NAN : +value);
        }
        function toPlainObject(value) {
            return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
            return value
                ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
                : (value === 0 ? value : 0);
        }
        function toString(value) {
            return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function (object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
                copyObject(source, keys(source), object);
                return;
            }
            for (var key in source) {
                if (hasOwnProperty.call(source, key)) {
                    assignValue(object, key, source[key]);
                }
            }
        });
        var assignIn = createAssigner(function (object, source) {
            copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
            var result = baseCreate(prototype);
            return properties == null ? result : baseAssign(result, properties);
        }
        var defaults = baseRest(function (args) {
            args.push(undefined, customDefaultsAssignIn);
            return apply(assignInWith, undefined, args);
        });
        var defaultsDeep = baseRest(function (args) {
            args.push(undefined, customDefaultsMerge);
            return apply(mergeWith, undefined, args);
        });
        function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee) {
            return object == null
                ? object
                : baseFor(object, getIteratee(iteratee, 3), keysIn);
        }
        function forInRight(object, iteratee) {
            return object == null
                ? object
                : baseForRight(object, getIteratee(iteratee, 3), keysIn);
        }
        function forOwn(object, iteratee) {
            return object && baseForOwn(object, getIteratee(iteratee, 3));
        }
        function forOwnRight(object, iteratee) {
            return object && baseForOwnRight(object, getIteratee(iteratee, 3));
        }
        function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, path);
            return result === undefined ? defaultValue : result;
        }
        function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function (result, value, key) {
            result[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function (result, value, key) {
            if (hasOwnProperty.call(result, value)) {
                result[value].push(key);
            }
            else {
                result[value] = [key];
            }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee) {
            var result = {};
            iteratee = getIteratee(iteratee, 3);
            baseForOwn(object, function (value, key, object) {
                baseAssignValue(result, iteratee(value, key, object), value);
            });
            return result;
        }
        function mapValues(object, iteratee) {
            var result = {};
            iteratee = getIteratee(iteratee, 3);
            baseForOwn(object, function (value, key, object) {
                baseAssignValue(result, key, iteratee(value, key, object));
            });
            return result;
        }
        var merge = createAssigner(function (object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function (object, paths) {
            var result = {};
            if (object == null) {
                return result;
            }
            var isDeep = false;
            paths = arrayMap(paths, function (path) {
                path = castPath(path, object);
                isDeep || (isDeep = path.length > 1);
                return path;
            });
            copyObject(object, getAllKeysIn(object), result);
            if (isDeep) {
                result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
                baseUnset(result, paths[length]);
            }
            return result;
        });
        function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function (object, paths) {
            return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
            if (object == null) {
                return {};
            }
            var props = arrayMap(getAllKeysIn(object), function (prop) {
                return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function (value, path) {
                return predicate(value, path[0]);
            });
        }
        function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
                length = 1;
                object = undefined;
            }
            while (++index < length) {
                var value = object == null ? undefined : object[toKey(path[index])];
                if (value === undefined) {
                    index = length;
                    value = defaultValue;
                }
                object = isFunction(value) ? value.call(object) : value;
            }
            return object;
        }
        function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee = getIteratee(iteratee, 4);
            if (accumulator == null) {
                var Ctor = object && object.constructor;
                if (isArrLike) {
                    accumulator = isArr ? new Ctor : [];
                }
                else if (isObject(object)) {
                    accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
                }
                else {
                    accumulator = {};
                }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
                return iteratee(accumulator, value, index, object);
            });
            return accumulator;
        }
        function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
            if (upper === undefined) {
                upper = lower;
                lower = undefined;
            }
            if (upper !== undefined) {
                upper = toNumber(upper);
                upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined) {
                lower = toNumber(lower);
                lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined) {
                end = start;
                start = 0;
            }
            else {
                end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
                upper = floating = undefined;
            }
            if (floating === undefined) {
                if (typeof upper == "boolean") {
                    floating = upper;
                    upper = undefined;
                }
                else if (typeof lower == "boolean") {
                    floating = lower;
                    lower = undefined;
                }
            }
            if (lower === undefined && upper === undefined) {
                lower = 0;
                upper = 1;
            }
            else {
                lower = toFinite(lower);
                if (upper === undefined) {
                    upper = lower;
                    lower = 0;
                }
                else {
                    upper = toFinite(upper);
                }
            }
            if (lower > upper) {
                var temp = lower;
                lower = upper;
                upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
                var rand = nativeRandom();
                return nativeMin(lower + (rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1)))), upper);
            }
            return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function (result, word, index) {
            word = word.toLowerCase();
            return result + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined
                ? length
                : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
            string = toString(string);
            return (string && reHasUnescapedHtml.test(string))
                ? string.replace(reUnescapedHtml, escapeHtmlChar)
                : string;
        }
        function escapeRegExp(string) {
            string = toString(string);
            return (string && reHasRegExpChar.test(string))
                ? string.replace(reRegExpChar, "\\$&")
                : string;
        }
        var kebabCase = createCompounder(function (result, word, index) {
            return result + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function (result, word, index) {
            return result + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
                return string;
            }
            var mid = (length - strLength) / 2;
            return (createPadding(nativeFloor(mid), chars) +
                string +
                createPadding(nativeCeil(mid), chars));
        }
        function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return (length && strLength < length)
                ? (string + createPadding(length - strLength, chars))
                : string;
        }
        function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return (length && strLength < length)
                ? (createPadding(length - strLength, chars) + string)
                : string;
        }
        function parseInt(string, radix, guard) {
            if (guard || radix == null) {
                radix = 0;
            }
            else if (radix) {
                radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
            if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
                n = 1;
            }
            else {
                n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
        }
        function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function (result, word, index) {
            return result + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
                separator = limit = undefined;
            }
            limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
                return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" ||
                (separator != null && !isRegExp(separator)))) {
                separator = baseToString(separator);
                if (!separator && hasUnicode(string)) {
                    return castSlice(stringToArray(string), 0, limit);
                }
            }
            return string.split(separator, limit);
        }
        var startCase = createCompounder(function (result, word, index) {
            return result + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
            string = toString(string);
            position = position == null
                ? 0
                : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
                options = undefined;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp((options.escape || reNoMatch).source + "|" +
                interpolate.source + "|" +
                (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" +
                (options.evaluate || reNoMatch).source + "|$", "g");
            var sourceURL = "//# sourceURL=" +
                ("sourceURL" in options
                    ? options.sourceURL
                    : ("lodash.templateSources[" + (++templateCounter) + "]")) + "\n";
            string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                interpolateValue || (interpolateValue = esTemplateValue);
                source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                if (escapeValue) {
                    isEscaping = true;
                    source += "' +\n__e(" + escapeValue + ") +\n'";
                }
                if (evaluateValue) {
                    isEvaluating = true;
                    source += "';\n" + evaluateValue + ";\n__p += '";
                }
                if (interpolateValue) {
                    source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
                }
                index = offset + match.length;
                return match;
            });
            source += "';\n";
            var variable = options.variable;
            if (!variable) {
                source = "with (obj) {\n" + source + "\n}\n";
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source)
                .replace(reEmptyStringMiddle, "$1")
                .replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" +
                (variable
                    ? ""
                    : "obj || (obj = {});\n") +
                "var __t, __p = ''" +
                (isEscaping
                    ? ", __e = _.escape"
                    : "") +
                (isEvaluating
                    ? ", __j = Array.prototype.join;\n" +
                        "function print() { __p += __j.call(arguments, '') }\n"
                    : ";\n") +
                source +
                "return __p\n}";
            var result = attempt(function () {
                return Function(importsKeys, sourceURL + "return " + source)
                    .apply(undefined, importsValues);
            });
            result.source = source;
            if (isError(result)) {
                throw result;
            }
            return result;
        }
        function toLower(value) {
            return toString(value).toLowerCase();
        }
        function toUpper(value) {
            return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
                return string.replace(reTrim, "");
            }
            if (!string || !(chars = baseToString(chars))) {
                return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
                return string.replace(reTrimEnd, "");
            }
            if (!string || !(chars = baseToString(chars))) {
                return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined)) {
                return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
                return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
                var separator = "separator" in options ? options.separator : separator;
                length = "length" in options ? toInteger(options.length) : length;
                omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
                var strSymbols = stringToArray(string);
                strLength = strSymbols.length;
            }
            if (length >= strLength) {
                return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
                return omission;
            }
            var result = strSymbols
                ? castSlice(strSymbols, 0, end).join("")
                : string.slice(0, end);
            if (separator === undefined) {
                return result + omission;
            }
            if (strSymbols) {
                end += (result.length - end);
            }
            if (isRegExp(separator)) {
                if (string.slice(end).search(separator)) {
                    var match, substring = result;
                    if (!separator.global) {
                        separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g");
                    }
                    separator.lastIndex = 0;
                    while ((match = separator.exec(substring))) {
                        var newEnd = match.index;
                    }
                    result = result.slice(0, newEnd === undefined ? end : newEnd);
                }
            }
            else if (string.indexOf(baseToString(separator), end) != end) {
                var index = result.lastIndexOf(separator);
                if (index > -1) {
                    result = result.slice(0, index);
                }
            }
            return result + omission;
        }
        function unescape(string) {
            string = toString(string);
            return (string && reHasEscapedHtml.test(string))
                ? string.replace(reEscapedHtml, unescapeHtmlChar)
                : string;
        }
        var upperCase = createCompounder(function (result, word, index) {
            return result + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined : pattern;
            if (pattern === undefined) {
                return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
        }
        var attempt = baseRest(function (func, args) {
            try {
                return apply(func, undefined, args);
            }
            catch (e) {
                return isError(e) ? e : new Error(e);
            }
        });
        var bindAll = flatRest(function (object, methodNames) {
            arrayEach(methodNames, function (key) {
                key = toKey(key);
                baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
        });
        function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function (pair) {
                if (typeof pair[1] != "function") {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
                return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function (args) {
                var index = -1;
                while (++index < length) {
                    var pair = pairs[index];
                    if (apply(pair[0], this, args)) {
                        return apply(pair[1], this, args);
                    }
                }
            });
        }
        function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
            return function () {
                return value;
            };
        }
        function defaultTo(value, defaultValue) {
            return (value == null || value !== value) ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
            return value;
        }
        function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function (path, args) {
            return function (object) {
                return baseInvoke(object, path, args);
            };
        });
        var methodOf = baseRest(function (object, args) {
            return function (path) {
                return baseInvoke(object, path, args);
            };
        });
        function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null &&
                !(isObject(source) && (methodNames.length || !props.length))) {
                options = source;
                source = object;
                object = this;
                methodNames = baseFunctions(source, keys(source));
            }
            var chain = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function (methodName) {
                var func = source[methodName];
                object[methodName] = func;
                if (isFunc) {
                    object.prototype[methodName] = function () {
                        var chainAll = this.__chain__;
                        if (chain || chainAll) {
                            var result = object(this.__wrapped__), actions = result.__actions__ = copyArray(this.__actions__);
                            actions.push({ "func": func, "args": arguments, "thisArg": object });
                            result.__chain__ = chainAll;
                            return result;
                        }
                        return func.apply(object, arrayPush([this.value()], arguments));
                    };
                }
            });
            return object;
        }
        function noConflict() {
            if (root._ === this) {
                root._ = oldDash;
            }
            return this;
        }
        function noop() {
        }
        function nthArg(n) {
            n = toInteger(n);
            return baseRest(function (args) {
                return baseNth(args, n);
            });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
            return function (path) {
                return object == null ? undefined : baseGet(object, path);
            };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
            return [];
        }
        function stubFalse() {
            return false;
        }
        function stubObject() {
            return {};
        }
        function stubString() {
            return "";
        }
        function stubTrue() {
            return true;
        }
        function times(n, iteratee) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
                return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee = getIteratee(iteratee);
            n -= MAX_ARRAY_LENGTH;
            var result = baseTimes(length, iteratee);
            while (++index < n) {
                iteratee(index);
            }
            return result;
        }
        function toPath(value) {
            if (isArray(value)) {
                return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
        }
        var add = createMathOperation(function (augend, addend) {
            return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function (dividend, divisor) {
            return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
            return (array && array.length)
                ? baseExtremum(array, identity, baseGt)
                : undefined;
        }
        function maxBy(array, iteratee) {
            return (array && array.length)
                ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
                : undefined;
        }
        function mean(array) {
            return baseMean(array, identity);
        }
        function meanBy(array, iteratee) {
            return baseMean(array, getIteratee(iteratee, 2));
        }
        function min(array) {
            return (array && array.length)
                ? baseExtremum(array, identity, baseLt)
                : undefined;
        }
        function minBy(array, iteratee) {
            return (array && array.length)
                ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
                : undefined;
        }
        var multiply = createMathOperation(function (multiplier, multiplicand) {
            return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function (minuend, subtrahend) {
            return minuend - subtrahend;
        }, 0);
        function sum(array) {
            return (array && array.length)
                ? baseSum(array, identity)
                : 0;
        }
        function sumBy(array, iteratee) {
            return (array && array.length)
                ? baseSum(array, getIteratee(iteratee, 2))
                : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, (function () {
            var source = {};
            baseForOwn(lodash, function (func, methodName) {
                if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                    source[methodName] = func;
                }
            });
            return source;
        }()), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (methodName) {
            lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function (methodName, index) {
            LazyWrapper.prototype[methodName] = function (n) {
                n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
                var result = (this.__filtered__ && !index)
                    ? new LazyWrapper(this)
                    : this.clone();
                if (result.__filtered__) {
                    result.__takeCount__ = nativeMin(n, result.__takeCount__);
                }
                else {
                    result.__views__.push({
                        "size": nativeMin(n, MAX_ARRAY_LENGTH),
                        "type": methodName + (result.__dir__ < 0 ? "Right" : "")
                    });
                }
                return result;
            };
            LazyWrapper.prototype[methodName + "Right"] = function (n) {
                return this.reverse()[methodName](n).reverse();
            };
        });
        arrayEach(["filter", "map", "takeWhile"], function (methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function (iteratee) {
                var result = this.clone();
                result.__iteratees__.push({
                    "iteratee": getIteratee(iteratee, 3),
                    "type": type
                });
                result.__filtered__ = result.__filtered__ || isFilter;
                return result;
            };
        });
        arrayEach(["head", "last"], function (methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function () {
                return this[takeName](1).value()[0];
            };
        });
        arrayEach(["initial", "tail"], function (methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function () {
                return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
        });
        LazyWrapper.prototype.compact = function () {
            return this.filter(identity);
        };
        LazyWrapper.prototype.find = function (predicate) {
            return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function (predicate) {
            return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
            if (typeof path == "function") {
                return new LazyWrapper(this);
            }
            return this.map(function (value) {
                return baseInvoke(value, path, args);
            });
        });
        LazyWrapper.prototype.reject = function (predicate) {
            return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function (start, end) {
            start = toInteger(start);
            var result = this;
            if (result.__filtered__ && (start > 0 || end < 0)) {
                return new LazyWrapper(result);
            }
            if (start < 0) {
                result = result.takeRight(-start);
            }
            else if (start) {
                result = result.drop(start);
            }
            if (end !== undefined) {
                end = toInteger(end);
                result = end < 0 ? result.dropRight(-end) : result.take(end - start);
            }
            return result;
        };
        LazyWrapper.prototype.takeRightWhile = function (predicate) {
            return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function () {
            return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function (func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? ("take" + (methodName == "last" ? "Right" : "")) : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
                return;
            }
            lodash.prototype[methodName] = function () {
                var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee = args[0], useLazy = isLazy || isArray(value);
                var interceptor = function (value) {
                    var result = lodashFunc.apply(lodash, arrayPush([value], args));
                    return (isTaker && chainAll) ? result[0] : result;
                };
                if (useLazy && checkIteratee && typeof iteratee == "function" && iteratee.length != 1) {
                    isLazy = useLazy = false;
                }
                var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
                if (!retUnwrapped && useLazy) {
                    value = onlyLazy ? value : new LazyWrapper(this);
                    var result = func.apply(value, args);
                    result.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined });
                    return new LodashWrapper(result, chainAll);
                }
                if (isUnwrapped && onlyLazy) {
                    return func.apply(this, args);
                }
                result = this.thru(interceptor);
                return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
            };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function (methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function () {
                var args = arguments;
                if (retUnwrapped && !this.__chain__) {
                    var value = this.value();
                    return func.apply(isArray(value) ? value : [], args);
                }
                return this[chainName](function (value) {
                    return func.apply(isArray(value) ? value : [], args);
                });
            };
        });
        baseForOwn(LazyWrapper.prototype, function (func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
                var key = (lodashFunc.name + ""), names = realNames[key] || (realNames[key] = []);
                names.push({ "name": methodName, "func": lodashFunc });
            }
        });
        realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
                "name": "wrapper",
                "func": undefined
            }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
    });
    var _ = runInContext();
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define("lodash", function () {
            return _;
        });
    }
    else if (freeModule) {
        root._ = _;
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
    }
    else {
        root._ = _;
    }
}.call(this));
(function () {
    var info;
    if (util.isNodeJs()) {
        var mapstrace = require("mapstrace");
        var path = require("path");
        var cwd = process.cwd();
        var queueFunction = new util.QueueFunction();
        info = function (err, module, args) {
            var now = new Date();
            queueFunction.add(function (finish) {
                mapstrace.build(err, false, function (items) {
                    var item = items[1] || items[0];
                    var str = "";
                    str += " " + util.dateFormat("hh:mm:ss:SSS", now) + " ";
                    str += module + ": " + Array.prototype.slice.call(args).join(" ") + " ";
                    str += "  (" + path.resolve(cwd + "/" + item.source) + ":" + item.line + ":" + item.column + ") ";
                    console.log(str);
                    finish();
                });
            });
        };
    }
    else {
        info = function (err, module, args) {
            var now = new Date();
            var str = "";
            str += " " + util.dateFormat("hh:mm:ss:SSS", now) + " ";
            str += module + ": " + Array.prototype.slice.call(args).join(" ") + " ";
            console.log(str);
        };
    }
    function emptyFunction() {
    }
    function logInfo() {
        info(new Error(), "INFO", arguments);
    }
    function logWarn() {
        info(new Error(), "WARN", arguments);
    }
    function logError() {
        info(new Error(), "ERROR", arguments);
    }
    var log = {
        disable: function () {
            log.i = emptyFunction;
            log.w = emptyFunction;
            log.e = emptyFunction;
        },
        enable: function () {
            log.i = logInfo;
            log.w = logWarn;
            log.e = logError;
        },
    };
    log.enable();
    addGlobal("log", log);
})();
(function (pool, math) {
    var global = this, width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
    function seedrandom(seed, options, callback) {
        var serializeData;
        if (typeof (seed) === "object") {
            serializeData = seed;
            seed = serializeData.seed;
            options = { state: serializeData.state };
        }
        var key = [];
        options = (options == true) ? { entropy: true } : (options || {});
        var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] :
            (seed == null) ? autoseed() : seed, 3), key);
        var arc4 = new ARC4(key);
        var prng = function () {
            var n = arc4.g(chunks), d = startdenom, x = 0;
            while (n < significance) {
                n = (n + x) * width;
                d *= width;
                x = arc4.g(1);
            }
            while (n >= overflow) {
                n /= 2;
                d /= 2;
                x >>>= 1;
            }
            return (n + x) / d;
        };
        prng.int32 = function () { return arc4.g(4) | 0; };
        prng.quick = function () { return arc4.g(4) / 0x100000000; };
        prng.range = function (min, max) {
            var d = max - min;
            return min + Math.floor(prng.quick() * d);
        };
        prng.shuffle = function (arr) {
            var len = arr.length;
            var tmp, swap;
            for (var i = len; i > 1; --i) {
                tmp = arr[i - 1];
                swap = prng.range(0, i);
                arr[i - 1] = arr[swap];
                arr[swap] = tmp;
            }
        };
        prng.choose = function (arr, num) {
            var choosed = [];
            var copy = [];
            for (var i = 0; i < arr.length; ++i) {
                copy[i] = arr[i];
            }
            prng.shuffle(copy);
            for (var i = 0; i < num; ++i) {
                choosed[i] = copy[i];
            }
            return choosed;
        };
        prng.rangeToMax = function (min, max) {
            var d = 1 + max - min;
            return min + Math.floor(prng.quick() * d);
        };
        prng.weights = function (objs) {
            var roll = prng.quick();
            var total = 0;
            var w;
            for (var k in objs) {
                total += objs[k];
                if (roll < total) {
                    return k;
                }
            }
        };
        prng.array = function (arr) {
            var idx = prng.range(0, arr.length);
            return arr[idx];
        };
        prng.index = function (arr) {
            return prng.range(0, arr.length);
        };
        prng.double = prng;
        prng.serialize = function () {
            return {
                seed: seed,
                state: prng.state(),
            };
        };
        mixkey(tostring(arc4.S), pool);
        return (options.pass || callback ||
            function (prng, seed, is_math_call, state) {
                if (state) {
                    if (state.S) {
                        copy(state, arc4);
                    }
                }
                prng.state = function () { return copy(arc4, {}); };
                if (is_math_call) {
                    math[rngname] = prng;
                    return seed;
                }
                else
                    return prng;
            })(prng, shortseed, "global" in options ? options.global : (this == math), options.state);
    }
    math["seed" + rngname] = seedrandom;
    function ARC4(key) {
        var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
        if (!keylen) {
            key = [keylen++];
        }
        while (i < width) {
            s[i] = i++;
        }
        for (i = 0; i < width; i++) {
            s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
            s[j] = t;
        }
        (me.g = function (count) {
            var t, r = 0, i = me.i, j = me.j, s = me.S;
            while (count--) {
                t = s[i = mask & (i + 1)];
                r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
            }
            me.i = i;
            me.j = j;
            return r;
        })(width);
    }
    function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
    }
    function flatten(obj, depth) {
        var result = [], typ = (typeof obj), prop;
        if (depth && typ == "object") {
            for (prop in obj) {
                try {
                    result.push(flatten(obj[prop], depth - 1));
                }
                catch (e) { }
            }
        }
        return (result.length ? result : typ == "string" ? obj : obj + "\0");
    }
    function mixkey(seed, key) {
        var stringseed = seed + "", smear, j = 0;
        while (j < stringseed.length) {
            key[mask & j] =
                mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
        }
        return tostring(key);
    }
    function autoseed() {
        try {
            var out;
            if (nodecrypto && (out = nodecrypto.randomBytes)) {
                out = out(width);
            }
            else {
                out = new Uint8Array(width);
                (global.crypto || global.msCrypto).getRandomValues(out);
            }
            return tostring(out);
        }
        catch (e) {
            var browser = global.navigator, plugins = browser && browser.plugins;
            return [+new Date(), global, plugins, global.screen, tostring(pool)];
        }
    }
    function tostring(a) {
        return String.fromCharCode.apply(0, a);
    }
    mixkey(math.random(), pool);
    if ((typeof module) == "object" && module.exports) {
        module.exports = seedrandom;
        try {
            nodecrypto = require("crypto");
        }
        catch (ex) { }
    }
    else if ((typeof define) == "function" && define.amd) {
        define(function () { return seedrandom; });
    }
    addGlobal("SeedRandom", seedrandom);
})([], Math);
function makeWindowTimer(target, timeFunc) {
    "use strict";
    var counter = 1, inCallback = false, timersByHandle = {}, timersByTime = [null];
    function timerCompare(t1, t2) {
        return t1.time < t2.time ? -1 :
            (t1.time === t2.time && t1.handle < t2.handle ? -1 : 0);
    }
    function heapFixDown(heap, i, lesscmp) {
        var j, tmp;
        j = i * 2;
        while (j < heap.length) {
            if (j + 1 < heap.length &&
                lesscmp(heap[j + 1], heap[j]) < 0) {
                j = j + 1;
            }
            if (lesscmp(heap[i], heap[j]) < 0) {
                break;
            }
            tmp = heap[j];
            heap[j] = heap[i];
            heap[i] = tmp;
            i = j;
            j = i * 2;
        }
    }
    function heapFixUp(heap, i, lesscmp) {
        var j, tmp;
        while (i > 1) {
            j = i >> 1;
            if (lesscmp(heap[j], heap[i]) < 0) {
                break;
            }
            tmp = heap[j];
            heap[j] = heap[i];
            heap[i] = tmp;
            i = j;
        }
    }
    function heapPop(heap, lesscmp) {
        heap[1] = heap[heap.length - 1];
        heap.pop();
        heapFixDown(heap, 1, lesscmp);
    }
    function addTimer(code, delay, repeat, argsIfFn) {
        var handle, timer;
        if (typeof code !== "function") {
            code = String(code);
            argsIfFn = null;
        }
        delay = Number(delay) || 0;
        if (inCallback) {
            delay = Math.max(delay, 4);
        }
        handle = counter;
        counter += 1;
        timer = {
            args: argsIfFn,
            cancel: false,
            code: code,
            handle: handle,
            repeat: repeat ? Math.max(delay, 4) : 0,
            time: timeFunc() + delay
        };
        timersByHandle[handle] = timer;
        timersByTime.push(timer);
        heapFixUp(timersByTime, timersByTime.length - 1, timerCompare);
        return handle;
    }
    function cancelTimer(handle, repeat) {
        var timer;
        if (timersByHandle.hasOwnProperty(handle)) {
            timer = timersByHandle[handle];
            if (repeat === (timer.repeat > 0)) {
                timer.cancel = true;
            }
        }
    }
    function restTime(handle) {
        var timer;
        if (timersByHandle.hasOwnProperty(handle)) {
            timer = timersByHandle[handle];
            return timeFunc() - timer.time;
        }
        return 0;
        target.restTime = restTime;
        function modifyTime(handler, time) {
            var timer;
            if (timersByHandle.hasOwnProperty(handle)) {
                timer = timersByHandle[handle];
                timer.time += time;
                var idx = timersByTime.indexOf(timer);
                if (idx !== -1) {
                    if (time > 0) {
                        heapFixDown(timersByTime, idx, timerCompare);
                    }
                    else if (time < 0) {
                        heapFixUp(timersByTime, idx, timerCompare);
                    }
                }
            }
        }
        target.modifyTime = modifyTime;
        function clearInterval(handle) {
            cancelTimer(handle, true);
        }
        target.clearInterval = clearInterval;
        function clearTimeout(handle) {
            cancelTimer(handle, false);
        }
        target.clearTimeout = clearTimeout;
        function setInterval(code, delay) {
            return addTimer(code, delay, true, Array.prototype.slice.call(arguments, 2));
        }
        target.setInterval = setInterval;
        function setTimeout(code, delay) {
            return addTimer(code, delay, false, Array.prototype.slice.call(arguments, 2));
        }
        target.setTimeout = setTimeout;
        return function timerLoop(nonblocking) {
            var now, timer;
            now = timeFunc();
            while (timersByTime.length > 1) {
                timer = timersByTime[1];
                if (timer.cancel) {
                    delete timersByHandle[timer.handle];
                    heapPop(timersByTime, timerCompare);
                }
                else {
                    if (timer.time <= now) {
                        inCallback = true;
                        try {
                            if (typeof timer.code === "function") {
                                timer.code.apply(undefined, timer.args);
                            }
                            else {
                                eval(timer.code);
                            }
                        }
                        finally {
                            inCallback = false;
                        }
                        if (timer.repeat > 0 && !timer.cancel) {
                            timer.time += timer.repeat;
                            heapFixDown(timersByTime, 1, timerCompare);
                        }
                        else {
                            delete timersByHandle[timer.handle];
                            heapPop(timersByTime, timerCompare);
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
    }
}
var tbgame;
(function (tbgame) {
    tbgame.keycode = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "a": "a",
        "b": "b",
        "c": "c",
        "d": "d",
        "e": "e",
        "f": "f",
        "g": "g",
        "h": "h",
        "i": "i",
        "j": "j",
        "k": "k",
        "l": "l",
        "m": "m",
        "n": "n",
        "o": "o",
        "p": "p",
        "q": "q",
        "r": "r",
        "s": "s",
        "t": "t",
        "u": "u",
        "v": "v",
        "w": "w",
        "x": "x",
        "y": "y",
        "z": "z",
    };
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var EntityEvent;
    (function (EntityEvent) {
        EntityEvent["PropertySet"] = "PropertySet";
        EntityEvent["PropertyChanged"] = "PropertyChanged";
        EntityEvent["TagAdded"] = "TagAdded";
        EntityEvent["TagRemoved"] = "TagRemoved";
    })(EntityEvent = tbgame.EntityEvent || (tbgame.EntityEvent = {}));
    ;
    function paramToString(p1, p2, p3, p4) {
        var str = "";
        if (p1 !== undefined) {
            str += p1 + " ";
        }
        if (p2 !== undefined) {
            str += p2 + " ";
        }
        if (p3 !== undefined) {
            str += p3 + " ";
        }
        if (p4 !== undefined) {
            str += p4 + " ";
        }
        return str;
    }
    tbgame.paramToString = paramToString;
    var cacheAfterGetObjs = new util.CacheObjects(null, null, null, 100);
    var localSyncId = 1;
    function genSyncId() {
        return localSyncId++;
    }
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity() {
            var _this = _super.call(this) || this;
            _this.syncId = genSyncId();
            return _this;
        }
        Entity.prototype.autoCancel = function (func) {
            if (!this.autoCancelFuncs) {
                this.autoCancelFuncs = [];
            }
            this.autoCancelFuncs.push(func);
        };
        Entity.prototype.onDestroy = function () {
            var autoCancelFuncs = this.autoCancelFuncs;
            for (var i = 0; i < autoCancelFuncs.length; ++i) {
                autoCancelFuncs[i]();
            }
        };
        Entity.prototype.addValueProcesser = function (name, func) {
            if (!this.valueProcesser) {
                this.valueProcesser = {};
            }
            if (!this.valueProcesser[name]) {
                this.valueProcesser[name] = [];
            }
            var obj = {
                func: func,
            };
            var funcs = this.valueProcesser[name];
            funcs.push(obj);
            return function () {
                util.removeFromArray(funcs, obj);
            };
        };
        Entity.prototype.processValue = function (name, v, param) {
            if (!this.valueProcesser) {
                return v;
            }
            if (!this.valueProcesser[name]) {
                return v;
            }
            var funcs = this.valueProcesser[name];
            for (var i = 0; i < funcs.length; ++i) {
                v = funcs[i].func(v, param);
            }
            return v;
        };
        Entity.prototype.addPropertyProcessAfterGet = function (name, func, priority) {
            if (priority === void 0) { priority = 0; }
            var funcs = this.propertyProcessAfterGet[name];
            if (!funcs) {
                funcs = util.FastArray.pnew();
                this.propertyProcessAfterGet[name] = funcs;
            }
            var tempFunc = cacheAfterGetObjs.get();
            tempFunc.func = func;
            tempFunc.priority = priority;
            funcs.push(tempFunc);
            return tempFunc;
        };
        Entity.prototype.removePropertyProcessAfterGet = function (name, tempFunc) {
            this.propertyProcessAfterGet[name].erase(tempFunc);
            cacheAfterGetObjs.put(tempFunc);
        };
        Entity.prototype.addPropertyProcessBeforeChange = function (name, func) {
            var funcs = this.propertyProcessBeforeChange[name];
            if (!funcs) {
                funcs = [];
                this.propertyProcessBeforeChange[name] = funcs;
            }
            var tempFunc = function () {
                return func.call(null, arguments);
            };
            funcs.push(tempFunc);
            return function () {
                var idx = funcs.indexOf(tempFunc);
                if (idx != -1) {
                    util.splice(funcs, idx);
                }
            };
        };
        Entity.prototype.onEventsMap = function (eventsMap) {
            var handlers = [];
            for (var event in eventsMap) {
                handlers.push(this.on(event, eventsMap[event]));
            }
            return function () {
                if (!handlers) {
                    log.e("重复取消事件注册");
                    return;
                }
                for (var i = 0, len = handlers.length; i < len; ++i) {
                    handlers[i]();
                }
                handlers = null;
            };
        };
        Entity.prototype.hasTag = function (tag) {
            if (!this.tags) {
                return false;
            }
            return this.tags[tag] > 0;
        };
        Entity.prototype.addTag = function (tag) {
            if (!this.tags) {
                this.tags = {};
            }
            if (this.tags[tag]) {
                this.tags[tag]++;
            }
            else {
                this.tags[tag] = 1;
            }
        };
        Entity.prototype.setProperty = function (name, v) {
            this.properties[name] = v;
            this.emit(EntityEvent.PropertySet, name, v);
        };
        Entity.prototype.changeProperty = function (name, v, changeInfo) {
            var funcs = this.propertyProcessBeforeChange[name];
            if (funcs) {
                var modified = v;
                for (var i = 0, len = funcs.length; i < len; ++i) {
                    modified = funcs[i](modified, changeInfo);
                }
                log.i(this.name + "属性值" + name + "变化" + v + "被修改成变化" + modified);
                v = modified;
            }
            if (!this.properties[name]) {
                this.properties[name] = v;
            }
            else {
                this.properties[name] += v;
            }
            log.i(this.name + "属性值" + name + "变化了" + v + "，从" + (this.properties[name] - v) + "变成" + this.properties[name]);
            this.emit(EntityEvent.PropertyChanged, name, this.properties[name], v, changeInfo);
            return v;
        };
        Entity.prototype.changePropertyClamp = function (name, v, min, max, changeInfo) {
            var funcs = this.propertyProcessBeforeChange[name];
            if (funcs) {
                var modified = v;
                for (var i = 0, len = funcs.length; i < len; ++i) {
                    modified = funcs[i](modified, changeInfo);
                }
                log.i(this.name + "属性值" + name + "变化" + v + "被修改成变化" + modified);
                v = modified;
            }
            if (min != null && v < min) {
                v = min;
            }
            else if (max != null && v > max) {
                v = max;
            }
            if (!this.properties[name]) {
                this.properties[name] = v;
            }
            else {
                this.properties[name] += v;
            }
            log.i(this.name + "属性值" + name + "变化了" + v + "，从" + (this.properties[name] - v) + "变成" + this.properties[name]);
            this.emit(EntityEvent.PropertyChanged, name, this.properties[name], v, changeInfo);
            return v;
        };
        Entity.prototype.getProperty = function (name) {
            var v = this.properties[name];
            var funcs = this.propertyProcessAfterGet[name];
            if (funcs) {
                var copy = funcs.clone();
                var modified = v;
                for (var i = 0, len = copy.length; i < len; ++i) {
                    modified = copy.get(i).func(modified, null);
                }
                v = modified;
                copy.pdispose();
            }
            return v;
        };
        Entity.prototype.processProperty = function (name, v, param) {
            var funcs = this.propertyProcessAfterGet[name];
            if (funcs) {
                var copy = funcs.clone();
                var modified = v;
                for (var i = 0, len = copy.length; i < len; ++i) {
                    modified = copy.get(i).func(modified, param);
                }
                v = modified;
                copy.pdispose();
            }
            return v;
        };
        Entity.prototype.getNumberProperty = function (name) {
            var v = this.getProperty(name);
            if (v === undefined || v === null) {
                return 0;
            }
            return v;
        };
        Entity.prototype.toStringProperty = function () {
            var str = "";
            for (var k in this.properties) {
                var pro = this.properties[k];
                str += k + ":" + pro + " ";
            }
            return str;
        };
        return Entity;
    }(EventEmitter));
    tbgame.Entity = Entity;
    addGlobal("tbgame", tbgame);
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var DataAdapter = (function () {
        function DataAdapter() {
        }
        return DataAdapter;
    }());
    tbgame.DataAdapter = DataAdapter;
    var DARetCode;
    (function (DARetCode) {
        DARetCode[DARetCode["OK"] = 0] = "OK";
        DARetCode[DARetCode["DUPLICATE_ID"] = 1] = "DUPLICATE_ID";
        DARetCode[DARetCode["NO_DATA"] = 2] = "NO_DATA";
    })(DARetCode = tbgame.DARetCode || (tbgame.DARetCode = {}));
    var DataCollection = (function () {
        function DataCollection() {
        }
        return DataCollection;
    }());
    tbgame.DataCollection = DataCollection;
    var LocalStorageCollection = (function (_super) {
        __extends(LocalStorageCollection, _super);
        function LocalStorageCollection(name, adapter) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.dbprefix = name + "$$";
            _this.adapter = adapter;
            return _this;
        }
        LocalStorageCollection.prototype.formatKey = function (id) {
            return this.dbprefix + id;
        };
        LocalStorageCollection.prototype.find = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var str;
                return __generator(this, function (_a) {
                    str = this.adapter.get(this.formatKey(id));
                    if (str) {
                        return [2, JSON.parse(str)];
                    }
                    else {
                        return [2, null];
                    }
                    return [2];
                });
            });
        };
        LocalStorageCollection.prototype.insert = function (id, objectParam) {
            return __awaiter(this, void 0, void 0, function () {
                var key, str;
                return __generator(this, function (_a) {
                    key = this.formatKey(id);
                    str = this.adapter.get(key);
                    if (str) {
                        return [2, DARetCode.DUPLICATE_ID];
                    }
                    this.adapter.set(key, JSON.stringify(objectParam));
                    return [2, DARetCode.OK];
                });
            });
        };
        LocalStorageCollection.prototype.update = function (id, updateParam) {
            return __awaiter(this, void 0, void 0, function () {
                var key, str, obj, k;
                return __generator(this, function (_a) {
                    key = this.formatKey(id);
                    str = this.adapter.get(key);
                    if (!str) {
                        return [2, DARetCode.NO_DATA];
                    }
                    obj = JSON.parse(str);
                    for (k in updateParam) {
                        obj[k] = updateParam[k];
                    }
                    this.adapter.set(key, JSON.stringify(obj));
                    return [2, DARetCode.OK];
                });
            });
        };
        LocalStorageCollection.prototype.upsert = function (id, objectParam) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    key = this.formatKey(id);
                    this.adapter.set(key, JSON.stringify(objectParam));
                    return [2, DARetCode.OK];
                });
            });
        };
        LocalStorageCollection.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    key = this.formatKey(id);
                    this.adapter.del(key);
                    return [2, DARetCode.OK];
                });
            });
        };
        return LocalStorageCollection;
    }(DataCollection));
    tbgame.LocalStorageCollection = LocalStorageCollection;
    var LocalStorageDataAdapter = (function (_super) {
        __extends(LocalStorageDataAdapter, _super);
        function LocalStorageDataAdapter(set, get, del) {
            var _this = _super.call(this) || this;
            _this.collections = {};
            _this.set = set;
            _this.get = get;
            _this.del = del;
            return _this;
        }
        LocalStorageDataAdapter.prototype.getCollection = function (name) {
            if (!this.collections[name]) {
                this.collections[name] = new LocalStorageCollection(name, this);
            }
            return this.collections[name];
        };
        return LocalStorageDataAdapter;
    }(DataAdapter));
    tbgame.LocalStorageDataAdapter = LocalStorageDataAdapter;
    var MemoryStorageDataAdapter = (function (_super) {
        __extends(MemoryStorageDataAdapter, _super);
        function MemoryStorageDataAdapter() {
            var _this = _super.call(this) || this;
            _this.mem = {};
            _this.localStorageDataAdapter = new LocalStorageDataAdapter(_this.set.bind(_this), _this.get.bind(_this), _this.del.bind(_this));
            return _this;
        }
        MemoryStorageDataAdapter.prototype.set = function (key, value) {
            this.mem[key] = value;
        };
        MemoryStorageDataAdapter.prototype.get = function (key) {
            return this.mem[key];
        };
        MemoryStorageDataAdapter.prototype.del = function (key) {
            this.mem[key] = null;
        };
        MemoryStorageDataAdapter.prototype.getCollection = function (name) {
            return this.localStorageDataAdapter.getCollection(name);
        };
        return MemoryStorageDataAdapter;
    }(DataAdapter));
    tbgame.MemoryStorageDataAdapter = MemoryStorageDataAdapter;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var PriorityArrayFuncs = (function () {
        function PriorityArrayFuncs() {
            this._funcs = [];
            this._toAdd = [];
            this._toRemove = [];
            this._dirty = false;
            this._inProcess = false;
        }
        PriorityArrayFuncs.prototype.add = function (func, priority) {
            if (priority === void 0) { priority = 0; }
            var funcs = this._funcs;
            var self = this;
            var obj = {
                func: func,
                priority: priority,
            };
            if (this._inProcess) {
                this._toAdd.push(obj);
            }
            else {
                funcs.push(obj);
                self._dirty = true;
            }
            return function () {
                var idx = funcs.indexOf(obj);
                if (idx != -1) {
                    util.splice(funcs, idx);
                    self._dirty = true;
                }
            };
        };
        PriorityArrayFuncs.prototype.process = function () {
            var funcs = this._funcs;
        };
        return PriorityArrayFuncs;
    }());
    tbgame.PriorityArrayFuncs = PriorityArrayFuncs;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Buff = (function (_super) {
        __extends(Buff, _super);
        function Buff() {
            return _super.call(this) || this;
        }
        return Buff;
    }(tbgame.Entity));
    tbgame.Buff = Buff;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var PlaceType;
    (function (PlaceType) {
        PlaceType[PlaceType["Deck"] = 0] = "Deck";
        PlaceType[PlaceType["Hand"] = 1] = "Hand";
        PlaceType[PlaceType["Grave"] = 2] = "Grave";
        PlaceType[PlaceType["Banish"] = 3] = "Banish";
    })(PlaceType = tbgame.PlaceType || (tbgame.PlaceType = {}));
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card(events) {
            return _super.call(this) || this;
        }
        Card.prototype.init = function () {
            this.placeType = PlaceType.Deck;
        };
        Card.prototype.toStringInfo = function () {
            return "名称:" + this.name;
        };
        Card.prototype.addKeyword = function (keyword) {
        };
        return Card;
    }(tbgame.Entity));
    tbgame.Card = Card;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var MAX_CHOOSE_NUM = 10;
    var ControllerEvent;
    (function (ControllerEvent) {
        ControllerEvent["Choose1"] = "Choose1";
        ControllerEvent["Choose2"] = "Choose2";
        ControllerEvent["Choose3"] = "Choose3";
        ControllerEvent["Choose4"] = "Choose4";
        ControllerEvent["Choose5"] = "Choose5";
        ControllerEvent["Choose6"] = "Choose6";
        ControllerEvent["Choose7"] = "Choose7";
        ControllerEvent["Choose8"] = "Choose8";
        ControllerEvent["Choose9"] = "Choose9";
        ControllerEvent["Choose10"] = "Choose10";
        ControllerEvent["Confirm"] = "Confirm";
        ControllerEvent["Deck"] = "Deck";
        ControllerEvent["Grave"] = "Grave";
        ControllerEvent["Back"] = "Back";
    })(ControllerEvent = tbgame.ControllerEvent || (tbgame.ControllerEvent = {}));
    function toChooseEvent(idx) {
        var num = idx + 1;
        return "Choose" + num;
    }
    tbgame.toChooseEvent = toChooseEvent;
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this) || this;
            _this.pressKey = _this.pressKey.bind(_this);
            return _this;
        }
        Controller.prototype.enableInput = function () {
            log.w("Controller的子类需要实现enableInput方法");
        };
        Controller.prototype.disableInput = function () {
            log.w("Controller的子类需要实现disableInput方法");
        };
        Controller.prototype.initEventKeys = function (eventKeys) {
            this._eventKeys = eventKeys;
            this._updateKeyEventMap();
        };
        Controller.prototype._updateKeyEventMap = function () {
            var keyEventMap = {};
            for (var event in this._eventKeys) {
                var keys = this._eventKeys[event];
                for (var i = 0, len = keys.length; i < len; ++i) {
                    var key = keys[i];
                    if (keyEventMap[key]) {
                        log.e("重复的按键定义,只有最后一个按键绑定生效，按键" + key + "已经绑定了事件" + keyEventMap[key] + "又请求绑定" + event);
                    }
                    keyEventMap[key] = event;
                }
            }
            this._keyEventMap = keyEventMap;
        };
        Controller.prototype._wrapTargetEventFunc = function (target, func) {
            return function () { return func(target); };
        };
        Controller.prototype.formatChooseTargetEvent = function (events, targets, func) {
            for (var i = 0, len = targets.length; i < MAX_CHOOSE_NUM && i < len; ++i) {
                events[toChooseEvent(i)] = this._wrapTargetEventFunc(targets[i], func);
            }
        };
        Controller.prototype.getChooseCardString = function (cards) {
            var str = "";
            for (var i = 0; i < MAX_CHOOSE_NUM && i < cards.length; ++i) {
                str += cards[i].name + this.getStringEventKey(toChooseEvent(i)) + " ";
            }
            return str;
        };
        Controller.prototype.setPlayer = function (player) {
            this.player = player;
        };
        Controller.prototype.getStringEventKey = function (event) {
            var keys = this._eventKeys[event];
            if (!keys) {
                return "(none)";
            }
            var str = "(";
            for (var i = 0, len = keys.length; i < len; ++i) {
                str += keys[i];
                if (i < len - 1) {
                    str += "|";
                }
            }
            return str + ")";
        };
        Controller.prototype.pressKey = function (key) {
            var event = this._keyEventMap[key];
            if (event) {
                this.emit(event);
            }
        };
        Controller.prototype.choosePlayOperation = function (cb) {
            cb();
        };
        Controller.prototype.chooseTarget = function (condition, cb) {
            cb(null);
        };
        Controller.prototype.chooseCardFromCards = function (cards, num, canCancel, cb) {
            cb(false, cards);
        };
        Controller.prototype.chooseCardFromRegion = function (region, num, canCancel, cb) {
            cb(false, region.getCards());
        };
        return Controller;
    }(tbgame.Entity));
    tbgame.Controller = Controller;
    var ControllerPlayer = (function (_super) {
        __extends(ControllerPlayer, _super);
        function ControllerPlayer() {
            return _super.call(this) || this;
        }
        return ControllerPlayer;
    }(Controller));
    tbgame.ControllerPlayer = ControllerPlayer;
    var ControllerMonsterEasy = (function (_super) {
        __extends(ControllerMonsterEasy, _super);
        function ControllerMonsterEasy() {
            return _super.call(this) || this;
        }
        return ControllerMonsterEasy;
    }(Controller));
    tbgame.ControllerMonsterEasy = ControllerMonsterEasy;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var FakeName = (function (_super) {
        __extends(FakeName, _super);
        function FakeName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FakeName.prototype.getName = function () { return "fake"; };
        FakeName.getName = function () { return "fake"; };
        FakeName.createFakeNameForClass = function (target) {
            function getName() {
                return target.name;
            }
            ;
            target.getName = getName;
            target.prototype.getName = getName;
        };
        return FakeName;
    }(tbgame.Entity));
    tbgame.FakeName = FakeName;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var MAX_TURN_NUM = 3;
    var GameMode = (function (_super) {
        __extends(GameMode, _super);
        function GameMode(viewer) {
            var _this = _super.call(this) || this;
            _this.players = [];
            _this.groups = {};
            _this.viewer = viewer;
            return _this;
        }
        GameMode.prototype.init = function () {
        };
        GameMode.prototype.addPlayer = function (player) {
            this.players.push(player);
            var group = this.groups[player.group];
            if (!group) {
                group = [];
                this.groups[player.group] = group;
            }
            group.push(player);
        };
        GameMode.prototype.checkWin = function () {
            var loseGroup = [];
            var groupNum = 0;
            for (var name in this.groups) {
                groupNum++;
                var group = this.groups[name];
                var lose = true;
                for (var i = 0; i < group.length; ++i) {
                    var player = group[i];
                    if (player.getProperty("hp") > 0) {
                        lose = false;
                        break;
                    }
                }
                if (lose) {
                    loseGroup.push(name);
                }
            }
            if (groupNum - loseGroup.length <= 1) {
                for (var name in this.groups) {
                    var group = this.groups[name];
                    var win = loseGroup.indexOf(name) == -1;
                    for (var i = 0; i < group.length; ++i) {
                        var player = group[i];
                        player.gameFinish(win);
                    }
                }
            }
        };
        GameMode.prototype.start = function () {
            var _this = this;
            log.i("角色开始准备游戏");
            util.waitGroupCallByName(this.players, "prepare", function () {
                log.i("所有角色准备完毕，游戏开始");
                _this.next(1);
            });
        };
        GameMode.prototype.next = function (turnNum) {
            var _this = this;
            if (turnNum > MAX_TURN_NUM) {
                log.i("回合数超过" + MAX_TURN_NUM + ",自动结束");
                return;
            }
            log.i("第" + turnNum + "回合开始");
            util.waitGroupCallByFunction(this.players, this.turn.start, function () {
                log.i("第" + turnNum + "回合结束");
                _this.next(turnNum + 1);
            }, turnNum);
        };
        GameMode.prototype.step = function (num) {
        };
        return GameMode;
    }(tbgame.Entity));
    tbgame.GameMode = GameMode;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var InputEventsStack = (function () {
        function InputEventsStack(controller) {
            this._controller = controller;
            this._inputEventsStack = [];
        }
        InputEventsStack.prototype._useTopEvents = function () {
            var len = this._inputEventsStack.length;
            if (len <= 0) {
                return;
            }
            var inputEventCallback = this._inputEventsStack[len - 1];
            if (this._curInputEventCallback === inputEventCallback) {
                log.w("重复使用最顶部的事件");
                return;
            }
            this._curInputEventCallback = inputEventCallback;
            this._stackEventHandler = this._controller.onEventsMap(inputEventCallback.events);
        };
        InputEventsStack.prototype.push = function (events, finish) {
            if (this._stackEventHandler) {
                this._stackEventHandler();
                this._stackEventHandler = null;
            }
            this._inputEventsStack.push({
                events: events,
                cb: finish,
            });
            this._useTopEvents();
            this._controller.enableInput();
        };
        InputEventsStack.prototype.pop = function () {
            var inputEventCallback = this._inputEventsStack.pop();
            this._stackEventHandler();
            this._stackEventHandler = null;
            if (this._inputEventsStack.length <= 0) {
                this._controller.disableInput();
            }
            else {
                this._useTopEvents();
            }
            if (inputEventCallback.cb) {
                inputEventCallback.cb();
            }
        };
        return InputEventsStack;
    }());
    tbgame.InputEventsStack = InputEventsStack;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            return _super.call(this) || this;
        }
        return Item;
    }(tbgame.Entity));
    tbgame.Item = Item;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Logic = (function () {
        function Logic() {
        }
        return Logic;
    }());
    tbgame.Logic = Logic;
    var Keyword = (function (_super) {
        __extends(Keyword, _super);
        function Keyword(fn) {
            return _super.call(this) || this;
        }
        Keyword.prototype.exec = function () {
        };
        return Keyword;
    }(Logic));
    tbgame.Keyword = Keyword;
    var shield = new Keyword(function (card, player) {
        card.on("regionChange", function () {
            var tag = 1;
            card.addPropertyProcessBeforeChange("hp", function (value, changeInfo) {
                if (tag > 0) {
                    tag--;
                    if (tag <= 0) {
                    }
                    return 0;
                }
            });
        });
    });
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var PlayerEvent;
    (function (PlayerEvent) {
        PlayerEvent["WillStartGame"] = "WillStartGame";
        PlayerEvent["RecycleGrave"] = "RecycleGrave";
        PlayerEvent["Draw"] = "Draw";
    })(PlayerEvent = tbgame.PlayerEvent || (tbgame.PlayerEvent = {}));
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this.hp = 0;
            _this.gold = 0;
            _this.items = [];
            _this.cards = [];
            _this.shield = 0;
            _this.buffs = [];
            _this.drawNum = 5;
            _this.regions = {};
            _this.regions.deck = new tbgame.Region();
            _this.regions.deck.name = "牌库";
            _this.regions.hand = new tbgame.Region();
            _this.regions.hand.name = "手牌";
            _this.regions.grave = new tbgame.Region();
            _this.regions.grave.name = "坟场";
            _this._drawOneCard = _this._drawOneCard.bind(_this);
            return _this;
        }
        Player.prototype.gameFinish = function (isWin) {
        };
        Player.prototype.prepare = function (cb) {
            log.i(this.name + "洗牌");
            this.regions.deck.init(this.cards);
            this.emitCb(PlayerEvent.WillStartGame, function () {
                cb();
            });
        };
        Player.prototype.draw = function (num, cb) {
            log.i(this.name + "抽" + num + "张牌");
            util.waitCallNum(num, this._drawOneCard, cb);
        };
        Player.prototype._makeDeckValid = function (cb) {
            var deck = this.regions.deck;
            if (deck.size() <= 0) {
                log.i(this.name + "抽牌堆为空，墓地进入抽牌堆");
                var grave = this.regions.grave;
                if (grave.size() <= 0) {
                    log.i(this.name + "墓地没有牌可以放入抽牌堆");
                    cb();
                    return;
                }
                grave.moveTo(deck);
                this.emit(PlayerEvent.RecycleGrave);
                tbgame.gameMode.viewer.animMoveRegion(grave, deck, cb);
            }
            else {
                cb();
            }
        };
        Player.prototype._drawOneCard = function (cb) {
            var _this = this;
            this._makeDeckValid(function () {
                var deck = _this.regions.deck;
                if (deck.size() <= 0) {
                    log.i(_this.name + "无牌可抽");
                    cb();
                    return;
                }
                var hand = _this.regions.hand;
                var card = deck.top();
                deck.remove(card);
                hand.add(card);
                log.i(_this.name + "抽到牌" + card.name);
                _this.emit(PlayerEvent.Draw, card);
                cb();
            });
        };
        Player.prototype.play = function (cb) {
            this.controller.choosePlayOperation(cb);
        };
        Player.prototype.useCard = function (card, cb) {
            var _this = this;
            log.i(this.name + "准备使用卡牌" + card.name);
            card.emitCb("UsePrepare", function () {
                log.i(_this.name + "使用卡牌" + card.name);
                card.emitCb("Use", function () {
                    log.i(_this.name + "完成使用卡牌" + card.name);
                    card.emitCb("UseFinish", function () {
                        cb();
                    }, _this);
                }, _this);
            }, this);
        };
        return Player;
    }(tbgame.Entity));
    tbgame.Player = Player;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Region = (function (_super) {
        __extends(Region, _super);
        function Region() {
            var _this = _super.call(this) || this;
            _this._cards = [];
            return _this;
        }
        Region.prototype.size = function () {
            return this._cards.length;
        };
        Region.prototype.getCards = function () {
            return this._cards;
        };
        Region.prototype.toString = function () {
            return this.toStringInfo() + ":" + this.toStringCards();
        };
        Region.prototype.toStringInfo = function () {
            return this.name + ":" + this._cards.length;
        };
        Region.prototype.toStringCards = function () {
            var str = "";
            for (var i = 0, len = this._cards.length; i < len; ++i) {
                str += this._cards[i].name + " ";
            }
            return str;
        };
        Region.prototype.moveTo = function (to) {
        };
        Region.prototype.top = function () {
            return this._cards[this._cards.length - 1];
        };
        Region.prototype.init = function (cards) {
            this._cards = _.shuffle(cards);
        };
        Region.prototype.topCards = function (num) {
            return this._cards.slice(this._cards.length - num);
        };
        Region.prototype.tail = function () {
            return this._cards[0];
        };
        Region.prototype.add = function (card) {
            this._cards.push(card);
        };
        Region.prototype.addRandom = function (card) {
            this._cards.splice(_.random(0, this._cards.length - 1), 0, card);
        };
        Region.prototype.remove = function (card) {
            var idx = this._cards.indexOf(card);
            if (idx == -1) {
                return;
            }
            this._cards.splice(idx, 1);
        };
        return Region;
    }(tbgame.Entity));
    tbgame.Region = Region;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Turn = (function (_super) {
        __extends(Turn, _super);
        function Turn(events) {
            var _this = _super.call(this) || this;
            _this._events = events;
            _this.start = _this.start.bind(_this);
            return _this;
        }
        Turn.prototype._doEvent = function (idx, finish) {
            var _this = this;
            if (idx >= this._events.length) {
                finish();
                return;
            }
            var event = this._events[idx];
            log.i(this.curPlayer.name + event);
            this.curPlayer.emitCb(event, function () {
                _this._doEvent(idx + 1, finish);
            });
        };
        Turn.prototype.start = function (player, finish, num) {
            this.curPlayer = player;
            this._doEvent(0, finish);
        };
        return Turn;
    }(tbgame.Entity));
    tbgame.Turn = Turn;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var localId = 0;
    function getLocalId() {
        localId++;
        return localId;
    }
    tbgame.getLocalId = getLocalId;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Viewer = (function (_super) {
        __extends(Viewer, _super);
        function Viewer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Viewer;
    }(tbgame.Entity));
    tbgame.Viewer = Viewer;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var BlackBox = (function () {
        function BlackBox() {
        }
        return BlackBox;
    }());
    tbgame.BlackBox = BlackBox;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Client = (function () {
        function Client() {
        }
        Client.prototype.connect = function (url) {
        };
        return Client;
    }());
    tbgame.Client = Client;
    var ClientLocal = (function (_super) {
        __extends(ClientLocal, _super);
        function ClientLocal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClientLocal.prototype.connect = function (url) {
            this.server = tbgame.getLocalServer(url);
        };
        return ClientLocal;
    }(Client));
    tbgame.ClientLocal = ClientLocal;
    ClientLocal.setupPool(0);
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var Server = (function () {
        function Server() {
        }
        Server.prototype.listen = function (url) {
        };
        return Server;
    }());
    tbgame.Server = Server;
    var localServers = util.FastArray.pnew();
    function getLocalServer(url) {
        for (var i = 0, len = localServers.length; i < len; ++i) {
            if (localServers.get(i).url === url) {
                return localServers.get(i);
            }
        }
    }
    tbgame.getLocalServer = getLocalServer;
    var ServerLocal = (function (_super) {
        __extends(ServerLocal, _super);
        function ServerLocal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServerLocal.prototype.listen = function (url) {
            localServers.push(this);
        };
        return ServerLocal;
    }(Server));
    tbgame.ServerLocal = ServerLocal;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var InternalSyncObject = (function () {
        function InternalSyncObject(id, syncObject) {
            this.id = id;
            this.syncObject = syncObject;
        }
        return InternalSyncObject;
    }());
    var SyncManager = (function () {
        function SyncManager() {
            this.objs = {};
            this._allocId = 0;
        }
        SyncManager.prototype.add = function (obj) {
            this._allocId++;
            this.objs[this._allocId] = new InternalSyncObject(this._allocId, obj);
        };
        SyncManager.prototype.remove = function (obj) {
            var objs = this.objs;
            for (var k in objs) {
                if (objs[k].syncObject === obj) {
                    delete objs[k];
                    return;
                }
            }
        };
        SyncManager.prototype.pack = function () {
            var data = [];
            var objs = this.objs;
            for (var k in objs) {
            }
            return data;
        };
        SyncManager.prototype.unpack = function (data) {
        };
        return SyncManager;
    }());
    tbgame.SyncManager = SyncManager;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var LineDirection;
    (function (LineDirection) {
        LineDirection[LineDirection["Left"] = 0] = "Left";
        LineDirection[LineDirection["Middle"] = 1] = "Middle";
        LineDirection[LineDirection["Right"] = 2] = "Right";
    })(LineDirection || (LineDirection = {}));
    var DirectionArray = [LineDirection.Left, LineDirection.Middle, LineDirection.Right];
    var MapNode = (function () {
        function MapNode(x, y, offsetX, offsetY) {
            this.x = x;
            this.y = y;
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this._lines = [];
            this._parents = [];
        }
        MapNode.prototype.serialize = function () {
            var lines = this._lines;
            var datLines = [];
            for (var i = 0; i < lines.length; ++i) {
                datLines.push(lines[i].serialie());
            }
            var obj = {
                x: this.x,
                y: this.y,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                lines: datLines,
            };
            if (this.userData && this.userData.serialize) {
                obj.userData = this.userData.serialize();
            }
            return obj;
        };
        MapNode.prototype.hasLines = function () {
            return this._lines.length > 0;
        };
        MapNode.prototype.addLine = function (line) {
            var oldLine;
            for (var i = 0, len = this._lines.length; i < len; ++i) {
                oldLine = this._lines[i];
                if (oldLine.dstX == line.dstX && oldLine.dstY == line.dstY) {
                    return;
                }
            }
            this._lines.push(line);
        };
        MapNode.prototype.delLine = function (line) {
            util.removeFromArray(this._lines, line);
        };
        MapNode.prototype.getLines = function () {
            return this._lines;
        };
        MapNode.prototype.getMaxLine = function () {
            var lines = this._lines;
            var max = lines[0];
            for (var i = 1, len = lines.length; i < len; ++i) {
                if (lines[i].compareTo(max) > 0) {
                    max = lines[i];
                }
            }
            return max;
        };
        MapNode.prototype.getMinLine = function () {
            var lines = this._lines;
            var min = lines[0];
            for (var i = 1, len = lines.length; i < len; ++i) {
                if (lines[i].compareTo(min) < 0) {
                    min = lines[i];
                }
            }
            return min;
        };
        MapNode.prototype.toString = function () {
            if (this.userData) {
                switch (this.userData.type) {
                    case 0:
                        return "S";
                    case 1:
                        return "m";
                    case 2:
                        return "r";
                    case 3:
                        return "e";
                    case 4:
                        return "E";
                    case 5:
                        return "s";
                    case 6:
                        return "t";
                }
            }
            return "x";
        };
        MapNode.prototype.addParent = function (parent) {
            this._parents.push(parent);
        };
        MapNode.prototype.getParents = function () {
            return this._parents;
        };
        MapNode.prototype.getParentWithMaxX = function () {
            var parents = this._parents;
            var max = parents[0];
            for (var i = 1, len = parents.length; i < len; ++i) {
                if (parents[i].x > max.x) {
                    max = parents[i];
                }
            }
            return max;
        };
        MapNode.prototype.getParentWithMinX = function () {
            var parents = this._parents;
            var min = parents[0];
            for (var i = 1, len = parents.length; i < len; ++i) {
                if (parents[i].x < min.x) {
                    min = parents[i];
                }
            }
            return min;
        };
        return MapNode;
    }());
    tbgame.MapNode = MapNode;
    var MapLine = (function () {
        function MapLine(srcX, srcY, dstX, dstY) {
            this.srcX = srcX;
            this.srcY = srcY;
            this.dstX = dstX;
            this.dstY = dstY;
        }
        MapLine.prototype.serialie = function () {
            return {
                srcX: this.srcX,
                srcY: this.srcY,
                dstX: this.dstX,
                dstY: this.dstY,
            };
        };
        MapLine.prototype.compareTo = function (e) {
            if (this.dstX > e.dstX) {
                return 1;
            }
            if (this.dstX < e.dstX) {
                return -1;
            }
            if (this.dstY > e.dstY) {
                return 1;
            }
            if (this.dstY < e.dstY) {
                return -1;
            }
            if (this.dstY === e.dstY) {
                return 0;
            }
            return 0;
        };
        return MapLine;
    }());
    tbgame.MapLine = MapLine;
    function mapNodesEqual(nodes1, nodes2) {
        var row = nodes1.length - 1;
        while (row >= 0) {
            var rowNodes = nodes1[row];
            var rowNodes2 = nodes2[row];
            if (!rowNodes2) {
                return false;
            }
            if (rowNodes.length != rowNodes2.length) {
                return false;
            }
            for (var i = 0, leni = rowNodes.length; i < leni; ++i) {
                var node = rowNodes[i];
                var lines = node.getLines();
                var node2 = rowNodes2[i];
                if (!node2) {
                    return false;
                }
                var lines2 = node2.getLines();
                if (!lines2) {
                    return false;
                }
                if (lines.length != lines2.length) {
                    return false;
                }
                for (var j = 0, lenj = lines.length; j < lenj; ++j) {
                    var line = lines[j];
                    var line2 = lines2[j];
                    if (line.dstX != line2.dstX) {
                        return false;
                    }
                }
            }
            --row;
        }
        return true;
    }
    tbgame.mapNodesEqual = mapNodesEqual;
    ;
    var LineMap = (function () {
        function LineMap() {
            this.nodes = [];
        }
        LineMap.prototype.equal = function (lineMap) {
            return mapNodesEqual(this.nodes, lineMap.nodes);
        };
        LineMap.prototype.getRoomNum = function (from, to) {
            var nodes = this.nodes;
            var height = nodes.length;
            var num = 0;
            for (var row = from; row < to; ++row) {
                var rowNodes = nodes[row];
                var width = rowNodes.length;
                for (var col = 0; col < width; ++col) {
                    var node = rowNodes[col];
                    if (node.hasLines()) {
                        num++;
                    }
                }
            }
            return num;
        };
        LineMap.prototype.getNoUserDataRoomNum = function () {
            var nodes = this.nodes;
            var height = nodes.length;
            var num = 0;
            for (var row = 0; row < height; ++row) {
                var rowNodes = nodes[row];
                var width = rowNodes.length;
                for (var col = 0; col < width; ++col) {
                    var node = rowNodes[col];
                    if (node.hasLines() && !node.userData) {
                        num++;
                    }
                }
            }
            return num;
        };
        LineMap.prototype.createNodes = function (width, height) {
            var nodes = this.nodes;
            for (var row = 0; row < height; ++row) {
                var rowNodes = [];
                for (var col = 0; col < width; ++col) {
                    rowNodes.push(new MapNode(col, row, this.rng.quick(), this.rng.quick()));
                }
                nodes.push(rowNodes);
            }
        };
        LineMap.prototype.createPaths = function (density, minDepth, maxDepth, rng) {
            var nodes = this.nodes;
            var rowSize = nodes[0].length;
            var firstNodeCol = -1;
            for (var i = 0; i < density; i++) {
                var nodeCol = rng.range(0, rowSize);
                if (i === 0) {
                    firstNodeCol = nodeCol;
                }
                else if (i === 1) {
                    while (nodeCol === firstNodeCol) {
                        nodeCol = rng.range(0, rowSize);
                    }
                }
                this.createLines(new MapLine(nodeCol, -1, nodeCol, 0), minDepth, maxDepth, rng);
            }
        };
        LineMap.prototype.createLines = function (line, minDepth, maxDepth, rng) {
            var nodes = this.nodes;
            var currentNode = nodes[line.dstY][line.dstX];
            if (line.dstY + 1 >= nodes.length) {
                if (!currentNode.hasLines()) {
                    var newLine_1 = new MapLine(line.dstX, line.dstY, Math.floor(this.width / 2), line.dstY + 2);
                    currentNode.addLine(newLine_1);
                }
                return;
            }
            var targetNode = this.getRandomNextNode(currentNode, minDepth, maxDepth, rng);
            targetNode = this.avoidCrossLine(currentNode, targetNode);
            var newLine = new MapLine(currentNode.x, currentNode.y, targetNode.x, targetNode.y);
            currentNode.addLine(newLine);
            targetNode.addParent(currentNode);
            this.createLines(newLine, minDepth, maxDepth, rng);
        };
        LineMap.prototype.getRandomNextNode = function (currentNode, minDepth, maxDepth, rng) {
            var direction = this.getRandomNextDirection(currentNode, minDepth, maxDepth, rng);
            var newLineX = this.getDirectionX(currentNode.x, direction);
            var newLineY = currentNode.y + 1;
            return this.nodes[newLineY][newLineX];
        };
        LineMap.prototype.getRandomNextDirection = function (currentNode, minDepth, maxDepth, rng) {
            var valid = [];
            var validSub = [];
            var validMaxDepth = 0;
            var validMaxDirection;
            for (var i = 0; i < DirectionArray.length; ++i) {
                var direction = DirectionArray[i];
                var depth = this.getDirectionMinAncestorDepth(direction, currentNode, minDepth, maxDepth);
                if (depth === -1) {
                    continue;
                }
                if (depth >= minDepth) {
                    valid.push(direction);
                }
                else if (depth > validMaxDepth) {
                    validMaxDepth = depth;
                    validMaxDirection = direction;
                }
                else {
                    validSub.push(direction);
                }
            }
            var randomDirection;
            if (valid.length > 0) {
                randomDirection = valid[rng.index(valid)];
            }
            else if (validMaxDepth > 0) {
                randomDirection = validMaxDirection;
            }
            else if (validSub.length > 0) {
                randomDirection = validSub[rng.index(validSub)];
            }
            else {
                randomDirection = LineDirection.Middle;
            }
            return randomDirection;
        };
        LineMap.prototype.getDirectionX = function (x, direction) {
            switch (direction) {
                case LineDirection.Left:
                    return x - 1;
                case LineDirection.Right:
                    return x + 1;
            }
            return x;
        };
        LineMap.prototype.getDirectionMinAncestorDepth = function (direction, currentNode, minDepth, maxDepth) {
            var nodes = this.nodes;
            var x = currentNode.x;
            var y = currentNode.y;
            var newLineX = this.getDirectionX(x, direction);
            var newLineY = y + 1;
            var rowWidth = nodes[newLineY].length;
            var rowEnd = rowWidth - 1;
            if (newLineX < 0 || newLineX > rowEnd) {
                return -1;
            }
            var targetNode = nodes[newLineY][newLineX];
            var parents = targetNode.getParents();
            var minAncestorDepth = maxDepth;
            if (parents.length > 0) {
                for (var i = 0, len = parents.length; i < len; ++i) {
                    var parent = parents[i];
                    if (parent === currentNode) {
                        return 0;
                    }
                    var ancestor = this.getCommonAncestor(parent, currentNode, maxDepth);
                    if (ancestor === null) {
                        continue;
                    }
                    var depth = newLineY - ancestor.y;
                    if (depth < minAncestorDepth) {
                        minAncestorDepth = depth;
                    }
                }
            }
            return minAncestorDepth;
        };
        LineMap.prototype.avoidCrossLine = function (currentNode, targetNode) {
            var x = currentNode.x;
            var y = currentNode.y;
            var newX = targetNode.x;
            var newY = targetNode.y;
            var nodes = this.nodes;
            var rowWidth = nodes[y].length;
            var rowEnd = rowWidth - 1;
            if (x !== 0) {
                var leftNode = nodes[y][x - 1];
                if (leftNode.hasLines()) {
                    var rightLineOfLeftNode = leftNode.getMaxLine();
                    if (rightLineOfLeftNode.dstX > newX) {
                        newX = rightLineOfLeftNode.dstX;
                    }
                }
            }
            if (x < rowEnd) {
                var rightNode = nodes[y][x + 1];
                if (rightNode.hasLines()) {
                    var leftLineOfRightNode = rightNode.getMinLine();
                    if (leftLineOfRightNode.dstX < newX) {
                        newX = leftLineOfRightNode.dstX;
                    }
                }
            }
            return nodes[newY][newX];
        };
        LineMap.prototype.getSiblings = function (node) {
            var nodes = this.nodes;
            var siblings = [];
            var parents = node.getParents();
            for (var i = 0; i < parents.length; ++i) {
                var parent = parents[i];
                var lines = parent.getLines();
                for (var j = 0; j < lines.length; ++j) {
                    var line = lines[j];
                    var siblingNode = nodes[line.dstY][line.dstX];
                    if (siblingNode != node) {
                        siblings.push(node);
                    }
                }
            }
            return siblings;
        };
        LineMap.prototype.getCommonAncestor = function (node1, node2, maxDepth) {
            var leftNode, rightNode;
            if (node1.x < node2.x) {
                leftNode = node1;
                rightNode = node2;
            }
            else {
                leftNode = node2;
                rightNode = node1;
            }
            var tNode;
            if (node1.y > node2.y) {
                tNode = node1;
            }
            else {
                tNode = node2;
            }
            for (var y = tNode.y; y >= 0 && y >= tNode.y - maxDepth; --y) {
                if (leftNode.getParents().length === 0 || rightNode.getParents().length === 0) {
                    return null;
                }
                leftNode = leftNode.getParentWithMaxX();
                rightNode = rightNode.getParentWithMinX();
                if (leftNode === rightNode) {
                    return leftNode;
                }
            }
            return null;
        };
        LineMap.prototype.removeRedundantEdges = function () {
            var nodes = this.nodes;
            var existingLines = [];
            var deleteLines = [];
            var rowNodes = nodes[0];
            for (var i = 0, leni = rowNodes.length; i < leni; ++i) {
                var node = rowNodes[i];
                if (node.hasLines()) {
                    var lines = node.getLines();
                    for (var j = 0, lenj = lines.length; j < lenj; ++j) {
                        var line = lines[j];
                        var duplicate = false;
                        for (var m = 0, lenm = existingLines.length; m < lenm; ++m) {
                            var prevLine = existingLines[m];
                            if (line.dstX === prevLine.dstX && line.dstY === prevLine.dstY) {
                                deleteLines.push(line);
                                duplicate = true;
                                break;
                            }
                        }
                        if (!duplicate) {
                            existingLines.push(line);
                        }
                    }
                    for (var n = 0, lenn = deleteLines.length; n < lenn; ++n) {
                        node.delLine(deleteLines[n]);
                    }
                }
            }
        };
        LineMap.prototype.generate = function (width, height, density, minDepth, maxDepth, rng) {
            this.width = width;
            this.height = height;
            this.density = density;
            this.minDepth = minDepth;
            this.maxDepth = maxDepth;
            this.rng = rng;
            this.createNodes(width, height);
            this.createPaths(density, minDepth, maxDepth, rng);
            this.removeRedundantEdges();
        };
        LineMap.prototype.get = function (x, y) {
            return this.nodes[y][x];
        };
        LineMap.prototype.serialize = function () {
            var datNodes = [];
            var nodes = this.nodes;
            var height = nodes.length;
            var num = 0;
            for (var row = 0; row < height; ++row) {
                datNodes[row] = [];
                var rowNodes = nodes[row];
                var width = rowNodes.length;
                for (var col = 0; col < width; ++col) {
                    var node = rowNodes[col];
                    datNodes[row][col] = node.serialize();
                }
            }
            var obj = {
                nodes: datNodes,
            };
            return obj;
        };
        LineMap.prototype.forEachNodeInRow = function (row, cb) {
            var rowNodes = this.nodes[row];
            var width = rowNodes.length;
            for (var col = 0; col < width; ++col) {
                var node = rowNodes[col];
                if (node.hasLines()) {
                    cb(node);
                }
            }
        };
        LineMap.prototype.forEachNode = function (cb) {
            var nodes = this.nodes;
            var height = nodes.length;
            var num = 0;
            for (var row = 0; row < height; ++row) {
                var rowNodes = nodes[row];
                var width = rowNodes.length;
                for (var col = 0; col < width; ++col) {
                    var node = rowNodes[col];
                    if (node.hasLines()) {
                        cb(node);
                    }
                }
            }
        };
        LineMap.prototype.toString = function () {
            var str = [];
            var nodes = this.nodes;
            var row = nodes.length - 1;
            var padding = 5;
            while (row >= 0) {
                str.push("\n ");
                str.push(util.paddingGenerator(padding));
                var rowNodes = nodes[row];
                for (var i = 0, leni = rowNodes.length; i < leni; ++i) {
                    var node = rowNodes[i];
                    var right = " ";
                    var left = " ";
                    var mid = " ";
                    var lines = node.getLines();
                    for (var j = 0, lenj = lines.length; j < lenj; ++j) {
                        var line = lines[j];
                        if (line.dstX < node.x) {
                            left = "\\";
                        }
                        else if (line.dstX === node.x) {
                            mid = "|";
                        }
                        else if (line.dstX > node.x) {
                            right = "/";
                        }
                    }
                    str.push(left);
                    str.push(mid);
                    str.push(right);
                }
                str.push("\n");
                str.push(row.toString());
                str.push(" ");
                str.push(util.paddingGenerator(padding - row.toString().length));
                for (var i = 0, leni = rowNodes.length; i < leni; ++i) {
                    var symbol = " ";
                    var node = rowNodes[i];
                    if (row === nodes.length - 1) {
                        var preRowNodes = nodes[row - 1];
                        for (var m = 0, lenm = preRowNodes.length; m < lenm; ++m) {
                            var preNode = preRowNodes[m];
                            var preLines = preNode.getLines();
                            for (var n = 0, lenn = preLines.length; n < lenn; ++n) {
                                var preLine = preLines[n];
                                if (preLine.dstX === node.x) {
                                    symbol = node.toString();
                                }
                            }
                        }
                    }
                    else if (node.hasLines()) {
                        symbol = node.toString();
                    }
                    str.push(" ");
                    str.push(symbol);
                    str.push(" ");
                }
                --row;
            }
            return str.join("");
        };
        return LineMap;
    }());
    tbgame.LineMap = LineMap;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var eventCb;
    var waitPressFuncs = [];
    function waitPressOnce(cb) {
        waitPressFuncs.push(cb);
    }
    tbgame.waitPressOnce = waitPressOnce;
    var CmdController = (function (_super) {
        __extends(CmdController, _super);
        function CmdController() {
            var _this = _super.call(this) || this;
            var readline = require('readline');
            readline.emitKeypressEvents(process.stdin);
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            var stdin = process.stdin;
            stdin.setRawMode(true);
            stdin.resume();
            stdin.setEncoding('utf8');
            stdin.on('data', function (key) {
                var funcs = waitPressFuncs.slice(0);
                for (var i = 0; i < waitPressFuncs.length; ++i) {
                    waitPressFuncs[i]();
                }
                if (eventCb) {
                    eventCb(key);
                }
            });
            return _this;
        }
        CmdController.prototype.showCmdList = function () {
        };
        CmdController.prototype.initEventKeys = function (eventKeys) {
            _super.prototype.initEventKeys.call(this, eventKeys);
            this.eventsMgr = new tbgame.InputEventsStack(this);
        };
        CmdController.prototype.enableInput = function () {
            if (!eventCb) {
                eventCb = this.pressKey;
            }
        };
        CmdController.prototype.disableInput = function () {
            eventCb = null;
        };
        CmdController.prototype.showCards = function (cards) {
        };
        CmdController.prototype.chooseCardOperation = function (card, cb) {
            var _this = this;
            var self = this;
            function finish() {
                self.eventsMgr.pop();
                cb();
            }
            var events = {};
            events[tbgame.ControllerEvent.Back] = function () {
                log.i("操作返回" + card.name);
                finish();
            };
            events[tbgame.ControllerEvent.Confirm] = function () {
                log.i("操作使用卡牌" + card.name);
                _this.player.useCard(card, finish);
            };
            this.eventsMgr.push(events);
            tbgame.gameMode.viewer.showCardOperationUI(this.player, card);
        };
        CmdController.prototype.chooseTarget = function (condition, cb) {
            var self = this;
            function finish(choosed) {
                self.eventsMgr.pop();
                cb(choosed);
            }
            var events = {};
            events[tbgame.ControllerEvent.Back] = function () {
                log.i("选对象操作取消");
                finish(null);
            };
            this.formatChooseTargetEvent(events, tbgame.gameMode.players, function (choosed) {
                if (!condition(choosed)) {
                    log.i("不能选择这个对象" + choosed.name);
                    return;
                }
                log.i("选择了" + choosed.name);
                finish(choosed);
            });
            this.eventsMgr.push(events);
            tbgame.gameMode.viewer.showChooseTargetUI(this.player);
        };
        CmdController.prototype.choosePlayOperation = function (cb) {
            var _this = this;
            var cards = this.player.regions.hand.getCards();
            var events = {};
            this.formatChooseTargetEvent(events, cards, function (card) {
                log.i(_this.player.name + "选择了卡牌" + card.name);
                _this.chooseCardOperation(card, function () {
                    _this.choosePlayOperation(cb);
                });
            });
            events[tbgame.ControllerEvent.Deck] = function () {
                log.i("显示牌库");
            };
            events[tbgame.ControllerEvent.Grave] = function () {
                log.i("显示墓地");
            };
            events[tbgame.ControllerEvent.Confirm] = function () {
                log.i("操作结束");
                _this.eventsMgr.pop();
            };
            this.eventsMgr.push(events, cb);
            tbgame.gameMode.viewer.showPlayOperationUI(this.player);
        };
        CmdController.prototype.chooseCardFromCards = function (cards, num, canCancel, cb) {
            log.i("to choose");
        };
        return CmdController;
    }(tbgame.Controller));
    tbgame.CmdController = CmdController;
})(tbgame || (tbgame = {}));
var tbgame;
(function (tbgame) {
    var WAIT_TIME_LITTLE = 1000;
    var WAIT_TIME_NORMAL = 1000;
    var CmdViewer = (function (_super) {
        __extends(CmdViewer, _super);
        function CmdViewer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CmdViewer.prototype.createGameModeViewer = function (mode) {
            return null;
        };
        CmdViewer.prototype.createCardViewer = function (card) {
            return null;
        };
        CmdViewer.prototype.showPlayOperationUI = function (player) {
            log.i(player.name + "显示操作界面" + "---------------------------------------------------");
            var players = tbgame.gameMode.players;
            _.each(tbgame.gameMode.players, function (playerInPlay) {
                if (playerInPlay == player) {
                    return;
                }
                log.i(playerInPlay.name + " " + playerInPlay.toStringProperty());
            });
            log.i(player.name + " " + player.toStringProperty());
            var cards = player.regions.hand.getCards();
            var str = player.regions.hand.toStringInfo() + " " + player.controller.getChooseCardString(cards);
            log.i(player.name + str);
            log.i(player.name + player.regions.deck.toStringInfo() + player.controller.getStringEventKey(tbgame.ControllerEvent.Deck) + " " + player.regions.grave.toStringInfo() + player.controller.getStringEventKey(tbgame.ControllerEvent.Grave));
            log.i("回合结束" + player.controller.getStringEventKey(tbgame.ControllerEvent.Confirm));
            log.i("---------------------------------------------------");
        };
        CmdViewer.prototype.showCardOperationUI = function (player, card) {
            log.i(player.name + "显示卡牌界面" + "---------------------------------------------------");
            log.i(card.toStringInfo());
            log.i("使用" + player.controller.getStringEventKey(tbgame.ControllerEvent.Confirm) + " 取消" + player.controller.getStringEventKey(tbgame.ControllerEvent.Back));
            log.i("---------------------------------------------------");
        };
        CmdViewer.prototype.showChooseTargetUI = function (player) {
            log.i(player.name + "显示选择对象界面" + "---------------------------------------------------");
            var players = tbgame.gameMode.players;
            var str = "";
            for (var i = 0; i < players.length; ++i) {
                str += players[i].name + player.controller.getStringEventKey(tbgame.toChooseEvent(i)) + " ";
            }
            log.i(str);
            log.i("---------------------------------------------------");
        };
        CmdViewer.prototype.animPrepare = function (cb) {
            log.i("<动画>开始游戏");
            util.wait(WAIT_TIME_NORMAL, cb);
        };
        CmdViewer.prototype.animCardPlayToTarget = function (card, target, cb) {
            log.i("<动画>对目标" + target.name + "使用卡牌" + card.name);
            util.wait(WAIT_TIME_NORMAL, cb);
        };
        CmdViewer.prototype.animCardPlayDirect = function (card, cb) {
            log.i("动画，使用卡牌" + card.name);
            util.wait(WAIT_TIME_NORMAL, cb);
        };
        CmdViewer.prototype.animMoveCard = function (card, to, cb) {
            log.i("<动画>把牌" + card.name + "移动到Region" + to.name);
            util.wait(WAIT_TIME_LITTLE, cb);
        };
        CmdViewer.prototype.animMoveRegion = function (from, to, cb) {
            log.i("<动画>从Region" + from.name + "到Region" + to.name);
            util.wait(WAIT_TIME_NORMAL, cb);
        };
        CmdViewer.prototype.animDead = function (player, cb) {
            log.i("<动画>" + player.name + "死亡");
            util.wait(WAIT_TIME_NORMAL, cb);
        };
        return CmdViewer;
    }(tbgame.Viewer));
    tbgame.CmdViewer = CmdViewer;
})(tbgame || (tbgame = {}));
var STS;
(function (STS) {
    STS.Settings = {
        TimeXtremeFast: 0.1,
        TimeFast: 0.2,
        TimeMedium: 0.5,
        MaxHandNum: 10,
        MaxHp: 999,
        MaxEnergy: 99,
        MaxBlock: 999,
        MaxGold: 9999,
        TestMonsterName: "",
    };
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DataGroup = (function (_super) {
        __extends(DataGroup, _super);
        function DataGroup() {
            var _this = _super.call(this) || this;
            _this.items = [];
            return _this;
        }
        Object.defineProperty(DataGroup.prototype, "length", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        DataGroup.prototype.initBattle = function (battle) {
            this.battle = battle;
        };
        DataGroup.prototype.get = function (idx) {
            return this.items[idx];
        };
        DataGroup.prototype.forEach = function (cb) {
            for (var i = 0; i < this.items.length; ++i) {
                cb(this.items[i]);
            }
        };
        DataGroup.prototype.choose = function (num, rng) {
            return rng.choose(this.items, num);
        };
        DataGroup.prototype.getAll = function () {
            return this.items;
        };
        DataGroup.prototype.size = function () {
            return this.items.length;
        };
        DataGroup.prototype.moveTo = function (dataGroup) {
            for (var i = 0; i < this.items.length; ++i) {
                dataGroup.addToBottom(this.items[i]);
            }
            this.clear();
        };
        DataGroup.prototype.has = function (item) {
            for (var i = 0; i < this.items.length; ++i) {
                if (this.items[i] == item) {
                    return true;
                }
            }
            return false;
        };
        DataGroup.prototype.addToTop = function (item) {
            this.items.unshift(item);
        };
        DataGroup.prototype.addToBottom = function (item) {
            this.items.unshift(item);
        };
        DataGroup.prototype.getTop = function () {
            return this.items[0];
        };
        DataGroup.prototype.remove = function (item) {
            var idx = this.items.indexOf(item);
            if (idx != -1) {
                this.items.splice(idx, 1);
            }
        };
        DataGroup.prototype.removeByCondition = function (condition) {
            var toDelete = [];
            for (var i = 0; i < this.items.length; ++i) {
                if (condition(this.items[i])) {
                    toDelete.push(this.items[i]);
                }
            }
            for (var i = 0; i < toDelete.length; ++i) {
                util.removeFromArray(this.items, toDelete[i]);
            }
        };
        DataGroup.prototype.getBottom = function () {
            return this.items[this.items.length - 1];
        };
        DataGroup.prototype.getAndRemoveTop = function () {
            return this.items.shift();
        };
        DataGroup.prototype.getAndRemoveBottom = function () {
            return this.items.pop();
        };
        DataGroup.prototype.shuffle = function (rng) {
            return rng.shuffle(this.items);
        };
        DataGroup.prototype.clear = function () {
            this.items = [];
        };
        return DataGroup;
    }(tbgame.FakeName));
    STS.DataGroup = DataGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ClassType;
    (function (ClassType) {
        ClassType["Werewolf"] = "Werewolf";
        ClassType["Sorceress"] = "Sorceress";
    })(ClassType = STS.ClassType || (STS.ClassType = {}));
    var GameType;
    (function (GameType) {
        GameType["None"] = "None";
        GameType["Normal"] = "Normal";
        GameType["Daily"] = "Daily";
    })(GameType = STS.GameType || (STS.GameType = {}));
    var DamageType;
    (function (DamageType) {
        DamageType[DamageType["NORMAL"] = 0] = "NORMAL";
        DamageType[DamageType["THORNS"] = 1] = "THORNS";
        DamageType[DamageType["HP_LOSS"] = 2] = "HP_LOSS";
    })(DamageType = STS.DamageType || (STS.DamageType = {}));
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Phase;
    (function (Phase) {
        Phase[Phase["WAITING_ON_USER"] = 0] = "WAITING_ON_USER";
        Phase[Phase["EXECUTING_ACTIONS"] = 1] = "EXECUTING_ACTIONS";
    })(Phase = STS.Phase || (STS.Phase = {}));
    var ActionManager = (function () {
        function ActionManager(battle) {
            this.battle = battle;
            this.actions = [];
            this.cardQueue = [];
            this.phase = Phase.WAITING_ON_USER;
        }
        ActionManager.prototype.addToTop = function (action) {
            action.setBattle(this.battle);
            this.actions.unshift(action);
        };
        ActionManager.prototype.addToBottom = function (action) {
            action.setBattle(this.battle);
            this.actions.push(action);
        };
        ActionManager.prototype.isInAction = function () {
            if (this.actions.length > 0 || this.currentAction || this.phase == Phase.EXECUTING_ACTIONS) {
                return true;
            }
            return false;
        };
        ActionManager.prototype.useNextAction = function () {
            if (this.actions.length > 0) {
                this.currentAction = this.actions.shift();
                this.phase = Phase.EXECUTING_ACTIONS;
            }
            else if (this.cardQueue.length > 0) {
                var cardQueueItem = this.cardQueue[0];
                var c = cardQueueItem.card;
                if (c.canPlay(cardQueueItem.monster)) {
                    c.energyOnUse = cardQueueItem.energyOnUse;
                    this.battle.player.useCard(c, cardQueueItem.monster, cardQueueItem.energyOnUse);
                }
                this.cardQueue.shift();
            }
        };
        ActionManager.prototype.isInCardQueue = function (card) {
            for (var i = 0; i < this.cardQueue.length; ++i) {
                if (this.cardQueue[i].card == card) {
                    return true;
                }
            }
            return false;
        };
        ActionManager.prototype.update = function (dt) {
            switch (this.phase) {
                case Phase.WAITING_ON_USER: {
                    this.useNextAction();
                    break;
                }
                case Phase.EXECUTING_ACTIONS: {
                    if (this.currentAction != null && !this.currentAction.isDone) {
                        this.currentAction.update(dt);
                        break;
                    }
                    this.previousAction = this.currentAction;
                    this.currentAction = null;
                    this.useNextAction();
                    if (this.currentAction == null) {
                        this.phase = Phase.WAITING_ON_USER;
                    }
                    break;
                }
                default: {
                    log.e("错误的ActionManager阶段类型");
                }
            }
        };
        return ActionManager;
    }());
    STS.ActionManager = ActionManager;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BattleEventType;
    (function (BattleEventType) {
        BattleEventType["StartCombat"] = "StartCombat";
        BattleEventType["EndCombat"] = "EndCombat";
        BattleEventType["StartTurn"] = "StartTurn";
        BattleEventType["EndTurn"] = "EndTurn";
        BattleEventType["SpawnMonster"] = "SpawnMonster";
        BattleEventType["ShakeScreen"] = "ShakeScreen";
    })(BattleEventType = STS.BattleEventType || (STS.BattleEventType = {}));
    var BattleEndType;
    (function (BattleEndType) {
        BattleEndType[BattleEndType["Win"] = 0] = "Win";
        BattleEndType[BattleEndType["Lose"] = 1] = "Lose";
        BattleEndType[BattleEndType["Escape"] = 2] = "Escape";
    })(BattleEndType = STS.BattleEndType || (STS.BattleEndType = {}));
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle(player, monsters) {
            var _this = _super.call(this) || this;
            _this.cannotLose = false;
            _this.player = player;
            _this.player.initBattle(_this);
            _this.monsters = new STS.MonsterGroup();
            _this.monsters.initBattle(_this);
            _this.monsters.setMonsters(monsters);
            _this.actionManager = new STS.ActionManager(_this);
            _this.nextTurnAction = [];
            return _this;
        }
        Battle.prototype.areMonstersBasicallyDead = function () {
            var dead = true;
            this.monsters.forEach(function (m) {
                if (!m.isBasiclyDead()) {
                    dead = false;
                }
            });
            return dead;
        };
        Battle.prototype.startCombat = function () {
            this.turn = 1;
            this.player.onStartCombat();
            this.monsters.onStartCombat();
            this.emit(BattleEventType.StartCombat);
            this.monsters.usePreBattleAction();
            this.actionManager.addToBottom(new STS.TurnStart());
        };
        Battle.prototype.endCombat = function (type) {
            this.player.onEndCombat(type);
            this.monsters.onEndCombat(type);
            this.emit(BattleEventType.EndCombat, type);
        };
        Battle.prototype.addToNextTurnStart = function (action) {
            this.nextTurnAction.push(action);
        };
        Battle.prototype.startTurn = function () {
            this.emit(BattleEventType.StartTurn);
            this.player.onStartTurn();
            this.monsters.onStartTurn();
            for (var i = 0; i < this.nextTurnAction.length; ++i) {
                this.actionManager.addToBottom(this.nextTurnAction[i]);
            }
            this.nextTurnAction = [];
        };
        Battle.prototype.endTurn = function () {
            this.player.onEndTurn();
            this.monsters.onEndTurn();
            this.emit(BattleEventType.EndTurn);
            this.monsters.takeTurn();
            this.actionManager.addToBottom(new STS.TurnStart());
            this.turn++;
        };
        return Battle;
    }(tbgame.Entity));
    STS.Battle = Battle;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CardGroup = (function (_super) {
        __extends(CardGroup, _super);
        function CardGroup(owner) {
            var _this = _super.call(this) || this;
            _this.owner = owner;
            return _this;
        }
        CardGroup.prototype.initWithCardInfos = function (cardInfos) {
            for (var i = 0; i < cardInfos.length; ++i) {
                var cardInfo = cardInfos[i];
                var card = STS.BaseCard.create(cardInfo.id, cardInfo.name, cardInfo.level);
                card.setOwner(this.owner);
                this.addToBottom(card);
            }
        };
        CardGroup.prototype.createCardAtBottom = function (cardType, level) {
            var card = STS.BaseCard.create(this.owner.genLocalId(), cardType.getName(), level);
            this.addToBottom(card);
            card.setOwner(this.owner);
            return card;
        };
        CardGroup.prototype.getCardTagNum = function (name) {
            var v = 0;
            this.forEach(function (c) {
                if (c.hasTag(name)) {
                    v++;
                }
            });
            return v;
        };
        CardGroup.prototype.getCardTypeNum = function (type) {
            var v = 0;
            this.forEach(function (c) {
                if (c.getInfo().type == type) {
                    v++;
                }
            });
            return v;
        };
        CardGroup.prototype.onStartCombat = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onStartCombat();
            }
        };
        CardGroup.prototype.onEndCombat = function (type) {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onEndCombat(type);
            }
        };
        CardGroup.prototype.onEndTurn = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onEndTurn();
            }
        };
        return CardGroup;
    }(STS.DataGroup));
    STS.CardGroup = CardGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ValueProcessType;
    (function (ValueProcessType) {
        ValueProcessType["DamageGive"] = "DamageGive";
        ValueProcessType["DamageReceive"] = "DamageReceive";
        ValueProcessType["PowerAmountAdd"] = "PowerAmountAdd";
        ValueProcessType["BlockRecieve"] = "BlockRecieve";
    })(ValueProcessType = STS.ValueProcessType || (STS.ValueProcessType = {}));
    var AttackEffect;
    (function (AttackEffect) {
        AttackEffect[AttackEffect["BLUNT_LIGHT"] = 0] = "BLUNT_LIGHT";
        AttackEffect[AttackEffect["BLUNT_HEAVY"] = 1] = "BLUNT_HEAVY";
        AttackEffect[AttackEffect["SLASH_DIAGONAL"] = 2] = "SLASH_DIAGONAL";
        AttackEffect[AttackEffect["SMASH"] = 3] = "SMASH";
        AttackEffect[AttackEffect["SLASH_HEAVY"] = 4] = "SLASH_HEAVY";
        AttackEffect[AttackEffect["SLASH_HORIZONTAL"] = 5] = "SLASH_HORIZONTAL";
        AttackEffect[AttackEffect["SLASH_VERTICAL"] = 6] = "SLASH_VERTICAL";
        AttackEffect[AttackEffect["NONE"] = 7] = "NONE";
        AttackEffect[AttackEffect["FIRE"] = 8] = "FIRE";
        AttackEffect[AttackEffect["POISON"] = 9] = "POISON";
        AttackEffect[AttackEffect["SHIELD"] = 10] = "SHIELD";
    })(AttackEffect = STS.AttackEffect || (STS.AttackEffect = {}));
    var CreatureEventType;
    (function (CreatureEventType) {
        CreatureEventType["Heal"] = "Heal";
        CreatureEventType["DoDamage"] = "DoDamage";
        CreatureEventType["TookDamage"] = "TookDamage";
        CreatureEventType["AddMaxHp"] = "AddMaxHp";
        CreatureEventType["SubMaxHp"] = "SubMaxHp";
        CreatureEventType["AddGold"] = "AddGold";
        CreatureEventType["SubGold"] = "SubGold";
        CreatureEventType["Attack"] = "Attack";
        CreatureEventType["Attacked"] = "Attacked";
        CreatureEventType["Dialog"] = "Dialog";
        CreatureEventType["Shout"] = "Shout";
        CreatureEventType["AddPower"] = "AddPower";
        CreatureEventType["StackPower"] = "StackPower";
        CreatureEventType["RemovePower"] = "RemovePower";
        CreatureEventType["GainBlock"] = "GainBlock";
        CreatureEventType["LoseBlock"] = "LoseBlock";
        CreatureEventType["Dead"] = "Dead";
        CreatureEventType["StateChange"] = "StateChange";
        CreatureEventType["AnimateSlowAttack"] = "AnimateSlowAttack";
        CreatureEventType["AnimateShake"] = "AnimateShake";
        CreatureEventType["AnimateJump"] = "AnimateJump";
        CreatureEventType["AnimateHop"] = "AnimateHop";
        CreatureEventType["SetAnimation"] = "SetAnimation";
        CreatureEventType["HideHpBar"] = "HideHpBar";
    })(CreatureEventType = STS.CreatureEventType || (STS.CreatureEventType = {}));
    var Creature = (function (_super) {
        __extends(Creature, _super);
        function Creature() {
            return _super.call(this) || this;
        }
        Creature.prototype.initBattle = function (battle) {
            this.battle = battle;
            this.energy = 0;
            this.maxEnergy = 0;
            this.block = 0;
            this.gold = 0;
            this.powers = new STS.PowerGroup();
            this.powers.initBattle(battle);
            this.isDying = false;
            this.isDead = false;
        };
        Creature.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            this.powers.forEach(function (p) { return p.onDestroy(); });
        };
        Creature.prototype.clearBattle = function () {
            this.battle = null;
            this.powers = null;
        };
        Creature.prototype.escape = function () {
            this.isEscaping = true;
        };
        Creature.prototype.isBasiclyDead = function () {
            return this.isDying || this.isDead;
        };
        Creature.prototype.onStartCombat = function () {
        };
        Creature.prototype.onEndCombat = function (type) {
        };
        Creature.prototype.onStartTurn = function () {
        };
        Creature.prototype.onEndTurn = function () {
        };
        Creature.prototype.animateSlowAttack = function () {
            this.emit(CreatureEventType.AnimateSlowAttack);
        };
        Creature.prototype.animateShake = function (duration) {
            this.emit(CreatureEventType.AnimateShake, duration);
        };
        Creature.prototype.animateJump = function () {
            this.emit(CreatureEventType.AnimateJump);
        };
        Creature.prototype.animateHop = function () {
            this.emit(CreatureEventType.AnimateHop);
        };
        Creature.prototype.addPower = function (power) {
            var oldPower;
            this.powers.forEach(function (p) {
                if (p.getName() == power.getName()) {
                    oldPower = p;
                }
            });
            if (oldPower) {
                oldPower.addAmount(power.amount);
                log.i("角色" + this.name + "刷新了旧能力" + oldPower.getName() + " 数量" + oldPower.amount);
                return;
            }
            log.i("角色" + this.name + "添加了能力" + power.getName() + " 数量" + power.amount);
            this.powers.addToBottom(power);
            this.emit(CreatureEventType.AddPower, power);
            power.setOwner(this);
            power.onInit();
        };
        Creature.prototype.addPowerByType = function (type, amount) {
            var power = STS.BasePower.create(tbgame.getLocalId().toString(), type.getName(), amount);
            this.addPower(power);
        };
        Creature.prototype.reducePowerByType = function (type, amount) {
            var oldPower;
            this.powers.forEach(function (p) {
                if (p.getName() == type.getName()) {
                    oldPower = p;
                }
            });
            if (!oldPower) {
                return;
            }
            this.reducePower(oldPower, amount);
        };
        Creature.prototype.reducePower = function (power, amount) {
            power.subAmount(amount);
            if (power.amount <= 0) {
                this.removePower(power);
            }
        };
        Creature.prototype.removePowerByType = function (type) {
            var oldPower;
            this.powers.forEach(function (p) {
                if (p.getName() == type.getName()) {
                    oldPower = p;
                }
            });
            if (!oldPower) {
                return;
            }
            this.removePower(oldPower);
        };
        Creature.prototype.removePower = function (power) {
            this.powers.remove(power);
            this.emit(CreatureEventType.RemovePower, power);
        };
        Creature.prototype.setAnimation = function (name) {
            this.emit(CreatureEventType.SetAnimation, name);
        };
        Creature.prototype.addMaxHp = function (v) {
            var old = this.maxhp;
            this.maxhp += v;
            if (this.maxhp > STS.Settings.MaxHp) {
                this.maxhp = STS.Settings.MaxHp;
            }
            this.emit(CreatureEventType.AddMaxHp, v, old);
        };
        Creature.prototype.subMaxHp = function (v) {
            var old = this.maxhp;
            this.maxhp -= v;
            if (this.maxhp < 0) {
                this.maxhp = 0;
            }
            this.emit(CreatureEventType.SubMaxHp, v, old);
        };
        Creature.prototype.addGold = function (v) {
            var old = this.gold;
            this.gold += v;
            if (this.gold > STS.Settings.MaxGold) {
                this.gold = STS.Settings.MaxGold;
            }
            this.emit(CreatureEventType.AddGold, v, old);
        };
        Creature.prototype.subGold = function (v) {
            var old = this.gold;
            this.gold -= v;
            if (this.gold < 0) {
                this.gold = 0;
            }
            this.emit(CreatureEventType.SubGold, v, old);
        };
        Creature.prototype.heal = function (v) {
            var old = this.hp;
            this.hp += v;
            if (this.hp > this.maxhp) {
                this.hp = this.maxhp;
            }
            log.i("角色" + this.name + "获得治疗" + v + " 生命值变为" + this.hp);
            this.emit(CreatureEventType.Heal, v, old);
        };
        Creature.prototype.calcDamage = function (v) {
        };
        Creature.prototype.tookDamage = function (info) {
            var old = this.hp;
            var block = this.block;
            var blockedDamage = 0;
            var damageDecreasedBlock = info.damage;
            var hpDamage = 0;
            if (block) {
                if (block >= info.damage) {
                    this.loseBlock(info.damage);
                    damageDecreasedBlock = 0;
                }
                else {
                    this.loseBlock(block);
                    damageDecreasedBlock = info.damage - block;
                }
                blockedDamage = info.damage - damageDecreasedBlock;
            }
            hpDamage = damageDecreasedBlock;
            this.hp -= damageDecreasedBlock;
            if (this.hp < 0) {
                hpDamage += this.hp;
                this.hp = 0;
            }
            if (info.onDoDamage) {
                info.onDoDamage(blockedDamage, hpDamage);
            }
            log.i("角色" + this.name + " 受到" + info.owner.name + "的伤害" + hpDamage + " 护甲阻挡了伤害" + blockedDamage + " 总伤害为" + info.damage + " 基础伤害为" + info.baseDamage + " 生命变成" + this.hp);
            if (damageDecreasedBlock <= 0) {
                return hpDamage;
            }
            this.emit(CreatureEventType.TookDamage, info, old, hpDamage, blockedDamage);
            if (info.owner) {
                info.owner.emit(CreatureEventType.DoDamage, info, hpDamage, blockedDamage);
            }
            if (this.hp == 0) {
                this.die();
            }
            return hpDamage;
        };
        Creature.prototype.dialog = function (msg) {
            this.battle.actionManager.addToTop(new STS.Dialog(this, msg));
        };
        Creature.prototype.changeState = function (state) {
            this.emit(CreatureEventType.StateChange, state);
        };
        Creature.prototype.die = function (isSuicide) {
            if (isSuicide === void 0) { isSuicide = false; }
            if (this.isDying) {
                return;
            }
            this.isDying = true;
            this.emit(CreatureEventType.Dead, isSuicide);
            if (!isSuicide) {
                if (this.battle.areMonstersBasicallyDead()) {
                    this.battle.endCombat(STS.BattleEndType.Win);
                }
            }
        };
        Creature.prototype.gainBlock = function (block) {
            var old = this.block;
            block = this.processValue(ValueProcessType.BlockRecieve, block);
            this.block += block;
            if (this.block > STS.Settings.MaxBlock) {
                this.block = STS.Settings.MaxBlock;
            }
            log.i("角色" + this.name + "获得护甲" + block + " 总护甲为" + this.block);
            this.emit(CreatureEventType.GainBlock, block, old);
        };
        Creature.prototype.loseBlock = function (block) {
            var old = this.block;
            this.block -= block;
            if (this.block < 0) {
                this.block = 0;
            }
            log.i("角色" + this.name + "失去护甲" + block + " 总护甲为" + this.block);
            this.emit(CreatureEventType.GainBlock, block, old);
        };
        return Creature;
    }(tbgame.FakeName));
    STS.Creature = Creature;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DamageData = (function () {
        function DamageData(baseDamage, owner, target, attackEffect, damageType, noValueInfluence) {
            if (damageType === void 0) { damageType = STS.DamageType.NORMAL; }
            this.owner = owner;
            this.target = target;
            this.baseDamage = baseDamage;
            this.attackEffect = attackEffect;
            this.type = damageType;
            var v = baseDamage;
            if (!noValueInfluence) {
                if (this.owner) {
                    v = this.owner.processValue(STS.ValueProcessType.DamageGive, v, this);
                }
                if (this.target) {
                    v = this.target.processValue(STS.ValueProcessType.DamageReceive, v, this);
                }
            }
            this.damage = Math.round(v);
        }
        return DamageData;
    }());
    STS.DamageData = DamageData;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MonsterGroup = (function (_super) {
        __extends(MonsterGroup, _super);
        function MonsterGroup() {
            return _super.call(this) || this;
        }
        MonsterGroup.prototype.setMonsters = function (monsters) {
            for (var i = 0; i < monsters.length; ++i) {
                this.addToBottom(monsters[i]);
                monsters[i].initBattle(this.battle);
            }
        };
        MonsterGroup.prototype.onStartCombat = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onStartCombat();
            }
        };
        MonsterGroup.prototype.onEndCombat = function (type) {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onEndCombat(type);
            }
        };
        MonsterGroup.prototype.onStartTurn = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onStartTurn();
            }
        };
        MonsterGroup.prototype.onEndTurn = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onEndTurn();
            }
        };
        MonsterGroup.prototype.usePreBattleAction = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].usePreBattleAction();
            }
        };
        MonsterGroup.prototype.takeTurn = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].takeTurn();
            }
        };
        return MonsterGroup;
    }(STS.DataGroup));
    STS.MonsterGroup = MonsterGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var PotionGroup = (function (_super) {
        __extends(PotionGroup, _super);
        function PotionGroup(owner) {
            var _this = _super.call(this) || this;
            _this.owner = owner;
            return _this;
        }
        PotionGroup.prototype.initWithPotionInfos = function (potionInfos) {
            for (var i = 0; i < potionInfos.length; ++i) {
                var potionInfo = potionInfos[i];
                var potion = STS.BasePotion.create(potionInfo.id, potionInfo.name);
                potion.setOwner(this.owner);
                this.addToBottom(potion);
            }
        };
        return PotionGroup;
    }(STS.DataGroup));
    STS.PotionGroup = PotionGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var PowerGroup = (function (_super) {
        __extends(PowerGroup, _super);
        function PowerGroup() {
            return _super.call(this) || this;
        }
        PowerGroup.prototype.clear = function () {
            this.items.forEach(function (p) {
                p.onDestroy();
            });
            this.items = [];
        };
        PowerGroup.prototype.remove = function (p) {
            _super.prototype.remove.call(this, p);
            p.onDestroy();
        };
        PowerGroup.prototype.removeByCondition = function (condition) {
            var toDelete = [];
            for (var i = 0; i < this.items.length; ++i) {
                if (condition(this.items[i])) {
                    toDelete.push(this.items[i]);
                }
            }
            for (var i = 0; i < toDelete.length; ++i) {
                toDelete[i].onDestroy();
                util.removeFromArray(this.items, toDelete[i]);
            }
        };
        return PowerGroup;
    }(STS.DataGroup));
    STS.PowerGroup = PowerGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RelicGroup = (function (_super) {
        __extends(RelicGroup, _super);
        function RelicGroup(owner) {
            var _this = _super.call(this) || this;
            _this.owner = owner;
            return _this;
        }
        RelicGroup.prototype.initWithRelicInfos = function (relicInfos) {
            for (var i = 0; i < relicInfos.length; ++i) {
                var relicInfo = relicInfos[i];
                var relic = STS.BaseRelic.create(relicInfo.id, relicInfo.name, relicInfo.counter);
                relic.setOwner(this.owner);
                this.addToBottom(relic);
                relic.onInit();
            }
        };
        RelicGroup.prototype.onStartCombat = function () {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onStartCombat();
            }
        };
        RelicGroup.prototype.onEndCombat = function (type) {
            for (var i = 0; i < this.items.length; ++i) {
                this.items[i].onEndCombat(type);
            }
        };
        return RelicGroup;
    }(STS.DataGroup));
    STS.RelicGroup = RelicGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Action = (function () {
        function Action(duration) {
            this.isDone = false;
            this.isFirstTick = true;
            this.duration = duration;
            if (duration == -1) {
                this.noAutoDone = true;
            }
            else {
                this.noAutoDone = false;
            }
        }
        Action.prototype.setBattle = function (battle) {
            this.battle = battle;
        };
        Action.prototype.getActionManager = function () {
            return this.battle.actionManager;
        };
        Action.prototype.update = function (dt) {
            if (this.isFirstTick) {
                this.isFirstTick = false;
                this.onFirstTick();
            }
            if (!this.noAutoDone) {
                this.duration -= dt;
                if (this.duration <= 0) {
                    this.isDone = true;
                }
            }
            this.onUpdate(dt);
        };
        Action.prototype.onUpdate = function (dt) {
        };
        Action.prototype.onFirstTick = function () {
        };
        return Action;
    }());
    STS.Action = Action;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AddPower = (function (_super) {
        __extends(AddPower, _super);
        function AddPower(target, power, amount) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.power = power;
            _this.amount = amount;
            return _this;
        }
        AddPower.prototype.onFirstTick = function () {
            this.target.addPowerByType(this.power, this.amount);
        };
        return AddPower;
    }(STS.Action));
    STS.AddPower = AddPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AnimateHop = (function (_super) {
        __extends(AnimateHop, _super);
        function AnimateHop(target) {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        AnimateHop.prototype.onFirstTick = function () {
            this.target.animateHop();
        };
        return AnimateHop;
    }(STS.Action));
    STS.AnimateHop = AnimateHop;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AnimateJump = (function (_super) {
        __extends(AnimateJump, _super);
        function AnimateJump(target) {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        AnimateJump.prototype.onFirstTick = function () {
            this.target.animateJump();
        };
        return AnimateJump;
    }(STS.Action));
    STS.AnimateJump = AnimateJump;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AnimateShake = (function (_super) {
        __extends(AnimateShake, _super);
        function AnimateShake(target, shakeDuration, actionDuration) {
            var _this = _super.call(this, actionDuration) || this;
            _this.target = target;
            _this.shakeDuration = shakeDuration;
            return _this;
        }
        AnimateShake.prototype.onFirstTick = function () {
            this.target.animateShake(this.shakeDuration);
        };
        return AnimateShake;
    }(STS.Action));
    STS.AnimateShake = AnimateShake;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AnimateSlowAttack = (function (_super) {
        __extends(AnimateSlowAttack, _super);
        function AnimateSlowAttack(target) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            return _this;
        }
        AnimateSlowAttack.prototype.onFirstTick = function () {
            this.target.animateSlowAttack();
        };
        return AnimateSlowAttack;
    }(STS.Action));
    STS.AnimateSlowAttack = AnimateSlowAttack;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BurnIncrease = (function (_super) {
        __extends(BurnIncrease, _super);
        function BurnIncrease() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        BurnIncrease.prototype.onFirstTick = function () {
        };
        return BurnIncrease;
    }(STS.Action));
    STS.BurnIncrease = BurnIncrease;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CallbackAction = (function (_super) {
        __extends(CallbackAction, _super);
        function CallbackAction(cb) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.cb = cb;
            return _this;
        }
        CallbackAction.prototype.onFirstTick = function () {
            var _this = this;
            this.cb(function () {
                _this.isDone = true;
            });
        };
        return CallbackAction;
    }(STS.Action));
    STS.CallbackAction = CallbackAction;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CanLose = (function (_super) {
        __extends(CanLose, _super);
        function CanLose() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        CanLose.prototype.onFirstTick = function () {
            this.isDone = true;
            this.battle.cannotLose = false;
        };
        return CanLose;
    }(STS.Action));
    STS.CanLose = CanLose;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CannotLose = (function (_super) {
        __extends(CannotLose, _super);
        function CannotLose() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        CannotLose.prototype.onFirstTick = function () {
            this.isDone = true;
            this.battle.cannotLose = true;
        };
        return CannotLose;
    }(STS.Action));
    STS.CannotLose = CannotLose;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ChangeState = (function (_super) {
        __extends(ChangeState, _super);
        function ChangeState(target, state) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.state = state;
            return _this;
        }
        ChangeState.prototype.onFirstTick = function () {
            this.target.changeState(this.state);
        };
        return ChangeState;
    }(STS.Action));
    STS.ChangeState = ChangeState;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ChooseHandCard = (function (_super) {
        __extends(ChooseHandCard, _super);
        function ChooseHandCard(amount, isRandom, cb) {
            var _this = _super.call(this, -1) || this;
            _this.amount = amount;
            _this.isRandom = isRandom;
            _this.cb = cb;
            return _this;
        }
        ChooseHandCard.prototype.onFirstTick = function () {
            var hand = this.battle.player.hand;
            if (hand.length == 0) {
                this.onChooseCard([]);
                return;
            }
            if (this.isRandom) {
                this.onChooseCard(hand.choose(this.amount, this.battle.player.shuffleRng));
                return;
            }
            else {
                if (hand.length == this.amount) {
                    this.onChooseCard(hand.getAll());
                    return;
                }
                this.battle.player.emitCb(STS.AdventurerEventType.ChooseHandCard, this.onChooseCard.bind(this), this.amount);
            }
        };
        ChooseHandCard.prototype.onChooseCard = function (cards) {
            this.isDone = true;
            this.cb(cards);
        };
        return ChooseHandCard;
    }(STS.Action));
    STS.ChooseHandCard = ChooseHandCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Damage = (function (_super) {
        __extends(Damage, _super);
        function Damage(info) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.info = info;
            return _this;
        }
        Damage.prototype.onFirstTick = function () {
            this.info.target.tookDamage(this.info);
        };
        return Damage;
    }(STS.Action));
    STS.Damage = Damage;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog(target, msg) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.msg = msg;
            _this.target = target;
            return _this;
        }
        Dialog.prototype.onFirstTick = function () {
            this.target.emit(STS.CreatureEventType.Dialog, this.msg);
        };
        return Dialog;
    }(STS.Action));
    STS.Dialog = Dialog;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DiscardCardEndTurn = (function (_super) {
        __extends(DiscardCardEndTurn, _super);
        function DiscardCardEndTurn() {
            var _this = _super.call(this, -1) || this;
            _this.duration = STS.Settings.TimeFast;
            return _this;
        }
        DiscardCardEndTurn.prototype.onUpdate = function (dt) {
            var player = this.battle.player;
            var rest = player.hand.size();
            if (rest == 0) {
                this.isDone = true;
                return;
            }
            this.duration -= dt;
            if (this.duration <= 0) {
                player.moveCardFromHandToDiscardPile(player.hand.getTop());
                this.duration = STS.Settings.TimeFast;
            }
        };
        return DiscardCardEndTurn;
    }(STS.Action));
    STS.DiscardCardEndTurn = DiscardCardEndTurn;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DrawCardTime = STS.Settings.TimeFast;
    var DrawCard = (function (_super) {
        __extends(DrawCard, _super);
        function DrawCard(num) {
            var _this = _super.call(this, -1) || this;
            _this.num = num;
            _this.duration = DrawCardTime;
            return _this;
        }
        DrawCard.prototype.onUpdate = function (dt) {
            if (this.num == 0) {
                this.isDone = true;
                return;
            }
            var player = this.battle.player;
            var deckSize = player.drawPile.size();
            var discardSize = player.discardPile.size();
            if (deckSize + discardSize == 0) {
                log.i("动作抽牌结束，抽牌和弃牌堆总卡牌数为0");
                this.isDone = true;
                return;
            }
            if (player.hand.size() == STS.Settings.MaxHandNum) {
                log.i("动作抽牌结束，角色手牌超过" + STS.Settings.MaxHandNum + "张");
                this.isDone = true;
                return;
            }
            if (this.num > deckSize) {
                var tmp = this.num - deckSize;
                this.battle.actionManager.addToTop(new DrawCard(tmp));
                this.battle.actionManager.addToTop(new STS.ShuffleCards());
                if (deckSize != 0) {
                    this.battle.actionManager.addToTop(new DrawCard(deckSize));
                }
                this.num = 0;
                this.isDone = true;
                log.i("动作抽牌结束，抽牌堆不够，需要先洗牌");
                return;
            }
            this.duration -= dt;
            if (this.num != 0 && this.duration < 0) {
                this.duration = DrawCardTime;
                --this.num;
                if (player.drawPile.size() != 0) {
                    player.draw();
                }
                else {
                    log.i("无牌可抽");
                    this.isDone = true;
                }
                if (this.num == 0) {
                    log.i("动作抽牌正常结束");
                    this.isDone = true;
                }
            }
        };
        return DrawCard;
    }(STS.Action));
    STS.DrawCard = DrawCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Escape = (function (_super) {
        __extends(Escape, _super);
        function Escape(target) {
            var _this = _super.call(this, STS.Settings.TimeMedium) || this;
            _this.target = target;
            return _this;
        }
        Escape.prototype.onUpdate = function (dt) {
            this.target.escape();
        };
        return Escape;
    }(STS.Action));
    STS.Escape = Escape;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ExhaustCard = (function (_super) {
        __extends(ExhaustCard, _super);
        function ExhaustCard(card) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.card = card;
            return _this;
        }
        ExhaustCard.prototype.onFirstTick = function () {
            this.battle.player.moveCardFromHandToExhaustPile(this.card);
        };
        return ExhaustCard;
    }(STS.Action));
    STS.ExhaustCard = ExhaustCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var GainBlock = (function (_super) {
        __extends(GainBlock, _super);
        function GainBlock(creature, block) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.creature = creature;
            _this.block = block;
            return _this;
        }
        GainBlock.prototype.onFirstTick = function () {
            this.creature.gainBlock(this.block);
        };
        return GainBlock;
    }(STS.Action));
    STS.GainBlock = GainBlock;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var GainBlockRandomMonster = (function (_super) {
        __extends(GainBlockRandomMonster, _super);
        function GainBlockRandomMonster(target, block) {
            var _this = _super.call(this, STS.Settings.TimeMedium) || this;
            _this.target = target;
            _this.block = block;
            return _this;
        }
        GainBlockRandomMonster.prototype.onFirstTick = function () {
            var _this = this;
            var validMonsters = [];
            this.battle.monsters.forEach(function (m) {
                if (m != _this.target && m.move.intent != STS.Intent.ESCAPE && !m.isDying) {
                    validMonsters.push(m);
                }
            });
            var target;
            if (validMonsters.length != 0) {
                target = this.target.aiRng.array(validMonsters);
            }
            else {
                target = this.target;
            }
            target.gainBlock(this.block);
        };
        return GainBlockRandomMonster;
    }(STS.Action));
    STS.GainBlockRandomMonster = GainBlockRandomMonster;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var GainEnergy = (function (_super) {
        __extends(GainEnergy, _super);
        function GainEnergy(energy) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.energy = energy;
            return _this;
        }
        GainEnergy.prototype.onFirstTick = function () {
            this.battle.player.gainEnergy(this.energy);
        };
        return GainEnergy;
    }(STS.Action));
    STS.GainEnergy = GainEnergy;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Heal = (function (_super) {
        __extends(Heal, _super);
        function Heal(target, source, amount) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.source = source;
            _this.amount = amount;
            return _this;
        }
        Heal.prototype.onFirstTick = function () {
            this.target.heal(this.amount);
        };
        return Heal;
    }(STS.Action));
    STS.Heal = Heal;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var HideHpBar = (function (_super) {
        __extends(HideHpBar, _super);
        function HideHpBar(target) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            return _this;
        }
        HideHpBar.prototype.onFirstTick = function () {
            this.target.emit(STS.CreatureEventType.HideHpBar);
        };
        return HideHpBar;
    }(STS.Action));
    STS.HideHpBar = HideHpBar;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var LoseBlock = (function (_super) {
        __extends(LoseBlock, _super);
        function LoseBlock(creature, block) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.creature = creature;
            _this.block = block;
            return _this;
        }
        LoseBlock.prototype.onFirstTick = function () {
            this.creature.loseBlock(this.block);
        };
        return LoseBlock;
    }(STS.Action));
    STS.LoseBlock = LoseBlock;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var LoseEnergy = (function (_super) {
        __extends(LoseEnergy, _super);
        function LoseEnergy(amount) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.amount = amount;
            return _this;
        }
        LoseEnergy.prototype.onFirstTick = function () {
            this.battle.player.loseEnergy(this.amount);
        };
        return LoseEnergy;
    }(STS.Action));
    STS.LoseEnergy = LoseEnergy;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MakeCardInDiscard = (function (_super) {
        __extends(MakeCardInDiscard, _super);
        function MakeCardInDiscard(cardType, amount, level) {
            if (level === void 0) { level = 0; }
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.cardType = cardType;
            _this.amount = amount;
            _this.level = level;
            return _this;
        }
        MakeCardInDiscard.prototype.onFirstTick = function () {
            for (var i = 0; i < this.amount; ++i) {
                this.battle.player.makeCardInDiscardPile(this.cardType, this.level);
            }
        };
        return MakeCardInDiscard;
    }(STS.Action));
    STS.MakeCardInDiscard = MakeCardInDiscard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MakeCardInDiscardAndDraw = (function (_super) {
        __extends(MakeCardInDiscardAndDraw, _super);
        function MakeCardInDiscardAndDraw(cardType, level) {
            if (level === void 0) { level = 0; }
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.cardType = cardType;
            _this.level = level;
            return _this;
        }
        MakeCardInDiscardAndDraw.prototype.onFirstTick = function () {
            this.battle.player.makeCardInDiscardPile(this.cardType, this.level);
            this.battle.player.makeCardInDrawPile(this.cardType, this.level);
        };
        return MakeCardInDiscardAndDraw;
    }(STS.Action));
    STS.MakeCardInDiscardAndDraw = MakeCardInDiscardAndDraw;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MakeCardInDraw = (function (_super) {
        __extends(MakeCardInDraw, _super);
        function MakeCardInDraw(cardType, amount, level) {
            if (level === void 0) { level = 0; }
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.cardType = cardType;
            _this.amount = amount;
            _this.level = level;
            return _this;
        }
        MakeCardInDraw.prototype.onFirstTick = function () {
            for (var i = 0; i < this.amount; ++i) {
                this.battle.player.makeCardInDrawPile(this.cardType, this.level);
            }
        };
        return MakeCardInDraw;
    }(STS.Action));
    STS.MakeCardInDraw = MakeCardInDraw;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ReducePower = (function (_super) {
        __extends(ReducePower, _super);
        function ReducePower(target, powerType, amount) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.powerType = powerType;
            _this.amount = amount;
            return _this;
        }
        ReducePower.prototype.onFirstTick = function () {
            this.target.reducePowerByType(this.powerType, this.amount);
        };
        return ReducePower;
    }(STS.Action));
    STS.ReducePower = ReducePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RemoveDebuffs = (function (_super) {
        __extends(RemoveDebuffs, _super);
        function RemoveDebuffs(target) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            return _this;
        }
        RemoveDebuffs.prototype.onFirstTick = function () {
            var actMgr = this.battle.actionManager;
            this.target.powers.forEach(function (p) {
                if (p.type == STS.PowerType.DEBUFF) {
                    actMgr.addToTop(new STS.RemovePower(p));
                }
            });
            this.isDone = true;
        };
        return RemoveDebuffs;
    }(STS.Action));
    STS.RemoveDebuffs = RemoveDebuffs;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RemovePower = (function (_super) {
        __extends(RemovePower, _super);
        function RemovePower(power) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.power = power;
            return _this;
        }
        RemovePower.prototype.onFirstTick = function () {
            this.power.removeFromOwner();
        };
        return RemovePower;
    }(STS.Action));
    STS.RemovePower = RemovePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RemovePowerByType = (function (_super) {
        __extends(RemovePowerByType, _super);
        function RemovePowerByType(target, powerType) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.powerType = powerType;
            return _this;
        }
        RemovePowerByType.prototype.onFirstTick = function () {
            this.target.removePowerByType(this.powerType);
        };
        return RemovePowerByType;
    }(STS.Action));
    STS.RemovePowerByType = RemovePowerByType;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ReviveMonster = (function (_super) {
        __extends(ReviveMonster, _super);
        function ReviveMonster(target, source, healEffect) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.source = source;
            _this.healEffect = healEffect;
            return _this;
        }
        ReviveMonster.prototype.onFirstTick = function () {
            this.target.isDying = false;
            this.target.heal(this.target.maxhp);
            this.target.isDead = false;
            this.target.powers.clear();
            var m = this.target;
            m.rollMove();
        };
        return ReviveMonster;
    }(STS.Action));
    STS.ReviveMonster = ReviveMonster;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RollMove = (function (_super) {
        __extends(RollMove, _super);
        function RollMove(target) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            return _this;
        }
        RollMove.prototype.onFirstTick = function () {
            this.target.rollMove();
        };
        return RollMove;
    }(STS.Action));
    STS.RollMove = RollMove;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SetAnimation = (function (_super) {
        __extends(SetAnimation, _super);
        function SetAnimation(target, name) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.name = name;
            return _this;
        }
        SetAnimation.prototype.onFirstTick = function () {
            this.target.setAnimation(this.name);
        };
        return SetAnimation;
    }(STS.Action));
    STS.SetAnimation = SetAnimation;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SetMove = (function (_super) {
        __extends(SetMove, _super);
        function SetMove(target, moveName, nextMove, intent, baseDamage, multiplier, isMultiDamage) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            _this.moveName = moveName;
            _this.nextMove = nextMove;
            _this.intent = intent;
            _this.baseDamage = baseDamage;
            _this.multiplier = multiplier;
            _this.isMultiDamage = isMultiDamage;
            return _this;
        }
        SetMove.prototype.onFirstTick = function () {
            this.target.setMove(this.moveName, this.nextMove, this.intent, this.baseDamage, this.multiplier, this.isMultiDamage);
            this.isDone = true;
        };
        return SetMove;
    }(STS.Action));
    STS.SetMove = SetMove;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ShakeIntensity;
    (function (ShakeIntensity) {
        ShakeIntensity[ShakeIntensity["LOW"] = 0] = "LOW";
        ShakeIntensity[ShakeIntensity["MED"] = 1] = "MED";
        ShakeIntensity[ShakeIntensity["HIGH"] = 2] = "HIGH";
    })(ShakeIntensity = STS.ShakeIntensity || (STS.ShakeIntensity = {}));
    var ShakeDur;
    (function (ShakeDur) {
        ShakeDur[ShakeDur["SHORT"] = 0] = "SHORT";
        ShakeDur[ShakeDur["MED"] = 1] = "MED";
        ShakeDur[ShakeDur["LONG"] = 2] = "LONG";
        ShakeDur[ShakeDur["XLONG"] = 3] = "XLONG";
    })(ShakeDur = STS.ShakeDur || (STS.ShakeDur = {}));
    var ShakeScreen = (function (_super) {
        __extends(ShakeScreen, _super);
        function ShakeScreen(duration, dur, intensity) {
            var _this = _super.call(this, duration) || this;
            _this.dur = dur;
            _this.intensity = intensity;
            return _this;
        }
        ShakeScreen.prototype.onFirstTick = function () {
            this.battle.emit(STS.BattleEventType.ShakeScreen, this.intensity, this.dur);
        };
        return ShakeScreen;
    }(STS.Action));
    STS.ShakeScreen = ShakeScreen;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Shout = (function (_super) {
        __extends(Shout, _super);
        function Shout(target, msg) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.msg = msg;
            _this.target = target;
            return _this;
        }
        Shout.prototype.onFirstTick = function () {
            this.target.emit(STS.CreatureEventType.Shout, this.msg);
        };
        return Shout;
    }(STS.Action));
    STS.Shout = Shout;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ShowCard = (function (_super) {
        __extends(ShowCard, _super);
        function ShowCard() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        return ShowCard;
    }(STS.Action));
    STS.ShowCard = ShowCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ShuffleCards = (function (_super) {
        __extends(ShuffleCards, _super);
        function ShuffleCards() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        ShuffleCards.prototype.onFirstTick = function () {
            this.battle.player.shuffle();
        };
        return ShuffleCards;
    }(STS.Action));
    STS.ShuffleCards = ShuffleCards;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SpawnMonster = (function (_super) {
        __extends(SpawnMonster, _super);
        function SpawnMonster(monsterType, x, y, hp, isMinion) {
            if (isMinion === void 0) { isMinion = false; }
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.monsterType = monsterType;
            _this.x = x;
            _this.y = y;
            _this.hp = hp;
            _this.isMinion = isMinion;
            return _this;
        }
        SpawnMonster.prototype.onFirstTick = function () {
            var monster = new this.monsterType();
            monster.initBattle(this.battle, this.hp);
            if (this.isMinion) {
                monster.addPowerByType(STS.MinionPower, 0);
            }
            monster.x = this.x;
            monster.y = this.y;
            this.battle.monsters.addToBottom(monster);
            this.battle.emit(STS.BattleEventType.SpawnMonster, monster);
        };
        return SpawnMonster;
    }(STS.Action));
    STS.SpawnMonster = SpawnMonster;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Stasis = (function (_super) {
        __extends(Stasis, _super);
        function Stasis(target) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.target = target;
            return _this;
        }
        Stasis.prototype.onFirstTick = function () {
        };
        return Stasis;
    }(STS.Action));
    STS.Stasis = Stasis;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Suicide = (function (_super) {
        __extends(Suicide, _super);
        function Suicide(target) {
            var _this = _super.call(this, 0) || this;
            _this.target = target;
            return _this;
        }
        Suicide.prototype.onFirstTick = function () {
            this.target.gold = 0;
            this.target.hp = 0;
            this.target.die(true);
        };
        return Suicide;
    }(STS.Action));
    STS.Suicide = Suicide;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SummonGremlin = (function (_super) {
        __extends(SummonGremlin, _super);
        function SummonGremlin(monsters) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.monsters = monsters;
            return _this;
        }
        SummonGremlin.prototype.onFirstTick = function () {
        };
        return SummonGremlin;
    }(STS.Action));
    STS.SummonGremlin = SummonGremlin;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TakeDamage = (function (_super) {
        __extends(TakeDamage, _super);
        function TakeDamage(target, info) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.info = info;
            _this.target = target;
            return _this;
        }
        TakeDamage.prototype.onFirstTick = function () {
            this.target.tookDamage(this.info);
        };
        return TakeDamage;
    }(STS.Action));
    STS.TakeDamage = TakeDamage;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TurnEnd = (function (_super) {
        __extends(TurnEnd, _super);
        function TurnEnd() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        TurnEnd.prototype.onFirstTick = function () {
            this.battle.endTurn();
        };
        return TurnEnd;
    }(STS.Action));
    STS.TurnEnd = TurnEnd;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TurnStart = (function (_super) {
        __extends(TurnStart, _super);
        function TurnStart() {
            return _super.call(this, STS.Settings.TimeFast) || this;
        }
        TurnStart.prototype.onFirstTick = function () {
            this.battle.startTurn();
        };
        return TurnStart;
    }(STS.Action));
    STS.TurnStart = TurnStart;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var UseCard = (function (_super) {
        __extends(UseCard, _super);
        function UseCard(card, monster) {
            var _this = _super.call(this, STS.Settings.TimeXtremeFast) || this;
            _this.card = card;
            _this.monster = monster;
            return _this;
        }
        UseCard.prototype.onFirstTick = function () {
            this.battle.player.moveCardFromHandToDiscardPile(this.card);
        };
        return UseCard;
    }(STS.Action));
    STS.UseCard = UseCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var UsePotion = (function (_super) {
        __extends(UsePotion, _super);
        function UsePotion(potion, monster) {
            var _this = _super.call(this, STS.Settings.TimeXtremeFast) || this;
            _this.potion = potion;
            _this.monster = monster;
            return _this;
        }
        UsePotion.prototype.onFirstTick = function () {
            this.battle.player.usePotion(this.potion, this.monster);
        };
        return UsePotion;
    }(STS.Action));
    STS.UsePotion = UsePotion;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var VampireDamage = (function (_super) {
        __extends(VampireDamage, _super);
        function VampireDamage(info) {
            var _this = _super.call(this, STS.Settings.TimeFast) || this;
            _this.info = info;
            return _this;
        }
        VampireDamage.prototype.onFirstTick = function () {
            var hpDamage = this.info.target.tookDamage(this.info);
            if (hpDamage > 0) {
                this.getActionManager().addToTop(new STS.Heal(this.info.owner, this.info.owner, hpDamage));
                this.getActionManager().addToTop(new STS.Wait(0.1));
            }
        };
        return VampireDamage;
    }(STS.Action));
    STS.VampireDamage = VampireDamage;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Wait = (function (_super) {
        __extends(Wait, _super);
        function Wait(duration) {
            return _super.call(this, duration) || this;
        }
        return Wait;
    }(STS.Action));
    STS.Wait = Wait;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CardTarget;
    (function (CardTarget) {
        CardTarget[CardTarget["Enemy"] = 0] = "Enemy";
        CardTarget[CardTarget["AllEnemy"] = 1] = "AllEnemy";
        CardTarget[CardTarget["Self"] = 2] = "Self";
        CardTarget[CardTarget["None"] = 3] = "None";
        CardTarget[CardTarget["SelfAndEnemy"] = 4] = "SelfAndEnemy";
        CardTarget[CardTarget["All"] = 5] = "All";
    })(CardTarget = STS.CardTarget || (STS.CardTarget = {}));
    var CardTagName;
    (function (CardTagName) {
        CardTagName["Zhuaji"] = "Zhuaji";
    })(CardTagName = STS.CardTagName || (STS.CardTagName = {}));
    var CardEventType;
    (function (CardEventType) {
        CardEventType["Draw"] = "Draw";
        CardEventType["Discard"] = "Discard";
        CardEventType["MoveFromHandToDiscardPile"] = "MoveFromHandToDiscardPile";
        CardEventType["MoveFromHandToExhaustPile"] = "MoveFromHandToExhaustPile";
        CardEventType["MakeCardInDiscardPile"] = "MakeCardInDiscardPile";
        CardEventType["MakeCardInHand"] = "MakeCardInHand";
        CardEventType["MakeCardInDrawPile"] = "MakeCardInDrawPile";
    })(CardEventType = STS.CardEventType || (STS.CardEventType = {}));
    var CardRarity;
    (function (CardRarity) {
        CardRarity["Basic"] = "Basic";
        CardRarity["Special"] = "Special";
        CardRarity["Common"] = "Common";
        CardRarity["Uncommon"] = "Uncommon";
        CardRarity["Rare"] = "Rare";
        CardRarity["Curse"] = "Curse";
    })(CardRarity = STS.CardRarity || (STS.CardRarity = {}));
    var CardColor;
    (function (CardColor) {
        CardColor["Red"] = "Red";
        CardColor["Green"] = "Green";
        CardColor["Blue"] = "Blue";
        CardColor["Colorless"] = "Colorless";
        CardColor["Curse"] = "Curse";
    })(CardColor = STS.CardColor || (STS.CardColor = {}));
    var CardType;
    (function (CardType) {
        CardType[CardType["Attack"] = 0] = "Attack";
        CardType[CardType["Skill"] = 1] = "Skill";
        CardType[CardType["Power"] = 2] = "Power";
        CardType[CardType["Status"] = 3] = "Status";
        CardType[CardType["Curse"] = 4] = "Curse";
    })(CardType = STS.CardType || (STS.CardType = {}));
    var CardSubType;
    (function (CardSubType) {
        CardSubType[CardSubType["None"] = 0] = "None";
        CardSubType[CardSubType["Ammo"] = 1] = "Ammo";
    })(CardSubType = STS.CardSubType || (STS.CardSubType = {}));
    STS.CardLibrary = {};
    STS.CardClassRarityMap = {};
    STS.CardClassLibrary = {};
    STS.CardColorLibrary = {};
    function CardDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.CardLibrary[target.name] = target;
        target.prototype.getInfo = function () {
            return target;
        };
        if (!STS.CardColorLibrary[target.color]) {
            STS.CardColorLibrary[target.color] = {};
        }
        STS.CardColorLibrary[target.color][target.name] = target;
        if (target.classType) {
            if (!STS.CardClassLibrary[target.classType]) {
                STS.CardClassLibrary[target.classType] = {};
            }
            STS.CardClassLibrary[target.classType][target.name] = target;
            var rarityMap = STS.CardClassRarityMap[target.classType];
            if (!rarityMap) {
                rarityMap = {};
                STS.CardClassRarityMap[target.classType] = rarityMap;
            }
            if (!rarityMap[target.rarity]) {
                rarityMap[target.rarity] = {};
            }
            rarityMap[target.rarity][target.name] = target;
        }
    }
    STS.CardDefine = CardDefine;
    var BaseCard = (function (_super) {
        __extends(BaseCard, _super);
        function BaseCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseCard.prototype.getBaseBlock = function () {
            if (this.level > 0) {
                return this.upgradeBlock + this.baseBlock || 0;
            }
            return this.baseBlock;
        };
        Object.defineProperty(BaseCard.prototype, "name", {
            get: function () {
                return this.getName();
            },
            enumerable: true,
            configurable: true
        });
        BaseCard.prototype.getActionManager = function () {
            return this.owner.battle.actionManager;
        };
        BaseCard.prototype.getInfo = function () { return null; };
        ;
        BaseCard.prototype.setOwner = function (owner) {
            this.owner = owner;
        };
        BaseCard.prototype.needSelectTarget = function () {
            return this.getInfo().target == STS.CardTarget.Enemy;
        };
        BaseCard.prototype.clone = function () {
            var cardType = STS.CardLibrary[this.getName()];
            if (!cardType) {
                return null;
            }
            var card = new cardType();
            card.id = this.id;
            card.level = this.level;
            if (cardType.tags) {
                for (var i = 0; i < cardType.tags.length; ++i) {
                    card.addTag(cardType.tags[i]);
                }
            }
            return card;
        };
        BaseCard.create = function (id, name, level) {
            var cardType = STS.CardLibrary[name];
            if (!cardType) {
                log.e("卡牌不存在" + name);
                return null;
            }
            var card = new cardType();
            card.id = id;
            card.level = level;
            if (cardType.tags) {
                for (var i = 0; i < cardType.tags.length; ++i) {
                    card.addTag(cardType.tags[i]);
                }
            }
            return card;
        };
        BaseCard.prototype.canPlay = function (monster) {
            if (this.owner.getEnergy() < this.getInfo().cost) {
                return false;
            }
            return true;
        };
        BaseCard.prototype.use = function (monster) {
        };
        BaseCard.prototype.toString = function () {
            return this.getName();
        };
        BaseCard.prototype.serialize = function () {
            return {
                name: this.getName(),
                id: this.id,
                level: this.level,
            };
        };
        BaseCard.prototype.onStartCombat = function () {
        };
        BaseCard.prototype.onEndCombat = function (type) {
        };
        BaseCard.prototype.onEndTurn = function () {
        };
        BaseCard.prototype.onDraw = function () {
        };
        BaseCard.subType = CardSubType.None;
        return BaseCard;
    }(tbgame.FakeName));
    STS.BaseCard = BaseCard;
    var AttackCard = (function (_super) {
        __extends(AttackCard, _super);
        function AttackCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseMagicNumber = 2;
            _this.upgradeMagic = 1;
            return _this;
        }
        AttackCard.prototype.getBaseDamage = function () {
            if (this.level > 0) {
                return this.baseDamage + this.upgradeDamage || 0;
            }
            return this.baseDamage;
        };
        AttackCard.prototype.getMagic = function () {
            if (this.level > 0) {
                return this.baseMagicNumber + this.upgradeMagic || 0;
            }
            return this.baseMagicNumber;
        };
        return AttackCard;
    }(BaseCard));
    STS.AttackCard = AttackCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    STS.PowerLibrary = {};
    var PowerType;
    (function (PowerType) {
        PowerType[PowerType["BUFF"] = 0] = "BUFF";
        PowerType[PowerType["DEBUFF"] = 1] = "DEBUFF";
    })(PowerType = STS.PowerType || (STS.PowerType = {}));
    var PowerEventType;
    (function (PowerEventType) {
        PowerEventType["PowerTrigger"] = "PowerTrigger";
        PowerEventType["PowerAmountAdd"] = "PowerAmountAdd";
        PowerEventType["PowerAmountSub"] = "PowerAmountSub";
    })(PowerEventType = STS.PowerEventType || (STS.PowerEventType = {}));
    function PowerDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.PowerLibrary[target.name] = target;
    }
    STS.PowerDefine = PowerDefine;
    var BasePower = (function (_super) {
        __extends(BasePower, _super);
        function BasePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 0;
            _this.priority = 0;
            return _this;
        }
        BasePower.prototype.setOwner = function (owner) {
            this.owner = owner;
        };
        BasePower.prototype.getActionManager = function () {
            return this.owner.battle.actionManager;
        };
        BasePower.create = function (id, name, amount) {
            var powerType = STS.PowerLibrary[name];
            if (!powerType) {
                log.e("能力不存在" + name);
                return null;
            }
            var power = new powerType();
            power.id = id;
            power.amount = amount;
            return power;
        };
        BasePower.prototype.onInit = function () {
        };
        BasePower.prototype.trigger = function () {
            this.emit(PowerEventType.PowerTrigger);
        };
        BasePower.prototype.addAmount = function (amount) {
            var old = this.amount;
            this.amount += amount;
            this.emit(PowerEventType.PowerAmountAdd, amount, old);
        };
        BasePower.prototype.subAmount = function (amount) {
            var old = this.amount;
            this.amount -= amount;
            this.emit(PowerEventType.PowerAmountSub, amount, old);
        };
        BasePower.prototype.compareTo = function (other) {
            return this.priority - other.priority;
        };
        BasePower.prototype.removeFromOwner = function () {
            this.owner.removePower(this);
        };
        return BasePower;
    }(tbgame.FakeName));
    STS.BasePower = BasePower;
    var TurnBasePower = (function (_super) {
        __extends(TurnBasePower, _super);
        function TurnBasePower() {
            return _super.call(this) || this;
        }
        TurnBasePower.prototype.onInit = function () {
            this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this));
        };
        TurnBasePower.prototype.onEndTurn = function () {
            this.subAmount(1);
        };
        TurnBasePower.prototype.subAmount = function (amount) {
            _super.prototype.subAmount.call(this, amount);
            if (this.amount <= 0) {
                this.owner.battle.actionManager.addToTop(new STS.RemovePower(this));
            }
        };
        return TurnBasePower;
    }(BasePower));
    STS.TurnBasePower = TurnBasePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BurnCard = (function (_super) {
        __extends(BurnCard, _super);
        function BurnCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BurnCard.res = "jngedang";
        BurnCard.cost = 1;
        BurnCard.pool = 4;
        BurnCard.rarity = STS.CardRarity.Common;
        BurnCard.target = STS.CardTarget.Self;
        BurnCard.type = STS.CardType.Status;
        BurnCard.color = STS.CardColor.Colorless;
        BurnCard = __decorate([
            STS.CardDefine
        ], BurnCard);
        return BurnCard;
    }(STS.BaseCard));
    STS.BurnCard = BurnCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DazedCard = (function (_super) {
        __extends(DazedCard, _super);
        function DazedCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DazedCard.prototype.onEndTurn = function () {
            this.getActionManager().addToTop(new STS.ExhaustCard(this));
        };
        DazedCard.res = "jngedang";
        DazedCard.cost = -2;
        DazedCard.pool = 4;
        DazedCard.rarity = STS.CardRarity.Common;
        DazedCard.target = STS.CardTarget.Self;
        DazedCard.type = STS.CardType.Status;
        DazedCard.color = STS.CardColor.Colorless;
        DazedCard = __decorate([
            STS.CardDefine
        ], DazedCard);
        return DazedCard;
    }(STS.BaseCard));
    STS.DazedCard = DazedCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SlimeCard = (function (_super) {
        __extends(SlimeCard, _super);
        function SlimeCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlimeCard.res = "jngedang";
        SlimeCard.cost = 1;
        SlimeCard.pool = 4;
        SlimeCard.rarity = STS.CardRarity.Common;
        SlimeCard.target = STS.CardTarget.Self;
        SlimeCard.type = STS.CardType.Status;
        SlimeCard.color = STS.CardColor.Colorless;
        SlimeCard = __decorate([
            STS.CardDefine
        ], SlimeCard);
        return SlimeCard;
    }(STS.BaseCard));
    STS.SlimeCard = SlimeCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var VoidCard = (function (_super) {
        __extends(VoidCard, _super);
        function VoidCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VoidCard.prototype.onDraw = function () {
            this.getActionManager().addToBottom(new STS.LoseEnergy(1));
        };
        VoidCard.prototype.onEndTurn = function () {
            this.getActionManager().addToTop(new STS.ExhaustCard(this));
        };
        VoidCard.res = "jngedang";
        VoidCard.cost = -2;
        VoidCard.pool = 4;
        VoidCard.rarity = STS.CardRarity.Common;
        VoidCard.target = STS.CardTarget.Self;
        VoidCard.type = STS.CardType.Status;
        VoidCard.color = STS.CardColor.Colorless;
        VoidCard = __decorate([
            STS.CardDefine
        ], VoidCard);
        return VoidCard;
    }(STS.BaseCard));
    STS.VoidCard = VoidCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var WoundCard = (function (_super) {
        __extends(WoundCard, _super);
        function WoundCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WoundCard.res = "jngedang";
        WoundCard.cost = -2;
        WoundCard.pool = 4;
        WoundCard.rarity = STS.CardRarity.Common;
        WoundCard.target = STS.CardTarget.Self;
        WoundCard.type = STS.CardType.Status;
        WoundCard.color = STS.CardColor.Colorless;
        WoundCard = __decorate([
            STS.CardDefine
        ], WoundCard);
        return WoundCard;
    }(STS.BaseCard));
    STS.WoundCard = WoundCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ChuantouZhuaji = (function (_super) {
        __extends(ChuantouZhuaji, _super);
        function ChuantouZhuaji() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseDamage = 6;
            _this.baseMagicNumber = 2;
            _this.upgradeMagic = 1;
            return _this;
        }
        ChuantouZhuaji.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.getBaseDamage(), this.owner, monster, STS.AttackEffect.SLASH_HEAVY)));
        };
        ChuantouZhuaji.prototype.getBaseDamage = function () {
            var cardNum = this.owner.getCardNumByTag(STS.CardTagName.Zhuaji);
            return this.baseDamage + this.getMagic() * cardNum;
        };
        ChuantouZhuaji.res = "chuantouzhuaji";
        ChuantouZhuaji.cost = 2;
        ChuantouZhuaji.pool = 0;
        ChuantouZhuaji.classType = STS.ClassType.Werewolf;
        ChuantouZhuaji.rarity = STS.CardRarity.Common;
        ChuantouZhuaji.target = STS.CardTarget.Enemy;
        ChuantouZhuaji.type = STS.CardType.Attack;
        ChuantouZhuaji.color = STS.CardColor.Red;
        ChuantouZhuaji.tags = [STS.CardTagName.Zhuaji];
        ChuantouZhuaji = __decorate([
            STS.CardDefine
        ], ChuantouZhuaji);
        return ChuantouZhuaji;
    }(STS.AttackCard));
    STS.ChuantouZhuaji = ChuantouZhuaji;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var HoupiCard = (function (_super) {
        __extends(HoupiCard, _super);
        function HoupiCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseBlock = 5;
            _this.upgradeBlock = 3;
            return _this;
        }
        HoupiCard.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.getBaseBlock()));
        };
        HoupiCard.res = "jngedang";
        HoupiCard.cost = 1;
        HoupiCard.pool = 0;
        HoupiCard.classType = STS.ClassType.Werewolf;
        HoupiCard.rarity = STS.CardRarity.Basic;
        HoupiCard.target = STS.CardTarget.Self;
        HoupiCard.type = STS.CardType.Skill;
        HoupiCard.color = STS.CardColor.Red;
        HoupiCard = __decorate([
            STS.CardDefine
        ], HoupiCard);
        return HoupiCard;
    }(STS.BaseCard));
    STS.HoupiCard = HoupiCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var JianyalichiCard = (function (_super) {
        __extends(JianyalichiCard, _super);
        function JianyalichiCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseDamage = 14;
            _this.upgradeDamage = 4;
            return _this;
        }
        JianyalichiCard.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.getBaseDamage(), this.owner, monster, STS.AttackEffect.SLASH_HEAVY)));
        };
        JianyalichiCard.prototype.canPlay = function (monster) {
            var v = _super.prototype.canPlay.call(this, monster);
            if (!v) {
                return v;
            }
            var hasOtherCard = false;
            this.owner.hand.forEach(function (c) {
                if (c.getInfo().type != STS.CardType.Attack) {
                    hasOtherCard = true;
                }
            });
            if (hasOtherCard) {
                return false;
            }
            return true;
        };
        JianyalichiCard.res = "jianyalichi";
        JianyalichiCard.cost = 0;
        JianyalichiCard.pool = 2;
        JianyalichiCard.classType = STS.ClassType.Werewolf;
        JianyalichiCard.rarity = STS.CardRarity.Common;
        JianyalichiCard.target = STS.CardTarget.Enemy;
        JianyalichiCard.type = STS.CardType.Attack;
        JianyalichiCard.color = STS.CardColor.Red;
        JianyalichiCard = __decorate([
            STS.CardDefine
        ], JianyalichiCard);
        return JianyalichiCard;
    }(STS.AttackCard));
    STS.JianyalichiCard = JianyalichiCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SilieCard = (function (_super) {
        __extends(SilieCard, _super);
        function SilieCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseDamage = 8;
            _this.baseMagicNumber = 2;
            _this.upgradeDamage = 2;
            _this.upgradeMagic = 1;
            return _this;
        }
        SilieCard.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.getBaseDamage(), this.owner, monster, STS.AttackEffect.SLASH_DIAGONAL)));
            this.getActionManager().addToBottom(new STS.AddPower(monster, STS.VulnerablePower, this.getMagic()));
        };
        SilieCard.res = "silie";
        SilieCard.cost = 2;
        SilieCard.pool = 1;
        SilieCard.classType = STS.ClassType.Werewolf;
        SilieCard.rarity = STS.CardRarity.Common;
        SilieCard.target = STS.CardTarget.Enemy;
        SilieCard.type = STS.CardType.Attack;
        SilieCard.color = STS.CardColor.Red;
        SilieCard = __decorate([
            STS.CardDefine
        ], SilieCard);
        return SilieCard;
    }(STS.AttackCard));
    STS.SilieCard = SilieCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TaoxinCard = (function (_super) {
        __extends(TaoxinCard, _super);
        function TaoxinCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseDamage = 9;
            _this.upgradeDamage = 1;
            _this.baseMagicNumber = 1;
            _this.upgradeMagic = 2;
            return _this;
        }
        TaoxinCard.prototype.use = function (monster) {
            var damageData = new STS.DamageData(this.getBaseDamage(), this.owner, monster, STS.AttackEffect.SLASH_HORIZONTAL);
            damageData.onDoDamage = this.onDoDamage.bind(this);
            this.getActionManager().addToBottom(new STS.Damage(damageData));
        };
        TaoxinCard.prototype.onDoDamage = function (blockDamage, hpDamage) {
            if (hpDamage > 0) {
                this.getActionManager().addToBottom(new STS.DrawCard(this.getMagic()));
            }
        };
        TaoxinCard.res = "taoxinzhuaji";
        TaoxinCard.cost = 1;
        TaoxinCard.pool = 1;
        TaoxinCard.classType = STS.ClassType.Werewolf;
        TaoxinCard.rarity = STS.CardRarity.Common;
        TaoxinCard.target = STS.CardTarget.Enemy;
        TaoxinCard.type = STS.CardType.Attack;
        TaoxinCard.color = STS.CardColor.Red;
        TaoxinCard.tags = [STS.CardTagName.Zhuaji];
        TaoxinCard = __decorate([
            STS.CardDefine
        ], TaoxinCard);
        return TaoxinCard;
    }(STS.AttackCard));
    STS.TaoxinCard = TaoxinCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var XiaochushangtongCard = (function (_super) {
        __extends(XiaochushangtongCard, _super);
        function XiaochushangtongCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseBlock = 7;
            _this.upgradeBlock = 2;
            return _this;
        }
        XiaochushangtongCard.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.ChooseHandCard(1, this.level == 0, this.onChooseCard.bind(this)));
        };
        XiaochushangtongCard.prototype.onChooseCard = function (cards) {
            for (var i = 0; i < cards.length; ++i) {
                this.getActionManager().addToTop(new STS.ExhaustCard(cards[i]));
            }
            this.getActionManager().addToTop(new STS.GainBlock(this.owner, this.getBaseBlock()));
        };
        XiaochushangtongCard.res = "xiaochushangtong";
        XiaochushangtongCard.cost = 1;
        XiaochushangtongCard.pool = 1;
        XiaochushangtongCard.classType = STS.ClassType.Werewolf;
        XiaochushangtongCard.rarity = STS.CardRarity.Common;
        XiaochushangtongCard.target = STS.CardTarget.Self;
        XiaochushangtongCard.type = STS.CardType.Skill;
        XiaochushangtongCard.color = STS.CardColor.Red;
        XiaochushangtongCard = __decorate([
            STS.CardDefine
        ], XiaochushangtongCard);
        return XiaochushangtongCard;
    }(STS.AttackCard));
    STS.XiaochushangtongCard = XiaochushangtongCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ZhuajiCard = (function (_super) {
        __extends(ZhuajiCard, _super);
        function ZhuajiCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseDamage = 6;
            _this.upgradeDamage = 3;
            return _this;
        }
        ZhuajiCard.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.getBaseDamage(), this.owner, monster, STS.AttackEffect.SLASH_DIAGONAL)));
        };
        ZhuajiCard.res = "jnzhuaji";
        ZhuajiCard.cost = 1;
        ZhuajiCard.pool = 0;
        ZhuajiCard.classType = STS.ClassType.Werewolf;
        ZhuajiCard.rarity = STS.CardRarity.Basic;
        ZhuajiCard.target = STS.CardTarget.Enemy;
        ZhuajiCard.type = STS.CardType.Attack;
        ZhuajiCard.color = STS.CardColor.Red;
        ZhuajiCard.tags = [STS.CardTagName.Zhuaji];
        ZhuajiCard = __decorate([
            STS.CardDefine
        ], ZhuajiCard);
        return ZhuajiCard;
    }(STS.AttackCard));
    STS.ZhuajiCard = ZhuajiCard;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var UnlockType;
    (function (UnlockType) {
        UnlockType[UnlockType["Card"] = 0] = "Card";
        UnlockType[UnlockType["Relic"] = 1] = "Relic";
        UnlockType[UnlockType["Charactor"] = 2] = "Charactor";
    })(UnlockType = STS.UnlockType || (STS.UnlockType = {}));
    var ResultType;
    (function (ResultType) {
        ResultType[ResultType["Success"] = 0] = "Success";
        ResultType[ResultType["Fail"] = 1] = "Fail";
    })(ResultType = STS.ResultType || (STS.ResultType = {}));
    var RoomType;
    (function (RoomType) {
        RoomType[RoomType["Boss"] = 0] = "Boss";
        RoomType[RoomType["Monster"] = 1] = "Monster";
        RoomType[RoomType["Rest"] = 2] = "Rest";
        RoomType[RoomType["Event"] = 3] = "Event";
        RoomType[RoomType["Elite"] = 4] = "Elite";
        RoomType[RoomType["Shop"] = 5] = "Shop";
        RoomType[RoomType["Treasure"] = 6] = "Treasure";
    })(RoomType = STS.RoomType || (STS.RoomType = {}));
    var RoomState;
    (function (RoomState) {
        RoomState[RoomState["COMBAT"] = 0] = "COMBAT";
        RoomState[RoomState["EVENT"] = 1] = "EVENT";
        RoomState[RoomState["COMPLETE"] = 2] = "COMPLETE";
        RoomState[RoomState["INCOMPLETE"] = 3] = "INCOMPLETE";
    })(RoomState = STS.RoomState || (STS.RoomState = {}));
    var BaseRoom = (function () {
        function BaseRoom() {
            this.finished = false;
        }
        BaseRoom.prototype.serialize = function () {
            return {
                type: this.type,
            };
        };
        BaseRoom.prototype.finish = function () {
            this.finished = true;
        };
        BaseRoom.prototype.getCurrentEventInfo = function () {
            return {
                type: STS.EventType.Error,
            };
        };
        BaseRoom.prototype.chooseOption = function (opid) {
            return {
                type: STS.ActionType.None,
            };
        };
        BaseRoom.prototype.removeCard = function (cardId) {
        };
        BaseRoom.prototype.chooseReward = function (rewardIdx, subIdx) {
            return {
                type: STS.ActionType.None,
            };
        };
        BaseRoom.prototype.onPlayerEnter = function (dungeon) {
            this.dungeon = dungeon;
            this.adventurer = dungeon.adventurer;
            return this.getCurrentEventInfo();
        };
        return BaseRoom;
    }());
    STS.BaseRoom = BaseRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function FirstFloorInfo() {
        return {
            chanceInfo: {
                shopRoomChance: 0.05,
                restRoomChance: 0.12,
                treasureRoomChance: 0,
                eventRoomChance: 0.22,
                eliteRoomChance: 0.08,
                smallChestChance: 50,
                mediumChestChance: 33,
                largeChestChance: 17,
                smallPotionChance: 90,
                mediumPotionChance: 10,
                largePotionChance: 0,
                commonRelicChance: 50,
                uncommonRelicChance: 33,
                rareRelicChance: 17,
                colorlessRareChance: 0.3,
                cardUpgradedChance: 0.0,
                shrineChance: 0.25,
            },
            weakMonsterGroups: {
                num: 3,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                    { group: STS.XiaochouGroup, weight: 2.0 },
                    { group: STS.SlimeGroup2, weight: 2.0 },
                ],
            },
            strongMonsterGroups: {
                num: 12,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                    { group: STS.XiaochouGroup, weight: 2.0 },
                    { group: STS.SlimeGroup2, weight: 2.0 },
                ],
            },
            eliteMonsterGroups: {
                num: 10,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                    { group: STS.XiaochouGroup, weight: 2.0 },
                    { group: STS.SlimeGroup2, weight: 2.0 },
                ],
            },
            bossMonsterGroups: [
                STS.JuhuabossGroup
            ],
            removeRelics: [],
            events: [
                STS.AbandonedCab,
                STS.AbandonedCab,
                STS.AbandonedCab,
                STS.AbandonedCab,
                STS.AbandonedCab,
            ],
            shrines: [
                STS.AbandonedCab,
                STS.AbandonedCab,
                STS.AbandonedCab,
                STS.AbandonedCab,
            ],
        };
    }
    STS.FirstFloorInfo = FirstFloorInfo;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function SecondFloorInfo() {
        return {
            chanceInfo: {
                shopRoomChance: 0.05,
                restRoomChance: 0.12,
                treasureRoomChance: 0,
                eventRoomChance: 0.22,
                eliteRoomChance: 0.08,
                smallChestChance: 50,
                mediumChestChance: 33,
                largeChestChance: 17,
                smallPotionChance: 90,
                mediumPotionChance: 10,
                largePotionChance: 0,
                commonRelicChance: 50,
                uncommonRelicChance: 33,
                rareRelicChance: 17,
                colorlessRareChance: 0.3,
                cardUpgradedChance: 0.0,
                shrineChance: 0.25,
            },
            weakMonsterGroups: {
                num: 3,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            strongMonsterGroups: {
                num: 12,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            eliteMonsterGroups: {
                num: 10,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            bossMonsterGroups: [
                STS.SlimeGroup
            ],
            removeRelics: [],
            events: [
                STS.Meal,
                STS.Breakfast,
                STS.Breakfast,
                STS.Breakfast,
                STS.Breakfast,
            ],
            shrines: [
                STS.Meal,
                STS.Meal,
                STS.Meal,
                STS.Meal,
            ],
        };
    }
    STS.SecondFloorInfo = SecondFloorInfo;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function ThirdFloorInfo() {
        return {
            chanceInfo: {
                shopRoomChance: 0.05,
                restRoomChance: 0.12,
                treasureRoomChance: 0,
                eventRoomChance: 0.22,
                eliteRoomChance: 0.08,
                smallChestChance: 50,
                mediumChestChance: 33,
                largeChestChance: 17,
                smallPotionChance: 90,
                mediumPotionChance: 10,
                largePotionChance: 0,
                commonRelicChance: 50,
                uncommonRelicChance: 33,
                rareRelicChance: 17,
                colorlessRareChance: 0.3,
                cardUpgradedChance: 0.0,
                shrineChance: 0.25,
            },
            weakMonsterGroups: {
                num: 3,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            strongMonsterGroups: {
                num: 12,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            eliteMonsterGroups: {
                num: 10,
                monsterGroups: [
                    { group: STS.SlimeGroup, weight: 2.0 },
                ],
            },
            bossMonsterGroups: [
                STS.SlimeGroup
            ],
            removeRelics: [],
            events: [
                STS.Meal,
                STS.Breakfast,
                STS.Breakfast,
                STS.Breakfast,
                STS.Breakfast,
            ],
            shrines: [
                STS.Meal,
                STS.Meal,
                STS.Meal,
                STS.Meal,
            ],
        };
    }
    STS.ThirdFloorInfo = ThirdFloorInfo;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AccountEventType;
    (function (AccountEventType) {
        AccountEventType["UnlockAcheivement"] = "Unlockacheivement";
    })(AccountEventType = STS.AccountEventType || (STS.AccountEventType = {}));
    var Account = (function (_super) {
        __extends(Account, _super);
        function Account(accountCollection) {
            var _this = _super.call(this) || this;
            _this.accountCollection = accountCollection;
            return _this;
        }
        Account.prototype.save = function () {
            if (!this.accountCollection) {
                return;
            }
            this.accountCollection.upsert(this.info.id, this.info);
        };
        Account.createAccountInfo = function (id, pwd) {
            return {
                id: id,
                pwd: pwd,
                localId: 1,
                lastGameType: STS.GameType.None,
                classInfos: {},
                games: {},
                settings: {},
                tutorials: [],
                achievements: [],
                seenCards: [],
                seenRelics: [],
                seenMonsters: [],
                lockedCards: [],
                lockedCharacters: [],
                lockedRelics: [],
            };
        };
        Account.prototype.init = function (accountInfo) {
            this.info = accountInfo;
        };
        Account.prototype.genLocalId = function () {
            return this.info.id + "$$" + this.info.localId++;
        };
        Account.prototype.hasOldGame = function () {
            var game = this.getCurrentGameInfo();
            if (game && !game.finished) {
                return true;
            }
            return false;
        };
        Account.prototype.clearCurrentGameInfo = function () {
            this.info.games[this.info.lastGameType] = null;
            this.info.lastGameType = STS.GameType.None;
        };
        Account.prototype.setCurrentGameInfo = function (gameInfo) {
            var gameType = gameInfo.gameType;
            this.info.lastGameType = gameType;
            this.info.games[gameType] = gameInfo;
        };
        Account.prototype.getCurrentGameInfo = function () {
            var lastGameType = this.info.lastGameType;
            if (lastGameType) {
                return this.info.games[lastGameType];
            }
            return null;
        };
        Account.prototype.isLockedRelic = function (relic) {
            if (this.info.lockedRelics.indexOf(relic.getName()) == -1) {
                return false;
            }
            return true;
        };
        Account.prototype.isLockedCard = function (cardClass) {
            if (this.info.lockedCards.indexOf(cardClass.getName()) == -1) {
                return false;
            }
            return true;
        };
        Account.prototype.isLockedCharactor = function (type) {
            if (this.info.lockedCharacters.indexOf(type) == -1) {
                return false;
            }
            return true;
        };
        Account.prototype.isSeenMonsterGroup = function (classMonsterGroup) {
            if (this.info.seenMonsters.indexOf(classMonsterGroup.getName()) == -1) {
                return false;
            }
            return true;
        };
        Account.prototype.isSeenRelic = function (relicId) {
            if (this.info.seenRelics.indexOf(relicId) == -1) {
                return false;
            }
            return true;
        };
        Account.prototype.isSeenCard = function (cardId) {
            if (this.info.seenCards.indexOf(cardId) == -1) {
                return false;
            }
            return true;
        };
        return Account;
    }(tbgame.Entity));
    STS.Account = Account;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AdventurerEventType;
    (function (AdventurerEventType) {
        AdventurerEventType["EnterRestRoom"] = "EnterRestRoom";
        AdventurerEventType["EnterBattle"] = "EnterBattle";
        AdventurerEventType["EnterStoryRoom"] = "EnterStoryRoom";
        AdventurerEventType["EnterShop"] = "EnterShop";
        AdventurerEventType["ChooseHandCard"] = "ChooseHandCard";
        AdventurerEventType["UsePotion"] = "UsePotion";
        AdventurerEventType["UseCard"] = "UseCard";
        AdventurerEventType["DrawCard"] = "DrawCard";
        AdventurerEventType["DiscardCard"] = "DiscardCard";
        AdventurerEventType["MoveCardFromHandToDiscardPile"] = "MoveCardFromHandToDiscardPile";
        AdventurerEventType["MoveCardFromHandToExhaustPile"] = "MoveCardFromHandToExhaustPile";
        AdventurerEventType["MakeCardInDiscardPile"] = "MakeCardInDiscardPile";
        AdventurerEventType["MakeCardInHand"] = "MakeCardInHand";
        AdventurerEventType["MakeCardInDrawPile"] = "MakeCardInDrawPile";
        AdventurerEventType["GainEnergy"] = "GainEnergy";
        AdventurerEventType["LoseEnergy"] = "LoseEnergy";
        AdventurerEventType["Shuffle"] = "Shuffle";
    })(AdventurerEventType = STS.AdventurerEventType || (STS.AdventurerEventType = {}));
    var Adventurer = (function (_super) {
        __extends(Adventurer, _super);
        function Adventurer(collection) {
            var _this = _super.call(this) || this;
            _this.collection = collection;
            _this.name = "player";
            return _this;
        }
        Adventurer.prototype.save = function () {
            if (!this.collection) {
                return;
            }
            this.collection.upsert(this.info.id, this.info);
        };
        Adventurer.prototype.serialize = function () {
            return this.info;
        };
        Adventurer.prototype.on = function (event, cb) {
            return _super.prototype.on.call(this, event, cb);
        };
        Adventurer.prototype.emit = function (event, p1, p2, p3, p4) {
            return _super.prototype.emit.call(this, event, p1, p2, p3, p4);
        };
        Adventurer.createAdventurerInfo = function (id, seed, classType, gameType) {
            var rng = new SeedRandom(seed);
            var seedDat = rng.serialize();
            var seedInfo = {
                monsterRng: seedDat,
                eventRng: seedDat,
                merchantRng: seedDat,
                cardRng: seedDat,
                treasureRng: seedDat,
                relicRng: seedDat,
                potionRng: seedDat,
            };
            var classData = STS.ClassLibrary[STS.ClassType.Werewolf];
            var adventureInfo = {
                id: id,
                localId: 1,
                ascensionLevel: 0,
                gameType: gameType,
                seed: seed,
                finished: false,
                createDate: new Date().getTime(),
                classType: classType,
                hp: classData.hp,
                maxhp: classData.hp,
                cardDraw: classData.cardDraw,
                energy: 3,
                floor: 0,
                gold: classData.gold,
                level: 0,
                walkedNode: {
                    "0": [],
                },
                cards: [],
                relics: [],
                potions: [],
                mapNodeInfo: null,
                seeds: seedInfo,
                purgeCost: 75,
            };
            for (var i = 0; i < classData.cards.length; ++i) {
                var card = classData.cards[i];
                adventureInfo.localId++;
                adventureInfo.cards.push({
                    name: card.getName(),
                    id: adventureInfo.localId.toString(),
                    level: 0,
                });
            }
            if (classData.relic) {
                adventureInfo.localId++;
                adventureInfo.relics.push({
                    name: classData.relic.getName(),
                    id: adventureInfo.localId.toString(),
                    counter: 0,
                });
            }
            return adventureInfo;
        };
        Object.defineProperty(Adventurer.prototype, "res", {
            get: function () {
                return STS.ClassLibrary[this.info.classType].res;
            },
            enumerable: true,
            configurable: true
        });
        Adventurer.prototype.genLocalId = function () {
            this.info.localId++;
            return this.info.localId.toString();
        };
        Adventurer.prototype.initWithInfo = function (adventurerInfo) {
            this.info = adventurerInfo;
            this.initSeeds();
            this.hp = this.info.hp;
            this.maxhp = this.info.maxhp;
            this.gold = this.info.gold;
            this.cards = new STS.CardGroup(this);
            this.relics = new STS.RelicGroup(this);
            this.potions = new STS.PotionGroup(this);
            this.cards.initWithCardInfos(adventurerInfo.cards);
            this.relics.initWithRelicInfos(adventurerInfo.relics);
            this.potions.initWithPotionInfos(adventurerInfo.potions);
        };
        Adventurer.prototype.initBattle = function (battle) {
            _super.prototype.initBattle.call(this, battle);
            this.hand = new STS.CardGroup(this);
            this.drawPile = new STS.CardGroup(this);
            this.exhautPile = new STS.CardGroup(this);
            this.discardPile = new STS.CardGroup(this);
            this.cardPlayedThisTurn = new STS.CardGroup(this);
            this.relics.initBattle(battle);
            this.potions.initBattle(battle);
            this.hand.initBattle(battle);
            this.drawPile.initBattle(battle);
            this.exhautPile.initBattle(battle);
            this.discardPile.initBattle(battle);
            this.cardPlayedThisTurn.initBattle(battle);
            this.drawPile.initWithCardInfos(this.info.cards);
            this.drawPile.shuffle(this.shuffleRng);
            this.energy = 0;
            this.maxEnergy = this.info.energy;
            this.turnCardDrawNum = this.info.cardDraw;
            this.noDiscardOnEndTurn = false;
            this.noPowerLoseOnEndTurn = false;
            this.noBlockLoseOnStartTurn = false;
            this.potionInUse = [];
        };
        Adventurer.prototype.clearBattle = function () {
            this.hand.forEach(function (p) { return p.onDestroy(); });
            this.drawPile.forEach(function (p) { return p.onDestroy(); });
            this.exhautPile.forEach(function (p) { return p.onDestroy(); });
            this.discardPile.forEach(function (p) { return p.onDestroy(); });
            this.hand = null;
            this.drawPile = null;
            this.exhautPile = null;
            this.discardPile = null;
        };
        Adventurer.prototype.hasOldDungeon = function () {
            return this.info.normalMonsters && this.info.normalMonsters.length > 0;
        };
        Adventurer.prototype.indexOfMapNodeWaled = function (pos) {
            var walked = this.info.walkedNode[this.info.floor];
            if (!walked) {
                log.e("当前地图得walkedNode未被初始化", this.info.floor);
                return -1;
            }
            for (var i = 0; i < walked.length; ++i) {
                var node = walked[i];
                if (node.x == pos.x && node.y == pos.y) {
                    return i;
                }
            }
            return -1;
        };
        Adventurer.prototype.isMapNodeWalked = function (pos) {
            return this.indexOfMapNodeWaled(pos) != -1;
        };
        Adventurer.prototype.getMapNodeInfo = function (x, y) {
            return this.mapInfo.nodes[y][x];
        };
        Adventurer.prototype.hasLineTo = function (from, to) {
            var lines = from.lines;
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if (line.dstX == to.x && line.dstY == to.y) {
                    return true;
                }
            }
            return false;
        };
        Adventurer.prototype.isAvailableMapNode = function (mapNodeInfo) {
            var walked = this.info.walkedNode[this.info.floor];
            if (!walked) {
                log.e("当前地图得walkedNode未被初始化", this.info.floor);
                return -1;
            }
            if (walked.length == 0) {
                if (mapNodeInfo.y == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            var lastNode = walked[walked.length - 1];
            if (this.hasLineTo(this.getMapNodeInfo(lastNode.x, lastNode.y), mapNodeInfo)) {
                return true;
            }
            return false;
        };
        Adventurer.prototype.getNextWalkedMapNode = function (pos) {
            var idx = this.indexOfMapNodeWaled(pos);
            if (idx == -1) {
                log.e("找下一个走过的节点时当前节点未找到");
                return null;
            }
            var walked = this.info.walkedNode[this.info.floor];
            if (idx + 1 >= walked.length) {
                return null;
            }
            return walked[idx + 1];
        };
        Adventurer.prototype.initSeeds = function () {
            var seeds = this.info.seeds;
            if (!seeds) {
                log.e("Adventurer在init时，必须有seeds");
                return;
            }
            this.monsterRng = new SeedRandom(seeds.monsterRng);
            this.eventRng = new SeedRandom(seeds.eventRng);
            this.merchantRng = new SeedRandom(seeds.merchantRng);
            this.cardRng = new SeedRandom(seeds.cardRng);
            this.treasureRng = new SeedRandom(seeds.treasureRng);
            this.relicRng = new SeedRandom(seeds.relicRng);
            this.potionRng = new SeedRandom(seeds.potionRng);
        };
        Adventurer.prototype.nextRoom = function (x, y, eventInfo) {
            var info = this.info;
            info.walkedNode[info.floor].push({ x: x, y: y });
            info.level++;
            info.mapNodeInfo = {
                x: x,
                y: y,
                eventInfo: eventInfo,
            };
            this.save();
        };
        Adventurer.prototype.hasCard = function (id) {
            for (var i = 0; i < this.info.cards.length; ++i) {
                if (this.info.cards[i].id == id) {
                    return true;
                }
            }
            return false;
        };
        Adventurer.prototype.addCard = function (id, name, level) {
            var card = STS.BaseCard.create(id, name, level);
            this.cards.addToBottom(card);
            if (!this.hasCard(id)) {
                this.info.cards.push(card.serialize());
            }
            return card;
        };
        Adventurer.prototype.removeCard = function (id) {
            for (var i = 0; i < this.info.cards.length; ++i) {
                if (this.info.cards[i].id == id) {
                    this.info.cards.splice(i, 1);
                }
            }
            this.cards.removeByCondition(function (item) { return item.id == id; });
        };
        Adventurer.prototype.hasRelic = function (id) {
            for (var i = 0; i < this.info.relics.length; ++i) {
                if (this.info.relics[i].id == id) {
                    return true;
                }
            }
            return false;
        };
        Adventurer.prototype.addRelic = function (id, name, counter) {
            var relic = STS.BaseRelic.create(id, name, counter);
            this.relics.addToBottom(relic);
            if (!this.hasRelic(id)) {
                this.info.relics.push(relic.serialize());
            }
            return relic;
        };
        Adventurer.prototype.hasPotion = function (id) {
            for (var i = 0; i < this.info.potions.length; ++i) {
                if (this.info.potions[i].id == id) {
                    return true;
                }
            }
            return false;
        };
        Adventurer.prototype.addPotion = function (id, name) {
            var potion = STS.BasePotion.create(id, name);
            this.potions.addToBottom(potion);
            if (!this.hasRelic(id)) {
                this.info.potions.push(potion.serialize());
            }
            return potion;
        };
        Adventurer.prototype.onStartCombat = function () {
            this.drawPile.onStartCombat();
            this.relics.onStartCombat();
        };
        Adventurer.prototype.onEndCombat = function (type) {
            this.drawPile.onEndCombat(type);
            this.relics.onEndCombat(type);
        };
        Adventurer.prototype.onStartTurn = function () {
            this.cardPlayedThisTurn.clear();
            if (this.noBlockLoseOnStartTurn) {
                this.noBlockLoseOnStartTurn = false;
            }
            else {
                if (this.block > 0) {
                    this.battle.actionManager.addToBottom(new STS.LoseBlock(this, this.block));
                }
            }
            this.battle.actionManager.addToBottom(new STS.DrawCard(this.turnCardDrawNum));
            this.battle.actionManager.addToBottom(new STS.GainEnergy(this.maxEnergy + this.energy));
        };
        Adventurer.prototype.onEndTurn = function () {
            this.hand.onEndTurn();
            if (this.noDiscardOnEndTurn) {
                this.noDiscardOnEndTurn = false;
            }
            else {
                this.battle.actionManager.addToBottom(new STS.DiscardCardEndTurn());
            }
            if (this.noPowerLoseOnEndTurn) {
                this.noPowerLoseOnEndTurn = false;
            }
            else {
                this.battle.actionManager.addToBottom(new STS.LoseEnergy(this.energy));
            }
        };
        Adventurer.prototype.onClearActions = function () {
            this.potionInUse = [];
        };
        Adventurer.prototype.opPlayCard = function (card, monster) {
            var m = monster;
            if (this.battle.actionManager.isInCardQueue(card)) {
                return false;
            }
            if (!card.canPlay(m)) {
                return false;
            }
            this.battle.actionManager.cardQueue.push({
                card: card,
                monster: m,
                energyOnUse: this.energy,
            });
            return true;
        };
        Adventurer.prototype.opUsePotion = function (potion, monster) {
            var m = monster;
            for (var i = 0; i < this.potionInUse.length; ++i) {
                if (this.potionInUse[i] == potion) {
                    return false;
                }
            }
            this.potionInUse.push(potion);
            this.battle.actionManager.addToTop(new STS.UsePotion(potion, m));
            return true;
        };
        Adventurer.prototype.opEndTurn = function () {
            if (this.battle.actionManager.isInAction()) {
                return false;
            }
            this.battle.actionManager.addToBottom(new STS.TurnEnd());
            return true;
        };
        Adventurer.prototype.heal = function (v) {
            _super.prototype.heal.call(this, v);
            this.info.hp = this.hp;
        };
        Adventurer.prototype.tookDamage = function (info) {
            var hpDamage = _super.prototype.tookDamage.call(this, info);
            this.info.hp = this.hp;
            return hpDamage;
        };
        Adventurer.prototype.getHp = function () {
            return this.info.hp;
        };
        Adventurer.prototype.getEnergy = function () {
            return this.energy;
        };
        Adventurer.prototype.getGold = function () {
            return this.info.gold;
        };
        Adventurer.prototype.getMaxHp = function () {
            return this.info.maxhp;
        };
        Adventurer.prototype.addMaxHp = function (v) {
            _super.prototype.addMaxHp.call(this, v);
            this.info.maxhp = this.maxhp;
        };
        Adventurer.prototype.subMaxHp = function (v) {
            _super.prototype.subMaxHp.call(this, v);
            this.info.maxhp = this.maxhp;
        };
        Adventurer.prototype.addGold = function (v) {
            _super.prototype.addGold.call(this, v);
            this.info.gold = this.gold;
        };
        Adventurer.prototype.subGold = function (v) {
            _super.prototype.subGold.call(this, v);
            this.info.gold = this.gold;
        };
        Adventurer.prototype.draw = function () {
            var card = this.drawPile.getAndRemoveTop();
            card.onDraw();
            this.hand.addToBottom(card);
            this.emit(AdventurerEventType.DrawCard, card);
            card.emit(STS.CardEventType.Draw);
        };
        Adventurer.prototype.shuffle = function () {
            this.discardPile.moveTo(this.drawPile);
            this.emit(AdventurerEventType.Shuffle);
        };
        Adventurer.prototype.useCard = function (card, monster, energeOnUse) {
            this.cardPlayedThisTurn.addToBottom(card);
            this.emit(AdventurerEventType.UseCard, card, monster, energeOnUse);
            card.use(monster);
            this.loseEnergy(card.getInfo().cost);
            this.hand.remove(card);
            this.battle.actionManager.addToBottom(new STS.UseCard(card, monster));
        };
        Adventurer.prototype.usePotion = function (potion, monster) {
            this.emit(AdventurerEventType.UsePotion, potion, monster);
            potion.use(monster);
            this.potions.remove(potion);
            util.removeFromArray(this.potionInUse, potion);
        };
        Adventurer.prototype.getCardNumByTag = function (tag) {
            var v = 0;
            v += this.hand.getCardTagNum(tag);
            v += this.drawPile.getCardTagNum(tag);
            v += this.discardPile.getCardTagNum(tag);
            v += this.exhautPile.getCardTagNum(tag);
            return v;
        };
        Adventurer.prototype.makeCardInDiscardPile = function (cardType, level) {
            var card = this.discardPile.createCardAtBottom(cardType, level);
            this.emit(AdventurerEventType.MakeCardInDiscardPile, card);
            card.emit(STS.CardEventType.MakeCardInDiscardPile);
        };
        Adventurer.prototype.makeCardInHand = function (cardType, level) {
            var card = this.discardPile.createCardAtBottom(cardType, level);
            this.emit(AdventurerEventType.MakeCardInHand, card);
            card.emit(STS.CardEventType.MakeCardInHand);
        };
        Adventurer.prototype.makeCardInDrawPile = function (cardType, level) {
            var card = this.discardPile.createCardAtBottom(cardType, level);
            this.emit(AdventurerEventType.MakeCardInDrawPile, card);
            card.emit(STS.CardEventType.MakeCardInDrawPile);
        };
        Adventurer.prototype.moveCardFromHandToDiscardPile = function (card) {
            this.hand.remove(card);
            this.discardPile.addToBottom(card);
            this.emit(AdventurerEventType.MoveCardFromHandToDiscardPile, card);
            card.emit(STS.CardEventType.MoveFromHandToDiscardPile);
        };
        Adventurer.prototype.moveCardFromHandToExhaustPile = function (card) {
            this.hand.remove(card);
            this.exhautPile.addToBottom(card);
            this.emit(AdventurerEventType.MoveCardFromHandToExhaustPile, card);
            card.emit(STS.CardEventType.MoveFromHandToExhaustPile);
        };
        Adventurer.prototype.gainEnergy = function (energy) {
            var old = this.energy;
            this.energy += energy;
            if (this.energy > STS.Settings.MaxEnergy) {
                this.energy = STS.Settings.MaxEnergy;
            }
            this.emit(AdventurerEventType.GainEnergy, energy, old);
        };
        Adventurer.prototype.loseEnergy = function (energy) {
            var old = this.energy;
            this.energy -= energy;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.emit(AdventurerEventType.LoseEnergy, energy, old);
        };
        return Adventurer;
    }(STS.Creature));
    STS.Adventurer = Adventurer;
})(STS || (STS = {}));
var STS;
(function (STS) {
    addGlobal("STS", STS);
    var RetCode;
    (function (RetCode) {
        RetCode[RetCode["OK"] = 0] = "OK";
        RetCode[RetCode["INVALID_CLASSTYPE"] = 1] = "INVALID_CLASSTYPE";
        RetCode[RetCode["DUPLICATE_NAME"] = 2] = "DUPLICATE_NAME";
        RetCode[RetCode["SYS_ERROR"] = 3] = "SYS_ERROR";
        RetCode[RetCode["ID_FORMAT_ERROR"] = 4] = "ID_FORMAT_ERROR";
        RetCode[RetCode["NAME_OR_PWD_ERROR"] = 5] = "NAME_OR_PWD_ERROR";
        RetCode[RetCode["NOT_FOUND_DATA"] = 6] = "NOT_FOUND_DATA";
    })(RetCode = STS.RetCode || (STS.RetCode = {}));
    var SystemSettingType;
    (function (SystemSettingType) {
        SystemSettingType["FastBattle"] = "FastBattle";
        SystemSettingType["Music"] = "Music";
        SystemSettingType["Sound"] = "Sound";
    })(SystemSettingType = STS.SystemSettingType || (STS.SystemSettingType = {}));
    var idChecker = /[^a-zA-Z0-9_]/im;
    var RewardType;
    (function (RewardType) {
        RewardType[RewardType["Gold"] = 0] = "Gold";
        RewardType[RewardType["Card"] = 1] = "Card";
        RewardType[RewardType["Relic"] = 2] = "Relic";
        RewardType[RewardType["Potion"] = 3] = "Potion";
    })(RewardType = STS.RewardType || (STS.RewardType = {}));
    var BlackBox = (function (_super) {
        __extends(BlackBox, _super);
        function BlackBox(db) {
            var _this = _super.call(this) || this;
            _this.db = db;
            _this.localCollection = db.getCollection("local");
            _this.gameCollection = db.getCollection("gameInfo");
            _this.accountCollection = db.getCollection("account");
            _this.dungeonInfoCollection = db.getCollection("dungeonInfo");
            _this.adventurerInfoCollection = db.getCollection("adventureInfo");
            return _this;
        }
        BlackBox.prototype.register = function (id, pwd) {
            return __awaiter(this, void 0, void 0, function () {
                var accountInfo, ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (idChecker.test(id)) {
                                return [2, RetCode.ID_FORMAT_ERROR];
                            }
                            return [4, this.accountCollection.find(id)];
                        case 1:
                            accountInfo = _a.sent();
                            if (accountInfo) {
                                log.i("注册失败,账号" + id + "已经存在");
                                return [2, RetCode.DUPLICATE_NAME];
                            }
                            return [4, this.accountCollection.insert(id, STS.Account.createAccountInfo(id, pwd))];
                        case 2:
                            ret = _a.sent();
                            if (ret != tbgame.DARetCode.OK) {
                                log.i("注册系统错误 code:" + ret);
                                return [2, RetCode.SYS_ERROR];
                            }
                            log.i("新账号" + id + "注册成功");
                            return [2, RetCode.OK];
                    }
                });
            });
        };
        BlackBox.prototype.login = function (id, pwd) {
            return __awaiter(this, void 0, void 0, function () {
                var accountInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.accountCollection.find(id)];
                        case 1:
                            accountInfo = _a.sent();
                            if (!accountInfo || accountInfo.pwd !== pwd) {
                                log.i("登录账号或密码错误");
                                return [2, null];
                            }
                            log.i("账号" + id + "登录成功");
                            this.account = new STS.Account(this.accountCollection);
                            this.account.init(accountInfo);
                            return [2, this.account];
                    }
                });
            });
        };
        BlackBox.prototype.getAccount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var localAccount, _a, id, pwd, accountInfo;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!this.account) return [3, 8];
                            return [4, this.localCollection.find("account")];
                        case 1:
                            localAccount = _b.sent();
                            if (!!localAccount) return [3, 3];
                            localAccount = {
                                id: "1",
                                pwd: "1",
                            };
                            _a = tbgame.DARetCode.OK;
                            return [4, this.localCollection.insert("account", localAccount)];
                        case 2:
                            if (_a != (_b.sent())) {
                                log.e("本地账号生成失败 id:" + localAccount.id + " pwd:" + localAccount.pwd);
                                return [2];
                            }
                            _b.label = 3;
                        case 3:
                            id = localAccount.id;
                            pwd = localAccount.pwd;
                            return [4, this.accountCollection.find(id)];
                        case 4:
                            accountInfo = _b.sent();
                            if (!!accountInfo) return [3, 6];
                            return [4, this.register(id, pwd)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: return [4, this.login(id, pwd)];
                        case 7: return [2, _b.sent()];
                        case 8: return [2, this.account];
                    }
                });
            });
        };
        BlackBox.prototype.changeSetting = function (type, v) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.account.info.settings[type] = v;
                    return [2];
                });
            });
        };
        BlackBox.prototype.getAdventurerInfo = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var adventurerInfo;
                return __generator(this, function (_a) {
                    adventurerInfo = this.adventurerInfoCollection.find(id);
                    if (!adventurerInfo) {
                        log.i("没找到id对应的冒险者信息", id);
                        return [2, null];
                    }
                    return [2, adventurerInfo];
                });
            });
        };
        BlackBox.prototype.getCurrentAdventurerInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.adventurer) {
                        log.e("无法获得冒险者信息，信息未被初始化");
                        return [2, null];
                    }
                    return [2, this.adventurer.info];
                });
            });
        };
        BlackBox.prototype.getCurrentAdventurer = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.adventurer) {
                        log.e("无法获得冒险者信息，信息未被初始化");
                        return [2, null];
                    }
                    return [2, this.adventurer];
                });
            });
        };
        BlackBox.prototype.startNewGame = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var seed, adventurerInfo, gameInfo;
                return __generator(this, function (_a) {
                    seed = util.genRandomId(6);
                    log.i("新游戏种子" + seed);
                    adventurerInfo = STS.Adventurer.createAdventurerInfo(this.account.genLocalId(), seed, this.getClassTypeBySettings(settings), settings.gameType);
                    gameInfo = {
                        seed: seed,
                        gameType: settings.gameType,
                        id: this.account.genLocalId(),
                        finished: false,
                        adventureId: adventurerInfo.id,
                        createDate: new Date().getTime(),
                    };
                    this.account.setCurrentGameInfo(gameInfo);
                    this.adventurer = new STS.Adventurer(this.adventurerInfoCollection);
                    this.adventurer.initWithInfo(adventurerInfo);
                    this.dungeon = new STS.Dungeon();
                    this.dungeon.init(seed, this.account, this.adventurer);
                    this.adventurer.save();
                    this.account.save();
                    return [2, RetCode.OK];
                });
            });
        };
        BlackBox.prototype.continueGame = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var gameInfo, adventurerInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            gameInfo = this.account.info.games[type];
                            if (!gameInfo) {
                                log.e("无游戏信息，不能继续游戏");
                                if (this.account.info.lastGameType == type) {
                                    this.account.clearCurrentGameInfo();
                                    this.account.save();
                                }
                                return [2, RetCode.NOT_FOUND_DATA];
                            }
                            return [4, this.getAdventurerInfo(gameInfo.adventureId)];
                        case 1:
                            adventurerInfo = _a.sent();
                            if (!adventurerInfo) {
                                log.e("角色信息未找到");
                                this.account.clearCurrentGameInfo();
                                this.account.save();
                                return [2, RetCode.NOT_FOUND_DATA];
                            }
                            this.adventurer = new STS.Adventurer(this.adventurerInfoCollection);
                            this.adventurer.initWithInfo(adventurerInfo);
                            this.dungeon = new STS.Dungeon();
                            this.dungeon.init(gameInfo.seed, this.account, this.adventurer);
                            return [2, RetCode.OK];
                    }
                });
            });
        };
        BlackBox.prototype.setMonsterName = function (monsterName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    STS.Settings.TestMonsterName = monsterName;
                    return [2];
                });
            });
        };
        BlackBox.prototype.getMapInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.getMapInfo()];
                });
            });
        };
        BlackBox.prototype.getReward = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rewards, ret;
                return __generator(this, function (_a) {
                    rewards = [
                        { type: RewardType.Gold, gold: 39 },
                        { type: RewardType.Card, cards: [
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 0,
                                },
                                {
                                    name: STS.SilieCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                            ] },
                        { type: RewardType.Card, cards: [
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 0,
                                },
                                {
                                    name: STS.SilieCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                            ] },
                        { type: RewardType.Relic, relic: STS.BurningBlood.getName(), recieved: true },
                        { type: RewardType.Relic, relic: STS.BurningBlood.getName() },
                    ];
                    ret = {
                        type: STS.ActionType.ViewReward,
                        rewards: rewards,
                    };
                    return [2, ret];
                });
            });
        };
        BlackBox.prototype.abandonGame = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.account.info.games[type]) {
                        if (this.account.info.lastGameType == type) {
                            this.account.info.lastGameType = STS.GameType.None;
                        }
                        this.account.info.games[type].finished = true;
                        this.account.save();
                        return [2, true];
                    }
                    return [2, false];
                });
            });
        };
        BlackBox.prototype.enterMapNode = function (x, y) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.enterRoom(x, y)];
                });
            });
        };
        BlackBox.prototype.getCurrentEventInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.room.getCurrentEventInfo()];
                });
            });
        };
        BlackBox.prototype.enterTestRoom = function (roomType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.enterTestRoom(roomType)];
                });
            });
        };
        BlackBox.prototype.removeCard = function (cardId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.removeCard(cardId)];
                });
            });
        };
        BlackBox.prototype.chooseOption = function (opid) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.chooseOption(opid)];
                });
            });
        };
        BlackBox.prototype.getLastGameInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var unlocked, res;
                return __generator(this, function (_a) {
                    unlocked = [
                        {
                            type: STS.UnlockType.Card,
                            name: STS.ZhuajiCard.getName(),
                        },
                        {
                            type: STS.UnlockType.Card,
                            name: STS.ZhuajiCard.getName(),
                        },
                        {
                            type: STS.UnlockType.Card,
                            name: STS.ZhuajiCard.getName(),
                        },
                    ];
                    res = {
                        type: STS.ResultType.Success,
                        levelups: [
                            {
                                fromExp: 10,
                                toExp: 100,
                                maxExp: 100,
                                unlocked: unlocked,
                            },
                            {
                                fromExp: 0,
                                toExp: 100,
                                maxExp: 600,
                                unlocked: [],
                            },
                        ],
                        locks: 7,
                        scores: [
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                            {
                                name: "NormalMonster",
                                count: 2,
                                score: 20,
                            },
                        ]
                    };
                    return [2, res];
                });
            });
        };
        BlackBox.prototype.chooseReward = function (rewardIdx, subIdx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.dungeon) {
                        log.e("地下城未初始化");
                        return [2];
                    }
                    return [2, this.dungeon.chooseReward(rewardIdx, subIdx)];
                });
            });
        };
        BlackBox.prototype.chooseOptions = function (selections) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        BlackBox.prototype.readyEvent = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        BlackBox.prototype.useCard = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        BlackBox.prototype.finishTurn = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2];
                });
            });
        };
        BlackBox.prototype.getClassTypeBySettings = function (settings) {
            if (settings.gameType === STS.GameType.Normal) {
                return settings.classType;
            }
            else if (settings.gameType === STS.GameType.Daily) {
                return STS.ClassType.Werewolf;
            }
            else {
                log.e("没有职业信息");
                return STS.ClassType.Werewolf;
            }
        };
        return BlackBox;
    }(tbgame.BlackBox));
    STS.BlackBox = BlackBox;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Dungeon = (function (_super) {
        __extends(Dungeon, _super);
        function Dungeon() {
            return _super.call(this) || this;
        }
        Dungeon.prototype.toString = function () {
            return this.map.toString();
        };
        Dungeon.createTest = function (seed, cb) {
            var box = new STS.BlackBox(new tbgame.MemoryStorageDataAdapter());
            box.getAccount().then(function (account) {
                var dungeon = new STS.Dungeon();
                var adventurerInfo = STS.Adventurer.createAdventurerInfo(account.genLocalId(), seed, STS.ClassType.Werewolf, STS.GameType.Normal);
                var adventurer = new STS.Adventurer();
                adventurer.initWithInfo(adventurerInfo);
                dungeon.init(seed, account, adventurer);
                cb(dungeon);
            });
        };
        Dungeon.createAndEnterTestRoom = function (roomType, cb) {
            this.createTest("1", function (dungeon) {
                var info = dungeon.enterTestRoom(roomType);
                cb(info);
            });
        };
        Dungeon.prototype.init = function (seed, account, adventurer) {
            this.seed = seed;
            this.account = account;
            this.adventurer = adventurer;
            this.initFloorInfo();
            this.initSeeds();
            if (adventurer.hasOldDungeon()) {
                this.initFromAdventurer();
            }
            else {
                this.initNew();
            }
            this.initShrines();
            this.initCardPools([1, 2]);
            this.generateMap();
            adventurer.mapInfo = this.map.serialize();
        };
        Dungeon.prototype.initNew = function () {
            this.generateMonsters();
            this.initBoss();
            this.initEvents();
            if (this.adventurer.info.floor == 0) {
                this.initRelics();
                this.initSpecialOneTimeEvents();
            }
            if (this.floorInfo.removeRelics) {
                this.removeRelics(this.floorInfo.removeRelics);
            }
        };
        Dungeon.prototype.initFromAdventurer = function () {
            var info = this.adventurer.info;
            this.normalMonsters = info.normalMonsters;
            this.eliteMonsters = info.eliteMonsters;
            this.boss = info.boss;
            this.commonRelics = info.commonRelics;
            this.uncommonRelics = info.uncommonRelics;
            this.rareRelics = info.rareRelics;
            this.shopRelics = info.shopRelics;
            this.bossRelics = info.bossRelics;
            this.events = info.events;
            this.specialOneTimeEvents = info.specialOneTimeEvents;
        };
        Dungeon.prototype.populateCardsToArray = function (dst, cards) {
            if (!cards) {
                return;
            }
            var account = this.account;
            for (var k in cards) {
                var card = cards[k];
                if (card.notInPool) {
                    continue;
                }
                if (account.isLockedCard(card)) {
                    continue;
                }
                dst.push(card);
            }
        };
        Dungeon.prototype.populateClassCards = function (pools) {
            var tmp = [];
            this.populateCardsToArray(tmp, STS.CardClassLibrary[this.adventurer.info.classType]);
            for (var i = 0; i < pools.length; ++i) {
                var pool = pools[i];
                for (var j = 0; j < tmp.length; ++j) {
                    var card = tmp[j];
                    if (card.pool !== pool) {
                        continue;
                    }
                    switch (card.rarity) {
                        case STS.CardRarity.Common: {
                            this.commonCards.push(card);
                            continue;
                        }
                        case STS.CardRarity.Uncommon: {
                            this.uncommonCards.push(card);
                            continue;
                        }
                        case STS.CardRarity.Rare: {
                            this.rareCards.push(card);
                            continue;
                        }
                        case STS.CardRarity.Curse: {
                            this.curseCards.push(card);
                            continue;
                        }
                        case STS.CardRarity.Basic: {
                            continue;
                        }
                        default: {
                            log.e("没有此稀有度卡牌的处理方式" + card.getName() + " " + card.rarity);
                            continue;
                        }
                    }
                }
            }
        };
        Dungeon.prototype.initCardPools = function (pools) {
            this.commonCards = [];
            this.uncommonCards = [];
            this.rareCards = [];
            this.colorlessCards = [];
            this.curseCards = [];
            this.populateClassCards(pools);
            this.populateCardsToArray(this.colorlessCards, STS.CardColorLibrary[STS.CardColor.Colorless]);
            this.populateCardsToArray(this.curseCards, STS.CardColorLibrary[STS.CardColor.Curse]);
        };
        Dungeon.prototype.populateFirstMonster = function (dst, weights, exclusive) {
            var monsterRng = this.adventurer.monsterRng;
            var exclusions = [];
            if (dst.length == 0) {
                log.e("Dungeon要添加的列表无数据时，不能用exclusive属性");
            }
            else {
                var lastMonster = dst[dst.length - 1];
                if (exclusive[lastMonster]) {
                    util.addArrayToArray(exclusive[lastMonster], exclusions);
                }
            }
            var monsterGroup = STS.RandomMonsterGroupByWeights(monsterRng, weights);
            while (exclusions.indexOf(monsterGroup) != -1) {
                monsterGroup = STS.RandomMonsterGroupByWeights(monsterRng, weights);
            }
            dst.push(monsterGroup.getName());
        };
        Dungeon.prototype.populateToArray = function (dst, monsterWeights, diff) {
            var weights = STS.normalizeMonsterGroupWeights(monsterWeights.monsterGroups);
            var monsterRng = this.adventurer.monsterRng;
            if (monsterWeights.exclusive) {
                this.populateFirstMonster(dst, weights, monsterWeights.exclusive);
            }
            var num = monsterWeights.num;
            for (var i = 0; i < num; ++i) {
                if (dst.length == 0) {
                    dst.push(STS.RandomMonsterGroupByWeights(monsterRng, weights).getName());
                }
                else {
                    var monster = STS.RandomMonsterGroupByWeights(monsterRng, weights).getName();
                    if (!monster) {
                        log.e("没有怪物");
                        return;
                    }
                    if (dst.indexOf(monster, dst.length - diff) != -1 && weights.length > diff) {
                        --i;
                    }
                    else {
                        dst.push(monster);
                    }
                }
            }
        };
        Dungeon.prototype.generateMonsters = function () {
            this.normalMonsters = [];
            this.eliteMonsters = [];
            var floorInfo = this.floorInfo;
            this.populateToArray(this.normalMonsters, floorInfo.weakMonsterGroups, 2);
            this.populateToArray(this.normalMonsters, floorInfo.strongMonsterGroups, 2);
            this.populateToArray(this.eliteMonsters, floorInfo.eliteMonsterGroups, 1);
        };
        Dungeon.prototype.initBoss = function () {
            var monsters = this.floorInfo.bossMonsterGroups;
            var account = this.account;
            var validMonsters = [];
            for (var i = 0; i < monsters.length; ++i) {
                var monster = monsters[i];
                if (!account.isSeenMonsterGroup(monster)) {
                    this.boss = monster.getName();
                    return;
                }
                validMonsters.push(this.boss);
            }
            this.boss = this.adventurer.monsterRng.array(validMonsters);
        };
        Dungeon.prototype.initEvents = function () {
            this.events = [];
            for (var i = 0; i < this.floorInfo.events.length; ++i) {
                this.events.push(this.floorInfo.events[i].getName());
            }
        };
        Dungeon.prototype.initSeeds = function () {
            var info = this.adventurer.info;
            var seed = this.seed;
            this.mapRng = new SeedRandom(seed + info.floor * 100);
            var level = this.adventurer.info.level;
            this.adventurer.monsterHpRng = new SeedRandom(seed + level);
            this.adventurer.aiRng = new SeedRandom(seed + level);
            this.adventurer.shuffleRng = new SeedRandom(seed + level);
            this.adventurer.cardRandomRng = new SeedRandom(seed + level);
            this.adventurer.miscRng = new SeedRandom(seed + level);
        };
        Dungeon.prototype.initRelicPoolWithRarity = function (pool, rarity) {
            var classRelics = STS.RelicClassRarityMap[this.adventurer.info.classType];
            if (!classRelics) {
                log.e("职业是" + this.adventurer.info.classType + "稀有度是" + rarity + "的遗物不存在职业上");
                return;
            }
            var relics = classRelics[rarity];
            if (!relics) {
                log.e("职业是" + this.adventurer.info.classType + "时没有稀有度是" + rarity + "的遗物");
                return;
            }
            var relic;
            for (var i = 0; i < relics.length; ++i) {
                var relic_1 = relics[i];
                if (this.account.isLockedRelic(relic_1)) {
                    continue;
                }
                pool.push(relic_1.getName());
            }
            util.shuffleArray(pool, this.adventurer.relicRng.quick());
        };
        Dungeon.prototype.initRelics = function () {
            this.commonRelics = [];
            this.uncommonRelics = [];
            this.rareRelics = [];
            this.shopRelics = [];
            this.bossRelics = [];
            this.initRelicPoolWithRarity(this.commonRelics, STS.RelicRarity.Common);
            this.initRelicPoolWithRarity(this.uncommonRelics, STS.RelicRarity.Uncommon);
            this.initRelicPoolWithRarity(this.rareRelics, STS.RelicRarity.Rare);
            this.initRelicPoolWithRarity(this.shopRelics, STS.RelicRarity.Shop);
            this.initRelicPoolWithRarity(this.bossRelics, STS.RelicRarity.Boss);
        };
        Dungeon.prototype.removeRelics = function (relics) {
            for (var i = 0; i < relics.length; ++i) {
                var relic = relics[i];
                util.removeFromArray(this.commonRelics, relic);
                util.removeFromArray(this.uncommonRelics, relic);
                util.removeFromArray(this.rareRelics, relic);
                util.removeFromArray(this.shopRelics, relic);
                util.removeFromArray(this.bossRelics, relic);
            }
        };
        Dungeon.prototype.initSpecialOneTimeEvents = function () {
            this.specialOneTimeEvents = [];
            for (var i = 0; i < STS.SpecialOneTimeEvent.length; ++i) {
                this.specialOneTimeEvents.push(STS.SpecialOneTimeEvent[i].getName());
            }
        };
        Dungeon.prototype.initShrines = function () {
            this.shrines = [];
            for (var i = 0; i < this.floorInfo.shrines.length; ++i) {
                this.shrines.push(this.floorInfo.shrines[i].getName());
            }
        };
        Dungeon.prototype.initFloorInfo = function () {
            if (!STS.Floors[this.adventurer.info.floor]) {
                log.e("没找到对应层" + this.adventurer.info.floor + "的数据");
                return;
            }
            this.floorInfo = STS.Floors[this.adventurer.info.floor];
        };
        Dungeon.prototype.generateMap = function () {
            var map = new tbgame.LineMap();
            map.generate(7, 15, 6, 3, 5, this.mapRng);
            this.map = map;
            var roomNum = map.getRoomNum(0, map.height - 2);
            var rooms = this.generateRooms(roomNum);
            this.map.forEachNodeInRow(0, function (node) { return node.userData = new STS.MonsterRoom(); });
            this.map.forEachNodeInRow(8, function (node) { return node.userData = new STS.TreasureRoom(); });
            this.map.forEachNodeInRow(map.height - 1, function (node) { return node.userData = new STS.RestRoom(); });
            STS.RandomRoomAssigner(this.map, rooms, this.mapRng);
            this.mapInfo = null;
            log.i(this.map.toString());
        };
        Dungeon.prototype.getMapInfo = function () {
            if (!this.mapInfo) {
                this.mapInfo = this.map.serialize();
            }
            return this.mapInfo;
        };
        Dungeon.prototype.getFloorChance = function (type) {
            return this.adventurer.processValue(type, this.floorInfo.chanceInfo[type], null);
        };
        Dungeon.prototype.getEventChance = function () {
            var originShopChance = this.floorInfo.chanceInfo[STS.ChanceType.shopRoomChance];
            var finalShopChance = this.getFloorChance(STS.ChanceType.shopRoomChance);
            var originEventChance = this.floorInfo.chanceInfo[STS.ChanceType.eventRoomChance];
            return originEventChance - (finalShopChance - originShopChance) * 0.5;
        };
        Dungeon.prototype.generateRooms = function (roomNum) {
            log.i("生成" + roomNum + "个房间");
            var rooms = [];
            var shopRoomChance = this.getFloorChance(STS.ChanceType.shopRoomChance);
            var restRoomChance = this.getFloorChance(STS.ChanceType.restRoomChance);
            var treasureRoomChance = this.getFloorChance(STS.ChanceType.treasureRoomChance);
            var eliteRoomChance = this.getFloorChance(STS.ChanceType.eliteRoomChance);
            var eventRoomChance = this.getEventChance();
            var shopCount = Math.round(roomNum * shopRoomChance);
            log.i("商店(" + util.numberToPercentage(shopRoomChance) + ")" + shopCount + "个");
            var restCount = Math.round(roomNum * restRoomChance);
            log.i("营火(" + util.numberToPercentage(restRoomChance) + ")" + restCount + "个");
            var treasureCount = Math.round(roomNum * treasureRoomChance);
            log.i("宝箱(" + util.numberToPercentage(treasureRoomChance) + ")" + treasureCount + "个");
            var eliteCount = Math.round(roomNum * eliteRoomChance);
            log.i("精英(" + util.numberToPercentage(eliteRoomChance) + ")" + eliteCount + "个");
            var eventCount = Math.round(roomNum * eventRoomChance);
            log.i("事件(" + util.numberToPercentage(eventRoomChance) + ")" + eventCount + "个");
            var monsterCount = roomNum - shopCount - restCount - treasureCount - eliteCount - eventCount;
            log.i("怪物(" + util.numberToPercentage(1 - shopRoomChance - restRoomChance - treasureRoomChance - eliteRoomChance - eventRoomChance) + ")" + monsterCount + "个");
            for (var i = 0; i < shopCount; ++i) {
                rooms.push(new STS.ShopRoom());
            }
            for (var i = 0; i < restCount; ++i) {
                rooms.push(new STS.RestRoom());
            }
            for (var i = 0; i < eliteCount; ++i) {
                rooms.push(new STS.EliteRoom());
            }
            for (var i = 0; i < eventCount; ++i) {
                rooms.push(new STS.EventRoom());
            }
            return rooms;
        };
        Dungeon.prototype.enterRoom = function (x, y) {
            var mapNode = this.map.get(x, y);
            if (!mapNode.userData) {
                log.e("请求进入的房间不存在(" + x + "," + y + ")");
                return { type: STS.EventType.Error };
            }
            var room = mapNode.userData;
            var eventInfo = room.onPlayerEnter(this);
            if (eventInfo.type == STS.EventType.Battle) {
                this.adventurer.nextRoom(x, y, {
                    type: eventInfo.type,
                    finished: eventInfo.finished,
                });
            }
            else {
                this.adventurer.nextRoom(x, y, eventInfo);
            }
            this.room = room;
            return eventInfo;
        };
        Dungeon.prototype.enterTestRoom = function (roomType) {
            var room;
            switch (roomType) {
                case STS.RoomType.Monster:
                    room = new STS.MonsterRoom();
                    break;
                case STS.RoomType.Boss:
                    room = new STS.BossRoom();
                    break;
                case STS.RoomType.Elite:
                    room = new STS.EliteRoom();
                    break;
                case STS.RoomType.Event:
                    room = new STS.EventRoom();
                    break;
                case STS.RoomType.Rest:
                    room = new STS.RestRoom();
                    break;
                case STS.RoomType.Shop:
                    room = new STS.ShopRoom();
                    break;
                case STS.RoomType.Treasure:
                    room = new STS.TreasureRoom();
                    break;
            }
            this.room = room;
            var eventInfo = room.onPlayerEnter(this);
            return eventInfo;
        };
        Dungeon.prototype.removeCard = function (cardId) {
            if (!this.room) {
                return;
            }
            return this.room.removeCard(cardId);
        };
        Dungeon.prototype.chooseOption = function (opid) {
            if (!this.room) {
                return;
            }
            return this.room.chooseOption(opid);
        };
        Dungeon.prototype.chooseReward = function (rewardIdx, subIdx) {
            if (!this.room) {
                return;
            }
            return this.room.chooseReward(rewardIdx, subIdx);
        };
        Dungeon.prototype.getNormalMonsterForRoomCreation = function () {
            if (this.normalMonsters.length == 0) {
                log.e("房间请求怪物时，没有怪物可用");
                return null;
            }
            var key = this.normalMonsters[0];
            util.removeFromArray(this.normalMonsters, 0);
            return key;
        };
        Dungeon.prototype.getEliteMonsterForRoomCreation = function () {
            if (this.eliteMonsters.length == 0) {
                log.e("房间请求怪物时，没有怪物可用");
                return null;
            }
            var key = this.eliteMonsters[0];
            util.removeFromArray(this.eliteMonsters, 0);
            return key;
        };
        Dungeon.prototype.getBossMonsterForRoomCreation = function () {
            return this.boss;
        };
        Dungeon.prototype.getCurrentEventInfo = function () {
            if (this.room) {
                log.i("没有进入任何房间，当前事件信息不存在");
                return;
            }
            return this.room.getCurrentEventInfo();
        };
        Dungeon.prototype.getEventForRoomCreation = function () {
            if (this.adventurer.eventRng.quick() < this.floorInfo.chanceInfo.shrineChance) {
                if (this.specialOneTimeEvents.length != 0 || this.shrines.length != 0) {
                    return this.getShrine();
                }
                if (this.events.length != 0) {
                    return this.getEvent();
                }
                log.i("没有事件或圣地了");
                return null;
            }
            else {
                var v = this.getEvent();
                if (!v) {
                    return this.getShrine();
                }
                return v;
            }
        };
        Dungeon.prototype.getShrine = function () {
            var tmp = [];
            for (var i = 0; i < this.shrines.length; ++i) {
                tmp.push(this.shrines[i]);
            }
            for (var i = 0; i < this.specialOneTimeEvents.length; ++i) {
                tmp.push(this.specialOneTimeEvents[i]);
            }
            var key = this.adventurer.eventRng.array(tmp);
            util.removeFromArray(this.shrines, key);
            util.removeFromArray(this.specialOneTimeEvents, key);
            return STS.BaseEvent.create(key);
        };
        Dungeon.prototype.getEvent = function () {
            var tmp = [];
            for (var i = 0; i < this.events.length; ++i) {
                tmp.push(this.events[i]);
            }
            if (tmp.length == 0) {
                return this.getShrine();
            }
            var key = this.adventurer.eventRng.array(tmp);
            util.removeFromArray(this.shrines, key);
            util.removeFromArray(this.specialOneTimeEvents, key);
            return STS.BaseEvent.create(key);
        };
        Dungeon.prototype.randomRelicRarity = function () {
            var roll = this.adventurer.relicRng.rangeToMax(0, 99);
            var chanceInfo = this.floorInfo.chanceInfo;
            if (roll < chanceInfo.commonRelicChance) {
                return STS.RelicRarity.Common;
            }
            if (roll < chanceInfo.commonRelicChance + chanceInfo.uncommonRelicChance) {
                return STS.RelicRarity.Uncommon;
            }
            return STS.RelicRarity.Rare;
        };
        Dungeon.prototype.randomRelicNameByRarity = function (rarity) {
        };
        return Dungeon;
    }(tbgame.Entity));
    STS.Dungeon = Dungeon;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function ruleAssignableToRow(row, room) {
        var roomType = room.type;
        if (row <= 4 && (roomType == STS.RoomType.Elite || roomType == STS.RoomType.Rest)) {
            return false;
        }
        if (row >= 13 && roomType == STS.RoomType.Rest) {
            return false;
        }
        if (row === 8) {
            return true;
        }
        if (roomType == STS.RoomType.Treasure) {
            return false;
        }
        return true;
    }
    function ruleParentMatches(parents, room) {
        for (var i = 0; i < parents.length; ++i) {
            var parentRoom = parents[i].userData;
            if (!parentRoom) {
                continue;
            }
            var roomType = parentRoom.type;
            if (roomType == room.type && (roomType == STS.RoomType.Rest || roomType == STS.RoomType.Treasure || roomType == STS.RoomType.Shop || roomType == STS.RoomType.Elite)) {
                return true;
            }
        }
        return false;
    }
    function ruleSiblingMatches(siblings, room) {
        for (var i = 0; i < siblings.length; ++i) {
            var sibling = siblings[i].userData;
            if (!sibling) {
                continue;
            }
            var roomType = sibling.type;
            if (roomType == room.type && (roomType == STS.RoomType.Rest || roomType == STS.RoomType.Monster || roomType == STS.RoomType.Event || roomType == STS.RoomType.Elite || roomType == STS.RoomType.Shop)) {
                return true;
            }
        }
        return false;
    }
    function getNextRoomByRule(map, node, rooms) {
        var parents = node.getParents();
        var siblings = map.getSiblings(node);
        for (var i = 0; i < rooms.length; ++i) {
            var room = rooms[i];
            if (ruleAssignableToRow(node.y, room)) {
                if (!ruleParentMatches(parents, room) || !ruleSiblingMatches(siblings, room)) {
                    return room;
                }
                if (node.y === 0) {
                    log.e("一般情况不应该会随机分配第0层的房间");
                    return room;
                }
            }
        }
        return null;
    }
    function RandomRoomAssigner(map, rooms, rng) {
        var needRoomCount = map.getNoUserDataRoomNum();
        while (rooms.length < needRoomCount) {
            rooms.push(new STS.MonsterRoom());
        }
        if (rooms.length > needRoomCount) {
            log.e("特殊房间数量可能和预期不一样，房间数" + rooms.length + " 可分配给房间的节点数量只有" + needRoomCount);
        }
        util.shuffleArray(rooms, rng.quick());
        map.forEachNode(function (node) {
            if (node.userData) {
                return;
            }
            var room = getNextRoomByRule(map, node, rooms);
            if (!room) {
                node.userData = new STS.MonsterRoom();
                return;
            }
            util.removeFromArray(rooms, room);
            node.userData = room;
        });
    }
    STS.RandomRoomAssigner = RandomRoomAssigner;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function CardInfosToString(cards) {
        var str = "";
        for (var j = 0; j < cards.length; ++j) {
            str += cards[j].name + "(" + cards[j].level + ") ";
        }
        return str;
    }
    STS.CardInfosToString = CardInfosToString;
    function RewardToString(rewards) {
        var str = "奖励\n";
        for (var i = 0; i < rewards.length; ++i) {
            var reward = rewards[i];
            switch (reward.type) {
                case STS.RewardType.Card:
                    {
                        str += "卡牌选择" + CardInfosToString(reward.cards) + "\n";
                    }
                    break;
                case STS.RewardType.Gold:
                    {
                        str += "金币" + reward.gold + "\n";
                    }
                    break;
                case STS.RewardType.Potion:
                    {
                        str += "药水" + reward.potion + "\n";
                    }
                    break;
                case STS.RewardType.Relic: {
                    str += "遗物" + reward.relic + "\n";
                }
            }
        }
        return str;
    }
    STS.RewardToString = RewardToString;
    function lerp(src, dst, dt, thresHold) {
        if (src != dst) {
            src = src + (dst - src) * dt * 6;
            if (Math.abs(src - dst) < thresHold) {
                src = dst;
            }
        }
        return src;
    }
    STS.lerp = lerp;
    var CardSnapThresHold = 1;
    function cardLerpSnap(srcX, srcY, dstX, dstY, dt) {
        var x = lerp(srcX, dstX, dt, CardSnapThresHold);
        var y = lerp(srcY, dstY, dt, CardSnapThresHold);
        return {
            x: x, y: y
        };
    }
    STS.cardLerpSnap = cardLerpSnap;
})(STS || (STS = {}));
var STS;
(function (STS) {
    STS.ClassLibrary = {};
    function initClassLibrary() {
        STS.ClassLibrary[STS.ClassType.Werewolf] = {
            hp: 90,
            gold: 100,
            res: "Prefabs/Roles/Werewolf",
            relic: STS.BurningBlood,
            cardDraw: 5,
            cards: [STS.ZhuajiCard, STS.ChuantouZhuaji, STS.JianyalichiCard, STS.SilieCard, STS.TaoxinCard, STS.XiaochushangtongCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard],
        };
        STS.ClassLibrary[STS.ClassType.Sorceress] = {
            hp: 70,
            gold: 100,
            res: "Prefabs/Roles/Werewolf",
            relic: STS.RingOfTheSnake,
            cardDraw: 5,
            cards: [STS.ZhuajiCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.ZhuajiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard, STS.HoupiCard],
        };
    }
    STS.initClassLibrary = initClassLibrary;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ChanceType;
    (function (ChanceType) {
        ChanceType["shopRoomChance"] = "shopRoomChance";
        ChanceType["restRoomChance"] = "restRoomChance";
        ChanceType["treasureRoomChance"] = "treasureRoomChance";
        ChanceType["eventRoomChance"] = "eventRoomChance";
        ChanceType["eliteRoomChance"] = "eliteRoomChance";
        ChanceType["smallChestChance"] = "smallChestChance";
        ChanceType["mediumChestChance"] = "mediumChestChance";
        ChanceType["largeChestChance"] = "largeChestChance";
        ChanceType["smallPotionChance"] = "smallPotionChance";
        ChanceType["mediumPotionChance"] = "mediumPotionChance";
        ChanceType["largePotionChance"] = "largePotionChance";
        ChanceType["commonRelicChance"] = "commonRelicChance";
        ChanceType["uncommonRelicChance"] = "uncommonRelicChance";
        ChanceType["rareRelicChance"] = "rareRelicChance";
        ChanceType["colorlessRareChance"] = "colorlessRareChance";
        ChanceType["cardUpgradedChance"] = "cardUpgradedChance";
        ChanceType["shrineChance"] = "shrineChance";
    })(ChanceType = STS.ChanceType || (STS.ChanceType = {}));
    function normalizeMonsterGroupWeights(monsterGroups) {
        var normObjs = [];
        var i;
        var total = 0;
        for (i = 0; i < monsterGroups.length; ++i) {
            var monsterGroup = monsterGroups[i];
            total += monsterGroup.weight;
        }
        for (i = 0; i < monsterGroups.length; ++i) {
            var monsterGroup = monsterGroups[i];
            normObjs.push({
                group: monsterGroup.group,
                weight: monsterGroup.weight / total,
            });
        }
        return normObjs;
    }
    STS.normalizeMonsterGroupWeights = normalizeMonsterGroupWeights;
    function initFloorInfo() {
        STS.Floors = [
            STS.FirstFloorInfo(),
            STS.SecondFloorInfo(),
            STS.ThirdFloorInfo(),
        ];
    }
    STS.initFloorInfo = initFloorInfo;
})(STS || (STS = {}));
var STS;
(function (STS) {
    function initSpecialOneTimeEvent() {
        STS.SpecialOneTimeEvent = [
            STS.Meal,
            STS.Meal,
        ];
    }
    STS.initSpecialOneTimeEvent = initSpecialOneTimeEvent;
    var EventType;
    (function (EventType) {
        EventType[EventType["Error"] = 0] = "Error";
        EventType[EventType["Battle"] = 1] = "Battle";
        EventType[EventType["Story"] = 2] = "Story";
        EventType[EventType["Roulette"] = 3] = "Roulette";
        EventType[EventType["Match"] = 4] = "Match";
        EventType[EventType["Rest"] = 5] = "Rest";
        EventType[EventType["Shop"] = 6] = "Shop";
        EventType[EventType["Treasure"] = 7] = "Treasure";
    })(EventType = STS.EventType || (STS.EventType = {}));
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["None"] = 0] = "None";
        ActionType[ActionType["AddHP"] = 1] = "AddHP";
        ActionType[ActionType["AddMaxHP"] = 2] = "AddMaxHP";
        ActionType[ActionType["AddGold"] = 3] = "AddGold";
        ActionType[ActionType["AddPotions"] = 4] = "AddPotions";
        ActionType[ActionType["AddRelics"] = 5] = "AddRelics";
        ActionType[ActionType["AddCards"] = 6] = "AddCards";
        ActionType[ActionType["RemoveCards"] = 7] = "RemoveCards";
        ActionType[ActionType["ViewReward"] = 8] = "ViewReward";
        ActionType[ActionType["ViewRemoveCard"] = 9] = "ViewRemoveCard";
        ActionType[ActionType["RelicCounter"] = 10] = "RelicCounter";
        ActionType[ActionType["Story"] = 11] = "Story";
    })(ActionType = STS.ActionType || (STS.ActionType = {}));
    var RestOption;
    (function (RestOption) {
        RestOption[RestOption["Sleeping"] = 0] = "Sleeping";
        RestOption[RestOption["Smoking"] = 1] = "Smoking";
        RestOption[RestOption["Exercising"] = 2] = "Exercising";
        RestOption[RestOption["Digging"] = 3] = "Digging";
        RestOption[RestOption["Enhence"] = 4] = "Enhence";
    })(RestOption = STS.RestOption || (STS.RestOption = {}));
    var TreasureType;
    (function (TreasureType) {
        TreasureType[TreasureType["Small"] = 0] = "Small";
        TreasureType[TreasureType["Normal"] = 1] = "Normal";
        TreasureType[TreasureType["Big"] = 2] = "Big";
        TreasureType[TreasureType["Boss"] = 3] = "Boss";
    })(TreasureType = STS.TreasureType || (STS.TreasureType = {}));
    STS.EventLibrary = {};
    function EventDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.EventLibrary[target.name] = target;
    }
    STS.EventDefine = EventDefine;
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseEvent.create = function (name) {
            var eventType = STS.EventLibrary[name];
            if (!eventType) {
                log.e("事件不存在" + name);
                return null;
            }
            var event = new eventType();
            return event;
        };
        BaseEvent.prototype.chooseOption = function (opid, adventurer) {
            return {
                type: ActionType.None,
            };
        };
        return BaseEvent;
    }(tbgame.FakeName));
    STS.BaseEvent = BaseEvent;
    var StoryEvent = (function (_super) {
        __extends(StoryEvent, _super);
        function StoryEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = EventType.Story;
            return _this;
        }
        StoryEvent.prototype.serialize = function () {
            return {
                type: this.type,
                name: this.getName(),
                res: this.res,
                desc: this.text,
                options: this.options,
            };
        };
        StoryEvent.prototype.onEnterRoom = function (dungeon) {
            return this.serialize();
        };
        return StoryEvent;
    }(BaseEvent));
    STS.StoryEvent = StoryEvent;
    var RestEvent = (function (_super) {
        __extends(RestEvent, _super);
        function RestEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = EventType.Rest;
            return _this;
        }
        RestEvent.prototype.serialize = function () {
            return {
                type: this.type,
                name: this.getName(),
            };
        };
        RestEvent.prototype.onEnterRoom = function (dungeon) {
            return this.serialize();
        };
        return RestEvent;
    }(BaseEvent));
    STS.RestEvent = RestEvent;
    var TreasureEvent = (function (_super) {
        __extends(TreasureEvent, _super);
        function TreasureEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = EventType.Treasure;
            return _this;
        }
        TreasureEvent.prototype.serialize = function () {
            return {
                type: this.type,
                name: this.getName(),
            };
        };
        TreasureEvent.prototype.onEnterRoom = function (dungeon) {
            return this.serialize();
        };
        return TreasureEvent;
    }(BaseEvent));
    STS.TreasureEvent = TreasureEvent;
})(STS || (STS = {}));
var STS;
(function (STS) {
    STS.MonsterGroupLibrary = {};
    function MonsterGroupDefine(target) {
        STS.MonsterGroupLibrary[target.name] = target;
        tbgame.FakeName.createFakeNameForClass(target);
    }
    STS.MonsterGroupDefine = MonsterGroupDefine;
    var BaseMonsterGroup = (function (_super) {
        __extends(BaseMonsterGroup, _super);
        function BaseMonsterGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseMonsterGroup.create = function () { return []; };
        ;
        return BaseMonsterGroup;
    }(tbgame.FakeName));
    STS.BaseMonsterGroup = BaseMonsterGroup;
    function RandomMonsterGroupByWeights(rng, monsterWeights) {
        var roll = rng.quick();
        var total = 0;
        var w;
        for (var i = 0; i < monsterWeights.length; ++i) {
            total += monsterWeights[i].weight;
            if (roll < total) {
                return monsterWeights[i].group;
            }
        }
    }
    STS.RandomMonsterGroupByWeights = RandomMonsterGroupByWeights;
    ;
    function createMonstersGroupByName(key) {
        if (STS.Settings.TestMonsterName) {
            var type = STS.MonsterLibrary[STS.Settings.TestMonsterName];
            if (!type) {
                log.i("没好到名字是" + STS.Settings.TestMonsterName + " 的怪物");
            }
            else {
                return [new (type)()];
            }
        }
        return STS.MonsterGroupLibrary[key].create();
    }
    STS.createMonstersGroupByName = createMonstersGroupByName;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SlimeGroup = (function (_super) {
        __extends(SlimeGroup, _super);
        function SlimeGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlimeGroup.create = function () {
            return [new STS.AcidSlime_M(), new STS.AcidSlime_S()];
        };
        SlimeGroup = __decorate([
            STS.MonsterGroupDefine
        ], SlimeGroup);
        return SlimeGroup;
    }(STS.BaseMonsterGroup));
    STS.SlimeGroup = SlimeGroup;
    var SlimeGroup2 = (function (_super) {
        __extends(SlimeGroup2, _super);
        function SlimeGroup2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlimeGroup2.create = function () {
            return [new STS.AcidSlime_M(), new STS.AcidSlime_M()];
        };
        SlimeGroup2 = __decorate([
            STS.MonsterGroupDefine
        ], SlimeGroup2);
        return SlimeGroup2;
    }(STS.BaseMonsterGroup));
    STS.SlimeGroup2 = SlimeGroup2;
    var XiaochouGroup = (function (_super) {
        __extends(XiaochouGroup, _super);
        function XiaochouGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XiaochouGroup.create = function () {
            return [new STS.Fengkuanglianjinshi()];
        };
        XiaochouGroup = __decorate([
            STS.MonsterGroupDefine
        ], XiaochouGroup);
        return XiaochouGroup;
    }(STS.BaseMonsterGroup));
    STS.XiaochouGroup = XiaochouGroup;
    var JuhuabossGroup = (function (_super) {
        __extends(JuhuabossGroup, _super);
        function JuhuabossGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuhuabossGroup.create = function () {
            return [new STS.Jiancijukou()];
        };
        JuhuabossGroup = __decorate([
            STS.MonsterGroupDefine
        ], JuhuabossGroup);
        return JuhuabossGroup;
    }(STS.BaseMonsterGroup));
    STS.JuhuabossGroup = JuhuabossGroup;
})(STS || (STS = {}));
var STS;
(function (STS) {
    STS.PotionLibrary = {};
    function PotionDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.PotionLibrary[target.name] = target;
    }
    STS.PotionDefine = PotionDefine;
    var BasePotion = (function (_super) {
        __extends(BasePotion, _super);
        function BasePotion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BasePotion.prototype.serialize = function () {
            return {
                id: this.id,
                name: this.getName(),
            };
        };
        BasePotion.prototype.use = function (monster) {
        };
        BasePotion.prototype.getActionManager = function () {
            return this.owner.battle.actionManager;
        };
        BasePotion.prototype.setOwner = function (owner) {
            this.owner = owner;
        };
        BasePotion.create = function (id, name) {
            var potionType = STS.PotionLibrary[name];
            if (!potionType) {
                log.e("药剂不存在" + name);
                return null;
            }
            var potion = new potionType();
            potion.id = id;
            return potion;
        };
        return BasePotion;
    }(tbgame.FakeName));
    STS.BasePotion = BasePotion;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Intent;
    (function (Intent) {
        Intent[Intent["ATTACK"] = 0] = "ATTACK";
        Intent[Intent["ATTACK_BUFF"] = 1] = "ATTACK_BUFF";
        Intent[Intent["ATTACK_DEBUFF"] = 2] = "ATTACK_DEBUFF";
        Intent[Intent["ATTACK_DEFEND"] = 3] = "ATTACK_DEFEND";
        Intent[Intent["BUFF"] = 4] = "BUFF";
        Intent[Intent["DEBUFF"] = 5] = "DEBUFF";
        Intent[Intent["STRONG_DEBUFF"] = 6] = "STRONG_DEBUFF";
        Intent[Intent["DEBUG"] = 7] = "DEBUG";
        Intent[Intent["DEFEND"] = 8] = "DEFEND";
        Intent[Intent["DEFEND_DEBUFF"] = 9] = "DEFEND_DEBUFF";
        Intent[Intent["DEFEND_BUFF"] = 10] = "DEFEND_BUFF";
        Intent[Intent["ESCAPE"] = 11] = "ESCAPE";
        Intent[Intent["MAGIC"] = 12] = "MAGIC";
        Intent[Intent["NONE"] = 13] = "NONE";
        Intent[Intent["SLEEP"] = 14] = "SLEEP";
        Intent[Intent["STUN"] = 15] = "STUN";
        Intent[Intent["UNKNOWN"] = 16] = "UNKNOWN";
    })(Intent = STS.Intent || (STS.Intent = {}));
    var EnemyType;
    (function (EnemyType) {
        EnemyType[EnemyType["NORMAL"] = 0] = "NORMAL";
        EnemyType[EnemyType["ELITE"] = 1] = "ELITE";
        EnemyType[EnemyType["BOSS"] = 2] = "BOSS";
    })(EnemyType = STS.EnemyType || (STS.EnemyType = {}));
    STS.MonsterLibrary = {};
    function MonsterDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.MonsterLibrary[target.name] = target;
    }
    STS.MonsterDefine = MonsterDefine;
    var localMonsterId = 0;
    function genMonsterId() {
        localMonsterId++;
        return "" + localMonsterId;
    }
    var BaseMonster = (function (_super) {
        __extends(BaseMonster, _super);
        function BaseMonster() {
            var _this = _super.call(this) || this;
            _this.hp = 0;
            _this.maxhp = 0;
            _this.gold = 0;
            _this.block = 0;
            _this.x = 0;
            _this.y = 0;
            _this.name = _this.getName();
            _this.id = genMonsterId();
            return _this;
        }
        BaseMonster.prototype.initMaxHp = function () {
            var info = this.getLevelInfo();
            if (!info.maxhpRange) {
                log.e("怪物的info里缺少maxhpRange属性" + this.getName());
                return 1;
            }
            return this.battle.player.monsterHpRng.rangeToMax(info.maxhpRange[0], info.maxhpRange[1]);
        };
        BaseMonster.prototype.getLevelInfo = function () {
            if (this.curLevelInfo) {
                return (this.curLevelInfo);
            }
            var level = this.battle.player.info.ascensionLevel;
            var lastInfo;
            for (var i = 0; i < this.infos.length; ++i) {
                var info = this.infos[i];
                if (info.startLevel > level) {
                    break;
                }
                lastInfo = info;
            }
            if (!lastInfo) {
                log.e("没找到晋升等级对应的怪物数据" + this.getName() + " 等级:" + level);
            }
            this.curLevelInfo = lastInfo;
            return lastInfo;
        };
        BaseMonster.prototype.initBattle = function (battle, hp) {
            _super.prototype.initBattle.call(this, battle);
            if (hp) {
                this.maxhp = hp;
            }
            else {
                this.maxhp = this.initMaxHp();
            }
            this.hp = this.maxhp;
            this.moveHistory = [];
            this.rollMove();
        };
        BaseMonster.prototype.rollMove = function () {
            this.getMove(this.battle.player.aiRng.range(0, 100));
        };
        BaseMonster.prototype.usePreBattleAction = function () {
        };
        BaseMonster.prototype.onStartCombat = function () {
            this.usePreBattleAction();
        };
        BaseMonster.prototype.onStartTurn = function () {
            if (this.isBasiclyDead()) {
                return;
            }
            this.createIntent();
        };
        BaseMonster.prototype.createIntent = function () {
            this.nextMove = this.move.nextMove;
        };
        BaseMonster.prototype.setMove = function (moveName, nextMove, intent, baseDamage, multiplier, isMultiDamage) {
            if (!baseDamage) {
                baseDamage = -1;
            }
            if (!multiplier) {
                multiplier = 0;
            }
            this.moveName = moveName;
            if (nextMove != -1) {
                this.moveHistory.push(nextMove);
            }
            this.move = { nextMove: nextMove, intent: intent, baseDamage: baseDamage, multiplier: multiplier, isMultiDamage: isMultiDamage };
        };
        BaseMonster.prototype.lastMove = function (move) {
            return this.moveHistory.length > 0 && this.moveHistory[this.moveHistory.length - 1] == move;
        };
        BaseMonster.prototype.lastMoveBefore = function (move) {
            return this.moveHistory.length >= 2 && this.moveHistory[this.moveHistory.length - 2] == move;
        };
        BaseMonster.prototype.lastTwoMoves = function (move) {
            return this.moveHistory.length >= 2 && (this.moveHistory[this.moveHistory.length - 1] == move && this.moveHistory[this.moveHistory.length - 2] == move);
        };
        BaseMonster.prototype.getMove = function (p) {
        };
        BaseMonster.prototype.takeTurn = function () {
        };
        Object.defineProperty(BaseMonster.prototype, "aiRng", {
            get: function () {
                return this.battle.player.aiRng;
            },
            enumerable: true,
            configurable: true
        });
        BaseMonster.prototype.getActionManager = function () {
            return this.battle.actionManager;
        };
        BaseMonster.prototype.serialize = function () {
            return {
                name: this.getName(),
                id: this.id,
                hp: this.hp,
                maxhp: this.maxhp,
            };
        };
        return BaseMonster;
    }(STS.Creature));
    STS.BaseMonster = BaseMonster;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var EventRoom = (function (_super) {
        __extends(EventRoom, _super);
        function EventRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Event;
            return _this;
        }
        EventRoom.prototype.getCurrentEventInfo = function () {
            return {
                type: STS.EventType.Story,
                name: "Event.WomenInStable.name",
                desc: "Event.WomenInStable.desc",
                res: "Prefabs/Events/WomenInStable",
                options: ["Event.WomenInStable.options.heal", "Event.WomenInStable.options.purge", "Event.WomenInStable.options.leave"],
                finished: false,
            };
        };
        EventRoom.prototype.chooseOption = function (opid) {
            var info = {
                type: STS.EventType.Story,
                name: "Event.WomenInStable.name",
                res: "Prefabs/Events/WomenInStable",
                desc: "",
                options: [],
                finished: false,
            };
            switch (opid) {
                case 0:
                    info.desc = "Event.WomenInStable.result.heal";
                    break;
                case 1:
                    info.desc = "Event.WomenInStable.result.purge";
                    break;
                case 2:
                    info.desc = "Event.WomenInStable.result.leave";
                    info.finished = true;
                    break;
            }
            return {
                type: STS.ActionType.Story,
                info: info,
            };
        };
        EventRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            return this.getCurrentEventInfo();
        };
        return EventRoom;
    }(STS.BaseRoom));
    STS.EventRoom = EventRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MonsterRoom = (function (_super) {
        __extends(MonsterRoom, _super);
        function MonsterRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Monster;
            return _this;
        }
        MonsterRoom.prototype.initBattle = function (monsterGroupName) {
            var _this = this;
            this.battle = new STS.Battle(this.adventurer, STS.createMonstersGroupByName(monsterGroupName));
            this.battle.on(STS.BattleEventType.EndCombat, function () {
                _this.finished = true;
                if (!_this.rewards) {
                    _this.rewards = [
                        { type: STS.RewardType.Gold, gold: 39 },
                        { type: STS.RewardType.Card, cards: [
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 0,
                                },
                                {
                                    name: STS.SilieCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                            ] },
                        { type: STS.RewardType.Card, cards: [
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 0,
                                },
                                {
                                    name: STS.SilieCard.getName(),
                                    level: 1,
                                },
                                {
                                    name: STS.ZhuajiCard.getName(),
                                    level: 1,
                                },
                            ] },
                        { type: STS.RewardType.Relic, relic: STS.BurningBlood.getName(), recieved: true },
                        { type: STS.RewardType.Relic, relic: STS.BurningBlood.getName() },
                    ];
                }
            });
        };
        MonsterRoom.prototype.chooseReward = function (rewardIdx, subIdx) {
            if (!this.rewards || !this.rewards[rewardIdx]) {
                log.e("奖励里没有选择的索引" + rewardIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            var reward = this.rewards[rewardIdx];
            if (reward.recieved) {
                log.e("这个奖励已经领过了" + rewardIdx + " " + subIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            reward.recieved = true;
            var adventurer = this.adventurer;
            switch (reward.type) {
                case STS.RewardType.Gold: {
                    var addedGold = reward.gold;
                    adventurer.addGold(addedGold);
                    var ret = {
                        type: STS.ActionType.AddGold,
                        addedGold: addedGold,
                        curGold: adventurer.gold,
                    };
                    return ret;
                }
                case STS.RewardType.Card: {
                    var cards = reward.cards;
                    if (!cards || !cards[subIdx]) {
                        log.e("奖励里没有选择的卡牌索引");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var card = adventurer.addCard(adventurer.genLocalId(), cards[subIdx].name, cards[subIdx].level);
                    var ret = {
                        type: STS.ActionType.AddCards,
                        cards: [card.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Potion: {
                    if (!reward.potion) {
                        log.e("奖励里没有药剂");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var potion = adventurer.addPotion(adventurer.genLocalId(), reward.potion);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        potions: [potion.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Relic: {
                    if (!reward.relic) {
                        log.e("奖励里没有遗物");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var relic = adventurer.addRelic(adventurer.genLocalId(), reward.relic, 0);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
        };
        MonsterRoom.prototype.getCurrentEventInfo = function () {
            var ret = {
                type: STS.EventType.Battle,
                finished: this.finished,
                battle: this.battle,
            };
            return ret;
        };
        MonsterRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            if (!this.battle) {
                this.initBattle(dungeon.getNormalMonsterForRoomCreation());
            }
            return this.getCurrentEventInfo();
        };
        return MonsterRoom;
    }(STS.BaseRoom));
    STS.MonsterRoom = MonsterRoom;
    var BossRoom = (function (_super) {
        __extends(BossRoom, _super);
        function BossRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Boss;
            return _this;
        }
        BossRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            if (!this.battle) {
                this.initBattle(dungeon.getBossMonsterForRoomCreation());
            }
            return this.getCurrentEventInfo();
        };
        return BossRoom;
    }(MonsterRoom));
    STS.BossRoom = BossRoom;
    var EliteRoom = (function (_super) {
        __extends(EliteRoom, _super);
        function EliteRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Elite;
            return _this;
        }
        EliteRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            if (!this.battle) {
                this.initBattle(dungeon.getEliteMonsterForRoomCreation());
            }
            return this.getCurrentEventInfo();
        };
        return EliteRoom;
    }(MonsterRoom));
    STS.EliteRoom = EliteRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RestRoom = (function (_super) {
        __extends(RestRoom, _super);
        function RestRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Rest;
            _this.choosed = false;
            return _this;
        }
        RestRoom.prototype.getCurrentEventInfo = function () {
            if (this.choosed) {
                return {
                    type: STS.EventType.Rest,
                    finished: this.finished,
                    options: [],
                };
            }
            return {
                type: STS.EventType.Rest,
                finished: this.finished,
                options: [
                    STS.RestOption.Sleeping,
                    STS.RestOption.Smoking,
                    STS.RestOption.Exercising,
                    STS.RestOption.Digging,
                ],
            };
        };
        RestRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            this.adventurer.emit(STS.AdventurerEventType.EnterRestRoom);
            return this.getCurrentEventInfo();
        };
        RestRoom.prototype.removeCard = function (cardId) {
            this.adventurer.removeCard(cardId);
            this.finished = true;
            return {
                type: STS.ActionType.RemoveCards,
                cardIds: [cardId],
            };
        };
        RestRoom.prototype.chooseReward = function (rewardIdx, subIdx) {
            if (!this.rewards || !this.rewards[rewardIdx]) {
                log.e("奖励里没有选择的索引" + rewardIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            var reward = this.rewards[rewardIdx];
            if (reward.recieved) {
                log.e("这个奖励已经领过了" + rewardIdx + " " + subIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            reward.recieved = true;
            var adventurer = this.adventurer;
            switch (reward.type) {
                case STS.RewardType.Gold: {
                    var addedGold = reward.gold;
                    adventurer.addGold(addedGold);
                    var ret = {
                        type: STS.ActionType.AddGold,
                        addedGold: addedGold,
                        curGold: adventurer.getGold(),
                    };
                    return ret;
                }
                case STS.RewardType.Card: {
                    var cards = reward.cards;
                    if (!cards || !cards[subIdx]) {
                        log.e("奖励里没有选择的卡牌索引");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var card = adventurer.addCard(adventurer.genLocalId(), cards[subIdx].name, cards[subIdx].level);
                    var ret = {
                        type: STS.ActionType.AddCards,
                        cards: [card.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Potion: {
                    if (!reward.potion) {
                        log.e("奖励里没有药剂");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var potion = adventurer.addPotion(adventurer.genLocalId(), reward.potion);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        potions: [potion.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Relic: {
                    if (!reward.relic) {
                        log.e("奖励里没有遗物");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var relic = adventurer.addRelic(adventurer.genLocalId(), reward.relic, 0);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
        };
        RestRoom.prototype.chooseOption = function (opid) {
            this.choosed = true;
            log.i("选择", opid);
            switch (opid) {
                case STS.RestOption.Sleeping: {
                    var info = this.adventurer.info;
                    var addhp = Math.round(0.33 * info.maxhp);
                    this.adventurer.heal(addhp);
                    var ret = {
                        type: STS.ActionType.AddHP,
                        addedHp: addhp,
                        curHp: this.adventurer.getHp(),
                    };
                    this.finished = true;
                    return ret;
                }
                case STS.RestOption.Smoking: {
                    var info = this.adventurer.info;
                    var cards = info.cards;
                    var ret = {
                        type: STS.ActionType.ViewRemoveCard,
                        num: 1,
                        cards: cards,
                    };
                    return ret;
                }
                case STS.RestOption.Exercising: {
                    var info = this.adventurer.info;
                    var relics = info.relics;
                    var ret = {
                        type: STS.ActionType.RelicCounter,
                        relicId: "1",
                        v: 1,
                        counter: 1,
                    };
                    this.finished = true;
                    return ret;
                }
                case STS.RestOption.Digging: {
                    log.i("挖掘");
                    if (!this.rewards) {
                        this.rewards = [
                            { type: STS.RewardType.Gold, gold: 39 },
                            { type: STS.RewardType.Card, cards: [
                                    {
                                        name: STS.ZhuajiCard.getName(),
                                        level: 0,
                                    },
                                    {
                                        name: STS.SilieCard.getName(),
                                        level: 1,
                                    },
                                    {
                                        name: STS.ZhuajiCard.getName(),
                                        level: 1,
                                    },
                                ] },
                            { type: STS.RewardType.Card, cards: [
                                    {
                                        name: STS.ZhuajiCard.getName(),
                                        level: 1,
                                    },
                                    {
                                        name: STS.ZhuajiCard.getName(),
                                        level: 0,
                                    },
                                    {
                                        name: STS.SilieCard.getName(),
                                        level: 1,
                                    },
                                    {
                                        name: STS.ZhuajiCard.getName(),
                                        level: 1,
                                    },
                                ] },
                            { type: STS.RewardType.Relic, relic: STS.BurningBlood.getName(), recieved: true },
                            { type: STS.RewardType.Relic, relic: STS.BurningBlood.getName() },
                        ];
                    }
                    var ret = {
                        type: STS.ActionType.ViewReward,
                        rewards: this.rewards,
                    };
                    this.finished = true;
                    return ret;
                }
            }
        };
        return RestRoom;
    }(STS.BaseRoom));
    STS.RestRoom = RestRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ShopRoom = (function (_super) {
        __extends(ShopRoom, _super);
        function ShopRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Shop;
            _this.inited = false;
            return _this;
        }
        ShopRoom.prototype.getCurrentEventInfo = function () {
            if (!this.inited) {
                this.cards = [{
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.ZhuajiCard.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }];
                this.relics = [{
                        opid: tbgame.getLocalId(),
                        name: STS.BurningBlood.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.BurningBlood.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }, {
                        opid: tbgame.getLocalId(),
                        name: STS.BurningBlood.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }];
                this.potions = [
                    {
                        opid: tbgame.getLocalId(),
                        name: STS.Gangtiemoyao.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    },
                    {
                        opid: tbgame.getLocalId(),
                        name: STS.Gangtiemoyao.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    },
                    {
                        opid: tbgame.getLocalId(),
                        name: STS.Gangtiemoyao.getName(),
                        price: 20,
                        discount: 0.2,
                        soldout: false,
                    }
                ];
                this.purge = {
                    opid: tbgame.getLocalId(),
                    name: "purge",
                    price: 75,
                    soldout: false,
                };
            }
            return {
                finished: this.finished,
                type: STS.EventType.Shop,
                cards: this.cards,
                relics: this.relics,
                potions: this.potions,
                purge: this.purge,
            };
        };
        ShopRoom.prototype.removeCard = function (cardId) {
            var info = this.purge;
            if (this.adventurer.info.gold < info.price) {
                log.i("角色金币不够移除卡牌(" + this.adventurer.info.gold + "," + info.price + ")");
                return;
            }
            if (info.soldout) {
                log.i("移除卡牌已卖出");
                return;
            }
            info.soldout = true;
            this.adventurer.removeCard(cardId);
            return {
                type: STS.ActionType.RemoveCards,
                cardIds: [cardId],
            };
        };
        ShopRoom.prototype.chooseOption = function (opid) {
            if (this.purge.opid == opid) {
                var info = this.purge;
                if (this.adventurer.info.gold < info.price) {
                    log.i("角色金币不够(" + this.adventurer.info.gold + "," + info.price + ")" + opid);
                    return null;
                }
                if (info.soldout) {
                    log.i("此物品已卖出" + opid);
                    return null;
                }
                info.soldout = true;
                var cards = this.adventurer.info.cards;
                var ret = {
                    type: STS.ActionType.ViewRemoveCard,
                    num: 1,
                    cards: cards,
                };
                return ret;
            }
            for (var i = 0; i < this.cards.length; ++i) {
                var info = this.cards[i];
                if (info.opid == opid) {
                    if (this.adventurer.info.gold < info.price) {
                        log.i("角色金币不够(" + this.adventurer.info.gold + "," + info.price + ")" + opid);
                        return null;
                    }
                    if (info.soldout) {
                        log.i("此物品已卖出" + opid);
                        return null;
                    }
                    info.soldout = true;
                    this.adventurer.subGold(info.price);
                    var card = this.adventurer.addCard(this.adventurer.genLocalId(), info.name, info.level);
                    var ret = {
                        type: STS.ActionType.AddCards,
                        cards: [card.serialize()],
                    };
                    return ret;
                }
            }
            for (var i = 0; i < this.relics.length; ++i) {
                var info = this.relics[i];
                if (info.opid == opid) {
                    if (this.adventurer.info.gold < info.price) {
                        log.i("角色金币不够(" + this.adventurer.info.gold + "," + info.price + ")" + opid);
                        return null;
                    }
                    if (info.soldout) {
                        log.i("此物品已卖出" + opid);
                        return null;
                    }
                    info.soldout = true;
                    this.adventurer.subGold(info.price);
                    var relic = this.adventurer.addRelic(this.adventurer.genLocalId(), info.name, 0);
                    var ret = {
                        type: STS.ActionType.AddRelics,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
            for (var i = 0; i < this.potions.length; ++i) {
                var info = this.potions[i];
                if (info.opid == opid) {
                    if (this.adventurer.info.gold < info.price) {
                        log.i("角色金币不够(" + this.adventurer.info.gold + "," + info.price + ")" + opid);
                        return null;
                    }
                    if (info.soldout) {
                        log.i("此物品已卖出" + opid);
                        return null;
                    }
                    info.soldout = true;
                    this.adventurer.subGold(info.price);
                    var potion = this.adventurer.addPotion(this.adventurer.genLocalId(), info.name);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        potions: [potion.serialize()],
                    };
                    return ret;
                }
            }
        };
        ShopRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            this.finished = true;
            return this.getCurrentEventInfo();
        };
        return ShopRoom;
    }(STS.BaseRoom));
    STS.ShopRoom = ShopRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TreasureRoom = (function (_super) {
        __extends(TreasureRoom, _super);
        function TreasureRoom() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.RoomType.Treasure;
            return _this;
        }
        TreasureRoom.prototype.chooseReward = function (rewardIdx, subIdx) {
            if (!this.rewards || !this.rewards[rewardIdx]) {
                log.e("奖励里没有选择的索引" + rewardIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            var reward = this.rewards[rewardIdx];
            if (reward.recieved) {
                log.e("这个奖励已经领过了" + rewardIdx + " " + subIdx);
                return {
                    type: STS.ActionType.None,
                };
            }
            reward.recieved = true;
            var adventurer = this.adventurer;
            switch (reward.type) {
                case STS.RewardType.Gold: {
                    var addedGold = reward.gold;
                    adventurer.addGold(addedGold);
                    var ret = {
                        type: STS.ActionType.AddGold,
                        addedGold: addedGold,
                        curGold: adventurer.getGold(),
                    };
                    return ret;
                }
                case STS.RewardType.Card: {
                    var cards = reward.cards;
                    if (!cards || !cards[subIdx]) {
                        log.e("奖励里没有选择的卡牌索引");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var card = adventurer.addCard(adventurer.genLocalId(), cards[subIdx].name, cards[subIdx].level);
                    var ret = {
                        type: STS.ActionType.AddCards,
                        cards: [card.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Potion: {
                    if (!reward.potion) {
                        log.e("奖励里没有药剂");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var potion = adventurer.addPotion(adventurer.genLocalId(), reward.potion);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        potions: [potion.serialize()],
                    };
                    return ret;
                }
                case STS.RewardType.Relic: {
                    if (!reward.relic) {
                        log.e("奖励里没有遗物");
                        return {
                            type: STS.ActionType.None,
                        };
                    }
                    var relic = adventurer.addRelic(adventurer.genLocalId(), reward.relic, 0);
                    var ret = {
                        type: STS.ActionType.AddPotions,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
        };
        TreasureRoom.prototype.getCurrentEventInfo = function () {
            if (!this.rewards) {
                this.rewards = [
                    { type: STS.RewardType.Gold, gold: 30 },
                    { type: STS.RewardType.Relic, relic: STS.BurningBlood.getName() },
                    { type: STS.RewardType.Potion, potion: STS.Gangtiemoyao.getName() },
                    { type: STS.RewardType.Card, cards: [
                            {
                                name: STS.ZhuajiCard.getName(),
                                level: 0,
                            },
                            {
                                name: STS.HoupiCard.getName(),
                                level: 0,
                            },
                            {
                                name: STS.ZhuajiCard.getName(),
                                level: 0,
                            },
                        ] },
                ];
            }
            return {
                type: STS.EventType.Treasure,
                finished: this.finished,
                rewards: this.rewards,
            };
        };
        TreasureRoom.prototype.onPlayerEnter = function (dungeon) {
            _super.prototype.onPlayerEnter.call(this, dungeon);
            this.finished = true;
            return this.getCurrentEventInfo();
        };
        return TreasureRoom;
    }(STS.BaseRoom));
    STS.TreasureRoom = TreasureRoom;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RelicRarity;
    (function (RelicRarity) {
        RelicRarity["Common"] = "Common";
        RelicRarity["Uncommon"] = "Uncommon";
        RelicRarity["Rare"] = "Rare";
        RelicRarity["Shop"] = "Shop";
        RelicRarity["Boss"] = "Boss";
    })(RelicRarity = STS.RelicRarity || (STS.RelicRarity = {}));
    var RelicEventType;
    (function (RelicEventType) {
        RelicEventType["Trigger"] = "Trigger";
    })(RelicEventType = STS.RelicEventType || (STS.RelicEventType = {}));
    STS.RelicLibrary = {};
    STS.RelicClassRarityMap = {};
    function RelicDefine(target) {
        tbgame.FakeName.createFakeNameForClass(target);
        STS.RelicLibrary[target.name] = target;
        var classRelics = STS.RelicClassRarityMap[target.classType];
        if (!classRelics) {
            classRelics = {};
            STS.RelicClassRarityMap[target.classType] = classRelics;
        }
        if (!classRelics[target.rarity]) {
            classRelics[target.rarity] = {};
        }
        classRelics[target.rarity][target.name] = target;
    }
    STS.RelicDefine = RelicDefine;
    var BaseRelic = (function (_super) {
        __extends(BaseRelic, _super);
        function BaseRelic() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseRelic.prototype.serialize = function () {
            return {
                id: this.id,
                name: this.getName(),
                counter: this.counter,
            };
        };
        BaseRelic.prototype.setOwner = function (owner) {
            this.owner = owner;
        };
        BaseRelic.prototype.onInit = function () {
        };
        BaseRelic.create = function (id, name, counter) {
            var relicType = STS.RelicLibrary[name];
            if (!relicType) {
                log.e("遗物不存在" + name);
                return null;
            }
            var relic = new relicType();
            relic.id = id;
            relic.counter = counter;
            return relic;
        };
        BaseRelic.prototype.trigger = function () {
            this.emit(RelicEventType.Trigger);
        };
        BaseRelic.prototype.addCounter = function (v) {
            var old = this.counter;
            this.counter += v;
        };
        BaseRelic.prototype.subCounter = function (v) {
            var old = this.counter;
            this.counter -= v;
        };
        BaseRelic.prototype.getActionManager = function () {
            return this.owner.battle.actionManager;
        };
        BaseRelic.prototype.onStartCombat = function () {
        };
        BaseRelic.prototype.onEndCombat = function (type) {
        };
        return BaseRelic;
    }(tbgame.FakeName));
    STS.BaseRelic = BaseRelic;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AbandonedCab = (function (_super) {
        __extends(AbandonedCab, _super);
        function AbandonedCab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "langrenbeij";
            _this.text = "desc";
            _this.options = ["apple", "sugar", "sacred"];
            _this.hp = 26;
            _this.maxhp = 5;
            return _this;
        }
        AbandonedCab.prototype.chooseOption = function (opid, adventurer) {
            switch (opid) {
                case 0: {
                    adventurer.heal(this.hp);
                    var ret = {
                        type: STS.ActionType.AddHP,
                        addedHp: this.hp,
                        curHp: adventurer.hp,
                    };
                    return ret;
                }
                case 1: {
                    adventurer.addMaxHp(this.maxhp);
                    var ret = {
                        type: STS.ActionType.AddMaxHP,
                        addedMaxHp: this.maxhp,
                        curMaxHp: adventurer.maxhp,
                    };
                    return ret;
                }
                case 2: {
                    var idx = adventurer.relicRng.index(adventurer.info.commonRelics);
                    if (idx == -1) {
                        log.e("没找到有效遗物");
                        return;
                    }
                    var name = adventurer.info.commonRelics[idx];
                    var relic = adventurer.addRelic(adventurer.genLocalId(), name, 0);
                    var ret = {
                        type: STS.ActionType.AddRelics,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
        };
        AbandonedCab = __decorate([
            STS.EventDefine
        ], AbandonedCab);
        return AbandonedCab;
    }(STS.StoryEvent));
    STS.AbandonedCab = AbandonedCab;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Breakfast = (function (_super) {
        __extends(Breakfast, _super);
        function Breakfast() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Breakfast = __decorate([
            STS.EventDefine
        ], Breakfast);
        return Breakfast;
    }(STS.StoryEvent));
    STS.Breakfast = Breakfast;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Meal = (function (_super) {
        __extends(Meal, _super);
        function Meal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Meal.prototype.serialize = function () {
            return {
                type: STS.EventType.Story,
            };
        };
        Meal.prototype.onEnterRoom = function (dungeon) {
            return null;
        };
        Meal = __decorate([
            STS.EventDefine
        ], Meal);
        return Meal;
    }(STS.BaseEvent));
    STS.Meal = Meal;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var WomenInStable = (function (_super) {
        __extends(WomenInStable, _super);
        function WomenInStable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "jinruyoux1";
            _this.text = "desc";
            _this.options = ["heal", "purge", "leave"];
            _this.hp = 20;
            _this.maxhp = 5;
            return _this;
        }
        WomenInStable.prototype.chooseOption = function (opid, adventurer) {
            switch (opid) {
                case 0: {
                    adventurer.heal(this.hp);
                    var ret = {
                        type: STS.ActionType.AddHP,
                        addedHp: this.hp,
                        curHp: adventurer.hp,
                    };
                    return ret;
                }
                case 1: {
                    adventurer.addMaxHp(this.maxhp);
                    var ret = {
                        type: STS.ActionType.AddMaxHP,
                        addedMaxHp: this.maxhp,
                        curMaxHp: adventurer.maxhp,
                    };
                    return ret;
                }
                case 2: {
                    var idx = adventurer.relicRng.index(adventurer.info.commonRelics);
                    if (idx == -1) {
                        log.e("没找到有效遗物");
                        return;
                    }
                    var name = adventurer.info.commonRelics[idx];
                    var relic = adventurer.addRelic(adventurer.genLocalId(), name, 0);
                    var ret = {
                        type: STS.ActionType.AddRelics,
                        relics: [relic.serialize()],
                    };
                    return ret;
                }
            }
        };
        WomenInStable = __decorate([
            STS.EventDefine
        ], WomenInStable);
        return WomenInStable;
    }(STS.StoryEvent));
    STS.WomenInStable = WomenInStable;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var FountainOfCurseRemoval = (function (_super) {
        __extends(FountainOfCurseRemoval, _super);
        function FountainOfCurseRemoval() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.options = ["1", "2", "3"];
            return _this;
        }
        FountainOfCurseRemoval = __decorate([
            STS.EventDefine
        ], FountainOfCurseRemoval);
        return FountainOfCurseRemoval;
    }(STS.StoryEvent));
    STS.FountainOfCurseRemoval = FountainOfCurseRemoval;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Baoliemoyao = (function (_super) {
        __extends(Baoliemoyao, _super);
        function Baoliemoyao() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.damage = 20;
            return _this;
        }
        Baoliemoyao.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.damage, this.owner, monster, STS.AttackEffect.FIRE, STS.DamageType.NORMAL, true)));
        };
        Baoliemoyao.res = "ui_017.png";
        Baoliemoyao = __decorate([
            STS.PotionDefine
        ], Baoliemoyao);
        return Baoliemoyao;
    }(STS.BasePotion));
    STS.Baoliemoyao = Baoliemoyao;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Gangtiemoyao = (function (_super) {
        __extends(Gangtiemoyao, _super);
        function Gangtiemoyao() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.block = 12;
            return _this;
        }
        Gangtiemoyao.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.block));
        };
        Gangtiemoyao.res = "yaoji111";
        Gangtiemoyao = __decorate([
            STS.PotionDefine
        ], Gangtiemoyao);
        return Gangtiemoyao;
    }(STS.BasePotion));
    STS.Gangtiemoyao = Gangtiemoyao;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Wushumoyao = (function (_super) {
        __extends(Wushumoyao, _super);
        function Wushumoyao() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 3;
            return _this;
        }
        Wushumoyao.prototype.use = function (monster) {
            this.getActionManager().addToBottom(new STS.DrawCard(this.amount));
        };
        Wushumoyao.res = "yaoji222";
        Wushumoyao = __decorate([
            STS.PotionDefine
        ], Wushumoyao);
        return Wushumoyao;
    }(STS.BasePotion));
    STS.Wushumoyao = Wushumoyao;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var info0 = {
        startLevel: 0,
        maxhpRange: [28, 32],
        SlimeDamage: 7,
        NormalDamage: 10,
    };
    var info2 = util.assign(info0, {
        startLevel: 2,
        SlimeDamage: 8,
        NormalDamage: 12,
    });
    var info7 = util.assign(info2, {
        startLevel: 7,
        maxhpRange: [29, 34],
    });
    var MoveState;
    (function (MoveState) {
        MoveState[MoveState["NormalAttack"] = 0] = "NormalAttack";
        MoveState[MoveState["WeakAttack"] = 1] = "WeakAttack";
        MoveState[MoveState["SlimeAttack"] = 2] = "SlimeAttack";
    })(MoveState || (MoveState = {}));
    var MoveMsg = {
        NormalAttack: "AcidSlime_M.NormalAttack",
        SlimeAttack: "AcidSlime_M.SlimeAttack",
        WeakAttack: "AcidSlime_M.WeakAttack",
    };
    var AcidSlime_M = (function (_super) {
        __extends(AcidSlime_M, _super);
        function AcidSlime_M() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "Prefabs/Monsters/AcidSlime_M";
            _this.type = STS.EnemyType.NORMAL;
            _this.infos = [info0, info2, info7];
            return _this;
        }
        AcidSlime_M.prototype.normalAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.NormalAttack, MoveState.NormalAttack, STS.Intent.ATTACK, info.NormalDamage);
        };
        AcidSlime_M.prototype.slimeAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.SlimeAttack, MoveState.SlimeAttack, STS.Intent.ATTACK_DEBUFF, info.SlimeDamage);
        };
        AcidSlime_M.prototype.weakAttack = function () {
            this.setMove(MoveMsg.WeakAttack, MoveState.WeakAttack, STS.Intent.DEBUFF);
        };
        AcidSlime_M.prototype.getMove = function (num) {
            if (num < 30) {
                if (this.lastTwoMoves(MoveState.SlimeAttack)) {
                    if (this.aiRng.quick() < 0.5) {
                        this.normalAttack();
                    }
                    else {
                        this.weakAttack();
                    }
                }
                else {
                    this.slimeAttack();
                }
            }
            else if (num < 70) {
                if (this.lastMove(MoveState.NormalAttack)) {
                    if (this.aiRng.quick() < 0.4) {
                        this.slimeAttack();
                    }
                    else {
                        this.weakAttack();
                    }
                }
                else {
                    this.normalAttack();
                }
            }
            else if (this.lastTwoMoves(MoveState.WeakAttack)) {
                if (this.aiRng.quick() < 0.4) {
                    this.slimeAttack();
                }
                else {
                    this.normalAttack();
                }
            }
            else {
                this.weakAttack();
            }
        };
        AcidSlime_M.prototype.takeTurn = function () {
            var info = this.getLevelInfo();
            var player = this.battle.player;
            switch (this.nextMove) {
                case MoveState.NormalAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.NormalDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
                case MoveState.WeakAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.AddPower(player, STS.WeakPower, 1));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
                case MoveState.SlimeAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.SlimeDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                        this.getActionManager().addToBottom(new STS.MakeCardInDiscard(STS.SlimeCard, 1));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
            }
        };
        AcidSlime_M = __decorate([
            STS.MonsterDefine
        ], AcidSlime_M);
        return AcidSlime_M;
    }(STS.BaseMonster));
    STS.AcidSlime_M = AcidSlime_M;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var info0 = {
        startLevel: 0,
        maxhpRange: [8, 12],
        NormalDamage: 3,
    };
    var info2 = util.assign(info0, {
        startLevel: 2,
        NormalDamage: 4,
    });
    var info7 = util.assign(info2, {
        startLevel: 7,
        maxhpRange: [9, 13],
    });
    var MoveState;
    (function (MoveState) {
        MoveState[MoveState["NormalAttack"] = 0] = "NormalAttack";
        MoveState[MoveState["WeakAttack"] = 1] = "WeakAttack";
    })(MoveState || (MoveState = {}));
    var MoveMsg = {
        NormalAttack: "AcidSlime_S.NormalAttack",
        WeakAttack: "AcidSlime_S.WeakAttack",
    };
    var AcidSlime_S = (function (_super) {
        __extends(AcidSlime_S, _super);
        function AcidSlime_S() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "Prefabs/Monsters/AcidSlime_S";
            _this.type = STS.EnemyType.NORMAL;
            _this.infos = [info0, info2, info7];
            return _this;
        }
        AcidSlime_S.prototype.normalAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.NormalAttack, MoveState.NormalAttack, STS.Intent.ATTACK, info.NormalDamage);
        };
        AcidSlime_S.prototype.weakAttack = function () {
            this.setMove(MoveMsg.WeakAttack, MoveState.WeakAttack, STS.Intent.DEBUFF);
        };
        AcidSlime_S.prototype.getMove = function (num) {
            if (num < 50) {
                this.normalAttack();
            }
            else {
                this.weakAttack();
            }
        };
        AcidSlime_S.prototype.takeTurn = function () {
            var info = this.getLevelInfo();
            var player = this.battle.player;
            switch (this.nextMove) {
                case MoveState.NormalAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.NormalDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                        this.weakAttack();
                    }
                    break;
                case MoveState.WeakAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.AddPower(player, STS.WeakPower, 1));
                        this.normalAttack();
                    }
                    break;
            }
        };
        AcidSlime_S = __decorate([
            STS.MonsterDefine
        ], AcidSlime_S);
        return AcidSlime_S;
    }(STS.BaseMonster));
    STS.AcidSlime_S = AcidSlime_S;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var info0 = {
        startLevel: 0,
        maxhpRange: [82, 86],
        BashDamage: 6,
        RushDamage: 14,
    };
    var info3 = util.assign(info0, {
        startLevel: 3,
        BashDamage: 8,
        RushDamage: 16,
    });
    var info8 = util.assign(info3, {
        startLevel: 8,
        maxhpRange: [85, 90],
    });
    var MoveState;
    (function (MoveState) {
        MoveState[MoveState["NormalAttack"] = 0] = "NormalAttack";
        MoveState[MoveState["VunerableAttack"] = 1] = "VunerableAttack";
        MoveState[MoveState["Roar"] = 2] = "Roar";
    })(MoveState || (MoveState = {}));
    var TalkMsg = "Fengkuanglianjinshi.Talk";
    var MoveMsg = {
        NormalAttack: "Fengkuanglianjinshi.NormalAttack",
        VunerableAttack: "Fengkuanglianjinshi.VunerableAttack",
        Roar: "Fengkuanglianjinshi.Roar",
    };
    var Fengkuanglianjinshi = (function (_super) {
        __extends(Fengkuanglianjinshi, _super);
        function Fengkuanglianjinshi() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "Prefabs/Monsters/Fengkuanglianjinshi";
            _this.type = STS.EnemyType.ELITE;
            _this.infos = [info0, info3, info8];
            return _this;
        }
        Fengkuanglianjinshi.prototype.roar = function () {
            this.setMove(MoveMsg.Roar, MoveState.Roar, STS.Intent.BUFF);
        };
        Fengkuanglianjinshi.prototype.vunerableAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.VunerableAttack, MoveState.NormalAttack, STS.Intent.ATTACK_DEBUFF, info.BashDamage);
        };
        Fengkuanglianjinshi.prototype.normalAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.NormalAttack, MoveState.NormalAttack, STS.Intent.ATTACK, info.RushDamage);
        };
        Fengkuanglianjinshi.prototype.getMove = function (num) {
            if (!this.usedBellow) {
                this.usedBellow = true;
                this.roar();
                return;
            }
            if (num < 33) {
                this.vunerableAttack();
            }
            else if (this.lastTwoMoves(MoveState.NormalAttack)) {
                this.vunerableAttack();
            }
            else {
                this.normalAttack();
            }
        };
        Fengkuanglianjinshi.prototype.takeTurn = function () {
            var player = this.battle.player;
            var info = this.getLevelInfo();
            switch (this.nextMove) {
                case MoveState.Roar:
                    {
                        this.dialog(TalkMsg);
                        this.getActionManager().addToBottom(new STS.AddPower(this, STS.AngerPower, 2));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
                case MoveState.NormalAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.RushDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
                case MoveState.VunerableAttack:
                    {
                        this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.BashDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                        this.getActionManager().addToBottom(new STS.AddPower(player, STS.VulnerablePower, 2));
                        this.getActionManager().addToBottom(new STS.RollMove(this));
                    }
                    break;
            }
        };
        Fengkuanglianjinshi = __decorate([
            STS.MonsterDefine
        ], Fengkuanglianjinshi);
        return Fengkuanglianjinshi;
    }(STS.BaseMonster));
    STS.Fengkuanglianjinshi = Fengkuanglianjinshi;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var info0 = {
        startLevel: 0,
        maxhpRange: [240, 240],
        WhirlwindDamage: 5,
        twinSlamDamage: 8,
        WhirlwindCount: 4,
        DefensiveBlock: 20,
        BlockAmount: 9,
        ThronsDamage: 3,
        VentDefbuff: 2,
        RollDamage: 9,
        FierceBashDamage: 32,
        DmgThresholdIncrease: 10,
        DmgThreshold: 30,
    };
    var info4 = util.assign(info0, {
        startLevel: 4,
        FierceBashDamage: 36,
        RollDamage: 10,
    });
    var info9 = util.assign(info4, {
        startLevel: 9,
        DmgThreshold: 32,
        maxhpRange: [250, 250],
    });
    var MsgCloseUp = "Jiancijukou.CloseUp";
    var MsgChargeUp = "Jiancijukou.ChargeUp";
    var MoveMsg = {
        CloseUP: "Jiancijukou.CloseUP",
        FierceBash: "Jiancijukou.FierceBash",
        VentSteam: "Jiancijukou.VentSteam",
        RollAttack: "Jiancijukou.RollAttack",
        TwinSmash: "Jiancijukou.TwinSmash",
        Whirlwind: "Jiancijukou.Whirlwind",
        ChargeUp: "Jiancijukou.ChargeUp",
    };
    var MoveState;
    (function (MoveState) {
        MoveState[MoveState["CloseUp"] = 0] = "CloseUp";
        MoveState[MoveState["FierceBash"] = 1] = "FierceBash";
        MoveState[MoveState["VentSteam"] = 2] = "VentSteam";
        MoveState[MoveState["RollAttack"] = 3] = "RollAttack";
        MoveState[MoveState["TwinSmash"] = 4] = "TwinSmash";
        MoveState[MoveState["Whirlwind"] = 5] = "Whirlwind";
        MoveState[MoveState["ChargeUp"] = 6] = "ChargeUp";
    })(MoveState || (MoveState = {}));
    var MonsterState;
    (function (MonsterState) {
        MonsterState["ResetThreshold"] = "ResetThreshold";
        MonsterState["DefensiveMode"] = "DefensiveMode";
        MonsterState["OffensiveMode"] = "OffensiveMode";
    })(MonsterState || (MonsterState = {}));
    var Jiancijukou = (function (_super) {
        __extends(Jiancijukou, _super);
        function Jiancijukou() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.res = "Prefabs/Monsters/Jiancijukou";
            _this.type = STS.EnemyType.BOSS;
            _this.isOpen = true;
            _this.closeUpTriggered = false;
            _this.infos = [info0, info4, info9];
            return _this;
        }
        Jiancijukou.prototype.getMove = function (num) {
            if (this.isOpen) {
                this.chargeUp();
            }
            else {
                this.rollAttack();
            }
        };
        Jiancijukou.prototype.closeUp = function () {
            this.setMove(MoveMsg.CloseUP, MoveState.CloseUp, STS.Intent.BUFF);
        };
        Jiancijukou.prototype.fierceBash = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.FierceBash, MoveState.FierceBash, STS.Intent.ATTACK, info.FierceBashDamage);
        };
        Jiancijukou.prototype.ventSteam = function () {
            this.setMove(MoveMsg.VentSteam, MoveState.VentSteam, STS.Intent.STRONG_DEBUFF);
        };
        Jiancijukou.prototype.rollAttack = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.RollAttack, MoveState.RollAttack, STS.Intent.ATTACK, info.RollDamage);
        };
        Jiancijukou.prototype.twinSmash = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.TwinSmash, MoveState.TwinSmash, STS.Intent.ATTACK_BUFF, info.twinSlamDamage, 2, true);
        };
        Jiancijukou.prototype.whirlwind = function () {
            var info = this.getLevelInfo();
            this.setMove(MoveMsg.Whirlwind, MoveState.Whirlwind, STS.Intent.ATTACK, info.WhirlwindDamage, info.WhirlwindCount, true);
        };
        Jiancijukou.prototype.chargeUp = function () {
            this.setMove(MoveMsg.ChargeUp, MoveState.ChargeUp, STS.Intent.DEFEND_BUFF);
        };
        Jiancijukou.prototype.usePreBattleAction = function () {
            this.dmgThreshold = this.getLevelInfo().DmgThreshold;
            this.getActionManager().addToBottom(new STS.AddPower(this, ModeShiftPower, this.dmgThreshold));
            this.getActionManager().addToBottom(new STS.ChangeState(this, MonsterState.ResetThreshold));
        };
        Jiancijukou.prototype.changeState = function (state) {
            var info = this.getLevelInfo();
            _super.prototype.changeState.call(this, state);
            switch (state) {
                case MonsterState.ResetThreshold:
                    {
                    }
                    break;
                case MonsterState.DefensiveMode:
                    {
                        this.getActionManager().addToBottom(new STS.RemovePowerByType(this, ModeShiftPower));
                        this.getActionManager().addToBottom(new STS.GainBlock(this, info.DefensiveBlock));
                        this.dmgThreshold += info.DmgThresholdIncrease;
                        this.closeUp();
                        this.isOpen = false;
                    }
                    break;
                case MonsterState.OffensiveMode:
                    {
                        this.getActionManager().addToBottom(new STS.AddPower(this, ModeShiftPower, this.dmgThreshold));
                        this.getActionManager().addToBottom(new STS.ChangeState(this, MonsterState.ResetThreshold));
                        if (this.block != 0) {
                            this.getActionManager().addToBottom(new STS.LoseBlock(this, this.block));
                        }
                        this.isOpen = true;
                    }
                    break;
            }
        };
        Jiancijukou.prototype.takeTurn = function () {
            var info = this.getLevelInfo();
            var player = this.battle.player;
            switch (this.nextMove) {
                case MoveState.CloseUp: {
                    this.dialog(MsgCloseUp);
                    this.getActionManager().addToBottom(new STS.AddPower(this, STS.SharpHidePower, info.ThronsDamage));
                    this.rollAttack();
                    break;
                }
                case MoveState.FierceBash: {
                    this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                    this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.FierceBashDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                    this.ventSteam();
                    break;
                }
                case MoveState.VentSteam: {
                    this.getActionManager().addToBottom(new STS.AddPower(player, STS.WeakPower, info.VentDefbuff));
                    this.getActionManager().addToBottom(new STS.AddPower(player, STS.VulnerablePower, info.VentDefbuff));
                    this.whirlwind();
                    break;
                }
                case MoveState.RollAttack: {
                    this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                    this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.RollDamage, this, player, STS.AttackEffect.BLUNT_HEAVY)));
                    this.twinSmash();
                    break;
                }
                case MoveState.TwinSmash: {
                    this.getActionManager().addToBottom(new STS.ChangeState(this, MonsterState.OffensiveMode));
                    this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.twinSlamDamage, this, player, STS.AttackEffect.SLASH_HEAVY)));
                    this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.twinSlamDamage, this, player, STS.AttackEffect.SLASH_HEAVY)));
                    this.getActionManager().addToBottom(new STS.RemovePowerByType(this, STS.SharpHidePower));
                    this.whirlwind();
                    break;
                }
                case MoveState.Whirlwind: {
                    this.getActionManager().addToBottom(new STS.AnimateSlowAttack(this));
                    for (var i = 0; i < info.WhirlwindCount; ++i) {
                        this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(info.WhirlwindDamage, this, player, STS.AttackEffect.NONE)));
                    }
                    this.chargeUp();
                    break;
                }
                case MoveState.ChargeUp: {
                    this.getActionManager().addToBottom(new STS.GainBlock(this, info.BlockAmount));
                    this.dialog(MsgChargeUp);
                    this.fierceBash();
                    break;
                }
            }
        };
        Jiancijukou = __decorate([
            STS.MonsterDefine
        ], Jiancijukou);
        return Jiancijukou;
    }(STS.BaseMonster));
    STS.Jiancijukou = Jiancijukou;
    var ModeShiftPower = (function (_super) {
        __extends(ModeShiftPower, _super);
        function ModeShiftPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        ModeShiftPower.prototype.onInit = function () {
            this.triggered = false;
            this.autoCancel(this.owner.on(STS.CreatureEventType.TookDamage, this.onTookDamage.bind(this)));
        };
        ModeShiftPower.prototype.onTookDamage = function (data, oldhp, hpDamage, blockedDamage) {
            if (this.triggered) {
                return;
            }
            if (hpDamage > 0) {
                if (this.amount > hpDamage) {
                    this.subAmount(hpDamage);
                }
                else {
                    this.subAmount(this.amount);
                    this.triggered = true;
                    this.getActionManager().addToBottom(new STS.ChangeState(this.owner, MonsterState.DefensiveMode));
                }
            }
        };
        ModeShiftPower = __decorate([
            STS.PowerDefine
        ], ModeShiftPower);
        return ModeShiftPower;
    }(STS.BasePower));
    STS.ModeShiftPower = ModeShiftPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var AngerPower = (function (_super) {
        __extends(AngerPower, _super);
        function AngerPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        AngerPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        AngerPower.prototype.onUseCard = function (card) {
            if (card.getInfo().type == STS.CardType.Skill) {
                this.trigger();
                this.getActionManager().addToTop(new STS.AddPower(this.owner, STS.StrengthPower, this.amount));
            }
        };
        AngerPower = __decorate([
            STS.PowerDefine
        ], AngerPower);
        return AngerPower;
    }(STS.BasePower));
    STS.AngerPower = AngerPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ArtifactPower = (function (_super) {
        __extends(ArtifactPower, _super);
        function ArtifactPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        ArtifactPower_1 = ArtifactPower;
        ArtifactPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.addValueProcesser(STS.ValueProcessType.PowerAmountAdd, this.onPowerAmountAdd.bind(this)));
        };
        ArtifactPower.prototype.onPowerAmountAdd = function (amount, power) {
            if (power.type == STS.PowerType.DEBUFF) {
                this.trigger();
                if (this.amount > amount) {
                    amount = 0;
                    this.getActionManager().addToTop(new STS.ReducePower(this.owner, ArtifactPower_1, amount));
                }
                else {
                    amount = amount - this.amount;
                    this.getActionManager().addToTop(new STS.RemovePower(this));
                }
            }
            return amount;
        };
        ArtifactPower = ArtifactPower_1 = __decorate([
            STS.PowerDefine
        ], ArtifactPower);
        return ArtifactPower;
        var ArtifactPower_1;
    }(STS.BasePower));
    STS.ArtifactPower = ArtifactPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BarricadePower = (function (_super) {
        __extends(BarricadePower, _super);
        function BarricadePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        BarricadePower = __decorate([
            STS.PowerDefine
        ], BarricadePower);
        return BarricadePower;
    }(STS.BasePower));
    STS.BarricadePower = BarricadePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ConfusionPower = (function (_super) {
        __extends(ConfusionPower, _super);
        function ConfusionPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        ConfusionPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.DrawCard, this.onEvent.bind(this)));
        };
        ConfusionPower.prototype.onEvent = function (bard) {
        };
        ConfusionPower = __decorate([
            STS.PowerDefine
        ], ConfusionPower);
        return ConfusionPower;
    }(STS.BasePower));
    STS.ConfusionPower = ConfusionPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ConstrictedPower = (function (_super) {
        __extends(ConstrictedPower, _super);
        function ConstrictedPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        ConstrictedPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
        };
        ConstrictedPower.prototype.onEndTurn = function () {
            this.trigger();
            this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.amount, this.owner, this.owner, STS.AttackEffect.FIRE, STS.DamageType.THORNS)));
        };
        ConstrictedPower = __decorate([
            STS.PowerDefine
        ], ConstrictedPower);
        return ConstrictedPower;
    }(STS.BasePower));
    STS.ConstrictedPower = ConstrictedPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CuriosityPower = (function (_super) {
        __extends(CuriosityPower, _super);
        function CuriosityPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        CuriosityPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        CuriosityPower.prototype.onUseCard = function (card) {
            if (card.getInfo().type == STS.CardType.Power) {
                this.trigger();
                this.getActionManager().addToTop(new STS.AddPower(this.owner, STS.StrengthPower, this.amount));
            }
        };
        CuriosityPower = __decorate([
            STS.PowerDefine
        ], CuriosityPower);
        return CuriosityPower;
    }(STS.BasePower));
    STS.CuriosityPower = CuriosityPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var CurlUp = (function (_super) {
        __extends(CurlUp, _super);
        function CurlUp() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            _this.triggered = false;
            return _this;
        }
        CurlUp.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.CreatureEventType.TookDamage, this.onEvent.bind(this)));
        };
        CurlUp.prototype.onEvent = function (info, old, hpDamage, blockedDamage) {
            if (!this.triggered && this.owner.hp > 0 && hpDamage > 0 && info.owner != null && info.type == STS.DamageType.NORMAL) {
                this.triggered = true;
                this.trigger();
                this.getActionManager().addToBottom(new STS.ChangeState(this.owner, "CLOSED"));
                this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.amount));
                this.getActionManager().addToBottom(new STS.RemovePower(this));
            }
        };
        CurlUp = __decorate([
            STS.PowerDefine
        ], CurlUp);
        return CurlUp;
    }(STS.BasePower));
    STS.CurlUp = CurlUp;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DialogMsg = "DancePower.Talk";
    var DancePower = (function (_super) {
        __extends(DancePower, _super);
        function DancePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            return _this;
        }
        DancePower.prototype.onInit = function () {
            this.firstTurnApplied = true;
            this.checkCardType = STS.CardType.Skill;
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.StartTurn, this.onStartTurn.bind(this)));
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        DancePower.prototype.onStartTurn = function () {
            if (this.firstTurnApplied) {
                this.firstTurnApplied = false;
            }
            else {
                if (this.checkCardType == STS.CardType.Skill) {
                    this.checkCardType = STS.CardType.Attack;
                }
                else {
                    this.checkCardType = STS.CardType.Skill;
                }
                this.trigger();
            }
        };
        DancePower.prototype.onUseCard = function (card) {
            if (card.getInfo().type != this.checkCardType) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.amount, this.owner, this.owner, STS.AttackEffect.FIRE, STS.DamageType.THORNS)));
                this.addAmount(1);
                this.owner.dialog(DialogMsg);
            }
        };
        DancePower = __decorate([
            STS.PowerDefine
        ], DancePower);
        return DancePower;
    }(STS.BasePower));
    STS.DancePower = DancePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DexterityPower = (function (_super) {
        __extends(DexterityPower, _super);
        function DexterityPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        DexterityPower.prototype.onInit = function () {
            this.autoCancel(this.owner.addValueProcesser(STS.ValueProcessType.BlockRecieve, this.blockRecieve.bind(this)));
        };
        DexterityPower.prototype.addAmount = function (amount) {
            var old = this.amount;
            this.amount += amount;
            this.makeAmountValid();
            this.emit(STS.PowerEventType.PowerAmountAdd, amount, old);
        };
        DexterityPower.prototype.subAmount = function (amount) {
            var old = this.amount;
            this.amount -= amount;
            this.makeAmountValid();
            this.emit(STS.PowerEventType.PowerAmountSub, amount, old);
        };
        DexterityPower.prototype.makeAmountValid = function () {
            if (this.amount == 0) {
                this.getActionManager().addToTop(new STS.RemovePower(this));
            }
            if (this.amount > 999) {
                this.amount = 999;
            }
            if (this.amount < -999) {
                this.amount = -999;
            }
        };
        DexterityPower.prototype.blockRecieve = function (v) {
            v = v + this.amount;
            if (v < 0) {
                return 0;
            }
            return v;
        };
        DexterityPower = __decorate([
            STS.PowerDefine
        ], DexterityPower);
        return DexterityPower;
    }(STS.BasePower));
    STS.DexterityPower = DexterityPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var DrawReductionPower = (function (_super) {
        __extends(DrawReductionPower, _super);
        function DrawReductionPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            return _this;
        }
        DrawReductionPower.prototype.onInit = function () {
            this.owner.battle.player.turnCardDrawNum--;
        };
        DrawReductionPower.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            this.owner.battle.player.turnCardDrawNum++;
        };
        DrawReductionPower = __decorate([
            STS.PowerDefine
        ], DrawReductionPower);
        return DrawReductionPower;
    }(STS.TurnBasePower));
    STS.DrawReductionPower = DrawReductionPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var EntanglePower = (function (_super) {
        __extends(EntanglePower, _super);
        function EntanglePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            return _this;
        }
        EntanglePower.prototype.onInit = function () {
        };
        EntanglePower = __decorate([
            STS.PowerDefine
        ], EntanglePower);
        return EntanglePower;
    }(STS.TurnBasePower));
    STS.EntanglePower = EntanglePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ExplosivePower = (function (_super) {
        __extends(ExplosivePower, _super);
        function ExplosivePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            _this.damage = 30;
            return _this;
        }
        ExplosivePower_1 = ExplosivePower;
        ExplosivePower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.StartTurn, this.onStartTurn.bind(this)));
        };
        ExplosivePower.prototype.onStartTurn = function () {
            if (this.amount == 1) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.Damage(new STS.DamageData(this.damage, this.owner, this.owner.battle.player, STS.AttackEffect.FIRE, STS.DamageType.THORNS)));
                this.getActionManager().addToBottom(new STS.Suicide(this.owner));
            }
            else {
                this.getActionManager().addToBottom(new STS.ReducePower(this.owner, ExplosivePower_1, 1));
            }
        };
        ExplosivePower = ExplosivePower_1 = __decorate([
            STS.PowerDefine
        ], ExplosivePower);
        return ExplosivePower;
        var ExplosivePower_1;
    }(STS.BasePower));
    STS.ExplosivePower = ExplosivePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var FrailPower = (function (_super) {
        __extends(FrailPower, _super);
        function FrailPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            _this.value = 3 / 4;
            return _this;
        }
        FrailPower.prototype.onInit = function () {
            this.autoCancel(this.owner.addValueProcesser(STS.ValueProcessType.BlockRecieve, this.onEvent.bind(this)));
        };
        FrailPower.prototype.onEvent = function (v) {
            return v * this.value;
        };
        FrailPower = __decorate([
            STS.PowerDefine
        ], FrailPower);
        return FrailPower;
    }(STS.TurnBasePower));
    STS.FrailPower = FrailPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var GenericStrengthUpPower = (function (_super) {
        __extends(GenericStrengthUpPower, _super);
        function GenericStrengthUpPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        GenericStrengthUpPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
        };
        GenericStrengthUpPower.prototype.onEndTurn = function () {
            this.trigger();
            this.getActionManager().addToBottom(new STS.AddPower(this.owner, STS.StrengthPower, this.amount));
        };
        GenericStrengthUpPower = __decorate([
            STS.PowerDefine
        ], GenericStrengthUpPower);
        return GenericStrengthUpPower;
    }(STS.BasePower));
    STS.GenericStrengthUpPower = GenericStrengthUpPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var HexPower = (function (_super) {
        __extends(HexPower, _super);
        function HexPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            return _this;
        }
        HexPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        HexPower.prototype.onUseCard = function (card) {
            if (card.getInfo().type == STS.CardType.Attack) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.MakeCardInDiscard(STS.DazedCard, this.amount));
            }
        };
        HexPower = __decorate([
            STS.PowerDefine
        ], HexPower);
        return HexPower;
    }(STS.BasePower));
    STS.HexPower = HexPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MalleablePower = (function (_super) {
        __extends(MalleablePower, _super);
        function MalleablePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        MalleablePower.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.CreatureEventType.TookDamage, this.onEvent.bind(this)));
        };
        MalleablePower.prototype.onEvent = function (info, old, hpDamage, blockedDamage) {
            if (this.owner.hp > 0 && hpDamage > 0 && info.owner != null && info.type == STS.DamageType.NORMAL) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.amount));
                this.addAmount(1);
            }
        };
        MalleablePower = __decorate([
            STS.PowerDefine
        ], MalleablePower);
        return MalleablePower;
    }(STS.BasePower));
    STS.MalleablePower = MalleablePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Metallicize = (function (_super) {
        __extends(Metallicize, _super);
        function Metallicize() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        Metallicize.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
        };
        Metallicize.prototype.onEndTurn = function () {
            this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.amount));
        };
        Metallicize = __decorate([
            STS.PowerDefine
        ], Metallicize);
        return Metallicize;
    }(STS.BasePower));
    STS.Metallicize = Metallicize;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MinionPower = (function (_super) {
        __extends(MinionPower, _super);
        function MinionPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        MinionPower = __decorate([
            STS.PowerDefine
        ], MinionPower);
        return MinionPower;
    }(STS.BasePower));
    STS.MinionPower = MinionPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var PainfulStabsPower = (function (_super) {
        __extends(PainfulStabsPower, _super);
        function PainfulStabsPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        PainfulStabsPower.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.CreatureEventType.DoDamage, this.onEvent.bind(this)));
        };
        PainfulStabsPower.prototype.onEvent = function (info, hpDamage, blockedDamage) {
            if (info.damage > 0) {
                this.getActionManager().addToBottom(new STS.MakeCardInDiscard(STS.WoundCard, 1));
            }
        };
        PainfulStabsPower = __decorate([
            STS.PowerDefine
        ], PainfulStabsPower);
        return PainfulStabsPower;
    }(STS.BasePower));
    STS.PainfulStabsPower = PainfulStabsPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var PlatedArmorPower = (function (_super) {
        __extends(PlatedArmorPower, _super);
        function PlatedArmorPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        PlatedArmorPower_1 = PlatedArmorPower;
        PlatedArmorPower.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.CreatureEventType.TookDamage, this.onEvent.bind(this)));
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
        };
        PlatedArmorPower.prototype.onEvent = function (info, oldHp, hpDamage, blockedDamage) {
            if (info.owner != null && info.type != STS.DamageType.HP_LOSS && info.type != STS.DamageType.THORNS && info.damage > 0) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.ReducePower(this.owner, PlatedArmorPower_1, 1));
            }
        };
        PlatedArmorPower.prototype.onEndTurn = function () {
            this.trigger();
            this.getActionManager().addToBottom(new STS.GainBlock(this.owner, this.amount));
        };
        PlatedArmorPower.prototype.subAmount = function (amount) {
            _super.prototype.subAmount.call(this, amount);
            if (this.amount <= 0) {
                this.getActionManager().addToBottom(new STS.ChangeState(this.owner, "ARMOR_BREAK"));
            }
        };
        PlatedArmorPower = PlatedArmorPower_1 = __decorate([
            STS.PowerDefine
        ], PlatedArmorPower);
        return PlatedArmorPower;
        var PlatedArmorPower_1;
    }(STS.BasePower));
    STS.PlatedArmorPower = PlatedArmorPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RegeneratePower = (function (_super) {
        __extends(RegeneratePower, _super);
        function RegeneratePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        RegeneratePower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
        };
        RegeneratePower.prototype.onEndTurn = function () {
            this.trigger();
            this.getActionManager().addToBottom(new STS.Heal(this.owner, this.owner, this.amount));
        };
        RegeneratePower = __decorate([
            STS.PowerDefine
        ], RegeneratePower);
        return RegeneratePower;
    }(STS.BasePower));
    STS.RegeneratePower = RegeneratePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RegrowPower = (function (_super) {
        __extends(RegrowPower, _super);
        function RegrowPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        RegrowPower = __decorate([
            STS.PowerDefine
        ], RegrowPower);
        return RegrowPower;
    }(STS.BasePower));
    STS.RegrowPower = RegrowPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SharpHidePower = (function (_super) {
        __extends(SharpHidePower, _super);
        function SharpHidePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        SharpHidePower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        SharpHidePower.prototype.onUseCard = function (card) {
            if (card.getInfo().type == STS.CardType.Attack) {
                this.trigger();
                this.getActionManager().addToTop(new STS.Damage(new STS.DamageData(this.amount, this.owner, this.owner.battle.player, STS.AttackEffect.SLASH_HORIZONTAL, STS.DamageType.THORNS)));
            }
        };
        SharpHidePower = __decorate([
            STS.PowerDefine
        ], SharpHidePower);
        return SharpHidePower;
    }(STS.BasePower));
    STS.SharpHidePower = SharpHidePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var SlowPower = (function (_super) {
        __extends(SlowPower, _super);
        function SlowPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            _this.magic = 0.1;
            return _this;
        }
        SlowPower_1 = SlowPower;
        SlowPower.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this)));
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
            this.autoCancel(this.owner.battle.player.addValueProcesser(STS.ValueProcessType.DamageReceive, this.damageReceive.bind(this)));
        };
        SlowPower.prototype.onEndTurn = function () {
            this.amount = 0;
            this.trigger();
        };
        SlowPower.prototype.onUseCard = function (card) {
            this.getActionManager().addToBottom(new STS.AddPower(this.owner, SlowPower_1, 1));
        };
        SlowPower.prototype.damageReceive = function (v, info) {
            if (info.type == STS.DamageType.NORMAL) {
                return v * (1 + this.amount * this.magic);
            }
            return v;
        };
        SlowPower = SlowPower_1 = __decorate([
            STS.PowerDefine
        ], SlowPower);
        return SlowPower;
        var SlowPower_1;
    }(STS.BasePower));
    STS.SlowPower = SlowPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var StrengthPower = (function (_super) {
        __extends(StrengthPower, _super);
        function StrengthPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        StrengthPower.prototype.onInit = function () {
            this.autoCancel(this.owner.addValueProcesser(STS.ValueProcessType.DamageGive, this.damageGive.bind(this)));
        };
        StrengthPower.prototype.damageGive = function (v, info) {
            return v + this.amount;
        };
        StrengthPower = __decorate([
            STS.PowerDefine
        ], StrengthPower);
        return StrengthPower;
    }(STS.TurnBasePower));
    STS.StrengthPower = StrengthPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var ThornsPower = (function (_super) {
        __extends(ThornsPower, _super);
        function ThornsPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        ThornsPower.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.CreatureEventType.TookDamage, this.onEvent.bind(this)));
        };
        ThornsPower.prototype.onEvent = function (info, old, hpDamage, blockedDamage) {
            if (this.owner != info.owner && info.owner != null && info.type == STS.DamageType.NORMAL) {
                this.trigger();
                this.getActionManager().addToTop(new STS.Damage(new STS.DamageData(this.amount, this.owner, info.owner, STS.AttackEffect.SLASH_HORIZONTAL, STS.DamageType.THORNS, true)));
            }
        };
        ThornsPower = __decorate([
            STS.PowerDefine
        ], ThornsPower);
        return ThornsPower;
    }(STS.BasePower));
    STS.ThornsPower = ThornsPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var TimeWarper = (function (_super) {
        __extends(TimeWarper, _super);
        function TimeWarper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            _this.magic = 12;
            return _this;
        }
        TimeWarper.prototype.onInit = function () {
            this.autoCancel(this.owner.battle.player.on(STS.AdventurerEventType.UseCard, this.onUseCard.bind(this)));
        };
        TimeWarper.prototype.onUseCard = function (card) {
            this.addAmount(1);
            if (this.amount < 12) {
                return;
            }
            this.amount = 0;
            var actMgr = this.getActionManager();
            actMgr.cardQueue = [];
            actMgr.addToBottom(new STS.TurnEnd());
            actMgr.addToBottom(new STS.AddPower(this.owner, STS.SlowPower, 1));
            this.owner.battle.monsters.forEach(function (m) {
                actMgr.addToBottom(new STS.AddPower(m, STS.StrengthPower, 2));
            });
        };
        TimeWarper = __decorate([
            STS.PowerDefine
        ], TimeWarper);
        return TimeWarper;
    }(STS.BasePower));
    STS.TimeWarper = TimeWarper;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var UnawakenedPower = (function (_super) {
        __extends(UnawakenedPower, _super);
        function UnawakenedPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.BUFF;
            return _this;
        }
        UnawakenedPower = __decorate([
            STS.PowerDefine
        ], UnawakenedPower);
        return UnawakenedPower;
    }(STS.BasePower));
    STS.UnawakenedPower = UnawakenedPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var VulnerablePower = (function (_super) {
        __extends(VulnerablePower, _super);
        function VulnerablePower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            _this.magic = 0.5;
            return _this;
        }
        VulnerablePower.prototype.onInit = function () {
            this.autoCancel(this.owner.addValueProcesser(STS.ValueProcessType.DamageReceive, this.onEvent.bind(this)));
        };
        VulnerablePower.prototype.onEvent = function (v, info) {
            return v * (1 + this.magic);
        };
        VulnerablePower = __decorate([
            STS.PowerDefine
        ], VulnerablePower);
        return VulnerablePower;
    }(STS.TurnBasePower));
    STS.VulnerablePower = VulnerablePower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var WeakPower = (function (_super) {
        __extends(WeakPower, _super);
        function WeakPower() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = STS.PowerType.DEBUFF;
            _this.magic = 0.25;
            return _this;
        }
        WeakPower.prototype.onInit = function () {
            this.autoCancel(this.owner.addValueProcesser(STS.ValueProcessType.DamageGive, this.damageGive.bind(this)));
        };
        WeakPower.prototype.damageGive = function (v, info) {
            return v * (1 - this.magic);
        };
        WeakPower = __decorate([
            STS.PowerDefine
        ], WeakPower);
        return WeakPower;
    }(STS.TurnBasePower));
    STS.WeakPower = WeakPower;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BlueCandle = (function (_super) {
        __extends(BlueCandle, _super);
        function BlueCandle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlueCandle = __decorate([
            STS.RelicDefine
        ], BlueCandle);
        return BlueCandle;
    }(STS.BaseRelic));
    STS.BlueCandle = BlueCandle;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Huangshihuizhang = (function (_super) {
        __extends(Huangshihuizhang, _super);
        function Huangshihuizhang() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 1;
            return _this;
        }
        Huangshihuizhang.prototype.onStartCombat = function () {
            this.owner.battle.on(STS.BattleEventType.EndTurn, this.onEndTurn.bind(this));
        };
        Huangshihuizhang.prototype.onEndTurn = function () {
            if (this.owner.cardPlayedThisTurn.getCardTypeNum(STS.CardType.Attack) == 0) {
                this.trigger();
                this.owner.battle.addToNextTurnStart(new STS.GainEnergy(1));
            }
        };
        Huangshihuizhang.res = "huangshihuizhang";
        Huangshihuizhang = __decorate([
            STS.RelicDefine
        ], Huangshihuizhang);
        return Huangshihuizhang;
    }(STS.BaseRelic));
    STS.Huangshihuizhang = Huangshihuizhang;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var LittleStar = (function (_super) {
        __extends(LittleStar, _super);
        function LittleStar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LittleStar = __decorate([
            STS.RelicDefine
        ], LittleStar);
        return LittleStar;
    }(STS.BaseRelic));
    STS.LittleStar = LittleStar;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var MedicalKit = (function (_super) {
        __extends(MedicalKit, _super);
        function MedicalKit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MedicalKit = __decorate([
            STS.RelicDefine
        ], MedicalKit);
        return MedicalKit;
    }(STS.BaseRelic));
    STS.MedicalKit = MedicalKit;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var Yugou = (function (_super) {
        __extends(Yugou, _super);
        function Yugou() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 2;
            return _this;
        }
        Yugou.prototype.onStartCombat = function () {
            if (this.counter > 0) {
                this.trigger();
                this.getActionManager().addToBottom(new STS.GainEnergy(this.counter));
                this.counter = 0;
            }
        };
        Yugou.prototype.onInit = function () {
            this.autoCancel(this.owner.on(STS.AdventurerEventType.EnterRestRoom, this.onEnterRestRoom.bind(this)));
        };
        Yugou.prototype.onEnterRestRoom = function () {
            this.trigger();
            this.counter = this.amount;
        };
        Yugou.res = "yugou";
        Yugou = __decorate([
            STS.RelicDefine
        ], Yugou);
        return Yugou;
    }(STS.BaseRelic));
    STS.Yugou = Yugou;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var RingOfTheSnake = (function (_super) {
        __extends(RingOfTheSnake, _super);
        function RingOfTheSnake() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 2;
            return _this;
        }
        RingOfTheSnake.prototype.onStartCombat = function () {
            this.trigger();
            this.getActionManager().addToBottom(new STS.DrawCard(this.amount));
        };
        RingOfTheSnake.res = "siyecao";
        RingOfTheSnake = __decorate([
            STS.RelicDefine
        ], RingOfTheSnake);
        return RingOfTheSnake;
    }(STS.BaseRelic));
    STS.RingOfTheSnake = RingOfTheSnake;
})(STS || (STS = {}));
var STS;
(function (STS) {
    var BurningBlood = (function (_super) {
        __extends(BurningBlood, _super);
        function BurningBlood() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.amount = 6;
            return _this;
        }
        BurningBlood.prototype.onEndCombat = function (type) {
            this.trigger();
            if (type != STS.BattleEndType.Lose) {
                this.owner.heal(this.amount);
            }
        };
        BurningBlood.res = "yinlangdiaozhui";
        BurningBlood = __decorate([
            STS.RelicDefine
        ], BurningBlood);
        return BurningBlood;
    }(STS.BaseRelic));
    STS.BurningBlood = BurningBlood;
})(STS || (STS = {}));
var STS;
(function (STS) {
    STS.initClassLibrary();
    STS.initSpecialOneTimeEvent();
    STS.initFloorInfo();
})(STS || (STS = {}));

//# sourceMappingURL=tbgame.js.map
