'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./greeting-mobile.html');
var AnimationController = require('../../modules/AnimationController');

var About = Backbone.View.extend({

  template: _.template(template()),

  events: {
    'click a': 'onClick',
  },

  initialize: function() {

    // // underscore
    // var content = this.model.get('data');

    // //var data = this.model.get('data')
    // this.$el.html(this.template(content));

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();


  },

  hide: function() {
    this.animate.animateOut(this.el);
  },

  show: function() {
    this.animate.animateIn(this.el);
  },

  onClick:function(event) {
    // tracking call here
  },

  onRouteChange: function() {

    if (this.model.get('route') === 'greetingMobile' ){

      this.show();
    } else {
      this.hide();
    }
  }
});

module.exports = About;
