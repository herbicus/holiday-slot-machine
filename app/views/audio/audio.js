'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./audio.html');

var AppAudio = Backbone.View.extend({

  template: _.template(template()),

  events: {
  	'click #volumeIcon': 'onClick'
  },

  initialize: function() {

    this.$el.html(template());

    if ( this.model.get('mobile') || this.model.get('tablet') ) {
    	TweenMax.set($('#volumeIcon'), {display: 'none'});
    }
    
  },

  onClick: function() {

  	this.themeSong = document.querySelector('#theme');

  	if (this.themeSong.paused === false) {
  		this.themeSong.pause();
  		TweenMax.to($('#volumeIcon'), 0.5, {
  			autoAlpha: 0.35,
  			ease: Power2.easeOut
  		});
  	} else {
  		this.themeSong.play();
  		TweenMax.to($('#volumeIcon'), 0.5, {
  			autoAlpha: 1,
  			ease: Power2.easeOut
  		});
  	}
  }

});

module.exports = AppAudio;
