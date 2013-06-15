#Grunt bower inline loader

[![Build Status](https://api.travis-ci.org/ravenlp/grunt-bower-inline-loader.png)](https://api.travis-ci.org/ravenlp/grunt-bower-inline-loader)

Grunt task to add assets from bower components or a user defined file set into html documents

## Getting started

This is a grunt task. Please refer to the [Grunt documentation](https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md) for more information on how to use tasks.

To install this particular plugin use:

```shell
npm install grunt-bower-inline-loader --save-dev
```

Or register it as a dependency on your `package.json` and run `npm install`

Once the installation is complete you need to include the task in your `Gruntfile.js`, there are several ways to do it but the simpler one is just to add:

```js
grunt.loadNpmTasks('grunt-bower-requirejs');
```

## Basic example


```js
bowerInlineLoader:{
    css: {
            template: "tmp/build.html",
            options:{
                dest: "dist/index.html",
                type: 'css'
            },
            files: [
                {src : ['app/styles/*.css']}
            ]
        }
    }
```

This example takes all the files paths matching the glob pattern `app/styles/*.css` and adds each of them as a `<link>` tag to the content of the template file, saving the whole document referencing the new assets to the `dest` path.

## Configuration

For more detailed examples and further options information check the [project site](http://ravenlp.github.io/grunt-bower-inline-loader/)
