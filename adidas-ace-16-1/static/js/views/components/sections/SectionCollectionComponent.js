define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',
    'utils/TrackingManager',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, ScrollManager, TrackingManager, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ui: {
            button_background: '.button-regular__background',
            button_text: '.button-regular__text',
            background: '.collection-background',
            visual: '.collection-visual'
        },

        initialize: function(options) {

            this._productName = options.name || 'purecontrol';

            this._dataCategory = options.el.getAttribute('data-tracking-category');
        },

        onInitialized: function() {
            this._productPages = document.querySelectorAll('.product');

            SectionBaseComponent.prototype.onInitialized.apply(this);

            this._setupButtonTransition();
            this._setupParalaxTimeline();

            this._setupTrackingEvents();
        },

        _activate: function() {
            this._showButton();
        },

        _deactivate: function() {
            console.log('_deactivate Collection view');

            this._hideButton();
        },

        _progress: function() {
            var progress = this.getSectionIsVisibleProgress();

            if(progress < 1 && progress > 0) {
                this._paralaxTimeline.progress(progress);
            }
        },

        _setupButtonTransition: function() {
            this._buttonTransition = new TimelineMax({paused:true});
            this._buttonTransition.fromTo(this.ui.button_background, 0.5, {y:300}, {y:0}, 0.6);
            this._buttonTransition.fromTo(this.ui.button_text, 0.5, {y:30}, {y:0, ease:Power3.easeOut}, 0.7);
            this._buttonTransition.fromTo(this.ui.button_text, 0.5, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 0.7);
        },

        _showButton: function() {
            this._buttonTransition.play(0);
        },

        _hideButton: function() {
            this._buttonTransition.progress(0).stop();
        },

        _setupParalaxTimeline: function() {
            this._paralaxTimeline = new TimelineMax({paused:true});
            this._paralaxTimeline.fromTo(this.ui.background, 1, {y:400}, {y:0, ease:Linear.easeNone});
            this._paralaxTimeline.fromTo(this.ui.visual, 1, {autoAlpha:0}, {autoAlpha:1, force3D:true, ease:Linear.easeNone});
        },

        _scroll: function(e) {
            if(this._productPages.length > 1 && this.getScrollPos() < 0 && this.getScrollPos() >= -this.getSectionContentHeight() && this._productName !== 'primeknit') {
                TweenMax.set(this.el, {y:-this.getScrollPos()});
            } else {
                TweenMax.set(this.el, {y:0});
            }
        },

        _setupTrackingEvents: function() {

            var eventCategory = this._dataCategory;

            ScrollManager.registerElementScrollNotification(this.el, function() {
                TrackingManager.trackEvent({
                    category : 'ACE16_' + eventCategory,
                    name     : 'EXPERIENCE END'
                });
            }.bind(this), ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT - 10);
        }


    });

});