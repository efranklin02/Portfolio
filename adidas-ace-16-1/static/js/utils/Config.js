define([
    'superhero',
    'utils/DataLoader'
], function(Superhero, DataLoader) {

    var Config = DataLoader.extend({

        initialize: function() {
            DataLoader.prototype.initialize.apply(this, arguments);
        }

    });

    return new Config();

});