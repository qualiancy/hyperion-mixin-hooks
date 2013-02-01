/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.hooks = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.hooks_COV
    ? require('../../lib-cov/hooks/' + name)
    : require('../../lib/hooks/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__hooks = {};
