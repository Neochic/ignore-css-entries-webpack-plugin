'use strict';

function IgnoreCssEntriesPlugin() {}

IgnoreCssEntriesPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
        for (const filename in compilation.assets) {
            if (!compilation.assets.hasOwnProperty(filename)) {
                continue;
            }
            if (filename.endsWith('.css.js')) {
                delete compilation.assets[filename];
            }
        }

        callback();
    });
};

module.exports = IgnoreCssEntriesPlugin;
