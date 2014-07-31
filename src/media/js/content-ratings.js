define('content-ratings', ['format', 'l10n'],
    function(format, l10n) {
    'use strict';

    format = format.format;
    var gettext = l10n.gettext;

    // L10n: For ages {0} and higher. (de) `ab {0} Jahren`.
    var RATING_NAME = gettext('For ages {0}+');
    var names = {
        bodies: {
            'classind': 'CLASSIND',
            'esrb': 'ESRB',
             // L10n: the generic ratings body.
            'generic': gettext('Generic'),
            'pegi': 'PEGI',
            'usk': 'USK',
        },
        ratings: {
            generic: {
                // L10n: (de) ab 0 Jahren.
                '0': gettext('For all ages'),
                '3': format(RATING_NAME, 3),
                '6': format(RATING_NAME, 6),
                '7': format(RATING_NAME, 7),
                '10': format(RATING_NAME, 10),
                '12': format(RATING_NAME, 12),
                '14': format(RATING_NAME, 14),
                '16': format(RATING_NAME, 16),
                '18': format(RATING_NAME, 18),
                'pending': gettext('Rating Pending'),
                'rating-refused': gettext('Rating Refused')
            },
            esrb: {
                '0': gettext('Everyone'),
                '10': gettext('Everyone 10+'),
                '13': gettext('Teen'),
                '17': gettext('Mature 17+'),
                '18': gettext('Adults Only 18+')
            },
        },
    };
    names.ratings.classind = names.ratings.generic;
    names.ratings.pegi = names.ratings.generic;
    names.ratings.usk = names.ratings.generic;

    return {
        names: names,
    };
});
