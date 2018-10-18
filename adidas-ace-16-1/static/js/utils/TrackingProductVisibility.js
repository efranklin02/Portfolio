define([
    'underscore',
    'superhero',
    'utils/TrackingManager',
    'utils/ScrollManager',
    'utils/ResizeManager'
], function(_, Superhero, TrackingManager, ScrollManager, ResizeManager) {


    return Superhero.Component.extend({

        ADIDAS_HEADER_HEIGHT: 48,


        initialize : function (options) {

            this._options = options;

            this._scrollMain = document.querySelector('.main-scroll');

        },

        onInitialized : function () {

            this._resize();

            this._setupEventListeners();
            this._readPosition();
        },

        _setupEventListeners : function (argument) {

            this.listenTo(ScrollManager, 'parallax', this._scrollHandler);

        },

        _readPosition : function () {

            console.log('track isVisible');

            if((this._currentScrollPos >= this._offsetTop) && (this._currentScrollPos <= (this._offsetTop + this._height))) {
                this.setVisible(true);
            }
            else {
                this.setVisible(false);
            }

        },

        setVisible : function (visible) {

            if(visible) {

                console.log ('track isVisible', this._options.name);

                if (utag_data && utag_data.page_name == this._options.name) return false;

                utag_data.page_name = this._options.name;

            }
        },

        _resize : function () {
            this._currentScrollPos = ScrollManager.getScrollY() + (ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT);
            this._offsetTop = ScrollManager._getElementGlobalOffsetTop(this.el, this._scrollMain);
            this._height  = this.el.offsetHeight;

        },

        _scrollHandler : function (e) {
            this._currentScrollPos = e.y + (ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT);

            this._readPosition();

        },

    });

});

