/**
 * Default configuration options for Snackify module.
 * @type {Object}
 * @property {string} msg - The default message to be displayed in the snackbar.
 * @property {boolean} icon - Determines if an icon should be shown in the snackbar.
 * @property {string} color - The theme color applied to the snackbar for styling.
 * @property {string} class - Additional classes to apply to the snackbar for custom styling.
 * @property {string} style - Inline styles to apply to the snackbar.
 * @property {number} timeout - The duration in milliseconds for which the snackbar is visible.
 * @property {?string} top - If set, displays the snackbar at the top of the screen with the specified value.
 * @property {?string} bottom - If set, displays the snackbar at the bottom of the screen with the specified value.
 * @property {?string} left - If set, aligns the snackbar to the left side of the screen with the specified value.
 * @property {?string} right - If set, aligns the snackbar to the right side of the screen with the specified value.
 * @module
 */
export default {
  msg: 'Success!',
  icon: true,
  color: 'success',
  class: 'pb-6',
  style: '',
  timeout: 2000,
  top: null,
  bottom: null,
  left: null,
  right: null,
}
