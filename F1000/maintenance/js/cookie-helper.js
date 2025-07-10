/**
 * Helper class for cookies
 */
F1000.CookieHelper = function() {};

F1000.CookieHelper.prototype = {

  /**
   * Check that a cookie exists
   * @param  {String}  name  The cookie name
   * @return {Boolean}
   */
  checkCookie: function(name) {
    return document.cookie.indexOf(name + '=') >= 0;
  },

  /**
   * Fetch a cookie
   * @return {String}  The cookie value
   */
  fetchCookie: function(name) {
    if (!this.checkCookie(name)) {
      return false;
    }

    let re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');

    return document.cookie.replace(re, '$1');
  },

  /**
   * Save a cookie
   * @param {String} name   The cookie name
   * @param {String} value  The cookie value
   */
  saveCookie: function(name, value) {
    document.cookie = name + '=' + value;
  }
};
