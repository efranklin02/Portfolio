define([
    'underscore',
    'superhero',
], function(_, Superhero) {

    var TrackingManager = Superhero.Module.extend({

        trackEvent : function (options) {

            var params = {
                event_category : options.category || '',
                event_name     : options.name
            };

            console.log('trackEvent', params);
            if(window.utag) window.utag.link(params);

        },

        trackPage : function (options) {

            var params = {
                page_owner : "BRAND",
                page_name : options.page_name
            };

            //console.log('trackPage', params);
            if(window.utag) window.utag.view(params);

        },

        trackScroll : function  (params) {
            
            // Just call the normal event
            this.trackEvent(params);  

        },

        trackVideoEvent : function  (options) {

            var params = {
                video_category : "FOOTBALL_ACE16",
                video_event    : "video_" + options.event,
                video_length   : options.duration,
                video_name     : options.name,
                video_player   : "HTML5",
                video_position : options.position || "0"
            };

            //console.log('trackVideoEvent', params);

            if(window.utag) window.utag.link(params);

        }


    });

    return new TrackingManager();

});