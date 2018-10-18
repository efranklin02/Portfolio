define([
    'superhero',
    'bowser'
], function(Superhero, bowser) {

    return Superhero.Component.extend({

        COLOR_PINK: '#d51a74',
        COLOR_BLACK: '#000000',
        COLOR_INBETWEEN: '#5c0b32',

        ui: {
            background: '.button-regular__background',
        },

        events: {
           'mouseenter': '_buttonMouseEnterHandler',
           'mouseleave': '_buttonMouseLeaveHandler'
        },

        onInitialized: function() {
            if (this.el.classList.contains('button-regular--inverted')) {
                this.isInverted = true;
            }

            this._setupHoverAnimation();
        },

        show: function() {
            this._transitionTimeline.play();
        },  

        _setupHoverAnimation: function() {
            this._hoverTimeline = new TimelineMax({paused:true});

            if (this.isInverted) {
                this.COLOR_PRIMARY = this.COLOR_BLACK;
                this.COLOR_SECONDARY = this.COLOR_PINK;
            } else {
                this.COLOR_PRIMARY = this.COLOR_PINK;
                this.COLOR_SECONDARY = this.COLOR_BLACK;
            }

            if(this.ui.background) {
                this._hoverTimeline.fromTo(this.ui.background, 0.1, {borderBottomColor:this.COLOR_PRIMARY, x:"-50%"}, {borderBottomColor:this.COLOR_SECONDARY, x:"-50%", ease:Linear.easeNone}, 0);
            } else {
                this._hoverTimeline.fromTo(this.el, 0.1, {backgroundColor:this.COLOR_PRIMARY}, {backgroundColor:this.COLOR_SECONDARY, ease:Linear.easeNone}, 0);
            }
            
            this._hoverTimeline.fromTo(this.el, 0.05, {color:this.COLOR_SECONDARY}, {color:this.COLOR_INBETWEEN, ease:Linear.easeNone}, 0);
            this._hoverTimeline.to(this.el, 0.05, {color:this.COLOR_PRIMARY, ease:Linear.easeNone}, 0.05);
        },

        _buttonMouseEnterHandler: function () {
            if(bowser.tablet) return;

            this._hoverTimeline.play();
        },

        _buttonMouseLeaveHandler: function() {
            if(bowser.tablet) return;

            this._hoverTimeline.reverse();
        }





    });

});