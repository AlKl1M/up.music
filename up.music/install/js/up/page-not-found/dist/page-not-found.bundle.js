this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject;
	var PageNotFound = /*#__PURE__*/function () {
	  function PageNotFound() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PageNotFound);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('PageNotFound: options.rootNodeId required');
	    }
	    if (main_core.Type.isStringFilled(options.userId)) {
	      this.userId = options.userId;
	    } else {
	      throw new Error('PageNotFound: userId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("PageNotFound: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.render();
	  }
	  babelHelpers.createClass(PageNotFound, [{
	    key: "render",
	    value: function render() {
	      var pageNotFoundNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div>\n\t\t\t<section class=\"hero is-warning\">\n\t\t\t\t<div class=\"hero-body\">\n\t\t\t\t\t<p class=\"title\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</p>\n\t\t\t\t\t<p class=\"subtitle\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t\t<div class=\"columns mb-6\" style=\"margin-top: 10px\">\n\t\t\t\t\t<div class=\"column\">\n\t\t\t\t\t\t<a class=\"button is-success is-pulled-right\" onclick=\"goToMusicList('", "')\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t</div>\n\t\t"])), main_core.Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_FIRST_ROW_TEXT'), main_core.Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_SECOND_ROW_TEXT'), this.userId, main_core.Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_TEXT_IN_BUTTON'));
	      this.rootNode.appendChild(pageNotFoundNode);
	    }
	  }]);
	  return PageNotFound;
	}();

	exports.PageNotFound = PageNotFound;

}((this.BX.Up.Music = this.BX.Up.Music || {}),BX));
