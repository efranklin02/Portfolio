define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

], function(Superhero, ResizeManager, ScrollManager) {

    return Superhero.Component.extend({

        ADIDAS_HEADER_HEIGHT: 48,
        _isActive: false,

        ui: {
            bar: '.main-navigation__progress-bar',
        },

        initialize: function(options) {

            _.bindAll(this, '_resize');

            this._navigationProgressItem = options.el;
            this._productData = options.el.getAttribute('data-product');
            this._productTracking = options.el.getAttribute('data-tracking');
       
        },

        onInitialized: function() {

            this._currentScrollPos = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT;

            this._mainScrollElement = document.querySelector('.main-scroll');
            this._product = document.querySelector('.' + this._productData);

            this._resize();

            this._checkActiveProduct();

            this._addEventListeners();
          
        },

        _addEventListeners: function() {
            this.listenTo(ScrollManager, 'parallax', this._scrollHandler);
            this.listenTo(ResizeManager, 'resize', this._resizeHandler);
        },

        _updateScrollProcess: function() {

            this._scrollLimit = this._offsetTop + this._height;

            if (this._currentScrollPos <= this._scrollLimit && this._currentScrollPos >= this._offsetTop) {
                this._progress();
                console.log('active ', this._productData);
            } else {
                TweenMax.to(this.ui.bar, 0.4, {scaleY:0, ease:Linear.easeNone});
            }

            if (this._currentScrollPos > this._scrollLimit) {
                TweenMax.set(this.ui.bar, {transformOrigin:'bottom left'});
            }
        },

        _updateProgressBar: function() {
            var perc = this._percProgression / 100;

            TweenMax.set(this.ui.bar, {scaleY:perc, transformOrigin:'top left'});
        },

        _endProgressBar: function() {

            TweenMax.set(this.ui.bar, 0.4, {scaleY:0, transformOrigin:'bottom left', ease:Linear.easeNone});
        },

        _progress: function() {

            var cur = this._currentScrollPos - this._offsetTop;
            var dur = this._height;
            var perc = (100/dur) * cur;

            this._percProgression = perc;

            if (this._isActive) {
                this._updateProgressBar();
            }

        },

        _checkActiveProduct: function() {

            if ((this._currentScrollPos >= this._offsetTop) && (this._currentScrollPos <= (this._offsetTop + this._height))) {
                this._isActive = true;
                this._navigationProgressItem.parentElement.classList.add('active');

                //this._updatePageTracking(this._productTracking);
            } else {
                this._isActive = false;
                this._navigationProgressItem.parentElement.classList.remove('active');
            }

        },

        _resize: function() {

            this._offsetTop = ScrollManager._getElementGlobalOffsetTop(this._product , this._mainScrollElement);
            this._height = this._product.offsetHeight;

        },

        _resizeHandler: function() {
            if(this._resizeDebounce) clearTimeout(this._resizeDebounce);
            this._resizeDebounce = setTimeout(this._resize, 10);
        },

        _scrollHandler: function(e) {

            this._currentScrollPos = e.y + (ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT);

            this._checkActiveProduct();
            this._updateScrollProcess();
        }

    });

});