'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var assetCtrlStub = {
  index: 'assetCtrl.index',
  show: 'assetCtrl.show',
  create: 'assetCtrl.create',
  update: 'assetCtrl.update',
  destroy: 'assetCtrl.destroy'
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
var assetIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './asset.controller': assetCtrlStub,
  '../auth': authServiceStub
});

describe('Asset API Router:', () => {

  it('should return an express router instance', function() {
    expect(assetIndex).to.equal(routerStub);
  });

  describe('GET /api/assets', () => {

    it('should route to asset.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auth.validateApiKey', 'assetCtrl.index')
      ).to.have.been.calledOnce;
    });

    it('should no route to asset.controller.index when invalid apikey', function() {
      expect(routerStub.get
        .withArgs('/', 'assetCtrl.index')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('POST /api/assets', () => {

    it('should route to asset.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auth.validateApiKey', 'assetCtrl.create')
      ).to.have.been.calledOnce;
    });

    it('should no route to asset.controller.create when invalid apikey', function() {
      expect(routerStub.post
        .withArgs('/', 'assetCtrl.create')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('DELETE /api/assets/:id', () => {

    it('should route to asset.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auth.validateApiKey', 'assetCtrl.destroy')
      ).to.have.been.calledOnce;
    });

    it('should no route to asset.controller.destroy when invalid apikey', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'assetCtrl.destroy')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('PUT /api/assets/:id', () => {

    it('should route to asset.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'auth.validateApiKey', 'assetCtrl.update')
      ).to.have.been.calledOnce;
    });

    it('should no route to asset.controller.update when invalid apikey', function() {
      expect(routerStub.put
        .withArgs('/:id', 'assetCtrl.update')
      ).to.have.not.been.calledOnce;
    });

  });

  describe('GET /api/assets/:id', () => {

    it('should route to asset.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'auth.validateApiKey', 'assetCtrl.show')
      ).to.have.been.calledOnce;
    });

    it('should no route to asset.controller.show when invalid apikey', function() {
      expect(routerStub.get
        .withArgs('/:id', 'assetCtrl.show')
      ).to.have.not.been.calledOnce;
    });

  });

});
