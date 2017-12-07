var should = require('should');
var attachLabels = require('../');

describe('attach-labels node module', function () {
  it('must have at least one test', function () {
    attachLabels();
    should.fail('Need to write tests.');
  });
});
