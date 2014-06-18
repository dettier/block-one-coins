var Big, BigZero, _;

_ = require('lodash');

Big = require('bignumber.js');

BigZero = new Big(0);

module.exports.connections = {
  protocol: 'tcp://',
  corePort: 17077,
  coreOrderbookPort: 17080,
  coreDealsPort: 17081,
  coreHistoryPort: 17082,
  coreHeartbeatPort: 17083,
  walletPort: 17090,
  historyPort: 17095
};

/*
    Параметры криптовалют
    id : наименование
    blockInterval : среднее время генерации блока в секундах (для подсчета достаточного количества подтверждений транзакций)
    tick : стоковое представление дискреты валюты (минимальный номинал, тик)
    tickBig : представление tick в виде BigNumber для избежания ошибок округления floating point numbers
*/


module.exports.coins = {
  btc: {
    id: 'btc',
    blockInterval: 600,
    tick: '0.00000001',
    tickBig: new Big('0.00000001')
  },
  doge: {
    id: 'doge',
    blockInterval: 60,
    tick: '0.00000001',
    tickBig: new Big('0.00000001')
  },
  ltc: {
    id: 'ltc',
    blockInterval: 180,
    tick: '0.00000001',
    tickBig: new Big('0.00000001')
  }
};

module.exports.getCoinParams = function(coin) {
  var params;
  params = module.exports.coins[coin != null ? coin.toLowerCase() : void 0];
  if (params == null) {
    throw new Error('ENOSUP');
  }
  return params;
};

module.exports.round = function(coin, value) {
  value = module.exports.roundFloat(coin, value.toString());
  return value != null ? value.toString() : void 0;
};

module.exports.roundBig = function(coin, value) {
  value = module.exports.roundFloat(coin, value.toString());
  return new Big(value);
};

module.exports.roundFloat = function(coin, value) {
  var params;
  if (!_.isNumber(value)) {
    value = parseFloat(value);
  }
  params = module.exports.getCoinParams(coin);
  if (params == null) {
    throw new Error('ENOTSUP');
  }
  value = value / params.tickBig;
  value = Math.floor(value);
  value = value * params.tickBig;
  if (value === 0) {
    throw new Error('EINVAL');
  }
  return value;
};
