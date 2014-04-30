var Big, assert, moduleUnderTest, sinon, _;

assert = require('chai').assert;

sinon = require('sinon');

_ = require('lodash');

Big = require('bignumber.js');

moduleUnderTest = require('../src/index');

describe('round:', function() {
  beforeEach(function() {
    return this.sandbox = sinon.sandbox.create();
  });
  it('должен округлять до необходимого количества знаков после запятой', function() {
    var result, value;
    value = '0.53572376218474';
    result = moduleUnderTest.round('btc', value);
    return assert.equal(result, '0.53572376');
  });
  it('должен округлять в нижнюю сторону', function() {
    var result, value;
    value = '0.5357237560915';
    result = moduleUnderTest.round('btc', value);
    return assert.equal(result, '0.53572375');
  });
  it('если дробная часть короче предела, не должен изменять число', function() {
    var result, value;
    value = '0.535';
    result = moduleUnderTest.round('btc', value);
    return assert.equal(result, value);
  });
  it('если дробная часть равна пределу, не должен изменять число', function() {
    var result, value;
    value = '0.53501529';
    result = moduleUnderTest.round('btc', value);
    return assert.equal(result, value);
  });
  it('Если число меньше заданного предела, должен кидать ошибку EINVAL', function() {
    var err, error, value;
    value = '0.000000009';
    error = void 0;
    try {
      moduleUnderTest.round('btc', value);
    } catch (_error) {
      err = _error;
      error = err;
    }
    return assert.deepEqual(error, new Error('EINVAL'));
  });
  return afterEach(function() {
    return this.sandbox.restore();
  });
});
