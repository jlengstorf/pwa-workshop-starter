/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LIGHTBOX_CLASS = 'lightbox';
var LIGHTBOX_WRAPPER_CLASS = 'js--lightbox';
var LIGHTBOX_IMG_LINK_CLASS = 'gallery__image';

var contentArea = document.querySelector('.' + LIGHTBOX_WRAPPER_CLASS);
var lightbox = document.querySelector('.' + LIGHTBOX_CLASS);

exports.default = function () {
  contentArea.addEventListener('click', function (event) {
    if (event.target.classList.contains(LIGHTBOX_IMG_LINK_CLASS)) {
      var link = event.target.parentNode;

      if (link && link.href) {
        event.preventDefault();
        lightbox.querySelector('.' + LIGHTBOX_CLASS + '__image').src = link.href;

        // The timeout prevents a flicker of the images changing while fading in
        setTimeout(function () {
          lightbox.classList.remove(LIGHTBOX_CLASS + '--disabled');
        }, 50);
      }
    }
  });

  lightbox.addEventListener('click', function (event) {
    if (!event.target.classList.contains(LIGHTBOX_CLASS + '__image')) {
      event.preventDefault();
      lightbox.classList.add(LIGHTBOX_CLASS + '--disabled');
    }
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === undefined ? function () {} : _ref$onChange;

  tabContainer.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      event.preventDefault();

      // deactivate all tabs and hide all content panels
      [].forEach.call(tabs, function (tab) {
        return tab.setAttribute('aria-selected', false);
      });
      [].forEach.call(panels, function (panel) {
        return panel.setAttribute('aria-hidden', true);
      });

      // activate the current tab and show the current content panel
      event.target.setAttribute('aria-selected', true);

      // show the content area that corresponds to the active tab
      var currentTabId = event.target.href.split('#')[1];
      document.getElementById(currentTabId).setAttribute('aria-hidden', false);

      onChange();
    }
  });
};

var TAB_CONTAINER_CLASS = 'js--tabs';

var tabContainer = document.querySelector('.' + TAB_CONTAINER_CLASS);
var tabs = tabContainer.querySelectorAll('a');
var panels = document.querySelectorAll('[aria-labelled-by^="tab-"]');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lightbox = __webpack_require__(0);

var _lightbox2 = _interopRequireDefault(_lightbox);

var _tabs = __webpack_require__(1);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For some reason, an IIFE doesn’t work here (or Babel breaks it).
setTimeout(function () {
  (0, _lightbox2.default)();
  (0, _tabs2.default)({
    onChange: loadVisibleImages
  });
}, 0);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map