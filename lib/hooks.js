/*!
 * Hyperion Mixin (Hooks)
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var extend = require('tea-extend');

/*!
 * Export is a function to be used by the
 * hyperion application `.mixin()` method.
 *
 * ```js
 * var hyperion = require('hyperion')
 *   , mixinHooks = require('hyperion-mixin-hooks');
 *
 * app.mixin(mixinHooks);
 * ```
 *
 * @param {Object} instance of hyperion application
 * @param {Function} define
 * @api public
 */

module.exports = function (opts) {
  var hooks = extend({}, opts || {});

  return function mixinHooks (app, define) {

    /**
     * Add the `.hooks()` method that allows for
     * a user to define hooks. Accepts an object
     * of named hooks or a key:callback pair.
     *
     * @param {String|Object} string hook name or object of hooks
     * @param {Function} callback to include in request stack
     * @api public
     */

    define('defineHook', function (key, handle) {
      if ('object' === typeof key) {
        for (var name in key) this.defineHook(name, key[name]);
        return this;
      }

      if ('function' !== typeof handle) {
        throw new Error('Hook "' + key + '" requires a function.');
      }

      hooks[key] = handle;
      return this;
    });

    /**
     * Return a defined hook for use in the request stack.
     * Can be used anywhere the `app` object is accessible.
     *
     * @param {String} hook name
     * @api public
     */

    define('hook', function (key) {
      if (!hooks[key]) {
        throw new Error('Hook does not exist: ' + key);
      }

      return hooks[key];
    });
  }
};
