var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('meta', function() {
    var res;
    beforeEach(function() {
      littleprinter.handler = sinon.stub();
      res = sinon.stub();
      res.send = sinon.stub();
    });
    it('should return 500 if no handler defined', function() {
      littleprinter.handler = undefined;
      littleprinter.meta(null, res);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should return 500 if no meta defined', function() {
      littleprinter.handler.meta = undefined;
      littleprinter.meta(null, res);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should return meta if defined', function() {
      littleprinter.handler.meta = { };
      littleprinter.meta(null, res);
      assert(res.send.withArgs(littleprinter.handler.meta).calledOnce);
    });
  });
});