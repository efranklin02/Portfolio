define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

    'views/components/MainNavigationProgressComponent',

     'bowser'

], function(Superhero, ResizeManager, ScrollManager, MainNavigationProgressComponent, bowser) {

    return Superhero.View.extend({

        ADIDAS_HEADER_HEIGHT: 48,
        _navigationOpen: false,

        ui: {
            item: '.list-item',
            progress: '.main-navigation__progress',
            bar: '.main-navigation__progress-bar',
        },

        events: {
            'click .main-navigation__link': '_mainNavigationLinkClickHandler'
        },

        components: {
            mainNavigationProgress: {selector:'.main-navigation__progress', type:MainNavigationProgressComponent}
        },

        initialize: function() {

            this._inactive = true;

            _.bindAll(
                this, 
                '_documentClickHandler'
            );
       
        },

        onInitialized: function() {

            this._rootElement = document.querySelector('.main-scroll');

            this._setupNavigationInAnimation();
            this._setupNavigationOutAnimation();

            this._setupEventListeners();

            this._resize();
          
        },

        activate: function() {
            console.log('activate');
            this._inactive = false;
        },

        _setupEventListeners: function() {

            this.listenTo(ResizeManager, 'resize', this._resizeHandler);

        },

        _setupNavigationInAnimation: function() {

            this._navigationInAnimation = new TimelineMax({paused:true});
            this._navigationInAnimation.fromTo(this.el, 1, {x:-342}, {x:0, force3D:true, ease:Power2.easeInOut}, 0);
            if(!bowser.tablet) this._navigationInAnimation.fromTo(this._rootElement, 1, {width:ResizeManager.viewportWidth()}, {width:ResizeManager.viewportWidth()-342, force3D:true, ease:Power2.easeInOut}, 0);

        },

        _setupNavigationOutAnimation: function() {

            this._navigationOutAnimation = new TimelineMax({paused:true});
            this._navigationOutAnimation.to(this.el, 1, {x:-342, force3D:true, ease:Power2.easeInOut}, 0);
            if(!bowser.tablet) this._navigationOutAnimation.to(this._rootElement, 1, {width:ResizeManager.viewportWidth(), force3D:true, ease:Power2.easeInOut}, 0);
            
        },

        _show: function() {

            if(!this._isOpen) {
                this._isOpen = true;

                this._navigationInAnimation.play(0);

                document.addEventListener('click', this._documentClickHandler);

                ScrollManager.disableScroll();
            } 

        },

        _hide: function() {

            if(this._isOpen) {
                this._isOpen = false;
                this._navigationOutAnimation.play(0);

                document.removeEventListener('click', this._documentClickHandler);

                ScrollManager.enableScroll();
            }

        },

        _toggle: function() {

            if (this._navigationOpen) {

                this._navigationOpen = false;
                this._hide();

            } else {

                this._navigationOpen = true;
                this._show();

            }

        },

        _setSectionHeight: function() {

            this._sectionHeight = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT;

            this.el.style.height = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT+'px';

        },

        _getProductPosition: function() {

            var productElement = document.querySelector('.' + this._link);

            return ScrollManager._getElementGlobalOffsetTop(productElement, this._rootElement);

        },

        _scrollToProduct: function() {

            var productOffset = this._getProductPosition();

            com.adidas.ace16.desktop.applicationView.moveToPosition(-productOffset, 0);

        },

        updateProgressBar: function(sectionHeight, currentScrollPosition) {

            var percProgression = (100/sectionHeight) * currentScrollPosition;

            var perc = percProgression / 100;

            if (perc <= 1) {
                TweenMax.set(this.ui.bar, {scaleY:perc, transformOrigin:'top right'});
            }
        },

        _resize: function() {

            this._setSectionHeight();

        },

        _resizeHandler: function() {

            this._resize();

        },

        _documentClickHandler: function(e) {
            e.preventDefault();

            if(this._inactive) return;

            if (!this._isChildOf(e.target, this.el, 5)) {
                this._navigationOpen = false;
                this._hide();
            }

        },

        _mainNavigationLinkClickHandler: function(e){

            e.preventDefault();

            if(this._inactive) return;

            this._link = e.currentTarget.getAttribute('data-link');

            if (this._navigationOpen) {
                this._scrollToProduct();
            }

            this._toggle();
        },

        _isChildOf: function(el, parent, layers) {

            if ( el && el == parent ) {
                return el;
            }

            var i = layers;
            while (el.parentNode) {
                el = el.parentNode;

                if ( el && el == parent ) {
                    return el;
                }

                i--;  
                if(i < 0) {
                    return null;
                }
            }
            return null;

        }

    });

});