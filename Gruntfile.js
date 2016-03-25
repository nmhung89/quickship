module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      less: {
        development: {
          options: {
            compress: true
          },
          files: {
            "public/css/main.css": [
                "public/bower_components/bootstrap/less/bootstrap.less",
                "client/less/style.less"
            ]
          }
        },
      },
      browserify: {
        dist: {
          files: {
            'public/js/bundle.js': ['client/main.jsx']
          },
          options: {
            transform: [['babelify', { presets: ["react"] }]]
          }
        }
      },
      watch: {
        watch: {
          files: ['client/*.jsx', 'client/**/*.jsx', 'client/less/style.less'],
          tasks: ['browserify', 'less']
        },
      },
      browserSync: {
        bsFiles: {
            src : ['public/css/main.css', 'public/js/bundle.js']
        },
        options: {
            watchTask: true,
            proxy: {
              target: "http://localhost:3000",
              port: 3000,
              ws: true
            }
        }
      }
    });

    grunt.registerTask('default', ['less', 'browserify', 'browserSync', 'watch']);
};