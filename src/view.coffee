"use strict"
window.highlight = (color) ->
  setState = (color, state) ->
    opacity = if state then 1 else 0.3
    document.getElementById(color).style.opacity = opacity

  setState("red", false)
  setState("yellow", false)
  setState("green", false)

  switch color
  	when "red" then setState("red", true)
  	when "yellow" then setState("yellow", true)
  	when "green" then setState("green", true)
