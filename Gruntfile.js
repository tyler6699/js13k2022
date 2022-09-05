module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: {
          toplevel: true,
          eval: true,
          keep_fnames: false,
          reserved: ["startGame"]
        }
      },
      build: {
        files: [{
          expand: false,
          src: ["assets/js/audio.js",
                "assets/js/particle.js",
                "assets/js/camera.js",
                "assets/js/sound.js",
                "assets/js/cart.js",
                "assets/js/enums.js",
                "assets/js/tile.js",
                "assets/js/utility.js",
                "assets/js/level.js",
                "assets/js/entity.js",
                "assets/js/hero.js",
                "assets/js/game.js",
                "assets/js/keys.js",
                ],
          dest: 'dst/game.min.js',
          ext: '.min.js'
        }]
      }
    },
    watch: {
      files: ['assets/js/*.js'],
      tasks: ['uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['uglify']);
};
