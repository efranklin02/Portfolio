define([
    'superhero'
], function(Superhero) {

    return Superhero.Module.extend({
        initialize: function(options) {
            _.bindAll(this, '_successHandler', '_errorHandler');
        },

        loadFromFile: function(url) {

            Superhero.ajax(url, {
                success: this._successHandler,
                error: this._errorHandler
            });
        },

        toJSON: function() {
            return this._data;
        },

        get: function(key) {
            return this._data[key];
        },

        set: function(key, value) {
            this._data[key] = value;
        },

        _successHandler: function(response) {
            this._data = response;
            this.trigger('load:completed');
        },

        _errorHandler: function(response) {
            this.trigger('load:error');
        }

    });

});