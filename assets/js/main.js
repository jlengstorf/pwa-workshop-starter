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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
      onChange = _ref$onChange === undefined ? function () {/* no-op by default */} : _ref$onChange;

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

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.responsiveLazyload = factory());
}(this, (function () { 'use strict';

/**
 * Check if an element is visible at all in the viewport.
 *
 * It would be cool to use an IntersectionObserver here, but browser support
 * isn’t there yet: http://caniuse.com/#feat=intersectionobserver
 *
 * @param  {Element} el the element to check
 * @return {Boolean}    `true` if the element is visible at all; `false` if not
 */
function isElementVisible(el) {
  /*
   * Checks if element (or an ancestor) is hidden via style properties.
   * See https://stackoverflow.com/a/21696585/463471
   */
  var isCurrentlyVisible = el.offsetParent !== null;

  // Check if any part of the element is vertically within the viewport.
  var position = el.getBoundingClientRect();
  var wH = window.innerHeight || /* istanbul ignore next */document.documentElement.clientHeight;
  var isWithinViewport = position.top >= 0 && position.top <= wH || position.bottom >= 0 && position.bottom <= wH;

  return isCurrentlyVisible && isWithinViewport;
}

/**
 * Prevents a function from firing too often.
 * @param  {Function} func  the function to throttle
 * @param  {Number}   limit the amount of milliseconds to wait between calls
 * @return {Function}       function to check if the function should be called
 */
function throttle(func) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

  var wait = false;

  return function () {
    if (!wait) {
      func.call();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

/**
 * Check if an image is visible and trigger an event if so.
 * @param  {Element} image the image to check
 * @param  {Event}   event an event to dispatch if the image is in the viewport
 * @return {Boolean}       true if the image is in the viewport; false if not
 */
var maybeTriggerImageLoad = function maybeTriggerImageLoad(image, event) {
  if (!image.getAttribute('data-loaded') && isElementVisible(image)) {
    image.dispatchEvent(event);

    return true;
  }

  return false;
};

/**
 * Finds the image to be lazyloaded.
 * @param  {Element} el `img` element to be lazyloaded or its container
 * @return {Element}    the `img` element to be lazyloaded
 */
var findImageElement = function findImageElement(el) {
  return el.tagName.toLowerCase() === 'img' ? el : el.querySelector('img');
};

/**
 * This almost seems too easy, but we simply swap in the correct srcset.
 * @param  {Event} event the triggered event
 * @return {Void}
 */
var loadImage = function loadImage(event) {
  var image = event.target;

  // Swap in the srcset info and add an attribute to prevent duplicate loads.
  image.srcset = image.getAttribute('data-lazyload');
  image.setAttribute('data-loaded', true);
};

/**
 * Remove the loading class from the lazyload wrapper.
 * @param  {Element} image        the image being loaded
 * @param  {String}  loadingClass the class to remove
 * @return {Void}
 */
var removeLoadingClass = function removeLoadingClass(image, loadingClass) {
  var element = image;
  var shouldReturn = false;

  /*
   * Since there may be additional elements wrapping the image (e.g. a link),
   * we run a loop to check the image’s ancestors until we either find the
   * element with the loading class or hit the `body` element.
   */
  while (element.tagName.toLowerCase() !== 'body') {
    if (element.classList.contains(loadingClass)) {
      element.classList.remove(loadingClass);
      shouldReturn = true;
    } else {
      element = element.parentNode;
    }

    if (shouldReturn) {
      return;
    }
  }
};

var checkForImagesToLazyLoad = function checkForImagesToLazyLoad(lazyLoadEvent, images) {
  images.forEach(function (image) {
    maybeTriggerImageLoad(image, lazyLoadEvent);
  });
};

/**
 * Initializes the lazyloader and adds the relevant classes and handlers.
 * @param  {String}   options.containerClass the lazyloaded image wrapper
 * @param  {String}   options.loadingClass   the class that signifies loading
 * @param  {Function} options.callback       a function to fire on image load
 * @return {Function}                        a function to load visible images
 */
var initialize = function initialize(_ref) {
  var _ref$containerClass = _ref.containerClass,
      containerClass = _ref$containerClass === undefined ? 'js--lazyload' : _ref$containerClass,
      _ref$loadingClass = _ref.loadingClass,
      loadingClass = _ref$loadingClass === undefined ? 'js--lazyload--loading' : _ref$loadingClass,
      _ref$callback = _ref.callback,
      callback = _ref$callback === undefined ? function (e) {
    return e;
  } : _ref$callback;

  // Find all the containers and add the loading class.
  var containers = document.getElementsByClassName(containerClass);

  [].forEach.call(containers, function (container) {
    container.classList.add(loadingClass);
  });

  // If we get here, `srcset` is supported and we can start processing things.
  var images = [].map.call(containers, findImageElement);

  // Create a custom event to trigger the event load.
  var lazyLoadEvent = new Event('lazyload-init');

  // Attach an onload handler to each image.
  images.forEach(function (image) {
    /*
     * Once the image is loaded, we want to remove the loading class so any
     * loading animations or other effects can be disabled.
     */
    image.addEventListener('load', function (event) {
      removeLoadingClass(event.target, loadingClass);
      callback(event);
    });

    /*
     * Set up a listener for the custom event that triggers the image load
     * handler (which loads the image).
     */
    image.addEventListener('lazyload-init', loadImage);

    /*
     * Check if the image is already in the viewport. If so, load it.
     */
    maybeTriggerImageLoad(image, lazyLoadEvent);
  });

  var loadVisibleImages = checkForImagesToLazyLoad.bind(null, lazyLoadEvent, images);

  /*
   * Add an event listener when the page is scrolled. To avoid bogging down the
   * page, we throttle this call to only run every 100ms.
   */
  var scrollHandler = throttle(loadVisibleImages, 100);
  window.addEventListener('scroll', scrollHandler);

  // Return a function to allow manual checks for images to lazy load.
  return loadVisibleImages;
};

/**
 * The public function to initialize lazyloading
 * @param  {Object} config configuration options (see `initialize()`)
 * @return {Function}      a function to manually check for images to lazy load
 */
function lazyLoadImages() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // If we have `srcset` support, initialize the lazyloader.
  /* istanbul ignore else: unreasonable to test browser support just for a no-op */
  if ('srcset' in document.createElement('img')) {
    return initialize(config);
  }

  // If there’s no support, return a no-op.
  /* istanbul ignore next: unreasonable to test browser support just for a no-op */
  return function () {/* no-op */};
}

return lazyLoadImages;

})));
//# sourceMappingURL=responsive-lazyload.umd.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _responsiveLazyload = __webpack_require__(2);

var _responsiveLazyload2 = _interopRequireDefault(_responsiveLazyload);

var _lightbox = __webpack_require__(0);

var _lightbox2 = _interopRequireDefault(_lightbox);

var _tabs = __webpack_require__(1);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadVisibleImages = (0, _responsiveLazyload2.default)();

(0, _lightbox2.default)();
(0, _tabs2.default)({
  onChange: loadVisibleImages
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map