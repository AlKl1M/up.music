this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
	Promise.resolve().then(function () { return functions; });
	var MusicList = /*#__PURE__*/function () {
	  function MusicList() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MusicList);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('MusicList: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.fileRootDirectory)) {
	      this.fileRootDirectory = options.fileRootDirectory;
	    } else {
	      throw new Error('MusicList: options.fileRootDirectory required');
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('MusicList: options.userId required');
	    }
	    this.page = options.page ? Number(options.page) : 1;
	    this.dateFormat = options.dateFormat ? options.dateFormat : 'd.m.Y H:i';
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("MusicList: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.genre = options.genre ? options.genre : "";
	    this.searchString = options.searchString ? options.searchString : "";
	    this.nickname = options.nickname ? options.nickname : "";
	    this.paginationBaseLink = options.paginationBaseLink;
	    this.musicList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(MusicList, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadMusicList().then(function (musicList) {
	        _this.musicList = musicList;
	        _this.loadGenreList().then(function (genreList) {
	          _this.genreList = genreList;
	          _this.loadPagination().then(function (responce) {
	            _this.lastPage = responce.data.lastPage;
	            _this.pageList = responce.data.pageList;
	            _this.render();
	          });
	        });
	      });
	    }
	  }, {
	    key: "loadPagination",
	    value: function loadPagination() {
	      var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.pagination.getPaginationForMusic', {
	          data: {
	            page: _this2.page,
	            nickname: _this2.nickname,
	            genre: _this2.genre,
	            searchString: _this2.searchString
	          }
	        }).then(function (responce) {
	          return resolve(responce);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this2.userId);
	        });
	      });
	    }
	  }, {
	    key: "loadGenreList",
	    value: function loadGenreList() {
	      var _this3 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.genre.getList').then(function (responce) {
	          var genreList = responce.data.genreList;
	          return resolve(genreList);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this3.userId);
	        });
	      });
	    }
	  }, {
	    key: "loadMusicList",
	    value: function loadMusicList() {
	      var _this4 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.music.getList', {
	          data: {
	            page: _this4.page,
	            nickname: _this4.nickname,
	            genre: _this4.genre,
	            searchString: _this4.searchString
	          }
	        }).then(function (responce) {
	          var musicList = responce.data.musicList;
	          return resolve(musicList);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this4.userId);
	        });
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = '';
	      this.renderGenres();
	      if (this.musicList.length !== 0) {
	        this.renderMusic();
	        this.renderPagination();
	      } else {
	        this.renderPostListEmpty();
	      }
	    }
	  }, {
	    key: "renderPostListEmpty",
	    value: function renderPostListEmpty() {
	      var createFirstPostNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div>\n\t\t\t\t\t<section class=\"hero is-success\">\n\t\t\t\t\t\t<div class=\"hero-body\">\n\t\t\t\t\t\t\t<h1 class=\"title\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</h1>\n\t\t\t\t\t\t\t<h2 class=\"subtitle\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</h2>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</section>\n\t\t\t\t</div>\n\t\t\t"])), main_core.Loc.getMessage('UP_MUSIC_CREATE_SUCCESS_TEXT_FIRST_ROW'), main_core.Loc.getMessage('UP_MUSIC_CREATE_SUCCESS_TEXT_SECOND_ROW'));
	      this.rootNode.appendChild(createFirstPostNode);
	    }
	  }, {
	    key: "renderGenres",
	    value: function renderGenres() {
	      var _this5 = this;
	      var genreContainerNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["<div class=\"genres\"></div>"])));
	      this.genreList.forEach(function (genreData) {
	        var genreNode = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<span class=\"is-large pagination-item genre\n\t\t\t\t\t", "\"\n\t\t\t\t\tonclick=\"\n\t\t\t\t\t\tupdateMusicList\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t1, \n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t'", "'\n\t\t\t\t\t\t)\"\n\t\t\t\t>\n\t\t\t\t\t\t", "\n\t\t\t\t\t\n\t\t\t\t</span>\n\t\t\t"])), _this5.genre === genreData['CODE'] ? 'pagination-item-active' : '', createLinkFromParts(_this5.paginationBaseLink, 1, "", genreData['CODE']), genreData['CODE'], _this5.nickname, _this5.searchString, BX.util.htmlspecialchars(genreData['NAME']));
	        genreContainerNode.appendChild(genreNode);
	      });
	      this.rootNode.appendChild(genreContainerNode);
	    }
	  }, {
	    key: "renderDeleteCross",
	    value: function renderDeleteCross(musicData) {
	      if (this.userId === musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_ID) {
	        return main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"media-right\">\n\t\t\t\t\t<button class=\"card-header-icon\" aria-label=\"more options\">\n\t\t\t\t\t\t<a onclick=\"goToObjectDelete('", "', '", "', '/delete/music')\">\n\t\t\t\t\t\t\t\t<span class=\"icon disabled\">\n\t\t\t\t\t\t\t\t\t&#10060;\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t"])), this.userId, musicData.ID);
	      }
	      return '';
	    }
	  }, {
	    key: "renderMusic",
	    value: function renderMusic() {
	      var _this6 = this;
	      var musicContainerNode = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["<div class=\"posts\"></div>"])));
	      this.musicList.forEach(function (musicData) {
	        var musicNode = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"box\">\n\t\t\t\t  <article class=\"media\">\n\t\t\t\t\t<div class=\"media-left\">\n\t\t\t\t\t  <figure class=\"image is-64x64\">\n\t\t\t\t\t\t<img src=\"\n\t\t\t\t\t\t\t\t", "\" \n\t\t\t\t\t\t\t\talt=\"Image\"\n\t\t\t\t\t\t>\n\t\t\t\t\t  </figure>\n\t\t\t\t\t  \n\t\t\t\t\t\t<button class=\"button is-small is-fullwidth play-track-btn\" data-name=\"", "\"\n\t\t\t\t\t\t\t\t\tdata-track=\"\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\">\n\t\t\t\t\t\t\tplay\n\t\t\t\t\t    </button>\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"media-content\">\n\t\t\t\t\t  <div class=\"content\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t <a class=\"subtitle is-6\"  \n\t\t\t\t\t\t\t\t\tonclick=\"goToUserDetail(\n\t\t\t\t\t\t\t\t\t\t'/user/'+'", "', \n\t\t\t\t\t\t\t\t\t\t'", "',\n\t\t\t\t\t\t\t\t\t\t'", "'\n\t\t\t\t\t\t\t\t\t)\"\n\t\t\t\t\t\t\t >\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t  \n\t\t\t\t\t\t \t <br>\n\t\t\t\t\t\t \t <a class=\"subtitle is-4\" onclick=\"goToMusicDetail('", "', \n\t\t\t\t\t\t\t\t'", "', '", "', '", "')\"\n\t\t\t\t\t\t\t >\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t </a>\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t<div style=\"margin-top: 17px\">\n\t\t\t\t\t\t\t\t<small >\n\t\t\t\t\t\t\t\t  ", "\n\t\t\t\t\t\t\t  \t</small>\n\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t  </div>\n\t\t\t\t\t \n\t\t\t\t\t</div>\n\t\t\t\t\t ", "\n\t\t\t\t  </article>\n\t\t\t\t</div>\n\t\t\t"])), createAbsoluteFilePath(_this6.fileRootDirectory, musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_SUBDIR, musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_FILE_NAME), musicData.TITLE, createAbsoluteFilePath(_this6.fileRootDirectory, musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_SUBDIR, musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_FILE_NAME), musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN, musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN, _this6.userId, '@' + decreaseDescription(BX.util.htmlspecialchars(musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_NAME)), musicData.ID, _this6.fileRootDirectory, _this6.dateFormat, _this6.userId, decreaseDescription(BX.util.htmlspecialchars(musicData.TITLE)), BX.date.format(_this6.dateFormat, new Date(musicData.CREATE_DATE)), _this6.renderDeleteCross(musicData));
	        musicContainerNode.appendChild(musicNode);
	      });
	      this.rootNode.appendChild(musicContainerNode);
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
	  }, {
	    key: "renderPagination",
	    value: function renderPagination() {
	      var _this7 = this;
	      var musicPaginationNode = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["<ul class=\"pagination\"></ul>"])));
	      var firstPageNode = main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"pagination-item \n\t\t\t\t", "\"\n\t\t\t\tonclick=\"updateMusicList\n\t\t\t\t\t(\n\t\t\t\t\t\t'", "',\n\t\t\t\t \t\t1, \n\t\t\t\t \t\t'", "', \n\t\t\t\t \t\t'", "', \n\t\t\t\t \t\t'", "'\n\t\t\t\t \t)\"\n\t\t\t>\n\t\t\t\t", "\n\t\t\t</li>\n\t\t"])), this.page === 1 ? 'pagination-item-no-active' : '', createLinkFromParts(this.paginationBaseLink, 1, this.searchString, this.genre), this.genre, this.nickname, this.searchString, main_core.Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_START'));
	      musicPaginationNode.appendChild(firstPageNode);
	      this.pageList.forEach(function (pageData) {
	        var pageNode = main_core.Tag.render(_templateObject9 || (_templateObject9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"pagination-item \n\t\t\t\t\t", "\"\n\t\t\t\t\tonclick=\"updateMusicList\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t", ", \n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t'", "'\n\t\t\t\t\t\t)\"\n\t\t\t\t>\n\t\t\t\t\t\t", "\n\t\t\t\t</li>\n\t\t\t"])), _this7.page === pageData ? 'pagination-item-active' : '', createLinkFromParts(_this7.paginationBaseLink, pageData, _this7.searchString, _this7.genre), pageData, _this7.genre, _this7.nickname, _this7.searchString, pageData);
	        musicPaginationNode.appendChild(pageNode);
	      });
	      var lastPageNode = main_core.Tag.render(_templateObject10 || (_templateObject10 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"pagination-item \n\t\t\t\t", "\"\n\t\t\t\tonclick=\"updateMusicList\n\t\t\t\t\t(\n\t\t\t\t\t\t'", "',\n\t\t\t\t\t\t", ", \n\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t'", "'\n\t\t\t\t\t)\"\n\t\t\t>\n\t\t\t\t", "\n\t\t\t</li>\n\t\t"])), this.page === this.lastPage ? 'pagination-item-no-active' : '', createLinkFromParts(this.paginationBaseLink, this.lastPage, this.searchString, this.genre), this.lastPage, this.genre, this.nickname, this.searchString, main_core.Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_END'));
	      musicPaginationNode.appendChild(lastPageNode);
	      this.rootNode.appendChild(musicPaginationNode);
	    }
	  }]);
	  return MusicList;
	}();

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
													TRANSITION TO COMPONENTS
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var functions = /*#__PURE__*/Object.freeze({

	});

	exports.MusicList = MusicList;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
