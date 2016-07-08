'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newType;

describe('Type API:', () => {

  describe('GET /api/types', () => {
    let types;

    beforeEach(done => {
      request(app)
        .get('/api/types')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          types = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(types).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/types', () => {
    beforeEach(done => {
      request(app)
        .post('/api/types')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          name: 'Phone',
          attrs: ['brand', 'model']
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newType = res.body;
          done();
        });
    });

    it('should respond with the newly created type', () => {
      expect(newType).to.be.instanceOf(Object);
      expect(newType).ownProperty('_id');
      expect(newType._id).to.not.be.undefined;
      expect(newType._id).to.not.be.null;
      expect(newType).ownProperty('name');
      expect(newType.name).to.equal('Phone');
      expect(newType).ownProperty('attrs');
      expect(newType.attrs).to.be.instanceOf(Array);
      expect(newType.attrs).to.not.be.empty;
      expect(newType.attrs).to.have.lengthOf(2);
      expect(newType.attrs).to.include('brand');
      expect(newType.attrs).to.include('model');
      expect(newType).ownProperty('createdAt');
      expect(newType.createdAt).to.not.be.undefined;
      expect(newType.createdAt).to.not.be.null;
      expect(newType).ownProperty('updatedAt');
      expect(newType.updatedAt).to.be.null;
    });

  });

  describe('GET /api/types/:id', () => {
    let type;

    beforeEach(done => {
      request(app)
        .get('/api/types/' + newType._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          type = res.body;
          done();
        });
    });

    afterEach(() => {
      type = {};
    });

    it('should respond with the requested type', () => {
      expect(type).to.be.instanceOf(Object);
      expect(type).ownProperty('_id');
      expect(type._id).to.not.be.undefined;
      expect(type._id).to.not.be.null;
      expect(type).ownProperty('name');
      expect(type.name).to.equal('Phone');
      expect(type).ownProperty('attrs');
      expect(type.attrs).to.be.instanceOf(Array);
      expect(type.attrs).to.not.be.empty;
      expect(type.attrs).to.have.lengthOf(2);
      expect(type.attrs).to.include('brand');
      expect(type.attrs).to.include('model');
      expect(type).ownProperty('createdAt');
      expect(type.createdAt).to.not.be.undefined;
      expect(type.createdAt).to.not.be.null;
      expect(type).ownProperty('updatedAt');
      expect(type.updatedAt).to.be.null;
    });

  });

  describe('PUT /api/types/:id', () => {
    let updatedType;

    beforeEach(done => {
      request(app)
        .put('/api/types/' + newType._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .send({
          attrs: ['brand', 'model', 'weight']
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          updatedType = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedType = {};
    });

    it('should respond with the updated type', () => {
      expect(updatedType).to.be.instanceOf(Object);
      expect(updatedType).ownProperty('_id');
      expect(updatedType._id).to.not.be.undefined;
      expect(updatedType._id).to.not.be.null;
      expect(updatedType).ownProperty('name');
      expect(updatedType.name).to.equal('Phone');
      expect(updatedType).ownProperty('attrs');
      expect(updatedType.attrs).to.be.instanceOf(Array);
      expect(updatedType.attrs).to.not.be.empty;
      expect(updatedType.attrs).to.have.lengthOf(3);
      expect(updatedType.attrs).to.include('brand');
      expect(updatedType.attrs).to.include('model');
      expect(updatedType.attrs).to.include('weight');
      expect(updatedType).ownProperty('createdAt');
      expect(updatedType.createdAt).to.not.be.undefined;
      expect(updatedType.createdAt).to.not.be.null;
      expect(updatedType).ownProperty('updatedAt');
      expect(updatedType.updatedAt).to.not.be.undefined;
      expect(updatedType.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/types/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/types/' + newType._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when type does not exist', done => {
      request(app)
        .delete('/api/types/' + newType._id)
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
