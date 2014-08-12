define('views/main',
    ['l10n', 'requests', 'urls', 'z'],
    function(l10n, requests, urls, z) {

    var gettext = l10n.gettext;

    // Handle newsletter signup form submit.
    z.body.on('submit', '.news-signup-form', function(e) {
        e.preventDefault();
        var $signup = $('main').find('.newsletter.promo');

        var $this = $(this);
        var data = {email: decodeURIComponent($this.serialize().split('=')[1])};

        $signup.find('.processing').removeClass('hidden');

        requests.post(urls.api.url('newsletter'), data).done(function() {
            $signup.find('.processing').addClass('hidden');
            $signup.find('.finished').removeClass('hidden');
        }).fail(function() {
            $signup.find('.processing').addClass('hidden');
            $signup.find('.error').removeClass('hidden');
        });
    });

    return function(builder) {
        builder.start('main.html');
        builder.z('type', 'root');
    };
});
