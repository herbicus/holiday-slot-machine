'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var App = require('./views/app/app');

$(window).load(function() {
  window.app = new App({el: $('main')});
});
