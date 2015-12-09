'use strict';

var Backbone = require('backbone');
var bowser = require('bowser');

var isMobile = bowser.mobile === true;
var isTablet = bowser.tablet === true;
var isIos = bowser.ios === true;
var isAndroid = bowser.android === true;
var isIe = bowser.msie === true;

var AppModel = Backbone.Model.extend({
  urlRoot: './content/data.json',
  defaults: {
    setting: true,
    analytics: 'UA-xxx',
    mobile: isMobile,
    ios: isIos,
    android: isAndroid,
    tablet: isTablet,
    ie: isIe,
    isMenuOpen: false
  }
});

module.exports = AppModel;
