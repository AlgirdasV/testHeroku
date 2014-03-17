module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            pivotal: {
                src: ['routes/*.js'],
                options: {
                    vendor: ['vendor/*.js', 'node_modules/underscore/*.js'],
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        },
        jshint: {
            options: {
                node: true,
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
                browser: true,
                globals: {
                    _: true,
                    $: true,
                    jQuery: true,
                    require: true,
                    define: true,
                    requirejs: true,
                    describe: true,
                    expect: true,
                    it: true
                }
            },
            src: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jasmine', 'jshint'],
                options: {
                    // livereload: true,
                    spawn: false,
                },
            },
        },
        jasmine_node: {
            // src: ['routes/parser.js'],
            matchall: true, // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            // forceExit: true,
            jUnit: {
                report: false,
                savePath: "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};