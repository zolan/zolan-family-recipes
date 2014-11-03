#!/usr/bin/nodejs
"use strict"

var config = {
    db_file: __dirname + '/data/family_recipes.sqlite',
    port:    6622
}

var sqlite  = require('sqlite3')
var express = require('express')()

var db             = new sqlite.Database( config.db_file )
var recipeAppClass = require(__dirname + '/recipeApp.js')
var recipeApp      = new recipeAppClass(express, db)

express.get('/', function (req, res) {
  res.send("Connected to Zolan's Family Recipe API.")
})

express.use('/allRecipes', function(req,res,next) {
    recipeApp.allRecipesHandler(req, res, next)
})

express.get('/allRecipes', function (req, res) {
    res.send(recipeAppCacheByKey('allRecipes'))
})

var recipeAppCacheByKey = function(cacheKey) {
    return recipeApp.cache[cacheKey]
}

// Initialize the server and listen on port.
var server = express.listen(6622, function () {
     var host = server.address().address
     var port = server.address().port

    console.log("Zolan's Family Recipe API listening at http://%s:%s", host, port)
})
