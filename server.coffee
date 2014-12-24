express = require 'express'
fs = require "fs"
app = express()

app.use(express.static(__dirname + '/front/'))

app.get "/", (req, res) ->
  res.statusCode = 200
  fs.readFile "#{__dirname}/front/index.html", (err, data) ->
    console.log err  if err?
    res.write data
    res.end()

app.listen 3000
