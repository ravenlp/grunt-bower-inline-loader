/*
 * grunt-bower-inline-loader
 *
 * Copyright (c) 2013 Jorge Condomi
 * Licensed under the MIT license.
 */

/**
 * This task is intended to add the bower dependencies to a html file without using requireJs, this is sometimes helpful during development.
 * The assets, if specified, are grouped in a usemin-like block style
 *
 * For examples on how to configure this task please refer to http://ravenlp.github.io/grunt-bower-inline-loader/
 *
 **/
'use strict';

var fs = require('fs');
var os = require('os');
var EOL = os.EOL;

module.exports = function (grunt) {
    grunt.registerMultiTask('bowerInlineLoader', 'Add references to the js/css dependencies loaded with bower', function () {
        var config = grunt.util._.defaults(this.options() || {}, {
                type: 'js',
                dest: '',
                bower: false,
                path: {
                    prefix: '',
                    replace: []
                },
                template: ''
            }),
            candidates = [],
            done = this.async();

        config.files = this.filesSrc || [];
        config.template = this.data.template;

        if(config.bower){
            // requesting bower registered dependencies.
            require('bower').commands.list({paths: true})
                .on('data', function (data) {
                    if(data){
                        for(var path in data){
                            if (grunt.util._.isArray(data[path])){
                                candidates.concat(data[path]);
                            } else {
                                candidates.push(data[path]);
                            }
                        }
                    }
                    processDependencies(candidates, config);
                    done();
                })
                .on('error', function (err) {
                    grunt.warn(err.message);
                    done();
                });
        } else {
            processDependencies(candidates, config);
            done();
        }
    });


    /*
     *  Helper functions
     */

    /**
     * Writes a file with the specified content
     * @param filePath
     * @param content
     * @returns void
     */
    var saveFile = function (filePath, content){
        try{
            grunt.file.write(filePath, content);
            grunt.log.writeln('File "' + filePath + '" saved.');
        } catch (error){
            grunt.fail.fatal(error);
        }
    };


    /**
     * Builds the script tag for an specific tag
     * @param filePath
     * @returns string
     */
    var processDependencies = function(candidates, config){
        // Merging with the optional specified files
        candidates = grunt.util._.union(candidates, config.files);

        // As bower list folders when the dependency doesn't have the main attribute set on the manifest we need to filter them
        candidates = grunt.util._.filter(candidates, function(path){
            return (new RegExp(config.filter)).test(path);
        });

        // Filtering duplicated files
        candidates = grunt.util._.uniq(candidates);

        candidates = grunt.util._.map(candidates, function(path){
            //grunt.log.writeln(JSON.stringify(config));
            path = preparePath(path, config);
            grunt.log.writeln('Dependency ' + path + ' added');
            return createMarkup(path, config);
        });

        if (!grunt.file.exists(config.template)) {
            grunt.log.warn('Template file "' + config.template + '" not found.');
            return;
        }

        var content = grunt.file.read(config.template);
        if (content){
            var newContent = replaceToken(content, config, candidates);
            saveFile(config.dest, newContent);
        } else {
            grunt.log.warn('Template file "' + config.template + '" empty.');
        }
    };

    /**
     * Builds the markup for an specific tag
     * @param filePath
     * @param config
     * @returns string
     */
    var createMarkup = function(filePath, config){
        if (config.type === 'css') {
            return '\t<link href="' + filePath + '" rel="stylesheet" type="text/css"/>';
        }
        return '\t<script src="' + filePath + '"></script>';
    };

    /**
     * Modify the path according the config.options.path properties
     * @param path
     * @returns string path
     */
    var preparePath = function(path, options){
        path = (options.path.prefix || "")  + path;
        if (!grunt.util._.isArray(options.path.replace)){
            options.path.replace = [options.path.replace];
        }
        options.path.replace.forEach(function(pair){
            if(!(grunt.util._.isUndefined(pair.from) || grunt.util._.isUndefined(pair.to))) {
                path = path.replace(pair.from, pair.to);
            }
        });
        return path;
    };

    /**
     * Find the right place and add the script tags to the html
     * @param content The content of the template file
     * @param options Object with the optional parameters
     * @param scripts Array containing the dependencies to add
     * @returns string
     */
    var replaceToken = function(content, options, scripts){
        var anchor = (options.type === 'css')? '</head>' : '</body>';
        var needle = '';
        // Should we use usemin tokens
        if (options.usemin && options.usemin.minFile){
            var tokenPattern = new RegExp(
                (/<!--\s*build:/.source) + options.usemin.type + ' ' +
                    options.usemin.minFile + (/\s*-->/.source) + (/([\s\S]*?)<!-- endbuild -->/.source), "gm");
            // It's already placed on the file?
            var block = tokenPattern.exec(content);
            if (block){
                needle = block[1] + '<!-- endbuild -->';
                scripts.unshift(EOL);
                scripts.push(EOL + '<!-- endbuild -->');
            } else {
                // Add a new block
                scripts.unshift(EOL + '<!-- build:'+ options.usemin.type + ' ' + options.usemin.minFile + ' -->');
                scripts.push('<!-- endbuild -->');
                needle = anchor;
                scripts.push(needle);
            }
        } else {
            needle = anchor;
            scripts.push(needle);
        }
        return content.replace(needle, scripts.join(EOL));
    };
};