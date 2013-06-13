'use strict';
/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var grunt = require('grunt');

exports.gruntBowerInlineLoader = {
    default_options: function(test) {
        // Nothing should happen
        test.expect(1);
        var actual = grunt.file.read('tmp/default_options.html');
        var expected = grunt.file.read('test/fixtures/basic.html');
        test.equal(actual, expected, 'Should be the same file, no changes on the template');
        test.done();
    },
    specifiying_files: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/with_files.html');
        var expected = grunt.file.read('test/expected/with_files.html');
        test.equal(actual, expected, 'The specified libs should be added to the template');
        test.done();
    },
    filtered_files: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/filtered_files.html');
        var expected = grunt.file.read('test/expected/filtered_files.html');
        test.equal(actual, expected, 'The specified libs should be added but only a few of them');
        test.done();
    },
    prefixed_and_replaced_files_paths: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/modified_files.html');
        var expected = grunt.file.read('test/expected/modified_files.html');
        test.equal(actual, expected, 'The specified libs should be added with modification on their paths');
        test.done();
    }
};