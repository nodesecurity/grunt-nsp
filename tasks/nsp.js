'use strict';

var Nsp = require('nsp');

module.exports = function (grunt) {

  grunt.registerTask('nsp', 'Audits package.json / shrinkwrap agains the Node Security (+) API', function () {

    var done = this.async();
    var config = grunt.config.get('nsp');

    var payload = {};
    var formatter = Nsp.formatters.default;

    if (config.package) {
      payload.package = config.package;
    }

    if (config.shrinkwrap) {
      payload.shrinkwrap = config.shrinkwrap;
    }

    if (config.output) {
      var formatters = Object.keys(Nsp.formatters);
      if (formatters.indexOf(config.output) !== -1) {
        formatter = Nsp.formatters[config.output];
      } else {
        grunt.log.write('Invalid formatter specified in config. Must be one of ' + formatters.join(',') + '\n');
      }
    }

    // Command line option --package
    if (grunt.option('package')) {
      payload.package = grunt.file.readJSON(grunt.option('package'));
    }

    // Command line option --shrinkwrap
    if (grunt.option('shrinkwrap')) {
      payload.shrinkwrap = grunt.file.readJSON(grunt.option('shrinkwrap'));
    }

    if (grunt.option('output')) {
      var formatters = Object.keys(Nsp.formatters);
      if (formatters.indexOf(grunt.option('output')) !== -1) {
        formatter = Nsp.formatters[grunt.option('output')];
      } else {
        grunt.log.write('Invalid formatter specified in options. Must be one of ' + formatters.join(',') + '\n');
      }
    }

    Nsp.check(payload, function (err, data) {

      var output = formatter(err, data);
      if (err || data.length > 0) {
        grunt.fail.warn(output);
        return done();
      }

      // No error or findings
      grunt.log.write(output);
      return done();
    });


  });
};
