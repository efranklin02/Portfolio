define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',
    'utils/TrackingManager',

    'views/components/sections/SectionBaseComponent'
], function(Superhero, ResizeManager, ScrollManager, TrackingManager, SectionBaseComponent) {

    return SectionBaseComponent.extend({

        ADIDAS_HEADER_HEIGHT: 48,

        onInitialized: function() {
            
          SectionBaseComponent.prototype.onInitialized.apply(this);

        },

    });

});