#!/usr/bin/nodejs
"use strict"

var config = {
    banner:  "Connected to Zolan's Family Recipe API.",
    db_file: __dirname + '/data/family_recipes.sqlite',
    port:    6622,
    allowedOrigins: [
        'http://www.zolan.org',
        'http://zolan.org'
    ]
}

var sqlite         = require('sqlite3')
var express        = require('express')()

var db             = new sqlite.Database( config.db_file )
var recipeAppClass = require(__dirname + '/recipeApp.js')
var recipeApp      = new recipeAppClass(express, db)

var handleAccessControlAllowOrigin = function(req, res, next) {
    for(var idx in config.allowedOrigins) {
        var referrer = config.allowedOrigins[idx]

        if(req.headers.origin === referrer) {
            res.header('Access-Control-Allow-Origin', referrer)
        }
    }

    next()
}

var showBanner = function(req, res) { res.send(config.banner) }

express.use('/',           handleAccessControlAllowOrigin)
express.get('/',           showBanner)

express.use('/allRecipes', recipeApp.refreshRecipe('all'))
express.get('/allRecipes', recipeApp.sendRecipeByCacheKey('allRecipes'))

// Initialize the server and listen on port.
var server = express.listen(6622, function () {
     var host = server.address().address
     var port = server.address().port

    console.log("Zolan's Family Recipe API listening at http://%s:%s", host, port)
})
