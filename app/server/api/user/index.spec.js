'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
  update: 'userCtrl.update',
  destroy: 'userCtrl.destroy'
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
var userIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../auth': authServiceStub
});

describe('User API Router:', () => {

  it('should return an express router instance', function() {
    expect(userIndex).to.equal(routerStub);
  });

  describe('GET /api/users', () => {

    it('should route to user.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auth.validateApiKey', 'userCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users', () => {

    it('should route to user.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auth.validateApiKey', 'userCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users/:id', () => {

    it('should route to user.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auth.validateApiKey', 'userCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:id', () => {

    it('should route to user.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'auth.validateApiKey', 'userCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users/:id', () => {

    it('should route to user.controller.show', function() {
      expect(routerStub.get
        .withArgs('/', 'auth.validateApiKey', 'userCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
