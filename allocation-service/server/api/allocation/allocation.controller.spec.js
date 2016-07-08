'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';

let newAllocation;

describe('Allocation API:', () => {

  describe('GET /api/allocations', () => {
    let allocations;

    beforeEach(done => {
      request(app)
        .get('/api/allocations')
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          allocations = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(allocations).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/allocations', () => {
    beforeEach(done => {
      request(app)
        .post('/api/allocations')
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
          newAllocation = res.body;
          done();
        });
    });

    it('should respond with the newly created allocation', () => {
      expect(newAllocation.name).to.equal('i21.5-inch iMac with Retina 4K display');
    });

  });

  describe('PUT /api/allocations/:id', () => {
    let updatedAllocation;

    beforeEach(done => {
      request(app)
        .put('/api/allocations/' + newAllocation._id)
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
          updatedAllocation = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedAllocation = {};
    });

    it('should respond with the updated allocation', () => {
      expect(updatedAllocation.name).to.equal('27-inch iMac with Retina 5K display');
    });

  });

  describe('DELETE /api/allocations/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/allocations/' + newAllocation._id)
        .set('apikey', '199b29d2-5d94-4ff4-952a-e9fb0d0de968')
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when allocation does not exist', done => {
      request(app)
        .delete('/api/allocations/' + newAllocation._id)
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
