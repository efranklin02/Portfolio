require.config({
    paths: {
        jquery: 'vendor/jquery.custom', //Bare bones version of jQuery
        underscore: 'vendor/lodash.min', //Lodash is a faster version of Underscore. API is 100% compatible
        backbone: 'vendor/backbone-min', //Exoskeleton is a faster version of Backbone. API is 100% compatible
        superhero: 'vendor/superhero.min',
        tweenmax: 'vendor/tweenmax-1.16.1',
        preloadjs: 'vendor/preloadjs-0.4.1.min',
        easeljs: 'vendor/easeljs-0.8.2.min',
        easelDestroy: 'utils/EaselDestroy',
        bowser : 'vendor/bowser.min',
        draggable: 'vendor/Draggable.min',
        throwspropsplugin: 'vendor/ThrowPropsPlugin.min',
    },
    shim: {
        draggable: { deps: ['tweenmax'] },
        throwspropsplugin: { deps: ['tweenmax'] },
    }
});


require([
    'vendor/polyfills/classlist.min',
    'vendor/polyfills/html5-dataset',
    'superhero',
    'tweenmax',
    'throwspropsplugin',
    'draggable',
    'main'
], function() {

});
