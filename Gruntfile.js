'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'tests/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            tests: ['tmp']
        },
        'css-relativisor': {
            default: {
                files: {
                    'tmp/sample_default.css': ['tests/fixtures/sample.css']
                }
            },
            root: {
                options: {
                    root: 'tests'
                },
                files: {
                    'tmp/sample_root.css': ['tests/fixtures/sample.css']
                }
            },
            filter: {
                options: {
                    filter: '/test/'
                },
                files: {
                    'tmp/sample_filter.css': ['tests/fixtures/sample.css']
                }
            },
            norebase: {
                options: {
                    rebase: false
                },
                files: {
                    'tmp/sample_norebase.css': ['tests/fixtures/sample.css']
                }
            }
        },
        nodeunit: {
            tests: ['tests/*.test.js']
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');
    grunt.registerTask('test', ['clean', 'jshint', 'css-relativisor', 'nodeunit']);
};
