var through = require('through');
var Gettext = require('node-gettext');
var gt = new Gettext();
var toi18nJSON = require('./toi18nJSON');

module.exports = function(file, options) {
    var isPo = /\.pot$/.test(file);
    var isPot = /\.po$/.test(file);
    if (!isPo && !isPot) {
        return through();
    }

    options = options || {};
    options.domain = 'en';
    var buffer = [];
    var stream = through(
        function write(chunk) {
            buffer.push(chunk);
        },
        function end() {
            var source = buffer.join('');

            gt.addTextdomain(options.domain, source);
            var output = toi18nJSON(options.domain, gt.domains[options.domain].translations, {
                isPot: isPot
            });
            output = 'module.exports = require("i18next-client").addResourceBundle("' + options.domain + '", ' + JSON.stringify(output) + ');';
            stream.push(output);
            stream.push(null);
        }
    );

    return stream;
};