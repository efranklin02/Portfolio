define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, ScrollManager, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ui: {
            background: '.intro-background'
        },

        onInitialized: function() {
            SectionBaseComponent.prototype.onInitialized.apply(this);

            this._setupParalaxTimeline();
        },

        _setupParalaxTimeline: function() {
            this._paralaxTimeline = new TimelineMax({paused:true});
            this._paralaxTimeline.fromTo(this.ui.background, 1, {y:400}, {y:0, ease:Linear.easeNone});
        },

        _progress: function() {
            var progress = this.getSectionIsVisibleProgress();

            if(progress < 1 && progress > 0) {
                this._paralaxTimeline.progress(progress).stop();
            }
        }


    });

});