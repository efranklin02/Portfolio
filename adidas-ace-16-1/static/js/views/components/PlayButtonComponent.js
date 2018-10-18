define([
    'superhero',
    'easeljs',
    'bowser'
], function(Superhero, easeljs, bowser) {

    return Superhero.Component.extend({

        ui: {
            canvas: '.button-play__canvas'
        },

        events: {
           'mouseenter': '_buttonMouseEnterHandler',
           'mouseleave': '_buttonMouseLeaveHandler'
        },

        initialize: function() {
            _.bindAll(this, '_updateStage');
        },

        onInitialized: function() {
            this._inactive = this.el.dataset.inactive ? true : false;

            if(this._inactive) this.el.style.cursor = 'default';

            console.log('this._inactive',this._inactive);

            this._createStage();
            this._buildPulseButton();
            
            this._buildPulseAnimation();
            this._buildAnimation();

            //this._inAnimation.play();
        },

        show: function() {
            this._inAnimation.play(0);
        },

        stop: function() {
            this._inAnimation.progress(0).stop();
        },

        _updateStage: function() {
            this._stage.update();

        },

        _createStage: function () {
            this._stage = new createjs.Stage(this.ui.canvas);
        },

        _buildAnimation: function() {
            this._inAnimation = new TimelineMax({paused:true, onUpdate:this._updateStage});
            this._inAnimation.fromTo([this._circleOuter, this._circleInner], 0.5, {scaleY:0 ,scaleX:0}, {scaleY:1 ,scaleX:1, ease:Quint.easeOut},1);
            if(!this._inactive) this._inAnimation.fromTo(this._playIcon, 0.5, {x:-20}, {x:40, ease:Quint.easeOut},1);
            this._inAnimation.add(this._pulseAnimation, 1.5);
        },

        _buildPulseAnimation: function() {
            this._pulseAnimation = new TimelineMax({repeat:-1});
            this._pulseAnimation.staggerTo([this._circleOuter, this._circleInner], 0.5, {scaleY:0.9 ,scaleX:0.9, repeat:1, yoyo:true, ease:Back.easeOut}, 0.1, 0);
        },

        _buildPulseButton: function() {
            this._circleOuter = new createjs.Shape();
            this._circleOuter.graphics.beginFill("#fff").drawCircle(0, 0, 30);
            this._circleOuter.x = 40;
            this._circleOuter.y = 40;
            this._circleOuter.alpha = 0.5;

            this._circleInner = new createjs.Shape();
            this._circleInner.graphics.beginFill("#fff").drawCircle(0, 0, 17);
            this._circleInner.x = 40;
            this._circleInner.y = 40;

            this._playIcon = new createjs.Shape();
            this._playIcon.graphics
                .beginFill('#d51a74')
                .lineTo(0, 0)
                .lineTo(0, 14)
                .lineTo(10, 7);
            this._playIcon.regY = 7;
            this._playIcon.regX = 4;

            this._playIcon.x = 40;
            this._playIcon.y = 40;
            this._playIcon.mask = this._circleInner;

            if(this._inactive) this._playIcon.alpha = 0;

            this._stage.addChild(this._circleOuter, this._circleInner, this._playIcon);
            this._updateStage();
        },

        _buttonMouseEnterHandler: function() {
            if(bowser.tablet || this._inactive) return;

            this._pulseAnimation.stop();

            TweenMax.to(this._circleOuter, 0.3, {scaleX:0.5, scaleY:0.5, ease:Power2.easeOut});
            TweenMax.to(this._circleInner, 0.3, {scaleX:1.3, scaleY:1.3, ease:Power2.easeOut});
        },

        _buttonMouseLeaveHandler: function() {
            if(bowser.tablet || this._inactive) return;
            
            TweenMax.to(this._circleOuter, 0.3, {scaleX:1, scaleY:1, delay:0.1, ease:Power2.easeOut});
            TweenMax.to(this._circleInner, 0.3, {scaleX:1, scaleY:1, ease:Power2.easeOut});
        }



    });

});