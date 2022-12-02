let mongoose = require('mongoose');
let Blog = require('../src/models/blog');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
let {
  blogPost,
  editPost
} = require('./blog-seed');


describe('Blog', () => {
   beforeEach((done) => {
     //Before each test we empty the database
     Blog.deleteMany({}, (err) => {
       done();
     });
   });

   describe('blog', ()=>{
    it('it should return blog created', (done) => {
      chai
        .request(server)
        .post('/post')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(blogPost)
        .end((err, res) => {
          res.should.have.status(200);
          // console.log(res.body);
          // res.body.should.have.property('status').eql('success');
          // res.body.should.have
          //   .property('message')
          //   .eql('user created successfully');
          // res.body.should.have.property('data');
          done();
        });
    })

   })
})
