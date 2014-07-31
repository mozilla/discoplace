define('helpers_local',
    ['content-ratings', 'nunjucks'],
    function(content_ratings, nunjucks) {
    var filters = nunjucks.require('filters');
    var globals = nunjucks.require('globals');

    globals.iarc_names = content_ratings.names;

    // filters.myFilter = function(text) {...

    // Functions provided in the default context.
    var helpers = {
    };

    // Put the helpers into the nunjucks global.
    for (var i in helpers) {
        if (helpers.hasOwnProperty(i)) {
            globals[i] = helpers[i];
        }
    }

    return helpers;
});
