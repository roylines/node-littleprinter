var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('defaultEdition', function() {
    var data;
    before(function(done) {
      littleprinter.defaultEdition('LDT', 'DC', 'OTHER', function(e, d) {
        data = d;
        done(e, d);
      });
    });
    it('should set view', function() {
      assert.equal(data.view, 'edition');
    });
    it('should set local delivery time', function() {
      assert.equal(data.meta.localDeliveryTime, 'LDT');
    });
    it('should set delivery count', function() {
      assert.equal(data.meta.deliveryCount, 'DC');
    });
    it('should set other', function() {
      assert.equal(data.meta.other, 'OTHER');
    });
  });
});