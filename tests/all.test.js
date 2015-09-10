'use strict';

var fs = require('fs');

exports.concat = {
    default: function(test) {
        test.expect(1);

        var actual = fs.readFileSync('tmp/sample_default.css', 'utf8');
        var expected = fs.readFileSync('tests/expected/sample_default.css', 'utf8');
        test.equal(actual, expected, 'root patterns should be remapped correctly while ignoring schemaless domains');
        test.done();
    },
    root: function(test) {
        test.expect(1);

        var actual = fs.readFileSync('tmp/sample_root.css', 'utf8');
        var expected = fs.readFileSync('tests/expected/sample_root.css', 'utf8');
        test.equal(actual, expected, 'root patterns should be remapped correctly while ignoring schemaless domains');
        test.done();
    },
    norebase: function(test) {
        test.expect(1);

        var actual = fs.readFileSync('tmp/sample_norebase.css', 'utf8');
        var expected = fs.readFileSync('tests/expected/sample_norebase.css', 'utf8');
        test.equal(actual, expected, 'norebase patterns should be skip relative urls');
        test.done();
    }
};
