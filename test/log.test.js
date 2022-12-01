let mongoose = require('mongoose');
let User = require('../src/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
let {
  signUp,
  existingUsername,
  existingEmail,
  login,
  invalidLoginDetails,
  missingPassword,
  validRegisterDetails,
} = require('./auth-seed');
//Our parent block
describe('User', () => {
  // beforeEach((done) => {
  //   //Before each test we empty the database
  //   User.deleteMany({}, (err) => {
  //     done();
  //   });
  // });
  /*
   * Test the /GET route
   */
  describe('register', () => {
    it('it should Post user', (done) => {
      chai
        .request(server)
        .post('/register')
        .send(signUp)
        .end((err, res) => {
          res.should.have.status(200);
          // console.log(res.body);
          res.body.should.have.property('status').eql('success');
          res.body.should.have
            .property('message')
            .eql('user created successfully');
          res.body.should.have.property('data');
          done();
        });
    });
  });

   describe('login', () => {
     it('it should Login user', (done) => {
       chai
         .request(server)
         .post('/login')
         .send(login)
         .end((err, res) => {
           res.should.have.status(200);
           console.log(res.body);
           res.body.should.have.property('status').eql('success');
           res.body.should.have.property('data');
           done();
         });
     });
   });
});
