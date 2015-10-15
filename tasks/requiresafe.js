'use strict';

var Chalk = require('chalk');
var Table = require('cli-table');
// var RequireSafe = require('requiresafe');
var RequireSafe = require('../../cli');
var format = RequireSafe.formatters.default;

module.exports = function (grunt) {

  grunt.registerTask('requiresafe', 'Audits package.json / shrinkwrap agains the requireSafe (+) API', function () {

    var done = this.async();
    var config = grunt.config.get('requiresafe');

    var payload = {};

    if (config.package) {
      payload.package = config.package;
    }

    if (config.shrinkwrap) {
      payload.shrinkwrap = config.shrinkwrap;
    }

    // Command line option --package
    if (grunt.option('package')) {
      payload.package = grunt.file.readJSON(grunt.option('package'));
    }

    // Command line option --shrinkwrap
    if (grunt.option('shrinkwrap')) {
      payload.shrinkwrap = grunt.file.readJSON(grunt.option('shrinkwrap'));
    }

    RequireSafe.check(payload, function (err, data) {

      var output = format(err, data);
      if (err || data.length) {
        grunt.fail.warn(output);
      } else {
        grunt.log.write(output);
      }

      done();
    });

  });
};
