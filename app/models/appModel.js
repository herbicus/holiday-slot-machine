'use strict';

var Backbone = require('backbone');
var bowser = require('bowser');

var isMobile = bowser.mobile === true;
var isTablet = bowser.tablet === true;
var isIos = bowser.ios === true;
var isAndroid = bowser.android === true;
var isIe = bowser.msie === true;
var isOpera = bowser.opera === true;
var isSafari = bowser.safari === true;
var currentIe = isIe && bowser.version > 10;

// update browser vars
var bBerry = bowser.blackberry === true;
var outdatedIe = isIe && bowser.version <= 11;
var outdatedIos = isIos && bowser.version < 7;
var outdatedSafari = isSafari && bowser.version < 7;
var outdatedAndroid = isAndroid && bowser.version < 4.2;
var desktopOpera = isOpera && isMobile === false && isTablet === false;

var outdatedBrowser = outdatedIe || outdatedIos || bBerry || desktopOpera || outdatedAndroid || outdatedSafari;

var AppModel = Backbone.Model.extend({
  urlRoot: './content/data.json',
  defaults: {
    setting: true,
    mobile: isMobile,
    ios: isIos,
    android: isAndroid,
    tablet: isTablet,
    ie: isIe,
    currentie: currentIe,
    outdated: outdatedBrowser,
    isMenuOpen: false,
  }
});

module.exports = AppModel;
