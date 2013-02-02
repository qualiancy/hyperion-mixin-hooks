describe('.hook()', function () {
  it('should invoke a hook', function (done) {
    var app = hyperion();
    app.mixin(hooks());

    var hook = chai.spy(function (req, res, next) {
      next();
    });

    app.defineHook('test', hook);
    app.use(app.hook('test'));
    app.use(function (req, res) {
      res.status(200).end();
    });

    chai.request(app)
    .get('/')
    .res(function (res) {
      res.should.have.status(200);
      hook.should.have.been.called.once;
      done();
    });
  });
});
