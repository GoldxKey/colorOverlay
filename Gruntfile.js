/*
 * grunt-colorOverlay
 * https://github.com/xinxuzhang/colorOverlay
 *
 * Copyright (c) 2016 zhangxinxu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    colorOverlay: {
      red: {
        options: {
          color: 'red'
        },
        files: {
          'tmp/red/': ['test/icons/*.png']
        }
      },
      blue: {
        options: {
          color: '#00A1F2',
          filenameMap: function(filename) {
            // 和下面的任务使用同一个文件夹，但是名称不一样
            return 'blue.' + filename;
          }
        },
        files: {
          'tmp/mixed/': ['test/icons/*.png']
        }
      },
      disabled: {
        options: {
          color: '#C1C6D2',
          filenameMap: function(filename) {
            return 'disabled.' + filename;
          }
        },
        files: {
          'tmp/mixed/': ['test/icons/*.png']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s).
  grunt.registerTask('test', ['clean', 'colorOverlay']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
