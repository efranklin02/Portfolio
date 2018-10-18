define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',

], function(Superhero, ResizeManager, ScrollManager) {

    return Superhero.Component.extend({

        ACTIVE_CLASSNAME : 'details-navigation-list__button--active',
        SELECTED_CLASSNAME : 'details-navigation-list__button--selected',
        LIST_ITEM : '.details-list__item',
        ADIDAS_HEADER_HEIGHT : 48,

        ui: {
            links: '.details-navigation-list__button',
            items: '.details-navigation-list__item',
            labels: '.details-navigation-list__label'
        },

        events: {
            'click .details-navigation-list__button': '_buttonClickedHandler'
        },

        initialize: function(options) {
            this._container = options.container || '';


        },

        onInitialized: function() {
            this._mainScrollElement = document.querySelector('.main-scroll');
            this._elements = document.querySelectorAll(this._container+' '+this.LIST_ITEM);

            this._currentScroll = 0;

            this._setupOffsetArray();

            this._setupTransitionIn();
            this._setupTransitionOut();

            this._setupEventListeners();


        },

        animateOpacity: function(opacity) {
            var opacity = opacity || 0;
            TweenMax.to(this.el, 0.5, {autoAlpha:opacity, ease:Linear.easeNone});
        },

        _show: function() {
            if(!this._isVisible) {
                this._isVisible = true;
                this._transitionOutAnimation.kill();
                this._transitionAnimation.play(0);
                
            } 
        },

        _hide: function() {
            if(this._isVisible) {
                this._isVisible = false;
                //this._transitionAnimation.stop(0);
                this._transitionAnimation.kill();
                this._transitionOutAnimation.play(0);
            }
        },

        _setupEventListeners: function() {
            this.listenTo(ScrollManager, 'parallax', this._scrollHandler);
            this.listenTo(ResizeManager, 'resize', this._resizeHandler);
        },

        _setupTransitionIn: function() {
            this._transitionAnimation = new TimelineMax({paused:true});
            this._transitionAnimation.set(this.el, {x:0});
            this._transitionAnimation.staggerFromTo(this.ui.items, 0.4, {x:200}, {x:0, ease:Quint.easeOut}, 0.05, 0);
            this._transitionAnimation.staggerFromTo(this.ui.labels, 0.4, {autoAlpha:1}, {autoAlpha:0, clearProps:'all', ease:Linear.easeNone}, 0.05, 1.5);
            this._transitionAnimation.staggerFromTo(this.ui.labels, 0.4, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone}, 0.05, 0.2);
        },

        _setupTransitionOut: function() {
            this._transitionOutAnimation = new TimelineMax({paused:true});
            
            this._transitionOutAnimation.staggerTo(this.ui.items, 0.3, {x:200, ease:Quint.easeIn}, 0.02, 0);
            this._transitionOutAnimation.set(this.el, {x:300}, 2);
        },

        _setupOffsetArray: function() {
            var elements = this._elements;
            var offset = 0;
            var sectionHeight = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT;
            var start = 0;
            var end = 0;

            this._offsetArray = [];

            for(var i = 0, limit = elements.length; i < limit; i++) {
                offset = ScrollManager._getElementGlobalOffsetTop(elements[i], this._mainScrollElement);
                start = -offset;
                end = start - sectionHeight;

                this._offsetArray.push({start: start, end: end});
            }

        },

        _removeSelectedStates: function() {
            var selectedElement = this.el.querySelector('.'+this.SELECTED_CLASSNAME);

            if(!selectedElement) return;

            selectedElement.classList.remove(this.SELECTED_CLASSNAME);
        },

        _addSelectedClass: function(id) {
            var element = this.el.querySelector('.details-navigation-list__button[data-id="'+id+'"]');

            element.classList.add(this.SELECTED_CLASSNAME);
        },

        _removeActiveStates: function() {
            var activeElement = this.el.querySelector('.'+this.ACTIVE_CLASSNAME);

            activeElement.classList.remove(this.ACTIVE_CLASSNAME);
        },

        _addActiveClass: function(id) {
            var element = this.el.querySelector('.details-navigation-list__button[data-id="'+id+'"]');

            element.classList.add(this.ACTIVE_CLASSNAME);
        },

        _setSelected: function(id) {
            this._removeSelectedStates();
            this._addSelectedClass(id);
        },

        _setActive: function(id) {
            this._removeActiveStates();
            this._addActiveClass(id);
        },

        _setActiveId: function(y) {
            var sectionHeight = ResizeManager.viewportHeight() - this.ADIDAS_HEADER_HEIGHT;
            var viewTop = -(y);
            var viewBottom = -(y + sectionHeight);
            var start = 0;
            var end = 0;
            var direction = 'down';
            var bottomMax = this._offsetArray[this._offsetArray.length-1].end;
            var topMax = this._offsetArray[0].start;

            if(this._currentScrollY > y) {
                direction = 'up';
            }

            for(var i = 0, limit = this._offsetArray.length; i < limit; i++) {
                start = this._offsetArray[i].start;
                end = this._offsetArray[i].end;

               if(start < viewTop && start > viewBottom && direction === 'down') {
                    this._activeId = i;
               }

               if(end < viewTop && end > viewBottom && direction === 'up') {
                    this._activeId = i;
               }
            }

            if(bottomMax > viewBottom && direction === 'down') {
                 this._activeId = -1;
            }

            if(topMax < viewTop && direction === 'up') {
                 this._activeId = -1;
            }

            this._currentScrollY = y;
        },

        _setActiveState: function() {
            if(typeof this._activeId === 'undefined') return;

            if(this._currentActiveId === this._activeId) return;

            if(this._activeId != -1) {;
                this._setActive(this._activeId); 
                this._show();
            } else {
                this._hide();
            }

            //console.log('this._activeId', this._activeId, this._container);
        

            this._currentActiveId = this._activeId;
        },

        _buttonClickedHandler: function(e) {
            e.preventDefault();

            if(e.currentTarget.dataset && e.currentTarget.dataset.id) {
                com.adidas.ace16.desktop.applicationView.scrollTo(-this._offsetArray[e.currentTarget.dataset.id].start);
            }
        },

        _scrollHandler: function(scroll) {
            this._currentScroll = scroll.y;

            this._setActiveId(this._currentScroll);
            this._setActiveState();
        },

        _resizeHandler: function() {
            console.log('resize');
            this._setupOffsetArray();
            this._setActiveId(this._currentScroll);
            this._setActiveState();
        }




    });

});