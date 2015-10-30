'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    nsp: {
      package: grunt.file.readJSON('package.json')
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['nsp']);
};
