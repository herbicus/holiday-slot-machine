'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AppModel = require('../../models/appModel');
var AppRouter = require('../../routers/appRouter');

var App = Backbone.View.extend({

  model: null,
  loaded: 0,
  loading:0,
  preloadBar: null,

  initialize: function() {
    this.preloadBar = $('#loading-bar');
    this.model = new AppModel();
    this.listenTo(this.model, 'change', this.onModelLoaded);
    this.loading++;
    this.model.fetch();

    // if ( this.model.get('mobile') ){
    //   this.loadImage( 'images/mobile-background.jpg' );
    // } else {
    //   this.loadImage( 'images/desktop-background.jpg' );
    // }

    // Put Images to Load Here Like So
    // this.loadImage( 'images/your-image.jpg' );
    // this.loadImage( 'images/your-image.png' );
    // this.loadImage( 'images/your-image.gif' );

    this.loadImage('https://placekitten.com/g/500/500');
    this.loadImage('https://placekitten.com/g/600/500');
    this.loadImage('https://placekitten.com/g/700/700');

  },

  loadImage: function( path ) {
    this.loading++;
    var image = new Image();
    $( image ).on('load', this.onImageLoaded.bind(this));
    image.src = path;
  },

  onImageLoaded: function() {
    this.loaded++;
    this.preloadBar.css( 'width', ((this.loaded / this.loading) * 100) + '%' );
    var _model = this.model;
    var _show = this.show.bind(this);
    if ( ((this.loaded / this.loading) * 100) === 100 ){
      TweenMax.to( this.preloadBar.parent(), 0.25, {
        autoAlpha: 0, 
        onComplete: function() {
          var appRouter = new AppRouter();
          appRouter.start( _model );
          _show();
        }
      });
    }
  },

  show: function() {
    TweenMax.to(this.el, 0, {alpha: 0});
    this.$el.removeClass('displayNone');
    TweenMax.to(this.el, 0.25, {delay: 0.5, alpha: 1});
  },

  onModelLoaded: function() {
    this.stopListening(this.model, 'change', this.onModelLoaded);
    this.onImageLoaded();
  }
});

module.exports = App;
