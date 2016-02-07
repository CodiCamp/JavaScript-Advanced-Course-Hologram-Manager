/***
 * Grunt Task to automate development
 * + less compile
 *
 **/

 module.exports = function (grunt) {

    //just in case set the default encoding
    grunt.file.defaultEncoding = 'utf-8';

    /**
     * Setup grunt config tasks
     */

    grunt.initConfig({

        /**
         * Less tasks configuration
         * @options - global options
         * @development - development setup
         * @production - production setup
         */
        less: {

            options: {
                paths: ["app/less"]
            },

            development: {

                options: {
                    sourceMap: true
                },

                files: {
                    "build/development/styles/styles.css": "app/less/main.less"
                }
            },

            production: {
                options: {
                    compress: true
                },

                files: {
                    "build/production/styles/styles.css": "app/less/main.less"
                }
            }
        },

        /**
         * Copy tasks configuration
         * @development - copies app/js , app/images, app/templates to build/development
         * @production - copies app/images, app/templates to build/production
         */
        copy: {

            development: {
                files: [
                    {expand: true, src: "app/images/**", dest: "build/development"},
                    {expand: true, src: "app/js/**", dest: "build/development"},
                    {expand: true, src: "app/modules/**", dest: "build/development"}

                ]
            },

            js: {
                files: [
                    {expand: true, src: "app/js/**", dest: "build/development"},
                    {expand: true, src: "app/modules/**", dest: "build/development"}
                ]
            },

            production: {
                files: [
                    {expand: true, src: "app/images/**", dest: "build/production"}
                ]
            }
        },

        /**
         * Clean tasks configuration
         * @build - deleates all files in directory
         */
        clean: {

            build: {
                src: ["build/**"]
            }
        },

        /**
         * Configure webserver task
         */
        connect: {

            server: {

                options: {
                    port: 8080,
                    hostname: "*",
                    base: "build/development",
                    onCreateServer: function (server, connect, options) {

                    }
                }
            }
        },

        /**
         * Watch for file changes and live reload the server
         * @css watches for changes in less files and sub directories
         * @js watches for changes in js files and sub directories
         * @html watches for changes in template files and sub directories
         * @root watches for changes in root template file
         */
        watch: {

            css: {

                options: {
                    livereload: true
                },
                files: ["app/less/**/*.less"],
                tasks: ["less:development"]
            },

            js: {

                options: {
                    livereload: true
                },

                files: ["app/js/**/*.js", "app/modules/**/*.js"],
                tasks: ["copy:js"]
            },

            html: {

                options: {
                    livereload: true
                },

                files: ["app/templates/**/*.html"],
                tasks: ["jst:dev"]
            },

            root: {
                options: {
                    livereload: true
                },

                files: ["app/root/*.html"],
                tasks: ["template:dev"]
            }
        },

        template: {

            dev: {
                options: {
                    data: {
                        scripts: ['http://localhost:35729/livereload.js',
                                    'app/js/vendor/lab.min.js',
                                    'app/js/vendor/underscore.js']
                    }
                },

                files: {
                    'build/development/index.html': ['app/root/index.html']
                }
            },

            production: {
                options: {
                    data: {
                        scripts: ['app/js/vendor/lab.min.js',
                                    'app/js/vendor/underscore.js']
                    }
                },

                files: {
                    'build/production/index.html': ['app/root/index.html']
                }
            }
        },

        jst: {

            options: {
                namespace: 'Templates',
                prettify: true,
                processName: function(filepath) {
                    var path = filepath.split('.')[0].split('/');

                    return path[path.length-1];
                  }
            },

            dev: {

                files: {
                    "build/development/app/tempaltes/templates.js": ["app/templates/**/*.html"]
                }
            }
        }

    });



    /***
     * Load tasks
     * @grunt contrib less - compiles less
     */
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-template");
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    /**
     * Register tasks
     * @default - for development
     * @production - for production releases
     */
    grunt.registerTask("default", [ "clean:build",
                                    "template:dev",
                                    "jst:dev",
                                    "copy:development",
                                    "less:development",
                                    "connect",
                                    "watch"
                                    ]);

    grunt.registerTask("production", [ "clean:build",
                                        "template:production",
                                        "copy:production",
                                        "less:production"
                                        ]);
 };