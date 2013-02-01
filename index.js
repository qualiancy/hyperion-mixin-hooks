module.exports = process.env.hooks_COV
  ? require('./lib-cov/hooks')
  : require('./lib/hooks');
