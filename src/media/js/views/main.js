define('views/main', ['l10n'], function(l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        builder.start('main.html');
        builder.z('type', 'root');
    };
});
