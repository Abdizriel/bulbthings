'use strict';

import sinon from 'sinon';
import { expect } from 'chai';

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

describe('Index API Router:', () => {

  describe('GET /api/users', () => {

    it('should verify route to user.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users', () => {

    it('should route to user.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/users/:id', () => {

    it('should verify route to user.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:id', () => {

    it('should verify route to user.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users/:id', () => {

    it('should verify route to user.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'indexCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
