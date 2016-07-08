'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newAssetAttribute;

describe('AssetAttribute API:', () => {

  describe('GET /api/asset-attributes', () => {
    let assetAttributes;

    beforeEach(done => {
      request(app)
        .get('/api/asset-attributes')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assetAttributes = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(assetAttributes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/asset-attributes', () => {
    beforeEach(done => {
      request(app)
        .post('/api/asset-attributes')
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
          newAssetAttribute = res.body;
          done();
        });
    });

    it('should respond with the newly created asset', () => {
      expect(newAssetAttribute.name).to.equal('i21.5-inch iMac with Retina 4K display');
    });

  });

  describe('GET /api/asset-attributes/:id', () => {
    let assetAttribute;

    beforeEach(done => {
      request(app)
        .get('/api/asset-attributes/' + newAssetAttribute._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assetAttribute = res.body;
          done();
        });
    });

    afterEach(() => {
      assetAttribute = {};
    });

    it('should respond with the requested asset', () => {
      expect(assetAttribute.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/asset-attributes/:id', () => {
    let updatedAssetAttribute;

    beforeEach(done => {
      request(app)
        .put('/api/asset-attributes/' + newAssetAttribute._id)
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
          updatedAssetAttribute = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedAssetAttribute = {};
    });

    it('should respond with the updated asset', () => {
      expect(updatedAssetAttribute.name).to.equal('27-inch iMac with Retina 5K display');
    });

  });

  describe('DELETE /api/asset-attributes/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/asset-attributes/' + newAssetAttribute._id)
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
        .delete('/api/asset-attributes/' + newAssetAttribute._id)
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
