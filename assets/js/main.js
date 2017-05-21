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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["lazyLoadImages"] = lazyLoadImages;
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
  const position = el.getBoundingClientRect();
  const wHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    (position.top >= 0 && position.top <= wHeight) ||
    (position.bottom >= 0 && position.bottom <= wHeight)
  );
}

/**
 * Prevents a function from firing too often.
 * @param  {Function} func  the function to throttle
 * @param  {Number}   limit the amount of milliseconds to wait between calls
 * @return {Function}       function to check if the function should be called
 */
function throttle(func, limit = 200) {
  let wait = false;

  return () => {
    if (!wait) {
      func.call();
      wait = true;
      setTimeout(() => { wait = false; }, limit);
    }
  };
}

/**
 * Check if an image is visible and trigger an event if so.
 * @param  {Element} image the image to check
 * @param  {Event}   event an event to dispatch if the image is in the viewport
 * @return {Boolean}       true if the image is in the viewport; false if not
 */
const maybeTriggerImageLoad = (image, event) => {
  if (!image.getAttribute('data-loaded') && isElementVisible(image)) {
    image.dispatchEvent(event);

    return true;
  }

  return false;
};

/**
 * Finds the image to be lazyloaded.
 * @param  {Element} container `img` element to be lazyloaded or its container
 * @return {Element}           the `img` element to be lazyloaded
 */
const findImageElement = (container) => {
  const tag = container.tagName.toLowerCase();

  return tag === 'img' ? container : container.querySelector('img');
};

/**
 * This almost seems too easy, but we simply swap in the correct srcset.
 * @param  {Event} event the triggered event
 * @return {Void}
 */
const loadImage = (event) => {
  const image = event.target;

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
const removeLoadingClass = (image, loadingClass) => {
  let element = image;
  let shouldReturn = false;

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

/**
 * Initializes the lazyloader and adds the relevant classes and handlers.
 * @param  {String}   options.containerClass the lazyloaded image wrapper
 * @param  {String}   options.loadingClass   the class that signifies loading
 * @param  {Function} options.callback       a function to fire on image load
 * @return {Void}
 */
const initialize = ({
  containerClass = 'js--lazyload',
  loadingClass = 'js--lazyload--loading',
  callback = () => {},
} = {}) => {
  // Find all the containers and add the loading class.
  const containers = document.getElementsByClassName(containerClass);

  [].forEach.call(containers, (container) => {
    container.classList.add(loadingClass);
  });

  // If we get here, `srcset` is supported and we can start processing things.
  const images = [].map.call(containers, findImageElement);

  // Create a custom event to trigger the event load.
  const lazyLoadEvent = new Event('lazyload-init');

  // Attach an onload handler to each image.
  images.forEach((image) => {
    /*
     * Once the image is loaded, we want to remove the loading class so any
     * loading animations or other effects can be disabled.
     */
    image.addEventListener('load', (event) => {
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

  /*
   * Add an event listener when the page is scrolled. To avoid bogging down the
   * page, we throttle this call to only run every 100ms.
   */
  const scrollHandler = throttle(() => {
    images.forEach((image) => {
      maybeTriggerImageLoad(image, lazyLoadEvent);
    });
  }, 100);
  window.addEventListener('scroll', scrollHandler);
};

/**
 * The public function to initialize lazyloading
 * @param  {Object} config configuration options (see `initialize()`)
 * @return {Boolean}       `true` if initialized; `false` if not
 */
function lazyLoadImages(config = {}) {
  // If we have `srcset` support, initialize the lazyloader.
  if ('srcset' in document.createElement('img')) {
    initialize(config);
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  lazyLoadImages,
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _responsiveLazyload = __webpack_require__(2);

var _lightbox = __webpack_require__(0);

var _lightbox2 = _interopRequireDefault(_lightbox);

var _tabs = __webpack_require__(1);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For some reason, an IIFE doesn’t work here (or Babel breaks it).
setTimeout(function () {
  var loadVisibleImages = (0, _responsiveLazyload.lazyLoadImages)();

  (0, _lightbox2.default)();
  (0, _tabs2.default)({
    onChange: loadVisibleImages
  });
}, 0);

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map