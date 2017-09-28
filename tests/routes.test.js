'use strict';


var expect = require('chai').expect;
var request = require('supertest-as-promised');

var app = require('../app');
var agent = request.agent(app);

var db = require('../server/db');
var Article = require('../server/db/models');
var User = require('../server/user');