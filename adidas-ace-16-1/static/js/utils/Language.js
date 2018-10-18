define([
    'superhero',
    'utils/DataLoader'
], function(Superhero, DataLoader) {

    var Language = DataLoader.extend({

        initialize: function() {
            DataLoader.prototype.initialize.apply(this, arguments);
        }

    });

    return new Language();

});