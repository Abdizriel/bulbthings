'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var typeCtrlStub = {
  index: 'typeCtrl.index',
  show: 'typeCtrl.show',
  create: 'typeCtrl.create',
  update: 'typeCtrl.update',
  destroy: 'typeCtrl.destroy'
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
var typeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './type.controller': typeCtrlStub,
  '../auth': authServiceStub
});

describe('Type API Router:', () => {

  it('should return an express router instance', function() {
    expect(typeIndex).to.equal(routerStub);
  });

  describe('GET /api/types', () => {

    it('should route to type.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auth.validateApiKey', 'typeCtrl.index')
      ).to.have.been.calledOnce;
    });

    it('should no route to type.controller.index when invalid apikey', function() {
      expect(routerStub.get
        .withArgs('/', 'typeCtrl.index')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('POST /api/types', () => {

    it('should route to type.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auth.validateApiKey', 'typeCtrl.create')
      ).to.have.been.calledOnce;
    });

    it('should no route to type.controller.create when invalid apikey', function() {
      expect(routerStub.post
        .withArgs('/', 'typeCtrl.create')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('DELETE /api/types/:id', () => {

    it('should route to type.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auth.validateApiKey', 'typeCtrl.destroy')
      ).to.have.been.calledOnce;
    });

    it('should no route to type.controller.destroy when invalid apikey', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'typeCtrl.destroy')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('PUT /api/types/:id', () => {

    it('should route to type.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'auth.validateApiKey', 'typeCtrl.update')
      ).to.have.been.calledOnce;
    });

    it('should no route to type.controller.update when invalid apikey', function() {
      expect(routerStub.put
        .withArgs('/:id', 'typeCtrl.update')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('GET /api/types/:id', () => {

    it('should route to type.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'auth.validateApiKey', 'typeCtrl.show')
      ).to.have.been.calledOnce;
    });

    it('should no route to type.controller.show when invalid apikey', function() {
      expect(routerStub.get
        .withArgs('/:id', 'typeCtrl.show')
      ).to.have.not.been.calledOnce;
    });

  });

});
