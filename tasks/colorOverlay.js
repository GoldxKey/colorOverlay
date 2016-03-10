/*
 * grunt-colorOverlay
 * https://github.com/xinxuzhang/colorOverlay
 *
 * Copyright (c) 2016 zhangxinxu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var gm = require('gm').subClass({ imageMagick: true });
  
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('colorOverlay', 'change color of single-color icons', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      color: "",
      filenameMap: function(filename) {
        return filename;
      }
    });

    // 图标转换的颜色
    var color = options.color;
    if (!color) {
      grunt.log.warn('没有配置颜色');
      return;
    }

    // 异步告知
    var done = this.async();


    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // 文件夹是否存在
      if (!grunt.file.isDir(f.dest)) {
        // 生成文件夹
        grunt.file.mkdir(f.dest);
      }

      // 记住任务完成数目
      var start = 0, length = f.src.length;

      // 保存的文件夹目录
      var saveDir = f.dest;
      if (saveDir.slice(-1) != '/') {
        saveDir = saveDir + '/';
      }      

      // Concat specified files.
      f.src.forEach(function(filepath, index) {
        // 文件名称
        var filename = filepath.split('/')[filepath.split('/').length-1];

        // 新文件路径和名称
        var filepathNew = saveDir + options.filenameMap(filename);

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('文件"' + filepath + '"不存在！');
        } else {
          // color overlay
          gm(filepath)
            .fill(color)
            .colorize(100)
            .write(filepathNew, function (err) {
              if (!err) {
                grunt.log.writeln('Color overlay: ' + filepathNew);
              } else {
                grunt.log.warn(err);
              }

              // 统计任务完成数目
              start++;
              if (start == length) {
                done();
              }
          });
          return true;
        }
      });
    });
  });

};
