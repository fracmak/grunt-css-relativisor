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
            filter: '/'
        });

        var urlRegex = new RegExp("(url\\(['\" ]*)" + options.filter, 'g');
        this.filesSrc.forEach(function (filepath) {
            var source = grunt.file.read(filepath),
                relativeSource = source.replace(urlRegex, "$1" + filepath);
            grunt.file.write(filepath, relativeSource);
            grunt.log.writeln('File ' + chalk.cyan(filepath) + ' relativised');
        });
    });
};
