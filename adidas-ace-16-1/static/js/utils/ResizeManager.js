define([
    'underscore',
    'superhero',
    'bowser'
], function(_, Superhero, bowser) {

    var ResizeManager = Superhero.Module.extend({

        initialize:function() {
            _.bindAll(this, '_windowResizeHandler');

            this._updateValues();
            this.setupEventListeners();
        },

        setupEventListeners:function() {
            var resizeEvent = (bowser.tablet) ? 'orientationchange' : 'resize';
            //var resizeEvent = 'resize';
            window.addEventListener(resizeEvent, this._windowResizeHandler);
        },

        viewportWidth: function() {
            return this._viewportWidth || 0;
        },

        viewportHeight: function() {
            return this._viewportHeight || 0;
        },

        documentWidth: function() {
            var body = document.body;
            var html = document.documentElement;

            return Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
        },

        documentHeight: function() {
            var body = document.body;
            var html = document.documentElement;

            return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        },

        mainWidth: function() {
            return this._viewportWidth || 0;
        },

        mainHeight: function() { // bool
            return this._viewportHeight || 0;
        },

        forceResize: function() {
            this._updateValues();
            this.trigger('resize', {target:this});
        },

        _updateValues: function() {
            this._viewportWidth = window.innerWidth;
            this._viewportHeight = window.innerHeight;
        },

        _windowResizeHandler:function(e) {
            this._updateValues();
            this.trigger('resize', {target:this});
        },
    });

    return new ResizeManager();

});