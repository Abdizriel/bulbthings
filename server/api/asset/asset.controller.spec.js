'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newAsset;

describe('Asset API:', () => {

  describe('GET /api/assets', () => {
    let assets;

    beforeEach(done => {
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

    it('should respond with JSON array', () => {
      expect(assets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/assets', () => {
    beforeEach(done => {
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

    it('should respond with the newly created asset', () => {
      expect(newAsset.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('GET /api/assets/:id', () => {
    let asset;

    beforeEach(done => {
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

    afterEach(() => {
      asset = {};
    });

    it('should respond with the requested asset', () => {
      expect(asset.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/assets/:id', () => {
    let updatedAsset;

    beforeEach(done => {
      request(app)
        .put('/api/assets/' + newAsset._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          name: '27-inch iMac with Retina 5K display'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          updatedAsset = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedAsset = {};
    });

    it('should respond with the updated asset', () => {
      expect(updatedAsset.name).to.equal('27-inch iMac with Retina 5K display');
    });

  });

  describe('DELETE /api/assets/:id', () => {

    it('should respond with 204 on successful removal', done => {
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

    it('should respond with 404 when asset does not exist', done => {
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
