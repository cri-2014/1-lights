'use strict'

states =
  RED: "red"
  YELLOW: "yellow"
  GREEN: "green"

eventEmitter = new EventEmitter

class Light
  __state = null
  __timeoutId = null

  constructor: (@redTime, @yellowTime, @greenTime) ->

  getState: ->
    __state

  toRed: =>
    __state = states.RED
    eventEmitter.emit "change", states.RED
    __timeoutId = setTimeout @toGreen, @redTime

  toYellow: =>
    __state = states.YELLOW
    eventEmitter.emit "change", states.YELLOW
    __timeoutId = setTimeout @toRed, @yellowTime

  toGreen: =>
    __state = states.GREEN
    eventEmitter.emit "change", states.GREEN
    __timeoutId = setTimeout @toYellow, @greenTime

  toGreenImmediately: =>
    setTimeout =>
      clearTimeout(__timeoutId) if __timeoutId?

      __state = states.GREEN
      eventEmitter.emit "change", states.GREEN
      __timeoutId = setTimeout @toYellow, 10000
    , 3000

    clearTimeout(__timeoutId) if __timeoutId?


light = new Light(1000, 100, 1000)

eventEmitter.on "tram", light.toGreenImmediately
eventEmitter.on "change", (color) ->
  window.highlight(color)

light.toRed()

setInterval ->
  eventEmitter.trigger("tram")
, 30000
