/*
 * grunt-css-relativisor
 *
 * Copyright (c) 2014 Jay Merrifield
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk'),
    path = require('path');

function relativizeString(fileSource, rootDir, sourceDir, destinationDir, urlRegex, options) {
    return fileSource.replace(urlRegex, function(match, p1, p2, p3, offset, string) {
        if (match.indexOf('//') === -1) {
            // skip urls, including schemaless urls
            if (p2[0] === '/') {
                var filterIndex = offset + match.length - 1;
                if (!options.filter || string.indexOf(options.filter, filterIndex) === filterIndex) {
                    return p1 + path.relative(destinationDir, path.join(rootDir, p2)) + '/';
                }
            } else if (options.rebase) {
                var relativeAdjustment = path.relative(destinationDir, path.resolve(sourceDir, p2));
                // relative urls, rebase
                if (p2[0] === '.') {
                    return p1 + relativeAdjustment + '/';
                } else {
                    return p1 + relativeAdjustment;
                }
            }
            return match;
        } else {
            return match;
        }
    });
}

module.exports = function(grunt) {
    grunt.task.registerMultiTask('css-relativisor', 'Make CSS Urls Relative and Rebases them', function() {
        var options = this.options({
            filter: '/',
            rebase: true,
            root: process.cwd()
        });
        var urlRegex = new RegExp('(url\\([\'" ]*)(//|/|http://|https://|(\\.\\./)+|[a-z]+)', 'g'),
            rootDir = path.resolve(options.root);
        this.files.forEach(function(file) {
            var destinationDir = path.dirname(path.resolve(file.dest));
            var contents = file.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                filepath = path.resolve(filepath);
                var sourceDir = path.dirname(filepath);
                // Read and return the file's source.
                grunt.verbose.writeln('Processing', chalk.green(filepath), 'to', chalk.green(destinationDir));
                return relativizeString(grunt.file.read(filepath), rootDir, sourceDir, destinationDir, urlRegex, options);
            }).join('\n');

            grunt.file.write(file.dest, contents);
            grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' relativised');
        });
    });
};
