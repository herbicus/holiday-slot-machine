'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./audio.html');

var Audio = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.$el.html(template());
    
  }

});

module.exports = Audio;