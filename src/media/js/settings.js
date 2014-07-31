define('settings', ['l10n', 'settings_local', 'underscore'], function(l10n, settings_local, _) {
    var gettext = l10n.gettext;

     function offline_cache_enabled() {
        var storage = require('storage');
        if (storage.getItem('offline_cache_disabled') || require('capabilities').phantom) {
            return false;
        }
        return window.location.search.indexOf('cache=false') === -1;
    }

    return _.defaults(settings_local, {
        app_name: 'commonplace app',
        init_module: 'main',
        default_locale: 'en-US',
        api_url: 'http://' + window.location.hostname,  // No trailing slash, please.

        storage_version: '0',

        param_whitelist: ['q', 'sort'],
        api_param_blacklist: null,
        api_cdn_whitelist: {},

        // These are the only URLs that should be cached
        // (key: URL; value: TTL [time to live] in seconds).
        // Keep in mind that the cache is always refreshed asynchronously;
        // these TTLs apply to only when the app is first launched.
        offline_cache_whitelist: {},
        offline_cache_enabled: offline_cache_enabled,
        offline_cache_limit: 1024 * 1024 * 4, // 4 MB

        model_prototypes: {},

        fragment_error_template: 'errors/fragment.html',
        pagination_error_template: 'errors/pagination.html',

        switches: [],

        tracking_id: 'UA-36116321-6',

        title_suffix: ''
    });
});
