'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newUser;

describe('User API:', function() {

  describe('GET /api/users', function() {
    let users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(users).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user', function() {
      expect(newUser.firstName).to.equal('John');
      expect(newUser.lastName).to.equal('Doe');
      expect(newUser.email).to.equal('john.doe@example.com');
    });

  });

  describe('GET /api/users/:id', function() {
    let user;

    beforeEach(function(done) {
      request(app)
        .get('/api/users/' + newUser._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested user', function() {
      expect(user.firstName).to.equal('John');
      expect(user.lastName).to.equal('Doe');
      expect(user.email).to.equal('john.doe@example.com');
    });

  });

  describe('PUT /api/users/:id', function() {
    let updatedUser;

    beforeEach(function(done) {
      request(app)
        .put('/api/users/' + newUser._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          firstName: 'Johny',
          lastName: 'Bravo',
          email: 'johny.bravo@example.com'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUser = {};
    });

    it('should respond with the updated user', function() {
      expect(updatedUser.firstName).to.equal('Johny');
      expect(updatedUser.lastName).to.equal('Bravo');
      expect(updatedUser.email).to.equal('johny.bravo@example.com');
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
