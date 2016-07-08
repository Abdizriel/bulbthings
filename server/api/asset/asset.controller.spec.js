'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';
import { Type } from '../../config/db.conf.js';

const genType = () => {
  type = Type.build({
    name: 'Car',
    attrs: ['brand', 'model']
  });
  return type;
};

let apikey = '199b29d2-5d94-4ff4-952a-e9fb0d0de968';

let newAsset;
let type;

describe('Asset API:', () => {

  before(done => {
    genType();
    type.save()
      .then(obj => {
        type = obj;
        done()
      })
      .catch(err => done(err));
  });

  describe('GET /api/assets', () => {
    let assets;

    beforeEach(done => {
      request(app)
        .get('/api/assets')
        .set('apikey', apikey)
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
        .set('apikey', apikey)
        .send({
          name: 'Company Car',
          parameters: {
            brand: 'Kia',
            model: 'Sportage'
          },
          TypeId: type._id
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
      expect(newAsset).to.be.instanceOf(Object);
      expect(newAsset).ownProperty('_id');
      expect(newAsset._id).to.not.be.undefined;
      expect(newAsset._id).to.not.be.null;
      expect(newAsset).ownProperty('name');
      expect(newAsset.name).to.equal('Company Car');
      expect(newAsset).ownProperty('parameters');
      expect(newAsset.parameters).ownProperty('brand');
      expect(newAsset.parameters.brand).to.equal('Kia');
      expect(newAsset.parameters).ownProperty('model');
      expect(newAsset.parameters.model).to.equal('Sportage');
      expect(newAsset).ownProperty('TypeId');
      expect(newAsset.TypeId).to.equal(type._id);
      expect(newAsset).ownProperty('createdAt');
      expect(newAsset.createdAt).to.not.be.undefined;
      expect(newAsset.createdAt).to.not.be.null;
      expect(newAsset).ownProperty('updatedAt');
      expect(newAsset.updatedAt).to.be.null;
    });

  });

  describe('GET /api/assets/:id', () => {
    let asset;

    beforeEach(done => {
      request(app)
        .get('/api/assets/' + newAsset._id)
        .set('apikey', apikey)
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
      expect(asset).to.be.instanceOf(Object);
      expect(asset).ownProperty('_id');
      expect(asset._id).to.not.be.undefined;
      expect(asset._id).to.not.be.null;
      expect(asset).ownProperty('name');
      expect(asset.name).to.equal('Company Car');
      expect(asset).ownProperty('parameters');
      expect(asset.parameters).ownProperty('brand');
      expect(asset.parameters.brand).to.equal('Kia');
      expect(asset.parameters).ownProperty('model');
      expect(asset.parameters.model).to.equal('Sportage');
      expect(asset).ownProperty('TypeId');
      expect(asset.TypeId).to.equal(type._id);
      expect(asset).ownProperty('createdAt');
      expect(asset.createdAt).to.not.be.undefined;
      expect(asset.createdAt).to.not.be.null;
      expect(asset).ownProperty('updatedAt');
      expect(asset.updatedAt).to.be.null;
    });

  });

  describe('PUT /api/assets/:id', () => {
    let updatedAsset;

    beforeEach(done => {
      request(app)
        .put('/api/assets/' + newAsset._id)
        .set('apikey', apikey)
        .send({
          parameters: {
            brand: 'Hyundai',
            model: 'ix35'
          }
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
      expect(updatedAsset).to.be.instanceOf(Object);
      expect(updatedAsset).ownProperty('_id');
      expect(updatedAsset._id).to.not.be.undefined;
      expect(updatedAsset._id).to.not.be.null;
      expect(updatedAsset).ownProperty('name');
      expect(updatedAsset.name).to.equal('Company Car');
      expect(updatedAsset).ownProperty('parameters');
      expect(updatedAsset.parameters).ownProperty('brand');
      expect(updatedAsset.parameters.brand).to.equal('Hyundai');
      expect(updatedAsset.parameters).ownProperty('model');
      expect(updatedAsset.parameters.model).to.equal('ix35');
      expect(updatedAsset).ownProperty('TypeId');
      expect(updatedAsset.TypeId).to.equal(type._id);
      expect(updatedAsset).ownProperty('createdAt');
      expect(updatedAsset.createdAt).to.not.be.undefined;
      expect(updatedAsset.createdAt).to.not.be.null;
      expect(updatedAsset).ownProperty('updatedAt');
      expect(updatedAsset.updatedAt).to.not.be.undefined;
      expect(updatedAsset.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/assets/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/assets/' + newAsset._id)
        .set('apikey', apikey)
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
        .set('apikey', apikey)
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
