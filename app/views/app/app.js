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

    this.loadImage('images/icon01.png');
    this.loadImage('images/icon02.png');
    this.loadImage('images/icon03.png');
    this.loadImage('images/icon04.png');
    this.loadImage('images/icon05.png');
    this.loadImage('images/icon06.png');
    this.loadImage('images/icon07.png');
    this.loadImage('images/icon08.png');
    this.loadImage('images/icon09.png');
    this.loadImage('images/icon10.png');
    this.loadImage('images/icon11.png');
    this.loadImage('images/icon12.png');
    this.loadImage('images/icon13.png');
    this.loadImage('images/icon14.png');
    this.loadImage('images/icon15.png');
    this.loadImage('images/icon16.png');
    this.loadImage('images/icon17.png');
    this.loadImage('images/icon18.png');
    this.loadImage('images/icon19.png');
    this.loadImage('images/icon20.png');
    this.loadImage('images/icon21.png');
    this.loadImage('images/icon22.png');
    this.loadImage('images/icon23.png');
    this.loadImage('images/lever.png');
    this.loadImage('images/card-bg-grey.jpg');
    this.loadImage('images/rotate-tablet.png');
    this.loadImage('images/rotate-device.jpg');
    this.loadImage('images/UpAnim.gif');
    this.loadImage('images/DownAnim.gif');

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
