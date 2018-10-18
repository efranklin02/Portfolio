define([
    'superhero',

    'utils/Config',
    'utils/Language',
    'views/ApplicationView'

], function(Superhero, Config, Language, ApplicationView) {

    var namespace    = Superhero.createNameSpace('com.adidas.ace16.desktop');

    Config.loadFromFile('data/config.json');

    function start() {
        namespace.applicationView = new ApplicationView({
            el: document.querySelector('.ace16-application'),
            template: 'application'
        });
    }

    Config.once('load:completed', function onConfigLoaded() {
        Language.loadFromFile('data/locales/' + Config.get('locale') + '/copy.json');
    });

    Language.once('load:completed', function onConfigLoaded() {
        start();    
    });

    namespace.getCoverSize = function(containerWidth, containerHeight, contentWidth, contentHeight) {

        var containerRatio = containerHeight / containerWidth;
        var contentRatio = contentHeight / contentWidth;
        var finalWidth = 0;
        var finalHeight = 0;

        if (containerRatio > contentRatio)
        {
            finalHeight = containerHeight;
            finalWidth = (containerHeight / contentRatio);
        }
        else
        {
            finalWidth = containerWidth;
            finalHeight = (containerWidth * contentRatio);
        }

        return {x: (containerWidth - finalWidth) * 0.5 >> 0, y: (containerHeight - finalHeight) * 0.5 >> 0, width: finalWidth, height: finalHeight, scale: finalWidth / contentWidth, scaleY: finalHeight / contentHeight};

        console.log('CoverSize x ========>', x);

    };

    namespace.getContainSize = function(containerWidth, containerHeight, contentWidth, contentHeight) {

        var containerRatio = containerHeight / containerWidth;
        var contentRatio = contentHeight / contentWidth;
        var finalWidth = 0;
        var finalHeight = 0;

        if (containerRatio < contentRatio)
        {
            finalHeight = containerHeight;
            finalWidth = (containerHeight / contentRatio);
        }
        else
        {
            finalWidth = containerWidth;
            finalHeight = (containerWidth * contentRatio);
        }

        return {x: (containerWidth - finalWidth) * 0.5 >> 0, y: (containerHeight - finalHeight) * 0.5 >> 0, width: finalWidth >> 0, height: finalHeight >> 0, scale: finalWidth / contentWidth};

        console.log('ContainSize x ========>', x);

    };

});