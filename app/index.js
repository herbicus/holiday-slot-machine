'use strict';

// var pixi = require('../vendor/pixi');
// var PIXI = global.PIXI;
// var TweenMax = require('TweenMax');
// var TweenMax = global.TweenMax;

var $ = window.$ = window.jQuery = require('jquery');
var App = require('./views/app/app');

$(window).load(function() {
  window.app = new App({el: $('main')});
});
