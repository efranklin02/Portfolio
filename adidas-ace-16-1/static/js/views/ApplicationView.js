define([
    'tweenmax',
    'superhero',

    'utils/ScrollManager',
    'utils/ScrollSnap',
    'utils/ResizeManager',
    'utils/TrackingManager',
    'utils/TrackingProductVisibility',
    'utils/Language',
    
    //hero
    'views/components/sections/PureControlSectionHeroComponent',
    'views/components/sections/PrimeknitSectionHeroComponent',

    //intro
    'views/components/sections/PureControlSectionIntroComponent',
    'views/components/sections/PrimeknitSectionIntroComponent',


    'views/components/sections/SectionVideoComponent',
    'views/components/sections/SectionCollectionComponent',
    'views/components/sections/SectionEndComponent',
    'views/components/sections/SectionDetailsComponent',
    'views/components/sections/SectionDetailsContentComponent',
    'views/components/sections/SectionQuoteComponent',

    //navigation
    'views/components/MainNavigationComponent',
    'views/components/SectionNavigationComponent',

    //regular button
    'views/components/ButtonRegularComponent',

    'bowser'

], function(
    tweenmax, Superhero, 
    
    //UTILS
    ScrollManager,
    ScrollSnap, 
    ResizeManager,
    TrackingManager, 
    TrackingProductVisibility,
    Language,
    
    PureControlSectionHeroComponent,
    PrimeknitSectionHeroComponent,
    
    PureControlSectionIntroComponent,
    PrimeknitSectionIntroComponent,

    SectionVideoComponent,
    SectionCollectionComponent,
    SectionEndComponent,
    SectionDetailsComponent,
    SectionDetailsContentComponent,
    SectionQuoteComponent,

    MainNavigationComponent,
    SectionNavigationComponent,

    ButtonRegularComponent,

    bowser
    ) {

    return Superhero.View.extend({

        ADIDAS_HEADER_HEIGHT: 0,
        MENU_SPACE: 58,

        ui: {
            product_sections: '.product .section',
            mainScroll: '.main-scroll',
            main: '.main',
            mainMenu: '.main-navigation'
        },

        components: {
            button_regular: {selector:'.button-regular', type:ButtonRegularComponent},
            
            purecontrol_hero: {selector:'.product--purecontrol .section--hero', type:PureControlSectionHeroComponent},
            purecontrol_intro: {selector:'.product--purecontrol .section--intro', type:PureControlSectionIntroComponent},
            purecontrol_video: {selector:'.product--purecontrol .section--video', type:SectionVideoComponent},
            purecontrol_detail_purecontrol: {selector:'.product--purecontrol .details-list--purecontrol', type:SectionDetailsContentComponent},
            purecontrol_detail_techfit: {selector:'.product--purecontrol .details-list--techfit', type:SectionDetailsContentComponent},
            purecontrol_detail_groundctrl: {selector:'.product--purecontrol .details-list--groundctrl', type:SectionDetailsContentComponent},
            purecontrol_detail_primeknit: {selector:'.product--purecontrol .details-list--primeknit', type:SectionDetailsContentComponent},
            purecontrol_detail_primecut: {selector:'.product--purecontrol .details-list--primecut', type:SectionDetailsContentComponent},
            purecontrol_details_main: {selector:'.product--purecontrol .section--details', type:SectionDetailsComponent},
            purecontrol_collection: {selector:'.product--purecontrol .section--collection', type:SectionCollectionComponent, options:{name:'purecontrol'}},
            purecontrol_quote: {selector:'.section--quote-purecontrol', type:SectionQuoteComponent},

            primeknit_hero: {selector:'.product--primeknit .section--hero', type:PrimeknitSectionHeroComponent},
            primeknit_intro: {selector:'.product--primeknit .section--intro', type:PrimeknitSectionIntroComponent},
            primeknit_video: {selector:'.product--primeknit .section--video', type:SectionVideoComponent},
            primeknit_detail_purecontrol: {selector:'.product--primeknit .details-list--primeknit', type:SectionDetailsContentComponent},
            primeknit_detail_techfit: {selector:'.product--primeknit .details-list--groundctrl', type:SectionDetailsContentComponent},
            primeknit_detail_groundctrl: {selector:'.product--primeknit .details-list--primecut', type:SectionDetailsContentComponent},
            primeknit_detail_primeknit: {selector:'.product--primeknit .details-list--techfit', type:SectionDetailsContentComponent},
            primeknit_details_main: {selector:'.product--primeknit .section--details', type:SectionDetailsComponent},
            primeknit_collection: {selector:'.product--primeknit .section--collection', type:SectionCollectionComponent, options:{name:'primeknit'}},

            end: {selector:'.section--end', type:SectionEndComponent},

            purecontrol_navigation: {selector:'.details-navigation-list--purecontrol', type:SectionNavigationComponent, options:{container:'.product--purecontrol'}},
            primeknit_navigation: {selector:'.details-navigation-list--primeknit', type:SectionNavigationComponent, options:{container:'.product--primeknit'}},
            
            mainNavigation: {selector:'.main-navigation', type:MainNavigationComponent},


        },

        initialize: function() {
            _.bindAll(this, '_resize', '_introCompletedHandler');

            this.model = Language._data;
        },

        onInitialized: function() {
                    
            var inputType = (!bowser.tablet) ? 'scroll' : 'touch';

            this._scrollSnap = new ScrollSnap({
                el: this.ui.mainScroll,
                mousewheelContainer: document.body,
                inputType: inputType
            });

            this._setDeviceType();

            this._addEventListeners();

            this._resize();

            this._setContentHeight();

            this._introAnimation();
        },

        getMainScrollElement: function() {
            return this.ui.mainScroll;
        },

        _addEventListeners: function() {
            this.listenTo(ScrollManager, 'scroll', this._scrollHandler);
            this.listenTo(ResizeManager, 'resize', this._resizeHandler);
            this.listenTo(this._scrollSnap, 'update', this._scrollSnapUpdateHandler);
        },

        onClose: function() {
            this._removeEventListeners();
        },

        _setDeviceType: function() {
            if(bowser.tablet) {
                this.el.classList.add('is-tablet');
            } else {
                this.el.classList.add('is-desktop');
            }
        },

        _introAnimation: function() {
            if(!this.ui.mainMenu) return;

            this._introAnimation = new TimelineMax({onComplete:this._introCompletedHandler});
            this._introAnimation.fromTo(this.ui.mainMenu, 1, {x:-342}, {x:0, force3D:true, ease:Power2.easeInOut}, 1);
            if(!bowser.tablet) this._introAnimation.fromTo(this.ui.mainScroll, 1, {width:ResizeManager.viewportWidth()}, {width:ResizeManager.viewportWidth()-342, force3D:true, ease:Power2.easeInOut}, 1);
            this._introAnimation.to(this.ui.mainMenu, 1, {x:-342, force3D:true, ease:Power2.easeInOut}, 3);
            if(!bowser.tablet) this._introAnimation.to(this.ui.mainScroll, 1, {width:ResizeManager.viewportWidth(), force3D:true, ease:Power2.easeInOut}, 3);
        },

        _setMainScrollWidth: function() {
            this.ui.mainScroll.style.width = ResizeManager.viewportWidth()+'px';
        },

        _setContentHeight: function() {
            this._contentHeight = this._scrollSnap.getScrollHeight();

            var contentHeight = this._contentHeight;
            var containerHeight = ResizeManager.viewportHeight()-this.ADIDAS_HEADER_HEIGHT;

            //tablet height
            if(bowser.tablet) {
                containerHeight = ResizeManager.viewportHeight()-this.ADIDAS_HEADER_HEIGHT;
                contentHeight = ResizeManager.viewportHeight()-this.ADIDAS_HEADER_HEIGHT;    
            }
            
            this.ui.main.style.height = containerHeight+'px';
            this.el.style.height = contentHeight+'px';
            
        },

        _updateSnapArray: function() {

            this._scrollArray = [];

            this._snapArray = [];
            this._sections = this.el.querySelectorAll('[data-snap]');
            for(var i=0, len=this._sections.length; i<len; i++) {
                
                this._snapArray.push(-ScrollManager._getElementGlobalOffsetTop(this._sections[i], this.ui.mainScroll));

                if(this._sections[i].dataset.snap == "false") {

                    var start = -ScrollManager._getElementGlobalOffsetTop(this._sections[i], this.ui.mainScroll);
                    var end = -(ScrollManager._getElementGlobalOffsetTop(this._sections[i], this.ui.mainScroll)+ScrollManager._getElementGlobalOffsetTop(this._sections[i], this.ui.mainScroll));

                    // check next
                    if(this._sections[i+1] && this._sections[i+1].dataset.snap == "false") {
                        

                        this._scrollArray.push(
                            {start: start, end: end}
                        );
                    }
                    else {
                        this._scrollArray.push(
                            {start: start, end: end + ResizeManager.viewportHeight()}
                        );   
                    }
                }
            }

            this._snapArray = _.uniq(this._snapArray);
            this._snapArray = _.sortBy(this._snapArray, function(num) {
                return -num;
            });
        },     

        _resize: function() {

            if(bowser.tablet && !this._scrollSnap.isEnabled()) {
                var y = this._scrollSnap.getScrollHeight() - (ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT); 
                this._scrollSnap.moveToPosition(-y, 0);
            }

            this._setContentHeight();

            this._updateSnapArray();

            this._scrollSnap.updateSnapPoints(this._snapArray);
            this._scrollSnap.updateFreeScrollRanges(this._scrollArray);           
        },

        _scheduleScroll: function(y) {
            this._scheduledScroll = {y:y};
        },


        _scrollTo: function(y, isTransition, duration) {

            if (this._firstTime || duration === 0) {
                this._firstTime = false;
                this._scrollSnap.moveToPosition(y, 0);
            } else {
                this._scrollSnap.moveToPosition(y);
            }
        },

        scrollTo: function(offsetTop) {
            this._scrollTo(-offsetTop, true, 0.5);
        },

        moveToPosition: function(y, duration) {
             this._scrollSnap.moveToPosition(y, duration);
        },

        _activateMenu: function() {
            if(this.components.mainNavigation.activate) this.components.mainNavigation.activate();
        },

        _resizeHandler: function() {
            this._setMainScrollWidth();

            if(this._resizeDebounce) clearTimeout(this._resizeDebounce);
            this._resizeDebounce = setTimeout(this._resize, 10);
        },

        _scrollHandler: function(e) {
            if(e.y === 0 && bowser.tablet) {
                this._scrollSnap.enableDragable();
            }
        },  

        _scrollSnapUpdateHandler: function(e) {
            var scrollY = Math.ceil(e.y + ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT);
            var scrollHeight = this._scrollSnap.getScrollHeight() + 200;

            if(scrollY >> 0 > scrollHeight >> 0 && bowser.tablet) {
                this._scrollSnap.disableDragable();
            }

            ScrollManager.trigger('parallax', e); 
        },

        _introCompletedHandler: function() {
            this._activateMenu();
        },


    });

});

