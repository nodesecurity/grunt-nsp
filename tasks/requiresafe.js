var Path = require('path');
var Fs = require('fs');
var Chalk = require('chalk');
var Table = require('cli-table');
var RequireSafe = require('requiresafe');

module.exports = function (grunt) {

    grunt.registerTask('requiresafe-check', 'Audits package.json / shrinkwrap agains the requireSafe (+) API', function () {

        var done = this.async();
        var pkgFile = Path.join(process.cwd(), 'package.json');
        var shrinkwrapFile = Path.join(process.cwd(), 'npm-shrinkwrap.json');
        var payload = {};

        var exists = Fs.existsSync(pkgFile);
        if (exists) {
            payload.pkg = pkgFile;
        } else {
          grunt.log.writeln('Can\'t load ' + pkgFile);
        }

        exists = Fs.existsSync(shrinkwrapFile);
        if (exists) {
            payload.shrinkwrap = shrinkwrapFile;
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

            return grunt.log.writeln(Chalk.green('(+)') + ' No known vulnerabilities found');
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
