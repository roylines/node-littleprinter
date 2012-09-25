var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('defaultSample', function() {
    var data;
    before(function(done) {
      littleprinter.defaultSample(function(e, d) {
        data = d;
        done(e, d);
      });
    });
    it('should set view', function() {
      assert.equal(data.view, 'sample');
    });
    it('should not set meta', function() {
      assert.equal(data.meta, null);
    });
  });
});