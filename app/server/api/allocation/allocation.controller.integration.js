'use strict';

import app from '../..';
import request from 'supertest';
import { expect } from 'chai';
import { User, Type, Asset } from '../../sqldb';

const apikey = '199b29d2-5d94-4ff4-952a-e9fb0d0de968';

const genUser = () => {
  user = User.build({
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com'
  });
  return user;
};
const genAsset = () => {
  asset = Asset.build({
    name: 'Kia Sportage',
    parameters: {
      brand: 'Kia'
    }
  });
  return asset;
};
const genType = () => {
  type = Type.build({
    name: 'CarAllocationTest',
    attrs: ['brand']
  });
  return type;
};

let type;
let user;
let asset;
let newAllocation;

describe('Allocation API:', () => {

  before(done => {
    genUser();
    genType();
    genAsset();

    user.save()
      .then(res => {
        user = res;
        return type.save();
      })
      .then(res => {
        type = res;
        asset.TypeId = type._id;
        return asset.save();
      })
      .then(res => {
        asset = res;
        done();
      })
  });

  after(done => {
    User.sync()
      .then(() => User.destroy({where: {}}))
      .then(() => console.log('Users removed'))
      .then(() => Type.sync())
      .then(() => Type.destroy({where: {}}))
      .then(() => console.log('Types removed'))
      .then(() => Asset.sync())
      .then(() => Asset.destroy({where: {}}))
      .then(() => console.log('Assets removed'))
      .then(() => done());
  });

  describe('GET /api/allocations', () => {
    let allocations;

    beforeEach(done => {
      request(app)
        .get('/api/allocations')
        .set('apikey', apikey)
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
          AssetId: asset._id,
          UserId: user._id,
          allocatedFrom: new Date('2016-06-08'),
          allocatedTo: new Date('2016-07-08')
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
      expect(newAllocation).to.be.instanceOf(Object);
      expect(newAllocation).ownProperty('_id');
      expect(newAllocation._id).to.not.be.undefined;
      expect(newAllocation._id).to.not.be.null;
      expect(newAllocation).ownProperty('UserId');
      expect(newAllocation.UserId).to.equal(user._id);
      expect(newAllocation).ownProperty('AssetId');
      expect(newAllocation.AssetId).to.equal(asset._id);
      expect(newAllocation).ownProperty('allocatedFrom');
      expect(newAllocation.allocatedFrom).to.equal('2016-06-08T00:00:00.000Z');
      expect(newAllocation).ownProperty('allocatedTo');
      expect(newAllocation.allocatedTo).to.equal('2016-07-08T00:00:00.000Z');
      expect(newAllocation).ownProperty('createdAt');
      expect(newAllocation.createdAt).to.not.be.undefined;
      expect(newAllocation.createdAt).to.not.be.null;
      expect(newAllocation).ownProperty('updatedAt');
      expect(newAllocation.updatedAt).to.be.null;
    });

  });

  describe('PUT /api/allocations/:id', () => {
    let updatedAllocation;

    beforeEach(done => {
      request(app)
        .put('/api/allocations/' + newAllocation._id)
        .set('apikey', apikey)
        .send({
          allocatedFrom: new Date('2016-06-12'),
          allocatedTo: new Date('2016-07-06')
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
      expect(updatedAllocation).to.be.instanceOf(Object);
      expect(updatedAllocation).ownProperty('_id');
      expect(updatedAllocation._id).to.not.be.undefined;
      expect(updatedAllocation._id).to.not.be.null;
      expect(updatedAllocation).ownProperty('UserId');
      expect(updatedAllocation.UserId).to.equal(user._id);
      expect(updatedAllocation).ownProperty('AssetId');
      expect(updatedAllocation.AssetId).to.equal(asset._id);
      expect(updatedAllocation).ownProperty('allocatedFrom');
      expect(updatedAllocation.allocatedFrom).to.equal('2016-06-12T00:00:00.000Z');
      expect(updatedAllocation).ownProperty('allocatedTo');
      expect(updatedAllocation.allocatedTo).to.equal('2016-07-06T00:00:00.000Z');
      expect(updatedAllocation).ownProperty('createdAt');
      expect(updatedAllocation.createdAt).to.not.be.undefined;
      expect(updatedAllocation.createdAt).to.not.be.null;
      expect(updatedAllocation).ownProperty('updatedAt');
      expect(updatedAllocation.updatedAt).to.not.be.undefined;
      expect(updatedAllocation.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/allocations/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/allocations/' + newAllocation._id)
        .set('apikey', apikey)
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
