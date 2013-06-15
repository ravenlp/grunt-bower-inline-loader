'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        nodeunit: {
            tests: ['test/*-test.js']
        },
        clean: {
            test: ['tmp']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            },
            globals: {}
        },
        bowerInlineLoader: {
            default_options: {
                template: 'test/fixtures/basic.html',
                options: {
                    dest: 'tmp/default_options.html'
                }
            },
            with_files: {
                template: 'test/fixtures/basic.html',
                options: {
                    dest: 'tmp/with_files.html'
                },
                files: [
                    {src: 'test/dummies_libs/**/*.js'}
                ]
            },
            filtered_files: {
                template: 'test/fixtures/basic.html',
                options: {
                    dest: 'tmp/filtered_files.html',
                    filter: 'file.*'
                },
                files: [
                    {src: 'test/dummies_libs/**/*.js'}
                ]
            },
            modified_file_paths: {
                template: 'test/fixtures/basic.html',
                options: {
                    dest: 'tmp/modified_files.html',
                    path: {
                        prefix : 'vendor/',
                        replace: [
                            {from: 'test/dummies_libs/', to: 'external/'},
                            {from: '.js', to: '.js?v=2'}
                        ]
                    }
                },
                files: [
                    {src: 'test/dummies_libs/**/*.js'}
                ]
            }

        }

    });

    // Load local tasks.
    grunt.loadTasks('tasks');


    // Contrib tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Test task
    grunt.registerTask('test', ['jshint', 'clean', 'bowerInlineLoader', 'nodeunit']);

    // Default task.
    grunt.registerTask('default', []);
};