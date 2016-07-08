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
          name: '21.5-inch iMac with Retina 4K display'
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
      expect(newType.name).to.equal('21.5-inch iMac with Retina 4K display');
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
      expect(type.name).to.equal('21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/types/:id', () => {
    let updatedType;

    beforeEach(done => {
      request(app)
        .put('/api/types/' + newType._id)
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
          updatedType = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedType = {};
    });

    it('should respond with the updated type', () => {
      expect(updatedType.name).to.equal('27-inch iMac with Retina 5K display');
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
