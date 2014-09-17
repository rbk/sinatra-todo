module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'public/assets/css/app.css' : 'public/assets/sass/app.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sinatra');
    // grunt.registerTask('default', [ 'watch' ]);
    grunt.registerTask('default', [
        'sinatra:serve',
        'watch'
    ]);
    // Sample
    // grunt.registerTask('default', [
    //     'concat',
    //     'uglify',
    //     'sass',
    //     'autoprefixer',
    //     'cssmin',
    //     'assemble',
    //     'imagemin',
    //     'copy',
    //     'sinatra:serve',
    //     'open:chromium',
    //     'watch'
    // ]);

};