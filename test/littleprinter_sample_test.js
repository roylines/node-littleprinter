var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('sample', function() {
    var res;
    beforeEach(function() {
      littleprinter.handler = sinon.stub();
      littleprinter.handler.sample = sinon.stub();
      res = sinon.stub();
      res.send = sinon.stub();
      res.render = sinon.stub();
    });
    it('should call sample once', function() {
      littleprinter.handler.sample.yields(null, { });
      littleprinter.sample(null, res);
      assert(littleprinter.handler.sample.calledOnce);
    });
    it('should return 500 if handler errors', function() {
      littleprinter.handler.sample.yields('ERROR');
      littleprinter.sample(null , res);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should default view if missing', function() {
      littleprinter.handler.sample.yields(null, { });
      littleprinter.sample(null, res);
      assert(res.render.calledOnce);
      assert.equal(res.render.firstCall.args[0], 'sample');
    });
    it('should use view if present', function() {
      littleprinter.handler.sample.yields(null, { view: 'VIEW' });
      littleprinter.sample(null, res);
      assert(res.render.calledOnce);
      assert.equal(res.render.firstCall.args[0], 'VIEW');
    });
  });
});