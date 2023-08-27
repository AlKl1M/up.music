this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var AudioPlayer = /*#__PURE__*/function () {
	  function AudioPlayer() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, AudioPlayer);
	    babelHelpers.defineProperty(this, "playing", false);
	    babelHelpers.defineProperty(this, "currentTime", 0.0);
	    babelHelpers.defineProperty(this, "duration", 0);
	    babelHelpers.defineProperty(this, "volume", 0.4);
	    this.rootNodeId = options.rootNodeId;
	    this.trackSrc = options.trackSrc;
	    this.trackName = options.trackName;
	    this.rootNode = document.getElementById(this.rootNodeId);
	    this.currentTime = 0.0;
	    this.render();
	    this.initializeAudio();
	    this.attachEvents();
	  }
	  babelHelpers.createClass(AudioPlayer, [{
	    key: "updateSrc",
	    value: function updateSrc(src) {
	      this.trackSrc = src;
	    }
	  }, {
	    key: "updateName",
	    value: function updateName(name) {
	      if (name.length > 78) {
	        this.trackName = name.slice(0, 78) + '...';
	      } else {
	        this.trackName = name;
	      }
	    }
	  }, {
	    key: "initializeAudio",
	    value: function initializeAudio() {
	      this.volumeBar.value = 0.4;
	      this.audidCtx = new AudioContext();
	      this.track = this.audidCtx.createMediaElementSource(this.audio);
	      this.gainNode = this.audidCtx.createGain();
	      this.track.connect(this.gainNode).connect(this.audidCtx.destination);
	      this.changeVolume();
	    }
	  }, {
	    key: "attachEvents",
	    value: function attachEvents() {
	      var _this = this;
	      this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);
	      this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);
	      this.progressBar.addEventListener('input', function () {
	        _this.seekTo(_this.progressBar.value);
	      }, false);
	      this.audio.addEventListener('loadedmetadata', function () {
	        _this.duration = _this.audio.duration;
	        _this.progressBar.max = _this.duration;
	        var secs = parseInt("".concat(_this.duration % 60), 10);
	        var mins = parseInt("".concat(_this.duration / 60 % 60), 10);
	        var formattedSecs = secs < 10 ? "0".concat(secs) : secs;
	        _this.durationEl.textContent = "".concat(mins, ":").concat(formattedSecs);
	      });
	      this.audio.addEventListener('timeupdate', function () {
	        _this.updateAudioTime(_this.audio.currentTime);
	      });
	      this.audio.addEventListener('ended', function () {
	        _this.playing = false;
	        _this.playPauseBtn.textContent = 'play';
	        _this.playPauseBtn.classList.remove('playing');
	      }, false);
	      this.audio.addEventListener('play', function () {
	        _this.playing = true;
	        _this.playPauseBtn.textContent = 'pause';
	        _this.playPauseBtn.classList.add('playing');
	      }, false);
	    }
	  }, {
	    key: "togglePlay",
	    value: function () {
	      var _togglePlay = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var audioCurrentTime;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              if (!(this.audidCtx.state === 'suspended')) {
	                _context.next = 3;
	                break;
	              }
	              _context.next = 3;
	              return this.audidCtx.resume();
	            case 3:
	              if (!this.playing) {
	                _context.next = 11;
	                break;
	              }
	              _context.next = 6;
	              return this.audio.pause();
	            case 6:
	              this.playing = false;
	              this.playPauseBtn.textContent = 'play';
	              this.playPauseBtn.classList.remove('playing');
	              _context.next = 16;
	              break;
	            case 11:
	              _context.next = 13;
	              return this.audio.play();
	            case 13:
	              this.playing = true;
	              this.playPauseBtn.textContent = 'pause';
	              this.playPauseBtn.classList.add('playing');
	            case 16:
	              audioCurrentTime = sessionStorage.getItem('audioCurrentTime');
	              if (audioCurrentTime) {
	                this.audio.currentTime = audioCurrentTime;
	                sessionStorage.removeItem('audioCurrentTime');
	              }
	            case 18:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this);
	      }));
	      function togglePlay() {
	        return _togglePlay.apply(this, arguments);
	      }
	      return togglePlay;
	    }()
	  }, {
	    key: "seekTo",
	    value: function seekTo(value) {
	      this.audio.currentTime = value;
	    }
	  }, {
	    key: "updateAudioTime",
	    value: function updateAudioTime(time) {
	      this.currentTime = time;
	      this.progressBar.value = this.currentTime;
	      var secs = "".concat(parseInt("".concat(time % 60), 10)).padStart(2, '0');
	      var mins = parseInt(time / 60 % 60, 10);
	      this.currentTimeEl.textContent = "".concat(mins, ":").concat(secs);
	    }
	  }, {
	    key: "changeVolume",
	    value: function changeVolume() {
	      this.volume = this.volumeBar.value;
	      if (Number(this.volume) > 1) {
	        this.volumeBar.parentNode.className = 'volume-bar over';
	      } else if (Number(this.volume) > 0) {
	        this.volumeBar.parentNode.className = 'volume-bar half';
	      } else {
	        this.volumeBar.parentNode.className = 'volume-bar';
	      }
	      this.gainNode.gain.value = this.volume;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = "\n            <figure class=\"audio-player\">\n            \t<figcaption class=\"audio-name\">".concat(this.trackName, "</figcaption>\n            \t<audio src=\"").concat(this.trackSrc, "\" style=\"display:none\"></audio>\n            \t<button class=\"play-btn\" type=\"button\">play</button>\n            \t<div class=\"progress-indicator\">\n                \t<span class=\"current-time\">0:00</span>\n                \t<input type=\"range\" max=\"100\" value=\"0\" class=\"progress-bar\">\n                \t<span class=\"duration\">0:00</span>\n            \t</div>\n            \t<div class=\"volume-bar\">\n                \t<input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" value=\"").concat(this.volume, "\" class=\"volume-field\">\n            \t</div>\n            </figure>\n            ");
	      this.audio = this.rootNode.querySelector('audio');
	      this.playPauseBtn = this.rootNode.querySelector('.play-btn');
	      this.volumeBar = this.rootNode.querySelector('.volume-field');
	      this.progressIndicator = this.rootNode.querySelector('.progress-indicator');
	      this.currentTimeEl = this.progressIndicator.children[0];
	      this.progressBar = this.progressIndicator.children[1];
	      this.durationEl = this.progressIndicator.children[2];
	    }
	  }]);
	  return AudioPlayer;
	}();

	exports.AudioPlayer = AudioPlayer;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
