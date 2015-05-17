var i18n = require('i18next-client');
i18n.init({
    resStore: {},
    lng: 'en'
});

require('./locale/en.pot');
require('./locale/da.po', {
    domain: 'da'
});

window.alert(i18n.t('menu.publications'));

i18n.setLng('da');

window.alert(i18n.t('menu.publications'));