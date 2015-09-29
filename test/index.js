var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();

lab.experiment('huh', function () {

    lab.test('it does a thing', function (done) {

        Code.expect(1).to.be.equal(1);
        done();
    });
});
