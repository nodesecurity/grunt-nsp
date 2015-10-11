module.exports = function (grunt) {

    grunt.initConfig({
      requiresafe: {
        package: grunt.file.readJSON('package.json')
      }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['requiresafe']);
};
