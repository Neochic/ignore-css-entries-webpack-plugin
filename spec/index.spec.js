const IgnoreCssEntriesPlugin = require("../index");

describe("Ignore CSS", function () {
    it("should filter assets on compiler emit event", function (done) {
        const expectedResult = {
            "asset1.js": "some content",
            "asset2.js": "some content",
            "only-with-css.js-at-the-end": "some content",
            "only-for-names-that-end-with-css.scss.js": "some content"
        };

        const compilation = {
            assets: {
                "asset1.js": "some content",
                "asset2.js": "some content",
                "asset3.css.js": "some content",
                "only-with-css.js-at-the-end": "some content",
                "only-for-names-that-end-with-css.scss.js": "some content",
                "i-should-be-removed.css.js": {}
            }
        };

        const compiler = {
            plugin: function(type, cb) {
                if(type === "emit") {
                    cb(compilation, function() {
                        expect(compilation.assets).toEqual(expectedResult);
                        done()
                    });
                }
            }
        };

        const plugin = new IgnoreCssEntriesPlugin();
        plugin.apply(compiler);
    });
});
