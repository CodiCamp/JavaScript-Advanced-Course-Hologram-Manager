/***
 * Grunt Task to automate development
 * + less compile
 * 
 **/
 
 module.exports = function (grunt) {

    //just in case set the default encoding
    grunt.file.defaultEncoding = 'utf-8';

    /**
     * Setup grunt config
     */
    
    grunt.initConfig({

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
        }

    });

    /***
     * Load tasks
     * @grunt contrib less - compiles less
     */
    grunt.loadNpmTasks("grunt-contrib-less");

    /**
     * Register tasks
     * @default - for development
     * @production - for production releases
     */
    grunt.registerTask("default", ["less:development"]);

    grunt.registerTask("production", ["less:production"]);
 };