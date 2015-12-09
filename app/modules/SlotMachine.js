'use strict';

var bowser = require('bowser');

var pixi = require('../vendor/pixi');
var PIXI = global.PIXI;

// var isMobile = bowser.mobile === true;
// var isTablet = bowser.tablet === true;
// var isIos = bowser.ios === true;
// var isAndroid = bowser.android === true;
// var isIe = bowser.msie === true;

module.exports = function() {
  this.init = function() {

    console.log('Frame.js loaded');

    var slots = document.querySelector('#home');

    var renderer = PIXI.autoDetectRenderer(960, 600, {antialias: true, transparent: true});
    slots.appendChild(renderer.view);

    var stage = new PIXI.Container();

    stage.interactive = true;

    // add a border to the mask
    this.bg = PIXI.Sprite.fromImage('images/slots-base_v1-wht.png');

    if (bowser.mobile === true) {

        // this.bg.anchor.x = 0.5;
        // this.bg.anchor.y = 0.35;

        // this.bg.scale.x = 0.75;
        // this.bg.scale.y = 0.75;
        this.bg.anchor.x = 0.5;
        this.bg.anchor.y = 0.45;

        this.bg.scale.x = 0.45;
        this.bg.scale.y = 0.45;
    } else {

        this.bg.anchor.x = 0.48;
        this.bg.anchor.y = 0.5;

        this.bg.scale.x = 0.55;
        this.bg.scale.y = 0.55;
    }

    this.bg.position.x = renderer.width / 2;
    this.bg.position.y = renderer.height / 2;

    stage.addChild(this.bg);

    // Mask shape
    // this.maskShape(renderer, stage);

    // images to mask
    // this.graphic(stage);
    this.drawLever(stage);
    //this.leverHitarea(stage);

    animate();
    
    function animate() {
      renderer.render(stage);
      requestAnimationFrame( animate );
    }
  };

  this.maskShape = function(arg, arg2) {

    this.arg = arg;
    this.arg2 = arg2;

    this.myMask = new PIXI.Graphics();

    this.myMask.lineStyle(2, 0xFF00FF, 1);
    this.myMask.beginFill(0xFFFF0B, 0.5);
    this.myMask.drawRoundedRect(190, 125, 420, 230, 15);
    this.myMask.endFill();

    arg2.addChild(this.myMask);

  };

  this.drawLever = function(arg) {

    this.arg = arg;

    this.spriteLever = PIXI.Sprite.fromImage('images/slots-lever.png');

    //this.spriteLever.setInteractive(true);

    this.spriteLever.anchor.x = -10;
    this.spriteLever.anchor.y = -0.015;

    this.spriteLever.scale.x = 0.8;
    this.spriteLever.scale.y = 0.8;

    this.arg.addChild(this.spriteLever);

    // $(this.spriteLever).on('click', function() {
    //     console.log('clicked jq');
    //     TweenMax.to(this.spriteLever, 0.5, {
    //         yoyo: true,
    //         repeat: -1,
    //         y: 40,
    //         ease: Back.easeInOut
    //     });
    // })

    // apply mask
    //this.mySprite.mask = this.myMask;

    // TweenMax.fromTo(this.mySprite, 0.75, {
    //  x: -400,
    //  y: 100,
    //  autoAlpha: 0,
    //  ease: Power2.easeInOut
    // }, {
    //  x: 0,
    //  y: 0,
    //  delay: 1,
    //  autoAlpha: 1,
    //  ease: Back.easeInOut
    // });

  };

  this.leverAction = function() {
    console.log('clicked jq');
    TweenMax.to(this.spriteLever, 0.5, {
        yoyo: true,
        repeat: -1,
        y: 40,
        ease: Back.easeInOut
    });
};


  this.leverHitarea = function(arg) {

    this.arg = arg;

    this.leverToHit = new PIXI.Graphics();

    this.leverToHit.beginFill(0xFF3300);
    this.leverToHit.lineStyle(10, 0xffd900, 1);

    this.leverToHit.drawRect(20, 20, 100, 200);
    this.leverToHit.endFill();

    this.leverToHit.interactive = true;
    this.leverToHit.buttonMode = true;

    // Add a hit area..
    this.leverToHitArea.hitArea = new PIXI.Rectangle(20, 20, 100, 200);

    this.leverToHitArea.anchor.x = 0.5;
    this.leverToHitArea.anchor.y = 0.5;

    this.leverToHitArea.scale.x = 0.8;
    this.leverToHitArea.scale.y = 0.8;

    this.arg.addChild(this.leverToHitArea);
    this.arg.addChild(this.leverToHit);

    this.leverToHitArea.onMouseDown = function (e) {
      console.log(this, e);
      console.log('clickd hit area');
    }

  };

  this.graphic = function(arg) {

    this.arg = arg;

    this.mySprite = PIXI.Sprite.fromImage('images/placeholder-slots.png');

    this.mySprite.anchor.x = -0.30;
    this.mySprite.anchor.y = -0.15;

    this.mySprite.scale.x = 0.8;
    this.mySprite.scale.y = 0.8;

    this.arg.addChild(this.mySprite);

    // apply mask
    this.mySprite.mask = this.myMask;

    // TweenMax.fromTo(this.mySprite, 0.75, {
    // 	x: -400,
    // 	y: 100,
    // 	autoAlpha: 0,
    // 	ease: Power2.easeInOut
    // }, {
    // 	x: 0,
    // 	y: 0,
    // 	delay: 1,
    // 	autoAlpha: 1,
    // 	ease: Back.easeInOut
    // });

  };

};
