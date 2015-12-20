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
                    {expand: true, src: "app/js/**", dest: "build/development"},
                    {expand: true, src: "app/images/**", dest: "build/development"},
                    {expand: true, src: "app/templates/**", dest: "build/development"}
                ]
            },

            production: {
                files: [
                    {expand: true, src: "app/images/**", dest: "build/production"},
                    {expand: true, src: "app/templates/**", dest: "build/production"}
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
        }

    });

    /***
     * Load tasks
     * @grunt contrib less - compiles less
     */
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    /**
     * Register tasks
     * @default - for development
     * @production - for production releases
     */
    grunt.registerTask("default", [ "clean:build", 
                                    "copy:development", 
                                    "less:development"]);

    grunt.registerTask("production", [ "clean:build",
                                        "copy:production",
                                        "less:production"]);
 };