define([
    'underscore',
    'superhero'
], function(_, Superhero) {

    return Superhero.Component.extend({

        ui: {
            arrow_down: '.icon-arrow-down'
        },

        onInitialized: function() {
           this._setupAnimation();
        },

        play: function() {
            this._indicatorAnimation.play(0);
        },

        stop: function() {
            this._indicatorAnimation.kill();
            this._indicatorAnimation.progress(0).stop();

        },

        _setupAnimation: function() {
            this._indicatorAnimation = new TimelineMax({paused:true, repeat:-1});

            var timer = 0;

            timer += 0;
            this._indicatorAnimation.fromTo(this.ui.arrow_down[0], 0.7, {autoAlpha:0, y:-70}, {autoAlpha:1, y:0, ease:Quint.easeOut},timer);

            timer += 0.7;
            this._indicatorAnimation.to(this.ui.arrow_down[0], 0.5, {y:30, ease:Quint.easeIn},timer);
            this._indicatorAnimation.to(this.ui.arrow_down[0], 0.5, {autoAlpha:0, ease:Quint.easeIn},timer);

            timer += 0.5;
            this._indicatorAnimation.fromTo(this.ui.arrow_down[1], 0.7, {autoAlpha:0, y:-70}, {autoAlpha:1, y:0, ease:Quint.easeOut},timer);

            timer += 0.7;
            this._indicatorAnimation.to(this.ui.arrow_down[1], 0.5, {y:30, ease:Quint.easeIn},timer);
            this._indicatorAnimation.to(this.ui.arrow_down[1], 0.5, {autoAlpha:0, ease:Quint.easeIn},timer);
        }

    });

});