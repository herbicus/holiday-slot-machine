'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
var Home = require('../views/home/home.js');
var Slots = require('../views/slots/slots.js');
var AppAudio = require('../views/audio/audio.js');
var Greeting = require('../views/greeting/greeting.js');
var Overlays = require('../views/overlays/overlays.js');

var AppRouter = Backbone.Router.extend({

  model: null,
  home: null,
  greeting: null,

  start: function( m ) {

    this.model = m;
    this.home = new Home({el: $('#home'), model: this.model});
    this.slots = new Slots({el: $('#slots'), model: this.model});
    this.audio = new AppAudio({el: $('#audio'), model: this.model});
    this.greeting = new Greeting({el: $('#greeting'), model: this.model});
    this.overlays = new Overlays({el: $('#overlays'), model: this.model});

    Backbone.history.start({pushState: false});
  },

  routes: {
    '': 'routeHome',
    home: 'routeHome',
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

  routeGreeting: function() {
    this.model.set({route: 'greeting'});
  },

  routeOverlays: function() {
    this.model.set({route: 'overlay'});
  },

});

module.exports = AppRouter;
