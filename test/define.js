describe('.defineHook()', function () {
  it('should be available upon app.mixin()', function () {
    var app = hyperion();
    app.mixin(hooks());
    app.should.itself.respondTo('defineHook');
  });

  it('should allow define for a single permission', function () {
    var app = hyperion();
    app.mixin(hooks());
    (function () {
      app.defineHook('test', function () {});
    }).should.not.throw();
  });

  it('should allow define for an object of permissions', function () {
    var app = hyperion();
    app.mixin(hooks());
    (function () {
      app.defineHook({
          test: function test () {}
        , test2: function () {}
      });
    }).should.not.throw();
  });

  it('should throw on invalid input', function () {
    var app = hyperion();
    app.mixin(hooks());
    (function () {
      app.defineHook('test', false);
    }).should.throw('Hook "test" requires a function.');
  });
});
