const supertest = require("supertest");
const assert = require('assert');
const app = require("../index");

describe("GET /", function() {
    it("it should has status code 200", function(done) {
      supertest(app)
        .get("/")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
  });

  describe('POST /employee/add', function() {
    it('responds with status code 200', function(done) {
      supertest(app)
        .post('/employee/add/?fullname="Vanessa Cardozo"&id=2387454565645434&boss=&func="Manager"')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('responds with status code 500', function(done) {
      supertest(app)
        .post('/employee/add/?fullname=&id=&boss=&func="Manager"')
        .expect(500)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('responds with status code 200', function(done) {
      supertest(app)
        .post('/employee/add/?fullname="Carlos Cardozo"&id=111434&boss=&func="Manager"')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /employee/setboss', function() {
    it('responds with status code 200', function(done) {
      supertest(app)
        .post('/employee/setboss/?id=2387454565645434&boss=3454343')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('responds with status code 200', function(done) {
      supertest(app)
        .post('/employee/setboss/?id=2345676543245&boss=7654565454')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });