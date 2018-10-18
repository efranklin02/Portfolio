define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager'
], function(Superhero, ResizeManager, ScrollManager) {

    //It's actually not a component but a view, because we need subcomponents.
    return Superhero.View.extend({

        ADIDAS_HEADER_HEIGHT: 0,

        onInitialized: function() {

            this.__setupEventListeners();

            this.__mainScrollElement = document.querySelector('.main-scroll');

            this.__resize();

            setTimeout(function(){
                this.__checkState();

                this.__setProgress();

                if(this._progress) this._progress(this.__percentage);

            }.bind(this), 10);
        },

        getOffsetTop: function() {
            return this.__sectionOffsetTop;
        },

        getSectionContentHeight: function() {
            return this.__sectionContentHeight;
        },

        getSectionHeight: function() {
            return this.__sectionHeight;
        },

        getScrollPos: function() {
            return this.__scrollPos;
        },

        setSectionOffsetTop: function() {
            this.__setSectionOffsetTop();
        },

        //gets the progress starting when the section is starting to get in the viewport until het gets outside the viewport. 0 to 1
        getSectionProgress: function() { 
            if(this.__percentage === null) return false;

            var percentage = this.__percentage/100;

            return percentage;
        },

        //gets the progress starting when the section is starting to get in the viewport until it is fully in the viewport. 0 to 1
        getSectionIsVisibleProgress: function() {
            if(this.__percentage === null) return false;
            
            var percentage = this.__percentage/100;
            var sectionVisibleProgress = percentage*2;

            return sectionVisibleProgress;
        },
        
        __setupEventListeners: function() {

            this.listenTo(ResizeManager, 'resize', this.__resizeHandler);
            this.listenTo(ScrollManager, 'parallax', this.__scrollHandler);

        },

        __activate: function() {

            if(!this.__active) {
                //console.log('active!!!');

                this.__active = true;

                if(this._activate) this._activate();
                
            }

        },

        __deactivate: function() {
            if(this.__active) {
                this.__active = false;

                if(this._deactivate) this._deactivate();
            }

        },

        __scroll: function(e) {
            this.__scrollPos = this.__sectionOffsetTop-(e.y);

            this.__checkProgress();
            this.__checkState();
        },

        __checkProgress: function() {
            this.__setProgress();

            if(this._progress) this._progress(this.__percentage);
        },

        __setProgress: function() {
            this.__visiblePixels = this.__sectionContentHeight - this.__scrollPos;

            this.__totalPixels = this.__sectionContentHeight * 2;

            this.__percentage =  this.__visiblePixels / this.__totalPixels * 100;
        },

        __checkState: function() {
            if(this.__scrollPos >= this.__sectionHeight || this.__scrollPos <= -this.__sectionContentHeight) {
                this.__deactivate();
            }
            else {
                this.__activate();
            }

        },

        __setSectionHeight: function() {
            this.__sectionHeight = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT;

            this.el.style.minHeight = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT+'px';

            this.__sectionContentHeight = this.el.offsetHeight;
        },

        __setSectionOffsetTop: function() {
            this.__sectionOffsetTop = ScrollManager._getElementGlobalOffsetTop(this.el, this.__mainScrollElement);
        },

        __resize: function() {
            this.__setSectionHeight();

            this.__setSectionOffsetTop();

            this.__scrollPos = this.__sectionOffsetTop-(ScrollManager.getScrollY());
        },

        __resizeHandler: function() {
            this.__resize();

            if(this._resize) this._resize();
        },

        __scrollHandler: function(e) {
             this.__scroll(e);

            if(this._scroll) this._scroll(e);
        }



    });

});