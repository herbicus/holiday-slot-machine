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

    this.manifest = [
      'images/icon01.png',
      'images/icon02.png',
      'images/icon03.png',
      'images/icon04.png',
      'images/icon05.png',
      'images/icon06.png',
      'images/icon07.png',
      'images/icon08.png',
      'images/icon09.png',
      'images/icon10.png',
      'images/icon11.png',
      'images/icon12.png',
      'images/icon13.png',
      'images/icon14.png',
      'images/icon15.png',
      'images/icon16.png',
      'images/icon17.png',
      'images/icon18.png',
      'images/icon19.png',
      'images/icon20.png',
      'images/icon21.png',
      'images/icon22.png',
      'images/icon23.png',
      'images/lever.png',
      'images/card-bg-grey.jpg',
      'images/rotate-tablet.png',
      'images/rotate-device.jpg',
      'images/UpAnim.gif',
      'images/DownAnim.gif'
    ]

    for (var i = 0; i < this.manifest.length; i++) {
      this.loadImage(this.manifest[i]);
    };

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
        display: 'none',
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
