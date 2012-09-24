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
      handler = sinon.stub();
      littleprinter.setup(app, handler);
    });
    it('should bind handler', function() {
      assert.equal(littleprinter.handler, handler);
    });
    it('should setup up /meta.json', function() {
      assert(app.get.withArgs('/meta.json', littleprinter.meta).calledOnce);
    });
  });
});