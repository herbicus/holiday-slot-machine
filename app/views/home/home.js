'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AnimationController = require('../../modules/AnimationController');

var Home = Backbone.View.extend({

  events: {
    'click a': 'leverPull',
  },

  initialize: function() {
    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();
   
    this.leverPull();
  },

  leverPull: function() {

    this.animate.leverAnimation('#lever', '.lever-container');
      	
  }
});

module.exports = Home;
