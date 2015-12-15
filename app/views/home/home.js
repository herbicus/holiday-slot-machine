'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./home.html');
var AnimationController = require('../../modules/AnimationController');

var Home = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.$el.html(template());

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();

    document.querySelector('#theme').play();

    $('.slots-container').removeClass('hasWon');

  },

  hide: function() {

    this.animate.animateOut(this.el);

  },

  show: function() {

    this.animate.animateIn(this.el);

  },

  onRouteChange: function() {

    if (this.model.get('route') === 'home' ){
      this.show();
    } else {
      this.hide();
    }
  }

});

module.exports = Home;
