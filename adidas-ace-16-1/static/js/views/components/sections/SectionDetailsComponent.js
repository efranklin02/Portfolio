define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, ScrollManager, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ui: {
            background: '.paralax-background',
            shopButton: '.section-details__button',
            button_background: '.button-regular__background',
            button_text: '.button-regular__text'
        },  

        onInitialized: function() {
            SectionBaseComponent.prototype.onInitialized.apply(this);

            this._setupButtonTransition();
            this._resize();
        },

        _resize: function() {
            console.log('resize');

            console.log('offsetPosition', this.getOffsetTop());

            this._scrollPos = this.getScrollPos();

            this._resizeBackground();
            this._setButtonPosition();
            this._positionButton();
            this._positionBackground();
        },

        _activate: function() {
            this._isActive = true;
            this._buttonTransition.play(0);
        },

        _deactivate: function() {
            this._isActive = false;
            this._buttonTransition.progress(0).stop();
        },

        _resizeBackground: function() {
            this.ui.background.style.height = this.getSectionHeight()+'px';
        },

        _setButtonPosition: function() {
            this.ui.shopButton.style.top = (this.getSectionHeight() - 100) +'px';
        },

        _showButton: function() {
            TweenMax.delayedCall(1,this._buttonTransition.play);
        },

        _setupButtonTransition: function() {
            this._buttonTransition = new TimelineMax({paused:true});
            this._buttonTransition.fromTo(this.ui.button_background, 0.5, {y:300}, {y:0}, 0.6);
            this._buttonTransition.fromTo(this.ui.button_text, 0.4, {y:30}, {y:0, ease:Power3.easeOut}, 0.7);
            this._buttonTransition.fromTo(this.ui.button_text, 0.4, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 0.7);
        },

        _positionButton: function() {
            if(this._isActive) {
                var maxScrollPos = -(this.getSectionContentHeight() - this.getSectionHeight());

                if(this._scrollPos > 0 || this._scrollPos < maxScrollPos) return; 

                TweenMax.set(this.ui.shopButton, {
                    y  : -this._scrollPos,
                    force3D: true
                });
            }   
        },

        _positionBackground: function() {
            if(this._isActive) {
                TweenMax.set(this.ui.background, {
                    y  : -this._scrollPos,
                    force3D: true
                });
            }   
        },

        _scroll: function(e) {   
            this._scrollPos = this.getScrollPos();

            this._positionBackground();
            this._positionButton();
        }






    });

});