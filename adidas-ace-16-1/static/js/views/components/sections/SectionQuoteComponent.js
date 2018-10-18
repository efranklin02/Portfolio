define([
    'superhero',
    'utils/ResizeManager',
    'utils/ScrollManager',
    'utils/TrackingManager',

    'views/components/sections/SectionBaseComponent',

    'easeljs',
], function(Superhero, ResizeManager, ScrollManager, TrackingManager, SectionBaseComponent, easeljs) {

    return SectionBaseComponent.extend({

        CANVAS_CLASSNAME: 'quote__canvas',
        ADIDAS_HEADER_HEIGHT: 48,
        MASK_HEIGHT: 1080,

        ui: {
            content: '.quote-content'
        },

        initialize: function() {
            _.bindAll(this, '_createBackground', '_maskReady', '_backgroundReady', '_updateStage');
        },

        onInitialized: function() {

            this._title1 = this.el.dataset.titleA || '';
            this._title2 = this.el.dataset.titleB || '';
            this._body1 = this.el.dataset.bodyA || '';
            this._body2 = this.el.dataset.bodyB || '';

            SectionBaseComponent.prototype.onInitialized.apply(this);

            this.ui.content.style.display = 'none';
            this.el.style.background = 'none';

            this._createStage();

            this._loadStage();

            this._resize();
        },

        _addEventListeners: function() {
            this.listenTo(ResizeManager, 'resize', this._resizeHandler);
        },

        _setupTimeline: function() {
            this._transitionTimeline = new TimelineMax({paused:true});
            this._transitionTimeline.fromTo(this.el, 0.5, {autoAlpha:0}, {autoAlpha:1, ease:Linear.easeNone});
            this._transitionTimeline.to(this.el, 0.5, {autoAlpha:0, ease:Linear.easeNone});
        },

        _setupCanvasTimeline: function() {
            console.log('test',this._canvasTitle1.y);

            this._transitionTimeline = new TimelineMax({paused:true, onUpdate:this._updateStage});
            this._transitionTimeline.fromTo(this._totalMask, 0.5, {y:this.getSectionHeight()}, {y:-(this.getSectionHeight()+this.MASK_HEIGHT), ease:Linear.easeNone}, 0);
            this._transitionTimeline.from(this._canvasTitle1, 0.5, {y:this._canvasTitle1.y+100, ease:Linear.easeNone},0);
            this._transitionTimeline.from(this._canvasTitle2, 0.5, {y:this._canvasTitle2.y+200, ease:Linear.easeNone},0);
            this._transitionTimeline.from(this._canvasBody1, 0.5, {y:this._canvasBody1.y-200, ease:Linear.easeNone},0);
            this._transitionTimeline.from(this._canvasBody2, 0.5, {y:this._canvasBody2.y-100, ease:Linear.easeNone},0);
            this._transitionTimeline.to(this._totalMask, 0.5, {y:-(this.getSectionHeight()*2+this.MASK_HEIGHT*2), ease:Linear.easeNone});
        },

        _resize: function() {
            if(this._canvas) {
                this._canvas.width = ResizeManager.viewportWidth();
                this._canvas.height = this.getSectionHeight();

                if(this._mask && this._contentContainer) {
                    this._build();
                }
                
            }
        },

        _createStage: function() {
            this._canvas = document.createElement('canvas');
            this._canvas.classList.add(this.CANVAS_CLASSNAME);
            this._stage = new createjs.Stage(this._canvas);

            this.el.appendChild(this._canvas);
        },

        _loadStage: function() {
            this._loadBackground();
            this._loadBitmapMask();
        },

        _build: function() {
            this._clearStage();

            this._createMask();
            this._createBackground();
            this._createText();
                
            this._updateCache();

            this._setupCanvasTimeline();
            this._transitionTimeline.progress(this.getSectionProgress());

            this._updateStage();
        },

        _loadBackground: function() {
            this._backgroundImage = new Image();
            this._backgroundImage.onload = this._maskReady;
            this._backgroundImage.src = Settings.baseURL+"static/img/misc/pattern-purple.jpg";
        },

        _loadBitmapMask: function() {
            this._maskImage = new Image();
            this._maskImage.onload = this._backgroundReady;
            this._maskImage.src = Settings.baseURL+"static/img/misc/mask.png";   
        },

        _maskReady: function() {
            this._maskLoaded = true;

            this._startBuild();
        },

        _backgroundReady: function() {
            this._backgroundLoaded = true;

            this._startBuild();
        },  

        _startBuild: function() {
            if(this._maskLoaded && this._backgroundLoaded) { 
                this._build();
            }
        },

        _createBackground: function(event) {
            var background = new createjs.Shape();
            background.graphics.beginBitmapFill(this._backgroundImage, 'repeat-x');
            background.graphics.drawRect(0,0,ResizeManager.viewportWidth(), this.getSectionHeight());

            this._contentContainer = new createjs.Container();

            this._contentContainer.addChild(background);

            this._stage.addChild(this._contentContainer);
        },

        _createText: function() {
            var fontFamBody = 'adihaus_din_regular';
            var fontFamTitle = 'adineue_pro_blackregular';

            this._canvasTitle1 = this._buildText(this._title1.toUpperCase(), 35, fontFamTitle, 50);
            this._canvasTitle2 = this._buildText(this._title2.toUpperCase(), 36, fontFamTitle, 100);

            this._canvasBody1 = this._buildText(this._body1.toUpperCase(), 36, fontFamBody, -100);
            this._canvasBody2 = this._buildText(this._body2.toUpperCase(), 36, fontFamBody, -50);

            this._textContainer = new createjs.Container();

            this._textContainer.addChild(this._canvasTitle1, this._canvasTitle2, this._canvasBody1, this._canvasBody2);

            this._contentContainer.addChild(this._textContainer);

            this._fitText();
        },

        _fitText: function() {
            var bounds = this._textContainer.getBounds();

            this._textContainer.regX = ResizeManager.viewportWidth() / 2;
            this._textContainer.regY = ResizeManager.viewportHeight() / 2;
            this._textContainer.y = ResizeManager.viewportHeight() / 2;
            this._textContainer.x = ResizeManager.viewportWidth() / 2;


            if(bounds.width > ResizeManager.viewportWidth() - 300) {
                this._textContainer.scaleY = 0.7;
                this._textContainer.scaleX = 0.7;
            } else {
                this._textContainer.scaleY = 1;
                this._textContainer.scaleX = 1;
            }

        },

        _buildText: function(copy, size, fontFamily, y) {
            var text = new createjs.Text(copy, size+"px "+fontFamily, "#ffffff");
            var bounds = text.getBounds();
            text.x = ResizeManager.viewportWidth() / 2 - bounds.width / 2 ;
            text.y = (ResizeManager.viewportHeight() / 2 - bounds.height / 2) + y;
            text.snapToPixel = true;
            text.textBaseline = "alphabetic";
            return text;
        },

         _createMask: function(event) {
            var mask = new createjs.Shape();
            mask.graphics.beginBitmapFill(this._maskImage, 'repeat-x');
            mask.graphics.drawRect(0,0,ResizeManager.viewportWidth(),this.MASK_HEIGHT);

            var background = new createjs.Shape();
            background.graphics.beginFill('#000');
            background.graphics.drawRect(0,0,ResizeManager.viewportWidth(),this.getSectionHeight());
                        
            var maskUpper = mask.clone();
            maskUpper.scaleY = -1;  // flip vertically
            maskUpper.y = this.getSectionHeight() + this.MASK_HEIGHT + 1;
            
            var backgroundMiddle = background.clone();
            backgroundMiddle.y = this.getSectionHeight() + this.MASK_HEIGHT;
            
            var maskBottom = mask.clone();
            maskBottom.y = this.getSectionHeight() * 2 + this.MASK_HEIGHT - 1;
            
            this._totalMask = new createjs.Container();
            this._totalMask.addChild(maskUpper, backgroundMiddle, maskBottom);
            if(this._currentMaskY) this._totalMask.y = this._currentMaskY;

            this._mask = new createjs.Container();
            this._mask.addChild(this._totalMask);
        },

        _updateCache: function(update) {

            var update = update || false;
            
            if(!update) {
                this._mask.cache(0, 0, ResizeManager.viewportWidth(),this.getSectionHeight());
            } else {
                this._mask.updateCache();
            }

            this._addFilter();

            if(!update) {
                this._contentContainer.cache(0, 0, ResizeManager.viewportWidth(),this.getSectionHeight());
            } else {
                this._contentContainer.updateCache();
            }

        },

        _addFilter: function() {
            var maskFilter = new createjs.AlphaMaskFilter(this._mask.cacheCanvas);
            this._contentContainer.filters = [maskFilter]; 
        },

        _clearStage: function() {
            this._stage.removeAllChildren();
            this._stage.update();
        },

        _updateStage: function() {

            this._updateCache(true);

            this._stage.update();
        },

        _progress: function() {
            if(this._transitionTimeline) this._transitionTimeline.progress(this.getSectionProgress());
        },

        _scroll: function(e) {
            if(this.getScrollPos() < this.getSectionHeight() && this.getScrollPos() > -this.getSectionHeight()) {
                TweenMax.set(this.el, {y:-this.getScrollPos()});
            } else {
                TweenMax.set(this.el, {y:0});
            }
        },

        _resizeHandler: function() {
            this._resize();
        }

    });

});