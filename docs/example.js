// Bower inline loader (BIL)
// ===
// Gruntfile configuration
// ----

$config = {
    bowerInlineLoader: {
        // Target definition, as BIL is a multi-tasks you can configure several targets, this is usefull
        // if you want to place, for instance, all file of a kind (say .js) on a usemin block and have another
        // block with your .css files
        target: {
            // The **template** file to use as starting point to add the assets. *Mandatory*
            template: "tmp/build.html",

            options:{
                // This options add all bower dependencies.
                // Takes the same list as the result of running  ``bower list --path`` on your project's root directory.
                // The resulting list will be later tested against the **filter** regex to ensure
                // we are including the right files. **NOTE:** Bower will list a directory instead
                // of a file if the dependency does not specify their main file via the *main*
                // property on their bower dependency definition. So be sure to make the **filter**
                // check smart enough to only let files go though.
                bower: true,

                // **Destination file** where the result will be saved. If this file does not exist it will be created with the content
                // of the template file + the assets. *Mandatory*
                dest: "dist/index.html",

                // **Usemin** configuration, setting this will make the BIL to look for an already defined markup block as, per this example:
                //
                // ``<!-- build:js scripts/main.js --> ... <!-- endbuild -->``
                //
                // and if it finds it the all the loaded assets will be written inside that block. *Note: this will replace any other content already inside*
                // If the block is not found a new block will be placed at the bottom of the page for Js files and just above `</head>` for css.
                // *Optional*.
                usemin: {
                    type: 'js',
                    minFile: 'scripts/main.js'
                },

                // **Filter**, regex to apply to every file collected from bower (if applies) and the candidates files array. *Optional*
                filter: '.js',
                // **Type** of the files we are including, this is used to determinate the markup tag we should use. *Optional*
                type: 'js',
                // Extra options to manage **paths**. This is *optional* as every option in it.
                path: {
                    // String to attach to every path as **prefix**.
                    prefix: '../../',
                    // If we also need to do any kind of **replacement**, this is the place to do it.
                    replace: [
                        // Simple string replacement, happening for every path.
                        {from: '\.js', to: 'js?v=2'},
                        {from: 'components', to: 'vendor'}
                    ]
                }
            },
            // **Candidates files** To be placed in the html, \* as wildcard is accepted. *Optional*
            files: [
                {src : ['components/cp-model/app/scripts/app.js', 'components/cp-*/*.js']}
            ]
        },
        // An example of another simpler target configuration.
        css: {
            template: "tmp/build.html",
            options:{
                // We won't use bower dependencies this time, just grab the candidates file array **bower: false**
                bower: false,
                dest: "dist/index.html",
                filter: '.css',
                type: 'css'
            },
            files: [
                {src : ['app/styles/*.css']}
            ]
        }
    }
}
