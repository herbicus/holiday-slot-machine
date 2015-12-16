'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
var Home = require('../views/home/home.js');
var Nav = require('../views/header-nav/nav.js');
var Slots = require('../views/slots/slots.js');
var Audio = require('../views/audio/audio.js');
var Greeting = require('../views/greeting/greeting.js');
var Overlays = require('../views/overlays/overlays.js');



var AppRouter = Backbone.Router.extend({

  model: null,
  home: null,
  greeting: null,

  start: function( m ) {

    this.model = m;
    this.nav = new Nav({el: $('#nav'), model: this.model});
    this.home = new Home({el: $('#home'), model: this.model});
    this.slots = new Slots({el: $('#slots'), model: this.model});
    this.audio = new Audio({el: $('#audio'), model: this.model});
    this.greeting = new Greeting({el: $('#greeting'), model: this.model});
    this.overlays = new Overlays({el: $('#overlays'), model: this.model});


    Backbone.history.start({pushState: false});
  },

  routes: {
    '': 'routeHome',
    home: 'routeHome',
    nav: 'routeNav',
    overlays: 'routeOverlays',
    greeting: 'routeGreeting'
  },

  routeHome: function() {
    this.model.set({route: 'home'});
  },

  routeSlots: function() {
    this.model.set({route: 'slots'});
  },

  routeAudio: function() {
    this.model.set({route: 'audio'});
  },

  routeNav: function() {
    this.model.set({route: 'nav'});
  },

  routeGreeting: function() {
    this.model.set({route: 'greeting'});
  },

  routeOverlays: function() {
    this.model.set({route: 'overlay'});
  },

});

module.exports = AppRouter;
