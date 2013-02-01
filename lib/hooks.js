/*!
 * hyperion-mixin-hooks
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

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

module.exports = function (app, define) {
  var _hooks = {};

  /**
   * Add the `.hooks()` method that allows for
   * a user to define hooks. Accepts an object
   * of named hooks or a key:callback pair.
   *
   * ```js
   * // as object
   * app.hooks({
   *     'load user': function loadUser (req, res, next) {
   *       var user = req.params.user;
   *       db.get('user', user, function (err, dbUser) {
   *         if (err) return next(err);
   *         req.user = dbUser;
   *         next();
   *       });
   *     }
   *   , 'load post': function loadPost () {
   *       // ...
   *     }
   * });
   *
   * // as single hook
   * app.hooks('load user', loadUser);
   * ```
   *
   * @param {String|Object} string hook name or object of hooks
   * @param {Function} callback to include in request stack
   * @api public
   */

  define('defineHook', function (key, cb) {
    if ('object' === typeof key) {
      for (var name in key) {
        this.hooks(name, key[name]);
      }
    } else {
      _hooks[key] = cb;
    }

    return this;
  });

  /**
   * Return a defined hook for use in the request stack.
   * Can be used anywhere the `app` object is accessible.
   *
   * ```js
   * // for example, when routing
   *
   * app.map(function (map) {
   *   map.get('/:user/:post'
   *       app.hook('load user')
   *     , app.hook('load post')
   *     , function (req, res, next) {
   *         // render page based on req.user and req.post
   *       }
   *   );
   * });
   *
   * @param {String} hook name
   * @api public
   */

  define('hook', function (key) {
    return _hooks[key];
  });
};
