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

    it('should render correct view if sample yields ok', function() {
      littleprinter.handler.sample.yields(null, { view: 'VIEW', meta: 'META' });
      littleprinter.sample(null, res);
      assert(res.render.withArgs('VIEW', 'META').calledOnce);
    });
  });
});