module.exports = (grunt) ->

  grunt.initConfig
    options:
      buildDir: 'build/'
      srcDir: 'src/'

    clean:
      main: ['<%= options.buildDir %>']

    watch:
      src:
        files: ['server.coffee', 'index.html', '<%= options.srcDir %>**/*.coffee']
        tasks: ['default']

    coffee:
      compile:
        files: [{
          expand: true
          src: ['<%= options.srcDir %>**/*.coffee']
          dest: '<%= options.buildDir %>front/'
          ext: '.js'
        }, {
          src: ['server.coffee']
          dest: '<%= options.buildDir %>server.js'
        }]
    copy:
      main:
        files:[{
          expand: true
          src: ['lib/**/*.js']
          dest: '<%= options.buildDir %>front/'
        }, {
          src: ['index.html']
          dest: '<%= options.buildDir %>front/index.html'
        }]


  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', [
    'clean:main'
    'coffee:compile'
    'copy:main'
  ])
