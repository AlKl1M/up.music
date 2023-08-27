this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3, _templateObject4;
	var UserDetail = /*#__PURE__*/function () {
	  function UserDetail() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, UserDetail);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('UserDetail: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("UserDetail: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    if (main_core.Type.isStringFilled(options.fileRootDirectory)) {
	      this.fileRootDirectory = options.fileRootDirectory;
	    } else {
	      throw new Error('UserDetail: options.fileRootDirectory required');
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('UserDetail: options.userId required');
	    }
	    if (main_core.Type.isStringFilled(options.nickname)) {
	      this.nickname = options.nickname;
	    } else {
	      throw new Error('UserDetail: options.nickname required');
	    }
	    this.userList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(UserDetail, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadUserList().then(function (userList) {
	        _this.userList = userList[0];
	        _this.loadUserImage().then(function (userImage) {
	          _this.userPhoto = userImage;
	          _this.loadCountPosts().then(function (countPosts) {
	            _this.countPosts = countPosts;
	            _this.render();
	          });
	        });
	      });
	    }
	  }, {
	    key: "uploadAvatarFunc",
	    value: function uploadAvatarFunc() {
	      var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        var photoInput = document.getElementById('photoInput');
	        if (photoInput) {
	          var photoFile = photoInput.files[0];
	          var formData = new FormData();
	          formData.append("photo", photoFile);
	        }
	        BX.ajax.runAction('up:music.user.changeAvatar', {
	          data: {
	            data: 1
	          }
	        }).then(function (responce) {
	          console.log(responce);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this2.userId);
	        });
	      });
	    }
	  }, {
	    key: "loadUserList",
	    value: function loadUserList() {
	      var _this3 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.user.getList', {
	          data: {
	            nickname: _this3.nickname
	          }
	        }).then(function (responce) {
	          var userList = responce.data.userList;
	          return resolve(userList);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this3.userId);
	        });
	      });
	    }
	  }, {
	    key: "imgUpdate",
	    value: function imgUpdate() {
	      var _this4 = this;
	      var fileInput = document.getElementById('photoInput');
	      var file = fileInput.files[0];
	      if (!file) {
	        alert('Выбран пустой файл!');
	        return;
	      }
	      if (!/^image\//.test(file.type)) {
	        alert('Выбранный файл не является изображением!');
	        return;
	      }
	      var formData = new FormData();
	      formData.append('photo', file);
	      var nickname = this.nickname;
	      formData.append('nickname', nickname);
	      BX.ajax.runAction('up:music.user.imgUpdate', {
	        mode: 'ajax',
	        data: formData
	      }).then(function (responce) {
	        _this4.reload();
	        alert("Аватар успешно загружен!");
	      });
	    }
	  }, {
	    key: "loadUserImage",
	    value: function loadUserImage() {
	      var _this5 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.user.getImageAbsolutePath', {
	          data: {
	            nickname: _this5.nickname
	          }
	        }).then(function (responce) {
	          var userImage = responce.data.userImage;
	          return resolve(userImage);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this5.userId);
	        });
	      });
	    }
	  }, {
	    key: "loadCountPosts",
	    value: function loadCountPosts() {
	      var _this6 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.user.getCountPosts', {
	          data: {
	            nickname: _this6.nickname
	          }
	        }).then(function (responce) {
	          var countPosts = responce.data.countPosts;
	          return resolve(countPosts);
	        })["catch"](function (error) {
	          console.error(error);
	          goToPageNotFound(_this6.userId);
	        });
	      });
	    }
	  }, {
	    key: "renderUpdatePhoto",
	    value: function renderUpdatePhoto(userId) {
	      var _this7 = this;
	      if (this.userId === userId) {
	        return main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"field is-grouped\">\n\t\t\t\t\t\t  <div class=\"file has-name\">\n\t\t\t\t\t\t\t<label class=\"file-label\">\n\t\t\t\t\t\t\t  <input class=\"file-input\" type=\"file\" id=\"photoInput\">\n\t\t\t\t\t\t\t  <span class=\"file-cta\">\n\t\t\t\t\t\t\t\t<span class=\"file-icon\">\n\t\t\t\t\t\t\t\t  <i class=\"fas fa-upload\"></i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"file-label\">\n\t\t\t\t\t\t\t\t  \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0430\u0432\u0430\u0442\u0430\u0440\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t  <div class=\"control\">\n\t\t\t\t\t\t\t<button class=\"button is-black\" id=\"uploadButton\" onclick=\"", "\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C</button>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t</div>"])), function () {
	          _this7.imgUpdate();
	        });
	      }
	      return '';
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = '';
	      var userContainerNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["<div></div>"])));
	      var userDetailNode = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"columns is-fullwidth\">\n\t\t\t\t\t<div class=\"column\">\n\t\t\t\t\t\t<div class=\"image-container\">\n\t\t\t\t\t\t<figure class=\"image is-300x300\">\n\t\t\t\t\t\t\t<img class=\"is-rounded\" src=\"", "\" style=\"width:300px; margin-left: 50px;\">\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t", "\n\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column\">\n\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t<div class=\"media\">\n\t\t\t\t\t\t\t\t<div class=\"media-content\">\n\t\t\t\t\t\t\t\t\t<p class=\"title is-4\">\n\t\t\t\t\t\t\t\t\t\t<a class=\"title is-4\" \n\t\t\t\t\t\t\t\t\t\t\tonclick=\"updateMusicList('/user/'+'", "', \n\t\t\t\t\t\t\t\t\t\t\t\t1, '', '", "',''\n\t\t\t\t\t\t\t\t\t\t\t)\"\n\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t<p class=\"subtitle is-6\">\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column\" style=\"margin-top: 20px\">\n\t\t\t\t\t\t<nav class=\"level\">\n\t\t\t\t\t\t\t<div class=\"level-item has-text-centered\">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<p class=\"heading\"> ", "</p>\n\t\t\t\t\t\t\t\t\t<p class=\"title\">", "</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</nav>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), this.userPhoto, this.renderUpdatePhoto(this.userList.ID), BX.util.htmlspecialchars(this.userList.LOGIN), BX.util.htmlspecialchars(this.userList.LOGIN), BX.util.htmlspecialchars(this.userList.NAME), "@" + BX.util.htmlspecialchars(this.userList.LOGIN), main_core.Loc.getMessage('UP_MUSIC_POSTS_TEXT'), Number(this.countPosts));
	      var renderDeleteAccountNode = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"column is-one-fifth\" style=\"margin-top: 20px\">\n\t\t\t\t\t<button class=\"button is-danger is-light\"\n\t\t\t\t\t\tonclick=\"goToObjectDelete('", "', '", "', '/delete/user')\"\n\t\t\t\t\t>\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t"])), this.userId, this.userId, main_core.Loc.getMessage('UP_MUSIC_DELETE_ACCOUNT'));
	      if (this.userId === this.userList.ID) {
	        userDetailNode.appendChild(renderDeleteAccountNode);
	      }
	      userContainerNode.appendChild(userDetailNode);
	      this.rootNode.appendChild(userContainerNode);
	    }
	  }]);
	  return UserDetail;
	}();

	exports.UserDetail = UserDetail;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
