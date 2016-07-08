'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newAsset;

describe('Asset API:', function() {

  describe('GET /api/assets', function() {
    let assets;

    beforeEach(function(done) {
      request(app)
        .get('/api/assets')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(assets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/assets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/assets')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          name: '21.5-inch iMac with Retina 4K display'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAsset = res.body;
          done();
        });
    });

    it('should respond with the newly created asset', function() {
      expect(newAsset.name).to.equal('i21.5-inch iMac with Retina 4K display');
    });

  });

  describe('GET /api/assets/:id', function() {
    let asset;

    beforeEach(function(done) {
      request(app)
        .get('/api/assets/' + newAsset._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          asset = res.body;
          done();
        });
    });

    afterEach(function() {
      asset = {};
    });

    it('should respond with the requested asset', function() {
      expect(asset.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/assets/:id', function() {
    let updatedAsset;

    beforeEach(function(done) {
      request(app)
        .put('/api/assets/' + newAsset._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          name: '27-inch iMac with Retina 5K display'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAsset = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAsset = {};
    });

    it('should respond with the updated asset', function() {
      expect(updatedAsset.name).to.equal('27-inch iMac with Retina 5K display');
    });

  });

  describe('DELETE /api/assets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/assets/' + newAsset._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when asset does not exist', function(done) {
      request(app)
        .delete('/api/assets/' + newAsset._id)
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
