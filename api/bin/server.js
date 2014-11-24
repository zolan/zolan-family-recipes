#!/usr/bin/nodejs
"use strict"

var basedir       = __dirname + '/..'

// 3rd party.
var express       = require('express')()
var bodyParser    = require('body-parser')
var log4js        = require('log4js')

// Configuration Objects
var serverConfig  = require(basedir + '/etc/server-config')(basedir)
var loggerConfig  = require(basedir + '/etc/logger-config')(serverConfig.logFile, serverConfig.logCategory, true)

// Parts of Zolan's Family Recipes.
var security      = require(basedir + '/lib/security')(serverConfig)
var recipeApp     = require(basedir + '/lib/recipeApp')
var serverHelper  = require(basedir + '/lib/server-helper')(serverConfig)

// Turns on logging.
var serverLogger  = require(basedir + '/lib/makeLogger')(log4js, loggerConfig, serverConfig.logCategory)
var expressLogger = log4js.connectLogger(serverLogger, {})
express.use(expressLogger)

// Gives 'req' a body object for easy access to json.
express.use(bodyParser.json())

// Handle 'Allow-Origin' headers.
express.use('/', security.handleAccessControlAllowOrigin)

// Parts of Zolan's Family Recipes.
express.get('/', serverHelper.showBanner)

express.get('/recipes/:recipeID', recipeApp.getRecipe.bind(recipeApp))
express.put('/recipes/:recipeID', recipeApp.putRecipe.bind(recipeApp))

express.get('/editFormOptions',   recipeApp.getEditFormOptions.bind(recipeApp))

// Initialize the server and listen on port.
var server = express.listen(6622, function () {
     var host = server.address().address
     var port = server.address().port

    console.log("Zolan's Family Recipe API listening at http://%s:%s", host, port)
})
