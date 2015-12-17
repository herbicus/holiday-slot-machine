'use strict';

var $ = require('jquery');
var CSSPlugin = require('../vendor/gsap/plugins/CSSPlugin');
var snow = require('../vendor/snow');

module.exports = function() {

  this.letItSnow = function(snowAmount) {
    this.snowAmount = snowAmount;

    $.fn.snow({minSize: 5, maxSize: 50, newOn: snowAmount, flakeColor: '#fcfcfc'});

  };

};