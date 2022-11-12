var en = require("./translations.en.json");
var es = require("./translations.es.json");

const i18n = {
    translations: {
        en,
        es,
    },
    defaultLang: "en",
    useBrowserDefault: true,
};

module.exports = i18n;