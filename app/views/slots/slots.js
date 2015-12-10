'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./slots.html');

var Slots = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.$el.html(template());

  }

});

module.exports = Slots;
