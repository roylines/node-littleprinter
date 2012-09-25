var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('defaultHandler', function() {
    var res;
    var next;
    beforeEach(function() {
      res = sinon.stub();
      res.send = sinon.stub();
      next = sinon.stub();
    });
    it('should return 500 if null handler', function() {
      littleprinter.handler = null;
      littleprinter.defaultHandler(null, res, null);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should return 500 if undefined handler', function() {
      littleprinter.handler = undefined;
      littleprinter.defaultHandler(null, res, null);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should return 500 if null meta', function() {
      littleprinter.handler = { meta: null};
      littleprinter.defaultHandler(null, res, null);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should return 500 if undefined meta', function() {
      littleprinter.handler = { meta: undefined};
      littleprinter.defaultHandler(null, res, null);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should bind default edition if null edition', function() {
      littleprinter.handler = { meta: { }, edition: null};
      littleprinter.defaultHandler(null, res, next);
      assert.notEqual(littleprinter.handler.edition, null);
      assert(next.calledOnce);
    });
    it('should bind default edition if undefined edition', function() {
      littleprinter.handler = { meta: { }, edition: null};
      littleprinter.defaultHandler(null, res, next);
      assert.notEqual(littleprinter.handler.edition, null);
      assert(next.calledOnce);
    });
    it('should bind not change edition if defined', function() {
      littleprinter.handler = { meta: { }, edition: function() { }};
      littleprinter.defaultHandler(null, res, next);
      assert.equal(littleprinter.handler.edition, littleprinter.handler.edition);
      assert(next.calledOnce);
    });
    it('should bind default sample if null sample', function() {
      littleprinter.handler = { meta: { }, sample: null};
      littleprinter.defaultHandler(null, res, next);
      assert.notEqual(littleprinter.handler.sample, null);
      assert(next.calledOnce);
    });
    it('should bind default sample if undefined sample', function() {
      littleprinter.handler = { meta: { }, sample: null};
      littleprinter.defaultHandler(null, res, next);
      assert.notEqual(littleprinter.handler.sample, null);
      assert(next.calledOnce);
    });
    it('should bind not change sample if defined', function() {
      littleprinter.handler = { meta: { }, sample: function() { }};
      littleprinter.defaultHandler(null, res, next);
      assert.equal(littleprinter.handler.sample, littleprinter.handler.sample);
      assert(next.calledOnce);
    });
  });
});