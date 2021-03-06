var Big, assert, moduleUnderTest, sinon, _;

assert = require('chai').assert;

sinon = require('sinon');

_ = require('lodash');

Big = require('bignumber.js');

moduleUnderTest = require('../index');

describe('round:', function() {
  return it('должен возвращать строку', function() {
    var result, value;
    value = 0.53572376218474;
    result = moduleUnderTest.round('btc', value);
    return assert.equal(result, '0.53572376');
  });
});

describe('roundBig:', function() {
  return it('должен возвращать BigNumber', function() {
    var result, value;
    value = 0.53572376218474;
    result = moduleUnderTest.roundBig('btc', value);
    return assert.deepEqual(result, new Big('0.53572376'));
  });
});

describe('roundFloat:', function() {
  beforeEach(function() {
    return this.sandbox = sinon.sandbox.create();
  });
  it('должен округлять до необходимого количества знаков после запятой', function() {
    var result, value;
    value = 0.53572376218474;
    result = moduleUnderTest.roundFloat('btc', value);
    return assert.equal(result, 0.53572376);
  });
  it('должен округлять в нижнюю сторону', function() {
    var result, value;
    value = '0.5357237560915';
    result = moduleUnderTest.roundFloat('btc', value);
    return assert.equal(result, 0.53572375);
  });
  it('если длина дробной части короче предела, не должен изменять число', function() {
    var result, value;
    value = '0.530';
    result = moduleUnderTest.roundFloat('btc', value);
    return assert.equal(result, 0.53);
  });
  it('если длина дробной части равна пределу, не должен изменять число', function() {
    var result, value;
    value = 0.53501529;
    result = moduleUnderTest.roundFloat('btc', value);
    return assert.equal(result, value);
  });
  it('Если число меньше заданного предела, должен кидать ошибку EINVAL', function() {
    var err, error, value;
    value = 0.000000009;
    error = void 0;
    try {
      moduleUnderTest.roundFloat('btc', value);
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
