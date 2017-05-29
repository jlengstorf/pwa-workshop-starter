import responsiveLazyload from 'responsive-lazyload';
import lightbox from './lib/lightbox';
import tabs from './lib/tabs';

// For some reason, an IIFE doesn’t work here (or Babel breaks it).
setTimeout(() => {
  const loadVisibleImages = responsiveLazyload();

  lightbox();
  tabs({
    onChange: loadVisibleImages,
  });
}, 0);
