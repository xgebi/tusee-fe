/**
 * Figure out if this should be here or should be loaded from database.
 * This is sort of configuration which would need a lot of governments
 * to change.
 */
const PAGE_FORMATS = Object.freeze({
  A5: 'a5',
  A4: 'a4',
});

const PAGE_SVG_VIEWBOX_DIMENSIONS = Object.freeze({
  a5: {
    portrait: { width: 14.8, height: 21, unit: 'cm' },
    landscape: { width: 21, height: 14.8, unit: 'cm' },
  },
  a4: {
    portrait: { width: 21, height: 29.7, unit: 'cm' },
    landscape: { width: 29.7, height: 21, unit: 'cm' },
  },
});

const ORIENTATION_LANDSCAPE = 'landscape';
const ORIENTATION_PORTRAIT = 'portrait';

export {
  PAGE_FORMATS,
  PAGE_SVG_VIEWBOX_DIMENSIONS,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
};
