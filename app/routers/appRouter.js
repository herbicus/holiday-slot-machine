'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
var Home = require('../views/home/home.js');
var Nav = require('../views/header-nav/nav.js');
var Slots = require('../views/slots/slots.js');
var Greeting = require('../views/greeting/greeting.js');

var AppRouter = Backbone.Router.extend({

  model: null,
  home: null,
  greeting: null,

  start: function( m ) {

    this.model = m;
    this.nav = new Nav({el: $('#nav'), model: this.model});
    this.home = new Home({el: $('#home'), model: this.model});
    this.slots = new Slots({el: $('#slots'), model: this.model});
    this.greeting = new Greeting({el: $('#greeting'), model: this.model});

    Backbone.history.start({pushState: false});
  },

  routes: {
    '': 'routeHome',
    home: 'routeHome',
    nav: 'routeNav',
    greetingMobile: 'routeGreetingMobile',
    greeting: 'routeGreeting'
  },

  routeHome: function() {
    this.model.set({route: 'home'});
  },

  routeSlots: function() {
    this.model.set({route: 'slots'});
  },

  routeNav: function() {
    this.model.set({route: 'nav'});
  },

  routeGreeting: function() {
    this.model.set({route: 'greeting'});
  }
});

module.exports = AppRouter;
