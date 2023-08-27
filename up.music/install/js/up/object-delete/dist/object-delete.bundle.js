this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3;
	Promise.resolve().then(function () { return functions; });
	var ObjectDelete = /*#__PURE__*/function () {
	  function ObjectDelete() {
	    var _options$id, _options$showSuccessM, _options$showUnsucces, _options$baseLink;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, ObjectDelete);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('ObjectDelete: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('ObjectDelete: options.userId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("ObjectDelete: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.id = (_options$id = options.id) !== null && _options$id !== void 0 ? _options$id : '';
	    this.showSuccessMessage = (_options$showSuccessM = options.showSuccessMessage) !== null && _options$showSuccessM !== void 0 ? _options$showSuccessM : false;
	    this.showUnsuccessfulMessage = (_options$showUnsucces = options.showUnsuccessfulMessage) !== null && _options$showUnsucces !== void 0 ? _options$showUnsucces : false;
	    this.baseLink = (_options$baseLink = options.baseLink) !== null && _options$baseLink !== void 0 ? _options$baseLink : '';
	    this.reload();
	  }
	  babelHelpers.createClass(ObjectDelete, [{
	    key: "reload",
	    value: function reload() {
	      clearBlocks();
	      this.render();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.showSuccessMessage) {
	        this.renderSuccessMessage();
	      } else {
	        if (this.showUnsuccessfulMessage) {
	          this.renderUnsuccessfulMessage();
	        } else {
	          this.renderDeleteObject();
	        }
	      }
	    }
	  }, {
	    key: "renderSuccessMessage",
	    value: function renderSuccessMessage() {
	      var deleteObjectNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div>\n\t\t\t<section class=\"hero is-success\">\n\t\t\t\t<div class=\"hero-body\">\n\t\t\t\t\t<h1 class=\"title\">\t\n\t\t\t\t\t\t", "\n\t\t\t\t\t</h1>\n\t\t\t\t\t<h2 class=\"subtitle\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</h2>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t\n\t\t\t<div class=\"columns mb-6\" style=\"margin-top: 10px\">\n\t\t\t\t<div class=\"column\">\n\t\t\t\t\t<a class=\"button is-pulled-right\" onclick=\"goToMusicList('", "')\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t"])), main_core.Loc.getMessage("UP_DELETE_SUCCESS_TEXT_FIRST_ROW"), main_core.Loc.getMessage("UP_DELETE_SUCCESS_TEXT_SECOND_ROW"), this.userId, main_core.Loc.getMessage("UP_DELETE_SUCCESS_TEXT_IN_BUTTON"));
	      this.rootNode.appendChild(deleteObjectNode);
	    }
	  }, {
	    key: "renderUnsuccessfulMessage",
	    value: function renderUnsuccessfulMessage() {
	      var _this = this;
	      var deleteObjectNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div>\n\t\t\t<section class=\"hero is-warning\">\n\t\t\t\t<div class=\"hero-body\">\n\t\t\t\t\t<h1 class=\"title\">\t\n\t\t\t\t\t\t", "\t\t\t\t\t\t\n\t\t\t\t\t</h1>\n\t\t\t\t\t<h2 class=\"subtitle\">\n\t\t\t\t\t\t", "\t\n\t\t\t\t\t</h2>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t\n\t\t\n\t\t\t<div class=\"columns mb-6\" style=\"margin-top: 10px\">\n\t\t\t\t<div class=\"column\">\t\t\n\t\t\t\t\t<button class=\"button is-fullwidth\" \n\t\t\t\t\t\t\t\tonclick=\"", "\">\n\t\t\t\t\t\t\t\t", "\t\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t"])), main_core.Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_FIRST_ROW"), main_core.Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_SECOND_ROW"), function () {
	        _this.showUnsuccessfulMessage = false;
	        _this.showSuccessMessage = false;
	        _this.reload();
	      }, main_core.Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_IN_BUTTON"));
	      this.rootNode.appendChild(deleteObjectNode);
	    }
	  }, {
	    key: "renderDeleteObject",
	    value: function renderDeleteObject() {
	      var _this2 = this;
	      var deleteObjectNode = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div>\n\t\t\t<section class=\"hero is-danger\">\n\t\t\t\t<div class=\"hero-body\">\n\t\t\t\t\t<p class=\"title\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</p>\n\t\t\t\t\t<p class=\"subtitle\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t\n\t\t\t<div class=\"column is-offset-5\">\n\t\t\t\t<div class=\"field is-grouped\">\n\t\t\t\t\t\t<p class=\"control\">\n\t\t\t\t\t\t\t<button class=\"button is-fullwidth\" \n\t\t\t\t\t\t\t\tonclick=\"", "\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\t\n\t\t\t</div>\n\t\t</div>\n\t\t"])), main_core.Loc.getMessage("UP_DELETE_OBJECT_TEXT_FIRST_ROW"), main_core.Loc.getMessage("UP_DELETE_OBJECT_TEXT_SECOND_ROW"), function () {
	        if (_this2.baseLink === '/delete/music') {
	          _this2.deleteMusic();
	        }
	        if (_this2.baseLink === '/delete/user') {
	          _this2.deleteUser();
	        }
	      }, main_core.Loc.getMessage("UP_DELETE_OBJECT_TEXT_IN_BUTTON"));
	      this.rootNode.appendChild(deleteObjectNode);
	    }
	  }, {
	    key: "deleteMusic",
	    value: function deleteMusic() {
	      var _this3 = this;
	      BX.ajax.runAction('up:music.music.deleteMusicById', {
	        data: {
	          musicId: this.id
	        }
	      }).then(function (responce) {
	        if (responce.data.status === true) {
	          _this3.showUnsuccessfulMessage = false;
	          _this3.showSuccessMessage = true;
	          _this3.reload();
	          if (responce.data.name === MusicAudioPlayer.trackName) {
	            MusicAudioPlayer.trackSrc = "";
	            MusicAudioPlayer.trackName = 'Трек не выбран';
	            window.MusicAudioPlayer.render();
	            window.MusicAudioPlayer.initializeAudio();
	            window.MusicAudioPlayer.attachEvents();
	          }
	        } else {
	          _this3.showUnsuccessfulMessage = true;
	          _this3.showSuccessMessage = false;
	          _this3.reload();
	        }
	      })["catch"](function (error) {
	        console.error(error);
	        _this3.showUnsuccessfulMessage = true;
	        _this3.showSuccessMessage = false;
	        _this3.reload();
	      });
	    }
	  }, {
	    key: "sleep",
	    value: function sleep(ms) {
	      return new Promise(function (resolve) {
	        return setTimeout(resolve, ms);
	      });
	    }
	  }, {
	    key: "deleteUser",
	    value: function deleteUser() {
	      var _this4 = this;
	      BX.ajax.runAction('up:music.user.deleteUserById', {
	        data: {
	          userId: this.id
	        }
	      }).then(function (responce) {
	        if (responce.data === true) {
	          _this4.showUnsuccessfulMessage = false;
	          _this4.showSuccessMessage = true;
	          _this4.reload();
	          _this4.sleep(500).then(function () {
	            window.location.href = "/login/";
	          });
	        } else {
	          _this4.showUnsuccessfulMessage = true;
	          _this4.showSuccessMessage = false;
	          _this4.reload();
	        }
	      })["catch"](function (error) {
	        console.error(error);
	        goToPageNotFound(_this4.userId);
	      });
	    }
	  }]);
	  return ObjectDelete;
	}();

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
													TRANSITION TO COMPONENTS
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var functions = /*#__PURE__*/Object.freeze({

	});

	exports.ObjectDelete = ObjectDelete;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
