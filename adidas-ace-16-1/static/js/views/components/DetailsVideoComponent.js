define([
    'superhero',
    'utils/TrackingManager',
    'utils/ResizeManager',
    'easeljs',
    'bowser',
], function(Superhero, TrackingManager, ResizeManager, easeljs, bowser) {

    return Superhero.Component.extend({

        CANVAS_CLASSNAME: 'details-list-video__canvas',

        ui: {
            video: 'video',
            button: '.button-close',
            progress: '.details-list-video__progress',
            bar: '.details-list-video__progress-bar',
        },

        events: {
            'tap .button-close': '_buttonCloseClickedHandler'
        },

        initialize: function(options) {

            _.bindAll(
                this,
                '_videoEndedHandler',
                '_videoPauseHandler',
                '_videoPlayHandler',
                '_timeUpdateHandler',
                '_tickerHandler',
                '_transitionOutCompletedHandler'
            );


        },

        onInitialized: function() {

            this._videoWidth = this.ui.video.width;
            this._videoHeight = this.ui.video.height;

            this.playCount = 0;

            this._setupEventListeners();

            this.removeNoJsAttributes();
        },

        removeNoJsAttributes : function () {
            
            //this.ui.video.removeAttribute('poster');
            this.ui.video.removeAttribute('controls');

        },

        onClose: function(){

            this._removeEventListeners();

        },

        build: function() {

            if(!bowser.tablet) {
                this._createStage();
                this._buildStage();
                this._hideVideoElement();
                
            }

            this._resize();

            this._setupTransitionIn();
            this._setupTransitionOut();

            this._hide();
        },


        // PUBLIC

        play: function() {
            
            
            this.ui.video.play();

            this._showVideo();
        },

        pause: function() {
           
            this.ui.video.pause();
        },

        stop: function() {

            this.ui.video.currentTime = 0;
            this.ui.video.pause();

            TrackingManager.trackVideoEvent({
                event    : 'stop',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        close: function() {
            this._resetVideoElement();
        },

        getVideoDuration: function () {
            return this.ui.video.duration;
        },

        getCurrentTime: function() {

            return this.ui.video.currentTime;

        },

        resize: function() {
            this._resize();
        },  

        // PRIVATE
        // 
        
        _setupTransitionIn: function() {
            this._transitionIn = new TimelineMax({paused:true});

            if(this._mask) this._transitionIn.fromTo(this._mask, 0.6, {scaleY:0, scaleX:0}, {scaleY:12, scaleX:10, ease:Power3.easeIn},0);
            if(this._bitmapData) this._transitionIn.fromTo(this._bitmapData, 0.5, {alpha:0}, {alpha:1, ease:Linear.easeNone},0);
            this._transitionIn.fromTo(this.ui.progress, 0.5, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone},0.5);
            this._transitionIn.fromTo(this.ui.button, 0.5, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone},0.5);
        },

        _setupTransitionOut: function() {
            this._transitionOut = new TimelineMax({paused:true, onComplete:this._transitionOutCompletedHandler});

            if(this._mask) this._transitionOut.to(this._mask, 0.6, {scaleY:0, scaleX:0, ease:Power3.easeOut},0);
            this._transitionOut.to(this.ui.progress, 0.3, {autoAlpha:0, ease:Linear.easeNone},0);
            this._transitionOut.to(this.ui.button, 0.3, {autoAlpha:0, ease:Linear.easeNone},0);
            if(this._bitmapData) this._transitionOut.to(this._bitmapData, 0.4, {alpha:0, ease:Linear.easeNone},0.4);

        },

        _hide: function() {
            this.el.style.display = 'none';
        },

        _show: function() {
            this.el.style.display = 'block';
        },
        
        _hideVideoElement: function() {
            this.ui.video.style.left = '100%';
        },

        _getDuration: function() {

            return this.ui.video.duration;

        },

        _setupEventListeners: function() {

            this.listenTo(ResizeManager, 'resize', this._resizeHandler);
            this.ui.video.addEventListener('timeupdate', this._timeUpdateHandler);
            this.ui.video.addEventListener('ended', this._videoEndedHandler);
            this.ui.video.addEventListener('pause', this._videoPauseHandler);
            this.ui.video.addEventListener('play', this._videoPlayHandler);
            TweenMax.ticker.addEventListener('tick',this._tickerHandler);

        },

        _removeEventListeners: function() {

            this.stopListening(ResizeManager, 'resize', this._resizeHandler);
            this.ui.video.removeEventListener('timeupdate', this._timeUpdateHandler);
            this.ui.video.removeEventListener('ended', this._videoEndedHandler);
            this.ui.video.removeEventListener('pause', this._videoPauseHandler);
            this.ui.video.removeEventListener('play', this._videoPlayHandler);
            TweenMax.ticker.removeEventListener('tick',this._tickerHandler);

        },

        _resize: function() {

            if(this._canvas) {
                this._width = ResizeManager.viewportWidth();
                this._height = ResizeManager.viewportHeight();

                //console.log(this._width, this._height, this._canvas, this._videoWidth, this._videoHeight, this._canvas.parentNode);

                var cover = com.adidas.ace16.desktop.getCoverSize(this._width, this._height, this._videoWidth, this._videoHeight);

                this._canvas.style.width = cover.width + 'px';
                this._canvas.style.height = cover.height + 'px';

                this._canvas.style.top = cover.y + 'px';
                this._canvas.style.left = cover.x + 'px';
            }

        },

        _createStage: function() {
            this._canvas = document.createElement('canvas');
            this._canvas.width = this._videoWidth;
            this._canvas.height = this._videoHeight;
            this._canvas.classList.add(this.CANVAS_CLASSNAME);

            this._stage = new createjs.Stage(this._canvas);

            this.el.appendChild(this._canvas);
        },

        _buildStage: function() {
            this._bitmapData = new createjs.Bitmap(this.ui.video);
            this._mask = new createjs.Shape(); //  draw ace figure
            this._mask.graphics
                .beginFill('#0F0')
                .moveTo(0,0)
                .lineTo(221, 370)
                .lineTo(319, 205)
                .lineTo(0, -331)
                .lineTo(-319, 205)
                .lineTo(-221, 370)
                .lineTo(0, 0)
                .endFill();

            this._mask.scaleY = 0;
            this._mask.scaleX = 0;
            this._mask.regY = -50;

            this._mask.x = this._videoWidth / 2;
            this._mask.y = this._videoHeight / 2;

            this._bitmapData.mask = this._mask;

            this._stage.addChild(this._bitmapData);

        },

        _showVideo: function() {
            if(this._isVisible) return;
            this._show();

            this._isVisible = true;
            this._transitionIn.play(0);
        },

        _closeVideo: function() {
            if(!this._isVisible) return;
            
            this.pause();
            this._transitionOut.play(0);
        },

        _resetVideoElement: function() {
            this._isVisible = false;

            this._hide();
            this.stop();
        },

        _updateStage: function() {
            if(!this._stage) return;

            this._stage.update();
        },

        _updateProgressBar: function() {
            var perc = this._percProgression / 100;
            TweenMax.set(this.ui.bar, {scaleX:perc, transformOrigin:'top left'});
        },

        _videoProgress: function() {

            var cur = this.getCurrentTime();
            var dur = this._getDuration();
            var perc = (100/dur) * cur;

            this._percProgression = perc;

            this._updateProgressBar();

        },

        _transitionOutCompletedHandler: function() {
            this._resetVideoElement();
        },

        _buttonCloseClickedHandler: function() {
            this._closeVideo();
        },

        _resizeHandler: function() {

            this._resize();

        },

        _tickerHandler: function() {
            this._updateStage();
        },

        _videoPauseHandler : function  () {

            // Oncomplete a pause event is fired. we dont need that!
            if(this.getVideoDuration() == this.getCurrentTime()) return;

            TrackingManager.trackVideoEvent({
                event    : 'stop',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        _videoPlayHandler : function  () {

            console.log('_videoPlayHandler');

            TrackingManager.trackVideoEvent({
                event    : this.playCount++ == 0 ? 'start' : 'play',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        _videoEndedHandler: function() {

            this._closeVideo();

            this.trigger('video:ended');

            TrackingManager.trackVideoEvent({
                event    : 'complete',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        _timeUpdateHandler: function() {

            this._videoProgress();

            //console.log(this._percProgression);

        },

    });

});
