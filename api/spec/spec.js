var request = require('supertest');
var should = require('should');
var server = require('../server').server;

process.env.NODE_ENV = 'test';

describe('loading express', function () {

  it('responds to /', function testHome(done) {
    request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
      .end(function (err, res) {
        should.not.exist(err);
        // parseFloat(res.text).should.equal(2);
        done();
      });
  });
});