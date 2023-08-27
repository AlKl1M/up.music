this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2;
	Promise.resolve().then(function () { return functions; });
	var MusicDetail = /*#__PURE__*/function () {
	  function MusicDetail() {
	    var _options$dateFormat, _options$withCrossDel;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MusicDetail);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('MusicDetail: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.fileRootDirectory)) {
	      this.fileRootDirectory = options.fileRootDirectory;
	    } else {
	      throw new Error('MusicDetail: options.fileRootDirectory required');
	    }
	    if (main_core.Type.isStringFilled(options.musicId)) {
	      this.musicId = Number(options.musicId);
	    } else {
	      throw new Error('MusicDetail: options.musicId required');
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('MusicDetail: options.userId required');
	    }
	    this.dateFormat = (_options$dateFormat = options.dateFormat) !== null && _options$dateFormat !== void 0 ? _options$dateFormat : 'd.m.Y H:i';
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("MusicDetail: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.withCrossDelete = (_options$withCrossDel = options.withCrossDelete) !== null && _options$withCrossDel !== void 0 ? _options$withCrossDel : true;
	    this.music = [];
	    this.reload();
	  }
	  babelHelpers.createClass(MusicDetail, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadMusic().then(function (music) {
	        _this.music = music[0];
	        _this.render();
	      });
	    }
	  }, {
	    key: "loadMusic",
	    value: function loadMusic() {
	      var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.music.getMusic', {
	          data: {
	            id: _this2.musicId
	          }
	        }).then(function (responce) {
	          var music = responce.data.music;
	          return resolve(music);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this2.userId);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = '';
	      this.renderMusic();
	    }
	  }, {
	    key: "renderDeleteCross",
	    value: function renderDeleteCross(userIdOnPage) {
	      if (this.userId === userIdOnPage && this.withCrossDelete) {
	        return main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"media-right\">\n\t\t\t\t\t\t\t\t<button class=\"card-header-icon\" aria-label=\"more options\">\n\t\t\t\t\t\t\t\t\t\t<a onclick=\"goToObjectDelete('", "', '", "', '/delete/music')\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"icon disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t&#10060;\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>"])), this.userId, this.music.ID);
	      }
	      return '';
	    }
	  }, {
	    key: "renderMusic",
	    value: function renderMusic() {
	      var musicNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"columns is-full\">\n\t\t\t\t\t<div class=\"column is-one-quarter\">\n\t\t\t\t\t\t<figure class=\"image is-200x200\">\n\t\t\t\t\t\t\t<img src=\"\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<button class=\"is-fullwidth button is-small play-track-btn\" data-name=\"", "\"\n\t\t\t\t\t\t\t\t\tdata-track=\"\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t\">\n\t\t\t\t\t\t\t\tplay\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column card-content\">\n\t\t\t\t\t\t<div class=\"media\">\n\t\t\t\t\t\t\t<div class=\"media-left\">\n\t\t\t\t\t\t\t\t<figure class=\"image is-48x48\">\n\t\t\t\t\t\t\t\t\t<img src=\"\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t\">\n\t\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media-content\">\n\t\t\t\t\t\t\t\t<p class=\"title is-4\">\n\t\t\t\t\t\t\t\t\t<a class=\"title is-4\"  \n\t\t\t\t\t\t\t\t\t\tonclick=\"goToUserDetail(\n\t\t\t\t\t\t\t\t\t\t\t'/user/'+'", "', \n\t\t\t\t\t\t\t\t\t\t\t'", "',\n\t\t\t\t\t\t\t\t\t\t\t'", "'\n\t\t\t\t\t\t\t\t\t\t)\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<p class=\"subtitle is-6\">\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\n\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\t<p class=\"title is-4\" style=\"margin-top: 50px\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p class=\"subtitle is-6\" style=\"margin-top: 50px\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t \t", "\n\t\t\n\t\t\t\t\t\t\t\t<a onclick=\"goToMusicList\n\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t'", "',\n\t\t\t\t\t\t\t\t\t\t'', \n\t\t\t\t\t\t\t\t\t\t'", "'\n\t\t\t\t\t\t\t\t\t)\"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), createAbsoluteFilePath(this.fileRootDirectory, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_SUBDIR, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_FILE_NAME), this.music.TITLE, createAbsoluteFilePath(this.fileRootDirectory, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_SUBDIR, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_FILE_NAME), this.music.USER_IMAGE_PATH, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN, this.userId, BX.util.htmlspecialchars(this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_NAME), '@' + BX.util.htmlspecialchars(this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN), this.renderDeleteCross(this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_ID), BX.util.htmlspecialchars(this.music.TITLE), BX.util.htmlspecialchars(this.music.DESCRIPTION), BX.date.format(this.dateFormat, new Date(this.music.CREATE_DATE)), this.userId, this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_GENRE_CODE, '#' + this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_GENRE_NAME);
	      this.rootNode.appendChild(musicNode);
	      var playButtons = document.querySelectorAll('.play-track-btn');
	      playButtons.forEach(function (playButton) {
	        playButton.addEventListener('click', function () {
	          var name = playButton.getAttribute('data-name');
	          var src = playButton.getAttribute('data-track');
	          window.MusicAudioPlayer.updateSrc(src);
	          window.MusicAudioPlayer.updateName(name);
	          window.MusicAudioPlayer.render();
	          window.MusicAudioPlayer.initializeAudio();
	          window.MusicAudioPlayer.attachEvents();
	        });
	      });
	    }
	  }]);
	  return MusicDetail;
	}();

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
													TRANSITION TO COMPONENTS
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var functions = /*#__PURE__*/Object.freeze({

	});

	exports.MusicDetail = MusicDetail;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
