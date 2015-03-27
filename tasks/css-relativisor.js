/*
 * grunt-css-relativisor
 *
 * Copyright (c) 2014 Jay Merrifield
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');

module.exports = function (grunt) {
    grunt.task.registerMultiTask('css-relativisor', 'Make CSS Urls Relative', function () {
        var options = this.options({
            root: '/',
            cwd: ''
        });
        var urlFilter = options.root;
        if (urlFilter === '/') {
            urlFilter = '/[^/]';
        }
        var urlRegex = new RegExp("(url\\(['\" ]*)" + urlFilter, 'g');
        this.filesSrc.forEach(function (filepath) {
            var source = grunt.file.read(filepath),
                localPath = filepath.substring(filepath.indexOf(options.root, options.cwd.length) + options.root.length),
                numDirectoriesToRoot = localPath.split('/').length;

            var relativeSource = source.replace(urlRegex, "$1" + (new Array(numDirectoriesToRoot)).join('../'));
            grunt.file.write(filepath, relativeSource);
            grunt.log.writeln('File ' + chalk.cyan(filepath) + ' relativised');
        });
    });
};
