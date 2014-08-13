require.config({
    paths: {
        // require config is hack-defined at the bottom of lib/require.js.
        // 'your_lib_module': 'lib/your_lib_module'
    }
});

define(
    'main',
    [
        'helpers',  // Must come before mostly everything else.
        'helpers_local',
        'forms',  // Comment this if your app has no forms.
        'l10n',
        'log',
        'navigation',
        'templates',
        'tracking',
        'utils',
        'z'
    ],
function() {
    var capabilities = require('capabilities');
    var console = require('log')('main');
    var start_time = performance.now();
    var utils = require('utils');
    var z = require('z');

    console.log('Dependencies resolved, starting init');

    z.body.addClass('html-' + require('l10n').getDirection());

    z.page.one('loaded', function() {
        // Remove the splash screen.
        console.log('Hiding splash screen (' + ((performance.now() - start_time) / 1000).toFixed(6) + 's)');
        var splash = $('#splash-overlay').addClass('hide');
        z.body.removeClass('overlayed').addClass('loaded');
        setTimeout(function() {
            z.page.trigger('splash_removed');
            splash.remove();
        }, 1500);
    });

    // Do some last minute template compilation.
    z.page.on('reload_chrome', function() {
        console.log('Reloading chrome');
        var nunjucks = require('templates');
        $('#site-header').html(nunjucks.env.render('header.html'));
        z.page.trigger('reloaded_chrome');
    }).trigger('reload_chrome');

    // Perform initial navigation.
    console.log('Triggering initial navigation');
    z.page.trigger('navigate', [window.location.pathname + window.location.search]);

    console.log('Initialization complete');
});
