'use strict';

import sinon from 'sinon';
import { expect } from 'chai';
import { noPreserveCache } from 'proxyquire';

const allocationCtrlStub = {
  index: 'allocationCtrl.index',
  create: 'allocationCtrl.create',
  update: 'allocationCtrl.update',
  destroy: 'allocationCtrl.destroy'
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var allocationIndex = noPreserveCache('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './allocation.controller': allocationCtrlStub
});

describe('Index API Router:', () => {

  it('should return an express router instance', function() {
    expect(allocationIndex).to.equal(routerStub);
  });

  describe('GET /api/allocations', () => {

    it('should verify route to allocation.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/allocations', () => {

    it('should route to allocation.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/allocations/:id', () => {

    it('should verify route to allocation.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/allocations/:id', () => {

    it('should verify route to allocation.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

});
