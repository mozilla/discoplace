define('routes_api', [], function() {
    return {
        'collection': '/api/v2/consumer/feed/collections/{0}/?cache=1&vary=0&app_serializer=discoplace',
        'newsletter': '/api/v1/account/newsletter/'
    };
});
