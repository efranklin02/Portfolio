define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, ScrollManager, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ui: {
            background: '.intro-background',
            body: '.intro-content__body',
            title: '.intro-content__title',
            subtitle: '.intro-content__subtitle'
        },

        onInitialized: function() {
            SectionBaseComponent.prototype.onInitialized.apply(this);

            this._setupParalaxTimeline();
        },

        _setupParalaxTimeline: function() {
            this._paralaxTimeline = new TimelineMax({paused:true});
            this._paralaxTimeline.fromTo(this.ui.background, 1, {y:-300}, {y:0, force3D:true, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.body[0], 1, {y:50}, {y:0, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.body[1], 1, {y:100}, {y:0, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.body[2], 1, {y:150}, {y:0, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.body[3], 1, {y:200}, {y:0, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.title, 1, {y:300}, {y:0, ease:Linear.easeNone}, 0);
            this._paralaxTimeline.fromTo(this.ui.subtitle, 1, {y:300}, {y:0, ease:Linear.easeNone}, 0);
        },

        _progress: function() {
            var progress = this.getSectionIsVisibleProgress();

            if(progress < 1 && progress > 0) {
                this._paralaxTimeline.progress(progress).stop();
            }
        }


    });

});