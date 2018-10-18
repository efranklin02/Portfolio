define([
    'superhero',
    'utils/ResizeManager',

    'views/components/VideoComponent',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, VideoComponent, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ui: {
            buttonPlay: '.button-video'
        },

        events: {
            'tap .button-video': '_buttonPlayHandler',
            'mousemove': '_mousemoveHandler',
            'mouseleave': '_mouseleaveHandler'
        },

        initialize: function() {
            _.bindAll(
                this,
                '_hideButtonPlayDelayHandler'
            );
        },

        onInitialized: function() {
          SectionBaseComponent.prototype.onInitialized.apply(this);

          this.addComponent('video', VideoComponent, '.video-wrapper');

          this._addEventListeners();
        },

        _addEventListeners: function() {

            this.listenTo(this.components.video, 'video:ended', this._videoEndedHandler);

        },

        _removeEventListeners: function() {

        },

        _deactivate: function() {
            this._pauseVideo();
            this._addPlayIcon();
        },

        _toggleVideo: function(e) {
            var button = e.currentTarget;

            //console.log

            if( button.classList.contains('button-video--play') || button.classList.contains('button-video--replay') ) {
                this._playVideo();
                this._addPauseIcon();
            }
            else if( button.classList.contains('button-video--pause') ) {
                this._pauseVideo();
                this._addPlayIcon();
            }
        },

        _addPauseIcon: function() {
            this.ui.buttonPlay.classList.remove('button-video--replay');
            this.ui.buttonPlay.classList.remove('button-video--play');
            this.ui.buttonPlay.classList.add('button-video--pause');
        },

        _addPlayIcon: function() {
            this.ui.buttonPlay.classList.remove('button-video--replay');
            this.ui.buttonPlay.classList.remove('button-video--pause');
            this.ui.buttonPlay.classList.add('button-video--play');
        },

        _playVideo: function() {

            this.components.video.play();
            this._setButtonPlayTimeout();

        },

        _pauseVideo: function() {
            if(!this.components.video) return;
            
            this.components.video.pause();
            this._showButtonPlay();

        },

        _showButtonPlay: function() {

            this._buttonPlayIsVisible = true;
            TweenMax.to(this.ui.buttonPlay, 0.2, {alpha: 1});

        },

        _hideButtonPlay: function() {

            this._buttonPlayIsVisible = false;
            TweenMax.to(this.ui.buttonPlay, 0.2, {alpha: 0});

        },

        _buttonPlayHandler: function(e) {
            console.log('_buttonPlayHandler', e);
            this._toggleVideo(e);
        },

        _mousemoveHandler: function(e) {

            if( this.ui.buttonPlay.classList.contains('button-video--pause') && !this._buttonPlayIsVisible ) {
                this._showButtonPlay();
                this._setButtonPlayTimeout();
            }

        },

        _setButtonPlayTimeout: function() {

            if(this._hideButtonPlayDelay) clearTimeout(this._hideButtonPlayDelay);
            this._hideButtonPlayDelay = setTimeout(this._hideButtonPlayDelayHandler, 1000);

        },

        _clearButtonPlayTimeout: function() {

            if(this._hideButtonPlayDelay) clearTimeout(this._hideButtonPlayDelay);

        },

        _hideButtonPlayDelayHandler: function(e) {

            this._clearButtonPlayTimeout();
            if( this.ui.buttonPlay.classList.contains('button-video--pause') ) {
                this._hideButtonPlay();
            }

        },

        _mouseleaveHandler: function(e) {
            
            if( this.ui.buttonPlay.classList.contains('button-video--pause') && this._buttonPlayIsVisible ) {
                this._hideButtonPlay();
            }

        },

        _videoEndedHandler: function(e) {
            console.log('video: end');
            this.ui.buttonPlay.classList.remove('button-video--pause');
            this.ui.buttonPlay.classList.remove('button-video--play');
            this.ui.buttonPlay.classList.add('button-video--replay');

            this._showButtonPlay();

        },




    });

});