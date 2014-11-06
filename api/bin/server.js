#!/usr/bin/nodejs
"use strict"

var basedir = __dirname + '/..'

// 3rd party.
var sqlite         = require('sqlite3')
var express        = require('express')()
var log4js         = require('log4js')
var async          = require('async')

var serverConfig   = require(basedir + '/etc/server-config.js')(basedir)
var loggerConfig   = require(basedir + '/etc/logger-config.js')(serverConfig.logFile, 'server')

var serverLogger   = require(basedir + '/lib/makeLogger.js')(log4js, loggerConfig)
var serverHelper   = require(basedir + '/lib/server-helper.js')(serverConfig)
var security       = require(basedir + '/lib/security.js')(serverConfig)

var db             = new sqlite.Database( serverConfig.dbFile )
var recipeAppClass = require(basedir + '/lib/app/recipeApp.js')
var recipeApp      = new recipeAppClass(db)

var connectedLogger = log4js.connectLogger(serverLogger, {})

express.use(connectedLogger)
express.use('/',           security.handleAccessControlAllowOrigin)
express.get('/',           serverHelper.showBanner)

express.get('/recipes/:recipeID', recipeApp.getRecipe.bind(recipeApp))

// Initialize the server and listen on port.
var server = express.listen(6622, function () {
     var host = server.address().address
     var port = server.address().port

    console.log("Zolan's Family Recipe API listening at http://%s:%s", host, port)
})
