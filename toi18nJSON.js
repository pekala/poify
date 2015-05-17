module.exports = function(domain, data, options) {
    var separator = options.keyseparator || '.';

    var json = {};

    var toArrayIfNeeded = function(value) {
        var ret = value;
        if (ret.indexOf('\n') > -1) ret = ret.split('\n');
        return ret;
    };

    for (var m in data) {
        var context = data[m];
        if (m === '') {
            continue;
        }

        for (var key in context) {
            var appendTo = json,
                targetKey = m;


            if (m.indexOf(separator) > -1) {
                var keys = m.split(separator);

                var x = 0;
                while (keys[x]) {
                    if (x < keys.length - 1) {
                        appendTo[keys[x]] = appendTo[keys[x]] || {};
                        appendTo = appendTo[keys[x]];
                    } else {
                        targetKey = keys[x];
                    }
                    x++;
                }
            }

            var values = context[key];
            appendTo[targetKey] = options.isPot ? values.msgid : values.msgstr;
        }

    }

    return json;
}