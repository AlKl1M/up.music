this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
	Promise.resolve().then(function () { return functions; });
	var UserList = /*#__PURE__*/function () {
	  function UserList() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, UserList);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('UserList: options.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("UserList: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('UserList: options.userId required');
	    }
	    if (main_core.Type.isStringFilled(options.fileRootDirectory)) {
	      this.fileRootDirectory = options.fileRootDirectory;
	    } else {
	      throw new Error('UserList: options.fileRootDirectory required');
	    }
	    this.page = options.page ? Number(options.page) : 1;
	    this.searchString = options.searchString ? options.searchString : "";
	    this.paginationBaseLink = options.paginationBaseLink;
	    this.userList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(UserList, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadUserList().then(function (userList) {
	        _this.userList = userList;
	        _this.loadPagination().then(function (responce) {
	          _this.lastPage = responce.data.lastPage;
	          _this.pageList = responce.data.pageList;
	          _this.render();
	        });
	      });
	    }
	  }, {
	    key: "loadPagination",
	    value: function loadPagination() {
	      var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.pagination.getPaginationForUser', {
	          data: {
	            page: _this2.page,
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
	    key: "loadUserList",
	    value: function loadUserList() {
	      var _this3 = this;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:music.user.getList', {
	          data: {
	            page: _this3.page,
	            searchString: _this3.searchString
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
	    key: "render",
	    value: function render() {
	      this.rootNode.innerHTML = '';
	      this.renderUser();
	      this.renderPagination();
	    }
	  }, {
	    key: "renderUser",
	    value: function renderUser() {
	      var _this4 = this;
	      var userContainerNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<div class=\"users\"></div>"])));
	      this.userList.forEach(function (userData) {
	        var userNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<div class=\"media\">\n\t\t\t\t\t\t<div class=\"media-left\">\n\t\t\t\t\t\t\t<figure class=\"image is-48x48\">\n\t\t\t\t\t\t\t\t<img src=\"", "\">\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"media-content\">\n\t\t\t\t\t\t\t<p class=\"title is-4\">\n\t\t\t\t\t\t\t\t<a class=\"title is-4\"\n\t\t\t\t\t\t\t\tonclick=\"goToUserDetail('/user/'+'", "', '", "',\n\t\t\t\t\t\t\t\t\t'", "')\"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p class=\"subtitle is-6\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"])), userData.IMAGE_PATH, userData.LOGIN, userData.LOGIN, _this4.userId, decreaseDescription(BX.util.htmlspecialchars(userData.NAME)), "@" + decreaseDescription(BX.util.htmlspecialchars(userData.LOGIN)));
	        userContainerNode.appendChild(userNode);
	      });
	      this.rootNode.appendChild(userContainerNode);
	    }
	  }, {
	    key: "renderPagination",
	    value: function renderPagination() {
	      var _this5 = this;
	      var userPaginationNode = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["<ul class=\"pagination\"></ul>"])));
	      var firstPageNode = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"pagination-item \n\t\t\t\t", "\"\n\t\t\t\tonclick=\"\n\t\t\t\t\tupdateUserList\n\t\t\t\t\t(\n\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t1, \n\t\t\t\t\t\t''\n\t\t\t\t\t)\"\n\t\t\t>\n\t\t\t\t", "\n\t\t\t</li>\n\t\t"])), this.page === 1 ? 'pagination-item-no-active' : '', createLinkFromParts(this.paginationBaseLink, 1, this.searchString), main_core.Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_START'));
	      userPaginationNode.appendChild(firstPageNode);
	      this.pageList.forEach(function (pageData) {
	        var pageNode = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"pagination-item \n\t\t\t\t\t", "\"\n\t\t\t\t\tonclick=\"\n\t\t\t\t\t\tupdateUserList\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t'", "', \n\t\t\t\t\t\t\t", ", ''\n\t\t\t\t\t\t)\"\n\t\t\t\t>\n\t\t\t\t\t", "\n\t\t\t\t</li>\n\t\t\t"])), _this5.page === pageData ? 'pagination-item-active' : '', createLinkFromParts(_this5.paginationBaseLink, pageData, _this5.searchString), pageData, pageData);
	        userPaginationNode.appendChild(pageNode);
	      });
	      var lastPageNode = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<li class=\"pagination-item \n\t\t\t\t", "\"\n\t\t\t\tonclick=\"\n\t\t\t\t\tupdateUserList\n\t\t\t\t\t(\n\t\t\t\t\t\t'", "',\n\t\t\t\t\t\t", ", \n\t\t\t\t\t\t''\n\t\t\t\t\t)\"\n\t\t\t>\n\t\t\t\t", "\t\n\t\t\t</li>\n\t\t"])), this.page === this.lastPage ? 'pagination-item-no-active' : '', createLinkFromParts(this.paginationBaseLink, this.lastPage, this.searchString), this.lastPage, main_core.Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_END'));
	      userPaginationNode.appendChild(lastPageNode);
	      this.rootNode.appendChild(userPaginationNode);
	    }
	  }]);
	  return UserList;
	}();

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
													TRANSITION TO COMPONENTS
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var functions = /*#__PURE__*/Object.freeze({

	});

	exports.UserList = UserList;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
