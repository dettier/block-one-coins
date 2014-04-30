Big         =   require 'bignumber.js'

BigZero    = new Big 0

###
    Параметры криптовалют
    id : наименование
    blockInterval : среднее время генерации блока в секундах (для подсчета достаточного количества подтверждений транзакций)
    tick : стоковое представление дискреты валюты (минимальный номинал, тик)
    tickBig : представление tick в виде BigNumber для избежания ошибок округления floating point numbers 
###
module.exports =

    btc :
        id              : 'btc'
        blockInterval   : 600
        tick            : '0.00000001'
        tickBig         : new Big '0.00000001'

    doge :
        id              : 'doge'
        blockInterval   : 60
        tick            : '0.00000001'
        tickBig         : new Big '0.00000001'

    ltc :
        id              : 'ltc'
        blockInterval   : 180
        tick            : '0.00000001'
        tickBig         : new Big '0.00000001'

module.exports.getCoinParams = (coin) ->

    params = module.exports[coin?.toLowerCase()]

    if not params?
        throw new Error 'ENOSUP'

    params

module.exports.round = (currency, value) ->

    value = module.exports.roundBig currency, new Big value

    value?.toString()

module.exports.roundBig = (coin, value) ->

    params = module.exports.getCoinParams coin

    if not params?
        throw new Error 'ENOTSUP'

    if not value instanceof Big
        throw new Error 'EINVAL'

    value = value.dividedBy params.tickBig
    value = value.round 0, Big.ROUND_DOWN
    value = value.times params.tickBig

    if value.equals BigZero
        throw new Error 'EINVAL'

    value
