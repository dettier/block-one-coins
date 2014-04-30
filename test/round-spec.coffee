assert          = require('chai').assert
sinon           = require 'sinon'

_               = require 'lodash'

Big             = require 'bignumber.js'

moduleUnderTest = require '../index'


describe 'round:', ->

    beforeEach ->
        @sandbox    = sinon.sandbox.create()

    it 'должен округлять до необходимого количества знаков после запятой', ->

        value = '0.53572376218474'

        result = moduleUnderTest.round 'btc', value

        assert.equal result, '0.53572376'

    it 'должен округлять в нижнюю сторону', ->

        value = '0.5357237560915'

        result = moduleUnderTest.round 'btc', value

        assert.equal result, '0.53572375'

    it 'если дробная часть короче предела, не должен изменять число', ->

        value = '0.535'

        result = moduleUnderTest.round 'btc', value

        assert.equal result, value

    it 'если дробная часть равна пределу, не должен изменять число', ->

        value = '0.53501529'

        result = moduleUnderTest.round 'btc', value

        assert.equal result, value

    it 'Если число меньше заданного предела, должен кидать ошибку EINVAL', ->

        value = '0.000000009'
        error = undefined

        try
            moduleUnderTest.round 'btc', value
        catch err
            error = err

        assert.deepEqual error, new Error 'EINVAL'

    afterEach ->
        @sandbox.restore()