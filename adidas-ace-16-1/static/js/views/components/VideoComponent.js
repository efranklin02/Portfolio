define([
    'superhero',
    'utils/TrackingManager',
    'utils/ResizeManager',
], function(Superhero, TrackingManager, ResizeManager) {

    return Superhero.Component.extend({

        ui: {
            poster: '.video-wrapper__poster',
            video: 'video'
        },

        initialize: function(options) {

            _.bindAll(
                this,
                '_videoEndedHandler',
                '_videoPauseHandler',
                '_videoPlayHandler',
                '_timeUpdateHandler',
                '_resize'
            );

        },

        onInitialized: function() {


            this._videoWidth = this.ui.video.width;
            this._videoHeight = this.ui.video.height;

            this.playCount = 0;

            this._resizeDebounce();

            this._setupEventListeners();

            this.removeNoJsAttributes();

            
        },

        removeNoJsAttributes : function () {
            
            this.ui.video.removeAttribute('poster');
            this.ui.video.removeAttribute('controls');

        },

        onClose: function(){

            this._removeEventListeners();

        },


        // PUBLIC

        play: function() {

            this.ui.video.play();

            this._showVideoElement();

            this._hidePoster();

        },

        pause: function() {

            this.ui.video.pause();

        },

        stop: function() {

            this.ui.video.currentTime = 0;
            this.ui.video.pause();

            this._showPoster();

            TrackingManager.trackVideoEvent({
                event    : 'stop',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        mute: function() {

            this.ui.video.muted = false;

        },

        unmute: function() {

            this.ui.video.muted = true;

        },

        getVideoDuration: function () {
            return this.ui.video.duration;
        },

        getCurrentTime: function() {

            return this.ui.video.currentTime;

        },

        // PRIVATE
        // 
        _hideVideoElement: function() {
            this._isVisible = false;
            this.ui.video.style.visibility = 'hidden';
        },

        _hidePoster: function() {
            if(!this.ui.poster) return;
            this.ui.poster.style.display = 'none';
        },

        _showPoster: function() {
            if(!this.ui.poster) return;
            this.ui.poster.style.display = 'block';
        },

        _showVideoElement: function() {
            if(this._isVisible) return;

            this._isVisible = true;
            this.ui.video.style.visibility = 'visible';
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

        },

        _removeEventListeners: function() {

            this.stopListening(ResizeManager, 'resize', this._resizeHandler);
            this.ui.video.removeEventListener('timeupdate', this._timeUpdateHandler);
            this.ui.video.removeEventListener('ended', this._videoEndedHandler);
            this.ui.video.removeEventListener('pause', this._videoPauseHandler);
            this.ui.video.removeEventListener('play', this._videoPlayHandler);

        },

        _resize: function() {
            this._width = this.ui.video.parentNode.offsetWidth;
            this._height = this.ui.video.parentNode.offsetHeight < 400 ? 400 : this.ui.video.parentNode.offsetHeight;

            var cover = com.adidas.ace16.desktop.getCoverSize(this._width, this._height, this._videoWidth, this._videoHeight);

            this.ui.video.style.width = cover.width + 'px';
            this.ui.video.style.height = cover.height + 'px';
            this.ui.video.style.top = cover.y + 'px';
            this.ui.video.style.left = cover.x + 'px';

            if(this.ui.poster) {
                this.ui.poster.style.top = cover.y + 'px';
                this.ui.poster.style.left = cover.x + 'px';
                this.ui.poster.style.width = cover.width + 'px';
                this.ui.poster.style.height = cover.height + 'px';
            }
        },

        _resizeDebounce: function() {
            if(this._resizeDebounceTimeOut) clearTimeout(this._resizeDebounceTimeOut);
            this._resizeDebounceTimeOut = setTimeout(this._resize, 100);
        },

        _resizeHandler: function() {
            this._resizeDebounce();
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

            this.trigger('video:ended');

            TrackingManager.trackVideoEvent({
                event    : 'complete',
                duration : this.getVideoDuration(),
                position : this.getCurrentTime(),
                name     : this.ui.video.dataset.videoName
            });

        },

        _videoProgress: function() {

            var cur = this.getCurrentTime();
            var dur = this._getDuration();
            var perc = (100/dur) * cur;

            var percProgression = -100 + perc;

        },

        _timeUpdateHandler: function() {

            this._videoProgress();

        },

    });

});
