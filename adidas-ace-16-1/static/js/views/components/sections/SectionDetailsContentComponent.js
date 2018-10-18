define([
    'superhero',
    'views/components/sections/SectionBaseComponent',
    'views/components/PlayButtonComponent',
    'views/components/DetailsVideoComponent'
], function(Superhero, SectionBaseComponent, PlayButtonComponent, DetailsVideoComponent) {

    return SectionBaseComponent.extend({

        ui: {
            copy: '.details-list-content',
            image: '.details-list__image',
            image_shadow: '.details-list__image-shadow',
            button: '.button-play--small',
        },

        components: {
            play_button: {selector: '.button-play--small', type: PlayButtonComponent},
            video: {selector: '.details-list-video', type: DetailsVideoComponent},
        },

        events: {
            'tap .button-play--small': '_buttonPlayClickedHandler'
        },

        initialize: function() {
            this._direction = this.el.dataset.animationDirection || 'bottom'; //left right bottom
            this._distance = this.el.dataset.animationDistance || 400;
        },

        onInitialized: function() {
            this._setupInAnimation();
            //this._setupOutAnimation();

            SectionBaseComponent.prototype.onInitialized.apply(this);

            if(this.components.video.build) this.components.video.build();
        },

        _activate: function() {
            if(this.components.play_button.show) this.components.play_button.show();
        },

        _deactivate: function() {            
            if(this.components.play_button.stop) this.components.play_button.stop();
            if(this.components.video.close) this.components.video.close();
        },

        _progress: function() {
            if(!this._timelineIn) return;

            var progress = this.getSectionProgress();

            if(progress < 0 ) progress = 0;
            if(progress > 1 ) progress = 1;

            //console.log('progress', progress, this.__scrollPos, this.el);

            this._timelineIn.progress(progress);   
        },

        _setupInAnimation: function() {
            var image = [this.ui.image];
            var copy = [this.ui.copy, this.ui.button];
            var distance = this._distance;
            var fromPosY = {y:distance};

            if(this.ui.image_shadow) image.push(this.ui.image_shadow);

            this._timelineIn = new TimelineMax({paused:true});

            switch(this._direction) {
                case 'right' :
                    this._timelineIn.fromTo(image, 0.5, {x:distance}, {x:0, force3D:true, ease:Power1.easeIn}, 0);
                    this._timelineIn.to(image, 0.5, {y:-distance, force3D:true, ease:Power1.easeOut}, 0.5);
                break;
                default: 
                    this._timelineIn.fromTo(image, 0.5, {y:distance}, {y:0, force3D:true, ease:Power1.easeIn}, 0);
                    this._timelineIn.to(image, 0.5, {y:-distance, force3D:true, ease:Power1.easeOut}, 0.5);
                break;
            }

            this._timelineIn.fromTo(copy, 1, {y:distance*0.7}, {y:-(distance*0.7), force3D:true, ease:Linear.easeNone}, 0);

        },

        _buttonPlayClickedHandler: function() {
            console.log('play');
            if(this.components.video.play) this.components.video.play();
        }

    });

});
