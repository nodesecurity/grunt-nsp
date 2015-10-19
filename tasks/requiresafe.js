'use strict';

var Chalk = require('chalk');
var Table = require('cli-table');
var RequireSafe = require('requiresafe');

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

      if (err) {
        return grunt.log.writeln(Chalk.yellow('(+) ') + err);
      }

      var width = 80;
      if (process.stdout.isTTY) {
        width = process.stdout.getWindowSize()[0] - 10;
      }

      if (data.length === 0) {

        grunt.log.writeln(Chalk.green('(+)') + ' No known vulnerabilities found');
        return done();
      }

      data.map(function (finding) {

        var table = new Table({
          head: ['', finding.title],
          colWidths: [15, width - 15]
        });

        table.push(['Name', finding.module]);
        table.push(['Version', finding.version]);
        table.push(['Path', finding.path]);
        table.push(['More Info', finding.advisory]);

        grunt.log.write(table.toString());
        grunt.log.write('\n');

      });

      grunt.fail.warn(Chalk.red('(+) ') + data.length + ' vulnerabilities found\n');
      done();
    });


  });
};
