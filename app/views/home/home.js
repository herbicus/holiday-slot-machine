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
  },

  leverPull: function() {
  	//var tl = new TimelineMax({paused: true});

  	// if (this.model.get('mobile') === false) {
   //    TweenMax.to('canvas', 0.5, {
   //      bottom: '-20%',
   //      ease: Power2.easeOut
   //    });
   //  }

  	// if($('canvas').hasClass('pulled')) {
  	// 	tl.reverse();
  	// } else {
  	// 	tl.play();
  	// }

  	// $('canvas').addClass('pulled');

  	
  }
});

module.exports = Home;
