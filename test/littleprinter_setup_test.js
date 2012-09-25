var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('setup', function() {
    var app;
    var handler;
    beforeEach(function() {
      app = sinon.stub();
      app.get = sinon.stub();
      app.use = sinon.stub();
      handler = sinon.stub();
      littleprinter.setup(app, handler);
    });
    it('should bind handler', function() {
      assert.equal(littleprinter.handler, handler);
    });
    it('should bind defaultHandler', function() {
      assert(app.use.withArgs(littleprinter.defaultHandler).calledOnce);
    });
    it('should route /meta.json', function() {
      assert(app.get.withArgs('/meta.json', littleprinter.meta).calledOnce);
    });
    it('should route /edition', function() {
      assert(app.get.withArgs('/edition', littleprinter.edition).calledOnce);
    });
    it('should route /sample', function() {
      assert(app.get.withArgs('/sample', littleprinter.sample).calledOnce);
    });
    it('should route /icon.png', function() {
      assert(app.get.withArgs('/icon.png', littleprinter.icon).calledOnce);
    });
  });
});