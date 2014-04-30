var Big, BigZero;

Big = require('bignumber.js');

BigZero = new Big(0);

/*
    Параметры криптовалют
    id : наименование
    blockInterval : среднее время генерации блока в секундах (для подсчета достаточного количества подтверждений транзакций)
    tick : стоковое представление дискреты валюты (минимальный номинал, тик)
    tickBig : представление tick в виде BigNumber для избежания ошибок округления floating point numbers
*/


module.exports = {
  MessageTypes: require('./message-enums'),
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
  params = module.exports[coin != null ? coin.toLowerCase() : void 0];
  if (params == null) {
    throw new Error('ENOSUP');
  }
  return params;
};

module.exports.round = function(currency, value) {
  value = module.exports.roundBig(currency, new Big(value));
  return value != null ? value.toString() : void 0;
};

module.exports.roundBig = function(coin, value) {
  var params;
  params = module.exports.getCoinParams(coin);
  if (params == null) {
    throw new Error('ENOTSUP');
  }
  if (!value instanceof Big) {
    throw new Error('EINVAL');
  }
  value = value.dividedBy(params.tickBig);
  value = value.round(0, Big.ROUND_DOWN);
  value = value.times(params.tickBig);
  if (value.equals(BigZero)) {
    throw new Error('EINVAL');
  }
  return value;
};
