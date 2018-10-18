define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',
    'views/components/sections/SectionBaseComponent',
    'views/components/ScrollIndicatorComponent'
], function(Superhero, ResizeManager, ScrollManager, SectionBaseComponent, ScrollIndicatorComponent) {

    return SectionBaseComponent.extend({

        ui: {
            hero_logo_icon: '.hero-logo__icon',
            hero_logo_name: '.hero-logo__name',
            hero_logo_tagline: '.hero-logo__tagline',
            hero_content_title : '.hero-content__title',
            hero_background: '.hero-background',
            button: '.hero-content__button',
            button_background: '.button-regular__background',
            button_text: '.button-regular__text',
        },

        components: {
            scroll_indicator: {selector:'.hero-indicator', type:ScrollIndicatorComponent},
        },

        initialize: function() {
            _.bindAll(this, '_showButton', '_showScrollIndicator');

            this._hide();
        },  

        onInitialized: function() {
            this._setupTransitionIn();
            this._setupButtonTransition();

            SectionBaseComponent.prototype.onInitialized.apply(this);
        },

        _activate: function() {
            if(this._alreadyActivated) return;
            this._alreadyActivated = true;
            this._transitionIn.play(0);
        },

        _deactivate: function() {
            this._stopScrollIndicator();
        },

        _setupTransitionIn: function() {
            this._transitionIn = new TimelineMax({paused:true});

            this._transitionIn.fromTo(this.el, 1, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 0);
            this._transitionIn.fromTo(this.ui.hero_background, 1, {y:100}, {y:0, ease:Quint.easeOut}, 0);
            this._transitionIn.fromTo(this.ui.hero_logo_icon, 1, {scale:0.2}, {scale:1, transformOrigin:'center center', ease:Quint.easeOut}, 0);
            this._transitionIn.fromTo([this.ui.hero_logo_name, this.ui.hero_logo_tagline], 1, {y:-40}, {y:0, ease:Quint.easeOut}, 0);

            this._transitionIn.add(this._showButton, 4.4);
            this._transitionIn.fromTo(this.ui.hero_content_title, 0.4, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 4.4);

            this._transitionIn.add(this._showScrollIndicator, 5);
        },

        _setupButtonTransition: function() {
            this._buttonTransition = new TimelineMax({paused:true});
            this._buttonTransition.fromTo(this.ui.button_background, 0.5, {y:300}, {y:0}, 0);
            this._buttonTransition.fromTo(this.ui.button_text, 0.5, {y:30}, {y:0, ease:Power3.easeOut}, 0.05);
            this._buttonTransition.fromTo(this.ui.button_text, 0.5, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 0.05);
        },

        _showButton: function() {
            this._buttonTransition.play();
        },

        _showScrollIndicator: function() {
            this.components.scroll_indicator.play();
        },

        _stopScrollIndicator: function() {
            this.components.scroll_indicator.stop();
        },

        _hide: function() {
            this.el.style.opacity = 0;
        }



    });

});