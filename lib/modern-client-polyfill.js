/**
 * Replaces Next's default polyfill-module for modern browsers only.
 * Saves ~legacy JS audit weight; keeps URL.canParse for Safari < 17.4.
 */
'use strict'
if (typeof URL !== 'undefined' && !('canParse' in URL)) {
  URL.canParse = function (href, base) {
    try {
      new URL(href, base)
      return true
    } catch {
      return false
    }
  }
}
