'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newAssetType;

describe('AssetType API:', function() {

  describe('GET /api/asset-types', function() {
    let assetTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/asset-types')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assetTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(assetTypes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/asset-types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/asset-types')
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
          newAssetType = res.body;
          done();
        });
    });

    it('should respond with the newly created asset', function() {
      expect(newAssetType.name).to.equal('i21.5-inch iMac with Retina 4K display');
    });

  });

  describe('GET /api/asset-types/:id', function() {
    let assetType;

    beforeEach(function(done) {
      request(app)
        .get('/api/asset-types/' + newAssetType._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assetType = res.body;
          done();
        });
    });

    afterEach(function() {
      assetType = {};
    });

    it('should respond with the requested asset', function() {
      expect(assetType.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/asset-types/:id', function() {
    let updatedAssetType;

    beforeEach(function(done) {
      request(app)
        .put('/api/asset-types/' + newAssetType._id)
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
          updatedAssetType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAssetType = {};
    });

    it('should respond with the updated asset', function() {
      expect(updatedAssetType.name).to.equal('27-inch iMac with Retina 5K display');
    });

  });

  describe('DELETE /api/asset-types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/asset-types/' + newAssetType._id)
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
        .delete('/api/asset-types/' + newAssetType._id)
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
