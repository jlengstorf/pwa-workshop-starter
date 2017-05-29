import responsiveLazyload from 'responsive-lazyload';
import lightbox from './lib/lightbox';
import tabs from './lib/tabs';

const loadVisibleImages = responsiveLazyload();

lightbox();
tabs({
  onChange: loadVisibleImages,
});
