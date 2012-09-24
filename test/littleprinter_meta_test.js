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
      res.json = sinon.stub();
    });
    it('should return json meta', function() {
      littleprinter.handler.meta = { };
      littleprinter.meta(null, res);
      assert(res.json.withArgs(littleprinter.handler.meta).calledOnce);
    });
  });
});