'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./overlays.html');
var AnimationController = require('../../modules/AnimationController');

var Overlays = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.$el.html(template());

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();
    
  },

  hide: function() {

    this.animate.animateOut(this.el);

  },

  show: function() {

    this.animate.animateIn(this.el);

  },

  onRouteChange: function() {

  	if (this.model.get('outdated')) {
      
      this.show();
      
      TweenMax.to($('.outdated-overlay'), 0.5, {
        display: 'block',
        autoAlpha: 1,
        zIndex: 9999,
        onComplete: function() {
          TweenMax.to('.overlay-wrap', 0.5, {
            top: 0,
            autoAlpha: 1,
            ease: Power3.easeOut
          });
        }
      });

    } else {
      this.hide();  
    }

  }

});

module.exports = Overlays;
