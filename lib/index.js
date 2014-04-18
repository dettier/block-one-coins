var Big;

Big = require('bignumber.js');

/*
    Параметры криптовалют
    id : наименование
    blockInterval : среднее время генерации блока в секундах (для подсчета достаточного количества подтверждений транзакций)
    tick : стоковое представление дискреты валюты (минимальный номинал, тик)
    tickBig : представление tick в виде BigNumber для избежания ошибок округления floating point numbers
*/


module.exports = {
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
