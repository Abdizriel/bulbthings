'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var allocationCtrlStub = {
  index: 'allocationCtrl.index',
  show: 'allocationCtrl.show',
  create: 'allocationCtrl.create',
  update: 'allocationCtrl.update',
  destroy: 'allocationCtrl.destroy'
};

var authServiceStub = {
  validateApiKey() {
    return 'auth.validateApiKey';
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var allocationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './allocation.controller': allocationCtrlStub,
  '../auth': authServiceStub
});

describe('Allocation API Router:', () => {

  it('should return an express router instance', function() {
    expect(allocationIndex).to.equal(routerStub);
  });

  describe('GET /api/allocations', () => {

    it('should route to allocation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auth.validateApiKey', 'allocationCtrl.index')
      ).to.have.been.calledOnce;
    });

    it('should no route to allocation.controller.index when invalid apikey', function() {
      expect(routerStub.get
        .withArgs('/', 'allocationCtrl.index')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('POST /api/allocations', () => {

    it('should route to allocation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auth.validateApiKey', 'allocationCtrl.create')
      ).to.have.been.calledOnce;
    });

    it('should no route to allocation.controller.create when invalid apikey', function() {
      expect(routerStub.post
        .withArgs('/', 'allocationCtrl.create')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('DELETE /api/allocations/:id', () => {

    it('should route to allocation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auth.validateApiKey', 'allocationCtrl.destroy')
      ).to.have.been.calledOnce;
    });

    it('should no route to allocation.controller.destroy when invalid apikey', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'allocationCtrl.destroy')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('PUT /api/allocations/:id', () => {

    it('should no route to allocation.controller.update when invalid apikey', function() {
      expect(routerStub.put
        .withArgs('/:id', 'allocationCtrl.update')
      ).to.have.not.been.calledOnce;
    });

  });

});
