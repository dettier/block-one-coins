assert          = require('chai').assert
sinon           = require 'sinon'

_               = require 'lodash'

Big             = require 'bignumber.js'

moduleUnderTest = require '../index'

describe 'round:', ->
    
    it 'должен возвращать строку', ->
        
        value = 0.53572376218474

        result = moduleUnderTest.round 'btc', value

        assert.equal result, '0.53572376'

describe 'roundBig:', ->

    it 'должен возвращать BigNumber', ->

        value = 0.53572376218474

        result = moduleUnderTest.roundBig 'btc', value

        assert.deepEqual result, new Big '0.53572376'
        
        
describe 'roundFloat:', ->

    beforeEach ->
        @sandbox    = sinon.sandbox.create()    
    
    it 'должен округлять до необходимого количества знаков после запятой', ->

        value = 0.53572376218474
    
        result = moduleUnderTest.roundFloat 'btc', value
    
        assert.equal result, 0.53572376

    it 'должен округлять в нижнюю сторону', ->

        value = '0.5357237560915'

        result = moduleUnderTest.roundFloat 'btc', value

        assert.equal result, 0.53572375

    it 'если длина дробной части короче предела, не должен изменять число', ->

        value = '0.530'

        result = moduleUnderTest.roundFloat 'btc', value

        assert.equal result, 0.53

    it 'если длина дробной части равна пределу, не должен изменять число', ->

        value = 0.53501529

        result = moduleUnderTest.roundFloat 'btc', value

        assert.equal result, value

    it 'Если число меньше заданного предела, должен кидать ошибку EINVAL', ->

        value = 0.000000009
        error = undefined

        try
            moduleUnderTest.roundFloat 'btc', value
        catch err
            error = err

        assert.deepEqual error, new Error 'EINVAL'        
        
    afterEach ->
        @sandbox.restore()        